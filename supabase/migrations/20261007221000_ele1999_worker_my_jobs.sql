-- ELE-1999 — Worker "My Jobs": everything a sparky needs on site in one screen.
--
--   * get_my_jobs(filter): the list, filtered SERVER-SIDE over the caller's
--     CURRENT firm (active roster row) — the old client fetched 50 rows and
--     filtered afterwards, so live jobs could fall off the end.
--   * seen_at on the assignment drives a "New" badge until the worker opens it.
--   * get_my_job_detail(job): site contact (role-aware — apprentices get their
--     supervisor), access notes, office phone, the job's photos/drawings
--     (job_photos), recent crew notes with authors, who else is on the job, and
--     my own "finished" state. Opening it marks the assignment seen.
--   * finish_my_part(job, note, photos): records the worker's part as done with
--     a note + photos (a progress note), tells the office, and when everyone on
--     the job has finished moves the job to Testing on the board. The office
--     marks it Complete. reopen_my_part() undoes a mis-tap.
--
-- New job columns (site_contact_name/phone, access_notes,
-- share_client_contact_with_crew) are set by the office job sheet.

alter table public.employer_jobs
  add column if not exists site_contact_name text,
  add column if not exists site_contact_phone text,
  add column if not exists access_notes text,
  add column if not exists share_client_contact_with_crew boolean not null default true;

comment on column public.employer_jobs.site_contact_name is
  'Who the crew asks for on site (ELE-1999). Shown to assigned workers (not apprentices — they see their supervisor).';
comment on column public.employer_jobs.site_contact_phone is 'Site contact phone, shown to assigned workers.';
comment on column public.employer_jobs.access_notes is 'Keys, gate codes, parking, where to report — shown to everyone assigned.';
comment on column public.employer_jobs.share_client_contact_with_crew is
  'When there is no site contact, may the crew see the client''s name and phone? Default yes.';

alter table public.employer_job_assignments
  add column if not exists seen_at timestamptz,
  add column if not exists finished_at timestamptz,
  add column if not exists finished_note text,
  add column if not exists finished_comment_id uuid references public.employer_job_comments(id) on delete set null;

comment on column public.employer_job_assignments.seen_at is 'When the worker first opened this job in My Jobs (null = "New").';
comment on column public.employer_job_assignments.finished_at is
  'When the worker said "I''ve finished my part" (finish_my_part). Office shows "Dan finished at 15:40".';

-- Old assignments are not "new".
update public.employer_job_assignments
   set seen_at = coalesce(assigned_at, created_at)
 where seen_at is null
   and coalesce(assigned_at, created_at) < now() - interval '3 days';

-- ── List ────────────────────────────────────────────────────────────────────
create or replace function public.get_my_jobs(p_filter text default 'active')
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  with me as (
    select e.id
      from public.employer_employees e
     where e.user_id = auth.uid()
       and e.employer_id is not null
       and lower(coalesce(e.status, '')) = 'active'
  ),
  rows as (
    select a.id as assignment_id, a.role_on_job, a.notes, a.start_date as a_start,
           a.end_date as a_end, a.assigned_at, a.seen_at, a.finished_at, a.status as a_status,
           j.id, j.title, j.client, j.location, j.status, j.board_stage, j.start_date,
           j.end_date, j.description,
           (lower(coalesce(j.status, '')) in ('completed', 'complete', 'cancelled')
             or j.archived_at is not null
             or lower(coalesce(a.status, '')) in ('completed', 'cancelled', 'removed', 'ended')
             or (a.end_date is not null and a.end_date < current_date)) as closed
      from public.employer_job_assignments a
      join me on me.id = a.employee_id
      join public.employer_jobs j on j.id = a.job_id
     where coalesce(j.is_template, false) = false
  )
  select coalesce(jsonb_agg(jsonb_build_object(
           'id', r.id,
           'title', r.title,
           'client_name', r.client,
           'address', r.location,
           'status', r.status,
           'board_stage', r.board_stage,
           'scheduled_date', coalesce(r.a_start, r.start_date),
           'end_date', coalesce(r.a_end, r.end_date),
           'description', r.description,
           'assignment_id', r.assignment_id,
           'role_on_job', r.role_on_job,
           'assignment_notes', r.notes,
           'assignment_start', r.a_start,
           'assignment_end', r.a_end,
           'assigned_at', r.assigned_at,
           'is_new', r.seen_at is null and not r.closed,
           'finished_at', r.finished_at,
           'closed', r.closed
         ) order by r.closed, coalesce(r.a_start, r.start_date) nulls last, r.assigned_at desc), '[]'::jsonb)
    from (
      select * from rows
       where case coalesce(p_filter, 'active')
               when 'active' then not closed
               when 'completed' then closed
               else true
             end
       order by closed, coalesce(a_start, start_date) desc nulls last
       limit case when coalesce(p_filter, 'active') = 'active' then 500 else 200 end
    ) r;
