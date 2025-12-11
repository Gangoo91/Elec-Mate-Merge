// BS7671 Protective Device Data and Calculations
// Includes MCB, RCBO, BS88 Fuses, and MCCB specifications

export interface ProtectiveDevice {
  type: 'mcb' | 'rcbo' | 'bs88' | 'mccb';
  curve?: 'B' | 'C' | 'D';
  ratingRange: [number, number]; // [min, max] amperage
  maxZs: Record<number, number>; // Rating -> Max Zs value at 230V
  characteristics: {
    breakingCapacity: number; // kA
    operatingTime: string;
    applications: string[];
    advantages: string[];
    considerations: string[];
  };
  procurement: {
    typical: string;
    leadTime: string;
    availability: 'excellent' | 'good' | 'moderate' | 'limited';
    costRange: 'low' | 'medium' | 'high' | 'very-high';
  };
}

// Standard protective device ratings (BS EN 60898, BS 88)
export const standardDeviceRatings = {
  mcb: [1, 2, 3, 4, 6, 8, 10, 13, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125],
  rcbo: [6, 10, 13, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125],
  bs88: [2, 4, 6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400, 500, 630, 800, 1000, 1250],
  mccb: [16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400, 500, 630, 800, 1000, 1250, 1600, 2000, 2500, 3200, 4000]
};

// BS 7671:2018+A3:2024 Maximum Zs values - Official Tables 41.2, 41.3 (0.4s disconnection)
export const maxZsValues = {
  mcb: {
    // Type B MCBs (3-5 × In) - BS 7671 Table 41.3
    typeB: {
      3: 14.57, 6: 7.28, 10: 4.37, 16: 2.73, 20: 2.19, 25: 1.75,
      32: 1.37, 40: 1.09, 50: 0.87, 63: 0.69, 80: 0.55, 100: 0.44, 125: 0.35
    },
    // Type C MCBs (5-10 × In) - BS 7671 Table 41.3
    typeC: {
      6: 3.64, 10: 2.19, 16: 1.37, 20: 1.09, 25: 0.87,
      32: 0.68, 40: 0.55, 50: 0.44, 63: 0.35, 80: 0.27, 100: 0.22, 125: 0.17
    },
    // Type D MCBs (10-20 × In) - BS 7671 Table 41.3
    typeD: {
      6: 1.82, 10: 1.09, 16: 0.68, 20: 0.55, 25: 0.44,
      32: 0.34, 40: 0.27, 50: 0.22, 63: 0.17, 80: 0.14, 100: 0.11, 125: 0.09
    }
  },
  rcbo: {
    // RCBO Type B - BS 7671 Table 41.3 (same as MCB)
    typeB: {
      3: 14.57, 6: 7.28, 10: 4.37, 16: 2.73, 20: 2.19, 25: 1.75,
      32: 1.37, 40: 1.09, 50: 0.87, 63: 0.69, 80: 0.55, 100: 0.44, 125: 0.35
    },
    // RCBO Type C - BS 7671 Table 41.3 (same as MCB)
    typeC: {
      6: 3.64, 10: 2.19, 16: 1.37, 20: 1.09, 25: 0.87,
      32: 0.68, 40: 0.55, 50: 0.44, 63: 0.35, 80: 0.27, 100: 0.22, 125: 0.17
    }
  },
  bs88: {
    // BS 88-2 gG/gM Fuses - BS 7671 Table 41.2(a)
    gG: {
      2: 33.1, 4: 15.6, 6: 7.80, 10: 4.65, 16: 2.43, 20: 1.68, 25: 1.29, 32: 0.99,
      40: 0.75, 50: 0.57, 63: 0.44
    }
  },
  mccb: {
    // MCCB - Conservative values (varies by manufacturer)
    standard: {
      16: 1.37, 20: 1.09, 25: 0.87, 32: 0.68, 40: 0.55, 50: 0.44, 63: 0.35,
      80: 0.27, 100: 0.22, 125: 0.17, 160: 0.14, 200: 0.11, 250: 0.09,
      315: 0.07, 400: 0.05, 500: 0.04, 630: 0.03, 800: 0.03, 1000: 0.02,
      1250: 0.02, 1600: 0.01, 2000: 0.01, 2500: 0.01, 3200: 0.01, 4000: 0.01
    }
  }
};

