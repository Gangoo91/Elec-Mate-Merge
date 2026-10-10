-- ELE-1982 — Contracts belong with People: sent and signed from the person.
--
-- Contracts carry pay (salary, hourly, day rate), so they are owner/admin
-- only (can_see_firm_money). Office managers see a status line on the person
-- — never the document or the rate.
--
-- 1. contracts RLS: the firm-manager policy now requires can_see_firm_money.
--    signature_requests gets a RESTRICTIVE select rule: a Contract request
--    (its frozen snapshot holds the pay) is readable only by money roles.
-- 2. send_person_contract(...)  — People → person → Send contract: fills the
--    template from the person and the firm, files it on the person (Draft),
--    opens a signing request on the existing Signatures rail and pushes the
--    worker so they can sign in Worker Tools.
-- 3. person_contracts(employee) — status only (no content, no value) for the
--    person's record; any firm manager may read it.
-- 4. my_contracts()             — the worker's own contracts and signing
--    links, for Worker Tools → Sign-offs.
-- 5. set_firm_customer_terms(text) — the firm's customer terms (the
--    company_profiles.quote_terms that the quote PDF and the client's accept
--    page already show, ELE-1149), editable by an admin, not only the owner.
--
-- No new tables.

-- ---------------------------------------------------------------- 1. RLS
drop policy if exists "Firm managers manage contracts" on public.contracts;
create policy "Firm money roles manage contracts" on public.contracts
  for all to authenticated
  using (public.can_see_firm_money(user_id))
  with check (public.can_see_firm_money(user_id));

drop policy if exists "Contract signing requests are money roles only" on public.signature_requests;
create policy "Contract signing requests are money roles only" on public.signature_requests
  as restrictive
  for select to authenticated
  using (document_type is distinct from 'Contract' or public.can_see_firm_money(user_id));

-- ---------------------------------------------------------------- 2. send
create or replace function public.send_person_contract(
  p_employee_id uuid,
  p_template_id uuid,
  p_values jsonb default '{}'::jsonb,
  p_start_date date default null,
  p_end_date date default null,
  p_signer_email text default null,
  p_message text default null
)
returns jsonb
language plpgsql
volatile
security definer
set search_path = public
as $$
declare
  v_firm uuid := public.my_default_employer_id();
  e public.employer_employees%rowtype;
  t public.employment_contract_templates%rowtype;
  v_company text;
  v_address text;
  v_values jsonb;
  v_content text;
  v_key text;
  v_val text;
  v_ph text;
  v_first text;
  v_contract uuid;
  v_req jsonb;
  v_email text;
