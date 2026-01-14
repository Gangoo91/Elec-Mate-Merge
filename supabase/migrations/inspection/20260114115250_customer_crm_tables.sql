-- Customer CRM Enhancement Migration
-- Adds support for multiple properties per customer and activity tracking

-- =============================================
-- Table: customer_properties
-- Allows tracking multiple properties per customer
-- =============================================
CREATE TABLE IF NOT EXISTS public.customer_properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  address TEXT NOT NULL,
  property_type TEXT DEFAULT 'residential', -- 'residential', 'commercial', 'industrial'
  notes TEXT,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for customer_properties
CREATE INDEX IF NOT EXISTS idx_customer_properties_customer ON public.customer_properties(customer_id);
CREATE INDEX IF NOT EXISTS idx_customer_properties_user ON public.customer_properties(user_id);
CREATE INDEX IF NOT EXISTS idx_customer_properties_primary ON public.customer_properties(customer_id, is_primary) WHERE is_primary = true;

-- RLS for customer_properties
ALTER TABLE public.customer_properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own customer properties"
  ON public.customer_properties FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own customer properties"
  ON public.customer_properties FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own customer properties"
  ON public.customer_properties FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own customer properties"
  ON public.customer_properties FOR DELETE
  USING (auth.uid() = user_id);

-- =============================================
-- Table: customer_activity_log
-- Tracks all customer interactions and events
-- =============================================
CREATE TABLE IF NOT EXISTS public.customer_activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL, -- 'note', 'call', 'email', 'certificate', 'visit', 'property_added'
  title TEXT NOT NULL,
  description TEXT,
  metadata JSONB DEFAULT '{}'::jsonb, -- { report_id, property_id, certificate_type, etc }
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for customer_activity_log
CREATE INDEX IF NOT EXISTS idx_activity_customer ON public.customer_activity_log(customer_id);
CREATE INDEX IF NOT EXISTS idx_activity_user ON public.customer_activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_type ON public.customer_activity_log(activity_type);
CREATE INDEX IF NOT EXISTS idx_activity_created ON public.customer_activity_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_customer_created ON public.customer_activity_log(customer_id, created_at DESC);

-- RLS for customer_activity_log
ALTER TABLE public.customer_activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own customer activity"
  ON public.customer_activity_log FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own customer activity"
  ON public.customer_activity_log FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own customer activity"
  ON public.customer_activity_log FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own customer activity"
  ON public.customer_activity_log FOR DELETE
  USING (auth.uid() = user_id);

-- =============================================
-- Add property_id to reports table
-- Links certificates to specific properties
-- =============================================
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'reports'
    AND column_name = 'property_id'
  ) THEN
    ALTER TABLE public.reports ADD COLUMN property_id UUID
    REFERENCES public.customer_properties(id) ON DELETE SET NULL;

    CREATE INDEX IF NOT EXISTS idx_reports_property ON public.reports(property_id);
  END IF;
END $$;

