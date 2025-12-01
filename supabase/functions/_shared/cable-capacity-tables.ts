/**
 * BS 7671 Cable Capacity Reference Tables
 * Used for validation against AI outputs
 */

// BS 7671 Table 4D4A - SWA 3-core XLPE 90°C (Method C - clipped direct)
export const SWA_TABLE_4D4A: Record<number, number> = {
  1.5: 20,
  2.5: 27,
  4: 37,
  6: 47,
  10: 64,
  16: 85,
  25: 112,
  35: 137,   // NOT 210A - AI often gets this wrong!
  50: 164,
  70: 201,   // Minimum for 200A protection
  95: 238,
  120: 274,
  150: 310,
  185: 348,
  240: 399,
  300: 450,
  400: 511,
  500: 569,
  630: 640
};

// BS 7671 Table 4D1A - PVC Twin & Earth 70°C (Method C - clipped direct)
export const PVC_TWIN_EARTH_TABLE_4D1A: Record<number, number> = {
  1.0: 13,
  1.5: 16,
  2.5: 24,
  4: 32,
  6: 41,
  10: 57,
  16: 76,
  25: 101,
  35: 125,
  50: 151
};

// BS 7671 Table 4D5A - XLPE Twin & Earth 90°C (Method C - clipped direct)
export const XLPE_TWIN_EARTH_TABLE_4D5A: Record<number, number> = {
  1.0: 16,
  1.5: 20,
  2.5: 30,
  4: 40,
  6: 51,
  10: 70,
  16: 94,
  25: 125,
  35: 156,
  50: 188
};

/**
 * Validate cable capacity claim against BS 7671 tables
 */
export function validateCableCapacityClaim(
  cableType: string,
  cableSize: number,
  claimedCapacity: number
): { valid: boolean; actualCapacity?: number; table?: string } {
  let table: Record<number, number> | null = null;
  let tableName = '';
  
  if (cableType.toLowerCase().includes('swa')) {
    table = SWA_TABLE_4D4A;
    tableName = 'Table 4D4A';
  } else if (cableType.toLowerCase().includes('twin') && cableType.toLowerCase().includes('pvc')) {
    table = PVC_TWIN_EARTH_TABLE_4D1A;
    tableName = 'Table 4D1A';
  } else if (cableType.toLowerCase().includes('twin') && cableType.toLowerCase().includes('xlpe')) {
    table = XLPE_TWIN_EARTH_TABLE_4D5A;
    tableName = 'Table 4D5A';
  }
  
  if (!table || !table[cableSize]) {
    return { valid: true }; // Can't validate unknown types
  }
  
  const actualCapacity = table[cableSize];
  const tolerance = 5; // Allow 5A for derating
  
  if (Math.abs(claimedCapacity - actualCapacity) > tolerance) {
    return {
      valid: false,
      actualCapacity,
      table: tableName
    };
  }
  
  return { valid: true, actualCapacity };
}

/**
 * Get minimum cable size for a given protection device rating
 */
export function getMinimumCableSize(
  cableType: string,
  protectionRating: number
): { size: number; capacity: number } | null {
  let table: Record<number, number> | null = null;
  
  if (cableType.toLowerCase().includes('swa')) {
    table = SWA_TABLE_4D4A;
  } else if (cableType.toLowerCase().includes('twin') && cableType.toLowerCase().includes('pvc')) {
    table = PVC_TWIN_EARTH_TABLE_4D1A;
  } else if (cableType.toLowerCase().includes('twin') && cableType.toLowerCase().includes('xlpe')) {
    table = XLPE_TWIN_EARTH_TABLE_4D5A;
  }
  
  if (!table) return null;
  
  // Find smallest cable with capacity >= protection rating
  const entries = Object.entries(table).map(([size, capacity]) => ({
    size: parseFloat(size),
    capacity
  }));
  
  const suitable = entries
    .filter(e => e.capacity >= protectionRating)
    .sort((a, b) => a.size - b.size)[0];
  
  return suitable || null;
}
