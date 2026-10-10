-- ELE-2067 — Bring your data across: import batches, a row map for undo,
-- and the import / preview / undo functions.
--
-- Additive only. No column is added to a live table: every row an import
-- creates is recorded in employer_import_rows (batch → table → row id), so
-- the whole import can be undone, and rows it MATCHED to existing records
-- are recorded too (action 'matched') so later files can link to them but
-- undo never touches them.
--
-- Imported quotes and invoices are shaped so nothing chases or re-sends them:
--   * the original number is kept (quote_number / invoice_number given, so
--     assign_document_numbers leaves it alone; the firm's own counter skips
--     any number already taken, so its next numbers never clash);
--   * a number that already exists in the firm is a duplicate and skipped,
--     never renumbered;
--   * first_sent_at and invoice_sent_at stay NULL, auto_followup_enabled is
--     false and expiry_notification_sent is true. Every follow-up, payment
--     prompt and unpaid-invoice automation needs a sent time, so none of
--     them picks these up;
--   * tags 'imported' + 'imported:<source>', and job_details.imported holds
--     the source, original number and batch.
-- Finished jobs are inserted already Completed (job-complete automations only
-- fire on UPDATE) and archived, so they sit in Archived jobs, not the board
-- or the diary.

create table if not exists public.employer_import_batches (
  id uuid primary key default gen_random_uuid(),
  employer_id uuid not null references public.profiles(id) on delete cascade,
  source text not null check (source in (
    'tradify', 'fergus', 'powered_now', 'simpro', 'servicem8', 'jobber',
    'commusoft', 'joblogic', 'generic')),
  status text not null default 'running' check (status in ('running', 'complete', 'undone', 'failed')),
  file_names text[] not null default '{}',
  counts jsonb not null default '{}'::jsonb,
  undo_counts jsonb,
  created_by uuid default auth.uid(),
  created_at timestamptz not null default now(),
  completed_at timestamptz,
  undone_at timestamptz,
  undone_by uuid
);

create index if not exists employer_import_batches_firm_idx
  on public.employer_import_batches (employer_id, created_at desc);

create table if not exists public.employer_import_rows (
  id bigserial primary key,
  batch_id uuid not null references public.employer_import_batches(id) on delete cascade,
  employer_id uuid not null,
  kind text not null check (kind in (
    'customers', 'sites', 'jobs', 'quotes', 'invoices', 'price_book', 'staff', 'assets')),
  table_name text not null,
  row_id uuid not null,
  source_ref text,
  action text not null check (action in ('created', 'matched', 'kept')),
  created_at timestamptz not null default now()
);

create index if not exists employer_import_rows_batch_idx
  on public.employer_import_rows (batch_id, kind);
create index if not exists employer_import_rows_ref_idx
  on public.employer_import_rows (employer_id, kind, source_ref);
create index if not exists employer_import_rows_row_idx
  on public.employer_import_rows (table_name, row_id);

alter table public.employer_import_batches enable row level security;
alter table public.employer_import_rows enable row level security;

-- Read: the owner and admins (imports carry invoices, so money roles only).
-- Writes go through the functions below.
drop policy if exists "Money roles see the firm's imports" on public.employer_import_batches;
create policy "Money roles see the firm's imports" on public.employer_import_batches
  for select to authenticated using (public.can_see_firm_money(employer_id));
drop policy if exists "Money roles see the firm's import rows" on public.employer_import_rows;
create policy "Money roles see the firm's import rows" on public.employer_import_rows
  for select to authenticated using (public.can_see_firm_money(employer_id));

comment on table public.employer_import_batches is
  '[EMPLOYER HUB] ELE-2067: one row per "Bring your data across" import (source system, files, counts per record type, status running/complete/undone). Scope: employer_id = the firm (owner profiles.id); owner + admins read (can_see_firm_money); written only by import_firm_rows / finish_firm_import / undo_firm_import. Used by: Settings → Bring your data across.';
comment on table public.employer_import_rows is
  '[EMPLOYER HUB] ELE-2067: the undo map for an import — one row per record an import created (action created) or linked to an existing record (action matched). table_name + row_id point at customers, customer_properties, employer_jobs, quotes, materials_lists, employer_employees or employer_company_tools. Scope: employer_id = the firm; owner + admins read. Rule: undo deletes only action = created rows, and keeps any that have been used since.';

-- ── Small helpers ───────────────────────────────────────────────────────

create or replace function public._imp_txt(p jsonb, k text, p_max int default 2000)
returns text language sql immutable set search_path = public as $$
  select nullif(left(btrim(coalesce(p ->> k, '')), p_max), '')
$$;

create or replace function public._imp_num(p jsonb, k text)
returns numeric language plpgsql immutable set search_path = public as $$
declare v text := regexp_replace(coalesce(p ->> k, ''), '[£$,\s]', '', 'g');
begin
  if v = '' then return null; end if;
  if v ~ '^\(.*\)$' then v := '-' || substr(v, 2, length(v) - 2); end if;
  return round(v::numeric, 2);
exception when others then return null;
end $$;

create or replace function public._imp_date(p jsonb, k text)
returns date language plpgsql immutable set search_path = public as $$
declare v text := btrim(coalesce(p ->> k, ''));
begin
  if v = '' then return null; end if;
  -- The client sends ISO dates; anything else is dropped rather than guessed.
  if v !~ '^\d{4}-\d{2}-\d{2}' then return null; end if;
  return left(v, 10)::date;
exception when others then return null;
end $$;

create or replace function public._imp_phone(p text)
returns text language sql immutable set search_path = public as $$
  select case
    when length(d) >= 10 then right(case when d like '44%' and length(d) >= 12 then '0' || substr(d, 3) else d end, 10)
  end
  from (select regexp_replace(coalesce(p, ''), '\D', '', 'g') as d) x
$$;

create or replace function public._imp_pc(p text)
returns text language sql immutable set search_path = public as $$
  select nullif(upper(regexp_replace(coalesce(p, ''), '\s', '', 'g')), '')
$$;

create or replace function public._imp_name(p text)
returns text language sql immutable set search_path = public as $$
  select nullif(lower(regexp_replace(btrim(coalesce(p, '')), '\s+', ' ', 'g')), '')
