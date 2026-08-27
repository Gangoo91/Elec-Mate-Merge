import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { captureException } from '../_shared/sentry.ts';
import { persistCertPdf } from '../_shared/persist-cert-pdf.ts';

/**
 * CU Door Label PDF (ELE-1615).
 *
 * The label that lives inside the consumer unit door. It takes the SAME payload
 * as `generate-board-schedule-pdf` — one builder (`board-schedule-payload.ts`)
 * feeds both — and simply renders a different template, which ignores the
 * fields a door label has no business carrying (cable size, Zs, RCD ratings,
 * logo, scheme, notes).
 *
 * ⚠️ This replaced a client-side jsPDF generator. That version was deliberate
 * at the time — the label is produced at the board, sometimes with no signal —
 * so the trade being made here is a network round trip in exchange for a
 * branded, consistent document. If offline capture matters later, the answer is
 * a queued retry, NOT a second divergent jsPDF layout.
 *
 * 🔴 Page size (170 × 120 mm) is NOT in the stylesheet. PDFMonkey's engine
 * ignores the CSS `@page` rule entirely; size, orientation and margins live in
 * the template's `settings` blob on the API resource. The first render came out
 * as a small label adrift on an A4 landscape sheet because of exactly this.
 *
 * Contract lives on the template (`cdd7f959-…`), which is the source of truth —
 * there is no repo copy by design.
 */

const PDFMONKEY_API_KEY = Deno.env.get('PDFMONKEY_API_KEY');
const TEMPLATE_ID = 'cdd7f959-3663-4e94-b09e-84b372d63b91';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface PDFMonkeyDocument {
  id: string;
  status: string;
  download_url?: string;
  preview_url?: string;
  errors?: string[];
}

async function createPDFMonkeyDocument(payload: unknown): Promise<PDFMonkeyDocument> {
  const response = await fetch('https://api.pdfmonkey.io/api/v1/documents', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PDFMONKEY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      document: {
        document_template_id: TEMPLATE_ID,
        payload,
        status: 'pending',
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('PDF Monkey create error:', errorText);
    throw new Error(`Failed to create PDF document: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data.document;
}

async function getPDFMonkeyDocument(documentId: string): Promise<PDFMonkeyDocument> {
  const response = await fetch(`https://api.pdfmonkey.io/api/v1/documents/${documentId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${PDFMONKEY_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('PDF Monkey fetch error:', errorText);
    throw new Error(`Failed to fetch PDF document: ${response.status}`);
  }

  const data = await response.json();
  return data.document;
}

async function waitForPDFGeneration(
  documentId: string,
  maxAttempts = 60
): Promise<PDFMonkeyDocument> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const document = await getPDFMonkeyDocument(documentId);

    console.log(`[Attempt ${attempt + 1}] Document status: ${document.status}`);

    if (document.status === 'success') {
      return document;
    }

    if (document.status === 'failure') {
      throw new Error(`PDF generation failed: ${document.errors?.join(', ') || 'Unknown error'}`);
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  throw new Error('PDF generation timed out');
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!PDFMONKEY_API_KEY) {
      throw new Error('PDFMONKEY_API_KEY environment variable is not set');
    }

    /*
     * Three accepted shapes, and all three are real callers:
     *   { payload }  — the page, invoking directly
     *   { formData } — send-certificate-resend, which posts every generate-*-pdf
     *                  function `{ formData, reportId, templateId }`. Without
     *                  this branch the email path would 500 on every send.
     *   the body itself — kept for symmetry with the cert functions.
     */
    const body = await req.json();
    const payload = body?.payload ?? body?.formData ?? body;

    if (!payload?.board) {
      throw new Error('No board data provided');
    }

    /*
     * ⚠️ Log loudly when branding is absent rather than quietly rendering an
     * unbranded label. BoardSchedulePage hardcoded `companyName: ''` for
     * months and nobody noticed the PDFs carried no company details — a silent
     * empty field is exactly how that goes unseen. The render still proceeds:
     * the company line is the only branding on a door label, and a label
     * without it is still a usable label.
     */
    if (!payload?.company?.name) {
      console.warn(
        '[generate-cu-door-label-pdf] No company.name in payload — document will render unbranded. ' +
          'Check the caller is loading company_profiles.'
      );
    }

    console.log('[generate-cu-door-label-pdf] Creating PDF document...');

    const document = await createPDFMonkeyDocument(payload);
    console.log('[generate-cu-door-label-pdf] Document created:', document.id);

    const completedDocument = await waitForPDFGeneration(document.id);
    console.log('[generate-cu-door-label-pdf] PDF generated successfully');

    /*
     * PDFMonkey's S3 URLs expire after ~1 HOUR (ELE-1082 / ELE-1190), so the
     * document is copied into permanent Supabase storage.
     *
     * Unlike generate-eicr-pdf there is NO `EdgeRuntime.waitUntil` background
     * task here, and that is deliberate: the cert functions use it to write
     * the permanent URL back onto a `reports` row afterwards. A door label has
     * no row to write to, so a background persist would upload a file nothing
     * ever references. A label is one page with no images and renders in about
     * a second, so the race below effectively always resolves to the permanent
     * URL anyway.
     */
    const tempUrl = completedDocument.download_url;
    const authHeader = req.headers.get('Authorization');

    /*
     * `download_url` is optional on the PDFMonkey document, and a status of
     * `success` without one is not something to paper over with a cast — there
     * would be nothing to hand back or persist. Fail loudly instead.
     */
    if (!tempUrl) {
      throw new Error(
        `PDFMonkey reported success for document ${completedDocument.id} but returned no download_url`
      );
    }

    const permanentUrl = await Promise.race([
      persistCertPdf({
        downloadUrl: tempUrl,
        authHeader,
        certType: 'CU-DOOR-LABEL',
        certNumber: payload?.board?.ref,
      }).catch(() => null),
      new Promise<string | null>((resolve) => setTimeout(() => resolve(null), 8000)),
    ]);

    if (permanentUrl) {
      console.log('[generate-cu-door-label-pdf] Persisted to permanent storage:', permanentUrl);
    } else {
      console.warn(
        '[generate-cu-door-label-pdf] Persist did not complete — returning the 1-hour temp URL. ' +
          'Anything storing this link will find it dead later.'
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        documentId: completedDocument.id,
        pdfUrl: permanentUrl || tempUrl,
        downloadUrl: tempUrl,
        previewUrl: completedDocument.preview_url,
        permanent: !!permanentUrl,
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('[generate-cu-door-label-pdf] Error:', error);

    await captureException(error, {
      functionName: 'generate-cu-door-label-pdf',
      requestUrl: req.url,
      requestMethod: req.method,
      extra: { hasPdfMonkeyKey: !!PDFMONKEY_API_KEY },
    });

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});
