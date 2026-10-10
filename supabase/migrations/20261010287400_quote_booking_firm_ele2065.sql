-- ELE-2065 / gap analysis §3A #6: after accepting a quote, the customer booked
-- into the owner's personal calendar (/book/<user_id>, profiles.scheduling_*,
-- calendar_events). For a firm that booking never reached the dispatch board,
-- and nobody was assigned.
--
-- Now, for an Employer Hub firm that has switched on online booking (ELE-2079,
-- employer_booking_settings.enabled), the quote page offers the firm's real
-- crew availability and books the visit onto THE JOB MADE FROM THE QUOTE:
--   * get_quote_booking(token)        which booking the quote page shows:
--                                     'firm' (this flow) or 'personal' (as
--                                     before: every sole trader, and any firm
--                                     without online booking switched on), plus
--                                     the visit length and any booking made.
--   * get_quote_booking_slots(token)  free half-days from the scheduling engine
--                                     (_sched_options, as get_booking_slots),
--                                     near the quote's postcode. No area check:
--                                     the firm has already quoted this address.
--   * book_quote_visit(token, day, half, note)
--                                     makes or reuses the quote's job (the same
--                                     insert as create_job_from_quote, now one
--                                     helper), then an employer_online_bookings
--                                     row on that job (source quote_page). With
--                                     auto-confirm the suggested person is
--                                     booked straight away (the same assignment
--                                     insert create_online_booking uses);
--                                     otherwise it is tentative in Diary ›
--                                     Online bookings until the office accepts.
--   * decide_online_booking (same signature, ELE-2079, not called by HEAD):
--     declining a quote booking no longer archives the won job (it goes back
--     to "won, needs a date"); accepting also fills the job's map pin and the
--     quote's booked slot.
-- Additive: one nullable column (employer_online_bookings.quote_id), new
-- functions, two uncommitted ELE-2065/2079 bodies replaced with no signature
-- change. Public functions are token-keyed and rate limited like ELE-2079's.

alter table public.employer_online_bookings
  add column if not exists quote_id uuid references public.quotes(id) on delete set null;
create index if not exists employer_online_bookings_quote_idx
  on public.employer_online_bookings (quote_id) where quote_id is not null;
comment on column public.employer_online_bookings.quote_id is
  'ELE-2065: the accepted quote this visit was booked from (quote page). The job is the one made from that quote.';

-- ── One job per accepted quote (moved out of create_job_from_quote) ───────
create or replace function public._job_from_quote(p_quote_id uuid)
returns jsonb
language plpgsql
volatile
security definer
set search_path to 'public'
as $$
declare
  q public.quotes;
  v_job uuid;
  v_title text;
  v_client text;
  v_location text;
begin
  select * into q from public.quotes where id = p_quote_id and deleted_at is null for update;
  if q.id is null then
    raise exception 'That quote has gone.' using errcode = 'P0002';
  end if;
  if q.employer_job_id is not null
     and exists (select 1 from public.employer_jobs j where j.id = q.employer_job_id and j.archived_at is null) then
    return jsonb_build_object('job_id', q.employer_job_id, 'created', false);
  end if;

  v_client := coalesce(nullif(btrim(q.client_data->>'name'), ''), 'Client');
  v_title := coalesce(nullif(btrim(q.job_details->>'title'), ''),
                      'Job for ' || v_client || coalesce(' (' || q.quote_number || ')', ''));
  v_location := coalesce(nullif(btrim(q.job_details->>'location'), ''),
                         nullif(btrim(concat_ws(', ', nullif(btrim(q.client_data->>'address'), ''),
                                                      nullif(btrim(q.client_data->>'postcode'), ''))), ''),
                         '');

  insert into public.employer_jobs (
    user_id, title, client, location, status, board_stage, value, description,
    client_email, client_phone, customer_id)
  values (
    q.user_id, v_title, v_client, v_location, 'Pending', 'Confirmed',
    nullif(coalesce(q.subtotal, q.total, 0), 0),
    nullif(btrim(concat_ws(E'\n\n', nullif(btrim(q.job_details->>'description'), ''),
                                   'From quote ' || coalesce(q.quote_number, '') || '.')), ''),
    nullif(btrim(q.client_data->>'email'), ''), nullif(btrim(q.client_data->>'phone'), ''),
    q.customer_id)
  returning id into v_job;

  update public.quotes set employer_job_id = v_job where id = q.id;
  return jsonb_build_object('job_id', v_job, 'created', true);
