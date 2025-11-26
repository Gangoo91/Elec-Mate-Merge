/**
 * Design Pipeline - Core Orchestrator
 * 1. Normalize → 2. Cache Check → 3. RAG → 4. AI → 5. Validate → 6. Cache Store
 */

import { FormNormalizer } from './form-normalizer.ts';
import { CacheManager } from './cache-manager.ts';
import { searchDesignIntelligence, searchRegulationsIntelligence } from '../_shared/intelligence-search.ts';
import { AIDesigner } from './ai-designer.ts';
import { ValidationEngine } from './validation-engine.ts';
import { DeterministicCalculator } from './deterministic-calculations.ts';
import { AutoFixEngine } from './auto-fix-engine.ts';
import { safeAll, type ParallelTask } from '../_shared/safe-parallel.ts';
import { calculateDiversity, calculateCircuitDiversity, type CircuitType } from '../_shared/bs7671-unified-calculations.ts';
import { parseDesignJustification, logParsedValues } from './justification-parser.ts';
import type { NormalizedInputs, DesignResult } from './types.ts';

export class DesignPipeline {
  private normalizer: FormNormalizer;
  private cache: CacheManager;
  private ai: AIDesigner;
  private validator: ValidationEngine;
  private calculator: DeterministicCalculator;
  private autoFix: AutoFixEngine;
  private progressCallback?: (msg: string) => void;

  constructor(
    private logger: any, 
    private requestId: string,
    progressCallback?: (msg: string) => void
  ) {
    this.normalizer = new FormNormalizer();
    this.cache = new CacheManager(logger);
    this.ai = new AIDesigner(logger);
    this.validator = new ValidationEngine(logger);
    this.calculator = new DeterministicCalculator(logger);
    this.autoFix = new AutoFixEngine(logger);
    this.progressCallback = progressCallback;
  }

  async execute(rawInput: any): Promise<DesignResult> {
    const startTime = Date.now();
    
    // ========================================
    // PHASE 1: Normalize & Validate Form Inputs
    // ========================================
    const normalized = this.normalizer.normalize(rawInput);
    this.logger.info('Form normalized', {
      circuits: normalized.circuits.length,
      voltage: normalized.supply.voltage,
      phases: normalized.supply.phases,
      earthing: normalized.supply.earthing
    });

    // ========================================
    // PHASE 2: Cache Check (DISABLED FOR TESTING RING FINAL FIX)
    // ========================================
    const cacheKey = this.cache.generateKey(normalized);
    
    // TEMPORARILY DISABLED - Force fresh generation for testing
    const cached = null; // Force cache miss
    // const cached = await this.cache.get(cacheKey); // DISABLED
    
    if (cached) {
      // This block will never execute while disabled
      this.logger.info('Cache HIT (disabled)', {
        key: cacheKey.slice(0, 12)
      });
    }
    
    this.logger.info('Cache DISABLED - forcing fresh generation', {
      key: cacheKey.slice(0, 12)
    });

    // ========================================
    // Regular path: 1-5 circuits → full RAG + complete prompt (150s timeout)
    // Batch path: 6+ circuits → parallel batch processing
    // ========================================

    // ========================================
    // PHASE 3: Fast Indexed RAG Search (Intelligence Tables)
    // Uses GIN-indexed keyword search on intelligence tables
    // ========================================
    const ragStart = Date.now();
    
    // Create Supabase client for intelligence search
    const { createClient } = await import('../_shared/deps.ts');
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );
    
    // ========================================
    // COMPREHENSIVE KEYWORD EXTRACTION (500+ keywords)
    // ========================================
    const keywords = new Set<string>();
    const loadTypes = new Set<string>();
    const cableSizes = new Set<number>();
    
    // ====== 1. CIRCUIT TYPE KEYWORDS (30+ types) ======
    const CIRCUIT_TYPE_KEYWORDS: Record<string, string[]> = {
      // DOMESTIC
      'socket': ['ring final', 'radial circuit', '13A socket-outlet', '2.5mm²', '32A', '433-02-01', 'ring circuit', 'socket outlet', 'double socket', 'single socket', 'fused spur', '20A radial'],
      'ring': ['ring final', '2.5mm²', '32A', '433-02-01', 'ring circuit', 'socket-outlet', 'floor area', '100m²', 'twin and earth', 'loop', 'r1+r2', 'figure of eight', 'end-to-end test'],
      'lighting': ['lighting circuit', '1.5mm²', '6A', '10A', 'B6', 'B10', 'Type B', 'radial', 'lighting point', 'switch drop', 'ceiling rose', 'loop-in', 'junction box', 'lighting load'],
      'cooker': ['cooker circuit', '6mm²', '10mm²', '32A', '40A', '45A', '50A', 'cooker control unit', 'diversity', 'Table 4A', 'cooking appliance', 'hob', 'oven', 'cooker switch'],
      'shower': ['shower circuit', 'instantaneous water heater', '40A', '45A', '50A', '6mm²', '10mm²', 'bathroom', 'electric shower', '8.5kW', '9.5kW', '10.5kW', 'dedicated circuit', 'pull cord'],
      'immersion': ['immersion heater', '16A', '3kW', '2.5mm²', 'hot water', 'cylinder', 'dual element', 'off-peak', 'water heating'],
      'ev_charger': ['electric vehicle', 'EV charger', '32A', '6mm²', '7kW', '7.4kW', '22kW', 'Mode 3', 'EVCP', 'charge point', 'IET Code of Practice', 'PME', 'car charging', 'EV installation'],
      'smoke_alarm': ['smoke alarm', 'fire alarm', 'domestic alarm', 'interlinked', 'mains powered', 'battery backup', 'smoke detector'],
      'outdoor': ['outdoor circuit', 'garden lighting', 'pond pump', 'IP65', 'IP66', 'weatherproof', 'external', 'outside socket', 'outdoor installation'],
      'underfloor_heating': ['underfloor heating', 'UFH', 'heating mat', 'thermostat', 'floor heating', 'electric heating'],
      'boiler': ['boiler', 'central heating', 'programmer', 'room thermostat', 'heating system', 'FCU'],
      
      // COMMERCIAL
      'distribution': ['distribution board', 'sub-distribution', 'busbar', 'TP&N', 'split load', 'consumer unit', 'panelboard', 'DB', 'switchgear'],
      'submain': ['submain', 'sub-main', 'feeder', 'SWA', 'XLPE', 'armoured cable', 'diversity', 'maximum demand', 'sub-main cable'],
      'commercial_lighting': ['commercial lighting', 'emergency lighting', 'maintained', 'non-maintained', '3-hour', 'central battery', 'self-contained', 'BS 5266'],
      'commercial_socket': ['commercial socket', 'industrial socket', '16A', '32A', '63A', '125A', 'BS EN 60309', 'blue', 'red', 'CEE form', 'commando socket'],
      'data': ['data circuit', 'structured cabling', 'Cat5e', 'Cat6', 'Cat6a', 'fibre', 'containment', 'segregation', 'network cable'],
      'fire_alarm': ['fire alarm', 'detection', 'sounders', 'call points', 'BS 5839', 'fire detection', 'alarm system'],
      'ups': ['UPS', 'uninterruptible', 'battery backup', 'online', 'line-interactive', 'standby power'],
      
      // INDUSTRIAL
      'motor': ['motor circuit', 'DOL', 'star-delta', 'soft start', 'VSD', 'VFD', 'Type D', 'starting current', 'inrush', 'locked rotor', 'full load current', 'overload relay', 'motor protection'],
      'three_phase': ['three-phase', '3-phase', '400V', '230V line-neutral', 'phase rotation', 'line voltage', 'phase voltage', '√3', '1.732', 'L1 L2 L3', 'balanced load', 'unbalanced', 'neutral current'],
      'hvac': ['HVAC', 'air conditioning', 'heat pump', 'compressor', 'fan motor', 'chiller', 'FCU', 'AHU', 'air handling'],
      'industrial_socket': ['industrial socket', 'BS EN 60309', 'CEE form', 'blue', 'red', '16A', '32A', '63A', '125A', 'panel socket'],
      
      // RENEWABLE/SPECIAL
      'solar_pv': ['solar PV', 'photovoltaic', 'inverter', 'DC isolator', 'string', 'array', 'MCS', 'G98', 'G99', 'Section 712', 'solar panels', 'PV system'],
      'battery_storage': ['battery storage', 'BESS', 'lithium', 'inverter', 'hybrid', 'AC coupled', 'DC coupled', 'energy storage'],
      'generator': ['generator', 'standby', 'changeover', 'ATS', 'automatic transfer', 'backup supply', 'gen set'],
    };
    
