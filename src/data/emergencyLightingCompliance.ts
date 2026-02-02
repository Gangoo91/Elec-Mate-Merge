/**
 * Emergency Lighting Compliance Data
 *
 * Contains verified requirements from:
 * - BS 5266-1:2016 Emergency lighting - Code of practice for the emergency lighting of premises
 * - BS EN 1838:2013 Lighting applications - Emergency lighting
 * - BS EN 50172:2004 Emergency escape lighting systems
 * - BS EN 60598-2-22 Luminaires for emergency lighting
 *
 * All values are from official British Standards documents.
 */

export type ZoneCategory =
  | 'escape-route'
  | 'open-area'
  | 'high-risk'
  | 'safety-equipment';

export type OccupancyType =
  | 'sleeping-risk'        // Hotels, care homes, hospitals - 3hr required
  | 'entertainment'        // Cinemas, theatres - 3hr recommended
  | 'high-occupancy'       // Shopping centres, large offices - 1hr minimum
  | 'normal-occupancy'     // Standard offices, retail - 1hr minimum
  | 'industrial';          // Warehouses, factories - 1hr minimum

export type TestType =
  | 'daily'               // Central battery indicator check only
  | 'monthly'             // Brief functional test
  | 'annual'              // Full duration test
  | 'commissioning';      // Initial installation test

export interface ValidationResult {
  valid: boolean;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  reference?: string;      // BS reference clause
}

export interface LuxRequirement {
  minLux: number;
  maxUniformityRatio: number;     // max:min ratio (e.g., 40 means 40:1)
  reference: string;
}

export interface DurationRequirement {
  minDuration: number;            // minutes
  description: string;
  reference: string;
}

// ============================================
// BS EN 1838:2013 LUX LEVEL REQUIREMENTS
// ============================================

/**
 * Minimum illuminance requirements per BS EN 1838:2013
 *
 * Escape routes (Section 4.2):
 * - Minimum 1 lux at floor level along centre line
 * - Central band (50% of route width) must have at least 0.5 lux
 * - Uniformity ratio not greater than 40:1
 *
 * Anti-panic/Open areas (Section 4.3):
 * - Minimum 0.5 lux at floor level (excluding 0.5m perimeter border)
 * - Open area defined as >60m² or with hazards
 * - Uniformity ratio not greater than 40:1
 *
 * High-risk task areas (Section 4.4):
 * - Minimum 10% of normal maintained illuminance
 * - Never less than 15 lux
 * - Uniformity ratio not greater than 10:1
 *
 * Safety equipment/signs (Section 4.5):
 * - Minimum 5 lux vertical illuminance
 * - Within 2m horizontal distance
 */
export const LUX_REQUIREMENTS: Record<ZoneCategory, LuxRequirement> = {
  'escape-route': {
    minLux: 1,
    maxUniformityRatio: 40,
    reference: 'BS EN 1838:2013 Section 4.2'
  },
  'open-area': {
    minLux: 0.5,
    maxUniformityRatio: 40,
    reference: 'BS EN 1838:2013 Section 4.3'
  },
  'high-risk': {
    minLux: 15,
    maxUniformityRatio: 10,
    reference: 'BS EN 1838:2013 Section 4.4'
  },
  'safety-equipment': {
    minLux: 5,
    maxUniformityRatio: 10,
    reference: 'BS EN 1838:2013 Section 4.5'
  }
};

// ============================================
// BS 5266-1:2016 DURATION REQUIREMENTS
// ============================================

/**
 * Duration requirements per BS 5266-1:2016
 *
 * 3 Hours Required When:
 * - Premises not evacuated immediately (sleeping accommodation)
 * - Premises reoccupied immediately after supply restoration
 * - Examples: Hotels, hospitals, care homes, prisons, hostels
 *
 * 1 Hour Acceptable When:
 * - Premises evacuated immediately on supply failure
 * - Not reoccupied until batteries fully recharged (up to 24 hours)
 * - Examples: Offices, shops, warehouses with rapid evacuation
 *
 * UK Practice Note:
 * Due to the complications of having two duration types, 3-hour
 * duration emergency lighting is almost exclusively used in the UK.
 */
export const DURATION_REQUIREMENTS: Record<OccupancyType, DurationRequirement> = {
  'sleeping-risk': {
    minDuration: 180,
    description: 'Sleeping risk premises - immediate evacuation not feasible',
    reference: 'BS 5266-1:2016 Clause 5.4'
  },
  'entertainment': {
    minDuration: 180,
    description: 'Entertainment venues - may not evacuate immediately',
    reference: 'BS 5266-1:2016 Clause 5.4'
  },
  'high-occupancy': {
    minDuration: 60,
    description: 'High occupancy - rapid evacuation possible, 3hr recommended',
    reference: 'BS 5266-1:2016 Clause 5.4'
  },
  'normal-occupancy': {
    minDuration: 60,
    description: 'Normal occupancy - rapid evacuation possible',
    reference: 'BS 5266-1:2016 Clause 5.4'
  },
  'industrial': {
    minDuration: 60,
    description: 'Industrial premises - rapid evacuation typically possible',
    reference: 'BS 5266-1:2016 Clause 5.4'
  }
};

