-- ELE-2079 review fixes, part 2 (see 20261010272000): get_booking_slots and
-- create_online_booking with the bookable-day rules, caps, keyed hashes, VAT
-- on deposits and the job route on the auto-confirmed bell. Same signatures.

-- ── Public ───────────────────────────────────────────────────────────────
create or replace function public.get_booking_slots(p_key text, p_type text, p_postcode text)
returns jsonb
language plpgsql
volatile
security definer
set search_path to 'public'
as $$
declare
  s public.employer_booking_settings := public._booking_settings_for(p_key);
  v_ip text := public._booking_ip_hash();
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

  perform public._expire_online_bookings(s.firm_id);

  perform public._sched_options(
    s.firm_id, v_today + s.lead_days, v_today + s.horizon_days,
    coalesce((select array_agg(x) from jsonb_array_elements_text(coalesce(t->'required', '[]'::jsonb)) x), '{}'),
    v_minutes / 60.0, 1, (a->>'lat')::float8, (a->>'lng')::float8, 1, null, '{}', false, 1);

  select coalesce(jsonb_agg(jsonb_build_object('day', d.day, 'label', to_char(d.day, 'FMDy FMDD FMMon'),
                                               'halves', d.halves) order by d.day), '[]'::jsonb)
    into v_days
    from (select x.day, jsonb_agg(distinct x.half) as halves
            from _sched_slot x
           where not x.is_app
             and public._booking_slot_open(x.day, x.half)
             and (select count(*) from public.employer_online_bookings b
                   where b.firm_id = s.firm_id and b.status = 'tentative' and b.day = x.day) < 6
           group by x.day) d;

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
  v_ip text := public._booking_ip_hash();
  v_today date := (now() at time zone 'Europe/London')::date;
  v_name text := left(regexp_replace(btrim(coalesce(p_name, '')), '\s+', ' ', 'g'), 120);
  v_email text := nullif(lower(btrim(coalesce(p_email, ''))), '');
  v_phone text := nullif(left(regexp_replace(btrim(coalesce(p_phone, '')), '[^0-9+() -]', '', 'g'), 30), '');
  v_addr text := nullif(left(regexp_replace(btrim(coalesce(p_address, '')), '\s+', ' ', 'g'), 200), '');
  v_notes text := nullif(left(btrim(coalesce(p_notes, '')), 1500), '');
  v_pc text := public._booking_postcode_tidy(p_postcode);
  v_source text := case when p_source in ('quote_page', 'website', 'google', 'link') then p_source else 'link' end;
  v_contact text;
  v_digits text;
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
  v_net numeric;
  v_vat boolean;
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

  v_digits := nullif(regexp_replace(coalesce(v_phone, ''), '[^0-9]', '', 'g'), '');
  v_contact := public._booking_hash('contact:' || coalesce(v_email, '') || '|' || coalesce(v_digits, ''));
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
     or p_half is null or (v_half_mode and p_half not in ('am', 'pm')) or (not v_half_mode and p_half <> 'day')
     or not public._booking_slot_open(p_day, p_half) then
    return jsonb_build_object('ok', false, 'error', 'slot');
  end if;
  v_req := coalesce((select array_agg(x) from jsonb_array_elements_text(coalesce(t->'required', '[]'::jsonb)) x), '{}');

  -- One booking at a time per firm, so two customers can't take the same slot.
  perform pg_advisory_xact_lock(hashtextextended('online-booking:' || s.firm_id::text, 0));
  perform public._expire_online_bookings(s.firm_id);

  -- Open tentative bookings hold slots, so cap them: per day, per postcode,
  -- per email or phone.
  if (select count(*) from public.employer_online_bookings b
       where b.firm_id = s.firm_id and b.status = 'tentative' and b.day = p_day) >= 6 then
    return jsonb_build_object('ok', false, 'error', 'taken');
  end if;
  if (select count(*) from public.employer_online_bookings b
       where b.firm_id = s.firm_id and b.status = 'tentative' and b.day >= v_today and b.postcode = v_pc) >= 2
     or (select count(*) from public.employer_online_bookings b
       where b.firm_id = s.firm_id and b.status = 'tentative' and b.day >= v_today
         and ((v_email is not null and b.customer_email = v_email)
              or (v_digits is not null and regexp_replace(coalesce(b.customer_phone, ''), '[^0-9]', '', 'g') = v_digits))) >= 2 then
    return jsonb_build_object('ok', false, 'error', 'rate_limited');
  end if;

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
  v_start := public._booking_half_start(p_half);
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
    -- worker, log the dispatch change and update the diary's calendar entry
    -- (which now carries the booking's window, 20261010272100).
    insert into public.employer_job_assignments
      (job_id, employee_id, start_date, end_date, start_time, hours_per_day, notes,
       status, assigned_by, notify_email)
    values (v_job, pick.employee_id, p_day, p_day, v_start, round(v_minutes / 60.0, 2),
            'Booked online, ref ' || v_ref, 'assigned', 'Online booking', true);
    update public.calendar_events set customer_reminder_opt_in = true
     where mirrored_from_job = v_job and user_id = s.firm_id and v_email is not null;
  end if;

  if v_dep is not null then
    -- The deposit shown to the customer is what they pay. A VAT-registered
    -- firm charges VAT on it (VAT Notice 700 para 14.2.3), so it is split into
    -- net + 20%; otherwise there is no VAT.
    select coalesce(c.default_vat_registered, nullif(btrim(coalesce(c.vat_number, '')), '') is not null)
      into v_vat
      from public.company_profiles c where c.user_id = s.firm_id
     order by c.updated_at desc nulls last limit 1;
    v_vat := coalesce(v_vat, false);
    v_net := case when v_vat then round(v_dep / 1.2, 2) else v_dep end;
    insert into public.invoices (user_id, invoice_number, client_data, items, settings, subtotal, vat_amount, total,
                                 status, invoice_date, due_date, notes)
    values (s.firm_id, 'DEP-BK-' || v_ref,
            jsonb_strip_nulls(jsonb_build_object('name', v_name, 'email', v_email, 'phone', v_phone,
                                                 'address', v_addr, 'postcode', v_pc)),
            jsonb_build_array(jsonb_build_object('id', gen_random_uuid(), 'description',
              'Deposit · ' || (t->>'label') || ' on ' || v_label, 'quantity', 1, 'unit', 'each',
              'unitPrice', v_net, 'totalPrice', v_net, 'category', 'manual')),
            case when v_vat then jsonb_build_object('vatRegistered', true, 'vatRate', 20, 'paymentTerms', '48 hours')
                 else jsonb_build_object('vatRegistered', false, 'paymentTerms', '48 hours') end,
            v_net, case when v_vat then v_dep - v_net else 0 end, v_dep,
            'sent', now(), now() + interval '48 hours',
            'Online booking ' || v_ref || '. Unpaid after 48 hours, the booking is released.')
    returning id into v_inv;
    update public.employer_online_bookings set deposit_invoice_id = v_inv where id = v_booking;
  end if;

  insert into public.employer_booking_rate_log (firm_id, kind, ip_hash, contact_hash)
  values (s.firm_id, 'book', v_ip, v_contact);

  perform public.notify_employer_bell(
    s.firm_id, 'online_booking',
    case when v_auto then 'Booked online' else 'New online booking to accept' end,
    (t->>'label') || ' for ' || v_name || ', ' || v_label || case when v_dep is not null then '. Deposit asked' else '' end,
    jsonb_build_object('route', case when v_auto then '/employer?section=jobs&job=' || v_job
                                     else '/employer?section=diary&booking=' || v_booking end,
                       'job_id', v_job, 'booking_id', v_booking));

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

revoke all on function public.get_booking_slots(text, text, text) from public;
grant execute on function public.get_booking_slots(text, text, text) to anon, authenticated;
revoke all on function public.create_online_booking(text, text, date, text, text, text, text, text, text, text, text, text, int) from public;
grant execute on function public.create_online_booking(text, text, date, text, text, text, text, text, text, text, text, text, int) to anon, authenticated;
