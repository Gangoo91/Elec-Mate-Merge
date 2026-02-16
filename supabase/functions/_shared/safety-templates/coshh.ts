/**
 * COSHH Assessment HTML template
 */
import {
  renderPage,
  sectionHeader,
  kvGrid,
  textBox,
  badges,
  bulletList,
  signatureBlock,
  paragraph,
  type StatusColour,
  type Branding,
} from '../safety-html-base.ts';

const fmtDate = (d: string | null) => (d ? new Date(d).toLocaleDateString('en-GB') : 'N/A');

const RISK_MAP: Record<string, StatusColour> = {
  low: 'success',
  medium: 'warning',
  high: 'danger',
  'very-high': 'danger',
  'very high': 'danger',
};

// deno-lint-ignore no-explicit-any
export function coshhTemplate(record: any, branding: Branding): string {
  const riskRating = (record.risk_rating || '').toLowerCase();
  const statusColour: StatusColour = RISK_MAP[riskRating] || 'warning';

  // ── Build body HTML ────────────────────────────────────────────────────
  let body = '';

  // Substance Details
  body += sectionHeader('Substance Details');
  body += kvGrid([
    { label: 'Substance Name', value: record.substance_name || 'N/A' },
    { label: 'Manufacturer', value: record.manufacturer || 'N/A' },
    { label: 'Risk Rating', value: record.risk_rating || 'N/A' },
    { label: 'Assessed By', value: record.assessed_by || 'N/A' },
    { label: 'Assessment Date', value: fmtDate(record.assessment_date) },
    { label: 'Review Date', value: fmtDate(record.review_date) },
  ]);

  // GHS Hazards
  const ghsHazards = (record.ghs_hazards as string[]) || [];
  body += sectionHeader('GHS Hazards');
  if (ghsHazards.length > 0) {
    body += badges(ghsHazards, '#ef4444');
  } else {
    body += paragraph('None specified.', true);
  }

  // Health Effects
  body += sectionHeader('Health Effects');
  body += textBox(record.health_effects || 'Not specified', '#ef4444');

  // Exposure Routes
  const exposureRoutes = (record.exposure_routes as string[]) || [];
  body += sectionHeader('Exposure Routes');
  if (exposureRoutes.length > 0) {
    body += bulletList(exposureRoutes);
  } else {
    body += paragraph('None specified.', true);
  }

  // Control Measures
  const controlMeasures = (record.control_measures as string[]) || [];
  body += sectionHeader('Control Measures');
  if (controlMeasures.length > 0) {
    body += bulletList(controlMeasures);
  } else {
    body += paragraph('None specified.', true);
  }

  // PPE Required
  const ppeRequired = (record.ppe_required as string[]) || [];
  body += sectionHeader('PPE Required');
  if (ppeRequired.length > 0) {
    body += badges(ppeRequired, '#3b82f6');
  } else {
    body += paragraph('None specified.', true);
  }

  // Storage Requirements
  body += sectionHeader('Storage Requirements');
  body += textBox(record.storage_requirements || 'Not specified');

  // Spill Procedure
  body += sectionHeader('Spill Procedure');
  body += textBox(record.spill_procedure || 'Not specified', '#f59e0b');

  // First Aid Measures
  body += sectionHeader('First Aid Measures');
  body += textBox(record.first_aid || 'Not specified', '#3b82f6');

  // Disposal Method
  body += sectionHeader('Disposal Method');
  body += paragraph(record.disposal_method || 'Not specified');

  // Signatures
  body += sectionHeader('Signatures');
  body += signatureBlock([
    {
      role: 'Assessor',
      name:
        record.assessed_by || record.assessor_signature
          ? record.assessed_by || 'Signed'
          : undefined,
      date: record.assessment_date ? fmtDate(record.assessment_date) : undefined,
      signatureDataUrl: record.assessor_signature || undefined,
    },
    {
      role: 'Reviewer',
      name:
        record.reviewer_name || record.reviewer_signature
          ? record.reviewer_name || 'Signed'
          : undefined,
      date: record.review_date ? fmtDate(record.review_date) : undefined,
      signatureDataUrl: record.reviewer_signature || undefined,
    },
  ]);

  // ── Wrap in page template ──────────────────────────────────────────────
  return renderPage({
    title: 'COSHH Assessment',
    refId: record.id,
    statusLabel: record.risk_rating || 'Unknown',
    statusColour,
    branding,
    bodyHtml: body,
    footerNote:
      'COSHH Regulations 2002 Compliance \u2014 This assessment must be reviewed regularly and updated when substances, processes, or controls change.',
  });
}
