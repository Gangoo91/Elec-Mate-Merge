-- ELE-2020 part 2 of 2 — RELEASE-HELD. NOT APPLIED.
--
-- RELEASE-HELD: apply only after the client that reads other people's
-- profiles through `public_profiles` / the ELE-2020 RPCs is live — i.e.
-- straight after the Vercel deploy of the ELE-2020 patch. Applying it before
-- then blanks other people's names across the live web app (team lists,
-- college learner lists, peer support, leaderboard, Elec-ID cards) and breaks
-- the manager seat count and "reply to the Elec-Mate team".
--
-- ⚠ iOS build 49 (c4b438a06) still reads other people's rows from `profiles`.
--   After this is applied those screens show no names (RLS returns empty rows,
--   not errors) until the next native build ships the same client change.
--
-- Prerequisite (LIVE, additive): 20261009101000_ele2020_public_profiles_additive.sql
--   public_profiles, get_firm_seat_terms, get_learner_am2_exam_date,
--   get_support_admin_id, "Platform admins read all profiles".
--
-- What it does
--   1. Drops "Authenticated users can view basic profile info"
--      (auth.role() = 'authenticated' → every row, every column, to anyone
--      signed in). `profiles` is then readable as: own row ("Users can view
--      own profile") + platform admins ("Platform admins read all profiles").
--   2. The six college policies that joined the LEARNER's profile row
--      (portfolio_items / portfolio_submissions) read the learner's
--      college_id from public_profiles instead. The staff member's own row
--      still comes from `profiles` (own row). Same rule, same result.
--   3. The three invoker views that list other people's profiles
--      (v_assessor_workload, v_iqa_sampling_status, v_portfolio_stats_by_college)
--      read public_profiles. Same columns.
--   Edge functions: checked 9 Oct — every user-JWT read of `profiles` is the
--   caller's own row or admin-gated; all other reads use the service role.
--   SECURITY DEFINER functions are unaffected.

begin;

do $$
begin
  if to_regclass('public.public_profiles') is null
     or to_regprocedure('public.get_firm_seat_terms(uuid)') is null
     or to_regprocedure('public.get_learner_am2_exam_date(uuid)') is null
     or to_regprocedure('public.get_support_admin_id()') is null
     or not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'profiles'
                     and policyname = 'Platform admins read all profiles')
     or not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'profiles'
                     and policyname = 'Users can view own profile') then
    raise exception 'ELE-2020 pre-flight: apply 20261009101000 first (public_profiles / RPCs / admin + own-row policies missing)';
  end if;
end $$;

-- 1 ────────────────────────────────────────────────────────────────────
drop policy if exists "Authenticated users can view basic profile info" on public.profiles;

-- 2 ────────────────────────────────────────────────────────────────────
drop policy if exists "College staff can view portfolio items" on public.portfolio_items;
create policy "College staff can view portfolio items"
  on public.portfolio_items for select to authenticated
  using (exists (
    select 1
      from public.profiles staff
      join public.public_profiles student on student.id = portfolio_items.user_id
     where staff.id = (select auth.uid())
       and staff.college_id = student.college_id
       and staff.college_role is not null));

drop policy if exists "assessors_review" on public.portfolio_submissions;
create policy "assessors_review"
  on public.portfolio_submissions for update to authenticated
  using (exists (
    select 1
      from public.profiles assessor
      join public.public_profiles student on student.id = portfolio_submissions.user_id
     where assessor.id = (select auth.uid())
       and assessor.is_assessor = true
       and assessor.college_id = student.college_id
       and portfolio_submissions.status = any (array['submitted', 'under_review', 'resubmitted'])));

drop policy if exists "assessors_view_college" on public.portfolio_submissions;
create policy "assessors_view_college"
  on public.portfolio_submissions for select to authenticated
  using (exists (
    select 1
      from public.profiles assessor
      join public.public_profiles student on student.id = portfolio_submissions.user_id
     where assessor.id = (select auth.uid())
       and assessor.is_assessor = true
       and assessor.college_id = student.college_id));

drop policy if exists "college_admins_view" on public.portfolio_submissions;
create policy "college_admins_view"
  on public.portfolio_submissions for select to authenticated
  using (exists (
    select 1
      from public.profiles admin
      join public.public_profiles student on student.id = portfolio_submissions.user_id
     where admin.id = (select auth.uid())
       and admin.college_role = 'admin'
       and admin.college_id = student.college_id));

drop policy if exists "iqa_sample" on public.portfolio_submissions;
create policy "iqa_sample"
  on public.portfolio_submissions for update to authenticated
  using (exists (
    select 1
      from public.profiles iqa
      join public.public_profiles student on student.id = portfolio_submissions.user_id
     where iqa.id = (select auth.uid())
       and iqa.is_iqa = true
       and iqa.college_id = student.college_id
       and portfolio_submissions.status = any (array['signed_off', 'iqa_sampled'])));