end;
$$;
revoke all on function public._job_from_quote(uuid) from public, anon, authenticated;

create or replace function public.create_job_from_quote(p_quote_id uuid)
returns jsonb
language plpgsql
volatile
security definer
set search_path to 'public'
as $$
declare
  q public.quotes;
begin
  if auth.uid() is null then
    raise exception 'Sign in again.' using errcode = '42501';
  end if;
  select * into q from public.quotes where id = p_quote_id and deleted_at is null for update;
  if q.id is null or q.user_id not in (select public.my_employer_scope()) then
    raise exception 'You can only make jobs from your own firm''s quotes.' using errcode = '42501';
  end if;
  if not public.is_employer_account(q.user_id) then
    raise exception 'Jobs come with the Employer Hub.' using errcode = '42501';
  end if;
  if coalesce(q.invoice_raised, false) then
    raise exception 'That is an invoice, not a quote.' using errcode = '22023';
  end if;
  if not (coalesce(q.acceptance_status, '') in ('accepted', 'accepted_pending_deposit')
          or lower(coalesce(q.status, '')) = 'approved') then
    raise exception 'Only an accepted quote can become a job.' using errcode = '22023';
  end if;
  return public._job_from_quote(q.id);
end;
$$;
revoke all on function public.create_job_from_quote(uuid) from public, anon;
grant execute on function public.create_job_from_quote(uuid) to authenticated;

-- ── Which booking the quote page offers ───────────────────────────────────
-- The firm's booking settings when this quote's account is an Employer Hub
-- firm with online booking switched on; otherwise no row.
create or replace function public._quote_booking_settings(q public.quotes)
returns public.employer_booking_settings
language sql
stable
security definer
set search_path to 'public'
as $$
  select s.* from public.employer_booking_settings s
   where s.firm_id = q.user_id and s.enabled and public.is_employer_account(q.user_id)
   limit 1;
$$;
revoke all on function public._quote_booking_settings(public.quotes) from public, anon, authenticated;

-- How long the visit is: the quote's labour hours (hour and day lines), else
-- the job's quoted hours, else a full day. Half-day slots up to 4.5 hours.
create or replace function public._quote_visit_minutes(q public.quotes)
returns int
language sql
stable
security definer
set search_path to 'public'
as $$
  select least(greatest(coalesce(
           nullif((select round(sum(
                     case when lower(coalesce(i->>'unit', '')) in ('day', 'days') then 8 else 1 end
                     * coalesce(nullif(i->>'quantity', '')::numeric, 0)) * 60)
                     from jsonb_array_elements(case when jsonb_typeof(q.items) = 'array' then q.items else '[]'::jsonb end) i
                    where lower(coalesce(i->>'category', i->>'type', '')) = 'labour'
                      and lower(coalesce(i->>'unit', '')) in ('hour', 'hours', 'hr', 'hrs', 'h', 'day', 'days')
                      and coalesce(i->>'quantity', '') ~ '^\d+(\.\d+)?$'), 0)::int,
           (select round(j.quoted_hours * 60)::int from public.employer_jobs j
             where j.id = q.employer_job_id and coalesce(j.quoted_hours, 0) > 0),
           480), 60), 480);
$$;
revoke all on function public._quote_visit_minutes(public.quotes) from public, anon, authenticated;

-- The quote's postcode (client details, else the end of the site address).
create or replace function public._quote_postcode(q public.quotes)
returns text
language sql
stable
set search_path to 'public'
as $$
  select coalesce(
    public._booking_postcode_tidy(q.client_data->>'postcode'),
    public._booking_postcode_tidy(substring(upper(coalesce(q.job_details->>'location', ''))
                                  from '([A-Z]{1,2}[0-9][0-9A-Z]?\s*[0-9][A-Z]{2})\s*$')),
    public._booking_postcode_tidy(substring(upper(coalesce(q.client_data->>'address', ''))
                                  from '([A-Z]{1,2}[0-9][0-9A-Z]?\s*[0-9][A-Z]{2})\s*$')));
