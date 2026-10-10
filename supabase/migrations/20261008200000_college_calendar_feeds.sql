-- Subscribe to your college calendar (8 Oct 2026).
--
-- A private, revocable iCalendar feed per person. The learner gets their
-- cohort's classes, quiz due dates, progress reviews, EPA/gateway dates and
-- college days; the tutor gets the classes they teach, the reviews they hold,
-- standardisation meetings and observations. The feed itself is served by the
-- college-calendar-feed edge function (deployed --no-verify-jwt, because
-- calendar apps cannot send a JWT): the token in the URL is the only
-- credential, so it is 32 random bytes and the function never logs it.
--
-- Additive only: one new table, three new functions.

create table if not exists public.college_calendar_feeds (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  token text not null unique check (char_length(token) >= 43),
  created_at timestamptz not null default now(),
  revoked_at timestamptz,
  last_fetched_at timestamptz
);

-- One live link per person.
create unique index if not exists college_calendar_feeds_one_live
  on public.college_calendar_feeds (user_id)
  where revoked_at is null;

create index if not exists college_calendar_feeds_user_idx
  on public.college_calendar_feeds (user_id);

alter table public.college_calendar_feeds enable row level security;

drop policy if exists "college_calendar_feeds_owner_select" on public.college_calendar_feeds;
create policy "college_calendar_feeds_owner_select"
  on public.college_calendar_feeds for select
  to authenticated
  using (user_id = auth.uid());

drop policy if exists "college_calendar_feeds_owner_insert" on public.college_calendar_feeds;
create policy "college_calendar_feeds_owner_insert"
  on public.college_calendar_feeds for insert
  to authenticated
  with check (user_id = auth.uid() and revoked_at is null);

-- Revoke only: the owner can stamp revoked_at on their own row.
drop policy if exists "college_calendar_feeds_owner_revoke" on public.college_calendar_feeds;
create policy "college_calendar_feeds_owner_revoke"
  on public.college_calendar_feeds for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid() and revoked_at is not null);

revoke all on public.college_calendar_feeds from anon;

comment on table public.college_calendar_feeds is
  '[COLLEGE] Private calendar subscription links (iCalendar feed tokens) for learners and tutors. Scope: per user (owner only). Used by: Add to my calendar card on /apprentice/college-plan and the college timetable; college-calendar-feed edge function (service role). Rule: one live token per user; the token is the only auth for the feed, so it is 32 random bytes, never logged, and a revoked or unknown token returns 404.';

-- Is this person on a college roll (learner) or staff list (tutor)?
create or replace function public.college_calendar_feed_allowed(p_user uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
      select 1 from public.college_students s
      where s.user_id = p_user and coalesce(lower(s.status), '') <> 'withdrawn'
    )
    or exists (
      select 1 from public.college_staff st
      where st.user_id = p_user and st.archived_at is null
    );
$$;

revoke all on function public.college_calendar_feed_allowed(uuid) from public, anon, authenticated;

-- Returns the caller's live token, creating one if they have none.
-- p_rotate = true revokes the live token first and issues a new one.
create or replace function public.get_my_college_calendar_feed(p_rotate boolean default false)
returns table (token text, created_at timestamptz)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
begin
  if v_uid is null then
    raise exception 'Not signed in' using errcode = '42501';
  end if;
  if not public.college_calendar_feed_allowed(v_uid) then
    raise exception 'Only college learners and staff can subscribe to a college calendar'
      using errcode = '42501';
  end if;

  if p_rotate then
    update public.college_calendar_feeds f
       set revoked_at = now()
     where f.user_id = v_uid and f.revoked_at is null;
  end if;

  if not exists (
    select 1 from public.college_calendar_feeds f
    where f.user_id = v_uid and f.revoked_at is null
  ) then
    insert into public.college_calendar_feeds (user_id, token)
    values (v_uid, encode(extensions.gen_random_bytes(32), 'hex'));
  end if;

  return query
    select f.token, f.created_at
      from public.college_calendar_feeds f
     where f.user_id = v_uid and f.revoked_at is null
     limit 1;
end;
$$;

revoke all on function public.get_my_college_calendar_feed(boolean) from public, anon;
grant execute on function public.get_my_college_calendar_feed(boolean) to authenticated;

-- Stop sharing: revokes the caller's live token without issuing a new one.
create or replace function public.revoke_my_college_calendar_feed()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_n integer;
begin
  if v_uid is null then
    raise exception 'Not signed in' using errcode = '42501';
  end if;
  update public.college_calendar_feeds f
     set revoked_at = now()
   where f.user_id = v_uid and f.revoked_at is null;
  get diagnostics v_n = row_count;
  return v_n;
end;
$$;

revoke all on function public.revoke_my_college_calendar_feed() from public, anon;
grant execute on function public.revoke_my_college_calendar_feed() to authenticated;
