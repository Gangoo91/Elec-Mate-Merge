/**
 * Design Agent V3 - Clean Rebuild
 * Single-purpose circuit design agent with deterministic behavior
 * NO job tracking, NO async modes - just: form → design → response
 */

import { serve, corsHeaders } from '../_shared/deps.ts';
import { createLogger } from '../_shared/logger.ts';
import { DesignPipeline } from './design-pipeline.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const VERSION = 'v3.1.0-job-aware';

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = crypto.randomUUID();
  const logger = createLogger(requestId);
  const startTime = Date.now();
  
  // Initialize Supabase client for job updates (if job-aware mode)
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  try {
    const body = await req.json();
    const jobId = body.jobId; // Detect if running in job-aware mode
    
    // Validate mode - V3 only supports direct-design
    if (body.mode !== 'direct-design') {
      throw new Error('V3 only supports mode: "direct-design"');
    }

    logger.info('V3 Pipeline starting', {
      circuits: body.circuits?.length || 0,
      voltage: body.supply?.voltage,
      phases: body.supply?.phases,
      jobMode: jobId ? 'async-job' : 'direct'
    });

    // Job-aware mode: Update job progress
    const updateJobProgress = async (progress: number, step: string) => {
      if (!jobId) return;
      try {
        await supabase
          .from('circuit_design_jobs')
          .update({ 
            progress, 
            current_step: step,
            updated_at: new Date().toISOString()
          })
          .eq('id', jobId);
      } catch (err) {
        logger.error('Failed to update job progress', { error: err });
      }
    };

    // Progress heartbeat: RAG search phase
    await updateJobProgress(10, 'Searching design knowledge base...');

    // Single entry point - all logic delegated to pipeline
    const pipeline = new DesignPipeline(logger, requestId);
    
    // Progress heartbeat: AI generation phase
    await updateJobProgress(30, 'Generating circuit designs with AI...');
    
    const result = await pipeline.execute(body);
    
    // Progress heartbeat: Validation phase
    await updateJobProgress(90, 'Validating compliance and finalizing...');

    const duration = Date.now() - startTime;
    logger.info('V3 Pipeline complete', {
      duration,
      circuits: result.circuits?.length || 0,
      fromCache: result.fromCache,
      autoFixApplied: result.autoFixApplied,
      jobMode: jobId ? 'async-job' : 'direct'
    });

    // Job-aware mode: Update job to complete with results
    if (jobId) {
      try {
        await supabase
          .from('circuit_design_jobs')
          .update({
            status: 'complete',
            progress: 100,
            current_step: 'Design complete!',
            design_data: result,
            raw_response: result,
            completed_at: new Date().toISOString()
          })
          .eq('id', jobId);
        
        logger.info('Job marked complete', { jobId });
      } catch (err) {
        logger.error('Failed to mark job complete', { error: err });
      }
    }

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
    const body = await req.json().catch(() => ({}));
    const jobId = body.jobId;
    
    logger.error('V3 Pipeline failed', { 
      error: error.message,
      duration,
      jobId 
    });
    
    // Job-aware mode: Mark job as failed
    if (jobId) {
      try {
        await supabase
          .from('circuit_design_jobs')
          .update({
            status: 'failed',
            error_message: error.message,
            completed_at: new Date().toISOString()
          })
          .eq('id', jobId);
      } catch (err) {
        logger.error('Failed to mark job as failed', { error: err });
      }
    }
    
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
