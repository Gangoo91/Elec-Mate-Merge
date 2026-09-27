#!/usr/bin/env node
/**
 * Every saved certificate must reopen in the form that owns it.
 *
 * A user reported this as "whenever I open up that certificate it opens an EICR
 * instead of the smoke cert". The cause was a hand-maintained if/else chain in
 * InspectionIndex that listed 8 of the 29 path-routed types and sent everything
 * else to `setCurrentSection('eicr')` — so a Smoke & CO alarm certificate opened
 * the EICR form pointed at its own row, and autosave merged the EICR's blank
 * field set into someone's finished work. The chain had already been patched
 * three separate times, once per type, each time after the same thing happened.
 *
 * This guards the two ways it can come back:
 *
 *   1. A `<type>/:id` route exists that `certificate-href.ts` does not know
 *      about — that type falls through to the EICR form again.
 *   2. `certificate-href.ts` claims a route that the router does not declare,
 *      or points a blank certificate at `/new` where no /new route exists
 *      (the notices have `<type>` + `<type>/:id` only, so `/new` would match
 *      `:id` and send the page off to load a report called "new").
 *
 * It also fails if anything reintroduces a type-to-form if/else chain in
 * InspectionIndex rather than using certificateRoute().
 */
import { readFileSync } from 'fs';
import { execSync } from 'child_process';

const ROUTES = 'src/routes/InspectionRoutes.tsx';
const HREF = 'src/utils/certificate-href.ts';
const INDEX = 'src/pages/inspection/InspectionIndex.tsx';

const problems = [];

const routes = readFileSync(ROUTES, 'utf8');
const declared = new Map();
for (const m of routes.matchAll(/path="([a-z0-9-]+)(\/new|\/:id)?"/g)) {
  const [, type, suffix] = m;
  const e = declared.get(type) ?? { bare: false, new: false, id: false };
  if (!suffix) e.bare = true;
  else if (suffix === '/new') e.new = true;
  else e.id = true;
  declared.set(type, e);
}

const href = readFileSync(HREF, 'utf8');
const table = [...href.matchAll(/\['([a-z0-9-]+)', '(new|bare)'\]/g)].map((m) => [m[1], m[2]]);

for (const [type, kind] of table) {
  const d = declared.get(type);
  if (!d) {
    problems.push(`${HREF} routes "${type}" but ${ROUTES} declares no such path`);
    continue;
  }
  if (!d.id) problems.push(`"${type}" has no <type>/:id route — a saved one cannot be reopened`);
  if (kind === 'new' && !d.new)
    problems.push(`"${type}" is marked 'new' but ${ROUTES} declares no <type>/new route`);
  if (kind === 'bare' && !d.bare && !d.new)
    problems.push(`"${type}" is marked 'bare' but ${ROUTES} declares no bare <type> route`);
}

for (const [type, d] of declared) {
  if (d.id && !table.some(([t]) => t === type))
    problems.push(
      `${ROUTES} declares "${type}/:id" but ${HREF} omits it — saved ones would open as an EICR`
    );
}

/*
 * Every write to an existing report must name the EDITOR doing the writing, so
 * `reportCloud`'s cross-type guard can refuse a form writing into another kind
 * of certificate's row. A call that omits it writes unchecked — which is how
 * the EICR form merged its blank field set into ten specialist certificates.
 */
const WRITE_CALL = /reportCloud\.(updateReport|updateReportWithVersionCheck)\(([\s\S]{0,400}?)\)\s*[;,)]/g;
const writeCallers = execSync(
  "grep -rl 'reportCloud.updateReport' src --include='*.ts' --include='*.tsx'",
  { encoding: 'utf8' }
)
  .split('\n')
  .filter(Boolean)
  .filter((f) => !f.endsWith('src/utils/reportCloud.ts'));

for (const file of writeCallers) {
  const body = readFileSync(file, 'utf8');
  for (const m of body.matchAll(WRITE_CALL)) {
    const args = m[2];
    const named = /reportType|REPORT_TYPE|'[a-z0-9-]+'\s*$/.test(args.trim());
    if (!named)
      problems.push(
        `${file}: reportCloud.${m[1]}(...) does not pass callerReportType — the cross-type write guard cannot run on it`
      );
  }
}

/*
 * No surface may build a certificate URL from a report_type itself.
 *
 * Six did, each with its own incomplete list: TeamCertificatesSection knew 5
 * types, the two QS review screens knew 2, CertificateExpiryPage knew 15,
 * ReportPdfViewer knew 9, CustomerOverviewTab knew 3. Every type a list did not
 * name opened the wrong thing — the dashboard, the reports index, or the EICR
 * form. Three of those lists carried a comment saying they had been verified
 * against the router; all three had drifted anyway.
 *
 * A LITERAL type in the URL is fine — that is a form writing its own address
 * (`/smoke-co-alarm/${newId}`). What is banned is interpolating the TYPE.
 */
const TYPE_IN_URL = [
  /inspection-testing\/\$\{/,      // `/inspection-testing/${type}/...`
  /inspection-testing\?section=\$\{/, // `?section=${type}`
  /section=\$\{[^}]*(type|section)/i, // `?section=${reportType}` mid-string
];
const urlBuilders = execSync(
  "grep -rl 'inspection-testing' src --include='*.ts' --include='*.tsx'",
  { encoding: 'utf8' }
)
  .split('\n')
  .filter(Boolean)
  .filter((f) => !f.endsWith('src/utils/certificate-href.ts'))
  /*
   * Unrouted mock-data screen — it is not referenced by any route or component,
   * and its "type" is a DISPLAY name ("Minor Works") run through
   * `.replace(' ', '-')`, which replaces only the first space. Fixing its URL
   * would dress up dead code as live. Delete the file or wire it up; either way
   * remove this line at the same time.
   */
  .filter((f) => !f.endsWith('src/pages/inspection/InspectionHome.tsx'));

for (const file of urlBuilders) {
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, i) => {
    if (!line.includes('inspection-testing') && !line.includes('section=$')) return;
    if (TYPE_IN_URL.some((re) => re.test(line)))
      problems.push(
        `${file}:${i + 1} builds a certificate URL from an interpolated type — use certificateHref() instead:\n      ${line.trim().slice(0, 110)}`
      );
  });
}

const index = readFileSync(INDEX, 'utf8');
if (!index.includes('certificateRoute('))
  problems.push(`${INDEX} no longer uses certificateRoute() — routing has been re-derived locally`);
if (/reportType === '[a-z-]+'/.test(index))
  problems.push(
    `${INDEX} compares reportType to a literal — that is the if/else chain this check exists to prevent. Add the type to ${HREF} instead.`
  );

if (problems.length) {
  console.error('✗ certificate routing:\n' + problems.map((p) => `  - ${p}`).join('\n'));
  process.exit(1);
}
console.log(`✓ certificate routing: all ${table.length} types resolve to the form that owns them`);