$$;
revoke all on function public._quote_postcode(public.quotes) from public, anon, authenticated;

create or replace function public._quote_booking_row(p_quote uuid)
returns jsonb
language sql
stable
security definer
set search_path to 'public'
as $$
  select jsonb_build_object('reference', b.reference, 'status', b.status, 'day', b.day, 'half', b.half,
                            'label', public._booking_half_label(b.day, b.half))
    from public.employer_online_bookings b
   where b.quote_id = p_quote and b.status in ('tentative', 'confirmed')
   order by b.created_at desc limit 1;
$$;
revoke all on function public._quote_booking_row(uuid) from public, anon, authenticated;

create or replace function public.get_quote_booking(p_token text)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $$
declare
  q public.quotes;
  s public.employer_booking_settings;
  v_minutes int;
begin
  if p_token is null or length(p_token) < 8 then return jsonb_build_object('mode', 'none'); end if;
  select * into q from public.quotes where public_token = p_token and deleted_at is null limit 1;
  if q.id is null then return jsonb_build_object('mode', 'none'); end if;
  s := public._quote_booking_settings(q);
  if s.firm_id is null then return jsonb_build_object('mode', 'personal'); end if;
  v_minutes := public._quote_visit_minutes(q);
  return jsonb_build_object(
    'mode', 'firm',
    'ready', q.acceptance_status = 'accepted',
    'minutes', v_minutes,
    'half_mode', v_minutes <= 270,
    'auto_confirm', s.auto_confirm,
    'booking', public._quote_booking_row(q.id));
end;
$$;
revoke all on function public.get_quote_booking(text) from public;
grant execute on function public.get_quote_booking(text) to anon, authenticated;
comment on function public.get_quote_booking(text) is
  'ELE-2065 §3A #6: public, token-keyed. Which booking the quote page offers after acceptance: firm (Employer Hub firm with online booking on; books the quote''s job) or personal (/book/<user_id>, as before).';

create or replace function public.get_quote_booking_slots(p_token text)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  q public.quotes;
  s public.employer_booking_settings;
  v_ip text := public._booking_ip_hash();
  v_today date := (now() at time zone 'Europe/London')::date;
  v_minutes int;
  o record;
  v_days jsonb;
begin
  if p_token is null or length(p_token) < 8 then return jsonb_build_object('ok', false, 'error', 'not_found'); end if;
  select * into q from public.quotes where public_token = p_token and deleted_at is null limit 1;
  if q.id is null then return jsonb_build_object('ok', false, 'error', 'not_found'); end if;
  s := public._quote_booking_settings(q);
  if s.firm_id is null then return jsonb_build_object('ok', false, 'error', 'not_found'); end if;
  if q.acceptance_status is distinct from 'accepted' then
    return jsonb_build_object('ok', false, 'error', 'not_ready');
  end if;
  if public._quote_booking_row(q.id) is not null then
    return jsonb_build_object('ok', false, 'error', 'already_booked');
  end if;
  if (select count(*) from public.employer_booking_rate_log
       where ip_hash = v_ip and kind = 'slots' and created_at > now() - interval '1 hour') >= 60 then
    return jsonb_build_object('ok', false, 'error', 'rate_limited');
  end if;
  insert into public.employer_booking_rate_log (firm_id, kind, ip_hash) values (s.firm_id, 'slots', v_ip);

  v_minutes := public._quote_visit_minutes(q);
  select oc.latitude, oc.longitude into o
    from public.uk_postcode_outcodes oc where oc.outcode = public._booking_outcode(public._quote_postcode(q));

  perform public._expire_online_bookings(s.firm_id);
  perform public._sched_options(s.firm_id, v_today + s.lead_days, v_today + s.horizon_days, '{}',
                                v_minutes / 60.0, 1, o.latitude, o.longitude, 1, null, '{}', false, 1);

  select coalesce(jsonb_agg(jsonb_build_object('day', d.day, 'label', to_char(d.day, 'FMDy FMDD FMMon'),
                                               'halves', d.halves) order by d.day), '[]'::jsonb)
    into v_days
    from (select x.day, jsonb_agg(distinct x.half) as halves
            from _sched_slot x
           where not x.is_app
             and public._booking_slot_open(x.day, x.half)
             and public._booking_firm_day_open(s.firm_id, x.day, x.half)
             and (select count(*) from public.employer_online_bookings b
                   where b.firm_id = s.firm_id and b.status = 'tentative' and b.day = x.day) < 6
           group by x.day) d;

  return jsonb_build_object('ok', true, 'minutes', v_minutes, 'days', v_days);
