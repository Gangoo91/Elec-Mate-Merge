-- ELE-2062 follow-up. Additive only.
--
-- 1. The uploader may delete their own fit-note file while no sickness record
--    points at it (an upload whose save failed, or a test file). Once a record
--    holds the file it is kept: nobody can delete it from the app.
-- 2. The daily fit-note reminder only looks at sickness that is still running
--    or ended in the last 14 days, so the first run does not chase old absences.

drop policy if exists "Fit notes: delete own unattached upload" on storage.objects;
create policy "Fit notes: delete own unattached upload"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'fit-notes'
    and (storage.foldername(name))[1] = (select auth.uid())::text
    and not exists (
      select 1 from public.employer_sickness_records s where s.fit_note_path = storage.objects.name
    )
  );

create or replace function public.notify_pay_law_alerts()
returns void language plpgsql security definer set search_path = public as $$
declare
  r record;
  m record;
  v_today date := (now() at time zone 'Europe/London')::date;
  v_ends date;
  v_ref text;
  v_first text;
  v_min record;
  v_now_min record;
begin
  -- 1. Apprentice rate ending (age 19+ and past the first year).
  for r in
    select p.employee_id, p.employer_id, p.date_of_birth, p.apprenticeship_start_date,
           e.name, e.hourly_rate, e.pay_type
      from employer_employee_pay_profiles p
      join employer_employees e on e.id = p.employee_id
     where p.date_of_birth is not null and p.apprenticeship_start_date is not null
       and lower(coalesce(e.status, '')) = 'active'
  loop
    begin
      v_ends := greatest((r.date_of_birth + interval '19 years')::date,
                         (r.apprenticeship_start_date + interval '1 year')::date);
      continue when v_ends > v_today + 30 or v_ends < v_today - 30;
      v_ref := 'apprate:' || r.employee_id || ':' || v_ends;
      insert into employer_expiry_sent (firm, ref) values (r.employer_id, v_ref) on conflict do nothing;
      continue when not found;
      select * into v_min from public.nmw_minimum_on(r.date_of_birth, r.apprenticeship_start_date, v_ends);
      v_first := coalesce(nullif(split_part(r.name, ' ', 1), ''), 'An apprentice');
      perform public.notify_employer_bell(
        r.employer_id, 'pay_rate_alert',
        'Apprentice rate ends for ' || v_first,
        case when v_ends > v_today then 'From ' || to_char(v_ends, 'FMDD Mon YYYY') else 'Since ' || to_char(v_ends, 'FMDD Mon YYYY') end
          || ' they are 19 or over and past their first year, so the legal minimum is £'
          || to_char(v_min.rate, 'FM990.00') || ' an hour'
          || case when r.pay_type = 'hourly' and coalesce(r.hourly_rate, 0) > 0 and r.hourly_rate < v_min.rate
                  then '. Their rate is £' || to_char(r.hourly_rate, 'FM990.00') || ', so it needs to go up.'
                  else '.' end,
        jsonb_build_object('route', '/employer?section=team&member=' || r.employee_id || '&memberTab=details',
                           'employee_id', r.employee_id, 'ref_id', v_ref));
    exception when others then
      raise warning '[notify_pay_law_alerts] apprate %: %', r.employee_id, sqlerrm;
    end;
  end loop;

  -- 2. Hourly rate below the legal minimum now, or within 30 days (a
  --    birthday, the first anniversary, or the April uprating).
  for r in
    select p.employee_id, p.employer_id, p.date_of_birth, p.apprenticeship_start_date,
           e.name, e.hourly_rate
      from employer_employee_pay_profiles p
      join employer_employees e on e.id = p.employee_id
     where lower(coalesce(e.status, '')) = 'active'
       and e.pay_type = 'hourly' and coalesce(e.hourly_rate, 0) > 0
       and (p.date_of_birth is not null or p.apprenticeship_start_date is not null)
  loop
    begin
      v_first := coalesce(nullif(split_part(r.name, ' ', 1), ''), 'Someone');
      select * into v_now_min from public.nmw_minimum_on(r.date_of_birth, r.apprenticeship_start_date, v_today);
      if v_now_min.rate is not null and r.hourly_rate < v_now_min.rate then
        v_ref := 'nmwbelow:' || r.employee_id || ':' || v_now_min.band || ':' || v_now_min.rate || ':' || r.hourly_rate;
        insert into employer_expiry_sent (firm, ref) values (r.employer_id, v_ref) on conflict do nothing;
        if found then
          perform public.notify_employer_bell(
            r.employer_id, 'pay_rate_alert',
            v_first || ' is paid below the legal minimum',
            '£' || to_char(r.hourly_rate, 'FM990.00') || ' an hour. The minimum for them today is £'
              || to_char(v_now_min.rate, 'FM990.00') || '.',
            jsonb_build_object('route', '/employer?section=team&member=' || r.employee_id || '&memberTab=details',
                               'employee_id', r.employee_id, 'ref_id', v_ref));
        end if;
        continue;
      end if;
      for m in select g::date as d from generate_series(v_today + 1, v_today + 30, interval '1 day') g loop
        select * into v_min from public.nmw_minimum_on(r.date_of_birth, r.apprenticeship_start_date, m.d);
        if v_min.rate is not null and r.hourly_rate < v_min.rate then
          v_ref := 'nmwrise:' || r.employee_id || ':' || m.d || ':' || v_min.rate;
          insert into employer_expiry_sent (firm, ref) values (r.employer_id, v_ref) on conflict do nothing;
          if found then
            perform public.notify_employer_bell(
              r.employer_id, 'pay_rate_alert',
              'Pay rise due for ' || v_first,
              'From ' || to_char(m.d, 'FMDD Mon YYYY') || ' the legal minimum for them is £'
                || to_char(v_min.rate, 'FM990.00') || ' an hour. They are on £'
                || to_char(r.hourly_rate, 'FM990.00') || '.',
              jsonb_build_object('route', '/employer?section=team&member=' || r.employee_id || '&memberTab=details',
                                 'employee_id', r.employee_id, 'ref_id', v_ref));
          end if;
          exit;
        end if;
      end loop;
    exception when others then
      raise warning '[notify_pay_law_alerts] nmw %: %', r.employee_id, sqlerrm;
    end;
  end loop;

  -- 3. Fit note needed: off sick more than 7 days in a row (including
  --    non-working days), still off or back within the last 14 days, and no
  --    fit note on the record yet.
  for r in
    select lr.id, lr.employee_id, lr.start_date, lr.end_date, e.employer_id, e.name, e.user_id
      from employer_leave_requests lr
      join employer_employees e on e.id = lr.employee_id
      left join employer_sickness_records s on s.leave_request_id = lr.id
     where lr.type = 'sick'
       and lower(coalesce(lr.status, '')) in ('approved', 'pending')
       and lower(coalesce(e.status, '')) = 'active'
       and lr.start_date + 7 <= v_today
       and lr.end_date - lr.start_date + 1 > 7
       and lr.end_date >= v_today - 14
       and s.fit_note_path is null
  loop
    begin
      v_ref := 'fitnote:' || r.id;
      insert into employer_expiry_sent (firm, ref) values (r.employer_id, v_ref) on conflict do nothing;
      continue when not found;
      v_first := coalesce(nullif(split_part(r.name, ' ', 1), ''), 'Someone');
      perform public.notify_employer_bell(
        r.employer_id, 'fit_note',
        'Fit note needed from ' || v_first,
        'Off sick since ' || to_char(r.start_date, 'FMDD Mon') || ', more than 7 days. Ask for a fit note and add it to the sickness record.',
        jsonb_build_object('route', '/employer?section=leave&sick=' || r.id,
                           'employee_id', r.employee_id, 'leave_request_id', r.id, 'ref_id', v_ref));
      if r.user_id is not null then
        perform public.worker_notify(
          r.user_id, 'fit_note',
          'Send the office your fit note',
          'You have been off more than 7 days, so the office needs a fit note from your GP or the hospital. Add a photo of it in Leave.',
          jsonb_build_object('route', '/electrician/worker-tools/leave?sick=' || r.id,
                             'employee_id', r.employee_id, 'leave_request_id', r.id));
      end if;
    exception when others then
      raise warning '[notify_pay_law_alerts] fitnote %: %', r.id, sqlerrm;
    end;
  end loop;
end $$;
revoke all on function public.notify_pay_law_alerts() from public, anon, authenticated;
