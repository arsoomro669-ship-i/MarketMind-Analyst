import { MarketDossier } from '../types/index';

export const PAKISTAN_LOGISTICS_CASE: {
  id: string;
  title: string;
  category: string;
  prompt: string;
  targetMarket: string;
  dossier: MarketDossier;
} = {
  id: 'pakistan-logistics',
  title: 'Next-Gen B2B & D2C Smart Logistics & Automated COD Reconciliation Platform for Pakistan',
  category: 'Logistics & Supply Chain',
  prompt: 'Develop an AI-driven last-mile delivery and 24-hour instant Cash-on-Delivery (COD) reconciliation engine for e-commerce in Pakistan, addressing fuel inflation spikes, rider route optimization, and courier billing disputes.',
  targetMarket: 'Pakistan (Karachi, Lahore, Islamabad-Rawalpindi, Faisalabad)',
  dossier: {
    title: 'Autonomous Logistics & 24h COD Liquidity Engine (Pakistan Market Dossier)',
    targetMarket: 'Pakistan (Tier 1 & Tier 2 Hubs)',
    gateUsed: 'GATE_A_PAKISTAN' as const,
    modelIdentifier: 'Local Cache: Pakistan Logistics Index v4.8 (0ms Latency)',
    executionTimeMs: 42,
    timestamp: new Date().toISOString(),
    executiveSummary: 'The Pakistani e-commerce logistics sector handles over 120 million parcels annually, with >85% reliant on Cash-on-Delivery (COD). Operators face severe margin compression from runaway fuel inflation (petrol fluctuating at PKR 260-290/L), catastrophic 14-21 day courier COD settlement cycles locking up $140M+ in working capital, and rampant paper invoice reconciliation discrepancies causing 4-7% merchant revenue leakage.',
    competitors: [
      {
        name: 'TCS & Leopards Courier',
        marketShare: '42% Legacy Aggregate',
        coreStrength: 'Unrivaled nationwide footprint with 900+ physical delivery hubs and airport transit privileges.',
        vulnerability: 'Archaic manual COD settlement cycle (14-21 days), high delivery failure (RTO) rates of 28-35%, and rigid paper dispatch invoicing.'
      },
      {
        name: 'PostEx',
        marketShare: '24% Modern E-commerce Logistics',
        coreStrength: 'Pioneered instant upfront COD financing/factoring for digital D2C brands.',
        vulnerability: 'High cost of merchant debt factoring during high KIBOR interest rate environments and heavy reliance on 3PL fleet outsourcing.'
      },
      {
        name: 'Trax & Call Courier',
        marketShare: '19% E-commerce Express',
        coreStrength: 'Robust API integration with Shopify/WooCommerce and automated label dispatching.',
        vulnerability: 'Vulnerable to rider attrition during severe petrol price surges; dispute resolution on lost/damaged shipments takes 30+ days.'
      }
    ],
    operationalFrictionPoints: [
      {
        title: 'Runaway Fuel Inflation & Fleet Margin Compression',
        category: 'Fuel Inflation',
        severity: 'CRITICAL',
        description: 'Fuel costs constitute 38-44% of total last-mile operating expenses in Pakistan. Spikes in petroleum prices directly erode per-parcel margins, triggering rider strikes and sudden surcharges that merchant contracts cannot absorb.',
        macroImpact: 'Average cost per delivery surged by 47% year-over-year in PKR terms, forcing unhedged courier networks to operate at sub-2% EBITDA margins.'
      },
      {
        title: 'Cash-on-Delivery (COD) Settlement Delays & Working Capital Traps',
        category: 'COD Settlement',
        severity: 'CRITICAL',
        description: 'Couriers hold collected consumer cash for 7 to 21 business days before remitting to merchants. This chronic cash float creates severe liquidity bottlenecks for D2C brands, while high Return-to-Origin (RTO) rates of 25-32% duplicate fuel waste.',
        macroImpact: 'Over PKR 35 Billion in merchant working capital remains trapped in courier remittance escrow at any given time, limiting e-commerce inventory restocking.'
      },
      {
        title: 'Manual Invoice Processing Errors & Cross-Provincial Tax Disputes',
        category: 'Invoice Errors',
        severity: 'HIGH',
        description: 'Fragmented provincial tax regimes (Sindh Revenue Board SRB vs Punjab Revenue Authority PRA vs KPRA) and paper-based billing lead to frequent withholding tax mismatches, double taxation claims, and reconciliation disputes between 3PLs and merchants.',
        macroImpact: 'Merchants report an average 5.8% revenue leakage due to unverified freight surcharges, weight discrepancy penalties, and missing withholding tax credit slips.'
      }
    ],
    strategicUnfairAdvantage: {
      coreMoat: 'Tri-Pronged Algorithmic Moat: Dynamic Route-Fuel Hedging + Micro-Factored 24h COD Liquidity + Automated FBR/PRA Tax-Compliant Invoicing Engine.',
      defensibilityFactors: [
        'Proprietary predictive clustering reduces rider kilometer burn by 23%, insulating operations from petroleum price volatility.',
        'Zero-trust digital Proof-of-Delivery (e-POD) with one-time SMS passwords brings doorstep rejection (RTO) below 11%.',
        'Direct automated integration into SBP Raast instant payment rails for 24-hour merchant settlement without predatory factoring rates.',
        'Automated FBR STRN/NTN invoice verification that stops billing reconciliation leakage and prevents provincial double withholding.'
      ],
      unitEconomicsHedge: 'Achieves positive per-delivery unit contribution even at PKR 300/L petrol price through automated multi-carrier route pooling.',
      executionVector: 'Target mid-market D2C merchants currently suffocating under 14-day Trax/TCS settlement holds with a guaranteed T+1 payout contract.'
    },
    metrics: {
      tamPkrOrUsd: 'PKR 185 Billion ($660M USD)',
      projectedCagr: '24.6% (2024-2029)',
      settlementCycleDays: '1 Day (vs 14-21 Day Industry Baseline)',
      marginVulnerabilityIndex: 'Low (AI fuel-hedged algorithmic route pooling)'
    },
    rawMarkdown: ''
  }
};

