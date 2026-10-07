-- ELE-1902: what happens when a learner moves cohort, takes a break, withdraws,
-- completes or transfers. The released web app and iOS build 49 already write
-- college_students.status / cohort_id / learning_actual_end_date straight to the
-- row, so every effect hangs off a trigger on that row: whichever client (or
-- SQL) makes the change, the same things happen.
--
--   leaves Active (break, suspended, withdrawn, completed, transferred, archived)
--     · live share links, external assessor / employer links and unsigned
--       witness requests are paused, each one remembered so it can be resumed
--     · open (unsigned) progress reviews are stood down, so the employer's
--       review link stops working
--     · the funding history gets the matching episode (break / withdrawal /
--       completion) unless staff recorded one in the last two days
--     · withdrawn / completed / transferred: the leave date is set if missing
--       (OTJ hours freeze at it, see _otj_summary_core) and the learner is told
--       they can download their record
--   back to Active
--     · everything this paused is resumed (unless it has expired meanwhile),
--       the leave date is cleared, a 'return' episode is written after a break
--   cohort move
--     · logged with the old and new cohort; assignment rows follow; quizzes
--       they already sat in the old cohort stay readable to them
--
-- Seats / pilot access: trg_college_access_roll (pilot-access work) already
-- re-syncs college access on every status change; nothing here touches it.
-- Additive only: two new tables, one new trigger pair, one notification type,
-- and _otj_summary_core gains a freeze (new keys frozen_at / frozen_reason).
begin;

-- ------------------------------------------------------------ history
create table if not exists public.college_student_lifecycle_events (
  id               uuid primary key default gen_random_uuid(),
  college_id       uuid not null references public.colleges(id) on delete cascade,
  student_id       uuid not null references public.college_students(id) on delete cascade,
  user_id          uuid,
  kind             text not null check (kind in ('status', 'cohort_move')),
  from_status      text,
  to_status        text,
  from_cohort_id   uuid,
  to_cohort_id     uuid,
  from_cohort_name text,
  to_cohort_name   text,
  effective_date   date not null default ((now() at time zone 'Europe/London')::date),
  effects          jsonb not null default '{}'::jsonb,
  changed_by       uuid,
  created_at       timestamptz not null default now()
);
create index if not exists college_student_lifecycle_events_student_idx
  on public.college_student_lifecycle_events (student_id, created_at desc);
comment on table public.college_student_lifecycle_events is
  '[COLLEGE] A learner''s roll history (ELE-1902): every status change (break, withdrawn, completed, transferred, back to active) and every cohort move, with what it did (links paused or resumed, hours frozen, learner told). Written only by trg_college_student_lifecycle. Scope: one college. Used by: LearnerLifecycleSheet, Student 360. Rule: append only.';

create table if not exists public.college_learner_link_pauses (
  id               uuid primary key default gen_random_uuid(),
  college_id       uuid not null references public.colleges(id) on delete cascade,
  student_id       uuid not null references public.college_students(id) on delete cascade,
  user_id          uuid,
  link_kind        text not null check (link_kind in ('portfolio_share', 'assessor_link', 'witness_request', 'tripartite_review')),
  link_id          uuid not null,
  prev_value       text,
  paused_at        timestamptz not null default now(),
  paused_event_id  uuid references public.college_student_lifecycle_events(id) on delete set null,
  resumed_at       timestamptz,
  resumed_event_id uuid references public.college_student_lifecycle_events(id) on delete set null,
  resume_note      text
);
create index if not exists college_learner_link_pauses_open_idx
  on public.college_learner_link_pauses (student_id) where resumed_at is null;
comment on table public.college_learner_link_pauses is
  '[COLLEGE] Links paused because a learner left the active roll (ELE-1902): share links, external assessor and employer links, witness requests, open progress reviews, with the state each was in so it can be put back when they return. Written only by trg_college_student_lifecycle. Scope: one college. Used by: LearnerLifecycleSheet. Rule: never delete; a resume sets resumed_at.';

