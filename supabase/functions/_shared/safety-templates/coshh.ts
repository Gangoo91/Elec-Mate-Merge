/**
 * COSHH Assessment HTML template
 * COSHH Regulations 2002, EH40 Workplace Exposure Limits
 */
import {
  renderPage, sectionHeader, kvGrid, statBoxes, textBox, badges,
  bulletList, signatureBlock, paragraph, warningBanner, type StatusColour, type Branding,
} from '../safety-html-base.ts';

const fmtDate = (d: string | null) =>
  d ? new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) : 'N/A';

const RISK_MAP: Record<string, StatusColour> = {
  low: 'success', medium: 'warning', high: 'danger', 'very-high': 'danger', 'very high': 'danger',
};

// deno-lint-ignore no-explicit-any
export function coshhTemplate(record: any, branding: Branding): string {
  const riskRating = (record.risk_rating || '').toLowerCase();
  const statusColour: StatusColour = RISK_MAP[riskRating] || 'warning';
  const ghsHazards: string[] = record.ghs_hazards || [];
  const exposureRoutes: string[] = record.exposure_routes || [];
  const controlMeasures: string[] = record.control_measures || [];
  const ppeRequired: string[] = record.ppe_required || [];

  let body = '';

  // High risk warning
  if (riskRating === 'high' || riskRating === 'very-high' || riskRating === 'very high') {
    body += warningBanner('HIGH RISK SUBSTANCE \u2014 Enhanced control measures and health surveillance may be required under COSHH Reg. 11.');
  }

  // Risk overview
  body += sectionHeader('Assessment Overview');
  body += statBoxes([
    { label: 'Risk Rating', value: (record.risk_rating || 'N/A').toUpperCase(), colour: statusColour },
    { label: 'GHS Hazards', value: ghsHazards.length, colour: ghsHazards.length > 0 ? 'danger' : 'grey' },
    { label: 'Controls', value: controlMeasures.length, colour: controlMeasures.length > 0 ? 'success' : 'warning' },
    { label: 'PPE Items', value: ppeRequired.length, colour: ppeRequired.length > 0 ? 'info' : 'grey' },
  ]);

  // Substance details
  body += sectionHeader('Substance Identification');
  body += kvGrid([
    { label: 'Substance / Product Name', value: record.substance_name || 'N/A' },
    { label: 'Manufacturer / Supplier', value: record.manufacturer || 'N/A' },
    { label: 'Risk Rating', value: record.risk_rating || 'N/A' },
    { label: 'Assessed By', value: record.assessed_by || 'N/A' },
    { label: 'Assessment Date', value: fmtDate(record.assessment_date) },
    { label: 'Review Date', value: fmtDate(record.review_date) },
  ]);

  // GHS hazard classification
  body += sectionHeader('GHS Hazard Classification');
  if (ghsHazards.length > 0) {
    body += badges(ghsHazards, '#ef4444');
  } else {
    body += paragraph('No GHS hazards specified. Refer to Safety Data Sheet (SDS) Section 2.', true);
  }

  // Health effects
  body += sectionHeader('Health Effects');
  body += textBox(record.health_effects || 'Not specified \u2014 Refer to SDS Section 11 (Toxicological Information)', '#ef4444');

  // Exposure routes
  body += sectionHeader('Routes of Exposure');
  if (exposureRoutes.length > 0) {
    body += bulletList(exposureRoutes);
  } else {
    body += paragraph('Not specified.', true);
  }

  // Control measures (hierarchy of control)
  body += sectionHeader('Control Measures (Hierarchy of Control)');
  if (controlMeasures.length > 0) {
    body += bulletList(controlMeasures);
  } else {
    body += paragraph('No control measures specified.', true);
  }

  // PPE
  body += sectionHeader('Personal Protective Equipment Required');
  if (ppeRequired.length > 0) {
    body += badges(ppeRequired, '#3b82f6');
  } else {
    body += paragraph('None specified.', true);
  }

  // Storage, spill, first aid, disposal
  body += sectionHeader('Storage Requirements');
  body += textBox(record.storage_requirements || 'Refer to SDS Section 7');

  body += sectionHeader('Spill / Leak Procedure');
  body += textBox(record.spill_procedure || 'Refer to SDS Section 6', '#f59e0b');

  body += sectionHeader('First Aid Measures');
  body += textBox(record.first_aid || 'Refer to SDS Section 4', '#3b82f6');

  body += sectionHeader('Disposal Method');
  body += paragraph(record.disposal_method || 'Dispose in accordance with local regulations. Refer to SDS Section 13.');

  // Regulations
  body += sectionHeader('Applicable Regulations');
  body += paragraph('COSHH Regulations 2002 (as amended) \u2014 Regulation 6: Assessment of health risks. Regulation 7: Prevention or control of exposure. Regulation 8: Use of control measures. Regulation 9: Maintenance of control measures. Regulation 10: Monitoring exposure. Regulation 11: Health surveillance.');
  body += paragraph('EH40/2005 (4th Edition) \u2014 Workplace Exposure Limits for use with COSHH Regulations.');

  // Declaration & signatures
  body += sectionHeader('Declaration & Signatures');
  body += paragraph('I confirm this COSHH assessment has been carried out in accordance with the COSHH Regulations 2002. All persons who may be exposed to this substance have been informed of the hazards and control measures. This assessment will be reviewed at the date specified or when there is a significant change in work processes.');
  body += signatureBlock([
    { role: 'Assessor', name: record.assessed_by || undefined, date: fmtDate(record.assessment_date), signatureDataUrl: record.assessor_signature || undefined },
    { role: 'Reviewer', name: record.reviewer_name || undefined, date: fmtDate(record.review_date), signatureDataUrl: record.reviewer_signature || undefined },
  ]);

  return renderPage({
    title: 'COSHH Assessment',
    refId: record.id,
    statusLabel: record.risk_rating || 'Unknown',
    statusColour,
    branding,
    bodyHtml: body,
    footerNote: 'COSHH Regulations 2002 \u2014 This assessment must be reviewed regularly, when substances/processes change, or following an incident. Assessments must be retained for 40 years where health surveillance is required.',
  });
}
