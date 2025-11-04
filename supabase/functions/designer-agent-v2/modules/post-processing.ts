/**
 * Post-Processing Module
 * Categorizes circuits and generates warnings
 */

/**
 * Categorize circuits by installation type
 */
export function categorizeCircuits(circuits: any[]): {
  lighting: any[];
  sockets: any[];
  appliances: any[];
  other: any[];
} {
  const categories = {
    lighting: [] as any[],
    sockets: [] as any[],
    appliances: [] as any[],
    other: [] as any[]
  };

  circuits.forEach(circuit => {
    const loadType = circuit.loadType?.toLowerCase() || '';
    
    if (loadType.includes('light')) {
      categories.lighting.push(circuit);
    } else if (loadType.includes('socket')) {
      categories.sockets.push(circuit);
    } else if (loadType.includes('shower') || loadType.includes('cooker') || loadType.includes('ev')) {
      categories.appliances.push(circuit);
    } else {
      categories.other.push(circuit);
    }
  });

  return categories;
}

/**
 * Generate design warnings
 */
export function generateWarnings(circuits: any[], supply: any): string[] {
  const warnings: string[] = [];

  circuits.forEach(circuit => {
    // Voltage drop warnings
    if (circuit.calculations?.voltageDrop?.percent > 4) {
      warnings.push(`⚠️ ${circuit.name}: High voltage drop (${circuit.calculations.voltageDrop.percent.toFixed(2)}%)`);
    }

    // Cable size warnings for ring finals (with null safety)
    if (circuit.loadType?.includes('socket') && (circuit.cableSize ?? 2.5) > 2.5) {
      warnings.push(`⚠️ ${circuit.name}: Oversized cable for ring final (should be 2.5mm²)`);
    }

    // RCD protection warnings
    const needsRCD = circuit.loadType?.includes('socket') || circuit.specialLocation?.includes('bathroom');
    if (needsRCD && !circuit.rcdProtected) {
      warnings.push(`❌ ${circuit.name}: Missing RCD protection (required by BS 7671)`);
    }
  });

  return warnings;
}
