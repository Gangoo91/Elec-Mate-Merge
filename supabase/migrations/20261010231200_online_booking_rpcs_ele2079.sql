-- ELE-2079 — online booking: the public token/slug-keyed functions, the
-- office's settings and decisions, and the confirmation hand-off.
--
-- Additive: new functions only.
--
-- Public (anon), each keyed by the firm's booking key (/book-visit/<key>) or
-- its quote page slug (/get-quote/<slug>), each rate limited by hashed IP:
--   get_booking_page      what the widget shows: firm name, colour, types, area
--   get_booking_slots     free half-days for a type and postcode (no names)
--   create_online_booking checks everything again under a per-firm lock, then
--                         puts a real job in the diary (tentative = stage
--                         Enquiry, nobody booked; auto-confirm = the chosen
--                         person booked through the same assignment insert
--                         dispatch_assign does), the booking row, a deposit
--                         invoice when the firm takes deposits, and the bell.
-- Office (authenticated, my_employer_scope; deposits owner/admin only):
--   get_booking_settings / save_booking_settings
--   get_online_bookings / decide_online_booking (accept books the person with
--                         dispatch_assign, the existing dispatch path)
-- System (service_role only):
--   online_booking_confirmation_message  what send-booking-confirmation needs
--                         to email an auto-confirmed booking.

create or replace function public._booking_default_types()
returns jsonb
language sql
immutable
set search_path to 'public'
as $$
  select '[
    {"key":"eicr","label":"EICR (electrical safety check)","minutes":180,"required":["2391","18th"],"enabled":true,"deposit_pounds":null},
    {"key":"ev_survey","label":"EV charger survey","minutes":60,"required":["ev"],"enabled":true,"deposit_pounds":null},
    {"key":"quote_visit","label":"Quote visit","minutes":45,"required":[],"enabled":true,"deposit_pounds":null}
  ]'::jsonb;
$$;

-- UK postcode → its outward code, or null when it isn't one.
create or replace function public._booking_outcode(p_postcode text)
returns text
language sql
immutable
set search_path to 'public'
as $$
  select case when v ~ '^[A-Z]{1,2}[0-9][A-Z0-9]?[0-9][A-Z]{2}$' then left(v, length(v) - 3) end
    from (select upper(regexp_replace(coalesce(p_postcode, ''), '\s+', '', 'g')) as v) x;
$$;

create or replace function public._booking_postcode_tidy(p_postcode text)
returns text
language sql
immutable
set search_path to 'public'
as $$
  select case when public._booking_outcode(p_postcode) is null then null
              else public._booking_outcode(p_postcode) || ' ' || right(v, 3) end
    from (select upper(regexp_replace(coalesce(p_postcode, ''), '\s+', '', 'g')) as v) x;
$$;

/*
 * Is this postcode in the firm's area? Postcode lists match an outward code
 * ("S10") or a whole area ("S" covers S1 to S99, not SA or SK). A radius is
 * measured from the firm's base outward code to the customer's, centre to
 * centre (uk_postcode_outcodes), which is the precision a "do we cover you"
 * check needs.
 */
create or replace function public._booking_area_check(s public.employer_booking_settings, p_postcode text)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $$
declare
  v_out text := public._booking_outcode(p_postcode);
  o record;
  v_miles numeric;
begin
  if v_out is null then
    return jsonb_build_object('ok', false, 'error', 'postcode');
  end if;
  select oc.latitude, oc.longitude into o from public.uk_postcode_outcodes oc where oc.outcode = v_out;
  if s.area_mode = 'postcodes' then
    if exists (select 1 from unnest(s.area_postcodes) a
                where upper(btrim(a)) = v_out
                   or (upper(btrim(a)) ~ '^[A-Z]{1,2}$' and v_out ~ ('^' || upper(btrim(a)) || '[0-9]'))) then
      return jsonb_build_object('ok', true, 'outcode', v_out, 'lat', o.latitude, 'lng', o.longitude);
    end if;
    return jsonb_build_object('ok', false, 'error', 'out_of_area', 'outcode', v_out);
  end if;
  if o.latitude is null then
    return jsonb_build_object('ok', false, 'error', 'postcode_unknown', 'outcode', v_out);
  end if;
  if s.base_lat is null then
    return jsonb_build_object('ok', false, 'error', 'no_area');
  end if;
  v_miles := public._sched_km(s.base_lat, s.base_lng, o.latitude, o.longitude) / 1.609344;
  if v_miles > s.radius_miles then
    return jsonb_build_object('ok', false, 'error', 'out_of_area', 'outcode', v_out);
  end if;
  return jsonb_build_object('ok', true, 'outcode', v_out, 'lat', o.latitude, 'lng', o.longitude,
                            'miles', round(v_miles, 1));
end;
$$;

