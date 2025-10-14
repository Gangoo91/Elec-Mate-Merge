/**
 * RAG Result Validation & Prioritization
 * Ensures retrieved regulations are COMPLETE and RELEVANT
 */

import { QueryIntent } from './query-intent.ts';

export interface ValidationResult {
  isComplete: boolean;
  missingTopics: string[];
  redundantRegulations: string[];
  criticalRegulations: Array<{ 
    regulation: string; 
    reason: string;
    priority: 'critical' | 'high' | 'medium';
  }>;
  confidence: number; // 0-100
  coverageReport: {
    hasCableSizing: boolean;
    hasVoltageDrop: boolean;
    hasProtection: boolean;
    hasLocationRequirements: boolean;
    hasInstallationMethod: boolean;
  };
}

/**
 * Validate that RAG retrieved the RIGHT regulations for the query
 */
export function validateRAGResults(
  query: string,
  intent: QueryIntent,
  retrievedRegulations: any[]
): ValidationResult {
  
  // Define required topics based on intent
  const requiredTopics = getRequiredTopics(intent, query);
  
  // Check coverage
  const coverage = checkCoverage(retrievedRegulations, requiredTopics);
  
  // Identify missing critical topics
  const missing = identifyMissingTopics(requiredTopics, coverage);
  
  // Find redundant/duplicate regulations
  const redundant = findRedundantRegulations(retrievedRegulations);
  
  // Identify critical regulations
  const critical = identifyCriticalRegulations(query, intent, retrievedRegulations);
  
  // Calculate confidence score
  const confidence = calculateConfidence(coverage, missing.length, retrievedRegulations.length);
  
  return {
    isComplete: missing.length === 0,
    missingTopics: missing,
    redundantRegulations: redundant,
    criticalRegulations: critical,
    confidence,
    coverageReport: coverage
  };
}

/**
 * Define required topics based on query intent
 */
function getRequiredTopics(intent: QueryIntent, query: string): Set<string> {
  const topics = new Set<string>();
  
  // Base requirements for design requests
  if (intent.type === 'design_request') {
    topics.add('cable_sizing'); // Reg 433.1
    topics.add('voltage_drop'); // Reg 525
    topics.add('protection'); // Reg 411
    
    // Add based on query specifics
    if (/three.?phase/i.test(query)) {
      topics.add('three_phase'); // Table 4D4B, Reg 559
    }
    if (/bathroom/i.test(query)) {
      topics.add('special_location'); // Section 701
    }
    if (/outdoor|buried|swa/i.test(query)) {
      topics.add('outdoor_installation'); // Section 522
    }
    if (/ev|charger/i.test(query)) {
      topics.add('ev_charging'); // Section 722
    }
  }
  
  // Why questions need the specific regulation being questioned
  if (intent.type === 'why_question') {
    if (/cable size|upsize/i.test(query)) {
      topics.add('cable_sizing');
      topics.add('voltage_drop');
    }
    if (/swa|armoured/i.test(query)) {
      topics.add('cable_selection'); // Reg 521
      topics.add('mechanical_protection'); // Reg 522
    }
    if (/rcd|protection/i.test(query)) {
      topics.add('protection'); // Reg 411
    }
  }
  
  // Alternative comparisons need both options
  if (intent.type === 'alternative_comparison') {
    topics.add('cable_selection'); // Reg 521
    topics.add('installation_method'); // Table 4A2
  }
  
  return topics;
}

/**
 * Check if retrieved regulations cover required topics
 */
function checkCoverage(regulations: any[], requiredTopics: Set<string>): {
  hasCableSizing: boolean;
  hasVoltageDrop: boolean;
  hasProtection: boolean;
  hasLocationRequirements: boolean;
  hasInstallationMethod: boolean;
} {
  const regText = regulations.map(r => (r.content + ' ' + r.regulation_number + ' ' + (r.section || '')).toLowerCase()).join(' ');
  
  return {
    hasCableSizing: /433\.1|Ib.*In.*Iz|overload protection|current.?carrying capacity|table 4d/i.test(regText),
    hasVoltageDrop: /525|voltage drop|mV\/A\/m|appendix 4 section 6/i.test(regText),
    hasProtection: /411\.|earth fault|automatic disconnection|rcd|protective device|531\./i.test(regText),
    hasLocationRequirements: /701\.|702\.|703\.|special location|bathroom|outdoor/i.test(regText),
    hasInstallationMethod: /521\.|522\.|wiring system|installation method|table 4a2/i.test(regText)
  };
}

/**
 * Identify missing critical topics
 */
function identifyMissingTopics(requiredTopics: Set<string>, coverage: any): string[] {
  const missing: string[] = [];
  
  const topicToCoverage: Record<string, keyof typeof coverage> = {
    'cable_sizing': 'hasCableSizing',
    'voltage_drop': 'hasVoltageDrop',
    'protection': 'hasProtection',
    'special_location': 'hasLocationRequirements',
    'outdoor_installation': 'hasLocationRequirements',
    'cable_selection': 'hasInstallationMethod',
    'installation_method': 'hasInstallationMethod'
  };
  
  for (const topic of requiredTopics) {
    const coverageKey = topicToCoverage[topic];
    if (coverageKey && !coverage[coverageKey]) {
      missing.push(topic);
    }
  }
  
  return missing;
}