alter table public.college_student_lifecycle_events enable row level security;
alter table public.college_learner_link_pauses enable row level security;
drop policy if exists "College staff read learner history" on public.college_student_lifecycle_events;
create policy "College staff read learner history" on public.college_student_lifecycle_events
  for select to authenticated using (public.college_can('learners.view_all', college_id));
drop policy if exists "College staff read paused links" on public.college_learner_link_pauses;
create policy "College staff read paused links" on public.college_learner_link_pauses
  for select to authenticated using (public.college_can('learners.view_all', college_id));
revoke all on public.college_student_lifecycle_events, public.college_learner_link_pauses from anon;
revoke insert, update, delete, truncate on public.college_student_lifecycle_events, public.college_learner_link_pauses from authenticated;
grant select on public.college_student_lifecycle_events, public.college_learner_link_pauses to authenticated;

insert into public.notification_types (type, category, push, importance)
values ('learner_programme_status', 'apprentice', true, 1)
on conflict (type) do nothing;

-- ------------------------------------------------------------ BEFORE: leave date
create or replace function public.tg_college_student_leave_date()
returns trigger
language plpgsql
set search_path to 'public'
as $function$
begin
  if new.status is not distinct from old.status then
    return new;
  end if;
  if new.status in ('Withdrawn', 'Completed', 'Transferred') and new.learning_actual_end_date is null then
    new.learning_actual_end_date := (now() at time zone 'Europe/London')::date;
  elsif new.status = 'Active' and old.status in ('Withdrawn', 'Completed', 'Transferred') then
    new.learning_actual_end_date := null;
  end if;
  return new;
end;
$function$;

drop trigger if exists trg_college_student_leave_date on public.college_students;
create trigger trg_college_student_leave_date
  before update of status on public.college_students
  for each row execute function public.tg_college_student_leave_date();

-- ------------------------------------------------------------ AFTER: effects
create or replace function public.tg_college_student_lifecycle()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_today   date := (now() at time zone 'Europe/London')::date;
  v_event   uuid;
  v_paused  int := 0;
  v_resumed int := 0;
  v_expired int := 0;
  v_n       int;
  v_told    boolean := false;
  v_episode text;
  v_eff     date;
  v_from_name text;
  v_to_name   text;
  r record;
  v_was_active boolean := coalesce(old.status, 'Active') = 'Active';
  v_is_active  boolean := coalesce(new.status, 'Active') = 'Active';
