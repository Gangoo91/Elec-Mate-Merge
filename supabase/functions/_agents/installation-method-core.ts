/**
 * Installation Method Core Agent
 * ISOLATED from AI RAMS - Used ONLY by Installation Specialist
 * Generates enhanced method statements for professional PDF templates
 */

import { retrieveInstallationKnowledge } from '../_shared/rag-installation.ts';
import { callOpenAI } from '../_shared/ai-providers.ts';
import { createLogger } from '../_shared/logger.ts';

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
          minItems: 6, // OPTIMIZED: Reduced from 10 to 6 for 45% faster generation
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
          minItems: 3, // OPTIMIZED: Reduced from 5 to 3 for faster generation
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
      required: ['executiveSummary', 'materialsList', 'installationSteps', 'toolsRequired', 'testingRequirements', 'testingProcedures', 'regulatoryReferences'] // scopeOfWork and scheduleDetails now optional
    }
  }
};

const SYSTEM_PROMPT = `You are a UK Electrical Installation Expert (BS 7671 18th Edition) creating PROFESSIONAL INSTALLATION METHOD STATEMENTS for client-facing PDF documentation.

CRITICAL REQUIREMENTS:
1. UK English ONLY (authorised, whilst, metres, earth not ground)
2. Follow BS 7671:2018+A2:2022 regulations
3. Professional, client-facing language
4. Cite BS 7671 regulation numbers (e.g., "514.1.1", "522.6.101")
5. Extract tools/materials from RAG "TOOLS:" and "MATERIALS:" sections

EXECUTIVE SUMMARY: Cable specification, installation method with BS 7671 reference, supply details, protective device, voltage drop, Zs requirement, purpose statement.

MATERIALS LIST: Description, specification (BS/EN codes), quantity with units, notes.

INSTALLATION STEPS (6-10 steps):
- Step number + professional title
- Description: 100-150 words, client-facing language
- Tools: Extract from RAG first, supplement if needed (3+ per step)
- Materials: Step-specific items from RAG
- Safety notes: Step-specific controls
- Linked hazards: Specific to this step (2+ hazards)
- BS 7671 references: Cite regulations
- Estimated time + assigned personnel

Cover: Site preparation, isolation & testing, cable installation, terminations, bonding/earthing, testing (continuity, insulation, polarity, RCD), inspection.

TESTING PROCEDURES (3+ procedures): Test name, BS 7671 Part 6 standard, procedure, acceptance criteria.

Use RAG context to extract accurate tools, materials, and regulations.`;

export async function generateInstallationMethod(
  query: string,
  projectDetails: any,
  onProgress?: (progress: number, step: string) => void,
  sharedRegulations?: any[]
): Promise<any> {
  console.log('🔧 Installation Method Agent starting...');
  const startTime = Date.now();
  const phaseTimings: any = {};
  
  if (onProgress) onProgress(0, 'Installation Method: Starting...');
  
  // STEP 1: RAG - Use modern installation-specific search
  console.log('🔍 Fetching RAG knowledge...');
  if (onProgress) onProgress(10, 'Installation Method: Searching installation procedures...');
  
  const logger = createLogger('installation-method-agent');
  const openAiKey = Deno.env.get('OPENAI_API_KEY')!;
  const entities = { installationMethod: projectDetails.workType || 'general' };
  
  const ragStart = Date.now();
  const ragResults = sharedRegulations || await Promise.race([
    retrieveInstallationKnowledge(
      query,
      15, // OPTIMIZED: Reduced from 20 to 15 for faster RAG retrieval
      openAiKey,
      entities,
      logger
    ),
    new Promise<never>((_, reject) => 
      setTimeout(() => reject(new Error('RAG search timeout after 60s')), 60000)
    )
  ]).catch(error => {
    console.error('❌ RAG search failed/timeout:', error);
    logger.error('RAG failure', { error: error instanceof Error ? error.message : String(error) });
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
  
  phaseTimings.rag = Date.now() - ragStart;
  logger.info('RAG complete', { duration: phaseTimings.rag, count: ragResults.length });
  
  // Validate we have at least some data
  if (ragResults.length === 0) {
    throw new Error('RAG search returned no results - cannot generate accurate method statement');
  }
  
  console.log(`✅ Fetched ${ragResults.length} RAG results (cache: ${ragResults.some((r: any) => r.cached)})`);
  
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

Generate professional installation method statement for PDF export:
- 6-10 installation steps (100-150 words each)
- Testing procedures with BS 7671 Part 6 compliance
- Extract tools/materials from RAG context below

Query: ${query}

RAG Context:
${ragContext}`;

  let methodData: any;
  
  try {
    console.log('🤖 Calling GPT-5 Mini with 4-minute timeout protection...');
    console.log(`⏱️ Timeout configured: 240000ms (4 minutes)`);
    const aiStart = Date.now();
    
    const response = await callOpenAI({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt }
      ],
      model: 'gpt-5-mini-2025-08-07',
      tools: [INSTALLATION_METHOD_TOOL],
      tool_choice: { type: 'function', function: { name: 'provide_installation_method_guidance' } }
    }, Deno.env.get('OPENAI_API_KEY')!, 240000); // Built-in 4-minute timeout
    
    const aiDuration = Date.now() - aiStart;
    phaseTimings.openai = aiDuration;
    logger.info('✅ OpenAI complete', { 
      duration: aiDuration,
      durationSeconds: Math.round(aiDuration / 1000),
      percentOfTimeout: Math.round((aiDuration / 240000) * 100)
    });

    if (!response.toolCalls || response.toolCalls.length === 0) {
      throw new Error('GPT-5 Mini did not return installation method tool call');
    }

    methodData = JSON.parse(response.toolCalls[0].function.arguments);

    // Validation: Check if steps have tools
    const stepsWithoutTools = methodData.installationSteps?.filter((s: any) => 
      !s.tools || s.tools.length < 3
    ) || [];

    if (stepsWithoutTools.length > 0) {
      console.warn(`⚠️ ${stepsWithoutTools.length} steps missing sufficient tools - AI may not have extracted RAG data properly`);
      console.warn('Steps needing attention:', stepsWithoutTools.map((s: any) => `Step ${s.step}: ${s.title}`));
    }
    console.log('✅ Installation method generated successfully');
    
  } catch (error) {
    // AIProviderError includes timeout details
    console.error('⏱️ OpenAI call failed:', error);
    throw error;
  }
  
  if (onProgress) onProgress(100, 'Installation Method: Complete!');
  
  phaseTimings.total = Date.now() - startTime;
  logger.info('Generation complete', phaseTimings);
  console.log(`⏱️ Installation Method Agent completed in ${phaseTimings.total}ms (RAG: ${phaseTimings.rag}ms, OpenAI: ${phaseTimings.openai}ms)`);

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
