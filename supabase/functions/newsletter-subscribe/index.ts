/**
 * Newsletter subscribe — adds an email to a Brevo contact list.
 *
 * Called from the landing page email capture form + exit-intent modal.
 * Also used by lead-magnet downloads: the magnet PDF URL is returned
 * so the client can trigger the download after successful capture.
 *
 * Fires a server-side Meta CAPI `Lead` event with the same event_id the
 * client-side Pixel fired (or a fresh one if the client didn't fire).
 *
 * ENV VARS:
 *  - BREVO_API_KEY
 *  - BREVO_NEWSLETTER_LIST_ID (numeric list ID from Brevo dashboard)
 *  - BREVO_LEAD_MAGNET_LIST_ID (optional — separate list for magnet downloads)
 *  - BREVO_MOCK_EXAM_LIST_ID (optional — separate list for mock exam sitters;
 *    they're mostly apprentices and want a different nurture to the cheatsheet
 *    audience, so keep them apart)
 *  - LEAD_MAGNET_CHEATSHEET_URL (signed URL or public path to the PDF)
 */

import { serve, corsHeaders, createClient } from '../_shared/deps.ts';
import { fireCapiEvent } from '../_shared/meta-capi.ts';
import { sendCheatSheetEmail } from '../_shared/cheatsheet-email.ts';
import { sendLeadMagnetEmail, type LeadMagnet } from '../_shared/lead-magnet-email.ts';
import { withSentry } from '../_shared/sentry.ts';
import {
  sendMockResultEmail,
  type MockResultPayload,
  type MockResultMissedQuestion,
} from '../_shared/mock-result-email.ts';
import {
  sendCalculatorResultEmail,
  type CalculatorResultPayload,
  type CalculatorResultRow,
} from '../_shared/calculator-result-email.ts';

const BREVO_CONTACTS_ENDPOINT = 'https://api.brevo.com/v3/contacts';

type Source =
  | 'landing_form'
  | 'exit_intent'
  | 'lead_magnet_cheatsheet'
  | 'mock_exam_result'
  | 'calculator_result'
  | 'footer'
  | 'other';

interface Payload {
  email: string;
  first_name?: string;
  last_name?: string;
  source: Source;
  event_id?: string; // for Meta CAPI dedup with browser Pixel
  utm?: Record<string, string | null | undefined>;
  /** Only for source === 'mock_exam_result'. Untrusted — sanitised below. */
  mock_result?: unknown;
  /** Only for source === 'calculator_result'. Untrusted — sanitised below. */
  calculator_result?: unknown;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Bounds a string from the public payload: trims, caps, coerces non-strings. */
function str(v: unknown, max: number): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

/** Bounds a number from the public payload into [min, max]; NaN → min. */
function num(v: unknown, min: number, max: number): number {
  const n = typeof v === 'number' && Number.isFinite(v) ? Math.round(v) : min;
  return Math.min(max, Math.max(min, n));
}

/**
 * Sanitise the mock result. This arrives from an unauthenticated public page,
 * so nothing is trusted: every string is bounded, every array is capped, and
 * the exam URL is forced onto our own origin so the email can't be used to
 * send someone else's link out under our sending domain.
 */
function sanitiseMockResult(raw: unknown): MockResultPayload | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Record<string, unknown>;

  const examName = str(r.examName, 120);
  if (!examName) return null;

  const slug = str(r.examSlug, 120).replace(/[^a-z0-9/-]/gi, '');
  const examUrl = slug
    ? `https://www.elec-mate.com/mock-exams/${slug}`
    : 'https://www.elec-mate.com/mock-exams';

  const total = num(r.total, 1, 200);
  const score = num(r.score, 0, total);
  const missedRaw = Array.isArray(r.missed) ? r.missed : [];

  const missed: MockResultMissedQuestion[] = missedRaw
    .slice(0, 10)
    .map((m) => {
      const q = m as Record<string, unknown>;
      return {
        question: str(q.question, 400),
        correctAnswer: str(q.correctAnswer, 300),
        explanation: str(q.explanation, 600) || undefined,
      };
    })
    .filter((m) => m.question && m.correctAnswer);

  const weakAreas = (Array.isArray(r.weakAreas) ? r.weakAreas : [])
    .slice(0, 6)
    .map((w) => {
      const a = w as Record<string, unknown>;
      const wTotal = num(a.total, 1, 200);
      return {
        name: str(a.name, 80),
        correct: num(a.correct, 0, wTotal),
        total: wTotal,
      };
    })
    .filter((w) => w.name);