/**
 * Premises types that require 3-hour duration
 * Per BS 5266-1:2016
 */
export const SLEEPING_RISK_PREMISES = [
  'Hotel',
  'Guest house',
  'Bed & breakfast',
  'Hostel',
  'Hospital',
  'Care home',
  'Nursing home',
  'Residential care',
  'Prison',
  'Detention centre',
  'Boarding school',
  'University halls',
  'Student accommodation',
  'Sheltered housing',
  'HMO (House in Multiple Occupation)',
  'Serviced apartments'
];

/**
 * Premises types that should use 3-hour for safety
 * (Not mandated but strongly recommended)
 */
export const RECOMMENDED_3HR_PREMISES = [
  'Cinema',
  'Theatre',
  'Concert hall',
  'Nightclub',
  'Large shopping centre',
  'Exhibition centre',
  'Sports stadium',
  'Arena',
  'Underground premises',
  'Basement premises'
];

// ============================================
// BS 5266-1:2016 / BS EN 50172 TEST INTERVALS
// ============================================

/**
 * Test intervals per BS 5266-1:2016 and BS EN 50172:2004
 *
 * Daily (Central Battery Only):
 * - Visual check of central power supply indicators
 * - Verify system shows healthy operation
 *
 * Monthly:
 * - Brief functional test of each luminaire
 * - Simulate power failure
 * - Verify all lamps illuminate
 * - Check charging indicators
 * - Duration: Just long enough to confirm operation (typically 30 seconds)
 *
 * Annual:
 * - Full duration test (1 or 3 hours depending on system rating)
 * - All luminaires must still operate at end of test
 * - Should be performed at times of low risk
 * - Allow 24 hours recharge time before re-occupancy if possible
 *
 * Record Keeping:
 * - All tests must be recorded in a logbook
 * - Records should include: date, type of test, results, faults, remedial actions
 */
export const TEST_INTERVALS: Record<TestType, { days: number; description: string; reference: string }> = {
  'daily': {
    days: 1,
    description: 'Visual check of central battery indicators (central systems only)',
    reference: 'BS EN 50172:2004 Clause 6.2'
  },
  'monthly': {
    days: 30,
    description: 'Brief functional test - simulate power failure, check all luminaires illuminate',
    reference: 'BS 5266-1:2016 Clause 12.2 / BS EN 50172:2004 Clause 6.3'
  },
  'annual': {
    days: 365,
    description: 'Full rated duration test - verify operation for full 1 or 3 hour period',
    reference: 'BS 5266-1:2016 Clause 12.3 / BS EN 50172:2004 Clause 6.4'
  },
  'commissioning': {
    days: 0,
    description: 'Initial installation test - verify all luminaires, record baseline',
    reference: 'BS 5266-1:2016 Clause 11'
  }
};

// ============================================
// BS EN 1838:2013 RESPONSE TIME REQUIREMENTS
// ============================================

/**
 * Response time requirements per BS EN 1838:2013
 */
export const RESPONSE_TIME_REQUIREMENTS = {
  standard: {
    fiftyPercent: 5,      // 50% illuminance within 5 seconds
    fullOutput: 60,       // Full illuminance within 60 seconds
    reference: 'BS EN 1838:2013 Clause 4.2.5'
  },
  highRisk: {
    fiftyPercent: 0.5,    // 50% within 0.5 seconds
    fullOutput: 0.5,      // 100% within 0.5 seconds (instant)
    reference: 'BS EN 1838:2013 Clause 4.4.5'
  }
};

// ============================================
// VALIDATION FUNCTIONS
// ============================================

/**
 * Validate a lux reading against BS EN 1838 requirements
 */
export function validateLuxReading(
  lux: number,
  category: ZoneCategory
): ValidationResult {
  const requirement = LUX_REQUIREMENTS[category];
  if (!requirement) {
    return {
      valid: false,
      status: 'fail',
      message: 'Unknown zone category'
    };
  }

  if (lux >= requirement.minLux) {
    return {
      valid: true,
      status: 'pass',
      message: `Lux reading ${lux} meets minimum requirement of ${requirement.minLux} lux`,
      reference: requirement.reference
    };
  }

  // Check if it's close (within 20%) - show as warning
  if (lux >= requirement.minLux * 0.8) {
    return {
      valid: false,
      status: 'warning',
      message: `Lux reading ${lux} is below minimum ${requirement.minLux} lux but close - verify measurement`,
      reference: requirement.reference
    };
  }

  return {
    valid: false,
    status: 'fail',
    message: `Lux reading ${lux} FAILS minimum requirement of ${requirement.minLux} lux`,
    reference: requirement.reference
  };
}

