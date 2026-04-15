import { serve, corsHeaders } from '../_shared/deps.ts';

const PDFMONKEY_API_KEY = Deno.env.get('PDFMONKEY_API_KEY');
const MAINTENANCE_METHOD_TEMPLATE_ID = '5B71875B-D774-448A-8DB6-841975B0564C';
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || 'https://jtwygbeceundfgnkirof.supabase.co';

function formatDate(dateString: string | undefined): string {
  if (!dateString) {
    const now = new Date();
    return `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
  }
  try {
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
  } catch { return dateString; }
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('[MAINTENANCE-PDF] Request started');

    if (!PDFMONKEY_API_KEY) {
      return new Response(JSON.stringify({ error: 'PDF Monkey API key not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const rawPayload = await req.json();

    // ── Transform payload (same logic as before) ────────────────────
    const equipmentDetails = rawPayload.equipmentDetails || {};
    const steps = rawPayload.steps || [];
    const recommendations = rawPayload.recommendations || [];
    const summary = rawPayload.summary || {};
    const execSummary = rawPayload.executiveSummary || {};

    const transformedPayload = {
      reportTitle: rawPayload.reportTitle || 'Maintenance Instructions',
      reportDate: formatDate(rawPayload.reportDate),
      equipmentType: equipmentDetails.equipmentType || '',
      location: equipmentDetails.location || '',
      installationType: equipmentDetails.installationType || '',
      maintenanceType: execSummary.maintenanceType || '',
      recommendedFrequency: execSummary.recommendedFrequency || '',
      totalSteps: summary.totalSteps || steps.length,
      overallRiskLevel: summary.overallRiskLevel || '',
      steps: steps.map((s: Record<string, unknown>, i: number) => ({
        stepNumber: s.stepNumber || i + 1,
        title: s.title || '',
        description: s.description || '',
        safetyNote: s.safetyNote || '',
        estimatedTime: s.estimatedTime || '',
        hazards: Array.isArray(s.hazards) ? s.hazards.join(', ') : '',
        toolsRequired: Array.isArray(s.toolsRequired) ? s.toolsRequired.join(', ') : '',
        partsRequired: Array.isArray(s.partsRequired) ? s.partsRequired.join(', ') : '',
        verificationChecks: Array.isArray(s.verificationChecks) ? s.verificationChecks.join(' | ') : '',
      })),
      recommendations: recommendations.map((r: string) => ({ text: r })),
    };

    const cleanProjectName = (equipmentDetails.location || equipmentDetails.equipmentType || 'Equipment')
      .replace(/[^a-zA-Z0-9\s-]/g, '').replace(/\s+/g, '-').substring(0, 50);
    const filename = `Maintenance - ${cleanProjectName}.pdf`;

    // ── Submit to PDFMonkey — returns documentId instantly (<1s) ────
    console.log('[MAINTENANCE-PDF] Submitting to PDFMonkey');
    const createResponse = await fetch('https://api.pdfmonkey.io/api/v1/documents', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PDFMONKEY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        document: {
          document_template_id: MAINTENANCE_METHOD_TEMPLATE_ID,
          payload: transformedPayload,
          filename,
          status: 'pending',
        },
      }),
    });

    if (!createResponse.ok) {
      const errorText = await createResponse.text();
      console.error('[MAINTENANCE-PDF] PDFMonkey create error:', createResponse.status, errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to create PDF document', details: errorText }),
        { status: createResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const createData = await createResponse.json();
    const documentId = createData.document?.id;

    if (!documentId) {
      return new Response(
        JSON.stringify({ error: 'No document ID returned from PDFMonkey' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('[MAINTENANCE-PDF] Submitted to PDFMonkey, documentId:', documentId);

    // ── Return proxy URL immediately — no waiting ────────────────────
    // The proxy function polls PDFMonkey server-to-server (no iOS timeout risk).
    // openOrDownloadPdf() on iOS opens this URL in Safari which handles the wait.
    const proxyUrl = `${SUPABASE_URL}/functions/v1/maintenance-pdf-proxy?id=${documentId}&filename=${encodeURIComponent(filename)}`;

    return new Response(
      JSON.stringify({ success: true, downloadUrl: proxyUrl, filename }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[MAINTENANCE-PDF] Error:', (error as Error).message);
    return new Response(
      JSON.stringify({ error: (error as Error).message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
