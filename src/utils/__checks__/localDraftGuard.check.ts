/**
 * Local-draft guard — a newer local draft must never hide cloud test results.
 *
 * Why this exists: on 28 Sep 2026 a subscriber reported EIC test results that
 * had "disappeared" on his iPad but were still there on his phone. The cloud
 * rows were complete. The one load path that can produce a device-specific
 * blank is "local draft newer than cloud wins", which only rescued
 * observations, never the schedule of tests. These are the shapes that matter.
 *
 *   npm run check:local-draft-guard
 */
import {
  localDraftHidesCloudResults,
  countRowsWithReadings,
  mergeLocalOntoCloud,
} from '@/utils/localDraftGuard';

let failures = 0;
const check = (name: string, ok: boolean, detail = '') => {
  console.log(`${ok ? '  PASS' : '  FAIL'}  ${name}${detail ? '  — ' + detail : ''}`);
  if (!ok) failures += 1;
};

const row = (o: Record<string, string>) => ({ id: Math.random().toString(36).slice(2), ...o });
const cloud = {
  scheduleOfTests: [
    row({ circuitDescription: 'Kitchen socket', zs: '0.47', rcdOneX: '9.6' }),
    row({ circuitDescription: 'House ring', zs: '0.72', r1r2: '0.28' }),
    row({ circuitDescription: 'Spare', zs: 'N/A', r1r2: 'N/A' }),
  ],
};

check(
  'counts rows with a real reading (N/A is not a reading)',
  countRowsWithReadings(cloud.scheduleOfTests) === 2
);

// 1. Blank local snapshot (a half-hydrated emergency save) — must lose.
check(
  'blank local draft newer than cloud → cloud wins',
  localDraftHidesCloudResults({ scheduleOfTests: [] }, cloud).hides === true
);
check(
  'local draft with no schedule key at all → cloud wins',
  localDraftHidesCloudResults({ clientName: 'x' }, cloud).hides === true
);

// 2. Same rows but readings wiped — must lose.
const wiped = {
  scheduleOfTests: cloud.scheduleOfTests.map((r) => ({ ...r, zs: '', r1r2: '', rcdOneX: '' })),
};
check(
  'same rows, readings gone → cloud wins',
  localDraftHidesCloudResults(wiped, cloud).hides === true
);

// 3. Genuinely newer local work — must win.
const more = {
  scheduleOfTests: [...cloud.scheduleOfTests, row({ circuitDescription: 'Cooker', zs: '0.31' })],
};
check(
  'local draft with an extra tested circuit → local wins',
  localDraftHidesCloudResults(more, cloud).hides === false
);
const edited = {
  scheduleOfTests: cloud.scheduleOfTests.map((r, i) => (i === 0 ? { ...r, zs: '0.49' } : r)),
};
check(
  'local draft with an edited reading → local wins',
  localDraftHidesCloudResults(edited, cloud).hides === false
);
check(
  'identical local and cloud → local wins (nothing to lose)',
  localDraftHidesCloudResults(cloud, cloud).hides === false
);

// 4. Nothing in the cloud to protect.
check(
  'cloud has no rows → local wins',
  localDraftHidesCloudResults({ scheduleOfTests: [] }, { scheduleOfTests: [] }).hides === false
);
check('null inputs → no verdict', localDraftHidesCloudResults(null, cloud).hides === false);

// 5. The EV charging family keeps its results under `testResults`.
const ev = { testResults: [row({ zs: '0.4' }), row({ zs: '0.5' })] };
check(
  'testResults array is protected too',
  localDraftHidesCloudResults({ testResults: [ev.testResults[0]] }, ev).hides === true
);

// 6. Merge: local wins where it has a value, cloud fills every blank, rows by id.
{
  const cloudRows = [
    { id: 'a', circuitDescription: 'Kitchen', zs: '0.47', r1r2: '' },
    { id: 'b', circuitDescription: 'Lights', zs: '0.90', r1r2: '0.30' },
  ];
  const localRows = [
    { id: 'a', circuitDescription: 'Kitchen', zs: '', r1r2: '0.21' }, // blank Zs (stale), new R1+R2
    { id: 'c', circuitDescription: 'Cooker', zs: '0.31', r1r2: '' }, // local-only row
  ];
  const merged = mergeLocalOntoCloud(
    { scheduleOfTests: localRows, clientName: '', _clientCertId: 'LOCAL' },
    { scheduleOfTests: cloudRows, clientName: 'Alan Barker', _clientCertId: 'CLOUD' }
  );
  const rows = merged.scheduleOfTests as Array<Record<string, string>>;
  const byId = Object.fromEntries(rows.map((r) => [r.id, r]));
  check('merge keeps cloud Zs where local is blank', byId.a.zs === '0.47');
  check('merge takes local R1+R2 where cloud is blank', byId.a.r1r2 === '0.21');
  check('merge keeps a cloud-only row', !!byId.b && byId.b.r1r2 === '0.30');
  check('merge keeps a local-only row', !!byId.c && byId.c.zs === '0.31');
  check('merge never drops a row', rows.length === 3);
  check('blank local scalar does not erase cloud value', merged.clientName === 'Alan Barker');
  check('internal keys stay as the cloud has them', merged._clientCertId === 'CLOUD');
}

// 7. Row order follows the cloud (the persisted order); plain-value arrays never duplicate.
{
  const merged = mergeLocalOntoCloud(
    {
      scheduleOfTests: [
        { id: 'b', zs: '1' },
        { id: 'a', zs: '2' },
        { id: 'z', zs: '9' },
      ],
      mainBondingLocations: ['water', 'gas'],
      completedSections: [],
    },
    {
      scheduleOfTests: [
        { id: 'a', zs: '' },
        { id: 'b', zs: '' },
        { id: 'c', zs: '3' },
      ],
      mainBondingLocations: ['water', 'gas'],
      completedSections: ['details', 'inspect'],
    }
  );
  const rows = merged.scheduleOfTests as Array<{ id: string; zs: string }>;
  check(
    'merge keeps the cloud row order, local-only rows last',
    rows.map((r) => r.id).join(',') === 'a,b,c,z'
  );
  check('merge fills readings into cloud-ordered rows', rows[0].zs === '2' && rows[1].zs === '1');
  check(
    'plain-value arrays are not duplicated',
    JSON.stringify(merged.mainBondingLocations) === JSON.stringify(['water', 'gas'])
  );
  check(
    'an empty local plain-value array yields the cloud list',
    JSON.stringify(merged.completedSections) === JSON.stringify(['details', 'inspect'])
  );
}

if (failures > 0) {
  console.error(`\n${failures} local-draft guard check(s) failed`);
  process.exit(1);
}
console.log('\nlocal-draft guard: all checks passed');
