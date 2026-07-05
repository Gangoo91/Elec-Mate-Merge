-- The cancel flow writes outcome='stayed'/'cancelled' back onto the user's own
-- survey row, but only INSERT/SELECT policies existed — the update silently
-- matched 0 rows, leaving every outcome 'pending' since the feature shipped.
create policy "users update own cancel survey"
  on public.cancel_survey_responses
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
