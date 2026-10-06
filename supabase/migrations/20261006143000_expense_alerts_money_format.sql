-- Expense alerts printed amounts as raw numeric text: "£18.4", "£7".
-- Money is always two decimals. Also says when a claim was paid.
create or replace function public.trg_notify_expense_claim()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_employer uuid;
  v_worker uuid;
  v_name text;
begin
  select e.employer_id, e.user_id, e.name into v_employer, v_worker, v_name
  from employer_employees e where e.id = new.employee_id;

  if v_worker is not null and v_worker = auth.uid() then
    perform notify_employer_bell(
      v_employer, 'expense_submitted', 'Expense claim',
      coalesce(v_name, 'A team member') || ' claimed ' ||
        coalesce('£' || to_char(new.amount, 'FM999,999,990.00'), 'an amount') ||
        coalesce(' — ' || new.category, ''),
      jsonb_build_object('expense_id', new.id, 'route', '/employer?section=expenses')
    );
  end if;
  return new;
end;
$function$;

create or replace function public.trg_notify_expense_decision()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare v_worker uuid;
begin
  if new.status is distinct from old.status and lower(new.status) in ('approved','rejected','paid') then
    select e.user_id into v_worker from employer_employees e where e.id = new.employee_id;
    perform worker_notify(v_worker, 'expense', 'Expense ' || lower(new.status),
      coalesce('£' || to_char(new.amount, 'FM999,999,990.00'), 'Your claim') ||
        coalesce(' — ' || new.category, '') || ' ' || lower(new.status) ||
        case when lower(new.status) = 'paid' and new.paid_date is not null
             then ' on ' || to_char(new.paid_date, 'FMDD Mon') else '' end ||
        case when lower(new.status) = 'rejected' and nullif(new.rejection_reason, '') is not null
             then ': ' || left(new.rejection_reason, 100) else '' end,
      jsonb_build_object('expense_id', new.id, 'route', '/electrician/worker-tools/expenses'));
  end if;
  return new;
end; $function$;
