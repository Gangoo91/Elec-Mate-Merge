-- ELE-1959 Team comms: two-way threads, ack from the column, attachments,
-- chase, job-crew audience. Schema + RLS.
--
-- Rules:
--   * Office = my_employer_scope() (owner, admins, office managers). A message
--     belongs to the firm: sender_id = the firm (owner profiles.id), sent_by =
--     the person who pressed Send.
--   * Workers see a message only through their own ACTIVE roster row
--     (my_employee_ids()). A worker who has left sees nothing.
--   * Replies are written only through the RPCs in 20261007271000.

-- 0. Helpers (SECURITY DEFINER so policies on messages, recipients and
-- replies can refer to each other without recursing through each other's RLS).
create or replace function public.comms_i_receive(p_comm uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.employer_communication_recipients r
     where r.communication_id = p_comm
       and r.employee_id in (select public.my_employee_ids())
  );
$$;

create or replace function public.comms_i_run(p_comm uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.employer_communications c
     where c.id = p_comm
       and c.sender_id in (select public.my_employer_scope())
  );
$$;

revoke all on function public.comms_i_receive(uuid) from public, anon;
revoke all on function public.comms_i_run(uuid) from public, anon;
grant execute on function public.comms_i_receive(uuid) to authenticated;
grant execute on function public.comms_i_run(uuid) to authenticated;

-- 1. Message columns -------------------------------------------------------
alter table public.employer_communications
  add column if not exists sent_by uuid,
  add column if not exists sent_by_name text,
  add column if not exists job_id uuid references public.employer_jobs(id) on delete set null,
  add column if not exists last_reply_at timestamptz,
  add column if not exists office_seen_at timestamptz,
  add column if not exists activity_at timestamptz not null default now(),
  add column if not exists last_chased_at timestamptz,
  add column if not exists chase_count integer not null default 0;

alter table public.employer_communications
  drop constraint if exists employer_communications_target_audience_check;
alter table public.employer_communications
  add constraint employer_communications_target_audience_check
  check (target_audience = any (array['all','managers','specific','job']));

create index if not exists employer_communications_sender_idx
  on public.employer_communications (sender_id, created_at desc);

-- 2. Recipient columns ------------------------------------------------------
alter table public.employer_communication_recipients
  add column if not exists last_seen_at timestamptz,
  add column if not exists last_activity_at timestamptz;

create index if not exists employer_communication_recipients_employee_idx
  on public.employer_communication_recipients (employee_id);

-- 3. Replies -----------------------------------------------------------------
create table if not exists public.employer_communication_replies (
  id uuid primary key default gen_random_uuid(),
  communication_id uuid not null references public.employer_communications(id) on delete cascade,
  employer_id uuid not null,
  -- The worker whose private conversation this belongs to. NULL = an office
  -- reply to everyone on the message.
  thread_employee_id uuid references public.employer_employees(id) on delete cascade,
  author_user_id uuid not null,
  author_employee_id uuid references public.employer_employees(id) on delete set null,
  author_kind text not null check (author_kind in ('office','worker')),
  author_name text,
  body text not null default '' check (char_length(body) <= 4000),
  attachments jsonb not null default '[]'::jsonb check (jsonb_typeof(attachments) = 'array'),
  created_at timestamptz not null default now(),
  constraint employer_communication_replies_not_empty
    check (char_length(btrim(body)) > 0 or jsonb_array_length(attachments) > 0),
  constraint employer_communication_replies_worker_thread
    check (author_kind = 'office' or (thread_employee_id is not null and thread_employee_id = author_employee_id))
);

create index if not exists employer_communication_replies_comm_idx
  on public.employer_communication_replies (communication_id, created_at);
create index if not exists employer_communication_replies_thread_idx
  on public.employer_communication_replies (thread_employee_id) where thread_employee_id is not null;

comment on table public.employer_communication_replies is
  '[EMPLOYER HUB → WORKER TOOLS] Replies in a Team comms thread (ELE-1959). Scope: employer_id = the firm; thread_employee_id = the worker whose private conversation it is (NULL = office reply to everyone on the message). Rule: written only by RPC comms_reply; office sees all, a worker sees replies to everyone plus their own conversation, active roster only. Used by: Employer Hub Comms, Worker Tools Comms.';

comment on table public.employer_communications is
  '[EMPLOYER HUB → WORKER TOOLS] Team comms messages from the firm to its team (announcements, safety alerts, job messages) — each is a thread (ELE-1959). Scope: sender_id = the firm (owner profiles.id), sent_by = the person; managers via my_employer_scope(). requires_acknowledgement drives sign-off; chase via comms_chase (rate-limited). Used by: Employer Hub Comms, Worker Tools Comms.';

comment on table public.employer_communication_recipients is
  '[EMPLOYER HUB → WORKER TOOLS] Who a Team comms message went to, with read / acknowledged / last seen per worker. Scope: communication_id → employer_communications; employee_id → roster (same firm, active at send). Used by: Employer Hub Comms receipts, Worker Tools Comms.';

alter table public.employer_communication_replies enable row level security;

revoke all on public.employer_communication_replies from anon, public;
grant select on public.employer_communication_replies to authenticated;

drop policy if exists "Office and thread members read replies" on public.employer_communication_replies;
create policy "Office and thread members read replies"
  on public.employer_communication_replies for select to authenticated
  using (
    employer_id in (select public.my_employer_scope())
    or thread_employee_id in (select public.my_employee_ids())
    or (thread_employee_id is null and public.comms_i_receive(communication_id))
  );

-- 4. Message policies --------------------------------------------------------
revoke all on public.employer_communications from anon;
revoke all on public.employer_communication_recipients from anon;

-- Worker read: only through their own active recipient row. Replaces the old
-- 'all' clause, which matched any roster row (left workers too) and every
-- worker of the firm whether or not the message was sent to them.
drop policy if exists "Users can view relevant communications" on public.employer_communications;
create policy "Users can view relevant communications"
  on public.employer_communications for select to authenticated
  using (
    sender_id in (select public.my_employer_scope())
    or public.comms_i_receive(id)
  );

-- Managers could not pin / mark read: the check demanded sender_id = auth.uid().
drop policy if exists "Users can update their own communications" on public.employer_communications;
create policy "Users can update their own communications"
  on public.employer_communications for update to authenticated
  using (sender_id in (select public.my_employer_scope()))
  with check (sender_id in (select public.my_employer_scope()));

-- Recipients: the office may only add ACTIVE workers of a firm it runs (the
-- old check let a firm fan a message — and a push — out to another firm's worker).
drop policy if exists "Users can create recipients for their communications" on public.employer_communication_recipients;
create policy "Users can create recipients for their communications"
  on public.employer_communication_recipients for insert to authenticated
  with check (
    public.comms_i_run(communication_id)
    and exists (
      select 1 from public.employer_employees e
       where e.id = employer_communication_recipients.employee_id
         and e.employer_id in (select public.my_employer_scope())
         and e.status ilike 'active'
    )
  );

drop policy if exists "Users can update recipients for their communications" on public.employer_communication_recipients;
create policy "Users can update recipients for their communications"
  on public.employer_communication_recipients for update to authenticated
  using (public.comms_i_run(communication_id))
  with check (public.comms_i_run(communication_id));

drop policy if exists "Users can view relevant recipient records" on public.employer_communication_recipients;
create policy "Users can view relevant recipient records"
  on public.employer_communication_recipients for select to authenticated
  using (
    employee_id in (select public.my_employee_ids())
    or public.comms_i_run(communication_id)
  );

drop policy if exists "Users can delete recipients for their communications" on public.employer_communication_recipients;
create policy "Users can delete recipients for their communications"
  on public.employer_communication_recipients for delete to authenticated
  using (public.comms_i_run(communication_id));

-- A recipient row can never be re-pointed at another message or worker (the
-- worker UPDATE policy would otherwise let a worker swap communication_id and
-- read any message whose id they knew).
create or replace function public.trg_comm_recipient_guard()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if new.communication_id is distinct from old.communication_id
     or new.employee_id is distinct from old.employee_id then
    raise exception 'A recipient row cannot be moved to another message or person'
      using errcode = '42501';
  end if;
  new.created_at := old.created_at;
  return new;
end;
$$;

revoke all on function public.trg_comm_recipient_guard() from public, anon;

drop trigger if exists comm_recipient_guard on public.employer_communication_recipients;
create trigger comm_recipient_guard
  before update on public.employer_communication_recipients
  for each row execute function public.trg_comm_recipient_guard();

-- Read / acknowledge pings the message row so the office list (realtime,
-- filtered to sender_id = the firm) refreshes its "6 of 8" counts.
create or replace function public.trg_comm_recipient_activity()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.read_at is distinct from old.read_at
     or new.acknowledged_at is distinct from old.acknowledged_at then
    update public.employer_communications set activity_at = now()
     where id = new.communication_id;
  end if;
  return new;
exception when others then
  raise warning '[trg_comm_recipient_activity] %', sqlerrm;
  return new;
end;
$$;
revoke all on function public.trg_comm_recipient_activity() from public, anon;

drop trigger if exists comm_recipient_activity on public.employer_communication_recipients;
create trigger comm_recipient_activity
  after update of read_at, acknowledged_at on public.employer_communication_recipients
  for each row execute function public.trg_comm_recipient_activity();

-- 5. Realtime ------------------------------------------------------------------
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
     where pubname = 'supabase_realtime' and schemaname = 'public'
       and tablename = 'employer_communication_replies'
  ) then
    alter publication supabase_realtime add table public.employer_communication_replies;
  end if;
end $$;
