-- ELE-1984 Fleet: the driver does the daily walk-round on their phone, defects
-- reach the office with photos, a van can be taken off the road, and the
-- MOT / tax / insurance / service reminders deep-link to the exact vehicle.
--
--   * vehicle_checks gains who submitted it, the per-item defects (note +
--     photos), an off-road flag, a kind (daily walk-round or a one-off
--     problem report) and a resolution trail.
--   * vehicles gains why/when it went off the road.
--   * Private bucket vehicle-check-photos: <vehicle_id>/<uuid>.<ext>. The
--     office (my_employer_scope) and the van's assigned driver can upload and
--     read; nobody else. Read through signed URLs only.
--   * submit_vehicle_check / get_my_vans / resolve_vehicle_defect.
--   * employer_expiry_items: vehicle reminders now route to ?vehicle=<id>.
--   * get_employer_home: Service joins MOT/tax/insurance, off-road vans stop
--     nagging, the first item carries its vehicle id, and open defects count.

-- ------------------------------------------------------------------ columns
alter table public.vehicle_checks
  add column if not exists submitted_by uuid references auth.users(id) on delete set null,
  add column if not exists check_kind text not null default 'daily',
  add column if not exists defect_items jsonb not null default '[]'::jsonb,
  add column if not exists off_road boolean not null default false,
  add column if not exists resolved_at timestamptz,
  add column if not exists resolved_by uuid references auth.users(id) on delete set null,
  add column if not exists resolution_note text;

do $$ begin
  alter table public.vehicle_checks
    add constraint vehicle_checks_kind_check check (check_kind in ('daily', 'defect'));
exception when duplicate_object then null; end $$;

alter table public.vehicles
  add column if not exists off_road_reason text,
  add column if not exists off_road_at timestamptz;

-- Removing someone from the roster must not be blocked by the van they drove.
alter table public.vehicles drop constraint if exists vehicles_driver_id_fkey;
alter table public.vehicles
  add constraint vehicles_driver_id_fkey foreign key (driver_id)
  references public.employer_employees(id) on delete set null;
alter table public.vehicle_checks drop constraint if exists vehicle_checks_driver_id_fkey;
alter table public.vehicle_checks
  add constraint vehicle_checks_driver_id_fkey foreign key (driver_id)
  references public.employer_employees(id) on delete set null;

create index if not exists vehicle_checks_vehicle_date_idx
  on public.vehicle_checks (vehicle_id, check_date desc);
create index if not exists vehicle_checks_open_defects_idx
  on public.vehicle_checks (vehicle_id) where defects_found and resolved_at is null;
create index if not exists vehicles_driver_idx on public.vehicles (driver_id) where driver_id is not null;

comment on table public.vehicles is
  '[EMPLOYER HUB] Company vans and cars. Scope: user_id = the owning account (for a firm: the owner''s profiles.id); firm managers reach it via my_employer_scope(); the assigned driver (driver_id → employer_employees) reads it only through get_my_vans(). Used by: Employer Hub Fleet, Worker Tools My van. Rule: off-road vans (status ''Off Road'') drop out of expiry reminders.';
comment on table public.vehicle_checks is
  '[EMPLOYER HUB] Daily walk-round checks and driver problem reports. Scope: vehicle_id → vehicles (user_id = the firm). Used by: Fleet, Worker Tools My van. Rule: drivers write only through submit_vehicle_check(); defect photos live in the private vehicle-check-photos bucket (signed URLs); resolved_at closes a defect.';

-- ---------------------------------------------------------------- access
-- 'office' = the firm owner or an active co-admin of any role; 'driver' = the
-- active roster member the vehicle is assigned to; null = nobody.
create or replace function public._vehicle_access(p_vehicle uuid)
returns text language sql stable security definer set search_path = public as $$
  select case
    when auth.uid() is null or p_vehicle is null then null
    when exists (select 1 from public.vehicles v
                  where v.id = p_vehicle
                    and v.user_id in (select public.my_employer_scope())) then 'office'
    when exists (select 1 from public.vehicles v
                   join public.employer_employees e on e.id = v.driver_id
                  where v.id = p_vehicle
                    and e.user_id = auth.uid()
                    and e.employer_id = v.user_id
                    and lower(coalesce(e.status, '')) = 'active') then 'driver'
    else null end
$$;

