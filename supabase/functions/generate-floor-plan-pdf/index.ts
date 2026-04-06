import { serve, corsHeaders } from '../_shared/deps.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) throw new Error('Missing authorization');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const body = await req.json();
    const {
      floor_plan_id,
      property_address,
      client_name,
      electrician_name,
      date,
      drawing_number,
      notes,
      rooms,
      materials_by_category,
      total_items,
      all_symbols,
    } = body;

    const pdfMonkeyKey = Deno.env.get('PDFMONKEY_API_KEY');
    if (!pdfMonkeyKey) throw new Error('PDFMONKEY_API_KEY not configured');

    const templateId = Deno.env.get('FLOOR_PLAN_TEMPLATE_ID');
    if (!templateId) throw new Error('FLOOR_PLAN_TEMPLATE_ID not configured');

    // Call PDFMonkey API
    const pdfResponse = await fetch('https://api.pdfmonkey.io/api/v1/documents', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${pdfMonkeyKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        document: {
          document_template_id: templateId,
          status: 'pending',
          payload: {
            property_address,
            client_name,
            electrician_name,
            date,
            drawing_number: drawing_number || 'EL-001',
            notes: notes || '',
            rooms: rooms || [],
            materials_by_category: materials_by_category || [],
            total_items: total_items || 0,
            all_symbols: all_symbols || [],
          },
        },
      }),
    });

    if (!pdfResponse.ok) {
      const errorText = await pdfResponse.text();
      throw new Error(`PDFMonkey error: ${pdfResponse.status} — ${errorText}`);
    }

    const pdfData = await pdfResponse.json();
    const documentId = pdfData.document?.id;

    if (!documentId) {
      throw new Error('No document ID returned from PDFMonkey');
    }

    // Poll for completion (max 30 seconds)
    let pdfUrl = null;
    for (let i = 0; i < 15; i++) {
      await new Promise((r) => setTimeout(r, 2000));

      const statusResponse = await fetch(
        `https://api.pdfmonkey.io/api/v1/documents/${documentId}`,
        {
          headers: { Authorization: `Bearer ${pdfMonkeyKey}` },
        }
      );

      if (!statusResponse.ok) continue;

      const statusData = await statusResponse.json();
      const status = statusData.document?.status;

      if (status === 'success') {
        pdfUrl = statusData.document?.download_url;
        break;
      } else if (status === 'failure') {
        throw new Error(
          'PDF generation failed: ' + (statusData.document?.failure_cause || 'Unknown')
        );
      }
    }

    if (!pdfUrl) {
      // Return document ID for async pickup
      return new Response(
        JSON.stringify({
          success: true,
          status: 'processing',
          documentId,
          message: 'PDF is still generating. Check back shortly.',
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update floor plan record with PDF URL
    if (floor_plan_id) {
      await supabase
        .from('floor_plans')
        .update({
          pdf_url: pdfUrl,
          status: 'exported',
          updated_at: new Date().toISOString(),
        })
        .eq('id', floor_plan_id)
        .eq('user_id', user.id);
    }

    return new Response(
      JSON.stringify({
        success: true,
        status: 'completed',
        pdf_url: pdfUrl,
        documentId,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Floor plan PDF error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate PDF',
      }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
