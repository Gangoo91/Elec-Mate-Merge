-- ELE-1830: subcontractors and labour-only sparkies on the roster.
-- A subbie is a roster row with team_role = 'Subcontractor' (the shared role
-- list). This adds what only a subbie has:
--   * employer_subcontractor_details — trade, public liability insurance and
--     expiry. NOT money: office managers see and edit it.
--   * employer_subcontractor_terms   — day/hourly rate, CIS status, UTR, VAT.
--     Money and tax IDs: owner/admin only (can_see_firm_money), plus the subbie
--     reads their own row.
--   * employer_subcontractor_statements — the self-bill statement per period
--     from APPROVED days, with the CIS deduction worked out on labour only
--     (materials excluded). Written only by issue_subcontractor_statement().
--   * employer_cis_settings — the contractor's HMRC references for statements.
-- Subbies are excluded from PAYE payroll runs and from holiday allowance.

-- ── Tables ────────────────────────────────────────────────────────────────
create table if not exists public.employer_subcontractor_details (
  roster_id uuid primary key references public.employer_employees(id) on delete cascade,
  employer_id uuid not null,
  trade text,
  trading_name text,
  insurance_provider text,
  insurance_policy_number text,
  insurance_cover_amount numeric(12,0) check (insurance_cover_amount is null or insurance_cover_amount >= 0),
  insurance_expiry date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
comment on table public.employer_subcontractor_details is
  '[EMPLOYER HUB] A subcontractor''s non-money details on a firm''s roster: trade, trading name, public liability insurance (provider, policy, cover, expiry). Scope: employer_id = the firm (owner profiles.id); managers via my_employer_scope(); the subbie reads their own. Used by: People → Subcontractors, employer_expiry_items (insurance alerts). Rule: one row per roster row with team_role = ''Subcontractor''; money lives in employer_subcontractor_terms (ELE-1830).';

create table if not exists public.employer_subcontractor_terms (
  roster_id uuid primary key references public.employer_employees(id) on delete cascade,
  employer_id uuid not null,
  rate_basis text not null default 'day' check (rate_basis in ('day', 'hour')),
  rate numeric(10,2) check (rate is null or rate >= 0),
  cis_status text not null default 'unverified'
    check (cis_status in ('gross', 'standard', 'higher', 'unverified')),
  cis_verification_number text,
  cis_verified_on date,
  utr text check (utr is null or utr ~ '^[0-9]{10}$'),
  vat_registered boolean not null default false,
  vat_number text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by uuid
);
comment on table public.employer_subcontractor_terms is
  '[EMPLOYER HUB — MONEY] A subcontractor''s pay terms with a firm: day or hourly rate, CIS status (gross 0% / standard 20% / higher 30% / unverified 30%), HMRC verification number, UTR, VAT. Scope: employer_id = the firm; read/write ONLY owner + admins (can_see_firm_money); the subbie reads their own row. Used by: People → Subcontractors, issue_subcontractor_statement. Rule: office managers never see it (ELE-1830).';

create table if not exists public.employer_cis_settings (
  employer_id uuid primary key,
  employer_tax_reference text,
  accounts_office_reference text,
  updated_at timestamptz not null default now(),
  updated_by uuid
);
comment on table public.employer_cis_settings is
  '[EMPLOYER HUB — MONEY] The contractor''s HMRC references printed on CIS payment and deduction statements. Scope: employer_id = the firm; owner + admins only. Used by: subcontractor statements (ELE-1830).';

create table if not exists public.employer_subcontractor_statements (
  id uuid primary key default gen_random_uuid(),
  employer_id uuid not null,
  roster_id uuid not null references public.employer_employees(id) on delete restrict,
  statement_number text not null,
  period_start date not null,
  period_end date not null,
  subcontractor_name text,
  trading_name text,
  trade text,
  utr text,
  cis_verification_number text,
  vat_registered boolean not null default false,
  rate_basis text not null,
  rate numeric(10,2) not null,
  day_count numeric(6,1) not null default 0,
  hours numeric(8,2) not null default 0,
  labour_amount numeric(12,2) not null default 0,
  other_costs numeric(12,2) not null default 0,
  materials_amount numeric(12,2) not null default 0,
  gross_amount numeric(12,2) not null default 0,
  cis_status text not null,
  cis_rate numeric(5,4) not null,
  cis_deduction numeric(12,2) not null default 0,
  net_payable numeric(12,2) not null default 0,
  lines jsonb not null default '[]'::jsonb,
  timesheet_ids uuid[] not null default '{}',
  expense_ids uuid[] not null default '{}',
  issued_by uuid,
  issued_at timestamptz not null default now(),
  voided_at timestamptz,
  voided_by uuid,
  unique (employer_id, statement_number)
);
create index if not exists employer_subcontractor_statements_roster_idx
  on public.employer_subcontractor_statements (roster_id, period_start);
create index if not exists employer_subcontractor_statements_firm_idx
  on public.employer_subcontractor_statements (employer_id, period_start);
comment on table public.employer_subcontractor_statements is
  '[EMPLOYER HUB — MONEY] Self-bill statements for subcontractors: approved days x rate, other costs and materials, CIS deducted on labour + other costs only (materials excluded), net payable. Snapshot at issue. Scope: employer_id = the firm; read by owner + admins and by the subbie (their own); written ONLY by issue_subcontractor_statement / void_subcontractor_statement. Used by: People → Subcontractors, Worker Tools → My pay. Rule: never edit amounts; void and re-issue (ELE-1830).';

alter table public.employer_timesheets
  add column if not exists subcontractor_statement_id uuid
    references public.employer_subcontractor_statements(id) on delete set null;
alter table public.employer_expense_claims
  add column if not exists subcontractor_statement_id uuid
    references public.employer_subcontractor_statements(id) on delete set null;
create index if not exists employer_timesheets_sub_statement_idx
  on public.employer_timesheets (subcontractor_statement_id) where subcontractor_statement_id is not null;
create index if not exists employer_expense_claims_sub_statement_idx
  on public.employer_expense_claims (subcontractor_statement_id) where subcontractor_statement_id is not null;

-- Keep employer_id honest: it is always the roster row's firm.
create or replace function public.tg_subcontractor_row_firm()
returns trigger
language plpgsql
security definer
set search_path = public
as $fn$
begin
  select e.employer_id into new.employer_id
    from public.employer_employees e where e.id = new.roster_id;
  if new.employer_id is null then
    raise exception 'That person is not on a team' using errcode = '23503';
  end if;
  new.updated_at := now();
  if tg_table_name = 'employer_subcontractor_terms' then
    new.updated_by := auth.uid();
    new.utr := nullif(regexp_replace(coalesce(new.utr, ''), '\s', '', 'g'), '');
  end if;
  return new;
end;
$fn$;
revoke all on function public.tg_subcontractor_row_firm() from public, anon, authenticated;

drop trigger if exists trg_subcontractor_details_firm on public.employer_subcontractor_details;
create trigger trg_subcontractor_details_firm
  before insert or update on public.employer_subcontractor_details
  for each row execute function public.tg_subcontractor_row_firm();
drop trigger if exists trg_subcontractor_terms_firm on public.employer_subcontractor_terms;
create trigger trg_subcontractor_terms_firm
  before insert or update on public.employer_subcontractor_terms
  for each row execute function public.tg_subcontractor_row_firm();

-- ── RLS ───────────────────────────────────────────────────────────────────
alter table public.employer_subcontractor_details enable row level security;
alter table public.employer_subcontractor_terms enable row level security;
alter table public.employer_subcontractor_statements enable row level security;
alter table public.employer_cis_settings enable row level security;

revoke all on public.employer_subcontractor_details from anon, public;
revoke all on public.employer_subcontractor_terms from anon, public;
revoke all on public.employer_subcontractor_statements from anon, public;
revoke all on public.employer_cis_settings from anon, public;
grant select, insert, update, delete on public.employer_subcontractor_details to authenticated;
grant select, insert, update, delete on public.employer_subcontractor_terms to authenticated;
grant select on public.employer_subcontractor_statements to authenticated;
grant select, insert, update on public.employer_cis_settings to authenticated;

drop policy if exists "Firm managers manage subcontractor details" on public.employer_subcontractor_details;
create policy "Firm managers manage subcontractor details" on public.employer_subcontractor_details
  for all to authenticated
  using (employer_id in (select public.my_employer_scope()))
  with check (employer_id in (select public.my_employer_scope()));
drop policy if exists "Subcontractor reads own details" on public.employer_subcontractor_details;
create policy "Subcontractor reads own details" on public.employer_subcontractor_details
  for select to authenticated
  using (exists (select 1 from public.employer_employees e
                  where e.id = roster_id and e.user_id = (select auth.uid())));

drop policy if exists "Owner and admins manage subcontractor terms" on public.employer_subcontractor_terms;
create policy "Owner and admins manage subcontractor terms" on public.employer_subcontractor_terms
  for all to authenticated
  using (public.can_see_firm_money(employer_id))
  with check (public.can_see_firm_money(employer_id));
drop policy if exists "Subcontractor reads own terms" on public.employer_subcontractor_terms;
create policy "Subcontractor reads own terms" on public.employer_subcontractor_terms
  for select to authenticated
  using (exists (select 1 from public.employer_employees e
                  where e.id = roster_id and e.user_id = (select auth.uid())));

drop policy if exists "Owner and admins read statements" on public.employer_subcontractor_statements;
create policy "Owner and admins read statements" on public.employer_subcontractor_statements
  for select to authenticated
  using (public.can_see_firm_money(employer_id));
drop policy if exists "Subcontractor reads own statements" on public.employer_subcontractor_statements;
create policy "Subcontractor reads own statements" on public.employer_subcontractor_statements
  for select to authenticated
  using (voided_at is null
         and exists (select 1 from public.employer_employees e
                      where e.id = roster_id and e.user_id = (select auth.uid())));

drop policy if exists "Owner and admins manage CIS settings" on public.employer_cis_settings;
create policy "Owner and admins manage CIS settings" on public.employer_cis_settings
  for all to authenticated
  using (public.can_see_firm_money(employer_id))
  with check (public.can_see_firm_money(employer_id));

-- ── CIS maths (one place) ─────────────────────────────────────────────────
-- Deduction applies to labour + other costs (travel, subsistence…), never to
-- materials. Rounded DOWN to the penny (in the subbie's favour).
create or replace function public.cis_rate_for(p_status text)
returns numeric
language sql
immutable
set search_path = public
as $fn$
  select case p_status when 'gross' then 0.00 when 'standard' then 0.20 else 0.30 end::numeric;
$fn$;
grant execute on function public.cis_rate_for(text) to authenticated;
revoke all on function public.cis_rate_for(text) from anon;

create or replace function public.cis_statement_amounts(
  p_rate_basis text, p_rate numeric, p_days numeric, p_hours numeric,
  p_other numeric, p_materials numeric, p_cis_status text)
returns jsonb
language sql
immutable
set search_path = public
as $fn$
  with a as (
    select round(case when p_rate_basis = 'hour' then coalesce(p_rate, 0) * coalesce(p_hours, 0)
                      else coalesce(p_rate, 0) * coalesce(p_days, 0) end, 2) as labour,
           round(coalesce(p_other, 0), 2) as other,
           round(coalesce(p_materials, 0), 2) as materials,
           public.cis_rate_for(p_cis_status) as rate
  ), b as (
    select a.*, floor((a.labour + a.other) * a.rate * 100) / 100 as deduction from a
  )
  select jsonb_build_object(
    'labour', b.labour, 'other_costs', b.other, 'materials', b.materials,
    'gross', b.labour + b.other + b.materials,
    'cis_rate', b.rate, 'cis_deduction', b.deduction,
    'net_payable', b.labour + b.other + b.materials - b.deduction)
  from b;
$fn$;
grant execute on function public.cis_statement_amounts(text, numeric, numeric, numeric, numeric, numeric, text) to authenticated;
revoke all on function public.cis_statement_amounts(text, numeric, numeric, numeric, numeric, numeric, text) from anon;

-- ── The run: approved days per subbie for a period ───────────────────────
-- Office managers get days; owner/admins also get the money.
create or replace function public.get_subcontractor_run(p_firm uuid, p_start date, p_end date)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $fn$
declare
  v_money boolean;
  v_subs jsonb;
  v_statements jsonb;
  v_settings jsonb;
begin
  if auth.uid() is null then
    raise exception 'not_signed_in' using errcode = '42501';
  end if;
  if p_firm is null or p_firm not in (select public.my_employer_scope()) then
    raise exception 'not_allowed' using errcode = '42501';
  end if;
  if p_start is null or p_end is null or p_end < p_start or p_end - p_start > 62 then
    raise exception 'period_invalid' using errcode = '22023';
  end if;
  v_money := public.can_see_firm_money(p_firm);

  with subs as (
    select e.id, e.name, e.email, e.phone, e.user_id, e.status, e.photo_url
      from employer_employees e
     where e.employer_id = p_firm
       and e.team_role = 'Subcontractor'
       and lower(coalesce(e.status, '')) <> 'archived'
  ), ts as (
    select t.*, j.title as job_title
      from employer_timesheets t
      join subs on subs.id = t.employee_id
      left join employer_jobs j on j.id = t.job_id
     where t.status = 'Approved'
       and t.subcontractor_statement_id is null
       and t.payroll_export_id is null
       and t.date between p_start and p_end
  ), ex as (
    select c.* from employer_expense_claims c join subs on subs.id = c.employee_id
     where c.status = 'Approved'
       and c.subcontractor_statement_id is null
       and c.payroll_export_id is null
       and coalesce(c.incurred_on, c.submitted_date, c.created_at::date) <= p_end
  ), pend as (
    select t.employee_id, count(*) n
      from employer_timesheets t join subs on subs.id = t.employee_id
     where t.status = 'Pending' and t.date between p_start and p_end
     group by 1
  ), billed as (
    select t.employee_id, count(distinct t.date) n
      from employer_timesheets t join subs on subs.id = t.employee_id
     where t.subcontractor_statement_id is not null and t.date between p_start and p_end
     group by 1
  )
  select coalesce(jsonb_agg(row order by row->>'name'), '[]'::jsonb) into v_subs
    from (
      select jsonb_build_object(
        'roster_id', s.id,
        'name', coalesce(nullif(s.name, ''), 'Unnamed'),
        'linked_account', s.user_id is not null,
        'photo_url', s.photo_url,
        'status', s.status,
        'trade', d.trade,
        'trading_name', d.trading_name,
        'insurance_provider', d.insurance_provider,
        'insurance_policy_number', d.insurance_policy_number,
        'insurance_cover_amount', d.insurance_cover_amount,
        'insurance_expiry', d.insurance_expiry,
        'ecs_expiry', (select p.ecs_expiry_date from employer_elec_id_profiles p
                        where p.id = public._elec_id_profile_for_roster(s.id)),
        'elec_id_number', (select p.elec_id_number from employer_elec_id_profiles p
                            where p.id = public._elec_id_profile_for_roster(s.id)),
        'timesheet_ids', coalesce((select jsonb_agg(ts.id order by ts.date) from ts where ts.employee_id = s.id), '[]'::jsonb),
        'days', coalesce((select jsonb_agg(jsonb_build_object('date', x.date, 'hours', x.h, 'jobs', x.jobs) order by x.date)
                            from (select ts.date, sum(coalesce(ts.total_hours, 0)) h,
                                         string_agg(distinct ts.job_title, ', ') jobs
                                    from ts where ts.employee_id = s.id group by ts.date) x), '[]'::jsonb),
        'day_count', (select count(distinct ts.date) from ts where ts.employee_id = s.id),
        'hours', coalesce((select sum(ts.total_hours) from ts where ts.employee_id = s.id), 0),
        'awaiting_count', coalesce((select n from pend where pend.employee_id = s.id), 0),
        'billed_days', coalesce((select n from billed where billed.employee_id = s.id), 0),
        'expense_ids', case when v_money then coalesce((select jsonb_agg(ex.id) from ex where ex.employee_id = s.id), '[]'::jsonb) end,
        'expenses', case when v_money then coalesce((select jsonb_agg(jsonb_build_object(
                          'id', ex.id, 'category', ex.category, 'description', ex.description,
                          'amount', ex.amount, 'materials', lower(coalesce(ex.category, '')) = 'materials',
                          'date', coalesce(ex.incurred_on, ex.submitted_date))
                          order by coalesce(ex.incurred_on, ex.submitted_date)) from ex where ex.employee_id = s.id), '[]'::jsonb) end,
        'terms', case when v_money then (
                   select jsonb_build_object(
                     'rate_basis', tm.rate_basis, 'rate', tm.rate, 'cis_status', tm.cis_status,
                     'cis_verification_number', tm.cis_verification_number,
                     'cis_verified_on', tm.cis_verified_on, 'utr', tm.utr,
                     'vat_registered', tm.vat_registered, 'vat_number', tm.vat_number)
                     from employer_subcontractor_terms tm where tm.roster_id = s.id) end,
        'amounts', case when v_money then (
                   select public.cis_statement_amounts(
                            coalesce(tm.rate_basis, 'day'), tm.rate,
                            (select count(distinct ts.date) from ts where ts.employee_id = s.id),
                            (select coalesce(sum(ts.total_hours), 0) from ts where ts.employee_id = s.id),
                            (select coalesce(sum(ex.amount), 0) from ex where ex.employee_id = s.id
                               and lower(coalesce(ex.category, '')) <> 'materials'),
                            (select coalesce(sum(ex.amount), 0) from ex where ex.employee_id = s.id
                               and lower(coalesce(ex.category, '')) = 'materials'),
                            coalesce(tm.cis_status, 'unverified'))
                     from (select 1) one
                     left join employer_subcontractor_terms tm on tm.roster_id = s.id) end
      ) as row
      from subs s
      left join employer_subcontractor_details d on d.roster_id = s.id
    ) z;

  select coalesce(jsonb_agg(
           case when v_money then jsonb_build_object(
             'id', st.id, 'roster_id', st.roster_id, 'statement_number', st.statement_number,
             'name', st.subcontractor_name, 'period_start', st.period_start, 'period_end', st.period_end,
             'day_count', st.day_count, 'hours', st.hours, 'issued_at', st.issued_at,
             'voided_at', st.voided_at, 'rate_basis', st.rate_basis, 'rate', st.rate,
             'labour_amount', st.labour_amount, 'other_costs', st.other_costs,
             'materials_amount', st.materials_amount, 'gross_amount', st.gross_amount,
             'cis_status', st.cis_status, 'cis_rate', st.cis_rate, 'cis_deduction', st.cis_deduction,
             'net_payable', st.net_payable, 'utr', st.utr, 'trade', st.trade,
             'trading_name', st.trading_name, 'vat_registered', st.vat_registered,
             'cis_verification_number', st.cis_verification_number, 'lines', st.lines,
             'can_void', st.voided_at is null and st.issued_at > now() - interval '48 hours')
           else jsonb_build_object(
             'id', st.id, 'roster_id', st.roster_id, 'statement_number', st.statement_number,
             'name', st.subcontractor_name, 'period_start', st.period_start, 'period_end', st.period_end,
             'day_count', st.day_count, 'hours', st.hours, 'issued_at', st.issued_at,
             'voided_at', st.voided_at)
           end
           order by st.issued_at desc), '[]'::jsonb)
    into v_statements
    from employer_subcontractor_statements st
   where st.employer_id = p_firm
     and st.period_start <= p_end and st.period_end >= p_start;

  if v_money then
    select jsonb_build_object('employer_tax_reference', c.employer_tax_reference,
                              'accounts_office_reference', c.accounts_office_reference)
      into v_settings from employer_cis_settings c where c.employer_id = p_firm;
  end if;

  return jsonb_build_object(
    'period_start', p_start, 'period_end', p_end,
    'money_visible', v_money,
    'subcontractors', v_subs,
    'statements', v_statements,
    'cis_settings', v_settings,
    'company_name', (select coalesce(cp.company_name, p.full_name) from profiles p
                       left join company_profiles cp on cp.user_id = p.id where p.id = p_firm));
end;
$fn$;
revoke all on function public.get_subcontractor_run(uuid, date, date) from public, anon;
grant execute on function public.get_subcontractor_run(uuid, date, date) to authenticated;

-- ── Issue a self-bill statement (owner/admin) ─────────────────────────────
create or replace function public.issue_subcontractor_statement(
  p_firm uuid, p_roster uuid, p_start date, p_end date,
  p_timesheet_ids uuid[], p_expense_ids uuid[])
returns jsonb
language plpgsql
security definer
set search_path = public
as $fn$
declare
  v_roster employer_employees;
  v_terms employer_subcontractor_terms;
  v_details employer_subcontractor_details;
  v_ts uuid[] := coalesce(p_timesheet_ids, '{}');
  v_ex uuid[] := coalesce(p_expense_ids, '{}');
  v_ok_ts uuid[];
  v_ok_ex uuid[];
  v_days numeric;
  v_hours numeric;
  v_other numeric;
  v_materials numeric;
  v_amounts jsonb;
  v_lines jsonb;
  v_num int;
  v_number text;
  v_id uuid;
  v_prior uuid;
  v_company text;
begin
  if auth.uid() is null then
    raise exception 'not_signed_in' using errcode = '42501';
  end if;
  if p_firm is null or not public.can_see_firm_money(p_firm) then
    raise exception 'not_allowed' using errcode = '42501';
  end if;
  if p_start is null or p_end is null or p_end < p_start or p_end - p_start > 62 then
    raise exception 'period_invalid' using errcode = '22023';
  end if;
  select * into v_roster from employer_employees
   where id = p_roster and employer_id = p_firm and team_role = 'Subcontractor';
  if v_roster.id is null then
    raise exception 'not_a_subcontractor' using errcode = '22023';
  end if;
  select * into v_terms from employer_subcontractor_terms where roster_id = p_roster;
  if v_terms.roster_id is null or coalesce(v_terms.rate, 0) <= 0 then
    raise exception 'rate_missing' using errcode = '22023';
  end if;
  if cardinality(v_ts) + cardinality(v_ex) = 0 then
    raise exception 'nothing_to_bill' using errcode = '22023';
  end if;

  -- Replay: the same rows already on one statement → return it.
  select distinct t.subcontractor_statement_id into v_prior
    from employer_timesheets t where t.id = any(v_ts) and t.subcontractor_statement_id is not null limit 1;
  if v_prior is not null
     and not exists (select 1 from employer_timesheets t where t.id = any(v_ts)
                      and t.subcontractor_statement_id is distinct from v_prior)
     and not exists (select 1 from employer_expense_claims c where c.id = any(v_ex)
                      and c.subcontractor_statement_id is distinct from v_prior) then
    return jsonb_build_object('statement_id', v_prior, 'replayed', true);
  end if;

  select coalesce(array_agg(t.id), '{}') into v_ok_ts
    from (select t.id from employer_timesheets t
           where t.id = any(v_ts) and t.employee_id = p_roster and t.status = 'Approved'
             and t.subcontractor_statement_id is null and t.payroll_export_id is null
             and t.date between p_start and p_end
           for update of t) t;
  select coalesce(array_agg(c.id), '{}') into v_ok_ex
    from (select c.id from employer_expense_claims c
           where c.id = any(v_ex) and c.employee_id = p_roster and c.status = 'Approved'
             and c.subcontractor_statement_id is null and c.payroll_export_id is null
             and coalesce(c.incurred_on, c.submitted_date, c.created_at::date) <= p_end
           for update of c) c;
  if cardinality(v_ok_ts) <> cardinality(array(select distinct unnest(v_ts)))
     or cardinality(v_ok_ex) <> cardinality(array(select distinct unnest(v_ex))) then
    raise exception 'run_changed' using errcode = '40001';
  end if;

  select count(distinct t.date), coalesce(sum(t.total_hours), 0) into v_days, v_hours
    from employer_timesheets t where t.id = any(v_ok_ts);
  select coalesce(sum(c.amount) filter (where lower(coalesce(c.category, '')) <> 'materials'), 0),
         coalesce(sum(c.amount) filter (where lower(coalesce(c.category, '')) = 'materials'), 0)
    into v_other, v_materials
    from employer_expense_claims c where c.id = any(v_ok_ex);
  v_amounts := public.cis_statement_amounts(v_terms.rate_basis, v_terms.rate, v_days, v_hours,
                                            v_other, v_materials, v_terms.cis_status);

  select coalesce(jsonb_agg(l order by l->>'date', l->>'kind'), '[]'::jsonb) into v_lines
    from (
      select jsonb_build_object('kind', 'day', 'date', d.date, 'hours', d.h, 'jobs', d.jobs) l
        from (select t.date, sum(coalesce(t.total_hours, 0)) h, string_agg(distinct j.title, ', ') jobs
                from employer_timesheets t left join employer_jobs j on j.id = t.job_id
               where t.id = any(v_ok_ts) group by t.date) d
      union all
      select jsonb_build_object('kind', case when lower(coalesce(c.category, '')) = 'materials' then 'materials' else 'other' end,
                                'date', coalesce(c.incurred_on, c.submitted_date),
                                'description', coalesce(nullif(c.description, ''), c.category),
                                'amount', c.amount)
        from employer_expense_claims c where c.id = any(v_ok_ex)
    ) x;

  -- Statement number from the firm's own counter (document_number_counters).
  loop
    insert into document_number_counters as c (user_id, doc_type, last_number, prefix, pad_width)
    values (p_firm, 'self_bill', 1, 'SB-', 4)
    on conflict (user_id, doc_type)
    do update set last_number = c.last_number + 1, updated_at = now()
    returning last_number into v_num;
    select coalesce(c.prefix, 'SB-') || lpad(v_num::text, greatest(coalesce(c.pad_width, 4), 1), '0')
      into v_number from document_number_counters c where c.user_id = p_firm and c.doc_type = 'self_bill';
    exit when not exists (select 1 from employer_subcontractor_statements s
                           where s.employer_id = p_firm and s.statement_number = v_number);
  end loop;

  select * into v_details from employer_subcontractor_details where roster_id = p_roster;

  insert into employer_subcontractor_statements (
    employer_id, roster_id, statement_number, period_start, period_end,
    subcontractor_name, trading_name, trade, utr, cis_verification_number, vat_registered,
    rate_basis, rate, day_count, hours,
    labour_amount, other_costs, materials_amount, gross_amount,
    cis_status, cis_rate, cis_deduction, net_payable,
    lines, timesheet_ids, expense_ids, issued_by)
  values (
    p_firm, p_roster, v_number, p_start, p_end,
    v_roster.name, v_details.trading_name, v_details.trade, v_terms.utr,
    v_terms.cis_verification_number, v_terms.vat_registered,
    v_terms.rate_basis, v_terms.rate, v_days, v_hours,
    (v_amounts->>'labour')::numeric, (v_amounts->>'other_costs')::numeric,
    (v_amounts->>'materials')::numeric, (v_amounts->>'gross')::numeric,
    v_terms.cis_status, (v_amounts->>'cis_rate')::numeric,
    (v_amounts->>'cis_deduction')::numeric, (v_amounts->>'net_payable')::numeric,
    v_lines, v_ok_ts, v_ok_ex, auth.uid())
  returning id into v_id;

  update employer_timesheets set subcontractor_statement_id = v_id where id = any(v_ok_ts);
  update employer_expense_claims set subcontractor_statement_id = v_id where id = any(v_ok_ex);

  select coalesce(cp.company_name, p.full_name, 'Your contractor') into v_company
    from profiles p left join company_profiles cp on cp.user_id = p.id where p.id = p_firm;

  if v_roster.user_id is not null then
    perform public.worker_notify(
      v_roster.user_id,
      'subcontractor_statement',
      'Statement ' || v_number || ' from ' || v_company,
      trim(to_char(v_days, 'FM9990.0')) || case when v_days = 1 then ' day, ' else ' days, ' end
        || to_char(p_start, 'FMDD Mon') || ' to ' || to_char(p_end, 'FMDD Mon YYYY')
        || '. £' || to_char((v_amounts->>'net_payable')::numeric, 'FM999,999,990.00') || ' after CIS.',
      jsonb_build_object('route', '/electrician/worker-tools/pay?statement=' || v_id,
                         'statement_id', v_id, 'employee_id', p_roster));
  end if;

  return jsonb_build_object('statement_id', v_id, 'replayed', false,
                            'statement_number', v_number) || v_amounts;
end;
$fn$;
revoke all on function public.issue_subcontractor_statement(uuid, uuid, date, date, uuid[], uuid[]) from public, anon;
grant execute on function public.issue_subcontractor_statement(uuid, uuid, date, date, uuid[], uuid[]) to authenticated;

-- ── Void (owner/admin, within 48 hours): the days go back to unbilled ─────
create or replace function public.void_subcontractor_statement(p_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $fn$
declare
  v employer_subcontractor_statements;
begin
  select * into v from employer_subcontractor_statements where id = p_id for update;
  if v.id is null or not public.can_see_firm_money(v.employer_id) then
    raise exception 'not_allowed' using errcode = '42501';
  end if;
  if v.voided_at is not null then
    return;
  end if;
  if v.issued_at < now() - interval '48 hours' then
    raise exception 'too_late' using errcode = '22023';
  end if;
  update employer_subcontractor_statements set voided_at = now(), voided_by = auth.uid() where id = p_id;
  update employer_timesheets set subcontractor_statement_id = null where subcontractor_statement_id = p_id;
  update employer_expense_claims set subcontractor_statement_id = null where subcontractor_statement_id = p_id;
end;
$fn$;
revoke all on function public.void_subcontractor_statement(uuid) from public, anon;
grant execute on function public.void_subcontractor_statement(uuid) to authenticated;

-- ── The subbie's side: their days and statements, per firm ───────────────
create or replace function public.get_my_subcontractor_summary()
returns jsonb
language sql
stable
security definer
set search_path = public
as $fn$
  select coalesce(jsonb_agg(jsonb_build_object(
    'roster_id', e.id,
    'employer_id', e.employer_id,
    'company_name', coalesce(cp.company_name, p.full_name, 'Your contractor'),
    'month_days', (select count(distinct t.date) from employer_timesheets t
                    where t.employee_id = e.id and t.status = 'Approved'
                      and t.date >= date_trunc('month', current_date)::date),
    'month_unbilled_days', (select count(distinct t.date) from employer_timesheets t
                    where t.employee_id = e.id and t.status = 'Approved'
                      and t.subcontractor_statement_id is null
                      and t.date >= date_trunc('month', current_date)::date),
    'awaiting_days', (select count(*) from employer_timesheets t
                    where t.employee_id = e.id and t.status = 'Pending'),
    'statements', coalesce((select jsonb_agg(jsonb_build_object(
        'id', s.id, 'statement_number', s.statement_number,
        'period_start', s.period_start, 'period_end', s.period_end,
        'day_count', s.day_count, 'hours', s.hours, 'rate_basis', s.rate_basis, 'rate', s.rate,
        'labour_amount', s.labour_amount, 'other_costs', s.other_costs,
        'materials_amount', s.materials_amount, 'gross_amount', s.gross_amount,
        'cis_status', s.cis_status, 'cis_rate', s.cis_rate, 'cis_deduction', s.cis_deduction,
        'net_payable', s.net_payable, 'utr', s.utr, 'lines', s.lines, 'issued_at', s.issued_at)
        order by s.period_start desc)
      from employer_subcontractor_statements s
     where s.roster_id = e.id and s.voided_at is null), '[]'::jsonb)
  ) order by e.created_at), '[]'::jsonb)
  from employer_employees e
  left join profiles p on p.id = e.employer_id
  left join company_profiles cp on cp.user_id = e.employer_id
  where e.user_id = auth.uid()
    and e.employer_id is not null
    and e.team_role = 'Subcontractor'
    and lower(coalesce(e.status, '')) <> 'archived';
$fn$;
revoke all on function public.get_my_subcontractor_summary() from public, anon;
grant execute on function public.get_my_subcontractor_summary() to authenticated;

-- ── No holiday for subbies ───────────────────────────────────────────────
create or replace function public.tg_no_holiday_for_subcontractors()
returns trigger
language plpgsql
security definer
set search_path = public
as $fn$
begin
  if exists (select 1 from employer_employees e
              where e.id = new.employee_id and e.team_role = 'Subcontractor') then
    raise exception 'Subcontractors don''t have a holiday allowance or book leave with the firm. Tell the office which days you''re not available.'
      using errcode = '22023';
  end if;
  return new;
end;
$fn$;
revoke all on function public.tg_no_holiday_for_subcontractors() from public, anon, authenticated;

drop trigger if exists trg_no_holiday_for_subcontractors on public.employee_holiday_allowances;
create trigger trg_no_holiday_for_subcontractors
  before insert on public.employee_holiday_allowances
  for each row execute function public.tg_no_holiday_for_subcontractors();
drop trigger if exists trg_no_leave_for_subcontractors on public.employer_leave_requests;
create trigger trg_no_leave_for_subcontractors
  before insert on public.employer_leave_requests
  for each row execute function public.tg_no_holiday_for_subcontractors();

-- ── Insurance expiry joins the firm's daily expiry alerts ────────────────
do $do$
declare
  v_def text := pg_get_functiondef('public.employer_expiry_items()'::regprocedure);
  v_new text := $n$
  union all
  select d.employer_id, 'subcontractor_insurance', d.roster_id, 'insurance_expiry',
         'Insurance', d.insurance_expiry,
         coalesce(nullif(trim(r.name), ''), 'Subcontractor'),
         '/employer?section=subcontractors&member=' || r.id
    from public.employer_subcontractor_details d
    join public.employer_employees r on r.id = d.roster_id
   where d.insurance_expiry is not null
     and r.team_role = 'Subcontractor'
     and lower(coalesce(r.status, '')) <> 'archived'
$function$$n$;
begin
  if position('subcontractor_insurance' in v_def) > 0 then
    return;
  end if;
  if v_def !~ E'\\n\\$function\\$\\s*$' then
    raise exception 'employer_expiry_items: closing anchor not found';
  end if;
  execute regexp_replace(v_def, E'\\n\\$function\\$\\s*$', v_new);
end
$do$;

-- ── PAYE payroll run excludes subbies (they get a self-bill statement) ───
do $do$
declare
  v_def text := pg_get_functiondef('public.get_payroll_run(uuid, date, date, uuid)'::regprocedure);
  v_old text := $o$      from employer_employees e
     where e.employer_id = p_firm
  ), ts as ($o$;
  v_new text := $o$      from employer_employees e
     where e.employer_id = p_firm
       and coalesce(e.team_role, '') <> 'Subcontractor'
  ), ts as ($o$;
begin
  if position($o$<> 'Subcontractor'$o$ in v_def) > 0 then
    return;
  end if;
  if position(v_old in v_def) = 0 then
    raise exception 'get_payroll_run: emp anchor not found — re-read the live definition';
  end if;
  execute replace(v_def, v_old, v_new);
end
$do$;

do $do$
declare
  v_def text := pg_get_functiondef('public.send_payroll_run(uuid, date, date, text, uuid[], uuid[])'::regprocedure);
  v_old_ts text := $o$    from (select t.id from employer_timesheets t
            join employer_employees e on e.id = t.employee_id and e.employer_id = p_firm
           where t.id = any(v_ts)$o$;
  v_new_ts text := $o$    from (select t.id from employer_timesheets t
            join employer_employees e on e.id = t.employee_id and e.employer_id = p_firm
                                     and coalesce(e.team_role, '') <> 'Subcontractor'
           where t.id = any(v_ts)$o$;
  v_old_ex text := $o$    from (select c.id from employer_expense_claims c
            join employer_employees e on e.id = c.employee_id and e.employer_id = p_firm
           where c.id = any(v_ex)$o$;
  v_new_ex text := $o$    from (select c.id from employer_expense_claims c
            join employer_employees e on e.id = c.employee_id and e.employer_id = p_firm
                                     and coalesce(e.team_role, '') <> 'Subcontractor'
           where c.id = any(v_ex)$o$;
begin
  if position($o$<> 'Subcontractor'$o$ in v_def) > 0 then
    return;
  end if;
  if position(v_old_ts in v_def) = 0 or position(v_old_ex in v_def) = 0 then
    raise exception 'send_payroll_run: row-check anchors not found — re-read the live definition';
  end if;
  execute replace(replace(v_def, v_old_ts, v_new_ts), v_old_ex, v_new_ex);
end
$do$;
