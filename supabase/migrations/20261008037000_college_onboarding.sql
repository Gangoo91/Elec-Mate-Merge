-- ELE-1855 / ELE-1899 / ELE-1900 — a college from nothing to a learner on the
-- roll with no SQL and no developer.
--
--   college_signup_offers   which discount codes a college's join codes carry at sign-up (ELE-1899)
--   college_setup_codes     one-time codes Elec-Mate issues so a tutor with a signed order can create their college (ELE-1855)
--   college_roster_imports  the audit trail of every bulk roster run, row by row (ELE-1900)
--
--   describe_join_code          signed-out sign-up: what a join code is and which discount it carries
--   issue_college_setup_code    platform admin issues a set-up code
--   check_college_setup_code    a signed-in user checks a set-up code before creating
--   create_college              platform admin, or a holder of a set-up code (who becomes its admin)
--   get_college_setup_status    the set-up checklist on the College Hub
--   dismiss_college_setup       hide the checklist
--   set_college_signup_offers   platform admin links a college to its discount codes
--   admin_list_hub_colleges     platform admin overview of hub colleges
--   college_roster_lookup       service role only: who already exists for a list of emails

begin;

-- ─── Tables ──────────────────────────────────────────────────────────────

create table if not exists public.college_signup_offers (
  college_id       uuid primary key references public.colleges(id) on delete cascade,
  apprentice_code  text,
  electrician_code text,
  updated_by       uuid references auth.users(id) on delete set null,
  updated_at       timestamptz not null default now()
);
alter table public.college_signup_offers enable row level security;
comment on table public.college_signup_offers is
  '[COLLEGE ↔ BILLING] The discount codes (promo_offers.code) a college''s cohort join codes apply at sign-up, one per plan. Scope: one row per college. Used by: describe_join_code (SignUp "College or cohort code"), Admin → Colleges → Hub colleges. Rule: written only by platform admins through set_college_signup_offers; nobody reads it directly (RLS denies all), the codes reach sign-up only through describe_join_code.';

create table if not exists public.college_setup_codes (
  id          uuid primary key default gen_random_uuid(),
  code        text not null unique,
  org_name    text not null,
  email       text,
  expires_at  timestamptz not null,
  created_by  uuid references auth.users(id) on delete set null,
  created_at  timestamptz not null default now(),
  used_by     uuid references auth.users(id) on delete set null,
  used_at     timestamptz,
  college_id  uuid references public.colleges(id) on delete set null,
  revoked_at  timestamptz
);
alter table public.college_setup_codes enable row level security;
comment on table public.college_setup_codes is
  '[COLLEGE] One-time codes Elec-Mate issues to a college with a signed order so its lead can create the college in the product (/college/setup). Scope: platform. Used by: Admin → Colleges → Hub colleges, CollegeSetupPage, create_college. Rule: issued only by platform admins (issue_college_setup_code); single use, expiring, optionally locked to one email; creating a college makes the holder its admin, which grants free staff access, so a college can never be self-created without one.';

drop policy if exists "Platform admins read setup codes" on public.college_setup_codes;
create policy "Platform admins read setup codes" on public.college_setup_codes
  for select to authenticated using (public._is_platform_admin());

create table if not exists public.college_roster_imports (
  id          uuid primary key default gen_random_uuid(),
  college_id  uuid not null references public.colleges(id) on delete cascade,
  run_by      uuid references auth.users(id) on delete set null,
  kind        text not null check (kind in ('learners', 'staff')),
  total       integer not null default 0,
  created     integer not null default 0,
  matched     integer not null default 0,
  already     integer not null default 0,
  skipped     integer not null default 0,
  failed      integer not null default 0,
  emailed     integer not null default 0,
  items       jsonb not null default '[]'::jsonb,
  created_at  timestamptz not null default now()
);
create index if not exists idx_college_roster_imports_college on public.college_roster_imports (college_id, created_at desc);
alter table public.college_roster_imports enable row level security;
comment on table public.college_roster_imports is
  '[COLLEGE] Audit trail of each bulk roster run (learners or staff): who ran it, the counts, and every row with its outcome (created / matched / already / skipped / failed, emailed or not). Scope: per college. Used by: college-roster-import edge function (writes), BulkAddStudentsSheet + StaffRosterSheet (result). Rule: written only by the edge function with the service role; same-college staff and platform admins read; never edited.';

drop policy if exists "College staff read roster imports" on public.college_roster_imports;
create policy "College staff read roster imports" on public.college_roster_imports
  for select to authenticated using (public._review_staff_can(college_id));

