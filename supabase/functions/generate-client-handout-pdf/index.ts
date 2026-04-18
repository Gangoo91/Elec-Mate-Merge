import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

const PDFMONKEY_API_KEY = Deno.env.get('PDFMONKEY_API_KEY');

// Template IDs per handout type
const TEMPLATE_IDS: Record<string, string> = {
  'electrical-safety': '4688DBFD-5C18-4D8D-9F42-2CB165E6D5CC',
  'energy-saving': '6DAE07FC-CCEF-4A2C-96E2-E3C42A53871F',
  'eicr-explained': '8B823654-B8C0-42E4-B8CB-5748C64A8591',
  'landlord-guide': '84F40DD8-5D6A-4896-A24E-00DA169FEAA3',
  'new-build-handover': '1CCA1472-7C27-4784-962F-507748D0C11F',
  'ev-charging-guide': '972C8B56-97A5-461A-B1E0-2D442908E9BD',
  'fire-safety-tenants': 'EF2CB499-D6EB-40ED-B3BB-A4D7C15532FE',
  'fire-alarm-guide': 'B02B2793-4E01-4052-B194-88A925410048',
  'pat-testing-explained': '20E00A9C-2908-48AD-AC03-297E4FA487C8',
};

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
  templateId: string
): Promise<PDFMonkeyDocument> {
  const response = await fetch('https://api.pdfmonkey.io/api/v1/documents', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PDFMONKEY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      document: {
        document_template_id: templateId,
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

  try {
    if (!PDFMONKEY_API_KEY) {
      throw new Error('PDFMONKEY_API_KEY environment variable is not set');
    }

    const { formData, handoutType, templateId: customTemplateId } = await req.json();

    if (!formData) {
      throw new Error('No form data provided');
    }

    const templateId = customTemplateId || TEMPLATE_IDS[handoutType] || TEMPLATE_IDS['electrical-safety'];

    console.log('[generate-client-handout-pdf] Creating PDF document');
    console.log('[generate-client-handout-pdf] Handout type:', handoutType);
    console.log('[generate-client-handout-pdf] Template ID:', templateId);
    console.log('[generate-client-handout-pdf] Company:', formData.company_name);

    const document = await createPDFMonkeyDocument(formData, templateId);
    console.log('[generate-client-handout-pdf] Document created:', document.id);

    const completedDocument = await waitForPDFGeneration(document.id);
    console.log('[generate-client-handout-pdf] PDF generated successfully');

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
    console.error('[generate-client-handout-pdf] Error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
