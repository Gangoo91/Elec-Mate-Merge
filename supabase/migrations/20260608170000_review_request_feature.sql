-- Review-request feature: electricians store review links once and they're
-- appended to invoice emails + a one-off payment-received email when an
-- invoice is marked paid.

ALTER TABLE public.company_profiles
  ADD COLUMN IF NOT EXISTS review_request_enabled boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS review_links jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS review_request_message text;

COMMENT ON COLUMN public.company_profiles.review_request_enabled IS 'When true, a review CTA is added to invoice/payment emails.';
COMMENT ON COLUMN public.company_profiles.review_links IS 'Array of {url,label} review links shown in invoice/payment emails.';

-- Idempotency marker so the payment-received / review email is sent at most
-- once per invoice.
ALTER TABLE public.quotes
  ADD COLUMN IF NOT EXISTS payment_thankyou_sent_at timestamptz;
