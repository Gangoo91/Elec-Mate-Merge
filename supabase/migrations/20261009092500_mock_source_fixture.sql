-- Allow source = 'fixture' on seo_mock_attempts: the Northgate demo learners'
-- seeded mock history (ELE-1763, scripts/college-demo/seed_fixture_mocks.sql).
-- analytics_daily excludes it (20261009092000). Widening only: every existing
-- row ('seo' / 'in_app') still passes.
alter table public.seo_mock_attempts drop constraint if exists seo_mock_attempts_source_check;
alter table public.seo_mock_attempts add constraint seo_mock_attempts_source_check
  check (source = any (array['seo'::text, 'in_app'::text, 'fixture'::text]));
