-- ============================================================================
-- Employer Hub ↔ apprentice OTJ attestation bridge (6 Oct 2026)
-- Applied live via MCP as 20261006_employer_apprentice_attestation.
--
-- Today the only way a supervisor can attest an apprentice's off-the-job entry
-- is the public /attest-ojt/<uuid> link the apprentice shares. The employer's
-- own hub never shows what is waiting. The one real join between the two
-- systems is employer_employees.user_id = college_otj_entries.student_id
-- (= college_students.user_id). This migration:
--   1. lets the apprentice's EMPLOYER pass the OTJ self-edit guard for the two
--      sanctioned transitions (attest / send back) on a PENDING entry;
--   2. adds get_employer_pending_otj_attestations() — the hub inbox;
--   3. adds attest_otj_as_employer(entry, decision, comment);
--   4. adds get_my_employer_link() so the apprentice can see who their employer
--      is and that they can attest in-app;
--   5. re-creates get_employer_apprentice_college_progress() with the hours
--      split by authority (college-verified vs workplace-attested) and the
--      count awaiting the employer. Workplace attestation and college
--      verification stay separate numbers — they are separate decisions.
-- ============================================================================

-- 1. Guard: employer attest / send-back of a pending entry ---------------------
CREATE OR REPLACE FUNCTION public.tg_guard_otj_self_edit()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Service-role / definer contexts (employer-attestation edge fn, crons):
  -- auth.uid() is NULL there; the guard must not break attestation.
  IF auth.uid() IS NULL THEN
    RETURN NEW;
  END IF;

  -- Staff at the entry's college: unrestricted (verification is their job).
  -- Key on OLD.college_id, never NEW -- else a learner who also holds a staff
  -- row at ANY college could rewrite college_id in the same UPDATE to take
  -- this branch.
  IF public._ch_same_college(OLD.college_id) THEN
    RETURN NEW;
  END IF;

  -- The apprentice's EMPLOYER (owner or co-admin of a company whose ACTIVE
  -- roster holds this learner) may attest, or send back, a PENDING entry —
  -- the in-app counterpart of the public /attest-ojt link. Identity columns
  -- must be untouched and the only allowed outcomes are the two below.
  IF OLD.verification_status = 'pending'
     AND OLD.student_id IS NOT NULL
     AND NEW.student_id = OLD.student_id
     AND NEW.college_id IS NOT DISTINCT FROM OLD.college_id
     AND NEW.recorded_by IS NOT DISTINCT FROM OLD.recorded_by
     AND NEW.verification_status IN ('verified_by_employer', 'rejected')
     AND EXISTS (
       SELECT 1 FROM public.employer_employees ee
        WHERE ee.user_id = OLD.student_id
          AND lower(coalesce(ee.status, '')) = 'active'
          AND ee.employer_id IN (SELECT public.my_employer_scope())
     ) THEN
    RETURN NEW;
  END IF;

  -- Learner editing their own entry.
  IF OLD.student_id = auth.uid() OR OLD.recorded_by = auth.uid() THEN
    -- Sanctioned transition: resubmitting a REJECTED entry back to pending
    -- (OJTHub editAndResubmit sets status='pending' + clears the rationale).
    IF OLD.verification_status = 'rejected'
       AND NEW.verification_status = 'pending'
       AND NEW.verification_rationale IS NULL THEN
      NULL; -- allowed; remaining column guards below still apply
    ELSE
      IF COALESCE(OLD.verification_status, 'pending') IS DISTINCT FROM 'pending' THEN
        RAISE EXCEPTION 'This OTJ entry has been reviewed and can no longer be edited.'
          USING errcode = 'check_violation';
      END IF;
      IF NEW.verification_status    IS DISTINCT FROM OLD.verification_status    THEN RAISE EXCEPTION 'You cannot change verification fields on your own OTJ entry.' USING errcode='check_violation'; END IF;
      IF NEW.verification_rationale IS DISTINCT FROM OLD.verification_rationale THEN RAISE EXCEPTION 'You cannot change verification fields on your own OTJ entry.' USING errcode='check_violation'; END IF;
    END IF;

    -- Verification / attestation / IQA columns are never learner-editable.
    IF NEW.verified_by           IS DISTINCT FROM OLD.verified_by           THEN RAISE EXCEPTION 'You cannot change verification fields on your own OTJ entry.' USING errcode='check_violation'; END IF;
    IF NEW.verified_at           IS DISTINCT FROM OLD.verified_at           THEN RAISE EXCEPTION 'You cannot change verification fields on your own OTJ entry.' USING errcode='check_violation'; END IF;
    IF NEW.attested_by_name      IS DISTINCT FROM OLD.attested_by_name      THEN RAISE EXCEPTION 'You cannot change verification fields on your own OTJ entry.' USING errcode='check_violation'; END IF;
    IF NEW.attestation_email     IS DISTINCT FROM OLD.attestation_email     THEN RAISE EXCEPTION 'You cannot change verification fields on your own OTJ entry.' USING errcode='check_violation'; END IF;
    IF NEW.attestation_comment   IS DISTINCT FROM OLD.attestation_comment   THEN RAISE EXCEPTION 'You cannot change verification fields on your own OTJ entry.' USING errcode='check_violation'; END IF;
    IF NEW.iqa_sampled_by        IS DISTINCT FROM OLD.iqa_sampled_by        THEN RAISE EXCEPTION 'You cannot change verification fields on your own OTJ entry.' USING errcode='check_violation'; END IF;
    IF NEW.iqa_sampled_at        IS DISTINCT FROM OLD.iqa_sampled_at        THEN RAISE EXCEPTION 'You cannot change verification fields on your own OTJ entry.' USING errcode='check_violation'; END IF;
    IF NEW.iqa_verdict           IS DISTINCT FROM OLD.iqa_verdict           THEN RAISE EXCEPTION 'You cannot change verification fields on your own OTJ entry.' USING errcode='check_violation'; END IF;
    IF NEW.iqa_feedback          IS DISTINCT FROM OLD.iqa_feedback          THEN RAISE EXCEPTION 'You cannot change verification fields on your own OTJ entry.' USING errcode='check_violation'; END IF;
    IF NEW.iqa_followup_required IS DISTINCT FROM OLD.iqa_followup_required THEN RAISE EXCEPTION 'You cannot change verification fields on your own OTJ entry.' USING errcode='check_violation'; END IF;
    IF NEW.recorded_by           IS DISTINCT FROM OLD.recorded_by           THEN RAISE EXCEPTION 'You cannot change verification fields on your own OTJ entry.' USING errcode='check_violation'; END IF;

    -- Identity columns immutable from the learner side.
    IF NEW.student_id IS DISTINCT FROM OLD.student_id THEN RAISE EXCEPTION 'You cannot change identity fields on your own OTJ entry.' USING errcode='check_violation'; END IF;
    IF NEW.college_id IS DISTINCT FROM OLD.college_id THEN RAISE EXCEPTION 'You cannot change identity fields on your own OTJ entry.' USING errcode='check_violation'; END IF;

    RETURN NEW;
  END IF;

  RAISE EXCEPTION 'not authorised to edit this OTJ entry' USING errcode = 'check_violation';
