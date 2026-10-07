/**
 * mock-revision-nudge — the weekly "questions to revise" nudge (ELE-1815).
 *
 * For every learner who sat a mock in the last 30 days, has 3+ wrong answers
 * due on their revision pile, and wasn't nudged in the last 6 days
 * (mock_revision_nudge_candidates): a bell row and a push, naming their weakest
 * topic and linking straight into a revision round.
 *
 * Service role only (cron). Body:
 *   { dryRun?: boolean }      — list who would be nudged, send nothing
 *   { onlyUserId?: string }   — just this learner (testing)
 */
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { corsHeaders } from '../_shared/cors.ts';
import { captureException } from '../_shared/sentry.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? '';
const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    if (!SERVICE_ROLE || req.headers.get('Authorization') !== `Bearer ${SERVICE_ROLE}`) {
      return json({ error: 'Unauthorised' }, 401);
    }

    const body = await req.json().catch(() => ({}));
    const dryRun = body?.dryRun === true;
    const onlyUserId: string | null = typeof body?.onlyUserId === 'string' ? body.onlyUserId : null;

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE, { auth: { persistSession: false } });
    const { data, error } = await admin.rpc('mock_revision_nudge_candidates', { p_min_due: 3 });
    if (error) throw new Error(error.message);

    const candidates = (
      (data ?? []) as {
        user_id: string;
        due: number;
        weakest_topic: string | null;
        weakest_pct: number | null;
      }[]
    ).filter((c) => !onlyUserId || c.user_id === onlyUserId);

    if (dryRun) return json({ ok: true, dryRun: true, count: candidates.length, candidates });

    let bells = 0;
    let pushes = 0;
    for (const c of candidates) {
      const title = `${c.due} ${c.due === 1 ? 'question' : 'questions'} to revise`;
      // Encouraging, not a telling-off: a 0% doesn't need saying out loud.
      const message = c.weakest_topic
        ? `${c.weakest_topic} is where you're dropping the most marks${
            c.weakest_pct ? ` (${c.weakest_pct}% right so far)` : ''
          }. Five minutes now clears a few.`
        : 'Questions you got wrong in your mocks are due again. Five minutes now clears a few.';
      const link = '/study-centre/mock-exams/revise';

      const { error: bellErr } = await admin.from('user_notifications').insert({
        user_id: c.user_id,
        type: 'mock_revision_nudge',
        title,
        message,
        link,
        metadata: { due: c.due, weakest_topic: c.weakest_topic },
      });
      // The 6-day guard reads this bell row — no bell, no push, or the next
      // run would push them again.
      if (bellErr) continue;
      bells++;

      // Push is best-effort: a learner without a device token still gets the bell.
      try {
        const res = await fetch(`${SUPABASE_URL}/functions/v1/send-push-notification`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${SERVICE_ROLE}` },
          body: JSON.stringify({
            userId: c.user_id,
            title,
            body: message,
            type: 'study',
            // `route` is checked first by the native app (type 'study' alone
            // lands on the generic Study Centre); deep_link for the web worker.
            data: { route: link, deep_link: link },
          }),
        });
        const out = await res.json().catch(() => ({}));
        pushes += Number(out?.sent ?? 0);
      } catch {
        /* push is optional */
      }
    }

    console.log('mock-revision-nudge', { candidates: candidates.length, bells, pushes });
    return json({ ok: true, candidates: candidates.length, bells, pushes });
  } catch (err) {
    await captureException(err, {
      functionName: 'mock-revision-nudge',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return json({ error: err instanceof Error ? err.message : 'failed' }, 500);
  }
});
