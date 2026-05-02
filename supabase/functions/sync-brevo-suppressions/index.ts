// One-shot sync: pulls Brevo's transactional blocklist (people who marked
// as spam, hard-bounced, or unsubscribed via Brevo's native mechanism) and
// mirrors them into our local email_suppressions + outreach_contacts so
// the next bulk send respects them.
//
// Why this exists: we send via Brevo's transactional API (/v3/smtp/email).
// Brevo maintains its own blocklist that includes spam complaints + hard
// bounces from prior sends. Those aren't visible to our prepare_send filter
// unless we sync them, so the resend would re-target people Brevo would
// then refuse to deliver to anyway.
//
// Usage: GET /functions/v1/sync-brevo-suppressions  (no auth — one-shot)
// Returns: { fetched, newly_suppressed, already_suppressed, by_reason }

import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

interface BrevoBlockedContact {
  email: string;
  // Brevo's reason field — one of: hardBounce, spam, unsubscribedViaApi,
  // unsubscribedViaEmail, blockedByAdmin, contactDistributorReason etc.
  reason?: { code?: string; message?: string };
  blockedAt?: string;
  senderEmail?: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const apiKey = Deno.env.get('BREVO_API_KEY');
    if (!apiKey) throw new Error('BREVO_API_KEY not set');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // Page through Brevo's transactional blocklist.
    // Endpoint: GET /v3/smtp/blockedContacts?limit=100&offset=0
    let offset = 0;
    const limit = 100;
    let totalFetched = 0;
    let newlySuppressed = 0;
    let alreadySuppressed = 0;
    const byReason: Record<string, number> = {};

    while (true) {
      const url = `https://api.brevo.com/v3/smtp/blockedContacts?limit=${limit}&offset=${offset}&sort=desc`;
      const res = await fetch(url, {
        headers: { 'api-key': apiKey, accept: 'application/json' },
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Brevo API ${res.status}: ${txt.slice(0, 300)}`);
      }
      const json: { contacts?: BrevoBlockedContact[]; count?: number } = await res.json();
      const contacts = json.contacts || [];
      if (contacts.length === 0) break;

      for (const c of contacts) {
        const email = String(c.email || '')
          .trim()
          .toLowerCase();
        if (!email || !email.includes('@')) continue;
        totalFetched++;
        const reasonCode = c.reason?.code || 'brevo_blocklist';
        byReason[reasonCode] = (byReason[reasonCode] || 0) + 1;

        // Was this email already in our suppressions?
        const { data: existing } = await supabase
          .from('email_suppressions')
          .select('email')
          .eq('email', email)
          .maybeSingle();
        if (existing) {
          alreadySuppressed++;
          continue;
        }

        // Insert into email_suppressions (cross-system source of truth).
        await supabase.from('email_suppressions').insert({
          email,
          reason: `brevo_${reasonCode}`,
          source: 'brevo_blocklist_sync',
          metadata: {
            brevo_reason: c.reason || null,
            blocked_at: c.blockedAt || null,
            sender_email: c.senderEmail || null,
          },
        });

        // Mirror to outreach_contacts so prepare_send filter sees it.
        await supabase
          .from('outreach_contacts')
          .update({
            is_suppressed: true,
            suppression_reason: `brevo_${reasonCode}`,
            suppressed_at: c.blockedAt || new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .ilike('email', email);

        newlySuppressed++;
      }

      if (contacts.length < limit) break;
      offset += limit;
      // Safety: don't run forever
      if (offset > 50000) break;
    }

    return new Response(
      JSON.stringify({
        ok: true,
        fetched: totalFetched,
        newly_suppressed: newlySuppressed,
        already_suppressed: alreadySuppressed,
        by_reason: byReason,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[sync-brevo-suppressions]', msg);
    return new Response(JSON.stringify({ ok: false, error: msg }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
