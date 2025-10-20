// Installation Method Templates - BS 7671:2018+A3:2024 Compliant
// Reusable installation templates for Domestic, Commercial, and Industrial sectors

export interface InstallationTemplate {
  id: string;
  name: string;
  description: string;
  category: 'domestic' | 'commercial' | 'industrial';
  estimatedDuration: string;
  complexity: 'basic' | 'intermediate' | 'advanced';
  isPopular?: boolean;
  prefilledPrompt: string;
}

// DOMESTIC TEMPLATES (8 templates)
export const DOMESTIC_TEMPLATES: InstallationTemplate[] = [
  {
    id: 'domestic-cu-install',
    name: 'Consumer Unit Installation',
    description: '18th Edition dual RCD board with SPD',
    category: 'domestic',
    estimatedDuration: '4-6 hours',
    complexity: 'intermediate',
    isPopular: true,
    prefilledPrompt: 'Step-by-step installation method for 18th Edition dual RCD consumer unit with SPD in domestic property, including isolation, testing, and certification requirements. Cover safe isolation, board mounting, busbar installation, RCD and MCB installation, labelling, and commissioning tests.'
  },
  {
    id: 'domestic-swa-cable',
    name: 'SWA Cable Installation',
    description: 'Underground cable to garage/outbuilding',
    category: 'domestic',
    estimatedDuration: '1-2 days',
    complexity: 'intermediate',
    isPopular: true,
    prefilledPrompt: 'Provide step-by-step installation method for 25mm 3-core SWA cable underground to garage, including trench depth (600mm minimum), warning tape placement, sand bedding, gland termination at both ends, earthing arrangements, and testing procedures (continuity, insulation resistance, earth fault loop impedance).'
  },
  {
    id: 'domestic-shower-circuit',
    name: 'Electric Shower Circuit',
    description: '9.5kW shower with pull-cord switch',
    category: 'domestic',
    estimatedDuration: '4-6 hours',
    complexity: 'basic',
    isPopular: true,
    prefilledPrompt: 'Installation method for 9.5kW shower circuit - 10mm² cable clipped direct, 18m run from consumer unit, through first floor to bathroom. Include safe zone routing, clip spacing (Table 4A2), notching joists (max depth limits), RCD protection requirements (Section 701), pull-cord switch positioning outside zones, and testing procedures.'
  },
  {
    id: 'domestic-ev-charger',
    name: 'EV Charger Installation',
    description: '7kW Type 2 tethered wall unit',
    category: 'domestic',
    estimatedDuration: '4-6 hours',
    complexity: 'intermediate',
    prefilledPrompt: 'Step-by-step method for installing 7kW EV charger (Type 2 tethered). Include dedicated circuit from consumer unit, 10mm² cable sizing, RCBO protection requirements (Section 722), outdoor mounting considerations, IP rating requirements, earthing arrangements, and OZEV compliance checks.'
  },
  {
    id: 'domestic-kitchen-extension',
    name: 'Kitchen Extension Wiring',
    description: 'Ring main, lighting, integrated appliances',
    category: 'domestic',
    estimatedDuration: '2-3 days',
    complexity: 'advanced',
    prefilledPrompt: 'Complete installation method for kitchen extension electrical work: new socket ring main (2.5mm²), lighting circuit (1.5mm²), dedicated circuits for oven (6mm²), hob (6mm²), dishwasher, and washing machine. Include first fix cable routing, notching/drilling requirements, accessory heights, and second fix terminations.'
  },
  {
    id: 'domestic-bathroom-refit',
    name: 'Bathroom Refit',
    description: 'Shower, extractor, lighting, special locations',
    category: 'domestic',
    estimatedDuration: '1-2 days',
    complexity: 'advanced',
    isPopular: true,
    prefilledPrompt: 'Installation method for bathroom electrical refit following Section 701. Include zone identification, shower circuit (10.5kW), extractor fan with overrun timer, downlights (IP rated), shaver socket positioning, supplementary bonding requirements (when applicable), RCD protection, and testing procedures for special locations.'
  },
  {
    id: 'domestic-garage-supply',
    name: 'Garage/Outbuilding Power Supply',
    description: 'Sub-main and distribution board',
    category: 'domestic',
    estimatedDuration: '1-2 days',
    complexity: 'intermediate',
    prefilledPrompt: 'Installation method for garage sub-main: 10mm² SWA underground (or overhead if applicable), 40A MCB at origin, small consumer unit in garage with RCD protection, socket circuits, lighting circuit, and optional circuits for vehicle charging point. Include earthing arrangements, bonding, and testing.'
  },
  {
    id: 'domestic-solar-battery',
    name: 'Solar PV & Battery Storage',
    description: 'Integration with existing installation',
    category: 'domestic',
    estimatedDuration: '2-3 days',
    complexity: 'advanced',
    prefilledPrompt: 'Installation method for solar PV system integration with battery storage. Include AC/DC isolator positioning, battery inverter installation, G98/G99 requirements, DNO notification process, generation meter, integration with consumer unit, earthing and bonding for PV, and commissioning procedures.'
  }
];

