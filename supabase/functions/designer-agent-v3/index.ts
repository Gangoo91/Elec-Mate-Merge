/**
 * Circuit Designer Agent V3
 * Form → RAG (BS 7671 facets + design intelligence) → AI → tripwire safety → save.
 * Single phase. No installation agent.
 */

import { serve, corsHeaders } from '../_shared/deps.ts';
import { createLogger } from '../_shared/logger.ts';
import { DesignPipeline } from './design-pipeline.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { captureException } from '../_shared/sentry.ts';

const VERSION = 'v3.2.0-design-only';

serve(async (req) => {
  let requestId: string | undefined;

  try {
    if (req.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    requestId = crypto.randomUUID();
    const logger = createLogger(requestId);
    const startTime = Date.now();

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    let jobId: string | undefined;

    try {
      const body = await req.json();
      jobId = body.jobId;

      if (body.mode !== 'direct-design') {
        throw new Error('V3 only supports mode: "direct-design"');
      }

      logger.info('V3 Pipeline starting', {
        circuits: body.circuits?.length || 0,
        voltage: body.supply?.voltage,
        phases: body.supply?.phases,
        jobMode: jobId ? 'async-job' : 'direct',
      });

      const updateJobProgress = async (progress: number, step: string) => {
        if (!jobId) return;
        try {
          await supabase
            .from('circuit_design_jobs')
            .update({
              progress,
              current_step: step,
              updated_at: new Date().toISOString(),
            })
            .eq('id', jobId);
        } catch (err) {
          logger.error('Failed to update job progress', { error: err });
        }
      };

      await updateJobProgress(5, 'Searching design knowledge base…');

      const ragProgressCallback = async (msg: string) => {
        logger.info('RAG progress', { message: msg });
        if (jobId) {
          await updateJobProgress(15, msg);
        }
      };

      const circuitProgressCallback = async (
        completed: number,
        total: number,
        circuitName: string
      ) => {
        if (!jobId) return;
        const designerProgress = Math.round((completed / total) * 100);
        const overallProgress = Math.round(20 + (completed / total) * 70); // 20-90%
        try {
          await supabase
            .from('circuit_design_jobs')
            .update({
              designer_progress: designerProgress,
              progress: overallProgress,
              current_step: `Designing circuit ${completed}/${total}: ${circuitName}`,
              updated_at: new Date().toISOString(),
            })
            .eq('id', jobId);
        } catch (err) {
          logger.error('Failed to update circuit progress', { error: err });
        }
      };

      // Per-circuit streaming: insert into circuit_design_partials as each circuit lands.
      // Frontend subscribes to this table via realtime and renders cards live.
      const circuitDoneCallback = async (circuit: any, index: number) => {
        if (!jobId) return;
        try {
          const { sanitizeForPostgres } = await import('../_shared/sanitize-json.ts');
          const sanitisedCircuit = sanitizeForPostgres(circuit);
          const { error: partialError } = await supabase
            .from('circuit_design_partials')
            .upsert(
              {
                job_id: jobId,
                circuit_index: index,
                circuit_data: sanitisedCircuit,
              },
              { onConflict: 'job_id,circuit_index' }
            );
          if (partialError) {
            logger.warn('Failed to insert circuit partial', {
              error: partialError.message,
              index,
            });
          } else {
            logger.info('🟢 Streamed circuit partial', { index, name: circuit.name });
          }
        } catch (err) {
          logger.warn('circuitDoneCallback exception', {
            error: err instanceof Error ? err.message : String(err),
          });
        }
      };

      const pipeline = new DesignPipeline(
        logger,
        requestId,
        ragProgressCallback,
        circuitProgressCallback,
        circuitDoneCallback
      );

      if (jobId) {
        await supabase
          .from('circuit_design_jobs')
          .update({
            designer_status: 'processing',
            designer_progress: 0,
            progress: 20,
            current_step: 'Designer agent started — designing circuits…',
          })
          .eq('id', jobId);
      }
      logger.info('✅ Designer status set to processing', { jobId });

      // Watchdog: auto-fail job if agent crashes without updating status
      const watchdogTimeout = setTimeout(async () => {
        if (jobId) {
          const { data: currentJob } = await supabase
            .from('circuit_design_jobs')
            .select('status')
            .eq('id', jobId)
            .single();

          if (currentJob?.status === 'processing') {
            logger.error('Watchdog timeout — marking job as failed');
            await supabase
              .from('circuit_design_jobs')
              .update({
                status: 'failed',
                error_message: 'Agent timed out after 5 minutes without completing',
                completed_at: new Date().toISOString(),
              })
              .eq('id', jobId);
          }
        }
      }, 300000); // 5 minutes

      let result;
      try {
        result = await pipeline.execute(body);
      } catch (pipelineError) {
        logger.error('Pipeline execution failed', {
          error: pipelineError.message,
          jobId,
        });
        throw pipelineError;
      } finally {
        clearTimeout(watchdogTimeout);
      }

      const duration = Date.now() - startTime;
      logger.info('V3 Pipeline complete', {
        duration,
        circuits: result.circuits?.length || 0,
        fromCache: result.fromCache,
        jobMode: jobId ? 'async-job' : 'direct',
      });

      // Aggregate system-level diversity totals
      const totalLoad =
        result.circuits?.reduce((sum: number, c: any) => sum + (c.loadPower || 0), 0) || 0;

      const diversifiedLoad =
        result.circuits?.reduce(
          (sum: number, c: any) => sum + (c.calculations?.diversifiedLoad || c.loadPower || 0),
          0
        ) || 0;

      const diversityFactor = totalLoad > 0 ? diversifiedLoad / totalLoad : 0.65;

      result.totalLoad = totalLoad;
      result.diversifiedLoad = diversifiedLoad;
      result.diversityFactor = diversityFactor;
      result.diversityBreakdown = {
        totalConnectedLoad: totalLoad,
        diversifiedLoad: diversifiedLoad,
        overallDiversityFactor: diversityFactor,
        byCategory:
          result.circuits?.map((c: any) => ({
            name: c.name,
            connectedLoad: c.loadPower || 0,
            diversifiedLoad: c.calculations?.diversifiedLoad || c.loadPower || 0,
            factor: c.calculations?.diversityFactor || 1,
          })) || [],
        reasoning: 'Calculated per BS 7671 Appendix A diversity factors',
      };

      logger.info('Diversity totals calculated', {
        totalLoad,
        diversifiedLoad,
        diversityFactor: diversityFactor.toFixed(2),
      });

      // Save final design + mark job complete
      if (jobId) {
        try {
          const { sanitizeForPostgres, aggressiveSanitize, isUnicodeError } =
            await import('../_shared/sanitize-json.ts');
          const sanitizedResult = sanitizeForPostgres(result);

          logger.info('Saving design data', {
            jobId,
            dataSize: JSON.stringify(sanitizedResult).length,
            circuitCount: sanitizedResult.circuits?.length,
          });

          const { error: updateError } = await supabase
            .from('circuit_design_jobs')
            .update({
              status: 'complete',
              progress: 100,
              current_step: 'Design complete.',
              designer_status: 'complete',
              designer_progress: 100,
              installation_agent_status: 'skipped', // backwards-compat for old deployed frontend
              installation_agent_progress: 100,
              design_data: {
                ...sanitizedResult,
                failedCircuits: result.failedCircuits || { count: 0, names: [] },
              },
              raw_response: sanitizedResult,
              completed_at: new Date().toISOString(),
            })
            .eq('id', jobId);

          if (updateError) {
            logger.error('Failed to save design data', {
              error: updateError.message,
              code: updateError.code,
            });

            if (isUnicodeError(updateError)) {
              logger.warn('Retrying with aggressive sanitisation…');
              const aggressivelySanitizedResult = aggressiveSanitize(result);

              const { error: retryError } = await supabase
                .from('circuit_design_jobs')
                .update({
                  status: 'complete',
                  progress: 100,
                  current_step: 'Design complete.',
                  designer_status: 'complete',
                  designer_progress: 100,
                  installation_agent_status: 'skipped',
                  installation_agent_progress: 100,
                  design_data: aggressivelySanitizedResult,
                  raw_response: aggressivelySanitizedResult,
                  completed_at: new Date().toISOString(),
                })
                .eq('id', jobId);

              if (retryError) {
                await supabase
                  .from('circuit_design_jobs')
                  .update({
                    status: 'failed',
                    error_message: `Design completed but database save failed: ${retryError.message}.`,
                    completed_at: new Date().toISOString(),
                  })
                  .eq('id', jobId);
                throw new Error(`Database save failed after retry: ${retryError.message}`);
              }
            } else {
              await supabase
                .from('circuit_design_jobs')
                .update({
                  status: 'failed',
                  error_message: `Design completed but database save failed: ${updateError.message}`,
                  completed_at: new Date().toISOString(),
                })
                .eq('id', jobId);
              throw new Error(`Database save failed: ${updateError.message}`);
            }
          } else {
            logger.info('✅ Design saved + job marked complete', { jobId });
          }
        } catch (err) {
          logger.error('Failed to save design data', { error: err });
        }
      }

      return new Response(
        JSON.stringify({
          ...result,
          version: VERSION,
          processingTime: duration,
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    } catch (error) {
      const duration = Date.now() - startTime;

      logger.error('V3 Pipeline failed', {
        error: error.message,
        duration,
        jobId,
      });

      await captureException(error, {
        functionName: 'designer-agent-v3',
        requestUrl: req.url,
        requestMethod: req.method,
        extra: { duration, jobId, requestId },
      });

      if (jobId) {
        try {
          await supabase
            .from('circuit_design_jobs')
            .update({
              status: 'failed',
              error_message: `Design generation failed: ${error.message}`,
              completed_at: new Date().toISOString(),
            })
            .eq('id', jobId);
        } catch (err) {
          logger.error('Failed to mark job as failed', { error: err.message });
        }
      }

      return new Response(
        JSON.stringify({
          success: false,
          error: error.message,
          version: VERSION,
          requestId,
          processingTime: duration,
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
  } catch (fatalError) {
    console.error('FATAL: designer-agent-v3 crashed before logger initialisation', {
      error: fatalError instanceof Error ? fatalError.message : String(fatalError),
      stack: fatalError instanceof Error ? fatalError.stack : undefined,
      requestId,
      timestamp: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({
        success: false,
        error: `Designer agent startup failure: ${fatalError instanceof Error ? fatalError.message : String(fatalError)}`,
        fatal: true,
        requestId,
        version: VERSION,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
