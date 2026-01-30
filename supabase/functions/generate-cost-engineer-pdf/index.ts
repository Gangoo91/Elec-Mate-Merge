import { serve, corsHeaders } from '../_shared/deps.ts';
import { captureException } from '../_shared/sentry.ts';

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

    // Pass payload directly to PDF Monkey (no transformation)
    const transformedPayload = {
      ...rawPayload,
      // Only add reportDate if not present
      reportDate: rawPayload.reportDate || formatDate(rawPayload.originalRequest?.timestamp || rawPayload.metadata?.generatedAt)
    };
    
    console.log('[COST-PDF] Payload passed directly to PDF Monkey:', {
      hasOriginalRequest: !!transformedPayload.originalRequest,
      hasQuoteHero: !!transformedPayload.quoteHero,
      materialsCount: transformedPayload.materials?.length || 0,
      labourTasksCount: transformedPayload.labourTasks?.length || 0,
      risksCount: transformedPayload.risks?.length || 0,
      keyActionsCount: transformedPayload.keyActions?.length || 0,
      upsellsCount: transformedPayload.upsells?.length || 0,
      pipelineCount: transformedPayload.futurePipeline?.length || 0
    });

    // Generate unique filename with project name
    const projectName = transformedPayload.originalRequest?.projectName || 'Job';
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
    await captureException(error, { functionName: 'generate-cost-engineer-pdf', requestUrl: req.url, requestMethod: req.method });
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
