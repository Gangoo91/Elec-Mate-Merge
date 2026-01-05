-- Add missing triggers to reports table
CREATE TRIGGER calculate_expiry_trigger
  BEFORE INSERT OR UPDATE ON public.reports
  FOR EACH ROW
  EXECUTE FUNCTION public.calculate_certificate_expiry();

CREATE TRIGGER prevent_cert_number_change_trigger
  BEFORE UPDATE ON public.reports
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_certificate_number_update();

CREATE TRIGGER update_reports_updated_at_trigger
  BEFORE UPDATE ON public.reports
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add missing triggers to certificate_expiry_reminders table
CREATE TRIGGER track_reminder_status_trigger
  BEFORE UPDATE ON public.certificate_expiry_reminders
  FOR EACH ROW
  EXECUTE FUNCTION public.track_reminder_status_change();

CREATE TRIGGER update_reminders_updated_at_trigger
  BEFORE UPDATE ON public.certificate_expiry_reminders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Update calculate_certificate_expiry function to use 12-month window and respect manual expiry_date
CREATE OR REPLACE FUNCTION public.calculate_certificate_expiry()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF NEW.report_type = 'eicr' AND NEW.inspection_date IS NOT NULL THEN
    -- Only calculate expiry if not manually set
    IF NEW.expiry_date IS NULL OR OLD.expiry_date IS NULL OR OLD.inspection_date IS DISTINCT FROM NEW.inspection_date OR OLD.property_type IS DISTINCT FROM NEW.property_type THEN
      -- Use property_type to determine expiry: 3 years for commercial, 5 for domestic (BS 7671)
      IF NEW.property_type = 'commercial' THEN
        NEW.expiry_date := NEW.inspection_date + INTERVAL '3 years';
      ELSE
        NEW.expiry_date := NEW.inspection_date + INTERVAL '5 years';
      END IF;
    END IF;
    
    NEW.next_inspection_due := NEW.expiry_date - INTERVAL '30 days';
    
    -- Create/update reminder if within 12 months and not deleted
    IF NEW.expiry_date <= CURRENT_DATE + INTERVAL '12 months' AND NEW.deleted_at IS NULL THEN
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
$function$;

-- Backfill reminders for existing certificates expiring within 12 months
INSERT INTO public.certificate_expiry_reminders (
  user_id, report_id, certificate_number, client_name,
  installation_address, inspection_date, expiry_date,
  reminder_status
)
SELECT 
  user_id, id, certificate_number, client_name,
  installation_address, inspection_date, expiry_date,
  'pending'
FROM public.reports
WHERE report_type = 'eicr'
  AND deleted_at IS NULL
  AND expiry_date IS NOT NULL
  AND expiry_date <= CURRENT_DATE + INTERVAL '12 months'
ON CONFLICT (report_id) 
DO UPDATE SET
  certificate_number = EXCLUDED.certificate_number,
  client_name = EXCLUDED.client_name,
  installation_address = EXCLUDED.installation_address,
  inspection_date = EXCLUDED.inspection_date,
  expiry_date = EXCLUDED.expiry_date,
  updated_at = NOW();

-- Enable realtime for certificate_expiry_reminders
ALTER TABLE public.certificate_expiry_reminders REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.certificate_expiry_reminders;