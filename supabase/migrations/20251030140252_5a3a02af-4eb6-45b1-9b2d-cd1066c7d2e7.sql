-- Complete Fresh Start for Regulations Enrichment
-- Phase 1: Clean Slate - Remove ALL orphaned batch_progress records
DELETE FROM batch_progress 
WHERE job_id IS NULL 
   OR job_id NOT IN (SELECT id FROM batch_jobs);

-- Phase 2: Create fresh job for regulations enrichment
-- Total: 2557 regulations ÷ 15 per batch = 171 batches
INSERT INTO batch_jobs (
  job_type,
  status,
  total_batches,
  completed_batches,
  current_batch,
  progress_percentage,
  metadata
) VALUES (
  'enrich_regulations',
  'pending',
  171,
  0,
  0,
  0,
  jsonb_build_object(
    'source_table', 'bs7671_embeddings',
    'target_table', 'regulations_intelligence',
    'batch_size', 15,
    'total_items', 2557,
    'model', 'gpt-4o-mini',
    'temperature', 0.7
  )
)
ON CONFLICT DO NOTHING;