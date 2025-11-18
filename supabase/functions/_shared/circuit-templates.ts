/**
 * PHASE 3: Template-Based Fast Path
 * Returns instant designs for standard circuits (<5s instead of 60-90s)
 */

export interface CircuitTemplate {
  circuitType: string;
  powerRange: { min: number; max: number };
  maxLength: number;
  standardDesign: any; // CircuitDesign object
}

// Pre-defined templates for common circuits (70%+ of all designs)
export const STANDARD_TEMPLATES: CircuitTemplate[] = [
  {
    circuitType: 'socket',
    powerRange: { min: 0, max: 8000 }, // Up to 32A at 230V (expanded for 7360W rings)
    maxLength: 40, // 40m max for 2.5mm² ring
    standardDesign: {
      loadType: 'sockets',
      cableSize: 2.5,
      cpcSize: 1.5,
      cableType: 'T&E',
      protectionDevice: { type: 'RCBO', rating: 32, curve: 'B', kaRating: 6, rcdRating: 30 },
      rcdProtected: true,
      installationMethod: 'clipped-direct',
      phases: 1,
      calculations: {
        Ib: 32,
        In: 32,
        Iz: 27, // 2.5mm² @ Reference Method C
        voltageDrop: { volts: 0, percent: 0, limit: 5, compliant: true }, // Calculated dynamically
        zs: 0, // Calculated dynamically
        maxZs: 1.37 // 32A Type B MCB
      },
      justifications: {
        cableSize: 'Standard 2.5mm² + 1.5mm CPC ring final circuit per BS 7671 Appendix 15. Ring topology divides current between two parallel paths, reducing effective cable resistance.',
        protection: '32A Type B RCBO with 30mA RCD protection per Regulation 411.3.3. Socket outlets require additional protection by RCD to prevent electric shock.',
        rcd: '30mA RCD protection mandatory for all socket outlets per Reg 411.3.3 to provide protection against electric shock and reduce fire risk from earth faults.'
      },
      warnings: []
    }
  },

  {
    circuitType: 'sockets',
    powerRange: { min: 0, max: 8000 },
    maxLength: 40,
    standardDesign: {
      loadType: 'sockets',
      cableSize: 2.5,
      cpcSize: 1.5,
      cableType: 'T&E',
      protectionDevice: { type: 'RCBO', rating: 32, curve: 'B', kaRating: 6, rcdRating: 30 },
      rcdProtected: true,
      installationMethod: 'clipped-direct',
      phases: 1,
      calculations: {
        Ib: 32,
        In: 32,
        Iz: 27,
        voltageDrop: { volts: 0, percent: 0, limit: 5, compliant: true },
        zs: 0,
        maxZs: 1.37
      },
      justifications: {
        cableSize: 'Standard 2.5mm² + 1.5mm CPC ring final circuit per BS 7671 Appendix 15.',
        protection: '32A Type B RCBO with 30mA RCD protection per Regulation 411.3.3.',
        rcd: '30mA RCD protection mandatory for socket outlets per Reg 411.3.3.'
      },
      warnings: []
    }
  },
  
  {
    circuitType: 'lighting',
    powerRange: { min: 0, max: 1500 }, // Typical lighting load
    maxLength: 60, // 60m max for 1.5mm²
    standardDesign: {
      loadType: 'lighting',
      cableSize: 1.5,
      cpcSize: 1.0,
      cableType: 'T&E',
      protectionDevice: { type: 'MCB', rating: 6, curve: 'B', kaRating: 6 },
      rcdProtected: false,
      installationMethod: 'clipped-direct',
      phases: 1,
      calculations: {
        Ib: 6,
        In: 6,
        Iz: 20, // 1.5mm² @ Reference Method C
        voltageDrop: { volts: 0, percent: 0, limit: 3, compliant: true }, // 3% for lighting!
        zs: 0,
        maxZs: 7.28 // 6A Type B MCB
      },
      justifications: {
        cableSize: '1.5mm² + 1.0mm CPC suitable for lighting loads up to 1.5kW. Provides adequate current capacity and voltage drop compliance for typical lighting circuits.',
        protection: '6A Type B MCB provides overcurrent protection. Rating exceeds design current with appropriate margin for inrush and lamp failures.',
        voltageDrop: '3% voltage drop limit for lighting circuits per BS 7671 to prevent visible flickering or dimming, stricter than 5% for power circuits.'
      },
      warnings: []
    }
  },

  {
    circuitType: 'shower',
    powerRange: { min: 7000, max: 10500 },
    maxLength: 20,
    standardDesign: {
      loadType: 'other',
      cableSize: 10,
      cpcSize: 4,
      cableType: 'T&E',
      protectionDevice: { type: 'MCB', rating: 40, curve: 'B', kaRating: 6 },
      rcdProtected: true,
      installationMethod: 'clipped-direct',
      phases: 1,
      calculations: {
        Ib: 41,
        In: 40,
        Iz: 57,
        voltageDrop: { volts: 0, percent: 0, limit: 5, compliant: true },
        zs: 0,
        maxZs: 1.19
      },
      justifications: {
        cableSize: '10mm² with 4mm² CPC typical for 9–10.5 kW showers with short runs.',
        protection: '40A Type B MCB selected; RCD protection required in bathrooms per 701.',
        voltageDrop: '5% limit for power circuits; computed from Appendix 4 mV/A/m.'
      },
      warnings: []
    }
  },

  {
    circuitType: 'cooker',
    powerRange: { min: 5000, max: 8000 },
    maxLength: 25,
    standardDesign: {
      loadType: 'other',
      cableSize: 6,
      cpcSize: 2.5,
      cableType: 'T&E',
      protectionDevice: { type: 'MCB', rating: 32, curve: 'B', kaRating: 6 },
      rcdProtected: false,
      installationMethod: 'clipped-direct',
      phases: 1,
      calculations: {
        Ib: 31,
        In: 32,
        Iz: 34,
        voltageDrop: { volts: 0, percent: 0, limit: 5, compliant: true },
        zs: 0,
        maxZs: 1.37
      },
      justifications: {
        cableSize: '6mm² radial suitable for ~7 kW cookers at modest lengths.',
        protection: '32A Type B MCB standard; RCD optional for fixed cooking appliances.',
        voltageDrop: '5% limit for power circuits per 525.'
      },
      warnings: []
    }
  }
];