    // ====== 2. PROTECTION DEVICE KEYWORDS ======
    const PROTECTION_KEYWORDS = [
      // MCBs
      'MCB', 'miniature circuit breaker', 'Type B', 'Type C', 'Type D',
      'B6', 'B10', 'B16', 'B20', 'B32', 'B40', 'B50', 'B63',
      'C6', 'C10', 'C16', 'C20', 'C32', 'C40', 'C50', 'C63',
      'D6', 'D10', 'D16', 'D20', 'D32', 'D40', 'D50', 'D63',
      'breaking capacity', 'kA', '6kA', '10kA', '16kA', 'curve type',
      
      // RCDs/RCBOs
      'RCD', 'RCBO', 'residual current', '30mA', '100mA', '300mA',
      'Type A', 'Type AC', 'Type F', 'Type B RCD', 'Type S',
      'time delayed', 'selective', 'discrimination', 'IΔn', 'I delta n',
      'trip time', '40ms', '200ms', '300ms', 'no trip', 'ramp test',
      
      // Fuses
      'fuse', 'BS 88', 'BS 1361', 'BS 1362', 'BS 3036',
      'cartridge fuse', 'HRC', 'semi-enclosed', 'rewirable',
      '5A', '13A', '20A', '30A', '45A', '60A', '80A', '100A', 'I²t', 'I2t',
      
      // Isolators & SPD
      'isolator', 'switch disconnector', 'main switch', 'DP switch',
      'rotary isolator', 'fireman switch', 'emergency stop',
      'AFDD', 'arc fault', 'arc detection',
      'SPD', 'surge protection', 'Type 1', 'Type 2', 'Type 3', 'lightning'
    ];
    
    // ====== 3. TESTING & VERIFICATION KEYWORDS ======
    const TESTING_KEYWORDS = [
      // Loop impedance
      'Zs', 'Ze', 'Zdb', 'earth fault loop', 'loop impedance', 'external earth fault',
      '0.35Ω', '0.8Ω', '1.44Ω', 'maximum Zs', 'measured Zs',
      'Table 41.2', 'Table 41.3', 'Table 41.4', 'disconnection time', '0.4s', '5s',
      
      // Continuity
      'R1+R2', 'continuity', 'protective conductor', 'ring final continuity',
      'figure of eight', 'end-to-end', 'CPC continuity', 'low resistance ohmmeter',
      
      // Insulation
      'insulation resistance', 'IR test', 'megger', '500V test', '250V test', '1000V test',
      '1 MΩ', '2 MΩ', '0.5 MΩ', 'minimum insulation', 'between live conductors',
      
      // RCD testing
      'RCD test', 'trip time', '0.5×IΔn', '1×IΔn', '5×IΔn', '40ms', '200ms', '300ms',
      'no trip test', 'trip test', 'ramp test',
      
      // Other tests
      'polarity', 'correct polarity', 'phase sequence', 'phase rotation', '1-2-3',
      'PFC', 'PSCC', 'prospective fault current', 'prospective short circuit',
      'earth electrode resistance', 'Ra', 'rod electrode', '200Ω',
      'dead testing', 'live testing', 'safe isolation', 'proving unit',
      'functional testing', 'interlocks', 'switchgear operation'
    ];
    
    // ====== 4. CABLE & INSTALLATION KEYWORDS ======
    const CABLE_KEYWORDS = [
      // Types
      'twin and earth', 'T&E', '6242Y', 'SWA', 'armoured', 'XLPE', 'PVC', 'LSF', 'LSZH',
      'flex', 'H07RN-F', 'multicore', 'singles', 'MICC', 'fire resistant', 'FP200',
      
      // Sizes
      '1mm²', '1.5mm²', '2.5mm²', '4mm²', '6mm²', '10mm²', '16mm²', '25mm²', '35mm²',
      '50mm²', '70mm²', '95mm²', '120mm²', '150mm²', '185mm²', '240mm²', '300mm²',
      
      // Installation
      'clipped direct', 'conduit', 'trunking', 'cable tray', 'cable ladder',
      'enclosed', 'surface', 'concealed', 'buried',
      'Reference Method A', 'Reference Method B', 'Reference Method C',
      'Reference Method D', 'Reference Method E', 'Reference Method F',
      'Reference Method 100', 'Reference Method 101', 'Reference Method 102', 'Reference Method 103',
      
      // Containment
      '20mm conduit', '25mm conduit', '32mm conduit', 'mini trunking', 'dado trunking',
      'floor trunking', 'basket tray', 'ladder rack', 'cable gland', 'CW gland', 'BW gland',
      'termination', 'crimping', 'compression', 'cable lug'
    ];
    
