import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { captureException } from '../_shared/sentry.ts';
import { persistCertPdf } from '../_shared/persist-cert-pdf.ts';

/**
 * Board Schedule PDF (ELE-1615, and ELE-1614 via flags.three_phase).
 *
 * Deliberately mirrors `generate-eicr-pdf`: same create → poll → persist shape,
 * same 60-attempt ceiling, same shared persist helper. ELE-417 proposed
 * replacing that polling with a shared async architecture and was closed as
 * not-needed (Andrew, 27 Aug 2026) — consistency with the ten functions that
 * already work beats a bespoke approach here.
 *
 * The client builds the payload, exactly as the cert formatters do. Contract
 * lives on the template itself (`1a97d560-…`), which is the source of truth —
 * there is no repo copy of the template by design.
 */

const PDFMONKEY_API_KEY = Deno.env.get('PDFMONKEY_API_KEY');
const TEMPLATE_ID = '1a97d560-3200-4162-8ba4-cb8259325ae0';

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
     * unbranded document. The whole reason this ticket exists is that
     * BoardSchedulePage hardcoded `companyName: ''` for months and nobody
     * noticed the PDFs were blank of company details — a silent empty field
     * is exactly how that goes unseen. The render still proceeds: an
     * unbranded schedule is a valid document, just not the intended one.
     */
    if (!payload?.company?.name) {
      console.warn(
        '[generate-board-schedule-pdf] No company.name in payload — document will render unbranded. ' +
          'Check the caller is loading company_profiles.'
      );
    }

    console.log('[generate-board-schedule-pdf] Creating PDF document...');

    const document = await createPDFMonkeyDocument(payload);
    console.log('[generate-board-schedule-pdf] Document created:', document.id);

    const completedDocument = await waitForPDFGeneration(document.id);
    console.log('[generate-board-schedule-pdf] PDF generated successfully');

    /*
     * PDFMonkey's S3 URLs expire after ~1 HOUR (ELE-1082 / ELE-1190), so the
     * document is copied into permanent Supabase storage.
     *
     * Unlike generate-eicr-pdf there is NO `EdgeRuntime.waitUntil` background
     * task here, and that is deliberate: the cert functions use it to write
     * the permanent URL back onto a `reports` row afterwards. A board schedule
     * has no row to write to, so a background persist would upload a file that
     * nothing ever references. Board schedules carry no photos and render in
     * a second or two, so the race below effectively always resolves to the
     * permanent URL anyway.
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
        certType: 'BOARD-SCHEDULE',
        certNumber: payload?.board?.ref,
      }).catch(() => null),
      new Promise<string | null>((resolve) => setTimeout(() => resolve(null), 8000)),
    ]);

    if (permanentUrl) {
      console.log('[generate-board-schedule-pdf] Persisted to permanent storage:', permanentUrl);
    } else {
      console.warn(
        '[generate-board-schedule-pdf] Persist did not complete — returning the 1-hour temp URL. ' +
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
    console.error('[generate-board-schedule-pdf] Error:', error);

    await captureException(error, {
      functionName: 'generate-board-schedule-pdf',
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
