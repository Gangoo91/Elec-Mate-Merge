-- AI Board Analysis Metadata Migration
-- Adds columns to track AI analysis performance and user corrections

-- Add AI analysis metadata columns to inspection_photos if table exists
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'inspection_photos') THEN
        -- Add AI model version tracking
        IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'inspection_photos' AND column_name = 'ai_model_version') THEN
            ALTER TABLE public.inspection_photos ADD COLUMN ai_model_version TEXT;
        END IF;

        -- Add AI confidence score (0.00 to 1.00)
        IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'inspection_photos' AND column_name = 'ai_confidence_score') THEN
            ALTER TABLE public.inspection_photos ADD COLUMN ai_confidence_score DECIMAL(3,2);
        END IF;

        -- Add AI processing time in milliseconds
        IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'inspection_photos' AND column_name = 'ai_processing_time_ms') THEN
            ALTER TABLE public.inspection_photos ADD COLUMN ai_processing_time_ms INTEGER;
        END IF;

        -- Add user corrections tracking
        IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'inspection_photos' AND column_name = 'user_corrections') THEN
            ALTER TABLE public.inspection_photos ADD COLUMN user_corrections JSONB DEFAULT '{}'::jsonb;
        END IF;
    END IF;
END $$;

-- Add AI analysis metadata columns to reports table as well
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'reports') THEN
        -- Track AI-assisted creation
        IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'reports' AND column_name = 'ai_assisted') THEN
            ALTER TABLE public.reports ADD COLUMN ai_assisted BOOLEAN DEFAULT false;
        END IF;

        -- AI models used in report creation
        IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'reports' AND column_name = 'ai_models_used') THEN
            ALTER TABLE public.reports ADD COLUMN ai_models_used TEXT[];
        END IF;

        -- Total AI analysis time for all photos
        IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'reports' AND column_name = 'total_ai_time_ms') THEN
            ALTER TABLE public.reports ADD COLUMN total_ai_time_ms INTEGER;
        END IF;
    END IF;
END $$;

-- Create AI analysis logs table for detailed tracking
CREATE TABLE IF NOT EXISTS public.ai_analysis_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    report_id UUID,

    -- Analysis details
    analysis_type TEXT NOT NULL, -- 'board_scan', 'observation_suggest', 'label_ocr'
    models_used TEXT[] DEFAULT '{}',
    processing_time_ms INTEGER,

    -- Input/output metrics
    input_image_count INTEGER DEFAULT 1,
    input_total_size_mb DECIMAL(5,2),
    circuits_detected INTEGER DEFAULT 0,

    -- Confidence metrics
    avg_confidence DECIMAL(3,2),
    high_confidence_count INTEGER DEFAULT 0,
    medium_confidence_count INTEGER DEFAULT 0,
    low_confidence_count INTEGER DEFAULT 0,

    -- User interaction
    user_corrections_count INTEGER DEFAULT 0,
    was_rescanned BOOLEAN DEFAULT false,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT now(),
    completed_at TIMESTAMPTZ,

    -- Raw response for debugging (optional, can be null)
    raw_response JSONB
);

-- Create index for efficient querying
CREATE INDEX IF NOT EXISTS idx_ai_analysis_logs_user_id ON public.ai_analysis_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_analysis_logs_created_at ON public.ai_analysis_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_analysis_logs_analysis_type ON public.ai_analysis_logs(analysis_type);

-- Enable RLS on ai_analysis_logs
ALTER TABLE public.ai_analysis_logs ENABLE ROW LEVEL SECURITY;

-- Create policy for users to see only their own logs
DROP POLICY IF EXISTS "Users can view own AI analysis logs" ON public.ai_analysis_logs;
CREATE POLICY "Users can view own AI analysis logs"
    ON public.ai_analysis_logs
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

-- Create policy for users to insert their own logs
DROP POLICY IF EXISTS "Users can insert own AI analysis logs" ON public.ai_analysis_logs;
CREATE POLICY "Users can insert own AI analysis logs"
    ON public.ai_analysis_logs
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Grant permissions
GRANT SELECT, INSERT ON public.ai_analysis_logs TO authenticated;

COMMENT ON TABLE public.ai_analysis_logs IS 'Tracks AI board analysis usage, performance metrics, and user corrections for analytics and optimization';
