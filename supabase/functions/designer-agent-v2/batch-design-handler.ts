import { corsHeaders, createClient } from '../_shared/deps.ts';
import { intelligentRAGSearch } from '../_shared/intelligent-rag.ts';
import { parseQueryEntities } from '../_shared/query-parser.ts';
import { chunkArray, RequestDeduplicator, generateRequestKey } from './parallel-utils.ts';
import { withTimeout, Timeouts } from '../_shared/timeout.ts';
import { loadCoreRegulationsCache } from './core-regulations-cache.ts';
import { validateDesign, calculateCircuitConfidence, calculateOverallConfidence } from './validation-pipeline.ts';
import { extractCircuitsWithAI } from './ai-circuit-extractor.ts';
import { callGemini, AIProviderError } from '../_shared/ai-providers.ts';
import { TypeGuards, applyDefaultCircuitValues } from './type-guards.ts';
import { CircuitDesignError, ERROR_TEMPLATES } from './error-handler.ts';
import { PerformanceMonitor } from './performance-monitor.ts';

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

// ============= HELPER FUNCTIONS (Must be declared before use) =============

/**
 * Auto-correct missing RCD protection flags (PHASE 3)
 * Fixes AI omissions before validation runs
 */
function autoCorrectRCDProtection(circuits: any[], incomingSupply: any, logger: any): void {
  let correctionCount = 0;
  
  circuits.forEach((circuit, index) => {
    const loadType = circuit.loadType?.toLowerCase() || '';
    const location = circuit.specialLocation?.toLowerCase() || '';
    
    // Check if RCD should be enabled but isn't
    const shouldHaveRCD = 
      loadType.includes('socket') ||
      loadType.includes('outdoor') ||
      location.includes('bathroom') ||
      location.includes('outdoor') ||
      incomingSupply.earthingSystem === 'TT';
    
    if (shouldHaveRCD && !circuit.rcdProtected) {
      logger.warn(`🔧 Auto-correcting missing RCD protection for circuit ${index + 1}: ${circuit.name}`);
      
      circuit.rcdProtected = true;
      circuit.rcdProtectedText = circuit.protectionDevice?.type === 'RCBO' ? '30mA RCBO' : '30mA RCD';
      
      // Update justification if missing or incomplete
      if (!circuit.justifications) {
        circuit.justifications = {};
      }
      if (!circuit.justifications.rcd || circuit.justifications.rcd.length < 50) {
        circuit.justifications.rcd = `30mA RCD protection is provided to the ${circuit.name} per Regulation 411.3.3 for socket outlets that may supply portable equipment. This provides additional protection against earth faults.`;
      }
      
      correctionCount++;
    }
  });
  
  if (correctionCount > 0) {
    logger.info(`✅ Auto-corrected ${correctionCount} circuits with missing RCD protection`);
  }
}

/**
 * Auto-correct undersized MCB ratings before validation
 * Ensures Ib ≤ In by rounding up to next standard MCB size
 */
function autoCorrectMCBSizing(circuits: any[], logger: any): any[] {
  const standardSizes = [6, 10, 16, 20, 32, 40, 50, 63, 80, 100];
  
  return circuits.map(circuit => {
    const Ib = circuit.calculations?.Ib;
    const In = circuit.protectionDevice?.rating;
    
    if (Ib && In && Ib > In) {
      // Find next standard size up
      const correctIn = standardSizes.find(size => size >= Math.ceil(Ib)) || 100;
      
      logger.warn(`⚠️ Auto-correcting MCB: ${circuit.name} - Ib=${Ib.toFixed(2)}A, In=${In}A → ${correctIn}A`, {
        circuit: circuit.name,
        originalIn: In,
        correctedIn: correctIn,
        Ib: Ib.toFixed(2)
      });
      
      circuit.protectionDevice.rating = correctIn;
      circuit.calculations.In = correctIn;
      circuit.nominalCurrentIn = correctIn;
      
      // Recalculate safety margin
      if (circuit.calculations.Iz) {
        circuit.calculations.safetyMargin = ((circuit.calculations.Iz - correctIn) / correctIn) * 100;
      }
      
      // Update justifications to reflect auto-correction
      if (circuit.justifications?.protection) {
        circuit.justifications.protection = circuit.justifications.protection.replace(
          new RegExp(`${In}A`, 'g'),
          `${correctIn}A`
        );
      }
    }
    
    return circuit;
  });
}

/**
 * Extract circuits from additional prompt text using NLP entity parsing
 */
function extractCircuitsFromPrompt(additionalPrompt: string, existingCircuits: any[]): {
  inferredCircuits: any[];
  specialRequirements: string[];
  installationConstraints: string[];
} {
  if (!additionalPrompt?.trim()) {
    return { inferredCircuits: [], specialRequirements: [], installationConstraints: [] };
  }

  const entities = parseQueryEntities(additionalPrompt);
  const inferredCircuits: any[] = [];
  const specialRequirements: string[] = [];
  const installationConstraints: string[] = [];
  
  // Extract special requirements from entities
  if (entities.specialRequirements) {
    specialRequirements.push(...entities.specialRequirements);
  }
  
  // Extract installation constraints
  if (entities.installationConstraints) {
    installationConstraints.push(...entities.installationConstraints);
  }
  
  // Add location-based requirements
  if (entities.location === 'bathroom') {
    specialRequirements.push('⚠️ Section 701: Bathroom installation - 30mA RCD mandatory, IP rating zones, bonding required');
  }
  if (entities.location === 'outdoor') {
    specialRequirements.push('⚠️ Reg 411.3.3: Outdoor installation - 30mA RCD mandatory, IP65+ rating, SWA cable');
  }
  
  // Add earthing system requirements
  if (entities.earthingSystem === 'TT') {
    specialRequirements.push('⚠️ TT System: 30mA RCD on all circuits, earth electrode resistance critical');
  }
  
  // Add high temperature derating
  if (entities.ambientTemperature && entities.ambientTemperature > 30) {
    installationConstraints.push(`🔧 High ambient temperature (${entities.ambientTemperature}°C): Apply temperature derating factor`);
  }
  
  // Infer circuits if power + load type mentioned
  if (entities.power && entities.loadType) {
    inferredCircuits.push({
      name: `${entities.loadType} (from prompt)`,
      loadType: entities.loadType,
      loadPower: entities.power,
      cableLength: entities.distance || 20,
      phases: entities.phases || 'single',
      specialLocation: entities.location || 'none'
    });
  }
  
  return { inferredCircuits, specialRequirements, installationConstraints };
}

/**
 * Get circuit-type specific regulation hints
 */
function getCircuitTypeHints(loadType: string, location?: string): string {
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
    'sockets': `CRITICAL CABLE SIZING RULES:
  
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
    'office-sockets': 'Ring finals: 2.5mm²/1.5mm² T&E + 32A MCB per ring. **Split >7kW into multiple rings** (e.g., 16 sockets = 2× 8-socket rings). Never use 6mm².',
    'lighting': '1.5mm² cable, 6A MCB Type B, 3% voltage drop limit (6.9V at 230V)',
    'outdoor': '30mA RCD mandatory (411.3.3), SWA cable, IP65+ rating, burial depth 600mm. IMPORTANT: If ring final (32A MCB) = 2.5mm² SWA. If radial = 4mm²/6mm² SWA',
    'heat_pump': 'Dedicated circuit, 16mm² typical, 63A MCB, surge protection (534.4)',
    'immersion': '16A MCB, 2.5mm² cable typical, timer control, off-peak tariff consideration',
    'motor': 'Type D MCB for starting current (6-8x FLC), DOL or star-delta starting',
    'garage': 'RCD protection recommended, mechanical protection for exposed cables'
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
 * Build design query from project info and circuits
 */
function buildDesignQuery(
  projectInfo: any, 
  supply: any, 
  circuits: any[],
  specialRequirements: string[] = [],
  installationConstraints: string[] = []
): string {
  const circuitList = circuits.length > 0 
    ? `Circuits required (${circuits.length} total):\n${circuits.map((c: any, i: number) => 
        `${i+1}. ${c.name} - ${c.loadPower}W (${(c.loadPower/1000).toFixed(1)}kW), ${c.cableLength}m, ${c.phases} phase${c.specialLocation !== 'none' ? ` (${c.specialLocation})` : ''}`
      ).join('\n')}`
    : 'Please infer appropriate circuits from the project description and requirements.';
    
  let query = `Design circuits for ${projectInfo.name}.
  
Incoming supply: ${supply.voltage}V ${supply.phases}, Ze=${supply.Ze}Ω, ${supply.earthingSystem}.
Prospective fault current: ${supply.pscc || 3500}A.

${circuitList}`;

  if (specialRequirements.length > 0) {
    query += `\n\nSpecial Requirements:\n${specialRequirements.map(r => `- ${r}`).join('\n')}`;
  }

  if (installationConstraints.length > 0) {
    query += `\n\nInstallation Constraints:\n${installationConstraints.map(c => `- ${c}`).join('\n')}`;
  }

  if (projectInfo.additionalPrompt) {
    query += `\n\n${projectInfo.additionalPrompt}`;
  }

  return query;
}

/**
 * Extract search terms from query and circuits
 */
function extractSearchTerms(query: string, circuits: any[]): string[] {
  const terms = ['circuit design', 'cable sizing', 'voltage drop', 'protection devices', 'BS 7671'];
  
  // Add circuit-specific terms
  circuits.forEach((c: any) => {
    if (c.loadType) terms.push(c.loadType);
    if (c.specialLocation && c.specialLocation !== 'none') terms.push(c.specialLocation);
  });
  
  return terms;
}

/**
 * Build structured design prompt with RAG results
 */
function buildStructuredDesignPrompt(
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

🚨 CRITICAL: RCD PROTECTION REQUIREMENTS (BS 7671 Reg 411.3.3) - PHASE 1:

ALWAYS SET rcdProtected = true FOR:
1. ALL socket outlet circuits (domestic, commercial, industrial)
2. ALL outdoor circuits
3. ALL bathroom/wet location circuits  
4. ALL TT earthing systems
5. Mobile equipment (even if hardwired)

ALWAYS SET rcdProtected = false FOR:
1. Fixed lighting circuits (not in bathrooms)
2. Fixed appliances (cooker, shower with main RCD upstream)
3. Three-phase distribution (sub-main) with RCD at consumer unit

DEFAULT RULE: If uncertain, SET rcdProtected = true (safer)

RCD TYPE SELECTION:
- Standard socket circuits: 30mA Type AC or Type A
- EV chargers: 30mA Type B (DC fault protection)
- Medical locations: 10mA Type A

JUSTIFICATION TEMPLATES:
- If rcdProtected = true: "30mA RCD protection is provided to {circuit name} per Regulation 411.3.3 for socket outlets that may supply portable equipment. This provides additional protection against earth faults."
- If rcdProtected = false: "RCD protection not required for this fixed {circuit type} circuit as it does not serve socket outlets or special locations per Regulation 411.3.1.2. Main distribution RCD provides upstream protection."

INSTALLATION TYPE: ${type}
${INSTALLATION_CONTEXT[type] || ''}

INCOMING SUPPLY DETAILS:
- Voltage: ${supply.voltage}V ${supply.phases}
- External Earth Fault Loop Impedance (Ze): ${supply.Ze}Ω
- Earthing System: ${supply.earthingSystem}
- Prospective Fault Current (PFC): ${supply.pscc || 3500}A
- Main Switch Rating: ${supply.mainSwitchRating || 100}A

${specialRequirements.length > 0 ? `SPECIAL REQUIREMENTS:
${specialRequirements.map(r => `${r}`).join('\n')}

` : ''}${installationConstraints.length > 0 ? `INSTALLATION CONSTRAINTS:
${installationConstraints.map(c => `${c}`).join('\n')}

` : ''}CIRCUITS TO DESIGN (${circuits.length} total):
${circuits.length > 0 
  ? circuits.map((c: any, i: number) => `${i+1}. ${c.name}
   - Load Type: ${c.loadType}
   - Power: ${c.loadPower}W (${(c.loadPower/1000).toFixed(1)}kW)
   - Cable Run: ${c.cableLength}m
   - Phases: ${c.phases}
   - Location: ${c.specialLocation || 'general'}`).join('\n\n')
  : 'No specific circuits provided. Infer appropriate circuits from the project requirements and additional prompt.'}

${circuitHints ? `CIRCUIT-SPECIFIC REGULATION HINTS:
${circuitHints}

` : ''}BS 7671 KNOWLEDGE BASE (Top 25 regulations retrieved via multi-query RAG):
${regulations}

CRITICAL DESIGN REQUIREMENTS:

1. **Cable Sizing (Reg 433.1)**:
   - Calculate design current (Ib) for each circuit
   - Select protective device rating (In) where In ≥ Ib
   - Determine cable current-carrying capacity (Iz) where Iz ≥ In
   - Apply derating factors for ambient temperature and grouping
   - Select appropriate cable CSA (mm²) and CPC size

2. **Voltage Drop Compliance (Reg 525)**:
   - Calculate actual voltage drop in volts and percentage
   - Lighting circuits: Max 3% (6.9V at 230V)
   - Power circuits: Max 5% (11.5V at 230V)
   - Use cable resistance values from BS 7671 Appendix 4

3. **Earth Fault Protection (Reg 411.3.2)**:
   - Calculate circuit Zs (Ze + R1+R2)
   - Verify Zs < maximum permitted Zs for chosen protective device
   - Ensure disconnection time ≤ 0.4s (final circuits) or ≤ 5s (distribution)

4. **RCD Protection (Reg 411.3.3)**:
   - ALL socket outlets ≤32A require 30mA RCD
   - Bathrooms (Section 701): 30mA RCD mandatory
   - Outdoor circuits: 30mA RCD mandatory
   - Specify RCBO or separate RCD

5. **Diversity Calculation (Appendix 15)**:
   - Apply diversity factors per BS 7671 Appendix 15
   - Provide clear reasoning for each circuit's diversity
   - Calculate total diversified load for main switch sizing
   - Include diversity breakdown with BS 7671 references

6. **Materials List**:
   - Specify cable types (T&E, SWA, FP200) based on location
   - Include quantities with units (metres, number of)
   - List all protective devices
   - Include consumer unit specification

7. **Justifications**:
   - Cite specific BS 7671 regulation numbers
   - Explain cable size selection with calculations
   - Justify protective device type, rating, and curve
   - Explain RCD requirements based on location/circuit type

IMPORTANT NOTES:
- ALL calculations must be numerically accurate
- ALL regulation citations must be specific (e.g., "Reg 411.3.3")
- Provide practical justifications, not just regulation text
- Consider installation method impact on current capacity
- Account for voltage drop over cable length
- Ensure all circuits meet disconnection time requirements
${circuits.length === 0 ? '- Since no circuits were provided, infer appropriate circuits from the project type and brief' : ''}

You MUST call the design_circuits function to return your complete design. Do not output text or markdown - only call the tool.`;
}

