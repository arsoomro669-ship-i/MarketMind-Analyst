import React from 'react';
import { TrendingUp, Clock, AlertTriangle, ShieldCheck, DollarSign } from 'lucide-react';
import { MarketDossier } from '../types/index';

interface MetricCardsProps {
  metrics: MarketDossier['metrics'];
  gateUsed: MarketDossier['gateUsed'];
}

export const MetricCards: React.FC<MetricCardsProps> = ({ metrics, gateUsed }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {/* TAM Card */}
      <div className="bg-[#111625] border border-[#1E293B] rounded-lg p-3.5 flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
          <span>TARGET TAM</span>
          <DollarSign className="w-4 h-4 text-[#38BDF8]" />
        </div>
        <div>
          <div className="text-base lg:text-lg font-bold text-white font-mono tracking-tight">
            {metrics.tamPkrOrUsd}
          </div>
          <div className="text-[11px] text-slate-400 font-mono mt-0.5">
            Addressable Market Volume
          </div>
        </div>
      </div>

      {/* Projected CAGR */}
      <div className="bg-[#111625] border border-[#1E293B] rounded-lg p-3.5 flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
          <span>PROJECTED CAGR</span>
          <TrendingUp className="w-4 h-4 text-emerald-400" />
        </div>
        <div>
          <div className="text-base lg:text-lg font-bold text-emerald-400 font-mono tracking-tight">
            {metrics.projectedCagr}
          </div>
          <div className="text-[11px] text-slate-400 font-mono mt-0.5">
            5-Year Growth Trajectory
          </div>
        </div>
      </div>

      {/* Settlement Float / Velocity */}
      <div className="bg-[#111625] border border-[#1E293B] rounded-lg p-3.5 flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
          <span>SETTLEMENT CYCLE</span>
          <Clock className="w-4 h-4 text-amber-400" />
        </div>
        <div>
          <div className="text-base lg:text-lg font-bold text-amber-300 font-mono tracking-tight truncate">
            {metrics.settlementCycleDays}
          </div>
          <div className="text-[11px] text-slate-400 font-mono mt-0.5">
            Working Capital Velocity
          </div>
        </div>
      </div>

      {/* Margin Vulnerability Profile */}
      <div className="bg-[#111625] border border-[#1E293B] rounded-lg p-3.5 flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
          <span>VULNERABILITY INDEX</span>
          <ShieldCheck className="w-4 h-4 text-sky-400" />
        </div>
        <div>
          <div className="text-base lg:text-lg font-bold text-sky-300 font-mono tracking-tight truncate">
            {metrics.marginVulnerabilityIndex}
          </div>
          <div className="text-[11px] text-slate-400 font-mono mt-0.5">
            Macro Fuel & FX Insulation
          </div>
        </div>
      </div>
    </div>
  );
};
