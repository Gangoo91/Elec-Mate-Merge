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

/**
 * Types with their own `<type>/:id` route, mapped to where a BLANK one starts.
 *
 * Two shapes exist in InspectionRoutes and they are not interchangeable:
 *
 *   `<type>/new` + `<type>/:id`   — the form pages. Blank starts at /new.
 *   `<type>`     + `<type>/:id`   — the notice pages. Blank starts at the bare
 *                                   path; they have no /new route, so /new
 *                                   would match `:id` and send the page off to
 *                                   load a report literally called "new".
 *
 * Keep this keyed to the routes actually declared. A type missing from here is
 * a type that cannot be reopened — see the header note on why that matters.
 */
const PATH_ROUTED = new Map<string, 'new' | 'bare'>([
  ['bess', 'new'],
  ['board-schedule', 'bare'],
  ['completion-notice', 'bare'],
  ['danger-notice', 'bare'],
  ['disconnection', 'new'],
  ['emergency-lighting', 'new'],
  ['ev-charging', 'new'],
  ['fire-alarm', 'new'],
  ['fire-alarm-commissioning', 'new'],
  ['fire-alarm-design', 'new'],
  ['fire-alarm-inspection', 'new'],
  ['fire-alarm-log-books', 'bare'],
  ['fire-alarm-modification', 'new'],
  ['g98-commissioning', 'new'],
  ['g99-commissioning', 'new'],
  ['heat-pump', 'new'],
  ['isolation-certificate', 'bare'],
  ['lightning-protection', 'new'],
  ['limitation-notice', 'bare'],
  ['non-compliance-notice', 'bare'],
  ['pat-testing', 'new'],
  ['permit-to-work', 'bare'],
  ['plug-in-solar', 'new'],
  ['pre-purchase-survey', 'bare'],
  ['routine-inspection', 'bare'],
  ['safe-isolation', 'bare'],
  ['smoke-co-alarm', 'new'],
  ['solar-pv', 'new'],
  ['testing-only', 'new'],
  ['visual-condition', 'bare'],
]);

/**
 * `reports.report_type` values whose route segment is spelled differently.
 *
 * Not cosmetic. `reportTypeFromId` in reportCloud derives the type from the
 * report_id prefix, and for the isolation certificate that prefix yields
 * `isolation-cert` while the route declared in InspectionRoutes is
 * `isolation-certificate`. A row typed `isolation-cert` therefore matched no
 * route at all and fell through to the EICR form with everything else.
 */
const TYPE_ALIASES = new Map<string, string>([
  ['isolation-cert', 'isolation-certificate'],
  ['fire-alarm-log-book', 'fire-alarm-log-books'],
]);

const BASE = '/electrician/inspection-testing';

/** How a report type opens. `unknown` means: do not guess, do not open a form. */
export type CertificateRoute =
  { kind: 'section'; section: string } | { kind: 'path'; type: string } | { kind: 'unknown' };

/**
 * THE routing decision for a report type, for every caller.
 *
 * This exists because the decision used to be duplicated as an if/else chain in
 * InspectionIndex.handleEditReport, and that copy listed only 8 of the 29
 * path-routed types. Everything it did not list fell through its final `else`
 * into `setCurrentSection('eicr')` — so opening a saved Smoke & CO alarm
 * certificate, BESS, G98/G99, lightning protection, plug-in solar, heat pump,
 * solar PV or any of the notices rendered the EICR form instead, pointed at the
 * other certificate's row. The EICR form then merged its own blank field set
 * into that row on autosave. A user reported it as "whenever I open up that
 * certificate it opens an EICR instead of the smoke cert".
 *
 * Adding branches one type at a time is what produced the bug — the chain had
 * already been patched three times, each time for a single type, each time with
 * a comment saying the previous omission had lost someone's data. Callers must
 * use this instead of re-deriving it.
 */
export function certificateRoute(reportType: string): CertificateRoute {
  const raw = (reportType || '').toLowerCase();
  const type = TYPE_ALIASES.get(raw) ?? raw;
  if (SECTION_ROUTED.has(type)) return { kind: 'section', section: type };
  if (PATH_ROUTED.has(type)) return { kind: 'path', type };
  return { kind: 'unknown' };
}

/**
 * @param reportType  `reports.report_type`
 * @param reportId    `reports.report_id` — the STRING, not the row uuid
 */
export function certificateHref(reportType: string, reportId: string): string {
  const route = certificateRoute(reportType);
  if (route.kind === 'section') {
    return `${BASE}?section=${route.section}&reportId=${encodeURIComponent(reportId)}`;
  }
  if (route.kind === 'path') {
    return `${BASE}/${route.type}/${encodeURIComponent(reportId)}`;
  }
  return `${BASE}?section=my-reports`;
}

/** Where a BLANK certificate of this type starts. */
export function certificateNewHref(reportType: string): string {
  const route = certificateRoute(reportType);
  if (route.kind === 'section') return `${BASE}?section=${route.section}`;
  if (route.kind === 'path') {
    return PATH_ROUTED.get(route.type) === 'new'
      ? `${BASE}/${route.type}/new`
      : `${BASE}/${route.type}`;
  }
  return `${BASE}?section=certificates`;
}

/**
 * Human label for a report type — "Smoke & CO alarm", "EICR".
 *
 * The title-cased fallback below is fine for `ev-charging` and wrong for
 * everything with an initialism or an ampersand in its name: it rendered
 * "Smoke co alarm", "G98 commissioning" as "G98 commissioning", and
 * `isolation-cert` — the value actually stored on the row — as "Isolation
 * cert". Named types come first; the fallback stays for anything new, so a type
 * added to the router without a label here still reads sensibly.
 */
const TYPE_LABELS: Record<string, string> = {
  eicr: 'EICR',
  eic: 'EIC',
  'minor-works': 'Minor works',
  'smoke-co-alarm': 'Smoke & CO alarm',
  'ev-charging': 'EV charging',
  'solar-pv': 'Solar PV',
  'plug-in-solar': 'Plug-in solar',
  bess: 'Battery storage',
  'pat-testing': 'PAT testing',
  'g98-commissioning': 'G98 commissioning',
  'g99-commissioning': 'G99 commissioning',
  'fire-alarm': 'Fire alarm',
  'fire-alarm-design': 'Fire alarm design',
  'fire-alarm-commissioning': 'Fire alarm commissioning',
  'fire-alarm-inspection': 'Fire alarm inspection',
  'fire-alarm-modification': 'Fire alarm modification',
  'fire-alarm-log-books': 'Fire alarm log book',
  'isolation-cert': 'Isolation certificate',
  'isolation-certificate': 'Isolation certificate',
  'testing-only': 'Testing only',
  'visual-condition': 'Visual condition report',
  'routine-inspection': 'Routine inspection',
  'pre-purchase-survey': 'Pre-purchase survey',
  'board-schedule': 'Board schedule',
};

export function certificateTypeLabel(reportType: string): string {
  const type = (reportType || '').toLowerCase();
  const named = TYPE_LABELS[type];
  if (named) return named;
  return type
    .split('-')
    .map((w, i) => (i === 0 ? w.charAt(0).toUpperCase() + w.slice(1) : w))
    .join(' ');
}
