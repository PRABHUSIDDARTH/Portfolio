import React from "react";
import { Award, Terminal, ShieldCheck, HeartHandshake, FileBadge } from "lucide-react";

export default function Recognition() {
  const accolades = [
    {
      title: "250+ Solved Matrix",
      organization: "LeetCode Mastery",
      description: "Resolved over 250 data structure index and algorithmic challenges with high time-space efficiency benchmarks.",
      icon: <Award className="w-6 h-6 text-[#00f7ff] shrink-0" />
    },
    {
      title: "Azure AI Certified",
      organization: "AICTE × Microsoft",
      description: "Certified virtual program specializing in computer vision neural nodes, custom classifiers, and deployment pipelines.",
      icon: <ShieldCheck className="w-6 h-6 text-[#00f7ff] shrink-0" />
    },
    {
      title: "Frontend SDE Intern",
      organization: "IBM × EDUNET",
      description: "Designed responsive dashboard clients, engineered local states, and optimized layout assets for high visual rendering speed.",
      icon: <FileBadge className="w-6 h-6 text-[#00f7ff] shrink-0" />
    }
  ];

  return (
    <section className="py-24 px-6 md:px-20 bg-[#0e0e13]" id="achievements">
      <div className="max-w-7xl mx-auto">
        {/* Section title */}
        <div className="flex items-center gap-3 mb-16">
          <div className="h-[2px] w-12 bg-[#00f7ff]"></div>
          <h2 className="font-mono text-sm md:text-base text-[#00f7ff] uppercase tracking-[0.2em] font-bold">// RECOGNITION</h2>
        </div>

        {/* Accolades layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {accolades.map((acc, i) => (
            <div
              key={i}
              className="neo-btn p-8 rounded-2xl flex flex-col items-center text-center group cursor-default"
            >
              <div className="w-14 h-14 neo-inset rounded-full flex items-center justify-center mb-6 border border-white/5 group-hover:border-[#00f7ff]/20 transition-all duration-300">
                {acc.icon}
              </div>
              <h4 className="font-display text-base font-bold text-white uppercase group-hover:text-[#00f7ff] transition-colors">{acc.title}</h4>
              <p className="font-mono text-[9px] text-[#00f7ff]/70 uppercase tracking-wider font-extrabold mt-1">
                {acc.organization}
              </p>
              
              <p className="text-xs text-on-surface-variant-custom/80 mt-4 leading-relaxed border-t border-white/5 pt-3">
                {acc.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
