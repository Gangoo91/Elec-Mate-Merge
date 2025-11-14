-- Add missing 'topic' column to circuit_design_calculations table
-- This column is required for categorizing pre-loaded calculation formulas

DO $$ 
BEGIN
  -- Check if the column already exists before adding it
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'circuit_design_calculations' 
    AND column_name = 'topic'
  ) THEN
    ALTER TABLE public.circuit_design_calculations 
    ADD COLUMN topic TEXT;
    
    -- Add comment explaining the column
    COMMENT ON COLUMN public.circuit_design_calculations.topic IS 
      'Category or topic of the calculation (e.g., voltage drop, cable sizing, protective device selection)';
    
    -- Create index for faster filtering by topic
    CREATE INDEX IF NOT EXISTS idx_circuit_design_calculations_topic 
    ON public.circuit_design_calculations(topic);
  END IF;
END $$;