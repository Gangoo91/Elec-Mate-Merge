-- Itemised QS review comments (applied live 2026-06-22). Per-observation /
-- per-circuit / general notes a QS leaves on a cert review, plus electrician
-- replies. RLS-scoped to the review participants; frontend reads/writes direct
-- under RLS (no edge function). Idempotent so it is safe to re-run.
-- Rollback = drop table public.report_qs_review_comments.
create table if not exists public.report_qs_review_comments (
  id uuid primary key default gen_random_uuid(),
  review_id uuid not null references public.report_qs_reviews(id) on delete cascade,
  target text not null default 'general',
  target_label text,
  body text not null,
  author_id uuid not null default auth.uid(),
  author_name text,
  resolved boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.report_qs_review_comments enable row level security;

create index if not exists idx_qs_review_comments_review
  on public.report_qs_review_comments (review_id, created_at);

drop policy if exists "QS comment participants read" on public.report_qs_review_comments;
create policy "QS comment participants read"
  on public.report_qs_review_comments for select to authenticated
  using (exists (
    select 1 from public.report_qs_reviews q
    where q.id = review_id
      and (q.electrician_id = auth.uid()
        or q.employer_id = auth.uid()
        or public.is_qs_reviewer_for(q.employer_id))
  ));

drop policy if exists "QS comment participants insert" on public.report_qs_review_comments;
create policy "QS comment participants insert"
  on public.report_qs_review_comments for insert to authenticated
  with check (
    author_id = auth.uid()
    and exists (
      select 1 from public.report_qs_reviews q
      where q.id = review_id
        and (q.electrician_id = auth.uid()
          or q.employer_id = auth.uid()
          or public.is_qs_reviewer_for(q.employer_id))
    )
  );

drop policy if exists "QS comment resolve" on public.report_qs_review_comments;
create policy "QS comment resolve"
  on public.report_qs_review_comments for update to authenticated
  using (exists (
    select 1 from public.report_qs_reviews q
    where q.id = review_id
      and (public.is_qs_reviewer_for(q.employer_id) or author_id = auth.uid())
  ));
