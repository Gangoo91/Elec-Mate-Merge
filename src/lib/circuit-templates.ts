import { CircuitPreset } from '@/types/installation-design';

export const DEFAULT_CABLE_LENGTHS = {
  domestic: {
    'socket': 25,
    'lighting': 20,
    'cooker': 10,
    'shower': 15,
    'ev-charger': 20,
    'immersion': 12,
    'heating': 15,
    'smoke-alarm': 20,
    'garage': 25,
    'outdoor': 25
  },
  commercial: {
    'office-sockets': 30,
    'emergency-lighting': 40,
    'hvac': 25,
    'server-room': 25,
    'kitchen-equipment': 20,
    'signage': 15,
    'fire-alarm': 35,
    'access-control': 30,
    'cctv': 30,
    'data-cabinet': 25,
    'lighting': 30
  },
  industrial: {
    'three-phase-motor': 40,
    'machine-tool': 40,
    'welding': 35,
    'conveyor': 50,
    'extraction': 45,
    'control-panel': 30,
    'overhead-lighting': 50,
    'workshop-sockets': 35,
    'compressor': 40,
    'production-line': 45
  }
} as const;

export const DOMESTIC_TEMPLATES: CircuitPreset[] = [
  {
    id: 'house-rewire',
    name: 'Complete House Rewire',
    description: '8 circuits - Full domestic installation',
    circuits: [
      { name: 'Kitchen Ring', loadType: 'socket', loadPower: 7360, phases: 'single', specialLocation: 'kitchen' },
      { name: 'Living Room Sockets', loadType: 'socket', loadPower: 7360, phases: 'single', specialLocation: 'none' },
      { name: 'Upstairs Sockets', loadType: 'socket', loadPower: 7360, phases: 'single', specialLocation: 'none' },
      { name: 'Downstairs Lights', loadType: 'lighting', loadPower: 1000, cableLength: 15, phases: 'single', specialLocation: 'none' },
      { name: 'Upstairs Lights', loadType: 'lighting', loadPower: 800, cableLength: 20, phases: 'single', specialLocation: 'none' },
      { name: 'Cooker', loadType: 'cooker', loadPower: 9200, phases: 'single', specialLocation: 'kitchen' },
      { name: 'Electric Shower', loadType: 'shower', loadPower: 10500, cableLength: 15, phases: 'single', specialLocation: 'bathroom' },
      { name: 'Immersion Heater', loadType: 'immersion', loadPower: 3000, phases: 'single', specialLocation: 'none' }
    ]
  },
  {
    id: 'kitchen-extension',
    name: 'Kitchen Extension',
    description: '4 circuits - Kitchen renovation',
    circuits: [
      { name: 'Kitchen Sockets', loadType: 'socket', loadPower: 7360, phases: 'single', specialLocation: 'kitchen' },
      { name: 'Under-cabinet Lighting', loadType: 'lighting', loadPower: 500, cableLength: 8, phases: 'single', specialLocation: 'kitchen' },
      { name: 'Cooker/Hob', loadType: 'cooker', loadPower: 9200, phases: 'single', specialLocation: 'kitchen' },
      { name: 'Integrated Appliances', loadType: 'socket', loadPower: 3000, phases: 'single', specialLocation: 'kitchen', notes: 'Dishwasher, washing machine' }
    ]
  },
  {
    id: 'ev-install',
    name: 'EV Charger Installation',
    description: '1 circuit - Electric vehicle charging',
    circuits: [
      { name: 'EV Charger 7.4kW', loadType: 'ev-charger', loadPower: 7400, cableLength: 20, phases: 'single', specialLocation: 'outdoor', notes: 'Type 2 tethered' }
    ]
  },
  {
    id: 'bathroom-refit',
    name: 'Bathroom Refit',
    description: '3 circuits - Bathroom installation',
    circuits: [
      { name: 'Electric Shower', loadType: 'shower', loadPower: 10500, cableLength: 15, phases: 'single', specialLocation: 'bathroom' },
      { name: 'Bathroom Lights', loadType: 'lighting', loadPower: 300, cableLength: 10, phases: 'single', specialLocation: 'bathroom' },
      { name: 'Extractor Fan', loadType: 'heating', loadPower: 100, cableLength: 8, phases: 'single', specialLocation: 'bathroom' }
    ]
  },
  {
    id: 'solar-pv',
    name: 'Solar PV Installation',
    description: '3 circuits - Solar panel system with battery storage',
    circuits: [
      { name: 'Solar Inverter', loadType: 'ev-charger', loadPower: 5000, cableLength: 15, phases: 'single', specialLocation: 'outdoor', notes: 'AC coupled inverter' },
      { name: 'Battery Storage', loadType: 'ev-charger', loadPower: 3000, cableLength: 12, phases: 'single', specialLocation: 'none', notes: 'Optional battery system' },
      { name: 'Generation Meter', loadType: 'socket', loadPower: 100, cableLength: 8, phases: 'single', specialLocation: 'none', notes: 'Export meter supply' }
    ]
  },
  {
    id: 'garage-conversion',
    name: 'Garage/Outbuilding Conversion',
    description: '5 circuits - Complete garage or outbuilding electrical setup',
    circuits: [
      { name: 'Garage Lighting', loadType: 'lighting', loadPower: 800, cableLength: 25, phases: 'single', specialLocation: 'none' },
      { name: 'Garage Socket Ring', loadType: 'socket', loadPower: 7360, cableLength: 30, phases: 'single', specialLocation: 'none' },
      { name: 'Outdoor Lighting', loadType: 'lighting', loadPower: 500, cableLength: 20, phases: 'single', specialLocation: 'outdoor' },
      { name: 'Security/CCTV', loadType: 'socket', loadPower: 300, cableLength: 25, phases: 'single', specialLocation: 'outdoor', notes: 'Camera & alarm system' },
      { name: 'Workshop Equipment', loadType: 'socket', loadPower: 3000, cableLength: 15, phases: 'single', specialLocation: 'none', notes: 'Power tools circuit' }
    ]
  }
];

