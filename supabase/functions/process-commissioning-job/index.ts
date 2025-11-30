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

      // Add metadata
      const finalResult = {
        ...parsedResult,
        success: true,
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

RESPONSE REQUIREMENTS:
- Generate structured commissioning procedures in JSON format
- Include visualInspection checkpoints (minimum 8-12 items)
- Include deadTests procedures (minimum 4-5 tests)
- Include liveTests procedures (minimum 3-4 tests)
- Each test must include: testName, regulation, instrumentSetup, procedure steps, acceptanceCriteria, expectedResult, troubleshooting
- Include costEstimate, clientCommunication, and documentationRequirements sections

Return valid JSON only.`;
}
