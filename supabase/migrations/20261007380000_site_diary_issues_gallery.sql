-- ELE-1964 / ELE-1967 / ELE-1970 (7 Oct 2026)
--
-- One site diary per job, one Issues section with a punch list and variation
-- orders, one photo gallery over every source.
--
--  * progress_logs.created_by + shared_with_client, employer_job_comments.shared_with_client
--    (only the office can share an entry with the client; a guard trigger
--    stops a worker setting it on their own note).
--  * get_site_diary(job, since): office logs + the crew's progress notes in
--    one list, with who clocked in on the job that day.
--  * set_diary_entry_shared(kind, id, shared).
--  * variation_orders.job_issue_id: the issue a variation order came from.
--    raise_variation_order(issue, value, description) creates one; a
--    variation priced through create_signature_request(issue_id) is linked
--    by trigger; an approved order closes its issue with a note.
--  * get_photo_feed(job): job photos, snag/issue photos, diary photos (office
--    and crew) and task photos, each with its bucket + path and whether the
--    file is really in storage.
--  * get_job_sheet_counts / get_employer_hub_counts: Progress and Photos
--    tiles now count every source.
--  * trg_notify_snag routes the bell to the issue itself.
--
-- Every function: SECURITY DEFINER, search_path = public, EXECUTE revoked
-- from public/anon, granted to authenticated. Reads are firm-manager only
-- (job owner in my_employer_scope()).

-- ---------------------------------------------------------------- columns
alter table public.progress_logs
  add column if not exists created_by uuid default auth.uid(),
  add column if not exists shared_with_client boolean not null default false;

alter table public.employer_job_comments
  add column if not exists shared_with_client boolean not null default false;

alter table public.variation_orders
  add column if not exists job_issue_id uuid references public.job_issues(id) on delete set null;

create index if not exists variation_orders_job_issue_id_idx
  on public.variation_orders (job_issue_id) where job_issue_id is not null;
create index if not exists employer_job_comments_progress_idx
  on public.employer_job_comments (job_id, created_at desc) where comment_type = 'progress' and task_id is null;

comment on column public.progress_logs.created_by is
  '[EMPLOYER HUB] Who wrote this office log (auth uid). Shown as the author in the site diary (ELE-1964).';
comment on column public.progress_logs.shared_with_client is
  '[EMPLOYER HUB] Office chose to share this log with the client (portal, ELE-1837). Default off.';
comment on column public.employer_job_comments.shared_with_client is
  '[EMPLOYER HUB] Office chose to share this crew note with the client. Only the office can set it (guard trigger).';
comment on column public.variation_orders.job_issue_id is
  '[EMPLOYER HUB] The Variation issue this order was raised from (ELE-1967). Approval closes the issue.';

-- ------------------------------------------------- share guard (crew notes)
create or replace function public._job_comment_share_guard()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_office boolean;
begin
  if auth.uid() is null then return new; end if;
  if tg_op = 'UPDATE' and new.shared_with_client is not distinct from old.shared_with_client then
    return new;
  end if;
  if tg_op = 'INSERT' and not coalesce(new.shared_with_client, false) then
    return new;
  end if;
  select j.user_id in (select public.my_employer_scope()) into v_office
    from public.employer_jobs j where j.id = new.job_id;
  if not coalesce(v_office, false) then
    new.shared_with_client := case when tg_op = 'UPDATE' then old.shared_with_client else false end;
  end if;
  return new;
end;
$$;
revoke all on function public._job_comment_share_guard() from public, anon, authenticated;
comment on function public._job_comment_share_guard() is
  '[EMPLOYER HUB] Only the office can share a crew note with the client (ELE-1964).';

drop trigger if exists job_comment_share_guard on public.employer_job_comments;
create trigger job_comment_share_guard
  before insert or update on public.employer_job_comments
  for each row execute function public._job_comment_share_guard();

-- ------------------------------------------------------------- site diary
create or replace function public.get_site_diary(p_job_id uuid default null, p_since date default null)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_owners uuid[] := array(select public.my_employer_scope());
  v_jobs uuid[];
  v_entries jsonb;
  v_on_site jsonb;