drop policy if exists "iqa_view_signedoff" on public.portfolio_submissions;
create policy "iqa_view_signedoff"
  on public.portfolio_submissions for select to authenticated
  using (exists (
    select 1
      from public.profiles iqa
      join public.public_profiles student on student.id = portfolio_submissions.user_id
     where iqa.id = (select auth.uid())
       and iqa.is_iqa = true
       and iqa.college_id = student.college_id
       and portfolio_submissions.status = any (array['signed_off', 'iqa_sampled', 'iqa_verified'])));

-- 3 ────────────────────────────────────────────────────────────────────
create or replace view public.v_assessor_workload
with (security_invoker = true) as
select a.id as assessor_id,
       a.full_name as assessor_name,
       a.college_id,
       c.name as college_name,
       count(case when ps.status = any (array['submitted', 'under_review', 'resubmitted']) then 1 end) as pending_reviews,
       count(case when ps.status = 'approved' then 1 end) as pending_signoff,
       count(case when ps.reviewed_at > now() - interval '7 days' then 1 end) as reviewed_this_week,
       (avg(case when ps.reviewed_at is not null and ps.submitted_at is not null
                 then extract(epoch from ps.reviewed_at - ps.submitted_at) / 3600::numeric end))::numeric(10,1) as avg_review_hours
  from public.public_profiles a
  join public.colleges c on c.id = a.college_id
  left join public.portfolio_submissions ps on ps.assessor_id = a.id
 where a.is_assessor = true
 group by a.id, a.full_name, a.college_id, c.name;

create or replace view public.v_iqa_sampling_status
with (security_invoker = true) as
select c.id as college_id,
       c.name as college_name,
       q.id as qualification_id,
       q.title as qualification_title,
       count(case when ps.status = 'signed_off' then 1 end) as awaiting_sampling,
       count(case when ps.status = 'iqa_sampled' then 1 end) as sampled,
       count(case when ps.status = 'iqa_verified' then 1 end) as verified,
       round(count(case when ps.iqa_sampled = true then 1 end)::numeric
             / nullif(count(case when ps.status = any (array['signed_off', 'iqa_sampled', 'iqa_verified']) then 1 end), 0)::numeric
             * 100::numeric, 1) as sampling_rate
  from public.colleges c
  join public.public_profiles p on p.college_id = c.id and p.role = 'apprentice'
  join public.portfolio_submissions ps on ps.user_id = p.id
  join public.qualifications q on q.id = ps.qualification_id
 where ps.status = any (array['signed_off', 'iqa_sampled', 'iqa_verified'])
 group by c.id, c.name, q.id, q.title;

create or replace view public.v_portfolio_stats_by_college
with (security_invoker = true) as
select c.id as college_id,
       c.name as college_name,
       count(distinct ps.user_id) as total_students,
       count(ps.id) as total_submissions,
       count(case when ps.status = 'submitted' then 1 end) as pending_review,
       count(case when ps.status = 'under_review' then 1 end) as under_review,
       count(case when ps.status = 'feedback_given' then 1 end) as feedback_pending,
       count(case when ps.status = 'approved' then 1 end) as approved,
       count(case when ps.status = 'signed_off' then 1 end) as signed_off,
       count(case when ps.status = any (array['iqa_sampled', 'iqa_verified']) then 1 end) as iqa_complete,
       round(count(case when ps.status = any (array['signed_off', 'iqa_sampled', 'iqa_verified']) then 1 end)::numeric
             / nullif(count(ps.id), 0)::numeric * 100::numeric, 1) as completion_rate
  from public.colleges c
  left join public.public_profiles p on p.college_id = c.id and p.role = 'apprentice'
  left join public.portfolio_submissions ps on ps.user_id = p.id
 group by c.id, c.name;

commit;

-- ─────────────────────────────────────────────────────────────────────────
-- VERIFY after applying (as a normal signed-in user, in a rolled-back txn):
--   set local role authenticated;
--   select set_config('request.jwt.claims', json_build_object('sub','<uid>','role','authenticated')::text, true);
--   select count(*) from public.profiles;                 -- 1 (own row)
--   select stripe_customer_id from public.profiles where id <> '<uid>';  -- 0 rows
--   select count(*) from public.public_profiles;          -- every profile, safe columns only
-- ROLLBACK (if a screen breaks):
--   create policy "Authenticated users can view basic profile info" on public.profiles
--     for select using (auth.role() = 'authenticated');
