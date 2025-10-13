-- Phase 1-3: Complete Briefing System Enhancement
-- Add briefing templates table
CREATE TABLE IF NOT EXISTS public.briefing_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  description TEXT,
  template_type TEXT NOT NULL,
  template_schema JSONB NOT NULL,
  ai_prompt_template TEXT,
  pdf_layout_config JSONB DEFAULT '{}'::jsonb,
  is_public BOOLEAN DEFAULT false,
  is_default BOOLEAN DEFAULT false,
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.briefing_templates ENABLE ROW LEVEL SECURITY;

-- RLS Policies for briefing_templates
CREATE POLICY "Users can view public templates and their own"
ON public.briefing_templates FOR SELECT
USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Users can create their own templates"
ON public.briefing_templates FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own templates"
ON public.briefing_templates FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own templates"
ON public.briefing_templates FOR DELETE
USING (auth.uid() = user_id);

-- Add briefing status history table
CREATE TABLE IF NOT EXISTS public.briefing_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  briefing_id UUID REFERENCES public.team_briefings(id) ON DELETE CASCADE,
  old_status TEXT,
  new_status TEXT,
  changed_by UUID REFERENCES auth.users(id),
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.briefing_status_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view status history for their briefings"
ON public.briefing_status_history FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.team_briefings 
    WHERE id = briefing_id AND user_id = auth.uid()
  )
);

CREATE POLICY "Users can insert status history for their briefings"
ON public.briefing_status_history FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.team_briefings 
    WHERE id = briefing_id AND user_id = auth.uid()
  )
);

-- Enhance team_briefings table
ALTER TABLE public.team_briefings 
  ADD COLUMN IF NOT EXISTS template_used_id UUID REFERENCES public.briefing_templates(id),
  ADD COLUMN IF NOT EXISTS dynamic_fields JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS presentation_started_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS presentation_ended_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS attendee_signatures JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS ai_quality_score NUMERIC(3,2),
  ADD COLUMN IF NOT EXISTS user_edits_count INTEGER DEFAULT 0;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_briefing_templates_type ON public.briefing_templates(template_type);
CREATE INDEX IF NOT EXISTS idx_briefing_templates_public ON public.briefing_templates(is_public);
CREATE INDEX IF NOT EXISTS idx_briefing_status_history_briefing ON public.briefing_status_history(briefing_id);
CREATE INDEX IF NOT EXISTS idx_team_briefings_template ON public.team_briefings(template_used_id);
CREATE INDEX IF NOT EXISTS idx_team_briefings_status ON public.team_briefings(status);

-- Add trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_briefing_templates_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_briefing_templates_timestamp
BEFORE UPDATE ON public.briefing_templates
FOR EACH ROW
EXECUTE FUNCTION public.update_briefing_templates_timestamp();

-- Insert default templates
INSERT INTO public.briefing_templates (name, description, template_type, template_schema, ai_prompt_template, is_public, is_default) VALUES
('Site Work Installation', 'Comprehensive template for electrical installation work', 'site-work', 
'{
  "sections": [
    {"id": "work_scope", "title": "Work Scope", "required": true},
    {"id": "hazards", "title": "Hazard Analysis", "required": true},
    {"id": "regulations", "title": "BS 7671 Compliance", "required": true},
    {"id": "equipment", "title": "Equipment & PPE", "required": true},
    {"id": "emergency", "title": "Emergency Procedures", "required": true}
  ]
}'::jsonb,
'Generate a comprehensive site work briefing for electrical installation. Include specific BS 7671 regulations, detailed hazard analysis with controls, required PPE, and step-by-step safety procedures.',
true, true),

('Lessons From Experience', 'Template for incident review and learning', 'lfe',
'{
  "sections": [
    {"id": "incident_summary", "title": "What Happened", "required": true},
    {"id": "root_cause", "title": "Root Cause Analysis", "required": true},
    {"id": "contributing_factors", "title": "Contributing Factors", "required": true},
    {"id": "preventive_actions", "title": "Preventive Actions", "required": true},
    {"id": "lessons_learned", "title": "Key Takeaways", "required": true}
  ]
}'::jsonb,
'Analyze this incident using Root Cause Analysis framework. Identify contributing factors, recommend specific preventive actions, and extract actionable lessons for the team.',
true, true),

('Quick Toolbox Talk', '5-minute safety briefing template', 'toolbox-talk',
'{
  "sections": [
    {"id": "topic", "title": "Safety Topic", "required": true},
    {"id": "key_points", "title": "Key Points (3-5)", "required": true},
    {"id": "discussion", "title": "Discussion Questions", "required": true}
  ]
}'::jsonb,
'Create a concise 5-minute toolbox talk. Focus on 3-5 key safety points, include 2-3 discussion questions to engage the team.',
true, true),

('HSE Regulatory Update', 'Health, Safety & Environment compliance briefing', 'hse-update',
'{
  "sections": [
    {"id": "regulation_summary", "title": "Regulation Summary", "required": true},
    {"id": "compliance_requirements", "title": "What We Must Do", "required": true},
    {"id": "timeline", "title": "Implementation Timeline", "required": true},
    {"id": "checklist", "title": "Compliance Checklist", "required": true}
  ]
}'::jsonb,
'Explain this HSE regulation in practical terms. Include specific compliance requirements, implementation timeline, and actionable checklist items.',
true, true),

('Safety Alert', 'Urgent hazard notification template', 'safety-alert',
'{
  "sections": [
    {"id": "alert_summary", "title": "ALERT: What Changed", "required": true},
    {"id": "immediate_actions", "title": "Immediate Actions Required", "required": true},
    {"id": "hazard_details", "title": "Hazard Details", "required": true},
    {"id": "controls", "title": "Control Measures", "required": true}
  ]
}'::jsonb,
'Create an urgent safety alert briefing. Lead with immediate actions required, explain the hazard clearly, and specify control measures.',
true, true);