begin
  if auth.uid() is null then
    raise exception 'Sign in first' using errcode = '42501';
  end if;

  select coalesce(array_agg(j.id), '{}') into v_jobs
    from public.employer_jobs j
   where j.user_id = any (v_owners)
     and (p_job_id is null or j.id = p_job_id);

  if p_job_id is not null and cardinality(v_jobs) = 0 then
    raise exception 'That job was not found' using errcode = '42501';
  end if;

  with e as (
    select
      'office'::text as kind,
      pl.id,
      pl.job_id,
      pl.date as entry_date,
      pl.created_at,
      coalesce(nullif(btrim(a.full_name), ''), nullif(btrim(pr.full_name), ''), 'Office') as author_name,
      'office'::text as author_role,
      null::uuid as author_employee_id,
      pl.work_completed as body,
      pl.work_planned,
      pl.materials_used,
      pl.issues_encountered,
      pl.delays,
      pl.notes,
      pl.weather,
      pl.workers_on_site,
      coalesce(pl.photos, '{}') as photos,
      coalesce(pl.signed_off, false) as signed_off,
      pl.signed_off_at,
      coalesce(pl.shared_with_client, false) as shared_with_client,
      null::timestamptz as edited_at
    from public.progress_logs pl
    join public.employer_jobs j on j.id = pl.job_id
    left join public.profiles pr on pr.id = pl.created_by
    left join public.employer_admins a
      on a.user_id = pl.created_by and a.employer_id = j.user_id and a.status = 'active'
   where pl.job_id = any (v_jobs)
     and (p_since is null or pl.date >= p_since)
    union all
    select
      'team',
      c.id,
      c.job_id,
      (c.created_at at time zone 'Europe/London')::date,
      c.created_at,
      coalesce(nullif(btrim(emp.name), ''), nullif(btrim(c.author_name), ''), 'Team member'),
      case when c.author_employee_id is null then 'office' else 'crew' end,
      c.author_employee_id,
      c.content,
      null, null, null, null, null, null, null,
      coalesce(c.photos, '{}'),
      false,
      null,
      coalesce(c.shared_with_client, false),
      c.edited_at
    from public.employer_job_comments c
    left join public.employer_employees emp on emp.id = c.author_employee_id
   where c.job_id = any (v_jobs)
     and c.comment_type = 'progress' and c.task_id is null
     and (p_since is null or (c.created_at at time zone 'Europe/London')::date >= p_since)
  ), lim as (
    select * from e order by entry_date desc, created_at desc limit 600
  )
  select coalesce(jsonb_agg(jsonb_build_object(
           'kind', l.kind,
           'id', l.id,
           'job_id', l.job_id,
           'job_title', j.title,
           'client', j.client,
           'entry_date', l.entry_date,
           'created_at', l.created_at,
           'author_name', l.author_name,
           'author_role', l.author_role,
           'author_employee_id', l.author_employee_id,
           'body', l.body,
           'work_planned', l.work_planned,
           'materials_used', l.materials_used,
           'issues_encountered', l.issues_encountered,
           'delays', l.delays,
           'notes', l.notes,
           'weather', l.weather,
           'workers_on_site', l.workers_on_site,
           'photos', to_jsonb(l.photos),
           'signed_off', l.signed_off,
           'signed_off_at', l.signed_off_at,
           'shared_with_client', l.shared_with_client,
           'edited_at', l.edited_at)
         order by l.entry_date desc, l.created_at desc), '[]'::jsonb)
    into v_entries
    from lim l
    join public.employer_jobs j on j.id = l.job_id;

  -- Who clocked in on each job, each day that has an entry.
  select coalesce(jsonb_agg(jsonb_build_object(
           'job_id', x.job_id, 'date', x.date, 'names', x.names, 'hours', x.hours)), '[]'::jsonb)
    into v_on_site
    from (
      select t.job_id, t.date,
             jsonb_agg(distinct btrim(emp.name)) filter (where btrim(coalesce(emp.name, '')) <> '') as names,
             round(sum(coalesce(t.total_hours, 0))::numeric, 1) as hours
        from public.employer_timesheets t
        join public.employer_employees emp on emp.id = t.employee_id
       where t.job_id = any (v_jobs)
         and lower(coalesce(t.status, '')) <> 'rejected'
         and (t.job_id, t.date) in (
               select (d->>'job_id')::uuid, (d->>'entry_date')::date
                 from jsonb_array_elements(v_entries) d)
       group by t.job_id, t.date
    ) x;

  return jsonb_build_object('entries', v_entries, 'on_site', v_on_site);
