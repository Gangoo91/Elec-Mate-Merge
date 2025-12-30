-- Add new columns to near_miss_reports for enhanced reporting
ALTER TABLE near_miss_reports
ADD COLUMN IF NOT EXISTS witnesses JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS third_party_involved BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS third_party_details TEXT,
ADD COLUMN IF NOT EXISTS weather_conditions TEXT,
ADD COLUMN IF NOT EXISTS lighting_conditions TEXT,
ADD COLUMN IF NOT EXISTS equipment_involved TEXT,
ADD COLUMN IF NOT EXISTS equipment_faulty BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS equipment_fault_details TEXT,
ADD COLUMN IF NOT EXISTS supervisor_notified BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS supervisor_name TEXT,
ADD COLUMN IF NOT EXISTS previous_similar_incidents TEXT;