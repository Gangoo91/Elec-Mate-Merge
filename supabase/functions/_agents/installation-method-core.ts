/**
 * Installation Method Core Agent
 * ISOLATED from AI RAMS - Used ONLY by Installation Specialist
 * Generates enhanced method statements for professional PDF templates
 * 
 * NOTE: This file exports TWO functions:
 * 1. generateInstallationMethod - Used by standalone installation-method-agent (existing)
 * 2. generateInstallationMethods - Used by new circuit-design-v2 unified function (new)
 */

import { searchInstallationMethodRAG } from './installation-method-rag.ts';
import { callOpenAI } from '../_shared/ai-providers.ts';
import { createLogger } from '../_shared/logger.ts';

/**
 * Extract rich keywords from job inputs for fast intelligence search
 */
function extractInstallationKeywords(jobInputs: any): string[] {
  const keywords = new Set<string>();
  
  // Project type keywords
  if (jobInputs.projectInfo?.workType) {
    const workType = jobInputs.projectInfo.workType.toLowerCase();
    keywords.add(workType);
    
    // Add synonyms
    if (workType.includes('domestic')) {
      keywords.add('residential');
      keywords.add('dwelling');
    }
    if (workType.includes('commercial')) {
      keywords.add('business');
      keywords.add('office');
    }
  }
  
  // Circuit-specific keywords
  if (jobInputs.circuits && Array.isArray(jobInputs.circuits)) {
    jobInputs.circuits.forEach((circuit: any) => {
      if (circuit.loadType) {
        const loadType = circuit.loadType.toLowerCase();
        keywords.add(loadType);
        
        // Extract circuit type keywords
        if (loadType.includes('socket')) keywords.add('socket circuits');
        if (loadType.includes('light')) keywords.add('lighting circuits');
        if (loadType.includes('shower')) keywords.add('shower circuits');
        if (loadType.includes('cooker')) keywords.add('cooker circuits');
        if (loadType.includes('motor')) keywords.add('motor circuits');
      }
      
      if (circuit.cableSize) {
        keywords.add(`${circuit.cableSize}mm cable`);
      }
      
      if (circuit.description) {
        const desc = circuit.description.toLowerCase();
        if (desc.includes('ring')) keywords.add('ring final circuit');
        if (desc.includes('radial')) keywords.add('radial circuit');
      }
    });
  }
  
  // Supply system keywords
  if (jobInputs.supply) {
    if (jobInputs.supply.earthingSystem) {
      keywords.add(jobInputs.supply.earthingSystem);
    }
    if (jobInputs.supply.phases) {
      keywords.add(`${jobInputs.supply.phases} phase`);
    }
  }
  
  // Generic installation keywords
  keywords.add('installation method');
  keywords.add('cable installation');
  keywords.add('testing');
  keywords.add('inspection');
  keywords.add('certification');
  
  return Array.from(keywords);
}

// Simplified schema for Circuit Designer integration (flexible quality-focused)
const INSTALLATION_METHOD_TOOL_SIMPLIFIED = {
  type: 'function' as const,
  function: {
    name: 'provide_installation_guidance',
    description: 'Generate installation and testing guidance for circuit design documentation',
    parameters: {
      type: 'object',
      properties: {
        installationGuidance: {
          type: 'object',
          properties: {
            safetyConsiderations: {
              type: 'array',
              items: { type: 'string' },
              description: 'Key safety points - scale with installation complexity',
              minItems: 4  // At least 4, but can expand to 10+ for complex work
            },
            fixingsAndSupport: {
              type: 'array',
              items: { type: 'string' },
              description: 'Cable support and fixing requirements - comprehensive coverage',
              minItems: 3  // At least 3, can expand to 8+ for complex routing
            },
            cableRouting: {
              type: 'array',
              items: { type: 'string' },
              description: 'Cable routing guidance - thorough and well-considered',
              minItems: 4  // At least 4, can expand to 10+ for complex routes
            },
            termination: {
              type: 'array',
              items: { type: 'string' },
              description: 'Termination requirements - complete and detailed',
              minItems: 3  // At least 3, can expand to 8+ for complex terminations
            }
          },
          required: ['safetyConsiderations', 'fixingsAndSupport', 'cableRouting', 'termination']
        },
        testingRequirements: {
          type: 'object',
          properties: {
            intro: {
              type: 'string',
              description: 'Professional introduction to testing requirements'
            },
            tests: {
              type: 'array',
              items: { type: 'string' },
              description: 'Required tests - comprehensive coverage of BS 7671 Part 6',
              minItems: 6  // At least 6 core tests, can expand to 12+ for complex circuits
            },
            recordingNote: {
              type: 'string',
              description: 'Note about recording requirements (EIC/Schedule of Test Results reference)'
            }
          },
          required: ['intro', 'tests', 'recordingNote']
        }
      },
      required: ['installationGuidance', 'testingRequirements']
    }
  }
};

