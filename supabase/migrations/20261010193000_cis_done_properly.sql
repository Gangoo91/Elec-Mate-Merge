-- ELE-2064: CIS done properly.
--
-- Additive only. New tables, new functions, one notification type, one cron job.
-- Nothing HEAD reads is altered.
--
--   employer_cis_checks   per-subbie log: HMRC verifications and the supply-chain
--                         due-diligence checks HMRC asks for since 6 Apr 2026
--   employer_cis_returns  per tax month: CIS300 filed (or nil), HMRC paid
--   record_cis_check()    writes a check; a verification also updates the terms
--   save_cis_return()     marks a month filed / nil / paid
--   get_cis_month()       the monthly CIS300 helper + verification state (money only)
--   notify_cis_deadlines() daily: statements and CIS300 by the 19th (nil if no
--                         payments), HMRC payment by the 22nd. Deduped.
--
-- Rules (gov.uk, checked 10 Oct 2026):
--   tax month 6th to 5th; return by the 19th; nil return if no payments;
--   pay HMRC by the 22nd (19th by post); statement within 14 days of the end
--   of the tax month; no re-verification if the subbie was on a return in the
--   current or last 2 tax years.

-- ── Helpers ─────────────────────────────────────────────────────────────

-- Start year of the UK tax year containing d (6 Apr to 5 Apr).
create or replace function public.uk_tax_year(d date)
returns int
language sql
immutable
set search_path = public
as $$
  select case when d >= make_date(extract(year from d)::int, 4, 6)
              then extract(year from d)::int
              else extract(year from d)::int - 1 end
$$;

-- The CIS tax month (6th to 5th) containing d.
create or replace function public.cis_tax_month(d date, out month_start date, out month_end date)
language sql
immutable
set search_path = public
as $$
  select s, (s + interval '1 month' - interval '1 day')::date
    from (select case when extract(day from d) >= 6
                      then make_date(extract(year from d)::int, extract(month from d)::int, 6)
                      else (make_date(extract(year from d)::int, extract(month from d)::int, 6)
                            - interval '1 month')::date end as s) x
$$;

-- ── Checks log ──────────────────────────────────────────────────────────

create table if not exists public.employer_cis_checks (
  id uuid primary key default gen_random_uuid(),
  employer_id uuid not null,
  roster_id uuid not null references public.employer_employees(id) on delete cascade,
  kind text not null check (kind in (
    'verification', 'gps_review', 'vat_number', 'companies_house', 'insurance',
    'bank_details', 'references', 'other')),
  checked_on date not null default current_date,
  outcome text not null default 'ok' check (outcome in ('ok', 'concern', 'failed')),
  reference text,
  cis_status text check (cis_status is null or cis_status in ('gross', 'standard', 'higher', 'unverified')),
  note text,
  created_by uuid default auth.uid(),
  created_at timestamptz not null default now()
);
create index if not exists employer_cis_checks_roster_idx on public.employer_cis_checks (roster_id, checked_on desc);
create index if not exists employer_cis_checks_firm_idx on public.employer_cis_checks (employer_id);

alter table public.employer_cis_checks enable row level security;
drop policy if exists "Owner and admins manage CIS checks" on public.employer_cis_checks;
create policy "Owner and admins manage CIS checks" on public.employer_cis_checks
  for all to authenticated
  using (public.can_see_firm_money(employer_id))
  with check (public.can_see_firm_money(employer_id));

-- employer_id always comes from the roster row, and it must be a subbie.
create or replace function public.tg_cis_check_firm()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  select e.employer_id into new.employer_id
    from public.employer_employees e
   where e.id = new.roster_id and e.team_role = 'Subcontractor';
  if new.employer_id is null then
    raise exception 'That person is not a subcontractor on a team' using errcode = '23503';
  end if;
  return new;
end;
$$;
revoke all on function public.tg_cis_check_firm() from public, anon, authenticated;

drop trigger if exists trg_cis_checks_firm on public.employer_cis_checks;
create trigger trg_cis_checks_firm
  before insert or update on public.employer_cis_checks
  for each row execute function public.tg_cis_check_firm();

comment on table public.employer_cis_checks is
  '[EMPLOYER HUB] ELE-2064: per-subcontractor CIS log. HMRC verifications (status, verification number, date) and supply-chain due-diligence checks (GPS review, VAT number, Companies House, insurance, bank details) kept as evidence for the 6 Apr 2026 "knew or should have known" rules. Scope: employer_id (from the roster row); owner and admins only (can_see_firm_money). Used by: People > Subcontractors (HMRC checks sheet), get_cis_month. Rule: written by record_cis_check or directly by owner/admin; keep 3 years after the tax year.';

