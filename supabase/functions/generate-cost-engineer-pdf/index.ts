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
    const projectContext = data.projectContext || {};
    const costAnalysis = data.costAnalysis || {};
    
    console.log('[COST-PDF] Received complete cost analysis data:', {
      projectName: projectContext.projectName,
      materialsCount: costAnalysis.materials?.items?.length || 0,
      labourTasksCount: costAnalysis.labour?.tasks?.length || 0,
      hasTimescales: !!costAnalysis.timescales,
      hasAlternatives: !!costAnalysis.alternatives,
      hasOrderList: !!costAnalysis.orderList
    });

    // Transform complete V3 structure for PDF Monkey template (snake_case)
    const payload = {
      // Project Header
      project_name: projectContext.projectName || 'Electrical Project',
      client_name: projectContext.clientInfo || '',
      location: projectContext.location || '',
      project_type: projectContext.projectType || 'domestic',
      additional_info: projectContext.additionalInfo || '',
      generated_date: new Date().toLocaleDateString('en-GB'),
      
      // AI Response Text
      response: costAnalysis.response || '',
      
      // Materials - FULL V3 structure
      materials: {
        items: (costAnalysis.materials?.items || []).map((item: any) => ({
          description: item.description || '',
          quantity: item.quantity || 0,
          unit: item.unit || 'each',
          unit_price: item.unitPrice || 0,
          total: item.total || 0,
          supplier: item.supplier || '',
          wholesale_price: item.wholesalePrice || 0,
          markup: item.markup || 0,
          in_database: item.inDatabase || false,
          in_stock: item.inStock !== false
        })),
        subtotal: costAnalysis.materials?.subtotal || 0,
        vat: costAnalysis.materials?.vat || 0,
        total: costAnalysis.materials?.total || 0,
        total_markup: costAnalysis.materials?.totalMarkup || 0,
        subtotal_with_markup: costAnalysis.materials?.subtotalWithMarkup || 0
      },
      
      // Labour - FULL V3 structure
      labour: {
        tasks: (costAnalysis.labour?.tasks || []).map((task: any) => ({
          description: task.description || '',
          hours: task.hours || 0,
          workers: task.workers || 1,
          electrician_hours: task.electricianHours || 0,
          apprentice_hours: task.apprenticeHours || 0,
          rate: task.rate || 0,
          total: task.total || 0
        })),
        subtotal: costAnalysis.labour?.subtotal || 0,
        vat: costAnalysis.labour?.vat || 0,
        total: costAnalysis.labour?.total || 0
      },
      
      // Summary - FULL breakdown
      summary: {
        materials_wholesale: costAnalysis.summary?.materialsWholesale || 0,
        materials_markup: costAnalysis.summary?.materialsMarkup || 0,
        materials_subtotal: costAnalysis.summary?.materialsSubtotal || 0,
        materials_vat: costAnalysis.summary?.materialsVAT || 0,
        materials_total: costAnalysis.summary?.materialsTotal || 0,
        labour_subtotal: costAnalysis.summary?.labourSubtotal || 0,
        labour_vat: costAnalysis.summary?.labourVAT || 0,
        labour_total: costAnalysis.summary?.labourTotal || 0,
        subtotal: costAnalysis.summary?.subtotal || 0,
        vat: costAnalysis.summary?.vat || 0,
        grand_total: costAnalysis.summary?.grandTotal || 0
      },
      
      // Timescales - FULL V3
      timescales: costAnalysis.timescales ? {
        phases: (costAnalysis.timescales.phases || []).map((p: any) => ({
          phase: p.phase || '',
          days: p.days || 0,
          description: p.description || ''
        })),
        total_days: costAnalysis.timescales.totalDays || 0,
        total_weeks: costAnalysis.timescales.totalWeeks || 0,
        start_to_finish: costAnalysis.timescales.startToFinish || '',
        critical_path: costAnalysis.timescales.criticalPath || '',
        assumptions: costAnalysis.timescales.assumptions || []
      } : null,
      
      // Alternatives - FULL V3
      alternatives: costAnalysis.alternatives ? {
        budget: costAnalysis.alternatives.budget || null,
        standard: costAnalysis.alternatives.standard || null,
        premium: costAnalysis.alternatives.premium || null,
        recommended: costAnalysis.alternatives.recommended || 'standard'
      } : null,
      
      // Order List - FULL V3
      order_list: costAnalysis.orderList ? {
        by_supplier: costAnalysis.orderList.bySupplier || {},
        total_items: costAnalysis.orderList.totalItems || 0,
        estimated_delivery: costAnalysis.orderList.estimatedDelivery || '',
        notes: costAnalysis.orderList.notes || []
      } : null,
      
      // Value Engineering
      value_engineering: costAnalysis.valueEngineering || [],
      
      // Suggested Next Agents
      suggested_next_agents: costAnalysis.suggestedNextAgents || [],
      
      // Notes
      notes: costAnalysis.notes || [],
      
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
