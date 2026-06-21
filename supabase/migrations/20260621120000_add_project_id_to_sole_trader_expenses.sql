-- ELE-1176: link sole-trader expenses to a project (spark_projects).
-- Nullable so existing expenses + flows are unaffected; ON DELETE SET NULL
-- keeps the expense if the project is removed. RLS stays user-scoped.
ALTER TABLE public.sole_trader_expenses
  ADD COLUMN IF NOT EXISTS project_id uuid REFERENCES public.spark_projects(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_sole_trader_expenses_project_id
  ON public.sole_trader_expenses(project_id);
