-- Enable full row replication for real-time updates on quotes table
ALTER TABLE quotes REPLICA IDENTITY FULL;

-- Add quotes table to the realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE quotes;