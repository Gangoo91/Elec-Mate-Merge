/**
 * Curated YouTube Videos
 *
 * Hand-picked electrical training videos from approved channels only.
 * Only add videos from creators who have given permission.
 *
 * Current approved creators:
 * - Craig Wiltshire (@craigwiltshire9628) - NVQ assessment & apprentice training
 * - The Engineering Mindset (@TheEngineeringMindset) - Electrical theory & fundamentals
 */

export type VideoCategory =
  | 'electrical-theory'
  | 'wiring'
  | 'testing-inspection'
  | 'bs7671'
  | 'am2-prep'
  | 'domestic'
  | 'commercial'
  | 'solar-ev'
  | 'safety'
  | 'tools-equipment'
  | 'career';

export interface CuratedVideo {
  id: string;
  title: string;
  channel: string;
  duration: string;
  category: VideoCategory;
  tags: string[];
  level: 'beginner' | 'intermediate' | 'advanced';
  description?: string;
}

export const categoryLabels: Record<VideoCategory, string> = {
  'electrical-theory': 'Electrical Theory',
  'wiring': 'Wiring',
  'testing-inspection': 'Testing & Inspection',
  'bs7671': 'BS 7671',
  'am2-prep': 'AM2 Prep',
  'domestic': 'Domestic',
  'commercial': 'Commercial',
  'solar-ev': 'Solar/EV',
  'safety': 'Safety',
  'tools-equipment': 'Tools & Equipment',
  'career': 'Career',
};

