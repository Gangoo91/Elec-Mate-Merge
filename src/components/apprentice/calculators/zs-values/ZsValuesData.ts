// BS 7671:2018+A3:2024 Maximum Zs Values - Official Tables 41.2, 41.3, 41.4, 41.5
// All values for 230V nominal voltage (Uo)

// Helper function to get 80% test value
export const get80PercentZs = (maxZs: number): number => {
  return Math.round(maxZs * 0.8 * 1000) / 1000;
};

// Table 41.3 - MCBs to BS EN 60898 and RCBOs to BS EN 61009-1
// 0.4s disconnection time (final circuits ≤32A)
export const zsValues = {
  mcb: {
    "type-b": {
      3: 14.57, 6: 7.28, 10: 4.37, 16: 2.73, 20: 2.19, 25: 1.75,
      32: 1.37, 40: 1.09, 50: 0.87, 63: 0.69, 80: 0.55, 100: 0.44, 125: 0.35
    },
    "type-c": {
      6: 3.64, 10: 2.19, 16: 1.37, 20: 1.09, 25: 0.87,
      32: 0.68, 40: 0.55, 50: 0.44, 63: 0.35, 80: 0.27, 100: 0.22, 125: 0.17
    },
    "type-d": {
      6: 1.82, 10: 1.09, 16: 0.68, 20: 0.55, 25: 0.44,
      32: 0.34, 40: 0.27, 50: 0.22, 63: 0.17, 80: 0.14, 100: 0.11, 125: 0.09
    }
  },
  rcbo: {
    "type-b": {
      3: 14.57, 6: 7.28, 10: 4.37, 16: 2.73, 20: 2.19, 25: 1.75,
      32: 1.37, 40: 1.09, 50: 0.87, 63: 0.69, 80: 0.55, 100: 0.44, 125: 0.35
    },
    "type-c": {
      6: 3.64, 10: 2.19, 16: 1.37, 20: 1.09, 25: 0.87,
      32: 0.68, 40: 0.55, 50: 0.44, 63: 0.35, 80: 0.27, 100: 0.22, 125: 0.17
    },
    "type-d": {
      6: 1.82, 10: 1.09, 16: 0.68, 20: 0.55, 25: 0.44,
      32: 0.34, 40: 0.27, 50: 0.22, 63: 0.17, 80: 0.14, 100: 0.11, 125: 0.09
    }
  },
  // Table 41.2 - Fuses (0.4s disconnection)
  // BS 88-2 gG/gM fuses - Table 41.2(a)
  "bs88-2": {
    2: 33.1, 4: 15.6, 6: 7.80, 10: 4.65, 16: 2.43, 20: 1.68, 25: 1.29, 32: 0.99,
    40: 0.75, 50: 0.57, 63: 0.44
  },
  // BS 88-3 System C fuses - Table 41.2(b)
  "bs88-3": {
    5: 9.93, 16: 2.30, 20: 1.93, 32: 0.91, 45: 0.57, 63: 0.36
  },
  // BS 3036 Rewirable fuses - Table 41.2(c)
  "bs3036": {
    5: 9.10, 15: 2.43, 20: 1.68, 30: 1.04, 45: 0.56, 60: 0.40
  },
  // BS 1362 Plug fuses - Table 41.2(d)
  "bs1362": {
    3: 15.6, 13: 2.30
  }
};