end;
$$;
revoke all on function public.get_site_diary(uuid, date) from public, anon;
grant execute on function public.get_site_diary(uuid, date) to authenticated;
comment on function public.get_site_diary(uuid, date) is
  '[EMPLOYER HUB] Site diary (ELE-1964): office progress_logs + crew progress notes (employer_job_comments) for the firm''s jobs, newest first, with who clocked in each day. Firm managers only.';

create or replace function public.set_diary_entry_shared(p_kind text, p_id uuid, p_shared boolean)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_job uuid;
begin
  if auth.uid() is null then
    raise exception 'Sign in first' using errcode = '42501';
  end if;
  if p_kind = 'office' then
    select pl.job_id into v_job from public.progress_logs pl
      join public.employer_jobs j on j.id = pl.job_id
     where pl.id = p_id and j.user_id in (select public.my_employer_scope());
    if v_job is null then raise exception 'That entry was not found' using errcode = '42501'; end if;
    update public.progress_logs set shared_with_client = coalesce(p_shared, false), updated_at = now()
     where id = p_id;
  elsif p_kind = 'team' then
    select c.job_id into v_job from public.employer_job_comments c
      join public.employer_jobs j on j.id = c.job_id
     where c.id = p_id and c.comment_type = 'progress'
       and j.user_id in (select public.my_employer_scope());
    if v_job is null then raise exception 'That entry was not found' using errcode = '42501'; end if;
    update public.employer_job_comments set shared_with_client = coalesce(p_shared, false)
     where id = p_id;
  else
    raise exception 'Unknown entry' using errcode = '22023';
  end if;
  return jsonb_build_object('success', true, 'shared', coalesce(p_shared, false));
end;
$$;
revoke all on function public.set_diary_entry_shared(text, uuid, boolean) from public, anon;
grant execute on function public.set_diary_entry_shared(text, uuid, boolean) to authenticated;
comment on function public.set_diary_entry_shared(text, uuid, boolean) is
  '[EMPLOYER HUB] Office shares (or un-shares) one site diary entry with the client (ELE-1964).';

-- Legacy portal reader: only entries the office chose to share.
create or replace function public.get_portal_progress_logs(p_token text)
returns table(id uuid, log_date date, work_completed text, work_planned text, issues_encountered text,
              weather text, workers_on_site integer, created_at timestamptz)
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_show_issues boolean;
begin
  select coalesce((permissions->>'showIssues')::boolean, false)
    into v_show_issues
    from client_portal_links
   where access_token = p_token and is_active = true;

  if v_show_issues is null then
    return;
  end if;

  return query
  select * from (
    select pl.id, pl.date, pl.work_completed, pl.work_planned,
           case when v_show_issues then pl.issues_encountered else null end,
           pl.weather, pl.workers_on_site, pl.created_at
      from progress_logs pl
      join client_portal_links cpl on cpl.job_id = pl.job_id
     where cpl.access_token = p_token and cpl.is_active = true and pl.shared_with_client
    union all
    select c.id, (c.created_at at time zone 'Europe/London')::date, c.content, null, null,
           null, null, c.created_at
      from employer_job_comments c
      join client_portal_links cpl on cpl.job_id = c.job_id
     where cpl.access_token = p_token and cpl.is_active = true
       and c.comment_type = 'progress' and c.task_id is null and c.shared_with_client
  ) x
  order by 2 desc, 8 desc
  limit 20;
end;
$$;

-- --------------------------------------------------------- variation orders
create or replace function public.raise_variation_order(p_issue_id uuid, p_value numeric, p_description text default null)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_issue public.job_issues%rowtype;
  v_firm uuid;
  v_desc text;
  v_vo public.variation_orders%rowtype;
