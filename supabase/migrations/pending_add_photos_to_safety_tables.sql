-- Migration: add_photos_to_safety_tables
-- Adds photos JSONB column to safety tables that don't already have it
-- Tables that ALREADY have photos: near_miss_reports (photos_attached), equipment_register (photos), site_diary_entries (photos)

ALTER TABLE safety_observations ADD COLUMN IF NOT EXISTS photos jsonb DEFAULT '[]'::jsonb;
ALTER TABLE pre_use_checks ADD COLUMN IF NOT EXISTS photos jsonb DEFAULT '[]'::jsonb;
ALTER TABLE fire_watch_records ADD COLUMN IF NOT EXISTS photos jsonb DEFAULT '[]'::jsonb;
ALTER TABLE safe_isolation_records ADD COLUMN IF NOT EXISTS photos jsonb DEFAULT '[]'::jsonb;
ALTER TABLE permits_to_work ADD COLUMN IF NOT EXISTS photos jsonb DEFAULT '[]'::jsonb;
ALTER TABLE coshh_assessments ADD COLUMN IF NOT EXISTS photos jsonb DEFAULT '[]'::jsonb;
ALTER TABLE inspection_records ADD COLUMN IF NOT EXISTS photos jsonb DEFAULT '[]'::jsonb;
ALTER TABLE accident_records ADD COLUMN IF NOT EXISTS photos jsonb DEFAULT '[]'::jsonb;
