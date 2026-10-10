-- Gap #10 (ELE-2076 follow-up), 10 Oct 2026: one source for insurance and prequal.
--
-- Before this, insurance lived in two places that disagreed on live data:
-- company_profiles.insurance_* (Settings, 61 firms) and the new compliance
-- register (compliance_documents.insurance_kind, 0 rows). The assessment pack
-- read only the register, so it told those firms they had no public liability.
--
-- The one source is now _firm_credentials(firm): every insurance policy and
-- accreditation on the register, plus, until the firm puts the same thing on
-- the register, the policy and competent person scheme typed in Settings
-- (read-only, never copied). Nothing is written to anyone's data here.
--
-- Additive only: one nullable column, new functions. HEAD and build 49 never
-- read compliance_documents.accreditation or call these functions.

-- 1. Accreditations on the register: competent person schemes (the same list
--    as Settings' scheme picker, src/constants/schemeLogos.ts) and the
--    prequalification schemes main contractors ask for.
alter table public.compliance_documents
  add column if not exists accreditation text
    check (accreditation in (
      'niceic', 'napit', 'elecsa', 'stroma', 'oftec', 'besca', 'bre', 'other_scheme',
      'chas', 'safecontractor', 'constructionline', 'smas', 'acclaim',
      'iso9001', 'iso45001', 'other'));
comment on column public.compliance_documents.accreditation is
  'Gap #10: set when the document is a scheme membership or accreditation. Competent person schemes (niceic, napit, elecsa, stroma, oftec, besca, bre, other_scheme) mirror company_profiles.registration_* both ways; prequalification schemes (chas, safecontractor, constructionline, smas, acclaim, iso9001, iso45001, other) are register-only. Membership number lives in policy_number.';

-- 2. Small helpers.
create or replace function public._cover_amount_from_text(p text)
returns numeric
language plpgsql
immutable
set search_path = public
as $$
declare
  v text := replace(replace(lower(coalesce(p, '')), ',', ''), ' ', '');
  m text[];
  n numeric;
begin
  m := regexp_match(v, '(\d+(?:\.\d+)?)(million|mil|m|k)?');
  if m is null then return null; end if;
  n := m[1]::numeric;
  if m[2] in ('million', 'mil', 'm') then n := n * 1000000;
  elsif m[2] = 'k' then n := n * 1000;
  end if;
  if n <= 0 or n > 100000000000 then return null; end if;
  return round(n);
end;
$$;
comment on function public._cover_amount_from_text(text) is
  'Gap #10: a limit of cover in pounds from Settings'' free text (e.g. "£2,000,000", "2m", "5000000"). Null when there is no number.';

create or replace function public._cover_amount_text(p numeric)
returns text
language sql
immutable
set search_path = public
as $$
  select case when p is null then null else '£' || to_char(round(p), 'FM999,999,999,999,990') end;
$$;

create or replace function public._scheme_accreditation(p text)
returns text
language sql
immutable
set search_path = public
as $$
  select case upper(btrim(coalesce(p, '')))
    when '' then null when 'NONE' then null
    when 'NICEIC' then 'niceic' when 'NAPIT' then 'napit' when 'ELECSA' then 'elecsa'
    when 'STROMA' then 'stroma' when 'OFTEC' then 'oftec' when 'BESCA' then 'besca'
    when 'BRE' then 'bre'
    else 'other_scheme' end;
$$;

create or replace function public._accreditation_scheme(p text)
returns text
language sql
immutable
set search_path = public
as $$
  select case p
    when 'niceic' then 'NICEIC' when 'napit' then 'NAPIT' when 'elecsa' then 'ELECSA'
    when 'stroma' then 'STROMA' when 'oftec' then 'OFTEC' when 'besca' then 'BESCA'
    when 'bre' then 'BRE' when 'other_scheme' then 'other'
    else null end;
$$;

create or replace function public._is_cps_accreditation(p text)
returns boolean
language sql
immutable
set search_path = public
as $$
  select coalesce(p in ('niceic', 'napit', 'elecsa', 'stroma', 'oftec', 'besca', 'bre', 'other_scheme'), false);
$$;

-- 3. What Settings holds that the register does not (yet). One row per firm
--    per area, only while the register has no live row of the same kind.
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
     and not exists (
       select 1 from public.compliance_documents d
        where d.user_id = cp.user_id and d.insurance_kind = 'public_liability'
          and coalesce(d.status, '') <> 'Draft')
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
     and not exists (
       select 1 from public.compliance_documents d
        where d.user_id = cp.user_id and public._is_cps_accreditation(d.accreditation)
          and coalesce(d.status, '') <> 'Draft')
$$;
comment on function public._settings_credentials() is
  'Gap #10: the public liability policy and competent person scheme typed in Settings (company_profiles), for firms whose register does not hold the same thing yet. Read-only; feeds _firm_credentials and employer_expiry_items.';

-- 4. The one source: the register plus whatever Settings still holds alone.
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
     and (d.insurance_kind is not null or d.accreditation is not null)
     and coalesce(d.status, '') <> 'Draft'
  union all
  select 'settings', null::uuid, s.area, s.kind, null::text, s.provider, s.reference,
         s.cover_amount, s.cover_text, s.expiry, false, null::text, 'Current', s.updated_at
    from public._settings_credentials() s
   where s.firm = p_firm
$$;
comment on function public._firm_credentials(uuid) is
  'Gap #10: the one source for a firm''s insurance and accreditations. Register rows (source register) plus the Settings policy and scheme while the register has no row of the same kind (source settings). Internal; clients use get_firm_credentials.';

create or replace function public.get_firm_credentials(p_firm uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if auth.uid() is null or p_firm is null or p_firm not in (select public.my_employer_scope()) then
    raise exception 'NOT_AUTHORISED' using errcode = '42501';
  end if;
  return coalesce((
    select jsonb_agg(to_jsonb(c) order by c.area desc, c.kind, c.expiry desc nulls last)
      from public._firm_credentials(p_firm) c), '[]'::jsonb);
end;
$$;
comment on function public.get_firm_credentials(uuid) is
  'Gap #10: a firm''s insurance and accreditations from the one source (_firm_credentials), for the owner and admins (my_employer_scope). Used by Compliance, Settings, the assessment pack, Send our pack and the tender prequal answers.';

revoke all on function public._cover_amount_from_text(text) from public, anon;
revoke all on function public._cover_amount_text(numeric) from public, anon;
revoke all on function public._scheme_accreditation(text) from public, anon;
revoke all on function public._accreditation_scheme(text) from public, anon;
revoke all on function public._is_cps_accreditation(text) from public, anon;
revoke all on function public._settings_credentials() from public, anon, authenticated;
revoke all on function public._firm_credentials(uuid) from public, anon, authenticated;
revoke all on function public.get_firm_credentials(uuid) from public, anon;
grant execute on function public.get_firm_credentials(uuid) to authenticated;