-- ── Monthly return record ──────────────────────────────────────────────

create table if not exists public.employer_cis_returns (
  employer_id uuid not null,
  tax_month_end date not null,
  filed_on date,
  nil_return boolean not null default false,
  submission_reference text,
  paid_on date,
  paid_amount numeric(12,2),
  updated_by uuid default auth.uid(),
  updated_at timestamptz not null default now(),
  primary key (employer_id, tax_month_end),
  check (extract(day from tax_month_end) = 5)
);

alter table public.employer_cis_returns enable row level security;
drop policy if exists "Owner and admins manage CIS returns" on public.employer_cis_returns;
create policy "Owner and admins manage CIS returns" on public.employer_cis_returns
  for all to authenticated
  using (public.can_see_firm_money(employer_id))
  with check (public.can_see_firm_money(employer_id));

comment on table public.employer_cis_returns is
  '[EMPLOYER HUB] ELE-2064: one row per firm per CIS tax month (keyed by the 5th it ends on). Records that the CIS300 (or nil return) was filed and HMRC was paid, so the 19th/22nd reminders stop. Scope: employer_id; owner and admins only. Used by: People > Subcontractors CIS return panel, get_cis_month, notify_cis_deadlines, get_cash_forecast. Rule: written by save_cis_return.';

-- ── Writes ─────────────────────────────────────────────────────────────

create or replace function public.record_cis_check(
  p_roster uuid,
  p_kind text,
  p_checked_on date default null,
  p_outcome text default 'ok',
  p_reference text default null,
  p_cis_status text default null,
  p_note text default null
) returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_firm uuid;
  v_id uuid;
  v_on date := coalesce(p_checked_on, (now() at time zone 'Europe/London')::date);
begin
  select e.employer_id into v_firm
    from employer_employees e
   where e.id = p_roster and e.team_role = 'Subcontractor';
  if v_firm is null then
    raise exception 'not_found' using errcode = 'P0002';
  end if;
  if not public.can_see_firm_money(v_firm) then
    raise exception 'not_allowed' using errcode = '42501';
  end if;
  if p_kind = 'verification' and (p_cis_status is null
       or p_cis_status not in ('gross', 'standard', 'higher', 'unverified')) then
    raise exception 'status_required' using errcode = '22023';
  end if;
  if v_on > (now() at time zone 'Europe/London')::date + 1 then
    raise exception 'date_in_future' using errcode = '22023';
  end if;

  insert into employer_cis_checks (employer_id, roster_id, kind, checked_on, outcome,
                                   reference, cis_status, note)
  values (v_firm, p_roster, p_kind, v_on, coalesce(p_outcome, 'ok'),
          nullif(trim(p_reference), ''), case when p_kind = 'verification' then p_cis_status end,
          nullif(trim(p_note), ''))
  returning id into v_id;

  -- A verification is the record of truth for the rate.
  if p_kind = 'verification' then
    insert into employer_subcontractor_terms (roster_id, employer_id, cis_status,
                                              cis_verification_number, cis_verified_on, updated_by)
    values (p_roster, v_firm, p_cis_status, nullif(trim(p_reference), ''), v_on, auth.uid())
    on conflict (roster_id) do update
      set cis_status = excluded.cis_status,
          cis_verification_number = coalesce(excluded.cis_verification_number,
                                             employer_subcontractor_terms.cis_verification_number),
          cis_verified_on = excluded.cis_verified_on,
          updated_by = auth.uid(),
          updated_at = now();
  end if;
  return v_id;
end;
$$;

create or replace function public.save_cis_return(
  p_firm uuid,
  p_tax_month_end date,
  p_filed_on date default null,
  p_nil_return boolean default false,
  p_submission_reference text default null,
  p_paid_on date default null,
  p_paid_amount numeric default null
) returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.can_see_firm_money(p_firm) then
    raise exception 'not_allowed' using errcode = '42501';
  end if;
  if p_tax_month_end is null or extract(day from p_tax_month_end) <> 5 then
    raise exception 'period_invalid' using errcode = '22023';
  end if;
  insert into employer_cis_returns (employer_id, tax_month_end, filed_on, nil_return,
                                    submission_reference, paid_on, paid_amount, updated_by, updated_at)
  values (p_firm, p_tax_month_end, p_filed_on, coalesce(p_nil_return, false),
          nullif(trim(p_submission_reference), ''), p_paid_on, p_paid_amount, auth.uid(), now())
  on conflict (employer_id, tax_month_end) do update
    set filed_on = excluded.filed_on,
        nil_return = excluded.nil_return,
        submission_reference = excluded.submission_reference,
        paid_on = excluded.paid_on,
        paid_amount = excluded.paid_amount,
        updated_by = auth.uid(),
        updated_at = now();
