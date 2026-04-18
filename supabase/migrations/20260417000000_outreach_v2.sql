-- Outreach v2: email template library, scheduling, clones, engagement scoring
-- Adds infrastructure to ship best-in-class college/apprentice outreach

-- ═══════════════════════════════════════════════════════════════
-- 1. Email template library
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS outreach_email_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  category text NOT NULL,
  -- category: college, tutor, apprentice, employer, follow_up, general
  subject text NOT NULL,
  preheader text,
  html_body text NOT NULL,
  merge_tags text[] DEFAULT '{}',
  description text,
  thumbnail_emoji text,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 100,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_outreach_templates_category
  ON outreach_email_templates(category) WHERE is_active = true;

ALTER TABLE outreach_email_templates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "outreach_templates_admin_all" ON outreach_email_templates;
CREATE POLICY "outreach_templates_admin_all" ON outreach_email_templates
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND admin_role IS NOT NULL))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND admin_role IS NOT NULL));

-- Updated_at trigger
CREATE OR REPLACE FUNCTION touch_outreach_email_templates_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;
DROP TRIGGER IF EXISTS trg_outreach_templates_touch ON outreach_email_templates;
CREATE TRIGGER trg_outreach_templates_touch
  BEFORE UPDATE ON outreach_email_templates
  FOR EACH ROW EXECUTE FUNCTION touch_outreach_email_templates_updated_at();

-- ═══════════════════════════════════════════════════════════════
-- 2. Add scheduling, cloning, preheader, reply_to to campaigns
-- ═══════════════════════════════════════════════════════════════
ALTER TABLE outreach_campaigns
  ADD COLUMN IF NOT EXISTS scheduled_at timestamptz,
  ADD COLUMN IF NOT EXISTS cloned_from uuid REFERENCES outreach_campaigns(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS template_slug text,
  ADD COLUMN IF NOT EXISTS reply_to text,
  ADD COLUMN IF NOT EXISTS preheader text,
  ADD COLUMN IF NOT EXISTS notes text;

CREATE INDEX IF NOT EXISTS idx_outreach_campaigns_scheduled
  ON outreach_campaigns(scheduled_at)
  WHERE scheduled_at IS NOT NULL AND status IN ('scheduled', 'draft');

-- ═══════════════════════════════════════════════════════════════
-- 3. Engagement scoring on contacts
-- ═══════════════════════════════════════════════════════════════
ALTER TABLE outreach_contacts
  ADD COLUMN IF NOT EXISTS engagement_score integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_opened_at timestamptz,
  ADD COLUMN IF NOT EXISTS last_clicked_at timestamptz,
  ADD COLUMN IF NOT EXISTS total_opens integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS total_clicks integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS total_sends integer DEFAULT 0;

CREATE INDEX IF NOT EXISTS idx_outreach_contacts_engagement
  ON outreach_contacts(engagement_score DESC);

-- ═══════════════════════════════════════════════════════════════
-- 4. Counter-increment RPC (used by edge function fallback path)
-- ═══════════════════════════════════════════════════════════════
CREATE OR REPLACE FUNCTION increment_outreach_counters(
  p_campaign_id uuid,
  p_sent integer,
  p_failed integer
) RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  UPDATE outreach_campaigns
  SET
    sent_count = COALESCE(sent_count, 0) + COALESCE(p_sent, 0),
    failed_count = COALESCE(failed_count, 0) + COALESCE(p_failed, 0)
  WHERE id = p_campaign_id;
END;
$$;

-- ═══════════════════════════════════════════════════════════════
-- 5. Recompute engagement score helper
-- ═══════════════════════════════════════════════════════════════
CREATE OR REPLACE FUNCTION recompute_contact_engagement(p_contact_id uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  v_opens integer;
  v_clicks integer;
  v_sends integer;
  v_last_open timestamptz;
  v_last_click timestamptz;
BEGIN
  SELECT
    COUNT(*) FILTER (WHERE status IN ('opened', 'clicked')),
    COUNT(*) FILTER (WHERE status = 'clicked'),
    COUNT(*) FILTER (WHERE status IN ('sent', 'delivered', 'opened', 'clicked')),
    MAX(opened_at),
    MAX(clicked_at)
  INTO v_opens, v_clicks, v_sends, v_last_open, v_last_click
  FROM outreach_campaign_sends
  WHERE contact_id = p_contact_id;

  UPDATE outreach_contacts
  SET
    total_opens = COALESCE(v_opens, 0),
    total_clicks = COALESCE(v_clicks, 0),
    total_sends = COALESCE(v_sends, 0),
    last_opened_at = v_last_open,
    last_clicked_at = v_last_click,
    engagement_score = (COALESCE(v_opens, 0) * 1) + (COALESCE(v_clicks, 0) * 3)
  WHERE id = p_contact_id;
END;
$$;