/**
 * Validate uniformity ratio against BS EN 1838 requirements
 */
export function validateUniformity(
  maxLux: number,
  minLux: number,
  category: ZoneCategory
): ValidationResult {
  const requirement = LUX_REQUIREMENTS[category];
  if (!requirement) {
    return {
      valid: false,
      status: 'fail',
      message: 'Unknown zone category'
    };
  }

  if (minLux === 0) {
    return {
      valid: false,
      status: 'fail',
      message: 'Minimum lux cannot be zero for uniformity calculation',
      reference: requirement.reference
    };
  }

  const ratio = maxLux / minLux;

  if (ratio <= requirement.maxUniformityRatio) {
    return {
      valid: true,
      status: 'pass',
      message: `Uniformity ratio ${ratio.toFixed(1)}:1 meets requirement of ${requirement.maxUniformityRatio}:1`,
      reference: requirement.reference
    };
  }

  return {
    valid: false,
    status: 'fail',
    message: `Uniformity ratio ${ratio.toFixed(1)}:1 exceeds maximum ${requirement.maxUniformityRatio}:1`,
    reference: requirement.reference
  };
}

/**
 * Validate duration against BS 5266-1 requirements for premises type
 */
export function validateDuration(
  durationMinutes: number,
  occupancyType: OccupancyType
): ValidationResult {
  const requirement = DURATION_REQUIREMENTS[occupancyType];
  if (!requirement) {
    return {
      valid: false,
      status: 'fail',
      message: 'Unknown occupancy type'
    };
  }

  if (durationMinutes >= requirement.minDuration) {
    return {
      valid: true,
      status: 'pass',
      message: `Duration ${durationMinutes} minutes meets ${requirement.minDuration} minute requirement`,
      reference: requirement.reference
    };
  }

  return {
    valid: false,
    status: 'fail',
    message: `Duration ${durationMinutes} minutes FAILS ${requirement.minDuration} minute requirement for ${occupancyType}`,
    reference: requirement.reference
  };
}

/**
 * Check if a test is overdue based on last test date
 */
export function isTestOverdue(
  lastTestDate: Date | string | null,
  testType: TestType
): { overdue: boolean; daysSinceTest: number; daysOverdue: number } {
  if (!lastTestDate) {
    return { overdue: true, daysSinceTest: Infinity, daysOverdue: Infinity };
  }

  const testDate = typeof lastTestDate === 'string' ? new Date(lastTestDate) : lastTestDate;
  const now = new Date();
  const diffTime = now.getTime() - testDate.getTime();
  const daysSinceTest = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const interval = TEST_INTERVALS[testType];
  const daysOverdue = daysSinceTest - interval.days;

  return {
    overdue: daysOverdue > 0,
    daysSinceTest,
    daysOverdue: Math.max(0, daysOverdue)
  };
}

/**
 * Calculate next test due date
 */
export function calculateNextTestDate(
  lastTestDate: Date | string,
  testType: TestType
): Date {
  const testDate = typeof lastTestDate === 'string' ? new Date(lastTestDate) : lastTestDate;
  const nextDate = new Date(testDate);

  switch (testType) {
    case 'daily':
      nextDate.setDate(nextDate.getDate() + 1);
      break;
    case 'monthly':
      nextDate.setMonth(nextDate.getMonth() + 1);
      break;
    case 'annual':
      nextDate.setFullYear(nextDate.getFullYear() + 1);
      break;
    case 'commissioning':
      // No next date for commissioning
      break;
  }

  return nextDate;
}

/**
 * Get duration requirement for a premises type
 */
export function getDurationRequirement(premisesType: string): {
  duration: 60 | 180;
  reason: string;
  reference: string;
} {
  const normalizedType = premisesType.toLowerCase();

  // Check sleeping risk premises
  if (SLEEPING_RISK_PREMISES.some(p => normalizedType.includes(p.toLowerCase()))) {
    return {
      duration: 180,
      reason: 'Sleeping risk premises - immediate evacuation not feasible',
      reference: 'BS 5266-1:2016 Clause 5.4'
    };
  }

  // Check recommended 3hr premises
  if (RECOMMENDED_3HR_PREMISES.some(p => normalizedType.includes(p.toLowerCase()))) {
    return {
      duration: 180,
      reason: 'Entertainment/large venue - 3 hour duration recommended',
      reference: 'BS 5266-1:2016 Clause 5.4 (recommendation)'
    };
  }

  // Default to 1 hour but recommend 3 hours per UK practice
  return {
    duration: 60,
    reason: 'Standard premises - 1 hour minimum (3 hours recommended for UK practice)',
    reference: 'BS 5266-1:2016 Clause 5.4'
  };
}