begin
  if auth.uid() is null then
    raise exception 'Sign in first' using errcode = '42501';
  end if;
  select * into v_issue from public.job_issues where id = p_issue_id;
  if not found then raise exception 'That issue was not found' using errcode = '42501'; end if;
  select j.user_id into v_firm from public.employer_jobs j where j.id = v_issue.job_id;
  if v_firm is null or v_firm not in (select public.my_employer_scope()) then
    raise exception 'That issue was not found' using errcode = '42501';
  end if;
  if p_value is null or p_value = 0 or abs(p_value) > 10000000 then
    raise exception 'Enter the price change for this variation' using errcode = '22023';
  end if;

  select * into v_vo from public.variation_orders
   where job_issue_id = v_issue.id and coalesce(status, 'Pending') <> 'Rejected'
   order by created_at desc limit 1;
  if found then
    return jsonb_build_object('id', v_vo.id, 'existing', true, 'status', v_vo.status, 'value', v_vo.value,
      'reference', 'VO-' || upper(left(replace(v_vo.id::text, '-', ''), 6)));
  end if;

  v_desc := coalesce(nullif(btrim(coalesce(p_description, '')), ''),
                     nullif(btrim(concat_ws(E'\n\n', v_issue.title, v_issue.description)), ''));
  if v_desc is null then
    raise exception 'Describe the variation' using errcode = '22023';
  end if;

  insert into public.variation_orders (job_id, user_id, description, value, status, notes, job_issue_id)
  values (v_issue.job_id, v_firm, left(v_desc, 4000), round(p_value, 2), 'Pending',
          'From job issue: ' || coalesce(v_issue.title, ''), v_issue.id)
  returning * into v_vo;

  update public.job_issues set status = 'In Progress', updated_at = now()
   where id = v_issue.id and status = 'Open';

  return jsonb_build_object('id', v_vo.id, 'existing', false, 'status', v_vo.status, 'value', v_vo.value,
    'reference', 'VO-' || upper(left(replace(v_vo.id::text, '-', ''), 6)));
end;
$$;
revoke all on function public.raise_variation_order(uuid, numeric, text) from public, anon;
grant execute on function public.raise_variation_order(uuid, numeric, text) to authenticated;
comment on function public.raise_variation_order(uuid, numeric, text) is
  '[EMPLOYER HUB] Raise a variation order from a job issue (ELE-1967). Returns the existing live order if there is one. Firm managers only.';

-- A variation priced from an issue through create_signature_request gets its link.
create or replace function public._link_signed_variation_issue()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.document_type = 'Variation' and new.document_id is not null
     and nullif(new.document_refs->>'issue_id', '') is not null then
    update public.variation_orders vo
       set job_issue_id = (new.document_refs->>'issue_id')::uuid
     where vo.id = new.document_id and vo.job_issue_id is null
       and exists (select 1 from public.job_issues i
                    where i.id = (new.document_refs->>'issue_id')::uuid and i.job_id = vo.job_id);
  end if;
  return new;
exception when others then
  raise warning '[_link_signed_variation_issue] %', sqlerrm;
  return new;
end;
$$;
revoke all on function public._link_signed_variation_issue() from public, anon, authenticated;
comment on function public._link_signed_variation_issue() is
  '[EMPLOYER HUB] Links a variation order created by create_signature_request(issue_id) back to its job issue (ELE-1967).';

drop trigger if exists link_signed_variation_issue on public.signature_requests;
create trigger link_signed_variation_issue
  after insert on public.signature_requests
  for each row execute function public._link_signed_variation_issue();

-- An approved variation order closes the issue it came from.
create or replace function public._variation_order_closes_issue()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.job_issue_id is not null and new.status = 'Approved'
     and old.status is distinct from 'Approved' then
    update public.job_issues
       set status = 'Resolved',
           resolved_at = now(),
           resolved_by = coalesce(resolved_by, auth.uid()),
           resolution_notes = coalesce(nullif(btrim(resolution_notes), '') || E'\n\n', '')
             || 'Variation order VO-' || upper(left(replace(new.id::text, '-', ''), 6))
             || ' approved' || coalesce(' by ' || nullif(btrim(new.approved_by), ''), '')
             || ' (' || case when coalesce(new.value, 0) < 0 then '-' else '+' end
             || '£' || to_char(abs(coalesce(new.value, 0)), 'FM999,999,990.00') || ').',
           updated_at = now()
     where id = new.job_issue_id
       and lower(coalesce(status, '')) not in ('resolved', 'closed');
  end if;
  return new;
