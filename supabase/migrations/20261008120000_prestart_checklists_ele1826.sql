-- ELE-1826 — Pre-start checks and firm checklists.
--
-- The office builds checklist templates (typed items: tick / photo / signature /
-- number / yes-no / RAMS, each "required" or not, in a "before start" or an
-- "on completion" group). A template is attached to a job by hand, or
-- automatically when a job gets one of its labels / when any new job is made.
-- Attaching SNAPSHOTS the items onto the job, so editing a template later never
-- changes a job that is already under way.
--
-- The crew fill them in on the job page. Every answer is stamped with who,
-- when and where (the phone's one fix). "Before start" items are done by each
-- person on the crew; "On completion" items are done once for the job.
-- A worker clocking THEMSELVES in to a job is refused by the database while any
-- required before-start item is outstanding, including a required "RAMS signed"
-- item, which reads employer_job_pack_acknowledgements (any pack sent to them
-- for this job still unsigned). The office clocking someone in is not gated.
--
-- Supersedes employer_job_checklist_items (0 rows, editor never mounted).

-- ── Tables ────────────────────────────────────────────────────────────────
create table if not exists public.employer_checklist_templates (
  id uuid primary key default gen_random_uuid(),
  employer_id uuid,                       -- the firm (owner profiles.id); NULL = Elec-Mate library template
  name text not null check (char_length(btrim(name)) between 1 and 120),
  description text check (description is null or char_length(description) <= 600),
  job_type text check (job_type is null or char_length(job_type) <= 80),
  items jsonb not null default '[]'::jsonb check (jsonb_typeof(items) = 'array'),
  auto_all_jobs boolean not null default false,
  auto_label_ids uuid[] not null default '{}',
  library_key text unique,
  source_template_id uuid references public.employer_checklist_templates(id) on delete set null,
  is_archived boolean not null default false,
  created_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists employer_checklist_templates_employer_idx
  on public.employer_checklist_templates (employer_id) where not is_archived;

comment on table public.employer_checklist_templates is
  '[EMPLOYER HUB] Checklist templates the office builds (ELE-1826): typed items (tick/photo/signature/number/yes_no/rams) with required flags in before/after groups. Scope: employer_id = the firm (owner profiles.id), managers via my_employer_scope(); employer_id NULL = the Elec-Mate library (library_key) every firm can copy. Used by: Safety → Checklists. Rule: written ONLY via save_checklist_template / archive_checklist_template / copy_library_checklist_template; auto_all_jobs / auto_label_ids attach it to new jobs / labelled jobs.';

create table if not exists public.employer_job_checklists (
  id uuid primary key default gen_random_uuid(),
  employer_id uuid not null,
  job_id uuid not null references public.employer_jobs(id) on delete cascade,
  template_id uuid references public.employer_checklist_templates(id) on delete set null,
  name text not null,
  items jsonb not null check (jsonb_typeof(items) = 'array'),
  attached_via text not null default 'manual' check (attached_via in ('manual', 'label', 'all_jobs')),
  attached_by uuid,
  created_at timestamptz not null default now()
);
create unique index if not exists employer_job_checklists_job_template_uidx
  on public.employer_job_checklists (job_id, template_id);
create index if not exists employer_job_checklists_employer_idx on public.employer_job_checklists (employer_id);

comment on table public.employer_job_checklists is
  '[EMPLOYER HUB → WORKER TOOLS] A checklist attached to one job (ELE-1826): a SNAPSHOT of the template items at attach time. Scope: employer_id = the firm; job_id → employer_jobs; crew read via is_assigned_to_job. Used by: Safety → Checklists, Worker Tools My Jobs (first thing on the job page), the clock-in gate. Rule: written only via attach_checklist_to_job / detach_job_checklist and the auto-attach triggers on employer_jobs / employer_job_label_assignments.';

create table if not exists public.employer_job_checklist_responses (
  id uuid primary key default gen_random_uuid(),
  job_checklist_id uuid not null references public.employer_job_checklists(id) on delete cascade,
  employer_id uuid not null,
  job_id uuid not null references public.employer_jobs(id) on delete cascade,
  item_key text not null,
  -- before-start items: the person this answer is for (each crew member does
  -- their own); on-completion items: NULL (done once for the job)
  subject_employee_id uuid references public.employer_employees(id) on delete cascade,
  employee_id uuid references public.employer_employees(id) on delete set null,
  user_id uuid not null,
  done_by_name text,
  satisfied boolean not null,
  value_bool boolean,
  value_number numeric,
  value_text text,
  photos text[] not null default '{}',
  signature_data text check (signature_data is null or char_length(signature_data) <= 400000),
  signer_name text,
  note text check (note is null or char_length(note) <= 1000),
  lat numeric,
  lng numeric,
  accuracy_m numeric,
  location_status text check (location_status is null or location_status in ('captured', 'denied', 'unavailable')),
  completed_at timestamptz not null default now(),
  countersigned_by uuid,
  countersigned_by_name text,
  countersigned_at timestamptz,
  countersign_signature text check (countersign_signature is null or char_length(countersign_signature) <= 400000)
);
create unique index if not exists employer_job_checklist_responses_uidx
  on public.employer_job_checklist_responses (job_checklist_id, item_key, subject_employee_id) nulls not distinct;
create index if not exists employer_job_checklist_responses_job_idx on public.employer_job_checklist_responses (job_id);

comment on table public.employer_job_checklist_responses is
  '[EMPLOYER HUB → WORKER TOOLS] One answer to one checklist item (ELE-1826), stamped with who (user_id/employee_id), when (completed_at) and where (lat/lng/accuracy or location_status). Scope: employer_id = the firm; job_id → employer_jobs. Used by: Worker Tools My Jobs, Safety → Checklists, the per-job checks PDF, the clock-in gate. Rule: written ONLY via record_my_checklist_item / clear_my_checklist_item / countersign_checklist_item; subject_employee_id is the crew member for before-start items, NULL for on-completion items. Photos are visual-uploads paths (read via can_read_checklist_photo).';

alter table public.employer_checklist_templates enable row level security;
alter table public.employer_job_checklists enable row level security;
alter table public.employer_job_checklist_responses enable row level security;

drop policy if exists "Firm and library templates readable" on public.employer_checklist_templates;
create policy "Firm and library templates readable" on public.employer_checklist_templates
  for select to authenticated
  using (employer_id is null or employer_id in (select public.my_employer_scope()));

drop policy if exists "Firm or crew read job checklists" on public.employer_job_checklists;
create policy "Firm or crew read job checklists" on public.employer_job_checklists
  for select to authenticated
  using (employer_id in (select public.my_employer_scope()) or public.is_assigned_to_job(job_id));

drop policy if exists "Firm or author read checklist answers" on public.employer_job_checklist_responses;
create policy "Firm or author read checklist answers" on public.employer_job_checklist_responses
  for select to authenticated
  using (employer_id in (select public.my_employer_scope()) or user_id = auth.uid());

revoke all on public.employer_checklist_templates, public.employer_job_checklists,
  public.employer_job_checklist_responses from anon, public;
grant select on public.employer_checklist_templates, public.employer_job_checklists,
  public.employer_job_checklist_responses to authenticated;

insert into public.notification_types (type, category, push, importance) values
  ('checklist_assigned', 'tasks_projects', true, 1),
  ('checklist_complete', 'tasks_projects', true, 1)
on conflict (type) do nothing;

-- ── Helpers ───────────────────────────────────────────────────────────────

-- Validates and normalises a template's items. Every item gets a stable key.
create or replace function public._normalise_checklist_items(p_items jsonb)
returns jsonb
language plpgsql
volatile
set search_path to 'public'
as $$
declare
  v_out jsonb := '[]'::jsonb;
  v_item jsonb;
  v_key text;
  v_keys text[] := '{}';
  v_type text;
  v_phase text;
  v_label text;
  v_n int := 0;
begin
  if p_items is null or jsonb_typeof(p_items) <> 'array' then
    raise exception 'Items must be a list';
  end if;
  if jsonb_array_length(p_items) = 0 then
    raise exception 'Add at least one item';
  end if;
  if jsonb_array_length(p_items) > 60 then
    raise exception 'A checklist can have at most 60 items';
  end if;
  for v_item in select * from jsonb_array_elements(p_items) loop
    v_n := v_n + 1;
    v_label := btrim(coalesce(v_item->>'label', ''));
    if v_label = '' then raise exception 'Item % has no wording', v_n; end if;
    if char_length(v_label) > 200 then raise exception 'Item % is too long (200 characters max)', v_n; end if;
    v_type := coalesce(v_item->>'type', 'tick');
    if v_type not in ('tick', 'photo', 'signature', 'number', 'yes_no', 'rams') then
      raise exception 'Item % has an unknown type (%)', v_n, v_type;
    end if;
    v_phase := coalesce(v_item->>'phase', 'before');
    if v_phase not in ('before', 'after') then raise exception 'Item % must be before start or on completion', v_n; end if;
    if v_type = 'rams' then v_phase := 'before'; end if;
    v_key := nullif(btrim(coalesce(v_item->>'key', '')), '');
    if v_key is null or v_key = any (v_keys) or char_length(v_key) > 40 then
      v_key := 'i' || substr(md5(random()::text || clock_timestamp()::text || v_n), 1, 10);
    end if;
    v_keys := v_keys || v_key;
    v_out := v_out || jsonb_build_array(jsonb_strip_nulls(jsonb_build_object(
      'key', v_key,
      'label', v_label,
      'type', v_type,
      'phase', v_phase,
      'required', coalesce((v_item->>'required')::boolean, true),
      'hint', nullif(left(btrim(coalesce(v_item->>'hint', '')), 300), ''),
      'unit', case when v_type = 'number' then nullif(left(btrim(coalesce(v_item->>'unit', '')), 20), '') end,
      'signer', case when v_type = 'signature'
                     then case when v_item->>'signer' = 'customer' then 'customer' else 'worker' end end,
      'countersign', case when coalesce((v_item->>'countersign')::boolean, false) and v_type <> 'rams' then true end
    )));
  end loop;
  return v_out;
end;
$$;
revoke all on function public._normalise_checklist_items(jsonb) from public, anon;

-- The RAMS packs sent to this person for this job that they have not signed.
create or replace function public._unsigned_job_packs(p_job uuid, p_employee uuid)
returns text[]
language sql
stable
security definer
set search_path to 'public'
as $$
  select coalesce(array_agg(coalesce(nullif(p.title, ''), 'RAMS') order by p.created_at), '{}')
    from public.employer_job_pack_acknowledgements a
    join public.employer_job_packs p on p.id = a.job_pack_id
   where p.job_id = p_job and a.employee_id = p_employee and a.acknowledged_at is null
     and coalesce(p.status, '') <> 'Draft';  -- a pack still in Draft has not been sent to the crew
$$;
revoke all on function public._unsigned_job_packs(uuid, uuid) from public, anon, authenticated;

-- Required before-start items this person still has to do on this job (labels).
create or replace function public._prestart_outstanding(p_job uuid, p_employee uuid)
returns text[]
language plpgsql
stable
security definer
set search_path to 'public'
as $$
declare
  v_out text[] := '{}';
  r record;
  v_unsigned text[];
begin
  for r in
    select c.id as cid, it.value as item
      from public.employer_job_checklists c
      cross join lateral jsonb_array_elements(c.items) with ordinality as it(value, ord)
     where c.job_id = p_job
       and it.value->>'phase' = 'before'
       and coalesce((it.value->>'required')::boolean, true)
     order by c.created_at, it.ord
  loop
    if r.item->>'type' = 'rams' then
      v_unsigned := public._unsigned_job_packs(p_job, p_employee);
      if cardinality(v_unsigned) > 0 then
        v_out := v_out || ('Sign the RAMS: ' || array_to_string(v_unsigned, ', '));
      end if;
    elsif not exists (
      select 1 from public.employer_job_checklist_responses x
       where x.job_checklist_id = r.cid and x.item_key = r.item->>'key'
         and x.subject_employee_id = p_employee and x.satisfied
    ) then
      v_out := v_out || (r.item->>'label');
    end if;
  end loop;
  return v_out;
end;
$$;
revoke all on function public._prestart_outstanding(uuid, uuid) from public, anon, authenticated;

-- Required on-completion items not yet done for the job (labels).
create or replace function public._completion_outstanding(p_job uuid)
returns text[]
language sql
stable
security definer
set search_path to 'public'
as $$
  select coalesce(array_agg(it.value->>'label' order by c.created_at, it.ord), '{}')
    from public.employer_job_checklists c
    cross join lateral jsonb_array_elements(c.items) with ordinality as it(value, ord)
   where c.job_id = p_job
     and it.value->>'phase' = 'after'
     and coalesce((it.value->>'required')::boolean, true)
     and not exists (
       select 1 from public.employer_job_checklist_responses x
        where x.job_checklist_id = c.id and x.item_key = it.value->>'key'
          and x.subject_employee_id is null and x.satisfied);
$$;
revoke all on function public._completion_outstanding(uuid) from public, anon, authenticated;

-- Attach (snapshot) one template to one job. Idempotent per (job, template).
create or replace function public._attach_checklist(p_job uuid, p_template uuid, p_via text, p_by uuid)
returns uuid
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_tpl public.employer_checklist_templates;
  v_job public.employer_jobs;
  v_id uuid;
  r record;
begin
  select * into v_tpl from public.employer_checklist_templates where id = p_template;
  select * into v_job from public.employer_jobs where id = p_job;
  if v_tpl.id is null or v_job.id is null then return null; end if;

  insert into public.employer_job_checklists (employer_id, job_id, template_id, name, items, attached_via, attached_by)
  values (v_job.user_id, p_job, p_template, v_tpl.name, v_tpl.items, p_via, p_by)
  on conflict (job_id, template_id) do nothing
  returning id into v_id;

  if v_id is not null then
    -- Tell the crew already on the job there are checks to do before they start.
    for r in
      select distinct e.user_id
        from public.employer_job_assignments a
        join public.employer_employees e on e.id = a.employee_id
       where a.job_id = p_job and e.user_id is not null and e.status ilike 'active'
         and coalesce(lower(a.status), 'active') not in ('completed', 'cancelled', 'removed', 'ended')
         and e.user_id is distinct from p_by
    loop
      perform public.worker_notify(
        r.user_id, 'checklist_assigned', 'Checks to do on ' || coalesce(v_job.title, 'a job'),
        v_tpl.name || '. Do the before-start checks on the job page before you clock in.',
        jsonb_build_object('route', '/electrician/worker-tools/jobs?job=' || p_job, 'job_id', p_job));
    end loop;
  end if;
  return v_id;
end;
$$;
revoke all on function public._attach_checklist(uuid, uuid, text, uuid) from public, anon, authenticated;

-- ── Office RPCs ───────────────────────────────────────────────────────────

create or replace function public.save_checklist_template(
  p_id uuid,
  p_employer uuid,
  p_name text,
  p_description text,
  p_job_type text,
  p_items jsonb,
  p_auto_all_jobs boolean default false,
  p_auto_label_ids uuid[] default '{}'
)
returns uuid
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_items jsonb;
  v_firm uuid;
  v_id uuid;
begin
  if auth.uid() is null then raise exception 'Not signed in'; end if;
  if p_id is not null then
    select employer_id into v_firm from public.employer_checklist_templates where id = p_id;
    if v_firm is null or v_firm not in (select public.my_employer_scope()) then
      raise exception 'Template not found';
    end if;
  else
    v_firm := coalesce(p_employer, auth.uid());
    if v_firm not in (select public.my_employer_scope()) then
      raise exception 'You can''t add templates for this firm';
    end if;
  end if;
  if btrim(coalesce(p_name, '')) = '' then raise exception 'Give the checklist a name'; end if;
  v_items := public._normalise_checklist_items(p_items);

  -- Only this firm's own labels.
  p_auto_label_ids := coalesce((
    select array_agg(l.id) from public.employer_job_labels l
     where l.id = any (coalesce(p_auto_label_ids, '{}')) and l.employer_id = v_firm), '{}');

  if p_id is null then
    insert into public.employer_checklist_templates
      (employer_id, name, description, job_type, items, auto_all_jobs, auto_label_ids, created_by)
    values (v_firm, btrim(p_name), nullif(btrim(coalesce(p_description, '')), ''),
            nullif(btrim(coalesce(p_job_type, '')), ''), v_items,
            coalesce(p_auto_all_jobs, false), p_auto_label_ids, auth.uid())
    returning id into v_id;
  else
    update public.employer_checklist_templates
       set name = btrim(p_name),
           description = nullif(btrim(coalesce(p_description, '')), ''),
           job_type = nullif(btrim(coalesce(p_job_type, '')), ''),
           items = v_items,
           auto_all_jobs = coalesce(p_auto_all_jobs, false),
           auto_label_ids = p_auto_label_ids,
           is_archived = false,
           updated_at = now()
     where id = p_id
    returning id into v_id;
  end if;
  return v_id;
end;
$$;

create or replace function public.archive_checklist_template(p_id uuid)
returns void
language plpgsql
security definer
set search_path to 'public'
as $$
begin
  update public.employer_checklist_templates
     set is_archived = true, auto_all_jobs = false, auto_label_ids = '{}', updated_at = now()
   where id = p_id and employer_id is not null and employer_id in (select public.my_employer_scope());
  if not found then raise exception 'Template not found'; end if;
end;
$$;

create or replace function public.copy_library_checklist_template(p_library_id uuid, p_employer uuid default null)
returns uuid
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_firm uuid := coalesce(p_employer, auth.uid());
  v_tpl public.employer_checklist_templates;
  v_id uuid;
begin
  if auth.uid() is null or v_firm not in (select public.my_employer_scope()) then
    raise exception 'You can''t add templates for this firm';
  end if;
  select * into v_tpl from public.employer_checklist_templates where id = p_library_id and employer_id is null;
  if v_tpl.id is null then raise exception 'Library template not found'; end if;
  select id into v_id from public.employer_checklist_templates
   where employer_id = v_firm and source_template_id = p_library_id and not is_archived limit 1;
  if v_id is not null then return v_id; end if;
  insert into public.employer_checklist_templates
    (employer_id, name, description, job_type, items, source_template_id, created_by)
  values (v_firm, v_tpl.name, v_tpl.description, v_tpl.job_type, v_tpl.items, v_tpl.id, auth.uid())
  returning id into v_id;
  return v_id;
end;
$$;

create or replace function public.attach_checklist_to_job(p_job uuid, p_template uuid)
returns uuid
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_firm uuid;
  v_tfirm uuid;
  v_id uuid;
begin
  select user_id into v_firm from public.employer_jobs where id = p_job;
  if v_firm is null or v_firm not in (select public.my_employer_scope()) then
    raise exception 'Job not found';
  end if;
  select employer_id into v_tfirm from public.employer_checklist_templates
   where id = p_template and not is_archived;
  if v_tfirm is distinct from v_firm then raise exception 'Template not found'; end if;
  v_id := public._attach_checklist(p_job, p_template, 'manual', auth.uid());
  if v_id is null then
    select id into v_id from public.employer_job_checklists where job_id = p_job and template_id = p_template;
  end if;
  return v_id;
end;
$$;

create or replace function public.detach_job_checklist(p_job_checklist uuid)
returns void
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_firm uuid;
begin
  select employer_id into v_firm from public.employer_job_checklists where id = p_job_checklist;
  if v_firm is null or v_firm not in (select public.my_employer_scope()) then
    raise exception 'Checklist not found';
  end if;
  if exists (select 1 from public.employer_job_checklist_responses where job_checklist_id = p_job_checklist) then
    raise exception 'The crew have already answered this checklist, so it stays on the job as evidence';
  end if;
  delete from public.employer_job_checklists where id = p_job_checklist;
end;
$$;

-- ── Shared read: one job's checks (office sees all; crew see their own) ───
create or replace function public.get_job_checklist_detail(p_job uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $$
declare
  v_job public.employer_jobs;
  v_office boolean;
  v_me uuid;
  v_me_name text;
  v_me_apprentice boolean := false;
  v_can_countersign boolean := false;
begin
  select * into v_job from public.employer_jobs where id = p_job;
  if v_job.id is null then raise exception 'Job not found'; end if;
  v_office := v_job.user_id in (select public.my_employer_scope());
  if not v_office and not public.is_assigned_to_job(p_job) then
    raise exception 'Job not found';
  end if;

  select e.id, e.name,
         (coalesce(e.team_role, '') ilike '%apprentice%' or coalesce(e.role, '') ilike '%apprentice%')
    into v_me, v_me_name, v_me_apprentice
    from public.employer_employees e
   where e.user_id = auth.uid() and e.employer_id = v_job.user_id and e.status ilike 'active'
   limit 1;
  v_can_countersign := v_office or (v_me is not null and not coalesce(v_me_apprentice, false)
                                    and public.is_assigned_to_job(p_job));

  return jsonb_build_object(
    'job', jsonb_build_object('id', v_job.id, 'title', v_job.title, 'location', v_job.location,
                              'client', v_job.client, 'status', v_job.status, 'employer_id', v_job.user_id),
    'is_office', v_office,
    'me', case when v_me is null then null else jsonb_build_object(
            'employee_id', v_me, 'name', v_me_name, 'is_apprentice', coalesce(v_me_apprentice, false),
            'outstanding', to_jsonb(public._prestart_outstanding(p_job, v_me)),
            'unsigned_packs', to_jsonb(public._unsigned_job_packs(p_job, v_me))) end,
    'can_countersign', v_can_countersign,
    'completion_outstanding', to_jsonb(public._completion_outstanding(p_job)),
    'checklists', coalesce((
      select jsonb_agg(jsonb_build_object('id', c.id, 'name', c.name, 'template_id', c.template_id,
                                          'attached_via', c.attached_via, 'created_at', c.created_at,
                                          'items', c.items) order by c.created_at)
        from public.employer_job_checklists c where c.job_id = p_job), '[]'::jsonb),
    'crew', case when v_office then coalesce((
      select jsonb_agg(jsonb_build_object(
               'employee_id', e.id, 'name', e.name, 'team_role', coalesce(e.team_role, e.role),
               'is_apprentice', (coalesce(e.team_role, '') ilike '%apprentice%' or coalesce(e.role, '') ilike '%apprentice%'),
               'outstanding', to_jsonb(public._prestart_outstanding(p_job, e.id)),
               'unsigned_packs', to_jsonb(public._unsigned_job_packs(p_job, e.id)),
               'signed_packs', coalesce((
                  select jsonb_agg(jsonb_build_object('title', p.title, 'at', a2.acknowledged_at) order by a2.acknowledged_at)
                    from public.employer_job_pack_acknowledgements a2
                    join public.employer_job_packs p on p.id = a2.job_pack_id
                   where p.job_id = p_job and a2.employee_id = e.id and a2.acknowledged_at is not null), '[]'::jsonb))
             order by e.name)
        from (select distinct a.employee_id from public.employer_job_assignments a
               where a.job_id = p_job
                 and coalesce(lower(a.status), 'active') not in ('cancelled', 'removed')) aa
        join public.employer_employees e on e.id = aa.employee_id), '[]'::jsonb)
      else '[]'::jsonb end,
    'responses', coalesce((
      select jsonb_agg(jsonb_build_object(
               'id', r.id, 'job_checklist_id', r.job_checklist_id, 'item_key', r.item_key,
               'subject_employee_id', r.subject_employee_id, 'employee_id', r.employee_id,
               'mine', r.user_id = auth.uid(),
               'done_by_name', r.done_by_name, 'satisfied', r.satisfied,
               'value_bool', r.value_bool, 'value_number', r.value_number, 'value_text', r.value_text,
               'photos', to_jsonb(r.photos), 'signature_data', r.signature_data, 'signer_name', r.signer_name,
               'note', r.note, 'lat', r.lat, 'lng', r.lng, 'accuracy_m', r.accuracy_m,
               'location_status', r.location_status, 'completed_at', r.completed_at,
               'countersigned_by_name', r.countersigned_by_name, 'countersigned_at', r.countersigned_at,
               'countersign_signature', r.countersign_signature,
               'needs_countersign', exists (
                  select 1 from public.employer_job_checklists c2
                   cross join lateral jsonb_array_elements(c2.items) as it(value)
                   join public.employer_employees ee on ee.id = r.employee_id
                  where c2.id = r.job_checklist_id and it.value->>'key' = r.item_key
                    and coalesce((it.value->>'countersign')::boolean, false)
                    and (coalesce(ee.team_role, '') ilike '%apprentice%' or coalesce(ee.role, '') ilike '%apprentice%')))
             order by r.completed_at)
        from public.employer_job_checklist_responses r
       where r.job_id = p_job
         and (v_office
              or r.subject_employee_id is null
              or r.subject_employee_id = v_me
              or (v_can_countersign and r.countersigned_at is null))), '[]'::jsonb)
  );
end;
$$;

-- ── Office overview: checks across jobs ───────────────────────────────────
create or replace function public.get_firm_checklist_overview(p_employer uuid default null, p_include_closed boolean default false)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $$
declare
  v_firm uuid := coalesce(p_employer, auth.uid());
begin
  if auth.uid() is null or v_firm not in (select public.my_employer_scope()) then
    raise exception 'Not allowed';
  end if;
  return coalesce((
    select jsonb_agg(row_to_json(t)::jsonb order by t.open_count desc, t.start_date nulls last, t.title)
      from (
        select j.id as job_id, j.title, j.location, j.client, j.status, j.start_date,
               (select count(*) from public.employer_job_checklists c where c.job_id = j.id) as checklist_count,
               (select jsonb_agg(c.name order by c.created_at) from public.employer_job_checklists c where c.job_id = j.id) as checklist_names,
               to_jsonb(public._completion_outstanding(j.id)) as completion_outstanding,
               coalesce((
                 select jsonb_agg(jsonb_build_object('employee_id', e.id, 'name', e.name,
                                                     'outstanding', to_jsonb(public._prestart_outstanding(j.id, e.id)))
                                  order by e.name)
                   from (select distinct a.employee_id from public.employer_job_assignments a
                          where a.job_id = j.id
                            and coalesce(lower(a.status), 'active') not in ('cancelled', 'removed')) aa
                   join public.employer_employees e on e.id = aa.employee_id), '[]'::jsonb) as crew,
               (select count(*) from public.employer_job_checklist_responses r
                 join public.employer_employees ee on ee.id = r.employee_id
                 join public.employer_job_checklists c2 on c2.id = r.job_checklist_id
                 cross join lateral jsonb_array_elements(c2.items) as it(value)
                where r.job_id = j.id and r.countersigned_at is null and it.value->>'key' = r.item_key
                  and coalesce((it.value->>'countersign')::boolean, false)
                  and (coalesce(ee.team_role, '') ilike '%apprentice%' or coalesce(ee.role, '') ilike '%apprentice%')) as awaiting_countersign,
               (select max(r.completed_at) from public.employer_job_checklist_responses r where r.job_id = j.id) as last_activity,
               (cardinality(public._completion_outstanding(j.id))
                 + coalesce((select sum(cardinality(public._prestart_outstanding(j.id, a.employee_id)))
                               from (select distinct employee_id from public.employer_job_assignments
                                      where job_id = j.id and coalesce(lower(status), 'active') not in ('cancelled', 'removed')) a), 0)) as open_count
          from public.employer_jobs j
         where j.user_id = v_firm
           and coalesce(j.is_template, false) = false
           and exists (select 1 from public.employer_job_checklists c where c.job_id = j.id)
           and (p_include_closed or (j.archived_at is null and coalesce(j.status, '') not in ('Completed', 'Cancelled')))
      ) t), '[]'::jsonb);
end;
$$;

-- ── Crew RPCs ─────────────────────────────────────────────────────────────
create or replace function public.record_my_checklist_item(
  p_job_checklist uuid,
  p_item_key text,
  p_value jsonb default '{}'::jsonb,
  p_photos text[] default '{}',
  p_signature text default null,
  p_signer_name text default null,
  p_note text default null,
  p_lat numeric default null,
  p_lng numeric default null,
  p_accuracy numeric default null,
  p_location_status text default null
)
returns uuid
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_c public.employer_job_checklists;
  v_item jsonb;
  v_type text;
  v_me uuid;
  v_me_name text;
  v_subject uuid;
  v_satisfied boolean := true;
  v_bool boolean;
  v_num numeric;
  v_text text;
  v_id uuid;
  v_before_open int;
  v_job_title text;
  v_photo text;
begin
  if auth.uid() is null then raise exception 'Not signed in'; end if;
  select * into v_c from public.employer_job_checklists where id = p_job_checklist;
  if v_c.id is null or not public.is_assigned_to_job(v_c.job_id) then
    raise exception 'This checklist isn''t on one of your jobs';
  end if;
  select e.id, e.name into v_me, v_me_name from public.employer_employees e
   where e.user_id = auth.uid() and e.employer_id = v_c.employer_id and e.status ilike 'active' limit 1;
  if v_me is null then raise exception 'You''re not on this firm''s team'; end if;

  select it.value into v_item from jsonb_array_elements(v_c.items) as it(value) where it.value->>'key' = p_item_key limit 1;
  if v_item is null then raise exception 'That item is no longer on the checklist'; end if;
  v_type := v_item->>'type';
  if v_type = 'rams' then raise exception 'RAMS are signed in Sign-offs'; end if;

  p_note := nullif(btrim(coalesce(p_note, '')), '');
  if v_type = 'tick' then
    v_bool := true;
  elsif v_type = 'yes_no' then
    v_text := lower(coalesce(p_value->>'answer', ''));
    if v_text not in ('yes', 'no') then raise exception 'Answer yes or no'; end if;
    if v_text = 'no' and p_note is null then raise exception 'Say why the answer is no'; end if;
    v_satisfied := v_text = 'yes';
  elsif v_type = 'number' then
    begin
      v_num := (p_value->>'number')::numeric;
    exception when others then
      raise exception 'Enter a number';
    end;
    if v_num is null then raise exception 'Enter a number'; end if;
  elsif v_type = 'photo' then
    p_photos := coalesce(p_photos, '{}');
    if cardinality(p_photos) = 0 then raise exception 'Add a photo'; end if;
    if cardinality(p_photos) > 6 then raise exception 'Six photos at most'; end if;
    foreach v_photo in array p_photos loop
      if v_photo not like auth.uid()::text || '/%' then raise exception 'Photos must be your own uploads'; end if;
    end loop;
  elsif v_type = 'signature' then
    if nullif(btrim(coalesce(p_signature, '')), '') is null then raise exception 'Add the signature'; end if;
    p_signer_name := nullif(btrim(coalesce(p_signer_name, '')), '');
    if v_item->>'signer' = 'customer' and p_signer_name is null then
      raise exception 'Add the name of the person signing';
    end if;
  end if;
  if v_type <> 'photo' then
    -- photos on other item types are allowed as extra evidence, still own uploads only
    foreach v_photo in array coalesce(p_photos, '{}') loop
      if v_photo not like auth.uid()::text || '/%' then raise exception 'Photos must be your own uploads'; end if;
    end loop;
  end if;

  v_subject := case when v_item->>'phase' = 'before' then v_me else null end;
  if v_subject is null then
    v_before_open := cardinality(public._completion_outstanding(v_c.job_id));
  end if;

  update public.employer_job_checklist_responses
     set employee_id = v_me, user_id = auth.uid(), done_by_name = v_me_name,
         satisfied = v_satisfied, value_bool = v_bool, value_number = v_num, value_text = v_text,
         photos = coalesce(p_photos, '{}'), signature_data = case when v_type = 'signature' then p_signature end,
         signer_name = case when v_type = 'signature' then coalesce(p_signer_name, v_me_name) end,
         note = p_note, lat = p_lat, lng = p_lng, accuracy_m = p_accuracy,
         location_status = case when p_location_status in ('captured', 'denied', 'unavailable') then p_location_status end,
         completed_at = now(),
         countersigned_by = null, countersigned_by_name = null, countersigned_at = null, countersign_signature = null
   where job_checklist_id = v_c.id and item_key = p_item_key
     and subject_employee_id is not distinct from v_subject
  returning id into v_id;

  if v_id is null then
    insert into public.employer_job_checklist_responses
      (job_checklist_id, employer_id, job_id, item_key, subject_employee_id, employee_id, user_id, done_by_name,
       satisfied, value_bool, value_number, value_text, photos, signature_data, signer_name, note,
       lat, lng, accuracy_m, location_status)
    values (v_c.id, v_c.employer_id, v_c.job_id, p_item_key, v_subject, v_me, auth.uid(), v_me_name,
            v_satisfied, v_bool, v_num, v_text, coalesce(p_photos, '{}'),
            case when v_type = 'signature' then p_signature end,
            case when v_type = 'signature' then coalesce(p_signer_name, v_me_name) end,
            p_note, p_lat, p_lng, p_accuracy,
            case when p_location_status in ('captured', 'denied', 'unavailable') then p_location_status end)
    returning id into v_id;
  end if;

  -- The last required completion check just went in: tell the office.
  if v_subject is null and v_before_open > 0 and cardinality(public._completion_outstanding(v_c.job_id)) = 0 then
    select title into v_job_title from public.employer_jobs where id = v_c.job_id;
    perform public.notify_employer_bell(
      v_c.employer_id, 'checklist_complete', 'Completion checks done',
      coalesce(v_job_title, 'A job') || ': every required completion check is in, from ' || coalesce(v_me_name, 'the crew') || '.',
      jsonb_build_object('route', '/employer?section=checklists&job=' || v_c.job_id, 'job_id', v_c.job_id));
  end if;
  return v_id;
end;
$$;

create or replace function public.clear_my_checklist_item(p_response uuid)
returns void
language plpgsql
security definer
set search_path to 'public'
as $$
begin
  delete from public.employer_job_checklist_responses r
   where r.id = p_response and r.user_id = auth.uid() and r.countersigned_at is null
     and public.is_assigned_to_job(r.job_id);
  if not found then raise exception 'You can only undo your own answer before it is countersigned'; end if;
end;
$$;

create or replace function public.countersign_checklist_item(p_response uuid, p_signature text default null)
returns void
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_r public.employer_job_checklist_responses;
  v_office boolean;
  v_me uuid;
  v_me_name text;
  v_me_apprentice boolean;
  v_needs boolean;
  v_label text;
  v_doer uuid;
begin
  if auth.uid() is null then raise exception 'Not signed in'; end if;
  select * into v_r from public.employer_job_checklist_responses where id = p_response;
  if v_r.id is null then raise exception 'Answer not found'; end if;
  if v_r.countersigned_at is not null then raise exception 'Already countersigned'; end if;
  if v_r.user_id = auth.uid() then raise exception 'Someone else has to countersign your work'; end if;

  select (it.value->>'countersign')::boolean, it.value->>'label' into v_needs, v_label
    from public.employer_job_checklists c cross join lateral jsonb_array_elements(c.items) as it(value)
   where c.id = v_r.job_checklist_id and it.value->>'key' = v_r.item_key limit 1;
  if not coalesce(v_needs, false) then raise exception 'This item doesn''t need a countersign'; end if;

  v_office := v_r.employer_id in (select public.my_employer_scope());
  select e.id, e.name, (coalesce(e.team_role, '') ilike '%apprentice%' or coalesce(e.role, '') ilike '%apprentice%')
    into v_me, v_me_name, v_me_apprentice
    from public.employer_employees e
   where e.user_id = auth.uid() and e.employer_id = v_r.employer_id and e.status ilike 'active' limit 1;
  if not v_office and not (v_me is not null and not v_me_apprentice and public.is_assigned_to_job(v_r.job_id)) then
    raise exception 'Only a supervisor on the job or the office can countersign';
  end if;
  if v_me_name is null then
    select coalesce(nullif(full_name, ''), 'The office') into v_me_name from public.profiles where id = auth.uid();
  end if;

  update public.employer_job_checklist_responses
     set countersigned_by = auth.uid(), countersigned_by_name = coalesce(v_me_name, 'The office'),
         countersigned_at = now(), countersign_signature = nullif(btrim(coalesce(p_signature, '')), '')
   where id = p_response;

  select user_id into v_doer from public.employer_job_checklist_responses where id = p_response;
  perform public.worker_notify(v_doer, 'checklist_assigned', 'Countersigned',
    coalesce(v_me_name, 'Your supervisor') || ' countersigned "' || coalesce(v_label, 'a check') || '".',
    jsonb_build_object('route', '/electrician/worker-tools/jobs?job=' || v_r.job_id, 'job_id', v_r.job_id));
end;
$$;

-- ── The clock-in gate ─────────────────────────────────────────────────────
create or replace function public.guard_timesheet_prestart()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_missing text[];
begin
  if new.job_id is null or new.clock_out is not null or new.clock_in is null or auth.uid() is null then
    return new;
  end if;
  -- Only a worker clocking THEMSELVES in is gated; the office clocking someone in is not.
  if not exists (select 1 from public.employer_employees e where e.id = new.employee_id and e.user_id = auth.uid()) then
    return new;
  end if;
  v_missing := public._prestart_outstanding(new.job_id, new.employee_id);
  if cardinality(v_missing) > 0 then
    raise exception 'Finish the pre-start checks first: %', array_to_string(v_missing, '; ')
      using errcode = 'P0001', hint = 'PRESTART_INCOMPLETE';
  end if;
  return new;
end;
$$;
revoke all on function public.guard_timesheet_prestart() from public, anon, authenticated;

drop trigger if exists guard_timesheet_prestart on public.employer_timesheets;
create trigger guard_timesheet_prestart
  before insert on public.employer_timesheets
  for each row execute function public.guard_timesheet_prestart();

-- ── Auto-attach ───────────────────────────────────────────────────────────
create or replace function public.trg_checklists_on_new_job()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  r record;
begin
  if coalesce(new.is_template, false) then return new; end if;
  for r in select id from public.employer_checklist_templates
            where employer_id = new.user_id and auto_all_jobs and not is_archived loop
    perform public._attach_checklist(new.id, r.id, 'all_jobs', auth.uid());
  end loop;
  return new;
exception when others then
  raise warning '[checklists_on_new_job] %: %', new.id, sqlerrm;
  return new;
end;
$$;
revoke all on function public.trg_checklists_on_new_job() from public, anon, authenticated;

drop trigger if exists checklists_on_new_job on public.employer_jobs;
create trigger checklists_on_new_job
  after insert on public.employer_jobs
  for each row execute function public.trg_checklists_on_new_job();

create or replace function public.trg_checklists_on_job_label()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  r record;
  v_firm uuid;
begin
  select user_id into v_firm from public.employer_jobs where id = new.job_id and coalesce(is_template, false) = false;
  if v_firm is null then return new; end if;
  for r in select id from public.employer_checklist_templates
            where employer_id = v_firm and new.label_id = any (auto_label_ids) and not is_archived loop
    perform public._attach_checklist(new.job_id, r.id, 'label', auth.uid());
  end loop;
  return new;
exception when others then
  raise warning '[checklists_on_job_label] %: %', new.job_id, sqlerrm;
  return new;
end;
$$;
revoke all on function public.trg_checklists_on_job_label() from public, anon, authenticated;

drop trigger if exists checklists_on_job_label on public.employer_job_label_assignments;
create trigger checklists_on_job_label
  after insert on public.employer_job_label_assignments
  for each row execute function public.trg_checklists_on_job_label();

-- ── Photos: the office and the crew can read checklist evidence ───────────
create or replace function public.can_read_checklist_photo(p_name text)
returns boolean
language plpgsql
stable
security definer
set search_path to 'public'
as $$
begin
  if auth.uid() is null or p_name is null then return false; end if;
  return exists (
    select 1 from public.employer_job_checklist_responses r
     where r.photos @> array[p_name]
       and public.visual_upload_owner_in_firm(p_name, r.employer_id)
       and (r.employer_id in (select public.my_employer_scope())
            or r.user_id = auth.uid()
            or public.is_assigned_to_job(r.job_id)));
end;
$$;
revoke all on function public.can_read_checklist_photo(text) from public, anon;
grant execute on function public.can_read_checklist_photo(text) to authenticated;

drop policy if exists "Checklist evidence photos readable" on storage.objects;
create policy "Checklist evidence photos readable" on storage.objects
  for select to authenticated
  using (bucket_id = 'visual-uploads' and public.can_read_checklist_photo(name));

-- ── Grants ────────────────────────────────────────────────────────────────
revoke all on function public.save_checklist_template(uuid, uuid, text, text, text, jsonb, boolean, uuid[]) from public, anon;
revoke all on function public.archive_checklist_template(uuid) from public, anon;
revoke all on function public.copy_library_checklist_template(uuid, uuid) from public, anon;
revoke all on function public.attach_checklist_to_job(uuid, uuid) from public, anon;
revoke all on function public.detach_job_checklist(uuid) from public, anon;
revoke all on function public.get_job_checklist_detail(uuid) from public, anon;
revoke all on function public.get_firm_checklist_overview(uuid, boolean) from public, anon;
revoke all on function public.record_my_checklist_item(uuid, text, jsonb, text[], text, text, text, numeric, numeric, numeric, text) from public, anon;
revoke all on function public.clear_my_checklist_item(uuid) from public, anon;
revoke all on function public.countersign_checklist_item(uuid, text) from public, anon;

grant execute on function public.save_checklist_template(uuid, uuid, text, text, text, jsonb, boolean, uuid[]) to authenticated;
grant execute on function public.archive_checklist_template(uuid) to authenticated;
grant execute on function public.copy_library_checklist_template(uuid, uuid) to authenticated;
grant execute on function public.attach_checklist_to_job(uuid, uuid) to authenticated;
grant execute on function public.detach_job_checklist(uuid) to authenticated;
grant execute on function public.get_job_checklist_detail(uuid) to authenticated;
grant execute on function public.get_firm_checklist_overview(uuid, boolean) to authenticated;
grant execute on function public.record_my_checklist_item(uuid, text, jsonb, text[], text, text, text, numeric, numeric, numeric, text) to authenticated;
grant execute on function public.clear_my_checklist_item(uuid) to authenticated;
grant execute on function public.countersign_checklist_item(uuid, text) to authenticated;

-- ── The five firm-ready library templates ─────────────────────────────────
insert into public.employer_checklist_templates (employer_id, library_key, name, description, job_type, items)
values
(null, 'safe_isolation', 'Safe isolation',
 'Before anyone works on a circuit: prove the tester, isolate, lock off, test dead, re-prove. Each person on the crew does their own.',
 'Any work on a circuit',
 public._normalise_checklist_items($j$[
  {"key":"rams","label":"RAMS for this job read and signed","type":"rams","phase":"before"},
  {"key":"identify","label":"Circuit or equipment to be worked on identified","type":"tick","phase":"before"},
  {"key":"tester","label":"Approved voltage indicator (GS38) and proving unit with you","type":"tick","phase":"before"},
  {"key":"prove1","label":"Voltage indicator proved on the proving unit or a known live source","type":"tick","phase":"before"},
  {"key":"lockoff","label":"Isolated and locked off, key kept by you","type":"tick","phase":"before"},
  {"key":"lockphoto","label":"Photo of the lock-off and caution notice","type":"photo","phase":"before","hint":"Show the lock, the label and the device it is fitted to"},
  {"key":"dead","label":"Tested dead between all live conductors, and between each and earth","type":"tick","phase":"before","countersign":true},
  {"key":"prove2","label":"Voltage indicator re-proved after testing","type":"tick","phase":"before"},
  {"key":"restored","label":"Lock-off removed and supply restored safely","type":"tick","phase":"after"},
  {"key":"told","label":"Customer or site contact told the supply is back on","type":"yes_no","phase":"after"}
 ]$j$::jsonb)),
(null, 'db_change', 'Distribution board change',
 'Consumer unit or distribution board replacement, from telling the customer about the outage to their signature on handover.',
 'DB / consumer unit change',
 public._normalise_checklist_items($j$[
  {"key":"rams","label":"RAMS for this job read and signed","type":"rams","phase":"before"},
  {"key":"told","label":"Customer or site contact told how long the power will be off","type":"yes_no","phase":"before"},
  {"key":"before","label":"Photo of the existing board before any work","type":"photo","phase":"before"},
  {"key":"isolated","label":"Supply isolated and secured using the safe isolation procedure","type":"tick","phase":"before","countersign":true},
  {"key":"isophoto","label":"Photo of the isolation and lock-off","type":"photo","phase":"before"},
  {"key":"labels","label":"Circuits labelled and circuit chart fitted at the board","type":"tick","phase":"after"},
  {"key":"after","label":"Photo of the finished board, covers on","type":"photo","phase":"after"},
  {"key":"tests","label":"Tests done and results recorded on the certificate","type":"tick","phase":"after"},
  {"key":"ways","label":"Number of circuits","type":"number","phase":"after","unit":"circuits","required":false},
  {"key":"shown","label":"Customer shown the new board and how to use the RCD test button","type":"yes_no","phase":"after"},
  {"key":"sign","label":"Customer’s signature","type":"signature","phase":"after","signer":"customer"}
 ]$j$::jsonb)),
(null, 'eicr_visit', 'EICR visit',
 'Periodic inspection and testing: agree the extent and the shutdowns first, leave everything as you found it.',
 'EICR / periodic inspection',
 public._normalise_checklist_items($j$[
  {"key":"rams","label":"RAMS for this job read and signed","type":"rams","phase":"before"},
  {"key":"extent","label":"Extent and limitations of the inspection agreed with the client","type":"tick","phase":"before"},
  {"key":"shutdowns","label":"Client agreed which circuits can be switched off, and when","type":"yes_no","phase":"before"},
  {"key":"boards","label":"Photo of the board(s) before testing","type":"photo","phase":"before"},
  {"key":"circuits","label":"Number of circuits tested","type":"number","phase":"after","unit":"circuits","required":false},
  {"key":"c1","label":"Any danger found (C1) made safe or the person responsible told before leaving","type":"tick","phase":"after","hint":"Tick if there was none"},
  {"key":"restored","label":"Supplies restored and everything left as found","type":"tick","phase":"after"},
  {"key":"sign","label":"Client’s signature","type":"signature","phase":"after","signer":"customer"}
 ]$j$::jsonb)),
(null, 'ev_charger', 'EV charger install',
 'Electric vehicle charge point installation, from the DNO and earthing checks to showing the customer how it works.',
 'EV charger install',
 public._normalise_checklist_items($j$[
  {"key":"rams","label":"RAMS for this job read and signed","type":"rams","phase":"before"},
  {"key":"dno","label":"DNO notified, or approval in hand, for this charger","type":"tick","phase":"before"},
  {"key":"earthing","label":"Earthing arrangement checked and the protection for it planned (PME or TT)","type":"tick","phase":"before"},
  {"key":"location","label":"Photo of the charger location before work","type":"photo","phase":"before"},
  {"key":"isolated","label":"Supply isolated and proved dead before connecting","type":"tick","phase":"before","countersign":true},
  {"key":"installed","label":"Photo of the installed charger","type":"photo","phase":"after"},
  {"key":"commission","label":"Charger commissioned and a test charge done","type":"tick","phase":"after"},
  {"key":"rating","label":"Charger rating","type":"number","phase":"after","unit":"kW"},
  {"key":"shown","label":"Customer shown how to use the charger and its app","type":"yes_no","phase":"after"},
  {"key":"sign","label":"Customer’s signature","type":"signature","phase":"after","signer":"customer"}
 ]$j$::jsonb)),
(null, 'pat_round', 'PAT round',
 'In-service inspection and testing of portable equipment: agree the downtime, record what failed and that it is out of use.',
 'PAT testing',
 public._normalise_checklist_items($j$[
  {"key":"rams","label":"RAMS for this job read and signed","type":"rams","phase":"before"},
  {"key":"downtime","label":"Site contact agreed when equipment can be unplugged","type":"yes_no","phase":"before"},
  {"key":"tester","label":"PAT tester in calibration and checked before use","type":"tick","phase":"before"},
  {"key":"tested","label":"Number of items tested","type":"number","phase":"after","unit":"items"},
  {"key":"failed","label":"Number of items failed","type":"number","phase":"after","unit":"items"},
  {"key":"outofuse","label":"Failed items labelled, taken out of use and the site contact told","type":"tick","phase":"after","hint":"Tick if nothing failed"},
  {"key":"photo","label":"Photo of the failed items or the register","type":"photo","phase":"after","required":false},
  {"key":"sign","label":"Site contact’s signature","type":"signature","phase":"after","signer":"customer"}
 ]$j$::jsonb))
on conflict (library_key) do update
  set name = excluded.name, description = excluded.description, job_type = excluded.job_type,
      items = excluded.items, updated_at = now();
