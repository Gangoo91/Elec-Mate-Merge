-- Phase 3: Add tracking and smart features to certificate_expiry_reminders
ALTER TABLE certificate_expiry_reminders
ADD COLUMN IF NOT EXISTS status_history JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS response_time_hours INTEGER;

-- Add property type to reports
ALTER TABLE reports
ADD COLUMN IF NOT EXISTS property_type TEXT DEFAULT 'domestic' CHECK (property_type IN ('domestic', 'commercial'));

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_reminders_client_name ON certificate_expiry_reminders(client_name);
CREATE INDEX IF NOT EXISTS idx_reminders_status ON certificate_expiry_reminders(reminder_status);
CREATE INDEX IF NOT EXISTS idx_reminders_expiry_date ON certificate_expiry_reminders(expiry_date);

-- Update calculate_certificate_expiry trigger to use property_type
CREATE OR REPLACE FUNCTION public.calculate_certificate_expiry()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.report_type = 'eicr' AND NEW.inspection_date IS NOT NULL THEN
    -- Use property_type to determine expiry: 3 years for commercial, 5 for domestic
    IF NEW.property_type = 'commercial' THEN
      NEW.expiry_date := NEW.inspection_date + INTERVAL '3 years';
    ELSE
      NEW.expiry_date := NEW.inspection_date + INTERVAL '5 years';
    END IF;
    
    NEW.next_inspection_due := NEW.expiry_date - INTERVAL '30 days';
    
    -- Create/update reminder if within 6 months and not deleted
    IF NEW.expiry_date <= CURRENT_DATE + INTERVAL '6 months' AND NEW.deleted_at IS NULL THEN
      INSERT INTO public.certificate_expiry_reminders (
        user_id, report_id, certificate_number, client_name,
        installation_address, inspection_date, expiry_date,
        reminder_status
      ) VALUES (
        NEW.user_id, NEW.id, NEW.certificate_number, NEW.client_name,
        NEW.installation_address, NEW.inspection_date, NEW.expiry_date,
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
        
      -- Auto-complete old reminders for same address/client
      UPDATE certificate_expiry_reminders
      SET reminder_status = 'completed',
          notes = COALESCE(notes || E'\n', '') || 'Auto-completed: New certificate issued',
          updated_at = NOW()
      WHERE user_id = NEW.user_id
        AND report_id != NEW.id
        AND LOWER(installation_address) = LOWER(NEW.installation_address)
        AND LOWER(client_name) = LOWER(NEW.client_name)
        AND reminder_status NOT IN ('completed', 'cancelled')
        AND expiry_date < NEW.expiry_date;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public';

-- Create trigger to track status changes
CREATE OR REPLACE FUNCTION public.track_reminder_status_change()
RETURNS TRIGGER AS $$
BEGIN
  -- Track status change in history
  IF OLD.reminder_status IS DISTINCT FROM NEW.reminder_status THEN
    NEW.status_history := COALESCE(OLD.status_history, '[]'::jsonb) || 
      jsonb_build_object(
        'from', OLD.reminder_status,
        'to', NEW.reminder_status,
        'changed_at', NOW(),
        'changed_by', auth.uid()
      );
    
    -- Calculate response time when status changes to 'contacted'
    IF NEW.reminder_status = 'contacted' AND OLD.reminder_status = 'pending' THEN
      NEW.response_time_hours := EXTRACT(EPOCH FROM (NOW() - NEW.created_at)) / 3600;
    END IF;
    
    -- Update contacted_at when marked as contacted
    IF NEW.reminder_status = 'contacted' AND NEW.contacted_at IS NULL THEN
      NEW.contacted_at := NOW();
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public';

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS track_status_changes ON certificate_expiry_reminders;
CREATE TRIGGER track_status_changes
  BEFORE UPDATE ON certificate_expiry_reminders
  FOR EACH ROW
  EXECUTE FUNCTION track_reminder_status_change();