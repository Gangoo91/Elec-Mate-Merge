import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const PDFMONKEY_API_KEY = Deno.env.get('PDFMONKEY_API_KEY');
const TEMPLATE_ID = 'B39538E9-8FF1-4882-BC13-70B1C0D30947';

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

    const { formData, templateId } = await req.json();

    if (!formData) {
      throw new Error('No form data provided');
    }

    console.log('[generate-eic-pdf] Creating PDF document with template:', templateId || TEMPLATE_ID);
    console.log('[generate-eic-pdf] Form data top-level keys:', Object.keys(formData));

    // Debug flat inspection keys (like EICR does)
    const flatInspKeys = Object.keys(formData).filter(k => k.startsWith('insp_'));
    console.log('[generate-eic-pdf] Flat inspection keys count:', flatInspKeys.length);
    console.log('[generate-eic-pdf] Flat inspection keys:', flatInspKeys);

    // Log actual values
    console.log('[generate-eic-pdf] insp_1 =', formData.insp_1);
    console.log('[generate-eic-pdf] insp_2 =', formData.insp_2);
    console.log('[generate-eic-pdf] insp_3 =', formData.insp_3);
    console.log('[generate-eic-pdf] insp_14 =', formData.insp_14);

    // Debug earth electrode fields
    console.log('[generate-eic-pdf] earth_electrode_type =', formData.earth_electrode_type);
    console.log('[generate-eic-pdf] earth_electrode_location =', formData.earth_electrode_location);
    console.log('[generate-eic-pdf] earth_electrode_resistance =', formData.earth_electrode_resistance);
    console.log('[generate-eic-pdf] earthing_bonding =', JSON.stringify(formData.earthing_bonding, null, 2));

    // Debug departures fields
    console.log('[generate-eic-pdf] designer_departures =', formData.designer_departures);
    console.log('[generate-eic-pdf] permitted_exceptions =', formData.permitted_exceptions);
    console.log('[generate-eic-pdf] designer.departures =', formData.designer?.departures);
    console.log('[generate-eic-pdf] designer.permitted_exceptions =', formData.designer?.permitted_exceptions);

    // Debug SPD fields
    console.log('[generate-eic-pdf] distribution_board_verification =', JSON.stringify(formData.distribution_board_verification, null, 2));
    console.log('[generate-eic-pdf] distribution_boards count =', formData.distribution_boards?.length);
    if (formData.distribution_boards?.[0]) {
      console.log('[generate-eic-pdf] First board SPD fields:', {
        spd_t1: formData.distribution_boards[0].spd_t1,
        spd_t2: formData.distribution_boards[0].spd_t2,
        spd_t3: formData.distribution_boards[0].spd_t3,
        spd_na: formData.distribution_boards[0].spd_na
      });
    }

    // Full payload for debugging (careful - can be large)
    console.log('[generate-eic-pdf] FULL PAYLOAD:', JSON.stringify(formData, null, 2));

    // Debug nested objects specifically (these are the ones having issues)
    console.log('[generate-eic-pdf] NESTED OBJECTS:');
    console.log('  earthing_bonding:', JSON.stringify(formData.earthing_bonding, null, 2));
    console.log('  designer:', JSON.stringify(formData.designer, null, 2));
    console.log('  main_protective_device:', JSON.stringify(formData.main_protective_device, null, 2));

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
    console.error('EIC PDF generation error:', error);
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
