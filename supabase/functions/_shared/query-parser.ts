/**
 * Query Entity Parser - Extract structured parameters from natural language queries
 */

export interface ParsedEntities {
  loadType?: string; // 'shower', 'cooker', 'socket', 'lighting'
  power?: number; // in watts
  voltage?: number; // default 230V
  distance?: number; // cable length in meters
  phases?: 'single' | 'three';
  installMethod?: string;
  ambientTemp?: number;
  grouping?: number;
  // NEW: Enhanced context detection
  location?: 'bathroom' | 'kitchen' | 'outdoor' | 'loft' | 'garage' | 'general';
  specialRequirements?: string[];
  installationConstraints?: string[];
  earthingSystem?: 'TN-S' | 'TN-C-S' | 'TT' | 'IT';
  consumerUnitWays?: number;  // 8, 10, 12, 16, 18 way
  circuitCount?: number;      // Number of circuits needed
  jobType?: 'rewire' | 'board_change' | 'extension' | 'new_circuit' | 'testing';
}

export function parseQueryEntities(query: string): ParsedEntities {
  const entities: ParsedEntities = { 
    voltage: 230, 
    phases: 'single', 
    ambientTemp: 30, 
    grouping: 1,
    specialRequirements: [],
    installationConstraints: []
  };
  
  // Power extraction (9.5kW, 9500W, 9.5 kW)
  const powerMatch = query.match(/(\d+\.?\d*)\s*(kW|kw|W|w)/i);
  if (powerMatch) {
    entities.power = powerMatch[2].toLowerCase().includes('k') 
      ? parseFloat(powerMatch[1]) * 1000 
      : parseFloat(powerMatch[1]);
  }
  
  // Distance extraction (15m, 15 meters, 15 metres)
  const distanceMatch = query.match(/(\d+\.?\d*)\s*(m|meters?|metres?)/i);
  if (distanceMatch) {
    entities.distance = parseFloat(distanceMatch[1]);
  }
  
  // Load type detection
  if (/shower/i.test(query)) entities.loadType = 'shower';
  if (/cooker|oven/i.test(query)) entities.loadType = 'cooker';
  if (/socket/i.test(query)) entities.loadType = 'socket';
  if (/light/i.test(query)) entities.loadType = 'lighting';
  if (/ev charger|electric vehicle/i.test(query)) entities.loadType = 'ev_charger';
  if (/heat pump/i.test(query)) entities.loadType = 'heat_pump';
  
  // NEW: Location context detection
  if (/bathroom|shower room|wet room/i.test(query)) {
    entities.location = 'bathroom';
    entities.specialRequirements?.push('RCD protection mandatory (Section 701)');
    entities.specialRequirements?.push('IP rating for zones (IPX4 minimum in Zone 2)');
    entities.specialRequirements?.push('Check zones 0, 1, 2 for equipment selection');
  }
  if (/kitchen/i.test(query)) {
    entities.location = 'kitchen';
    entities.specialRequirements?.push('Socket height regulations (above worktop)');
    entities.specialRequirements?.push('Dedicated appliance circuits recommended');
  }
  if (/outdoor|garden|external|outside/i.test(query)) {
    entities.location = 'outdoor';
    entities.specialRequirements?.push('Buried cable: 600mm depth + warning tape (522.8.10)');
    entities.specialRequirements?.push('IP65+ rating required for outdoor equipment');
    entities.specialRequirements?.push('RCD protection mandatory (411.3.3)');
  }
  if (/loft|attic/i.test(query)) {
    entities.location = 'loft';
    entities.ambientTemp = 40; // Override default temp
    entities.installationConstraints?.push('High ambient temperature (40°C+)');
    entities.installationConstraints?.push('Cable derating required (Table 4B1)');
  }
  if (/garage|workshop/i.test(query)) {
    entities.location = 'garage';
    entities.specialRequirements?.push('RCD protection recommended');
    entities.specialRequirements?.push('Consider mechanical protection for cables');
  }
  
  // NEW: Installation constraints
  if (/solid wall|brick|masonry/i.test(query)) {
    entities.installationConstraints?.push('Difficult chasing in solid walls');
    entities.installationConstraints?.push('Consider surface trunking or conduit');
  }
  if (/buried|underground/i.test(query)) {
    entities.installMethod = 'buried';
    entities.installationConstraints?.push('Direct burial requires SWA cable or ducting');
    entities.installationConstraints?.push('Warning tape required 150mm above cable');
  }
  
  // NEW: Earthing system detection
  if (/TT system|earth rod|no earth/i.test(query)) {
    entities.earthingSystem = 'TT';
    entities.specialRequirements?.push('RCD mandatory for TT system (411.5.2)');
    entities.specialRequirements?.push('Higher Zs values permitted with RCD');
  }
  if (/TN-S|separate earth/i.test(query)) {
    entities.earthingSystem = 'TN-S';
  }
  if (/TN-C-S|PME/i.test(query)) {
    entities.earthingSystem = 'TN-C-S';
  }
  
  // Voltage override
  if (/400V|three.?phase|3.?phase/i.test(query)) {
    entities.voltage = 400;
    entities.phases = 'three';
  }
  
  // Installation method detection (refined)
  if (/clipped|direct|surface/i.test(query)) entities.installMethod = 'clipped-direct';
  if (/conduit/i.test(query)) entities.installMethod = 'in-conduit';
  if (/trunking/i.test(query)) entities.installMethod = 'in-trunking';
  
  // Temperature
  const tempMatch = query.match(/(\d+)°?C/i);
  if (tempMatch) {
    entities.ambientTemp = parseInt(tempMatch[1], 10);
  }
  
  // Consumer unit way detection (18 way, 16-way, 10 way board)
  const cuWaysMatch = query.match(/(\d+)[\s-]?way(?:\s+(?:board|unit|consumer unit|cu))?/i);
  if (cuWaysMatch) {
    entities.consumerUnitWays = parseInt(cuWaysMatch[1], 10);
  }
  
  // Circuit count detection (8 circuits, 12 circuits needed)
  const circuitMatch = query.match(/(\d+)\s+circuits?/i);
  if (circuitMatch) {
    entities.circuitCount = parseInt(circuitMatch[1], 10);
    // If no explicit "way" mentioned, assume ways = circuits + 2 spares
    if (!entities.consumerUnitWays) {
      entities.consumerUnitWays = parseInt(circuitMatch[1], 10) + 2;
    }
  }

  // Job type detection
  if (/board change|consumer unit change|CU change|board replacement|board swap/i.test(query)) {
    entities.jobType = 'board_change';
  } else if (/rewire|full rewire|house rewire|complete rewire/i.test(query)) {
    entities.jobType = 'rewire';
  } else if (/extension|add circuit|new circuit|additional circuit/i.test(query)) {
    entities.jobType = 'extension';
  } else if (/testing|test and inspect|EICR|periodic inspection/i.test(query)) {
    entities.jobType = 'testing';
  }

  // 🆕 HIGH-LEVEL DESIGN DETECTION
  if (/full house|whole house|complete house|house rewire/i.test(query)) {
    if (!entities.jobType) {
      entities.jobType = 'rewire';
    }
    // Default circuit count for full house if not specified
    if (!entities.circuitCount) {
      entities.circuitCount = 12;
    }
  }

  // 🆕 BEDROOM-BASED SIZING (typical UK domestic)
  const bedMatch = query.match(/(\d+)[\s-]?bed/i);
  if (bedMatch) {
    const bedrooms = parseInt(bedMatch[1], 10);
    
    // Typical circuit count based on bedrooms (UK domestic standard)
    if (!entities.circuitCount) {
      if (bedrooms === 1) entities.circuitCount = 6;
      else if (bedrooms === 2) entities.circuitCount = 10;
      else if (bedrooms === 3) entities.circuitCount = 12;
      else if (bedrooms === 4) entities.circuitCount = 14;
      else entities.circuitCount = 16; // 5+ beds
    }
    
    // Default consumer unit sizing (circuits + spares)
    if (!entities.consumerUnitWays) {
      entities.consumerUnitWays = entities.circuitCount + 4; // +4 spare ways
    }
  }
  
  return entities;
}

