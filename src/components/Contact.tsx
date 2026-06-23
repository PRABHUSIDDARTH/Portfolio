import React, { useState } from "react";
import { Github, Linkedin, Mail, Youtube, Instagram, Code, Send, Terminal, Sparkles } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", msg: "" });
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "// SDE Message dispatcher ready on port: 3000.",
    "// Introduce packet details and trigger transmit command."
  ]);
  const [isSending, setIsSending] = useState(false);

  const socialButtons = [
    { name: "GITHUB", icon: <Github size={24} />, url: "https://github.com/PRABHUSIDDARTH", theme: "from-[#24292e] to-[#444d56] shadow-[0_0_15px_rgba(255,255,255,0.05)] text-white" },
    { name: "LINKEDIN", icon: <Linkedin size={24} />, url: "https://www.linkedin.com/in/prabhu-siddarth-av/", theme: "from-[#0077b5] to-[#00a0dc] shadow-[0_0_15px_rgba(0,119,181,0.2)] text-white" },
    { name: "GMAIL", icon: <Mail size={24} />, url: "mailto:prabhusiddarth37@gmail.com", theme: "from-[#EA4335] to-[#FF6D60] shadow-[0_0_15px_rgba(234,67,53,0.2)] text-white" },
    { name: "YOUTUBE", icon: <Youtube size={24} />, url: "https://www.youtube.com/@psthetech", theme: "from-[#FF0000] to-[#FF4444] shadow-[0_0_15px_rgba(255,0,0,0.2)] text-[#efffff]" },
    { name: "INSTAGRAM", icon: <Instagram size={24} />, url: "https://www.instagram.com/they_callme_ps", theme: "from-[#833ab4] via-[#fd1d1d] to-[#fcb045] shadow-[0_0_15px_rgba(253,29,29,0.2)] text-white" },
    { name: "LEETCODE", icon: <Code size={24} />, url: "https://leetcode.com/u/psTech/", theme: "from-[#1a1a2e ] to-[#FFA116] shadow-[0_0_15px_rgba(255,161,22,0.21)] text-[#FFA116]" }
  ];

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.msg) return;

    setIsSending(true);
    setTerminalLogs((prev) => [
      ...prev,
      `[client] Compiling packets for sender reference: '${formData.name}'...`,
      `[router] Transport pipeline handshake initiated...`
    ]);

    setTimeout(() => {
      setTerminalLogs((prev) => [
        ...prev,
        `[success] Message bundle compiled securely!`,
        `[server] Simulated e-mail successfully cached in local buffer.`,
        `[system] Prabhu will be alerted at: prabhusiddarth37@gmail.com`
      ]);
      setFormData({ name: "", email: "", msg: "" });
      setIsSending(false);
    }, 1200);
  };

  return (
    <section className="py-24 px-6 md:px-20 bg-gradient-to-t from-[#09090d] to-[#0d0d12]" id="contact">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Branding call-out (Left Column) */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[2px] w-12 bg-[#00f7ff]"></div>
                <h2 className="font-mono text-sm md:text-base text-[#00f7ff] uppercase tracking-[0.2em] font-bold">// CONTACT</h2>
              </div>

              <h3 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-none uppercase tracking-tight mb-8">
                Let's build<br />something beyond.
              </h3>

              <div className="inline-block brutalist-card px-5 py-2.5 mb-8 select-none">
                <span className="font-mono text-xs font-black text-[#00f7ff] uppercase tracking-wider">
                  OPEN_TO_WORK_2026 // COIMBATORE_SDE
                </span>
              </div>
            </div>

            {/* Simulated Email Address footer */}
            <div className="hidden lg:block font-mono text-xs text-on-surface-variant-custom">
              <span className="text-[#00f7ff] font-bold">Mailto client:</span> prabhusiddarth37@gmail.com
            </div>
          </div>

          {/* Social Badges and Form (Right Column) */}
          <div className="lg:col-span-6 flex flex-col gap-8 w-full">
            <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/5 flex flex-col items-center">
              
              {/* Premium Gradient Grid matching exact layout coordinates */}
              <div className="grid grid-cols-3 gap-4 md:gap-6 w-full max-w-sm mb-10">
                {socialButtons.map((btn) => (
                  <a
                    key={btn.name}
                    href={btn.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`h-20 w-full rounded-xl bg-gradient-to-br ${btn.theme} flex flex-col items-center justify-center p-2 group hover:scale-[1.03] hover:-translate-y-1 transition-all active:scale-[0.98] duration-300`}
                    title={`Connect on ${btn.name}`}
                  >
                    <div className="group-hover:scale-110 transition-transform duration-300">{btn.icon}</div>
                    <span className="text-[9px] font-mono opacity-60 mt-1 uppercase tracking-wider font-extrabold group-hover:opacity-90">{btn.name}</span>
                  </a>
                ))}
              </div>

              {/* Terminal Form Formulation */}
              <form onSubmit={handleDispatch} className="w-full space-y-4 border-t border-white/5 pt-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-[10px] font-mono text-on-surface-variant-custom uppercase mb-1.5 font-bold">// sender_id</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Lead SDE Recruiter"
                      className="w-full bg-background-custom text-xs px-3.5 py-3 border border-outline-custom/15 rounded focus:outline-none focus:border-[#00f7ff] text-white"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-[10px] font-mono text-on-surface-variant-custom uppercase mb-1.5 font-bold">// return_endpoint</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. agent@company.org"
                      className="w-full bg-background-custom text-xs px-3.5 py-3 border border-outline-custom/15 rounded focus:outline-none focus:border-[#00f7ff] text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-on-surface-variant-custom uppercase mb-1.5 font-bold">// payload_message</label>
                  <textarea
                    required
                    rows={3}
                    value={formData.msg}
                    onChange={(e) => setFormData({ ...formData, msg: e.target.value })}
                    placeholder="Describe requirement, feedback, or schedule a technical chat..."
                    className="w-full bg-background-custom text-xs px-3.5 py-3 border border-outline-custom/15 rounded focus:outline-none focus:border-[#00f7ff] text-white resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch pt-2">
                  <div className="md:col-span-8 bg-black/90 p-3 rounded font-mono text-[10px] leading-relaxed max-h-[110px] overflow-y-auto space-y-1.5 text-green-400 border border-white/5">
                    {terminalLogs.map((log, index) => (
                      <div 
                        key={index} 
                        className={log.startsWith("[success]") ? "text-emerald-400" : log.startsWith("[error]") ? "text-red-400" : "opacity-75"}
                      >
                        {log}
                      </div>
                    ))}
                  </div>

                  <button
                    type="submit"
                    disabled={isSending || !formData.name.trim() || !formData.msg.trim()}
                    className="md:col-span-4 bg-[#00f7ff]/10 hover:bg-[#00f7ff] hover:text-black border border-[#00f7ff]/30 hover:border-[#00f7ff] text-[#00f7ff] font-mono text-xs rounded transition-all py-3 flex items-center justify-center gap-1.5 font-extrabold scale-down-click shrink-0 select-none"
                    id="contact-dispatch-btn"
                  >
                    <Send size={12} />
                    TRANSMIT
                  </button>
                </div>
              </form>

              {/* Mobile email footer fallback */}
              <div className="block lg:hidden font-mono text-[11px] text-on-surface-variant-custom/60 md:text-xs mt-8">
                prabhusiddarth37@gmail.com
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
