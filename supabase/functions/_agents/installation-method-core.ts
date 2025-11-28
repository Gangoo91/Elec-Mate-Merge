/**
 * Installation Method Agent Core Logic
 * STANDALONE TOOL VERSION (not used by circuit designer)
 * Uses ultra-fast practical work intelligence RAG
 */

import { searchPracticalWorkIntelligence } from '../_shared/rag-practical-work.ts';
import { searchRegulationsIntelligence } from '../_shared/intelligence-search.ts';

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

interface InstallationMethodRequest {
  query: string;
  projectDetails?: any;
  designerContext?: any;
}

export async function generateInstallationMethod(
  supabase: any,
  request: InstallationMethodRequest
) {
  const startTime = Date.now();
  
  console.log('🔧 Installation Method Agent START', {
    query: request.query,
    hasProjectDetails: !!request.projectDetails,
    hasDesignerContext: !!request.designerContext
  });

  // STEP 1: Extract keywords from query (50 keywords target)
  const keywords = extractInstallationKeywords(request.query, request.designerContext);
  console.log(`📝 Extracted ${keywords.size} keywords:`, Array.from(keywords).slice(0, 10));

  // STEP 2: Ultra-fast parallel RAG search (INCREASED LIMITS + EXPANDED CATEGORIES)
  const ragStart = Date.now();
  const [practicalWorkResult, regulations] = await Promise.all([
    searchPracticalWorkIntelligence(supabase, {
      query: request.query,
      tradeFilter: 'installer',
      matchCount: 40  // Increased from 25 for richer installation guidance
    }),
    searchRegulationsIntelligence(supabase, {
      keywords: Array.from(keywords),
      appliesTo: ['all installations', 'installation work', 'testing', 'inspection', 'commissioning'],
      categories: [
        'installation', 'testing', 'inspection', 'earthing', 'protection',
        'cables', 'wiring systems', 'special locations', 'isolation',
        'verification', 'certification', 'safety', 'bonding'
      ],
      limit: 30  // Increased from 15 for comprehensive regulation coverage
    })
  ]);

  const ragTime = Date.now() - ragStart;
  
  // Enhanced RAG coverage analysis
  const topPracticalCategories = [...new Set(practicalWorkResult.results.map(r => r.equipment_category || r.primary_topic))].slice(0, 10);
  const topRegulationCategories = [...new Set(regulations.map(r => r.category))].slice(0, 10);
  const toolsMentioned = [...new Set(practicalWorkResult.results.flatMap(r => r.tools_required || []))].slice(0, 15);
  
  console.log(`⚡ RAG search complete in ${ragTime}ms:`, {
    practicalWorkHits: practicalWorkResult.results.length,
    regulationHits: regulations.length,
    practicalQuality: practicalWorkResult.qualityScore.toFixed(1),
    topPracticalCategories,
    topRegulationCategories,
    toolsIdentified: toolsMentioned.length
  });

  // STEP 3: Call GPT-5 Mini for installation method generation
  const aiStart = Date.now();
  const installationMethod = await callInstallationMethodAI(
    request,
    {
      practicalWork: practicalWorkResult.results,
      regulations,
      keywords: Array.from(keywords)
    }
  );
  const aiTime = Date.now() - aiStart;

  const totalTime = Date.now() - startTime;
  console.log(`✅ Installation Method complete in ${totalTime}ms (RAG: ${ragTime}ms, AI: ${aiTime}ms)`);

  return {
    installationMethod,
    metadata: {
      totalTime,
      ragTime,
      aiTime,
      practicalWorkHits: practicalWorkResult.results.length,
      regulationHits: regulations.length,
      qualityScore: practicalWorkResult.qualityScore
    }
  };
}

// ============================================================================
// COMPREHENSIVE INSTALLATION KEYWORD MAPS (300+ keywords across 10 categories)
// ============================================================================

