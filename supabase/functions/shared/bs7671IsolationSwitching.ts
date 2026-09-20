// BS 7671 Chapter 53: Protection, Isolation, Switching and Control
// Amendment 3:2024 Compliant

export interface IsolationRequirement {
  regulation: string;
  requirement: string;
  poles: string;
  visibility: string;
  lockable: boolean;
  position: string;
  examples: string[];
}

export interface SwitchingDeviceSpec {
  deviceType: string;
  regulation: string;
  application: string;
  poles: string;
  breakCapacity?: string;
  operationalRequirements: string[];
  prohibitedUses?: string[];
}

export interface SPDRequirement {
  regulation: string;
  installationType: string;
  required: boolean;
  typeRequired: string; // Type 1, Type 2, Type 3
  locationDistance: string;
  protectionLevel: string;
  notes: string[];
}

export interface EmergencyStoppingRequirement {
  regulation: string;
  applicationType: string;
  deviceType: string;
  operation: string;
  resetRequirement: string;
  colourCoding: string;
}

// Regulation 537.2: Isolation
export const isolationRequirements: IsolationRequirement[] = [
  {
    regulation: "537.2.1.1",
    requirement: "Every installation shall be capable of being isolated from each source of supply",
    poles: "All live conductors (L+N in single-phase)",
    visibility: "Point of isolation shall be clearly identified",
    lockable: true,
    position: "Readily accessible",
    examples: ["Main switch-disconnector", "Isolator with lockable handle", "Service head fuse (DNO)"]
  },
  {
    regulation: "537.2.1.2",
    requirement: "Means of isolation for individual circuits",
    poles: "All live conductors",
    visibility: "Circuit clearly identified",
    lockable: false,
    position: "Accessible location",
    examples: ["MCB", "RCBO", "Fused switch", "Plug and socket ≤16A"]
  },
  {
    regulation: "537.2.2.1",
    requirement: "Isolation device shall prevent unintentional closure",
    poles: "All poles (L+N)",
    visibility: "Clear ON/OFF indication",
    lockable: true,
    position: "Prevent inadvertent operation",
    examples: ["Lockable isolator", "Removable handle", "Padlockable MCB"]
  }
];

// Regulation 537.3: Switching for Mechanical Maintenance
export const mechanicalMaintenanceSwitching: SwitchingDeviceSpec[] = [
  {
    deviceType: "Switch-disconnector",
    regulation: "537.3.1.1",
    application: "Mechanical maintenance of non-electrical equipment",
    poles: "All live conductors",
    operationalRequirements: [
      "Cuts off full load current",
      "Withstands fault currents",
      "Lockable in OFF position",
      "Clearly marked for purpose"
    ]
  },
  {
    deviceType: "Plug and socket",
    regulation: "537.3.2.6",
    application: "Mechanical maintenance (portable equipment ≤16A)",
    poles: "All poles",
    operationalRequirements: [
      "Rated ≤16A",
      "Readily accessible",
      "Suitable for load"
    ],
    prohibitedUses: ["Fixed equipment >16A", "Emergency switching"]
  }
];

// Regulation 537.4: Emergency Switching (Emergency Stopping)
export const emergencyStoppingRequirements: EmergencyStoppingRequirement[] = [
  {
    regulation: "537.4.1.1",
    applicationType: "Rotating machinery",
    deviceType: "Emergency stop button",
    operation: "Direct breaking of supply or control circuit",
    resetRequirement: "Manual reset required",
    colourCoding: "RED actuator on YELLOW background"
  },
  {
    regulation: "537.4.2.5",
    applicationType: "Equipment hazard situations",
    deviceType: "Emergency switch",
    operation: "Operates directly on main supply",
    resetRequirement: "Manual intervention to restore",
    colourCoding: "RED handle/button"
  }
];

// Regulation 534: Surge Protective Devices (SPDs)
export const spdRequirements: SPDRequirement[] = [
  {
    regulation: "534.4.4.1",
    installationType: "Residential: Single dwelling",
    required: true,
    typeRequired: "Type 2 (minimum)",
    locationDistance: "At origin of installation (consumer unit)",
    protectionLevel: "Up ≤ 1.5kV recommended",
    notes: [
      "Required for all new installations from Jan 2019",
      "Protects against indirect lightning and switching surges",
      "Install between live conductors and PE",
      "Separate MCB protection recommended (typically 16A-32A Type B)"
    ]
  },
  {
    regulation: "534.4.4.2",
    installationType: "Commercial/Industrial: Total earthing system >10m",
    required: true,
    typeRequired: "Type 1 + Type 2 cascade",
    locationDistance: "Type 1 at service entry, Type 2 at sub-distribution",
    protectionLevel: "Type 1: Up ≤ 2.5kV, Type 2: Up ≤ 1.5kV",
    notes: [
      "Type 1 for direct lightning strikes (external earthing system)",
      "Type 2 for sub-distribution boards",
      "Coordination between SPD types essential"
    ]
  },
  {
    regulation: "534.4.5",
    installationType: "Sensitive equipment (IT, medical, fire alarms)",
    required: true,
    typeRequired: "Type 2 + Type 3 at equipment",
    locationDistance: "Type 2 at DB, Type 3 within 10m of equipment",
    protectionLevel: "Type 3: Up ≤ 1.0kV",
    notes: [
      "Type 3 provides local protection for sensitive loads",
      "Install close to protected equipment (<10m cable)",
      "Consider for fire alarm panels, CCTV, server equipment"
    ]
  }
];

