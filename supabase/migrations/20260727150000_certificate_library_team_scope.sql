-- The certificate library becomes the COMPANY's library, not just the account's.
--
-- ELE-1421. Craig signed off Rad's 8 Roundhouse EICR and reported the cert had
-- "disappeared" — not on his dashboard, not in the QS folder. Nothing was lost:
-- the cert is owned by Rad (`reports.user_id`), and the library query is hard
-- filtered `.eq('user_id', auth.uid())`, so a company owner can never see the
-- work their own team produced. The QS queue correctly drops it on approval,
-- and the only surface that did show it (Employer Hub → Team Certificates) is a
-- tab he never opens. Three correct behaviours composing into "it vanished".
--
-- These RPCs return the caller's own certs UNION their team's FINISHED certs, so
-- the library a QS opens is the one they expect. Deliberately NOT a second tab —
-- the whole failure was a cert sitting behind a tab nobody opened.
--
-- Team rows are finished work only: `status = 'completed'` OR an approved QS
-- review. Drafts, auto-drafts and in-progress forms stay private to the
-- electrician who is still working on them — a QS does not need to watch someone
-- type. Note both halves are needed: Rad's 3 Byth Close EIC is completed but was
-- never submitted for review, and Rad's 8 Roundhouse EICR is approved. Filtering
-- on approval alone would still have hidden a finished company certificate.
--
-- Access reuses the proven employer resolution from get_qs_review_queue (owner,
-- else active team_role='qs' member) rather than inventing a second rule, and
-- the roster join matches is_team_qs_of() — status 'Active' + claimed_at set —
-- so what these return is exactly what the `QS can view team reports` RLS policy
-- already permits. No new access is granted; SECURITY DEFINER is here to make
-- one indexed query out of what would otherwise be a client-side N+1.
--
-- Rollback: drop both functions. The client falls back to reportCloud
-- .getUserReports(), which is untouched and still serves every non-QS account.

-- ── Shared base: the caller's visible certificate set ────────────────────────
-- Returns one row per certificate the caller may see in their library, with the
-- owner attribution the UI needs to label whose work it is.
create or replace function public.qs_library_base(p_scope text default 'all')
returns table (
  id uuid,
  user_id uuid,
  is_team_cert boolean,
  owner_name text,
  qs_review_status text,
  qs_reviewer_name text,
  qs_reviewed_at timestamptz
)
language sql
stable
security definer
set search_path to 'public'
as $function$
  with me as (select auth.uid() as uid),
  emp as (
    select case
      when exists (
        select 1 from public.employer_employees ee, me where ee.employer_id = me.uid
      ) then (select uid from me)
      else (
        select e.employer_id
        from public.employer_employees e, me
        where e.user_id = me.uid
          and e.team_role ilike 'qs'
          and e.status ilike 'active'
          and e.employer_id is not null
        order by e.created_at asc
        limit 1
      )
    end as employer_id
  ),
  -- Roster predicate mirrors is_team_qs_of(): only Active, claimed members.
  -- Aliased `member_id`, not `user_id`: this function's RETURNS TABLE column
  -- names are also parameter names, so an unqualified `user_id` inside the body
  -- is ambiguous between the CTE column and the output parameter and Postgres
  -- rejects the function. Every reference below stays table-qualified.
  members as (
    select ee.user_id as member_id
    from public.employer_employees ee, emp, me
    where ee.employer_id = emp.employer_id
      and ee.status = 'Active'
      and ee.claimed_at is not null
      and ee.user_id is not null
      and ee.user_id <> me.uid
  )
  select
    r.id,
    r.user_id,
    (r.user_id <> (select uid from me)) as is_team_cert,
    case when r.user_id = (select uid from me) then null else coalesce(p.full_name, 'Team member') end,
    q.status,
    q.reviewer_name,
    q.reviewed_at
  from public.reports r
  left join lateral (
    select q2.status, q2.reviewer_name, q2.reviewed_at
    from public.report_qs_reviews q2
    where q2.report_uuid = r.id
    order by q2.created_at desc
    limit 1
  ) q on true
  left join public.profiles p on p.id = r.user_id
  where r.deleted_at is null
    -- Amending a locked cert marks the original superseded_by the new version.
    -- Showing both puts an identical-looking V1 beside its V2 — a real "sent the
    -- wrong one" hazard. The current version always has superseded_by = null.
    and r.superseded_by is null
    and (
      (coalesce(p_scope, 'all') in ('all', 'mine') and r.user_id = (select uid from me))
      or (
        coalesce(p_scope, 'all') in ('all', 'team')
        and r.user_id in (select m.member_id from members m)
        and (r.status = 'completed' or q.status = 'approved')
      )
    );
$function$;

comment on function public.qs_library_base(text) is
  'ELE-1421 — certificates visible in the caller''s library: their own, plus finished work by active claimed team members when the caller is the company owner or its QS.';