const INSTALLATION_ACTIVITY_KEYWORDS = {
  preparation: ['site survey', 'risk assessment', 'isolation', 'safe isolation', 'proving unit', 'lock off', 'lockout', 'permit to work', 'method statement', 'toolbox talk', 'RAMS', 'safe working'],
  cable_work: ['cable pulling', 'cable routing', 'cable run', 'containment', 'conduit', 'trunking', 'cable tray', 'cable clips', 'cable ties', 'gland', 'gland plate', 'stuffing gland', 'compression gland', 'CW gland', 'BW gland', 'cable support', 'fixing centres', 'draw tape', 'cable lubricant'],
  termination: ['termination', 'connection', 'crimping', 'ferrule', 'bootlace', 'cable lug', 'terminal', 'connector block', 'wago', 'screw terminal', 'strip length', 'torque setting', 'torque screwdriver'],
  mounting: ['mounting', 'fixing', 'back box', 'pattress', 'flush mount', 'surface mount', 'bracket', 'rawl plug', 'wall plug', 'masonry fixing', 'plasterboard fixing', 'cavity fixing'],
  first_fix: ['first fix', 'carcass', 'back boxes', 'containment', 'cable routes', 'notching', 'drilling', 'cable zones', 'safe zones'],
  second_fix: ['second fix', 'final connections', 'face plates', 'accessories', 'labelling', 'circuit identification', 'durable labels'],
};

const TESTING_INSTALLATION_KEYWORDS = {
  dead_tests: ['dead testing', 'continuity', 'R1+R2', 'ring continuity', 'figure of eight', 'CPC continuity', 'end-to-end', 'long lead', 'low resistance ohmmeter'],
  insulation: ['insulation resistance', 'IR test', 'megger', '500V test', '250V test', '1000V test', 'between live conductors', 'live to earth', '1 MΩ', '2 MΩ', '0.5 MΩ', 'minimum insulation'],
  polarity: ['polarity', 'polarity check', 'correct polarity', 'phase identification', 'L1 L2 L3', 'phase sequence', 'phase rotation'],
  earth_fault_loop: ['Zs', 'Ze', 'earth fault loop', 'loop impedance', 'maximum Zs', 'external earth fault loop', 'Table 41.2', 'Table 41.3', 'Table 41.4', 'disconnection time', '0.4s', '5s'],
  rcd_tests: ['RCD test', 'trip time', 'trip current', '30mA test', '0.5 I∆n', 'I∆n', 'no trip', '40ms', '200ms', '300ms', 'ramp test', 'RCD operation'],
  functional: ['functional test', 'operation test', 'switching', 'interlocks', 'pilot lamp', 'commissioning'],
  pfc: ['PFC', 'PSCC', 'prospective fault current', 'prospective short circuit', 'fault level', 'breaking capacity'],
  verification: ['initial verification', 'periodic inspection', 'EICR', 'EIC', 'schedule of test results', 'schedule of inspections', 'certification'],
};

const TOOLS_KEYWORDS = {
  test_instruments: ['multifunction tester', 'MFT', 'Megger', 'Fluke', 'Kewtech', 'loop tester', 'insulation tester', 'RCD tester', 'earth fault loop tester', 'low resistance ohmmeter', 'proving unit', 'voltage indicator', 'two-pole tester', 'GS38', 'test leads', 'probes', 'clamp meter', 'multimeter', 'phase rotation meter', 'socket tester'],
  hand_tools: ['screwdriver', 'insulated screwdriver', 'VDE screwdriver', 'side cutters', 'cable cutters', 'wire strippers', 'cable stripper', 'pliers', 'long nose pliers', 'crimping tool', 'ratchet crimper', 'cable knife', 'junior hacksaw', 'tape measure', 'spirit level', 'torch', 'head torch'],
  power_tools: ['drill', 'SDS drill', 'impact driver', 'combi drill', 'angle grinder', 'jigsaw', 'chase cutter', 'reciprocating saw', 'hole saw', 'core drill', 'diamond blade'],
  cable_tools: ['cable rods', 'draw tape', 'fish tape', 'cable puller', 'cable lubricant', 'cable rollers', 'conduit bender', 'conduit threader', 'knockout punch', 'gland spanner', 'cable stripper'],
  access_equipment: ['ladder', 'step ladder', 'extension ladder', 'platform', 'podium steps', 'scaffold tower', 'MEWP', 'cherry picker', 'working at height'],
  safety_equipment: ['PPE', 'safety glasses', 'insulated gloves', 'hard hat', 'safety boots', 'hi-vis', 'ear defenders', 'dust mask', 'knee pads', 'first aid kit', 'fire extinguisher', 'spill kit'],
  consumables: ['tape', 'insulation tape', 'PVC tape', 'cable ties', 'fixings', 'rawl plugs', 'screws', 'saddles', 'clips', 'glands', 'ferrules', 'labels', 'markers'],
};

