-- Gap #10, 10 Oct 2026: the public liability policy and the competent person
-- scheme have ONE home, the firm's Settings record (company_profiles
-- insurance_* and registration_*). HEAD, build 49, the certificate PDFs, the
-- quote page and the lead page already read it there, so nothing has to be
-- copied or kept in step. The compliance register shows that record and edits
-- it in place (the same columns Settings writes); its certificate file is a
-- register row marked certificate_for, holding only the file, so the pack and
-- share links can sign it like any other register file. Every other cover
-- (employers' liability, professional indemnity, contract works, vans, tools)
-- and every prequal accreditation (CHAS, SafeContractor, Constructionline...)
-- lives on the register only.
--
-- Additive: one nullable column; new bodies for the two functions added in
-- 20261010284000 (same signatures; nothing outside this change calls them).

alter table public.compliance_documents
  add column if not exists certificate_for text
    check (certificate_for in ('settings_insurance', 'settings_scheme'));
comment on column public.compliance_documents.certificate_for is
  'Gap #10: set on a register row that only holds the certificate file for the Settings record (settings_insurance = company_profiles insurance_*, settings_scheme = registration_*). Such a row has no facts of its own (no renewal date, insurer or number), so it is never reminded or counted twice.';
create index if not exists compliance_documents_certificate_for_idx
  on public.compliance_documents (user_id, certificate_for) where certificate_for is not null;

-- Settings' policy and scheme, always (they are the record, not a fallback).
create or replace function public._settings_credentials()
returns table (
  firm uuid, area text, kind text, provider text, reference text,
  cover_amount numeric, cover_text text, expiry date, profile_id uuid, updated_at timestamptz)
language sql
stable
set search_path = public
as $$
  select cp.user_id, 'insurance', 'public_liability',
         case when lower(btrim(coalesce(cp.insurance_provider, '')))
                   in ('', 'other', 'n/a', 'na', 'none', 'unknown', '-', 'tbc') then null
              else btrim(cp.insurance_provider) end,
         nullif(btrim(cp.insurance_policy_number), ''),
         public._cover_amount_from_text(cp.insurance_coverage),
         nullif(btrim(cp.insurance_coverage), ''),
         cp.insurance_expiry, cp.id, cp.updated_at
    from public.company_profiles cp
   where cp.user_id is not null
     and (nullif(btrim(cp.insurance_provider), '') is not null
          or nullif(btrim(cp.insurance_policy_number), '') is not null
          or nullif(btrim(cp.insurance_coverage), '') is not null
          or cp.insurance_expiry is not null)
  union all
  select cp.user_id, 'accreditation', public._scheme_accreditation(cp.registration_scheme),
         case when public._scheme_accreditation(cp.registration_scheme) = 'other_scheme'
              then 'Competent person scheme' else upper(btrim(cp.registration_scheme)) end,
         nullif(btrim(cp.registration_number), ''),
         null::numeric, null::text,
         cp.registration_expiry, cp.id, cp.updated_at
    from public.company_profiles cp
   where cp.user_id is not null
     and public._scheme_accreditation(cp.registration_scheme) is not null
$$;
comment on function public._settings_credentials() is
  'Gap #10: the public liability policy and competent person scheme held in Settings (company_profiles), the one home for both. Read-only; feeds _firm_credentials and employer_expiry_items.';

create or replace function public._firm_credentials(p_firm uuid)
returns table (
  source text, document_id uuid, area text, kind text, title text, provider text,
  reference text, cover_amount numeric, cover_text text, expiry date,
  has_file boolean, file_url text, status text, updated_at timestamptz)
language sql
stable
security definer
set search_path = public
as $$
  select 'register', d.id,
         case when d.insurance_kind is not null then 'insurance' else 'accreditation' end,
         coalesce(d.insurance_kind, d.accreditation), d.title, nullif(btrim(d.insurer), ''),
         nullif(btrim(d.policy_number), ''), d.cover_amount, null::text, d.expiry_date,
         d.file_url is not null, d.file_url, d.status, d.updated_at
    from public.compliance_documents d
   where d.user_id = p_firm
     and d.certificate_for is null
     and (d.insurance_kind is not null or d.accreditation is not null)
     and coalesce(d.status, '') <> 'Draft'
  union all
  select 'settings', c.id, s.area, s.kind, c.title, s.provider, s.reference,
         s.cover_amount, s.cover_text, s.expiry, c.file_url is not null, c.file_url, 'Current',
         greatest(s.updated_at, c.updated_at)
    from public._settings_credentials() s
    left join lateral (
      select d.id, d.title, d.file_url, d.updated_at
        from public.compliance_documents d
       where d.user_id = s.firm
         and d.certificate_for = case s.area when 'insurance' then 'settings_insurance' else 'settings_scheme' end
       order by d.updated_at desc nulls last, d.created_at desc
       limit 1) c on true
   where s.firm = p_firm
$$;
comment on function public._firm_credentials(uuid) is
  'Gap #10: the one source for a firm''s insurance and accreditations. Settings rows (source settings: the public liability policy and competent person scheme, with document_id = the register row holding their certificate, if any) plus register policies and accreditations (source register). Internal; clients use get_firm_credentials.';

revoke all on function public._settings_credentials() from public, anon, authenticated;
revoke all on function public._firm_credentials(uuid) from public, anon, authenticated;
