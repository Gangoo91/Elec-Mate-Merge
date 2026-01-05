-- Create secure RPC function for soft deleting reports
CREATE OR REPLACE FUNCTION public.soft_delete_report(
  p_user_id uuid,
  p_report_id text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id uuid;
  v_current_user_id uuid;
  v_deleted_at timestamptz;
BEGIN
  -- Get the current user from auth context
  v_current_user_id := auth.uid();
  
  -- Security check: ensure the provided user_id matches the authenticated user
  IF v_current_user_id != p_user_id THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'permission_denied',
      'message', 'You do not have permission to delete this report'
    );
  END IF;
  
  -- Find the report by report_id and user_id
  SELECT id, deleted_at INTO v_id, v_deleted_at
  FROM public.reports
  WHERE report_id = p_report_id
    AND user_id = p_user_id;
  
  -- Check if report exists
  IF v_id IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'not_found',
      'message', 'Report not found or you do not have access to it'
    );
  END IF;
  
  -- Check if already deleted
  IF v_deleted_at IS NOT NULL THEN
    RETURN jsonb_build_object(
      'success', true,
      'message', 'Report was already deleted',
      'already_deleted', true
    );
  END IF;
  
  -- Perform soft delete
  UPDATE public.reports
  SET deleted_at = now(),
      updated_at = now()
  WHERE id = v_id;
  
  RETURN jsonb_build_object(
    'success', true,
    'message', 'Report deleted successfully',
    'report_id', p_report_id
  );
END;
$$;