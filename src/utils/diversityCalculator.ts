/**
 * IET On-Site Guide Table 1B / Table H2 Diversity Calculator
 * BS 7671:2018+A3:2024 Compliant
 */

export interface Circuit {
  id: string;
  name: string;
  loadType: string;
  totalLoad: number;
  designCurrent: number;
  voltage?: number;
}

export interface DiversityResult {
  diversifiedCurrent: number;
  diversityFactor: number;
  formula: string;
  regulation: string;
  breakdown: string[];
}

export type PremisesType = 'domestic' | 'commercial' | 'industrial' | 'hotel';

/**
 * IET On-Site Guide Table 1B / Table H2 Diversity Allowances
 */
export const diversityRules = {
  lighting: {
    domestic: { factor: 0.66, formula: '66% of total current', regulation: 'Table 1B item 1' },
    commercial: { factor: 0.90, formula: '90% of total current', regulation: 'Table H2 item 1' },
    industrial: { factor: 0.90, formula: '90% of total current', regulation: 'Table H2 item 1' },
    hotel: { factor: 0.75, formula: '75% of total current', regulation: 'Table H2 item 1' }
  },
  ringFinal: {
    domestic: { 
      assumedCurrent: 32, 
      formula: 'Assumed 32A per ring (100% largest + 40% remainder for multiple rings)',
      regulation: 'Table 1B item 2'
    },
    commercial: { 
      assumedCurrent: 32,
      formula: 'Assumed 32A per ring (100% largest + 50% remainder for multiple rings)',
      regulation: 'Table H2 item 2'
    }
  },
  radialSocket: {
    domestic: { 
      formula: '100% up to 10A + 40% of remainder',
      regulation: 'Table 1B item 2'
    },
    commercial: { 
      formula: '100% up to 10A + 50% of remainder',
      regulation: 'Table H2 item 2'
    },
    industrial: {
      formula: '100% up to 10A + 60% of remainder',
      regulation: 'Table H2 item 2'
    }
  },
  cooker: {
    domestic: { 
      formula: '10A + 30% of excess over 10A (+ 5A if socket outlet)',
      regulation: 'Table 1B item 3'
    }
  },
  shower: {
    domestic: {
      formula: '100% largest + 100% second + 25% of remainder',
      regulation: 'Table 1B item 5'
    },
    commercial: {
      formula: '100% largest + 80% second + 60% of remainder',
      regulation: 'Table H2 item 5'
    }
  },
  evCharger: {
    factor: 1.0,
    formula: 'No diversity allowable',
    regulation: 'BS 7671:2018 Section 722.311'
  },
  immersion: {
    factor: 1.0,
    formula: 'No diversity allowable (thermostatically controlled)',
    regulation: 'Table H2 item 7'
  },
  floorWarming: {
    factor: 1.0,
    formula: 'No diversity allowable (thermostatically controlled)',
    regulation: 'Table H2 item 8'
  },
  thermalStorage: {
    factor: 1.0,
    formula: 'No diversity allowable',
    regulation: 'Table H2 item 9'
  },
  heating: {
    domestic: { factor: 1.0, formula: '100% (no diversity for space heating)', regulation: 'Table 1B item 4' },
    commercial: { factor: 0.90, formula: '90% of total current', regulation: 'Table H2 item 4' },
    industrial: { factor: 1.0, formula: '100% (no diversity)', regulation: 'Table H2 item 4' }
  },
  motor: {
    factor: 1.0,
    formula: 'No diversity (motors require full starting current)',
    regulation: 'BS 7671 Appendix 4'
  }
};

/**
 * Classify circuit load type for diversity calculation
 */
function classifyCircuitType(loadType: string): string {
  const lower = loadType.toLowerCase();
  
  if (lower.includes('lighting') || lower.includes('light')) return 'lighting';
  if (lower.includes('ring') && (lower.includes('socket') || lower.includes('final'))) return 'ringFinal';
  if (lower.includes('radial') && lower.includes('socket')) return 'radialSocket';
  if (lower.includes('socket') && !lower.includes('ring')) return 'radialSocket';
  if (lower.includes('cooker') || lower.includes('hob') || lower.includes('oven')) return 'cooker';
  if (lower.includes('shower') || lower.includes('electric shower')) return 'shower';
  if (lower.includes('ev') || lower.includes('charger') || lower.includes('vehicle')) return 'evCharger';
  if (lower.includes('immersion') || lower.includes('water heater')) return 'immersion';
  if (lower.includes('floor') && lower.includes('warm')) return 'floorWarming';
  if (lower.includes('thermal storage') || lower.includes('storage heater')) return 'thermalStorage';
  if (lower.includes('heating') || lower.includes('heater')) return 'heating';
  if (lower.includes('motor') || lower.includes('pump')) return 'motor';
  
  return 'other';
}

