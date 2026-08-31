/**
 * generate-plug-in-solar-pdf — ELE-1660
 *
 * Renders the Plug-in Solar Suitability & Commissioning Certificate through
 * PDFMonkey template `c89ed40e-…`, then persists the result to Supabase storage.
 *
 * PDFMonkey's S3 download URLs expire after an hour, so the permanent copy is
 * written by `persistCertPdf` — raced against a short window so a light document
 * returns the permanent URL immediately, with the background task finishing the
 * job for anything slower. Same shape as generate-eicr-pdf; see the notes there.
 */

import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { captureException } from '../_shared/sentry.ts';
import { persistCertPdf } from '../_shared/persist-cert-pdf.ts';

const PDFMONKEY_API_KEY = Deno.env.get('PDFMONKEY_API_KEY');

/**
 * Two documents off one payload.
 *
 * `assessment` is the full record for the electrician and the client.
 * `decision` is the one-page answer for a landlord or managing agent — same
 * findings, written for someone who is not an electrician and needs a yes or no
 * in writing. Keeping them on a single payload means the two can never disagree
 * about what was found.
 */
const TEMPLATES = {
  assessment: 'c89ed40e-63e8-4697-ac24-48e2705e0291',
  decision: 'e65c9c08-3e01-40f1-8b89-18a9d5b52510',
} as const;

type Variant = keyof typeof TEMPLATES;

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
  failure_cause?: string;
}

async function createDocument(payload: unknown, variant: Variant): Promise<PDFMonkeyDocument> {
  const response = await fetch('https://api.pdfmonkey.io/api/v1/documents', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PDFMONKEY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      document: { document_template_id: TEMPLATES[variant], payload, status: 'pending' },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('[generate-plug-in-solar-pdf] create error:', errorText);
    throw new Error(`Failed to create PDF document: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data.document;
}

async function getDocument(documentId: string): Promise<PDFMonkeyDocument> {
  const response = await fetch(`https://api.pdfmonkey.io/api/v1/documents/${documentId}`, {
    headers: {
      Authorization: `Bearer ${PDFMONKEY_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch PDF document: ${response.status}`);
  }

  const data = await response.json();
  return data.document;
}

/** ~60s of headroom. This document has no photographs, so it renders fast. */
async function waitForGeneration(documentId: string, maxAttempts = 40): Promise<PDFMonkeyDocument> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const document = await getDocument(documentId);

    if (document.status === 'success') return document;
    if (document.status === 'failure') {
      const cause = document.failure_cause || document.errors?.join(', ') || 'Unknown error';
      throw new Error(`PDF generation failed: ${cause}`);
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

    const { formData, reportId, variant } = await req.json();
    if (!formData) throw new Error('No form data provided');

    const chosen: Variant = variant === 'decision' ? 'decision' : 'assessment';
    const document = await createDocument(formData, chosen);
    const completed = await waitForGeneration(document.id);

    const tempUrl = completed.download_url;
    const authHeader = req.headers.get('Authorization');

    const persistPromise = persistCertPdf({
      downloadUrl: tempUrl,
      authHeader,
      certType: chosen === 'decision' ? 'Plug-in Solar Decision' : 'Plug-in Solar',
      certNumber: formData?.metadata?.certificate_number,
    });

    EdgeRuntime.waitUntil(
      (async () => {
        try {
          const permanent = await persistPromise;
          // Only the full assessment owns the report's pdf_url. The decision
          // sheet is supplementary and must not overwrite the main document.
          if (permanent && reportId && chosen === 'assessment') {
            const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
            const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
            if (SUPABASE_URL && SERVICE_KEY) {
              const admin = createClient(SUPABASE_URL, SERVICE_KEY);
              await admin
                .from('reports')
                .update({
                  pdf_url: permanent,
                  pdf_generated_at: new Date().toISOString(),
                  // Store the payload the PDF was built from. send-certificate-resend
                  // regenerates when the report has been edited since the PDF was
                  // made, and it looks here for the data to do it with — without
                  // this it silently emails the stale PDF instead.
                  pdf_payload: formData,
                })
                .eq('report_id', reportId);
            }
          }
        } catch (e) {
          console.error(
            '[generate-plug-in-solar-pdf] background persist failed:',
            (e as Error).message,
          );
        }
      })(),
    );

    const permanentUrl = await Promise.race([
      persistPromise.catch(() => null),
      new Promise<string | null>((resolve) => setTimeout(() => resolve(null), 8000)),
    ]);

    return new Response(
      JSON.stringify({
        success: true,
        documentId: completed.id,
        pdfUrl: permanentUrl || tempUrl,
        downloadUrl: tempUrl,
        previewUrl: completed.preview_url,
        permanent: !!permanentUrl,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (error) {
    console.error('[generate-plug-in-solar-pdf] Error:', error);
    await captureException(error, {
      functionName: 'generate-plug-in-solar-pdf',
      requestUrl: req.url,
      requestMethod: req.method,
      extra: { hasPdfMonkeyKey: !!PDFMONKEY_API_KEY },
    });

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
