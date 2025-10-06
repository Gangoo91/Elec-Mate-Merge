// BS 7671 Knowledge - Batch 11: Appendix 3 (Time/Current Characteristics) & Section 559 (Luminaires)
// Amendment 3:2024 compliant

export interface TimeCurrentCharacteristic {
  deviceType: 'MCB' | 'RCBO' | 'RCD' | 'Fuse';
  curveType?: 'B' | 'C' | 'D';  // For MCBs
  fuseType?: 'BS 88' | 'BS 1361' | 'BS 3036';
  ratedCurrent: number;
  disconnectionTimes: {
    current: number;  // Multiple of rated current
    maxTime: number;  // Maximum disconnection time in seconds
  }[];
  regulation: string;
}

// Appendix 3: Time/Current Characteristics of OCPDs
export const MCB_DISCONNECTION_TIMES: Record<string, TimeCurrentCharacteristic> = {
  'Type B': {
    deviceType: 'MCB',
    curveType: 'B',
    ratedCurrent: 0, // Variable
    disconnectionTimes: [
      { current: 3, maxTime: 0.1 },  // 3×In: 0.1s max (conventional non-trip)
      { current: 5, maxTime: 0.04 }, // 5×In: 0.04s max (instantaneous trip)
    ],
    regulation: 'BS EN 60898 / Appendix 3'
  },
  'Type C': {
    deviceType: 'MCB',
    curveType: 'C',
    ratedCurrent: 0,
    disconnectionTimes: [
      { current: 5, maxTime: 0.1 },
      { current: 10, maxTime: 0.04 },
    ],
    regulation: 'BS EN 60898 / Appendix 3'
  },
  'Type D': {
    deviceType: 'MCB',
    curveType: 'D',
    ratedCurrent: 0,
    disconnectionTimes: [
      { current: 10, maxTime: 0.1 },
      { current: 20, maxTime: 0.04 },
    ],
    regulation: 'BS EN 60898 / Appendix 3'
  }
};

// RCD Disconnection Characteristics (Reg 643.8)
export const RCD_DISCONNECTION_REQUIREMENTS = {
  generalType: {
    testCurrent: 'IΔn', // Rated residual operating current
    maxDisconnectionTime: 0.3, // 300ms for general non-delay type
    regulation: '643.8'
  },
  additionalProtection: {
    ratedCurrent: 30, // mA
    maxDisconnectionTime: 0.04, // 40ms at 5×IΔn
    regulation: '415.1.1'
  },
  types: {
    'Type AC': 'Standard RCD - AC fault currents only',
    'Type A': 'Detects AC + pulsating DC fault currents',
    'Type F': 'Type A + detects composite waveforms (inverters)',
    'Type B': 'Detects AC + DC + high-frequency fault currents (EV charging)'
  }
};

// Discrimination/Selectivity (Reg 536.4.1)
export interface SelectivityRequirement {
  upstreamDevice: string;
  downstreamDevice: string;
  requirement: string;
  regulation: string;
}

export const SELECTIVITY_GUIDELINES: SelectivityRequirement[] = [
  {
    upstreamDevice: 'Main incomer MCB/RCD',
    downstreamDevice: 'Final circuit RCBO',
    requirement: 'Time/current curves must NOT overlap - upstream device MUST NOT trip before downstream',
    regulation: '536.4.1.2'
  },
  {
    upstreamDevice: 'RCD (100mA)',
    downstreamDevice: 'RCD (30mA)',
    requirement: 'Upstream RCD must be time-delayed OR have higher IΔn to allow downstream to trip first',
    regulation: '536.4.1.4'
  },
  {
    upstreamDevice: 'Main fuse (BS 88)',
    downstreamDevice: 'MCB',
    requirement: 'Fuse let-through energy (I²t) must be less than MCB withstand at all fault current levels',
    regulation: '536.4.1.3'
  }
];

// =============================================
// SECTION 559: LUMINAIRES AND LIGHTING INSTALLATIONS
// =============================================

export interface LuminaireRequirement {
  regulation: string;
  requirement: string;
  critical: boolean;
}

// Reg 559.1: Scope
export const LUMINAIRE_SCOPE = {
  applies: [
    'Fixed luminaires as part of permanent installation',
    'Recessed luminaires (downlights)',
    'Track systems for luminaires (BS EN 60570)',
    'Ground-recessed luminaires (Reg 559.10)'
  ],
  excluded: [
    'High voltage signs (neon tubes) - see BS 559',
    'Discharge tube signs >1kV but ≤10kV (BS EN 50107)',
    'Temporary festoon lighting'
  ],
  regulation: '559.1'
};

