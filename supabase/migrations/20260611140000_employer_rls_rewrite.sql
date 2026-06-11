-- ============================================================================
-- Employer Hub RLS rewrite — Slice 2 (the security pour)
--
-- Replaces the blanket "Employer access only" policy (ALL commands for ANY
-- profiles.role='employer' user — zero tenant isolation) on 22 tables with:
--   • employer scoping: employer_id = auth.uid() directly, or derived
--     through NOT NULL parent FKs for child tables
--   • WORKER policies (linked roster row: employer_employees.user_id =
--     auth.uid(), active): workers can submit their own timesheets / leave /
--     expenses / locations, read their assignments + assigned jobs, sign
--     job packs, and comment on assigned jobs — none of which was possible
--     before (the blanket excluded the electrician role entirely)
--   • vacancies become readable by all signed-in users (they are job ads)
--
-- Storage: expense-receipts loses its "any authenticated user can read/
-- update/delete any receipt" policies (write=own uploads only; public-read
-- bucket flag retained because the app uses public URLs — tighten to signed
-- URLs at build-out). Missing buckets employee-photos + briefings created
-- to match existing code paths.
--
-- Rollback: drop the new policies; recreate "Employer access only" per table
--   (USING exists(select 1 from profiles where id=auth.uid() and
--    role='employer')); restore the four expense-receipts policies
--   (qual: bucket_id = 'expense-receipts' for r/w/d, check same for insert).
-- ============================================================================

create or replace function public.my_employee_ids()
returns setof uuid
language sql
security definer
set search_path = public
stable
as $$
  select id from employer_employees
   where user_id = auth.uid() and status ilike 'active';
$$;
grant execute on function public.my_employee_ids() to authenticated;

create or replace function public.is_assigned_to_job(p_job_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from employer_job_assignments a
    join employer_employees e on e.id = a.employee_id
    where a.job_id = p_job_id
      and e.user_id = auth.uid()
      and e.status ilike 'active'
  );
$$;
grant execute on function public.is_assigned_to_job(uuid) to authenticated;

do $$
declare r record;
begin
  for r in select polrelid::regclass::text as tbl from pg_policy where polname = 'Employer access only'
  loop
    execute format('drop policy "Employer access only" on %s', r.tbl);
  end loop;
end $$;

do $$
declare t text;
begin
  foreach t in array array[
    'employer_quotes','employer_invoices','employer_suppliers',
    'employer_price_book','employer_material_orders','employer_job_packs',
    'employer_job_labels','employer_incidents',
    'employer_stripe_connected_accounts','employer_vacancies'
  ]
  loop
    execute format($p$
      create policy "Employer owns rows" on public.%I
        for all to authenticated
        using (employer_id = (select auth.uid()))
        with check (employer_id = (select auth.uid()))
    $p$, t);
  end loop;
end $$;

create policy "Vacancies are public job ads"
  on public.employer_vacancies
  for select to authenticated
  using (true);

create policy "Employer manages team timesheets" on public.employer_timesheets
  for all to authenticated
  using (exists (select 1 from employer_employees e
                 where e.id = employee_id and e.employer_id = (select auth.uid())))
  with check (exists (select 1 from employer_employees e
                 where e.id = employee_id and e.employer_id = (select auth.uid())));
create policy "Worker reads own timesheets" on public.employer_timesheets
  for select to authenticated
  using (employee_id in (select public.my_employee_ids()));
create policy "Worker submits own timesheets" on public.employer_timesheets
  for insert to authenticated
  with check (employee_id in (select public.my_employee_ids()));
create policy "Worker edits own pending timesheets" on public.employer_timesheets
  for update to authenticated
  using (employee_id in (select public.my_employee_ids()) and status = 'Pending')
  with check (employee_id in (select public.my_employee_ids()) and status = 'Pending');

create policy "Employer manages team leave" on public.employer_leave_requests
  for all to authenticated
  using (exists (select 1 from employer_employees e
                 where e.id = employee_id and e.employer_id = (select auth.uid())))
  with check (exists (select 1 from employer_employees e
                 where e.id = employee_id and e.employer_id = (select auth.uid())));
create policy "Worker reads own leave" on public.employer_leave_requests
  for select to authenticated
  using (employee_id in (select public.my_employee_ids()));
create policy "Worker submits own leave" on public.employer_leave_requests
  for insert to authenticated
  with check (employee_id in (select public.my_employee_ids()));

create policy "Employer manages team expenses" on public.employer_expense_claims
  for all to authenticated
  using (exists (select 1 from employer_employees e
                 where e.id = employee_id and e.employer_id = (select auth.uid())))
  with check (exists (select 1 from employer_employees e
                 where e.id = employee_id and e.employer_id = (select auth.uid())));
create policy "Worker reads own expenses" on public.employer_expense_claims
  for select to authenticated
  using (employee_id in (select public.my_employee_ids()));
create policy "Worker submits own expenses" on public.employer_expense_claims
  for insert to authenticated
  with check (employee_id in (select public.my_employee_ids()));

create policy "Employer manages team certifications" on public.employer_certifications
  for all to authenticated
  using (exists (select 1 from employer_employees e
                 where e.id = employee_id and e.employer_id = (select auth.uid())))
  with check (exists (select 1 from employer_employees e
                 where e.id = employee_id and e.employer_id = (select auth.uid())));
create policy "Worker reads own certifications" on public.employer_certifications
  for select to authenticated
  using (employee_id in (select public.my_employee_ids()));

