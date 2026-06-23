import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Journey from "./components/Journey";
import Stack from "./components/Stack";
import Projects from "./components/Projects";
import Recognition from "./components/Recognition";
import Contact from "./components/Contact";
import { X, FileText, Mail, Calendar, MapPin, Printer, Clipboard, Copy, Check, HeartHandshake, Phone, Github, Linkedin, Globe } from "lucide-react";

export default function App() {
  const [showHireModal, setShowHireModal] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const toggleHire = () => {
    setShowHireModal(!showHireModal);
    if (!showHireModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const toggleResume = () => {
    setShowResumeModal(!showResumeModal);
    if (!showResumeModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const copyDocLink = () => {
    try {
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText("https://github.com/PRABHUSIDDARTH")
          .then(() => {
            setCopiedLink(true);
            setTimeout(() => setCopiedLink(false), 2000);
          })
          .catch((err) => {
            console.warn("Clipboard write failed within secure context limit:", err);
            // Fallback signaling
            setCopiedLink(true);
            setTimeout(() => setCopiedLink(false), 2000);
          });
      } else {
        // Fallback signaling
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      }
    } catch (e) {
      console.warn("Clipboard access prevented or unsupported in this sandbox:", e);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const triggerDirectPrint = () => {
    try {
      if (typeof window !== "undefined" && typeof window.print === "function") {
        window.print();
      }
    } catch (e) {
      console.warn("Direct print call is locked or prevented in this sandbox environment:", e);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d12] text-[#e4e1e9] relative select-text" id="app-workspace">
      {/* Immersive Background effects */}
      <div className="noise-overlay" id="noise-layer"></div>

      {/* Global Header */}
      <Navbar onToggleHire={toggleHire} onOpenResume={toggleResume} />

      {/* Main flow */}
      <main className="relative" id="portfolio-flow">
        {/* Hero page */}
        <Hero onOpenResume={toggleResume} />

        {/* Chronological career journey */}
        <Journey />

        {/* SDE Technical Stacks categorised tagging */}
        <Stack />

        {/* Modular projects grid and integrated simulators */}
        <Projects />

        {/* Accolades and certifications */}
        <Recognition />

        {/* Contact dispatch and social panel */}
        <Contact />
      </main>

      {/* Infinite scale-engineered footer */}
      <footer className="w-full border-t border-[#00f7ff]/20 bg-[#0a0a0f] flex flex-col md:flex-row justify-between items-center px-10 md:px-20 py-12 gap-6 z-10 relative">
        <div className="font-display text-xs md:text-sm uppercase text-[#efffff] tracking-wide text-center md:text-left">
          © 2026 PRABHU SIDDARTH A V // ENGINEERED FOR THE FUTURE
        </div>
        
        <div className="flex gap-6 font-mono text-[10px] md:text-xs tracking-widest text-on-surface-variant-custom">
          <a href="https://github.com/PRABHUSIDDARTH" target="_blank" rel="noopener noreferrer" className="hover:text-[#00f7ff] uppercase transition-colors">GITHUB</a>
          <a href="https://www.linkedin.com/in/prabhu-siddarth-av/" target="_blank" rel="noopener noreferrer" className="hover:text-[#00f7ff] uppercase transition-colors">LINKEDIN</a>
          <a href="https://www.instagram.com/they_callme_ps" target="_blank" rel="noopener noreferrer" className="hover:text-[#00f7ff] uppercase transition-colors">INSTAGRAM</a>
        </div>
      </footer>

      {/* Overlays 1: Hire Me specialized Pillar view */}
      {showHireModal && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/85 backdrop-blur-2xl px-4 animate-fade-in" id="hire-modal-overlay">
          <div className="w-full max-w-4xl bg-[#111118] border border-[#00f7ff]/20 rounded-2xl p-6 md:p-12 shadow-2xl relative">
            <button
              onClick={toggleHire}
              className="absolute top-5 right-5 neo-btn w-9 h-9 rounded-full flex items-center justify-center text-[#00f7ff] z-50 scale-down-click"
              title="Close Panel"
              id="hire-modal-close-btn"
            >
              <X size={14} />
            </button>

            <div className="text-center mb-10">
              <span className="font-mono text-xs text-[#00f7ff] uppercase tracking-wider">// AVAILABLE FOR 2026 ENGAGEMENT</span>
              <h2 className="font-display text-2xl md:text-3xl font-black text-white uppercase tracking-tight mt-1 flex items-center justify-center gap-2">
                <HeartHandshake className="text-[#00f7ff]" />
                HIRE_CAPABILITIES
              </h2>
            </div>

            {/* Core Capability Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {[
                {
                  title: "SDE BACKEND",
                  subtitle: "Scalable Java microservices built on Spring Boot & low-latency Redis pipelines.",
                  badge: "Refill Rate: 0.42ms",
                  color: "border-primary-container-custom/20"
                },
                {
                  title: "MOBILE ARCHITECT",
                  subtitle: "Kotlin & Java native engineering. Clean Architecture, MVVM and robust Local caching.",
                  badge: "Swara Core Engine",
                  color: "border-secondary-container-custom/20"
                },
                {
                  title: "AI SOLUTIONS SDE",
                  subtitle: "Generative LLM prompts, camera computer-vision tracking, and automated scanning heuristics.",
                  badge: "Gemini / OpenCV",
                  color: "border-emerald-500/20"
                }
              ].map((pil, idx) => (
                <div key={idx} className={`glass-card p-6 rounded-2xl text-center flex flex-col justify-between items-center border ${pil.color} hover:border-[#00f7ff]/25 transition-all`}>
                  <div className="mb-4">
                    <span className="bg-[#00f7ff]/5 text-[#00f7ff] text-[9px] font-mono px-2 py-0.5 rounded uppercase font-bold">{pil.title}</span>
                    <p className="text-xs text-on-surface-variant-custom mt-3 leading-relaxed">
                      {pil.subtitle}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-[#00f7ff] uppercase font-bold tracking-wider mt-4">{pil.badge}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:prabhusiddarth37@gmail.com"
                className="neo-btn px-8 py-3.5 rounded text-xs text-[#00f7ff] font-mono font-bold uppercase tracking-widest flex items-center gap-2 border border-[#00f7ff]/20"
              >
                <Mail size={14} />
                SEND EMAIL DIRECTLY
              </a>
              <a
                href="#contact"
                onClick={toggleHire}
                className="neo-btn px-8 py-3.5 rounded text-xs text-white font-mono font-bold uppercase tracking-widest flex items-center gap-2 border border-white/5"
              >
                DISPATCH TERMINAL MESSAGE
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Overlays 2: Interactive SDE Resume Document View */}
      {showResumeModal && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/85 backdrop-blur-2xl px-4 py-8 overflow-y-auto animate-fade-in" id="resume-modal-overlay">
          <div className="w-full max-w-3xl bg-[#111118] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl relative my-auto max-h-[90vh] overflow-y-auto flex flex-col">
            
            {/* Header control buttons */}
            <div className="sticky top-0 bg-[#111118]/90 py-2.5 flex justify-between items-center border-b border-white/5 mb-6 z-50">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-[#00f7ff]" />
                <span className="font-mono text-xs text-white">Prabhu_Siddarth_SDE_Resume.pdf</span>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  onClick={triggerDirectPrint}
                  className="p-1.5 rounded hover:bg-white/5 text-on-surface-variant-custom hover:text-white transition-colors"
                  title="Print Resume"
                  id="resume-print-btn"
                >
                  <Printer size={16} />
                </button>
                <button
                  onClick={copyDocLink}
                  className="p-1.5 rounded hover:bg-white/5 text-on-surface-variant-custom hover:text-white transition-colors flex items-center gap-1 text-[10px] font-mono"
                  title="Copy Document Link"
                  id="resume-copy-link-btn"
                >
                  {copiedLink ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  {copiedLink ? "COPIED" : "COPY LINK"}
                </button>
                <button
                  onClick={toggleResume}
                  className="neo-btn w-8 h-8 rounded-full flex items-center justify-center text-[#ff4444]"
                  title="Close Document"
                  id="resume-modal-close-btn"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Resume Document Structure for PDF compilation */}
            <div className="bg-white text-slate-900 p-8 md:p-12 rounded-lg shadow-inner flex-1 font-sans text-[11px] leading-relaxed select-text" id="printable-resume-frameBox">
              
              {/* Header profile details */}
              <div className="border-b-2 border-slate-900 pb-4 mb-4">
                <h1 className="text-3xl font-extrabold tracking-tight text-[#1b4e72] uppercase">PRABHU SIDDARTH A V</h1>
                <p className="text-sm font-semibold text-[#2c5282] mt-0.5">Software Development Engineer</p>
                
                {/* Info row with beautiful tiny icons */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-[10px] text-slate-700 font-medium">
                  <div className="flex items-center gap-1">
                    <Mail size={11} className="text-[#1b4e72]" />
                    <span>prabhusiddarth37@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone size={11} className="text-[#1b4e72]" />
                    <span>+91 7418981007</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Github size={11} className="text-[#1b4e72]" />
                    <span>Prabhusiddarth</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Linkedin size={11} className="text-[#1b4e72]" />
                    <span>Prabhusiddarth</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe size={11} className="text-[#1b4e72]" />
                    <span>psTech</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={11} className="text-[#1b4e72]" />
                    <span>Coimbatore</span>
                  </div>
                </div>
              </div>

              {/* Sections flow */}
              <div className="space-y-4 text-slate-800">
                
                {/* SUMMARY */}
                <div>
                  <h3 className="font-bold border-b border-[#1b4e72]/30 text-[#1b4e72] uppercase text-xs tracking-wider pb-0.5 mb-1.5">Summary</h3>
                  <p className="text-justify text-slate-700 leading-normal">
                    B.Tech Information Technology student with strong foundations in <strong className="text-slate-950">Java, Data Structures, and Object-Oriented Programming</strong>. Solved <strong className="text-slate-950">250+ LeetCode problems</strong> and <strong className="text-slate-950">200+ DSA challenges</strong>, demonstrating strong problem-solving and analytical skills. Interested in <strong className="text-slate-950">backend development, and AI-based systems</strong>.
                  </p>
                </div>

                {/* EDUCATION */}
                <div>
                  <h3 className="font-bold border-b border-[#1b4e72]/30 text-[#1b4e72] uppercase text-xs tracking-wider pb-0.5 mb-2">Education</h3>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>HSC, Bharathiya Vidya Bhavan</span>
                        <span className="font-semibold text-slate-600 text-[10px]">06/2023 – 03/2025</span>
                      </div>
                      <div className="flex justify-between text-slate-600 font-medium">
                        <span>Group: BioMaths Grade: 86.5%</span>
                        <span>Coimbatore</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>B.Tech - Information Technology, Sri Shakthi Institute of Engineering and Technology</span>
                        <span className="font-semibold text-slate-600 text-[10px]">09/2024 – 2028</span>
                      </div>
                      <div className="flex justify-between text-slate-600 font-medium">
                        <span>CGPA: 8.28</span>
                        <span>Coimbatore</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* TECHNICAL SKILLS */}
                <div>
                  <h3 className="font-bold border-b border-[#1b4e72]/30 text-[#1b4e72] uppercase text-xs tracking-wider pb-0.5 mb-2">Technical Skills</h3>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-slate-700 leading-relaxed">
                    <div>
                      <p><strong className="text-slate-900 block mt-1">Programming Languages</strong> Java, C, Python(Amateur)</p>
                      <p className="mt-1"><strong className="text-slate-900 block mt-1">Databases</strong> SQL, MongoDB, PostgreSQL</p>
                      <p className="mt-1"><strong className="text-slate-900 block mt-1">Web Technologies</strong> HTML, CSS, JavaScript</p>
                    </div>
                    <div>
                      <p><strong className="text-slate-900 block mt-1">Backend Development</strong> FastAPI</p>
                      <p className="mt-1"><strong className="text-slate-900 block mt-1">Tools & Systems</strong> Git, VS Code, Linux, Android Studio, Docker, GitHub</p>
                      <p className="mt-1"><strong className="text-slate-900 block mt-1">Core Concepts</strong> Data Structures and Algorithms, Object-Oriented Programming, Problem Solving, Operating Systems</p>
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h3 className="font-bold border-b border-[#1b4e72]/30 text-[#1b4e72] uppercase text-xs tracking-wider pb-0.5 mb-1.5">Achievements</h3>
                  <p className="font-bold text-slate-700 text-[10px] mb-1">Achievements, Coding Experience</p>
                  <ul className="list-disc list-outside pl-4 space-y-1 text-slate-700">
                    <li><strong className="text-slate-900">LeetCode Practice:</strong> Solved 200+ problems and 150+ DSA challenges improving algorithmic problem solving.</li>
                    <li><strong className="text-slate-900">AICTE Virtual Internship – Microsoft Azure AI:</strong> Completed a 4-week virtual internship focused on Artificial Intelligence fundamentals and Azure technologies.</li>
                  </ul>
                </div>

                {/* PROJECTS */}
                <div>
                  <h3 className="font-bold border-b border-[#1b4e72]/30 text-[#1b4e72] uppercase text-xs tracking-wider pb-0.5 mb-2">Projects</h3>
                  <div className="space-y-2.5 text-slate-700">
                    <div>
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>NexusCloud, <span className="font-normal italic text-slate-600">Multi cloud orchestration</span></span>
                        <span className="font-semibold text-slate-600 text-[10px]">06/2026 – Present</span>
                      </div>
                      <ul className="list-disc list-outside pl-4 space-y-0.5 mt-0.5">
                        <li>Developing a platform that aggregates multiple cloud storage providers through a unified API.</li>
                        <li>Building scalable backend services using FastAPI, PostgreSQL, and Docker.</li>
                      </ul>
                    </div>
                    <div>
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>Swara — Offline Android Music Player, <span className="font-normal italic text-slate-600">Java | Android Studio</span></span>
                        <span className="font-semibold text-slate-600 text-[10px]">04/2026 – Present</span>
                      </div>
                      <p className="pl-4 leading-normal mt-0.5">
                        Developed an offline Android music player with background playback and Room Database integration.
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>Distraction Monitor – AI Powered Attention Tracker</span>
                        <span className="font-semibold text-slate-600 text-[10px]">06/2025 – 07/2025</span>
                      </div>
                      <p className="pl-4 leading-normal mt-0.5">
                        AI-based prototype to detect distracting content like YouTube Shorts and Instagram Reels using real-time screen monitoring with alert mechanisms and a simple HTML/CSS/JS interface.
                      </p>
                    </div>
                  </div>
                </div>

                {/* EXPERIENCE */}
                <div>
                  <h3 className="font-bold border-b border-[#1b4e72]/30 text-[#1b4e72] uppercase text-xs tracking-wider pb-0.5 mb-2">Experience</h3>
                  <div>
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>Technical Experience, <span className="font-normal italic text-slate-600">Self-Directed Projects</span></span>
                      <span className="font-semibold text-slate-600 text-[10px]">2024 – Present</span>
                    </div>
                    <ul className="list-disc list-outside pl-4 space-y-0.5 mt-0.5 text-slate-700">
                      <li>Built backend applications using Java and OOP principles.</li>
                      <li>Practiced DSA-focused problem solving and version control with Git.</li>
                    </ul>
                  </div>
                </div>

                {/* INTERESTS */}
                <div>
                  <h3 className="font-bold border-b border-[#1b4e72]/30 text-[#1b4e72] uppercase text-xs tracking-wider pb-0.5 mb-1.5">Interests</h3>
                  <p className="text-slate-700">
                    Backend Development, Cloud Computing, Artificial Intelligence, Distributed Systems, Open Source
                  </p>
                </div>

              </div>
            </div>

            {/* Footer triggers */}
            <div className="mt-6 pt-4 border-t border-white/5 flex justify-end gap-3 font-mono">
              <button
                onClick={triggerDirectPrint}
                className="neo-btn px-6 py-2 rounded text-xs text-[#00f7ff] uppercase tracking-widest border border-[#00f7ff]/20 font-bold flex items-center gap-1"
                id="doc-print-btn"
              >
                <Printer size={12} />
                Print Resume Document
              </button>
              <button
                onClick={toggleResume}
                className="neo-btn px-6 py-2 rounded text-xs text-on-surface-variant-custom uppercase tracking-widest border border-white/5 hover:text-white"
              >
                Cancel View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