// Reg 559.5.1: Connection to Fixed Wiring
export const LUMINAIRE_CONNECTION_METHODS = [
  { method: 'Ceiling rose', standard: 'BS 67', voltagelimit: '250V', regulation: '559.5.1(i)' },
  { method: 'Luminaire Supporting Coupler (LSC)', standard: 'BS 6972 / BS 7001', voltagelimit: 'N/A', regulation: '559.5.1(ii)' },
  { method: 'Batten lampholder', standard: 'BS EN 60598', voltagelimit: 'N/A', regulation: '559.5.1(iii)' },
  { method: 'Luminaire complying', standard: 'BS EN 60598', voltagelimit: 'N/A', regulation: '559.5.1(iv)' },
  { method: 'Socket-outlet', standard: 'BS 1363-2 / BS 546 / BS EN 60309-2', voltagelimit: 'N/A', regulation: '559.5.1(v)' },
  { method: 'Device for Connecting Luminaire (DCL)', standard: 'BS EN 61995-1', voltagelimit: 'N/A', regulation: '559.5.1(ix)' }
];

// CRITICAL: Reg 559.5.1.204 - Overcurrent Protection
export const LAMPHOLDER_OVERCURRENT_PROTECTION = {
  lampholderTypes: ['B15', 'B22', 'E14', 'E27', 'E40'],
  maxProtectiveDeviceRating: 16, // Amps
  requirement: 'Lighting circuits with these lampholders MUST be protected by max 16A OCPD',
  regulation: '559.5.1.204',
  critical: true
};

// Reg 559.5.1.206: Polarity (CRITICAL SAFETY)
export const LAMPHOLDER_POLARITY_REQUIREMENT = {
  systems: ['TN', 'TT'],
  requirement: 'Edison screw/single centre bayonet OUTER CONTACT must be connected to NEUTRAL conductor',
  exceptions: ['E14 and E27 complying with BS EN 60238'],
  reason: 'Prevents shock hazard when changing lamps',
  regulation: '559.5.1.206',
  critical: true
};

// Reg 559.5.1.205: Temperature Rating
export const BAYONET_LAMPHOLDER_TEMP = {
  types: ['B15', 'B22'],
  standard: 'BS EN 61184',
  requiredTemperatureRating: 'T2',
  regulation: '559.5.1.205'
};

// Reg 559.5.2: Fixing Requirements
export const LUMINAIRE_FIXING_REQUIREMENTS = {
  minimumLoadCapacity: 5, // kg
  requirement: 'Fixing means must support minimum 5kg. If luminaire >5kg, must support actual mass',
  flexibleCableSupport: 'Flexible cable mass support per Table 4F3A',
  ceilingCompatibility: 'Must be compatible with ceiling/suspended ceiling mechanical capability',
  regulation: '559.5.2'
};

// Reg 559.4: Protection Against Thermal Effects
export const LUMINAIRE_THERMAL_PROTECTION = {
  considerations: [
    'Maximum permissible lamp power dissipation',
    'Fire-resistance of adjacent materials at installation point',
    'Minimum distance to combustible materials (including spotlight beam path)',
    'Thermal effects on thermally insulated ceilings'
  ],
  pelmets: 'Ensure no adverse effects from curtains/blinds operation',
  regulation: '559.4'
};

// Reg 559.10: Ground-Recessed Luminaires (NEW - A2:2022)
export const GROUND_RECESSED_LUMINAIRES = {
  standard: 'BS EN 60598-2-13',
  guidance: 'Table A.1 of BS EN 60598-2-13',
  considerations: [
    'IP rating for ground installation (typically IPX7)',
    'Load bearing capacity if installed in driveways',
    'Thermal management in enclosed ground conditions',
    'Protection against ingress of moisture and debris'
  ],
  regulation: '559.10',
  amendment: 'A2:2022'
};

// Reg 559.9: Stroboscopic Effect
export const STROBOSCOPIC_EFFECT_MITIGATION = {
  risk: 'Machines with moving parts - stroboscopic effect can make them appear stationary',
  solutions: [
    'Use high-frequency controlgear (eliminates flicker)',
    'Distribute lighting loads across all 3 phases of polyphase supply',
    'Use LED luminaires with flicker-free drivers'
  ],
  regulation: '559.9'
};

// Reg 559.7: Compensation Capacitors
export const COMPENSATION_CAPACITORS = {
  threshold: 0.5, // μF
  requirement: 'Capacitors >0.5μF MUST have discharge resistors',
  standard: 'BS EN 61048',
  warningLabel: 'Required per Reg 416.2.5',
  regulation: '559.7'
};