  return {
    examName,
    examUrl,
    score,
    total,
    percentage: num(r.percentage, 0, 100),
    passed: r.passed === true,
    passThreshold: num(r.passThreshold, 0, 100),
    weakAreas,
    missed,
    missedTotal: num(r.missedTotal, missed.length, 200),
  };
}

/**
 * Sanitise a calculator result. Same rules as the mock result: this arrives from
 * an unauthenticated public page, so every string is bounded, every array capped,
 * and the URL is forced onto our own origin so the email cannot be used to send
 * someone else's link under our sending domain.
 */
function sanitiseCalculatorResult(raw: unknown): CalculatorResultPayload | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Record<string, unknown>;

  const calculatorName = str(r.calculatorName, 80);
  const headline = str(r.headline, 120);
  if (!calculatorName || !headline) return null;

  // Take a PATH, not a slug: two calculators live outside /tools/
  // (/electrical-testing-calculators and /guides/hourly-rate-calculator-electrician),
  // so assuming the /tools/ prefix produced a dead link for them.
  // Still force our own origin — this arrives from a public page and the email
  // must never carry someone else's link under our sending domain.
  const rawPath = str(r.calculatorPath, 160).replace(/[^a-z0-9/-]/gi, '');
  const path = rawPath.startsWith('/') ? rawPath.replace(/\/{2,}/g, '/') : '';
  const calculatorUrl = path
    ? `https://www.elec-mate.com${path}`
    : 'https://www.elec-mate.com/electrical-testing-calculators';

  const rows = (v: unknown): CalculatorResultRow[] =>
    (Array.isArray(v) ? v : [])
      .slice(0, 12)
      .map((x) => {
        const row = x as Record<string, unknown>;
        return { label: str(row.label, 60), value: str(row.value, 60) };
      })
      .filter((x) => x.label && x.value);

  return {
    calculatorName,
    calculatorUrl,
    headline,
    inputs: rows(r.inputs),
    outputs: rows(r.outputs),
    basis: str(r.basis, 160) || undefined,
  };
}

async function addToBrevoList(
  apiKey: string,
  email: string,
  listId: number,
  attributes: Record<string, string | undefined>
): Promise<{ ok: boolean; status: number; response?: unknown }> {
  const body: Record<string, unknown> = {
    email,
    listIds: [listId],
    updateEnabled: true, // upsert — don't 400 on duplicate emails
    attributes: Object.fromEntries(
      Object.entries(attributes).filter(([, v]) => v !== undefined && v !== '')
    ),
  };
  try {
    const res = await fetch(BREVO_CONTACTS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify(body),
    });
    const response = await res.json().catch(() => ({}));
    return { ok: res.ok, status: res.status, response };
  } catch (err) {
    console.error('[newsletter-subscribe] Brevo error', err);
    return { ok: false, status: 0 };
  }
}

