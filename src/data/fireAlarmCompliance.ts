/**
 * Fire Alarm Compliance Data
 *
 * Contains verified requirements from:
 * - BS 5839-1:2025 Fire detection and fire alarm systems for buildings
 * - BS EN 54 Fire detection and fire alarm systems
 *
 * All values are from official British Standards documents.
 */

export type AreaType =
  | 'general' // General occupied areas
  | 'sleeping' // Bedrooms, dormitories, sleeping areas
  | 'high-ambient-noise'; // Areas with high background noise

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

export type SystemCategoryType = 'L1' | 'L2' | 'L3' | 'L4' | 'L5' | 'M' | 'P1' | 'P2';

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
// BS 5839-1:2025 SOUND LEVEL REQUIREMENTS
// ============================================

/**
 * Sound level requirements per BS 5839-1:2025 Clause 15.1.
 *
 * Clause 16 is VISUAL alarm signals, not audible — an earlier version of this
 * file cited 16.5 throughout, which does not exist.
 *
 * 15.1.1 a) Not less than 65 dB(A) throughout all accessible areas, except:
 *           - 60 dB(A) in stairways, enclosures of not more than approximately
 *             60 m² (e.g. cellular offices) and specific points of limited extent
 *           - no minimum in areas designated under 14.4, or areas under 1 m²
 * 15.1.1 b) Not less than 75 dB(A) at the bedhead where the system is intended
 *           to rouse people from sleep.
 * 15.1.1 c) Not greater than 120 dB(A) at any normally accessible point.
 * 15.1.3   Where background noise EXCEEDS 60 dB(A), the alarm signal should be
 *          5 dB(A) above it. Background noise unlikely to persist longer than
 *          30 s may be ignored. The 60 dB(A) trigger matters: below it the flat
 *          65 dB(A) minimum governs, so "5 dB above ambient" on its own is not
 *          the recommendation.
 *
 * Visual alarm devices are a separate requirement (16.1): provided where
 * ambient noise exceeds 90 dB(A) or hearing protection is normally worn.
 */
export const SOUND_LEVEL_REQUIREMENTS: Record<AreaType, SoundLevelRequirement> = {
  general: {
    minDb: 65,
    description:
      'General accessible areas - minimum 65 dB(A); 60 dB(A) in stairways and rooms of approx 60 m² or less',
    reference: 'BS 5839-1:2025 Clause 15.1.1a)',
  },
  sleeping: {
    minDb: 75,
    description: 'Sleeping areas (bedrooms) - minimum 75 dB(A) at the bedhead',
    reference: 'BS 5839-1:2025 Clause 15.1.1b)',
  },
  'high-ambient-noise': {
    minDb: 65,
    description:
      'Where background noise exceeds 60 dB(A) - alarm signal 5 dB(A) above the background level',
    reference: 'BS 5839-1:2025 Clause 15.1.3',
  },
};

// ============================================
// BS 5839-1:2025 SERVICE INTERVALS
// ============================================

/**
 * Routine testing (Clause 42) and inspection and servicing (Clause 43).
 *
 * An earlier version of this file cited "Clause 45" for all of these. Clause 45
 * is EXTENSIONS. It also claimed a quarterly test of 25% of devices, which does
 * not appear anywhere in BS 5839-1 — see the annual entry below.
 *
 * 42.1 Weekly    A test using a manual call point, during normal working hours.
 *                A DIFFERENT call point each week (42.1.6), so that all are
 *                tested in rotation.
 * 42.2 Monthly   CONDITIONAL, not a general device test. Applies only where an
 *                automatically started generator forms part of the standby
 *                supply (start it monthly, on load, for at least 1 h) or where
 *                VENTED batteries are used (visual inspection).
 * 43.1 Quarterly CONDITIONAL. Examination of VENTED batteries and their
 *                connections by a competent person. This is the only quarterly
 *                item in the inspection clauses, and it is about batteries —
 *                not a quarterly percentage of detectors.
 * 43.2 ~6-month  Periodic inspection and test by a competent person. Successive
 *                visits at intervals of approximately 6 months; 43.2.1 Note 1
 *                accepts anything between 5 and 7 months after the previous
 *                visit, with the date of acceptance as the datum.
 * 43.3 12-month  The work to be covered across a rolling 12-month period. This
 *                includes a functional test of EVERY detector (43.3.5) — 100%,
 *                not a sample. Note this is a period, not a separate annual
 *                visit: the work is spread across the ~6-monthly visits.
 */
