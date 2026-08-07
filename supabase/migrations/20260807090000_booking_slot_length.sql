-- Booking slot length.
--
-- `public-booking` has always offered exactly one hour: SLOT_DURATION_MINUTES
-- was a module constant with nothing behind it, so a socket test and a
-- consumer unit change were presented to the client identically.
--
-- Default 60 keeps every existing booking page behaving exactly as it does
-- today; nobody has to touch a setting to stay where they are.

alter table public.profiles
  add column if not exists scheduling_slot_minutes integer not null default 60;

-- Constrained rather than free: the slot walker steps in whole multiples of
-- this value across a working day, and an arbitrary number (37 minutes) yields
-- start times no electrician would choose to offer.
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.profiles'::regclass
      and conname = 'profiles_scheduling_slot_minutes_check'
  ) then
    alter table public.profiles
      add constraint profiles_scheduling_slot_minutes_check
      check (scheduling_slot_minutes in (30, 60, 90, 120));
  end if;
end $$;

comment on column public.profiles.scheduling_slot_minutes is
  'Length of each bookable slot on the public booking page, in minutes. Read by the public-booking edge function.';