/**
 * Validate battery condition
 */
export function validateBatteryCondition(
  condition: 'good' | 'fair' | 'poor' | string
): ValidationResult {
  switch (condition.toLowerCase()) {
    case 'good':
      return {
        valid: true,
        status: 'pass',
        message: 'Battery condition is good'
      };
    case 'fair':
      return {
        valid: true,
        status: 'warning',
        message: 'Battery condition is fair - schedule replacement within 12 months'
      };
    case 'poor':
      return {
        valid: false,
        status: 'fail',
        message: 'Battery condition is poor - immediate replacement required'
      };
    default:
      return {
        valid: false,
        status: 'warning',
        message: 'Unknown battery condition'
      };
  }
}

/**
 * Get defect priority based on defect type
 * Per industry best practice and BS 5266-1 guidance
 */
export function suggestDefectPriority(
  defectDescription: string
): { priority: 'immediate' | '7-days' | '28-days' | 'recommendation'; reason: string } {
  const description = defectDescription.toLowerCase();

  // Immediate - safety critical
  const immediateKeywords = [
    'failed functional test',
    'not working',
    'not illuminating',
    'dead',
    'no light',
    'failed to operate',
    'complete failure',
    'total failure',
    'exit sign dark',
    'exit sign failed'
  ];
  if (immediateKeywords.some(k => description.includes(k))) {
    return {
      priority: 'immediate',
      reason: 'Safety critical - emergency lighting non-functional'
    };
  }

  // Within 7 days - reduced performance
  const sevenDayKeywords = [
    'low battery',
    'battery depleted',
    'battery weak',
    'short duration',
    'reduced output',
    'dim',
    'flickering',
    'intermittent',
    'failed duration test'
  ];
  if (sevenDayKeywords.some(k => description.includes(k))) {
    return {
      priority: '7-days',
      reason: 'Reduced performance - may not provide full emergency duration'
    };
  }

  // Within 28 days - minor issues
  const twentyEightDayKeywords = [
    'charging indicator',
    'self-test indicator',
    'legend faded',
    'legend damaged',
    'minor damage',
    'cosmetic',
    'dirty',
    'discoloured',
    'diffuser cracked'
  ];
  if (twentyEightDayKeywords.some(k => description.includes(k))) {
    return {
      priority: '28-days',
      reason: 'Minor issue - does not affect immediate safety'
    };
  }

  // Default to recommendation
  return {
    priority: 'recommendation',
    reason: 'Advisory - review and address as appropriate'
  };
}

/**
 * Get BS 5266 info box content for premises type
 */
export function getPremisesGuidance(premisesType: string): {
  title: string;
  content: string;
  duration: 60 | 180;
  reference: string;
} {
  const requirement = getDurationRequirement(premisesType);

  if (requirement.duration === 180) {
    return {
      title: '3-Hour Duration Required',
      content: `This premises type requires a minimum 3-hour emergency lighting duration per BS 5266-1:2016. ${requirement.reason}. Ensure all luminaires are rated for 180 minutes minimum.`,
      duration: 180,
      reference: requirement.reference
    };
  }

  return {
    title: '1-Hour Minimum (3-Hour Recommended)',
    content: `This premises type requires a minimum 1-hour emergency lighting duration. However, UK practice strongly recommends 3-hour duration to allow immediate re-occupancy after power restoration without waiting for battery recharge.`,
    duration: 60,
    reference: requirement.reference
  };
}

/**
 * Validate viewing distance for exit signs
 * Per BS EN 1838:2013 and BS 5499-4
 */
export function validateExitSignViewing(
  signHeight: number,      // mm
  viewingDistance: number  // metres
): ValidationResult {
  // Distance factor: viewing distance = height x distance factor
  // Standard factor is ~200 for internally illuminated signs
  const distanceFactor = 200;
  const maxDistance = (signHeight / 1000) * distanceFactor;

  if (viewingDistance <= maxDistance) {
    return {
      valid: true,
      status: 'pass',
      message: `Viewing distance ${viewingDistance}m is within ${maxDistance.toFixed(1)}m maximum for ${signHeight}mm sign`,
      reference: 'BS EN 1838:2013 / BS 5499-4'
    };
  }

  return {
    valid: false,
    status: 'fail',
    message: `Viewing distance ${viewingDistance}m exceeds ${maxDistance.toFixed(1)}m maximum - larger sign or additional signs required`,
    reference: 'BS EN 1838:2013 / BS 5499-4'
  };
}
