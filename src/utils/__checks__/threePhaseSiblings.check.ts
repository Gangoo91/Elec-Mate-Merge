/**
 * Three-pole circuits and the ways they also occupy — ELE-1770.
 *
 * Why this exists: the 1P/3P toggle stored its value and nothing downstream
 * read it, so Mark Glowacki hand-keyed every three-phase circuit on an EIC.
 * The fix carries the DEVICE across the two sibling ways and deliberately
 * carries no READING, and the second half is the part that would be quietly
 * catastrophic to get wrong — a copied insulation reading is a measurement
 * nobody took, printed on a signed certificate.
 *
 * The cases below are the ones that decide whether that holds.
 */
import { planThreePhaseSiblings, MEASURED_FIELDS } from '@/utils/threePhaseSiblings';
import type { TestResult } from '@/types/testResult';

const plan = (rows: TestResult[], i: number) => planThreePhaseSiblings(rows, i);
/** Just the links a plan produced. */
const linksOf = (rows: TestResult[], i: number) => plan(rows, i).links;

let failures = 0;
const check = (name: string, ok: boolean, detail = '') => {
  console.log(`${ok ? '  PASS' : '  FAIL'}  ${name}${detail ? '  — ' + detail : ''}`);
  if (!ok) failures += 1;
};

const blank = (id: string, over: Partial<TestResult> = {}): TestResult =>
  ({
    id,
    circuitNumber: id,
    circuitDescription: '',
    referenceMethod: '',
    pointsServed: '',
    circuitType: '',
    liveSize: '',
    cpcSize: '',
    bsStandard: '',
    protectiveDeviceType: '',
    protectiveDeviceRating: '',
    protectiveDeviceKaRating: '',
    maxZs: '',
    protectiveDeviceLocation: '',
    r1r2: '',
    r2: '',
    ringContinuityLive: '',
    ringContinuityNeutral: '',
    rcdRating: '',
    ringR1: '',
    ringRn: '',
    ringR2: '',
    insulationTestVoltage: '',
    insulationLiveNeutral: '',
    insulationLiveEarth: '',
    insulationResistance: '',
    insulationNeutralEarth: '',
    polarity: '',
    zs: '',
    rcdOneX: '',
    rcdTestButton: '',
    afddTest: '',
    pfc: '',
    pfcLiveNeutral: '',
    pfcLiveEarth: '',
    functionalTesting: '',
    notes: '',
    circuitDesignation: '',
    type: '',
    cableSize: '',
    protectiveDevice: '',
    ...over,
  }) as TestResult;

/** Mark's board: way 10 is a 3P EV charger, 11 and 12 are empty. */
const evCharger = blank('10', {
  circuitDescription: 'EV charger',
  phaseType: '3P',
  phaseAssignment: 'L1,L2,L3',
  bsStandard: 'BS EN 61009',
  protectiveDeviceType: 'RCBO',
  protectiveDeviceCurve: 'C',
  protectiveDeviceRating: '32',
  protectiveDeviceKaRating: '6',
  maxZs: '1.37',
  rcdBsStandard: 'BS EN 61009',
  rcdType: 'B',
  rcdRating: '30mA',
  liveSize: '6',
  cpcSize: '2.5',
  typeOfWiring: 'C',
  referenceMethod: 'C',
  insulationTestVoltage: '500',
  // Readings taken on L1 only
  r1r2: '0.42',
  insulationLiveNeutral: '>299',
  insulationLiveEarth: '>299',
  zs: '0.38',
  rcdOneX: '24',
});

console.log('\n1. Mark’s case — way 10 set to 3P, ways 11 and 12 empty');
{
  const rows = [blank('9'), evCharger, blank('11'), blank('12'), blank('13')];
  const links = linksOf(rows, 1);

  check('both following ways are claimed', links.length === 2);
  check('they are labelled L2 and L3', links.map((l) => l.line).join(',') === 'L2,L3');
  check(
    'the device carries across',
    links.every(
      (l) =>
        l.updates.bsStandard === 'BS EN 61009' &&
        l.updates.protectiveDeviceRating === '32' &&
        l.updates.protectiveDeviceKaRating === '6'
    )
  );
  check(
    'the RCD spec carries across',
    links.every((l) => l.updates.rcdType === 'B' && l.updates.rcdRating === '30mA')
  );
  check(
    'the cable carries across',
    links.every((l) => l.updates.liveSize === '6' && l.updates.cpcSize === '2.5')
  );
  check(
    'each sibling is marked 3P on its own line',
    links[0].updates.phaseAssignment === 'L2' &&
      links[1].updates.phaseAssignment === 'L3' &&
      links.every((l) => l.updates.phaseType === '3P')
  );
  check(
    'the description names the line',
    links[0].updates.circuitDescription === 'EV charger (L2)' &&
      links[1].updates.circuitDescription === 'EV charger (L3)'
  );

  // The one that matters.
  const leaked = links.flatMap((l) =>
    MEASURED_FIELDS.filter((f) => f in l.updates).map((f) => `${l.line}.${String(f)}`)
  );
  check(
    'NO measured reading is ever copied',
    leaked.length === 0,
    leaked.length ? `leaked: ${leaked.join(', ')}` : 'R1+R2, IR, Zs, RCD time all withheld'
  );
  check(
    'the test VOLTAGE does carry (a setting, not a reading)',
    links.every((l) => l.updates.insulationTestVoltage === '500')
  );
}

