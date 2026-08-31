-- Google Play surfaces its OWN cancellation survey when a user cancels from
-- Play Store → Subscriptions (the door most store churn actually leaves by).
-- The answer lives on the subscription resource as
-- canceledStateContext.userInitiatedCancellation.cancelSurveyResult, reachable
-- only via the Play Developer API and only with the PURCHASE TOKEN — which
-- RevenueCat never gives us (it exposes the GPA order id instead). We collect
-- the token from a second Pub/Sub subscription on the existing RTDN topic.
--
-- `reason` is normalised onto the same vocabulary as cancel_survey_responses
-- so the weekly digest can merge web and store leavers into one list.
-- Deliberately NO check constraint on `reason`: cancel_survey_responses has
-- none either, and a stale CHECK silently fails inserts (cf. the store_code
-- reward bug) — Google can add survey options without warning.

create table if not exists public.store_cancel_reasons (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid references auth.users (id) on delete set null,
  store             text not null default 'PLAY_STORE',
  purchase_token    text not null,
  order_id          text,
  product_id        text,

  -- normalised to the web vocabulary: not_using | bug | too_expensive |
  -- switching | other
  reason            text not null,
  -- raw Google enum, kept so a remapping can be replayed without refetching
  google_reason     text,
  -- Google only collects free text when the user picks "Other"
  reason_detail     text,

  -- how we tied the token to a user: exact (order id verified against
  -- RevenueCat) | ambiguous (>1 candidate) | unmatched (no candidate)
  match_method      text not null default 'exact',
  raw               jsonb,

  cancelled_at      timestamptz,
  created_at        timestamptz not null default now()
);

-- One survey answer per subscription token; a re-cancel on the same token
-- overwrites rather than duplicating.
create unique index if not exists store_cancel_reasons_token_key
  on public.store_cancel_reasons (purchase_token);

create index if not exists store_cancel_reasons_user_idx
  on public.store_cancel_reasons (user_id);

create index if not exists store_cancel_reasons_created_idx
  on public.store_cancel_reasons (created_at desc);

-- Service-role only: written by the RTDN handler, read by the churn digest.
-- Same posture as referral_store_codes (RLS on, deliberately no policies).
alter table public.store_cancel_reasons enable row level security;

comment on table public.store_cancel_reasons is
  'Cancellation survey answers collected by the STORE (Google Play today, Apple once the Retention Messaging API is approved). Populated by play-rtdn-cancel-survey.';
