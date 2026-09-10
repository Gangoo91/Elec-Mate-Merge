/**
 * generate-calculation-pdf
 * ───────────────────────────────────────────────────────────────────────
 * Turns any calculator's result into a branded client-facing PDF.
 *
 * ONE function and ONE PDFMonkey template serve all 77 calculators. Nothing
 * here knows what a "diversity factor" is: the client sends a neutral report
 * shape (headline figures + sections of label/value rows) and this renders it.
 * Adding a calculator to the feature is a front-end data change and requires
 * no work in this file at all.
 *
 * WHY BRANDING IS ATTACHED HERE, NOT SENT BY THE CLIENT
 * The logo, scheme logo and company details are the electrician's identity on
 * a document they hand to a paying customer. Accepting them from the request
 * body would let any authenticated caller put any company's name and scheme
 * logo on an official-looking report. They are read from company_profiles for
 * the caller, server-side, and the client cannot override them.
 *
 * Origin: ELE-1699 — "How do I print off or send PDF report on Diversity
 * calculator to client" (customer email, 10 Sep 2026).
 */

import { serve } from '../_shared/deps.ts';
import { corsHeaders } from '../_shared/cors.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { captureException } from '../_shared/sentry.ts';

/** The generic "Calculation Report" template. Source of truth for the markup
 *  lives in the repo at pdf-templates/calculation-report.html. */
const TEMPLATE_ID = Deno.env.get('CALC_REPORT_TEMPLATE_ID') ||
  '17822fb1-fa6f-46e5-89a8-91344689d52a';

const PDFMONKEY_API = 'https://api.pdfmonkey.io/api/v1';

/**
 * Caps. A calculator report is a page or two; anything wildly beyond that is a
 * mistake or an abuse of a PDF generator that costs money per document.
 */
const LIMIT = { headline: 4, sections: 12, rows: 60, items: 40, notes: 20, str: 600 };