$$;

revoke all on function public.get_my_jobs(text) from public, anon;
grant execute on function public.get_my_jobs(text) to authenticated;

-- ── Detail (marks the assignment seen) ──────────────────────────────────────
create or replace function public.get_my_job_detail(p_job_id uuid)
returns jsonb
language plpgsql
volatile
security definer
set search_path = public
as $$
declare
  v_me record;
  v_a record;
  v_job record;
  v_sup record;
  v_contact jsonb;
  v_office_phone text;
  v_is_apprentice boolean;
begin
  if auth.uid() is null then
    raise exception 'Not signed in' using errcode = '42501';
  end if;

  select a.*, e.team_role, e.supervisor_employee_id, e.employer_id
    into v_a
    from public.employer_job_assignments a
    join public.employer_employees e on e.id = a.employee_id
   where a.job_id = p_job_id
     and e.user_id = auth.uid()
     and e.employer_id is not null
     and lower(coalesce(e.status, '')) = 'active'
   order by a.assigned_at desc nulls last
   limit 1;
  if v_a.id is null then
    raise exception 'This job is not one of yours' using errcode = '42501';
  end if;

  select j.* into v_job from public.employer_jobs j where j.id = p_job_id;
  if v_job.user_id is distinct from v_a.employer_id then
    raise exception 'This job is not one of yours' using errcode = '42501';
  end if;

  if v_a.seen_at is null then
    update public.employer_job_assignments set seen_at = now() where id = v_a.id;
  end if;

  v_is_apprentice := public.employer_access_role(v_a.team_role) = 'apprentice';

  select nullif(trim(cp.company_phone), '') into v_office_phone
    from public.company_profiles cp where cp.user_id = v_job.user_id limit 1;

  if v_is_apprentice then
    select s.id, s.name, s.phone into v_sup
      from public.employer_employees s
     where s.id = v_a.supervisor_employee_id
       and lower(coalesce(s.status, '')) = 'active';
    if v_sup.id is not null then
      v_contact := jsonb_build_object('kind', 'supervisor', 'name', v_sup.name,
                                      'phone', nullif(trim(v_sup.phone), ''));
    end if;
  elsif nullif(trim(coalesce(v_job.site_contact_name, '')), '') is not null
        or nullif(trim(coalesce(v_job.site_contact_phone, '')), '') is not null then
    v_contact := jsonb_build_object('kind', 'site', 'name', nullif(trim(v_job.site_contact_name), ''),
                                    'phone', nullif(trim(v_job.site_contact_phone), ''));
  elsif v_job.share_client_contact_with_crew
        and nullif(trim(coalesce(v_job.client_phone, '')), '') is not null then
    v_contact := jsonb_build_object('kind', 'client', 'name', nullif(trim(v_job.client), ''),
                                    'phone', trim(v_job.client_phone));
  end if;

  return jsonb_build_object(
    'job_id', v_job.id,
    'is_apprentice', v_is_apprentice,
    'contact', v_contact,
    'office_phone', v_office_phone,
    'access_notes', nullif(trim(coalesce(v_job.access_notes, '')), ''),
    'board_stage', v_job.board_stage,
    'lat', v_job.lat,
    'lng', v_job.lng,
    'mine', jsonb_build_object(
      'assignment_id', v_a.id,
      'finished_at', v_a.finished_at,
      'finished_note', v_a.finished_note,
      'can_finish', public.is_assigned_to_job(p_job_id)
    ),
    'files', coalesce((
      select jsonb_agg(jsonb_build_object(
               'id', p.id, 'path', p.storage_path, 'category', p.category,
               'notes', p.notes, 'created_at', p.created_at)
             order by p.created_at desc)
        from (select * from public.job_photos
               where job_id = p_job_id and storage_path is not null
               order by created_at desc limit 60) p
    ), '[]'::jsonb),
    'notes', coalesce((
      select jsonb_agg(jsonb_build_object(
               'id', c.id, 'content', c.content, 'photos', c.photos,
               'author_name', coalesce(ae.name, c.author_name),
               'from_office', c.author_employee_id is null and c.author_user_id is not null
                              and c.author_user_id is distinct from auth.uid(),
               'mine', c.author_user_id = auth.uid(),
               'created_at', c.created_at, 'edited_at', c.edited_at)
             order by c.created_at desc)
        from (select * from public.employer_job_comments
               where job_id = p_job_id and comment_type = 'progress' and task_id is null
               order by created_at desc limit 5) c
        left join public.employer_employees ae on ae.id = c.author_employee_id
    ), '[]'::jsonb),
    'crew', coalesce((
      select jsonb_agg(jsonb_build_object(
               'name', e.name, 'role_on_job', a.role_on_job, 'me', e.user_id = auth.uid(),
               'finished_at', a.finished_at)
             order by (e.user_id = auth.uid()) desc, e.name)
        from public.employer_job_assignments a
        join public.employer_employees e on e.id = a.employee_id
       where a.job_id = p_job_id
         and lower(coalesce(e.status, '')) = 'active'
         and lower(coalesce(a.status, '')) not in ('completed', 'cancelled', 'removed', 'ended')
         and (a.end_date is null or a.end_date >= current_date)
    ), '[]'::jsonb)
  );