end;
$$;

-- ── The monthly helper ─────────────────────────────────────────────────

-- Statements count in the tax month their period ends in (the screen issues
-- one statement per subbie per 6th-to-5th month).
create or replace function public.cis_month_core(p_firm uuid, p_start date, p_end date, p_today date)
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  with st as (
    select s.* from employer_subcontractor_statements s
     where s.employer_id = p_firm and s.voided_at is null
       and s.period_end between p_start and p_end
  ), per as (
    select st.roster_id,
           max(st.subcontractor_name) as name,
           max(st.trading_name) as trading_name,
           max(st.utr) as utr,
           max(st.cis_verification_number) as verification_number,
           max(st.cis_status) as cis_status,
           max(st.cis_rate) as cis_rate,
           count(*) as statements,
           sum(st.gross_amount)::numeric(12,2) as payments,
           sum(st.materials_amount)::numeric(12,2) as materials,
           sum(st.cis_deduction)::numeric(12,2) as deducted,
           sum(st.net_payable)::numeric(12,2) as net_paid
      from st group by st.roster_id
  ), unbilled as (
    select e.id as roster_id, coalesce(nullif(e.name, ''), 'Unnamed') as name,
           count(distinct t.date) as days
      from employer_timesheets t
      join employer_employees e on e.id = t.employee_id
     where e.employer_id = p_firm and e.team_role = 'Subcontractor'
       and t.status = 'Approved' and t.subcontractor_statement_id is null
       and t.payroll_export_id is null
       and t.date between p_start and p_end
     group by 1, 2
  ), ret as (
    select r.* from employer_cis_returns r
     where r.employer_id = p_firm and r.tax_month_end = p_end
  )
  select jsonb_build_object(
    'month_start', p_start,
    'month_end', p_end,
    'ended', p_end < p_today,
    'statements_by', p_end + 14,
    'return_by', p_end + 14,
    'pay_by', p_end + 17,
    'rows', coalesce((select jsonb_agg(to_jsonb(per) order by per.name) from per), '[]'::jsonb),
    'unbilled', coalesce((select jsonb_agg(to_jsonb(unbilled) order by unbilled.name) from unbilled), '[]'::jsonb),
    'totals', jsonb_build_object(
      'subcontractors', (select count(*) from per),
      'statements', (select coalesce(sum(statements), 0) from per),
      'payments', (select coalesce(sum(payments), 0) from per),
      'materials', (select coalesce(sum(materials), 0) from per),
      'deducted', (select coalesce(sum(deducted), 0) from per)),
    'nil', not exists (select 1 from per),
    'filing', (select jsonb_build_object('filed_on', ret.filed_on, 'nil_return', ret.nil_return,
                                         'submission_reference', ret.submission_reference,
                                         'paid_on', ret.paid_on, 'paid_amount', ret.paid_amount)
                 from ret)
  )
$$;
revoke all on function public.cis_month_core(uuid, date, date, date) from public, anon, authenticated;

create or replace function public.get_cis_month(p_firm uuid, p_start date, p_end date, p_today date default null)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_today date := coalesce(p_today, (now() at time zone 'Europe/London')::date);
  v_ty int := public.uk_tax_year(v_today);
  v_subs jsonb;
