/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { HeaderHUD } from './components/HeaderHUD';
import { QuickSandbox } from './components/QuickSandbox';
import { AnalysisInputForm } from './components/AnalysisInputForm';
import { AgentPipeline } from './components/AgentPipeline';
import { DossierCanvas } from './components/DossierCanvas';
import { determineEngineGate, getLocalPakistanDossier, buildGlobalFallbackDossier } from './utils/engineRouting';
import { PAKISTAN_LOGISTICS_CASE } from './data/pakistanMarketData';
import { AgentStep, MarketDossier, EngineGate } from './types/index';
import { Terminal, Shield, Zap, Sparkles, Layers } from 'lucide-react';

const INITIAL_PIPELINE_STEPS: AgentStep[] = [
  {
    id: 'agent-1',
    agentNumber: 1,
    name: 'Web Scraper',
    role: 'Market Index Ingestion',
    status: 'PENDING',
    actionText: 'Scanning market data indices and macroeconomic indicators...',
    logMessages: [
      'Scanning local trade registries, tariff records, and freight exchange logs...',
      'Harvesting wholesale spot rates and inflation indices...'
    ]
  },
  {
    id: 'agent-2',
    agentNumber: 2,
    name: 'Competitor Matrix',
    role: 'Competitive Landscape Cartographer',
    status: 'PENDING',
    actionText: 'Mapping top 3 market competitors and vulnerability vectors...',
    logMessages: [
      'Querying competitor registry: TCS, PostEx, Trax, SadaPay, Daraz Express...',
      'Deconstructing courier market share and balance sheet exposure...'
    ]
  },
  {
    id: 'agent-3',
    agentNumber: 3,
    name: 'SWOT Specialist',
    role: 'Moat & Arbitrage Architect',
    status: 'PENDING',
    actionText: 'Engineering market gaps & strategic unfair advantages...',
    logMessages: [
      'Evaluating unit economics under fuel stress-testing conditions...',
      'Formulating algorithmic defensibility and working capital moat...'
    ]
  },
  {
    id: 'agent-4',
    agentNumber: 4,
    name: 'Risk & Regulatory Engine',
    role: 'Macro Friction Assessor',
    status: 'PENDING',
    actionText: 'Simulating macroeconomic, fuel inflation, and tax withholding friction...',
    logMessages: [
      'Running fuel price variance simulations (PKR 260-310/L sensitivity)...',
      'Assessing COD escrow settlement float and FBR/PRA tax withholding penalties...'
    ]
  },
  {
    id: 'agent-5',
    agentNumber: 5,
    name: 'Executive Synthesizer',
    role: 'Markdown Dossier Compiler',
    status: 'PENDING',
    actionText: 'Compiling final structured Markdown Dossier with explicit headers...',
    logMessages: [
      'Formatting ## Identified Competitors and ## Operational Friction Points sections...',
      'Synthesizing final intelligence dossier and validating Blob download buffer...'
    ]
  }
];