end;
$$;

revoke all on function public.get_my_job_detail(uuid) from public, anon;
grant execute on function public.get_my_job_detail(uuid) to authenticated;

-- ── Finished my part ────────────────────────────────────────────────────────
create or replace function public.finish_my_part(p_job_id uuid, p_note text default null, p_photos text[] default '{}')
returns jsonb
language plpgsql
volatile
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_a record;
  v_job record;
  v_note text := nullif(trim(coalesce(p_note, '')), '');
  v_photos text[] := coalesce(p_photos, '{}');
  v_comment uuid;
  v_all_done boolean;
  v_moved boolean := false;
  v_at text;
  v_n int;
begin
  if v_uid is null then
    raise exception 'Not signed in' using errcode = '42501';
  end if;

  select a.id, a.finished_at, e.id as employee_id, e.name, e.employer_id
    into v_a
    from public.employer_job_assignments a
    join public.employer_employees e on e.id = a.employee_id
   where a.job_id = p_job_id
     and e.user_id = v_uid
     and lower(coalesce(e.status, '')) = 'active'
     and lower(coalesce(a.status, '')) not in ('completed', 'cancelled', 'removed', 'ended')
     and (a.end_date is null or a.end_date >= current_date)
   order by a.assigned_at desc nulls last
   limit 1;
  if v_a.id is null then
    raise exception 'You are not on this job any more' using errcode = '42501';
  end if;
  if v_a.finished_at is not null then
    raise exception 'You already marked your part finished' using errcode = '22023';
  end if;

  select j.id, j.title, j.user_id, j.status, j.board_stage, j.progress into v_job
    from public.employer_jobs j where j.id = p_job_id;
  if v_job.user_id is distinct from v_a.employer_id then
    raise exception 'You are not on this job any more' using errcode = '42501';
  end if;
  if lower(coalesce(v_job.status, '')) in ('completed', 'cancelled') then
    raise exception 'This job is already closed' using errcode = '22023';
  end if;

  if coalesce(array_length(v_photos, 1), 0) > 12 then
    raise exception 'Up to 12 photos' using errcode = '22023';
  end if;
  if exists (select 1 from unnest(v_photos) p where p not like v_uid::text || '/%') then
    raise exception 'You can only attach photos you uploaded' using errcode = '42501';
  end if;
  if length(coalesce(v_note, '')) > 4000 then
    raise exception 'Keep the note under 4,000 characters' using errcode = '22023';
  end if;

  -- The note lands in the job feed + Progress logs like any crew note; its own
  -- bell is suppressed because the "finished" bell below says more.
  perform set_config('elecmate.skip_progress_bell', 'on', true);
  insert into public.employer_job_comments (job_id, author_name, comment_type, content, photos)
  values (p_job_id, v_a.name, 'progress',
          'Finished my part' || coalesce(': ' || v_note, '.'), v_photos)
  returning id into v_comment;
  perform set_config('elecmate.skip_progress_bell', 'off', true);

  update public.employer_job_assignments
     set finished_at = now(), finished_note = v_note, finished_comment_id = v_comment
   where id = v_a.id;

  select not exists (
    select 1 from public.employer_job_assignments a
      join public.employer_employees e on e.id = a.employee_id
     where a.job_id = p_job_id
       and lower(coalesce(e.status, '')) = 'active'
       and lower(coalesce(a.status, '')) not in ('completed', 'cancelled', 'removed', 'ended')
       and (a.end_date is null or a.end_date >= current_date)
       and a.finished_at is null
  ) into v_all_done;

  if v_all_done and coalesce(v_job.board_stage, '') not in ('Testing', 'Complete') then
    update public.employer_jobs
       set board_stage = 'Testing',
           progress = greatest(coalesce(progress, 0), 90),
           status = case when status = 'Pending' then 'Active' else status end,
           updated_at = now()
     where id = p_job_id;
    v_moved := true;
  end if;

  v_at := to_char(now() at time zone 'Europe/London', 'HH24:MI');
  v_n := coalesce(array_length(v_photos, 1), 0);
  perform public.notify_employer_bell(
    v_job.user_id,
    'job_part_finished',
    coalesce(nullif(trim(v_a.name), ''), 'A team member') || ' finished their part',
    coalesce(v_job.title, 'Job') || ' · ' || v_at
      || coalesce(' · ' || left(v_note, 120), '')
      || case when v_n = 1 then ' (1 photo)' when v_n > 1 then ' (' || v_n || ' photos)' else '' end
      || case when v_moved then '. Everyone has finished, so it has moved to Testing.' else '' end,
    jsonb_build_object(
      'route', '/employer?section=jobs&job=' || p_job_id,
      'job_id', p_job_id,
      'employee_id', v_a.employee_id,
      'comment_id', v_comment
    )
  );

  return jsonb_build_object('finished_at', now(), 'all_done', v_all_done, 'moved_to_testing', v_moved,
                            'comment_id', v_comment);
