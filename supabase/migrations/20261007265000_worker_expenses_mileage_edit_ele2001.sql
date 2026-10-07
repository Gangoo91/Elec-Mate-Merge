-- ELE-2001 Expenses (worker): mileage at the firm's rate, edit / withdraw a
-- pending claim, receipts the worker can see again.
--
-- 1. company_profiles.mileage_rate_pence — the firm's own flat rate per mile.
--    NULL = the HMRC approved rate (45p a mile for the first 10,000 business
--    miles in a tax year, 25p after). Set only through set_firm_mileage_rate
--    (owner/admin), because company_profiles UPDATE RLS is owner-only.
-- 2. employer_expense_claims gains mileage columns + incurred_on (the day the
--    money was spent / the journey made; submitted_date stays the day it was sent).
-- 3. Worker writes beyond a plain insert go through SECURITY DEFINER functions
--    that check the claim is the caller's own and still Pending:
--      submit_my_mileage_claim, update_my_expense_claim, withdraw_my_expense_claim.
--    Mileage amounts are always worked out on the server (mileage_quote).
-- 4. The worker INSERT policy is tightened: a worker can only insert a Pending
--    claim with no decision fields, no mileage (that goes through the function),
--    and a receipt they uploaded themselves. Before this a worker could insert a
--    claim already marked Approved / Paid.

-- ── 1. Firm mileage rate ─────────────────────────────────────────────────────
alter table public.company_profiles
  add column if not exists mileage_rate_pence numeric(6,2)
    check (mileage_rate_pence is null or (mileage_rate_pence > 0 and mileage_rate_pence <= 100));

comment on column public.company_profiles.mileage_rate_pence is
  'Employer Hub: the firm''s flat mileage rate in pence per mile for worker claims. NULL = HMRC approved rate (45p first 10,000 business miles per tax year, 25p after). Set via set_firm_mileage_rate (owner/admin).';

-- ── 2. Claim columns ─────────────────────────────────────────────────────────
alter table public.employer_expense_claims
  add column if not exists incurred_on date,
  add column if not exists mileage_miles numeric(8,1)
    check (mileage_miles is null or (mileage_miles > 0 and mileage_miles <= 2000)),
  add column if not exists mileage_from text check (mileage_from is null or length(mileage_from) <= 200),
  add column if not exists mileage_to text check (mileage_to is null or length(mileage_to) <= 200),
  add column if not exists mileage_return boolean not null default false,
  add column if not exists mileage_breakdown jsonb;

comment on column public.employer_expense_claims.incurred_on is 'Day the expense was incurred / journey made (submitted_date = day it was sent).';
comment on column public.employer_expense_claims.mileage_miles is 'Mileage claims: total business miles claimed (return journeys already doubled). Amount is worked out on the server by mileage_quote().';
comment on column public.employer_expense_claims.mileage_breakdown is 'Mileage claims: {rate_source: hmrc|firm, bands:[{miles, pence}], ytd_miles_before}. Written by submit/update functions only.';

-- ── 3a. Receipt ownership helper ─────────────────────────────────────────────
-- True when the stored receipt value is empty, or points at an object in the
-- expense-receipts bucket that the CALLER uploaded. Stops a worker attaching
-- someone else's receipt path to their own claim.
create or replace function public._expense_receipt_is_mine(p_url text)
returns boolean
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_path text;
  v_idx int;
begin
  if p_url is null or btrim(p_url) = '' then
    return true;
  end if;
  if auth.uid() is null then
    return false;
  end if;
  v_path := split_part(p_url, '?', 1);
  v_idx := strpos(v_path, '/expense-receipts/');
  if v_idx > 0 then
    v_path := substr(v_path, v_idx + length('/expense-receipts/'));
  elsif v_path ~* '^https?://' then
    return false;
  end if;
  v_path := ltrim(v_path, '/');
  return exists (
    select 1 from storage.objects o
     where o.bucket_id = 'expense-receipts'
       and o.name = v_path
       and o.owner = auth.uid()
  );
end;
$$;
revoke all on function public._expense_receipt_is_mine(text) from public, anon;
grant execute on function public._expense_receipt_is_mine(text) to authenticated;

