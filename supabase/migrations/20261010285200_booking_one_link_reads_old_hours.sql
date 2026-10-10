-- Gap analysis §4 item 3: two online booking systems.
--
--   /book/:userId      (Electrical Hub, ELE-955/1513, in HEAD and build 49):
--                      public-booking edge fn, profiles.scheduling_* settings
--                      (every profile has a row: the column default is Mon to
--                      Fri 08:00 to 18:00), books into calendar_events. Also
--                      carries the quote-acceptance start-date flow (?quote=)
--                      and the reminder loop-closers (?rid=, ?visit=). Live
--                      use: 34 bookings by 11 accounts, 15 in the last 90 days.
--   /book-visit/:key   (Employer Hub, ELE-2079, uncommitted): firm job types,
--                      area served, crew skills, tentative firm jobs, deposits.
--                      0 settings rows today.
--
-- Chosen: for a FIRM, /book-visit is the better system (it books crew, not a
-- personal diary, and checks area and skills). /book/:id stays the link for
-- sole traders and for every quote/reminder flow, so nothing in HEAD, build 49
-- or any link already sent changes.
--   * get_booking_key_for_account(account): the firm's /book-visit key, only
--     while its online booking is switched on. PublicBooking (/book/:id with no
--     ?quote, ?rid or ?visit) uses it to send visitors on to /book-visit, so an
--     old link a firm already gave out keeps working and lands on the new page.
--   * The new page reads the old availability: _booking_firm_day_open() applies
--     the owner's Booking availability working hours and days off
--     (profiles.scheduling_working_hours / scheduling_blackout_dates) on top of
--     the weekday and bank-holiday rule, in get_booking_slots and
--     create_online_booking. A profile with every day blank counts as "not
--     set" (no narrowing), so turning on online booking never silently shows
--     no times. Weekends stay closed online, as before.
--
-- Additive: two new functions; two ELE-2079 bodies (not called by HEAD)
-- patched in place with no signature change. No data written.

create or replace function public._booking_firm_day_open(p_firm uuid, p_day date, p_half text)
returns boolean
language plpgsql stable security definer set search_path to 'public' as $$
declare
  v_hours jsonb;
  v_off jsonb;
  v_dow text;
  v_win jsonb;
  v_start time;
  v_end time;
begin
  if p_firm is null or p_day is null then return true; end if;
  select pr.scheduling_working_hours, pr.scheduling_blackout_dates into v_hours, v_off
    from public.profiles pr where pr.id = p_firm;

  -- Days off ([{start, end}] dates, inclusive).
  if jsonb_typeof(v_off) = 'array' and exists (
       select 1 from jsonb_array_elements(v_off) b
        where jsonb_typeof(b) = 'object'
          and (b ->> 'start') ~ '^\d{4}-\d{2}-\d{2}'
          and p_day between (b ->> 'start')::date
                        and coalesce(nullif(b ->> 'end', '')::date, (b ->> 'start')::date)) then
    return false;
  end if;

  -- No hours, or every day blank: not set, so no narrowing.
  if jsonb_typeof(v_hours) <> 'object' or not exists (
       select 1 from jsonb_each(v_hours) e where jsonb_typeof(e.value) = 'object') then
    return true;
  end if;

  v_dow := (array['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'])[extract(isodow from p_day)::int];
  v_win := v_hours -> v_dow;
  if jsonb_typeof(v_win) <> 'object' then return false; end if;
  begin
    v_start := (v_win ->> 'start')::time;
    v_end := (v_win ->> 'end')::time;
  exception when others then
    return true;
  end;
  if v_start is null or v_end is null or v_end <= v_start then return true; end if;

  -- The half has to sit inside the working day for at least two hours
  -- (a whole-day visit needs the whole 08:00 to 17:00 window to overlap by
  -- six), so an evening-only electrician isn't offered a morning.
  return extract(epoch from (least(v_end, public._booking_half_end(p_half))
                             - greatest(v_start, public._booking_half_start(p_half)))) / 3600
         >= case when p_half = 'day' then 6 else 2 end;
end;
$$;
revoke all on function public._booking_firm_day_open(uuid, date, text) from public, anon, authenticated;

-- Public: the firm's /book-visit key for an account id, only while online
-- booking is on. The account id is already public in the old /book/:id link.
create or replace function public.get_booking_key_for_account(p_account uuid)
returns text
language sql stable security definer set search_path to 'public' as $$
  select s.public_key from public.employer_booking_settings s
   where s.firm_id = p_account and s.enabled
$$;
revoke all on function public.get_booking_key_for_account(uuid) from public;
grant execute on function public.get_booking_key_for_account(uuid) to anon, authenticated;

do $do$
declare
  v_sig regprocedure;
  v_def text;
  v_from text;
  v_to text;
begin
  v_sig := 'public.get_booking_slots(text, text, text)'::regprocedure;
  v_def := pg_get_functiondef(v_sig);
  v_from := 'and public._booking_slot_open(x.day, x.half)';
  v_to := 'and public._booking_slot_open(x.day, x.half)'
       || E'\n             -- Gap §4.3: the owner''s working hours and days off.'
       || E'\n             and public._booking_firm_day_open(s.firm_id, x.day, x.half)';
  if position(v_from in v_def) = 0 then raise exception 'get_booking_slots: slot rule not found'; end if;
  execute replace(v_def, v_from, v_to);

  v_sig := 'public.create_online_booking(text, text, date, text, text, text, text, text, text, text, text, text, integer)'::regprocedure;
  v_def := pg_get_functiondef(v_sig);
  v_from := 'or not public._booking_slot_open(p_day, p_half) then';
  v_to := 'or not public._booking_slot_open(p_day, p_half)'
       || E'\n     or not public._booking_firm_day_open(s.firm_id, p_day, p_half) then';
  if position(v_from in v_def) = 0 then raise exception 'create_online_booking: slot rule not found'; end if;
  execute replace(v_def, v_from, v_to);
end
$do$;
