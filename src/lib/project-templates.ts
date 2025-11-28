export interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  complexity: 'Simple' | 'Moderate' | 'Complex';
  estimatedDuration: string;
  category: 'domestic' | 'commercial' | 'industrial';
  isPopular?: boolean;
  promptTemplate: string;
}

export const DOMESTIC_TEMPLATES: ProjectTemplate[] = [
  {
    id: 'dom-1bed-rewire',
    name: '1-Bed Flat Rewire',
    description: 'Complete rewiring of a single bedroom flat including new consumer unit and testing',
    complexity: 'Simple',
    estimatedDuration: '3-4 days',
    category: 'domestic',
    isPopular: true,
    promptTemplate: 'Plan a complete rewire for a 1-bedroom flat including new consumer unit, circuits for lighting, sockets, cooker, and shower. Include all testing and certification.'
  },
  {
    id: 'dom-3bed-rewire',
    name: '3-Bed House Rewire',
    description: 'Full house rewire with modern consumer unit and smart home preparation',
    complexity: 'Moderate',
    estimatedDuration: '6-8 days',
    category: 'domestic',
    isPopular: true,
    promptTemplate: 'Plan a full rewire for a 3-bedroom house with 2 floors. Include new consumer unit, lighting circuits, socket circuits, cooker, shower, and provision for future smart home integration.'
  },
  {
    id: 'dom-kitchen-ext',
    name: 'Kitchen Extension',
    description: 'Electrical installation for new kitchen extension with appliances',
    complexity: 'Simple',
    estimatedDuration: '2-3 days',
    category: 'domestic',
    promptTemplate: 'Plan electrical installation for a new kitchen extension. Include circuits for oven, hob, extractor, under-cabinet lighting, sockets, and dishwasher.'
  },
  {
    id: 'dom-cu-upgrade',
    name: 'Consumer Unit Upgrade',
    description: 'Replace old fuse box with modern RCD consumer unit',
    complexity: 'Simple',
    estimatedDuration: '1 day',
    category: 'domestic',
    isPopular: true,
    promptTemplate: 'Plan replacement of existing consumer unit with new 18th Edition compliant unit. Include RCBO protection, surge protection, and testing of all existing circuits.'
  },
  {
    id: 'dom-ev-charger',
    name: 'EV Charger Installation',
    description: 'Install electric vehicle charging point with dedicated supply',
    complexity: 'Simple',
    estimatedDuration: '1 day',
    category: 'domestic',
    promptTemplate: 'Plan installation of 7kW EV charger on driveway. Include dedicated circuit from consumer unit, appropriate cabling, and testing.'
  },
  {
    id: 'dom-bathroom',
    name: 'Bathroom Refit',
    description: 'Electrical work for bathroom renovation with new fittings',
    complexity: 'Simple',
    estimatedDuration: '1-2 days',
    category: 'domestic',
    promptTemplate: 'Plan electrical installation for bathroom renovation. Include circuits for extractor fan, mirror with shaver socket, downlights, and electric shower upgrade.'
  }
];

