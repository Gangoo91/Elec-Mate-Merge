-- ELE-1971: Sign in with Microsoft (Entra ID) for college staff and learners,
-- with the college's email domain mapped to the college.
--
--   college_sso_domains        a college admin registers its domains (and can
--                              pin its Entra tenant id). One college per domain.
--                              Consumer domains (outlook.com, gmail.com, ...)
--                              are refused.
--   college_sso_add_domain / college_sso_remove_domain
--                              college admin / head of department only, logged
--   sso_domain_enabled(email)  anyone: is this email's domain set up for
--                              Microsoft sign-in? (true/false only, no names)
--   sso_claim_my_college()     after a Microsoft sign-in: links the person to
--                              their college ONLY if the college already
--                              listed them. Staff by the staff list (an
--                              unlinked college_staff row with this email),
--                              learners by the roster (an unlinked
--                              college_students row with this email). It never
--                              creates a staff row or grants a role on its own.
--                              Requires a Microsoft (azure) identity whose
--                              email Microsoft marks verified, and the pinned
--                              tenant when the college set one.
--
-- Email and password stay for apprentices' personal accounts, so the record
-- still belongs to them after they leave. Nothing here runs until Andrew
-- enables the Azure provider in Supabase (Authentication -> Providers).

begin;
set local lock_timeout = '8s';

create table if not exists public.college_sso_domains (
  id               uuid primary key default gen_random_uuid(),
  college_id       uuid not null references public.colleges(id) on delete cascade,
  domain           text not null,
  provider         text not null default 'azure' check (provider in ('azure')),
  azure_tenant_id  text,
  allow_staff      boolean not null default true,
  allow_learners   boolean not null default true,
  created_by       uuid references auth.users(id) on delete set null,
  created_at       timestamptz not null default now(),
  constraint college_sso_domains_domain_format check (domain ~ '^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$')
);
create unique index if not exists uq_college_sso_domain on public.college_sso_domains (domain);
create index if not exists idx_college_sso_domains_college on public.college_sso_domains (college_id);
alter table public.college_sso_domains enable row level security;
comment on table public.college_sso_domains is
  '[COLLEGE] ELE-1971: email domains a college has registered for Sign in with Microsoft (Entra ID). Scope: one college per domain. Used by: College settings (Security and access), sso_claim_my_college, sso_domain_enabled. Rule: written only through college_sso_add_domain / college_sso_remove_domain (college admin); a domain never grants a role on its own, only links people the college already listed.';

drop policy if exists "College staff and Elec-Mate read SSO domains" on public.college_sso_domains;
create policy "College staff and Elec-Mate read SSO domains" on public.college_sso_domains
  for select to authenticated
  using (public._ch_same_college(college_id) or public._is_platform_admin());
revoke all on public.college_sso_domains from anon;
revoke insert, update, delete, truncate on public.college_sso_domains from authenticated;

create or replace function public._sso_consumer_domain(p_domain text)
returns boolean
language sql
immutable
as $$
  select lower(p_domain) = any (array[
    'outlook.com', 'hotmail.com', 'hotmail.co.uk', 'live.com', 'live.co.uk', 'msn.com',
    'gmail.com', 'googlemail.com', 'yahoo.com', 'yahoo.co.uk', 'icloud.com', 'me.com',
    'aol.com', 'protonmail.com', 'proton.me', 'btinternet.com', 'sky.com', 'virginmedia.com',
    'talktalk.net', 'gmx.com', 'mail.com', 'onmicrosoft.com'
  ]) or lower(p_domain) like '%.onmicrosoft.com';
$$;

create or replace function public.college_sso_add_domain(
  p_college uuid, p_domain text, p_tenant text default null,
  p_allow_staff boolean default true, p_allow_learners boolean default true)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_domain text := lower(btrim(coalesce(p_domain, '')));
  v_row    college_sso_domains;