END;
$function$;

-- 2. Inbox: pending entries for apprentices on my active roster ---------------
CREATE OR REPLACE FUNCTION public.get_employer_pending_otj_attestations()
 RETURNS TABLE(
   entry_id uuid,
   student_user_id uuid,
   employee_id uuid,
   apprentice_name text,
   activity_date date,
   activity_type text,
   title text,
   description text,
   duration_minutes integer,
   source_kind text,
   evidence_urls text[],
   created_at timestamptz
 )
 LANGUAGE sql STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $$
  SELECT o.id, o.student_id, ee.id, ee.name, o.activity_date, o.activity_type,
         o.title, o.description, o.duration_minutes, o.source_kind, o.evidence_urls, o.created_at
    FROM public.employer_employees ee
    JOIN public.college_otj_entries o ON o.student_id = ee.user_id
   WHERE ee.employer_id IN (SELECT public.my_employer_scope())
     AND lower(coalesce(ee.status, '')) = 'active'
     AND o.verification_status = 'pending'
     AND o.source_kind IN ('apprentice_submitted', 'in_app')
   ORDER BY o.activity_date DESC, o.created_at DESC
$$;
REVOKE ALL ON FUNCTION public.get_employer_pending_otj_attestations() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_employer_pending_otj_attestations() TO authenticated, service_role;

-- 3. Decide: attest (workplace) or send back -----------------------------------
CREATE OR REPLACE FUNCTION public.attest_otj_as_employer(
  p_entry_id uuid,
  p_decision text DEFAULT 'attest',
  p_comment text DEFAULT NULL
) RETURNS jsonb
 LANGUAGE plpgsql SECURITY DEFINER
 SET search_path TO 'public'
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_entry record;
  v_name text;
  v_email text;
  v_comment text := nullif(left(btrim(coalesce(p_comment, '')), 2000), '');
