/**
 * Send-cheatsheet-campaign — one endpoint, four audience-targeted emails.
 *
 * Audiences:
 *   apprentice       — profiles.role = 'apprentice' AND subscribed = true
 *   winback          — profiles with a cancelled subscription (subscription_end set)
 *   early_access     — early_access_invites where never claimed + never bounced
 *   signup_failure   — profiles with no subscription + auth user exists + not free access
 *
 * Invoke body:
 *   audience: 'apprentice' | 'winback' | 'early_access' | 'signup_failure'
 *   dry_run?: boolean         — returns recipients, sends nothing
 *   test_to?: string          — single-address test send, bypasses audience query
 *   test_first_name?: string  — first name used in the test email greeting
 *   limit?: number            — cap recipients (for staged rollouts — e.g. 10 at a time)
 *
 * ENV VARS:
 *   BREVO_API_KEY                   — used by the shared sender
 *   LEAD_MAGNET_CHEATSHEET_URL      — the PDF link each email points to
 *   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY — read profiles + auth.users
 */

import { serve, corsHeaders, createClient } from '../_shared/deps.ts';
import {
  sendCheatsheetCampaignEmail,
  type CheatsheetAudience,
} from '../_shared/cheatsheet-campaigns.ts';

interface Payload {
  audience: CheatsheetAudience;
  dry_run?: boolean;
  test_to?: string;
  test_first_name?: string;
  limit?: number;
}

interface Recipient {
  email: string;
  first_name?: string;
}

function firstNameOf(fullName: string | null | undefined): string | undefined {
  if (!fullName) return undefined;
  const first = fullName.trim().split(/\s+/)[0];
  return first || undefined;
}

async function fetchApprenticeRecipients(
  // deno-lint-ignore no-explicit-any
  sb: any
): Promise<Recipient[]> {
  // Active paying apprentices — include lapsed apprentices too? No — we have
  // a separate winback flow for them. Keep this list tight to paying users.
  const { data, error } = await sb
    .from('profiles')
    .select('id, full_name')
    .eq('role', 'apprentice')
    .eq('subscribed', true);
  if (error) throw error;
  const ids = (data || []).map((r: { id: string }) => r.id);
  if (!ids.length) return [];
  const { data: users, error: usersErr } = await sb.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  });
  if (usersErr) throw usersErr;
  const byId = new Map<string, string>();
  for (const u of users?.users || []) {
    if (u.id && u.email) byId.set(u.id, u.email.toLowerCase());
  }
  return (data || [])
    .map((p: { id: string; full_name: string | null }) => ({
      email: byId.get(p.id) || '',
      first_name: firstNameOf(p.full_name),
    }))
    .filter((r: Recipient) => r.email);
}

async function fetchWinbackRecipients(
  // deno-lint-ignore no-explicit-any
  sb: any
): Promise<Recipient[]> {
  const { data, error } = await sb
    .from('profiles')
    .select('id, full_name')
    .eq('subscribed', false)
    .not('subscription_end', 'is', null);
  if (error) throw error;
  const ids = (data || []).map((r: { id: string }) => r.id);
  if (!ids.length) return [];
  const { data: users, error: usersErr } = await sb.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  });
  if (usersErr) throw usersErr;
  const byId = new Map<string, string>();
  for (const u of users?.users || []) {
    if (u.id && u.email) byId.set(u.id, u.email.toLowerCase());
  }
  return (data || [])
    .map((p: { id: string; full_name: string | null }) => ({
      email: byId.get(p.id) || '',
      first_name: firstNameOf(p.full_name),
    }))
    .filter((r: Recipient) => r.email);
}

async function fetchEarlyAccessRecipients(
  // deno-lint-ignore no-explicit-any
  sb: any
): Promise<Recipient[]> {
  // People who got the early-access invite and never claimed + never bounced.
  // No first_name column on the table, so everyone gets "Hi mate,".
  const { data, error } = await sb
    .from('early_access_invites')
    .select('email')
    .is('claimed_at', null)
    .is('bounced_at', null)
    .not('email', 'is', null);
  if (error) throw error;
  return (data || [])
    .map((r: { email: string | null }) => ({
      email: (r.email || '').toLowerCase(),
      first_name: undefined,
    }))
    .filter((r: Recipient) => r.email);
}