/**
 * Find redundant/duplicate regulations
 */
function findRedundantRegulations(regulations: any[]): string[] {
  const seen = new Set<string>();
  const redundant: string[] = [];
  
  for (const reg of regulations) {
    const key = reg.regulation_number + '|' + reg.content.slice(0, 100);
    if (seen.has(key)) {
      redundant.push(reg.regulation_number);
    } else {
      seen.add(key);
    }
  }
  
  return redundant;
}

/**
 * Identify critical regulations that MUST be applied
 */
function identifyCriticalRegulations(
  query: string,
  intent: QueryIntent,
  regulations: any[]
): Array<{ regulation: string; reason: string; priority: 'critical' | 'high' | 'medium' }> {
  const critical: Array<{ regulation: string; reason: string; priority: 'critical' | 'high' | 'medium' }> = [];
  
  for (const reg of regulations) {
    const regNum = reg.regulation_number;
    const content = reg.content.toLowerCase();
    
    // CRITICAL: Cable sizing fundamentals
    if (/433\.1\.1/.test(regNum)) {
      critical.push({
        regulation: regNum,
        reason: 'Fundamental relationship Ib ≤ In ≤ Iz - MUST be satisfied',
        priority: 'critical'
      });
    }
    
    // CRITICAL: Voltage drop limits
    if (/525/.test(regNum) && /voltage drop/i.test(content)) {
      critical.push({
        regulation: regNum,
        reason: 'Maximum voltage drop limits (5% power, 3% lighting) - MUST comply',
        priority: 'critical'
      });
    }
    
    // CRITICAL: Earth fault protection
    if (/411\.3\.2|411\.3\.3/.test(regNum)) {
      critical.push({
        regulation: regNum,
        reason: 'Automatic disconnection for earth faults - safety critical',
        priority: 'critical'
      });
    }
    
    // HIGH: Cable selection for location
    if (/521/.test(regNum) && /wiring system/i.test(content)) {
      critical.push({
        regulation: regNum,
        reason: 'Wiring system selection based on installation conditions',
        priority: 'high'
      });
    }
    
    // HIGH: Mechanical protection
    if (/522/.test(regNum) && /mechanical|buried|outdoor/i.test(content)) {
      critical.push({
        regulation: regNum,
        reason: 'Mechanical protection requirements for installation method',
        priority: 'high'
      });
    }
    
    // HIGH: Special locations
    if (/^70[1-9]/.test(regNum)) {
      critical.push({
        regulation: regNum,
        reason: 'Special location requirements (bathroom/outdoor/etc)',
        priority: 'high'
      });
    }
    
    // MEDIUM: Installation tables
    if (/table 4[a-e]/i.test(regNum) || /table 4[a-e]/i.test(content)) {
      critical.push({
        regulation: regNum,
        reason: 'Current-carrying capacity or installation reference table',
        priority: 'medium'
      });
    }
  }
  
  return critical;
}

/**
 * Calculate confidence score (0-100)
 */
function calculateConfidence(coverage: any, missingCount: number, totalRetrieved: number): number {
  let score = 100;
  
  // Deduct for missing topics
  score -= missingCount * 15; // -15 per missing topic
  
  // Deduct if missing critical coverage
  if (!coverage.hasCableSizing) score -= 25; // Critical
  if (!coverage.hasVoltageDrop) score -= 20; // Critical
  if (!coverage.hasProtection) score -= 15; // Important
  
  // Bonus for good retrieval count
  if (totalRetrieved >= 10) score += 5;
  if (totalRetrieved >= 15) score += 5;
  
  // Clamp to 0-100
  return Math.max(0, Math.min(100, score));
}

/**
 * Generate human-readable coverage report
 */
export function generateCoverageReport(validation: ValidationResult): string {
  const lines: string[] = [];
  
  lines.push('📊 RAG COVERAGE REPORT:');
  lines.push(`Confidence: ${validation.confidence}%`);
  lines.push('');
  
  const coverage = validation.coverageReport;
  lines.push(`✓ Cable Sizing (Reg 433.1): ${coverage.hasCableSizing ? '✅' : '❌'}`);
  lines.push(`✓ Voltage Drop (Reg 525): ${coverage.hasVoltageDrop ? '✅' : '❌'}`);
  lines.push(`✓ Protection (Reg 411): ${coverage.hasProtection ? '✅' : '❌'}`);
  lines.push(`✓ Installation Method (Reg 521/522): ${coverage.hasInstallationMethod ? '✅' : '❌'}`);
  lines.push(`✓ Location Requirements: ${coverage.hasLocationRequirements ? '✅' : '❌'}`);
  
  if (validation.missingTopics.length > 0) {
    lines.push('');
    lines.push('⚠️ MISSING CRITICAL TOPICS:');
    validation.missingTopics.forEach(topic => {
      lines.push(`  - ${topic.replace('_', ' ')}`);
    });
  }
  
  if (validation.criticalRegulations.length > 0) {
    lines.push('');
    lines.push('🔥 CRITICAL REGULATIONS:');
    validation.criticalRegulations
      .filter(r => r.priority === 'critical')
      .slice(0, 3)
      .forEach(r => {
        lines.push(`  - ${r.regulation}: ${r.reason}`);
      });
  }
  
  return lines.join('\n');
}
