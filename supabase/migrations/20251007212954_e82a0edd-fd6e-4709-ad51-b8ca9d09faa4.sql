-- Create enum for document types
CREATE TYPE public.document_type AS ENUM (
  'design_spec',
  'quote',
  'rams',
  'checklist',
  'test_schedule',
  'eic'
);

-- Create pdf_templates table
CREATE TABLE public.pdf_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  type public.document_type NOT NULL,
  pdf_monkey_template_id TEXT,
  field_mapping JSONB DEFAULT '{}'::jsonb,
  file_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create document_field_schemas table
CREATE TABLE public.document_field_schemas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_type public.document_type UNIQUE NOT NULL,
  schema_version TEXT NOT NULL DEFAULT '1.0.0',
  field_schema JSONB NOT NULL,
  example_data JSONB NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.pdf_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_field_schemas ENABLE ROW LEVEL SECURITY;

-- RLS Policies for pdf_templates
CREATE POLICY "Users can manage their own PDF templates"
  ON public.pdf_templates
  FOR ALL
  USING (auth.uid() = user_id);

-- RLS Policies for document_field_schemas
CREATE POLICY "Anyone can view document schemas"
  ON public.document_field_schemas
  FOR SELECT
  USING (true);

CREATE POLICY "Service role can manage schemas"
  ON public.document_field_schemas
  FOR ALL
  USING (auth.role() = 'service_role');

-- Trigger for updated_at
CREATE TRIGGER update_pdf_templates_updated_at
  BEFORE UPDATE ON public.pdf_templates
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_document_schemas_updated_at
  BEFORE UPDATE ON public.document_field_schemas
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert standard field schemas
INSERT INTO public.document_field_schemas (document_type, field_schema, example_data, description) VALUES
(
  'design_spec',
  '{
    "projectDetails": {"projectName": "string", "location": "string", "date": "string"},
    "designParameters": {"voltage": "number", "phases": "number", "totalLoad": "number", "designCurrent": "number"},
    "cableDesign": {"cableSize": "string", "cableType": "string", "length": "number", "installationMethod": "string"},
    "circuits": [{"circuitRef": "string", "description": "string", "cableSize": "string", "cpcSize": "string", "protectiveDevice": "string", "loadCurrent": "number"}],
    "calculations": {"voltageDrop": "number", "voltageDropPercent": "number", "zs": "number", "capacity": "number"},
    "environmental": {"ambientTemp": "number", "grouping": "string", "earthing": "string", "ze": "number"},
    "compliance": {"compliant": "boolean", "warnings": ["string"], "recommendations": ["string"]}
  }'::jsonb,
  '{
    "projectDetails": {"projectName": "Commercial Office Fit-Out", "location": "London SW1", "date": "2025-09-15"},
    "designParameters": {"voltage": 230, "phases": 1, "totalLoad": 8000, "designCurrent": 34.8},
    "cableDesign": {"cableSize": "10mm²", "cableType": "SWA", "length": 45, "installationMethod": "Clipped direct"},
    "circuits": [{"circuitRef": "C1", "description": "Lighting", "cableSize": "2.5mm²", "cpcSize": "1.5mm²", "protectiveDevice": "16A Type B MCB", "loadCurrent": 8.5}],
    "calculations": {"voltageDrop": 3.2, "voltageDropPercent": 1.39, "zs": 0.45, "capacity": 52},
    "environmental": {"ambientTemp": 30, "grouping": "Single", "earthing": "TN-S", "ze": 0.35},
    "compliance": {"compliant": true, "warnings": [], "recommendations": ["Consider future load increases"]}
  }'::jsonb,
  'Standard design specification document with full cable calculations and BS 7671 compliance'
),
(
  'quote',
  '{
    "quoteNumber": "string",
    "date": "string",
    "expiryDate": "string",
    "clientData": {"name": "string", "company": "string", "address": "string", "email": "string", "phone": "string"},
    "items": [{"description": "string", "quantity": "number", "unitPrice": "number", "total": "number"}],
    "subtotal": "number",
    "vat": "number",
    "total": "number",
    "terms": "string"
  }'::jsonb,
  '{
    "quoteNumber": "Q-2025-001",
    "date": "2025-09-15",
    "expiryDate": "2025-10-15",
    "clientData": {"name": "John Smith", "company": "ABC Ltd", "address": "123 High St, London", "email": "john@abc.com", "phone": "020 1234 5678"},
    "items": [{"description": "Cable installation", "quantity": 1, "unitPrice": 500, "total": 500}],
    "subtotal": 500,
    "vat": 100,
    "total": 600,
    "terms": "Payment due within 30 days"
  }'::jsonb,
  'Professional quote document with itemized pricing'
),
(
  'rams',
  '{
    "projectName": "string",
    "location": "string",
    "date": "string",
    "assessor": "string",
    "activities": ["string"],
    "hazards": [{"hazard": "string", "risk": "string", "likelihood": "number", "severity": "number", "controls": "string", "residualRisk": "number"}]
  }'::jsonb,
  '{
    "projectName": "Office Electrical Installation",
    "location": "London SW1",
    "date": "2025-09-15",
    "assessor": "John Smith",
    "activities": ["Cable installation", "Testing"],
    "hazards": [{"hazard": "Electric shock", "risk": "Contact with live conductors", "likelihood": 3, "severity": 5, "controls": "Isolation procedures, PPE", "residualRisk": 6}]
  }'::jsonb,
  'Risk Assessment and Method Statement document'
);