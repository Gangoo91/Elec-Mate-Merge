-- ELE-2052: off-the-job entry quality check before saving.
--
-- The apprentice's entry is checked in code (src/lib/otj/otjQualityCheck.ts)
-- against the funding rules 2026/27 (v3) paras 82 to 88 before it is sent:
-- exams and testing (84.5), outside normal hours (84.6, 84.6.1, 82.1),
-- standalone English and maths (84.2), onboarding (84.1), progress reviews
-- (84.4), not linked to the KSBs or plan (84.3, 88) and duplicate days (82.4).
-- Each flag is explained in plain words and the learner can fix the entry or
-- send it with a note. What it was sent with is kept on the entry so the tutor
-- sees it; it never changes how hours are counted.

alter table public.college_otj_entries add column if not exists quality_check jsonb;
comment on column public.college_otj_entries.quality_check is
  'ELE-2052: the quality check at submission (funding rules 2026/27 paras 82-88): {v, rules, checked_at, flags:[{code,severity,para,title}], sent_with_flags, learner_note}. Advisory; shown to the tutor; never used in hour totals.';
