import { serve, corsHeaders } from '../_shared/deps.ts';

const PDF_MONKEY_API_KEY = Deno.env.get('PDF_MONKEY_API_KEY');
const COST_ENGINEER_TEMPLATE_ID = '2712CFF0-FA41-4792-AF5E-0FE7ED16B4EE';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('[COST-PDF] Request started');

    // Verify PDF Monkey API key is configured
    if (!PDF_MONKEY_API_KEY) {
      console.error('[COST-PDF] API key not configured');
      return new Response(
        JSON.stringify({ error: 'PDF Monkey API key not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Parse request body
    const data = await req.json();
    console.log('[COST-PDF] Received cost analysis data:', {
      projectName: data.projectName,
      materialsCount: data.materials?.items?.length || 0,
      labourTasksCount: data.labour?.tasks?.length || 0,
      netTotal: data.summary?.netTotal
    });

    // Transform data for PDF Monkey template
    const payload = {
      // Project Header
      project_name: data.projectName || 'Electrical Project',
      client_name: data.clientName || '',
      location: data.location || '',
      project_type: data.projectType || 'domestic',
      generated_date: data.generatedDate || new Date().toLocaleDateString('en-GB'),
      
      // Cost Summary
      summary: {
        materials_subtotal: data.summary?.materialsSubtotal || 0,
        labour_subtotal: data.summary?.labourSubtotal || 0,
        net_total: data.summary?.netTotal || 0,
        vat: data.summary?.vat || 0,
        vat_rate: data.summary?.vatRate || 20,
        grand_total: data.summary?.grandTotal || 0
      },
      
      // Materials Breakdown
      materials: {
        items: (data.materials?.items || []).map((item: any) => ({
          description: item.description || item.name || '',
          quantity: item.quantity || 0,
          unit: item.unit || 'each',
          unit_price: item.unitPrice || item.price || 0,
          total: item.total || (item.quantity * (item.unitPrice || item.price || 0))
        })),
        subtotal: data.materials?.subtotal || 0
      },
      
      // Labour Breakdown
      labour: {
        tasks: (data.labour?.tasks || []).map((task: any) => ({
          description: task.description || '',
          hours: task.hours || 0,
          rate: task.rate || 0,
          total: task.total || (task.hours * task.rate)
        })),
        subtotal: data.labour?.subtotal || 0
      },
      
      // Enhanced V3 Data (optional)
      timescales: data.timescales ? {
        overall: data.timescales.overall || '',
        phases: (data.timescales.phases || []).map((phase: any) => ({
          name: phase.name || '',
          duration: phase.duration || '',
          description: phase.description || ''
        }))
      } : null,
      
      alternatives: (data.alternatives || []).map((alt: any) => ({
        title: alt.title || '',
        description: alt.description || '',
        cost_change: alt.costChange || ''
      })),
      
      order_list: data.orderList ? {
        suppliers: (data.orderList.suppliers || []).map((supplier: any) => ({
          name: supplier.name || '',
          items: (supplier.items || []).map((item: any) => ({
            description: item.description || '',
            quantity: item.quantity || 0,
            unit: item.unit || 'each'
          })),
          subtotal: supplier.subtotal || 0
        }))
      } : null,
      
      // Additional Context
      additional_requirements: data.additionalRequirements || '',
      notes: data.notes || '',
      
      // Metadata
      _generated_at: new Date().toISOString(),
      _cache_bust: Date.now()
    };

    console.log('[COST-PDF] Transformed payload for template');

    // Create PDF document via PDF Monkey
    const createResponse = await fetch('https://api.pdfmonkey.io/api/v1/documents', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PDF_MONKEY_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        document: {
          document_template_id: COST_ENGINEER_TEMPLATE_ID,
          payload: payload,
          status: 'pending'
        }
      })
    });

    if (!createResponse.ok) {
      const errorText = await createResponse.text();
      console.error('[COST-PDF] PDF Monkey create error:', createResponse.status, errorText);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to create PDF document',
          details: errorText 
        }),
        { 
          status: createResponse.status, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const createData = await createResponse.json();
    const documentId = createData.document?.id;
    
    console.log('[COST-PDF] PDF document created, ID:', documentId);

    // Poll for PDF generation completion (max 30 seconds)
    const maxAttempts = 30;
    const pollInterval = 1000; // 1 second
    
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      await new Promise(resolve => setTimeout(resolve, pollInterval));
      
      const statusResponse = await fetch(
        `https://api.pdfmonkey.io/api/v1/documents/${documentId}`,
        {
          headers: { 'Authorization': `Bearer ${PDF_MONKEY_API_KEY}` }
        }
      );

      if (!statusResponse.ok) {
        console.error('[COST-PDF] Status check failed:', statusResponse.status);
        continue;
      }

      const statusData = await statusResponse.json();
      const status = statusData.document?.status;
      
      console.log('[COST-PDF] Status check:', status, `(attempt ${attempt + 1}/${maxAttempts})`);

      if (status === 'success') {
        console.log('[COST-PDF] PDF generated successfully');
        return new Response(
          JSON.stringify({
            success: true,
            documentId: statusData.document.id,
            downloadUrl: statusData.document.download_url,
            previewUrl: statusData.document.preview_url,
            status: 'success'
          }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      if (status === 'failure') {
        console.error('[COST-PDF] PDF generation failed');
        return new Response(
          JSON.stringify({ 
            error: 'PDF generation failed',
            status: 'failure' 
          }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
    }

    // Timeout
    console.warn('[COST-PDF] PDF generation timeout');
    return new Response(
      JSON.stringify({ 
        error: 'PDF generation timeout',
        status: 'timeout',
        documentId 
      }),
      { 
        status: 504, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('[COST-PDF] Error:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Internal server error' 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
