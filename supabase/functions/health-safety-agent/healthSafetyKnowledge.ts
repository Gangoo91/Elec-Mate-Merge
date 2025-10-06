// Phase 2: Health & Safety Knowledge Base with ACOP Integration
// Data from src/data/healthAndSafety/ + ACOPs

export interface SafetyGuideline {
  id: string;
  category: string;
  title: string;
  content: string;
  regulation: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  acop?: string; // ACOP reference if applicable
}

// ACOPs (Approved Codes of Practice) - quasi-legal guidance
export interface ACOPGuideline {
  acop_number: string;
  title: string;
  regulation: string;
  applies_to: string[];
  key_requirements: string[];
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
    severity: 'critical',
    acop: 'L101'
  },
  {
    id: 'cdm-001',
    category: 'construction',
    title: 'CDM Duties - Principal Contractor',
    content: 'Principal Contractor must: (1) Plan, manage and monitor construction work, (2) Prepare construction phase plan before work starts, (3) Liaise with principal designer, (4) Provide site induction, (5) Ensure workers are suitably trained, (6) Display F10 notification.',
    regulation: 'CDM Regulations 2015',
    severity: 'high',
    acop: 'L153'
  },
  {
    id: 'cdm-002',
    category: 'construction',
    title: 'Pre-Construction Information',
    content: 'Before starting work, you MUST receive pre-construction information including: site hazards (asbestos, underground services), existing drawings, previous use of building, environmental restrictions. If not provided, challenge the client/principal designer.',
    regulation: 'CDM 2015 Reg 4',
    severity: 'high',
    acop: 'L153'
  },
  {
    id: 'wah-003',
    category: 'working-at-height',
    title: 'Work at Height Hierarchy',
    content: 'Legal hierarchy of controls: (1) Avoid work at height where possible, (2) Use existing place of work that is already safe, (3) Use work equipment to prevent falls (guardrails, working platforms), (4) Minimise distance and consequences (nets, airbags), (5) Last resort: personal fall protection (harness).',
    regulation: 'Work at Height Regulations 2005 Reg 6',
    severity: 'critical',
    acop: 'L138'
  },
  {
    id: 'wah-004',
    category: 'working-at-height',
    title: 'Mobile Elevated Work Platforms (MEWPs)',
    content: 'MEWP operators must hold valid IPAF or PASMA card. Before use: (1) Check ground conditions, (2) Set up on level surface, (3) Check wind speed (<12.5 m/s for most MEWPs), (4) Wear harness attached to anchor point, (5) Check emergency lowering function.',
    regulation: 'Work at Height Regulations 2005',
    severity: 'high',
    acop: 'L138'
  },
  {
    id: 'coshh-001',
    category: 'hazardous-substances',
    title: 'Cable Lubricants and Jointing Compounds',
    content: 'Cable pulling lubricants, jointing compounds, and solvents require COSHH assessment. (1) Check Safety Data Sheet (SDS), (2) Ensure adequate ventilation, (3) Use appropriate gloves (nitrile for most chemicals), (4) Store in original containers, (5) Dispose of as hazardous waste.',
    regulation: 'COSHH Regulations 2002',
    severity: 'medium',
    acop: 'L5'
  },
  {
    id: 'asb-001',
    category: 'asbestos',
    title: 'Asbestos Survey Requirements',
    content: 'For buildings constructed/refurbished before 2000, you must have an asbestos survey BEFORE starting work. Types: (1) Management survey (identifies presence), (2) Refurbishment/demolition survey (intrusive). If ACMs present, only licensed contractors can remove. DO NOT drill/cut suspected materials.',
    regulation: 'Control of Asbestos Regulations 2012',
    severity: 'critical',
    acop: 'L143'
  },
  {
    id: 'asb-002',
    category: 'asbestos',
    title: 'Non-Licensed Asbestos Work',
    content: 'Electricians can do minor work with asbestos (e.g., drilling through AIB to fix cable clips) if: (1) Work is <1 hour in 7 days, (2) Material in good condition, (3) Use HEPA vacuum and wet methods, (4) RPE worn (FFP3 mask minimum), (5) Notify building manager. This is NOT licensed work but still regulated.',
    regulation: 'Control of Asbestos Regulations 2012 Reg 3(2)',
    severity: 'high',
    acop: 'L143'
  },
  {
    id: 'noise-001',
    category: 'noise',
    title: 'Noise Exposure Limits',
    content: 'Lower exposure action level: 80dB(A) daily/135dB(C) peak - provide hearing protection. Upper exposure action level: 85dB(A) daily/137dB(C) peak - hearing protection MANDATORY, hearing zones marked. Exposure limit: 87dB(A)/140dB(C) - must not be exceeded. Typical noisy tools: angle grinder (100dB), hammer drill (98dB).',
    regulation: 'Control of Noise at Work Regulations 2005',
    severity: 'medium',
    acop: 'L108'
  },
  {
    id: 'vib-001',
    category: 'vibration',
    title: 'Hand-Arm Vibration (HAV)',
    content: 'Daily exposure action value: 2.5 m/s². Daily exposure limit: 5 m/s². High-vibration tools: breakers (12+ m/s²), grinders (6 m/s²), hammer drills (9 m/s²). Controls: (1) Use low-vibration tools, (2) Limit exposure time, (3) Health surveillance for regular users, (4) Report tingling/numbness immediately.',
    regulation: 'Control of Vibration at Work Regulations 2005',
    severity: 'medium',
    acop: 'L140'
  },
  {
    id: 'fire-001',
    category: 'fire-safety',
    title: 'Hot Work Permits',
    content: 'Hot work (welding, grinding, soldering, flame cutting) requires permit in occupied buildings. Permit must specify: (1) Fire watch during and 60 mins after, (2) Combustibles removed/covered within 10m, (3) Extinguisher present (CO2 or dry powder), (4) Smoke/heat detectors isolated if required, (5) Permit holder name.',
    regulation: 'Regulatory Reform (Fire Safety) Order 2005',
    severity: 'high',
    acop: 'Fire Safety Risk Assessments - L64'
  },
  {
    id: 'manual-001',
    category: 'manual-handling',
    title: 'Cable Drum Handling',
    content: 'Large cable drums (>25kg) require mechanical handling or team lift. (1) Assess load weight before lifting, (2) Use drum jack or forklift for >50kg, (3) Team lift: minimum 2 people for 25-50kg, (4) Roll drums, never carry, (5) Use gloves to prevent hand injuries from drum flanges.',
    regulation: 'Manual Handling Operations Regulations 1992',
    severity: 'medium',
    acop: 'L23'
  },
  {
    id: 'lone-001',
    category: 'lone-working',
    title: 'Lone Worker Safety',
    content: 'When working alone (common for domestic jobs): (1) Inform someone of location and expected finish time, (2) Carry charged mobile phone, (3) Avoid high-risk activities (live work, work at height >2m) without supervision, (4) Check in at regular intervals, (5) Emergency contact card visible in van.',
    regulation: 'HASAWA 1974 Section 2',
    severity: 'high',
    acop: 'L21 (Management of H&S)'
  }
];

