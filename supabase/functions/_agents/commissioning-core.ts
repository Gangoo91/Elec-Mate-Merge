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
    circuitSchedule?: Array<{
      circuitNumber: number;
      circuitName: string;
      cableSize: string;
      protectionDevice: string;
      expectedR1R2?: string;
      maxZs?: string;
      testMethod?: string;
    }>;
  };
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
        certification: commissioningResult.certification,
        circuitSchedule: commissioningResult.circuitSchedule
      },
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
- Include visualInspection checkpoints (5-8 detailed items MINIMUM)
- MANDATORY: Include deadTests procedures - MINIMUM 3-5 DEAD TESTS REQUIRED (continuity, insulation resistance, polarity, etc.) - THIS ARRAY MUST NEVER BE EMPTY
- MANDATORY: Include liveTests procedures - MINIMUM 2-4 LIVE TESTS REQUIRED (earth fault loop, RCD, PFC, etc.) - THIS ARRAY MUST NEVER BE EMPTY

## CRITICAL: REAL-WORLD PRACTICAL TESTING PROCEDURES

**TEST METHOD SELECTION (MANDATORY):**
For continuity tests, ALWAYS specify HOW to physically do the test:

**LINK-OUT METHOD** (Preferred for final circuits):
- Step 1 PREPARATION: Isolate circuit, lock off, remove CU cover
- Step 2 SETUP: Use flying lead to link Line to CPC at distribution board
- Step 3 LEAD PLACEMENT: Red lead to Line terminal, Black to Earth at furthest socket
- Step 4 TEST: Take reading, check stable
- Step 5 RECORD: Note highest reading, compare to max Zs

**LONG LEAD METHOD** (For sub-mains):
- Step 1 PREPARATION: Isolate, lock off
- Step 2 SETUP: Run long test lead from CPC bar to far end of circuit
- Step 3 LEAD PLACEMENT: Red to Earth bar, Black to wandering lead
- Step 4 TEST: Take reading
- Step 5 RECORD: Note reading, add lead resistance if needed

**Each procedure step must be structured:**
- PREPARATION: What to remove, identify, isolate
- SETUP: Physical setup (link-out OR long lead method)
- LEAD PLACEMENT: Exact terminals with wire colours
- TEST: Take reading, what to expect
- INTERPRET/RECORD: Compare to limits

**Test procedure requirements:**
- testName, regulation, instrumentSetup, acceptanceCriteria
- procedure: Array of PREP/SETUP/LEAD/TEST/RECORD steps
- leadPlacement: "Red lead to Line (brown), Black to Earth (green/yellow)"
- expectedResult, calculation (if applicable)
- instrumentNotes, troubleshooting, commonMistakes, proTips
- testDuration, prerequisiteTests

**ENHANCED SECTIONS:**
- certification: Just certificate type (EIC/EICR/MWC) and schedules
- circuitSchedule: If multiple circuits mentioned, list each with circuit number, name, cable size, protection device, expected R1+R2, max Zs, test method
- commissioningCompletionChecks: Final verification

**OUTPUT STRUCTURE:**
{
  "deadTests": [...3-5 tests with PRACTICAL methods...],
  "liveTests": [...2-4 tests...],
  "certification": { "certificateType": "EIC", "requiredSchedules": [...] },
  "circuitSchedule": [
    { "circuitNumber": 1, "circuitName": "Lighting", "cableSize": "1.0mm²", "protectionDevice": "B6", "expectedR1R2": "0.65Ω", "maxZs": "7.67Ω", "testMethod": "Link-out at board" }
  ]
}

⚠️ CRITICAL: Empty deadTests or liveTests arrays are UNACCEPTABLE and will be REJECTED.
Every electrical commissioning job REQUIRES both dead and live tests.
If you return empty arrays, your response will be discarded and regenerated.

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

  // RETRY LOGIC: Retry up to 2 times if validation fails
  const MAX_RETRIES = 2;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`🔄 Attempt ${attempt}/${MAX_RETRIES}...`);

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

  // VALIDATE: Ensure deadTests and liveTests are NOT empty
  if (!parsedResult.deadTests || parsedResult.deadTests.length === 0) {
    console.error('❌ VALIDATION FAILED: AI returned empty deadTests array');
    throw new Error('Invalid response: deadTests cannot be empty - minimum 3 required');
  }

  if (!parsedResult.liveTests || parsedResult.liveTests.length === 0) {
    console.error('❌ VALIDATION FAILED: AI returned empty liveTests array');
    throw new Error('Invalid response: liveTests cannot be empty - minimum 2 required');
  }

      console.log(`✅ Validation passed: ${parsedResult.deadTests.length} dead tests, ${parsedResult.liveTests.length} live tests`);

      return parsedResult; // SUCCESS - exit retry loop

    } catch (error: any) {
      lastError = error;
      console.error(`❌ Attempt ${attempt}/${MAX_RETRIES} failed:`, error.message);
      
      if (attempt < MAX_RETRIES) {
        console.log('🔄 Retrying with stronger emphasis on required fields...');
        // Continue to next attempt
      }
    }
  }

  // All retries failed
  console.error(`❌ All ${MAX_RETRIES} attempts failed`);
  throw lastError || new Error('All retries failed to generate valid commissioning procedures');
}
