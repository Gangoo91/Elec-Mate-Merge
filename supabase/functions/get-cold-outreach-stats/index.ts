// Admin-only stats endpoint for the Cold Outreach dashboard.
// Aggregates outreach_events + cold_outreach_attribution.

import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, content-type, x-client-info, apikey',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  try {
    const authHeader = req.headers.get('authorization') || '';
    if (!authHeader) throw new Error('missing authorization');

    const userClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const {
      data: { user },
    } = await userClient.auth.getUser();
    if (!user) throw new Error('unauthorized');

    const { data: profile } = await userClient
      .from('profiles')
      .select('admin_role')
      .eq('id', user.id)
      .single();
    if (!profile?.admin_role) throw new Error('admin access required');

    const sb = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const { action = 'summary' } = await req.json().catch(() => ({}));

    if (action === 'summary') {
      // Event counts by type, last 30 days
      const since = new Date(Date.now() - 30 * 86400 * 1000).toISOString();

      const { data: byType } = await sb
        .from('outreach_events')
        .select('event_type')
        .gte('occurred_at', since);

      const eventCounts: Record<string, number> = {};
      for (const e of byType || []) {
        eventCounts[e.event_type] = (eventCounts[e.event_type] || 0) + 1;
      }

      // Attribution counts
      const { data: attr } = await sb
        .from('cold_outreach_attribution')
        .select('source_segment, trial_started_at, converted_to_paid_at');

      const totalAttributed = (attr || []).length;
      const bySegment: Record<string, number> = {};
      let trials = 0;
      let paid = 0;
      for (const a of attr || []) {
        bySegment[a.source_segment || 'other'] = (bySegment[a.source_segment || 'other'] || 0) + 1;
        if (a.trial_started_at) trials++;
        if (a.converted_to_paid_at) paid++;
      }

      // Suppression breakdown
      const { data: supp } = await sb.from('email_suppressions').select('source, reason');

      const suppressionBySource: Record<string, number> = {};
      for (const s of supp || []) {
        suppressionBySource[s.source || 'unknown'] =
          (suppressionBySource[s.source || 'unknown'] || 0) + 1;
      }

      // Events per day (last 14d)
      const since14 = new Date(Date.now() - 14 * 86400 * 1000).toISOString();
      const { data: daily } = await sb
        .from('outreach_events')
        .select('event_type, occurred_at')
        .gte('occurred_at', since14)
        .order('occurred_at', { ascending: true });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const byDay: Record<string, any> = {};
      for (const e of daily || []) {
        const day = e.occurred_at.slice(0, 10);
        if (!byDay[day])
          byDay[day] = { day, sent: 0, opened: 0, replied: 0, bounced: 0, unsubscribed: 0 };
        if (e.event_type === 'email_sent') byDay[day].sent++;
        else if (e.event_type === 'email_opened') byDay[day].opened++;
        else if (e.event_type === 'reply_received' || e.event_type === 'email_replied')
          byDay[day].replied++;
        else if (e.event_type === 'email_bounced') byDay[day].bounced++;
        else if (e.event_type === 'lead_unsubscribed' || e.event_type === 'email_unsubscribed')
          byDay[day].unsubscribed++;
      }

      return new Response(
        JSON.stringify({
          eventCountsLast30Days: eventCounts,
          totalAttributed,
          bySegment,
          trialsStarted: trials,
          paidConversions: paid,
          suppressionBySource,
          totalSuppressions: (supp || []).length,
          byDay: Object.values(byDay),
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'recent_events') {
      const { limit = 50, event_type = null } = await req.json().catch(() => ({}));
      let q = sb
        .from('outreach_events')
        .select('*')
        .order('occurred_at', { ascending: false })
        .limit(limit);
      if (event_type) q = q.eq('event_type', event_type);
      const { data } = await q;
      return new Response(JSON.stringify({ events: data || [] }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'attributed_users') {
      const { data } = await sb
        .from('cold_outreach_attribution')
        .select('*')
        .order('signup_at', { ascending: false })
        .limit(200);
      return new Response(JSON.stringify({ users: data || [] }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'replies') {
      // Replies only, with content
      const { data } = await sb
        .from('outreach_events')
        .select('id, email, reply_subject, reply_text, occurred_at, campaign_id, lead_id')
        .in('event_type', ['reply_received', 'email_replied'])
        .order('occurred_at', { ascending: false })
        .limit(100);
      return new Response(JSON.stringify({ replies: data || [] }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    throw new Error(`unknown action: ${action}`);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: msg }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
