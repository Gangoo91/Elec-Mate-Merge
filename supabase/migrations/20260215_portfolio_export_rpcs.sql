-- Structured Portfolio Export RPCs
-- Two SECURITY DEFINER functions for generating structured portfolio export data:
-- 1. get_portfolio_export_data(p_user_id) — for authenticated apprentice
-- 2. get_shared_portfolio_export_data(p_share_token) — for public share view

-- ============================================
-- 1. Authenticated: get_portfolio_export_data
-- ============================================
CREATE OR REPLACE FUNCTION get_portfolio_export_data(p_user_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_result JSONB;
  v_apprentice JSONB;
  v_units JSONB;
  v_ksb_summary JSONB;
  v_otj JSONB;
  v_entries JSONB;
  v_qual_id UUID;
  v_qual_code TEXT;
BEGIN
  -- Verify calling user matches
  IF auth.uid() IS NULL OR auth.uid() != p_user_id THEN
    RETURN jsonb_build_object('error', 'Unauthorised');
  END IF;

  -- Get apprentice info + active qualification
  SELECT jsonb_build_object(
    'name', COALESCE(p.full_name, p.username, 'Unknown'),
    'qualification', COALESCE(q.title, 'Not selected'),
    'code', COALESCE(q.code, ''),
    'awarding_body', COALESCE(q.awarding_body, ''),
    'level', COALESCE(q.level, ''),
    'employer', '',
    'training_provider', '',
    'start_date', NULL,
    'expected_end', NULL
  ),
  q.id,
  q.code
  INTO v_apprentice, v_qual_id, v_qual_code
  FROM profiles p
  LEFT JOIN user_qualification_selections uqs
    ON uqs.user_id = p.id AND uqs.is_active = true
  LEFT JOIN qualifications q
    ON q.id = uqs.qualification_id
  WHERE p.id = p_user_id;

  IF v_apprentice IS NULL THEN
    RETURN jsonb_build_object('error', 'User not found');
  END IF;

  -- Get units with learning outcomes and assessment criteria coverage
  SELECT COALESCE(jsonb_agg(unit_row ORDER BY qr.unit_code), '[]'::jsonb)
  INTO v_units
  FROM (
    SELECT DISTINCT ON (qr2.unit_code)
      jsonb_build_object(
        'unit_code', qr2.unit_code,
        'unit_title', qr2.unit_title,
        'learning_outcomes', (
          SELECT COALESCE(jsonb_agg(
            jsonb_build_object(
              'lo_number', qr3.learning_outcome_number,
              'lo_text', qr3.learning_outcome,
              'assessment_criteria', (
                SELECT COALESCE(jsonb_agg(
                  jsonb_build_object(
                    'ac_text', ac_item,
                    'is_met', EXISTS (
                      SELECT 1 FROM portfolio_items pi2
                      WHERE pi2.user_id = p_user_id
                        AND ac_item = ANY(pi2.assessment_criteria_met)
                    )
                  )
                ), '[]'::jsonb)
                FROM unnest(qr3.assessment_criteria) AS ac_item
              )
            )
            ORDER BY qr3.learning_outcome_number
          ), '[]'::jsonb)
          FROM qualification_requirements qr3
          WHERE qr3.qualification_code = v_qual_code
            AND qr3.unit_code = qr2.unit_code
        )
      ) AS unit_row
    FROM qualification_requirements qr2
    WHERE qr2.qualification_code = v_qual_code
    ORDER BY qr2.unit_code
  ) qr;

  -- Get KSB summary
  SELECT jsonb_build_object(
    'knowledge', COALESCE((
      SELECT jsonb_agg(
        jsonb_build_object(
          'code', ak.code,
          'title', ak.title,
          'route', ak.route,
          'status', COALESCE(ukp.status, 'not_started'),
          'delivering_units', (
            SELECT COALESCE(jsonb_agg(
              jsonb_build_object('unit_code', kum.unit_code, 'unit_title', kum.unit_title, 'mapping_type', kum.mapping_type)
            ), '[]'::jsonb)
            FROM ksb_unit_mapping kum WHERE kum.ksb_id = ak.id
          )
        )
        ORDER BY ak.sort_order, ak.code
      )
      FROM apprenticeship_ksbs ak
      LEFT JOIN user_ksb_progress ukp ON ukp.ksb_id = ak.id AND ukp.user_id = p_user_id
      WHERE ak.qualification_id = v_qual_id
        AND ak.ksb_type = 'knowledge'
    ), '[]'::jsonb),
    'behaviours', COALESCE((
      SELECT jsonb_agg(
        jsonb_build_object(
          'code', ak.code,
          'title', ak.title,
          'route', ak.route,
          'status', COALESCE(ukp.status, 'not_started'),
          'delivering_units', (
            SELECT COALESCE(jsonb_agg(
              jsonb_build_object('unit_code', kum.unit_code, 'unit_title', kum.unit_title, 'mapping_type', kum.mapping_type)
            ), '[]'::jsonb)
            FROM ksb_unit_mapping kum WHERE kum.ksb_id = ak.id
          )
        )
        ORDER BY ak.sort_order, ak.code
      )
      FROM apprenticeship_ksbs ak
      LEFT JOIN user_ksb_progress ukp ON ukp.ksb_id = ak.id AND ukp.user_id = p_user_id
      WHERE ak.qualification_id = v_qual_id
        AND ak.ksb_type = 'behaviour'
    ), '[]'::jsonb)
  ) INTO v_ksb_summary;

  -- Get OTJ hours from compliance_goals
  SELECT jsonb_build_object(
    'current', COALESCE(cg.current_hours, 0),
    'target', COALESCE(cg.target_hours, 0),
    'percentage', COALESCE(cg.compliance_percentage, 0)
  )
  INTO v_otj
  FROM compliance_goals cg
  WHERE cg.user_id = p_user_id
    AND cg.goal_type = '20_percent_otj'
    AND cg.status = 'active'
  LIMIT 1;

  IF v_otj IS NULL THEN
    v_otj := jsonb_build_object('current', 0, 'target', 0, 'percentage', 0);
  END IF;

  -- Get evidence entries
  SELECT COALESCE(jsonb_agg(
    jsonb_build_object(
      'id', pi.id,
      'title', pi.title,
      'description', pi.description,
      'category', pi.category,
      'skills_demonstrated', pi.skills_demonstrated,
      'learning_outcomes_met', pi.learning_outcomes_met,
      'assessment_criteria_met', pi.assessment_criteria_met,
      'grade', pi.grade,
      'created_at', pi.created_at
    )
    ORDER BY pi.created_at DESC
  ), '[]'::jsonb)
  INTO v_entries
  FROM portfolio_items pi
  WHERE pi.user_id = p_user_id;

  -- Build final result
  v_result := jsonb_build_object(
    'apprentice', v_apprentice,
    'units', COALESCE(v_units, '[]'::jsonb),
    'ksb_summary', COALESCE(v_ksb_summary, jsonb_build_object('knowledge', '[]'::jsonb, 'behaviours', '[]'::jsonb)),
    'otj_hours', v_otj,
    'entries', v_entries
  );

  RETURN v_result;
END;
$$;

-- ============================================
-- 2. Public: get_shared_portfolio_export_data
-- ============================================
CREATE OR REPLACE FUNCTION get_shared_portfolio_export_data(p_share_token TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_share RECORD;
  v_user_id UUID;
  v_result JSONB;
  v_apprentice JSONB;
  v_units JSONB;
  v_ksb_summary JSONB;
  v_otj JSONB;
  v_entries JSONB;
  v_qual_id UUID;
  v_qual_code TEXT;
BEGIN
  -- Validate share token
  SELECT * INTO v_share
  FROM portfolio_shares
  WHERE token = p_share_token
    AND is_active = true
    AND (expires_at IS NULL OR expires_at > now());

  IF v_share IS NULL THEN
    RETURN jsonb_build_object('error', 'Invalid or expired share link');
  END IF;

  v_user_id := v_share.user_id;

  -- Get apprentice info + active qualification
  SELECT jsonb_build_object(
    'name', COALESCE(p.full_name, p.username, 'Unknown'),
    'qualification', COALESCE(q.title, 'Not selected'),
    'code', COALESCE(q.code, ''),
    'awarding_body', COALESCE(q.awarding_body, ''),
    'level', COALESCE(q.level, ''),
    'employer', '',
    'training_provider', '',
    'start_date', NULL,
    'expected_end', NULL
  ),
  q.id,
  q.code
  INTO v_apprentice, v_qual_id, v_qual_code
  FROM profiles p
  LEFT JOIN user_qualification_selections uqs
    ON uqs.user_id = p.id AND uqs.is_active = true
  LEFT JOIN qualifications q
    ON q.id = uqs.qualification_id
  WHERE p.id = v_user_id;

  IF v_apprentice IS NULL THEN
    RETURN jsonb_build_object('error', 'User not found');
  END IF;

  -- Get units with learning outcomes and assessment criteria coverage
  SELECT COALESCE(jsonb_agg(unit_row ORDER BY qr.unit_code), '[]'::jsonb)
  INTO v_units
  FROM (
    SELECT DISTINCT ON (qr2.unit_code)
      jsonb_build_object(
        'unit_code', qr2.unit_code,
        'unit_title', qr2.unit_title,
        'learning_outcomes', (
          SELECT COALESCE(jsonb_agg(
            jsonb_build_object(
              'lo_number', qr3.learning_outcome_number,
              'lo_text', qr3.learning_outcome,
              'assessment_criteria', (
                SELECT COALESCE(jsonb_agg(
                  jsonb_build_object(
                    'ac_text', ac_item,
                    'is_met', EXISTS (
                      SELECT 1 FROM portfolio_items pi2
                      WHERE pi2.user_id = v_user_id
                        AND ac_item = ANY(pi2.assessment_criteria_met)
                    )
                  )
                ), '[]'::jsonb)
                FROM unnest(qr3.assessment_criteria) AS ac_item
              )
            )
            ORDER BY qr3.learning_outcome_number
          ), '[]'::jsonb)
          FROM qualification_requirements qr3
          WHERE qr3.qualification_code = v_qual_code
            AND qr3.unit_code = qr2.unit_code
        )
      ) AS unit_row
    FROM qualification_requirements qr2
    WHERE qr2.qualification_code = v_qual_code
    ORDER BY qr2.unit_code
  ) qr;

  -- Get KSB summary
  SELECT jsonb_build_object(
    'knowledge', COALESCE((
      SELECT jsonb_agg(
        jsonb_build_object(
          'code', ak.code,
          'title', ak.title,
          'route', ak.route,
          'status', COALESCE(ukp.status, 'not_started'),
          'delivering_units', (
            SELECT COALESCE(jsonb_agg(
              jsonb_build_object('unit_code', kum.unit_code, 'unit_title', kum.unit_title, 'mapping_type', kum.mapping_type)
            ), '[]'::jsonb)
            FROM ksb_unit_mapping kum WHERE kum.ksb_id = ak.id
          )
        )
        ORDER BY ak.sort_order, ak.code
      )
      FROM apprenticeship_ksbs ak
      LEFT JOIN user_ksb_progress ukp ON ukp.ksb_id = ak.id AND ukp.user_id = v_user_id
      WHERE ak.qualification_id = v_qual_id
        AND ak.ksb_type = 'knowledge'
    ), '[]'::jsonb),
    'behaviours', COALESCE((
      SELECT jsonb_agg(
        jsonb_build_object(
          'code', ak.code,
          'title', ak.title,
          'route', ak.route,
          'status', COALESCE(ukp.status, 'not_started'),
          'delivering_units', (
            SELECT COALESCE(jsonb_agg(
              jsonb_build_object('unit_code', kum.unit_code, 'unit_title', kum.unit_title, 'mapping_type', kum.mapping_type)
            ), '[]'::jsonb)
            FROM ksb_unit_mapping kum WHERE kum.ksb_id = ak.id
          )
        )
        ORDER BY ak.sort_order, ak.code
      )
      FROM apprenticeship_ksbs ak
      LEFT JOIN user_ksb_progress ukp ON ukp.ksb_id = ak.id AND ukp.user_id = v_user_id
      WHERE ak.qualification_id = v_qual_id
        AND ak.ksb_type = 'behaviour'
    ), '[]'::jsonb)
  ) INTO v_ksb_summary;

  -- Get OTJ hours from compliance_goals
  SELECT jsonb_build_object(
    'current', COALESCE(cg.current_hours, 0),
    'target', COALESCE(cg.target_hours, 0),
    'percentage', COALESCE(cg.compliance_percentage, 0)
  )
  INTO v_otj
  FROM compliance_goals cg
  WHERE cg.user_id = v_user_id
    AND cg.goal_type = '20_percent_otj'
    AND cg.status = 'active'
  LIMIT 1;

  IF v_otj IS NULL THEN
    v_otj := jsonb_build_object('current', 0, 'target', 0, 'percentage', 0);
  END IF;

  -- Get evidence entries
  SELECT COALESCE(jsonb_agg(
    jsonb_build_object(
      'id', pi.id,
      'title', pi.title,
      'description', pi.description,
      'category', pi.category,
      'skills_demonstrated', pi.skills_demonstrated,
      'learning_outcomes_met', pi.learning_outcomes_met,
      'assessment_criteria_met', pi.assessment_criteria_met,
      'grade', pi.grade,
      'created_at', pi.created_at
    )
    ORDER BY pi.created_at DESC
  ), '[]'::jsonb)
  INTO v_entries
  FROM portfolio_items pi
  WHERE pi.user_id = v_user_id;

  -- Build final result
  v_result := jsonb_build_object(
    'apprentice', v_apprentice,
    'units', COALESCE(v_units, '[]'::jsonb),
    'ksb_summary', COALESCE(v_ksb_summary, jsonb_build_object('knowledge', '[]'::jsonb, 'behaviours', '[]'::jsonb)),
    'otj_hours', v_otj,
    'entries', v_entries
  );

  RETURN v_result;
END;
$$;

-- ============================================
-- Comments
-- ============================================
COMMENT ON FUNCTION get_portfolio_export_data(UUID) IS
  'Returns structured portfolio data for PDF export. Authenticated user only.';
COMMENT ON FUNCTION get_shared_portfolio_export_data(TEXT) IS
  'Returns structured portfolio data for PDF export via public share token.';
