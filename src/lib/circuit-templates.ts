import { CircuitPreset } from '@/types/installation-design';

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
  }
];

export const COMMERCIAL_TEMPLATES: CircuitPreset[] = [
  {
    id: 'office-fitout',
    name: 'Office Fit-Out',
    description: '10 circuits - Modern office space',
    circuits: [
      { name: 'Desk Sockets - Zone 1', loadType: 'office-sockets', loadPower: 5000, phases: 'single', specialLocation: 'none' },
      { name: 'Desk Sockets - Zone 2', loadType: 'office-sockets', loadPower: 5000, phases: 'single', specialLocation: 'none' },
      { name: 'Ceiling Lighting', loadType: 'lighting', loadPower: 2000, cableLength: 30, phases: 'single', specialLocation: 'none' },
      { name: 'Emergency Lighting', loadType: 'emergency-lighting', loadPower: 500, cableLength: 35, phases: 'single', specialLocation: 'none' },
      { name: 'Server Cabinet', loadType: 'server-room', loadPower: 5000, phases: 'single', specialLocation: 'none', notes: 'UPS required' },
      { name: 'HVAC Unit', loadType: 'hvac', loadPower: 3000, phases: 'single', specialLocation: 'none' },
      { name: 'Kitchen/Breakroom', loadType: 'kitchen-equipment', loadPower: 3000, phases: 'single', specialLocation: 'kitchen' },
      { name: 'Fire Alarm Panel', loadType: 'fire-alarm', loadPower: 500, phases: 'single', specialLocation: 'none' },
      { name: 'Access Control', loadType: 'access-control', loadPower: 300, phases: 'single', specialLocation: 'none' },
      { name: 'CCTV System', loadType: 'cctv', loadPower: 500, phases: 'single', specialLocation: 'none' }
    ]
  },
  {
    id: 'retail-shop',
    name: 'Retail Shop',
    description: '8 circuits - Shop fit-out',
    circuits: [
      { name: 'Shop Floor Sockets', loadType: 'office-sockets', loadPower: 3000, phases: 'single', specialLocation: 'none' },
      { name: 'Display Lighting', loadType: 'lighting', loadPower: 1500, cableLength: 25, phases: 'single', specialLocation: 'none' },
      { name: 'Till Points', loadType: 'office-sockets', loadPower: 1000, phases: 'single', specialLocation: 'none' },
      { name: 'Security/CCTV', loadType: 'cctv', loadPower: 500, phases: 'single', specialLocation: 'none' },
      { name: 'Shop Front Signage', loadType: 'signage', loadPower: 500, phases: 'single', specialLocation: 'outdoor' },
      { name: 'Storage Area', loadType: 'office-sockets', loadPower: 2000, phases: 'single', specialLocation: 'none' },
      { name: 'Back Office', loadType: 'office-sockets', loadPower: 2000, phases: 'single', specialLocation: 'none' },
      { name: 'Emergency Exit Lights', loadType: 'emergency-lighting', loadPower: 300, cableLength: 20, phases: 'single', specialLocation: 'none' }
    ]
  },
  {
    id: 'restaurant',
    name: 'Restaurant/Café',
    description: '12 circuits - Commercial kitchen',
    circuits: [
      { name: 'Commercial Oven', loadType: 'kitchen-equipment', loadPower: 12000, phases: 'three', specialLocation: 'kitchen', notes: '3-phase required' },
      { name: 'Extraction System', loadType: 'hvac', loadPower: 5000, phases: 'single', specialLocation: 'kitchen' },
      { name: 'Refrigeration', loadType: 'kitchen-equipment', loadPower: 3000, phases: 'single', specialLocation: 'kitchen' },
      { name: 'Kitchen Sockets', loadType: 'kitchen-equipment', loadPower: 5000, phases: 'single', specialLocation: 'kitchen' },
      { name: 'Dishwasher', loadType: 'kitchen-equipment', loadPower: 3000, phases: 'single', specialLocation: 'kitchen' },
      { name: 'Dining Area Sockets', loadType: 'office-sockets', loadPower: 2000, phases: 'single', specialLocation: 'none' },
      { name: 'Dining Lighting', loadType: 'lighting', loadPower: 1500, cableLength: 20, phases: 'single', specialLocation: 'none' },
      { name: 'Bar Equipment', loadType: 'kitchen-equipment', loadPower: 4000, phases: 'single', specialLocation: 'none' },
      { name: 'Front of House Sockets', loadType: 'office-sockets', loadPower: 2000, phases: 'single', specialLocation: 'none' },
      { name: 'Emergency Lighting', loadType: 'emergency-lighting', loadPower: 500, cableLength: 30, phases: 'single', specialLocation: 'none' },
      { name: 'Fire Alarm', loadType: 'fire-alarm', loadPower: 300, phases: 'single', specialLocation: 'none' },
      { name: 'Back Office', loadType: 'office-sockets', loadPower: 1500, phases: 'single', specialLocation: 'none' }
    ]
  }
];