begin
  if p_firm is null or not public.can_see_firm_money(p_firm) then
    raise exception 'not_allowed' using errcode = '42501';
  end if;
  if p_start is null or p_end is null or extract(day from p_start) <> 6
     or p_end <> (p_start + interval '1 month' - interval '1 day')::date then
    raise exception 'period_invalid' using errcode = '22023';
  end if;

  -- Verification state per subbie. HMRC: no need to verify again if they were
  -- on a return in the current or last 2 tax years. We also count a recorded
  -- verification in that window (a subbie verified but not yet paid).
  select coalesce(jsonb_agg(x order by x->>'name'), '[]'::jsonb) into v_subs
    from (
      select jsonb_build_object(
        'roster_id', e.id,
        'name', coalesce(nullif(e.name, ''), 'Unnamed'),
        'cis_status', coalesce(tm.cis_status, 'unverified'),
        'utr', tm.utr,
        'verification_number', tm.cis_verification_number,
        'verified_on', tm.cis_verified_on,
        'last_paid_on', lp.last_paid,
        'checks', coalesce(ck.n, 0),
        'last_check_on', ck.last_on,
        'concerns', coalesce(ck.concerns, 0),
        'state', case
          when greatest(lp.last_paid, tm.cis_verified_on) is null then 'verify_first'
          when public.uk_tax_year(greatest(lp.last_paid, tm.cis_verified_on)) < v_ty - 2 then 'reverify'
          when tm.cis_verified_on is null then 'not_recorded'
          else 'ok' end,
        -- Greatest() skips nulls: the later of the last payment and the last verification.
        'reverify_from', case when greatest(lp.last_paid, tm.cis_verified_on) is not null then
          make_date(public.uk_tax_year(greatest(lp.last_paid, tm.cis_verified_on)) + 3, 4, 6) end
      ) as x
        from employer_employees e
        left join employer_subcontractor_terms tm on tm.roster_id = e.id
        left join lateral (
          select max(s.period_end) as last_paid from employer_subcontractor_statements s
           where s.roster_id = e.id and s.voided_at is null) lp on true
        left join lateral (
          select count(*) as n, max(c.checked_on) as last_on,
                 count(*) filter (where c.outcome <> 'ok') as concerns
            from employer_cis_checks c where c.roster_id = e.id) ck on true
       where e.employer_id = p_firm and e.team_role = 'Subcontractor'
         and lower(coalesce(e.status, '')) <> 'archived'
    ) z;

  return jsonb_build_object(
    'month', public.cis_month_core(p_firm, p_start, p_end, v_today),
    -- The return that is due next: the last tax month that has ended.
    'due_now', (select public.cis_month_core(p_firm, m.month_start, m.month_end, v_today)
                  from public.cis_tax_month((select month_start from public.cis_tax_month(v_today)) - 1) m),
    'subcontractors', v_subs,
    'today', v_today
  );
end;
$$;

-- ── Reminders ──────────────────────────────────────────────────────────

insert into public.notification_types (type, category, push, importance)
values ('employer_cis', 'invoices_quotes', true, 1)
on conflict (type) do nothing;

-- Firms that run CIS: any subcontractor on the roster, or HMRC references saved.
create or replace function public.notify_cis_deadlines(p_today date default null)
returns int
language plpgsql
security definer
set search_path = public
as $$
declare
  v_today date := coalesce(p_today, (now() at time zone 'Europe/London')::date);
  v_m record;
  r record;
  v_core jsonb;
  v_ref text;
  v_sent int := 0;
  v_label text;
  v_route text := '/employer?section=subcontractors&cis=return';
