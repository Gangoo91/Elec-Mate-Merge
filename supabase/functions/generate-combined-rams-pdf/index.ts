/* eslint-disable @typescript-eslint/no-explicit-any */
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-request-id',
};

const COMBINED_RAMS_TEMPLATE_ID = '5EE6A088-63C9-49C6-8FF0-C637CEAA17CA';

/**
 * Format control measures with proper line breaks between sections
 */
function formatControls(controls: string): string {
  if (!controls) return '';

  const sections = [
    'PRIMARY ACTION:',
    'ELIMINATE:',
    'SUBSTITUTE:',
    'ENGINEERING CONTROLS:',
    'ENGINEER CONTROLS:',
    'ADMINISTRATIVE CONTROLS:',
    'PPE REQUIREMENTS:',
    'PPE:',
    'VERIFICATION:',
    'COMPETENCY REQUIREMENT:',
    'EQUIPMENT STANDARDS:',
    'REGULATION:',
  ];

  let formatted = controls;

  sections.forEach((section) => {
    formatted = formatted.replace(new RegExp(section, 'gi'), `\n\n${section}`);
  });

  formatted = formatted.replace(/\n{3,}/g, '\n\n');

  return formatted.trim();
}

/**
 * Format step descriptions with proper line breaks between numbered items
 */
function formatDescription(description: string): string {
  if (!description) return '';

  let formatted = description;

  // Add line breaks before numbered items (1., 2., 3., etc.)
  formatted = formatted.replace(/(\d+\.)\s/g, '\n\n$1 ');

  // Add line breaks before bullet points
  formatted = formatted.replace(/([•-])\s/g, '\n\n$1 ');

  // Clean up multiple consecutive line breaks
  formatted = formatted.replace(/\n{3,}/g, '\n\n');

  return formatted.trim();
}

/**
 * Format safety requirements with proper line breaks between categories
 */