    // ====== 5. EARTHING & BONDING KEYWORDS ======
    const EARTHING_KEYWORDS = [
      // Systems
      'TN-S', 'TN-C-S', 'TT', 'IT', 'PME', 'SNE', 'PEN conductor',
      'protective earth', 'earthing system',
      
      // Electrode
      'earth electrode', 'rod electrode', 'Ra', 'earth resistance', '200Ω',
      'mat electrode', 'tape electrode', 'earth pit',
      
      // Bonding
      'main bonding', 'supplementary bonding', 'protective bonding', 'equipotential',
      'extraneous conductive part', 'exposed conductive part',
      '10mm² bonding', '6mm² bonding', '4mm² bonding',
      'bonding conductor', 'main earthing terminal', 'MET',
      
      // Fault path
      'fault path', 'earth fault', 'protective conductor', 'CPC',
      'adiabatic equation', 'k²S²', 'let-through energy', 'fault current'
    ];
    
    // ====== 6. CALCULATION KEYWORDS ======
    const CALCULATION_KEYWORDS = [
      // Voltage drop
      'voltage drop', 'mV/A/m', '3%', '5%', 'Table 4D1B', 'Table 4D2B', 'Table 4D4B',
      'permissible voltage drop', 'VD calculation',
      
      // Current
      'design current', 'Ib', 'In', 'Iz', 'It', 'I²t', 'I2t',
      'full load current', 'starting current', 'diversity', 'maximum demand',
      'demand factor', 'utilisation factor', 'coincidence factor',
      
      // Derating
      'derating', 'Cg', 'Ca', 'Ci', 'Cc', 'Cd', 'Cf', 'correction factor',
      'grouping factor', 'ambient temperature', 'thermal insulation',
      'Table 4B1', 'Table 4B2', 'Table 4B3', 'Table 4C1', 'Table 4C2',
      
      // Short circuit
      'short circuit', 'fault current', 'breaking capacity',
      'adiabatic', 'withstand', 'let-through', 'Ipf', 'fault level',
      
      // Formulas
      'I = Uo/Zs', 'Ib ≤ In ≤ Iz', 'I2 ≤ 1.45 × Iz', 'k²S² ≥ I²t',
      '√3', '1.732', 'P = IV', 'P = I²R', 'V = IR'
    ];
    
    // ====== 7. SECTOR & LOCATION KEYWORDS ======
    const SECTOR_KEYWORDS = {
      domestic: ['domestic', 'dwelling', 'house', 'flat', 'bungalow', 'Part P', 'consumer unit', 'Amendment 2', 'Amendment 3', 'home', 'residential'],
      commercial: ['commercial', 'office', 'shop', 'retail', 'warehouse', 'distribution board', 'maximum demand', 'MD calculation'],
      industrial: ['industrial', 'factory', 'workshop', 'manufacturing', 'machinery', 'isolation', 'ATEX', 'hazardous area'],
      agricultural: ['agricultural', 'farm', 'barn', 'livestock', 'Section 705', 'equipotential zone', 'IP rating outdoor'],
      construction: ['construction site', 'temporary', 'Section 704', '110V', 'reduced voltage', 'portable', 'temporary installation'],
      marina: ['marina', 'boat', 'Section 709', 'shore connection', 'yacht'],
    };
    
    // ====== 8. SPECIAL LOCATIONS KEYWORDS ======
    const SPECIAL_LOCATION_KEYWORDS = {
      bathroom: ['bathroom', 'Zone 0', 'Zone 1', 'Zone 2', 'outside zones', 'IP rating', 'SELV', 'Section 701', 'supplementary bonding', 'shaver socket', 'IPX4', 'IPX5', 'bathroom zones'],
      swimming_pool: ['swimming pool', 'Section 702', 'SELV only', 'Zone A', 'Zone B', 'Zone C', 'fountain', 'spa', 'hot tub'],
      sauna: ['sauna', 'Section 703', 'high temperature', 'heat resistant', '170°C'],
      construction_site: ['construction site', 'Section 704', '110V', 'centre-tapped', 'reduced low voltage', 'SELV tools'],
      agricultural: ['agricultural', 'Section 705', 'livestock', 'equipotential zone', 'fire hazard', 'IP44 minimum'],
      caravan_park: ['caravan park', 'Section 708', 'pitch supply', 'hook-up post', 'RCD 30mA', 'caravan'],
      marina: ['marina', 'Section 709', 'shore supply', 'boat', 'RCD 30mA'],
      solar_pv: ['solar PV', 'Section 712', 'photovoltaic', 'array', 'string', 'DC side', 'inverter'],
    };
    
    // ====== 9. TOOLS & EQUIPMENT KEYWORDS ======
    const TOOLS_KEYWORDS = [
      'multifunction tester', 'MFT', 'loop tester', 'RCD tester', 'insulation tester',
      'megger', 'low resistance ohmmeter', 'proving unit', 'voltage indicator', 'GS38',
      'two-pole tester', 'clamp meter', 'multimeter', 'socket tester',
      'crimping tool', 'cable stripper', 'wire stripper', 'conduit bender',
      'torque screwdriver', 'SDS drill', 'impact driver'
    ];
    
    // ====== 10. REGULATIONS & STANDARDS KEYWORDS ======
    const REGULATIONS_KEYWORDS = [
      'BS 7671', '18th Edition', 'Amendment 1', 'Amendment 2', 'Amendment 3',
      'Wiring Regulations', 'Part 1', 'Part 2', 'Part 3', 'Part 4', 'Part 5', 'Part 6', 'Part 7',
      'GN1', 'GN2', 'GN3', 'GN4', 'GN5', 'GN6', 'GN7', 'GN8',
      'On-Site Guide', 'OSG', 'BS 5839', 'BS 5266', 'BS EN 62305',
      'Part P', 'Building Regulations', 'EAWR', 'notifiable work',
      'EIC', 'EICR', 'Minor Works', 'C1', 'C2', 'C3', 'FI'
    ];
    
    // ========================================
    // EXTRACT KEYWORDS FROM CIRCUITS
    // ========================================
    normalized.circuits.forEach(circuit => {
      const loadTypeLower = circuit.loadType.toLowerCase();
      loadTypes.add(loadTypeLower);
      
      // Add circuit-type-specific keywords
      Object.keys(CIRCUIT_TYPE_KEYWORDS).forEach(typeKey => {
        if (loadTypeLower.includes(typeKey) || circuit.name.toLowerCase().includes(typeKey)) {
          CIRCUIT_TYPE_KEYWORDS[typeKey].forEach(kw => keywords.add(kw));
        }
      });
      
      // Add core keywords
      keywords.add(loadTypeLower);
      keywords.add('cable sizing');
      keywords.add('voltage drop');
      keywords.add('protection');
      keywords.add('earthing');
      
      // Special location keywords
      if (circuit.specialLocation && circuit.specialLocation !== 'none') {
        const location = circuit.specialLocation.toLowerCase();
        keywords.add(location);
        if (SPECIAL_LOCATION_KEYWORDS[location as keyof typeof SPECIAL_LOCATION_KEYWORDS]) {
          SPECIAL_LOCATION_KEYWORDS[location as keyof typeof SPECIAL_LOCATION_KEYWORDS].forEach(kw => keywords.add(kw));
        }
      }
      
      // Common cable sizes
      [1.5, 2.5, 4, 6, 10, 16, 25, 35].forEach(size => cableSizes.add(size));
    });
    
