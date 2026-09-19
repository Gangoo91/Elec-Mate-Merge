-- ELE-1755 follow-on: a day-before reminder to the customer, opt-in per booking.
-- Set when the electrician emails the confirmation with "remind them" on;
-- stamped by send-booking-reminders once the reminder has gone.
-- Applied to the live project 19 Sep 2026 via MCP apply_migration.
alter table public.calendar_events
  add column if not exists customer_reminder_opt_in boolean not null default false,
  add column if not exists customer_reminder_sent_at timestamptz;

comment on column public.calendar_events.customer_reminder_opt_in is
  'Electrician asked for the customer to be emailed a reminder the evening before (TellCustomerSheet).';
comment on column public.calendar_events.customer_reminder_sent_at is
  'When send-booking-reminders emailed the day-before reminder. Null = not yet / not opted in.';

create index if not exists calendar_events_customer_reminder_due_idx
  on public.calendar_events (start_at)
  where customer_reminder_opt_in and customer_reminder_sent_at is null and client_id is not null;
