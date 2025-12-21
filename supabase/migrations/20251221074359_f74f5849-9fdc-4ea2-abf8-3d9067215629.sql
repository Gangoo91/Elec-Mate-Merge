-- Enable realtime for maintenance_method_jobs table
ALTER TABLE maintenance_method_jobs REPLICA IDENTITY FULL;

-- Add to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE maintenance_method_jobs;

-- Clean up stuck jobs from yesterday
UPDATE maintenance_method_jobs 
SET 
  status = 'failed',
  error_message = 'Job timed out - stuck in processing state',
  completed_at = NOW()
WHERE 
  id IN ('090092e3-4704-4ef9-9918-c5dc53e1e8e9', '55a7c86d-24d7-417a-8cc7-e4e9cc5a3dba')
  AND status = 'processing';