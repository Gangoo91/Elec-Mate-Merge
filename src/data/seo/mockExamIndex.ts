/**
 * mockExamIndex — the canonical list of every public mock exam.
 *
 * Lifted out of MockExamsHubPage on 2026-08-07 so the exam list has ONE home.
 * Three pages were targeting "mock exams for electricians" — /mock-exams plus
 * two guides — and the guides linked to only one to three of the 38 exams
 * while ranking for the same queries. They were competing with the pages they
 * should have been feeding.
 *
 * Exam-intent is the only format on the site that earns a normal click-through
 * (0.91x expected at position 1-3, against 0.02x for definitional queries), so
 * consolidating signal onto these URLs is worth more than anywhere else.
 *
 * Adding an exam: add it here and to MockExamRoutes.tsx. The hub, the guides
 * and anything else render from this list.
 */
export interface ExamCard {
  slug: string;
  title: string;
  qCount: number;
  blurb: string;
}

export const TRADE_CERTS: ExamCard[] = [
  {
    slug: 'cscs-card',
    title: 'CSCS Card Mock Test',
    qCount: 200,
    blurb: 'HS&E test practice — general site safety, electrical, COSHH, manual handling.',
  },
  {
    slug: 'first-aid',
    title: 'First Aid at Work',
    qCount: 200,
    blurb: 'CPR, choking, severe bleeding, shock, secondary survey.',
  },
  {
    slug: 'ipaf',
    title: 'IPAF MEWP Operator',
    qCount: 200,
    blurb: 'Categories 1a, 1b, 3a, 3b — pre-use checks, harnesses, exclusion zones.',
  },
  {
    slug: 'pasma',
    title: 'PASMA Towers for Users',
    qCount: 200,
    blurb: 'Aluminium tower assembly, bracing, max working heights, dismantling.',
  },
  {
    slug: 'asbestos-awareness',
    title: 'Asbestos Awareness (Cat A)',
    qCount: 200,
    blurb: 'UKATA/IATP — ACMs, CAR 2012, duty to manage, emergency response.',
  },
  {
    slug: 'working-at-height',
    title: 'Working at Height (WAHR 2005)',
    qCount: 200,
    blurb: 'Hierarchy of control, ladder safety, fall arrest vs restraint, rescue plans.',
  },
  {
    slug: 'manual-handling',
    title: 'Manual Handling (MHOR 1992)',
    qCount: 200,
    blurb: 'TILE assessment, MAC tool, team lifts, mechanical aids.',
  },
  {
    slug: 'coshh',
    title: 'COSHH (Hazardous Substances)',
    qCount: 200,
    blurb: 'WELs, safety data sheets, RPE selection, biological agents.',
  },
  {
    slug: 'fire-safety',
    title: 'Fire Safety Awareness',
    qCount: 200,
    blurb: 'Fire classes A-F, extinguisher choice, alarm categories, evacuation.',
  },
  {
    slug: 'confined-spaces',
    title: 'Confined Spaces (CSR 1997)',
    qCount: 200,
    blurb: 'Specified risks, atmospheric testing, permits, rescue arrangements.',
  },
];

export const ELECTRICAL_EXAMS: ExamCard[] = [
  {
    slug: '18th-edition-bs-7671',
    title: '18th Edition BS 7671 (A4:2026)',
    qCount: 300,
    blurb: 'Chapter 41 protection, RCDs, AFDDs, EV charging, special locations.',
  },
  {
    slug: '2391-inspection-testing',
    title: 'C&G 2391 Inspection & Testing',
    qCount: 300,
    blurb: 'Initial verification, periodic inspection, EICR coding, GN3 sequence.',
  },
  {
    slug: '2391-50-initial-verification',
    title: 'C&G 2391-50 Initial Verification',
    qCount: 275,
    blurb: 'GN3 test sequence, dead + live testing, certification and the EIC.',
  },
  {
    slug: '2391-51-periodic-inspection',
    title: 'C&G 2391-51 Periodic Inspection',
    qCount: 296,
    blurb: 'EICR observations, C1/C2/C3/FI coding, sampling, extent + limitations.',
  },
  {
    slug: 'am2-online-knowledge-test',
    title: 'AM2 Online Knowledge Test',
    qCount: 177,
    blurb: 'Section E online theory — H&S, BS 7671, safe isolation, fault diagnosis.',
  },
  {
    slug: 'pat-testing',
    title: 'PAT Testing (C&G 2377)',
    qCount: 120,
    blurb: 'In-service inspection and testing, equipment classes, EAWR duties, records.',
  },
  {
    slug: 'emergency-lighting',
    title: 'Emergency Lighting (BS 5266)',
    qCount: 300,
    blurb: 'Maintained vs non-maintained, 3-hour duration, design, testing regimes.',
  },
  {
    slug: 'fire-alarm',
    title: 'Fire Alarm Systems (BS 5839-1)',
    qCount: 150,
    blurb: 'Categories L1-L5 and P1/P2, detectors, zoning, cabling, maintenance.',
  },
  {
    slug: 'ev-charging',
    title: 'EV Charging Installation',
    qCount: 150,
    blurb: 'Connector types, earthing and protection, smart charging, testing.',
  },
  {
    slug: 'data-cabling',
    title: 'Data Cabling',
    qCount: 150,
    blurb: 'Structured cabling, terminations, testing and certification, PoE.',
  },
  {
    slug: 'renewable-energy',
    title: 'Renewable Energy & Solar PV',
    qCount: 200,
    blurb: 'Panel tech, inverters, system design, grid connection, battery storage.',
  },
  {
    slug: 'smart-home',
    title: 'Smart Home Technology',
    qCount: 200,
    blurb: 'Zigbee, Z-Wave, mesh networking, hubs, security, installation practice.',
  },
  {
    slug: 'industrial-electrical',
    title: 'Industrial Electrical',
    qCount: 120,
    blurb: 'Three-phase distribution, motors, PLCs, fault finding, safe isolation.',
  },
  {
    slug: 'instrumentation',
    title: 'Instrumentation',
    qCount: 125,
    blurb: 'Sensors, 4-20mA loops, PID control, calibration, fault finding.',
  },
  {
    slug: 'bms',
    title: 'Building Management Systems',
    qCount: 245,
    blurb: 'BMS fundamentals, HVAC integration, protocols, commissioning.',
  },
  {
    slug: 'fibre-optics',
    title: 'Fibre Optics',
    qCount: 250,
    blurb: 'Singlemode vs multimode, connectors, splicing, installation, faults.',
  },
];

