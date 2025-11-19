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
    description: 'Generate comprehensive installation method statement for professional PDF documentation',
    parameters: {
      type: 'object',
      properties: {
        executiveSummary: {
          type: 'object',
          properties: {
            cableType: { type: 'string' },
            cableSize: { type: 'string' },
            runLength: { type: 'string' },
            installationMethod: { type: 'string' },
            supplyType: { type: 'string' },
            protectiveDevice: { type: 'string' },
            voltageDrop: { type: 'string' },
            zsRequirement: { type: 'string' },
            purpose: { type: 'string' }
          },
          required: ['purpose']
        },
        materialsList: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              description: { type: 'string' },
              specification: { type: 'string' },
              quantity: { type: 'string' },
              unit: { type: 'string' },
              notes: { type: 'string' }
            },
            required: ['description', 'quantity', 'unit']
          }
        },
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
              bsReferences: { type: 'array', items: { type: 'string' } },
              assignedPersonnel: { type: 'array', items: { type: 'string' } }
            },
            required: ['step', 'title', 'description', 'tools', 'estimatedTime', 'bsReferences']
          }
        },
        toolsRequired: {
          type: 'array',
          items: { type: 'string' }
        },
        testingRequirements: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              description: { type: 'string' },
              regulation: { type: 'string' },
              expectedReading: { type: 'string' },
              passRange: { type: 'string' }
            },
            required: ['description', 'regulation', 'expectedReading', 'passRange']
          }
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
        regulatoryReferences: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              number: { type: 'string' },
              description: { type: 'string' }
            },
            required: ['number', 'description']
          }
        },
        scopeOfWork: {
          type: 'object',
          properties: {
            description: { type: 'string' },
            keyDeliverables: { type: 'array', items: { type: 'string' } },
            exclusions: { type: 'string' }
          }
        },
        scheduleDetails: {
          type: 'object',
          properties: {
            workingHours: { type: 'string' },
            teamSize: { type: 'string' },
            weatherDependency: { type: 'string' },
            accessRequirements: { type: 'string' }
          }
        }
      },
      required: ['executiveSummary', 'materialsList', 'installationSteps', 'toolsRequired', 'testingRequirements', 'testingProcedures', 'regulatoryReferences']
    }
  }
};

const SYSTEM_PROMPT = `You are a UK Electrical Installation Expert (BS 7671 18th Edition) creating PROFESSIONAL INSTALLATION METHOD STATEMENTS for client-facing PDF documentation.

CRITICAL REQUIREMENTS:
1. Use UK English ONLY (authorised, whilst, metres, earth not ground)
2. Follow BS 7671:2018+A2:2022 regulations PRECISELY
3. Reference IET Guidance Note 3 (Inspection & Testing)
4. Use PROFESSIONAL, CLIENT-FACING language (not conversational)
5. Include SPECIFIC measurements, cable sizes, test values, calculations
6. Provide EXACT tools and materials with quantities and units
7. Cite BS 7671 regulation numbers for EVERY step (e.g., "514.1.1", "522.6.101")
8. Calculate voltage drop and Zs requirements where applicable
9. Assign personnel roles (e.g., "Lead Electrician", "Apprentice", "Site Manager")

EXECUTIVE SUMMARY REQUIREMENTS:
- Cable type with full specification (e.g., "2.5mm² Twin & Earth PVC/PVC Cable 6242Y")
- Installation method with BS 7671 reference (e.g., "Clipped direct, Method C (Table 4D5)")
- Supply details (e.g., "230V Single Phase TN-C-S")
- Protective device specification (e.g., "32A Type B MCB to BS EN 60898")
- Voltage drop calculation with pass/fail (e.g., "2.8V (1.2%) - Pass")
- Zs requirement (e.g., "Max 1.37Ω per BS 7671 Table 41.3")
- Purpose: One professional sentence describing the installation objective

MATERIALS LIST REQUIREMENTS:
- Description (professional terminology)
- Specification (manufacturer codes, standards)
- Quantity (numeric value)
- Unit (metres, items, boxes, rolls)
- Notes (wastage allowances, storage requirements)

RAG DATA EXTRACTION RULES:
- ALWAYS extract tools from RAG context labeled "TOOLS:"
- ALWAYS extract materials from RAG context labeled "MATERIALS:"
- When RAG lists specific equipment (e.g., "insulated screwdriver set"), use EXACT terminology
- Combine tools from multiple RAG entries for comprehensive coverage
- Supplement RAG tools with additional items needed for completeness (aim for 4+ per step)
- Cite BS 7671 references shown in RAG data under "BS 7671:"
- Use cable sizes and power ratings from RAG when calculating specifications

INSTALLATION STEPS FORMAT (10-16 steps):
- Each step must include:
  * Step number and professional title
  * Description: 2-3 professional sentences (client-facing language)
  * Tools: EXTRACT from RAG "TOOLS:" sections first, then supplement with additional items (4+ per step minimum)
  * Materials: Items used in THIS step specifically (from RAG "MATERIALS:" sections)
  * Safety notes: Step-specific controls (not generic site rules)
  * Linked hazards: Hazards for THIS specific step
  * BS 7671 references: Cite ALL applicable regulations (e.g., ["514.1.1", "522.6.101"])
  * Estimated duration: Realistic time (e.g., "45 minutes", "2 hours")
  * Personnel: Who performs this step

- Full workflow must cover:
  * Site preparation & safety setup (isolation, signage, barriers)
  * Isolation procedures & dead testing
  * Cable installation & routing (containment, support, protection)
  * Termination & connections (stripping, crimping, torque settings)
  * Bonding & earthing verification
  * Testing & commissioning (continuity, insulation, polarity, RCD, earth fault loop)
  * Final inspection & snagging

TESTING REQUIREMENTS (BS 7671 Part 6):
- Description: Professional test name
- Regulation: Specific BS 7671 Part 6 reference
- Expected reading: Numeric value with unit
- Pass range: Clear pass/fail criteria
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

EXAMPLE STEP (use as template for tool/material extraction):
{
  "step": 1,
  "title": "Site preparation and safety setup",
  "description": "Establish safe working area, erect barriers and signage, and confirm consumer unit isolation procedure with responsible person. Conduct a site-specific risk assessment and record before commencement.",
  "tools": [
    "Insulated screwdriver set",
    "Torque screwdriver (2-10Nm)",
    "Voltage tester (Fluke T6-600 or equivalent)",
    "Personal lockout kit",
    "Digital camera for documentation"
  ],
  "materials": [
    "Barrier tape (red/white)",
    "Warning signs ('Danger: Electricians at Work')",
    "Personal locks and tags",
    "Site risk assessment forms"
  ],
  "safetyNotes": [
    "Confirm isolation before proceeding",
    "Test for dead using voltage tester",
    "Apply personal lockout to consumer unit"
  ],
  "linkedHazards": [
    "Electric shock from live conductors",
    "Unauthorised re-energisation during work"
  ],
  "qualifications": ["18th Edition qualified"],
  "estimatedTime": 30,
  "bsReferences": ["514.1.1", "537.2.1.1"],
  "assignedPersonnel": ["Lead Electrician"]
}

CRITICAL: Every step must follow this structure with 4+ tools extracted from RAG "TOOLS:" sections.

Use the RAG context to ensure technical accuracy and regulatory compliance.`;