revoke all on public.college_signup_offers from anon, authenticated;
revoke all on public.college_setup_codes from anon;
revoke insert, update, delete on public.college_setup_codes from authenticated;
revoke all on public.college_roster_imports from anon;
revoke insert, update, delete on public.college_roster_imports from authenticated;

-- ─── describe_join_code — signed out, for the sign-up page ───────────────

create or replace function public.describe_join_code(p_code text)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_code   text := upper(btrim(coalesce(p_code, '')));
  v_inv    record;
  v_offer  record;
  v_app    text;
  v_elec   text;
begin
  if v_code !~ '^[A-Z0-9]{4,16}$' then
    return jsonb_build_object('valid', false);
  end if;

  select i.id, i.invite_type, i.college_id, i.cohort_id, i.course_id, i.is_active,
         i.expires_at, i.max_uses, i.use_count,
         c.name as college_name, c.is_active as college_active,
         co.name as cohort_name, cc.name as course_name
    into v_inv
    from college_invites i
    join colleges c on c.id = i.college_id
    left join college_cohorts co on co.id = i.cohort_id
    left join college_courses cc on cc.id = coalesce(i.course_id, co.course_id)
   where i.invite_code = v_code;

  if not found
     or not coalesce(v_inv.is_active, false)
     or not coalesce(v_inv.college_active, false)
     or (v_inv.expires_at is not null and v_inv.expires_at <= now())
     or (v_inv.max_uses is not null and v_inv.use_count >= v_inv.max_uses) then
    return jsonb_build_object('valid', false);
  end if;

  -- Discount codes only for learner codes, and only while the promo row is live.
  if v_inv.invite_type = 'student' then
    select so.apprentice_code, so.electrician_code into v_offer
      from college_signup_offers so where so.college_id = v_inv.college_id;
    if found then
      select code into v_app from promo_offers
       where code = v_offer.apprentice_code and is_active
         and (expires_at is null or expires_at > now());
      select code into v_elec from promo_offers
       where code = v_offer.electrician_code and is_active
         and (expires_at is null or expires_at > now());
    end if;
  end if;

  return jsonb_build_object(
    'valid', true,
    'code', v_code,
    'invite_type', v_inv.invite_type,
    'college_name', v_inv.college_name,
    'cohort_name', v_inv.cohort_name,
    'course_name', v_inv.course_name,
    'apprentice_offer', v_app,
    'electrician_offer', v_elec
  );
end;
$$;
revoke all on function public.describe_join_code(text) from public;
grant execute on function public.describe_join_code(text) to anon, authenticated;

-- ─── Set-up codes ────────────────────────────────────────────────────────

create or replace function public._college_code_alphabet_gen(p_len int)
returns text
language plpgsql
volatile
set search_path = public
as $$
declare
  a text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  o text := '';
  b bytea := extensions.gen_random_bytes(p_len);
begin
  for i in 0 .. p_len - 1 loop
    o := o || substr(a, (get_byte(b, i) % 32) + 1, 1);
  end loop;
  return o;
end;
$$;
revoke all on function public._college_code_alphabet_gen(int) from public, anon, authenticated;

create or replace function public.issue_college_setup_code(p_org_name text, p_email text default null, p_days int default 14)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_code text;
  v_row  college_setup_codes;
begin
  if not public._is_platform_admin() then
    raise exception 'Only Elec-Mate can issue a college set-up code' using errcode = '42501';
  end if;
  if coalesce(btrim(p_org_name), '') = '' then
    raise exception 'Give the college name';
  end if;
  if p_email is not null and btrim(p_email) <> '' and btrim(p_email) !~ '^[^\s@]+@[^\s@]+\.[^\s@]+$' then
    raise exception 'That email does not look right';
  end if;
  loop
    v_code := 'SETUP-' || public._college_code_alphabet_gen(8);
    exit when not exists (select 1 from college_setup_codes where code = v_code);
  end loop;
  insert into college_setup_codes (code, org_name, email, expires_at, created_by)
  values (v_code, btrim(p_org_name), nullif(lower(btrim(coalesce(p_email, ''))), ''),
          now() + make_interval(days => greatest(1, least(coalesce(p_days, 14), 90))), auth.uid())
  returning * into v_row;
  return jsonb_build_object('code', v_row.code, 'org_name', v_row.org_name, 'email', v_row.email,
                            'expires_at', v_row.expires_at);
end;
$$;
revoke all on function public.issue_college_setup_code(text, text, int) from public, anon;
grant execute on function public.issue_college_setup_code(text, text, int) to authenticated;

