// DEPLOYMENT v3.3.1 - Fixed lovableApiKey initialization - 2025-10-24T16:10:00Z
import { corsHeaders, serve } from '../_shared/deps.ts';
import { createLogger } from '../_shared/logger.ts';
import { handleBatchDesign } from './batch-design-handler.ts';

const VERSION = 'v3.3.1-api-key-fix'; // Fixed API key initialization order

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
    
    // Route to batch design handler
    if (body.mode === 'batch-design') {
      const result = await handleBatchDesign(body, logger);
      logger.info(`✅ Batch design complete - Version: ${VERSION}`);
      return result;
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
