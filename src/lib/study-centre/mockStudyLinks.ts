/**
 * Where to study the topic a mock exam question came from (ELE-1815).
 *
 * Built from the route map of every paper (7 Oct 2026). Level 2, Level 3 and
 * AM2 go to the exact section page via the content-matched table in
 * src/data/study-centre/mockTopicLessons.ts; anything unmatched falls back to
 * the module page (AM2 and the named-section courses: no link). Only links to
 * pages that exist — never a guess, never a dead end.
 */
import {
  AM2_SECTION,
  L2_PAGE_TITLES,
  L2_SECTION,
  L2_TOPIC,
  L3_PAGE_TITLES,
  L3_SECTION,
  L3_TOPIC,
} from '@/data/study-centre/mockTopicLessons';

export interface StudyLink {
  label: string;
  to: string;
}

// Section pages that exist (Level3Routes / Level2Routes, 7 Oct 2026).
const L3_SECTIONS: Record<number, number> = { 1: 6, 2: 6, 3: 6, 4: 6, 5: 6, 6: 6, 7: 5 };
const L2_SECTIONS: Record<number, number> = { 1: 6, 2: 6, 3: 6, 4: 6, 5: 5, 6: 7, 7: 6 };

/** Courses whose questions are tagged "Module N", and where their modules live. */
const MODULE_COURSES: Record<string, { base: string; modules: number; name: string }> = {
  'data-cabling': {
    base: '/study-centre/upskilling/data-cabling-module-',
    modules: 6,
    name: 'Data cabling',
  },
  'emergency-lighting': {
    base: '/study-centre/upskilling/emergency-lighting-module-',
    modules: 6,
    name: 'Emergency lighting',
  },
  'fiber-optics': {
    base: '/study-centre/upskilling/fiber-optics-module-',
    modules: 7,
    name: 'Fibre optics',
  },
  'industrial-electrical': {
    base: '/study-centre/upskilling/industrial-electrical-module-',
    modules: 5,
    name: 'Industrial electrical',
  },
  instrumentation: {
    base: '/study-centre/upskilling/instrumentation-module-',
    modules: 9,
    name: 'Instrumentation',
  },
  'pat-testing': {
    base: '/study-centre/upskilling/pat-testing-module-',
    modules: 5,
    name: 'PAT testing',
  },
  'fire-alarm': {
    base: '/study-centre/upskilling/fire-alarm-course/module-',
    modules: 7,
    name: 'Fire alarm',
  },
  'asbestos-awareness': {
    base: '/study-centre/general-upskilling/asbestos-awareness-module-',
    modules: 6,
    name: 'Asbestos awareness',
  },
  'confined-spaces': {
    base: '/study-centre/general-upskilling/confined-spaces-module-',
    modules: 6,
    name: 'Confined spaces',
  },
  'coshh-awareness': {
    base: '/study-centre/general-upskilling/coshh-awareness-module-',
    modules: 6,
    name: 'COSHH awareness',
  },
  'first-aid-at-work': {
    base: '/study-centre/general-upskilling/first-aid-module-',
    modules: 6,
    name: 'First aid',
  },
  'ipaf-scaffold': {
    base: '/study-centre/general-upskilling/ipaf-module-',
    modules: 6,
    name: 'IPAF',
  },
  'manual-handling': {
    base: '/study-centre/general-upskilling/manual-handling-module-',
    modules: 6,
    name: 'Manual handling',
  },
  'mewp-operator': {
    base: '/study-centre/general-upskilling/mewp-module-',
    modules: 6,
    name: 'MEWP',
  },
  'pasma-towers': {
    base: '/study-centre/general-upskilling/pasma-module-',
    modules: 7,
    name: 'PASMA',
  },
  'scaffolding-awareness': {
    base: '/study-centre/general-upskilling/scaffolding-awareness-module-',
    modules: 6,
    name: 'Scaffolding awareness',
  },
  'working-at-height': {
    base: '/study-centre/general-upskilling/working-at-height-module-',
    modules: 6,
    name: 'Working at height',
  },
  'mentoring-developing-others': {
    base: '/study-centre/personal-development/md-module-',
    modules: 6,
    name: 'Mentoring',
  },
};

