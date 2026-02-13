-- Migration: Public Assessor Review via Share Token
-- Enables assessors to review portfolios via public share links (no auth required)
-- Pattern follows SupervisorVerificationPage — anon client + SECURITY DEFINER RPCs

-- 1. RPC: Get submission status for a shared portfolio
CREATE OR REPLACE FUNCTION get_shared_portfolio_status(p_share_token text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_share record;
  v_result jsonb;
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

  -- Get all submissions for this user with their category names
  SELECT COALESCE(jsonb_agg(
    jsonb_build_object(
      'id', ps.id,
      'category_id', ps.category_id,
      'category_name', COALESCE(qc.name, 'Unknown Category'),
      'qualification_id', ps.qualification_id,
      'status', ps.status,
      'submitted_at', ps.submitted_at,
      'reviewed_at', ps.reviewed_at,
      'assessor_feedback', ps.assessor_feedback,
      'grade', ps.grade,
      'action_required', ps.action_required,
      'strengths_noted', ps.strengths_noted,
      'areas_for_improvement', ps.areas_for_improvement,
      'previous_feedback', ps.previous_feedback,
      'previous_grade', ps.previous_grade,
      'submission_count', COALESCE(ps.submission_count, 1),
      'signed_off_at', ps.signed_off_at
    )
    ORDER BY ps.submitted_at DESC
  ), '[]'::jsonb) INTO v_result
  FROM portfolio_submissions ps
  LEFT JOIN qualification_categories qc ON qc.id = ps.category_id
  WHERE ps.user_id = v_share.user_id;

  RETURN jsonb_build_object(
    'submissions', v_result,
    'user_id', v_share.user_id
  );
END;
$$;

-- 2. RPC: Review a submission via share token (public access)
CREATE OR REPLACE FUNCTION review_shared_submission(
  p_share_token text,
  p_submission_id uuid,
  p_reviewer_name text,
  p_reviewer_role text,
  p_action text,            -- 'approve', 'send_back', 'request_more_evidence'
  p_feedback text DEFAULT NULL,
  p_grade text DEFAULT NULL,
  p_action_required text DEFAULT NULL,
  p_strengths text DEFAULT NULL,
  p_areas_for_improvement text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_share record;
  v_submission record;
  v_new_status text;
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

  -- Validate submission belongs to the same user as the share
  SELECT * INTO v_submission
  FROM portfolio_submissions
  WHERE id = p_submission_id
    AND user_id = v_share.user_id;

  IF v_submission IS NULL THEN
    RETURN jsonb_build_object('error', 'Submission not found');
  END IF;

  -- Only allow review of submitted/resubmitted/under_review submissions
  IF v_submission.status NOT IN ('submitted', 'resubmitted', 'under_review') THEN
    RETURN jsonb_build_object(
      'error',
      'This submission cannot be reviewed in its current state (' || v_submission.status || ')'
    );
  END IF;

  -- Validate action
  IF p_action NOT IN ('approve', 'send_back', 'request_more_evidence') THEN
    RETURN jsonb_build_object('error', 'Invalid action. Must be: approve, send_back, or request_more_evidence');
  END IF;

  -- Determine new status
  CASE p_action
    WHEN 'approve' THEN v_new_status := 'approved';
    WHEN 'send_back' THEN v_new_status := 'feedback_given';
    WHEN 'request_more_evidence' THEN v_new_status := 'feedback_given';
  END CASE;

  -- Update the submission
  UPDATE portfolio_submissions
  SET
    status = v_new_status,
    reviewed_at = now(),
    assessor_feedback = COALESCE(p_feedback, assessor_feedback),
    grade = CASE WHEN p_action = 'approve' THEN COALESCE(p_grade, 'pass') ELSE p_grade END,
    action_required = CASE
      WHEN p_action = 'request_more_evidence' THEN COALESCE(p_action_required, 'Additional evidence required')
      ELSE p_action_required
    END,
    strengths_noted = p_strengths,
    areas_for_improvement = p_areas_for_improvement,
    review_started_at = COALESCE(review_started_at, now()),
    updated_at = now()
  WHERE id = p_submission_id;

  -- Create notification for the apprentice
  INSERT INTO notifications (
    recipient_id,
    title,
    message,
    notification_type,
    action_url
  ) VALUES (
    v_share.user_id,
    CASE p_action
      WHEN 'approve' THEN 'Portfolio Approved'
      WHEN 'send_back' THEN 'Portfolio Feedback Received'
      WHEN 'request_more_evidence' THEN 'More Evidence Requested'
    END,
    p_reviewer_name || ' (' || p_reviewer_role || ') has '
      || CASE p_action
           WHEN 'approve' THEN 'approved your portfolio submission.'
           WHEN 'send_back' THEN 'reviewed your portfolio and provided feedback.'
           WHEN 'request_more_evidence' THEN 'requested additional evidence for your portfolio.'
         END,
    'portfolio',
    '/apprentice/portfolio-hub?section=tutor'
  );

  -- Log the review as a comment for audit trail
  INSERT INTO portfolio_comments (
    user_id,
    evidence_id,
    context_type,
    author_name,
    author_role,
    author_initials,
    content
  )
  SELECT
    v_share.user_id,
    (SELECT id FROM portfolio_items WHERE user_id = v_share.user_id LIMIT 1),
    'assessor_review',
    p_reviewer_name,
    p_reviewer_role,
    upper(left(p_reviewer_name, 2)),
    '[' || upper(p_action) || '] '
      || COALESCE(p_feedback, 'No additional feedback provided.')
      || CASE WHEN p_grade IS NOT NULL THEN ' (Grade: ' || p_grade || ')' ELSE '' END;

  RETURN jsonb_build_object(
    'success', true,
    'new_status', v_new_status,
    'action', p_action,
    'reviewer', p_reviewer_name
  );
END;
$$;

-- 3. Column comments
COMMENT ON FUNCTION get_shared_portfolio_status(text) IS
  'Returns submission statuses for a shared portfolio. Public access via share token.';
COMMENT ON FUNCTION review_shared_submission(text, uuid, text, text, text, text, text, text, text, text) IS
  'Allows public assessor review of portfolio submissions via share token. Creates notification + audit comment.';
