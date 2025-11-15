// DEPLOYMENT v3.3.1 - Fixed lovableApiKey initialization - 2025-10-24T16:10:00Z
import { corsHeaders, serve } from '../_shared/deps.ts';
import { createLogger } from '../_shared/logger.ts';
import { handleBatchDesign } from './batch-design-handler.ts';

const VERSION = 'v4.0.0-best-in-class'; // All 7 optimization phases deployed

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

  // Log version on every request
  logger.info(`🚀 Designer Agent V2 ${VERSION} - Request started`);

  try {
    const body = await req.json();
    
    // Route to batch design handler
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
        const result = await handleBatchDesign(body, logger);
        logger.info(`✅ Batch design complete - Version: ${VERSION}`);
        return result;
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
