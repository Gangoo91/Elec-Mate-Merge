-- Price list items: user-defined job/labour rates for the rate card
-- Separate from materials_lists (which tracks material costs)
-- Used in Quote Builder via "My Rate Card" picker

CREATE TABLE IF NOT EXISTS public.price_list_items (
  id          uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid          NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name        text          NOT NULL,
  description text,
  unit_price  numeric(10,2) NOT NULL CHECK (unit_price >= 0),
  unit        text          NOT NULL DEFAULT 'each',
  category    text          NOT NULL DEFAULT 'labour',
  sort_order  integer       NOT NULL DEFAULT 0,
  created_at  timestamptz   NOT NULL DEFAULT now(),
  updated_at  timestamptz   NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_price_list_items_user_id
  ON public.price_list_items (user_id);

ALTER TABLE public.price_list_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own price list items"
  ON public.price_list_items FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own price list items"
  ON public.price_list_items FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own price list items"
  ON public.price_list_items FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own price list items"
  ON public.price_list_items FOR DELETE
  USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.update_price_list_items_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_price_list_items_updated_at
  BEFORE UPDATE ON public.price_list_items
  FOR EACH ROW EXECUTE FUNCTION public.update_price_list_items_updated_at();
