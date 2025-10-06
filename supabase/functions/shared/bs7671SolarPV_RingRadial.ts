// BS 7671 Section 712: Solar Photovoltaic (PV) Power Supply Systems
// Appendix 15: Ring and Radial Final Circuit Arrangements
// Amendment 3:2024 Compliant

// ============= SECTION 712: SOLAR PV SYSTEMS =============

export interface PVSystemRequirement {
  regulation: string;
  requirement: string;
  applicableTo: string[];
  critical: boolean;
  notes: string[];
}

export interface PVProtectionRequirement {
  dcSide: string[];
  acSide: string[];
  isolationRequirements: string[];
  labellingRequirements: string[];
}

// Regulation 712.1 - Scope
export const pvSystemScope: PVSystemRequirement = {
  regulation: "712.1",
  requirement: "Applies to PV generators for supply to installations (grid-tied, off-grid, hybrid)",
  applicableTo: [
    "PV for supply NOT connected to public grid (off-grid)",
    "PV for supply IN PARALLEL with public grid (grid-tied)",
    "PV for supply as ALTERNATIVE to public grid (hybrid)"
  ],
  critical: true,
  notes: [
    "Electrical installation starts from PV module/array up to utility supply point",
    "Stand-alone PV systems requirements under consideration",
    "PV module equipment selection and application covered"
  ]
};

// Regulation 712.312.2 - Earthing of DC Side
export const pvEarthingRequirement: PVSystemRequirement = {
  regulation: "712.312.2",
  requirement: "Earthing of ONE live conductor of DC side permitted IF simple separation between AC and DC",
  applicableTo: ["DC side of PV systems"],
  critical: true,
  notes: [
    "Simple separation = electrical isolation between AC and DC",
    "Avoid corrosion at DC earth connections (BS EN 13636, BS EN 15112)",
    "Inverter provides isolation barrier"
  ]
};

// Regulation 712.410.101 - DC Side Always Energized
export const pvDCSafetyWarning: PVSystemRequirement = {
  regulation: "712.410.101",
  requirement: "DC side equipment ALWAYS considered energized, even when AC disconnected or inverter off",
  applicableTo: ["All DC side equipment - PV modules, cables, isolators, combiner boxes"],
  critical: true,
  notes: [
    "⚠️ CRITICAL SAFETY: PV modules generate voltage when exposed to light",
    "Cannot be switched off unless covered/darkness",
    "DC isolators required for maintenance safety",
    "Installers must use appropriate PPE and procedures"
  ]
};

// Regulation 712.410.102 & 712.412.101 - DC Side Protection
export const pvDCProtection: PVProtectionRequirement = {
  dcSide: [
    "Double or reinforced insulation (Class II equipment) - Reg 412",
    "Extra-low voltage SELV or PELV - Reg 414",
    "PV modules, cables, combiner boxes MUST be Class II or equivalent",
    "No exposed-conductive-parts on DC side",
    "Wiring systems must have equivalent insulation protection"
  ],
  acSide: [
    "Standard AC protection applies (Chapter 41)",
    "RCD protection for AC circuits as per 411.3.3",
    "Automatic disconnection of supply (ADS)",
    "G99/G98 compliance for grid connection"
  ],
  isolationRequirements: [
    "DC isolator required on DC side (near inverter)",
    "AC isolator required on AC side (consumer unit)",
    "Means to isolate PV from grid (G99/G98)",
    "Emergency switching accessible",
    "Isolators rated for DC voltage and current"
  ],
  labellingRequirements: [
    "MANDATORY: 'PV DC Isolator' label at DC isolator",
    "MANDATORY: 'Dual Supply' warning at consumer unit",
    "MANDATORY: 'PV Installation - DC side' on cables/conduit",
    "MANDATORY: Emergency contact information",
    "Voltage and current ratings on DC side equipment"
  ]
};

// PV System Design Considerations
export interface PVDesignConsiderations {
  topic: string;
  regulation: string;
  considerations: string[];
}