export const PAKISTAN_FINTECH_CASE: {
  id: string;
  title: string;
  category: string;
  prompt: string;
  targetMarket: string;
  dossier: MarketDossier;
} = {
  id: 'pakistan-fintech',
  title: 'Instant B2B Supplier Financing & Digital Invoicing Gateway for Pakistani Merchants',
  category: 'FinTech & SME Liquidity',
  prompt: 'Design an automated B2B digital invoicing, tax-withholding reconciliation, and working-capital factoring gateway integrated with State Bank of Pakistan (SBP) Raast instant payment rails for wholesale trade.',
  targetMarket: 'Pakistan (Wholesale B2B Corridors: Jodia Bazaar Karachi, Shah Alam Market Lahore)',
  dossier: {
    title: 'B2B Trade Liquidity & Automated Tax-Reconciled Invoicing Engine (Pakistan Dossier)',
    targetMarket: 'Pakistan B2B Trade & Distributor Network',
    gateUsed: 'GATE_A_PAKISTAN' as const,
    modelIdentifier: 'Local Cache: Pakistan FinTech Index v5.1 (0ms Latency)',
    executionTimeMs: 38,
    timestamp: new Date().toISOString(),
    executiveSummary: 'Pakistan has over 3.8 million Micro, Small, and Medium Enterprises (MSMEs) representing over 90% of all enterprises, yet SME private credit penetration stands at an abysmal 3.2% of total banking credit. Businesses operate on informal, delayed cash cycles, severe paper invoice discrepancies with complex FBR tax withholding friction, and chronic liquidity crunches aggravated by transport fuel surcharges and high interest rates.',
    competitors: [
      {
        name: 'SadaPay & NayaPay',
        marketShare: '65% Consumer & Freelancer EMI Space',
        coreStrength: 'Sleek consumer apps, zero-fee debit cards, and strong youth/freelancer brand affinity.',
        vulnerability: 'Primarily consumer wallets; lack deep B2B invoice factoring, corporate ledger integrations, and physical merchant credit line underwriting.'
      },
      {
        name: 'JazzCash & Easypaisa',
        marketShare: '78% Mobile Money OTC Volume',
        coreStrength: 'Massive agent networks (250k+ touchpoints) and ubiquitous rural brand awareness.',
        vulnerability: 'Low transaction limit caps, high agent cash-out tariffs, and lack of enterprise invoice reconciliation software.'
      },
      {
        name: 'Finja & Dastgyr (Credit Arm)',
        marketShare: '12% B2B Supply Chain Credit',
        coreStrength: 'Early underwriting frameworks for FMCG mom-and-pop (Kiryana) store credit.',
        vulnerability: 'High non-performing loan (NPL) exposure during inflation spikes and heavy dependence on expensive commercial banking credit lines.'
      }
    ],
    operationalFrictionPoints: [
      {
        title: 'Cash-on-Delivery Settlement Delays & Frozen Wholesale Liquidity',
        category: 'COD Settlement',
        severity: 'CRITICAL',
        description: 'Downstream retail customers delay payments for 30 to 60 days while couriers hold COD payments. Wholesalers are unable to purchase inventory without taking predatory informal market loans at 35%+ APR.',
        macroImpact: 'Distributors operate with an average of 42 cash conversion cycle days, causing frequent stock-outs and stalled inventory velocity.'
      },
      {
        title: 'Invoice Processing Errors & Withholding Tax Deductions (FBR/SRB/PRA)',
        category: 'Invoice Errors',
        severity: 'CRITICAL',
        description: 'Manual paper invoices create constant mismatches in sales tax withholding (STWH) and income tax withholding (ITWH). FBR Section 73 bank-account payment verifications are routinely botched by manual bank transfers, leading to disallowed input tax credits.',
        macroImpact: 'MSMEs suffer up to 8.4% of annual net profit in disallowances, penalties, and audit fees due to invoice mismatch with the FBR IRIS database.'
      },
      {
        title: 'Macroeconomic Fuel Inflation Impacting Distribution Logistics',
        category: 'Fuel Inflation',
        severity: 'HIGH',
        description: 'Wholesale delivery fleets are hit directly by weekly fuel adjustments. Van distributors pass unpredictable transport fuel surcharges onto already squeezed retailers, resulting in cancelled purchase orders.',
        macroImpact: 'Wholesale distributor distribution margins shrunk from 6.5% to 2.8% over the past 18 months due to unhedged diesel price escalation.'
      }
    ],
    strategicUnfairAdvantage: {
      coreMoat: 'Embedded Raast P2M Clearing Rails + Digital Tax-Certified Invoice Ledger + Real-Time Cash Flow Underwriting Engine.',
      defensibilityFactors: [
        'Instant settlement via State Bank of Pakistan Raast rails reduces payment clearing fees from 2.5% to near zero.',
        'Automated FBR e-invoicing API integration generates instant, verifiable tax withholding certificates, eliminating audit friction.',
        'Alternative credit scoring based on verifiable courier delivery volume and utility payments rather than balance sheet collateral.',
        'Dynamic working capital micro-advances against verified invoices underwritten within 90 seconds.'
      ],
      unitEconomicsHedge: 'Monetizes through low-risk 1.2% invoice clearing fees and software SaaS subscriptions rather than balance-sheet lending risk.',
      executionVector: 'Partner directly with fast-moving consumer goods (FMCG) master distributors across Karachi and Lahore wholesale hubs.'
    },
    metrics: {
      tamPkrOrUsd: 'PKR 3.4 Trillion ($12.1 Billion USD)',
      projectedCagr: '31.2% (2024-2030)',
      settlementCycleDays: 'Instant (T+0 via Raast vs 30-45 Day Credit Baseline)',
      marginVulnerabilityIndex: 'Minimal (Asset-light transaction fee model)'
    },
    rawMarkdown: ''
  }
};

