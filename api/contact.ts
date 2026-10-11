import nodemailer from 'nodemailer';

// Cold-outreach form handler. Runs as a Vercel function (api/contact.ts) and is mounted
// on the Express dev server as POST /api/contact. Configure via env:
// SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO (defaults to SMTP_USER).

type Req = { method?: string; body?: any; headers: Record<string, string | string[] | undefined>; socket?: { remoteAddress?: string } };
type Res = { status: (c: number) => Res; json: (b: unknown) => void; setHeader: (k: string, v: string) => void };

const LIMITS = { name: 80, email: 120, company: 120, message: 4000 };
const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/;

// Best-effort per-instance limiter: 3 messages per IP per 10 minutes.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 3;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

let transport: nodemailer.Transporter | null = null;
function getTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  if (!transport) {
    const port = Number(SMTP_PORT || 465);
    transport = nodemailer.createTransport({ host: SMTP_HOST, port, secure: port === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } });
  }
  return transport;
}

export default async function handler(req: Req, res: Res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const body = typeof req.body === 'string' ? safeJson(req.body) : req.body ?? {};
  // Honeypot: real users never see or fill this field.
  if (body.website) return res.status(200).json({ ok: true });

  const name = clean(body.name, LIMITS.name);
  const email = clean(body.email, LIMITS.email);
  const company = clean(body.company, LIMITS.company);
  const message = clean(body.message, LIMITS.message);
  if (!name || !EMAIL_RE.test(email) || message.length < 10) {
    return res.status(400).json({ error: 'Add your name, a valid email and a message of at least 10 characters.' });
  }

  const fwd = req.headers['x-forwarded-for'];
  const ip = (Array.isArray(fwd) ? fwd[0] : fwd)?.split(',')[0].trim() || req.socket?.remoteAddress || 'unknown';
  if (limited(ip)) return res.status(429).json({ error: 'Too many messages. Try again in a few minutes, or email me directly.' });

  const t = getTransport();
  if (!t) return res.status(503).json({ error: 'Mail is not configured yet. Please email me directly.' });

  const subjectName = name.replace(/[\r\n]+/g, ' ');
  try {
    await t.sendMail({
      from: `"Portfolio contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO || process.env.SMTP_USER,
      replyTo: { name: subjectName, address: email },
      subject: `Portfolio: ${subjectName}${company ? ` (${company.replace(/[\r\n]+/g, ' ')})` : ''}`,
      text: `${name} <${email}>${company ? `\n${company}` : ''}\n\n${message}`,
      html: `<p><b>${esc(name)}</b> &lt;${esc(email)}&gt;${company ? `<br>${esc(company)}` : ''}</p><p style="white-space:pre-wrap">${esc(message)}</p>`,
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('contact: send failed', err);
    return res.status(502).json({ error: 'The mail server refused the message. Please email me directly.' });
  }
}

function safeJson(s: string) {
  try { return JSON.parse(s); } catch { return {}; }
}