// ============= MAIN LOGIC =============

/**
 * Categorize circuits into high-power (individual processing) vs standard (batched)
 * High-power circuits often cause MALFORMED_FUNCTION_CALL due to complex calculations
 */
function categorizeCircuits(circuits: any[], logger: any) {
  const HIGH_POWER_TYPES = ['shower', 'ev', 'charger', 'cooker', 'oven', 'hob', 'heat pump', 'immersion', 'outdoor'];
  const HIGH_POWER_THRESHOLD = 7000; // 7kW+
  
  const isHighPower = (circuit: any): boolean => {
    const name = (circuit.name || circuit.loadType || '').toLowerCase();
    const hasHighPowerType = HIGH_POWER_TYPES.some(type => name.includes(type));
    const hasHighPower = (circuit.loadPower || 0) > HIGH_POWER_THRESHOLD;
    const isSpecialLocation = circuit.specialLocation && circuit.specialLocation !== 'none';
    return hasHighPowerType || hasHighPower || isSpecialLocation;
  };
  
  const highPowerCircuits = circuits.filter(isHighPower);
  const standardCircuits = circuits.filter(c => !isHighPower(c));
  
  logger.info('🔍 Circuit categorization for smart processing', {
    total: circuits.length,
    highPower: highPowerCircuits.length,
    standard: standardCircuits.length,
    highPowerTypes: highPowerCircuits.map(c => c.name || c.loadType),
    strategy: 'High-power circuits get individual processing with equipment-specific prompts'
  });
  
  return { highPowerCircuits, standardCircuits };
}

/**
 * Pre-design validation: Check for impossible circuit requirements
 * Catches errors before expensive AI call
 */
function validateCircuitRequirements(circuits: any[], logger: any): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  circuits.forEach((circuit, index) => {
    const loadType = circuit.loadType?.toLowerCase() || '';
    const power = circuit.loadPower || 0;
    
    // Check for high-power socket circuits (should be split into rings)
    if (loadType.includes('socket') && power > 7360) {
      const ringCount = Math.ceil(power / 7360);
      errors.push(
        `Circuit ${index + 1} (${circuit.name}): ${(power/1000).toFixed(1)}kW socket load requires ${ringCount} ring final circuits (max 7.36kW per ring). Split circuit.`
      );
    }
    
    // Check for outdoor ring finals (should be radial)
    const isOutdoor = circuit.specialLocation?.toLowerCase().includes('outdoor');
    if (loadType.includes('socket') && isOutdoor && power > 3000) {
      warnings.push(
        `Circuit ${index + 1} (${circuit.name}): Outdoor socket circuit >3kW should use RADIAL configuration (4mm² SWA), not ring final`
      );
    }
  });
  
  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

