/**
 * Where a saved certificate opens.
 *
 * There are two live conventions and one trap, and every surface that links to
 * a cert has to get all three right:
 *
 *   1. eicr / eic / minor-works are SECTIONS of the Inspection & Testing page,
 *      reached by query param — they have no route of their own.
 *   2. Every specialist type is a real path route, `<type>/:id`.
 *   3. Both are keyed on the `report_id` STRING (e.g. "EICR-1768458523355-z12hlb"),
 *      never the `reports.id` uuid. `reportCloud.getReportDataWithId` filters
 *      `.eq('report_id', …)`, so passing the uuid loads nothing and the editor
 *      silently opens a blank certificate.
 *
 * This logic previously existed only inside TeamCertificatesSection, where it
 * carried a comment saying it had been verified against the router. The list
 * there covered pat-testing and testing-only and sent all other specialist
 * types to the index, so a half-finished EV charging cert could not be opened
 * from a link. PATH_ROUTED below is the full set, taken from the `<type>/:id`
 * routes actually declared in InspectionRoutes.
 *
 * Unknown types fall back to the reports list rather than guessing a URL —
 * a wrong path renders the router's not-found, which is worse than landing on
 * a list containing the thing you wanted.
 */

/** Types reached by `?section=` on the Inspection & Testing page. */
const SECTION_ROUTED = new Set(['eicr', 'eic', 'minor-works']);

/** Types with their own `<type>/:id` route (from InspectionRoutes). */
const PATH_ROUTED = new Set([
  'bess',
  'board-schedule',
  'completion-notice',
  'danger-notice',
  'disconnection',
  'emergency-lighting',
  'ev-charging',
  'fire-alarm',
  'fire-alarm-commissioning',
  'fire-alarm-design',
  'fire-alarm-inspection',
  'fire-alarm-log-books',
  'fire-alarm-modification',
  'g98-commissioning',
  'g99-commissioning',
  'heat-pump',
  'isolation-certificate',
  'lightning-protection',
  'limitation-notice',
  'non-compliance-notice',
  'pat-testing',
  'permit-to-work',
  'plug-in-solar',
  'pre-purchase-survey',
  'routine-inspection',
  'safe-isolation',
  'smoke-co-alarm',
  'solar-pv',
  'testing-only',
  'visual-condition',
]);

const BASE = '/electrician/inspection-testing';

/**
 * @param reportType  `reports.report_type`
 * @param reportId    `reports.report_id` — the STRING, not the row uuid
 */
export function certificateHref(reportType: string, reportId: string): string {
  const type = (reportType || '').toLowerCase();
  if (SECTION_ROUTED.has(type)) {
    return `${BASE}?section=${type}&reportId=${encodeURIComponent(reportId)}`;
  }
  if (PATH_ROUTED.has(type)) {
    return `${BASE}/${type}/${encodeURIComponent(reportId)}`;
  }
  return `${BASE}?section=my-reports`;
}

/** Human label for a report type — "EV charging", "EICR". */
export function certificateTypeLabel(reportType: string): string {
  const type = (reportType || '').toLowerCase();
  if (type === 'eicr') return 'EICR';
  if (type === 'eic') return 'EIC';
  return type
    .split('-')
    .map((w, i) => (i === 0 ? w.charAt(0).toUpperCase() + w.slice(1) : w))
    .join(' ');
}
