-- The Price Book "Markup" tab + quick-add default markup, and the employer-ai
-- assistant rate snapshot, all reference company_profiles.markup — but the column
-- never existed, so the snapshot select errored (Mate got NO rate data) and saving
-- the Markup tab failed outright (PGRST204), dragging overhead/profit down with it.
--
-- Reversible: alter table public.company_profiles drop column markup;
alter table public.company_profiles add column if not exists markup numeric;
comment on column public.company_profiles.markup is 'Default % markup applied to new price-book items and quoting (e.g. 30 = 30%).';
