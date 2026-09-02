import { MCB_RCBO_ZS_LIMITS } from './zsLimits';

/**
 * The Inspection & Testing hub's spine — ELE I&T hub redesign.
 *
 * BS 7671 Reg 643 sets the order tests are carried out in, and that order is
 * the only structure an electrician already has in their head: dead tests
 * first, then live. So it is the structure the hub teaches in, rather than an
 * invented set of "modules".
 *
 * One list feeds both surfaces. The Learn path walks it in order and records
 * progress against it; the On-site reference exposes the same steps as things
 * to look up. Splitting them into two lists is how the two drift apart.
 */

export type TestPhase = 'dead' | 'live';

export interface LearningStep {
  /** Stable key — used as `module` in learning_progress, so never rename. */
  key: string;
  /** Position in the BS 7671 643 sequence. */
  order: number;
  phase: TestPhase;
  title: string;
  /** Short label for the on-site sequence strip — no truncation guesswork. */
  short: string;
  /** What the test proves, in one line an apprentice would say out loud. */
  purpose: string;
  /** The instrument setting or range, for the on-site card. */
  instrument: string;
  /** What a sound result actually looks like. */
  expect: string;
  /**
   * The mistake that actually gets made. This is the part worth reading twice —
   * most of these produce a *passing* reading, which is why they survive to the
   * certificate.
   */
  watchOut: string;
}

export const SAFE_ISOLATION_KEY = 'safe-isolation';

/**
 * Safe isolation is not one of the eight tests — it is the thing you do before
 * any of them, and the only step here that can kill someone if skipped. It
 * leads the path for that reason rather than sitting inside the dead-test set.
 */
export const SAFE_ISOLATION: LearningStep = {
  key: SAFE_ISOLATION_KEY,
  order: 0,
  phase: 'dead',
  title: 'Safe isolation',
  short: 'Isolate',
  purpose: 'Prove dead before touching anything — GS38 procedure, every time',
  instrument: 'Approved voltage indicator + proving unit',
  expect:
    'Prove the indicator on a known source, prove the circuit dead on all combinations, then prove the indicator again. Locked off, key retained, warning notice fitted.',
  watchOut:
    'Using a multimeter or a non-contact pen instead of an approved voltage indicator to GS38 — neither proves dead, and a multimeter on the wrong range reads zero on a live conductor.',
};

