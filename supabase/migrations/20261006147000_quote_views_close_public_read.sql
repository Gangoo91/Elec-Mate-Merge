-- SECURITY (found 6 Oct while wiring hub quote links, ELE-1947):
--
-- quote_views had two policies for role PUBLIC (includes signed-out visitors):
--   SELECT  "Public can access active quote views via token"  qual: is_active AND not expired
--   UPDATE  "Allow anonymous tracking pixel updates"         qual: is_active
-- Neither checks the token, so anyone with the public app key could LIST every
-- active customer quote link (118 live rows confirmed with a count-only request)
-- and open each customer's quote, or UPDATE any active row.
--
-- Nothing needs them: the public quote page reads through SECURITY DEFINER
-- token RPCs (get_quote_by_public_token etc., none touch quote_views), and
-- every edge function that writes quote_views (email-open, quote-email-tracking,
-- quote-action, quote-automated-followup) uses the service role.
--
-- Owner access stays; the firm's active co-admins get the same (ELE-1831) so
-- the Employer Hub can make and copy the customer link.

drop policy if exists "Public can access active quote views via token" on public.quote_views;
drop policy if exists "Allow anonymous tracking pixel updates" on public.quote_views;

drop policy if exists "Firm managers read quote views" on public.quote_views;
create policy "Firm managers read quote views" on public.quote_views
  for select to authenticated
  using (exists (
    select 1 from public.quotes q
     where q.id = quote_views.quote_id
       and q.user_id in (select public.my_employer_scope())
  ));

drop policy if exists "Firm managers create quote views" on public.quote_views;
create policy "Firm managers create quote views" on public.quote_views
  for insert to authenticated
  with check (exists (
    select 1 from public.quotes q
     where q.id = quote_views.quote_id
       and q.user_id in (select public.my_employer_scope())
  ));