create policy "Employer manages assignments" on public.employer_job_assignments
  for all to authenticated
  using (exists (select 1 from employer_employees e
                 where e.id = employee_id and e.employer_id = (select auth.uid())))
  with check (exists (select 1 from employer_employees e
                 where e.id = employee_id and e.employer_id = (select auth.uid())));
create policy "Worker reads own assignments" on public.employer_job_assignments
  for select to authenticated
  using (employee_id in (select public.my_employee_ids()));

create policy "Employer reads team locations" on public.employer_worker_locations
  for select to authenticated
  using (exists (select 1 from employer_employees e
                 where e.id = employee_id and e.employer_id = (select auth.uid())));
create policy "Worker manages own location" on public.employer_worker_locations
  for all to authenticated
  using (employee_id in (select public.my_employee_ids()))
  with check (employee_id in (select public.my_employee_ids()));

create policy "Employer manages pack acknowledgements" on public.employer_job_pack_acknowledgements
  for all to authenticated
  using (exists (select 1 from employer_job_packs jp
                 where jp.id = job_pack_id and jp.employer_id = (select auth.uid())))
  with check (exists (select 1 from employer_job_packs jp
                 where jp.id = job_pack_id and jp.employer_id = (select auth.uid())));
create policy "Worker reads own pack acknowledgements" on public.employer_job_pack_acknowledgements
  for select to authenticated
  using (employee_id in (select public.my_employee_ids()));
create policy "Worker signs own pack acknowledgements" on public.employer_job_pack_acknowledgements
  for update to authenticated
  using (employee_id in (select public.my_employee_ids()))
  with check (employee_id in (select public.my_employee_ids()));

create policy "Employer manages pack documents" on public.employer_job_pack_documents
  for all to authenticated
  using (exists (select 1 from employer_job_packs jp
                 where jp.id = job_pack_id and jp.employer_id = (select auth.uid())))
  with check (exists (select 1 from employer_job_packs jp
                 where jp.id = job_pack_id and jp.employer_id = (select auth.uid())));
create policy "Worker reads acknowledged pack documents" on public.employer_job_pack_documents
  for select to authenticated
  using (exists (select 1 from employer_job_pack_acknowledgements a
                 where a.job_pack_id = employer_job_pack_documents.job_pack_id
                   and a.employee_id in (select public.my_employee_ids())));

create policy "Employer manages quote acceptances" on public.employer_quote_acceptances
  for all to authenticated
  using (exists (select 1 from employer_quotes q
                 where q.id = quote_id and q.employer_id = (select auth.uid())))
  with check (exists (select 1 from employer_quotes q
                 where q.id = quote_id and q.employer_id = (select auth.uid())));

create policy "Employer manages job checklists" on public.employer_job_checklist_items
  for all to authenticated
  using (exists (select 1 from employer_jobs j
                 where j.id = job_id and j.user_id = (select auth.uid())))
  with check (exists (select 1 from employer_jobs j
                 where j.id = job_id and j.user_id = (select auth.uid())));
create policy "Worker ticks assigned job checklists" on public.employer_job_checklist_items
  for select to authenticated
  using (public.is_assigned_to_job(job_id));
create policy "Worker updates assigned job checklists" on public.employer_job_checklist_items
  for update to authenticated
  using (public.is_assigned_to_job(job_id))
  with check (public.is_assigned_to_job(job_id));

create policy "Employer manages job comments" on public.employer_job_comments
  for all to authenticated
  using (exists (select 1 from employer_jobs j
                 where j.id = job_id and j.user_id = (select auth.uid())))
  with check (exists (select 1 from employer_jobs j
                 where j.id = job_id and j.user_id = (select auth.uid())));
create policy "Worker reads assigned job comments" on public.employer_job_comments
  for select to authenticated
  using (public.is_assigned_to_job(job_id));
create policy "Worker comments on assigned jobs" on public.employer_job_comments
  for insert to authenticated
  with check (public.is_assigned_to_job(job_id));

create policy "Employer manages label assignments" on public.employer_job_label_assignments
  for all to authenticated
  using (exists (select 1 from employer_jobs j
                 where j.id = job_id and j.user_id = (select auth.uid())))
  with check (exists (select 1 from employer_jobs j
                 where j.id = job_id and j.user_id = (select auth.uid())));

create policy "Worker reads assigned jobs" on public.employer_jobs
  for select to authenticated
  using (public.is_assigned_to_job(id));

drop policy if exists "Users can view expense receipts" on storage.objects;
drop policy if exists "Users can update expense receipts" on storage.objects;
drop policy if exists "Users can delete expense receipts" on storage.objects;
drop policy if exists "Users can upload expense receipts" on storage.objects;

create policy "Upload expense receipts"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'expense-receipts');
create policy "Manage own expense receipts"
  on storage.objects for all to authenticated
  using (bucket_id = 'expense-receipts' and owner = (select auth.uid()));

insert into storage.buckets (id, name, public)
values ('employee-photos', 'employee-photos', true)
on conflict (id) do nothing;
insert into storage.buckets (id, name, public)
values ('briefings', 'briefings', true)
on conflict (id) do nothing;

create policy "Authenticated upload employee photos"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'employee-photos');
create policy "Manage own employee photos"
  on storage.objects for all to authenticated
  using (bucket_id = 'employee-photos' and owner = (select auth.uid()));

create policy "Upload own briefing signatures"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'briefings' and (storage.foldername(name))[2] = (select auth.uid())::text);
create policy "Manage own briefing signatures"
  on storage.objects for all to authenticated
  using (bucket_id = 'briefings' and owner = (select auth.uid()));