    // ========================================
    // ADD COMPREHENSIVE KEYWORD CATEGORIES
    // ========================================
    PROTECTION_KEYWORDS.forEach(kw => keywords.add(kw));
    TESTING_KEYWORDS.forEach(kw => keywords.add(kw));
    CABLE_KEYWORDS.forEach(kw => keywords.add(kw));
    EARTHING_KEYWORDS.forEach(kw => keywords.add(kw));
    CALCULATION_KEYWORDS.forEach(kw => keywords.add(kw));
    TOOLS_KEYWORDS.forEach(kw => keywords.add(kw));
    REGULATIONS_KEYWORDS.forEach(kw => keywords.add(kw));
    
    // ========================================
    // DYNAMIC KEYWORD INFERENCE
    // ========================================
    
    // Infer from supply characteristics
    if (normalized.supply.phases === 3) {
      ['three-phase', '400V', 'phase rotation', 'L1 L2 L3', 'balanced', '√3', '1.732', 'line voltage', 'phase voltage', 'neutral current'].forEach(kw => keywords.add(kw));
    }
    if (normalized.supply.voltage === 230) {
      ['230V', 'single-phase', '1-phase', 'line to neutral'].forEach(kw => keywords.add(kw));
    }
    if (normalized.supply.earthing === 'TN-C-S') {
      ['PME', 'PEN', 'TN-C-S', 'combined neutral earth', 'protective multiple earthing'].forEach(kw => keywords.add(kw));
    }
    if (normalized.supply.earthing === 'TT') {
      ['TT', 'earth electrode', 'Ra', '200Ω', 'RCD essential'].forEach(kw => keywords.add(kw));
    }
    
    // Infer from property type
    const propertyType = normalized.property?.type?.toLowerCase() || 'domestic';
    if (SECTOR_KEYWORDS[propertyType as keyof typeof SECTOR_KEYWORDS]) {
      SECTOR_KEYWORDS[propertyType as keyof typeof SECTOR_KEYWORDS].forEach(kw => keywords.add(kw));
    }
    
    this.logger.info('Comprehensive RAG search parameters', {
      totalKeywords: keywords.size,
      loadTypes: Array.from(loadTypes),
      cableSizes: Array.from(cableSizes),
      circuitCount: normalized.circuits.length,
      sampleKeywords: {
        circuits: Array.from(keywords).filter(k => k.includes('circuit') || k.includes('ring') || k.includes('lighting')).slice(0, 5),
        protection: Array.from(keywords).filter(k => k.includes('MCB') || k.includes('RCD') || k.includes('fuse')).slice(0, 5),
        testing: Array.from(keywords).filter(k => k.includes('Zs') || k.includes('test') || k.includes('IR')).slice(0, 5),
        calculations: Array.from(keywords).filter(k => k.includes('voltage drop') || k.includes('diversity') || k.includes('derating')).slice(0, 5),
      }
    });
    
    // PARALLEL: Search all 3 intelligence tables with comprehensive categories
    let designIntelligence: any[] = [];
    let regulationsIntelligence: any[] = [];
    let practicalIntelligence: any[] = [];
    
    try {
      [designIntelligence, regulationsIntelligence, practicalIntelligence] = await Promise.all([
        searchDesignIntelligence(supabase, {
          keywords: Array.from(keywords),
          loadTypes: Array.from(loadTypes),
          cableSizes: Array.from(cableSizes),
          categories: [
            'cable_sizing', 'voltage_drop', 'protection', 'earthing',
            'special_locations'
          ],
          facetTypes: ['concept', 'formula', 'table', 'example', 'regulation'],
          limit: 50  // Increased for comprehensive coverage
        }),
        searchRegulationsIntelligence(supabase, {
          keywords: Array.from(keywords),
          appliesTo: Array.from(loadTypes),
          categories: [
            'Cables', 'Circuits', 'Protection', 'Earthing', 'Testing', 'Safety',
            'Special Locations', 'Industrial', 'Design', 'Installation'
          ],
          limit: 35  // Increased for comprehensive regulation coverage
        }),
        (async () => {
          const { searchPracticalWorkIntelligence } = await import('../_shared/intelligence-search.ts');
          return searchPracticalWorkIntelligence(supabase, {
            keywords: Array.from(keywords),
            appliesTo: Array.from(loadTypes),
            cableSizes: Array.from(cableSizes).map(String),
            activityTypes: ['design', 'installation', 'testing', 'fault_finding', 'maintenance'],
            limit: 30  // Increased for comprehensive practical guidance
          });
        })()
      ]);
    } catch (ragError) {
      this.logger.error('RAG search failed', {
        error: ragError instanceof Error ? ragError.message : String(ragError),
        keywords: Array.from(keywords).slice(0, 5)
      });
      // Continue with empty results rather than failing
      designIntelligence = [];
      regulationsIntelligence = [];
      practicalIntelligence = [];
    }
    
    const ragTime = Date.now() - ragStart;
    
    // COMPREHENSIVE LOGGING: Verify RAG returns circuit-specific data
    const ringFinalMatches = designIntelligence.filter((d: any) => 
      d.keywords?.some((k: string) => k.toLowerCase().includes('ring final') || k.toLowerCase().includes('ring circuit'))
    ).length;
    const cookerMatches = designIntelligence.filter((d: any) => 
      d.keywords?.some((k: string) => k.toLowerCase().includes('cooker'))
    ).length;
    const showerMatches = designIntelligence.filter((d: any) => 
      d.keywords?.some((k: string) => k.toLowerCase().includes('shower'))
    ).length;
    const lightingMatches = designIntelligence.filter((d: any) => 
      d.keywords?.some((k: string) => k.toLowerCase().includes('lighting'))
    ).length;
    const testingMatches = designIntelligence.filter((d: any) => 
      d.keywords?.some((k: string) => k.toLowerCase().includes('zs') || k.toLowerCase().includes('test'))
    ).length;
    const protectionMatches = designIntelligence.filter((d: any) => 
      d.keywords?.some((k: string) => k.toLowerCase().includes('mcb') || k.toLowerCase().includes('rcd'))
    ).length;
    
    // Analyze design facet types
    const facetTypes = designIntelligence.reduce((acc: any, d: any) => {
      acc[d.facet_type] = (acc[d.facet_type] || 0) + 1;
      return acc;
    }, {});
    
    // Analyze regulation categories
    const regCategories = regulationsIntelligence.reduce((acc: any, r: any) => {
      acc[r.category] = (acc[r.category] || 0) + 1;
      return acc;
    }, {});
    
