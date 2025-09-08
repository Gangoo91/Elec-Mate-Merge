-- Trigger batch processing by inserting a job
INSERT INTO batch_jobs (job_type, status, total_batches, completed_batches, progress_percentage)
VALUES ('materials-scraping', 'pending', 1, 0, 0);