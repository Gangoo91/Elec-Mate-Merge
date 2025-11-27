/**
 * EICR Classification Decision Tree & Validation Logic
 * 
 * Provides hard-coded validation rules based on Electrical Safety First Best Practice Guide 4
 * to ensure 99/100 classification accuracy by catching obvious misclassifications.
 */

import { BPG4_DEFECT_EXAMPLES, CONTEXT_ESCALATION_RULES } from './eicr-coding-constants.ts';

export interface ClassificationContext {
  location?: string;
  zone?: string;
  rcdPresent?: boolean;
  accessibility?: 'accessible' | 'concealed' | 'restricted';
  voltage?: number;
  conductorState?: 'intact' | 'damaged' | 'exposed';
}

export interface ValidationResult {
  valid: boolean;
  correction?: 'C1' | 'C2' | 'C3' | 'FI';
  reason?: string;
  confidence: number;
  bpg4Reference?: string;
}

/**
 * Absolute C1 triggers - these ALWAYS result in C1 classification
 * No context can change this - they are immediate dangers
 */
const C1_ABSOLUTE_TRIGGERS = [
  { keywords: ['exposed live', 'live parts accessible', 'bare conductor'], regulation: '416.2.1' },
  { keywords: ['incorrect polarity', 'reversed polarity', 'polarity reversed'], regulation: '612.6' },
  { keywords: ['conductive parts live', 'metal case live', 'exposed conductive parts live'], regulation: '411.3.1' },
  { keywords: ['arcing', 'sparking'], regulation: '526.1' },
  { keywords: ['burning smell', 'charred', 'charring', 'melted'], regulation: '526.1' },
  { keywords: ['missing knockout', 'broken enclosure', 'damaged enclosure'], regulation: '416.2', condition: 'and live parts visible' },
];

/**
 * Never C1 - these defects should NEVER be classified as C1
 * Validation will auto-correct if AI mistakenly classifies these as C1
 */
const NEVER_C1_DEFECTS = [
  { keywords: ['old wiring colours', 'old cable colours', 'red black cables'], correctClassification: 'C3', reason: 'Old colours are C3 improvement, not immediate danger' },
  { keywords: ['no SPD', 'absence of SPD', 'surge protection'], correctClassification: 'C3', reason: 'SPD absence is C3 per BPG4 page 16' },
  { keywords: ['poor labelling', 'no circuit chart', 'inadequate labelling'], correctClassification: 'C3', reason: 'Labelling issues are C3, not dangerous' },
  { keywords: ['no AFDD', 'absence of AFDD'], correctClassification: 'C3', reason: 'AFDD is recommended improvement, not required' },
  { keywords: ['plastic consumer unit'], correctClassification: 'C3', reason: 'Plastic CU in non-escape route is C3' },
];

/**
 * Context-dependent escalation rules
 * Base classification can be escalated based on location or circumstances
 */
const CONTEXT_ESCALATION_MATRIX = {
  'no RCD protection': {
    baseClassification: 'C3' as const,
    rules: [
      {
        contextKeywords: ['bathroom', 'zone 0', 'zone 1', 'wet room'],
        escalateTo: 'C1' as const,
        reason: 'Bathroom Zone 0/1 without RCD = immediate shock risk in wet location',
        bpg4Page: 14
      },
      {
        contextKeywords: ['bathroom', 'zone 2'],
        escalateTo: 'C2' as const,
        reason: 'Bathroom Zone 2 requires RCD protection per Reg 701.512.3',
        bpg4Page: 14
      },
      {
        contextKeywords: ['outdoor', 'outside', 'external'],
        escalateTo: 'C2' as const,
        reason: 'Outdoor circuits require 30mA RCD per Reg 411.3.3',
        bpg4Page: 14
      },
    ]
  },
  'cable sheath not in enclosure': {
    baseClassification: 'C3' as const,
    rules: [
      {
        contextKeywords: ['conductors accessible', 'cores visible', 'can touch'],
        escalateTo: 'C2' as const,
        reason: 'Accessible conductors create shock risk',
        bpg4Page: 13
      }
    ]
  },
  'no earthing': {
    baseClassification: 'C2' as const,
    rules: [
      {
        contextKeywords: ['no earth at all', 'completely missing', 'metal equipment present'],
        escalateTo: 'C1' as const,
        reason: 'Complete absence of earthing with exposed metalwork = immediate danger',
        bpg4Page: 13
      }
    ]
  },
  'inadequate bonding': {
    baseClassification: 'C2' as const,
    rules: [
      {
        contextKeywords: ['no bonding at all', 'missing main bonding'],
        escalateTo: 'C1' as const,
        reason: 'Complete absence of main protective bonding creates immediate danger',
        bpg4Page: 13
      }
    ]
  }
};

/**
 * Validate and potentially correct an AI classification
 * Returns validation result with correction if needed
 */
