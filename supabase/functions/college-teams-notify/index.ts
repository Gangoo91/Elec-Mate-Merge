/**
 * college-teams-notify — Microsoft Teams posts for the College Hub tutor inbox
 * (ELE-2056, phase 1, 10 Oct 2026).
 *
 * Callers:
 *   pg_cron (service role)           {"dispatch": true}
 *       For every college with Teams on: outside quiet hours, read the live
 *       inbox (public._college_teams_inbox, the same get_college_inbox the hub
 *       shows), keep the kinds the college chose, drop what was already
 *       posted, and post ONE card listing what is new. Posted keys are stored
 *       only after Teams accepts the card, so a failure is retried next run.
 *       The first run after connecting records the inbox as it stands and
 *       posts nothing, so a new channel is not flooded with the backlog.
 *   A signed-in college admin / head  {"action": "test", "college_id": "..."}
 *       Posts a short "connected" card to the saved webhook.
 *   Any staff member of the college   {"action": "preview", "college_id": "..."}
 *       Returns the card the next run would post, without posting or marking.
 *
 * The webhook URL is a secret. It is read from Vault through a service-role
 * RPC, used for one fetch, and never logged, returned or written anywhere:
 * errors keep only the HTTP status (fetch errors can quote the URL). This
 * function is deliberately not wrapped in withSentry, which reports request
 * context. verify_jwt stays on (cron sends the service key, the hub a user JWT).
 */

import { createClient } from '../_shared/deps.ts';
import { corsHeaders } from '../_shared/cors.ts';
import { identifyCaller, isAdminUser } from '../_shared/caller.ts';
import {
  KIND_CATEGORY,
  buildInboxCard,
  buildTestCard,
  inQuietHours,
  postCard,
  teamsUrlOk,
  type InboxItem,
} from '../_shared/teamsCard.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

interface Hook {
  college_id: string;
  enabled: boolean;
  categories: string[];
  quiet_hours: boolean;
  include_names: boolean;
  baseline_at: string | null;
  posted_total: number;
}

// deno-lint-ignore no-explicit-any
type Db = any;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);
  try {
    const caller = await identifyCaller(req);
    if (!caller) return json({ error: 'unauthorised' }, 401);
    const db = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;

    if (caller.kind === 'service') {
      if (body.dispatch !== true) return json({ error: 'bad_request' }, 400);
      const only = typeof body.college_id === 'string' ? body.college_id : null;
      let q = db
        .from('college_teams_webhooks')
        .select(
          'college_id, enabled, categories, quiet_hours, include_names, baseline_at, posted_total'
        )
        .eq('enabled', true);
      if (only) q = q.eq('college_id', only);
      const { data: hooks, error } = await q;
      if (error) throw new Error(`hooks: ${error.message}`);
      const results = [];
      for (const h of (hooks ?? []) as Hook[]) results.push(await dispatch(db, h, false));
      return json({ ok: true, colleges: results.length, results });
    }

    // A signed-in person: test or preview for their own college.
    const collegeId = typeof body.college_id === 'string' ? body.college_id : '';
    if (!/^[0-9a-f-]{36}$/i.test(collegeId)) return json({ error: 'bad_request' }, 400);
    const { data: staff } = await db
      .from('college_staff')
      .select('role, name')
      .eq('college_id', collegeId)
      .eq('user_id', caller.userId)
      .is('archived_at', null)
      .limit(1)
      .maybeSingle();
    const platformAdmin = await isAdminUser(caller.userId);
    if (!staff && !platformAdmin)
      return json({ error: 'forbidden', message: 'You are not staff at this college.' }, 403);
    const manager =
      platformAdmin || ['admin', 'head_of_department'].includes(String(staff?.role ?? ''));

    const { data: hook } = await db
      .from('college_teams_webhooks')
      .select(
        'college_id, enabled, categories, quiet_hours, include_names, baseline_at, posted_total'
      )
      .eq('college_id', collegeId)
      .maybeSingle();
    if (!hook) return json({ error: 'not_connected', message: 'Teams is not connected yet.' }, 404);

    if (body.action === 'preview') return json(await dispatch(db, hook as Hook, true));

    if (body.action === 'test') {
      if (!manager)
        return json(
          {
            error: 'forbidden',
            message: 'Only a college admin or head of department can send a test.',
          },
          403
        );
      const url = await webhookUrl(db, collegeId);
      if (!url)
        return json({ error: 'not_connected', message: 'Teams is not connected yet.' }, 404);
      const name = await collegeName(db, collegeId);
      const r = await postCard(url, buildTestCard(name, (staff?.name as string | null) ?? null));
      await db
        .from('college_teams_webhooks')
        .update({
          last_status: r.status,
          last_error: r.error,
          last_run_at: new Date().toISOString(),
        })
        .eq('college_id', collegeId);
      return json(
        { ok: r.ok, status: r.status, message: r.ok ? 'Sent. Check the channel.' : r.error },
        r.ok ? 200 : 502
      );
    }
    return json({ error: 'bad_request' }, 400);
  } catch (e) {
    // The message never includes a webhook URL (see postCard).
    console.error('college-teams-notify:', (e as Error).message);
    return json(
      { error: 'server_error', message: 'Something went wrong. Try again shortly.' },
      500
    );
  }
});

