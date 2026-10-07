-- ELE-2008 / ELE-1829: issue company kit to a PERSON or a VAN, the holder
-- confirms it, reports a fault or loss (with a photo), transfers it to a
-- colleague or returns it. One assignment model on employer_company_tools:
--   assigned_to_employee_id  → a roster member, or
--   assigned_vehicle_id      → a van (whoever drives it holds it)
-- never both. Every movement is a row in employer_tool_events (history kept).
--
-- Why: My equipment matched assigned_to_employee_id but no screen ever set it
-- (CreateToolDialog wrote free text), so it could never show anything.
--
-- Rules
--  * Office (owner/admin/office manager, my_employer_scope) issues, takes back
--    and marks repaired. Workers act only on kit they hold (their name, or the
--    van they drive), through the SECURITY DEFINER RPCs below.
--  * Workers never see money: get_my_kit returns no purchase price.
--  * Photos live in the PRIVATE kit-photos bucket under <uid>/...; the office
--    reads them only when an event on their firm's tool points at the file.

-- ── 1. Columns ────────────────────────────────────────────────────────────
alter table public.employer_company_tools
  add column if not exists assigned_vehicle_id uuid references public.vehicles(id) on delete set null,
  add column if not exists issue_state text,
  add column if not exists issued_at timestamptz,
  add column if not exists issued_by uuid references public.profiles(id) on delete set null,
  add column if not exists confirmed_at timestamptz,
  add column if not exists barcode text,
  add column if not exists photo_path text;

alter table public.employer_company_tools
  drop constraint if exists employer_company_tools_issue_state_check,
  add constraint employer_company_tools_issue_state_check
    check (issue_state is null or issue_state in ('pending', 'confirmed')),
  drop constraint if exists employer_company_tools_one_holder,
  add constraint employer_company_tools_one_holder
    check (assigned_to_employee_id is null or assigned_vehicle_id is null),
  drop constraint if exists employer_company_tools_barcode_len,
  add constraint employer_company_tools_barcode_len
    check (barcode is null or length(barcode) <= 64);

create index if not exists employer_company_tools_employee_idx
  on public.employer_company_tools (assigned_to_employee_id) where assigned_to_employee_id is not null;
create index if not exists employer_company_tools_vehicle_idx
  on public.employer_company_tools (assigned_vehicle_id) where assigned_vehicle_id is not null;

-- ── 2. Holder must belong to the firm; keep the display text in step ─────
create or replace function public.trg_company_tool_holder()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_name text;
begin
  if new.assigned_to_employee_id is not null then
    select e.name into v_name from public.employer_employees e
     where e.id = new.assigned_to_employee_id and e.employer_id = new.user_id;
    if not found then
      raise exception 'That person is not on this firm''s team.' using errcode = '22023';
    end if;
    new.assigned_to := v_name;
  elsif new.assigned_vehicle_id is not null then
    select 'Van ' || coalesce(nullif(btrim(v.registration), ''), concat_ws(' ', v.make, v.model))
      into v_name
      from public.vehicles v
     where v.id = new.assigned_vehicle_id and v.user_id = new.user_id;
    if not found then
      raise exception 'That van is not on this firm''s fleet.' using errcode = '22023';
    end if;
    new.assigned_to := v_name;
  elsif tg_op = 'UPDATE'
        and (old.assigned_to_employee_id is not null or old.assigned_vehicle_id is not null) then
    new.assigned_to := null;
  end if;
  if new.assigned_to_employee_id is null and new.assigned_vehicle_id is null then
    new.issue_state := null;
  end if;
  return new;
end;
$$;

drop trigger if exists company_tool_holder on public.employer_company_tools;
create trigger company_tool_holder
  before insert or update of assigned_to_employee_id, assigned_vehicle_id, user_id, issue_state
  on public.employer_company_tools
  for each row execute function public.trg_company_tool_holder();