/**
 * Find matching template for a circuit based on type, power, and length
 * Returns null if no template matches (requires AI design)
 */
export function findMatchingTemplate(
  circuitType: string,
  power: number,
  length: number
): CircuitTemplate | null {
  return STANDARD_TEMPLATES.find(t =>
    t.circuitType.toLowerCase() === circuitType.toLowerCase() &&
    power >= t.powerRange.min &&
    power <= t.powerRange.max &&
    length <= t.maxLength
  ) || null;
}

/**
 * Apply template to circuit with actual values (dynamic calculations)
 * This is where we customize the template for the specific circuit
 */
export function applyTemplate(
  template: CircuitTemplate,
  circuitInput: any,
  supplyDetails: any
): any {
  // Clone template design
  const design = JSON.parse(JSON.stringify(template.standardDesign));
  
  // Customize with actual values
  design.name = circuitInput.name || `${circuitInput.loadType} Circuit`;
  design.loadPower = circuitInput.loadPower || 1000;
  design.cableLength = circuitInput.cableLength || 10;
  design.calculations.Ib = circuitInput.loadPower / (supplyDetails.voltage || 230);
  
  // ===== AUTO-UPGRADE CABLE SIZE FOR HIGH Ze =====
  const ze = supplyDetails.ze || 0.35;
  const maxZs = design.calculations.maxZs;
  const originalCableSize = design.cableSize;
  const originalCpcSize = design.cpcSize;
  
  // Helper function to get CPC size based on cable type
  const getCPCSize = (liveSize: number, cableType: string): number => {
    const isSWA = cableType.toLowerCase().includes('swa');
    
    if (isSWA) {
      // SWA cables: CPC must equal live conductor size (BS 7671:543.1.1)
      return liveSize;
    }
    
    // Twin & Earth: reduced CPC per Table 54.7
    const table54_7: Record<number, number> = {
      1.5: 1.0, 2.5: 1.5, 4: 2.5, 6: 2.5, 10: 4, 16: 6
    };
    return table54_7[liveSize] || liveSize;
  };
  
  // Cable upgrade path: 1.5→2.5→4→6→10→16mm²
  const upgradeOptions = [
    { live: 1.5, cpc: getCPCSize(1.5, design.cableType || 'T&E') },
    { live: 2.5, cpc: getCPCSize(2.5, design.cableType || 'T&E') },
    { live: 4, cpc: getCPCSize(4, design.cableType || 'T&E') },
    { live: 6, cpc: getCPCSize(6, design.cableType || 'T&E') },
    { live: 10, cpc: getCPCSize(10, design.cableType || 'T&E') },
    { live: 16, cpc: getCPCSize(16, design.cableType || 'T&E') }
  ];
  
  let upgraded = false;
  let calculatedZs = 0;
  
  // Find current cable in upgrade path
  let currentIndex = upgradeOptions.findIndex(
    opt => opt.live === originalCableSize && opt.cpc === originalCpcSize
  );
  
  if (currentIndex === -1) {
    // Custom size not in upgrade path, find closest match
    currentIndex = upgradeOptions.findIndex(opt => opt.live >= originalCableSize);
    if (currentIndex === -1) currentIndex = upgradeOptions.length - 1;
  }
  
  // Try current size and larger sizes until compliant
  for (let i = currentIndex; i < upgradeOptions.length; i++) {
    const testCable = upgradeOptions[i];
    design.cableSize = testCable.live;
    design.cpcSize = testCable.cpc;
    
    // Calculate Zs for this cable size
    const r1PlusR2 = getR1PlusR2(testCable.live, testCable.cpc);
    calculatedZs = ze + ((r1PlusR2 * circuitInput.cableLength / 1000) * 1.2);
    
    console.log(`🔧 Testing ${testCable.live}mm²+${testCable.cpc}mm: Zs=${calculatedZs.toFixed(3)}Ω vs max ${maxZs}Ω`);
    
    if (calculatedZs <= maxZs) {
      // Compliant! Use this size
      if (i > currentIndex) {
        upgraded = true;
        console.log(`✅ Upgraded from ${originalCableSize}mm² to ${testCable.live}mm² for Ze=${ze}Ω compliance`);
      }
      break;
    }
  }
  
  // Store final Zs calculation
  design.calculations.zs = calculatedZs;
  
  // Add upgrade warning if cable was increased
  if (upgraded) {
    if (!design.warnings) design.warnings = [];
    design.warnings.push(
      `⚠️ Cable upgraded from ${originalCableSize}mm² to ${design.cableSize}mm² due to high Ze (${ze}Ω). ` +
      `Larger cable reduces earth fault loop impedance to ${calculatedZs.toFixed(3)}Ω (max ${maxZs}Ω).`
    );
    
    // Update justification
    design.justifications.cableSize = 
      `${design.cableSize}mm² + ${design.cpcSize}mm CPC selected to meet earth fault loop impedance requirements. ` +
      `High Ze (${ze}Ω) requires larger cable to ensure Zs ≤ ${maxZs}Ω (calculated: ${calculatedZs.toFixed(3)}Ω). ` +
      `BS 7671 Regulation 411.4.4.`;
  }
  
  // If still non-compliant after largest cable, mark as needing AI design
  if (calculatedZs > maxZs) {
    if (!design.warnings) design.warnings = [];
    design.warnings.push(
      `❌ COMPLIANCE FAILURE: Zs (${calculatedZs.toFixed(3)}Ω) exceeds maximum (${maxZs}Ω) even with ${design.cableSize}mm² cable. ` +
      `Consider: (1) Reducing cable length, (2) Improving Ze, or (3) Using lower-rated protection device.`
    );
    
    // Mark for AI review
    design.requiresAIReview = true;
  }
  
  // ===== END AUTO-UPGRADE LOGIC =====
  
  // Recalculate voltage drop with final cable size
  const mvPerAM = getVoltageDrop(design.cableSize, design.loadType);
  const effectiveLength = design.loadType === 'sockets' 
    ? circuitInput.cableLength / 4 // Ring final divide-by-4 rule
    : circuitInput.cableLength;
    
  design.calculations.voltageDrop.volts = 
    (mvPerAM * design.calculations.Ib * effectiveLength) / 1000;
  design.calculations.voltageDrop.percent = 
    (design.calculations.voltageDrop.volts / (supplyDetails.voltage || 230)) * 100;
  design.calculations.voltageDrop.compliant = 
    design.calculations.voltageDrop.percent <= design.calculations.voltageDrop.limit;
  
  return design;
}

/**
 * Get voltage drop (mV/A/m) from Appendix 4
 * Simplified lookup - full table in database
 */
function getVoltageDrop(cableSize: number, loadType: string): number {
  const vdTable: Record<number, number> = {
    1.0: 44,
    1.5: 29,
    2.5: 18,
    4: 11,
    6: 7.3,
    10: 4.4,
    16: 2.8
  };
  return vdTable[cableSize] || 18; // Default to 2.5mm² if not found
}

/**
 * Get R1+R2 resistance (mΩ/m) from Table 54.7
 * Simplified lookup
 */
function getR1PlusR2(cableSize: number, cpcSize: number): number {
  const r1Table: Record<number, number> = { 1.5: 12.1, 2.5: 7.41, 4: 4.61, 6: 3.08, 10: 1.83, 16: 1.15 };
  const r2Table: Record<number, number> = { 1.0: 18.1, 1.5: 12.1, 2.5: 7.41, 4: 4.61, 6: 3.08, 10: 1.83 };
  
  const r1 = r1Table[cableSize] || 7.41;
  const r2 = r2Table[cpcSize] || 7.41;
  
  return r1 + r2;
}
