/**
 * RAG Query Builder - Build context-enriched queries for better retrieval
 * PHASE 2 UPGRADE: Semantic query reformulation for maximum RAG precision
 */

import { QueryIntent } from '../_shared/query-intent.ts';

export function buildEnhancedRAGQuery(
  userMessage: string, 
  circuitParams: any, 
  intent?: QueryIntent,
  previousMessages?: any[]
): string {
  const msgLower = userMessage.toLowerCase();
  
  // PHASE 2: Semantic Query Reformulation
  // Transform user query into BS 7671-optimized search query
  const reformulated = reformulateForRAG(userMessage, circuitParams, intent);
  
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
  
  // Cable size-based type selection (Twin & Earth vs SWA)
  // CRITICAL: Check estimated final size including VD, not just power rating
  if (circuitParams.cableSize || circuitParams.power > 7000) {
    const estimatedSize = circuitParams.cableSize || 
                         (circuitParams.power > 9000 ? 16 : 10);
    
    if (estimatedSize > 10) {
      parts.push(
        'cable size over 10mm requires SWA',
        'twin and earth maximum 10mm domestic',
        'Regulation 521 wiring system selection',
        'SWA armoured cable for large CSA',
        'singles in conduit vs SWA comparison',
        'twin and earth vs singles vs SWA',
        'large cable installation methods',
        'cable sizing methodology BS 7671',
        'voltage drop drives cable size up'
      );
    }
  }
  
  // High power circuits need proper cable sizing methodology
  if (circuitParams.power && circuitParams.power > 7000) {
    parts.push(
      'high load cable selection',
      'cable sizing including voltage drop',
      'twin and earth maximum 10mm domestic',
      'calculate size before selecting cable type',
      'voltage drop calculation methodology'
    );
  }
  
  // Cable length considerations (voltage drop drives size up)
  if (circuitParams.cableLength) {
    // Long runs + high power = likely to need larger cable = likely to need SWA
    if (circuitParams.cableLength > 20 && circuitParams.power > 3000) {
      parts.push(
        'long cable run voltage drop',
        'cable sizing for voltage drop compliance',
        'SWA cable for long high-power circuits',
        'voltage drop calculation mV/A/m',
        'cable upsizing for VD compliance',
        'voltage drop limits 5% regulation 525'
      );
    }
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
  
  // Three-phase specific guidance (BS 7671 requirements)
  if (circuitParams.phases === 'three' || circuitParams.voltage === 400) {
    parts.push(
      'three-phase installation',
      'balanced load distribution',
      'line-to-line voltage 400V',
      'phase current calculation',
      'three-phase voltage drop calculation',
      'three-phase earth fault loop impedance',
      'neutral conductor sizing',
      'Regulation 559 TN-S system three-phase',
      'Table 4D4B three-phase cable ratings',
      'symmetrical three-phase load'
    );
  }
  
  // Combine reformulated query with context parts
  const finalQuery = [reformulated, ...parts].join(' ');
  
  return finalQuery;
}

/**
 * PHASE 2: Reformulate user query into BS 7671-optimized semantic query
 */
function reformulateForRAG(userMessage: string, params: any, intent?: QueryIntent): string {
  const parts: string[] = [];
  
  // DESIGN REQUESTS: Transform into structured search
  if (intent?.type === 'design_request' || /what (cable|mcb|size)/i.test(userMessage)) {
    if (params.power && params.cableLength) {
      parts.push(
        `cable sizing calculation ${(params.power / 1000).toFixed(1)}kW load`,
        `voltage drop ${params.cableLength}m cable run compliance Regulation 525`,
        `current-carrying capacity tabulated ratings Table 4D5`,
        `protection device coordination Ib In Iz relationship Regulation 433.1.1`,
        `overcurrent protection MCB selection methodology`
      );
    } else if (params.power) {
      parts.push(
        `cable sizing ${(params.power / 1000).toFixed(1)}kW load calculation`,
        `design current calculation`,
        `protective device selection`
      );
    }
  }
  
  // WHY QUESTIONS: Add regulation-specific context
  if (intent?.type === 'why_question') {
    const topic = intent.criticalTopics[0] || 'design decision';
    parts.push(
      `${topic} justification BS 7671`,
      `regulation requirements ${topic}`,
      `design methodology reasoning`,
      `compliance explanation`
    );
  }
  
  // ALTERNATIVE COMPARISONS: Add comparison criteria
  if (intent?.type === 'alternative_comparison') {
    parts.push(
      'wiring system selection criteria Regulation 521',
      'installation method comparison',
      'advantages disadvantages',
      'cost versus performance',
      'regulation compliance comparison'
    );
  }
  
  // Add BS 7671 structure awareness - map to specific chapters
  const bs7671Map = getBs7671ChapterMapping(params, intent);
  parts.push(...bs7671Map);
  
  return parts.join(' ');
}

/**
 * Map design questions to BS 7671 chapter structure
 */
function getBs7671ChapterMapping(params: any, intent?: QueryIntent): string[] {
  const chapters: string[] = [];
  
  // Always include foundational regulations for design
  if (intent?.type === 'design_request' || intent?.requiresCalculations) {
    chapters.push(
      'Regulation 433.1.1 cable sizing relationship Ib In Iz',
      'Regulation 525 voltage drop maximum limits 5% power 3% lighting',
      'Regulation 411.3.2 automatic disconnection earth fault',
      'Chapter 52 selection and erection of wiring systems'
    );
  }
  
  // Cable sizing specific
  if (params.power > 0 && params.cableLength > 0) {
    chapters.push(
      'Table 4D5 current-carrying capacity PVC cables clipped direct',
      'Appendix 4 voltage drop tables mV/A/m values',
      'Table 4D4A SWA cables armoured three-core four-core'
    );
  }
  
  // Three-phase specific
  if (params.phases === 'three' || params.voltage === 400) {
    chapters.push(
      'Table 4D4B three-phase cable current ratings',
      'Regulation 559 TN-S three-phase systems',
      'balanced load neutral conductor sizing'
    );
  }
  
  // Location-specific chapters
  if (params.location === 'bathroom') {
    chapters.push('Section 701 bathrooms IP rating zones RCD protection');
  } else if (params.location === 'outdoor') {
    chapters.push('Section 522 buried cable outdoor installation mechanical protection');
  }
  
  // Circuit-type specific
  if (params.circuitType?.includes('ev')) {
    chapters.push('Section 722 EV charging installation dedicated circuit');
  }
  
  // Cable type selection
  if (params.cableSize > 10 || params.power > 7000) {
    chapters.push(
      'Regulation 521 wiring system selection twin and earth versus SWA',
      'twin and earth maximum 10mm domestic installations only',
      'SWA armoured cable large conductor sizes mechanical protection'
    );
  }
  
  return chapters;
}