export const COMMERCIAL_TEMPLATES: CircuitPreset[] = [
  {
    id: 'hair-salon',
    name: 'Hair Salon / Beauty Studio',
    description: '9 circuits - Beauty services facility',
    circuits: [
      { name: 'Styling Station Sockets Zone 1', loadType: 'office-sockets', loadPower: 2000, cableLength: 20, phases: 'single', specialLocation: 'none' },
      { name: 'Styling Station Sockets Zone 2', loadType: 'office-sockets', loadPower: 2000, cableLength: 20, phases: 'single', specialLocation: 'none' },
      { name: 'Styling Station Sockets Zone 3', loadType: 'office-sockets', loadPower: 2000, cableLength: 20, phases: 'single', specialLocation: 'none' },
      { name: 'Basin Water Heaters', loadType: 'kitchen-equipment', loadPower: 3000, cableLength: 15, phases: 'single', specialLocation: 'bathroom', notes: 'Instantaneous heaters' },
      { name: 'LED Mirror/Lighting', loadType: 'lighting', loadPower: 1500, cableLength: 25, phases: 'single', specialLocation: 'none' },
      { name: 'Nail Station Sockets', loadType: 'office-sockets', loadPower: 1500, cableLength: 18, phases: 'single', specialLocation: 'none' },
      { name: 'Reception/Till', loadType: 'office-sockets', loadPower: 1000, cableLength: 15, phases: 'single', specialLocation: 'none' },
      { name: 'Emergency Lighting', loadType: 'emergency-lighting', loadPower: 300, cableLength: 30, phases: 'single', specialLocation: 'none', notes: 'FP200 cable' },
      { name: 'External Signage', loadType: 'signage', loadPower: 500, cableLength: 12, phases: 'single', specialLocation: 'outdoor' }
    ]
  },
  {
    id: 'gym-fitness',
    name: 'Gym / Fitness Studio',
    description: '11 circuits - Fitness facility',
    circuits: [
      { name: 'Treadmill Zone (Dedicated)', loadType: 'office-sockets', loadPower: 8000, cableLength: 25, phases: 'single', specialLocation: 'none', notes: 'Multiple machines' },
      { name: 'Spin Bike/Cardio Area', loadType: 'office-sockets', loadPower: 3000, cableLength: 30, phases: 'single', specialLocation: 'none' },
      { name: 'Weights Area Sockets', loadType: 'office-sockets', loadPower: 2000, cableLength: 28, phases: 'single', specialLocation: 'none' },
      { name: 'Sauna Heater', loadType: 'kitchen-equipment', loadPower: 6000, cableLength: 20, phases: 'three', specialLocation: 'bathroom', notes: '3-phase, special location' },
      { name: 'Changing Room Lighting', loadType: 'lighting', loadPower: 1500, cableLength: 20, phases: 'single', specialLocation: 'none' },
      { name: 'Hand Dryers', loadType: 'kitchen-equipment', loadPower: 2400, cableLength: 15, phases: 'single', specialLocation: 'bathroom' },
      { name: 'Sound System/AV', loadType: 'office-sockets', loadPower: 1500, cableLength: 35, phases: 'single', specialLocation: 'none', notes: 'Amplifiers & speakers' },
      { name: 'Reception Sockets', loadType: 'office-sockets', loadPower: 2000, cableLength: 15, phases: 'single', specialLocation: 'none' },
      { name: 'HVAC/Air Con', loadType: 'hvac', loadPower: 5000, cableLength: 25, phases: 'single', specialLocation: 'none' },
      { name: 'Emergency Lighting', loadType: 'emergency-lighting', loadPower: 500, cableLength: 40, phases: 'single', specialLocation: 'none' },
      { name: 'Fire Alarm', loadType: 'fire-alarm', loadPower: 300, cableLength: 35, phases: 'single', specialLocation: 'none' }
    ]
  },
  {
    id: 'nursery-childcare',
    name: 'Nursery / Childcare Centre',
    description: '10 circuits - Childcare facility',
    circuits: [
      { name: 'Kitchen Equipment', loadType: 'kitchen-equipment', loadPower: 4000, cableLength: 15, phases: 'single', specialLocation: 'kitchen', notes: 'Bottle warmers, sterilisers' },
      { name: 'Playroom Sockets Zone 1', loadType: 'office-sockets', loadPower: 2000, cableLength: 20, phases: 'single', specialLocation: 'none', notes: 'RCD protected' },
      { name: 'Playroom Sockets Zone 2', loadType: 'office-sockets', loadPower: 2000, cableLength: 25, phases: 'single', specialLocation: 'none', notes: 'RCD protected' },
      { name: 'Nap Room Lighting', loadType: 'lighting', loadPower: 500, cableLength: 18, phases: 'single', specialLocation: 'none', notes: 'Dimmable' },
      { name: 'Baby Changing Area', loadType: 'office-sockets', loadPower: 1000, cableLength: 12, phases: 'single', specialLocation: 'bathroom', notes: 'With hand dryer' },
      { name: 'Outdoor Play Lighting', loadType: 'lighting', loadPower: 800, cableLength: 30, phases: 'single', specialLocation: 'outdoor' },
      { name: 'CCTV/Security System', loadType: 'cctv', loadPower: 500, cableLength: 40, phases: 'single', specialLocation: 'none' },
      { name: 'Staff Room', loadType: 'office-sockets', loadPower: 2000, cableLength: 20, phases: 'single', specialLocation: 'none' },
      { name: 'Emergency Lighting', loadType: 'emergency-lighting', loadPower: 400, cableLength: 35, phases: 'single', specialLocation: 'none' },
      { name: 'Fire Alarm Panel', loadType: 'fire-alarm', loadPower: 300, cableLength: 30, phases: 'single', specialLocation: 'none' }
    ]
  },
  {
    id: 'veterinary-practice',
    name: 'Veterinary Practice',
    description: '12 circuits - Animal healthcare facility',
    circuits: [
      { name: 'X-Ray Suite', loadType: 'server-room', loadPower: 8000, cableLength: 20, phases: 'single', specialLocation: 'none', notes: 'Dedicated, shielded room' },
      { name: 'Operating Theatre Sockets', loadType: 'office-sockets', loadPower: 3000, cableLength: 18, phases: 'single', specialLocation: 'none', notes: 'Critical circuit' },
      { name: 'Sterilisation Equipment', loadType: 'kitchen-equipment', loadPower: 4000, cableLength: 15, phases: 'single', specialLocation: 'none', notes: 'Autoclave' },
      { name: 'Kennel Area Heating', loadType: 'hvac', loadPower: 3000, cableLength: 25, phases: 'single', specialLocation: 'none' },
      { name: 'Consultation Room 1', loadType: 'office-sockets', loadPower: 2000, cableLength: 20, phases: 'single', specialLocation: 'none' },
      { name: 'Consultation Room 2', loadType: 'office-sockets', loadPower: 2000, cableLength: 22, phases: 'single', specialLocation: 'none' },
      { name: 'Lab Equipment', loadType: 'office-sockets', loadPower: 2500, cableLength: 18, phases: 'single', specialLocation: 'none', notes: 'Centrifuge, analysers' },
      { name: 'Reception/Waiting', loadType: 'office-sockets', loadPower: 2000, cableLength: 15, phases: 'single', specialLocation: 'none' },
      { name: 'Drug Storage (Refrigeration)', loadType: 'kitchen-equipment', loadPower: 500, cableLength: 12, phases: 'single', specialLocation: 'none' },
      { name: 'Emergency Lighting', loadType: 'emergency-lighting', loadPower: 500, cableLength: 35, phases: 'single', specialLocation: 'none' },
      { name: 'Fire Alarm', loadType: 'fire-alarm', loadPower: 300, cableLength: 30, phases: 'single', specialLocation: 'none' },
      { name: 'External Lighting', loadType: 'lighting', loadPower: 600, cableLength: 20, phases: 'single', specialLocation: 'outdoor' }
    ]
  },
  {
    id: 'coworking-space',
    name: 'Co-Working / Hot Desk Space',
    description: '10 circuits - Flexible workspace',
    circuits: [
      { name: 'Hot Desk Zone A', loadType: 'office-sockets', loadPower: 5000, cableLength: 30, phases: 'single', specialLocation: 'none', notes: 'Floor boxes' },
      { name: 'Hot Desk Zone B', loadType: 'office-sockets', loadPower: 5000, cableLength: 35, phases: 'single', specialLocation: 'none', notes: 'Floor boxes' },
      { name: 'Meeting Pod Sockets', loadType: 'office-sockets', loadPower: 2000, cableLength: 25, phases: 'single', specialLocation: 'none' },
      { name: 'AV/Video Conference', loadType: 'office-sockets', loadPower: 1500, cableLength: 28, phases: 'single', specialLocation: 'none', notes: 'Dedicated circuit' },
      { name: 'Phone Booth Sockets', loadType: 'office-sockets', loadPower: 1000, cableLength: 20, phases: 'single', specialLocation: 'none' },
      { name: 'Communal Kitchen', loadType: 'kitchen-equipment', loadPower: 4000, cableLength: 18, phases: 'single', specialLocation: 'kitchen' },
      { name: 'Server/Comms Cabinet', loadType: 'server-room', loadPower: 3000, cableLength: 22, phases: 'single', specialLocation: 'none', notes: 'UPS backed' },
      { name: 'EV Charger', loadType: 'ev-charger', loadPower: 7400, cableLength: 30, phases: 'single', specialLocation: 'outdoor' },
      { name: 'Emergency Lighting', loadType: 'emergency-lighting', loadPower: 500, cableLength: 40, phases: 'single', specialLocation: 'none' },
      { name: 'Access Control/CCTV', loadType: 'access-control', loadPower: 800, cableLength: 35, phases: 'single', specialLocation: 'none' }
    ]
  },
  {
    id: 'convenience-store',
    name: 'Convenience Store / Newsagent',
    description: '8 circuits - Small retail unit',
    circuits: [
      { name: 'Chilled Display Units', loadType: 'kitchen-equipment', loadPower: 4000, cableLength: 15, phases: 'single', specialLocation: 'none', notes: 'Refrigeration' },
      { name: 'Freezer Cabinet', loadType: 'kitchen-equipment', loadPower: 2500, cableLength: 12, phases: 'single', specialLocation: 'none' },
      { name: 'EPOS/Till Stations', loadType: 'office-sockets', loadPower: 1000, cableLength: 18, phases: 'single', specialLocation: 'none' },
      { name: 'General Sockets', loadType: 'office-sockets', loadPower: 2000, cableLength: 20, phases: 'single', specialLocation: 'none' },
      { name: 'Shop Floor Lighting', loadType: 'lighting', loadPower: 2000, cableLength: 25, phases: 'single', specialLocation: 'none' },
      { name: 'External ATM Supply', loadType: 'office-sockets', loadPower: 2000, cableLength: 15, phases: 'single', specialLocation: 'outdoor', notes: 'Dedicated, metered' },
      { name: 'Illuminated Signage', loadType: 'signage', loadPower: 500, cableLength: 12, phases: 'single', specialLocation: 'outdoor' },
      { name: 'Emergency Lighting', loadType: 'emergency-lighting', loadPower: 300, cableLength: 28, phases: 'single', specialLocation: 'none' }
    ]
  }
];