// Full schema for standalone Installation Specialist (comprehensive RAMS)
const INSTALLATION_METHOD_TOOL_FULL = {
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
          minItems: 12, // Minimum 12 steps, scale up to 15 based on work complexity
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
2. Follow BS 7671:2018+A3:2024 regulations
3. Professional, client-facing language
4. Cite BS 7671 regulation numbers (e.g., "514.1.1", "522.6.101")
5. Extract tools/materials from RAG "TOOLS:" and "MATERIALS:" sections

EXECUTIVE SUMMARY: Cable specification, installation method with BS 7671 reference, supply details, protective device, voltage drop, Zs requirement, purpose statement.

MATERIALS LIST: Description, specification (BS/EN codes), quantity with units, notes.

INSTALLATION STEPS (12-15 steps - scale based on work complexity):
- Simple installations (domestic socket): 12 steps
- Medium complexity (sub-main, motor): 13-14 steps
- Complex installations (3-phase, multiple zones): 15 steps

For each step:
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

const SYSTEM_PROMPT_SIMPLIFIED = `You are an Installation Guidance Specialist providing comprehensive, well-thought-out installation and testing guidance for electrical circuit design documentation.

CRITICAL REQUIREMENTS:
1. UK English ONLY
2. Follow BS 7671:2018+A3:2024 strictly
3. Professional, thorough, and detailed language
4. Scale guidance based on installation complexity - don't artificially limit yourself
5. Demonstrate expertise through comprehensive coverage

INSTALLATION GUIDANCE (4 subsections - be thorough):

1. SAFETY CONSIDERATIONS (minimum 4, expand as needed):
   - Isolation and proving dead procedures
   - Safe isolation to GS38 standards
   - Circuit-specific safety requirements
   - Polarity verification
   - Working at height considerations (if applicable)
   - Confined space requirements (if applicable)
   - Hot work procedures (if applicable)
   - Additional hazard-specific controls

2. FIXINGS & SUPPORT (minimum 3, expand as needed):
   - Cable support intervals per BS 7671 Table 4A2/4A3
   - Appropriate clips/cleats/trunking for installation method
   - Support distance from terminations
   - Manufacturer recommendations for cable type
   - Special considerations (fire barriers, thermal insulation, etc.)
   - Expansion joints (if required)
   - Mechanical protection requirements

3. CABLE ROUTING (minimum 4, expand as needed):
   - BS 7671 Reg 522 compliance (mechanical protection)
   - Minimum bending radii for cable type
   - Phase grouping requirements (if 3-phase)
   - Separation from other services
   - Protection zones and safe zones
   - Cable segregation (power vs data)
   - Fire barrier penetrations
   - Thermal insulation considerations
   - Voltage band segregation

4. TERMINATION (minimum 3, expand as needed):
   - Cable preparation and stripping
   - Cable glands/grommets requirements
   - CPC continuity and bonding
   - Phase sequence (if 3-phase: Brown-Black-Grey, L1-L2-L3)
   - Torque settings for terminations
   - Circuit labelling to BS 7671 Reg 514
   - Neutral and earth bar allocation
   - Cable identification and marking

TESTING REQUIREMENTS (minimum 6 tests, expand as needed):

Intro: Reference BS 7671 Part 6 (Chapter 64) and the correct testing sequence.

Tests (scale based on circuit complexity):
- Continuity of protective conductors (R1+R2 or R2)
- Continuity of ring final circuit conductors (if applicable)
- Insulation resistance (minimum 1MΩ at 500V DC for LV circuits)
- Polarity verification
- Earth fault loop impedance (Zs) - reference max Zs from circuit design
- Phase sequence (if 3-phase) - confirm correct rotation
- RCD operation and tripping times (if applicable) - test at 1× and 5× IΔn
- Functional testing of all equipment
- Voltage measurement under load (if specified)
- Prospective fault current (if specified)
- Additional circuit-specific tests

Recording note: All test results must be recorded on the Electrical Installation Certificate (EIC) and Schedule of Test Results in accordance with BS 7671:2018+A3:2024 Appendix 6.

Extract relevant details from RAG context and circuit specifications. Be comprehensive and demonstrate professional expertise.`;

export async function generateInstallationMethod(
  query: string,
  projectDetails: any,
  onProgress?: (progress: number, step: string) => void,
  sharedRegulations?: any[],
  mode: 'full' | 'simplified' = 'full'  // NEW: Mode parameter for schema selection
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
  // Build job inputs for RAG search (mirrors AI RAMS pattern)
  const jobInputs = {
    circuits: [{ loadType: projectDetails.workType || 'general', description: query }],
    supply: {},
    projectInfo: projectDetails
  };
  
  // RAG progress callback
  const ragProgressCallback = onProgress 
    ? (msg: string) => onProgress(25, `Installation Method: ${msg}`)
    : undefined;
  
  // STEP 1: RAG SEARCH (ULTRA-FAST INTELLIGENCE APPROACH)
  const ragStart = Date.now();
  logger.info('Starting installation method RAG search (fast intelligence)');
  
  let ragResults: any[] = [];
  
  try {
    // Build rich keyword list from jobInputs
    const keywords = extractInstallationKeywords(jobInputs);
    const workType = jobInputs.projectInfo?.workType || 'general installation';
    const circuitTypes = jobInputs.circuits?.map((c: any) => c.loadType).filter(Boolean) || [];
    
    logger.info('Extracted keywords for RAG', {
      keywords: keywords.slice(0, 10),
      workType,
      circuitCount: circuitTypes.length
    });
    
    // Use shared regulations if provided AND non-empty
    if (Array.isArray(sharedRegulations) && sharedRegulations.length > 0) {
      logger.info(`Using ${sharedRegulations.length} shared regulations from circuit designer`);
      ragResults = sharedRegulations;
    } else {
      // Run fast intelligence RAG search
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2.49.4');
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      const ragResult = await searchInstallationMethodRAG(
        supabase,
        keywords,
        workType,
        circuitTypes,
        15 // limit
      );
      
      // Combine regulations + practical work
      ragResults = [
        ...ragResult.regulations.map((r: any) => ({
          content: r.primary_topic || r.regulation_number,
          regulation_number: r.regulation_number,
          keywords: r.keywords,
          applies_to: r.applies_to,
          source: 'regulations_intelligence'
        })),
        ...ragResult.practicalWork.map((pw: any) => ({
          content: pw.content,
          primary_topic: pw.primary_topic,
          tools_required: pw.tools_required,
          bs7671_regulations: pw.bs7671_regulations,
          equipment_category: pw.equipment_category,
          cable_sizes: pw.cable_sizes,
          power_ratings: pw.power_ratings,
          source: 'practical_work_intelligence'
        }))
      ];
      
      logger.info(`✅ RAG complete: ${ragResults.length} results (${ragResult.searchTimeMs}ms, quality: ${ragResult.qualityScore.toFixed(1)})`);
    }
    
    // Minimal fallback if STILL empty
    if (ragResults.length === 0) {
      logger.error('🚨 CRITICAL: RAG returned 0 results even after fast intelligence search', {
        keywords: keywords.slice(0, 10),
        workType,
        circuitTypes: circuitTypes.slice(0, 3)
      });
      
      // Apply minimal core regulations fallback
      ragResults = [
        {
          content: 'Good workmanship and proper materials',
          regulation_number: '134.1.1',
          source: 'fallback'
        },
        {
          content: 'Automatic disconnection of supply (ADS) for shock protection',
          regulation_number: '411.3.1.1',
          source: 'fallback'
        }
      ];
      
      logger.warn('⚠️ Using minimal BS 7671 fallback regulations');
    }
    
  } catch (error) {
    logger.error('RAG search failed', { 
      error: error instanceof Error ? error.message : String(error) 
    });
    
    // Minimal fallback on error
    ragResults = [
      {
        content: 'Good workmanship and proper materials',
        regulation_number: '134.1.1',
        source: 'fallback'
      },
      {
        content: 'Automatic disconnection of supply (ADS) for shock protection',
        regulation_number: '411.3.1.1',
        source: 'fallback'
      }
    ];
  }
  
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
  // Select schema and prompt based on mode
  const toolSchema = mode === 'simplified' ? INSTALLATION_METHOD_TOOL_SIMPLIFIED : INSTALLATION_METHOD_TOOL_FULL;
  const systemPrompt = mode === 'simplified' ? SYSTEM_PROMPT_SIMPLIFIED : SYSTEM_PROMPT;
  const functionName = toolSchema.function.name;
  
  // Mode-aware progress message
  const progressMsg = mode === 'simplified' 
    ? 'Installation Method: Generating installation guidance...'
    : 'Installation Method: Generating comprehensive installation guide...';
  if (onProgress) onProgress(40, progressMsg);
  
  const userPrompt = `Project: ${projectDetails.jobTitle || 'Electrical Installation'}
Location: ${projectDetails.location || 'Site'}
Installation Type: ${projectDetails.workType || query}

${mode === 'simplified' 
  ? 'Generate installation and testing guidance for circuit design documentation.'
  : 'Generate professional installation method statement for PDF export:\n- 6-10 installation steps (100-150 words each)\n- Testing procedures with BS 7671 Part 6 compliance\n- Extract tools/materials from RAG context below'
}

Query: ${query}

RAG Context:
${ragContext}`;

  let methodData: any;
  
  try {
    const timeoutMs = mode === 'simplified' ? 180000 : 300000; // 3 minutes for simplified, 5 for full
    console.log(`🤖 Calling GPT-5 Mini in ${mode} mode with ${timeoutMs}ms timeout...`);
    const aiStart = Date.now();
    
    // Heartbeat during AI call to show progress
    const aiHeartbeat = setInterval(async () => {
      if (onProgress) {
        const elapsed = Math.floor((Date.now() - aiStart) / 1000);
        await onProgress(Math.min(95, 47 + elapsed), `Installer: Generating ${mode === 'simplified' ? 'guidance' : 'method statement'} (${elapsed}s elapsed)...`);
      }
    }, 10000); // Every 10 seconds
    
    const response = await callOpenAI({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      model: 'gpt-5-mini-2025-08-07',
      tools: [toolSchema],
      tool_choice: { type: 'function', function: { name: functionName } }
    }, Deno.env.get('OPENAI_API_KEY')!, timeoutMs)
    
    // Clear heartbeat
    clearInterval(aiHeartbeat);
    
    const aiDuration = Date.now() - aiStart;
    phaseTimings.openai = aiDuration;
    // timeoutMs already defined above (line 480)
    logger.info('✅ OpenAI complete', { 
      mode,
      duration: aiDuration,
      durationSeconds: Math.round(aiDuration / 1000),
      percentOfTimeout: Math.round((aiDuration / timeoutMs) * 100)
    });

    if (!response.toolCalls || response.toolCalls.length === 0) {
      throw new Error(`GPT-5 Mini did not return ${mode} installation method tool call`);
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
  
  // Return data based on mode
  if (mode === 'simplified') {
    // Simplified mode: Return installation guidance structure for Circuit Designer
    return {
      installationGuidance: methodData.installationGuidance || {
        safetyConsiderations: [],
        fixingsAndSupport: [],
        cableRouting: [],
        termination: []
      },
      testingRequirements: methodData.testingRequirements || {
        intro: '',
        tests: [],
        recordingNote: ''
      },
      ragCitations: ragResults
        .map((r: any) => ({
          regulation: r.regulation_number || r.regulation || r.topic || null,
          content: r.content || r.primary_topic || r.description || '',
          source: r.source || 'practical_work_intelligence'
        }))
        .filter(c => c.regulation !== null && c.content.length > 0)
    };
  }
  
  // Full mode: Return complete installation method data for standalone RAMS
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

/**
 * NEW: Wrapper for circuit-design-v2 unified function
 * Accepts progress callbacks and shared RAG results
 * Mirrors the signature of designCircuits in circuit-designer-core.ts
 */
export async function generateInstallationMethods(
  jobInputs: any,
  progressCallback: (progress: number, step: string) => Promise<void>,
  sharedRegulations?: any[],
  mode: 'full' | 'simplified' = 'simplified'  // NEW: Default to simplified for Circuit Designer
): Promise<any> {
  
  console.log('🛠️ Installation Method Agent starting...');
  
  await progressCallback(10, 'Installer: Analyzing installation requirements...');
  
  // Build query from circuit parameters
  const circuits = jobInputs.circuits || [];
  const supply = jobInputs.supply || {};
  
  const query = `
    Installation method for ${circuits.length} electrical circuits
    ${supply.voltage || 230}V ${supply.phases || 'single'} phase
    Earthing: ${supply.earthingSystem || 'TN-C-S'}
    Load types: ${circuits.map((c: any) => c.loadType).join(', ')}
    Cable lengths: ${circuits.map((c: any) => `${c.cableLength}m`).join(', ')}
    Total power: ${circuits.reduce((sum: number, c: any) => sum + (c.loadPower || 0), 0)}W
  `.trim();
  
  const projectDetails = {
    jobTitle: jobInputs.projectName || 'Circuit Installation',
    location: jobInputs.location || 'Not specified',
    circuits: circuits,
    supply: supply
  };
  
  await progressCallback(30, 'Installer: Planning installation steps...');
  
  // Wrap progress callback for the inner function
  const updateProgress = async (progress: number, step: string) => {
    // Map 0-100 of inner function to 30-90 of outer function
    const mappedProgress = 30 + Math.floor(progress * 0.6);
    await progressCallback(mappedProgress, `Installer: ${step}`);
  };
  
  // Call existing generateInstallationMethod
  const result = await generateInstallationMethod(query, projectDetails, updateProgress, sharedRegulations, mode);
  
  await progressCallback(90, 'Installer: Finalizing method statement...');
  await progressCallback(100, 'Installer: Complete ✓');
  
  console.log('✅ Installation methods generated successfully');
  
  // Return proper structure based on mode
  if (mode === 'simplified') {
    return {
      installationGuidance: result.installationGuidance || {},
      testingRequirements: result.testingRequirements || {},
      ragCitations: result.ragCitations || [],
      metadata: {
        completedAt: new Date().toISOString(),
        regulationsUsed: sharedRegulations?.length || 0,
        mode: mode
      }
    };
  }
  
  // Full mode returns steps
  return {
    methods: result.steps || [],
    metadata: {
      completedAt: new Date().toISOString(),
      regulationsUsed: sharedRegulations?.length || 0,
      totalSteps: result.steps?.length || 0
    }
  };
}
