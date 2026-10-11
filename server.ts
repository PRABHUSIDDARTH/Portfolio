import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import contactHandler from "./api/contact";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "32kb" }));

// SMTP-backed contact form (same handler Vercel runs from api/contact.ts)
app.post("/api/contact", (req, res) => contactHandler(req, res));

// Initialize Gemini SDK with telemetry header
const geminiApiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (geminiApiKey) {
  aiClient = new GoogleGenAI({
    apiKey: geminiApiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// API endpoint for the AlgoMentor AI DSA Coach
app.post("/api/algomentor", async (req, res) => {
  try {
    if (!aiClient) {
      return res.status(503).json({
        error: "Gemini API Client is not configured. Please add GEMINI_API_KEY to your secrets.",
      });
    }

    const { problemTitle, userCode, questionDescription, userMessage, chatHistory = [] } = req.body;

    const systemInstruction = 
      "You are 'AlgoMentor'—an elite, premium AI DSA Coach and Socratic Tech Interview Mentor. " +
      "Your absolute mission is to guide students in solving algorithmic challenges WITHOUT ever giving them the direct solution " +
      "or direct copy-pasteable answers. Instead, analyze their code, suggest optimization vectors (time/space complexity), " +
      "and ask guided questions to lead them to the answer. " +
      "Be professional, clear, use elegant developer terminology, and format your feedback with markdown codeblocks when necessary, " +
      "focusing on the bug's context rather than rewriting the code for them.";

    const formattedHistory = chatHistory.map((msg: any) => ({
      role: msg.role === "assistant" ? "model" as const : "user" as const,
      parts: [{ text: msg.text }],
    }));

    // Constructing detailed prompt context
    const currentPrompt = `
Problem: ${problemTitle || "General Algorithmic Problem"}
Description: ${questionDescription || "N/A"}
User's Current Code:
\`\`\`typescript
${userCode || "// No code entered yet"}
\`\`\`

User's query: "${userMessage}"

Provide DSA guidance following your core socratic mentoring guidelines. Give constructive, non-spoiler suggestions. Keep response professional and concise so it fits within the chat bubble dynamically.
`;

    // Add current prompt
    const contents = [
      ...formattedHistory,
      { role: "user" as const, parts: [{ text: currentPrompt }] }
    ];

    const response = await aiClient.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "I apologize, I was unable to formulate a response. Please check your query or code structure.";
    res.json({ reply: replyText });
  } catch (error: any) {
    console.error("AlgoMentor API Error:", error);
    res.status(500).json({ error: error?.message || "Internal server error occurred while invoking Gemini." });
  }
});

// Mock/Heuristic scan route for the Phishing Detector project
app.post("/api/phishing/scan", (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  // Purely deterministic heuristic analysis
  const results = {
    isPhishing: false,
    score: 0, // 0 to 100 risk score
    signals: [] as string[],
  };

  try {
    const parsed = new URL(url.startsWith("http") ? url : "http://" + url);
    const domain = parsed.hostname;

    // Signal: Homograph attack detection (non-ascii characters)
    if (/[^\x00-\x7F]/.test(domain)) {
      results.score += 45;
      results.signals.push("Internationalized Domain Name (Potential IDN Homograph Spoofing)");
    }

    // Signal: Suspicious subdomains or structures
    const parts = domain.split(".");
    if (parts.length > 4) {
      results.score += 25;
      results.signals.push("Excessive subdomain depth (Often used to disguise destination URL)");
    }

    // Signal: Typical phishing keywords in subdomain or path
    const phishingKeywords = ["login", "signin", "verification", "secure", "banking", "update", "paypal", "support", "account", "wallet", "meta-mask"];
    phishingKeywords.forEach((keyword) => {
      if (parsed.href.toLowerCase().includes(keyword)) {
        results.score += 15;
        results.signals.push(`Suspicious keyword match: '${keyword}' detected in URI`);
      }
    });

    // Signal: IP instead of domain name
    const ipPattern = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    if (ipPattern.test(domain)) {
      results.score += 35;
      results.signals.push("Server IP address used directly instead of a domain name registration");
    }

    // Signal: Suspicious TLD
    const suspiciousTlds = ["xyz", "top", "gq", "cf", "tk", "ml", "ga", "click", "download", "link"];
    const tld = parts[parts.length - 1];
    if (suspiciousTlds.includes(tld)) {
      results.score += 20;
      results.signals.push(`Suspicious generic TLD category: .${tld}`);
    }

    results.isPhishing = results.score >= 40;
    res.json(results);
  } catch (err) {
    res.json({
      isPhishing: true,
      score: 85,
      signals: ["Malformed URL structure", "Failed to resolve standard host framing"],
    });
  }
});

// Serve static public assets (logo, etc.) from /assets
app.use("/assets", express.static(path.join(process.cwd(), "assets")));

// Boot Vite middleware or serve built asset files
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server boots on http://localhost:${PORT}`);
  });
}

startServer();