BEGIN
  IF v_uid IS NULL THEN
    RETURN jsonb_build_object('error', 'Not authenticated');
  END IF;
  IF p_decision NOT IN ('attest', 'send_back') THEN
    RETURN jsonb_build_object('error', 'Unknown decision');
  END IF;

  SELECT o.* INTO v_entry
    FROM public.college_otj_entries o
   WHERE o.id = p_entry_id
     AND EXISTS (
       SELECT 1 FROM public.employer_employees ee
        WHERE ee.user_id = o.student_id
          AND lower(coalesce(ee.status, '')) = 'active'
          AND ee.employer_id IN (SELECT public.my_employer_scope())
     );
  IF v_entry IS NULL THEN
    RETURN jsonb_build_object('error', 'Entry not found on your roster');
  END IF;
  IF v_entry.verification_status <> 'pending' THEN
    RETURN jsonb_build_object('error', 'This entry has already been reviewed');
  END IF;

  SELECT coalesce(nullif(btrim(p.full_name), ''), 'Employer') INTO v_name
    FROM public.profiles p WHERE p.id = v_uid;
  SELECT u.email INTO v_email FROM auth.users u WHERE u.id = v_uid;

  IF p_decision = 'attest' THEN
    UPDATE public.college_otj_entries
       SET source_kind = 'employer_attested',
           verification_status = 'verified_by_employer',
           verified_at = now(),
           attested_by_name = v_name,
           attestation_email = v_email,
           attestation_comment = v_comment,
           updated_at = now()
     WHERE id = p_entry_id;
    RETURN jsonb_build_object('success', true, 'status', 'verified_by_employer',
                              'attested_by', v_name, 'attested_at', now());
  END IF;

  -- send_back: same outcome a tutor's "rejected" produces, so the apprentice's
  -- existing edit-and-resubmit flow applies. The rationale names the employer.
  IF v_comment IS NULL THEN
    RETURN jsonb_build_object('error', 'Say what needs changing so the apprentice can fix it');
  END IF;
  UPDATE public.college_otj_entries
     SET verification_status = 'rejected',
         verification_rationale = 'Employer (' || v_name || '): ' || v_comment,
         updated_at = now()
   WHERE id = p_entry_id;
  RETURN jsonb_build_object('success', true, 'status', 'rejected');
