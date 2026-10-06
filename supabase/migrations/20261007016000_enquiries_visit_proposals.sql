-- ELE-2022: the AI proposes site-visit times from the diary; the electrician approves.
-- Nothing is booked or sent until they tap "Book this".

alter table public.enquiries
  add column if not exists proposed_slots jsonb not null default '[]'::jsonb,
  add column if not exists visit_status text check (visit_status in ('proposed', 'booked', 'declined')),
  add column if not exists visit_start timestamptz;

comment on column public.enquiries.proposed_slots is 'Up to 3 visit times the AI found free: [{start, end, label, reason, near_miles}]. ISO instants. Proposal only.';
comment on column public.enquiries.visit_status is 'proposed = waiting for the electrician; booked = they approved (calendar_event_id set); declined = no visit needed.';
