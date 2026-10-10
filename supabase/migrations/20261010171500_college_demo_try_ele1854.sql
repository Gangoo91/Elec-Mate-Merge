-- ELE-1854 "Try it on your phone" (P-ELE-13).
--
-- A presenter in the demo college shows a QR. A visitor scans it and is signed
-- in as a throwaway demo learner in the demo college, in a cohort led by the
-- fixture tutor. The QR carries a short-lived, single-use token. The account
-- is created by the public edge function college-demo-try (service role), never
-- by a browser.
--
-- Safety rules, enforced here and not only in the function:
--   * tokens can only be minted for a college with colleges.is_demo = true, by
--     its active staff or a platform admin;
--   * a visitor is only ever placed in a demo-college cohort whose tutor is a
--     fixture account (founder+collegedemo-*), so nothing a visitor does reaches
--     a real tutor;
--   * visitor accounts use founder+collegedemo-try-<hex>@elec-mate.com, so demo
--     mode switches on and any stray email lands in Elec-Mate's own inbox;
--   * the cleanup only ever touches accounts listed in college_demo_visitors
--     whose email matches founder+collegedemo-try-% and whose college is a demo
--     college;
--   * limits: 10 visitors per demo college per rolling 24 hours, 3 per network
--     per hour, 30 live at once platform-wide, 40 QR tokens per college per day;
--   * a session lasts 2 hours (then the account is banned and its sessions
--     removed); the account is deleted after 48 hours.
--
-- Additive only.

-- ─── tables ──────────────────────────────────────────────────────────────

create table if not exists public.college_demo_try_tokens (
  id          uuid primary key default gen_random_uuid(),
  college_id  uuid not null references public.colleges(id) on delete cascade,
  token_hash  text not null unique,
  created_by  uuid references auth.users(id) on delete set null,
  created_at  timestamptz not null default now(),
  expires_at  timestamptz not null,
  used_at     timestamptz,
  visitor_id  uuid
);
create index if not exists college_demo_try_tokens_college_idx
  on public.college_demo_try_tokens (college_id, created_at desc);

comment on table public.college_demo_try_tokens is
  '[COLLEGE] [DEMO] Single-use QR tokens for "Try it on your phone" (ELE-1854). Scope: demo colleges only (colleges.is_demo). Only the SHA-256 of the token is stored; the token itself is shown once in the presenter''s QR. Expires 15 minutes after it is made; redeemed once by the college-demo-try edge function. Used by: /college/try-on-phone (presenter), /try/:token (visitor), create_demo_try_token, get_demo_try_status, _demo_try_claim. Rule: no client access; RLS on with no policies; reached only through the SECURITY DEFINER functions.';

create table if not exists public.college_demo_visitors (
  id              uuid primary key default gen_random_uuid(),
  college_id      uuid not null references public.colleges(id) on delete cascade,
  token_id        uuid references public.college_demo_try_tokens(id) on delete set null,
  user_id         uuid,
  student_row_id  uuid,
  email           text not null,
  display_name    text not null,
  ip_hash         text,
  created_at      timestamptz not null default now(),
  session_ends_at timestamptz not null,
  delete_after    timestamptz not null,
  ended_at        timestamptz,
  deleted_at      timestamptz,
  cleanup_note    text,
  constraint college_demo_visitors_email_chk check (email like 'founder+collegedemo-try-%@elec-mate.com')
);
create index if not exists college_demo_visitors_college_idx
  on public.college_demo_visitors (college_id, created_at desc);
create index if not exists college_demo_visitors_user_idx
  on public.college_demo_visitors (user_id);

comment on table public.college_demo_visitors is
  '[COLLEGE] [DEMO] Ledger of throwaway "Try it on your phone" demo learners (ELE-1854). One row per visitor account the college-demo-try edge function created: the auth user, the roll row in the demo cohort, a hashed network address for the rate limit, when the 2-hour session ends and when the account is deleted (48 hours). Scope: demo colleges only; emails are always founder+collegedemo-try-*@elec-mate.com (check constraint). Used by: college-demo-try, cleanup_demo_visitors (cron), get_my_demo_visit / end_my_demo_visit (the Demo learner bar), get_demo_try_status. Rule: no client access; RLS on with no policies; the cleanup never touches an account not listed here.';