begin
  if auth.uid() is null or not public._is_college_manager(p_college) then
    raise exception 'Only your college admin can change this' using errcode = '42501';
  end if;
  v_domain := regexp_replace(v_domain, '^.*@', '');
  if v_domain !~ '^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$' then
    raise exception 'Enter a domain like northgate.ac.uk';
  end if;
  if public._sso_consumer_domain(v_domain) then
    raise exception 'That is a personal email domain. Add your college''s own domain, like northgate.ac.uk';
  end if;
  if exists (select 1 from college_sso_domains where domain = v_domain and college_id <> p_college) then
    raise exception 'That domain is already registered to another college. Contact founder@elec-mate.com if it is yours';
  end if;
  insert into college_sso_domains (college_id, domain, azure_tenant_id, allow_staff, allow_learners, created_by)
  values (p_college, v_domain, nullif(btrim(coalesce(p_tenant, '')), ''), coalesce(p_allow_staff, true),
          coalesce(p_allow_learners, true), auth.uid())
  on conflict (domain) do update
    set azure_tenant_id = excluded.azure_tenant_id,
        allow_staff = excluded.allow_staff,
        allow_learners = excluded.allow_learners
  returning * into v_row;
  insert into college_activity (college_id, actor_id, action, entity_type, entity_id, details)
  values (p_college, auth.uid(), 'security.sso_domain_added', 'college_sso_domain', v_row.id,
          jsonb_build_object('domain', v_domain, 'tenant_pinned', v_row.azure_tenant_id is not null,
                             'allow_staff', v_row.allow_staff, 'allow_learners', v_row.allow_learners));
  return to_jsonb(v_row);
end;
$$;
revoke all on function public.college_sso_add_domain(uuid, text, text, boolean, boolean) from public, anon;
grant execute on function public.college_sso_add_domain(uuid, text, text, boolean, boolean) to authenticated;

