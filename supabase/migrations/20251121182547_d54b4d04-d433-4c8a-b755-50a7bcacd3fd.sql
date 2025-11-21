-- Remove unique constraint on design_knowledge.topic to allow multiple RAG entries per topic
-- This enables uploading multiple calculation examples, perspectives, and sources for the same topic
ALTER TABLE design_knowledge 
DROP CONSTRAINT IF EXISTS design_knowledge_topic_key;