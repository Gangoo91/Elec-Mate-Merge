-- ELE-1671 — how the certificate cover block is painted.
--
--   house  (default) — the Elec-Mate navy. Unchanged from today, so no existing
--                      certificate changes appearance until the user opts in.
--   brand            — the electrician's own colour drives the cover.
--   print            — white cover, dark ink. Measured at ~94% less ink on the
--                      cover page, and it makes dark company logos legible.
--
-- Deliberately nullable with no DEFAULT: `company_profiles.primary_color`
-- already carries a column default of '#1e40af', which is why 51 profiles look
-- like they "chose" royal blue when they never did. A NULL here reads as
-- 'house' in the app, so an untouched row cannot be mistaken for a choice.
alter table public.company_profiles
  add column if not exists cert_cover_style text;

alter table public.company_profiles
  drop constraint if exists company_profiles_cert_cover_style_check;

alter table public.company_profiles
  add constraint company_profiles_cert_cover_style_check
  check (cert_cover_style is null or cert_cover_style in ('house', 'brand', 'print'));

comment on column public.company_profiles.cert_cover_style is
  'ELE-1671 cover treatment: house (default/navy), brand (user colour), print (white, low ink). NULL = house.';
