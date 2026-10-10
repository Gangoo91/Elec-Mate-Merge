-- Review fix L10 (ELE-2091 / ELE-2075), 10 Oct 2026. Additive: grants only.
--
-- employer_hire_offers, employer_starters (20261010282000) and
-- employer_hr_file_purges (20261010288300) kept Supabase's default table
-- grants, so anon and authenticated held INSERT/UPDATE/DELETE. RLS already
-- returned and allowed nothing beyond the owner/admin read policies; this
-- removes the grants as well, matching 20261010274000. All three are written
-- only by SECURITY DEFINER functions, and the app reads them as owner/admin
-- (SELECT stays for authenticated; the fit-note delete policy on
-- storage.objects reads employer_hr_file_purges as the signed-in user).
revoke all on public.employer_hire_offers from anon;
revoke all on public.employer_starters from anon;
revoke all on public.employer_hr_file_purges from anon;
revoke insert, update, delete, truncate, references, trigger
  on public.employer_hire_offers from authenticated;
revoke insert, update, delete, truncate, references, trigger
  on public.employer_starters from authenticated;
revoke insert, update, delete, truncate, references, trigger
  on public.employer_hr_file_purges from authenticated;