async function fetchSignupFailureRecipients(
  // deno-lint-ignore no-explicit-any
  sb: any
): Promise<Recipient[]> {
  // Users who created an account but never subscribed and don't have free access.
  // Wait at least 1 day after signup so people who JUST registered aren't
  // hit before they've even had a chance to start a trial.
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { data, error } = await sb
    .from('profiles')
    .select('id, full_name, subscribed, subscription_end, free_access_granted, created_at')
    .or('subscribed.is.null,subscribed.eq.false')
    .is('subscription_end', null)
    .neq('free_access_granted', true)
    .lt('created_at', oneDayAgo);
  if (error) throw error;
  const ids = (data || []).map((r: { id: string }) => r.id);
  if (!ids.length) return [];
  const { data: users, error: usersErr } = await sb.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  });
  if (usersErr) throw usersErr;
  const byId = new Map<string, string>();
  for (const u of users?.users || []) {
    if (u.id && u.email) byId.set(u.id, u.email.toLowerCase());
  }
  return (data || [])
    .map((p: { id: string; full_name: string | null }) => ({
      email: byId.get(p.id) || '',
      first_name: firstNameOf(p.full_name),
    }))
    .filter((r: Recipient) => r.email);
}

async function fetchRecipients(
  // deno-lint-ignore no-explicit-any
  sb: any,
  audience: CheatsheetAudience
): Promise<Recipient[]> {
  switch (audience) {
    case 'apprentice':
      return fetchApprenticeRecipients(sb);
    case 'winback':
      return fetchWinbackRecipients(sb);
    case 'early_access':
      return fetchEarlyAccessRecipients(sb);
    case 'signup_failure':
      return fetchSignupFailureRecipients(sb);
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const pdfUrl = Deno.env.get('LEAD_MAGNET_CHEATSHEET_URL');
    if (!pdfUrl) {
      return new Response(
        JSON.stringify({ error: 'LEAD_MAGNET_CHEATSHEET_URL not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const body = ((await req.json().catch(() => ({}))) as Payload) || ({} as Payload);
    if (
      !body.audience ||
      !['apprentice', 'winback', 'early_access', 'signup_failure'].includes(body.audience)
    ) {
      return new Response(
        JSON.stringify({
          error:
            "audience is required — one of: 'apprentice', 'winback', 'early_access', 'signup_failure'",
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Single-recipient test send
    if (body.test_to) {
      const result = await sendCheatsheetCampaignEmail({
        audience: body.audience,
        email: body.test_to,
        firstName: body.test_first_name,
        pdfUrl,
      });
      return new Response(
        JSON.stringify({
          ok: result.ok,
          test: true,
          audience: body.audience,
          sent_to: body.test_to,
          error: result.error,
        }),
        {
          status: result.ok ? 200 : 502,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const sb = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const all = await fetchRecipients(sb, body.audience);
    const recipients = body.limit ? all.slice(0, body.limit) : all;

    if (body.dry_run) {
      return new Response(
        JSON.stringify({
          ok: true,
          audience: body.audience,
          dry_run: true,
          would_send: recipients.length,
          total_in_audience: all.length,
          sample: recipients
            .slice(0, 20)
            .map((r) => ({ email: r.email, first_name: r.first_name || null })),
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Real send — sequential to respect Brevo rate limits
    let sent = 0;
    let failed = 0;
    const errors: string[] = [];
    for (const r of recipients) {
      const result = await sendCheatsheetCampaignEmail({
        audience: body.audience,
        email: r.email,
        firstName: r.first_name,
        pdfUrl,
      });
      if (result.ok) {
        sent += 1;
      } else {
        failed += 1;
        errors.push(`${r.email}: ${result.error || 'unknown error'}`);
      }
    }

    return new Response(
      JSON.stringify({
        ok: true,
        audience: body.audience,
        total_in_audience: all.length,
        attempted: recipients.length,
        sent,
        failed,
        errors: errors.slice(0, 10),
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('[send-cheatsheet-campaign] handler error', err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
