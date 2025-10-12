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
}

export function parseQueryEntities(query: string): ParsedEntities {
  const entities: ParsedEntities = { 
    voltage: 230, 
    phases: 'single', 
    ambientTemp: 30, 
    grouping: 1 
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
  
  // Voltage override
  if (/400V|three.?phase|3.?phase/i.test(query)) {
    entities.voltage = 400;
    entities.phases = 'three';
  }
  
  // Installation method detection
  if (/clipped|direct|surface/i.test(query)) entities.installMethod = 'clipped-direct';
  if (/buried|underground/i.test(query)) entities.installMethod = 'buried';
  if (/conduit/i.test(query)) entities.installMethod = 'in-conduit';
  if (/trunking/i.test(query)) entities.installMethod = 'in-trunking';
  
  // Temperature
  const tempMatch = query.match(/(\d+)°?C/i);
  if (tempMatch) {
    entities.ambientTemp = parseInt(tempMatch[1], 10);
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
