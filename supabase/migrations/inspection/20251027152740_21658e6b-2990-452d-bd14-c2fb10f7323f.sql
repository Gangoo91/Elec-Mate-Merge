-- Phase 1: Database Foundation for Certificate Expiry System (Fixed)

-- Add expiry tracking columns to reports table
ALTER TABLE public.reports 
ADD COLUMN IF NOT EXISTS expiry_date DATE,
ADD COLUMN IF NOT EXISTS next_inspection_due DATE,
ADD COLUMN IF NOT EXISTS expiry_reminder_sent BOOLEAN DEFAULT false;

-- Create index for performance on expiry queries
CREATE INDEX IF NOT EXISTS idx_reports_expiry_date 
ON public.reports(expiry_date) 
WHERE expiry_date IS NOT NULL AND deleted_at IS NULL;

-- Create certificate_expiry_reminders table
CREATE TABLE IF NOT EXISTS public.certificate_expiry_reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  report_id UUID NOT NULL REFERENCES public.reports(id) ON DELETE CASCADE,
  certificate_number TEXT NOT NULL,
  client_name TEXT,
  installation_address TEXT,
  inspection_date DATE,
  expiry_date DATE NOT NULL,
  reminder_status TEXT NOT NULL DEFAULT 'pending' CHECK (reminder_status IN ('pending', 'viewed', 'contacted', 'booked', 'completed')),
  contacted_at TIMESTAMP WITH TIME ZONE,
  booked_for_date DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(report_id)
);

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_expiry_reminders_user_id 
ON public.certificate_expiry_reminders(user_id);

CREATE INDEX IF NOT EXISTS idx_expiry_reminders_expiry_date 
ON public.certificate_expiry_reminders(expiry_date);

CREATE INDEX IF NOT EXISTS idx_expiry_reminders_status 
ON public.certificate_expiry_reminders(reminder_status);

-- Enable RLS on certificate_expiry_reminders
ALTER TABLE public.certificate_expiry_reminders ENABLE ROW LEVEL SECURITY;

-- RLS Policies for certificate_expiry_reminders
CREATE POLICY "Users can view own expiry reminders"
ON public.certificate_expiry_reminders FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can update own expiry reminders"
ON public.certificate_expiry_reminders FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can create own expiry reminders"
ON public.certificate_expiry_reminders FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own expiry reminders"
ON public.certificate_expiry_reminders FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Create trigger to update updated_at timestamp
CREATE TRIGGER update_expiry_reminders_updated_at
BEFORE UPDATE ON public.certificate_expiry_reminders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to calculate certificate expiry dates
CREATE OR REPLACE FUNCTION public.calculate_certificate_expiry()
RETURNS TRIGGER AS $$
BEGIN
  -- Only calculate for EICR certificates with inspection dates
  IF NEW.report_type = 'eicr' AND NEW.inspection_date IS NOT NULL THEN
    -- Default to 5 years for domestic EICR (can be refined later)
    NEW.expiry_date := NEW.inspection_date + INTERVAL '5 years';
    NEW.next_inspection_due := NEW.expiry_date - INTERVAL '30 days';
    
    -- Create/update reminder entry if expiry is within 6 months and certificate is not deleted
    IF NEW.expiry_date <= CURRENT_DATE + INTERVAL '6 months' AND NEW.deleted_at IS NULL THEN
      INSERT INTO public.certificate_expiry_reminders (
        user_id,
        report_id,
        certificate_number,
        client_name,
        installation_address,
        inspection_date,
        expiry_date,
        reminder_status
      ) VALUES (
        NEW.user_id,
        NEW.id,
        NEW.certificate_number,
        NEW.client_name,
        NEW.installation_address,
        NEW.inspection_date,
        NEW.expiry_date,
        'pending'
      )
      ON CONFLICT (report_id) 
      DO UPDATE SET
        certificate_number = EXCLUDED.certificate_number,
        client_name = EXCLUDED.client_name,
        installation_address = EXCLUDED.installation_address,
        inspection_date = EXCLUDED.inspection_date,
        expiry_date = EXCLUDED.expiry_date,
        updated_at = NOW();
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger to auto-calculate expiry on insert/update
CREATE TRIGGER auto_calculate_expiry
BEFORE INSERT OR UPDATE OF inspection_date, report_type
ON public.reports
FOR EACH ROW
EXECUTE FUNCTION public.calculate_certificate_expiry();

-- Backfill expiry dates for existing EICR reports
UPDATE public.reports
SET 
  expiry_date = inspection_date + INTERVAL '5 years',
  next_inspection_due = (inspection_date + INTERVAL '5 years') - INTERVAL '30 days'
WHERE 
  report_type = 'eicr' 
  AND inspection_date IS NOT NULL 
  AND expiry_date IS NULL
  AND deleted_at IS NULL;

-- Create reminder entries for existing certificates expiring within 6 months
INSERT INTO public.certificate_expiry_reminders (
  user_id,
  report_id,
  certificate_number,
  client_name,
  installation_address,
  inspection_date,
  expiry_date,
  reminder_status
)
SELECT 
  r.user_id,
  r.id,
  r.certificate_number,
  r.client_name,
  r.installation_address,
  r.inspection_date,
  r.expiry_date,
  'pending'
FROM public.reports r
WHERE 
  r.report_type = 'eicr'
  AND r.expiry_date IS NOT NULL
  AND r.expiry_date <= CURRENT_DATE + INTERVAL '6 months'
  AND r.deleted_at IS NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.certificate_expiry_reminders cer 
    WHERE cer.report_id = r.id
  )
ON CONFLICT (report_id) DO NOTHING;