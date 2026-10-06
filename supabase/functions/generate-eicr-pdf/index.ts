import { identifyCaller, deny } from '../_shared/caller.ts';
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { captureException } from '../_shared/sentry.ts';
import { validateEICRPayload } from '../_shared/eicr-payload-schema.ts';
import { persistCertPdf } from '../_shared/persist-cert-pdf.ts';

const PDFMONKEY_API_KEY = Deno.env.get('PDFMONKEY_API_KEY');
const TEMPLATE_ID = '178C3DA6-99D0-490C-A031-23AD55A1134C';

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

async function createPDFMonkeyDocument(formData: any): Promise<PDFMonkeyDocument> {
  const response = await fetch('https://api.pdfmonkey.io/api/v1/documents', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PDFMONKEY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      document: {
        document_template_id: TEMPLATE_ID,
        payload: keepTransformsAsJpeg(formData),
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


// Supabase's image-transform endpoint returns WebP to a fetcher that accepts it
// (PDFMonkey's Chrome does), and Chrome can only embed WebP into a PDF as a
// lossless raster: 26 photos became 23.6 MB inside one EICR (29 Sep 2026,
// Scott, EICR-2026-4308). `format=origin` keeps the JPEG, which embeds as-is.
// The app formatters ask for it too; this catches older clients.
function keepTransformsAsJpeg<T>(payload: T): T {
  const s = JSON.stringify(payload);
  const fixed = s.replace(/(\/storage\/v1\/render\/image\/[^"]*?)(?=")/g, (m) =>
    m.includes('format=') ? m : `${m}&format=origin`
  );
  return fixed === s ? payload : (JSON.parse(fixed) as T);
}

async function getPDFMonkeyDocument(documentId: string): Promise<PDFMonkeyDocument> {
  // PDFMonkey's document endpoint answers 5xx now and then while a render is
  // in flight (29 Sep 2026: three EIC generations failed on a single bad poll
  // and the electrician paid for a second render — the first had succeeded
  // four seconds later). One bad poll is not a failed certificate: retry the
  // read a few times before giving up.
  const MAX_TRIES = 4;
  let lastError: Error | null = null;
  for (let attempt = 1; attempt <= MAX_TRIES; attempt++) {
    try {
      const response = await fetch(`https://api.pdfmonkey.io/api/v1/documents/${documentId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${PDFMONKEY_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        return data.document;
      }
      const errorText = await response.text().catch(() => '');
      console.error(`PDF Monkey fetch error (${response.status}, try ${attempt}/${MAX_TRIES}):`, errorText);
      lastError = new Error(`Failed to fetch PDF document: ${response.status}`);
      // 4xx is not going to change; 5xx and network errors are worth another go.
      if (response.status < 500) throw lastError;
    } catch (err) {
      if (err instanceof Error && /^Failed to fetch PDF document: 4/.test(err.message)) throw err;
      lastError = err instanceof Error ? err : new Error(String(err));
      console.error(`PDF Monkey fetch threw (try ${attempt}/${MAX_TRIES}):`, lastError.message);
    }
    if (attempt < MAX_TRIES) await new Promise((r) => setTimeout(r, 1500 * attempt));
  }
  throw lastError || new Error('Failed to fetch PDF document');
}

async function waitForPDFGeneration(
  documentId: string,
  // ~120s of headroom (60 polls × ~2s) — well under the edge wall-clock limit, but
  // enough for image-heavy EICRs. The real speed fix is resized photos in the
  // formatter; this just stops a slow render dying at the old 30-poll (~57s) ceiling.
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

    // Wait 1 second before checking again
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  throw new Error('PDF generation timed out');
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!PDFMONKEY_API_KEY) {
      throw new Error('PDFMONKEY_API_KEY environment variable is not set');
    }

    const { formData, reportId } = await req.json();
    // Who is asking (7 Oct 2026): anyone with the public key could generate

    // PDFs and overwrite ANY report's pdf_url by naming its report_id. Now a

    // signed-in user (or an internal caller) only, and the pdf_url write goes

    // through the caller's own access so RLS decides whose report it may touch.

    const caller = await identifyCaller(req);

    if (!caller) return deny(corsHeaders);

    const callerAuth = req.headers.get('Authorization') ?? '';

    if (!formData) {
      throw new Error('No form data provided');
    }

    // Validate payload against schema (soft-fail: log but don't block)
    const validation = validateEICRPayload(formData);
    if (!validation.success) {
      const issuesSample = validation.error.issues.slice(0, 10);
      console.error(
        '[generate-eicr-pdf] Schema validation failed:',
        JSON.stringify(issuesSample)
      );
      await captureException(new Error('EICR payload schema drift detected'), {
        functionName: 'generate-eicr-pdf',
        extra: { issues: validation.error.issues.slice(0, 20) },
        tags: { schema_drift: 'true' },
      });
    } else {
      console.log('[generate-eicr-pdf] Schema validation passed');
    }

    console.log('[generate-eicr-pdf] Creating PDF document...');

    // Create the document
    const document = await createPDFMonkeyDocument(formData);
    console.log('[generate-eicr-pdf] Document created:', document.id);

    // Wait for generation to complete
    const completedDocument = await waitForPDFGeneration(document.id);
    console.log('[generate-eicr-pdf] PDF generated successfully');

    // ELE-1082 / ELE-1190 — PDFMonkey S3 URLs expire in 1 HOUR, so we persist to
    // permanent Supabase storage server-side. For heavy EICRs (UNSATISFACTORY,
    // many observations/photos) the download+upload can run long; doing it
    // synchronously before responding made it race the wall-clock and get
    // silently dropped, leaving a 1-hour temp URL on the report. So:
    //  - kick off persist once,
    //  - in the BACKGROUND (waitUntil) finish it and write the permanent URL to
    //    the report row, even after the response is sent,
    //  - race a short window so LIGHT certs still return the permanent URL
    //    immediately (no behaviour change for the common case).
    const tempUrl = completedDocument.download_url;
    const authHeader = req.headers.get('Authorization');

    const persistPromise = persistCertPdf({
      downloadUrl: tempUrl,
      authHeader,
      certType: 'EICR',
      certNumber: formData?.certificateNumber,
    });

    EdgeRuntime.waitUntil(
      (async () => {
        try {
          const permanent = await persistPromise;
          if (permanent && reportId) {
            const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
            const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
            if (SUPABASE_URL && SERVICE_KEY) {
              const admin =
                caller.kind === 'service'
                  ? createClient(SUPABASE_URL, SERVICE_KEY)
                  : createClient(SUPABASE_URL, Deno.env.get('SUPABASE_ANON_KEY')!, {
                      global: { headers: { Authorization: callerAuth } },
                    });
              await admin
                .from('reports')
                .update({ pdf_url: permanent, pdf_generated_at: new Date().toISOString() })
                .eq('report_id', reportId);
              console.log('[generate-eicr-pdf] report pdf_url updated to permanent (bg)');
            }
          } else if (!permanent) {
            console.error('[generate-eicr-pdf] background persist returned null');
          }
        } catch (e) {
          console.error('[generate-eicr-pdf] background persist/update failed:', (e as Error).message);
        }
      })()
    );

    // Let persist win if it's quick (light certs); otherwise return the fresh
    // temp URL now and let the background task store the permanent one.
    const permanentUrl = await Promise.race([
      persistPromise.catch(() => null),
      new Promise<string | null>((resolve) => setTimeout(() => resolve(null), 8000)),
    ]);

    if (permanentUrl) {
      console.log('[generate-eicr-pdf] Persisted to permanent storage:', permanentUrl);
    } else {
      console.log('[generate-eicr-pdf] Persist running in background — returning fresh temp URL for now');
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
    console.error('[generate-eicr-pdf] Error:', error);

    // Capture to Sentry
    await captureException(error, {
      functionName: 'generate-eicr-pdf',
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
