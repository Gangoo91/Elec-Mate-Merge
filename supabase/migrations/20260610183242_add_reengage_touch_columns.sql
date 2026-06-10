-- Touches 2 and 3 of the abandoned-checkout re-engagement sequence (ELE-1027 follow-on).
-- Same claim-first dedupe pattern as reengage_email_sent_at (touch 1).
alter table public.profiles
  add column if not exists reengage_email_2_sent_at timestamptz,
  add column if not exists reengage_email_3_sent_at timestamptz;
