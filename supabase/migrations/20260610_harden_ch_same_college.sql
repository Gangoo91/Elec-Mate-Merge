-- ============================================================================
-- College Hub — harden _ch_same_college() to DB-enforce the staff invariant.
--
-- Every college-table RLS policy uses _ch_same_college(row_college), which until
-- now returned true for ANY user whose profiles.college_id matched — with no
-- staff-role check. The whole model relied on the convention "only staff have
-- profiles.college_id". This adds `college_role IS NOT NULL` so the DB enforces
-- it: a student who somehow acquired a college_id can no longer read staff data.
--
-- Verified safe before applying: 0 profiles currently have college_id without a
-- college_role (the staff-profile sync backfill ensured every linked staff has
-- their role), so no legitimate user loses access.
--
-- Rollback at the bottom.
-- ============================================================================

create or replace function public._ch_same_college(row_college uuid)
returns boolean
language sql
stable
security definer
set search_path to 'public'
as $function$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid()
      and p.college_id = row_college
      and p.college_role is not null
  );
$function$;

-- ============================================================================
-- ROLLBACK (restore the prior, role-agnostic definition):
--   create or replace function public._ch_same_college(row_college uuid)
--   returns boolean language sql stable security definer set search_path to 'public'
--   as $$ select exists (select 1 from public.profiles p
--     where p.id = auth.uid() and p.college_id = row_college); $$;
-- ============================================================================