// COMMERCIAL TEMPLATES (8 templates)
export const COMMERCIAL_TEMPLATES: InstallationTemplate[] = [
  {
    id: 'commercial-office-fitout',
    name: 'Office Fit-Out',
    description: 'Desking, data, emergency lighting',
    category: 'commercial',
    estimatedDuration: '3-5 days',
    complexity: 'intermediate',
    isPopular: true,
    prefilledPrompt: 'Installation method for open-plan office fit-out: power distribution to workstation clusters, CAT6 data cabling routes (separate from power), emergency lighting circuit with self-test fittings, ceiling grid cable management, fire alarm integration points, and accessible testing points. Include cable segregation requirements and testing procedures.'
  },
  {
    id: 'commercial-retail-shop',
    name: 'Retail Shop Installation',
    description: 'Shop lighting, till points, display lighting',
    category: 'commercial',
    estimatedDuration: '3-5 days',
    complexity: 'intermediate',
    isPopular: true,
    prefilledPrompt: 'Complete installation method for retail shop: main distribution board sizing, lighting circuits (LED track lighting), till point dedicated circuits, display cabinet lighting, window display power, alarm system wiring, and roller shutter controls. Include emergency lighting requirements and accessible isolation.'
  },
  {
    id: 'commercial-restaurant-kitchen',
    name: 'Commercial Kitchen',
    description: 'Three-phase equipment, extraction, refrigeration',
    category: 'commercial',
    estimatedDuration: '4-6 days',
    complexity: 'advanced',
    prefilledPrompt: 'Installation method for commercial kitchen: three-phase distribution board, dedicated circuits for ovens (400V), extraction system, dishwasher, refrigeration units, cooking equipment. Include IP rating requirements for wet areas, emergency stop positioning, grease trap considerations, and specialist testing requirements.'
  },
  {
    id: 'commercial-server-room',
    name: 'Server Room Installation',
    description: 'UPS, redundant circuits, cooling',
    category: 'commercial',
    estimatedDuration: '3-4 days',
    complexity: 'advanced',
    isPopular: true,
    prefilledPrompt: 'Server room/comms cabinet installation method: dedicated UPS-backed circuits, redundant power feeds, PDU installation, cooling/HVAC circuits, cable management (raised floor or overhead tray), earthing requirements for data equipment, surge protection, and environmental monitoring circuits. Include testing and commissioning procedures.'
  },
  {
    id: 'commercial-fire-alarm',
    name: 'Fire Alarm System',
    description: 'L1/L2 system with manual call points',
    category: 'commercial',
    estimatedDuration: '4-8 days',
    complexity: 'advanced',
    prefilledPrompt: 'Installation method for fire alarm system (BS 5839): panel location and power supply, zone cabling, detector circuits, manual call point positioning, sounder circuits, interface with building systems (disabled toilets, fire doors), cable fire performance requirements, and commissioning tests. Include zoning strategy and cause and effect matrix.'
  },
  {
    id: 'commercial-emergency-lighting',
    name: 'Emergency Lighting',
    description: 'Central battery or self-contained',
    category: 'commercial',
    estimatedDuration: '2-4 days',
    complexity: 'intermediate',
    isPopular: true,
    prefilledPrompt: 'Emergency lighting installation method (BS 5266): escape route luminaire spacing, final exit signs, open area lighting, maintained vs non-maintained circuits, test key switch positions, central battery system (if applicable), and self-test functionality. Include 3-hour duration testing and certification requirements.'
  },
  {
    id: 'commercial-hvac-controls',
    name: 'HVAC Controls Installation',
    description: 'Air handling, heating, cooling systems',
    category: 'commercial',
    estimatedDuration: '3-5 days',
    complexity: 'advanced',
    prefilledPrompt: 'Installation method for HVAC control systems: main plant room distribution, motor circuits with DOL/star-delta starters, fan coil unit circuits, BMS control cabling (segregated from power), zone control wiring, thermostat locations, and interlocks. Include motor protection requirements and commissioning procedures.'
  },
  {
    id: 'commercial-access-cctv',
    name: 'Access Control & CCTV',
    description: 'Door controllers, cameras, PSU',
    category: 'commercial',
    estimatedDuration: '3-4 days',
    complexity: 'intermediate',
    prefilledPrompt: 'Installation method for access control and CCTV: main control panel power supply, door controller wiring, electric lock circuits, camera power distribution, PoE switch installation, cable routes (data/power segregation), and central power supply for 12V/24V systems. Include battery backup requirements and testing procedures.'
  }
];

