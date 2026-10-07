/**
 * Mock exam question → the lesson page that teaches it (ELE-1815, 7 Oct 2026).
 *
 * Hand-built from the question banks and the course pages. A bank's section
 * numbers do NOT line up with the course's section pages (Level 3 bank 3.4 is
 * Transformers, page 3.4 is AC theory), so every entry here was matched on
 * CONTENT: the bank section's actual questions against the section landing
 * page's subsections. Anything not confidently matched is left out and the
 * caller falls back to the module page — never a guessed lesson.
 *
 * Values are page SECTION numbers (or [module, section] for AM2); routes are
 * built in src/lib/study-centre/mockStudyLinks.ts. Every target route was
 * checked against Level3Routes / Level2Routes / ApprenticeCourseRoutes.
 *
 * Note: Level 3 module 5's own topic labels (M5_SECTION_TOPIC) don't match its
 * questions (bank 5.x is continuity/IR testing but labelled "Certification &
 * Reporting"), so module 5 is mapped by the bank's leading section number,
 * from content — and links are labelled with the PAGE's title, not the topic.
 */

/** Short titles of the section pages we link to, for link labels. */
export const L3_PAGE_TITLES: Record<number, Record<number, string>> = {
  1: {
    1: 'Health and safety legislation',
    2: 'Accidents, emergencies and reporting',
    3: 'Risk assessment, PPE and safe practice',
    4: 'Hazards on site',
    5: 'Dutyholder responsibilities',
    6: 'Building Safety Act and specialist risks',
  },
  2: {
    1: 'Environmental technology systems',
    2: 'BS 7671 for PV, EV and heating',
    3: 'Renewable technologies',
    4: 'Part L, MCS and the regulations',
    5: 'Installing, commissioning and maintaining',
    6: 'F-Gas, WEEE and sustainable working',
  },
  3: {
    1: 'Maths, units and energy',
    2: 'Electron theory, DC and AC principles',
    3: 'Three-phase and power factor',
    4: 'Transformers',
    5: 'Motors',
    6: 'Control, protection, lighting and heating',
  },
  4: {
    1: 'Safe working in fault diagnosis',
    2: 'Test instruments',
    3: 'Types and causes of faults',
    4: 'Logical fault diagnosis',
    5: 'Repair, verification and reporting',
    6: 'Correcting faults',
  },
  5: {
    1: 'The inspection and testing framework',
    2: 'Visual inspection',
    3: 'Dead tests',
    4: 'Live tests: Zs, RCD and fault current',
    5: 'Periodic inspection (EICR)',
    6: 'Certification and handover',
  },
  6: {
    1: 'The designer’s role and BS 7671',
    2: 'Maximum demand and diversity',
    3: 'Design current and protective devices',
    4: 'Cable sizing',
    5: 'Earth fault loop impedance',
    6: 'Design documentation',
  },
  7: {
    1: 'Industry structure and JIB grading',
    2: 'Career progression',
    3: 'Running a business',
    4: 'CPD and professional bodies',
    5: 'Employment and self-employment',
  },
};

/** Level 3 modules 1–2: every question carries its own topic. */
export const L3_TOPIC: Record<number, Record<string, number>> = {
  1: {
    'HASAWA 1974': 1,
    'EAWR 1989': 1,
    'Electricity at Work Regulations': 1,
    'COSHH 2002': 1,
    COSHH: 1,
    Enforcement: 1,
    Legislation: 1,
    'Work Equipment': 1,
    'RIDDOR 2013': 2,
    RIDDOR: 2,
    'Emergency Procedures': 2,
    'Incident Response': 2,
    'Accident Reporting': 2,
    'Stopping Unsafe Work': 2,
    'Risk Assessment': 3,
    'Method Statements': 3,
    'PPE and Safe Systems': 3,
    PPE: 3,
    'Safe Systems of Work': 3,
    'Hierarchy of Control': 3,
    'Safe Isolation': 3,
    'Asbestos and CDM 2015': 4,
    Asbestos: 4,
    'Fire Safety': 4,
    'Overhead Lines': 4,
    'Buried Services': 4,
    'Supervisor Responsibilities': 5,
    'Duty Holders': 5,
    'Confined Spaces': 6,
  },
  2: {
    'Future Technologies': 1,
    'Smart Building Systems': 1,
    'Battery Storage': 1,
    'BS 7671 Special Locations': 2,
    'Prosumer Installations': 2,
    'Grid Connection': 2,
    'Isolation and Labelling': 2,
    'Inspection and Testing': 2,
    'Renewable Technologies': 3,
    'Solar PV': 3,
    'Heat Pumps': 3,
    'Heating Systems': 3,
    'Solar Thermal': 3,
    'Wind and Micro-Hydro': 3,
    'Building Regulations Part L': 4,
    'Energy Efficiency': 4,
    'EPCs and Compliance': 4,
    'Insulation and Building Regs': 4,
    Commissioning: 5,
    'Design and Demand': 5,
    'Sustainability and Sustainable Working': 6,
    'F-Gas, WEEE and Sustainable Working': 6,
  },
};