console.log('\n2. The next way holds somebody else’s circuit — do nothing');
{
  const rows = [evCharger, blank('11', { circuitDescription: 'Kitchen sockets' }), blank('12')];
  check('no siblings claimed', linksOf(rows, 0).length === 0);
}

console.log('\n3. The next way carries a reading but no description — still not ours');
{
  const rows = [evCharger, blank('11', { zs: '0.91' }), blank('12')];
  check('no siblings claimed', linksOf(rows, 0).length === 0);
}

console.log('\n4. A spare way IS claimable — and stops being a spare properly');
{
  // How the board scanner actually leaves a spare: N/A in every test field,
  // including the test voltage (EICRForm.tsx:227, :263).
  const scannedSpare = blank('11', {
    circuitDescription: 'Spare',
    isSpare: true,
    insulationTestVoltage: 'N/A',
    insulationLiveNeutral: 'N/A',
    insulationLiveEarth: 'N/A',
    polarity: 'N/A',
    zs: 'N/A',
    r1r2: 'N/A',
    functionalTesting: 'N/A',
  });
  const rows = [evCharger, scannedSpare, blank('12', { isSpare: true })];
  const links = linksOf(rows, 0);

  check('both claimed', links.length === 2);

  const l2 = links[0].updates;
  check('it is no longer flagged spare', l2.isSpare === false);
  check(
    'the description stops saying "Spare"',
    l2.circuitDescription === 'EV charger (L2)',
    String(l2.circuitDescription)
  );
  check(
    'the N/A test voltage is replaced by the real 500 V',
    l2.insulationTestVoltage === '500',
    String(l2.insulationTestVoltage)
  );
  check(
    'every N/A reading is cleared, not left asserting "not applicable"',
    ['insulationLiveNeutral', 'insulationLiveEarth', 'polarity', 'zs', 'r1r2', 'functionalTesting']
      .every((f) => (l2 as Record<string, unknown>)[f] === '')
  );
  check(
    'and they are cleared to blank, never to a copied reading',
    !MEASURED_FIELDS.some((f) => {
      const v = (l2 as Record<string, unknown>)[f as string];
      return typeof v === 'string' && v.trim().length > 0;
    })
  );
}

console.log('\n5. Only one way left below — do nothing rather than half-link');
{
  const rows = [evCharger, blank('11')];
  check('no siblings claimed', linksOf(rows, 0).length === 0);
}

console.log('\n6. A sibling already filled in by hand is never overwritten');
{
  const rows = [evCharger, blank('11', { protectiveDeviceRating: '40' }), blank('12')];
  const links = linksOf(rows, 0);
  check('the hand-typed rating survives', links[0].updates.protectiveDeviceRating === undefined);
  check('blank fields on that row still fill', links[0].updates.bsStandard === 'BS EN 61009');
}

console.log('\n7. A device row (incoming RCD, SPD) is not a way we can claim');
{
  const rows = [evCharger, blank('11', { isDeviceRow: true }), blank('12')];
  check('no siblings claimed', linksOf(rows, 0).length === 0);
}

console.log('\n8. A spare carrying a REAL reading is not absorbed');
{
  // 87 of 461 spare ways on completed EICRs carry an insulation reading
  // (spareWays.ts). Adopting one would inherit a measurement never taken for
  // this circuit — the exact thing this feature must not do.
  const rows = [
    evCharger,
    blank('11', { circuitDescription: 'Spare', isSpare: true, insulationLiveEarth: '>299' }),
    blank('12', { isSpare: true }),
  ];
  const p = plan(rows, 0);
  check('no siblings claimed', p.links.length === 0);
  check('and it says the ways are occupied', p.declined === 'occupied', String(p.declined));
}

console.log('\n9. The ways below belong to a different board');
{
  const source = { ...evCharger, boardId: 'db-1' };
  const rows = [source, blank('11', { boardId: 'db-2' }), blank('12', { boardId: 'db-2' })];
  const p = plan(rows, 0);
  check('no siblings claimed', p.links.length === 0);
  check('and it says so', p.declined === 'other-board', String(p.declined));
}

console.log('\n10. Declining always gives the UI a reason to show');
{
  const noRoom = plan([evCharger, blank('11')], 0);
  check('running out of ways reports no-room', noRoom.declined === 'no-room');
  const occupied = plan([evCharger, blank('11', { circuitDescription: 'Lights' }), blank('12')], 0);
  check('an occupied way reports occupied', occupied.declined === 'occupied');
  const ok = plan([evCharger, blank('11'), blank('12')], 0);
  check('a successful fill reports no reason', ok.declined === null && ok.links.length === 2);
}

console.log(
  failures === 0
    ? '\n✅ three-phase sibling fill: all checks passed\n'
    : `\n❌ three-phase sibling fill: ${failures} check(s) failed\n`
);
process.exitCode = failures === 0 ? 0 : 1;
