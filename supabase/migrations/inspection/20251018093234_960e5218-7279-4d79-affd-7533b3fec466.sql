-- Add fault code and observation linking to inspection photos
ALTER TABLE inspection_photos
ADD COLUMN IF NOT EXISTS fault_code TEXT,
ADD COLUMN IF NOT EXISTS observation_id TEXT,
ADD COLUMN IF NOT EXISTS fault_description TEXT;

-- Add index for faster queries by observation_id
CREATE INDEX IF NOT EXISTS idx_inspection_photos_observation_id ON inspection_photos(observation_id);

-- Add index for faster queries by fault_code
CREATE INDEX IF NOT EXISTS idx_inspection_photos_fault_code ON inspection_photos(fault_code);

COMMENT ON COLUMN inspection_photos.fault_code IS 'The fault classification code (C1, C2, C3, FI, limitation) associated with this photo';
COMMENT ON COLUMN inspection_photos.observation_id IS 'Links this photo to a specific defect observation';
COMMENT ON COLUMN inspection_photos.fault_description IS 'Brief description of the fault captured in this photo';