export function studyLinkFor(
  examSlug: string,
  section?: string | null,
  /** The question's own module, when the bank carries one ('Module 3'). */
  module?: string | null,
  /** The question's topic (the review item's `t`). */
  topic?: string | null
): StudyLink | null {
  const sec = (section ?? '').trim();
  const top = (topic ?? '').trim();

  // Level 3. Papers 1–7 draw on module N; paper 8 is mixed and says its module
  // per question. Section-accurate where mockTopicLessons matched the bank's
  // content to a page; otherwise the module page — always right.
  const l3 = examSlug.match(/^level3-module8-mock(\d+)$/);
  if (l3) {
    const paper = Number(l3[1]);
    const fromField = Number((module ?? '').match(/(\d+)/)?.[1]);
    const mod = paper >= 1 && paper <= 7 ? paper : fromField;
    if (!mod || !L3_SECTIONS[mod]) return null;
    let page: number | undefined;
    if (mod <= 2) page = L3_TOPIC[mod]?.[top];
    else {
      const key = mod === 5 ? sec.match(/^(\d+)/)?.[1] : sec.match(/^(\d+\.\d+)/)?.[1];
      if (key) page = L3_SECTION[mod]?.[key];
    }
    if (page && page <= L3_SECTIONS[mod])
      return {
        label: `Level 3 · ${L3_PAGE_TITLES[mod]?.[page] ?? `Section ${page}`} (Module ${mod}, section ${page})`,
        to: `/study-centre/apprentice/level3-module${mod}-section${page}`,
      };
    return { label: `Level 3 · Module ${mod}`, to: `/study-centre/apprentice/level3-module${mod}` };
  }

  // Level 2. Module from the section code ('2.1.1' → 2, '203-1.1' → 3,
  // mixed paper's '1.0' → 1), else the paper (papers 1–5 are module N —
  // module 1's bank carries no sections at all). Topic overrides first, then
  // the section group, then the module page.
  const l2 = examSlug.match(/^level2-module8-mock(\d+)$/);
  if (l2) {
    const paper = Number(l2[1]);
    const fromSec = Number((sec.match(/^20(\d)-/) ?? sec.match(/^(\d+)\./))?.[1]);
    const mod = fromSec || (paper >= 1 && paper <= 5 ? paper : 0);
    if (!mod || !L2_SECTIONS[mod]) return null;
    const group = sec.match(/^(20\d-\d+|\d+\.\d+)/)?.[1];
    const page =
      L2_TOPIC[mod]?.[top] ??
      (mod === 5 && top.startsWith('BS 7671 514') ? 4 : undefined) ??
      (group ? L2_SECTION[mod]?.[group] : undefined);
    if (page && page <= L2_SECTIONS[mod])
      return {
        label: `Level 2 · ${L2_PAGE_TITLES[mod]?.[page] ?? `Section ${page}`} (Module ${mod}, section ${page})`,
        to: `/study-centre/apprentice/level2/module${mod}/section${page}`,
      };
    return { label: `Level 2 · Module ${mod}`, to: `/study-centre/apprentice/level2/module${mod}` };
  }

  // AM2: by the question's section. Unmatched → no link.
  if (examSlug === 'am2-module8') {
    const hit = AM2_SECTION[sec];
    if (!hit) return null;
    const [m, s, title] = hit;
    return {
      label: `AM2 · ${title} (Module ${m}, section ${s})`,
      to: `/study-centre/apprentice/am2/module${m}/section${s}`,
    };
  }

  // Courses tagged "Module N".
  const course = MODULE_COURSES[examSlug];
  if (course && sec) {
    const m = sec.match(/^module\s*(\d+)/i);
    if (!m) return null;
    const n = Number(m[1]);
    if (n < 1 || n > course.modules) return null;
    return { label: `${course.name} · Module ${n}`, to: `${course.base}${n}` };
  }

  return null;
}

/** Where to sit a paper again, for attempts recorded before retake_path existed. */
export function retakePathFor(examSlug: string, saved?: string | null): string | null {
  if (saved && saved.startsWith('/')) return saved;
  const l3 = examSlug.match(/^level3-module8-mock(\d+)$/);
  if (l3) return `/study-centre/apprentice/level3-module8-mock-exam${l3[1]}`;
  const l2 = examSlug.match(/^level2-module8-mock(\d+)$/);
  if (l2) return `/study-centre/apprentice/level2-module8-mock-exam${l2[1]}`;
  if (examSlug === 'am2-module8') return '/study-centre/apprentice/am2/module8';
  if (examSlug === 'osg-table-lookup') return '/study-centre/mock-exams/osg-table-lookup';
  return null;
}
