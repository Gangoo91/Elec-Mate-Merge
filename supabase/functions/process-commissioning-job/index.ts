import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { jobId } = await req.json();

    if (!jobId) {
      return new Response(
        JSON.stringify({ error: 'Job ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`🚀 Processing commissioning job: ${jobId}`);

    // Fetch job details
    const { data: job, error: jobError } = await supabase
      .from('commissioning_jobs')
      .select('*')
      .eq('id', jobId)
      .single();

    if (jobError || !job) {
      console.error('Job not found:', jobError);
      return new Response(
        JSON.stringify({ error: 'Job not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update status to processing
    await supabase
      .from('commissioning_jobs')
      .update({
        status: 'processing',
        progress: 5,
        started_at: new Date().toISOString(),
        current_step: 'Analyzing project requirements...'
      })
      .eq('id', jobId);

    // PHASE 1: Query Enhancement (Progress: 10%)
    console.log('📝 Phase 1: Query Enhancement');
    await updateProgress(supabase, jobId, 10, 'Enhancing query context...');
    
    const { enhanceQuery } = await import('../_shared/query-enhancer.ts');
    const enhancement = enhanceQuery(job.job_inputs.query || '', []);
    const effectiveQuery = enhancement.enhanced;
    
    console.log(`✅ Query enhanced: ${enhancement.addedContext.length} context items added`);

    // PHASE 2: RAG Search (Progress: 25%)
    console.log('🔍 Phase 2: RAG Knowledge Retrieval');
    await updateProgress(supabase, jobId, 25, 'Searching commissioning knowledge base...');
    
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured');
    }
    
    const ragStart = Date.now();
    const { retrieveCommissioningKnowledge } = await import('../_shared/rag-commissioning.ts');
    
    const enhancedQuery = job.job_inputs.imageUrl 
      ? `${effectiveQuery} visual inspection photo analysis electrical installation safety compliance`
      : `${effectiveQuery} testing commissioning GN3 Chapter 64 inspection procedures`;
    
    const ragResults = await retrieveCommissioningKnowledge(
      enhancedQuery,
      OPENAI_API_KEY,
      supabase,
      { info: console.log, debug: console.log, warn: console.warn, error: console.error },
      job.job_inputs.projectContext?.circuitType
    );
    
    const ragDuration = Date.now() - ragStart;
    console.log(`✅ RAG search complete in ${ragDuration}ms - ${ragResults.length} results`);

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

    // PHASE 3: AI Generation (Progress: 50% -> 75%)
    console.log('🤖 Phase 3: AI Generation');
    await updateProgress(supabase, jobId, 50, 'Generating commissioning procedures...');
    
    // Heartbeat interval to keep progress updating
    const heartbeatInterval = setInterval(async () => {
      const { data: currentJob } = await supabase
        .from('commissioning_jobs')
        .select('progress')
        .eq('id', jobId)
        .single();
      
      if (currentJob && currentJob.progress < 75) {
        const newProgress = Math.min(currentJob.progress + 5, 74);
        await supabase
          .from('commissioning_jobs')
          .update({ progress: newProgress })
          .eq('id', jobId);
      }
    }, 15000); // Update every 15 seconds

    try {
      // Call OpenAI directly
      const { callOpenAI } = await import('../_shared/ai-providers.ts');
      
      // Build the system prompt (simplified version of commissioning-v3 logic)
      const systemPrompt = buildSystemPrompt(testContext, job.job_inputs);
      
      const aiStart = Date.now();
      const aiResponse = await callOpenAI(
        {
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: effectiveQuery }
          ],
          model: 'gpt-5-mini-2025-08-07',
          max_completion_tokens: 16000,
          response_format: { type: 'json_object' }
        },
        OPENAI_API_KEY
      );
      
      clearInterval(heartbeatInterval);
      const aiDuration = Date.now() - aiStart;
      console.log(`✅ AI generation complete in ${aiDuration}ms`);
      
      await updateProgress(supabase, jobId, 75, 'Processing AI response...');

      // PHASE 4: Parse and Save Result (Progress: 90% -> 100%)
      console.log('💾 Phase 4: Saving Results');
      await updateProgress(supabase, jobId, 90, 'Finalizing procedures...');
      
      let parsedResult;
      try {
        parsedResult = JSON.parse(aiResponse.content);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        throw new Error('Failed to parse AI response');
      }

      // Transform test procedures to ensure correct field names and array types
      const transformTestProcedure = (test: any): any => {
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
      };

      // Transform test arrays
      const transformedDeadTests = (parsedResult.deadTests || [])
        .map(transformTestProcedure)
        .filter(Boolean);
      const transformedLiveTests = (parsedResult.liveTests || [])
        .map(transformTestProcedure)
        .filter(Boolean);

      // Wrap AI response in proper CommissioningResponse structure
      const finalResult = {
        success: true,
        mode: 'procedure',
        structuredData: {
          testingProcedure: {
            visualInspection: {
              ...parsedResult.visualInspection,
              safetyNotes: Array.isArray(parsedResult.visualInspection?.safetyNotes) 
                ? parsedResult.visualInspection.safetyNotes 
                : [],
              checkpoints: Array.isArray(parsedResult.visualInspection?.checkpoints)
                ? parsedResult.visualInspection.checkpoints
                : []
            },
            deadTests: transformedDeadTests,
            liveTests: transformedLiveTests
          },
          certification: parsedResult.certification
        },
        // Additional data at root level
        clientCommunication: parsedResult.clientCommunication,
        costEstimate: parsedResult.costEstimate,
        commissioningCompletionChecks: parsedResult.commissioningCompletionChecks,
        documentationRequirements: parsedResult.documentationRequirements,
        metadata: {
          ragQualityMetrics: {
            gn3ProceduresFound,
            regulationsFound,
            totalSources: ragResults.length
          }
        }
      };

      // Save result to database
      await supabase
        .from('commissioning_jobs')
        .update({
          status: 'complete',
          progress: 100,
          result_data: finalResult,
          completed_at: new Date().toISOString(),
          current_step: 'Commissioning procedures complete'
        })
        .eq('id', jobId);

      console.log(`✅ Commissioning job completed: ${jobId}`);

      return new Response(
        JSON.stringify({ 
          success: true,
          jobId,
          data: finalResult
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } catch (aiError) {
      clearInterval(heartbeatInterval);
      throw aiError;
    }

  } catch (error: any) {
    console.error('❌ Error in process-commissioning-job:', error);
    
    // Try to update job status to failed
    try {
      const supabase = createClient(
        Deno.env.get('SUPABASE_URL')!,
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
      );
      
      const { jobId } = await req.json().catch(() => ({}));
      if (jobId) {
        await supabase
          .from('commissioning_jobs')
          .update({
            status: 'failed',
            error_message: error.message || 'Unknown error occurred',
            completed_at: new Date().toISOString()
          })
          .eq('id', jobId);
      }
    } catch (updateError) {
      console.error('Failed to update job status:', updateError);
    }
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

// Helper function to update job progress
async function updateProgress(
  supabase: any,
  jobId: string,
  progress: number,
  step: string
) {
  await supabase
    .from('commissioning_jobs')
    .update({
      progress,
      current_step: step
    })
    .eq('id', jobId);
}

// Build system prompt (simplified version)
function buildSystemPrompt(testContext: string, jobInputs: any): string {
  const threePhaseGuidance = `
**3-PHASE INSTALLATIONS (400V/415V BS 7671:2018+A3:2024)**:

SAFE ISOLATION (Regulation 537.2):
- Prove dead on ALL THREE PHASES individually
- Test phase-to-earth AND phase-to-phase (6 tests total: L1-N, L2-N, L3-N, L1-L2, L2-L3, L3-L1)
- Use approved voltage indicator conforming to GS38
- Lock off isolator, apply warning labels
- Verify isolation at BOTH ends if long cable run
`;

  return `You are a GN3 PRACTICAL TESTING GURU - BS 7671:2018+A3:2024 Chapter 64 specialist.

Write all responses in UK English (British spelling and terminology). Do not use American spellings.

🔧 YOU ARE AN INSPECTION & TESTING SPECIALIST WITH 30 YEARS HANDS-ON EXPERIENCE

${threePhaseGuidance}

GN3 PRACTICAL TEST KNOWLEDGE (YOU MUST USE THIS DATA):
${testContext}

ENHANCED RESPONSE REQUIREMENTS FOR TESTING PROCEDURES:

**MANDATORY STRUCTURE:**
- Generate structured commissioning procedures in JSON format
- Include visualInspection checkpoints (minimum 8-12 items)
- Include deadTests procedures (minimum 4-5 tests)
- Include liveTests procedures (minimum 3-4 tests)

**ENHANCED TEST PROCEDURE REQUIREMENTS:**
Each test procedure MUST include ALL of:
- testName: Clear descriptive name
- regulation: Specific BS 7671 regulation reference
- instrumentSetup: Detailed instrument configuration (settings, ranges, UK brand models like Megger MFT1741, Fluke 1664FC, Kewtech KT65DL)
- procedure: (CRITICAL: Use field name "procedure", NOT "procedureSteps") Array of detailed step-by-step instructions (minimum 4-6 steps, 100+ words per step)
  * Each step should include:
    - Exact lead placement (which terminals, colour coding)
    - Expected readings with units
    - What to look for (visual cues, meter readings)
    - Common mistakes to avoid
    - Time estimate for that step
- acceptanceCriteria: Clear pass/fail criteria with numeric limits
- expectedResult: Detailed expected readings with acceptable ranges
- calculation: Calculation breakdown with formulas (where applicable)
- troubleshooting: Array of 4-6 troubleshooting scenarios with solutions (150+ words each)
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
- Minimum 100 words per procedure step explanation
- Minimum 150 words per troubleshooting scenario
- Include specific UK part numbers and brands where applicable
- Provide exact numeric readings, not ranges like "check readings"
- Reference real test instruments (Megger, Fluke, Kewtech, Di-Log)
- Include temperature effects on readings where relevant
- Cite specific BS 7671 table numbers and regulation clauses
- Use field-tested troubleshooting from 30 years experience

Return valid JSON only with enhanced detailed content.`;
}