END;
$$;
REVOKE ALL ON FUNCTION public.attest_otj_as_employer(uuid, text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.attest_otj_as_employer(uuid, text, text) TO authenticated, service_role;

-- 4. Apprentice side: who is my employer? ---------------------------------------
CREATE OR REPLACE FUNCTION public.get_my_employer_link()
 RETURNS jsonb
 LANGUAGE sql STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $$
  WITH me AS (
    SELECT ee.id, ee.employer_id, ee.team_role, ee.name, ee.claimed_at, ee.created_at
      FROM public.employer_employees ee
     WHERE ee.user_id = auth.uid()
       AND ee.employer_id IS NOT NULL
       AND lower(coalesce(ee.status, '')) = 'active'
     ORDER BY ee.created_at DESC
     LIMIT 1
  )
  SELECT CASE WHEN me.id IS NULL THEN NULL ELSE jsonb_build_object(
    'employee_id', me.id,
    'employer_id', me.employer_id,
    'company_name', coalesce(cp.company_name, p.full_name, 'Your employer'),
    'team_role', me.team_role,
    'linked_since', coalesce(me.claimed_at, me.created_at),
    'supervisors', coalesce((
      SELECT jsonb_agg(jsonb_build_object('name', s.name, 'team_role', s.team_role) ORDER BY s.name)
        FROM public.employer_employees s
       WHERE s.employer_id = me.employer_id
         AND lower(coalesce(s.status, '')) = 'active'
         AND s.id <> me.id
         AND s.team_role IN ('Supervisor', 'QS', 'Project Manager')
    ), '[]'::jsonb),
    'pending_attestations', (
      SELECT count(*) FROM public.college_otj_entries o
       WHERE o.student_id = auth.uid()
         AND o.verification_status = 'pending'
         AND o.source_kind IN ('apprentice_submitted', 'in_app')
    ),
    'employer_attested_hours', coalesce((
      SELECT round(sum(o.duration_minutes) / 60.0)
        FROM public.college_otj_entries o
       WHERE o.student_id = auth.uid() AND o.verification_status = 'verified_by_employer'
    ), 0)
  ) END
  FROM me
  LEFT JOIN public.company_profiles cp ON cp.user_id = me.employer_id
  LEFT JOIN public.profiles p ON p.id = me.employer_id
$$;
REVOKE ALL ON FUNCTION public.get_my_employer_link() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_my_employer_link() TO authenticated, service_role;

-- 5. Progress RPC: split the hours by authority --------------------------------
DROP FUNCTION IF EXISTS public.get_employer_apprentice_college_progress();
CREATE FUNCTION public.get_employer_apprentice_college_progress()
 RETURNS TABLE(
   student_user_id uuid, name text, college_name text, course_name text,
   progress_percent integer, attendance_percent integer,
   otj_required_hours integer, otj_verified_hours integer, otj_on_track boolean,
   epa_status text, last_review_date date, review_overdue boolean,
   course_level text, awarding_body text, start_date date, expected_end_date date,
   risk_level text, otj_total_hours integer, epa_gateway_date date, epa_date date,
   next_review_date date, tutor_name text,
   otj_employer_attested_hours integer, otj_pending_attestation_count integer,
   employee_id uuid, team_role text
 )
 LANGUAGE sql STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select
    base.student_user_id,
    base.name,
    base.college_name,
    base.course_name,
    base.progress_percent,
    base.attendance_percent,
    base.otj_required_hours,
    base.otj_verified_hours,
    case
      when base.start_date is not null and base.expected_end_date is not null
           and base.expected_end_date > base.start_date
      then (base.otj_verified_hours + base.otj_employer_attested_hours) >= 0.9 * base.otj_required_hours *
           least(1.0::numeric, greatest(0.0::numeric,
             (current_date - base.start_date)::numeric
             / nullif((base.expected_end_date - base.start_date)::numeric, 0)))
      else (base.otj_verified_hours + base.otj_employer_attested_hours) >= 0.45 * base.otj_required_hours
    end as otj_on_track,
    base.epa_status,
    base.last_review_date,
    (base.last_review_date is null or base.last_review_date < current_date - 84) as review_overdue,
    base.course_level,
    base.awarding_body,
    base.start_date,
    base.expected_end_date,
    base.risk_level,
    base.otj_total_hours,
    base.epa_gateway_date,
    base.epa_date,
    base.next_review_date,
    base.tutor_name,
    base.otj_employer_attested_hours,
    base.otj_pending_attestation_count,
    base.employee_id,
    base.team_role
  from (
    select
      cs.id                       as cs_id,
      cs.user_id                  as student_user_id,
      ee.id                       as employee_id,
      ee.team_role                as team_role,
      cs.name                     as name,
      col.name                    as college_name,
      cc.name                     as course_name,
      coalesce(cs.progress_percent, 0)::int as progress_percent,
      coalesce((
        select round(100.0 * count(*) filter (where a.status in ('Present','Late'))
                     / nullif(count(*), 0))
        from college_attendance a where a.student_id = cs.id
      ), 0)::int                  as attendance_percent,
      coalesce(cc.otj_required_hours, 1066)::int as otj_required_hours,
      -- College-verified (tutor / assessor) hours ONLY
      coalesce((
        select round(sum(o.duration_minutes) / 60.0)
        from college_otj_entries o
        where o.student_id = cs.user_id and o.verification_status = 'verified'
      ), 0)::int                  as otj_verified_hours,
      -- Workplace-attested hours (employer / supervisor) — a separate authority
      coalesce((
        select round(sum(o.duration_minutes) / 60.0)
        from college_otj_entries o
        where o.student_id = cs.user_id and o.verification_status = 'verified_by_employer'
      ), 0)::int                  as otj_employer_attested_hours,
      coalesce((
        select count(*) from college_otj_entries o
        where o.student_id = cs.user_id
          and o.verification_status = 'pending'
          and o.source_kind in ('apprentice_submitted', 'in_app')
      ), 0)::int                  as otj_pending_attestation_count,
      coalesce((
        select round(sum(o.duration_minutes) / 60.0)
        from college_otj_entries o
        where o.student_id = cs.user_id
      ), 0)::int                  as otj_total_hours,
      (select e.status from college_epa e
         where e.student_id = cs.id
         order by e.updated_at desc nulls last limit 1) as epa_status,
      (select e.gateway_date from college_epa e
         where e.student_id = cs.id
         order by e.updated_at desc nulls last limit 1) as epa_gateway_date,
      (select e.epa_date from college_epa e
         where e.student_id = cs.id
         order by e.updated_at desc nulls last limit 1) as epa_date,
      (select i.last_reviewed from college_ilps i
         where i.student_id = cs.id
         order by i.last_reviewed desc nulls last limit 1) as last_review_date,
      (select i.review_date from college_ilps i
         where i.student_id = cs.id and i.is_current
         order by i.created_at desc limit 1) as next_review_date,
      (select i.tutor_name_snapshot from college_ilps i
         where i.student_id = cs.id and i.is_current
         order by i.created_at desc limit 1) as tutor_name,
      cc.level                    as course_level,
      cc.awarding_body            as awarding_body,
      cs.start_date,
      cs.expected_end_date,
      cs.risk_level
    from employer_employees ee
    join college_students cs on cs.user_id = ee.user_id
    left join colleges col       on col.id = cs.college_id
    left join college_courses cc on cc.id  = cs.course_id
    where ee.employer_id in (select public.my_employer_scope())
      and lower(coalesce(ee.status, '')) = 'active'
      and coalesce(lower(cs.status), '') not in ('withdrawn', 'archived')
  ) base
$function$;
REVOKE ALL ON FUNCTION public.get_employer_apprentice_college_progress() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_employer_apprentice_college_progress() TO authenticated, service_role;
