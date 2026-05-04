-- Regional pricing multipliers. Replaces the hardcoded REGIONAL_MULTIPLIERS
-- constant in cost-engineer-core.ts. Joinable, hand-tunable, and
-- future-proof: a postcode lookup column gives us auto-detection from a
-- site address, and an empirical override column lets us drive multipliers
-- from real marketplace_products variance later.

CREATE TABLE IF NOT EXISTS public.regional_pricing (
  region_key text PRIMARY KEY,
  label text NOT NULL,

  -- Multiplier applied to materials + labour totals.
  -- 1.00 = UK average. London ~1.25, North East ~0.95, etc.
  multiplier numeric(5,3) NOT NULL CHECK (multiplier > 0 AND multiplier < 3),

  -- Optional regex matching the first 1-2 chars of a UK postcode for
  -- auto-detection (e.g. '^(E|EC|N|NW|SE|SW|W|WC)\\d' → London).
  postcode_pattern text,

  -- Source attribution: 'seed' | 'empirical' | 'admin'.
  source text NOT NULL DEFAULT 'seed',

  -- For Phase B: empirical multipliers derived from same-SKU price
  -- variance across regional supplier branches in marketplace_products.
  empirical_sample_size integer,
  last_recalculated_at timestamptz,

  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Public read; only service role / admins write. Frontend can join freely.
ALTER TABLE public.regional_pricing ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read regional pricing" ON public.regional_pricing;
CREATE POLICY "Anyone can read regional pricing"
  ON public.regional_pricing
  FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Service role manages regional pricing" ON public.regional_pricing;
CREATE POLICY "Service role manages regional pricing"
  ON public.regional_pricing
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE OR REPLACE FUNCTION public.touch_regional_pricing_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS trg_regional_pricing_updated_at ON public.regional_pricing;
CREATE TRIGGER trg_regional_pricing_updated_at
  BEFORE UPDATE ON public.regional_pricing
  FOR EACH ROW
  EXECUTE FUNCTION public.touch_regional_pricing_updated_at();

-- Seed values mirror the previous hardcoded constants exactly so behaviour
-- doesn't change on day 1. Postcode patterns are best-effort starting points
-- — admins can refine via UI later.
INSERT INTO public.regional_pricing (region_key, label, multiplier, postcode_pattern, source) VALUES
  ('london',          'London',           1.250, '^(E|EC|N|NW|SE|SW|W|WC)\d', 'seed'),
  ('southeast',       'South East',       1.150, '^(BN|CT|DA|GU|ME|RH|TN|MK|OX|RG|SO|PO|SL|HP)\d', 'seed'),
  ('southwest',       'South West',       1.050, '^(BA|BS|DT|EX|GL|PL|TA|TQ|TR)\d', 'seed'),
  ('eastMidlands',    'East Midlands',    1.000, '^(DE|LE|LN|NG|NN|PE)\d', 'seed'),
  ('westMidlands',    'West Midlands',    1.000, '^(B|CV|DY|HR|ST|SY|TF|WR|WS|WV)\d', 'seed'),
  ('yorkshire',       'Yorkshire',        1.020, '^(BD|DN|HD|HG|HU|HX|LS|S|WF|YO)\d', 'seed'),
  ('northwest',       'North West',       1.020, '^(BB|BL|CA|CH|CW|FY|L|LA|M|OL|PR|SK|WA|WN)\d', 'seed'),
  ('northeast',       'North East',       0.950, '^(DH|DL|NE|SR|TS)\d', 'seed'),
  ('scotland',        'Scotland',         1.080, '^(AB|DD|DG|EH|FK|G|HS|IV|KA|KW|KY|ML|PA|PH|TD|ZE)\d', 'seed'),
  ('wales',           'Wales',            0.980, '^(CF|LD|LL|NP|SA|CH[57])\d?', 'seed'),
  ('northernIreland', 'Northern Ireland', 0.920, '^BT\d', 'seed'),
  ('other',           'UK average',       1.000, NULL, 'seed')
ON CONFLICT (region_key) DO UPDATE
  SET multiplier = EXCLUDED.multiplier,
      postcode_pattern = EXCLUDED.postcode_pattern,
      label = EXCLUDED.label;

COMMENT ON TABLE public.regional_pricing IS
  'Regional pricing multipliers used by the Cost Engineer. Seeded from previous hardcoded constants. Postcode patterns enable auto-detection from a site address.';
