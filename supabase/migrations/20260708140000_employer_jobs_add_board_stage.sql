-- The Job Board kanban was overloading `status` (dropping a card on "Confirmed"
-- wrote status 'On Hold' etc.), corrupting the job's real lifecycle state. Give
-- the board its own column so the kanban position is decoupled from status.
-- Nullable: existing jobs fall back to status/progress inference until moved.
ALTER TABLE public.employer_jobs ADD COLUMN IF NOT EXISTS board_stage text;
