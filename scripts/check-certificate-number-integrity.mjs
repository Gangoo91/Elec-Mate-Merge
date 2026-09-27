#!/usr/bin/env node
/**
 * A certificate number must never be copied from one certificate to another,
 * and a collision must never be "resolved" by merging two certificates.
 *
 * ELE-1592. 36 groups of certificates shared a number within one account —
 * 11 of them different jobs at different addresses, on issued legal
 * documents. Two code paths produced that:
 *
 *   1. Draft recovery. The "new certificate" draft outlives the save of the
 *      certificate it belonged to; recovering it into the NEXT new certificate
 *      carried the saved number across. Minor Works even documented the wrong
 *      rule ("the draft's original number is canonical"). Every recovery must
 *      discard the recovered number and let the mount-time generator supply one.
 *
 *   2. createReport's 23505 branch found the existing certificate BY NUMBER
 *      and updated it with the new certificate's data — which, once the unique
 *      index exists, overwrites a customer's issued certificate with another
 *      property's results. A collision must be answered with a fresh number.
 */
import { readFileSync, readdirSync } from 'fs';
import { execSync } from 'child_process';

const problems = [];
const read = (p) => readFileSync(p, 'utf8');

// ── 1. draft recovery never keeps the recovered number ──
for (const [file, marker] of [
  ['src/components/MinorWorksForm.tsx', "loadDraft('minor-works', null)"],
  ['src/components/eicr/EICRFormProvider.tsx', "loadDraft('eicr', null)"],
  ['src/components/eic/EICFormProvider.tsx', "loadDraft('eic', null)"],
]) {
  const src = read(file);
  const at = src.indexOf(marker);
  if (at < 0) {
    problems.push(
      `${file}: cannot find the new-draft recovery (${marker}) — check the recovery still discards the draft's certificate number`
    );
    continue;
  }
  const window = src.slice(at, at + 2500);
  const keepsDraftNumber =
    /certificateNumber:\s*draft\.data\.certificateNumber/.test(window) ||
    /certificateNumber:\s*prev\.certificateNumber\s*\|\|\s*draft\.data\.certificateNumber/.test(
      window
    );
  const discards =
    /certificateNumber:\s*prev\.certificateNumber\s*,/.test(window) &&
    (/const \{ certificateNumber: _\w+, \.\.\.draft\w*/.test(window) ||
      /delete draftWithoutNumber\.certificateNumber/.test(window));
  if (keepsDraftNumber || !discards)
    problems.push(
      `${file}: new-draft recovery must strip the recovered certificateNumber and keep prev.certificateNumber — a recovered number is how one certificate's number was copied onto the next`
    );
}

// ── 2. createReport answers a number collision with a fresh number, never a merge ──
const rc = read('src/utils/reportCloud.ts');
const create = rc.slice(rc.indexOf('createReport: async'), rc.indexOf('updateReport: async'));
if (create.includes('findReportByCertificateNumber'))
  problems.push(
    "reportCloud.createReport adopts an existing row by certificate number again — on a collision that overwrites the earlier certificate with the new one's data"
  );
if (
  !/uniq_reports_user_cert_active[\s\S]{0,600}generateCertificateNumber\(reportType\)/.test(create)
)
  problems.push(
    'reportCloud.createReport no longer renumbers on a uniq_reports_user_cert_active violation'
  );

// ── 3. the number a row was created with is handed back and adopted, so the form never allocates a second one ──
if (!/return \{ success: true, reportId: newReport\.report_id, certificateNumber \}/.test(create))
  problems.push(
    'reportCloud.createReport no longer returns the certificateNumber it created the row with — the form will allocate a second number (column N, printed N+1)'
  );
const sync = read('src/hooks/useReportSync.ts');
if (!/onReportCreated\(savedReportId, createdCertificateNumber\)/.test(sync))
  problems.push(
    'useReportSync no longer forwards the created certificate number to onReportCreated'
  );
for (const file of [
  'src/components/eicr/EICRFormProvider.tsx',
  'src/components/eic/EICFormProvider.tsx',
  'src/components/MinorWorksForm.tsx',
]) {
  const src = read(file);
  const at = src.indexOf('const handleReportCreated');
  const body = src.slice(at, at + 900);
  if (
    !/certificateNumber\?: string\)/.test(body) ||
    !/certNumberGenerated\.current = true/.test(body) ||
    !/prev\.certificateNumber \? prev : \{ \.\.\.prev, certificateNumber \}/.test(body)
  )
    problems.push(
      `${file}: handleReportCreated must adopt the created certificate number and set certNumberGenerated — otherwise the mount-time allocator mints a second one`
    );
}

