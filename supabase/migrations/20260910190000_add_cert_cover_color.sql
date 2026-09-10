-- ELE-1671 — the certificate cover colour, chosen for the COVER specifically.
--
-- Deliberately separate from primary/secondary/accent. A brand palette is not
-- a cover palette: a yellow-and-black brand makes a garish, hard-to-read
-- certificate cover, and driving the cover from `primary_color` forced exactly
-- that choice on people. Keeping it its own column means an electrician can run
-- a bright brand everywhere else and still issue a certificate that looks
-- considered.
--
-- NULL means "no cover colour chosen"; combined with cert_cover_style = 'brand'
-- the app falls back to primary_color, so nothing changes for anyone who has
-- already opted in.
alter table public.company_profiles
  add column if not exists cert_cover_color text;

alter table public.company_profiles
  drop constraint if exists company_profiles_cert_cover_color_check;

alter table public.company_profiles
  add constraint company_profiles_cert_cover_color_check
  check (cert_cover_color is null or cert_cover_color ~* '^#[0-9a-f]{6}$');

comment on column public.company_profiles.cert_cover_color is
  'ELE-1671 cover colour, used when cert_cover_style = brand. Separate from the brand palette on purpose — a brand colour is often a poor cover colour.';
