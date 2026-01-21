-- Fix Board Scanner Training Data Pipeline
-- Enables user contributions to work correctly by fixing RLS policies and adding missing columns
-- Related to: ContributePhotoModal.tsx, CircuitEditModal.tsx

-- ============================================
-- 1. Add missing columns to board_scanner_training
-- ============================================

-- anonymous_hash: For deduplication of anonymous contributions
ALTER TABLE public.board_scanner_training
ADD COLUMN IF NOT EXISTS anonymous_hash TEXT;

-- image_id: Link to board_reference_images for richer training data
ALTER TABLE public.board_scanner_training
ADD COLUMN IF NOT EXISTS image_id UUID REFERENCES public.board_reference_images(id) ON DELETE SET NULL;

-- Add indexes for efficient queries
CREATE INDEX IF NOT EXISTS idx_bst_image_id ON public.board_scanner_training(image_id);
CREATE INDEX IF NOT EXISTS idx_bst_anonymous_hash ON public.board_scanner_training(anonymous_hash);

-- ============================================
-- 2. Fix RLS policies for board_scanner_training
-- ============================================

-- Problem: Old policy required user_id = auth.uid(), but anonymous contributions have user_id = null
DROP POLICY IF EXISTS "Users can insert own training data" ON public.board_scanner_training;

-- Fix: Allow any authenticated user to insert training data (including anonymous with null user_id)
CREATE POLICY "Authenticated users can insert training data" ON public.board_scanner_training
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Update SELECT policy to allow viewing anonymous submissions
DROP POLICY IF EXISTS "Users can view own training data" ON public.board_scanner_training;

CREATE POLICY "Users can view own or anonymous submissions" ON public.board_scanner_training
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR user_id IS NULL);

-- ============================================
-- 3. Fix board_reference_images for user contributions
-- ============================================

-- Make manufacturer nullable (user contributions may not know the manufacturer)
ALTER TABLE public.board_reference_images
ALTER COLUMN manufacturer DROP NOT NULL;

-- Add INSERT policy for authenticated users (was admin-only)
DO $$
BEGIN
  CREATE POLICY "Authenticated users can insert reference images" ON public.board_reference_images
    FOR INSERT
    TO authenticated
    WITH CHECK (true);
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Expand source_type check to include user_contributed
DO $$
BEGIN
  ALTER TABLE public.board_reference_images
  DROP CONSTRAINT IF EXISTS board_reference_images_source_type_check;

  ALTER TABLE public.board_reference_images
  ADD CONSTRAINT board_reference_images_source_type_check
  CHECK (source_type IN ('manufacturer', 'wholesaler', 'retailer', 'forum', 'user_contributed', 'auto_captured'));
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Expand image_type check to include in_situ options
DO $$
BEGIN
  ALTER TABLE public.board_reference_images
  DROP CONSTRAINT IF EXISTS board_reference_images_image_type_check;

  ALTER TABLE public.board_reference_images
  ADD CONSTRAINT board_reference_images_image_type_check
  CHECK (image_type IN ('product_catalogue', 'in_situ_clean', 'in_situ_dirty', 'handwritten', 'low_light', 'partial_view'));
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- ============================================
-- Documentation
-- ============================================

COMMENT ON COLUMN public.board_scanner_training.anonymous_hash IS 'SHA-256 hash of user ID for anonymous contributions - allows deduplication without tracking identity';
COMMENT ON COLUMN public.board_scanner_training.image_id IS 'Links to board_reference_images for richer training context';
