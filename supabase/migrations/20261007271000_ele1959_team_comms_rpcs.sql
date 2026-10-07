-- ELE-1959 Team comms: send, reply, seen, acknowledge, chase, inboxes.
-- Every function: SECURITY DEFINER, search_path = public, scoped explicitly
-- (office = my_employer_scope(); worker = my_employee_ids(), active only),
-- revoked from public/anon.

-- Who the office person is, for the bubble name.
create or replace function public.comms_office_name(p_firm uuid)
returns text
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select nullif(btrim(a.full_name), '') from public.employer_admins a
      where a.employer_id = p_firm and a.user_id = auth.uid() and a.status = 'active'
      limit 1),
    (select nullif(btrim(p.full_name), '') from public.profiles p where p.id = auth.uid()),
    'Office'
  );
$$;

-- Attachments must be the caller's OWN uploads, in this firm's folder of the
-- private team-comms bucket. Returns the stored form {path,name,mime,size}
-- with mime/size taken from storage, not from the client.
create or replace function public.comms_clean_attachments(p_firm uuid, p_att jsonb)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_out jsonb := '[]'::jsonb;
  v_el jsonb;
  v_path text;
  v_meta jsonb;
  v_prefix text := p_firm::text || '/' || auth.uid()::text || '/';
begin
  if p_att is null or jsonb_typeof(p_att) <> 'array' or jsonb_array_length(p_att) = 0 then
    return '[]'::jsonb;
  end if;
  if jsonb_array_length(p_att) > 6 then
    raise exception 'Up to 6 attachments per message' using errcode = '22023';
  end if;
  for v_el in select value from jsonb_array_elements(p_att) loop
    v_path := v_el->>'path';
    if v_path is null or left(v_path, length(v_prefix)) <> v_prefix or v_path like '%..%' then
      raise exception 'You can only attach files you uploaded' using errcode = '42501';
    end if;
    select o.metadata into v_meta
      from storage.objects o
     where o.bucket_id = 'team-comms' and o.name = v_path and o.owner_id = auth.uid()::text;
    if not found then
      raise exception 'You can only attach files you uploaded' using errcode = '42501';
    end if;
    v_out := v_out || jsonb_build_array(jsonb_build_object(
      'path', v_path,
      'name', left(coalesce(nullif(btrim(v_el->>'name'), ''), regexp_replace(v_path, '^.*/', '')), 120),
      'mime', v_meta->>'mimetype',
      'size', nullif(v_meta->>'size', '')::bigint
    ));
  end loop;
  return v_out;
end;
$$;

