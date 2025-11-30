/**
 * Commissioning Agent Core Logic
 * Complete business logic extracted from edge function
 * Pattern: Same as cost-engineer-core.ts (static imports, own AbortController)
 */

import { enhanceQuery } from '../_shared/query-enhancer.ts';
import { retrieveCommissioningKnowledge } from '../_shared/rag-commissioning.ts';
import { createLogger } from '../_shared/logger.ts';

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

// ===== INTERFACES =====
interface CommissioningRequest {
  query: string;
  imageUrl?: string;
  projectContext?: {
    circuitType?: string;
    projectType?: 'domestic' | 'commercial' | 'industrial';
    projectName?: string;
    clientInfo?: string;
    additionalInfo?: string;
  };
}

interface CommissioningResult {
  success: boolean;
  mode: string;
  structuredData: {
    testingProcedure: {
      visualInspection: any;
      deadTests: any[];
      liveTests: any[];
    };
    certification: any;
  };
  clientCommunication?: any;
  costEstimate?: any;
  commissioningCompletionChecks?: any;
  documentationRequirements?: any;
  metadata?: any;
}

export async function generateCommissioningProcedures(
  supabase: any,
  request: CommissioningRequest
): Promise<CommissioningResult> {
  const startTime = Date.now();
  
  console.log('🔧 Commissioning Agent START', {
    query: request.query.substring(0, 100),
    hasImage: !!request.imageUrl,
    circuitType: request.projectContext?.circuitType
  });

  // STEP 1: Query Enhancement
  const enhancement = enhanceQuery(request.query || '', []);
  const effectiveQuery = enhancement.enhanced;
  console.log(`📝 Query enhanced: ${enhancement.addedContext.length} context items added`);

  // STEP 2: RAG Search
  const ragStart = Date.now();
  const logger = createLogger('commissioning-core');
  
  const enhancedQuery = request.imageUrl 
    ? `${effectiveQuery} visual inspection photo analysis electrical installation safety compliance`
    : `${effectiveQuery} testing commissioning GN3 Chapter 64 inspection procedures`;
  
  const ragResults = await retrieveCommissioningKnowledge(
    enhancedQuery,
    OPENAI_API_KEY!,
    supabase,
    logger,
    request.projectContext?.circuitType
  );
  
  const ragTime = Date.now() - ragStart;
  console.log(`⚡ RAG complete in ${ragTime}ms - ${ragResults.length} results`);

  // Build context from RAG results
  let testContext = '';
  const gn3ProceduresFound = ragResults.filter((r: any) => r.sourceType === 'practical').length;
  const regulationsFound = ragResults.filter((r: any) => r.sourceType === 'regulatory').length;

  if (ragResults.length > 0) {
    testContext = '## GN3 TESTING & INSPECTION GUIDANCE:\n\n';
    testContext += ragResults.map((item: any) => {
      const header = item.regulation_number 
        ? `**[${item.regulation_number}]**` 
        : item.topic 
          ? `**${item.topic}**` 
          : '**Testing Guidance**';
      return `${header}\n${item.content}`;
    }).join('\n\n---\n\n');
    
    console.log(`📚 RAG Quality: ${gn3ProceduresFound} procedures, ${regulationsFound} regulations`);
  } else {
    testContext = '⚠️ No specific GN3 guidance found. Use general BS 7671 Chapter 64 principles.';
    console.warn('⚠️ RAG returned zero results');
  }

  // STEP 3: Call OpenAI for commissioning procedures
  const aiStart = Date.now();
  const commissioningResult = await callCommissioningAI(
    request,
    testContext
  );
  const aiTime = Date.now() - aiStart;

  // STEP 4: Build final result
  const finalResult: CommissioningResult = {
    success: true,
    mode: 'procedure',
    structuredData: {
      testingProcedure: {
        visualInspection: {
          ...commissioningResult.visualInspection,
          safetyNotes: Array.isArray(commissioningResult.visualInspection?.safetyNotes) 
            ? commissioningResult.visualInspection.safetyNotes 
            : [],
          checkpoints: Array.isArray(commissioningResult.visualInspection?.checkpoints)
            ? commissioningResult.visualInspection.checkpoints
            : []
        },
        deadTests: (commissioningResult.deadTests || [])
          .map(transformTestProcedure)
          .filter(Boolean),
        liveTests: (commissioningResult.liveTests || [])
          .map(transformTestProcedure)
          .filter(Boolean)
      },
      certification: commissioningResult.certification
    },
    clientCommunication: commissioningResult.clientCommunication,
    costEstimate: commissioningResult.costEstimate,
    commissioningCompletionChecks: commissioningResult.commissioningCompletionChecks,
    documentationRequirements: commissioningResult.documentationRequirements,
    metadata: {
      ragQualityMetrics: {
        gn3ProceduresFound,
        regulationsFound,
        totalSources: ragResults.length
      }
    }
  };

  const totalTime = Date.now() - startTime;
  console.log(`✅ Commissioning complete in ${totalTime}ms (RAG: ${ragTime}ms, AI: ${aiTime}ms)`);

  return finalResult;
}