-- --------------------------------------------------------------- storage
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('vehicle-check-photos', 'vehicle-check-photos', false, 10485760,
        array['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'])
on conflict (id) do update
  set public = false, file_size_limit = 10485760,
      allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];

create or replace function public._vehicle_photo_ok(p_name text)
returns boolean language sql stable security definer set search_path = public as $$
  select case
    when coalesce(p_name, '') ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/[0-9a-f-]{36}\.(jpg|jpeg|png|webp|heic|heif)$'
      then public._vehicle_access(split_part(p_name, '/', 1)::uuid) is not null
    else false end
$$;

create or replace function public._vehicle_photo_unreferenced(p_name text)
returns boolean language sql stable security definer set search_path = public as $$
  select not exists (select 1 from public.vehicle_checks c where p_name = any (c.defect_photos))
$$;

drop policy if exists "Fleet uploads walk-round photos" on storage.objects;
create policy "Fleet uploads walk-round photos" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'vehicle-check-photos' and public._vehicle_photo_ok(name));

drop policy if exists "Fleet reads walk-round photos" on storage.objects;
create policy "Fleet reads walk-round photos" on storage.objects
  for select to authenticated
  using (bucket_id = 'vehicle-check-photos' and public._vehicle_photo_ok(name));

-- A photo taken then removed before the check is sent: the uploader may
-- delete it while no check points at it.
drop policy if exists "Fleet removes unsent walk-round photos" on storage.objects;
create policy "Fleet removes unsent walk-round photos" on storage.objects
  for delete to authenticated
  using (bucket_id = 'vehicle-check-photos'
         and owner_id = auth.uid()::text
         and public._vehicle_photo_ok(name)
         and public._vehicle_photo_unreferenced(name));

-- ------------------------------------------------------- check item labels
create or replace function public._vehicle_check_label(p_key text)
returns text language sql immutable set search_path = public as $$
  select case p_key
    when 'tyres_ok' then 'Tyres'
    when 'lights_ok' then 'Lights'
    when 'mirrors_ok' then 'Mirrors'
    when 'bodywork_ok' then 'Bodywork'
    when 'windscreen_ok' then 'Windscreen'
    when 'wipers_ok' then 'Wipers'
    when 'registration_visible' then 'Number plates'
    when 'oil_level_ok' then 'Oil'
    when 'coolant_ok' then 'Coolant'
    when 'washer_fluid_ok' then 'Washer fluid'
    when 'horn_ok' then 'Horn'
    when 'seatbelt_ok' then 'Seatbelts'
    when 'dashboard_warnings' then 'Warning lights'
    when 'first_aid_kit' then 'First aid kit'
    when 'fire_extinguisher' then 'Fire extinguisher'
    else 'Other problem' end
$$;

-- ------------------------------------------------------ submit_vehicle_check
-- p_results: {"tyres_ok": true, ...} where true ALWAYS means "fine" (for
-- dashboard_warnings, true = no warning lights; stored inverted as before).
-- p_defects: [{"key": "tyres_ok" | "other", "note": "...", "photos": ["<vehicle>/<uuid>.jpg"]}]
-- Every failed item needs a defect entry with at least one photo.
-- p_kind 'daily' answers every item; 'defect' is a one-off problem report.
-- Refusals raise 'vehicle_check:<reason>'.
create or replace function public.submit_vehicle_check(
  p_vehicle uuid,
  p_mileage integer default null,
  p_results jsonb default '{}'::jsonb,
  p_defects jsonb default '[]'::jsonb,
  p_off_road boolean default false,
  p_notes text default null,
  p_kind text default 'daily'
) returns jsonb
language plpgsql security definer set search_path = public as $$
declare
  v public.vehicles%rowtype;
  v_access text;
  v_keys constant text[] := array['tyres_ok','lights_ok','mirrors_ok','bodywork_ok','windscreen_ok',
    'wipers_ok','registration_visible','oil_level_ok','coolant_ok','washer_fluid_ok','horn_ok',
    'seatbelt_ok','dashboard_warnings','first_aid_kit','fire_extinguisher'];
  v_ok jsonb := '{}'::jsonb;
  k text;
  v_failed text[] := '{}';
  d jsonb;
  v_items jsonb := '[]'::jsonb;
  v_photos text[] := '{}';
  v_item_photos text[];
  v_p text;
  v_def_keys text[] := '{}';
  v_status text;
  v_id uuid;
  v_emp_id uuid;
  v_who text;
  v_now timestamp := now() at time zone 'Europe/London';
  v_labels text;
  v_n int;
  v_reg text;
  v_noun text;
