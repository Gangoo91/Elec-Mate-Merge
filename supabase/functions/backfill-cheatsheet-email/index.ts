/**
 * Backfill cheat-sheet email to everyone already in Brevo list.
 *
 * One-off job: sends the BS 7671 A4:2026 cheat-sheet email to every contact
 * in the configured Brevo list. Used to deliver the email to people who
 * subscribed before LEAD_MAGNET_CHEATSHEET_URL was configured (so they got
 * added to the list but never received the PDF email).
 *
 * Safe to re-run — respects a `dry_run` flag and optional `source_filter`.
 *
 * ENV VARS:
 *  - BREVO_API_KEY
 *  - BREVO_NEWSLETTER_LIST_ID (defaults to 6)
 *  - BREVO_LEAD_MAGNET_LIST_ID (optional fallback if set)
 *  - LEAD_MAGNET_CHEATSHEET_URL (the PDF URL)
 *
 * Invoke:
 *   supabase.functions.invoke('backfill-cheatsheet-email', {
 *     body: { dry_run: true }  // preview recipient list first
 *   })
 *
 * Body options:
 *   dry_run?: boolean              — true = list recipients, don't send
 *   list_id?: number               — override the list id (defaults to BREVO_NEWSLETTER_LIST_ID)
 *   source_filter?: string[]       — only contacts with SIGNUP_SOURCE in this list
 *                                    (e.g. ["lead_magnet_cheatsheet", "exit_intent"])
 */

import { serve, corsHeaders } from '../_shared/deps.ts';
import { sendCheatSheetEmail } from '../_shared/cheatsheet-email.ts';

interface BrevoContact {
  email: string;
  attributes?: Record<string, unknown>;
}

interface BrevoListResponse {
  contacts?: BrevoContact[];
  count?: number;
}

interface Payload {
  dry_run?: boolean;
  list_id?: number;
  source_filter?: string[];
  /** Send to a single email (bypass list) — used for test sends */
  test_to?: string;
  test_first_name?: string;
}

async function fetchAllContacts(apiKey: string, listId: number): Promise<BrevoContact[]> {
  const all: BrevoContact[] = [];
  let offset = 0;
  const limit = 100;
  // Hard cap at 10,000 contacts to avoid runaway loops
  while (offset < 10_000) {
    const res = await fetch(
      `https://api.brevo.com/v3/contacts/lists/${listId}/contacts?limit=${limit}&offset=${offset}`,
      {
        headers: {
          'api-key': apiKey,
          accept: 'application/json',
        },
      }
    );
    if (!res.ok) {
      throw new Error(`Brevo list fetch failed: ${res.status} ${await res.text()}`);
    }
    const data = (await res.json()) as BrevoListResponse;
    const contacts = data.contacts || [];
    all.push(...contacts);
    if (contacts.length < limit) break;
    offset += limit;
  }
  return all;
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
    const apiKey = Deno.env.get('BREVO_API_KEY');
    const pdfUrl = Deno.env.get('LEAD_MAGNET_CHEATSHEET_URL');

    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'BREVO_API_KEY not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    if (!pdfUrl) {
      return new Response(JSON.stringify({ error: 'LEAD_MAGNET_CHEATSHEET_URL not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body = ((await req.json().catch(() => ({}))) as Payload) || {};

    // Single-recipient test send — bypass list lookup entirely
    if (body.test_to) {
      try {
        await sendCheatSheetEmail(body.test_to, body.test_first_name, pdfUrl);
        return new Response(JSON.stringify({ ok: true, test: true, sent_to: body.test_to }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (err) {
        return new Response(
          JSON.stringify({
            ok: false,
            test: true,
            sent_to: body.test_to,
            error: err instanceof Error ? err.message : String(err),
          }),
          { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    const listIdRaw = body.list_id ?? parseInt(Deno.env.get('BREVO_NEWSLETTER_LIST_ID') || '6', 10);
    const listId = Number.isFinite(listIdRaw) ? listIdRaw : 6;

    const contacts = await fetchAllContacts(apiKey, listId);

    // Optional filter on SIGNUP_SOURCE attribute
    const filtered = body.source_filter?.length
      ? contacts.filter((c) => {
          const src = (c.attributes?.SIGNUP_SOURCE as string | undefined) || '';
          return body.source_filter!.includes(src);
        })
      : contacts;

    const recipients = filtered
      .map((c) => {
        const first =
          (c.attributes?.FIRSTNAME as string | undefined) ||
          (c.attributes?.firstname as string | undefined) ||
          undefined;
        return { email: c.email, first_name: first };
      })
      .filter((r) => r.email);

    if (body.dry_run) {
      return new Response(
        JSON.stringify({
          ok: true,
          dry_run: true,
          list_id: listId,
          total_in_list: contacts.length,
          would_send: recipients.length,
          recipients: recipients.map((r) => ({
            email: r.email,
            first_name: r.first_name || null,
          })),
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Real send — sequential to respect Brevo rate limit (~300/hour on free,
    // plenty for 9 recipients; even 100 is safe)
    let sent = 0;
    let failed = 0;
    const errors: string[] = [];

    for (const r of recipients) {
      try {
        await sendCheatSheetEmail(r.email, r.first_name, pdfUrl);
        sent += 1;
      } catch (err) {
        failed += 1;
        errors.push(`${r.email}: ${err instanceof Error ? err.message : String(err)}`);
      }
    }

    return new Response(
      JSON.stringify({
        ok: true,
        list_id: listId,
        total_in_list: contacts.length,
        recipients: recipients.length,
        sent,
        failed,
        errors: errors.slice(0, 10),
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('[backfill-cheatsheet-email] Handler error', err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
