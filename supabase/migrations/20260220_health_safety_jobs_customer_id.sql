-- Add customer_id FK to health_safety_jobs table
-- This enables linking RAMS/safety documentation to customers
ALTER TABLE health_safety_jobs
  ADD COLUMN customer_id UUID REFERENCES customers(id);

CREATE INDEX idx_health_safety_jobs_customer ON health_safety_jobs(customer_id);
