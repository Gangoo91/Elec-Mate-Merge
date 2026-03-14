-- ============================================================
-- project_documents — photos and drawings attached to projects
-- Added in PR #98 (feat/project-photos-drawings) but migration
-- was missing. This creates the table and storage bucket policy.
-- ============================================================

create table if not exists public.project_documents (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.spark_projects(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  file_path text not null,
  file_type text not null,
  file_size bigint,
  doc_type text not null check (doc_type in ('photo', 'drawing')),
  description text,
  uploaded_at timestamptz not null default now()
);

-- RLS
alter table public.project_documents enable row level security;

do $$ begin
  if not exists (
    select 1 from pg_policies where tablename = 'project_documents' and policyname = 'Users can view own project documents'
  ) then
    create policy "Users can view own project documents"
      on public.project_documents for select
      using (auth.uid() = user_id);
  end if;

  if not exists (
    select 1 from pg_policies where tablename = 'project_documents' and policyname = 'Users can insert own project documents'
  ) then
    create policy "Users can insert own project documents"
      on public.project_documents for insert
      with check (auth.uid() = user_id);
  end if;

  if not exists (
    select 1 from pg_policies where tablename = 'project_documents' and policyname = 'Users can delete own project documents'
  ) then
    create policy "Users can delete own project documents"
      on public.project_documents for delete
      using (auth.uid() = user_id);
  end if;
end $$;

-- Indexes
create index if not exists idx_project_documents_project
  on public.project_documents (project_id);

create index if not exists idx_project_documents_user
  on public.project_documents (user_id);

create index if not exists idx_project_documents_type
  on public.project_documents (project_id, doc_type);