const MATERIALS_KEYWORDS = {
  cables: ['twin and earth', 'T&E', '6242Y', 'SWA', 'armoured cable', 'flex', 'H07RN-F', 'XLPE', 'singles', 'conduit wire', 'fire resistant', 'FP200', 'LSF', 'LSZH', 'data cable', 'Cat6', 'coax'],
  cable_sizes: ['1mm²', '1.5mm²', '2.5mm²', '4mm²', '6mm²', '10mm²', '16mm²', '25mm²', '35mm²', '50mm²', '70mm²', '95mm²', '120mm²'],
  containment: ['conduit', 'PVC conduit', 'steel conduit', 'flexible conduit', 'trunking', 'mini trunking', 'dado trunking', 'cable tray', 'cable basket', 'cable ladder'],
  accessories: ['socket outlet', 'switch', 'dimmer', 'isolator', 'fused spur', 'connection unit', 'cooker control', 'shaver socket', 'ceiling rose', 'batten holder', 'downlight'],
  distribution: ['consumer unit', 'distribution board', 'busbar', 'DIN rail', 'MCB', 'RCBO', 'RCD', 'main switch', 'isolator', 'surge protection', 'SPD'],
  earthing: ['earth rod', 'earth clamp', 'earth bar', 'main earthing terminal', 'MET', 'bonding conductor', 'earth labels', 'earth tape'],
};

const SAFETY_KEYWORDS = {
  safe_isolation: ['safe isolation', 'isolation procedure', 'lock off', 'lockout tagout', 'LOTO', 'proving dead', 'test for dead', 'adjacent live', 'permit to work', 'voltage indicator'],
  ppe: ['PPE', 'personal protective equipment', 'safety glasses', 'eye protection', 'insulated gloves', 'Class 0', 'safety boots', 'hard hat', 'hi-vis', 'hearing protection'],
  hazards: ['electric shock', 'arc flash', 'fire risk', 'burns', 'working at height', 'manual handling', 'asbestos', 'sharp edges', 'trip hazard', 'confined space'],
  regulations: ['BS 7671', 'Wiring Regulations', '18th Edition', 'Part P', 'EAWR', 'Electricity at Work', 'CDM', 'HASWA', 'Health and Safety', 'risk assessment', 'method statement', 'RAMS'],
  certification: ['EIC', 'EICR', 'Minor Works', 'Part P notification', 'building control', 'competent person', 'self-certification', 'electrical installation certificate'],
};

const SECTOR_INSTALLATION_KEYWORDS = {
  domestic: ['domestic', 'dwelling', 'house', 'flat', 'consumer unit', 'ring final', 'radial', 'lighting circuit', 'cooker circuit', 'shower circuit', 'immersion', 'smoke alarm', 'Part P', 'notifiable work'],
  commercial: ['commercial', 'office', 'shop', 'retail', 'distribution board', 'three-phase', 'sub-main', 'busbar', 'emergency lighting', 'fire alarm', 'data', 'structured cabling'],
  industrial: ['industrial', 'factory', 'warehouse', 'motor circuit', 'star-delta', 'DOL', 'VSD', 'isolation', 'emergency stop', 'interlocks', 'machinery', 'SWA'],
  agricultural: ['agricultural', 'farm', 'barn', 'livestock', 'equipotential bonding', 'IP rating', 'moisture', 'corrosion', 'Section 705'],
  outdoor: ['outdoor', 'external', 'garden', 'IP65', 'IP66', 'weatherproof', 'UV resistant', 'underground', 'armoured'],
};

const SPECIAL_LOCATION_INSTALLATION_KEYWORDS = {
  bathroom: ['bathroom', 'Zone 0', 'Zone 1', 'Zone 2', 'outside zones', 'IP rating', 'IPX4', 'IPX5', 'SELV', 'supplementary bonding', '30mA RCD', 'shaver socket', 'extractor fan', 'Section 701'],
  kitchen: ['kitchen', 'cooking appliance', 'cooker circuit', 'cooker control', 'hob', 'oven', 'extractor', 'waste disposal'],
  garage: ['garage', 'outbuilding', 'shed', 'workshop', 'SWA', 'armoured', 'isolation', 'RCD protection'],
  garden: ['garden', 'outdoor', 'pond pump', 'garden lighting', 'IP65', 'weatherproof', 'underground cable', 'warning tape'],
  loft: ['loft', 'attic', 'roof space', 'thermal insulation', 'derating', 'junction box', 'maintenance free'],
};

