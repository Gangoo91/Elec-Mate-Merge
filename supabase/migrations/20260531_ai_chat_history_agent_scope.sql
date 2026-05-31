-- Scope chat sessions by surface so the apprentice tutor (Dave) and the
-- electrician assistant (Elec-AI) don't share history. Existing rows default to
-- 'assistant' (the original Elec-AI consumer); Dave's sessions tag 'dave'.
ALTER TABLE public.ai_chat_history
  ADD COLUMN IF NOT EXISTS agent text NOT NULL DEFAULT 'assistant';
