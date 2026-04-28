-- AI write-back: persist "filed" state per proposal so the green "Filed"
-- pill survives page reloads and prevents duplicate filings across sessions.
--
-- Each entry in notebook_messages.proposals (JSONB array) gains optional
-- { filed_at: timestamptz, filed_record_id: uuid } fields when the
-- apprentice confirms the draft into a real record.
--
-- SECURITY DEFINER + ownership check by owner_uid keeps RLS-equivalent
-- safety while letting us atomically jsonb_set without exposing UPDATE
-- on notebook_messages directly.

ALTER TABLE public.notebook_messages
  ADD COLUMN IF NOT EXISTS proposals jsonb DEFAULT NULL;

CREATE OR REPLACE FUNCTION public.mark_notebook_proposal_filed(
  p_message_id uuid,
  p_proposal_index integer,
  p_filed_record_id uuid
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_owner_uid uuid;
  v_proposals jsonb;
  v_arr_len int;
  v_updated jsonb;
BEGIN
  SELECT c.owner_uid, m.proposals
  INTO v_owner_uid, v_proposals
  FROM public.notebook_messages m
  JOIN public.notebook_conversations c ON c.id = m.conversation_id
  WHERE m.id = p_message_id;

  IF v_owner_uid IS NULL THEN
    RAISE EXCEPTION 'message_not_found';
  END IF;
  IF v_owner_uid <> auth.uid() THEN
    RAISE EXCEPTION 'forbidden';
  END IF;
  IF v_proposals IS NULL OR jsonb_typeof(v_proposals) <> 'array' THEN
    RAISE EXCEPTION 'no_proposals';
  END IF;

  v_arr_len := jsonb_array_length(v_proposals);
  IF p_proposal_index < 0 OR p_proposal_index >= v_arr_len THEN
    RAISE EXCEPTION 'index_out_of_range';
  END IF;

  v_updated := jsonb_set(
    jsonb_set(
      v_proposals,
      ARRAY[p_proposal_index::text, 'filed_at'],
      to_jsonb(now()),
      true
    ),
    ARRAY[p_proposal_index::text, 'filed_record_id'],
    to_jsonb(p_filed_record_id),
    true
  );

  UPDATE public.notebook_messages
  SET proposals = v_updated
  WHERE id = p_message_id;

  RETURN v_updated -> p_proposal_index;
END;
$$;

GRANT EXECUTE ON FUNCTION public.mark_notebook_proposal_filed(uuid, integer, uuid) TO authenticated;
