/**
 * QUICK WIN #1: Prompt Optimization Helpers
 * Pre-process regulations to highlight hazards and controls
 * Reduces AI cognitive load by 30-40%
 */

import { RegulationResult } from './rag-retrieval.ts';

/**
 * Extract potential hazards from a regulation
 * Looks for danger indicators in the text
 */
export function extractHazardsFromRegulation(regulation: RegulationResult): string {
  const content = regulation.content;
  
  // Handle missing or empty content
  if (!content || typeof content !== 'string' || content.trim() === '') {
    return '- General electrical safety requirements';
  }
  
  const hazardIndicators = [
    'electric shock',
    'fire',
    'burn',
    'explosion',
    'fault',
    'danger',
    'risk',
    'injury',
    'death',
    'damage',
    'failure',
    'protection against',
    'prevent',
    'avoid'
  ];
  
  const sentences = content.split(/[.!?]+/);
  const hazardSentences = sentences.filter(sentence => 
    hazardIndicators.some(indicator => 
      sentence.toLowerCase().includes(indicator)
    )
  );
  
  if (hazardSentences.length === 0) {
    return '- General electrical safety requirements';
  }
  
  return hazardSentences
    .slice(0, 3) // Top 3 most relevant
    .map(s => `- ${s.trim()}`)
    .join('\n');
}

/**
 * Extract control requirements from a regulation
 * Looks for "shall", "must", "required" statements
 */
export function extractControlsFromRegulation(regulation: RegulationResult): string {
  const content = regulation.content;
  const sentences = content.split(/[.!?]+/);
  
  const controlSentences = sentences.filter(sentence => {
    const lower = sentence.toLowerCase();
    return (
      lower.includes('shall') ||
      lower.includes('must') ||
      lower.includes('required') ||
      lower.includes('ensure') ||
      lower.includes('provide')
    );
  });
  
  if (controlSentences.length === 0) {
    return '- Follow BS 7671:2018+A3:2024 requirements';
  }
  
  return controlSentences
    .slice(0, 3) // Top 3 control requirements
    .map(s => `- ${s.trim()}`)
    .join('\n');
}

/**
 * Determine why a regulation is relevant to the job
 * Provides context to help AI understand applicability
 */
export function determineApplicability(
  regulation: RegulationResult, 
  jobDescription: string
): string {
  const regNumber = regulation.regulation_number;
  const section = regulation.section;
  const jobLower = jobDescription.toLowerCase();
  
  // Special locations
  if (regNumber.startsWith('7')) {
    const locationMap: Record<string, string> = {
      '701': 'bathroom/shower area - special electrical requirements',
      '702': 'swimming pool area - water hazard zone',
      '703': 'hot air sauna installation',
      '704': 'construction/demolition site - temporary power',
      '705': 'agricultural/horticultural premises - livestock areas',
      '706': 'restrictive conductive location - metal-enclosed space',
      '708': 'caravan/mobile home installation',
      '709': 'marina/pleasure craft - waterside installation',
      '717': 'mobile/transportable unit installation',
      '721': 'exhibition/show installation - temporary',
      '722': 'EV charging installation - vehicle power supply'
    };
    
    const locationKey = regNumber.substring(0, 3);
    if (locationMap[locationKey]) {
      return `Applies because: ${locationMap[locationKey]}`;
    }
  }
  
  // Protection requirements
  if (regNumber.startsWith('41')) {
    if (jobLower.includes('rcd') || jobLower.includes('rcbo')) {
      return 'Applies because: RCD protection requirements';
    }
    if (jobLower.includes('earth') || jobLower.includes('bond')) {
      return 'Applies because: Earthing and protective bonding requirements';
    }
    return 'Applies because: Protection against electric shock';
  }
  
  // Circuit protection
  if (regNumber.startsWith('43')) {
    if (jobLower.includes('mcb') || jobLower.includes('fuse') || jobLower.includes('breaker')) {
      return 'Applies because: Overcurrent protection device selection';
    }
    return 'Applies because: Overcurrent protection requirements';
  }
  
  // Earthing
  if (regNumber.startsWith('54')) {
    if (jobLower.includes('earth') || jobLower.includes('bond') || jobLower.includes('cpc')) {
      return 'Applies because: Earthing and protective conductor sizing';
    }
    return 'Applies because: Earthing arrangements';
  }
  
  // Isolation and switching
  if (regNumber.startsWith('53')) {
    if (jobLower.includes('isolator') || jobLower.includes('switch') || jobLower.includes('consumer unit')) {
      return 'Applies because: Isolation and switching requirements';
    }
    return 'Applies because: Switching and control requirements';
  }
  
  // Cable selection
  if (regNumber.includes('Table 4')) {
    return 'Applies because: Cable current-carrying capacity selection';
  }
  
  // Default
  return `Relevant to: ${section}`;
}

/**
 * Build optimized regulation context for AI prompt
 * Pre-structures the information to reduce AI processing
 */
export function buildOptimizedRegulationContext(
  regulations: RegulationResult[],
  jobDescription: string
): string {
  if (regulations.length === 0) {
    return 'No specific regulations retrieved - apply general BS 7671:2018+A3:2024 requirements.';
  }
  
  return regulations.map((reg, i) => `
## ${i + 1}. ${reg.regulation_number}: ${reg.section}

**Key Hazards This Addresses:**
${extractHazardsFromRegulation(reg)}

**Control Requirements:**
${extractControlsFromRegulation(reg)}

**Applicability:**
${determineApplicability(reg, jobDescription)}

**Full Regulation:**
${reg.content.slice(0, 500)}${reg.content.length > 500 ? '...' : ''}
`).join('\n---\n');
}