/**
 * Calculate diversity for lighting circuits
 */
export function calculateLightingDiversity(
  circuits: Circuit[], 
  premises: PremisesType
): DiversityResult {
  const totalCurrent = circuits.reduce((sum, c) => sum + c.designCurrent, 0);
  const rule = diversityRules.lighting[premises] || diversityRules.lighting.domestic;
  const diversifiedCurrent = totalCurrent * rule.factor;
  
  return {
    diversifiedCurrent,
    diversityFactor: rule.factor,
    formula: rule.formula,
    regulation: `IET On-Site Guide ${rule.regulation}`,
    breakdown: [
      `Total lighting load: ${totalCurrent.toFixed(2)}A`,
      `Applied ${(rule.factor * 100).toFixed(0)}% diversity = ${diversifiedCurrent.toFixed(2)}A`,
      `Per ${rule.regulation}`
    ]
  };
}

/**
 * Calculate diversity for ring final circuits
 */
export function calculateRingDiversity(
  circuits: Circuit[], 
  premises: PremisesType
): DiversityResult {
  const rule = diversityRules.ringFinal[premises === 'domestic' ? 'domestic' : 'commercial'];
  
  if (circuits.length === 1) {
    return {
      diversifiedCurrent: rule.assumedCurrent,
      diversityFactor: 1.0,
      formula: `Single ring = ${rule.assumedCurrent}A`,
      regulation: `IET On-Site Guide ${rule.regulation}`,
      breakdown: [
        `Single ring final circuit`,
        `Assumed current: ${rule.assumedCurrent}A`,
        `Per ${rule.regulation}`
      ]
    };
  }
  
  const remainderFactor = premises === 'domestic' ? 0.40 : 0.50;
  const largestCurrent = rule.assumedCurrent;
  const remainderCurrent = (circuits.length - 1) * rule.assumedCurrent;
  const diversifiedCurrent = largestCurrent + (remainderCurrent * remainderFactor);
  const totalCurrent = circuits.length * rule.assumedCurrent;
  
  return {
    diversifiedCurrent,
    diversityFactor: diversifiedCurrent / totalCurrent,
    formula: rule.formula,
    regulation: `IET On-Site Guide ${rule.regulation}`,
    breakdown: [
      `${circuits.length} ring final circuits`,
      `100% of largest: ${largestCurrent}A`,
      `${(remainderFactor * 100).toFixed(0)}% of ${circuits.length - 1} remaining: ${(remainderCurrent * remainderFactor).toFixed(2)}A`,
      `Total diversified: ${diversifiedCurrent.toFixed(2)}A`,
      `Per ${rule.regulation}`
    ]
  };
}

/**
 * Calculate diversity for radial socket circuits
 */
export function calculateRadialSocketDiversity(
  circuits: Circuit[], 
  premises: PremisesType
): DiversityResult {
  const totalCurrent = circuits.reduce((sum, c) => sum + c.designCurrent, 0);
  const rule = diversityRules.radialSocket[premises] || diversityRules.radialSocket.domestic;
  
  let diversifiedCurrent: number;
  let remainderFactor: number;
  
  if (premises === 'domestic') {
    remainderFactor = 0.40;
  } else if (premises === 'commercial') {
    remainderFactor = 0.50;
  } else {
    remainderFactor = 0.60;
  }
  
  if (totalCurrent <= 10) {
    diversifiedCurrent = totalCurrent;
  } else {
    diversifiedCurrent = 10 + ((totalCurrent - 10) * remainderFactor);
  }
  
  return {
    diversifiedCurrent,
    diversityFactor: diversifiedCurrent / totalCurrent,
    formula: rule.formula,
    regulation: `IET On-Site Guide ${rule.regulation}`,
    breakdown: [
      `Total radial socket load: ${totalCurrent.toFixed(2)}A`,
      totalCurrent <= 10 
        ? `Load ≤ 10A: 100% = ${diversifiedCurrent.toFixed(2)}A`
        : `10A + ${(remainderFactor * 100).toFixed(0)}% of ${(totalCurrent - 10).toFixed(2)}A = ${diversifiedCurrent.toFixed(2)}A`,
      `Per ${rule.regulation}`
    ]
  };
}