export const INDUSTRIAL_TEMPLATES: CircuitPreset[] = [
  {
    id: 'brewery',
    name: 'Brewery / Microbrewery',
    description: '12 circuits - Brewing facility',
    circuits: [
      { name: 'Mash Tun Heating Elements', loadType: 'three-phase-motor', loadPower: 18000, cableLength: 35, phases: 'three', specialLocation: 'none', notes: '3-phase heating' },
      { name: 'Fermentation Vessel Controls', loadType: 'control-panel', loadPower: 3000, cableLength: 30, phases: 'single', specialLocation: 'none' },
      { name: 'Cold Room Compressor', loadType: 'three-phase-motor', loadPower: 7500, cableLength: 40, phases: 'three', specialLocation: 'none' },
      { name: 'Bottling/Canning Line', loadType: 'production-line', loadPower: 5500, cableLength: 35, phases: 'three', specialLocation: 'none' },
      { name: 'Glycol Chiller', loadType: 'three-phase-motor', loadPower: 11000, cableLength: 38, phases: 'three', specialLocation: 'none' },
      { name: 'Washdown Sockets (IP65)', loadType: 'workshop-sockets', loadPower: 3000, cableLength: 30, phases: 'single', specialLocation: 'none', notes: 'IP65 rated' },
      { name: 'Grain Handling/Auger', loadType: 'conveyor', loadPower: 4000, cableLength: 42, phases: 'three', specialLocation: 'none' },
      { name: 'Cask Washer', loadType: 'machine-tool', loadPower: 3000, cableLength: 25, phases: 'single', specialLocation: 'none' },
      { name: 'Packaging Area Sockets', loadType: 'workshop-sockets', loadPower: 2000, cableLength: 28, phases: 'single', specialLocation: 'none' },
      { name: 'Warehouse Lighting', loadType: 'overhead-lighting', loadPower: 3000, cableLength: 50, phases: 'single', specialLocation: 'none' },
      { name: 'Emergency Lighting', loadType: 'emergency-lighting', loadPower: 600, cableLength: 55, phases: 'single', specialLocation: 'none' },
      { name: 'Fire Alarm/CO2 Detection', loadType: 'fire-alarm', loadPower: 500, cableLength: 45, phases: 'single', specialLocation: 'none' }
    ]
  },
  {
    id: 'print-works',
    name: 'Print Works / Signage Company',
    description: '10 circuits - Printing facility',
    circuits: [
      { name: 'Large Format Printer 1', loadType: 'machine-tool', loadPower: 5000, cableLength: 30, phases: 'single', specialLocation: 'none' },
      { name: 'Large Format Printer 2', loadType: 'machine-tool', loadPower: 5000, cableLength: 32, phases: 'single', specialLocation: 'none' },
      { name: 'UV Curing Unit', loadType: 'machine-tool', loadPower: 8000, cableLength: 28, phases: 'three', specialLocation: 'none' },
      { name: 'CNC Router', loadType: 'machine-tool', loadPower: 11000, cableLength: 35, phases: 'three', specialLocation: 'none' },
      { name: 'Extraction System', loadType: 'extraction', loadPower: 4000, cableLength: 40, phases: 'three', specialLocation: 'none' },
      { name: 'Vinyl Cutter', loadType: 'machine-tool', loadPower: 1500, cableLength: 25, phases: 'single', specialLocation: 'none' },
      { name: 'Laminator', loadType: 'machine-tool', loadPower: 3000, cableLength: 22, phases: 'single', specialLocation: 'none' },
      { name: 'Design Office Sockets', loadType: 'office-sockets', loadPower: 4000, cableLength: 30, phases: 'single', specialLocation: 'none' },
      { name: 'Workshop Lighting', loadType: 'overhead-lighting', loadPower: 2500, cableLength: 45, phases: 'single', specialLocation: 'none' },
      { name: 'Emergency Lighting', loadType: 'emergency-lighting', loadPower: 400, cableLength: 50, phases: 'single', specialLocation: 'none' }
    ]
  },
  {
    id: 'cold-storage',
    name: 'Cold Storage / Refrigerated Warehouse',
    description: '9 circuits - Cold storage facility',
    circuits: [
      { name: 'Blast Chiller Unit 1', loadType: 'three-phase-motor', loadPower: 15000, cableLength: 35, phases: 'three', specialLocation: 'none' },
      { name: 'Blast Chiller Unit 2', loadType: 'three-phase-motor', loadPower: 15000, cableLength: 38, phases: 'three', specialLocation: 'none' },
      { name: 'Cold Room Compressor', loadType: 'three-phase-motor', loadPower: 11000, cableLength: 40, phases: 'three', specialLocation: 'none' },
      { name: 'Loading Bay Door Heater', loadType: 'three-phase-motor', loadPower: 6000, cableLength: 30, phases: 'single', specialLocation: 'none' },
      { name: 'Loading Bay Lighting', loadType: 'overhead-lighting', loadPower: 2000, cableLength: 35, phases: 'single', specialLocation: 'none' },
      { name: 'Forklift Charging Station', loadType: 'ev-charger', loadPower: 7000, cableLength: 25, phases: 'single', specialLocation: 'none' },
      { name: 'Defrost System Controls', loadType: 'control-panel', loadPower: 2000, cableLength: 32, phases: 'single', specialLocation: 'none' },
      { name: 'Office Area', loadType: 'office-sockets', loadPower: 3000, cableLength: 28, phases: 'single', specialLocation: 'none' },
      { name: 'Emergency Lighting', loadType: 'emergency-lighting', loadPower: 500, cableLength: 45, phases: 'single', specialLocation: 'none' }
    ]
  },
  {
    id: 'metal-fabrication',
    name: 'Metal Fabrication Shop',
    description: '11 circuits - Metalworking facility',
    circuits: [
      { name: 'CNC Laser Cutter', loadType: 'machine-tool', loadPower: 22000, cableLength: 40, phases: 'three', specialLocation: 'none' },
      { name: 'Plasma Cutter', loadType: 'machine-tool', loadPower: 15000, cableLength: 35, phases: 'three', specialLocation: 'none' },
      { name: 'Hydraulic Press Brake', loadType: 'machine-tool', loadPower: 11000, cableLength: 38, phases: 'three', specialLocation: 'none' },
      { name: 'Guillotine/Shear', loadType: 'machine-tool', loadPower: 7500, cableLength: 32, phases: 'three', specialLocation: 'none' },
      { name: 'MIG Welding Bay 1', loadType: 'welding', loadPower: 12000, cableLength: 30, phases: 'three', specialLocation: 'none', notes: 'High inrush' },
      { name: 'MIG Welding Bay 2', loadType: 'welding', loadPower: 12000, cableLength: 32, phases: 'three', specialLocation: 'none', notes: 'High inrush' },
      { name: 'Paint Spray Booth', loadType: 'extraction', loadPower: 5500, cableLength: 35, phases: 'three', specialLocation: 'none', notes: 'Extraction required' },
      { name: 'Air Compressor', loadType: 'compressor', loadPower: 7500, cableLength: 38, phases: 'three', specialLocation: 'none' },
      { name: 'Workshop Sockets', loadType: 'workshop-sockets', loadPower: 5000, cableLength: 35, phases: 'single', specialLocation: 'none' },
      { name: 'High Bay Lighting', loadType: 'overhead-lighting', loadPower: 4000, cableLength: 50, phases: 'single', specialLocation: 'none' },
      { name: 'Emergency Lighting', loadType: 'emergency-lighting', loadPower: 600, cableLength: 55, phases: 'single', specialLocation: 'none' }
    ]
  },
  {
    id: 'plastics-moulding',
    name: 'Plastics / Injection Moulding',
    description: '10 circuits - Plastics production',
    circuits: [
      { name: 'Injection Moulding Machine 1', loadType: 'machine-tool', loadPower: 30000, cableLength: 40, phases: 'three', specialLocation: 'none' },
      { name: 'Injection Moulding Machine 2', loadType: 'machine-tool', loadPower: 22000, cableLength: 42, phases: 'three', specialLocation: 'none' },
      { name: 'Granulator/Grinder', loadType: 'machine-tool', loadPower: 7500, cableLength: 35, phases: 'three', specialLocation: 'none' },
      { name: 'Hopper Dryer', loadType: 'three-phase-motor', loadPower: 5500, cableLength: 32, phases: 'three', specialLocation: 'none' },
      { name: 'Chiller Unit', loadType: 'three-phase-motor', loadPower: 11000, cableLength: 38, phases: 'three', specialLocation: 'none' },
      { name: 'Robot Arm/Pick & Place', loadType: 'control-panel', loadPower: 4000, cableLength: 30, phases: 'three', specialLocation: 'none' },
      { name: 'Conveyor Belt', loadType: 'conveyor', loadPower: 2200, cableLength: 45, phases: 'three', specialLocation: 'none' },
      { name: 'Quality Control Area', loadType: 'workshop-sockets', loadPower: 2000, cableLength: 28, phases: 'single', specialLocation: 'none' },
      { name: 'High Bay Lighting', loadType: 'overhead-lighting', loadPower: 3500, cableLength: 50, phases: 'single', specialLocation: 'none' },
      { name: 'Emergency Lighting', loadType: 'emergency-lighting', loadPower: 500, cableLength: 55, phases: 'single', specialLocation: 'none' }
    ]
  },
  {
    id: 'commercial-laundry',
    name: 'Commercial Laundry / Dry Cleaning',
    description: '11 circuits - Laundry facility',
    circuits: [
      { name: 'Industrial Washer 1', loadType: 'three-phase-motor', loadPower: 15000, cableLength: 35, phases: 'three', specialLocation: 'none' },
      { name: 'Industrial Washer 2', loadType: 'three-phase-motor', loadPower: 15000, cableLength: 37, phases: 'three', specialLocation: 'none' },
      { name: 'Industrial Tumble Dryer 1', loadType: 'three-phase-motor', loadPower: 18000, cableLength: 32, phases: 'three', specialLocation: 'none', notes: 'Gas or electric' },
      { name: 'Industrial Tumble Dryer 2', loadType: 'three-phase-motor', loadPower: 18000, cableLength: 34, phases: 'three', specialLocation: 'none' },
      { name: 'Flatwork Ironer', loadType: 'three-phase-motor', loadPower: 22000, cableLength: 38, phases: 'three', specialLocation: 'none' },
      { name: 'Steam Generator', loadType: 'three-phase-motor', loadPower: 12000, cableLength: 30, phases: 'three', specialLocation: 'none' },
      { name: 'Garment Conveyor', loadType: 'conveyor', loadPower: 3000, cableLength: 45, phases: 'three', specialLocation: 'none' },
      { name: 'Dry Cleaning Machine', loadType: 'machine-tool', loadPower: 8000, cableLength: 30, phases: 'three', specialLocation: 'none' },
      { name: 'Reception/Counter', loadType: 'office-sockets', loadPower: 2000, cableLength: 25, phases: 'single', specialLocation: 'none' },
      { name: 'Warehouse Lighting', loadType: 'overhead-lighting', loadPower: 3000, cableLength: 50, phases: 'single', specialLocation: 'none' },
      { name: 'Emergency Lighting', loadType: 'emergency-lighting', loadPower: 500, cableLength: 55, phases: 'single', specialLocation: 'none' }
    ]
  }
];

