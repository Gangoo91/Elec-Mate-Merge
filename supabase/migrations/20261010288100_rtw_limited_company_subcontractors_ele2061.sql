-- ELE-2061 follow-up (gap analysis 3C #32): limited-company subcontractors
-- are "Not required (limited company)" automatically, with an override.
--
-- Law (checked 10 Oct 2026):
--   * Border Security, Asylum and Immigration Act 2025 s.48 (in force 1 Oct
--     2026, SI 2026/683 reg 2) brings in "an individual sub-contractor": "an
--     individual who has entered into a contract with a person to provide work
--     or services, in circumstances where that other person has entered into a
--     contract with a third party ... but the individual has not". The
--     contract has to be with the individual.
--       https://www.legislation.gov.uk/ukpga/2025/31/section/48
--   * Home Office employer's guide (1 Oct 2026), Example 6, personal service
--     company: "A right to work check is not required by the client company.
--     The client company is contracting directly with the personal service
--     company ... rather than engaging the individual directly".
--     Section 3 (extended liability, IANA 2006 s.15A): where a firm is under
--     contract to a customer and subcontracts to another business that
--     supplies the workers, the firm may still be liable unless, before the
--     work starts, its contract requires that business to check its own
--     people (plus the other prescribed terms), Example 7 (construction).
--       https://www.gov.uk/government/publications/right-to-work-checks-employers-guide
--   * Individual subcontractors engaged before 1 Oct 2026 stay "not required"
--     (civil penalty only where the engagement began on or after that date).
--
-- How a company is known:
--   employer_subcontractor_details.rtw_engaged_as = 'company' | 'individual',
--   set by the owner or an admin. Null = read from the trading name or the
--   roster name ending Ltd, Limited, LLP, PLC, Cyf or Cyfyngedig. A recorded
--   check always wins over either.
--
-- Additive: three nullable columns, two new functions, _rtw_status replaced
-- with the same signature (one new branch before "missing"). No firm has a
-- limited-company subcontractor on the roster today, so nobody's status moves.

alter table public.employer_subcontractor_details
  add column if not exists rtw_engaged_as text
    check (rtw_engaged_as is null or rtw_engaged_as in ('company', 'individual')),
  add column if not exists rtw_engaged_as_set_at timestamptz,
  add column if not exists rtw_engaged_as_set_by uuid;
comment on column public.employer_subcontractor_details.rtw_engaged_as is
  'Right to work: how the firm engages this subcontractor. company = through their limited company or LLP (no right-to-work check by the firm; Home Office guide Example 6), individual = the person themselves (check needed if engaged from 1 Oct 2026). Null = read from the trading name (ELE-2061).';

-- Ends in a company suffix (England and Wales, Scotland, Northern Ireland, and
-- the Welsh forms).
create or replace function public._rtw_company_name(p_name text)
returns boolean
language sql
immutable
set search_path = public
as $fn$
  select coalesce(btrim(p_name), '') ~* '(^|[^a-z])(ltd|limited|llp|plc|cyf|cyfyngedig)\.?$';
$fn$;
revoke all on function public._rtw_company_name(text) from public, anon;
grant execute on function public._rtw_company_name(text) to authenticated;

create or replace function public._rtw_status(p_firm uuid)
returns table (
  roster_id uuid, name text, team_role text, status text, reason text,
  checked_on date, check_type text, follow_up_due date, submitted_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $fn$
  with latest as (
    select distinct on (c.roster_id) c.*,
           least(c.follow_up_due, c.permission_expires_on) as due_on
      from public.employer_rtw_checks c
     where c.employer_id = p_firm and c.roster_id is not null
     order by c.roster_id, c.checked_on desc, c.created_at desc
  ), sub as (
    select distinct on (s.roster_id) s.roster_id, s.submitted_at
      from public.employer_rtw_submissions s
     where s.employer_id = p_firm and s.status = 'submitted' and s.roster_id is not null
     order by s.roster_id, s.submitted_at desc
  ), co as (
    select r.id,
           r.team_role = 'Subcontractor'
             and coalesce(d.rtw_engaged_as,
                          case when public._rtw_company_name(d.trading_name)
                                 or public._rtw_company_name(r.name) then 'company' end) = 'company'
             as is_company
      from public.employer_employees r
      left join public.employer_subcontractor_details d on d.roster_id = r.id
     where r.employer_id = p_firm
  )
  select r.id, r.name, r.team_role,
         case
           when l.id is null and co.is_company then 'not_required'
           when l.id is null and r.team_role = 'Subcontractor' and r.join_date < date '2026-10-01'
             then 'not_required'
           when l.id is null then 'missing'
           when l.check_type = 'not_required' then 'not_required'
           when l.due_on is not null and l.due_on < current_date then 'overdue'
           when l.due_on is not null and l.due_on <= current_date + 28 then 'due'
           else 'checked'
         end,
         case
           when l.id is null and co.is_company then 'Limited company'
           when l.id is null and r.team_role = 'Subcontractor' and r.join_date < date '2026-10-01'
             then 'Engaged before 1 Oct 2026'
           when l.check_type = 'not_required' then l.not_required_reason
         end,
         l.checked_on, l.check_type, l.due_on, sub.submitted_at
    from public.employer_employees r
    left join latest l on l.roster_id = r.id
    left join sub on sub.roster_id = r.id
    left join co on co.id = r.id
   where r.employer_id = p_firm
     and lower(coalesce(r.status, '')) <> 'archived';
$fn$;
revoke all on function public._rtw_status(uuid) from public, anon, authenticated;

-- How the firm engages a subcontractor, for the right-to-work card.
-- source: 'set' (someone chose), 'name' (read from the name) or null.
create or replace function public.rtw_engagement(p_roster_id uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $fn$
declare
  r record;
begin
  select e.id, e.employer_id, e.name, e.team_role, d.trading_name, d.rtw_engaged_as,
         d.rtw_engaged_as_set_at
    into r
    from public.employer_employees e
    left join public.employer_subcontractor_details d on d.roster_id = e.id
   where e.id = p_roster_id;
  if r.id is null or r.employer_id not in (select public.my_employer_scope()) then
    return null;
  end if;
  if r.team_role is distinct from 'Subcontractor' then
    return jsonb_build_object('engaged_as', 'individual', 'source', null);
  end if;
  if r.rtw_engaged_as is not null then
    return jsonb_build_object('engaged_as', r.rtw_engaged_as, 'source', 'set',
                              'set_at', r.rtw_engaged_as_set_at);
  end if;
  if public._rtw_company_name(r.trading_name) or public._rtw_company_name(r.name) then
    return jsonb_build_object('engaged_as', 'company', 'source', 'name',
      'from', case when public._rtw_company_name(r.trading_name) then r.trading_name else r.name end);
  end if;
  return jsonb_build_object('engaged_as', 'individual', 'source', null);
end;
$fn$;
revoke all on function public.rtw_engagement(uuid) from public, anon;
grant execute on function public.rtw_engagement(uuid) to authenticated;

-- Owner and admins set it (they own the right-to-work record). Null goes back
-- to reading the name.
create or replace function public.rtw_set_engagement(p_roster_id uuid, p_engaged_as text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $fn$
declare
  r record;
begin
  select e.id, e.employer_id, e.team_role into r
    from public.employer_employees e where e.id = p_roster_id;
  if r.id is null or not public.can_see_firm_money(r.employer_id) then
    raise exception 'not_allowed' using errcode = '42501';
  end if;
  if r.team_role is distinct from 'Subcontractor' then
    raise exception 'not_a_subcontractor' using errcode = '22023';
  end if;
  if p_engaged_as is not null and p_engaged_as not in ('company', 'individual') then
    raise exception 'invalid' using errcode = '22023';
  end if;
  insert into public.employer_subcontractor_details
    (roster_id, employer_id, rtw_engaged_as, rtw_engaged_as_set_at, rtw_engaged_as_set_by)
  values (r.id, r.employer_id, p_engaged_as, now(), auth.uid())
  on conflict (roster_id) do update
     set rtw_engaged_as = excluded.rtw_engaged_as,
         rtw_engaged_as_set_at = now(),
         rtw_engaged_as_set_by = auth.uid(),
         updated_at = now();
  return jsonb_build_object('success', true);
end;
$fn$;
revoke all on function public.rtw_set_engagement(uuid, text) from public, anon;
grant execute on function public.rtw_set_engagement(uuid, text) to authenticated;
