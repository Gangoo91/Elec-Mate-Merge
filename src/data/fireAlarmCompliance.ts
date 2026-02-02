/**
 * Fire Alarm Compliance Data
 *
 * Contains verified requirements from:
 * - BS 5839-1:2017 Fire detection and fire alarm systems for buildings
 * - BS EN 54 Fire detection and fire alarm systems
 *
 * All values are from official British Standards documents.
 */

export type AreaType =
  | 'general'              // General occupied areas
  | 'sleeping'             // Bedrooms, dormitories, sleeping areas
  | 'high-ambient-noise';  // Areas with high background noise

export type PremisesCategory =
  | 'care-home'
  | 'hospital'
  | 'hotel'
  | 'hmo'
  | 'residential'
  | 'office'
  | 'retail'
  | 'warehouse'
  | 'industrial'
  | 'educational'
  | 'healthcare'
  | 'hospitality'
  | 'mixed-use';

export type SystemCategoryType =
  | 'L1' | 'L2' | 'L3' | 'L4' | 'L5'
  | 'M'
  | 'P1' | 'P2';

export interface ValidationResult {
  valid: boolean;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  reference?: string;
}

export interface SoundLevelRequirement {
  minDb: number;
  description: string;
  reference: string;
}

export interface ServiceInterval {
  months: number;
  description: string;
  reference: string;
}

// ============================================
// BS 5839-1:2017 SOUND LEVEL REQUIREMENTS
// ============================================

/**
 * Sound level requirements per BS 5839-1:2017 Clause 16.5
 *
 * General areas:
 * - Minimum 65 dB(A) at any occupiable point
 * - OR 5 dB(A) above any ambient noise likely to persist for > 30 seconds
 *
 * Sleeping areas:
 * - Minimum 75 dB(A) at the bedhead
 * - Higher level required to wake sleeping persons
 *
 * Note: In areas where hearing protection is worn, visual alarm devices
 * may be necessary in addition to sounders.
 */
export const SOUND_LEVEL_REQUIREMENTS: Record<AreaType, SoundLevelRequirement> = {
  'general': {
    minDb: 65,
    description: 'General occupied areas - minimum 65 dB(A) or 5 dB above ambient',
    reference: 'BS 5839-1:2017 Clause 16.5.1'
  },
  'sleeping': {
    minDb: 75,
    description: 'Sleeping areas (bedrooms) - minimum 75 dB(A) at bedhead',
    reference: 'BS 5839-1:2017 Clause 16.5.2'
  },
  'high-ambient-noise': {
    minDb: 65,
    description: 'High ambient noise areas - 5 dB(A) above ambient noise level',
    reference: 'BS 5839-1:2017 Clause 16.5.1'
  }
};

// ============================================
// BS 5839-1:2017 SERVICE INTERVALS
// ============================================

/**
 * Service and inspection intervals per BS 5839-1:2017 Clause 45
 *
 * Weekly:
 * - User check of panel indicators
 *
 * Monthly:
 * - Test operation of at least one device per zone (rotating)
 *
 * Quarterly:
 * - Test at least 25% of devices
 * - Check batteries and chargers
 *
 * 6-Monthly:
 * - Full service inspection by competent person
 * - Test ALL devices
 * - Check all connections
 * - Verify cause and effect programming
 *
 * Annually:
 * - Comprehensive test and inspection
 * - Test batteries under load
 * - Check all cable routes
 */
export const SERVICE_INTERVALS = {
  weekly: {
    months: 0.25,
    days: 7,
    description: 'Weekly user check - verify panel shows normal, no faults',
    reference: 'BS 5839-1:2017 Clause 45.2'
  },
  monthly: {
    months: 1,
    days: 30,
    description: 'Monthly test - operate one device per zone (rotation)',
    reference: 'BS 5839-1:2017 Clause 45.3'
  },
  quarterly: {
    months: 3,
    days: 90,
    description: 'Quarterly test - 25% of devices, check batteries',
    reference: 'BS 5839-1:2017 Clause 45.4'
  },
  sixMonthly: {
    months: 6,
    days: 183,
    description: 'Six-monthly service - full inspection by competent person',
    reference: 'BS 5839-1:2017 Clause 45.5'
  },
  annual: {
    months: 12,
    days: 365,
    description: 'Annual comprehensive test - load test batteries, check all cables',
    reference: 'BS 5839-1:2017 Clause 45.6'
  }
};