end;
$$;
revoke all on function public.get_quote_booking_slots(text) from public;
grant execute on function public.get_quote_booking_slots(text) to anon, authenticated;
comment on function public.get_quote_booking_slots(text) is
  'ELE-2065 §3A #6: public, token-keyed, rate limited. Free half-days (no names) for an accepted firm quote''s visit, from the scheduling engine.';

create or replace function public.book_quote_visit(p_token text, p_day date, p_half text, p_note text default null)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  q public.quotes;
  s public.employer_booking_settings;
  v_ip text := public._booking_ip_hash();
  v_today date := (now() at time zone 'Europe/London')::date;
  v_minutes int;
  v_half_mode boolean;
  v_pc text;
  o record;
  pick record;
  v_job uuid;
  v_booking uuid;
  v_ref text := upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 6));
  v_start time;
  v_label text;
  v_auto boolean;
  v_name text;
  v_email text;
  v_phone text;
  v_addr text;
  v_note text := nullif(left(btrim(coalesce(p_note, '')), 1000), '');
  v_key text;
begin
  if p_token is null or length(p_token) < 8 then return jsonb_build_object('ok', false, 'error', 'not_found'); end if;
  select * into q from public.quotes where public_token = p_token and deleted_at is null limit 1;
  if q.id is null then return jsonb_build_object('ok', false, 'error', 'not_found'); end if;
  s := public._quote_booking_settings(q);
  if s.firm_id is null then return jsonb_build_object('ok', false, 'error', 'not_found'); end if;
  if q.acceptance_status is distinct from 'accepted' then
    return jsonb_build_object('ok', false, 'error', 'not_ready');
  end if;
  if (select count(*) from public.employer_booking_rate_log
       where ip_hash = v_ip and kind = 'book' and created_at > now() - interval '1 hour') >= 3 then
    return jsonb_build_object('ok', false, 'error', 'rate_limited');
  end if;
  if v_note ~* '(https?://|www\.)\S+.*(https?://|www\.)\S+' then
    return jsonb_build_object('ok', false, 'error', 'links');
  end if;

  v_minutes := public._quote_visit_minutes(q);
  v_half_mode := v_minutes <= 270;
  if p_day is null or p_day < v_today + s.lead_days or p_day > v_today + s.horizon_days
     or p_half is null or (v_half_mode and p_half not in ('am', 'pm')) or (not v_half_mode and p_half <> 'day')
     or not public._booking_slot_open(p_day, p_half)
     or not public._booking_firm_day_open(s.firm_id, p_day, p_half) then
    return jsonb_build_object('ok', false, 'error', 'slot');
  end if;

  perform pg_advisory_xact_lock(hashtextextended('online-booking:' || s.firm_id::text, 0));
  perform public._expire_online_bookings(s.firm_id);
  -- One live booking per quote (a second tap, or two tabs).
  if exists (select 1 from public.employer_online_bookings b
              where b.quote_id = q.id and b.status in ('tentative', 'confirmed')) then
    return jsonb_build_object('ok', false, 'error', 'already_booked');
  end if;
  if (select count(*) from public.employer_online_bookings b
       where b.firm_id = s.firm_id and b.status = 'tentative' and b.day = p_day) >= 6 then
    return jsonb_build_object('ok', false, 'error', 'taken');
  end if;

  v_pc := public._quote_postcode(q);
  select oc.latitude, oc.longitude into o
    from public.uk_postcode_outcodes oc where oc.outcode = public._booking_outcode(v_pc);

  perform public._sched_options(s.firm_id, p_day, p_day, '{}', v_minutes / 60.0, 1,
                                o.latitude, o.longitude, 1, null, '{}', false, 1);
  select x.employee_id, x.name into pick
    from _sched_slot x where x.day = p_day and x.half = p_half and not x.is_app
   order by x.score, x.name limit 1;
  if pick.employee_id is null then
    return jsonb_build_object('ok', false, 'error', 'taken');
  end if;

  v_job := (public._job_from_quote(q.id)->>'job_id')::uuid;
  v_auto := s.auto_confirm;
  v_start := public._booking_half_start(p_half);
  v_label := public._booking_half_label(p_day, p_half);
  v_name := left(coalesce(nullif(btrim(q.accepted_by_name), ''), nullif(btrim(q.client_data->>'name'), ''), 'Customer'), 120);
  v_email := nullif(lower(btrim(coalesce(q.accepted_by_email, q.client_data->>'email', ''))), '');
  v_phone := nullif(left(btrim(coalesce(q.client_data->>'phone', '')), 30), '');
  v_addr := left(coalesce(nullif(btrim(q.job_details->>'location'), ''),
                          nullif(btrim(q.client_data->>'address'), ''), ''), 200);

  insert into public.employer_online_bookings (firm_id, reference, type_key, type_label, minutes, required, day, half,
                                               start_time, customer_name, customer_email, customer_phone, address,
                                               postcode, notes, lat, lng, suggested_employee_id, job_id, status,
                                               source, ip_hash, decided_at, quote_id)
  values (s.firm_id, v_ref, 'quote', 'Quote ' || coalesce(q.quote_number, ''), v_minutes, '{}', p_day, p_half,
          v_start, v_name, v_email, v_phone, nullif(v_addr, ''), v_pc, v_note, o.latitude, o.longitude,
          pick.employee_id, v_job, case when v_auto then 'confirmed' else 'tentative' end, 'quote_page', v_ip,
          case when v_auto then now() end, q.id)
  returning id into v_booking;

  if v_auto then
    update public.employer_jobs
       set start_date = p_day, end_date = p_day, board_stage = 'Scheduled',
           lat = coalesce(lat, o.latitude::numeric), lng = coalesce(lng, o.longitude::numeric),
           updated_at = now()
     where id = v_job;
    insert into public.employer_job_assignments
      (job_id, employee_id, start_date, end_date, start_time, hours_per_day, notes,
       status, assigned_by, notify_email)
    values (v_job, pick.employee_id, p_day, p_day, v_start, round(v_minutes / 60.0, 2),
            'Booked online from quote ' || coalesce(q.quote_number, '') || ', ref ' || v_ref,
            'assigned', 'Online booking', true);
    update public.quotes
       set booked_slot_start = (p_day + v_start) at time zone 'Europe/London',
           booked_slot_end = (p_day + public._booking_half_end(p_half)) at time zone 'Europe/London'
     where id = q.id;
    update public.calendar_events set customer_reminder_opt_in = true
     where mirrored_from_job = v_job and user_id = s.firm_id and v_email is not null;
  end if;

  insert into public.employer_booking_rate_log (firm_id, kind, ip_hash) values (s.firm_id, 'book', v_ip);

  perform public.notify_employer_bell(
    s.firm_id, 'online_booking',
    case when v_auto then 'Quote visit booked' else 'Quote visit to accept' end,
    v_name || ' picked ' || v_label || ' for quote ' || coalesce(q.quote_number, '') || '.',
    jsonb_build_object('route', case when v_auto then '/employer?section=jobs&job=' || v_job
                                     else '/employer?section=diary&booking=' || v_booking end,
                       'job_id', v_job, 'booking_id', v_booking, 'quote_id', q.id));

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
      raise warning '[book_quote_visit] confirmation: %', sqlerrm;
    end;
  end if;

  return jsonb_build_object('ok', true, 'reference', v_ref,
                            'status', case when v_auto then 'confirmed' else 'tentative' end,
                            'day', p_day, 'half', p_half, 'label', v_label);
