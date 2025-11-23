/**
 * Unified Circuit Design Generator V2 (mirrors AI RAMS architecture)
 * Single edge function - no polling, no separate agent jobs, no HTTP overhead
 * 
 * Based on proven generate-rams pattern:
 * 1. Shared RAG search (run once, use for both agents)
 * 2. Parallel agent execution with Promise.allSettled
 * 3. Direct progress callbacks (no DB polling latency)
 * 4. 3-layer caching (full/RAG/partial)
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { corsHeaders } from '../_shared/deps.ts';
import { createLogger } from '../_shared/logger.ts';
import { checkCircuitDesignCache, storeCircuitDesignCache } from '../_shared/circuit-cache.ts';
import { checkRAGCache, storeRAGCache } from '../_shared/circuit-rag-cache.ts';
import { checkPartialCache, storePartialCache } from '../_shared/circuit-partial-cache.ts';
import { searchCircuitRegulations } from '../_shared/circuit-rag.ts';
import { designCircuits } from '../_agents/circuit-designer-core.ts';


const VERSION = 'v2.0.0-unified';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = crypto.randomUUID();
  const logger = createLogger(requestId);
  
  let jobId: string | null = null;

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { jobId: requestJobId } = await req.json();
    jobId = requestJobId;
    
    logger.info(`🚀 Circuit Design V2 ${VERSION} - Starting unified generation`, { jobId });

    // Fetch job details
    const { data: job, error: fetchError } = await supabase
      .from('circuit_design_jobs')
      .select('*')
      .eq('id', jobId)
      .single();

    if (fetchError || !job) {
      throw new Error(`Job not found: ${jobId}`);
    }

    // Check for cancellation
    if (job.status === 'cancelled') {
      logger.info('Job was cancelled', { jobId });
      return new Response(
        JSON.stringify({ success: false, message: 'Job was cancelled' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validation
    if (!job.user_id) {
      throw new Error('Job missing user_id - authentication required');
    }

    const jobInputs = job.job_inputs;
    const openAiKey = Deno.env.get('OPENAI_API_KEY')!;

    // Safe progress updater (simplified - single agent only)
    const safeUpdateProgress = async (progress: number, step: string): Promise<void> => {
      try {
        await supabase
          .from('circuit_design_jobs')
          .update({ 
            progress, 
            current_step: step,
            designer_progress: progress,
            designer_status: progress < 100 ? 'processing' : 'complete'
          })
          .eq('id', jobId);
      } catch (error) {
        logger.error('⚠️ Progress update failed (non-fatal)', { error });
      }
    };

    // Check cancellation helper
    const checkCancelled = async (): Promise<boolean> => {
      const { data } = await supabase
        .from('circuit_design_jobs')
        .select('status')
        .eq('id', jobId)
        .single();
      return data?.status === 'cancelled';
    };

    // ⚡ LAYER 1: Full Design Cache (DISABLED FOR TESTING RING FINAL FIX)
    await safeUpdateProgress(2, 'Checking design cache...');
    
    // TEMPORARILY DISABLED - Force cache miss
    const cacheResult = { hit: false }; // Force cache miss
    // const cacheResult = await checkCircuitDesignCache({
    //   supabase,
    //   jobInputs,
    //   openAiKey
    // });

    if (cacheResult.hit) {
      // This block will never execute while disabled
      logger.info('✅ LAYER 1 CACHE HIT - DISABLED', {
        similarity: cacheResult.similarity,
        ageSeconds: cacheResult.ageSeconds
      });

      await supabase
        .from('circuit_design_jobs')
        .update({
          status: 'complete',
          progress: 100,
          current_step: 'Design complete (from cache)!',
          design_data: cacheResult.data,
          designer_status: 'complete',
          installer_status: 'complete',
          completed_at: new Date().toISOString()
        })
        .eq('id', jobId);

      return new Response(
        JSON.stringify({ success: true, cached: true, version: VERSION }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    logger.info('🔄 LAYER 1 CACHE DISABLED - forcing fresh generation');

    await safeUpdateProgress(5, 'Initializing agents...');

    if (await checkCancelled()) {
      return new Response(
        JSON.stringify({ success: false, message: 'Job was cancelled' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // ⚡ LAYER 2: RAG Cache - Shared search (DISABLED FOR TESTING RING FINAL FIX)
    await safeUpdateProgress(8, 'Searching regulations intelligence (shared)...');
    
    logger.info('🔍 RAG cache disabled - fetching fresh regulations');
    const query = buildCircuitQuery(jobInputs);
    
    // TEMPORARILY DISABLED - Force fresh RAG search
    const ragCacheResult = { hit: false }; // Force cache miss
    // const ragCacheResult = await checkRAGCache({
    //   supabase,
    //   query,
    //   knowledgeBaseType: 'circuit_regulations'
    // });

    let sharedRegulations;
    if (ragCacheResult.hit) {
      // This block will never execute while disabled
      logger.info('✅ LAYER 2 RAG CACHE HIT - DISABLED');
      sharedRegulations = ragCacheResult.data;
    } else {
      logger.info('🔄 LAYER 2 RAG CACHE DISABLED - fetching fresh regulations from RAG...');
      try {
        sharedRegulations = await searchCircuitRegulations(jobInputs);
        if (!sharedRegulations || !Array.isArray(sharedRegulations)) {
          logger.warn('⚠️ RAG search returned invalid data, using empty array');
          sharedRegulations = [];
        }
      } catch (error) {
        logger.error('❌ RAG search failed, using empty array', error);
        sharedRegulations = [];
      }
      
      // Don't store in cache during testing
      // await storeRAGCache({ supabase, query, knowledgeBaseType: 'circuit_regulations', ragResults: sharedRegulations });
    }

    logger.info(`✅ Using ${sharedRegulations?.length || 0} shared regulations for both agents`);

    await safeUpdateProgress(10, 'Running Circuit Designer and Installation Planner in parallel...');
    await supabase
      .from('circuit_design_jobs')
      .update({
        designer_status: 'pending',
        installer_status: 'pending'
      })
      .eq('id', jobId);

    if (await checkCancelled()) {
      return new Response(
        JSON.stringify({ success: false, message: 'Job was cancelled' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // ⚡ LAYER 3: Designer Cache Only (DISABLED FOR TESTING RING FINAL FIX)
    logger.info('🔍 Partial cache disabled for designer');
    
    // TEMPORARILY DISABLED - Force fresh generation
    const designerCacheResult = { hit: false }; // Force cache miss
    // const designerCacheResult = await checkPartialCache({
    //   supabase,
    //   jobInputs,
    //   agentType: 'circuit_designer',
    //   openAiKey
    // });

    // SINGLE AGENT EXECUTION (installation guidance integrated into designer)
    logger.info('🤖 Starting AI Designer (includes installation guidance) - NO CACHE');
    const startTime = Date.now();

    const [designerResult] = await Promise.allSettled([
      designerCacheResult.hit
        ? Promise.resolve(designerCacheResult.data)
        : designCircuits(
            jobInputs,
            async (progress: number, step: string) => {
              if (await checkCancelled()) throw new Error('Job cancelled');
              await safeUpdateProgress(progress, step);
            },
            sharedRegulations
          )
    ]);

    // Log cache performance
    if (designerCacheResult.hit) {
      logger.info('✅ LAYER 3: Circuit Designer from cache - DISABLED');
      // Don't update agent progress for disabled cache
    }

    if (await checkCancelled()) {
      return new Response(
        JSON.stringify({ success: false, message: 'Job was cancelled' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const elapsedMs = Date.now() - startTime;
    logger.info(`✅ Designer agent completed in ${Math.round(elapsedMs / 1000)}s (includes installation guidance)`);

    // Handle designer failure with defensive error checking
    if (designerResult.status === 'rejected') {
      const error = designerResult.reason;
      const errorMessage = error instanceof Error 
        ? error.message 
        : (typeof error === 'string' ? error : JSON.stringify(error));
      
      logger.error('Circuit Designer failed:', {
        error: errorMessage,
        stack: error instanceof Error ? error.stack : undefined
      });
      
      throw new Error(`Circuit Designer failed: ${errorMessage}`);
    }

    const designerData = designerResult.value;

    // Store partial result in cache (DISABLED FOR TESTING RING FINAL FIX)
    // if (!designerCacheResult.hit) {
    //   await storePartialCache({
    //     supabase,
    //     jobInputs,
    //     agentType: 'circuit_designer',
    //     agentOutput: designerData,
    //     openAiKey
    //   });
    // }
    logger.info('🔄 LAYER 3 CACHE STORAGE DISABLED');

    await safeUpdateProgress(95, 'Finalizing circuit design...');

    // Designer already includes installationGuidance in structuredOutput.sections
    const mergedData = {
      circuits: designerData.circuits || [],
      summary: {
        totalCircuits: (designerData.circuits || []).length,
        generatedAt: new Date().toISOString(),
        version: VERSION
      }
    };

    // Store in full design cache (DISABLED FOR TESTING RING FINAL FIX)
    // await storeCircuitDesignCache({
    //   supabase,
    //   jobInputs,
    //   design: mergedData,
    //   openAiKey
    // });
    logger.info('🔄 LAYER 1 CACHE STORAGE DISABLED');

    // Mark job as complete
    await supabase
      .from('circuit_design_jobs')
      .update({
        status: 'complete',
        progress: 100,
        current_step: 'Design complete!',
        design_data: mergedData,
        designer_status: 'complete',
        installer_status: 'complete',
        completed_at: new Date().toISOString()
      })
      .eq('id', jobId);

    logger.info('✅ Circuit design generation complete', { 
      jobId,
      elapsedSeconds: Math.round(elapsedMs / 1000),
      version: VERSION
    });

    return new Response(
      JSON.stringify({ success: true, version: VERSION }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    logger.error('Circuit design generation failed', { error: error.message, jobId });

    if (jobId) {
      const supabase = createClient(
        Deno.env.get('SUPABASE_URL')!,
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
      );

      await supabase
        .from('circuit_design_jobs')
        .update({
          status: 'failed',
          error_message: error.message,
          completed_at: new Date().toISOString()
        })
        .eq('id', jobId);
    }

    return new Response(
      JSON.stringify({ error: error.message, version: VERSION }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

/**
 * Build circuit query for RAG search
 */
function buildCircuitQuery(jobInputs: any): string {
  const circuits = jobInputs.circuits || [];
  const supply = jobInputs.supply || {};
  
  return `
    ${circuits.length} electrical circuits
    ${supply.voltage || 230}V ${supply.phases || 'single'} phase
    Earthing: ${supply.earthingSystem || 'TN-C-S'}
    Load types: ${circuits.map((c: any) => c.loadType).join(', ')}
    Cable lengths: ${circuits.map((c: any) => `${c.cableLength}m`).join(', ')}
  `.trim();
}
