/**
 * Design Agent V3 - Job-Aware with Database-Direct Updates
 * Supports both synchronous responses AND async job tracking
 * When jobId is provided, updates database directly to survive HTTP timeouts
 */

import { serve, corsHeaders, createClient } from '../_shared/deps.ts';
import { createLogger } from '../_shared/logger.ts';
import { DesignPipeline } from './design-pipeline.ts';

const VERSION = 'v3.1.0-job-aware';

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
    const { jobId, mode, circuits, supply, ...rest } = body;
    
    // Validate mode - V3 only supports direct-design
    if (mode !== 'direct-design') {
      throw new Error('V3 only supports mode: "direct-design"');
    }

    // Create Supabase admin client if jobId is provided (for database-direct updates)
    let supabaseAdmin = null;
    if (jobId) {
      supabaseAdmin = createClient(
        Deno.env.get('SUPABASE_URL')!,
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
      );
      
      logger.info('Job-aware mode enabled', { jobId });
      
      // Initial progress update
      await supabaseAdmin
        .from('circuit_design_jobs')
        .update({
          status: 'processing',
          current_step: 'Initializing AI circuit designer...',
          progress: 5
        })
        .eq('id', jobId);
    }

    logger.info('V3 Pipeline starting', {
      jobId: jobId || 'none',
      circuits: circuits?.length || 0,
      voltage: supply?.voltage,
      phases: supply?.phases
    });

    // Single entry point - all logic delegated to pipeline
    const pipeline = new DesignPipeline(logger, requestId, jobId, supabaseAdmin);
    const result = await pipeline.execute({ mode, circuits, supply, ...rest });

    const duration = Date.now() - startTime;
    logger.info('V3 Pipeline complete', {
      jobId: jobId || 'none',
      duration,
      circuits: result.circuits?.length || 0,
      fromCache: result.fromCache,
      autoFixApplied: result.autoFixApplied
    });

    // If jobId provided, update database with final result
    if (jobId && supabaseAdmin) {
      await supabaseAdmin
        .from('circuit_design_jobs')
        .update({
          status: 'complete',
          progress: 100,
          current_step: 'Design complete',
          design_data: result,
          raw_response: result,
          completed_at: new Date().toISOString()
        })
        .eq('id', jobId);
      
      logger.info('Job completed in database', { jobId });
    }

    return new Response(JSON.stringify({
      ...result,
      version: VERSION,
      processingTime: duration,
      jobId: jobId || undefined
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });

  } catch (error) {
    const duration = Date.now() - startTime;
    const body = await req.json().catch(() => ({}));
    const jobId = body.jobId;
    
    logger.error('V3 Pipeline failed', { 
      jobId: jobId || 'none',
      error: error.message,
      duration 
    });
    
    // If jobId provided, mark job as failed in database
    if (jobId) {
      try {
        const supabaseAdmin = createClient(
          Deno.env.get('SUPABASE_URL')!,
          Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
        );
        
        await supabaseAdmin
          .from('circuit_design_jobs')
          .update({
            status: 'failed',
            error_message: error.message || 'Design generation failed',
            completed_at: new Date().toISOString()
          })
          .eq('id', jobId);
        
        logger.info('Job marked as failed in database', { jobId });
      } catch (dbError) {
        logger.error('Failed to update job status in database', { 
          jobId, 
          dbError: dbError.message 
        });
      }
    }
    
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      version: VERSION,
      requestId,
      jobId: jobId || undefined,
      processingTime: duration
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
