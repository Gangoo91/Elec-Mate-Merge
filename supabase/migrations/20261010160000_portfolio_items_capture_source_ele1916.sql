-- ELE-1916: one capture flow. Every new piece of evidence records where it
-- was captured from, so the seven old paths can no longer drift apart
-- silently. Additive: nullable column (older rows stay null), checked list.
--
-- ELE-1894: the offline outbox creates the row with an id made on the phone,
-- so a retry after a dropped connection finds the same row instead of filing
-- the evidence twice. That needs nothing new in the schema (id has a default
-- and accepts a supplied uuid); it is noted here so the reason is on record.

alter table public.portfolio_items
  add column if not exists source text;

do $$
begin
  if not exists (
    select 1 from pg_constraint
     where conrelid = 'public.portfolio_items'::regclass
       and conname = 'portfolio_items_source_check'
  ) then
    alter table public.portfolio_items
      add constraint portfolio_items_source_check check (
        source is null or source in (
          'photo',          -- camera / upload on the capture sheet
          'reflection',     -- daily reflection
          'diary_entry',    -- from the site diary or a logged-hours entry
          'worksheet',      -- a worksheet or document
          'test_sheet',     -- schedule of test results / certificate
          'from_job',       -- seeded from a job idea or assessment plan
          'work',           -- a certificate, test results or calculation made in Elec-Mate
          'notebook'        -- filed from a College notebook suggestion
        )
      );
  end if;
end $$;

comment on column public.portfolio_items.source is
  'ELE-1916: where the evidence was captured from (UnifiedCaptureSheet preset). Null on rows written before 10 Oct 2026.';