create or replace function public.revoke_college_setup_code(p_code text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public._is_platform_admin() then
    raise exception 'Only Elec-Mate can revoke a set-up code' using errcode = '42501';
  end if;
  update college_setup_codes set revoked_at = now()
   where code = upper(btrim(p_code)) and used_at is null and revoked_at is null;
end;
$$;
revoke all on function public.revoke_college_setup_code(text) from public, anon;
grant execute on function public.revoke_college_setup_code(text) to authenticated;

-- Where the caller already belongs, if anywhere: one college per person.
create or replace function public._caller_college_membership()
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'staff_college', (select c.name from college_staff s join colleges c on c.id = s.college_id
                       where s.user_id = auth.uid() and s.archived_at is null limit 1),
    'learner_college', (select c.name from college_students s join colleges c on c.id = s.college_id
                         where s.user_id = auth.uid() limit 1)
  );
$$;
revoke all on function public._caller_college_membership() from public, anon, authenticated;

create or replace function public.check_college_setup_code(p_code text)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_row   college_setup_codes;
  v_email text;
  v_mem   jsonb;
begin
  if auth.uid() is null then
    return jsonb_build_object('valid', false, 'reason', 'Sign in first.');
  end if;
  select * into v_row from college_setup_codes where code = upper(btrim(coalesce(p_code, '')));
  if not found then
    return jsonb_build_object('valid', false, 'reason', 'That set-up code was not recognised. Check it with Elec-Mate.');
  end if;
  if v_row.revoked_at is not null then
    return jsonb_build_object('valid', false, 'reason', 'This set-up code has been withdrawn. Ask Elec-Mate for a new one.');
  end if;
  if v_row.used_at is not null then
    return jsonb_build_object('valid', false, 'reason', 'This set-up code has already been used to create a college.');
  end if;
  if v_row.expires_at <= now() then
    return jsonb_build_object('valid', false, 'reason', 'This set-up code has expired. Ask Elec-Mate for a new one.');
  end if;
  select lower(email) into v_email from auth.users where id = auth.uid();
  if v_row.email is not null and v_row.email <> v_email then
    return jsonb_build_object('valid', false, 'reason',
      format('This set-up code is for %s. Sign in with that email to use it.', v_row.email));
  end if;
  v_mem := public._caller_college_membership();
  if v_mem->>'staff_college' is not null then
    return jsonb_build_object('valid', false, 'reason',
      format('Your account is already staff at %s. One account belongs to one college.', v_mem->>'staff_college'));
  end if;
  if v_mem->>'learner_college' is not null then
    return jsonb_build_object('valid', false, 'reason',
      format('Your account is a learner at %s. Use a separate staff account to set up a college.', v_mem->>'learner_college'));
  end if;
  return jsonb_build_object('valid', true, 'org_name', v_row.org_name, 'expires_at', v_row.expires_at);
end;
$$;
revoke all on function public.check_college_setup_code(text) from public, anon;
grant execute on function public.check_college_setup_code(text) to authenticated;

-- ─── create_college ──────────────────────────────────────────────────────

