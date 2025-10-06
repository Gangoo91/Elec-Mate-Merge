// Phase 2: Health & Safety Knowledge Base
// Data from src/data/healthAndSafety/

export interface SafetyGuideline {
  id: string;
  category: string;
  title: string;
  content: string;
  regulation: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
}

export const electricalSafetyGuidelines: SafetyGuideline[] = [
  {
    id: 'elec-001',
    category: 'electrical-safety',
    title: 'Live Work Prohibition',
    content: 'Live work is PROHIBITED unless: (1) It is unreasonable for work to be done dead, (2) Suitable precautions are taken to prevent injury. EWR 1989 Reg 14 requires work to be done dead wherever practicable.',
    regulation: 'EWR 1989 Reg 14',
    severity: 'critical'
  },
  {
    id: 'elec-002',
    category: 'electrical-safety',
    title: 'Safe Isolation Procedure',
    content: 'Safe isolation procedure: (1) Identify circuit, (2) Isolate at appropriate point, (3) Secure isolation (lock-off), (4) Test voltage indicator on known live source, (5) Test for dead on ALL conductors, (6) Re-test voltage indicator, (7) Fit earthing/short-circuiting where required.',
    regulation: 'BS 7671 Reg 537.2 / EWR 1989 Reg 12',
    severity: 'critical'
  },
  {
    id: 'elec-003',
    category: 'electrical-safety',
    title: 'Voltage Indicator Requirements',
    content: 'Voltage indicators must: (1) Be proven on known live source before AND after testing, (2) Comply with GS 38 for leads/probes, (3) Be suitable for voltage being tested, (4) Have valid calibration certificate.',
    regulation: 'GS 38 / EWR 1989 Reg 4(4)',
    severity: 'critical'
  },
  {
    id: 'elec-004',
    category: 'electrical-safety',
    title: 'RCD Protection for Outdoor Equipment',
    content: 'All socket-outlets supplying equipment outdoors must be protected by 30mA RCD (BS 7671 Reg 411.3.3). This includes tools, temporary lighting, equipment used in gardens.',
    regulation: 'BS 7671 Reg 411.3.3',
    severity: 'high'
  },
  {
    id: 'elec-005',
    category: 'electrical-safety',
    title: 'Arc Flash Protection',
    content: 'When working on or near live equipment >230V, assess arc flash risk. PPE may include: FR rated clothing (min 8 cal/cm²), face shield, insulated gloves, hearing protection. Calculate incident energy or use PPE category method.',
    regulation: 'EWR 1989 Reg 4(3) / NFPA 70E',
    severity: 'high'
  },
  {
    id: 'wah-001',
    category: 'working-at-height',
    title: 'Ladder Use Restrictions',
    content: 'Ladders for access only, max 9m vertical rise. Not for prolonged work. 1:4 angle (75°). Must be secured (tied at top) or footed. Never stand above 3rd rung from top. Risk assessment required for >30 min work.',
    regulation: 'Work at Height Regulations 2005',
    severity: 'high'
  },
  {
    id: 'wah-002',
    category: 'working-at-height',
    title: 'Scaffold Requirements',
    content: 'Scaffold must: (1) Be erected by competent person (CISRS card), (2) Have handover certificate (SG4), (3) Be inspected every 7 days and after weather, (4) Have toe boards and guardrails, (5) Not be modified without supervisor approval.',
    regulation: 'Work at Height Regulations 2005 / SG4:15',
    severity: 'high'
  },
  {
    id: 'ppe-001',
    category: 'ppe',
    title: 'Insulated Gloves',
    content: 'Insulated gloves for electrical work must comply with BS EN 60903. Class 0 (max 1000V AC) for domestic. Class 1 (max 7500V AC) for industrial. Visual inspection before each use for damage. 6-month electrical testing.',
    regulation: 'BS EN 60903 / EWR 1989',
    severity: 'critical'
  },
  {
    id: 'ppe-002',
    category: 'ppe',
    title: 'Safety Footwear',
    content: 'Safety boots must meet BS EN ISO 20345. Minimum S3 rating (toe protection, midsole, slip resistance, water resistance). Electrical hazard (EH) rated boots for live work. Replace when sole worn >4mm.',
    regulation: 'BS EN ISO 20345',
    severity: 'medium'
  },
  {
    id: 'haz-001',
    category: 'hazards',
    title: 'Underground Cable Detection',
    content: 'Before excavation: (1) Obtain service plans, (2) Use CAT scanner (Cable Avoidance Tool) and Genny, (3) Hand dig trial holes to locate, (4) Mark cable route clearly, (5) Use safe dig practices (no power tools within 500mm).',
    regulation: 'HSG47 / EWR 1989',
    severity: 'critical'
  },
  {
    id: 'haz-002',
    category: 'hazards',
    title: 'Asbestos Awareness',
    content: 'Buildings pre-2000 may contain asbestos. Never drill/cut/disturb suspected ACM. Stop work immediately if grey/white fibrous material found. Do not use power tools. Report to supervisor. Only licensed contractors can remove.',
    regulation: 'Control of Asbestos Regulations 2012',
    severity: 'critical'
  },
  {
    id: 'haz-003',
    category: 'hazards',
    title: 'Confined Spaces',
    content: 'Confined space = enclosed space with serious risk (lack of O2, gas, drowning). Examples: ducts, voids, lofts with limited ventilation. Requires: (1) Permit to work, (2) Gas monitoring, (3) Rescue plan, (4) Communication system.',
    regulation: 'Confined Spaces Regulations 1997',
    severity: 'critical'
  }
];

