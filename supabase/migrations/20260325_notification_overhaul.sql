-- Notification Overhaul: quiet hours, queued notifications, cron schedule updates
-- 2026-03-25

-- 1. Queued notifications table (for quiet hours)
CREATE TABLE IF NOT EXISTS queued_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  body text NOT NULL,
  type text NOT NULL,
  data jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  processed boolean NOT NULL DEFAULT false,
  processed_at timestamptz
);

CREATE INDEX idx_queued_notifications_user_pending
  ON queued_notifications (user_id, processed)
  WHERE processed = false;

ALTER TABLE queued_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own queued notifications"
  ON queued_notifications FOR SELECT
  USING (auth.uid() = user_id);

-- Service role can insert/update (edge functions)
CREATE POLICY "Service role full access on queued_notifications"
  ON queued_notifications FOR ALL
  USING (auth.role() = 'service_role');

-- 2. Update daily digest cron schedule: 07:30 UTC -> 07:00 UTC
SELECT cron.unschedule('daily-notification-digest');
SELECT cron.schedule(
  'daily-notification-digest',
  '0 7 * * *',
  $$SELECT net.http_post(
    url := current_setting('app.settings.supabase_url') || '/functions/v1/daily-notification-digest',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key')
    ),
    body := '{}'::jsonb
  )$$
);

-- 3. Update check-overdue-invoices to run at 06:00 UTC (before digest)
SELECT cron.unschedule('check-overdue-invoices');
SELECT cron.schedule(
  'check-overdue-invoices',
  '0 6 * * *',
  $$SELECT net.http_post(
    url := current_setting('app.settings.supabase_url') || '/functions/v1/check-overdue-invoices',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key')
    ),
    body := '{}'::jsonb
  )$$
);

-- 4. Add apprentice evening study reminder cron (6pm UTC = 6pm GMT / 7pm BST)
SELECT cron.schedule(
  'apprentice-study-reminder',
  '0 18 * * *',
  $$SELECT net.http_post(
    url := current_setting('app.settings.supabase_url') || '/functions/v1/daily-notification-digest',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key')
    ),
    body := '{"mode": "study_reminder"}'::jsonb
  )$$
);