const log = (step: string, details?: unknown) => {
  const d = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[GENERATE-CALCULATION-PDF] ${step}${d}`);
};

/** The branding columns this function reads. Declared because `?? {}` on the
 *  query result otherwise narrows to `{}` and every field access is an error. */
type BrandingRow = {
  company_name?: string | null;
  company_phone?: string | null;
  company_email?: string | null;
  company_website?: string | null;
  company_registration?: string | null;
  registration_scheme?: string | null;
  cert_logo_tone?: string | null;
  accent_color?: string | null;
  logo_data_url?: string | null;
  logo_url?: string | null;
  scheme_logo_data_url?: string | null;
};

type Row = { label?: unknown; value?: unknown; note?: unknown };
type Section = { heading?: unknown; rows?: unknown; items?: unknown };

/**
 * Glyphs PDFMonkey's renderer cannot draw, mapped to something it can.
 *
 * 🔴 The renderer only has OpenSans. It carries the maths operators (≤ ≥ ±
 * render fine) but NOT the Arrows block, so a bonding report printed
 * "PEN 25 mm² ▌10 mm² minimum" — a tofu box where the arrow should be, on a
 * document handed to a customer.
 *
 * Transliterated HERE and not in the calculator, because the arrow is correct
 * in the app UI where the font can draw it. This is a PDF-boundary concern.
 */
const GLYPH_FALLBACKS: [RegExp, string][] = [
  [/[\u2192\u21D2\u27A1]/g, '->'],
  [/[\u2190\u21D0]/g, '<-'],
  [/[\u2194\u21D4]/g, '<->'],
  [/\u2026/g, '...'],
];

/** Strings arrive from the browser — trim, cap, and coerce. Liquid escapes on
 *  output, so this is about size and shape rather than injection. */
const str = (v: unknown, max = LIMIT.str): string => {
  let out = typeof v === 'string' ? v.trim() : v == null ? '' : String(v);
  for (const [re, sub] of GLYPH_FALLBACKS) out = out.replace(re, sub);
  return out.slice(0, max);
};

const arr = (v: unknown, max: number): unknown[] => (Array.isArray(v) ? v.slice(0, max) : []);

/**
 * Rebuilds the payload field by field rather than passing the request body
 * through. Anything the client invents is dropped, and `company` in particular
 * can never arrive from outside.
 */
function sanitiseReport(input: Record<string, unknown>) {
  const meta = (input.meta ?? {}) as Record<string, unknown>;
  const client = (input.client ?? {}) as Record<string, unknown>;

  return {
    meta: {
      title: str(meta.title, 120) || 'Calculation',
      subtitle: str(meta.subtitle, 200),
      standard: str(meta.standard, 120),
      reference: str(meta.reference, 60),
      generated: str(meta.generated, 60),
    },
    client: {
      name: str(client.name, 120),
      site: str(client.site, 200),
    },
    prepared_by: str(input.prepared_by, 120),
    headline: arr(input.headline, LIMIT.headline).map((h) => {
      const x = (h ?? {}) as Record<string, unknown>;
      const verdict = str(x.verdict, 10).toLowerCase();
      return {
        label: str(x.label, 80),
        value: str(x.value, 40),
        unit: str(x.unit, 16),
        verdict: ['pass', 'fail', 'warn'].includes(verdict) ? verdict : '',
      };
    }),
    sections: arr(input.sections, LIMIT.sections).map((s) => {
      const x = (s ?? {}) as Section;
      return {
        heading: str(x.heading, 120),
        rows: arr(x.rows, LIMIT.rows).map((r) => {
          const y = (r ?? {}) as Row;
          return { label: str(y.label, 160), value: str(y.value, 160), note: str(y.note, 200) };
        }),
        items: arr(x.items, LIMIT.items).map((i) => str(i, 400)),
      };
    }),
    notes: arr(input.notes, LIMIT.notes).map((n) => str(n, 400)),
    disclaimer: str(input.disclaimer, 800),
  };
}

/** A filename an electrician can find again: "diversity-factor-2026-09-10.pdf" */
function fileNameFor(title: string): string {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'calculation';
  return `${slug}-${new Date().toISOString().slice(0, 10)}.pdf`;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const apiKey = Deno.env.get('PDFMONKEY_API_KEY');
    if (!apiKey) throw new Error('PDFMONKEY_API_KEY is not set');

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) throw new Error('Missing authorization header');

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const service = createClient(supabaseUrl, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
    const asUser = createClient(supabaseUrl, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: userErr } = await asUser.auth.getUser();
    if (userErr || !user) throw new Error('Unauthorised');

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object' || !body.report) {
      throw new Error('Missing report');
    }
    const report = sanitiseReport(body.report as Record<string, unknown>);

    // ── Branding, server-side ────────────────────────────────────────
    const { data: profileRows } = await service
      .from('company_profiles')
      .select(
        'company_name, company_phone, company_email, company_website, company_registration, logo_data_url, logo_url, scheme_logo_data_url, registration_scheme, cert_logo_tone, accent_color'
      )
      .eq('user_id', user.id)
      .limit(1);
    const b: BrandingRow = (profileRows?.[0] as BrandingRow) ?? {};

    const company = {
      // Falls back to Elec-Mate so a user who has not filled in their company
      // profile still gets a presentable document rather than a blank masthead.
      name: b.company_name || 'Elec-Mate',
      phone: b.company_phone || '',
      email: b.company_email || '',
      website: b.company_website || '',
      registration: b.company_registration || b.registration_scheme || '',
      // data_url first: an inlined image always renders, where a remote URL can
      // be private, expired or slow, and PDFMonkey silently drops what it
      // cannot fetch.
      logo: b.logo_data_url || b.logo_url || '',
      scheme_logo: b.scheme_logo_data_url || '',
      /**
       * The masthead follows the LOGO, exactly as the certificates do — see
       * `mastheadFor` in src/utils/logoTone.ts and the note in the EICR
       * template. A white masthead rescues a dark logo and destroys a pale
       * one; a dark masthead does the reverse. Both have been shipped in turn.
       *
       * The first version of this report ignored that and sat a dark logo on
       * a navy band with a white box painted behind it, which is the failure
       * the certificates already solved.
       *
       * `cert_logo_tone` is the electrician's own setting, so the report and
       * their certificates agree. 'light' means light artwork, which needs a
       * dark ground.
       */
      mast_bg: b.cert_logo_tone === 'light' ? '#0a1628' : '#ffffff',
      mast_fg: b.cert_logo_tone === 'light' ? '#ffffff' : '#0a1628',
      mast_sub: b.cert_logo_tone === 'light' ? '#c9d4e3' : '#475569',
      mast_rule: b.cert_logo_tone === 'light' ? 'rgba(255,255,255,0.16)' : '#e5e9f0',
    };

    if (!report.meta.generated) {
      report.meta.generated = new Date().toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric',
      });
    }

    const payload = { ...report, company };

    // ── Generate ─────────────────────────────────────────────────────
    const createRes = await fetch(`${PDFMONKEY_API}/documents`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        document: {
          document_template_id: TEMPLATE_ID,
          payload,
          status: 'pending',
          meta: JSON.stringify({ _filename: fileNameFor(report.meta.title) }),
        },
      }),
    });
    if (!createRes.ok) {
      throw new Error(`PDFMonkey create failed (${createRes.status}): ${await createRes.text()}`);
    }
    const documentId = (await createRes.json())?.document?.id;
    if (!documentId) throw new Error('PDFMonkey returned no document id');

    // Poll. Generation is normally 2-4s; 30s is a generous ceiling that still
    // returns well inside the edge function timeout.
    let status = 'pending';
    let downloadUrl = '';
    let failureCause = '';
    for (let attempt = 0; attempt < 15 && status !== 'success' && status !== 'failure'; attempt++) {
      await new Promise((r) => setTimeout(r, 2000));
      const poll = await fetch(`${PDFMONKEY_API}/documents/${documentId}`, {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      if (!poll.ok) continue;
      const doc = (await poll.json())?.document ?? {};
      status = doc.status ?? status;
      downloadUrl = doc.download_url ?? '';
      failureCause = doc.failure_cause ?? '';
    }

    if (status !== 'success' || !downloadUrl) {
      log('Generation did not succeed', { documentId, status, failureCause });
      throw new Error(failureCause || `PDF generation ${status}`);
    }

    log('Generated', { documentId, title: report.meta.title });

    return json({
      success: true,
      url: downloadUrl,
      filename: fileNameFor(report.meta.title),
      document_id: documentId,
    });
  } catch (error) {
    await captureException(error, {
      functionName: 'generate-calculation-pdf',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    const message = error instanceof Error ? error.message : String(error);
    log('ERROR', { message });
    return json({ success: false, error: message }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status,
  });
}
