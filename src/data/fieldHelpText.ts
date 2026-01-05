export const fieldHelpText = {
  // Supply Characteristics
  earthingArrangement: {
    content: "The system earthing type defines how the installation is earthed relative to the supply.",
    regulation: "411.3-411.6",
    example: "TN-C-S for PME supplies, TT for installations with own earth electrode"
  },
  earthElectrodeResistance: {
    content: "Resistance of the earth electrode to general mass of earth. Lower values indicate better earthing.",
    regulation: "542.2",
    example: "Below 20Ω for TT systems, typically 200Ω maximum"
  },
  mainBondingSize: {
    content: "Cross-sectional area of main protective bonding conductors connecting extraneous conductive parts.",
    regulation: "544.1",
    example: "10mm² for most domestic installations"
  },
  
  // Testing
  testMethod: {
    content: "Method used for insulation resistance testing as per BS 7671.",
    regulation: "612.3",
    example: "Method 1 (whole installation), Method 2 (by sub-circuit), Method 3 (by individual circuit)"
  },
  testVoltage: {
    content: "DC test voltage applied during insulation resistance testing.",
    regulation: "612.3.2",
    example: "500V for LV installations (SELV/PELV use 250V)"
  },
  
  // RCD
  rcdRating: {
    content: "Rated residual operating current (IΔn) at which the RCD will trip.",
    regulation: "531.2",
    example: "30mA for socket outlets, 100mA for fire protection"
  },
  
  // Circuit Protection
  protectiveDeviceRating: {
    content: "Nominal current rating of the overcurrent protective device.",
    regulation: "433.1",
    example: "6A for lighting, 32A for ring final circuits"
  },
  
  // Earthing & Bonding
  supplementaryBonding: {
    content: "Additional bonding of simultaneously accessible exposed and extraneous conductive parts.",
    regulation: "415.2",
    example: "Required in locations with increased shock risk unless RCD protection provided"
  }
};
