-- Atomic policy publish — appends version snapshot + promotes policy in a
-- single transaction. The previous client-side two-step could orphan a
-- version row if the second update failed (insert was already committed).
--
-- SECURITY INVOKER: relies on the caller's RLS for both tables.

CREATE OR REPLACE FUNCTION public.publish_policy_version(
  p_policy_id uuid,
  p_change_summary text DEFAULT NULL
)
RETURNS TABLE (
  policy_id uuid,
  new_version integer,
  status text,
  effective_from date
)
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
DECLARE
  v_user_id uuid := auth.uid();
  v_current_version integer;
  v_current_status text;
  v_content_md text;
  v_new_version integer;
  v_today date := current_date;
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not signed in';
  END IF;

  -- Lock the policy row for the duration of this txn so concurrent
  -- publishes can't race and assign the same version number.
  SELECT cp.version, cp.status, cp.content_md
    INTO v_current_version, v_current_status, v_content_md
  FROM public.college_policies cp
  WHERE cp.id = p_policy_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Policy not found' USING ERRCODE = 'no_data_found';
  END IF;

  IF v_current_status = 'live' THEN
    v_new_version := v_current_version + 1;
  ELSIF v_current_status = 'archived' THEN
    v_new_version := v_current_version;
  ELSE
    v_new_version := v_current_version + 1;
  END IF;

  INSERT INTO public.college_policy_versions
    (policy_id, version, content_md, published_by, change_summary)
  VALUES
    (p_policy_id, v_new_version, COALESCE(v_content_md, ''), v_user_id, p_change_summary);

  UPDATE public.college_policies
  SET
    version = v_new_version,
    status = 'live',
    effective_from = v_today,
    approved_by = v_user_id,
    approved_at = now()
  WHERE id = p_policy_id;

  RETURN QUERY
    SELECT p_policy_id, v_new_version, 'live'::text, v_today;
END;
$$;

GRANT EXECUTE ON FUNCTION public.publish_policy_version(uuid, text) TO authenticated;
