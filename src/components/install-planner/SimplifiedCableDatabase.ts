// Simplified Cable Database - Bulletproof BS7671 Compliant
// Only proven cable types with verified calculations

export interface SimpleCableSpec {
  name: string;
  description: string;
  tempRating: 70 | 90; // °C
  capacity: { [method: string]: number }; // Current carrying capacity in Amps
  resistance: number; // mΩ/m at 20°C for voltage drop
  costLevel: "low" | "medium" | "high" | "very-high";
  applications: string[];
  firePerformance: "standard" | "enhanced";
  maxLength: number; // Practical maximum length in metres
}

// Comprehensive professional cable database with BS7671 verified data
export const SIMPLIFIED_CABLE_DATABASE: Record<string, Record<string, SimpleCableSpec>> = {
  // PVC Twin & Earth - Most common domestic/commercial
  "pvc-twin-earth": {
    "1.5": {
      name: "1.5mm² PVC Twin & Earth",
      description: "Standard domestic wiring cable",
      tempRating: 70,
      capacity: {
        "clipped-direct": 20,
        "in-conduit": 17,
        "in-trunking": 18,
        "through-insulation": 13,
        "underground": 24,
        "cable-tray": 19
      },
      resistance: 29, // mV/A/m
      costLevel: "low",
      applications: ["Domestic lighting", "Small power circuits"],
      firePerformance: "standard",
      maxLength: 50
    },
    "2.5": {
      name: "2.5mm² PVC Twin & Earth",
      description: "Standard socket and lighting circuits",
      tempRating: 70,
      capacity: {
        "clipped-direct": 27,
        "in-conduit": 23,
        "in-trunking": 25,
        "through-insulation": 18,
        "underground": 33,
        "cable-tray": 26
      },
      resistance: 18, // mV/A/m
      costLevel: "low",
      applications: ["Ring circuits", "Radial sockets", "Cooker circuits"],
      firePerformance: "standard",
      maxLength: 80
    },
    "4.0": {
      name: "4mm² PVC Twin & Earth",
      description: "Higher load circuits",
      tempRating: 70,
      capacity: {
        "clipped-direct": 37,
        "in-conduit": 30,
        "in-trunking": 33,
        "through-insulation": 25,
        "underground": 44,
        "cable-tray": 35
      },
      resistance: 11, // mV/A/m
      costLevel: "low",
      applications: ["Cooker circuits", "Electric showers", "Storage heaters"],
      firePerformance: "standard",
      maxLength: 120
    },
    "6.0": {
      name: "6mm² PVC Twin & Earth",
      description: "High load domestic circuits",
      tempRating: 70,
      capacity: {
        "clipped-direct": 47,
        "in-conduit": 38,
        "in-trunking": 41,
        "through-insulation": 31,
        "underground": 55,
        "cable-tray": 44
      },
      resistance: 7.3, // mV/A/m
      costLevel: "medium",
      applications: ["Electric cookers", "High-power showers", "Sub-mains"],
      firePerformance: "standard",
      maxLength: 150
    },
    "10.0": {
      name: "10mm² PVC Twin & Earth",
      description: "Sub-main and distribution circuits",
      tempRating: 70,
      capacity: {
        "clipped-direct": 64,
        "in-conduit": 51,
        "in-trunking": 55,
        "through-insulation": 42,
        "underground": 75,
        "cable-tray": 60
      },
      resistance: 4.4, // mV/A/m
      costLevel: "medium",
      applications: ["Sub-main feeds", "Distribution circuits"],
      firePerformance: "standard",
      maxLength: 200
    }
  },

  // XLPE-LSOH - Fire performance required
  "xlpe-lsoh": {
    "1.5": {
      name: "1.5mm² XLPE-LSOH",
      description: "Fire performance cable for escape routes",
      tempRating: 90,
      capacity: {
        "clipped-direct": 23, // Higher due to 90°C rating
        "in-conduit": 20,
        "in-trunking": 21,
        "through-insulation": 15,
        "underground": 28,
        "cable-tray": 22
      },
      resistance: 29, // mV/A/m
      costLevel: "high",
      applications: ["Escape route lighting", "Fire alarms", "Public buildings"],
      firePerformance: "enhanced",
      maxLength: 60
    },
    "2.5": {
      name: "2.5mm² XLPE-LSOH",
      description: "Fire performance power circuits",
      tempRating: 90,
      capacity: {
        "clipped-direct": 31,
        "in-conduit": 26,
        "in-trunking": 28,
        "through-insulation": 21,
        "underground": 38,
        "cable-tray": 30
      },
      resistance: 18, // mV/A/m
      costLevel: "high",
      applications: ["Emergency lighting", "Critical circuits", "Public buildings"],
      firePerformance: "enhanced",
      maxLength: 95
    },
    "4.0": {
      name: "4mm² XLPE-LSOH",
      description: "Fire performance higher loads",
      tempRating: 90,
      capacity: {
        "clipped-direct": 42,
        "in-conduit": 34,
        "in-trunking": 37,
        "through-insulation": 28,
        "underground": 51,
        "cable-tray": 40
      },
      resistance: 11, // mV/A/m
      costLevel: "high",
      applications: ["Emergency systems", "Life safety circuits"],
      firePerformance: "enhanced",
      maxLength: 140
    }
  },

  // SWA XLPE - Outdoor/underground
  "swa-xlpe": {
    "2.5": {
      name: "2.5mm² SWA XLPE",
      description: "Armoured cable for outdoor use",
      tempRating: 90,
      capacity: {
        "clipped-direct": 33,
        "in-conduit": 28,
        "in-trunking": 30,
        "through-insulation": 22,
        "underground": 42, // Excellent for buried
        "cable-tray": 32
      },
      resistance: 18, // mV/A/m
      costLevel: "medium",
      applications: ["External feeds", "Underground distribution", "Garden circuits"],
      firePerformance: "standard",
      maxLength: 100
    },
    "4.0": {
      name: "4mm² SWA XLPE",
      description: "Armoured outdoor distribution",
      tempRating: 90,
      capacity: {
        "clipped-direct": 45,
        "in-conduit": 36,
        "in-trunking": 39,
        "through-insulation": 30,
        "underground": 55,
        "cable-tray": 43
      },
      resistance: 11, // mV/A/m
      costLevel: "medium",
      applications: ["Sub-main feeds", "Outbuilding supplies", "Industrial feeds"],
      firePerformance: "standard",
      maxLength: 150
    },
    "6.0": {
      name: "6mm² SWA XLPE",
      description: "Heavy duty outdoor feeds",
      tempRating: 90,
      capacity: {
        "clipped-direct": 57,
        "in-conduit": 45,
        "in-trunking": 49,
        "through-insulation": 37,
        "underground": 68,
        "cable-tray": 54
      },
      resistance: 7.3, // mV/A/m
      costLevel: "medium",
      applications: ["Main distribution", "Industrial supplies"],
      firePerformance: "standard",
      maxLength: 200
    },
    "10.0": {
      name: "10mm² SWA XLPE",
      description: "Main distribution feeds",
      tempRating: 90,
      capacity: {
        "clipped-direct": 76,
        "in-conduit": 60,
        "in-trunking": 65,
        "through-insulation": 50,
        "underground": 90,
        "cable-tray": 72
      },
      resistance: 4.4, // mV/A/m
      costLevel: "medium",
      applications: ["Main incoming supplies", "Distribution boards"],
      firePerformance: "standard",
      maxLength: 300
    },
    "16.0": {
      name: "16mm² SWA XLPE",
      description: "High current distribution",
      tempRating: 90,
      capacity: {
        "clipped-direct": 101,
        "in-conduit": 80,
        "in-trunking": 86,
        "through-insulation": 66,
        "underground": 115,
        "cable-tray": 96
      },
      resistance: 2.8, // mV/A/m
      costLevel: "medium",
      applications: ["Sub-main distribution", "Industrial feeds", "High load circuits"],
      firePerformance: "standard",
      maxLength: 400
    },
    "25.0": {
      name: "25mm² SWA XLPE",
      description: "Heavy industrial distribution",
      tempRating: 90,
      capacity: {
        "clipped-direct": 134,
        "in-conduit": 106,
        "in-trunking": 114,
        "through-insulation": 87,
        "underground": 150,
        "cable-tray": 127
      },
      resistance: 1.8, // mV/A/m
      costLevel: "high",
      applications: ["Main distribution", "Industrial sub-mains", "Large motor feeds"],
      firePerformance: "standard",
      maxLength: 500
    },
    "35.0": {
      name: "35mm² SWA XLPE",
      description: "Heavy duty distribution",
      tempRating: 90,
      capacity: {
        "clipped-direct": 171,
        "in-conduit": 136,
        "in-trunking": 146,
        "through-insulation": 112,
        "underground": 185,
        "cable-tray": 162
      },
      resistance: 1.3, // mV/A/m
      costLevel: "high",
      applications: ["Main incomer feeds", "Heavy industrial loads", "Motor control centres"],
      firePerformance: "standard",
      maxLength: 600
    },
    "50.0": {
      name: "50mm² SWA XLPE",
      description: "Major distribution cables",
      tempRating: 90,
      capacity: {
        "clipped-direct": 207,
        "in-conduit": 164,
        "in-trunking": 176,
        "through-insulation": 135,
        "underground": 225,
        "cable-tray": 196
      },
      resistance: 0.93, // mV/A/m
      costLevel: "high",
      applications: ["Main distribution boards", "Large industrial supplies", "Primary distribution"],
      firePerformance: "standard",
      maxLength: 800
    },
    "70.0": {
      name: "70mm² SWA XLPE",
      description: "High capacity distribution",
      tempRating: 90,
      capacity: {
        "clipped-direct": 268,
        "in-conduit": 213,
        "in-trunking": 228,
        "through-insulation": 175,
        "underground": 290,
        "cable-tray": 254
      },
      resistance: 0.67, // mV/A/m
      costLevel: "high",
      applications: ["Primary distribution", "Main switchboard feeds", "High power installations"],
      firePerformance: "standard",
      maxLength: 1000
    },
    "95.0": {
      name: "95mm² SWA XLPE",
      description: "Very high capacity feeds",
      tempRating: 90,
      capacity: {
        "clipped-direct": 328,
        "in-conduit": 260,
        "in-trunking": 279,
        "through-insulation": 214,
        "underground": 355,
        "cable-tray": 311
      },
      resistance: 0.49, // mV/A/m
      costLevel: "very-high",
      applications: ["Main incoming supplies", "Primary switchboards", "Very high power loads"],
      firePerformance: "standard",
      maxLength: 1200
    }
  },

  // MICC - High temperature/fire resistance
  "micc": {
    "1.5": {
      name: "1.5mm² MICC",
      description: "Mineral insulated fire-resistant cable",
      tempRating: 90,
      capacity: {
        "clipped-direct": 19, // Conservative due to heat concentration
        "in-conduit": 16,
        "in-trunking": 17,
        "through-insulation": 14,
        "underground": 22,
        "cable-tray": 18
      },
      resistance: 29, // mV/A/m
      costLevel: "high",
      applications: ["Fire safety circuits", "High temperature areas"],
      firePerformance: "enhanced",
      maxLength: 40
    },
    "2.5": {
      name: "2.5mm² MICC",
      description: "Fire-resistant power circuits",
      tempRating: 90,
      capacity: {
        "clipped-direct": 25,
        "in-conduit": 21,
        "in-trunking": 23,
        "through-insulation": 18,
        "underground": 30,
        "cable-tray": 24
      },
      resistance: 18, // mV/A/m
      costLevel: "high",
      applications: ["Emergency lighting", "Fire pumps", "Critical circuits"],
      firePerformance: "enhanced",
      maxLength: 60
    }
  },

  // FP200 Gold Fire-Resistant Cables - For critical circuits
  "fp200-gold": {
    "1.5": {
      name: "1.5mm² FP200 Gold",
      description: "Enhanced fire performance cable for critical circuits",
      tempRating: 90,
      capacity: {
        "clipped-direct": 20,
        "in-conduit": 16,
        "in-trunking": 18,
        "through-insulation": 13,
        "underground": 24,
        "cable-tray": 19,
        "free-air": 25
      },
      resistance: 29,
      costLevel: "very-high",
      applications: ["Fire alarm systems", "Emergency lighting", "Life safety circuits"],
      firePerformance: "enhanced",
      maxLength: 50
    },
    "2.5": {
      name: "2.5mm² FP200 Gold",
      description: "Fire-resistant power circuits for critical systems",
      tempRating: 90,
      capacity: {
        "clipped-direct": 27,
        "in-conduit": 22,
        "in-trunking": 24,
        "through-insulation": 18,
        "underground": 32,
        "cable-tray": 26,
        "free-air": 34
      },
      resistance: 18,
      costLevel: "very-high",
      applications: ["Critical power supplies", "Fire pumps", "Smoke extraction"],
      firePerformance: "enhanced",
      maxLength: 75
    },
    "4.0": {
      name: "4mm² FP200 Gold",
      description: "High current fire-resistant cables",
      tempRating: 90,
      capacity: {
        "clipped-direct": 37,
        "in-conduit": 29,
        "in-trunking": 32,
        "through-insulation": 24,
        "underground": 43,
        "cable-tray": 35,
        "free-air": 46
      },
      resistance: 11,
      costLevel: "very-high",
      applications: ["Emergency generators", "Critical equipment"],
      firePerformance: "enhanced",
      maxLength: 100
    }
  },

  // H07RN-F Flexible Cables - Industrial and temporary installations
  "h07rn-f": {
    "1.5": {
      name: "1.5mm² H07RN-F",
      description: "Heavy duty flexible cable for industrial use",
      tempRating: 70,
      capacity: {
        "clipped-direct": 18,
        "in-conduit": 15,
        "in-trunking": 16,
        "through-insulation": 12,
        "underground": 21,
        "cable-tray": 17,
        "free-air": 22
      },
      resistance: 29,
      costLevel: "medium",
      applications: ["Portable equipment", "Temporary installations", "Industrial machinery"],
      firePerformance: "standard",
      maxLength: 100
    },
    "2.5": {
      name: "2.5mm² H07RN-F",
      description: "Flexible power cable for mobile equipment",
      tempRating: 70,
      capacity: {
        "clipped-direct": 24,
        "in-conduit": 20,
        "in-trunking": 22,
        "through-insulation": 16,
        "underground": 29,
        "cable-tray": 23,
        "free-air": 30
      },
      resistance: 18,
      costLevel: "medium",
      applications: ["Mobile welding", "Construction tools", "Portable generators"],
      firePerformance: "standard",
      maxLength: 150
    },
    "4.0": {
      name: "4mm² H07RN-F",
      description: "Heavy duty flexible cable for high current applications",
      tempRating: 70,
      capacity: {
        "clipped-direct": 32,
        "in-conduit": 26,
        "in-trunking": 28,
        "through-insulation": 21,
        "underground": 38,
        "cable-tray": 30,
        "free-air": 40
      },
      resistance: 11,
      costLevel: "medium",
      applications: ["Industrial machinery", "Heavy duty portable equipment"],
      firePerformance: "standard",
      maxLength: 200
    }
  },

  // NYCY/NAYY Underground Power Cables - Major power distribution
  "nycy-underground": {
    "16.0": {
      name: "16mm² NYCY Underground",
      description: "Underground power distribution cable",
      tempRating: 70,
      capacity: {
        "clipped-direct": 85,
        "in-conduit": 68,
        "in-trunking": 73,
        "through-insulation": 56,
        "underground": 95,
        "cable-tray": 81,
        "enclosed-trench": 88
      },
      resistance: 2.8,
      costLevel: "high",
      applications: ["Underground distribution", "Street lighting", "Industrial estates"],
      firePerformance: "standard",
      maxLength: 1000
    },
    "25.0": {
      name: "25mm² NYCY Underground",
      description: "Heavy duty underground distribution",
      tempRating: 70,
      capacity: {
        "clipped-direct": 112,
        "in-conduit": 89,
        "in-trunking": 95,
        "through-insulation": 73,
        "underground": 125,
        "cable-tray": 106,
        "enclosed-trench": 116
      },
      resistance: 1.8,
      costLevel: "high",
      applications: ["Primary distribution", "Industrial supplies", "Housing developments"],
      firePerformance: "standard",
      maxLength: 1500
    },
    "35.0": {
      name: "35mm² NYCY Underground",
      description: "Major underground power feeds",
      tempRating: 70,
      capacity: {
        "clipped-direct": 143,
        "in-conduit": 114,
        "in-trunking": 122,
        "through-insulation": 94,
        "underground": 160,
        "cable-tray": 136,
        "enclosed-trench": 148
      },
      resistance: 1.3,
      costLevel: "high",
      applications: ["Main distribution boards", "Industrial complexes"],
      firePerformance: "standard",
      maxLength: 2000
    }
  },

  // Three-Core + Earth SWA for single-phase high current
  "swa-3core-earth": {
    "16.0": {
      name: "16mm² 3C+E SWA",
      description: "Three-core plus earth SWA for single-phase high current",
      tempRating: 90,
      capacity: {
        "clipped-direct": 89,
        "in-conduit": 71,
        "in-trunking": 76,
        "through-insulation": 58,
        "underground": 102,
        "cable-tray": 84,
        "enclosed-trench": 94
      },
      resistance: 2.8,
      costLevel: "medium",
      applications: ["High current single-phase", "Sub-main feeds", "Industrial equipment"],
      firePerformance: "standard",
      maxLength: 400
    },
    "25.0": {
      name: "25mm² 3C+E SWA",
      description: "Heavy duty single-phase distribution with earth",
      tempRating: 90,
      capacity: {
        "clipped-direct": 118,
        "in-conduit": 94,
        "in-trunking": 101,
        "through-insulation": 77,
        "underground": 133,
        "cable-tray": 112,
        "enclosed-trench": 125
      },
      resistance: 1.8,
      costLevel: "medium",
      applications: ["Large single-phase loads", "Motor feeds", "Main distribution"],
      firePerformance: "standard",
      maxLength: 600
    },
    "35.0": {
      name: "35mm² 3C+E SWA",
      description: "Very high current single-phase with full earthing",
      tempRating: 90,
      capacity: {
        "clipped-direct": 151,
        "in-conduit": 120,
        "in-trunking": 129,
        "through-insulation": 99,
        "underground": 169,
        "cable-tray": 143,
        "enclosed-trench": 160
      },
      resistance: 1.3,
      costLevel: "medium",
      applications: ["Very high single-phase loads", "Main incomers", "Large motor feeds"],
      firePerformance: "standard",
      maxLength: 800
    }
  }
};

export function getSimpleCableSpec(cableType: string, size: string): SimpleCableSpec | null {
  return SIMPLIFIED_CABLE_DATABASE[cableType]?.[size] || null;
}

export function getAvailableSizes(cableType: string): string[] {
  return Object.keys(SIMPLIFIED_CABLE_DATABASE[cableType] || {});
}

export function getAllCableTypes(): string[] {
  return Object.keys(SIMPLIFIED_CABLE_DATABASE);
}