alter table public.college_demo_try_tokens enable row level security;
alter table public.college_demo_visitors enable row level security;
revoke all on public.college_demo_try_tokens from anon, authenticated;
revoke all on public.college_demo_visitors from anon, authenticated;

-- ─── helpers ─────────────────────────────────────────────────────────────

-- The demo cohort a visitor joins: a cohort in the demo college whose tutor is
-- a fixture account. Null when there is none (the claim then refuses).
create or replace function public._demo_try_cohort(p_college uuid)
returns uuid
language sql
stable
security definer
set search_path to 'public'
as $$
  select co.id
    from college_cohorts co
    join colleges c on c.id = co.college_id and c.is_demo
    join college_staff st on st.id = co.tutor_id
   where co.college_id = p_college
     and co.course_id is not null
     and lower(coalesce(st.email, '')) like 'founder+collegedemo-%@elec-mate.com'
     and lower(coalesce(co.status, 'active')) not in ('archived', 'completed', 'cancelled')
   order by co.start_date desc nulls last, co.created_at desc
   limit 1;
$$;
revoke all on function public._demo_try_cohort(uuid) from public, anon, authenticated;

-- Which demo college may this caller present? Their own (as active staff), or
-- for a platform admin the first demo college.
create or replace function public._demo_try_college_for_caller()
returns uuid
language sql
stable
security definer
set search_path to 'public'
as $$
  select coalesce(
    (select st.college_id
       from college_staff st
       join colleges c on c.id = st.college_id and c.is_demo
      where st.user_id = auth.uid() and st.archived_at is null
      order by st.created_at limit 1),
    (select c.id from colleges c where c.is_demo and public._is_platform_admin()
      order by c.created_at limit 1)
  );
$$;
revoke all on function public._demo_try_college_for_caller() from public, anon;

-- ─── presenter: mint a token ─────────────────────────────────────────────

create or replace function public.create_demo_try_token()
returns jsonb
language plpgsql
volatile
security definer
set search_path to 'public', 'extensions'
as $$
declare
  v_college uuid := public._demo_try_college_for_caller();
  v_token   text;
  v_id      uuid;
  v_exp     timestamptz := now() + interval '15 minutes';
  v_today   int;
  v_issued  int;
begin
  if auth.uid() is null then
    raise exception 'Sign in first' using errcode = '42501';
  end if;
  if v_college is null then
    raise exception 'Try it on your phone only works in the demo college' using errcode = '42501';
  end if;
  if public._demo_try_cohort(v_college) is null then
    raise exception 'The demo college has no cohort led by a demo tutor, so there is nowhere safe to put a visitor';
  end if;
  select count(*) into v_issued from college_demo_try_tokens
   where college_id = v_college and created_at > now() - interval '24 hours';
  if v_issued >= 40 then
    raise exception 'That is the most QR codes for today. Try again tomorrow.';
  end if;

  v_token := encode(extensions.gen_random_bytes(18), 'hex');
  insert into college_demo_try_tokens (college_id, token_hash, created_by, expires_at)
  values (v_college, encode(extensions.digest(v_token, 'sha256'), 'hex'), auth.uid(), v_exp)
  returning id into v_id;

  select count(*) into v_today from college_demo_visitors
   where college_id = v_college and created_at > now() - interval '24 hours';

  return jsonb_build_object(
    'token', v_token,
    'token_id', v_id,
    'expires_at', v_exp,
    'visitors_today', v_today,
    'daily_limit', 10,
    'college_name', (select name from colleges where id = v_college)
  );
end;
$$;
revoke all on function public.create_demo_try_token() from public, anon;
grant execute on function public.create_demo_try_token() to authenticated;

-- Presenter polls this to see the scan land and to show the day's count.
create or replace function public.get_demo_try_status(p_token_id uuid default null)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $$
declare
  v_college uuid := public._demo_try_college_for_caller();
  v_tok     record;
