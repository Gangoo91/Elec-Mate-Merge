-- ============================================================
-- College Resource Analytics
-- ============================================================
-- ELE-905 (B10). Adds a per-event view log and a tutor-settable
-- "gold standard" flag, plus an RPC that atomically records a
-- view and increments the counter.
--
-- Assumes a college_resources table already exists with columns
-- `id`, `college_id`, `views_count`, `downloads_count`.
-- ============================================================

-- 1. Per-event log of views and downloads
CREATE TABLE IF NOT EXISTS public.college_resource_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_id UUID NOT NULL,
  college_id UUID NOT NULL REFERENCES public.colleges(id) ON DELETE CASCADE,
  user_id UUID,
  user_role TEXT,                      -- apprentice / tutor / iqa / other
  event_kind TEXT NOT NULL CHECK (event_kind IN ('view', 'download', 'open_link')),
  context TEXT,                        -- e.g. 'ac_page', 'library', 'lesson_plan'
  ac_id UUID,                          -- optional AC linkage
  duration_seconds INTEGER,            -- optional engagement metric
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_resource_views_resource ON public.college_resource_views(resource_id);
CREATE INDEX IF NOT EXISTS idx_resource_views_college ON public.college_resource_views(college_id);
CREATE INDEX IF NOT EXISTS idx_resource_views_kind ON public.college_resource_views(event_kind);
CREATE INDEX IF NOT EXISTS idx_resource_views_created_at ON public.college_resource_views(created_at DESC);

ALTER TABLE public.college_resource_views ENABLE ROW LEVEL SECURITY;

-- Anyone in the college can read (analytics) and insert their own events
CREATE POLICY "resource_views_select" ON public.college_resource_views
  FOR SELECT USING (_ch_same_college(college_id));

CREATE POLICY "resource_views_insert" ON public.college_resource_views
  FOR INSERT WITH CHECK (
    _ch_same_college(college_id)
    AND (user_id = auth.uid() OR user_id IS NULL)
  );

-- 2. Gold-standard flag on the resource itself.
-- Column is added defensively in case the table column doesn't exist yet.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'college_resources'
  ) THEN
    BEGIN
      ALTER TABLE public.college_resources
        ADD COLUMN IF NOT EXISTS gold_standard BOOLEAN NOT NULL DEFAULT false;
      ALTER TABLE public.college_resources
        ADD COLUMN IF NOT EXISTS gold_standard_set_by UUID;
      ALTER TABLE public.college_resources
        ADD COLUMN IF NOT EXISTS gold_standard_set_at TIMESTAMPTZ;
      CREATE INDEX IF NOT EXISTS idx_college_resources_gold ON public.college_resources(gold_standard) WHERE gold_standard = true;
    EXCEPTION WHEN OTHERS THEN
      -- Table exists but has a column-name conflict; skip silently
      NULL;
    END;
  END IF;
END $$;

-- 3. RPC that records an event and atomically bumps the counter on the
-- resource row in the same transaction.
CREATE OR REPLACE FUNCTION public.record_resource_event(
  p_resource_id UUID,
  p_event_kind TEXT,
  p_context TEXT DEFAULT NULL,
  p_ac_id UUID DEFAULT NULL,
  p_duration_seconds INTEGER DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID := auth.uid();
  v_college_id UUID;
  v_event_id UUID;
  v_role TEXT;
BEGIN
  IF p_event_kind NOT IN ('view', 'download', 'open_link') THEN
    RAISE EXCEPTION 'invalid event_kind: %', p_event_kind;
  END IF;

  -- Resolve the resource's college_id (and skip if the resource is gone)
  SELECT college_id INTO v_college_id
  FROM public.college_resources
  WHERE id = p_resource_id;

  IF v_college_id IS NULL THEN
    RAISE EXCEPTION 'resource not found';
  END IF;

  -- Resolve the calling user's role on their profile
  SELECT college_role INTO v_role
  FROM public.profiles
  WHERE id = v_user_id;

  INSERT INTO public.college_resource_views (
    resource_id,
    college_id,
    user_id,
    user_role,
    event_kind,
    context,
    ac_id,
    duration_seconds
  )
  VALUES (
    p_resource_id,
    v_college_id,
    v_user_id,
    v_role,
    p_event_kind,
    p_context,
    p_ac_id,
    p_duration_seconds
  )
  RETURNING id INTO v_event_id;

  -- Bump the cached counters on the resource row
  IF p_event_kind = 'download' THEN
    UPDATE public.college_resources
      SET downloads_count = COALESCE(downloads_count, 0) + 1
      WHERE id = p_resource_id;
  ELSE
    UPDATE public.college_resources
      SET views_count = COALESCE(views_count, 0) + 1
      WHERE id = p_resource_id;
  END IF;

  RETURN v_event_id;
END;
$$;

COMMENT ON FUNCTION public.record_resource_event IS
  'Records a view/download/link-open event AND atomically bumps the counter cache on college_resources. Honour: callers should treat counts as read-only.';

-- 4. RPC to toggle the gold-standard flag (tutor / HoD only)
CREATE OR REPLACE FUNCTION public.set_resource_gold_standard(
  p_resource_id UUID,
  p_gold_standard BOOLEAN
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID := auth.uid();
  v_role TEXT;
  v_college_id UUID;
BEGIN
  SELECT college_role INTO v_role FROM public.profiles WHERE id = v_user_id;
  IF v_role NOT IN ('tutor', 'admin', 'head_of_department', 'iqa') THEN
    RAISE EXCEPTION 'only college staff can set gold standard';
  END IF;
  SELECT college_id INTO v_college_id FROM public.college_resources WHERE id = p_resource_id;
  IF v_college_id IS NULL THEN
    RAISE EXCEPTION 'resource not found';
  END IF;
  UPDATE public.college_resources
    SET gold_standard = p_gold_standard,
        gold_standard_set_by = CASE WHEN p_gold_standard THEN v_user_id ELSE NULL END,
        gold_standard_set_at = CASE WHEN p_gold_standard THEN now() ELSE NULL END
    WHERE id = p_resource_id;
END;
$$;
