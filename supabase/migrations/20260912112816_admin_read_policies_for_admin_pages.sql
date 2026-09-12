-- Admin pages could not see the data they exist to show.
--
-- Every one of these tables is read directly from the browser by an admin
-- page, and none had an admin SELECT policy — so the page returned the
-- ADMIN'S OWN slice and rendered it as the platform's. Measured 12 Sep 2026:
--
--   failed_payment_emails      218 rows, admin saw 0   ← AdminFailedPayments
--   employer_vacancies           2 rows, admin saw 0   ← AdminEmployerModeration
--   employer_elec_id_profiles  118 rows, admin saw 103 ← AdminElecIds
--
-- The failed-payments one is the worst: an empty page reads as "no failed
-- payments", which is the most damaging thing a billing screen can say.
-- employer_vacancies is structurally broken — the only policies are "employer
-- owns rows" and "open vacancies are public", and a MODERATION queue exists
-- precisely to review the ones that are not yet open.
--
-- `reports` is deliberately NOT included. Admins get aggregate counts through
-- admin_platform_counts(); granting row-level read over every customer's
-- certificates is a bigger privacy decision than this migration should make.
--
-- `user_events` is also excluded: 2.26M rows, and the only admin need is a
-- count, which admin_platform_counts() already returns.

create policy "Admins can read failed payment emails"
on public.failed_payment_emails
for select
to authenticated
using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.admin_role is not null));

create policy "Admins can read all vacancies"
on public.employer_vacancies
for select
to authenticated
using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.admin_role is not null));

create policy "Admins can read all elec id profiles"
on public.employer_elec_id_profiles
for select
to authenticated
using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.admin_role is not null));