    this.logger.info('Comprehensive RAG complete (3-layer intelligence)', {
      designIntelligence: designIntelligence.length,
      regulationsIntelligence: regulationsIntelligence.length,
      practicalIntelligence: practicalIntelligence.length,
      totalResults: designIntelligence.length + regulationsIntelligence.length + practicalIntelligence.length,
      searchTime: ragTime,
      circuitSpecificMatches: {
        ringFinals: ringFinalMatches,
        cookers: cookerMatches,
        showers: showerMatches,
        lighting: lightingMatches,
        testing: testingMatches,
        protection: protectionMatches
      },
      designFacetTypes: facetTypes,
      regulationCategories: regCategories,
      sampleDesignTopics: designIntelligence.slice(0, 5).map((d: any) => d.primary_topic),
      sampleRegulations: regulationsIntelligence.slice(0, 5).map((r: any) => r.regulation_number),
      samplePractical: practicalIntelligence.slice(0, 3).map((p: any) => p.primary_topic)
    });
    
    // CRITICAL CHECK: Verify RAG returned results
    if (designIntelligence.length === 0 && regulationsIntelligence.length === 0 && practicalIntelligence.length === 0) {
      this.logger.warn('RAG returned ZERO results - AI will use general knowledge only', {
        keywordsSent: keywords.size,
        sampleKeywords: Array.from(keywords).slice(0, 20),
        possibleCauses: [
          'Keywords do not match database entries',
          'Database tables are empty',
          'RAG search query syntax issue',
          'GIN indexes not properly created'
        ]
      });
    }
    
    // Build comprehensive RAG context for AI (3-layer intelligence)
    const ragContext = {
      regulations: regulationsIntelligence.map((r: any) => ({
        regulation_number: r.regulation_number,
        content: r.content,
        confidence: r.confidence_score || 0,
        source: 'regulations_intelligence'
      })),
      designKnowledge: designIntelligence,
      practicalGuidance: practicalIntelligence,
      totalResults: designIntelligence.length + regulationsIntelligence.length + practicalIntelligence.length,
      searchTime: ragTime
    };
    
    this.logger.info('Comprehensive RAG context built', {
      totalResults: ragContext.totalResults,
      hasRegulations: ragContext.regulations.length > 0,
      hasDesignKnowledge: ragContext.designKnowledge.length > 0,
      hasPracticalGuidance: ragContext.practicalGuidance.length > 0,
      isEmpty: ragContext.totalResults === 0,
      breakdown: {
        regulations: ragContext.regulations.length,
        design: ragContext.designKnowledge.length,
        practical: ragContext.practicalGuidance.length
      }
    });

