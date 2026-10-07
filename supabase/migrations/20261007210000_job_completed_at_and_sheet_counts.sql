-- ELE-1960 — the job sheet is the centre of everything.
--
-- 1. employer_jobs.completed_at: "Completed 30d" used to key on updated_at,
--    so any edit to an old job recounted it. The date is stamped by a trigger
--    when status becomes Completed, and cleared if the job is reopened. Stage
--    / status semantics are untouched (ELE-1961 owns those); this only
--    records WHEN a job reached the existing 'Completed' status.
-- 2. employer_jobs UPDATE policy: WITH CHECK was (auth.uid() = user_id), so a
--    manager acting for the firm (user_id = firm, not them) could read a job
--    but every save failed. Now: the row must stay inside the caller's scope.
-- 3. get_job_sheet_counts(job): one call for the job sheet's shortcut tiles
--    (quotes, invoices, packs, RAMS, photos, snags, issues, progress, tests,
--    hours, team, checklist). Counts only, no money — safe for office roles.

-- 1 ── completed_at ─────────────────────────────────────────────────────────
alter table public.employer_jobs add column if not exists completed_at timestamptz;

comment on column public.employer_jobs.completed_at is
  'When the job reached status Completed. Stamped by trg_employer_jobs_completed_at on the status change, cleared if the job is reopened. Use this (not updated_at) for "completed in the last N days".';

create or replace function public.employer_jobs_stamp_completed_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if lower(coalesce(new.status, '')) = 'completed' then
    if tg_op = 'INSERT' or lower(coalesce(old.status, '')) <> 'completed' then
      new.completed_at := coalesce(new.completed_at, now());
    end if;
  else
    new.completed_at := null;
  end if;
  return new;
end;
$$;

revoke all on function public.employer_jobs_stamp_completed_at() from public, anon;

drop trigger if exists trg_employer_jobs_completed_at on public.employer_jobs;
create trigger trg_employer_jobs_completed_at
  before insert or update of status on public.employer_jobs
  for each row execute function public.employer_jobs_stamp_completed_at();

-- Jobs already Completed before the column existed: best evidence we have.
update public.employer_jobs
   set completed_at = updated_at
 where lower(status) = 'completed' and completed_at is null;

create index if not exists employer_jobs_user_completed_at_idx
  on public.employer_jobs (user_id, completed_at)
  where completed_at is not null;

-- 2 ── managers can save the firm's jobs ────────────────────────────────────
drop policy if exists "Users can update own jobs" on public.employer_jobs;
create policy "Users can update own jobs" on public.employer_jobs
  for update to authenticated
  using (user_id in (select public.my_employer_scope()))
  with check (user_id in (select public.my_employer_scope()));

-- 3 ── shortcut counts for the job sheet ────────────────────────────────────
create or replace function public.get_job_sheet_counts(p_job_id uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_job employer_jobs;
begin
  select * into v_job from employer_jobs
   where id = p_job_id and user_id in (select public.my_employer_scope());
  if v_job.id is null then
    return jsonb_build_object('error', 'not_found');
  end if;

  return jsonb_build_object(
    'quotes', (select count(*) from quotes q
                where q.employer_job_id = p_job_id and q.user_id = v_job.user_id
                  and q.deleted_at is null and not coalesce(q.invoice_raised, false)),
    'invoices', (select count(*) from quotes q
                  where q.employer_job_id = p_job_id and q.user_id = v_job.user_id
                    and q.deleted_at is null and coalesce(q.invoice_raised, false)),
    'packs', (select count(*) from employer_job_packs where job_id = p_job_id),
    'rams', (select count(*) from rams_documents where employer_job_id = p_job_id),
    'photos', (select count(*) from job_photos where job_id = p_job_id),
    'snags_open', (select count(*) from job_issues
                    where job_id = p_job_id and issue_type in ('Snag', 'Defect')
                      and lower(coalesce(status, '')) not in ('resolved', 'closed')),
    'snags_total', (select count(*) from job_issues
                     where job_id = p_job_id and issue_type in ('Snag', 'Defect')),
    'issues_open', (select count(*) from job_issues
                     where job_id = p_job_id and coalesce(issue_type, '') not in ('Snag', 'Defect')
                       and lower(coalesce(status, '')) not in ('resolved', 'closed')),
    'issues_total', (select count(*) from job_issues
                      where job_id = p_job_id and coalesce(issue_type, '') not in ('Snag', 'Defect')),
    'progress_logs', (select count(*) from progress_logs where job_id = p_job_id),
    'tests', (select count(*) from job_tests where job_id = p_job_id),
    'tests_failed', (select count(*) from job_tests where job_id = p_job_id and result ilike 'fail%'),
    'hours', (select coalesce(round(sum(coalesce(total_hours, 0))::numeric, 1), 0)
                from employer_timesheets
               where job_id = p_job_id and lower(coalesce(status, '')) <> 'rejected'),
    'timesheets', (select count(*) from employer_timesheets
                    where job_id = p_job_id and lower(coalesce(status, '')) <> 'rejected'),
    'team', (select count(*) from employer_job_assignments a
              where a.job_id = p_job_id
                and coalesce(lower(a.status), 'assigned') not in ('completed', 'cancelled', 'removed', 'ended')),
    'checklist_total', (select count(*) from employer_job_checklist_items where job_id = p_job_id),
    'checklist_done', (select count(*) from employer_job_checklist_items
                        where job_id = p_job_id and is_completed),
    'completed_at', v_job.completed_at
  );
end;
$$;

revoke all on function public.get_job_sheet_counts(uuid) from public, anon;
grant execute on function public.get_job_sheet_counts(uuid) to authenticated;
