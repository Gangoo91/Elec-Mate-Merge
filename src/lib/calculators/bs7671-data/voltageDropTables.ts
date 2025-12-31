// BS 7671 Appendix 4 Voltage Drop Tables
// Tables 4D1B, 4D2B, 4D3B, 4D4B, 4D5B

import { CableType } from './cableCapacities';

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

// Table 4D2B - Multicore PVC cables (70°C) - voltage drop mV/A/m
// From BS 7671:2018+A3:2024 Table 4D2B
export interface MulticoreVoltageDropEntry {
  size: number; // mm²
  twoCoreAc: number; // mV/A/m single-phase
  threeFourCoreAc: number; // mV/A/m three-phase
}

export const voltageDropPvcMulticore: MulticoreVoltageDropEntry[] = [
  { size: 1.0, twoCoreAc: 44, threeFourCoreAc: 38 },
  { size: 1.5, twoCoreAc: 29, threeFourCoreAc: 25 },
  { size: 2.5, twoCoreAc: 18, threeFourCoreAc: 15 },
  { size: 4, twoCoreAc: 11, threeFourCoreAc: 9.5 },
  { size: 6, twoCoreAc: 7.3, threeFourCoreAc: 6.4 },
  { size: 10, twoCoreAc: 4.4, threeFourCoreAc: 3.8 },
  { size: 16, twoCoreAc: 2.8, threeFourCoreAc: 2.4 },
  { size: 25, twoCoreAc: 1.75, threeFourCoreAc: 1.50 },
  { size: 35, twoCoreAc: 1.25, threeFourCoreAc: 1.10 },
  { size: 50, twoCoreAc: 0.93, threeFourCoreAc: 0.81 },
  { size: 70, twoCoreAc: 0.63, threeFourCoreAc: 0.55 },
  { size: 95, twoCoreAc: 0.46, threeFourCoreAc: 0.40 },
  { size: 120, twoCoreAc: 0.36, threeFourCoreAc: 0.31 },
  { size: 150, twoCoreAc: 0.29, threeFourCoreAc: 0.25 },
  { size: 185, twoCoreAc: 0.235, threeFourCoreAc: 0.20 },
  { size: 240, twoCoreAc: 0.180, threeFourCoreAc: 0.155 },
  { size: 300, twoCoreAc: 0.145, threeFourCoreAc: 0.125 },
];

// Table 4D3B - Single-core armoured 90°C XLPE cables - voltage drop
// From BS 7671:2018+A3:2024 Table 4D3B
export interface SingleCoreArmouredVoltageDropEntry {
  size: number; // mm²
  twoCableDc: number; // mV/A/m DC
  twoCableAc: { r: number; x: number; z: number }; // mV/A/m AC single-phase
  threeCableSpaced: { r: number; x: number; z: number }; // spaced cables
  threeCableTrefoil: { r: number; x: number; z: number }; // trefoil/touching
  threeCableFlatTouching: { r: number; x: number; z: number }; // flat touching
  threeCableFlatSpaced: { r: number; x: number; z: number }; // flat spaced
}

