-- Create quiz_results table for storing quiz/assessment results
CREATE TABLE IF NOT EXISTS public.quiz_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  assessment_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  total_questions INTEGER NOT NULL DEFAULT 0,
  percentage NUMERIC(5,2) NOT NULL DEFAULT 0,
  time_spent INTEGER NOT NULL DEFAULT 0,
  correct_answers INTEGER NOT NULL DEFAULT 0,
  incorrect_answers INTEGER NOT NULL DEFAULT 0,
  category_breakdown JSONB DEFAULT '{}',
  question_results JSONB DEFAULT '[]',
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_quiz_results_user_id ON public.quiz_results(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_completed_at ON public.quiz_results(completed_at DESC);
CREATE INDEX IF NOT EXISTS idx_quiz_results_assessment_id ON public.quiz_results(assessment_id);

-- Enable RLS
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;

-- RLS policies: users can only see and manage their own results
CREATE POLICY "Users can view their own quiz results"
  ON public.quiz_results FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own quiz results"
  ON public.quiz_results FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own quiz results"
  ON public.quiz_results FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own quiz results"
  ON public.quiz_results FOR DELETE
  USING (auth.uid() = user_id);

-- Add comment
COMMENT ON TABLE public.quiz_results IS 'Stores quiz and assessment results for users in the Study Centre';
