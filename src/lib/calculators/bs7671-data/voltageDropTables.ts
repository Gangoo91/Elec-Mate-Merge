// BS 7671 Appendix 4 Voltage Drop Tables
// Tables 4D1B, 4D2B, 4D3B, 4D4B

export interface VoltageDropEntry {
  size: number; // mm²
  twoCoreDc?: number; // mV/A/m for DC
  twoCoreAC: {
    methodsAB: { r: number; x: number; z: number }; // mV/A/m resistance, reactance, impedance
    methodsCF: { r: number; x: number; z: number };
  };
  threeOrFourCoreAC: {
    methodsAB: { r: number; x: number; z: number };
    methodsCF: { r: number; x: number; z: number };
  };
}

// Table 4D1B - PVC insulated single-core cables (70°C conductor temperature)
// Reference: BS 7671:2018+A3:2024 Appendix 4
export const voltageDropPvcSingleCore: VoltageDropEntry[] = [
  { 
    size: 1.0, 
    twoCoreDc: 44,
    twoCoreAC: { 
      methodsAB: { r: 44, x: 0.175, z: 44 }, 
      methodsCF: { r: 44, x: 0.175, z: 44 } 
    },
    threeOrFourCoreAC: { 
      methodsAB: { r: 38, x: 0.145, z: 38 }, 
      methodsCF: { r: 38, x: 0.145, z: 38 } 
    }
  },
  { 
    size: 1.5, 
    twoCoreDc: 29,
    twoCoreAC: { 
      methodsAB: { r: 29, x: 0.170, z: 29 }, 
      methodsCF: { r: 29, x: 0.170, z: 29 } 
    },
    threeOrFourCoreAC: { 
      methodsAB: { r: 25, x: 0.140, z: 25 }, 
      methodsCF: { r: 25, x: 0.140, z: 25 } 
    }
  },
  { 
    size: 2.5, 
    twoCoreDc: 18,
    twoCoreAC: { 
      methodsAB: { r: 18, x: 0.165, z: 18 }, 
      methodsCF: { r: 18, x: 0.165, z: 18 } 
    },
    threeOrFourCoreAC: { 
      methodsAB: { r: 15, x: 0.135, z: 15 }, 
      methodsCF: { r: 15, x: 0.135, z: 15 } 
    }
  },
  { 
    size: 4, 
    twoCoreDc: 11,
    twoCoreAC: { 
      methodsAB: { r: 11, x: 0.160, z: 11 }, 
      methodsCF: { r: 11, x: 0.160, z: 11 } 
    },
    threeOrFourCoreAC: { 
      methodsAB: { r: 9.5, x: 0.130, z: 9.5 }, 
      methodsCF: { r: 9.5, x: 0.130, z: 9.5 } 
    }
  },
  { 
    size: 6, 
    twoCoreDc: 7.3,
    twoCoreAC: { 
      methodsAB: { r: 7.3, x: 0.155, z: 7.3 }, 
      methodsCF: { r: 7.3, x: 0.155, z: 7.3 } 
    },
    threeOrFourCoreAC: { 
      methodsAB: { r: 6.4, x: 0.125, z: 6.4 }, 
      methodsCF: { r: 6.4, x: 0.125, z: 6.4 } 
    }
  },
  { 
    size: 10, 
    twoCoreDc: 4.4,
    twoCoreAC: { 
      methodsAB: { r: 4.4, x: 0.150, z: 4.4 }, 
      methodsCF: { r: 4.4, x: 0.150, z: 4.4 } 
    },
    threeOrFourCoreAC: { 
      methodsAB: { r: 3.8, x: 0.120, z: 3.8 }, 
      methodsCF: { r: 3.8, x: 0.120, z: 3.8 } 
    }
  },
  { 
    size: 16, 
    twoCoreDc: 2.8,
    twoCoreAC: { 
      methodsAB: { r: 2.8, x: 0.145, z: 2.8 }, 
      methodsCF: { r: 2.8, x: 0.145, z: 2.8 } 
    },
    threeOrFourCoreAC: { 
      methodsAB: { r: 2.4, x: 0.115, z: 2.4 }, 
      methodsCF: { r: 2.4, x: 0.115, z: 2.4 } 
    }
  },
  { 
    size: 25, 
    twoCoreDc: 1.75,
    twoCoreAC: { 
      methodsAB: { r: 1.75, x: 0.140, z: 1.75 }, 
      methodsCF: { r: 1.50, x: 0.175, z: 1.50 } 
    },
    threeOrFourCoreAC: { 
      methodsAB: { r: 1.50, x: 0.110, z: 1.50 }, 
      methodsCF: { r: 1.30, x: 0.145, z: 1.30 } 
    }
  },
  { 
    size: 35, 
    twoCoreDc: 1.25,
    twoCoreAC: { 
      methodsAB: { r: 1.25, x: 0.135, z: 1.25 }, 
      methodsCF: { r: 1.10, x: 0.170, z: 1.10 } 
    },
    threeOrFourCoreAC: { 
      methodsAB: { r: 1.10, x: 0.105, z: 1.10 }, 
      methodsCF: { r: 0.95, x: 0.140, z: 0.95 } 
    }
  },
  { 
    size: 50, 
    twoCoreDc: 0.93,
    twoCoreAC: { 
      methodsAB: { r: 0.93, x: 0.130, z: 0.94 }, 
      methodsCF: { r: 0.78, x: 0.165, z: 0.80 } 
    },
    threeOrFourCoreAC: { 
      methodsAB: { r: 0.81, x: 0.100, z: 0.82 }, 
      methodsCF: { r: 0.67, x: 0.135, z: 0.69 } 
    }
  },
  { 
    size: 70, 
    twoCoreDc: 0.63,
    twoCoreAC: { 
      methodsAB: { r: 0.63, x: 0.125, z: 0.64 }, 
      methodsCF: { r: 0.55, x: 0.155, z: 0.57 } 
    },
    threeOrFourCoreAC: { 
      methodsAB: { r: 0.55, x: 0.095, z: 0.56 }, 
      methodsCF: { r: 0.47, x: 0.130, z: 0.49 } 
    }
  },
  { 
    size: 95, 
    twoCoreDc: 0.46,
    twoCoreAC: { 
      methodsAB: { r: 0.46, x: 0.120, z: 0.48 }, 
      methodsCF: { r: 0.41, x: 0.145, z: 0.44 } 
    },
    threeOrFourCoreAC: { 
      methodsAB: { r: 0.40, x: 0.090, z: 0.41 }, 
      methodsCF: { r: 0.36, x: 0.125, z: 0.38 } 
    }
  },
  { 
    size: 120, 
    twoCoreDc: 0.36,
    twoCoreAC: { 
      methodsAB: { r: 0.36, x: 0.115, z: 0.38 }, 
      methodsCF: { r: 0.32, x: 0.140, z: 0.35 } 
    },
    threeOrFourCoreAC: { 
      methodsAB: { r: 0.31, x: 0.085, z: 0.32 }, 
      methodsCF: { r: 0.28, x: 0.120, z: 0.31 } 
    }
  },
  { 
    size: 150, 
    twoCoreDc: 0.29,
    twoCoreAC: { 
      methodsAB: { r: 0.29, x: 0.110, z: 0.31 }, 
      methodsCF: { r: 0.265, x: 0.135, z: 0.30 } 
    },
    threeOrFourCoreAC: { 
      methodsAB: { r: 0.25, x: 0.080, z: 0.26 }, 
      methodsCF: { r: 0.23, x: 0.115, z: 0.26 } 
    }
  },
  { 
    size: 185, 
    twoCoreDc: 0.235,
    twoCoreAC: { 
      methodsAB: { r: 0.235, x: 0.105, z: 0.26 }, 
      methodsCF: { r: 0.21, x: 0.130, z: 0.25 } 
    },
    threeOrFourCoreAC: { 
      methodsAB: { r: 0.20, x: 0.075, z: 0.21 }, 
      methodsCF: { r: 0.18, x: 0.110, z: 0.21 } 
    }
  },
  { 
    size: 240, 
    twoCoreDc: 0.180,
    twoCoreAC: { 
      methodsAB: { r: 0.180, x: 0.100, z: 0.21 }, 
      methodsCF: { r: 0.165, x: 0.125, z: 0.21 } 
    },
    threeOrFourCoreAC: { 
      methodsAB: { r: 0.155, x: 0.070, z: 0.17 }, 
      methodsCF: { r: 0.14, x: 0.105, z: 0.17 } 
    }
  },
  { 
    size: 300, 
    twoCoreDc: 0.145,
    twoCoreAC: { 
      methodsAB: { r: 0.145, x: 0.095, z: 0.17 }, 
      methodsCF: { r: 0.135, x: 0.120, z: 0.18 } 
    },
    threeOrFourCoreAC: { 
      methodsAB: { r: 0.125, x: 0.065, z: 0.14 }, 
      methodsCF: { r: 0.115, x: 0.100, z: 0.15 } 
    }
  },
];