export const protectiveDevices: Record<string, ProtectiveDevice> = {
  'mcb-b': {
    type: 'mcb',
    curve: 'B',
    ratingRange: [1, 125],
    maxZs: maxZsValues.mcb.typeB,
    characteristics: {
      breakingCapacity: 10, // kA (typical for domestic)
      operatingTime: '0.1-5s at 3-5 × In',
      applications: ['Domestic circuits', 'Commercial lighting', 'Small motors'],
      advantages: ['Quick disconnection', 'Cost effective', 'Compact'],
      considerations: ['Limited to 125A', 'May nuisance trip on motor starting']
    },
    procurement: {
      typical: 'Schneider Electric, ABB, Hager, MEM',
      leadTime: 'Same day - 1 week',
      availability: 'excellent',
      costRange: 'low'
    }
  },

  'mcb-c': {
    type: 'mcb',
    curve: 'C',
    ratingRange: [1, 125],
    maxZs: maxZsValues.mcb.typeC,
    characteristics: {
      breakingCapacity: 10,
      operatingTime: '0.1-5s at 5-10 × In',
      applications: ['Motor circuits', 'Fluorescent lighting', 'Commercial power'],
      advantages: ['Motor starting compatible', 'Versatile', 'Standard for commercial'],
      considerations: ['Slower earth fault clearance', 'Higher Zs requirements']
    },
    procurement: {
      typical: 'Schneider Electric, ABB, Hager, MEM',
      leadTime: 'Same day - 1 week',
      availability: 'excellent',
      costRange: 'low'
    }
  },

  'mcb-d': {
    type: 'mcb',
    curve: 'D',
    ratingRange: [1, 125],
    maxZs: maxZsValues.mcb.typeD,
    characteristics: {
      breakingCapacity: 10,
      operatingTime: '0.1-5s at 10-20 × In',
      applications: ['Large motors', 'Transformers', 'High inrush loads'],
      advantages: ['High inrush tolerance', 'Welding circuits', 'Transformer protection'],
      considerations: ['Very high Zs requirements', 'Slower fault clearance']
    },
    procurement: {
      typical: 'Schneider Electric, ABB, Hager',
      leadTime: '1-2 weeks',
      availability: 'good',
      costRange: 'medium'
    }
  },

  'rcbo-b': {
    type: 'rcbo',
    curve: 'B',
    ratingRange: [6, 125],
    maxZs: maxZsValues.rcbo.typeB,
    characteristics: {
      breakingCapacity: 10,
      operatingTime: '0.1-5s at 3-5 × In + 30mA RCD',
      applications: ['Socket circuits', 'Bathroom circuits', 'IT equipment'],
      advantages: ['Combined protection', 'Individual RCD protection', 'Space saving'],
      considerations: ['Higher cost', 'False tripping possible', 'Testing requirements']
    },
    procurement: {
      typical: 'Schneider Electric, ABB, Hager, MEM',
      leadTime: '1-2 weeks',
      availability: 'good',
      costRange: 'medium'
    }
  },

  'rcbo-c': {
    type: 'rcbo',
    curve: 'C',
    ratingRange: [6, 125],
    maxZs: maxZsValues.rcbo.typeC,
    characteristics: {
      breakingCapacity: 10,
      operatingTime: '0.1-5s at 5-10 × In + 30mA RCD',
      applications: ['Motor circuits with RCD', 'Commercial installations', 'TT systems'],
      advantages: ['Motor starting + RCD', 'Discrimination possible', 'Code compliance'],
      considerations: ['Complex testing', 'Higher cost', 'Coordination needed']
    },
    procurement: {
      typical: 'Schneider Electric, ABB, Hager',
      leadTime: '1-3 weeks',
      availability: 'good',
      costRange: 'medium'
    }
  },

  'bs88-gg': {
    type: 'bs88',
    ratingRange: [2, 1250],
    maxZs: maxZsValues.bs88.gG,
    characteristics: {
      breakingCapacity: 120, // kA (very high)
      operatingTime: 'I²t characteristic - very fast at high currents',
      applications: ['High current circuits', 'Motor protection', 'Industrial installations', 'Main incomer protection'],
      advantages: ['Very high breaking capacity', 'Excellent discrimination', 'No moving parts', 'Current limiting'],
      considerations: ['Must be replaced after operation', 'Requires fuse carrier', 'Higher voltage drop']
    },
    procurement: {
      typical: 'Bussmann, Mersen, Cooper, Schneider',
      leadTime: '1-4 weeks',
      availability: 'good',
      costRange: 'medium'
    }
  },

  'mccb': {
    type: 'mccb',
    ratingRange: [16, 4000],
    maxZs: maxZsValues.mccb.standard,
    characteristics: {
      breakingCapacity: 50, // kA (adjustable)
      operatingTime: 'Adjustable time/current characteristics',
      applications: ['Main distribution', 'Large motor protection', 'Feeder circuits', 'Industrial applications'],
      advantages: ['Adjustable settings', 'High current ratings', 'Good discrimination', 'Reusable after trip'],
      considerations: ['Higher cost', 'Larger size', 'Settings complexity', 'Regular maintenance needed']
    },
    procurement: {
      typical: 'ABB, Schneider Electric, Siemens, Eaton',
      leadTime: '2-8 weeks',
      availability: 'moderate',
      costRange: 'high'
    }
  }
};

