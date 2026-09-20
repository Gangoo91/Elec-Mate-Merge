/**
 * Query Intent Detection - Deep Understanding Module
 * Detects what the user is ACTUALLY asking for
 */

export interface QueryIntent {
  type: 'design_request' | 'regulation_lookup' | 'why_question' | 'alternative_comparison' | 'what_if_scenario' | 'troubleshooting' | 'clarification';
  complexity: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  userLevel: 'apprentice' | 'electrician' | 'designer' | 'expert';
  requiresCalculations: boolean;
  requiresRegulationCitation: boolean;
  followUpContext?: string;
  semanticMeaning: string;
  criticalTopics: string[];
}

/**
 * Detect the TRUE intent behind the user's query
 */
export function detectIntent(query: string, conversationHistory: any[] = []): QueryIntent {
  const lowerQuery = query.toLowerCase();
  
  // **WHY QUESTIONS** - Deepest complexity, need regulation backing
  if (/why (not|is|do|does|can't|couldn't|would|should)/i.test(query) || /what makes|what causes|how come/i.test(query)) {
    const topic = extractWhyTopic(query);
    return {
      type: 'why_question',
      complexity: 8, // High complexity - needs explanation + justification
      userLevel: detectUserLevel(query),
      requiresCalculations: true,
      requiresRegulationCitation: true,
      semanticMeaning: `User wants to understand the REASONING behind ${topic}`,
      criticalTopics: [topic, 'BS 7671 justification', 'design methodology'],
      followUpContext: extractPreviousContext(conversationHistory)
    };
  }
  
  // **ALTERNATIVE COMPARISON** - Comparing two approaches
  if (/vs|versus|compared to|instead of|rather than|or should|better to/i.test(query)) {
    const alternatives = extractAlternatives(query);
    return {
      type: 'alternative_comparison',
      complexity: 6,
      userLevel: 'electrician',
      requiresCalculations: false,
      requiresRegulationCitation: true,
      semanticMeaning: `Comparing ${alternatives[0]} vs ${alternatives[1]}`,
      criticalTopics: [...alternatives, 'pros and cons', 'regulation compliance', 'cost comparison']
    };
  }
  
  // **WHAT-IF SCENARIOS** - Changing one parameter
  if (/what if|what about|how about|suppose|assuming|if (i|we|you)/i.test(query)) {
    const changedParameter = extractChangedParameter(query);
    return {
      type: 'what_if_scenario',
      complexity: 5,
      userLevel: 'electrician',
      requiresCalculations: true,
      requiresRegulationCitation: false,
      semanticMeaning: `Exploring scenario with changed parameter: ${changedParameter}`,
      criticalTopics: [changedParameter, 'impact on design', 'voltage drop', 'cable sizing'],
      followUpContext: extractPreviousContext(conversationHistory)
    };
  }
  
  // **DESIGN REQUESTS** - "What cable/MCB/size do I need?"
  if (/what (cable|mcb|size|protection|breaker)/i.test(query) || /design|calculate|size|select/i.test(query)) {
    const hasMultipleParams = countParameters(query);
    return {
      type: 'design_request',
      complexity: hasMultipleParams >= 3 ? 7 : 4,
      userLevel: detectUserLevel(query),
      requiresCalculations: true,
      requiresRegulationCitation: false, // Don't clutter response with reg numbers
      semanticMeaning: 'User needs complete circuit design with specifications',
      criticalTopics: ['cable sizing', 'voltage drop', 'protection device', 'current-carrying capacity']
    };
  }
  
  // **REGULATION LOOKUP** - Direct regulation questions
  if (/regulation|section|table|chapter|appendix|bs ?7671|wiring reg/i.test(query)) {
    return {
      type: 'regulation_lookup',
      complexity: 3,
      userLevel: 'designer',
      requiresCalculations: false,
      requiresRegulationCitation: true,
      semanticMeaning: 'User wants specific regulation information',
      criticalTopics: ['regulation text', 'compliance requirements', 'application guidance']
    };
  }
  
  // **TROUBLESHOOTING** - Problem-solving
  if (/problem|issue|wrong|error|fail|not working|doesn't|won't/i.test(query)) {
    return {
      type: 'troubleshooting',
      complexity: 7,
      userLevel: 'electrician',
      requiresCalculations: true,
      requiresRegulationCitation: false,
      semanticMeaning: 'User has a problem that needs diagnosis',
      criticalTopics: ['root cause analysis', 'compliance check', 'fault finding']
    };
  }
  
  // **CLARIFICATION** - Follow-up questions
  if ((lowerQuery.startsWith('what about') || lowerQuery.startsWith('and ') || lowerQuery.startsWith('but ')) && conversationHistory.length > 0) {
    return {
      type: 'clarification',
      complexity: 3,
      userLevel: 'electrician',
      requiresCalculations: false,
      requiresRegulationCitation: false,
      semanticMeaning: 'User wants clarification on previous discussion',
      criticalTopics: ['context from previous message'],
      followUpContext: extractPreviousContext(conversationHistory)
    };
  }
  
  // **DEFAULT: DESIGN REQUEST**
  return {
    type: 'design_request',
    complexity: 5,
    userLevel: 'electrician',
    requiresCalculations: true,
    requiresRegulationCitation: false,
    semanticMeaning: 'General design request',
    criticalTopics: ['cable sizing', 'protection device', 'compliance']
  };
}