end;
$$;
revoke all on function public.book_quote_visit(text, date, text, text) from public;
grant execute on function public.book_quote_visit(text, date, text, text) to anon, authenticated;
comment on function public.book_quote_visit(text, date, text, text) is
  'ELE-2065 §3A #6: public, token-keyed, rate limited. Books an accepted firm quote''s visit onto the job made from the quote (employer_online_bookings, source quote_page): tentative for the office to accept, or booked straight away with auto-confirm.';

-- ── Deciding a quote booking (ELE-2079 body, same signature) ──────────────
create or replace function public.decide_online_booking(p_booking uuid, p_action text, p_employee uuid default null,
                                                        p_day date default null, p_half text default null,
                                                        p_reason text default null)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  b public.employer_online_bookings;
  v_emp uuid;
  v_day date;
  v_half text;
  v_start time;
  v_assignment uuid;
  v_dep_cancelled boolean := false;
  -- ELE-2065: a visit booked from an accepted quote sits on the won job.
  v_from_quote boolean;
begin
  select * into b from public.employer_online_bookings where id = p_booking for update;
  if b.id is null or auth.uid() is null or b.firm_id not in (select public.my_employer_scope()) then
    raise exception 'Booking not found' using errcode = '42501';
  end if;
  if b.status <> 'tentative' then
    raise exception 'This booking has already been %', b.status using errcode = '22023';
  end if;
  v_from_quote := b.quote_id is not null
                  or exists (select 1 from public.quotes q where q.employer_job_id = b.job_id and q.deleted_at is null);

  if p_action = 'decline' then
    update public.employer_online_bookings
       set status = 'declined', decided_at = now(), decided_by = auth.uid(),
           decline_reason = nullif(left(btrim(coalesce(p_reason, '')), 300), ''), updated_at = now()
     where id = b.id;
    -- A won quote's job stays (back to "won, needs a date"); only a job the
    -- booking itself made is archived.
    if b.job_id is not null and not v_from_quote then
      update public.employer_jobs set archived_at = now(), updated_at = now()
       where id = b.job_id and archived_at is null;
    end if;
    if b.deposit_invoice_id is not null then
      update public.invoices set status = 'cancelled', updated_at = now()
       where id = b.deposit_invoice_id and user_id = b.firm_id
         and paid_at is null and coalesce(status, '') <> 'paid' and coalesce(total_paid, 0) = 0;
      v_dep_cancelled := found;
    end if;
    return jsonb_build_object('ok', true, 'status', 'declined', 'customer', b.customer_name,
                              'phone', b.customer_phone, 'email', b.customer_email,
                              'deposit_cancelled', v_dep_cancelled);
  end if;

  if p_action <> 'accept' then raise exception 'Unknown action' using errcode = '22023'; end if;
  if b.job_id is null then raise exception 'The diary job for this booking was removed' using errcode = '22023'; end if;

  v_emp := coalesce(p_employee, b.suggested_employee_id);
  if v_emp is null then raise exception 'Choose who goes' using errcode = '22023'; end if;
  v_day := coalesce(p_day, b.day);
  v_half := coalesce(p_half, b.half);
  if v_half not in ('am', 'pm', 'day') then raise exception 'Choose morning, afternoon or all day' using errcode = '22023'; end if;
  v_start := public._booking_half_start(v_half);

  update public.employer_jobs
     set start_date = v_day, end_date = v_day, board_stage = 'Scheduled',
         lat = coalesce(lat, b.lat::numeric), lng = coalesce(lng, b.lng::numeric), updated_at = now()
   where id = b.job_id;
  v_assignment := public.dispatch_assign(b.job_id, v_emp, v_day, v_day, v_start,
                                         round(b.minutes / 60.0, 2), 'Booked online, ref ' || b.reference);

  update public.employer_online_bookings
     set status = 'confirmed', decided_at = now(), decided_by = auth.uid(),
         day = v_day, half = v_half, start_time = v_start, suggested_employee_id = v_emp, updated_at = now()
   where id = b.id;
  if b.quote_id is not null then
    update public.quotes
       set booked_slot_start = (v_day + v_start) at time zone 'Europe/London',
           booked_slot_end = (v_day + public._booking_half_end(v_half)) at time zone 'Europe/London'
     where id = b.quote_id;
  end if;
  perform public.sync_firm_job_calendar(b.job_id);
  update public.calendar_events set customer_reminder_opt_in = true
   where mirrored_from_job = b.job_id and user_id = b.firm_id and b.customer_email is not null;

  return jsonb_build_object('ok', true, 'status', 'confirmed', 'job_id', b.job_id, 'assignment_id', v_assignment,
                            'has_email', b.customer_email is not null, 'day', v_day, 'half', v_half,
                            'moved', v_day <> b.day or v_half <> b.half);
end;
$function$;