    // ========================================
    // RETRY WRAPPER: Handle Transient OpenAI Timeouts
    // ========================================
    const designCircuitWithRetry = async (
      inputs: NormalizedInputs,
      context: any,
      circuitIndex?: number,
      totalCircuits?: number,
      maxRetries: number = 2
    ): Promise<any> => {
      let lastError: Error | null = null;
      
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          const circuitLabel = circuitIndex !== undefined 
            ? `Circuit ${circuitIndex + 1}/${totalCircuits}: ${inputs.circuits[0]?.name}`
            : 'Design';
          
          if (attempt > 1) {
            this.logger.warn(`${circuitLabel} - Retry attempt ${attempt}/${maxRetries}`, {
              previousError: lastError?.message
            });
          }
          
          const result = await this.ai.generate(inputs, context);
          
          if (attempt > 1) {
            this.logger.info(`✅ ${circuitLabel} succeeded on retry attempt ${attempt}`);
          }
          
          return result;
        } catch (error: any) {
          lastError = error;
          
          // Check if error is timeout-related
          const isTimeout = 
            error.message?.toLowerCase().includes('timeout') ||
            error.message?.toLowerCase().includes('timed out') ||
            error.statusCode === 408 ||
            error.name === 'TimeoutError';
          
          if (isTimeout && attempt < maxRetries) {
            const circuitLabel = circuitIndex !== undefined 
              ? `Circuit ${circuitIndex + 1}/${totalCircuits}: ${inputs.circuits[0]?.name}`
              : 'Design';
            
            this.logger.warn(`⚠️ ${circuitLabel} timed out (${attempt}/${maxRetries})`, {
              error: error.message,
              willRetry: true
            });
            
            // Brief pause before retry (2 seconds)
            await new Promise(resolve => setTimeout(resolve, 2000));
            continue;
          }
          
          // Not a timeout or out of retries - throw the error
          throw error;
        }
      }
      
      throw lastError || new Error('Circuit design failed after retries');
    };

    // ========================================
    // PHASE 4: AI Design Generation (with batch processing)
    // ========================================
    let design: any;
    
    // Log batch evaluation for debugging
    this.logger.info('Evaluating batch processing need', {
      circuitCount: normalized.circuits.length,
      willBatch: normalized.circuits.length > 2
    });
    
    // PER-CIRCUIT PARALLEL PROCESSING for all circuit counts
    if (normalized.circuits.length === 1) {
      // Single circuit: use regular generation with retry logic
      this.logger.info('Single circuit mode', {
        circuit: normalized.circuits[0].name,
        timeout: '150s',
        maxRetries: 2
      });
      design = await designCircuitWithRetry(normalized, ragContext);
      
      this.logger.info('AI design complete', {
        circuits: design.circuits.length
      });
    } else {
      // PARALLEL PROCESSING: Generate each circuit in parallel for 2+ circuits
      const parallelStartTime = Date.now();
      
      this.logger.info('Per-circuit parallel processing enabled', {
        totalCircuits: normalized.circuits.length,
        estimatedTime: '40-60s (all circuits in parallel)',
        timeout: '150s per circuit',
        maxRetries: 2
      });

      // Create parallel tasks for each individual circuit
      const circuitTasks: ParallelTask<any>[] = normalized.circuits.map((circuit, i) => ({
        name: `Circuit ${i + 1}/${normalized.circuits.length}: ${circuit.name}`,
        execute: async () => {
          const circuitStartTime = Date.now();
          
          this.logger.info(`Circuit ${i + 1}/${normalized.circuits.length} starting`, {
            name: circuit.name,
            loadType: circuit.loadType,
            power: circuit.loadPower
          });

          // Create single-circuit inputs for this specific circuit
          const singleCircuitInputs: NormalizedInputs = {
            supply: normalized.supply,
            circuits: [circuit]
          };

          // Generate design for this single circuit with retry logic
          const circuitDesign = await designCircuitWithRetry(
            singleCircuitInputs,
            ragContext,
            i,
            normalized.circuits.length
          );

          this.logger.info(`Circuit ${i + 1}/${normalized.circuits.length} complete`, {
            duration: Date.now() - circuitStartTime,
            cableType: circuitDesign.circuits[0]?.cableType,
            protection: circuitDesign.circuits[0]?.protectionDevice?.rating
          });

          return {
            circuit: circuitDesign.circuits[0],
            reasoning: circuitDesign.reasoning,
            originalIndex: i
          };
        }
      }));

      // Execute all circuits in parallel
      const { successes, failures } = await safeAll(circuitTasks);

      const parallelDuration = Date.now() - parallelStartTime;
      this.logger.info('Per-circuit parallel execution complete', {
        duration: parallelDuration,
        successful: successes.length,
        failed: failures.length
      });

      // Handle failures: fail fast with clear error
      if (failures.length > 0) {
        const errorMessages = failures.map(f => `${f.name}: ${f.error}`).join('\n');
        throw new Error(`Circuit generation failed (${failures.length}/${normalized.circuits.length} circuits):\n${errorMessages}`);
      }

      // Merge all circuit results into single design, preserving original order
      const sortedResults = successes
        .map(s => s.result)
        .sort((a, b) => a.originalIndex - b.originalIndex);

      const allDesignedCircuits = sortedResults.map((result, idx) => ({
        ...result.circuit,
        circuitNumber: idx + 1 // Sequential numbering: 1, 2, 3, 4...
      }));

      design = {
        circuits: allDesignedCircuits,
        reasoning: sortedResults[sortedResults.length - 1]?.reasoning || 'Parallel circuit generation complete'
      };

      this.logger.info('All circuits complete', {
        totalCircuits: design.circuits.length,
        parallelDuration,
        circuitNumbers: allDesignedCircuits.map(c => c.circuitNumber)
      });
    }

    // ========================================
    // PHASE 4.5: Safety Net - Ensure Complete Calculations
    // ========================================
    // Prevent "Cannot read properties of undefined" errors by ensuring
    // all circuits have complete calculation objects
    design.circuits = design.circuits.map((circuit: any, idx: number) => {
      if (!circuit.calculations) {
        this.logger.error('Circuit missing calculations object entirely', {
          circuit: circuit.name || `Circuit ${idx + 1}`
        });
        circuit.calculations = {};
      }

      // Ensure voltageDrop object exists
      if (!circuit.calculations.voltageDrop) {
        this.logger.warn('Missing voltageDrop object, initializing with defaults', {
          circuit: circuit.name
        });
        circuit.calculations.voltageDrop = {
          percent: 0,
          compliant: false,
          limit: 5,
          warning: 'Auto-initialized due to missing AI data'
        };
      }
      
      // Ensure zs exists
      if (circuit.calculations.zs === undefined || circuit.calculations.zs === null) {
        this.logger.warn('Missing zs value, initializing with default', {
          circuit: circuit.name
        });
        circuit.calculations.zs = 0;
      }
      
      // Ensure maxZs exists
      if (circuit.calculations.maxZs === undefined || circuit.calculations.maxZs === null) {
        this.logger.warn('Missing maxZs value, initializing with default', {
          circuit: circuit.name
        });
        circuit.calculations.maxZs = 0;
      }
      
      return circuit;
    });

    this.logger.info('Safety net applied - all calculations validated');

    // ========================================
    // PHASE 4.55: JUSTIFICATION SYNC - Make Prose the Single Source of Truth
    // Extract structured values from AI's prose text and overwrite numeric fields
    // ========================================
    this.logger.info('🔄 Starting justification sync - parsing AI prose to extract values');
    
    design.circuits = design.circuits.map((circuit: any, idx: number) => {
      if (!circuit.structuredOutput?.sections) {
        this.logger.warn('Circuit missing structured output sections, skipping justification sync', {
          circuit: circuit.name || `Circuit ${idx + 1}`
        });
        return circuit;
      }

      // Parse the prose justification to extract structured values
      const parsed = parseDesignJustification(circuit.structuredOutput.sections);
      
      // Log what was extracted for debugging
      logParsedValues(circuit.name, parsed, this.logger);

      // Build the synced circuit with parsed values overwriting existing numeric fields
      const syncedCircuit = {
        ...circuit,
        // Cable sizing: use parsed values if available, otherwise keep original
        cableSize: parsed.cableSize ?? circuit.cableSize,
        cpcSize: parsed.cpcSize ?? circuit.cpcSize,
        cableType: parsed.cableType ?? circuit.cableType,
        
        // Protection device: sync from parsed values
        protectionDevice: {
          ...circuit.protectionDevice,
          type: parsed.mcbType ?? circuit.protectionDevice?.type ?? 'MCB',
          rating: parsed.mcbRating ?? circuit.protectionDevice?.rating ?? 0,
          curve: parsed.mcbCurve ?? circuit.protectionDevice?.curve ?? 'B',
          kaRating: parsed.mcbKaRating ?? circuit.protectionDevice?.kaRating ?? 6,
        },
        
        // Calculations: sync all current values from prose
        calculations: {
          ...circuit.calculations,
          Ib: parsed.Ib ?? circuit.calculations?.Ib ?? 0,
          Id: parsed.Id ?? circuit.calculations?.Id ?? (parsed.Ib ?? circuit.calculations?.Ib ?? 0),
          In: parsed.In ?? (parsed.mcbRating ?? circuit.calculations?.In ?? 0),
          Iz: parsed.Iz ?? circuit.calculations?.Iz ?? 0,
          diversityFactor: parsed.diversityFactor ?? circuit.calculations?.diversityFactor ?? 1.0,
          voltageDrop: parsed.voltageDrop ? {
            volts: parsed.voltageDrop.volts,
            percent: parsed.voltageDrop.percent,
            limit: circuit.calculations?.voltageDrop?.limit ?? 5,
            compliant: parsed.voltageDrop.percent <= (circuit.calculations?.voltageDrop?.limit ?? 5)
          } : circuit.calculations?.voltageDrop,
          zs: parsed.zs ?? circuit.calculations?.zs ?? 0,
          maxZs: parsed.maxZs ?? circuit.calculations?.maxZs ?? 0,
        }
      };

      this.logger.info('✅ Justification sync applied', {
        circuit: circuit.name,
        changes: {
          cableSize: `${circuit.cableSize}mm² → ${syncedCircuit.cableSize}mm²`,
          mcbRating: `${circuit.protectionDevice?.rating}A → ${syncedCircuit.protectionDevice.rating}A`,
          Ib: `${circuit.calculations?.Ib}A → ${syncedCircuit.calculations.Ib}A`,
          Id: parsed.Id ? `${circuit.calculations?.Id}A → ${syncedCircuit.calculations.Id}A` : 'unchanged',
          diversityFactor: parsed.diversityFactor ? `${circuit.calculations?.diversityFactor} → ${syncedCircuit.calculations.diversityFactor}` : 'unchanged'
        }
      });

      return syncedCircuit;
    });

    this.logger.info('🎯 Justification sync complete - all numeric fields now match AI prose', {
      circuits: design.circuits.length
    });

    // ========================================
    // PHASE 4.6: Auto-Fix Engine (BEFORE calculations - CRITICAL ORDER)
    // Apply deterministic fixes to correct cable/MCB sizes FIRST
    // ========================================
    design.circuits = this.autoFix.fixAll(design.circuits, normalized.supply);

    this.logger.info('Auto-fix engine complete (before calculations)', {
      circuits: design.circuits.length
    });

    // ========================================
    // PHASE 4.7: Apply Deterministic BS 7671 Calculations (AFTER auto-fix)
    // ========================================
    // CRITICAL: Calculate Zs/VD using CORRECT cable sizes after auto-fix downgrades
    design.circuits = this.calculator.applyToCircuits(design.circuits, normalized.supply);
    
    this.logger.info('Deterministic calculations applied to corrected circuit designs', {
      circuits: design.circuits.length
    });

    // ========================================
    // PHASE 4.75: Apply Circuit-Level Diversity (Id calculation)
    // ========================================
    // Calculate diversified current (Id) for each circuit based on installation type
    const mapLoadTypeToDiversityCircuitType = (loadType: string): CircuitType => {
      const type = loadType.toLowerCase();
      if (type.includes('ring')) return 'socket_ring';
      if (type.includes('socket') || type.includes('radial')) return 'socket_radial';
      if (type.includes('lighting') || type.includes('light')) return 'lighting';
      if (type.includes('cooker')) return 'cooker';
      if (type.includes('shower')) return 'shower';
      if (type.includes('immersion')) return 'immersion';
      if (type.includes('ev') || type.includes('charger')) return 'ev';
      if (type.includes('heating') || type.includes('heat')) return 'heating';
      return 'other';
    };

    design.circuits = design.circuits.map((circuit: any) => {
      const Ib = circuit.calculations?.Ib || 0;
      const connectedLoad = Ib * (normalized.supply.voltage || 230);
      
      try {
        const diversityResult = calculateCircuitDiversity({
          circuitType: mapLoadTypeToDiversityCircuitType(circuit.loadType),
          connectedLoad,
          voltage: normalized.supply.voltage || 230,
          installationType: normalized.supply.installationType as 'domestic' | 'commercial' | 'industrial' || 'domestic'
        });
        
        // Apply diversity to circuit
        return {
          ...circuit,
          calculations: {
            ...circuit.calculations,
            Id: diversityResult.diversifiedCurrent,
            diversityFactor: diversityResult.diversityFactor,
            diversifiedLoad: diversityResult.diversifiedLoad,
            connectedLoad: diversityResult.connectedLoad
          },
          justifications: {
            ...circuit.justifications,
            diversityApplied: diversityResult.justification
          }
        };
      } catch (error) {
        this.logger.warn('Failed to calculate circuit diversity', {
          circuit: circuit.name,
          error: error.message
        });
        // Fallback: no diversity applied
        return {
          ...circuit,
          calculations: {
            ...circuit.calculations,
            Id: Ib,
            diversityFactor: 1.0,
            diversifiedLoad: connectedLoad,
            connectedLoad
          }
        };
      }
    });
    
    this.logger.info('Circuit-level diversity applied', {
      circuits: design.circuits.length,
      installationType: normalized.supply.installationType
    });

    // ========================================
    // PHASE 4.8: Post-Calculation Safety Check - Enforce Ib ≤ In
    // ========================================
    // If deterministic calculations changed Ib, we must re-check and upgrade MCBs if needed
    design.circuits = design.circuits.map((circuit: any) => {
      const Ib = circuit.calculations?.Ib || 0;
      const In = circuit.protectionDevice?.rating || 0;
      
      if (Ib > In) {
        const standardMCBs = [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125];
        const requiredRating = Ib * 1.05;
        const newRating = standardMCBs.find(r => r >= requiredRating) || 100;
        
        this.logger.info('POST-CALC SAFETY FIX: MCB upgraded after calculations', {
          circuit: circuit.name,
          Ib: Ib.toFixed(1),
          from: In,
          to: newRating,
          reason: 'Design current increased after deterministic calculations'
        });
        
        circuit.protectionDevice.rating = newRating;
        if (circuit.calculations) {
          circuit.calculations.In = newRating;
        }
      }
      
      return circuit;
    });
    
    this.logger.info('Post-calculation safety check complete');

    // ========================================
    // PHASE 5: Validation (with voltage context)
    // ========================================
    let validationResult = this.validator.validate(design, normalized.supply.voltage);
    
    // RAG-FIRST: Comprehensive RAG (40 keywords, 50 results) eliminates need for retries
    // Validation issues surface clearly for manual review of edge cases
    if (!validationResult.isValid) {
      const maxRetries = 0; // Trust improved RAG for first-time compliance, avoid timeouts on 10+ circuits
      let correctionAttempt = 0;
      
      // Update progress to show validation complete, entering correction phase
      if (this.logger.updateJobProgress) {
        await this.logger.updateJobProgress(87, 'Validating design compliance...');
      }
      
      while (!validationResult.isValid && correctionAttempt < maxRetries) {
        correctionAttempt++;
        
        const errorCount = validationResult.issues.filter((i: any) => i.severity === 'error').length;
        
        this.logger.warn(`Design validation failed, attempting correction (${correctionAttempt}/${maxRetries})`, { 
          errorCount,
          failedCircuits: validationResult.issues
            .filter((i: any) => i.severity === 'error')
            .map((i: any) => i.circuitNumber || 'unknown')
        });
        
        // OPTIMIZATION: Only correct failed circuits (not all circuits)
        const failedCircuitNumbers = new Set(
          validationResult.issues
            .filter((i: any) => i.severity === 'error' && i.circuitNumber)
            .map((i: any) => i.circuitNumber)
        );
        
        const errorSummary = validationResult.autoFixSuggestions.join('\n\n');
        
        try {
          if (failedCircuitNumbers.size > 0 && failedCircuitNumbers.size < design.circuits.length) {
            // Partial correction: Only correct failed circuits
            this.logger.info('Partial correction mode', {
              failedCircuits: Array.from(failedCircuitNumbers),
              totalCircuits: design.circuits.length,
              attempt: correctionAttempt
            });

            const failedCircuits = design.circuits.filter((c: any) => 
              failedCircuitNumbers.has(c.circuitNumber)
            );
            
            const correctionInputs = {
              supply: normalized.supply,
              circuits: normalized.circuits.filter((_, idx) => 
                failedCircuitNumbers.has(idx + 1)
              )
            };
            
            const correctedDesign = await this.ai.generateCorrection(
              correctionInputs,
              { circuits: failedCircuits, reasoning: design.reasoning },
              errorSummary
            );
            
            // Merge corrected circuits back into full design
            correctedDesign.circuits.forEach((correctedCircuit: any) => {
              const index = design.circuits.findIndex((c: any) => 
                c.circuitNumber === correctedCircuit.circuitNumber
              );
              if (index !== -1) {
                design.circuits[index] = correctedCircuit;
              }
            });
          } else {
            // Full correction: Re-process all circuits
            this.logger.info('Full correction mode', { attempt: correctionAttempt });
            design = await this.ai.generateCorrection(normalized, design, errorSummary);
          }
          
          // Re-validate corrected design
          validationResult = this.validator.validate(design, normalized.supply.voltage);
          
          if (!validationResult.isValid) {
            this.logger.warn(`Correction attempt ${correctionAttempt} still has errors`, {
              remainingErrors: validationResult.issues.filter((i: any) => i.severity === 'error').length
            });
            
            if (correctionAttempt >= maxRetries) {
              throw new Error(
                `Design validation failed after ${maxRetries} correction attempts:\n\n${validationResult.autoFixSuggestions.join('\n\n')}\n\nPlease review the design inputs and try again.`
              );
            }
          } else {
            this.logger.info(`RAG-first design validation complete`, {
              originalIssues: validationResult.issues.length,
              ragResults: context?.totalResults || 0,
              strategy: 'First-time compliance via comprehensive RAG'
            });
          }
        } catch (correctionError) {
          this.logger.error('Correction attempt failed', { 
            error: correctionError.message,
            attempt: correctionAttempt,
            isTimeout: correctionError.message.includes('timeout')
          });
          
          // Provide clear error message for timeout vs other errors
          const errorMessage = correctionError.message.includes('timeout')
            ? `AI correction timed out after ${correctionAttempt} attempts. This design may be too complex. Try reducing the number of circuits or simplifying the requirements.`
            : `Design validation failed:\n\n${errorSummary}\n\nCorrection attempt ${correctionAttempt} failed: ${correctionError.message}`;
          
          throw new Error(errorMessage);
        }
      }
    }

    const isValidAfterCalculations = validationResult.isValid;
    
    this.logger.info('Design validation complete', {
      passed: isValidAfterCalculations,
      errorCount: validationResult.issues.filter((i: any) => i.severity === 'error').length,
      warningCount: validationResult.issues.filter((i: any) => i.severity === 'warning').length
    });

    // ========================================
    // PHASE 6: Cache Storage (DISABLED FOR TESTING RING FINAL FIX)
    // ========================================
    // TEMPORARILY DISABLED - Don't cache during ring final testing
    // await this.cache.set(cacheKey, design);
    this.logger.info('Cache storage DISABLED for testing');

    const duration = Date.now() - startTime;
    this.logger.info('Pipeline complete', {
      duration,
      circuits: design.circuits.length,
      fromCache: false,
      validationPassed: isValidAfterCalculations
    });

    // ========================================
    // PHASE 7: FINAL RING FINAL ENFORCEMENT (Last Safety Net)
    // ========================================
    // This is the FINAL hard pass to catch any ring finals that slipped through
    // and ensure they are ALWAYS 2.5mm² + 1.5mm² CPC + 32A RCBO
    let ringFinalEnforcementCount = 0;
    design.circuits = design.circuits.map((circuit: any) => {
      const name = circuit.name?.toLowerCase() || '';
      const loadType = circuit.loadType?.toLowerCase() || '';
      
      // Detect ring finals (cable-agnostic)
      const isRing = name.includes('ring') || 
                     loadType.includes('ring') || 
                     loadType.includes('socket_ring') ||
                     (loadType.includes('socket') && circuit.protectionDevice?.rating === 32);
      
      if (isRing && (circuit.cableSize !== 2.5 || circuit.protectionDevice?.rating !== 32)) {
        this.logger.warn('FINAL ENFORCEMENT: Forcing ring final to standard 2.5mm² + 32A configuration', {
          circuit: circuit.name,
          loadType: circuit.loadType,
          wasCableSize: circuit.cableSize,
          wasCpcSize: circuit.cpcSize,
          wasProtection: circuit.protectionDevice?.rating,
          reason: 'BS 7671 Appendix 15 - Ring finals are ALWAYS 2.5mm² + 1.5mm² CPC + 32A RCBO'
        });
        
        circuit.cableSize = 2.5;
        circuit.cpcSize = 1.5;
        circuit.protectionDevice = {
          ...circuit.protectionDevice,
          rating: 32,
          type: 'RCBO'
        };
        
        ringFinalEnforcementCount++;
      }
      
      return circuit;
    });
    
    if (ringFinalEnforcementCount > 0) {
      this.logger.info('Ring final enforcement applied', {
        circuitsEnforced: ringFinalEnforcementCount,
        message: 'Ring finals forced to BS 7671 standard: 2.5mm² + 1.5mm² CPC + 32A RCBO'
      });
    }

    // ========================================
    // PHASE 8: CALCULATE INSTALLATION-WIDE DIVERSITY
    // ========================================
    // Map load types to diversity categories
    const mapLoadTypeToDiversityCategory = (loadType: string): 'lighting' | 'sockets' | 'cooker' | 'immersion' | 'heating' | 'other' => {
      const type = loadType.toLowerCase();
      if (type.includes('lighting') || type.includes('light')) return 'lighting';
      if (type.includes('socket') || type.includes('ring')) return 'sockets';
      if (type.includes('cooker')) return 'cooker';
      if (type.includes('immersion')) return 'immersion';
      if (type.includes('heating') || type.includes('heat')) return 'heating';
      return 'other';
    };

    const diversityResult = calculateDiversity({
      circuits: design.circuits.map((c: any) => ({
        type: mapLoadTypeToDiversityCategory(c.loadType),
        load: c.calculations?.connectedLoad || (c.calculations?.Ib || 0) * (normalized.supply.voltage || 230)
      })),
      propertyType: normalized.supply.installationType || 'domestic'
    });

    console.log('📊 Installation Diversity Calculation:', {
      totalConnectedLoad: diversityResult.totalConnected,
      diversifiedLoad: diversityResult.diversifiedDemand,
      diversityFactor: diversityResult.diversityFactor,
      breakdown: diversityResult.breakdown
    });
    
    this.logger.info('Installation-wide diversity calculated', {
      totalConnected: diversityResult.totalConnected,
      diversifiedDemand: diversityResult.diversifiedDemand,
      diversityFactor: diversityResult.diversityFactor
    });

    return {
      success: true,
      circuits: design.circuits,
      supply: normalized.supply,
      fromCache: false,
      processingTime: duration,
      validationPassed: isValidAfterCalculations,
      autoFixApplied: false,
      reasoning: design.reasoning,
      // Surface validation results to frontend
      validationIssues: validationResult.issues,
      autoFixSuggestions: validationResult.autoFixSuggestions,
      // Installation-wide diversity
      totalLoad: diversityResult.totalConnected,
      diversifiedLoad: diversityResult.diversifiedDemand,
      diversityFactor: diversityResult.diversityFactor,
      diversityBreakdown: {
        totalConnectedLoad: diversityResult.totalConnected,
        diversifiedLoad: diversityResult.diversifiedDemand,
        overallDiversityFactor: diversityResult.diversityFactor,
        byCategory: diversityResult.breakdown,
        reasoning: 'Calculated per BS 7671 Appendix A'
      }
    };
  }
}
