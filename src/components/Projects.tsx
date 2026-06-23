import React, { useState } from "react";
import { PROJECTS_DATA } from "../data";
import { Project } from "../types";
import { Shield, Cloud, Music, Brain, Eye, AlertTriangle, Vote, Edit, DollarSign, Package, CheckSquare, Folder, ExternalLink, X, Github, Terminal, Sparkles } from "lucide-react";
import AlgoMentorWidget from "./AlgoMentorWidget";
import RateLimiterSimulator from "./RateLimiterSimulator";
import PhishingScanner from "./PhishingScanner";
import SwaraPlayer from "./SwaraPlayer";

export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "shield": return <Shield className="w-5 h-5 text-[#00f7ff]" />;
      case "cloud": return <Cloud className="w-5 h-5 text-[#00f7ff]" />;
      case "music": return <Music className="w-5 h-5 text-[#00f7ff]" />;
      case "brain": return <Brain className="w-5 h-5 text-[#00f7ff]" />;
      case "eye": return <Eye className="w-5 h-5 text-[#00f7ff]" />;
      case "alert-triangle": return <AlertTriangle className="w-5 h-5 text-[#00f7ff]" />;
      case "vote": return <Vote className="w-5 h-5 text-[#00f7ff]" />;
      case "edit": return <Edit className="w-5 h-5 text-[#00f7ff]" />;
      case "dollar-sign": return <DollarSign className="w-5 h-5 text-[#00f7ff]" />;
      case "package": return <Package className="w-5 h-5 text-[#00f7ff]" />;
      case "check-square": return <CheckSquare className="w-5 h-5 text-[#00f7ff]" />;
      case "folder": return <Folder className="w-5 h-5 text-[#00f7ff]" />;
      default: return <Folder className="w-5 h-5 text-[#00f7ff]" />;
    }
  };

  const handleOpenDetails = (proj: Project) => {
    setActiveProject(proj);
    // Disable background page scrolling while modal is active
    document.body.style.overflow = "hidden";
  };

  const handleCloseDetails = () => {
    setActiveProject(null);
    document.body.style.overflow = "auto";
  };

  return (
    <section className="py-24 px-6 md:px-20 bg-background-custom" id="projects">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-16">
          <div className="h-[2px] w-12 bg-[#00f7ff]"></div>
          <h2 className="font-mono text-sm md:text-base text-[#00f7ff] uppercase tracking-[0.2em] font-bold">// PROJECTS</h2>
        </div>

        {/* 12-Column Grid of Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS_DATA.map((proj) => {
            const isFeatured = proj.featured;

            if (isFeatured) {
              return (
                <div
                  key={proj.id}
                  className="md:col-span-2 lg:col-span-3 brutalist-card brutalist-gold p-6 md:p-8 flex flex-col md:flex-row justify-between items-stretch gap-6 group scale-down-click cursor-default"
                >
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="bg-[#FFA116] text-black font-mono text-[9px] px-2.5 py-1 font-bold uppercase tracking-wider">
                          FEATURED_GOLD // SDE ARCHITECTURE
                        </span>
                        {getIcon(proj.iconName)}
                      </div>

                      <h3 className="font-display text-xl sm:text-2xl font-black text-white uppercase mb-3">
                        {proj.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-on-surface-variant-custom leading-relaxed max-w-xl">
                        {proj.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-4 mb-6">
                        {proj.techs.map((tech) => (
                          <span
                            key={tech}
                            className="bg-[#111118] text-on-surface-variant-custom text-[9px] font-mono px-2 py-1 border border-white/5 uppercase rounded font-bold"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 border-t border-white/5 pt-4">
                      <button
                        onClick={() => handleOpenDetails(proj)}
                        className="neo-btn px-5 py-2.5 rounded font-label text-[10px] text-[#FFA116] uppercase tracking-widest border border-[#FFA116]/10 font-black flex items-center gap-1 hover:brightness-110 active:scale-95 duration-200"
                        id={`proj-open-${proj.id}-btn`}
                      >
                        <Terminal size={12} />
                        VIEW_SYSTEM
                      </button>
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="GitHub repo"
                        className="p-2 bg-[#111118] text-on-surface-variant-custom hover:text-white border border-white/5 rounded-full hover:border-white/20 transition-all active:scale-95"
                      >
                        <Github size={14} />
                      </a>
                    </div>
                  </div>

                  {/* Aesthetic visual sidebar indicating system blocks */}
                  <div className="hidden md:flex md:w-48 bg-slate-950/40 rounded-xl border border-white/5 flex-col items-center justify-center relative overflow-hidden shrink-0 select-none opacity-80 group-hover:opacity-100 transition-opacity">
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#FFA116]/30"></div>
                    {proj.id === "rlaas" ? (
                      <Shield className="w-16 h-16 text-[#FFA116]/10 group-hover:text-[#FFA116]/30 transition-all duration-500 scale-110" />
                    ) : (
                      <Cloud className="w-16 h-16 text-[#FFA116]/10 group-hover:text-[#FFA116]/30 transition-all duration-500 scale-110" />
                    )}
                    <span className="font-mono text-[8px] text-[#FFA116]/40 tracking-widest uppercase mt-4">STABLE_COMPILATION</span>
                  </div>
                </div>
              );
            }

            // Standard Glassmorphism grid card template
            return (
              <div
                key={proj.id}
                className="glass-card p-5 rounded-2xl border border-white/5 hover:border-[#00f7ff]/10 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/5">
                    <span className="bg-emerald-500/10 text-[#00f7ff] font-mono text-[8.5px] px-2 py-0.5 rounded uppercase tracking-wider font-bold">
                      {proj.badge}
                    </span>
                    {getIcon(proj.iconName)}
                  </div>

                  <h3 className="font-display text-base font-bold text-white uppercase mb-2 group-hover:text-[#00f7ff] transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-on-surface-variant-custom leading-relaxed line-clamp-3 mb-5">
                    {proj.description}
                  </p>
                </div>

                <div className="border-t border-white/5 pt-4 flex items-center justify-between mt-auto">
                  <button
                    onClick={() => handleOpenDetails(proj)}
                    className="text-[#00f7ff] font-mono text-[10px] tracking-widest uppercase font-black hover:underline hover:after:content-['→'] shrink-0 select-none flex items-center gap-1"
                    id={`proj-open-${proj.id}-btn`}
                  >
                    DETAILS
                  </button>

                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[8px] text-on-surface-variant-custom opacity-40 uppercase tracking-tighter">
                      {proj.techs[0]} // {proj.techs[1] || "SYS"}
                    </span>
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-on-surface-variant-custom hover:text-white transition-all scale-95"
                    >
                      <Github size={12} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Overlay Drawer detailing Selected Project + Real Interactive Module */}
      {activeProject && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/90 backdrop-blur-3xl px-4 py-8 overflow-y-auto">
          <div className="w-[95%] max-w-5xl bg-[#111118]/90 border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl relative my-auto max-h-[85vh] overflow-y-auto custom-scrollbar flex flex-col">
            <button
              onClick={handleCloseDetails}
              className="sticky top-0 self-end neo-btn w-9 h-9 rounded-full flex items-center justify-center text-[#00f7ff] z-50 scale-down-click"
              title="Close System Details"
              id="proj-modal-close-btn"
            >
              <X size={16} />
            </button>

            <div className="flex-1 mt-4">
              <span className="font-mono text-xs text-[#00f7ff] uppercase tracking-wider block mb-1">
                // SYSTEM DIAGNOSTICS & ACTIVE SIMULATOR
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-3">
                {activeProject.title}
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant-custom leading-relaxed mb-6 border-b border-white/5 pb-4">
                {activeProject.content}
              </p>

              {/* RENDER THE RELEVANT INTERACTIVE SIMULATOR SYSTEM */}
              {activeProject.id === "algomentor" && (
                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-3 bg-primary-container-custom/5 p-3.5 border border-primary-container-custom/15 rounded">
                    <Sparkles className="text-primary-container-custom animate-pulse shrink-0" size={16} />
                    <span className="text-[10px] sm:text-xs font-mono text-primary-container-custom uppercase tracking-wider font-extrabold">Active System Module: Live Gemini Socratic Compiler Assistant</span>
                  </div>
                  <AlgoMentorWidget />
                </div>
              )}

              {activeProject.id === "rlaas" && (
                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-3 bg-primary-container-custom/5 p-3.5 border border-primary-container-custom/15 rounded">
                    <Sparkles className="text-primary-container-custom animate-pulse shrink-0" size={16} />
                    <span className="text-[10px] sm:text-xs font-mono text-primary-container-custom uppercase tracking-wider font-extrabold font-black">Active System Module: RLaaS Header Engine Router Simulator</span>
                  </div>
                  <RateLimiterSimulator />
                </div>
              )}

              {activeProject.id === "phishing" && (
                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-3 bg-red-400/5 p-3.5 border border-red-400/15 rounded">
                    <Sparkles className="text-red-400 animate-pulse shrink-0" size={16} />
                    <span className="text-[10px] sm:text-xs font-mono text-red-400 uppercase tracking-wider font-semibold">Active System Module: Heuristic URL scanner and character mapper</span>
                  </div>
                  <PhishingScanner />
                </div>
              )}

              {activeProject.id === "swara" && (
                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-3 bg-secondary-container-custom/5 p-3.5 border border-secondary-container-custom/15 rounded">
                    <Sparkles className="text-[#00f7ff] animate-pulse shrink-0" size={16} />
                    <span className="text-[10px] sm:text-xs font-mono text-[#00f7ff] uppercase tracking-wider font-semibold">Active System Module: Web Audio API Oscillator synthesizer</span>
                  </div>
                  <SwaraPlayer />
                </div>
              )}

              {/* If no interactive widget is mapped, render high-fidelity specifications log */}
              {!["algomentor", "rlaas", "phishing", "swara"].includes(activeProject.id) && (
                <div className="mt-6 neo-inset p-6 rounded-xl border border-white/5 font-mono text-xs">
                  <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                    <span className="text-[#00f7ff] font-bold uppercase tracking-wider">// PROJECT METADATA LOG</span>
                    <span className="text-emerald-400 uppercase font-black">STABLE</span>
                  </div>
                  <ul className="space-y-2.5">
                    <li className="flex justify-between border-b border-white/5 pb-1.5">
                      <span className="opacity-60">System Registry Name:</span>
                      <span className="text-white font-bold">{activeProject.id.toUpperCase()}_ENG</span>
                    </li>
                    <li className="flex justify-between border-b border-white/5 pb-1.5">
                      <span className="opacity-60">Integrated Frameworks:</span>
                      <span className="text-white font-bold">{activeProject.techs.join(" / ")}</span>
                    </li>
                    <li className="flex justify-between border-b border-white/5 pb-1.5">
                      <span className="opacity-60">Target Platform Environment:</span>
                      <span className="text-white font-bold">{activeProject.category || "Fullstack Environment"}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="opacity-60">Security Integrity Check:</span>
                      <span className="text-emerald-400 font-bold">Passed (SHA-256 Valid)</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-10 pt-4 border-t border-white/5 flex justify-end gap-3 font-mono">
              <a
                href={activeProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn px-6 py-2.5 rounded font-label text-[10px] text-white uppercase tracking-widest border border-white/5 font-black flex items-center gap-1 hover:text-cyan-400"
              >
                <Github size={12} />
                Open Code repository
              </a>
              <button
                onClick={handleCloseDetails}
                className="neo-btn px-6 py-2.5 rounded font-label text-[10px] text-on-surface-variant-custom uppercase tracking-widest border border-white/5 hover:text-white"
              >
                Back to dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