/**
 * Level 3 modules 3–7: keyed by the bank's section code ('3.4'; module 5 by
 * its leading number), matched on what the questions in that section ask.
 * Left out: 3.7 / 3.8 / 4.8 (mixed "in depth" sets), 6.6 special locations
 * and 6.8 verification (no Module 6 page), 7.3 (qualification/assessment).
 */
export const L3_SECTION: Record<number, Record<string, number>> = {
  3: { '3.1': 2, '3.2': 2, '3.3': 3, '3.4': 4, '3.5': 5, '3.6': 3 },
  4: { '4.1': 3, '4.2': 4, '4.3': 2, '4.4': 1, '4.5': 5, '4.6': 3, '4.7': 5 },
  5: { '1': 1, '2': 1, '3': 2, '4': 3, '5': 3, '6': 4, '7': 6 },
  6: { '6.1': 1, '6.2': 2, '6.3': 4, '6.4': 3, '6.5': 5, '6.7': 6 },
  7: { '7.1': 1, '7.2': 1, '7.4': 2, '7.5': 4, '7.6': 4, '7.7': 3 },
};

export const L2_PAGE_TITLES: Record<number, Record<number, string>> = {
  1: {
    1: 'Health and safety legislation',
    2: 'Hazards on site',
    3: 'Risk assessments and method statements',
    4: 'PPE and safe working',
    5: 'Safe isolation',
    6: 'Accidents, first aid and emergencies',
  },
  2: {
    1: 'Maths, units and instruments',
    2: 'Mechanics, energy and efficiency',
    3: 'Resistance and the effects of current',
    4: 'Ohm’s law and DC circuits',
    5: 'Magnetism, induction and AC',
    6: 'Electronic components',
  },
  3: {
    1: 'Regulations and guidance',
    2: 'Technical information and drawings',
    3: 'Circuits and wiring systems',
    4: 'Earthing and ADS',
    5: 'Generation, transmission and distribution',
    6: 'Micro-renewables',
  },
  4: {
    1: 'Tools and their safety',
    2: 'Hazards, PPE and access',
    3: 'Installing and terminating wiring systems',
    4: 'Bonding',
    5: 'Inspection before testing',
    6: 'Dead testing',
  },
  5: {
    1: 'Site roles and responsibilities',
    2: 'Legislation and guidance',
    3: 'Workplace information',
    4: 'Customer information and company policies',
    5: 'Communication',
  },
};

/**
 * Level 2: by section group ('2.1', '203-4', '4.6'), matched on content.
 * Module 3's 203-N groups line up 1:1 with its pages; its 3.x groups are all
 * wiring-systems installation. Module 1's bank has no sections (module page).
 */
export const L2_SECTION: Record<number, Record<string, number>> = {
  2: { '2.1': 1, '2.2': 1, '2.3': 4, '2.5': 5, '2.6': 2 },
  3: {
    '203-1': 1,
    '203-2': 2,
    '203-3': 3,
    '203-4': 4,
    '203-5': 5,
    '203-6': 6,
    '3.1': 3,
    '3.2': 3,
    '3.3': 3,
    '3.4': 3,
    '3.5': 3,
    '3.6': 3,
    '3.7': 3,
  },
  4: { '4.1': 3, '4.2': 3, '4.3': 3, '4.4': 4, '4.5': 3, '4.6': 6, '4.7': 1, '4.8': 3 },
};