$$;

-- An existing customer of the firm that this person already is.
-- Order: email, phone, name + postcode, then name alone (only when the row
-- gives no email, phone or postcode to tell two people apart).
create or replace function public._imp_match_customer(
  p_firm uuid, p_name text, p_email text, p_phone text, p_postcode text)
returns table (customer_id uuid, reason text)
language plpgsql stable security definer set search_path = public as $$
declare
  v_email text := nullif(lower(btrim(coalesce(p_email, ''))), '');
  v_phone text := public._imp_phone(p_phone);
  v_pc text := public._imp_pc(p_postcode);
  v_name text := public._imp_name(p_name);
  v_id uuid;
begin
  if v_email is not null then
    select c.id into v_id from public.customers c
     where c.user_id = p_firm and lower(btrim(c.email)) = v_email
     order by c.created_at limit 1;
    if v_id is not null then customer_id := v_id; reason := 'email'; return next; return; end if;
  end if;
  if v_phone is not null then
    select c.id into v_id from public.customers c
     where c.user_id = p_firm and public._imp_phone(c.phone) = v_phone
     order by c.created_at limit 1;
    if v_id is not null then customer_id := v_id; reason := 'phone'; return next; return; end if;
  end if;
  if v_name is not null and v_pc is not null then
    select c.id into v_id from public.customers c
     where c.user_id = p_firm and public._imp_name(c.name) = v_name
       and coalesce(public._imp_pc(c.postcode), public._imp_pc(substring(c.address from '([A-Za-z]{1,2}[0-9][0-9A-Za-z]?\s*[0-9][A-Za-z]{2})\s*$'))) = v_pc
     order by c.created_at limit 1;
    if v_id is not null then customer_id := v_id; reason := 'name and postcode'; return next; return; end if;
  end if;
  if v_name is not null and v_email is null and v_phone is null and v_pc is null then
    select c.id into v_id from public.customers c
     where c.user_id = p_firm and public._imp_name(c.name) = v_name
     order by c.created_at limit 1;
    if v_id is not null then customer_id := v_id; reason := 'name'; return next; return; end if;
  end if;
  return;
end $$;

revoke all on function public._imp_match_customer(uuid, text, text, text, text) from public, anon, authenticated;

-- A record with this source reference already brought in by an earlier
-- import of the same system that has not been undone.
create or replace function public._imp_seen(p_firm uuid, p_batch uuid, p_source text, p_kind text, p_ref text)
returns uuid language sql stable security definer set search_path = public as $$
  select r.row_id from public.employer_import_rows r
    join public.employer_import_batches b on b.id = r.batch_id
   where p_ref is not null and r.employer_id = p_firm and r.kind = p_kind and r.source_ref = p_ref
     and b.source = p_source and b.status in ('running', 'complete')
     and (r.batch_id = p_batch or b.id <> p_batch)
   order by r.id limit 1
$$;

revoke all on function public._imp_seen(uuid, uuid, text, text, text) from public, anon, authenticated;

-- ── Start / finish ──────────────────────────────────────────────────────

create or replace function public.start_firm_import(p_firm uuid, p_source text, p_file_names text[] default '{}')
returns uuid
language plpgsql security definer set search_path = public as $$
declare v_id uuid;
begin
  if auth.uid() is null or not public.can_see_firm_money(p_firm) then
    raise exception 'Only the owner or an admin can import records.' using errcode = '42501';
  end if;
  insert into public.employer_import_batches (employer_id, source, file_names, created_by)
  values (p_firm, p_source, coalesce(p_file_names[1:20], '{}'), auth.uid())
  returning id into v_id;
  return v_id;
end $$;

create or replace function public.finish_firm_import(p_batch uuid, p_failed boolean default false)
returns jsonb
language plpgsql security definer set search_path = public as $$
declare b public.employer_import_batches; v_counts jsonb;
begin
  select * into b from public.employer_import_batches where id = p_batch;
  if b.id is null or auth.uid() is null or not public.can_see_firm_money(b.employer_id) then
    raise exception 'Not allowed' using errcode = '42501';
  end if;
  select coalesce(jsonb_object_agg(kind, jsonb_build_object('created', c, 'matched', m)), '{}'::jsonb)
    into v_counts
    from (select kind, count(*) filter (where action = 'created') c, count(*) filter (where action = 'matched') m
            from public.employer_import_rows
           where batch_id = p_batch and table_name <> 'materials_lists' group by kind) x;
  update public.employer_import_batches
     set status = case when p_failed then 'failed' else 'complete' end,
         counts = counts || v_counts, completed_at = now()
   where id = p_batch and status = 'running';
  return v_counts;
end $$;

-- ── Import one chunk of one record type ─────────────────────────────────
--
-- p_rows is the normalised shape the client mappers produce (see
-- src/lib/firmImport/types.ts). Each row is done in its own savepoint, so a
-- bad row is skipped with a reason and never stops the chunk.
--
-- p_dry_run: the chunk is imported for real inside a block that is then
-- rolled back, so the preview is exactly what would happen. p_batch may be
-- null on a dry run.

create or replace function public._imp_customer_for(
  p_firm uuid, p_batch uuid, p_source text, r jsonb, p_create boolean, out o_id uuid, out o_new boolean)
language plpgsql security definer set search_path = public as $$
declare
  v_ref text := public._imp_txt(r, 'customer_ref', 200);
  v_name text := public._imp_txt(r, 'customer_name', 300);
  v_email text := public._imp_txt(r, 'customer_email', 320);
  v_phone text := public._imp_txt(r, 'customer_phone', 60);
  v_pc text := public._imp_txt(r, 'customer_postcode', 20);
