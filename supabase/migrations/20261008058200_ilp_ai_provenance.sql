-- ELE-1926: an AI-drafted learning plan carries its provenance, like AI
-- assessor feedback. The tutor reads the draft in the "Refine with AI" sheet
-- and ticks that they checked it; saving is the confirmation. The learner and
-- staff then see "Drafted with AI, confirmed by <name> on <date>".
-- Goals keep their existing source = 'ai_suggested'; their confirmer is the
-- plan's author (tutor_name_snapshot) at the goal's created_at.
-- Backward-compatible: the released client never sets these, so its plans
-- read as the tutor's own words (null source).
alter table public.college_ilps
  add column if not exists narrative_source text
    check (narrative_source in ('staff', 'ai_draft_confirmed')),
  add column if not exists narrative_confirmed_at timestamptz,
  add column if not exists narrative_confirmed_by_name text;
comment on column public.college_ilps.narrative_source is
  'ELE-1926: ai_draft_confirmed when the headline/strengths/areas/support text began as an AI draft that the tutor checked and saved; staff or null otherwise.';
