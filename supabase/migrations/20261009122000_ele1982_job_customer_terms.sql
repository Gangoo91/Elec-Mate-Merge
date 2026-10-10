-- ELE-1982: customer terms on the job.
--
-- The firm's terms (company_profiles.quote_terms, ELE-1149) stay the default
-- on every quote. The office can now give one job its own terms: either extra
-- clauses added to the firm's terms (an addendum) or a set that replaces them
-- for this job (e.g. plain-English commercial clauses for a main contractor).
--
-- 1. employer_job_customer_terms: one row per job that has its own terms.
--    Read by the firm (my_employer_scope); written only through
--    set_job_customer_terms, which needs the owner or an admin
--    (can_see_firm_money), the same rule as the firm terms.
-- 2. _effective_quote_terms(quote): the terms a quote prints. It returns the
--    same stored format the firm terms use ({selected, custom} JSON or legacy
--    lines), so the existing buildTermsList on the accept page and in the PDF
--    reads it unchanged.
-- 3. get_quote_terms_by_token (customer accept page) now returns the
--    effective terms; quote_terms_for_pdf (service role) feeds the PDF.
--
-- Additive. A quote with no job, or a job with no row, prints exactly what it
-- printed before.

create table if not exists public.employer_job_customer_terms (
  job_id uuid primary key references public.employer_jobs(id) on delete cascade,
  employer_id uuid not null,
  mode text not null default 'add' check (mode in ('add', 'replace')),
  terms text[] not null default '{}' check (cardinality(terms) <= 40),
  template_keys text[] not null default '{}',
  updated_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists employer_job_customer_terms_employer_idx
  on public.employer_job_customer_terms (employer_id);

comment on table public.employer_job_customer_terms is
  '[EMPLOYER HUB] Customer terms for one job: extra clauses added to the firm''s terms, or a set that replaces them for this job (ELE-1982). Scope: employer_id = the firm (owner profiles.id); job_id → employer_jobs; firm managers read via my_employer_scope(). Used by: Job sheet Customer terms, quote PDF and the customer accept page via _effective_quote_terms. Rule: Written only by set_job_customer_terms (owner or admin); no row = the firm''s terms.';

alter table public.employer_job_customer_terms enable row level security;

drop policy if exists employer_job_customer_terms_read on public.employer_job_customer_terms;
create policy employer_job_customer_terms_read on public.employer_job_customer_terms
  for select to authenticated
  using (employer_id in (select public.my_employer_scope()));

revoke all on public.employer_job_customer_terms from anon, public;
revoke insert, update, delete, truncate on public.employer_job_customer_terms from authenticated;
grant select on public.employer_job_customer_terms to authenticated;

-- ---------------------------------------------------------------- effective terms for a quote
create or replace function public._effective_quote_terms(p_quote_id uuid)
returns text
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_base text;
  v_job uuid;
  t public.employer_job_customer_terms%rowtype;
  v_json jsonb;
  v_sel jsonb;
  v_custom jsonb;
  i integer;
begin
  select cp.quote_terms, q.employer_job_id
    into v_base, v_job
    from public.quotes q
    left join public.company_profiles cp on cp.user_id = q.user_id
   where q.id = p_quote_id;

  if v_job is null then
    return v_base;
  end if;

  select * into t from public.employer_job_customer_terms where job_id = v_job;
  if not found or cardinality(t.terms) = 0 then
    return v_base;
  end if;

  -- The job's own clauses, in the stored custom-term shape.
  v_sel := '[]'::jsonb;
  v_custom := '[]'::jsonb;
  for i in 1 .. cardinality(t.terms) loop
    v_sel := v_sel || to_jsonb('custom_job_' || i);
    v_custom := v_custom || jsonb_build_object('id', 'custom_job_' || i, 'label', t.terms[i]);
  end loop;

  if t.mode = 'replace' then
    return jsonb_build_object('selected', v_sel, 'custom', v_custom)::text;
  end if;

  -- Addendum: the firm's terms first, then the job's.
  if v_base is null or btrim(v_base) = '' then
    -- No firm terms saved: the standard six the quote prints by default.
    return jsonb_build_object(
      'selected', '["payment_30","deposit_required","warranty_workmanship","bs7671_compliance","testing_cert","price_validity"]'::jsonb || v_sel,
      'custom', v_custom)::text;
  end if;

  begin
    v_json := v_base::jsonb;
  exception when others then
    v_json := null;
  end;

  if v_json is not null and jsonb_typeof(v_json) = 'object' and jsonb_typeof(v_json->'selected') = 'array' then
    return jsonb_build_object(
      'selected', (v_json->'selected') || v_sel,
      'custom', coalesce(case when jsonb_typeof(v_json->'custom') = 'array' then v_json->'custom' end, '[]'::jsonb) || v_custom)::text;
  end if;

  if v_json is not null then
    -- JSON in another shape prints the three fallback defaults today.
    return jsonb_build_object(
      'selected', '["payment_30","warranty_workmanship","bs7671_compliance"]'::jsonb || v_sel,
      'custom', v_custom)::text;
  end if;

  -- Legacy plain text: one term per line.
  return rtrim(v_base, E'\n') || E'\n' || array_to_string(t.terms, E'\n');
end;
$$;

comment on function public._effective_quote_terms(uuid) is
  'ELE-1982: the terms a quote prints: the firm''s terms, plus or replaced by its job''s terms. Same stored format as company_profiles.quote_terms. Internal.';
revoke all on function public._effective_quote_terms(uuid) from public, anon, authenticated;

-- Customer accept page (public, by token). Same signature and return type.
create or replace function public.get_quote_terms_by_token(token_param text)
returns text
language sql
stable
security definer
set search_path = public
as $$
  select public._effective_quote_terms(q.id)
    from public.quotes q
   where q.public_token = public.resolve_quote_public_token(token_param)
     and q.public_token is not null
   limit 1;
$$;

-- The quote PDF (generate-pdf-monkey, service role).
create or replace function public.quote_terms_for_pdf(p_quote_id uuid)
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'terms', public._effective_quote_terms(p_quote_id),
    'job_terms', exists (
      select 1 from public.quotes q
        join public.employer_job_customer_terms t on t.job_id = q.employer_job_id
       where q.id = p_quote_id and cardinality(t.terms) > 0));