-- The firm behind a booking key or an enabled quote page slug, booking switched on.
create or replace function public._booking_settings_for(p_key text)
returns public.employer_booking_settings
language sql
stable
security definer
set search_path to 'public'
as $$
  select s.* from public.employer_booking_settings s
   where s.enabled
     and p_key is not null and length(p_key) between 4 and 64
     and (s.public_key = lower(btrim(p_key))
          or s.firm_id = (select cp.user_id from public.company_profiles cp
                           where lower(cp.lead_page_slug) = lower(btrim(p_key)) and coalesce(cp.lead_page_enabled, false)
                           order by cp.updated_at desc nulls last limit 1))
   limit 1;
$$;

create or replace function public._booking_half_label(p_day date, p_half text)
returns text
language sql
immutable
set search_path to 'public'
as $$
  select to_char(p_day, 'FMDay FMDD FMMonth') ||
         case p_half when 'am' then ', morning' when 'pm' then ', afternoon' else ', all day' end;
$$;

create or replace function public._booking_type(s public.employer_booking_settings, p_type text)
returns jsonb
language sql
stable
set search_path to 'public'
as $$
  select t from jsonb_array_elements(case when jsonb_array_length(coalesce(s.types, '[]'::jsonb)) = 0
                                          then public._booking_default_types() else s.types end) t
   where t->>'key' = p_type and coalesce((t->>'enabled')::boolean, true)
   limit 1;
$$;

/* ── Public ─────────────────────────────────────────────────────────────── */

create or replace function public.get_booking_page(p_key text)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $$
declare
  s public.employer_booking_settings := public._booking_settings_for(p_key);
  cp record;
  v_types jsonb;
begin
  if s.firm_id is null then
    return jsonb_build_object('found', false);
  end if;
  select c.company_name, c.company_phone, c.logo_url, c.accent_color, c.primary_color
    into cp from public.company_profiles c where c.user_id = s.firm_id
   order by c.updated_at desc nulls last limit 1;
  select coalesce(jsonb_agg(jsonb_build_object(
           'key', t->>'key', 'label', t->>'label', 'minutes', (t->>'minutes')::int,
           'deposit_pounds', case when s.deposit_enabled and coalesce((t->>'deposit_pounds')::numeric, 0) > 0
                                  then (t->>'deposit_pounds')::numeric end)), '[]'::jsonb)
    into v_types
    from jsonb_array_elements(case when jsonb_array_length(coalesce(s.types, '[]'::jsonb)) = 0
                                   then public._booking_default_types() else s.types end) t
   where coalesce((t->>'enabled')::boolean, true);
  return jsonb_build_object(
    'found', true,
    'key', s.public_key,
    'company_name', coalesce(nullif(btrim(cp.company_name), ''), 'Your local electrician'),
    'phone', nullif(btrim(cp.company_phone), ''),
    'logo', nullif(cp.logo_url, ''),
    'colour', coalesce(case when cp.accent_color ~* '^#[0-9a-f]{6}$' then cp.accent_color end,
                       case when cp.primary_color ~* '^#[0-9a-f]{6}$' then cp.primary_color end),
    'intro', nullif(btrim(coalesce(s.intro, '')), ''),
    'types', v_types,
    'lead_days', s.lead_days,
    'auto_confirm', s.auto_confirm,
    'area', case when s.area_mode = 'postcodes'
                 then jsonb_build_object('mode', 'postcodes', 'postcodes', to_jsonb(s.area_postcodes))
                 else jsonb_build_object('mode', 'radius', 'miles', s.radius_miles,
                                         'from', public._booking_outcode(s.base_postcode)) end);
end;
$$;

create or replace function public.get_booking_slots(p_key text, p_type text, p_postcode text)
returns jsonb
language plpgsql
volatile
security definer
set search_path to 'public'
as $$
declare
  s public.employer_booking_settings := public._booking_settings_for(p_key);
  v_ip text := public._lead_page_ip_hash();
  v_today date := (now() at time zone 'Europe/London')::date;
  t jsonb;
  a jsonb;
  v_days jsonb;
  v_minutes int;
