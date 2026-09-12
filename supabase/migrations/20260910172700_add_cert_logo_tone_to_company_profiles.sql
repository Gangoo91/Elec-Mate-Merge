-- ELE-1671 — is the company logo light artwork or dark artwork?
--
-- Decides the certificate masthead's background. There is no safe fixed
-- choice: a white masthead rescues a dark logo and destroys a white one, and a
-- dark masthead does exactly the reverse. Both were shipped in turn before this
-- existed, each time making the electrician's own logo invisible on their own
-- certificate.
--
-- NULL / 'auto' means the app measures the logo's mean ink luminance and
-- decides. 'light' and 'dark' are the electrician's override for when the
-- measurement gets it wrong on a two-tone or outlined mark.
alter table public.company_profiles
  add column if not exists cert_logo_tone text;

alter table public.company_profiles
  drop constraint if exists company_profiles_cert_logo_tone_check;

alter table public.company_profiles
  add constraint company_profiles_cert_logo_tone_check
  check (cert_logo_tone is null or cert_logo_tone in ('auto', 'light', 'dark'));

comment on column public.company_profiles.cert_logo_tone is
  'ELE-1671: describes the LOGO artwork, not the background. light = pale artwork (needs a dark masthead), dark = dark artwork (needs a white masthead). NULL/auto = measure it.';
