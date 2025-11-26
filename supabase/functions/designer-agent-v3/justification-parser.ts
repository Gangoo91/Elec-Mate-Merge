/**
 * Justification Parser - Extracts Structured Values from AI Prose
 * Makes design justification the single source of truth
 */

import type { DesignSections } from './types.ts';

export interface ParsedDesignValues {
  cableSize?: number;
  cpcSize?: number;
  cableType?: string;
  mcbRating?: number;
  mcbType?: 'MCB' | 'RCBO';
  mcbCurve?: 'B' | 'C' | 'D';
  mcbKaRating?: number;
  Ib?: number;
  Id?: number;
  In?: number;
  Iz?: number;
  diversityFactor?: number;
  voltageDrop?: { volts: number; percent: number };
  zs?: number;
  maxZs?: number;
}

/**
 * Parse design justification prose to extract structured numeric values
 */
export function parseDesignJustification(sections: DesignSections): ParsedDesignValues {
  // Combine all relevant prose sections
  const combined = [
    sections.cableSelectionBreakdown || '',
    sections.protectiveDeviceSelection || '',
    sections.loadDetails || '',
    sections.designJustification || '',
    sections.complianceConfirmation || ''
  ].join(' ');

  const parsed: ParsedDesignValues = {};

  // Extract cable size (e.g., "6mm²", "2.5mm²")
  const cableMatch = combined.match(/(\d+(?:\.\d+)?)\s*mm²(?:\s+cable|\s+T&E|\s+twin|\s+SWA)?/i);
  if (cableMatch) {
    parsed.cableSize = parseFloat(cableMatch[1]);
  }

  // Extract CPC size (e.g., "4mm² CPC", "2.5mm² protective conductor")
  const cpcMatch = combined.match(/(\d+(?:\.\d+)?)\s*mm²\s+(?:CPC|protective conductor|earth)/i);
  if (cpcMatch) {
    parsed.cpcSize = parseFloat(cpcMatch[1]);
  }

  // Extract MCB rating and type (e.g., "32A Type B MCB", "40A B-curve", "63A Type C")
  const mcbMatch = combined.match(/(\d+)\s*A\s+(?:Type\s+)?([BCD])(?:\s+MCB|\s+curve|-curve)?/i);
  if (mcbMatch) {
    parsed.mcbRating = parseInt(mcbMatch[1]);
    parsed.mcbCurve = mcbMatch[2].toUpperCase() as 'B' | 'C' | 'D';
  }

  // Extract RCBO if mentioned
  if (combined.match(/RCBO/i)) {
    parsed.mcbType = 'RCBO';
  } else {
    parsed.mcbType = 'MCB';
  }

  // Extract kA rating (e.g., "6kA", "10kA")
  const kaMatch = combined.match(/(\d+)\s*kA/i);
  if (kaMatch) {
    parsed.mcbKaRating = parseInt(kaMatch[1]);
  }

  // Extract Ib - Design Current (raw connected load)
  // Patterns: "Ib = 24.3A", "design current of 32A", "Ib: 15.5A"
  const ibMatch = combined.match(/(?:Ib|design current)\s*[=:]\s*(\d+(?:\.\d+)?)\s*A/i);
  if (ibMatch) {
    parsed.Ib = parseFloat(ibMatch[1]);
  }

  // Extract Id - Diversified Current (for MCB selection)
  // Patterns: "Id = 22.1A", "diversified current of 18.7A", "Id: 20A"
  const idMatch = combined.match(/(?:Id|diversified current)\s*[=:]\s*(\d+(?:\.\d+)?)\s*A/i);
  if (idMatch) {
    parsed.Id = parseFloat(idMatch[1]);
  }

  // Extract In - Nominal MCB Rating
  const inMatch = combined.match(/In\s*[=:]\s*(\d+)\s*A/i);
  if (inMatch) {
    parsed.In = parseInt(inMatch[1]);
  }

  // Extract Iz - Cable Current Carrying Capacity
  // Patterns: "Iz = 27A", "cable capacity of 32A", "Iz: 25A"
  const izMatch = combined.match(/(?:Iz|cable capacity|current-carrying capacity)\s*[=:]\s*(\d+(?:\.\d+)?)\s*A/i);
  if (izMatch) {
    parsed.Iz = parseFloat(izMatch[1]);
  }

  // Extract Diversity Factor
  // Patterns: "diversity factor of 0.78", "78% diversity", "0.65 diversity applied"
  const diversityMatch = combined.match(/(?:diversity factor|diversity)\s+(?:of\s+)?(\d+(?:\.\d+)?)/i);
  if (diversityMatch) {
    const factor = parseFloat(diversityMatch[1]);
    // If value is >1, it's a percentage (e.g., 78%), convert to decimal
    parsed.diversityFactor = factor > 1 ? factor / 100 : factor;
  }

  // Extract Voltage Drop
  // Patterns: "6.9V (3%)", "voltage drop of 5.2V (2.3%)", "VD = 8.1V (3.5%)"
  const vdMatch = combined.match(/(?:voltage drop|VD)\s*[=:of]*\s*(\d+(?:\.\d+)?)\s*V\s*\((\d+(?:\.\d+)?)\s*%\)/i);
  if (vdMatch) {
    parsed.voltageDrop = {
      volts: parseFloat(vdMatch[1]),
      percent: parseFloat(vdMatch[2])
    };
  }

  // Extract Zs - Earth Fault Loop Impedance
  // Patterns: "Zs = 1.15Ω", "loop impedance of 0.85Ω", "Zs: 1.2Ω"
  const zsMatch = combined.match(/(?:Zs|loop impedance)\s*[=:of]*\s*(\d+(?:\.\d+)?)\s*[ΩΩohm]/i);
  if (zsMatch) {
    parsed.zs = parseFloat(zsMatch[1]);
  }

  // Extract Maximum Zs
  // Patterns: "max Zs = 1.44Ω", "maximum permitted loop impedance of 1.15Ω"
  const maxZsMatch = combined.match(/(?:max(?:imum)?\s+(?:permitted\s+)?(?:Zs|loop impedance))\s*[=:of]*\s*(\d+(?:\.\d+)?)\s*[ΩΩohm]/i);
  if (maxZsMatch) {
    parsed.maxZs = parseFloat(maxZsMatch[1]);
  }

  return parsed;
}

/**
 * Log parsed values for debugging
 */
export function logParsedValues(circuitName: string, parsed: ParsedDesignValues, logger: any) {
  const extracted = Object.entries(parsed)
    .filter(([_, v]) => v !== undefined)
    .map(([k, v]) => {
      if (k === 'voltageDrop' && typeof v === 'object') {
        return `${k}: ${v.volts}V (${v.percent}%)`;
      }
      return `${k}: ${v}`;
    });

  if (extracted.length > 0) {
    logger.info(`📊 Parsed from justification [${circuitName}]`, {
      values: extracted.join(', ')
    });
  } else {
    logger.warn(`⚠️ No values parsed from justification [${circuitName}]`);
  }
}
