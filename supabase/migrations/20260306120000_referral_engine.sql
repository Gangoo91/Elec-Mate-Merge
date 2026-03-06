-- ============================================================
-- Referral Engine — "Free Month, Both Ways"
-- 4 new tables + profile columns + auto-generation trigger + backfill + RPC + RLS
-- ============================================================

-- 1. referral_codes — one per user, auto-generated on signup
CREATE TABLE IF NOT EXISTS public.referral_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  code TEXT NOT NULL UNIQUE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT referral_codes_user_unique UNIQUE (user_id)
);

CREATE INDEX IF NOT EXISTS idx_referral_codes_code ON public.referral_codes(code);
CREATE INDEX IF NOT EXISTS idx_referral_codes_user ON public.referral_codes(user_id);

-- 2. referrals — tracks who referred whom
CREATE TABLE IF NOT EXISTS public.referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  referred_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  referred_email TEXT,
  referral_code TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'signed_up', 'subscribed', 'rewarded', 'expired')),
  source TEXT DEFAULT 'link'
    CHECK (source IN ('whatsapp', 'link', 'qr', 'native_share', 'email')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_referrals_referrer ON public.referrals(referrer_id);
CREATE INDEX IF NOT EXISTS idx_referrals_referred ON public.referrals(referred_id);
CREATE INDEX IF NOT EXISTS idx_referrals_code ON public.referrals(referral_code);
CREATE INDEX IF NOT EXISTS idx_referrals_status ON public.referrals(status);

-- 3. referral_rewards — credit/discount tracking
CREATE TABLE IF NOT EXISTS public.referral_rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  referral_id UUID NOT NULL REFERENCES public.referrals(id) ON DELETE CASCADE,
  reward_type TEXT NOT NULL DEFAULT 'credit'
    CHECK (reward_type IN ('credit', 'coupon', 'tier_upgrade', 'permanent_discount')),
  amount_pence INTEGER NOT NULL DEFAULT 0,
  stripe_credit_note_id TEXT,
  stripe_coupon_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'applied', 'failed', 'expired')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  applied_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_referral_rewards_user ON public.referral_rewards(user_id);
CREATE INDEX IF NOT EXISTS idx_referral_rewards_referral ON public.referral_rewards(referral_id);

-- 4. referral_share_events — analytics
CREATE TABLE IF NOT EXISTS public.referral_share_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  channel TEXT NOT NULL
    CHECK (channel IN ('whatsapp', 'copy_link', 'qr', 'native_share', 'email')),
  context TEXT,
  referral_code TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_referral_share_events_user ON public.referral_share_events(user_id);
CREATE INDEX IF NOT EXISTS idx_referral_share_events_channel ON public.referral_share_events(channel);

-- 5. Profile additions
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS referred_by UUID REFERENCES auth.users(id),
  ADD COLUMN IF NOT EXISTS referral_code TEXT,
  ADD COLUMN IF NOT EXISTS referral_credits_pence INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS total_referrals INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS successful_referrals INTEGER NOT NULL DEFAULT 0;

-- 6. Auto-generation trigger: on profile insert, generate REF-XXXXXX code
CREATE OR REPLACE FUNCTION public.generate_referral_code()
RETURNS TRIGGER AS $$
DECLARE
  new_code TEXT;
  code_exists BOOLEAN;
BEGIN
  LOOP
    -- Generate REF-XXXXXX (6 alphanumeric uppercase chars)
    new_code := 'REF-' || upper(substr(md5(random()::text || clock_timestamp()::text), 1, 6));

    -- Check uniqueness
    SELECT EXISTS(SELECT 1 FROM public.referral_codes WHERE code = new_code) INTO code_exists;

    IF NOT code_exists THEN
      EXIT;
    END IF;
  END LOOP;

  -- Insert into referral_codes table
  INSERT INTO public.referral_codes (user_id, code)
  VALUES (NEW.id, new_code)
  ON CONFLICT (user_id) DO NOTHING;

  -- Also store on profile for quick access
  UPDATE public.profiles SET referral_code = new_code WHERE id = NEW.id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_generate_referral_code ON public.profiles;
CREATE TRIGGER trg_generate_referral_code
  AFTER INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.generate_referral_code();

-- 7. Backfill existing users (27 users)
DO $$
DECLARE
  rec RECORD;
  new_code TEXT;
  code_exists BOOLEAN;
