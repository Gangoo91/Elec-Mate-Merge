-- Create voice_sessions table for conversational context persistence
CREATE TABLE public.voice_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_key TEXT UNIQUE NOT NULL,
  context JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index for fast session lookup
CREATE INDEX idx_voice_sessions_key ON public.voice_sessions(session_key);

-- Enable RLS
ALTER TABLE public.voice_sessions ENABLE ROW LEVEL SECURITY;

-- Allow all access (no auth in this app)
CREATE POLICY "Allow all access to voice_sessions" ON public.voice_sessions
  FOR ALL USING (true) WITH CHECK (true);