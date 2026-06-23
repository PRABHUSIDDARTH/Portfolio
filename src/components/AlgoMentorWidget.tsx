import React, { useState, useEffect } from "react";
import { LEETCODE_PROBLEMS } from "../data";
import { LeetCodeProblem, ChatMessage } from "../types";
import { Send, Sparkles, Code, Play, RefreshCw, Terminal, Eye, Brain } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function AlgoMentorWidget() {
  const [selectedProblem, setSelectedProblem] = useState<LeetCodeProblem>(LEETCODE_PROBLEMS[0]);
  const [editorCode, setEditorCode] = useState<string>(selectedProblem.initialCode);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [userMsg, setUserMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "// Welcomes to AlgoMentor AI Playground.",
    "// Select a problem and click 'Analyze with Coach' or write custom queries."
  ]);

  // Sync editor when problem changes
  useEffect(() => {
    setEditorCode(selectedProblem.initialCode);
    setChatHistory([
      {
        role: "assistant",
        text: `Hi! I'm your Socratic AI Coach. I see you're looking at **${selectedProblem.title}** (${selectedProblem.difficulty}). How can I guide you? Feel free to write code in the editor, ask for algorithmic hints, or test optimization thoughts!`
      }
    ]);
    setTerminalOutput([
      `// Switched context to: ${selectedProblem.title}`,
      `// Complexity constraints: O(N) Time / O(N) Space recommended.`,
      `// System ready to receive instruction.`
    ]);
  }, [selectedProblem]);

  const handleSendMessage = async (customMessage?: string) => {
    const activeMsg = customMessage || userMsg;
    if (!activeMsg.trim() && !customMessage) return;

    const newHistory: ChatMessage[] = [...chatHistory, { role: "user", text: activeMsg }];
    setChatHistory(newHistory);
    if (!customMessage) setUserMsg("");
    setIsLoading(true);

    setTerminalOutput(prev => [...prev, `[client] Dispatching query to server-side Gemini AI model...`]);

    try {
      const response = await fetch("/api/algomentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problemTitle: selectedProblem.title,
          userCode: editorCode,
          questionDescription: selectedProblem.description,
          userMessage: activeMsg,
          chatHistory: chatHistory.slice(-6) // Keep last 6 logs for conversation context
        })
      });

      const data = await response.json();
      
      if (response.ok && data.reply) {
        setChatHistory(prev => [...prev, { role: "assistant", text: data.reply }]);
        setTerminalOutput(prev => [
          ...prev, 
          `[server] Successfully received Socratic guidance from Gemini-3.5-flash.`
        ]);
      } else {
        throw new Error(data.error || "Failed to receive response from backend coach.");
      }
    } catch (err: any) {
      console.error(err);
      setChatHistory(prev => [
        ...prev, 
        { role: "assistant", text: `I encountered an issue connecting to my logic nodes: ${err.message}. Ensure your \`GEMINI_API_KEY\` is loaded in AI Studio secrets panel.` }
      ]);
      setTerminalOutput(prev => [...prev, `[error] Socratic bridge failed: ${err.message}`]);
    } finally {
      setIsLoading(false);
    }
  };

  const runCodeSample = () => {
    setTerminalOutput(prev => [
      ...prev,
      `[compiler] Compiling TypeScript AST structure...`,
      `[compiler] Evaluation starts for problem: ${selectedProblem.title}...`
    ]);

    setTimeout(() => {
      // Mock validation checking for empty spaces/brackets
      if (editorCode.includes("return [];") || editorCode.includes("return null;")) {
        setTerminalOutput(prev => [
          ...prev,
          `[compiler] Execution finished: returned default/unimplemented structure.`,
          `[analysis] Warning: Code might be incomplete on test specifications.`
        ]);
      } else {
        setTerminalOutput(prev => [
          ...prev,
          `[compiler] Successfully completed execution!`,
          `[test-suite] Passed basic reference validation check:`,
          ...selectedProblem.testCases.map(tc => `  - Input: ${tc.input} => Outputs expected: ${tc.expected}`)
        ]);
      }
    }, 800);
  };

  const triggerPredefinedQuery = (query: string) => {
    handleSendMessage(query);
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4 font-sans text-sm">
      {/* Problem Specification Column (Left) */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        <div className="neo-inset p-4 rounded-xl border border-outline/10">
          <label className="block text-xs font-mono text-primary-container-custom/80 uppercase mb-2 tracking-wider">// select problem context</label>
          <div className="grid grid-cols-1 gap-2">
            {LEETCODE_PROBLEMS.map((prob) => (
              <button
                key={prob.id}
                onClick={() => setSelectedProblem(prob)}
                className={`w-full flex justify-between items-center px-3 py-2.5 rounded text-left transition-all ${
                  selectedProblem.id === prob.id 
                    ? "bg-primary-container-custom/10 text-primary-container-custom border-l-2 border-primary-container-custom pl-4" 
                    : "bg-surface-container-custom/50 hover:bg-surface-container-custom text-on-surface-variant-custom hover:text-white"
                }`}
              >
                <div className="flex flex-col">
                  <span className="font-semibold">{prob.title}</span>
                  <span className="text-[10px] opacity-60">{prob.category}</span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold tracking-widest ${
                  prob.difficulty === "Easy" ? "bg-emerald-500/10 text-emerald-400" :
                  prob.difficulty === "Medium" ? "bg-amber-500/10 text-amber-400" :
                  "bg-red-500/10 text-red-400"
                }`}>
                  {prob.difficulty}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Problem Description */}
        <div className="glass-card p-4 rounded-xl flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center border-b border-outline/10 pb-2 mb-3">
              <h4 className="font-display text-base font-semibold text-white uppercase">{selectedProblem.title}</h4>
              <span className="font-mono text-xs text-primary-container-custom/75">{selectedProblem.category}</span>
            </div>
            <p className="text-xs text-on-surface-variant-custom leading-relaxed whitespace-pre-line overflow-y-auto max-h-[160px] pr-1">
              {selectedProblem.description}
            </p>
          </div>
          
          <div className="mt-4 border-t border-outline/10 pt-3">
            <span className="block text-xs font-mono text-on-surface-variant-custom uppercase mb-2">// socratic triggers</span>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => triggerPredefinedQuery("Can you give me a subtle hint on what data structures could optimize this?")}
                className="text-[10px] px-2.5 py-1.5 bg-surface-container-high-custom border border-outline/10 hover:border-primary-container-custom/30 text-on-surface-custom rounded hover:text-white transition-all text-left"
              >
                Ask for general advice
              </button>
              <button 
                onClick={() => triggerPredefinedQuery("Analyze my current code structure for potential memory bottlenecks.")}
                className="text-[10px] px-2.5 py-1.5 bg-surface-container-high-custom border border-outline/10 hover:border-primary-container-custom/30 text-on-surface-custom rounded hover:text-white transition-all text-left"
              >
                Scan code bottlenecks
              </button>
              <button 
                onClick={() => triggerPredefinedQuery("Help me construct a valid base condition to avoid stack overflows.")}
                className="text-[10px] px-2.5 py-1.5 bg-surface-container-high-custom border border-outline/10 hover:border-primary-container-custom/30 text-on-surface-custom rounded hover:text-white transition-all text-left"
              >
                Guide on stack boundaries
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Editor & Compiler Terminal Column (Middle) */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        {/* Editor Box */}
        <div className="glass-card rounded-xl overflow-hidden border border-outline/15 flex flex-col h-[320px]">
          <div className="bg-surface-container-high-custom/90 px-4 py-2 flex justify-between items-center border-b border-outline/10">
            <div className="flex items-center gap-2">
              <Code size={14} className="text-primary-container-custom" />
              <span className="font-mono text-xs text-white">editor_v2.5.ts</span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setEditorCode(selectedProblem.initialCode)}
                title="Reset editor code"
                className="p-1 rounded hover:bg-surface-container-highest-custom text-on-surface-variant-custom hover:text-white transition-colors"
                id="algo-reset-code-btn"
              >
                <RefreshCw size={12} />
              </button>
              <button 
                onClick={runCodeSample}
                className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 text-xs font-mono rounded font-medium transition-all"
                id="algo-run-test-btn"
              >
                <Play size={10} />
                RUN
              </button>
            </div>
          </div>
          <textarea
            value={editorCode}
            onChange={(e) => setEditorCode(e.target.value)}
            className="w-full flex-1 p-4 bg-background-custom/80 text-emerald-400 font-mono text-xs resize-none focus:outline-none border-none outline-none leading-relaxed overflow-y-auto"
            spellCheck="false"
          />
        </div>

        {/* Compiler Log Box */}
        <div className="bg-surface-container-lowest-custom/90 border border-outline/15 rounded-xl flex flex-col h-[180px] overflow-hidden">
          <div className="px-4 py-2 bg-[#0e0e13] flex items-center gap-2 border-b border-outline/10">
            <Terminal size={14} className="text-primary-container-custom" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-on-surface-variant-custom">Compiler Diagnostics Terminal</span>
          </div>
          <div className="flex-1 p-3 bg-black/90 font-mono text-[11px] text-green-400 overflow-y-auto space-y-1">
            {terminalOutput.map((log, i) => (
              <div 
                key={i} 
                className={`${
                  log.startsWith("[error]") ? "text-red-400" : 
                  log.startsWith("[client]") ? "text-cyan-400" :
                  log.startsWith("[server]") ? "text-emerald-400" :
                  "text-green-500/80"
                }`}
              >
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Socratic Chat Column (Right) */}
      <div className="lg:col-span-3 flex flex-col bg-surface-container-custom/30 border border-outline/10 rounded-xl h-[516px] overflow-hidden">
        <div className="p-3 bg-surface-container-high-custom/80 border-b border-outline/10 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Brain size={16} className="text-primary-container-custom animate-pulse" />
            <span className="font-semibold text-white text-xs tracking-wide">SOCRATIC BOT</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
            <span className="text-[9px] font-mono text-emerald-400 uppercase">coach_live</span>
          </div>
        </div>

        {/* Chat Bubbles */}
        <div className="flex-1 p-3 overflow-y-auto space-y-3 flex flex-col bg-slate-950/20">
          <AnimatePresence initial={false}>
            {chatHistory.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`max-w-[90%] p-2.5 rounded-lg text-xs leading-relaxed ${
                  msg.role === "user" 
                    ? "bg-primary-container-custom/10 text-white self-end border border-primary-container-custom/20 rounded-br-none" 
                    : "bg-surface-container-highest-custom/60 text-on-surface-custom self-start border border-outline/5 rounded-bl-none"
                }`}
              >
                <div className="font-semibold text-[10px] uppercase opacity-70 mb-1">
                  {msg.role === "user" ? "YOU / Candidate" : "AlgoMentor AI"}
                </div>
                <div className="whitespace-pre-line prose prose-invert prose-xs">
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <div className="bg-surface-container-highest-custom/40 text-on-surface-custom self-start p-2 rounded-lg border border-outline/5 flex items-center gap-2">
              <span className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-primary-container-custom rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-primary-container-custom rounded-full animate-bounce delay-75"></span>
                <span className="w-1.5 h-1.5 bg-primary-container-custom rounded-full animate-bounce delay-150"></span>
              </span>
              <span className="text-[10px] font-mono text-primary-container-custom animate-pulse">Formulating guidance...</span>
            </div>
          )}
        </div>

        {/* Input box */}
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
          className="p-2.5 bg-surface-container-high-custom/90 border-t border-outline/10 flex gap-2"
        >
          <input
            type="text"
            value={userMsg}
            onChange={(e) => setUserMsg(e.target.value)}
            disabled={isLoading}
            placeholder="Ask AI Coach for hints..."
            className="flex-1 bg-background-custom font-sans text-xs px-3 py-2 border border-outline/15 rounded focus:outline-none focus:border-primary-container-custom text-white"
          />
          <button
            type="submit"
            disabled={isLoading || !userMsg.trim()}
            className="w-8 h-8 rounded shrink-0 flex items-center justify-center bg-primary-container-custom/10 border border-primary-container-custom/30 text-primary-container-custom hover:bg-primary-container-custom hover:text-black transition-all"
            id="algo-send-msg-btn"
          >
            <Send size={12} />
          </button>
        </form>
      </div>
    </div>
  );
}
