/**
 * AI RAMS Generator — single edge function entry point.
 *
 *   POST { action: 'create', jobDescription, projectInfo, jobScale }
 *     1. Auth + parse body.
 *     2. Insert a rams_generation_jobs row.
 *     3. Return { jobId } to the frontend immediately (HTTP 202).
 *     4. EdgeRuntime.waitUntil(prep → dispatch). Prep runs the vision pre-pass
 *        once, then the two agents are dispatched as SEPARATE invocations of
 *        this same function via `run-agent`.
 *
 *   POST { action: 'run-agent', jobId, agent }   [service-role only, internal]
 *     Runs ONE agent in its own isolate.
 *
 *     ELE-1386: the H&S and Method agents used to stream concurrently inside a
 *     single isolate, sharing one Supabase CPU budget. That budget was
 *     exhausted on ~37% of jobs and the isolate was killed
 *     (`Shutdown reason: CPUTime`) before any error handler could run, leaving
 *     the row stuck at `processing` until the reaper swept it. Splitting the
 *     agents gives each its own budget, and means one agent dying now yields a
 *     'partial' with the other half intact rather than a total loss.
 *
 *   POST { action: 'retry-agent', jobId, agent }
 *     Re-run one half of a partial RAMS, also in its own invocation.
 *
 *   POST { action: 'cancel', jobId }
 *     Flip the job to 'cancelled'. Agents check this between stages.
 *
 * Grounding for hazards: bs7671_facets + safety_facets.
 * Grounding for method statement: practical_work_v2 + bs7671_facets.
 * AI: gpt-5.4-mini-2026-03-17 @ 24k max_completion_tokens.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { runRAMSPrep, runAgentPhase } from '../_shared/rams-core.ts';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

declare const EdgeRuntime: { waitUntil: (p: Promise<unknown>) => void } | undefined;

/** Run work in the background if the runtime supports it. */
function background(work: Promise<unknown>): void {
  if (typeof EdgeRuntime !== 'undefined') {
    EdgeRuntime.waitUntil(work);
  } else {
    void work;
  }
}

/**
 * Invoke this same function again for a single agent, so the agent gets a fresh
 * isolate with its own CPU budget. The child returns 202 straight away and does
 * its work in its own background task, so this resolves quickly.
 */
async function dispatchAgent(jobId: string, agent: 'hs' | 'method'): Promise<void> {
  const baseUrl = Deno.env.get('SUPABASE_URL');
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!baseUrl || !serviceKey) throw new Error('SUPABASE_URL / SERVICE_ROLE_KEY missing');

  const res = await fetch(`${baseUrl}/functions/v1/rams-generator`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${serviceKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ action: 'run-agent', jobId, agent }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`dispatch ${agent} failed: ${res.status} ${detail.slice(0, 300)}`);
  }
}

/**
 * Prep once, then fan the two agents out. Dispatched independently so a failure
 * to launch one does not prevent the other from running — the job then lands on
 * 'partial' rather than dying entirely.
 */
