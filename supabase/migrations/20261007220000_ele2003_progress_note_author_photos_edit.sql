-- ELE-2003 — Worker progress notes: who wrote it, photos, edit within 24h.
--
-- Worker progress notes live in employer_job_comments (comment_type='progress').
-- Until now the only author trace was the free-text author_name, which the
-- client wrote. This adds:
--   * author_user_id / author_employee_id, stamped SERVER-SIDE from auth.uid()
--     by a BEFORE INSERT trigger (office-written notes get author_user_id only);
--   * photos (visual-uploads storage PATHS, never public URLs);
--   * edited_at, and a worker edit/delete window of 24 hours on their OWN notes,
--     only while they are still on the job at their current firm;
--   * storage read access for those photos (firm + crew on the job);
--   * a session switch so finish_my_part() (ELE-1999) can ring its own bell
--     instead of a second "added a progress note" bell.
-- The office bell for a new note already exists (notify_progress_note).

alter table public.employer_job_comments
  add column if not exists author_user_id uuid references auth.users(id) on delete set null,
  add column if not exists author_employee_id uuid references public.employer_employees(id) on delete set null,
  add column if not exists photos text[] not null default '{}'::text[],
  add column if not exists edited_at timestamptz;

create index if not exists idx_employer_job_comments_author_user
  on public.employer_job_comments (author_user_id) where author_user_id is not null;
create index if not exists idx_employer_job_comments_photos
  on public.employer_job_comments using gin (photos);

comment on column public.employer_job_comments.author_user_id is
  'Who wrote it (auth user). Stamped by stamp_job_comment_author from auth.uid(); never trusted from the client.';
comment on column public.employer_job_comments.author_employee_id is
  'Roster row of the worker who wrote it (null for office-written notes). Stamped server-side.';
comment on column public.employer_job_comments.photos is
  'visual-uploads storage paths (<uploader uid>/…). Workers may attach only their own uploads.';

-- Backfill: existing worker notes whose author_name matches exactly one roster
-- row in the job's firm.
update public.employer_job_comments c
   set author_employee_id = m.emp_id,
       author_user_id = coalesce(c.author_user_id, m.user_id)
  from (
    select c2.id as comment_id, min(e.id::text)::uuid as emp_id, (array_agg(e.user_id))[1] as user_id
      from public.employer_job_comments c2
      join public.employer_jobs j on j.id = c2.job_id
      join public.employer_employees e
        on e.employer_id = j.user_id and lower(trim(e.name)) = lower(trim(c2.author_name))
     where c2.author_employee_id is null
     group by c2.id
    having count(*) = 1
  ) m
 where c.id = m.comment_id;

-- ── Author stamp + edit guard ───────────────────────────────────────────────
create or replace function public.stamp_job_comment_author()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_firm uuid;
  v_office boolean;
  v_emp record;
begin
  select j.user_id into v_firm from public.employer_jobs j where j.id = coalesce(new.job_id, old.job_id);
  v_office := v_uid is not null and v_firm in (select public.my_employer_scope());

  if coalesce(array_length(new.photos, 1), 0) > 12 then
    raise exception 'Up to 12 photos per note' using errcode = '22023';
  end if;

  if tg_op = 'INSERT' then
    new.edited_at := null;
    -- Server-side writers (cron, service role) keep what they were given.
    if v_uid is null then
      return new;
    end if;
    new.author_user_id := v_uid;
    if v_office then
      new.author_employee_id := null;
    else
      select e.id, e.name into v_emp
        from public.employer_employees e
       where e.employer_id = v_firm
         and e.user_id = v_uid
         and lower(coalesce(e.status, '')) = 'active'
       order by e.created_at desc
       limit 1;
      new.author_employee_id := v_emp.id;
      if v_emp.id is not null and nullif(trim(v_emp.name), '') is not null then
        new.author_name := v_emp.name;
      end if;
      if exists (select 1 from unnest(coalesce(new.photos, '{}')) p
                  where p not like v_uid::text || '/%') then
        raise exception 'You can only attach photos you uploaded' using errcode = '42501';
      end if;
    end if;
    return new;
  end if;

  -- UPDATE: authorship and timestamps never change.
  new.id := old.id;
  new.created_at := old.created_at;
  new.author_user_id := old.author_user_id;
  new.author_employee_id := old.author_employee_id;

  if v_uid is not null and not v_office then
    -- A worker may change the words and the photos, nothing else.
    new.job_id := old.job_id;
    new.task_id := old.task_id;
    new.comment_type := old.comment_type;
    new.author_name := old.author_name;
    if exists (select 1 from unnest(coalesce(new.photos, '{}')) p
                where p not like v_uid::text || '/%'
                  and not (p = any (coalesce(old.photos, '{}')))) then
      raise exception 'You can only attach photos you uploaded' using errcode = '42501';
    end if;
  end if;

  if new.content is distinct from old.content or new.photos is distinct from old.photos then
    new.edited_at := now();
  else
    new.edited_at := old.edited_at;
  end if;
  return new;
