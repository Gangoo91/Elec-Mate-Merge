/**
 * Cost Engineer — single edge function entry point.
 *
 * Replaces the old three-function dance (create-cost-engineer-job +
 * process-cost-engineer-job + cost-engineer-v3). One file:
 *
 *   1. Auth + parse body.
 *   2. Insert a cost_engineer_jobs row.
 *   3. Return { jobId } to the frontend immediately (HTTP 202).
 *   4. EdgeRuntime.waitUntil(runEstimate) — background task does the
 *      two-stage pipeline. Frontend subscribes to cost_engineer_partials
 *      via realtime and polls cost_engineer_jobs for terminal status.
 *
 * Pricing comes from `marketplace_products` (live elec-pipeline / crawl4ai
 * data on the VPS). Compliance grounding from `bs7671_facets` (BS 7671
 * main + OSG + GN3 + AM4:2026). Labour from `practical_work_intelligence`.
 * Business settings from `user_business_settings` (table, never trusted
 * from the request body).
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { runEstimate } from '../_shared/cost-engineer-core.ts';
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
    const {
      query,
      region,
      projectContext,
      refineMode,
      parentJobId,
    } = body ?? {};

    const isRefinement = typeof refineMode === 'string' && refineMode !== 'fresh';
    if (isRefinement) {
      if (!parentJobId || typeof parentJobId !== 'string') {
        return json({ error: 'parentJobId is required for refinement' }, 400);
      }
      if (!['cheaper', 'premium', 'phase'].includes(refineMode)) {
        return json({ error: 'refineMode must be cheaper | premium | phase' }, 400);
      }
    } else if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return json({ error: 'query is required' }, 400);
    }

    // For refinements, inherit query/region/projectContext from the parent
    // so the worker has the same starting brief without the frontend
    // having to pass everything back.
    let inheritedQuery = query;
    let inheritedRegion = region;
    let inheritedContext = projectContext;
    if (isRefinement && parentJobId) {
      const { data: parent } = await supabase
        .from('cost_engineer_jobs')
        .select('query, region, project_context')
        .eq('id', parentJobId)
        .eq('user_id', user.id)
        .maybeSingle();
      if (!parent) {
        return json({ error: 'Parent job not found or not yours' }, 404);
      }
      inheritedQuery = inheritedQuery ?? parent.query;
      inheritedRegion = inheritedRegion ?? parent.region;
      inheritedContext = inheritedContext ?? parent.project_context;
    }

    const { data: job, error: insertError } = await supabase
      .from('cost_engineer_jobs')
      .insert({
        user_id: user.id,
        query: inheritedQuery,
        region: inheritedRegion ?? 'other',
        project_context: inheritedContext ?? {},
        business_settings: body?.businessSettings ?? null,
        refine_of: isRefinement ? parentJobId : null,
        refine_mode: isRefinement ? refineMode : null,
        status: 'pending',
        progress: 0,
        current_step: isRefinement ? `Refining (${refineMode})` : 'Queued',
      })
      .select('id')
      .single();

    if (insertError || !job) {
      console.error('[cost-engineer] insert failed:', insertError);
      return json({ error: insertError?.message ?? 'Failed to create job' }, 500);
    }

    // Fire-and-forget: the runtime keeps the worker alive until done so
    // the HTTP response can return now.
    const work = runEstimate(supabase, job.id).catch((err) => {
      console.error('[cost-engineer] background worker crashed:', err);
    });

    if (typeof EdgeRuntime !== 'undefined') {
      EdgeRuntime.waitUntil(work);
    } else {
      // Local dev (deno run) — just await it best-effort.
      void work;
    }

    return json({ jobId: job.id, status: 'pending' }, 202);
  } catch (err: any) {
    console.error('[cost-engineer] fatal:', err);
    await captureException(err, {
      functionName: 'cost-engineer',
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
