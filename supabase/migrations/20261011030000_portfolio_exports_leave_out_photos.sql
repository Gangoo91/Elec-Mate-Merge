-- Evidence pack privacy option (10 Oct 2026, approved by Andrew).
--
-- "Leave out photos of people and site addresses": when the person making an
-- evidence pack chooses it, portfolio-export-pack leaves every photo and video
-- out of the PDF and the ZIP (the PDF shows "Photo held by the college"; the
-- manifest keeps each file's fingerprint so integrity still verifies) and drops
-- the "Where" / site fields. The choice is stored on the export request so a
-- pack always says how it was made.
--
-- Additive only: one nullable column. Null = an export made before the option.

alter table public.portfolio_exports
  add column if not exists leave_out_photos_and_sites boolean;

comment on column public.portfolio_exports.leave_out_photos_and_sites is
  'Evidence pack privacy option: true = photos/videos and site addresses were left out of the PDF and ZIP (fingerprints kept in manifest.json). Null = made before the option existed. Written only by portfolio-export-pack.';
