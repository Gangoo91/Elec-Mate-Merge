export interface ReferenceCard {
  id: string;
  title: string;
  color: string;
  icon: string;
  content: ReferenceContent;
}

export type ReferenceContent =
  | { type: 'emergency-numbers'; numbers: { label: string; number: string }[] }
  | { type: 'steps'; steps: string[] }
  | { type: 'key-points'; points: string[]; source?: string }
  | { type: 'table'; rows: { label: string; value: string }[] }
  | { type: 'testing-priorities'; tests: { test: string; priority: 'High' | 'Medium' | 'Low'; reason: string }[] };

export const referenceCards: ReferenceCard[] = [
  {
    id: 'emergency-numbers',
    title: 'Emergency Numbers',
    color: 'red',
    icon: 'Phone',
    content: {
      type: 'emergency-numbers',
      numbers: [
        { label: 'Emergency Services', number: '999' },
        { label: 'HSE Incident Line', number: '0345 300 9923' },
        { label: 'Gas Emergency', number: '0800 111 999' },
        { label: 'Electricity DNO', number: '105' },
        { label: 'Poison Control', number: '0344 892 0111' },
      ],
    },
  },
  {
    id: 'safe-isolation',
    title: 'Safe Isolation Procedure',
    color: 'green',
    icon: 'Shield',
    content: {
      type: 'steps',
      steps: [
        'Identify the circuit to be isolated',
        'Switch off the supply at the correct isolator',
        'Isolate at the point of isolation (lock off)',
        'Secure the isolation with a lock and warning notice',
        'Prove the voltage indicator on a known live source',
        'Test for dead at the point of work (all conductors)',
        'Re-prove the voltage indicator on the known live source',
      ],
    },
  },
  {
    id: 'bs7671',
    title: 'BS 7671:2018+A2:2022 Key Points',
    color: 'yellow',
    icon: 'FileText',
    content: {
      type: 'key-points',
      source: 'IET Wiring Regulations 18th Edition',
      points: [
        'Section 411 — Protection against electric shock (automatic disconnection)',
        'Section 433 — Protection against overcurrent (cable sizing)',
        'Section 514 — Identification and notices (labelling requirements)',
        'Section 521 — Cable installation methods and routing',
        'Section 537 — Isolation and switching requirements',
        'Section 542 — Earthing arrangements and conductor sizing',
        'Chapter 61 — Initial verification (testing sequence)',
        'Chapter 62 — Periodic inspection and testing',
        'Appendix 6 — Model forms for certification',
      ],
    },
  },
  {
    id: 'eawr',
    title: 'Electricity at Work Regulations 1989',
    color: 'blue',
    icon: 'AlertTriangle',
    content: {
      type: 'key-points',
      source: 'HSE Statutory Instrument',
      points: [
        'Reg 4 — All systems to be constructed and maintained to prevent danger',
        'Reg 12 — Adequate means of isolation from every source of energy',
        'Reg 13 — Work on dead equipment only (unless justified)',
        'Reg 14 — Live working only when unreasonable to work dead',
        'Reg 16 — Only competent persons to work on electrical systems',
      ],
    },
  },
  {
    id: 'hasawa',
    title: 'Health and Safety at Work Act 1974',
    color: 'red',
    icon: 'Scale',
    content: {
      type: 'key-points',
      source: 'Primary legislation',
      points: [
        'Section 2 — Employer duty to ensure health, safety, and welfare of employees',
        'Section 3 — Employer duty to protect non-employees affected by work',
        'Section 7 — Employee duty to take reasonable care and cooperate',
        'Section 8 — Duty not to interfere with safety provisions',
        'Section 37 — Directors and managers can be personally liable',
      ],
    },
  },
  {
    id: 'cdm2015',
    title: 'CDM Regulations 2015',
    color: 'green',
    icon: 'HardHat',
    content: {
      type: 'key-points',
      source: 'Construction (Design and Management) Regulations',
      points: [
        'Applies to all construction work including electrical installation',
        'Client must appoint principal designer and principal contractor',
        'Construction phase plan required before work starts',
        'Health and safety file must be maintained and handed over',
        'All workers must be competent and have adequate training',
        'Risk assessment and method statement (RAMS) required',
      ],
    },
  },
  {
    id: 'voltage-classifications',
    title: 'Voltage Classifications',
    color: 'amber',
    icon: 'Zap',
    content: {
      type: 'table',
      rows: [
        { label: 'Extra Low Voltage', value: '\u226450V AC / \u2264120V DC' },
        { label: 'Low Voltage', value: '50V - 1000V AC' },
        { label: 'High Voltage', value: '>1000V AC' },
        { label: 'UK Mains', value: '230V \u00B110%' },
        { label: 'Three Phase', value: '400V between phases' },
      ],
    },
  },
  {
    id: 'shock-effects',
    title: 'Electric Shock Effects',
    color: 'orange',
    icon: 'AlertTriangle',
    content: {
      type: 'table',
      rows: [
        { label: '1mA', value: 'Perception threshold' },
        { label: '5mA', value: 'Pain threshold' },
        { label: '10-30mA', value: 'Muscle contraction (cannot let go)' },
        { label: '30-75mA', value: 'Respiratory arrest' },
        { label: '>75mA', value: 'Ventricular fibrillation (potentially fatal)' },
      ],
    },
  },
  {
    id: 'testing-priorities',
    title: 'Testing Priorities',
    color: 'green',
    icon: 'TestTube',
    content: {
      type: 'testing-priorities',
      tests: [
        { test: 'Continuity of protective conductors', priority: 'High', reason: 'Ensures protective conductor integrity for fault protection' },
        { test: 'Insulation resistance', priority: 'High', reason: 'Prevents dangerous leakage currents and detects cable damage' },
        { test: 'Polarity', priority: 'Medium', reason: 'Ensures correct connection of line, neutral, and earth' },
        { test: 'Earth fault loop impedance (Zs)', priority: 'High', reason: 'Ensures protective devices operate within required time' },
        { test: 'RCD operation', priority: 'High', reason: 'Confirms personal protection against electric shock' },
      ],
    },
  },
];
