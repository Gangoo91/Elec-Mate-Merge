-- ELE-1958 (part 3): take everyone out of the talent pool who never chose to be in it.
--
-- Evidence check, 6 Oct 2026 (live):
--   * 108 of 119 Elec-ID profiles had available_for_hire = true (8 of them also opt_out).
--   * available_for_hire_opted_in_at: NULL on all 108 — the stamp only exists since 6 Oct.
--   * The column defaulted to true AND the Elec-ID activation code (3bf2e2ede, Jan 2026)
--     wrote available_for_hire: true on every activation, so a true value can't be told
--     apart from someone switching it on. updated_at moves on any profile edit, so it is
--     not evidence either.
--   * No toggle is recorded anywhere: user_events, user_activity, employer_audit_log,
--     security_audit_log, admin_audit_logs, elec_id_verification_history — 0 rows.
-- Decision: no evidence of explicit opt-in for anyone → reset all of them to false.
-- They can switch "Let firms find me" back on in Elec-ID (which stamps the time).
-- The talent_pool_withdrawn_cleanup trigger empties any shortlist rows for them.

update public.employer_elec_id_profiles
   set available_for_hire = false
 where available_for_hire = true
   and available_for_hire_opted_in_at is null;

comment on column public.employer_elec_id_profiles.available_for_hire is
  'Opt-in talent-pool listing ("Let firms find me" in Elec-ID). Default false since 6 Oct 2026. On 6 Oct 2026 all 108 pre-existing true values were reset to false — none had evidence of an explicit opt-in (ELE-1958). Listed only when true AND available_for_hire_opted_in_at is set.';

comment on column public.employer_elec_id_profiles.available_for_hire_opted_in_at is
  'When the electrician last switched on "Let firms find me" (stamped by trg_stamp_hire_opt_in; cleared when they switch off). Proof of consent for the talent pool.';
