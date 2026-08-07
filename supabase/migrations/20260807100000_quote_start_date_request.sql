-- Quote acceptance asks for a start date, not an hour slot.
--
-- ELE-1513 / ELE-1512. The acceptance flow offered a grid of one-hour slots
-- to every client regardless of job size. 13 of 751 accepted quotes ever used
-- it — 1.7%, and flat across every job size, so it was not a discoverability
-- problem but the wrong instrument: someone who has just signed a 206-hour
-- job does not pick a Tuesday 2pm.
--
-- Deriving the duration from the quote instead was not viable either. Only
-- 278 of 751 accepted quotes (37%) carry hour-priced labour lines; 339 price
-- labour by the job and 135 have no labour lines at all. And where hours do
-- exist they are a cost measure, not elapsed time — two identical 40-hour
-- "Qualified Electrician" lines on quote 2026/040 are two people in parallel,
-- not 80 sequential hours.
--
-- So the client states when they would like the work to start and the
-- electrician confirms. `booked_slot_start`/`booked_slot_end` keep their
-- existing meaning: an actually-confirmed booking.

alter table public.quotes
  add column if not exists requested_start_date date,
  add column if not exists requested_time_preference text,
  add column if not exists requested_at timestamptz;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.quotes'::regclass
      and conname = 'quotes_requested_time_preference_check'
  ) then
    alter table public.quotes
      add constraint quotes_requested_time_preference_check
      check (
        requested_time_preference is null
        or requested_time_preference in ('morning', 'afternoon', 'flexible')
      );
  end if;
end $$;

comment on column public.quotes.requested_start_date is
  'Start date the client asked for on the acceptance page. A request, not a booking — the electrician confirms it, which is what writes booked_slot_start.';
comment on column public.quotes.requested_time_preference is
  'morning | afternoon | flexible. Deliberately coarse: the client is stating a preference, not reserving an hour.';

-- Finding the quotes still waiting on a confirmation, which is the only way
-- this column is ever read.
create index if not exists quotes_awaiting_start_confirmation_idx
  on public.quotes (user_id, requested_start_date)
  where requested_start_date is not null and booked_slot_start is null;
