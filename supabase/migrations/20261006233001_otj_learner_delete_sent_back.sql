-- A learner may delete their own OTJ record while it is waiting (pending) or
-- was sent back (rejected) — neither counts as hours. Deleting a diary day
-- whose training had been sent back left that record orphaned in the OTJ hub.
-- Signed-off records stay protected; staff keep what they had (6 Oct 2026).
drop policy if exists "Recorder can delete OTJ entries" on public.college_otj_entries;
create policy "Recorder can delete OTJ entries"
  on public.college_otj_entries for delete to authenticated
  using (
    recorded_by = (select auth.uid())
    and (verification_status in ('pending', 'rejected') or public._ch_same_college(college_id))
  );
