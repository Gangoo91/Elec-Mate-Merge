/**
 * Installation Specialist — single edge function entry point.
 *
 * Replaces the old fragmented stack (`create-installation-method-job`,
 * `process-installation-method-job`, `cancel-installation-method-job`,
 * `installation-method-agent`, `installer-agent`, `installer-v3`).
 *
 *   1. Auth + parse body.
 *   2. Insert an installation_method_jobs row.
 *   3. Return { jobId } to the frontend immediately (HTTP 202).
 *   4. EdgeRuntime.waitUntil(runMethodStatement) — background task does
 *      the pipeline (attachments → vision → RAG → AI → finalise).
 *      Frontend subscribes to installation_method_partials via realtime
 *      and watches installation_method_jobs.status for terminal state.
 *
 * RAG comes from `bs7671_facets` (regulations) + `practical_work_intelligence`
 * (hands-on procedures, hybrid RRF v2). Both via shared helpers.
 *
 * The `rams_generation_jobs.installation_job_id` FK still points at our
 * jobs table, so existing RAMS links keep working.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { runMethodStatement } from '../_shared/installation-specialist-core.ts';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

declare const EdgeRuntime: { waitUntil: (p: Promise<unknown>) => void } | undefined;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return json({ error: 'No authorization header' }, 401);

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''));
    if (authError || !user) return json({ error: 'Unauthorized' }, 401);

    const body = (await req.json().catch(() => ({}))) as {
      query?: string;
      projectDetails?: Record<string, unknown>;
      designerContext?: Record<string, unknown> | null;
      attachments?: Array<{
        id: string;
        fileName: string;
        fileType: string;
        fileSize: number;
        storagePath: string;
        kind?: string;
      }>;
      action?: 'generate' | 'cancel';
      jobId?: string;
    };

    // Cancel path
    if (body?.action === 'cancel') {
      if (!body.jobId) return json({ error: 'jobId required to cancel' }, 400);
      const { error } = await supabase
        .from('installation_method_jobs')
        .update({
          status: 'cancelled',
          completed_at: new Date().toISOString(),
          current_step: 'Cancelled',
        })
        .eq('id', body.jobId)
        .eq('user_id', user.id);
      if (error) return json({ error: error.message }, 500);
      return json({ ok: true });
    }

    // Generate path
    const query = body?.query?.toString().trim();
    const attachments = Array.isArray(body?.attachments) ? body.attachments : [];
    if ((!query || query.length === 0) && attachments.length === 0) {
      return json({ error: 'Either a description or at least one attachment is required.' }, 400);
    }

    const { data: job, error: insertError } = await supabase
      .from('installation_method_jobs')
      .insert({
        user_id: user.id,
        query: query ?? '',
        project_details: body?.projectDetails ?? {},
        designer_context: body?.designerContext ?? null,
        attachments,
        status: 'pending',
        progress: 0,
        current_step: 'Queued',
      })
      .select('id')
      .single();

    if (insertError || !job) {
      console.error('[installation-specialist] insert failed:', insertError);
      return json({ error: insertError?.message ?? 'Failed to create job' }, 500);
    }

    // Fire-and-forget background work.
    const work = runMethodStatement(supabase, job.id).catch((err) => {
      console.error('[installation-specialist] background worker crashed:', err);
    });

    if (typeof EdgeRuntime !== 'undefined') {
      EdgeRuntime.waitUntil(work);
    } else {
      void work;
    }

    return json({ jobId: job.id, status: 'pending' }, 202);
  } catch (err: any) {
    await captureException(err, { functionName: 'installation-specialist', requestUrl: req.url, requestMethod: req.method });
    console.error('[installation-specialist] fatal:', err);
    return json({ error: err?.message ?? 'Unknown error' }, 500);
  }
});

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