begin
  if s.firm_id is null then return jsonb_build_object('ok', false, 'error', 'not_found'); end if;
  if (select count(*) from public.employer_booking_rate_log
       where ip_hash = v_ip and kind = 'slots' and created_at > now() - interval '1 hour') >= 60 then
    return jsonb_build_object('ok', false, 'error', 'rate_limited');
  end if;
  insert into public.employer_booking_rate_log (firm_id, kind, ip_hash) values (s.firm_id, 'slots', v_ip);

  t := public._booking_type(s, p_type);
  if t is null then return jsonb_build_object('ok', false, 'error', 'type'); end if;
  a := public._booking_area_check(s, p_postcode);
  if not (a->>'ok')::boolean then return a; end if;
  v_minutes := least(greatest(coalesce((t->>'minutes')::int, 60), 15), 600);

  perform public._sched_options(
    s.firm_id, v_today + s.lead_days, v_today + s.horizon_days,
    coalesce((select array_agg(x) from jsonb_array_elements_text(coalesce(t->'required', '[]'::jsonb)) x), '{}'),
    v_minutes / 60.0, 1, (a->>'lat')::float8, (a->>'lng')::float8, 1, null, '{}', false, 1);

  select coalesce(jsonb_agg(jsonb_build_object('day', d.day, 'label', to_char(d.day, 'FMDy FMDD FMMon'),
                                               'halves', d.halves) order by d.day), '[]'::jsonb)
    into v_days
    from (select x.day, jsonb_agg(distinct x.half) as halves
            from _sched_slot x where not x.is_app group by x.day) d;

  return jsonb_build_object('ok', true, 'outcode', a->>'outcode', 'minutes', v_minutes, 'days', v_days);
end;
$$;

create or replace function public.create_online_booking(
  p_key text, p_type text, p_day date, p_half text,
  p_name text, p_email text default null, p_phone text default null,
  p_address text default null, p_postcode text default null, p_notes text default null,
  p_source text default null, p_website text default null, p_elapsed_ms int default null)
returns jsonb
language plpgsql
volatile
security definer
set search_path to 'public'
as $$
declare
  s public.employer_booking_settings := public._booking_settings_for(p_key);
  v_ip text := public._lead_page_ip_hash();
  v_today date := (now() at time zone 'Europe/London')::date;
  v_name text := left(regexp_replace(btrim(coalesce(p_name, '')), '\s+', ' ', 'g'), 120);
  v_email text := nullif(lower(btrim(coalesce(p_email, ''))), '');
  v_phone text := nullif(left(regexp_replace(btrim(coalesce(p_phone, '')), '[^0-9+() -]', '', 'g'), 30), '');
  v_addr text := nullif(left(regexp_replace(btrim(coalesce(p_address, '')), '\s+', ' ', 'g'), 200), '');
  v_notes text := nullif(left(btrim(coalesce(p_notes, '')), 1500), '');
  v_pc text := public._booking_postcode_tidy(p_postcode);
  v_source text := case when p_source in ('quote_page', 'website', 'google', 'link') then p_source else 'link' end;
  v_contact text;
  t jsonb;
  a jsonb;
  v_minutes int;
  v_req text[];
  v_half_mode boolean;
  pick record;
  v_ref text := upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 6));
  v_job uuid;
  v_booking uuid;
  v_start time;
  v_auto boolean;
  v_dep numeric;
  v_inv uuid;
  v_key text;
  v_label text;
