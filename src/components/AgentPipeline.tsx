import React from 'react';
import { CheckCircle2, Loader2, Clock, Terminal, ChevronDown, ChevronUp, Bot } from 'lucide-react';
import { AgentStep } from '../types/index';

interface AgentPipelineProps {
  steps: AgentStep[];
  currentStepIndex: number;
  isComplete: boolean;
  totalTimeMs?: number;
  gateUsed?: 'GATE_A_PAKISTAN' | 'GATE_B_GLOBAL';
}

export const AgentPipeline: React.FC<AgentPipelineProps> = ({
  steps,
  currentStepIndex,
  isComplete,
  totalTimeMs,
  gateUsed
}) => {
  const [showTelemetryLogs, setShowTelemetryLogs] = React.useState(true);

  return (
    <div className="bg-[#111625] border border-[#1E293B] rounded-xl p-4 lg:p-6 shadow-xl relative overflow-hidden">
      {/* Header with Pipeline Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#1E293B]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#38BDF8]/10 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8]">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-mono text-xs uppercase tracking-wider text-slate-200 font-bold">
                ASYNCHRONOUS PIPELINE // SUB-AGENT EXECUTION MATRIX
              </h2>
              {isComplete ? (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300">
                  ALL 5 AGENTS COMPLETED
                </span>
              ) : (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-950 border border-[#38BDF8]/40 text-[#38BDF8] animate-pulse">
                  PIPELINE RUNNING
                </span>
              )}
            </div>
            <p className="text-[11px] font-mono text-slate-400 mt-0.5">
              Routing Vector: {gateUsed === 'GATE_A_PAKISTAN' ? 'Gate A [Pakistan Local Memory Cache - 0ms API Latency]' : 'Gate B [Groq llama3-70b-8192 Async Inference Engine]'}
            </p>
          </div>
        </div>

        {totalTimeMs !== undefined && (
          <div className="text-right font-mono text-xs text-slate-400">
            <span className="text-slate-400">Total Run Latency: </span>
            <span className="text-emerald-400 font-semibold">{totalTimeMs}ms</span>
          </div>
        )}
      </div>

      {/* Sequential Status Checklist */}
      <div className="mt-4 space-y-2.5" data-testid="agent-checklist">
        {steps.map((step, idx) => {
          const isFinished = step.status === 'COMPLETED';
          const isCurrent = step.status === 'RUNNING';
          const isPending = step.status === 'PENDING';

          return (
            <div
              key={step.id}
              className={`p-3 rounded-lg border font-mono text-xs transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-2 ${
                isFinished
                  ? 'bg-[#0B0F19]/90 border-emerald-500/30 text-slate-200'
                  : isCurrent
                  ? 'bg-sky-950/40 border-[#38BDF8] text-white shadow-[0_0_15px_rgba(56,189,248,0.2)] ring-1 ring-[#38BDF8]/40'
                  : 'bg-[#0B0F19]/40 border-[#1E293B]/60 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Status Indicator Badge */}
                {isFinished && (
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/50 text-emerald-400 text-[11px] font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>[🟢 COMPLETED]</span>
                  </div>
                )}
                {isCurrent && (
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-sky-950 border border-[#38BDF8]/60 text-[#38BDF8] text-[11px] font-bold animate-pulse">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>[🔵 RUNNING]</span>
                  </div>
                )}
                {isPending && (
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-900 border border-slate-700/60 text-slate-400 text-[11px]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>[⚪ QUEUED]</span>
                  </div>
                )}

                {/* Agent Identity & Action */}
                <div>
                  <span className={`font-bold ${isCurrent ? 'text-[#38BDF8]' : isFinished ? 'text-slate-200' : 'text-slate-400'}`}>
                    Agent {step.agentNumber} ({step.name}):
                  </span>{' '}
                  <span className={`${isCurrent ? 'text-white' : isFinished ? 'text-slate-300' : 'text-slate-400'}`}>
                    {step.actionText}
                  </span>
                </div>
              </div>

              {/* Step Latency & Role */}
              <div className="flex items-center gap-2 self-end md:self-auto text-[11px] text-slate-400">
                <span className="hidden lg:inline text-slate-400">{step.role}</span>
                {step.executionTimeMs !== undefined && (
                  <span className="px-1.5 py-0.5 rounded bg-[#1E293B] text-slate-300">
                    {step.executionTimeMs}ms
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Sub-Agent Telemetry Log Terminal Drawer */}
      <div className="mt-4 pt-3 border-t border-[#1E293B]">
        <button
          type="button"
          onClick={() => setShowTelemetryLogs(!showTelemetryLogs)}
          className="w-full flex items-center justify-between text-xs font-mono text-slate-400 hover:text-[#38BDF8] py-1 transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>SUB-AGENT TELEMETRY STREAM & LOG CONSOLE</span>
          </span>
          <span className="flex items-center gap-1">
            <span>{showTelemetryLogs ? 'COLLAPSE' : 'EXPAND LOGS'}</span>
            {showTelemetryLogs ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </span>
        </button>

        {showTelemetryLogs && (
          <div className="mt-2.5 bg-[#0B0F19] rounded-lg border border-[#1E293B] p-3 font-mono text-xs text-slate-300 max-h-48 overflow-y-auto space-y-1">
            <div className="text-slate-400 text-[11px] pb-1 border-b border-slate-800">
              --- MULTI-AGENT IPC LOG STREAM (REAL-TIME KERNEL EVENTS) ---
            </div>
            {steps.flatMap((step) =>
              step.logMessages.map((msg, i) => (
                <div key={`${step.id}-${i}`} className="flex items-start gap-2 text-[11px] leading-tight">
                  <span className="text-[#38BDF8]/60 shrink-0">[{new Date().toISOString().substring(11, 19)}]</span>
                  <span className="text-emerald-400/80 shrink-0">[Agent {step.agentNumber}]</span>
                  <span className="text-slate-300">{msg}</span>
                </div>
              ))
            )}
            {!isComplete && (
              <div className="flex items-center gap-2 text-[11px] text-[#38BDF8] animate-pulse">
                <span>&gt; awaiting sub-agent consensus token completion...</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
