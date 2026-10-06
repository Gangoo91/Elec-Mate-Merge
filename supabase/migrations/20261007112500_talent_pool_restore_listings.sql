-- ELE-1958, Andrew 6 Oct: "put them all back in". Reverses the reset in
-- 20261007110500. The pre-reset list wasn't captured (no column separates the
-- 108 that were on from the 11 that were off), so restore by the choices that
-- ARE recorded: everyone who hasn't opted out of Elec-ID and hasn't made their
-- Elec-ID private. 104 profiles (the pool showed 100 before the reset).
-- The opt-in time is set to when they created their Elec-ID: that's when
-- activation put them in the pool. Anyone who switches on from now gets the
-- real time from trg_stamp_hire_opt_in.
update public.employer_elec_id_profiles
   set available_for_hire = true
 where available_for_hire is not true
   and opt_out = false
   and profile_visibility <> 'private';

update public.employer_elec_id_profiles
   set available_for_hire_opted_in_at = created_at
 where available_for_hire = true
   and opt_out = false
   and profile_visibility <> 'private'
   and available_for_hire_opted_in_at >= now() - interval '1 minute';

comment on column public.employer_elec_id_profiles.available_for_hire_opted_in_at is
  'When the electrician was put in the talent pool. From 6 Oct 2026 stamped by trg_stamp_hire_opt_in when they switch on "Let firms find me". For profiles listed before then (restored 6 Oct at Andrew''s decision, ELE-1958) it is their Elec-ID creation time, when activation listed them automatically.';
