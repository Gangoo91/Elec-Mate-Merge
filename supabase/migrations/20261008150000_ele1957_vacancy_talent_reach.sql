-- ELE-1957 — Vacancies reach the talent pool.
--
-- 1. vacancy_talent_matches(vacancy)  — "N available electricians match this
--    role": the opted-in pool only (same visibility rule as get_talent_pool),
--    filtered to the role (apprentice / labourer / electrician) and ranked by
--    area, verification and skill overlap. Sanitised: display name (first name
--    + initial), area, card, tier, declared rate. No phone or email.
-- 2. invite_vacancy_matches(vacancy, profiles[], message) — one tap invites
--    the chosen matches. Every id is re-checked against the opt-in rule here,
--    so a crafted call can never reach someone who has not opted in. The push
--    goes server-side via _notify_push (respects notification preferences,
--    one per person per invite) — the browser's push relay is capped at 60 an
--    hour, which would silently drop most of a 100-person invite.
-- 3. Applications ring the firm: a trigger pushes the vacancy owner when an
--    application lands (the electrician-side apply path never notified them).
--
-- No new tables.

-- ---------------------------------------------------------------- matches
create or replace function public.vacancy_talent_matches(p_vacancy_id uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v public.employer_vacancies%rowtype;
  v_is_app boolean;
  v_is_lab boolean;
  v_loc text;
  v_out text;
  v_terms text[];
  v_pool integer := 0;
  v_matches jsonb;
begin
  if auth.uid() is null then
    return jsonb_build_object('error', 'not_authenticated');
  end if;

  select * into v
    from public.employer_vacancies
   where id = p_vacancy_id
     and employer_id in (select public.my_employer_scope());
  if not found then
    return jsonb_build_object('error', 'not_found');
  end if;

  if not public.is_talent_pool_viewer() then
    return jsonb_build_object('error', 'not_employer', 'pool_size', 0, 'match_count', 0,
                              'near_count', 0, 'invited_count', 0, 'matches', '[]'::jsonb);
  end if;

  v_is_app := v.type = 'Apprenticeship' or v.title ilike '%apprentic%';
  v_is_lab := v.title ilike '%labourer%';
  v_loc := lower(btrim(coalesce(v.location, '')));
  v_out := upper(split_part(btrim(coalesce(v.postcode, '')), ' ', 1));
  v_terms := array(
    select lower(btrim(t))
      from unnest(coalesce(v.requirements, '{}') || coalesce(v.nice_to_have, '{}')) t
     where length(btrim(t)) >= 3
  );

  with pool as (
    select p.id,
           p.job_title,
           nullif(btrim(p.work_area), '') as area,
           p.ecs_card_type,
           p.verification_tier,
           coalesce(p.is_verified, false) as is_verified,
           p.rate_type,
           p.rate_amount,
           public.talent_pool_display_name(coalesce(nullif(btrim(e.name), ''), pr.full_name)) as name,
           lower(coalesce(p.ecs_card_type, '')) as card
      from public.employer_elec_id_profiles p
      join public.employer_employees e on e.id = p.employee_id
      left join public.profiles pr on pr.id = e.user_id
     where coalesce(p.opt_out, false) = false
       and p.available_for_hire = true
       and p.available_for_hire_opted_in_at is not null
       and p.profile_visibility in ('public', 'employers_only')
       and (e.employer_id is null or e.employer_id not in (select public.my_employer_scope()))
       and (e.user_id is null or e.user_id <> auth.uid())
  ),
  classified as (
    select pool.*,
           (card in ('apprentice', 'green', 'trainee_electrician', 'red')
             or coalesce(job_title, '') ilike '%apprentic%') as is_app,
           (card = 'electrical_labourer' or coalesce(job_title, '') ilike '%labourer%') as is_lab
      from pool
  ),
  fit as (
    select c.*,
           (c.area is not null and (
              (v_loc <> '' and (lower(c.area) like '%' || v_loc || '%' or v_loc like '%' || lower(c.area) || '%'))
              or (v_out <> '' and upper(c.area) like v_out || '%')
           )) as near,
           (select count(*)::int
              from public.employer_elec_id_skills s
             where s.profile_id = c.id
               and length(btrim(coalesce(s.skill_name, ''))) >= 3
               and exists (
                 select 1 from unnest(v_terms) t
                  where t like '%' || lower(btrim(s.skill_name)) || '%'
                     or lower(s.skill_name) like '%' || t || '%')) as skill_hits
      from classified c
     where case
             when v_is_app then c.is_app
             when v_is_lab then not c.is_app
             else not c.is_app and not c.is_lab
           end
  ),
  ranked as (
    select f.*,
           exists (select 1 from public.employer_vacancy_invitations i
                    where i.vacancy_id = v.id and i.electrician_profile_id = f.id) as invited,
           exists (select 1 from public.employer_vacancy_applications a
                    where a.vacancy_id = v.id and a.applicant_profile_id = f.id) as applied
      from fit f
  )
  select jsonb_build_object(
           'match_count', count(*),
           'near_count', count(*) filter (where near),
           'invited_count', count(*) filter (where invited),
           'matches', coalesce(jsonb_agg(jsonb_build_object(
              'profile_id', id,
              'name', coalesce(name, 'Electrician'),
              'job_title', job_title,
              'area', area,
              'ecs_card_type', ecs_card_type,
              'verification_tier', coalesce(verification_tier, 'basic'),
              'is_verified', is_verified,
              'rate_type', rate_type,
              'rate_amount', rate_amount,
              'near', near,
              'skill_hits', skill_hits,
              'invited', invited,
              'applied', applied)
            order by near desc, is_verified desc, skill_hits desc, name), '[]'::jsonb))
    into v_matches
    from (select * from ranked order by near desc, is_verified desc, skill_hits desc, name limit 250) r;

  select count(*) into v_pool
    from public.employer_elec_id_profiles p
    join public.employer_employees e on e.id = p.employee_id
   where coalesce(p.opt_out, false) = false
     and p.available_for_hire = true
     and p.available_for_hire_opted_in_at is not null
     and p.profile_visibility in ('public', 'employers_only')
     and (e.employer_id is null or e.employer_id not in (select public.my_employer_scope()))
     and (e.user_id is null or e.user_id <> auth.uid());

  return v_matches || jsonb_build_object(
    'pool_size', v_pool,
    'vacancy_status', v.status,
    'role', case when v_is_app then 'apprentice' when v_is_lab then 'labourer' else 'electrician' end,
    'has_location', v_loc <> '' or v_out <> '');
end;
$$;

comment on function public.vacancy_talent_matches(uuid) is
  'ELE-1957: opted-in talent pool members who fit a vacancy (role, area, skills). Sanitised; firm-scoped.';

revoke all on function public.vacancy_talent_matches(uuid) from public, anon;
grant execute on function public.vacancy_talent_matches(uuid) to authenticated;

-- ---------------------------------------------------------------- invite
create or replace function public.invite_vacancy_matches(
  p_vacancy_id uuid,
  p_profile_ids uuid[],
  p_message text default null
)
returns jsonb
language plpgsql
volatile
security definer
set search_path = public
as $$
declare
  v public.employer_vacancies%rowtype;
  v_firm_name text;
  v_rate text := '';
  v_period text;
  v_body text;
  v_title text;
  v_asked integer := coalesce(cardinality(p_profile_ids), 0);
  v_invited integer := 0;
  v_pushed integer := 0;
  v_new uuid;
  r record;
begin
  if auth.uid() is null then
    raise exception 'Sign in first' using errcode = '42501';
  end if;

  select * into v
    from public.employer_vacancies
   where id = p_vacancy_id
     and employer_id in (select public.my_employer_scope());
  if not found then
    return jsonb_build_object('error', 'not_found');
  end if;
  if v.status <> 'Open' then
    return jsonb_build_object('error', 'not_open');
  end if;
  if not public.is_talent_pool_viewer() then
    return jsonb_build_object('error', 'not_employer');
  end if;
  if v_asked = 0 then
    return jsonb_build_object('ok', true, 'invited', 0, 'pushed', 0, 'skipped', 0);
  end if;
  if v_asked > 250 then
    return jsonb_build_object('error', 'too_many');
  end if;
  if length(coalesce(p_message, '')) > 1000 then
    return jsonb_build_object('error', 'message_too_long');
  end if;

  select nullif(btrim(cp.company_name), '') into v_firm_name
    from public.company_profiles cp where cp.user_id = v.employer_id limit 1;

  -- "£220/day" style rate line, only from what the firm actually posted.
  v_period := lower(coalesce(v.salary_period, ''));
  if coalesce(v.salary_max, v.salary_min) is not null then
    v_rate := ', £' || to_char(coalesce(v.salary_max, v.salary_min),
                case when coalesce(v.salary_max, v.salary_min) >= 1000 then 'FM999G999' else 'FM999D00' end)
              || case
                   when v_period like '%hour%' then '/hr'
                   when v_period like '%day%' then '/day'
                   when v_period like '%week%' then '/week'
                   when v_period like '%month%' then '/month'
                   else ' a year'
                 end;
    v_rate := replace(v_rate, '.00', '');
  end if;

  v_title := coalesce(v_firm_name, 'A local firm') || ' is hiring';
  v_body := left(
    'They would like you to apply: ' || v.title
      || coalesce(' in ' || nullif(btrim(v.location), ''), '') || v_rate
      || '. Apply with your Elec-ID in one tap.',
    300);

  for r in
    select p.id, e.user_id
      from public.employer_elec_id_profiles p
      join public.employer_employees e on e.id = p.employee_id
     where p.id = any(p_profile_ids)
       and coalesce(p.opt_out, false) = false
       and p.available_for_hire = true
       and p.available_for_hire_opted_in_at is not null
       and p.profile_visibility in ('public', 'employers_only')
       and (e.employer_id is null or e.employer_id not in (select public.my_employer_scope()))
       and (e.user_id is null or e.user_id <> auth.uid())
  loop
    v_new := null;
    insert into public.employer_vacancy_invitations (vacancy_id, electrician_profile_id, invited_by, message)
    values (v.id, r.id, auth.uid(), nullif(btrim(coalesce(p_message, '')), ''))
    on conflict (vacancy_id, electrician_profile_id) do nothing
    returning id into v_new;

    if v_new is not null then
      v_invited := v_invited + 1;
      if r.user_id is not null and public._notify_push(
           r.user_id, 'vacancy_invite', v_title, v_body,
           jsonb_build_object('ref_id', v_new::text, 'route', '/electrician/job-vacancies',
                              'push_type', 'vacancy', 'vacancyId', v.id, 'invitationId', v_new),
           'job_opportunities', 1::smallint) then
        v_pushed := v_pushed + 1;
      end if;
    end if;
  end loop;

  return jsonb_build_object('ok', true, 'invited', v_invited, 'pushed', v_pushed,
                            'skipped', v_asked - v_invited);
end;
$$;

comment on function public.invite_vacancy_matches(uuid, uuid[], text) is
  'ELE-1957: invite chosen opted-in talent pool members to an open vacancy; push via _notify_push.';

revoke all on function public.invite_vacancy_matches(uuid, uuid[], text) from public, anon;
grant execute on function public.invite_vacancy_matches(uuid, uuid[], text) to authenticated;

-- ---------------------------------------------------------------- application → firm push
create or replace function public._notify_vacancy_application()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v record;
begin
  select title, employer_id into v from public.employer_vacancies where id = new.vacancy_id;
  if v.employer_id is not null then
    perform public._notify_push(
      v.employer_id, 'vacancy_application', 'New application',
      left(coalesce(nullif(btrim(new.applicant_name), ''), 'Someone') || ' applied for ' || coalesce(v.title, 'your vacancy')
           || case when new.applicant_profile_id is not null then '. Their Elec-ID is attached.' else '.' end, 300),
      jsonb_build_object('ref_id', new.id::text, 'route', '/employer?section=vacancies',
                         'push_type', 'job', 'applicationId', new.id, 'vacancyId', new.vacancy_id),
      'hiring', 1::smallint);
  end if;
  return new;
exception when others then
  return new;
end;
$$;

revoke all on function public._notify_vacancy_application() from public, anon, authenticated;

drop trigger if exists trg_notify_vacancy_application on public.employer_vacancy_applications;
create trigger trg_notify_vacancy_application
  after insert on public.employer_vacancy_applications
  for each row execute function public._notify_vacancy_application();