export const voltageDropSingleCoreArmoured: SingleCoreArmouredVoltageDropEntry[] = [
  { 
    size: 50, 
    twoCableDc: 0.93,
    twoCableAc: { r: 0.93, x: 0.165, z: 0.95 },
    threeCableSpaced: { r: 0.81, x: 0.145, z: 0.82 },
    threeCableTrefoil: { r: 0.81, x: 0.125, z: 0.82 },
    threeCableFlatTouching: { r: 0.81, x: 0.130, z: 0.82 },
    threeCableFlatSpaced: { r: 0.81, x: 0.155, z: 0.83 }
  },
  { 
    size: 70, 
    twoCableDc: 0.63,
    twoCableAc: { r: 0.63, x: 0.155, z: 0.65 },
    threeCableSpaced: { r: 0.55, x: 0.135, z: 0.57 },
    threeCableTrefoil: { r: 0.55, x: 0.120, z: 0.56 },
    threeCableFlatTouching: { r: 0.55, x: 0.125, z: 0.56 },
    threeCableFlatSpaced: { r: 0.55, x: 0.145, z: 0.57 }
  },
  { 
    size: 95, 
    twoCableDc: 0.46,
    twoCableAc: { r: 0.46, x: 0.150, z: 0.48 },
    threeCableSpaced: { r: 0.40, x: 0.130, z: 0.42 },
    threeCableTrefoil: { r: 0.40, x: 0.115, z: 0.42 },
    threeCableFlatTouching: { r: 0.40, x: 0.120, z: 0.42 },
    threeCableFlatSpaced: { r: 0.40, x: 0.140, z: 0.42 }
  },
  { 
    size: 120, 
    twoCableDc: 0.36,
    twoCableAc: { r: 0.36, x: 0.145, z: 0.39 },
    threeCableSpaced: { r: 0.31, x: 0.125, z: 0.34 },
    threeCableTrefoil: { r: 0.31, x: 0.110, z: 0.33 },
    threeCableFlatTouching: { r: 0.31, x: 0.115, z: 0.33 },
    threeCableFlatSpaced: { r: 0.31, x: 0.135, z: 0.34 }
  },
  { 
    size: 150, 
    twoCableDc: 0.29,
    twoCableAc: { r: 0.29, x: 0.140, z: 0.32 },
    threeCableSpaced: { r: 0.25, x: 0.120, z: 0.28 },
    threeCableTrefoil: { r: 0.25, x: 0.105, z: 0.27 },
    threeCableFlatTouching: { r: 0.25, x: 0.110, z: 0.27 },
    threeCableFlatSpaced: { r: 0.25, x: 0.130, z: 0.28 }
  },
  { 
    size: 185, 
    twoCableDc: 0.235,
    twoCableAc: { r: 0.235, x: 0.135, z: 0.27 },
    threeCableSpaced: { r: 0.20, x: 0.115, z: 0.23 },
    threeCableTrefoil: { r: 0.20, x: 0.100, z: 0.22 },
    threeCableFlatTouching: { r: 0.20, x: 0.105, z: 0.23 },
    threeCableFlatSpaced: { r: 0.20, x: 0.125, z: 0.24 }
  },
  { 
    size: 240, 
    twoCableDc: 0.180,
    twoCableAc: { r: 0.180, x: 0.130, z: 0.22 },
    threeCableSpaced: { r: 0.155, x: 0.110, z: 0.19 },
    threeCableTrefoil: { r: 0.155, x: 0.095, z: 0.18 },
    threeCableFlatTouching: { r: 0.155, x: 0.100, z: 0.18 },
    threeCableFlatSpaced: { r: 0.155, x: 0.120, z: 0.20 }
  },
  { 
    size: 300, 
    twoCableDc: 0.145,
    twoCableAc: { r: 0.145, x: 0.125, z: 0.19 },
    threeCableSpaced: { r: 0.125, x: 0.105, z: 0.16 },
    threeCableTrefoil: { r: 0.125, x: 0.090, z: 0.15 },
    threeCableFlatTouching: { r: 0.125, x: 0.095, z: 0.16 },
    threeCableFlatSpaced: { r: 0.125, x: 0.115, z: 0.17 }
  },
  { 
    size: 400, 
    twoCableDc: 0.110,
    twoCableAc: { r: 0.110, x: 0.120, z: 0.16 },
    threeCableSpaced: { r: 0.095, x: 0.100, z: 0.14 },
    threeCableTrefoil: { r: 0.095, x: 0.085, z: 0.13 },
    threeCableFlatTouching: { r: 0.095, x: 0.090, z: 0.13 },
    threeCableFlatSpaced: { r: 0.095, x: 0.110, z: 0.15 }
  },
  { 
    size: 500, 
    twoCableDc: 0.088,
    twoCableAc: { r: 0.088, x: 0.115, z: 0.14 },
    threeCableSpaced: { r: 0.076, x: 0.095, z: 0.12 },
    threeCableTrefoil: { r: 0.076, x: 0.080, z: 0.11 },
    threeCableFlatTouching: { r: 0.076, x: 0.085, z: 0.11 },
    threeCableFlatSpaced: { r: 0.076, x: 0.105, z: 0.13 }
  },
  { 
    size: 630, 
    twoCableDc: 0.070,
    twoCableAc: { r: 0.070, x: 0.110, z: 0.13 },
    threeCableSpaced: { r: 0.061, x: 0.090, z: 0.11 },
    threeCableTrefoil: { r: 0.061, x: 0.075, z: 0.097 },
    threeCableFlatTouching: { r: 0.061, x: 0.080, z: 0.10 },
    threeCableFlatSpaced: { r: 0.061, x: 0.100, z: 0.12 }
  }
];

