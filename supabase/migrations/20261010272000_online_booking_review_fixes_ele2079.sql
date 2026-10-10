-- ELE-2079 review fixes — online booking.
--
-- Additive: new helper functions, one cron job, and new versions of the
-- ELE-2079 functions (same signatures; HEAD and iOS build 49 call none of them).
--
--  1. Declining a booking cancels its unpaid DEP-BK- deposit invoice
--     (invoices.status 'cancelled', the value the table already allows), so it
--     is no longer payable at /pay/<id> or counted as owed.
--  1/2. A tentative booking whose deposit is not paid by its 48-hour due date
--     (or by the day itself) is released: booking cancelled, the Enquiry job
--     archived, the deposit invoice cancelled, the office told. Runs every 15
--     minutes (cron) and on read, for the firm, before slots are worked out or
--     a booking is made.
--  2. Caps on open tentative bookings: 6 per firm per day, 2 per postcode and
--     2 per email or phone. Past the cap a day stops being offered.
--  3. Deposit invoices follow the firm's VAT status (default_vat_registered,
--     else a VAT number on the profile). The deposit the customer sees is the
--     amount they pay; for a VAT-registered firm it is split into net + 20%.
--     VAT Notice 700 para 14.2.3: VAT is due on a deposit received before the
--     basic tax point.
--  4. The diary's calendar copy of an online booking carries its real window
--     (see 20261010272100), so the confirmation email and calendar file say
--     "8am to 12:30pm", not "all day".
--  5. Same-day cut-off: a slot is only bookable up to 2 hours before it starts.
--  8. England and Wales bank holidays are not bookable (gov.uk/bank-holidays,
--     2026 to 2028). IPs and contacts are hashed with a secret key (HMAC-SHA256,
--     key in Vault) instead of a salted md5, and booking ip_hash is cleared after
--     30 days.
--  7. The bell for an auto-confirmed booking opens the job.
--
-- This file: the helpers, the expiry and its cron. The functions that use
-- them are in 20261010272010 (public) and 20261010272020 (office), and the
-- calendar window in 20261010272100.

-- ── Keyed hash ─────────────────────────────────────────────────────────────
do $$
begin
  if not exists (select 1 from vault.secrets where name = 'online_booking_hash_key') then
    perform vault.create_secret(encode(extensions.gen_random_bytes(32), 'hex'), 'online_booking_hash_key',
                                'ELE-2079: key for hashing online booking IPs and contacts');
  end if;
end $$;

create or replace function public._booking_hash(p_value text)
returns text
language plpgsql
stable
security definer
set search_path to 'public'
as $$
declare
  k text;
begin
  select decrypted_secret into k from vault.decrypted_secrets where name = 'online_booking_hash_key' limit 1;
  if k is null then
    raise exception 'online booking hash key missing';
  end if;
  return encode(extensions.hmac(coalesce(p_value, ''), k, 'sha256'), 'hex');
end;
$$;

-- The caller's IP, keyed-hashed. Same header order as _lead_page_ip_hash.
create or replace function public._booking_ip_hash()
returns text
language plpgsql
stable
security definer
set search_path to 'public'
as $$
declare
  h json;
  ip text;
begin
  begin
    h := current_setting('request.headers', true)::json;
  exception when others then
    h := null;
  end;
  ip := coalesce(
    nullif(trim(split_part(h->>'x-forwarded-for', ',', 1)), ''),
    nullif(h->>'cf-connecting-ip', ''),
    nullif(h->>'x-real-ip', ''),
    'unknown');
  return public._booking_hash('ip:' || ip);
end;
$$;

-- ── Bookable days and times ───────────────────────────────────────────────
-- England and Wales bank holidays, from https://www.gov.uk/bank-holidays.json.
create or replace function public._booking_bank_holiday(p_day date)
returns boolean
language sql
immutable
set search_path to 'public'
as $$
  select p_day = any (array[
    '2026-01-01','2026-04-03','2026-04-06','2026-05-04','2026-05-25','2026-08-31','2026-12-25','2026-12-28',
    '2027-01-01','2027-03-26','2027-03-29','2027-05-03','2027-05-31','2027-08-30','2027-12-27','2027-12-28',
    '2028-01-03','2028-04-14','2028-04-17','2028-05-01','2028-05-29','2028-08-28','2028-12-25','2028-12-26'
  ]::date[]);
$$;

