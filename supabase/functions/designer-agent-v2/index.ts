// DEPLOYMENT v3.3.1 - Fixed lovableApiKey initialization - 2025-10-24T16:10:00Z
import { corsHeaders, serve } from '../_shared/deps.ts';
import { createLogger } from '../_shared/logger.ts';
import { MetricsCollector } from '../_shared/metrics.ts';
import { handleBatchDesign } from './batch-design-handler.ts';

const VERSION = 'v4.0.1-rag-fix'; // Fixed BS7671 function name + embedding generation

serve(async (req) => {
  // Monitor request lifecycle for timeout debugging
  req.signal?.addEventListener('abort', () => {
    console.warn('⚠️ Request aborted by client or timeout');
  });
  // Fix 5: Early health check response before imports (cold start optimization)
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Health check endpoint - respond immediately
  if (req.method === 'GET') {
    const buildId = Deno.env.get('DENO_DEPLOYMENT_ID') || 'local';
    console.log(`🏥 Health check - Version: ${VERSION}, Build: ${buildId}`);
    return new Response(
      JSON.stringify({ 
        status: 'ok', 
        version: VERSION,
        buildId,
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );
  }

  const requestId = crypto.randomUUID();
  const logger = createLogger(requestId);
  
  // PHASE 5: Initialize metrics with safety check
  let metrics: MetricsCollector;
  try {
    metrics = new MetricsCollector(requestId, 'designer-agent-v2');
  } catch (error) {
    console.warn('⚠️ Metrics initialization failed, continuing without metrics:', error);
    // Create a no-op metrics collector to prevent crashes
    metrics = {
      setSuccess: () => {},
      setRegulationCount: () => {},
      setError: () => {},
      flush: async () => {},
      getMetrics: () => ({})
    } as any;
  }

  // Log version on every request
  logger.info(`🚀 Designer Agent V2 ${VERSION} - Request started`);

  try {
    const body = await req.json();
    
    // NEW: Direct synchronous design mode (simple, fast, no job tracking)
    if (body.mode === 'direct-design') {
      logger.info('🎯 Direct design mode - synchronous processing');
      try {
        const result = await handleBatchDesign(body, logger);
        metrics.setSuccess(true);
        metrics.setRegulationCount(body.circuits?.length || 0);
        await metrics.flush();
        return result;
      } catch (error) {
        metrics.setError(error.code || 'DESIGN_FAILED');
        await metrics.flush();
        throw error;
      }
    }
    
    // Legacy: Batch design with async job tracking
    if (body.mode === 'batch-design') {
      const asyncMode = body.asyncMode === true;
      const jobId = body.jobId;
      
      if (asyncMode && jobId) {
        // Use background task for long-running AI design
        logger.info(`🚀 Starting BACKGROUND task for job ${jobId}`);
        
        // Start the design process in the background
        const designTask = handleBatchDesign(body, logger);
        
        // Keep the function alive until design completes
        EdgeRuntime.waitUntil(designTask);
        
        // Return immediately to avoid timeout
        return new Response(
          JSON.stringify({
            success: true,
            message: 'Design started in background',
            jobId: jobId,
            version: VERSION
          }),
          {
            status: 202, // Accepted
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      } else {
        // Synchronous mode (legacy)
        try {
          const result = await handleBatchDesign(body, logger);
          metrics.setSuccess(true);
          metrics.setRegulationCount(body.circuits?.length || 0);
          logger.info(`✅ Batch design complete - Version: ${VERSION}`);
          await metrics.flush();
          return result;
        } catch (error) {
          metrics.setError(error.code || 'UNKNOWN_ERROR');
          await metrics.flush();
          throw error;
        }
      }
    }

    // Legacy single-circuit mode (not used anymore)
    return new Response(
      JSON.stringify({
        version: VERSION,
        success: false,
        error: 'Use mode: "batch-design" for circuit design',
        code: 'INVALID_MODE'
      }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    logger.error('Designer agent error', { error });
    metrics.setError(error.code || 'INTERNAL_ERROR');
    await metrics.flush();
    
    return new Response(
      JSON.stringify({
        version: VERSION, // Include version in errors
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        code: 'INTERNAL_ERROR',
        requestId
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
