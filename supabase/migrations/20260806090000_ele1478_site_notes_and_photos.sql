-- ELE-1478 — site-specific notes with photos, under the customer.
--
-- Requested by Ryan Duthie: "Site specific notes with photos attached under the
-- specific customer" — a running log of the things that are true about a SITE
-- rather than a job: where the meter is, the access code, which breaker is
-- mislabelled, why the loft hatch needs a 3m ladder.
--
-- What already existed, and why it wasn't enough:
--
--   photo_projects.customer_id  -> photos ARE already grouped by customer
--                                  (15 of 19 projects linked, 106 photos), but
--                                  nothing under components/customers/ ever
--                                  reads them, so they are invisible from the
--                                  customer record.
--   customer_properties.notes   -> ONE overwritable text box per property.
--                                  A running log is append-many; 17 properties
--                                  exist and only 3 have notes, which is what a
--                                  single box that loses history looks like.
--
-- So: a real log table, plus the two nullable pointers that let notes and
-- photos hang off a specific PROPERTY rather than just the customer. A landlord
-- with eight flats needs eight logs, not one pile.

-- ── The log ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.site_notes (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  -- No DEFAULT auth.uid() here on purpose. A defaulted owner column means a
  -- server-side or mis-scoped insert silently lands on the wrong user instead
  -- of failing loudly (the employer_id split-brain trap). The client sets it
  -- and RLS checks it.
  user_id     uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  customer_id uuid NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  -- Nullable: notes about "this customer" generally are legitimate, and a note
  -- must survive its property being deleted rather than vanishing with it.
  property_id uuid REFERENCES public.customer_properties(id) ON DELETE SET NULL,
  category    text NOT NULL DEFAULT 'general',
  body        text NOT NULL,
  is_pinned   boolean NOT NULL DEFAULT false,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT site_notes_body_not_blank CHECK (btrim(body) <> ''),
  CONSTRAINT site_notes_category_valid
    CHECK (category IN ('general', 'access', 'meter', 'hazard', 'equipment', 'parking'))
);

COMMENT ON TABLE public.site_notes IS
  'ELE-1478 — running log of site-specific facts per customer, optionally pinned to one of their properties. Append-many, unlike customer_properties.notes.';

-- Pinned first, then newest — matches how the tab reads them, so the sort is
-- served by the index rather than re-sorted per request.
CREATE INDEX IF NOT EXISTS idx_site_notes_customer
  ON public.site_notes (customer_id, is_pinned DESC, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_site_notes_property
  ON public.site_notes (property_id)
  WHERE property_id IS NOT NULL;

-- Idempotent: the table above is IF NOT EXISTS, so a re-run must not trip over
-- an already-present trigger or policy.
DROP TRIGGER IF EXISTS trg_site_notes_updated_at ON public.site_notes;
CREATE TRIGGER trg_site_notes_updated_at
  BEFORE UPDATE ON public.site_notes
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.site_notes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users read their own site notes" ON public.site_notes;
CREATE POLICY "Users read their own site notes"
  ON public.site_notes FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users create their own site notes" ON public.site_notes;
CREATE POLICY "Users create their own site notes"
  ON public.site_notes FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users update their own site notes" ON public.site_notes;
CREATE POLICY "Users update their own site notes"
  ON public.site_notes FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users delete their own site notes" ON public.site_notes;
CREATE POLICY "Users delete their own site notes"
  ON public.site_notes FOR DELETE USING (auth.uid() = user_id);

-- ── Photo -> note ────────────────────────────────────────────────────────
-- ON DELETE SET NULL, never CASCADE. Deleting a note must not destroy the
-- image: the file lives in the safety-photos bucket and a cascade would leave
-- the object orphaned in storage with no row pointing at it. The photo falls
-- back to the general library instead.
ALTER TABLE public.safety_photos
  ADD COLUMN IF NOT EXISTS site_note_id uuid REFERENCES public.site_notes(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_safety_photos_site_note
  ON public.safety_photos (site_note_id)
  WHERE site_note_id IS NOT NULL;

COMMENT ON COLUMN public.safety_photos.site_note_id IS
  'ELE-1478 — the site note this photo is attached to. NULL for ordinary photo-documentation shots.';

-- ── Photo project -> property ────────────────────────────────────────────
-- photo_projects already carries customer_id and is genuinely used. This lets
-- an existing project be pinned to ONE of that customer''s sites so the
-- customer record can group photos per address instead of in one pile.
ALTER TABLE public.photo_projects
  ADD COLUMN IF NOT EXISTS property_id uuid REFERENCES public.customer_properties(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_photo_projects_property
  ON public.photo_projects (property_id)
  WHERE property_id IS NOT NULL;

COMMENT ON COLUMN public.photo_projects.property_id IS
  'ELE-1478 — optional pin to a specific customer_properties row. customer_id remains the primary grouping.';
