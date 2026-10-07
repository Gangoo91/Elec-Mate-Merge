/* ==========================================================================
   Ofsted's renewed framework for further education and skills (ELE-2021).
   The ONE list of evaluation areas and grades, shared by the browser
   (re-exported from src/components/college/quality/ComplianceToolkit.ts) and
   the edge functions (ai-generate-sar, ai-inspection-rehearsal).
   No imports: it must load in both Vite and Deno.

   Verified 7 Oct 2026 against the official sources:
   - Education inspection framework, for use from November 2025:
     https://www.gov.uk/government/publications/education-inspection-framework/education-inspection-framework-for-use-from-november-2025
   - Further education and skills inspection toolkit, v2.0 (June 2026), for
     use on inspections from 1 September 2026:
     https://www.gov.uk/guidance/inspecting-further-education-and-skills-guide-for-providers

   Whole-provider evaluation areas: safeguarding, inclusion, leadership and
   governance, and (FE colleges, sixth form colleges and designated
   institutions only) contribution to meeting skills needs.
   Provision-level evaluation areas, for each type of provision: curriculum,
   teaching and training; achievement; participation and development.
   Grades: exceptional, strong standard, expected standard, needs attention,
   urgent improvement. Safeguarding is 'met' or 'not met'. No overall
   effectiveness grade from November 2025.
   ========================================================================== */

export const TOOLKIT_SOURCE_URL =
  'https://www.gov.uk/government/publications/education-inspection-framework/education-inspection-framework-for-use-from-november-2025';
export const TOOLKIT_GUIDE_URL = 'https://www.gov.uk/guidance/inspecting-further-education-and-skills-guide-for-providers';

/** The five-point scale, best first. */
export const TOOLKIT_GRADE_SCALE = [
  { key: 'exceptional', label: 'Exceptional' },
  { key: 'strong_standard', label: 'Strong standard' },
  { key: 'expected_standard', label: 'Expected standard' },
  { key: 'needs_attention', label: 'Needs attention' },
  { key: 'urgent_improvement', label: 'Urgent improvement' },
] as const;

export type ToolkitGradeKey = (typeof TOOLKIT_GRADE_SCALE)[number]['key'];

export const TOOLKIT_GRADES = TOOLKIT_GRADE_SCALE.map((g) => g.label);
export const TOOLKIT_GRADE_KEYS: ToolkitGradeKey[] = TOOLKIT_GRADE_SCALE.map((g) => g.key);

/** Safeguarding is not on the five-point scale. */
export const SAFEGUARDING_OUTCOMES = [
  { key: 'met', label: 'Met' },
  { key: 'not_met', label: 'Not met' },
] as const;
export type SafeguardingOutcomeKey = (typeof SAFEGUARDING_OUTCOMES)[number]['key'];

/** Used by our self-assessment and rehearsal when the evidence is too thin to call. Not an Ofsted grade. */
export const NOT_ENOUGH_EVIDENCE = { key: 'not_enough_evidence', label: 'Not enough evidence' } as const;

export type AreaGradeKey = ToolkitGradeKey | SafeguardingOutcomeKey | typeof NOT_ENOUGH_EVIDENCE.key;

export const AREA_GRADE_LABEL: Record<AreaGradeKey, string> = {
  ...(Object.fromEntries(TOOLKIT_GRADE_SCALE.map((g) => [g.key, g.label])) as Record<ToolkitGradeKey, string>),
  met: 'Met',
  not_met: 'Not met',
  not_enough_evidence: NOT_ENOUGH_EVIDENCE.label,
};

/** Good / mid / bad, for colouring a grade without implying a prediction. */
export const AREA_GRADE_BAND: Record<AreaGradeKey, 'good' | 'mid' | 'bad' | 'none'> = {
  exceptional: 'good',
  strong_standard: 'good',
  expected_standard: 'mid',
  needs_attention: 'bad',
  urgent_improvement: 'bad',
  met: 'good',
  not_met: 'bad',
  not_enough_evidence: 'none',
};