// Smart defaults based on installation type
export const SMART_DEFAULTS = {
  domestic: {
    voltage: 230,
    phases: 'single' as const,
    ze: 0.8,
    earthingSystem: 'TN-S' as const,
    ambientTemp: 25,
    installationMethod: 'clipped-direct' as const,
    groupingFactor: 1,
    budgetLevel: 'standard' as const
  },
  commercial: {
    voltage: 230,
    phases: 'single' as const,
    ze: 0.35,
    earthingSystem: 'TN-C-S' as const,
    ambientTemp: 30,
    installationMethod: 'in-trunking' as const,
    groupingFactor: 5,
    budgetLevel: 'premium' as const
  },
  industrial: {
    voltage: 400,
    phases: 'three' as const,
    ze: 0.8,
    earthingSystem: 'TN-S' as const,
    ambientTemp: 35,
    installationMethod: 'in-conduit' as const,
    groupingFactor: 7,
    budgetLevel: 'standard' as const,
    motorStartingFactor: 6,
    faultLevel: 10
  }
};

// BS 7671:2018+A3:2024 Ze reference values by earthing system
export const ZE_REFERENCE_VALUES = {
  'TN-S': 0.8,      // Separate neutral and earth
  'TN-C-S': 0.35,   // PME (Protective Multiple Earthing)
  'TT': 21          // Earth electrode system (typical maximum)
} as const;
