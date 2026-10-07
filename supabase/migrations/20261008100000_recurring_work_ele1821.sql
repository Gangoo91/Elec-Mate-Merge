-- ELE-1821 — Recurring work in the Employer Hub, on the ELE-430 contract engine.
--
-- One scheduler, not two: maintenance_contracts + the nightly
-- generate_maintenance_contract_visits (cron 163). A contract made from a firm
-- job (source_job_id) now produces the next FIRM job — same client, site and
-- notes, the same crew when asked — instead of a personal task. Contracts made
-- in the Electrical Hub behave exactly as before.
--
-- Also fixed here: the generator wrote its draft invoice into the legacy
-- `invoices` table, which no invoice screen reads. Invoices live in `quotes`
-- (invoice_raised). Latent — 0 contracts existed when this shipped.
--
-- Certificates drive renewals: get_firm_renewals lists EICR/EIC re-test dates
-- for the firm's own certificates and every certificate that went through the
-- firm's QS review; book_renewal_as_job turns one into a firm job (and,
-- optionally, a recurring contract at the certificate's own interval).

-- 1. Columns ---------------------------------------------------------------
alter table public.maintenance_contracts
  add column if not exists source_job_id uuid references public.employer_jobs(id) on delete set null,
  add column if not exists same_crew boolean not null default true;

alter table public.maintenance_contract_visits
  add column if not exists employer_job_id uuid references public.employer_jobs(id) on delete set null;

alter table public.employer_jobs
  add column if not exists recurring_contract_id uuid references public.maintenance_contracts(id) on delete set null,
  add column if not exists previous_visit_job_id uuid references public.employer_jobs(id) on delete set null;

alter table public.certificate_expiry_reminders
  add column if not exists employer_job_id uuid references public.employer_jobs(id) on delete set null;

create unique index if not exists maintenance_contracts_one_active_per_job
  on public.maintenance_contracts (source_job_id)
  where source_job_id is not null and status <> 'ended';
create index if not exists employer_jobs_recurring_contract_idx
  on public.employer_jobs (recurring_contract_id) where recurring_contract_id is not null;

comment on column public.maintenance_contracts.source_job_id is
  'ELE-1821: the firm job this contract repeats. Set = the nightly generator creates the next employer_jobs row (not a spark task).';
comment on column public.employer_jobs.recurring_contract_id is
  'ELE-1821: the maintenance contract that created this visit, or that this job repeats from.';
comment on column public.employer_jobs.previous_visit_job_id is
  'ELE-1821: the last visit of the same contract — Worker Tools shows its notes as "Last visit".';

-- Firm managers see the firm's contract visits (contracts already have a firm policy).
drop policy if exists "Firm managers read maintenance_contract_visits" on public.maintenance_contract_visits;
create policy "Firm managers read maintenance_contract_visits" on public.maintenance_contract_visits
  for select to authenticated
  using (user_id in (select public.my_employer_scope()));

-- 2. The generator ----------------------------------------------------------
create or replace function public.generate_maintenance_contract_visits()
returns void
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  c record;
  v_visit_id uuid;
  v_task_id uuid;
  v_invoice_id uuid;
  v_job_id uuid;
  v_prev_job uuid;
  v_src record;
  v_client jsonb;
  v_new_due date;
  v_due_at timestamptz;
  v_number text;
  v_crew int;
