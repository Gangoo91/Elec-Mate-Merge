-- P3: Link site diary entries to OJT time entries
-- Adds linked_time_entry_id so diary entries can auto-create paired time entries.

ALTER TABLE public.site_diary_entries
  ADD COLUMN IF NOT EXISTS linked_time_entry_id UUID REFERENCES public.time_entries(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_sde_linked_time_entry ON public.site_diary_entries(linked_time_entry_id);
