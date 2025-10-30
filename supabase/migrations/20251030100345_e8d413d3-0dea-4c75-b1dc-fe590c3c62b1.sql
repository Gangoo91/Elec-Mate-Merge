-- Phase 1: Clear Everything for Fresh Start
-- Clear all existing single-faceted intelligence records
DELETE FROM regulations_intelligence;

-- Clear any batch jobs for regulations enrichment
DELETE FROM batch_jobs WHERE job_type = 'enrich-regulations';

-- Clear orphaned batch progress entries
DELETE FROM batch_progress 
WHERE job_id NOT IN (SELECT id FROM batch_jobs);