-- ── 3. History ────────────────────────────────────────────────────────────
create table if not exists public.employer_tool_events (
  id uuid primary key default gen_random_uuid(),
  employer_id uuid not null references public.profiles(id) on delete cascade,
  tool_id uuid not null references public.employer_company_tools(id) on delete cascade,
  kind text not null check (kind in ('issued', 'confirmed', 'returned', 'transferred', 'fault', 'lost', 'repaired')),
  to_employee_id uuid references public.employer_employees(id) on delete set null,
  to_vehicle_id uuid references public.vehicles(id) on delete set null,
  from_label text,
  to_label text,
  note text check (note is null or length(note) <= 2000),
  photo_path text check (photo_path is null or length(photo_path) <= 400),
  actor uuid references public.profiles(id) on delete set null,
  actor_name text,
  by_office boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists employer_tool_events_tool_idx on public.employer_tool_events (tool_id, created_at desc);
create index if not exists employer_tool_events_employer_idx on public.employer_tool_events (employer_id, created_at desc);

alter table public.employer_tool_events enable row level security;
revoke all on public.employer_tool_events from anon, public;
grant select on public.employer_tool_events to authenticated;

drop policy if exists "Firm managers read tool events" on public.employer_tool_events;
create policy "Firm managers read tool events"
  on public.employer_tool_events
  for select to authenticated
  using (employer_id in (select public.my_employer_scope()));
-- Writes only through the RPCs below (no insert/update/delete policy).

comment on table public.employer_tool_events is
  '[EMPLOYER HUB → WORKER TOOLS] Kit register history: one row per movement of a company tool (issued to a person or van, confirmed, transferred, returned, fault, lost, repaired), with note and an optional photo in the private kit-photos bucket. Scope: employer_id = the firm (= employer_company_tools.user_id); managers read via my_employer_scope(); workers read their own kit''s events through get_my_kit. Writes: issue_company_tool, confirm_company_tool, transfer_company_tool, return_company_tool, report_company_tool, mark_company_tool_repaired only. ELE-2008.';

comment on table public.employer_company_tools is
  '[EMPLOYER HUB → WORKER TOOLS] Kit register: company tools and test instruments with PAT/calibration due dates. Scope: user_id = the firm (owner profiles.id); managers via my_employer_scope(). Holder: assigned_to_employee_id (a person) OR assigned_vehicle_id (a van, held by its driver), never both; assigned_to is display text kept in step by trigger. issue_state pending/confirmed = the holder''s receipt. Change holders only through issue_company_tool and the worker RPCs (history in employer_tool_events). Used by: Employer Hub Kit register, Worker Tools My equipment (get_my_kit), Fleet van sheet. ELE-1978/2008.';

-- ── 4. Helpers ────────────────────────────────────────────────────────────
-- Does the caller hold this tool (their name, or a van they drive)?
create or replace function public._kit_i_hold(p_tool uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.employer_company_tools t
     where t.id = p_tool
       and (t.assigned_to_employee_id in (select public.my_employee_ids())
            or t.assigned_vehicle_id in (
              select v.id from public.vehicles v
                join public.employer_employees e on e.id = v.driver_id
               where e.user_id = auth.uid() and lower(coalesce(e.status, '')) = 'active'
                 and e.employer_id = v.user_id))
  );
$$;

-- The user who confirms a tool: the person it is issued to, or the van driver.
create or replace function public._kit_holder_user(p_employee uuid, p_vehicle uuid)
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select e.user_id from public.employer_employees e
      where e.id = p_employee and lower(coalesce(e.status, '')) = 'active'),
    (select e.user_id from public.vehicles v
       join public.employer_employees e on e.id = v.driver_id
      where v.id = p_vehicle and lower(coalesce(e.status, '')) = 'active')
  );
$$;

create or replace function public._kit_holder_label(p_employee uuid, p_vehicle uuid)
returns text
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select e.name from public.employer_employees e where e.id = p_employee),
    (select 'van ' || coalesce(nullif(btrim(v.registration), ''), 'with no registration')
            || coalesce(' (' || public.notif_first_name(e.name) || ')', '')
       from public.vehicles v
       left join public.employer_employees e on e.id = v.driver_id
      where v.id = p_vehicle),
    'the office'
  );
