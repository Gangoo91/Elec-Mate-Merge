-- Add client notification preference to customers
ALTER TABLE public.customers
ADD COLUMN IF NOT EXISTS client_notifications_enabled BOOLEAN DEFAULT false;

-- Add client email tracking to certificate_expiry_reminders
ALTER TABLE public.certificate_expiry_reminders
ADD COLUMN IF NOT EXISTS client_email_30_day_sent_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS client_email_14_day_sent_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS client_email_7_day_sent_at TIMESTAMPTZ;
