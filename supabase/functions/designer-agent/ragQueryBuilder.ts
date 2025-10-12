/**
 * RAG Query Builder - Build context-enriched queries for better retrieval
 * Phase 1: Full RAG Integration
 */

export function buildEnhancedRAGQuery(userMessage: string, circuitParams: any): string {
  const parts = [userMessage];
  
  // Circuit type context
  if (circuitParams.circuitType) {
    parts.push(circuitParams.circuitType);
  }
  
  // Power rating context
  if (circuitParams.power) {
    parts.push(`${circuitParams.power}W power rating`);
  }
  
  // Cable run distance context
  if (circuitParams.cableLength) {
    parts.push(`${circuitParams.cableLength}m cable run`);
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