// ACOP Guidelines Database
export const acopGuidelines: ACOPGuideline[] = [
  {
    acop_number: 'L138',
    title: 'Working at Height - A Brief Guide',
    regulation: 'Work at Height Regulations 2005',
    applies_to: ['working-at-height', 'ladders', 'scaffolds', 'platforms'],
    key_requirements: [
      'Avoid work at height where possible',
      'Use existing safe place of work',
      'Prevent falls using guardrails/barriers',
      'Minimise distance/consequences of falls',
      'Instruction and training for all workers',
      'Inspect work equipment before use'
    ],
    severity: 'critical'
  },
  {
    acop_number: 'L153',
    title: 'Managing Health & Safety in Construction (CDM 2015)',
    regulation: 'Construction (Design and Management) Regulations 2015',
    applies_to: ['construction', 'refurbishment', 'demolition', 'commercial'],
    key_requirements: [
      'Appoint principal designer and principal contractor',
      'Prepare pre-construction information',
      'Notify HSE for projects >30 days or >500 person-days',
      'Prepare construction phase plan',
      'Consult and engage with workers',
      'Provide site induction and welfare facilities'
    ],
    severity: 'high'
  },
  {
    acop_number: 'L5',
    title: 'Control of Substances Hazardous to Health (COSHH)',
    regulation: 'COSHH Regulations 2002',
    applies_to: ['chemicals', 'substances', 'dusts', 'fumes'],
    key_requirements: [
      'Identify hazardous substances (Safety Data Sheets)',
      'Assess risks to health',
      'Decide on precautions needed',
      'Prevent/control exposure',
      'Ensure control measures are used and maintained',
      'Monitor exposure where necessary',
      'Health surveillance where appropriate',
      'Inform, instruct and train employees'
    ],
    severity: 'high'
  },
  {
    acop_number: 'L143',
    title: 'Managing and Working with Asbestos',
    regulation: 'Control of Asbestos Regulations 2012',
    applies_to: ['asbestos', 'refurbishment', 'demolition', 'pre-2000 buildings'],
    key_requirements: [
      'Duty to manage asbestos in non-domestic premises',
      'Asbestos survey before refurbishment/demolition',
      'Licensed contractors for most asbestos removal',
      'Notification to HSE before licensable work',
      'Non-licensed work limits (<1 hour, low risk)',
      'RPE (FFP3 minimum) for any asbestos work',
      'Medical surveillance for regular asbestos workers'
    ],
    severity: 'critical'
  },
  {
    acop_number: 'L101',
    title: 'Confined Spaces Regulations',
    regulation: 'Confined Spaces Regulations 1997',
    applies_to: ['confined-spaces', 'ducts', 'voids', 'tanks', 'lofts'],
    key_requirements: [
      'Avoid entry where possible (work from outside)',
      'Safe system of work if entry necessary',
      'Permit to work system',
      'Atmospheric testing and monitoring',
      'Emergency rescue arrangements',
      'Training for entrants and rescue team',
      'Suitable breathing apparatus available'
    ],
    severity: 'critical'
  },
  {
    acop_number: 'L21',
    title: 'Management of Health and Safety at Work',
    regulation: 'Management of H&S at Work Regulations 1999',
    applies_to: ['all work activities'],
    key_requirements: [
      'Suitable and sufficient risk assessments',
      'Implement preventive and protective measures',
      'Appoint competent persons',
      'Establish emergency procedures',
      'Provide information to employees',
      'Cooperate with other employers',
      'Ensure employees have adequate H&S training'
    ],
    severity: 'high'
  },
  {
    acop_number: 'L22',
    title: 'Safe Use of Work Equipment (PUWER)',
    regulation: 'Provision and Use of Work Equipment Regulations 1998',
    applies_to: ['tools', 'equipment', 'machinery'],
    key_requirements: [
      'Equipment suitable for intended use',
      'Maintain equipment in safe condition',
      'Inspection and testing regimes',
      'Information, instruction and training',
      'Protection against dangerous parts',
      'Controls clearly marked and accessible',
      'Isolate from power sources for maintenance'
    ],
    severity: 'high'
  },
  {
    acop_number: 'L108',
    title: 'Controlling Noise at Work',
    regulation: 'Control of Noise at Work Regulations 2005',
    applies_to: ['noisy tools', 'construction sites'],
    key_requirements: [
      'Assess noise exposure levels',
      'Eliminate or reduce noise at source',
      'Provide hearing protection at 80dB(A)',
      'Enforce hearing protection at 85dB(A)',
      'Mark hearing protection zones',
      'Health surveillance for high-risk workers',
      'Information and training on noise risks'
    ],
    severity: 'medium'
  },
  {
    acop_number: 'L140',
    title: 'Hand-Arm Vibration (HAV)',
    regulation: 'Control of Vibration at Work Regulations 2005',
    applies_to: ['power tools', 'vibrating equipment'],
    key_requirements: [
      'Assess vibration exposure (m/s²)',
      'Eliminate or reduce vibration at source',
      'Action level: 2.5 m/s² (implement controls)',
      'Limit: 5 m/s² (must not exceed)',
      'Health surveillance for regular users',
      'Information and training on vibration',
      'Maintenance and inspection of tools'
    ],
    severity: 'medium'
  },
  {
    acop_number: 'L23',
    title: 'Manual Handling Operations',
    regulation: 'Manual Handling Operations Regulations 1992',
    applies_to: ['lifting', 'carrying', 'cable drums', 'equipment'],
    key_requirements: [
      'Avoid manual handling where possible',
      'Assess risks for unavoidable handling',
      'Reduce risk of injury (mechanical aids)',
      'Team lifting for loads >25kg',
      'Training in safe lifting techniques',
      'Individual capability assessment',
      'Review assessments regularly'
    ],
    severity: 'medium'
  }
];

