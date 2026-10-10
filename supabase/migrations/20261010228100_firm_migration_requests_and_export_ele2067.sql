-- ELE-2067 — "We'll move you across for free" requests, the private bucket
-- for the export files they send, the full-export functions, and the
-- plain-terms flag (off until Andrew signs the wording off).
--
-- Additive only: two new tables' worth of objects, a new private bucket with
-- its own policies, new functions, and one new feature_flags row (disabled).

-- ── Managed migration requests ──────────────────────────────────────────

create table if not exists public.employer_migration_requests (
  id uuid primary key default gen_random_uuid(),
  employer_id uuid not null references public.profiles(id) on delete cascade,
  requested_by uuid not null default auth.uid(),
  source_system text not null,
  contact_name text,
  contact_phone text,
  contact_email text,
  preferred_times text[] not null default '{}',
  preferred_note text,
  what_to_move text[] not null default '{}',
  notes text,
  files jsonb not null default '[]'::jsonb,
  status text not null default 'new'
    check (status in ('new', 'call_booked', 'importing', 'done', 'cancelled')),
  checklist jsonb not null default '{}'::jsonb,
  call_at timestamptz,
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists employer_migration_requests_firm_idx
  on public.employer_migration_requests (employer_id, created_at desc);
create index if not exists employer_migration_requests_status_idx
  on public.employer_migration_requests (status, created_at desc);

alter table public.employer_migration_requests enable row level security;

drop policy if exists "Owner sees own migration requests" on public.employer_migration_requests;
create policy "Owner sees own migration requests" on public.employer_migration_requests
  for select to authenticated using (employer_id = (select auth.uid()));
drop policy if exists "Owner asks for a migration" on public.employer_migration_requests;
create policy "Owner asks for a migration" on public.employer_migration_requests
  for insert to authenticated
  with check (employer_id = (select auth.uid()) and requested_by = (select auth.uid()) and status = 'new');
drop policy if exists "Admins see migration requests" on public.employer_migration_requests;
create policy "Admins see migration requests" on public.employer_migration_requests
  for select to authenticated using (public._is_platform_admin());
drop policy if exists "Admins progress migration requests" on public.employer_migration_requests;
create policy "Admins progress migration requests" on public.employer_migration_requests
  for update to authenticated using (public._is_platform_admin()) with check (public._is_platform_admin());

create or replace function public.tg_migration_request_touch()
returns trigger language plpgsql set search_path = public as $$
begin new.updated_at := now(); return new; end $$;

drop trigger if exists migration_request_touch on public.employer_migration_requests;
create trigger migration_request_touch before update on public.employer_migration_requests
  for each row execute function public.tg_migration_request_touch();

comment on table public.employer_migration_requests is
  '[EMPLOYER HUB] ELE-2067: a firm asking Elec-Mate to move its data across from another system for free. Holds the source system, contact, preferred call times, what to move and the export files sent (paths in the private firm-migration-files bucket). Scope: employer_id = the firm OWNER (profiles.id); only the owner creates and reads it; platform admins read and progress it (status, checklist, call_at, admin_notes). Used by: Settings → Bring your data across; Admin → Migrations. Rule: files are private, owner + platform admin only.';

-- ── Private bucket for the export files ─────────────────────────────────
-- 50 MB a file: the project storage cap is 50 MB until it is raised.

insert into storage.buckets (id, name, public, file_size_limit)
values ('firm-migration-files', 'firm-migration-files', false, 52428800)
on conflict (id) do nothing;

drop policy if exists "Owner uploads migration files" on storage.objects;
create policy "Owner uploads migration files" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'firm-migration-files' and (storage.foldername(name))[1] = (select auth.uid())::text);
drop policy if exists "Owner reads migration files" on storage.objects;
create policy "Owner reads migration files" on storage.objects
  for select to authenticated
  using (bucket_id = 'firm-migration-files' and (storage.foldername(name))[1] = (select auth.uid())::text);
drop policy if exists "Owner removes migration files" on storage.objects;
create policy "Owner removes migration files" on storage.objects
  for delete to authenticated
  using (bucket_id = 'firm-migration-files' and (storage.foldername(name))[1] = (select auth.uid())::text);
drop policy if exists "Admins read migration files" on storage.objects;
create policy "Admins read migration files" on storage.objects
  for select to authenticated
  using (bucket_id = 'firm-migration-files' and public._is_platform_admin());

-- ── Full export ─────────────────────────────────────────────────────────
-- One whitelist of record types. Owner only (the firm's whole book,
-- including pay and money). Heavy JSON columns that only drive the app
-- (certificate form data, AI prompts) are left out of the CSV; the PDFs
-- carry the certificate itself.

create or replace function public._firm_export_source(p_key text, p_firm uuid)
returns table (from_sql text, base_table text, drop_cols text[])
language plpgsql stable set search_path = public as $$
declare
  f text := quote_literal(p_firm::text) || '::uuid';
  roster text := '(select e.id from public.employer_employees e where e.employer_id = ' || f || ')';
