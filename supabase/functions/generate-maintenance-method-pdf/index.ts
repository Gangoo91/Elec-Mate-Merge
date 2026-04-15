import { serve, corsHeaders } from '../_shared/deps.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const VPS_URL = Deno.env.get('VPS_MCP_URL') || 'http://89.167.69.251:3100';
const VPS_API_KEY = Deno.env.get('VPS_API_KEY');

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
 * Build an HTML document from the maintenance method payload.
 * Styled to match the app's professional dark → printed white aesthetic.
 */
function buildHtml(payload: Record<string, unknown>): string {
  const eq = (payload.equipmentDetails as Record<string, string>) || {};
  const summary = (payload.summary as Record<string, string>) || {};
  const execSummary = (payload.executiveSummary as Record<string, string>) || {};
  const steps = (payload.steps as Array<Record<string, unknown>>) || [];
  const recommendations = (payload.recommendations as string[]) || [];
  const reportTitle = (payload.reportTitle as string) || 'Maintenance Instructions';
  const reportDate = formatDate(payload.reportDate as string | undefined);

  const riskColour =
    summary.overallRiskLevel === 'high'
      ? '#dc2626'
      : summary.overallRiskLevel === 'medium'
      ? '#d97706'
      : '#16a34a';

  const stepsHtml = steps
    .map((step: Record<string, unknown>) => {
      const hazards = (step.hazards as string[]) || [];
      const tools = (step.toolsRequired as string[]) || [];
      const checks = (step.verificationChecks as string[]) || [];
      const parts = (step.partsRequired as string[]) || [];

      return `
      <div class="step">
        <div class="step-header">
          <span class="step-number">Step ${step.stepNumber}</span>
          <span class="step-title">${step.title || ''}</span>
          ${step.estimatedTime ? `<span class="step-time">${step.estimatedTime}</span>` : ''}
        </div>
        <p class="step-desc">${step.description || ''}</p>
        ${step.safetyNote ? `<div class="safety-note">⚠️ Safety: ${step.safetyNote}</div>` : ''}
        ${hazards.length ? `<div class="meta-row"><strong>Hazards:</strong> ${hazards.join(', ')}</div>` : ''}
        ${tools.length ? `<div class="meta-row"><strong>Tools:</strong> ${tools.join(', ')}</div>` : ''}
        ${parts.length ? `<div class="meta-row"><strong>Parts:</strong> ${parts.join(', ')}</div>` : ''}
        ${checks.length ? `
          <div class="checks">
            <strong>Verification Checks:</strong>
            <ul>${checks.map((c: string) => `<li>${c}</li>`).join('')}</ul>
          </div>` : ''}
      </div>`;
    })
    .join('');

  const recsHtml = recommendations.length
    ? `<section class="section">
        <h2>Recommendations</h2>
        <ul class="recs">
          ${recommendations.map((r) => `<li>${r}</li>`).join('')}
        </ul>
      </section>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${reportTitle}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 10pt; color: #111; background: #fff; padding: 20mm; }
  h1 { font-size: 20pt; color: #1a1a2e; border-bottom: 3px solid #f59e0b; padding-bottom: 8px; margin-bottom: 16px; }
  h2 { font-size: 12pt; color: #1a1a2e; margin: 20px 0 10px; border-left: 4px solid #f59e0b; padding-left: 10px; }
  .header-meta { display: flex; gap: 24px; margin-bottom: 24px; flex-wrap: wrap; }
  .meta-item { background: #f8f9fa; border-radius: 6px; padding: 8px 14px; font-size: 9pt; }
  .meta-item strong { display: block; color: #6b7280; font-size: 8pt; text-transform: uppercase; letter-spacing: 0.05em; }
  .risk-badge { display: inline-block; padding: 3px 10px; border-radius: 4px; font-size: 8pt; font-weight: bold; color: white; background: ${riskColour}; }
  .section { margin-bottom: 28px; }
  .step { border: 1px solid #e5e7eb; border-radius: 8px; padding: 14px; margin-bottom: 12px; page-break-inside: avoid; }
  .step-header { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
  .step-number { background: #f59e0b; color: #000; font-weight: bold; font-size: 8pt; padding: 2px 8px; border-radius: 4px; white-space: nowrap; }
  .step-title { font-weight: 600; font-size: 10.5pt; flex: 1; }
  .step-time { color: #6b7280; font-size: 8.5pt; white-space: nowrap; }
  .step-desc { font-size: 9.5pt; color: #374151; margin-bottom: 8px; line-height: 1.5; }
  .safety-note { background: #fef9c3; border-left: 3px solid #f59e0b; padding: 6px 10px; font-size: 9pt; margin: 6px 0; border-radius: 0 4px 4px 0; }
  .meta-row { font-size: 8.5pt; color: #4b5563; margin-top: 4px; }
  .checks ul, .recs { padding-left: 18px; }
  .checks ul li, .recs li { font-size: 9pt; color: #374151; margin-bottom: 3px; line-height: 1.45; }
  .checks { margin-top: 6px; font-size: 8.5pt; }
  .footer { margin-top: 32px; border-top: 1px solid #e5e7eb; padding-top: 10px; font-size: 8pt; color: #9ca3af; display: flex; justify-content: space-between; }
  @media print { body { padding: 0; } }
</style>
</head>
<body>
  <h1>${reportTitle}</h1>

  <div class="header-meta">
    <div class="meta-item"><strong>Equipment Type</strong>${eq.equipmentType || '—'}</div>
    <div class="meta-item"><strong>Location</strong>${eq.location || '—'}</div>
    <div class="meta-item"><strong>Installation Type</strong>${eq.installationType || '—'}</div>
    <div class="meta-item"><strong>Date</strong>${reportDate}</div>
    ${summary.totalSteps ? `<div class="meta-item"><strong>Total Steps</strong>${summary.totalSteps}</div>` : ''}
    ${summary.overallRiskLevel ? `<div class="meta-item"><strong>Risk Level</strong><span class="risk-badge">${summary.overallRiskLevel?.toUpperCase()}</span></div>` : ''}
    ${execSummary.maintenanceType ? `<div class="meta-item"><strong>Maintenance Type</strong>${execSummary.maintenanceType}</div>` : ''}
    ${execSummary.recommendedFrequency ? `<div class="meta-item"><strong>Frequency</strong>${execSummary.recommendedFrequency}</div>` : ''}
  </div>

  ${steps.length ? `
  <section class="section">
    <h2>Maintenance Procedure</h2>
    ${stepsHtml}
  </section>` : ''}

  ${recsHtml}

  <div class="footer">
    <span>Generated by Elec-Mate</span>
    <span>${reportDate}</span>
  </div>
</body>
</html>`;
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('[MAINTENANCE-PDF] Request started');

    if (!VPS_API_KEY) {
      console.error('[MAINTENANCE-PDF] VPS_API_KEY not configured');
      return new Response(JSON.stringify({ error: 'PDF service not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const payload = await req.json();
    console.log('[MAINTENANCE-PDF] Equipment:', payload.equipmentDetails?.equipmentType);

    // ── Generate HTML ────────────────────────────────────────────────
    const html = buildHtml(payload);

    // ── Send to VPS HTML-to-PDF (Gotenberg) ──────────────────────────
    console.log('[MAINTENANCE-PDF] Sending to VPS HTML-to-PDF');
    const pdfResponse = await fetch(`${VPS_URL}/api/html-to-pdf`, {
      method: 'POST',
      headers: {
        'X-API-Key': VPS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ html }),
    });

    if (!pdfResponse.ok) {
      const errText = await pdfResponse.text();
      console.error('[MAINTENANCE-PDF] VPS error:', pdfResponse.status, errText);
      throw new Error(`PDF generation failed: ${pdfResponse.status}`);
    }

    const pdfBytes = new Uint8Array(await pdfResponse.arrayBuffer());
    console.log('[MAINTENANCE-PDF] PDF generated:', pdfBytes.length, 'bytes');

    // ── Upload to Supabase Storage ───────────────────────────────────
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const eq = (payload.equipmentDetails as Record<string, string>) || {};
    const cleanName = (eq.equipmentType || 'Maintenance')
      .replace(/[^a-zA-Z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50);
    const filename = `Maintenance - ${cleanName}.pdf`;
    const storagePath = `maintenance/${Date.now()}-${cleanName}.pdf`;

    const { error: uploadError } = await supabase.storage
      .from('certificates')
      .upload(storagePath, pdfBytes, {
        contentType: 'application/pdf',
        upsert: true,
      });

    if (uploadError) {
      console.error('[MAINTENANCE-PDF] Storage upload failed:', uploadError.message);
      // Fallback: return base64
      let binary = '';
      const chunk = 8192;
      for (let i = 0; i < pdfBytes.length; i += chunk) {
        binary += String.fromCharCode(...pdfBytes.subarray(i, i + chunk));
      }
      return new Response(
        JSON.stringify({
          success: true,
          downloadUrl: `data:application/pdf;base64,${btoa(binary)}`,
          filename,
          fallback: true,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { data: urlData } = supabase.storage
      .from('certificates')
      .getPublicUrl(storagePath);

    console.log('[MAINTENANCE-PDF] Complete:', urlData.publicUrl);

    return new Response(
      JSON.stringify({
        success: true,
        downloadUrl: urlData.publicUrl,
        filename,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('[MAINTENANCE-PDF] Error:', (error as Error).message);
    return new Response(
      JSON.stringify({ error: (error as Error).message || 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