exception when others then
  raise warning '[_variation_order_closes_issue] %', sqlerrm;
  return new;
end;
$$;
revoke all on function public._variation_order_closes_issue() from public, anon, authenticated;
comment on function public._variation_order_closes_issue() is
  '[EMPLOYER HUB] When a variation order raised from an issue is approved, resolve that issue with a note (ELE-1967).';

drop trigger if exists variation_order_closes_issue on public.variation_orders;
create trigger variation_order_closes_issue
  after update of status on public.variation_orders
  for each row execute function public._variation_order_closes_issue();

-- ---------------------------------------------------------------- photos
create or replace function public.get_photo_feed(p_job_id uuid default null)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_owners uuid[] := array(select public.my_employer_scope());
  v_jobs uuid[];
  v_out jsonb;
begin
  if auth.uid() is null then
    raise exception 'Sign in first' using errcode = '42501';
  end if;

  select coalesce(array_agg(j.id), '{}') into v_jobs
    from public.employer_jobs j
   where j.user_id = any (v_owners)
     and (p_job_id is null or j.id = p_job_id);

  if p_job_id is not null and cardinality(v_jobs) = 0 then
    raise exception 'That job was not found' using errcode = '42501';
  end if;

  with src as (
    -- Office uploads
    select 'job'::text as source, ph.id::text || ':0' as key, ph.id as ref_id,
           'job-photos'::text as bucket,
           coalesce(nullif(ph.storage_path, ''), ph.filename) as path,
           ph.job_id, ph.created_at as taken_at,
           ph.notes as caption, ph.category,
           coalesce(nullif(btrim(emp.name), ''), 'Office') as author,
           ph.approved, ph.shared_with_client as shared,
           ph.location_lat as lat, ph.location_lng as lng, ph.location_address as address,
           null::text as ref_type
      from public.job_photos ph
      left join public.employer_employees emp on emp.id = ph.uploaded_by
     where ph.job_id = any (v_jobs)
    union all
    -- Snags, defects and other issues (crew and office)
    select case when i.issue_type in ('Snag', 'Defect') then 'snag' else 'issue' end,
           i.id::text || ':' || p.ord, i.id, 'visual-uploads', p.path,
           i.job_id, i.created_at, i.title, i.issue_type,
           coalesce(nullif(btrim(emp.name), ''), 'Office'),
           null, null, null, null, i.location, i.status
      from public.job_issues i
      cross join lateral unnest(coalesce(i.photos, '{}')) with ordinality as p(path, ord)
      left join public.employer_employees emp on emp.id = i.reported_by
     where i.job_id = any (v_jobs)
    union all
    -- Office daily logs
    select 'diary', pl.id::text || ':' || p.ord, pl.id, 'visual-uploads', p.path,
           pl.job_id, coalesce(pl.date::timestamptz + interval '12 hours', pl.created_at),
           left(pl.work_completed, 140), 'Office log',
           coalesce(nullif(btrim(pr.full_name), ''), 'Office'),
           null, pl.shared_with_client, null, null, null, 'office'
      from public.progress_logs pl
      cross join lateral unnest(coalesce(pl.photos, '{}')) with ordinality as p(path, ord)
      left join public.profiles pr on pr.id = pl.created_by
     where pl.job_id = any (v_jobs)
    union all
    -- The crew's progress notes
    select 'diary', c.id::text || ':' || p.ord, c.id, 'visual-uploads', p.path,
           c.job_id, c.created_at, left(c.content, 140), 'Team note',
           coalesce(nullif(btrim(emp.name), ''), nullif(btrim(c.author_name), ''), 'Team member'),
           null, c.shared_with_client, null, null, null, 'team'
      from public.employer_job_comments c
      cross join lateral unnest(coalesce(c.photos, '{}')) with ordinality as p(path, ord)
      left join public.employer_employees emp on emp.id = c.author_employee_id
     where c.job_id = any (v_jobs) and c.comment_type = 'progress' and c.task_id is null
    union all
    -- Task photos
    select 'task', t.id::text || ':' || p.ord, t.id, 'task-photos', p.path,
           t.job_id, coalesce(t.completed_at, t.updated_at, t.created_at), t.title, 'Task',
           coalesce(nullif(btrim(up.name), ''), nullif(btrim(emp.name), ''), 'Team member'),
           null, null, null, null, null, t.status
      from public.employer_job_tasks t
      cross join lateral jsonb_array_elements_text(
        case when jsonb_typeof(t.photos) = 'array' then t.photos else '[]'::jsonb end
      ) with ordinality as p(path, ord)
      left join public.employer_employees emp on emp.id = t.assignee_employee_id
      left join lateral (
        select e2.name from public.employer_employees e2
         where e2.employer_id = t.employer_id
           and e2.user_id::text = split_part(ltrim(p.path, '/'), '/', 1)
         limit 1) up on true
     where t.job_id = any (v_jobs)
  ), lim as (
    select * from src where nullif(btrim(coalesce(path, '')), '') is not null
     order by taken_at desc nulls last limit 2000
  )
  select coalesce(jsonb_agg(jsonb_build_object(
           'key', l.source || ':' || l.key,
           'source', l.source,
           'ref_id', l.ref_id,
           'ref_type', l.ref_type,
           'bucket', l.bucket,
           'path', l.path,
           'job_id', l.job_id,
           'job_title', j.title,
           'client', j.client,
           'taken_at', l.taken_at,
           'caption', l.caption,
           'category', l.category,
           'author', l.author,
           'approved', l.approved,
           'shared', l.shared,
           'lat', l.lat,
           'lng', l.lng,
           'address', l.address,
           -- A bare path with no object behind it is a broken photo. Legacy full
           -- URLs are checked by the browser instead.
           'missing', case
             when l.path ~* '^(https?:|data:|blob:)' then false
             else not exists (select 1 from storage.objects o
                               where o.bucket_id = l.bucket and o.name = ltrim(l.path, '/'))
           end)
         order by l.taken_at desc nulls last), '[]'::jsonb)
    into v_out
    from lim l
    join public.employer_jobs j on j.id = l.job_id;

  return v_out;