// Table 41.3 - MCBs (5s disconnection time - distribution circuits)
// Note: For Type B and C, 5s values equal Type B 0.4s values per BS 7671
// Type D has explicit 5s row in Table 41.3
export const zsValues5s = {
  mcb: {
    "type-b": {
      3: 14.57, 6: 7.28, 10: 4.37, 16: 2.73, 20: 2.19, 25: 1.75,
      32: 1.37, 40: 1.09, 50: 0.87, 63: 0.69, 80: 0.55, 100: 0.44, 125: 0.35
    },
    "type-c": {
      3: 14.57, 6: 7.28, 10: 4.37, 16: 2.73, 20: 2.19, 25: 1.75,
      32: 1.37, 40: 1.09, 50: 0.87, 63: 0.69, 80: 0.55, 100: 0.44, 125: 0.35
    },
    "type-d": {
      6: 3.64, 10: 2.19, 16: 1.37, 20: 1.09, 25: 0.87,
      32: 0.68, 40: 0.55, 50: 0.44, 63: 0.35, 80: 0.22, 100: 0.17, 125: 0.14
    }
  },
  rcbo: {
    "type-b": {
      3: 14.57, 6: 7.28, 10: 4.37, 16: 2.73, 20: 2.19, 25: 1.75,
      32: 1.37, 40: 1.09, 50: 0.87, 63: 0.69, 80: 0.55, 100: 0.44, 125: 0.35
    },
    "type-c": {
      3: 14.57, 6: 7.28, 10: 4.37, 16: 2.73, 20: 2.19, 25: 1.75,
      32: 1.37, 40: 1.09, 50: 0.87, 63: 0.69, 80: 0.55, 100: 0.44, 125: 0.35
    },
    "type-d": {
      6: 3.64, 10: 2.19, 16: 1.37, 20: 1.09, 25: 0.87,
      32: 0.68, 40: 0.55, 50: 0.44, 63: 0.35, 80: 0.22, 100: 0.17, 125: 0.14
    }
  },
  // Table 41.4 - Fuses (5s disconnection)
  // BS 88-2 gG/gM fuses - Table 41.4(a)
  "bs88-2": {
    2: 44, 4: 21, 6: 12.0, 10: 6.8, 16: 4.0, 20: 2.8, 25: 2.2, 32: 1.7,
    40: 1.3, 50: 0.99, 63: 0.78, 80: 0.55, 100: 0.42, 125: 0.32, 160: 0.27, 200: 0.18
  },
  // BS 88-3 System C fuses - Table 41.4(b)
  "bs88-3": {
    5: 14.6, 16: 3.9, 20: 3.2, 32: 1.6, 45: 1.0, 63: 0.68, 80: 0.51, 100: 0.38
  },
  // BS 3036 Rewirable fuses - Table 41.4(c)
  "bs3036": {
    5: 16.8, 15: 5.08, 20: 3.64, 30: 2.51, 45: 1.51, 60: 1.07, 100: 0.51
  },
  // BS 1362 Plug fuses - Table 41.4(d)
  "bs1362": {
    3: 22.0, 13: 3.64
  }
};

// Table 41.5 - RCDs (maximum Zs where RCD provides additional protection)
export const rcdZsValues = {
  30: 1667,   // 30mA RCD - max Zs 1667Ω
  100: 500,  // 100mA RCD - max Zs 500Ω
  300: 167,  // 300mA RCD - max Zs 167Ω
  500: 100   // 500mA RCD - max Zs 100Ω
};

// MCB Curve Types (BS EN 60898) - Type A removed as not in BS 7671
export const curveTypes: Record<string, string> = {
  "type-b": "Type B (3-5 × In)",
  "type-c": "Type C (5-10 × In)",
  "type-d": "Type D (10-20 × In)"
};

// Fuse Types - UK BS standards only
export const fuseTypes: Record<string, string> = {
  "bs88-2": "BS 88-2 gG/gM (HRC Fuse)",
  "bs88-3": "BS 88-3 System C",
  "bs3036": "BS 3036 (Rewirable Fuse)",
  "bs1362": "BS 1362 (Plug Fuse)"
};

// Available ratings for each fuse type
export const fuseRatings: Record<string, number[]> = {
  "bs88-2": [2, 4, 6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200],
  "bs88-3": [5, 16, 20, 32, 45, 63, 80, 100],
  "bs3036": [5, 15, 20, 30, 45, 60, 100],
  "bs1362": [3, 13]
};

// Available ratings for MCBs/RCBOs
export const mcbRatings = [3, 6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125];

// RCD ratings (mA)
export const rcdRatings = [30, 100, 300, 500];

// Disconnection times
export const disconnectionTimes: Record<string, string> = {
  "0.4": "0.4s (Final circuits ≤32A)",
  "5": "5s (Distribution circuits)"
};

// Get Zs value based on device type, rating, and disconnection time
export const getZsValue = (
  deviceType: string,
  rating: number,
  curveType?: string,
  disconnectionTime: "0.4" | "5" = "0.4"
): number | null => {
  const data = disconnectionTime === "0.4" ? zsValues : zsValues5s;
  
  if (deviceType === "mcb" || deviceType === "rcbo") {
    if (!curveType) return null;
    const deviceData = data[deviceType as keyof typeof data];
    if (!deviceData || typeof deviceData !== 'object') return null;
    const curveData = deviceData[curveType as keyof typeof deviceData];
    if (!curveData || typeof curveData !== 'object') return null;
    return (curveData as Record<number, number>)[rating] || null;
  }
  
  if (deviceType === "rcd") {
    return rcdZsValues[rating as keyof typeof rcdZsValues] || null;
  }
  
  // Fuse types
  const fuseData = data[deviceType as keyof typeof data];
  if (!fuseData || typeof fuseData !== 'object') return null;
  return (fuseData as Record<number, number>)[rating] || null;
};

// Get table reference for display
export const getTableReference = (
  deviceType: string,
  disconnectionTime: "0.4" | "5" = "0.4"
): string => {
  if (deviceType === "mcb" || deviceType === "rcbo") {
    return "Table 41.3";
  }
  if (deviceType === "rcd") {
    return "Table 41.5";
  }
  // Fuses
  return disconnectionTime === "0.4" ? "Table 41.2" : "Table 41.4";
};
