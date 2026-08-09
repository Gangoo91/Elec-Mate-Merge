-- ELE-1515 — Google Places address autocomplete on customer & property forms.
--
-- Both tables held the address as a single text blob typed by hand. Places
-- gives us a postcode and a coordinate pair alongside the formatted address,
-- and those are worth keeping:
--
--   * postcode  — the thing electricians actually search and sort by, and
--                 the only part of a UK address that reliably identifies it.
--   * lat/lng   — lets "Navigate to site" (ELE-1520) drop a pin on the
--                 property instead of asking Maps to geocode free text, and
--                 gives CustomerMap real coordinates to plot. It has been
--                 built for a while with nothing to draw.
--
-- All three are nullable on purpose. Every existing row keeps working, and a
-- manually typed address that never goes near Places stays perfectly valid —
-- the forms do not force selection from the dropdown.

ALTER TABLE public.customers
  ADD COLUMN IF NOT EXISTS postcode text,
  ADD COLUMN IF NOT EXISTS latitude double precision,
  ADD COLUMN IF NOT EXISTS longitude double precision;

ALTER TABLE public.customer_properties
  ADD COLUMN IF NOT EXISTS postcode text,
  ADD COLUMN IF NOT EXISTS latitude double precision,
  ADD COLUMN IF NOT EXISTS longitude double precision;

-- Postcode search is the point of capturing it, so index it. Lower-cased and
-- space-stripped because "LS1 4AP", "ls14ap" and "LS14AP" are one postcode and
-- users type all three.
CREATE INDEX IF NOT EXISTS idx_customers_postcode
  ON public.customers (user_id, lower(replace(postcode, ' ', '')))
  WHERE postcode IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_customer_properties_postcode
  ON public.customer_properties (user_id, lower(replace(postcode, ' ', '')))
  WHERE postcode IS NOT NULL;

COMMENT ON COLUMN public.customers.postcode IS
  'UK postcode from Google Places, when the address was selected from the dropdown. Null for hand-typed addresses.';
COMMENT ON COLUMN public.customers.latitude IS
  'WGS84 latitude from Google Places. Null unless the address was selected from the dropdown.';
COMMENT ON COLUMN public.customers.longitude IS
  'WGS84 longitude from Google Places. Null unless the address was selected from the dropdown.';
