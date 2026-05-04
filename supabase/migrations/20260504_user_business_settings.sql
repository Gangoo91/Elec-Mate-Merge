-- User business settings — source of truth for pricing inputs the user
-- controls. Replaces the localStorage-only pattern. The Cost Engineer
-- reads from this table at run time, never from the request body — so a
-- user can't accidentally underprice by submitting an old job with stale
-- settings.

CREATE TABLE IF NOT EXISTS public.user_business_settings (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Labour rates (£/hr)
  labour_rate_electrician numeric(10,2) NOT NULL DEFAULT 50.00,
  labour_rate_apprentice  numeric(10,2) NOT NULL DEFAULT 25.00,

  -- Margin policy (%) — enforce min ≤ target ≤ max so the three quote
  -- tiers always come out in price order.
  target_margin_percent numeric(5,2) NOT NULL DEFAULT 25.00 CHECK (target_margin_percent >= 0 AND target_margin_percent <= 90),
  min_margin_percent    numeric(5,2) NOT NULL DEFAULT 10.00 CHECK (min_margin_percent >= 0 AND min_margin_percent <= 90),
  max_margin_percent    numeric(5,2) NOT NULL DEFAULT 40.00 CHECK (max_margin_percent >= 0 AND max_margin_percent <= 90),
  CONSTRAINT user_business_settings_margin_order CHECK (
    min_margin_percent <= target_margin_percent
    AND target_margin_percent <= max_margin_percent
  ),

  -- Materials markup (% on top of trade price)
  materials_markup_percent numeric(5,2) NOT NULL DEFAULT 15.00 CHECK (materials_markup_percent >= 0 AND materials_markup_percent <= 90),

  -- Overheads
  monthly_overheads_total numeric(10,2) NOT NULL DEFAULT 1000.00,
  per_job_overhead        numeric(10,2) NOT NULL DEFAULT 35.00,

  -- Defaults
  vat_registered boolean NOT NULL DEFAULT true,
  default_supplier_preference text NOT NULL DEFAULT 'standard'
    CHECK (default_supplier_preference IN ('budget', 'standard', 'premium')),
  default_payment_terms text NOT NULL DEFAULT '30% deposit, balance on completion',

  -- Free-form blob the dialog can stash anything else into without a migration.
  extra jsonb NOT NULL DEFAULT '{}',

  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.user_business_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users manage own business settings" ON public.user_business_settings;
CREATE POLICY "Users manage own business settings"
  ON public.user_business_settings
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.touch_user_business_settings_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS trg_user_business_settings_updated_at ON public.user_business_settings;
CREATE TRIGGER trg_user_business_settings_updated_at
  BEFORE UPDATE ON public.user_business_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.touch_user_business_settings_updated_at();

COMMENT ON TABLE public.user_business_settings IS
  'Per-user pricing inputs: labour rates, margins, overheads, defaults. Cost Engineer reads from this table directly — request-body values are never trusted for pricing.';