// Get suitable protective devices for a given design current
export const getSuitableDevices = (designCurrent: number, maxCurrent?: number): Array<{
  deviceType: string;
  ratings: number[];
  recommended: number;
  compliance: boolean;
}> => {
  const results: Array<{
    deviceType: string;
    ratings: number[];
    recommended: number;
    compliance: boolean;
  }> = [];

  // Map generic device types to specific device variants
  const deviceTypeMapping: Record<string, string[]> = {
    'mcb': ['mcb-b', 'mcb-c', 'mcb-d'],
    'rcbo': ['rcbo-b', 'rcbo-c'],
    'bs88': ['bs88-gg'],
    'mccb': ['mccb']
  };

  Object.entries(standardDeviceRatings).forEach(([genericType, ratings]) => {
    // Find suitable ratings (must be >= design current)
    const suitableRatings = ratings.filter(rating => {
      const isAboveDesign = rating >= designCurrent;
      const isBelowMax = !maxCurrent || rating <= maxCurrent;
      return isAboveDesign && isBelowMax;
    });

    if (suitableRatings.length > 0) {
      const recommended = suitableRatings[0]; // Smallest suitable rating
      const compliance = recommended >= designCurrent * 1.0 && recommended <= designCurrent * 1.45; // BS7671 coordination
      
      // Get the specific device variants for this generic type
      const deviceVariants = deviceTypeMapping[genericType] || [genericType];
      
      // Add each variant to results
      deviceVariants.forEach(specificType => {
        // Only add if this specific device type exists in our protectiveDevices database
        if (protectiveDevices[specificType]) {
          results.push({
            deviceType: specificType,
            ratings: suitableRatings.slice(0, 3), // Show first 3 options
            recommended,
            compliance
          });
        }
      });
    }
  });

  return results.sort((a, b) => a.recommended - b.recommended);
};

// Get device family information for UI display
export const getDeviceInfo = (deviceType: string): ProtectiveDevice | null => {
  return protectiveDevices[deviceType] || null;
};

// Calculate maximum Zs for a specific device and rating
export const getMaxZs = (deviceType: string, rating: number, voltage: number = 230): number => {
  const device = protectiveDevices[deviceType];
  if (!device || !device.maxZs[rating]) {
    return 0; // Very conservative if unknown
  }

  // Scale for different voltages if needed
  const voltageRatio = voltage / 230;
  return device.maxZs[rating] * voltageRatio;
};

// Get appropriate device type recommendation based on application
export const getRecommendedDeviceType = (
  designCurrent: number, 
  loadType: string, 
  voltage: number,
  isRcd?: boolean
): string => {
  // For high currents, recommend BS88 or MCCB
  if (designCurrent > 125) {
    return designCurrent > 400 ? 'mccb' : 'bs88-gg';
  }

  // For motor loads, prefer Type C
  if (loadType.includes('motor') || loadType.includes('hvac')) {
    return isRcd ? 'rcbo-c' : 'mcb-c';
  }

  // For socket circuits, prefer RCBO
  if (loadType === 'power' || loadType.includes('socket')) {
    return 'rcbo-b';
  }

  // Default to Type B
  return isRcd ? 'rcbo-b' : 'mcb-b';
};