export const COMMERCIAL_TEMPLATES: ProjectTemplate[] = [
  {
    id: 'com-office-fitout',
    name: 'Office Fit-Out',
    description: 'Complete electrical installation for new office space',
    complexity: 'Moderate',
    estimatedDuration: '5-7 days',
    category: 'commercial',
    isPopular: true,
    promptTemplate: 'Plan electrical installation for 200m² office fit-out. Include LED lighting with PIR sensors, power distribution to desks, kitchen area, server room preparation, and fire alarm system.'
  },
  {
    id: 'com-retail-unit',
    name: 'Retail Unit Installation',
    description: 'Shop electrical installation with display lighting and security',
    complexity: 'Moderate',
    estimatedDuration: '4-5 days',
    category: 'commercial',
    promptTemplate: 'Plan electrical installation for retail shop unit. Include track lighting for displays, general lighting, payment terminal circuits, security alarm, and emergency lighting.'
  },
  {
    id: 'com-restaurant',
    name: 'Restaurant Kitchen',
    description: 'Heavy-duty electrical installation for commercial kitchen',
    complexity: 'Complex',
    estimatedDuration: '6-8 days',
    category: 'commercial',
    isPopular: true,
    promptTemplate: 'Plan electrical installation for commercial kitchen. Include 3-phase supply for ovens and fryers, extraction system, refrigeration circuits, prep area lighting, and dishwasher circuits.'
  },
  {
    id: 'com-server-room',
    name: 'Server Room Setup',
    description: 'IT infrastructure with UPS and redundant power',
    complexity: 'Complex',
    estimatedDuration: '3-4 days',
    category: 'commercial',
    promptTemplate: 'Plan electrical installation for server room. Include dual-feed PDUs, UPS integration, dedicated cooling circuits, cable management, and monitoring systems.'
  },
  {
    id: 'com-emergency-light',
    name: 'Emergency Lighting',
    description: 'Full emergency lighting system with central battery',
    complexity: 'Moderate',
    estimatedDuration: '2-3 days',
    category: 'commercial',
    promptTemplate: 'Plan installation of emergency lighting system for commercial building. Include escape route lighting, open area lighting, central battery system, and testing documentation.'
  },
  {
    id: 'com-cctv-access',
    name: 'CCTV & Access Control',
    description: 'Integrated security system installation',
    complexity: 'Moderate',
    estimatedDuration: '3-4 days',
    category: 'commercial',
    promptTemplate: 'Plan installation of integrated security system. Include CCTV cameras with PoE, door access control, intercom system, and central monitoring station.'
  }
];

export const INDUSTRIAL_TEMPLATES: ProjectTemplate[] = [
  {
    id: 'ind-factory-dist',
    name: 'Factory Floor Distribution',
    description: 'Heavy industrial power distribution system',
    complexity: 'Complex',
    estimatedDuration: '7-10 days',
    category: 'industrial',
    isPopular: true,
    promptTemplate: 'Plan electrical distribution for factory floor. Include 3-phase busbar system, machine isolation points, overhead cable management, and sub-distribution boards for different zones.'
  },
  {
    id: 'ind-machine-shop',
    name: 'Machine Shop Setup',
    description: 'Electrical installation for workshop machinery',
    complexity: 'Moderate',
    estimatedDuration: '4-5 days',
    category: 'industrial',
    promptTemplate: 'Plan electrical installation for machine shop. Include 3-phase supplies for lathes and mills, single-phase for bench equipment, overhead lighting, and workshop sockets.'
  },
  {
    id: 'ind-warehouse',
    name: 'Warehouse Lighting',
    description: 'High-bay LED lighting with controls',
    complexity: 'Moderate',
    estimatedDuration: '3-4 days',
    category: 'industrial',
    isPopular: true,
    promptTemplate: 'Plan LED high-bay lighting installation for warehouse. Include daylight and occupancy sensors, emergency lighting integration, and zoned switching.'
  },
  {
    id: 'ind-compressor',
    name: 'Compressor Room',
    description: 'Heavy-duty installation for air compressors',
    complexity: 'Moderate',
    estimatedDuration: '2-3 days',
    category: 'industrial',
    promptTemplate: 'Plan electrical installation for compressor room. Include 3-phase supplies for two compressors, controls and interlocks, extraction fan, and local lighting.'
  },
  {
    id: 'ind-mcc',
    name: 'Motor Control Centre',
    description: 'Complete MCC installation with VFDs',
    complexity: 'Complex',
    estimatedDuration: '5-7 days',
    category: 'industrial',
    promptTemplate: 'Plan installation of motor control centre. Include incoming supply, multiple VFD starters, soft starters, DOL starters, control circuits, and HMI panel.'
  },
  {
    id: 'ind-welding-bay',
    name: 'Welding Bay Setup',
    description: 'Heavy-duty welding station installation',
    complexity: 'Moderate',
    estimatedDuration: '2-3 days',
    category: 'industrial',
    promptTemplate: 'Plan electrical installation for welding bay. Include 3-phase supplies for welding machines, extraction system, local lighting, and emergency stop system.'
  }
];

export const ALL_TEMPLATES = [
  ...DOMESTIC_TEMPLATES,
  ...COMMERCIAL_TEMPLATES,
  ...INDUSTRIAL_TEMPLATES
];