async function startGeneration(supabase: any, jobId: string): Promise<void> {
  const ready = await runRAMSPrep(supabase, jobId);
  if (!ready) return; // cancelled, missing, or prep already marked it failed

  const results = await Promise.allSettled([
    dispatchAgent(jobId, 'hs'),
    dispatchAgent(jobId, 'method'),
  ]);

  for (let i = 0; i < results.length; i++) {
    const r = results[i];
    if (r.status === 'rejected') {
      const which = i === 0 ? 'hs' : 'method';
      console.error(`[rams-generator] ${which} dispatch failed:`, r.reason);
      // Mark that half failed so finalise_rams_job isn't left waiting on an
      // agent that was never started. The stall reaper is the final backstop.
      await supabase
        .from('rams_generation_jobs')
        .update(
          which === 'hs'
            ? { hs_agent_status: 'failed' }
            : { installer_agent_status: 'failed' }
        )
        .eq('id', jobId);
      await supabase.rpc('finalise_rams_job', { p_job_id: jobId });
    }
  }
}

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

    // Body must be read before auth so the internal action can be routed on a
    // service-role bearer instead of a user JWT.
    const body = await req.json().catch(() => ({}));
    const action = body?.action ?? 'create';

    // ── Internal: run one agent. Service-role bearer only, never a user. ──
    if (action === 'run-agent') {
      const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      if (authHeader.replace('Bearer ', '') !== serviceKey) {
        return json({ error: 'Forbidden' }, 403);
      }

      const { jobId, agent } = body ?? {};
      if (!jobId || typeof jobId !== 'string') {
        return json({ error: 'jobId is required' }, 400);
      }
      if (agent !== 'hs' && agent !== 'method') {
        return json({ error: 'agent must be "hs" or "method"' }, 400);
      }

      background(
        runAgentPhase(supabase, jobId, agent as 'hs' | 'method').catch((err) => {
          console.error(`[rams-generator] run-agent(${agent}) crashed:`, err);
        })
      );

      return json({ jobId, agent, status: 'running' }, 202);
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''));

    if (authError || !user) {
      return json({ error: 'Unauthorized' }, 401);
    }

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
        return json({ error: `Job is already ${existing.status}, cannot cancel` }, 409);
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

    if (action === 'retry-agent') {
      const { jobId, agent } = body ?? {};
      if (!jobId || typeof jobId !== 'string') {
        return json({ error: 'jobId is required for retry-agent' }, 400);
      }
      if (agent !== 'hs' && agent !== 'method') {
        return json({ error: 'agent must be "hs" or "method"' }, 400);
      }

      const { data: existing } = await supabase
        .from('rams_generation_jobs')
        .select('id, user_id, status, updated_at')
        .eq('id', jobId)
        .maybeSingle();

      if (!existing || existing.user_id !== user.id) {
        return json({ error: 'Job not found or not yours' }, 404);
      }
      if (existing.status === 'processing') {
        // Only block a genuinely live run. A 'processing' job with no activity
        // past the stall window is dead (killed isolate / lost stream) — let the
        // retry take it over instead of bouncing the user with a 409 forever.
        const lastActivityMs = existing.updated_at ? new Date(existing.updated_at).getTime() : 0;
        const isStale = Date.now() - lastActivityMs > 3 * 60 * 1000;
        if (!isStale) {
          return json({ error: 'Job is still running' }, 409);
        }
        console.warn(
          `[rams-generator] reclaiming stale job ${jobId} (no activity > 3m) for retry`
        );
      }

      // Reopen the job so finalise_rams_job can terminate it again once this
      // agent finishes. runAgentPhase never writes `status` itself.
      await supabase
        .from('rams_generation_jobs')
        .update({
          status: 'processing',
          error_message: null,
          completed_at: null,
          ...(agent === 'hs'
            ? { hs_agent_status: 'pending' }
            : { installer_agent_status: 'pending' }),
        })
        .eq('id', jobId);

      background(
        dispatchAgent(jobId, agent as 'hs' | 'method').catch((err) => {
          console.error('[rams-generator] retry dispatch failed:', err);
        })
      );

      return json({ jobId, status: 'pending', retrying: agent }, 202);
    }

    // Default: create
    const { jobDescription, projectInfo, jobScale, attachments } = body ?? {};

    if (
      !jobDescription ||
      typeof jobDescription !== 'string' ||
      jobDescription.trim().length === 0
    ) {
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

    // Attachments are optional. The frontend uploads to the safety-photos
    // bucket and sends an array of { path, name, type, size } back. We
    // store the metadata only; the vision pre-pass signs each path at
    // generation time.
    const safeAttachments = Array.isArray(attachments)
      ? attachments
          .filter(
            (a): a is { path: string; name?: string; type?: string; size?: number } =>
              !!a && typeof a.path === 'string'
          )
          .slice(0, 8)
      : [];

    const { data: job, error: insertError } = await supabase
      .from('rams_generation_jobs')
      .insert({
        user_id: user.id,
        job_description: jobDescription,
        project_info: projectInfo,
        job_scale: jobScale ?? 'commercial',
        attachments: safeAttachments,
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

    // Fire-and-forget: prep, then fan the two agents out into their own
    // invocations. The HTTP response returns now.
    background(
      startGeneration(supabase, job.id).catch((err) => {
        console.error('[rams-generator] startGeneration crashed:', err);
      })
    );

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
