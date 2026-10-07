-- Office wiring: owners AND admins set the firm's default break.
-- company_profiles UPDATE RLS is owner-only (auth.uid() = user_id), so an
-- active employer admin could not change default_break_minutes. This setter
-- checks can_see_firm_money(p_firm) (owner or active admin; office managers
-- and roster are refused) and touches ONLY default_break_minutes.

create or replace function public.set_firm_default_break(p_firm uuid, p_minutes integer)
returns integer
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
  if p_minutes is null or p_minutes < 0 or p_minutes > 240 then
    raise exception 'break_out_of_range' using errcode = '22023';
  end if;

  update public.company_profiles
     set default_break_minutes = p_minutes,
         updated_at = now()
   where user_id = p_firm;
  get diagnostics v_rows = row_count;

  if v_rows = 0 then
    raise exception 'no_company_profile' using errcode = 'P0002';
  end if;
  return p_minutes;
end;
$$;

revoke all on function public.set_firm_default_break(uuid, integer) from public, anon;
grant execute on function public.set_firm_default_break(uuid, integer) to authenticated;

comment on function public.set_firm_default_break(uuid, integer) is
  'Owner/admin only: sets company_profiles.default_break_minutes for the firm (taken off a clocked day when the worker enters no break).';
