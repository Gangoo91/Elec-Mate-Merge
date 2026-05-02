-- ELE-955: Schedule on accept
--
-- After a quote is accepted (and deposit paid if required), the client picks
-- a time slot from the sparky's calendar. A 10-minute provisional hold
-- prevents two clients from booking the same slot during the pick → confirm
-- window. On confirm, a `calendar_events` row is created and the quote is
-- linked to it for end-to-end traceability.

-- ── Provisional 10-minute slot holds ─────────────────────────────────
CREATE TABLE IF NOT EXISTS calendar_slot_holds (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  quote_id     UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
  slot_start   TIMESTAMPTZ NOT NULL,
  slot_end     TIMESTAMPTZ NOT NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at   TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '10 minutes'),
  confirmed_at TIMESTAMPTZ,
  released_at  TIMESTAMPTZ,
  CONSTRAINT chk_slot_times CHECK (slot_end > slot_start)
);

CREATE INDEX IF NOT EXISTS idx_slot_holds_user_active
  ON calendar_slot_holds(user_id, slot_start)
  WHERE confirmed_at IS NULL AND released_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_slot_holds_quote
  ON calendar_slot_holds(quote_id);

ALTER TABLE calendar_slot_holds ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Sparkys see own slot holds"
  ON calendar_slot_holds FOR SELECT
  USING (auth.uid() = user_id);

-- Service role inserts/updates via edge functions (no direct client mutations)

-- ── Quote ↔ booking link ─────────────────────────────────────────────
ALTER TABLE quotes
  ADD COLUMN IF NOT EXISTS booked_slot_start TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS booked_slot_end TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS booking_calendar_event_id UUID;

CREATE INDEX IF NOT EXISTS idx_quotes_booked_slot
  ON quotes(user_id, booked_slot_start)
  WHERE booked_slot_start IS NOT NULL;

-- ── Sparky scheduling preferences ────────────────────────────────────
-- Working hours, buffer, daily booking cap, blackout dates. Living on the
-- profiles table keeps it close to existing company info.
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS scheduling_working_hours JSONB
    DEFAULT '{"mon":{"start":"08:00","end":"18:00"},"tue":{"start":"08:00","end":"18:00"},"wed":{"start":"08:00","end":"18:00"},"thu":{"start":"08:00","end":"18:00"},"fri":{"start":"08:00","end":"18:00"},"sat":null,"sun":null}'::jsonb,
  ADD COLUMN IF NOT EXISTS scheduling_buffer_minutes INTEGER DEFAULT 30,
  ADD COLUMN IF NOT EXISTS scheduling_max_bookings_per_day INTEGER DEFAULT 4,
  ADD COLUMN IF NOT EXISTS scheduling_min_notice_hours INTEGER DEFAULT 24,
  ADD COLUMN IF NOT EXISTS scheduling_blackout_dates JSONB DEFAULT '[]'::jsonb;

COMMENT ON COLUMN profiles.scheduling_working_hours IS
  'JSON {dayKey: {start, end} | null}. Null day = closed.';
COMMENT ON COLUMN profiles.scheduling_blackout_dates IS
  'JSON array of {start: ISO date, end: ISO date, reason: text} for holidays/away.';
