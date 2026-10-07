import type { EvidenceRow, OfstedSnapshot, RagStatus } from '@/hooks/useOfstedSignals';
import type { Tone } from '@/components/college/quality/QualityKit';
import {
  LEGACY_JUDGEMENTS,
  TOOLKIT_AREAS,
  type ToolkitAreaDef,
} from '../../../../supabase/functions/_shared/ofsted-fe-skills-framework.ts';

/* ==========================================================================
   Ofsted's renewed framework for further education and skills (ELE-2021).

   The areas, grades and GOV.UK sources live in ONE dependency-free module,
   supabase/functions/_shared/ofsted-fe-skills-framework.ts, so the edge
   functions (ai-generate-sar, ai-inspection-rehearsal) and the browser use
   the same list. Import them from here in the app.

   Verified 7 Oct 2026 against the official sources:
   - Education inspection framework, for use from November 2025:
     https://www.gov.uk/government/publications/education-inspection-framework/education-inspection-framework-for-use-from-november-2025
   - Further education and skills inspection toolkit, v2.0 (June 2026), for
     use on inspections from 1 September 2026:
     https://www.gov.uk/guidance/inspecting-further-education-and-skills-guide-for-providers

   useOfstedSignals keys every live signal by the evaluation area it
   evidences. This file never predicts a grade: it says how ready our
   evidence is.
   ========================================================================== */

export {
  AREA_GRADE_BAND,
  AREA_GRADE_LABEL,
  LEGACY_JUDGEMENTS,
  NOT_ENOUGH_EVIDENCE,
  PROVISION_TYPES,
  SAFEGUARDING_OUTCOMES,
  TOOLKIT_AREA_KEYS,
  TOOLKIT_AREA_TITLE,
  TOOLKIT_GRADE_KEYS,
  TOOLKIT_GRADE_SCALE,
  TOOLKIT_GRADES,
  TOOLKIT_GUIDE_URL,
  TOOLKIT_SOURCE_URL,
  gradeKeysFor,
} from '../../../../supabase/functions/_shared/ofsted-fe-skills-framework.ts';
export type {
  AreaGradeKey,
  SafeguardingOutcomeKey,
  ToolkitAreaDef,
  ToolkitAreaKey,
  ToolkitGradeKey,
} from '../../../../supabase/functions/_shared/ofsted-fe-skills-framework.ts';

/** The areas, with the skills-needs scope worded as the toolkit words it:
 *  the area applies to FE colleges, sixth form colleges and designated
 *  institutions, not to every provider. */
const SKILLS_NEEDS_SCALE = 'Five-point scale (FE colleges, sixth form colleges and designated institutions only)';
const APP_TOOLKIT_AREAS: ToolkitAreaDef[] = TOOLKIT_AREAS.map((a) =>
  a.key === 'skills_needs' ? { ...a, scale: SKILLS_NEEDS_SCALE } : a
);
export { APP_TOOLKIT_AREAS as TOOLKIT_AREAS };

export interface ToolkitArea extends ToolkitAreaDef {
  rag: RagStatus;
  evidence: EvidenceRow[];
  gaps: string[];
}

/** One card per evaluation area, in the toolkit's order. */
export function toToolkitAreas(snapshot: OfstedSnapshot | null): ToolkitArea[] {
  const byKey = new Map((snapshot?.judgements ?? []).map((j) => [j.key, j]));
  return APP_TOOLKIT_AREAS.map((def) => {
    const j = byKey.get(def.key);
    return { ...def, evidence: j?.evidence ?? [], gaps: j?.gaps ?? [], rag: j?.rag ?? 'grey' };
  });
}

export const RAG_TONE: Record<RagStatus, Tone> = { red: 'bad', amber: 'warn', green: 'good', grey: 'neutral' };

/** Evidence readiness, never a predicted Ofsted grade. */
export const RAG_READINESS: Record<RagStatus, string> = {
  green: 'Evidence in place',
  amber: 'Some gaps',
  red: 'Gaps to close',
  grey: 'Not tracked',
};

/** The old SAR / QIP / rehearsal keys and where they now sit. */
export const OLD_KEY_TO_AREAS: Record<string, string> = {
  ...Object.fromEntries(Object.entries(LEGACY_JUDGEMENTS).map(([k, v]) => [k, v.nowUnder])),
  safeguarding: 'Safeguarding',
  cross_cutting: 'Across areas',
  general: 'All areas',
};