// INDUSTRIAL TEMPLATES (8 templates)
export const INDUSTRIAL_TEMPLATES: InstallationTemplate[] = [
  {
    id: 'industrial-three-phase-motor',
    name: 'Three-Phase Motor Installation',
    description: 'DOL or star-delta starter',
    category: 'industrial',
    estimatedDuration: '1-2 days',
    complexity: 'advanced',
    isPopular: true,
    prefilledPrompt: 'Installation method for three-phase motor (5.5kW - 15kW): motor cable sizing considering starting current (6-8x), DOL or star-delta starter installation, overload protection settings, emergency stop integration, local isolator positioning, earthing requirements, and commissioning tests. Include motor nameplate verification and rotation direction checks.'
  },
  {
    id: 'industrial-machine-tool',
    name: 'Machine Tool Connection',
    description: 'CNC, lathe, milling machine',
    category: 'industrial',
    estimatedDuration: '1-2 days',
    complexity: 'advanced',
    isPopular: true,
    prefilledPrompt: 'Machine tool electrical connection method: dedicated three-phase supply, local isolator (lockable), equipment earthing (protective and functional), coolant pump circuits, extraction system integration, machine safety circuit verification, and testing procedures. Include voltage tolerance checks and electrical safety documentation.'
  },
  {
    id: 'industrial-welding-bay',
    name: 'Welding Bay Setup',
    description: 'Welding equipment and extraction',
    category: 'industrial',
    estimatedDuration: '2-3 days',
    complexity: 'advanced',
    prefilledPrompt: 'Welding bay electrical installation: high-current welding socket circuits (up to 63A), dedicated earthing for welding equipment, extraction system power supply, lighting circuits (110V for portable), emergency stop system, and safety interlocks. Include welding return path requirements and testing for fault currents.'
  },
  {
    id: 'industrial-overhead-crane',
    name: 'Overhead Crane Wiring',
    description: 'Festoon system or bus bars',
    category: 'industrial',
    estimatedDuration: '3-5 days',
    complexity: 'advanced',
    prefilledPrompt: 'Overhead crane electrical installation: festoon cable system or bus bar power feed, motor circuits (hoist, long travel, cross travel), pendant control wiring, limit switch circuits, overload protection, emergency stop integration, and earthing via trolley wheels or separate earth conductor. Include safety inspection requirements.'
  },
  {
    id: 'industrial-conveyor-system',
    name: 'Conveyor System Electrical',
    description: 'Drive motors and control circuits',
    category: 'industrial',
    estimatedDuration: '3-4 days',
    complexity: 'advanced',
    prefilledPrompt: 'Conveyor system electrical installation: main drive motor circuits, photo-electric sensor wiring, emergency stop pull-cord circuits, VFD installation (if variable speed), control panel integration, zone isolation points, and safety interlock systems. Include sequential starting requirements and testing procedures.'
  },
  {
    id: 'industrial-air-compressor',
    name: 'Air Compressor Installation',
    description: 'Compressor motor and controls',
    category: 'industrial',
    estimatedDuration: '1-2 days',
    complexity: 'intermediate',
    isPopular: true,
    prefilledPrompt: 'Air compressor electrical installation: three-phase motor circuit sizing (account for starting current), pressure switch wiring, auto-drain solenoid circuits, control panel connection, local isolator (lockable), thermal overload settings, and commissioning checks. Include pressure vessel certification liaison.'
  },
  {
    id: 'industrial-workshop-sockets',
    name: 'Workshop Socket Circuits',
    description: '32A/63A commando outlets',
    category: 'industrial',
    estimatedDuration: '2-3 days',
    complexity: 'intermediate',
    isPopular: true,
    prefilledPrompt: 'Workshop power distribution installation: 32A and 63A commando socket circuits (three-phase), radial circuits with RCD protection, overhead cable reel drop-down points, bench-mounted sockets, cable protection (impact resistance), and testing. Include diversity calculations for multiple high-load tools.'
  },
  {
    id: 'industrial-control-panel',
    name: 'Industrial Control Panel Wiring',
    description: 'PLC, contactors, safety circuits',
    category: 'industrial',
    estimatedDuration: '4-6 days',
    complexity: 'advanced',
    prefilledPrompt: 'Control panel installation and wiring: incoming power supply isolation, PLC power supply and I/O wiring, contactor circuits, safety relay systems, indicator lamps, push-button stations, cable numbering/labelling, functional earthing, and commissioning tests. Include wiring diagrams, terminal schedules, and safety certification.'
  }
];

// Export all templates combined
export const ALL_INSTALLATION_TEMPLATES = [
  ...DOMESTIC_TEMPLATES,
  ...COMMERCIAL_TEMPLATES,
  ...INDUSTRIAL_TEMPLATES
];

// Helper function to get templates by category
export const getTemplatesByCategory = (category: 'domestic' | 'commercial' | 'industrial'): InstallationTemplate[] => {
  return ALL_INSTALLATION_TEMPLATES.filter(t => t.category === category);
};

// Helper function to get popular templates
export const getPopularTemplates = (): InstallationTemplate[] => {
  return ALL_INSTALLATION_TEMPLATES.filter(t => t.isPopular);
};
