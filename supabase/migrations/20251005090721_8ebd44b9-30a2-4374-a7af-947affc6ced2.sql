-- Add job_details column to quotes table to persist project information
ALTER TABLE quotes ADD COLUMN job_details JSONB;