begin
  if new.college_id is null then
    return null;
  end if;
  -- ---------------------------------------------------------------- cohort move
  if new.cohort_id is distinct from old.cohort_id then
    select name into v_from_name from college_cohorts where id = old.cohort_id;
    select name into v_to_name from college_cohorts where id = new.cohort_id;
    insert into college_student_lifecycle_events
      (college_id, student_id, user_id, kind, from_status, to_status,
       from_cohort_id, to_cohort_id, from_cohort_name, to_cohort_name, changed_by, effects)
    values (new.college_id, new.id, new.user_id, 'cohort_move', old.status, new.status,
            old.cohort_id, new.cohort_id, v_from_name, v_to_name, auth.uid(), '{}'::jsonb)
    returning id into v_event;

    if new.user_id is not null then
      -- Assignment rows carry the cohort as text: keep them in step (the new
      -- client does this too; the released one does not).
      update college_student_assignments
         set cohort_id = new.cohort_id::text, cohort_name = v_to_name, updated_at = now()
       where student_id = new.user_id
         and cohort_id is distinct from new.cohort_id::text;
      -- Quizzes set to the old cohort that they already sat stay readable to
      -- them (quiz RLS follows the current cohort), so their history is whole.
      update tutor_quizzes q
         set assigned_student_ids = array_append(coalesce(q.assigned_student_ids, '{}'::uuid[]), new.user_id)
       where old.cohort_id is not null
         and q.cohort_id = old.cohort_id
         and not (new.user_id = any (coalesce(q.assigned_student_ids, '{}'::uuid[])))
         and exists (select 1 from tutor_quiz_attempts a where a.quiz_id = q.id and a.student_id = new.user_id);
      get diagnostics v_n = row_count;
      update college_student_lifecycle_events
         set effects = jsonb_build_object('quizzes_kept', v_n)
       where id = v_event;
    end if;
  end if;

  if new.status is not distinct from old.status then
    return null;
  end if;

  -- ---------------------------------------------------------------- status change
  v_eff := case when new.status in ('Withdrawn', 'Completed', 'Transferred')
                then coalesce(new.learning_actual_end_date, v_today) else v_today end;
  insert into college_student_lifecycle_events
    (college_id, student_id, user_id, kind, from_status, to_status,
     from_cohort_id, to_cohort_id, effective_date, changed_by)
  values (new.college_id, new.id, new.user_id, 'status', old.status, new.status,
          old.cohort_id, new.cohort_id, v_eff, auth.uid())
  returning id into v_event;

  if not v_is_active then
    -- Pause what is live and not already paused.
    if new.user_id is not null then
      for r in
        select s.id from portfolio_shares s
         where s.user_id = new.user_id and s.is_active
           and (s.expires_at is null or s.expires_at > now())
           and not exists (select 1 from college_learner_link_pauses p
                            where p.link_kind = 'portfolio_share' and p.link_id = s.id and p.resumed_at is null)
      loop
        update portfolio_shares set is_active = false where id = r.id;
        insert into college_learner_link_pauses (college_id, student_id, user_id, link_kind, link_id, prev_value, paused_event_id)
        values (new.college_id, new.id, new.user_id, 'portfolio_share', r.id, 'active', v_event);
        v_paused := v_paused + 1;
      end loop;

      for r in
        select l.id, l.status from portfolio_assessor_links l
         where l.learner_id = new.user_id and l.status in ('invited', 'active')
           and (l.expires_at is null or l.expires_at > now())
           and not exists (select 1 from college_learner_link_pauses p
                            where p.link_kind = 'assessor_link' and p.link_id = l.id and p.resumed_at is null)
      loop
        update portfolio_assessor_links set status = 'revoked', revoked_at = now() where id = r.id;
        insert into college_learner_link_pauses (college_id, student_id, user_id, link_kind, link_id, prev_value, paused_event_id)
        values (new.college_id, new.id, new.user_id, 'assessor_link', r.id, r.status, v_event);
        v_paused := v_paused + 1;
      end loop;

      for r in
        select w.id from portfolio_witness_statements w
         where w.learner_id = new.user_id and w.status = 'requested'
           and not exists (select 1 from college_learner_link_pauses p
                            where p.link_kind = 'witness_request' and p.link_id = w.id and p.resumed_at is null)
      loop
        update portfolio_witness_statements set status = 'expired' where id = r.id;
        insert into college_learner_link_pauses (college_id, student_id, user_id, link_kind, link_id, prev_value, paused_event_id)
        values (new.college_id, new.id, new.user_id, 'witness_request', r.id, 'requested', v_event);
        v_paused := v_paused + 1;
      end loop;
    end if;

    -- Open reviews: stood down (signed reviews are evidence and never change).
    perform set_config('app.tripartite_rpc', 'on', true);
    for r in
      select t.id, t.status from college_tripartite_reviews t
       where t.student_id = new.id and t.locked_at is null and t.status in ('scheduled', 'in_progress')
    loop
      update college_tripartite_reviews set status = 'cancelled' where id = r.id;
      insert into college_learner_link_pauses (college_id, student_id, user_id, link_kind, link_id, prev_value, paused_event_id)
      values (new.college_id, new.id, new.user_id, 'tripartite_review', r.id, r.status, v_event);
      v_paused := v_paused + 1;
    end loop;
    perform set_config('app.tripartite_rpc', 'off', true);
  else
    -- Back to Active: resume what this paused, unless it has expired since.
    perform set_config('app.tripartite_rpc', 'on', true);
    for r in
      select p.* from college_learner_link_pauses p
       where p.student_id = new.id and p.resumed_at is null
    loop
      if r.link_kind = 'portfolio_share' then
        update portfolio_shares set is_active = true
         where id = r.link_id and (expires_at is null or expires_at > now());
      elsif r.link_kind = 'assessor_link' then
        update portfolio_assessor_links set status = r.prev_value, revoked_at = null
         where id = r.link_id and status = 'revoked' and (expires_at is null or expires_at > now());
      elsif r.link_kind = 'witness_request' then
        update portfolio_witness_statements set status = 'requested'
         where id = r.link_id and status = 'expired' and (expires_at is null or expires_at > now());
      elsif r.link_kind = 'tripartite_review' then
        update college_tripartite_reviews set status = r.prev_value
         where id = r.link_id and status = 'cancelled' and locked_at is null;
      end if;
      get diagnostics v_n = row_count;
      update college_learner_link_pauses
         set resumed_at = now(), resumed_event_id = v_event,
             resume_note = case when v_n = 0 then 'expired or changed while paused' end
       where id = r.id;
      if v_n > 0 then v_resumed := v_resumed + 1; else v_expired := v_expired + 1; end if;
    end loop;
    perform set_config('app.tripartite_rpc', 'off', true);
  end if;

  -- Funding history (paras 266-277): the matching episode, unless staff
  -- recorded the same kind in the last two days (no doubles).
  v_episode := case
    when new.status = 'On Break' then 'break'
    when new.status in ('Withdrawn', 'Transferred') then 'withdrawal'
    when new.status = 'Completed' then 'completion'
    when new.status = 'Active' and old.status = 'On Break' then 'return'
  end;
  if v_episode is not null and not exists (
       select 1 from college_learner_episodes e
        where e.student_id = new.id and e.kind = v_episode and e.created_at > now() - interval '2 days') then
    insert into college_learner_episodes (college_id, student_id, kind, effective_date, last_evidenced_learning_date, reason, recorded_by)
    values (new.college_id, new.id, v_episode, v_eff,
            case when v_episode in ('withdrawal', 'completion', 'break') then coalesce(new.learning_actual_end_date, v_today) end,
            case when new.status = 'Transferred' then 'Transferred to another provider' end,
            auth.uid());
  end if;

  -- Tell the learner their record is theirs to take.
  if new.user_id is not null and new.status in ('Withdrawn', 'Completed', 'Transferred') then
    perform public.notify_user(new.user_id, 'learner_programme_status',
      case new.status
        when 'Completed' then 'Well done on finishing your apprenticeship'
        when 'Transferred' then 'Your record is ready to take with you'
        else 'Your college has closed your place on the programme' end,
      'Download your portfolio, hours and reviews from Export pack so you keep a copy.',
      jsonb_build_object('route', '/apprentice/hub?export=1', 'ref_id', new.id::text, 'status', new.status));
    v_told := true;
  end if;

  update college_student_lifecycle_events
     set effects = jsonb_strip_nulls(jsonb_build_object(
           'links_paused', v_paused,
           'links_resumed', v_resumed,
           'links_expired', nullif(v_expired, 0),
           'otj_frozen_at', case when new.status in ('Withdrawn', 'Completed', 'Transferred') then v_eff end,
           'funding_episode', v_episode,
           'learner_told', v_told))
   where id = v_event;
  return null;
end;
$function$;

revoke all on function public.tg_college_student_lifecycle() from public, anon, authenticated;
revoke all on function public.tg_college_student_leave_date() from public, anon, authenticated;

drop trigger if exists trg_college_student_lifecycle on public.college_students;
create trigger trg_college_student_lifecycle
  after update of status, cohort_id on public.college_students
  for each row execute function public.tg_college_student_lifecycle();

commit;
