-- Churn instrumentation: record why every Stripe subscription actually ended,
-- and stop counting "undecided" as "saved".
--
-- Why. On 27 Sep 2026 we could account for 176 of the 305 subscriptions that
-- ended since the cancel flow went live on 26 May. The other 129 — 121 of them
-- on Stripe — left no survey row and no `billing_events` row, because
-- `billing_events` only ever carries store/RevenueCat traffic. For 41% of our
-- churn we could not say whether the customer chose to go or a card simply
-- bounced, which are opposite problems with opposite fixes.
--
-- Stripe has been telling us all along. `customer.subscription.deleted` carries
-- `cancellation_details.reason` — `cancellation_requested` when a human asked,
-- `payment_failed` when dunning ran out — plus `feedback` and a free-text
-- `comment` when they cancel through the Stripe portal. A live subscription read
-- today carried `comment: "Not what I was looking for"`. The webhook handled the
-- event and discarded every word of it.
--
-- Nothing here is customer-facing and nothing here changes a decision. It exists
-- so the next decision is made on evidence: a recommendation was made and
-- withdrawn today because the only save-rate numbers available compared
-- populations rather than treatments.

-- ─────────────────────────────────────────────────────────────────────────
-- 1. Every ended Stripe subscription, in Stripe's own words.
--
-- Deliberately NOT folded into `billing_events`: that table is store-shaped
-- (`store`, `product_id`, `period_type`) and its readers — `weekly-churn-digest`
-- and `useStorePriceMix` — assume store semantics. Writing Stripe rows into it
-- would silently move numbers that are already in front of people.
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public.subscription_cancellations (
  id uuid primary key default gen_random_uuid(),
  -- `set null`, not cascade: churn history has to outlive the account, or
  -- deleting a user quietly rewrites last quarter's churn.
  user_id uuid references auth.users(id) on delete set null,
  stripe_customer_id text,
  -- One row per subscription. Stripe retries webhooks, so the insert is
  -- `on conflict do nothing` against this.
  subscription_id text unique,
  source text not null default 'stripe',

  -- Stripe's own fields, stored unmapped so they can never drift from source.
  stripe_reason text,   -- cancellation_details.reason
  feedback text,        -- cancellation_details.feedback (Stripe's enum)
  comment text,         -- free text typed into the Stripe portal

  -- The one question the 121 invisible leavers could not answer: did they
  -- choose this? null when Stripe says nothing, which is itself a finding.
  voluntary boolean,

  tier text,
  price_id text,
  amount_pence integer,
  currency text,

  cancel_at_period_end boolean,
  canceled_at timestamptz,
  period_end timestamptz,

  detail jsonb,
  created_at timestamptz not null default now()
);

create index if not exists subscription_cancellations_user_idx
  on public.subscription_cancellations(user_id);
create index if not exists subscription_cancellations_created_idx
  on public.subscription_cancellations(created_at desc);
create index if not exists subscription_cancellations_voluntary_idx
  on public.subscription_cancellations(voluntary);

alter table public.subscription_cancellations enable row level security;
-- No policies on purpose: the webhook writes as the service role, and a
-- customer has no business reading anyone's cancellation record, their own
-- included.
revoke all on table public.subscription_cancellations from anon, authenticated;

-- ─────────────────────────────────────────────────────────────────────────
-- 2. Tell an observed outcome apart from an inferred one.
--
-- `cancel_survey_responses.outcome` starts at 'pending' and only moves when the
-- customer clicks something. Close the dialog instead and it stays 'pending'
-- forever: 61 people sat there on 27 Sep, and 45 of them have since gone.
--
-- Reconciling those against reality is right, but writing 'cancelled' over them
-- would make an inference indistinguishable from a click — and the save rates
-- we are about to start trusting are computed from exactly this column.
-- ─────────────────────────────────────────────────────────────────────────
alter table public.cancel_survey_responses
  add column if not exists outcome_source text not null default 'observed';

comment on column public.cancel_survey_responses.outcome_source is
  'observed = the customer clicked it; reconciled = inferred later from whether the subscription survived. Never mix the two in a save rate.';

-- ─────────────────────────────────────────────────────────────────────────
-- 3. Resolve stale 'pending' rows from what actually happened.
--
-- The thresholds are the conservative ones:
--   cancelled — the subscription has genuinely ended. Not in doubt.
--   stayed    — still subscribed 35 days after they told us they wanted out.
--               35 rather than 7 because a monthly subscriber who asks to
--               cancel on day 5 has not renewed anything by day 12; surviving
--               longer than any monthly period is the earliest point at which
--               "they stayed" is a fact rather than a hope.
-- Anything else is left pending, because it genuinely is.
-- ─────────────────────────────────────────────────────────────────────────
create or replace function public.reconcile_cancel_survey_outcomes(
  p_stayed_after_days integer default 35
)
returns table(resolved_cancelled integer, resolved_stayed integer)
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_cancelled integer := 0;
  v_stayed integer := 0;
begin
  with done as (
    update cancel_survey_responses c
       set outcome = 'cancelled',
           outcome_at = now(),
           outcome_source = 'reconciled'
      from profiles p
     where p.id = c.user_id
       and c.outcome = 'pending'
       and not coalesce(p.subscribed, false)
       and not coalesce(p.is_trial, false)
       and p.subscription_end is not null
       and p.subscription_end < now()
    returning 1
  )
  select count(*) into v_cancelled from done;

  with done as (
    update cancel_survey_responses c
       set outcome = 'stayed',
           outcome_at = now(),
           outcome_source = 'reconciled'
      from profiles p
     where p.id = c.user_id
       and c.outcome = 'pending'
       and coalesce(p.subscribed, false)
       and c.created_at < now() - make_interval(days => p_stayed_after_days)
    returning 1
  )
  select count(*) into v_stayed from done;

  return query select v_cancelled, v_stayed;
end;
$$;

revoke all on function public.reconcile_cancel_survey_outcomes(integer) from anon, authenticated;

-- Nightly, so 'pending' means "we genuinely do not know yet" rather than
-- "nobody ever came back to look".
select cron.unschedule('reconcile-cancel-outcomes-daily')
where exists (select 1 from cron.job where jobname = 'reconcile-cancel-outcomes-daily');

select cron.schedule(
  'reconcile-cancel-outcomes-daily',
  '40 3 * * *',
  $cron$ select public.reconcile_cancel_survey_outcomes(); $cron$
);