export const TEST_SEQUENCE: LearningStep[] = [
  {
    key: 'continuity-cpc',
    order: 1,
    phase: 'dead',
    title: 'Continuity of protective conductors',
    short: 'Continuity',
    purpose: 'Proves every exposed-conductive-part is connected back to earth',
    // GN3's recommended characteristics, met by a BS EN IEC 61557-4 instrument.
    instrument: 'Low-resistance ohmmeter — 4–24 V no-load, ≥200 mA, resolution 0.01 Ω',
    expect:
      'Every point reads consistently with the cable length and csa, with the test leads nulled first.',
    watchOut:
      'Not nulling the leads, or reading through a parallel path — bonding, steelwork or a second cpc gives a falsely low value that hides a broken conductor.',
  },
  {
    key: 'continuity-ring',
    order: 2,
    phase: 'dead',
    title: 'Ring final circuit continuity',
    short: 'Ring',
    purpose: 'Proves the ring is a ring — no interconnections, no broken leg',
    instrument: 'Low-resistance ohmmeter — 4–24 V no-load, ≥200 mA, resolution 0.01 Ω',
    expect:
      'r1 and rn within a few percent of each other, and every socket reading close to (r1+rn)/4. With 2.5mm² line and 1.5mm² cpc, r2 is about 1.67x r1.',
    watchOut:
      'An interconnection between legs still reads healthy at the board — it only shows up as an uneven set of readings at the sockets, which is why every socket gets measured.',
  },
  {
    key: 'insulation-resistance',
    order: 3,
    phase: 'dead',
    title: 'Insulation resistance',
    short: 'Insulation',
    purpose: 'Proves the insulation between conductors, and to earth, is intact',
    instrument: '500 V DC (250 V for SELV/PELV)',
    expect:
      'Far above the 1 MΩ minimum — a sound circuit usually reads in the hundreds of megohms. A value near the limit is a fault developing, not a pass.',
    watchOut:
      'Leaving electronics, dimmers, SPDs or LED drivers connected. They drag the reading down and 500 V DC can destroy them — disconnect, or test line and neutral together against earth.',
  },
  {
    key: 'polarity',
    order: 4,
    phase: 'dead',
    title: 'Polarity',
    short: 'Polarity',
    purpose: 'Proves line and neutral are the right way round, and switching is in the line',
    instrument: 'Low-resistance ohmmeter',
    expect:
      'Every switch, fuse and circuit-breaker in the line conductor, and the centre contact of Edison screw lampholders on line.',
    watchOut:
      'Proving polarity at the board only. A crossed pair further down the circuit passes that test and still leaves a switched neutral.',
  },
  {
    key: 'earth-fault-loop-impedance',
    order: 5,
    phase: 'live',
    title: 'Earth fault loop impedance',
    short: 'Zs',
    purpose: 'Proves enough fault current will flow to operate the device in time',
    instrument: 'Loop tester — Ze at origin, Zs at each circuit',
    expect:
      'Measured Zs at or below the maximum for that device, and roughly equal to Ze plus the circuit R1+R2 — if it is not, one of the three is wrong.',
    watchOut:
      'Comparing a warm-conductor reading against the table figure without the temperature allowance, or recording Zs while never establishing Ze at the origin.',
  },
  {
    key: 'prospective-fault-current',
    order: 6,
    phase: 'live',
    title: 'Prospective fault current',
    short: 'PFC',
    purpose: 'Proves the devices can safely break the largest fault current available',
    instrument: 'PFC/PSCC range — highest of PSCC and PEFC',
    expect:
      'The higher of prospective short-circuit and prospective earth-fault current, recorded, and below the breaking capacity marked on the protective devices.',
    watchOut:
      'Measuring line-to-neutral only and recording that. If the earth-fault figure is higher it is the one that matters, and the one that decides whether the devices are adequate.',
  },
  {
    key: 'rcd-operation',
    order: 7,
    phase: 'live',
    title: 'RCD operation',
    short: 'RCD',
    purpose: 'Proves the RCD trips fast enough to protect against electric shock',
    instrument: 'RCD tester — 1× and 5× IΔn, both polarities',
    expect:
      'No trip at half rated current, and within 300 ms at rated current — the BS 7671 criterion since Amendment 4 deleted Table 3A. The 40 ms at five times rated current is the BS EN 61008/61009 product-standard figure, still useful for fault finding. Tested on both polarities.',
    watchOut:
      'Testing one polarity only, or accepting the integral test button as evidence — it proves the mechanism moves, not that it trips fast enough.',
  },
  {
    key: 'functional-testing',
    order: 8,
    phase: 'live',
    title: 'Functional testing',
    short: 'Functional',
    purpose: 'Proves the installation actually works as intended once energised',
    instrument: 'Operate it — switches, interlocks, controls, RCD test button',
    expect:
      'Switchgear, controls, interlocks and every RCD test button operated and seen to work as intended.',
    watchOut:
      'Treating it as a formality at the end of a long day. It is the only step that checks the installation does what the client actually asked for.',
  },
];

/** Safe isolation first, then the eight tests in Reg 643 order. */
export const LEARNING_PATH: LearningStep[] = [SAFE_ISOLATION, ...TEST_SEQUENCE];

export interface ReferenceRow {
  label: string;
  value: string;
}

export interface ReferenceTable {
  key: string;
  title: string;
  /** Where the numbers come from — shown so nobody has to take them on trust. */
  source: string;
  rows: ReferenceRow[];
  /** Extra terms someone might search for that aren't in the title or rows. */
  keywords: string[];
}

