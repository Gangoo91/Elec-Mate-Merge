-- Extend calculate_certificate_expiry() to handle ALL certificate types
-- Previously only handled EICR (5yr domestic, 3yr commercial)
-- Now supports: fire-alarm (1yr), emergency-lighting (1yr), pat-testing (1yr),
--               ev-charging (1yr), solar-pv (5yr), eic (10yr domestic, 5yr commercial),
--               minor-works (no expiry), eicr (5yr domestic, 3yr commercial)

-- Add email tracking columns to certificate_expiry_reminders for 3-tier reminder system
ALTER TABLE public.certificate_expiry_reminders
ADD COLUMN IF NOT EXISTS email_30_day_sent_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS email_14_day_sent_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS email_7_day_sent_at TIMESTAMP WITH TIME ZONE;

-- Index for efficient querying of unsent reminders by expiry window
CREATE INDEX IF NOT EXISTS idx_reminders_email_tiers
  ON public.certificate_expiry_reminders (expiry_date)
  WHERE reminder_status NOT IN ('completed', 'cancelled');

-- Replace the trigger function with multi-cert-type support
CREATE OR REPLACE FUNCTION public.calculate_certificate_expiry()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_expiry_interval INTERVAL;
  v_should_calculate BOOLEAN := FALSE;
BEGIN
  -- Determine the expiry interval based on report_type and property_type
  -- Only calculate if we have an inspection_date (or equivalent date field)
  CASE NEW.report_type
    WHEN 'eicr' THEN
      -- BS 7671: 5 years domestic, 3 years commercial
      IF NEW.property_type = 'commercial' THEN
        v_expiry_interval := INTERVAL '3 years';
      ELSE
        v_expiry_interval := INTERVAL '5 years';
      END IF;
      v_should_calculate := (NEW.inspection_date IS NOT NULL);

    WHEN 'eic' THEN
      -- Electrical Installation Certificate: 10 years domestic, 5 years commercial
      -- Based on BS 7671 recommendations for new installations
      IF NEW.property_type = 'commercial' THEN
        v_expiry_interval := INTERVAL '5 years';
      ELSE
        v_expiry_interval := INTERVAL '10 years';
      END IF;
      v_should_calculate := (NEW.inspection_date IS NOT NULL);

    WHEN 'fire-alarm' THEN
      -- BS 5839: Annual inspection and servicing required
      v_expiry_interval := INTERVAL '1 year';
      v_should_calculate := (NEW.inspection_date IS NOT NULL);

    WHEN 'emergency-lighting' THEN
      -- BS 5266: Annual full duration discharge test required
      v_expiry_interval := INTERVAL '1 year';
      v_should_calculate := (NEW.inspection_date IS NOT NULL);

    WHEN 'pat-testing' THEN
      -- IET Code of Practice: Annual for most equipment classes
      v_expiry_interval := INTERVAL '1 year';
      v_should_calculate := (NEW.inspection_date IS NOT NULL);

    WHEN 'ev-charging' THEN
      -- BS 7671 / IET guidance: Annual inspection recommended
      v_expiry_interval := INTERVAL '1 year';
      v_should_calculate := (NEW.inspection_date IS NOT NULL);

    WHEN 'solar-pv' THEN
      -- MCS / BS 7671: 5-year inspection cycle
      v_expiry_interval := INTERVAL '5 years';
      v_should_calculate := (NEW.inspection_date IS NOT NULL);

    WHEN 'minor-works' THEN
      -- Minor works certificates do not have a recurring expiry
      -- No expiry calculation needed
      v_should_calculate := FALSE;

    ELSE
      -- Unknown report type - skip expiry calculation
      v_should_calculate := FALSE;
  END CASE;

  -- Only proceed if we have a valid report type with an inspection date
  IF v_should_calculate THEN
    -- Calculate expiry date only if not manually set, or if key fields changed
    IF TG_OP = 'INSERT' AND NEW.expiry_date IS NULL THEN
      -- Auto-calculate on insert if no expiry provided
      NEW.expiry_date := NEW.inspection_date + v_expiry_interval;
    ELSIF TG_OP = 'UPDATE' AND NEW.expiry_date IS NULL AND
          (OLD.inspection_date IS DISTINCT FROM NEW.inspection_date OR
           OLD.property_type IS DISTINCT FROM NEW.property_type OR
           OLD.report_type IS DISTINCT FROM NEW.report_type) THEN
      -- Recalculate on update only if expiry is NULL and relevant fields changed
      NEW.expiry_date := NEW.inspection_date + v_expiry_interval;
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

      -- Auto-complete old reminders for same address/client when new certificate issued
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

