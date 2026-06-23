import React from "react";
import { TIMELINE_DATA } from "../data";
import { Calendar, Award, Code2, GraduationCap, ChevronRight } from "lucide-react";

export default function Journey() {
  return (
    <section className="py-24 px-6 md:px-20 bg-gradient-to-b from-[#0d0d12] to-[#111118]" id="about">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="flex items-center gap-3 mb-16">
          <div className="h-[2px] w-12 bg-[#00f7ff]"></div>
          <h2 className="font-mono text-sm md:text-base text-[#00f7ff] uppercase tracking-[0.2em] font-bold">// MY_JOURNEY</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Bio Description (Left Column) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="glass-card p-8 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-[#00f7ff]/20 transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#00f7ff]/5 to-transparent rounded-bl-full pointer-events-none"></div>
              
              <h3 className="font-display text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-5">// ARCHITECTING SYSTEM RELIABILITY</h3>
              
              <div className="space-y-5 text-sm md:text-base text-on-surface-variant-custom leading-relaxed">
                <p>
                  I am an Information Technology candidate at Sri Shakthi Institute, Coimbatore, deeply invested in building microservice backends, native Android platforms, and generative logic integrations.
                </p>
                <p>
                  My engineering journey focuses heavily on clean, scalable code. I create multithreaded backends with Spring Boot, responsive API routers with FastAPI, and fluid graphical playbacks for mobile clients.
                </p>
                <p>
                  Having parsed over 250 data structure matrices, I approach bottlenecks systematically, resolving thread-lock constraints and caching queries to secure efficient micro-seconds.
                </p>
              </div>

              {/* Highlighting expertise badges */}
              <div className="mt-8 flex flex-wrap gap-2.5">
                {["Concurrency Channels", "Distributed Routing", "Android Sandbox", "Socratic Prompting"].map((tg) => (
                  <span 
                    key={tg} 
                    className="neo-inset px-3.5 py-2 rounded-lg text-[10px] font-mono text-[#00f7ff] border border-white/5 uppercase font-bold tracking-wider"
                  >
                    {tg}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Chronological Timeline Node list (Right Column) */}
          <div className="lg:col-span-7 relative pl-8 md:pl-12">
            {/* Structural glowing line */}
            <div className="absolute left-[13px] md:left-[17px] top-4 bottom-4 w-[2.5px] bg-[#00f7ff] shadow-[0_0_8px_#00f7ff]"></div>

            <div className="space-y-10">
              {TIMELINE_DATA.map((item, index) => (
                <div key={index} className="relative group">
                  {/* Rotating timeline node */}
                  <div className="absolute -left-[28px] md:-left-[36px] top-1.5 w-4 h-4 md:w-5 md:h-5 bg-background-custom border-3 border-[#00f7ff] rounded-sm rotate-45 z-10 group-hover:bg-[#00f7ff] transition-all duration-300"></div>

                  {/* Card description */}
                  <div className="glass-card p-6 rounded-xl border-l-[3px] border-[#00f7ff] group-hover:translate-x-1.5 transition-transform duration-300">
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <span className="font-mono text-xs text-[#00f7ff] font-bold tracking-widest">{item.year}</span>
                      <ChevronRight size={14} className="text-[#00f7ff] opacity-40 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h4 className="font-display text-base font-bold text-white uppercase group-hover:text-[#00f7ff] transition-colors">{item.title}</h4>
                    <p className="text-xs text-on-surface-variant-custom font-mono mt-0.5">{item.subtitle}</p>
                    
                    {item.details && (
                      <p className="text-xs text-on-surface-variant-custom/80 mt-3 leading-relaxed border-t border-white/5 pt-2 whitespace-pre-line">
                        {item.details}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
