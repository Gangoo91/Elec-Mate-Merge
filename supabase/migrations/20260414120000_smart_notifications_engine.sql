-- ============================================================================
-- Smart Notifications Engine — triggers + crons for the revenue-engine pushes
-- ============================================================================
--
-- Wires database events (cert complete, quote sent, invoice sent) to the
-- trigger-referral-push edge function via pg_net so every value-moment
-- referral push is fired automatically, without the app having to know.
--
-- The 7-day cooldown + 2/day cap is enforced inside the edge function, so
-- it's safe for multiple triggers to fire rapidly — they'll just be skipped.

-- ─── 1. Helper: fire-and-forget call to trigger-referral-push ───────────
CREATE OR REPLACE FUNCTION public.call_referral_push_trigger(
  p_user_id UUID,
  p_trigger_type TEXT,
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
  -- Read service role key from vault so RLS can't leak it to callers
  SELECT decrypted_secret INTO service_key
  FROM vault.decrypted_secrets
  WHERE name = 'service_role_key'
  LIMIT 1;

  IF service_key IS NULL THEN
    RAISE WARNING '[call_referral_push_trigger] service_role_key not found in vault';
    RETURN;
  END IF;

  -- Fire-and-forget POST to the edge function; never block the trigger
  PERFORM net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/trigger-referral-push',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || service_key
    ),
    body := jsonb_build_object(
      'user_id', p_user_id,
      'trigger_type', p_trigger_type,
      'context', p_context
    )
  );
EXCEPTION WHEN OTHERS THEN
  RAISE WARNING '[call_referral_push_trigger] Failed: %', SQLERRM;
END;
$$;

-- ─── 2. Trigger on reports — when a cert moves to 'complete' status ───
CREATE OR REPLACE FUNCTION public.trigger_cert_complete_referral_push()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only fire when status transitions to a completed state
  IF (NEW.status IS DISTINCT FROM OLD.status)
     AND NEW.status IN ('complete', 'completed', 'signed', 'issued', 'final')
     AND NEW.user_id IS NOT NULL THEN
    PERFORM public.call_referral_push_trigger(
      NEW.user_id,
      'cert_completed',
      jsonb_build_object('cert_type', NEW.report_type)
    );
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_reports_cert_complete_referral ON public.reports;
CREATE TRIGGER trg_reports_cert_complete_referral
  AFTER UPDATE OF status ON public.reports
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_cert_complete_referral_push();

-- ─── 3. Trigger on quotes — when first sent ───────────────────────────
-- Fires the first time a quote's status becomes 'sent'. Later edits don't
-- re-trigger because the cooldown in the edge function already blocks them,
-- but we also short-circuit here by only reacting to NULL→sent transitions.
CREATE OR REPLACE FUNCTION public.trigger_quote_sent_referral_push()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  client_name_val TEXT;
BEGIN
  IF (NEW.status IS DISTINCT FROM OLD.status)
     AND NEW.status = 'sent'
     AND (OLD.status IS NULL OR OLD.status IN ('draft', 'pending'))
     AND NEW.user_id IS NOT NULL THEN

    -- Try to pull client name from the row; columns vary so tolerate misses
    BEGIN
      client_name_val := NEW.client_name;
    EXCEPTION WHEN undefined_column THEN
      client_name_val := NULL;
    END;

    PERFORM public.call_referral_push_trigger(
      NEW.user_id,
      'quote_sent',
      jsonb_build_object('client_name', client_name_val)
    );
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_quotes_sent_referral ON public.quotes;
CREATE TRIGGER trg_quotes_sent_referral
  AFTER UPDATE OF status ON public.quotes
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_quote_sent_referral_push();

-- ─── 4. Trigger on invoices — when first raised ───────────────────────
CREATE OR REPLACE FUNCTION public.trigger_invoice_sent_referral_push()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  client_name_val TEXT;
BEGIN
  -- Fire on INSERT (invoice created) or on status transition to 'sent'
  IF (TG_OP = 'INSERT' AND NEW.user_id IS NOT NULL)
     OR ((NEW.status IS DISTINCT FROM OLD.status)
         AND NEW.status = 'sent'
         AND NEW.user_id IS NOT NULL) THEN

    BEGIN
      client_name_val := NEW.client_name;
    EXCEPTION WHEN undefined_column THEN
      client_name_val := NULL;
    END;

    PERFORM public.call_referral_push_trigger(
      NEW.user_id,
      'invoice_sent',
      jsonb_build_object('client_name', client_name_val)
    );
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_invoices_sent_referral ON public.invoices;
CREATE TRIGGER trg_invoices_sent_referral
  AFTER INSERT OR UPDATE OF status ON public.invoices
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_invoice_sent_referral_push();

-- ─── 5. Trigger on rams_generation_jobs — when a RAMS AI job completes ─
CREATE OR REPLACE FUNCTION public.trigger_rams_complete_referral_push()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF (NEW.status IS DISTINCT FROM OLD.status)
     AND NEW.status IN ('complete', 'completed', 'success', 'done')
     AND NEW.user_id IS NOT NULL THEN
    PERFORM public.call_referral_push_trigger(
      NEW.user_id,
      'rams_completed',
      '{}'::jsonb
    );
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_rams_complete_referral ON public.rams_generation_jobs;
CREATE TRIGGER trg_rams_complete_referral
  AFTER UPDATE OF status ON public.rams_generation_jobs
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_rams_complete_referral_push();

-- ─── 6. Trigger on circuit_design_jobs — AI circuit design completion ──
CREATE OR REPLACE FUNCTION public.trigger_ai_design_complete_referral_push()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF (NEW.status IS DISTINCT FROM OLD.status)
     AND NEW.status IN ('complete', 'completed', 'success', 'done')
     AND NEW.user_id IS NOT NULL THEN
    PERFORM public.call_referral_push_trigger(
      NEW.user_id,
      'ai_design_completed',
      jsonb_build_object('specialist_name', 'Circuit Designer')
    );
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_ai_design_complete_referral ON public.circuit_design_jobs;
CREATE TRIGGER trg_ai_design_complete_referral
  AFTER UPDATE OF status ON public.circuit_design_jobs
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_ai_design_complete_referral_push();

-- ─── 7. pg_cron schedules for the new edge functions ──────────────────
-- Uses the same vault-decrypted pattern as existing crons.
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

  -- Replace existing morning-brief job with the smart push version at 08:00
  IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'morning-digest-push') THEN
    PERFORM cron.unschedule('morning-digest-push');
  END IF;
  PERFORM cron.schedule(
    'morning-digest-push',
    '0 8 * * *',
    format(
      $cmd$
      SELECT net.http_post(
        url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/morning-digest-push',
        headers := jsonb_build_object('Content-Type','application/json','Authorization','Bearer %s'),
        body := '{}'::jsonb
      );
      $cmd$,
      svc_key
    )
  );

  -- Daily weekly-cadence referral cron at 10:00 UTC
  IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'referral-cadence-cron') THEN
    PERFORM cron.unschedule('referral-cadence-cron');
  END IF;
  PERFORM cron.schedule(
    'referral-cadence-cron',
    '0 10 * * *',
    format(
      $cmd$
      SELECT net.http_post(
        url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/referral-cadence-cron',
        headers := jsonb_build_object('Content-Type','application/json','Authorization','Bearer %s'),
        body := '{}'::jsonb
      );
      $cmd$,
      svc_key
    )
  );
END;
$$;

-- ─── 6. Grant execute on the helper so triggers can call it ───────────
GRANT EXECUTE ON FUNCTION public.call_referral_push_trigger(UUID, TEXT, JSONB) TO postgres;