begin
  if auth.uid() is null then
    raise exception 'vehicle_check:not_signed_in' using errcode = '42501';
  end if;
  if p_kind not in ('daily', 'defect') then
    raise exception 'vehicle_check:bad_kind' using errcode = '22023';
  end if;

  select * into v from public.vehicles where id = p_vehicle;
  if not found then
    raise exception 'vehicle_check:not_found' using errcode = '42501';
  end if;
  v_access := public._vehicle_access(p_vehicle);
  if v_access is null then
    raise exception 'vehicle_check:not_allowed' using errcode = '42501';
  end if;

  if p_mileage is not null and (p_mileage < 0 or p_mileage > 2000000) then
    raise exception 'vehicle_check:bad_mileage' using errcode = '22023';
  end if;

  -- Answers: a daily check answers every item; a problem report answers none.
  foreach k in array v_keys loop
    if p_kind = 'daily' then
      if jsonb_typeof(coalesce(p_results, '{}'::jsonb) -> k) is distinct from 'boolean' then
        raise exception 'vehicle_check:unanswered:%', k using errcode = '22023';
      end if;
      v_ok := v_ok || jsonb_build_object(k, (p_results ->> k)::boolean);
      if not (p_results ->> k)::boolean then
        v_failed := v_failed || k;
      end if;
    else
      v_ok := v_ok || jsonb_build_object(k, true);
    end if;
  end loop;

  if jsonb_typeof(coalesce(p_defects, '[]'::jsonb)) <> 'array' then
    raise exception 'vehicle_check:bad_defects' using errcode = '22023';
  end if;

  for d in select * from jsonb_array_elements(coalesce(p_defects, '[]'::jsonb)) loop
    k := d ->> 'key';
    if k is null or not (k = 'other' or k = any (v_keys)) then
      raise exception 'vehicle_check:bad_defect_key' using errcode = '22023';
    end if;
    if k <> 'other' and k = any (v_def_keys) then
      raise exception 'vehicle_check:duplicate_defect' using errcode = '22023';
    end if;
    if p_kind = 'daily' and k <> 'other' and not (k = any (v_failed)) then
      raise exception 'vehicle_check:defect_on_passed_item' using errcode = '22023';
    end if;
    if k = 'other' and nullif(btrim(coalesce(d ->> 'note', '')), '') is null then
      raise exception 'vehicle_check:other_needs_note' using errcode = '22023';
    end if;
    select coalesce(array_agg(x), '{}') into v_item_photos
      from jsonb_array_elements_text(case when jsonb_typeof(d -> 'photos') = 'array'
                                          then d -> 'photos' else '[]'::jsonb end) x;
    if cardinality(v_item_photos) = 0 then
      raise exception 'vehicle_check:photo_required:%', k using errcode = '22023';
    end if;
    if cardinality(v_item_photos) > 6 then
      raise exception 'vehicle_check:too_many_photos' using errcode = '22023';
    end if;
    foreach v_p in array v_item_photos loop
      if split_part(v_p, '/', 1) <> p_vehicle::text or not public._vehicle_photo_ok(v_p)
         or not exists (select 1 from storage.objects o
                         where o.bucket_id = 'vehicle-check-photos' and o.name = v_p) then
        raise exception 'vehicle_check:bad_photo' using errcode = '22023';
      end if;
    end loop;
    v_def_keys := v_def_keys || k;
    v_photos := v_photos || v_item_photos;
    v_items := v_items || jsonb_build_array(jsonb_build_object(
      'key', k,
      'label', public._vehicle_check_label(k),
      'note', nullif(left(btrim(coalesce(d ->> 'note', '')), 1000), ''),
      'photos', to_jsonb(v_item_photos)));
  end loop;

  -- Every failed item must carry its defect (with a photo).
  foreach k in array v_failed loop
    if not (k = any (v_def_keys)) then
      raise exception 'vehicle_check:photo_required:%', k using errcode = '22023';
    end if;
  end loop;

  v_n := jsonb_array_length(v_items);
  if p_kind = 'defect' and v_n = 0 then
    raise exception 'vehicle_check:no_problem' using errcode = '22023';
  end if;
  if p_off_road and v_n = 0 then
    raise exception 'vehicle_check:off_road_needs_problem' using errcode = '22023';
  end if;

  v_status := case when p_off_road then 'fail'
                   when v_n = 0 then 'pass'
                   when v_n > 3 then 'major_defects'
                   else 'minor_defects' end;

  select e.id, e.name into v_emp_id, v_who
    from public.employer_employees e
   where e.user_id = auth.uid() and e.employer_id = v.user_id
     and lower(coalesce(e.status, '')) = 'active'
   order by e.created_at limit 1;
  if v_who is null then
    select nullif(btrim(p.full_name), '') into v_who from public.profiles p where p.id = auth.uid();
  end if;

  insert into public.vehicle_checks (
    user_id, vehicle_id, driver_id, submitted_by, check_kind, check_date, check_time, mileage,
    tyres_ok, lights_ok, mirrors_ok, bodywork_ok, windscreen_ok, wipers_ok, registration_visible,
    oil_level_ok, coolant_ok, washer_fluid_ok, horn_ok, seatbelt_ok, dashboard_warnings,
    first_aid_kit, fire_extinguisher,
    defects_found, defect_details, defect_photos, defect_items, off_road, status, notes)
  values (
    v.user_id, v.id, v_emp_id, auth.uid(), p_kind, v_now::date, v_now::time, p_mileage,
    (v_ok->>'tyres_ok')::boolean, (v_ok->>'lights_ok')::boolean, (v_ok->>'mirrors_ok')::boolean,
    (v_ok->>'bodywork_ok')::boolean, (v_ok->>'windscreen_ok')::boolean, (v_ok->>'wipers_ok')::boolean,
    (v_ok->>'registration_visible')::boolean, (v_ok->>'oil_level_ok')::boolean,
    (v_ok->>'coolant_ok')::boolean, (v_ok->>'washer_fluid_ok')::boolean, (v_ok->>'horn_ok')::boolean,
    (v_ok->>'seatbelt_ok')::boolean, not (v_ok->>'dashboard_warnings')::boolean,
    (v_ok->>'first_aid_kit')::boolean, (v_ok->>'fire_extinguisher')::boolean,
    v_n > 0,
    case when v_n > 0 then (
      select string_agg(i->>'label' || coalesce(': ' || (i->>'note'), ''), '; ')
        from jsonb_array_elements(v_items) i) end,
    case when cardinality(v_photos) > 0 then v_photos end,
    v_items, coalesce(p_off_road, false), v_status,
    nullif(left(btrim(coalesce(p_notes, '')), 2000), ''))
  returning id into v_id;

  update public.vehicles
     set mileage = greatest(coalesce(mileage, 0), coalesce(p_mileage, 0)),
         status = case when p_off_road then 'Off Road' else status end,
         off_road_reason = case when p_off_road then (
             select string_agg(i->>'label' || coalesce(': ' || (i->>'note'), ''), '; ')
               from jsonb_array_elements(v_items) i) else off_road_reason end,
         off_road_at = case when p_off_road then now() else off_road_at end,
         updated_at = now()
   where id = v.id;

  -- Tell the office when a driver finds something. The office reporting its
  -- own find does not need a bell.
  if v_n > 0 and v_access = 'driver' then
    v_reg := coalesce(nullif(btrim(v.registration), ''), 'a vehicle');
    v_noun := coalesce(initcap(nullif(btrim(v.vehicle_type), '')), 'Van');
    select string_agg(i->>'label', ', ') into v_labels from jsonb_array_elements(v_items) i;
    perform public.notify_employer_bell(
      v.user_id,
      'vehicle_defect',
      case when p_off_road then v_noun || ' off the road · ' || v_reg
           else v_noun || ' defect · ' || v_reg end,
      coalesce(v_who, 'The driver') || ' reported '
        || case when v_n = 1 then 'a problem' else v_n || ' problems' end
        || case when p_kind = 'daily' then ' on the daily check: ' else ': ' end
        || v_labels || '. '
        || case when p_off_road then 'They have taken it off the road.'
                else 'They said it is safe to drive.' end,
      jsonb_strip_nulls(jsonb_build_object(
        'route', '/employer?section=fleet&vehicle=' || v.id,
        'vehicle_id', v.id,
        'check_id', v_id,
        'employee_id', v_emp_id,
        'off_road', coalesce(p_off_road, false))));
  end if;

  return jsonb_build_object('id', v_id, 'status', v_status, 'defects', v_n,
                            'off_road', coalesce(p_off_road, false));