export function generateMarkdownDossier(data: MarketDossier): string {
  const competitorLines = data.competitors.map((c) => `### 🏢 ${c.name}
- **Market Footprint / Share:** ${c.marketShare}
- **Key Strength:** ${c.coreStrength}
- **Core Vulnerability:** ${c.vulnerability}
`).join('\n');

  const frictionLines = data.operationalFrictionPoints.map((f) => `### ⚠️ [${f.severity}] ${f.title}
- **Domain Category:** ${f.category}
- **Operational Reality:** ${f.description}
- **Macroeconomic & Financial Impact:** ${f.macroImpact}
`).join('\n');

  const defensibilityList = data.strategicUnfairAdvantage.defensibilityFactors.map((d) => `  - ${d}`).join('\n');

  return `# MARKET INTELLIGENCE DOSSIER: ${data.title.toUpperCase()}
**Engine Routing:** ${data.gateUsed} | **Engine Specification:** ${data.modelIdentifier}
**Target Geography:** ${data.targetMarket} | **Compiled At:** ${data.timestamp}

---

## 📌 Executive Summary
${data.executiveSummary}

### 📊 Key Telemetry & Market Sizing
- **Total Addressable Market (TAM):** ${data.metrics.tamPkrOrUsd}
- **Projected Sector CAGR:** ${data.metrics.projectedCagr}
- **Settlement Velocity / Cycle:** ${data.metrics.settlementCycleDays}
- **Vulnerability Profile:** ${data.metrics.marginVulnerabilityIndex}

---

## Identified Competitors
${competitorLines}

---

## Operational Friction Points
${frictionLines}

---

## Strategic Unfair Advantage
### 🛡️ Core Moat
${data.strategicUnfairAdvantage.coreMoat}

### 🚀 Defensibility Architecture
${defensibilityList}

### 💡 Unit Economics & Macroeconomic Hedge
${data.strategicUnfairAdvantage.unitEconomicsHedge}

### 🎯 Primary Execution Vector
${data.strategicUnfairAdvantage.executionVector}

---
*Generated by MarketMind Analyst Dual-Engine Terminal // Automated Sub-Agent Intelligence Protocol*
`;
}