/**
 * Calculate diversity for cooker circuits
 */
export function calculateCookerDiversity(
  circuit: Circuit,
  hasSocket: boolean = false
): DiversityResult {
  const cookerAmps = circuit.designCurrent;
  let diversified = 10;
  
  if (cookerAmps > 10) {
    diversified += (cookerAmps - 10) * 0.30;
  }
  
  if (hasSocket) {
    diversified += 5;
  }
  
  return {
    diversifiedCurrent: diversified,
    diversityFactor: diversified / cookerAmps,
    formula: diversityRules.cooker.domestic.formula,
    regulation: `IET On-Site Guide ${diversityRules.cooker.domestic.regulation}`,
    breakdown: [
      `Cooker load: ${cookerAmps.toFixed(2)}A`,
      `First 10A: 10A`,
      cookerAmps > 10 ? `30% of excess ${(cookerAmps - 10).toFixed(2)}A: ${((cookerAmps - 10) * 0.30).toFixed(2)}A` : '',
      hasSocket ? `Socket outlet allowance: 5A` : '',
      `Total diversified: ${diversified.toFixed(2)}A`,
      `Per ${diversityRules.cooker.domestic.regulation}`
    ].filter(Boolean)
  };
}

/**
 * Calculate diversity for shower circuits
 */
export function calculateShowerDiversity(
  circuits: Circuit[], 
  premises: PremisesType
): DiversityResult {
  const sorted = [...circuits].sort((a, b) => b.designCurrent - a.designCurrent);
  const rule = diversityRules.shower[premises === 'domestic' ? 'domestic' : 'commercial'];
  
  if (circuits.length === 1) {
    return {
      diversifiedCurrent: sorted[0].designCurrent,
      diversityFactor: 1.0,
      formula: 'Single shower = 100%',
      regulation: `IET On-Site Guide ${rule.regulation}`,
      breakdown: [
        `Single shower circuit`,
        `Load: ${sorted[0].designCurrent.toFixed(2)}A (no diversity)`,
        `Per ${rule.regulation}`
      ]
    };
  }
  
  const largest = sorted[0]?.designCurrent || 0;
  const second = sorted[1]?.designCurrent || 0;
  const remainder = sorted.slice(2).reduce((sum, c) => sum + c.designCurrent, 0);
  
  let diversifiedCurrent: number;
  if (premises === 'domestic') {
    diversifiedCurrent = largest + second + (remainder * 0.25);
  } else {
    diversifiedCurrent = largest + (second * 0.80) + (remainder * 0.60);
  }
  
  const totalCurrent = circuits.reduce((sum, c) => sum + c.designCurrent, 0);
  
  return {
    diversifiedCurrent,
    diversityFactor: diversifiedCurrent / totalCurrent,
    formula: rule.formula,
    regulation: `IET On-Site Guide ${rule.regulation}`,
    breakdown: [
      `${circuits.length} shower circuits`,
      `100% of largest: ${largest.toFixed(2)}A`,
      second > 0 ? `${premises === 'domestic' ? '100%' : '80%'} of second: ${(premises === 'domestic' ? second : second * 0.80).toFixed(2)}A` : '',
      remainder > 0 ? `${premises === 'domestic' ? '25%' : '60%'} of remainder: ${(remainder * (premises === 'domestic' ? 0.25 : 0.60)).toFixed(2)}A` : '',
      `Total diversified: ${diversifiedCurrent.toFixed(2)}A`,
      `Per ${rule.regulation}`
    ].filter(Boolean)
  };
}

/**
 * Calculate diversity for heating circuits
 */
export function calculateHeatingDiversity(
  circuits: Circuit[],
  premises: PremisesType
): DiversityResult {
  const totalCurrent = circuits.reduce((sum, c) => sum + c.designCurrent, 0);
  const rule = diversityRules.heating[premises] || diversityRules.heating.domestic;
  const diversifiedCurrent = totalCurrent * rule.factor;
  
  return {
    diversifiedCurrent,
    diversityFactor: rule.factor,
    formula: rule.formula,
    regulation: `IET On-Site Guide ${rule.regulation}`,
    breakdown: [
      `Total heating load: ${totalCurrent.toFixed(2)}A`,
      rule.factor === 1.0 
        ? `No diversity applied (100%) = ${diversifiedCurrent.toFixed(2)}A`
        : `Applied ${(rule.factor * 100).toFixed(0)}% diversity = ${diversifiedCurrent.toFixed(2)}A`,
      `Per ${rule.regulation}`
    ]
  };
}

