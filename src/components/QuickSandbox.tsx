import React from 'react';
import { Truck, CreditCard, Sparkles, Globe2, Layers, CheckCircle2 } from 'lucide-react';
import { PAKISTAN_LOGISTICS_CASE, PAKISTAN_FINTECH_CASE } from '../data/pakistanMarketData';

interface QuickSandboxProps {
  onSelectCase: (prompt: string, caseId?: string) => void;
  activeCaseId?: string | null;
  disabled?: boolean;
}

export const QuickSandbox: React.FC<QuickSandboxProps> = ({
  onSelectCase,
  activeCaseId,
  disabled
}) => {
  return (
    <div className="bg-[#111625] border border-[#1E293B] rounded-xl p-4 lg:p-5 shadow-lg relative overflow-hidden">
      {/* Decorative gradient corner accent */}
      <div className="absolute top-0 right-0 w-64 h-24 bg-gradient-to-bl from-[#38BDF8]/10 via-transparent to-transparent pointer-events-none" />

      {/* Header title & info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-[#38BDF8]/10 text-[#38BDF8]">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-mono text-xs uppercase tracking-wider text-slate-300 font-bold">
            QUICK TEST SANDBOX // PRELOADED BENCHMARKS
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 font-mono">
            INSTANT ZERO-LATENCY
          </span>
        </div>
        <p className="text-xs text-slate-400 font-mono">
          Click either preset to auto-populate the engine input:
        </p>
      </div>

      {/* Prominent Sandbox Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        {/* Button 1: [🚗 Load Pakistan Logistics Case] */}
        <button
          type="button"
          onClick={() => onSelectCase(PAKISTAN_LOGISTICS_CASE.prompt, PAKISTAN_LOGISTICS_CASE.id)}
          disabled={disabled}
          className={`group text-left p-3.5 rounded-lg border transition-all duration-200 flex items-start justify-between cursor-pointer ${
            activeCaseId === PAKISTAN_LOGISTICS_CASE.id
              ? 'bg-emerald-950/40 border-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.25)] ring-1 ring-emerald-400/50'
              : 'bg-[#0B0F19]/90 border-[#1E293B] hover:border-emerald-500/70 hover:bg-[#0B0F19] text-slate-200'
          }`}
          data-testid="btn-pakistan-logistics"
        >
          <div className="flex items-start gap-3">
            <div className={`p-2.5 rounded-lg border text-base mt-0.5 transition-colors ${
              activeCaseId === PAKISTAN_LOGISTICS_CASE.id
                ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-300'
                : 'bg-emerald-950/40 border-emerald-800/40 text-emerald-400 group-hover:bg-emerald-500/20'
            }`}>
              🚗
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm tracking-wide text-white group-hover:text-emerald-300 transition-colors">
                  Load Pakistan Logistics Case
                </span>
                {activeCaseId === PAKISTAN_LOGISTICS_CASE.id && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-in fade-in" />
                )}
              </div>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                Automated COD Reconciliation, Fuel Inflation Spikes (PKR 280/L), & Trax/TCS Settlement Float.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-900/40 text-emerald-300 border border-emerald-700/40">
                  GATE A: 0ms
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  Target: 120M+ Parcels / Year
                </span>
              </div>
            </div>
          </div>
        </button>

        {/* Button 2: [💳 Load Pakistan FinTech Case] */}
        <button
          type="button"
          onClick={() => onSelectCase(PAKISTAN_FINTECH_CASE.prompt, PAKISTAN_FINTECH_CASE.id)}
          disabled={disabled}
          className={`group text-left p-3.5 rounded-lg border transition-all duration-200 flex items-start justify-between cursor-pointer ${
            activeCaseId === PAKISTAN_FINTECH_CASE.id
              ? 'bg-sky-950/40 border-[#38BDF8] text-white shadow-[0_0_20px_rgba(56,189,248,0.25)] ring-1 ring-[#38BDF8]/50'
              : 'bg-[#0B0F19]/90 border-[#1E293B] hover:border-[#38BDF8]/70 hover:bg-[#0B0F19] text-slate-200'
          }`}
          data-testid="btn-pakistan-fintech"
        >
          <div className="flex items-start gap-3">
            <div className={`p-2.5 rounded-lg border text-base mt-0.5 transition-colors ${
              activeCaseId === PAKISTAN_FINTECH_CASE.id
                ? 'bg-[#38BDF8]/20 border-[#38BDF8]/50 text-[#38BDF8]'
                : 'bg-sky-950/40 border-sky-800/40 text-[#38BDF8] group-hover:bg-[#38BDF8]/20'
            }`}>
              💳
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm tracking-wide text-white group-hover:text-[#38BDF8] transition-colors">
                  Load Pakistan FinTech Case
                </span>
                {activeCaseId === PAKISTAN_FINTECH_CASE.id && (
                  <CheckCircle2 className="w-4 h-4 text-[#38BDF8] animate-in fade-in" />
                )}
              </div>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                B2B Supplier Financing, SBP Raast P2M Clearing, & FBR Withholding Tax Invoice Reconciliation.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-900/40 text-[#38BDF8] border border-sky-700/40">
                  GATE A: 0ms
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  Target: 3.8M MSMEs
                </span>
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* Secondary Fast Presets for Quick Global & Local Testing */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#1E293B]/60">
        <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
          <Layers className="w-3 h-3 text-slate-400" /> Additional Test Vectors:
        </span>

        <button
          type="button"
          disabled={disabled}
          onClick={() => onSelectCase('B2B Farm-to-Retail AgriTech cold storage supply chain network in Punjab Pakistan with diesel price hedges', 'pakistan-agri')}
          className="text-[11px] font-mono px-2 py-1 rounded bg-[#0B0F19] hover:bg-[#1E293B] text-slate-300 border border-[#1E293B] transition-colors cursor-pointer"
        >
          🌾 Pakistan AgriTech (Gate A)
        </button>

        <button
          type="button"
          disabled={disabled}
          onClick={() => onSelectCase('Autonomous AI Freight Fleet Dispatcher and dynamic port congestion broker for Transatlantic Shipping', 'global-freight')}
          className="text-[11px] font-mono px-2 py-1 rounded bg-[#0B0F19] hover:bg-[#1E293B] text-sky-300 border border-[#1E293B] transition-colors cursor-pointer flex items-center gap-1"
        >
          <Globe2 className="w-3 h-3 text-sky-400" /> Global Autonomous Freight (Gate B)
        </button>

        <button
          type="button"
          disabled={disabled}
          onClick={() => onSelectCase('Autonomous AI Copilot for B2B Enterprise Legal Contract Compliance and SLA Arbitration in North America & EU', 'global-legal')}
          className="text-[11px] font-mono px-2 py-1 rounded bg-[#0B0F19] hover:bg-[#1E293B] text-sky-300 border border-[#1E293B] transition-colors cursor-pointer flex items-center gap-1"
        >
          <Globe2 className="w-3 h-3 text-sky-400" /> Global Enterprise AI (Gate B)
        </button>
      </div>
    </div>
  );
};
