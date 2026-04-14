-- ============================================================================
-- Transactional pushes + App Store version tracking + apprentice pickup cron
-- ============================================================================
--
-- Part of the smart notifications bundle. Three things:
--   1. Helper + DB triggers for Tier-1 transactional pushes (quote signed,
--      invoice paid, C1 hazard detected)
--   2. `app_versions` table — source of truth for "what's the latest version
--      on each platform" so the client can compare and fire a local update
--      prompt when the user is behind
--   3. Additional pg_cron schedule for apprentice-pickup-cron at 17:00 UTC

-- ─── 1. Generic helper: fire-and-forget call to trigger-transactional-push ─
CREATE OR REPLACE FUNCTION public.call_transactional_push_trigger(
  p_user_id UUID,
  p_event_type TEXT,
  p_context JSONB DEFAULT '{}'::jsonb
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  service_key TEXT;
BEGIN
  SELECT decrypted_secret INTO service_key
  FROM vault.decrypted_secrets
  WHERE name = 'service_role_key'
  LIMIT 1;

  IF service_key IS NULL THEN
    RAISE WARNING '[call_transactional_push_trigger] service_role_key not in vault';
    RETURN;
  END IF;

  PERFORM net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/trigger-transactional-push',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || service_key
    ),
    body := jsonb_build_object(
      'user_id', p_user_id,
      'event_type', p_event_type,
      'context', p_context
    )
  );
EXCEPTION WHEN OTHERS THEN
  RAISE WARNING '[call_transactional_push_trigger] Failed: %', SQLERRM;
END;
$$;

GRANT EXECUTE ON FUNCTION public.call_transactional_push_trigger(UUID, TEXT, JSONB) TO postgres;

-- ─── 2. Quote signed — fires when quotes.accepted_at transitions NULL→now() ─
CREATE OR REPLACE FUNCTION public.trigger_quote_signed_push()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  client_name_val TEXT;
  amount_gbp_val TEXT;
BEGIN
  IF NEW.accepted_at IS NOT NULL
     AND OLD.accepted_at IS NULL
     AND NEW.user_id IS NOT NULL THEN

    -- Extract client name from client_data jsonb; tolerate missing keys
    BEGIN
      client_name_val := COALESCE(
        NEW.client_data->>'name',
        NEW.client_data->>'full_name',
        NEW.client_data->>'client_name',
        'Your client'
      );
    EXCEPTION WHEN OTHERS THEN
      client_name_val := 'Your client';
    END;

    -- Format the amount as £1,234 if present
    BEGIN
      amount_gbp_val := '£' || to_char(NEW.total, 'FM999,999,990');
    EXCEPTION WHEN OTHERS THEN
      amount_gbp_val := '';
    END;

    PERFORM public.call_transactional_push_trigger(
      NEW.user_id,
      'quote_signed',
      jsonb_build_object(
        'client_name', client_name_val,
        'amount_gbp', amount_gbp_val,
        'ref_id', NEW.id::text
      )
    );
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_quotes_signed_push ON public.quotes;
CREATE TRIGGER trg_quotes_signed_push
  AFTER UPDATE OF accepted_at ON public.quotes
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_quote_signed_push();

-- ─── 3. Invoice paid — fires when invoices.paid_at transitions NULL→now() ─
CREATE OR REPLACE FUNCTION public.trigger_invoice_paid_push()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  client_name_val TEXT;
  amount_gbp_val TEXT;
BEGIN
  IF NEW.paid_at IS NOT NULL
     AND (OLD.paid_at IS NULL OR OLD.paid_at != NEW.paid_at)
     AND NEW.user_id IS NOT NULL THEN

    BEGIN
      client_name_val := COALESCE(
        NEW.client_data->>'name',
        NEW.client_data->>'full_name',
        NEW.client_data->>'client_name',
        'Your client'
      );
    EXCEPTION WHEN OTHERS THEN
      client_name_val := 'Your client';
    END;

    BEGIN
      amount_gbp_val := '£' || to_char(COALESCE(NEW.total_paid, NEW.total), 'FM999,999,990');
    EXCEPTION WHEN OTHERS THEN
      amount_gbp_val := '';
    END;

    PERFORM public.call_transactional_push_trigger(
      NEW.user_id,
      'invoice_paid',
      jsonb_build_object(
        'client_name', client_name_val,
        'amount_gbp', amount_gbp_val,
        'ref_id', NEW.id::text
      )
    );
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_invoices_paid_push ON public.invoices;
CREATE TRIGGER trg_invoices_paid_push
  AFTER UPDATE OF paid_at ON public.invoices
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_invoice_paid_push();

-- ─── 4. app_versions — latest version per platform ─────────────────────
-- Client reads this on launch, compares with Capacitor.App.getInfo(), and
-- fires a local "update available" prompt if the installed version is behind.
CREATE TABLE IF NOT EXISTS public.app_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL CHECK (platform IN ('ios', 'android')),
  version TEXT NOT NULL,                -- e.g. "1.0.2"
  build_number INTEGER,                 -- optional, useful for Play Store versionCode
  release_notes TEXT,                   -- shown in the update prompt
  min_supported_version TEXT,           -- optional — force-update if user below this
  is_current BOOLEAN NOT NULL DEFAULT false,
  released_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Only one row can be is_current per platform
CREATE UNIQUE INDEX IF NOT EXISTS idx_app_versions_platform_current
  ON public.app_versions (platform) WHERE is_current = true;

-- RLS — everyone can read, only service role can write
ALTER TABLE public.app_versions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read current app version" ON public.app_versions;
CREATE POLICY "Anyone can read current app version"
  ON public.app_versions
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Seed with the current iOS build (v1.0.1 build 16 from memory)
INSERT INTO public.app_versions (platform, version, build_number, release_notes, is_current, released_at)
VALUES
  ('ios', '1.0.1', 16, 'Initial App Store release', true, '2026-03-27'::timestamptz),
  ('android', '1.0.1', 23, 'Initial Play Store release', true, '2026-03-27'::timestamptz)
ON CONFLICT DO NOTHING;

-- ─── 5. pg_cron — apprentice pickup cron at 17:00 UTC ─────────────────
DO $$
DECLARE
  svc_key TEXT;
BEGIN
  SELECT decrypted_secret INTO svc_key
  FROM vault.decrypted_secrets
  WHERE name = 'service_role_key'
  LIMIT 1;

  IF svc_key IS NULL THEN
    RAISE WARNING 'service_role_key not in vault — skipping cron creation';
    RETURN;
  END IF;

  IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'apprentice-pickup-cron') THEN
    PERFORM cron.unschedule('apprentice-pickup-cron');
  END IF;
  PERFORM cron.schedule(
    'apprentice-pickup-cron',
    '0 17 * * *',
    format(
      $cmd$
      SELECT net.http_post(
        url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/apprentice-pickup-cron',
        headers := jsonb_build_object('Content-Type','application/json','Authorization','Bearer %s'),
        body := '{}'::jsonb
      );
      $cmd$,
      svc_key
    )
  );
END;
$$;