-- Backfill expiry dates for all non-EICR certificate types that have inspection_date but no expiry_date
-- Fire Alarm: 1 year
UPDATE public.reports
SET expiry_date = inspection_date + INTERVAL '1 year',
    next_inspection_due = (inspection_date + INTERVAL '1 year') - INTERVAL '30 days'
WHERE report_type = 'fire-alarm'
  AND inspection_date IS NOT NULL
  AND expiry_date IS NULL
  AND deleted_at IS NULL;

-- Emergency Lighting: 1 year
UPDATE public.reports
SET expiry_date = inspection_date + INTERVAL '1 year',
    next_inspection_due = (inspection_date + INTERVAL '1 year') - INTERVAL '30 days'
WHERE report_type = 'emergency-lighting'
  AND inspection_date IS NOT NULL
  AND expiry_date IS NULL
  AND deleted_at IS NULL;

-- PAT Testing: 1 year
UPDATE public.reports
SET expiry_date = inspection_date + INTERVAL '1 year',
    next_inspection_due = (inspection_date + INTERVAL '1 year') - INTERVAL '30 days'
WHERE report_type = 'pat-testing'
  AND inspection_date IS NOT NULL
  AND expiry_date IS NULL
  AND deleted_at IS NULL;

-- EV Charging: 1 year
UPDATE public.reports
SET expiry_date = inspection_date + INTERVAL '1 year',
    next_inspection_due = (inspection_date + INTERVAL '1 year') - INTERVAL '30 days'
WHERE report_type = 'ev-charging'
  AND inspection_date IS NOT NULL
  AND expiry_date IS NULL
  AND deleted_at IS NULL;

-- Solar PV: 5 years
UPDATE public.reports
SET expiry_date = inspection_date + INTERVAL '5 years',
    next_inspection_due = (inspection_date + INTERVAL '5 years') - INTERVAL '30 days'
WHERE report_type = 'solar-pv'
  AND inspection_date IS NOT NULL
  AND expiry_date IS NULL
  AND deleted_at IS NULL;

-- EIC: 10 years domestic, 5 years commercial
UPDATE public.reports
SET expiry_date = CASE
      WHEN property_type = 'commercial' THEN inspection_date + INTERVAL '5 years'
      ELSE inspection_date + INTERVAL '10 years'
    END,
    next_inspection_due = CASE
      WHEN property_type = 'commercial' THEN (inspection_date + INTERVAL '5 years') - INTERVAL '30 days'
      ELSE (inspection_date + INTERVAL '10 years') - INTERVAL '30 days'
    END
WHERE report_type = 'eic'
  AND inspection_date IS NOT NULL
  AND expiry_date IS NULL
  AND deleted_at IS NULL;

-- Backfill reminders for all newly-calculated expiry dates within 12 months
INSERT INTO public.certificate_expiry_reminders (
  user_id, report_id, certificate_number, client_name,
  installation_address, inspection_date, expiry_date,
  reminder_status
)
SELECT
  r.user_id, r.id, r.certificate_number, r.client_name,
  r.installation_address, r.inspection_date, r.expiry_date,
  'pending'
FROM public.reports r
WHERE r.deleted_at IS NULL
  AND r.expiry_date IS NOT NULL
  AND r.expiry_date <= CURRENT_DATE + INTERVAL '12 months'
  AND r.report_type IN ('fire-alarm', 'emergency-lighting', 'pat-testing', 'ev-charging', 'solar-pv', 'eic')
ON CONFLICT (report_id)
DO UPDATE SET
  certificate_number = EXCLUDED.certificate_number,
  client_name = EXCLUDED.client_name,
  installation_address = EXCLUDED.installation_address,
  inspection_date = EXCLUDED.inspection_date,
  expiry_date = EXCLUDED.expiry_date,
  updated_at = NOW();
