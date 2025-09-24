export interface RAMSTemplate {
  id: string;
  category: string;
  hazard: string;
  risk: string;
  likelihood: number;
  severity: number;
  controls: string;
  residualRisk: number;
  description: string;
  specificActivity: string;
  detailedControls: string[];
  ppe: string[];
  regulations: string[];
  furtherActions: string[];
  icon: string;
}

export const ramsTemplates: RAMSTemplate[] = [
  {
    id: 'elec-shock',
    category: 'Electrical Installation',
    hazard: 'Live electrical conductors and equipment',
    risk: 'Electric shock, burns, electrocution',
    likelihood: 3,
    severity: 5,
    controls: 'Isolation and lock-off procedures, voltage testing, emergency procedures in place.',
    residualRisk: 2,
    description: 'Electrical shock protection',
    specificActivity: 'Working on or near live electrical equipment',
    detailedControls: [
      'Prove dead testing using calibrated voltage detector',
      'Lock-off/tag-out procedures with personal padlocks',
      'Use appropriate PPE: insulated gloves (class 0 minimum)',
      'Maintain safe working distances from live parts',
      'Ensure emergency procedures are communicated to all personnel'
    ],
    ppe: ['Insulated gloves (Class 0)', 'Safety boots', 'Arc flash protection', 'Safety glasses'],
    regulations: ['BS 7671:2018+A2:2022', 'IET Code of Practice', 'HSE GS38'],
    furtherActions: ['Annual PPE inspection', 'Voltage detector calibration', 'Emergency response training'],
    icon: 'Zap'
  },
  {
    id: 'consumer-unit-upgrade',
    category: 'Electrical Installation',
    hazard: 'Live electrical work during consumer unit replacement',
    risk: 'Electric shock, arc flash, fire',
    likelihood: 2,
    severity: 5,
    controls: 'DNO isolation, proper earthing arrangements, RCD testing.',
    residualRisk: 1,
    description: 'Consumer unit upgrade work',
    specificActivity: 'Replacing consumer units and distribution boards',
    detailedControls: [
      'Arrange DNO isolation or use appropriate isolation procedures',
      'Verify earthing arrangements meet current standards',
      'Test all RCDs and MCBs before energisation',
      'Use temporary supply arrangements if required',
      'Complete electrical installation certificate'
    ],
    ppe: ['Arc flash suit', 'Insulated tools', 'Safety helmet', 'Insulated gloves'],
    regulations: ['BS 7671:2018+A2:2022', 'Part P Building Regulations', 'IET Guidance Note 3'],
    furtherActions: ['Schedule inspection and testing', 'Customer handover documentation'],
    icon: 'Home'
  },
  {
    id: 'ev-charging-install',
    category: 'EV Charging',
    hazard: 'High current electrical installation work',
    risk: 'Electric shock, overheating, fire',
    likelihood: 2,
    severity: 4,
    controls: 'Load calculations, proper earthing, RCD protection.',
    residualRisk: 1,
    description: 'EV charging point installation',
    specificActivity: 'Installing electric vehicle charging points',
    detailedControls: [
      'Calculate electrical load and supply capacity',
      'Install Type A RCD protection (30mA)',
      'Ensure adequate earthing and bonding',
      'Use appropriate cable sizing for load',
      'Install emergency stop facility where required'
    ],
    ppe: ['Standard electrical PPE', 'Safety boots', 'Hard hat', 'High-vis vest'],
    regulations: ['BS 7671:2018+A2:2022', 'IET Code of Practice for EV Charging', 'OLEV Grant Scheme Requirements'],
    furtherActions: ['Commission and test installation', 'Register with local authority'],
    icon: 'Car'
  },
  {
    id: 'working-height',
    category: 'Working at Height',
    hazard: 'Working above 2 metres on ladders, scaffolds, platforms',
    risk: 'Falls causing serious injury or death',
    likelihood: 2,
    severity: 5,
    controls: 'Use of proper access equipment, safety harnesses, edge protection.',
    residualRisk: 1,
    description: 'Fall protection measures',
    specificActivity: 'Electrical work at height including lighting installations',
    detailedControls: [
      'Use appropriate access equipment (scaffolds, MEWPs, ladders)',
      'Maintain three points of contact when using ladders',
      'Use safety harnesses and fall arrest systems',
      'Implement edge protection where required',
      'Regular equipment inspection and certification'
    ],
    ppe: ['Safety harness', 'Hard hat', 'Safety boots', 'High-vis clothing'],
    regulations: ['Work at Height Regulations 2005', 'HSE Guidance HSG33', 'IPAF guidance'],
    furtherActions: ['Equipment inspection certificates', 'MEWP operator training'],
    icon: 'Ladder'
  },
  {
    id: 'solar-pv-install',
    category: 'Renewable Energy',
    hazard: 'Roof work and DC electrical systems',
    risk: 'Falls, electric shock from DC systems',
    likelihood: 3,
    severity: 4,
    controls: 'Fall protection, DC isolation procedures, proper earthing.',
    residualRisk: 2,
    description: 'Solar PV installation',
    specificActivity: 'Installing solar photovoltaic systems',
    detailedControls: [
      'Use appropriate fall protection systems',
      'Install DC isolators in accessible locations',
      'Ensure proper earthing and bonding of metalwork',
      'Use MC4 connectors for all DC connections',
      'Install generation meter and export limitation if required'
    ],
    ppe: ['Fall arrest harness', 'Hard hat', 'Cut-resistant gloves', 'Safety boots'],
    regulations: ['BS 7671:2018+A2:2022', 'MCS Installation Standards', 'G99 Grid Code'],
    furtherActions: ['MCS certification', 'DNO notification', 'Insurance documentation'],
    icon: 'Sun'
  },
  {
    id: 'manual-handling',
    category: 'Manual Handling',
    hazard: 'Lifting, carrying, moving equipment and materials',
    risk: 'Back injury, muscle strain, cuts from sharp edges',
    likelihood: 3,
    severity: 2,
    controls: 'Mechanical lifting aids, team lifting, proper techniques.',
    residualRisk: 1,
    description: 'Safe lifting and handling',
    specificActivity: 'Moving electrical equipment and materials',
    detailedControls: [
      'Use mechanical lifting aids where possible (trolleys, hoists)',
      'Team lifting for items over 25kg',
      'Proper lifting techniques - bend knees, keep back straight',
      'Use cut-resistant gloves for sharp materials',
      'Clear pathways and good lighting'
    ],
    ppe: ['Cut-resistant gloves', 'Safety boots', 'Back support belt (if required)'],
    regulations: ['Manual Handling Operations Regulations 1992', 'HSE Guidance HSG115'],
    furtherActions: ['Manual handling training', 'Risk assessment review'],
    icon: 'Package'
  },
  {
    id: 'pat-testing',
    category: 'Testing & Inspection',
    hazard: 'Electrical testing of portable appliances',
    risk: 'Electric shock from faulty equipment',
    likelihood: 2,
    severity: 3,
    controls: 'Use calibrated test equipment, proper test procedures.',
    residualRisk: 1,
    description: 'PAT testing activities',
    specificActivity: 'Portable appliance testing and inspection',
    detailedControls: [
      'Use calibrated PAT testing equipment',
      'Follow IET Code of Practice testing procedures',
      'Visual inspection before electrical testing',
      'Apply appropriate test labels and documentation',
      'Maintain test equipment calibration records'
    ],
    ppe: ['Standard electrical PPE', 'Safety glasses'],
    regulations: ['IET Code of Practice for PAT', 'Electricity at Work Regulations 1989'],
    furtherActions: ['Equipment calibration certificates', 'Test result database'],
    icon: 'TestTube'
  },
  {
    id: 'eicr-inspection',
    category: 'Testing & Inspection',
    hazard: 'Live testing and inspection work',
    risk: 'Electric shock during live testing',
    likelihood: 3,
    severity: 4,
    controls: 'Safe testing procedures, appropriate test equipment.',
    residualRisk: 2,
    description: 'EICR inspection work',
    specificActivity: 'Electrical Installation Condition Reports',
    detailedControls: [
      'Use appropriate test equipment (multifunction testers)',
      'Follow safe testing procedures for live testing',
      'Obtain permission before testing (commercial premises)',
      'Document all observations and test results',
      'Provide clear recommendations for remedial work'
    ],
    ppe: ['Insulated gloves', 'Safety glasses', 'Arc flash protection'],
    regulations: ['BS 7671:2018+A2:2022', 'IET Guidance Note 3', 'Landlord & Tenant Act'],
    furtherActions: ['Schedule remedial work', 'Certificate registration'],
    icon: 'ClipboardCheck'
  },
  {
    id: 'fault-finding',
    category: 'Maintenance & Repair',
    hazard: 'Live fault finding and repair work',
    risk: 'Electric shock, arc flash during fault conditions',
    likelihood: 3,
    severity: 4,
    controls: 'Safe testing procedures, appropriate PPE, isolation where possible.',
    residualRisk: 2,
    description: 'Electrical fault diagnosis',
    specificActivity: 'Fault finding and repair on electrical installations',
    detailedControls: [
      'Use safe testing procedures and appropriate instruments',
      'Isolate circuits where possible for repair work',
      'Use insulated tools for live work',
      'Have emergency procedures in place',
      'Work with competent assistant where required'
    ],
    ppe: ['Arc flash suit', 'Insulated gloves', 'Insulated tools', 'Safety glasses'],
    regulations: ['Electricity at Work Regulations 1989', 'HSE GS38', 'BS 7671:2018+A2:2022'],
    furtherActions: ['Update circuit documentation', 'Schedule follow-up testing'],
    icon: 'Search'
  },
  {
    id: 'hot-work',
    category: 'Fire & Explosion',
    hazard: 'Hot work activities, flammable materials',
    risk: 'Fire, explosion, burns',
    likelihood: 2,
    severity: 4,
    controls: 'Hot work permits, fire watch, extinguishers on site.',
    residualRisk: 1,
    description: 'Fire prevention and protection',
    specificActivity: 'Hot work including soldering and thermal cutting',
    detailedControls: [
      'Obtain hot work permits where required',
      'Remove combustible materials from work area',
      'Have appropriate fire extinguishers available',
      'Maintain fire watch during and after hot work',
      'Ensure adequate ventilation'
    ],
    ppe: ['Fire-resistant clothing', 'Safety glasses', 'Heat-resistant gloves'],
    regulations: ['HSE HSG140 Safe use of work equipment', 'DSEAR Regulations'],
    furtherActions: ['Hot work permit documentation', 'Fire watch logs'],
    icon: 'Flame'
  },
  {
    id: 'chemical-exposure',
    category: 'Hazardous Materials',
    hazard: 'Exposure to chemicals, solvents, adhesives',
    risk: 'Chemical burns, respiratory problems, skin irritation',
    likelihood: 2,
    severity: 3,
    controls: 'Read safety data sheets, use appropriate PPE, ensure ventilation.',
    residualRisk: 1,
    description: 'Chemical safety protection',
    specificActivity: 'Use of electrical installation chemicals and adhesives',
    detailedControls: [
      'Read and understand safety data sheets',
      'Use appropriate chemical-resistant gloves',
      'Ensure adequate ventilation in work areas',
      'Have eye wash facilities available',
      'Store chemicals according to manufacturer instructions'
    ],
    ppe: ['Chemical-resistant gloves', 'Safety glasses', 'Respiratory protection', 'Protective clothing'],
    regulations: ['COSHH Regulations 2002', 'HSE Guidance HSG97'],
    furtherActions: ['COSHH assessments', 'Health surveillance if required'],
    icon: 'Beaker'
  },
  {
    id: 'cable-pulling',
    category: 'Installation Work',
    hazard: 'Manual handling of cables and pulling operations',
    risk: 'Back injury, cable whip, entanglement',
    likelihood: 3,
    severity: 2,
    controls: 'Use mechanical pulling aids, team work, proper techniques.',
    residualRisk: 1,
    description: 'Cable installation operations',
    specificActivity: 'Cable pulling and routing in buildings',
    detailedControls: [
      'Use cable pulling machines for long runs',
      'Ensure adequate workforce for manual pulls',
      'Use proper pulling lubricants to reduce friction',
      'Install cable supports at appropriate intervals',
      'Check cable integrity after installation'
    ],
    ppe: ['Work gloves', 'Safety boots', 'Hard hat', 'High-vis clothing'],
    regulations: ['Manual Handling Operations Regulations 1992', 'BS 7671:2018+A2:2022'],
    furtherActions: ['Cable test certificates', 'Installation documentation'],
    icon: 'Cable'
  },
  {
    id: 'noise-exposure',
    category: 'Environmental',
    hazard: 'Power tools, drilling, cutting operations',
    risk: 'Hearing damage, noise-induced hearing loss',
    likelihood: 4,
    severity: 2,
    controls: 'Hearing protection, regular breaks, noise monitoring.',
    residualRisk: 1,
    description: 'Hearing protection',
    specificActivity: 'Use of power tools and noisy equipment',
    detailedControls: [
      'Use appropriate hearing protection (ear defenders/plugs)',
      'Take regular breaks from noisy activities',
      'Monitor noise levels with sound meter if required',
      'Use low-noise tools where available',
      'Coordinate noisy work to minimise exposure'
    ],
    ppe: ['Ear defenders', 'Ear plugs', 'Noise-reducing headsets'],
    regulations: ['Control of Noise at Work Regulations 2005', 'HSE Guidance L108'],
    furtherActions: ['Audiometric testing', 'Noise exposure records'],
    icon: 'Volume2'
  },
  {
    id: 'confined-space',
    category: 'Environmental',
    hazard: 'Working in confined spaces (ducts, voids, plant rooms)',
    risk: 'Asphyxiation, entrapment, difficulty in emergency evacuation',
    likelihood: 2,
    severity: 4,
    controls: 'Confined space procedures, atmospheric testing, emergency rescue plan.',
    residualRisk: 1,
    description: 'Confined space safety',
    specificActivity: 'Electrical work in confined spaces and restricted areas',
    detailedControls: [
      'Implement confined space entry procedures',
      'Test atmosphere for oxygen, flammable gases, toxic substances',
      'Establish emergency rescue procedures',
      'Use communication systems (radios, attendant)',
      'Have trained attendant outside confined space'
    ],
    ppe: ['Gas detection equipment', 'Breathing apparatus', 'Harness and retrieval lines'],
    regulations: ['Confined Spaces Regulations 1997', 'HSE ACOP L101'],
    furtherActions: ['Gas monitoring records', 'Emergency rescue training'],
    icon: 'Home'
  },
  {
    id: 'fire-alarm-install',
    category: 'Specialised Systems',
    hazard: 'Fire alarm system installation and commissioning',
    risk: 'Disruption to existing fire safety, electrical hazards',
    likelihood: 2,
    severity: 3,
    controls: 'Coordinate with building management, test procedures, temporary measures.',
    residualRisk: 1,
    description: 'Fire alarm system work',
    specificActivity: 'Installation and maintenance of fire detection systems',
    detailedControls: [
      'Coordinate work with building fire safety officer',
      'Implement temporary fire safety measures during installation',
      'Follow BS 5839 design and installation standards',
      'Commission system in stages to maintain protection',
      'Provide comprehensive system documentation'
    ],
    ppe: ['Standard electrical PPE', 'High-vis clothing'],
    regulations: ['BS 5839-1:2017', 'Regulatory Reform (Fire Safety) Order 2005'],
    furtherActions: ['System commissioning certificates', 'User training'],
    icon: 'Shield'
  },
  {
    id: 'tool-safety',
    category: 'Tools & Equipment',
    hazard: 'Power tools, hand tools, defective equipment',
    risk: 'Cuts, crushing, electric shock from faulty tools',
    likelihood: 3,
    severity: 3,
    controls: 'Daily tool inspections, PAT testing, proper storage and handling.',
    residualRisk: 1,
    description: 'Tool and equipment safety',
    specificActivity: 'Use and maintenance of electrical tools and equipment',
    detailedControls: [
      'Conduct daily visual inspections of all tools',
      'PAT test all portable electrical tools annually',
      'Store tools properly in designated locations',
      'Train personnel in correct tool usage',
      'Remove defective tools from service immediately'
    ],
    ppe: ['Cut-resistant gloves', 'Safety glasses', 'Dust masks'],
    regulations: ['PUWER Regulations 1998', 'Electricity at Work Regulations 1989'],
    furtherActions: ['Tool inspection logs', 'PAT testing certificates'],
    icon: 'Wrench'
  }
];

export const getTemplatesByCategory = (category?: string): RAMSTemplate[] => {
  if (!category) return ramsTemplates;
  return ramsTemplates.filter(template => template.category === category);
};

export const getTemplateById = (id: string): RAMSTemplate | undefined => {
  return ramsTemplates.find(template => template.id === id);
};