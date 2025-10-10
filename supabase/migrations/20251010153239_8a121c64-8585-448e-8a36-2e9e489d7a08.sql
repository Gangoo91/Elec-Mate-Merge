-- ============================================
-- PHASE 5 + AI LEARNING SYSTEM + PHASE 6
-- Complete Implementation: All Tables
-- ============================================

-- ===== LAYER 1: FEEDBACK CAPTURE =====

-- AI Interaction Feedback Table
CREATE TABLE IF NOT EXISTS public.ai_interaction_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES public.conversation_memory(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  agent_name text NOT NULL CHECK (agent_name IN ('designer', 'cost-engineer', 'installer', 'health-safety', 'commissioning')),
  question text NOT NULL,
  ai_response text NOT NULL,
  structured_data jsonb DEFAULT '{}'::jsonb,
  user_rating integer CHECK (user_rating IN (1, -1)), -- thumbs up/down
  user_correction text,
  user_edit jsonb,
  feedback_type text CHECK (feedback_type IN ('rating', 'correction', 'edit')),
  created_at timestamptz DEFAULT now()
);

-- Indexes for feedback
CREATE INDEX idx_feedback_agent ON public.ai_interaction_feedback(agent_name);
CREATE INDEX idx_feedback_rating ON public.ai_interaction_feedback(user_rating);
CREATE INDEX idx_feedback_created ON public.ai_interaction_feedback(created_at DESC);
CREATE INDEX idx_feedback_user ON public.ai_interaction_feedback(user_id);

-- RLS Policies for feedback
ALTER TABLE public.ai_interaction_feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can submit feedback"
  ON public.ai_interaction_feedback
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users view own feedback"
  ON public.ai_interaction_feedback
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- ===== LAYER 2: PATTERN ANALYSIS =====

-- Learning Review Queue Table
CREATE TABLE IF NOT EXISTS public.learning_review_queue (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  feedback_id uuid REFERENCES public.ai_interaction_feedback(id) ON DELETE SET NULL,
  issue_type text NOT NULL CHECK (issue_type IN ('pattern', 'single_error', 'knowledge_gap')),
  agent_name text NOT NULL,
  ai_answer text NOT NULL,
  user_correction text,
  pattern_frequency integer DEFAULT 1,
  suggested_knowledge_update jsonb, -- {topic, content, source, metadata}
  suggested_prompt_change text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'implemented')),
  reviewed_by uuid REFERENCES auth.users(id),
  reviewed_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Indexes for review queue
CREATE INDEX idx_review_status ON public.learning_review_queue(status);
CREATE INDEX idx_review_agent ON public.learning_review_queue(agent_name);
CREATE INDEX idx_review_created ON public.learning_review_queue(created_at DESC);

-- RLS Policies for review queue (admin only)
ALTER TABLE public.learning_review_queue ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage review queue"
  ON public.learning_review_queue
  FOR ALL
  TO service_role
  USING (true);

-- ===== LAYER 3: KNOWLEDGE BASE CHANGELOG =====

-- Knowledge Base Changelog Table
CREATE TABLE IF NOT EXISTS public.knowledge_base_changelog (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  table_name text NOT NULL CHECK (table_name IN ('design_knowledge', 'health_safety_knowledge', 'installation_knowledge', 'inspection_testing_knowledge', 'project_mgmt_knowledge')),
  action text NOT NULL CHECK (action IN ('insert', 'update', 'delete')),
  record_id uuid,
  previous_content text,
  new_content text,
  change_reason text,
  changed_by uuid REFERENCES auth.users(id),
  source_feedback_id uuid REFERENCES public.ai_interaction_feedback(id),
  created_at timestamptz DEFAULT now()
);

-- Indexes for changelog
CREATE INDEX idx_changelog_table ON public.knowledge_base_changelog(table_name);
CREATE INDEX idx_changelog_created ON public.knowledge_base_changelog(created_at DESC);
CREATE INDEX idx_changelog_action ON public.knowledge_base_changelog(action);

-- RLS Policies for changelog (admin only)
ALTER TABLE public.knowledge_base_changelog ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage changelog"
  ON public.knowledge_base_changelog
  FOR ALL
  TO service_role
  USING (true);