/**
 * Wrapper for OpenAI calls with 3-minute timeout
 * Installation Specialist-only timeout protection
 */
async function callOpenAIWithTimeout(params: any): Promise<any> {
  const TIMEOUT_MS = 180000; // 3 minutes
  
  return Promise.race([
    callOpenAI(params),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('OpenAI call timed out after 3 minutes')), TIMEOUT_MS)
    )
  ]);
}

export async function generateInstallationMethod(
  query: string,
  projectDetails: any,
  onProgress?: (progress: number, step: string) => void,
  sharedRegulations?: any[]
): Promise<any> {
  console.log('🔧 Installation Method Agent starting...');
  const startTime = Date.now();
  
  if (onProgress) onProgress(0, 'Installation Method: Starting...');
  
  // STEP 1: RAG - Use shared regulations if provided, otherwise search
  console.log('🔍 Fetching RAG knowledge...');
  if (onProgress) onProgress(10, 'Installation Method: Searching installation procedures...');
  
  console.log('🔍 Fetching installation method RAG data...');
  
  const ragResults = sharedRegulations || await Promise.all([
    searchPracticalWorkIntelligence(query),
    searchBS7671Intelligence(query),
    searchRegulationsIntelligence(query)
  ]).then(results => results.flat())
    .catch(error => {
      console.error('❌ RAG search failed:', error);
      // Return minimal fallback data to prevent total failure
      return [
        { 
          regulation_number: '134.1.1', 
          content: 'Good workmanship and proper materials shall be used in electrical installations.', 
          source: 'fallback' 
        },
        {
          regulation_number: '411.3.1.1',
          content: 'Automatic disconnection of supply shall be provided for protection against electric shock.',
          source: 'fallback'
        }
      ];
    });
  
  // Validate we have at least some data
  if (ragResults.length === 0) {
    throw new Error('RAG search returned no results - cannot generate accurate method statement');
  }
  
  console.log(`✅ Fetched ${ragResults.length} RAG results for installation method agent`);
  
  // Enhanced debugging - RAG breakdown
  const practicalWorkCount = ragResults.filter((r: any) => 
    r.source === 'practical_work_intelligence' || r.hybrid_score
  ).length;
  const bs7671Count = ragResults.filter((r: any) => 
    r.regulation_number && r.source !== 'fallback'
  ).length;
  
  console.log('📊 RAG Breakdown:', {
    total: ragResults.length,
    practicalWork: practicalWorkCount,
    bs7671: bs7671Count,
    sampleFields: ragResults[0] ? Object.keys(ragResults[0]) : []
  });
  
  // Debug: Log sample RAG result to verify field names
  if (ragResults.length > 0) {
    console.log('📊 Sample RAG result fields:', Object.keys(ragResults[0]));
    console.log('📊 Sample practical work:', ragResults.find((r: any) => r.source === 'practical_work_intelligence'));
    console.log('📊 Sample regulation:', ragResults.find((r: any) => r.regulation_number));
  }
  
  const ragContext = ragResults
    .map((r: any, i: number) => {
      const regNumber = r.regulation_number || r.regulation || r.topic || 'N/A';
      const contentText = r.content || r.primary_topic || r.description || '';
      
      // Build rich context with all available fields
      let context = `[${i + 1}] ${regNumber}: ${contentText.substring(0, 300)}`;
      
      // Add tools if available (from practical_work_intelligence)
      if (r.tools_required && r.tools_required.length > 0) {
        context += `\n   TOOLS: ${r.tools_required.join(', ')}`;
      }
      
      // Add materials if available
      if (r.materials_needed && r.materials_needed.length > 0) {
        context += `\n   MATERIALS: ${r.materials_needed.join(', ')}`;
      }
      
      // Add equipment category for context
      if (r.equipment_category) {
        context += `\n   CATEGORY: ${r.equipment_category}`;
      }
      
      // Add cable sizes if relevant
      if (r.cable_sizes && r.cable_sizes.length > 0) {
        context += `\n   CABLE SIZES: ${r.cable_sizes.join(', ')}`;
      }
      
      // Add power ratings if relevant
      if (r.power_ratings && r.power_ratings.length > 0) {
        context += `\n   POWER RATINGS: ${r.power_ratings.join(', ')}`;
      }
      
      // Add BS 7671 regulations if available
      if (r.bs7671_regulations && r.bs7671_regulations.length > 0) {
        context += `\n   BS 7671: ${r.bs7671_regulations.join(', ')}`;
      }
      
      return context;
    })
    .join('\n\n');

  // STEP 2: GPT-5 Mini with tool calling
  if (onProgress) onProgress(40, 'Installation Method: Generating comprehensive installation guide...');
  
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
  const response = await callOpenAIWithTimeout({
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userPrompt }
    ],
    model: 'gpt-5-mini-2025-08-07',
    tools: [INSTALLATION_METHOD_TOOL],
    tool_choice: { type: 'function', function: { name: 'provide_installation_method_guidance' } }
  });

  if (!response.toolCalls || response.toolCalls.length === 0) {
    throw new Error('GPT-5 Mini did not return installation method tool call');
  }

  const methodData = JSON.parse(response.toolCalls[0].function.arguments);

  // Validation: Check if steps have tools
  const stepsWithoutTools = methodData.installationSteps?.filter((s: any) => 
    !s.tools || s.tools.length < 3
  ) || [];

  if (stepsWithoutTools.length > 0) {
    console.warn(`⚠️ ${stepsWithoutTools.length} steps missing sufficient tools - AI may not have extracted RAG data properly`);
    console.warn('Steps needing attention:', stepsWithoutTools.map((s: any) => `Step ${s.step}: ${s.title}`));
  }
  console.log('✅ Installation method generated successfully');
  
  if (onProgress) onProgress(100, 'Installation Method: Complete!');
  
  const duration = Date.now() - startTime;
  console.log(`⏱️ Installation Method Agent completed in ${duration}ms`);

  // Helper: Extract practical tips from steps
  const extractPracticalTipsFromSteps = (steps: any[]): string[] => {
    const tips = new Set<string>();
    steps?.forEach(s => {
      (s.safetyNotes || []).forEach((note: string) => tips.add(note));
    });
    const uniqueTips = Array.from(tips).slice(0, 5);
    return uniqueTips.length > 0 ? uniqueTips : [
      'Always verify isolation before commencing work',
      'Use proper cable management and support spacing',
      'Document all test results immediately',
      'Maintain clean working area throughout installation'
    ];
  };
  
  // Helper: Extract common mistakes
  const extractCommonMistakesFromSteps = (steps: any[]): string[] => {
    return [
      'Insufficient cable support spacing',
      'Incorrect termination torque settings',
      'Missing or incomplete test documentation',
      'Poor cable routing in containment'
    ];
  };
  
  // Return complete installation method data
  return {
    executiveSummary: methodData.executiveSummary,
    materialsList: methodData.materialsList || [],
    steps: methodData.installationSteps || [],
    toolsRequired: methodData.toolsRequired || [],
    testingRequirements: methodData.testingRequirements || [],
    testingProcedures: methodData.testingProcedures || [],
    regulatoryReferences: methodData.regulatoryReferences || [],
    scopeOfWork: methodData.scopeOfWork,
    scheduleDetails: methodData.scheduleDetails,
    practicalTips: extractPracticalTipsFromSteps(methodData.installationSteps),
    commonMistakes: extractCommonMistakesFromSteps(methodData.installationSteps),
    ragCitations: ragResults
      .map((r: any) => ({
        regulation: r.regulation_number || r.regulation || r.topic || null,
        content: r.content || r.primary_topic || r.description || '',
        source: r.source || 'practical_work_intelligence'
      }))
      .filter(c => c.regulation !== null && c.content.length > 0)
  };
}