end;
$$;

-- -------------------------------------------------------------- get_my_vans
-- The vehicles assigned to the caller (an active roster member), with today's
-- check, open problems and the last week of checks. Nothing else.
create or replace function public.get_my_vans()
returns jsonb
language sql stable security definer set search_path = public as $$
  with today as (select (now() at time zone 'Europe/London')::date as d),
  mine as (
    select v.*, cp.company_name
      from public.vehicles v
      join public.employer_employees e on e.id = v.driver_id
      left join public.company_profiles cp on cp.user_id = v.user_id
     where auth.uid() is not null
       and e.user_id = auth.uid()
       and e.employer_id = v.user_id
       and lower(coalesce(e.status, '')) = 'active'
  )
  select coalesce(jsonb_agg(jsonb_build_object(
    'id', m.id,
    'registration', m.registration,
    'make', m.make,
    'model', m.model,
    'colour', m.colour,
    'vehicle_type', m.vehicle_type,
    'mileage', m.mileage,
    'status', m.status,
    'off_road_reason', m.off_road_reason,
    'off_road_at', m.off_road_at,
    'firm_name', nullif(btrim(coalesce(m.company_name, '')), ''),
    'mot_expiry', m.mot_expiry,
    'tax_expiry', m.tax_expiry,
    'insurance_expiry', m.insurance_expiry,
    'next_service', m.next_service,
    'today', (select jsonb_build_object('id', c.id, 'time', to_char(c.check_time, 'HH24:MI'),
                       'status', c.status, 'defects', jsonb_array_length(c.defect_items))
                from public.vehicle_checks c, today t
               where c.vehicle_id = m.id and c.check_kind = 'daily' and c.check_date = t.d
               order by c.created_at desc limit 1),
    'open_defects', coalesce((
      select jsonb_agg(jsonb_build_object('check_id', c.id, 'date', c.check_date,
               'time', to_char(c.check_time, 'HH24:MI'), 'items', c.defect_items,
               'off_road', c.off_road) order by c.created_at desc)
        from public.vehicle_checks c
       where c.vehicle_id = m.id and c.defects_found and c.resolved_at is null), '[]'::jsonb),
    'recent', coalesce((
      select jsonb_agg(x order by x->>'at' desc) from (
        select jsonb_build_object('id', c.id, 'kind', c.check_kind, 'date', c.check_date,
                 'time', to_char(c.check_time, 'HH24:MI'), 'status', c.status,
                 'defects', jsonb_array_length(c.defect_items),
                 'resolved', c.resolved_at is not null,
                 'by', coalesce(e.name, 'Office'),
                 'at', c.created_at) x
          from public.vehicle_checks c
          left join public.employer_employees e on e.id = c.driver_id
         where c.vehicle_id = m.id
         order by c.created_at desc limit 7) r), '[]'::jsonb)
  ) order by m.registration), '[]'::jsonb)
  from mine m
