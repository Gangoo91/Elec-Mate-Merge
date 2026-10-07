-- ELE-1926: AI-drafted text carries provenance once a person confirms it.
-- The assessor's "Draft an assessment" panel copies an AI draft into
-- portfolio_submissions feedback, and the policy-drafting flow files an AI
-- draft into college_policies; neither recorded that AI wrote the first
-- draft. Record it, so the screens can say "Drafted with AI, confirmed by…".
alter table public.portfolio_submissions
  add column if not exists feedback_source text not null default 'assessor'
    check (feedback_source in ('assessor', 'ai_draft_confirmed'));

alter table public.college_policies
  add column if not exists content_source text not null default 'staff'
    check (content_source in ('staff', 'ai_draft_confirmed'));
