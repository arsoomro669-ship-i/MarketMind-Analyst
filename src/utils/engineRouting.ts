import { EngineGate, MarketDossier } from '../types/index';
import {
  PAKISTAN_LOGISTICS_CASE,
  PAKISTAN_FINTECH_CASE,
  buildDynamicPakistanDossier,
  generateMarkdownDossier
} from '../data/pakistanMarketData';

export const PAKISTANI_KEYWORDS = [
  'pakistan',
  'pakistani',
  'pkr',
  'careem',
  'daraz',
  'sadapay',
  'nayapay',
  'bykea',
  'karachi',
  'lahore',
  'islamabad',
  'rawalpindi',
  'faisalabad',
  'peshawar',
  'multan',
  'postex',
  'trax',
  'tcs',
  'leopards courier',
  'leopards',
  'easypaisa',
  'jazzcash',
  'call courier',
  'raast',
  'fbr',
  'srb',
  'pra',
  'kibor',
  'sbp',
  'cash on delivery',
  'cod'
];

/**
 * Evaluates whether input prompt triggers Gate A (Pakistan Local Cache)
 * or Gate B (Live Groq LLaMA-3 Global Engine).
 */
export function determineEngineGate(prompt: string): EngineGate {
  if (!prompt || typeof prompt !== 'string') {
    return 'GATE_B_GLOBAL';
  }

  const normalized = prompt.toLowerCase();

  // Check if matches preset case prompts exactly or closely
  if (
    normalized.includes('logistics') && (normalized.includes('cod') || normalized.includes('pakistan')) ||
    normalized.includes('fintech') && (normalized.includes('raast') || normalized.includes('pakistan'))
  ) {
    return 'GATE_A_PAKISTAN';
  }

  // Check Pakistani keywords
  const hasKeyword = PAKISTANI_KEYWORDS.some((kw) => {
    // Word boundary or containment
    const regex = new RegExp(`\\b${kw}\\b`, 'i');
    return regex.test(normalized) || normalized.includes(kw);
  });

  if (hasKeyword) {
    return 'GATE_A_PAKISTAN';
  }

  return 'GATE_B_GLOBAL';
}

/**
 * Fetches Gate A dossier instantly from local static memory.
 */
export function getLocalPakistanDossier(prompt: string): MarketDossier {
  const normalized = prompt.toLowerCase();

  if (normalized.includes('logistics') || normalized.includes('courier') || normalized.includes('delivery')) {
    return {
      ...PAKISTAN_LOGISTICS_CASE.dossier,
      timestamp: new Date().toISOString()
    };
  }

  if (normalized.includes('fintech') || normalized.includes('invoice') || normalized.includes('banking') || normalized.includes('raast')) {
    return {
      ...PAKISTAN_FINTECH_CASE.dossier,
      timestamp: new Date().toISOString()
    };
  }

  return buildDynamicPakistanDossier(prompt);
}

/**
 * Builds a clean structural simulation template for Global queries (Gate B)
 * when Groq API encounters rate limits, missing keys, or timeouts.
 */