export const SERVICE_INTERVALS = {
  weekly: {
    months: 0.25,
    days: 7,
    description:
      'Weekly test - operate a manual call point during working hours, using a different call point each week',
    reference: 'BS 5839-1:2025 Clause 42.1',
  },
  monthly: {
    months: 1,
    days: 30,
    description:
      'Monthly - only where fitted: run an auto-start generator on load for 1 h, and visually inspect vented batteries',
    reference: 'BS 5839-1:2025 Clause 42.2',
  },
  quarterly: {
    months: 3,
    days: 90,
    description:
      'Quarterly - only where vented batteries are fitted: examine the batteries and their connections',
    reference: 'BS 5839-1:2025 Clause 43.1',
  },
  sixMonthly: {
    months: 6,
    days: 183,
    description:
      'Periodic inspection and service by a competent person - approximately every 6 months (5 to 7 months acceptable)',
    reference: 'BS 5839-1:2025 Clause 43.2.1',
  },
  annual: {
    months: 12,
    days: 365,
    description:
      'Across each 12-month period - functional test of EVERY detector, plus the full 43.3 schedule',
    reference: 'BS 5839-1:2025 Clause 43.3',
  },
};

// ============================================
// BS 5839-1:2025 BATTERY REQUIREMENTS
// ============================================

/**
 * Battery standby requirements per BS 5839-1:2025 Clause 24.3.5
 *
 * (An earlier version cited Clause 25.2. Standby power supplies are Clause 24;
 * 24.3.5 sets the capacity, calculated in accordance with Annex E (normative,
 * "Method for calculating standby battery capacity"), and 24.3.2
 * expects a battery with a life of at least 4 years.)
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
    reference: 'BS 5839-1:2025 Clause 24.3.5',
  },
  alarmDuration: {
    minutes: 30,
    description: '30 minutes in alarm condition after standby',
    reference: 'BS 5839-1:2025 Clause 24.3.5',
  },
  extendedStandby: {
    hours: 72,
    description: 'Extended standby for remote/unmonitored sites',
    reference: 'BS 5839-1:2025 Clause 24.3.5 Note',
  },
};

// ============================================
// BS 5839-1:2025 SYSTEM CATEGORIES
// ============================================

/**
 * System categories per BS 5839-1:2025 Clause 4 (Categories of system); the
 * areas each one protects are Clause 7 (Relationship between system category
 * and protected areas).
 *
 * An earlier version cited Clause 6 for the definitions and Clauses 8 and 9 for
 * the subdivisions. Clause 6 is Variations, Clause 8 is Actuation of other fire
 * protection systems, and Clause 9 is Systems in explosive gas or dust
 * atmospheres — none of them define a category.
 *
 * M  - Manual only; no automatic fire detectors.
 * L1 - Throughout all areas. Earliest possible warning, longest escape time.
 * L2 - As L3, PLUS early warning to occupants of rooms in which people sleep
 *      and to specified areas of high fire hazard level and/or high fire risk.
 * L3 - Escape routes AND rooms opening on to an escape route. The objective is
 *      that everyone except possibly those in the room of origin escapes before
 *      the routes become impassable. It is NOT "escape routes only" — detectors
 *      go on the accommodation side of doors opening onto the route (7.7).
 * L4 - Only those parts of the escape routes comprising circulation areas and
 *      spaces, such as corridors and stairways.
 * L5 - The protected areas and/or detector locations are designed to satisfy a
 *      specific fire safety objective other than that of L1 to L4, often to
 *      compensate for a departure from normal guidance elsewhere.
 * P1 - Throughout all areas, for protection of property.
 * P2 - Defined parts only, for protection of property.
 */
export const SYSTEM_CATEGORIES: Record<
  SystemCategoryType,
  {
    name: string;
    description: string;
    coverage: string;
    typicalUse: string[];
    reference: string;
  }