/**
 * Calculate diversity for circuits with no allowable diversity
 */
export function calculateNoDiversity(
  circuits: Circuit[],
  type: 'evCharger' | 'immersion' | 'floorWarming' | 'thermalStorage' | 'motor'
): DiversityResult {
  const totalCurrent = circuits.reduce((sum, c) => sum + c.designCurrent, 0);
  const rule = diversityRules[type];
  
  return {
    diversifiedCurrent: totalCurrent,
    diversityFactor: 1.0,
    formula: rule.formula,
    regulation: rule.regulation,
    breakdown: [
      `${circuits.length} ${type} circuit(s)`,
      `Total load: ${totalCurrent.toFixed(2)}A`,
      `No diversity applied (100%)`,
      `Per ${rule.regulation}`
    ]
  };
}

/**
 * Main diversity calculator - groups circuits by type and applies correct diversity
 */
export function calculateSystemDiversity(
  circuits: Circuit[],
  premises: PremisesType = 'domestic'
): {
  diversifiedCurrent: number;
  diversityFactor: number;
  totalSystemCurrent: number;
  breakdown: Array<{
    type: string;
    count: number;
    totalCurrent: number;
    diversifiedCurrent: number;
    diversityFactor: number;
    formula: string;
    regulation: string;
    details: string[];
  }>;
} {
  // Group circuits by type
  const grouped = circuits.reduce((acc, circuit) => {
    const type = classifyCircuitType(circuit.loadType);
    if (!acc[type]) acc[type] = [];
    acc[type].push(circuit);
    return acc;
  }, {} as Record<string, Circuit[]>);
  
  const breakdown: Array<{
    type: string;
    count: number;
    totalCurrent: number;
    diversifiedCurrent: number;
    diversityFactor: number;
    formula: string;
    regulation: string;
    details: string[];
  }> = [];
  
  let totalDiversifiedCurrent = 0;
  const totalSystemCurrent = circuits.reduce((sum, c) => sum + c.designCurrent, 0);
  
  // Apply diversity per circuit group
  for (const [type, groupCircuits] of Object.entries(grouped)) {
    let result: DiversityResult;
    
    switch (type) {
      case 'lighting':
        result = calculateLightingDiversity(groupCircuits, premises);
        break;
      case 'ringFinal':
        result = calculateRingDiversity(groupCircuits, premises);
        break;
      case 'radialSocket':
        result = calculateRadialSocketDiversity(groupCircuits, premises);
        break;
      case 'cooker':
        result = calculateCookerDiversity(groupCircuits[0]);
        break;
      case 'shower':
        result = calculateShowerDiversity(groupCircuits, premises);
        break;
      case 'heating':
        result = calculateHeatingDiversity(groupCircuits, premises);
        break;
      case 'evCharger':
      case 'immersion':
      case 'floorWarming':
      case 'thermalStorage':
      case 'motor':
        result = calculateNoDiversity(groupCircuits, type as any);
        break;
      default:
        // Unknown type - no diversity
        const unknownCurrent = groupCircuits.reduce((sum, c) => sum + c.designCurrent, 0);
        result = {
          diversifiedCurrent: unknownCurrent,
          diversityFactor: 1.0,
          formula: 'No diversity (unknown type)',
          regulation: 'Conservative approach',
          breakdown: [`Unknown circuit type: 100% = ${unknownCurrent.toFixed(2)}A`]
        };
    }
    
    totalDiversifiedCurrent += result.diversifiedCurrent;
    
    breakdown.push({
      type,
      count: groupCircuits.length,
      totalCurrent: groupCircuits.reduce((sum, c) => sum + c.designCurrent, 0),
      diversifiedCurrent: result.diversifiedCurrent,
      diversityFactor: result.diversityFactor,
      formula: result.formula,
      regulation: result.regulation,
      details: result.breakdown
    });
  }
  
  return {
    diversifiedCurrent: totalDiversifiedCurrent,
    diversityFactor: totalDiversifiedCurrent / totalSystemCurrent,
    totalSystemCurrent,
    breakdown
  };
}
