-- Site Visits: Field capture → quote engine
-- Tables: site_visits, site_visit_rooms, site_visit_items, site_visit_photos,
--         site_visit_prompts, scope_baselines, scope_share_links, pre_start_checklists

-- ============================================================
-- 1. site_visits
-- ============================================================
CREATE TABLE IF NOT EXISTS public.site_visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
  property_address TEXT,
  property_postcode TEXT,
  property_type TEXT CHECK (property_type IN ('residential', 'commercial', 'industrial')),
  access_notes TEXT,
  status TEXT NOT NULL DEFAULT 'in_progress'
    CHECK (status IN ('in_progress', 'completed', 'scope_sent', 'signed')),
  quote_id UUID,
  photo_project_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_site_visits_user_id ON public.site_visits(user_id);
CREATE INDEX idx_site_visits_customer_id ON public.site_visits(customer_id);
CREATE INDEX idx_site_visits_status ON public.site_visits(status);

-- ============================================================
-- 2. site_visit_rooms
-- ============================================================
CREATE TABLE IF NOT EXISTS public.site_visit_rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_visit_id UUID NOT NULL REFERENCES public.site_visits(id) ON DELETE CASCADE,
  room_name TEXT NOT NULL,
  room_type TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_site_visit_rooms_visit ON public.site_visit_rooms(site_visit_id);

-- ============================================================
-- 3. site_visit_items
-- ============================================================
CREATE TABLE IF NOT EXISTS public.site_visit_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID NOT NULL REFERENCES public.site_visit_rooms(id) ON DELETE CASCADE,
  item_type TEXT NOT NULL,
  item_description TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit TEXT NOT NULL DEFAULT 'each',
  notes TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_site_visit_items_room ON public.site_visit_items(room_id);

-- ============================================================
-- 4. site_visit_photos
-- ============================================================
CREATE TABLE IF NOT EXISTS public.site_visit_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_visit_id UUID NOT NULL REFERENCES public.site_visits(id) ON DELETE CASCADE,
  room_id UUID REFERENCES public.site_visit_rooms(id) ON DELETE SET NULL,
  item_id UUID REFERENCES public.site_visit_items(id) ON DELETE SET NULL,
  safety_photo_id UUID,
  photo_url TEXT NOT NULL,
  storage_path TEXT,
  description TEXT,
  photo_phase TEXT NOT NULL DEFAULT 'before'
    CHECK (photo_phase IN ('before', 'after')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_site_visit_photos_visit ON public.site_visit_photos(site_visit_id);
CREATE INDEX idx_site_visit_photos_room ON public.site_visit_photos(room_id);

-- ============================================================
-- 5. site_visit_prompts
-- ============================================================
CREATE TABLE IF NOT EXISTS public.site_visit_prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_visit_id UUID NOT NULL REFERENCES public.site_visits(id) ON DELETE CASCADE,
  room_id UUID REFERENCES public.site_visit_rooms(id) ON DELETE SET NULL,
  prompt_key TEXT NOT NULL,
  prompt_question TEXT NOT NULL,
  response TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_site_visit_prompts_visit ON public.site_visit_prompts(site_visit_id);

-- ============================================================
-- 6. scope_baselines
-- ============================================================
CREATE TABLE IF NOT EXISTS public.scope_baselines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_visit_id UUID NOT NULL REFERENCES public.site_visits(id) ON DELETE CASCADE,
  quote_id UUID,
  baseline_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  locked_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  locked_by UUID NOT NULL REFERENCES auth.users(id)
);

CREATE INDEX idx_scope_baselines_visit ON public.scope_baselines(site_visit_id);

-- ============================================================
-- 7. scope_share_links
-- ============================================================
CREATE TABLE IF NOT EXISTS public.scope_share_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  site_visit_id UUID NOT NULL REFERENCES public.site_visits(id) ON DELETE CASCADE,
  share_token TEXT NOT NULL UNIQUE,
  title TEXT,
  scope_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  assumptions TEXT,
  company_name TEXT,
  requires_signature BOOLEAN NOT NULL DEFAULT true,
  client_name TEXT,
  client_email TEXT,
  signature_data TEXT,
  signed_at TIMESTAMPTZ,
  signer_ip TEXT,
  view_count INTEGER NOT NULL DEFAULT 0,
  last_viewed_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'signed', 'expired', 'revoked')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_scope_share_links_token ON public.scope_share_links(share_token);
