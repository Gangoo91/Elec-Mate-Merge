-- Agent Task Queue System
-- Tracks work forwarded between agents

CREATE TABLE IF NOT EXISTS public.agent_task_queue (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Source agent that created this task
  source_agent TEXT NOT NULL,
  
  -- Target agent that should handle this task
  target_agent TEXT NOT NULL,
  
  -- Context from previous agent
  context_data JSONB NOT NULL,
  
  -- User's original query/instruction for target agent
  user_instruction TEXT,
  
  -- Task status
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  
  -- Result from target agent (once completed)
  result JSONB,
  
  -- Metadata
  priority INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.agent_task_queue ENABLE ROW LEVEL SECURITY;

-- Users can view their own tasks
CREATE POLICY "Users can view their own agent tasks"
ON public.agent_task_queue
FOR SELECT
USING (auth.uid() = user_id);

-- Users can create their own tasks
CREATE POLICY "Users can create their own agent tasks"
ON public.agent_task_queue
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own tasks
CREATE POLICY "Users can update their own agent tasks"
ON public.agent_task_queue
FOR UPDATE
USING (auth.uid() = user_id);

-- Users can delete their own tasks
CREATE POLICY "Users can delete their own agent tasks"
ON public.agent_task_queue
FOR DELETE
USING (auth.uid() = user_id);

-- Index for faster queries
CREATE INDEX idx_agent_tasks_user_status ON public.agent_task_queue(user_id, status);
CREATE INDEX idx_agent_tasks_target_agent ON public.agent_task_queue(target_agent, status);

-- Trigger to update timestamp
CREATE TRIGGER update_agent_task_queue_updated_at
  BEFORE UPDATE ON public.agent_task_queue
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();