begin
  for c in
    select mc.*, cu.name as cust_name, cu.email as cust_email, cu.phone as cust_phone, cu.address as cust_address
    from public.maintenance_contracts mc
    left join public.customers cu on cu.id = mc.customer_id
    where mc.status = 'active'
      and mc.next_due_date <= current_date + mc.reminder_days_before
  loop
    begin
      v_visit_id := null; v_task_id := null; v_invoice_id := null; v_job_id := null; v_crew := 0;
      v_due_at := (c.next_due_date + time '09:00') at time zone 'Europe/London';

      insert into public.maintenance_contract_visits (contract_id, user_id, due_date)
      values (c.id, c.user_id, c.next_due_date)
      on conflict (contract_id, due_date) do nothing
      returning id into v_visit_id;

      if v_visit_id is not null then
        select j.* into v_src from public.employer_jobs j where j.id = c.source_job_id;

        if c.source_job_id is not null and v_src.id is not null then
          -- Firm contract: the next visit is a firm job, scheduled on the due date.
          select j.id into v_prev_job from public.employer_jobs j
           where j.recurring_contract_id = c.id and j.id <> c.source_job_id
           order by j.start_date desc nulls last, j.created_at desc limit 1;
          v_prev_job := coalesce(v_prev_job, c.source_job_id);

          insert into public.employer_jobs (
            user_id, title, client, client_id, customer_id, location, lat, lng,
            client_phone, client_email, site_contact_name, site_contact_phone, access_notes,
            share_client_contact_with_crew, description, job_type, quoted_hours, value,
            start_date, end_date, board_stage, status, progress,
            recurring_contract_id, previous_visit_job_id)
          values (
            v_src.user_id, coalesce(nullif(btrim(c.job_type), ''), v_src.title), v_src.client, v_src.client_id,
            v_src.customer_id, v_src.location, v_src.lat, v_src.lng,
            v_src.client_phone, v_src.client_email, v_src.site_contact_name, v_src.site_contact_phone,
            v_src.access_notes, v_src.share_client_contact_with_crew,
            coalesce(c.description, v_src.description), v_src.job_type, v_src.quoted_hours,
            coalesce(c.default_invoice_amount, v_src.value),
            c.next_due_date, c.next_due_date, 'Scheduled', 'Active', 0,
            c.id, v_prev_job)
          returning id into v_job_id;

          if c.same_crew then
            insert into public.employer_job_assignments (job_id, employee_id, start_date, end_date, status, assigned_by, role_on_job, start_time, hours_per_day)
            select v_job_id, a.employee_id, c.next_due_date, c.next_due_date, 'assigned', 'Recurring visit',
                   a.role_on_job, a.start_time, a.hours_per_day
              from (select distinct on (a.employee_id) a.*
                      from public.employer_job_assignments a
                     where a.job_id = v_prev_job
                     order by a.employee_id, a.created_at desc) a
              join public.employer_employees e on e.id = a.employee_id
             where lower(coalesce(e.status, '')) = 'active';
            get diagnostics v_crew = row_count;
          end if;

          perform public.notify_employer_bell(
            c.user_id, 'recurring_visit',
            'Recurring visit booked: ' || coalesce(nullif(btrim(c.job_type), ''), v_src.title),
            coalesce(v_src.client, c.customer_name, 'Client') || ' on ' || to_char(c.next_due_date, 'Dy DD Mon')
              || case when v_crew > 0 then ' with the same crew' else '. No one assigned yet' end,
            jsonb_build_object('contract_id', c.id, 'job_id', v_job_id,
              'route', '/employer?section=jobs&job=' || v_job_id));
        else
          insert into public.spark_tasks (user_id, title, details, status, priority, due_at, customer_id, tags)
          values (
            c.user_id,
            c.job_type || ' due — ' || coalesce(c.cust_name, c.customer_name),
            coalesce('Maintenance contract visit.' || case when c.description is not null then E'\n\n' || c.description else '' end, ''),
            'open', 'normal', v_due_at, c.customer_id, array['maintenance'])
          returning id into v_task_id;
        end if;

        if c.auto_create_invoice and coalesce(c.default_invoice_amount, 0) > 0 then
          v_client := jsonb_strip_nulls(jsonb_build_object(
            'name', coalesce(c.cust_name, c.customer_name, v_src.client),
            'email', coalesce(c.cust_email, v_src.client_email),
            'phone', coalesce(c.cust_phone, v_src.client_phone),
            'address', coalesce(c.cust_address, v_src.location),
            'customerId', c.customer_id));
          begin
            -- Invoices live in `quotes` (invoice_raised), numbered from the shared counter.
            v_number := public.format_document_number(c.user_id, 'invoice', public.next_document_number_for(c.user_id, 'invoice'));
            insert into public.quotes (
              user_id, quote_number, invoice_number, status, invoice_raised, invoice_status,
              invoice_date, invoice_due_date, client_data, items, subtotal, total,
              settings, customer_id, employer_job_id, expiry_date)
            values (
              c.user_id, v_number, v_number, 'approved', true, 'draft',
              c.next_due_date::timestamptz, (c.next_due_date + 14)::timestamptz,
              v_client,
              jsonb_build_array(jsonb_build_object(
                'id', gen_random_uuid(),
                'description', c.job_type || ' — ' || to_char(c.next_due_date, 'DD Mon YYYY'),
                'quantity', 1, 'unit', 'each',
                'unitPrice', c.default_invoice_amount,
                'totalPrice', c.default_invoice_amount,
                'category', 'manual')),
              c.default_invoice_amount, c.default_invoice_amount,
              jsonb_build_object('paymentTerms', '14 days'),
              c.customer_id, v_job_id, (c.next_due_date + 30)::timestamptz)
            returning id into v_invoice_id;
          exception when others then
            raise warning 'maintenance contract % draft invoice failed: %', c.id, sqlerrm;
          end;
        end if;

        update public.maintenance_contract_visits
           set task_id = v_task_id, invoice_id = v_invoice_id, employer_job_id = v_job_id
         where id = v_visit_id;

        if v_job_id is null then
          insert into public.user_notifications (user_id, type, title, message, link, metadata)
          values (
            c.user_id, 'maintenance_visit',
            c.job_type || ' due ' || to_char(c.next_due_date, 'DD Mon'),
            coalesce(c.cust_name, c.customer_name) || ' — maintenance contract visit'
              || case when v_invoice_id is not null then '. Draft invoice ready.' else '' end,
            '/electrician/tasks',
            jsonb_build_object('contract_id', c.id, 'visit_id', v_visit_id));
        end if;
      end if;

      v_new_due := public.mc_next_occurrence(c.next_due_date, c.frequency, c.frequency_custom_days);
      while v_new_due <= current_date loop
        v_new_due := public.mc_next_occurrence(v_new_due, c.frequency, c.frequency_custom_days);
      end loop;

      if c.end_date is not null and v_new_due > c.end_date then
        update public.maintenance_contracts
           set status = 'ended', last_generated_at = now(), updated_at = now()
         where id = c.id;
      else
        update public.maintenance_contracts
           set next_due_date = v_new_due, last_generated_at = now(), updated_at = now()
         where id = c.id;
      end if;
    exception when others then
      raise warning 'maintenance contract % generation failed: %', c.id, sqlerrm;
    end;
  end loop;