CREATE INDEX idx_scope_share_links_user ON public.scope_share_links(user_id);
CREATE INDEX idx_scope_share_links_visit ON public.scope_share_links(site_visit_id);

-- ============================================================
-- 8. pre_start_checklists
-- ============================================================
CREATE TABLE IF NOT EXISTS public.pre_start_checklists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_visit_id UUID NOT NULL REFERENCES public.site_visits(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'in_progress', 'completed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_pre_start_checklists_visit ON public.pre_start_checklists(site_visit_id);

-- ============================================================
-- RLS Policies
-- ============================================================

ALTER TABLE public.site_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_visit_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_visit_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_visit_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_visit_prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scope_baselines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scope_share_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pre_start_checklists ENABLE ROW LEVEL SECURITY;

-- site_visits: user can CRUD own
CREATE POLICY "Users manage own site visits"
  ON public.site_visits FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- site_visit_rooms: via parent site_visit
CREATE POLICY "Users manage own site visit rooms"
  ON public.site_visit_rooms FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.site_visits sv
    WHERE sv.id = site_visit_id AND sv.user_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.site_visits sv
    WHERE sv.id = site_visit_id AND sv.user_id = auth.uid()
  ));

-- site_visit_items: via parent room → visit
CREATE POLICY "Users manage own site visit items"
  ON public.site_visit_items FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.site_visit_rooms r
    JOIN public.site_visits sv ON sv.id = r.site_visit_id
    WHERE r.id = room_id AND sv.user_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.site_visit_rooms r
    JOIN public.site_visits sv ON sv.id = r.site_visit_id
    WHERE r.id = room_id AND sv.user_id = auth.uid()
  ));

-- site_visit_photos: via parent visit
CREATE POLICY "Users manage own site visit photos"
  ON public.site_visit_photos FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.site_visits sv
    WHERE sv.id = site_visit_id AND sv.user_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.site_visits sv
    WHERE sv.id = site_visit_id AND sv.user_id = auth.uid()
  ));

-- site_visit_prompts: via parent visit
CREATE POLICY "Users manage own site visit prompts"
  ON public.site_visit_prompts FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.site_visits sv
    WHERE sv.id = site_visit_id AND sv.user_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.site_visits sv
    WHERE sv.id = site_visit_id AND sv.user_id = auth.uid()
  ));

-- scope_baselines: via parent visit
CREATE POLICY "Users manage own scope baselines"
  ON public.scope_baselines FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.site_visits sv
    WHERE sv.id = site_visit_id AND sv.user_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.site_visits sv
    WHERE sv.id = site_visit_id AND sv.user_id = auth.uid()
  ));

-- scope_share_links: user manages own + public read by token
CREATE POLICY "Users manage own scope share links"
  ON public.scope_share_links FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Public can view active scope share links"
  ON public.scope_share_links FOR SELECT
  USING (status IN ('active', 'signed'));

CREATE POLICY "Public can update scope share links for signing"
  ON public.scope_share_links FOR UPDATE
  USING (status = 'active')
  WITH CHECK (status IN ('active', 'signed'));

-- pre_start_checklists: user manages own
CREATE POLICY "Users manage own pre-start checklists"
  ON public.pre_start_checklists FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- Updated_at trigger
-- ============================================================
CREATE OR REPLACE FUNCTION public.update_site_visit_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER site_visits_updated_at
  BEFORE UPDATE ON public.site_visits
  FOR EACH ROW EXECUTE FUNCTION public.update_site_visit_updated_at();

CREATE TRIGGER pre_start_checklists_updated_at
  BEFORE UPDATE ON public.pre_start_checklists
  FOR EACH ROW EXECUTE FUNCTION public.update_site_visit_updated_at();