end;
$$;
revoke all on function public.get_photo_feed(uuid) from public, anon;
grant execute on function public.get_photo_feed(uuid) to authenticated;
comment on function public.get_photo_feed(uuid) is
  '[EMPLOYER HUB] Photo gallery feed (ELE-1970): job_photos + job_issues.photos + progress_logs.photos + crew progress-note photos + employer_job_tasks.photos for the firm''s jobs, with bucket/path and a missing flag (no storage object). Firm managers only.';

-- ------------------------------------------------- counts used by tiles
create or replace function public._job_photo_count(p_jobs uuid[], p_since timestamptz default null)
returns bigint
language sql
stable
security definer
set search_path = public
as $$
  select
    (select count(*) from job_photos ph
      where ph.job_id = any (p_jobs) and (p_since is null or ph.created_at >= p_since))
  + (select coalesce(sum(cardinality(coalesce(i.photos, '{}'))), 0) from job_issues i
      where i.job_id = any (p_jobs) and (p_since is null or i.created_at >= p_since))
  + (select coalesce(sum(cardinality(coalesce(pl.photos, '{}'))), 0) from progress_logs pl
      where pl.job_id = any (p_jobs) and (p_since is null or pl.created_at >= p_since))
  + (select coalesce(sum(cardinality(coalesce(c.photos, '{}'))), 0) from employer_job_comments c
      where c.job_id = any (p_jobs) and c.comment_type = 'progress' and c.task_id is null
        and (p_since is null or c.created_at >= p_since))
  + (select coalesce(sum(case when jsonb_typeof(t.photos) = 'array' then jsonb_array_length(t.photos) else 0 end), 0)
       from employer_job_tasks t
      where t.job_id = any (p_jobs) and (p_since is null or t.updated_at >= p_since))