async function webhookUrl(db: Db, collegeId: string): Promise<string | null> {
  const { data, error } = await db.rpc('_college_teams_url', { p_college: collegeId });
  if (error) throw new Error('could not read the webhook');
  const url = typeof data === 'string' ? data : null;
  return url && teamsUrlOk(url) ? url : null;
}

async function collegeName(db: Db, collegeId: string): Promise<string> {
  const { data } = await db.from('colleges').select('name').eq('id', collegeId).maybeSingle();
  return (data?.name as string | undefined) ?? 'Your college';
}

async function dispatch(db: Db, h: Hook, preview: boolean) {
  const out: Record<string, unknown> = { college_id: h.college_id };
  if (!preview && h.quiet_hours && inQuietHours()) return { ...out, skipped: 'quiet_hours' };

  const { data: inbox, error } = await db.rpc('_college_teams_inbox', { p_college: h.college_id });
  if (error) {
    if (!preview)
      await db
        .from('college_teams_webhooks')
        .update({ last_run_at: new Date().toISOString(), last_error: 'Could not read the inbox.' })
        .eq('college_id', h.college_id);
    return { ...out, skipped: 'inbox_unreadable' };
  }
  const all = ((inbox?.items ?? []) as InboxItem[]).filter((i) => {
    const cat = KIND_CATEGORY[i.kind];
    return !!cat && h.categories.includes(cat);
  });

  const { data: postedRows } = await db
    .from('college_teams_posted')
    .select('item_key')
    .eq('college_id', h.college_id);
  const posted = new Set(
    ((postedRows ?? []) as Array<{ item_key: string }>).map((r) => r.item_key)
  );
  const fresh = all.filter((i) => !posted.has(i.key));
  const name = await collegeName(db, h.college_id);

  if (preview) {
    const items = h.baseline_at ? fresh : [];
    return {
      ...out,
      baseline: !h.baseline_at,
      in_quiet_hours: h.quiet_hours && inQuietHours(),
      inbox_items: all.length,
      would_post: items.length,
      card: items.length
        ? buildInboxCard(items, { collegeName: name, includeNames: h.include_names })
        : null,
    };
  }

  const now = new Date().toISOString();
  const mark = async (keys: string[]) => {
    for (let i = 0; i < keys.length; i += 500) {
      const rows = keys
        .slice(i, i + 500)
        .map((k) => ({ college_id: h.college_id, item_key: k, posted_at: now }));
      await db
        .from('college_teams_posted')
        .upsert(rows, { onConflict: 'college_id,item_key', ignoreDuplicates: true });
    }
  };

  // Housekeeping: keys for items that have left the inbox go after 60 days.
  await db
    .from('college_teams_posted')
    .delete()
    .eq('college_id', h.college_id)
    .lt('posted_at', new Date(Date.now() - 60 * 864e5).toISOString());

  if (!h.baseline_at) {
    await mark(all.map((i) => i.key));
    await db
      .from('college_teams_webhooks')
      .update({ baseline_at: now, last_run_at: now })
      .eq('college_id', h.college_id);
    return { ...out, baseline: all.length };
  }
  if (fresh.length === 0) {
    await db
      .from('college_teams_webhooks')
      .update({ last_run_at: now })
      .eq('college_id', h.college_id);
    return { ...out, posted: 0 };
  }

  const url = await webhookUrl(db, h.college_id);
  if (!url) return { ...out, skipped: 'no_url' };
  const r = await postCard(
    url,
    buildInboxCard(fresh, { collegeName: name, includeNames: h.include_names })
  );
  if (r.ok) await mark(fresh.map((i) => i.key));
  await db
    .from('college_teams_webhooks')
    .update({
      last_run_at: now,
      last_status: r.status,
      last_error: r.error,
      ...(r.ok ? { last_posted_at: now, posted_total: (h.posted_total ?? 0) + fresh.length } : {}),
    })
    .eq('college_id', h.college_id);
  return { ...out, posted: r.ok ? fresh.length : 0, status: r.status };
}