-- ── Paged library ───────────────────────────────────────────────────────────
create or replace function public.get_my_certificate_library(
  p_limit integer default 20,
  p_offset integer default 0,
  p_report_type text default null,
  p_status text default null,
  p_date_from timestamptz default null,
  p_date_to timestamptz default null,
  p_include_auto_drafts boolean default false,
  p_scope text default 'all'
)
returns table (
  id uuid,
  report_id text,
  report_type text,
  certificate_number text,
  client_name text,
  installation_address text,
  inspector_name text,
  inspection_date date,
  status text,
  updated_at timestamptz,
  customer_id uuid,
  edit_version integer,
  pdf_url text,
  pdf_generated_at timestamptz,
  locked_at timestamptz,
  data_inspection_date jsonb,
  data_date_of_inspection jsonb,
  data_satisfactory_for_continued_use jsonb,
  data_system_category jsonb,
  owner_id uuid,
  owner_name text,
  is_team_cert boolean,
  qs_review_status text,
  qs_reviewer_name text,
  qs_reviewed_at timestamptz,
  total_count bigint
)
language sql
stable
security definer
set search_path to 'public'
as $function$
  with visible as (
    select b.*
    from public.qs_library_base(p_scope) b
    join public.reports r on r.id = b.id
    where
      -- 'draft' means manual drafts AND auto-saves: a tab literally named
      -- "Drafts" reading 0 while 12 auto-saved forms exist is how users
      -- conclude their certificates disappeared (ELE-1305).
      (
        case
          when p_status = 'draft' then r.status in ('draft', 'auto-draft')
          when p_status is not null then r.status = p_status
          when p_include_auto_drafts then true
          else r.status <> 'auto-draft'
        end
      )
      and (p_report_type is null or r.report_type = p_report_type)
      and (p_date_from is null or r.updated_at >= p_date_from)
      and (p_date_to is null or r.updated_at <= p_date_to)
  )
  select
    r.id,
    r.report_id,
    r.report_type,
    r.certificate_number,
    r.client_name,
    r.installation_address,
    r.inspector_name,
    r.inspection_date,
    r.status,
    r.updated_at,
    r.customer_id,
    r.edit_version,
    r.pdf_url,
    r.pdf_generated_at,
    r.locked_at,
    r.data -> 'inspectionDate',
    r.data -> 'dateOfInspection',
    r.data -> 'satisfactoryForContinuedUse',
    r.data -> 'systemCategory',
    v.user_id,
    v.owner_name,
    v.is_team_cert,
    v.qs_review_status,
    v.qs_reviewer_name,
    v.qs_reviewed_at,
    count(*) over () as total_count
  from visible v
  join public.reports r on r.id = v.id
  order by r.updated_at desc
  limit greatest(coalesce(p_limit, 20), 1)
  offset greatest(coalesce(p_offset, 0), 0);
$function$;

comment on function public.get_my_certificate_library(integer, integer, text, text, timestamptz, timestamptz, boolean, text) is
  'ELE-1421 — paged certificate library: own certs plus finished team work, with owner attribution and a window total_count.';

-- ── Tab counts across the WHOLE library ─────────────────────────────────────
-- Counts must span every page, or a tab reads "EIC (0)" while page 3 holds
-- twelve of them.
create or replace function public.get_my_certificate_library_counts(
  p_include_auto_drafts boolean default false,
  p_scope text default 'all'
)
returns jsonb
language sql
stable
security definer
set search_path to 'public'
as $function$
  -- Two populations, deliberately. The Everyone/Mine/My team chips must show
  -- stable totals whichever one is active — a "Mine" filter that rewrites the
  -- "Everyone" count to match itself is unreadable — so they count the FULL
  -- visible set. The type and status tabs describe the list actually on screen,
  -- so they count the scoped set. Both derive from one base scan.
  with all_visible as (
    select r.report_type, r.status, b.is_team_cert
    from public.qs_library_base('all') b
    join public.reports r on r.id = b.id
    where p_include_auto_drafts or r.status <> 'auto-draft'
  ),
  scoped as (
    select * from all_visible
    where case coalesce(p_scope, 'all')
      when 'mine' then not is_team_cert
      when 'team' then is_team_cert
      else true
    end
  )
  select jsonb_build_object(
    'total', (select count(*) from all_visible),
    'team', (select count(*) from all_visible where is_team_cert),
    'mine', (select count(*) from all_visible where not is_team_cert),
    -- The status row's "All" tab counts the current scope, not the company.
    'scopedTotal', (select count(*) from scoped),
    'byType', coalesce((
      select jsonb_object_agg(report_type, n)
      from (select report_type, count(*) as n from scoped group by report_type) t
    ), '{}'::jsonb),
    'byStatus', coalesce((
      select jsonb_object_agg(status, n)
      from (select status, count(*) as n from scoped group by status) s
    ), '{}'::jsonb)
  );
$function$;

comment on function public.get_my_certificate_library_counts(boolean, text) is
  'ELE-1421 — whole-library tab counts matching get_my_certificate_library''s visible set.';

revoke all on function public.qs_library_base(text) from public;
revoke all on function public.get_my_certificate_library(integer, integer, text, text, timestamptz, timestamptz, boolean, text) from public;
revoke all on function public.get_my_certificate_library_counts(boolean, text) from public;

grant execute on function public.qs_library_base(text) to authenticated;
grant execute on function public.get_my_certificate_library(integer, integer, text, text, timestamptz, timestamptz, boolean, text) to authenticated;
grant execute on function public.get_my_certificate_library_counts(boolean, text) to authenticated;
