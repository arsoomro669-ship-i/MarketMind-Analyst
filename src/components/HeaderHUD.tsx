import React from 'react';
import { Terminal, Cpu, Database, Activity, ShieldCheck, Zap } from 'lucide-react';

interface HeaderHUDProps {
  detectedGate?: 'GATE_A_PAKISTAN' | 'GATE_B_GLOBAL';
  isAnalyzing: boolean;
}

export const HeaderHUD: React.FC<HeaderHUDProps> = ({ detectedGate, isAnalyzing }) => {
  return (
    <header className="border-b border-[#1E293B] bg-[#111625]/90 backdrop-blur-md px-4 lg:px-8 py-3.5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Brand & Identity */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-[#38BDF8]/10 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8] shadow-[0_0_15px_rgba(56,189,248,0.25)]">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-sm tracking-widest text-[#38BDF8] font-bold">MARKETMIND</span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-[#1E293B] text-slate-300 font-mono border border-slate-700">v2.4-PRO</span>
              <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">// MULTI-AGENT TERMINAL</span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>DUAL-ENGINE SYSTEM ACTIVE</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">HOST: ASIA-EAST</span>
            </div>
          </div>
        </div>

        {/* Engine Status Dual Badges */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Gate A Badge */}
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border text-xs font-mono transition-all ${
              detectedGate === 'GATE_A_PAKISTAN'
                ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)] ring-1 ring-emerald-500/30'
                : 'bg-[#0B0F19] border-[#1E293B] text-slate-400 hover:border-slate-700'
            }`}
            title="Instant, 0ms hardcoded intelligence database covering Pakistani Logistics, FinTech, and Macro friction"
          >
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold">GATE A:</span>
            <span className="text-[11px]">PAKISTAN CACHE (0ms)</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          </div>

          {/* Gate B Badge */}
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border text-xs font-mono transition-all ${
              detectedGate === 'GATE_B_GLOBAL'
                ? 'bg-sky-950/60 border-[#38BDF8]/60 text-[#38BDF8] shadow-[0_0_12px_rgba(56,189,248,0.2)] ring-1 ring-[#38BDF8]/30'
                : 'bg-[#0B0F19] border-[#1E293B] text-slate-400 hover:border-slate-700'
            }`}
            title="Live server-side Groq API connection utilizing llama3-70b-8192 with automatic structural fallback"
          >
            <Cpu className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span className="font-semibold">GATE B:</span>
            <span className="text-[11px]">GROQ LLAMA-3 70B</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]"></span>
          </div>

          {/* Activity State */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#0B0F19] border border-[#1E293B] text-xs font-mono text-slate-300">
            {isAnalyzing ? (
              <>
                <Zap className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                <span className="text-amber-400">PROCESSING</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-slate-400">READY</span>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
