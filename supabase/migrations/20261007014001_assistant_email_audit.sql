-- Emails Mate sent for a user (send-assistant-email), for a per-sender cap.
-- Until 7 Oct 2026 that function sent any to/subject/body from
-- noreply@elec-mate.com for anyone holding the public key (an open relay).
create table if not exists public.assistant_email_audit (
  id bigserial primary key,
  sender_id uuid not null,
  to_email text not null,
  created_at timestamptz not null default now()
);
create index if not exists assistant_email_audit_sender_time on public.assistant_email_audit (sender_id, created_at desc);
alter table public.assistant_email_audit enable row level security;
comment on table public.assistant_email_audit is
  '[SHARED] Emails sent by Mate on a user''s behalf. Scope: platform. Used by: send-assistant-email (rate cap). Rule: service role only.';
