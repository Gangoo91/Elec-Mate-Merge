/**
 * User Expertise Detection & Tracking
 * Analyzes query patterns to detect user expertise level and adjust response depth
 */

export interface UserExpertise {
  level: 'apprentice' | 'electrician' | 'designer' | 'expert';
  confidence: number;
  indicators: string[];
  adaptationGuidance: string;
}

/**
 * Track and determine user expertise level based on conversation patterns
 */
export function trackUserExpertise(
  messages: any[],
  conversationSummary?: any
): UserExpertise {
  let score = 50; // Start at electrician level (neutral)
  const indicators: string[] = [];
  
  const userMessages = messages.filter(m => m.role === 'user');
  
  if (userMessages.length === 0) {
    return {
      level: 'electrician',
      confidence: 0,
      indicators: ['No conversation history'],
      adaptationGuidance: 'Provide standard technical detail'
    };
  }
  
  // === EXPERT INDICATORS (+30 points) ===
  const expertPatterns = [
    { pattern: /regulation \d{3}/i, indicator: 'References specific regulations' },
    { pattern: /bs 7671/i, indicator: 'Cites BS 7671 standard' },
    { pattern: /table 4d/i, indicator: 'References cable tables' },
    { pattern: /correction factor/i, indicator: 'Discusses correction factors' },
    { pattern: /earth fault loop/i, indicator: 'Mentions earth fault loop impedance' },
    { pattern: /voltage drop calculation/i, indicator: 'Requests detailed calculations' },
    { pattern: /appendix \d/i, indicator: 'References BS 7671 appendices' },
    { pattern: /adiabatic/i, indicator: 'Discusses adiabatic equation' },
    { pattern: /k factor/i, indicator: 'Mentions k factors' },
  ];
  
  let expertMatches = 0;
  expertPatterns.forEach(({ pattern, indicator }) => {
    const matchCount = userMessages.filter(m => pattern.test(m.content)).length;
    if (matchCount > 0) {
      expertMatches++;
      indicators.push(indicator);
    }
  });
  
  if (expertMatches >= 3) {
    score += 30;
  } else if (expertMatches >= 1) {
    score += 15;
  }
  
  // === DESIGNER INDICATORS (+15 points) ===
  const designerPatterns = [
    { pattern: /design current/i, indicator: 'Understands design current (Ib)' },
    { pattern: /mcb rating/i, indicator: 'Specifies MCB ratings' },
    { pattern: /cable sizing/i, indicator: 'Discusses cable sizing methodology' },
    { pattern: /installation method/i, indicator: 'Considers installation methods' },
    { pattern: /reference method/i, indicator: 'Knows reference methods' },
  ];
  
  let designerMatches = 0;
  designerPatterns.forEach(({ pattern, indicator }) => {
    if (userMessages.some(m => pattern.test(m.content))) {
      designerMatches++;
      indicators.push(indicator);
    }
  });
  
  if (designerMatches >= 2) {
    score += 15;
  }
  
  // === APPRENTICE INDICATORS (-20 points) ===
  const apprenticePatterns = [
    { pattern: /what is/i, indicator: 'Asks basic "what is" questions' },
    { pattern: /can you explain/i, indicator: 'Requests explanations' },
    { pattern: /how do i/i, indicator: 'Asks "how to" questions' },
    { pattern: /why do we need/i, indicator: 'Seeks foundational understanding' },
    { pattern: /what does.*mean/i, indicator: 'Asks for definitions' },
    { pattern: /^help/i, indicator: 'Requests general help' },
  ];
  
  let apprenticeMatches = 0;
  apprenticePatterns.forEach(({ pattern, indicator }) => {
    const matchCount = userMessages.filter(m => pattern.test(m.content)).length;
    if (matchCount > 0) {
      apprenticeMatches++;
      indicators.push(indicator);
    }
  });
  
  if (apprenticeMatches >= 3) {
    score -= 20;
  } else if (apprenticeMatches >= 1) {
    score -= 10;
  }
  
  // === COMPLEXITY INDICATORS ===
  const complexityIndicators = userMessages.filter(m => {
    const words = m.content.split(/\s+/).length;
    return words > 30; // Detailed, complex queries
  }).length;
  
  if (complexityIndicators >= 2) {
    score += 10;
    indicators.push('Asks complex, detailed questions');
  }
  
  // === DETERMINE LEVEL ===
  let level: 'apprentice' | 'electrician' | 'designer' | 'expert' = 'electrician';
  let adaptationGuidance = '';
  
  if (score >= 75) {
    level = 'expert';
    adaptationGuidance = 'Provide concise technical specs with regulation citations. Minimal basic explanations. Focus on advanced considerations and edge cases.';
  } else if (score >= 60) {
    level = 'designer';
    adaptationGuidance = 'Provide detailed technical specs with calculation steps. Include regulation references. Explain methodology but assume electrical fundamentals are understood.';
  } else if (score >= 40) {
    level = 'electrician';
    adaptationGuidance = 'Provide standard technical detail with practical context. Include calculations and regulation backing. Balance technical accuracy with clarity.';
  } else {
    level = 'apprentice';
    adaptationGuidance = 'Provide educational step-by-step explanations. Explain WHY each decision is made. Include foundational electrical principles. Use analogies where helpful.';
  }
  
  // Calculate confidence (how far from neutral 50)
  const confidence = Math.min(100, Math.abs(score - 50) * 2);
  
  return {
    level,
    confidence,
    indicators,
    adaptationGuidance
  };
}
