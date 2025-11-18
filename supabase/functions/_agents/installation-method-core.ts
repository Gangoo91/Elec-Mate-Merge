/**
 * Installation Method Core Agent
 * ISOLATED from AI RAMS - Used ONLY by Installation Specialist
 * Generates enhanced method statements for professional PDF templates
 */

import { 
  searchPracticalWorkIntelligence, 
  searchBS7671Intelligence,
  searchRegulationsIntelligence,
  callOpenAI
} from '../_shared/rams-rag.ts';

const INSTALLATION_METHOD_TOOL = {
  type: 'function' as const,
  function: {
    name: 'provide_installation_method_guidance',
    description: 'Generate comprehensive installation method statement for professional documentation',
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
              estimatedTime: { type: 'number' },
              assignedPersonnel: { type: 'array', items: { type: 'string' } } // NEW: For PDF template
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
        },
        scopeOfWork: { // NEW: For PDF template
          type: 'object',
          properties: {
            description: { type: 'string' },
            keyDeliverables: { type: 'array', items: { type: 'string' } },
            exclusions: { type: 'string' }
          }
        },
        scheduleDetails: { // NEW: For PDF template
          type: 'object',
          properties: {
            workingHours: { type: 'string' },
            teamSize: { type: 'string' },
            weatherDependency: { type: 'string' },
            accessRequirements: { type: 'string' }
          }
        }
      },
      required: ['installationSteps', 'toolsRequired', 'testingProcedures']
    }
  }
};

const SYSTEM_PROMPT = `You are a UK Electrical Installation Expert (BS 7671 18th Edition) creating PROFESSIONAL INSTALLATION METHOD STATEMENTS.

CRITICAL REQUIREMENTS:
1. Use UK English ONLY (authorised, whilst, metres, earth not ground)
2. Follow BS 7671:2018+A2:2022 regulations
3. Reference IET Guidance Note 3 (Inspection & Testing)
4. Provide field-ready, practical instructions suitable for professional PDF documentation
5. Include specific measurements, cable sizes, test values
6. List exact tools and materials needed per step
7. Reference regulation numbers (e.g., BS 7671 Reg 411.3.2)
8. **NEW:** Assign personnel roles where appropriate (e.g., "Lead Electrician", "Apprentice", "Site Manager")

OUTPUT FORMAT FOR PROFESSIONAL PDF:
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
- Step-level qualifications (e.g., "18th Edition qualified", "Scaffold trained")
- **NEW:** Assigned personnel for each step (e.g., ["Lead Electrician", "Apprentice"])
- 5+ BS 7671-compliant testing procedures with pass/fail criteria and regulation references

**NEW FIELDS FOR PDF TEMPLATE:**
- Scope of Work: Clear project description, key deliverables (3-5 bullet points), exclusions
- Schedule Details: Working hours (e.g., "08:00-17:00 Mon-Fri"), team size, weather dependencies, access requirements

Use the RAG context to ensure technical accuracy and regulatory compliance.`;

export async function generateInstallationMethod(
  query: string,
  projectDetails: any,
  onProgress?: (progress: number, step: string) => Promise<void>,
  sharedRegulations?: any[]
): Promise<any> {
  console.log('🔧 Installation Method Agent starting...');
  const startTime = Date.now();
  
  if (onProgress) await onProgress(0, 'Installation Method: Starting...');
  
  // STEP 1: RAG - Use shared regulations if provided, otherwise search
  console.log('🔍 Fetching RAG knowledge...');
  if (onProgress) await onProgress(10, 'Installation Method: Searching installation procedures...');
  
  const ragResults = sharedRegulations || await Promise.all([
    searchPracticalWorkIntelligence(query, 5),
    searchBS7671Intelligence(query, 5),
    searchRegulationsIntelligence(query, 5)
  ]).then(results => results.flat());

  console.log(`✅ Fetched ${ragResults.length} RAG results`);
  
  const ragContext = ragResults
    .map((r: any, i: number) => 
      `[${i + 1}] ${r.regulation}: ${r.content.substring(0, 400)}`
    )
    .join('\n\n');

  // STEP 2: GPT-5 Mini with tool calling
  if (onProgress) await onProgress(40, 'Installation Method: Generating comprehensive installation guide...');
  
  const userPrompt = `Project: ${projectDetails.jobTitle || 'Electrical Installation'}
Location: ${projectDetails.location || 'Site'}
Installation Type: ${projectDetails.workType || query}

Generate a comprehensive, professional installation method statement suitable for PDF export. Include:
1. Detailed step-by-step installation procedure (10-16 steps)
2. Personnel assignments for each step
3. Complete scope of work with deliverables and exclusions
4. Schedule details (working hours, team size, dependencies)
5. All required testing procedures with BS 7671 compliance

Query: ${query}

RAG Context (cite regulation numbers):
${ragContext}`;

  console.log('🤖 Calling GPT-5 Mini with installation method tool...');
  const response = await callOpenAI(
    [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userPrompt }
    ],
    'gpt-5-mini',
    [INSTALLATION_METHOD_TOOL],
    { type: 'function', function: { name: 'provide_installation_method_guidance' } }
  );

  if (!response.toolCalls || response.toolCalls.length === 0) {
    throw new Error('GPT-5 Mini did not return installation method tool call');
  }

  const methodData = JSON.parse(response.toolCalls[0].function.arguments);
  console.log('✅ Installation method generated successfully');
  
  if (onProgress) await onProgress(100, 'Installation Method: Complete!');
  
  const duration = Date.now() - startTime;
  console.log(`⏱️ Installation Method Agent completed in ${duration}ms`);

  return {
    steps: methodData.installationSteps || [],
    toolsRequired: methodData.toolsRequired || [],
    testingProcedures: methodData.testingProcedures || [],
    scopeOfWork: methodData.scopeOfWork,
    scheduleDetails: methodData.scheduleDetails,
    ragCitations: ragResults.map((r: any) => ({
      regulation: r.regulation,
      content: r.content,
      source: r.source
    }))
  };
}
