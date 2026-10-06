-- community_pricing_submissions: "Authenticated users can view" (true) let any
-- signed-in user read every submission with the submitter's IP address and
-- browser. Only the admin moderation page reads this table; users submit.
-- Now: your own rows, or a platform admin. Admins can also UPDATE (approve /
-- reject) — the only update policy was "own rows", so moderation of other
-- people's submissions could not save.
drop policy if exists "Authenticated users can view" on public.community_pricing_submissions;
create policy "Users view their own submissions" on public.community_pricing_submissions
  for select to authenticated using (user_id = (select auth.uid()) or public.is_admin());
drop policy if exists "Admins moderate submissions" on public.community_pricing_submissions;
create policy "Admins moderate submissions" on public.community_pricing_submissions
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
