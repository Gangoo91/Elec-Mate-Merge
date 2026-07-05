-- The general-user (electrician) in-app notification store. The hook
-- useUserNotifications and public-booking already target this shape
-- (metadata/is_read/link); ~9 backend writers wrote to a non-existent
-- public.notifications and are being repointed here. Writers use the service
-- role (bypass RLS); users may only read/update/delete their own.
create table if not exists public.user_notifications (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null,
  type       text not null,
  title      text not null,
  message    text not null,
  link       text,
  metadata   jsonb not null default '{}'::jsonb,
  is_read    boolean not null default false,
  created_at timestamptz not null default now(),
  read_at    timestamptz
);

create index if not exists user_notifications_user_created_idx
  on public.user_notifications (user_id, created_at desc);
create index if not exists user_notifications_unread_idx
  on public.user_notifications (user_id) where is_read = false;

alter table public.user_notifications enable row level security;

create policy "Users read own notifications"
  on public.user_notifications for select to authenticated
  using (auth.uid() = user_id);

create policy "Users update own notifications"
  on public.user_notifications for update to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users delete own notifications"
  on public.user_notifications for delete to authenticated
  using (auth.uid() = user_id);

-- Realtime for the bell's live INSERT subscription.
alter publication supabase_realtime add table public.user_notifications;
