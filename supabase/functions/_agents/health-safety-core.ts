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
          minItems: 5,
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
          minItems: 3,
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
          minItems: 3,
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
- Minimum 5 hazards (electrical, physical, environmental, health)
- Minimum 3 PPE items with EN/BS standards
- 3+ emergency procedures specific to electrical work
- Compliance regulations list

Use the RAG context provided to ensure accuracy and compliance.`;

export async function generateHealthSafety(
  query: string,
  projectDetails: any,
  onProgress?: (progress: number, step: string) => Promise<void>
): Promise<any> {
  console.log('🩺 Health & Safety Agent starting...');
  const startTime = Date.now();
  
  if (onProgress) await onProgress(20, 'Analysing health & safety requirements...');
  
  // STEP 1: RAG - Parallel search
  console.log('🔍 Fetching RAG knowledge...');
  if (onProgress) await onProgress(25, 'Searching health & safety knowledge base...');
  
  const [hsKnowledge, regulations] = await Promise.all([
    searchHealthSafetyKnowledge(query),
    searchRegulationsIntelligence(query)
  ]);
  
  console.log(`✅ RAG complete: ${hsKnowledge.length} H&S docs, ${regulations.length} regulations (${Date.now() - startTime}ms)`);
  if (onProgress) await onProgress(35, 'Generating risk assessment with AI...');
  
  // STEP 2: Build context
  const ragContext = `
HEALTH & SAFETY KNOWLEDGE (${hsKnowledge.length} sources):
${hsKnowledge.map(d => `- ${d.topic || d.content}: ${d.guidance || d.description || ''}`).join('\n')}

REGULATIONS (${regulations.length} sources):
${regulations.map(r => `- ${r.regulation_number || r.id}: ${r.content || r.primary_topic}`).join('\n')}
  `.trim();
  
  // STEP 3: Generate with GPT-5 Mini
  console.log('🤖 Calling GPT-5 Mini...');
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
  
  if (!response.toolCalls?.[0]) {
    throw new Error('No tool call in response');
  }
  
  const result = JSON.parse(response.toolCalls[0].function.arguments);
  
  console.log(`✅ Health & Safety complete: ${result.hazards.length} hazards, ${result.ppe.length} PPE (${Date.now() - startTime}ms)`);
  if (onProgress) await onProgress(45, 'Health & Safety analysis complete!');
  
  return {
    ...result,
    _ragStats: {
      hsKnowledgeDocs: hsKnowledge.length,
      regulationsDocs: regulations.length,
      totalDocs: hsKnowledge.length + regulations.length
    }
  };
}
