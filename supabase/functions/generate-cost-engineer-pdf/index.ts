import { serve, corsHeaders } from '../_shared/deps.ts';

const PDF_MONKEY_API_KEY = Deno.env.get('PDF_MONKEY_API_KEY');
const COST_ENGINEER_TEMPLATE_ID = '112482FE-B6A4-4255-BAC6-468CAFB8D8E3';

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

    // Parse request body (comprehensive structure)
    const data = await req.json();
    const aiHeader = data.aiAnalysisHeader || {};
    const projectContext = data.projectContext || {};
    const costBreakdown = data.costBreakdown || {};
    const costAnalysis = data.costAnalysis || {};
    const pricingOptions = data.pricingOptions || {};
    const calculatedMetrics = data.calculatedMetrics || {};
    const upsells = data.upsells || [];
    const pipeline = data.pipeline || [];
    const paymentTerms = data.paymentTerms || {};
    const complexity = data.complexity || aiHeader.complexity || {};
    const confidence = data.confidence || aiHeader.confidence || {};
    const riskAssessment = data.riskAssessment || aiHeader.riskAssessment || {};
    
    console.log('[COST-PDF] Received comprehensive payload:', {
      hasAiAnalysisHeader: !!aiHeader,
      hasCostBreakdown: !!costBreakdown,
      hasPricingOptions: !!pricingOptions,
      materialsCount: costAnalysis.materials?.items?.length || 0,
      labourTasksCount: costAnalysis.labour?.tasks?.length || 0,
      upsellsCount: upsells.length,
      pipelineCount: pipeline.length
    });
    
    // Calculate pipeline totals
    const pipeline12mo = pipeline.reduce((sum: number, opp: any) => {
      const timing = opp.timing?.toLowerCase() || '';
      return sum + (timing.includes('6-12') || timing.includes('months') ? (opp.estimatedValue || 0) : 0);
    }, 0);
    
    const pipeline24mo = pipeline.reduce((sum: number, opp: any) => sum + (opp.estimatedValue || 0), 0);

    // Get selected pricing tier
    const selectedTier = pricingOptions.selectedTier || 'normal';
    const selectedPricingData = pricingOptions.tiers?.[selectedTier] || pricingOptions.tiers?.normal || {};

    const payload = {
      // Project Context
      projectContext: {
        projectName: projectContext.projectName || 'Electrical Job',
        clientInfo: projectContext.clientInfo || 'Client',
        location: projectContext.location || '',
        date: new Date().toLocaleDateString('en-GB')
      },
      
      // AI Analysis Header
      job_description: aiHeader.jobDescription || costAnalysis.response || 'Electrical Installation',
      complexity_rating: complexity.label || 'Medium',
      complexity_dots: '●'.repeat(complexity.rating || 3) + '○'.repeat(5 - (complexity.rating || 3)),
      confidence_percent: confidence.averagePercentage || 75,
      materials_confidence: confidence.materials?.level || 80,
      labour_confidence: confidence.labour?.level || 75,
      materials_confidence_reason: confidence.materials?.reasoning || '',
      labour_confidence_reason: confidence.labour?.reasoning || '',
      risk_level: riskAssessment.level || 'Medium',
      risk_high_count: riskAssessment.highRiskCount || 0,
      risk_total_count: riskAssessment.totalRiskCount || 0,
      recommended_tier: aiHeader.recommendedTier || 'NORMAL',
      
      // Key Action Items
      action_items: aiHeader.keyActionItems || [],
      action_1: aiHeader.keyActionItems?.[0]?.text || 'Review materials list',
      action_2: aiHeader.keyActionItems?.[1]?.text || 'Confirm schedule with client',
      action_3: aiHeader.keyActionItems?.[2]?.text || 'Prepare site access',
      
      // Pricing (from pricingOptions and calculatedMetrics)
      selected_price: selectedPricingData.price || calculatedMetrics.selectedAmount || 0,
      selected_tier_name: selectedTier === 'workSparse' ? 'Work Sparse' : 
                          selectedTier === 'busyPeriod' ? 'Busy Period' : 'Normal',
      break_even: pricingOptions.breakEven || calculatedMetrics.breakEven || 0,
      selected_margin: selectedPricingData.margin || calculatedMetrics.margin || 0,
      selected_profit: selectedPricingData.profit || calculatedMetrics.profit || 0,
      profit_per_hour: selectedPricingData.profitPerHour || calculatedMetrics.profitPerHour || 0,
      
      // Pricing Tiers
      price_sparse: pricingOptions.tiers?.workSparse?.price || pricingOptions.rawTierPrices?.sparse || 0,
      margin_sparse: pricingOptions.tiers?.workSparse?.margin || 0,
      profit_sparse: pricingOptions.tiers?.workSparse?.profit || 0,
      profit_hour_sparse: pricingOptions.tiers?.workSparse?.profitPerHour || 0,
      
      price_normal: pricingOptions.tiers?.normal?.price || pricingOptions.rawTierPrices?.normal || 0,
      margin_normal: pricingOptions.tiers?.normal?.margin || 0,
      profit_normal: pricingOptions.tiers?.normal?.profit || 0,
      profit_hour_normal: pricingOptions.tiers?.normal?.profitPerHour || 0,
      
      price_busy: pricingOptions.tiers?.busyPeriod?.price || pricingOptions.rawTierPrices?.busy || 0,
      margin_busy: pricingOptions.tiers?.busyPeriod?.margin || 0,
      profit_busy: pricingOptions.tiers?.busyPeriod?.profit || 0,
      profit_hour_busy: pricingOptions.tiers?.busyPeriod?.profitPerHour || 0,
      
      // Cost Breakdown
      materials_net: costBreakdown.materials?.material || 0,
      materials_markup_percent: costBreakdown.materials?.percentage || 15,
      materials_markup_amount: costBreakdown.materials?.amount || 0,
      materials_total: costBreakdown.materials?.total || 0,
      labour_total: costBreakdown.labour || 0,
      labour_hours: calculatedMetrics.totalLabourHours || pricingOptions.totalLabourHours || 0,
      overhead: costBreakdown.overheads || 0,
      contingency_percent: costBreakdown.contingency?.percentage || 10,
      contingency_amount: costBreakdown.contingency?.amount || 0,
      subtotal: costBreakdown.subtotal || 0,
      
      // Complexity Details
      complexity_explanation: complexity.explanation || '',
      complexity_factors: complexity.factors || [],
      
      // Risk Details
      risk_factors: riskAssessment.risks || [],
      high_risks: aiHeader.riskAssessment?.highRisks || [],
      
      // Upsells & Pipeline
      upsell_opportunities: upsells,
      future_opportunities: pipeline,
      pipeline_total_12mo: pipeline12mo,
      pipeline_total_24mo: pipeline24mo,
      
      // Conversations
      conversation_opening: data.conversations?.opening || 'Here is your detailed quote for the electrical work.',
      conversation_high: data.conversations?.tooExpensive || 'This price reflects current material costs and proper installation standards.',
      conversation_discount: data.conversations?.discountRequest || 'The quote is competitive for the quality of work provided.',
      
      // Site Checklist
      critical_checks: data.siteChecklist?.critical || [],
      important_checks: data.siteChecklist?.important || [],
      
      // Payment Terms
      deposit_percent: paymentTerms.depositPercent || 30,
      deposit_amount: paymentTerms.depositAmount || 0,
      balance_amount: paymentTerms.balanceAmount || 0,
      payment_milestones: paymentTerms.paymentMilestones || [],
      payment_terms: paymentTerms.terms || 'Net 14 days',
      
      // Material & Labour Tables (pass through for loops in template)
      materials_items: costAnalysis.materials?.items || [],
      labour_tasks: costAnalysis.labour?.tasks || [],
      materials_subtotal: costAnalysis.materials?.subtotal || 0,
      materials_vat: costAnalysis.materials?.vat || 0,
      materials_total_with_vat: costAnalysis.materials?.total || 0,
      labour_subtotal: costAnalysis.labour?.subtotal || 0,
      labour_vat: costAnalysis.labour?.vat || 0,
      labour_total_with_vat: costAnalysis.labour?.total || 0,
      
      // Summary
      grand_total_ex_vat: costAnalysis.summary?.subtotal || 0,
      grand_total_vat: costAnalysis.summary?.vat || 0,
      grand_total_inc_vat: costAnalysis.summary?.grandTotal || 0,
      
      // Value Engineering
      value_engineering: data.valueEngineering || [],
      
      // Metadata
      generated_at: data.generatedAt || new Date().toISOString(),
      version: data.version || '3.0'
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