$$;

comment on function public.quote_terms_for_pdf(uuid) is
  'ELE-1982: effective customer terms for a quote PDF. Service role only.';
revoke all on function public.quote_terms_for_pdf(uuid) from public, anon, authenticated;
grant execute on function public.quote_terms_for_pdf(uuid) to service_role;

-- ---------------------------------------------------------------- read for the job sheet
create or replace function public.job_customer_terms(p_job_id uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  j record;
  t public.employer_job_customer_terms%rowtype;
  v_firm_terms text;
  v_by text;
  v_quotes integer;
  v_has boolean;
begin
  if auth.uid() is null then
    return jsonb_build_object('error', 'not_authenticated');
  end if;

  select id, user_id into j
    from public.employer_jobs
   where id = p_job_id
     and user_id in (select public.my_employer_scope());
  if not found then
    return jsonb_build_object('error', 'not_found');
  end if;

  select cp.quote_terms into v_firm_terms
    from public.company_profiles cp where cp.user_id = j.user_id limit 1;

  select * into t from public.employer_job_customer_terms where job_id = j.id;
  v_has := found and cardinality(t.terms) > 0;
  if v_has and t.updated_by is not null then
    select nullif(btrim(full_name), '') into v_by from public.profiles where id = t.updated_by;
  end if;

  select count(*) into v_quotes from public.quotes q where q.employer_job_id = j.id;

  return jsonb_build_object(
    'firm_terms', v_firm_terms,
    'has_job_terms', v_has,
    'mode', case when v_has then t.mode end,
    'terms', case when v_has then to_jsonb(t.terms) else '[]'::jsonb end,
    'template_keys', case when v_has then to_jsonb(t.template_keys) else '[]'::jsonb end,
    'updated_at', case when v_has then t.updated_at end,
    'updated_by_name', v_by,
    'quote_count', v_quotes,
    'can_edit', public.can_see_firm_money(j.user_id));
end;
$$;

comment on function public.job_customer_terms(uuid) is
  'ELE-1982: the firm''s customer terms and this job''s own terms (if any), for the job sheet. Firm-scoped.';
revoke all on function public.job_customer_terms(uuid) from public, anon;
grant execute on function public.job_customer_terms(uuid) to authenticated;

-- ---------------------------------------------------------------- write (owner or admin)
create or replace function public.set_job_customer_terms(
  p_job_id uuid,
  p_mode text,
  p_terms text[],
  p_template_keys text[] default '{}'
)
returns jsonb
language plpgsql
volatile
security definer
set search_path = public
as $$
declare
  j record;
  v_terms text[];
begin
  if auth.uid() is null then
    raise exception 'Sign in first' using errcode = '42501';
  end if;

  select id, user_id into j
    from public.employer_jobs
   where id = p_job_id
     and user_id in (select public.my_employer_scope());
  if not found then
    return jsonb_build_object('error', 'not_found');
  end if;

  if not public.can_see_firm_money(j.user_id) then
    raise exception 'Only the owner or an admin can change customer terms' using errcode = '42501';
  end if;

  if coalesce(p_mode, 'add') not in ('add', 'replace') then
    raise exception 'Unknown terms mode' using errcode = '22023';
  end if;

  v_terms := array(
    select left(btrim(regexp_replace(x, '\s+', ' ', 'g')), 600)
      from unnest(coalesce(p_terms, '{}')) with ordinality as u(x, n)
     where btrim(coalesce(x, '')) <> ''
     order by n
  );

  if cardinality(v_terms) > 40 then
    raise exception 'Too many terms (40 at most)' using errcode = '22023';
  end if;

  -- No terms = back to the firm's terms.
  if cardinality(v_terms) = 0 then
    delete from public.employer_job_customer_terms where job_id = j.id;
    return jsonb_build_object('ok', true, 'has_job_terms', false);
  end if;

  insert into public.employer_job_customer_terms
    (job_id, employer_id, mode, terms, template_keys, updated_by, updated_at)
  values
    (j.id, j.user_id, coalesce(p_mode, 'add'), v_terms,
     coalesce(p_template_keys[1:40], '{}'), auth.uid(), now())
  on conflict (job_id) do update
    set mode = excluded.mode,
        terms = excluded.terms,
        template_keys = excluded.template_keys,
        updated_by = excluded.updated_by,
        updated_at = now();

  return jsonb_build_object('ok', true, 'has_job_terms', true, 'count', cardinality(v_terms));
end;
$$;

comment on function public.set_job_customer_terms(uuid, text, text[], text[]) is
  'ELE-1982: set (or clear, with no terms) one job''s customer terms: add to or replace the firm''s terms. Owner or admin only.';
revoke all on function public.set_job_customer_terms(uuid, text, text[], text[]) from public, anon;
grant execute on function public.set_job_customer_terms(uuid, text, text[], text[]) to authenticated;
