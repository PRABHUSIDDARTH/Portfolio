import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2, Music, Sparkles } from "lucide-react";

export default function SwaraPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [progress, setProgress] = useState(30);

  // Audio Synth Web API context states
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillator1Ref = useRef<OscillatorNode | null>(null);
  const oscillator2Ref = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Waveform heights state
  const [waveBars, setWaveBars] = useState<number[]>(new Array(18).fill(12));
  const animationRef = useRef<any>(null);

  useEffect(() => {
    // Waveform simulation bouncing loop
    if (isPlaying) {
      const updateWave = () => {
        setWaveBars((prev) => prev.map(() => Math.floor(Math.random() * 32) + 6));
        animationRef.current = setTimeout(updateWave, 100);
      };
      updateWave();
    } else {
      if (animationRef.current) clearTimeout(animationRef.current);
      setWaveBars(new Array(18).fill(12));
    }

    return () => {
      if (animationRef.current) clearTimeout(animationRef.current);
    };
  }, [isPlaying]);

  // Handle synth playback
  const startSynth = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) {
          console.warn("Web Audio API is not supported in this browser environment.");
          return;
        }
        audioCtxRef.current = new AudioContextClass();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Configure Master gain safely (very quiet, lofi background drone)
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime((volume / 100) * 0.02, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Create Warm Lofi Bass Triangle wave
      const osc1 = ctx.createOscillator();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(146.83, ctx.currentTime); // D3 chord key
      osc1.connect(masterGain);

      // Create ambient fifth harmony
      const osc2 = ctx.createOscillator();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(220.00, ctx.currentTime); // A3 chord fifth
      osc2.connect(masterGain);

      osc1.start();
      osc2.start();

      oscillator1Ref.current = osc1;
      oscillator2Ref.current = osc2;
    } catch (e) {
      console.error("Audio Synthesis error:", e);
    }
  };

  const stopSynth = () => {
    if (oscillator1Ref.current) {
      try {
        oscillator1Ref.current.stop();
        oscillator1Ref.current.disconnect();
      } catch (err) {}
      oscillator1Ref.current = null;
    }
    if (oscillator2Ref.current) {
      try {
        oscillator2Ref.current.stop();
        oscillator2Ref.current.disconnect();
      } catch (err) {}
      oscillator2Ref.current = null;
    }
    if (gainNodeRef.current) {
      gainNodeRef.current.disconnect();
      gainNodeRef.current = null;
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopSynth();
      setIsPlaying(false);
    } else {
      startSynth();
      setIsPlaying(true);
    }
  };

  // Sync volume slider back to active synth context
  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime((volume / 100) * 0.02, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopSynth();
    };
  }, []);

  return (
    <div className="glass-card p-6 rounded-2xl border border-outline-custom/20 text-sm w-full max-w-sm mx-auto flex flex-col items-center">
      <div className="w-full flex items-center justify-between mb-6">
        <div className="flex items-center gap-1.5 opacity-80">
          <Music size={14} className="text-secondary-custom" />
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#00f7ff]">Swara MVVM Core</span>
        </div>
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
      </div>

      {/* Decorative CD Visualizer */}
      <div className="relative w-40 h-40 rounded-full bg-black/60 border border-outline-custom/30 flex items-center justify-center mb-6 shadow-xl overflow-hidden group">
        <div className={`w-36 h-36 rounded-full border border-[#00f7ff]/20 bg-gradient-to-tr from-secondary-container-custom/20 to-primary-container-custom/20 flex items-center justify-center ${isPlaying ? "animate-spin-slow" : ""}`}>
          <div className="w-12 h-12 rounded-full bg-background-custom border-2 border-[#00f7ff]/40 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-black"></div>
          </div>
        </div>
        <div className="absolute top-2 left-6 text-[8px] font-mono text-white/40 tracking-wider">OFFLINE MEDIA</div>
      </div>

      <div className="text-center w-full mb-5">
        <h4 className="font-display font-black text-white text-base tracking-wide uppercase line-clamp-1">Space Resonance (Warm Drone)</h4>
        <p className="text-xs text-on-surface-variant-custom font-mono">Swara Synthesizer Engine</p>
      </div>

      {/* Bounce Wave Form */}
      <div className="w-full h-12 flex items-end justify-center gap-1.5 px-4 mb-4 bg-black/20 rounded-lg p-2 min-h-[48px]">
        {waveBars.map((h, i) => (
          <div
            key={i}
            className="w-1 rounded-full bg-gradient-to-t from-secondary-custom to-[#00f7ff] transition-all duration-100"
            style={{ height: `${h}px` }}
          ></div>
        ))}
      </div>

      {/* Media Controller Buttons */}
      <div className="flex items-center gap-5 mb-5 select-none">
        <button 
          title="Previous Track"
          className="p-2.5 rounded-full hover:bg-white/10 text-on-surface-custom transition-all"
        >
          <SkipBack size={16} />
        </button>
        <button
          onClick={togglePlay}
          className="w-12 h-12 rounded-full bg-[#00f7ff]/10 border border-[#00f7ff]/30 hover:border-[#00f7ff]/75 text-[#00f7ff] hover:bg-[#00f7ff] hover:text-black transition-all flex items-center justify-center scale-down-click"
          id="swara-play-pause-btn"
        >
          {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
        </button>
        <button 
          title="Next Track"
          className="p-2.5 rounded-full hover:bg-white/10 text-on-surface-custom transition-all"
        >
          <SkipForward size={16} />
        </button>
      </div>

      {/* Volume slider */}
      <div className="w-full flex items-center gap-3">
        <Volume2 size={12} className="text-on-surface-variant-custom" />
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(parseInt(e.target.value))}
          className="flex-1 accent-primary-container-custom bg-surface-container-highest-custom h-1 rounded"
        />
        <span className="font-mono text-[10px] text-on-surface-variant-custom w-6">{volume}%</span>
      </div>
    </div>
  );
}