-- ── 3b. Mileage maths (one place) ────────────────────────────────────────────
-- Internal: amount for p_miles on p_employee's claim, given the firm's rate.
-- HMRC: 45p up to 10,000 miles in the tax year (6 Apr – 5 Apr), 25p after,
-- counting this worker's other non-rejected mileage claims at this firm.
create or replace function public._mileage_amount(
  p_employee uuid,
  p_miles numeric,
  p_on date,
  p_exclude uuid default null
)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_firm uuid;
  v_rate numeric;
  v_on date := coalesce(p_on, current_date);
  v_ty_start date;
  v_ytd numeric := 0;
  v_first numeric;
  v_after numeric;
  v_amount numeric;
begin
  select e.employer_id into v_firm from employer_employees e where e.id = p_employee;
  select cp.mileage_rate_pence into v_rate from company_profiles cp where cp.user_id = v_firm;

  if v_rate is not null then
    v_amount := round(p_miles * v_rate / 100.0, 2);
    return jsonb_build_object(
      'amount', v_amount,
      'rate_source', 'firm',
      'bands', jsonb_build_array(jsonb_build_object('miles', p_miles, 'pence', v_rate)),
      'ytd_miles_before', null
    );
  end if;

  v_ty_start := make_date(
    case when v_on >= make_date(extract(year from v_on)::int, 4, 6)
         then extract(year from v_on)::int else extract(year from v_on)::int - 1 end, 4, 6);

  select coalesce(sum(c.mileage_miles), 0) into v_ytd
    from employer_expense_claims c
   where c.employee_id = p_employee
     and c.mileage_miles is not null
     and lower(c.status) <> 'rejected'
     and (p_exclude is null or c.id <> p_exclude)
     and coalesce(c.incurred_on, c.submitted_date) >= v_ty_start
     and coalesce(c.incurred_on, c.submitted_date) < (v_ty_start + interval '1 year')::date;

  v_first := least(p_miles, greatest(10000 - v_ytd, 0));
  v_after := p_miles - v_first;
  v_amount := round((v_first * 45 + v_after * 25) / 100.0, 2);

  return jsonb_build_object(
    'amount', v_amount,
    'rate_source', 'hmrc',
    'bands', (
      select coalesce(jsonb_agg(b), '[]'::jsonb) from (
        select jsonb_build_object('miles', v_first, 'pence', 45) b where v_first > 0
        union all
        select jsonb_build_object('miles', v_after, 'pence', 25) where v_after > 0
      ) x
    ),
    'ytd_miles_before', v_ytd
  );
end;
$$;
revoke all on function public._mileage_amount(uuid, numeric, date, uuid) from public, anon, authenticated;

-- Worker preview: what a journey of p_miles would pay. Own roster row only.
create or replace function public.mileage_quote(
  p_employee uuid,
  p_miles numeric,
  p_on date default null,
  p_exclude uuid default null
)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception 'not_signed_in' using errcode = '42501';
  end if;
  if p_employee is null or p_employee not in (select public.my_employee_ids()) then
    raise exception 'not_allowed' using errcode = '42501';
  end if;
  if p_miles is null or p_miles <= 0 or p_miles > 2000 then
    raise exception 'miles_out_of_range' using errcode = '22023';
  end if;
  return public._mileage_amount(p_employee, round(p_miles, 1), p_on, p_exclude);
end;
$$;
revoke all on function public.mileage_quote(uuid, numeric, date, uuid) from public, anon;
grant execute on function public.mileage_quote(uuid, numeric, date, uuid) to authenticated;

