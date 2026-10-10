-- ELE-2020 part 1 of 2 — ADDITIVE, SAFE NOW (applied 9 Oct).
--
-- Any signed-in account can read every row of `profiles`, all columns
-- (subscription, stripe_customer_id, admin_role, referral credits, UTM/ad ids,
-- WhatsApp agent number...). Part 2
-- (supabase/release-held/20261009103000_ele2020_profiles_own_row.sql) makes
-- `profiles` own row + platform admin only. Before that can go live, every
-- read of ANOTHER person's profile has to move here. This file only ADDS the
-- replacement paths, so the live app (which still reads `profiles` directly)
-- is unaffected.
--
-- 1. public_profiles: the fields the app shows about other people.
--    Owner-run view (security_invoker off) ON PURPOSE: it must see past the
--    own-row RLS on `profiles`, and it is the column filter. Signed-in only.
--    Columns, by consumer:
--      id, full_name, avatar_url — names/avatars in team, college, peer
--        support, leaderboard and Elec-ID screens;
--      role, is_assessor, college_id — the college RLS policies and views that
--        join a learner's profile (portfolio_items / portfolio_submissions,
--        v_assessor_workload, v_iqa_sampling_status, v_portfolio_stats_by_college);
--      leaderboard_visible — the study leaderboard's fallback query.
--    Nothing about billing, admin, referral, contact, tracking or the agent.
--
-- 2. get_firm_seat_terms(firm): a firm's seat cap + comped flag for the
--    firm's managers (EmployeesSection read them off the owner's profile).
-- 3. get_learner_am2_exam_date(user): a learner's booked AM2 date for their
--    own college staff (Student 360 read it off the learner's profile).
-- 4. get_support_admin_id(): who a user's reply to the Elec-Mate team goes to
--    (useAdminMessages listed profiles by admin_role).
-- 5. "Platform admins read all profiles": the admin pages' path. Today the
--    blanket policy covers admins; this keeps them covered once it is gone.

-- ── 1 ───────────────────────────────────────────────────────────────────
create or replace view public.public_profiles
with (security_invoker = false) as
select p.id,
       p.full_name,
       p.avatar_url,
       p.role,
       p.is_assessor,
       p.college_id,
       p.leaderboard_visible
  from public.profiles p;

comment on view public.public_profiles is
  'ELE-2020: the only fields of ANOTHER user''s profile the app may read. Owner-run on purpose (profiles is own-row RLS). Never add billing, admin, referral, contact or tracking columns.';

revoke all on public.public_profiles from public, anon, authenticated;
grant select on public.public_profiles to authenticated, service_role;

-- ── 2 ───────────────────────────────────────────────────────────────────
create or replace function public.get_firm_seat_terms(p_firm uuid)
returns table (employer_seat_cap integer, free_access_granted boolean)
language sql
stable
security definer
set search_path = public
as $$
  select p.employer_seat_cap, coalesce(p.free_access_granted, false)
    from public.profiles p
   where p.id = p_firm
     and (p_firm in (select public.my_employer_scope()) or public.is_admin());
$$;

revoke all on function public.get_firm_seat_terms(uuid) from public, anon;
grant execute on function public.get_firm_seat_terms(uuid) to authenticated, service_role;

-- ── 3 ───────────────────────────────────────────────────────────────────
create or replace function public.get_learner_am2_exam_date(p_user uuid)
returns date
language sql
stable
security definer
set search_path = public
as $$
  select p.am2_exam_date
    from public.profiles p
   where p.id = p_user
     and (
       p_user = auth.uid()
       or public.is_admin()
       or exists (
         select 1
           from public.college_students s
          where s.user_id = p_user
            and (
              public._ch_same_college(s.college_id)
              or exists (select 1 from public.college_staff st
                          where st.college_id = s.college_id
                            and st.user_id = auth.uid()
                            and st.archived_at is null)
            )
       )
     );
$$;

revoke all on function public.get_learner_am2_exam_date(uuid) from public, anon;
grant execute on function public.get_learner_am2_exam_date(uuid) to authenticated, service_role;

-- ── 4 ───────────────────────────────────────────────────────────────────
create or replace function public.get_support_admin_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select p.id
    from public.profiles p
   where p.admin_role is not null
     and p.id is distinct from auth.uid()
   order by case p.admin_role when 'super_admin' then 0 else 1 end, p.created_at
   limit 1;
$$;

revoke all on function public.get_support_admin_id() from public, anon;
grant execute on function public.get_support_admin_id() to authenticated, service_role;

-- ── 5 ───────────────────────────────────────────────────────────────────
drop policy if exists "Platform admins read all profiles" on public.profiles;
create policy "Platform admins read all profiles"
  on public.profiles for select to authenticated
  using (public.is_admin());