end;
$$;

revoke all on function public.finish_my_part(uuid, text, text[]) from public, anon;
grant execute on function public.finish_my_part(uuid, text, text[]) to authenticated;

create or replace function public.reopen_my_part(p_job_id uuid)
returns void
language plpgsql
volatile
security definer
set search_path = public
as $$
declare
  v_a record;
  v_title text;
begin
  select a.id, a.finished_at, e.id as employee_id, e.name, e.employer_id
    into v_a
    from public.employer_job_assignments a
    join public.employer_employees e on e.id = a.employee_id
   where a.job_id = p_job_id
     and e.user_id = auth.uid()
     and lower(coalesce(e.status, '')) = 'active'
     and lower(coalesce(a.status, '')) not in ('completed', 'cancelled', 'removed', 'ended')
     and (a.end_date is null or a.end_date >= current_date)
   order by a.assigned_at desc nulls last
   limit 1;
  if v_a.id is null then
    raise exception 'You are not on this job any more' using errcode = '42501';
  end if;
  if v_a.finished_at is null then
    return;
  end if;

  update public.employer_job_assignments
     set finished_at = null, finished_note = null
   where id = v_a.id;

  select title into v_title from public.employer_jobs where id = p_job_id;
  perform public.notify_employer_bell(
    v_a.employer_id,
    'job_part_reopened',
    coalesce(nullif(trim(v_a.name), ''), 'A team member') || ' is back on the job',
    coalesce(v_title, 'Job') || ': they un-ticked "finished my part".',
    jsonb_build_object('route', '/employer?section=jobs&job=' || p_job_id,
                       'job_id', p_job_id, 'employee_id', v_a.employee_id)
  );
end;
$$;

revoke all on function public.reopen_my_part(uuid) from public, anon;
grant execute on function public.reopen_my_part(uuid) to authenticated;

comment on table public.employer_job_assignments is
  '[EMPLOYER HUB → WORKER TOOLS] Who is on which job, with role, dates and office notes. Scope: job_id → employer_jobs; employee_id → roster. Used by: Assign sheet, Worker Tools My Jobs (get_my_jobs / get_my_job_detail), Overview "Who''s where". Rule: Trigger notify_assignment pushes to the worker. seen_at/finished_at are written only by the worker RPCs (get_my_job_detail, finish_my_part, reopen_my_part).';
