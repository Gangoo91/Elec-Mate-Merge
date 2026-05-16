-- ============================================================================
-- Unified email-open tracking
-- ============================================================================
-- Tracks opens for every client-facing email type via a single
-- (entity_type, entity_id) primary key. The existing quote-specific
-- quote_views.email_opened_at remains the optimised read path for the
-- quote detail view — this table is the canonical write path going
-- forward and underpins push notifications + analytics across every
-- send-* email function.
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.email_opens (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type       text NOT NULL,
  entity_id         uuid NOT NULL,
  owner_user_id     uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_email   text,
  first_opened_at   timestamptz NOT NULL DEFAULT now(),
  last_opened_at    timestamptz NOT NULL DEFAULT now(),
  open_count        integer NOT NULL DEFAULT 1,
  last_ip           text,
  last_user_agent   text,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),
  UNIQUE (entity_type, entity_id)
);

CREATE INDEX IF NOT EXISTS idx_email_opens_owner ON public.email_opens (owner_user_id, last_opened_at DESC);
CREATE INDEX IF NOT EXISTS idx_email_opens_entity ON public.email_opens (entity_type, entity_id);

ALTER TABLE public.email_opens ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Owners read own email_opens" ON public.email_opens;
CREATE POLICY "Owners read own email_opens"
  ON public.email_opens
  FOR SELECT
  TO authenticated
  USING (owner_user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.record_email_open(
  p_entity_type   text,
  p_entity_id     uuid,
  p_owner_user_id uuid,
  p_recipient_email text DEFAULT NULL,
  p_ip            text DEFAULT NULL,
  p_user_agent    text DEFAULT NULL
)
RETURNS TABLE (
  is_first_open boolean,
  open_count    integer
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_existing public.email_opens%ROWTYPE;
BEGIN
  SELECT * INTO v_existing
  FROM public.email_opens
  WHERE entity_type = p_entity_type AND entity_id = p_entity_id;

  IF NOT FOUND THEN
    INSERT INTO public.email_opens (
      entity_type, entity_id, owner_user_id, recipient_email,
      first_opened_at, last_opened_at, open_count, last_ip, last_user_agent
    ) VALUES (
      p_entity_type, p_entity_id, p_owner_user_id, p_recipient_email,
      now(), now(), 1, p_ip, p_user_agent
    );
    RETURN QUERY SELECT TRUE, 1;
  ELSE
    UPDATE public.email_opens
    SET open_count      = v_existing.open_count + 1,
        last_opened_at  = now(),
        last_ip         = COALESCE(p_ip, v_existing.last_ip),
        last_user_agent = COALESCE(p_user_agent, v_existing.last_user_agent),
        updated_at      = now()
    WHERE id = v_existing.id;
    RETURN QUERY SELECT FALSE, v_existing.open_count + 1;
  END IF;
END;
$$;

GRANT EXECUTE ON FUNCTION public.record_email_open(text, uuid, uuid, text, text, text)
  TO service_role;
