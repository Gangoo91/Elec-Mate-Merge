/**
 * UK Twin and Earth Cable CPC Sizing
 * BS 7671 Table 54.7 - Minimum cross-sectional area of protective conductors
 * 
 * Standard UK flat twin and earth cable CPC sizing relationships
 */

// Canonical T&E CPC mapping per BS 7671 Table 54.7
const T_AND_E_CPC_MAP: Record<string, string> = {
  '1.0mm': '1.0mm',   // 1.0mm² live → 1.0mm² CPC (not common but valid)
  '1.5mm': '1.0mm',   // 1.5mm² live → 1.0mm² CPC (standard lighting cable)
  '2.5mm': '1.5mm',   // 2.5mm² live → 1.5mm² CPC (standard ring/radial sockets)
  '4.0mm': '1.5mm',   // 4.0mm² live → 1.5mm² CPC (radial sockets/small cookers)
  '6.0mm': '2.5mm',   // 6.0mm² live → 2.5mm² CPC (cookers/showers)
  '10mm': '4.0mm',    // 10mm² live → 4.0mm² CPC (large cookers/showers)
  '16mm': '6.0mm',    // 16mm² live → 6.0mm² CPC (very large loads)
};

/**
 * Normalise cable size to canonical format
 * Examples: "2.5mm²" → "2.5mm", "4mm" → "4.0mm", "1.5" → "1.5mm"
 */
export const normaliseCableSize = (size: string): string => {
  if (!size) return '';
  
  // Remove mm² suffix and any whitespace
  let normalised = size.replace(/mm²?/g, '').trim();
  
  // Parse as number to handle various formats
  const num = parseFloat(normalised);
  if (isNaN(num)) return '';
  
  // Format consistently with .0 for 4 and 6, without for others
  if (num === 4 || num === 6) {
    return `${num.toFixed(1)}mm`;
  }
  
  // For other sizes, no decimal places if whole number
  return num % 1 === 0 ? `${Math.floor(num)}mm` : `${num}mm`;
};

/**
 * Get the correct CPC size for a given live conductor size
 * Based on BS 7671 Table 54.7 for UK flat twin and earth cable
 * 
 * @param liveSize - Live conductor size (e.g., "2.5mm", "2.5mm²", "4.0mm")
 * @returns Corresponding CPC size in canonical format (e.g., "1.5mm")
 */
export const twinAndEarthCpcFor = (liveSize: string): string => {
  const canonicalSize = normaliseCableSize(liveSize);
  
  // Return the mapped CPC size, or the same size as fallback if not in map
  return T_AND_E_CPC_MAP[canonicalSize] || canonicalSize;
};

/**
 * Validate if a live/CPC combination is correct UK T&E
 * 
 * @param liveSize - Live conductor size
 * @param cpcSize - CPC conductor size
 * @returns true if the combination is valid UK T&E
 */
export const isValidTwinAndEarth = (liveSize: string, cpcSize: string): boolean => {
  const canonicalLive = normaliseCableSize(liveSize);
  const canonicalCpc = normaliseCableSize(cpcSize);
  
  return T_AND_E_CPC_MAP[canonicalLive] === canonicalCpc;
};
