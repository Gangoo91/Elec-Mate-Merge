-- Create RAMS generation jobs table for async processing
create table rams_generation_jobs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  
  -- Input data
  job_description text not null,
  project_info jsonb not null,
  job_scale text not null check (job_scale in ('domestic', 'commercial', 'industrial')),
  
  -- Job status
  status text not null default 'pending' check (status in ('pending', 'processing', 'complete', 'failed')),
  progress integer default 0 check (progress >= 0 and progress <= 100),
  current_step text,
  
  -- Results
  rams_data jsonb,
  method_data jsonb,
  raw_hs_response jsonb,
  raw_installer_response jsonb,
  
  -- Error handling
  error_message text,
  retry_count integer default 0,
  
  -- Timing
  created_at timestamp with time zone default now() not null,
  started_at timestamp with time zone,
  completed_at timestamp with time zone,
  
  -- Metadata
  generation_metadata jsonb default '{}'::jsonb
);

-- Index for efficient polling queries
create index idx_rams_jobs_user_status on rams_generation_jobs(user_id, status);
create index idx_rams_jobs_created on rams_generation_jobs(created_at desc);
create index idx_rams_jobs_pending on rams_generation_jobs(status) where status = 'pending';

-- Enable RLS
alter table rams_generation_jobs enable row level security;

-- Users can view their own jobs
create policy "Users can view their own jobs"
  on rams_generation_jobs for select
  using (auth.uid() = user_id);

-- Users can create their own jobs
create policy "Users can create their own jobs"
  on rams_generation_jobs for insert
  with check (auth.uid() = user_id);

-- Service role can update jobs (for background processing)
create policy "Service role can update jobs"
  on rams_generation_jobs for update
  using (true);