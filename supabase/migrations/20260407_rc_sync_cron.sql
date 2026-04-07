-- Enable pg_cron and pg_net if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Pure-SQL function to expire stale mobile trials without needing the
-- full RevenueCat API sync.  Runs as SECURITY DEFINER so it can update
-- profiles regardless of RLS policies.
CREATE OR REPLACE FUNCTION sync_expired_trials()
RETURNS void AS $$
BEGIN
  UPDATE profiles
  SET subscribed = false,
      is_trial = false,
      is_trial_cancelled = true
  WHERE is_trial = true
    AND trial_end < NOW()
    AND trial_end IS NOT NULL
    AND (subscription_source = 'app_store' OR subscription_source = 'play_store');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Run every hour on the hour
SELECT cron.schedule(
  'expire-stale-trials',
  '0 * * * *',
  $$ SELECT sync_expired_trials(); $$
);
