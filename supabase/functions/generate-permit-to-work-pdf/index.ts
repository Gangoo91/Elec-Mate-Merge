import { identifyCaller, deny } from '../_shared/caller.ts';
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { captureException } from '../_shared/sentry.ts';

const PDFMONKEY_API_KEY = Deno.env.get('PDFMONKEY_API_KEY');
const TEMPLATE_ID = '739FCCE3-8FCD-4B50-8AF4-16D430F0B0FB';

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
  payload: Record<string, unknown>,
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

    if (document.status === 'success') return document;
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

    console.log('[generate-permit-to-work-pdf] Creating PDF document');
    console.log('[generate-permit-to-work-pdf] Permit:', formData.permit_number);
    console.log('[generate-permit-to-work-pdf] Work:', formData.description_of_work);
    console.log('[generate-permit-to-work-pdf] Site:', formData.site_name);

    const document = await createPDFMonkeyDocument(formData, templateId);
    console.log('[generate-permit-to-work-pdf] Document created:', document.id);

    const completedDocument = await waitForPDFGeneration(document.id);
    console.log('[generate-permit-to-work-pdf] PDF generated successfully');

    return new Response(
      JSON.stringify({
        success: true,
        document_id: completedDocument.id,
        download_url: completedDocument.download_url,
        preview_url: completedDocument.preview_url,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    await captureException(error, { functionName: 'generate-permit-to-work-pdf', requestUrl: req.url, requestMethod: req.method });
    console.error('[generate-permit-to-work-pdf] Error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
