-- ============================================================================
-- 20260524_invoice_payment_prompt_tracking
--
-- Tracks when we last sent an in-app push to the ELECTRICIAN nudging them
-- to mark an invoice as paid (or send a client chase). Distinct from
-- last_reminder_sent_at which tracks the email reminder sent to the CLIENT.
--
-- Consumed by:
--   - supabase/functions/invoice-payment-prompts (cron, every 6h)
--     finds quotes with invoice_status IN ('sent','overdue') where the
--     invoice_sent_at is 7+ days ago AND last_payment_prompt_pushed_at is
--     null OR 7+ days ago. Sends ONE aggregated push per electrician.
-- ============================================================================

alter table public.quotes
  add column if not exists last_payment_prompt_pushed_at timestamptz;

comment on column public.quotes.last_payment_prompt_pushed_at is
  'When the electrician was last pushed a "did this invoice get paid?" prompt. Different from last_reminder_sent_at (which is the chase email to the client).';

create index if not exists quotes_invoice_payment_prompt_idx
  on public.quotes(invoice_status, invoice_sent_at, last_payment_prompt_pushed_at)
  where invoice_status in ('sent', 'overdue');
