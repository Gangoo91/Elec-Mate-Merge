-- Attribution columns on profiles — captured at signup from localStorage
-- (landing page stores UTM / gclid / fbclid / referrer on first visit).
-- Enables "which campaign generated this subscriber" analysis months after signup.

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS utm_source       text,
  ADD COLUMN IF NOT EXISTS utm_medium       text,
  ADD COLUMN IF NOT EXISTS utm_campaign     text,
  ADD COLUMN IF NOT EXISTS utm_term         text,
  ADD COLUMN IF NOT EXISTS utm_content      text,
  ADD COLUMN IF NOT EXISTS gclid            text,
  ADD COLUMN IF NOT EXISTS fbclid           text,
  ADD COLUMN IF NOT EXISTS referrer_url     text,
  ADD COLUMN IF NOT EXISTS landing_page     text,
  ADD COLUMN IF NOT EXISTS first_touch_at   timestamptz;

-- Campaign/source indexes — used by marketing dashboards to bucket cohorts.
CREATE INDEX IF NOT EXISTS profiles_utm_source_idx    ON public.profiles (utm_source)   WHERE utm_source   IS NOT NULL;
CREATE INDEX IF NOT EXISTS profiles_utm_campaign_idx  ON public.profiles (utm_campaign) WHERE utm_campaign IS NOT NULL;
CREATE INDEX IF NOT EXISTS profiles_gclid_idx         ON public.profiles (gclid)        WHERE gclid        IS NOT NULL;
CREATE INDEX IF NOT EXISTS profiles_fbclid_idx        ON public.profiles (fbclid)       WHERE fbclid       IS NOT NULL;

COMMENT ON COLUMN public.profiles.utm_source     IS 'First-touch utm_source from landing URL';
COMMENT ON COLUMN public.profiles.utm_medium     IS 'First-touch utm_medium (cpc, organic, email, etc.)';
COMMENT ON COLUMN public.profiles.utm_campaign   IS 'First-touch utm_campaign name';
COMMENT ON COLUMN public.profiles.gclid          IS 'Google Ads click ID — links signup to the ad click';
COMMENT ON COLUMN public.profiles.fbclid         IS 'Facebook click ID — links signup to the ad click';
COMMENT ON COLUMN public.profiles.referrer_url   IS 'document.referrer at first landing';
COMMENT ON COLUMN public.profiles.landing_page   IS 'First URL visited (path + query)';
COMMENT ON COLUMN public.profiles.first_touch_at IS 'Timestamp of first site visit (pre-signup)';
