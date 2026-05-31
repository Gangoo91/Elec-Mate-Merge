/**
 * announcement-push
 *
 * Sends an admin announcement out as a push notification.
 *   mode = 'test'     → push only to the calling admin (safe preview).
 *   mode = 'audience' → push to every user whose role matches the
 *                       announcement's target_roles and who has an active push
 *                       subscription, in rate-limited batches, with per-recipient
 *                       tracking for delivery + (later) open/tap rates.
 *
 * Admin-only (mirrors admin-manage-announcements auth). Reuses
 * send-push-notification so web / iOS / Android + quiet-hours + token pruning
 * are all handled in one place.
 */

import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? 'https://jtwygbeceundfgnkirof.supabase.co';
const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-request-id',
};

const BATCH_SIZE = 25; // concurrent pushes per batch — gentle on the push fan-out

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function pushTo(
  userId: string,
  title: string,
  body: string,
  announcementId: string,
  linkUrl: string | null
): Promise<{ ok: boolean; delivered: boolean; error?: string }> {
  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/send-push-notification`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${SERVICE_ROLE}` },
      body: JSON.stringify({
        userId,
        title,
        body,
        type: 'announcement',
        data: {
          announcementId,
          // One-tap destination — handlers route 'announcement' to this, else home.
          deep_link: linkUrl || '/dashboard',
        },
      }),
    });
    const out = await res.json().catch(() => ({}));
    const delivered = Number(out?.sent ?? 0) > 0 || out?.queued === true;
    return { ok: res.ok, delivered };
  } catch (err) {
    return { ok: false, delivered: false, error: err instanceof Error ? err.message : String(err) };
  }
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    // ── Admin auth (same pattern as admin-manage-announcements) ──
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return json({ error: 'No authorization header' }, 401);

    const authed = createClient(SUPABASE_URL, Deno.env.get('SUPABASE_ANON_KEY') ?? '', {
      global: { headers: { Authorization: authHeader } },
    });
    const {
      data: { user },
    } = await authed.auth.getUser();
    if (!user) return json({ error: 'Unauthorized' }, 401);

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { data: callerProfile } = await admin
      .from('profiles')
      .select('admin_role')
      .eq('id', user.id)
      .maybeSingle();
    if (!callerProfile?.admin_role) return json({ error: 'Admin access required' }, 403);

    const { announcementId, mode, roles: bodyRoles } = await req.json();

    // Estimate mode: how many push-eligible users for these roles? (no announcement
    // needed — powers the live "≈ N people" reach estimate in the composer)
    if (mode === 'estimate') {
      const roles = (bodyRoles || []).filter((r: string) => r && r !== 'visitor');
      if (roles.length === 0) return json({ ok: true, recipients: 0 });
      const { data: targets } = await admin.from('profiles').select('id').in('role', roles);
      const targetIds = (targets || []).map((t) => t.id);
      if (targetIds.length === 0) return json({ ok: true, recipients: 0 });
      const { data: subscribed } = await admin
        .from('push_subscriptions')
        .select('user_id')
        .in('user_id', targetIds)
        .eq('is_active', true);
      const recipients = new Set((subscribed || []).map((s) => s.user_id)).size;
      return json({ ok: true, recipients });
    }

    if (!announcementId || !['test', 'audience'].includes(mode)) {
      return json({ error: 'announcementId and mode (test|audience|estimate) required' }, 400);
    }

    const { data: ann, error: annErr } = await admin
      .from('admin_announcements')
      .select('id, title, message, target_roles, link_url')
      .eq('id', announcementId)
      .maybeSingle();
    if (annErr || !ann) return json({ error: 'Announcement not found' }, 404);

    const title = (ann.title || 'Elec-Mate').toString();
    const body = (ann.message || '').toString();
    const linkUrl = (ann.link_url as string) || null;

    // ── Test: just the calling admin ──
    if (mode === 'test') {
      const r = await pushTo(user.id, title, body, ann.id, linkUrl);
      await admin.from('announcement_push_recipients').insert({
        announcement_id: ann.id,
        user_id: user.id,
        status: r.delivered ? 'delivered' : 'failed',
        is_test: true,
        error: r.error ?? null,
      });
      return json({ ok: true, mode: 'test', delivered: r.delivered });
    }

    // ── Audience: resolve target users with an active push subscription ──
    const roles = (ann.target_roles || []).filter((r: string) => r && r !== 'visitor');
    if (roles.length === 0) return json({ error: 'No push-eligible roles on this announcement' }, 400);

    const { data: targets } = await admin
      .from('profiles')
      .select('id')
      .in('role', roles);
    const targetIds = (targets || []).map((t) => t.id);
    if (targetIds.length === 0) return json({ ok: true, mode: 'audience', recipients: 0, delivered: 0 });

    // Only users with at least one active subscription (push fan-out handles the rest)
    const { data: subscribed } = await admin
      .from('push_subscriptions')
      .select('user_id')
      .in('user_id', targetIds)
      .eq('is_active', true);
    const recipientIds = [...new Set((subscribed || []).map((s) => s.user_id))];

    let delivered = 0;
    for (let i = 0; i < recipientIds.length; i += BATCH_SIZE) {
      const batch = recipientIds.slice(i, i + BATCH_SIZE);
      const results = await Promise.all(
        batch.map((uid) => pushTo(uid, title, body, ann.id, linkUrl))
      );
      const rows = batch.map((uid, idx) => ({
        announcement_id: ann.id,
        user_id: uid,
        status: results[idx].delivered ? 'delivered' : 'failed',
        is_test: false,
        error: results[idx].error ?? null,
      }));
      await admin.from('announcement_push_recipients').insert(rows);
      delivered += results.filter((r) => r.delivered).length;
    }

    await admin
      .from('admin_announcements')
      .update({
        push_sent_at: new Date().toISOString(),
        push_recipient_count: recipientIds.length,
        push_delivered_count: delivered,
      })
      .eq('id', ann.id);

    return json({ ok: true, mode: 'audience', recipients: recipientIds.length, delivered });
  } catch (err) {
    console.error('announcement-push error', err instanceof Error ? err.message : err);
    return json({ error: 'Failed to send announcement push' }, 500);
  }
};

serve(handler);
