-- The Progress Logs "Additional notes" field wrote to a non-existent column and
-- was silently discarded. Add the column so the field works.
ALTER TABLE public.progress_logs ADD COLUMN IF NOT EXISTS notes text;