// Table 4D2B - XLPE insulated single-core cables (90°C conductor temperature)
export const voltageDropXlpeSingleCore: VoltageDropEntry[] = [
  { 
    size: 1.0, 
    twoCoreDc: 48,
    twoCoreAC: { 
      methodsAB: { r: 48, x: 0.175, z: 48 }, 
      methodsCF: { r: 48, x: 0.175, z: 48 } 
    },
    threeOrFourCoreAC: { 
      methodsAB: { r: 42, x: 0.145, z: 42 }, 
      methodsCF: { r: 42, x: 0.145, z: 42 } 
    }
  },
  { 
    size: 1.5, 
    twoCoreDc: 32,
    twoCoreAC: { 
      methodsAB: { r: 32, x: 0.170, z: 32 }, 
      methodsCF: { r: 32, x: 0.170, z: 32 } 
    },
    threeOrFourCoreAC: { 
      methodsAB: { r: 28, x: 0.140, z: 28 }, 
      methodsCF: { r: 28, x: 0.140, z: 28 } 
    }
  },
  { 
    size: 2.5, 
    twoCoreDc: 19,
    twoCoreAC: { 
      methodsAB: { r: 19, x: 0.165, z: 19 }, 
      methodsCF: { r: 19, x: 0.165, z: 19 } 
    },
    threeOrFourCoreAC: { 
      methodsAB: { r: 17, x: 0.135, z: 17 }, 
      methodsCF: { r: 17, x: 0.135, z: 17 } 
    }
  },
  { 
    size: 4, 
    twoCoreDc: 12,
    twoCoreAC: { 
      methodsAB: { r: 12, x: 0.160, z: 12 }, 
      methodsCF: { r: 12, x: 0.160, z: 12 } 
    },
    threeOrFourCoreAC: { 
      methodsAB: { r: 10, x: 0.130, z: 10 }, 
      methodsCF: { r: 10, x: 0.130, z: 10 } 
    }
  },
  { 
    size: 6, 
    twoCoreDc: 8.0,
    twoCoreAC: { 
      methodsAB: { r: 8.0, x: 0.155, z: 8.0 }, 
      methodsCF: { r: 8.0, x: 0.155, z: 8.0 } 
    },
    threeOrFourCoreAC: { 
      methodsAB: { r: 7.0, x: 0.125, z: 7.0 }, 
      methodsCF: { r: 7.0, x: 0.125, z: 7.0 } 
    }
  },
  { 
    size: 10, 
    twoCoreDc: 4.8,
    twoCoreAC: { 
      methodsAB: { r: 4.8, x: 0.150, z: 4.8 }, 
      methodsCF: { r: 4.8, x: 0.150, z: 4.8 } 
    },
    threeOrFourCoreAC: { 
      methodsAB: { r: 4.2, x: 0.120, z: 4.2 }, 
      methodsCF: { r: 4.2, x: 0.120, z: 4.2 } 
    }
  },
  { 
    size: 16, 
    twoCoreDc: 3.0,
    twoCoreAC: { 
      methodsAB: { r: 3.0, x: 0.145, z: 3.0 }, 
      methodsCF: { r: 3.0, x: 0.145, z: 3.0 } 
    },
    threeOrFourCoreAC: { 
      methodsAB: { r: 2.6, x: 0.115, z: 2.6 }, 
      methodsCF: { r: 2.6, x: 0.115, z: 2.6 } 
    }
  },
  { 
    size: 25, 
    twoCoreDc: 1.9,
    twoCoreAC: { 
      methodsAB: { r: 1.9, x: 0.140, z: 1.9 }, 
      methodsCF: { r: 1.65, x: 0.175, z: 1.65 } 
    },
    threeOrFourCoreAC: { 
      methodsAB: { r: 1.65, x: 0.110, z: 1.65 }, 
      methodsCF: { r: 1.45, x: 0.145, z: 1.45 } 
    }
  },
  { 
    size: 35, 
    twoCoreDc: 1.35,
    twoCoreAC: { 
      methodsAB: { r: 1.35, x: 0.135, z: 1.35 }, 
      methodsCF: { r: 1.20, x: 0.170, z: 1.20 } 
    },
    threeOrFourCoreAC: { 
      methodsAB: { r: 1.20, x: 0.105, z: 1.20 }, 
      methodsCF: { r: 1.05, x: 0.140, z: 1.05 } 
    }
  },
  { 
    size: 50, 
    twoCoreDc: 1.0,
    twoCoreAC: { 
      methodsAB: { r: 1.0, x: 0.130, z: 1.0 }, 
      methodsCF: { r: 0.86, x: 0.165, z: 0.88 } 
    },
    threeOrFourCoreAC: { 
      methodsAB: { r: 0.87, x: 0.100, z: 0.88 }, 
      methodsCF: { r: 0.75, x: 0.135, z: 0.76 } 
    }
  },
  { 
    size: 70, 
    twoCoreDc: 0.70,
    twoCoreAC: { 
      methodsAB: { r: 0.70, x: 0.125, z: 0.71 }, 
      methodsCF: { r: 0.60, x: 0.155, z: 0.62 } 
    },
    threeOrFourCoreAC: { 
      methodsAB: { r: 0.60, x: 0.095, z: 0.61 }, 
      methodsCF: { r: 0.52, x: 0.130, z: 0.54 } 
    }
  },
  { 
    size: 95, 
    twoCoreDc: 0.50,
    twoCoreAC: { 
      methodsAB: { r: 0.50, x: 0.120, z: 0.52 }, 
      methodsCF: { r: 0.45, x: 0.145, z: 0.47 } 
    },
    threeOrFourCoreAC: { 
      methodsAB: { r: 0.44, x: 0.090, z: 0.45 }, 
      methodsCF: { r: 0.39, x: 0.125, z: 0.41 } 
    }
  },
  { 
    size: 120, 
    twoCoreDc: 0.40,
    twoCoreAC: { 
      methodsAB: { r: 0.40, x: 0.115, z: 0.42 }, 
      methodsCF: { r: 0.36, x: 0.140, z: 0.38 } 
    },
    threeOrFourCoreAC: { 
      methodsAB: { r: 0.35, x: 0.085, z: 0.36 }, 
      methodsCF: { r: 0.31, x: 0.120, z: 0.33 } 
    }
  },
  { 
    size: 150, 
    twoCoreDc: 0.32,
    twoCoreAC: { 
      methodsAB: { r: 0.32, x: 0.110, z: 0.34 }, 
      methodsCF: { r: 0.29, x: 0.135, z: 0.32 } 
    },
    threeOrFourCoreAC: { 
      methodsAB: { r: 0.28, x: 0.080, z: 0.29 }, 
      methodsCF: { r: 0.25, x: 0.115, z: 0.28 } 
    }
  },
  { 
    size: 185, 
    twoCoreDc: 0.26,
    twoCoreAC: { 
      methodsAB: { r: 0.26, x: 0.105, z: 0.28 }, 
      methodsCF: { r: 0.235, x: 0.130, z: 0.27 } 
    },
    threeOrFourCoreAC: { 
      methodsAB: { r: 0.23, x: 0.075, z: 0.24 }, 
      methodsCF: { r: 0.20, x: 0.110, z: 0.23 } 
    }
  },
  { 
    size: 240, 
    twoCoreDc: 0.20,
    twoCoreAC: { 
      methodsAB: { r: 0.20, x: 0.100, z: 0.22 }, 
      methodsCF: { r: 0.18, x: 0.125, z: 0.22 } 
    },
    threeOrFourCoreAC: { 
      methodsAB: { r: 0.175, x: 0.070, z: 0.19 }, 
      methodsCF: { r: 0.16, x: 0.105, z: 0.19 } 
    }
  },
  { 
    size: 300, 
    twoCoreDc: 0.16,
    twoCoreAC: { 
      methodsAB: { r: 0.16, x: 0.095, z: 0.19 }, 
      methodsCF: { r: 0.145, x: 0.120, z: 0.19 } 
    },
    threeOrFourCoreAC: { 
      methodsAB: { r: 0.14, x: 0.065, z: 0.15 }, 
      methodsCF: { r: 0.125, x: 0.100, z: 0.16 } 
    }
  },
];

