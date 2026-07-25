import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight, Download, Terminal, Settings2 } from "lucide-react";

interface HeroProps {
  onOpenResume: () => void;
}

export default function Hero({ onOpenResume }: HeroProps) {
  const [solvedCount, setSolvedCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  
  // Typewriter implementation
  const phrases = [
    "Problem Solver 300+_",
    "Backend Engineer_",
    "Android Developer_",
    "AI Systems Builder_",
    "DevOps Analyst_",
    "Distributed Systems Architect_"
  ];
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Counter animation on mount
  useEffect(() => {
    let solTimer = setInterval(() => {
      setSolvedCount((prev) => {
        if (prev >= 250) {
          clearInterval(solTimer);
          return 300;
        }
        return prev + 5;
      });
    }, 20);

    let projTimer = setInterval(() => {
      setProjectCount((prev) => {
        if (prev >= 12) {
          clearInterval(projTimer);
          return 12;
        }
        return prev + 1;
      });
    }, 80);

    return () => {
      clearInterval(solTimer);
      clearInterval(projTimer);
    };
  }, []);

  // Typewriter loop
  useEffect(() => {
    const currentFullWord = phrases[phraseIdx];
    let timer: any;

    if (!isDeleting) {
      if (displayText !== currentFullWord) {
        timer = setTimeout(() => {
          setDisplayText(currentFullWord.substring(0, displayText.length + 1));
        }, 85);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 1800);
      }
    } else {
      if (displayText !== "") {
        timer = setTimeout(() => {
          setDisplayText(currentFullWord.substring(0, displayText.length - 1));
        }, 40);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(false);
          setPhraseIdx((prev) => (prev + 1) % phrases.length);
        }, 200);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIdx]);

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-20 relative border-b-2 border-[#00f7ff]/20 pt-32 pb-20 overflow-hidden" id="hero">
      {/* Background radial orbs */}
      <div className="orb w-[420px] h-[420px] bg-[#00f7ff]/20 top-[-80px] left-[-80px]"></div>
      <div className="orb w-[500px] h-[500px] bg-secondary-container-custom/10 bottom-[-80px] right-[-80px]" style={{ animationDelay: "-5s" }}></div>

      <div className="max-w-7xl w-full mx-auto relative z-10">
        <div className="flex items-center gap-2 mb-4 animate-fade-in">
          <span className="w-1.5 h-1.5 bg-[#00f7ff] rounded-sm"></span>
          <p className="font-mono text-[10px] md:text-xs text-[#00f7ff] tracking-[0.2em] uppercase font-bold">// SOFTWARE DEVELOPMENT ENGINEER</p>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-none mb-4 text-[#efffff] drop-shadow-[5px_5px_0px_#00f7ff] tracking-tight">
          PRABHU SIDDARTH
        </h1>

        {/* Looping typewriter */}
        <div className="h-10 mb-10">
          <span className="typewriter font-mono text-lg md:text-xl text-on-surface-variant-custom font-bold">
            {displayText}
          </span>
        </div>

        {/* Stats counters grid (Neomorphic Inset styled) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-4xl">
          <div className="neo-inset p-4 rounded-xl border border-white/5 group hover:border-[#00f7ff]/20 transition-all duration-300">
            <p className="font-display text-3xl font-black text-[#efffff]">
              {solvedCount}+
            </p>
            <p className="font-label text-[10px] text-on-surface-variant-custom tracking-wider uppercase font-bold mt-1">LeetCode Solved</p>
          </div>
          <div className="neo-inset p-4 rounded-xl border border-white/5 group hover:border-[#00f7ff]/20 transition-all duration-300">
            <p className="font-display text-3xl font-black text-[#efffff]">
              8.43
            </p>
            <p className="font-label text-[10px] text-on-surface-variant-custom tracking-wider uppercase font-bold mt-1">CGPA Metric</p>
          </div>
          <div className="neo-inset p-4 rounded-xl border border-white/5 group hover:border-[#00f7ff]/20 transition-all duration-300">
            <p className="font-display text-3xl font-black text-[#efffff]">
              {projectCount}+
            </p>
            <p className="font-label text-[10px] text-on-surface-variant-custom tracking-wider uppercase font-bold mt-1">SDE Projects</p>
          </div>
          <div className="neo-inset p-4 rounded-xl border border-white/5 group hover:border-[#00f7ff]/20 transition-all duration-300">
            <p className="font-display text-3xl font-black text-[#efffff]">
              2024
            </p>
            <p className="font-label text-[10px] text-on-surface-variant-custom tracking-wider uppercase font-bold mt-1">Started Coding</p>
          </div>
        </div>

        <div className="max-w-3xl mb-12">
          <p className="font-sans text-sm md:text-base text-on-surface-variant-custom leading-relaxed">
            B.Tech Information Technology candidate at Sri Shakthi Institute, Coimbatore. Highly invested in assembling distributed client-server systems, Native Android architectures, and LLM-powered socratic diagnostics tools. Sharpened logic with over 300 solved algorithmic challenges. Always compiling.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <a
            href="#projects"
            className="neo-btn px-6 md:px-8 py-4 rounded font-label text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 border border-white/5 hover:border-white/10"
            id="hero-view-work-btn"
          >
            Explore Portfolio
            <ArrowRight size={14} className="text-[#00f7ff]" />
          </a>
          <button
            onClick={onOpenResume}
            className="neo-btn px-6 md:px-8 py-4 rounded font-label text-xs font-bold text-[#00f7ff] uppercase tracking-wider flex items-center gap-2 border border-[#00f7ff]/20"
            id="hero-download-cv-btn"
          >
            <Download size={14} />
            Procure CV Document
          </button>
        </div>
      </div>

      {/* Decorative Sidebar telemetry widget */}
      <div className="absolute right-20 bottom-16 hidden lg:block opacity-35 hover:opacity-85 transition-opacity duration-300">
        <div className="neo-inset p-5 rounded-xl border border-white/5 w-72">
          <div className="flex items-center gap-3 mb-3">
            <Terminal size={14} className="text-[#00f7ff]" />
            <span className="font-mono text-[9px] text-[#efffff] uppercase tracking-widest font-extrabold">Daemon Pipeline Monitor</span>
          </div>
          <div className="space-y-1.5 font-mono text-[9px] text-on-surface-variant-custom">
            <div className="flex justify-between">
              <span>SDE_ROUTINE:</span>
              <span className="text-emerald-400">ACTIVE_SLEEPLESS</span>
            </div>
            <div className="flex justify-between">
              <span>LATENCY_PING:</span>
              <span className="text-[#00f7ff]">0.42ms (REDIS)</span>
            </div>
          </div>
          <div className="w-full h-1 bg-white/5 rounded-full mt-4 overflow-hidden">
            <div className="bg-[#00f7ff] h-full w-4/5 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
