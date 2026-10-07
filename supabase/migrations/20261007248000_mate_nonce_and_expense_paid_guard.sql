-- 1. Mate confirmed actions: each confirmation token runs exactly once, even if
--    two confirms race on different servers. The edge function inserts the
--    token's nonce here BEFORE acting; a duplicate key means it already ran.
create table if not exists public.mate_action_nonces (
  nonce text primary key,
  user_id uuid,
  action text,
  created_at timestamptz not null default now()
);
alter table public.mate_action_nonces enable row level security;
comment on table public.mate_action_nonces is
  '[EMPLOYER] One row per Employer Mate confirmed action that ran. Scope: server only. Used by: employer-ai-assistant (mate-actions). Rule: service role writes; no client policies; a duplicate nonce means the action already ran.';

-- 2. Marking an expense claim paid is a money action: owner or admin only,
--    enforced by the database (the app and Mate already hide it from office).
create or replace function public.guard_expense_paid()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare v_firm uuid;
begin
  if auth.uid() is null then return new; end if;  -- service role / cron
  if (new.paid_date is distinct from old.paid_date and new.paid_date is not null)
     or (lower(coalesce(new.status, '')) = 'paid' and lower(coalesce(old.status, '')) <> 'paid') then
    select e.employer_id into v_firm from public.employer_employees e where e.id = new.employee_id;
    if v_firm is null or not public.can_see_firm_money(v_firm) then
      raise exception 'Only the owner or an admin can mark expenses paid';
    end if;
  end if;
  return new;
end;
$$;
revoke all on function public.guard_expense_paid() from public, anon, authenticated;
drop trigger if exists trg_guard_expense_paid on public.employer_expense_claims;
create trigger trg_guard_expense_paid
  before update of status, paid_date on public.employer_expense_claims
  for each row execute function public.guard_expense_paid();
