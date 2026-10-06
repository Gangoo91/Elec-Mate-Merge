-- EPA gateway checklist: college staff can start and maintain a learner's checklist.
-- Applied 6 Oct 2026 with Andrew's approval (EPA readiness rebuild).
--
-- Only assigned tutors/assessors could read or update a row, and NO staff
-- could insert one — so a tutor could never start a learner's gateway
-- checklist and the sign-offs part of readiness sat at zero for everyone
-- (0 rows existed). These policies are additive: active (non-archived) staff
-- at the learner's own college, via is_staff_for_learner_user. The learner
-- self-sign-off guard (trg_gateway_owner_guard, 20261006175000) is untouched.

drop policy if exists "College staff read gateway" on public.epa_gateway_checklist;
create policy "College staff read gateway"
  on public.epa_gateway_checklist for select to authenticated
  using (public.is_staff_for_learner_user(user_id));

drop policy if exists "College staff start gateway" on public.epa_gateway_checklist;
create policy "College staff start gateway"
  on public.epa_gateway_checklist for insert to authenticated
  with check (public.is_staff_for_learner_user(user_id));

drop policy if exists "College staff update gateway" on public.epa_gateway_checklist;
create policy "College staff update gateway"
  on public.epa_gateway_checklist for update to authenticated
  using (public.is_staff_for_learner_user(user_id))
  with check (public.is_staff_for_learner_user(user_id));
