-- Harden the portfolio → AC coverage sync.
--
-- The original parser assumed numeric-only unit codes and a "Unit N" prefix.
-- Apprentice evidence is actually stored in the capture sheet's canonical
-- "<unitCode> AC <acCode>" format (e.g. "311 AC 1.2", "QELTK3/001 AC 2.3"),
-- and some qualifications use alphanumeric unit codes. The old regex silently
-- failed to resolve unit_code for those, so the coverage row never flipped to
-- 'evidenced'. This widens the unit-code parse to allow letters, slashes and
-- the bare "<unit> AC" form while keeping the assessor-stage protection.
CREATE OR REPLACE FUNCTION public.sync_portfolio_ac_evidence()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_student_id uuid;
  v_qual text;
BEGIN
  IF NEW.assessment_criteria_met IS NULL
     OR array_length(NEW.assessment_criteria_met, 1) IS NULL THEN
    RETURN NEW;
  END IF;

  -- The coverage tracker keys on college_students.id, not the auth uid.
  SELECT id INTO v_student_id
  FROM public.college_students WHERE user_id = NEW.user_id LIMIT 1;
  IF v_student_id IS NULL THEN RETURN NEW; END IF;

  -- Qualification the tracker is keyed on: the learner's active selection,
  -- falling back to whatever coverage rows already exist for them.
  SELECT q.code INTO v_qual
  FROM public.user_qualification_selections uqs
  JOIN public.qualifications q ON q.id = uqs.qualification_id
  WHERE uqs.user_id = NEW.user_id AND uqs.is_active
  LIMIT 1;
  IF v_qual IS NULL THEN
    SELECT qualification_code INTO v_qual
    FROM public.student_ac_coverage WHERE student_id = v_student_id LIMIT 1;
  END IF;
  IF v_qual IS NULL THEN RETURN NEW; END IF;

  WITH parsed AS (
    SELECT DISTINCT
      COALESCE(
        (regexp_match(s, 'Unit\s*([A-Za-z0-9/._-]+)'))[1],
        (regexp_match(s, '^\s*([A-Za-z0-9/._-]+)\s+AC\b'))[1],
        (regexp_match(s, '([A-Za-z0-9/._-]+)\s*AC\b'))[1]
      ) AS unit_code,
      (regexp_match(s, 'AC\s*([0-9]+(?:\.[0-9]+)*)'))[1] AS ac_code
    FROM unnest(NEW.assessment_criteria_met) AS s
  )
  UPDATE public.student_ac_coverage sac
  SET status = 'evidenced',
      evidence_count = GREATEST(COALESCE(sac.evidence_count, 0), 1),
      last_evidence_at = now(),
      updated_at = now()
  FROM parsed p
  WHERE sac.student_id = v_student_id
    AND sac.qualification_code = v_qual
    AND p.ac_code IS NOT NULL
    AND sac.unit_code = p.unit_code
    AND sac.ac_code = p.ac_code
    AND sac.status IN ('not_started', 'in_progress');

  RETURN NEW;
END;
$$;

-- Trigger already bound to this function name; CREATE OR REPLACE above suffices.
