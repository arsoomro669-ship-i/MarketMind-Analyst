import test from 'node:test';
import assert from 'node:assert/strict';
import { determineEngineGate, getLocalPakistanDossier, buildGlobalFallbackDossier } from './engineRouting';
import { PAKISTANI_KEYWORDS } from './engineRouting';

test('determineEngineGate accurately routes Pakistan logistics prompts to Gate A', () => {
  const prompt = 'Develop an AI-driven last-mile delivery and 24-hour instant Cash-on-Delivery (COD) reconciliation engine for e-commerce in Pakistan';
  const gate = determineEngineGate(prompt);
  assert.equal(gate, 'GATE_A_PAKISTAN');
});

test('determineEngineGate routes prompt containing Pakistan keywords to Gate A', () => {
  assert.equal(determineEngineGate('FinTech wallet like SadaPay with Raast integration'), 'GATE_A_PAKISTAN');
  assert.equal(determineEngineGate('E-commerce marketplace competitor to Daraz in Karachi'), 'GATE_A_PAKISTAN');
  assert.equal(determineEngineGate('Last-mile fleet tracking in Lahore with fuel price surges'), 'GATE_A_PAKISTAN');
  assert.equal(determineEngineGate('PostEx competitor with automated invoice reconciliation'), 'GATE_A_PAKISTAN');
});

test('determineEngineGate routes global concepts to Gate B', () => {
  assert.equal(determineEngineGate('AI Copilot for Dental Clinics in Germany'), 'GATE_B_GLOBAL');
  assert.equal(determineEngineGate('Autonomous Freight Drone network across California'), 'GATE_B_GLOBAL');
  assert.equal(determineEngineGate('Cybersecurity SOC analyst assistant for UK banks'), 'GATE_B_GLOBAL');
});

test('getLocalPakistanDossier contains required Pakistan structural friction points', () => {
  const dossier = getLocalPakistanDossier('Logistics delivery and COD delays');
  assert.equal(dossier.gateUsed, 'GATE_A_PAKISTAN');
  assert.ok(dossier.operationalFrictionPoints.length >= 3);

  const categories = dossier.operationalFrictionPoints.map(p => p.category);
  assert.ok(categories.includes('Fuel Inflation'), 'Must cover Fuel Inflation');
  assert.ok(categories.includes('COD Settlement'), 'Must cover COD Settlement');
  assert.ok(categories.includes('Invoice Errors'), 'Must cover Invoice Errors');

  // Verify markdown output contains required explicit headers
  const md = dossier.rawMarkdown;
  assert.ok(md.includes('## Identified Competitors'), 'Markdown must include ## Identified Competitors');
  assert.ok(md.includes('## Operational Friction Points'), 'Markdown must include ## Operational Friction Points');
  assert.ok(md.includes('## Strategic Unfair Advantage'), 'Markdown must include ## Strategic Unfair Advantage');
});

test('buildGlobalFallbackDossier generates compliant dossier with required headers', () => {
  const dossier = buildGlobalFallbackDossier('Autonomous AI Agents for Healthcare Billing');
  assert.equal(dossier.gateUsed, 'GATE_B_GLOBAL');
  assert.ok(dossier.rawMarkdown.includes('## Identified Competitors'));
  assert.ok(dossier.rawMarkdown.includes('## Operational Friction Points'));
  assert.ok(dossier.rawMarkdown.includes('## Strategic Unfair Advantage'));
  assert.ok(dossier.competitors.length >= 3);
});
