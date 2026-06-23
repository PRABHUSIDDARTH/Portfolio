import React, { useState, useEffect, useRef } from "react";
import { Shield, Sparkles, Send, RefreshCw, Key, Settings, AlertTriangle, CheckCircle } from "lucide-react";

export default function RateLimiterSimulator() {
  const [algorithm, setAlgorithm] = useState<"token_bucket" | "leaky_bucket" | "fixed_window" | "sliding_log">("token_bucket");
  const [capacity, setCapacity] = useState<number>(5);
  const [tokens, setTokens] = useState<number>(5);
  const [windowRequests, setWindowRequests] = useState<number>(0);
  const [maxWindowRequests, setMaxWindowRequests] = useState<number>(5);
  const [messageLog, setMessageLog] = useState<{ timestamp: string; status: "authorized" | "rate_limited" | "info"; msg: string }[]>([
    { timestamp: "00:00:00", status: "info", msg: "RLaaS Protection Suite Initialized. Algorithm: Token Bucket." }
  ]);

  // Timestamps for Sliding Window Log simulation
  const [slidingLogs, setSlidingLogs] = useState<number[]>([]);
  const windowSizeMs = 10000; // 10 second window

  // Leaky bucket simulation water level state
  const [waterLevel, setWaterLevel] = useState<number>(0);

  // Ref for intervals
  const refillIntervalRef = useRef<any>(null);

  // Formatting utility
  const formatTime = () => {
    const d = new Date();
    return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}:${d.getSeconds().toString().padStart(2, "0")}`;
  };

  // Setup refill interval or leak interval based on algorithm
  useEffect(() => {
    if (refillIntervalRef.current) clearInterval(refillIntervalRef.current);

    if (algorithm === "token_bucket") {
      setTokens(capacity);
      refillIntervalRef.current = setInterval(() => {
        setTokens((prev) => {
          if (prev < capacity) {
            return prev + 1;
          }
          return prev;
        });
      }, 2000); // Refill 1 token every 2 seconds
    } else if (algorithm === "leaky_bucket") {
      setWaterLevel(0);
      refillIntervalRef.current = setInterval(() => {
        setWaterLevel((prev) => {
          if (prev > 0) {
            return Math.max(0, prev - 1);
          }
          return prev;
        });
      }, 1500); // Leaks 1 unit every 1.5 seconds
    } else if (algorithm === "fixed_window") {
      setWindowRequests(0);
      refillIntervalRef.current = setInterval(() => {
        setWindowRequests(0);
        setMessageLog((prev) => [
          { timestamp: formatTime(), status: "info", msg: "Fixed Window Reset: Request counter flushed to 0." },
          ...prev.slice(0, 10)
        ]);
      }, 8000); // Flushes every 8 seconds
    }

    return () => {
      if (refillIntervalRef.current) clearInterval(refillIntervalRef.current);
    };
  }, [algorithm, capacity]);

  const sendRequest = () => {
    const now = Date.now();
    const timeStr = formatTime();

    if (algorithm === "token_bucket") {
      if (tokens >= 1) {
        setTokens((prev) => prev - 1);
        setMessageLog((prev) => [
          { timestamp: timeStr, status: "authorized", msg: `AUTHORIZED: [GET /api/users] Token consumed. (${tokens - 1}/${capacity} left)` },
          ...prev.slice(0, 12)
        ]);
      } else {
        setMessageLog((prev) => [
          { timestamp: timeStr, status: "rate_limited", msg: "BLOCKED (429): Token bucket depleted. Back off requested." },
          ...prev.slice(0, 12)
        ]);
      }
    } else if (algorithm === "leaky_bucket") {
      if (waterLevel < capacity) {
        setWaterLevel((prev) => prev + 1);
        setMessageLog((prev) => [
          { timestamp: timeStr, status: "authorized", msg: `AUTHORIZED: [POST /api/payment] Water queued in leak pipeline. (Level: ${waterLevel + 1}/${capacity})` },
          ...prev.slice(0, 12)
        ]);
      } else {
        setMessageLog((prev) => [
          { timestamp: timeStr, status: "rate_limited", msg: "BLOCKED (429): Leak pipeline overflow. Queue saturated." },
          ...prev.slice(0, 12)
        ]);
      }
    } else if (algorithm === "fixed_window") {
      if (windowRequests < maxWindowRequests) {
        setWindowRequests((prev) => prev + 1);
        setMessageLog((prev) => [
          { timestamp: timeStr, status: "authorized", msg: `AUTHORIZED: [GET /api/reports] Window count: (${windowRequests + 1}/${maxWindowRequests})` },
          ...prev.slice(0, 12)
        ]);
      } else {
        setMessageLog((prev) => [
          { timestamp: timeStr, status: "rate_limited", msg: "BLOCKED (429): Maximum hourly threshold reached for current window bucket." },
          ...prev.slice(0, 12)
        ]);
      }
    } else if (algorithm === "sliding_log") {
      // Filter out log events older than sliding window size (10s)
      const validLogs = slidingLogs.filter((t) => now - t < windowSizeMs);
      
      if (validLogs.length < maxWindowRequests) {
        const newLogs = [...validLogs, now];
        setSlidingLogs(newLogs);
        setMessageLog((prev) => [
          { timestamp: timeStr, status: "authorized", msg: `AUTHORIZED: [DELETE /api/node] Log recorded. (${validLogs.length + 1}/${maxWindowRequests} requests in sliding window)` },
          ...prev.slice(0, 12)
        ]);
      } else {
        setSlidingLogs(validLogs);
        setMessageLog((prev) => [
          { timestamp: timeStr, status: "rate_limited", msg: `BLOCKED (429): Sliding log capacity reached. Cool down for next timestamp release.` },
          ...prev.slice(0, 12)
        ]);
      }
    }
  };

  const handleCapacityChange = (val: number) => {
    setCapacity(val);
    if (algorithm === "token_bucket") setTokens(val);
  };

  return (
    <div className="glass-card p-6 rounded-2xl w-full border border-outline-custom/20 text-sm">
      <div className="flex items-center gap-2 mb-6 pb-3 border-b border-outline-custom/10">
        <Shield className="text-primary-container-custom/90 w-5 h-5" />
        <h3 className="font-display font-bold text-white uppercase tracking-wider text-base">RLaaS Algorithm Interactive Playground</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Controls Panel (Left) */}
        <div className="md:col-span-5 flex flex-col gap-5">
          <div>
            <label className="block text-xs font-mono text-primary-container-custom/80 uppercase mb-2 tracking-wider">// select rate limit algorithm</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "token_bucket", label: "Token Bucket" },
                { id: "leaky_bucket", label: "Leaky Bucket" },
                { id: "fixed_window", label: "Fixed Window" },
                { id: "sliding_log", label: "Sliding Log" }
              ].map((algo) => (
                <button
                  key={algo.id}
                  onClick={() => setAlgorithm(algo.id as any)}
                  className={`px-3 py-2.5 rounded text-left font-mono text-xs transition-all ${
                    algorithm === algo.id 
                      ? "bg-primary-container-custom/15 text-primary-container-custom font-extrabold border-l-2 border-primary-container-custom-custom" 
                      : "bg-surface-container-custom/50 hover:bg-surface-container-custom text-on-surface-variant-custom hover:text-white"
                  }`}
                >
                  {algo.label}
                </button>
              ))}
            </div>
          </div>

          {/* Configuration adjustment slides */}
          <div className="neo-inset p-4 rounded-xl border border-outline-custom/15">
            <span className="block text-xs font-mono text-on-surface-variant-custom uppercase mb-3">// bucket specifications</span>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs text-on-surface-custom font-mono mb-2">
                  <span>Capacity Size:</span>
                  <span className="text-primary-container-custom font-black">{capacity} Requests</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="10"
                  value={capacity}
                  onChange={(e) => handleCapacityChange(parseInt(e.target.value))}
                  className="w-full accent-primary-container-custom bg-surface-container-highest-custom"
                />
              </div>

              {algorithm === "fixed_window" || algorithm === "sliding_log" ? (
                <div>
                  <div className="flex justify-between text-xs text-on-surface-custom font-mono mb-2">
                    <span>Max Transactions in window:</span>
                    <span className="text-primary-container-custom font-black">{maxWindowRequests} requests</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="8"
                    value={maxWindowRequests}
                    onChange={(e) => setMaxWindowRequests(parseInt(e.target.value))}
                    className="w-full accent-primary-container-custom bg-surface-container-highest-custom"
                  />
                </div>
              ) : null}
            </div>
          </div>

          <button
            onClick={sendRequest}
            className="w-full font-mono font-bold text-xs bg-primary-container-custom/10 hover:bg-primary-container-custom hover:text-black text-primary-container-custom py-3.5 rounded border border-primary-container-custom/40 transition-all flex items-center justify-center gap-2 tracking-wider scale-down-click"
            id="rlaas-fire-request-btn"
          >
            <Send size={14} />
            DISPATCH SIMULATED API REQUEST
          </button>
        </div>

        {/* Visualizer Panel (Middle) */}
        <div className="md:col-span-3 flex flex-col justify-center items-center">
          <div className="text-center w-full">
            <span className="block text-xs font-mono text-on-surface-variant-custom uppercase mb-4 tracking-wider">// dynamic visual state</span>

            {/* Token Refill Indicator (Token Bucket) */}
            {algorithm === "token_bucket" && (
              <div className="space-y-4">
                <div className="flex justify-center flex-wrap gap-2.5">
                  {Array.from({ length: capacity }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-10 h-10 rounded border flex items-center justify-center transition-all ${
                        i < tokens 
                          ? "bg-primary-container-custom/20 border-primary-container-custom text-primary-container-custom shadow-[0_0_10px_rgba(0,247,255,0.2)]" 
                          : "bg-surface-container-lowest-custom/50 border-outline-custom/10 text-on-surface-variant-custom opacity-30"
                      }`}
                    >
                      🔋
                    </div>
                  ))}
                </div>
                <div className="text-xs font-mono text-on-surface-variant-custom">
                  Refilling 1 token every <span className="text-primary-container-custom">2s</span>
                </div>
              </div>
            )}

            {/* Leaky Bucket visual */}
            {algorithm === "leaky_bucket" && (
              <div className="space-y-4 flex flex-col items-center">
                <div className="w-16 h-32 bg-surface-container-high-custom border-2 border-outline-variant-custom rounded-b-xl relative overflow-hidden flex items-end">
                  <div 
                    className="w-full bg-[#00f7ff]/40 border-t border-[#00f7ff] transition-all duration-300" 
                    style={{ height: `${(waterLevel / capacity) * 100}%` }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] text-white">
                    {waterLevel} / {capacity} Saturated
                  </div>
                </div>
                <div className="text-xs font-mono text-on-surface-variant-custom">
                  Leaking 1 unit every <span className="text-primary-container-custom">1.5s</span>
                </div>
              </div>
            )}

            {/* Fixed Window Indicator */}
            {algorithm === "fixed_window" && (
              <div className="space-y-4 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full border-4 border-outline-custom/20 flex flex-col items-center justify-center relative">
                  <div className="absolute inset-0 rounded-full border-4 border-primary-container-custom border-t-transparent animate-spin-slow"></div>
                  <span className="font-display font-medium text-lg text-white">{windowRequests} / {maxWindowRequests}</span>
                  <span className="text-[8px] font-mono opacity-50 uppercase">Requests</span>
                </div>
                <div className="text-xs font-mono text-on-surface-variant-custom">
                  Resets requests to 0 every <span className="text-primary-container-custom">8s</span>
                </div>
              </div>
            )}

            {/* Sliding Window Log Log representation */}
            {algorithm === "sliding_log" && (
              <div className="space-y-3">
                <div className="text-left font-mono text-[10px] text-on-surface-variant-custom space-y-1 bg-surface-container-low-custom p-3 rounded border border-outline-custom/15 max-h-[120px] overflow-y-auto">
                  <div className="border-b border-outline-custom/10 pb-1 mb-1 font-bold">// sliding log timeline</div>
                  {slidingLogs.length === 0 ? (
                    <div className="opacity-40">Queue void... No timestamps cached</div>
                  ) : (
                    slidingLogs.map((t, idx) => (
                      <div key={idx} className="text-cyan-400">
                        → T+{((Date.now() - t) / 1000).toFixed(1)}s (Cached event)
                      </div>
                    ))
                  )}
                </div>
                <div className="text-xs font-mono text-on-surface-variant-custom">
                  Valid window rate: <span className="text-primary-container-custom">10s dynamic scope</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Console Log Terminal Output (Right) */}
        <div className="md:col-span-4 flex flex-col">
          <span className="block text-xs font-mono text-on-surface-variant-custom uppercase mb-2 tracking-wider">// RLaaS terminal responses</span>
          <div className="bg-black/90 p-3 rounded-lg flex-1 font-mono text-[11px] leading-relaxed max-h-[220px] overflow-y-auto space-y-1.5 border border-outline-custom/20">
            {messageLog.map((log, index) => (
              <div 
                key={index} 
                className={`flex gap-1.5 border-b border-white/5 pb-1 ${
                  log.status === "authorized" ? "text-emerald-400" :
                  log.status === "rate_limited" ? "text-red-400" :
                  "text-slate-400"
                }`}
              >
                <span className="text-[9px] opacity-40 shrink-0">[{log.timestamp}]</span>
                <span className="break-all">{log.msg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