export default function App() {
  const [prompt, setPrompt] = useState<string>(PAKISTAN_LOGISTICS_CASE.prompt);
  const [activeCaseId, setActiveCaseId] = useState<string | null>(PAKISTAN_LOGISTICS_CASE.id);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [steps, setSteps] = useState<AgentStep[]>(INITIAL_PIPELINE_STEPS);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [dossier, setDossier] = useState<MarketDossier | null>(null);
  const [hasRunOnce, setHasRunOnce] = useState<boolean>(false);
  const [executionTime, setExecutionTime] = useState<number>(0);

  const outputRef = useRef<HTMLDivElement>(null);
  const detectedGate: EngineGate = determineEngineGate(prompt);

  // Handle Quick Test Sandbox preset selection
  const handleSelectCase = (newPrompt: string, caseId?: string) => {
    setPrompt(newPrompt);
    setActiveCaseId(caseId || null);
  };

  // Dual-Engine Routing Execution Handler
  const runMultiAgentAnalysis = async () => {
    if (!prompt.trim() || isAnalyzing) return;

    setIsAnalyzing(true);
    setHasRunOnce(true);
    const startTime = performance.now();

    // Reset steps to pending
    const initialSteps = INITIAL_PIPELINE_STEPS.map((s, idx) => ({
      ...s,
      status: (idx === 0 ? 'RUNNING' : 'PENDING') as 'PENDING' | 'RUNNING' | 'COMPLETED',
      executionTimeMs: undefined
    }));
    setSteps(initialSteps);
    setCurrentStepIndex(0);

    const gate = determineEngineGate(prompt);
    let finalDossier: MarketDossier | null = null;

    // STEP 1: Execute Gate Resolution in background
    const executeDataFetch = async (): Promise<MarketDossier> => {
      // GATE A: Instant Pakistani Cache (Bypass external API entirely)
      if (gate === 'GATE_A_PAKISTAN') {
        const localData = getLocalPakistanDossier(prompt);
        return {
          ...localData,
          executionTimeMs: Math.round(performance.now() - startTime)
        };
      }

      // GATE B: Live Global Mode (Calls server-side Groq LLaMA-3 70B with resilience fallback)
      try {
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt, mode: 'live_global' })
        });

        const contentType = response.headers.get('content-type') || '';
        if (response.ok && contentType.includes('application/json')) {
          const result = await response.json();
          if (result.dossier) {
            return result.dossier;
          }
        }
      } catch (err) {
        console.warn('Network call to /api/analyze failed, falling back to client structural template', err);
      }

      // Resilience Fallback
      return buildGlobalFallbackDossier(prompt, Math.round(performance.now() - startTime));
    };

    // Start fetching data in parallel with sub-agent animation
    const dataPromise = executeDataFetch();

    // STEP 2: Animate sequential status checklist through sub-agents
    // Step delay: Gate A is snappy (250-400ms per agent for high-tech feeling), Gate B is slightly longer
    const stepDuration = gate === 'GATE_A_PAKISTAN' ? 320 : 600;

    for (let i = 0; i < 5; i++) {
      setCurrentStepIndex(i);
      setSteps((prev) =>
        prev.map((step, idx) => {
          if (idx < i) return { ...step, status: 'COMPLETED' as const, executionTimeMs: Math.round(stepDuration * 0.8) };
          if (idx === i) return { ...step, status: 'RUNNING' as const };
          return { ...step, status: 'PENDING' as const };
        })
      );
      await new Promise((r) => setTimeout(r, stepDuration));
    }

    // Await finalized data
    finalDossier = await dataPromise;
    const totalElapsed = Math.round(performance.now() - startTime);

    // Finalize all steps to COMPLETED
    setSteps((prev) =>
      prev.map((step) => ({
        ...step,
        status: 'COMPLETED' as const,
        executionTimeMs: step.executionTimeMs || Math.round(totalElapsed / 5)
      }))
    );

    finalDossier.executionTimeMs = totalElapsed;
    setExecutionTime(totalElapsed);
    setDossier(finalDossier);
    setIsAnalyzing(false);

    // Scroll to results
    setTimeout(() => {
      outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  // Run automatically on first mount with initial logistics preset so user immediately sees live terminal
  useEffect(() => {
    // Initial run to showcase the terminal immediately
    runMultiAgentAnalysis();
  }, []);

  const currentAgent = steps[currentStepIndex];

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-sans selection:bg-[#38BDF8]/30 selection:text-white">
      {/* Top HUD Navigation */}
      <HeaderHUD detectedGate={detectedGate} isAnalyzing={isAnalyzing} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 space-y-6">
        {/* Hero Section & Dual-Engine Overview */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#1E293B]">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#1E293B] text-[#38BDF8] border border-sky-900/50">
                MARKETMIND ANALYST
              </span>
              <span className="text-xs text-slate-400 font-mono">
                // DUAL-ENGINE INTELLIGENCE TERMINAL
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-white mt-1">
              Autonomous Market Intelligence Terminal
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1 max-w-3xl">
              Equipped with a dual-engine architecture: Gate A provides zero-latency indexed intelligence for the Pakistani market, and Gate B streams live global research via Groq LLaMA-3 70B.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto font-mono text-xs text-slate-400 bg-[#111625] px-3 py-2 rounded-lg border border-[#1E293B]">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Zero API Key Leakage Guaranteed (Server Proxy)</span>
          </div>
        </div>

        {/* 1. Quick Test Sandbox (Core Requirement 1) */}
        <section aria-labelledby="quick-sandbox-heading">
          <h2 id="quick-sandbox-heading" className="sr-only">Quick Test Sandbox</h2>
          <QuickSandbox
            onSelectCase={handleSelectCase}
            activeCaseId={activeCaseId}
            disabled={isAnalyzing}
          />
        </section>

        {/* 2. Command Prompt & Input Form (Core Requirement 2) */}
        <section aria-labelledby="input-form-heading">
          <h2 id="input-form-heading" className="sr-only">Analysis Input Console</h2>
          <AnalysisInputForm
            prompt={prompt}
            onPromptChange={(newPrompt) => {
              setPrompt(newPrompt);
              setActiveCaseId(null);
            }}
            onSubmit={runMultiAgentAnalysis}
            isAnalyzing={isAnalyzing}
            currentAgentAction={currentAgent?.actionText}
          />
        </section>

        {/* 3. Asynchronous Sub-Agent Pipeline UI (Core Requirement 3) */}
        {(isAnalyzing || hasRunOnce) && (
          <section aria-labelledby="pipeline-heading" className="animate-in fade-in duration-300">
            <h2 id="pipeline-heading" className="sr-only">Sub-Agent Pipeline Matrix</h2>
            <AgentPipeline
              steps={steps}
              currentStepIndex={currentStepIndex}
              isComplete={!isAnalyzing && Boolean(dossier)}
              totalTimeMs={executionTime}
              gateUsed={detectedGate}
            />
          </section>
        )}

        {/* 4. Output Canvas & Export Engine (Core Requirement 4) */}
        {dossier && (
          <section ref={outputRef} aria-labelledby="dossier-heading" className="animate-in fade-in duration-300">
            <h2 id="dossier-heading" className="sr-only">Market Research Dossier</h2>
            <DossierCanvas dossier={dossier} />
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1E293B] bg-[#0B0F19] px-4 lg:px-8 py-4 mt-12 text-slate-400 font-mono text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#38BDF8]" />
            <span className="text-slate-300 font-bold">MarketMind Analyst</span>
            <span>— Enterprise Dual-Engine Autonomous Research Architecture</span>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="text-emerald-400">● GATE A: Pakistan DB Ready</span>
            <span className="text-[#38BDF8]">● GATE B: Groq llama3-70b-8192</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
