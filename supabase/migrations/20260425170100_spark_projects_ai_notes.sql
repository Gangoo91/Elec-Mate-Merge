-- ELE-859: Elec-AI "Save to job" attaches saved answers to a project, not a cert.
-- Adds a JSONB array column on spark_projects to hold saved Elec-AI answers
-- (newest first, capped at 100 by the SaveToJobSheet client).
--
-- Per-entry shape:
--   { id, question, answer, cited_regulations[], image_urls?[], source: 'elec-ai', saved_at }

ALTER TABLE public.spark_projects
ADD COLUMN IF NOT EXISTS ai_notes JSONB NOT NULL DEFAULT '[]'::jsonb;

COMMENT ON COLUMN public.spark_projects.ai_notes IS
  'Elec-AI answers saved against this project. Append-only array; newest first. See ELE-859.';