export function buildGlobalFallbackDossier(prompt: string, executionTimeMs = 1250): MarketDossier {
  const topic = prompt.trim() || 'Global Technology Venture';

  const dossier: MarketDossier = {
    title: `Global Market Intelligence Dossier: ${topic.slice(0, 60)}`,
    targetMarket: 'Global Tier 1 Markets (US / EU / APAC Expansion)',
    gateUsed: 'GATE_B_GLOBAL',
    modelIdentifier: 'Groq llama3-70b-8192 (Structural Fallback Mode)',
    executionTimeMs,
    timestamp: new Date().toISOString(),
    executiveSummary: `Strategic market evaluation for global concept: "${topic}". Global entry faces entrenched platform incumbents, customer acquisition cost (CAC) inflation driven by ad network saturation, and tightening cross-border compliance standards. However, emerging AI automation and API unbundling create distinct high-leverage entry points.`,
    competitors: [
      {
        name: 'Incumbent Category Leaders',
        marketShare: '55% Enterprise Grip',
        coreStrength: 'Vast enterprise sales distribution channels, deep balance sheets, existing multi-year vendor lock-in.',
        vulnerability: 'Bloated legacy software architectures, sluggish AI agent integration cycles, high seat-based licensing fees.'
      },
      {
        name: 'Agile Point-Solution Startups',
        marketShare: '25% Rapid Growth Segment',
        coreStrength: 'Modern developer ergonomics, self-serve onboarding, specialized niche workflows.',
        vulnerability: 'High customer churn, narrow feature sets vulnerable to platform commoditization, elevated cloud infrastructure unit costs.'
      },
      {
        name: 'Open-Source & In-House Custom Builds',
        marketShare: '20% Developer Sub-Market',
        coreStrength: 'Zero software licensing cost, complete data privacy control, infinite code customizability.',
        vulnerability: 'High engineering maintenance overhead, lack of enterprise SLAs, fragile ongoing maintenance burden.'
      }
    ],
    operationalFrictionPoints: [
      {
        title: 'CAC Inflation & Ad Saturation in Customer Acquisition',
        category: 'Operational',
        severity: 'CRITICAL',
        description: 'B2B Customer Acquisition Costs (CAC) have climbed 40%+ across mature digital markets. Relying on paid digital acquisition burns runway before achieving positive LTV/CAC ratios.',
        macroImpact: 'Payback periods stretch beyond 18 months, choking growth without organic product-led referral loops.'
      },
      {
        title: 'Cross-Border Regulatory Fragmentation (GDPR, SOC2, HIPAA, AI Act)',
        category: 'Regulatory',
        severity: 'HIGH',
        description: 'Multi-jurisdiction compliance requires enterprise-grade audit trails, strict data residency guarantees, and AI model provenance disclosures that slow velocity.',
        macroImpact: 'Compliance overhead consumes 15-20% of seed engineering resources during early expansion phases.'
      },
      {
        title: 'Inference Cost Volatility & Compute Unit Economics',
        category: 'Operational',
        severity: 'MEDIUM',
        description: 'AI-first global SaaS architectures risk margin collapse if client queries consume unthrottled token budgets without intelligent semantic caching.',
        macroImpact: 'Gross margins can drop from 80% SaaS standard to <45% if multi-agent pipelines are poorly optimized.'
      }
    ],
    strategicUnfairAdvantage: {
      coreMoat: 'Proprietary Workflow Graph + Self-Optimizing Agent Pipeline + Asymmetric Unit Economics Engine.',
      defensibilityFactors: [
        'Proprietary data flywheel: each resolved transaction trains customized domain embeddings that competitors cannot replicate.',
        'Zero-overhead autonomous orchestration lowering per-seat service costs by 70%.',
        'Product-Led Growth (PLG) viral loop designed to compress blended CAC to under 4 months payback.',
        'Multi-LLM arbitration routing queries between low-cost fast inference models and deep reasoning nodes.'
      ],
      unitEconomicsHedge: 'Semantic edge-caching ensures gross margins exceed 78% even under heavy token load.',
      executionVector: 'Target mid-market operators unsatisfied with legacy pricing through an immediate self-service trial.'
    },
    metrics: {
      tamPkrOrUsd: '$14.8 Billion USD Global TAM',
      projectedCagr: '28.4% (2025-2030)',
      settlementCycleDays: 'Instant Digital Rails (Stripe / SEPA / FedNow)',
      marginVulnerabilityIndex: 'Low (Insulated via token caching)'
    },
    rawMarkdown: ''
  };

  dossier.rawMarkdown = generateMarkdownDossier(dossier);
  return dossier;
}

/**
 * Bundles raw canvas markdown text into a downloadable .md file using the Blob constructor
 */
export function downloadMarkdownDossier(markdownContent: string, title: string = 'MarketMind_Dossier'): void {
  const cleanTitle = title.replace(/[^a-zA-Z0-9_-]/g, '_').toLowerCase();
  const filename = `${cleanTitle}_${Date.now()}.md`;
  const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
