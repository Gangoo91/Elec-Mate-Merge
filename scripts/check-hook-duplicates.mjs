#!/usr/bin/env node
/**
 * No hook may exist in both `src/hooks/` and `src/hooks/inspection/`.
 *
 * ELE-1601. Twenty-eight did. Sixteen of those had quietly forked — the same
 * name, two different implementations, and no way to tell from an import line
 * which one you were getting. `useInspectionPhotos` was 108 lines apart.
 * That is the failure mode that cost real user data in the certificate
 * routing this week: logic copied into several places, each drifting on its
 * own, each carrying a comment saying it had been checked.
 *
 * The one deliberate exception is allowlisted below WITH its reason, and the
 * reason is enforced: the two `useCustomers` hooks must keep the header note
 * that explains why they are not the same thing.
 */
import { readdirSync, existsSync, readFileSync } from 'fs';

const ROOT = 'src/hooks';
const INSP = 'src/hooks/inspection';

/** basename → why two copies are allowed to exist. */
const ALLOWED = new Map([
  [
    'useCustomers.ts',
    'the plain hook returns every customer unpaged (+ createOrFindCustomer); the inspection one is the paginated CRM hook — different contracts, see the note on each',
  ],
]);

const problems = [];
const dupes = readdirSync(INSP).filter((f) => existsSync(`${ROOT}/${f}`));

for (const f of dupes) {
  if (!ALLOWED.has(f)) {
    problems.push(
      `${f} exists in both ${ROOT}/ and ${INSP}/ — work out which is imported, delete the other, never merge them blind`
    );
    continue;
  }
  for (const p of [`${ROOT}/${f}`, `${INSP}/${f}`]) {
    if (!readFileSync(p, 'utf8').includes('TWO HOOKS SHARE THIS NAME'))
      problems.push(`${p} is allowlisted but has lost the header note explaining why two copies exist`);
  }
}

/*
 * The same ticket (ELE-1601) named one more copy outside the hooks tree:
 * `components/certificates/certificates/` was a nested duplicate of its parent.
 * Deleted 27 Sep 2026; keep it from coming back.
 */
if (existsSync('src/components/certificates/certificates'))
  problems.push('src/components/certificates/certificates/ exists again — it was a nested duplicate of its parent directory');

if (problems.length) {
  console.error('✗ hook duplicates:\n' + problems.map((p) => `  - ${p}`).join('\n'));
  process.exit(1);
}
console.log(
  `✓ hook duplicates: none across ${ROOT}/ and ${INSP}/ beyond the ${ALLOWED.size} allowlisted (${[...ALLOWED.keys()].join(', ')})`
);