// Regulation 537.5: Functional Switching (Control)
export const functionalSwitchingDevices: SwitchingDeviceSpec[] = [
  {
    deviceType: "Functional switch",
    regulation: "537.5.1.1",
    application: "Normal operational switching (lights, motors)",
    poles: "Line conductor only (neutral may remain connected)",
    operationalRequirements: [
      "Rated for full load current",
      "Suitable for number of operations",
      "May be electronic (dimmer, soft-start)"
    ],
    prohibitedUses: ["Isolation", "Emergency switching", "Mechanical maintenance"]
  },
  {
    deviceType: "Contactor",
    regulation: "537.5.2.2",
    application: "Remote control of motors, heating",
    poles: "All line conductors",
    operationalRequirements: [
      "Control circuit protection",
      "Suitable for AC-3 (motors) or AC-1 (resistive) rating",
      "Emergency stop override"
    ]
  }
];

// SPD Installation Guidelines (Reg 534.4)
export interface SPDInstallationGuideline {
  location: string;
  cableLength: string;
  connection: string;
  protection: string;
  earthing: string;
}

export const spdInstallationGuidelines: SPDInstallationGuideline = {
  location: "As close as possible to origin of installation",
  cableLength: "Keep connecting cables <0.5m (ideally <0.25m)",
  connection: "Between line conductors and main earthing terminal",
  protection: "Dedicated 16A-32A Type B MCB or fused switch",
  earthing: "Low impedance path to MET essential (<0.1Ω)"
};

// Utility Functions
export function getSPDRequirementForInstallation(type: string, earthingSystemLength?: number): SPDRequirement | null {
  if (type === 'residential') {
    return spdRequirements.find(req => req.installationType.includes('Single dwelling')) || null;
  }
  
  if (type === 'commercial' || type === 'industrial') {
    if (earthingSystemLength && earthingSystemLength > 10) {
      return spdRequirements.find(req => req.installationType.includes('Total earthing system')) || null;
    }
  }
  
  if (type === 'sensitive-equipment') {
    return spdRequirements.find(req => req.installationType.includes('Sensitive equipment')) || null;
  }
  
  return null;
}

export function getIsolationRequirement(application: string): IsolationRequirement | null {
  const appMap: Record<string, string> = {
    'main': '537.2.1.1',
    'circuit': '537.2.1.2',
    'lockable': '537.2.2.1'
  };
  
  const regNumber = appMap[application.toLowerCase()];
  return isolationRequirements.find(req => req.regulation === regNumber) || null;
}

export function getSwitchingDeviceForApplication(application: string): SwitchingDeviceSpec | null {
  const allSwitchingDevices = [...mechanicalMaintenanceSwitching, ...functionalSwitchingDevices];
  return allSwitchingDevices.find(dev => 
    dev.application.toLowerCase().includes(application.toLowerCase())
  ) || null;
}

export function validateSPDInstallation(params: {
  connectingCableLength: number;
  hasOwnProtection: boolean;
  earthingImpedance: number;
}): { compliant: boolean; issues: string[]; recommendations: string[] } {
  const issues: string[] = [];
  const recommendations: string[] = [];
  
  if (params.connectingCableLength > 0.5) {
    issues.push(`Connecting cable length ${params.connectingCableLength}m exceeds 0.5m maximum (Reg 534.4.6)`);
    recommendations.push("Reduce cable length to <0.5m, ideally <0.25m for optimal performance");
  }
  
  if (!params.hasOwnProtection) {
    issues.push("SPD must have dedicated overcurrent protection (Reg 534.4.2)");
    recommendations.push("Install 16A-32A Type B MCB for SPD protection");
  }
  
  if (params.earthingImpedance > 0.1) {
    issues.push(`Earthing impedance ${params.earthingImpedance}Ω too high for effective SPD operation`);
    recommendations.push("Ensure low-impedance earth path (<0.1Ω) to Main Earthing Terminal");
  }
  
  return {
    compliant: issues.length === 0,
    issues,
    recommendations
  };
}
