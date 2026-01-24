import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const PDFMONKEY_API_KEY = Deno.env.get('PDFMONKEY_API_KEY');
const TEMPLATE_ID = '178C3DA6-99D0-490C-A031-23AD55A1134C';

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

async function createPDFMonkeyDocument(formData: any): Promise<PDFMonkeyDocument> {
  const response = await fetch('https://api.pdfmonkey.io/api/v1/documents', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${PDFMONKEY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      document: {
        document_template_id: TEMPLATE_ID,
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

    // Wait 1 second before checking again
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

    const { formData } = await req.json();

    if (!formData) {
      throw new Error('No form data provided');
    }

    console.log('[generate-eicr-pdf] Creating PDF document...');
    console.log('[generate-eicr-pdf] Client:', formData.client_details?.client_name);
    console.log('[generate-eicr-pdf] Address:', formData.installation_details?.address);

    // Debug inspection_checklist
    console.log('[generate-eicr-pdf] inspection_checklist present:', !!formData.inspection_checklist);
    console.log('[generate-eicr-pdf] inspection_checklist length:', formData.inspection_checklist?.length || 0);
    if (formData.inspection_checklist?.length > 0) {
      console.log('[generate-eicr-pdf] First inspection item:', JSON.stringify(formData.inspection_checklist[0]));
      console.log('[generate-eicr-pdf] Sample outcomes:', formData.inspection_checklist.slice(0, 5).map((i: any) => i.outcome));
    }

    // Log full payload keys
    console.log('[generate-eicr-pdf] Payload top-level keys:', Object.keys(formData));

    // Debug flat inspection keys
    const flatInspKeys = Object.keys(formData).filter(k => k.startsWith('insp_'));
    console.log('[generate-eicr-pdf] Flat inspection keys count:', flatInspKeys.length);
    console.log('[generate-eicr-pdf] Sample flat keys:', flatInspKeys.slice(0, 10));
    if (flatInspKeys.length > 0) {
      console.log('[generate-eicr-pdf] insp_1_0_acc =', formData.insp_1_0_acc);
      console.log('[generate-eicr-pdf] insp_3_5_c1c2 =', formData.insp_3_5_c1c2);
    }

    // Debug test value
    console.log('[generate-eicr-pdf] inspection_debug_test =', formData.inspection_debug_test);

    // Create the document
    const document = await createPDFMonkeyDocument(formData);
    console.log('[generate-eicr-pdf] Document created:', document.id);

    // Wait for generation to complete
    const completedDocument = await waitForPDFGeneration(document.id);
    console.log('[generate-eicr-pdf] PDF generated successfully');

    // Calculate expiry (PDF Monkey URLs typically expire after 7 days)
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

    return new Response(
      JSON.stringify({
        success: true,
        documentId: completedDocument.id,
        pdfUrl: completedDocument.download_url,
        downloadUrl: completedDocument.download_url,
        previewUrl: completedDocument.preview_url,
        expiresAt,
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