/**
 * Detect user expertise level from query patterns
 */
function detectUserLevel(query: string): 'apprentice' | 'electrician' | 'designer' | 'expert' {
  const lowerQuery = query.toLowerCase();
  
  // Expert patterns - uses regulation numbers, technical terminology
  if (/regulation \d+|433\.1|525\.|table 4[a-z]/i.test(query) || /Ib.*In.*Iz/i.test(query)) {
    return 'expert';
  }
  
  // Designer patterns - asks about methodology, alternatives
  if (/methodology|approach|best practice|why.*instead|design consideration/i.test(query)) {
    return 'designer';
  }
  
  // Apprentice patterns - basic questions, simple phrasing
  if (/what is|how do i|do i need|is it ok|can i use/i.test(query) || query.split(' ').length < 8) {
    return 'apprentice';
  }
  
  // Default: Electrician
  return 'electrician';
}

/**
 * Count distinct parameters in the query
 */
function countParameters(query: string): number {
  let count = 0;
  if (/\d+\s*(kw|kva|w|amp|a)\b/i.test(query)) count++; // Power
  if (/\d+\s*m\b/i.test(query)) count++; // Distance
  if (/\d+\s*v\b/i.test(query)) count++; // Voltage
  if (/three.?phase|single.?phase/i.test(query)) count++; // Phases
  if (/bathroom|outdoor|kitchen|garage/i.test(query)) count++; // Location
  if (/shower|cooker|ev|charger|heater/i.test(query)) count++; // Circuit type
  return count;
}

/**
 * Extract what the user is asking "why" about
 */
function extractWhyTopic(query: string): string {
  const match = query.match(/why (not |is |do |does |can't |couldn't )?(.+?)(\?|$)/i);
  if (match) {
    const topic = match[2].trim().slice(0, 50);
    return topic;
  }
  
  // Common topics
  if (/swa|armoured/i.test(query)) return 'SWA cable requirement';
  if (/cable size|larger cable|upsize/i.test(query)) return 'cable sizing';
  if (/voltage drop/i.test(query)) return 'voltage drop limits';
  if (/rcd|rcbo/i.test(query)) return 'RCD protection';
  if (/mcb|breaker/i.test(query)) return 'MCB sizing';
  
  return 'design decision';
}

/**
 * Extract alternatives being compared
 */
function extractAlternatives(query: string): [string, string] {
  const vsMatch = query.match(/(.+?)\s+(?:vs|versus|compared to|instead of|rather than)\s+(.+?)(\?|$)/i);
  if (vsMatch) {
    return [vsMatch[1].trim(), vsMatch[2].trim()];
  }
  
  // Common comparisons
  if (/twin.*earth.*swa/i.test(query)) return ['Twin & Earth', 'SWA'];
  if (/mcb.*rcbo/i.test(query)) return ['MCB', 'RCBO'];
  if (/pvc.*swa/i.test(query)) return ['PVC cable', 'SWA'];
  
  return ['Option A', 'Option B'];
}

/**
 * Extract changed parameter from what-if scenario
 */
function extractChangedParameter(query: string): string {
  if (/longer|shorter|distance|cable run/i.test(query)) return 'cable length';
  if (/higher|lower|more power|less power/i.test(query)) return 'load power';
  if (/bathroom|outdoor|different location/i.test(query)) return 'location';
  if (/three.?phase|single.?phase/i.test(query)) return 'phase configuration';
  if (/voltage/i.test(query)) return 'voltage';
  
  return 'design parameter';
}

/**
 * Extract context from previous conversation
 */
function extractPreviousContext(conversationHistory: any[]): string | undefined {
  if (conversationHistory.length === 0) return undefined;
  
  // Get last assistant message
  const lastAssistant = conversationHistory
    .slice()
    .reverse()
    .find(msg => msg.role === 'assistant');
  
  if (lastAssistant) {
    // Extract key details (circuit type, cable size, etc.)
    const content = lastAssistant.content;
    const context: string[] = [];
    
    if (/(\d+\.?\d*)mm²/i.test(content)) {
      const cable = content.match(/(\d+\.?\d*)mm²/i)?.[1];
      context.push(`previously discussed ${cable}mm² cable`);
    }
    if (/(\d+)A MCB/i.test(content)) {
      const mcb = content.match(/(\d+)A MCB/i)?.[1];
      context.push(`${mcb}A MCB`);
    }
    if (/(\d+\.?\d*)kW/i.test(content)) {
      const power = content.match(/(\d+\.?\d*)kW/i)?.[1];
      context.push(`${power}kW load`);
    }
    
    return context.length > 0 ? context.join(', ') : undefined;
  }
  
  return undefined;
}
