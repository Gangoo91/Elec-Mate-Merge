/**
 * RAG Query Builder - Build context-enriched queries for better retrieval
 * Phase 1: Full RAG Integration
 */

export function buildEnhancedRAGQuery(userMessage: string, circuitParams: any, previousMessages?: any[]): string {
  const msgLower = userMessage.toLowerCase();
  
  // PHASE 3: Detect contextual/follow-up questions that need specific regulation guidance
  if (msgLower.startsWith('why ') || msgLower.includes('why not') || msgLower.includes('instead of')) {
    // Extract what they're asking about
    const cableQuestion = /why.*(pvc|twin.*earth|swa|t&e|single|cable|armoured)/i.test(userMessage);
    const protectionQuestion = /why.*(mcb|rcbo|rcd|breaker|protection)/i.test(userMessage);
    const voltageDropQuestion = /why.*(voltage.*drop|vd|volt.*drop)/i.test(userMessage);
    
    if (cableQuestion) {
      return 'cable selection criteria regulation 521 twin and earth versus singles versus SWA armoured cable domestic commercial installations wiring systems fixed';
    }
    if (protectionQuestion) {
      return 'protective device selection MCB RCBO RCD requirements regulation 411 531 overcurrent protection earth fault';
    }
    if (voltageDropQuestion) {
      return 'voltage drop calculation limits regulation 525 appendix 4 maximum permitted voltage drop';
    }
  }
  
  const parts = [userMessage];
  
  // Circuit type context
  if (circuitParams.circuitType) {
    parts.push(circuitParams.circuitType);
  }
  
  // Power rating context
  if (circuitParams.power) {
    parts.push(`${circuitParams.power}W power rating`);
  }
  
  // Cable run distance context with SWA vs Twin & Earth guidance
  if (circuitParams.cableLength) {
    parts.push(`${circuitParams.cableLength}m cable run`);
    
    // Critical: Long runs need SWA vs Twin & Earth guidance
    if (circuitParams.cableLength > 20) {
      parts.push(
        'Regulation 521 wiring system selection',
        'SWA cable armoured for long distances',
        'twin and earth versus singles versus SWA comparison',
        'mechanical protection requirements BS 7671',
        'cable installation method Table 4A2 reference C',
        'voltage drop calculation long cable runs',
        'outdoor buried cable installation',
        'cable protection from mechanical damage',
        'twin and earth maximum 10mm only domestic'
      );
    }
    
    // Medium runs (10-20m) still need guidance
    if (circuitParams.cableLength > 10 && circuitParams.cableLength <= 20) {
      parts.push(
        'cable type selection criteria Table 4A2',
        'twin and earth suitability for distance',
        'voltage drop considerations',
        'singles in conduit alternative'
      );
    }
    
    // Short runs (<10m) - standard guidance
    if (circuitParams.cableLength <= 10) {
      parts.push(
        'twin and earth suitable for short runs',
        'standard domestic installation'
      );
    }
  }
  
  // High power circuits need cable type consideration (twin & earth max 10mm²)
  if (circuitParams.power && circuitParams.power > 7000) {
    parts.push(
      'high load cable selection',
      'large CSA cables singles versus twin and earth',
      'twin and earth maximum size 10mm domestic only',
      'over 10mm2 use singles in conduit or SWA'
    );
  }
  
  // Location context (critical for special locations)
  if (circuitParams.location) {
    parts.push(`${circuitParams.location} location`);
    
    // Add special location tags
    if (circuitParams.location === 'bathroom') {
      parts.push('Section 701', 'IP rating', 'zones', 'RCD mandatory');
    } else if (circuitParams.location === 'outdoor') {
      parts.push('SWA cable', 'buried cable', 'outdoor installation', 'weatherproof');
    }
  }
  
  // Installation method context
  if (circuitParams.installMethod) {
    parts.push(`${circuitParams.installMethod} installation`);
  }
  
  // Add key design concerns
  parts.push(
    'cable sizing',
    'voltage drop',
    'earth fault loop',
    'protection device',
    'RCD requirements',
    'overload protection'
  );
  
  // Circuit type specific tags
  if (circuitParams.circuitType) {
    const circuitTypeLower = circuitParams.circuitType.toLowerCase();
    
    if (circuitTypeLower.includes('fire') || circuitTypeLower.includes('emergency')) {
      parts.push('FP200', 'fire-rated', 'BS 5839', 'enhanced fire performance');
    }
    
    if (circuitTypeLower.includes('ev') || circuitTypeLower.includes('electric vehicle')) {
      parts.push('Section 722', 'EV charging', 'dedicated circuit', 'outdoor installation');
    }
    
    if (circuitTypeLower.includes('shower')) {
      parts.push('high load', 'bathroom', 'Section 701', 'RCD protection');
    }
    
    if (circuitTypeLower.includes('cooker')) {
      parts.push('diversity', 'high load', 'cable selection');
    }
    
    if (circuitTypeLower.includes('heat pump')) {
      parts.push('outdoor', 'SWA cable', 'dedicated circuit');
    }
  }
  
  return parts.join(' ');
}
