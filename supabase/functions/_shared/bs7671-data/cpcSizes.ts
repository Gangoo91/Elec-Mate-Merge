/**
 * BS 7671 Table 54.7 - CPC Sizing for Cables
 * Defines correct CPC sizes for twin and earth and other cable types
 */

export interface CpcSizingRule {
  liveSize: number;
  cpcSize: number;
  cableType: 'twin-earth' | 'single-core' | 'swa';
}

/**
 * BS 7671 Table 54.7 - Twin & Earth CPC Sizing
 * Twin and earth cables have REDUCED CPC size compared to live conductor
 */
const TWIN_EARTH_CPC_SIZES: Record<number, number> = {
  1.0: 1.0,   // 1.0mm² T&E → 1.0mm² CPC
  1.5: 1.0,   // 1.5mm² T&E → 1.0mm² CPC
  2.5: 1.5,   // 2.5mm² T&E → 1.5mm² CPC
  4.0: 2.5,   // 4mm² T&E → 2.5mm² CPC
  6.0: 2.5,   // 6mm² T&E → 2.5mm² CPC
  10.0: 4.0,  // 10mm² T&E → 4mm² CPC
  16.0: 6.0,  // 16mm² T&E → 6mm² CPC
  25.0: 10.0, // 25mm² T&E → 10mm² CPC (rare in T&E)
};

/**
 * For single cores and SWA, CPC typically equals live conductor size
 * (or calculated per BS 7671 Reg 543 adiabatic equation)
 * 
 * RING FINALS SPECIAL CASE:
 * - Twin & Earth rings: 2.5mm² live + 1.5mm² CPC (reduced per Table 54.7)
 * - Singles in conduit/trunking: 2.5mm² live + 2.5mm² CPC (all same size for practicality)
 */
export function getCpcSize(cableType: string, liveSize: number): number {
  const type = cableType.toLowerCase();
  
  // Twin and earth cables use reduced CPC size per Table 54.7
  if (type.includes('twin') || type.includes('t&e') || type.includes('t & e')) {
    const cpcSize = TWIN_EARTH_CPC_SIZES[liveSize];
    if (cpcSize !== undefined) {
      return cpcSize;
    }
    
    // If not in table, use closest smaller standard size
    console.warn(`Twin & earth CPC size not found for ${liveSize}mm² - using safe default`);
    return liveSize >= 16 ? liveSize * 0.6 : liveSize * 0.67;
  }
  
  // Single cores and SWA: CPC equals live conductor size
  // This includes ring finals with singles (2.5mm² + 2.5mm² CPC)
  if (type.includes('swa') || type.includes('single') || type.includes('xlpe') || type.includes('lszh')) {
    return liveSize;
  }
  
  // Default to twin & earth sizing for unknown types (safest assumption)
  return TWIN_EARTH_CPC_SIZES[liveSize] || liveSize;
}

/**
 * Validate CPC size is correct for the cable type
 */
export function validateCpcSize(
  cableType: string, 
  liveSize: number, 
  cpcSize: number
): { valid: boolean; expectedCpcSize: number; message?: string } {
  const expectedCpcSize = getCpcSize(cableType, liveSize);
  
  if (cpcSize === expectedCpcSize) {
    return { valid: true, expectedCpcSize };
  }
  
  const type = cableType.toLowerCase();
  const isTwinEarth = type.includes('twin') || type.includes('t&e');
  
  return {
    valid: false,
    expectedCpcSize,
    message: isTwinEarth 
      ? `Twin & earth ${liveSize}mm² should have ${expectedCpcSize}mm² CPC per BS 7671 Table 54.7, but got ${cpcSize}mm²`
      : `${cableType} ${liveSize}mm² should have ${expectedCpcSize}mm² CPC, but got ${cpcSize}mm²`
  };
}

/**
 * Get cable specification display string (simplified format)
 */
export function getCableSpecification(
  liveSize: number,
  cableType: string
): string {
  const type = cableType.toLowerCase();
  
  // Simplify to just size and type (CPC shown separately)
  if (type.includes('twin') || type.includes('t&e')) {
    return `${liveSize}mm² twin and earth`;
  }
  
  if (type.includes('swa')) {
    return `${liveSize}mm² SWA`;
  }
  
  if (type.includes('xlpe') && type.includes('single')) {
    return `${liveSize}mm² XLPE singles`;
  }
  
  if (type.includes('pvc') && type.includes('single')) {
    return `${liveSize}mm² PVC singles`;
  }
  
  // Generic fallback
  return `${liveSize}mm² ${cableType}`;
}
