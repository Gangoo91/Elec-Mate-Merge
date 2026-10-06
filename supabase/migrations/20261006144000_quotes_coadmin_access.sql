-- ELE-1831: co-admins could not see their firm's quotes or invoices at all.
--
-- quotes and company_profiles only had owner policies (user_id = auth.uid()).
-- The Employer Hub filters a co-admin's list to the firm (getActingEmployerId),
-- RLS then returned nothing, and the screen showed a believable empty list.
--
-- my_employer_scope() = the caller + any firm they are an ACTIVE co-admin of,
-- so for a sole trader these policies grant exactly what they already had.
-- Additive (permissive) policies; the owner policies are untouched.
-- DELETE stays owner-only: money records are not removed by a second manager.

drop policy if exists "Firm managers read quotes" on public.quotes;
create policy "Firm managers read quotes" on public.quotes
  for select to authenticated
  using (user_id in (select public.my_employer_scope()));

drop policy if exists "Firm managers create quotes" on public.quotes;
create policy "Firm managers create quotes" on public.quotes
  for insert to authenticated
  with check (user_id in (select public.my_employer_scope()));

drop policy if exists "Firm managers update quotes" on public.quotes;
create policy "Firm managers update quotes" on public.quotes
  for update to authenticated
  using (user_id in (select public.my_employer_scope()))
  with check (user_id in (select public.my_employer_scope()));

-- Branding on previews, PDFs and emails is the firm's, so co-admins read it.
-- Editing company details stays with the owner (Settings).
drop policy if exists "Firm managers read company profile" on public.company_profiles;
create policy "Firm managers read company profile" on public.company_profiles
  for select to authenticated
  using (user_id in (select public.my_employer_scope()));

comment on table public.quotes is
  '[SHARED: ELECTRICAL HUB + EMPLOYER HUB] Quotes AND invoices for both hubs (invoice_raised = true makes it an invoice). PDFs, sending, Stripe pay links, Xero sync and certificate release all run on this table. Scope: user_id = the owning account (for a firm, the owner); active co-admins read, create and update via my_employer_scope() (since 6 Oct); delete is owner-only. Used by: Electrical Hub → Quotes/Invoices; Employer Hub → Quotes & invoices, Clients, Overview. Rule: Numbers come from assign_document_numbers (per owner) — insert quote_number/invoice_number NULL. employer_quotes/employer_invoices are legacy.';
