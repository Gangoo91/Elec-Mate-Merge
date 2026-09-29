/**
 * Part P verdict — the certificate decides whether the tracker opens a row.
 *
 * Why this exists: until 29 Sep 2026 a tracker row was opened for EVERY issued
 * EIC / EV / solar certificate, and 49 electricians were chased with OVERDUE
 * emails for work their own certificate said was not notifiable. The rule now
 * lives in `certificateSaysNotifiable` and, identically, in the SQL function
 * `part_p_certificate_verdict`. Every case below was run through the SQL
 * function on 29 Sep 2026 with the same answer.
 *
 *   npm run check:part-p-verdict
 */
import {
  certificateSaysNotifiable,
  certificateSaysNotified,
  completionDateOf,
  calculateSubmissionDeadline,
  buildPortalDetails,
  isOverdueNotification,
  needsAnswerNotification,
  postcodeOf,
} from '@/utils/notificationHelper';

let failures = 0;
const check = (name: string, ok: boolean, detail = '') => {
  console.log(`${ok ? '  PASS' : '  FAIL'}  ${name}${detail ? '  — ' + detail : ''}`);
  if (!ok) failures += 1;
};
const verdict = (type: string, data: Record<string, unknown>, expect: string) => {
  const got = certificateSaysNotifiable(type, data);
  check(`${type} ${JSON.stringify(data)} → ${expect}`, got === expect, got !== expect ? `got ${got}` : '');
};

// ── Same table as the SQL run ────────────────────────────────────────────
verdict('eic', { partPCompliance: 'compliant' }, 'yes');
verdict('eic', { partPCompliance: 'notApplicable' }, 'no');
verdict('eic', { partPCompliance: 'nonNotifiable' }, 'no');
verdict('eic', { buildingRegsAnswered: true, buildingRegsRequired: false, partPCompliance: 'compliant' }, 'no');
verdict('ev-charging', { buildingRegsRequired: false, buildingRegsViaScheme: false, buildingRegsSubmitted: false }, 'unknown');
verdict('ev-charging', { buildingRegsRequired: true }, 'yes');
verdict('minor-works', { partPNotification: true }, 'yes');
verdict('minor-works', { partPNotification: 'true' }, 'yes');
verdict('minor-works', { partPNotification: false }, 'no');
verdict('minor-works', {}, 'no');
verdict('eic', { installationType: 'Commercial', partPCompliance: 'compliant' }, 'no');
verdict('solar-pv', { propertyType: 'industrial', buildingRegsRequired: true }, 'no');
verdict('eicr', {}, 'no');
verdict('solar-pv', {}, 'unknown');
verdict('eic', {}, 'unknown');
verdict('eic', { buildingRegsViaScheme: true }, 'no'); // a route without "required" is answered, not required
verdict('ev-charging', { buildingRegsAnswered: 'true', buildingRegsRequired: 'true' }, 'yes');

// ── Notified ─────────────────────────────────────────────────────────────
check('blank reference is not "notified"', certificateSaysNotified({ buildingRegsReference: '  ' }) === false);
check('direct submission is notified', certificateSaysNotified({ buildingRegsSubmitted: true }) === true);
check('scheme route is notified', certificateSaysNotified({ buildingRegsViaScheme: 'true' }) === true);
check('a reference alone counts', certificateSaysNotified({ buildingRegsReference: 'NAPIT/1' }) === true);
check('no buildingRegs keys at all → not notified (SQL returned NULL here once)', certificateSaysNotified({}) === false);

// ── Deadline ─────────────────────────────────────────────────────────────
check('MW workDate drives the deadline', calculateSubmissionDeadline(completionDateOf({ workDate: '2026-08-01' })) === '2026-08-31');
check('EIC installationDate drives the deadline', calculateSubmissionDeadline(completionDateOf({ installationDate: '2026-01-31' })) === '2026-03-02');
check('garbage date falls back to today', Math.abs(completionDateOf({ workDate: 'not a date' }).getTime() - Date.now()) < 5000);

// ── Overdue never applies to an unanswered row ───────────────────────────
const past = '2000-01-01';
check(
  'unanswered row is never overdue',
  isOverdueNotification({ notification_status: 'pending', submission_deadline: past, reports: { report_type: 'eic', data: {} } }) === false
);
check(
  'unanswered row needs an answer',
  needsAnswerNotification({ notification_status: 'pending', submission_deadline: past, reports: { report_type: 'eic', data: {} } }) === true
);
check(
  'answered row past deadline is overdue',
  isOverdueNotification({ notification_status: 'pending', submission_deadline: past, reports: { report_type: 'eic', data: { partPCompliance: 'compliant' } } }) === true
);
check(
  'closed row is never overdue',
  isOverdueNotification({ notification_status: 'not_required', submission_deadline: past, reports: { report_type: 'eic', data: { partPCompliance: 'compliant' } } }) === false
);

// ── Portal block ─────────────────────────────────────────────────────────
check('postcode extracted from an address', postcodeOf('33 Gable Rd, Whitehaven CA28 8HE') === 'CA28 8HE');
check('no postcode → null', postcodeOf('Somewhere') === null);
const block = buildPortalDetails({
  work_type: 'addition',
  submission_deadline: '2026-08-31',
  reports: {
    certificate_number: 'MW-2026-1212',
    client_name: 'A Client',
    installation_address: 'CA28 8HE',
    report_type: 'minor-works',
    data: { workDate: '2026-08-01' },
  },
});
check('portal block starts with the client', block.startsWith('Client: A Client'));
check('portal block capitalises the work', block.includes('Work: Addition'));
check('postcode-only address is not repeated', (block.match(/CA28 8HE/g) || []).length === 1);
check('portal block carries the deadline', /Notify by: 31 Aug 2026/.test(block));

console.log(failures === 0 ? '\nPart P verdict guard: all checks passed' : `\nPart P verdict guard: ${failures} FAILED`);
process.exit(failures === 0 ? 0 : 1);
