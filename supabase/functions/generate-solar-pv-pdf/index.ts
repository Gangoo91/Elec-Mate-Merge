import { identifyCaller, deny } from '../_shared/caller.ts';
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { captureException } from '../_shared/sentry.ts';
import { solarPVPayloadSchema } from '../_shared/solar-pv-payload-schema.ts';
import { persistCertPdf } from '../_shared/persist-cert-pdf.ts';

const PDFMONKEY_API_KEY = Deno.env.get('PDFMONKEY_API_KEY');
// TODO: Create template in PDF Monkey and update this ID
const TEMPLATE_ID = '3AE10F9E-6BDA-4DF2-ABF1-20AFADEF5156';

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

async function createPDFMonkeyDocument(
  formData: any,
  templateId?: string
): Promise<PDFMonkeyDocument> {
  const response = await fetch('https://api.pdfmonkey.io/api/v1/documents', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PDFMONKEY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      document: {
        document_template_id: templateId || TEMPLATE_ID,
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
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Signed-in users (or internal callers) only: this runs paid PDF / AI work.
  // The anon key passes verify_jwt, so this check is the real gate (7 Oct 2026).
  {
    const caller = await identifyCaller(req);
    if (!caller) return deny(corsHeaders);
  }

  try {
    if (!PDFMONKEY_API_KEY) {
      throw new Error('PDFMONKEY_API_KEY environment variable is not set');
    }

    const { formData, templateId } = await req.json();

    if (!formData) {
      throw new Error('No form data provided');
    }

    console.log('[generate-solar-pv-pdf] Creating PDF document');
    console.log('[generate-solar-pv-pdf] Form data keys:', Object.keys(formData));

    // Validate payload against schema (soft-fail: log but don't block)
    const validation = solarPVPayloadSchema.safeParse(formData);
    if (!validation.success) {
      console.error('[generate-solar-pv-pdf] Schema validation failed:',
        JSON.stringify(validation.error.issues.slice(0, 10)));
      await captureException(new Error('Solar PV payload schema drift detected'), {
        functionName: 'generate-solar-pv-pdf',
        extra: { issues: validation.error.issues.slice(0, 20) },
        tags: { schema_drift: 'true' },
      });
    }

    // Log key sections for debugging
    console.log('[generate-solar-pv-pdf] Certificate number:', formData.certificate_number);
    console.log('[generate-solar-pv-pdf] Client name:', formData.client_name);
    console.log('[generate-solar-pv-pdf] Total capacity:', formData.total_capacity);
    console.log('[generate-solar-pv-pdf] Arrays count:', formData.array_count);
    console.log('[generate-solar-pv-pdf] Inverters count:', formData.inverter_count);
    console.log(
      '[generate-solar-pv-pdf] MCS details:',
      JSON.stringify(formData.mcs_details, null, 2)
    );
    console.log(
      '[generate-solar-pv-pdf] Grid connection:',
      JSON.stringify(formData.grid_connection, null, 2)
    );

    // Create the document
    const document = await createPDFMonkeyDocument(formData, templateId);
    console.log('Document created with ID:', document.id);

    // Wait for generation to complete
    const completedDocument = await waitForPDFGeneration(document.id);

    // ELE-1082 — PDFMonkey URLs expire in 1h; persist server-side, return permanent.
    const __permUrl = await persistCertPdf({
      downloadUrl: completedDocument.download_url,
      authHeader: req.headers.get('Authorization'),
      certType: 'SolarPV',
      certNumber: (typeof formData !== 'undefined' && formData?.certificateNumber) || undefined,
    });

    // Calculate expiry (PDF Monkey URLs typically expire after 7 days)
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

    return new Response(
      JSON.stringify({
        success: true,
        pdfUrl: __permUrl || completedDocument.download_url,
        permanent: !!__permUrl,
        previewUrl: completedDocument.preview_url,
        documentId: completedDocument.id,
        expiresAt,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Solar PV PDF generation error:', error);
    await captureException(error, {
      functionName: 'generate-solar-pv-pdf',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