// Search by category
export function getGuidelinesByCategory(category: string): SafetyGuideline[] {
  return electricalSafetyGuidelines.filter(g => g.category === category);
}

// Get hazards for specific work type
export function getHazardsForWork(workType: string): SafetyGuideline[] {
  const workTypeMap: Record<string, string[]> = {
    'shower': ['elec-002', 'elec-004', 'ppe-001'],
    'outdoor': ['elec-004', 'haz-001'],
    'commercial': ['elec-005', 'wah-002'],
    'excavation': ['haz-001'],
    'bathroom': ['elec-002', 'elec-004'],
    'consumer-unit': ['elec-002', 'elec-003', 'ppe-001', 'elec-005'],
  };

  const hazardIds = workTypeMap[workType.toLowerCase()] || ['elec-002', 'elec-003'];
  return electricalSafetyGuidelines.filter(g => hazardIds.includes(g.id));
}

// Emergency procedures
export const emergencyProcedures = {
  electricShock: [
    'DO NOT touch the victim if still in contact with electricity',
    'Isolate the power source immediately (switch off at consumer unit)',
    'If unable to isolate, use insulated object (dry wooden pole) to break contact',
    'Call 999 for ambulance',
    'If unconscious and not breathing, start CPR (chest compressions)',
    'Place in recovery position if breathing',
    'Stay with victim until help arrives',
    'Report incident to HSE (RIDDOR) if serious injury'
  ],
  arcFlash: [
    'Evacuate area immediately',
    'Do NOT attempt to fight electrical fires with water',
    'Use CO2 or dry powder extinguisher if safe to do so',
    'Call 999 for fire brigade',
    'If clothing on fire: STOP, DROP, ROLL',
    'Treat burns with cool running water (20 mins)',
    'Seek medical attention for all electrical burns',
    'Isolate power if safe to do so'
  ],
  fire: [
    'Raise alarm immediately',
    'Evacuate to assembly point',
    'Call 999',
    'Isolate power supply if safe to do so',
    'Use appropriate extinguisher (CO2/dry powder for electrical)',
    'Never use water on electrical fires',
    'Do not re-enter building until fire service confirms safe'
  ]
};