/** Level 2 topic overrides, where a section group mixes subjects. */
export const L2_TOPIC: Record<number, Record<string, number>> = {
  2: {
    Electrolysis: 3,
    'Temperature Effects': 3,
    'Voltage Drop': 3,
    'Voltage Drop Calculation': 3,
    'Peak-RMS Calculation': 5,
    'AC Average Value': 5,
    'Period Calculation': 5,
  },
  4: {
    'Visual Inspection': 5,
    'Safe Isolation': 3,
    'Fire Sealing': 3,
    'Risk Assessment': 2,
    'Drilling PPE': 2,
    'Confined Space PPE': 2,
  },
  5: {
    'Reporting lines': 1,
    'Site management team': 1,
    'Site visitors': 1,
    'CDM Worker duties': 1,
    'Statutory legislation': 2,
    'Equality Act protected characteristics': 2,
    'Workplace information': 3,
    'Customer information': 4,
    'Company policies': 4,
    'GDPR / Data protection': 4,
    'Communication methods': 5,
    'Accessible communication': 5,
    Conflict: 5,
    'Effects of poor communication': 5,
    'Mental health & wellbeing': 5,
  },
};

/**
 * AM2: by the question's `section` (its `topic` is too generic). The AM2
 * course teaches the assessment, so regs/safety knowledge goes to its
 * knowledge-test revision page. Unlisted sections get no link.
 */
export const AM2_SECTION: Record<string, [module: number, section: number, title: string]> = {
  'RCD Testing': [4, 1, 'The full test sequence'],
  'Loop Impedance': [4, 1, 'The full test sequence'],
  'Insulation Testing': [4, 1, 'The full test sequence'],
  'Insulation Resistance': [4, 1, 'The full test sequence'],
  'Continuity testing': [4, 1, 'The full test sequence'],
  Polarity: [4, 1, 'The full test sequence'],
  Testing: [4, 1, 'The full test sequence'],
  GS38: [4, 2, 'Safe use of test instruments'],
  'Test Equipment': [4, 2, 'Safe use of test instruments'],
  Certification: [4, 3, 'Recording test results'],
  Documentation: [4, 3, 'Recording test results'],
  EICR: [4, 3, 'Recording test results'],
  Inspection: [4, 5, 'Identifying non-compliances'],
  'Common Faults': [5, 1, 'Typical AM2 faults'],
  'Cable Selection': [3, 1, 'Cable selection and containment'],
  'Wiring systems': [3, 1, 'Cable selection and containment'],
  'Risk Assessment': [2, 2, 'Risk assessments and method statements'],
  'HASAWA 1974': [6, 2, 'Knowledge test core topics'],
  'EAW 1989': [6, 2, 'Knowledge test core topics'],
  RIDDOR: [6, 2, 'Knowledge test core topics'],
  'CDM Regulations': [6, 2, 'Knowledge test core topics'],
  PPE: [6, 2, 'Knowledge test core topics'],
  'Working at Height': [6, 2, 'Knowledge test core topics'],
  'Electric Shock': [6, 2, 'Knowledge test core topics'],
  'Part P': [6, 2, 'Knowledge test core topics'],
  CPS: [6, 2, 'Knowledge test core topics'],
  'Building Control': [6, 2, 'Knowledge test core topics'],
  Compliance: [6, 2, 'Knowledge test core topics'],
  'Earthing Systems': [6, 2, 'Knowledge test core topics'],
  Overcurrent: [6, 2, 'Knowledge test core topics'],
  'Protective Devices': [6, 2, 'Knowledge test core topics'],
  'Special Locations': [6, 2, 'Knowledge test core topics'],
  'Additional protection': [6, 2, 'Knowledge test core topics'],
  Bonding: [6, 2, 'Knowledge test core topics'],
  'Warning Notices': [6, 2, 'Knowledge test core topics'],
  Definitions: [6, 2, 'Knowledge test core topics'],
};