$$;

-- --------------------------------------------------- resolve_vehicle_defect
create or replace function public.resolve_vehicle_defect(
  p_check uuid, p_note text default null, p_back_on_road boolean default false
) returns void
language plpgsql security definer set search_path = public as $$
declare
  c public.vehicle_checks%rowtype;
begin
  select * into c from public.vehicle_checks where id = p_check;
  if not found or public._vehicle_access(c.vehicle_id) is distinct from 'office' then
    raise exception 'vehicle_check:not_allowed' using errcode = '42501';
  end if;
  update public.vehicle_checks
     set resolved_at = now(), resolved_by = auth.uid(),
         resolution_note = nullif(left(btrim(coalesce(p_note, '')), 1000), '')
   where id = p_check and resolved_at is null;
  if p_back_on_road then
    update public.vehicles
       set status = 'Active', off_road_reason = null, off_road_at = null, updated_at = now()
     where id = c.vehicle_id and status = 'Off Road';
  end if;
end;
$$;

revoke all on function public._vehicle_access(uuid) from public, anon;
revoke all on function public._vehicle_photo_ok(text) from public, anon;
revoke all on function public._vehicle_photo_unreferenced(text) from public, anon;
revoke all on function public._vehicle_check_label(text) from public, anon;
revoke all on function public.submit_vehicle_check(uuid, integer, jsonb, jsonb, boolean, text, text) from public, anon;
revoke all on function public.get_my_vans() from public, anon;
revoke all on function public.resolve_vehicle_defect(uuid, text, boolean) from public, anon;
grant execute on function public._vehicle_access(uuid) to authenticated;
grant execute on function public._vehicle_photo_ok(text) to authenticated;
grant execute on function public._vehicle_photo_unreferenced(text) to authenticated;
grant execute on function public._vehicle_check_label(text) to authenticated;
grant execute on function public.submit_vehicle_check(uuid, integer, jsonb, jsonb, boolean, text, text) to authenticated;
grant execute on function public.get_my_vans() to authenticated;
grant execute on function public.resolve_vehicle_defect(uuid, text, boolean) to authenticated;

