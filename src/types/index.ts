export type EngineGate = 'GATE_A_PAKISTAN' | 'GATE_B_GLOBAL';

export interface CompetitorProfile {
  name: string;
  marketShare: string;
  coreStrength: string;
  vulnerability: string;
}

export interface FrictionPoint {
  title: string;
  category: 'Fuel Inflation' | 'COD Settlement' | 'Invoice Errors' | 'Regulatory' | 'Operational';
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  description: string;
  macroImpact: string;
}

export interface MarketDossier {
  title: string;
  targetMarket: string;
  gateUsed: EngineGate;
  modelIdentifier: string;
  executionTimeMs: number;
  timestamp: string;
  executiveSummary: string;
  competitors: CompetitorProfile[];
  operationalFrictionPoints: FrictionPoint[];
  strategicUnfairAdvantage: {
    coreMoat: string;
    defensibilityFactors: string[];
    unitEconomicsHedge: string;
    executionVector: string;
  };
  metrics: {
    tamPkrOrUsd: string;
    projectedCagr: string;
    settlementCycleDays: string;
    marginVulnerabilityIndex: string;
  };
  rawMarkdown: string;
}

export interface AgentStep {
  id: string;
  agentNumber: number;
  name: string;
  role: string;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';
  actionText: string;
  logMessages: string[];
  executionTimeMs?: number;
}
