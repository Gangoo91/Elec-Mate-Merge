/**
 * generate-hs-specialist-pdf
 *
 * Generates a PDF for a completed H&S Specialist job (health_safety_jobs table).
 * Uses SafetyPDFBuilder (pdf-lib) — no external PDF service required.
 *
 * Request: POST { recordId: string }   (recordId = health_safety_jobs.id)
 * Response: { success: true, url: string }  OR  { success: true, pdf_base64: string }
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { SafetyPDFBuilder } from '../_shared/SafetyPDFBuilder.ts';
import type { CompanyBranding } from '../_shared/SafetyPDFBuilder.ts';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-request-id',
};

const riskLabel = (r: number) =>
  r >= 16 ? 'Unacceptable' : r >= 10 ? 'High' : r >= 5 ? 'Medium' : 'Low';

const riskColour = (r: number): string =>
  r >= 16 ? '#ef4444' : r >= 10 ? '#f97316' : r >= 5 ? '#eab308' : '#22c55e';

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) throw new Error('Missing authorization header');

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabase = createClient(supabaseUrl, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
    const userSupabase = createClient(supabaseUrl, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: userError } = await userSupabase.auth.getUser();
    if (userError || !user) throw new Error('Unauthorised');

    // Branding
    const { data: profileRows } = await supabase
      .from('company_profiles')
      .select('company_name, company_address, company_postcode, company_phone, company_email, company_website, company_registration, vat_number, logo_data_url, logo_url, primary_color, secondary_color, scheme_logo_data_url, registration_scheme')
      .eq('user_id', user.id)
      .limit(1);
    const branding: CompanyBranding = profileRows?.[0] ?? {};

    const { recordId } = await req.json();
    if (!recordId) throw new Error('Missing recordId');

    // Fetch the H&S job
    const { data: job, error: fetchError } = await userSupabase
      .from('health_safety_jobs')
      .select('id, status, output_data, work_type, query, project_info, created_at')
      .eq('id', recordId)
      .single();

    if (fetchError || !job) throw new Error('H&S job not found');
    if (job.status !== 'complete') throw new Error('H&S job is not complete');

    const d: any = job.output_data ?? {};
    const hazards: any[] = Array.isArray(d.hazards) ? d.hazards : [];
    const pi: any = job.project_info ?? {};
    const summary: any = d.summary ?? {};
    const prep: any = d.preparation ?? {};

    const docTitle = d.jobTitle || pi.projectName || 'Risk Assessment & Method Statement';
    const docDate = new Date(job.created_at).toLocaleDateString('en-GB', {
      day: '2-digit', month: 'long', year: 'numeric',
    });

    // ── Build PDF ─────────────────────────────────────────────────────
    const pdf = await SafetyPDFBuilder.create(docTitle, job.id, 'Active', 'success', branding);

    // ── Cover info ────────────────────────────────────────────────────
    const coverGrid: Array<{ label: string; value: string }> = [
      { label: 'Date', value: docDate },
      { label: 'Work Type', value: (job.work_type ?? d.workType ?? 'commercial').replace(/\b\w/g, (c: string) => c.toUpperCase()) },
      { label: 'Total Hazards', value: String(summary.totalHazards ?? hazards.length) },
      { label: 'Residual Risk', value: (summary.overallResidualRisk ?? 'medium').replace(/\b\w/g, (c: string) => c.toUpperCase()) },
    ];
    if (pi.projectName) coverGrid.push({ label: 'Project', value: pi.projectName });
    if (pi.location) coverGrid.push({ label: 'Location', value: pi.location });
    if (pi.clientName) coverGrid.push({ label: 'Client', value: pi.clientName });
    if (pi.scopeOfWorks) coverGrid.push({ label: 'Scope', value: pi.scopeOfWorks });

    pdf.section('Document Details');
    pdf.keyValueGrid(coverGrid);

    // ── Executive Summary ─────────────────────────────────────────────
    if (d.executiveSummary) {
      pdf.section('Executive Summary');
      pdf.paragraph(String(d.executiveSummary));
    }

    // ── Preparation ───────────────────────────────────────────────────
    if (Object.keys(prep).length > 0) {
      pdf.section('Preparation');
      const prepPairs: Array<{ label: string; value: string }> = [];
      if (Array.isArray(prep.competencyRequired) && prep.competencyRequired.length)
        prepPairs.push({ label: 'Competency Required', value: prep.competencyRequired.join(' · ') });
      if (Array.isArray(prep.permitsRequired) && prep.permitsRequired.length)
        prepPairs.push({ label: 'Permits Required', value: prep.permitsRequired.join(' · ') });
      if (Array.isArray(prep.documentationRequired) && prep.documentationRequired.length)
        prepPairs.push({ label: 'Documentation', value: prep.documentationRequired.join(' · ') });
      if (Array.isArray(prep.ppeBaseline) && prep.ppeBaseline.length)
        prepPairs.push({ label: 'PPE Baseline', value: prep.ppeBaseline.join(' · ') });
      if (Array.isArray(prep.siteAccess) && prep.siteAccess.length)
        prepPairs.push({ label: 'Site Access', value: prep.siteAccess.join(' · ') });
      if (prepPairs.length) pdf.keyValueGrid(prepPairs, 1);
    }

    // ── Hazard Register ───────────────────────────────────────────────
    if (hazards.length > 0) {
      pdf.section(`Hazard Register (${hazards.length} hazards)`);

      for (const h of hazards) {
        const preRisk = (h.likelihood ?? 0) * (h.severity ?? 0);
        const postRisk = (h.residualLikelihood ?? 0) * (h.residualSeverity ?? 0);

        // Hazard heading with score
        pdf.paragraph(
          `${h.hazardNumber ?? ''}.  ${h.title ?? ''}`,
          { bold: true, size: 11 }
        );

        // Location + primary risk
        if (h.locationOfHazard) pdf.paragraph(`Location: ${h.locationOfHazard}`, { size: 9 });
        if (h.primaryRisk) pdf.paragraph(`Risk: ${h.primaryRisk}`, { size: 9 });

        // Risk scores
        const scoreGrid: Array<{ label: string; value: string }> = [
          { label: 'Pre-control score', value: `${preRisk} — ${riskLabel(preRisk)}` },
          { label: 'Residual score', value: `${postRisk} — ${riskLabel(postRisk)}` },
        ];
        if (Array.isArray(h.personsAtRisk) && h.personsAtRisk.length)
          scoreGrid.push({ label: 'Persons at risk', value: h.personsAtRisk.join(', ') });
        pdf.keyValueGrid(scoreGrid);

        // Rationale
        if (h.rationale) pdf.paragraph(h.rationale, { size: 9 });

        // Controls
        if (Array.isArray(h.controls) && h.controls.length > 0) {
          pdf.paragraph('Controls:', { bold: true, size: 9 });
          pdf.bulletList(
            h.controls.map((c: any) =>
              `[${(c.tier ?? '').toUpperCase()}] ${c.control ?? ''} — ${c.detail ?? ''}`
            )
          );
        }

        // Citations
        const cites: string[] = [
          ...(h.bsReferences ?? []),
          ...(h.safetyReferences ?? []),
        ];
        if (cites.length) {
          pdf.paragraph(`Regulatory references: ${cites.join(' · ')}`, { size: 8 });
        }

        // PPE + monitoring
        if (Array.isArray(h.ppeRequired) && h.ppeRequired.length)
          pdf.paragraph(`PPE: ${h.ppeRequired.join(' · ')}`, { size: 8 });
        if (Array.isArray(h.monitoringChecks) && h.monitoringChecks.length)
          pdf.paragraph(`Monitoring: ${h.monitoringChecks.join(' · ')}`, { size: 8 });
        if (Array.isArray(h.stopWorkTriggers) && h.stopWorkTriggers.length)
          pdf.paragraph(`Stop-work triggers: ${h.stopWorkTriggers.join(' · ')}`, { size: 8 });
      }
    }

    // ── Critical References ───────────────────────────────────────────
    if (Array.isArray(summary.criticalRegs) && summary.criticalRegs.length > 0) {
      pdf.section('Critical Regulatory References');
      pdf.bulletList(summary.criticalRegs);
    }

    // ── Emergency Procedures ──────────────────────────────────────────
    const ep: any = d.emergencyProcedures ?? {};
    const emergencyItems: string[] = [
      ...(ep.firstAid ?? []),
      ...(ep.fireEvacuation ?? []),
      ...(ep.electricalIncident ?? []),
      ...(ep.spillResponse ?? []),
    ].filter(Boolean);
    if (emergencyItems.length) {
      pdf.section('Emergency Procedures');
      pdf.bulletList(emergencyItems);
      if (ep.nearestA_E) pdf.paragraph(`Nearest A&E: ${ep.nearestA_E}`, { size: 9 });
    }

    pdf.auditFooter(job.id);

    // ── Upload PDF ────────────────────────────────────────────────────
    const pdfBytes = await pdf.toBuffer();
    const fileName = `hs-specialist-${recordId}-${Date.now()}.pdf`;

    const { error: uploadError } = await supabase.storage
      .from('safety-documents')
      .upload(`${user.id}/${fileName}`, pdfBytes, {
        contentType: 'application/pdf',
        upsert: true,
      });

    if (uploadError) {
      // Base64 fallback if storage upload fails
      const bytes = new Uint8Array(pdfBytes);
      let binary = '';
      const chunkSize = 8192;
      for (let i = 0; i < bytes.length; i += chunkSize)
        binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
      return new Response(JSON.stringify({ success: true, pdf_base64: btoa(binary) }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { data: urlData } = supabase.storage
      .from('safety-documents')
      .getPublicUrl(`${user.id}/${fileName}`);

    return new Response(JSON.stringify({ success: true, url: urlData.publicUrl }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    await captureException(error, { functionName: 'generate-hs-specialist-pdf', requestUrl: req.url, requestMethod: req.method });
    console.error('[generate-hs-specialist-pdf] Error:', error);
    return new Response(JSON.stringify({ success: false, error: (error as Error).message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
