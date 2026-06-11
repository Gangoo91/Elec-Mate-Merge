-- ============================================================================
-- Slice 1 audit fixes
--
-- P1-1/P1-2: two of the 11 dropped tables had DEPLOYED consumers the repo
-- survey missed (generate-invoice-link edge fn; get/send_portal_message RPCs
-- behind the live /portal/:token route). Restored with original-compatible
-- shapes; RLS enabled with NO policies (access exclusively via the
-- service-role fn / definer RPCs).
--
-- P1-3: with tenant FKs + RESTRICTed history, account deletion requires
-- explicit teardown. teardown_employer_tenant() handles the company side;
-- admin_cleanup_user_data now calls it, deletes the worker's own Elec-ID
-- stubs, and UNLINKS (not deletes) roster rows at other employers so
-- employers keep their payroll history when a worker deletes their account.
--
-- (Applied live as tenant_model_audit_fixes + admin_cleanup_employer_aware;
-- this file records both. Full teardown body in the live DB / below.)
-- ============================================================================

create table if not exists public.employer_invoice_access (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references public.employer_invoices(id) on delete cascade,
  access_token text not null unique,
  client_email text,
  client_name text,
  status text not null default 'pending',
  expires_at timestamptz,
  viewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.employer_invoice_access enable row level security;
create index if not exists idx_employer_invoice_access_invoice on public.employer_invoice_access (invoice_id);

create table if not exists public.employer_client_messages (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references public.employer_jobs(id) on delete cascade,
  access_token text not null,
  message text not null,
  sender_type text not null default 'client',
  read_at timestamptz,
  created_at timestamptz not null default now()
);
alter table public.employer_client_messages enable row level security;
create index if not exists idx_employer_client_messages_token on public.employer_client_messages (access_token);
-- teardown_employer_tenant + admin_cleanup_user_data definitions:

create or replace function public.teardown_employer_tenant(p_user uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_deleted jsonb := '{}'::jsonb;
  v_count int;
begin
  delete from report_qs_reviews where employer_id = p_user;

  delete from employer_timesheets t using employer_employees e
    where t.employee_id = e.id and e.employer_id = p_user;
  delete from employer_expense_claims t using employer_employees e
    where t.employee_id = e.id and e.employer_id = p_user;
  delete from employer_certifications t using employer_employees e
    where t.employee_id = e.id and e.employer_id = p_user;
  delete from employer_leave_requests t using employer_employees e
    where t.employee_id = e.id and e.employer_id = p_user;
  delete from employee_holiday_allowances t using employer_employees e
    where t.employee_id = e.id and e.employer_id = p_user;
  delete from employee_leave_requests t using employer_employees e
    where t.employee_id = e.id and e.employer_id = p_user;
  delete from employee_qualifications t using employer_employees e
    where t.employee_id = e.id and e.employer_id = p_user;
  delete from employer_job_assignments t using employer_employees e
    where t.employee_id = e.id and e.employer_id = p_user;
  delete from employer_job_pack_acknowledgements t using employer_employees e
    where t.employee_id = e.id and e.employer_id = p_user;
  delete from briefing_attendees t using employer_employees e
    where t.employee_id = e.id and e.employer_id = p_user;
  delete from employer_communication_recipients t using employer_employees e
    where t.employee_id = e.id and e.employer_id = p_user;
  delete from employer_worker_locations t using employer_employees e
    where t.employee_id = e.id and e.employer_id = p_user;
  delete from employer_notifications t using employer_employees e
    where t.employee_id = e.id and e.employer_id = p_user;
  delete from employer_elec_id_share_links t using employer_elec_id_profiles p, employer_employees e
    where t.profile_id = p.id and p.employee_id = e.id and e.employer_id = p_user;
  delete from employer_elec_id_qualifications t using employer_elec_id_profiles p, employer_employees e
    where t.profile_id = p.id and p.employee_id = e.id and e.employer_id = p_user;
  delete from employer_elec_id_skills t using employer_elec_id_profiles p, employer_employees e
    where t.profile_id = p.id and p.employee_id = e.id and e.employer_id = p_user;
  delete from employer_elec_id_training t using employer_elec_id_profiles p, employer_employees e
    where t.profile_id = p.id and p.employee_id = e.id and e.employer_id = p_user;
  delete from employer_elec_id_work_history t using employer_elec_id_profiles p, employer_employees e
    where t.profile_id = p.id and p.employee_id = e.id and e.employer_id = p_user;
  delete from employer_elec_id_profiles t using employer_employees e
    where t.employee_id = e.id and e.employer_id = p_user;

  delete from employer_notifications where user_id = p_user;

  delete from employer_employees where employer_id = p_user;
  get diagnostics v_count = row_count;
  v_deleted := v_deleted || jsonb_build_object('employees', v_count);

  delete from employer_invoice_access t using employer_invoices i
    where t.invoice_id = i.id and i.employer_id = p_user;
  delete from employer_quote_acceptances t using employer_quotes q
    where t.quote_id = q.id and q.employer_id = p_user;
  delete from employer_quotes where employer_id = p_user;
  delete from employer_invoices where employer_id = p_user;
  delete from employer_suppliers where employer_id = p_user;
  delete from employer_price_book where employer_id = p_user;
  delete from employer_material_orders where employer_id = p_user;
  delete from employer_job_pack_documents t using employer_job_packs jp
    where t.job_pack_id = jp.id and jp.employer_id = p_user;
  delete from employer_job_packs where employer_id = p_user;
  delete from employer_job_labels where employer_id = p_user;
  delete from employer_incidents where employer_id = p_user;
  delete from employer_stripe_connected_accounts where employer_id = p_user;
  delete from employer_vacancies where employer_id = p_user;

  delete from employer_client_messages t using employer_jobs j
    where t.job_id = j.id and j.user_id = p_user;
  delete from employer_jobs where user_id = p_user;
  get diagnostics v_count = row_count;
  v_deleted := v_deleted || jsonb_build_object('jobs', v_count);

  delete from company_profiles where user_id = p_user;

  return v_deleted;
end;
$$;

revoke all on function public.teardown_employer_tenant(uuid) from public, anon, authenticated;
grant execute on function public.teardown_employer_tenant(uuid) to service_role;

-- admin_cleanup_user_data updated in the same slice (full body in live DB and
-- migration 'admin_cleanup_employer_aware'): now calls teardown_employer_tenant
-- first, deletes the worker's OWN Elec-ID stubs (employer_id IS NULL), and
-- UNLINKS (user_id = NULL) roster rows at other employers instead of deleting
-- them — employers keep payroll history when a worker deletes their account.
