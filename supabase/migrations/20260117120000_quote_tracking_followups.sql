-- Migration: Quote Email Tracking & Automated Follow-ups
-- Adds fields for email open tracking, automated reminders, and expiry notifications

-- ============================================================================
-- STEP 1: Add email tracking fields to quote_views table
-- ============================================================================

-- Track when email was opened (via tracking pixel)
ALTER TABLE public.quote_views
ADD COLUMN IF NOT EXISTS email_opened_at timestamp with time zone;

-- Track email sends for analytics
ALTER TABLE public.quote_views
ADD COLUMN IF NOT EXISTS email_sent_at timestamp with time zone;

-- Track multiple email opens
ALTER TABLE public.quote_views
ADD COLUMN IF NOT EXISTS email_open_count integer DEFAULT 0;

-- ============================================================================
-- STEP 2: Add follow-up/reminder fields to quotes table
-- ============================================================================

-- Track reminder sends
ALTER TABLE public.quotes
ADD COLUMN IF NOT EXISTS reminder_count integer DEFAULT 0;

-- Last reminder sent timestamp (already exists as last_reminder_sent_at, but ensure it exists)
ALTER TABLE public.quotes
ADD COLUMN IF NOT EXISTS last_reminder_sent_at timestamp with time zone;

-- Auto follow-up enabled (user preference)
ALTER TABLE public.quotes
ADD COLUMN IF NOT EXISTS auto_followup_enabled boolean DEFAULT true;

-- First email sent at (to calculate follow-up timing)
ALTER TABLE public.quotes
ADD COLUMN IF NOT EXISTS first_sent_at timestamp with time zone;

-- Expiry notification sent flag
ALTER TABLE public.quotes
ADD COLUMN IF NOT EXISTS expiry_notification_sent boolean DEFAULT false;

-- ============================================================================
-- STEP 3: Create quote_email_events table for detailed tracking
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.quote_email_events (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quote_id uuid NOT NULL REFERENCES public.quotes(id) ON DELETE CASCADE,
  quote_view_id uuid REFERENCES public.quote_views(id) ON DELETE SET NULL,
  event_type text NOT NULL CHECK (event_type IN ('sent', 'opened', 'clicked', 'bounced', 'delivered')),
  event_data jsonb DEFAULT '{}',
  ip_address text,
  user_agent text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.quote_email_events ENABLE ROW LEVEL SECURITY;

-- Users can view email events for their own quotes
CREATE POLICY "Users can view their own quote email events"
ON public.quote_email_events
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.quotes
    WHERE quotes.id = quote_email_events.quote_id
    AND quotes.user_id = auth.uid()
  )
);

-- Service role can insert events (from edge functions)
CREATE POLICY "Service role can insert email events"
ON public.quote_email_events
FOR INSERT
WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_quote_email_events_quote_id ON public.quote_email_events(quote_id);
CREATE INDEX IF NOT EXISTS idx_quote_email_events_type ON public.quote_email_events(event_type);
CREATE INDEX IF NOT EXISTS idx_quote_email_events_created_at ON public.quote_email_events(created_at DESC);

-- ============================================================================
-- STEP 4: Create index for finding quotes needing follow-up
-- ============================================================================

-- Index for efficient follow-up queries (sent quotes that haven't been accepted/rejected)
CREATE INDEX IF NOT EXISTS idx_quotes_followup_candidates
ON public.quotes(first_sent_at, status, acceptance_status)
WHERE status = 'sent' AND acceptance_status = 'pending';

-- Index for expiry check
CREATE INDEX IF NOT EXISTS idx_quotes_expiry_check
ON public.quotes(expiry_date, expiry_notification_sent)
WHERE expiry_notification_sent = false;

-- ============================================================================
-- STEP 5: Grant necessary permissions for tracking pixel (public endpoint)
-- ============================================================================

-- Allow anonymous access to update view tracking (the pixel endpoint needs this)
CREATE POLICY "Allow anonymous tracking pixel updates"
ON public.quote_views
FOR UPDATE
USING (is_active = true)
WITH CHECK (is_active = true);

-- Allow anonymous inserts to email events table for tracking
CREATE POLICY "Allow anonymous email event tracking"
ON public.quote_email_events
FOR INSERT
WITH CHECK (true);

-- ============================================================================
-- STEP 6: Create helper function to check if quote needs follow-up
-- ============================================================================

CREATE OR REPLACE FUNCTION public.get_quotes_needing_followup(
  days_since_sent integer DEFAULT 3,
  max_reminders integer DEFAULT 3
)
RETURNS TABLE (
  quote_id uuid,
  quote_number text,
  client_email text,
  client_name text,
  total numeric,
  first_sent_at timestamp with time zone,
  reminder_count integer,
  user_id uuid
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT
    q.id as quote_id,
    q.quote_number,
    (q.client_data->>'email')::text as client_email,
    (q.client_data->>'name')::text as client_name,
    q.total,
    q.first_sent_at,
    q.reminder_count,
    q.user_id
  FROM public.quotes q
  WHERE
    q.status = 'sent'
    AND q.acceptance_status = 'pending'
    AND q.auto_followup_enabled = true
    AND q.first_sent_at IS NOT NULL
    AND q.first_sent_at < now() - (days_since_sent || ' days')::interval
    AND (q.last_reminder_sent_at IS NULL OR q.last_reminder_sent_at < now() - interval '2 days')
    AND q.reminder_count < max_reminders
    AND q.expiry_date > now()
  ORDER BY q.first_sent_at ASC;
END;
$$;

-- ============================================================================
-- STEP 7: Create helper function to get quotes expiring soon
-- ============================================================================

CREATE OR REPLACE FUNCTION public.get_quotes_expiring_soon(
  days_until_expiry integer DEFAULT 3
)
RETURNS TABLE (
  quote_id uuid,
  quote_number text,
  client_name text,
  total numeric,
  expiry_date timestamp with time zone,
  user_id uuid
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT
    q.id as quote_id,
    q.quote_number,
    (q.client_data->>'name')::text as client_name,
    q.total,
    q.expiry_date,
    q.user_id
  FROM public.quotes q
  WHERE
    q.status = 'sent'
    AND q.acceptance_status = 'pending'
    AND q.expiry_notification_sent = false
    AND q.expiry_date > now()
    AND q.expiry_date < now() + (days_until_expiry || ' days')::interval
  ORDER BY q.expiry_date ASC;
END;
$$;

-- ============================================================================
-- STEP 8: Grant execute permissions on helper functions
-- ============================================================================

GRANT EXECUTE ON FUNCTION public.get_quotes_needing_followup TO service_role;
GRANT EXECUTE ON FUNCTION public.get_quotes_expiring_soon TO service_role;
