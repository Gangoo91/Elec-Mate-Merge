-- First, delete duplicate entries in design_knowledge table
-- Keep only the most recent entry for each topic
DELETE FROM public.design_knowledge
WHERE id NOT IN (
  SELECT DISTINCT ON (topic) id
  FROM public.design_knowledge
  ORDER BY topic, created_at DESC NULLS LAST
);

-- Now add unique constraint
ALTER TABLE public.design_knowledge 
ADD CONSTRAINT design_knowledge_topic_key UNIQUE (topic);