-- =============================================
-- Function to auto-log certificate creation
-- =============================================
CREATE OR REPLACE FUNCTION log_certificate_activity()
RETURNS TRIGGER AS $$
BEGIN
  -- Only log if customer_id is set
  IF NEW.customer_id IS NOT NULL THEN
    INSERT INTO public.customer_activity_log (
      customer_id,
      user_id,
      activity_type,
      title,
      description,
      metadata
    ) VALUES (
      NEW.customer_id,
      NEW.user_id,
      'certificate',
      CASE
        WHEN NEW.status = 'completed' THEN 'Certificate completed'
        WHEN NEW.status = 'in-progress' THEN 'Certificate started'
        ELSE 'Certificate created'
      END,
      COALESCE(NEW.report_type, 'Certificate') || ' - ' || COALESCE(NEW.certificate_number, NEW.report_id::text),
      jsonb_build_object(
        'report_id', NEW.report_id,
        'report_type', NEW.report_type,
        'certificate_number', NEW.certificate_number,
        'status', NEW.status,
        'property_id', NEW.property_id
      )
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to log certificate creation/updates
DROP TRIGGER IF EXISTS trigger_log_certificate_activity ON public.reports;
CREATE TRIGGER trigger_log_certificate_activity
  AFTER INSERT OR UPDATE OF status ON public.reports
  FOR EACH ROW
  EXECUTE FUNCTION log_certificate_activity();

-- =============================================
-- Function to auto-log property addition
-- =============================================
CREATE OR REPLACE FUNCTION log_property_activity()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.customer_activity_log (
    customer_id,
    user_id,
    activity_type,
    title,
    description,
    metadata
  ) VALUES (
    NEW.customer_id,
    NEW.user_id,
    'property_added',
    'Property added',
    NEW.address,
    jsonb_build_object(
      'property_id', NEW.id,
      'property_type', NEW.property_type,
      'is_primary', NEW.is_primary
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to log property additions
DROP TRIGGER IF EXISTS trigger_log_property_activity ON public.customer_properties;
CREATE TRIGGER trigger_log_property_activity
  AFTER INSERT ON public.customer_properties
  FOR EACH ROW
  EXECUTE FUNCTION log_property_activity();

-- =============================================
-- Add stats columns to customers for performance
-- =============================================
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'customers'
    AND column_name = 'certificate_count'
  ) THEN
    ALTER TABLE public.customers ADD COLUMN certificate_count INTEGER DEFAULT 0;
    ALTER TABLE public.customers ADD COLUMN property_count INTEGER DEFAULT 0;
    ALTER TABLE public.customers ADD COLUMN last_activity_at TIMESTAMPTZ;
  END IF;
END $$;

-- =============================================
-- Function to update customer stats
-- =============================================
CREATE OR REPLACE FUNCTION update_customer_stats()
RETURNS TRIGGER AS $$
BEGIN
  -- Update certificate count
  IF TG_TABLE_NAME = 'reports' THEN
    IF TG_OP = 'INSERT' AND NEW.customer_id IS NOT NULL THEN
      UPDATE public.customers
      SET certificate_count = certificate_count + 1,
          last_activity_at = NOW()
      WHERE id = NEW.customer_id;
    ELSIF TG_OP = 'DELETE' AND OLD.customer_id IS NOT NULL THEN
      UPDATE public.customers
      SET certificate_count = GREATEST(0, certificate_count - 1)
      WHERE id = OLD.customer_id;
    ELSIF TG_OP = 'UPDATE' THEN
      -- Handle customer_id change
      IF OLD.customer_id IS DISTINCT FROM NEW.customer_id THEN
        IF OLD.customer_id IS NOT NULL THEN
          UPDATE public.customers
          SET certificate_count = GREATEST(0, certificate_count - 1)
          WHERE id = OLD.customer_id;
        END IF;
        IF NEW.customer_id IS NOT NULL THEN
          UPDATE public.customers
          SET certificate_count = certificate_count + 1,
              last_activity_at = NOW()
          WHERE id = NEW.customer_id;
        END IF;
      END IF;
    END IF;
  END IF;

  -- Update property count
  IF TG_TABLE_NAME = 'customer_properties' THEN
    IF TG_OP = 'INSERT' THEN
      UPDATE public.customers
      SET property_count = property_count + 1,
          last_activity_at = NOW()
      WHERE id = NEW.customer_id;
    ELSIF TG_OP = 'DELETE' THEN
      UPDATE public.customers
      SET property_count = GREATEST(0, property_count - 1)
      WHERE id = OLD.customer_id;
    END IF;
  END IF;

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Triggers for stats updates
DROP TRIGGER IF EXISTS trigger_update_customer_cert_stats ON public.reports;
CREATE TRIGGER trigger_update_customer_cert_stats
  AFTER INSERT OR UPDATE OR DELETE ON public.reports
  FOR EACH ROW
  EXECUTE FUNCTION update_customer_stats();

DROP TRIGGER IF EXISTS trigger_update_customer_property_stats ON public.customer_properties;
CREATE TRIGGER trigger_update_customer_property_stats
  AFTER INSERT OR DELETE ON public.customer_properties
  FOR EACH ROW
  EXECUTE FUNCTION update_customer_stats();

-- =============================================
-- Backfill existing customer stats
-- =============================================
UPDATE public.customers c
SET
  certificate_count = COALESCE((
    SELECT COUNT(*) FROM public.reports r
    WHERE r.customer_id = c.id AND r.deleted_at IS NULL
  ), 0),
  last_activity_at = COALESCE((
    SELECT MAX(r.created_at) FROM public.reports r
    WHERE r.customer_id = c.id AND r.deleted_at IS NULL
  ), c.created_at);
