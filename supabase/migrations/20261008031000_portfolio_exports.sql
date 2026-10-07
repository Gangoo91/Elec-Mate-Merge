-- ELE-1881 / ELE-1883 / ELE-2017 — portfolio export packs and EPAO gateway packs.
--
-- The edge function `portfolio-export-pack` builds, on request, an indexed
-- ZIP (index.html + manifest.json, the PDFMonkey summary, every evidence file
-- named and hashed, declarations, hours, audit trail) or a gateway pack (PDF
-- plus supporting files) and files it in the PRIVATE `portfolio-exports`
-- bucket. A pack never expires; the download link the function mints does
-- (24 hours). Each request is one row here, so the learner and the college see
-- a history of every pack made and who made it.
--
-- Writes are service-role only (the function); people read through RLS.

-- ── Bucket ─────────────────────────────────────────────────────────────────
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('portfolio-exports', 'portfolio-exports', false, 524288000,
        array['application/zip', 'application/pdf'])
on conflict (id) do update
  set public = false,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;
-- No storage.objects policies on purpose: nobody reads this bucket directly.
-- The function checks who is asking and mints a signed URL.

-- ── Table ──────────────────────────────────────────────────────────────────
create table if not exists public.portfolio_exports (
  id uuid primary key default gen_random_uuid(),
  learner_id uuid not null references auth.users(id) on delete cascade,
  college_student_id uuid references public.college_students(id) on delete set null,
  college_id uuid references public.colleges(id) on delete set null,
  kind text not null check (kind in ('evidence_pack', 'gateway_pack')),
  status text not null default 'building' check (status in ('building', 'ready', 'failed')),
  progress text,
  requested_by uuid references auth.users(id) on delete set null,
  requested_by_name text,
  requested_role text not null check (requested_role in ('learner', 'staff')),
  label text,
  zip_path text,
  pdf_path text,
  zip_bytes bigint,
  pdf_pages integer,
  file_count integer,
  counts jsonb not null default '{}'::jsonb,
  zip_sha256 text,
  error text,
  created_at timestamptz not null default now(),
  completed_at timestamptz,
  downloaded_at timestamptz
);

create index if not exists portfolio_exports_learner_idx on public.portfolio_exports (learner_id, created_at desc);
create index if not exists portfolio_exports_college_idx on public.portfolio_exports (college_id, created_at desc);

comment on table public.portfolio_exports is
  '[COLLEGE ↔ APPRENTICE] One row per portfolio export pack (indexed ZIP + PDF summary, ELE-1881) or EPAO gateway pack (ELE-1883) built by the portfolio-export-pack edge function. Scope: learner_id = the apprentice''s auth user; college_id = their college when made. Used by: apprentice Portfolio "Export my record", Student 360 More actions, Learner evidence pack page. Rule: written only by the edge function (service role); files live in the private portfolio-exports bucket and are reached only through signed links the function mints after checking the caller.';

alter table public.portfolio_exports enable row level security;

drop policy if exists "portfolio_exports: learner or assessing staff read" on public.portfolio_exports;
create policy "portfolio_exports: learner or assessing staff read"
  on public.portfolio_exports for select to authenticated
  using (learner_id = auth.uid() or public._can_assess(learner_id));

revoke all on public.portfolio_exports from anon;
revoke insert, update, delete on public.portfolio_exports from authenticated;
grant select on public.portfolio_exports to authenticated;

-- ── Who may export this learner? ───────────────────────────────────────────
-- 'learner' (their own record), 'staff' (anyone who can assess them:
-- assigned tutor/assessor/IQA, college assessing roles, linked assessor,
-- platform admin) or null. Called by the edge function WITH THE CALLER'S JWT,
-- so auth.uid() is the real caller and never a client-supplied id.
create or replace function public.portfolio_export_access(p_learner uuid)
returns text
language sql
stable
security definer
set search_path = public
as $$
  select case
    when auth.uid() is null or p_learner is null then null
    when auth.uid() = p_learner then 'learner'
    when public._can_assess(p_learner) then 'staff'
    else null
  end;
$$;

revoke all on function public.portfolio_export_access(uuid) from public, anon;
grant execute on function public.portfolio_export_access(uuid) to authenticated, service_role;

comment on function public.portfolio_export_access(uuid) is
  'ELE-1881: learner | staff | null — who the caller is to this learner for an export pack. Uses auth.uid(); called by portfolio-export-pack with the caller''s JWT.';
