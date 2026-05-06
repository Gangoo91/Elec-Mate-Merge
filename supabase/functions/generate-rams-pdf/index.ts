import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

// PDF Monkey template ID for RAMS documents
const RAMS_TEMPLATE_ID = '95DF938E-D857-4573-8F0C-3E4FD85D4A24';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { ramsData, outputData, healthSafetyData, userId } = body ?? {};
    // The new H&S Specialist passes outputData (the editorial schema).
    // Legacy callers pass ramsData. healthSafetyData is the older alias.
    const sourceData = outputData ?? healthSafetyData ?? ramsData ?? {};
    const isNewSchema = Array.isArray(sourceData?.hazards);
    const pdfMonkeyApiKey = Deno.env.get('PDFMONKEY_API_KEY');

    console.log('Generating risk assessment PDF', {
      template: RAMS_TEMPLATE_ID,
      schema: isNewSchema ? 'specialist-v2' : 'legacy',
    });

    if (!pdfMonkeyApiKey) {
      console.log('PDFMONKEY_API_KEY not configured, using fallback');
      return new Response(
        JSON.stringify({
          success: false,
          useFallback: true,
          message: 'PDF Monkey not configured',
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Check for custom user template (optional override)
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: template } = await supabase
      .from('pdf_templates')
      .select('*')
      .eq('user_id', userId)
      .eq('type', 'rams')
      .eq('is_active', true)
      .single();

    // Use custom template if available, otherwise use default
    const templateId = template?.pdf_monkey_template_id || RAMS_TEMPLATE_ID;
    const payload = template?.field_mapping
      ? applyFieldMapping(sourceData, template.field_mapping)
      : isNewSchema
        ? buildSpecialistPayload(sourceData)
        : buildLegacyPayload(sourceData);

    const response = await fetch('https://api.pdfmonkey.io/api/v1/documents', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${pdfMonkeyApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        document: {
          document_template_id: templateId,
          status: 'pending',
          payload: payload,
          meta: {
            _filename: `Risk_Assessment_${(sourceData.jobTitle || sourceData.projectName || 'untitled').replace(/[^a-z0-9]/gi, '_')}_${Date.now()}.pdf`,
          },
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('PDF Monkey API error:', response.status, errorText);
      throw new Error(`PDF Monkey API error: ${response.status}`);
    }

    const pdfResponse = await response.json();
    const documentId = pdfResponse.document.id;
    let downloadUrl = pdfResponse.document.download_url;
    let status = pdfResponse.document.status;

    // Poll for completion if still generating (include 'draft' status)
    if (status === 'draft' || status === 'pending' || status === 'generating') {
      const maxAttempts = 60;
      for (let i = 0; i < maxAttempts; i++) {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        console.log(`Polling attempt ${i + 1}/${maxAttempts}, current status: ${status}`);

        const statusResponse = await fetch(
          `https://api.pdfmonkey.io/api/v1/documents/${documentId}`,
          {
            headers: {
              Authorization: `Bearer ${pdfMonkeyApiKey}`,
            },
          }
        );

        const statusData = await statusResponse.json();
        status = statusData.document.status;
        downloadUrl = statusData.document.download_url;

        if (status === 'success') {
          console.log('PDF generation completed successfully');
          break;
        } else if (status === 'failure') {
          throw new Error('PDF generation failed');
        }
      }
    }

    // Check if PDF generation completed successfully
    if (!downloadUrl || status !== 'success') {
      console.log('PDF generation timed out or incomplete', { status, downloadUrl });
      return new Response(
        JSON.stringify({
          success: false,
          useFallback: true,
          message: 'PDF generation timed out',
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
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in generate-rams-pdf function:', error);
    await captureException(error, {
      functionName: 'generate-rams-pdf',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return new Response(
      JSON.stringify({
        success: false,
        useFallback: true,
        error: error instanceof Error ? error.message : 'Failed to generate PDF',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

function getRiskLevel(rating: number): string {
  if (rating <= 4) return 'Low';
  if (rating <= 9) return 'Medium';
  if (rating <= 16) return 'High';
  return 'Very High';
}

/**
 * Map the H&S Specialist editorial output (`outputData`) to a flat
 * PDFMonkey payload. Sends every new field through alongside the legacy
 * shape so an updated template can pick them up while the existing
 * template still renders the basics.
 */
function buildSpecialistPayload(d: any): any {
  const hazards = Array.isArray(d.hazards) ? d.hazards : [];
  const sortedHazards = [...hazards].sort((a, b) => {
    const ar = (a.likelihood ?? 0) * (a.severity ?? 0) || (a.riskRating ?? 0);
    const br = (b.likelihood ?? 0) * (b.severity ?? 0) || (b.riskRating ?? 0);
    return br - ar;
  });

  // Document control fields the template needs.
  const today = new Date();
  const reviewDate = new Date(today);
  reviewDate.setFullYear(reviewDate.getFullYear() + 1);
  const todayStr = today.toLocaleDateString('en-GB');
  const reviewStr = reviewDate.toLocaleDateString('en-GB');
  const docRef = (d.id ?? d.jobId ?? crypto.randomUUID()).toString().slice(0, 8).toUpperCase();

  // Aggregate all PPE across the hazards, dedup, into a single list the
  // template can render in the PPE section.
  const ppeSet = new Set<string>();
  (d.preparation?.ppeBaseline ?? []).forEach((p: string) => p && ppeSet.add(p));
  for (const h of hazards) {
    (h.ppeRequired ?? []).forEach((p: string) => p && ppeSet.add(p));
  }
  const allPpe = Array.from(ppeSet).map((label, i) => ({
    ppeType: label,
    standard: '',
    mandatory: i < (d.preparation?.ppeBaseline?.length ?? 0),
    purpose: '',
  }));

  return {
    // Top-level
    documentTitle: d.jobTitle || d.projectName || 'Risk Assessment',
    jobTitle: d.jobTitle ?? '',
    executiveSummary: d.executiveSummary ?? '',
    rationale: d.rationale ?? '',
    workType: d.workType ?? 'commercial',
    assessmentType: 'Risk Assessment',
    date: todayStr,
    assessmentDate: todayStr,
    assessment_date: todayStr,
    reviewDate: reviewStr,
    review_date: reviewStr,
    documentRef: docRef,
    document_ref: docRef,
    version: '1.0',
    status: 'Issued for use',
    companyName: d.companyName ?? '',
    company_name: d.companyName ?? '',
    prepared_by_name: d.assessor ?? d.assessorName ?? '',
    prepared_by_position: d.assessorPosition ?? '',
    prepared_by_company: d.companyName ?? '',
    prepared_date: todayStr,
    authorised_by_name: '',
    authorised_by_position: '',
    authorised_by_company: '',
    authorised_date: '',
    projectName: d.projectName ?? d.jobTitle ?? '',
    projectType: d.workType ?? '',
    location: d.location ?? d.projectInfo?.location ?? '',
    clientName: d.clientName ?? d.projectInfo?.clientName ?? '',
    principalContractor: d.principalContractor ?? d.clientName ?? d.projectInfo?.clientName ?? '',
    assessor: d.assessor ?? d.assessorName ?? '',
    ppe: allPpe,

    // Preparation block
    preparation: {
      competencyRequired: d.preparation?.competencyRequired ?? [],
      permitsRequired: d.preparation?.permitsRequired ?? [],
      documentationRequired: d.preparation?.documentationRequired ?? [],
      siteAccess: d.preparation?.siteAccess ?? [],
      ppeBaseline: d.preparation?.ppeBaseline ?? [],
    },

    // Risks (legacy field name) + hazards (new). Both populated.
    // Each item carries BOTH the flat legacy fields and the rich new
    // fields so the template can use either.
    risks: sortedHazards.map((h: any, i: number) => buildRiskRow(h, i + 1)),
    hazards: sortedHazards.map((h: any, i: number) => buildRiskRow(h, i + 1)),

    // Emergency block
    emergencyProcedures: {
      firstAid: d.emergencyProcedures?.firstAid ?? [],
      fireEvacuation: d.emergencyProcedures?.fireEvacuation ?? [],
      spillResponse: d.emergencyProcedures?.spillResponse ?? [],
      electricalIncident: d.emergencyProcedures?.electricalIncident ?? [],
      nearestA_E: d.emergencyProcedures?.nearestA_E ?? '',
    },

    // Summary
    summary: {
      totalHazards: d.summary?.totalHazards ?? hazards.length,
      highestRiskRating: d.summary?.highestRiskRating ?? 0,
      criticalRegs: d.summary?.criticalRegs ?? [],
      overallResidualRisk: d.summary?.overallResidualRisk ?? 'medium',
    },

    // Legacy emergencyContacts left blank — caller should pass these
    // separately if available.
    emergencyContacts: {
      siteManager: d.siteManagerName ?? '',
      siteManagerPhone: d.siteManagerPhone ?? '',
      firstAider: d.firstAiderName ?? '',
      firstAiderPhone: d.firstAiderPhone ?? '',
      safetyOfficer: d.safetyOfficerName ?? '',
      safetyOfficerPhone: d.safetyOfficerPhone ?? '',
      assemblyPoint: d.assemblyPoint ?? '',
    },
  };
}

function buildRiskRow(h: any, fallbackNumber: number): any {
  const pre =
    (h.likelihood ?? 0) * (h.severity ?? 0) || h.riskRating || 0;
  const residual =
    (h.residualLikelihood ?? 0) * (h.residualSeverity ?? 0) ||
    h.residualRiskRating ||
    0;
  const controls = Array.isArray(h.controls) ? h.controls : [];
  // Build a structured controlMeasures object so legacy templates that
  // expect controlMeasures.{primary,eliminate,substitute,engineer,
  // administrative,verification,competency,equipment,regulation} still
  // render meaningful copy.
  const controlMeasures: Record<string, string> = {
    primary: '',
    eliminate: '',
    substitute: '',
    engineer: '',
    administrative: '',
    verification: '',
    competency: '',
    equipment: '',
    regulation: '',
  };
  for (const c of controls) {
    const tier = String(c.tier ?? '').toLowerCase();
    const text = c.detail || c.control || '';
    if (controlMeasures[tier] !== undefined) {
      controlMeasures[tier] = controlMeasures[tier]
        ? `${controlMeasures[tier]} ${text}`
        : text;
    }
  }
  // First control becomes the "primary" if not otherwise tagged.
  if (!controlMeasures.primary && controls[0]) {
    controlMeasures.primary = controls[0].control || controls[0].detail || '';
  }
  // Aggregate references into the regulation slot if not present.
  if (!controlMeasures.regulation) {
    const refs = [
      ...(h.bsReferences ?? []).map((r: string) => `BS 7671 Reg ${r}`),
      ...(h.safetyReferences ?? []),
    ];
    controlMeasures.regulation = refs.join(', ');
  }

  return {
    // Numbering + legacy fields the existing template already renders
    hazardNumber: h.hazardNumber ?? fallbackNumber,
    hazard: h.title || h.hazard || '',
    likelihood: h.likelihood ?? 0,
    severity: h.severity ?? 0,
    riskRating: pre,
    riskScore: pre,
    riskLevel: getRiskLevel(pre),
    controls: formatStructuredControls(controls),
    controlMeasures,
    residualRisk: residual,
    residualRiskText: residual
      ? `Residual ${residual} (L${h.residualLikelihood}×S${h.residualSeverity})`
      : '',
    regulation: [
      ...(h.bsReferences ?? []).map((r: string) => `BS 7671 Reg ${r}`),
      ...(h.safetyReferences ?? []),
    ].join(', '),
    // Rich fields for an updated template
    title: h.title ?? '',
    locationOfHazard: h.locationOfHazard ?? '',
    primaryRisk: h.primaryRisk ?? '',
    rationale: h.rationale ?? '',
    personsAtRisk: h.personsAtRisk ?? [],
    controlsList: controls.map((c: any, i: number) => ({
      order: c.order ?? i + 1,
      tier: c.tier ?? 'general',
      tierLabel: tierLabel(c.tier),
      control: c.control ?? '',
      detail: c.detail ?? '',
      responsibleRole: c.responsibleRole ?? '',
    })),
    residualLikelihood: h.residualLikelihood ?? 0,
    residualSeverity: h.residualSeverity ?? 0,
    residualRiskRating: residual,
    residualLevel: getRiskLevel(residual),
    ppeRequired: h.ppeRequired ?? [],
    competencyRequired: h.competencyRequired ?? [],
    bsReferences: (h.bsReferences ?? []).map((r: string) => `BS 7671 Reg ${r}`),
    safetyReferences: h.safetyReferences ?? [],
    allReferences: [
      ...(h.bsReferences ?? []).map((r: string) => `BS 7671 Reg ${r}`),
      ...(h.safetyReferences ?? []),
    ],
    trainingRequired: h.trainingRequired ?? [],
    monitoringChecks: h.monitoringChecks ?? [],
    evidenceRequired: h.evidenceRequired ?? [],
    stopWorkTriggers: h.stopWorkTriggers ?? [],
  };
}

function tierLabel(tier: string | undefined): string {
  switch (tier) {
    case 'eliminate': return 'Eliminate';
    case 'substitute': return 'Substitute';
    case 'engineer': return 'Engineering control';
    case 'admin': return 'Administrative control';
    case 'ppe': return 'PPE';
    default: return 'Control';
  }
}

/**
 * Render a structured controls array into a single multiline string for
 * the existing PDFMonkey template (which expects a flat `controls`
 * field). New templates can use `controlsList` instead for richer
 * formatting.
 */
function formatStructuredControls(controls: any[]): string {
  if (!Array.isArray(controls) || controls.length === 0) return '';
  return controls
    .map((c, i) => {
      const order = c.order ?? i + 1;
      const tier = tierLabel(c.tier).toUpperCase();
      const action = c.control ?? '';
      const detail = c.detail ?? '';
      const role = c.responsibleRole ? ` [Responsible: ${c.responsibleRole}]` : '';
      return `${order}. ${tier} — ${action}${role}\n${detail}`;
    })
    .join('\n\n');
}

/** Legacy shape kept verbatim for any callers still using it. */
function buildLegacyPayload(d: any): any {
  return {
    projectName: d.projectName,
    location: d.location,
    date: d.date,
    assessor: d.assessor,
    contractor: d.contractor,
    supervisor: d.supervisor,
    risks: [...(d.risks ?? [])]
      .sort((a: any, b: any) => (b.riskRating || 0) - (a.riskRating || 0))
      .map((risk: any, index: number) => ({
        hazardNumber: index + 1,
        hazard: risk.hazard,
        likelihood: risk.likelihood,
        severity: risk.severity,
        riskRating: risk.riskRating,
        riskLevel: getRiskLevel(risk.riskRating),
        controls: formatControls(risk.controls),
        residualRisk: risk.residualRisk,
      })),
    emergencyContacts: {
      siteManager: d.siteManagerName,
      siteManagerPhone: d.siteManagerPhone,
      firstAider: d.firstAiderName,
      firstAiderPhone: d.firstAiderPhone,
      safetyOfficer: d.safetyOfficerName,
      safetyOfficerPhone: d.safetyOfficerPhone,
      assemblyPoint: d.assemblyPoint,
    },
  };
}

function formatControls(controls: string): string {
  if (!controls) return '';

  // Section headers that should have line breaks before them
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

  // Add line breaks before section headers (simple approach)
  sections.forEach((section) => {
    // Replace the section header with newlines + header
    formatted = formatted.replace(new RegExp(section, 'gi'), `\n\n${section}`);
  });

  // Clean up multiple consecutive line breaks (more than 2)
  formatted = formatted.replace(/\n{3,}/g, '\n\n');

  // Trim leading/trailing whitespace
  return formatted.trim();
}

function applyFieldMapping(data: any, fieldMapping: Record<string, string>): any {
  if (!fieldMapping || Object.keys(fieldMapping).length === 0) {
    return data;
  }

  const mapped: any = {};

  for (const [templateField, dataPath] of Object.entries(fieldMapping)) {
    const value = getNestedValue(data, dataPath);
    setNestedValue(mapped, templateField, value);
  }

  return mapped;
}

function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

function setNestedValue(obj: any, path: string, value: any): void {
  const keys = path.split('.');
  const lastKey = keys.pop()!;
  const target = keys.reduce((current, key) => {
    if (!current[key]) current[key] = {};
    return current[key];
  }, obj);
  target[lastKey] = value;
}
