-- Mark stuck installation method jobs as failed so users can retry
UPDATE installation_method_jobs 
SET 
  status = 'failed', 
  error_message = 'Job timed out during AI generation. Timeout has been increased from 180s to 600s. Please try again.',
  completed_at = NOW()
WHERE status = 'processing' 
  AND progress = 30
  AND created_at < NOW() - INTERVAL '10 minutes';