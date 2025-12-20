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

    // Per-circuit progress callback
    const circuitProgressCallback = async (completed: number, total: number, circuitName: string) => {
      if (!jobId) return;
      const designerProgress = Math.round((completed / total) * 100);
      try {
        await supabase
          .from('circuit_design_jobs')
          .update({
            designer_progress: designerProgress,
            current_step: `Designing circuit ${completed}/${total}: ${circuitName}`,
            updated_at: new Date().toISOString()
          })
          .eq('id', jobId);
        logger.info('Circuit progress updated', { completed, total, designerProgress });
      } catch (err) {
        logger.error('Failed to update circuit progress', { error: err });
      }
    };

    // Single entry point - all logic delegated to pipeline
    const pipeline = new DesignPipeline(logger, requestId, ragProgressCallback, circuitProgressCallback);
    
    // Progress heartbeat: AI generation phase
    await updateJobProgress(30, 'Generating circuit designs with AI...');
    
    // CRITICAL: Update designer status immediately on startup
    if (jobId) {
      await supabase
        .from('circuit_design_jobs')
        .update({
          designer_status: 'processing',
          designer_progress: 0,
          progress: 35,
          current_step: 'Designer agent started - processing circuits...'
        })
        .eq('id', jobId);
    }
    logger.info('✅ Designer status set to processing', { jobId });
    
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

    // ========================================
    // Aggregate System-Level Diversity Totals
    // ========================================
    const totalLoad = result.circuits?.reduce(
      (sum: number, c: any) => sum + (c.loadPower || 0),
      0
    ) || 0;

    const diversifiedLoad = result.circuits?.reduce(
      (sum: number, c: any) => sum + (c.calculations?.diversifiedLoad || c.loadPower || 0),
      0
    ) || 0;

    const diversityFactor = totalLoad > 0 ? diversifiedLoad / totalLoad : 0.65;

    // Add system-level totals to result
    result.totalLoad = totalLoad;
    result.diversifiedLoad = diversifiedLoad;
    result.diversityFactor = diversityFactor;
    result.diversityBreakdown = {
      totalConnectedLoad: totalLoad,
      diversifiedLoad: diversifiedLoad,
      overallDiversityFactor: diversityFactor,
      byCategory: result.circuits?.map((c: any) => ({
        name: c.name,
        connectedLoad: c.loadPower || 0,
        diversifiedLoad: c.calculations?.diversifiedLoad || c.loadPower || 0,
        factor: c.calculations?.diversityFactor || 1
      })) || [],
      reasoning: 'Calculated per BS 7671 Appendix A diversity factors'
    };

    logger.info('Diversity totals calculated', {
      totalLoad,
      diversifiedLoad,
      diversityFactor: diversityFactor.toFixed(2)
    });

    // Job-aware mode: Update job - Phase 1 complete, trigger Phase 2
    if (jobId) {
      try {
        // CRITICAL: Sanitize data before save to prevent Unicode errors
        const { sanitizeForPostgres, aggressiveSanitize, isUnicodeError } = await import('../_shared/sanitize-json.ts');
        const sanitizedResult = sanitizeForPostgres(result);
        
        logger.info('Saving design data to database', {
          jobId,
          dataSize: JSON.stringify(sanitizedResult).length,
          circuitCount: sanitizedResult.circuits?.length
        });

        const saveStart = Date.now();
        const { error: updateError } = await supabase
          .from('circuit_design_jobs')
          .update({
            status: 'processing', // Keep processing for Installation Agent (Phase 2)
            // FIXED: Don't regress progress - keep at current level (around 90%), installation agent will continue from here
            current_step: 'Circuit design complete. Generating installation guidance...',
            designer_status: 'complete',
            designer_progress: 100,
            design_data: {
              ...sanitizedResult,
              failedCircuits: result.failedCircuits || { count: 0, names: [] }
            },
            raw_response: sanitizedResult
            // No completed_at yet - job still running Phase 2
          })
          .eq('id', jobId);
        
        const saveDuration = Date.now() - saveStart;
        
        // CRITICAL: Check for database save errors
        if (updateError) {
          logger.error('❌ CRITICAL: Failed to save design data to database', { 
            error: updateError.message,
            code: updateError.code,
            hint: updateError.hint,
            details: updateError.details,
            saveDuration,
            dataSize: JSON.stringify(sanitizedResult).length
          });
          
          // Retry with aggressive sanitization if Unicode error
          if (isUnicodeError(updateError)) {
            logger.warn('🔄 Retrying with aggressive sanitization...');
            const aggressivelySanitizedResult = aggressiveSanitize(result);
            
            const { error: retryError } = await supabase
              .from('circuit_design_jobs')
              .update({
                status: 'processing',
                // FIXED: Don't regress progress on retry either
                current_step: 'Circuit design complete. Generating installation guidance...',
                designer_status: 'complete',
                designer_progress: 100,
                design_data: aggressivelySanitizedResult,
                raw_response: aggressivelySanitizedResult
              })
              .eq('id', jobId);
            
            if (retryError) {
              logger.error('❌ Retry failed - marking job as failed', { error: retryError.message });
              // Mark job as failed with clear message
              await supabase.from('circuit_design_jobs').update({
                status: 'failed',
                error_message: `Design completed but database save failed: ${retryError.message}. This is a system error, not a design error.`,
                completed_at: new Date().toISOString()
              }).eq('id', jobId);
              
              throw new Error(`Database save failed after retry: ${retryError.message}`);
            } else {
              logger.info('✅ Retry successful with aggressive sanitization');
            }
          } else {
            // Non-Unicode error - mark job as failed immediately
            await supabase.from('circuit_design_jobs').update({
              status: 'failed',
              error_message: `Design completed but database save failed: ${updateError.message}`,
              completed_at: new Date().toISOString()
            }).eq('id', jobId);
            
            throw new Error(`Database save failed: ${updateError.message}`);
          }
        } else {
          logger.info('✅ Design data saved successfully', { 
            jobId,
            saveDuration,
            dataSize: JSON.stringify(sanitizedResult).length
          });
        }
        
        logger.info('Phase 1 (Designer) complete - triggering Phase 2 (Installer)', { jobId });

        // ============================================
        // PHASE 2: Trigger Installation Agent (FIRE-AND-FORGET)
        // ============================================
        logger.info('🔧 Launching Installation Agent (fire-and-forget)...');
        
        // Fire-and-forget: Don't await, let it run independently
        // Installation Agent will update job to 'complete' when it finishes
        supabase.functions.invoke('design-installation-agent', {
          body: {
            jobId,
            designedCircuits: result.circuits,
            supply: body.supply,
            projectInfo: body.projectInfo
          }
        }).then(() => {
          logger.info('✅ Installation Agent HTTP response received (ignoring status)');
        }).catch((error) => {
          logger.info('ℹ️ Installation Agent HTTP connection closed (expected for long jobs):', error.message);
          // This is expected - installation agent updates DB directly
        });
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
