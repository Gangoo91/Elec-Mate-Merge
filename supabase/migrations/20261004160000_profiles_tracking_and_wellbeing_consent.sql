-- Consent records the server can check (4 Oct 2026, ELE-1812).
--
-- ad_tracking_consent: the person's "marketing" choice (web cookie banner, or
-- the in-app privacy prompt + Apple's tracking dialog on iPhone). Server-side
-- Meta Conversions API events from the Stripe / RevenueCat webhooks and the
-- newsletter function only fire when this is true. NULL = never asked, which
-- is treated exactly like false.
--
-- wellbeing_consent_at: explicit consent (UK GDPR Art 9(2)(a)) given before
-- first use of the mood / journal / sleep / safety-plan / peer-support
-- features. NULL = not given; the features show the consent screen first.

alter table public.profiles
  add column if not exists ad_tracking_consent boolean,
  add column if not exists ad_tracking_consent_at timestamptz,
  add column if not exists ad_tracking_consent_source text,
  add column if not exists wellbeing_consent_at timestamptz;

comment on column public.profiles.ad_tracking_consent is
  'Marketing/ad-measurement consent. Server-side Meta CAPI fires only when true.';
comment on column public.profiles.wellbeing_consent_at is
  'When explicit consent was given for the wellbeing features (Art 9). NULL = not given.';
