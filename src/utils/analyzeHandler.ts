import { determineEngineGate, getLocalPakistanDossier, buildGlobalFallbackDossier } from './engineRouting';
import { MarketDossier, EngineGate } from '../types/index';

export interface AnalyzeResult {
  success: boolean;
  gate: EngineGate;
  dossier: MarketDossier;
  source: string;
}

export async function handleAnalyzeRequest(prompt: string): Promise<AnalyzeResult> {
  const startTime = Date.now();
  const gate = determineEngineGate(prompt);

  // GATE A: Instant Pakistan Local Knowledgebase
  if (gate === 'GATE_A_PAKISTAN') {
    const localDossier = getLocalPakistanDossier(prompt);
    localDossier.executionTimeMs = Date.now() - startTime;
    return {
      success: true,
      gate: 'GATE_A_PAKISTAN',
      dossier: localDossier,
      source: 'local_database'
    };
  }

  // GATE B: Live Global Mode (Groq LLaMA-3 70B with graceful fallback)
  const groqApiKey = process.env.GROQ_API_KEY?.trim();

  if (groqApiKey) {
    try {
      const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${groqApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama3-70b-8192',
          messages: [
            {
              role: 'system',
              content: `You are MarketMind Analyst, an elite multi-agent market intelligence terminal. Given a global concept, generate a structured and rigorous market research dossier in Markdown.
You MUST format your markdown response with these exact headings:
## Executive Summary
## Identified Competitors
## Operational Friction Points
## Strategic Unfair Advantage

Provide concrete competitor estimates, operational bottlenecks, regulatory friction, and defensibility moats. Return clean, polished Markdown.`
            },
            {
              role: 'user',
              content: `Perform multi-agent market intelligence analysis on: "${prompt}"`
            }
          ],
          temperature: 0.5,
          max_tokens: 2500
        })
      });

      if (groqResponse.ok) {
        const data = (await groqResponse.json()) as {
          choices?: Array<{ message?: { content?: string } }>;
        };
        const rawContent = data.choices?.[0]?.message?.content || '';

        if (rawContent && rawContent.length > 100) {
          const executionTimeMs = Date.now() - startTime;
          const fallbackBase = buildGlobalFallbackDossier(prompt, executionTimeMs);

          return {
            success: true,
            gate: 'GATE_B_GLOBAL',
            source: 'groq_live_api',
            dossier: {
              ...fallbackBase,
              modelIdentifier: 'Groq API: llama3-70b-8192 (Live Cloud Inference)',
              executionTimeMs,
              rawMarkdown: rawContent
            }
          };
        }
      } else {
        const errorText = await groqResponse.text();
        console.warn(`[MarketMind] Groq API returned status ${groqResponse.status}: ${errorText}. Falling back to structural template.`);
      }
    } catch (err) {
      console.warn('[MarketMind] Failed to reach Groq API. Falling back to structural template.', err);
    }
  }

  // Graceful Fallback: High-Fidelity Structural Simulation Template
  const executionTimeMs = Date.now() - startTime;
  const fallbackDossier = buildGlobalFallbackDossier(prompt, executionTimeMs);
  if (!groqApiKey) {
    fallbackDossier.modelIdentifier = 'Groq llama3-70b-8192 (Structural Simulation Mode)';
  } else {
    fallbackDossier.modelIdentifier = 'Groq llama3-70b-8192 (Resilience Fallback Mode)';
  }

  return {
    success: true,
    gate: 'GATE_B_GLOBAL',
    source: groqApiKey ? 'groq_resilience_fallback' : 'structural_simulation',
    dossier: fallbackDossier
  };
}