// ── 4. no certificate is ever printed under an invented number ──
// Every specialist PDF/email path used to fall back to `PREFIX-${Date.now()}`
// when the form had no number — 88 issued certificates went out that way.
// `referenceNumber` is matched only as a PDF-path fallback (`|| Date.now`): the
// seven notice/isolation pages still seed their form DEFAULT from Date.now —
// tracked as a follow-up on ELE-1592, not a printed-number invention per se.
const invented = execSync(
  "grep -rn 'certificateNumber.*Date\\.now()\\|certificate_number.*Date\\.now()\\|referenceNumber.*||.*Date\\.now()' src || true",
  { encoding: 'utf8' }
).trim();
if (invented) problems.push('a certificate number is still built from Date.now():\n' + invented);

// ── 5. every specialist form keeps the number its row was created with ──
for (const f of readdirSync('src/pages/inspection').filter((f) => f.endsWith('.tsx'))) {
  const src = read(`src/pages/inspection/${f}`);
  const at = src.indexOf('onReportCreated: (');
  if (at < 0) continue;
  const body = src.slice(at, at + 700);
  if (
    !/onReportCreated: \(newId: string, certificateNumber\?: string\)/.test(body) ||
    !/if \(certificateNumber\)\s*set\w+\(\s*\(prev\) =>\s*\(?\s*prev\.certificateNumber \? prev : \{ \.\.\.prev, certificateNumber \}\s*\)?\s*\)/.test(
      body
    )
  )
    problems.push(
      `src/pages/inspection/${f}: onReportCreated must adopt the created certificate number — otherwise the form stays blank and the PDF prints an invented one`
    );
}

// ── 6. a loaded form carries the number its row is filed under ──
if ((rc.match(/withFiledCertificateNumber\(/g) || []).length < 3)
  problems.push(
    'reportCloud: getReportData, getReportDataWithId and getReportByReportId must all pass data through withFiledCertificateNumber'
  );
if (!/certificateNumber: result\.certificateNumber \}/.test(sync))
  problems.push(
    'useReportSync.syncNowImmediate no longer hands the created certificate number back in its data'
  );

// ── 7. the notice / isolation pages print the filed number as their reference ──
// They used to seed `DN-…` / `ISO-…` from Date.now() at form open, so the paper reference
// never matched the number the app listed the certificate under.
for (const f of [
  'DangerNoticePage',
  'CompletionNoticePage',
  'LimitationNoticePage',
  'NonComplianceNoticePage',
  'IsolationCertificatePage',
  'SafeIsolationPage',
  'DisconnectionCertificate',
]) {
  const src = read(`src/pages/inspection/${f}.tsx`);
  if (
    !/update\('referenceNumber', referenceNumber\)/.test(src) ||
    !/result\.certificateNumber/.test(src)
  )
    problems.push(
      `src/pages/inspection/${f}.tsx: the first save must adopt the created certificate number as the reference`
    );
  if (/referenceNumber: `[A-Z]+-\$\{Date/.test(src))
    problems.push(`src/pages/inspection/${f}.tsx: seeds a random reference at form open again`);
}

if (problems.length) {
  console.error('✗ certificate number integrity:\n' + problems.map((p) => `  - ${p}`).join('\n'));
  process.exit(1);
}
console.log(
  '✓ certificate number integrity: recoveries discard the recovered number; createReport renumbers on collision, never merges by number, and hands the created number back for the form to adopt'
);
