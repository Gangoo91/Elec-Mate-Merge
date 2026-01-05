-- Drop and recreate all triggers to ensure clean state

-- Reports table triggers
DROP TRIGGER IF EXISTS calculate_expiry_trigger ON public.reports;
CREATE TRIGGER calculate_expiry_trigger
  BEFORE INSERT OR UPDATE ON public.reports
  FOR EACH ROW
  EXECUTE FUNCTION public.calculate_certificate_expiry();

DROP TRIGGER IF EXISTS prevent_cert_number_update_trigger ON public.reports;
CREATE TRIGGER prevent_cert_number_update_trigger
  BEFORE UPDATE ON public.reports
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_certificate_number_update();

DROP TRIGGER IF EXISTS update_reports_updated_at ON public.reports;
CREATE TRIGGER update_reports_updated_at
  BEFORE UPDATE ON public.reports
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Certificate expiry reminders table triggers
DROP TRIGGER IF EXISTS track_status_change_trigger ON public.certificate_expiry_reminders;
CREATE TRIGGER track_status_change_trigger
  BEFORE UPDATE ON public.certificate_expiry_reminders
  FOR EACH ROW
  EXECUTE FUNCTION public.track_reminder_status_change();

DROP TRIGGER IF EXISTS update_reminders_updated_at ON public.certificate_expiry_reminders;
CREATE TRIGGER update_reminders_updated_at
  BEFORE UPDATE ON public.certificate_expiry_reminders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Manually link KIERAN MAGUIRE report to customer
UPDATE public.reports 
SET customer_id = '212fdfb8-5724-4dc2-882b-20274a6e8dce'
WHERE report_id = 'EICR-1761081170523-arjcrg' 
  AND deleted_at IS NULL;