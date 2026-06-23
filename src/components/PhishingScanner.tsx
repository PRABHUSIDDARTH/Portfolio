import React, { useState } from "react";
import { ShieldAlert, Globe, AlertTriangle, ShieldCheck, Check, Sparkles } from "lucide-react";

export default function PhishingScanner() {
  const [url, setUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<{ isPhishing: boolean; score: number; signals: string[] } | null>(null);

  const presets = [
    "https://paypal-security-verification.xyz",
    "http://194.24.120.3/login",
    "https://metamàsk.io/wallet",
    "https://www.google.com"
  ];

  const handleScan = async (targetUrl?: string) => {
    const scanTarget = targetUrl || url;
    if (!scanTarget.trim()) return;

    if (targetUrl) setUrl(targetUrl);
    
    setIsScanning(true);
    setResult(null);

    try {
      const response = await fetch("/api/phishing/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: scanTarget })
      });
      const data = await response.json();
      
      // Delay response slightly to mimic deep scan
      setTimeout(() => {
        setResult(data);
        setIsScanning(false);
      }, 1000);
    } catch (err) {
      console.error(err);
      setIsScanning(false);
    }
  };

  return (
    <div className="glass-card p-6 rounded-2xl border border-outline-custom/20 text-sm w-full">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-outline-custom/10">
        <ShieldAlert className="text-red-400 w-5 h-5 animate-pulse" />
        <h3 className="font-display font-black text-white uppercase tracking-wider text-base">URL Threat Verification Engine</h3>
      </div>

      <p className="text-xs text-on-surface-variant-custom mb-5 leading-relaxed">
        Test the security analyzer. Paste an suspicious link or select a live sample below to trigger deep logical heuristics scanning for typosquatting, domain age tricks, homographs, or suspicious TLD pools.
      </p>

      {/* Target presets */}
      <div className="mb-5">
        <span className="block text-[10px] font-mono text-primary-container-custom/75 uppercase tracking-wider mb-2">// scan preset domain signals</span>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleScan(preset)}
              className="text-[10px] px-2.5 py-1.5 bg-surface-container-custom border border-outline-custom/10 hover:border-red-400/30 text-on-surface-custom hover:text-white rounded transition-all font-mono"
            >
              {preset.replace("https://", "").replace("http://", "")}
            </button>
          ))}
        </div>
      </div>

      {/* Manual search */}
      <form 
        onSubmit={(e) => { e.preventDefault(); handleScan(); }}
        className="flex gap-2.5 mb-6"
      >
        <div className="relative flex-1">
          <Globe size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant-custom/60" />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Introduce suspicious URI here ... (e.g. login.secure-upgrade.xyz)"
            className="w-full bg-background-custom text-xs pl-10 pr-4 py-3 border border-outline-custom/15 rounded focus:outline-none focus:border-red-400/40 text-white"
          />
        </div>
        <button
          type="submit"
          disabled={isScanning || !url.trim()}
          className="bg-red-500/10 hover:bg-neutral-900 border border-red-500/30 hover:border-red-500/60 text-red-400 font-mono text-xs px-5 py-3 rounded transition-all shrink-0 font-bold scale-down-click"
          id="phishing-scan-uri-btn"
        >
          {isScanning ? "VERIFYING..." : "SCAN URI"}
        </button>
      </form>

      {/* Loading Scanning */}
      {isScanning && (
        <div className="p-10 text-center bg-black/20 border border-outline-custom/5 rounded-xl">
          <AlertTriangle className="mx-auto w-8 h-8 text-red-400 animate-bounce mb-3" />
          <span className="font-mono text-xs text-primary-container-custom animate-pulse uppercase tracking-widest block">Applying heuristical logic checks...</span>
          <span className="text-[10px] text-on-surface-variant-custom uppercase block mt-1 tracking-tighter">De-obfuscating character components</span>
        </div>
      )}

      {/* Scan Results */}
      {result && (
        <div className={`p-5 rounded-xl border ${result.isPhishing ? "bg-red-500/5 border-red-500/20" : "bg-emerald-500/5 border-emerald-500/20"} transition-all`}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 pb-3 border-b border-white/5">
            <div>
              <span className="block text-[9px] font-mono uppercase tracking-widest text-on-surface-variant-custom">Scanning Diagnostics</span>
              <div className="flex items-center gap-2 mt-1">
                {result.isPhishing ? (
                  <>
                    <ShieldAlert className="text-red-500 w-5 h-5" />
                    <span className="font-display font-black text-red-500 uppercase">THREAT SUSPECTED</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="text-emerald-400 w-5 h-5" />
                    <span className="font-display font-black text-emerald-400 uppercase">URL SEEMS LEGITIMATE</span>
                  </>
                )}
              </div>
            </div>

            <div className="text-right">
              <span className="block text-[9px] font-mono uppercase text-on-surface-variant-custom">Aggregated Risk score</span>
              <span className={`font-display font-extrabold text-2xl ${result.score > 40 ? "text-red-500" : "text-emerald-400"}`}>
                {result.score} / 100
              </span>
            </div>
          </div>

          <div>
            <span className="block text-[9px] font-mono uppercase tracking-widest mb-2 text-on-surface-variant-custom font-bold">// heuristic signals logs</span>
            {result.signals.length === 0 ? (
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
                <Check size={12} />
                No malicious characteristics detected within standard resolution thresholds.
              </div>
            ) : (
              <ul className="space-y-1.5">
                {result.signals.map((sig, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs font-mono text-red-400">
                    <span className="mt-0.5 shrink-0 block w-1.5 h-1.5 bg-red-500 rounded-sm"></span>
                    <span>{sig}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
