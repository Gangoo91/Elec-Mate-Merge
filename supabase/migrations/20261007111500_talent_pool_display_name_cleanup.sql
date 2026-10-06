-- ELE-1958 (part 5): the talent-pool name rule took the last *word* literally, so
-- "Demo Worker (test)" became "Demo (." Bracketed notes and stray symbols are now
-- dropped before taking first name + surname initial ("Demo W."). Mirrored in
-- src/components/settings/elec-id/TalentPoolOptIn.tsx (the opt-in preview).
-- Also corrects the date in the available_for_hire column comment (reset ran 6 Oct).

create or replace function public.talent_pool_display_name(p_name text)
returns text
language sql
immutable
set search_path = public
as $$
  with n as (
    select btrim(regexp_replace(
             regexp_replace(
               regexp_replace(coalesce(p_name, ''), '\([^)]*\)', ' ', 'g'),
               '[^[:alpha:][:space:]''-]', ' ', 'g'),
             '\s+', ' ', 'g')) as v
  )
  select case
    when v = '' then null
    when position(' ' in v) = 0 then v
    else split_part(v, ' ', 1) || ' ' || upper(left(regexp_replace(v, '^.*\s', ''), 1)) || '.'
  end
  from n;
$$;

comment on function public.talent_pool_display_name(text) is
  'ELE-1958: "Jane Smith" → "Jane S." (bracketed notes and symbols dropped) — the only form of a name the talent pool shows.';

revoke all on function public.talent_pool_display_name(text) from public, anon;
grant execute on function public.talent_pool_display_name(text) to authenticated;

comment on column public.employer_elec_id_profiles.available_for_hire is
  'Opt-in talent-pool listing ("Let firms find me" in Elec-ID). Default false since 6 Oct 2026. On 6 Oct 2026 all 108 pre-existing true values were reset to false — none had evidence of an explicit opt-in (ELE-1958). Listed only when true AND available_for_hire_opted_in_at is set.';
