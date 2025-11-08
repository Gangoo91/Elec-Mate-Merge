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
      hasProfitability: !!costAnalysis.profitabilityAnalysis,
      hasPdfEnrichment: !!costAnalysis.pdfEnrichment,
      hasAiEnhancement: !!costAnalysis.aiEnhancement
    });

    // ==== TIER 3: COMPREHENSIVE PDF PAYLOAD MAPPING ====
    const prof = costAnalysis.profitabilityAnalysis || {};
    const enrich = costAnalysis.pdfEnrichment || {};
    const ai = costAnalysis.aiEnhancement || {};
    
    // Calculate pipeline totals
    const pipeline12mo = (ai.pipeline || []).reduce((sum: number, opp: any) => {
      const timing = opp.timing?.toLowerCase() || '';
      return sum + (timing.includes('6-12') || timing.includes('months') ? (opp.estimated_value || 0) : 0);
    }, 0);
    
    const pipeline24mo = (ai.pipeline || []).reduce((sum: number, opp: any) => sum + (opp.estimated_value || 0), 0);

    // Map risk factors with dots
    const riskFactorsWithDots = (ai.risk?.factors || []).map((factor: any) => ({
      ...factor,
      dots: factor.risk_level === 'high' ? '●●●○○' : factor.risk_level === 'medium' ? '●●○○○' : '●○○○○'
    }));

    const payload = {
      // Project Context
      projectContext: {
        projectName: projectContext.projectName || 'Electrical Job',
        clientInfo: projectContext.clientInfo || 'Client',
        date: enrich.dates?.displayDate || new Date().toLocaleDateString('en-GB')
      },
      
      // AI Hero Section
      job_description: data.query || projectContext.projectName || 'Electrical Installation',
      complexity_rating: ai.complexity?.label || 'Medium',
      complexity_dots: '●'.repeat(ai.complexity?.rating || 3) + '○'.repeat(5 - (ai.complexity?.rating || 3)),
      confidence_percent: ai.confidence?.overall || 75,
      risk_level: ai.risk?.overallLevel || 'Medium',
      recommended_price: prof.quotingGuidance?.target?.total || 0,
      recommended_tier: 'Target',
      ai_reasoning: ai.reasoning || 'Price based on materials and labour analysis',
      action_1: ai.actions?.[0] || 'Confirm site details',
      action_2: ai.actions?.[1] || 'Order materials',
      action_3: ai.actions?.[2] || 'Schedule installation',
      
      // Quote Hero
      selected_price: prof.quotingGuidance?.target?.subtotal || 0,
      selected_price_inc_vat: prof.quotingGuidance?.target?.total || 0,
      selected_tier_name: 'Normal',
      date_sent: new Date().toLocaleDateString('en-GB'),
      break_even: prof.breakEven?.subtotal || 0,
      selected_margin: prof.quotingGuidance?.target?.margin || 0,
      selected_profit: prof.quotingGuidance?.target?.profit || 0,
      profit_per_hour: enrich.profitPerHour?.target || 0,
      
      // Pricing Cards
      price_sparse: prof.quotingGuidance?.minimum?.subtotal || 0,
      margin_sparse: prof.quotingGuidance?.minimum?.margin || 0,
      profit_sparse: prof.quotingGuidance?.minimum?.profit || 0,
      profit_hour_sparse: enrich.profitPerHour?.minimum || 0,
      selection_reason: prof.quotingGuidance?.target?.explanation || 'Balanced pricing strategy',
      
      price_normal: prof.quotingGuidance?.target?.subtotal || 0,
      margin_normal: prof.quotingGuidance?.target?.margin || 0,
      profit_normal: prof.quotingGuidance?.target?.profit || 0,
      profit_hour_normal: enrich.profitPerHour?.target || 0,
      
      price_busy: prof.quotingGuidance?.premium?.subtotal || 0,
      margin_busy: prof.quotingGuidance?.premium?.margin || 0,
      profit_busy: prof.quotingGuidance?.premium?.profit || 0,
      profit_hour_busy: enrich.profitPerHour?.premium || 0,
      
      // Cost Breakdown
      materials_net: enrich.materialsNet || 0,
      markup_percent: enrich.markupPercent || 15,
      materials_markup: enrich.materialsMarkup || 0,
      labour_hours: enrich.labourHours || 0,
      labour_rate: enrich.labourRate || 45,
      labour_total: costAnalysis.summary?.labourSubtotal || 0,
      overhead: prof.jobOverheads?.total || 0,
      contingency_percent: enrich.contingency?.percent || 10,
      contingency: enrich.contingency?.amount || 0,
      
      // Complexity & Risk
      complexity_explanation: ai.complexity?.explanation || '',
      complexity_factors: ai.complexity?.factors || [],
      risk_factors: riskFactorsWithDots,
      
      // Confidence
      materials_confidence: ai.confidence?.materials || 80,
      labour_confidence: ai.confidence?.labour || 75,
      contingency_confidence: ai.confidence?.contingency || 70,
      confidence_recommendation: ai.confidence?.recommendation || 'Estimate based on standard rates',
      
      // Upsells & Pipeline
      upsell_opportunities: ai.upsells || [],
      future_opportunities: ai.pipeline || [],
      property_age: ai.propertyContext?.age || 'Unknown',
      installation_age: ai.propertyContext?.installationAge || 'Unknown',
      pipeline_total_12mo: pipeline12mo,
      pipeline_total_24mo: pipeline24mo,
      
      // Conversations
      conversation_opening: ai.conversations?.opening || 'Here is your detailed quote for the electrical work.',
      conversation_high: ai.conversations?.tooExpensive || 'This price reflects current material costs and proper installation standards.',
      conversation_discount: ai.conversations?.discountRequest || 'The quote is competitive for the quality of work provided.',
      
      // Site Checklist
      critical_checks: ai.siteChecklist?.critical || [],
      important_checks: ai.siteChecklist?.important || [],
      
      // Payment Terms (defaults)
      deposit_percent: 30,
      deposit_amount: ((prof.quotingGuidance?.target?.total || 0) * 0.30).toFixed(2),
      balance_amount: ((prof.quotingGuidance?.target?.total || 0) * 0.70).toFixed(2),
      balance_terms: 'Due within 7 days of completion',
      payment_method: 'Bank transfer or cash',
      late_fee: '£25 + 2% per month after 14 days',
      
      // Direct pass-through for tables
      costAnalysis: {
        materials: costAnalysis.materials || { items: [], subtotal: 0 },
        labour: costAnalysis.labour || { tasks: [], subtotal: 0 }
      }
    };

    console.log('[COST-PDF] Payload structure being sent to PDF Monkey:', {
      hasProjectContext: !!payload.projectContext,
      hasProjectName: !!payload.projectContext?.projectName,
      hasCostAnalysis: !!payload.costAnalysis,
      materialsCount: payload.costAnalysis?.materials?.items?.length || 0,
      labourTasksCount: payload.costAnalysis?.labour?.tasks?.length || 0,
      hasTimescales: !!payload.costAnalysis?.timescales,
      hasAlternatives: !!payload.costAnalysis?.alternatives,
      hasOrderList: !!payload.costAnalysis?.orderList
    });
    
    console.log('[COST-PDF] Full payload (first 500 chars):', JSON.stringify(payload).substring(0, 500));

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