// Generate rawMarkdown property for preset cases
PAKISTAN_LOGISTICS_CASE.dossier.rawMarkdown = generateMarkdownDossier(PAKISTAN_LOGISTICS_CASE.dossier);
PAKISTAN_FINTECH_CASE.dossier.rawMarkdown = generateMarkdownDossier(PAKISTAN_FINTECH_CASE.dossier);

export const PAKISTAN_MARKET_DATA = [
  PAKISTAN_LOGISTICS_CASE,
  PAKISTAN_FINTECH_CASE
];

export function buildDynamicPakistanDossier(prompt: string): MarketDossier {
  const isAgri = /agri|farm|crop|wheat|sugar|cotton|kisan/i.test(prompt);
  const isEcommerce = /daraz|shop|retail|store|cart|fashion|clothing/i.test(prompt);

  const title = isAgri
    ? 'Pakistani AgriTech & Farm-to-Retail Supply Chain Intelligence'
    : isEcommerce
    ? 'Direct-to-Consumer (D2C) E-commerce Operations & COD Optimization (Pakistan)'
    : 'Pakistan Market Strategic Entry & Operations Intelligence';

  const dossier: MarketDossier = {
    title,
    targetMarket: 'Pakistan (National Digital & Logistics Infrastructure)',
    gateUsed: 'GATE_A_PAKISTAN',
    modelIdentifier: 'Local Cache: Pakistan Market Knowledgebase v4.8 (0ms Latency)',
    executionTimeMs: 45,
    timestamp: new Date().toISOString(),
    executiveSummary: `Targeted analysis for: "${prompt}". Operating in Pakistan requires navigating severe structural realities: currency devaluations against the USD, high petroleum fuel inflation, cash-on-delivery settlement delays of 7 to 21 days holding back merchant cashflow, and pervasive paper invoicing errors tied to provincial sales tax withholding (FBR, SRB, PRA). Any viable venture must engineer around these operational barriers.`,
    competitors: [
      {
        name: 'Dominant Legacy Conglomerates & 3PLs (TCS, Leopards, Traditional Wholesalers)',
        marketShare: '48% Established Volume',
        coreStrength: 'Decades of offline relationships, nationwide physical branches, political lobbying power.',
        vulnerability: 'Sluggish technology adoption, reliance on manual paper accounting, high reconciliation error rates.'
      },
      {
        name: 'Venture-Backed Digital Challengers (PostEx, Trax, Retailo, Bazaar, SadaPay)',
        marketShare: '32% High-Growth Tech Segment',
        coreStrength: 'Agile digital mobile interfaces, venture capitalization, rapid modern merchant acquisition.',
        vulnerability: 'Burning cash on subsidies, vulnerability to high KIBOR interest rates, reliance on outsourced dispatch.'
      },
      {
        name: 'Informal Hawala / Hundi & Unbanked Merchant Networks',
        marketShare: '20% Offline Parallel Market',
        coreStrength: 'Zero tax compliance friction, instant localized trust, cash-only informal credit.',
        vulnerability: 'Complete lack of legal dispute recourse, zero auditability, cannot scale to institutional enterprise.'
      }
    ],
    operationalFrictionPoints: [
      {
        title: 'Fuel Inflation & Fleet Mileage Volatility',
        category: 'Fuel Inflation',
        severity: 'CRITICAL',
        description: 'Petroleum prices fluctuate aggressively based on IMF fiscal targets and rupee exchange rates. Last-mile transportation fleets face unpredicted cost spikes that quickly invert gross margins into operational losses.',
        macroImpact: 'Transportation overhead fluctuates up to 25% within a single calendar quarter, penalizing businesses without dynamic routing.'
      },
      {
        title: 'Cash-on-Delivery (COD) Settlement Delays & Return-to-Origin (RTO) Sinks',
        category: 'COD Settlement',
        severity: 'CRITICAL',
        description: 'Couriers hold collected consumer cash for 7 to 21 business days before remitting to merchants. In addition, 28-34% of orders are rejected at the door, forcing merchants to absorb two-way fuel costs with zero revenue.',
        macroImpact: 'Working capital turnover slowed by 3x compared to card-penetrated markets, forcing excessive safety stock.'
      },
      {
        title: 'Invoice Processing Errors & Disputed Tax Withholding Certificates',
        category: 'Invoice Errors',
        severity: 'HIGH',
        description: 'Complex provincial sales tax regimes (SRB, PRA, KPRA, BRA) require fragmented withholding certificates. Manual paper invoices result in mismatched tax filings, leading to FBR audit flags and blocked tax refunds.',
        macroImpact: 'An estimated 4.5% to 7% of gross transaction value is lost to billing dispute write-offs and tax penalties annually.'
      }
    ],
    strategicUnfairAdvantage: {
      coreMoat: 'Algorithmic Fuel Route Optimization + Integrated Raast P2M Settlement + Automated Provincial Tax Withholding Reconciliation.',
      defensibilityFactors: [
        'Zero-trust OTP verification before dispatch to preemptively slash RTO failure rates from 30% to <10%.',
        'Direct connection to State Bank of Pakistan Raast rails to bypass multi-week courier escrow cycles.',
        'Automated FBR Section 73 compliant digital tax invoice ledger preventing input tax disallowances.',
        'Multi-depot inventory placement reducing cross-city trunking fuel consumption by 35%.'
      ],
      unitEconomicsHedge: 'Designed to stay unit-profitable under PKR 320/litre fuel stress test scenarios.',
      executionVector: 'Anchor on high-volume corridor merchants in Karachi and Lahore with automated reconciliation guarantees.'
    },
    metrics: {
      tamPkrOrUsd: 'PKR 140-220 Billion ($500M - $800M USD)',
      projectedCagr: '21.5% (2024-2029)',
      settlementCycleDays: '1-2 Days (vs 14-21 Days Legacy)',
      marginVulnerabilityIndex: 'Low (Insulated through algorithmic fuel hedges)'
    },
    rawMarkdown: ''
  };

  dossier.rawMarkdown = generateMarkdownDossier(dossier);
  return dossier;
}
