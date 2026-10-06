-- Off-the-job activity types now cover the funding rules' list of what can be
-- included (2025/26 rules, para 78): theory, practical training, learning
-- support, writing assignments and revision, plus competitions (78.2).
-- Applied live as migration otj_activity_types_from_funding_rules.
alter table public.college_otj_entries drop constraint if exists college_otj_entries_activity_type_check;
alter table public.college_otj_entries add constraint college_otj_entries_activity_type_check
  check (activity_type = any (array[
    'workshop','one_to_one','mentoring','simulation','theory','practical','industry_visit',
    'manufacturer_training','shadowing','conference','tutorial','assessment','employer_meeting','other',
    'competition','learning_support','assignment','revision']));

-- Training outside normal paid hours only counts when the apprentice agreed
-- and was compensated (para 79.6.1). Record which case it was.
alter table public.college_otj_entries add column if not exists outside_hours_compensated boolean;
comment on column public.college_otj_entries.outside_hours_compensated is
  'True when the training was outside normal paid hours but agreed with the employer and compensated (time off in lieu or extra pay) — funding rules 79.6.1. in_working_hours is false in that case.';
