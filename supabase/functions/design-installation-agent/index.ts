import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { searchPracticalWorkIntelligence } from '../_shared/rag-practical-work.ts';
import { searchRegulationsIntelligence } from '../_shared/intelligence-search.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { jobId, designedCircuits, supply, projectInfo } = await req.json();

    if (!jobId || !designedCircuits) {
      return new Response(
        JSON.stringify({ error: 'jobId and designedCircuits are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('🔧 Design Installation Agent START', { 
      jobId,
      circuitCount: designedCircuits.length,
      receivedActualSpecs: true 
    });

    // Update job: Installation agent starting
    await supabase
      .from('circuit_design_jobs')
      .update({
        installation_agent_status: 'processing',
        installation_agent_progress: 5,
        current_step: 'Generating installation guidance...'
      })
      .eq('id', jobId);

    // STEP 1: Extract keywords from DESIGNED circuits (actual specs)
    const keywords = extractDesignKeywords(designedCircuits, supply, projectInfo);
    console.log(`📝 Extracted ${keywords.size} keywords from DESIGNED circuits`);

    // Update progress
    await supabase
      .from('circuit_design_jobs')
      .update({ installation_agent_progress: 15 })
      .eq('id', jobId);

    // STEP 2: Enhanced parallel RAG search with increased limits
    const ragStart = Date.now();
    const [practicalWorkResult, regulations] = await Promise.all([
      searchPracticalWorkIntelligence(supabase, {
        query: Array.from(keywords).slice(0, 40).join(' '),
        tradeFilter: 'installer',
        matchCount: 60  // Enhanced from 40 for 30% more context
      }),
      searchRegulationsIntelligence(supabase, {
        keywords: Array.from(keywords),
        appliesTo: ['all installations', 'installation work', 'electrician', 'installer', 'electrical contractor'],
        categories: [
          'installation', 'testing', 'inspection', 'earthing', 'protection',
          'cables', 'wiring systems', 'termination', 'containment',
          'special locations', 'isolation', 'verification', 'certification',
          'safety', 'tools', 'commissioning', 'fault finding'
        ],  // Expanded from 5 to 17 categories
        limit: 50  // Enhanced from 30 for richer RAG context
      })
    ]);

    const ragTime = Date.now() - ragStart;
    
    // Enhanced RAG coverage logging
    const practicalTopics = practicalWorkResult.results.slice(0, 10).map(r => r.primary_topic || r.description).join(', ');
    const regulationCategories = [...new Set(regulations.slice(0, 10).map(r => r.category))].join(', ');
    const toolsMentioned = [...new Set(practicalWorkResult.results.flatMap(r => r.tools_required || []))].slice(0, 15).join(', ');
    
    console.log(`⚡ RAG complete in ${ragTime}ms:`, {
      practicalWork: practicalWorkResult.results.length,
      regulations: regulations.length,
      quality: practicalWorkResult.qualityScore.toFixed(1),
      topPracticalTopics: practicalTopics,
      topRegulationCategories: regulationCategories,
      identifiedTools: toolsMentioned
    });

    // Update progress
    await supabase
      .from('circuit_design_jobs')
      .update({ 
        installation_agent_progress: 40,
        current_step: 'Analyzing installation requirements...'
      })
      .eq('id', jobId);

    // STEP 3: Generate circuit-specific installation guidance
    const aiStart = Date.now();
    
    // Initial progress update
    await supabase
      .from('circuit_design_jobs')
      .update({ 
        installation_agent_progress: 50,
        current_step: 'Generating circuit-specific installation guidance...'
      })
      .eq('id', jobId);
    
    const installationGuidance = await generateInstallationGuidance(
      designedCircuits,
      supply,
      projectInfo,
      practicalWorkResult.results,
      regulations
    );
    const aiTime = Date.now() - aiStart;

    console.log(`✅ Circuit-specific guidance complete in ${aiTime}ms`);

    // Update progress
    await supabase
      .from('circuit_design_jobs')
      .update({ installation_agent_progress: 90 })
      .eq('id', jobId);

    // STEP 4: Save to database and mark ENTIRE job complete
    await supabase
      .from('circuit_design_jobs')
      .update({
        installation_agent_status: 'complete',
        installation_agent_progress: 100,
        installation_guidance: installationGuidance,
        status: 'complete', // Mark entire job complete (both phases done)
        progress: 100,
        current_step: 'Design and installation guidance complete!',
        completed_at: new Date().toISOString()
      })
      .eq('id', jobId);

    console.log('✅ Design Installation Agent COMPLETE', { 
      jobId,
      totalTime: Date.now() - ragStart,
      ragTime,
      aiTime
    });

    return new Response(
      JSON.stringify({ 
        success: true,
        installationGuidance,
        metadata: {
          ragTime,
          aiTime,
          totalTime: Date.now() - ragStart
        }
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('❌ Design Installation Agent failed:', error);
    
    // Update job with failure
    try {
      const { jobId } = await req.json();
      if (jobId) {
        const supabase = createClient(
          Deno.env.get('SUPABASE_URL')!,
          Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
        );
        
        await supabase
          .from('circuit_design_jobs')
          .update({
            installation_agent_status: 'failed',
            current_step: `Installation guidance failed: ${error.message}`
          })
          .eq('id', jobId);
      }
    } catch (updateError) {
      console.error('Failed to update job with error:', updateError);
    }

    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function extractDesignKeywords(designedCircuits: any[], supply: any, projectInfo: any): Set<string> {
  const keywords = new Set<string>();
  
  // ============================================================
  // 1️⃣ INSTALLATION ACTIVITY KEYWORDS (50+ keywords)
  // ============================================================
  const INSTALLATION_ACTIVITY = {
    preparation: ['site survey', 'risk assessment', 'isolation', 'safe isolation', 'proving unit', 'lock off', 'lockout', 'permit to work', 'method statement', 'toolbox talk', 'RAMS', 'isolation procedure'],
    cable_work: ['cable pulling', 'cable routing', 'cable run', 'containment', 'conduit', 'trunking', 'cable tray', 'cable clips', 'cable ties', 'gland', 'gland plate', 'stuffing gland', 'compression gland', 'CW gland', 'BW gland', 'cable support', 'fixing centres', 'cable management'],
    termination: ['termination', 'connection', 'crimping', 'ferrule', 'bootlace', 'cable lug', 'terminal', 'connector block', 'wago', 'screw terminal', 'strip length', 'torque setting', 'torque wrench', 'conductor preparation'],
    mounting: ['mounting', 'fixing', 'back box', 'pattress', 'flush mount', 'surface mount', 'bracket', 'rawl plug', 'wall plug', 'masonry fixing', 'plasterboard fixing', 'cavity fixing'],
    first_fix: ['first fix', 'carcass', 'back boxes', 'containment', 'cable routes', 'notching', 'drilling', 'cable zones', 'chasing', 'cable runs'],
    second_fix: ['second fix', 'final connections', 'face plates', 'accessories', 'labelling', 'circuit identification', 'commissioning', 'energising']
  };

  // ============================================================
  // 2️⃣ TESTING & INSPECTION KEYWORDS (60+ keywords)
  // ============================================================
  const TESTING_KEYWORDS = {
    dead_tests: ['dead testing', 'continuity', 'R1+R2', 'ring continuity', 'figure of eight', 'CPC continuity', 'end-to-end', 'long lead', 'low resistance ohmmeter', 'protective conductor', 'earth continuity'],
    insulation: ['insulation resistance', 'IR test', 'megger', '500V test', '250V test', 'between live conductors', 'live to earth', '1 MΩ', '2 MΩ', 'insulation test', 'mega ohm'],
    polarity: ['polarity', 'polarity check', 'correct polarity', 'phase identification', 'L1 L2 L3', 'polarity testing'],
    earth_fault_loop: ['Zs', 'Ze', 'earth fault loop', 'loop impedance', 'maximum Zs', 'external earth fault loop', 'Table 41.2', 'Table 41.3', 'disconnection time', '0.4s', '5s', 'fault loop impedance'],
    rcd_tests: ['RCD test', 'trip time', 'trip current', '30mA test', '0.5 I∆n', 'I∆n', 'no trip', '40ms', '200ms', '300ms', 'ramp test', 'residual current', 'RCD operation'],
    functional: ['functional test', 'operation test', 'switching', 'interlocks', 'pilot lamp', 'operational testing'],
    pfc: ['PFC', 'PSCC', 'prospective fault current', 'fault level', 'breaking capacity', 'prospective short circuit current'],
    verification: ['initial verification', 'periodic inspection', 'EICR', 'EIC', 'schedule of test results', 'schedule of inspections', 'electrical installation certificate', 'minor works certificate']
  };

  // ============================================================
  // 3️⃣ TOOLS & EQUIPMENT KEYWORDS (70+ keywords)
  // ============================================================
  const TOOLS_KEYWORDS = {
    test_instruments: ['multifunction tester', 'MFT', 'Megger', 'Fluke', 'loop tester', 'insulation tester', 'RCD tester', 'earth fault loop tester', 'low resistance ohmmeter', 'proving unit', 'voltage indicator', 'two-pole tester', 'GS38', 'test leads', 'probes', 'clamp meter', 'multimeter', 'phase rotation meter', 'socket tester', 'earth spike', 'test equipment'],
    hand_tools: ['screwdriver', 'insulated screwdriver', 'VDE screwdriver', 'side cutters', 'cable cutters', 'wire strippers', 'cable stripper', 'pliers', 'long nose pliers', 'crimping tool', 'ratchet crimper', 'cable knife', 'junior hacksaw', 'tape measure', 'spirit level', 'torch', 'head torch', 'adjustable spanner'],
    power_tools: ['drill', 'SDS drill', 'impact driver', 'combi drill', 'angle grinder', 'jigsaw', 'chase cutter', 'reciprocating saw', 'hole saw', 'core drill', 'hammer drill'],
    cable_tools: ['cable rods', 'draw tape', 'fish tape', 'cable puller', 'cable lubricant', 'cable rollers', 'conduit bender', 'conduit threader', 'knockout punch', 'gland spanner', 'cable drum stand'],
    access_equipment: ['ladder', 'step ladder', 'extension ladder', 'platform', 'podium steps', 'scaffold tower', 'MEWP', 'cherry picker', 'working at height'],
    safety_equipment: ['PPE', 'safety glasses', 'insulated gloves', 'hard hat', 'safety boots', 'hi-vis', 'ear defenders', 'dust mask', 'knee pads', 'first aid kit', 'fire extinguisher', 'spill kit', 'personal protective equipment']
  };

  // ============================================================
  // 4️⃣ MATERIALS & COMPONENTS KEYWORDS (50+ keywords)
  // ============================================================
  const MATERIALS_KEYWORDS = {
    cables: ['twin and earth', 'T&E', '6242Y', 'SWA', 'armoured cable', 'flex', 'H07RN-F', 'XLPE', 'singles', 'conduit wire', 'fire resistant', 'FP200', 'data cable', 'Cat6', 'coax', 'LSF', 'LSOH'],
    cable_sizes: ['1mm²', '1.5mm²', '2.5mm²', '4mm²', '6mm²', '10mm²', '16mm²', '25mm²', '35mm²', '50mm²', '70mm²', '95mm²', '120mm²', '1mm', '1.5mm', '2.5mm', '4mm', '6mm', '10mm', '16mm', '25mm'],
    containment: ['conduit', 'PVC conduit', 'steel conduit', 'flexible conduit', 'trunking', 'mini trunking', 'dado trunking', 'cable tray', 'cable basket', 'cable ladder', 'galvanised trunking'],
    accessories: ['socket outlet', 'switch', 'dimmer', 'isolator', 'fused spur', 'connection unit', 'cooker control', 'shaver socket', 'ceiling rose', 'batten holder', 'downlight', 'light fitting'],
    distribution: ['consumer unit', 'distribution board', 'busbar', 'DIN rail', 'MCB', 'RCBO', 'RCD', 'main switch', 'isolator', 'surge protection', 'SPD', 'fuse board'],
    earthing: ['earth rod', 'earth clamp', 'earth bar', 'main earthing terminal', 'bonding conductor', 'earth labels', 'earth tape', 'earthing conductor', 'protective conductor', 'CPC']
  };

  // ============================================================
  // 5️⃣ SAFETY & COMPLIANCE KEYWORDS (40+ keywords)
  // ============================================================
  const SAFETY_KEYWORDS = {
    safe_isolation: ['safe isolation', 'isolation procedure', 'lock off', 'lockout tagout', 'LOTO', 'proving dead', 'test for dead', 'adjacent live', 'permit to work', 'voltage indicator', 'isolation points'],
    ppe: ['PPE', 'personal protective equipment', 'safety glasses', 'eye protection', 'insulated gloves', 'Class 0', 'safety boots', 'hard hat', 'hi-vis', 'hearing protection', 'arc flash protection'],
    hazards: ['electric shock', 'arc flash', 'fire risk', 'burns', 'working at height', 'manual handling', 'asbestos', 'sharp edges', 'trip hazard', 'confined space', 'live working'],
    regulations: ['BS 7671', 'Wiring Regulations', 'Part P', 'EAWR', 'Electricity at Work', 'CDM', 'HASWA', 'Health and Safety', 'risk assessment', 'method statement', 'RAMS', 'Building Regulations'],
    certification: ['EIC', 'EICR', 'Minor Works', 'Part P notification', 'building control', 'competent person', 'self-certification', 'electrical installation certificate']
  };

  // ============================================================
  // 6️⃣ SECTOR-SPECIFIC KEYWORDS (40+ keywords)
  // ============================================================
  const SECTOR_KEYWORDS = {
    domestic: ['domestic', 'dwelling', 'house', 'flat', 'consumer unit', 'ring final', 'radial', 'lighting circuit', 'cooker circuit', 'shower circuit', 'immersion', 'smoke alarm', 'Part P', 'notifiable work', 'residential'],
    commercial: ['commercial', 'office', 'shop', 'retail', 'distribution board', 'three-phase', 'sub-main', 'busbar', 'emergency lighting', 'fire alarm', 'data', 'structured cabling', 'business premises'],
    industrial: ['industrial', 'factory', 'warehouse', 'motor circuit', 'star-delta', 'DOL', 'VSD', 'isolation', 'emergency stop', 'interlocks', 'machinery', 'SWA', 'manufacturing', 'plant'],
    agricultural: ['agricultural', 'farm', 'barn', 'livestock', 'equipotential bonding', 'IP rating', 'moisture', 'corrosion', 'farming'],
    outdoor: ['outdoor', 'external', 'garden', 'IP65', 'IP66', 'weatherproof', 'UV resistant', 'underground', 'armoured', 'exterior']
  };

  // ============================================================
  // 7️⃣ SPECIAL LOCATIONS KEYWORDS (40+ keywords)
  // ============================================================
  const SPECIAL_LOCATIONS_KEYWORDS = {
    bathroom: ['bathroom', 'Zone 0', 'Zone 1', 'Zone 2', 'outside zones', 'IP rating', 'IPX4', 'IPX5', 'SELV', 'supplementary bonding', '30mA RCD', 'shaver socket', 'extractor fan', 'zones', 'wet room'],
    kitchen: ['kitchen', 'cooking appliance', 'cooker circuit', 'cooker control', 'hob', 'oven', 'extractor', 'waste disposal', 'food preparation'],
    garage: ['garage', 'outbuilding', 'shed', 'workshop', 'SWA', 'armoured', 'isolation', 'RCD protection', 'ancillary building'],
    garden: ['garden', 'outdoor', 'pond pump', 'garden lighting', 'IP65', 'weatherproof', 'underground cable', 'warning tape', 'exterior lighting'],
    loft: ['loft', 'attic', 'roof space', 'thermal insulation', 'derating', 'junction box', 'maintenance free', 'accessible', 'roof void']
  };

  // ============================================================
  // 8️⃣ CIRCUIT-SPECIFIC KEYWORDS (60+ keywords)
  // ============================================================
  const CIRCUIT_KEYWORDS = {
    ring_final: ['ring final', '32A', '2.5mm²', 'socket circuit', 'twin and earth', 'figure of eight', 'ring continuity', 'spurs', 'fused spur', 'unfused spur', '100m² floor area', 'ring circuit'],
    radial: ['radial circuit', '20A', '32A', '2.5mm²', '4mm²', 'socket circuit', 'end fed', 'radial socket'],
    lighting: ['lighting circuit', '6A', '1.5mm²', 'loop-in', 'junction box', 'switch wire', 'switch drop', 'three-plate', 'ceiling rose', 'downlight', 'light fitting', 'pendant'],
    cooker: ['cooker circuit', '32A', '40A', '45A', '6mm²', '10mm²', 'cooker control unit', 'outlet plate', 'diversity', 'Table 4A', 'cooking appliance'],
    shower: ['shower circuit', '40A', '45A', '50A', '6mm²', '10mm²', 'dedicated circuit', 'pull cord', 'double pole isolator', 'IP rating', 'electric shower', 'shower unit'],
    ev_charger: ['EV charger', 'EVCP', '32A', '6mm²', '7kW', 'Mode 3', 'PME', 'earthing', 'TT', 'dedicated circuit', 'RCD Type A', 'electric vehicle'],
    smoke_alarm: ['smoke alarm', 'smoke detection', 'mains powered', 'battery backup', 'interlinked', 'ceiling mounted', 'BS 5839-6', 'fire detection'],
    immersion: ['immersion heater', '16A', '3kW', '2.5mm²', 'DP switch', 'flex outlet', 'cylinder stat', 'water heating'],
    boiler: ['boiler', 'central heating', '3A fuse', 'fused spur', 'programmer', 'room stat', 'cylinder stat', 'heating control'],
    outdoor: ['outdoor circuit', 'garden lighting', 'pond pump', 'armoured cable', 'IP65', 'weatherproof socket', 'RCD protection', 'external circuit']
  };

  // ============================================================
  // 9️⃣ FAULT FINDING KEYWORDS (30+ keywords)
  // ============================================================
  const FAULT_KEYWORDS = {
    symptoms: ['tripping', 'nuisance tripping', 'intermittent fault', 'no power', 'partial loss', 'overheating', 'burning smell', 'sparking', 'flickering', 'buzzing', 'humming', 'dead circuit'],
    tests: ['insulation resistance', 'continuity', 'earth fault', 'split load test', 'half split', 'IR test', 'live testing', 'thermal imaging', 'fault finding'],
    common_faults: ['earth fault', 'short circuit', 'open circuit', 'high resistance joint', 'loose connection', 'damaged cable', 'water ingress', 'rodent damage', 'overload', 'circuit fault']
  };

  // ============================================================
  // 🔟 THREE-PHASE & INDUSTRIAL KEYWORDS (30+ keywords)
  // ============================================================
  const THREE_PHASE_KEYWORDS = {
    basics: ['three-phase', '3-phase', '400V', '415V', 'line voltage', 'phase voltage', 'L1 L2 L3', 'neutral', 'star', 'delta', '√3', '1.732', 'three phase'],
    distribution: ['three-phase board', 'TP&N', 'busbar', 'balanced load', 'phase rotation', 'phase sequence', 'RYB', 'L1 L2 L3', '3-phase distribution'],
    motors: ['motor circuit', 'DOL', 'direct on line', 'star-delta', 'soft start', 'VSD', 'VFD', 'inverter', 'overload', 'contactor', 'isolator', 'motor starter'],
    testing: ['phase rotation meter', 'phase sequence', 'motor rotation', 'current balance', 'voltage balance', 'phase testing']
  };

  // ============================================================
  // ADD ALL CATEGORY KEYWORDS
  // ============================================================
  Object.values(INSTALLATION_ACTIVITY).flat().forEach(kw => keywords.add(kw));
  Object.values(TESTING_KEYWORDS).flat().forEach(kw => keywords.add(kw));
  Object.values(TOOLS_KEYWORDS).flat().forEach(kw => keywords.add(kw));
  Object.values(MATERIALS_KEYWORDS).flat().forEach(kw => keywords.add(kw));
  Object.values(SAFETY_KEYWORDS).flat().forEach(kw => keywords.add(kw));
  Object.values(SECTOR_KEYWORDS).flat().forEach(kw => keywords.add(kw));
  Object.values(SPECIAL_LOCATIONS_KEYWORDS).flat().forEach(kw => keywords.add(kw));
  Object.values(CIRCUIT_KEYWORDS).flat().forEach(kw => keywords.add(kw));
  Object.values(FAULT_KEYWORDS).flat().forEach(kw => keywords.add(kw));
  Object.values(THREE_PHASE_KEYWORDS).flat().forEach(kw => keywords.add(kw));

  // ============================================================
  // DYNAMIC KEYWORD INFERENCE FROM DESIGNED CIRCUITS
  // ============================================================
  designedCircuits.forEach((circuit: any) => {
    // Circuit name and type
    if (circuit.name) {
      const circuitName = circuit.name.toLowerCase();
      keywords.add(circuitName);
      
      // Infer circuit type keywords
      if (circuitName.includes('ring')) {
        CIRCUIT_KEYWORDS.ring_final.forEach(kw => keywords.add(kw));
      }
      if (circuitName.includes('cooker')) {
        CIRCUIT_KEYWORDS.cooker.forEach(kw => keywords.add(kw));
      }
      if (circuitName.includes('shower')) {
        CIRCUIT_KEYWORDS.shower.forEach(kw => keywords.add(kw));
      }
      if (circuitName.includes('lighting') || circuitName.includes('lights')) {
        CIRCUIT_KEYWORDS.lighting.forEach(kw => keywords.add(kw));
      }
      if (circuitName.includes('immersion')) {
        CIRCUIT_KEYWORDS.immersion.forEach(kw => keywords.add(kw));
      }
      if (circuitName.includes('ev') || circuitName.includes('charger')) {
        CIRCUIT_KEYWORDS.ev_charger.forEach(kw => keywords.add(kw));
      }
      if (circuitName.includes('smoke') || circuitName.includes('alarm')) {
        CIRCUIT_KEYWORDS.smoke_alarm.forEach(kw => keywords.add(kw));
      }
    }
    
    if (circuit.loadType) keywords.add(circuit.loadType.toLowerCase());
    
    // Location-based keywords
    if (circuit.location) {
      const location = circuit.location.toLowerCase();
      keywords.add(location);
      
      if (location.includes('bathroom') || location.includes('bath')) {
        SPECIAL_LOCATIONS_KEYWORDS.bathroom.forEach(kw => keywords.add(kw));
      }
      if (location.includes('kitchen')) {
        SPECIAL_LOCATIONS_KEYWORDS.kitchen.forEach(kw => keywords.add(kw));
      }
      if (location.includes('garage') || location.includes('shed')) {
        SPECIAL_LOCATIONS_KEYWORDS.garage.forEach(kw => keywords.add(kw));
      }
      if (location.includes('garden') || location.includes('outdoor')) {
        SPECIAL_LOCATIONS_KEYWORDS.garden.forEach(kw => keywords.add(kw));
        CIRCUIT_KEYWORDS.outdoor.forEach(kw => keywords.add(kw));
      }
      if (location.includes('loft') || location.includes('attic')) {
        SPECIAL_LOCATIONS_KEYWORDS.loft.forEach(kw => keywords.add(kw));
      }
    }
    
    // ACTUAL designed cable specification
    if (circuit.cableType) {
      keywords.add(circuit.cableType.toLowerCase());
      const cableSizeMatch = circuit.cableType.match(/(\d+(?:\.\d+)?)\s*mm/);
      if (cableSizeMatch) {
        keywords.add(`${cableSizeMatch[1]}mm cable`);
        keywords.add(`${cableSizeMatch[1]}mm² cable`);
      }
    }
    
    if (circuit.cableSize) {
      keywords.add(`${circuit.cableSize}mm cable`);
      keywords.add(`${circuit.cableSize}mm² cable`);
    }
    
    // ACTUAL protection device
    if (circuit.protectionDevice) {
      const device = circuit.protectionDevice;
      if (device.rating) {
        keywords.add(`${device.rating}A protection`);
        keywords.add(`${device.rating} amp`);
      }
      if (device.type) {
        const deviceType = device.type.toLowerCase();
        keywords.add(deviceType);
        
        // If RCD/RCBO, add RCD testing keywords
        if (deviceType.includes('rcd') || deviceType.includes('rcbo')) {
          TESTING_KEYWORDS.rcd_tests.forEach(kw => keywords.add(kw));
        }
      }
      if (device.curve) {
        keywords.add(`type ${device.curve}`.toLowerCase());
      }
    }
    
    // Installation method
    if (circuit.installationMethod) {
      keywords.add(circuit.installationMethod.toLowerCase());
    }
    
    // Load details
    if (circuit.loadDetails?.totalPower) {
      keywords.add(`${circuit.loadDetails.totalPower}W load`);
      keywords.add(`${Math.round(circuit.loadDetails.totalPower / 1000)}kW load`);
    }
  });

  // ============================================================
  // SUPPLY SYSTEM KEYWORDS
  // ============================================================
  if (supply?.voltage) {
    keywords.add(`${supply.voltage}V`);
  }
  if (supply?.phases) {
    keywords.add(`${supply.phases} phase`);
    keywords.add(`${supply.phases}-phase`);
    
    // If three-phase, add all three-phase keywords
    if (supply.phases === 3 || supply.phases === '3' || supply.phases === 'Three') {
      Object.values(THREE_PHASE_KEYWORDS).flat().forEach(kw => keywords.add(kw));
    }
  }
  if (supply?.earthingSystem) {
    keywords.add(supply.earthingSystem.toLowerCase());
  }

  // ============================================================
  // PROJECT CONTEXT KEYWORDS
  // ============================================================
  if (projectInfo?.type) {
    const projectType = projectInfo.type.toLowerCase();
    keywords.add(projectType);
    
    // Add sector-specific keywords
    if (projectType.includes('domestic') || projectType.includes('residential')) {
      SECTOR_KEYWORDS.domestic.forEach(kw => keywords.add(kw));
    }
    if (projectType.includes('commercial') || projectType.includes('office') || projectType.includes('shop')) {
      SECTOR_KEYWORDS.commercial.forEach(kw => keywords.add(kw));
    }
    if (projectType.includes('industrial') || projectType.includes('factory')) {
      SECTOR_KEYWORDS.industrial.forEach(kw => keywords.add(kw));
    }
  }

  console.log(`📊 Keyword Extraction Summary:
    - Total Keywords: ${keywords.size}
    - Installation Activities: ${Object.values(INSTALLATION_ACTIVITY).flat().length}
    - Testing & Inspection: ${Object.values(TESTING_KEYWORDS).flat().length}
    - Tools & Equipment: ${Object.values(TOOLS_KEYWORDS).flat().length}
    - Materials & Components: ${Object.values(MATERIALS_KEYWORDS).flat().length}
    - Safety & Compliance: ${Object.values(SAFETY_KEYWORDS).flat().length}
    - Sector-Specific: ${Object.values(SECTOR_KEYWORDS).flat().length}
    - Special Locations: ${Object.values(SPECIAL_LOCATIONS_KEYWORDS).flat().length}
    - Circuit-Specific: ${Object.values(CIRCUIT_KEYWORDS).flat().length}
    - Fault Finding: ${Object.values(FAULT_KEYWORDS).flat().length}
    - Three-Phase: ${Object.values(THREE_PHASE_KEYWORDS).flat().length}`);

  return keywords;
}

// Filter RAG results by circuit relevance
function filterRagForCircuit(items: any[], circuit: any): any[] {
  const cableSize = circuit.cableSize || extractCableSizeFromType(circuit.cableType);
  const loadType = (circuit.loadType || '').toLowerCase();
  const circuitName = (circuit.name || '').toLowerCase();
  
  return items.filter((item: any) => {
    const keywords = item.keywords || [];
    const content = (item.content || item.primary_topic || item.description || '').toLowerCase();
    
    // Check cable size relevance
    const cableSizeMatch = content.includes(`${cableSize}mm`) || 
                           keywords.some(k => k.includes(`${cableSize}mm`));
    
    // Check load type relevance
    const loadTypeMatch = content.includes(loadType) || 
                          keywords.some(k => k.toLowerCase().includes(loadType));
    
    // Check circuit name relevance
    const nameMatch = content.includes(circuitName) || 
                      keywords.some(k => k.toLowerCase().includes(circuitName));
    
    return cableSizeMatch || loadTypeMatch || nameMatch;
  });
}

function extractCableSizeFromType(cableType: string | undefined): number {
  if (!cableType) return 0;
  const match = cableType.match(/(\d+(?:\.\d+)?)\s*mm/);
  return match ? parseFloat(match[1]) : 0;
}

async function generateInstallationGuidancePerCircuit(
  circuit: any,
  circuitIndex: number,
  supply: any,
  projectInfo: any,
  allPracticalWork: any[],
  allRegulations: any[]
) {
  // Filter RAG results for this specific circuit (enhanced limits for 30% more detail)
  const relevantPracticalWork = filterRagForCircuit(allPracticalWork, circuit).slice(0, 15);
  const relevantRegulations = filterRagForCircuit(allRegulations, circuit).slice(0, 12);
  
  const protectionStr = circuit.protectionDevice 
    ? `${circuit.protectionDevice.rating}A Type ${circuit.protectionDevice.curve} ${circuit.protectionDevice.type}`
    : 'Not specified';
  
  const cableSpec = circuit.cableType || `${circuit.cableSize}mm² cable`;
  
  // Determine circuit-specific testing requirements
  const isRingFinal = circuit.name?.toLowerCase().includes('ring') || 
                      circuit.loadType?.toLowerCase().includes('ring') ||
                      circuit.justification?.toLowerCase().includes('ring final');
  
  const hasRCD = circuit.protectionDevice?.type?.toLowerCase().includes('rcbo') ||
                 circuit.protectionDevice?.type?.toLowerCase().includes('rcd') ||
                 circuit.rcdProtected === true;
  
  const systemPrompt = `You are an expert Installation Guidance Specialist for UK electrical installations.

## CRITICAL LANGUAGE REQUIREMENTS
- Use UK English spelling and terminology throughout
- Use "earthing" not "grounding"  
- Use "metres" not "meters"
- Use "centre" not "center"
- Use "utilise" not "utilize"
- Use "colour" not "color"
- British terms: "consumer unit", "earthing conductor", "protective conductor"

## SINGLE CIRCUIT TO INSTALL

**Circuit:** ${circuit.name}
**Designed Cable:** ${cableSpec} (ACTUAL designed specification)
**Designed Protection:** ${protectionStr} (ACTUAL designed device)
**Installation Method:** ${circuit.installationMethod || 'Method C - clipped direct'}
**Cable Length:** ${circuit.cableLength}m
**Load:** ${circuit.loadDetails?.totalPower || circuit.loadPower}W
**Location:** ${circuit.location || circuit.specialLocation || 'Not specified'}
**Ring Final Circuit:** ${isRingFinal ? 'YES - requires ring continuity testing' : 'NO'}
**RCD Protection:** ${hasRCD ? 'YES - requires RCD testing' : 'NO'}

## Supply System
- Voltage: ${supply?.voltage || '230'}V
- Phases: ${supply?.phases || 'Single'}
- Earthing: ${supply?.earthingSystem || 'TN-S'}

## FILTERED KNOWLEDGE BASE (relevant to ${cableSpec} and ${circuit.loadType})
- ${relevantPracticalWork.length} relevant practical procedures
- ${relevantRegulations.length} relevant BS 7671 regulations

## PRACTICAL WORK KNOWLEDGE:
${relevantPracticalWork.map((pw: any) => 
  `- ${pw.primary_topic}: ${pw.procedure_summary || pw.description || ''}`
).join('\n')}

## BS 7671 REGULATIONS:
${relevantRegulations.map((reg: any) => 
  `- ${reg.regulation_number}: ${(reg.content || reg.primary_topic || '').slice(0, 120)}`
).join('\n')}

## OUTPUT STRUCTURE (JSON):
{
  "executiveSummary": "2-3 paragraph overview SPECIFIC to this ${cableSpec} circuit installation",
  "safetyConsiderations": [
    {
      "consideration": "Safety requirement specific to this cable size/circuit",
      "toolsRequired": ["tool1", "tool2"],
      "bsReference": "BS 7671 regulation",
      "priority": "critical" | "high" | "medium"
    }
  ],
  "materialsRequired": [
    {
      "item": "Material name (EXACT ${cableSpec} specifications)",
      "specification": "Detailed spec",
      "quantity": "Quantity for ${circuit.cableLength}m run",
      "source": "UK supplier"
    }
  ],
  "toolsRequired": [
    {
      "tool": "Tool name",
      "purpose": "Why needed for ${cableSpec}",
      "category": "hand tool" | "test equipment" | "power tool"
    }
  ],
  "cableRouting": [
    {
      "step": "Routing instruction for ${cableSpec}",
      "cableType": "${cableSpec}",
      "method": "${circuit.installationMethod || 'Method C'}",
      "bsReference": "BS 7671 reference",
      "notes": "Bending radius, support spacing for ${cableSpec}"
    }
  ],
  "terminationRequirements": [
    {
      "location": "Where to terminate",
      "procedure": "Detailed termination for ${cableSpec} (stripping length, torque)",
      "toolsNeeded": ["tool1", "tool2"],
      "torqueSettings": "EXACT torque for ${cableSpec} (e.g., 1.5mm²: 1.2Nm, 10mm²: 3.5Nm)",
      "bsReference": "BS 7671 reference"
    }
  ],
  "installationProcedure": [
    {
      "stepNumber": 1,
      "title": "Step title for ${cableSpec}",
      "description": "Hands-on technical procedure SPECIFIC to ${cableSpec} (120-180 words with exact measurements, torques, stripping lengths)",
      "toolsForStep": ["tool1", "tool2"],
      "materialsForStep": ["${cableSpec}"],
      "bsReferences": ["regulation1"]
    }
  ],
  "testingRequirements": {
    "intro": "BS 7671 Part 6 testing requirements specific to this ${cableSpec} circuit",
    "tests": [
      {
        "testName": "Test name (e.g., Continuity of Protective Conductors)",
        "regulation": "BS 7671 regulation (e.g., Regulation 643.2)",
        "procedure": "Detailed step-by-step test procedure in UK English (4-6 sentences)",
        "expectedReading": "Expected value or range for this ${cableSpec} circuit",
        "acceptanceCriteria": "Pass/fail criteria from BS 7671",
        "toolsRequired": ["Test equipment needed"]
      }
    ],
    "recordingNote": "Recording and certification requirements"
  }
}

## CIRCUIT-SPECIFIC TESTING REQUIREMENTS:
${isRingFinal ? `
**RING FINAL CIRCUIT TESTING (MANDATORY):**
- Continuity of ring circuit conductors (line, neutral, CPC)
- End-to-end resistance of ring (R1, R2, Rn)
- Cross-connection test (socket outlets)
- Verification that resistance at each outlet is within acceptable limits
` : ''}
${hasRCD ? `
**RCD TESTING (MANDATORY for RCD/RCBO protected circuits):**
- RCD operation at rated residual current (IΔn)
- RCD operation at 5× rated residual current (5×IΔn)
- RCD trip time measurements
- Manual test button operation
` : ''}

**STANDARD TESTS (REQUIRED FOR ALL CIRCUITS):**
1. **Continuity of Protective Conductors (R1+R2)** - BS 7671 Regulation 643.2
2. **Insulation Resistance** - BS 7671 Regulation 643.3 (minimum 1.0 MΩ at 500V DC)
3. **Polarity** - BS 7671 Regulation 643.6
4. **Earth Fault Loop Impedance (Zs)** - BS 7671 Regulation 643.7
5. **Functional Testing** - BS 7671 Regulation 643.10

## CRITICAL REQUIREMENTS (Enhanced for 30% more detail):

**Installation Steps (MINIMUM 7-10 steps):**
- Generate 7-10 comprehensive installation steps SPECIFIC to ${cableSpec}
- Each step must be 150-200 words with exact measurements, torques, stripping lengths, fixing centres
- MANDATORY: FOLLOW FIRST FIX → SECOND FIX WORKFLOW ORDER:
  * Step 1: Preparation & Planning (isolation, tools, materials, route marking, safety)
  * Step 2: FIRST FIX - Cable Installation (install backboxes, conduit/trunking, pull ALL cables, fix cables to structure, label cables at both ends)
  * Steps 3 to N-1: Intermediate preparation work (measurements, additional preparations as needed)
  * Step N: SECOND FIX - All Terminations (strip and prepare cable ends, terminate at consumer unit, terminate at accessories/devices, torque settings)
  * Final Step(s): Testing & Commissioning
- DO NOT put cable pulling/installation after terminations - ALL cable installation MUST happen in Step 2 (First Fix)

**Tools Required (MINIMUM 8 tools across categories):**
- **Safe Isolation (minimum 3):** Voltage indicator (GS38 compliant), proving unit, lock-off devices
- **Preparation (minimum 2):** Cable stripper, side cutters, cable knife, junior hacksaw
- **Installation (minimum 2):** Drill/SDS, spirit level, tape measure, cable clips/ties
- **Termination (minimum 2):** Torque screwdriver with EXACT settings for ${cableSpec}, ferrule crimper
- **Testing (minimum 2):** MFT (multifunction tester), loop impedance tester, RCD tester

**Materials Required (MINIMUM 5-6 items with full specifications):**
- Each material must include: item name, full technical specification, exact quantity with wastage allowance, catalogue reference, UK supplier
- Example: "6242Y 2.5mm² T+E, brown outer sheath, BASEC approved, ${circuit.cableLength}m + 10% wastage, Ref: TLC6242Y2.5, CEF/Edmundson/Screwfix"

**Cable Routing (MINIMUM 3 detailed steps):**
- Preparation step (marking routes, checking zones)
- Routing step (installation method, support spacing, protection)
- Securing step (fixing centres, bend radius, labelling)

**Termination Requirements (MINIMUM 3 detailed procedures):**
- Consumer unit termination (stripping lengths, torque settings, labelling)
- Accessory termination (device connections, torque specifications)
- Earth connections (bonding, CPC terminations, earth bar connections)

**Safety Considerations (MINIMUM 3 specific requirements):**
- Each with specific toolsRequired, bsReference, and priority level
- Must include PPE requirements and safe isolation procedure

**Testing Requirements (MINIMUM 4-6 tests):**
- Include EXACT torque settings for this cable gauge (e.g., 1.5mm²: 1.2Nm, 2.5mm²: 1.5Nm, 10mm²: 3.5Nm)
- Include EXACT cable stripping lengths for ${cableSpec} (e.g., 2.5mm²: 12mm for terminals, 15mm for MCBs)
- Include specific bending radius for this cable diameter (minimum 8× cable diameter)
- Provide hands-on technical details an installer needs on-site
- Use ONLY UK English spelling and British electrical terminology
- Generate detailed test procedures with expected readings for ${cableSpec} and ${protectionStr}
- Include ring final tests if applicable, RCD tests if applicable
- All materials, tools, and procedures must be specific to ${cableSpec}, not generic

  const userPrompt = `Generate detailed installation guidance for this single ${cableSpec} circuit using UK English.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
      max_tokens: 4500  // Enhanced from 3000 for 30% more detailed output
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API failed for circuit ${circuitIndex + 1}: ${response.status} ${errorText}`);
  }

  const aiResponse = await response.json();
  const content = aiResponse.choices[0].message.content;
  
  return JSON.parse(content);
}

async function generateInstallationGuidance(
  designedCircuits: any[],
  supply: any,
  projectInfo: any,
  practicalWork: any[],
  regulations: any[]
) {
  console.log(`🔄 Generating circuit-specific guidance for ${designedCircuits.length} circuits in parallel...`);
  
  // Import safeAll for parallel execution
  const { safeAll } = await import('../_shared/safe-parallel.ts');
  
  // Create parallel tasks for each circuit
  const circuitTasks = designedCircuits.map((circuit, i) => ({
    name: `Circuit ${i + 1}: ${circuit.name}`,
    execute: async () => {
      console.log(`  📍 Starting Circuit ${i + 1}/${designedCircuits.length}: ${circuit.name} (${circuit.cableType || circuit.cableSize + 'mm²'})`);
      
      const guidance = await generateInstallationGuidancePerCircuit(
        circuit,
        i,
        supply,
        projectInfo,
        practicalWork,
        regulations
      );
      
      console.log(`  ✅ Circuit ${i + 1} guidance generated`);
      
      return {
        circuitIndex: i,
        circuitName: circuit.name,
        cableSpec: circuit.cableType || `${circuit.cableSize}mm²`,
        protection: circuit.protectionDevice,
        guidance: guidance
      };
    }
  }));
  
  // Execute all circuits in parallel
  const { successes, failures } = await safeAll(circuitTasks);
  
  console.log(`✅ Parallel generation complete: ${successes.length} succeeded, ${failures.length} failed`);
  
  // Build result object with all circuits
  const circuitGuidance: any = {};
  
  // Add successful circuits
  successes.forEach(({ result }) => {
    circuitGuidance[`circuit_${result.circuitIndex}`] = {
      circuitName: result.circuitName,
      cableSpec: result.cableSpec,
      protection: result.protection,
      guidance: result.guidance
    };
  });
  
  // Add failed circuits with error messages
  failures.forEach(({ name, error }) => {
    // Extract circuit index from name "Circuit X: ..."
    const match = name.match(/Circuit (\d+):/);
    const circuitIndex = match ? parseInt(match[1]) - 1 : -1;
    const circuit = designedCircuits[circuitIndex] || {};
    
    console.error(`  ❌ ${name} failed:`, error);
    
    circuitGuidance[`circuit_${circuitIndex}`] = {
      circuitName: circuit.name || 'Unknown',
      cableSpec: circuit.cableType || `${circuit.cableSize}mm²` || 'Unknown',
      protection: circuit.protectionDevice,
      error: error instanceof Error ? error.message : String(error)
    };
  });
  
  return circuitGuidance;
}
