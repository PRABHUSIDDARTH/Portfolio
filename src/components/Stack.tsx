import React, { useState } from "react";
import { SKILL_GROUPS } from "../data";
import { Code, Smartphone, Brain, Database, Cpu, Terminal, Search, HelpCircle } from "lucide-react";

export default function Stack() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>("SPRING BOOT");

  // Descriptions of Prabhu's real-world usage for selected technologies
  const tagDescriptions: { [key: string]: string } = {
    "JAVA": "Used as the heavy-duty engine for systems of high concurrency, including multithreaded bank simulation ledger codes.",
    "PYTHON": "Prabhu's primary utility tool deployed for AI computer structures, machine learning datasets, and FastAPI pipelines.",
    "C": "Utilized to master core programming layouts, low-level data structure indexing, and memory allocation limits.",
    "JAVASCRIPT": "Primary client-side scripting language used to bind interactive models and dynamic visuals within educational engines.",
    "TYPESCRIPT": "Employed to implement compile-time type schemas across frontend modules and the socratic codelab platform.",
    "ANDROID (JAVA)": "Designed and deployed native application layers like Swara Music player, managing media channels and caching queues.",
    "ANDROID STUDIO": "Core IDE of choice for modular native Android compilation, handling Gradle automation and layout structures.",
    "HTML5": "Constructingsemantic layout structures for web systems like the election awareness portal.",
    "CSS3": "Styling immersive visual coordinates, custom variables, and responsive grid layouts.",
    "REACT": "Building web environments, configuring modular hooks, and driving socratic state engines.",
    "TAILWIND CSS": "Harnessing utility wrappers, responsive flags, and styling of custom neon/glass portfolios.",
    "TENSORFLOW": "Training computer-vision networks, classifying imagery logs, and deploying focus sensors.",
    "OPENCV": "Processing active digital video feeds, tracking Pupil/EAR constants, and managing distraction vectors.",
    "MEDIAPIPE": "Facial mesh plotting, skeletal joints monitoring, and coordinates analytics in vision engines.",
    "GEMINI API": "Integrating advanced AI models into socratic assistants to analyze code templates safely without spoiling solutions.",
    "FASTAPI": "Crafting high-speed asynchronous routing, validating JSON requests, and wrapping python logic structures.",
    "SPRING BOOT": "Structuring enterprise rate-limiting algorithms, Redis integration paths, and secure server-to-server networks.",
    "POSTGRESQL": "Configuring durable relational tables, indexing indexes, and querying complex SQL transactions.",
    "REDIS": "Integrated as memory database to execute token refills in sub-milliseconds inside the distributed RLaaS pipeline.",
    "MONGODB": "Managing cluster schema flexibility, compiling metadata records, and saving reader indices.",
    "SQL": "Writing structured subqueries, joining tabular datasets, and monitoring relational performance metrics.",
    "GIT": "Executing branch separations, managing commits, and deploying safe rollbacks on team projects.",
    "DOCKER": "Configuring light VM containers, mounting environments, and standardizing server nodes.",
    "LINUX": "Core development OS environment, scripting bash cron processes, and regulating server ports.",
    "VS CODE": "Main code editor deployed daily for drafting Python scripting and TypeScript web portfolios.",
    "GCR": "Google Container Registry tracking bundled Docker images for automated Cloud Run deployments.",
    "POSTMAN": "Validating microservices, simulating JSON payloads, and tracing rate limiter HTTP headers.",
    "RASPBERRY PI": "Prototyping automated security logic, handling network routers, and hosting local micro servers.",
    "ARDUINO": "Programming microcontrollers, reading physical inputs, and triggering hardware signaling.",
    "EMBEDDED SYSTEMS": "Interfacing low-level hardware modules with software API web hook notifications."
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "code": return <Code size={18} className="text-[#00f7ff]" />;
      case "smartphone": return <Smartphone size={18} className="text-[#00f7ff]" />;
      case "psychology": return <Brain size={18} className="text-[#00f7ff]" />;
      case "storage": return <Database size={18} className="text-[#00f7ff]" />;
      case "build": return <Terminal size={18} className="text-[#00f7ff]" />;
      case "memory": return <Cpu size={18} className="text-[#00f7ff]" />;
      default: return <Code size={18} className="text-[#00f7ff]" />;
    }
  };

  return (
    <section className="py-24 px-6 md:px-20 bg-[#0e0e13]" id="skills">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
          <div className="flex items-center gap-3">
            <div className="h-[2px] w-12 bg-[#00f7ff]"></div>
            <h2 className="font-mono text-sm md:text-base text-[#00f7ff] uppercase tracking-[0.2em] font-bold">// STACK_OVERVIEW</h2>
          </div>

          {/* Search/filter input box */}
          <div className="relative w-full md:w-80">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant-custom" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search technologies..."
              className="w-full bg-background-custom font-sans text-xs pl-10 pr-4 py-2.5 border border-outline-custom/15 rounded-full focus:outline-none focus:border-[#00f7ff] text-white transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Dynamic usage description card */}
        <div className="mb-12">
          <div className="glass-card p-4 rounded-xl border border-dashed border-[#00f7ff]/20 flex items-start gap-3.5 max-w-4xl">
            <HelpCircle size={20} className="text-[#00f7ff] shrink-0 mt-0.5 animate-pulse" />
            <div>
              <span className="block text-[9px] font-mono uppercase tracking-widest text-primary-container-custom/80 font-bold">
                Interactive SDE Stack Contextual Inspector
              </span>
              <p className="text-xs text-on-surface-custom mt-1 transition-all">
                {activeTag ? (
                  <>
                    <strong className="text-white text-xs font-mono select-none">{activeTag}:</strong>{" "}
                    {tagDescriptions[activeTag] || "Prabhu uses this technology to code and build highly performant solutions."}
                  </>
                ) : (
                  "Select or hover on any technology badge below to inspect Prabhu's project experience and real-world implementation details."
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Skill groupings grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_GROUPS.map((group) => {
            // Filter tags inside group matching the search query
            const filteredTags = group.tags.filter((tag) =>
              tag.toLowerCase().includes(searchQuery.toLowerCase())
            );

            if (filteredTags.length === 0) return null;

            return (
              <div 
                key={group.title} 
                className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col justify-between group hover:border-[#00f7ff]/10 hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center gap-2.5 border-b border-white/5 pb-3 mb-5">
                    {getIcon(group.icon)}
                    <h3 className="font-mono text-xs text-white uppercase tracking-wider font-extrabold">{group.title}</h3>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {filteredTags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => setActiveTag(tag)}
                        onMouseEnter={() => setActiveTag(tag)}
                        className={`px-3 py-1.5 rounded text-[11px] font-mono transition-all font-bold tracking-wide ${
                          activeTag === tag
                            ? "bg-[#00f7ff]/10 text-[#00f7ff] border border-[#00f7ff]/30 shadow-[0_0_8px_rgba(0,247,255,0.08)]"
                            : "bg-[#111118] border border-white/5 text-on-surface-variant-custom hover:text-white hover:border-white/10"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-white/5 flex gap-2 opacity-35 hover:opacity-60 transition-opacity">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-on-surface-variant-custom font-bold">#SDE_Core</span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-on-surface-variant-custom font-bold">#ComputerScience</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
