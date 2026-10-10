-- ELE-1976 All four UK nations in the catalogue: STRUCTURE ONLY. ADDITIVE.
--
-- A college says which nation it delivers in; a course says which nation's
-- programme it follows (an English standard, a Welsh framework, a Scottish
-- Modern Apprenticeship, an NI framework), how its hours are counted there and
-- what its end assessment is called. No qualification content is stored here:
-- units and criteria still come from the awarding body's qualification.
-- The programme list and sources live in src/data/ukNationFrameworks.ts.

alter table public.colleges add column if not exists nation text;
do $$ begin
  alter table public.colleges add constraint colleges_nation_chk
    check (nation is null or nation in ('england', 'wales', 'scotland', 'northern_ireland'));
exception when duplicate_object then null; end $$;
comment on column public.colleges.nation is
  'Which UK nation the college delivers apprenticeships in: england, wales, scotland or northern_ireland. Drives programme lists and wording (ELE-1976). Null reads as England.';

alter table public.college_courses add column if not exists nation text;
alter table public.college_courses add column if not exists programme_kind text;
alter table public.college_courses add column if not exists programme_code text;
alter table public.college_courses add column if not exists hours_model text;
alter table public.college_courses add column if not exists on_job_hours_required numeric;
alter table public.college_courses add column if not exists end_assessment text;
do $$ begin
  alter table public.college_courses add constraint college_courses_nation_chk
    check (nation is null or nation in ('england', 'wales', 'scotland', 'northern_ireland'));
exception when duplicate_object then null; end $$;
do $$ begin
  alter table public.college_courses add constraint college_courses_programme_kind_chk
    check (programme_kind is null or programme_kind in ('standard', 'framework', 'modern_apprenticeship'));
exception when duplicate_object then null; end $$;
do $$ begin
  alter table public.college_courses add constraint college_courses_hours_model_chk
    check (hours_model is null or hours_model in ('otj_total', 'fixed_on_off', 'stages', 'agreed'));
exception when duplicate_object then null; end $$;
do $$ begin
  alter table public.college_courses add constraint college_courses_on_job_hours_chk
    check (on_job_hours_required is null or on_job_hours_required between 0 and 20000);
exception when duplicate_object then null; end $$;
comment on column public.college_courses.programme_code is
  'The programme the course follows in its nation: an English standard (ST0152), a Welsh framework (FR05055), or a stable key for a Scottish MA or NI framework (ELE-1976).';
comment on column public.college_courses.hours_model is
  'How training time is set: otj_total (England, Annex C total), fixed_on_off (Wales framework minimums), stages (Scotland), agreed (NI).';

create or replace function public.set_college_nation(p_college uuid, p_nation text)
returns void
language plpgsql volatile security definer set search_path to 'public'
as $$
begin
  if auth.uid() is null or not public.college_can('settings.manage', p_college) then
    raise exception 'only a college admin can set the nation' using errcode = '42501';
  end if;
  if p_nation is not null and p_nation not in ('england', 'wales', 'scotland', 'northern_ireland') then
    raise exception 'unknown nation' using errcode = '22023';
  end if;
  update public.colleges set nation = p_nation, updated_at = now() where id = p_college;
end;
$$;
revoke all on function public.set_college_nation(uuid, text) from public, anon;
grant execute on function public.set_college_nation(uuid, text) to authenticated;
