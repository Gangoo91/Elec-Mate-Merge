-- Site Diary Entries table for apprentice daily logging
CREATE TABLE IF NOT EXISTS public.site_diary_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date date NOT NULL,
  site_name text NOT NULL,
  supervisor text,
  tasks_completed text[] NOT NULL DEFAULT '{}',
  skills_practised text[] NOT NULL DEFAULT '{}',
  what_i_learned text,
  issues_or_questions text,
  mood_rating smallint CHECK (mood_rating >= 1 AND mood_rating <= 5),
  photos text[] DEFAULT '{}',
  linked_portfolio_id uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_site_diary_entries_user_id ON public.site_diary_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_site_diary_entries_date ON public.site_diary_entries(user_id, date DESC);

-- Enable RLS
ALTER TABLE public.site_diary_entries ENABLE ROW LEVEL SECURITY;

-- RLS Policies: users can only CRUD their own entries
CREATE POLICY "Users can view own diary entries"
  ON public.site_diary_entries FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own diary entries"
  ON public.site_diary_entries FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own diary entries"
  ON public.site_diary_entries FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own diary entries"
  ON public.site_diary_entries FOR DELETE
  USING (auth.uid() = user_id);

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION public.update_site_diary_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER site_diary_entries_updated_at
  BEFORE UPDATE ON public.site_diary_entries
  FOR EACH ROW
  EXECUTE FUNCTION public.update_site_diary_updated_at();