create or replace function public.college_sso_remove_domain(p_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_row college_sso_domains;
begin
  select * into v_row from college_sso_domains where id = p_id;
  if v_row.id is null then
    return;
  end if;
  if auth.uid() is null or not public._is_college_manager(v_row.college_id) then
    raise exception 'Only your college admin can change this' using errcode = '42501';
  end if;
  delete from college_sso_domains where id = p_id;
  insert into college_activity (college_id, actor_id, action, entity_type, entity_id, details)
  values (v_row.college_id, auth.uid(), 'security.sso_domain_removed', 'college_sso_domain', v_row.id,
          jsonb_build_object('domain', v_row.domain));
end;
$$;
revoke all on function public.college_sso_remove_domain(uuid) from public, anon;
grant execute on function public.college_sso_remove_domain(uuid) to authenticated;

create or replace function public.sso_domain_enabled(p_email text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.college_sso_domains
     where domain = lower(regexp_replace(btrim(coalesce(p_email, '')), '^.*@', ''))
  );
$$;
revoke all on function public.sso_domain_enabled(text) from public;
grant execute on function public.sso_domain_enabled(text) to anon, authenticated;

create or replace function public.sso_claim_my_college()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user     uuid := auth.uid();
  v_email    text;
  v_domain   text;
  v_identity jsonb;
  v_tenant   text;
  v_map      college_sso_domains;
  v_college  text;
  v_staff    uuid;
  v_student  uuid;
  v_existing record;
  v_cohort   uuid;
  v_cohort_name text;
  v_tutor_staff uuid;
  v_tutor_user  uuid;
  v_qual     uuid;
begin
  if v_user is null then
    return jsonb_build_object('status', 'not_signed_in');
  end if;

  select i.identity_data, lower(btrim(coalesce(i.identity_data ->> 'email', u.email)))
    into v_identity, v_email
    from auth.identities i join auth.users u on u.id = i.user_id
   where i.user_id = v_user and i.provider = 'azure'
   order by i.last_sign_in_at desc nulls last
   limit 1;

  if v_identity is null then
    return jsonb_build_object('status', 'not_microsoft');
  end if;
  -- Microsoft only marks the email verified when the tenant owns the domain
  -- (xms_edov). An unverified email could be anyone's, so it links nothing.
  if coalesce(v_identity ->> 'email_verified', 'false') <> 'true' then
    return jsonb_build_object('status', 'email_not_verified', 'email', v_email);
  end if;

  v_domain := regexp_replace(coalesce(v_email, ''), '^.*@', '');
  select * into v_map from college_sso_domains where domain = v_domain;
  if v_map.id is null then
    return jsonb_build_object('status', 'no_college', 'email', v_email);
  end if;
  select name into v_college from colleges where id = v_map.college_id;

  v_tenant := coalesce(v_identity -> 'custom_claims' ->> 'tid', v_identity ->> 'tid');
  if v_map.azure_tenant_id is not null and coalesce(v_tenant, '') <> v_map.azure_tenant_id then
    return jsonb_build_object('status', 'wrong_tenant', 'college_name', v_college);
  end if;

  -- Already staff here?
  if exists (select 1 from college_staff where user_id = v_user and college_id = v_map.college_id and archived_at is null) then
    return jsonb_build_object('status', 'staff', 'college_name', v_college, 'already', true);
  end if;
  -- Already a learner?
  select cs.id, cs.college_id into v_existing from college_students cs where cs.user_id = v_user limit 1;
  if v_existing.id is not null then
    if v_existing.college_id = v_map.college_id then
      return jsonb_build_object('status', 'learner', 'college_name', v_college, 'already', true);
    end if;
    return jsonb_build_object('status', 'other_college', 'college_name', v_college);
  end if;

  -- Staff: only a row the college already added for this email.
  if v_map.allow_staff then
    update college_staff set user_id = v_user
     where id = (
       select id from college_staff
        where user_id is null and archived_at is null and college_id = v_map.college_id
          and lower(btrim(email)) = v_email
        order by created_at limit 1)
    returning id into v_staff;
    if v_staff is not null then
      insert into college_activity (college_id, actor_id, action, entity_type, entity_id, details)
      values (v_map.college_id, v_user, 'security.sso_linked_staff', 'college_staff', v_staff,
              jsonb_build_object('domain', v_domain, 'provider', 'azure'));
      return jsonb_build_object('status', 'staff', 'college_name', v_college, 'already', false);
    end if;
  end if;

  -- Learner: only a roster row the college already added for this email.
  if v_map.allow_learners then
    update college_students set user_id = v_user
     where id = (
       select id from college_students
        where user_id is null and college_id = v_map.college_id
          and lower(btrim(email)) = v_email
        order by created_at limit 1)
    returning id, cohort_id into v_student, v_cohort;
    if v_student is not null then
      select co.name, co.tutor_id, cc.qualification_id
        into v_cohort_name, v_tutor_staff, v_qual
        from college_students cs
        left join college_cohorts co on co.id = cs.cohort_id
        left join college_courses cc on cc.id = cs.course_id
       where cs.id = v_student;
      if v_tutor_staff is not null then
        select user_id into v_tutor_user from college_staff where id = v_tutor_staff and archived_at is null;
      end if;
      -- Same assignment row accept_college_invite writes (it needs a qualification).
      if v_qual is not null
         and not exists (select 1 from college_student_assignments where student_id = v_user and college_id = v_map.college_id) then
        insert into college_student_assignments
          (student_id, college_id, college_name, qualification_id, cohort_id, cohort_name, tutor_id, start_date, status)
        values (v_user, v_map.college_id, v_college, v_qual,
                case when v_cohort is null then null else v_cohort::text end,
                v_cohort_name, v_tutor_user, current_date, 'active');
      end if;
      insert into college_activity (college_id, actor_id, action, entity_type, entity_id, details)
      values (v_map.college_id, v_user, 'security.sso_linked_learner', 'college_students', v_student,
              jsonb_build_object('domain', v_domain, 'provider', 'azure'));
      return jsonb_build_object('status', 'learner', 'college_name', v_college, 'already', false);
    end if;
  end if;

  return jsonb_build_object('status', 'not_on_list', 'college_name', v_college, 'email', v_email);
end;
$$;
revoke all on function public.sso_claim_my_college() from public, anon;
grant execute on function public.sso_claim_my_college() to authenticated;

commit;