begin
  base_table := null; drop_cols := '{}';
  case p_key
    when 'customers' then from_sql := 'public.customers x where x.user_id = ' || f; base_table := 'customers';
    when 'sites' then from_sql := 'public.customer_properties x where x.user_id = ' || f; base_table := 'customer_properties';
    when 'jobs' then from_sql := 'public.employer_jobs x where x.user_id = ' || f; base_table := 'employer_jobs';
    when 'quotes' then from_sql := 'public.quotes x where x.user_id = ' || f || ' and not coalesce(x.invoice_raised, false)'; base_table := 'quotes';
      drop_cols := array['public_token'];
    when 'invoices' then from_sql := 'public.quotes x where x.user_id = ' || f || ' and coalesce(x.invoice_raised, false)'; base_table := 'quotes';
      drop_cols := array['public_token'];
    when 'credit_notes' then from_sql := 'public.credit_notes x where x.user_id = ' || f; base_table := 'credit_notes';
    when 'staff' then from_sql := 'public.employer_employees x where x.employer_id = ' || f; base_table := 'employer_employees';
    when 'kit' then from_sql := 'public.employer_company_tools x where x.user_id = ' || f; base_table := 'employer_company_tools';
    when 'vehicles' then from_sql := 'public.vehicles x where x.user_id = ' || f; base_table := 'vehicles';
    when 'certificates' then from_sql := 'public.reports x where x.user_id = ' || f; base_table := 'reports';
      drop_cols := array['data', 'pdf_payload'];
    when 'rams' then from_sql := 'public.rams_documents x where x.user_id = ' || f || ' or x.employer_id = ' || f; base_table := 'rams_documents';
      drop_cols := array['ai_generation_metadata'];
    when 'method_statements' then from_sql := 'public.method_statements x where x.user_id = ' || f || ' or x.employer_id = ' || f; base_table := 'method_statements';
    when 'timesheets' then from_sql := 'public.employer_timesheets x where x.employee_id in ' || roster; base_table := 'employer_timesheets';
    when 'expenses' then from_sql := 'public.employer_expense_claims x where x.employee_id in ' || roster; base_table := 'employer_expense_claims';
    when 'leave' then from_sql := 'public.employer_leave_requests x where x.employee_id in ' || roster; base_table := 'employer_leave_requests';
    when 'staff_cards' then from_sql := 'public.employer_certifications x where x.employee_id in ' || roster; base_table := 'employer_certifications';
    when 'tasks' then from_sql := 'public.employer_job_tasks x where x.employer_id = ' || f; base_table := 'employer_job_tasks';
    when 'job_notes' then from_sql := 'public.employer_job_comments x where x.job_id in (select j.id from public.employer_jobs j where j.user_id = ' || f || ')'; base_table := 'employer_job_comments';
    when 'job_issues' then from_sql := 'public.job_issues x where x.user_id = ' || f; base_table := 'job_issues';
    when 'suppliers' then from_sql := 'public.employer_suppliers x where x.employer_id = ' || f; base_table := 'employer_suppliers';
    when 'purchase_orders' then from_sql := 'public.employer_material_orders x where x.employer_id = ' || f; base_table := 'employer_material_orders';
    when 'diary' then from_sql := 'public.calendar_events x where x.user_id = ' || f; base_table := 'calendar_events';
    when 'contracts' then from_sql := 'public.maintenance_contracts x where x.user_id = ' || f; base_table := 'maintenance_contracts';
    when 'leads' then from_sql := 'public.employer_leads x where x.user_id = ' || f; base_table := 'employer_leads';
    when 'enquiries' then from_sql := 'public.enquiries x where x.user_id = ' || f; base_table := 'enquiries';
    when 'briefings' then from_sql := 'public.team_briefings x where x.user_id = ' || f || ' or x.employer_id = ' || f; base_table := 'team_briefings';
      drop_cols := array['ai_prompt_data', 'attendee_signatures'];
    when 'near_misses' then from_sql := 'public.near_miss_reports x where x.user_id = ' || f || ' or x.employer_id = ' || f; base_table := 'near_miss_reports';
    when 'accidents' then from_sql := 'public.accident_records x where x.user_id = ' || f || ' or x.employer_id = ' || f; base_table := 'accident_records';
    when 'incidents' then from_sql := 'public.employer_incidents x where x.employer_id = ' || f; base_table := 'employer_incidents';
    when 'job_photos' then from_sql := 'public.job_photos x where x.user_id = ' || f; base_table := 'job_photos';
    when 'price_book' then
      from_sql := '(select ml.id as list_id, ml.name as list_name, it ->> ''id'' as item_id, it ->> ''name'' as name, '
               || 'it ->> ''unit'' as unit, it ->> ''category'' as category, it ->> ''supplier'' as supplier, '
               || 'it ->> ''code'' as code, it ->> ''cost_price'' as buy_price, it ->> ''estimated_price'' as sell_price, '
               || 'it ->> ''markup_percent'' as markup_percent, it ->> ''price_updated_at'' as price_updated_at '
               || 'from public.materials_lists ml, jsonb_array_elements(case when jsonb_typeof(ml.items) = ''array'' then ml.items else ''[]''::jsonb end) it '
               || 'where ml.user_id = ' || f || ') x';
    else from_sql := null;
  end case;
  return next;
