-- Add client_email column to quotes table
ALTER TABLE public.quotes ADD COLUMN IF NOT EXISTS client_email text;