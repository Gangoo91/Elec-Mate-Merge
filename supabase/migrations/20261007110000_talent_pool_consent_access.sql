-- ELE-1958 (part 2): the talent pool is opt-in, so EVERY way a firm can see an
-- electrician's Elec-ID has to respect that choice — not just get_talent_pool.
--
-- Found live 6 Oct: the "Employers view hireable …" policies on the Elec-ID
-- profile, skills, qualifications, work history and verified documents only
-- checked opt_out + profile_visibility ('employers_only' is the default), never
-- available_for_hire. So any employer account could read every non-disabled
-- Elec-ID directly (incl. ECS card number) whether or not the person had chosen
-- to be found. This migration:
--   1. adds work_area (the "area" the electrician chooses to show),
--   2. one viewer gate shared by RPC + policies, firm-aware via my_employer_scope()
--      (a co-admin of an employer firm can browse; the old gate checked only the
--      caller's own profile, so managers saw an empty pool),
--   3. one "can this firm see this Elec-ID" rule: listed in the pool, OR they
--      applied to the firm, OR the firm already has a conversation with them,
--   4. narrows the five "hireable" SELECT policies to that rule,
--   5. get_talent_pool: opted-in only, first name + surname initial, area, never
--      phone/email (unchanged otherwise),
--   6. shortlist: insert only for people the firm can see; rows removed when the
--      electrician withdraws (consent withdrawal must not leave copies),
--   7. invitations: the whole firm sees invites any manager sent; new invites and
--      employer-started conversations only to people who are in the pool / known,
--   8. a direct message to someone in the pool can be replied to (the reply opens
--      the conversation) — previously they were locked out until they applied.

-- 1. Area ------------------------------------------------------------------
alter table public.employer_elec_id_profiles
  add column if not exists work_area text;

comment on column public.employer_elec_id_profiles.work_area is
  'Town/area the electrician says they work in (e.g. "Leeds & Bradford"). Typed by them in Elec-ID → Let firms find me; shown in the talent pool only while they are opted in. Optional.';

-- 2. Viewer gate -----------------------------------------------------------
create or replace function public.is_talent_pool_viewer()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select auth.uid() is not null and (
    exists (
      select 1 from public.profiles p
      where p.id in (select public.my_employer_scope())
        and (p.subscription_tier = 'employer' or p.role = 'employer')
    )
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.admin_role is not null
    )
  );
$$;

comment on function public.is_talent_pool_viewer() is
  'ELE-1958: true when the caller acts for an employer firm (own account or active co-admin via my_employer_scope) or is an Elec-Mate admin. Gate for the talent pool.';

revoke all on function public.is_talent_pool_viewer() from public, anon;
grant execute on function public.is_talent_pool_viewer() to authenticated;