// ============================================
// BS 5839-1:2017 BATTERY REQUIREMENTS
// ============================================

/**
 * Battery standby requirements per BS 5839-1:2017 Clause 25.2
 *
 * The system must be capable of operating from batteries for:
 * - 24 hours standby PLUS
 * - 30 minutes in alarm condition (with all alarm devices operating)
 *
 * OR (for systems with automatic standby monitoring)
 * - 24 hours standby PLUS
 * - 30 minutes alarm
 *
 * Larger systems may need longer standby periods if response
 * to mains failure could be delayed.
 */
export const BATTERY_REQUIREMENTS = {
  standardStandby: {
    hours: 24,
    description: '24 hours normal standby operation',
    reference: 'BS 5839-1:2017 Clause 25.2'
  },
  alarmDuration: {
    minutes: 30,
    description: '30 minutes in alarm condition after standby',
    reference: 'BS 5839-1:2017 Clause 25.2'
  },
  extendedStandby: {
    hours: 72,
    description: 'Extended standby for remote/unmonitored sites',
    reference: 'BS 5839-1:2017 Clause 25.2 Note'
  }
};

// ============================================
// BS 5839-1:2017 SYSTEM CATEGORIES
// ============================================

/**
 * System category definitions per BS 5839-1:2017 Clause 6
 *
 * Life Protection Categories (L):
 * L1 - Full coverage throughout the building
 * L2 - Coverage in specified parts + all escape routes
 * L3 - Coverage of escape routes only
 * L4 - Within escape routes (e.g., stairwells, corridors)
 * L5 - System defined in fire risk assessment
 *
 * Property Protection Categories (P):
 * P1 - Full coverage for property protection
 * P2 - Partial coverage of specified high-risk areas
 *
 * Manual Category (M):
 * M - Manual call points only (no automatic detection)
 */
export const SYSTEM_CATEGORIES: Record<SystemCategoryType, {
  name: string;
  description: string;
  coverage: string;
  typicalUse: string[];
  reference: string;
}> = {
  'L1': {
    name: 'L1 - Full Coverage (Life)',
    description: 'Automatic detection throughout all areas of the building',
    coverage: 'All areas including voids, roof spaces, and risers',
    typicalUse: ['Care homes', 'Hospitals', 'Hotels', 'HMOs', 'High-risk residential'],
    reference: 'BS 5839-1:2017 Clause 8.2'
  },
  'L2': {
    name: 'L2 - Enhanced Coverage (Life)',
    description: 'Automatic detection in escape routes plus high-risk/specified areas',
    coverage: 'Escape routes + specified rooms (often bedrooms, high fire load areas)',
    typicalUse: ['Residential care', 'Sheltered housing', 'Large HMOs'],
    reference: 'BS 5839-1:2017 Clause 8.3'
  },
  'L3': {
    name: 'L3 - Standard Coverage (Life)',
    description: 'Automatic detection in escape routes only',
    coverage: 'All circulation spaces forming escape routes',
    typicalUse: ['Offices', 'Shops', 'Warehouses', 'Standard commercial'],
    reference: 'BS 5839-1:2017 Clause 8.4'
  },
  'L4': {
    name: 'L4 - Escape Route Only (Life)',
    description: 'Automatic detection within escape routes',
    coverage: 'Circulation routes (corridors, stairwells, lobbies)',
    typicalUse: ['Single-occupancy dwellings', 'Small premises'],
    reference: 'BS 5839-1:2017 Clause 8.5'
  },
  'L5': {
    name: 'L5 - Engineered System (Life)',
    description: 'Coverage as determined by fire risk assessment',
    coverage: 'Custom coverage based on fire engineering principles',
    typicalUse: ['Complex buildings', 'Fire-engineered solutions'],
    reference: 'BS 5839-1:2017 Clause 8.6'
  },
  'M': {
    name: 'M - Manual System',
    description: 'Manual call points only, no automatic detection',
    coverage: 'Manual call points at exits and on escape routes',
    typicalUse: ['Low-risk premises', 'Simple buildings with good visibility'],
    reference: 'BS 5839-1:2017 Clause 7'
  },
  'P1': {
    name: 'P1 - Full Coverage (Property)',
    description: 'Automatic detection throughout for property protection',
    coverage: 'All areas to protect property and contents',
    typicalUse: ['Museums', 'Archives', 'High-value storage', 'Insurance requirement'],
    reference: 'BS 5839-1:2017 Clause 9.2'
  },
  'P2': {
    name: 'P2 - Partial Coverage (Property)',
    description: 'Automatic detection in defined high-risk areas for property protection',
    coverage: 'Specified high-value or high-risk areas only',
    typicalUse: ['Server rooms', 'Plant rooms', 'Storage areas'],
    reference: 'BS 5839-1:2017 Clause 9.3'
  }
};

