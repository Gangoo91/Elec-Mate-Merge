create table if not exists course_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  course_key text not null,
  section_key text,
  progress_pct smallint default 0 check (progress_pct between 0 and 100),
  completed boolean default false,
  last_accessed_at timestamptz default now(),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, course_key)
);
alter table course_progress enable row level security;
create policy "Users manage own progress" on course_progress for all using (auth.uid() = user_id);
create index idx_course_progress_user on course_progress(user_id, last_accessed_at desc);
