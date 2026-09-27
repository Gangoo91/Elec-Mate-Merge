-- One definition of churn, everywhere.
--
-- Andrew, 27 Sep 2026: "a churner is only someone who's made their first
-- payment, ie monthly payment, not the £0.00 invoice. we need to get this right
-- at all levels. as thats true churn, the rest is conversion."
--
-- The backfill proved the point: of 486 ended Stripe subscriptions, 242 had
-- never paid us anything. Counting those as churn overstates it roughly twofold
-- and, worse, points the work at the wrong problem — a trial that lapses is a
-- CONVERSION failure, and no amount of retention effort fixes it.
--
-- `died_in_trial` on this table was only ever a proxy: it compares trial_end to
-- canceled_at. That is not the same question as "did money ever move", and it
-- gets two cases wrong — a subscription that converted and then failed its very
-- first real invoice, and one carrying a 100%-off coupon that billed £0.00 and
-- so never produced a payment at all.
--
-- Ground truth is a paid Stripe invoice with amount_paid > 0. That is exactly
-- what `admin-stripe-stats` already uses to build `paidSubscriptionIds`, and
-- therefore what `admin_metric_daily.stripe_churned_paid` has always meant. This
-- brings the cancellations table onto the same footing and then names the
-- definition once, in a view, so it cannot quietly drift apart again.

alter table public.subscription_cancellations
  add column if not exists ever_paid boolean,
  add column if not exists first_paid_at timestamptz;

comment on column public.subscription_cancellations.ever_paid is
  'Ground truth: did this subscription ever produce a Stripe invoice with amount_paid > 0. TRUE = a real churner. FALSE = a failed conversion, never a customer. NULL = not yet established. This, not died_in_trial, is the churn test.';

comment on column public.subscription_cancellations.first_paid_at is
  'When the first real money arrived. Tenure as a paying customer = canceled_at - first_paid_at.';

comment on column public.subscription_cancellations.died_in_trial is
  'Secondary colour only — derived from trial_end vs canceled_at. Use ever_paid to decide whether something is churn; a converted subscription can still fail its first real invoice, and a 100%-off coupon bills £0.00 and never pays.';

-- ── The definition, in one place ─────────────────────────────────────────
-- Anything reporting churn reads this rather than re-deciding what churn means.
create or replace view public.v_subscription_endings as
select
  c.*,
  case
    when c.ever_paid is true then 'churn'          -- paid us, then left
    when c.ever_paid is false then 'failed_conversion' -- never paid a penny
    else 'unknown'                                  -- not yet established
  end as ending_kind,
  -- Only meaningful for real churn; null for a trial that never converted.
  case
    when c.ever_paid is true and c.first_paid_at is not null and c.canceled_at is not null
      then greatest(0, extract(epoch from (c.canceled_at - c.first_paid_at)) / 86400.0)
  end as paid_days,
  case
    when c.voluntary is false then 'billing_failure'  -- card declined or disputed
    when c.voluntary is true then 'chose_to_leave'
    else 'reason_unknown'
  end as ending_cause
from public.subscription_cancellations c;

comment on view public.v_subscription_endings is
  'Canonical read surface for why subscriptions end. ending_kind splits true churn (ever_paid) from failed conversion; ending_cause splits a decision from a billing failure. Report from here, never by re-deriving churn from trial dates.';

revoke all on public.v_subscription_endings from anon, authenticated;