end;
$function$;
revoke all on function public.generate_maintenance_contract_visits() from public, anon, authenticated;

-- 3. Make a firm job recurring ---------------------------------------------
create or replace function public.set_job_recurring(
  p_job uuid,
  p_frequency text,
  p_next_due date,
  p_custom_days integer default null,
  p_lead_days integer default 14,
  p_end_date date default null,
  p_same_crew boolean default true,
  p_title text default null,
  p_auto_invoice boolean default false,
  p_amount numeric default null)
returns uuid
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_job record;
  v_id uuid;
  v_money boolean;
begin
  select * into v_job from public.employer_jobs where id = p_job;
  if v_job.id is null or v_job.user_id not in (select public.my_employer_scope()) then
    raise exception 'Job not found';
  end if;
  if p_frequency not in ('weekly','monthly','quarterly','six_monthly','annually','two_yearly','three_yearly','five_yearly','custom') then
    raise exception 'Pick how often it repeats';
  end if;
  if p_frequency = 'custom' and coalesce(p_custom_days, 0) < 1 then
    raise exception 'Enter how many days between visits';
  end if;
  if p_next_due is null or p_next_due < current_date then
    raise exception 'The next visit must be today or later';
  end if;
  if p_end_date is not null and p_end_date < p_next_due then
    raise exception 'The end date is before the next visit';
  end if;
  v_money := public.can_see_firm_money(v_job.user_id);

  select id into v_id from public.maintenance_contracts
   where source_job_id = p_job and status <> 'ended';

  if v_id is null then
    insert into public.maintenance_contracts (
      user_id, customer_id, customer_name, job_type, description, frequency, frequency_custom_days,
      start_date, end_date, next_due_date, reminder_days_before, auto_create_invoice,
      default_invoice_amount, auto_email_customer, client_type, status, source_job_id, same_crew)
    values (
      v_job.user_id, v_job.customer_id, coalesce(v_job.client, 'Client'),
      coalesce(nullif(btrim(p_title), ''), v_job.title), v_job.description,
      p_frequency, case when p_frequency = 'custom' then p_custom_days end,
      p_next_due, p_end_date, p_next_due, greatest(0, least(coalesce(p_lead_days, 14), 90)),
      case when v_money then coalesce(p_auto_invoice, false) else false end,
      case when v_money then p_amount end,
      false, 'business', 'active', p_job, coalesce(p_same_crew, true))
    returning id into v_id;
  else
    update public.maintenance_contracts set
      job_type = coalesce(nullif(btrim(p_title), ''), job_type),
      frequency = p_frequency,
      frequency_custom_days = case when p_frequency = 'custom' then p_custom_days end,
      next_due_date = p_next_due,
      end_date = p_end_date,
      reminder_days_before = greatest(0, least(coalesce(p_lead_days, 14), 90)),
      same_crew = coalesce(p_same_crew, true),
      auto_create_invoice = case when v_money then coalesce(p_auto_invoice, false) else auto_create_invoice end,
      default_invoice_amount = case when v_money then p_amount else default_invoice_amount end,
      status = 'active',
      updated_at = now()
    where id = v_id;
  end if;

  update public.employer_jobs set recurring_contract_id = v_id where id = p_job;
  return v_id;