// Table 4D5 - Flat twin and earth PVC cables (70°C)
// Methods 100e-103e are thermal insulation scenarios
export interface FlatTwinEarthVoltageDropEntry {
  size: number; // mm²
  mVPerAm: number; // mV/A/m for single-phase
  mVPerAmThreePhase: number; // mV/A/m for three-phase
}

export const voltageDropFlatTwinEarth: FlatTwinEarthVoltageDropEntry[] = [
  { size: 1.0, mVPerAm: 44, mVPerAmThreePhase: 38 },
  { size: 1.5, mVPerAm: 29, mVPerAmThreePhase: 25 },
  { size: 2.5, mVPerAm: 18, mVPerAmThreePhase: 15 },
  { size: 4, mVPerAm: 11, mVPerAmThreePhase: 9.5 },
  { size: 6, mVPerAm: 7.3, mVPerAmThreePhase: 6.4 },
  { size: 10, mVPerAm: 4.4, mVPerAmThreePhase: 3.8 },
  { size: 16, mVPerAm: 2.8, mVPerAmThreePhase: 2.4 },
];

// Helper function to get voltage drop value for a given cable type and size
export const getVoltageDropValue = (
  cableType: 'pvc-single' | 'xlpe-single' | 'flat-twin-earth',
  size: number,
  referenceMethod: string = 'C',
  isThreePhase: boolean = false
): number => {
  // Determine if Methods A/B or C/F/G
  const isMethodAB = ['A', 'A1', 'A2', 'B', 'B1', 'B2'].includes(referenceMethod);
  
  if (cableType === 'flat-twin-earth') {
    const entry = voltageDropFlatTwinEarth.find(e => e.size === size);
    if (!entry) return 18; // Default fallback
    return isThreePhase ? entry.mVPerAmThreePhase : entry.mVPerAm;
  }
  
  const table = cableType === 'pvc-single' ? voltageDropPvcSingleCore : voltageDropXlpeSingleCore;
  const entry = table.find(e => e.size === size);
  
  if (!entry) return 18; // Default fallback
  
  const methodKey = isMethodAB ? 'methodsAB' : 'methodsCF';
  const coreKey = isThreePhase ? 'threeOrFourCoreAC' : 'twoCoreAC';
  
  return entry[coreKey][methodKey].z;
};
