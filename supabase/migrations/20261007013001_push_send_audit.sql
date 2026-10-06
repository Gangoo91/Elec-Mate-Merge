-- Who sent a push to someone else, for send-push-notification's per-sender
-- cap. Until 7 Oct 2026 that function took any userId/title/body from anyone
-- holding the public key. App features legitimately push to OTHER users (team
-- chat, messages, college messages, vacancies), so it now requires a signed-in
-- sender and caps pushes to others at 60 an hour per sender.
create table if not exists public.push_send_audit (
  id bigserial primary key,
  sender_id uuid not null,
  recipient_id uuid not null,
  created_at timestamptz not null default now()
);
create index if not exists push_send_audit_sender_time on public.push_send_audit (sender_id, created_at desc);
alter table public.push_send_audit enable row level security;
-- No policies: only the edge function (service role) reads or writes it.
comment on table public.push_send_audit is
  '[SHARED] Audit of pushes a signed-in user sent to another user. Scope: platform. Used by: send-push-notification (rate cap). Rule: service role only; rows older than 7 days can be pruned.';