const CIRCUIT_INSTALLATION_KEYWORDS = {
  ring_final: ['ring final', '32A', '2.5mm²', 'socket circuit', 'twin and earth', 'figure of eight', 'ring continuity', 'spurs', 'fused spur', 'unfused spur', '100m² floor area'],
  radial: ['radial circuit', '20A', '32A', '2.5mm²', '4mm²', 'socket circuit', 'end fed'],
  lighting: ['lighting circuit', '6A', '1.5mm²', 'loop-in', 'junction box', 'switch wire', 'switch drop', 'three-plate', 'ceiling rose', 'downlight'],
  cooker: ['cooker circuit', '32A', '40A', '45A', '6mm²', '10mm²', 'cooker control unit', 'outlet plate', 'diversity', 'Table 4A'],
  shower: ['shower circuit', '40A', '45A', '50A', '6mm²', '10mm²', 'dedicated circuit', 'pull cord', 'double pole isolator', 'IP rating'],
  ev_charger: ['EV charger', 'EVCP', '32A', '6mm²', '7kW', 'Mode 3', 'PME', 'earthing', 'TT', 'dedicated circuit', 'RCD Type A'],
  smoke_alarm: ['smoke alarm', 'smoke detection', 'mains powered', 'battery backup', 'interlinked', 'ceiling mounted', 'BS 5839-6'],
  immersion: ['immersion heater', '16A', '3kW', '2.5mm²', 'DP switch', 'flex outlet', 'cylinder stat'],
  boiler: ['boiler', 'central heating', '3A fuse', 'fused spur', 'programmer', 'room stat', 'cylinder stat'],
  outdoor: ['outdoor circuit', 'garden lighting', 'pond pump', 'armoured cable', 'IP65', 'weatherproof socket', 'RCD protection'],
};

const FAULT_FINDING_KEYWORDS = {
  symptoms: ['tripping', 'nuisance tripping', 'intermittent fault', 'no power', 'partial loss', 'overheating', 'burning smell', 'sparking', 'flickering', 'buzzing', 'humming'],
  tests: ['insulation resistance', 'continuity', 'earth fault', 'split load test', 'half split', 'IR test', 'live testing', 'thermal imaging'],
  common_faults: ['earth fault', 'short circuit', 'open circuit', 'high resistance joint', 'loose connection', 'damaged cable', 'water ingress', 'rodent damage', 'overload'],
  equipment: ['insulation tester', 'clamp meter', 'thermal camera', 'socket tester', 'voltage indicator', 'multimeter'],
};

const THREE_PHASE_KEYWORDS = {
  basics: ['three-phase', '3-phase', '400V', '415V', 'line voltage', 'phase voltage', 'L1 L2 L3', 'neutral', 'star', 'delta', '√3', '1.732'],
  distribution: ['three-phase board', 'TP&N', 'busbar', 'balanced load', 'phase rotation', 'phase sequence', 'RYB', 'L1 L2 L3'],
  motors: ['motor circuit', 'DOL', 'direct on line', 'star-delta', 'soft start', 'VSD', 'VFD', 'inverter', 'overload', 'contactor', 'isolator'],
  testing: ['phase rotation meter', 'phase sequence', 'motor rotation', 'current balance', 'voltage balance'],
};

