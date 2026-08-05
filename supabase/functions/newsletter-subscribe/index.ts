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

import { serve, corsHeaders } from '../_shared/deps.ts';
import { fireCapiEvent } from '../_shared/meta-capi.ts';
import { sendCheatSheetEmail } from '../_shared/cheatsheet-email.ts';
import {
  sendMockResultEmail,
  type MockResultPayload,
  type MockResultMissedQuestion,
} from '../_shared/mock-result-email.ts';

const BREVO_CONTACTS_ENDPOINT = 'https://api.brevo.com/v3/contacts';

type Source =
  | 'landing_form'
  | 'exit_intent'
  | 'lead_magnet_cheatsheet'
  | 'mock_exam_result'
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

    const isLeadMagnet = body.source === 'lead_magnet_cheatsheet';
    const isMockExam = body.source === 'mock_exam_result';
    const listIdRaw = isMockExam
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
      LAST_EXAM_SCORE: mockResult ? String(mockResult.percentage) : undefined,
      LAST_EXAM_PASSED: mockResult ? String(mockResult.passed) : undefined,
      UTM_SOURCE: body.utm?.utm_source ?? undefined,
      UTM_MEDIUM: body.utm?.utm_medium ?? undefined,
      UTM_CAMPAIGN: body.utm?.utm_campaign ?? undefined,
      GCLID: body.utm?.gclid ?? undefined,
      FBCLID: body.utm?.fbclid ?? undefined,
    };

    const brevo = await addToBrevoList(apiKey, email, listId, attributes);

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

    const pdfUrl = Deno.env.get('LEAD_MAGNET_CHEATSHEET_URL') || null;
    const wantsCheatSheet =
      body.source === 'lead_magnet_cheatsheet' || body.source === 'exit_intent';

    // Fire the cheat sheet email for lead magnet + exit intent sources.
    // Fire-and-forget — don't block the response on SMTP.
    if (wantsCheatSheet && pdfUrl) {
      sendCheatSheetEmail(email, body.first_name, pdfUrl).catch(() => {});
    }

    // Mock exam breakdown — same fire-and-forget shape.
    if (mockResult) {
      sendMockResultEmail(email, mockResult).catch(() => {});
    }

    const download_url = isLeadMagnet ? pdfUrl : null;

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
});
