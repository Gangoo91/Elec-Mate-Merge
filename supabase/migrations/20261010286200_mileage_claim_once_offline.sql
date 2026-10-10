-- Gap #3 / journey break #21 (07 Gap analysis §3B): mileage claims made with
-- no signal go through the worker outbox. The outbox resends after a lost
-- answer, so the claim needs the phone's id: submit_my_mileage_claim_once is
-- submit_my_mileage_claim with p_id as the row id. A resend of the same id
-- returns the first row and inserts nothing.
--
-- Additive: a new function. submit_my_mileage_claim (called by HEAD) is not
-- touched; the checks below are the same, in the same order.

create or replace function public.submit_my_mileage_claim_once(
  p_id uuid, p_employee uuid, p_miles numeric, p_from text, p_to text, p_return boolean default false,
  p_job_id uuid default null, p_description text default null, p_incurred_on date default null,
  p_receipt_url text default null)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
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
  if p_id is null then
    raise exception 'missing_id' using errcode = '22023';
  end if;
  if p_employee is null or p_employee not in (select public.my_employee_ids()) then
    raise exception 'not_allowed' using errcode = '42501';
  end if;
  -- Already landed (a resend after a lost answer): the first row, nothing new.
  select * into v_row from employer_expense_claims where id = p_id;
  if found then
    if v_row.employee_id is distinct from p_employee then
      raise exception 'not_allowed' using errcode = '42501';
    end if;
    return to_jsonb(v_row);
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
    id, employee_id, job_id, category, description, amount, receipt_url, status,
    submitted_date, incurred_on, mileage_miles, mileage_from, mileage_to,
    mileage_return, mileage_breakdown)
  values (
    p_id, p_employee, p_job_id, 'Mileage',
    coalesce(nullif(btrim(p_description), ''),
             public._mileage_summary(p_from, p_to, v_miles, coalesce(p_return, false))),
    (v_calc->>'amount')::numeric, nullif(btrim(p_receipt_url), ''), 'Pending',
    current_date, v_on, v_miles, nullif(btrim(p_from), ''), nullif(btrim(p_to), ''),
    coalesce(p_return, false), v_calc - 'amount')
  returning * into v_row;

  return to_jsonb(v_row);
end;
$$;
revoke all on function public.submit_my_mileage_claim_once(uuid, uuid, numeric, text, text, boolean, uuid, text, date, text) from public, anon;
grant execute on function public.submit_my_mileage_claim_once(uuid, uuid, numeric, text, text, boolean, uuid, text, date, text) to authenticated;
