-- ============================================================================
-- Employer Hub tenant model — Slice 1 (footings)
--
-- 1. DROP 11 dead tables (all verified: 0 rows AND 0 code consumers)
-- 2. employer_id ownership columns (default auth.uid()) + FKs on the
--    ownerless tables; missing FK added to employer_employees.employer_id.
--    Child tables (job_pack_documents/acks, job comments/checklists/labels,
--    quote_acceptances) derive tenancy through NOT NULL parent FKs.
-- 3. People references: uuid columns alongside the free-text name fields
--    (approved_by/created_by/reported_by/assigned_by were unaccountable text)
-- 4. History protection: employee-history FKs CASCADE → RESTRICT so deleting
--    a roster row can never destroy payroll/compliance history (archiving is
--    the supported path; deliberate teardown must clean up explicitly).
--    Ephemeral tables (notifications, worker_locations) keep CASCADE.
-- 5. Per-tenant numbering: quote/invoice numbers unique per company, not
--    globally (Company B's INV-001 must not collide with Company A's).
--
-- All affected tables verified 0 rows unless noted (employer_vacancies has 2
-- ownerless legacy rows → its employer_id stays nullable; everything else is
-- NOT NULL from birth).
--
-- Rollback: the dropped tables were created OUTSIDE repo migrations
-- (dashboard) — recreate from git history of types.ts or PITR if ever needed
-- (all were 0 rows; two with deployed consumers were restored by
-- 20260611130000_tenant_model_audit_fixes). Drop the new columns/constraints;
-- restore ON DELETE CASCADE on the listed FKs; restore global uniques on
-- quote_number/invoice_number.
-- ============================================================================

-- ─── 1. Dead tables (0 rows, 0 consumers — verified) ───────────────────────
drop table if exists public.employer_rams;
drop table if exists public.employer_invoice_access;
drop table if exists public.employer_team_members;
drop table if exists public.employer_app_settings;
drop table if exists public.employer_voice_sessions;
drop table if exists public.employer_knowledge_documents;
drop table if exists public.employer_automation_logs;
drop table if exists public.employer_automation_rules;
drop table if exists public.employer_client_messages;
drop table if exists public.employer_client_signoffs;
drop table if exists public.employer_client_portal_invites;

-- ─── 2. Ownership columns ───────────────────────────────────────────────────
-- default auth.uid(): every insert from an employer session stamps tenancy
-- automatically — no code churn, and Slice 2's RLS will enforce it anyway.

alter table public.employer_quotes
  add column if not exists employer_id uuid not null default auth.uid()
    references public.profiles(id);
alter table public.employer_invoices
  add column if not exists employer_id uuid not null default auth.uid()
    references public.profiles(id);
alter table public.employer_suppliers
  add column if not exists employer_id uuid not null default auth.uid()
    references public.profiles(id);
alter table public.employer_price_book
  add column if not exists employer_id uuid not null default auth.uid()
    references public.profiles(id);
alter table public.employer_material_orders
  add column if not exists employer_id uuid not null default auth.uid()
    references public.profiles(id);
alter table public.employer_job_packs
  add column if not exists employer_id uuid not null default auth.uid()
    references public.profiles(id);
alter table public.employer_job_labels
  add column if not exists employer_id uuid not null default auth.uid()
    references public.profiles(id);
alter table public.employer_incidents
  add column if not exists employer_id uuid not null default auth.uid()
    references public.profiles(id);
alter table public.employer_stripe_connected_accounts
  add column if not exists employer_id uuid not null default auth.uid()
    references public.profiles(id);

-- 2 legacy ownerless rows → nullable (flagged; assign or purge at build-out)
alter table public.employer_vacancies
  add column if not exists employer_id uuid default auth.uid()
    references public.profiles(id);

-- The roster's employer link finally gets a real constraint
do $$ begin
  alter table public.employer_employees
    add constraint employer_employees_employer_id_fkey
    foreign key (employer_id) references public.profiles(id);
exception when duplicate_object then null;
end $$;

create index if not exists idx_employer_quotes_employer on public.employer_quotes (employer_id);
create index if not exists idx_employer_invoices_employer on public.employer_invoices (employer_id);
create index if not exists idx_employer_suppliers_employer on public.employer_suppliers (employer_id);
create index if not exists idx_employer_price_book_employer on public.employer_price_book (employer_id);
create index if not exists idx_employer_material_orders_employer on public.employer_material_orders (employer_id);
create index if not exists idx_employer_job_packs_employer on public.employer_job_packs (employer_id);
create index if not exists idx_employer_job_labels_employer on public.employer_job_labels (employer_id);
create index if not exists idx_employer_incidents_employer on public.employer_incidents (employer_id);
create index if not exists idx_employer_vacancies_employer on public.employer_vacancies (employer_id);

-- ─── 3. Accountable people references (text names stay for display) ────────
alter table public.employer_timesheets
  add column if not exists approved_by_id uuid references public.profiles(id) on delete set null;
alter table public.employer_quotes
  add column if not exists created_by_id uuid references public.profiles(id) on delete set null;
alter table public.employer_material_orders
  add column if not exists ordered_by_id uuid references public.profiles(id) on delete set null;
alter table public.employer_incidents
  add column if not exists reported_by_id uuid references public.profiles(id) on delete set null;
alter table public.employer_job_assignments
  add column if not exists assigned_by_id uuid references public.profiles(id) on delete set null;

-- ─── 4. History survives people: CASCADE → RESTRICT ────────────────────────
-- Payroll / compliance / credential history must outlive a roster-row delete.
do $$
declare
  r record;
begin
  for r in
    select conrelid::regclass::text as tbl, conname,
           pg_get_constraintdef(oid) as def
      from pg_constraint
     where confrelid = 'public.employer_employees'::regclass
       and confdeltype = 'c'
       and conrelid::regclass::text in (
         'employer_certifications', 'employer_job_assignments',
         'employer_timesheets', 'employer_leave_requests',
         'employer_expense_claims', 'employer_job_pack_acknowledgements',
         'employee_holiday_allowances', 'employee_leave_requests',
         'employee_qualifications', 'employer_elec_id_profiles',
         'briefing_attendees', 'employer_communication_recipients'
       )
  loop
    execute format('alter table public.%I drop constraint %I', r.tbl, r.conname);
    execute format(
      'alter table public.%I add constraint %I %s',
      r.tbl, r.conname,
      replace(r.def, 'ON DELETE CASCADE', 'ON DELETE RESTRICT')
    );
  end loop;
end $$;

-- ─── 5. Per-tenant document numbering ───────────────────────────────────────
alter table public.employer_quotes drop constraint if exists employer_quotes_quote_number_key;
alter table public.employer_invoices drop constraint if exists employer_invoices_invoice_number_key;

create unique index if not exists uniq_employer_quotes_number
  on public.employer_quotes (employer_id, quote_number);
create unique index if not exists uniq_employer_invoices_number
  on public.employer_invoices (employer_id, invoice_number);