/**
 * Design Agent V3 - Clean Rebuild
 * Single-purpose circuit design agent with deterministic behavior
 * NO job tracking, NO async modes - just: form → design → response
 */

import { serve, corsHeaders } from '../_shared/deps.ts';
import { createLogger } from '../_shared/logger.ts';
import { DesignPipeline } from './design-pipeline.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const VERSION = 'v3.1.1-cable-consistency';

serve(async (req) => {
  let requestId: string | undefined;
  
  try {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    requestId = crypto.randomUUID();
    const logger = createLogger(requestId);
    const startTime = Date.now();
  
  // Initialize Supabase client for job updates (if job-aware mode)
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  let jobId: string | undefined; // Declare outside try block for catch access

  try {
    const body = await req.json();
    jobId = body.jobId; // Detect if running in job-aware mode
    
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

    // Progress callback for RAG (passes through to pipeline)
    const ragProgressCallback = async (msg: string) => {
      logger.info('RAG progress', { message: msg });
      if (jobId) {
        await updateJobProgress(15, msg);
      }
    };

    // Single entry point - all logic delegated to pipeline
    const pipeline = new DesignPipeline(logger, requestId, ragProgressCallback);
    
    // Progress heartbeat: AI generation phase
    await updateJobProgress(30, 'Generating circuit designs with AI...');
    
    // Confirm agent started successfully (for watchdog detection)
    await updateJobProgress(35, 'Design agent started - preparing AI context...');
    logger.info('✅ Agent confirmed active', { jobId });
    
    // Watchdog: Auto-fail job if agent crashes without updating status
    const watchdogTimeout = setTimeout(async () => {
      if (jobId) {
        const { data: currentJob } = await supabase
          .from('circuit_design_jobs')
          .select('status')
          .eq('id', jobId)
          .single();
        
        // If job is still processing after 10 minutes, mark as timed out
        if (currentJob?.status === 'processing') {
          logger.error('Watchdog timeout - marking job as failed');
          await supabase
            .from('circuit_design_jobs')
            .update({
              status: 'failed',
              error_message: 'Agent timed out after 10 minutes without completing',
              completed_at: new Date().toISOString()
            })
            .eq('id', jobId);
        }
      }
    }, 600000); // 10 minutes

    // HEARTBEAT: Update progress during pipeline execution to prevent stuck detection
    let heartbeatProgress = 30;
    const heartbeatInterval = setInterval(async () => {
      if (heartbeatProgress < 85) {
        heartbeatProgress = Math.min(85, heartbeatProgress + 5);
        await updateJobProgress(heartbeatProgress, 'AI is designing circuits...');
      }
    }, 15000); // Every 15 seconds

    let result;
    try {
      result = await pipeline.execute(body);
      
      // Progress heartbeat: Validation phase
      await updateJobProgress(90, 'Validating compliance and finalizing...');
      
    } catch (pipelineError) {
      // Pipeline failed - let outer catch handle it
      logger.error('Pipeline execution failed', { 
        error: pipelineError.message,
        jobId 
      });
      throw pipelineError;
      
    } finally {
      // ALWAYS clean up timers
      if (heartbeatInterval) {
        clearInterval(heartbeatInterval);
        logger.debug('Heartbeat interval cleared');
      }
      clearTimeout(watchdogTimeout);
      logger.debug('Watchdog timeout cleared');
    }
    
    const duration = Date.now() - startTime;
    logger.info('V3 Pipeline complete', {
      duration,
      circuits: result.circuits?.length || 0,
      fromCache: result.fromCache,
      autoFixApplied: result.autoFixApplied,
      jobMode: jobId ? 'async-job' : 'direct'
    });

    // Job-aware mode: Update job - Phase 1 complete, trigger Phase 2
    if (jobId) {
      try {
        await supabase
          .from('circuit_design_jobs')
          .update({
            status: 'processing', // Keep processing for Installation Agent (Phase 2)
            progress: 50, // Phase 1 of 2 complete
            current_step: 'Circuit design complete. Generating installation guidance...',
            designer_status: 'complete',
            designer_progress: 100,
            design_data: result,
            raw_response: result
            // No completed_at yet - job still running Phase 2
          })
          .eq('id', jobId);
        
        logger.info('Phase 1 (Designer) complete - triggering Phase 2 (Installer)', { jobId });

        // ============================================
        // PHASE 2: Trigger Installation Agent
        // ============================================
        try {
          const { data: installResult, error: installError } = await supabase.functions.invoke('design-installation-agent', {
            body: {
              jobId,
              designedCircuits: result.circuits,
              supply: body.supply,
              projectInfo: body.projectInfo
            }
          });

          if (installError) {
            logger.warn('Installation Agent failed (non-critical)', { error: installError });
            
            // Designer succeeded, so mark job complete anyway
            await supabase
              .from('circuit_design_jobs')
              .update({
                status: 'complete',
                progress: 100,
                current_step: 'Design complete (installation guidance unavailable)',
                installation_agent_status: 'failed',
                completed_at: new Date().toISOString()
              })
              .eq('id', jobId);
          } else {
            logger.info('Phase 2 (Installer) complete', { jobId });
          }
        } catch (installError: any) {
          logger.warn('Installation Agent invocation error (non-critical)', { error: installError });
          
          // Designer succeeded, so mark job complete anyway
          await supabase
            .from('circuit_design_jobs')
            .update({
              status: 'complete',
              progress: 100,
              current_step: 'Design complete (installation guidance unavailable)',
              installation_agent_status: 'failed',
              completed_at: new Date().toISOString()
            })
            .eq('id', jobId);
        }
      } catch (err) {
        logger.error('Failed to update job or trigger installer', { error: err });
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
    
    logger.error('V3 Pipeline failed', { 
      error: error.message,
      duration,
      jobId // Use jobId from outer scope (line 32)
    });
    
    // CRITICAL: Mark job as failed in database
    if (jobId) {
      try {
        logger.info('Marking job as failed', { jobId, error: error.message });
        
        await supabase
          .from('circuit_design_jobs')
          .update({
            status: 'failed',
            error_message: `Design generation failed: ${error.message}`,
            completed_at: new Date().toISOString()
          })
          .eq('id', jobId);
        
        logger.info('Job marked as failed successfully', { jobId });
      } catch (err) {
        logger.error('Failed to mark job as failed in database', { 
          jobId, 
          error: err.message 
        });
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
  
  } catch (fatalError) {
    // CRITICAL: Catch import/startup errors BEFORE logger exists
    console.error('FATAL: designer-agent-v3 crashed before logger initialization', {
      error: fatalError instanceof Error ? fatalError.message : String(fatalError),
      stack: fatalError instanceof Error ? fatalError.stack : undefined,
      requestId,
      timestamp: new Date().toISOString()
    });
    
    return new Response(JSON.stringify({
      success: false,
      error: `Designer agent startup failure: ${fatalError instanceof Error ? fatalError.message : String(fatalError)}`,
      fatal: true,
      requestId,
      version: VERSION
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
