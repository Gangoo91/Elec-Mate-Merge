-- Follow-ups / reminders against a client (chase a quote, ring back, etc.).
CREATE TABLE IF NOT EXISTS public.client_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid(),
  client_id uuid NOT NULL REFERENCES public.employer_clients(id) ON DELETE CASCADE,
  title text NOT NULL,
  due_date date,
  done boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.client_tasks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "own tasks select" ON public.client_tasks;
CREATE POLICY "own tasks select" ON public.client_tasks
  FOR SELECT USING (user_id = auth.uid());
DROP POLICY IF EXISTS "own tasks insert" ON public.client_tasks;
CREATE POLICY "own tasks insert" ON public.client_tasks
  FOR INSERT WITH CHECK (user_id = auth.uid());
DROP POLICY IF EXISTS "own tasks update" ON public.client_tasks;
CREATE POLICY "own tasks update" ON public.client_tasks
  FOR UPDATE USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
DROP POLICY IF EXISTS "own tasks delete" ON public.client_tasks;
CREATE POLICY "own tasks delete" ON public.client_tasks
  FOR DELETE USING (user_id = auth.uid());

CREATE INDEX IF NOT EXISTS client_tasks_open_idx
  ON public.client_tasks (user_id, done, due_date);
