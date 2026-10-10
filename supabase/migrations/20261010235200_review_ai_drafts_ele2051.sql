-- ELE-2051: progress review, AI-drafted summary and SMART targets from the
-- tutor's notes or a voice memo, confirmed by the tutor.
--
-- Same provenance rule as ELE-1926 (portfolio_ai_feedback_drafts): what the
-- model wrote is held as a draft, never written into the review on its own.
-- The tutor reads it, ticks that they checked it and taps "Use this draft";
-- only then does the summary go into outcomes.summary (with summary_source
-- 'ai_draft_confirmed' and who confirmed it, frozen at sign-off) and the
-- targets they kept become review actions with source 'ai_draft_confirmed'.
--
-- The draft row keeps what the tutor gave (notes / dictation) and what the
-- model returned, unchanged, for audit. Written by the review-ai-draft edge
-- function with the tutor's own token (RLS applies).

create table if not exists public.college_review_ai_drafts (
  id uuid primary key default gen_random_uuid(),
  review_id uuid not null references public.college_tripartite_reviews(id) on delete cascade,
  college_id uuid not null references public.colleges(id) on delete cascade,
  student_id uuid not null,
  created_by uuid not null default auth.uid(),
  input_source text not null check (input_source in ('notes', 'voice', 'notes_and_voice', 'record_only')),
  input_notes text,
  model text not null,
  summary text not null,
  targets jsonb not null default '[]'::jsonb,
  grounding jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  confirmed_at timestamptz,
  confirmed_by uuid,
  confirmed_by_name text,
  targets_used integer,
  discarded_at timestamptz
);
create index if not exists college_review_ai_drafts_review on public.college_review_ai_drafts (review_id, created_at desc);

comment on table public.college_review_ai_drafts is
  '[COLLEGE] AI drafts of a progress review''s summary and SMART targets for the next 3 months (ELE-2051), from the tutor''s notes or a voice memo plus the review record. Scope: college_id (college staff). Used by: ReviewWorkspaceSheet Actions step, review-ai-draft edge function. Rule: a draft until the tutor confirms; the model''s output and the tutor''s input are never edited; confirming copies it into the review with source ai_draft_confirmed.';

alter table public.college_review_ai_drafts enable row level security;
drop policy if exists review_ai_drafts_select on public.college_review_ai_drafts;
create policy review_ai_drafts_select on public.college_review_ai_drafts
  for select to authenticated using (public._review_staff_can(college_id));
drop policy if exists review_ai_drafts_insert on public.college_review_ai_drafts;
create policy review_ai_drafts_insert on public.college_review_ai_drafts
  for insert to authenticated with check (
    public._review_staff_can(college_id)
    and not public.current_user_is_read_only_staff()
    and created_by = auth.uid()
    and confirmed_at is null and discarded_at is null
    and exists (select 1 from public.college_tripartite_reviews r
                 where r.id = review_id and r.college_id = college_review_ai_drafts.college_id
                   and r.student_id = college_review_ai_drafts.student_id and r.locked_at is null));
drop policy if exists review_ai_drafts_update on public.college_review_ai_drafts;
create policy review_ai_drafts_update on public.college_review_ai_drafts
  for update to authenticated
  using (public._review_staff_can(college_id) and not public.current_user_is_read_only_staff())
  with check (public._review_staff_can(college_id) and not public.current_user_is_read_only_staff());

-- Only the decision fields change after a draft is written; a decision is final.
create or replace function public._review_ai_drafts_guard()
returns trigger language plpgsql set search_path to 'public' as $$
begin
  if current_user not in ('authenticated', 'anon') then return new; end if;
  if new.review_id is distinct from old.review_id or new.college_id is distinct from old.college_id
     or new.student_id is distinct from old.student_id or new.created_by is distinct from old.created_by
     or new.input_source is distinct from old.input_source or new.input_notes is distinct from old.input_notes
     or new.model is distinct from old.model or new.summary is distinct from old.summary
     or new.targets is distinct from old.targets or new.grounding is distinct from old.grounding
     or new.created_at is distinct from old.created_at then
    raise exception 'an AI draft is kept as it was written' using errcode = '42501';
  end if;
  if (old.confirmed_at is not null or old.discarded_at is not null)
     and (new.confirmed_at is distinct from old.confirmed_at or new.discarded_at is distinct from old.discarded_at
          or new.confirmed_by is distinct from old.confirmed_by or new.targets_used is distinct from old.targets_used) then
    raise exception 'this draft has already been used or discarded' using errcode = '42501';
  end if;
  if new.confirmed_at is not null and old.confirmed_at is null then
    new.confirmed_at := now();
    new.confirmed_by := auth.uid();
  end if;
  return new;
end; $$;
drop trigger if exists trg_review_ai_drafts_guard on public.college_review_ai_drafts;
create trigger trg_review_ai_drafts_guard before update on public.college_review_ai_drafts
  for each row execute function public._review_ai_drafts_guard();

-- Actions: where an action came from.
alter table public.college_review_actions add column if not exists source text not null default 'tutor';
alter table public.college_review_actions add column if not exists ai_draft_id uuid references public.college_review_ai_drafts(id) on delete set null;
do $$ begin
  alter table public.college_review_actions add constraint college_review_actions_source_check
    check (source in ('tutor', 'ai_draft_confirmed'));
exception when duplicate_object then null; end $$;
comment on column public.college_review_actions.source is
  'ELE-2051: tutor = typed by the tutor; ai_draft_confirmed = a SMART target from an AI draft the tutor read, checked and chose to use (ai_draft_id).';
