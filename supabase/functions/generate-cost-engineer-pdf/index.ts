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

    // Parse request body - pass comprehensive nested payload directly
    const payload = await req.json();

    console.log('[COST-PDF] New payload structure received:', {
      hasOriginalRequest: !!payload.originalRequest,
      hasQuoteHero: !!payload.quoteHero,
      materialsCount: payload.materials?.length || 0,
      labourTasksCount: payload.labourTasks?.length || 0,
      hasCostBreakdown: !!payload.costBreakdown,
      hasPricingTiers: !!payload.pricingTiers,
      hasRisks: !!payload.risks,
      hasUpsells: !!payload.upsells
    });

    // Transform new clean payload structure to PDF Monkey template format
    const pdfPayload = {
      // Section 1: Original Request
      projectContext: {
        projectName: payload.originalRequest?.projectName || 'Cost Engineer Project',
        clientInfo: payload.originalRequest?.clientInfo || '',
        location: payload.originalRequest?.location || '',
        projectType: payload.originalRequest?.projectType || 'domestic',
        query: payload.originalRequest?.query || '',
        additionalInfo: payload.originalRequest?.additionalInfo || '',
        timestamp: payload.originalRequest?.timestamp || new Date().toISOString()
      },

      // Section 2 & 7: Quote Hero + Pricing Tiers
      quoteRecommendation: {
        recommendedPrice: payload.quoteHero?.recommendedPrice || 0,
        tier: payload.quoteHero?.tier || 'normal',
        profit: payload.quoteHero?.profit || 0,
        marginPercent: payload.quoteHero?.marginPercent || 0,
        profitPerHour: payload.quoteHero?.profitPerHour || 0,
        confidencePercent: payload.quoteHero?.confidencePercent || 0,
        totalLabourHours: payload.quoteHero?.totalLabourHours || 0
      },

      pricingTiers: {
        workSparse: payload.pricingTiers?.workSparse || {},
        normal: payload.pricingTiers?.normal || {},
        busyPeriod: payload.pricingTiers?.busyPeriod || {}
      },

      // Section 3: AI Analysis Summary
      aiSummary: payload.aiSummary || '',

      // Section 4: Quick Metrics
      quickMetrics: payload.quickMetrics || {},

      // Section 5: Key Actions
      keyActions: payload.keyActions || [],

      // Section 6: Trade Intelligence
      tradeIntelligence: payload.tradeIntelligence || {},

      // Section 8: Cost Breakdown
      costBreakdown: {
        materials: payload.costBreakdown?.materials || {},
        labour: payload.costBreakdown?.labour || {},
        overheads: payload.costBreakdown?.overheads || {},
        contingency: payload.costBreakdown?.contingency || {},
        breakEvenPoint: payload.costBreakdown?.breakEvenPoint || 0,
        subtotal: payload.costBreakdown?.subtotal || 0
      },

      // Section 9: Client Justification
      clientJustification: payload.clientJustification || {},

      // Section 10: Materials List
      costAnalysis: {
        materials: {
          items: payload.materials || [],
          subtotal: payload.costBreakdown?.materials?.total || 0
        },
        // Section 11: Labour Tasks
        labour: {
          tasks: payload.labourTasks || [],
          subtotal: payload.costBreakdown?.labour?.total || 0,
          totalHours: payload.quoteHero?.totalLabourHours || 0,
          rate: payload.costBreakdown?.labour?.rate || 0
        }
      },

      // Section 12: Job Complexity
      jobComplexity: payload.jobComplexity || {},

      // Section 13: Risk Assessment
      risks: payload.risks || [],

      // Section 14: Pricing Confidence
      pricingConfidence: payload.pricingConfidence || {},

      // Section 15: Immediate Upsells
      upsells: payload.upsells || [],

      // Section 16: Future Work Pipeline
      futurePipeline: payload.futurePipeline || [],

      // Section 17: Client Conversations
      clientConversations: payload.clientConversations || {},

      // Section 18: Site Arrival Checklist
      siteChecklist: payload.siteChecklist || {},

      // Section 19: Payment Terms
      paymentTerms: payload.paymentTerms || {},

      // Section 20: Post-Job Review
      postJobReview: payload.postJobReview || {},

      // Metadata
      metadata: payload.metadata || {
        generatedAt: new Date().toISOString(),
        version: '3.1',
        pdfTemplate: 'cost-engineer-comprehensive'
      }
    };

    console.log('[COST-PDF] Transformed payload for PDF Monkey (first 500 chars):', JSON.stringify(pdfPayload).substring(0, 500));

    // Generate unique filename with project name
    const projectName = payload.originalRequest?.projectName || 'Job';
    const uniqueId = crypto.randomUUID().split('-')[0].toUpperCase();
    const filename = `AI Cost Engineer - ${projectName} - ${uniqueId}.pdf`;
    
    console.log('[COST-PDF] Generated filename:', filename);

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
          payload: pdfPayload,
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
