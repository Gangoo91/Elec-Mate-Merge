-- ELE-1949 part 2: the public /attest-ojt/:id link let anyone holding it attest
-- under any name and email (regex-checked only), with no expiry.
-- Now the supervisor confirms a 6-digit code emailed to the address they give.
-- Codes are stored hashed (sha256 of entry id + code), expire after 15 minutes
-- and allow 5 attempts. Service-role only: no RLS policies are granted.
create table if not exists public.otj_attest_codes (
  id uuid primary key default gen_random_uuid(),
  entry_id uuid not null references public.college_otj_entries(id) on delete cascade,
  attester_name text not null,
  attester_email text not null,
  code_hash text not null,
  attempts int not null default 0,
  expires_at timestamptz not null,
  used_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists otj_attest_codes_entry_idx on public.otj_attest_codes (entry_id, created_at desc);
alter table public.otj_attest_codes enable row level security;
