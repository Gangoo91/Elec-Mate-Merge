-- ELE-2005 review. employee_holiday_allowances is scoped by user_id (the firm)
-- only, so any account could write a row for ANOTHER firm's employee_id, and
-- that worker would see the invented balance ("Worker views own holiday
-- allowance"). Several permissive policies allow writes, so a trigger enforces
-- it once: the employee must be on the row's firm.
create or replace function public.holiday_allowance_same_firm()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.employee_id is not null and not exists (
    select 1 from public.employer_employees e
     where e.id = new.employee_id and e.employer_id = new.user_id
  ) then
    raise exception 'That person is not on this firm''s team';
  end if;
  return new;
end;
$$;
drop trigger if exists trg_holiday_allowance_same_firm on public.employee_holiday_allowances;
create trigger trg_holiday_allowance_same_firm
  before insert or update of employee_id, user_id on public.employee_holiday_allowances
  for each row execute function public.holiday_allowance_same_firm();
