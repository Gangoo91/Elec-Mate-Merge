-- ELE-2068 — "Job done" on site, in one step on the worker's phone (works offline).
--
-- The crew member who is allowed to finish jobs goes through: the job's
-- completion checks (ELE-1826), photos, the certificate (ELE-1832), the
-- customer's signature and any extra work done on the day, priced from the
-- firm's price book and agreed by the customer on the phone. The phone queues
-- it all in the worker outbox (ELE-1828) and sends one call,
-- complete_job_on_site, when there is signal.
--
-- What one call does, in one transaction:
--   * refuses plainly if the person may not finish jobs, the completion checks
--     are not done, or the job was already closed (by the office or another
--     phone; the job row is locked, so two phones can never both close it);
--   * records the completion (photos, signature, extras) as one row whose id
--     is the phone's id, so a resend after a lost answer returns the first
--     result instead of doing anything again;
--   * the extras become ONE approved variation order (signed by the customer);
--   * sends the worker's completed certificates for this job to QS review
--     (the existing submit_report_for_qs_review, which never doubles up);
--   * closes the job (status Completed). That fires the existing automations
--     (ELE-1987): "Draft the invoice" drafts it through the existing
--     job_complete_draft_invoice path and "Ask for a review" queues the
--     review email, each at most once per job (employer_automation_runs is
--     unique per firm, rule and job). The extras are then added to that draft
--     invoice as variation lines. No invoice is created here any other way;
--   * one bell to the office that opens the job.
--
-- Additive only: two new tables, new functions, one notification type. HEAD
-- and iOS build 49 call none of these.

-- ── Who may finish jobs on site (per firm) ─────────────────────────────────
create table if not exists public.employer_job_done_settings (
  employer_id uuid primary key,
  -- crew        = engineers and supervisors on the job (not apprentices, not subcontractors)
  -- supervisors = supervisors only
  -- office_only = nobody on site; the crew use "I've finished my part"
  who_can_finish text not null default 'crew'
    check (who_can_finish in ('crew', 'supervisors', 'office_only')),
  updated_by uuid,
  updated_by_name text,
  updated_at timestamptz not null default now()
);
alter table public.employer_job_done_settings enable row level security;
revoke all on public.employer_job_done_settings from anon, authenticated;
grant select on public.employer_job_done_settings to authenticated;
drop policy if exists "Firm reads its job done settings" on public.employer_job_done_settings;
create policy "Firm reads its job done settings" on public.employer_job_done_settings
  for select to authenticated
  using (employer_id in (select public.my_employer_scope()));
comment on table public.employer_job_done_settings is
  '[EMPLOYER HUB] Who may use "Job done" on site (ELE-2068): crew, supervisors or office only. Scope: employer_id = firm owner. Used by: Worker Tools My Jobs (Job done), Employer Hub Automations. Rule: written only by set_job_done_settings (owner or admin).';

-- ── One row per "Job done" ──────────────────────────────────────────────────
create table if not exists public.employer_job_completions (
  id uuid primary key,                       -- the phone's id (outbox op id)
  employer_id uuid not null,
  job_id uuid not null references public.employer_jobs(id) on delete cascade,
  employee_id uuid references public.employer_employees(id) on delete set null,
  completed_by uuid not null,
  completed_by_name text,
  completed_at timestamptz not null,         -- when the worker tapped Done (phone time)
  received_at timestamptz not null default now(),
  note text,
  photos text[] not null default '{}',
  certificate_status text not null default 'not_needed'
    check (certificate_status in ('linked', 'started', 'not_needed', 'later')),
  certificates jsonb not null default '[]'::jsonb,
  customer_name text,
  customer_signature text,
  customer_signed_at timestamptz,
  customer_absent_reason text,
  extras jsonb not null default '[]'::jsonb,
  extras_net numeric(12, 2) not null default 0,
  variation_order_id uuid,
  invoice_id uuid,
  invoice_state text not null default 'none'
    check (invoice_state in ('drafted', 'existing', 'not_drafted', 'no_basis', 'none')),
  result jsonb not null default '{}'::jsonb
);
create index if not exists employer_job_completions_firm_day
  on public.employer_job_completions (employer_id, completed_at desc);
