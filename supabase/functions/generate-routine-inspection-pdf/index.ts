import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { captureException } from '../_shared/sentry.ts';
import { persistCertPdf } from '../_shared/persist-cert-pdf.ts';

/**
 * Routine Inspection & Thermal Imaging Report PDF (ELE-1110).
 *
 * Mirrors `generate-visual-condition-pdf`: same create → poll → persist shape,
 * same shared persist helper.
 *
 * 🔴 This document is NOT a BS 7671 model form, and nothing in BS 7671 governs
 * thermography at all. Its standing is Regulation 4(2) of the Electricity at
 * Work Regulations 1989 — the duty to maintain systems so as to prevent danger.
 * The template prints a fixed limitations statement saying exactly that: no
 * verification testing was carried out, it is not an EICR, and a satisfactory
 * result means no defect was found on the visit rather than that the
 * installation was proven safe. Do not remove or soften it.
 *
 * 🔴 The thermal severity ratings are the NETA temperature-rise criteria, which
 * are guidance for prioritising remedial work — not a statement of compliance.
 * Priority 2 exists ONLY against ambient air; there is no similar-component
 * equivalent. See `src/types/routine-inspection.ts`.
 *
 * 🔴 Page margins are a TEMPLATE SETTING, not CSS. PDFMonkey ignores the CSS
 * `@page` rule; size, orientation and margins come from the `settings` blob on
 * the API resource. Templates left on the default zero margin print flush to
 * the paper and get clipped by every printer (ELE-1629 / ELE-1633).
 */

const PDFMONKEY_API_KEY = Deno.env.get('PDFMONKEY_API_KEY');
const TEMPLATE_ID = '11506cfb-61a6-4b53-88fc-511399fa8c53';

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

    if (!payload?.inspection) {
      throw new Error('No inspection data provided');
    }

    /*
     * ⚠️ Log loudly when branding is absent rather than quietly rendering an
     * unbranded document. BoardSchedulePage hardcoded `companyName: ''` for
     * months and nobody noticed the PDFs were blank of company details — a
     * silent empty field is exactly how that goes unseen. The render still
     * proceeds: an unbranded report is a valid document, just not the intended
     * one.
     */
    if (!payload?.company?.name) {
      console.warn(
        '[generate-routine-inspection-pdf] No company.name in payload — document will render unbranded. ' +
          'Check the caller is loading company_profiles.'
      );
    }

    console.log('[generate-routine-inspection-pdf] Creating PDF document...');

    const document = await createPDFMonkeyDocument(payload);
    console.log('[generate-routine-inspection-pdf] Document created:', document.id);

    const completedDocument = await waitForPDFGeneration(document.id);
    console.log('[generate-routine-inspection-pdf] PDF generated successfully');

    /*
     * PDFMonkey's S3 URLs expire after ~1 HOUR (ELE-1082 / ELE-1190), so the
     * document is copied into permanent Supabase storage.
     *
     * The page writes `pdf_url` onto the `reports` row itself from the value
     * returned here, so there is no `EdgeRuntime.waitUntil` background persist.
     *
     * ⚠️ This report CAN carry a lot of images — up to six per observation plus
     * a thermal and a visible image per finding — so the 8-second race below is
     * likelier to time out here than on a board schedule. When it does, the
     * caller gets the 1-hour temp URL and the stored link dies later. If that
     * shows up in practice the fix is a background persist that writes the
     * permanent URL back, not a longer timeout.
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
        certType: 'ROUTINE-INSPECTION',
        certNumber: payload?.metadata?.certificate_number,
      }).catch(() => null),
      new Promise<string | null>((resolve) => setTimeout(() => resolve(null), 8000)),
    ]);

    if (permanentUrl) {
      console.log('[generate-routine-inspection-pdf] Persisted to permanent storage:', permanentUrl);
    } else {
      console.warn(
        '[generate-routine-inspection-pdf] Persist did not complete — returning the 1-hour temp URL. ' +
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
    console.error('[generate-routine-inspection-pdf] Error:', error);

    await captureException(error, {
      functionName: 'generate-routine-inspection-pdf',
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
