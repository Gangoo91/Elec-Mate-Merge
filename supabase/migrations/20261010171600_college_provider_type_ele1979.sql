-- ELE-1979: independent training providers and employer-providers on the same
-- College Hub. One product; the college record says what kind of provider it
-- is, and the wording and set-up defaults follow (src/lib/collegeProviderType.ts).
--
--   fe_college         an FE college (the default, every existing row)
--   itp                an independent training provider ("centre")
--   employer_provider  an employer that is its own apprenticeship provider
--
-- Additive only.

alter table public.colleges
  add column if not exists provider_type text not null default 'fe_college';

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'colleges_provider_type_chk') then
    alter table public.colleges
      add constraint colleges_provider_type_chk
      check (provider_type in ('fe_college', 'itp', 'employer_provider'));
  end if;
end $$;

comment on column public.colleges.provider_type is
  '[COLLEGE] ELE-1979. What kind of provider this hub belongs to: fe_college (default), itp (independent training provider, called a centre in the app) or employer_provider (an employer that is its own provider). Changes wording and set-up defaults only; every feature is the same. Set at /college/setup or in Settings by a college admin or head of department (set_college_provider_type), or by a platform admin.';

-- Admin / head of department of the college, or a platform admin.
create or replace function public.set_college_provider_type(p_college uuid, p_type text)
returns jsonb
language plpgsql
volatile
security definer
set search_path to 'public'
as $$
begin
  if auth.uid() is null then
    raise exception 'Sign in first' using errcode = '42501';
  end if;
  if p_type not in ('fe_college', 'itp', 'employer_provider') then
    raise exception 'Unknown provider type %', p_type;
  end if;
  if not (
    public._is_platform_admin()
    or exists (select 1 from college_staff
                where college_id = p_college and user_id = auth.uid() and archived_at is null
                  and role in ('admin', 'head_of_department'))
  ) then
    raise exception 'Only a college admin or head of department can change this' using errcode = '42501';
  end if;
  update colleges set provider_type = p_type, updated_at = now() where id = p_college;
  return jsonb_build_object('college_id', p_college, 'provider_type', p_type);
end;
$$;
revoke all on function public.set_college_provider_type(uuid, text) from public, anon;
grant execute on function public.set_college_provider_type(uuid, text) to authenticated;
