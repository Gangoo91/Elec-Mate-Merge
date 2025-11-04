/**
 * TOON (Token-Optimized Object Notation) Formatter
 * Reduces token usage by 40-50% vs JSON while maintaining readability
 * Research shows TOON achieves 86.6% accuracy using 46.3% fewer tokens
 */

export interface RegulationTOON {
  regulation_number?: string;
  content?: string;
  section?: string;
  category?: string;
  topic?: string;
  similarity?: number;
}

/**
 * Convert regulations to TOON format
 * 
 * TOON Rules:
 * - Use indentation (2 spaces) instead of brackets
 * - Omit quotes around keys
 * - Use single newlines (not double)
 * - Abbreviate common terms (R→regulation, C→content, S→section)
 * - Group related regulations hierarchically
 */
export function formatRegulationsAsTOON(
  regulations: RegulationTOON[],
  maxLength: number = 300
): string {
  if (!regulations || regulations.length === 0) {
    return 'R General\n  C No specific regulations retrieved';
  }

  // Group regulations by section (e.g., Part 4, Part 5)
  const grouped = groupBySection(regulations);
  
  let toon = '';
  
  for (const [section, regs] of Object.entries(grouped)) {
    // Section header (only if multiple sections)
    if (Object.keys(grouped).length > 1) {
      toon += `S ${section}\n`;
    }
    
    // Regulations within section
    regs.forEach(r => {
      const regNum = r.regulation_number || r.topic || 'General';
      const content = truncateContent(r.content || '', maxLength);
      
      // TOON format: R <number>
      //               C <content>
      toon += `  R ${regNum}\n`;
      toon += `    C ${content}\n`;
      
      // Optional: Add category if present
      if (r.category) {
        toon += `    Cat ${r.category}\n`;
      }
    });
  }
  
  return toon.trim();
}

/**
 * Group regulations by section (Part 4, Part 5, etc.)
 */
function groupBySection(regulations: RegulationTOON[]): Record<string, RegulationTOON[]> {
  const groups: Record<string, RegulationTOON[]> = {};
  
  regulations.forEach(r => {
    const section = extractSection(r.regulation_number || r.topic || '');
    if (!groups[section]) {
      groups[section] = [];
    }
    groups[section].push(r);
  });
  
  return groups;
}

/**
 * Extract section from regulation number
 * 433.1.1 → Part 4 (Protection)
 * 525.1 → Part 5 (Selection)
 * 701.411 → Part 7 (Special Locations)
 */
function extractSection(regNum: string): string {
  const partNum = regNum.charAt(0);
  
  const partMap: Record<string, string> = {
    '1': 'Scope',
    '2': 'Definitions',
    '3': 'Assessment',
    '4': 'Protection',
    '5': 'Selection',
    '6': 'Verification',
    '7': 'Special Locations',
    '8': 'Reserved'
  };
  
  return partMap[partNum] || 'General';
}

/**
 * Truncate content intelligently (at sentence boundary)
 */
function truncateContent(content: string, maxLength: number): string {
  if (content.length <= maxLength) return content;
  
  // Try to cut at last sentence within limit
  const truncated = content.substring(0, maxLength);
  const lastPeriod = truncated.lastIndexOf('.');
  const lastComma = truncated.lastIndexOf(',');
  
  if (lastPeriod > maxLength * 0.7) {
    return truncated.substring(0, lastPeriod + 1);
  } else if (lastComma > maxLength * 0.8) {
    return truncated.substring(0, lastComma) + '...';
  }
  
  return truncated + '...';
}

/**
 * Calculate token savings (rough estimate: 1 token ≈ 4 chars)
 */
export function estimateTokenSavings(
  oldFormat: string,
  toonFormat: string
): { oldTokens: number; toonTokens: number; savings: number; savingsPercent: string } {
  const oldTokens = Math.round(oldFormat.length / 4);
  const toonTokens = Math.round(toonFormat.length / 4);
  const savings = oldTokens - toonTokens;
  const savingsPercent = ((savings / oldTokens) * 100).toFixed(1);
  
  return {
    oldTokens,
    toonTokens,
    savings,
    savingsPercent
  };
}
