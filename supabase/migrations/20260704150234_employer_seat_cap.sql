-- Per-employer seat cap (free-seat allowance). NULL = unlimited (paid employers
-- who pay per seat). Comped employers get a fixed free allowance (e.g. Craig=5).
-- Enforced BEFORE INSERT so it can't be bypassed. Rollback: drop trigger+fn+column.
alter table public.profiles add column if not exists employer_seat_cap integer;

create or replace function public.tg_employer_seat_cap()
 returns trigger language plpgsql security definer set search_path to 'public' as $$
declare
  v_cap int;
  v_used int;
begin
  if new.employer_id is null then return new; end if;
  select employer_seat_cap into v_cap from profiles where id = new.employer_id;
  if v_cap is null then return new; end if;  -- unlimited
  -- pending + active seats consume the allowance; revoked (removed) free it up
  select count(*) into v_used from employer_seats
   where employer_id = new.employer_id and status in ('pending','active');
  if v_used >= v_cap then
    raise exception 'SEAT_CAP_REACHED: this account is limited to % team members', v_cap
      using errcode = 'check_violation';
  end if;
  return new;
end;
$$;

drop trigger if exists trg_employer_seat_cap on public.employer_employees;
create trigger trg_employer_seat_cap
  before insert on public.employer_employees
  for each row execute function public.tg_employer_seat_cap();

-- Craig: free, 5-seat cap.
update public.profiles set employer_seat_cap = 5
 where id = 'e2945660-a8e0-4099-8e50-a70d71d3dca4';