// Table 4D4B - Multicore armoured cables voltage drop
// From BS 7671:2018+A3:2024 Table 4D4B
export interface MulticoreArmouredVoltageDropEntry {
  size: number;
  twoCoreAc: number; // mV/A/m single-phase
  threeFourCoreAc: number; // mV/A/m three-phase
}

export const voltageDropMulticoreArmoured: MulticoreArmouredVoltageDropEntry[] = [
  { size: 1.5, twoCoreAc: 29, threeFourCoreAc: 25 },
  { size: 2.5, twoCoreAc: 18, threeFourCoreAc: 15 },
  { size: 4, twoCoreAc: 11, threeFourCoreAc: 9.5 },
  { size: 6, twoCoreAc: 7.3, threeFourCoreAc: 6.4 },
  { size: 10, twoCoreAc: 4.4, threeFourCoreAc: 3.8 },
  { size: 16, twoCoreAc: 2.8, threeFourCoreAc: 2.4 },
  { size: 25, twoCoreAc: 1.75, threeFourCoreAc: 1.50 },
  { size: 35, twoCoreAc: 1.25, threeFourCoreAc: 1.10 },
  { size: 50, twoCoreAc: 0.93, threeFourCoreAc: 0.81 },
  { size: 70, twoCoreAc: 0.65, threeFourCoreAc: 0.57 },
  { size: 95, twoCoreAc: 0.49, threeFourCoreAc: 0.43 },
  { size: 120, twoCoreAc: 0.39, threeFourCoreAc: 0.34 },
  { size: 150, twoCoreAc: 0.32, threeFourCoreAc: 0.28 },
  { size: 185, twoCoreAc: 0.26, threeFourCoreAc: 0.23 },
  { size: 240, twoCoreAc: 0.21, threeFourCoreAc: 0.18 },
  { size: 300, twoCoreAc: 0.17, threeFourCoreAc: 0.15 },
  { size: 400, twoCoreAc: 0.14, threeFourCoreAc: 0.12 },
];

// Table 4D5B - Flat twin and earth voltage drop (domestic cables)
export const voltageDropFlatTwinEarth: MulticoreVoltageDropEntry[] = [
  { size: 1.0, twoCoreAc: 44, threeFourCoreAc: 38 },
  { size: 1.5, twoCoreAc: 29, threeFourCoreAc: 25 },
  { size: 2.5, twoCoreAc: 18, threeFourCoreAc: 15 },
  { size: 4, twoCoreAc: 11, threeFourCoreAc: 9.5 },
  { size: 6, twoCoreAc: 7.3, threeFourCoreAc: 6.4 },
  { size: 10, twoCoreAc: 4.4, threeFourCoreAc: 3.8 },
  { size: 16, twoCoreAc: 2.8, threeFourCoreAc: 2.4 },
];

/**
 * Get the voltage drop value (mV/A/m) for a given cable type, size, and phase
 * This is the main function to use for voltage drop calculations
 */
