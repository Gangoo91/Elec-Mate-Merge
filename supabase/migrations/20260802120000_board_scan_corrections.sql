-- Board scanner correction capture.
-- Logs each field a user changes while reviewing an AI board scan (plus
-- mark-spare events), so scanner accuracy can be measured against real
-- mistakes and the prompts improved. Additive only — no existing objects
-- are touched. The frontend inserts fire-and-forget and tolerates this
-- table not existing yet.

create table if not exists public.board_scan_corrections (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  user_id uuid references auth.users(id) on delete set null,
  report_id text,
  position int,
  field text not null,
  ai_value text,
  user_value text,
  ai_confidence text,
  board_brand text,
  board_model text
);

alter table public.board_scan_corrections enable row level security;

create policy "Users can insert their own scan corrections"
  on public.board_scan_corrections
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can view their own scan corrections"
  on public.board_scan_corrections
  for select
  to authenticated
  using (auth.uid() = user_id);

create index if not exists board_scan_corrections_user_created_idx
  on public.board_scan_corrections (user_id, created_at desc);
