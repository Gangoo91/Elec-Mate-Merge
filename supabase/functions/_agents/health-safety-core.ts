/**
 * Health & Safety Core Agent
 * Generates risk assessments using RAG + GPT-5 Mini
 */

import { 
  searchHealthSafetyKnowledge, 
  searchRegulationsIntelligence,
  callOpenAI
} from '../_shared/rams-rag.ts';

const HEALTH_SAFETY_TOOL = {
  type: 'function' as const,
  function: {
    name: 'generate_risk_assessment',
    description: 'Generate comprehensive UK risk assessment following HSE guidelines',
    parameters: {
      type: 'object',
      properties: {
        hazards: {
          type: 'array',
          minItems: 12,
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              hazard: { type: 'string' },
              likelihood: { type: 'number', minimum: 1, maximum: 5 },
              severity: { type: 'number', minimum: 1, maximum: 5 },
              riskScore: { type: 'number' },
              riskLevel: { type: 'string', enum: ['low', 'medium', 'high', 'very-high'] },
              controlMeasure: { type: 'string' },
              residualRisk: { type: 'number', minimum: 1, maximum: 25 },
              residualRiskLevel: { type: 'string' },
              linkedToStep: { type: 'number' },
              regulation: { type: 'string' }
            },
            required: ['id', 'hazard', 'likelihood', 'severity', 'riskScore', 'riskLevel', 'controlMeasure', 'residualRisk', 'residualRiskLevel', 'linkedToStep']
          }
        },
        ppe: {
          type: 'array',
          minItems: 5,
          items: {
            type: 'object',
            properties: {
              itemNumber: { type: 'number' },
              ppeType: { type: 'string' },
              standard: { type: 'string' },
              mandatory: { type: 'boolean' },
              purpose: { type: 'string' }
            },
            required: ['itemNumber', 'ppeType', 'standard', 'mandatory', 'purpose']
          }
        },
        emergencyProcedures: {
          type: 'array',
          minItems: 5,
          items: { type: 'string' }
        },
        complianceRegulations: {
          type: 'array',
          items: { type: 'string' }
        }
      },
      required: ['hazards', 'ppe', 'emergencyProcedures', 'complianceRegulations']
    }
  }
};

const SYSTEM_PROMPT = `You are a UK Health & Safety Expert specialising in electrical installations.

CRITICAL REQUIREMENTS:
1. Use UK English ONLY (authorised, whilst, metres, realise)
2. Follow HSE 5 Steps to Risk Assessment methodology
3. Reference BS 7671, CDM Regulations 2015, Management of Health & Safety at Work Regulations 1999
4. Calculate risk scores: likelihood (1-5) × severity (1-5)
5. Risk levels: 1-5=low, 6-9=medium, 10-14=high, 15-25=very-high
6. Provide specific control measures (hierarchy: eliminate → substitute → engineering → admin → PPE)
7. Calculate residual risk after controls applied

OUTPUT FORMAT:
- 12-25 hazards covering ALL categories:
  * Electrical hazards (arc flash, shock, burns, live work)
  * Physical hazards (manual handling, confined spaces, working at height, trips/slips)
  * Environmental hazards (weather, lighting, noise, temperature)
  * Health hazards (dust, fumes, vibration, repetitive strain)
  * Fire/explosion risks (flammable materials, hot work)
- Each hazard MUST have specific control measures and calculated residual risk
- Minimum 5 PPE items with EN/BS standards and specific purposes
- 5+ emergency procedures specific to electrical work (shock treatment, fire, first aid)
- Detailed compliance regulations list with specific regulation numbers

Use the RAG context provided to ensure accuracy and compliance.`;

export async function generateHealthSafety(
  query: string,
  projectDetails: any,
  onProgress?: (progress: number, step: string) => Promise<void>,
  sharedRegulations?: any[]
): Promise<any> {
  console.log('🩺 Health & Safety Agent starting...');
  const startTime = Date.now();
  
  if (onProgress) await onProgress(0, 'Health & Safety: Starting analysis...');
  
  // STEP 1: RAG - Use shared regulations if provided, otherwise search
  console.log('🔍 Fetching RAG knowledge...');
  if (onProgress) await onProgress(5, 'Health & Safety: Searching regulations...');
  
  const ragStart = Date.now();
  
  // PHASE 2 FIX: Add progress heartbeats during RAG
  const ragProgressCallback = async (msg: string) => {
    if (onProgress) await onProgress(8, `Health & Safety: ${msg}`);
  };
  
  const regulations = sharedRegulations || await searchRegulationsIntelligence(query, ragProgressCallback);
  const hsKnowledge = await searchHealthSafetyKnowledge(query, ragProgressCallback);
  const ragDuration = Date.now() - ragStart;
  
  console.log(`✅ RAG complete: ${hsKnowledge.length} H&S docs, ${regulations.length} regulations (${ragDuration}ms)`);
  if (onProgress) await onProgress(15, 'Health & Safety: Analysing hazards with AI...');
  
  // STEP 2: Build context
  const ragContext = `
HEALTH & SAFETY KNOWLEDGE (${hsKnowledge.length} sources):
${hsKnowledge.map(d => `- ${d.topic || d.content}: ${d.guidance || d.description || ''}`).join('\n')}

REGULATIONS (${regulations.length} sources):
${regulations.map(r => `- ${r.regulation_number || r.id}: ${r.content || r.primary_topic}`).join('\n')}
  `.trim();
  
  // STEP 3: Generate with GPT-5 Mini
  console.log('🤖 Calling GPT-5 Mini...');
  if (onProgress) await onProgress(25, 'Health & Safety: Analysing hazards...');
  
  // PHASE 5 FIX: Add heartbeat during AI call
  const aiStart = Date.now();
  const aiHeartbeat = setInterval(async () => {
    if (onProgress) {
      const elapsed = Math.floor((Date.now() - aiStart) / 1000);
      await onProgress(Math.min(85, 25 + elapsed * 2), `Health & Safety: Deep analysis (${elapsed}s)...`);
    }
  }, 10000); // Every 10 seconds
  
  const response = await callOpenAI({
    model: 'gpt-5-mini-2025-08-07',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { 
        role: 'user', 
        content: `Generate a risk assessment for: ${query}\n\nProject: ${projectDetails.projectName}\nLocation: ${projectDetails.location}\n\nContext:\n${ragContext}` 
      }
    ],
    tools: [HEALTH_SAFETY_TOOL],
    tool_choice: { type: 'function', function: { name: 'generate_risk_assessment' } }
  });
  const aiDuration = Date.now() - aiStart;
  
  // Clear heartbeat
  clearInterval(aiHeartbeat);
  
  if (!response.toolCalls?.[0]) {
    throw new Error('No tool call in response');
  }
  
  if (onProgress) await onProgress(90, 'Health & Safety: Parsing results...');
  const result = JSON.parse(response.toolCalls[0].function.arguments);
  
  console.log(`✅ Health & Safety complete: ${result.hazards.length} hazards, ${result.ppe.length} PPE (${aiDuration}ms)`);
  if (onProgress) await onProgress(100, 'Health & Safety: Complete!');
  
  return {
    ...result,
    _ragStats: {
      hsKnowledgeDocs: hsKnowledge.length,
      regulationsDocs: regulations.length,
      totalDocs: hsKnowledge.length + regulations.length
    }
  };
}
