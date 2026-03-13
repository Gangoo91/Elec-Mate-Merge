CREATE TABLE ai_chat_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'New Chat',
  messages JSONB NOT NULL DEFAULT '[]'::jsonb,
  message_count INTEGER NOT NULL DEFAULT 0,
  last_message_preview TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  archived_at TIMESTAMPTZ
);

CREATE INDEX idx_ai_chat_history_user_id ON ai_chat_history(user_id);
CREATE INDEX idx_ai_chat_history_updated_at ON ai_chat_history(updated_at DESC);

ALTER TABLE ai_chat_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own AI chat history"
  ON ai_chat_history FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