create or replace function public.create_college(
  p_name text,
  p_code text,
  p_awarding_bodies text[] default null,
  p_city text default null,
  p_setup_code text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid     uuid := auth.uid();
  v_admin   boolean := public._is_platform_admin();
  v_check   jsonb;
  v_name    text := btrim(coalesce(p_name, ''));
  v_code    text := upper(regexp_replace(coalesce(p_code, ''), '\s', '', 'g'));
  v_college uuid;
  v_email   text;
  v_full    text;
  v_staff   uuid;
begin
  if v_uid is null then
    raise exception 'Sign in first' using errcode = '42501';
  end if;
  if length(v_name) < 3 or length(v_name) > 120 then
    raise exception 'Give the college''s full name';
  end if;
  if v_code !~ '^[A-Z0-9]{2,12}$' then
    raise exception 'The short code is 2 to 12 letters or numbers, for example KENDAL';
  end if;
  if exists (select 1 from colleges where upper(code) = v_code) then
    raise exception 'The short code % is taken. Try another.', v_code using errcode = '23505';
  end if;

  if not v_admin then
    v_check := public.check_college_setup_code(p_setup_code);
    if not coalesce((v_check->>'valid')::boolean, false) then
      raise exception '%', coalesce(v_check->>'reason', 'A set-up code from Elec-Mate is needed to create a college') using errcode = '42501';
    end if;
  end if;

  insert into colleges (name, code, awarding_bodies, city, is_active)
  values (v_name, v_code,
          (select array_agg(distinct btrim(b)) from unnest(coalesce(p_awarding_bodies, '{}'::text[])) b where btrim(b) <> ''),
          nullif(btrim(coalesce(p_city, '')), ''), true)
  returning id into v_college;

  if not v_admin then
    -- The holder of the code becomes the college's first admin. The staff
    -- trigger (tg_sync_staff_profile) sets profiles.college_id / college_role
    -- and the free staff access.
    select email into v_email from auth.users where id = v_uid;
    select full_name into v_full from profiles where id = v_uid;
    insert into college_staff (college_id, user_id, name, email, role, status)
    values (v_college, v_uid, coalesce(nullif(btrim(v_full), ''), v_email, 'College admin'), coalesce(v_email, ''), 'admin', 'Active')
    returning id into v_staff;

    update college_setup_codes
       set used_by = v_uid, used_at = now(), college_id = v_college
     where code = upper(btrim(p_setup_code));
  end if;

  return jsonb_build_object('college_id', v_college, 'code', v_code, 'name', v_name, 'staff_id', v_staff);
end;
$$;
revoke all on function public.create_college(text, text, text[], text, text) from public, anon;
grant execute on function public.create_college(text, text, text[], text, text) to authenticated;

-- ─── The set-up checklist ────────────────────────────────────────────────

create or replace function public.get_college_setup_status(p_college uuid default null)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_college uuid := coalesce(p_college,
    (select college_id from college_staff where user_id = auth.uid() and archived_at is null order by created_at limit 1));
  v_c       record;
  v_res     jsonb;
begin
  if v_college is null or not public._review_staff_can(v_college) then
    return null;
  end if;
  select id, name, code, awarding_bodies, city, settings into v_c from colleges where id = v_college;

  select jsonb_build_object(
    'college_id', v_c.id,
    'college_name', v_c.name,
    'college_code', v_c.code,
    'dismissed', coalesce((v_c.settings->>'setup_dismissed')::boolean, false),
    'details_done', coalesce(array_length(v_c.awarding_bodies, 1), 0) > 0,
    'courses', (select count(*) from college_courses where college_id = v_college and lower(coalesce(status, 'active')) = 'active'),
    'cohorts', (select count(*) from college_cohorts where college_id = v_college and lower(coalesce(status, 'active')) = 'active'),
    'join_codes', (select count(*) from college_invites
                    where college_id = v_college and invite_type = 'student' and is_active
                      and (expires_at is null or expires_at > now())),
    'staff', (select count(*) from college_staff where college_id = v_college and archived_at is null),
    'staff_linked', (select count(*) from college_staff where college_id = v_college and archived_at is null and user_id is not null),
    'learners', (select count(*) from college_students where college_id = v_college),
    'learners_linked', (select count(*) from college_students where college_id = v_college and user_id is not null),
    'registers', (select count(*) from college_attendance a join college_students s on s.id = a.student_id
                   where s.college_id = v_college),
    'can_manage', exists (select 1 from college_staff where college_id = v_college and user_id = auth.uid()
                           and archived_at is null and role in ('admin', 'head_of_department'))
                  or public._is_platform_admin()
  ) into v_res;
  return v_res;
end;
$$;
revoke all on function public.get_college_setup_status(uuid) from public, anon;
grant execute on function public.get_college_setup_status(uuid) to authenticated;

create or replace function public.dismiss_college_setup(p_college uuid, p_dismissed boolean default true)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public._review_staff_can(p_college) then
    raise exception 'Not staff at this college' using errcode = '42501';
  end if;
  update colleges
     set settings = coalesce(settings, '{}'::jsonb) || jsonb_build_object('setup_dismissed', coalesce(p_dismissed, true)),
         updated_at = now()
   where id = p_college;
end;
$$;
revoke all on function public.dismiss_college_setup(uuid, boolean) from public, anon;
grant execute on function public.dismiss_college_setup(uuid, boolean) to authenticated;

-- ─── Discount codes for a college's join codes ───────────────────────────

create or replace function public.set_college_signup_offers(p_college uuid, p_apprentice_code text, p_electrician_code text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_app  text := nullif(upper(btrim(coalesce(p_apprentice_code, ''))), '');
  v_elec text := nullif(upper(btrim(coalesce(p_electrician_code, ''))), '');
begin
  if not public._is_platform_admin() then
    raise exception 'Only Elec-Mate can link discount codes' using errcode = '42501';
  end if;
  if not exists (select 1 from colleges where id = p_college) then
    raise exception 'No such college';
  end if;
  if v_app is not null and not exists (select 1 from promo_offers where code = v_app and plan_id = 'apprentice') then
    raise exception 'No apprentice discount code called %', v_app;
  end if;
  if v_elec is not null and not exists (select 1 from promo_offers where code = v_elec and plan_id = 'electrician') then
    raise exception 'No electrician discount code called %', v_elec;
  end if;
  if v_app is null and v_elec is null then
    delete from college_signup_offers where college_id = p_college;
  else
    insert into college_signup_offers (college_id, apprentice_code, electrician_code, updated_by, updated_at)
    values (p_college, v_app, v_elec, auth.uid(), now())
    on conflict (college_id) do update
      set apprentice_code = excluded.apprentice_code,
          electrician_code = excluded.electrician_code,
          updated_by = excluded.updated_by,
          updated_at = now();
  end if;
  return jsonb_build_object('apprentice_code', v_app, 'electrician_code', v_elec);
end;
$$;
revoke all on function public.set_college_signup_offers(uuid, text, text) from public, anon;
grant execute on function public.set_college_signup_offers(uuid, text, text) to authenticated;

create or replace function public.admin_list_hub_colleges()
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if not public._is_platform_admin() then
    raise exception 'Platform admins only' using errcode = '42501';
  end if;
  return jsonb_build_object(
    'colleges', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', c.id, 'name', c.name, 'code', c.code, 'is_active', c.is_active, 'created_at', c.created_at,
        'staff', (select count(*) from college_staff s where s.college_id = c.id and s.archived_at is null),
        'learners', (select count(*) from college_students s where s.college_id = c.id),
        'learners_linked', (select count(*) from college_students s where s.college_id = c.id and s.user_id is not null),
        'apprentice_code', so.apprentice_code,
        'electrician_code', so.electrician_code
      ) order by c.created_at desc)
      from colleges c left join college_signup_offers so on so.college_id = c.id), '[]'::jsonb),
    'setup_codes', coalesce((
      select jsonb_agg(jsonb_build_object(
        'code', sc.code, 'org_name', sc.org_name, 'email', sc.email, 'expires_at', sc.expires_at,
        'used_at', sc.used_at, 'revoked_at', sc.revoked_at, 'created_at', sc.created_at,
        'college_name', (select name from colleges where id = sc.college_id)
      ) order by sc.created_at desc)
      from college_setup_codes sc), '[]'::jsonb)
  );
