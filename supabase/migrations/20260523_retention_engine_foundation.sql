-- ============================================================================
-- 20260523_retention_engine_foundation
--
-- Sprint 1 of the retention/activation system:
--
--   A. Apprentice onboarding fast-path
--      → adds apprentice_course / apprentice_college / apprentice_year
--        to profiles so the SetupWizard can skip business/banking fields
--
--   B. Cancel-prevention flow
--      → cancel_survey_responses records WHY a user clicked cancel and
--        what intervention we offered. Powers the in-app cancel modal.
--
--   C. Win-back automation
--      → winback_queue holds scheduled multi-touch win-back emails
--        for every cancellation. Inserted by stripe-subscription-webhook
--        and drained by the winback-send cron.
-- ============================================================================


-- ─── A. Apprentice onboarding fast-path ────────────────────────────────────
alter table public.profiles
  add column if not exists apprentice_course   text,
  add column if not exists apprentice_college  text,
  add column if not exists apprentice_year     text;

comment on column public.profiles.apprentice_course is
  'Apprentice qualification (Level 2 / Level 3 / AM2 / HNC / NVQ / Other).';
comment on column public.profiles.apprentice_college is
  'College or training provider name (optional, free-text).';
comment on column public.profiles.apprentice_year is
  'Year of apprenticeship (1st / 2nd / 3rd / 4th / post-qualified).';


-- ─── B. Cancel-prevention flow ─────────────────────────────────────────────
create table if not exists public.cancel_survey_responses (
  id                    uuid primary key default gen_random_uuid(),
  user_id               uuid not null references public.profiles(id) on delete cascade,

  reason                text not null,
  --   'too_expensive' | 'not_using' | 'missing_feature'
  -- | 'switching'     | 'bug'       | 'other'

  reason_detail         text,   -- free text the user typed

  offered_intervention  text,
  --   'retention_discount' | 'pause' | 'downgrade'
  -- | 'founder_message'    | 'none'

  outcome               text not null default 'pending',
  --   'stayed' | 'cancelled' | 'paused' | 'downgraded' | 'pending'

  subscription_tier     text,   -- snapshot at cancel time
  subscription_id       text,   -- stripe sub id snapshot

  created_at            timestamptz not null default now(),
  outcome_at            timestamptz
);

create index if not exists cancel_survey_user_idx
  on public.cancel_survey_responses(user_id);
create index if not exists cancel_survey_outcome_idx
  on public.cancel_survey_responses(outcome);
create index if not exists cancel_survey_created_idx
  on public.cancel_survey_responses(created_at desc);

alter table public.cancel_survey_responses enable row level security;

drop policy if exists "users insert own cancel survey"
  on public.cancel_survey_responses;
create policy "users insert own cancel survey"
  on public.cancel_survey_responses for insert
  with check (auth.uid() = user_id);

drop policy if exists "users view own cancel survey"
  on public.cancel_survey_responses;
create policy "users view own cancel survey"
  on public.cancel_survey_responses for select
  using (auth.uid() = user_id);

drop policy if exists "service role full access cancel survey"
  on public.cancel_survey_responses;
create policy "service role full access cancel survey"
  on public.cancel_survey_responses for all
  using (auth.role() = 'service_role');


-- ─── C. Win-back queue ─────────────────────────────────────────────────────
create table if not exists public.winback_queue (
  id                    uuid primary key default gen_random_uuid(),
  user_id               uuid not null references public.profiles(id) on delete cascade,

  email                 text not null,
  full_name             text,
  tier                  text not null,
  -- 'apprentice' | 'electrician' | 'employer' | 'business_ai'

  stripe_customer_id    text,
  was_trial             boolean not null default false,

  cancelled_at          timestamptz not null,

  touch_number          int not null default 1,
  -- 1 = day 1 sincere check-in (no offer)
  -- 2 = day 7 win-back price offer
  -- 3 = day 30 final attempt + recent shipped features

  scheduled_for         timestamptz not null,
  sent_at               timestamptz,

  status                text not null default 'pending',
  -- 'pending' | 'sent' | 'failed' | 'skipped'

  skip_reason           text,
  -- 'resubscribed' | 'unsubscribed' | 'bounced' | 'no_email'

  email_provider_id     text,   -- Resend message id, for audit
  error_message         text,

  created_at            timestamptz not null default now()
);

create index if not exists winback_pending_idx
  on public.winback_queue(scheduled_for)
  where status = 'pending';

create index if not exists winback_user_idx
  on public.winback_queue(user_id);

create index if not exists winback_status_idx
  on public.winback_queue(status);

alter table public.winback_queue enable row level security;

-- No public access. Only service_role / edge functions touch this table.
drop policy if exists "service role full access winback queue"
  on public.winback_queue;
create policy "service role full access winback queue"
  on public.winback_queue for all
  using (auth.role() = 'service_role');
