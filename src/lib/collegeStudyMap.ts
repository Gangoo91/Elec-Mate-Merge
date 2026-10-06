/* ==========================================================================
   collegeStudyMap — where in the Study Centre a learner's enrolled
   qualification lives.

   A college course points at a `qualifications` row (code + level). The Study
   Centre is organised by course spine (Level 2, Level 3, AM2, MOET …), not by
   awarding-body code, so this is the one place that bridges the two. Keep it
   honest: only map a code to a spine whose content genuinely covers it.
   Anything unknown falls back on level, and Level 3 learners also get the
   AM2 spine because every Level 3 apprentice sits the AM2.

   ⚠️ The Study Centre has NO EAL units (see memory: never claim EAL
   mapping). EAL codes map to the Level 3 spine as "covers the same ground",
   never as "this is your EAL course".
   ========================================================================== */

export interface StudySpine {
  /** Route under the Study Centre. */
  to: string;
  /** Short label for a button, e.g. "Level 3 course". */
  label: string;
  /** Progress key used by `completedSectionsForCourse`. */
  routeKey: string;
}

export const SPINES = {
  level2: {
    to: '/study-centre/apprentice/level2',
    label: 'Level 2 course',
    routeKey: 'level2',
  },
  level3: {
    to: '/study-centre/apprentice/level3',
    label: 'Level 3 course',
    routeKey: 'level3',
  },
  am2: {
    to: '/study-centre/apprentice/am2',
    label: 'AM2 preparation',
    routeKey: 'am2',
  },
  moet: {
    to: '/study-centre/apprentice/moet',
    label: 'MOET course',
    routeKey: 'moet',
  },
  welshLevel3: {
    to: '/study-centre/apprentice/welsh-level3',
    label: 'Welsh Level 3 course',
    routeKey: 'welsh-level3',
  },
  bs7671: {
    to: '/study-centre/upskilling/bs7671-course',
    label: '18th Edition (2382)',
    routeKey: 'bs7671',
  },
  inspectionTesting: {
    to: '/study-centre/upskilling/inspection-testing',
    label: 'Inspection & testing (2391)',
    routeKey: 'inspection-testing',
  },
} as const satisfies Record<string, StudySpine>;

/** Exact qualification codes → the spine(s) that teach them. */
const BY_CODE: Record<string, StudySpine[]> = {
  // City & Guilds
  '2365-02': [SPINES.level2],
  '2365-03': [SPINES.level3, SPINES.am2],
  '2357': [SPINES.level3, SPINES.am2],
  '5357': [SPINES.level3, SPINES.am2],
  '8202': [SPINES.level3, SPINES.am2],
  '2366-03': [SPINES.level3],
  '5393-03': [SPINES.level3],
  '2346-03': [SPINES.level3, SPINES.am2],
  '3529': [SPINES.level3],
  MOET: [SPINES.moet],
  // EAL — the Level 3 spine covers the same electrical ground; not an EAL course.
  '601/7345/2': [SPINES.level3, SPINES.am2],
  '603/3895/8': [SPINES.level3, SPINES.am2],
  '603/3928/7': [SPINES.level3],
  '610/1335/3': [SPINES.level3],
  '610/3907/X': [SPINES.level3],
  '603/5982/1': [SPINES.level3, SPINES.am2],
  '603/0149/3': [SPINES.level3],
  '603/5806/9': [SPINES.level3],
  '603/5933/7': [SPINES.level3],
  'EAL-NETP3': [SPINES.level3, SPINES.am2],
  '600/4337/4': [SPINES.inspectionTesting],
  '603/3929/9': [SPINES.bs7671],
  'ELEC-EXP-WORKER': [SPINES.level3, SPINES.am2],
};

/**
 * Spines for a learner's qualification. Exact code first, then the level
 * ("Level 2" / "Level 3" / "T Level"), then nothing — an empty array means
 * "don't claim a mapping", and callers should fall back to the course list.
 */
export function studySpinesFor(
  qualificationCode: string | null | undefined,
  level: string | null | undefined
): StudySpine[] {
  if (qualificationCode) {
    const exact = BY_CODE[qualificationCode.trim()];
    if (exact) return exact;
    // Tolerate "2365" without the suffix.
    const stem = qualificationCode.trim().split('-')[0];
    if (stem === '2365' && /level ?2/i.test(level ?? '')) return [SPINES.level2];
    if (stem === '2365') return [SPINES.level3, SPINES.am2];
  }
  const lv = (level ?? '').toLowerCase();
  if (lv.includes('level 2')) return [SPINES.level2];
  if (lv.includes('level 3') || lv.includes('t level')) return [SPINES.level3, SPINES.am2];
  return [];
}
