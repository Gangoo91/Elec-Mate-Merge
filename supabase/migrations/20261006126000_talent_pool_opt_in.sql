-- ELE-1958: electricians were listed in employers' talent pool by default
-- (available_for_hire DEFAULT true), so 100 profiles are visible without anyone
-- having chosen it. ELE-528 made the flag electrician-controlled; the default
-- undid that.
-- Now: default false for new profiles, and every switch-on is timestamped
-- (available_for_hire_opted_in_at) so consent is provable from here on.
-- NOT done here (Andrew's decision, recorded on ELE-1958): whether to hide the
-- existing 100 until they opt in. get_talent_pool is unchanged.

alter table public.employer_elec_id_profiles
  alter column available_for_hire set default false;

alter table public.employer_elec_id_profiles
  add column if not exists available_for_hire_opted_in_at timestamptz;

create or replace function public.stamp_hire_opt_in()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if NEW.available_for_hire is true
     and (TG_OP = 'INSERT' or OLD.available_for_hire is distinct from true) then
    NEW.available_for_hire_opted_in_at := now();
  elsif NEW.available_for_hire is not true then
    NEW.available_for_hire_opted_in_at := null;
  end if;
  return NEW;
end;
$$;

drop trigger if exists trg_stamp_hire_opt_in on public.employer_elec_id_profiles;
create trigger trg_stamp_hire_opt_in
  before insert or update of available_for_hire on public.employer_elec_id_profiles
  for each row execute function public.stamp_hire_opt_in();
