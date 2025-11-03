/**
 * Prompt Builder Module
 * Constructs structured prompts for AI circuit design
 */

const INSTALLATION_CONTEXT = {
  domestic: `Design compliant with Part P Building Regulations and BS 7671:2018+A3:2024.
- RCD protection required for all circuits (Reg 411.3.3)
- Bathroom circuits must have 30mA RCD (Section 701)
- Consider future EV charging capability
- AFDDs required for new installations per Amendment 3
- Focus on safety in wet locations (bathrooms, outdoors)`,
  commercial: `Design per BS 7671:2018+A3:2024 for commercial installations.
- AFDDs mandatory for new commercial circuits (Amendment 3)
- Emergency lighting compliance per BS 5839
- Fire alarm integration considerations
- RCBOs recommended for all final circuits
- Higher fault levels expected in commercial supplies
- Consider surge protection (Reg 534.4)`,
  industrial: `Industrial installation per BS 7671:2018+A3:2024.
- Three-phase motor protection with Type D MCBs
- Consider motor starting currents (6-8x full load)
- SWA cabling for mechanical protection
- Higher fault currents - 10kA+ MCBs (Reg 536.1)
- Diversity calculations essential for multiple motors
- Regular inspection intervals per Reg 622
- G59/G99 agreements may be required for generation`
};

/**
 * Get circuit-type specific regulation hints
 */
export function getCircuitTypeHints(loadType: string, location?: string): string {
  const hints: Record<string, string> = {
    'shower': 'Section 701 (bathrooms), 30mA RCD mandatory, bonding required, min 10mm² cable typical',
    'ev_charger': 'Section 722, dedicated circuit, Type A RCD required, 6mm² minimum, Mode 3 compliance',
    'ev-charger': 'Section 722, dedicated circuit, Type A RCD required, 6mm² minimum, Mode 3 compliance',
    'cooker': 'Reg 433.1.204 diversity (10A + 30% remainder + 5A socket), 10mm² typical, 40-50A MCB',
    'socket': `CRITICAL CABLE SIZING RULES:
  
  1. RING FINAL CIRCUITS (most common for sockets):
     - Cable: ALWAYS 2.5mm²/1.5mm² T&E OR 2.5mm² 3-core SWA
     - Protection: 32A Type B MCB
     - Max load: 7.36kW (diversified)
     - Regulation: BS 7671 Appendix 15 / Reg 433.1.204
     - NEVER use 4mm², 6mm², or 10mm² cable for ring finals
     - If load >7.36kW: SPLIT into multiple 2.5mm² ring circuits
  
  2. RADIAL CIRCUITS (use only when ring not practical):
     - 4mm² cable + 32A MCB (max 75m)
     - 2.5mm² cable + 20A MCB (max 50m)
     - 6mm² cable + 40A MCB (industrial)
  
  3. DECISION TREE:
     - ≤8 socket outlets + domestic = Ring Final (2.5mm²)
     - >8 socket outlets = Multiple Ring Finals (2.5mm² each)
     - Long cable run (>50m) outdoor = Radial (4mm² SWA)
     - Industrial workshop = Radial (6mm² SWA)`,
    'lighting': '1.5mm² cable, 6A MCB Type B, 3% voltage drop limit (6.9V at 230V)',
    'outdoor': '30mA RCD mandatory (411.3.3), SWA cable, IP65+ rating, burial depth 600mm',
    'motor': 'Type D MCB for starting current (6-8x FLC), DOL or star-delta starting'
  };
  
  const locationHints: Record<string, string> = {
    'bathroom': 'Section 701: IP rating zones (IPX4 min), 30mA RCD, supplementary bonding',
    'outdoor': 'Reg 411.3.3: RCD mandatory, IP65+, burial depth 600mm, SWA cable',
    'garage': 'RCD recommended, mechanical protection, consider EV charger future-proofing'
  };
  
  let hint = hints[loadType] || 'Standard circuit design per BS 7671';
  if (location && locationHints[location]) {
    hint += ` | ${locationHints[location]}`;
  }
  
  return hint;
}