end;
$$;
revoke all on function public.admin_list_hub_colleges() from public, anon;
grant execute on function public.admin_list_hub_colleges() to authenticated;

-- ─── Service-role lookup for the roster function ─────────────────────────
-- For each email: the auth account (if any), and where that person already
-- sits — on this college's roll / staff list, or another college's.

create or replace function public.college_roster_lookup(p_college uuid, p_emails text[])
returns table (
  email text,
  user_id uuid,
  roll_id uuid,
  roll_user_id uuid,
  roll_cohort_id uuid,
  roll_course_id uuid,
  staff_id uuid,
  staff_user_id uuid,
  other_learner_college text,
  other_staff_college text
)
language sql
stable
security definer
set search_path = public
as $$
  with e as (select distinct lower(btrim(x)) as email from unnest(p_emails) x where btrim(coalesce(x, '')) <> '')
  select e.email,
         u.id,
         r.id, r.user_id, r.cohort_id, r.course_id,
         st.id, st.user_id,
         (select c.name from college_students s2 join colleges c on c.id = s2.college_id
           where u.id is not null and s2.user_id = u.id and s2.college_id <> p_college limit 1),
         (select c.name from college_staff s3 join colleges c on c.id = s3.college_id
           where u.id is not null and s3.user_id = u.id and s3.college_id <> p_college and s3.archived_at is null limit 1)
    from e
    left join auth.users u on lower(u.email) = e.email
    left join lateral (
      select s.id, s.user_id, s.cohort_id, s.course_id from college_students s
       where s.college_id = p_college
         and (lower(btrim(s.email)) = e.email or (u.id is not null and s.user_id = u.id))
       order by (s.user_id is not null) desc, s.created_at limit 1) r on true
    left join lateral (
      select s.id, s.user_id from college_staff s
       where s.college_id = p_college and s.archived_at is null
         and (lower(btrim(s.email)) = e.email or (u.id is not null and s.user_id = u.id))
       order by (s.user_id is not null) desc, s.created_at limit 1) st on true;
$$;
revoke all on function public.college_roster_lookup(uuid, text[]) from public, anon, authenticated;
grant execute on function public.college_roster_lookup(uuid, text[]) to service_role;

commit;