begin
  o_new := false;
  if v_ref is not null then
    select x.row_id into o_id from public.employer_import_rows x
     where x.batch_id = p_batch and x.kind = 'customers' and x.source_ref = v_ref
     order by x.id limit 1;
    if o_id is not null then return; end if;
    o_id := public._imp_seen(p_firm, p_batch, p_source, 'customers', v_ref);
    if o_id is not null and exists (select 1 from public.customers where id = o_id) then return; end if;
    o_id := null;
  end if;
  if v_name is null and v_email is null then return; end if;
  select m.customer_id into o_id from public._imp_match_customer(p_firm, v_name, v_email, v_phone, v_pc) m;
  if o_id is not null or not p_create then return; end if;
  insert into public.customers (user_id, name, email, phone, postcode, address, tags, notes)
  values (p_firm, coalesce(v_name, v_email), lower(v_email), v_phone, v_pc,
          public._imp_txt(r, 'customer_address', 1000),
          array['imported', 'imported:' || p_source],
          'Added by an import from ' || initcap(replace(p_source, '_', ' ')) || '.')
  returning id into o_id;
  o_new := true;
  insert into public.employer_import_rows (batch_id, employer_id, kind, table_name, row_id, source_ref, action)
  values (p_batch, p_firm, 'customers', 'customers', o_id, coalesce(v_ref, 'name:' || public._imp_name(coalesce(v_name, v_email))), 'created');
end $$;

revoke all on function public._imp_customer_for(uuid, uuid, text, jsonb, boolean) from public, anon, authenticated;

create or replace function public.import_firm_rows(
  p_firm uuid, p_source text, p_batch uuid, p_kind text, p_rows jsonb, p_dry_run boolean default false)