export const pvDesignGuidance: PVDesignConsiderations[] = [
  {
    topic: "String Sizing",
    regulation: "712",
    considerations: [
      "Voc (open circuit voltage) must not exceed inverter max DC input",
      "Consider temperature coefficient (Voc increases in cold weather)",
      "Minimum 2-3 modules per string for MPPT operation",
      "Maximum string length limited by cable voltage drop and inverter",
      "Use online string calculators (e.g., PVsyst, SolarEdge Designer)"
    ]
  },
  {
    topic: "DC Cable Sizing",
    regulation: "712 + Appendix 4",
    considerations: [
      "Typically 4mm² or 6mm² for domestic (up to 4kWp)",
      "10mm² for larger commercial systems",
      "Voltage drop limit: 3% max on DC side",
      "Use solar-rated DC cable (e.g., 6491X, H1Z2Z2-K)",
      "UV resistant, rodent-proof, -40°C to +90°C rated",
      "Single-core cables in conduit or trunking (fire protection)"
    ]
  },
  {
    topic: "Overcurrent Protection",
    regulation: "712 + 433",
    considerations: [
      "DC fuses/circuit breakers at combiner box (if parallel strings)",
      "AC circuit breaker at consumer unit (typically 16A-32A Type B)",
      "G99/G98 protection relay for >16A export",
      "Inverter internal protection (typically sufficient for <16A)"
    ]
  },
  {
    topic: "Earthing and Lightning Protection",
    regulation: "712 + 534 + BS EN 62305",
    considerations: [
      "Type 2 SPD at AC side (consumer unit) - MANDATORY (Reg 534.4.4.1)",
      "Type 2 SPD at DC side recommended (inverter protection)",
      "Equipotential bonding of PV frame to MET",
      "Lightning protection system if required (BS EN 62305)",
      "Roof penetrations must maintain IP rating and weatherproofing"
    ]
  },
  {
    topic: "G99/G98 Grid Connection",
    regulation: "G99 (>16A), G98 (≤16A)",
    considerations: [
      "G98: ≤16A per phase, ≤3.68kW single-phase - No DNO approval required (notify only)",
      "G99: >16A or >3.68kW - DNO approval REQUIRED before connection",
      "G99.1-2: >16A to ≤50A - Fast-track approval",
      "G99.1-3: >50A - Full connection agreement",
      "Loss of mains (LOM) protection required",
      "Export limitation device if required by DNO"
    ]
  }
];

// ============= APPENDIX 15: RING AND RADIAL CIRCUITS =============

export interface CircuitDesignOption {
  circuitType: string;
  regulation: string;
  protectiveDevice: string;
  cableSize: string;
  maxFloorArea: string;
  socketOutlets: string;
  loadLimitation: string;
  notes: string[];
}

// Regulation 433.1.204 - Ring Final Circuits
export const ringFinalCircuitOptions: CircuitDesignOption[] = [
  {
    circuitType: "Ring Final Circuit (32A)",
    regulation: "433.1.204 + Appendix 15",
    protectiveDevice: "32A MCB Type B (or 30A BS 3036 fuse)",
    cableSize: "2.5mm² copper (line, neutral, CPC)",
    maxFloorArea: "100m² (historical limit - not mandatory)",
    socketOutlets: "Unlimited socket-outlets on ring",
    loadLimitation: "Load current in ANY part of ring should not exceed cable capacity (27A for 2.5mm²) for LONG PERIODS",
    notes: [
      "Most common UK domestic socket circuit",
      "Socket-outlets located to provide REASONABLE SHARING of load around ring",
      "DO NOT supply immersion heaters, comprehensive electric space heating, or similar continuous loads from ring",
      "Cookers/ovens >2kW on DEDICATED radial circuit",
      "100m² floor area is guidance, not mandatory - focus on load distribution",
      "Spurs permitted: 1 non-fused spur per socket on ring, OR unlimited fused spurs (FCU)"
    ]
  },
  {
    circuitType: "Ring Final Circuit (40A) - Larger Areas",
    regulation: "433.1.204",
    protectiveDevice: "40A MCB Type B",
    cableSize: "4mm² copper (line, neutral, CPC)",
    maxFloorArea: ">100m² (commercial/industrial)",
    socketOutlets: "Unlimited socket-outlets",
    loadLimitation: "Load distribution critical - 37A max for 4mm² cable",
    notes: [
      "For larger commercial areas",
      "Requires careful load calculation",
      "Consider diversity factors"
    ]
  }
];