// Search by category
export function getGuidelinesByCategory(category: string): SafetyGuideline[] {
  return electricalSafetyGuidelines.filter(g => g.category === category);
}

// Get hazards for specific work type (now includes ACOP-relevant guidelines)
export function getHazardsForWork(workType: string): SafetyGuideline[] {
  const workTypeMap: Record<string, string[]> = {
    'shower': ['elec-002', 'elec-004', 'ppe-001', 'coshh-001'],
    'outdoor': ['elec-004', 'haz-001', 'manual-001', 'lone-001'],
    'commercial': ['elec-005', 'wah-002', 'cdm-001', 'cdm-002', 'noise-001', 'asb-001'],
    'excavation': ['haz-001', 'manual-001', 'lone-001'],
    'bathroom': ['elec-002', 'elec-004', 'wah-003', 'asb-001'],
    'consumer-unit': ['elec-002', 'elec-003', 'ppe-001', 'elec-005', 'fire-001', 'asb-001'],
    'height': ['wah-003', 'wah-004', 'wah-001', 'wah-002'],
    'confined': ['haz-003', 'elec-002', 'noise-001'],
    'refurbishment': ['asb-001', 'asb-002', 'cdm-001', 'cdm-002', 'noise-001', 'vib-001'],
  };

  const hazardIds = workTypeMap[workType.toLowerCase()] || ['elec-002', 'elec-003', 'lone-001'];
  return electricalSafetyGuidelines.filter(g => hazardIds.includes(g.id));
}

// Get relevant ACOPs for work type
export function getACOPsForWork(workType: string): ACOPGuideline[] {
  const workTypeMap: Record<string, string[]> = {
    'shower': [],
    'outdoor': ['L21'],
    'commercial': ['L153', 'L143', 'L108', 'L21'],
    'excavation': ['L21'],
    'bathroom': ['L143', 'L21'],
    'consumer-unit': ['L143', 'L21'],
    'height': ['L138'],
    'confined': ['L101'],
    'refurbishment': ['L153', 'L143', 'L108', 'L140', 'L21'],
    'general': ['L21']
  };

  const acopNumbers = workTypeMap[workType.toLowerCase()] || ['L21'];
  return acopGuidelines.filter(acop => acopNumbers.includes(acop.acop_number));
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