returns jsonb
language plpgsql security definer set search_path = public as $$
declare
  v_batch uuid := p_batch;
  v_results jsonb := '[]'::jsonb;
  v_created int := 0;
  v_matched int := 0;
  v_skipped int := 0;
  v_new_customers int := 0;
  r jsonb;
  i int := -1;
  v_id uuid;
  v_ref text;
  v_reason text;
  v_cust uuid;
  v_new boolean;
  v_job uuid;
  v_num text;
  v_items jsonb;
  v_total numeric;
  v_sub numeric;
  v_vat numeric;
  v_date date;
  v_due date;
  v_status text;
  v_list uuid;
  v_now text := to_char(now() at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"');
  v_label text := initcap(replace(coalesce(p_source, ''), '_', ' '));
  v_name text;
  v_addr text;
  v_open boolean;
  v_err text;
begin
  if auth.uid() is null or not public.can_see_firm_money(p_firm) then
    raise exception 'Only the owner or an admin can import records.' using errcode = '42501';
  end if;
  if p_kind not in ('customers', 'sites', 'jobs', 'quotes', 'invoices', 'price_book', 'staff', 'assets') then
    raise exception 'Unknown record type %', p_kind using errcode = '22023';
  end if;
  if jsonb_typeof(p_rows) is distinct from 'array' or jsonb_array_length(p_rows) > 500 then
    raise exception 'Send up to 500 rows at a time.' using errcode = '22023';
  end if;
  if not p_dry_run then
    if not exists (select 1 from public.employer_import_batches b
                    where b.id = p_batch and b.employer_id = p_firm and b.status = 'running') then
      raise exception 'That import is not running.' using errcode = '22023';
    end if;
    select source into p_source from public.employer_import_batches where id = p_batch;
  end if;

  begin  -- dry run: everything in here is rolled back at the end
    if p_dry_run then
      insert into public.employer_import_batches (employer_id, source, created_by)
      values (p_firm, p_source, auth.uid()) returning id into v_batch;
    end if;

    for r in select * from jsonb_array_elements(p_rows) loop
      i := i + 1;
      v_id := null; v_reason := null; v_new := false;
      v_ref := public._imp_txt(r, 'ref', 200);
      begin
        -- ── customers ──
        if p_kind = 'customers' then
          v_name := public._imp_txt(r, 'name', 300);
          if v_name is null and public._imp_txt(r, 'company_name', 300) is null then
            v_reason := 'No name'; raise exception using errcode = 'P0010';
          end if;
          v_id := public._imp_seen(p_firm, v_batch, p_source, 'customers', v_ref);
          if v_id is not null and exists (select 1 from public.customers where id = v_id) then
            v_reason := 'Already imported';
          else
            v_id := null;
            select m.customer_id, 'Same ' || m.reason into v_id, v_reason
              from public._imp_match_customer(p_firm, coalesce(v_name, public._imp_txt(r, 'company_name', 300)),
                     public._imp_txt(r, 'email', 320), public._imp_txt(r, 'phone', 60), public._imp_txt(r, 'postcode', 20)) m;
          end if;
          if v_id is not null then
            insert into public.employer_import_rows (batch_id, employer_id, kind, table_name, row_id, source_ref, action)
            values (v_batch, p_firm, 'customers', 'customers', v_id, v_ref, 'matched');
            v_matched := v_matched + 1;
          else
            insert into public.customers (user_id, name, company_name, email, phone, address, postcode, notes, tags)
            values (p_firm, coalesce(v_name, public._imp_txt(r, 'company_name', 300)),
                    public._imp_txt(r, 'company_name', 300), lower(public._imp_txt(r, 'email', 320)),
                    public._imp_txt(r, 'phone', 60), public._imp_txt(r, 'address', 1000),
                    public._imp_txt(r, 'postcode', 20), public._imp_txt(r, 'notes', 4000),
                    array['imported', 'imported:' || p_source])
            returning id into v_id;
            insert into public.employer_import_rows (batch_id, employer_id, kind, table_name, row_id, source_ref, action)
            values (v_batch, p_firm, 'customers', 'customers', v_id, v_ref, 'created');
            v_created := v_created + 1;
          end if;

        -- ── sites ──
        elsif p_kind = 'sites' then
          v_addr := public._imp_txt(r, 'address', 1000);
          if v_addr is null then v_reason := 'No address'; raise exception using errcode = 'P0010'; end if;
          select o.o_id, o.o_new into v_cust, v_new from public._imp_customer_for(p_firm, v_batch, p_source, r, true) o;
          if v_cust is null then v_reason := 'No customer to put it under'; raise exception using errcode = 'P0010'; end if;
          if v_new then v_new_customers := v_new_customers + 1; end if;
          v_id := public._imp_seen(p_firm, v_batch, p_source, 'sites', v_ref);
          if v_id is not null then
            v_reason := 'Already imported';
          else
            select p.id into v_id from public.customer_properties p
             where p.customer_id = v_cust
               and (public._imp_name(p.address) = public._imp_name(v_addr)
                    or (public._imp_pc(p.postcode) = public._imp_pc(public._imp_txt(r, 'postcode', 20))
                        and split_part(public._imp_name(p.address), ',', 1) = split_part(public._imp_name(v_addr), ',', 1)))
             limit 1;
            if v_id is not null then v_reason := 'Same address'; end if;
          end if;
          if v_id is not null then
            v_matched := v_matched + 1;
          else
            insert into public.customer_properties (customer_id, user_id, address, postcode, property_type, notes, is_primary)
            values (v_cust, p_firm, v_addr, public._imp_txt(r, 'postcode', 20),
                    public._imp_txt(r, 'property_type', 60), public._imp_txt(r, 'notes', 4000),
                    not exists (select 1 from public.customer_properties x where x.customer_id = v_cust))
            returning id into v_id;
            insert into public.employer_import_rows (batch_id, employer_id, kind, table_name, row_id, source_ref, action)
            values (v_batch, p_firm, 'sites', 'customer_properties', v_id, v_ref, 'created');
            v_created := v_created + 1;
          end if;

        -- ── jobs ──
        elsif p_kind = 'jobs' then
          v_name := public._imp_txt(r, 'title', 300);
          if v_name is null then v_reason := 'No job title'; raise exception using errcode = 'P0010'; end if;
          select o.o_id, o.o_new into v_cust, v_new from public._imp_customer_for(p_firm, v_batch, p_source, r, true) o;
          if v_new then v_new_customers := v_new_customers + 1; end if;
          v_date := public._imp_date(r, 'start_date');
          v_id := public._imp_seen(p_firm, v_batch, p_source, 'jobs', v_ref);
          if v_id is not null then
            v_reason := 'Already imported';
          elsif v_cust is not null then
            select j.id into v_id from public.employer_jobs j
             where j.user_id = p_firm and j.customer_id = v_cust and public._imp_name(j.title) = public._imp_name(v_name)
               and j.start_date is not distinct from v_date
             limit 1;
            if v_id is not null then v_reason := 'Same job already here'; end if;
          end if;
          if v_id is not null then
            v_matched := v_matched + 1;
            insert into public.employer_import_rows (batch_id, employer_id, kind, table_name, row_id, source_ref, action)
            values (v_batch, p_firm, 'jobs', 'employer_jobs', v_id, v_ref, 'matched');
          else
            v_status := lower(coalesce(public._imp_txt(r, 'status', 40), 'open'));
            v_open := v_status not in ('complete', 'cancelled');
            insert into public.employer_jobs (
              user_id, title, client, location, status, board_stage, progress, start_date, end_date,
              value, description, customer_id, client_phone, client_email, site_contact_name,
              site_contact_phone, completed_at, archived_at, job_type)
            values (
              p_firm, v_name,
              coalesce(public._imp_txt(r, 'customer_name', 300),
                       (select c.name from public.customers c where c.id = v_cust), 'Customer'),
              coalesce(public._imp_txt(r, 'address', 1000), ''),
              case v_status when 'complete' then 'Completed' when 'cancelled' then 'Cancelled'
                            when 'quoted' then 'Pending' when 'enquiry' then 'Pending' else 'Active' end,
              case v_status when 'complete' then 'Complete' when 'quoted' then 'Quoted'
                            when 'enquiry' then 'Enquiry' when 'cancelled' then null
                            else case when v_date is not null then 'Scheduled' else 'Confirmed' end end,
              case when v_status = 'complete' then 100 else 0 end,
              v_date, public._imp_date(r, 'end_date'),
              public._imp_num(r, 'value'),
              nullif(concat_ws(E'\n',
                public._imp_txt(r, 'description', 6000),
                case when public._imp_txt(r, 'job_number', 60) is not null
                     then 'Imported from ' || v_label || ' (job ' || public._imp_txt(r, 'job_number', 60) || ').'
                     else 'Imported from ' || v_label || '.' end), ''),
              v_cust,
              coalesce(public._imp_txt(r, 'customer_phone', 60), (select c.phone from public.customers c where c.id = v_cust)),
              coalesce(lower(public._imp_txt(r, 'customer_email', 320)), (select c.email from public.customers c where c.id = v_cust)),
              public._imp_txt(r, 'site_contact_name', 200), public._imp_txt(r, 'site_contact_phone', 60),
              case when v_status = 'complete'
                   then coalesce(public._imp_date(r, 'completed_date'), public._imp_date(r, 'end_date'), v_date, current_date)::timestamptz end,
              case when not v_open then now() end,
              public._imp_txt(r, 'job_type', 60))
            returning id into v_id;
            insert into public.employer_import_rows (batch_id, employer_id, kind, table_name, row_id, source_ref, action)
            values (v_batch, p_firm, 'jobs', 'employer_jobs', v_id, v_ref, 'created');
            v_created := v_created + 1;
          end if;

        -- ── quotes and invoices ──
        elsif p_kind in ('quotes', 'invoices') then
          v_num := public._imp_txt(r, 'number', 60);
          select o.o_id, o.o_new into v_cust, v_new from public._imp_customer_for(p_firm, v_batch, p_source, r, true) o;
          if v_cust is null then v_reason := 'No customer'; raise exception using errcode = 'P0010'; end if;
          if v_new then v_new_customers := v_new_customers + 1; end if;
          v_id := public._imp_seen(p_firm, v_batch, p_source, p_kind, coalesce(v_ref, v_num));
          if v_id is not null then
            v_reason := 'Already imported';
          elsif v_num is not null then
            select q.id into v_id from public.quotes q
             where q.user_id = p_firm
               and (q.quote_number = v_num or q.invoice_number = v_num)
             limit 1;
            if v_id is null and p_kind = 'invoices' then
              select i2.id into v_id from public.invoices i2
               where i2.user_id = p_firm and i2.invoice_number = v_num limit 1;
            end if;
            if v_id is not null then v_reason := 'Number ' || v_num || ' is already used in your records'; end if;
          end if;
          if v_id is not null then
            v_matched := v_matched + 1;
          else
            v_job := null;
            if public._imp_txt(r, 'job_ref', 200) is not null then
              select x.row_id into v_job from public.employer_import_rows x
               where x.batch_id = v_batch and x.kind = 'jobs' and x.source_ref = public._imp_txt(r, 'job_ref', 200)
               order by x.id limit 1;
              if v_job is null then
                v_job := public._imp_seen(p_firm, v_batch, p_source, 'jobs', public._imp_txt(r, 'job_ref', 200));
              end if;
            end if;
            v_date := coalesce(public._imp_date(r, 'date'), current_date);
            v_due := public._imp_date(r, case when p_kind = 'invoices' then 'due_date' else 'expiry_date' end);
            v_total := coalesce(public._imp_num(r, 'total'), 0);
            v_vat := coalesce(public._imp_num(r, 'vat'), 0);
            v_sub := coalesce(public._imp_num(r, 'subtotal'), v_total - v_vat);
            v_status := lower(coalesce(public._imp_txt(r, 'status', 40), ''));
            select coalesce(jsonb_agg(jsonb_build_object(
                     'id', gen_random_uuid(),
                     'description', left(coalesce(it ->> 'description', 'Item'), 2000),
                     'quantity', coalesce(public._imp_num(it, 'quantity'), 1),
                     'unit', coalesce(nullif(it ->> 'unit', ''), 'each'),
                     'unitPrice', coalesce(public._imp_num(it, 'unit_price'),
                                           public._imp_num(it, 'total') / nullif(coalesce(public._imp_num(it, 'quantity'), 1), 0), 0),
                     'totalPrice', coalesce(public._imp_num(it, 'total'),
                                            coalesce(public._imp_num(it, 'unit_price'), 0) * coalesce(public._imp_num(it, 'quantity'), 1)),
                     'category', 'labour')), '[]'::jsonb)
              into v_items
              from jsonb_array_elements(case when jsonb_typeof(r -> 'items') = 'array' then r -> 'items' else '[]'::jsonb end) it
             where coalesce(it ->> 'description', '') <> '' or public._imp_num(it, 'total') is not null;
            if jsonb_array_length(v_items) = 0 then
              v_items := jsonb_build_array(jsonb_build_object(
                'id', gen_random_uuid(),
                'description', coalesce(public._imp_txt(r, 'description', 2000), 'Imported from ' || v_label),
                'quantity', 1, 'unit', 'each', 'unitPrice', v_sub, 'totalPrice', v_sub, 'category', 'labour'));
            end if;

            insert into public.quotes (
              user_id, quote_number, client_data, items, settings, subtotal, vat_amount, total,
              status, acceptance_status, accepted_at, expiry_date, notes, tags,
              auto_followup_enabled, expiry_notification_sent, first_sent_at,
              invoice_raised, invoice_number, invoice_date, invoice_due_date, invoice_status,
              invoice_paid_at, total_paid, invoice_notes, job_details, customer_id, employer_job_id,
              created_at)
            values (
              p_firm,
              -- An invoice keeps its own number as the quote number too, unless
              -- that quote number is taken; then a clearly imported one.
              case when v_num is null then 'IMP-' || upper(left(p_source, 3)) || '-' || left(replace(gen_random_uuid()::text, '-', ''), 8)
                   when p_kind = 'invoices' and exists (select 1 from public.quotes q where q.user_id = p_firm and q.quote_number = v_num)
                   then 'IMP-' || v_num
                   else v_num end,
              jsonb_strip_nulls(jsonb_build_object(
                'name', (select c.name from public.customers c where c.id = v_cust),
                'email', (select c.email from public.customers c where c.id = v_cust),
                'phone', (select c.phone from public.customers c where c.id = v_cust),
                'address', coalesce(public._imp_txt(r, 'customer_address', 1000), (select c.address from public.customers c where c.id = v_cust), ''),
                'postcode', coalesce((select c.postcode from public.customers c where c.id = v_cust), ''),
                'customerId', v_cust)),
              v_items,
              jsonb_build_object('vatRate', case when v_sub > 0 and v_vat > 0 then round(v_vat / v_sub * 100) else 0 end,
                                 'vatRegistered', v_vat > 0, 'reverseCharge', false, 'cisEnabled', false,
                                 'imported', true),
              v_sub, v_vat, v_total,
              case when p_kind = 'invoices' then 'approved'
                   when v_status in ('accepted', 'won', 'approved') then 'approved'
                   when v_status in ('declined', 'lost', 'rejected') then 'rejected'
                   when v_status in ('sent', 'issued', 'awaiting') then 'sent'
                   else 'draft' end,
              case when p_kind = 'invoices' or v_status in ('accepted', 'won', 'approved') then 'accepted'
                   when v_status in ('declined', 'lost', 'rejected') then 'rejected'
                   else 'pending' end,
              case when p_kind = 'quotes' and v_status in ('accepted', 'won', 'approved')
                   then coalesce(public._imp_date(r, 'accepted_date'), v_date)::timestamptz end,
              coalesce(case when p_kind = 'quotes' then v_due end, v_date + 30)::timestamptz,
              public._imp_txt(r, 'notes', 4000),
              array['imported', 'imported:' || p_source],
              false, true, null,
              p_kind = 'invoices',
              case when p_kind = 'invoices' then coalesce(v_num, 'IMP-' || upper(left(p_source, 3)) || '-' || left(replace(gen_random_uuid()::text, '-', ''), 8)) end,
              case when p_kind = 'invoices' then v_date::timestamptz end,
              case when p_kind = 'invoices' then coalesce(v_due, v_date + 30)::timestamptz end,
              case when p_kind <> 'invoices' then null
                   when v_status in ('paid', 'complete', 'closed') then 'paid'
                   when v_status in ('void', 'voided', 'cancelled', 'deleted') then 'cancelled'
                   when v_status in ('draft') then 'draft'
                   else 'sent' end,
              case when p_kind = 'invoices' and v_status in ('paid', 'complete', 'closed')
                   then coalesce(public._imp_date(r, 'paid_date'), v_due, v_date)::timestamptz end,
              case when p_kind <> 'invoices' then 0
                   when v_status in ('paid', 'complete', 'closed') then v_total
                   else least(greatest(coalesce(public._imp_num(r, 'amount_paid'), 0), 0), v_total) end,
              case when p_kind = 'invoices'
                   then 'Imported from ' || v_label || coalesce(' as ' || v_num, '') || '. Not sent from Elec-Mate.' end,
              jsonb_strip_nulls(jsonb_build_object(
                'title', coalesce(public._imp_txt(r, 'description', 300), 'Imported from ' || v_label),
                'location', public._imp_txt(r, 'site_address', 1000),
                'imported', jsonb_build_object('source', p_source, 'batch_id', v_batch,
                                               'original_number', v_num, 'imported_at', v_now))),
              v_cust, v_job,
              v_date::timestamptz)
            returning id into v_id;
            insert into public.employer_import_rows (batch_id, employer_id, kind, table_name, row_id, source_ref, action)
            values (v_batch, p_firm, p_kind, 'quotes', v_id, coalesce(v_ref, v_num), 'created');
            v_created := v_created + 1;
          end if;

        -- ── price book ──
        elsif p_kind = 'price_book' then
          v_name := public._imp_txt(r, 'name', 300);
          if v_name is null then v_reason := 'No item name'; raise exception using errcode = 'P0010'; end if;
          if coalesce(public._imp_num(r, 'buy'), 0) < 0 or coalesce(public._imp_num(r, 'sell'), 0) < 0
             or coalesce(public._imp_num(r, 'buy'), 0) > 1000000 or coalesce(public._imp_num(r, 'sell'), 0) > 1000000 then
            v_reason := 'Price out of range'; raise exception using errcode = 'P0010';
          end if;
          if exists (
            select 1 from public.materials_lists ml,
                   jsonb_array_elements(case when jsonb_typeof(ml.items) = 'array' then ml.items else '[]'::jsonb end) it
             where ml.user_id = p_firm and public._imp_name(it ->> 'name') = public._imp_name(v_name)) then
            v_reason := 'Already in your price book';
            v_matched := v_matched + 1;
          else
            select x.row_id into v_list from public.employer_import_rows x
             where x.batch_id = v_batch and x.kind = 'price_book' and x.table_name = 'materials_lists' limit 1;
            if v_list is null then
              insert into public.materials_lists (user_id, name, description, items)
              values (p_firm, 'Imported from ' || v_label,
                      'Prices brought across from ' || v_label || ' on ' || to_char(now(), 'DD Mon YYYY') || '.', '[]'::jsonb)
              returning id into v_list;
              insert into public.employer_import_rows (batch_id, employer_id, kind, table_name, row_id, source_ref, action)
              values (v_batch, p_firm, 'price_book', 'materials_lists', v_list, 'list', 'created');
            end if;
            v_id := gen_random_uuid();
            update public.materials_lists
               set items = coalesce(items, '[]'::jsonb) || jsonb_build_array(jsonb_strip_nulls(jsonb_build_object(
                     'id', v_id::text, 'name', v_name,
                     'unit', coalesce(public._imp_txt(r, 'unit', 30), 'each'),
                     'category', public._imp_txt(r, 'category', 100),
                     'supplier', public._imp_txt(r, 'supplier', 200),
                     'code', public._imp_txt(r, 'code', 100),
                     'cost_price', public._imp_num(r, 'buy'),
                     'estimated_price', coalesce(public._imp_num(r, 'sell'),
                        case when public._imp_num(r, 'buy') is not null
                             then round(public._imp_num(r, 'buy') * (1 + coalesce(public._imp_num(r, 'markup'), 0) / 100), 2) end),
                     'markup_percent', public._imp_num(r, 'markup'),
                     'quantity', 1, 'matched', false, 'added_at', v_now, 'price_updated_at', v_now,
                     'imported_from', p_source)))
             where id = v_list;
            insert into public.employer_import_rows (batch_id, employer_id, kind, table_name, row_id, source_ref, action)
            values (v_batch, p_firm, 'price_book', 'materials_list_items', v_id, v_ref, 'created');
            v_created := v_created + 1;
          end if;

        -- ── staff ──
        elsif p_kind = 'staff' then
          v_name := public._imp_txt(r, 'name', 200);
          if v_name is null then v_reason := 'No name'; raise exception using errcode = 'P0010'; end if;
          select e.id into v_id from public.employer_employees e
           where e.employer_id = p_firm and lower(coalesce(e.status, '')) <> 'archived'
             and ((public._imp_txt(r, 'email', 320) is not null and lower(e.email) = lower(public._imp_txt(r, 'email', 320)))
                  or public._imp_name(e.name) = public._imp_name(v_name))
           limit 1;
          if v_id is not null then
            v_reason := 'Already on your team';
            v_matched := v_matched + 1;
          else
            insert into public.employer_employees (
              employer_id, name, role, team_role, status, phone, email, avatar_initials, hourly_rate, join_date)
            values (
              p_firm, v_name,
              coalesce(public._imp_txt(r, 'role', 60), 'Electrician'), 'Team Member', 'Active',
              public._imp_txt(r, 'phone', 60), lower(public._imp_txt(r, 'email', 320)),
              upper(left(coalesce((select string_agg(left(w, 1), '') from regexp_split_to_table(v_name, '\s+') w where w <> ''), 'XX'), 3)),
              coalesce(public._imp_num(r, 'hourly_rate'), 0),
              public._imp_date(r, 'start_date'))
            returning id into v_id;
            insert into public.employer_import_rows (batch_id, employer_id, kind, table_name, row_id, source_ref, action)
            values (v_batch, p_firm, 'staff', 'employer_employees', v_id, v_ref, 'created');
            v_created := v_created + 1;
          end if;

        -- ── assets (kit register) ──
        elsif p_kind = 'assets' then
          v_name := public._imp_txt(r, 'name', 300);
          if v_name is null then v_reason := 'No name'; raise exception using errcode = 'P0010'; end if;
          v_id := public._imp_seen(p_firm, v_batch, p_source, 'assets', v_ref);
          if v_id is null and public._imp_txt(r, 'serial_number', 120) is not null then
            select t.id into v_id from public.employer_company_tools t
             where t.user_id = p_firm and lower(t.serial_number) = lower(public._imp_txt(r, 'serial_number', 120)) limit 1;
          end if;
          if v_id is null and public._imp_txt(r, 'tool_number', 60) is not null then
            select t.id into v_id from public.employer_company_tools t
             where t.user_id = p_firm and lower(t.tool_number) = lower(public._imp_txt(r, 'tool_number', 60)) limit 1;
          end if;
          if v_id is not null then
            v_reason := 'Already in your kit register';
            v_matched := v_matched + 1;
          else
            insert into public.employer_company_tools (
              user_id, name, category, serial_number, tool_number, purchase_date, purchase_price,
              status, pat_due, next_calibration, notes)
            values (
              p_firm, v_name, coalesce(public._imp_txt(r, 'category', 60), 'General'),
              public._imp_txt(r, 'serial_number', 120), public._imp_txt(r, 'tool_number', 60),
              public._imp_date(r, 'purchase_date'), coalesce(public._imp_num(r, 'purchase_price'), 0),
              'Available', public._imp_date(r, 'pat_due'), public._imp_date(r, 'calibration_due'),
              nullif(concat_ws(E'\n', public._imp_txt(r, 'notes', 4000), 'Imported from ' || v_label || '.'), ''))
            returning id into v_id;
            insert into public.employer_import_rows (batch_id, employer_id, kind, table_name, row_id, source_ref, action)
            values (v_batch, p_firm, 'assets', 'employer_company_tools', v_id, v_ref, 'created');
            v_created := v_created + 1;
          end if;
        end if;

        v_results := v_results || jsonb_build_array(jsonb_strip_nulls(jsonb_build_object(
          'i', i, 'id', v_id,
          'action', case when v_reason is null then 'created' else 'matched' end,
          'reason', v_reason)));
      exception when others then
        v_err := case when sqlstate = 'P0010' then v_reason else sqlerrm end;
        v_skipped := v_skipped + 1;
        v_results := v_results || jsonb_build_array(jsonb_build_object(
          'i', i, 'action', 'skipped', 'reason', left(coalesce(v_err, 'Could not import this row'), 300)));
      end;
    end loop;

    if p_dry_run then
      raise exception using errcode = 'P0011';
    end if;
  exception when sqlstate 'P0011' then
    null;  -- the dry run is rolled back; the counts and results survive
  end;

  return jsonb_build_object(
    'kind', p_kind, 'dry_run', p_dry_run,
    'created', v_created, 'matched', v_matched, 'skipped', v_skipped,
    'new_customers', v_new_customers, 'results', v_results);
end $$;

-- ── Undo ────────────────────────────────────────────────────────────────
--
-- Deletes what the import created, newest dependants first, up to p_limit
-- rows a call (the client loops until remaining = 0, which is the progress
-- bar). A record that has been used since the import is KEPT and listed:
-- an invoice sent or paid from Elec-Mate, a job with crew, time, photos or
-- certificates, a customer with other quotes, jobs or certificates, a team
-- member who has joined. Matched records were never the import's to delete.

create or replace function public.undo_firm_import(p_batch uuid, p_limit int default 300)
returns jsonb
language plpgsql security definer set search_path = public as $$
declare
  b public.employer_import_batches;
  r record;
  v_keep text;
  v_deleted int := 0;
  v_kept int := 0;
  v_remaining int;
  v_reasons jsonb := '[]'::jsonb;
  v_by jsonb := '{}'::jsonb;
  v_jobs uuid[];
  v_quotes uuid[];
begin
  select * into b from public.employer_import_batches where id = p_batch;
  if b.id is null or auth.uid() is null or not public.can_see_firm_money(b.employer_id) then
    raise exception 'Not allowed' using errcode = '42501';
  end if;
  if b.status = 'undone' then
    return jsonb_build_object('deleted', 0, 'kept', 0, 'remaining', 0, 'status', 'undone');
  end if;

  select coalesce(array_agg(row_id) filter (where table_name = 'employer_jobs'), '{}'),
         coalesce(array_agg(row_id) filter (where table_name = 'quotes'), '{}')
    into v_jobs, v_quotes
    from public.employer_import_rows where batch_id = p_batch and action = 'created';

  for r in
    select x.* from public.employer_import_rows x
     where x.batch_id = p_batch and x.action = 'created' and x.table_name <> 'materials_list_items'
     order by case x.table_name
                when 'quotes' then 1 when 'materials_lists' then 2 when 'employer_company_tools' then 3
                when 'employer_employees' then 4 when 'employer_jobs' then 5
                when 'customer_properties' then 6 when 'customers' then 7 else 8 end, x.id
     limit greatest(1, least(coalesce(p_limit, 300), 1000))
  loop
    v_keep := null;
    begin
      if r.table_name = 'quotes' then
        select case
                 when q.id is null then 'gone'
                 when q.invoice_sent_at is not null or q.first_sent_at is not null then 'Sent from Elec-Mate since the import'
                 when exists (select 1 from public.invoice_payments p where p.quote_id = q.id) then 'Has a payment recorded'
                 when exists (select 1 from public.credit_notes c where c.invoice_id = q.id) then 'Has a credit note'
                 when exists (select 1 from public.quotes z where (z.parent_quote_id = q.id or z.deposit_invoice_id = q.id or z.supersedes_id = q.id) and z.id <> all (v_quotes)) then 'Another quote or invoice is built on it'
               end
          into v_keep from (select 1) d left join public.quotes q on q.id = r.row_id;
        if v_keep is null then
          delete from public.employer_usage_events where ref_id = r.row_id;
          delete from public.quotes where id = r.row_id;
        end if;

      elsif r.table_name = 'materials_lists' then
        delete from public.materials_lists where id = r.row_id and user_id = b.employer_id;

      elsif r.table_name = 'employer_company_tools' then
        if exists (select 1 from public.employer_tool_checks c where c.tool_id = r.row_id)
           or exists (select 1 from public.employer_tool_events e where e.tool_id = r.row_id) then
          v_keep := 'Has checks or movements recorded';
        else
          delete from public.employer_company_tools where id = r.row_id and user_id = b.employer_id;
        end if;

      elsif r.table_name = 'employer_employees' then
        if exists (select 1 from public.employer_employees e where e.id = r.row_id and e.user_id is not null) then
          v_keep := 'Has joined the team';
        elsif exists (select 1 from public.employer_job_assignments a where a.employee_id = r.row_id)
           or exists (select 1 from public.employer_timesheets t where t.employee_id = r.row_id) then
          v_keep := 'Booked on jobs or has time logged';
        else
          delete from public.employer_seats where employee_id = r.row_id and user_id is null and status = 'pending';
          delete from public.employer_employees where id = r.row_id and employer_id = b.employer_id;
        end if;

      elsif r.table_name = 'employer_jobs' then
        if exists (select 1 from public.employer_job_assignments a where a.job_id = r.row_id)
           or exists (select 1 from public.employer_timesheets t where t.job_id = r.row_id)
           or exists (select 1 from public.employer_job_comments c where c.job_id = r.row_id)
           or exists (select 1 from public.employer_job_certificates c where c.job_id = r.row_id)
           or exists (select 1 from public.job_photos p where p.job_id = r.row_id)
           or exists (select 1 from public.employer_job_tasks t where t.job_id = r.row_id)
           or exists (select 1 from public.rams_documents d where d.employer_job_id = r.row_id)
           or exists (select 1 from public.employer_expense_claims x where x.job_id = r.row_id)
           or exists (select 1 from public.employer_material_orders o where o.job_id = r.row_id)
           or exists (select 1 from public.quotes q where q.employer_job_id = r.row_id) then
          v_keep := 'The job has been worked on since';
        else
          delete from public.employer_usage_events where ref_id = r.row_id;
          delete from public.employer_jobs where id = r.row_id and user_id = b.employer_id;
        end if;

      elsif r.table_name = 'customer_properties' then
        if exists (select 1 from public.reports x where x.property_id = r.row_id)
           or exists (select 1 from public.site_notes x where x.property_id = r.row_id)
           or exists (select 1 from public.photo_projects x where x.property_id = r.row_id) then
          v_keep := 'Has certificates, notes or photos';
        else
          delete from public.customer_properties where id = r.row_id and user_id = b.employer_id;
        end if;

      elsif r.table_name = 'customers' then
        if exists (select 1 from public.quotes x where x.customer_id = r.row_id)
           or exists (select 1 from public.employer_jobs x where x.customer_id = r.row_id)
           or exists (select 1 from public.reports x where x.customer_id = r.row_id)
           or exists (select 1 from public.customer_properties x where x.customer_id = r.row_id)
           or exists (select 1 from public.enquiries x where x.customer_id = r.row_id or x.matched_customer_id = r.row_id)
           or exists (select 1 from public.maintenance_contracts x where x.customer_id = r.row_id)
           or exists (select 1 from public.spark_projects x where x.customer_id = r.row_id)
           or exists (select 1 from public.client_portal_links x where x.customer_id = r.row_id)
           or exists (select 1 from public.employer_client_messages x where x.customer_id = r.row_id)
           or exists (select 1 from public.calendar_events x where x.client_id = r.row_id and x.mirrored_from_job is null) then
          v_keep := 'Has quotes, jobs, certificates or messages outside this import';
        else
          delete from public.customers where id = r.row_id and user_id = b.employer_id;
        end if;
      end if;
    exception when others then
      v_keep := 'Still in use (' || left(sqlerrm, 120) || ')';
    end;

    if v_keep = 'gone' then
      v_keep := null;  -- already deleted by hand; nothing to keep
    end if;
    if v_keep is null then
      delete from public.employer_import_rows where id = r.id;
      v_deleted := v_deleted + 1;
      v_by := jsonb_set(v_by, array[r.kind], to_jsonb(coalesce((v_by ->> r.kind)::int, 0) + 1));
    else
      update public.employer_import_rows set action = 'kept' where id = r.id;
      v_kept := v_kept + 1;
      v_reasons := v_reasons || jsonb_build_array(jsonb_build_object('kind', r.kind, 'id', r.row_id, 'reason', v_keep));
    end if;
  end loop;

  select count(*) into v_remaining from public.employer_import_rows
   where batch_id = p_batch and action = 'created' and table_name <> 'materials_list_items';

  update public.employer_import_batches
     set undo_counts = jsonb_build_object(
           'deleted', coalesce((undo_counts ->> 'deleted')::int, 0) + v_deleted,
           'kept', coalesce((undo_counts ->> 'kept')::int, 0) + v_kept,
           'kept_rows', coalesce(undo_counts -> 'kept_rows', '[]'::jsonb) || v_reasons),
         status = case when v_remaining = 0 then 'undone' else status end,
         undone_at = case when v_remaining = 0 then now() else undone_at end,
         undone_by = case when v_remaining = 0 then auth.uid() else undone_by end
   where id = p_batch;

  if v_remaining = 0 then
    delete from public.employer_import_rows where batch_id = p_batch and table_name = 'materials_list_items';
  end if;

  return jsonb_build_object('deleted', v_deleted, 'kept', v_kept, 'remaining', v_remaining,
                            'by_kind', v_by, 'kept_rows', v_reasons,
                            'status', case when v_remaining = 0 then 'undone' else 'undoing' end);
end $$;

revoke all on function public._imp_txt(jsonb, text, int) from public, anon;
revoke all on function public._imp_num(jsonb, text) from public, anon;
revoke all on function public._imp_date(jsonb, text) from public, anon;
revoke all on function public._imp_phone(text) from public, anon;
revoke all on function public._imp_pc(text) from public, anon;
revoke all on function public._imp_name(text) from public, anon;
revoke all on function public.start_firm_import(uuid, text, text[]) from public, anon;
revoke all on function public.finish_firm_import(uuid, boolean) from public, anon;
revoke all on function public.import_firm_rows(uuid, text, uuid, text, jsonb, boolean) from public, anon;
revoke all on function public.undo_firm_import(uuid, int) from public, anon;
grant execute on function public.start_firm_import(uuid, text, text[]) to authenticated;
grant execute on function public.finish_firm_import(uuid, boolean) to authenticated;
grant execute on function public.import_firm_rows(uuid, text, uuid, text, jsonb, boolean) to authenticated;
grant execute on function public.undo_firm_import(uuid, int) to authenticated;
