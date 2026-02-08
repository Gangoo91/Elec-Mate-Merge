-- User Video Watches: tracks which videos a user has watched
CREATE TABLE IF NOT EXISTS public.user_video_watches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  video_id text NOT NULL,
  watched_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, video_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_user_video_watches_user_id ON public.user_video_watches(user_id);

-- Enable RLS
ALTER TABLE public.user_video_watches ENABLE ROW LEVEL SECURITY;

-- RLS Policies: users can only manage their own watch records
CREATE POLICY "Users can view own video watches"
  ON public.user_video_watches FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own video watches"
  ON public.user_video_watches FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own video watches"
  ON public.user_video_watches FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own video watches"
  ON public.user_video_watches FOR DELETE
  USING (auth.uid() = user_id);


-- User Video Bookmarks: tracks which videos a user has bookmarked
CREATE TABLE IF NOT EXISTS public.user_video_bookmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  video_id text NOT NULL,
  title text NOT NULL,
  category text NOT NULL,
  bookmarked_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, video_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_user_video_bookmarks_user_id ON public.user_video_bookmarks(user_id);

-- Enable RLS
ALTER TABLE public.user_video_bookmarks ENABLE ROW LEVEL SECURITY;

-- RLS Policies: users can only manage their own bookmarks
CREATE POLICY "Users can view own video bookmarks"
  ON public.user_video_bookmarks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own video bookmarks"
  ON public.user_video_bookmarks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own video bookmarks"
  ON public.user_video_bookmarks FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own video bookmarks"
  ON public.user_video_bookmarks FOR DELETE
  USING (auth.uid() = user_id);