function extractInstallationKeywords(query: string, designerContext?: any): Set<string> {
  const keywords = new Set<string>();
  const queryLower = query.toLowerCase();
  
  console.log('🔍 Extracting comprehensive installation keywords...');
  
  // CATEGORY 1: Installation Activities
  Object.values(INSTALLATION_ACTIVITY_KEYWORDS).flat().forEach(kw => {
    if (queryLower.includes(kw.toLowerCase()) || queryLower.includes(kw.split(' ')[0])) {
      keywords.add(kw);
    }
  });
  
  // CATEGORY 2: Testing Keywords
  Object.values(TESTING_INSTALLATION_KEYWORDS).flat().forEach(kw => {
    if (queryLower.includes(kw.toLowerCase()) || queryLower.includes('test') || queryLower.includes('inspection')) {
      keywords.add(kw);
    }
  });
  
  // CATEGORY 3: Tools Keywords
  Object.values(TOOLS_KEYWORDS).flat().forEach(kw => {
    if (queryLower.includes(kw.toLowerCase()) || queryLower.includes('tool') || queryLower.includes('equipment')) {
      keywords.add(kw);
    }
  });
  
  // CATEGORY 4: Materials Keywords
  Object.values(MATERIALS_KEYWORDS).flat().forEach(kw => {
    if (queryLower.includes(kw.toLowerCase()) || queryLower.includes('cable') || queryLower.includes('material')) {
      keywords.add(kw);
    }
  });
  
  // CATEGORY 5: Safety Keywords
  Object.values(SAFETY_KEYWORDS).flat().forEach(kw => {
    if (queryLower.includes(kw.toLowerCase()) || queryLower.includes('safe') || queryLower.includes('isolation')) {
      keywords.add(kw);
    }
  });
  
  // CATEGORY 6: Sector Keywords
  Object.entries(SECTOR_INSTALLATION_KEYWORDS).forEach(([sector, kws]) => {
    if (queryLower.includes(sector)) {
      kws.forEach(kw => keywords.add(kw));
    }
  });
  
  // CATEGORY 7: Special Locations
  Object.entries(SPECIAL_LOCATION_INSTALLATION_KEYWORDS).forEach(([location, kws]) => {
    if (queryLower.includes(location)) {
      kws.forEach(kw => keywords.add(kw));
    }
  });
  
  // CATEGORY 8: Circuit-Specific Keywords
  Object.entries(CIRCUIT_INSTALLATION_KEYWORDS).forEach(([circuitType, kws]) => {
    const matchTerms = circuitType.split('_');
    if (matchTerms.some(term => queryLower.includes(term))) {
      kws.forEach(kw => keywords.add(kw));
    }
  });
  
  // CATEGORY 9: Fault Finding Keywords
  if (queryLower.includes('fault') || queryLower.includes('problem') || queryLower.includes('issue')) {
    Object.values(FAULT_FINDING_KEYWORDS).flat().forEach(kw => keywords.add(kw));
  }
  
  // CATEGORY 10: Three-Phase Keywords
  if (queryLower.includes('three') || queryLower.includes('3-phase') || queryLower.includes('motor') || queryLower.includes('industrial')) {
    Object.values(THREE_PHASE_KEYWORDS).flat().forEach(kw => keywords.add(kw));
  }
  
  // Add all query words (minimum 3 chars)
  const queryWords = queryLower.replace(/[^\w\s]/g, ' ').split(/\s+/).filter(w => w.length > 3);
  queryWords.forEach(w => keywords.add(w));
  
  // Extract from designer context if available
  if (designerContext?.circuits) {
    designerContext.circuits.forEach((circuit: any) => {
      if (circuit.loadType) {
        const loadType = circuit.loadType.toLowerCase();
        keywords.add(loadType);
        
        // Add circuit-specific keywords based on load type
        if (loadType.includes('socket')) {
          CIRCUIT_INSTALLATION_KEYWORDS.ring_final.forEach(kw => keywords.add(kw));
          CIRCUIT_INSTALLATION_KEYWORDS.radial.forEach(kw => keywords.add(kw));
        } else if (loadType.includes('lighting')) {
          CIRCUIT_INSTALLATION_KEYWORDS.lighting.forEach(kw => keywords.add(kw));
        } else if (loadType.includes('cooker')) {
          CIRCUIT_INSTALLATION_KEYWORDS.cooker.forEach(kw => keywords.add(kw));
        } else if (loadType.includes('shower')) {
          CIRCUIT_INSTALLATION_KEYWORDS.shower.forEach(kw => keywords.add(kw));
        } else if (loadType.includes('ev') || loadType.includes('charger')) {
          CIRCUIT_INSTALLATION_KEYWORDS.ev_charger.forEach(kw => keywords.add(kw));
        }
      }
      
      if (circuit.location) keywords.add(circuit.location.toLowerCase());
      if (circuit.cableType) keywords.add(circuit.cableType.toLowerCase());
      if (circuit.cableSize) keywords.add(circuit.cableSize);
    });
  }
  
  // Extract from project details
  if (designerContext?.projectDetails) {
    const details = designerContext.projectDetails;
    if (details.installationType) {
      const type = details.installationType.toLowerCase();
      if (SECTOR_INSTALLATION_KEYWORDS[type as keyof typeof SECTOR_INSTALLATION_KEYWORDS]) {
        SECTOR_INSTALLATION_KEYWORDS[type as keyof typeof SECTOR_INSTALLATION_KEYWORDS].forEach(kw => keywords.add(kw));
      }
    }
  }
  
  console.log(`📊 Keyword extraction summary:`, {
    totalKeywords: keywords.size,
    sampleKeywords: Array.from(keywords).slice(0, 20).join(', ')
  });
  
  return keywords;
}