$$;
revoke all on function public._job_photo_count(uuid[], timestamptz) from public, anon, authenticated;
comment on function public._job_photo_count(uuid[], timestamptz) is
  '[EMPLOYER HUB] Photos across every source for a set of jobs (ELE-1970). Internal: called by count RPCs.';

create or replace function public._job_diary_count(p_jobs uuid[], p_since date default null)
returns bigint
language sql
stable
security definer
set search_path = public
as $$
  select
    (select count(*) from progress_logs pl
      where pl.job_id = any (p_jobs) and (p_since is null or pl.date >= p_since))
  + (select count(*) from employer_job_comments c
      where c.job_id = any (p_jobs) and c.comment_type = 'progress' and c.task_id is null
        and (p_since is null or (c.created_at at time zone 'Europe/London')::date >= p_since))
$$;
revoke all on function public._job_diary_count(uuid[], date) from public, anon, authenticated;
comment on function public._job_diary_count(uuid[], date) is
  '[EMPLOYER HUB] Site diary entries (office logs + crew notes) for a set of jobs (ELE-1964). Internal.';

create or replace function public._job_diary_last(p_jobs uuid[])
returns date
language sql
stable
security definer
set search_path = public
as $$
  select greatest(
    (select max(pl.date) from progress_logs pl where pl.job_id = any (p_jobs)),
    (select max((c.created_at at time zone 'Europe/London')::date) from employer_job_comments c
      where c.job_id = any (p_jobs) and c.comment_type = 'progress' and c.task_id is null))
$$;
revoke all on function public._job_diary_last(uuid[]) from public, anon, authenticated;
comment on function public._job_diary_last(uuid[]) is
  '[EMPLOYER HUB] Date of the latest site diary entry for a set of jobs (ELE-1964). Internal.';

-- Job sheet tiles: patch the live definition in place (only these three keys).
do $mig$
declare
  v_def text := pg_get_functiondef('public.get_job_sheet_counts(uuid)'::regprocedure);
  v_old_photos text := $o$'photos', (select count(*) from job_photos where job_id = p_job_id),$o$;
  v_new_photos text := $n$'photos', public._job_photo_count(array[p_job_id]),$n$;
  v_old_logs text := $o$'progress_logs', (select count(*) from progress_logs where job_id = p_job_id),$o$;
  v_new_logs text := $n$'progress_logs', public._job_diary_count(array[p_job_id]),
    'variations', (select count(*) from variation_orders where job_id = p_job_id),$n$;
begin
  if position(v_old_photos in v_def) = 0 or position(v_old_logs in v_def) = 0 then
    raise exception 'get_job_sheet_counts: anchors not found';
  end if;
  v_def := replace(replace(v_def, v_old_photos, v_new_photos), v_old_logs, v_new_logs);
  execute v_def;
end
$mig$;

-- Jobs hub area cards.
do $mig$
declare
  v_def text := pg_get_functiondef('public.get_employer_hub_counts()'::regprocedure);
  v_old_7d text := $o$'progress_logs_7d', (
        select count(*) from progress_logs p
         where (p.job_id = any (v_jobs) or p.user_id = any (v_owners))
           and p.date > v_today - 7),$o$;
  v_new_7d text := $n$'progress_logs_7d', public._job_diary_count(v_jobs, v_today - 6),$n$;
  v_old_last text := $o$'last_progress_log', (
        select max(p.date) from progress_logs p
         where p.job_id = any (v_jobs) or p.user_id = any (v_owners)),$o$;
  v_new_last text := $n$'last_progress_log', public._job_diary_last(v_jobs),$n$;
  v_old_ph text := $o$'photos_total', (select count(*) from job_photos ph where ph.job_id = any (v_jobs)),
      'photos_7d', (select count(*) from job_photos ph where ph.job_id = any (v_jobs)
                      and ph.created_at >= now() - interval '7 days'),$o$;
  v_new_ph text := $n$'photos_total', public._job_photo_count(v_jobs),
      'photos_7d', public._job_photo_count(v_jobs, now() - interval '7 days'),$n$;