end;
$$;

revoke all on function public.stamp_job_comment_author() from public, anon, authenticated;

drop trigger if exists stamp_job_comment_author on public.employer_job_comments;
create trigger stamp_job_comment_author
  before insert or update on public.employer_job_comments
  for each row execute function public.stamp_job_comment_author();

-- ── Worker edit / delete window: own progress note, 24h, still on the job ──
drop policy if exists "Worker edits own recent progress notes" on public.employer_job_comments;
create policy "Worker edits own recent progress notes"
  on public.employer_job_comments
  for update to authenticated
  using (
    author_user_id = (select auth.uid())
    and comment_type = 'progress'
    and task_id is null
    and created_at > now() - interval '24 hours'
    and public.is_assigned_to_job(job_id)
  )
  with check (
    author_user_id = (select auth.uid())
    and comment_type = 'progress'
    and task_id is null
    and public.is_assigned_to_job(job_id)
  );

drop policy if exists "Worker deletes own recent progress notes" on public.employer_job_comments;
create policy "Worker deletes own recent progress notes"
  on public.employer_job_comments
  for delete to authenticated
  using (
    author_user_id = (select auth.uid())
    and comment_type = 'progress'
    and task_id is null
    and created_at > now() - interval '24 hours'
    and public.is_assigned_to_job(job_id)
  );

-- ── Office bell for a new note: unchanged, plus the finish_my_part switch ──
create or replace function public.notify_progress_note()
returns trigger
language plpgsql
security definer
set search_path = public
as $function$
declare
  v_job record;
  v_emp record;
  v_photos int := coalesce(array_length(new.photos, 1), 0);
begin
  if coalesce(new.comment_type, '') <> 'progress' or new.task_id is not null then
    return new;
  end if;
  if auth.uid() is null then return new; end if;
  -- finish_my_part() rings its own "finished their part" bell (ELE-1999).
  if coalesce(current_setting('elecmate.skip_progress_bell', true), '') = 'on' then
    return new;
  end if;

  select j.id, j.title, j.user_id into v_job from public.employer_jobs j where j.id = new.job_id;
  if v_job.user_id is null then return new; end if;

  if v_job.user_id in (select public.my_employer_scope()) then return new; end if;

  select e.id, e.name into v_emp
    from public.employer_employees e
   where e.employer_id = v_job.user_id and e.user_id = auth.uid()
   order by (lower(coalesce(e.status, '')) = 'archived'), e.created_at desc
   limit 1;
  if v_emp.id is null then return new; end if;

  perform public.notify_employer_bell(
    v_job.user_id,
    'progress_note',
    coalesce(nullif(trim(v_emp.name), ''), nullif(trim(new.author_name), ''), 'A team member')
      || ' added a progress note',
    coalesce(v_job.title || ': ', '') || left(coalesce(new.content, ''), 140)
      || case when v_photos = 1 then ' (1 photo)'
              when v_photos > 1 then ' (' || v_photos || ' photos)'
              else '' end,
    jsonb_build_object(
      'route', '/employer?section=progresslogs',
      'job_id', new.job_id,
      'comment_id', new.id,
      'employee_id', v_emp.id
    )
  );
  return new;
exception when others then
  raise warning '[notify_progress_note] %', sqlerrm;
  return new;
end;
$function$;