end;
$function$;
revoke all on function public.set_job_recurring(uuid,text,date,integer,integer,date,boolean,text,boolean,numeric) from public, anon;
grant execute on function public.set_job_recurring(uuid,text,date,integer,integer,date,boolean,text,boolean,numeric) to authenticated;

create or replace function public.set_recurring_status(p_contract uuid, p_status text)
returns void
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  if p_status not in ('active','paused','ended') then raise exception 'Unknown status'; end if;
  update public.maintenance_contracts
     set status = p_status, updated_at = now(),
         -- Resuming never back-fills missed visits: the next one is today or later.
         next_due_date = case when p_status = 'active' and next_due_date < current_date
                              then current_date else next_due_date end
   where id = p_contract and user_id in (select public.my_employer_scope());
  if not found then raise exception 'Contract not found'; end if;
end;
$function$;
revoke all on function public.set_recurring_status(uuid,text) from public, anon;
grant execute on function public.set_recurring_status(uuid,text) to authenticated;

-- 4. The firm's recurring list ---------------------------------------------
create or replace function public.get_firm_recurring(p_firm uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $function$
declare
  v_money boolean;
begin
  if p_firm is null or p_firm not in (select public.my_employer_scope()) then
    raise exception 'Not allowed';
  end if;
  v_money := public.can_see_firm_money(p_firm);
  return coalesce((
    select jsonb_agg(row_to_json(x) order by (x.status = 'ended'), x.next_due_date)
    from (
      select mc.id, mc.job_type as title, coalesce(sj.client, mc.customer_name) as client,
             sj.location, mc.frequency, mc.frequency_custom_days, mc.next_due_date, mc.end_date,
             mc.reminder_days_before, mc.status, mc.same_crew, mc.source_job_id,
             mc.auto_create_invoice,
             case when v_money then mc.default_invoice_amount end as amount,
             (select coalesce(jsonb_agg(distinct e.name), '[]'::jsonb)
                from public.employer_job_assignments a
                join public.employer_employees e on e.id = a.employee_id
               where a.job_id = coalesce(
                       (select j.id from public.employer_jobs j
                         where j.recurring_contract_id = mc.id and j.id <> mc.source_job_id
                         order by j.start_date desc nulls last limit 1), mc.source_job_id)
                 and lower(coalesce(e.status,'')) = 'active') as crew,
             (select jsonb_build_object('id', j.id, 'date', j.start_date, 'status', j.status)
                from public.employer_jobs j
               where j.recurring_contract_id = mc.id and j.id <> mc.source_job_id
               order by j.start_date desc nulls last limit 1) as last_visit,
             (select count(*) from public.maintenance_contract_visits v where v.contract_id = mc.id) as visits
        from public.maintenance_contracts mc
        left join public.employer_jobs sj on sj.id = mc.source_job_id
       where mc.user_id = p_firm and mc.source_job_id is not null
    ) x), '[]'::jsonb);
end;
$function$;
revoke all on function public.get_firm_recurring(uuid) from public, anon;
grant execute on function public.get_firm_recurring(uuid) to authenticated;

-- 5. Certificate renewals for the firm --------------------------------------
-- The firm's certificates: issued by the owner/managers acting for the firm,
-- plus anything a team member sent through the firm's QS review.
create or replace function public.get_firm_renewals(p_firm uuid, p_days integer default 120)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $function$
begin
  if p_firm is null or p_firm not in (select public.my_employer_scope()) then
    raise exception 'Not allowed';
  end if;
  return coalesce((
    select jsonb_agg(row_to_json(x) order by x.expiry_date)
    from (
      select distinct on (c.id)
             c.id, c.report_id, r.report_type, r.report_id as report_ref, c.certificate_number,
             c.client_name, c.installation_address, c.inspection_date, c.expiry_date,
             c.reminder_status, c.contacted_at, c.booked_for_date, c.customer_id,
             c.employer_job_id,
             (c.expiry_date < current_date) as overdue,
             case when r.user_id = p_firm then null else (select e.name from public.employer_employees e
                     where e.employer_id = p_firm and e.user_id = r.user_id limit 1) end as done_by
        from public.certificate_expiry_reminders c
        join public.reports r on r.id = c.report_id and r.deleted_at is null
       where c.reminder_status = 'pending'
         and c.expiry_date <= current_date + greatest(7, least(coalesce(p_days, 120), 730))
         and (r.user_id = p_firm
              or exists (select 1 from public.report_qs_reviews q
                          where q.employer_id = p_firm and q.status = 'approved'
                            and (q.report_uuid = r.id or q.report_id = r.report_id)))
       order by c.id
    ) x), '[]'::jsonb);
end;
$function$;
revoke all on function public.get_firm_renewals(uuid,integer) from public, anon;
grant execute on function public.get_firm_renewals(uuid,integer) to authenticated;

-- Book a renewal as a firm job; optionally keep it coming at the certificate's interval.
create or replace function public.book_renewal_as_job(
  p_firm uuid,
  p_reminder uuid,
  p_date date default null,
  p_make_recurring boolean default false)
returns uuid
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_ok boolean;
  c record;
  v_job uuid;
  v_type text;
  v_years numeric;
  v_freq text;
  v_date date;
begin
  if p_firm is null or p_firm not in (select public.my_employer_scope()) then
    raise exception 'Not allowed';
  end if;
  select ce.*, r.report_type, r.user_id as cert_owner, r.report_id as report_ref
    into c
    from public.certificate_expiry_reminders ce
    join public.reports r on r.id = ce.report_id
   where ce.id = p_reminder;
  if c.id is null then raise exception 'Renewal not found'; end if;
  v_ok := c.cert_owner = p_firm or exists (
    select 1 from public.report_qs_reviews q
     where q.employer_id = p_firm and q.status = 'approved'
       and (q.report_uuid = c.report_id or q.report_id = c.report_ref));
  if not v_ok then raise exception 'Renewal not found'; end if;
  if c.employer_job_id is not null and exists (select 1 from public.employer_jobs where id = c.employer_job_id and archived_at is null) then
    return c.employer_job_id;
  end if;

  v_type := lower(coalesce(nullif(btrim(c.report_type), ''), 'eicr'));
  v_type := case when v_type like 'eicr%' then 'EICR'
                 when v_type like 'eic%' then 'EIC'
                 when v_type like 'pat%' then 'PAT'
                 when v_type like 'ev%' then 'EV charger'
                 else upper(left(v_type, 1)) || substr(replace(replace(v_type, '-', ' '), '_', ' '), 2) end;
  v_date := coalesce(p_date, greatest(current_date, c.expiry_date - 14));

  insert into public.employer_jobs (user_id, title, client, customer_id, location, description,
                                    job_type, start_date, end_date, board_stage, status, progress)
  values (p_firm, v_type || ' re-test', coalesce(c.client_name, 'Client'), c.customer_id,
          coalesce(nullif(btrim(c.installation_address), ''), 'Address to confirm'),
          'Periodic re-test. Last certificate ' || coalesce(c.certificate_number, '') ||
            coalesce(' on ' || to_char(c.inspection_date, 'DD Mon YYYY'), '') ||
            ', due ' || to_char(c.expiry_date, 'DD Mon YYYY') || '.',
          v_type, v_date, v_date, 'Scheduled', 'Active', 0)
  returning id into v_job;

  update public.certificate_expiry_reminders
     set employer_job_id = v_job, booked_for_date = v_date,
         contacted_at = coalesce(contacted_at, now()), updated_at = now()
   where id = c.id;

  if p_make_recurring and c.inspection_date is not null and c.expiry_date > c.inspection_date then
    v_years := round(((c.expiry_date - c.inspection_date) / 365.25)::numeric, 1);
    v_freq := case when v_years <= 0.6 then 'six_monthly'
                   when v_years <= 1.5 then 'annually'
                   when v_years <= 2.5 then 'two_yearly'
                   when v_years <= 4 then 'three_yearly'
                   else 'five_yearly' end;
    perform public.set_job_recurring(
      v_job, v_freq, (v_date + case v_freq when 'six_monthly' then interval '6 months'
                                            when 'annually' then interval '1 year'
                                            when 'two_yearly' then interval '2 years'
                                            when 'three_yearly' then interval '3 years'
                                            else interval '5 years' end)::date,
      null, 30, null, true, v_type || ' re-test', false, null);
  end if;
  return v_job;
end;
$function$;
revoke all on function public.book_renewal_as_job(uuid,uuid,date,boolean) from public, anon;
grant execute on function public.book_renewal_as_job(uuid,uuid,date,boolean) to authenticated;

-- 6. "Last visit" for the crew ----------------------------------------------
create or replace function public.get_job_last_visit(p_job uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $function$
declare
  v_job record;
  v_prev record;
begin
  select * into v_job from public.employer_jobs where id = p_job;
  if v_job.id is null or v_job.previous_visit_job_id is null then return null; end if;
  if not (public.is_assigned_to_job(p_job) or v_job.user_id in (select public.my_employer_scope())) then
    return null;
  end if;
  select * into v_prev from public.employer_jobs where id = v_job.previous_visit_job_id;
  if v_prev.id is null then return null; end if;

  return jsonb_build_object(
    'job_id', v_prev.id,
    'title', v_prev.title,
    'date', coalesce(v_prev.completed_at::date, v_prev.start_date),
    'crew', (select coalesce(jsonb_agg(distinct e.name), '[]'::jsonb)
               from public.employer_job_assignments a
               join public.employer_employees e on e.id = a.employee_id
              where a.job_id = v_prev.id),
    'notes', (select coalesce(jsonb_agg(s.n order by s.at desc), '[]'::jsonb) from (
                select u.at, u.n from (
                  select cm.created_at as at,
                         jsonb_build_object('at', cm.created_at, 'who', cm.author_name, 'text', left(cm.content, 400)) as n
                    from public.employer_job_comments cm
                   where cm.job_id = v_prev.id and nullif(btrim(cm.content), '') is not null
                  union all
                  select a.finished_at,
                         jsonb_build_object('at', a.finished_at, 'who', e.name, 'text', left(a.finished_note, 400))
                    from public.employer_job_assignments a
                    join public.employer_employees e on e.id = a.employee_id
                   where a.job_id = v_prev.id and nullif(btrim(a.finished_note), '') is not null
                  union all
                  select pl.created_at,
                         jsonb_build_object('at', pl.created_at, 'who', 'Office',
                           'text', left(concat_ws(' ', pl.work_completed, pl.issues_encountered, pl.notes), 400))
                    from public.progress_logs pl
                   where pl.job_id = v_prev.id
                     and nullif(btrim(concat_ws(' ', pl.work_completed, pl.issues_encountered, pl.notes)), '') is not null
                ) u order by u.at desc nulls last limit 8) s),
    'issues', (select coalesce(jsonb_agg(jsonb_build_object(
                  'type', i.issue_type, 'title', coalesce(nullif(btrim(i.title), ''), left(i.description, 120)),
                  'status', i.status, 'resolution', i.resolution_notes) order by i.created_at desc), '[]'::jsonb)
                 from public.job_issues i where i.job_id = v_prev.id));
end;
$function$;
revoke all on function public.get_job_last_visit(uuid) from public, anon;
grant execute on function public.get_job_last_visit(uuid) to authenticated;
