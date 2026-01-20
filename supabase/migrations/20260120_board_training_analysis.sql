-- Board Training Analysis Table
-- Stores comprehensive analysis of training photos for the board scanner AI
-- This enables the system to learn from verified board photos

-- Create the board_training_analysis table
CREATE TABLE IF NOT EXISTS public.board_training_analysis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_id UUID REFERENCES public.board_reference_images(id) ON DELETE CASCADE,

  -- Board identification
  manufacturer TEXT,
  model_series TEXT,
  board_age_category TEXT CHECK (board_age_category IN ('new', 'recent', 'aged', 'legacy')),

  -- Board structure
  total_ways INTEGER,
  populated_ways INTEGER,
  empty_ways INTEGER,
  main_switch_rating_amps INTEGER,
  main_switch_position TEXT CHECK (main_switch_position IN ('left', 'right', 'center', 'top')),

  -- Phase configuration
  is_three_phase BOOLEAN DEFAULT FALSE,
  phase_layout TEXT CHECK (phase_layout IN ('single', '3P-vertical', '3P-horizontal')),
  busbar_labels TEXT[],

  -- Board type
  is_split_load BOOLEAN DEFAULT FALSE,
  rcd_count INTEGER DEFAULT 0,
  split_point_position INTEGER,

  -- Devices detected (aggregated)
  mcb_count INTEGER DEFAULT 0,
  rcbo_count INTEGER DEFAULT 0,
  rcd_count_devices INTEGER DEFAULT 0,
  afdd_count INTEGER DEFAULT 0,
  spd_present BOOLEAN DEFAULT FALSE,
  spd_status TEXT CHECK (spd_status IN ('green_ok', 'yellow_check', 'red_replace', 'unknown')),

  -- Ratings breakdown (JSONB for flexibility)
  ratings_distribution JSONB,
  curves_distribution JSONB,

  -- Labels & pictograms
  has_handwritten_labels BOOLEAN DEFAULT FALSE,
  has_printed_labels BOOLEAN DEFAULT FALSE,
  has_pictograms BOOLEAN DEFAULT FALSE,
  pictogram_types TEXT[],
  label_abbreviations JSONB,

  -- Image quality assessment
  lighting_conditions TEXT CHECK (lighting_conditions IN ('excellent', 'good', 'moderate', 'poor', 'very_poor')),
  image_clarity TEXT CHECK (image_clarity IN ('sharp', 'acceptable', 'blurry', 'very_blurry')),
  board_visibility TEXT CHECK (board_visibility IN ('full', 'partial', 'obscured')),
  angle_quality TEXT CHECK (angle_quality IN ('straight_on', 'slight_angle', 'significant_angle')),

  -- Circuit-level data (all circuits in one JSONB array)
  circuits JSONB,

  -- Analysis metadata
  ai_model_used TEXT,
  analysis_confidence DECIMAL(3,2) CHECK (analysis_confidence >= 0 AND analysis_confidence <= 1),
  analysis_timestamp TIMESTAMPTZ DEFAULT NOW(),
  human_verified BOOLEAN DEFAULT FALSE,
  verified_by UUID REFERENCES auth.users(id),
  verification_notes TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for efficient queries
CREATE INDEX IF NOT EXISTS idx_bta_manufacturer ON public.board_training_analysis(manufacturer);
CREATE INDEX IF NOT EXISTS idx_bta_three_phase ON public.board_training_analysis(is_three_phase);
CREATE INDEX IF NOT EXISTS idx_bta_verified ON public.board_training_analysis(human_verified);
CREATE INDEX IF NOT EXISTS idx_bta_image_id ON public.board_training_analysis(image_id);
CREATE INDEX IF NOT EXISTS idx_bta_created_at ON public.board_training_analysis(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.board_training_analysis ENABLE ROW LEVEL SECURITY;

-- Policy: Service role can do everything
CREATE POLICY "Service role full access" ON public.board_training_analysis
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Policy: Admins can read all
CREATE POLICY "Admins can read training analysis" ON public.board_training_analysis
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.admin_role IN ('super_admin', 'admin')
    )
  );

-- Policy: Admins can insert and update
CREATE POLICY "Admins can manage training analysis" ON public.board_training_analysis
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.admin_role IN ('super_admin', 'admin')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.admin_role IN ('super_admin', 'admin')
    )
  );

-- Policy: Public can read verified analyses (for RAG/learning)
CREATE POLICY "Public can read verified analyses" ON public.board_training_analysis
  FOR SELECT
  USING (human_verified = true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_board_training_analysis_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_board_training_analysis_updated_at
  BEFORE UPDATE ON public.board_training_analysis
  FOR EACH ROW
  EXECUTE FUNCTION update_board_training_analysis_updated_at();

-- Add comment for documentation
COMMENT ON TABLE public.board_training_analysis IS 'Stores comprehensive AI analysis of board reference images for training the board scanner. Each row represents a full analysis of one training photo.';