// ============================================
// PREMISES TYPE TO CATEGORY SUGGESTIONS
// ============================================

/**
 * Suggested system categories based on premises type
 * Per BS 5839-1:2017 recommendations and fire safety guidance
 */
export const PREMISES_CATEGORY_SUGGESTIONS: Record<PremisesCategory, {
  recommended: SystemCategoryType;
  minimum: SystemCategoryType;
  reason: string;
}> = {
  'care-home': {
    recommended: 'L1',
    minimum: 'L1',
    reason: 'Sleeping risk with occupants who may need assistance evacuating'
  },
  'hospital': {
    recommended: 'L1',
    minimum: 'L1',
    reason: 'Sleeping risk with non-ambulant patients'
  },
  'hotel': {
    recommended: 'L1',
    minimum: 'L2',
    reason: 'Sleeping risk - guests unfamiliar with building'
  },
  'hmo': {
    recommended: 'L2',
    minimum: 'L2',
    reason: 'Sleeping risk with shared escape routes'
  },
  'residential': {
    recommended: 'L3',
    minimum: 'L4',
    reason: 'Standard residential - escape route protection'
  },
  'office': {
    recommended: 'L3',
    minimum: 'M',
    reason: 'Day use only - occupants familiar with building'
  },
  'retail': {
    recommended: 'L3',
    minimum: 'M',
    reason: 'High visibility, easy evacuation'
  },
  'warehouse': {
    recommended: 'P1',
    minimum: 'L3',
    reason: 'Property protection often primary concern'
  },
  'industrial': {
    recommended: 'L3',
    minimum: 'M',
    reason: 'Day use, trained occupants'
  },
  'educational': {
    recommended: 'L3',
    minimum: 'L3',
    reason: 'High occupancy, includes children'
  },
  'healthcare': {
    recommended: 'L1',
    minimum: 'L2',
    reason: 'Vulnerable occupants, possible sleeping risk'
  },
  'hospitality': {
    recommended: 'L2',
    minimum: 'L3',
    reason: 'Mixed use with possible sleeping'
  },
  'mixed-use': {
    recommended: 'L2',
    minimum: 'L3',
    reason: 'Complex occupancy requires assessment'
  }
};

// ============================================
// VALIDATION FUNCTIONS
// ============================================

/**
 * Validate a sound level reading against BS 5839-1 requirements
 */
export function validateSoundLevel(
  dbReading: number,
  areaType: AreaType,
  ambientNoise?: number
): ValidationResult {
  const requirement = SOUND_LEVEL_REQUIREMENTS[areaType];
  if (!requirement) {
    return {
      valid: false,
      status: 'fail',
      message: 'Unknown area type'
    };
  }

  // For high-ambient-noise areas, check against ambient + 5dB
  if (areaType === 'high-ambient-noise' && ambientNoise !== undefined) {
    const required = ambientNoise + 5;
    if (dbReading >= required) {
      return {
        valid: true,
        status: 'pass',
        message: `${dbReading} dB(A) meets requirement of ${required} dB(A) (ambient ${ambientNoise} + 5 dB)`,
        reference: requirement.reference
      };
    }
    return {
      valid: false,
      status: 'fail',
      message: `${dbReading} dB(A) FAILS - requires ${required} dB(A) (ambient ${ambientNoise} + 5 dB)`,
      reference: requirement.reference
    };
  }

  // Standard check against minimum
  if (dbReading >= requirement.minDb) {
    return {
      valid: true,
      status: 'pass',
      message: `${dbReading} dB(A) meets minimum requirement of ${requirement.minDb} dB(A)`,
      reference: requirement.reference
    };
  }

  // Check if close (within 3dB) - show as warning
  if (dbReading >= requirement.minDb - 3) {
    return {
      valid: false,
      status: 'warning',
      message: `${dbReading} dB(A) is below ${requirement.minDb} dB(A) but within tolerance - verify measurement`,
      reference: requirement.reference
    };
  }

  return {
    valid: false,
    status: 'fail',
    message: `${dbReading} dB(A) FAILS minimum requirement of ${requirement.minDb} dB(A)`,
    reference: requirement.reference
  };
}

