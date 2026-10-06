-- ELE-1831: co-admins saw an empty Employer Hub on most screens.
--
-- These firm tables only had owner policies (user_id / employer_id = auth.uid()).
-- The app now keys them on the firm (getActingEmployerId), and these additive
-- policies let the firm's ACTIVE co-admins in via my_employer_scope().
-- my_employer_scope() = the caller + firms they co-admin, so owners, sole
-- traders and workers get exactly what they had before.

do $$
declare
  t text;
begin
  -- Firm-owned by user_id
  foreach t in array array[
    'briefings','client_portal_links','compliance_documents','contracts','job_financials',
    'job_issues','job_photos','maintenance_contracts','progress_logs','saved_opportunities',
    'signature_requests','tenders','tender_applications','tender_estimates',
    'user_tender_preferences','training_records','variation_orders','vehicles',
    'employee_holiday_allowances'
  ] loop
    execute format('drop policy if exists "Firm managers manage %1$s" on public.%1$I', t);
    execute format(
      'create policy "Firm managers manage %1$s" on public.%1$I for all to authenticated
         using (user_id in (select public.my_employer_scope()))
         with check (user_id in (select public.my_employer_scope()))', t);
  end loop;

  -- Firm-owned by employer_id
  foreach t in array array['competence_requirement_sets','elec_id_training_requests','team_channels'] loop
    execute format('drop policy if exists "Firm managers manage %1$s" on public.%1$I', t);
    execute format(
      'create policy "Firm managers manage %1$s" on public.%1$I for all to authenticated
         using (employer_id in (select public.my_employer_scope()))
         with check (employer_id in (select public.my_employer_scope()))', t);
  end loop;

  -- Van records: the firm's own rows, or any row on one of the firm's vans
  -- (a driver's daily check is written under the driver).
  foreach t in array array['fuel_logs','vehicle_checks','vehicle_documents','vehicle_services','vehicle_tools'] loop
    execute format('drop policy if exists "Firm managers manage %1$s" on public.%1$I', t);
    execute format(
      'create policy "Firm managers manage %1$s" on public.%1$I for all to authenticated
         using (user_id in (select public.my_employer_scope())
                or vehicle_id in (select v.id from public.vehicles v where v.user_id in (select public.my_employer_scope())))
         with check (user_id in (select public.my_employer_scope())
                or vehicle_id in (select v.id from public.vehicles v where v.user_id in (select public.my_employer_scope())))', t);
  end loop;

  -- Job costing on the owner's Electrical Hub projects: read-only for co-admins.
  foreach t in array array['job_cost_entries','job_materials','time_sessions'] loop
    execute format('drop policy if exists "Firm managers read %1$s" on public.%1$I', t);
    execute format(
      'create policy "Firm managers read %1$s" on public.%1$I for select to authenticated
         using (user_id in (select public.my_employer_scope()))', t);
  end loop;
end $$;
