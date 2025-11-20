/**
 * Installer Core Agent
 * Generates method statements using RAG + GPT-5 Mini
 */

import { 
  searchPracticalWorkIntelligence, 
  searchBS7671Intelligence,
  searchRegulationsIntelligence,
  callOpenAI
} from '../_shared/rams-rag.ts';

const INSTALLER_TOOL = {
  type: 'function' as const,
  function: {
    name: 'provide_installation_guidance',
    description: 'Generate step-by-step installation method statement',
    parameters: {
      type: 'object',
      properties: {
        installationSteps: {
          type: 'array',
          minItems: 10,
          items: {
            type: 'object',
            properties: {
              step: { type: 'number' },
              title: { type: 'string' },
              description: { type: 'string' },
              tools: { type: 'array', items: { type: 'string' }, minItems: 3 },
              materials: { type: 'array', items: { type: 'string' } },
              safetyNotes: { type: 'array', items: { type: 'string' } },
              linkedHazards: { type: 'array', items: { type: 'string' }, minItems: 2 },
              qualifications: { type: 'array', items: { type: 'string' } },
              estimatedTime: { type: 'number' }
            },
            required: ['step', 'title', 'description', 'tools', 'estimatedTime']
          }
        },
        toolsRequired: {
          type: 'array',
          items: { type: 'string' }
        },
        testingProcedures: {
          type: 'array',
          minItems: 5,
          items: {
            type: 'object',
            properties: {
              testName: { type: 'string' },
              standard: { type: 'string' },
              procedure: { type: 'string' },
              acceptanceCriteria: { type: 'string' }
            },
            required: ['testName', 'standard', 'procedure', 'acceptanceCriteria']
          }
        }
      },
      required: ['installationSteps', 'toolsRequired', 'testingProcedures']
    }
  }
};

const SYSTEM_PROMPT = `You are a UK Electrical Installation Expert (BS 7671 18th Edition).

CRITICAL REQUIREMENTS:
1. Use UK English ONLY (authorised, whilst, metres, earth not ground)
2. Follow BS 7671:2018+A3:2024 regulations
3. Reference IET Guidance Note 3 (Inspection & Testing)
4. Provide field-ready, practical instructions
5. Include specific measurements, cable sizes, test values
6. List exact tools and materials needed per step
7. Reference regulation numbers (e.g., BS 7671 Reg 411.3.2)

OUTPUT FORMAT:
- 10-16 detailed installation steps breaking down the full workflow:
  * Site preparation & safety setup (isolation, signage, barriers)
  * Isolation procedures & dead testing
  * Cable installation & routing (containment, support, protection)
  * Termination & connections (stripping, crimping, torque settings)
  * Bonding & earthing verification
  * Testing & commissioning (continuity, insulation, polarity, RCD, earth fault loop)
  * Final inspection & snagging
  * Documentation & handover
- Each step: 150-250 words with numbered sub-tasks, specific measurements, torque values
- 4+ tools per step (exact models/types where possible)
- Materials with exact quantities, cable sizes, and BS/EN standards
- 3+ hazards per step with specific hierarchy of control mitigations
- 5+ BS 7671-compliant testing procedures with pass/fail criteria and regulation references

Use the RAG context to ensure technical accuracy.`;

export async function generateMethodStatement(
  query: string,
  projectDetails: any,
  onProgress?: (progress: number, step: string) => Promise<void>,
  sharedRegulations?: any[]
): Promise<any> {
  console.log('🔧 Installer Agent starting...');
  const startTime = Date.now();
  
  if (onProgress) await onProgress(0, 'Installer: Starting method statement...');
  
  // STEP 1: RAG - Use shared regulations if provided, otherwise search
  console.log('🔍 Fetching RAG knowledge...');
  if (onProgress) await onProgress(10, 'Installer: Searching installation procedures...');
  
  const ragStart = Date.now();
  
  // PHASE 2 FIX: Add progress heartbeats during RAG
  const ragProgressCallback = async (msg: string) => {
    if (onProgress) await onProgress(15, `Installer: ${msg}`);
  };
  
  const regulations = sharedRegulations || await searchRegulationsIntelligence(query, ragProgressCallback);
  const practicalWork = await searchPracticalWorkIntelligence(query, ragProgressCallback);
  const ragDuration = Date.now() - ragStart;
  
  console.log(`✅ RAG complete: ${practicalWork.length} practical docs, ${regulations.length} regulations (${ragDuration}ms)`);
  if (onProgress) await onProgress(20, 'Installer: Creating method steps with AI...');
  
  // STEP 2: Build context
  const ragContext = `
PRACTICAL WORK INTELLIGENCE (${practicalWork.length} sources):
${practicalWork.map(d => {
  let text = `- ${d.primary_topic}: ${d.content || d.guidance || ''}`;
  if (d.tools_required?.length) text += `\n  Tools: ${d.tools_required.join(', ')}`;
  if (d.materials_needed?.length) text += `\n  Materials: ${d.materials_needed.join(', ')}`;
  return text;
}).join('\n')}

BS 7671 REGULATIONS (${regulations.length} sources):
${regulations.map(r => `- ${r.regulation_number || r.id}: ${r.content || r.primary_topic}`).join('\n')}
  `.trim();
  
  // STEP 3: Generate with GPT-5 Mini
  console.log('🤖 Calling GPT-5 Mini...');
  if (onProgress) await onProgress(35, 'Installer: Creating method steps...');
  
  // PHASE 5 FIX: Add heartbeat during AI call
  const aiStart = Date.now();
  const aiHeartbeat = setInterval(async () => {
    if (onProgress) {
      const elapsed = Math.floor((Date.now() - aiStart) / 1000);
      await onProgress(
        Math.min(90, 35 + elapsed * 2),
        `Installer: Generating steps (${elapsed}s)...`
      );
    }
  }, 10000); // Every 10 seconds
  
  let response: any;
  try {
    response = await callOpenAI({
      model: 'gpt-5-mini-2025-08-07',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { 
          role: 'user', 
          content: `Generate installation method statement for: ${query}\n\nProject: ${projectDetails.projectName}\nLocation: ${projectDetails.location}\n\nContext:\n${ragContext}` 
        }
      ],
      tools: [INSTALLER_TOOL],
      tool_choice: { type: 'function', function: { name: 'provide_installation_guidance' } }
    });
  } finally {
    // Always clear heartbeat, even if OpenAI call fails or times out
    clearInterval(aiHeartbeat);
  }

  const aiDuration = Date.now() - aiStart;
  
  if (!response.toolCalls?.[0]) {
    throw new Error('No tool call in response');
  }
  
  if (onProgress) await onProgress(90, 'Installer: Parsing results...');
  const result = JSON.parse(response.toolCalls[0].function.arguments);
  
  console.log(`✅ Installer complete: ${result.installationSteps.length} steps, ${result.testingProcedures.length} tests (${aiDuration}ms)`);
  if (onProgress) await onProgress(100, 'Installer: Complete!');
  
  return {
    ...result,
    _ragStats: {
      practicalWorkDocs: practicalWork.length,
      regulationsDocs: regulations.length,
      totalDocs: practicalWork.length + regulations.length
    }
  };
}
