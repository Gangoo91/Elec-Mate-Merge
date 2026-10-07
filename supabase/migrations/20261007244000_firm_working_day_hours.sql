-- ELE-1820 (Andrew 7 Oct): the diary's working day is a firm setting, 8h by
-- default. Read by get_dispatch_board for capacity and clash bars; set by the
-- owner or an admin from Timesheet rules (only the account owner can update
-- company_profiles directly, so a guarded setter like set_firm_default_break).
alter table public.company_profiles
  add column if not exists working_day_hours numeric(4,2) not null default 8
    check (working_day_hours between 1 and 24);
comment on column public.company_profiles.working_day_hours is
  'Firm working day in hours (Employer Hub diary capacity). Set via set_firm_working_day.';

create or replace function public.set_firm_working_day(p_firm uuid, p_hours numeric)
returns numeric
language plpgsql
security definer
set search_path = public
as $$
declare v_rows integer;
begin
  if auth.uid() is null then
    raise exception 'not_signed_in' using errcode = '42501';
  end if;
  if p_firm is null or not public.can_see_firm_money(p_firm) then
    raise exception 'not_allowed' using errcode = '42501';
  end if;
  if p_hours is null or p_hours < 1 or p_hours > 24 then
    raise exception 'hours_out_of_range' using errcode = '22023';
  end if;
  update public.company_profiles set working_day_hours = p_hours, updated_at = now() where user_id = p_firm;
  get diagnostics v_rows = row_count;
  if v_rows = 0 then
    raise exception 'no_company_profile' using errcode = 'P0002';
  end if;
  return p_hours;
end;
$$;
revoke all on function public.set_firm_working_day(uuid, numeric) from public, anon;
grant execute on function public.set_firm_working_day(uuid, numeric) to authenticated;

do $$
declare v_def text;
begin
  v_def := pg_get_functiondef('public.get_dispatch_board(uuid,date,date)'::regprocedure);
  if position('working_day_hours' in v_def) > 0 then return; end if;
  v_def := replace(v_def, $q$  return jsonb_build_object(
    'people', coalesce(($q$, $q$  return jsonb_build_object(
    'working_day_hours', coalesce((select cp.working_day_hours from public.company_profiles cp
                                    where cp.user_id = p_firm limit 1), 8),
    'people', coalesce(($q$);
  if position('working_day_hours' in v_def) = 0 then raise exception 'get_dispatch_board not patched'; end if;
  execute v_def;
end $$;