begin
  if s.firm_id is null then return jsonb_build_object('ok', false, 'error', 'not_found'); end if;

  -- Bots: a filled honeypot or a form sent in under 2.5 seconds looks sent.
  if nullif(btrim(coalesce(p_website, '')), '') is not null or (p_elapsed_ms is not null and p_elapsed_ms < 2500) then
    insert into public.employer_booking_rate_log (firm_id, kind, ip_hash) values (s.firm_id, 'blocked', v_ip);
    return jsonb_build_object('ok', true, 'reference', v_ref, 'status', 'tentative');
  end if;

  if length(v_name) < 2 then return jsonb_build_object('ok', false, 'error', 'name'); end if;
  if v_email is not null and (length(v_email) > 200 or v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$') then
    return jsonb_build_object('ok', false, 'error', 'email');
  end if;
  if v_phone is not null and length(regexp_replace(v_phone, '[^0-9]', '', 'g')) not between 7 and 15 then
    return jsonb_build_object('ok', false, 'error', 'phone');
  end if;
  if v_email is null and v_phone is null then return jsonb_build_object('ok', false, 'error', 'contact'); end if;
  if v_addr is null then return jsonb_build_object('ok', false, 'error', 'address'); end if;
  if v_pc is null then return jsonb_build_object('ok', false, 'error', 'postcode'); end if;
  if v_notes ~* '(https?://|www\.)\S+.*(https?://|www\.)\S+' then
    return jsonb_build_object('ok', false, 'error', 'links');
  end if;

  v_contact := md5(coalesce(v_email, '') || '|' || coalesce(regexp_replace(v_phone, '[^0-9]', '', 'g'), ''));
  if (select count(*) from public.employer_booking_rate_log
       where ip_hash = v_ip and kind = 'book' and created_at > now() - interval '1 hour') >= 3
     or (select count(*) from public.employer_booking_rate_log
       where ip_hash = v_ip and kind = 'book' and created_at > now() - interval '1 day') >= 8
     or (select count(*) from public.employer_booking_rate_log
       where firm_id = s.firm_id and contact_hash = v_contact and kind = 'book'
         and created_at > now() - interval '1 day') >= 2
     or (select count(*) from public.employer_booking_rate_log
       where firm_id = s.firm_id and kind = 'book' and created_at > now() - interval '1 day') >= 30 then
    return jsonb_build_object('ok', false, 'error', 'rate_limited');
  end if;

  t := public._booking_type(s, p_type);
  if t is null then return jsonb_build_object('ok', false, 'error', 'type'); end if;
  a := public._booking_area_check(s, v_pc);
  if not (a->>'ok')::boolean then return a; end if;

  v_minutes := least(greatest(coalesce((t->>'minutes')::int, 60), 15), 600);
  v_half_mode := v_minutes <= 270;
  if p_day is null or p_day < v_today + s.lead_days or p_day > v_today + s.horizon_days
     or extract(isodow from p_day) > 5
     or p_half is null or (v_half_mode and p_half not in ('am', 'pm')) or (not v_half_mode and p_half <> 'day') then
    return jsonb_build_object('ok', false, 'error', 'slot');
  end if;
  v_req := coalesce((select array_agg(x) from jsonb_array_elements_text(coalesce(t->'required', '[]'::jsonb)) x), '{}');

  -- One booking at a time per firm, so two customers can't take the same slot.
  perform pg_advisory_xact_lock(hashtextextended('online-booking:' || s.firm_id::text, 0));

  perform public._sched_options(s.firm_id, p_day, p_day, v_req, v_minutes / 60.0, 1,
                                (a->>'lat')::float8, (a->>'lng')::float8, 1, null, '{}', false, 1);
  select x.employee_id, x.name into pick
    from _sched_slot x where x.day = p_day and x.half = p_half and not x.is_app
   order by x.score, x.name limit 1;
  if pick.employee_id is null then
    return jsonb_build_object('ok', false, 'error', 'taken');
  end if;

  v_dep := case when s.deposit_enabled and coalesce((t->>'deposit_pounds')::numeric, 0) > 0
                then least((t->>'deposit_pounds')::numeric, 1000) end;
  v_auto := s.auto_confirm and v_dep is null;
  v_start := case p_half when 'pm' then time '12:30' else time '08:00' end;
  v_label := public._booking_half_label(p_day, p_half);

  insert into public.employer_jobs (user_id, title, client, client_email, client_phone, location, lat, lng,
                                    status, board_stage, start_date, end_date, job_type, required_credentials,
                                    quoted_hours, workers_count, description)
  values (s.firm_id, (t->>'label') || ' · ' || v_name, v_name, v_email, v_phone, v_addr || ', ' || v_pc,
          (a->>'lat')::numeric, (a->>'lng')::numeric, 'Active',
          case when v_auto then 'Scheduled' else 'Enquiry' end, p_day, p_day, t->>'label', v_req,
          round(v_minutes / 60.0, 2), 1,
          concat_ws(E'\n', 'Booked online, ref ' || v_ref || ', for ' || v_label || '.',
                    case when v_auto then null else 'Tentative: accept or move it in the Diary.' end,
                    case when v_notes is not null then E'\nFrom the customer: ' || v_notes end))
  returning id into v_job;

  insert into public.employer_online_bookings (firm_id, reference, type_key, type_label, minutes, required, day, half,
                                               start_time, customer_name, customer_email, customer_phone, address,
                                               postcode, notes, lat, lng, suggested_employee_id, job_id, status,
                                               source, deposit_pence, ip_hash, decided_at)
  values (s.firm_id, v_ref, t->>'key', t->>'label', v_minutes, v_req, p_day, p_half, v_start, v_name, v_email,
          v_phone, v_addr, v_pc, v_notes, (a->>'lat')::float8, (a->>'lng')::float8, pick.employee_id, v_job,
          case when v_auto then 'confirmed' else 'tentative' end, v_source,
          case when v_dep is not null then (v_dep * 100)::int end, v_ip, case when v_auto then now() end)
  returning id into v_booking;

  if v_auto then
    -- The same row dispatch_assign writes; the assignment triggers push to the
    -- worker, log the dispatch change and update the diary's calendar entry.
    insert into public.employer_job_assignments
      (job_id, employee_id, start_date, end_date, start_time, hours_per_day, notes,
       status, assigned_by, notify_email)
    values (v_job, pick.employee_id, p_day, p_day, v_start, round(v_minutes / 60.0, 2),
            'Booked online, ref ' || v_ref, 'assigned', 'Online booking', true);
    update public.calendar_events set customer_reminder_opt_in = true
     where mirrored_from_job = v_job and user_id = s.firm_id and v_email is not null;
  end if;

  if v_dep is not null then
    insert into public.invoices (user_id, invoice_number, client_data, items, settings, subtotal, total,
                                 status, invoice_date, due_date, notes)
    values (s.firm_id, 'DEP-BK-' || v_ref,
            jsonb_strip_nulls(jsonb_build_object('name', v_name, 'email', v_email, 'phone', v_phone,
                                                 'address', v_addr, 'postcode', v_pc)),
            jsonb_build_array(jsonb_build_object('id', gen_random_uuid(), 'description',
              'Deposit · ' || (t->>'label') || ' on ' || v_label, 'quantity', 1, 'unit', 'each',
              'unitPrice', v_dep, 'totalPrice', v_dep, 'category', 'manual')),
            jsonb_build_object('vatRegistered', false, 'paymentTerms', '48 hours'),
            v_dep, v_dep, 'sent', now(), now() + interval '48 hours',
            'Online booking ' || v_ref)
    returning id into v_inv;
    update public.employer_online_bookings set deposit_invoice_id = v_inv where id = v_booking;
  end if;

  insert into public.employer_booking_rate_log (firm_id, kind, ip_hash, contact_hash)
  values (s.firm_id, 'book', v_ip, v_contact);
  delete from public.employer_booking_rate_log where created_at < now() - interval '30 days';

  perform public.notify_employer_bell(
    s.firm_id, 'online_booking',
    case when v_auto then 'Booked online' else 'New online booking to accept' end,
    (t->>'label') || ' for ' || v_name || ', ' || v_label || case when v_dep is not null then '. Deposit asked' else '' end,
    jsonb_build_object('route', '/employer?section=diary&booking=' || v_booking, 'job_id', v_job,
                       'booking_id', v_booking));

  -- Auto-confirmed with an email: the confirmation goes now, through
  -- send-booking-confirmation (service-role branch, onlineBookingId).
  if v_auto and v_email is not null then
    begin
      select decrypted_secret into v_key from vault.decrypted_secrets where name = 'service_role_key' limit 1;
      if v_key is not null then
        perform net.http_post(
          url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/send-booking-confirmation',
          headers := jsonb_build_object('Content-Type', 'application/json', 'Authorization', 'Bearer ' || v_key),
          body := jsonb_build_object('onlineBookingId', v_booking, 'remindDayBefore', true),
          timeout_milliseconds := 20000);
      end if;
    exception when others then
      raise warning '[create_online_booking] confirmation: %', sqlerrm;
    end;
  end if;

  return jsonb_build_object(
    'ok', true, 'reference', v_ref,
    'status', case when v_auto then 'confirmed' else 'tentative' end,
    'day', p_day, 'half', p_half, 'start_time', to_char(v_start, 'HH24:MI'), 'label', v_label,
    'type', t->>'label',
    'deposit', case when v_inv is null then null
                    else jsonb_build_object('pounds', v_dep, 'pay_path', '/pay/' || v_inv) end);
end;
$$;

/* ── Office ─────────────────────────────────────────────────────────────── */

create or replace function public.get_booking_settings(p_firm uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $$
declare
  s public.employer_booking_settings;
  v_money boolean := public.can_see_firm_money(p_firm);
  cp record;
begin
  if auth.uid() is null or p_firm is null or p_firm not in (select public.my_employer_scope()) then
    raise exception 'Not allowed' using errcode = '42501';
  end if;
  select * into s from public.employer_booking_settings where firm_id = p_firm;
  select c.lead_page_slug, coalesce(c.lead_page_enabled, false) as qp_on, c.company_postcode
    into cp from public.company_profiles c where c.user_id = p_firm order by c.updated_at desc nulls last limit 1;
  return jsonb_build_object(
    'saved', s.firm_id is not null,
    'enabled', coalesce(s.enabled, false),
    'public_key', s.public_key,
    'auto_confirm', coalesce(s.auto_confirm, false),
    'lead_days', coalesce(s.lead_days, 2),
    'horizon_days', coalesce(s.horizon_days, 21),
    'area_mode', coalesce(s.area_mode, 'radius'),
    'base_postcode', coalesce(s.base_postcode, public._booking_postcode_tidy(cp.company_postcode)),
    'base_found', s.base_lat is not null,
    'radius_miles', coalesce(s.radius_miles, 15),
    'area_postcodes', to_jsonb(coalesce(s.area_postcodes, '{}')),
    'intro', s.intro,
    'can_see_money', v_money,
    'deposit_enabled', case when v_money then coalesce(s.deposit_enabled, false) end,
    'types', (select coalesce(jsonb_agg(case when v_money then t else t - 'deposit_pounds' end), '[]'::jsonb)
                from jsonb_array_elements(case when jsonb_array_length(coalesce(s.types, '[]'::jsonb)) = 0
                                               then public._booking_default_types() else s.types end) t),
    'quote_page_slug', case when cp.qp_on then cp.lead_page_slug end,
    'tentative', (select count(*) from public.employer_online_bookings b
                   where b.firm_id = p_firm and b.status = 'tentative' and b.day >= (now() at time zone 'Europe/London')::date));
end;
$$;

create or replace function public.save_booking_settings(p_firm uuid, p_patch jsonb)
returns jsonb
language plpgsql
volatile
security definer
set search_path to 'public'
as $$
declare
  v_money boolean := public.can_see_firm_money(p_firm);
  s public.employer_booking_settings;
  v_types jsonb;
  v_old jsonb;
  t jsonb;
  v_pc text;
  o record;
  v_keys text[] := array['ecs','18th','2391','ev','solar','pat','ipaf','pasma','asbestos','firstaid','ssts'];
begin
  if auth.uid() is null or p_firm is null or p_firm not in (select public.my_employer_scope()) then
    raise exception 'Not allowed' using errcode = '42501';
  end if;
  insert into public.employer_booking_settings (firm_id, base_postcode)
  values (p_firm, (select public._booking_postcode_tidy(c.company_postcode) from public.company_profiles c
                    where c.user_id = p_firm order by c.updated_at desc nulls last limit 1))
  on conflict (firm_id) do nothing;
  select * into s from public.employer_booking_settings where firm_id = p_firm for update;
  v_old := case when jsonb_array_length(coalesce(s.types, '[]'::jsonb)) = 0 then public._booking_default_types() else s.types end;

  if p_patch ? 'types' then
    if jsonb_typeof(p_patch->'types') <> 'array' or jsonb_array_length(p_patch->'types') > 12 then
      raise exception 'Up to 12 job types' using errcode = '22023';
    end if;
    v_types := '[]'::jsonb;
    for t in select * from jsonb_array_elements(p_patch->'types') loop
      if nullif(btrim(coalesce(t->>'label', '')), '') is null then continue; end if;
      v_types := v_types || jsonb_build_array(jsonb_build_object(
        'key', coalesce(nullif(regexp_replace(lower(coalesce(t->>'key', '')), '[^a-z0-9_]', '', 'g'), ''),
                        regexp_replace(lower(left(t->>'label', 30)), '[^a-z0-9]+', '_', 'g')),
        'label', left(btrim(t->>'label'), 60),
        'minutes', least(greatest(coalesce((t->>'minutes')::int, 60), 15), 600),
        'required', coalesce((select jsonb_agg(distinct k) from jsonb_array_elements_text(coalesce(t->'required', '[]'::jsonb)) k
                               where k = any (v_keys)), '[]'::jsonb),
        'enabled', coalesce((t->>'enabled')::boolean, true),
        -- Deposits are money: only the owner or an admin sets them; anyone
        -- else saving keeps what was there.
        'deposit_pounds', case when v_money then
                                 case when coalesce((t->>'deposit_pounds')::numeric, 0) > 0
                                      then to_jsonb(least(round((t->>'deposit_pounds')::numeric, 2), 1000)) end
                               else (select o2->'deposit_pounds' from jsonb_array_elements(v_old) o2
                                      where o2->>'key' = t->>'key' limit 1) end));
    end loop;
  end if;

  if p_patch ? 'base_postcode' then
    v_pc := public._booking_postcode_tidy(p_patch->>'base_postcode');
    if v_pc is null and nullif(btrim(coalesce(p_patch->>'base_postcode', '')), '') is not null then
      -- An outward code on its own ("S10") is enough for a radius.
      v_pc := case when upper(btrim(p_patch->>'base_postcode')) ~ '^[A-Z]{1,2}[0-9][A-Z0-9]?$'
                   then upper(btrim(p_patch->>'base_postcode')) end;
      if v_pc is null then raise exception 'That postcode does not look right' using errcode = '22023'; end if;
    end if;
  else
    v_pc := s.base_postcode;
  end if;
  select oc.latitude, oc.longitude into o from public.uk_postcode_outcodes oc
   where oc.outcode = coalesce(public._booking_outcode(v_pc), upper(btrim(v_pc)));

  update public.employer_booking_settings set
    enabled = coalesce((p_patch->>'enabled')::boolean, enabled),
    auto_confirm = coalesce((p_patch->>'auto_confirm')::boolean, auto_confirm),
    lead_days = case when nullif(p_patch->>'lead_days', '') is not null
                   then least(greatest((p_patch->>'lead_days')::int, 0), 60) else lead_days end,
    horizon_days = case when nullif(p_patch->>'horizon_days', '') is not null
                   then least(greatest((p_patch->>'horizon_days')::int, 3), 60) else horizon_days end,
    area_mode = case when p_patch->>'area_mode' in ('radius', 'postcodes') then p_patch->>'area_mode' else area_mode end,
    radius_miles = case when nullif(p_patch->>'radius_miles', '') is not null
                   then least(greatest((p_patch->>'radius_miles')::int, 1), 100) else radius_miles end,
    area_postcodes = case when p_patch ? 'area_postcodes' then
                       coalesce((select array_agg(distinct upper(btrim(x)))
                                   from jsonb_array_elements_text(p_patch->'area_postcodes') x
                                  where upper(btrim(x)) ~ '^[A-Z]{1,2}([0-9][A-Z0-9]?)?$'), '{}')
                     else area_postcodes end,
    base_postcode = v_pc,
    base_lat = o.latitude,
    base_lng = o.longitude,
    deposit_enabled = case when v_money then coalesce((p_patch->>'deposit_enabled')::boolean, deposit_enabled)
                           else deposit_enabled end,
    types = coalesce(v_types, types),
    intro = case when p_patch ? 'intro' then nullif(left(btrim(coalesce(p_patch->>'intro', '')), 300), '') else intro end,
    updated_at = now(),
    updated_by = auth.uid()
  where firm_id = p_firm;

  return public.get_booking_settings(p_firm);
end;
$$;

create or replace function public.get_online_bookings(p_firm uuid, p_include_done boolean default false)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $$
declare
  v_money boolean := public.can_see_firm_money(p_firm);
begin
  if auth.uid() is null or p_firm is null or p_firm not in (select public.my_employer_scope()) then
    raise exception 'Not allowed' using errcode = '42501';
  end if;
  return coalesce((
    select jsonb_agg(jsonb_build_object(
             'id', b.id, 'reference', b.reference, 'status', b.status, 'type', b.type_label,
             'minutes', b.minutes, 'day', b.day, 'half', b.half, 'start_time', to_char(b.start_time, 'HH24:MI'),
             'label', public._booking_half_label(b.day, b.half),
             'customer', b.customer_name, 'email', b.customer_email, 'phone', b.customer_phone,
             'address', b.address, 'postcode', b.postcode, 'notes', b.notes, 'source', b.source,
             'job_id', b.job_id, 'created_at', b.created_at, 'decided_at', b.decided_at,
             'suggested', case when e.id is null then null
                               else jsonb_build_object('employee_id', e.id, 'name', e.name) end,
             'deposit', case when b.deposit_invoice_id is null then null else jsonb_build_object(
                          'paid', coalesce(i.status = 'paid' or i.paid_at is not null, false),
                          'pounds', case when v_money then b.deposit_pence / 100.0 end) end)
           order by b.status <> 'tentative', b.day, b.half)
      from public.employer_online_bookings b
      left join public.employer_employees e on e.id = b.suggested_employee_id
      left join public.invoices i on i.id = b.deposit_invoice_id
     where b.firm_id = p_firm
       and (p_include_done or b.status = 'tentative')
       and b.day >= (now() at time zone 'Europe/London')::date - 7), '[]'::jsonb);
end;
$$;

create or replace function public.decide_online_booking(
  p_booking uuid, p_action text, p_employee uuid default null,
  p_day date default null, p_half text default null, p_reason text default null)
returns jsonb
language plpgsql
volatile
security definer
set search_path to 'public'
as $$
declare
  b public.employer_online_bookings;
  v_emp uuid;
  v_day date;
  v_half text;
  v_start time;
  v_assignment uuid;
begin
  select * into b from public.employer_online_bookings where id = p_booking for update;
  if b.id is null or auth.uid() is null or b.firm_id not in (select public.my_employer_scope()) then
    raise exception 'Booking not found' using errcode = '42501';
  end if;
  if b.status <> 'tentative' then
    raise exception 'This booking has already been %', b.status using errcode = '22023';
  end if;

  if p_action = 'decline' then
    update public.employer_online_bookings
       set status = 'declined', decided_at = now(), decided_by = auth.uid(),
           decline_reason = nullif(left(btrim(coalesce(p_reason, '')), 300), ''), updated_at = now()
     where id = b.id;
    if b.job_id is not null then
      update public.employer_jobs set archived_at = now(), updated_at = now()
       where id = b.job_id and archived_at is null;
    end if;
    return jsonb_build_object('ok', true, 'status', 'declined', 'customer', b.customer_name,
                              'phone', b.customer_phone, 'email', b.customer_email);
  end if;

  if p_action <> 'accept' then raise exception 'Unknown action' using errcode = '22023'; end if;
  if b.job_id is null then raise exception 'The diary job for this booking was removed' using errcode = '22023'; end if;

  v_emp := coalesce(p_employee, b.suggested_employee_id);
  if v_emp is null then raise exception 'Choose who goes' using errcode = '22023'; end if;
  v_day := coalesce(p_day, b.day);
  v_half := coalesce(p_half, b.half);
  if v_half not in ('am', 'pm', 'day') then raise exception 'Choose morning, afternoon or all day' using errcode = '22023'; end if;
  v_start := case v_half when 'pm' then time '12:30' else time '08:00' end;

  -- The job's day moves with the booking; then the person is booked through
  -- the existing dispatch path (push to the worker, change log, calendar).
  update public.employer_jobs
     set start_date = v_day, end_date = v_day, board_stage = 'Scheduled', updated_at = now()
   where id = b.job_id;
  v_assignment := public.dispatch_assign(b.job_id, v_emp, v_day, v_day, v_start,
                                         round(b.minutes / 60.0, 2), 'Booked online, ref ' || b.reference);

  update public.employer_online_bookings
     set status = 'confirmed', decided_at = now(), decided_by = auth.uid(),
         day = v_day, half = v_half, start_time = v_start, suggested_employee_id = v_emp, updated_at = now()
   where id = b.id;
  update public.calendar_events set customer_reminder_opt_in = true
   where mirrored_from_job = b.job_id and user_id = b.firm_id and b.customer_email is not null;

  return jsonb_build_object('ok', true, 'status', 'confirmed', 'job_id', b.job_id, 'assignment_id', v_assignment,
                            'has_email', b.customer_email is not null, 'day', v_day, 'half', v_half,
                            'moved', v_day <> b.day or v_half <> b.half);
end;
$$;

/* ── System ─────────────────────────────────────────────────────────────── */

-- The FirmJobMessage shape send-booking-confirmation builds its email from,
-- for an auto-confirmed online booking (no signed-in office user to scope by).
create or replace function public.online_booking_confirmation_message(p_booking uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $$
declare
  b public.employer_online_bookings;
  j public.employer_jobs;
  e public.calendar_events;
  v_company text;
begin
  select * into b from public.employer_online_bookings where id = p_booking;
  if b.id is null or b.status <> 'confirmed' or b.job_id is null then return null; end if;
  select * into j from public.employer_jobs where id = b.job_id;
  select * into e from public.calendar_events
   where user_id = j.user_id and mirrored_from_job = j.id and coalesce(sync_status, '') <> 'pending_delete' limit 1;
  select company_name into v_company from public.company_profiles where user_id = j.user_id
   order by updated_at desc nulls last limit 1;
  return jsonb_build_object(
    'job_id', j.id, 'firm_id', j.user_id, 'title', j.title, 'client', j.client,
    'client_email', nullif(btrim(coalesce(j.client_email, '')), ''), 'location', j.location,
    'business_name', coalesce(nullif(btrim(v_company), ''), 'Your electrician'),
    'crew', (select coalesce(jsonb_agg(x.first order by x.first), '[]'::jsonb) from (
               select distinct split_part(btrim(regexp_replace(coalesce(p.name, ''), '\(.*?\)', '', 'g')), ' ', 1) as first
                 from public.employer_job_assignments a
                 join public.employer_employees p on p.id = a.employee_id
                where a.job_id = j.id and lower(coalesce(a.status, 'assigned')) not in ('removed', 'cancelled', 'ended')) x
             where x.first <> ''),
    'event', case when e.id is null then null else jsonb_build_object(
               'id', e.id, 'start_at', e.start_at, 'end_at', e.end_at, 'all_day', e.all_day,
               'confirmation_sent_at', e.confirmation_sent_at) end);
end;
$$;

revoke all on function public._booking_default_types() from public, anon, authenticated;
revoke all on function public._booking_outcode(text) from public, anon, authenticated;
revoke all on function public._booking_postcode_tidy(text) from public, anon, authenticated;
revoke all on function public._booking_area_check(public.employer_booking_settings, text) from public, anon, authenticated;
revoke all on function public._booking_settings_for(text) from public, anon, authenticated;
revoke all on function public._booking_half_label(date, text) from public, anon, authenticated;
revoke all on function public._booking_type(public.employer_booking_settings, text) from public, anon, authenticated;

revoke all on function public.get_booking_page(text) from public;
grant execute on function public.get_booking_page(text) to anon, authenticated;
revoke all on function public.get_booking_slots(text, text, text) from public;
grant execute on function public.get_booking_slots(text, text, text) to anon, authenticated;
revoke all on function public.create_online_booking(text, text, date, text, text, text, text, text, text, text, text, text, int) from public;
grant execute on function public.create_online_booking(text, text, date, text, text, text, text, text, text, text, text, text, int) to anon, authenticated;

revoke all on function public.get_booking_settings(uuid) from public, anon;
grant execute on function public.get_booking_settings(uuid) to authenticated;
revoke all on function public.save_booking_settings(uuid, jsonb) from public, anon;
grant execute on function public.save_booking_settings(uuid, jsonb) to authenticated;
revoke all on function public.get_online_bookings(uuid, boolean) from public, anon;
grant execute on function public.get_online_bookings(uuid, boolean) to authenticated;
revoke all on function public.decide_online_booking(uuid, text, uuid, date, text, text) from public, anon;
grant execute on function public.decide_online_booking(uuid, text, uuid, date, text, text) to authenticated;

revoke all on function public.online_booking_confirmation_message(uuid) from public, anon, authenticated;
grant execute on function public.online_booking_confirmation_message(uuid) to service_role;