create or replace function public._booking_half_start(p_half text)
returns time
language sql
immutable
set search_path to 'public'
as $$
  select case p_half when 'pm' then time '12:30' else time '08:00' end;
$$;

create or replace function public._booking_half_end(p_half text)
returns time
language sql
immutable
set search_path to 'public'
as $$
  select case p_half when 'am' then time '12:30' else time '17:00' end;
$$;

-- A weekday, not a bank holiday, not in the past, and at least 2 hours away.
create or replace function public._booking_slot_open(p_day date, p_half text)
returns boolean
language sql
stable
set search_path to 'public'
as $$
  select p_day is not null
     and extract(isodow from p_day) <= 5
     and not public._booking_bank_holiday(p_day)
     and (now() at time zone 'Europe/London') + interval '2 hours'
         <= (p_day + public._booking_half_start(p_half));
$$;

-- ── Releasing unpaid deposits ─────────────────────────────────────────────
create or replace function public._expire_online_bookings(p_firm uuid default null)
returns int
language plpgsql
volatile
security definer
set search_path to 'public'
as $$
declare
  r record;
  n int := 0;
  v_today date := (now() at time zone 'Europe/London')::date;
begin
  for r in
    select b.id, b.firm_id, b.job_id, b.deposit_invoice_id, b.reference, b.customer_name, b.type_label, b.day, b.half
      from public.employer_online_bookings b
      join public.invoices i on i.id = b.deposit_invoice_id
     where b.status = 'tentative'
       and (p_firm is null or b.firm_id = p_firm)
       and i.paid_at is null and coalesce(i.status, '') <> 'paid' and coalesce(i.total_paid, 0) = 0
       and (i.due_date < now() or b.day <= v_today)
     for update of b skip locked
  loop
    update public.employer_online_bookings
       set status = 'cancelled', decided_at = now(), decline_reason = 'Deposit not paid in time', updated_at = now()
     where id = r.id;
    if r.job_id is not null then
      update public.employer_jobs set archived_at = now(), updated_at = now()
       where id = r.job_id and archived_at is null and coalesce(board_stage, '') = 'Enquiry';
    end if;
    update public.invoices set status = 'cancelled', updated_at = now()
     where id = r.deposit_invoice_id and paid_at is null and coalesce(status, '') <> 'paid';
    perform public.notify_employer_bell(
      r.firm_id, 'online_booking', 'Online booking released',
      r.type_label || ' for ' || r.customer_name || ', ' || public._booking_half_label(r.day, r.half)
        || '. The deposit was not paid in time, so the slot is free again.',
      jsonb_build_object('route', '/employer?section=diary&booking=' || r.id, 'booking_id', r.id));
    n := n + 1;
  end loop;

  if p_firm is null then
    update public.employer_online_bookings set ip_hash = null
     where ip_hash is not null and created_at < now() - interval '30 days';
    delete from public.employer_booking_rate_log where created_at < now() - interval '30 days';
  end if;
  return n;
end;
$$;

-- Old salted-md5 hashes (32 hex characters) are reversible for IPv4: clear them.
update public.employer_online_bookings set ip_hash = null where ip_hash ~ '^[0-9a-f]{32}$';
delete from public.employer_booking_rate_log where ip_hash ~ '^[0-9a-f]{32}$';

comment on table public.employer_booking_rate_log is
  '[EMPLOYER HUB] Online booking request log (ELE-2079): keyed hash (HMAC-SHA256) of IP and contact per slot lookup or booking, for server-side rate limits. Scope: firm_id = the owning account. Used by: get_booking_slots, create_online_booking. Rule: no client access; rows older than 30 days are purged by the online-booking-expiry cron.';

revoke all on function public._booking_hash(text) from public, anon, authenticated;
revoke all on function public._booking_ip_hash() from public, anon, authenticated;
revoke all on function public._booking_bank_holiday(date) from public, anon, authenticated;
revoke all on function public._booking_half_start(text) from public, anon, authenticated;
revoke all on function public._booking_half_end(text) from public, anon, authenticated;
revoke all on function public._booking_slot_open(date, text) from public, anon, authenticated;
revoke all on function public._expire_online_bookings(uuid) from public, anon, authenticated;


select cron.unschedule('online-booking-expiry') where exists (select 1 from cron.job where jobname = 'online-booking-expiry');
select cron.schedule('online-booking-expiry', '*/15 * * * *', 'select public._expire_online_bookings(null);');
