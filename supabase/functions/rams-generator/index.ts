/**
 * AI RAMS Generator — single edge function entry point.
 *
 * Replaces the old three-function dance (create-rams-job +
 * generate-rams + cancel-rams-job). One file:
 *
 *   POST { action: 'create', jobDescription, projectInfo, jobScale }
 *     1. Auth + parse body.
 *     2. Insert a rams_generation_jobs row.
 *     3. Return { jobId } to the frontend immediately (HTTP 202).
 *     4. EdgeRuntime.waitUntil(runRAMSGeneration) — background task runs
 *        the parallel H&S + Method statement pipeline. Frontend subscribes
 *        to rams_partials via realtime and polls rams_generation_jobs for
 *        terminal status.
 *
 *   POST { action: 'cancel', jobId }
 *     Flip the job to 'cancelled'. The worker checks this between stages
 *     and exits cleanly without writing partial output.
 *
 * Grounding for hazards: bs7671_facets + safety_facets.
 * Grounding for method statement: practical_work_v2 + bs7671_facets.
 * AI: gpt-5.4-mini-2026-03-17 @ 24k max_completion_tokens, two calls in
 * parallel via Promise.allSettled. Target ~60s total.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { runRAMSGeneration } from '../_shared/rams-core.ts';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

declare const EdgeRuntime: { waitUntil: (p: Promise<unknown>) => void } | undefined;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return json({ error: 'No authorization header' }, 401);
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''));

    if (authError || !user) {
      return json({ error: 'Unauthorized' }, 401);
    }

    const body = await req.json().catch(() => ({}));
    const action = body?.action ?? 'create';

    if (action === 'cancel') {
      const { jobId } = body ?? {};
      if (!jobId || typeof jobId !== 'string') {
        return json({ error: 'jobId is required for cancel' }, 400);
      }

      // Check ownership + current status before cancelling.
      const { data: existing } = await supabase
        .from('rams_generation_jobs')
        .select('id, user_id, status')
        .eq('id', jobId)
        .maybeSingle();

      if (!existing || existing.user_id !== user.id) {
        return json({ error: 'Job not found or not yours' }, 404);
      }

      if (
        existing.status === 'complete' ||
        existing.status === 'failed' ||
        existing.status === 'cancelled' ||
        existing.status === 'partial'
      ) {
        return json(
          { error: `Job is already ${existing.status}, cannot cancel` },
          409
        );
      }

      const { error: cancelError } = await supabase
        .from('rams_generation_jobs')
        .update({
          status: 'cancelled',
          current_step: 'Cancelled by user',
          completed_at: new Date().toISOString(),
        })
        .eq('id', jobId)
        .eq('user_id', user.id);

      if (cancelError) {
        console.error('[rams-generator] cancel failed:', cancelError);
        return json({ error: cancelError.message }, 500);
      }

      return json({ success: true });
    }

    // Default: create
    const { jobDescription, projectInfo, jobScale } = body ?? {};

    if (!jobDescription || typeof jobDescription !== 'string' || jobDescription.trim().length === 0) {
      return json({ error: 'jobDescription is required' }, 400);
    }
    if (!projectInfo || typeof projectInfo !== 'object') {
      return json({ error: 'projectInfo is required' }, 400);
    }
    if (
      jobScale &&
      jobScale !== 'domestic' &&
      jobScale !== 'commercial' &&
      jobScale !== 'industrial'
    ) {
      return json({ error: 'jobScale must be domestic | commercial | industrial' }, 400);
    }

    const { data: job, error: insertError } = await supabase
      .from('rams_generation_jobs')
      .insert({
        user_id: user.id,
        job_description: jobDescription,
        project_info: projectInfo,
        job_scale: jobScale ?? 'commercial',
        status: 'pending',
        progress: 0,
        current_step: 'Queued',
        hs_agent_status: 'pending',
        installer_agent_status: 'pending',
        hs_agent_progress: 0,
        installer_agent_progress: 0,
      })
      .select('id')
      .single();

    if (insertError || !job) {
      console.error('[rams-generator] insert failed:', insertError);
      return json({ error: insertError?.message ?? 'Failed to create job' }, 500);
    }

    // Fire-and-forget: the runtime keeps the worker alive until done so
    // the HTTP response can return now.
    const work = runRAMSGeneration(supabase, job.id).catch((err) => {
      console.error('[rams-generator] background worker crashed:', err);
    });

    if (typeof EdgeRuntime !== 'undefined') {
      EdgeRuntime.waitUntil(work);
    } else {
      // Local dev (deno run) — just kick it off best-effort.
      void work;
    }

    return json({ jobId: job.id, status: 'pending' }, 202);
  } catch (err: any) {
    console.error('[rams-generator] fatal:', err);
    await captureException(err, {
      functionName: 'rams-generator',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return json({ error: err?.message ?? 'Unknown error' }, 500);
  }
});

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
