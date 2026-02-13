-- Migration: Portfolio Share Comments
-- Allows external (unauthenticated) users to comment on shared portfolios

-- 1. Make author_id nullable on portfolio_comments to allow external comments
ALTER TABLE portfolio_comments ALTER COLUMN author_id DROP NOT NULL;

-- 2. RPC: Get shared portfolio entries (public access via share token)
CREATE OR REPLACE FUNCTION get_shared_portfolio_entries(p_share_token text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_share record;
  v_result jsonb;
BEGIN
  SELECT * INTO v_share
  FROM portfolio_shares
  WHERE token = p_share_token
    AND is_active = true
    AND (expires_at IS NULL OR expires_at > now());

  IF v_share IS NULL THEN
    RETURN jsonb_build_object('error', 'Invalid or expired share link');
  END IF;

  UPDATE portfolio_shares
  SET view_count = COALESCE(view_count, 0) + 1,
      last_viewed_at = now()
  WHERE id = v_share.id;

  SELECT jsonb_build_object(
    'share_id', v_share.id,
    'owner_name', COALESCE(p.full_name, 'Anonymous'),
    'share_title', v_share.title,
    'share_description', v_share.description,
    'entries', COALESCE((
      SELECT jsonb_agg(
        jsonb_build_object(
          'id', pi.id,
          'title', pi.title,
          'description', pi.description,
          'category_name', pi.category,
          'skills_demonstrated', COALESCE(pi.skills_demonstrated, ARRAY[]::text[]),
          'reflection_notes', pi.reflection_notes,
          'time_spent', COALESCE(pi.time_spent, 0),
          'status', pi.status,
          'created_at', pi.created_at,
          'evidence_files', CASE
            WHEN pi.file_url IS NOT NULL THEN
              jsonb_build_array(jsonb_build_object(
                'id', pi.id,
                'file_name', COALESCE(reverse(split_part(reverse(pi.file_url), '/', 1)), 'file'),
                'file_type', COALESCE(pi.file_type, 'unknown'),
                'file_size', 0,
                'file_url', pi.file_url
              ))
            ELSE '[]'::jsonb
          END
        )
        ORDER BY pi.created_at DESC
      )
      FROM portfolio_items pi
      WHERE pi.user_id = v_share.user_id
        AND pi.status IN ('completed', 'approved')
        AND (
          v_share.entry_ids IS NULL
          OR pi.id = ANY(v_share.entry_ids::uuid[])
        )
    ), '[]'::jsonb)
  ) INTO v_result
  FROM profiles p
  WHERE p.id = v_share.user_id;

  RETURN v_result;
END;
$$;

-- 3. RPC: Get comments on shared portfolio evidence
CREATE OR REPLACE FUNCTION get_shared_portfolio_comments(p_share_token text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_share record;
  v_result jsonb;
BEGIN
  SELECT * INTO v_share
  FROM portfolio_shares
  WHERE token = p_share_token
    AND is_active = true
    AND (expires_at IS NULL OR expires_at > now());

  IF v_share IS NULL THEN
    RETURN jsonb_build_object('error', 'Invalid or expired share link');
  END IF;

  SELECT COALESCE(jsonb_agg(
    jsonb_build_object(
      'id', pc.id,
      'context_id', pc.evidence_id,
      'parent_id', pc.parent_id,
      'author_name', pc.author_name,
      'author_role', pc.author_role,
      'author_initials', COALESCE(pc.author_initials, upper(left(pc.author_name, 2))),
      'content', pc.content,
      'requires_action', COALESCE(pc.requires_action, false),
      'is_resolved', COALESCE(pc.is_resolved, false),
      'created_at', pc.created_at
    )
    ORDER BY pc.created_at ASC
  ), '[]'::jsonb) INTO v_result
  FROM portfolio_comments pc
  WHERE pc.user_id = v_share.user_id;

  RETURN v_result;
END;
$$;

-- 4. RPC: Add a comment on shared portfolio evidence
CREATE OR REPLACE FUNCTION add_share_comment(
  p_share_token text,
  p_author_name text,
  p_author_role text,
  p_content text,
  p_evidence_id uuid
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_share record;
  v_comment_id uuid;
  v_evidence_owner uuid;
BEGIN
  SELECT * INTO v_share
  FROM portfolio_shares
  WHERE token = p_share_token
    AND is_active = true
    AND (expires_at IS NULL OR expires_at > now());

  IF v_share IS NULL THEN
    RETURN jsonb_build_object('error', 'Invalid or expired share link');
  END IF;

  SELECT user_id INTO v_evidence_owner
  FROM portfolio_items
  WHERE id = p_evidence_id AND user_id = v_share.user_id;

  IF v_evidence_owner IS NULL THEN
    RETURN jsonb_build_object('error', 'Evidence not found');
  END IF;

  INSERT INTO portfolio_comments (
    user_id,
    evidence_id,
    context_type,
    author_name,
    author_role,
    author_initials,
    content
  ) VALUES (
    v_share.user_id,
    p_evidence_id,
    'share_feedback',
    p_author_name,
    p_author_role,
    upper(left(p_author_name, 2)),
    p_content
  ) RETURNING id INTO v_comment_id;

  INSERT INTO notifications (
    recipient_id,
    title,
    message,
    notification_type,
    action_url
  ) VALUES (
    v_share.user_id,
    'New Portfolio Comment',
    p_author_name || ' (' || p_author_role || ') left feedback on your shared portfolio.',
    'portfolio',
    '/apprentice/portfolio-hub?section=tutor'
  );

  RETURN jsonb_build_object('success', true, 'comment_id', v_comment_id);
END;
$$;

-- 5. RLS policy: Allow assessors to view comments on evidence they are reviewing
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE policyname = 'Assessors can view comments on reviewed evidence'
    AND tablename = 'portfolio_comments'
  ) THEN
    CREATE POLICY "Assessors can view comments on reviewed evidence"
    ON portfolio_comments
    FOR SELECT
    USING (
      EXISTS (
        SELECT 1 FROM portfolio_submissions ps
        WHERE ps.user_id = portfolio_comments.user_id
          AND ps.assessor_id = auth.uid()
      )
    );
  END IF;
END;
$$;
