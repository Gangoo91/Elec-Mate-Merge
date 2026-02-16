-- Create materials_lists table for saving marketplace products into user lists
CREATE TABLE IF NOT EXISTS public.materials_lists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Index for fast user lookups
CREATE INDEX IF NOT EXISTS idx_materials_lists_user_id ON public.materials_lists(user_id);

-- RLS: users can only access their own lists
ALTER TABLE public.materials_lists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own lists"
  ON public.materials_lists FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own lists"
  ON public.materials_lists FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own lists"
  ON public.materials_lists FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own lists"
  ON public.materials_lists FOR DELETE
  USING (auth.uid() = user_id);

-- Auto-update updated_at on modification
CREATE OR REPLACE FUNCTION public.update_materials_lists_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_materials_lists_updated_at
  BEFORE UPDATE ON public.materials_lists
  FOR EACH ROW
  EXECUTE FUNCTION public.update_materials_lists_updated_at();
