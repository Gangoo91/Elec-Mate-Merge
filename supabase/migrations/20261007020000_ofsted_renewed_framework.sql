-- ELE-2021: College Hub moves from the old EIF's five judgements to Ofsted's
-- renewed framework for further education and skills (from November 2025;
-- FE and skills toolkit v2.0 for inspections from 1 September 2026).
-- Evaluation areas (keys match src/components/college/quality/ComplianceToolkit.ts
-- via supabase/functions/_shared/ofsted-fe-skills-framework.ts):
--   safeguarding, inclusion, leadership_governance, skills_needs,
--   curriculum_teaching_training, achievement, participation_development
-- Grades: exceptional, strong_standard, expected_standard, needs_attention,
-- urgent_improvement; safeguarding met / not_met.
--
-- Checked 7 Oct 2026: college_qip_actions, college_sar_drafts and
-- college_inspection_rehearsals hold 0 rows, so nothing needs mapping. The
-- old keys stay valid so any row written by an older client still saves.

-- 1. QIP actions: allow the seven evaluation-area keys.
alter table public.college_qip_actions
  drop constraint if exists college_qip_actions_judgement_key_check;
alter table public.college_qip_actions
  add constraint college_qip_actions_judgement_key_check check (
    judgement_key = any (array[
      -- renewed framework (Nov 2025)
      'safeguarding', 'inclusion', 'leadership_governance', 'skills_needs',
      'curriculum_teaching_training', 'achievement', 'participation_development',
      'cross_cutting',
      -- legacy EIF (pre Nov 2025), kept valid for old rows
      'quality_of_education', 'behaviour_and_attitudes', 'personal_development',
      'leadership_and_management', 'apprenticeships'
    ]::text[])
  );

-- 2. Inspection rehearsals: scenarios are the evaluation areas; the verdict is
--    a grade per area probed (no overall grade exists any more).
alter table public.college_inspection_rehearsals
  drop constraint if exists college_inspection_rehearsals_scenario_check;
alter table public.college_inspection_rehearsals
  add constraint college_inspection_rehearsals_scenario_check check (
    scenario = any (array[
      'general',
      'safeguarding', 'inclusion', 'leadership_governance', 'skills_needs',
      'curriculum_teaching_training', 'achievement', 'participation_development',
      -- legacy
      'quality_of_education', 'behaviour_and_attitudes', 'personal_development',
      'leadership_and_management', 'apprenticeships'
    ]::text[])
  );

alter table public.college_inspection_rehearsals
  add column if not exists area_grades jsonb;
comment on column public.college_inspection_rehearsals.area_grades is
  'ELE-2021: [{area, grade, reason}] for each evaluation area the rehearsal probed. grade is a five-point key, met/not_met for safeguarding, or not_enough_evidence. overall_verdict holds the focus area''s grade (null for a general rehearsal); old rows may hold outstanding/good/requires_improvement/inadequate.';

-- 3. SAR drafts: one section per evaluation area.
alter table public.college_sar_drafts
  add column if not exists evaluation_areas jsonb;
comment on column public.college_sar_drafts.evaluation_areas is
  'ELE-2021: {<area_key>: {grade, rag, summary, narrative, evidence[], gaps[]}} for the seven evaluation areas of the renewed FE and skills framework. Null on drafts written under the old judgement_* columns.';
