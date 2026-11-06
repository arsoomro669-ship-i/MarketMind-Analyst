import React, { useState } from 'react';
import { Download, Copy, Check, FileText, Code2, Sparkles, Building2, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';
import { MarketDossier } from '../types/index';
import { downloadMarkdownDossier } from '../utils/engineRouting';
import { MetricCards } from './MetricCards';

interface DossierCanvasProps {
  dossier: MarketDossier;
}

export const DossierCanvas: React.FC<DossierCanvasProps> = ({ dossier }) => {
  const [activeTab, setActiveTab] = useState<'formatted' | 'raw' | 'matrix'>('formatted');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(dossier.rawMarkdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleDownload = () => {
    downloadMarkdownDossier(dossier.rawMarkdown, dossier.title);
  };

  return (
    <div className="bg-[#111625] border border-[#1E293B] rounded-xl shadow-2xl overflow-hidden flex flex-col">
      {/* Terminal Window Header Bar (Chrome) */}
      <div className="bg-[#0B0F19] border-b border-[#1E293B] px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Window controls and title */}
        <div className="flex items-center space-x-3">
          <div className="flex space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block border border-rose-600/50" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block border border-amber-600/50" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block border border-emerald-600/50" />
          </div>
          <div className="h-4 w-px bg-slate-800" />
          <div className="flex items-center gap-2 font-mono text-xs">
            <FileText className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span className="text-slate-200 font-semibold tracking-wide">
              {dossier.title.slice(0, 42)}.md
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1E293B] text-slate-400">
              UTF-8
            </span>
          </div>
        </div>

        {/* Engine routing badge & execution latency */}
        <div className="flex items-center gap-2 font-mono text-xs">
          {dossier.gateUsed === 'GATE_A_PAKISTAN' ? (
            <span className="px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 flex items-center gap-1.5 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>GATE A: PAKISTAN CACHE</span>
              <span className="text-emerald-500/80">({dossier.executionTimeMs}ms)</span>
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded bg-sky-950/80 border border-[#38BDF8]/40 text-[#38BDF8] flex items-center gap-1.5 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
              <span>GATE B: GROQ LLAMA-3 70B</span>
              <span className="text-sky-400/80">({dossier.executionTimeMs}ms)</span>
            </span>
          )}

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 ml-2">
            <button
              type="button"
              onClick={handleCopy}
              className="p-1.5 sm:px-2.5 sm:py-1 rounded bg-[#1E293B] hover:bg-slate-700 text-slate-300 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Copy raw markdown to clipboard"
              data-testid="btn-copy-markdown"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span className="hidden sm:inline">Copy MD</span>
                </>
              )}
            </button>

            {/* Core Requirement: Download Dossier Button */}
            <button
              type="button"
              onClick={handleDownload}
              className="px-3 py-1 rounded bg-[#38BDF8] hover:bg-sky-400 text-[#0B0F19] text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(56,189,248,0.35)] cursor-pointer"
              title="Download dossier as .md file using Blob constructor"
              data-testid="btn-download-dossier"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Dossier</span>
            </button>
          </div>
        </div>
      </div>

      {/* View Mode Switcher Tabs */}
      <div className="bg-[#111625] px-4 py-2 border-b border-[#1E293B] flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <button
            type="button"
            onClick={() => setActiveTab('formatted')}
            className={`px-3 py-1.5 rounded text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'formatted'
                ? 'bg-[#1E293B] text-[#38BDF8] font-bold border border-[#38BDF8]/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Terminal Canvas</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('matrix')}
            className={`px-3 py-1.5 rounded text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'matrix'
                ? 'bg-[#1E293B] text-[#38BDF8] font-bold border border-[#38BDF8]/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Competitor & Friction Matrix</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('raw')}
            className={`px-3 py-1.5 rounded text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'raw'
                ? 'bg-[#1E293B] text-[#38BDF8] font-bold border border-[#38BDF8]/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Raw Markdown (.md)</span>
          </button>
        </div>

        <div className="hidden sm:block text-[11px] font-mono text-slate-400">
          Model: {dossier.modelIdentifier}
        </div>
      </div>

      {/* Main Terminal Output Content Area */}
      <div className="p-4 lg:p-6 space-y-6 overflow-y-auto max-h-[850px] bg-[#0B0F19]/95 text-slate-200 font-sans">
        {activeTab === 'formatted' && (
          <div className="space-y-6">
            {/* Top Market Sizing Telemetry */}
            <MetricCards metrics={dossier.metrics} gateUsed={dossier.gateUsed} />

            {/* Dossier Header */}
            <div className="border-b border-[#1E293B] pb-4">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#1E293B] text-[#38BDF8] border border-sky-800/40">
                MARKET INTELLIGENCE REPORT
              </span>
              <h1 className="text-xl lg:text-2xl font-bold font-mono text-white mt-2">
                {dossier.title}
              </h1>
              <p className="text-xs font-mono text-slate-400 mt-1">
                Target Market: <span className="text-slate-300 font-semibold">{dossier.targetMarket}</span> | Compiled: {new Date(dossier.timestamp).toLocaleString()}
              </p>
            </div>

            {/* Executive Summary */}
            <div className="bg-[#111625] border border-[#1E293B] rounded-lg p-4">
              <h2 className="text-sm font-mono font-bold text-[#38BDF8] uppercase tracking-wider mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#38BDF8]" />
                Executive Summary
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                {dossier.executiveSummary}
              </p>
            </div>

            {/* REQUIRED HEADING: ## Identified Competitors */}
            <div className="space-y-3" id="identified-competitors">
              <div className="flex items-center justify-between border-b border-[#1E293B] pb-2">
                <h2 className="text-base lg:text-lg font-mono font-bold text-white flex items-center gap-2">
                  <span className="text-[#38BDF8]">##</span> Identified Competitors
                </h2>
                <span className="text-xs font-mono text-slate-400">
                  {dossier.competitors.length} Key Competitor Vectors Mapped
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {dossier.competitors.map((comp, idx) => (
                  <div
                    key={idx}
                    className="bg-[#111625] border border-[#1E293B] rounded-lg p-4 flex flex-col justify-between hover:border-slate-700 transition-colors"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-mono font-bold text-sm text-white flex items-center gap-1.5">
                          <Building2 className="w-4 h-4 text-[#38BDF8] shrink-0" />
                          <span>{comp.name}</span>
                        </h3>
                      </div>
                      <div className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#0B0F19] text-sky-300 border border-slate-800 w-fit mb-3">
                        Share: {comp.marketShare}
                      </div>

                      <div className="space-y-2 text-xs">
                        <div>
                          <span className="font-mono font-semibold text-emerald-400 block mb-0.5">Core Strength:</span>
                          <p className="text-slate-300 text-[12px] leading-relaxed">{comp.coreStrength}</p>
                        </div>
                        <div>
                          <span className="font-mono font-semibold text-rose-400 block mb-0.5">Critical Vulnerability:</span>
                          <p className="text-slate-300 text-[12px] leading-relaxed">{comp.vulnerability}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* REQUIRED HEADING: ## Operational Friction Points */}
            <div className="space-y-3" id="operational-friction-points">
              <div className="flex items-center justify-between border-b border-[#1E293B] pb-2">
                <h2 className="text-base lg:text-lg font-mono font-bold text-white flex items-center gap-2">
                  <span className="text-[#38BDF8]">##</span> Operational Friction Points
                </h2>
                <span className="text-xs font-mono text-rose-400 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> High-Severity Risk Vectors
                </span>
              </div>

              <div className="space-y-3">
                {dossier.operationalFrictionPoints.map((f, idx) => (
                  <div
                    key={idx}
                    className="bg-[#111625] border border-[#1E293B] rounded-lg p-4 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                          f.severity === 'CRITICAL'
                            ? 'bg-rose-950 text-rose-300 border border-rose-800/60'
                            : f.severity === 'HIGH'
                            ? 'bg-amber-950 text-amber-300 border border-amber-800/60'
                            : 'bg-slate-800 text-slate-300'
                        }`}>
                          [{f.severity}]
                        </span>
                        <h3 className="font-mono font-bold text-sm text-white">
                          {f.title}
                        </h3>
                      </div>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#0B0F19] text-sky-300 border border-sky-950 self-start sm:self-auto">
                        Category: {f.category}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed font-sans mb-2">
                      {f.description}
                    </p>

                    <div className="bg-[#0B0F19] rounded p-2.5 border border-slate-800/80 text-xs font-mono text-slate-400 flex items-start gap-2">
                      <span className="text-amber-400 font-bold shrink-0">Impact Vector:</span>
                      <span className="text-slate-300">{f.macroImpact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* REQUIRED HEADING: ## Strategic Unfair Advantage */}
            <div className="space-y-3" id="strategic-unfair-advantage">
              <div className="flex items-center justify-between border-b border-[#1E293B] pb-2">
                <h2 className="text-base lg:text-lg font-mono font-bold text-white flex items-center gap-2">
                  <span className="text-[#38BDF8]">##</span> Strategic Unfair Advantage
                </h2>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Defensibility Architecture
                </span>
              </div>

              <div className="bg-[#111625] border border-emerald-500/30 rounded-lg p-5 space-y-4 shadow-[0_0_20px_rgba(16,185,129,0.08)]">
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold mb-1 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Core Moat Thesis
                  </h3>
                  <p className="text-sm font-semibold text-white font-sans leading-relaxed">
                    {dossier.strategicUnfairAdvantage.coreMoat}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
                    Key Defensibility Factors:
                  </h3>
                  <ul className="space-y-1.5">
                    {dossier.strategicUnfairAdvantage.defensibilityFactors.map((factor, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="text-[#38BDF8] font-bold mt-0.5">•</span>
                        <span>{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-[#1E293B]">
                  <div className="bg-[#0B0F19] rounded p-3 border border-slate-800">
                    <span className="text-[11px] font-mono text-[#38BDF8] font-semibold block mb-1">
                      Unit Economics & Macro Hedge:
                    </span>
                    <p className="text-xs text-slate-300">
                      {dossier.strategicUnfairAdvantage.unitEconomicsHedge}
                    </p>
                  </div>
                  <div className="bg-[#0B0F19] rounded p-3 border border-slate-800">
                    <span className="text-[11px] font-mono text-emerald-400 font-semibold block mb-1">
                      Target Execution Vector:
                    </span>
                    <p className="text-xs text-slate-300">
                      {dossier.strategicUnfairAdvantage.executionVector}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Matrix View Tab */}
        {activeTab === 'matrix' && (
          <div className="space-y-6">
            <div className="bg-[#111625] border border-[#1E293B] rounded-lg p-4">
              <h3 className="text-sm font-mono font-bold text-white mb-3 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#38BDF8]" />
                Competitor Feature & Defensibility Matrix
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="border-b border-[#1E293B] text-slate-400">
                      <th className="py-2.5 px-3">Competitor Entity</th>
                      <th className="py-2.5 px-3">Market Footprint</th>
                      <th className="py-2.5 px-3">Primary Moat</th>
                      <th className="py-2.5 px-3">Critical Vulnerability</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1E293B]/60 text-slate-300">
                    {dossier.competitors.map((c, idx) => (
                      <tr key={idx} className="hover:bg-[#0B0F19]/50">
                        <td className="py-3 px-3 font-bold text-white">{c.name}</td>
                        <td className="py-3 px-3 text-sky-400">{c.marketShare}</td>
                        <td className="py-3 px-3 text-emerald-300 max-w-xs">{c.coreStrength}</td>
                        <td className="py-3 px-3 text-rose-300 max-w-xs">{c.vulnerability}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-[#111625] border border-[#1E293B] rounded-lg p-4">
              <h3 className="text-sm font-mono font-bold text-white mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Operational Friction Heatmap
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {dossier.operationalFrictionPoints.map((f, i) => (
                  <div key={i} className="bg-[#0B0F19] border border-[#1E293B] rounded p-3 font-mono text-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-rose-400 font-bold">[{f.severity}]</span>
                      <span className="text-[11px] text-slate-400">{f.category}</span>
                    </div>
                    <div className="font-bold text-white mb-1">{f.title}</div>
                    <div className="text-[11px] text-slate-400">{f.macroImpact}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Raw Markdown Source View */}
        {activeTab === 'raw' && (
          <div className="relative">
            <pre className="bg-[#0B0F19] border border-[#1E293B] rounded-lg p-4 font-mono text-xs text-slate-300 overflow-x-auto whitespace-pre-wrap leading-relaxed select-all">
              {dossier.rawMarkdown}
            </pre>
          </div>
        )}
      </div>

      {/* Terminal Canvas Footer */}
      <div className="bg-[#0B0F19] border-t border-[#1E293B] px-4 py-2.5 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>DOSSIER VERIFIED & READY FOR EXPORT</span>
        </div>
        <div>
          <span>Size: {Math.round(dossier.rawMarkdown.length / 1024 * 10) / 10} KB</span>
          <span className="mx-2 text-slate-700">|</span>
          <button
            type="button"
            onClick={handleDownload}
            className="text-[#38BDF8] hover:underline cursor-pointer"
          >
            Download .md file
          </button>
        </div>
      </div>
    </div>
  );
};