// Reg 411.3.4: RCD Protection for Domestic Luminaires (CRITICAL)
export const DOMESTIC_LUMINAIRE_RCD_REQUIREMENT = {
  applies: 'All fixed luminaires in household/similar installations',
  requirement: '30mA RCD protection MANDATORY',
  exceptions: 'Luminaires in zones where RCD already required (bathrooms, outdoor)',
  regulation: '411.3.4',
  amendment: 'A3:2024',
  critical: true
};

// Reg 559.5.5: Groups of Luminaires on Polyphase
export const POLYPHASE_LUMINAIRE_GROUPS = {
  requirement: 'Groups divided between line conductors with ONE common neutral MUST have device to disconnect ALL lines simultaneously',
  reason: 'Prevents shock hazard from energized neutral when only one phase isolated',
  device: 'Multi-pole isolator or linked switch-disconnector',
  regulation: '559.5.5'
};

// =============================================
// UTILITY FUNCTIONS
// =============================================

export function getMCBDisconnectionTime(curveType: 'B' | 'C' | 'D', faultCurrent: number, ratedCurrent: number): number {
  const multiple = faultCurrent / ratedCurrent;
  const characteristic = MCB_DISCONNECTION_TIMES[`Type ${curveType}`];
  
  for (const point of characteristic.disconnectionTimes) {
    if (multiple >= point.current) {
      return point.maxTime;
    }
  }
  
  return Infinity; // Fault current too low to guarantee disconnection
}

export function checkSelectivity(upstreamType: string, upstreamRating: number, downstreamType: string, downstreamRating: number): {
  selective: boolean;
  recommendation: string;
} {
  // Simplified selectivity check
  if (upstreamType === 'RCD' && downstreamType === 'RCD') {
    return {
      selective: upstreamRating > downstreamRating * 3,
      recommendation: 'Upstream RCD should be ≥3× downstream rating OR time-delayed'
    };
  }
  
  if (upstreamType === 'MCB' && downstreamType === 'MCB') {
    return {
      selective: upstreamRating >= downstreamRating * 1.6,
      recommendation: 'Upstream MCB should be ≥1.6× downstream rating for discrimination'
    };
  }
  
  return {
    selective: true,
    recommendation: 'Refer to manufacturer time/current curves for detailed discrimination'
  };
}

export function getLuminaireConnectionMethod(voltage: number, applicationType: string): string {
  if (voltage > 250) {
    return 'Ceiling rose NOT permitted >250V. Use luminaire direct connection or suitable terminals (Reg 559.5.1.201)';
  }
  
  if (applicationType === 'track-system') {
    return 'Luminaire track system complying with BS EN 60570 (Reg 559.3.4)';
  }
  
  if (applicationType === 'ground-recessed') {
    return 'Follow guidance in Table A.1 of BS EN 60598-2-13 (Reg 559.10)';
  }
  
  return 'Select from approved methods per Reg 559.5.1';
}

export function validateLampholderCircuit(lampholderType: string, ocpdRating: number): {
  compliant: boolean;
  issue?: string;
} {
  if (LAMPHOLDER_OVERCURRENT_PROTECTION.lampholderTypes.includes(lampholderType)) {
    if (ocpdRating > LAMPHOLDER_OVERCURRENT_PROTECTION.maxProtectiveDeviceRating) {
      return {
        compliant: false,
        issue: `${lampholderType} lampholders require max ${LAMPHOLDER_OVERCURRENT_PROTECTION.maxProtectiveDeviceRating}A overcurrent protection (Reg 559.5.1.204). Current: ${ocpdRating}A`
      };
    }
  }
  
  return { compliant: true };
}

export function checkRCDRequirementForLuminaire(installationType: string): {
  required: boolean;
  regulation: string;
} {
  if (installationType === 'domestic' || installationType === 'household') {
    return {
      required: true,
      regulation: '411.3.4 - All domestic fixed luminaires require 30mA RCD protection (A3:2024)'
    };
  }
  
  if (installationType === 'bathroom') {
    return {
      required: true,
      regulation: '701.411.3.3 - All circuits in bathrooms require 30mA RCD'
    };
  }
  
  if (installationType === 'outdoor') {
    return {
      required: true,
      regulation: '714.411.3.4 - Outdoor lighting requires RCD protection'
    };
  }
  
  return {
    required: false,
    regulation: 'No specific RCD requirement for this installation type'
  };
}
