-- Add certificate_id to link design to completed certificate
ALTER TABLE public.eic_schedules
ADD COLUMN IF NOT EXISTS certificate_id TEXT;

-- Update status constraint to include 'archived'
ALTER TABLE public.eic_schedules
DROP CONSTRAINT IF EXISTS eic_schedules_status_check;

ALTER TABLE public.eic_schedules
ADD CONSTRAINT eic_schedules_status_check
CHECK (status IN ('pending', 'in-progress', 'completed', 'archived'));

-- Index for certificate linking
CREATE INDEX IF NOT EXISTS idx_eic_schedules_certificate_id
ON public.eic_schedules(certificate_id)
WHERE certificate_id IS NOT NULL;
