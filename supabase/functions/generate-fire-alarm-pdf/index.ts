import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { captureException } from '../_shared/sentry.ts';

const PDFMONKEY_API_KEY = Deno.env.get('PDFMONKEY_API_KEY');
const TEMPLATE_ID = '9ED166BD-FB05-4489-868F-673902FF2DBF';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface PDFMonkeyDocument {
  id: string;
  status: string;
  download_url?: string;
  preview_url?: string;
  errors?: string[];
}

async function createPDFMonkeyDocument(formData: any, templateId?: string): Promise<PDFMonkeyDocument> {
  const response = await fetch('https://api.pdfmonkey.io/api/v1/documents', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${PDFMONKEY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      document: {
        document_template_id: templateId || TEMPLATE_ID,
        payload: formData,
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
      'Authorization': `Bearer ${PDFMONKEY_API_KEY}`,
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

async function waitForPDFGeneration(documentId: string, maxAttempts = 30): Promise<PDFMonkeyDocument> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const document = await getPDFMonkeyDocument(documentId);

    console.log(`[Attempt ${attempt + 1}] Document status: ${document.status}`);

    if (document.status === 'success') {
      return document;
    }

    if (document.status === 'failure') {
      throw new Error(`PDF generation failed: ${document.errors?.join(', ') || 'Unknown error'}`);
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
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

    const { formData, templateId } = await req.json();

    if (!formData) {
      throw new Error('No form data provided');
    }

    console.log('[generate-fire-alarm-pdf] Creating PDF document');
    console.log('[generate-fire-alarm-pdf] Form data keys:', Object.keys(formData));

    // Log key sections for debugging
    console.log('[generate-fire-alarm-pdf] Client details:', JSON.stringify(formData.client_details, null, 2));
    console.log('[generate-fire-alarm-pdf] System details:', JSON.stringify(formData.system_details, null, 2));
    console.log('[generate-fire-alarm-pdf] Test results:', JSON.stringify(formData.test_results, null, 2));
    console.log('[generate-fire-alarm-pdf] Declarations:', JSON.stringify(formData.declarations, null, 2));

    // Create the document
    const document = await createPDFMonkeyDocument(formData, templateId);
    console.log('Document created with ID:', document.id);

    // Wait for generation to complete
    const completedDocument = await waitForPDFGeneration(document.id);

    // Calculate expiry (PDF Monkey URLs typically expire after 7 days)
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

    return new Response(
      JSON.stringify({
        success: true,
        pdfUrl: completedDocument.download_url,
        previewUrl: completedDocument.preview_url,
        documentId: completedDocument.id,
        expiresAt,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Fire Alarm PDF generation error:', error);
    await captureException(error, { functionName: 'generate-fire-alarm-pdf', requestUrl: req.url, requestMethod: req.method });
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