export type QueryType = 'design' | 'lookup' | 'compare' | 'explain' | 'general';

export function classifyQuery(query: string, entities?: ParsedEntities): QueryType {
  // PRIORITY 1: Structural design query detection
  // If we have power AND distance, it's ALWAYS a design query
  if (entities?.power && entities?.distance) {
    return 'design';
  }
  
  // PRIORITY 2: Explicit design keywords
  if (/design|size|calculate|select|what (cable|mcb|breaker)|recommend/i.test(query)) {
    return 'design';
  }
  
  // PRIORITY 3: Regulation lookup patterns
  if (/regulation \d+|section \d+|what (does|is)|BS ?7671|table \d+/i.test(query)) {
    return 'lookup';
  }
  
  // PRIORITY 4: Comparison patterns
  if (/compare|vs|versus|difference between/i.test(query)) {
    return 'compare';
  }
  
  // PRIORITY 5: Explanation patterns
  if (/explain|why|how (does|do)/i.test(query)) {
    return 'explain';
  }
  
  return 'general';
}

/**
 * Extract regulation numbers from query for explicit lookup
 */
export function extractRegulationNumbers(query: string): string[] {
  const patterns = [
    /\b(\d{3}(?:\.\d+){1,2})\b/g,                    // 433.1.1
    /Regulation\s+(\d{3}(?:\.\d+){0,2})/gi,          // "Regulation 433.1.1"
    /reg\.?\s+(\d{3}(?:\.\d+){0,2})/gi,              // "reg 433.1"
    /Table\s+(\d+[A-Z]?\d*(?:\.\d+)*)/gi,           // "Table 4D5"
    /Table\s+([A-Z]\d+)/gi                          // "Table I1"
  ];
  
  const matches: string[] = [];
  for (const pattern of patterns) {
    const found = query.matchAll(pattern);
    for (const match of found) {
      if (match[1]) {
        const ref = pattern.toString().includes('Table') ? `Table ${match[1]}` : match[1];
        matches.push(ref);
      }
    }
  }
  
  return [...new Set(matches)]; // Deduplicate
}

/**
 * Detect if query is compound (multiple parts)
 */
export function isCompoundQuery(query: string): boolean {
  const indicators = [
    /\band\b.*\b(with|in|plus|also)\b/i,
    /,.*,/,  // Multiple clauses
    /;\s/,    // Semicolon separation
  ];
  
  return indicators.some(pattern => pattern.test(query));
}

/**
 * Split compound queries intelligently
 */
export function splitCompoundQuery(query: string): string[] {
  if (!isCompoundQuery(query)) return [query];
  
  // Split on conjunctions but preserve semantic units
  const parts = query.split(/\b(and|with|plus|also)\b/i);
  return parts
    .filter(p => p.trim().length > 5)
    .map(p => p.trim());
}

/**
 * PHASE 5: Calculate how specific a query is (0-100)
 */
export function calculateQuerySpecificity(entities: ParsedEntities): number {
  let score = 0;
  if (entities.power) score += 30;
  if (entities.distance) score += 25;
  if (entities.loadType) score += 20;
  if (entities.location) score += 15;
  if (entities.installMethod) score += 10;
  return Math.min(score, 100);
}