begin
  if auth.uid() is null then
    raise exception 'Sign in first' using errcode = '42501';
  end if;
  if v_firm is null or not public.can_see_firm_money(v_firm) then
    raise exception 'Only the owner or an admin can send contracts. They carry pay.' using errcode = '42501';
  end if;

  select * into e from public.employer_employees where id = p_employee_id and employer_id = v_firm;
  if not found then
    raise exception 'That person is not on your team' using errcode = '42501';
  end if;

  select * into t from public.employment_contract_templates
   where id = p_template_id and coalesce(is_active, true)
     and category in ('Employment', 'Subcontractor', 'HR Letters');
  if not found then
    raise exception 'Choose a contract template' using errcode = '22023';
  end if;

  if p_end_date is not null and p_start_date is not null and p_end_date < p_start_date then
    raise exception 'The end date is before the start date' using errcode = '22023';
  end if;
  if length(coalesce(p_message, '')) > 1000 then
    raise exception 'Keep the message under 1,000 characters' using errcode = '22023';
  end if;

  select nullif(btrim(cp.company_name), ''), nullif(btrim(cp.company_address), '')
    into v_company, v_address
    from public.company_profiles cp where cp.user_id = v_firm limit 1;

  v_first := split_part(btrim(coalesce(e.name, '')), ' ', 1);

  -- What we already know, then whatever the office typed (their values win).
  v_values := jsonb_strip_nulls(jsonb_build_object(
      '[Company Name]', v_company,
      '[Company Address]', v_address,
      '[Employee Name]', e.name,
      '[Subcontractor Name]', e.name,
      '[Candidate Name]', e.name,
      '[Employee First Name]', nullif(v_first, ''),
      '[Candidate First Name]', nullif(v_first, ''),
      '[Date]', to_char(current_date, 'DD/MM/YYYY'),
      '[Start Date]', to_char(p_start_date, 'DD/MM/YYYY'),
      '[End Date]', to_char(p_end_date, 'DD/MM/YYYY')))
    || coalesce(p_values, '{}'::jsonb);

  v_content := coalesce(t.content, '');
  -- 14 of the 15 templates were stored entity-escaped ("&lt;h2&gt;"), which
  -- every viewer then showed as literal tags. Decode those to real HTML.
  if position('<' in v_content) = 0 and position('&lt;' in v_content) > 0 then
    v_content := replace(replace(replace(replace(replace(v_content,
                   '&lt;', '<'), '&gt;', '>'), '&quot;', '"'), '&#39;', ''''), '&amp;', '&');
  end if;
  -- Two-column "Label: value" tables become paragraphs: the contract editor
  -- (TipTap, no table support) ran the cells together into one line.
  v_content := regexp_replace(v_content, '</t[dh]>\s*<t[dh][^>]*>', ' ', 'g');
  v_content := regexp_replace(v_content, '<tr[^>]*>\s*<t[dh][^>]*>', '<p>', 'g');
  v_content := regexp_replace(v_content, '</t[dh]>\s*</tr>', '</p>', 'g');
  v_content := regexp_replace(v_content, '</?(table|tbody|thead)[^>]*>', '', 'g');
  for v_key, v_val in select key, value from jsonb_each_text(v_values) loop
    if v_key ~ '^\[[^\]]{1,60}\]$' and nullif(btrim(coalesce(v_val, '')), '') is not null then
      -- Escape: the template is HTML, the office's text is not.
      v_val := replace(replace(replace(left(btrim(v_val), 500), '&', '&amp;'), '<', '&lt;'), '>', '&gt;');
      v_content := replace(v_content, v_key, v_val);
    end if;
  end loop;
  -- Anything still unfilled reads as a blank to complete by hand, not a code.
  foreach v_ph in array coalesce(t.placeholders, '{}') loop
    v_content := replace(v_content, v_ph, '____________');
  end loop;

  insert into public.contracts (
    user_id, employee_id, template_id, contract_type, category, title, party_name,
    content, start_date, end_date, status, is_template, adopted_at)
  values (
    v_firm, e.id, t.id,
    case when t.category = 'Subcontractor' then 'Subcontractor' else 'Employment' end,
    t.category, t.name, e.name, v_content, p_start_date, p_end_date, 'Draft', false, now())
  returning id into v_contract;

  v_email := coalesce(nullif(lower(btrim(coalesce(p_signer_email, ''))), ''),
                      nullif(lower(btrim(coalesce(e.email, ''))), ''));

  v_req := public.create_signature_request('Contract', v_contract, e.name, v_email, null,
                                           p_message, 30, '{}'::jsonb);

  if e.user_id is not null then
    perform public._notify_push(
      e.user_id, 'contract_to_sign', 'A contract to sign',
      left(coalesce(v_company, 'Your firm') || ' sent you ' || t.name
           || '. Read it and sign in Worker Tools, Sign-offs.', 300),
      jsonb_build_object('ref_id', v_contract::text, 'route', '/electrician/worker-tools/signoffs',
                         'push_type', 'team'),
      'messages', 1::smallint);
  end if;

  return jsonb_build_object(
    'ok', true,
    'contract_id', v_contract,
    'request_id', v_req->>'id',
    'access_token', v_req->>'access_token',
    'signer_email', v_email,
    'worker_linked', e.user_id is not null);
end;
$$;

comment on function public.send_person_contract(uuid, uuid, jsonb, date, date, text, text) is
  'ELE-1982: fill a contract template for a roster person, file it (Draft) and open a signing request. Money roles only.';

revoke all on function public.send_person_contract(uuid, uuid, jsonb, date, date, text, text) from public, anon;
grant execute on function public.send_person_contract(uuid, uuid, jsonb, date, date, text, text) to authenticated;

-- ---------------------------------------------------------------- 3. status on the person
create or replace function public.person_contracts(p_employee_id uuid)
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(jsonb_agg(x order by (x->>'created_at') desc), '[]'::jsonb)
  from (
    select jsonb_build_object(
             'id', c.id,
             'title', c.title,
             'category', c.category,
             'status', c.status,
             'start_date', c.start_date,
             'end_date', c.end_date,
             'created_at', c.created_at,
             'employer_signed_at', c.employer_signed_at,
             'request_id', r.id,
             'sign_status', case
                when r.id is null then null
                when r.status not in ('Signed', 'Declined') and r.expires_at < now() then 'Expired'
                else r.status end,
             'sent_at', r.created_at,
             'signed_at', r.signed_at,
             'signer_email', r.signer_email) as x
      from public.contracts c
      join public.employer_employees e on e.id = c.employee_id
      left join lateral (
        select s.* from public.signature_requests s
         where s.document_type = 'Contract' and s.document_id = c.id and s.status <> 'Revoked'
         order by s.created_at desc limit 1) r on true
     where c.employee_id = p_employee_id
       and c.is_template = false
       and e.employer_id in (select public.my_employer_scope())
       and c.user_id = e.employer_id
  ) q;
$$;

comment on function public.person_contracts(uuid) is
  'ELE-1982: contract status for a roster person (no content, no pay). Any firm manager.';

revoke all on function public.person_contracts(uuid) from public, anon;
grant execute on function public.person_contracts(uuid) to authenticated;

-- ---------------------------------------------------------------- 4. the worker's own
create or replace function public.my_contracts()
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(jsonb_agg(x order by (x->>'sent_at') desc), '[]'::jsonb)
  from (
    select jsonb_build_object(
             'contract_id', c.id,
             'title', c.title,
             'category', c.category,
             'firm', coalesce(nullif(btrim(cp.company_name), ''), 'Your firm'),
             'start_date', c.start_date,
             'end_date', c.end_date,
             'status', case
                when r.status not in ('Signed', 'Declined') and r.expires_at < now() then 'Expired'
                else r.status end,
             'token', r.access_token,
             'sent_at', r.created_at,
             'signed_at', r.signed_at,
             'expires_at', r.expires_at,
             'employer_signed', c.employer_signed_at is not null) as x
      from public.contracts c
      join public.employer_employees e on e.id = c.employee_id
      join lateral (
        select s.* from public.signature_requests s
         where s.document_type = 'Contract' and s.document_id = c.id and s.status <> 'Revoked'
         order by s.created_at desc limit 1) r on true
      left join public.company_profiles cp on cp.user_id = c.user_id
     where auth.uid() is not null
       and e.user_id = auth.uid()
       and c.user_id = e.employer_id
       and c.is_template = false
  ) q;
$$;

comment on function public.my_contracts() is
  'ELE-1982: the signed-in worker''s own contracts and their signing links (Worker Tools, Sign-offs).';

revoke all on function public.my_contracts() from public, anon;
grant execute on function public.my_contracts() to authenticated;

-- ---------------------------------------------------------------- 5. customer terms
create or replace function public.set_firm_customer_terms(p_terms text)
returns jsonb
language plpgsql
volatile
security definer
set search_path = public
as $$
declare
  v_firm uuid := public.my_default_employer_id();
begin
  if auth.uid() is null then
    raise exception 'Sign in first' using errcode = '42501';
  end if;
  if v_firm is null or v_firm not in (select public.my_employer_admin_scope()) then
    raise exception 'Only the owner or an admin can change the customer terms' using errcode = '42501';
  end if;
  if length(coalesce(p_terms, '')) > 20000 then
    raise exception 'The terms are too long' using errcode = '22023';
  end if;

  update public.company_profiles
     set quote_terms = nullif(btrim(coalesce(p_terms, '')), ''), updated_at = now()
   where user_id = v_firm;
  if not found then
    return jsonb_build_object('error', 'no_company_profile');
  end if;
  return jsonb_build_object('ok', true);
end;
$$;

comment on function public.set_firm_customer_terms(text) is
  'ELE-1982: set the firm''s customer terms (company_profiles.quote_terms, shown on quotes and the accept page). Admins.';

revoke all on function public.set_firm_customer_terms(text) from public, anon;
grant execute on function public.set_firm_customer_terms(text) to authenticated;
