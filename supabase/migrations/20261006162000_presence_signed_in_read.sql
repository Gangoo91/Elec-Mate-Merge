-- Review finding: restricting user_presence to own row (20261006148000) made
-- every other person show offline in peer chat and messages (usePeerPresence,
-- getMultipleUsersPresence read other users' rows). Restore read for SIGNED-IN
-- users only; signed-out visitors stay blocked. Applied live 6 Oct.
drop policy if exists "Signed-in users read presence" on public.user_presence;
create policy "Signed-in users read presence" on public.user_presence
  for select to authenticated using (true);