serve(withSentry('newsletter-subscribe', async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const apiKey = Deno.env.get('BREVO_API_KEY');
    if (!apiKey) {
      console.error('[newsletter-subscribe] BREVO_API_KEY not configured');
      return new Response(JSON.stringify({ error: 'Not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body = (await req.json()) as Payload;
    const email = body.email?.trim().toLowerCase();
    if (!email || !isValidEmail(email)) {
      return new Response(JSON.stringify({ error: 'Valid email required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Prefix match, not equality: every new lead magnet (symbols chart, and
    // whatever comes next) routes to the lead-magnet list without another
    // deploy. SIGNUP_SOURCE keeps the exact magnet segmentable in Brevo.
    // Coerce once: `source` arrives from a public unauthenticated endpoint, and
    // calling .startsWith on a non-string 500s the request.
    const source = typeof body.source === 'string' ? body.source : '';
    const isLeadMagnet = source.startsWith('lead_magnet');
    const isMockExam = source === 'mock_exam_result';
    const isCalculator = source === 'calculator_result';
    const listIdRaw = isCalculator
      ? Deno.env.get('BREVO_CALCULATOR_LIST_ID') || Deno.env.get('BREVO_NEWSLETTER_LIST_ID')
      : isMockExam
      ? Deno.env.get('BREVO_MOCK_EXAM_LIST_ID') || Deno.env.get('BREVO_NEWSLETTER_LIST_ID')
      : isLeadMagnet
        ? Deno.env.get('BREVO_LEAD_MAGNET_LIST_ID') || Deno.env.get('BREVO_NEWSLETTER_LIST_ID')
        : Deno.env.get('BREVO_NEWSLETTER_LIST_ID');
    const listId = listIdRaw ? parseInt(listIdRaw, 10) : NaN;

    if (!Number.isFinite(listId)) {
      console.error('[newsletter-subscribe] BREVO_NEWSLETTER_LIST_ID not configured');
      return new Response(JSON.stringify({ error: 'List not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Mock exam breakdowns are the whole reason the visitor handed over an
    // email — if we can't build one, don't pretend we sent it.
    const calcResult = isCalculator ? sanitiseCalculatorResult(body.calculator_result) : null;
    if (isCalculator && !calcResult) {
      return new Response(JSON.stringify({ error: 'Calculation missing or malformed' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const mockResult = isMockExam ? sanitiseMockResult(body.mock_result) : null;
    if (isMockExam && !mockResult) {
      return new Response(JSON.stringify({ error: 'Exam result missing or malformed' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const attributes: Record<string, string | undefined> = {
      FIRSTNAME: body.first_name,
      LASTNAME: body.last_name,
      SIGNUP_SOURCE: body.source,
      // Segmentation for the exam nurture — which exam, and how they did.
      LAST_EXAM: mockResult?.examName,
      LAST_CALCULATOR: calcResult?.calculatorName,
      LAST_EXAM_SCORE: mockResult ? String(mockResult.percentage) : undefined,
      LAST_EXAM_PASSED: mockResult ? String(mockResult.passed) : undefined,
      UTM_SOURCE: body.utm?.utm_source ?? undefined,
      UTM_MEDIUM: body.utm?.utm_medium ?? undefined,
      UTM_CAMPAIGN: body.utm?.utm_campaign ?? undefined,
      GCLID: body.utm?.gclid ?? undefined,
      FBCLID: body.utm?.fbclid ?? undefined,
    };

    const brevo = await addToBrevoList(apiKey, email, listId, attributes);

    // Record the capture in our own database BEFORE the non-OK early return, so a
    // Brevo outage shows up as rows with brevo_ok = false rather than as silence.
    // Never allowed to fail the request: the lead already gave us their address
    // and the Brevo call has already happened either way.
    try {
      const supabaseUrl = Deno.env.get('SUPABASE_URL');
      const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
      if (supabaseUrl && serviceKey) {
        const db = createClient(supabaseUrl, serviceKey);
        const { error: leadErr } = await db.from('captured_leads').upsert(
          {
            email,
            first_name: body.first_name ?? null,
            source: body.source,
            utm_source: body.utm?.utm_source ?? null,
            utm_medium: body.utm?.utm_medium ?? null,
            utm_campaign: body.utm?.utm_campaign ?? null,
            gclid: body.utm?.gclid ?? null,
            fbclid: body.utm?.fbclid ?? null,
            brevo_ok: brevo.ok,
            brevo_status: brevo.status,
            event_id: body.event_id ?? null,
            last_seen_at: new Date().toISOString(),
          },
          { onConflict: 'email,source', ignoreDuplicates: false }
        );
        if (leadErr) {
          console.warn('[newsletter-subscribe] captured_leads write failed', leadErr.message);
        }
      }
    } catch (leadErr) {
      console.warn('[newsletter-subscribe] captured_leads write threw', leadErr);
    }

    if (!brevo.ok) {
      const brevoErr = (brevo.response as { message?: string; code?: string })?.message;
      console.warn('[newsletter-subscribe] Brevo returned non-OK', {
        status: brevo.status,
        response: brevo.response,
      });
      return new Response(
        JSON.stringify({ error: brevoErr || 'Failed to subscribe', status: brevo.status }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fire Meta CAPI Lead — deduped with the browser Pixel via event_id
    const eventId = body.event_id || `lead_${crypto.randomUUID()}`;
    fireCapiEvent({
      event_name: 'Lead',
      event_id: eventId,
      action_source: 'website',
      email,
      first_name: body.first_name,
      last_name: body.last_name,
      country: 'gb',
      custom_data: { content_name: body.source },
    });

    // ---- lead magnets -------------------------------------------------
    // The cheat sheet keeps its own bespoke template and env-var URL. Every
    // other magnet is a data entry here, delivered by the shared template.
    // A magnet MUST appear in this map or its download_url comes back null —
    // never fall back to another magnet's file.
    const OTHER_MAGNETS: Record<string, LeadMagnet> = {
      lead_magnet_symbols_chart: {
        name: 'UK electrical symbols chart',
        // Served from the public lead-magnets bucket, same as the welcome
        // email's Getting Started guide — so delivery does not depend on a
        // site deploy, and the file is fetchable for the attachment.
        url: `${Deno.env.get('SUPABASE_URL') || 'https://jtwygbeceundfgnkirof.supabase.co'}/storage/v1/object/public/lead-magnets/elec-mate-electrical-symbols-chart.pdf`,
        previewImage: `${Deno.env.get('SUPABASE_URL') || 'https://jtwygbeceundfgnkirof.supabase.co'}/storage/v1/object/public/lead-magnets/elec-mate-electrical-symbols-chart-preview.jpg`,
        previewAlt: 'The symbols chart cover and reference pages, fanned out',
        filename: 'Elec-Mate-Electrical-Symbols-Chart.pdf',
        blurb:
          'All 114 IEC 60617 symbols on one A4 sheet, grouped by category — the standard referenced by BS 7671:2018+A4:2026 Regulation 514.9.1 for installation drawings.',
        utmMedium: 'symbols_chart',
        facts: [
          'All 114 symbols, grouped by category',
          'A4 and print-ready — pin it up in the van',
          'IEC 60617, per BS 7671 Regulation 514.9.1',
        ],
      },
      lead_magnet_zs_ze_reference: {
        // Short on purpose — `name` drives BOTH the subject ("Your … is here")
        // and the H1. "Ze & Zs earth fault loop impedance reference" made a
        // 56-character subject that truncates on a phone and buries "max Zs",
        // which is the wording people actually searched for.
        name: 'maximum Zs & Ze reference',
        url: `${Deno.env.get('SUPABASE_URL') || 'https://jtwygbeceundfgnkirof.supabase.co'}/storage/v1/object/public/lead-magnets/elec-mate-zs-ze-reference.pdf`,
        previewImage: `${Deno.env.get('SUPABASE_URL') || 'https://jtwygbeceundfgnkirof.supabase.co'}/storage/v1/object/public/lead-magnets/elec-mate-zs-ze-reference-preview.jpg`,
        previewAlt: 'The three reference sheets, fanned out',
        filename: 'Elec-Mate-Ze-and-Zs-Reference.pdf',
        blurb:
          'Every maximum Zs in BS 7671 Tables 41.2–41.5 on three A4 sheets — circuit-breakers, fuses, RCDs and the withdrawn BS 3871 types still sitting in older boards.',
        utmMedium: 'zs_ze_reference',
        facts: [
          'Tables 41.2–41.5 as tabulated, Cmin 0.95',
          'BS 3871 Types 1–4 for older boards',
          'A4 and print-ready — pin it up in the van',
        ],
      },
    };

    const cheatSheetUrl = Deno.env.get('LEAD_MAGNET_CHEATSHEET_URL') || null;
    const wantsCheatSheet = source === 'lead_magnet_cheatsheet' || source === 'exit_intent';
    const otherMagnet = Object.prototype.hasOwnProperty.call(OTHER_MAGNETS, source)
      ? OTHER_MAGNETS[source]
      : undefined;

    // Fire the delivery email. Fire-and-forget — never block the response on SMTP.
    if (wantsCheatSheet && cheatSheetUrl) {
      sendCheatSheetEmail(email, body.first_name, cheatSheetUrl).catch(() => {});
    } else if (otherMagnet) {
      sendLeadMagnetEmail(email, body.first_name, otherMagnet).catch(() => {});
    } else if (isLeadMagnet) {
      // Routed to the lead-magnet list but has no registry entry, so nothing is
      // delivered. Silent in production otherwise — shout so it gets noticed.
      console.error('[newsletter-subscribe] lead magnet has no OTHER_MAGNETS entry:', source);
    }

    // Mock exam breakdown — same fire-and-forget shape.
    if (mockResult) {
      sendMockResultEmail(email, mockResult).catch(() => {});
    }

    // Calculator result — same fire-and-forget shape.
    if (calcResult) {
      sendCalculatorResultEmail(email, calcResult).catch(() => {});
    }

    // Per-magnet — returning the cheat sheet URL for a different magnet would
    // hand the visitor the wrong file.
    // `exit_intent` is deliberately excluded: it still RECEIVES the cheat sheet
    // email above, but ExitIntentModal window.open()s any non-null downloadUrl
    // after an await (popup-blocked) and fires download analytics regardless.
    // It returned null before the prefix-routing change and must keep doing so.
    const download_url =
      otherMagnet?.url ?? (source === 'lead_magnet_cheatsheet' ? cheatSheetUrl : null);

    return new Response(JSON.stringify({ ok: true, event_id: eventId, download_url }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[newsletter-subscribe] Handler error', err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}));
