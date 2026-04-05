import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

const PDFMONKEY_API_KEY = Deno.env.get('PDFMONKEY_API_KEY');
const TEMPLATE_ID = '2108C6B5-7CD8-4D9E-B134-41652D3A372B';

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
  maxAttempts = 30
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

    const { formData, templateId } = await req.json();

    if (!formData) {
      throw new Error('No form data provided');
    }

    console.log('[generate-danger-notice-pdf] Creating PDF document');
    console.log('[generate-danger-notice-pdf] Reference:', formData.reference_number);
    console.log('[generate-danger-notice-pdf] Client:', formData.client_name);
    console.log('[generate-danger-notice-pdf] Dangers count:', formData.dangers?.length || 0);
    console.log('[generate-danger-notice-pdf] Linked EICR:', formData.linked_eicr_cert_number || 'none');

    // Create PDF document
    const document = await createPDFMonkeyDocument(formData, templateId);
    console.log('[generate-danger-notice-pdf] Document created:', document.id);

    // Wait for generation
    const completedDocument = await waitForPDFGeneration(document.id);
    console.log('[generate-danger-notice-pdf] PDF generated successfully');

    return new Response(
      JSON.stringify({
        success: true,
        document_id: completedDocument.id,
        download_url: completedDocument.download_url,
        preview_url: completedDocument.preview_url,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('[generate-danger-notice-pdf] Error:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
