-- Create conversations table for persistent conversation memory
CREATE TABLE IF NOT EXISTS public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  context_envelope JSONB NOT NULL DEFAULT '{}'::jsonb,
  last_agent TEXT,
  message_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  archived_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

-- Users can view their own conversations
CREATE POLICY "Users can view own conversations"
  ON public.conversations
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can create their own conversations
CREATE POLICY "Users can create own conversations"
  ON public.conversations
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own conversations
CREATE POLICY "Users can update own conversations"
  ON public.conversations
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own conversations
CREATE POLICY "Users can delete own conversations"
  ON public.conversations
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON public.conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_updated_at ON public.conversations(updated_at DESC);

-- Create performance_analytics table for monitoring RAG quality
CREATE TABLE IF NOT EXISTS public.performance_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  query_hash TEXT NOT NULL,
  query_text TEXT NOT NULL,
  agent_name TEXT NOT NULL,
  rag_time_ms INTEGER,
  ai_time_ms INTEGER,
  total_time_ms INTEGER NOT NULL,
  cache_hit BOOLEAN DEFAULT false,
  regulation_count INTEGER DEFAULT 0,
  quality_score NUMERIC(3,2),
  user_id UUID,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Enable RLS
ALTER TABLE public.performance_analytics ENABLE ROW LEVEL SECURITY;

-- Anyone authenticated can insert analytics
CREATE POLICY "Authenticated users can insert analytics"
  ON public.performance_analytics
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Users can view their own analytics
CREATE POLICY "Users can view own analytics"
  ON public.performance_analytics
  FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

-- Create indexes for analytics queries
CREATE INDEX IF NOT EXISTS idx_performance_analytics_agent ON public.performance_analytics(agent_name);
CREATE INDEX IF NOT EXISTS idx_performance_analytics_timestamp ON public.performance_analytics(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_performance_analytics_query_hash ON public.performance_analytics(query_hash);

-- Add trigger to update updated_at on conversations
CREATE OR REPLACE FUNCTION update_conversations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_conversations_timestamp
  BEFORE UPDATE ON public.conversations
  FOR EACH ROW
  EXECUTE FUNCTION update_conversations_updated_at();