/**
 * Transform test procedure to ensure correct field names and array types
 */
function transformTestProcedure(test: any): any {
  if (!test) return null;
  return {
    ...test,
    // Ensure procedure is an array (rename procedureSteps if needed)
    procedure: Array.isArray(test.procedure) 
      ? test.procedure 
      : Array.isArray(test.procedureSteps) 
        ? test.procedureSteps 
        : [],
    // Ensure all other arrays are valid arrays
    troubleshooting: Array.isArray(test.troubleshooting) ? test.troubleshooting : [],
    commonMistakes: Array.isArray(test.commonMistakes) ? test.commonMistakes : [],
    proTips: Array.isArray(test.proTips) ? test.proTips : [],
    prerequisiteTests: Array.isArray(test.prerequisiteTests) ? test.prerequisiteTests : [],
    siteRealityFactors: Array.isArray(test.siteRealityFactors) ? test.siteRealityFactors : [],
    efficiencyTips: Array.isArray(test.efficiencyTips) ? test.efficiencyTips : [],
    instrumentNotes: Array.isArray(test.instrumentNotes) ? test.instrumentNotes : [],
  };
}

async function callCommissioningAI(
  request: CommissioningRequest,
  testContext: string
): Promise<any> {
  const threePhaseGuidance = `
**3-PHASE INSTALLATIONS (400V/415V BS 7671:2018+A3:2024)**:

SAFE ISOLATION (Regulation 537.2):
- Prove dead on ALL THREE PHASES individually
- Test phase-to-earth AND phase-to-phase (6 tests total: L1-N, L2-N, L3-N, L1-L2, L2-L3, L3-L1)
- Use approved voltage indicator conforming to GS38
- Lock off isolator, apply warning labels
- Verify isolation at BOTH ends if long cable run
`;

  const systemPrompt = `You are a GN3 PRACTICAL TESTING GURU - BS 7671:2018+A3:2024 Chapter 64 specialist.

Write all responses in UK English (British spelling and terminology). Do not use American spellings.

🔧 YOU ARE AN INSPECTION & TESTING SPECIALIST WITH 30 YEARS HANDS-ON EXPERIENCE

${threePhaseGuidance}

GN3 PRACTICAL TEST KNOWLEDGE (YOU MUST USE THIS DATA):
${testContext}

ENHANCED RESPONSE REQUIREMENTS FOR TESTING PROCEDURES:

**MANDATORY STRUCTURE:**
- Generate structured commissioning procedures in JSON format
- Include comprehensive visualInspection checkpoints (as many as needed for thorough inspection)
- Include detailed deadTests procedures (as many as needed with good detail)
- Include detailed liveTests procedures (as many as needed with good detail)

**ENHANCED TEST PROCEDURE REQUIREMENTS:**
Each test procedure MUST include ALL of:
- testName: Clear descriptive name
- regulation: Specific BS 7671 regulation reference
- instrumentSetup: Detailed instrument configuration (settings, ranges, UK brand models like Megger MFT1741, Fluke 1664FC, Kewtech KT65DL)
- procedure: (CRITICAL: Use field name "procedure", NOT "procedureSteps") Array of detailed step-by-step instructions (50-80 words per step)
  * Each step should include:
    - Exact lead placement (which terminals, colour coding)
    - Expected readings with units
    - What to look for (visual cues, meter readings)
    - Common mistakes to avoid
    - Time estimate for that step
- acceptanceCriteria: Clear pass/fail criteria with numeric limits
- expectedResult: Detailed expected readings with acceptable ranges
- calculation: Calculation breakdown with formulas (where applicable)
- troubleshooting: Array of troubleshooting scenarios with solutions (80-150 words each)
  * Include real-world examples from 30 years experience
  * Provide specific fault symptoms and diagnostic steps
  * Give temperature compensation notes
- commonMistakes: Array of 3-4 common errors electricians make during this test
- proTips: Array of 3-4 professional tips from field experience
- testDuration: Realistic time estimate (e.g., "5-8 minutes per circuit")
- prerequisiteTests: Tests that must be completed before this one
- instrumentNotes: Array of 2-3 notes about UK test instruments, brands, settings
- clientExplanation: Plain English explanation for non-technical clients (50+ words)
- realIncidentExample: Real-world story from 30 years experience showing why this test matters
- leadPlacement: Exact description of where to connect test leads with colour coding

**ENHANCED SECTIONS:**
- costEstimate: Include itemised materials, labour breakdown, total range
- clientCommunication: Plain English summary, urgency explanation, what to expect
- documentationRequirements: Specific tests to record, certificates needed, notes for schedules
- commissioningCompletionChecks: Final verification checklist before sign-off

**CRITICAL QUALITY RULES:**
- Procedure steps: 50-80 words per step, clear and detailed
- Troubleshooting scenarios: 80-150 words each with comprehensive solutions
- Include specific UK part numbers and brands where applicable
- Provide exact numeric readings, not ranges like "check readings"
- Reference real test instruments (Megger, Fluke, Kewtech, Di-Log)
- Include temperature effects on readings where relevant
- Cite specific BS 7671 table numbers and regulation clauses
- Use field-tested troubleshooting from 30 years experience

Return valid JSON only with enhanced detailed content.`;

  const userPrompt = `Generate commissioning procedures for: ${request.query}

${request.projectContext ? `
PROJECT DETAILS:
- Type: ${request.projectContext.projectType || 'domestic'}
- Name: ${request.projectContext.projectName || 'N/A'}
- Client: ${request.projectContext.clientInfo || 'N/A'}
- Circuit Type: ${request.projectContext.circuitType || 'N/A'}
- Additional: ${request.projectContext.additionalInfo || 'N/A'}
` : ''}`;

  console.log('🤖 Calling OpenAI for commissioning procedures (max 5 min timeout)...');
  console.log('📊 Prompt size:', systemPrompt.length + userPrompt.length, 'chars');

  // Add timeout protection (5 minutes for commissioning - match cost engineer)
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    console.error('⏱️ OpenAI call timeout after 300 seconds');
    controller.abort();
  }, 300000); // 5 minutes (match cost engineer exactly)

  let response;
  try {
    response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-5-mini-2025-08-07',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        response_format: { type: 'json_object' },
        max_completion_tokens: 20000
      }),
      signal: controller.signal
    });
  } catch (fetchError: any) {
    clearTimeout(timeoutId);
    if (fetchError.name === 'AbortError') {
      console.error('❌ OpenAI fetch aborted (timeout)');
      throw new Error('OpenAI request timed out after 5 minutes');
    }
    console.error('❌ OpenAI fetch error:', fetchError.message);
    throw new Error(`OpenAI fetch failed: ${fetchError.message}`);
  }

  clearTimeout(timeoutId);
  console.log(`📡 OpenAI response status: ${response.status}`);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('❌ OpenAI API error:', response.status, errorText.substring(0, 500));
    throw new Error(`OpenAI API error (${response.status}): ${errorText.substring(0, 200)}`);
  }

  const data = await response.json();

  // Validate response
  if (!data.choices || data.choices.length === 0) {
    throw new Error('OpenAI returned no choices');
  }

  const message = data.choices[0].message;

  // Check for refusal
  if (message.refusal) {
    throw new Error(`OpenAI refused: ${message.refusal}`);
  }

  const content = message.content;

  if (!content || content.trim().length === 0) {
    if (data.choices[0].finish_reason === 'length') {
      throw new Error('Response too long - try simplifying your query');
    }
    throw new Error(`Empty response from OpenAI (finish_reason: ${data.choices[0].finish_reason})`);
  }

  console.log(`✅ OpenAI response: ${content.length} chars`);
  console.log(`📊 Token usage: ${data.usage?.completion_tokens || 'N/A'} completion, ${data.usage?.prompt_tokens || 'N/A'} prompt`);

  // Parse JSON
  let parsedResult;
  try {
    parsedResult = JSON.parse(content);
  } catch (parseError: any) {
    console.error('❌ JSON parse failed:', parseError.message);
    console.error('📋 Raw content (first 500 chars):', content.substring(0, 500));
    throw new Error(`Failed to parse OpenAI JSON: ${parseError.message}`);
  }

  return parsedResult;
}
