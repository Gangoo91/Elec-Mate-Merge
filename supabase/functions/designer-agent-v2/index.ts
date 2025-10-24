import { corsHeaders, serve } from '../_shared/deps.ts';
import { createLogger } from '../_shared/logger.ts';
import { handleBatchDesign, handleBatchDesignStreaming } from './batch-design-handler.ts';
import { createStreamingResponse } from '../_shared/streaming-utils.ts';

const VERSION = 'v3.2.0-gpt5-mini-24k'; // Track deployment: GPT-5-mini + 24k tokens + batch-6

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Health check endpoint
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
    
    // Route to batch design handler (streaming mode)
    if (body.mode === 'batch-design') {
      logger.info('🌊 Starting streaming batch design');
      return createStreamingResponse(
        async (builder) => {
          await handleBatchDesignStreaming(body, logger, builder);
          logger.info(`✅ Streaming batch design complete - Version: ${VERSION}`);
        },
        corsHeaders
      );
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
