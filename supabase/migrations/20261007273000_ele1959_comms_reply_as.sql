-- ELE-1959 Team comms: comms_reply gains p_as so a manager who is also on the
-- roster replies as a worker from Worker Tools and as the office from the hub.
drop function if exists public.comms_reply(uuid, text, jsonb, uuid);

create or replace function public.comms_reply(
  p_comm uuid,
  p_body text,
  p_attachments jsonb default '[]'::jsonb,
  p_to_employee uuid default null,  -- office only: reply privately to one worker
  p_as text default null             -- 'worker' | 'office' | null = work it out
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

  -- Someone can be both (a manager who is also on the roster): the screen they
  -- reply from says which hat they are wearing.
  if p_as is not null and p_as not in ('worker', 'office') then
    raise exception 'Unknown sender' using errcode = '22023';
  end if;
  v_office := coalesce(p_as, 'office') = 'office'
              and exists (select 1 from public.my_employer_scope() s where s = v_c.sender_id);
  if p_as = 'office' and not v_office then
    raise exception 'Only the office can reply as the office' using errcode = '42501';
  end if;
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

revoke all on function public.comms_reply(uuid, text, jsonb, uuid, text) from public, anon;
grant execute on function public.comms_reply(uuid, text, jsonb, uuid, text) to authenticated;

-- Same for "seen": opening a thread in Worker Tools must not mark it seen by
-- the office, and vice versa.
drop function if exists public.comms_mark_seen(uuid);

create or replace function public.comms_mark_seen(p_comm uuid, p_as text default null)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then return; end if;
  if p_as is null or p_as = 'office' then
    update public.employer_communications
       set office_seen_at = now(), employer_read_at = coalesce(employer_read_at, now())
     where id = p_comm and sender_id in (select public.my_employer_scope());
  end if;
  if p_as is null or p_as = 'worker' then
    update public.employer_communication_recipients
       set last_seen_at = now(), read_at = coalesce(read_at, now())
     where communication_id = p_comm and employee_id in (select public.my_employee_ids());
  end if;
end;
$$;

revoke all on function public.comms_mark_seen(uuid, text) from public, anon;
grant execute on function public.comms_mark_seen(uuid, text) to authenticated;