export const getVoltageDropValue = (
  cableType: CableType,
  size: number,
  isThreePhase: boolean = false,
  referenceMethod: string = 'C'
): number => {
  // Determine which table to use based on cable type
  let voltageDropMvAm = 18; // Default fallback for 2.5mm²
  
  // Check if method is enclosed (A, B) or surface/clipped (C, F)
  const isEnclosed = ['A', 'A1', 'A2', 'B', 'B1', 'B2'].includes(referenceMethod);
  
  switch (cableType) {
    case 'pvc-single': {
      const entry = voltageDropPvcSingleCore.find(e => e.size === size);
      if (entry) {
        const methodData = isEnclosed ? entry.twoCoreAC.methodsAB : entry.twoCoreAC.methodsCF;
        voltageDropMvAm = isThreePhase 
          ? (isEnclosed ? entry.threeOrFourCoreAC.methodsAB.z : entry.threeOrFourCoreAC.methodsCF.z)
          : methodData.z;
      }
      break;
    }
    case 'xlpe-single': {
      const entry = voltageDropXlpeSingleCore.find(e => e.size === size);
      if (entry) {
        const methodData = isEnclosed ? entry.twoCoreAC.methodsAB : entry.twoCoreAC.methodsCF;
        voltageDropMvAm = isThreePhase 
          ? (isEnclosed ? entry.threeOrFourCoreAC.methodsAB.z : entry.threeOrFourCoreAC.methodsCF.z)
          : methodData.z;
      }
      break;
    }
    case 'pvc-twin-earth':
    case 'xlpe-twin-earth': {
      const entry = voltageDropFlatTwinEarth.find(e => e.size === size);
      if (entry) {
        voltageDropMvAm = isThreePhase ? entry.threeFourCoreAc : entry.twoCoreAc;
      } else {
        // Fallback to multicore PVC table for larger sizes
        const multicoreEntry = voltageDropPvcMulticore.find(e => e.size === size);
        if (multicoreEntry) {
          voltageDropMvAm = isThreePhase ? multicoreEntry.threeFourCoreAc : multicoreEntry.twoCoreAc;
        }
      }
      break;
    }
    case 'swa': {
      const entry = voltageDropMulticoreArmoured.find(e => e.size === size);
      if (entry) {
        voltageDropMvAm = isThreePhase ? entry.threeFourCoreAc : entry.twoCoreAc;
      }
      break;
    }
    case 'swa-single-core': {
      const entry = voltageDropSingleCoreArmoured.find(e => e.size === size);
      if (entry) {
        voltageDropMvAm = isThreePhase ? entry.threeCableTrefoil.z : entry.twoCableAc.z;
      }
      break;
    }
    case 'micc':
    case 'aluminium-xlpe': {
      // Use PVC multicore as approximation
      const entry = voltageDropPvcMulticore.find(e => e.size === size);
      if (entry) {
        voltageDropMvAm = isThreePhase ? entry.threeFourCoreAc : entry.twoCoreAc;
      }
      break;
    }
    default: {
      // Default to PVC multicore
      const entry = voltageDropPvcMulticore.find(e => e.size === size);
      if (entry) {
        voltageDropMvAm = isThreePhase ? entry.threeFourCoreAc : entry.twoCoreAc;
      }
    }
  }
  
  return voltageDropMvAm;
};

/**
 * Calculate voltage drop in volts
 * ΔV = mV/A/m × Ib × L / 1000
 */
export const calculateVoltageDrop = (
  cableType: CableType,
  size: number,
  current: number,
  length: number,
  isThreePhase: boolean = false,
  referenceMethod: string = 'C',
  powerFactor: number = 1.0
): { voltageDropVolts: number; voltageDropMvAm: number } => {
  const voltageDropMvAm = getVoltageDropValue(cableType, size, isThreePhase, referenceMethod);
  const voltageDropVolts = (voltageDropMvAm * current * length * powerFactor) / 1000;
  
  return {
    voltageDropVolts: Math.round(voltageDropVolts * 100) / 100,
    voltageDropMvAm
  };
};

/**
 * Check if voltage drop is within BS 7671 limits
 * Lighting: 3%, Other: 5% (from origin of installation)
 */
export const isVoltageDropCompliant = (
  voltageDropVolts: number,
  supplyVoltage: number,
  isLighting: boolean = false
): { compliant: boolean; percentage: number; limit: number } => {
  const percentage = (voltageDropVolts / supplyVoltage) * 100;
  const limit = isLighting ? 3 : 5;
  
  return {
    compliant: percentage <= limit,
    percentage: Math.round(percentage * 100) / 100,
    limit
  };
};