export const INDUSTRIAL_TEMPLATES: CircuitPreset[] = [
  {
    id: 'workshop-setup',
    name: 'Workshop Setup',
    description: '8 circuits - Small workshop',
    circuits: [
      { name: 'Three Phase Distribution', loadType: 'three-phase-motor', loadPower: 15000, phases: 'three', specialLocation: 'none', notes: '11kW motor' },
      { name: 'Machine Tool 1', loadType: 'machine-tool', loadPower: 5500, phases: 'three', specialLocation: 'none', notes: 'CNC mill' },
      { name: 'Machine Tool 2', loadType: 'machine-tool', loadPower: 7500, phases: 'three', specialLocation: 'none', notes: 'Lathe' },
      { name: 'Workshop Lighting', loadType: 'overhead-lighting', loadPower: 2000, cableLength: 40, phases: 'single', specialLocation: 'none' },
      { name: 'Workshop Sockets', loadType: 'workshop-sockets', loadPower: 5000, phases: 'single', specialLocation: 'none' },
      { name: 'Extraction System', loadType: 'extraction', loadPower: 3000, phases: 'single', specialLocation: 'none' },
      { name: 'Air Compressor', loadType: 'compressor', loadPower: 4000, phases: 'three', specialLocation: 'none', notes: '3kW' },
      { name: 'Control Panel', loadType: 'control-panel', loadPower: 1000, phases: 'single', specialLocation: 'none' }
    ]
  },
  {
    id: 'factory-floor',
    name: 'Factory Floor',
    description: '15 circuits - Production facility',
    circuits: [
      { name: 'Main Motor 1', loadType: 'three-phase-motor', loadPower: 22000, phases: 'three', specialLocation: 'none', notes: '15kW' },
      { name: 'Main Motor 2', loadType: 'three-phase-motor', loadPower: 22000, phases: 'three', specialLocation: 'none', notes: '15kW' },
      { name: 'Main Motor 3', loadType: 'three-phase-motor', loadPower: 15000, phases: 'three', specialLocation: 'none', notes: '11kW' },
      { name: 'Conveyor System 1', loadType: 'conveyor', loadPower: 7500, phases: 'three', specialLocation: 'none' },
      { name: 'Conveyor System 2', loadType: 'conveyor', loadPower: 5500, phases: 'three', specialLocation: 'none' },
      { name: 'Production Line Power', loadType: 'production-line', loadPower: 12000, phases: 'three', specialLocation: 'none' },
      { name: 'Welding Bay', loadType: 'welding', loadPower: 15000, phases: 'three', specialLocation: 'none', notes: 'High inrush' },
      { name: 'Overhead Cranes', loadType: 'three-phase-motor', loadPower: 11000, phases: 'three', specialLocation: 'none' },
      { name: 'Control Panels', loadType: 'control-panel', loadPower: 2000, phases: 'single', specialLocation: 'none' },
      { name: 'Extraction System', loadType: 'extraction', loadPower: 5000, phases: 'three', specialLocation: 'none' },
      { name: 'Factory Lighting', loadType: 'overhead-lighting', loadPower: 5000, cableLength: 60, phases: 'single', specialLocation: 'none' },
      { name: 'Emergency Lighting', loadType: 'emergency-lighting', loadPower: 800, cableLength: 65, phases: 'single', specialLocation: 'none' },
      { name: 'Workshop Sockets', loadType: 'workshop-sockets', loadPower: 7500, phases: 'single', specialLocation: 'none' },
      { name: 'Office Area', loadType: 'office-sockets', loadPower: 3000, phases: 'single', specialLocation: 'none' },
      { name: 'Fire Alarm System', loadType: 'fire-alarm', loadPower: 500, phases: 'single', specialLocation: 'none' }
    ]
  },
  {
    id: 'manufacturing',
    name: 'Small Manufacturing',
    description: '12 circuits - Manufacturing unit',
    circuits: [
      { name: 'CNC Machine 1', loadType: 'machine-tool', loadPower: 11000, phases: 'three', specialLocation: 'none', notes: '7.5kW' },
      { name: 'CNC Machine 2', loadType: 'machine-tool', loadPower: 11000, phases: 'three', specialLocation: 'none', notes: '7.5kW' },
      { name: 'Press/Stamping', loadType: 'machine-tool', loadPower: 15000, phases: 'three', specialLocation: 'none', notes: '11kW' },
      { name: 'Welding Equipment', loadType: 'welding', loadPower: 12000, phases: 'three', specialLocation: 'none' },
      { name: 'Assembly Line', loadType: 'production-line', loadPower: 8000, phases: 'three', specialLocation: 'none' },
      { name: 'Quality Control Area', loadType: 'workshop-sockets', loadPower: 3000, phases: 'single', specialLocation: 'none' },
      { name: 'Packaging Equipment', loadType: 'conveyor', loadPower: 4000, phases: 'three', specialLocation: 'none' },
      { name: 'Extraction/Ventilation', loadType: 'extraction', loadPower: 4000, phases: 'single', specialLocation: 'none' },
      { name: 'Compressor', loadType: 'compressor', loadPower: 5500, phases: 'three', specialLocation: 'none', notes: '4kW' },
      { name: 'Factory Lighting', loadType: 'overhead-lighting', loadPower: 3000, cableLength: 50, phases: 'single', specialLocation: 'none' },
      { name: 'Stores/Warehouse', loadType: 'workshop-sockets', loadPower: 2000, phases: 'single', specialLocation: 'none' },
      { name: 'Control Systems', loadType: 'control-panel', loadPower: 1500, phases: 'single', specialLocation: 'none' }
    ]
  }
];

// Smart defaults based on installation type
export const SMART_DEFAULTS = {
  domestic: {
    voltage: 230,
    phases: 'single' as const,
    ze: 0.35,
    earthingSystem: 'TN-S' as const,
    ambientTemp: 25,
    installationMethod: 'clipped-direct' as const,
    groupingFactor: 1,
    budgetLevel: 'standard' as const
  },
  commercial: {
    voltage: 230,
    phases: 'single' as const,
    ze: 0.25,
    earthingSystem: 'TN-C-S' as const,
    ambientTemp: 30,
    installationMethod: 'in-trunking' as const,
    groupingFactor: 5,
    budgetLevel: 'premium' as const
  },
  industrial: {
    voltage: 400,
    phases: 'three' as const,
    ze: 0.20,
    earthingSystem: 'TN-S' as const,
    ambientTemp: 35,
    installationMethod: 'in-conduit' as const,
    groupingFactor: 7,
    budgetLevel: 'standard' as const,
    motorStartingFactor: 6,
    faultLevel: 10
  }
};