begin
  if v_college is null then
    return null;
  end if;
  if p_token_id is not null then
    select t.used_at, t.expires_at, v.display_name
      into v_tok
      from college_demo_try_tokens t
      left join college_demo_visitors v on v.id = t.visitor_id
     where t.id = p_token_id and t.college_id = v_college;
  end if;
  return jsonb_build_object(
    'used', v_tok.used_at is not null,
    'used_at', v_tok.used_at,
    'expired', v_tok.expires_at is not null and v_tok.expires_at <= now(),
    'visitor_name', v_tok.display_name,
    'visitors_today', (select count(*) from college_demo_visitors
                        where college_id = v_college and created_at > now() - interval '24 hours'),
    'live_now', (select count(*) from college_demo_visitors
                  where college_id = v_college and ended_at is null and session_ends_at > now()),
    'daily_limit', 10
  );
end;
$$;
revoke all on function public.get_demo_try_status(uuid) from public, anon;
grant execute on function public.get_demo_try_status(uuid) to authenticated;

-- ─── edge function only: claim + provision ───────────────────────────────

-- Step 1: redeem a token. Locks it, checks every limit, writes the ledger row
-- and marks the token used, all in one transaction. Returns what the function
-- needs to create the auth user. Errors are short codes the page can explain.
create or replace function public._demo_try_claim(p_token_hash text, p_ip_hash text)
returns jsonb
language plpgsql
volatile
security definer
set search_path to 'public', 'extensions'
as $$
declare
  v_tok     record;
  v_cohort  uuid;
  v_id      uuid := gen_random_uuid();
  v_suffix  text := upper(substr(encode(extensions.gen_random_bytes(4), 'hex'), 1, 3));
  v_email   text := 'founder+collegedemo-try-' || encode(extensions.gen_random_bytes(5), 'hex') || '@elec-mate.com';
  v_name    text;
begin
  if p_token_hash is null or p_token_hash !~ '^[0-9a-f]{64}$' then
    return jsonb_build_object('error', 'invalid');
  end if;

  select t.* into v_tok
    from college_demo_try_tokens t
   where t.token_hash = p_token_hash
   for update;
  if not found then
    return jsonb_build_object('error', 'invalid');
  end if;
  if v_tok.used_at is not null then
    return jsonb_build_object('error', 'used');
  end if;
  if v_tok.expires_at <= now() then
    return jsonb_build_object('error', 'expired');
  end if;
  if not exists (select 1 from colleges where id = v_tok.college_id and is_demo) then
    return jsonb_build_object('error', 'invalid');
  end if;
  v_cohort := public._demo_try_cohort(v_tok.college_id);
  if v_cohort is null then
    return jsonb_build_object('error', 'unavailable');
  end if;

  if (select count(*) from college_demo_visitors
       where college_id = v_tok.college_id and created_at > now() - interval '24 hours') >= 10 then
    return jsonb_build_object('error', 'daily_limit');
  end if;
  if p_ip_hash is not null and (select count(*) from college_demo_visitors
       where ip_hash = p_ip_hash and created_at > now() - interval '1 hour') >= 3 then
    return jsonb_build_object('error', 'network_limit');
  end if;
  if (select count(*) from college_demo_visitors
       where ended_at is null and session_ends_at > now()) >= 30 then
    return jsonb_build_object('error', 'busy');
  end if;

  v_name := 'Demo learner ' || v_suffix;
  insert into college_demo_visitors (id, college_id, token_id, email, display_name, ip_hash, session_ends_at, delete_after)
  values (v_id, v_tok.college_id, v_tok.id, v_email, v_name, p_ip_hash,
          now() + interval '2 hours', now() + interval '48 hours');
  update college_demo_try_tokens set used_at = now(), visitor_id = v_id where id = v_tok.id;

  return jsonb_build_object(
    'visitor_id', v_id,
    'email', v_email,
    'display_name', v_name,
    'college_id', v_tok.college_id,
    'cohort_id', v_cohort,
    'session_ends_at', now() + interval '2 hours'
  );