-- 3. Can this firm see this Elec-ID? ---------------------------------------
create or replace function public.employer_can_view_elec_id(p_profile_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select auth.uid() is not null and p_profile_id is not null and (
    -- in the talent pool: opted in (stamped), not disabled, not private
    (
      public.is_talent_pool_viewer()
      and exists (
        select 1 from public.employer_elec_id_profiles p
        where p.id = p_profile_id
          and p.available_for_hire = true
          and p.available_for_hire_opted_in_at is not null
          and coalesce(p.opt_out, false) = false
          and p.profile_visibility in ('public', 'employers_only')
      )
    )
    -- they applied to one of this firm's vacancies
    or exists (
      select 1
      from public.employer_vacancy_applications a
      join public.employer_vacancies v on v.id = a.vacancy_id
      where a.applicant_profile_id = p_profile_id
        and v.employer_id in (select public.my_employer_scope())
    )
    -- this firm already has a conversation with them
    or exists (
      select 1 from public.employer_conversations c
      where c.electrician_profile_id = p_profile_id
        and c.employer_id in (select public.my_employer_scope())
    )
  );
$$;

comment on function public.employer_can_view_elec_id(uuid) is
  'ELE-1958: may the caller''s firm see this Elec-ID? Yes if the electrician opted into the talent pool, applied to the firm, or is already in a conversation with it. Used by Elec-ID read policies, shortlist/invite/conversation inserts.';

revoke all on function public.employer_can_view_elec_id(uuid) from public, anon;
grant execute on function public.employer_can_view_elec_id(uuid) to authenticated;

-- 4. Narrow the "hireable" read policies -----------------------------------
drop policy if exists "Employers view hireable profiles" on public.employer_elec_id_profiles;
create policy "Employers view hireable profiles" on public.employer_elec_id_profiles
  for select to authenticated
  using (public.employer_can_view_elec_id(id));

drop policy if exists "Employers view hireable profile skills" on public.employer_elec_id_skills;
create policy "Employers view hireable profile skills" on public.employer_elec_id_skills
  for select to authenticated
  using (public.employer_can_view_elec_id(profile_id));

drop policy if exists "Employers view hireable profile qualifications" on public.employer_elec_id_qualifications;
create policy "Employers view hireable profile qualifications" on public.employer_elec_id_qualifications
  for select to authenticated
  using (public.employer_can_view_elec_id(profile_id));

drop policy if exists "Employers view hireable profile work history" on public.employer_elec_id_work_history;
create policy "Employers view hireable profile work history" on public.employer_elec_id_work_history
  for select to authenticated
  using (public.employer_can_view_elec_id(profile_id));

drop policy if exists "Employers view verified documents of hireable profiles" on public.elec_id_documents;
create policy "Employers view verified documents of hireable profiles" on public.elec_id_documents
  for select to authenticated
  using (verification_status = 'verified' and public.employer_can_view_elec_id(profile_id));

-- 5. get_talent_pool
-- display-name helper first
create or replace function public.talent_pool_display_name(p_name text)
returns text
language sql
immutable
set search_path = public
as $$
  select case
    when p_name is null or btrim(p_name) = '' then null
    when position(' ' in btrim(p_name)) = 0 then btrim(p_name)
    else split_part(btrim(p_name), ' ', 1) || ' '
         || upper(left(regexp_replace(btrim(p_name), '^.*\s', ''), 1)) || '.'
  end;
$$;

comment on function public.talent_pool_display_name(text) is
  'ELE-1958: "Jane Smith" → "Jane S." — the only form of a name the talent pool shows.';

-- Same shape as before plus 'area'. 'name' is now first name + surname initial.
-- No phone, no email, no ECS card number — ever.
create or replace function public.get_talent_pool()
returns jsonb
language plpgsql
security definer
set search_path = public
as $function$
declare
  v_result jsonb;
begin
  if not public.is_talent_pool_viewer() then
    return '[]'::jsonb;
  end if;

  select coalesce(jsonb_agg(c order by (c->>'is_verified')::boolean desc, c->>'name'), '[]'::jsonb)
    into v_result
  from (
    select jsonb_build_object(
      'profile_id', p.id,
      'name', public.talent_pool_display_name(coalesce(nullif(btrim(e.name), ''), pr.full_name)),
      'photo_url', coalesce(nullif(e.photo_url, ''), nullif(pr.avatar_url, '')),
      'job_title', p.job_title,
      'bio', p.bio,
      'area', nullif(btrim(p.work_area), ''),
      'specialisations', p.specialisations,
      'ecs_card_type', p.ecs_card_type,
      'ecs_expiry_date', p.ecs_expiry_date,
      'is_verified', p.is_verified,
      'verification_tier', p.verification_tier,
      'verification_status', p.verification_status,
      'rate_type', p.rate_type,
      'rate_amount', p.rate_amount,
      'member_since', p.created_at,
      'opted_in_at', p.available_for_hire_opted_in_at,
      'skills', coalesce((
        select jsonb_agg(jsonb_build_object('name', s.skill_name, 'level', s.skill_level, 'years', s.years_experience))
        from employer_elec_id_skills s where s.profile_id = p.id), '[]'::jsonb),
      'qualifications_count', (select count(*) from employer_elec_id_qualifications q where q.profile_id = p.id),
      'verified_documents', coalesce((
        select jsonb_agg(distinct d.document_type)
        from elec_id_documents d
        where d.profile_id = p.id and d.verification_status = 'verified'), '[]'::jsonb),
      'work_history_count', (select count(*) from employer_elec_id_work_history w where w.profile_id = p.id)
    ) as c
    from employer_elec_id_profiles p
    join employer_employees e on e.id = p.employee_id
    left join profiles pr on pr.id = e.user_id
    where coalesce(p.opt_out, false) = false
      and p.available_for_hire = true
      and p.available_for_hire_opted_in_at is not null
      and p.profile_visibility in ('public', 'employers_only')
      and (e.employer_id is null or e.employer_id not in (select public.my_employer_scope()))
      and (e.user_id is null or e.user_id <> auth.uid())
  ) sub;

  return v_result;
end;
$function$;


revoke all on function public.get_talent_pool() from public, anon;
grant execute on function public.get_talent_pool() to authenticated;
revoke all on function public.talent_pool_display_name(text) from public, anon;
grant execute on function public.talent_pool_display_name(text) to authenticated;

-- 6. Shortlist -------------------------------------------------------------
drop policy if exists "Firm manages its shortlist" on public.employer_talent_shortlist;
drop policy if exists "Firm reads its shortlist" on public.employer_talent_shortlist;
drop policy if exists "Firm adds to its shortlist" on public.employer_talent_shortlist;
drop policy if exists "Firm removes from its shortlist" on public.employer_talent_shortlist;

create policy "Firm reads its shortlist" on public.employer_talent_shortlist
  for select to authenticated
  using (employer_id in (select public.my_employer_scope()));

create policy "Firm adds to its shortlist" on public.employer_talent_shortlist
  for insert to authenticated
  with check (
    employer_id in (select public.my_employer_scope())
    and public.employer_can_view_elec_id(profile_id)
  );

create policy "Firm removes from its shortlist" on public.employer_talent_shortlist
  for delete to authenticated
  using (employer_id in (select public.my_employer_scope()));

revoke all on public.employer_talent_shortlist from anon;

create index if not exists employer_talent_shortlist_profile_idx
  on public.employer_talent_shortlist (profile_id);

comment on table public.employer_talent_shortlist is
  '[EMPLOYER HUB] A firm''s shortlist of talent-pool candidates (ELE-1958, replaced a per-device localStorage list). Scope: employer_id = the firm (my_employer_scope — owner and co-admins share one list); profile_id → employer_elec_id_profiles. Used by: Employer Hub → Talent pool ("Shortlisted" stat, bookmark). Rule: only people the firm can see (opted in / applied / in conversation) can be added; rows are deleted when the electrician leaves the pool.';

-- Withdrawal of consent removes the person from every firm's shortlist.
create or replace function public.talent_pool_withdrawn_cleanup()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if (NEW.available_for_hire is not true)
     or coalesce(NEW.opt_out, false)
     or NEW.profile_visibility = 'private' then
    delete from public.employer_talent_shortlist where profile_id = NEW.id;
  end if;
  return NEW;
end;
$$;

revoke all on function public.talent_pool_withdrawn_cleanup() from public, anon, authenticated;

drop trigger if exists trg_talent_pool_withdrawn_cleanup on public.employer_elec_id_profiles;
create trigger trg_talent_pool_withdrawn_cleanup
  after update of available_for_hire, opt_out, profile_visibility on public.employer_elec_id_profiles
  for each row execute function public.talent_pool_withdrawn_cleanup();

-- 7. Invitations + employer-started conversations ---------------------------
drop policy if exists "Firm views invitations to its vacancies" on public.employer_vacancy_invitations;
create policy "Firm views invitations to its vacancies" on public.employer_vacancy_invitations
  for select to authenticated
  using (
    vacancy_id in (
      select v.id from public.employer_vacancies v
      where v.employer_id in (select public.my_employer_scope())
    )
  );

drop policy if exists "Invites only to people the firm can see" on public.employer_vacancy_invitations;
create policy "Invites only to people the firm can see" on public.employer_vacancy_invitations
  as restrictive
  for insert to authenticated
  with check (public.employer_can_view_elec_id(electrician_profile_id));

drop policy if exists "Employer conversations only with people the firm can see" on public.employer_conversations;
create policy "Employer conversations only with people the firm can see" on public.employer_conversations
  as restrictive
  for insert to authenticated
  with check (
    -- the electrician starting their own conversation
    electrician_profile_id in (
      select ep.id
      from public.employer_elec_id_profiles ep
      join public.employer_employees ee on ee.id = ep.employee_id
      where ee.user_id = (select auth.uid())
    )
    -- or a firm writing to someone in the pool / who applied
    or public.employer_can_view_elec_id(electrician_profile_id)
  );

-- 8. A message to someone in the pool can be answered ----------------------
create or replace function public.talent_pool_conversation_can_reply()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if NEW.initiated_by = 'employer'
     and coalesce(NEW.electrician_can_reply, false) = false
     and exists (
       select 1 from public.employer_elec_id_profiles p
       where p.id = NEW.electrician_profile_id
         and p.available_for_hire = true
         and p.available_for_hire_opted_in_at is not null
         and coalesce(p.opt_out, false) = false
     ) then
    NEW.electrician_can_reply := true;
  end if;
  return NEW;
end;
$$;

revoke all on function public.talent_pool_conversation_can_reply() from public, anon, authenticated;

drop trigger if exists trg_talent_pool_conversation_can_reply on public.employer_conversations;
create trigger trg_talent_pool_conversation_can_reply
  before insert on public.employer_conversations
  for each row execute function public.talent_pool_conversation_can_reply();
