import { corsHeaders } from '../_shared/cors.ts';

const PDF_MONKEY_API_KEY = Deno.env.get('PDF_MONKEY_API_KEY');
const TEMPLATE_ID = '575204BB-6BC8-4CC0-AA7C-242F707AE04F';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { projectData } = await req.json();

    if (!projectData) {
      return new Response(
        JSON.stringify({ error: 'Missing projectData' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('🚀 Generating PDF for project:', projectData.projectName);

    // Generate PDF with PDF Monkey
    const generateResponse = await fetch('https://api.pdfmonkey.io/api/v1/documents', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PDF_MONKEY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        document: {
          document_template_id: TEMPLATE_ID,
          payload: projectData,
          status: 'pending',
        },
      }),
    });

    if (!generateResponse.ok) {
      const errorText = await generateResponse.text();
      console.error('PDF Monkey generation failed:', errorText);
      throw new Error(`PDF generation failed: ${generateResponse.status}`);
    }

    const generateData = await generateResponse.json();
    const documentId = generateData.document.id;
    console.log('📄 Document created:', documentId);

    // Poll for completion (max 60 seconds)
    const maxAttempts = 30;
    const pollInterval = 2000; // 2 seconds
    let attempts = 0;
    let downloadUrl = null;

    while (attempts < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, pollInterval));
      attempts++;

      const statusResponse = await fetch(
        `https://api.pdfmonkey.io/api/v1/documents/${documentId}`,
        {
          headers: {
            'Authorization': `Bearer ${PDF_MONKEY_API_KEY}`,
          },
        }
      );

      if (!statusResponse.ok) {
        console.error('Status check failed:', statusResponse.status);
        continue;
      }

      const statusData = await statusResponse.json();
      const status = statusData.document.status;

      console.log(`📊 Poll attempt ${attempts}/${maxAttempts}: ${status}`);

      if (status === 'success') {
        downloadUrl = statusData.document.download_url;
        console.log('✅ PDF ready:', downloadUrl);
        break;
      }

      if (status === 'failure') {
        throw new Error('PDF generation failed on PDF Monkey side');
      }
    }

    if (!downloadUrl) {
      throw new Error('PDF generation timeout after 60 seconds');
    }

    return new Response(
      JSON.stringify({
        success: true,
        downloadUrl,
        documentId,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('❌ PDF generation error:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error',
        success: false,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
