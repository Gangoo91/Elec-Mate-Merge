-- Enable realtime for circuit_design_jobs
ALTER TABLE circuit_design_jobs REPLICA IDENTITY FULL;

-- Add to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE circuit_design_jobs;