-- ── Storage: progress-note photos readable by the firm and the crew ─────────
create or replace function public.can_read_visual_upload(p_name text)
returns boolean
language plpgsql
stable
security definer
set search_path = public
as $function$
declare
  v_uid uuid := auth.uid();
  v_url_tail text := '/visual-uploads/' || p_name;
begin
  if v_uid is null or p_name is null then
    return false;
  end if;

  if exists (
    select 1 from public.job_issues ji
     where exists (select 1 from unnest(ji.photos) p where p = p_name or right(p, length(v_url_tail)) = v_url_tail)
       and public.visual_upload_owner_in_firm(p_name, ji.user_id)
       and (ji.user_id in (select public.my_employer_scope())
            or ji.reported_by in (select public.my_employee_ids())
            or (ji.job_id is not null and public.is_assigned_to_job(ji.job_id)))
  ) then return true; end if;

  if exists (
    select 1 from public.employer_incidents ei
     where exists (select 1 from unnest(ei.photos) p where p = p_name or right(p, length(v_url_tail)) = v_url_tail)
       and public.visual_upload_owner_in_firm(p_name, ei.employer_id)
       and (ei.employer_id in (select public.my_employer_scope())
            or ei.reported_by in (select public.my_employee_ids()::text))
  ) then return true; end if;

  if exists (
    select 1 from public.progress_logs pl
     where exists (select 1 from unnest(pl.photos) p where p = p_name or right(p, length(v_url_tail)) = v_url_tail)
       and public.visual_upload_owner_in_firm(p_name, pl.user_id)
       and (pl.user_id in (select public.my_employer_scope())
            or (pl.job_id is not null and public.is_assigned_to_job(pl.job_id)))
  ) then return true; end if;

  -- ELE-2003: crew progress notes (paths only, so an exact match).
  if exists (
    select 1 from public.employer_job_comments c
      join public.employer_jobs j on j.id = c.job_id
     where c.photos @> array[p_name]
       and public.visual_upload_owner_in_firm(p_name, j.user_id)
       and (j.user_id in (select public.my_employer_scope())
            or public.is_assigned_to_job(c.job_id))
  ) then return true; end if;

  if exists (
    select 1 from public.briefings b
     where exists (select 1 from unnest(b.photo_evidence) p where p = p_name or right(p, length(v_url_tail)) = v_url_tail)
       and public.visual_upload_owner_in_firm(p_name, b.user_id)
       and (b.user_id in (select public.my_employer_scope())
            or (b.job_id is not null and public.is_assigned_to_job(b.job_id)))
  ) then return true; end if;

  if exists (
    select 1 from public.vehicle_checks vc
      join public.vehicles v on v.id = vc.vehicle_id
     where exists (select 1 from unnest(vc.defect_photos) p where p = p_name or right(p, length(v_url_tail)) = v_url_tail)
       and public.visual_upload_owner_in_firm(p_name, v.user_id)
       and v.user_id in (select public.my_employer_scope())
  ) then return true; end if;

  if exists (
    select 1 from public.vehicle_documents vd
      join public.vehicles v on v.id = vd.vehicle_id
     where (vd.file_url = p_name or right(vd.file_url, length(v_url_tail)) = v_url_tail)
       and public.visual_upload_owner_in_firm(p_name, v.user_id)
       and v.user_id in (select public.my_employer_scope())
  ) then return true; end if;

  if exists (
    select 1 from public.vehicle_services vs
      join public.vehicles v on v.id = vs.vehicle_id
     where (vs.invoice_url = p_name or right(vs.invoice_url, length(v_url_tail)) = v_url_tail)
       and public.visual_upload_owner_in_firm(p_name, v.user_id)
       and v.user_id in (select public.my_employer_scope())
  ) then return true; end if;

  return false;
end;
$function$;

comment on table public.employer_job_comments is
  '[EMPLOYER HUB → WORKER TOOLS] Job feed: comments and the crew''s progress notes (comment_type=''progress''), with photos (visual-uploads paths). Scope: job_id → employer_jobs. Used by: Job sheet, Progress logs "From the team", Worker Tools Progress notes + My Jobs. Rule: author_user_id/author_employee_id are stamped by trigger from auth.uid(); a worker may edit/delete their own progress note for 24h while still on the job.';
