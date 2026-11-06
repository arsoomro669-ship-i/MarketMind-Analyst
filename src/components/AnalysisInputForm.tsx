import React, { useMemo } from 'react';
import { Play, Sparkles, AlertCircle, RefreshCw, Database, Cpu, ArrowRight } from 'lucide-react';
import { determineEngineGate, PAKISTANI_KEYWORDS } from '../utils/engineRouting';
import { EngineGate } from '../types/index';

interface AnalysisInputFormProps {
  prompt: string;
  onPromptChange: (newPrompt: string) => void;
  onSubmit: () => void;
  isAnalyzing: boolean;
  currentAgentAction?: string;
}

export const AnalysisInputForm: React.FC<AnalysisInputFormProps> = ({
  prompt,
  onPromptChange,
  onSubmit,
  isAnalyzing,
  currentAgentAction
}) => {
  // Real-time detection of which gate will execute
  const detectedGate: EngineGate = useMemo(() => {
    return determineEngineGate(prompt);
  }, [prompt]);

  // Detected matching keywords for live feedback
  const matchedKeywords = useMemo(() => {
    if (!prompt.trim()) return [];
    const normalized = prompt.toLowerCase();
    return PAKISTANI_KEYWORDS.filter(kw => {
      const regex = new RegExp(`\\b${kw}\\b`, 'i');
      return regex.test(normalized) || normalized.includes(kw);
    }).slice(0, 5);
  }, [prompt]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isAnalyzing) {
      onSubmit();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (prompt.trim() && !isAnalyzing) {
        onSubmit();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#111625] border border-[#1E293B] rounded-xl p-4 lg:p-6 shadow-xl relative">
      {/* Top Bar with Terminal Prompt label and Gate Preview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[#38BDF8] font-mono text-xs font-bold">{'>'}</span>
          <label htmlFor="prompt-input" className="font-mono text-xs text-slate-300 uppercase tracking-wider font-semibold">
            MARKET CONCEPT INPUT // COMMAND PROMPT
          </label>
        </div>

        {/* Real-time Gate Routing Predictor */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-slate-400 text-[11px]">Routing Gateway:</span>
          {detectedGate === 'GATE_A_PAKISTAN' ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-medium animate-in fade-in">
              <Database className="w-3 h-3 text-emerald-400" />
              <span>Gate A: Pakistan Local Cache (Bypasses API)</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-sky-950/80 border border-[#38BDF8]/40 text-[#38BDF8] font-medium animate-in fade-in">
              <Cpu className="w-3 h-3 text-[#38BDF8]" />
              <span>Gate B: Groq llama3-70b-8192 Live Stream</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Text Input Area */}
      <div className="relative">
        <textarea
          id="prompt-input"
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isAnalyzing}
          rows={4}
          placeholder="Enter a business model, market opportunity, or supply chain bottleneck (e.g., 'Develop an automated COD reconciliation engine for Pakistani e-commerce couriers to tackle fuel inflation and Trax settlement delays', or 'Autonomous AI radiology diagnostics platform for EU hospital networks')..."
          className="w-full bg-[#0B0F19] border border-[#1E293B] focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] rounded-lg p-3.5 text-sm text-slate-100 placeholder-slate-500 font-mono resize-y leading-relaxed outline-none transition-colors"
        />

        {/* Word count and keyboard helper */}
        <div className="flex items-center justify-between mt-1.5 px-1 text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span>{prompt.length} chars</span>
            {matchedKeywords.length > 0 && (
              <span className="text-emerald-400 flex items-center gap-1">
                <span>⚡ Detected Local Keywords:</span>
                <span className="font-semibold text-emerald-300 bg-emerald-950/70 px-1.5 py-0.2 rounded border border-emerald-800/40">
                  {matchedKeywords.join(', ')}
                </span>
              </span>
            )}
          </div>
          <span className="hidden sm:inline text-slate-400">
            Press <kbd className="px-1.5 py-0.5 rounded bg-[#1E293B] text-slate-300 border border-slate-700">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-[#1E293B] text-slate-300 border border-slate-700">Enter</kbd> to launch
          </span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-4 pt-3.5 border-t border-[#1E293B] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {detectedGate === 'GATE_A_PAKISTAN' ? (
            <div className="text-xs font-mono text-emerald-400/90 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Zero external latency. Instant access to fuel inflation & COD reconciliation data.</span>
            </div>
          ) : (
            <div className="text-xs font-mono text-sky-400/90 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span>Dispatches async pipeline to Groq LLaMA-3 70B with resilience fallback.</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {prompt.trim().length > 0 && (
            <button
              type="button"
              disabled={isAnalyzing}
              onClick={() => onPromptChange('')}
              className="px-3 py-2.5 rounded-lg border border-[#1E293B] hover:bg-[#1E293B] text-slate-400 hover:text-slate-200 text-xs font-mono transition-colors cursor-pointer"
            >
              Clear
            </button>
          )}

          {/* Core Action Button */}
          <button
            type="submit"
            disabled={!prompt.trim() || isAnalyzing}
            className={`px-6 py-2.5 rounded-lg font-mono text-xs font-bold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
              isAnalyzing
                ? 'bg-sky-950 border border-[#38BDF8]/50 text-[#38BDF8] cursor-wait'
                : !prompt.trim()
                ? 'bg-slate-800 text-slate-400 border border-slate-700 cursor-not-allowed'
                : 'bg-[#38BDF8] hover:bg-sky-400 text-[#0B0F19] shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:shadow-[0_0_25px_rgba(56,189,248,0.6)]'
            }`}
            data-testid="btn-run-analysis"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-[#38BDF8]" />
                <span>Running Pipeline...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Run Multi-Agent Analysis</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* In-flight Active Sub-Agent Bar */}
      {isAnalyzing && currentAgentAction && (
        <div className="mt-3 p-2.5 rounded-lg bg-[#0B0F19] border border-[#38BDF8]/40 flex items-center justify-between text-xs font-mono text-[#38BDF8] animate-pulse">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>ACTIVE SUB-AGENT: {currentAgentAction}</span>
          </div>
          <span className="text-[10px] text-slate-400">TELEMETRY STREAMING</span>
        </div>
      )}
    </form>
  );
};
