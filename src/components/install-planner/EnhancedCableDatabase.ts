
export interface CableData {
  currentCarryingCapacity: {
    [method: string]: number;
  };
  voltageDropPerMetre: {
    [conductor: string]: number;
  };
  resistance: {
    r1: number;
    r2: number;
  };
  cost: "low" | "medium" | "high";
  availability: "common" | "limited" | "special-order";
  installationComplexity: "simple" | "moderate" | "complex";
  maxLength: number;
  minBreaker: number;
  maxBreaker: number;
}

export const BS7671_CABLE_DATABASE: Record<string, CableData> = {
  "1.0mm²": {
    currentCarryingCapacity: {
      "clipped-direct": 15,
      "conduit": 13,
      "trunking": 13,
      "ducted": 16,
      "buried-direct": 18,
      "tray": 14
    },
    voltageDropPerMetre: {
      copper: 44,
      aluminium: 72
    },
    resistance: {
      r1: 18.1,
      r2: 18.1
    },
    cost: "low",
    availability: "common",
    installationComplexity: "simple",
    maxLength: 40,
    minBreaker: 6,
    maxBreaker: 10
  },
  "1.5mm²": {
    currentCarryingCapacity: {
      "clipped-direct": 20,
      "conduit": 17,
      "trunking": 18,
      "ducted": 22,
      "buried-direct": 24,
      "tray": 19
    },
    voltageDropPerMetre: {
      copper: 29,
      aluminium: 47
    },
    resistance: {
      r1: 12.1,
      r2: 12.1
    },
    cost: "low",
    availability: "common",
    installationComplexity: "simple",
    maxLength: 50,
    minBreaker: 6,
    maxBreaker: 16
  },
  "2.5mm²": {
    currentCarryingCapacity: {
      "clipped-direct": 27,
      "conduit": 23,
      "trunking": 25,
      "ducted": 30,
      "buried-direct": 33,
      "tray": 26
    },
    voltageDropPerMetre: {
      copper: 18,
      aluminium: 29
    },
    resistance: {
      r1: 7.41,
      r2: 7.41
    },
    cost: "low",
    availability: "common",
    installationComplexity: "simple",
    maxLength: 80,
    minBreaker: 6,
    maxBreaker: 20
  },
  "4.0mm²": {
    currentCarryingCapacity: {
      "clipped-direct": 37,
      "conduit": 30,
      "trunking": 33,
      "ducted": 40,
      "buried-direct": 45,
      "tray": 35
    },
    voltageDropPerMetre: {
      copper: 11,
      aluminium: 18
    },
    resistance: {
      r1: 4.61,
      r2: 4.61
    },
    cost: "medium",
    availability: "common",
    installationComplexity: "simple",
    maxLength: 120,
    minBreaker: 10,
    maxBreaker: 32
  },
  "6.0mm²": {
    currentCarryingCapacity: {
      "clipped-direct": 47,
      "conduit": 38,
      "trunking": 41,
      "ducted": 51,
      "buried-direct": 58,
      "tray": 44
    },
    voltageDropPerMetre: {
      copper: 7.3,
      aluminium: 12
    },
    resistance: {
      r1: 3.08,
      r2: 3.08
    },
    cost: "medium",
    availability: "common",
    installationComplexity: "moderate",
    maxLength: 180,
    minBreaker: 16,
    maxBreaker: 40
  },
  "10.0mm²": {
    currentCarryingCapacity: {
      "clipped-direct": 65,
      "conduit": 52,
      "trunking": 57,
      "ducted": 70,
      "buried-direct": 80,
      "tray": 61
    },
    voltageDropPerMetre: {
      copper: 4.4,
      aluminium: 7.1
    },
    resistance: {
      r1: 1.83,
      r2: 1.83
    },
    cost: "medium",
    availability: "common",
    installationComplexity: "moderate",
    maxLength: 250,
    minBreaker: 20,
    maxBreaker: 50
  },
  "16.0mm²": {
    currentCarryingCapacity: {
      "clipped-direct": 85,
      "conduit": 69,
      "trunking": 76,
      "ducted": 94,
      "buried-direct": 107,
      "tray": 81
    },
    voltageDropPerMetre: {
      copper: 2.8,
      aluminium: 4.5
    },
    resistance: {
      r1: 1.15,
      r2: 1.15
    },
    cost: "high",
    availability: "common",
    installationComplexity: "moderate",
    maxLength: 350,
    minBreaker: 25,
    maxBreaker: 63
  },
  "25.0mm²": {
    currentCarryingCapacity: {
      "clipped-direct": 112,
      "conduit": 89,
      "trunking": 96,
      "ducted": 119,
      "buried-direct": 138,
      "tray": 106
    },
    voltageDropPerMetre: {
      copper: 1.8,
      aluminium: 2.9
    },
    resistance: {
      r1: 0.727,
      r2: 0.727
    },
    cost: "high",
    availability: "limited",
    installationComplexity: "complex",
    maxLength: 500,
    minBreaker: 32,
    maxBreaker: 80
  },
  "35.0mm²": {
    currentCarryingCapacity: {
      "clipped-direct": 138,
      "conduit": 110,
      "trunking": 119,
      "ducted": 148,
      "buried-direct": 171,
      "tray": 131
    },
    voltageDropPerMetre: {
      copper: 1.3,
      aluminium: 2.1
    },
    resistance: {
      r1: 0.524,
      r2: 0.524
    },
    cost: "high",
    availability: "limited",
    installationComplexity: "complex",
    maxLength: 700,
    minBreaker: 40,
    maxBreaker: 100
  },
  "50.0mm²": {
    currentCarryingCapacity: {
      "clipped-direct": 173,
      "conduit": 144,
      "trunking": 156,
      "ducted": 180,
      "buried-direct": 207,
      "tray": 165
    },
    voltageDropPerMetre: {
      copper: 0.93,
      aluminium: 1.5
    },
    resistance: {
      r1: 0.387,
      r2: 0.387
    },
    cost: "high",
    availability: "limited",
    installationComplexity: "complex",
    maxLength: 1000,
    minBreaker: 50,
    maxBreaker: 125
  },
  "70.0mm²": {
    currentCarryingCapacity: {
      "clipped-direct": 221,
      "conduit": 184,
      "trunking": 200,
      "ducted": 230,
      "buried-direct": 265,
      "tray": 210
    },
    voltageDropPerMetre: {
      copper: 0.65,
      aluminium: 1.1
    },
    resistance: {
      r1: 0.268,
      r2: 0.268
    },
    cost: "high",
    availability: "limited",
    installationComplexity: "complex",
    maxLength: 1500,
    minBreaker: 63,
    maxBreaker: 160
  },
  "95.0mm²": {
    currentCarryingCapacity: {
      "clipped-direct": 268,
      "conduit": 223,
      "trunking": 242,
      "ducted": 280,
      "buried-direct": 322,
      "tray": 255
    },
    voltageDropPerMetre: {
      copper: 0.49,
      aluminium: 0.8
    },
    resistance: {
      r1: 0.193,
      r2: 0.193
    },
    cost: "high",
    availability: "limited",
    installationComplexity: "complex",
    maxLength: 2000,
    minBreaker: 80,
    maxBreaker: 200
  },
  "120.0mm²": {
    currentCarryingCapacity: {
      "clipped-direct": 310,
      "conduit": 258,
      "trunking": 280,
      "ducted": 325,
      "buried-direct": 374,
      "tray": 295
    },
    voltageDropPerMetre: {
      copper: 0.39,
      aluminium: 0.64
    },
    resistance: {
      r1: 0.153,
      r2: 0.153
    },
    cost: "high",
    availability: "limited",
    installationComplexity: "complex",
    maxLength: 2500,
    minBreaker: 100,
    maxBreaker: 250
  }
};