begin
  -- The last tax month that ended (on the 5th).
  select * into v_m from public.cis_tax_month((select month_start from public.cis_tax_month(v_today)) - 1);
  v_label := to_char(v_m.month_start, 'FMDD Mon') || ' to ' || to_char(v_m.month_end, 'FMDD Mon');

  -- Only between the 6th and the 22nd; nothing to say after that.
  if v_today > v_m.month_end + 17 then return 0; end if;

  for r in
    select f.firm from (
      select e.employer_id as firm from employer_employees e
       where e.team_role = 'Subcontractor' and lower(coalesce(e.status, '')) <> 'archived'
      union
      select c.employer_id from employer_cis_settings c
    ) f
  loop
    begin
      v_core := public.cis_month_core(r.firm, v_m.month_start, v_m.month_end, v_today);

      -- 1. Statements: approved days in the month still not on a statement.
      if v_today <= v_m.month_end + 14 and jsonb_array_length(v_core->'unbilled') > 0 then
        v_ref := 'cis:statements:' || v_m.month_end;
        insert into employer_expiry_sent (firm, ref) values (r.firm, v_ref) on conflict do nothing;
        if found then
          perform public.notify_employer_bell(r.firm, 'employer_cis',
            'Subcontractor statements due by ' || to_char(v_m.month_end + 14, 'FMDD Mon'),
            jsonb_array_length(v_core->'unbilled') || ' subcontractor'
              || case when jsonb_array_length(v_core->'unbilled') = 1 then ' has' else 's have' end
              || ' approved days from ' || v_label || ' with no statement yet.',
            jsonb_build_object('route', v_route, 'ref_id', v_ref, 'kind', 'cis_statements',
                               'month_end', v_m.month_end));
          v_sent := v_sent + 1;
        end if;
      end if;

      -- 2. CIS300 by the 19th, from the 12th. Nil return when no payments, but
      --    only for a firm that has shown it is a registered contractor (HMRC
      --    reference saved, or a statement issued before): a subbie on the roster
      --    alone does not prove CIS registration.
      if v_today between v_m.month_end + 7 and v_m.month_end + 14
         and (v_core->'filing'->>'filed_on') is null
         and (not (v_core->>'nil')::boolean
              or exists (select 1 from employer_cis_settings c
                          where c.employer_id = r.firm
                            and nullif(trim(c.employer_tax_reference), '') is not null)
              or exists (select 1 from employer_subcontractor_statements s
                          where s.employer_id = r.firm and s.voided_at is null)) then
        v_ref := 'cis:return:' || v_m.month_end;
        insert into employer_expiry_sent (firm, ref) values (r.firm, v_ref) on conflict do nothing;
        if found then
          perform public.notify_employer_bell(r.firm, 'employer_cis',
            case when (v_core->>'nil')::boolean
                 then 'CIS nil return due ' || to_char(v_m.month_end + 14, 'FMDD Mon')
                 else 'CIS300 return due ' || to_char(v_m.month_end + 14, 'FMDD Mon') end,
            case when (v_core->>'nil')::boolean
                 then 'You paid no subcontractors from ' || v_label
                      || '. File a nil return or tell HMRC you are inactive, or a £100 penalty applies.'
                 else 'Your return for ' || v_label || ' covers '
                      || (v_core->'totals'->>'subcontractors') || ' subcontractor'
                      || case when (v_core->'totals'->>'subcontractors') = '1' then '' else 's' end
                      || '. Late returns cost £100.' end,
            jsonb_build_object('route', v_route, 'ref_id', v_ref, 'kind', 'cis_return',
                               'month_end', v_m.month_end));
          v_sent := v_sent + 1;
        end if;
      end if;

      -- 3. Pay HMRC by the 22nd, from the 19th, when anything was deducted.
      if v_today between v_m.month_end + 14 and v_m.month_end + 17
         and (v_core->'totals'->>'deducted')::numeric > 0
         and (v_core->'filing'->>'paid_on') is null then
        v_ref := 'cis:pay:' || v_m.month_end;
        insert into employer_expiry_sent (firm, ref) values (r.firm, v_ref) on conflict do nothing;
        if found then
          perform public.notify_employer_bell(r.firm, 'employer_cis',
            'Pay CIS to HMRC by ' || to_char(v_m.month_end + 17, 'FMDD Mon'),
            'The deductions from ' || v_label || ' are due to HMRC by the 22nd (the 19th if you pay by post).',
            jsonb_build_object('route', v_route, 'ref_id', v_ref, 'kind', 'cis_pay',
                               'month_end', v_m.month_end));
          v_sent := v_sent + 1;
        end if;
      end if;
    exception when others then
      raise warning '[notify_cis_deadlines] firm %: %', r.firm, sqlerrm;
    end;
  end loop;
  return v_sent;
end;
$$;

-- ── Grants ─────────────────────────────────────────────────────────────

revoke all on function public.record_cis_check(uuid, text, date, text, text, text, text) from public, anon;
grant execute on function public.record_cis_check(uuid, text, date, text, text, text, text) to authenticated;
revoke all on function public.save_cis_return(uuid, date, date, boolean, text, date, numeric) from public, anon;
grant execute on function public.save_cis_return(uuid, date, date, boolean, text, date, numeric) to authenticated;
revoke all on function public.get_cis_month(uuid, date, date, date) from public, anon;
grant execute on function public.get_cis_month(uuid, date, date, date) to authenticated;
revoke all on function public.notify_cis_deadlines(date) from public, anon, authenticated;

grant select, insert, update, delete on public.employer_cis_checks to authenticated;
grant select, insert, update, delete on public.employer_cis_returns to authenticated;

-- Daily at 08:05 London-ish (cron runs UTC).
select cron.unschedule('employer-cis-deadlines')
 where exists (select 1 from cron.job where jobname = 'employer-cis-deadlines');
select cron.schedule('employer-cis-deadlines', '5 8 * * *', 'select public.notify_cis_deadlines();');