/**
 * Build structured design prompt with RAG results
 */
export function buildStructuredDesignPrompt(
  projectInfo: any, 
  supply: any, 
  circuits: any[], 
  ragResults: any, 
  type: string,
  specialRequirements: string[] = [],
  installationConstraints: string[] = []
): string {
  const regulations = ragResults.regulations?.slice(0, 25).map((r: any) => 
    `${r.regulation_number}: ${r.content.substring(0, 300)}`
  ).join('\n\n') || 'No specific regulations retrieved';
  
  // Generate circuit-specific hints
  const circuitHints = circuits.length > 0
    ? circuits.map((c: any, i: number) => {
        const hint = getCircuitTypeHints(c.loadType, c.specialLocation);
        return `${i+1}. ${c.name} (${c.loadType}): ${hint}`;
      }).join('\n')
    : '';
  
  return `You are a senior electrical design engineer specializing in BS 7671:2018+A3:2024 compliant installations.

🚨 CRITICAL: RCD PROTECTION REQUIREMENTS (BS 7671 Reg 411.3.3):

ALWAYS SET rcdProtected = true FOR:
1. ALL socket outlet circuits
2. ALL outdoor circuits
3. ALL bathroom/wet location circuits  
4. ALL TT earthing systems
5. Mobile equipment (even if hardwired)

INSTALLATION TYPE: ${type}
${INSTALLATION_CONTEXT[type] || ''}

INCOMING SUPPLY DETAILS:
- Voltage: ${supply.voltage}V ${supply.phases}
- Ze: ${supply.Ze}Ω
- Earthing System: ${supply.earthingSystem}
- PFC: ${supply.pscc || 3500}A

${specialRequirements.length > 0 ? `SPECIAL REQUIREMENTS:\n${specialRequirements.join('\n')}\n\n` : ''}
${installationConstraints.length > 0 ? `INSTALLATION CONSTRAINTS:\n${installationConstraints.join('\n')}\n\n` : ''}

CIRCUITS TO DESIGN (${circuits.length} total):
${circuits.map((c: any, i: number) => `${i+1}. ${c.name} - ${c.loadPower}W, ${c.cableLength}m, ${c.phases} phase`).join('\n')}

${circuitHints ? `CIRCUIT-SPECIFIC HINTS:\n${circuitHints}\n\n` : ''}

BS 7671 KNOWLEDGE BASE:
${regulations}

Design complete circuits with all calculations, protection devices, and BS 7671 justifications.`;
}

/**
 * Build design query from project info and circuits
 */
export function buildDesignQuery(
  projectInfo: any, 
  supply: any, 
  circuits: any[],
  specialRequirements: string[] = [],
  installationConstraints: string[] = []
): string {
  const circuitList = circuits.length > 0 
    ? `Circuits required (${circuits.length} total):\n${circuits.map((c: any, i: number) => 
        `${i+1}. ${c.name} - ${c.loadPower}W, ${c.cableLength}m`
      ).join('\n')}`
    : 'Infer appropriate circuits from project requirements.';
    
  let query = `Design circuits for ${projectInfo.name}.\n\nSupply: ${supply.voltage}V, Ze=${supply.Ze}Ω.\n\n${circuitList}`;

  if (specialRequirements.length > 0) {
    query += `\n\nSpecial Requirements:\n${specialRequirements.join('\n')}`;
  }

  if (projectInfo.additionalPrompt) {
    query += `\n\n${projectInfo.additionalPrompt}`;
  }

  return query;
}

/**
 * Extract search terms from query and circuits
 */
export function extractSearchTerms(query: string, circuits: any[]): string[] {
  const terms = ['circuit design', 'cable sizing', 'voltage drop', 'protection devices'];
  
  circuits.forEach((c: any) => {
    if (c.loadType) terms.push(c.loadType);
    if (c.specialLocation && c.specialLocation !== 'none') terms.push(c.specialLocation);
  });
  
  return terms;
}
