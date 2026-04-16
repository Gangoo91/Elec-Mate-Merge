-- email_suppressions: addresses that have opted out, bounced, or complained.
-- Pre-send check filters against this table so unsubscribed users never get re-emailed.
-- Populated by: /functions/unsubscribe (user one-click / confirm), Resend webhook
-- (email.bounced, email.complained), manual admin action.

CREATE TABLE IF NOT EXISTS public.email_suppressions (
  email TEXT PRIMARY KEY,
  reason TEXT NOT NULL,
  source TEXT NOT NULL,
  unsubscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_email_suppressions_user_id
  ON public.email_suppressions(user_id)
  WHERE user_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_email_suppressions_unsubscribed_at
  ON public.email_suppressions(unsubscribed_at DESC);

COMMENT ON TABLE public.email_suppressions IS
  'Addresses opted out of marketing email. Populated by unsubscribe flow, Resend bounce/complaint webhook, or manual admin action. Pre-send filter always checks this.';

COMMENT ON COLUMN public.email_suppressions.reason IS
  'Machine-readable: user_unsubscribed_one_click | user_unsubscribed_confirmed | bounced_hard | bounced_soft_repeated | complained | admin_suppressed | test_account.';

COMMENT ON COLUMN public.email_suppressions.source IS
  'Where the suppression originated: winback_unsubscribe | resend_webhook | admin_ui | manual_sql.';

ALTER TABLE public.email_suppressions ENABLE ROW LEVEL SECURITY;

-- No public policies — service role (edge functions) is the only writer/reader.
-- Admin UI (if ever built) queries through an edge function with its own auth.