export const curatedVideos: CuratedVideo[] = [
  // ═══════════════════════════════════════════════════════════════════
  // THE ENGINEERING MINDSET — Electrical Theory & Fundamentals
  // ═══════════════════════════════════════════════════════════════════

  // ── Electrical Theory — Beginner ────────────────────────────────────
  {
    id: 'mc979OhitAg',
    title: 'How Electricity Works — Working Principle',
    channel: 'The Engineering Mindset',
    duration: '10:11',
    category: 'electrical-theory',
    tags: ['electricity', 'basics', 'fundamentals', 'atoms', 'electrons'],
    level: 'beginner',
    description: 'The fundamental working principle of electricity — how and why electrons flow through conductors.',
  },
  {
    id: 'kcL2_D33k3o',
    title: 'Electrical Current Explained — AC, DC, Fuses & Circuit Breakers',
    channel: 'The Engineering Mindset',
    duration: '18:45',
    category: 'electrical-theory',
    tags: ['current', 'AC', 'DC', 'fuses', 'circuit breakers', 'ampere'],
    level: 'beginner',
    description: 'What electrical current is, the difference between AC and DC, and how fuses and circuit breakers protect circuits.',
  },
  {
    id: 'w82aSjLuD_8',
    title: 'Voltage Explained — What Is Voltage?',
    channel: 'The Engineering Mindset',
    duration: '10:52',
    category: 'electrical-theory',
    tags: ['voltage', 'potential difference', 'basics', 'fundamentals'],
    level: 'beginner',
    description: 'What voltage is, how potential difference works, and why it matters in every electrical circuit.',
  },
  {
    id: 'HsLLq6Rm5tU',
    title: "Ohm's Law Explained — The Basics of Circuit Theory",
    channel: 'The Engineering Mindset',
    duration: '10:00',
    category: 'electrical-theory',
    tags: ["Ohm's law", 'resistance', 'voltage', 'current', 'circuit theory'],
    level: 'beginner',
    description: "How Ohm's law works and how to use it to calculate voltage, current and resistance in circuits.",
  },
  {
    id: 'MUh_dOcqgVw',
    title: 'Conventional Current vs Electron Flow',
    channel: 'The Engineering Mindset',
    duration: '3:23',
    category: 'electrical-theory',
    tags: ['conventional current', 'electron flow', 'direction', 'fundamentals'],
    level: 'beginner',
    description: 'The difference between conventional current direction and actual electron flow — and why both are used.',
  },
  {
    id: 'VV6tZ3Aqfuc',
    title: 'DC Series Circuits Explained',
    channel: 'The Engineering Mindset',
    duration: '11:29',
    category: 'electrical-theory',
    tags: ['series circuits', 'DC', 'resistance', 'voltage divider'],
    level: 'beginner',
    description: 'How DC series circuits work — current, voltage and resistance behaviour when components are in series.',
  },
  {
    id: '5uyJezQNSHw',
    title: 'DC Parallel Circuits Explained',
    channel: 'The Engineering Mindset',
    duration: '16:00',
    category: 'electrical-theory',
    tags: ['parallel circuits', 'DC', 'resistance', 'current division'],
    level: 'beginner',
    description: 'How DC parallel circuits work — how current splits and how to calculate total resistance.',
  },
  {
    id: 'OUcKJuMSSW4',
    title: 'AC Basics — All About Alternating Current',
    channel: 'The Engineering Mindset',
    duration: '4:17',
    category: 'electrical-theory',
    tags: ['AC', 'alternating current', 'frequency', 'sine wave', 'basics'],
    level: 'beginner',
    description: 'A concise overview of alternating current — what it is, how it differs from DC, and why we use it.',
  },
  {
    id: 'SMPhh8gT_1E',
    title: 'What Is a kWh? Kilowatt Hour Explained + Calculations',
    channel: 'The Engineering Mindset',
    duration: '6:02',
    category: 'electrical-theory',
    tags: ['kWh', 'kilowatt hour', 'energy', 'calculations', 'billing'],
    level: 'beginner',
    description: 'What a kilowatt hour is, how to calculate energy consumption, and how it relates to electricity bills.',
  },

  // ── Electrical Theory — Intermediate ────────────────────────────────
  {
    id: 'Fwj_d3uO5g8',
    title: 'Diodes Explained — How Diodes Work',
    channel: 'The Engineering Mindset',
    duration: '11:32',
    category: 'electrical-theory',
    tags: ['diodes', 'PN junction', 'semiconductors', 'rectification'],
    level: 'intermediate',
    description: 'How diodes work, the PN junction principle, and where diodes are used in electrical systems.',
  },
  {
    id: 'KSylo01n5FY',
    title: 'Inductors Explained — How Inductors Work',
    channel: 'The Engineering Mindset',
    duration: '10:20',
    category: 'electrical-theory',
    tags: ['inductors', 'inductance', 'magnetic field', 'coils'],
    level: 'intermediate',
    description: 'How inductors store energy in magnetic fields and their role in electrical circuits.',
  },
  {
    id: 'PXNKkcB0pI4',
    title: 'How Batteries Work',
    channel: 'The Engineering Mindset',
    duration: '19:01',
    category: 'electrical-theory',
    tags: ['batteries', 'electrochemistry', 'cells', 'energy storage'],
    level: 'intermediate',
    description: 'The working principle of batteries — how chemical energy converts to electrical energy.',
  },
  {
    id: 'O8M2z2hIbag',
    title: 'How LEDs Work',
    channel: 'The Engineering Mindset',
    duration: '19:06',
    category: 'electrical-theory',
    tags: ['LED', 'light emitting diode', 'semiconductors', 'lighting'],
    level: 'intermediate',
    description: 'How LEDs produce light, their construction, and why they are so efficient compared to traditional lighting.',
  },
  {
    id: 'Tv_7XWf96gg',
    title: 'Power Factor Explained',
    channel: 'The Engineering Mindset',
    duration: '11:09',
    category: 'electrical-theory',
    tags: ['power factor', 'reactive power', 'apparent power', 'AC'],
    level: 'intermediate',
    description: 'What power factor is, why it matters, and the relationship between real, reactive and apparent power.',
  },
  {
    id: 'W0_1xRqT8uU',
    title: 'Single Phase Electricity Explained',
    channel: 'The Engineering Mindset',
    duration: '10:10',
    category: 'electrical-theory',
    tags: ['single phase', 'mains supply', 'domestic', 'AC'],
    level: 'intermediate',
    description: 'How single phase electricity supply works — from the transformer to the consumer unit.',
  },
  {
    id: '4oRT7PoXSS0',
    title: 'How Three Phase Electricity Works',
    channel: 'The Engineering Mindset',
    duration: '7:53',
    category: 'electrical-theory',
    tags: ['three phase', '3 phase', 'power distribution', 'AC'],
    level: 'intermediate',
    description: 'The basics of three phase electricity — why we use it and how it delivers more power efficiently.',
  },
  {
    id: 'qthuFLNSrlg',
    title: 'Three Phase Electricity — Basics and Calculations',
    channel: 'The Engineering Mindset',
    duration: '14:37',
    category: 'electrical-theory',
    tags: ['three phase', 'calculations', 'line voltage', 'phase voltage', 'star', 'delta'],
    level: 'intermediate',
    description: 'Three phase calculations including line vs phase voltage, star and delta configurations.',
  },
  {
    id: 'jcY4QN7awEc',
    title: 'How Transformers Work',
    channel: 'The Engineering Mindset',
    duration: '16:33',
    category: 'electrical-theory',
    tags: ['transformers', 'step up', 'step down', 'electromagnetic induction'],
    level: 'intermediate',
    description: 'The working principle of transformers — how they step voltage up and down using electromagnetic induction.',
  },
  {
    id: 'u0SsejDCVkU',
    title: 'How 3 Phase Transformers Work',
    channel: 'The Engineering Mindset',
    duration: '24:24',
    category: 'electrical-theory',
    tags: ['three phase', 'transformers', 'power distribution', 'delta', 'star'],
    level: 'intermediate',
    description: 'How three phase transformers work, the different winding configurations, and why we need them.',
  },
  {
    id: 'GQatiB-JHdI',
    title: 'How Does a DC Motor Work?',
    channel: 'The Engineering Mindset',
    duration: '15:32',
    category: 'electrical-theory',
    tags: ['DC motor', 'commutator', 'brushes', 'electromagnetic', 'rotation'],
    level: 'intermediate',
    description: 'The working principle of DC motors — how they convert electrical energy into mechanical rotation.',
  },
  {
    id: '59HBoIXzX_c',
    title: 'How Electric Motors Work — 3 Phase AC Induction Motors',
    channel: 'The Engineering Mindset',
    duration: '15:34',
    category: 'electrical-theory',
    tags: ['induction motor', '3 phase', 'AC motor', 'rotating magnetic field'],
    level: 'intermediate',
    description: 'How three phase AC induction motors work — the rotating magnetic field and squirrel cage rotor.',
  },

  // ── Electrical Theory — Advanced ────────────────────────────────────
  {
    id: 'ucEiEic-kZ4',
    title: 'Capacitor Calculations — Series and Parallel',
    channel: 'The Engineering Mindset',
    duration: '16:16',
    category: 'electrical-theory',
    tags: ['capacitors', 'calculations', 'series', 'parallel', 'capacitance'],
    level: 'advanced',
    description: 'How to calculate total capacitance for capacitors in series and parallel configurations.',
  },
  {
    id: 'h89TTwlNnpY',
    title: 'Star Delta Starter Explained',
    channel: 'The Engineering Mindset',
    duration: '11:08',
    category: 'electrical-theory',
    tags: ['star delta', 'motor starter', 'inrush current', 'industrial'],
    level: 'advanced',
    description: 'How star delta starters work to reduce inrush current when starting large three phase motors.',
  },
  {
    id: 'yEPe7RDtkgo',
    title: 'Variable Frequency Drives Explained — VFD Basics',
    channel: 'The Engineering Mindset',
    duration: '15:18',
    category: 'electrical-theory',
    tags: ['VFD', 'variable frequency drive', 'inverter', 'motor speed control'],
    level: 'advanced',
    description: 'How variable frequency drives control motor speed — the IGBT inverter principle and applications.',
  },

  // ── Safety (Engineering Mindset) ────────────────────────────────────
  {
    id: 'n594CkrP6xE',
    title: 'How Relays Work',
    channel: 'The Engineering Mindset',
    duration: '14:02',
    category: 'safety',
    tags: ['relays', 'coil', 'contacts', 'switching', 'control circuits'],
    level: 'intermediate',
    description: 'How relays work — the electromagnetic switching principle and their role in control and safety circuits.',
  },
  {
    id: 'gqEu9t8HwW0',
    title: "Why Circuit Breakers Don't Protect People (Electric Shocks)",
    channel: 'The Engineering Mindset',
    duration: '18:23',
    category: 'safety',
    tags: ['circuit breakers', 'RCD', 'electric shock', 'protection', 'safety'],
    level: 'intermediate',
    description: 'Why MCBs alone cannot protect against electric shock — and why RCDs are essential for personal safety.',
  },
  {
    id: 'RwSga-zQy0I',
    title: 'Time Delay Relays Explained',
    channel: 'The Engineering Mindset',
    duration: '12:29',
    category: 'safety',
    tags: ['time delay relay', 'timer', 'control circuits', 'automation'],
    level: 'intermediate',
    description: 'How time delay relays work — the different timing modes and their applications in control circuits.',
  },

  // ── Solar/EV (Engineering Mindset) ──────────────────────────────────
  {
    id: 'jdSKlg80DjU',
    title: 'How Alternators Work',
    channel: 'The Engineering Mindset',
    duration: '18:15',
    category: 'solar-ev',
    tags: ['alternator', 'generator', 'AC', 'electromagnetic induction'],
    level: 'intermediate',
    description: 'How alternators generate AC electricity using electromagnetic induction.',
  },
  {
    id: 'WhATjUHgzxQ',
    title: 'AC Electrical Generator Basics',
    channel: 'The Engineering Mindset',
    duration: '5:56',
    category: 'solar-ev',
    tags: ['generator', 'AC', 'power generation', 'basics'],
    level: 'beginner',
    description: 'The basic working principle of AC generators — how mechanical energy is converted to electrical energy.',
  },

  // ── Tools & Equipment (Engineering Mindset) ─────────────────────────
  {
    id: 'J3kKNNizARc',
    title: 'How to Use a Multimeter Like a Pro — Clamp Meter',
    channel: 'The Engineering Mindset',
    duration: '24:52',
    category: 'tools-equipment',
    tags: ['multimeter', 'clamp meter', 'testing', 'measurement', 'tools'],
    level: 'beginner',
    description: 'A comprehensive guide to using multimeters and clamp meters for electrical measurement and testing.',
  },

  // ── Career (Engineering Mindset) ────────────────────────────────────
  {
    id: 'DGKTzl9CTXo',
    title: 'The Invention Edison Missed — Now Worth Billions',
    channel: 'The Engineering Mindset',
    duration: '17:35',
    category: 'career',
    tags: ['Edison', 'Tesla', 'AC vs DC', 'history', 'electrical engineering'],
    level: 'beginner',
    description: 'The fascinating history of AC vs DC power — how Tesla and Westinghouse changed the world of electricity.',
  },

  // ═══════════════════════════════════════════════════════════════════
  // CRAIG WILTSHIRE — NVQ Assessment & Apprentice Training
  // ═══════════════════════════════════════════════════════════════════

  // ── Testing & Inspection ──────────────────────────────────────────
  {
    id: 'K7-FxWD87Kg',
    title: 'NVQ 3 Electrotechnical Ring Final Testing Explained',
    channel: 'Craig Wiltshire',
    duration: '10:00',
    category: 'testing-inspection',
    tags: ['NVQ', 'ring final', 'testing', 'Level 3'],
    level: 'intermediate',
    description: 'Ring final circuit testing explained for NVQ Level 3 electrotechnical learners.',
  },
  {
    id: 'NNfyTU1QoYI',
    title: 'Ring Final Test Explanation - As Simple as I Can Make It',
    channel: 'Craig Wiltshire',
    duration: '8:00',
    category: 'testing-inspection',
    tags: ['ring final', 'testing', 'simple explanation'],
    level: 'beginner',
    description: 'A straightforward walkthrough of ring final circuit testing.',
  },
  {
    id: 'sWvtpLZsAEE',
    title: 'Insulation Resistance Testing as per AMD 2 BS 7671',
    channel: 'Craig Wiltshire',
    duration: '12:00',
    category: 'testing-inspection',
    tags: ['insulation resistance', 'IR testing', 'BS 7671', 'AMD 2'],
    level: 'intermediate',
    description: 'How to carry out insulation resistance testing in line with the latest BS 7671 amendment.',
  },
  {
    id: 'CSMpfjSQK-g',
    title: 'Ze Test Single Phase',
    channel: 'Craig Wiltshire',
    duration: '6:00',
    category: 'testing-inspection',
    tags: ['Ze', 'earth fault loop', 'single phase', 'testing'],
    level: 'beginner',
    description: 'How to carry out a Ze (external earth fault loop impedance) test on a single phase supply.',
  },
  {
    id: 'DJn8KIQkApo',
    title: 'Schedule of Inspections',
    channel: 'Craig Wiltshire',
    duration: '10:00',
    category: 'testing-inspection',
    tags: ['inspection', 'schedule', 'certification', 'paperwork'],
    level: 'intermediate',
    description: 'How to complete a schedule of inspections for your assessment.',
  },

  // ── BS 7671 / Regulations ─────────────────────────────────────────
  {
    id: 'V1dUdzUszdo',
    title: '17th and 18th Edition Reg Changes - Fire Supports',
    channel: 'Craig Wiltshire',
    duration: '8:00',
    category: 'bs7671',
    tags: ['18th edition', '17th edition', 'regulation changes', 'fire'],
    level: 'intermediate',
    description: 'Key regulation changes between 17th and 18th edition regarding fire supports.',
  },

  // ── NVQ / Assessment / Career ─────────────────────────────────────
  {
    id: 'HqkVPC9LYxw',
    title: 'Top 7 Rejected Evidence for NVQ',
    channel: 'Craig Wiltshire',
    duration: '12:00',
    category: 'career',
    tags: ['NVQ', 'evidence', 'portfolio', 'common mistakes'],
    level: 'beginner',
    description: 'The most common reasons NVQ evidence gets rejected and how to avoid them.',
  },
  {
    id: 'Ft_UdvFOvts',
    title: 'How to Prep for a Successful Assessment - Interview with George',
    channel: 'Craig Wiltshire',
    duration: '15:00',
    category: 'career',
    tags: ['NVQ', 'assessment', 'preparation', 'interview'],
    level: 'beginner',
    description: 'Tips and advice on preparing for your NVQ assessment, with insights from a learner.',
  },
  {
    id: 'wJ-ePLirRgE',
    title: 'What Is the EWA - Experienced Worker Assessment',
    channel: 'Craig Wiltshire',
    duration: '8:00',
    category: 'career',
    tags: ['EWA', 'experienced worker', 'assessment', 'qualification'],
    level: 'beginner',
    description: 'An overview of the Experienced Worker Assessment route and what to expect.',
  },
  {
    id: 'L9mRkaaRmwM',
    title: 'Getting Over Anxiety - Adam and Craig',
    channel: 'Craig Wiltshire',
    duration: '10:00',
    category: 'career',
    tags: ['anxiety', 'wellbeing', 'support', 'apprentice'],
    level: 'beginner',
    description: 'An honest chat about dealing with anxiety as an apprentice and how to overcome it.',
  },
  {
    id: 'asG-Bkv2_vc',
    title: 'Risk Assessment for NVQ',
    channel: 'Craig Wiltshire',
    duration: '8:00',
    category: 'safety',
    tags: ['risk assessment', 'NVQ', 'health and safety'],
    level: 'beginner',
    description: 'How to complete a risk assessment as part of your NVQ portfolio evidence.',
  },

  // ── AM2 Prep ──────────────────────────────────────────────────────
  {
    id: 'iTYYdLGZ-WA',
    title: 'AM2 and AM2E - When Can You Book It?',
    channel: 'Craig Wiltshire',
    duration: '6:00',
    category: 'am2-prep',
    tags: ['AM2', 'AM2E', 'booking', 'exam'],
    level: 'beginner',
    description: 'When you can book your AM2 or AM2E assessment and what the requirements are.',
  },

  // ── Faults & Problem Solving ──────────────────────────────────────
  {
    id: '4_YaoRGUB5Y',
    title: 'Fault Finding and How to Describe a Fault in Assessment',
    channel: 'Craig Wiltshire',
    duration: '10:00',
    category: 'testing-inspection',
    tags: ['fault finding', 'assessment', 'NVQ', 'diagnosis'],
    level: 'intermediate',
    description: 'How to approach fault finding and describe faults properly in your NVQ assessment.',
  },
  {
    id: '28ZEFkvkDMc',
    title: 'GN3 Error Detected by a Sharp Learner',
    channel: 'Craig Wiltshire',
    duration: '5:00',
    category: 'testing-inspection',
    tags: ['GN3', 'error', 'guidance note', 'learning'],
    level: 'intermediate',
    description: 'A learner spots an important error in GN3 - a lesson in paying attention to detail.',
  },
  {
    id: '9p0_OqPdLLo',
    title: '2357 Faults Presentation - Absolute Gold',
    channel: 'Craig Wiltshire',
    duration: '15:00',
    category: 'testing-inspection',
    tags: ['2357', 'faults', 'City and Guilds', 'presentation'],
    level: 'intermediate',
    description: 'Essential fault presentation for City and Guilds 2357 learners.',
  },

  // ── Wiring & Installation ─────────────────────────────────────────
  {
    id: '5DdY6PzOznQ',
    title: 'Containment vs Clipping - Top Rant',
    channel: 'Craig Wiltshire',
    duration: '6:00',
    category: 'wiring',
    tags: ['containment', 'clipping', 'cable management', 'installation'],
    level: 'beginner',
    description: 'The differences between containment and clipping methods for cable installation.',
  },
  {
    id: '5k13SbwbiKU',
    title: 'How to Calculate How Long a Cable Is - Easy',
    channel: 'Craig Wiltshire',
    duration: '5:00',
    category: 'wiring',
    tags: ['cable', 'calculation', 'measuring', 'basic skills'],
    level: 'beginner',
    description: 'A simple method for calculating cable length on site.',
  },

  // ── Domestic ──────────────────────────────────────────────────────
  {
    id: 'MM2mbr6mkGE',
    title: 'NVQ Assessment Set Up for Domestic',
    channel: 'Craig Wiltshire',
    duration: '10:00',
    category: 'domestic',
    tags: ['NVQ', 'domestic', 'assessment', 'set up'],
    level: 'intermediate',
    description: 'How to set up your NVQ assessment for domestic electrical work.',
  },

  // ── Safety ────────────────────────────────────────────────────────
  {
    id: 'YMJzWC_e_Uw',
    title: 'Safe Isolation Info - Where to Test',
    channel: 'Craig Wiltshire',
    duration: '8:00',
    category: 'safety',
    tags: ['safe isolation', 'testing', 'procedure', 'safety'],
    level: 'beginner',
    description: 'Useful safe isolation information including where to test - essential for every apprentice.',
  },
  {
    id: 'Hu2uCcYElzQ',
    title: 'Ladder Ratio',
    channel: 'Craig Wiltshire',
    duration: '4:00',
    category: 'safety',
    tags: ['ladder', 'ratio', 'health and safety', 'site'],
    level: 'beginner',
    description: 'The correct ladder ratio and why it matters for site safety.',
  },
  {
    id: 'oHOoq3hV2NA',
    title: 'Ze Hi Trip Current',
    channel: 'Craig Wiltshire',
    duration: '6:00',
    category: 'testing-inspection',
    tags: ['Ze', 'trip current', 'testing', 'fault finding'],
    level: 'intermediate',
  },

  // ── Solar / Renewable ─────────────────────────────────────────────
  {
    id: 'Rt-nomGnC40',
    title: 'Solar Thermal Hot Water - How It Works (Units 312/002 NVQ 3)',
    channel: 'Craig Wiltshire',
    duration: '10:00',
    category: 'solar-ev',
    tags: ['solar thermal', 'hot water', 'NVQ 3', 'renewable'],
    level: 'intermediate',
    description: 'How solar thermal hot water systems work, covering NVQ 3 units 312 and 002.',
  },

  // ── NVQ Units / Study ─────────────────────────────────────────────
  {
    id: '5L-_aO1-Yaw',
    title: 'Unit 312 (2357) or 002 (1605)',
    channel: 'Craig Wiltshire',
    duration: '12:00',
    category: 'career',
    tags: ['unit 312', 'unit 002', '2357', '1605', 'NVQ'],
    level: 'intermediate',
    description: 'Guidance on NVQ unit 312 from 2357 or unit 002 from 1605.',
  },
  {
    id: 'CTEqzeP297s',
    title: 'Unit 312/002 from 2357 and 1605',
    channel: 'Craig Wiltshire',
    duration: '10:00',
    category: 'career',
    tags: ['unit 312', 'unit 002', '2357', '1605', 'NVQ'],
    level: 'intermediate',
    description: 'Further guidance on completing units 312 and 002 for your NVQ.',
  },
  {
    id: 'mg7i4sM52dk',
    title: '312/002 Video - Easy as 1 2 3',
    channel: 'Craig Wiltshire',
    duration: '8:00',
    category: 'career',
    tags: ['unit 312', 'unit 002', 'easy guide', 'NVQ'],
    level: 'beginner',
    description: 'A simplified walkthrough of units 312 and 002 for your NVQ.',
  },

  // ── Portfolio / Evidence Tips ──────────────────────────────────────
  {
    id: 'A_g9ghHxcz0',
    title: 'How to Use Photo Guides',
    channel: 'Craig Wiltshire',
    duration: '5:00',
    category: 'career',
    tags: ['photo guides', 'evidence', 'NVQ', 'portfolio'],
    level: 'beginner',
    description: 'How to use photo guides effectively for your NVQ portfolio evidence.',
  },
  {
    id: 'kgUk6kCS5II',
    title: 'New Photo Upload and Label Guide',
    channel: 'Craig Wiltshire',
    duration: '5:00',
    category: 'career',
    tags: ['photo upload', 'labelling', 'OneFile', 'NVQ'],
    level: 'beginner',
    description: 'Updated guide on uploading and labelling photos for your NVQ evidence.',
  },
  {
    id: 'aWTlt8gao2s',
    title: 'How to Easily Create What You Need',
    channel: 'Craig Wiltshire',
    duration: '6:00',
    category: 'career',
    tags: ['evidence', 'creation', 'NVQ', 'tips'],
    level: 'beginner',
    description: 'Quick tips on creating the evidence you need for your NVQ portfolio.',
  },
  {
    id: 'jb93zSeew3o',
    title: 'OneFile "Show Thumbnails" Simple View Feature',
    channel: 'Craig Wiltshire',
    duration: '3:00',
    category: 'career',
    tags: ['OneFile', 'platform', 'tips', 'NVQ'],
    level: 'beginner',
    description: 'How to use the thumbnail view feature in OneFile for easier navigation.',
  },
];

/** Get videos by category */
export function getVideosByCategory(category: VideoCategory): CuratedVideo[] {
  return curatedVideos.filter(v => v.category === category);
}

/** Get all unique categories that have videos */
export function getAvailableCategories(): VideoCategory[] {
  return Array.from(new Set(curatedVideos.map(v => v.category)));
}