function formatSafetyText(text: string): string {
  if (!text) return '';

  let formatted = text;

  // Add line breaks before safety category keywords
  const safetyKeywords = [
    'administrative control',
    'engineering control',
    'engineering:',
    'PPE:',
    'elimination',
    'substitution',
    'always follow',
    'verify',
    'record',
  ];

  safetyKeywords.forEach((keyword) => {
    formatted = formatted.replace(new RegExp(`(;\\s*)(${keyword})`, 'gi'), `\n\n$2`);
  });

  // Clean up multiple consecutive line breaks
  formatted = formatted.replace(/\n{3,}/g, '\n\n');

  return formatted.trim();
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { ramsData, methodData } = await req.json();
    const pdfMonkeyApiKey = Deno.env.get('PDFMONKEY_API_KEY');

    console.log('Combined RAMS PDF Generation Started');
    console.log('Template ID:', COMBINED_RAMS_TEMPLATE_ID);
    console.log('Input RAMS Data:', {
      projectName: ramsData?.projectName,
      risksCount: ramsData?.risks?.length,
      location: ramsData?.location,
      ppeDetailsCount: ramsData?.ppeDetails?.length || 0,
      requiredPPECount: ramsData?.requiredPPE?.length || 0,
    });
    console.log('Input Method Data:', {
      jobTitle: methodData?.jobTitle,
      stepsCount: methodData?.steps?.length,
      workType: methodData?.workType,
      toolsCount: methodData?.toolsRequired?.length || 0,
    });

    if (!pdfMonkeyApiKey) {
      console.warn('PDFMONKEY_API_KEY not configured');
      return new Response(
        JSON.stringify({
          success: false,
          useFallback: true,
          message: 'PDF Monkey API key not configured',
          templateId: COMBINED_RAMS_TEMPLATE_ID,
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Issued date — render in UK format (dd/MM/yyyy). Honours a backdated value
    // (audits / retrospective records) and falls back to today when unset.
    const parsedIssue = ramsData.date ? new Date(ramsData.date) : new Date();
    const issuedDateStr = (isNaN(parsedIssue.getTime()) ? new Date() : parsedIssue)
      .toLocaleDateString('en-GB');

    // Build payload in the EXACT nested structure PDF Monkey template expects
    const payload = {
      version: ramsData?.version ?? 2,
      ramsData: {
        projectName: ramsData.projectName,
        location: ramsData.location,
        date: issuedDateStr,
        assessor: ramsData.assessor,
        contractor: ramsData.contractor,
        supervisor: ramsData.supervisor,
        activities: ramsData.activities ?? [methodData.workType || 'Electrical installation work'],
        // v2 narrative blocks — passed through so PDF Monkey template can render
        // them when upgraded. The local fallback already renders these.
        executive_summary: ramsData.executive_summary ?? '',
        rationale: ramsData.rationale ?? '',
        scope: ramsData.scope ?? '',
        preparation: ramsData.preparation ?? null,
        site_logistics: ramsData.site_logistics ?? null,
        competence_requirements: ramsData.competence_requirements ?? [],
        complianceRegulations: ramsData.complianceRegulations ?? [],
        complianceWarnings: ramsData.complianceWarnings ?? [],
        // Sort risks by rating (highest first)
        risks: [...(ramsData.risks || [])]
          .sort((a: any, b: any) => (b.riskRating || 0) - (a.riskRating || 0))
          .map((risk: any) => ({
            id: risk.id || `risk-${risk.hazard?.substring(0, 10)}`,
            hazard: risk.hazard,
            likelihood: risk.likelihood,
            severity: risk.severity,
            riskRating: risk.riskRating,
            controls: formatControls(risk.controls),
            residualRisk: risk.residualRisk,
            furtherAction: risk.furtherAction || 'Monitor and review control measures regularly',
            responsible: risk.responsible || ramsData.assessor || 'Site Supervisor',
            actionBy: (() => {
              // Render dates in UK format; preserve free-text action owners as-is.
              if (risk.actionBy) {
                const d = new Date(risk.actionBy);
                return isNaN(d.getTime()) ? risk.actionBy : d.toLocaleDateString('en-GB');
              }
              return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB');
            })(),
            done: risk.done || false,
            // v2 rich fields
            rationale: risk.rationale ?? '',
            who_at_risk: risk.who_at_risk ?? [],
            controlsStructured: risk.controlsStructured ?? [],
            residual_likelihood: risk.residual_likelihood ?? null,
            residual_severity: risk.residual_severity ?? null,
            residual_risk_rating: risk.residual_risk_rating ?? risk.residualRisk ?? null,
            ppe_required: risk.ppe_required ?? [],
            competence_required: risk.competence_required ?? [],
            bs7671_cites: risk.bs7671_cites ?? [],
            safety_cites: risk.safety_cites ?? [],
            training_required: risk.training_required ?? [],
            monitoring_checks: risk.monitoring_checks ?? [],
            evidence_required: risk.evidence_required ?? [],
            stop_work_triggers: risk.stop_work_triggers ?? [],
          })),
        // Emergency contacts as individual fields
        siteManagerName: ramsData.siteManagerName || methodData.siteManagerName || '',
        siteManagerPhone: ramsData.siteManagerPhone || methodData.siteManagerPhone || '',
        firstAiderName: ramsData.firstAiderName || methodData.firstAiderName || '',
        firstAiderPhone: ramsData.firstAiderPhone || methodData.firstAiderPhone || '',
        safetyOfficerName: ramsData.safetyOfficerName || methodData.safetyOfficerName || '',
        safetyOfficerPhone: ramsData.safetyOfficerPhone || methodData.safetyOfficerPhone || '',
        assemblyPoint: ramsData.assemblyPoint || methodData.assemblyPoint || '',
        // PPE data - both legacy and enhanced
        requiredPPE: ramsData.requiredPPE || [],
        ppeDetails: (ramsData.ppeDetails || []).map((ppe: any) => ({
          id: ppe.id,
          itemNumber: ppe.itemNumber,
          ppeType: ppe.ppeType,
          standard: ppe.standard,
          mandatory: ppe.mandatory,
          purpose: ppe.purpose,
        })),
      },
      methodStatementData: {
        jobTitle: methodData.jobTitle,
        location: methodData.location,
        contractor: methodData.contractor,
        supervisor: methodData.supervisor,
        workType: methodData.workType,
        duration: methodData.duration,
        teamSize: methodData.teamSize,
        description: methodData.description,
        overallRiskLevel: methodData.overallRiskLevel,
        reviewDate: methodData.reviewDate,
        // v2 narrative
        executive_summary: methodData.executive_summary ?? '',
        scope: methodData.scope ?? '',
        exclusions: methodData.exclusions ?? [],
        sequence_summary: methodData.sequence_summary ?? [],
        handover_artifacts: methodData.handover_artifacts ?? [],
        verification_strategy: methodData.verification_strategy ?? null,
        steps: (methodData.steps || []).map((step: any) => ({
          id: step.id || `step-${step.stepNumber}`,
          stepNumber: step.stepNumber,
          title: step.title,
          description: formatDescription(step.description),
          estimatedDuration: step.estimatedDuration,
          riskLevel: step.riskLevel,
          safetyRequirements: (step.safetyRequirements || []).map((req: string) =>
            formatSafetyText(req)
          ),
          equipmentNeeded: step.equipmentNeeded || [],
          qualifications: step.qualifications || [],
          isCompleted: step.isCompleted || false,
          dependencies: step.dependencies || [],
          notes: step.notes || '',
          linkedHazards: step.linkedHazards || [],
        })),
        // v2 method_steps — pass through directly (rich fields)
        method_steps: (methodData.method_steps || []).map((s: any) => ({
          id: s.id,
          stepNumber: s.stepNumber,
          title: s.title,
          phase: s.phase ?? '',
          objective: s.objective ?? '',
          description: formatDescription(s.description ?? ''),
          linked_hazard_titles: s.linked_hazard_titles ?? [],
          linked_hazard_ids: s.linked_hazard_ids ?? [],
          inputs: s.inputs ?? [],
          outputs: s.outputs ?? [],
          named_instruments: s.named_instruments ?? [],
          named_values: s.named_values ?? [],
          hold_points: s.hold_points ?? [],
          witness_points: s.witness_points ?? [],
          quality_checks: s.quality_checks ?? [],
          acceptance_criteria: s.acceptance_criteria ?? [],
          safety_requirements: s.safety_requirements ?? [],
          equipment_needed: s.equipment_needed ?? [],
          materials_consumed: s.materials_consumed ?? [],
          competence_required: s.competence_required ?? [],
          ppe_required: s.ppe_required ?? [],
          bs7671_cites: s.bs7671_cites ?? [],
          safety_cites: s.safety_cites ?? [],
          documentation_produced: s.documentation_produced ?? [],
          sign_off_required: !!s.sign_off_required,
          estimated_duration: s.estimated_duration ?? '',
          risk_level: s.risk_level ?? 'medium',
          stop_work_triggers: s.stop_work_triggers ?? [],
        })),
        id: methodData.id || '',
        approvedBy: methodData.approvedBy || '',
        createdAt: methodData.createdAt || new Date().toISOString(),
        updatedAt: methodData.updatedAt || new Date().toISOString(),
        // Extended method statement fields
        practicalTips: methodData.practicalTips || [],
        commonMistakes: methodData.commonMistakes || [],
        toolsRequired: methodData.toolsRequired || [],
        materialsRequired: methodData.materialsRequired || [],
        totalEstimatedTime: methodData.totalEstimatedTime || '',
        difficultyLevel: methodData.difficultyLevel || '',
        complianceRegulations: methodData.complianceRegulations || [],
        complianceWarnings: methodData.complianceWarnings || [],
        requiredQualifications: methodData.requiredQualifications || [],
      },
    };

    console.log('Sending payload to PDF Monkey:', {
      risksCount: payload.ramsData.risks?.length,
      stepsCount: payload.methodStatementData.steps?.length,
      ppeCount: payload.ramsData.ppeDetails?.length || payload.ramsData.requiredPPE?.length,
    });

    const response = await fetch('https://api.pdfmonkey.io/api/v1/documents', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${pdfMonkeyApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        document: {
          document_template_id: COMBINED_RAMS_TEMPLATE_ID,
          status: 'pending',
          payload: payload,
          meta: {
            _filename: `Combined_RAMS_${ramsData.projectName?.replace(/[^a-z0-9]/gi, '_') || Date.now()}.pdf`,
          },
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('PDF Monkey API Error:', response.status, errorText);

      return new Response(
        JSON.stringify({
          success: false,
          useFallback: true,
          error: `PDF Monkey API error: ${response.status}`,
          templateId: COMBINED_RAMS_TEMPLATE_ID,
        }),
        {
          status: response.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const pdfResponse = await response.json();
    const documentId = pdfResponse.document.id;
    let downloadUrl = pdfResponse.document.download_url;
    let status = pdfResponse.document.status;

    console.log('PDF Monkey Response:', { documentId, status });

    // Poll for completion with exponential backoff
    if (status === 'draft' || status === 'pending' || status === 'generating') {
      const maxAttempts = 30;
      const delays = [1000, 2000, 4000, 8000, 16000];

      for (let i = 0; i < maxAttempts; i++) {
        const delay = delays[Math.min(i, delays.length - 1)];
        await new Promise((resolve) => setTimeout(resolve, delay));

        const statusResponse = await fetch(
          `https://api.pdfmonkey.io/api/v1/documents/${documentId}`,
          {
            headers: {
              Authorization: `Bearer ${pdfMonkeyApiKey}`,
            },
          }
        );

        if (!statusResponse.ok) {
          console.error('Status check failed:', statusResponse.status);
          break;
        }

        const statusData = await statusResponse.json();
        status = statusData.document.status;
        downloadUrl = statusData.document.download_url;

        if (status === 'success') {
          console.log('PDF generation completed successfully');
          break;
        } else if (status === 'failure') {
          console.error('PDF generation failed:', statusData.document.failure_cause);
          return new Response(
            JSON.stringify({
              success: false,
              useFallback: true,
              error: 'PDF Monkey generation failed',
              details: statusData.document.errors || 'Unknown error',
              templateId: COMBINED_RAMS_TEMPLATE_ID,
            }),
            {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          );
        }
      }
    }

    // Check if PDF generation completed
    if (!downloadUrl || status !== 'success') {
      return new Response(
        JSON.stringify({
          success: false,
          useFallback: true,
          message: `PDF generation ${status === 'draft' ? 'stuck in draft status' : 'timed out'}`,
          status: status,
          documentId: documentId,
          templateId: COMBINED_RAMS_TEMPLATE_ID,
          hint:
            status === 'draft'
              ? 'Template may not be set to auto-generate mode in PDF Monkey dashboard'
              : 'Generation took too long - check template configuration',
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        documentId: documentId,
        downloadUrl: downloadUrl,
        status: status,
        templateId: COMBINED_RAMS_TEMPLATE_ID,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Fatal error in generate-combined-rams-pdf:', error);

    return new Response(
      JSON.stringify({
        success: false,
        useFallback: true,
        error: error instanceof Error ? error.message : 'Failed to generate PDF',
        templateId: COMBINED_RAMS_TEMPLATE_ID,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
