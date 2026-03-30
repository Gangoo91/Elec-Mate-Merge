import {
  renderPage, sectionHeader, kvGrid, statBoxes, checklist, warningBanner,
  signatureBlock, paragraph, textBox, dataTable, type StatusColour, type Branding,
} from '../safety-html-base.ts';

const fmtDate = (d: string | null) =>
  d ? new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) : 'N/A';
const fmtDateTime = (d: string | null) =>
  d ? new Date(d).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'N/A';

const STATUS_MAP: Record<string, StatusColour> = {
  isolated: 'danger',
  re_energised: 'success',
  in_progress: 'warning',
  cancelled: 'grey',
};

const STATUS_LABELS: Record<string, string> = {
  isolated: 'ISOLATED',
  re_energised: 'RE-ENERGISED',
  in_progress: 'IN PROGRESS',
  cancelled: 'CANCELLED',
};

// deno-lint-ignore no-explicit-any
export function safeIsolationTemplate(record: any, branding: Branding): string {
  const statusKey = (record.status || 'in_progress').toLowerCase();
  const statusColour: StatusColour = STATUS_MAP[statusKey] || 'grey';
  // deno-lint-ignore no-explicit-any
  const steps: any[] = record.steps || [];
  const completedSteps = steps.filter((s) => s.completed).length;

  let body = '';

  // Warning banner for currently isolated circuits
  if (statusKey === 'isolated') {
    body += warningBanner('CIRCUIT CURRENTLY ISOLATED \u2014 Do not re-energise without authorisation. Lock-off devices must remain in place until work is complete and verified.');
  }

  // Status overview
  body += sectionHeader('Isolation Status');
  body += statBoxes([
    { label: 'Status', value: STATUS_LABELS[statusKey] || 'UNKNOWN', colour: statusColour },
    { label: 'Steps', value: `${completedSteps}/${steps.length}`, colour: completedSteps === steps.length ? 'success' : 'warning' },
    { label: 'Proving Unit', value: record.proving_unit_used ? 'YES' : 'NO', colour: record.proving_unit_used ? 'success' : 'warning' },
    { label: 'Lock-Off', value: record.lock_off_number || 'N/A', colour: record.lock_off_number ? 'success' : 'grey' },
  ]);

  // Circuit details
  body += sectionHeader('Circuit Identification');
  body += kvGrid([
    { label: 'Site Address', value: record.site_address || 'N/A' },
    { label: 'Circuit Description', value: record.circuit_description || 'N/A' },
    { label: 'Distribution Board', value: record.distribution_board || 'N/A' },
    { label: 'Isolation Device', value: record.isolation_device || 'N/A' },
  ]);

  // Test instrument details
  body += sectionHeader('Voltage Indicator / Test Instrument');
  body += kvGrid([
    { label: 'Instrument Serial No.', value: record.voltage_detector_serial || 'N/A' },
    { label: 'Calibration Date', value: fmtDate(record.voltage_detector_calibration_date) },
    { label: 'Proving Unit Used', value: record.proving_unit_used ? 'Yes' : 'No' },
    { label: 'GS38 Compliant', value: record.voltage_detector_serial ? 'Yes' : 'Not recorded' },
  ]);

  // Voltage readings (from step 6)
  // deno-lint-ignore no-explicit-any
  const proveDeadStep = steps.find((s: any) => s.stepNumber === 6 || s.title?.includes('Prove Dead'));
  if (proveDeadStep?.voltageReadings) {
    const vr = proveDeadStep.voltageReadings;
    body += sectionHeader('Voltage Readings \u2014 Prove Dead Test');
    body += dataTable(
      ['Measurement', 'Reading', 'Threshold', 'Result'],
      [
        ['Line \u2013 Neutral (L-N)', `${vr.ln ?? 'N/A'}V`, '<50V', vr.ln != null && vr.ln < 50 ? 'DEAD' : 'LIVE'],
        ['Line \u2013 Earth (L-E)', `${vr.le ?? 'N/A'}V`, '<50V', vr.le != null && vr.le < 50 ? 'DEAD' : 'LIVE'],
        ['Neutral \u2013 Earth (N-E)', `${vr.ne ?? 'N/A'}V`, '<50V', vr.ne != null && vr.ne < 50 ? 'DEAD' : 'LIVE'],
      ]
    );
    const allDead = vr.ln != null && vr.ln < 50 && vr.le != null && vr.le < 50 && vr.ne != null && vr.ne < 50;
    if (!allDead) {
      body += warningBanner('ONE OR MORE READINGS EXCEED 50V \u2014 Circuit is NOT confirmed dead. Do not proceed with work.');
    }
  }

  // GS38 8-step procedure
  body += sectionHeader('GS38 Safe Isolation Procedure');
  if (steps.length > 0) {
    body += checklist(steps.map((s) => ({
      label: `Step ${s.stepNumber}: ${s.title || 'Step'}${s.description ? ` \u2014 ${s.description}` : ''}`,
      passed: s.completed === true,
      notes: s.completedAt ? `Completed: ${fmtDateTime(s.completedAt)}${s.notes ? ` | ${s.notes}` : ''}` : s.notes || undefined,
    })));
  } else {
    body += paragraph('No isolation steps recorded.', true);
  }

  // Re-energisation details
  if (statusKey === 're_energised') {
    body += sectionHeader('Re-Energisation');
    body += kvGrid([
      { label: 'Re-energised By', value: record.re_energisation_by || 'N/A' },
      { label: 'Date / Time', value: fmtDateTime(record.re_energisation_at) },
    ]);
    body += textBox('Circuit has been re-energised. All lock-off devices removed, covers replaced, and circuit confirmed live.', '#22c55e');
  }

  // Approval
  if (record.requires_approval && record.approval_status !== 'not_required') {
    body += sectionHeader('Supervisor Approval');
    body += kvGrid([
      { label: 'Approval Status', value: (record.approval_status || 'N/A').toUpperCase() },
      { label: 'Approved By', value: record.approved_by || 'N/A' },
      { label: 'Date', value: fmtDateTime(record.approved_at) },
      { label: 'Comments', value: record.approval_comments || 'None' },
    ]);
  }

  // Signatures
  body += sectionHeader('Declaration & Signatures');
  body += paragraph('I confirm that the safe isolation procedure has been carried out in accordance with BS 7671:2018+A2:2022, the Electricity at Work Regulations 1989 (Regulations 12-14), and HSE Guidance Note GS38 (4th Edition). The circuit was proven dead before work commenced.');
  // deno-lint-ignore no-explicit-any
  const sigParties: any[] = [
    { role: 'Isolated By', name: record.isolator_name || undefined, date: fmtDateTime(record.isolation_completed_at || record.created_at), signatureDataUrl: record.isolator_signature || undefined },
    { role: 'Verified Dead By', name: record.verifier_name || undefined, date: fmtDateTime(record.isolation_completed_at || record.created_at), signatureDataUrl: record.verifier_signature || undefined },
  ];
  if (record.approval_signature) {
    sigParties.push({ role: 'Approved By', name: record.approved_by || undefined, date: fmtDateTime(record.approved_at), signatureDataUrl: record.approval_signature });
  }
  body += signatureBlock(sigParties);

  // Regulation reference
  body += sectionHeader('Applicable Regulations');
  body += paragraph('BS 7671:2018+A2:2022 \u2014 Requirements for Electrical Installations (IET Wiring Regulations), Regulation 14: Switching off for mechanical maintenance. Chapter 46: Isolation and switching.');
  body += paragraph('Electricity at Work Regulations 1989 \u2014 Regulation 12: Means of cutting off supply and isolation. Regulation 13: Precautions for work on dead equipment. Regulation 14: Work on or near live conductors.');
  body += paragraph('HSE GS38 (4th Edition) \u2014 Electrical test equipment for use on low voltage electrical installations. Requirements for test probes, leads, and instruments.');

  // Timeline
  body += sectionHeader('Audit Trail');
  const timelineRows: string[][] = [];
  timelineRows.push(['Record Created', fmtDateTime(record.created_at)]);
  if (record.isolation_completed_at) timelineRows.push(['Isolation Completed', fmtDateTime(record.isolation_completed_at)]);
  if (record.approved_at) timelineRows.push([`${record.approval_status === 'approved' ? 'Approved' : 'Rejected'} by ${record.approved_by || 'Supervisor'}`, fmtDateTime(record.approved_at)]);
  if (record.re_energisation_at) timelineRows.push([`Re-energised by ${record.re_energisation_by || 'N/A'}`, fmtDateTime(record.re_energisation_at)]);
  body += dataTable(['Event', 'Date / Time'], timelineRows);

  return renderPage({
    title: 'Safe Isolation Certificate',
    refId: record.id,
    statusLabel: STATUS_LABELS[statusKey] || 'IN PROGRESS',
    statusColour,
    branding,
    bodyHtml: body,
    footerNote: 'This safe isolation record must be retained as evidence of compliance with the Electricity at Work Regulations 1989 and BS 7671. Records should be kept for a minimum of 5 years.',
  });
}