create index if not exists employer_job_completions_job
  on public.employer_job_completions (job_id);
alter table public.employer_job_completions enable row level security;
revoke all on public.employer_job_completions from anon, authenticated;
grant select on public.employer_job_completions to authenticated;
drop policy if exists "Firm reads its job completions" on public.employer_job_completions;
create policy "Firm reads its job completions" on public.employer_job_completions
  for select to authenticated
  using (employer_id in (select public.my_employer_scope()) or completed_by = auth.uid());
comment on table public.employer_job_completions is
  '[EMPLOYER HUB ← WORKER TOOLS] "Job done" on site (ELE-2068): photos, customer signature, extras agreed on site, certificate state and the invoice it produced. Scope: employer_id = firm owner, job_id → employer_jobs. Used by: Worker Tools My Jobs, Employer Hub Overview (jobs finished today). Rule: written only by complete_job_on_site; id is the phone''s outbox id so a resend is a no-op.';

insert into public.notification_types (type, category, push, importance)
values ('job_done_on_site', 'tasks_projects', true, 1)
on conflict (type) do nothing;

-- ── Helpers ─────────────────────────────────────────────────────────────────

-- Can this signed-in person finish this job on site? Returns the roster row
-- and the reason when not.
create or replace function public._job_done_who(p_job uuid)
returns table (allowed boolean, reason text, employee_id uuid, employee_name text,
               role text, firm uuid)
language plpgsql
stable
security definer
set search_path to 'public'
as $$
declare
  v_a record;
  v_set text;
  v_role text;
begin
  select e.id as employee_id, e.name, e.team_role, e.employer_id, j.user_id as job_firm
    into v_a
    from public.employer_job_assignments a
    join public.employer_employees e on e.id = a.employee_id
    join public.employer_jobs j on j.id = a.job_id
   where a.job_id = p_job
     and e.user_id = auth.uid()
     and lower(coalesce(e.status, '')) = 'active'
     and lower(coalesce(a.status, '')) not in ('completed', 'cancelled', 'removed', 'ended')
     and (a.end_date is null or a.end_date >= current_date)
   order by a.assigned_at desc nulls last
   limit 1;
  if v_a.employee_id is null or v_a.employer_id is distinct from v_a.job_firm then
    return query select false, 'You are not on this job any more.', null::uuid, null::text, null::text, null::uuid;
    return;
  end if;
  v_role := public.employer_access_role(v_a.team_role);
  select s.who_can_finish into v_set from public.employer_job_done_settings s where s.employer_id = v_a.employer_id;
  v_set := coalesce(v_set, 'crew');
  if v_set = 'office_only' then
    return query select false, 'Your firm closes jobs from the office. Use "I''ve finished my part" and they will take it from there.',
      v_a.employee_id, v_a.name, v_role, v_a.employer_id;
  elsif v_set = 'supervisors' and v_role <> 'supervisor' then
    return query select false, 'Your firm has supervisors finish jobs. Use "I''ve finished my part" and your supervisor or the office will close it.',
      v_a.employee_id, v_a.name, v_role, v_a.employer_id;
  elsif v_role not in ('engineer', 'supervisor') then
    return query select false, 'Apprentices and subcontractors can''t close a job. Use "I''ve finished my part" and the office will close it.',
      v_a.employee_id, v_a.name, v_role, v_a.employer_id;
  else
    return query select true, null::text, v_a.employee_id, v_a.name, v_role, v_a.employer_id;
  end if;
end;
$$;
revoke all on function public._job_done_who(uuid) from public, anon, authenticated;

