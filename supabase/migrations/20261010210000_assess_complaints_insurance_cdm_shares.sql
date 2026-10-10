-- assess agent (ELE-2069 / ELE-2075 complaints / ELE-2076), 10 Oct 2026.
-- Additive only: three new tables (RLS on, labelled) and nullable insurance
-- columns on compliance_documents. Nothing HEAD reads changes shape.

-- 1. Complaints log (ELE-2075, feeds the scheme assessment pack ELE-2069).
create table if not exists public.employer_complaints (
  id uuid primary key default gen_random_uuid(),
  employer_id uuid not null,
  kind text not null default 'customer' check (kind in ('customer', 'data_protection')),
  received_on date not null default current_date,
  channel text not null default 'phone'
    check (channel in ('phone', 'email', 'letter', 'in_person', 'text', 'web', 'other')),
  complainant_name text,
  complainant_contact text,
  summary text not null check (length(btrim(summary)) > 0),
  job_id uuid references public.employer_jobs(id) on delete set null,
  owner_employee_id uuid references public.employer_employees(id) on delete set null,
  owner_name text,
  acknowledged_on date,
  response_due date,
  outcome text,
  outcome_kind text check (outcome_kind in ('upheld', 'partly_upheld', 'not_upheld', 'resolved', 'withdrawn')),
  ico_route_given boolean not null default false,
  closed_on date,
  created_by uuid default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists employer_complaints_employer_idx
  on public.employer_complaints (employer_id, received_on desc);
alter table public.employer_complaints enable row level security;
drop policy if exists "Firm managers manage complaints" on public.employer_complaints;
create policy "Firm managers manage complaints" on public.employer_complaints
  for all to authenticated
  using (employer_id in (select public.my_employer_scope()))
  with check (employer_id in (select public.my_employer_scope()));
drop trigger if exists employer_complaints_touch on public.employer_complaints;
create trigger employer_complaints_touch before update on public.employer_complaints
  for each row execute function public.update_updated_at_column();
comment on table public.employer_complaints is
  '[EMPLOYER HUB] The firm''s complaints log: customer complaints and data protection complaints (DUAA 2025 / DPA 2018 s.164A), with received date, channel, owner, acknowledgement, response due, outcome and closed date. Scope: employer_id = the firm (owner profiles.id); managers via my_employer_scope(). Used by: Compliance > Complaints, scheme assessment pack (ELE-2069). Rule: never shown to crew; export from Compliance.';

-- 2. Insurance register (ELE-2076): an insurance policy is a compliance
--    document (so notify_employer_expiries and the Overview to-do already
--    remind on it) with these extra, optional facts.
alter table public.compliance_documents
  add column if not exists insurance_kind text
    check (insurance_kind in ('public_liability', 'employers_liability', 'professional_indemnity',
                              'contract_works', 'vehicle', 'tools', 'other')),
  add column if not exists insurer text,
  add column if not exists policy_number text,
  add column if not exists cover_amount numeric check (cover_amount is null or cover_amount >= 0);
comment on column public.compliance_documents.insurance_kind is
  'ELE-2076: set when the document is an insurance policy. employers_liability is checked against the 5,000,000 pound legal minimum (ELCI Regulations 1998 reg 3).';

-- 3. CDM construction phase plan inputs per job (ELE-2076).
create table if not exists public.employer_cdm_plans (
  id uuid primary key default gen_random_uuid(),
  employer_id uuid not null,
  job_id uuid not null unique references public.employer_jobs(id) on delete cascade,
  firm_role text not null default 'only_contractor'
    check (firm_role in ('only_contractor', 'principal_contractor', 'contractor')),
  domestic_client boolean not null default true,
  working_days integer check (working_days is null or working_days >= 0),
  peak_workers integer check (peak_workers is null or peak_workers >= 0),
  person_days integer check (person_days is null or person_days >= 0),
  details jsonb not null default '{}'::jsonb,
  generated_at timestamptz,
  created_by uuid default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.employer_cdm_plans enable row level security;
drop policy if exists "Firm managers manage CDM plans" on public.employer_cdm_plans;
create policy "Firm managers manage CDM plans" on public.employer_cdm_plans
  for all to authenticated
  using (employer_id in (select public.my_employer_scope()))
  with check (employer_id in (select public.my_employer_scope())
              and exists (select 1 from public.employer_jobs j
                           where j.id = job_id and j.user_id = employer_id));
drop trigger if exists employer_cdm_plans_touch on public.employer_cdm_plans;
create trigger employer_cdm_plans_touch before update on public.employer_cdm_plans
  for each row execute function public.update_updated_at_column();
comment on table public.employer_cdm_plans is
  '[EMPLOYER HUB] CDM 2015 construction phase plan inputs for one job (firm role, domestic client, F10 threshold figures, welfare, emergency arrangements, site rules). Scope: employer_id = the firm; job_id -> employer_jobs. Used by: Compliance > Construction phase plan PDF. Rule: the PDF is rebuilt from this row and the live job, crew and RAMS each time.';

-- 4. "Send our pack" share links (ELE-2076). Owner/admin only.
create table if not exists public.employer_pack_shares (
  id uuid primary key default gen_random_uuid(),
  employer_id uuid not null,
  token text not null unique,
  questionnaire text not null default 'custom'
    check (questionnaire in ('chas', 'ssip', 'constructionline', 'custom')),
  recipient text,
  items jsonb not null default '[]'::jsonb,
  summary jsonb not null default '{}'::jsonb,
  expires_at timestamptz not null,
  revoked_at timestamptz,
  view_count integer not null default 0,
  last_viewed_at timestamptz,
  created_by uuid default auth.uid(),
  created_at timestamptz not null default now()
);
create index if not exists employer_pack_shares_employer_idx
  on public.employer_pack_shares (employer_id, created_at desc);
alter table public.employer_pack_shares enable row level security;
drop policy if exists "Owner and admins read pack shares" on public.employer_pack_shares;
create policy "Owner and admins read pack shares" on public.employer_pack_shares
  for select to authenticated
  using (public.can_see_firm_money(employer_id));
comment on table public.employer_pack_shares is
  '[EMPLOYER HUB → PUBLIC LINK] A "Send our pack" link for a main contractor''s prequalification (CHAS, SSIP, Constructionline or a custom list): the chosen certificates, insurance and policies, with an expiry. Scope: employer_id = the firm. Used by: Compliance > Send our pack, public /firm-pack/:token. Rule: owner/admin only (can_see_firm_money); written only by create_pack_share / revoke_pack_share; read signed-out only through get_pack_share_by_token.';
