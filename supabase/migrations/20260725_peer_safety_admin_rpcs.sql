-- Peer support duty-of-care (2026-07-25).
--
-- Before this, mental_health_peer_reports had reporter-only RLS: users could
-- file reports about a mental-health chat and NO admin could ever read them.
-- This adds:
--   1. Admin-gated SECURITY DEFINER RPCs to list reports, read the reported
--      conversation, and resolve a report (optionally deactivating the
--      supporter). RPC-first — no new edge functions.
--   2. A trigger that files every new report as an admin_messages row, so the
--      existing notify-message pipeline (push + bell + email to every admin)
--      and the admin inbox reply-loop cover reports with no extra plumbing.

-- ─── helper: admin gate ────────────────────────────────────────────────
create or replace function public._assert_is_admin()
returns void
language plpgsql
security definer
set search_path to 'public'
as $$
begin
  if not exists (
    select 1 from profiles
    where id = auth.uid() and admin_role is not null
  ) then
    raise exception 'admin only';
  end if;
end;
$$;

-- ─── 1a. list reports ──────────────────────────────────────────────────
create or replace function public.admin_list_peer_reports()
returns table (
  id uuid,
  created_at timestamptz,
  status text,
  reason text,
  additional_notes text,
  admin_notes text,
  reviewed_at timestamptz,
  reviewed_by_name text,
  conversation_id uuid,
  reporter_id uuid,
  reporter_name text,
  reported_user_id uuid,
  reported_name text,
  reported_is_supporter boolean,
  supporter_is_active boolean
)
language plpgsql
security definer
set search_path to 'public'
as $$
begin
  perform public._assert_is_admin();

  return query
  select
    r.id,
    r.created_at,
    coalesce(r.status, 'pending'),
    r.reason,
    r.additional_notes,
    r.admin_notes,
    r.reviewed_at,
    rev.full_name,
    r.conversation_id,
    r.reporter_id,
    rep.full_name,
    r.reported_user_id,
    tgt.full_name,
    (sup.id is not null),
    coalesce(sup.is_active, false)
  from mental_health_peer_reports r
  left join profiles rep on rep.id = r.reporter_id
  left join profiles tgt on tgt.id = r.reported_user_id
  left join profiles rev on rev.id = r.reviewed_by
  left join mental_health_peer_supporters sup on sup.user_id = r.reported_user_id
  order by (coalesce(r.status, 'pending') = 'pending') desc, r.created_at desc;
end;
$$;

-- ─── 1b. conversation context for a report ─────────────────────────────
-- Admins may read the reported conversation ONLY through a filed report —
-- moderation access, not general chat access.
create or replace function public.admin_get_peer_report_messages(p_report_id uuid)
returns table (
  id uuid,
  sender_id uuid,
  sender_is_reported boolean,
  content text,
  created_at timestamptz
)
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_conversation uuid;
  v_reported uuid;
begin
  perform public._assert_is_admin();

  select r.conversation_id, r.reported_user_id
    into v_conversation, v_reported
  from mental_health_peer_reports r
  where r.id = p_report_id;

  if v_conversation is null then
    return;
  end if;

  return query
  select m.id, m.sender_id, (m.sender_id = v_reported), m.content, m.created_at
  from mental_health_peer_messages m
  where m.conversation_id = v_conversation
  order by m.created_at asc
  limit 200;
end;
$$;

-- ─── 1c. resolve a report ──────────────────────────────────────────────
create or replace function public.admin_resolve_peer_report(
  p_report_id uuid,
  p_status text,
  p_admin_notes text default null,
  p_deactivate_supporter boolean default false
)
returns void
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_reported uuid;
begin
  perform public._assert_is_admin();

  if p_status not in ('pending', 'reviewed', 'dismissed', 'actioned') then
    raise exception 'invalid status %', p_status;
  end if;

  update mental_health_peer_reports
     set status = p_status,
         admin_notes = coalesce(p_admin_notes, admin_notes),
         reviewed_by = auth.uid(),
         reviewed_at = now()
   where id = p_report_id
   returning reported_user_id into v_reported;

  if v_reported is null then
    raise exception 'report not found';
  end if;

  if p_deactivate_supporter then
    update mental_health_peer_supporters
       set is_active = false,
           is_available = false
     where user_id = v_reported;
  end if;
end;
$$;

revoke all on function public.admin_list_peer_reports() from anon;
revoke all on function public.admin_get_peer_report_messages(uuid) from anon;
revoke all on function public.admin_resolve_peer_report(uuid, text, text, boolean) from anon;

-- ─── 2. report → admin inbox bridge ───────────────────────────────────
-- Filing a report inserts an admin_messages row from the reporter, which
-- fires trg_notify_admin_message → notify-message → push + bell + email to
-- every admin, and the thread lands in /admin/user-messages where an admin
-- can reply to the reporter directly.
create or replace function public.notify_peer_report()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_admin uuid;
begin
  select id into v_admin
  from profiles
  where admin_role is not null
  order by (admin_role = 'super_admin') desc, id asc
  limit 1;

  if v_admin is null then
    return NEW;
  end if;

  insert into admin_messages (sender_id, recipient_id, subject, message, message_type)
  values (
    NEW.reporter_id,
    v_admin,
    'Peer support report',
    'A peer support user has been reported.'
      || E'\n\nReason: ' || NEW.reason
      || case when NEW.additional_notes is not null and NEW.additional_notes <> ''
           then E'\nDetails: ' || NEW.additional_notes else '' end
      || E'\n\nReview it in Admin → Peer safety.',
    'in_app'
  );

  return NEW;
exception when others then
  -- Never block the report itself.
  return NEW;
end;
$$;

drop trigger if exists trg_notify_peer_report on public.mental_health_peer_reports;
create trigger trg_notify_peer_report
  after insert on public.mental_health_peer_reports
  for each row execute function public.notify_peer_report();