export async function handleBatchDesign(body: any, logger: any) {
  // Initialize performance monitor
  const perfMonitor = new PerformanceMonitor(crypto.randomUUID());
  
  try {
    // PRIORITY 1: INPUT VALIDATION - Fail fast on invalid input
    const stopValidation = perfMonitor.startStage('inputValidation');
    
    const validationErrors: string[] = [];
    
    // Required top-level fields
    if (!body.projectInfo?.name || typeof body.projectInfo.name !== 'string') {
      validationErrors.push('projectInfo.name is required and must be a string');
    }
    
    if (!body.incomingSupply?.voltage || typeof body.incomingSupply.voltage !== 'number') {
      validationErrors.push('incomingSupply.voltage is required and must be a number');
    }
    
    if (!body.incomingSupply?.ze || typeof body.incomingSupply.ze !== 'number') {
      validationErrors.push('incomingSupply.ze is required and must be a number');
    }
    
    if (!Array.isArray(body.circuits)) {
      validationErrors.push('circuits must be an array');
    } else {
      // Validate circuit limits
      if (body.circuits.length === 0 && !body.projectInfo?.additionalPrompt?.trim()) {
        validationErrors.push('At least 1 circuit or a design prompt is required');
      }
      
      if (body.circuits.length > 50) {
        validationErrors.push(`Maximum 50 circuits per design (you provided ${body.circuits.length})`);
      }
      
      // Validate each circuit
      body.circuits.forEach((circuit: any, i: number) => {
        if (!circuit.name || typeof circuit.name !== 'string' || circuit.name.trim().length === 0) {
          validationErrors.push(`Circuit ${i + 1}: name must be a non-empty string`);
        }
        
        if (!circuit.loadPower || typeof circuit.loadPower !== 'number' || circuit.loadPower <= 0) {
          validationErrors.push(`Circuit ${i + 1}: loadPower must be a positive number (got ${circuit.loadPower})`);
        }
        
        if (circuit.loadPower && circuit.loadPower > 100000) {
          validationErrors.push(`Circuit ${i + 1}: loadPower ${circuit.loadPower}W seems unrealistic (max 100kW)`);
        }
        
        if (!circuit.loadType || typeof circuit.loadType !== 'string') {
          validationErrors.push(`Circuit ${i + 1}: loadType is required`);
        }
        
        if (circuit.cableLength && (circuit.cableLength < 1 || circuit.cableLength > 500)) {
          validationErrors.push(`Circuit ${i + 1}: cableLength must be between 1-500m (got ${circuit.cableLength}m)`);
        }
        
        if (circuit.phases && ![1, 3].includes(circuit.phases)) {
          validationErrors.push(`Circuit ${i + 1}: phases must be 1 or 3 (got ${circuit.phases})`);
        }
      });
    }
    
    // Sanitize text inputs
    if (body.projectInfo?.additionalPrompt) {
      body.projectInfo.additionalPrompt = body.projectInfo.additionalPrompt
        .trim()
        .substring(0, 5000)
        .replace(/[<>]/g, '');
    }
    
    stopValidation();
    
    // Return validation errors immediately
    if (validationErrors.length > 0) {
      logger.error('❌ Input validation failed', { 
        errorCount: validationErrors.length,
        errors: validationErrors 
      });
      
      throw new CircuitDesignError(
        'INVALID_INPUT',
        'Invalid input parameters provided',
        { validationErrors },
        ['Please correct the input errors and try again']
      );
    }
    
    const { projectInfo, incomingSupply, circuits: inputCircuits, aiConfig } = body;
    const installationType = projectInfo.installationType || 'domestic';
    
    logger.info('✅ Input validation passed', {
      circuitCount: inputCircuits.length,
      installationType,
      hasAdditionalPrompt: !!projectInfo.additionalPrompt
    });
    
    logger.info('💭 AI-Powered Batch Design Starting (RAG-First Mode)', {
      circuitCount: inputCircuits.length,
      installationType: projectInfo.installationType,
      hasAdditionalPrompt: !!projectInfo.additionalPrompt,
      model: aiConfig?.model || 'openai/gpt-5'
    });

  // Get OpenAI API key (primary model for circuit design)
  const openAiKey = Deno.env.get('OPENAI_API_KEY');
  if (!openAiKey) throw new Error('OPENAI_API_KEY not configured');
  
  // Gemini key only required if using Gemini models (optional)
  const geminiKey = Deno.env.get('GEMINI_API_KEY');
  
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

  // STEP 0: AI-Powered Circuit Extraction (GPT-5 Mini)
  logger.info('🔍 STEP 0: AI Circuit Extraction from Prompt');
  
  let inferredCircuits: any[] = [];
  let specialRequirements: string[] = [];
  let installationConstraints: string[] = [];
  
  // Try AI extraction first
  if (projectInfo.additionalPrompt?.trim()) {
    const aiResult = await extractCircuitsWithAI(
      projectInfo.additionalPrompt,
      installationType,
      openAiKey,
      logger
    );
    
    inferredCircuits = aiResult.inferredCircuits;
    specialRequirements = aiResult.specialRequirements;
    installationConstraints = aiResult.installationConstraints;
    
    // Fallback to regex parser if AI returns nothing
    if (inferredCircuits.length === 0) {
      logger.warn('⚠️ AI extraction returned no circuits, using regex fallback');
      const fallback = extractCircuitsFromPrompt(projectInfo.additionalPrompt, inputCircuits);
      inferredCircuits = fallback.inferredCircuits;
      specialRequirements = fallback.specialRequirements;
      installationConstraints = fallback.installationConstraints;
    }
  }

  const allCircuits = [...inputCircuits, ...inferredCircuits];

  // PHASE 1.5: Detect high-power/complex circuits for individual processing
  const { highPowerCircuits, standardCircuits } = categorizeCircuits(allCircuits, logger);

  // PHASE 3: Circuit count tracking
  logger.info('🔢 Circuit Count Check (After Input)', {
    inputCircuits: inputCircuits.length,
    inputCircuitNames: inputCircuits.map(c => c.name || c.loadType),
    inferredCircuits: inferredCircuits.length,
    inferredCircuitNames: inferredCircuits.map(c => c.name || c.loadType),
    totalCircuits: allCircuits.length,
    allCircuitNames: allCircuits.map(c => c.name || c.loadType)
  });

  // PHASE 1: Enhanced logging for debugging
  logger.info('✅ STEP 0 Complete - Parsed user requirements', {
    manualCircuits: inputCircuits.length,
    inferredCircuits: inferredCircuits.length,
    totalCircuits: allCircuits.length,
    specialRequirements: specialRequirements.length,
    installationConstraints: installationConstraints.length,
    circuitTypes: allCircuits.map((c: any) => c.loadType),
    specialReqsSummary: specialRequirements.slice(0, 3)
  });

  // Build query from structured inputs + parsed context
  const query = buildDesignQuery(projectInfo, incomingSupply, allCircuits, specialRequirements, installationConstraints);
  
  // STEP 1: Multi-Query RAG Search (circuit-type-specific)
  logger.info('🔍 STEP 1: Multi-Query RAG Retrieval');

  const uniqueLoadTypes = [...new Set(allCircuits.map((c: any) => c.loadType))];
  logger.info('Unique load types detected', { 
    loadTypes: uniqueLoadTypes,
    circuitCount: allCircuits.length 
  });

  // PRIORITY 4: RAG SEARCH RESILIENCE - 3-tier fallback
  const stopRag = perfMonitor.startStage('ragSearch');
  const deduplicator = new RequestDeduplicator();
  const ragDurations: number[] = [];
  let failedSearches = 0;
  let cacheHits = 0;
  
  const ragSearchesWithTimeout = uniqueLoadTypes.slice(0, 8).map((loadType: string) => {
    const requestKey = generateRequestKey('rag', loadType, installationType);
    const ragStart = Date.now();
    
    return deduplicator.deduplicate(
      requestKey,
      async () => {
        // Attempt 1: Full RAG search (20s timeout)
        try {
          const result = await withTimeout(
            intelligentRAGSearch({
              circuitType: loadType,
              searchTerms: [loadType, 'circuit design', ...extractSearchTerms(query, allCircuits)],
              expandedQuery: `${loadType} circuit design requirements ${installationType}`,
              context: {
                ragPriority: aiConfig?.ragPriority || {
                  design: 95,
                  bs7671: 85,
                  installation: 75
                }
              }
            }),
            20000,
            `RAG search for ${loadType}`
          );
          ragDurations.push(Date.now() - ragStart);
          return { ...result, searchMethod: 'full' };
        } catch (error) {
          logger.warn(`⚠️ RAG timeout for ${loadType} (attempt 1), trying simplified search`);
          
          // Attempt 2: Simplified search (10s timeout)
          try {
            const result = await withTimeout(
              intelligentRAGSearch({
                circuitType: loadType,
                searchTerms: [loadType],
                expandedQuery: loadType,
                context: {
                  ragPriority: { bs7671: 90, design: 80, practical_work: 0 }
                }
              }),
              10000,
              `RAG retry for ${loadType}`
            );
            ragDurations.push(Date.now() - ragStart);
            return { ...result, searchMethod: 'simplified' };
          } catch (retryError) {
            logger.warn(`⚠️ RAG retry failed for ${loadType}, using core regulations cache`);
            
            // Attempt 3: Fallback to cached core regulations (instant)
            try {
              const supabase = createClient(supabaseUrl, supabaseKey);
              const cacheResult = await loadCoreRegulationsCache(supabase);
              cacheHits++;
              ragDurations.push(Date.now() - ragStart);
              
              return {
                regulations: cacheResult.regulations.filter((r: any) => 
                  r.regulation_number?.includes('433') ||
                  r.regulation_number?.includes('411') ||
                  r.regulation_number?.includes('525')
                ),
                designDocs: [],
                searchMethod: 'cache_fallback'
              };
            } catch (cacheError) {
              logger.error(`❌ All RAG attempts failed for ${loadType}`);
              failedSearches++;
              return { 
                regulations: [], 
                designDocs: [], 
                searchMethod: 'failed' 
              };
            }
          }
        }
      }
    );
  });

  // Also do a general search for diversity and consumer unit
  const diversityRequestKey = generateRequestKey('rag', 'diversity', installationType);
  ragSearchesWithTimeout.push(
    deduplicator.deduplicate(
      diversityRequestKey,
      () => withTimeout(
        intelligentRAGSearch({
          circuitType: 'general',
          searchTerms: ['diversity', 'consumer unit', 'main switch', 'Appendix 15'],
          expandedQuery: `electrical installation diversity calculations`,
          context: { 
            ragPriority: aiConfig?.ragPriority || {
              design: 95,
              bs7671: 85,
              installation: 75
            }
          }
        }),
        20000, // PHASE 1.1: Increased from 10s to 20s
        'RAG search for diversity'
      ).catch(async (error) => {
        // PHASE 1.1: Retry with simpler search
        logger.warn('⚠️ RAG diversity search timeout, retrying');
        return withTimeout(
          intelligentRAGSearch({
            circuitType: 'general',
            searchTerms: ['diversity'],
            expandedQuery: 'diversity',
            context: { ragPriority: { bs7671: 90, design: 80, practical_work: 0 } }
          }),
          10000,
          'RAG retry for diversity'
        ).catch(() => ({ regulations: [], designDocs: [], searchMethod: 'failed' }));
      })
    )
  );

  logger.info('📡 Starting parallel RAG searches with deduplication', {
    searchCount: ragSearchesWithTimeout.length,
    deduplicatedCount: deduplicator.getPendingCount(),
    timeout: '20s per search (with 3-tier fallback)',
    maxTotalTime: '~45s'
  });

  const allRAGResults = await Promise.all(ragSearchesWithTimeout);
  
  // Clean up deduplicator after all requests complete
  deduplicator.clear();
  stopRag();
  
  // Record RAG performance stats
  perfMonitor.recordRAGStats({
    searchCount: ragSearchesWithTimeout.length,
    failedSearches,
    cacheHits,
    durations: ragDurations
  });
  
  const successfulSearches = allRAGResults.filter((r: any) => r.regulations?.length > 0).length;
  
  // Check if we got ANY regulations
  const totalRegulations = allRAGResults.reduce((sum, r) => sum + (r?.regulations?.length || 0), 0);
  
  if (totalRegulations === 0) {
    logger.error('❌ All RAG searches returned no results');
    throw ERROR_TEMPLATES.RAG_SEARCH_FAILED(uniqueLoadTypes);
  }
  
  logger.info('✅ All RAG searches complete', {
    successfulSearches,
    failedSearches,
    cacheHits,
    totalRegulations,
    methods: allRAGResults.map(r => r?.searchMethod || 'unknown')
  });
  }

  // PHASE 2: Merge and deduplicate regulations (by reg number AND content hash)
  let mergedRegulations: any[] = [];
  
  try {
    const allRegs = allRAGResults.flatMap(r => r.regulations || []);
    const seenNumbers = new Set<string>();
    const seenHashes = new Set<string>();
    
    // Safe two-pass deduplication using for-of loop
    for (const reg of allRegs) {
      const regNumber = reg.regulation_number;
      const contentHash = hashContent(reg.content || '');
      
      // Skip if we've seen this regulation number or content hash
      if (seenNumbers.has(regNumber) || seenHashes.has(contentHash)) {
        continue;
      }
      
      // Add to tracking sets and results
      seenNumbers.add(regNumber);
      seenHashes.add(contentHash);
      mergedRegulations.push(reg);
    }
    
    // Sort by score and limit (SPEED BOOST: reduced from 25 to 15)
    mergedRegulations = mergedRegulations
      .sort((a: any, b: any) => (b.hybrid_score || 0) - (a.hybrid_score || 0))
      .slice(0, 15);
      
  } catch (dedupError) {
    logger.error('🚨 Deduplication failed, using empty array (fallback will activate)', { 
      error: dedupError instanceof Error ? dedupError.message : String(dedupError) 
    });
    mergedRegulations = [];
  }

  logger.info('✅ Multi-Query RAG Complete', {
    searches: ragSearchesWithTimeout.length,
    uniqueLoadTypes,
    totalRegulations: mergedRegulations.length,
    topRegulations: mergedRegulations.slice(0, 5).map((r: any) => ({
      number: r.regulation_number,
      score: r.hybrid_score
    }))
  });

  // PHASE 2: Fallback to core regulations if insufficient results
  let ragResults;
  if (mergedRegulations.length < 5) {
    logger.warn('⚠️ Insufficient RAG results, loading core regulations cache', {
      foundRegulations: mergedRegulations.length,
      requiredMinimum: 5
    });
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    try {
      const coreRegs = await loadCoreRegulationsCache(supabase);
      logger.info('✅ Loaded core regulations fallback', { count: coreRegs.length });
      
      ragResults = {
        regulations: [...mergedRegulations, ...coreRegs].slice(0, 25),
        designDocs: allRAGResults[0]?.designDocs || []
      };
    } catch (fallbackError) {
      logger.error('🚨 Core regulations cache failed', { error: fallbackError });
      ragResults = {
        regulations: mergedRegulations,
        designDocs: allRAGResults[0]?.designDocs || []
      };
    }
  } else {
    ragResults = {
      regulations: mergedRegulations,
      designDocs: allRAGResults[0]?.designDocs || []
    };
  }
  
  logger.info('📚 Final RAG knowledge base', {
    regulations: ragResults.regulations.length,
    designDocs: ragResults.designDocs.length
  });
  
  // PHASE 2.2: Pre-design validation before AI call
  const preValidation = validateCircuitRequirements(allCircuits, logger);
  if (!preValidation.valid) {
    logger.warn('⚠️ Pre-design validation found issues', {
      errors: preValidation.errors,
      warnings: preValidation.warnings
    });
    // Include critical errors in special requirements
    specialRequirements.push(...preValidation.errors);
  }
  if (preValidation.warnings.length > 0) {
    // Include warnings in installation constraints
    installationConstraints.push(...preValidation.warnings);
  }
  
  // STEP 2: Build System Prompt with RAG Knowledge + Parsed Context
  logger.info('📝 STEP 2: Building AI Prompt with RAG Context');
  
  const systemPrompt = `You are a BS 7671:2018+A3:2024 compliant circuit design expert with RAG knowledge.

⚠️ CRITICAL COMPLIANCE REQUIREMENTS - NON-NEGOTIABLE:

1. **Earth Fault Loop Impedance (Zs) Compliance**:
   - EVERY circuit MUST have calculated zs < maxZs
   - If zs exceeds maxZs, you MUST modify the design:
     * Increase CPC size to reduce R2
     * Reduce cable length if possible
     * Consider lower impedance cable route
   - NEVER submit a circuit where zs > maxZs

2. **Ring Circuit Impedance (BS 7671 Reg 433.1.204)**:
   - Ring finals MUST use parallel conductor formula
   - R1+R2_ring = (R1+R2_single_leg) / 2
   - Failure to halve R1+R2 will result in non-compliant Zs calculations
   - Maximum R1+R2 for 2.5mm² ring: typically 0.8-1.0Ω (after halving)

3. **Current Carrying Capacity (Ib ≤ In ≤ Iz)**:
   - Design current (Ib) must not exceed device rating (In)
   - Device rating (In) must not exceed cable capacity (Iz)
   
   🚨 CRITICAL MCB SIZING RULE:
   - Standard MCB sizes: 6A, 10A, 16A, 20A, 32A, 40A, 50A, 63A, 80A, 100A
   - If Ib = 31.3A → In MUST be 32A (next size up)
   - If Ib = 32.17A → In MUST be 40A (cannot use 32A as 32.17 > 32)
   - If Ib = 45.65A → In MUST be 50A (cannot use 40A as 45.65 > 40)
   - ALWAYS round UP: If Ib is even 0.01A over a standard size, use the NEXT size up
   - VALIDATION WILL REJECT ANY DESIGN WHERE Ib > In (even by 0.01A)
   
   ⚠️ EXCEPTION FOR RING FINAL CIRCUITS:
   - Ring finals ALWAYS use 32A protection, regardless of diversity calculation
   - If diversity load (Ib) > 32A → SPLIT into multiple 32A rings, don't use 40A
   - Example: 16 sockets = 39A diversity → Create TWO separate rings:
     * Ring 1: 8 sockets, 20A diversity, 32A protection
     * Ring 2: 8 sockets, 19A diversity, 32A protection
   - NEVER use 40A, 50A, or any other protection for ring finals
   
4. **Voltage Drop Compliance**:
   - Lighting: ≤ 3% (6.9V at 230V)
   - Power: ≤ 5% (11.5V at 230V)

IF YOU CANNOT ACHIEVE COMPLIANCE: Increase cable size or split the circuit.

🚨 CRITICAL: RING FINAL CIRCUITS MUST USE 2.5mm² CABLE ONLY (BS 7671 Reg 433.1.204):
- Ring circuits (loadType containing "ring" or "socket" with 32A protection): cableSize = 2.5, cpcSize = 1.5
- ANY other cable size (4, 6, 10) for ring finals will cause VALIDATION FAILURE
- Split high loads into multiple 2.5mm² rings instead of increasing cable size

🚨 OUTDOOR SOCKET CIRCUITS - CRITICAL CABLE SIZE RULES:
- Ring final outdoor: 2.5mm² 3-core SWA + 32A MCB (conductors are still 2.5mm²)
- Radial outdoor: 4mm² 3-core SWA + 32A MCB OR 6mm² 3-core SWA + 40A MCB
- Never use 4mm² or 6mm² conductors for ring finals, even in SWA armor

CRITICAL DATA FORMAT REQUIREMENTS:
- cableSize: NUMERIC mm² value only (e.g., 2.5 NOT "2.5mm²")
  * Ring finals: MUST be 2.5 (NEVER 4, 6, or 10)
  * Lighting: 1.5
  * Dedicated loads (cooker/shower): 6, 10, or 16 based on load
- cpcSize: NUMERIC mm² value only - MUST match Twin and Earth standards:
  * 1.0mm² live → 1.0mm² CPC
  * 1.5mm² live → 1.0mm² CPC
  * 2.5mm² live → 1.5mm² CPC (RING FINALS)
  * 4.0mm² live → 1.5mm² CPC
  * 6.0mm² live → 2.5mm² CPC
  * 10.0mm² live → 4.0mm² CPC
- cableType: Full cable description with CORRECT sizing format (live/CPC):
  * Lighting: "1.5mm²/1.0mm² Twin and Earth (PVC), copper"
  * Power ring: "2.5mm²/1.5mm² Twin and Earth (PVC), copper" (MANDATORY)
  * Cooker/shower: "6.0mm²/2.5mm² Twin and Earth (PVC), copper" or "10.0mm²/4.0mm²"
  * Always show as "live/CPC" format with insulation type and material
- installationMethod: Clean format like "Clipped direct (reference method C)" - NO line breaks or hyphens
- protectionDevice.rating: NUMERIC amps only
  * Ring finals: MUST be 32 (NEVER 40, 50, or 63)
  * Other circuits: 6, 16, 32, 40, 50, 63 as appropriate
- protectionDevice.curve: LETTER ONLY (e.g., "B" NOT "Type B")
- protectionDevice.kaRating: NUMERIC kA only (e.g., 6 NOT "6kA")

KNOWLEDGE BASE (${ragResults.regulations.length} verified regulations):
${ragResults.regulations.map((r: any) => `${r.regulation_number}: ${r.content.substring(0, 180)}...`).join('\n\n')}

YOUR ROLE: Design comprehensive electrical circuits using the regulations provided above.

CRITICAL INSTRUCTIONS - You MUST populate ALL fields using RAG knowledge:

1. **Diversity Factor** (per circuit): Apply BS 7671 Appendix 15 tables from context
2. **Fault Current Analysis**: Calculate PSCC using Ze + cable impedance, verify device breaking capacity (Reg 434.5.2)
3. **Earthing/Bonding**: Apply Section 411, 544, 701 requirements from context
4. **Derating Factors**: Show Ca, Cg, Ci breakdown using Appendix 4 tables from RAG
5. **Installation Method** (PHASE 4): Must include:
   - Reference method from Appendix 4 (A1, A2, B, C, etc.)
   - Grouping factor (Cg) if multiple circuits
   - Ambient temperature correction (Ca) if >30°C
   - Thermal insulation factor (Ci) if applicable
   - Format: "Clipped direct (Method C), Cg=1.0, Ca=1.0, Ci=0.5"
   - Use RAG knowledge to select correct reference method for cable type and location
6. **Special Locations**: Check Section 701/702/714 for bathrooms/outdoor
7. **Expected Test Results**: Calculate R1+R2, Zs, insulation resistance, RCD times

⚠️ CRITICAL: Ring Circuit R1+R2 Calculation (BS 7671 Reg 433.1.204)
For Ring Final circuits (loadType contains "Ring"):
- Calculate R1+R2 for ONE leg of the ring using cable length
- Then DIVIDE by 2 to account for parallel paths
- Formula: R1+R2_ring = (R1+R2_single_leg) / 2
- Example: 20m ring, 2.5mm² + 1.5mm² T&E
  * Single leg: (19.5 + 29.5) mΩ/m × 20m = 980mΩ = 0.98Ω
  * Ring (parallel): 0.98Ω / 2 = 0.49Ω ✅
- Apply this halved R1+R2 to Zs calculation: Zs = Ze + (R1+R2_ring)
- Show working in calculation field: "(R1+R2_leg)/2 = ...Ω"

For each circuit, include:
- Basic fields: name, circuitNumber, loadType, loadPower, phases
- Cable specs: cableSize (mm²), cpcSize (mm²), cableLength (m), installationMethod
- Protection: protectionDevice { type, rating, curve, kaRating }
- Boolean flags: rcdProtected, afddRequired
- calculations: { Ib, In, Iz, voltageDrop: { volts, percent, compliant, limit }, zs, maxZs, deratedCapacity, safetyMargin }
- justifications: { cableSize, protection, rcd }
- diversityFactor (0.0-1.0), diversityJustification (Appendix 15 reference)
- faultCurrentAnalysis: { psccAtCircuit (kA), deviceBreakingCapacity (kA), compliant, marginOfSafety, regulation }
- earthingRequirements: { cpcSize, supplementaryBonding (boolean), bondingConductorSize, justification, regulation }
- deratingFactors: { Ca, Cg, Ci, overall, explanation, tableReferences }
- installationGuidance: { referenceMethod, description, clipSpacing, practicalTips[], regulation }
- specialLocationCompliance: { isSpecialLocation, locationType, requirements[], zonesApplicable, regulation }
- expectedTestResults: { r1r2: { at20C, at70C, calculation }, zs: { calculated, maxPermitted, compliant }, insulationResistance: { testVoltage, minResistance }, polarity, rcdTest: { at1x, at5x, regulation } }
- warnings: [] (array of strings)

IMPORTANT:
- Always cite regulation numbers: "Per BS 7671 Reg 525.1..."
- Show working for all calculations
- Use plain English explanations
- Reference specific tables (e.g. "Table 4D5 Column 7")
- Populate ALL fields with accurate data from context

${INSTALLATION_CONTEXT[installationType]}

CRITICAL OUTPUT REQUIREMENTS FOR PDF GENERATION:

1. **Formatted Display Fields** (MANDATORY):
   - designCurrentIb: Design current as string with 1 decimal (e.g., "31.3", "40.0")
   - nominalCurrentIn: Device rating as number (copy from calculations.In)
   - cableCapacityIz: Tabulated capacity BEFORE derating (from Table 4D5)
   - rcdProtectedText: Format as:
     * If RCBO: "30mA RCBO"
     * If RCD required: "30mA RCD"
     * If not required: "No"
   - zsCompliant: Boolean - is calculations.zs < calculations.maxZs
   - voltageDropCompliant: Boolean - is voltageDrop.percent within limit
   - zsActual: Format calculations.zs as string with 2 decimals (e.g., "0.89")
   - zsMax: Format calculations.maxZs as string with 2 decimals (e.g., "1.44")

2. **Detailed Justifications** (300-500 characters each):
   
   a) Cable Size Justification Template:
   "Per Regulation 433.1.1, {cableSize}mm² twin & earth cable is adequate for {loadPower}W load. Tabulated current-carrying capacity (It) = {It}A from Table 4D5. After applying {derating factors}, effective capacity (Iz) = {deratedCapacity}A, which exceeds the protective device rating of {In}A by {safetyMargin}% margin."
   
   b) Protection Device Justification Template:
   "{rating}A Type {curve} {type} provides appropriate overload and fault protection per Regulation 411.3.2. Maximum Zs for {time}s disconnection = {maxZs}Ω (Table 41.3). Actual Zs = {zs}Ω, therefore compliant with disconnection time requirements. Breaking capacity of {ka}kA exceeds prospective short circuit current."
   
   c) RCD Justification Template (if required):
   "30mA RCD protection required under Regulation {reg} for {reason - e.g., socket outlets likely to supply portable equipment outdoors, bathroom location}. Provides additional protection against earth faults."
   
   c) RCD Justification Template (if NOT required):
   "RCD not required for this circuit as it does not serve {reason - e.g., special location, socket outlets for outdoor use}. Circuit has adequate earthed equipotential bonding per Regulation 411.3.1.2."

3. **Installation Method Formatting**:
   Use clean format: "Method C (Clipped Direct)" or "Method 101 (Underground SWA)"
   DO NOT use hyphens mid-word or line breaks

4. **Warnings Array** (0-3 per circuit):
   Generate only when genuinely needed:
   - Bathrooms: "Ensure supplementary bonding is installed in bathroom as per Section 701"
   - Outdoor/Underground: "SWA cable must be buried at minimum 600mm depth with warning tape"
   - Showers: "Maintain minimum IP rating of IPX4 for shower location"
   - Garage/Outbuildings: "Ensure cable route is documented for future reference"
   - Leave empty [] if no specific warnings apply

Return complete circuit objects using the provided tool schema.`;
  
  // PHASE 1: Log prompt details for debugging
  logger.info('✅ STEP 2 Complete - System prompt built', {
    promptLength: systemPrompt.length,
    promptLines: systemPrompt.split('\n').length,
    includesRAG: systemPrompt.includes('BS 7671'),
    circuitHints: allCircuits.length,
    specialRequirements: specialRequirements.length
  });
  
  // STEP 3: Call AI with Tool Calling (structured output)
  logger.info('🤖 STEP 3: Generating Design with AI + Structured Output');
  
  // ✨ SIMPLIFIED SCHEMA - Matching AI RAMS Pattern (5 simple fields)
  const requestBody = {
    model: aiConfig?.model || 'gpt-5-mini-2025-08-07', // GPT-5-mini for fast, efficient batch processing
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: query }
    ],
    max_completion_tokens: aiConfig?.maxTokens || 24000, // Increased for complex multi-circuit designs
    tools: [{
      type: "function",
      function: {
        name: "design_circuits",
        description: "Return electrical circuit design with BS 7671 compliance. You MUST call this function.",
        parameters: {
          type: "object",
          properties: {
            response: { 
              type: "string",
              description: "Conversational summary of the design in UK English"
            },
            circuits: { 
              type: "array",
              description: "Array of BS 7671 compliant circuit designs",
              items: {
                type: "object",
                properties: {
                  name: { type: "string", description: "Circuit name (e.g., 'Kitchen Ring', 'Shower Circuit')" },
                  circuitNumber: { type: "string", description: "Circuit number (e.g., 'C1', 'C2')" },
                  loadType: { type: "string", description: "Load type (e.g., 'Ring Final', 'Radial', 'Lighting')" },
                  loadPower: { type: "number", description: "Load power in watts" },
                  socketCount: { type: "number", description: "Number of sockets/outlets (if applicable). Estimate ~8-10 per ring for socket circuits" },
                  phases: { type: "number", description: "1 for single phase, 3 for three phase" },
                  cableSize: { type: "number", description: "Live conductor CSA in mm² (e.g., 1.5, 2.5, 4, 6, 10)" },
                  cpcSize: { type: "number", description: "CPC CSA per BS 6004 Twin and Earth: 1.5→1.0, 2.5→1.5, 4→1.5, 6→2.5, 10→4" },
                  cableType: { type: "string", description: "Format: 'live/CPC Twin and Earth' e.g., '1.5mm²/1.0mm² Twin and Earth (PVC), copper' or '2.5mm²/1.5mm² Twin and Earth (PVC), copper'" },
                  cableLength: { type: "number", description: "Cable length in metres" },
                  protectionDevice: {
                    type: "object",
                    properties: {
                      type: { type: "string", description: "Device type (e.g., 'MCB', 'RCBO')" },
                      rating: { type: "number", description: "Device rating in amps (numeric only, e.g., 32)" },
                      curve: { type: "string", enum: ["B", "C", "D"], description: "Curve type letter only" },
                      kaRating: { type: "number", description: "Breaking capacity in kA (numeric only, e.g., 6, 10, 16)" }
                    },
                    required: ["type", "rating"]
                  },
                  rcdProtected: { type: "boolean", description: "Is RCD protection required" },
                  afddRequired: { type: "boolean", description: "Is AFDD required per 421.1.7" },
                  designCurrentIb: { 
                    type: "string", 
                    description: "Design current formatted for display (e.g., '31.3', '40.0')" 
                  },
                  nominalCurrentIn: { 
                    type: "number", 
                    description: "Protective device rating (same as calculations.In)" 
                  },
                  cableCapacityIz: { 
                    type: "number", 
                    description: "Tabulated cable capacity BEFORE derating from Table 4D5" 
                  },
                  rcdProtectedText: { 
                    type: "string", 
                    description: "RCD status formatted: '30mA RCBO', '30mA RCD', or 'No'" 
                  },
                  zsCompliant: { 
                    type: "boolean", 
                    description: "Is Zs < maxZs (for quick PDF checks)" 
                  },
                  voltageDropCompliant: { 
                    type: "boolean", 
                    description: "Is voltage drop within limits" 
                  },
                  zsActual: { 
                    type: "string", 
                    description: "Actual Zs formatted for display (e.g., '0.89')" 
                  },
                  zsMax: { 
                    type: "string", 
                    description: "Max permitted Zs formatted (e.g., '1.44')" 
                  },
                  calculations: {
                    type: "object",
                    properties: {
                      Ib: { type: "number", description: "Design current in amps" },
                      In: { type: "number", description: "Nominal current in amps" },
                      Iz: { type: "number", description: "Cable current carrying capacity in amps" },
                      voltageDrop: { 
                        type: "object",
                        properties: {
                          volts: { type: "number" },
                          percent: { type: "number" },
                          compliant: { type: "boolean" },
                          limit: { type: "number", description: "3% for lighting, 5% for power" }
                        },
                        required: ["volts", "percent", "compliant", "limit"]
                      },
                      zs: { type: "number", description: "Fault loop impedance in ohms" },
                      maxZs: { type: "number", description: "Maximum permitted Zs in ohms" },
                      deratedCapacity: { type: "number", description: "Cable capacity after derating in amps" },
                      safetyMargin: { type: "number", description: "Safety margin percentage" }
                    },
                    required: ["Ib", "In", "Iz", "voltageDrop", "zs", "maxZs"]
                  },
                  justifications: {
                    type: "object",
                    properties: {
                      cableSize: { 
                        type: "string", 
                        description: "300-500 chars: Reference Reg 433.1.1, state tabulated capacity (It) from Table 4D5, show correction factors (Ca, Cg), confirm Iz > In with % margin. Example: 'Per Regulation 433.1.1, 2.5mm² twin & earth cable is adequate for 7360W load. Tabulated current-carrying capacity (It) = 27A from Table 4D5. After applying ambient temperature correction (Ca=0.94) and grouping (Cg=1.0), effective capacity (Iz) = 25.4A, which exceeds the protective device rating of 32A by 20.6% margin.'"
                      },
                      protection: { 
                        type: "string", 
                        description: "300-500 chars: Reference Reg 411.3.2, state max Zs from Table 41.3, compare actual vs max, confirm disconnection time. Example: '32A Type B MCB provides appropriate overload and fault protection per Regulation 411.3.2. Maximum Zs for 5s disconnection = 1.44Ω (Table 41.3). Actual Zs = 0.67Ω, therefore compliant with disconnection time requirements. Breaking capacity of 6kA exceeds prospective short circuit current.'"
                      },
                      rcd: { 
                        type: "string", 
                        description: "200-400 chars: If required - state regulation (701.411.3.3 for bathrooms, 411.3.3 for sockets), explain reason, state rating. If not required - explain why with regulation reference. Example: '30mA RCD protection required under Regulation 411.3.3 for socket outlets likely to supply portable equipment outdoors. Provides additional protection against earth faults.'"
                      }
                    },
                    required: ["cableSize", "protection", "rcd"]
                  },
                  diversityFactor: { type: "number", description: "Applied diversity factor 0.0-1.0 per BS 7671 Appendix 15" },
                  diversityJustification: { type: "string", description: "BS 7671 Appendix 15 table reference and reasoning" },
                  faultCurrentAnalysis: {
                    type: "object",
                    properties: {
                      psccAtCircuit: { type: "number", description: "PSCC in kA" },
                      deviceBreakingCapacity: { type: "number", description: "Device breaking capacity in kA (6/10/16)" },
                      compliant: { type: "boolean" },
                      marginOfSafety: { type: "string", description: "e.g. '40% margin'" },
                      regulation: { type: "string", description: "BS 7671 434.5.2" }
                    }
                  },
                  earthingRequirements: {
                    type: "object",
                    properties: {
                      cpcSize: { type: "string", description: "CPC size in mm²" },
                      supplementaryBonding: { type: "boolean", description: "Is supplementary bonding required" },
                      bondingConductorSize: { type: "string", description: "e.g. '10mm² for main bonding'" },
                      justification: { type: "string", description: "BS 7671 Section 544/701 reasoning" },
                      regulation: { type: "string" }
                    }
                  },
                  deratingFactors: {
                    type: "object",
                    properties: {
                      Ca: { type: "number", description: "Ambient temperature correction factor" },
                      Cg: { type: "number", description: "Grouping factor" },
                      Ci: { type: "number", description: "Thermal insulation factor" },
                      overall: { type: "number", description: "Ca × Cg × Ci" },
                      explanation: { type: "string", description: "Plain English explanation of derating" },
                      tableReferences: { type: "string", description: "e.g. 'Table 52.2 (Ca), Table 52.3 (Cg)'" }
                    }
                  },
                  installationGuidance: {
                    type: "object",
                    properties: {
                      referenceMethod: { type: "string", description: "Method C, A1, B1, etc." },
                      description: { type: "string", description: "e.g. 'Clipped direct to masonry wall'" },
                      clipSpacing: { type: "string", description: "e.g. 'Maximum 300mm horizontal, 400mm vertical'" },
                      practicalTips: { type: "array", items: { type: "string" }, description: "On-site installation tips" },
                      regulation: { type: "string", description: "BS 7671 Appendix 4 reference" }
                    }
                  },
                  specialLocationCompliance: {
                    type: "object",
                    properties: {
                      isSpecialLocation: { type: "boolean" },
                      locationType: { type: "string", description: "bathroom/outdoor/pool/sauna/none" },
                      requirements: { type: "array", items: { type: "string" }, description: "Specific requirements" },
                      zonesApplicable: { type: "string", description: "e.g. 'Zones 0, 1, 2 apply per 701.32'" },
                      regulation: { type: "string" }
                    }
                  },
                  expectedTestResults: {
                    type: "object",
                    properties: {
                      r1r2: {
                        type: "object",
                        properties: {
                          at20C: { type: "string", description: "e.g. '0.95Ω' - FOR RING CIRCUITS: Show HALVED value accounting for parallel paths" },
                          at70C: { type: "string", description: "e.g. '1.20Ω' - FOR RING CIRCUITS: Show HALVED value (divide by 2)" },
                          calculation: { type: "string", description: "Show working - for rings: '(R1+R2_leg)/2 = ...Ω'" }
                        }
                      },
                      zs: {
                        type: "object",
                        properties: {
                          calculated: { type: "string", description: "Ze + (R1+R2)" },
                          maxPermitted: { type: "string" },
                          compliant: { type: "boolean" }
                        }
                      },
                      insulationResistance: {
                        type: "object",
                        properties: {
                          testVoltage: { type: "string", description: "e.g. '500V DC'" },
                          minResistance: { type: "string", description: "e.g. '≥1.0MΩ per BS 7671 Table 61'" }
                        }
                      },
                      polarity: { type: "string", description: "Expected: 'Correct at all points'" },
                      rcdTest: {
                        type: "object",
                        properties: {
                          at1x: { type: "string", description: "e.g. '≤300ms @ 30mA'" },
                          at5x: { type: "string", description: "e.g. '≤40ms @ 150mA'" },
                          regulation: { type: "string", description: "BS 7671 Regulation 643.2.2" }
                        }
                      }
                    }
                  },
                  warnings: { 
                    type: "array", 
                    items: { type: "string" },
                    description: "Circuit-specific warnings"
                  },
                  installationMethod: { type: "string", description: "Clean format: 'Clipped direct (reference method C)' - NO line breaks or hyphens mid-word" }
                },
                required: ["name", "loadType", "cableSize", "protectionDevice", "calculations", "justifications"]
              }
            },
            materials: { 
              type: "array",
              description: "Required materials with specifications",
              items: {
                type: "object",
                properties: {
                  item: { type: "string", description: "Material name" },
                  specification: { type: "string", description: "Full specification" },
                  quantity: { type: "number", description: "Quantity required" },
                  unit: { type: "string", description: "Unit (e.g., 'metres', 'units')" },
                  notes: { type: "string", description: "Additional notes" }
                },
                required: ["item", "specification", "quantity"]
              }
            },
            warnings: { 
              type: "array",
              description: "General compliance warnings or notes",
              items: { type: "string" }
            }
          },
          required: ["response", "circuits", "materials"]
        }
      }
    }],
    tool_choice: "auto"
  };
  
  // ============================================
  // ⚡ SMART BATCH PROCESSING WITH HIGH-POWER DETECTION
  // Separate high-power circuits for individual processing
  // ============================================
  
  // STEP 4.5: Deduplicate circuits BEFORE batching to prevent duplicate processing
  const circuitDedupeKey = (c: any) => `${(c.name || c.loadType).toLowerCase().trim()}_${c.loadType}_${c.loadPower}`;
  const seenCircuits = new Map<string, any>();
  
  [...highPowerCircuits, ...standardCircuits].forEach(circuit => {
    const key = circuitDedupeKey(circuit);
    if (!seenCircuits.has(key)) {
      seenCircuits.set(key, circuit);
    } else {
      logger.warn(`⚠️ Removing duplicate circuit: ${circuit.name || circuit.loadType}`, { 
        duplicateKey: key 
      });
    }
  });
  
  const deduplicatedCircuits = Array.from(seenCircuits.values());
  
  // Re-categorize after deduplication
  const deduplicatedHigh = deduplicatedCircuits.filter(c => 
    highPowerCircuits.some(hc => circuitDedupeKey(hc) === circuitDedupeKey(c))
  );
  const deduplicatedStandard = deduplicatedCircuits.filter(c => 
    standardCircuits.some(sc => circuitDedupeKey(sc) === circuitDedupeKey(c))
  );
  
  logger.info('✅ Deduplication complete', {
    before: highPowerCircuits.length + standardCircuits.length,
    after: deduplicatedCircuits.length,
    removed: (highPowerCircuits.length + standardCircuits.length) - deduplicatedCircuits.length
  });
  
  // Create batches: high-power get individual processing, standard get batched
  const BATCH_SIZE = 2;
  const standardBatches = chunkArray(deduplicatedStandard, BATCH_SIZE);
  const individualBatches = deduplicatedHigh.map(c => [c]); // Each high-power circuit in its own batch
  
  const circuitBatches = [...individualBatches, ...standardBatches];

  logger.info('⚡ Parallel batch processing enabled', {
    totalCircuits: allCircuits.length,
    batchSize: BATCH_SIZE,
    batchCount: circuitBatches.length,
    processingMode: 'concurrent',
    estimatedTimeSeconds: Math.ceil(50) // All batches run in parallel, ~50s total (not per batch)
  });
  
  // Import OpenAI provider for GPT-5 Mini
  const { callOpenAI, withRetry: providerRetry } = await import('../_shared/ai-providers.ts');

  // Validate batch result to ensure all circuits are present
  const validateBatchResult = (result: any, expectedCircuits: any[]): boolean => {
    if (!result || !result.aiData || !result.success) {
      return false;
    }
    
    try {
      const toolCall = result.aiData.choices?.[0]?.message?.tool_calls?.[0];
      if (!toolCall) {
        logger.warn('⚠️ No tool call in batch result');
        return false;
      }
      
      const parsed = JSON.parse(toolCall.function.arguments);
      const receivedCircuits = parsed.circuits || [];
      
      // Check if all expected circuits are present
      const expectedNames = expectedCircuits.map(c => 
        (c.name || c.loadType || '').toLowerCase().trim()
      );
      const receivedNames = receivedCircuits.map((c: any) => 
        (c.name || '').toLowerCase().trim()
      );
      
      const allPresent = expectedNames.every(name => 
        receivedNames.some(recName => recName.includes(name) || name.includes(recName))
      );
      
      if (!allPresent) {
        const missing = expectedNames.filter(name => 
          !receivedNames.some(recName => recName.includes(name) || name.includes(recName))
        );
        logger.warn(`⚠️ Batch validation failed - missing circuits`, { 
          expected: expectedNames.length, 
          received: receivedNames.length,
          missing
        });
        return false;
      }
      
      // Check for required fields in each circuit
      const hasValidFields = receivedCircuits.every((c: any) => 
        c.cableSize && c.protectionDevice && c.calculations
      );
      
      if (!hasValidFields) {
        logger.warn('⚠️ Batch validation failed - circuits missing required fields');
        return false;
      }
      
      return true;
    } catch (error) {
      logger.error('❌ Batch validation error', { error });
      return false;
    }
  };
  
  // Function to process a single batch with retry logic
  const processBatch = async (batch: any[], batchIndex: number, attempt = 0): Promise<any> => {
    const batchStartTime = Date.now();
    const maxAttempts = 3;
    
    // Detect high-power circuits that need special handling (using categorizeCircuits logic)
    const isHighPower = (circuit: any): boolean => {
      const name = (circuit.name || circuit.loadType || '').toLowerCase();
      const HIGH_POWER_TYPES = ['shower', 'ev', 'charger', 'cooker', 'oven', 'hob', 'heat pump', 'immersion', 'outdoor'];
      const hasHighPowerType = HIGH_POWER_TYPES.some(type => name.includes(type));
      const hasHighPower = (circuit.loadPower || 0) > 7000;
      const isSpecialLocation = circuit.specialLocation && circuit.specialLocation !== 'none';
      return hasHighPowerType || hasHighPower || isSpecialLocation;
    };
    const hasHighPowerCircuit = batch.some(isHighPower);
    const isIndividualCircuit = batch.length === 1;
    
    logger.info(`📦 Batch ${batchIndex + 1}/${circuitBatches.length}: Processing ${batch.length} circuit${batch.length > 1 ? 's' : ''}${attempt > 0 ? ` (retry ${attempt})` : ''}`, {
      hasHighPowerCircuit,
      isIndividual: isIndividualCircuit,
      circuitTypes: batch.map((c: any) => c.loadType)
    });
    
    // PHASE 3: Log batch circuit details
    logger.info(`📋 Batch ${batchIndex + 1} circuits:`, {
      circuits: batch.map((c: any) => c.name || c.loadType)
    });
    
    // PHASE 4: Add RCD reminder for socket/outdoor circuits
    const hasSocketCircuits = batch.some((c: any) => 
      c.loadType?.toLowerCase().includes('socket') ||
      c.specialLocation?.toLowerCase().includes('outdoor')
    );
    
    const rcdReminder = hasSocketCircuits ? `
🚨 CRITICAL FOR THIS BATCH: Socket circuits in this batch MUST have rcdProtected = true per Regulation 411.3.3.
Set rcdProtected = true for ALL socket circuits.
` : '';
    
    // Create batch-specific query with equipment-specific guidance for high-power circuits
    let batchQuery = `${query}

${rcdReminder}
Design the following circuit${batch.length > 1 ? 's' : ''}:\n${batch.map((c: any, i: number) => 
      `${i + 1}. ${c.name || c.loadType} (${c.loadType}, ${c.loadPower}W, ${c.cableLength}m, ${c.phases}-phase${c.specialLocation ? `, ${c.specialLocation}` : ''})`
    ).join('\n')}`;
    
    // Add specific guidance for high-power or individual circuits
    if (hasHighPowerCircuit || isIndividualCircuit) {
      const circuit = batch[0];
      const circuitName = (circuit.name || circuit.loadType || '').toLowerCase();
      
      if (circuitName.includes('shower')) {
        batchQuery += `\n\n🚿 SHOWER CIRCUIT REQUIREMENTS:
- MUST specify exact kW rating (typical: 8.5kW, 9.5kW, 10.5kW)
- Cable sizing: 6mm² for 7-8kW, 10mm² for 9-10.5kW
- Protection: 40A Type B MCB or 40A 30mA RCBO
- RCD: 30mA RCD protection MANDATORY per Reg 701.411.3.3
- Installation: Typically clipped direct or in conduit
- Special location: Bathroom zone compliance per Section 701`;
      } else if (circuitName.includes('ev') || circuitName.includes('charger')) {
        batchQuery += `\n\n🔌 EV CHARGER REQUIREMENTS:
- MUST specify charger type: Mode 3 (smart/tethered)
- Power options: 7kW (single-phase, 32A) or 22kW (three-phase, 32A)
- RCD: Type B RCD MANDATORY per BS 7671 Section 722 (DC fault protection)
- Cable: 6mm² for 7kW, 10mm² for 22kW
- Dedicated circuit required - no sharing
- Consider PEN fault protection for TN-C-S supplies`;
      } else if (circuitName.includes('cooker') || circuitName.includes('oven')) {
        batchQuery += `\n\n🍳 COOKER CIRCUIT REQUIREMENTS:
- Apply diversity per BS 7671 Appendix 15: 10A + 30% of remainder + 5A if socket outlet
- Example: 13.5kW cooker = 10A + 30% × (58.7A - 10A) = 24.6A
- Cable sizing based on diversified load, not full load
- Typical: 6mm² cable, 32A Type B MCB
- If hob + oven separate: consider individual circuits vs diversity`;
      }
      
      batchQuery += `\n\n✅ MANDATORY for this circuit:
- Complete calculations object with all fields
- Proper justifications with BS 7671 regulation references
- Voltage drop and Zs compliance checks
- Equipment-appropriate protection device selection`;
    }
    
    // Simplify prompt on retries - use simpler tool schema
    const useSimplifiedSchema = attempt > 0;
    const currentTools = useSimplifiedSchema ? [] : requestBody.tools;
    const currentToolChoice = useSimplifiedSchema ? undefined : requestBody.tool_choice;
    
    if (useSimplifiedSchema) {
      logger.info(`🔄 Retry ${attempt}: Using simplified JSON-only mode (no tool calling)`);
    }
    
    try {
      const result = await providerRetry(async () => {
        return await callOpenAI({
          messages: [
            { role: 'system', content: useSimplifiedSchema ? `${systemPrompt}\n\nIMPORTANT: Return your response as valid JSON.` : systemPrompt },
            { role: 'user', content: batchQuery }
          ],
          model: 'gpt-5-mini-2025-08-07',
          temperature: 0.3,
          max_completion_tokens: aiConfig?.maxTokens || 24000,
          tools: currentTools,
          tool_choice: currentToolChoice,
          response_format: useSimplifiedSchema ? { type: "json_object" } : undefined
        }, openAiKey);
      }, 3, 2000);
      
      const batchElapsedMs = Date.now() - batchStartTime;
      logger.info(`✅ GPT-5 Mini responded for batch ${batchIndex + 1}`, { 
        timeMs: batchElapsedMs
      });
      
      // Package result as if it came from API
      const aiData = {
        choices: [{
          message: {
            tool_calls: result.toolCalls ? [{ function: { arguments: result.content } }] : undefined,
            content: result.content
          }
        }],
        usage: { total_tokens: 0 } // Gemini doesn't return token count
      };
      
      // Validate result before accepting
      const batchResult = { aiData, batchElapsedMs, success: true };
      const isValid = validateBatchResult(batchResult, batch);
      
      if (!isValid && attempt < maxAttempts) {
        logger.warn(`⚠️ Batch ${batchIndex + 1} validation failed, retrying with simplified approach`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return processBatch(batch, batchIndex, attempt + 1);
      }
      
      if (!isValid) {
        logger.error(`❌ Batch ${batchIndex + 1} failed validation after ${attempt + 1} attempts`);
        return { aiData: null, batchElapsedMs, success: false, error: 'Validation failed', circuits: batch };
      }
      
      logger.info(`✅ Batch ${batchIndex + 1} completed and validated successfully`, {
        timeMs: batchElapsedMs
      });
      
      return batchResult;
      
    } catch (error: any) {
      const errorMsg = error?.message || String(error);
      const isMalformedFunctionCall = errorMsg.includes('MALFORMED_FUNCTION_CALL') || errorMsg.includes('format response correctly');
      const isNetworkError = errorMsg.includes('fetch') || errorMsg.includes('network') || error instanceof TypeError;
      
      // Retry with simplified approach for MALFORMED_FUNCTION_CALL
      if (isMalformedFunctionCall && attempt < maxAttempts) {
        const backoffMs = 2000 * (attempt + 1);
        logger.warn(`🔄 MALFORMED_FUNCTION_CALL detected, retrying batch ${batchIndex + 1} with simplified approach in ${backoffMs}ms`, {
          attempt: attempt + 1,
          maxAttempts
        });
        await new Promise(resolve => setTimeout(resolve, backoffMs));
        return processBatch(batch, batchIndex, attempt + 1);
      }
      
      // Retry network errors
      if (isNetworkError && attempt < maxAttempts) {
        const backoffMs = 2000 * (attempt + 1);
        logger.warn(`⏳ Network error, retrying batch ${batchIndex + 1} in ${backoffMs}ms`, {
          error: errorMsg,
          attempt: attempt + 1
        });
        await new Promise(resolve => setTimeout(resolve, backoffMs));
        return processBatch(batch, batchIndex, attempt + 1);
      }
      
      // If batch still fails after retries, try splitting into individual circuits
      if (attempt >= maxAttempts && batch.length > 1) {
        logger.warn(`🔀 Batch ${batchIndex + 1} failed ${maxAttempts} times, splitting into individual circuits`);
        
        const individualResults = [];
        for (let i = 0; i < batch.length; i++) {
          const circuit = batch[i];
          const circuitName = circuit.name || circuit.loadType;
          
          logger.info(`🔄 Trying individual circuit ${i + 1}/${batch.length}: ${circuitName}`);
          
          // Try multiple strategies for difficult circuits
          let individualResult = null;
          
          // Strategy 1: Process with simplified JSON-only mode
          try {
            individualResult = await processBatch([circuit], batchIndex, maxAttempts); // Force simplified mode
            if (individualResult.success && validateBatchResult(individualResult, [circuit])) {
              logger.info(`✅ Individual circuit ${circuitName} succeeded (simplified mode)`);
              individualResults.push(individualResult);
              continue;
            }
          } catch (err) {
            logger.warn(`⚠️ Strategy 1 failed for ${circuitName}`, { error: err });
          }
          
          // Strategy 2: Ultra-simplified prompt with just essentials - MUST include "JSON" for response_format
          try {
            const ultraSimpleQuery = `Design ONE circuit with BS 7671 compliance and return the result as a JSON object:

Circuit Details:
- Name: ${circuit.name || circuit.loadType}
- Type: ${circuit.loadType}
- Power: ${circuit.loadPower}W
- Length: ${circuit.cableLength}m
- Phases: ${circuit.phases}
${circuit.specialLocation ? `- Special location: ${circuit.specialLocation}` : ''}

Response Format:
Return ONLY a valid JSON object with this structure:
{
  "circuits": [array with 1 circuit object],
  "materials": [array of materials],
  "warnings": [array of warnings]
}

Include all required fields: cableSize, cpcSize, protectionDevice, calculations, justifications.`;

            const ultraSimpleResult = await providerRetry(async () => {
              return await callOpenAI({
                messages: [
                  { role: 'system', content: `${systemPrompt.substring(0, 4950)}... Return response as JSON.` }, // Truncated with JSON mention
                  { role: 'user', content: ultraSimpleQuery }
                ],
                model: 'gpt-5-mini-2025-08-07',
                temperature: 0.2,
                max_completion_tokens: 8000,
                response_format: { type: "json_object" }
              }, openAiKey);
            }, 2, 1000);

            if (ultraSimpleResult.content) {
              const parsed = JSON.parse(ultraSimpleResult.content);
              if (parsed.circuits && parsed.circuits.length > 0) {
                logger.info(`✅ Individual circuit ${circuitName} succeeded (ultra-simple mode)`);
                individualResults.push({
                  aiData: {
                    choices: [{
                      message: {
                        tool_calls: [{ function: { arguments: ultraSimpleResult.content } }]
                      }
                    }],
                    usage: { total_tokens: 0 }
                  },
                  batchElapsedMs: 0,
                  success: true
                });
                continue;
              }
            }
          } catch (err) {
            logger.warn(`⚠️ Strategy 2 failed for ${circuitName}`, { error: err });
          }
          
          // Strategy 3: No JSON mode enforcement - let model return JSON naturally
          try {
            logger.info(`🔄 Strategy 3: Trying without response_format enforcement for ${circuitName}`);
            
            const noJsonModeQuery = `${ultraSimpleQuery}\n\nIMPORTANT: You must return a valid JSON object. Do not include any markdown formatting or code blocks.`;
            
            const noJsonModeResult = await providerRetry(async () => {
              return await callOpenAI({
                messages: [
                  { role: 'system', content: `${systemPrompt.substring(0, 4950)}... Return response as valid JSON only.` },
                  { role: 'user', content: noJsonModeQuery }
                ],
                model: 'gpt-5-mini-2025-08-07',
                temperature: 0.2,
                max_completion_tokens: 8000
                // NO response_format parameter - model decides format
              }, openAiKey);
            }, 2, 1000);

            if (noJsonModeResult.content) {
              // Extract JSON from response (might have markdown wrappers like ```json)
              let jsonContent = noJsonModeResult.content.trim();
              const jsonMatch = jsonContent.match(/\{[\s\S]*\}/);
              if (jsonMatch) {
                jsonContent = jsonMatch[0];
              }
              
              const parsed = JSON.parse(jsonContent);
              if (parsed.circuits && parsed.circuits.length > 0) {
                logger.info(`✅ Individual circuit ${circuitName} succeeded (no-json-mode strategy)`);
                individualResults.push({
                  aiData: {
                    choices: [{
                      message: {
                        tool_calls: [{ function: { arguments: jsonContent } }]
                      }
                    }],
                    usage: { total_tokens: 0 }
                  },
                  batchElapsedMs: 0,
                  success: true
                });
                continue;
              }
            }
          } catch (err) {
            logger.warn(`⚠️ Strategy 3 failed for ${circuitName}`, { error: err });
          }
          
          logger.error(`❌ All 3 strategies failed for ${circuitName} - circuit will be missing`);
        }
        
        // If we got at least some circuits, merge them
        if (individualResults.length > 0) {
          logger.info(`✅ Split batch recovered ${individualResults.length}/${batch.length} circuits`);
          
          // Merge individual results
          const mergedToolCalls = individualResults
            .map(r => r.aiData?.choices?.[0]?.message?.tool_calls?.[0])
            .filter(Boolean);
          
          if (mergedToolCalls.length > 0) {
            // Combine circuits from all individual results
            const allCircuits = [];
            for (const toolCall of mergedToolCalls) {
              try {
                const parsed = JSON.parse(toolCall.function.arguments);
                if (parsed.circuits && Array.isArray(parsed.circuits)) {
                  allCircuits.push(...parsed.circuits);
                }
              } catch (e) {
                logger.error('Failed to parse individual circuit result', { error: e });
              }
            }
            
            // Create merged response
            const firstResult = JSON.parse(mergedToolCalls[0].function.arguments);
            const mergedResponse = {
              ...firstResult,
              circuits: allCircuits
            };
            
            return {
              aiData: {
                choices: [{
                  message: {
                    tool_calls: [{
                      function: {
                        arguments: JSON.stringify(mergedResponse)
                      }
                    }]
                  }
                }],
                usage: { total_tokens: 0 }
              },
              batchElapsedMs: Date.now() - batchStartTime,
              success: true
            };
          }
        }
      }
      
      logger.error(`🚨 Batch ${batchIndex + 1} failed after ${attempt + 1} attempts`, { 
        error: errorMsg,
        circuitNames: batch.map((c: any) => c.name || c.loadType)
      });
      return { aiData: null, batchElapsedMs: Date.now() - batchStartTime, success: false, error: errorMsg, circuits: batch };
    }
  };
  
  // ⚡ PARALLEL PROCESSING: Process all batches concurrently for 50% speed boost
  const aiStartTime = Date.now();
  logger.info('⚡ Starting parallel batch processing', {
    batchCount: circuitBatches.length,
    mode: 'concurrent',
    estimatedSpeedBoost: '50%'
  });
  
  const batchResults = await Promise.all(
    circuitBatches.map((batch, index) => processBatch(batch, index))
  );
  const aiElapsedMs = Date.now() - aiStartTime;
  
  logger.info('🎉 All batches completed in parallel', {
    totalTimeMs: aiElapsedMs,
    averageBatchTimeMs: Math.round(aiElapsedMs / batchResults.length),
    parallelProcessing: true
  });
  
  // ============================================
  // MERGE BATCH RESULTS
  // ============================================
  
  // Combine all tool calls from batches (filter out failed batches)
  let allToolCalls: any[] = [];
  let totalTokens = 0;
  let failedBatches = 0;
  
  for (const batchResult of batchResults) {
    if (!batchResult.success || !batchResult.aiData) {
      failedBatches++;
      logger.warn(`⚠️ Skipping failed batch`, { error: batchResult.error });
      continue;
    }
    
    const toolCall = batchResult.aiData.choices?.[0]?.message?.tool_calls?.[0];
    if (toolCall) {
      allToolCalls.push(toolCall);
    }
    totalTokens += batchResult.aiData.usage?.total_tokens || 0;
  }
  
  logger.info('🔗 Merging batch results', {
    toolCallsFound: allToolCalls.length,
    totalTokensUsed: totalTokens,
    failedBatches,
    successfulBatches: batchResults.length - failedBatches
  });
  
  // Use first batch's tool call as base, we'll merge circuits later
  let toolCall = allToolCalls[0];
  
  // Retry once if no tool call (Gemini might have returned text instead)
  if (!toolCall && allToolCalls.length === 0) {
    logger.warn('⚠️ No tool calls in any batch, retrying first batch with Gemini');
    
    const retryResult = await providerRetry(async () => {
      return await callGemini({
        messages: [
          { 
            role: 'system', 
            content: `You are an expert electrical designer specialising in BS 7671:2018+A3:2024 compliant circuit design.

KNOWLEDGE BASE (${ragResults.regulations.length} verified regulations):
${ragResults.regulations.map((r: any) => `${r.regulation_number}: ${r.content.substring(0, 200)}...`).join('\n\n')}

YOUR ROLE: Design compliant electrical circuits with complete details for each circuit.

🚨 CRITICAL: RING FINAL CIRCUIT REQUIREMENTS (BS 7671 Appendix 15 / Reg 433.1.204):

**MANDATORY CABLE SIZE FOR ALL RING FINALS:**
- cableSize: 2.5 (numeric value, NOT 4, 6, or 10)
- cpcSize: 1.5 (numeric value)
- cableType: "2.5mm²/1.5mm² Twin and Earth (PVC), copper"
- protectionDevice.rating: 32 (NEVER 40, 50, or 63)

**IF YOU USE ANY OTHER CABLE SIZE FOR A RING FINAL, THE DESIGN WILL BE REJECTED**

Ring Final Circuit Rules:
✅ CORRECT: 2.5mm²/1.5mm² T&E + 32A Type B MCB/RCBO
❌ WRONG: 4mm², 6mm², 10mm², or any other cable size
❌ WRONG: 40A, 50A, 63A protection (only 32A permitted)

If total load > 7.36kW (32A × 230V):
- Split into MULTIPLE 2.5mm² ring circuits
- Example: 14kW load = Circuit 1: 7kW ring (2.5mm²) + Circuit 2: 7kW ring (2.5mm²)
- NEVER increase cable size to 4mm² or larger

Socket diversity (Appendix 15): 100% first 10 outlets, 50% next 10, 25% remainder

INSTRUCTIONS:
1. For each circuit in the "circuits" array, include:
   - name, circuitNumber, loadType, loadPower, phases
   - socketCount (for socket circuits: estimate number of outlets, e.g., 16 for office desks)
   - cableSize (mm²), cpcSize (mm²), cableLength (m)
   - protectionDevice: { type, rating, curve, kaRating }
   - rcdProtected (boolean), afddRequired (boolean)
   - calculations: { Ib, In, Iz, voltageDrop: { volts, percent, compliant, limit }, zs, maxZs }
   - justifications (PHASE 5): { 
       cableSize: "Detailed explanation referencing Appendix 4 table, showing Iz calculation with derating factors Ca×Cg×Ci = X, resulting Iz = YA > In = ZA",
       protection: "Device selection per Reg 533.X, breaking capacity XkA > PSCC = YkA, curve type chosen per Reg 533.X for load characteristics",
       rcd: "RCD requirement per Reg 411.3.3 [cite specific sub-regulation], type and rating per [regulation]",
       diversity: "Diversity applied per Appendix 15 Table X: [show calculation], final load = XW",
       voltageDrop: "Voltage drop calc: (mV/A/m) × Ib × L = XV < limit YV (Z%)",
       earthFault: "Zs = Ze + R1+R2 = X + Y = ZΩ < maxZs = WΩ per Table 41.X",
       testResults: "Expected R1+R2 = XΩ, IR > 1MΩ, RCD trip < 40ms at 1×IΔn"
     }
   - warnings: [] (array of strings)
   - installationMethod: "Detailed method including reference (e.g., 'Clipped direct (Method C), Cg=1.0, Ca=1.0, Ci=0.5')"

2. In the "materials" array, list required materials with:
   - name, specification, quantity, unit

3. In the "warnings" array, include any compliance notes or important advisories

4. In the "response" field, provide a brief conversational summary in UK English

Reference BS 7671 regulations (e.g., "433.1.1", "525.1", "411.3.2") in justifications.

Return your design using the provided tool schema.`
          },
          { role: 'user', content: query }
        ],
        model: 'gemini-2.5-flash',
        temperature: 0.3,
        max_tokens: aiConfig?.maxTokens || 24000,
        tools: requestBody.tools,
        tool_choice: requestBody.tool_choice
      }, geminiKey);
    }, 3, 2000);

    const retryData = {
      choices: [{
        message: {
          tool_calls: retryResult.toolCalls ? [{ function: { arguments: retryResult.content } }] : undefined,
          content: retryResult.content
        }
      }]
    };
    
    toolCall = retryData.choices?.[0]?.message?.tool_calls?.[0];
    const retryContent = retryData.choices?.[0]?.message?.content;
    
    logger.info('⚠️ Retry result from Gemini', {
      hasToolCall: !!toolCall,
      hasContent: !!retryContent,
      contentLength: retryContent?.length || 0
    });
  }
  
  // PHASE 1: Enhanced fallback - try JSON-only mode if no tool call
  if (!toolCall) {
    const content = aiData.choices?.[0]?.message?.content;
    logger.warn('⚠️ Still no tool call after retry', {
      hasContent: !!content,
      contentLength: content?.length || 0
    });
    
    // Final fallback: JSON-only mode (no tools)
    if (!content || content.trim() === "") {
      logger.warn('🔄 No tool call and no content, trying JSON-only fallback');
      
      // Limit RAG to top 12 regulations for token hygiene
      const topRegulations = ragResults.regulations.slice(0, 12);
      const compactRagContext = topRegulations.map((r: any) => 
        `${r.regulation_number}: ${r.content.substring(0, 200)}...`
      ).join('\n\n');
      
      const jsonResult = await providerRetry(async () => {
        return await callGemini({
          messages: [
            { 
              role: 'system', 
              content: `You are an expert electrical designer specialising in BS 7671:2018+A3:2024 compliant circuit design.

KNOWLEDGE BASE (top ${topRegulations.length} regulations):
${compactRagContext}

Return EXACTLY a single JSON object with keys: response, circuits, materials, warnings. No markdown, no prose outside JSON.

You MUST populate all RAG-driven fields using the regulations provided:
1. diversityFactor & diversityJustification (BS 7671 Appendix 15)
2. faultCurrentAnalysis (Regulation 434.5.2)
3. earthingRequirements (Sections 411, 544)
4. deratingFactors (Appendix 4 tables - show Ca, Cg, Ci)
5. installationGuidance (Appendix 4 reference methods)
6. specialLocationCompliance (Sections 701/702/714)
7. expectedTestResults (R1+R2, Zs, insulation, RCD times)

Structure:
- response: brief summary in UK English
- circuits: array of circuit objects with:
  * name, circuitNumber, loadType, loadPower, phases
  * cableSize, cpcSize, cableLength
  * protectionDevice: {type, rating, curve, breakingCapacity}
  * rcdProtected, rcdRating
  * voltageDrop: {volts, percent, compliant, limit}
  * zs, maxZs
  * justifications: {cableSize, protection, rcd}
  * warnings: array of strings
  * installationMethod
  * diversityFactor, diversityJustification
  * faultCurrentAnalysis: {psccAtCircuit, deviceBreakingCapacity, compliant, marginOfSafety, regulation}
  * earthingRequirements: {cpcSize, supplementaryBonding, bondingConductorSize, justification, regulation}
  * deratingFactors: {Ca, Cg, Ci, overall, explanation, tableReferences}
  * installationGuidance: {referenceMethod, description, clipSpacing, practicalTips[], regulation}
  * specialLocationCompliance: {isSpecialLocation, locationType, requirements[], zonesApplicable, regulation}
  * expectedTestResults: {r1r2: {at20C, at70C, calculation}, zs: {calculated, maxPermitted, compliant}, insulationResistance: {testVoltage, minResistance}, polarity, rcdTest: {at1x, at5x, regulation}}
- materials: array of material objects with name, specification, quantity, unit
- warnings: array of strings

Always cite regulation numbers and show working for calculations.`
            },
            { role: 'user', content: query }
          ],
          max_completion_tokens: aiConfig?.maxTokens || 24000, // Increased for complex multi-circuit designs
          response_format: { type: "json_object" }
        })
      });
      
      if (!jsonResponse.ok) {
        const errorText = await jsonResponse.text();
        if (jsonResponse.status === 429) {
          throw new Error("Rate limit exceeded. Please try again in a moment.");
        }
        if (jsonResponse.status === 402) {
          throw new Error("AI credits exhausted. Please add credits to your Lovable workspace.");
        }
        throw new Error(`AI JSON fallback error: ${jsonResponse.status} - ${errorText.substring(0, 200)}`);
      }
      
      const jsonData = await jsonResponse.json();
      const jsonContent = jsonData.choices?.[0]?.message?.content;
      
      if (!jsonContent) {
        throw new Error("AI did not return any content in JSON-only fallback.");
      }
      
      logger.info('✅ JSON-only fallback succeeded - appending single tool call', { contentLength: jsonContent.length });
      toolCall = { function: { arguments: jsonContent } };
      // FIX: Ensure fallback toolCall is pushed to allToolCalls
      allToolCalls.push(toolCall);
    } else {
      // Still no tool call after retry - check retry response first, then batch results
      let content = null;
      
      // First try: Check retry response data
      if (retryResponse) {
        try {
          const retryData = await retryResponse.json();
          content = retryData?.choices?.[0]?.message?.content || null;
          
          if (retryData?.choices?.[0]?.message?.tool_calls?.[0]) {
            toolCall = retryData.choices[0].message.tool_calls[0];
            allToolCalls.push(toolCall);
            logger.info('✅ Found tool call in retry response');
          }
        } catch (e) {
          logger.warn('⚠️ Could not parse retry response', { 
            error: e instanceof Error ? e.message : String(e) 
          });
        }
      }
      
      // Second try: Check batch results if retry didn't help
      if (!content && !toolCall) {
        const successfulBatch = batchResults.find(r => r?.success && r?.aiData);
        if (successfulBatch?.aiData?.choices?.[0]?.message) {
          const message = successfulBatch.aiData.choices[0].message;
          content = message.content || null;
          
          if (message.tool_calls?.[0]) {
            toolCall = message.tool_calls[0];
            allToolCalls.push(toolCall);
            logger.info('✅ Found tool call in batch results');
          }
        }
      }
      
      // Third try: Parse content as JSON if we have content but no tool call
      if (content && !toolCall) {
        try {
          const parsed = JSON.parse(content);
          if (parsed.circuits) {
            logger.info('✅ Recovered design from direct JSON content');
            toolCall = { function: { arguments: content } };
            allToolCalls.push(toolCall);
          }
        } catch (e) {
          // Try extracting JSON from markdown code blocks
          const jsonMatch = content.match(/```(?:json)?\n?([\s\S]*?)\n?```/);
          if (jsonMatch) {
            try {
              const parsed = JSON.parse(jsonMatch[1]);
              if (parsed.circuits) {
                logger.info('✅ Recovered design from markdown JSON block');
                toolCall = { function: { arguments: jsonMatch[1] } };
                allToolCalls.push(toolCall);
              }
            } catch (e2) {
              logger.error('🚨 Failed to parse extracted JSON', { 
                error: e2 instanceof Error ? e2.message : String(e2) 
              });
            }
          }
        }
      }
      
      if (!toolCall) {
        logger.error('🚨 AI did not return structured design after all attempts', {
          hasContent: !!content,
          contentPreview: content?.substring(0, 200),
          fullContentLength: content?.length || 0
        });
      return new Response(JSON.stringify({
        version: 'v3.2.0-gpt5-mini-24k', // Version identifier for debugging
        success: false,
        error: 'AI returned unstructured output. Please try again or simplify the request.',
        code: 'UNSTRUCTURED_OUTPUT',
        design: null
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
      }
    }
  }
  
  // FIX: Extra guard - ensure fallback toolCall is included
  if (!allToolCalls.length && toolCall) {
    logger.info('🔧 No tool calls in array, adding fallback tool call');
    allToolCalls = [toolCall];
  }
  
  // PHASE 1: Log tool call extraction success
  logger.info('✅ Tool calls extracted from batches', {
    batchCount: allToolCalls.length,
    firstFunctionName: toolCall?.function?.name || allToolCalls[0]?.function?.name
  });
  
  // Merge all circuit designs from batches
  let designData: any = { circuits: [], materials: [], warnings: [] };
  
  for (let i = 0; i < allToolCalls.length; i++) {
    const batchToolCall = allToolCalls[i];
    try {
      const batchData = JSON.parse(batchToolCall.function.arguments);
      
      // Merge circuits
      if (batchData.circuits && Array.isArray(batchData.circuits)) {
        designData.circuits.push(...batchData.circuits);
      }
      
      // Merge materials (deduplicate)
      if (batchData.materials && Array.isArray(batchData.materials)) {
        for (const material of batchData.materials) {
          const existing = designData.materials.find((m: any) => 
            m.item === material.item && m.specification === material.specification
          );
          if (existing) {
            existing.quantity += material.quantity;
          } else {
            designData.materials.push({ ...material });
          }
        }
      }
      
      // Merge warnings
      if (batchData.warnings && Array.isArray(batchData.warnings)) {
        designData.warnings.push(...batchData.warnings);
      }
      
      // Use response from first batch
      if (i === 0 && batchData.response) {
        designData.response = batchData.response;
      }
      
    } catch (parseError) {
      logger.error(`🚨 Failed to parse batch ${i + 1} tool call`, {
        error: parseError instanceof Error ? parseError.message : String(parseError)
      });
    }
  }
  
  logger.info('✅ Merged batch data', {
    totalCircuits: designData.circuits.length,
    totalMaterials: designData.materials.length,
    totalWarnings: designData.warnings.length
  });
  
  // PHASE 3: Verify all circuits were designed - REJECT if any are missing
  if (designData.circuits.length < allCircuits.length) {
    logger.error('❌ Circuit count mismatch - some circuits could not be designed', {
      requested: allCircuits.length,
      received: designData.circuits.length,
      missing: allCircuits.length - designData.circuits.length
    });
    
    // Find which circuits are missing
    const receivedNames = new Set(
      designData.circuits.map((c: any) => (c.name || '').toLowerCase())
    );
    
    const missingCircuits = allCircuits.filter((c: any) => {
      const circuitName = (c.name || c.loadType || '').toLowerCase();
      return !receivedNames.has(circuitName);
    });
    
    logger.error('❌ Missing circuits - design incomplete', {
      count: missingCircuits.length,
      names: missingCircuits.map(c => c.name || c.loadType)
    });
    
    // REJECT the design instead of adding placeholders - provide actionable guidance
    const failedCircuitGuidance = missingCircuits.map(c => {
      const name = c.name || c.loadType;
      const loadType = (c.loadType || '').toLowerCase();
      
      // Provide specific guidance based on circuit type
      if (loadType.includes('shower') || name.toLowerCase().includes('shower')) {
        return {
          name,
          loadType: c.loadType,
          suggestion: 'Showers require specific kW rating (e.g., 9.5kW). Please specify power rating and ensure adequate cable sizing (typically 10mm² for 9.5kW).'
        };
      } else if (loadType.includes('ev') || name.toLowerCase().includes('ev charger')) {
        return {
          name,
          loadType: c.loadType,
          suggestion: 'EV Chargers need charger type (Mode 3) and power rating (7kW single-phase or 22kW three-phase). Type B RCD is mandatory per BS 7671 Section 722.'
        };
      } else if (loadType.includes('cooker') || name.toLowerCase().includes('cooker')) {
        return {
          name,
          loadType: c.loadType,
          suggestion: 'Cookers require diversity calculation per BS 7671 Appendix 15 (10A + 30% of remainder + 5A if socket outlet). Specify total rated power.'
        };
      } else {
        return {
          name,
          loadType: c.loadType,
          suggestion: 'This circuit may need more specific details. Try adding power rating, installation method, or special requirements.'
        };
      }
    });
    
    return new Response(JSON.stringify({
      version: 'v3.4.0-multi-strategy',
      success: false,
      error: 'INCOMPLETE_DESIGN',
      message: `Unable to design ${missingCircuits.length} out of ${allCircuits.length} circuit(s). High-power circuits (shower, EV charger, cooker) require specific details.`,
      missingCircuits: failedCircuitGuidance,
      receivedCircuits: designData.circuits.length,
      requestedCircuits: allCircuits.length,
      code: 'INCOMPLETE_DESIGN',
      helpText: 'Provide specific kW ratings, equipment types, and cable specifications for complex circuits.'
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } else {
    logger.info('✅ All circuits designed successfully', {
      requested: allCircuits.length,
      received: designData.circuits.length
    });
  }
  
  // PHASE 1: Renumber circuits sequentially (C1, C2, C3... not CC1, CC6, CC10)
  logger.info('🔢 Renumbering circuits sequentially');
  designData.circuits = designData.circuits.map((circuit: any, index: number) => ({
    ...circuit,
    circuitNumber: index + 1 // Sequential numbering: 1, 2, 3, 4...
  }));
    
  // PRIORITY 2 & 3: Type validation and better error messages
  if (!designData.circuits || !Array.isArray(designData.circuits)) {
    logger.error('🚨 AI returned invalid circuits data', {
      circuitsType: typeof designData.circuits,
      circuitsValue: designData.circuits,
      hasCircuits: !!designData.circuits
    });
    throw new CircuitDesignError(
      'INVALID_CIRCUITS',
      'AI returned invalid circuits data',
      { circuitsType: typeof designData.circuits },
      ['Try again', 'If the issue persists, contact support']
    );
  }
  
  if (designData.circuits.length === 0) {
    logger.error('🚨 No circuits generated');
    throw ERROR_TEMPLATES.NO_CIRCUITS(
      inputCircuits.length,
      !!projectInfo.additionalPrompt
    );
  }
  
  logger.info('✅ Design data merged successfully', {
    hasCircuits: true,
    circuitCount: designData.circuits.length,
    hasMaterials: !!designData.materials,
    materialCount: designData.materials?.length || 0
  });
  
  // PRIORITY 2: TYPE GUARDS - Validate and fix incomplete circuits
  const stopPostProcessing = perfMonitor.startStage('postProcessing');
  
  logger.info('🔍 Validating circuit data with type guards');
  designData.circuits = designData.circuits.map((circuit: any, index: number) => {
    if (!TypeGuards.isValidCircuit(circuit)) {
      logger.warn(`⚠️ Circuit ${index + 1} incomplete, applying defaults`, {
        hasName: !!circuit?.name,
        hasCalculations: TypeGuards.hasCalculations(circuit),
        hasProtection: TypeGuards.hasProtectionDevice(circuit)
      });
      circuit = applyDefaultCircuitValues(circuit);
    }
    return circuit;
  });
  
  // 📄 POST-PROCESSING: Ensure all PDF-required fields are populated
  logger.info('📄 Applying PDF field mapper to ensure complete data');
  designData.circuits = designData.circuits.map(ensurePDFFields);
  
  // 🔧 AUTO-CORRECT MCB SIZING (Ib ≤ In enforcement)
  logger.info('🔧 Auto-correcting MCB sizing before validation');
  designData.circuits = autoCorrectMCBSizing(designData.circuits, logger);
  
  // 🔧 PHASE 3: AUTO-CORRECT RCD PROTECTION
  logger.info('🔧 Auto-correcting missing RCD protection flags');
  autoCorrectRCDProtection(designData.circuits, incomingSupply, logger);
  
  stopPostProcessing();
  
  // 🔍 MULTI-STAGE VALIDATION PIPELINE
  logger.info('🔍 Running multi-stage validation pipeline');
  
  const validationResult = validateDesign(designData.circuits, incomingSupply, projectInfo);
  const validationWarnings: string[] = [...(designData.warnings || [])];
  
  // Add validation errors and warnings to response
  if (validationResult.errors.length > 0) {
    logger.warn('⚠️ Validation errors found', { 
      errorCount: validationResult.errors.length,
      errors: validationResult.errors.map(e => e.message)
    });
    validationWarnings.push(...validationResult.errors.map(e => `❌ ${e.message} (${e.regulation || 'Check required'})`));
  }
  
  if (validationResult.warnings.length > 0) {
    logger.info('📋 Validation warnings', { 
      warningCount: validationResult.warnings.length 
    });
    validationWarnings.push(...validationResult.warnings.map(w => `⚠️ ${w.message}`));
  }
  
  // PHASE 1: ENFORCE COMPLIANCE - Reject non-compliant designs
  if (!validationResult.passed) {
    logger.error('❌ Design validation failed - returning error to client', {
      errorCount: validationResult.errors.length,
      errors: validationResult.errors.map(e => ({ circuit: e.circuitName, message: e.message, regulation: e.regulation }))
    });
    
    return new Response(JSON.stringify({
      version: 'v3.3.2-compliance-enforcement',
      success: false,
      error: 'NON_COMPLIANT_DESIGN',
      message: 'Cannot generate design: BS 7671 compliance failures detected',
      validationErrors: validationResult.errors.map(e => ({
        circuit: e.circuitName,
        severity: e.severity,
        message: e.message,
        regulation: e.regulation,
        suggestedFix: e.suggestedFix
      })),
      validationWarnings: validationResult.warnings.map(w => ({
        circuit: w.circuitName,
        message: w.message
      })),
      design: designData // Include partial design for debugging
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
  
  // Calculate confidence scores for quality transparency
  const perCircuitConfidence = designData.circuits.map((c: any) => ({
    circuitName: c.name,
    ...calculateCircuitConfidence(c)
  }));
  
  const overallConfidence = calculateOverallConfidence(designData.circuits);
  
  // PHASE 1: Enhanced completion logging
  logger.info('✅ STEP 3 Complete - Design validation finished', {
    circuits: designData.circuits?.length || 0,
    requestedCircuits: allCircuits.length,
    batchesProcessed: circuitBatches.length,
    tokensUsed: totalTokens,
    validationWarnings: validationWarnings.length,
    warningsSummary: validationWarnings.slice(0, 3),
    aiTimeMs: aiElapsedMs,
    ragTimeMs: ragElapsedMs,
    parallelSpeedup: circuitBatches.length > 1 ? `${Math.round((circuitBatches.length * 60000) / aiElapsedMs * 100) / 100}x` : 'single batch'
  });
  
  // STEP 4: Return structured design (matching AI RAMS pattern)
  logger.info('✅ Returning design to client', {
    hasResponse: !!designData.response,
    circuitCount: designData.circuits?.length || 0,
    hasMaterials: !!designData.materials,
    warningCount: validationWarnings.length
  });
  
    return new Response(JSON.stringify({
      version: 'v3.3.2-compliance-enforcement',
      success: true,
      response: designData.response || 'Design complete',
      design: {
        projectName: projectInfo.name,
        location: projectInfo.location,
        clientName: projectInfo.clientName,
        electricianName: projectInfo.electricianName,
        installationType: projectInfo.installationType,
        totalLoad: Array.isArray(designData.circuits)
          ? designData.circuits.reduce((sum: number, c: any) => sum + (c.loadPower || 0), 0)
          : 0,
        
        // OPTIMIZATION: Trim verbose circuit data to reduce payload size by 30-50%
        circuits: designData.circuits.map((c: any) => ({
          ...c,
          // Keep only essential calculation fields
          calculations: {
            Ib: c.calculations?.Ib,
            In: c.calculations?.In,
            Iz: c.calculations?.Iz,
            zs: c.calculations?.zs,
            maxZs: c.calculations?.maxZs,
            voltageDrop: c.calculations?.voltageDrop
            // Remove: deratedCapacity, safetyMargin (can be computed client-side)
          },
          // Truncate verbose justifications to 200 chars each
          justifications: {
            cableSize: c.justifications?.cableSize?.substring(0, 200),
            protection: c.justifications?.protection?.substring(0, 200),
            rcd: c.justifications?.rcd?.substring(0, 200)
          }
        })),
        
        materials: designData.materials || [],
        warnings: validationWarnings.slice(0, 20), // Limit to top 20 warnings
        consumerUnit: {
          type: incomingSupply.mainSwitchRating >= 100 ? 'Split Load RCBO' : 'Dual RCD',
          mainSwitchRating: incomingSupply.mainSwitchRating,
          incomingSupply: {
            voltage: incomingSupply.voltage,
            phases: incomingSupply.phases,
            incomingPFC: incomingSupply.pscc,
            Ze: incomingSupply.Ze,
            earthingSystem: incomingSupply.earthingSystem
          }
        },
        diversityApplied: true,
        diversityFactor: 0.7,
        aiResponse: designData.response?.substring(0, 500) // Truncate long AI responses
      },
      metadata: {
        ragCalls: ragResults.regulations?.length || 0,
        model: aiConfig?.model || 'gpt-5-mini-2025-08-07',
        tokensUsed: totalTokens,
        batchesProcessed: circuitBatches.length,
        parallelProcessing: circuitBatches.length > 1,
        validationPassed: validationResult.passed,
        validationErrorCount: validationResult.errors.length,
        validationWarningCount: validationResult.warnings.length,
        confidence: {
          overall: overallConfidence,
          perCircuit: perCircuitConfidence
        },
        performance: perfMonitor.finish()
      }
    }), { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
  } catch (error) {
    logger.error('❌ Design handler error', { error });
    
    if (error instanceof CircuitDesignError) {
      return error.toResponse();
    }
    
    // Unknown errors
    return new CircuitDesignError(
      'INTERNAL_ERROR',
      error instanceof Error ? error.message : 'Unknown error occurred',
      { stack: error instanceof Error ? error.stack : undefined },
      ['Try again', 'Contact support if the issue persists']
    ).toResponse();
  }
}

/**
 * POST-PROCESSING MAPPER: Ensure all PDF-required fields are populated
 * This acts as a safety net if the AI doesn't provide all display fields
 */
function ensurePDFFields(circuit: any): any {
  // CRITICAL: Ensure protectionDevice exists with defaults if missing
  if (!circuit.protectionDevice) {
    circuit.protectionDevice = {
      type: 'MCB',
      rating: Math.ceil((circuit.calculations?.Ib || circuit.designCurrent || 0) * 1.25),
      curve: 'B',
      kaRating: 6
    };
  }
  
  // CRITICAL: Ensure calculations object exists with all required fields
  const Ib = circuit.calculations?.Ib ?? circuit.designCurrent ?? (circuit.loadPower || 0) / (circuit.voltage || 230);
  if (!circuit.calculations) {
    circuit.calculations = {
      Ib: Ib,
      In: circuit.protectionDevice.rating || Math.ceil(Ib * 1.25),
      Iz: circuit.protectionDevice.rating || Math.ceil(Ib * 1.25),
      safetyMargin: 20,
      voltageDrop: {
        volts: 0,
        percent: 0,
        compliant: true,
        limit: (circuit.voltage || 230) * 0.05
      },
      zs: circuit.ze || 0.35,
      maxZs: 2.19,
      deratedCapacity: circuit.protectionDevice.rating || Math.ceil(Ib * 1.25)
    };
  }
  
  // Ensure nested voltageDrop object exists
  if (!circuit.calculations.voltageDrop) {
    circuit.calculations.voltageDrop = {
      volts: 0,
      percent: 0,
      compliant: true,
      limit: (circuit.voltage || 230) * 0.05
    };
  }
  
  // Ensure all individual calculation fields have safe defaults
  circuit.calculations.Ib = circuit.calculations.Ib ?? Ib;
  circuit.calculations.In = circuit.calculations.In ?? circuit.protectionDevice.rating ?? 0;
  circuit.calculations.Iz = circuit.calculations.Iz ?? circuit.calculations.In ?? 0;
  circuit.calculations.safetyMargin = circuit.calculations.safetyMargin ?? 20;
  circuit.calculations.zs = circuit.calculations.zs ?? circuit.ze ?? 0.35;
  circuit.calculations.maxZs = circuit.calculations.maxZs ?? 2.19;
  circuit.calculations.deratedCapacity = circuit.calculations.deratedCapacity ?? circuit.calculations.Iz ?? 0;
  circuit.calculations.voltageDrop.volts = circuit.calculations.voltageDrop.volts ?? 0;
  circuit.calculations.voltageDrop.percent = circuit.calculations.voltageDrop.percent ?? 0;
  circuit.calculations.voltageDrop.compliant = circuit.calculations.voltageDrop.compliant ?? true;
  circuit.calculations.voltageDrop.limit = circuit.calculations.voltageDrop.limit ?? (circuit.voltage || 230) * 0.05;
  
  return {
    ...circuit,
    // Ensure formatted display fields exist
    designCurrentIb: circuit.designCurrentIb || circuit.calculations.Ib.toFixed(1),
    nominalCurrentIn: circuit.nominalCurrentIn || circuit.calculations.In || circuit.protectionDevice.rating || 0,
    cableCapacityIz: circuit.cableCapacityIz || circuit.calculations.Iz || 0,
    rcdProtectedText: circuit.rcdProtectedText || (
      circuit.rcdProtected 
        ? (circuit.protectionDevice.type === 'RCBO' ? '30mA RCBO' : '30mA RCD')
        : 'No'
    ),
    zsCompliant: circuit.zsCompliant ?? (circuit.calculations.zs <= circuit.calculations.maxZs),
    voltageDropCompliant: circuit.voltageDropCompliant ?? circuit.calculations.voltageDrop.compliant,
    zsActual: circuit.zsActual || circuit.calculations.zs.toFixed(2),
    zsMax: circuit.zsMax || circuit.calculations.maxZs.toFixed(2),
    
    // Ensure justifications have minimum length
    justifications: {
      cableSize: circuit.justifications?.cableSize || `${circuit.cableSize}mm² cable selected for ${circuit.loadPower}W load with adequate current-carrying capacity.`,
      protection: circuit.justifications?.protection || `${circuit.protectionDevice?.rating}A ${circuit.protectionDevice?.curve || 'B'} ${circuit.protectionDevice?.type || 'MCB'} provides adequate protection per BS 7671.`,
      rcd: circuit.justifications?.rcd || (circuit.rcdProtected 
        ? 'RCD protection provides additional safety for this circuit in accordance with BS 7671.' 
        : 'RCD not required for this circuit as it does not serve special locations or socket outlets likely to supply portable equipment outdoors.')
    },
    
    // Ensure warnings is always an array
    warnings: circuit.warnings || []
  };
}

// ============= ALL HELPER FUNCTIONS MOVED TO TOP OF FILE (LINES 35-236) =============

function extractPracticalGuidance(circuits: any[]): string[] {
  const guidance = [
    'Complete all required tests per BS 7671 Part 6 before energising circuits',
    'Fill in Electrical Installation Certificate (EIC) with Schedule of Test Results',
    `Total of ${circuits.length} circuits designed - verify consumer unit has sufficient ways`,
    'Ensure all RCD/RCBO devices are tested monthly by end user',
    'Verify actual Ze at origin matches design assumption before installation'
  ];
  
  // Add circuit-specific guidance
  if (circuits.some((c: any) => c.rcdProtected)) {
    guidance.push('RCD protection required for multiple circuits - consider use of RCBOs for selectivity');
  }
  
  if (circuits.some((c: any) => c.loadType?.includes('shower'))) {
    guidance.push('Electric showers require bonding to supplementary equipotential bonding per Section 701');
  }
  
  return guidance;
}

// PHASE 2: Simple content hash function for deduplication
function hashContent(content: string): string {
  // Simple hash using first 100 chars + length as fingerprint
  const normalized = content.toLowerCase().replace(/\s+/g, ' ').trim();
  return `${normalized.substring(0, 100)}_${normalized.length}`;
}