/**
 * Calculate next service dates from commissioning/last service date
 */
export function calculateNextServiceDates(fromDate: Date | string): {
  nextMonthly: Date;
  nextQuarterly: Date;
  nextSixMonthly: Date;
  nextAnnual: Date;
  formatted: {
    nextMonthly: string;
    nextQuarterly: string;
    nextSixMonthly: string;
    nextAnnual: string;
  };
} {
  const date = typeof fromDate === 'string' ? new Date(fromDate) : fromDate;

  const nextMonthly = new Date(date);
  nextMonthly.setMonth(nextMonthly.getMonth() + 1);

  const nextQuarterly = new Date(date);
  nextQuarterly.setMonth(nextQuarterly.getMonth() + 3);

  const nextSixMonthly = new Date(date);
  nextSixMonthly.setMonth(nextSixMonthly.getMonth() + 6);

  const nextAnnual = new Date(date);
  nextAnnual.setFullYear(nextAnnual.getFullYear() + 1);

  const formatDate = (d: Date): string => {
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return {
    nextMonthly,
    nextQuarterly,
    nextSixMonthly,
    nextAnnual,
    formatted: {
      nextMonthly: formatDate(nextMonthly),
      nextQuarterly: formatDate(nextQuarterly),
      nextSixMonthly: formatDate(nextSixMonthly),
      nextAnnual: formatDate(nextAnnual)
    }
  };
}

/**
 * Check if a service is overdue
 */
export function isServiceOverdue(
  lastServiceDate: Date | string | null,
  serviceType: 'monthly' | 'quarterly' | 'sixMonthly' | 'annual'
): { overdue: boolean; daysSinceService: number; daysOverdue: number } {
  if (!lastServiceDate) {
    return { overdue: true, daysSinceService: Infinity, daysOverdue: Infinity };
  }

  const serviceDate = typeof lastServiceDate === 'string' ? new Date(lastServiceDate) : lastServiceDate;
  const now = new Date();
  const diffTime = now.getTime() - serviceDate.getTime();
  const daysSinceService = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const interval = SERVICE_INTERVALS[serviceType];
  const daysOverdue = daysSinceService - interval.days;

  return {
    overdue: daysOverdue > 0,
    daysSinceService,
    daysOverdue: Math.max(0, daysOverdue)
  };
}

/**
 * Get suggested system category for a premises type
 */
export function suggestSystemCategory(premisesType: string): {
  recommended: SystemCategoryType;
  minimum: SystemCategoryType;
  reason: string;
  categoryDetails: typeof SYSTEM_CATEGORIES[SystemCategoryType];
} | null {
  // Normalize input
  const normalizedType = premisesType.toLowerCase().replace(/[^a-z]/g, '-') as PremisesCategory;

  // Check direct match
  if (PREMISES_CATEGORY_SUGGESTIONS[normalizedType]) {
    const suggestion = PREMISES_CATEGORY_SUGGESTIONS[normalizedType];
    return {
      ...suggestion,
      categoryDetails: SYSTEM_CATEGORIES[suggestion.recommended]
    };
  }

  // Check for partial matches
  const typeMap: Record<string, PremisesCategory> = {
    'care': 'care-home',
    'nursing': 'care-home',
    'hospital': 'hospital',
    'clinic': 'healthcare',
    'surgery': 'healthcare',
    'hotel': 'hotel',
    'guest': 'hotel',
    'hostel': 'hmo',
    'hmo': 'hmo',
    'flat': 'residential',
    'house': 'residential',
    'dwelling': 'residential',
    'apartment': 'residential',
    'office': 'office',
    'shop': 'retail',
    'store': 'retail',
    'retail': 'retail',
    'warehouse': 'warehouse',
    'factory': 'industrial',
    'industrial': 'industrial',
    'school': 'educational',
    'college': 'educational',
    'university': 'educational',
    'restaurant': 'hospitality',
    'pub': 'hospitality',
    'bar': 'hospitality',
    'cinema': 'hospitality',
    'theatre': 'hospitality'
  };

  for (const [keyword, category] of Object.entries(typeMap)) {
    if (premisesType.toLowerCase().includes(keyword)) {
      const suggestion = PREMISES_CATEGORY_SUGGESTIONS[category];
      return {
        ...suggestion,
        categoryDetails: SYSTEM_CATEGORIES[suggestion.recommended]
      };
    }
  }

  // Default to office/commercial
  const defaultSuggestion = PREMISES_CATEGORY_SUGGESTIONS['office'];
  return {
    ...defaultSuggestion,
    categoryDetails: SYSTEM_CATEGORIES[defaultSuggestion.recommended]
  };
}

/**
 * Validate battery standby duration
 */
export function validateBatteryDuration(
  standbyHours: number,
  alarmMinutes: number
): ValidationResult {
  const meetsStandby = standbyHours >= BATTERY_REQUIREMENTS.standardStandby.hours;
  const meetsAlarm = alarmMinutes >= BATTERY_REQUIREMENTS.alarmDuration.minutes;

  if (meetsStandby && meetsAlarm) {
    return {
      valid: true,
      status: 'pass',
      message: `Battery capacity meets requirements (${standbyHours}hr standby + ${alarmMinutes}min alarm)`,
      reference: BATTERY_REQUIREMENTS.standardStandby.reference
    };
  }

  if (!meetsStandby) {
    return {
      valid: false,
      status: 'fail',
      message: `Standby duration ${standbyHours}hr FAILS minimum ${BATTERY_REQUIREMENTS.standardStandby.hours}hr`,
      reference: BATTERY_REQUIREMENTS.standardStandby.reference
    };
  }

  return {
    valid: false,
    status: 'fail',
    message: `Alarm duration ${alarmMinutes}min FAILS minimum ${BATTERY_REQUIREMENTS.alarmDuration.minutes}min`,
    reference: BATTERY_REQUIREMENTS.alarmDuration.reference
  };
}

/**
 * Get defect severity suggestion based on description
 */
export function suggestDefectSeverity(
  description: string
): { severity: 'critical' | 'non-critical' | 'recommendation'; reason: string } {
  const lowerDesc = description.toLowerCase();

  // Critical - immediate safety risk
  const criticalKeywords = [
    'panel not working',
    'panel failure',
    'system offline',
    'no power',
    'complete failure',
    'detector failed',
    'sounder not working',
    'call point faulty',
    'communication failure',
    'loop fault',
    'zone fault',
    'no indication',
    'fire door held open',
    'exit blocked'
  ];

  if (criticalKeywords.some(k => lowerDesc.includes(k))) {
    return {
      severity: 'critical',
      reason: 'Safety-critical issue requiring immediate attention'
    };
  }

  // Non-critical - needs attention but not immediate
  const nonCriticalKeywords = [
    'battery low',
    'charger fault',
    'indicator lamp',
    'dirty detector',
    'sensitivity drift',
    'minor damage',
    'cosmetic',
    'label missing',
    'documentation',
    'legend faded'
  ];

  if (nonCriticalKeywords.some(k => lowerDesc.includes(k))) {
    return {
      severity: 'non-critical',
      reason: 'Issue requiring attention but not immediately safety-critical'
    };
  }

  // Default to recommendation
  return {
    severity: 'recommendation',
    reason: 'Advisory item for consideration'
  };
}

/**
 * Get minimum required dB for an area type
 */
export function getMinDbRequired(areaType: AreaType): number {
  return SOUND_LEVEL_REQUIREMENTS[areaType]?.minDb || 65;
}

/**
 * Format date to UK format (DD/MM/YYYY)
 */
export function formatDateUK(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return '';

  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Get ISO date string from UK format date
 */
export function parseUKDate(ukDate: string): string {
  const match = ukDate.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return ukDate;
  const [, day, month, year] = match;
  return `${year}-${month}-${day}`;
}
