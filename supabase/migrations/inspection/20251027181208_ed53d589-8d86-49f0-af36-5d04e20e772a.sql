-- 1. Fix calculate_certificate_expiry function to preserve manual expiry dates
CREATE OR REPLACE FUNCTION public.calculate_certificate_expiry()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF NEW.report_type = 'eicr' AND NEW.inspection_date IS NOT NULL THEN
    -- Only calculate expiry if not manually set
    IF TG_OP = 'INSERT' AND NEW.expiry_date IS NULL THEN
      -- Auto-calculate on insert if no expiry provided
      IF NEW.property_type = 'commercial' THEN
        NEW.expiry_date := NEW.inspection_date + INTERVAL '3 years';
      ELSE
        NEW.expiry_date := NEW.inspection_date + INTERVAL '5 years';
      END IF;
    ELSIF TG_OP = 'UPDATE' AND NEW.expiry_date IS NULL AND 
          (OLD.inspection_date IS DISTINCT FROM NEW.inspection_date OR 
           OLD.property_type IS DISTINCT FROM NEW.property_type) THEN
      -- Recalculate on update only if expiry is NULL and inspection_date/property_type changed
      IF NEW.property_type = 'commercial' THEN
        NEW.expiry_date := NEW.inspection_date + INTERVAL '3 years';
      ELSE
        NEW.expiry_date := NEW.inspection_date + INTERVAL '5 years';
      END IF;
    END IF;
    
    -- Always set next_inspection_due if expiry_date exists
    IF NEW.expiry_date IS NOT NULL THEN
      NEW.next_inspection_due := NEW.expiry_date - INTERVAL '30 days';
    END IF;
    
    -- Create/update reminder if within 12 months and not deleted
    IF NEW.expiry_date IS NOT NULL AND 
       NEW.expiry_date <= CURRENT_DATE + INTERVAL '12 months' AND 
       NEW.deleted_at IS NULL THEN
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

-- 2. Create missing triggers
DROP TRIGGER IF EXISTS update_reports_updated_at ON public.reports;
CREATE TRIGGER update_reports_updated_at
  BEFORE UPDATE ON public.reports
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS calculate_certificate_expiry_trigger ON public.reports;
CREATE TRIGGER calculate_certificate_expiry_trigger
  BEFORE INSERT OR UPDATE ON public.reports
  FOR EACH ROW
  EXECUTE FUNCTION public.calculate_certificate_expiry();

DROP TRIGGER IF EXISTS prevent_certificate_number_update_trigger ON public.reports;
CREATE TRIGGER prevent_certificate_number_update_trigger
  BEFORE UPDATE ON public.reports
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_certificate_number_update();

DROP TRIGGER IF EXISTS track_reminder_status_change_trigger ON public.certificate_expiry_reminders;
CREATE TRIGGER track_reminder_status_change_trigger
  BEFORE UPDATE ON public.certificate_expiry_reminders
  FOR EACH ROW
  EXECUTE FUNCTION public.track_reminder_status_change();

DROP TRIGGER IF EXISTS update_reminders_updated_at ON public.certificate_expiry_reminders;
CREATE TRIGGER update_reminders_updated_at
  BEFORE UPDATE ON public.certificate_expiry_reminders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- 3. Fix Kieran Maguire certificate expiry date
UPDATE public.reports 
SET expiry_date = DATE '2025-10-30',
    next_inspection_due = DATE '2025-09-30'
WHERE report_id = 'EICR-1761081170523-arjcrg' 
  AND deleted_at IS NULL;

-- 4. Link reports to customers by name matching
UPDATE public.reports r
SET customer_id = c.id
FROM public.customers c
WHERE r.user_id = c.user_id
  AND r.customer_id IS NULL
  AND r.deleted_at IS NULL
  AND r.client_name IS NOT NULL
  AND c.name IS NOT NULL
  AND LOWER(TRIM(r.client_name)) = LOWER(TRIM(c.name));

-- 5. Backfill certificate expiry reminders (12 month window)
INSERT INTO public.certificate_expiry_reminders (
  user_id, report_id, certificate_number, client_name,
  installation_address, inspection_date, expiry_date, reminder_status
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
WHERE r.deleted_at IS NULL
  AND r.expiry_date IS NOT NULL
  AND r.expiry_date <= CURRENT_DATE + INTERVAL '12 months'
ON CONFLICT (report_id) DO UPDATE SET
  certificate_number = EXCLUDED.certificate_number,
  client_name = EXCLUDED.client_name,
  installation_address = EXCLUDED.installation_address,
  inspection_date = EXCLUDED.inspection_date,
  expiry_date = EXCLUDED.expiry_date,
  updated_at = NOW();