-- Two defects in this morning's churn instrumentation, found on review.
--
-- 1. A lapsed trial and a departing paying customer were being recorded as the
--    same event. They are not remotely the same thing: ~53 trials convert in any
--    given week, and letting those land in the same bucket as real churn would
--    corrupt every number built on the new table from day one.
--
-- 2. `reconcile_cancel_survey_outcomes` marked PAUSED customers as cancelled.
--    Both pause paths (`apply-retention-offer` and `pause-request`) set
--    `profiles.subscribed = false` and leave `subscription_end` where it was, and
--    `profiles` has no pause column at all — so a paused customer is
--    indistinguishable from a cancelled one by the test that function used. A
--    pause is a SAVE. Recording it as a loss would have understated the one
--    intervention we are trying to measure. Nothing has been mis-marked yet
--    (the first pause links only went out yesterday and none is applied), but
--    the job runs nightly, so it would have bitten the first customer to use one.

-- ── 1. Trial state on the cancellation record ────────────────────────────
alter table public.subscription_cancellations
  add column if not exists trial_end timestamptz,
  add column if not exists died_in_trial boolean,
  add column if not exists started_at timestamptz,
  add column if not exists had_discount boolean;

comment on column public.subscription_cancellations.died_in_trial is
  'True when the subscription ended before its trial was up — a trial that never converted, not a paying customer leaving. Derived from trial_end vs canceled_at, because Stripe overwrites status with "canceled" on deletion and the prior status is lost.';

comment on column public.subscription_cancellations.had_discount is
  'True when a coupon was live on the subscription when it ended — i.e. a retention discount was already applied and did not hold. Directly relevant to any save-rate measurement.';

-- ── 2. A pause-safe, cancellation-aware reconciliation ───────────────────
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
  -- Cancelled, on either of two kinds of evidence:
  --   * positive — Stripe told us the subscription ended after they filled the
  --     survey in. This is now the preferred signal and needs no inference.
  --   * inferred — no live subscription and the period has run out, AND they
  --     are not sitting in a pause.
  with done as (
    update cancel_survey_responses c
       set outcome = 'cancelled',
           outcome_at = now(),
           outcome_source = 'reconciled'
      from profiles p
     where p.id = c.user_id
       and c.outcome = 'pending'
       -- Never reconcile a paused customer into a loss. A pause leaves
       -- profiles.subscribed = false with a stale subscription_end, which looks
       -- exactly like a cancellation from here.
       and not exists (
         select 1 from pause_requests pr
         where pr.user_id = c.user_id
           and pr.status = 'applied'
           and (pr.resumes_at is null or pr.resumes_at > now())
       )
       and (
         exists (
           select 1 from subscription_cancellations sc
           where sc.user_id = c.user_id
             and sc.created_at >= c.created_at
         )
         or (
           not coalesce(p.subscribed, false)
           and not coalesce(p.is_trial, false)
           and p.subscription_end is not null
           and p.subscription_end < now()
         )
       )
    returning 1
  )
  select count(*) into v_cancelled from done;

  -- Stayed: still paying 35 days after telling us they wanted out (longer than
  -- any monthly period, so at least one renewal has been taken), and Stripe has
  -- not recorded the subscription ending since. That last clause is what stops a
  -- customer who left and later came back being counted as a save — they are a
  -- win-back, which is a different thing entirely.
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
       and not exists (
         select 1 from subscription_cancellations sc
         where sc.user_id = c.user_id
           and sc.created_at >= c.created_at
       )
    returning 1
  )
  select count(*) into v_stayed from done;

  return query select v_cancelled, v_stayed;
end;
$$;

revoke all on function public.reconcile_cancel_survey_outcomes(integer) from anon, authenticated;