async function callInstallationMethodAI(
  request: InstallationMethodRequest,
  ragContext: any
) {
  const systemPrompt = `You are an expert Installation Method Specialist for electrical installations.

Generate a comprehensive, step-by-step installation method statement based on BS 7671:2018+A2:2024 and industry best practices.

Respond with a valid JSON object following this exact structure:

KNOWLEDGE BASE PROVIDED:
- ${ragContext.practicalWork.length} practical work intelligence results
- ${ragContext.regulations.length} BS 7671 regulations
- Keywords: ${ragContext.keywords.slice(0, 15).join(', ')}

CRITICAL CABLE TYPE RULES:
- DOMESTIC installations: Twin and Earth (6242Y) is acceptable for most circuits
- COMMERCIAL installations: Use singles in conduit/trunking (e.g., "LSZH Singles in Steel Trunking"), NOT Twin & Earth
- INDUSTRIAL installations: Use singles in conduit/trunking OR SWA (Steel Wire Armoured), NEVER Twin & Earth

When installationType is 'commercial' or 'industrial', the cableType in executiveSummary MUST be one of:
- "LSZH Singles in Steel Conduit"
- "LSZH Singles in Steel Trunking"  
- "SWA (Steel Wire Armoured)"
- "FP200 Fire Resistant"
- "Singles in PVC Conduit"

NEVER suggest Twin & Earth (6242Y) for commercial or industrial installations.

OUTPUT STRUCTURE:
{
  "installationGuide": "High-level overview paragraph",
  
  "executiveSummary": {
    "cableType": "e.g. Twin & Earth, SWA, LSZH Singles in Conduit",
    "cableSize": "e.g. 2.5mm², 4mm², 6mm²",
    "runLength": "e.g. 25m, 15m total run length",
    "installationMethod": "e.g. Clipped direct to masonry, In steel conduit, In trunking",
    "supplyType": "e.g. Single phase 230V, Three phase 400V",
    "protectiveDevice": "e.g. 32A Type B MCB, 40A 30mA RCBO",
    "voltageDrop": "PASS/FAIL with calculation (e.g. PASS - 3.2V drop)",
    "zsRequirement": "e.g. 1.44Ω max per BS 7671 Table 41.3",
    "purpose": "Brief description of installation purpose and context"
  },
  
  "materialsList": [
    {
      "description": "Material name (e.g. Twin and Earth Cable)",
      "specification": "Technical specification (e.g. 6242Y 2.5mm², BS EN 60898)",
      "quantity": "Numeric quantity (e.g. 30)",
      "unit": "Unit of measure (m/sets/pcs/boxes)",
      "notes": "Any special notes or alternatives"
    }
  ],
  
  "testingRequirements": [
    {
      "description": "Test name (e.g. Continuity of protective conductors)",
      "regulation": "BS 7671 regulation reference (e.g. Reg 643.2.2)",
      "expectedReading": "Expected test result (e.g. <0.5Ω)",
      "passRange": "Acceptable range or pass criteria"
    }
  ],
  
  "steps": [
    {
      "stepNumber": 1,
      "title": "Step title",
      "content": "Detailed step description",
      "safety": [
        "Support cables using steel containment or fire-resistant fixings to prevent collapse in fire (Reg 521.10.202)",
        "Reinstate fire barriers at all penetrations through fire-rated walls/floors (Reg 527.2)",
        "Verify safe isolation before working on live equipment (Reg 132.10)"
      ],
      "toolsRequired": ["Tool 1", "Tool 2"],
      "materialsNeeded": ["Material 1", "Material 2"],
      "estimatedDuration": "15-30 minutes",
      "riskLevel": "low|medium|high",
      "inspectionCheckpoints": ["Check 1", "Check 2"],
      "linkedHazards": [
        "Electric shock from live parts",
        "Working at height when routing cables",
        "Manual handling injury from heavy equipment"
      ],
      "bsReferences": [
        "BS 7671 Reg 132.10 - Safe isolation procedure",
        "BS 7671 Reg 521.10.202 - Fire-resistant cable support",
        "BS 7671 Reg 411.3.3 - RCD protection"
      ]
    }
  ],
  "summary": {
    "totalSteps": 12,
    "estimatedDuration": "2-3 hours",
    "requiredQualifications": ["Qualification 1"],
    "toolsRequired": ["All tools needed"],
    "materialsRequired": ["All materials needed"],
    "overallRiskLevel": "medium"
  }
}

REQUIREMENTS (ENHANCED MODE - EXACTLY 15 STEPS):

- Generate exactly 15 detailed installation steps covering the FULL lifecycle:
  * Steps 1-2: Preparation (site survey, risk assessment, safe isolation, permits)
  * Steps 3-6: First fix work (containment installation, cable routing, supports)
  * Steps 7-11: Second fix work (terminations, connections, accessories, labelling)
  * Steps 12-14: Testing and verification (continuity, IR, Zs, RCD tests)
  * Step 15: Commissioning, final inspection, and handover documentation

- Each step MUST include:
  * 100-150 word detailed description with specific technical guidance
  * All measurements, tool settings, torque values, test readings
  * Step-by-step procedural instructions within the content
  * 2-4 safety considerations specific to that step
  * 2-4 safety considerations specific to that step
  * 3-5 tools required for that specific step
  * 2-4 materials needed for that step
  * 2-4 linkedHazards identifying specific risks (e.g., "Electric shock from exposed terminals", "Working at height above 2m", "Manual handling injury")
  * 2-4 bsReferences with BS 7671 regulations (e.g., "BS 7671 Reg 521.10.202 - Cable support", "BS 7671 Reg 411.3.3 - RCD protection")
  * Realistic time estimate (e.g., "20-30 minutes", "1-2 hours")
  * Risk level assessment (low/medium/high)
  * 1-3 inspection checkpoints to verify proper completion

- CRITICAL: Each safety consideration MUST include the relevant BS 7671 regulation reference in brackets at the end
- Use the format: "Safety instruction text (Reg XXX.XX.XXX)" or "Safety instruction text (Reg XXX.XX)"
- Common regulation references to include in safety notes:
  * Cable support for fire resistance: (Reg 521.10.202) - wiring systems must not collapse in fire
  * Fire barriers/sealing at penetrations: (Reg 527.2) - maintain compartmentation
  * Safe isolation: (Reg 132.10), (Reg 132.15)
  * Cable routing/support: (Reg 521.5), (Reg 522.8.3)
  * Earth connections: (Reg 544.1)
  * RCD protection: (Reg 411.3.3)
  * Cable bending radius: (Reg 522.8.3)
  * External influences: (Reg 522.6)
  * IP ratings: (Reg 512.2)
  * Circuit arrangement: (Reg 314.1)
  * Protective bonding: (Reg 411.3.1.2)

⚠️ OUTDOOR CABLE REQUIREMENT: For ANY outdoor installation (EV chargers, external garages, sheds, summerhouses, outbuildings) - ALWAYS use SWA (Steel Wire Armoured) cable, NOT Twin & Earth. SWA is required for mechanical protection and direct burial capability. Include installation depth (450mm minimum), warning tape, and proper gland termination in installation steps.

- EXECUTIVE SUMMARY: Must extract key design specifications from query/context:
  * cableType: Exact cable description (e.g., "2.5mm² Twin & Earth 6242Y")
  * cableSize: Cable conductor size (e.g., "2.5mm²")
  * runLength: Total cable run distance (e.g., "25m")
  * installationMethod: Installation technique (e.g., "Clipped direct to masonry")
  * supplyType: Supply configuration (e.g., "Single phase 230V")
  * protectiveDevice: Protection device specification (e.g., "32A Type B MCB")
  * voltageDrop: Compliance status with calculation
  * zsRequirement: Maximum Zs value per BS 7671 tables
  * purpose: Brief context of what's being installed

- MATERIALS LIST: Generate comprehensive materials with structured data:
  * description: Clear material name (e.g., "Twin and Earth Cable", "32A MCB Type B")
  * specification: Technical spec (e.g., "6242Y 2.5mm²", "BS EN 60898")
  * quantity: Numeric value extracted from context (e.g., 30, 5, 1)
  * unit: Appropriate unit (metres, sets, pcs, boxes, rolls)
  * notes: Any special requirements or alternatives
  * Include cables, protection devices, accessories, fixings, consumables

- TESTING REQUIREMENTS: Generate BS 7671 Part 6 test requirements:
  * description: Test name (e.g., "Continuity of protective conductors", "Insulation resistance")
  * regulation: Specific BS 7671 regulation (e.g., "Reg 643.2.2", "Reg 643.3")
  * expectedReading: Expected result based on installation (e.g., "<0.5Ω", ">1MΩ at 500V")
  * passRange: Pass criteria (e.g., "R1+R2 must be less than maximum Zs", "Minimum 1MΩ")
  * Include: continuity, insulation resistance, polarity, Zs, RCD tests as applicable


- Include specific BS 7671 regulation references throughout
- Provide realistic time estimates for each step
- List ALL tools and materials needed per step
- Highlight safety-critical steps with detailed precautions
- Use metric measurements (mm, metres)
- UK English spelling throughout (metres, colour, earthing not grounding)
- Respond in valid JSON format only`;

  const userPrompt = `Generate installation method for: ${request.query}

${request.projectDetails ? `
PROJECT DETAILS:
- Project: ${request.projectDetails.projectName || 'N/A'}
- Location: ${request.projectDetails.location || 'N/A'}
- Type: ${request.projectDetails.installationType || 'domestic'}
${(request.projectDetails.installationType === 'commercial' || request.projectDetails.installationType === 'industrial') 
  ? `\n⚠️ CABLE REQUIREMENT: DO NOT use Twin & Earth. Use singles in containment or SWA only.` 
  : ''}
` : ''}

${request.designerContext ? `
DESIGNER CONTEXT:
${JSON.stringify(request.designerContext, null, 2)}
` : ''}

PRACTICAL WORK INTELLIGENCE:
${ragContext.practicalWork.slice(0, 15).map((pw: any, i: number) => 
  `${i + 1}. ${pw.activity_description || pw.task_name} (${pw.trade})`
).join('\n')}

RELEVANT REGULATIONS:
${ragContext.regulations.slice(0, 10).map((reg: any, i: number) =>
  `${i + 1}. ${reg.regulation_number}: ${reg.primary_topic}`
).join('\n')}`;

  const maxTokens = 14000;  // Sufficient for exactly 15 steps at 100-150 words each
  console.log(`🤖 Starting GPT-5 Mini AI generation (${maxTokens} max_completion_tokens for 15 steps, ~4 minutes)...`);
  
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-5-mini-2025-08-07',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      response_format: { type: 'json_object' },
      max_completion_tokens: maxTokens
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('❌ OpenAI API error:', response.status, errorText.substring(0, 500));
    throw new Error(`OpenAI API error (${response.status}): ${errorText.substring(0, 200)}`);
  }

  const data = await response.json();

  // Debug: Log the raw response
  console.log('📋 OpenAI Response:', {
    hasChoices: !!data.choices,
    choicesLength: data.choices?.length,
    finishReason: data.choices?.[0]?.finish_reason,
    hasContent: !!data.choices?.[0]?.message?.content,
    contentLength: data.choices?.[0]?.message?.content?.length,
    usage: data.usage
  });

  // Validate response structure
  if (!data.choices || data.choices.length === 0) {
    console.error('❌ No choices in OpenAI response:', JSON.stringify(data).substring(0, 500));
    throw new Error('OpenAI returned no choices');
  }

  const message = data.choices[0].message;

  // Check for refusal (GPT-5 safety feature)
  if (message.refusal) {
    console.error('❌ OpenAI refused:', message.refusal);
    throw new Error(`OpenAI refused: ${message.refusal}`);
  }

  const content = message.content;

  // Validate content exists
  if (!content || content.trim().length === 0) {
    console.error('❌ Empty content from OpenAI. Finish reason:', data.choices[0].finish_reason);
    console.error('📊 Usage:', JSON.stringify(data.usage));
    throw new Error(`Empty response from OpenAI (finish_reason: ${data.choices[0].finish_reason})`);
  }

  console.log(`✅ OpenAI response received: ${content.length} chars`);

  // Parse with error handling
  try {
    return JSON.parse(content);
  } catch (parseError: any) {
    console.error('❌ JSON parse failed:', parseError.message);
    console.error('📋 Raw content (first 500 chars):', content.substring(0, 500));
    throw new Error(`Failed to parse OpenAI JSON: ${parseError.message}`);
  }
}