BEGIN
  FOR rec IN
    SELECT id FROM public.profiles
    WHERE id NOT IN (SELECT user_id FROM public.referral_codes)
  LOOP
    LOOP
      new_code := 'REF-' || upper(substr(md5(random()::text || clock_timestamp()::text), 1, 6));
      SELECT EXISTS(SELECT 1 FROM public.referral_codes WHERE code = new_code) INTO code_exists;
      IF NOT code_exists THEN EXIT; END IF;
    END LOOP;

    INSERT INTO public.referral_codes (user_id, code)
    VALUES (rec.id, new_code)
    ON CONFLICT (user_id) DO NOTHING;

    UPDATE public.profiles SET referral_code = new_code WHERE id = rec.id AND referral_code IS NULL;
  END LOOP;
END;
$$;

-- 8. RPC: get_referral_stats — returns stats JSON for the referral dashboard
CREATE OR REPLACE FUNCTION public.get_referral_stats(p_user_id UUID)
RETURNS JSONB AS $$
DECLARE
  result JSONB;
  v_code TEXT;
  v_total INTEGER;
  v_successful INTEGER;
  v_credits INTEGER;
  v_tier TEXT;
BEGIN
  -- Get user's referral code
  SELECT code INTO v_code FROM public.referral_codes WHERE user_id = p_user_id AND is_active = true LIMIT 1;

  -- Get counts
  SELECT count(*) INTO v_total FROM public.referrals WHERE referrer_id = p_user_id;
  SELECT count(*) INTO v_successful FROM public.referrals WHERE referrer_id = p_user_id AND status IN ('subscribed', 'rewarded');

  -- Get credits earned
  SELECT COALESCE(referral_credits_pence, 0) INTO v_credits FROM public.profiles WHERE id = p_user_id;

  -- Calculate tier
  v_tier := CASE
    WHEN v_successful >= 10 THEN 'platinum'
    WHEN v_successful >= 5 THEN 'gold'
    WHEN v_successful >= 3 THEN 'silver'
    ELSE 'bronze'
  END;

  result := jsonb_build_object(
    'referral_code', v_code,
    'referral_url', 'https://elec-mate.com/auth/signup?ref=' || COALESCE(v_code, ''),
    'total_referrals', v_total,
    'successful_referrals', v_successful,
    'credits_pence', v_credits,
    'credits_formatted', '£' || to_char(v_credits / 100.0, 'FM999,990.00'),
    'tier', v_tier,
    'next_tier', CASE v_tier
      WHEN 'bronze' THEN 'silver'
      WHEN 'silver' THEN 'gold'
      WHEN 'gold' THEN 'platinum'
      ELSE NULL
    END,
    'referrals_to_next_tier', CASE v_tier
      WHEN 'bronze' THEN 3 - v_successful
      WHEN 'silver' THEN 5 - v_successful
      WHEN 'gold' THEN 10 - v_successful
      ELSE 0
    END,
    'recent_referrals', (
      SELECT COALESCE(jsonb_agg(jsonb_build_object(
        'id', r.id,
        'status', r.status,
        'source', r.source,
        'created_at', r.created_at,
        'referred_name', COALESCE(p.full_name, r.referred_email, 'Anonymous')
      ) ORDER BY r.created_at DESC), '[]'::jsonb)
      FROM public.referrals r
      LEFT JOIN public.profiles p ON p.id = r.referred_id
      WHERE r.referrer_id = p_user_id
      LIMIT 20
    )
  );

  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 9. RLS Policies

-- referral_codes
ALTER TABLE public.referral_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own referral code"
  ON public.referral_codes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view any active code for validation"
  ON public.referral_codes FOR SELECT
  USING (is_active = true);

-- referrals
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own referrals as referrer"
  ON public.referrals FOR SELECT
  USING (auth.uid() = referrer_id);

CREATE POLICY "Users can view referrals where they are referred"
  ON public.referrals FOR SELECT
  USING (auth.uid() = referred_id);

CREATE POLICY "Authenticated users can insert referrals"
  ON public.referrals FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- referral_rewards
ALTER TABLE public.referral_rewards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own rewards"
  ON public.referral_rewards FOR SELECT
  USING (auth.uid() = user_id);

-- referral_share_events
ALTER TABLE public.referral_share_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own share events"
  ON public.referral_share_events FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own share events"
  ON public.referral_share_events FOR SELECT
  USING (auth.uid() = user_id);