$$;

create or replace function public._kit_my_name()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(nullif(btrim(full_name), ''), 'Someone') from public.profiles where id = auth.uid();
$$;

revoke all on function public._kit_i_hold(uuid) from public, anon;
revoke all on function public._kit_holder_user(uuid, uuid) from public, anon;
revoke all on function public._kit_holder_label(uuid, uuid) from public, anon;
revoke all on function public._kit_my_name() from public, anon;
revoke all on function public.trg_company_tool_holder() from public, anon;

-- ── 5. Office: issue (or take back into the office) ──────────────────────
create or replace function public.issue_company_tool(
  p_tool uuid,
  p_employee uuid default null,
  p_vehicle uuid default null,
  p_note text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  t public.employer_company_tools%rowtype;
  v_user uuid;
  v_prev_user uuid;
  v_from text;
  v_to text;
  v_route text;
  v_reg text;
begin
  if auth.uid() is null then
    raise exception 'Not allowed' using errcode = '42501';
  end if;
  select * into t from public.employer_company_tools where id = p_tool for update;
  if not found or t.user_id not in (select public.my_employer_scope()) then
    raise exception 'Kit not found' using errcode = 'P0002';
  end if;
  if p_employee is not null and p_vehicle is not null then
    raise exception 'Issue to a person or a van, not both.' using errcode = '22023';
  end if;
  if p_employee is not null and not exists (
       select 1 from public.employer_employees e
        where e.id = p_employee and e.employer_id = t.user_id
          and lower(coalesce(e.status, '')) = 'active') then
    raise exception 'That person is not on the team.' using errcode = '22023';
  end if;
  if p_vehicle is not null and not exists (
       select 1 from public.vehicles v where v.id = p_vehicle and v.user_id = t.user_id) then
    raise exception 'That van is not on the fleet.' using errcode = '22023';
  end if;
  if t.status in ('Lost', 'Written Off') and (p_employee is not null or p_vehicle is not null) then
    raise exception 'This item is marked %. Mark it back in use first.', lower(t.status) using errcode = '22023';
  end if;

  v_from := public._kit_holder_label(t.assigned_to_employee_id, t.assigned_vehicle_id);
  v_prev_user := public._kit_holder_user(t.assigned_to_employee_id, t.assigned_vehicle_id);
  v_user := public._kit_holder_user(p_employee, p_vehicle);
  v_to := public._kit_holder_label(p_employee, p_vehicle);

  update public.employer_company_tools
     set assigned_to_employee_id = p_employee,
         assigned_vehicle_id = p_vehicle,
         issue_state = case when p_employee is null and p_vehicle is null then null
                            when v_user is null then null
                            else 'pending' end,
         issued_at = case when p_employee is null and p_vehicle is null then null else now() end,
         issued_by = case when p_employee is null and p_vehicle is null then null else auth.uid() end,
         confirmed_at = null,
         status = case
           when p_employee is null and p_vehicle is null
             then case when status = 'In Use' then 'Available' else status end
           else case when status = 'Available' then 'In Use' else status end
         end,
         updated_at = now()
   where id = p_tool;

  insert into public.employer_tool_events
    (employer_id, tool_id, kind, to_employee_id, to_vehicle_id, from_label, to_label, note, actor, actor_name, by_office)
  values
    (t.user_id, p_tool,
     case when p_employee is null and p_vehicle is null then 'returned' else 'issued' end,
     p_employee, p_vehicle, v_from, v_to,
     nullif(btrim(coalesce(p_note, '')), ''), auth.uid(), public._kit_my_name(), true);

  v_route := '/electrician/worker-tools/equipment?tool=' || p_tool;
  if v_user is not null and v_user is distinct from v_prev_user then
    select v.registration into v_reg from public.vehicles v where v.id = p_vehicle;
    perform public.worker_notify(
      v_user, 'kit_issued',
      t.name || case when p_vehicle is not null then ' put on your van' else ' issued to you' end,
      'Tap to confirm you have it' || coalesce(' on ' || v_reg, '') || '.',
      jsonb_build_object('route', v_route, 'tool_id', p_tool, 'employee_id', p_employee));
  end if;
  if v_prev_user is not null and v_prev_user is distinct from v_user then
    perform public.worker_notify(
      v_prev_user, 'kit_moved',
      t.name || ' taken off your name',
      'The office has moved it to ' || v_to || '.',
      jsonb_build_object('route', '/electrician/worker-tools/equipment', 'tool_id', p_tool));
  end if;

  return jsonb_build_object('tool_id', p_tool, 'holder', v_to,
                            'needs_confirm', v_user is not null);
end;
$$;

-- ── 6. Worker: list my kit (no money) ─────────────────────────────────────
create or replace function public.get_my_kit()
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_out jsonb;
begin
  if auth.uid() is null then
    return jsonb_build_object('tools', '[]'::jsonb, 'vans', '[]'::jsonb);
  end if;

  with me as (
    select e.id, e.employer_id from public.employer_employees e
     where e.user_id = auth.uid() and lower(coalesce(e.status, '')) = 'active'
  ), my_vans as (
    select v.id, v.registration, v.make, v.model, v.user_id
      from public.vehicles v join me on me.id = v.driver_id and me.employer_id = v.user_id
  ), tools as (
    select t.*, (t.assigned_vehicle_id is not null) as on_van
      from public.employer_company_tools t
     where t.assigned_to_employee_id in (select id from me)
        or t.assigned_vehicle_id in (select id from my_vans)
  )
  select jsonb_build_object(
    'tools', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', t.id,
        'name', t.name,
        'category', t.category,
        'serial_number', t.serial_number,
        'tool_number', t.tool_number,
        'barcode', t.barcode,
        'status', t.status,
        'pat_date', t.pat_date,
        'pat_due', t.pat_due,
        'last_calibration', t.last_calibration,
        'next_calibration', t.next_calibration,
        'issue_state', t.issue_state,
        'issued_at', t.issued_at,
        'confirmed_at', t.confirmed_at,
        'on_van', t.on_van,
        'vehicle_id', t.assigned_vehicle_id,
        'vehicle_registration', (select mv.registration from my_vans mv where mv.id = t.assigned_vehicle_id),
        'events', coalesce((
          select jsonb_agg(jsonb_build_object(
                   'id', ev.id, 'kind', ev.kind, 'note', ev.note, 'from_label', ev.from_label,
                   'to_label', ev.to_label, 'actor_name', ev.actor_name, 'by_office', ev.by_office,
                   'has_photo', ev.photo_path is not null,
                   'photo_path', case when ev.actor = auth.uid() then ev.photo_path end,
                   'created_at', ev.created_at) order by ev.created_at desc)
            from (select * from public.employer_tool_events x
                   where x.tool_id = t.id order by x.created_at desc limit 8) ev), '[]'::jsonb)
      ) order by (t.issue_state = 'pending') desc nulls last, t.name)
        from tools t), '[]'::jsonb),
    'vans', coalesce((
      select jsonb_agg(jsonb_build_object('id', mv.id, 'registration', mv.registration,
                                          'make', mv.make, 'model', mv.model) order by mv.registration)
        from my_vans mv), '[]'::jsonb)
  ) into v_out;
  return v_out;