-- The firm's mileage rate as the worker (or office) needs to show it.
create or replace function public.get_firm_mileage_rate(p_firm uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_rate numeric;
begin
  if auth.uid() is null then
    raise exception 'not_signed_in' using errcode = '42501';
  end if;
  if p_firm is null or not (
       p_firm in (select public.my_employer_scope())
       or exists (select 1 from employer_employees e
                   where e.user_id = auth.uid() and e.employer_id = p_firm
                     and e.status ilike 'active')) then
    raise exception 'not_allowed' using errcode = '42501';
  end if;
  select cp.mileage_rate_pence into v_rate from company_profiles cp where cp.user_id = p_firm;
  return jsonb_build_object('rate_pence', v_rate, 'rate_source', case when v_rate is null then 'hmrc' else 'firm' end);
end;
$$;
revoke all on function public.get_firm_mileage_rate(uuid) from public, anon;
grant execute on function public.get_firm_mileage_rate(uuid) to authenticated;

-- Owner/admin setter. p_pence NULL = back to the HMRC approved rate.
create or replace function public.set_firm_mileage_rate(p_firm uuid, p_pence numeric)
returns numeric
language plpgsql
security definer
set search_path = public
as $$
declare
  v_rows integer;
begin
  if auth.uid() is null then
    raise exception 'not_signed_in' using errcode = '42501';
  end if;
  if p_firm is null or not public.can_see_firm_money(p_firm) then
    raise exception 'not_allowed' using errcode = '42501';
  end if;
  if p_pence is not null and (p_pence <= 0 or p_pence > 100) then
    raise exception 'rate_out_of_range' using errcode = '22023';
  end if;
  update public.company_profiles
     set mileage_rate_pence = round(p_pence, 2), updated_at = now()
   where user_id = p_firm;
  get diagnostics v_rows = row_count;
  if v_rows = 0 then
    raise exception 'no_company_profile' using errcode = 'P0002';
  end if;
  return p_pence;
end;
$$;
revoke all on function public.set_firm_mileage_rate(uuid, numeric) from public, anon;
grant execute on function public.set_firm_mileage_rate(uuid, numeric) to authenticated;

-- ── 3c. Worker writes ────────────────────────────────────────────────────────
create or replace function public._mileage_summary(p_from text, p_to text, p_miles numeric, p_return boolean)
returns text
language sql
immutable
set search_path = public
as $$
  select 'Mileage: ' || coalesce(nullif(btrim(p_from), ''), '?') ||
         case when p_return then ' ⇄ ' else ' → ' end ||
         coalesce(nullif(btrim(p_to), ''), '?') ||
         ' (' || trim(to_char(p_miles, 'FM99990.0')) || ' mi' ||
         case when p_return then ' return' else '' end || ')'
$$;
revoke all on function public._mileage_summary(text, text, numeric, boolean) from public, anon, authenticated;

create or replace function public.submit_my_mileage_claim(
  p_employee uuid,
  p_miles numeric,
  p_from text,
  p_to text,
  p_return boolean default false,
  p_job_id uuid default null,
  p_description text default null,
  p_incurred_on date default null,
  p_receipt_url text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_firm uuid;
  v_on date := coalesce(p_incurred_on, current_date);
  v_miles numeric := round(p_miles, 1);
  v_calc jsonb;
  v_row employer_expense_claims;
begin
  if auth.uid() is null then
    raise exception 'not_signed_in' using errcode = '42501';
  end if;
  if p_employee is null or p_employee not in (select public.my_employee_ids()) then
    raise exception 'not_allowed' using errcode = '42501';
  end if;
  if v_miles is null or v_miles <= 0 or v_miles > 2000 then
    raise exception 'miles_out_of_range' using errcode = '22023';
  end if;
  if v_on > current_date or v_on < current_date - 365 then
    raise exception 'date_out_of_range' using errcode = '22023';
  end if;
  if length(coalesce(p_from, '')) > 200 or length(coalesce(p_to, '')) > 200
     or length(coalesce(p_description, '')) > 500 then
    raise exception 'text_too_long' using errcode = '22023';
  end if;
  select e.employer_id into v_firm from employer_employees e where e.id = p_employee;
  if p_job_id is not null and not exists (
       select 1 from employer_jobs j where j.id = p_job_id and j.user_id = v_firm) then
    raise exception 'job_not_found' using errcode = 'P0002';
  end if;
  if not public._expense_receipt_is_mine(p_receipt_url) then
    raise exception 'receipt_not_yours' using errcode = '42501';
  end if;

  v_calc := public._mileage_amount(p_employee, v_miles, v_on, null);

  insert into employer_expense_claims (
    employee_id, job_id, category, description, amount, receipt_url, status,
    submitted_date, incurred_on, mileage_miles, mileage_from, mileage_to,
    mileage_return, mileage_breakdown)
  values (
    p_employee, p_job_id, 'Mileage',
    coalesce(nullif(btrim(p_description), ''),
             public._mileage_summary(p_from, p_to, v_miles, coalesce(p_return, false))),
    (v_calc->>'amount')::numeric, nullif(btrim(p_receipt_url), ''), 'Pending',
    current_date, v_on, v_miles, nullif(btrim(p_from), ''), nullif(btrim(p_to), ''),
    coalesce(p_return, false), v_calc - 'amount')
  returning * into v_row;

  return to_jsonb(v_row);
end;
$$;
revoke all on function public.submit_my_mileage_claim(uuid, numeric, text, text, boolean, uuid, text, date, text) from public, anon;
grant execute on function public.submit_my_mileage_claim(uuid, numeric, text, text, boolean, uuid, text, date, text) to authenticated;

-- Edit the caller's own Pending claim. Mileage claims stay mileage (amount
-- recomputed); other claims cannot become mileage here. p_receipt_url is the
-- full new value (NULL = no receipt).
create or replace function public.update_my_expense_claim(
  p_claim uuid,
  p_category text default null,
  p_amount numeric default null,
  p_description text default null,
  p_job_id uuid default null,
  p_receipt_url text default null,
  p_incurred_on date default null,
  p_miles numeric default null,
  p_from text default null,
  p_to text default null,
  p_return boolean default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_old employer_expense_claims;
  v_row employer_expense_claims;
  v_firm uuid;
  v_on date;
  v_miles numeric;
  v_calc jsonb;
  v_amount numeric;
  v_category text;
  v_desc text;
  v_return boolean;
begin
  if auth.uid() is null then
    raise exception 'not_signed_in' using errcode = '42501';
  end if;

  select * into v_old from employer_expense_claims where id = p_claim for update;
  -- Someone else's claim reads exactly like a missing one.
  if not found or v_old.employee_id not in (select public.my_employee_ids()) then
    raise exception 'claim_not_found' using errcode = 'P0002';
  end if;
  if lower(v_old.status) <> 'pending' then
    raise exception 'claim_not_pending' using errcode = '42501';
  end if;

  v_on := coalesce(p_incurred_on, v_old.incurred_on, v_old.submitted_date);
  if v_on > current_date or v_on < current_date - 365 then
    raise exception 'date_out_of_range' using errcode = '22023';
  end if;
  if length(coalesce(p_from, '')) > 200 or length(coalesce(p_to, '')) > 200
     or length(coalesce(p_description, '')) > 500 then
    raise exception 'text_too_long' using errcode = '22023';
  end if;

  select e.employer_id into v_firm from employer_employees e where e.id = v_old.employee_id;
  if p_job_id is not null and not exists (
       select 1 from employer_jobs j where j.id = p_job_id and j.user_id = v_firm) then
    raise exception 'job_not_found' using errcode = 'P0002';
  end if;

  if p_receipt_url is distinct from v_old.receipt_url
     and not public._expense_receipt_is_mine(p_receipt_url) then
    raise exception 'receipt_not_yours' using errcode = '42501';
  end if;

  if v_old.mileage_miles is not null then
    v_miles := round(coalesce(p_miles, v_old.mileage_miles), 1);
    if v_miles <= 0 or v_miles > 2000 then
      raise exception 'miles_out_of_range' using errcode = '22023';
    end if;
    v_return := coalesce(p_return, v_old.mileage_return);
    v_calc := public._mileage_amount(v_old.employee_id, v_miles, v_on, v_old.id);
    v_amount := (v_calc->>'amount')::numeric;
    v_category := 'Mileage';
    v_desc := coalesce(nullif(btrim(p_description), ''),
                       public._mileage_summary(coalesce(p_from, v_old.mileage_from),
                                               coalesce(p_to, v_old.mileage_to), v_miles, v_return));
  else
    v_amount := round(coalesce(p_amount, v_old.amount), 2);
    if v_amount <= 0 or v_amount > 10000 then
      raise exception 'amount_out_of_range' using errcode = '22023';
    end if;
    v_category := coalesce(nullif(btrim(p_category), ''), v_old.category);
    if lower(v_category) = 'mileage' then
      raise exception 'use_mileage_claim' using errcode = '22023';
    end if;
    v_desc := coalesce(nullif(btrim(p_description), ''), v_category);
  end if;

  update employer_expense_claims
     set category = v_category,
         amount = v_amount,
         description = v_desc,
         job_id = p_job_id,
         receipt_url = nullif(btrim(p_receipt_url), ''),
         incurred_on = v_on,
         mileage_miles = case when v_old.mileage_miles is not null then v_miles end,
         mileage_from = case when v_old.mileage_miles is not null
                             then nullif(btrim(coalesce(p_from, v_old.mileage_from)), '') end,
         mileage_to = case when v_old.mileage_miles is not null
                           then nullif(btrim(coalesce(p_to, v_old.mileage_to)), '') end,
         mileage_return = coalesce(v_return, false),
         mileage_breakdown = case when v_calc is not null then v_calc - 'amount' end,
         updated_at = now()
   where id = v_old.id
  returning * into v_row;

  -- Keep the office's "Expense claim" bell entry truthful (no second notification).
  update user_notifications n
     set message = coalesce(e.name, 'A team member') || ' claimed £' ||
                   to_char(v_amount, 'FM999,999,990.00') || ' — ' || v_category || ' (edited)'
    from employer_employees e
   where e.id = v_old.employee_id
     and n.metadata->>'expense_id' = v_old.id::text
     and n.metadata->>'source_type' = 'expense_submitted';

  return to_jsonb(v_row);
end;
$$;
revoke all on function public.update_my_expense_claim(uuid, text, numeric, text, uuid, text, date, numeric, text, text, boolean) from public, anon;
grant execute on function public.update_my_expense_claim(uuid, text, numeric, text, uuid, text, date, numeric, text, text, boolean) to authenticated;

-- Withdraw (delete) the caller's own Pending claim. Returns the receipt value
-- so the app can remove the file the worker uploaded.
create or replace function public.withdraw_my_expense_claim(p_claim uuid)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_old employer_expense_claims;
begin
  if auth.uid() is null then
    raise exception 'not_signed_in' using errcode = '42501';
  end if;
  select * into v_old from employer_expense_claims where id = p_claim for update;
  if not found or v_old.employee_id not in (select public.my_employee_ids()) then
    raise exception 'claim_not_found' using errcode = 'P0002';
  end if;
  if lower(v_old.status) <> 'pending' then
    raise exception 'claim_not_pending' using errcode = '42501';
  end if;

  delete from employer_expense_claims where id = v_old.id;

  -- The office's "Expense claim" bell entry would now point at nothing.
  delete from user_notifications n
   where n.metadata->>'expense_id' = v_old.id::text
     and n.metadata->>'source_type' = 'expense_submitted';

  return v_old.receipt_url;
end;
$$;
revoke all on function public.withdraw_my_expense_claim(uuid) from public, anon;
grant execute on function public.withdraw_my_expense_claim(uuid) to authenticated;

-- ── 4. Tighten the worker INSERT policy ──────────────────────────────────────
drop policy if exists "Worker submits own expenses" on public.employer_expense_claims;
create policy "Worker submits own expenses"
  on public.employer_expense_claims
  for insert
  to authenticated
  with check (
    employee_id in (select public.my_employee_ids())
    and lower(status) = 'pending'
    and approved_by is null
    and approved_date is null
    and paid_date is null
    and rejection_reason is null
    and mileage_miles is null
    and mileage_breakdown is null
    and public._expense_receipt_is_mine(receipt_url)
  );

comment on table public.employer_expense_claims is '[EMPLOYER HUB → WORKER TOOLS] Worker expense claims (incl. mileage at the firm''s rate) with receipt, approved/rejected/paid by the firm. Scope: employee_id → employer_employees. Used by: Worker Tools Expenses + My pay, Employer Hub Expenses, accounts P&L. Rule: Receipts live in the PRIVATE bucket expense-receipts (signed URLs only). Workers insert Pending only; edits/withdrawals/mileage go through submit_my_mileage_claim / update_my_expense_claim / withdraw_my_expense_claim (own + Pending only).';