export function validateClassification(
  aiClassification: string,
  defectDescription: string,
  context?: ClassificationContext
): ValidationResult {
  const descLower = defectDescription.toLowerCase();
  const locationLower = (context?.location || '').toLowerCase();
  const zoneLower = (context?.zone || '').toLowerCase();

  // STEP 1: Check absolute C1 triggers
  for (const trigger of C1_ABSOLUTE_TRIGGERS) {
    const hasKeyword = trigger.keywords.some(kw => descLower.includes(kw));
    if (hasKeyword) {
      // Check if there's an additional condition
      if (trigger.condition) {
        const conditionMet = descLower.includes(trigger.condition.replace('and ', ''));
        if (!conditionMet) continue;
      }
      
      if (aiClassification !== 'C1') {
        return {
          valid: false,
          correction: 'C1',
          reason: `"${trigger.keywords[0]}" MUST be C1 - immediate danger to life (Reg ${trigger.regulation})`,
          confidence: 0.99,
          bpg4Reference: 'Best Practice Guide 4, Page 11-12'
        };
      }
    }
  }

  // STEP 2: Check NEVER C1 violations
  for (const neverC1 of NEVER_C1_DEFECTS) {
    const hasKeyword = neverC1.keywords.some(kw => descLower.includes(kw));
    if (hasKeyword && aiClassification === 'C1') {
      return {
        valid: false,
        correction: neverC1.correctClassification as 'C3',
        reason: neverC1.reason,
        confidence: 0.95,
        bpg4Reference: 'Best Practice Guide 4, Page 15-16'
      };
    }
  }

  // STEP 3: Check context-dependent escalations
  for (const [defectKey, escalationRule] of Object.entries(CONTEXT_ESCALATION_MATRIX)) {
    if (descLower.includes(defectKey.toLowerCase())) {
      for (const rule of escalationRule.rules) {
        const contextMatch = rule.contextKeywords.some(
          kw => descLower.includes(kw) || locationLower.includes(kw) || zoneLower.includes(kw)
        );
        
        if (contextMatch) {
          if (aiClassification !== rule.escalateTo) {
            return {
              valid: false,
              correction: rule.escalateTo,
              reason: rule.reason,
              confidence: 0.90,
              bpg4Reference: `Best Practice Guide 4, Page ${rule.bpg4Page}`
            };
          }
        }
      }
    }
  }

  // STEP 4: Special case validations
  
  // Zs exceeded should be C2
  if ((descLower.includes('zs exceed') || descLower.includes('earth fault loop')) && descLower.includes('exceed')) {
    if (aiClassification === 'C1' || aiClassification === 'C3') {
      return {
        valid: false,
        correction: 'C2',
        reason: 'Zs exceeding maximum is C2 (potentially dangerous), not C1 or C3',
        confidence: 0.92,
        bpg4Reference: 'Best Practice Guide 4, Page 13'
      };
    }
  }

  // Insulation resistance <1MΩ should be C2
  if (descLower.includes('insulation') && (descLower.includes('less than') || descLower.includes('<'))) {
    if (aiClassification === 'C1' || aiClassification === 'C3') {
      return {
        valid: false,
        correction: 'C2',
        reason: 'Insulation resistance <1MΩ is C2 (urgent action required)',
        confidence: 0.90,
        bpg4Reference: 'Best Practice Guide 4, Page 13'
      };
    }
  }

  // If we can't verify something, it should be FI
  if (descLower.includes('cannot verify') || descLower.includes('cannot access') || descLower.includes('concealed')) {
    if (aiClassification !== 'FI') {
      return {
        valid: false,
        correction: 'FI',
        reason: 'Cannot verify condition = Further Investigation required',
        confidence: 0.85,
        bpg4Reference: 'Best Practice Guide 4, Page 17'
      };
    }
  }

  // Validation passed
  return {
    valid: true,
    confidence: 0.95
  };
}

/**
 * Get classification guidance for a defect description
 * Useful for prompting the AI with relevant context
 */
export function getClassificationGuidance(defectDescription: string): {
  likelyClassification: string;
  reasoning: string;
  bpg4Examples: string[];
} {
  const descLower = defectDescription.toLowerCase();
  
  // Check C1 triggers
  for (const trigger of C1_ABSOLUTE_TRIGGERS) {
    if (trigger.keywords.some(kw => descLower.includes(kw))) {
      return {
        likelyClassification: 'C1',
        reasoning: `Matches C1 absolute trigger: ${trigger.keywords[0]} (Reg ${trigger.regulation})`,
        bpg4Examples: BPG4_DEFECT_EXAMPLES.C1_DANGER_PRESENT.examples
          .filter(ex => ex.defect.toLowerCase().includes(trigger.keywords[0]))
          .map(ex => ex.defect)
      };
    }
  }
  
  // Check NEVER C1
  for (const neverC1 of NEVER_C1_DEFECTS) {
    if (neverC1.keywords.some(kw => descLower.includes(kw))) {
      return {
        likelyClassification: neverC1.correctClassification,
        reasoning: neverC1.reason,
        bpg4Examples: BPG4_DEFECT_EXAMPLES.C3_IMPROVEMENT_RECOMMENDED.examples
          .filter(ex => neverC1.keywords.some(kw => ex.defect.toLowerCase().includes(kw)))
          .map(ex => ex.defect)
      };
    }
  }

  // Default to C2 for unmatched potentially dangerous terms
  if (descLower.includes('no earth') || descLower.includes('no RCD') || descLower.includes('exceed')) {
    return {
      likelyClassification: 'C2',
      reasoning: 'Likely C2 - potentially dangerous, but check context for possible escalation',
      bpg4Examples: BPG4_DEFECT_EXAMPLES.C2_POTENTIALLY_DANGEROUS.examples.map(ex => ex.defect)
    };
  }

  return {
    likelyClassification: 'C3',
    reasoning: 'Default to C3 - improvement recommended (validate against BPG4)',
    bpg4Examples: BPG4_DEFECT_EXAMPLES.C3_IMPROVEMENT_RECOMMENDED.examples.map(ex => ex.defect)
  };
}

/**
 * Log validation metrics for monitoring classification accuracy
 */
export function logValidationMetrics(
  original: string,
  validated: string,
  corrected: boolean,
  reason?: string
) {
  const metrics = {
    timestamp: new Date().toISOString(),
    originalClassification: original,
    validatedClassification: validated,
    correctionMade: corrected,
    correctionReason: reason || 'N/A',
    accuracyImpact: corrected ? 'prevented misclassification' : 'confirmed correct'
  };
  
  console.log('[Classification Validation]', JSON.stringify(metrics, null, 2));
  
  return metrics;
}