end;
$$;

-- ── 7. Worker actions ─────────────────────────────────────────────────────
create or replace function public.confirm_company_tool(p_tool uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  t public.employer_company_tools%rowtype;
begin
  if auth.uid() is null or not public._kit_i_hold(p_tool) then
    raise exception 'This is not on your name.' using errcode = '42501';
  end if;
  select * into t from public.employer_company_tools where id = p_tool for update;
  if t.issue_state = 'confirmed' then
    return;
  end if;
  update public.employer_company_tools
     set issue_state = 'confirmed', confirmed_at = now(), updated_at = now()
   where id = p_tool;
  insert into public.employer_tool_events
    (employer_id, tool_id, kind, to_employee_id, to_vehicle_id, to_label, actor, actor_name)
  values (t.user_id, p_tool, 'confirmed', t.assigned_to_employee_id, t.assigned_vehicle_id,
          public._kit_holder_label(t.assigned_to_employee_id, t.assigned_vehicle_id),
          auth.uid(), public._kit_my_name());
end;
$$;

create or replace function public.get_kit_transfer_people(p_tool uuid)
returns table(employee_id uuid, name text, role text, on_app boolean)
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_firm uuid;
begin
  if auth.uid() is null or not public._kit_i_hold(p_tool) then
    return;
  end if;
  select user_id into v_firm from public.employer_company_tools where id = p_tool;
  return query
  select e.id, e.name, coalesce(nullif(e.team_role, ''), e.role), e.user_id is not null
    from public.employer_employees e
   where e.employer_id = v_firm
     and lower(coalesce(e.status, '')) = 'active'
     and e.user_id is distinct from auth.uid()
   order by e.name;
end;
$$;

create or replace function public.transfer_company_tool(p_tool uuid, p_to_employee uuid, p_note text default null)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  t public.employer_company_tools%rowtype;
  v_from text;
  v_to text;
  v_to_user uuid;
  v_me text := public._kit_my_name();
begin
  if auth.uid() is null or not public._kit_i_hold(p_tool) then
    raise exception 'This is not on your name.' using errcode = '42501';
  end if;
  select * into t from public.employer_company_tools where id = p_tool for update;
  if not exists (select 1 from public.employer_employees e
                  where e.id = p_to_employee and e.employer_id = t.user_id
                    and lower(coalesce(e.status, '')) = 'active') then
    raise exception 'Pick someone on your team.' using errcode = '22023';
  end if;
  if t.assigned_to_employee_id = p_to_employee then
    raise exception 'It is already on their name.' using errcode = '22023';
  end if;
  v_from := public._kit_holder_label(t.assigned_to_employee_id, t.assigned_vehicle_id);
  v_to := public._kit_holder_label(p_to_employee, null);
  v_to_user := public._kit_holder_user(p_to_employee, null);

  update public.employer_company_tools
     set assigned_to_employee_id = p_to_employee,
         assigned_vehicle_id = null,
         issue_state = case when v_to_user is null then null else 'pending' end,
         issued_at = now(), issued_by = auth.uid(), confirmed_at = null,
         status = case when status = 'Available' then 'In Use' else status end,
         updated_at = now()
   where id = p_tool;

  insert into public.employer_tool_events
    (employer_id, tool_id, kind, to_employee_id, from_label, to_label, note, actor, actor_name)
  values (t.user_id, p_tool, 'transferred', p_to_employee, v_from, v_to,
          nullif(btrim(coalesce(p_note, '')), ''), auth.uid(), v_me);

  if v_to_user is not null then
    perform public.worker_notify(
      v_to_user, 'kit_issued',
      t.name || ' passed to you by ' || public.notif_first_name(v_me),
      'Tap to confirm you have it.',
      jsonb_build_object('route', '/electrician/worker-tools/equipment?tool=' || p_tool,
                         'tool_id', p_tool, 'employee_id', p_to_employee));
  end if;
  perform public.notify_employer_bell(
    t.user_id, 'kit_transferred',
    t.name || ' passed to ' || v_to,
    v_me || ' handed it over' || coalesce(': ' || left(nullif(btrim(coalesce(p_note, '')), ''), 120), '.'),
    jsonb_build_object('route', '/employer?section=kit&tool=' || p_tool, 'tool_id', p_tool,
                       'employee_id', p_to_employee));
end;
$$;

create or replace function public.return_company_tool(p_tool uuid, p_note text default null)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  t public.employer_company_tools%rowtype;
  v_from text;
  v_me text := public._kit_my_name();
begin
  if auth.uid() is null or not public._kit_i_hold(p_tool) then
    raise exception 'This is not on your name.' using errcode = '42501';
  end if;
  select * into t from public.employer_company_tools where id = p_tool for update;
  v_from := public._kit_holder_label(t.assigned_to_employee_id, t.assigned_vehicle_id);

  update public.employer_company_tools
     set assigned_to_employee_id = null, assigned_vehicle_id = null,
         issue_state = null, issued_at = null, issued_by = null, confirmed_at = null,
         status = case when status = 'In Use' then 'Available' else status end,
         updated_at = now()
   where id = p_tool;

  insert into public.employer_tool_events
    (employer_id, tool_id, kind, from_label, to_label, note, actor, actor_name)
  values (t.user_id, p_tool, 'returned', v_from, 'the office',
          nullif(btrim(coalesce(p_note, '')), ''), auth.uid(), v_me);

  perform public.notify_employer_bell(
    t.user_id, 'kit_returned',
    t.name || ' handed back',
    v_me || ' returned it to the office' ||
      coalesce(': ' || left(nullif(btrim(coalesce(p_note, '')), ''), 120), '. Check it is there.'),
    jsonb_build_object('route', '/employer?section=kit&tool=' || p_tool, 'tool_id', p_tool));
end;
$$;

create or replace function public.report_company_tool(
  p_tool uuid,
  p_kind text,
  p_note text,
  p_photo_path text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  t public.employer_company_tools%rowtype;
  v_me text := public._kit_my_name();
  v_note text := nullif(btrim(coalesce(p_note, '')), '');
  v_office boolean;
begin
  if auth.uid() is null then
    raise exception 'Not allowed' using errcode = '42501';
  end if;
  select * into t from public.employer_company_tools where id = p_tool for update;
  if not found then
    raise exception 'Kit not found' using errcode = 'P0002';
  end if;
  v_office := t.user_id in (select public.my_employer_scope());
  if not v_office and not public._kit_i_hold(p_tool) then
    raise exception 'This is not on your name.' using errcode = '42501';
  end if;
  if p_kind not in ('fault', 'lost') then
    raise exception 'Unknown report.' using errcode = '22023';
  end if;
  if p_kind = 'fault' and (v_note is null or length(v_note) < 3) then
    raise exception 'Say what is wrong with it.' using errcode = '22023';
  end if;
  if p_photo_path is not null and p_photo_path not like auth.uid()::text || '/%' then
    raise exception 'The photo must be your own upload.' using errcode = '42501';
  end if;

  update public.employer_company_tools
     set status = case when p_kind = 'lost' then 'Lost' else 'Under Repair' end,
         updated_at = now()
   where id = p_tool;

  insert into public.employer_tool_events
    (employer_id, tool_id, kind, to_employee_id, to_vehicle_id, to_label, note, photo_path, actor, actor_name, by_office)
  values (t.user_id, p_tool, p_kind, t.assigned_to_employee_id, t.assigned_vehicle_id,
          public._kit_holder_label(t.assigned_to_employee_id, t.assigned_vehicle_id),
          v_note, p_photo_path, auth.uid(), v_me, v_office);

  if not v_office then
    perform public.notify_employer_bell(
      t.user_id, case when p_kind = 'lost' then 'kit_lost' else 'kit_fault' end,
      case when p_kind = 'lost' then t.name || ' reported lost'
           else 'Fault reported on ' || t.name end,
      v_me || coalesce(': ' || left(v_note, 140), ' says it is missing.') ||
        case when p_photo_path is not null then ' Photo attached.' else '' end,
      jsonb_build_object('route', '/employer?section=kit&tool=' || p_tool, 'tool_id', p_tool,
                         'employee_id', t.assigned_to_employee_id));
  end if;
end;
$$;

create or replace function public.mark_company_tool_repaired(p_tool uuid, p_note text default null)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  t public.employer_company_tools%rowtype;
  v_user uuid;
begin
  if auth.uid() is null then
    raise exception 'Not allowed' using errcode = '42501';
  end if;
  select * into t from public.employer_company_tools where id = p_tool for update;
  if not found or t.user_id not in (select public.my_employer_scope()) then
    raise exception 'Kit not found' using errcode = 'P0002';
  end if;
  update public.employer_company_tools
     set status = case when assigned_to_employee_id is not null or assigned_vehicle_id is not null
                       then 'In Use' else 'Available' end,
         updated_at = now()
   where id = p_tool;
  insert into public.employer_tool_events
    (employer_id, tool_id, kind, to_employee_id, to_vehicle_id, to_label, note, actor, actor_name, by_office)
  values (t.user_id, p_tool, 'repaired', t.assigned_to_employee_id, t.assigned_vehicle_id,
          public._kit_holder_label(t.assigned_to_employee_id, t.assigned_vehicle_id),
          nullif(btrim(coalesce(p_note, '')), ''), auth.uid(), public._kit_my_name(), true);

  v_user := public._kit_holder_user(t.assigned_to_employee_id, t.assigned_vehicle_id);
  if v_user is not null then
    perform public.worker_notify(
      v_user, 'kit_repaired', t.name || ' back in use',
      'The office has marked it fixed and ready to use.',
      jsonb_build_object('route', '/electrician/worker-tools/equipment?tool=' || p_tool, 'tool_id', p_tool));
  end if;
end;
$$;

-- ── 8. Holder reminders before PAT / calibration is due ──────────────────
-- The office already gets these (employer_expiry_items → notify_employer_expiries).
-- This tells the person holding the item, 14 days out, on the day, and once overdue.
create or replace function public.notify_kit_holders_due()
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  r record;
  v_stage text;
  v_ref text;
begin
  for r in
    select t.id, t.user_id as firm, t.name, f.label, f.due,
           public._kit_holder_user(t.assigned_to_employee_id, t.assigned_vehicle_id) as holder
      from public.employer_company_tools t
     cross join lateral (values ('PAT test', t.pat_due), ('Calibration', t.next_calibration)) f(label, due)
     where f.due is not null
       and f.due <= current_date + 14 and f.due >= current_date - 30
       and coalesce(t.status, '') not in ('Lost', 'Written Off')
       and (t.assigned_to_employee_id is not null or t.assigned_vehicle_id is not null)
  loop
    continue when r.holder is null;
    begin
      v_stage := case when r.due < current_date then 'overdue'
                      when r.due = current_date then 'today' else 'due14' end;
      v_ref := 'kitholder:' || r.id || ':' || r.label || ':' || r.due || ':' || v_stage;
      insert into public.employer_expiry_sent (firm, ref) values (r.firm, v_ref) on conflict do nothing;
      continue when not found;
      perform public.worker_notify(
        r.holder, 'kit_due',
        r.label || case when v_stage = 'overdue' then ' overdue on ' else ' due on ' end || r.name,
        case when v_stage = 'overdue' then 'It was due ' || to_char(r.due, 'FMDD Mon') || '. Do not use it until the office says.'
             when v_stage = 'today' then 'Due today. Ask the office to book it in.'
             else 'Due ' || to_char(r.due, 'FMDD Mon') || '. Ask the office to book it in.' end,
        jsonb_build_object('route', '/electrician/worker-tools/equipment?tool=' || r.id, 'tool_id', r.id));
    exception when others then
      raise warning '[notify_kit_holders_due] %: %', r.id, sqlerrm;
    end;
  end loop;
end;
$$;

do $$
begin
  if exists (select 1 from cron.job where jobname = 'kit-holder-due-reminders') then
    perform cron.unschedule('kit-holder-due-reminders');
  end if;
  perform cron.schedule('kit-holder-due-reminders', '35 7 * * *', 'select public.notify_kit_holders_due();');
end $$;

-- ── 9. Office expiry feed: deep link to the item and say who has it ──────
create or replace function pg_temp.patch_fn(p_sig text, p_pairs text[])
returns void language plpgsql as $$
declare
  d text := pg_get_functiondef(p_sig::regprocedure);
  i int;
begin
  for i in 1 .. array_length(p_pairs, 1) by 2 loop
    if position(p_pairs[i] in d) = 0 then
      raise exception 'patch_fn %: pair % not found', p_sig, (i + 1) / 2;
    end if;
    d := replace(d, p_pairs[i], p_pairs[i + 1]);
  end loop;
  execute d;
end $$;

select pg_temp.patch_fn('public.employer_expiry_items()', array[
  $q$coalesce(nullif(trim(t.name), ''), 'A tool'), '/employer?section=procurement'$q$,
  $q$coalesce(nullif(trim(t.name), ''), 'A tool')
           || case when t.assigned_to_employee_id is not null or t.assigned_vehicle_id is not null
                   then ', with ' || public._kit_holder_label(t.assigned_to_employee_id, t.assigned_vehicle_id)
                   else '' end,
         '/employer?section=kit&tool=' || t.id$q$
]);

-- Worker home counts include kit on the van they drive.
select pg_temp.patch_fn('public.get_worker_home()', array[
  $q$t.assigned_to_employee_id = me.id$q$,
  $q$(t.assigned_to_employee_id = me.id or t.assigned_vehicle_id in (select v.id from public.vehicles v where v.driver_id = me.id))$q$
]);

drop function pg_temp.patch_fn(text, text[]);

-- ── 10. Private photo bucket ─────────────────────────────────────────────
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('kit-photos', 'kit-photos', false, 10485760,
        array['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'])
on conflict (id) do update set public = false;

drop policy if exists "Kit photos: upload to own folder" on storage.objects;
create policy "Kit photos: upload to own folder"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'kit-photos' and (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists "Kit photos: delete own" on storage.objects;
create policy "Kit photos: delete own"
  on storage.objects for delete to authenticated
  using (bucket_id = 'kit-photos' and (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists "Kit photos: read own or firm" on storage.objects;
create policy "Kit photos: read own or firm"
  on storage.objects for select to authenticated
  using (
    bucket_id = 'kit-photos'
    and (
      (storage.foldername(name))[1] = (select auth.uid())::text
      or exists (
        select 1 from public.employer_tool_events ev
         where ev.photo_path = storage.objects.name
           and ev.employer_id in (select public.my_employer_scope())
      )
    )
  );

-- ── 11. Grants ───────────────────────────────────────────────────────────
revoke all on function public.issue_company_tool(uuid, uuid, uuid, text) from public, anon;
revoke all on function public.get_my_kit() from public, anon;
revoke all on function public.confirm_company_tool(uuid) from public, anon;
revoke all on function public.get_kit_transfer_people(uuid) from public, anon;
revoke all on function public.transfer_company_tool(uuid, uuid, text) from public, anon;
revoke all on function public.return_company_tool(uuid, text) from public, anon;
revoke all on function public.report_company_tool(uuid, text, text, text) from public, anon;
revoke all on function public.mark_company_tool_repaired(uuid, text) from public, anon;
revoke all on function public.notify_kit_holders_due() from public, anon, authenticated;

grant execute on function public.issue_company_tool(uuid, uuid, uuid, text) to authenticated;
grant execute on function public.get_my_kit() to authenticated;
grant execute on function public.confirm_company_tool(uuid) to authenticated;
grant execute on function public.get_kit_transfer_people(uuid) to authenticated;
grant execute on function public.transfer_company_tool(uuid, uuid, text) to authenticated;
grant execute on function public.return_company_tool(uuid, text) to authenticated;
grant execute on function public.report_company_tool(uuid, text, text, text) to authenticated;
grant execute on function public.mark_company_tool_repaired(uuid, text) to authenticated;
