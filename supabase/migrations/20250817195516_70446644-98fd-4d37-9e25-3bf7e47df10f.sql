
-- 1) Create industry_news table for automatic feeds
CREATE TABLE public.industry_news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  is_active boolean NOT NULL DEFAULT true,
  view_count integer DEFAULT 0,
  average_rating numeric DEFAULT 0,

  title text NOT NULL,
  summary text,
  content text,

  category text NOT NULL DEFAULT 'general',
  priority text DEFAULT 'medium',
  tags text[],

  -- Sources and dedupe
  source text NOT NULL,              -- e.g., 'HSE', 'IET', 'GOV.UK'
  regulatory_body text,              -- optional alias used by some scrapers
  source_url text,
  external_id text NOT NULL,         -- stable id from the feed for deduplication

  date_published timestamptz NOT NULL DEFAULT now()
);

-- Basic RLS to allow public viewing of active news only
ALTER TABLE public.industry_news ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active industry news"
  ON public.industry_news
  FOR SELECT
  USING (is_active = true);

-- Dedupe and query performance
CREATE UNIQUE INDEX industry_news_unique_source_external_id
  ON public.industry_news (source, external_id);

CREATE INDEX idx_industry_news_date_published
  ON public.industry_news (date_published DESC);

CREATE INDEX idx_industry_news_category
  ON public.industry_news (category);

CREATE INDEX idx_industry_news_source
  ON public.industry_news (source);

-- Keep updated_at fresh
CREATE TRIGGER update_industry_news_updated_at
  BEFORE UPDATE ON public.industry_news
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();


-- 2) Enhance major_projects for linking/apply
ALTER TABLE public.major_projects
  ADD COLUMN IF NOT EXISTS source_url text,
  ADD COLUMN IF NOT EXISTS external_id text;

-- Deduplicate external sources for projects (optional value)
CREATE UNIQUE INDEX IF NOT EXISTS major_projects_external_id_unique
  ON public.major_projects (external_id)
  WHERE external_id IS NOT NULL;

-- Keep updated_at fresh on updates as well
CREATE TRIGGER update_major_projects_updated_at
  BEFORE UPDATE ON public.major_projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