-- ------------------------------------------------------ notification type
insert into public.notification_types (type, category, push, importance)
values ('vehicle_defect', 'tasks_projects', true, 2)
on conflict (type) do nothing;

-- ----------------------------------------- reminders: deep link the vehicle
-- Surgical edit of the live definitions so concurrent changes elsewhere in
-- these functions are kept. Each edit must match exactly once.
do $do$
declare
  v_def text;
  v_new text;
begin
  select pg_get_functiondef('public.employer_expiry_items()'::regprocedure) into v_def;
  if position('''/employer?section=fleet&vehicle='' || v.id' in v_def) = 0 then
    v_new := replace(v_def, $s$'/employer?section=fleet'$s$,
                            $s$'/employer?section=fleet&vehicle=' || v.id$s$);
    if v_new = v_def then
      raise exception 'employer_expiry_items: fleet route not found';
    end if;
    execute v_new;
  end if;

  select pg_get_functiondef('public.get_employer_home(uuid)'::regprocedure) into v_def;
  if position('vehicle_defects' in v_def) = 0 then
    v_new := replace(v_def,
      $s$cross join lateral (values ('MOT', v.mot_expiry), ('Road tax', v.tax_expiry),
                                 ('Insurance', v.insurance_expiry)) as x(label, expiry)
     where v.user_id = p_firm and x.expiry is not null and x.expiry <= v_today + 30$s$,
      $s$cross join lateral (values ('MOT', v.mot_expiry), ('Road tax', v.tax_expiry),
                                 ('Insurance', v.insurance_expiry), ('Service', v.next_service)) as x(label, expiry)
     where v.user_id = p_firm and x.expiry is not null and x.expiry <= v_today + 30
       and coalesce(v.status, '') <> 'Off Road'$s$);
    if v_new = v_def then raise exception 'get_employer_home: vehicle_docs not found'; end if;
    v_def := v_new;

    v_new := replace(v_def,
      $s$'vehicle_first', (select jsonb_build_object('registration', v.registration, 'label', v.label,$s$,
      $s$'vehicle_first', (select jsonb_build_object('id', v.id, 'registration', v.registration, 'label', v.label,$s$);
    if v_new = v_def then raise exception 'get_employer_home: vehicle_first not found'; end if;
    v_def := v_new;

    v_new := replace(v_def,
      $s$'rams_pending', (select count(*) from public.rams_documents r$s$,
      $s$'vehicle_defects', (select count(distinct c.vehicle_id) from public.vehicle_checks c
                             join public.vehicles v on v.id = c.vehicle_id
                            where v.user_id = p_firm and c.defects_found and c.resolved_at is null),
      'vehicle_defect_first', (select jsonb_build_object('id', v.id, 'registration', v.registration,
                                   'off_road', v.status = 'Off Road', 'reported', c.created_at)
                                 from public.vehicle_checks c
                                 join public.vehicles v on v.id = c.vehicle_id
                                where v.user_id = p_firm and c.defects_found and c.resolved_at is null
                                order by c.off_road desc, c.created_at desc limit 1),
      'rams_pending', (select count(*) from public.rams_documents r$s$);
    if v_new = v_def then raise exception 'get_employer_home: rams_pending not found'; end if;
    execute v_new;
  end if;
end
$do$;