export const LEVEL_2: ExamCard[] = [
  {
    slug: 'level-2-electrical-health-safety',
    title: 'Unit 1 — Health & Safety',
    qCount: 301,
    blurb: 'HASAWA, EAWR, RIDDOR, COSHH, manual handling, CDM 2015, PPE.',
  },
  {
    slug: 'level-2-electrical-principles',
    title: 'Unit 2 — Electrical Principles',
    qCount: 301,
    blurb: "AC/DC, Ohm's Law, three-phase, magnetism, transformers, capacitance.",
  },
  {
    slug: 'level-2-installation-theory',
    title: 'Unit 3 — Installation Theory',
    qCount: 301,
    blurb: 'Cable types (T&E, SWA, MICC), conduit, trunking, accessories, BS 7671.',
  },
  {
    slug: 'level-2-installation-practice',
    title: 'Unit 4 — Installation Practice',
    qCount: 301,
    blurb: 'Risk assessment, safe isolation, tools, method statements, PPE.',
  },
  {
    slug: 'level-2-communications-career',
    title: 'Unit 5 — Comms & Career',
    qCount: 301,
    blurb: 'Site team roles, customer care, professional bodies, ECS Gold Card.',
  },
];

export const LEVEL_3: ExamCard[] = [
  {
    slug: 'level-3-electrical-health-safety',
    title: 'Unit 1 — H&S (Supervisor Grade)',
    qCount: 251,
    blurb: 'HASAWA s.2/s.3/s.7, CDM 2015, CAR 2012, Building Safety Act 2022.',
  },
  {
    slug: 'level-3-environmental-technologies',
    title: 'Unit 2 — Environmental Technologies',
    qCount: 251,
    blurb: 'Solar PV, heat pumps, EV charging, MCS scheme, grid connection.',
  },
  {
    slug: 'level-3-electrical-science',
    title: 'Unit 3 — Electrical Science',
    qCount: 251,
    blurb: 'Three-phase, motors, transformers, voltage drop, Zs, PFC, RLC.',
  },
  {
    slug: 'level-3-fault-diagnosis',
    title: 'Unit 4 — Fault Diagnosis',
    qCount: 251,
    blurb: 'Logical fault-finding, MFT use, dead vs live testing, EICR coding.',
  },
  {
    slug: 'level-3-inspection-testing',
    title: 'Unit 5 — Inspection, Testing & Commissioning',
    qCount: 201,
    blurb: 'GN3 sequence, RCD tests, MFT use, polarity, IR, certification.',
  },
  {
    slug: 'level-3-systems-design',
    title: 'Unit 6 — Systems Design',
    qCount: 201,
    blurb: 'Load assessment, diversity, cable sizing, voltage drop, schematics.',
  },
  {
    slug: 'level-3-career-development',
    title: 'Unit 7 — Career Development',
    qCount: 201,
    blurb: 'CPD, ECS Gold Card, NICEIC/NAPIT, JIB grades, supervisor route.',
  },
];

/** Every public mock exam, most relevant to an electrician first. */
export const ALL_MOCK_EXAMS: ExamCard[] = [
  ...ELECTRICAL_EXAMS,
  ...LEVEL_3,
  ...LEVEL_2,
  ...TRADE_CERTS,
];
