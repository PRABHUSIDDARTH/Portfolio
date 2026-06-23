import React from "react";
import { Sparkles, Terminal, FileText, HeartHandshake } from "lucide-react";

interface NavbarProps {
  onToggleHire: () => void;
  onOpenResume: () => void;
}

export default function Navbar({ onToggleHire, onOpenResume }: NavbarProps) {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl rounded-full border border-outline-custom/15 bg-slate-950/75 backdrop-blur-xl z-[1000] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex justify-between items-center px-6 md:px-8 py-3">
      {/* Brand Logo with brutal shadow */}
      <a 
        href="#hero"
        className="font-display text-lg md:text-xl font-extrabold text-[#efffff] drop-shadow-[2.5px_2.5px_0px_#00f7ff] tracking-tight hover:scale-105 transition-transform"
      >
        PS
      </a>

      {/* Nav links */}
      <div className="hidden md:flex gap-8">
        {[
          { label: "PROJECTS", href: "#projects" },
          { label: "EXPERIENCE", href: "#about" },
          { label: "STACK", href: "#skills" },
          { label: "CONTACT", href: "#contact" }
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="font-label text-xs tracking-widest text-on-surface-variant-custom hover:text-white relative hover:after:w-full after:w-0 transition-all after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-[#00f7ff] after:transition-all after:duration-300 pb-1 font-bold"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Dynamic Action Buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleHire}
          className="hire-me-glow neo-btn px-4 md:px-5 py-2 rounded-full font-label text-[10px] md:text-xs text-[#00f7ff] uppercase tracking-widest active:scale-95 duration-200 hidden sm:flex items-center gap-1 border border-[#00f7ff]/20 font-bold"
          id="nav-hire-me-btn"
        >
          <HeartHandshake size={12} />
          HIRE ME
        </button>
        <button
          onClick={onOpenResume}
          className="neo-btn px-4 md:px-5 py-2 rounded-full font-label text-[10px] md:text-xs text-white uppercase tracking-widest active:scale-95 duration-200 flex items-center gap-1 font-bold border border-white/5"
          id="nav-resume-btn"
        >
          <FileText size={12} className="text-[#00f7ff]" />
          RESUME
        </button>
      </div>
    </nav>
  );
}
