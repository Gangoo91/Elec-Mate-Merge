-- ELE-1961: one stage model for the Job Board, Timeline, Diary (ELE-1820) and
-- the job list.
--
-- Before: board_stage was set on 0 of 14 jobs. The board placed every card off
-- a status/progress fallback with no On hold branch, the timeline derived its
-- own stage from status (and disagreed), and "Enquiry" was promised but never
-- existed.
--
-- After: employer_jobs.board_stage IS the stage, always set, one of
--   Enquiry → Quoted → Confirmed → Scheduled → In Progress → Testing → Complete
--   plus On Hold.
-- status stays as the lifecycle column every older reader filters on, and a
-- BEFORE trigger keeps the two in step whichever one a writer sets, so a sheet
-- that only writes status (New Job, Job detail) still lands the job in the
-- right column, and the board writing a stage still moves status.
--
-- Also fixes the UPDATE policy: its WITH CHECK was auth.uid() = user_id, so an
-- office manager (employer_admins) could read a job but every update — board
-- drag, timeline drag, date change — failed. It now matches the USING clause.

-- ── Stage ↔ status rules ───────────────────────────────────────────────────

create or replace function public.job_status_for_stage(p_stage text)
returns text
language sql
immutable
set search_path = public
as $$
  select case p_stage
    when 'Enquiry' then 'Pending'
    when 'Quoted' then 'Pending'
    when 'Confirmed' then 'Active'
    when 'Scheduled' then 'Active'
    when 'In Progress' then 'Active'
    when 'Testing' then 'Active'
    when 'Complete' then 'Completed'
    when 'On Hold' then 'On Hold'
    else null
  end
$$;

create or replace function public.job_stage_for_status(
  p_status text,
  p_current text,
  p_progress integer,
  p_has_date boolean
)
returns text
language sql
immutable
set search_path = public
as $$
  select case
    when p_status = 'Completed' then 'Complete'
    when p_status = 'On Hold' then 'On Hold'
    -- Cancelled is not a stage: every view hides cancelled jobs, and keeping
    -- the last stage means un-cancelling puts the card back where it was.
    when p_status = 'Cancelled' then p_current
    when p_status = 'Pending' then
      case when p_current in ('Enquiry', 'Quoted') then p_current else 'Quoted' end
    when p_status = 'Active' then
      case
        when p_current in ('Confirmed', 'Scheduled', 'In Progress', 'Testing') then p_current
        when coalesce(p_progress, 0) >= 90 then 'Testing'
        when coalesce(p_progress, 0) > 0 then 'In Progress'
        when coalesce(p_has_date, false) then 'Scheduled'
        else 'Confirmed'
      end
    else p_current
  end
$$;

revoke all on function public.job_status_for_stage(text) from public, anon;
revoke all on function public.job_stage_for_status(text, text, integer, boolean) from public, anon;
grant execute on function public.job_status_for_stage(text) to authenticated;
grant execute on function public.job_stage_for_status(text, text, integer, boolean) to authenticated;

create or replace function public.trg_sync_job_stage()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    if new.board_stage is null then
      new.board_stage := public.job_stage_for_status(
        new.status, null, new.progress, new.start_date is not null);
    elsif coalesce(new.status, '') <> 'Cancelled' then
      new.status := coalesce(public.job_status_for_stage(new.board_stage), new.status);
    end if;
    return new;
  end if;

  if new.board_stage is null then
    -- Cleared on purpose (or by an old writer): re-derive, never leave it empty.
    new.board_stage := public.job_stage_for_status(
      new.status, old.board_stage, new.progress, new.start_date is not null);
  elsif new.board_stage is distinct from old.board_stage then
    -- The stage moved (board, timeline, diary). Status follows, unless this
    -- same write is cancelling the job.
    if not (new.status = 'Cancelled' and new.status is distinct from old.status) then
      new.status := coalesce(public.job_status_for_stage(new.board_stage), new.status);
    end if;
  elsif new.status is distinct from old.status then
    -- Only status moved (New Job / job detail / bulk status change).
    new.board_stage := public.job_stage_for_status(
      new.status, old.board_stage, new.progress, new.start_date is not null);
  elsif new.start_date is distinct from old.start_date then
    -- A date arriving on a won job schedules it; losing it un-schedules it.
    if new.board_stage = 'Confirmed' and new.start_date is not null then
      new.board_stage := 'Scheduled';
    elsif new.board_stage = 'Scheduled' and new.start_date is null then
      new.board_stage := 'Confirmed';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists sync_job_stage on public.employer_jobs;
create trigger sync_job_stage
  before insert or update on public.employer_jobs
  for each row execute function public.trg_sync_job_stage();

-- ── Backfill (audit trigger off: this is a data repair, not a team action) ──

alter table public.employer_jobs disable trigger audit_team_action;
update public.employer_jobs
   set board_stage = public.job_stage_for_status(status, null, progress, start_date is not null)
 where board_stage is null
    or board_stage not in ('Enquiry', 'Quoted', 'Confirmed', 'Scheduled', 'In Progress',
                           'Testing', 'Complete', 'On Hold');
alter table public.employer_jobs enable trigger audit_team_action;

alter table public.employer_jobs drop constraint if exists employer_jobs_board_stage_check;
alter table public.employer_jobs add constraint employer_jobs_board_stage_check
  check (board_stage is null or board_stage in ('Enquiry', 'Quoted', 'Confirmed', 'Scheduled',
                                                'In Progress', 'Testing', 'Complete', 'On Hold'));

comment on column public.employer_jobs.board_stage is
  'THE job stage (ELE-1961): Enquiry, Quoted, Confirmed, Scheduled, In Progress, Testing, Complete, On Hold. '
  'Read by the Job Board, Timeline, Diary and job list. Kept in step with status by trigger sync_job_stage '
  '(null only on a job cancelled before it ever had a stage).';

-- ── Managers can update the firm''s jobs (WITH CHECK matched USING) ─────────

drop policy if exists "Users can update own jobs" on public.employer_jobs;
create policy "Users can update own jobs" on public.employer_jobs
  for update to authenticated
  using (user_id in (select public.my_employer_scope()))
  with check (user_id in (select public.my_employer_scope()));
