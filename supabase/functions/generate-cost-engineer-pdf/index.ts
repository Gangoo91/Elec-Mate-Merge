import { serve, corsHeaders } from '../_shared/deps.ts';

const PDF_MONKEY_API_KEY = Deno.env.get('PDF_MONKEY_API_KEY');
const COST_ENGINEER_TEMPLATE_ID = '112482FE-B6A4-4255-BAC6-468CAFB8D8E3';

/**
 * Format date to DD/MM/YYYY
 */
function formatDate(dateString: string | undefined): string {
  if (!dateString) {
    const now = new Date();
    return `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
  }
  
  try {
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
  } catch {
    return dateString;
  }
}

/**
 * Transform new clean 20-section payload to PDF Monkey template format
 */
function transformPayloadForTemplate(payload: any): any {
  console.log('[COST-PDF] Transforming payload with 20 sections to template format');
  
  return {
    // COVER PAGE - Section 1
    projectContext: {
      projectName: payload.originalRequest?.projectName || 'Cost Engineer Project',
      clientName: payload.originalRequest?.clientInfo || '',
      clientInfo: payload.originalRequest?.clientInfo || '',
      location: payload.originalRequest?.location || '',
      projectType: payload.originalRequest?.projectType || 'domestic',
      query: payload.originalRequest?.query || '',
      additionalInfo: payload.originalRequest?.additionalInfo || ''
    },
    
    reportDate: formatDate(payload.originalRequest?.timestamp || payload.metadata?.generatedAt),
    
    // MAIN QUOTE HERO - Section 2
    recommendedQuote: {
      amount: payload.quoteHero?.recommendedPrice || 0,
      tier: payload.quoteHero?.tier || 'normal',
      vatAmount: ((payload.quoteHero?.recommendedPrice || 0) * 0.2)
    },
    
    margin: payload.quoteHero?.marginPercent || 0,
    profit: payload.quoteHero?.profit || 0,
    profitPerHour: payload.quoteHero?.profitPerHour || 0,
    totalLabourHours: payload.quoteHero?.totalLabourHours || 0,
    
    // COMPLEXITY & CONFIDENCE - Sections 4, 14
    complexity: {
      rating: payload.quickMetrics?.complexity?.rating || payload.jobComplexity?.rating || 0,
      label: payload.quickMetrics?.complexity?.label || payload.jobComplexity?.label || '',
      score: payload.quickMetrics?.complexity?.score || 0,
      factors: payload.jobComplexity?.factors || [],
      reasoning: payload.jobComplexity?.reasoning || '',
      estimatedHours: payload.jobComplexity?.estimatedHours || 0
    },
    
    confidence: {
      average: payload.quickMetrics?.confidence?.average || payload.quoteHero?.confidencePercent || 75,
      materials: payload.pricingConfidence?.materials?.level || payload.quickMetrics?.confidence?.materials || 75,
      labour: payload.pricingConfidence?.labour?.level || payload.quickMetrics?.confidence?.labour || 75,
      contingency: payload.pricingConfidence?.contingency?.percent || 5,
      materialsReason: payload.pricingConfidence?.materials?.reasoning || '',
      labourReason: payload.pricingConfidence?.labour?.reasoning || '',
      contingencyReason: payload.pricingConfidence?.contingency?.reasoning || ''
    },
    
    // RISK ASSESSMENT - Section 13 (FLATTENED)
    riskLevel: payload.quickMetrics?.riskLevel?.level || 'low',
    highRiskCount: payload.quickMetrics?.riskLevel?.highRiskCount || 0,
    totalRiskCount: payload.quickMetrics?.riskLevel?.totalCount || 0,
    risks: (payload.risks || []).map((r: any) => ({
      title: r.title,
      severity: r.severity,
      likelihood: r.likelihood,
      mitigation: r.mitigation,
      contingencyPercent: r.contingencyPercent
    })),
    
    // PRICING TIERS - Section 7
    pricingTiers: {
      sparse: {
        price: payload.pricingTiers?.workSparse?.price || 0,
        profit: payload.pricingTiers?.workSparse?.profit || 0,
        marginPercent: payload.pricingTiers?.workSparse?.marginPercent || 0,
        profitPerHour: payload.pricingTiers?.workSparse?.profitPerHour || 0
      },
      normal: {
        price: payload.pricingTiers?.normal?.price || 0,
        profit: payload.pricingTiers?.normal?.profit || 0,
        marginPercent: payload.pricingTiers?.normal?.marginPercent || 0,
        profitPerHour: payload.pricingTiers?.normal?.profitPerHour || 0,
        recommended: true
      },
      busy: {
        price: payload.pricingTiers?.busyPeriod?.price || 0,
        profit: payload.pricingTiers?.busyPeriod?.profit || 0,
        marginPercent: payload.pricingTiers?.busyPeriod?.marginPercent || 0,
        profitPerHour: payload.pricingTiers?.busyPeriod?.profitPerHour || 0
      }
    },
    
    // COST BREAKDOWN - Section 8
    costBreakdown: {
      materials: {
        net: payload.costBreakdown?.materials?.net || 0,
        markupPercent: payload.costBreakdown?.materials?.markupPercent || 15,
        total: payload.costBreakdown?.materials?.total || 0
      },
      labour: {
        hours: payload.costBreakdown?.labour?.hours || 0,
        rate: payload.costBreakdown?.labour?.rate || 0,
        total: payload.costBreakdown?.labour?.total || 0
      },
      overheads: {
        travel: payload.costBreakdown?.overheads?.travel || 0,
        permits: payload.costBreakdown?.overheads?.permits || 0,
        waste: payload.costBreakdown?.overheads?.waste || 0,
        business: payload.costBreakdown?.overheads?.business || 0,
        total: payload.costBreakdown?.overheads?.total || 0
      },
      contingency: {
        percent: payload.costBreakdown?.contingency?.percent || 5,
        amount: payload.costBreakdown?.contingency?.amount || 0
      },
      breakEvenPoint: payload.costBreakdown?.breakEvenPoint || 0,
      subtotal: payload.costBreakdown?.subtotal || 0
    },
    
    breakEvenPoint: payload.costBreakdown?.breakEvenPoint || 0,
    
    // MATERIALS - Section 10 (FLAT ARRAY)
    materials: (payload.materials || []).map((m: any) => ({
      description: m.description,
      quantity: m.quantity,
      qty: m.quantity,
      unit: m.unit,
      unitPrice: m.unitPrice,
      total: m.total,
      lineTotal: m.total,
      supplier: m.supplier,
      category: m.category
    })),
    materialsSubtotal: payload.costBreakdown?.materials?.net || 0,
    materialsMarkup: payload.costBreakdown?.materials?.markupPercent || 15,
    materialsTotal: payload.costBreakdown?.materials?.total || 0,
    
    // LABOUR - Section 11 (FLAT ARRAY)
    labour: (payload.labourTasks || []).map((t: any) => ({
      description: t.description,
      hours: t.hours,
      rate: t.rate,
      total: t.total,
      workerType: t.workerType
    })),
    labourSubtotal: payload.costBreakdown?.labour?.total || 0,
    labourHours: payload.costBreakdown?.labour?.hours || 0,
    labourRate: payload.costBreakdown?.labour?.rate || 0,
    
    // KEY ACTIONS - Section 5 (FLAT ARRAY)
    keyActions: (payload.keyActions || []).map((a: any) => ({
      text: a.text,
      priority: a.priority
    })),
    
    // CLIENT JUSTIFICATION - Section 9 (FLATTENED)
    valueProposition: payload.clientJustification?.valueProposition || '',
    objectionResponses: (payload.clientJustification?.objectionResponses || []).map((o: any) => ({
      objection: o.objection,
      response: o.response,
      details: o.details
    })),
    comparisonChecklist: payload.clientJustification?.comparisonChecklist || [],
    whyChoosePoints: payload.clientJustification?.whyChoosePoints || [],
    
    // UPSELLS - Section 15 (FLAT ARRAY)
    upsells: (payload.upsells || []).map((u: any) => ({
      opportunity: u.opportunity,
      price: u.price,
      winRate: u.winRate,
      isHot: u.isHot,
      timing: u.timing,
      script: u.script
    })),
    
    // FUTURE PIPELINE - Section 16 (FLAT ARRAY)
    pipeline: (payload.futurePipeline || []).map((p: any) => ({
      opportunity: p.opportunity,
      description: p.description,
      timeframe: p.timeframe,
      estimatedValue: p.estimatedValue,
      priority: p.priority,
      trigger: p.trigger
    })),
    
    // CLIENT CONVERSATIONS - Section 17 (FLATTENED)
    conversationTopics: (payload.clientConversations?.topics || []).map((t: any) => ({
      topic: t.topic,
      script: t.script
    })),
    closingScript: payload.clientConversations?.closingScript || '',
    
    // SITE CHECKLIST - Section 18 (FLATTENED)
    checklistCritical: payload.siteChecklist?.critical || [],
    checklistImportant: payload.siteChecklist?.important || [],
    checklistDocumentation: payload.siteChecklist?.documentation || [],
    
    // PAYMENT TERMS - Section 19 (FLATTENED)
    depositPercent: payload.paymentTerms?.depositPercent || 0,
    depositAmount: payload.paymentTerms?.depositAmount || 0,
    balanceAmount: payload.paymentTerms?.balanceAmount || 0,
    paymentTerms: payload.paymentTerms?.terms || '',
    lateFeePolicy: payload.paymentTerms?.lateFeePolicy || '',
    milestones: (payload.paymentTerms?.milestones || []).map((m: any) => ({
      stage: m.stage,
      percentage: m.percentage,
      amount: m.amount,
      trigger: m.trigger
    })),
    
    // AI SUMMARY - Section 3
    aiSummary: payload.aiSummary || '',
    response: payload.aiSummary || '',
    
    // TRADE INTELLIGENCE - Section 6
    tradeIntelligence: payload.tradeIntelligence ? {
      materialsCompleteness: payload.tradeIntelligence.materialsCompleteness,
      labourRealism: payload.tradeIntelligence.labourRealism,
      futureWorkLogic: payload.tradeIntelligence.futureWorkLogic,
      overallAssessment: payload.tradeIntelligence.overallAssessment
    } : null,
    
    // JOB NOTES
    jobNotes: payload.jobNotes || null,
    
    // POST-JOB REVIEW - Section 20
    postJobReview: {
      estimatedCost: payload.postJobReview?.estimatedCost || 0,
      estimatedHours: payload.postJobReview?.estimatedHours || 0,
      estimatedProfit: payload.postJobReview?.estimatedProfit || 0,
      actualCost: payload.postJobReview?.actualCost || null,
      actualHours: payload.postJobReview?.actualHours || null,
      actualProfit: payload.postJobReview?.actualProfit || null,
      notes: payload.postJobReview?.notes || null
    },
    
    // METADATA
    metadata: {
      generatedAt: payload.metadata?.generatedAt || new Date().toISOString(),
      version: payload.metadata?.version || '3.1',
      pdfTemplate: 'cost-engineer-comprehensive'
    },
    version: payload.metadata?.version || '3.1'
  };
}

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

    // Parse request body - receive new clean 20-section payload
    const rawPayload = await req.json();
    
    console.log('[COST-PDF] Received new clean payload structure with 20 sections');

    // Transform to PDF Monkey template format
    const transformedPayload = transformPayloadForTemplate(rawPayload);

    console.log('[COST-PDF] Transformed payload structure:', {
      hasProjectContext: !!transformedPayload.projectContext,
      hasProjectName: !!transformedPayload.projectContext?.projectName,
      hasRecommendedQuote: !!transformedPayload.recommendedQuote,
      materialsCount: transformedPayload.materials?.length || 0,
      labourTasksCount: transformedPayload.labour?.length || 0,
      hasComplexity: !!transformedPayload.complexity,
      hasConfidence: !!transformedPayload.confidence,
      risksCount: transformedPayload.risks?.length || 0,
      keyActionsCount: transformedPayload.keyActions?.length || 0,
      upsellsCount: transformedPayload.upsells?.length || 0,
      pipelineCount: transformedPayload.pipeline?.length || 0
    });
    
    console.log('[COST-PDF] FULL transformed payload:', JSON.stringify(transformedPayload, null, 2));

    // Generate unique filename with project name
    const projectName = transformedPayload.projectContext?.projectName || 'Job';
    const uniqueId = crypto.randomUUID().split('-')[0].toUpperCase();
    const filename = `AI Cost Engineer - ${projectName} - ${uniqueId}.pdf`;
    
    console.log('[COST-PDF] Generated filename:', filename);

    // Create PDF document via PDF Monkey with transformed payload
    const createResponse = await fetch('https://api.pdfmonkey.io/api/v1/documents', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PDF_MONKEY_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        document: {
          document_template_id: COST_ENGINEER_TEMPLATE_ID,
          payload: transformedPayload,
          filename: filename,
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
            filename: filename,
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
