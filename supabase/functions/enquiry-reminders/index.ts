/**
 * Enquiry reminders (ELE-2022) — called by pg_cron with the service role key.
 *
 *   { action: 'nudge' }   every 15 min: one push per account for enquiries left
 *                         untouched for 2h+ (each enquiry nudged once, max 24h old)
 *   { action: 'morning' } 06:30 UTC: "3 enquiries waiting (1 urgent)" per account
 *
 * Pushes go through send-push-notification, which respects quiet hours (queued).
 */

import { createClient, type SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

interface Row {
  id: string;
  user_id: string;
  name: string | null;
  email: string | null;
  summary: string | null;
  urgency: string | null;
  received_at: string;
}

const who = (e: Row) => e.name?.trim().split(/\s+/)[0] || e.email || 'A customer';

/** The account owner plus the firm's active co-admins. */
async function recipients(
  supabase: SupabaseClient,
  ownerId: string
): Promise<string[]> {
  const { data } = await supabase
    .from('employer_admins')
    .select('user_id')
    .eq('employer_id', ownerId)
    .eq('status', 'active');
  return [...new Set([ownerId, ...((data ?? []) as { user_id: string }[]).map((a) => a.user_id)])];
}

async function push(userId: string, title: string, body: string, deepLink: string, category: string) {
  try {
    await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/send-push-notification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
      },
      body: JSON.stringify({ userId, title, body, type: 'default', data: { deep_link: deepLink, category } }),
    });
  } catch (err) {
    console.error('[enquiry-reminders] push failed', err instanceof Error ? err.message : err);
  }
}

function groupByUser(rows: Row[]) {
  const map = new Map<string, Row[]>();
  for (const r of rows) map.set(r.user_id, [...(map.get(r.user_id) ?? []), r]);
  return map;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  if (req.headers.get('authorization') !== `Bearer ${serviceKey}`) {
    return json({ error: 'forbidden' }, 403);
  }

  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, serviceKey);

  try {
    const { action } = await req.json().catch(() => ({ action: null }));

    if (action === 'nudge') {
      // Daytime only (send-push-notification quiet hours are 21–07 UTC). Outside
      // that we leave nudged_at empty so they go out at 07:00, not in a queue dump.
      const hour = new Date().getUTCHours();
      if (hour < 7 || hour >= 21) return json({ ok: true, skipped: 'quiet hours' });
      const now = Date.now();
      const { data, error } = await supabase
        .from('enquiries')
        .select('id, user_id, name, email, summary, urgency, received_at')
        .eq('status', 'new')
        .is('first_actioned_at', null)
        .is('nudged_at', null)
        .eq('is_test', false)
        // Out of area / not their work arrived quietly: don't chase them about it
        .is('fit_note', null)
        .lte('received_at', new Date(now - 2 * 3600_000).toISOString())
        .gte('received_at', new Date(now - 24 * 3600_000).toISOString())
        .limit(500);
      if (error) throw error;
      // Only inboxes that are switched on
      const owners = [...new Set(((data ?? []) as Row[]).map((r) => r.user_id))];
      const { data: on } = owners.length
        ? await supabase.from('enquiry_inboxes').select('user_id').eq('enabled', true).in('user_id', owners)
        : { data: [] };
      const enabled = new Set((on ?? []).map((i) => i.user_id));
      const rows = ((data ?? []) as Row[]).filter((r) => enabled.has(r.user_id));

      for (const [userId, list] of groupByUser(rows)) {
        const first = list[0];
        const title =
          list.length === 1 ? `${who(first)} is still waiting` : `${list.length} enquiries still waiting`;
        const body =
          list.length === 1
            ? `${first.summary ?? 'New enquiry'} · no reply yet. A quick call wins the job.`
            : list.map(who).slice(0, 3).join(', ') + (list.length > 3 ? ' and more' : '') + ' · no reply yet';
        for (const to of await recipients(supabase, userId)) {
          await push(
            to,
            title,
            body,
            list.length === 1 ? `/electrician/enquiries?open=${first.id}` : '/electrician/enquiries',
            'enquiry_nudge'
          );
        }
      }
      if (rows.length) {
        await supabase
          .from('enquiries')
          .update({ nudged_at: new Date().toISOString() })
          .in('id', rows.map((r) => r.id));
      }
      return json({ ok: true, nudged: rows.length });
    }

    if (action === 'morning') {
      const { data, error } = await supabase
        .from('enquiries')
        .select('id, user_id, name, email, summary, urgency, received_at')
        .eq('status', 'new')
        // Only people nobody has replied to yet, from the last 3 days
        .is('first_actioned_at', null)
        .eq('is_test', false)
        .is('fit_note', null)
        .gte('received_at', new Date(Date.now() - 3 * 24 * 3600_000).toISOString())
        .limit(2000);
      if (error) throw error;
      const byUser = groupByUser((data ?? []) as Row[]);

      // Only accounts whose inbox is switched on
      const { data: inboxes } = await supabase
        .from('enquiry_inboxes')
        .select('user_id')
        .eq('enabled', true)
        .in('user_id', [...byUser.keys()]);
      const enabled = new Set((inboxes ?? []).map((i) => i.user_id));

      let sent = 0;
      for (const [userId, list] of byUser) {
        if (!enabled.has(userId)) continue;
        const urgent = list.filter((e) => e.urgency === 'emergency').length;
        const title = `${list.length} ${list.length === 1 ? 'enquiry' : 'enquiries'} waiting for a reply`;
        const body =
          (urgent ? `${urgent} urgent · ` : '') +
          list.map(who).slice(0, 3).join(', ') +
          (list.length > 3 ? ` and ${list.length - 3} more` : '');
        for (const to of await recipients(supabase, userId)) {
          await push(to, title, body, '/electrician/enquiries', 'enquiry_morning');
        }
        sent++;
      }
      return json({ ok: true, accounts: sent });
    }

    return json({ error: 'unknown action' }, 400);
  } catch (err) {
    console.error('[enquiry-reminders] failed', err);
    await captureException(err, { functionName: 'enquiry-reminders', requestUrl: req.url, requestMethod: req.method });
    return json({ error: 'internal error' }, 500);
  }
});
