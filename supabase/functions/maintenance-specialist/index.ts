/**
 * Maintenance Specialist — single edge function entry point.
 *
 * Replaces `create-maintenance-method-job`, `process-maintenance-method-job`,
 * `cancel-maintenance-method-job`, and the old `maintenance-v3` standalone.
 *
 *   1. Auth + parse body.
 *   2. Insert a maintenance_method_jobs row.
 *   3. Return { jobId } to the frontend immediately (HTTP 202).
 *   4. EdgeRuntime.waitUntil(runMaintenanceMethod) — background pipeline.
 *      Frontend subscribes to `maintenance_method_partials` realtime and
 *      watches `maintenance_method_jobs.status` for terminal state.
 *
 * RAG: `bs7671_facets` (regulations) + `practical_work_intelligence`
 * (hands-on procedures, hybrid RRF v2, facet_types: maintenance/testing).
 * Validation: every emitted reg cite is checked against `bs7671_facets`.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { runMaintenanceMethod } from '../_shared/maintenance-specialist-core.ts';
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
      equipmentDetails?: Record<string, unknown>;
      detailLevel?: string;
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

    // Cancel
    if (body?.action === 'cancel') {
      if (!body.jobId) return json({ error: 'jobId required to cancel' }, 400);
      const { error } = await supabase
        .from('maintenance_method_jobs')
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

    // Generate
    const query = body?.query?.toString().trim();
    const attachments = Array.isArray(body?.attachments) ? body.attachments : [];
    if ((!query || query.length === 0) && attachments.length === 0) {
      return json({ error: 'Either a description or at least one attachment is required.' }, 400);
    }

    const { data: job, error: insertError } = await supabase
      .from('maintenance_method_jobs')
      .insert({
        user_id: user.id,
        query: query ?? '',
        equipment_details: body?.equipmentDetails ?? {},
        detail_level: body?.detailLevel ?? 'standard',
        attachments,
        status: 'pending',
        progress: 0,
        current_step: 'Queued',
      })
      .select('id')
      .single();

    if (insertError || !job) {
      console.error('[maintenance-specialist] insert failed:', insertError);
      return json({ error: insertError?.message ?? 'Failed to create job' }, 500);
    }

    const work = runMaintenanceMethod(supabase, job.id).catch((err) => {
      console.error('[maintenance-specialist] background worker crashed:', err);
    });

    if (typeof EdgeRuntime !== 'undefined') {
      EdgeRuntime.waitUntil(work);
    } else {
      void work;
    }

    return json({ jobId: job.id, status: 'pending' }, 202);
  } catch (err: any) {
    await captureException(err, { functionName: 'maintenance-specialist', requestUrl: req.url, requestMethod: req.method });
    console.error('[maintenance-specialist] fatal:', err);
    return json({ error: err?.message ?? 'Unknown error' }, 500);
  }
});

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