export const radialCircuitOptions: CircuitDesignOption[] = [
  {
    circuitType: "Radial Circuit (20A)",
    regulation: "Appendix 15",
    protectiveDevice: "20A MCB Type B",
    cableSize: "2.5mm² copper",
    maxFloorArea: "50m² (guidance)",
    socketOutlets: "Unlimited (within load limits)",
    loadLimitation: "Total load ≤20A",
    notes: [
      "Simple design, easy to extend",
      "Good for dedicated areas (e.g., kitchen worktop sockets)",
      "Lower fault level than 32A ring"
    ]
  },
  {
    circuitType: "Radial Circuit (32A)",
    regulation: "Appendix 15",
    protectiveDevice: "32A MCB Type B",
    cableSize: "4mm² copper",
    maxFloorArea: "75m² (guidance)",
    socketOutlets: "Unlimited (within load limits)",
    loadLimitation: "Total load ≤32A",
    notes: [
      "Higher capacity than 20A radial",
      "Good for commercial applications",
      "More cable cost than 2.5mm² ring but simpler testing"
    ]
  },
  {
    circuitType: "Dedicated Radial (Various)",
    regulation: "433.1",
    protectiveDevice: "Sized to appliance (16A, 20A, 32A, 40A, 45A)",
    cableSize: "Sized to load (2.5mm² to 10mm²)",
    maxFloorArea: "N/A - point-to-point",
    socketOutlets: "Single appliance or FCU",
    loadLimitation: "Matches appliance rating",
    notes: [
      "Immersion heater: 16A MCB, 2.5mm²",
      "Electric shower: 40-45A MCB, 10mm²",
      "Cooker: 32-40A MCB, 6mm² (with diversity)",
      "Washing machine: 16A or 20A MCB, 2.5mm²"
    ]
  }
];

// Circuit Selection Guidance
export function selectCircuitType(params: {
  floorArea: number;
  applicationType: string;
  expectedLoad: number;
}): CircuitDesignOption {
  const { floorArea, applicationType, expectedLoad } = params;
  
  // Dedicated high-power appliances
  if (applicationType === 'dedicated') {
    if (expectedLoad > 32) {
      return radialCircuitOptions[2]; // Dedicated high-power
    }
    return radialCircuitOptions[2];
  }
  
  // General socket circuits
  if (applicationType === 'domestic' || applicationType === 'commercial') {
    // Ring circuit preferred for UK domestic
    if (floorArea <= 100 && applicationType === 'domestic') {
      return ringFinalCircuitOptions[0]; // 32A ring
    }
    
    // Radial for smaller areas or specific requirements
    if (floorArea <= 50) {
      return radialCircuitOptions[0]; // 20A radial
    }
    
    if (floorArea <= 75) {
      return radialCircuitOptions[1]; // 32A radial
    }
    
    // Larger area ring
    return ringFinalCircuitOptions[1]; // 40A ring (4mm²)
  }
  
  return ringFinalCircuitOptions[0]; // Default 32A ring
}

// Ring Circuit Testing Requirements
export const ringCircuitTestingRequirements = {
  regulation: "643.2.2",
  tests: [
    {
      step: 1,
      test: "End-to-end resistance test",
      method: "Disconnect ring at consumer unit. Measure R1, RN, R2 (CPC) end-to-end",
      acceptance: "R1 and RN similar (copper), R2 approximately 1.67 × R1 (if same CSA)"
    },
    {
      step: 2,
      test: "Cross-connection test at each socket",
      method: "Short L+N together. Test L-E and N-E at each socket",
      acceptance: "(R1+R2)/4 at each socket, ±0.05Ω of average value"
    },
    {
      step: 3,
      test: "Continuity verification",
      method: "Readings should form bell curve (highest at ends, lowest at midpoint)",
      acceptance: "No breaks, interconnections, or transpositions detected"
    }
  ],
  notes: [
    "Ring continuity test MUST be performed before energizing",
    "Detects broken rings, incorrect wiring, interconnected rings",
    "Record highest (R1+R2) value for Zs calculation"
  ]
};
