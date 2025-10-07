-- Create persistent conversation memory table
CREATE TABLE IF NOT EXISTS public.conversation_memory (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  conversation_id UUID NOT NULL,
  project_type TEXT,
  circuits JSONB DEFAULT '[]'::jsonb,
  key_decisions JSONB DEFAULT '[]'::jsonb,
  technical_specs JSONB DEFAULT '{}'::jsonb,
  agent_outputs JSONB DEFAULT '[]'::jsonb,
  reasoning_chains TEXT[],
  constraints JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.conversation_memory ENABLE ROW LEVEL SECURITY;

-- Users can manage their own conversation memory
CREATE POLICY "Users can manage own conversation memory"
  ON public.conversation_memory
  FOR ALL
  USING (auth.uid() = user_id);

-- Create index for faster lookups
CREATE INDEX idx_conversation_memory_user_conversation 
  ON public.conversation_memory(user_id, conversation_id);

-- Add trigger to update timestamps
CREATE TRIGGER update_conversation_memory_timestamp
  BEFORE UPDATE ON public.conversation_memory
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();