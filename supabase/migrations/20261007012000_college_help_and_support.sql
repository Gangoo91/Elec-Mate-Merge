-- ELE-1980 — in-app help for college staff.
--
-- 1. help_open_events: every time a "?" help sheet is opened, one row. Read
--    by Elec-Mate admins to find the screens people find confusing.
-- 2. send_college_support_message: a member of college staff messages
--    Elec-Mate support from the help page or any screen; the message lands in
--    Admin → Messages (admin_messages, the notify-message trigger emails the
--    founder) with the college and the screen in the subject.

create table if not exists public.help_open_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  help_id text not null check (length(help_id) between 1 and 120),
  path text check (path is null or length(path) <= 300),
  created_at timestamptz not null default now()
);
create index if not exists help_open_events_help_idx on public.help_open_events (help_id, created_at desc);

comment on table public.help_open_events is
  '[SHARED] One row each time a page help sheet ("?") is opened. Scope: every signed-in user, own rows only. Used by: PageHelp (all hubs), Elec-Mate admin to find confusing screens. Rule: insert-only by the user; admins read.';

alter table public.help_open_events enable row level security;

drop policy if exists "Users log their own help opens" on public.help_open_events;
create policy "Users log their own help opens" on public.help_open_events
  for insert to authenticated with check (user_id = auth.uid());

drop policy if exists "Admins read help opens" on public.help_open_events;
create policy "Admins read help opens" on public.help_open_events
  for select to authenticated
  using (exists (select 1 from profiles p where p.id = auth.uid() and p.admin_role is not null));

revoke all on public.help_open_events from anon;
grant insert (help_id, path) on public.help_open_events to authenticated;
grant select on public.help_open_events to authenticated;

create or replace function public.send_college_support_message(p_message text, p_screen text default null)
returns uuid
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_uid uuid := auth.uid();
  v_college text;
  v_name text;
  v_founder uuid;
  v_id uuid;
begin
  if v_uid is null then
    raise exception 'sign in first' using errcode = '42501';
  end if;
  if p_message is null or length(btrim(p_message)) < 3 then
    raise exception 'write a message first' using errcode = '22023';
  end if;
  if length(p_message) > 5000 then
    raise exception 'message too long' using errcode = '22023';
  end if;

  select c.name into v_college
    from college_staff st join colleges c on c.id = st.college_id
   where st.user_id = v_uid and st.archived_at is null
   order by st.created_at desc limit 1;
  if v_college is null then
    raise exception 'college staff only' using errcode = '42501';
  end if;

  select coalesce(full_name, 'College staff') into v_name from profiles where id = v_uid;

  -- Support lands with the founder account (founder@elec-mate.com).
  select u.id into v_founder from auth.users u
    join profiles p on p.id = u.id
   where lower(u.email) = 'founder@elec-mate.com' and p.admin_role is not null
   limit 1;
  if v_founder is null then
    select p.id into v_founder from profiles p where p.admin_role = 'super_admin' order by p.created_at limit 1;
  end if;

  insert into admin_messages (sender_id, recipient_id, subject, message, message_type)
  values (
    v_uid,
    v_founder,
    left('College support · ' || v_college || coalesce(' · ' || nullif(btrim(p_screen), ''), ''), 200),
    btrim(p_message),
    'in_app'
  )
  returning id into v_id;
  return v_id;
end;
$$;

revoke all on function public.send_college_support_message(text, text) from public, anon;
grant execute on function public.send_college_support_message(text, text) to authenticated;
