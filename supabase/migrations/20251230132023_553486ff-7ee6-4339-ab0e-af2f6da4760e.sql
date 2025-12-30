-- Create safety_equipment table for equipment tracking
CREATE TABLE public.safety_equipment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Core Fields
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  serial_number TEXT,
  
  -- Purchase/Ownership
  purchase_date DATE,
  purchase_price DECIMAL(10,2),
  warranty_expiry DATE,
  
  -- Location & Assignment  
  location TEXT NOT NULL,
  assigned_to TEXT,
  
  -- Inspection
  last_inspection DATE,
  next_inspection DATE,
  inspection_interval_days INTEGER DEFAULT 90,
  
  -- Calibration
  requires_calibration BOOLEAN DEFAULT false,
  last_calibration DATE,
  calibration_due DATE,
  calibration_interval_days INTEGER,
  
  -- Status & Notes
  status TEXT NOT NULL DEFAULT 'good',
  condition_notes TEXT,
  
  -- Metadata
  photos TEXT[] DEFAULT '{}',
  qr_code TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.safety_equipment ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user-specific access
CREATE POLICY "Users can view their own equipment"
  ON public.safety_equipment
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own equipment"
  ON public.safety_equipment
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own equipment"
  ON public.safety_equipment
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own equipment"
  ON public.safety_equipment
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create indexes for common queries
CREATE INDEX idx_safety_equipment_user_id ON public.safety_equipment(user_id);
CREATE INDEX idx_safety_equipment_status ON public.safety_equipment(status);
CREATE INDEX idx_safety_equipment_next_inspection ON public.safety_equipment(next_inspection);
CREATE INDEX idx_safety_equipment_calibration_due ON public.safety_equipment(calibration_due);

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_safety_equipment_updated_at
  BEFORE UPDATE ON public.safety_equipment
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();