/** Type B max Zs, read from the canonical table rather than re-typed. */
const typeB = MCB_RCBO_ZS_LIMITS.typeB['0.4s'];
const zsRow = (rating: 6 | 16 | 32 | 40 | 63): ReferenceRow => ({
  label: `${rating}A Type B`,
  value: `${typeB[rating].toFixed(2)}Ω`,
});

/**
 * The on-site tables.
 *
 * Zs values are pulled from `@/data/zsLimits` so this reference cannot drift
 * away from what the certificate validates against — the two disagreeing is
 * exactly how an electrician ends up trusting the wrong number on site.
 */
export const REFERENCE_TABLES: ReferenceTable[] = [
  {
    key: 'zs-max',
    title: 'Max Zs — Type B',
    source: 'BS 7671 Table 41.3 · Cmin 0.95 applied',
    rows: [zsRow(6), zsRow(16), zsRow(32), zsRow(40), zsRow(63)],
    keywords: ['earth fault loop impedance', 'zs', 'ze', 'mcb', 'rcbo', 'loop'],
  },
  {
    key: 'zs-site',
    title: 'Max Zs — cold measured',
    source: 'GN3 0.80 factor applied to Table 41.3',
    rows: ([6, 16, 32, 40, 63] as const).map((r) => ({
      label: `${r}A Type B`,
      value: `${(typeB[r] * 0.8).toFixed(2)}Ω`,
    })),
    keywords: ['80%', 'rule of thumb', 'ambient', 'cold', 'gn3', 'zs'],
  },
  {
    key: 'rcd',
    title: 'RCD trip times',
    source: 'BS 7671 Reg 643.10',
    rows: [
      { label: '½× IΔn', value: 'Must not trip' },
      { label: '1× IΔn (general)', value: '≤ 300 ms' },
      { label: '1× IΔn (Type S)', value: '130–500 ms' },
      { label: '5× IΔn', value: 'Not required — deleted at A4:2026' },
    ],
    keywords: ['rcd', 'rcbo', 'residual', 'trip', 'ramp', '30ma'],
  },
  {
    key: 'insulation',
    title: 'Insulation resistance',
    source: 'BS 7671 Table 64',
    rows: [
      { label: 'SELV / PELV', value: '250 V DC · ≥ 0.5 MΩ' },
      { label: 'Up to 500 V', value: '500 V DC · ≥ 1.0 MΩ' },
      { label: 'Above 500 V', value: '1000 V DC · ≥ 1.0 MΩ' },
    ],
    keywords: ['ir', 'insulation', 'megger', 'megohm', 'test voltage'],
  },
  {
    // Scope is Reg 411.3.2.2: final circuits up to 63 A WITH socket-outlets,
    // and final circuits up to 32 A supplying only fixed equipment. A bare
    // "final ≤ 63 A" label is wrong for a fixed-equipment circuit.
    //
    // The TT final-circuit row is deliberately absent. The hub previously
    // printed "TT (230V) 0.2s"; that figure could not be sourced — every 0.2 s
    // entry for Table 41.1 in our BS 7671 data belongs to DC systems, not
    // 230 V AC. Rather than reprint a number this reference cannot stand
    // behind, it is left out until it is read off Table 41.1 directly.
    key: 'disconnection',
    title: 'Disconnection times',
    source: 'BS 7671 Table 41.1 · Reg 411.3.2.2 · 230 V AC',
    rows: [
      { label: 'TN — socket ≤ 63 A', value: '0.4 s' },
      { label: 'TN — fixed ≤ 32 A', value: '0.4 s' },
      { label: 'TN — distribution', value: '5 s' },
      { label: 'TT — distribution', value: '5 s' },
    ],
    keywords: ['disconnection', 'ads', 'tn-s', 'tn-c-s', 'tt', '0.4', '5s'],
  },
];
