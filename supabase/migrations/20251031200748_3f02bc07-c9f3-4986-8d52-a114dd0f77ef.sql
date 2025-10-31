-- Enable realtime updates for practical_work_intelligence table
ALTER TABLE practical_work_intelligence REPLICA IDENTITY FULL;

-- Add table to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE practical_work_intelligence;