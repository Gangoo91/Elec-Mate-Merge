-- Rate limit + audit for the two AI helpers on work evidence (8 Oct 2026):
--   read-paper-test-schedule   (a photo of a paper schedule -> readings to confirm)
--   check-calculation-evidence (a calculation checked against the BS 7671 RAG)
-- Neither decides anything; this only stops them being run in a loop.

begin;

create table if not exists public.ai_evidence_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null check (kind in ('schedule_photo', 'calc_check')),
  created_at timestamptz not null default now()
);

create index if not exists ai_evidence_requests_user_kind_idx
  on public.ai_evidence_requests (user_id, kind, created_at desc);

alter table public.ai_evidence_requests enable row level security;
revoke all on public.ai_evidence_requests from anon, authenticated;

comment on table public.ai_evidence_requests is '[PORTFOLIO — OWNED BY THE APPRENTICE] One row per AI helper run on work evidence (schedule_photo = read a photo of a paper test schedule; calc_check = check a calculation against the BS 7671 RAG). Scope: user_id = the learner who ran it. Used by: read-paper-test-schedule and check-calculation-evidence fns, via claim_ai_evidence_quota(). Rule: rate limit and audit only; holds no evidence content.';

/* Take one unit of the caller's hourly allowance for an AI evidence helper.
   Raises (hint rate_limited) when used up. */
create or replace function public.claim_ai_evidence_quota(p_kind text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_limit int := case p_kind when 'schedule_photo' then 20 when 'calc_check' then 30 end;
  v_used int;
begin
  if v_uid is null then raise exception 'sign in first' using errcode = '42501'; end if;
  if v_limit is null then raise exception 'unknown helper' using errcode = '22023'; end if;
  select count(*) into v_used from ai_evidence_requests
   where user_id = v_uid and kind = p_kind and created_at > now() - interval '1 hour';
  if v_used >= v_limit then
    raise exception 'limit reached, try again later' using errcode = 'P0001', hint = 'rate_limited';
  end if;
  insert into ai_evidence_requests (user_id, kind) values (v_uid, p_kind);
  return true;
end; $$;

revoke all on function public.claim_ai_evidence_quota(text) from public, anon;
grant execute on function public.claim_ai_evidence_quota(text) to authenticated;

commit;