end;
$$;
revoke all on function public._demo_try_claim(text, text) from public, anon, authenticated;
grant execute on function public._demo_try_claim(text, text) to service_role;

-- Step 2: after the function has created the auth user, put them on the roll.
-- Refuses unless the user's email is the one the claim issued.
create or replace function public._demo_try_provision(p_visitor uuid, p_user uuid)
returns jsonb
language plpgsql
volatile
security definer
set search_path to 'public'
as $$
declare
  v_vis      record;
  v_email    text;
  v_cohort   uuid;
  v_co       record;
  v_qual     uuid;
  v_college  text;
  v_tutor    uuid;
  v_student  uuid;
begin
  select * into v_vis from college_demo_visitors where id = p_visitor for update;
  if not found or v_vis.user_id is not null then
    raise exception 'demo visitor not claimable';
  end if;
  select email into v_email from auth.users where id = p_user;
  if v_email is null or lower(v_email) <> lower(v_vis.email) then
    raise exception 'demo visitor email mismatch';
  end if;
  if not exists (select 1 from colleges where id = v_vis.college_id and is_demo) then
    raise exception 'not a demo college';
  end if;
  v_cohort := public._demo_try_cohort(v_vis.college_id);
  if v_cohort is null then
    raise exception 'no demo cohort';
  end if;
  select co.id, co.name, co.course_id, co.tutor_id into v_co from college_cohorts co where co.id = v_cohort;
  select qualification_id into v_qual from college_courses where id = v_co.course_id;
  select name into v_college from colleges where id = v_vis.college_id;
  select user_id into v_tutor from college_staff where id = v_co.tutor_id;

  -- Profile: an apprentice with free access that lapses when the account is
  -- deleted, off every leaderboard, every marketing sequence marked as sent.
  update profiles set
    full_name = v_vis.display_name,
    role = 'apprentice',
    onboarding_completed = true,
    free_access_granted = true,
    free_access_expires_at = v_vis.delete_after,
    free_access_reason = 'Try it on your phone: throwaway demo learner (ELE-1854)',
    subscribed = false,
    leaderboard_visible = false,
    created_via = 'admin_bulk',
    apprentice_course = 'level-2',
    apprentice_college = v_college,
    apprentice_year = 1,
    incomplete_signup_sent_at = now(), incomplete_signup_v2_sent_at = now(),
    incomplete_signup_v3_sent_at = now(), incomplete_signup_v10_sent_at = now(),
    incomplete_signup_v11_sent_at = now(), incomplete_signup_v11_nudge_sent_at = now(),
    reengage_email_sent_at = now(), reengage_email_2_sent_at = now(),
    reengage_email_3_sent_at = now(), winback_offer_sent_at = now(),
    apprentice_campaign_sent_at = now(), apprentice_campaign_type = 'fixture'
  where id = p_user;

  insert into college_students (user_id, college_id, course_id, cohort_id, name, email, status, start_date, delivery_model, weekly_contracted_hours)
  values (p_user, v_vis.college_id, v_co.course_id, v_cohort, v_vis.display_name, v_vis.email, 'Active',
          (now() at time zone 'Europe/London')::date, 'day_release', 37.5)
  returning id into v_student;

  if v_qual is not null then
    insert into college_student_assignments
      (student_id, college_id, college_name, qualification_id, cohort_id, cohort_name, tutor_id, start_date, status)
    values (p_user, v_vis.college_id, v_college, v_qual, v_cohort::text, v_co.name, v_tutor,
            (now() at time zone 'Europe/London')::date, 'active');
  end if;

  update college_demo_visitors set user_id = p_user, student_row_id = v_student where id = p_visitor;
  return jsonb_build_object('student_id', v_student, 'cohort_name', v_co.name, 'college_name', v_college);
end;
$$;
revoke all on function public._demo_try_provision(uuid, uuid) from public, anon, authenticated;
grant execute on function public._demo_try_provision(uuid, uuid) to service_role;

-- ─── the visitor: their own demo visit ───────────────────────────────────