-- ── What the phone needs to run the flow (cached on the phone for offline) ─
create or replace function public.get_job_done_context(p_job uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $$
declare
  w record;
  v_job record;
  v_vat boolean;
  v_last record;
begin
  if auth.uid() is null then
    raise exception 'Not signed in' using errcode = '42501';
  end if;
  select * into w from public._job_done_who(p_job);
  if w.firm is null then
    return jsonb_build_object('allowed', false, 'reason', w.reason);
  end if;

  select j.id, j.title, j.client, j.client_email, j.status, j.value into v_job
    from public.employer_jobs j where j.id = p_job;
  select coalesce(cp.default_vat_registered, false) into v_vat
    from public.company_profiles cp where cp.user_id = w.firm limit 1;
  select c.completed_at, c.completed_by_name into v_last
    from public.employer_job_completions c where c.job_id = p_job
   order by c.completed_at desc limit 1;

  return jsonb_build_object(
    'allowed', w.allowed,
    'reason', w.reason,
    'role', w.role,
    'job', jsonb_build_object('id', v_job.id, 'title', v_job.title, 'client', v_job.client,
                              'status', v_job.status,
                              'has_client_email', nullif(btrim(coalesce(v_job.client_email, '')), '') is not null),
    'closed', lower(coalesce(v_job.status, '')) in ('completed', 'cancelled'),
    'last_completion', case when v_last.completed_at is null then null else
      jsonb_build_object('completed_at', v_last.completed_at, 'by', v_last.completed_by_name) end,
    'completion_outstanding', to_jsonb(public._completion_outstanding(p_job)),
    'vat_registered', coalesce(v_vat, false),
    'draft_invoice_on', public._automation_on(w.firm, 'job_complete_draft_invoice'),
    'review_request_on', public._automation_on(w.firm, 'job_complete_review_request'),
    'certificates', coalesce((
      select jsonb_agg(jsonb_build_object(
               'report_uuid', r.id,
               'report_type', r.report_type,
               'certificate_number', coalesce(r.certificate_number, r.report_id),
               'status', r.status,
               'mine', r.user_id = auth.uid(),
               'qs_status', (select q.status from public.report_qs_reviews q
                              where q.report_uuid = r.id and q.status <> 'cancelled'
                              order by q.created_at desc limit 1))
             order by r.updated_at desc)
        from public.employer_job_certificates l
        join public.reports r on r.id = l.report_uuid and r.deleted_at is null
       where l.job_id = p_job), '[]'::jsonb),
    -- Sell prices only (what the customer pays). Never buy price or markup.
    'price_list', case when not w.allowed then '[]'::jsonb else coalesce((
      select jsonb_agg(x order by lower(x->>'name'))
        from (
          select distinct on (lower(btrim(e.it ->> 'name')))
                 jsonb_build_object(
                   'item_id', coalesce(nullif(e.it ->> 'id', ''), ml.id::text || ':' || e.n::text),
                   'name', btrim(e.it ->> 'name'),
                   'unit', coalesce(nullif(btrim(e.it ->> 'unit'), ''), 'each'),
                   'category', nullif(btrim(e.it ->> 'category'), ''),
                   'price', coalesce(
                     nullif(public._pb_num(e.it, 'estimated_price'), 0),
                     case when coalesce(public._pb_num(e.it, 'cost_price'), 0) > 0
                          then round(public._pb_num(e.it, 'cost_price')
                                     * (1 + coalesce(public._pb_num(e.it, 'markup_percent'), 0) / 100), 2)
                     end)) as x
            from public.materials_lists ml
            cross join lateral jsonb_array_elements(
              case when jsonb_typeof(ml.items) = 'array' then ml.items else '[]'::jsonb end
            ) with ordinality as e(it, n)
           where ml.user_id = w.firm
             and jsonb_typeof(e.it) = 'object'
             and coalesce(btrim(e.it ->> 'name'), '') <> ''
           order by lower(btrim(e.it ->> 'name')), ml.updated_at desc nulls last
        ) s
       where (x->>'price') is not null), '[]'::jsonb) end
  );
end;
$$;
revoke all on function public.get_job_done_context(uuid) from public, anon;
grant execute on function public.get_job_done_context(uuid) to authenticated;

-- ── Job done ────────────────────────────────────────────────────────────────
-- p_payload: {
--   completed_at, note, photos[],
--   certificate: { status: linked|started|not_needed|later },
--   customer: { name, signature (data URL), absent_reason },
--   extras: [{ item_id?, description, quantity, unit, unit_price }]
-- }
create or replace function public.complete_job_on_site(p_id uuid, p_job uuid, p_payload jsonb)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_uid uuid := auth.uid();
  v_done public.employer_job_completions%rowtype;
  w record;
  v_job record;
  v_out text[];
  v_p jsonb := coalesce(p_payload, '{}'::jsonb);
  v_at timestamptz;
  v_note text;
  v_photos text[];
  v_cert_status text;
  v_cust jsonb;
  v_cust_name text;
  v_sig text;
  v_absent text;
  v_extras jsonb := '[]'::jsonb;
  v_line jsonb;
  v_desc text;
  v_qty numeric;
  v_price numeric;
  v_net numeric := 0;
  v_vo uuid;
  v_certs jsonb := '[]'::jsonb;
  r record;
  v_qs jsonb;
  v_comment text;
  v_inv uuid;
  v_inv_row record;
  v_inv_state text := 'none';
  v_vat_rate numeric;
  v_extra_vat numeric;
  v_items jsonb;
  v_hhmm text;
  v_result jsonb;
  v_msg text;
begin
  if v_uid is null then
    raise exception 'Not signed in' using errcode = '42501';
  end if;
  if p_id is null or p_job is null then
    raise exception 'Something was missing. Try again.' using errcode = '22023';
  end if;

  -- A resend of a "Job done" that already landed: the first answer, nothing redone.
  select * into v_done from public.employer_job_completions where id = p_id;
  if found then
    if v_done.completed_by <> v_uid then
      raise exception 'That was not yours' using errcode = '42501';
    end if;
    return v_done.result || jsonb_build_object('already', true);
  end if;

  select * into w from public._job_done_who(p_job);
  if not coalesce(w.allowed, false) then
    raise exception '%', coalesce(w.reason, 'You can''t finish this job.') using errcode = 'P0001';
  end if;

  -- Lock the job: two phones can never both close it.
  select j.id, j.title, j.status, j.user_id, j.client into v_job
    from public.employer_jobs j where j.id = p_job for update;
  if v_job.id is null or v_job.user_id is distinct from w.firm then
    raise exception 'This job is no longer on your list.' using errcode = 'P0001';
  end if;
  if lower(coalesce(v_job.status, '')) = 'cancelled' then
    raise exception 'The office cancelled this job, so it could not be finished.' using errcode = 'P0001';
  end if;
  if lower(coalesce(v_job.status, '')) = 'completed' then
    select c.completed_by_name, c.completed_at into r
      from public.employer_job_completions c where c.job_id = p_job order by c.completed_at desc limit 1;
    raise exception '%', case when r.completed_at is not null
      then 'This job was already finished by ' || coalesce(r.completed_by_name, 'someone else') || ' at '
           || to_char(r.completed_at at time zone 'Europe/London', 'HH24:MI DD Mon') || '. Nothing was sent twice.'
      else 'The office has already closed this job. Tell them about anything you added.' end
      using errcode = 'P0001';
  end if;

  v_out := public._completion_outstanding(p_job);
  if coalesce(array_length(v_out, 1), 0) > 0 then
    raise exception 'Finish the completion checks first: %', array_to_string(v_out, ', ') using errcode = 'P0001';
  end if;

  -- ── What the phone sent ───────────────────────────────────────────────────
  v_at := least(coalesce(nullif(v_p->>'completed_at', '')::timestamptz, now()), now());
  v_note := nullif(btrim(coalesce(v_p->>'note', '')), '');
  if length(coalesce(v_note, '')) > 4000 then
    raise exception 'Keep the note under 4,000 characters.' using errcode = '22023';
  end if;
  v_photos := coalesce(array(select jsonb_array_elements_text(
                case when jsonb_typeof(v_p->'photos') = 'array' then v_p->'photos' else '[]'::jsonb end)), '{}');
  if coalesce(array_length(v_photos, 1), 0) > 20 then
    raise exception 'Up to 20 photos.' using errcode = '22023';
  end if;
  if exists (select 1 from unnest(v_photos) p where p not like v_uid::text || '/%') then
    raise exception 'You can only attach photos you took.' using errcode = '42501';
  end if;

  v_cert_status := coalesce(nullif(v_p #>> '{certificate,status}', ''), 'not_needed');
  if v_cert_status not in ('linked', 'started', 'not_needed', 'later') then
    v_cert_status := 'not_needed';
  end if;

  v_cust := coalesce(v_p->'customer', '{}'::jsonb);
  v_cust_name := nullif(btrim(coalesce(v_cust->>'name', '')), '');
  v_sig := nullif(v_cust->>'signature', '');
  v_absent := nullif(btrim(coalesce(v_cust->>'absent_reason', '')), '');
  if v_sig is not null and (v_sig not like 'data:image/%' or length(v_sig) > 400000) then
    raise exception 'The signature could not be read. Ask the customer to sign again.' using errcode = '22023';
  end if;
  if v_sig is not null and v_cust_name is null then
    raise exception 'Add the name of the person who signed.' using errcode = '22023';
  end if;
  if v_sig is null and v_absent is null then
    raise exception 'Get the customer to sign, or say why they could not.' using errcode = '22023';
  end if;

  for v_line in select * from jsonb_array_elements(
      case when jsonb_typeof(v_p->'extras') = 'array' then v_p->'extras' else '[]'::jsonb end)
  loop
    v_desc := nullif(btrim(coalesce(v_line->>'description', '')), '');
    v_qty := nullif(v_line->>'quantity', '')::numeric;
    v_price := nullif(v_line->>'unit_price', '')::numeric;
    if v_desc is null or v_qty is null or v_price is null then
      raise exception 'Each extra needs a description, a quantity and a price.' using errcode = '22023';
    end if;
    if v_qty <= 0 or v_qty > 10000 or v_price < 0 or v_price > 100000 or length(v_desc) > 200 then
      raise exception 'Check the quantities and prices on the extras.' using errcode = '22023';
    end if;
    v_extras := v_extras || jsonb_build_array(jsonb_build_object(
      'item_id', nullif(v_line->>'item_id', ''),
      'description', v_desc,
      'quantity', v_qty,
      'unit', coalesce(nullif(btrim(coalesce(v_line->>'unit', '')), ''), 'each'),
      'unit_price', round(v_price, 2),
      'total', round(v_qty * v_price, 2)));
    v_net := v_net + round(v_qty * v_price, 2);
  end loop;
  if jsonb_array_length(v_extras) > 30 then
    raise exception 'Up to 30 extras.' using errcode = '22023';
  end if;
  if jsonb_array_length(v_extras) > 0 and v_sig is null then
    raise exception 'The customer has to sign to agree the extra work.' using errcode = 'P0001';
  end if;

  -- ── Record it ─────────────────────────────────────────────────────────────
  insert into public.employer_job_completions (
    id, employer_id, job_id, employee_id, completed_by, completed_by_name, completed_at, note, photos,
    certificate_status, customer_name, customer_signature, customer_signed_at, customer_absent_reason,
    extras, extras_net)
  values (
    p_id, w.firm, p_job, w.employee_id, v_uid, w.employee_name, v_at, v_note, v_photos,
    v_cert_status, coalesce(v_cust_name, v_job.client), v_sig, case when v_sig is not null then v_at end, v_absent,
    v_extras, v_net);

  -- Extras: one variation order, approved by the customer's signature.
  if jsonb_array_length(v_extras) > 0 then
    insert into public.variation_orders (job_id, user_id, description, value, status, approved_by, approved_date, notes)
    values (
      p_job, w.firm,
      left('Extra work agreed on site: ' || (select string_agg(
             (x->>'description') || case when (x->>'quantity')::numeric <> 1
               then ' × ' || trim(to_char((x->>'quantity')::numeric, 'FM999990.##')) else '' end, '; ')
             from jsonb_array_elements(v_extras) x), 4000),
      v_net, 'Approved', v_cust_name, (v_at at time zone 'Europe/London')::date,
      'Agreed and signed by ' || v_cust_name || ' on ' || coalesce(w.employee_name, 'the engineer') || '''s phone (Job done).')
    returning id into v_vo;
  end if;

  -- The worker's completed certificates for this job go to QS review (once).
  for r in
    select rp.id, rp.report_type, coalesce(rp.certificate_number, rp.report_id) as num, rp.status, rp.user_id
      from public.employer_job_certificates l
      join public.reports rp on rp.id = l.report_uuid and rp.deleted_at is null
     where l.job_id = p_job
  loop
    v_qs := null;
    if r.user_id = v_uid and r.status = 'completed'
       and not exists (select 1 from public.report_qs_reviews q
                        where q.report_uuid = r.id and q.status in ('pending', 'approved')) then
      begin
        v_qs := public.submit_report_for_qs_review(r.id, 'Sent from Job done on site');
        v_certs := v_certs || jsonb_build_array(jsonb_build_object(
          'report_uuid', r.id, 'type', r.report_type, 'number', r.num, 'qs', 'sent'));
      exception when others then
        v_certs := v_certs || jsonb_build_array(jsonb_build_object(
          'report_uuid', r.id, 'type', r.report_type, 'number', r.num, 'qs', 'not_sent',
          'why', left(sqlerrm, 120)));
      end;
    else
      v_certs := v_certs || jsonb_build_array(jsonb_build_object(
        'report_uuid', r.id, 'type', r.report_type, 'number', r.num,
        'qs', coalesce((select q.status from public.report_qs_reviews q
                         where q.report_uuid = r.id and q.status <> 'cancelled'
                         order by q.created_at desc limit 1),
                       case when r.status = 'completed' then 'not_sent' else 'not_finished' end)));
    end if;
  end loop;

  -- The job feed: one progress note with the photos (no extra bell).
  v_comment := 'Job done on site'
    || coalesce(': ' || rtrim(v_note, '. ') || '.', '.')
    || case when v_sig is not null then ' Signed off by ' || v_cust_name || '.'
            else ' Customer did not sign: ' || v_absent || '.' end
    || case when v_net > 0 then ' Extra work agreed: £' || trim(to_char(v_net, 'FM999999990.00')) || ' (variation).' else '' end;
  perform set_config('elecmate.skip_progress_bell', 'on', true);
  insert into public.employer_job_comments (job_id, author_name, comment_type, content, photos)
  values (p_job, w.employee_name, 'progress', left(v_comment, 4000), v_photos);
  perform set_config('elecmate.skip_progress_bell', 'off', true);

  update public.employer_job_assignments a
     set finished_at = coalesce(a.finished_at, now()),
         finished_note = coalesce(a.finished_note, v_note)
    from public.employer_employees e
   where a.job_id = p_job and e.id = a.employee_id and e.id = w.employee_id;

  -- Close the job. The existing automations run from this (at most once each).
  update public.employer_jobs
     set status = 'Completed', board_stage = 'Complete', progress = 100, updated_at = now()
   where id = p_job;

  -- The invoice the existing "Draft the invoice" automation made for this job.
  select (ar.detail->>'invoice_id')::uuid into v_inv
    from public.employer_automation_runs ar
   where ar.employer_id = w.firm and ar.rule_key = 'job_complete_draft_invoice'
     and ar.ref = p_job::text and ar.status = 'done';
  if v_inv is not null then
    v_inv_state := 'drafted';
  else
    select q.id into v_inv from public.quotes q
     where q.employer_job_id = p_job and q.invoice_raised and q.deleted_at is null
     order by q.created_at desc limit 1;
    v_inv_state := case
      when v_inv is not null then 'existing'
      when public._automation_on(w.firm, 'job_complete_draft_invoice') then 'no_basis'
      else 'not_drafted' end;
  end if;

  -- Extras go onto a draft invoice as variation lines (never onto a sent one).
  if v_inv is not null and v_net > 0 then
    select q.id, q.invoice_status, q.settings, q.items into v_inv_row
      from public.quotes q where q.id = v_inv for update;
    if lower(coalesce(v_inv_row.invoice_status, '')) = 'draft'
       and not exists (select 1 from jsonb_array_elements(
                         case when jsonb_typeof(v_inv_row.items) = 'array' then v_inv_row.items else '[]'::jsonb end) it
                        where it->>'variationId' = v_vo::text) then
      v_vat_rate := case when coalesce((v_inv_row.settings->>'reverseCharge')::boolean, false) then 0
                         else coalesce(nullif(v_inv_row.settings->>'vatRate', '')::numeric, 0) end;
      v_extra_vat := round(v_net * v_vat_rate / 100, 2);
      select coalesce(jsonb_agg(jsonb_build_object(
               'id', gen_random_uuid(),
               'description', 'Extra (agreed on site): ' || (x->>'description'),
               'quantity', (x->>'quantity')::numeric,
               'unit', x->>'unit',
               'unitPrice', (x->>'unit_price')::numeric,
               'total', (x->>'total')::numeric,
               'totalPrice', (x->>'total')::numeric,
               'category', case when x->>'item_id' is not null then 'materials' else 'manual' end,
               'type', case when x->>'item_id' is not null then 'materials' else 'manual' end,
               'subcategory', 'variation',
               'variationId', v_vo,
               'notes', 'Agreed and signed by ' || v_cust_name || ' on site')), '[]'::jsonb)
        into v_items from jsonb_array_elements(v_extras) x;
      update public.quotes
         set items = (case when jsonb_typeof(items) = 'array' then items else '[]'::jsonb end) || v_items,
             subtotal = coalesce(subtotal, 0) + v_net,
             vat_amount = coalesce(vat_amount, 0) + v_extra_vat,
             total = coalesce(total, 0) + v_net + v_extra_vat,
             invoice_notes = concat_ws(E'\n', nullif(invoice_notes, ''),
               'Includes extra work agreed and signed for on site by ' || v_cust_name || '.'),
             updated_at = now()
       where id = v_inv;
    end if;
  end if;

  v_result := jsonb_build_object(
    'id', p_id,
    'job_id', p_job,
    'completed_at', v_at,
    'invoice_state', v_inv_state,
    'invoice_id', v_inv,
    'invoice_number', (select q.invoice_number from public.quotes q where q.id = v_inv),
    'variation_id', v_vo,
    'extras_net', v_net,
    'certificates', v_certs,
    'review_request', exists (select 1 from public.employer_automation_runs ar
                               where ar.employer_id = w.firm and ar.rule_key = 'job_complete_review_request'
                                 and ar.ref = p_job::text and ar.status in ('queued', 'sending', 'done')),
    'already', false);

  update public.employer_job_completions
     set certificates = v_certs, variation_order_id = v_vo, invoice_id = v_inv,
         invoice_state = v_inv_state, result = v_result
   where id = p_id;

  v_hhmm := to_char(v_at at time zone 'Europe/London', 'HH24:MI');
  v_msg := coalesce(nullif(btrim(w.employee_name), ''), 'The engineer') || ' finished it on site at ' || v_hhmm
    || case when v_sig is not null then ', signed off by ' || v_cust_name else ', not signed by the customer' end
    || '. '
    || case v_inv_state
         when 'drafted' then 'Invoice ' || coalesce((v_result->>'invoice_number'), '') || ' is drafted and ready to check and send.'
         when 'existing' then 'The job already had an invoice.'
         when 'no_basis' then 'No invoice drafted: the job has no accepted quote or value.'
         else 'Ready to invoice.' end
    || case when v_net > 0 then ' Extras agreed on site: £' || trim(to_char(v_net, 'FM999999990.00')) || '.' else '' end;
  perform public.notify_employer_bell(
    w.firm, 'job_done_on_site',
    'Job done: ' || coalesce(nullif(btrim(v_job.title), ''), 'a job'),
    v_msg,
    jsonb_build_object('route', '/employer?section=jobs&job=' || p_job,
                       'job_id', p_job, 'employee_id', w.employee_id,
                       'completion_id', p_id, 'invoice_id', v_inv));

  return v_result;
end;
$$;
revoke all on function public.complete_job_on_site(uuid, uuid, jsonb) from public, anon;
grant execute on function public.complete_job_on_site(uuid, uuid, jsonb) to authenticated;

-- ── The boss's Overview: "3 jobs finished today, 2 invoices ready" ─────────
create or replace function public.get_firm_jobs_done_today(p_firm uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $$
declare
  v_from timestamptz := date_trunc('day', now() at time zone 'Europe/London') at time zone 'Europe/London';
  v_money boolean;
begin
  if auth.uid() is null or p_firm is null or p_firm not in (select public.my_employer_scope()) then
    return jsonb_build_object('finished_today', 0, 'invoices_ready', 0, 'jobs', '[]'::jsonb);
  end if;
  v_money := public.can_see_firm_money(p_firm);
  return (
    with done as (
      select c.*, j.title,
             (select q.invoice_status from public.quotes q where q.id = c.invoice_id and q.deleted_at is null) as inv_status,
             (select q.invoice_number from public.quotes q where q.id = c.invoice_id and q.deleted_at is null) as inv_number
        from public.employer_job_completions c
        join public.employer_jobs j on j.id = c.job_id
       where c.employer_id = p_firm and c.completed_at >= v_from
    )
    select jsonb_build_object(
      'finished_today', (select count(*) from done),
      -- Drafts waiting to be sent, from today's Job done (owner/admin only: it is money).
      'invoices_ready', case when v_money then
        (select count(*) from done where lower(coalesce(inv_status, '')) = 'draft') else null end,
      'to_invoice', case when v_money then
        (select count(*) from done where invoice_state = 'not_drafted') else null end,
      'jobs', coalesce((select jsonb_agg(jsonb_build_object(
                 'job_id', d.job_id, 'title', d.title, 'by', d.completed_by_name,
                 'completed_at', d.completed_at,
                 'signed', d.customer_signature is not null,
                 'invoice_state', case when v_money then d.invoice_state end,
                 'invoice_id', case when v_money then d.invoice_id end,
                 'invoice_number', case when v_money then d.inv_number end,
                 'invoice_status', case when v_money then d.inv_status end)
               order by d.completed_at desc) from done d), '[]'::jsonb)));
end;
$$;
revoke all on function public.get_firm_jobs_done_today(uuid) from public, anon;
grant execute on function public.get_firm_jobs_done_today(uuid) to authenticated;

-- ── Settings (owner or admin) ──────────────────────────────────────────────
create or replace function public.get_job_done_settings(p_firm uuid)
returns jsonb
language sql
stable
security definer
set search_path to 'public'
as $$
  select case when auth.uid() is null or p_firm is null or p_firm not in (select public.my_employer_scope())
    then null else jsonb_build_object(
      'who_can_finish', coalesce(s.who_can_finish, 'crew'),
      'updated_by_name', s.updated_by_name,
      'updated_at', s.updated_at,
      'can_change', public.can_see_firm_money(p_firm),
      'draft_invoice_on', public._automation_on(p_firm, 'job_complete_draft_invoice'),
      'review_request_on', public._automation_on(p_firm, 'job_complete_review_request'))
  end
  from (select 1) one
  left join public.employer_job_done_settings s on s.employer_id = p_firm
$$;
revoke all on function public.get_job_done_settings(uuid) from public, anon;
grant execute on function public.get_job_done_settings(uuid) to authenticated;

create or replace function public.set_job_done_settings(p_firm uuid, p_who text)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $$
declare v_name text;
begin
  if auth.uid() is null or p_firm is null or not public.can_see_firm_money(p_firm) then
    raise exception 'Only the owner or an admin can change this' using errcode = '42501';
  end if;
  if p_who not in ('crew', 'supervisors', 'office_only') then
    raise exception 'Unknown choice' using errcode = '22023';
  end if;
  select coalesce(nullif(p.full_name, ''), 'Office') into v_name from public.profiles p where p.id = auth.uid();
  insert into public.employer_job_done_settings (employer_id, who_can_finish, updated_by, updated_by_name, updated_at)
  values (p_firm, p_who, auth.uid(), v_name, now())
  on conflict (employer_id) do update
    set who_can_finish = excluded.who_can_finish, updated_by = excluded.updated_by,
        updated_by_name = excluded.updated_by_name, updated_at = now();
  return public.get_job_done_settings(p_firm);
end;
$$;
revoke all on function public.set_job_done_settings(uuid, text) from public, anon;
grant execute on function public.set_job_done_settings(uuid, text) to authenticated;
