-- Test the materials cache updater to trigger batch processing
INSERT INTO batch_jobs (job_type, status, batches_total, batches_completed, progress_percentage)
VALUES ('materials-scraping', 'pending', 0, 0, 0)
ON CONFLICT DO NOTHING;