> = {
  L1: {
    name: 'L1 - Full Coverage (Life)',
    description: 'Automatic detection throughout all areas of the building',
    coverage: 'All areas including voids, roof spaces, and risers',
    typicalUse: ['Care homes', 'Hospitals', 'Hotels', 'HMOs', 'High-risk residential'],
    reference: 'BS 5839-1:2025 Clause 4 / 7.9',
  },
  L2: {
    name: 'L2 - Enhanced Coverage (Life)',
    description:
      'As L3, plus detection in rooms where people sleep and in specified areas of high fire hazard or high fire risk',
    coverage: 'Escape routes + rooms opening onto them + specified sleeping and high-risk areas',
    typicalUse: ['Residential care', 'Sheltered housing', 'Large HMOs'],
    reference: 'BS 5839-1:2025 Clause 4 / 7.8',
  },
  L3: {
    name: 'L3 - Standard Coverage (Life)',
    description: 'Automatic detection in escape routes AND in rooms opening onto an escape route',
    coverage:
      'Escape routes plus detectors on the accommodation side of doors opening onto them (7.7)',
    typicalUse: ['Offices', 'Shops', 'Warehouses', 'Standard commercial'],
    reference: 'BS 5839-1:2025 Clause 4 / 7.7',
  },
  L4: {
    name: 'L4 - Escape Route Only (Life)',
    description: 'Automatic detection within escape routes',
    coverage: 'Circulation routes (corridors, stairwells, lobbies)',
    typicalUse: ['Small simple premises', 'Low-risk commercial'],
    reference: 'BS 5839-1:2025 Clause 4 / 7.5',
  },
  L5: {
    name: 'L5 - Engineered System (Life)',
    description:
      'Protected areas and detector locations designed to satisfy a specific fire safety objective other than L1 to L4',
    coverage: 'Defined by the objective — often compensating for a departure from normal guidance',
    typicalUse: ['Complex buildings', 'Fire-engineered solutions'],
    reference: 'BS 5839-1:2025 Clause 4',
  },
  M: {
    name: 'M - Manual System',
    description: 'Manual call points only, no automatic detection',
    coverage: 'Manual call points at exits and on escape routes',
    typicalUse: ['Low-risk premises', 'Simple buildings with good visibility'],
    reference: 'BS 5839-1:2025 Clause 4',
  },
  P1: {
    name: 'P1 - Full Coverage (Property)',
    description: 'Automatic detection throughout for property protection',
    coverage: 'All areas to protect property and contents',
    typicalUse: ['Museums', 'Archives', 'High-value storage', 'Insurance requirement'],
    reference: 'BS 5839-1:2025 Clause 4 / 7.9',
  },
  P2: {
    name: 'P2 - Partial Coverage (Property)',
    description: 'Automatic detection in defined high-risk areas for property protection',
    coverage: 'Specified high-value or high-risk areas only',
    typicalUse: ['Server rooms', 'Plant rooms', 'Storage areas'],
    reference: 'BS 5839-1:2025 Clause 4 / 7.11',
  },
};

// ============================================
// PREMISES TYPE TO CATEGORY SUGGESTIONS
// ============================================

/**
 * Suggested system categories based on premises type
 * Per BS 5839-1:2025 recommendations and fire safety guidance
 */
export const PREMISES_CATEGORY_SUGGESTIONS: Record<
  PremisesCategory,
  {
    recommended: SystemCategoryType;
    minimum: SystemCategoryType;
    reason: string;
  }
> = {
  'care-home': {
    recommended: 'L1',
    minimum: 'L1',
    reason: 'Sleeping risk with occupants who may need assistance evacuating',
  },
  hospital: {
    recommended: 'L1',
    minimum: 'L1',
    reason: 'Sleeping risk with non-ambulant patients',
  },
  hotel: {
    recommended: 'L1',
    minimum: 'L2',
    reason: 'Sleeping risk - guests unfamiliar with building',
  },
  hmo: {
    recommended: 'L2',
    minimum: 'L2',
    reason: 'Sleeping risk with shared escape routes',
  },
  residential: {
    recommended: 'L3',
    minimum: 'L4',
    reason: 'Standard residential - escape route protection',
  },
  office: {
    recommended: 'L3',
    minimum: 'M',
    reason: 'Day use only - occupants familiar with building',
  },
  retail: {
    recommended: 'L3',
    minimum: 'M',
    reason: 'High visibility, easy evacuation',
  },
  warehouse: {
    recommended: 'P1',
    minimum: 'L3',
    reason: 'Property protection often primary concern',
  },
  industrial: {
    recommended: 'L3',
    minimum: 'M',
    reason: 'Day use, trained occupants',
  },
  educational: {
    recommended: 'L3',
    minimum: 'L3',
    reason: 'High occupancy, includes children',
  },
  healthcare: {
    recommended: 'L1',
    minimum: 'L2',
    reason: 'Vulnerable occupants, possible sleeping risk',
  },
  hospitality: {
    recommended: 'L2',
    minimum: 'L3',
    reason: 'Mixed use with possible sleeping',
  },
  'mixed-use': {
    recommended: 'L2',
    minimum: 'L3',
    reason: 'Complex occupancy requires assessment',
  },
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
      message: 'Unknown area type',
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
        reference: requirement.reference,
      };
    }
    return {
      valid: false,
      status: 'fail',
      message: `${dbReading} dB(A) FAILS - requires ${required} dB(A) (ambient ${ambientNoise} + 5 dB)`,
      reference: requirement.reference,
    };
  }

  // Standard check against minimum
  if (dbReading >= requirement.minDb) {
    return {
      valid: true,
      status: 'pass',
      message: `${dbReading} dB(A) meets minimum requirement of ${requirement.minDb} dB(A)`,
      reference: requirement.reference,
    };
  }

  // Check if close (within 3dB) - show as warning
  if (dbReading >= requirement.minDb - 3) {
    return {
      valid: false,
      status: 'warning',
      message: `${dbReading} dB(A) is below ${requirement.minDb} dB(A) but within tolerance - verify measurement`,
      reference: requirement.reference,
    };
  }

  return {
    valid: false,
    status: 'fail',
    message: `${dbReading} dB(A) FAILS minimum requirement of ${requirement.minDb} dB(A)`,
    reference: requirement.reference,
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
      nextAnnual: formatDate(nextAnnual),
    },
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

  const serviceDate =
    typeof lastServiceDate === 'string' ? new Date(lastServiceDate) : lastServiceDate;
  const now = new Date();
  const diffTime = now.getTime() - serviceDate.getTime();
  const daysSinceService = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const interval = SERVICE_INTERVALS[serviceType];
  const daysOverdue = daysSinceService - interval.days;

  return {
    overdue: daysOverdue > 0,
    daysSinceService,
    daysOverdue: Math.max(0, daysOverdue),
  };
}

