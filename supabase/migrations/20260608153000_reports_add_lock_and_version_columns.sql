-- ELE-1037 — certificate lock + versioning.
-- Adds the columns that let a report be locked (issued, read-only) and that
-- link amended versions into a chain. All nullable / non-breaking; applied to
-- the remote DB on 2026-06-08 (recorded here for reproducibility).

alter table public.reports
  add column if not exists locked_at        timestamptz,
  add column if not exists parent_report_id uuid references public.reports(id) on delete set null,
  add column if not exists superseded_by     uuid references public.reports(id) on delete set null;

create index if not exists idx_reports_parent_report_id on public.reports(parent_report_id);