-- Send ------------------------------------------------------------------------
create or replace function public.comms_send(
  p_title text,
  p_body text,
  p_type text default 'announcement',
  p_priority text default 'normal',
  p_audience text default 'all',          -- 'all' | 'job' | 'people'
  p_job_id uuid default null,
  p_employee_ids uuid[] default null,
  p_requires_ack boolean default false,
  p_pinned boolean default false,
  p_attachments jsonb default '[]'::jsonb
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_firm uuid;
  v_ids uuid[];
  v_id uuid;
  v_att jsonb;
  v_now timestamptz := now();
begin
  if v_uid is null then
    raise exception 'Sign in first' using errcode = '42501';
  end if;
  v_firm := public.my_default_employer_id();
  if v_firm is null or not exists (select 1 from public.my_employer_scope() s where s = v_firm) then
    raise exception 'Only the office can send team messages' using errcode = '42501';
  end if;
  if coalesce(btrim(p_title), '') = '' then
    raise exception 'Add a title' using errcode = '22023';
  end if;
  if coalesce(btrim(p_body), '') = '' then
    raise exception 'Write the message' using errcode = '22023';
  end if;
  if char_length(p_title) > 200 or char_length(p_body) > 8000 then
    raise exception 'That message is too long' using errcode = '22023';
  end if;
  if p_type not in ('announcement', 'message', 'alert') then
    raise exception 'Unknown message type' using errcode = '22023';
  end if;
  if p_priority not in ('low', 'normal', 'high', 'urgent') then
    raise exception 'Unknown priority' using errcode = '22023';
  end if;

  if p_audience = 'all' then
    select array_agg(e.id) into v_ids
      from public.employer_employees e
     where e.employer_id = v_firm and e.status ilike 'active';
  elsif p_audience = 'job' then
    if p_job_id is null or not exists (
      select 1 from public.employer_jobs j where j.id = p_job_id and j.user_id = v_firm
    ) then
      raise exception 'Pick one of your jobs' using errcode = '22023';
    end if;
    select array_agg(distinct a.employee_id) into v_ids
      from public.employer_job_assignments a
      join public.employer_employees e on e.id = a.employee_id
     where a.job_id = p_job_id and e.employer_id = v_firm and e.status ilike 'active';
  elsif p_audience = 'people' then
    select array_agg(e.id) into v_ids
      from public.employer_employees e
     where e.id = any (coalesce(p_employee_ids, '{}'))
       and e.employer_id = v_firm and e.status ilike 'active';
  else
    raise exception 'Unknown audience' using errcode = '22023';
  end if;

  if coalesce(array_length(v_ids, 1), 0) = 0 then
    raise exception 'Nobody to send to — pick at least one person on your team' using errcode = '22023';
  end if;

  v_att := public.comms_clean_attachments(v_firm, p_attachments);

  insert into public.employer_communications (
    sender_id, sent_by, sent_by_name, type, title, content, priority,
    target_audience, target_employee_ids, job_id, attachments, is_pinned,
    requires_acknowledgement, employer_read_at, employer_acknowledged_at,
    office_seen_at, activity_at
  ) values (
    v_firm, v_uid, public.comms_office_name(v_firm), p_type, btrim(p_title), p_body, p_priority,
    case p_audience when 'people' then 'specific' else p_audience end,
    case when p_audience = 'all' then null else v_ids end,
    case when p_audience = 'job' then p_job_id end,
    case when jsonb_array_length(v_att) > 0 then v_att end,
    coalesce(p_pinned, false),
    coalesce(p_requires_ack, false), v_now,
    case when coalesce(p_requires_ack, false) then v_now end,
    v_now, v_now
  ) returning id into v_id;

  -- One row per worker; trg_notify_communication rings each one once.
  insert into public.employer_communication_recipients (communication_id, employee_id)
  select v_id, x from unnest(v_ids) x;

  return v_id;
end;
$$;

-- Reply -------------------------------------------------------------------------
create or replace function public.comms_reply(
  p_comm uuid,
  p_body text,
  p_attachments jsonb default '[]'::jsonb,
  p_to_employee uuid default null   -- office only: reply privately to one worker
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_c public.employer_communications%rowtype;
  v_office boolean;
  v_emp_id uuid;
  v_emp_name text;
  v_id uuid;
  v_att jsonb;
  v_body text := btrim(coalesce(p_body, ''));
  v_name text;
  v_snip text;
  r record;
begin
  if auth.uid() is null then
    raise exception 'Sign in first' using errcode = '42501';
  end if;
  select * into v_c from public.employer_communications where id = p_comm;
  if not found then
    raise exception 'Message not found' using errcode = 'P0002';
  end if;

  v_office := exists (select 1 from public.my_employer_scope() s where s = v_c.sender_id);
  if not v_office then
    select e.id, e.name into v_emp_id, v_emp_name
      from public.employer_communication_recipients rc
      join public.employer_employees e on e.id = rc.employee_id
     where rc.communication_id = p_comm
       and e.id in (select public.my_employee_ids())
     limit 1;
    if v_emp_id is null then
      raise exception 'You are not on this message' using errcode = '42501';
    end if;
  end if;

  if char_length(v_body) > 4000 then
    raise exception 'That reply is too long' using errcode = '22023';
  end if;
  v_att := public.comms_clean_attachments(v_c.sender_id, p_attachments);
  if v_body = '' and jsonb_array_length(v_att) = 0 then
    raise exception 'Write a reply' using errcode = '22023';
  end if;
  v_snip := case when v_body = '' then 'Sent an attachment'
                 else left(regexp_replace(v_body, '\s+', ' ', 'g'), 140) end;

  if v_office then
    if p_to_employee is not null and not exists (
      select 1 from public.employer_communication_recipients rc
       where rc.communication_id = p_comm and rc.employee_id = p_to_employee
    ) then
      raise exception 'That person is not on this message' using errcode = '22023';
    end if;
    v_name := public.comms_office_name(v_c.sender_id);

    insert into public.employer_communication_replies (
      communication_id, employer_id, thread_employee_id, author_user_id,
      author_kind, author_name, body, attachments
    ) values (
      p_comm, v_c.sender_id, p_to_employee, auth.uid(), 'office', v_name, v_body, v_att
    ) returning id into v_id;

    update public.employer_communications
       set last_reply_at = now(), activity_at = now(), office_seen_at = now()
     where id = p_comm;

    for r in
      select rc.employee_id, rc.last_seen_at, e.user_id
        from public.employer_communication_recipients rc
        join public.employer_employees e on e.id = rc.employee_id
       where rc.communication_id = p_comm
         and e.status ilike 'active'
         and (p_to_employee is null or rc.employee_id = p_to_employee)
    loop
      update public.employer_communication_recipients
         set last_activity_at = now()
       where communication_id = p_comm and employee_id = r.employee_id;

      -- Batch: one ping per burst. Skip when an earlier office reply this
      -- worker can see is still unseen and less than 10 minutes old.
      if r.user_id is not null and not exists (
        select 1 from public.employer_communication_replies x
         where x.communication_id = p_comm and x.id <> v_id and x.author_kind = 'office'
           and (x.thread_employee_id is null or x.thread_employee_id = r.employee_id)
           and x.created_at > greatest(coalesce(r.last_seen_at, '-infinity'::timestamptz),
                                       now() - interval '10 minutes')
      ) then
        perform public.worker_notify(
          r.user_id, 'communication_reply',
          'Reply: ' || v_c.title,
          v_name || ': ' || v_snip,
          jsonb_build_object('communication_id', p_comm, 'reply_id', v_id,
                             'employee_id', r.employee_id,
                             'route', '/electrician/worker-tools/comms?thread=' || p_comm)
        );
      end if;
    end loop;
  else
    insert into public.employer_communication_replies (
      communication_id, employer_id, thread_employee_id, author_user_id,
      author_employee_id, author_kind, author_name, body, attachments
    ) values (
      p_comm, v_c.sender_id, v_emp_id, auth.uid(), v_emp_id, 'worker', v_emp_name, v_body, v_att
    ) returning id into v_id;

    update public.employer_communications
       set last_reply_at = now(), activity_at = now()
     where id = p_comm;

    update public.employer_communication_recipients
       set last_seen_at = now(), read_at = coalesce(read_at, now())
     where communication_id = p_comm and employee_id = v_emp_id;

    -- Batch: one office ping per worker per burst (10 minutes, until the office opens it).
    if not exists (
      select 1 from public.employer_communication_replies x
       where x.communication_id = p_comm and x.id <> v_id
         and x.author_kind = 'worker' and x.author_employee_id = v_emp_id
         and x.created_at > greatest(coalesce(v_c.office_seen_at, '-infinity'::timestamptz),
                                     now() - interval '10 minutes')
    ) then
      perform public.notify_employer_bell(
        v_c.sender_id, 'comms_reply',
        coalesce(v_emp_name, 'A team member') || ' replied',
        '"' || v_c.title || '": ' || v_snip,
        jsonb_build_object('communication_id', p_comm, 'employee_id', v_emp_id,
                           'ref_id', v_id::text,
                           'route', '/employer?section=comms&thread=' || p_comm)
      );
    end if;
  end if;

  return v_id;
end;
$$;

-- Seen (opening a thread) ------------------------------------------------------
create or replace function public.comms_mark_seen(p_comm uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then return; end if;
  update public.employer_communications
     set office_seen_at = now(), employer_read_at = coalesce(employer_read_at, now())
   where id = p_comm and sender_id in (select public.my_employer_scope());
  update public.employer_communication_recipients
     set last_seen_at = now(), read_at = coalesce(read_at, now())
   where communication_id = p_comm and employee_id in (select public.my_employee_ids());
end;
$$;

-- Acknowledge (only when the message asks for it) ------------------------------
create or replace function public.comms_acknowledge(p_comm uuid)
returns timestamptz
language plpgsql
security definer
set search_path = public
as $$
declare
  v_req boolean;
  v_at timestamptz;
begin
  select c.requires_acknowledgement into v_req
    from public.employer_communications c where c.id = p_comm;
  if not found then
    raise exception 'Message not found' using errcode = 'P0002';
  end if;
  if not v_req then
    raise exception 'This message does not need acknowledging' using errcode = '22023';
  end if;
  update public.employer_communication_recipients
     set acknowledged_at = coalesce(acknowledged_at, now()),
         read_at = coalesce(read_at, now()),
         last_seen_at = now()
   where communication_id = p_comm and employee_id in (select public.my_employee_ids())
  returning acknowledged_at into v_at;
  if v_at is null then
    raise exception 'You are not on this message' using errcode = '42501';
  end if;
  return v_at;
end;
$$;

-- Chase the people who have not acknowledged (or read) — once an hour ----------
create or replace function public.comms_chase(p_comm uuid)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_c public.employer_communications%rowtype;
  v_n integer := 0;
  r record;
begin
  select * into v_c from public.employer_communications where id = p_comm for update;
  if not found or not exists (select 1 from public.my_employer_scope() s where s = v_c.sender_id) then
    raise exception 'Only the office can chase this message' using errcode = '42501';
  end if;
  if v_c.last_chased_at is not null and v_c.last_chased_at > now() - interval '1 hour' then
    raise exception 'Already chased at %. You can chase again from %.',
      to_char(v_c.last_chased_at at time zone 'Europe/London', 'HH24:MI'),
      to_char((v_c.last_chased_at + interval '1 hour') at time zone 'Europe/London', 'HH24:MI')
      using errcode = 'P0001', hint = 'chase_too_soon';
  end if;

  for r in
    select e.user_id, e.id as employee_id
      from public.employer_communication_recipients rc
      join public.employer_employees e on e.id = rc.employee_id
     where rc.communication_id = p_comm
       and e.status ilike 'active' and e.user_id is not null
       and (case when v_c.requires_acknowledgement then rc.acknowledged_at is null
                 else rc.read_at is null end)
  loop
    perform public.worker_notify(
      r.user_id, 'communication_chase',
      case when v_c.requires_acknowledgement then 'Please acknowledge: ' else 'Please read: ' end || v_c.title,
      case when v_c.requires_acknowledgement
           then 'The office needs you to read and acknowledge this message.'
           else 'The office is waiting for you to read this message.' end,
      jsonb_build_object('communication_id', p_comm, 'employee_id', r.employee_id,
                         'route', '/electrician/worker-tools/comms?thread=' || p_comm)
    );
    v_n := v_n + 1;
  end loop;

  if v_n > 0 then
    update public.employer_communications
       set last_chased_at = now(), chase_count = chase_count + 1, activity_at = now()
     where id = p_comm;
  end if;
  return v_n;
end;
$$;

-- Office inbox -------------------------------------------------------------------
create or replace function public.comms_office_inbox()
returns table (
  id uuid, type text, title text, content text, priority text, is_pinned boolean,
  requires_acknowledgement boolean, attachments jsonb, created_at timestamptz,
  sent_by_name text, target_audience text, job_id uuid, job_title text,
  recipients_total integer, read_count integer, ack_count integer,
  reply_count integer, unread_replies integer,
  last_reply_body text, last_reply_author text, last_reply_kind text, last_reply_at timestamptz,
  office_seen_at timestamptz, employer_read_at timestamptz,
  last_chased_at timestamptz, chase_count integer
)
language sql
stable
security definer
set search_path = public
as $$
  select c.id, c.type, c.title, c.content, c.priority, c.is_pinned,
         c.requires_acknowledgement, c.attachments, c.created_at,
         c.sent_by_name, c.target_audience, c.job_id, j.title,
         coalesce(rs.total, 0), coalesce(rs.read, 0), coalesce(rs.ack, 0),
         coalesce(rp.total, 0), coalesce(rp.unread, 0),
         lr.body, lr.author_name, lr.author_kind, c.last_reply_at,
         c.office_seen_at, c.employer_read_at, c.last_chased_at, c.chase_count
    from public.employer_communications c
    left join public.employer_jobs j on j.id = c.job_id
    left join lateral (
      select count(*)::int as total,
             count(*) filter (where r.read_at is not null)::int as read,
             count(*) filter (where r.acknowledged_at is not null)::int as ack
        from public.employer_communication_recipients r
       where r.communication_id = c.id
    ) rs on true
    left join lateral (
      select count(*)::int as total,
             count(*) filter (where x.author_kind = 'worker'
                and x.created_at > coalesce(c.office_seen_at, '-infinity'::timestamptz))::int as unread
        from public.employer_communication_replies x
       where x.communication_id = c.id
    ) rp on true
    left join lateral (
      select x.body, x.author_name, x.author_kind
        from public.employer_communication_replies x
       where x.communication_id = c.id
       order by x.created_at desc limit 1
    ) lr on true
   where c.sender_id in (select public.my_employer_scope())
   order by coalesce(c.last_reply_at, c.created_at) desc
   limit 300;
$$;

-- Worker inbox -------------------------------------------------------------------
create or replace function public.comms_my_inbox()
returns table (
  id uuid, employee_id uuid, type text, title text, content text, priority text,
  is_pinned boolean, requires_acknowledgement boolean, attachments jsonb,
  created_at timestamptz, sent_by_name text, job_title text,
  read_at timestamptz, acknowledged_at timestamptz, last_seen_at timestamptz,
  reply_count integer, unread_replies integer,
  last_reply_body text, last_reply_kind text, last_reply_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  select c.id, r.employee_id, c.type, c.title, c.content, c.priority,
         c.is_pinned, c.requires_acknowledgement, c.attachments,
         c.created_at, c.sent_by_name, j.title,
         r.read_at, r.acknowledged_at, r.last_seen_at,
         coalesce(rp.total, 0), coalesce(rp.unread, 0),
         lr.body, lr.author_kind, lr.created_at
    from public.employer_communication_recipients r
    join public.employer_communications c on c.id = r.communication_id
    left join public.employer_jobs j on j.id = c.job_id
    left join lateral (
      select count(*)::int as total,
             count(*) filter (where x.author_kind = 'office'
                and x.created_at > coalesce(r.last_seen_at, '-infinity'::timestamptz))::int as unread
        from public.employer_communication_replies x
       where x.communication_id = c.id
         and (x.thread_employee_id is null or x.thread_employee_id = r.employee_id)
    ) rp on true
    left join lateral (
      select x.body, x.author_kind, x.created_at
        from public.employer_communication_replies x
       where x.communication_id = c.id
         and (x.thread_employee_id is null or x.thread_employee_id = r.employee_id)
       order by x.created_at desc limit 1
    ) lr on true
   where r.employee_id in (select public.my_employee_ids())
     and (c.expires_at is null or c.expires_at > now())
   order by greatest(c.created_at, coalesce(lr.created_at, c.created_at)) desc
   limit 300;
$$;

-- Jobs the office can message (jobs with at least one active worker on them) ----
create or replace function public.comms_job_options()
returns table (job_id uuid, title text, status text, crew integer)
language sql
stable
security definer
set search_path = public
as $$
  select j.id, j.title, j.status, count(distinct e.id)::int
    from public.employer_jobs j
    join public.employer_job_assignments a on a.job_id = j.id
    join public.employer_employees e on e.id = a.employee_id
                                    and e.employer_id = j.user_id
                                    and e.status ilike 'active'
   where j.user_id = public.my_default_employer_id()
     and j.user_id in (select public.my_employer_scope())
     and coalesce(j.status, '') <> 'Cancelled'
   group by j.id, j.title, j.status, j.created_at
   order by j.created_at desc
   limit 100;
$$;

-- New-message ping: active roster only, deep link to the thread, says when an
-- acknowledgement is needed. (Replaces the generic "New announcement from your employer".)
create or replace function public.trg_notify_communication()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_worker uuid;
  v_c record;
begin
  select e.user_id into v_worker
    from public.employer_employees e
   where e.id = new.employee_id and e.status ilike 'active';
  if v_worker is null then return new; end if;
  select title, type, content, requires_acknowledgement, sent_by_name
    into v_c from public.employer_communications where id = new.communication_id;
  perform public.worker_notify(
    v_worker, 'communication',
    coalesce(nullif(v_c.title, ''), 'New message'),
    case when v_c.requires_acknowledgement then 'Please read and acknowledge. ' else '' end
      || coalesce(left(regexp_replace(v_c.content, '\s+', ' ', 'g'), 140), 'New message from the office'),
    jsonb_build_object('communication_id', new.communication_id, 'employee_id', new.employee_id,
                       'route', '/electrician/worker-tools/comms?thread=' || new.communication_id)
  );
  return new;
exception when others then
  raise warning '[trg_notify_communication] %', sqlerrm;
  return new;
end;
$$;

-- Office reply push goes through notify_user (category messages).
insert into public.notification_types (type, category, push, importance)
values ('comms_reply', 'messages', true, 1)
on conflict (type) do nothing;

-- Grants -------------------------------------------------------------------------
do $$
declare f text;
begin
  foreach f in array array[
    'public.comms_office_name(uuid)',
    'public.comms_clean_attachments(uuid, jsonb)',
    'public.comms_send(text, text, text, text, text, uuid, uuid[], boolean, boolean, jsonb)',
    'public.comms_reply(uuid, text, jsonb, uuid)',
    'public.comms_mark_seen(uuid)',
    'public.comms_acknowledge(uuid)',
    'public.comms_chase(uuid)',
    'public.comms_office_inbox()',
    'public.comms_my_inbox()',
    'public.comms_job_options()',
    'public.trg_notify_communication()'
  ] loop
    execute format('revoke all on function %s from public, anon', f);
  end loop;
  foreach f in array array[
    'public.comms_send(text, text, text, text, text, uuid, uuid[], boolean, boolean, jsonb)',
    'public.comms_reply(uuid, text, jsonb, uuid)',
    'public.comms_mark_seen(uuid)',
    'public.comms_acknowledge(uuid)',
    'public.comms_chase(uuid)',
    'public.comms_office_inbox()',
    'public.comms_my_inbox()',
    'public.comms_job_options()'
  ] loop
    execute format('grant execute on function %s to authenticated', f);
  end loop;
end $$;
