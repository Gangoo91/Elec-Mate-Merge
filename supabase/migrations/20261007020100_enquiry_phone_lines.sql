-- ELE-2022 item 5: calls and texts (Twilio). Built now, switched on when Twilio is set up.
-- Each account can have one Elec-Mate number. Their own mobile forwards unanswered
-- calls to it; texts to it become enquiries.

create table if not exists public.phone_lines (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  twilio_number text not null unique check (twilio_number ~ '^\+44\d{9,10}$'),
  enabled boolean not null default true,
  -- Text the caller a link after a missed call
  auto_text boolean not null default true,
  auto_text_message text,
  -- Ask for a voicemail (recorded; the greeting says so)
  voicemail boolean not null default true,
  greeting text,
  created_at timestamptz not null default now()
);

alter table public.phone_lines enable row level security;

drop policy if exists "Account reads its phone line" on public.phone_lines;
create policy "Account reads its phone line" on public.phone_lines
  for select to authenticated using (user_id in (select public.my_employer_scope()));

drop policy if exists "Account updates its phone line" on public.phone_lines;
create policy "Account updates its phone line" on public.phone_lines
  for update to authenticated
  using (user_id in (select public.my_employer_scope()))
  with check (user_id in (select public.my_employer_scope()));
-- Numbers are provisioned by Elec-Mate (service role); no insert/delete policy.

comment on table public.phone_lines is '[SHARED: ELECTRICAL HUB + EMPLOYER HUB] The account''s Elec-Mate phone number (Twilio) for missed calls and texts → Enquiries (ELE-2022). Scope: user_id = the owning account. Used by: twilio-inbound fn, Connect enquiries page. Rule: provisioned by Elec-Mate only; the account can toggle auto-text / voicemail and edit the wording.';

alter table public.enquiries
  add column if not exists call_sid text,
  add column if not exists voicemail_seconds integer;
comment on column public.enquiries.call_sid is 'Twilio CallSid for a missed-call enquiry; the voicemail updates the same card.';

create index if not exists enquiries_call_sid_idx on public.enquiries (call_sid) where call_sid is not null;