begin
  if position(v_old_7d in v_def) = 0 or position(v_old_last in v_def) = 0 or position(v_old_ph in v_def) = 0 then
    raise exception 'get_employer_hub_counts: anchors not found';
  end if;
  execute replace(replace(replace(v_def, v_old_7d, v_new_7d), v_old_last, v_new_last), v_old_ph, v_new_ph);
end
$mig$;

-- ------------------------------------------------ snag bell → the issue
create or replace function public.trg_notify_snag()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_worker uuid;
  v_name text;
  v_title text;
  v_what text;
begin
  if new.reported_by is not null then
    select e.user_id, e.name into v_worker, v_name
      from employer_employees e where e.id = new.reported_by;

    -- Only when reported by a linked worker who isn't the employer themselves
    if v_worker is not null and v_worker = auth.uid() and v_worker is distinct from new.user_id then
      select j.title into v_title from employer_jobs j where j.id = new.job_id;
      v_what := case new.issue_type
                  when 'Variation' then 'Variation raised'
                  when 'Defect' then 'Defect reported'
                  when 'Snag' then 'Snag reported'
                  else 'Issue reported' end;
      perform notify_employer_bell(
        new.user_id, 'snag_reported', v_what,
        coalesce(v_name, 'A team member') || ' reported: '
          || left(coalesce(nullif(btrim(new.title), ''), nullif(btrim(new.description), ''), 'an issue'), 80)
          || coalesce(' (' || v_title || ')', ''),
        jsonb_build_object('issue_id', new.id, 'job_id', new.job_id,
          'route', '/employer?section=issues&issue=' || new.id
                   || coalesce('&job=' || new.job_id, ''))
      );
    end if;
  end if;
  return new;
exception when others then
  raise warning '[trg_notify_snag] %', sqlerrm;
  return new;
end;
$$;

-- ------------------------------------------------------------- labels
comment on table public.progress_logs is
  '[EMPLOYER HUB] Office daily site logs. Scope: user_id = the owning account (for a firm: the owner''s profiles.id); firm managers reach it via my_employer_scope(); job_id → employer_jobs; created_by = author. Used by: Employer Hub Site diary (get_site_diary, merged with crew notes, ELE-1964). Rule: shared_with_client is set by the office only.';
comment on table public.job_issues is
  '[EMPLOYER HUB → WORKER TOOLS] Snags, defects, variations, RFIs, delays raised on a job. Scope: user_id = the owning account (for a firm: the owner''s profiles.id); firm managers reach it via my_employer_scope(); job_id → employer_jobs. Used by: Employer Hub Issues (one section, type tabs, per-job punch list; Quality & Snags redirects here, ELE-1967), Worker Tools Reports. Rule: Variation issues raise variation_orders (job_issue_id).';
comment on table public.variation_orders is
  '[EMPLOYER HUB] Variation orders on a job. Scope: user_id = the owning account (for a firm: the owner''s profiles.id); firm managers reach it via my_employer_scope(); job_id → employer_jobs; job_issue_id → the Variation issue it came from. Used by: Job financials, Issues. Rule: raised from a Variation issue (raise_variation_order or create_signature_request issue_id); approval resolves the issue.';
comment on table public.job_photos is
  '[EMPLOYER HUB] Photos the office uploads against a job (bucket job-photos). Scope: user_id = the owning account (for a firm: the owner''s profiles.id); firm managers reach it via my_employer_scope(); job_id → employer_jobs. Used by: Employer Hub Photo gallery (get_photo_feed unions crew snag/diary/task photos too, ELE-1970). Rule: never insert a row without a stored file.';
comment on table public.employer_job_comments is
  '[EMPLOYER HUB → WORKER TOOLS] Job feed: comments and the crew''s progress notes (comment_type=''progress''), with photos (visual-uploads paths). Scope: job_id → employer_jobs. Used by: Job sheet, Site diary (get_site_diary), Worker Tools Progress notes + My Jobs. Rule: author_user_id/author_employee_id are stamped by trigger from auth.uid(); a worker may edit/delete their own progress note for 24h while still on the job; only the office sets shared_with_client.';