create or replace function public.get_my_demo_visit()
returns jsonb
language sql
stable
security definer
set search_path to 'public'
as $$
  select jsonb_build_object(
    'display_name', v.display_name,
    'session_ends_at', v.session_ends_at,
    'ended', v.ended_at is not null or v.session_ends_at <= now(),
    'college_name', c.name
  )
  from college_demo_visitors v
  join colleges c on c.id = v.college_id
  where v.user_id = auth.uid()
  order by v.created_at desc
  limit 1;
$$;
revoke all on function public.get_my_demo_visit() from public, anon;
grant execute on function public.get_my_demo_visit() to authenticated;

create or replace function public.end_my_demo_visit()
returns void
language sql
volatile
security definer
set search_path to 'public'
as $$
  update college_demo_visitors
     set session_ends_at = least(session_ends_at, now())
   where user_id = auth.uid() and ended_at is null;
$$;
revoke all on function public.end_my_demo_visit() from public, anon;
grant execute on function public.end_my_demo_visit() to authenticated;

-- ─── cleanup (cron, every 10 minutes) ────────────────────────────────────

create or replace function public.cleanup_demo_visitors()
returns jsonb
language plpgsql
volatile
security definer
set search_path to 'public', 'auth'
as $$
declare
  r         record;
  v_ended   int := 0;
  v_deleted int := 0;
  v_kept    int := 0;
begin
  -- 1. Sessions past 2 hours: ban the account and remove its sessions.
  for r in
    select v.id, v.user_id
      from public.college_demo_visitors v
      join public.colleges c on c.id = v.college_id and c.is_demo
     where v.ended_at is null and v.session_ends_at <= now()
  loop
    if r.user_id is not null then
      update auth.users set banned_until = 'infinity'
       where id = r.user_id and email like 'founder+collegedemo-try-%@elec-mate.com';
      delete from auth.sessions s
       using auth.users u
       where s.user_id = r.user_id and u.id = s.user_id
         and u.email like 'founder+collegedemo-try-%@elec-mate.com';
    end if;
    update public.college_demo_visitors set ended_at = now() where id = r.id;
    v_ended := v_ended + 1;
  end loop;

  -- 2. Accounts past 48 hours: remove the roll rows and the account.
  for r in
    select v.id, v.user_id, v.student_row_id, v.college_id
      from public.college_demo_visitors v
      join public.colleges c on c.id = v.college_id and c.is_demo
     where v.deleted_at is null and v.delete_after <= now()
  loop
    begin
      if r.student_row_id is not null then
        delete from public.college_students
         where id = r.student_row_id and college_id = r.college_id
           and lower(coalesce(email, '')) like 'founder+collegedemo-try-%@elec-mate.com';
      end if;
      if r.user_id is not null then
        delete from public.college_student_assignments where student_id = r.user_id and college_id = r.college_id;
        delete from auth.users
         where id = r.user_id and email like 'founder+collegedemo-try-%@elec-mate.com';
      end if;
      update public.college_demo_visitors
         set deleted_at = now(), ended_at = coalesce(ended_at, now()), cleanup_note = null
       where id = r.id;
      v_deleted := v_deleted + 1;
    exception when others then
      -- Something the visitor made still points at the account. It stays
      -- banned (it can never sign in again) and is retried next run.
      update public.college_demo_visitors set cleanup_note = left(sqlerrm, 300) where id = r.id;
      v_kept := v_kept + 1;
    end;
  end loop;

  delete from public.college_demo_try_tokens where created_at < now() - interval '7 days' and used_at is null;

  return jsonb_build_object('ended', v_ended, 'deleted', v_deleted, 'kept', v_kept);
end;
$$;
revoke all on function public.cleanup_demo_visitors() from public, anon, authenticated;
grant execute on function public.cleanup_demo_visitors() to service_role;

do $$
begin
  if exists (select 1 from cron.job where jobname = 'cleanup-demo-visitors') then
    perform cron.unschedule('cleanup-demo-visitors');
  end if;
  perform cron.schedule('cleanup-demo-visitors', '*/10 * * * *', 'select public.cleanup_demo_visitors();');
end $$;
