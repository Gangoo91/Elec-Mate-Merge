-- Phase 1: Database Schema Enhancement for AI-Powered Briefings
-- Add new fields for AI-powered briefings with job context and PDF generation

ALTER TABLE team_briefings 
ADD COLUMN IF NOT EXISTS job_name TEXT,
ADD COLUMN IF NOT EXISTS contractor_company TEXT,
ADD COLUMN IF NOT EXISTS conductor_name TEXT,
ADD COLUMN IF NOT EXISTS hazards TEXT,
ADD COLUMN IF NOT EXISTS safety_warning TEXT,
ADD COLUMN IF NOT EXISTS briefing_description TEXT,
ADD COLUMN IF NOT EXISTS work_scope TEXT,
ADD COLUMN IF NOT EXISTS environment_type TEXT,
ADD COLUMN IF NOT EXISTS team_size INTEGER DEFAULT 2,
ADD COLUMN IF NOT EXISTS risk_level TEXT DEFAULT 'medium',
ADD COLUMN IF NOT EXISTS identified_hazards TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS custom_hazards TEXT,
ADD COLUMN IF NOT EXISTS special_considerations TEXT,
ADD COLUMN IF NOT EXISTS ai_generated BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS ai_prompt_data JSONB,
ADD COLUMN IF NOT EXISTS pdf_url TEXT,
ADD COLUMN IF NOT EXISTS pdf_generated_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS pdf_document_id TEXT,
ADD COLUMN IF NOT EXISTS photos JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS created_by_name TEXT;