/**
 * Get suggested system category for a premises type
 */
export function suggestSystemCategory(premisesType: string): {
  recommended: SystemCategoryType;
  minimum: SystemCategoryType;
  reason: string;
  categoryDetails: (typeof SYSTEM_CATEGORIES)[SystemCategoryType];
} | null {
  // Normalize input
  const normalizedType = premisesType.toLowerCase().replace(/[^a-z]/g, '-') as PremisesCategory;

  // Check direct match
  if (PREMISES_CATEGORY_SUGGESTIONS[normalizedType]) {
    const suggestion = PREMISES_CATEGORY_SUGGESTIONS[normalizedType];
    return {
      ...suggestion,
      categoryDetails: SYSTEM_CATEGORIES[suggestion.recommended],
    };
  }

  // Check for partial matches
  const typeMap: Record<string, PremisesCategory> = {
    care: 'care-home',
    nursing: 'care-home',
    hospital: 'hospital',
    clinic: 'healthcare',
    surgery: 'healthcare',
    hotel: 'hotel',
    guest: 'hotel',
    hostel: 'hmo',
    hmo: 'hmo',
    flat: 'residential',
    house: 'residential',
    dwelling: 'residential',
    apartment: 'residential',
    office: 'office',
    shop: 'retail',
    store: 'retail',
    retail: 'retail',
    warehouse: 'warehouse',
    factory: 'industrial',
    industrial: 'industrial',
    school: 'educational',
    college: 'educational',
    university: 'educational',
    restaurant: 'hospitality',
    pub: 'hospitality',
    bar: 'hospitality',
    cinema: 'hospitality',
    theatre: 'hospitality',
  };

  for (const [keyword, category] of Object.entries(typeMap)) {
    if (premisesType.toLowerCase().includes(keyword)) {
      const suggestion = PREMISES_CATEGORY_SUGGESTIONS[category];
      return {
        ...suggestion,
        categoryDetails: SYSTEM_CATEGORIES[suggestion.recommended],
      };
    }
  }

  // Default to office/commercial
  const defaultSuggestion = PREMISES_CATEGORY_SUGGESTIONS['office'];
  return {
    ...defaultSuggestion,
    categoryDetails: SYSTEM_CATEGORIES[defaultSuggestion.recommended],
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
      reference: BATTERY_REQUIREMENTS.standardStandby.reference,
    };
  }

  if (!meetsStandby) {
    return {
      valid: false,
      status: 'fail',
      message: `Standby duration ${standbyHours}hr FAILS minimum ${BATTERY_REQUIREMENTS.standardStandby.hours}hr`,
      reference: BATTERY_REQUIREMENTS.standardStandby.reference,
    };
  }

  return {
    valid: false,
    status: 'fail',
    message: `Alarm duration ${alarmMinutes}min FAILS minimum ${BATTERY_REQUIREMENTS.alarmDuration.minutes}min`,
    reference: BATTERY_REQUIREMENTS.alarmDuration.reference,
  };
}

/**
 * Get defect severity suggestion based on description
 */
export function suggestDefectSeverity(description: string): {
  severity: 'critical' | 'non-critical' | 'recommendation';
  reason: string;
} {
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
    'exit blocked',
  ];

  if (criticalKeywords.some((k) => lowerDesc.includes(k))) {
    return {
      severity: 'critical',
      reason: 'Safety-critical issue requiring immediate attention',
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
    'legend faded',
  ];

  if (nonCriticalKeywords.some((k) => lowerDesc.includes(k))) {
    return {
      severity: 'non-critical',
      reason: 'Issue requiring attention but not immediately safety-critical',
    };
  }

  // Default to recommendation
  return {
    severity: 'recommendation',
    reason: 'Advisory item for consideration',
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
