-- Add missing PPE and enhanced method statement fields

-- Add PPE columns to rams_documents
ALTER TABLE public.rams_documents
ADD COLUMN IF NOT EXISTS required_ppe TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS ppe_details JSONB DEFAULT '[]';

-- Add enhanced method statement columns
ALTER TABLE public.method_statements
ADD COLUMN IF NOT EXISTS tools_required TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS materials_required TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS practical_tips TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS common_mistakes TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS total_estimated_time TEXT,
ADD COLUMN IF NOT EXISTS difficulty_level TEXT,
ADD COLUMN IF NOT EXISTS compliance_regulations TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS compliance_warnings TEXT[] DEFAULT '{}';

-- Add indexes for array columns for better query performance
CREATE INDEX IF NOT EXISTS idx_rams_ppe ON public.rams_documents USING GIN (required_ppe);
CREATE INDEX IF NOT EXISTS idx_method_tools ON public.method_statements USING GIN (tools_required);

-- Add comments for documentation
COMMENT ON COLUMN public.rams_documents.required_ppe IS 'Legacy PPE requirements (backward compatibility)';
COMMENT ON COLUMN public.rams_documents.ppe_details IS 'Enhanced structured PPE data with standards and purposes';
COMMENT ON COLUMN public.method_statements.tools_required IS 'List of tools needed for the installation';
COMMENT ON COLUMN public.method_statements.practical_tips IS 'Installation tips and best practices';
COMMENT ON COLUMN public.method_statements.common_mistakes IS 'Common mistakes to avoid during installation';
COMMENT ON COLUMN public.method_statements.compliance_regulations IS 'Relevant BS 7671 and other regulations';
COMMENT ON COLUMN public.method_statements.compliance_warnings IS 'Compliance warnings and important notes';