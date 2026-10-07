-- ELE-1955: apprentices, office side.
-- 1. No double notify: the firm bell (trg_notify_employer_otj_submission) already
--    reaches the owner and every active manager; the supervisor alert
--    (notify_otj_supervisors) now skips those people.
-- 2. Apprentices a college has recorded with THIS firm as employer but who have
--    no roster row here: listed for the firm (get_employer_unrostered_apprentices),
--    with an add-to-team path (a roster row with their email, user_id empty —
--    they link it themselves by accepting the invite; we never link it for them)
--    and a review nudge that works without a roster row (nudge_apprentice_review).
-- 3. A weekly Monday reminder when apprentice hours have waited 3+ days.

-- 1 ── patch notify_otj_supervisors in place ──────────────────────────────
do $do$
declare
  v_def text := pg_get_functiondef('public.notify_otj_supervisors()'::regprocedure);
  v_anchor text := $o$      continue when v_recipient = any(v_sent);$o$;
  v_new text := $o$      -- ELE-1955: owner and managers already got the firm bell.
      continue when v_recipient = ap.employer_id
        or exists (select 1 from public.employer_admins a
                    where a.employer_id = ap.employer_id
                      and a.user_id = v_recipient
                      and a.status = 'active');
$o$;
begin
  if position('ELE-1955' in v_def) > 0 then
    return;
  end if;
  if position(v_anchor in v_def) = 0 then
    raise exception 'notify_otj_supervisors: anchor not found — re-read the live definition';
  end if;
  execute replace(v_def, v_anchor, v_new || v_anchor);
end
$do$;

-- 2 ── apprentices who name this firm but aren't on its roster ────────────
create or replace function public.get_employer_unrostered_apprentices()
returns table(
  student_id uuid, firm_id uuid, name text, email text, college_name text, course_name text,
  has_account boolean, review_due date, review_overdue boolean,
  invited_roster_id uuid, last_nudged_at timestamptz)
language sql
stable
security definer
set search_path = public
as $fn$
  with firms as (
    select f as firm from public.my_employer_scope() f
  ), firm_emails as (
    select fm.firm, lower(trim(u.email)) as em
      from firms fm join auth.users u on u.id = fm.firm
    union
    select fm.firm, lower(trim(cp.company_email))
      from firms fm join public.company_profiles cp on cp.user_id = fm.firm
     where nullif(trim(cp.company_email), '') is not null
    union
    select fm.firm, lower(trim(cp.notification_email))
      from firms fm join public.company_profiles cp on cp.user_id = fm.firm
     where nullif(trim(cp.notification_email), '') is not null
    union
    select a.employer_id, lower(trim(u.email))
      from public.employer_admins a join auth.users u on u.id = a.user_id
     where a.employer_id in (select firm from firms) and a.status = 'active'
  )
  select distinct on (cs.id)
         cs.id, fe.firm, cs.name, cs.email, col.name, cc.name,
         cs.user_id is not null,
         public.tripartite_due_by(cs.id),
         public.tripartite_due_by(cs.id) < current_date,
         (select r.id from public.employer_employees r
           where r.employer_id = fe.firm and r.user_id is null
             and lower(coalesce(r.status, '')) <> 'archived'
             and nullif(trim(cs.email), '') is not null
             and lower(trim(r.email)) = lower(trim(cs.email))
           order by r.created_at desc limit 1),
         (select max(s.sent_at) from public.employer_expiry_sent s
           where s.firm = fe.firm and s.ref like 'log:review_nudge:' || cs.id || ':%')
    from public.college_students cs
    join public.college_employers ce on ce.id = cs.employer_id
    join firm_emails fe on fe.em = lower(trim(ce.contact_email))
    left join public.colleges col on col.id = cs.college_id
    left join public.college_courses cc on cc.id = cs.course_id
   where nullif(trim(ce.contact_email), '') is not null
     and coalesce(lower(cs.status), '') not in ('withdrawn', 'archived', 'completed', 'left')
     and not exists (
       select 1 from public.employer_employees r
        where r.employer_id = fe.firm
          and cs.user_id is not null
          and r.user_id = cs.user_id
          and lower(coalesce(r.status, '')) = 'active')
   order by cs.id, fe.firm;
$fn$;
revoke all on function public.get_employer_unrostered_apprentices() from public, anon;
grant execute on function public.get_employer_unrostered_apprentices() to authenticated;

insert into public.notification_types (type, category, push, importance)
values ('apprentice_review_nudge', 'tasks_projects', true, 1)
on conflict (type) do nothing;

