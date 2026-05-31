-- Assessor-ready capture metadata for portfolio evidence.
-- Holds work date, site/job ref, the apprentice's individual role, evidence
-- type, witness/supervisor details and the authenticity declaration. Additive
-- and nullable-safe: existing rows default to an empty object, RLS unchanged.
ALTER TABLE public.portfolio_items
  ADD COLUMN IF NOT EXISTS metadata jsonb NOT NULL DEFAULT '{}'::jsonb;
