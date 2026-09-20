/**
 * PHASE 1: Query Enhancement System
 * Enriches vague follow-up questions with conversation context
 * 
 * Example transformations:
 * "What about longer?" → "What about longer cable run? 9.5kW shower, 230V, bathroom location"
 * "And in a bathroom?" → "And in a bathroom? 10kW circuit, single-phase installation"
 */

export interface EnhancementContext {
  power?: number;
  voltage?: number;
  distance?: number;
  location?: string;
  circuitType?: string;
  phases?: 'single' | 'three';
  currentRating?: number;
  cableSize?: string;
}

export interface EnhancedQuery {
  original: string;
  enhanced: string;
  addedContext: string[];
  confidence: number;
}

/**
 * Extract entities from conversation history
 */
export function extractContextFromHistory(messages: any[]): EnhancementContext {
  const context: EnhancementContext = {};
  
  // Process messages in reverse (most recent first)
  for (let i = messages.length - 1; i >= Math.max(0, messages.length - 5); i--) {
    const msg = messages[i];
    if (!msg?.content) continue;
    
    const text = msg.content.toLowerCase();
    
    // Extract power
    if (!context.power) {
      const powerMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:kw|kilowatt)/i);
      if (powerMatch) {
        context.power = parseFloat(powerMatch[1]) * 1000;
      } else {
        const wattMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:w|watt)/i);
        if (wattMatch) context.power = parseFloat(wattMatch[1]);
      }
    }
    
    // Extract voltage
    if (!context.voltage) {
      const voltageMatch = text.match(/(\d+)\s*v(?:olt)?/i);
      if (voltageMatch) context.voltage = parseInt(voltageMatch[1]);
    }
    
    // Extract distance/cable length
    if (!context.distance) {
      const distanceMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:m|metre|meter)/i);
      if (distanceMatch) context.distance = parseFloat(distanceMatch[1]);
    }
    
    // Extract location
    if (!context.location) {
      if (/bathroom/i.test(text)) context.location = 'bathroom';
      else if (/outdoor|outside|external/i.test(text)) context.location = 'outdoor';
      else if (/kitchen/i.test(text)) context.location = 'kitchen';
      else if (/garage/i.test(text)) context.location = 'garage';
    }
    
    // Extract circuit type
    if (!context.circuitType) {
      if (/shower/i.test(text)) context.circuitType = 'shower';
      else if (/cooker|oven/i.test(text)) context.circuitType = 'cooker';
      else if (/socket|ring/i.test(text)) context.circuitType = 'socket';
      else if (/light|lighting/i.test(text)) context.circuitType = 'lighting';
      else if (/ev|electric vehicle|car charg/i.test(text)) context.circuitType = 'ev';
      else if (/immersion/i.test(text)) context.circuitType = 'immersion';
    }
    
    // Extract phases
    if (!context.phases) {
      if (/three.?phase|3.?phase|400v/i.test(text)) context.phases = 'three';
      else if (/single.?phase|1.?phase|230v/i.test(text)) context.phases = 'single';
    }
    
    // Extract cable size from previous responses
    if (!context.cableSize && msg.role === 'assistant') {
      const cableSizeMatch = text.match(/(\d+(?:\.\d+)?)\s*mm[²2]/i);
      if (cableSizeMatch) context.cableSize = `${cableSizeMatch[1]}mm²`;
    }
    
    // Extract MCB rating
    if (!context.currentRating && msg.role === 'assistant') {
      const mcbMatch = text.match(/(\d+)\s*a\s+(?:mcb|breaker|type\s+[bcd])/i);
      if (mcbMatch) context.currentRating = parseInt(mcbMatch[1]);
    }
  }
  
  // Set defaults
  if (!context.voltage && context.phases === 'three') context.voltage = 400;
  if (!context.voltage && context.phases === 'single') context.voltage = 230;
  if (!context.voltage) context.voltage = 230; // UK standard
  
  return context;
}

/**
 * Detect if query is vague and needs enrichment
 */
function isVagueQuery(query: string): boolean {
  // Add null/undefined check to prevent .trim() errors
  if (!query || typeof query !== 'string') {
    return false;
  }
  
  const vaguePatterns = [
    /^what about/i,
    /^and if/i,
    /^how about/i,
    /^what if/i,
    /^but if/i,
    /^in a? (bathroom|kitchen|garage|outdoor)/i,
    /longer|shorter|bigger|smaller|higher|lower/i,
    /different (location|size|rating)/i,
  ];
  
  return vaguePatterns.some(p => p.test(query.trim()));
}

/**
 * Main enhancement function
 */
export function enhanceQuery(
  query: string,
  messages: any[]
): EnhancedQuery {
  // Check if enhancement is needed
  if (!isVagueQuery(query) || messages.length < 2) {
    return {
      original: query,
      enhanced: query,
      addedContext: [],
      confidence: 1.0
    };
  }
  
  // Extract context from history
  const context = extractContextFromHistory(messages);
  const addedContext: string[] = [];
  
  // Build context additions
  if (context.power) {
    addedContext.push(`${context.power >= 1000 ? (context.power / 1000).toFixed(1) + 'kW' : context.power + 'W'} load`);
  }
  
  if (context.circuitType) {
    const typeNames: Record<string, string> = {
      'shower': 'electric shower',
      'cooker': 'cooker circuit',
      'socket': 'socket circuit',
      'lighting': 'lighting circuit',
      'ev': 'EV charger',
      'immersion': 'immersion heater'
    };
    addedContext.push(typeNames[context.circuitType] || context.circuitType);
  }
  
  if (context.voltage && context.voltage !== 230) {
    addedContext.push(`${context.voltage}V`);
  }
  
  if (context.phases === 'three') {
    addedContext.push('three-phase');
  }
  
  if (context.distance) {
    addedContext.push(`${context.distance}m cable run`);
  }
  
  if (context.location) {
    addedContext.push(`${context.location} location`);
  }
  
  if (context.cableSize) {
    addedContext.push(`currently ${context.cableSize} cable`);
  }
  
  if (context.currentRating) {
    addedContext.push(`${context.currentRating}A MCB`);
  }
  
  // Build enhanced query
  let enhanced = query;
  if (addedContext.length > 0) {
    enhanced = `${query} [Context: ${addedContext.join(', ')}]`;
  }
  
  // Calculate confidence (based on how much context we added)
  const confidence = Math.min(0.95, 0.5 + (addedContext.length * 0.1));
  
  return {
    original: query,
    enhanced,
    addedContext,
    confidence
  };
}

/**
 * Log enhancement results
 */
export function logEnhancement(enhancement: EnhancedQuery, logger?: any): void {
  if (!enhancement.addedContext.length) return;
  
  const log = logger || console;
  log.info?.('🔍 Query Enhanced', {
    original: enhancement.original.slice(0, 50),
    contextAdded: enhancement.addedContext.length,
    confidence: enhancement.confidence
  });
}