-- The review nudge for an apprentice with no roster row. Rostered apprentices
-- keep the comms message. Once every 3 days per apprentice per firm.
create or replace function public.nudge_apprentice_review(p_student uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $fn$
declare
  v record;
  v_company text;
  v_ref text;
begin
  if auth.uid() is null then
    raise exception 'not_signed_in' using errcode = '42501';
  end if;
  select x.*, cs.user_id into v
    from public.get_employer_unrostered_apprentices() x
    join public.college_students cs on cs.id = x.student_id
   where x.student_id = p_student
   limit 1;
  if v.student_id is null then
    raise exception 'not_allowed' using errcode = '42501';
  end if;
  if v.user_id is null then
    return jsonb_build_object('sent', false, 'reason', 'no_account');
  end if;
  if v.last_nudged_at is not null and v.last_nudged_at > now() - interval '3 days' then
    return jsonb_build_object('sent', false, 'reason', 'recent', 'last_nudged_at', v.last_nudged_at);
  end if;

  select coalesce(nullif(trim(cp.company_name), ''), nullif(trim(p.full_name), ''), 'Your employer')
    into v_company
    from public.profiles p left join public.company_profiles cp on cp.user_id = p.id
   where p.id = v.firm_id;

  v_ref := 'log:review_nudge:' || p_student || ':' || to_char(now(), 'YYYY-MM-DD"T"HH24MI');
  insert into public.employer_expiry_sent (firm, ref) values (v.firm_id, v_ref)
  on conflict do nothing;

  perform public.notify_user(
    v.user_id,
    'apprentice_review_nudge',
    v_company || ' asked about your progress review',
    case when v.review_due is not null
         then 'Your review is due by ' || to_char(v.review_due, 'FMDD Mon YYYY')
         else 'Your progress review is due' end
      || '. Reply to your tutor with the days that suit you and ' || v_company || '.',
    jsonb_build_object('route', '/apprentice/college-plan', 'student_id', p_student));

  return jsonb_build_object('sent', true);
end;
$fn$;
revoke all on function public.nudge_apprentice_review(uuid) from public, anon;
grant execute on function public.nudge_apprentice_review(uuid) to authenticated;

-- 3 ── weekly reminder when hours sit unconfirmed ─────────────────────────
create or replace function public.notify_employer_waiting_otj()
returns void
language plpgsql
security definer
set search_path = public
as $fn$
declare
  r record;
  v_ref text;
begin
  if extract(isodow from (now() at time zone 'Europe/London')) <> 1 then
    return;
  end if;
  for r in
    select e.employer_id as firm, count(distinct o.id) as n, min(o.activity_date) as oldest
      from public.college_otj_entries o
      join public.employer_employees e
        on e.user_id = o.student_id and e.employer_id is not null and e.status = 'Active'
     where o.verification_status = 'pending'
       and o.source_kind = 'apprentice_submitted'
       and o.created_at < now() - interval '3 days'
     group by e.employer_id
  loop
    begin
      v_ref := 'otj_waiting:' || to_char(current_date, 'IYYY-IW');
      insert into public.employer_expiry_sent (firm, ref) values (r.firm, v_ref)
      on conflict do nothing;
      continue when not found;
      perform public.notify_employer_bell(
        r.firm,
        'apprentice_hours_submitted',
        'Apprentice hours still waiting: ' || r.n,
        'The oldest is from ' || to_char(r.oldest, 'FMDD Mon')
          || '. Confirm them or send them back so the college can count them.',
        jsonb_build_object('route', '/employer?section=apprentices', 'ref_id', v_ref));
    exception when others then
      raise warning '[notify_employer_waiting_otj] %: %', r.firm, sqlerrm;
    end;
  end loop;
end;
$fn$;
revoke all on function public.notify_employer_waiting_otj() from public, anon, authenticated;

do $do$
declare
  v_def text := pg_get_functiondef('public.notify_compliance_expiries()'::regprocedure);
  v_anchor text := $o$  -- ELE-1988: firm-level expiries + the office summary email.$o$;
  v_new text := $o$  -- ELE-1955: Monday nudge when apprentice hours have waited 3+ days.
  begin
    perform public.notify_employer_waiting_otj();
  exception when others then
    raise warning '[notify_compliance_expiries] waiting otj: %', sqlerrm;
  end;

$o$;
begin
  if position('notify_employer_waiting_otj' in v_def) > 0 then
    return;
  end if;
  if position(v_anchor in v_def) = 0 then
    raise exception 'notify_compliance_expiries: anchor not found';
  end if;
  execute replace(v_def, v_anchor, v_new || v_anchor);
end
$do$;
