/**
 * Design Agent V3 - Clean Rebuild
 * Single-purpose circuit design agent with deterministic behavior
 * NO job tracking, NO async modes - just: form → design → response
 */

import { serve, corsHeaders } from '../_shared/deps.ts';
import { createLogger } from '../_shared/logger.ts';
import { DesignPipeline } from './design-pipeline.ts';

const VERSION = 'v3.0.0-clean-rebuild';

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = crypto.randomUUID();
  const logger = createLogger(requestId);
  const startTime = Date.now();

  try {
    const body = await req.json();
    
    // Validate mode - V3 only supports direct-design
    if (body.mode !== 'direct-design') {
      throw new Error('V3 only supports mode: "direct-design"');
    }

    logger.info('V3 Pipeline starting', {
      circuits: body.circuits?.length || 0,
      voltage: body.supply?.voltage,
      phases: body.supply?.phases
    });

    // Single entry point - all logic delegated to pipeline
    const pipeline = new DesignPipeline(logger, requestId);
    const result = await pipeline.execute(body);

    const duration = Date.now() - startTime;
    logger.info('V3 Pipeline complete', {
      duration,
      circuits: result.circuits?.length || 0,
      fromCache: result.fromCache,
      autoFixApplied: result.autoFixApplied
    });

    return new Response(JSON.stringify({
      ...result,
      version: VERSION,
      processingTime: duration
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });

  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('V3 Pipeline failed', { 
      error: error.message,
      duration 
    });
    
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      version: VERSION,
      requestId,
      processingTime: duration
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
