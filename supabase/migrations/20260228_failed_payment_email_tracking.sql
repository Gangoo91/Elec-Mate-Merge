-- Migration: Create failed_payment_emails table for dunning email sequence tracking
-- Tracks the 3-email sequence sent when a Stripe subscription payment fails

-- ============================================================================
-- STEP 1: Create the tracking table
-- ============================================================================

create table if not exists public.failed_payment_emails (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  stripe_invoice_id text not null,
  stripe_customer_id text not null,
  stripe_subscription_id text,
  amount_due integer not null default 0,
  hosted_invoice_url text,
  emails_sent integer not null default 0,
  email_1_sent_at timestamptz,
  email_2_sent_at timestamptz,
  email_3_sent_at timestamptz,
  resolved boolean not null default false,
  resolved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================================
-- STEP 2: Create indexes
-- ============================================================================

-- Primary query: find unresolved rows that still need emails
create index if not exists idx_failed_payment_emails_unresolved
  on public.failed_payment_emails (resolved, emails_sent)
  where resolved = false;

-- Lookup by Stripe invoice ID (idempotency checks)
create unique index if not exists idx_failed_payment_emails_invoice
  on public.failed_payment_emails (stripe_invoice_id);

-- Lookup by user
create index if not exists idx_failed_payment_emails_user
  on public.failed_payment_emails (user_id);

-- ============================================================================
-- STEP 3: Auto-update updated_at trigger
-- ============================================================================

create or replace function public.update_failed_payment_emails_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_failed_payment_emails_updated_at
  before update on public.failed_payment_emails
  for each row
  execute function public.update_failed_payment_emails_updated_at();

-- ============================================================================
-- STEP 4: Enable RLS with service role full access
-- ============================================================================

alter table public.failed_payment_emails enable row level security;

-- Service role gets full access (used by edge functions)
create policy "Service role full access on failed_payment_emails"
  on public.failed_payment_emails
  for all
  using (true)
  with check (true);

-- Users can read their own rows
create policy "Users can read own failed_payment_emails"
  on public.failed_payment_emails
  for select
  using (auth.uid() = user_id);

-- ============================================================================
-- STEP 5: Add comments
-- ============================================================================

comment on table public.failed_payment_emails is
'Tracks the 3-email dunning sequence for failed Stripe subscription payments.
Email 1: immediate (day 0), Email 2: 3-day reminder, Email 3: 7-day final notice.
Resolved when invoice.paid fires or subscription is cancelled.';

comment on column public.failed_payment_emails.amount_due is 'Amount in pence (cached from Stripe invoice)';
comment on column public.failed_payment_emails.hosted_invoice_url is 'Stripe-hosted payment page URL (cached for email CTAs)';
comment on column public.failed_payment_emails.emails_sent is 'Progression counter: 0 → 1 → 2 → 3';