end $$;

revoke all on function public._firm_export_source(text, uuid) from public, anon, authenticated;

create or replace function public._firm_export_keys()
returns text[] language sql immutable set search_path = public as $$
  select array['customers', 'sites', 'jobs', 'quotes', 'invoices', 'credit_notes', 'price_book',
               'staff', 'staff_cards', 'timesheets', 'expenses', 'leave', 'kit', 'vehicles',
               'certificates', 'rams', 'method_statements', 'briefings', 'near_misses', 'accidents',
               'incidents', 'tasks', 'job_notes', 'job_issues', 'job_photos', 'suppliers',
               'purchase_orders', 'diary', 'contracts', 'leads', 'enquiries']
$$;

-- Counts per record type, and every file the firm holds in storage under its
-- own folder (certificates, RAMS, invoice PDFs, job and safety photos).
create or replace function public.get_firm_export_manifest(p_firm uuid)
returns jsonb
language plpgsql security definer set search_path = public, storage as $$
declare
  k text;
  s record;
  n bigint;
  v_counts jsonb := '{}'::jsonb;
  v_files jsonb;
  v_bytes bigint;
begin
  if auth.uid() is null or auth.uid() <> p_firm then
    raise exception 'Only the account owner can export everything.' using errcode = '42501';
  end if;
  foreach k in array public._firm_export_keys() loop
    select * into s from public._firm_export_source(k, p_firm);
    execute 'select count(*) from ' || s.from_sql into n;
    v_counts := v_counts || jsonb_build_object(k, n);
  end loop;

  select coalesce(jsonb_agg(jsonb_build_object(
           'bucket', o.bucket_id, 'path', o.name,
           'size', coalesce((o.metadata ->> 'size')::bigint, 0),
           'type', o.metadata ->> 'mimetype',
           'public', b.public) order by o.bucket_id, o.name), '[]'::jsonb),
         coalesce(sum((o.metadata ->> 'size')::bigint), 0)
    into v_files, v_bytes
    from storage.objects o
    join storage.buckets b on b.id = o.bucket_id
   where o.bucket_id in ('certificates', 'rams-pdfs', 'invoice-pdfs', 'job-photos', 'visual-uploads',
                         'inspection-photos', 'safety-photos', 'safety-documents', 'survey-photos',
                         'briefing-photos', 'pack-documents', 'incident-reports', 'board-photos',
                         'kit-photos', 'vehicle-check-photos', 'expense-receipts', 'project-documents',
                         'quote-page-photos', 'task-photos', 'compliance-documents', 'company-branding',
                         'legacy-certificates', 'signature-paper', 'test-sheets')
     and o.name like p_firm::text || '/%';

  return jsonb_build_object('counts', v_counts, 'files', v_files, 'file_bytes', v_bytes,
                            'generated_at', now());
end $$;

-- One page of one record type, as JSON rows (the client writes the CSV).
create or replace function public.export_firm_table(p_firm uuid, p_key text, p_offset int default 0, p_limit int default 500)
returns jsonb
language plpgsql security definer set search_path = public as $$
declare
  s record;
  v_cols text;
  v_rows jsonb;
begin
  if auth.uid() is null or auth.uid() <> p_firm then
    raise exception 'Only the account owner can export everything.' using errcode = '42501';
  end if;
  if not (p_key = any (public._firm_export_keys())) then
    raise exception 'Unknown record type %', p_key using errcode = '22023';
  end if;
  select * into s from public._firm_export_source(p_key, p_firm);
  if s.base_table is not null then
    select string_agg('x.' || quote_ident(c.column_name), ', ' order by c.ordinal_position) into v_cols
      from information_schema.columns c
     where c.table_schema = 'public' and c.table_name = s.base_table
       and c.column_name <> all (s.drop_cols);
  else
    v_cols := 'x.*';
  end if;
  execute format(
    'select coalesce(jsonb_agg(to_jsonb(t)), ''[]''::jsonb) from (select %s from %s order by %s offset %s limit %s) t',
    v_cols, s.from_sql, case when s.base_table is null then 'x.list_id, x.item_id' else 'x.id' end, greatest(coalesce(p_offset, 0), 0), least(greatest(coalesce(p_limit, 500), 1), 2000))
    into v_rows;
  return v_rows;
end $$;

revoke all on function public.get_firm_export_manifest(uuid) from public, anon;
revoke all on function public.export_firm_table(uuid, text, int, int) from public, anon;
grant execute on function public.get_firm_export_manifest(uuid) to authenticated;
grant execute on function public.export_firm_table(uuid, text, int, int) to authenticated;

-- ── Plain terms: off until Andrew approves the wording ──────────────────
insert into public.feature_flags (name, description, is_enabled)
select 'plain_terms', 'ELE-2067: month-to-month, price lock and export guarantee panel in Settings and on the pricing page. Wording is a placeholder: Andrew to approve before switching on.', false
where not exists (select 1 from public.feature_flags where name = 'plain_terms');
