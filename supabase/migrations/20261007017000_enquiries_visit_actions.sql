-- ELE-2022: Book / No-visit buttons on the notification itself.
-- The push carries a single-use code; only its SHA-256 is stored, and it lapses
-- after 48 hours or as soon as the visit is booked or declined.

alter table public.enquiries
  add column if not exists visit_action_hash text,
  add column if not exists visit_action_expires_at timestamptz;

comment on column public.enquiries.visit_action_hash is 'SHA-256 of the single-use code in the visit push (Book / No visit buttons). Cleared once used.';

create index if not exists enquiries_user_visit_proposed_idx
  on public.enquiries (user_id) where visit_status = 'proposed';