export const RING_CIRCUIT_CABLE_DATABASE: Record<string, CableData> = {
  "2.5mm²": {
    currentCarryingCapacity: {
      "clipped-direct": 27,
      "conduit": 23,
      "trunking": 25,
      "ducted": 30,
      "buried-direct": 33,
      "tray": 26
    },
    voltageDropPerMetre: {
      copper: 18,
      aluminium: 29
    },
    resistance: {
      r1: 7.41,
      r2: 7.41
    },
    cost: "low",
    availability: "common",
    installationComplexity: "simple",
    maxLength: 106, // BS7671 max ring length
    minBreaker: 20,
    maxBreaker: 32
  },
  "4.0mm²": {
    currentCarryingCapacity: {
      "clipped-direct": 37,
      "conduit": 30,
      "trunking": 33,
      "ducted": 40,
      "buried-direct": 45,
      "tray": 35
    },
    voltageDropPerMetre: {
      copper: 11,
      aluminium: 18
    },
    resistance: {
      r1: 4.61,
      r2: 4.61
    },
    cost: "medium",
    availability: "common",
    installationComplexity: "simple",
    maxLength: 170, // BS7671 max ring length for 4.0mm²
    minBreaker: 25,
    maxBreaker: 32
  }
};

export function getCableDatabase(isRingCircuit: boolean = false): Record<string, CableData> {
  return isRingCircuit ? RING_CIRCUIT_CABLE_DATABASE : BS7671_CABLE_DATABASE;
}
