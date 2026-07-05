alter table public.employer_seats drop constraint if exists employer_seats_status_check;
alter table public.employer_seats add constraint employer_seats_status_check
  check (status = any (array['pending'::text,'active'::text,'suspended'::text,'revoked'::text]));
