import { serve, corsHeaders } from '../_shared/deps.ts';

const PDF_MONKEY_API_KEY = Deno.env.get('PDF_MONKEY_API_KEY');
const MAINTENANCE_METHOD_TEMPLATE_ID = '5B71875B-D774-448A-8DB6-841975B0564C';

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
    console.log('[MAINTENANCE-PDF] Request started');

    // Verify PDF Monkey API key is configured
    if (!PDF_MONKEY_API_KEY) {
      console.error('[MAINTENANCE-PDF] API key not configured');
      return new Response(
        JSON.stringify({ error: 'PDF Monkey API key not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Parse request body - receive maintenance method data
    const rawPayload = await req.json();
    
    console.log('[MAINTENANCE-PDF] Received payload structure:', {
      hasReportDate: !!rawPayload.reportDate,
      reportTitle: rawPayload.reportTitle,
      hasEquipmentDetails: !!rawPayload.equipmentDetails,
      equipmentType: rawPayload.equipmentDetails?.equipmentType,
      location: rawPayload.equipmentDetails?.location,
      installationType: rawPayload.equipmentDetails?.installationType,
      hasExecutiveSummary: !!rawPayload.executiveSummary,
      maintenanceType: rawPayload.executiveSummary?.maintenanceType,
      recommendedFrequency: rawPayload.executiveSummary?.recommendedFrequency,
      hasSummary: !!rawPayload.summary,
      totalSteps: rawPayload.summary?.totalSteps,
      overallRiskLevel: rawPayload.summary?.overallRiskLevel,
      stepsArrayLength: rawPayload.steps?.length || 0,
      recommendationsCount: rawPayload.recommendations?.length || 0,
      hasMetadata: !!rawPayload.metadata,
      metadataVersion: rawPayload.metadata?.version
    });

    // Pass payload directly to PDF Monkey (no transformation) - add reportDate if missing
    const transformedPayload = {
      ...rawPayload,
      reportDate: rawPayload.reportDate || formatDate(rawPayload.metadata?.generatedAt || new Date().toISOString())
    };
    
    console.log('[MAINTENANCE-PDF] Payload passed directly to PDF Monkey');

    // Generate unique filename with equipment type
    const equipmentType = rawPayload.equipmentDetails?.equipmentType || rawPayload.executiveSummary?.equipmentType || 'Equipment';
    const uniqueId = crypto.randomUUID().split('-')[0].toUpperCase();
    const filename = `Maintenance Instructions - ${equipmentType} - ${uniqueId}.pdf`;
    
    console.log('[MAINTENANCE-PDF] Generated filename:', filename);

    // Create PDF document via PDF Monkey
    const createResponse = await fetch('https://api.pdfmonkey.io/api/v1/documents', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PDF_MONKEY_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        document: {
          document_template_id: MAINTENANCE_METHOD_TEMPLATE_ID,
          payload: transformedPayload,
          filename: filename,
          status: 'pending'
        }
      })
    });

    if (!createResponse.ok) {
      const errorText = await createResponse.text();
      console.error('[MAINTENANCE-PDF] PDF Monkey create error:', createResponse.status, errorText);
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
    
    console.log('[MAINTENANCE-PDF] PDF document created, ID:', documentId);

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
        console.error('[MAINTENANCE-PDF] Status check failed:', statusResponse.status);
        continue;
      }

      const statusData = await statusResponse.json();
      const status = statusData.document?.status;
      
      console.log('[MAINTENANCE-PDF] Status check:', status, `(attempt ${attempt + 1}/${maxAttempts})`);

      if (status === 'success') {
        console.log('[MAINTENANCE-PDF] PDF generated successfully');
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
        console.error('[MAINTENANCE-PDF] PDF generation failed');
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
    console.warn('[MAINTENANCE-PDF] PDF generation timeout');
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
    console.error('[MAINTENANCE-PDF] Error:', error);
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
