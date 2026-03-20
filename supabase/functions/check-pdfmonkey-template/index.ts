import { serve } from '../_shared/deps.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { templateId } = await req.json();
    const pdfMonkeyApiKey = Deno.env.get('PDFMONKEY_API_KEY');

    console.log('🔍 Checking PDF Monkey template:', templateId);

    if (!pdfMonkeyApiKey) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'PDFMONKEY_API_KEY not configured',
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Check if template exists and get details
    const response = await fetch(
      `https://api.pdfmonkey.io/api/v1/document_templates/${templateId}`,
      {
        headers: {
          Authorization: `Bearer ${pdfMonkeyApiKey}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Template check failed:', response.status, errorText);

      return new Response(
        JSON.stringify({
          success: false,
          error: `Template check failed: ${response.status}`,
          details: errorText,
          templateId: templateId,
        }),
        {
          status: response.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const templateData = await response.json();

    console.log('✅ Template found:', {
      id: templateData.document_template?.id,
      name: templateData.document_template?.name,
      app_id: templateData.document_template?.app_id,
    });

    return new Response(
      JSON.stringify({
        success: true,
        template: {
          id: templateData.document_template.id,
          name: templateData.document_template.name,
          app_id: templateData.document_template.app_id,
          created_at: templateData.document_template.created_at,
          updated_at: templateData.document_template.updated_at,
        },
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('❌ Error checking template:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to check template',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
