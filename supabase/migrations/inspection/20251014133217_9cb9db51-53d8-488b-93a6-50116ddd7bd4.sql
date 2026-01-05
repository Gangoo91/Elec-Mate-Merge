-- Create reports table for cloud sync
CREATE TABLE public.reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Report identification
  report_type TEXT NOT NULL CHECK (report_type IN ('eicr', 'eic', 'minor-works')),
  certificate_number TEXT NOT NULL,
  report_id TEXT NOT NULL UNIQUE,
  
  -- Metadata
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'in-progress', 'completed')),
  client_name TEXT,
  installation_address TEXT,
  inspection_date DATE,
  inspector_name TEXT,
  
  -- Full report data (JSONB for flexibility)
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  
  -- PDF storage
  pdf_url TEXT,
  pdf_generated_at TIMESTAMPTZ,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_synced_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Soft delete
  deleted_at TIMESTAMPTZ,
  
  CONSTRAINT unique_user_report_id UNIQUE(user_id, report_id)
);

-- Indexes for performance
CREATE INDEX idx_reports_user_id ON public.reports(user_id);
CREATE INDEX idx_reports_status ON public.reports(status);
CREATE INDEX idx_reports_report_type ON public.reports(report_type);
CREATE INDEX idx_reports_updated_at ON public.reports(updated_at DESC);
CREATE INDEX idx_reports_deleted_at ON public.reports(deleted_at) WHERE deleted_at IS NULL;

-- Auto-update timestamp trigger
CREATE TRIGGER set_reports_updated_at
  BEFORE UPDATE ON public.reports
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own reports"
  ON public.reports FOR SELECT
  USING (auth.uid() = user_id AND deleted_at IS NULL);

CREATE POLICY "Users can create own reports"
  ON public.reports FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reports"
  ON public.reports FOR UPDATE
  USING (auth.uid() = user_id AND deleted_at IS NULL)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can soft-delete own reports"
  ON public.reports FOR DELETE
  USING (auth.uid() = user_id);

-- Enable realtime for reports table
ALTER TABLE public.reports REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.reports;

-- Create circuit templates table for reusable circuits
CREATE TABLE public.circuit_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Template metadata
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  is_public BOOLEAN DEFAULT false,
  
  -- Circuit data
  template_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  
  -- Usage tracking
  usage_count INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_circuit_templates_user_id ON public.circuit_templates(user_id);
CREATE INDEX idx_circuit_templates_category ON public.circuit_templates(category);
CREATE INDEX idx_circuit_templates_is_public ON public.circuit_templates(is_public);

-- RLS for circuit templates
ALTER TABLE public.circuit_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own templates and public templates"
  ON public.circuit_templates FOR SELECT
  USING (auth.uid() = user_id OR is_public = true);

CREATE POLICY "Users can create own templates"
  ON public.circuit_templates FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own templates"
  ON public.circuit_templates FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own templates"
  ON public.circuit_templates FOR DELETE
  USING (auth.uid() = user_id);

-- Create customer database for CRM functionality
CREATE TABLE public.customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Customer details
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  address TEXT,
  
  -- Additional info
  notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  CONSTRAINT unique_user_customer_email UNIQUE(user_id, email)
);

-- Indexes
CREATE INDEX idx_customers_user_id ON public.customers(user_id);
CREATE INDEX idx_customers_name ON public.customers(name);
CREATE INDEX idx_customers_email ON public.customers(email);

-- Auto-update timestamp trigger
CREATE TRIGGER set_customers_updated_at
  BEFORE UPDATE ON public.customers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- RLS for customers
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own customers"
  ON public.customers FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own customers"
  ON public.customers FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own customers"
  ON public.customers FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own customers"
  ON public.customers FOR DELETE
  USING (auth.uid() = user_id);

-- Link reports to customers
ALTER TABLE public.reports ADD COLUMN customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL;
CREATE INDEX idx_reports_customer_id ON public.reports(customer_id);