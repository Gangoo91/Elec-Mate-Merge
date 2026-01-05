-- Add client_address and job_title columns to quotes table
ALTER TABLE public.quotes 
ADD COLUMN client_address text,
ADD COLUMN job_title text;