export type ToolkitAreaKey =
  | 'safeguarding'
  | 'inclusion'
  | 'leadership_governance'
  | 'skills_needs'
  | 'curriculum_teaching_training'
  | 'achievement'
  | 'participation_development';

export interface ToolkitAreaDef {
  key: ToolkitAreaKey;
  title: string;
  level: 'whole' | 'provision';
  /** How Ofsted grades it. */
  scale: string;
  /** One plain sentence on what inspectors look at. */
  what: string;
}

export const TOOLKIT_AREAS: ToolkitAreaDef[] = [
  {
    key: 'safeguarding',
    title: 'Safeguarding',
    level: 'whole',
    scale: 'Met or not met',
    what: 'An open safeguarding culture, a named DSL, staff trained and confident to act, Prevent in place.',
  },
  {
    key: 'inclusion',
    title: 'Inclusion',
    level: 'whole',
    scale: 'Five-point scale',
    what: 'Barriers to learning are spotted early and reduced, especially for learners with SEND or who are disadvantaged.',
  },
  {
    key: 'leadership_governance',
    title: 'Leadership and governance',
    level: 'whole',
    scale: 'Five-point scale',
    what: 'Leaders know their provision well and improve it: policies, staff, quality assurance and IQA.',
  },
  {
    key: 'skills_needs',
    title: 'Contribution to meeting skills needs',
    level: 'whole',
    scale: 'Five-point scale (FE colleges, sixth form colleges and designated institutions only)',
    what: 'How well the college works with employers and others so its courses meet local and national skills needs.',
  },
  {
    key: 'curriculum_teaching_training',
    title: 'Curriculum, teaching and training',
    level: 'provision',
    scale: 'Five-point scale, per provision type',
    what: 'A well-planned curriculum, taught and assessed well, with off-the-job training and reviews that build skills.',
  },
  {
    key: 'achievement',
    title: 'Achievement',
    level: 'provision',
    scale: 'Five-point scale, per provision type',
    what: 'Learners and apprentices achieve what they set out to, and are ready for end-point assessment and work.',
  },
  {
    key: 'participation_development',
    title: 'Participation and development',
    level: 'provision',
    scale: 'Five-point scale, per provision type',
    what: 'Attendance, punctuality and attitudes, plus personal development such as British values, careers and wellbeing.',
  },
];

export const TOOLKIT_AREA_KEYS: ToolkitAreaKey[] = TOOLKIT_AREAS.map((a) => a.key);

export const TOOLKIT_AREA_TITLE = Object.fromEntries(TOOLKIT_AREAS.map((a) => [a.key, a.title])) as Record<
  ToolkitAreaKey,
  string
>;

/** The grades an area can take: met / not met for safeguarding, the five-point scale for the rest. */
export function gradeKeysFor(area: ToolkitAreaKey): AreaGradeKey[] {
  return area === 'safeguarding' ? SAFEGUARDING_OUTCOMES.map((o) => o.key) : [...TOOLKIT_GRADE_KEYS];
}

/** Provision types Ofsted grades the provision-level areas for. The College Hub records apprenticeships. */
export const PROVISION_TYPES = [
  'Education programmes for young people',
  'Provision for learners with high needs',
  'Apprenticeships',
  'Adult learning programmes',
] as const;

/**
 * The pre-November 2025 judgement keys (still valid on old rows) with their
 * old headings and where each now sits. Old headings are kept ONLY so
 * already-saved drafts, actions and rehearsals still read correctly.
 */
export const LEGACY_JUDGEMENTS: Record<string, { label: string; nowUnder: string }> = {
  quality_of_education: { label: 'Quality of education', nowUnder: 'Curriculum, teaching and training; Achievement' },
  behaviour_and_attitudes: { label: 'Behaviour and attitudes', nowUnder: 'Participation and development' },
  personal_development: { label: 'Personal development', nowUnder: 'Participation and development; Inclusion' },
  leadership_and_management: { label: 'Leadership and management', nowUnder: 'Leadership and governance' },
  apprenticeships: { label: 'Apprenticeships', nowUnder: 'Apprenticeships (provision type)' },
};
