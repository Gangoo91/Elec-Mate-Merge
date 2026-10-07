-- ELE-1993: clients sign an actual document, not a bare title.
--
-- A signature request now carries a frozen copy of the document it asks the
-- client to sign (quote, variation, handover, certificate, contract, invoice),
-- a hash of that copy, and on signing the evidence: name, time, IP and user
-- agent (read server-side from the request headers), the statement ticked,
-- the hash of the version signed and the signature image (private bucket
-- `signature-captures`, read by the firm through signed URLs).
--
-- Office side (authenticated, firm-scoped through my_employer_scope):
--   create_signature_request, revoke_signature_request,
--   record_signature_send (rate-limited chase), apply_signed_variation
-- Public side (anon, token-keyed, validated, returns ONLY that request's document):
--   get_signing_document, sign_signing_document, decline_signing_document
--
-- The evidence columns are frozen by a trigger: only these functions (which
-- set app.sig_ctx) can mark a request signed, declined or revoked. Direct
-- inserts from older app builds are sanitised (server token, server snapshot).

-- ---------------------------------------------------------------- columns
alter table public.signature_requests
  add column if not exists document_snapshot jsonb,
  add column if not exists document_refs jsonb not null default '{}'::jsonb,
  add column if not exists document_hash text,
  add column if not exists signed_document_hash text,
  add column if not exists statement_text text,
  add column if not exists upload_key text,
  add column if not exists signature_path text,
  add column if not exists signature_method text,
  add column if not exists signer_user_agent text,
  add column if not exists first_viewed_at timestamptz,
  add column if not exists last_viewed_at timestamptz,
  add column if not exists view_count integer not null default 0,
  add column if not exists last_sent_at timestamptz,
  add column if not exists send_count integer not null default 0,
  add column if not exists revoked_at timestamptz,
  add column if not exists revoked_by uuid,
  add column if not exists declined_at timestamptz,
  add column if not exists decline_reason text,
  add column if not exists created_by uuid,
  add column if not exists created_by_name text,
  add column if not exists applied_at timestamptz,
  add column if not exists applied_by uuid;

alter table public.signature_requests drop constraint if exists signature_requests_document_type_check;
alter table public.signature_requests add constraint signature_requests_document_type_check
  check (document_type = any (array['Quote','Contract','Certificate','RAMS','Timesheet','Completion',
                                    'Variation','Invoice','Handover']));
alter table public.signature_requests drop constraint if exists signature_requests_status_check;
alter table public.signature_requests add constraint signature_requests_status_check
  check (status = any (array['Pending','Sent','Viewed','Signed','Declined','Expired','Revoked']));
alter table public.signature_requests drop constraint if exists signature_requests_signature_method_check;
alter table public.signature_requests add constraint signature_requests_signature_method_check
  check (signature_method is null or signature_method in ('drawn','typed'));

create unique index if not exists signature_requests_upload_key_key
  on public.signature_requests (upload_key) where upload_key is not null;
create index if not exists signature_requests_document_idx
  on public.signature_requests (document_type, document_id);
create index if not exists signature_requests_user_created_idx
  on public.signature_requests (user_id, created_at desc);

comment on table public.signature_requests is
  '[EMPLOYER HUB] Requests for a client to sign a real document by link (quote, variation, handover, certificate, contract, invoice). Scope: user_id = the firm (owner profiles.id); office (owner + active employer_admins) reach it via my_employer_scope(); job_id optional. Used by: Employer Hub Signatures register, quote/invoice/variation/job/contract sheets, public /sign/:token, client portal (ELE-1996). Rule: every request carries a frozen document_snapshot + hash (ELE-1993); evidence columns are written only by the signing RPCs (trigger signature_requests_guard); create via create_signature_request().';
comment on column public.signature_requests.document_snapshot is 'Frozen copy of the document the client is asked to sign (built server-side).';
comment on column public.signature_requests.document_hash is 'sha256 of document_snapshot (minus links) when sent; signing is refused if the live document no longer matches.';
comment on column public.signature_requests.signed_document_hash is 'sha256 of the version actually signed.';
comment on column public.signature_requests.upload_key is 'Random folder name in the private signature-captures bucket; only the token holder learns it.';
comment on column public.signature_requests.signature_path is 'Object path of the signature PNG in the private signature-captures bucket.';

-- ---------------------------------------------------------------- helpers
create or replace function public._sig_is_member(p_firm uuid, p_user uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select p_firm is not null and p_user is not null and (
    p_user = p_firm or exists (
      select 1 from public.employer_admins a
       where a.employer_id = p_firm and a.user_id = p_user and a.status = 'active'))
$$;

create or replace function public._sig_hash(p jsonb)
returns text language sql immutable set search_path = public as $$
  select case when p is null then null
    else encode(extensions.digest(convert_to((p - 'links' - 'pdf_url')::text, 'UTF8'), 'sha256'), 'hex') end
$$;

create or replace function public._sig_cert_label(p text)
returns text language sql immutable set search_path = public as $$
  select case lower(coalesce(p, ''))
    when 'eicr' then 'Electrical Installation Condition Report'
    when 'eic' then 'Electrical Installation Certificate'
    when 'minor-works' then 'Minor Electrical Installation Works Certificate'
    when 'ev-charging' then 'EV Charger Installation Certificate'
    when 'fire-alarm' then 'Fire Alarm Certificate'
    when 'fire-alarm-inspection' then 'Fire Alarm Inspection Report'
    when 'emergency-lighting' then 'Emergency Lighting Certificate'
    when 'pat-testing' then 'Portable Appliance Testing Report'
    when 'plug-in-solar' then 'Plug-in Solar Certificate'
    when 'bess' then 'Battery Storage Certificate'
    when 'danger-notice' then 'Danger Notice'
    when 'completion-notice' then 'Completion Notice'
    else initcap(replace(coalesce(p, 'certificate'), '-', ' '))
  end
$$;

-- What the client ticks. Server-side so the page cannot change the wording.
create or replace function public._sig_statement(p_type text, p_doc jsonb)
returns text language sql immutable set search_path = public as $$
  select (case p_type
    when 'Quote' then 'I have read ' || coalesce('quote ' || (p_doc->>'number'), 'this quote')
                      || ' and I accept the work and the price set out in it.'
    when 'Variation' then 'I agree to this variation to the work and to the change in price shown.'
    when 'Handover' then 'I confirm the work described has been completed and handed over to me, and I have received the certificates listed.'
    when 'Certificate' then 'I confirm I have received and read ' || coalesce('certificate ' || (p_doc->>'number'), 'this certificate') || '.'
    when 'Contract' then 'I have read this contract and I agree to its terms.'
    when 'Invoice' then 'I confirm I have received ' || coalesce('invoice ' || (p_doc->>'number'), 'this invoice') || ' and I agree the amount shown.'
    else 'I have read this document and I agree to it.'
  end) || ' I agree that signing here electronically has the same effect as signing by hand.'
$$;

-- The frozen copy of a document. Returns null when the document does not
-- exist or does not belong to p_firm (owner or an active co-admin's row).
create or replace function public._sig_snapshot(p_firm uuid, p_type text, p_id uuid, p_refs jsonb default '{}'::jsonb)
returns jsonb language plpgsql stable security definer set search_path = public as $$
declare
  v jsonb;
  v_job public.employer_jobs%rowtype;
  v_vo public.variation_orders%rowtype;
  v_approved numeric;
  v_ids uuid[];
begin
  if p_firm is null or p_id is null then return null; end if;

  if p_type in ('Quote', 'Invoice') then
    select jsonb_build_object(
      'kind', lower(p_type),
      'number', case when p_type = 'Invoice' then coalesce(q.invoice_number, q.quote_number) else q.quote_number end,
      'is_estimate', coalesce(q.is_estimate, false),
      'client', nullif(btrim(q.client_data->>'name'), ''),
      'address', nullif(btrim(coalesce(q.client_data->>'address', q.job_details->>'location')), ''),
      'title', nullif(btrim(q.job_details->>'title'), ''),
      'description', nullif(btrim(q.job_details->>'description'), ''),
      'line_items', coalesce((
        select jsonb_agg(jsonb_build_object(
                 'description', nullif(btrim(i->>'description'), ''),
                 'quantity', i->'quantity',
                 'unit', nullif(i->>'unit', '')) order by o)
          from jsonb_array_elements(coalesce(q.items, '[]'::jsonb)) with ordinality as t(i, o)
         where nullif(btrim(i->>'description'), '') is not null), '[]'::jsonb),
      'subtotal', q.subtotal,
      'vat_rate', case when coalesce((q.settings->>'vatRegistered')::boolean, false) then q.settings->'vatRate' end,
      'reverse_charge', coalesce((q.settings->>'reverseCharge')::boolean, false),
      'vat_amount', q.vat_amount,
      'total', q.total,
      'deposit', case when coalesce(q.deposit_required, false) then round(coalesce(q.deposit_amount_pennies, 0) / 100.0, 2) end,
      'valid_until', case when p_type = 'Quote' then q.expiry_date end,
      'due_date', case when p_type = 'Invoice' then q.invoice_due_date end,
      'terms', case when p_type = 'Quote' then nullif(btrim(cp.quote_terms), '') else nullif(btrim(cp.invoice_terms), '') end,
      'pdf_url', q.pdf_url)
      into v
      from public.quotes q
      left join public.company_profiles cp on cp.user_id = p_firm
     where q.id = p_id and q.deleted_at is null
       and public._sig_is_member(p_firm, q.user_id)
       and (p_type = 'Invoice') = coalesce(q.invoice_raised, false);
    return v;

  elsif p_type = 'Variation' then
    select * into v_vo from public.variation_orders where id = p_id;
    if not found then return null; end if;
    select * into v_job from public.employer_jobs where id = v_vo.job_id;
    if not found or v_job.user_id <> p_firm then return null; end if;
    select coalesce(sum(value), 0) into v_approved
      from public.variation_orders
     where job_id = v_vo.job_id and status = 'Approved' and id <> v_vo.id;
    return jsonb_build_object(
      'kind', 'variation',
      'reference', 'VO-' || upper(left(replace(v_vo.id::text, '-', ''), 6)),
      'job_title', v_job.title,
      'client', v_job.client,
      'address', v_job.location,
      'description', v_vo.description,
      'notes', nullif(btrim(v_vo.notes), ''),
      'agreed_before', coalesce(v_job.value, 0) + v_approved,
      'change', coalesce(v_vo.value, 0),
      'new_total', coalesce(v_job.value, 0) + v_approved + coalesce(v_vo.value, 0),
      'prices_include_vat', null);

  elsif p_type = 'Handover' then
    select * into v_job from public.employer_jobs where id = p_id;
    if not found or v_job.user_id <> p_firm then return null; end if;
    select coalesce(array_agg(x::uuid), '{}') into v_ids
      from jsonb_array_elements_text(coalesce(p_refs->'report_ids', '[]'::jsonb)) x;
    return jsonb_build_object(
      'kind', 'handover',
      'job_title', v_job.title,
      'client', v_job.client,
      'address', v_job.location,
      'description', nullif(btrim(v_job.description), ''),
      'started', v_job.start_date,
      'completed', coalesce(v_job.completed_at::date, v_job.end_date),
      'checklist', coalesce((
        select jsonb_agg(jsonb_build_object('title', c.title, 'done', coalesce(c.is_completed, false)) order by c.position, c.created_at)
          from public.employer_job_checklist_items c where c.job_id = v_job.id), '[]'::jsonb),
      'outstanding', coalesce((
        select jsonb_agg(jsonb_build_object('title', i.title, 'type', i.issue_type) order by i.created_at)
          from public.job_issues i
         where i.job_id = v_job.id and coalesce(i.status, '') not in ('Resolved', 'Closed', 'Rejected', 'Cancelled')), '[]'::jsonb),
      'certificates', coalesce((
        select jsonb_agg(jsonb_build_object(
                 'id', r.id,
                 'type', public._sig_cert_label(r.report_type),
                 'number', r.certificate_number,
                 'date', r.inspection_date,
                 'version', r.edit_version) order by r.inspection_date nulls last, r.created_at)
          from public.reports r
         where r.id = any(v_ids) and r.deleted_at is null
           and public._sig_is_member(p_firm, r.user_id)), '[]'::jsonb),
      'links', coalesce((
        select jsonb_object_agg(r.id::text, r.pdf_url)
          from public.reports r
         where r.id = any(v_ids) and r.deleted_at is null and r.pdf_url is not null
           and public._sig_is_member(p_firm, r.user_id)), '{}'::jsonb));

  elsif p_type = 'Certificate' then
    select jsonb_build_object(
      'kind', 'certificate',
      'type', public._sig_cert_label(r.report_type),
      'report_type', r.report_type,
      'number', r.certificate_number,
      'client', nullif(btrim(r.client_name), ''),
      'address', nullif(btrim(r.installation_address), ''),
      'date', r.inspection_date,
      'inspector', nullif(btrim(r.inspector_name), ''),
      'next_due', r.next_inspection_due,
      'outcome', nullif(btrim(coalesce(r.data->>'overallAssessment', r.data->>'overall_assessment')), ''),
      'version', r.edit_version,
      'pdf_url', r.pdf_url)
      into v
      from public.reports r
     where r.id = p_id and r.deleted_at is null
       and public._sig_is_member(p_firm, r.user_id);
    return v;

  elsif p_type = 'Contract' then
    select jsonb_build_object(
      'kind', 'contract',
      'title', c.title,
      'party_name', c.party_name,
      'content', left(coalesce(c.content, c.description, ''), 60000),
      'start_date', c.start_date,
      'end_date', c.end_date,
      'value', c.value)
      into v
      from public.contracts c
     where c.id = p_id and public._sig_is_member(p_firm, c.user_id);
    return v;
  end if;

  return null;
end;
$$;

-- ---------------------------------------------------------------- guard trigger
create or replace function public._sig_guard()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  v_ctx boolean := coalesce(current_setting('app.sig_ctx', true), '') = 'on';
  v_free text[] := array['status','signer_email','signer_phone','signer_name','message','expires_at',
                         'job_id','linked_invoice','document_title','updated_at'];
begin
  if v_ctx then
    return case when tg_op = 'DELETE' then old else new end;
  end if;

  if tg_op = 'DELETE' then
    if old.status = 'Signed' then
      raise exception 'A signed request is evidence and cannot be deleted' using errcode = '42501';
    end if;
    return old;
  end if;

  if tg_op = 'INSERT' then
    -- Direct inserts (older app builds). Server token, no evidence, server snapshot.
    new.access_token := encode(extensions.gen_random_bytes(32), 'hex');
    new.upload_key := encode(extensions.gen_random_bytes(16), 'hex');
    new.status := 'Pending';
    new.signature_url := null; new.signed_at := null; new.ip_address := null;
    new.signature_path := null; new.signature_method := null; new.signer_user_agent := null;
    new.signed_document_hash := null; new.declined_at := null; new.decline_reason := null;
    new.revoked_at := null; new.revoked_by := null; new.applied_at := null; new.applied_by := null;
    new.view_count := 0; new.send_count := 0; new.last_sent_at := null;
    new.first_viewed_at := null; new.last_viewed_at := null;
    new.created_by := coalesce(new.created_by, auth.uid());
    new.document_refs := coalesce(new.document_refs, '{}'::jsonb);
    if new.document_id is not null and new.document_type is not null then
      new.document_snapshot := public._sig_snapshot(new.user_id, new.document_type, new.document_id, new.document_refs);
      if new.document_snapshot is null then
        raise exception 'That document was not found for this company' using errcode = '42501';
      end if;
      new.document_hash := public._sig_hash(new.document_snapshot);
      new.statement_text := public._sig_statement(new.document_type, new.document_snapshot);
    else
      new.document_snapshot := null; new.document_hash := null; new.statement_text := null;
    end if;
    return new;
  end if;

  -- UPDATE outside the signing functions: evidence is frozen.
  if (to_jsonb(new) - v_free) is distinct from (to_jsonb(old) - v_free) then
    raise exception 'Signature evidence can only be changed by the signing flow' using errcode = '42501';
  end if;
  if old.status in ('Signed', 'Declined', 'Revoked') and
     (new.status, new.signer_name, new.signer_email, new.expires_at, new.document_title, new.message)
       is distinct from
     (old.status, old.signer_name, old.signer_email, old.expires_at, old.document_title, old.message) then
    raise exception 'This request is finished and cannot be changed' using errcode = '42501';
  end if;
  if new.status is distinct from old.status and new.status not in ('Pending', 'Sent', 'Expired') then
    raise exception 'Only the client can sign or decline a request' using errcode = '42501';
  end if;
  return new;
end;
$$;

drop trigger if exists signature_requests_guard on public.signature_requests;
create trigger signature_requests_guard
  before insert or update or delete on public.signature_requests
  for each row execute function public._sig_guard();

-- Existing rows: give them an upload folder so the new page can sign them.
select set_config('app.sig_ctx', 'on', true);
update public.signature_requests
   set upload_key = encode(extensions.gen_random_bytes(16), 'hex')
 where upload_key is null;

-- ---------------------------------------------------------------- office RPCs
create or replace function public.create_signature_request(
  p_document_type text,
  p_document_id uuid,
  p_signer_name text,
  p_signer_email text default null,
  p_signer_phone text default null,
  p_message text default null,
  p_expires_in_days integer default 14,
  p_options jsonb default '{}'::jsonb
) returns jsonb language plpgsql security definer set search_path = public as $$
declare
  v_uid uuid := auth.uid();
  v_firm uuid;
  v_doc_id uuid := p_document_id;
  v_type text := p_document_type;
  v_opts jsonb := coalesce(p_options, '{}'::jsonb);
  v_refs jsonb := '{}'::jsonb;
  v_snap jsonb;
  v_job uuid;
  v_title text;
  v_email text := nullif(lower(btrim(coalesce(p_signer_email, ''))), '');
  v_name text := nullif(btrim(coalesce(p_signer_name, '')), '');
  v_days integer := coalesce(p_expires_in_days, 14);
  v_issue public.job_issues%rowtype;
  v_value numeric;
  v_desc text;
  v_ids uuid[];
  v_row public.signature_requests%rowtype;
  v_creator text;
begin
  if v_uid is null then
    raise exception 'Sign in first' using errcode = '42501';
  end if;
  v_firm := public.my_default_employer_id();
  if v_firm is null or v_firm not in (select public.my_employer_scope()) then
    raise exception 'Not allowed' using errcode = '42501';
  end if;
  -- Crew (employer_employees) are not office: only the owner and active co-admins.
  if v_firm <> v_uid and not exists (
       select 1 from public.employer_admins a
        where a.employer_id = v_firm and a.user_id = v_uid and a.status = 'active') then
    raise exception 'Not allowed' using errcode = '42501';
  end if;

  if v_type is null or v_type not in ('Quote', 'Invoice', 'Variation', 'Handover', 'Certificate', 'Contract') then
    raise exception 'Choose a document to sign' using errcode = '22023';
  end if;
  if v_name is null or length(v_name) > 120 then
    raise exception 'Enter the name of the person signing' using errcode = '22023';
  end if;
  if v_email is not null and (length(v_email) > 254 or v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$') then
    raise exception 'That email address does not look right' using errcode = '22023';
  end if;
  if v_days < 1 or v_days > 90 then
    raise exception 'A link can last between 1 and 90 days' using errcode = '22023';
  end if;
  if length(coalesce(p_message, '')) > 1000 then
    raise exception 'Keep the message under 1,000 characters' using errcode = '22023';
  end if;

  perform set_config('app.sig_ctx', 'on', true);

  -- A variation can start from a job issue (or straight from a job): the
  -- variation order is created here, Pending, so it shows in Job financials.
  if v_type = 'Variation' and v_doc_id is null then
    v_value := nullif(v_opts->>'value', '')::numeric;
    v_desc := nullif(btrim(coalesce(v_opts->>'description', '')), '');
    if v_value is null or abs(v_value) > 10000000 then
      raise exception 'Enter the price change for this variation' using errcode = '22023';
    end if;
    if nullif(v_opts->>'issue_id', '') is not null then
      select * into v_issue from public.job_issues where id = (v_opts->>'issue_id')::uuid;
      if not found or not exists (select 1 from public.employer_jobs j where j.id = v_issue.job_id and j.user_id = v_firm) then
        raise exception 'That issue was not found for this company' using errcode = '42501';
      end if;
      v_job := v_issue.job_id;
      v_desc := coalesce(v_desc, nullif(btrim(concat_ws(E'\n\n', v_issue.title, v_issue.description)), ''));
    else
      v_job := nullif(v_opts->>'job_id', '')::uuid;
      if v_job is null or not exists (select 1 from public.employer_jobs j where j.id = v_job and j.user_id = v_firm) then
        raise exception 'Choose the job this variation is for' using errcode = '22023';
      end if;
    end if;
    if v_desc is null then
      raise exception 'Describe the variation' using errcode = '22023';
    end if;
    insert into public.variation_orders (job_id, user_id, description, value, status, notes)
    values (v_job, v_firm, left(v_desc, 4000), round(v_value, 2), 'Pending',
            case when v_issue.id is not null then 'From job issue: ' || coalesce(v_issue.title, '') end)
    returning id into v_doc_id;
    v_refs := jsonb_strip_nulls(jsonb_build_object('issue_id', v_issue.id));
  elsif v_type = 'Variation' then
    if exists (select 1 from public.variation_orders where id = v_doc_id and status <> 'Pending') then
      raise exception 'This variation has already been approved or rejected' using errcode = '22023';
    end if;
  end if;

  if v_type = 'Handover' then
    select coalesce(array_agg(distinct x::uuid), '{}') into v_ids
      from jsonb_array_elements_text(coalesce(v_opts->'report_ids', '[]'::jsonb)) x;
    if array_length(v_ids, 1) > 30 then
      raise exception 'Attach up to 30 certificates' using errcode = '22023';
    end if;
    if exists (select 1 from unnest(v_ids) i
                where not exists (select 1 from public.reports r
                                   where r.id = i and r.deleted_at is null
                                     and public._sig_is_member(v_firm, r.user_id))) then
      raise exception 'One of those certificates was not found for this company' using errcode = '42501';
    end if;
    v_refs := jsonb_build_object('report_ids', to_jsonb(v_ids));
  end if;

  v_snap := public._sig_snapshot(v_firm, v_type, v_doc_id, v_refs);
  if v_snap is null then
    raise exception 'That document was not found for this company' using errcode = '42501';
  end if;
  if v_type = 'Quote' and coalesce(jsonb_array_length(v_snap->'line_items'), 0) = 0 and coalesce((v_snap->>'total')::numeric, 0) = 0 then
    raise exception 'This quote is empty. Add the work and price first.' using errcode = '22023';
  end if;

  -- Which job does it belong to?
  v_job := coalesce(v_job, case
    when v_type in ('Quote', 'Invoice') then (select q.employer_job_id from public.quotes q where q.id = v_doc_id)
    when v_type = 'Variation' then (select vo.job_id from public.variation_orders vo where vo.id = v_doc_id)
    when v_type = 'Handover' then v_doc_id
  end);
  if v_job is null and nullif(v_opts->>'job_id', '') is not null then
    v_job := (v_opts->>'job_id')::uuid;
  end if;
  if v_job is not null and not exists (select 1 from public.employer_jobs j where j.id = v_job and j.user_id = v_firm) then
    v_job := null;
  end if;

  v_title := left(case v_type
    when 'Quote' then case when (v_snap->>'is_estimate')::boolean then 'Estimate ' else 'Quote ' end || coalesce(v_snap->>'number', '')
    when 'Invoice' then 'Invoice ' || coalesce(v_snap->>'number', '')
    when 'Variation' then 'Variation: ' || split_part(coalesce(v_snap->>'description', ''), E'\n', 1)
    when 'Handover' then 'Handover: ' || coalesce(v_snap->>'job_title', 'job')
    when 'Certificate' then coalesce(v_snap->>'type', 'Certificate') || coalesce(' ' || (v_snap->>'number'), '')
    when 'Contract' then coalesce(v_snap->>'title', 'Contract')
  end, 140);

  -- Sending again replaces any earlier open link for the same document.
  update public.signature_requests
     set status = 'Revoked', revoked_at = now(), revoked_by = v_uid, updated_at = now()
   where user_id = v_firm and document_type = v_type and document_id = v_doc_id
     and status in ('Pending', 'Sent', 'Viewed');

  select coalesce(nullif(btrim(a.full_name), ''), nullif(btrim(p.full_name), ''))
    into v_creator
    from public.profiles p
    left join public.employer_admins a on a.user_id = v_uid and a.employer_id = v_firm and a.status = 'active'
   where p.id = v_uid;

  insert into public.signature_requests (
    user_id, job_id, document_type, document_id, document_title, signer_name, signer_email,
    signer_phone, status, expires_at, message, access_token, upload_key,
    document_snapshot, document_refs, document_hash, statement_text, created_by, created_by_name)
  values (
    v_firm, v_job, v_type, v_doc_id, v_title, v_name, v_email,
    nullif(btrim(coalesce(p_signer_phone, '')), ''), 'Pending', now() + make_interval(days => v_days),
    nullif(btrim(coalesce(p_message, '')), ''),
    encode(extensions.gen_random_bytes(32), 'hex'), encode(extensions.gen_random_bytes(16), 'hex'),
    v_snap, v_refs, public._sig_hash(v_snap), public._sig_statement(v_type, v_snap), v_uid, v_creator)
  returning * into v_row;

  return jsonb_build_object('id', v_row.id, 'access_token', v_row.access_token,
                            'document_id', v_doc_id, 'document_title', v_row.document_title);
end;
$$;

create or replace function public.revoke_signature_request(p_id uuid)
returns jsonb language plpgsql security definer set search_path = public as $$
declare v_id uuid;
begin
  if auth.uid() is null then raise exception 'Sign in first' using errcode = '42501'; end if;
  perform set_config('app.sig_ctx', 'on', true);
  update public.signature_requests
     set status = 'Revoked', revoked_at = now(), revoked_by = auth.uid(), updated_at = now()
   where id = p_id and user_id in (select public.my_employer_scope())
     and status in ('Pending', 'Sent', 'Viewed', 'Expired')
  returning id into v_id;
  if v_id is null then
    return jsonb_build_object('error', 'not_open');
  end if;
  return jsonb_build_object('success', true, 'id', v_id);
end;
$$;

-- Called by send-signature-request with the caller's JWT before any email:
-- first send once, then a chase at most every 24 hours, five chases in all.
create or replace function public.record_signature_send(p_id uuid, p_kind text default 'chase')
returns jsonb language plpgsql security definer set search_path = public as $$
declare r public.signature_requests%rowtype;
begin
  if auth.uid() is null then raise exception 'Sign in first' using errcode = '42501'; end if;
  select * into r from public.signature_requests
   where id = p_id and user_id in (select public.my_employer_scope()) for update;
  if not found then return jsonb_build_object('error', 'not_found'); end if;
  if r.status not in ('Pending', 'Sent', 'Viewed') or r.revoked_at is not null then
    return jsonb_build_object('error', 'not_open');
  end if;
  if r.expires_at is not null and r.expires_at <= now() then
    return jsonb_build_object('error', 'expired');
  end if;
  if r.signer_email is null then return jsonb_build_object('error', 'no_email'); end if;
  if r.send_count >= 6 then return jsonb_build_object('error', 'limit_reached'); end if;
  if coalesce(p_kind, 'chase') = 'initial' and r.send_count > 0 then
    return jsonb_build_object('error', 'already_sent', 'next_allowed_at', r.last_sent_at + interval '24 hours');
  end if;
  if r.last_sent_at is not null and r.last_sent_at > now() - interval '24 hours' then
    return jsonb_build_object('error', 'too_soon', 'next_allowed_at', r.last_sent_at + interval '24 hours');
  end if;
  perform set_config('app.sig_ctx', 'on', true);
  update public.signature_requests
     set last_sent_at = now(), send_count = send_count + 1,
         status = case when status = 'Pending' then 'Sent' else status end, updated_at = now()
   where id = p_id;
  return jsonb_build_object('success', true, 'send_count', r.send_count + 1);
end;
$$;

-- A signed variation changes the job's agreed value only when the office says so.
create or replace function public.apply_signed_variation(p_id uuid)
returns jsonb language plpgsql security definer set search_path = public as $$
declare r public.signature_requests%rowtype; v_vo public.variation_orders%rowtype;
begin
  if auth.uid() is null then raise exception 'Sign in first' using errcode = '42501'; end if;
  select * into r from public.signature_requests
   where id = p_id and user_id in (select public.my_employer_scope()) for update;
  if not found then return jsonb_build_object('error', 'not_found'); end if;
  if r.document_type <> 'Variation' or r.status <> 'Signed' then
    return jsonb_build_object('error', 'not_signed_variation');
  end if;
  if r.applied_at is not null then return jsonb_build_object('error', 'already_applied'); end if;
  select * into v_vo from public.variation_orders where id = r.document_id for update;
  if not found then return jsonb_build_object('error', 'variation_missing'); end if;
  if v_vo.status = 'Rejected' then return jsonb_build_object('error', 'variation_rejected'); end if;
  if coalesce(v_vo.value, 0) <> coalesce((r.document_snapshot->>'change')::numeric, 0) then
    return jsonb_build_object('error', 'variation_changed');
  end if;
  update public.variation_orders
     set status = 'Approved', approved_by = r.signer_name, approved_date = r.signed_at::date, updated_at = now()
   where id = v_vo.id;
  perform set_config('app.sig_ctx', 'on', true);
  update public.signature_requests set applied_at = now(), applied_by = auth.uid(), updated_at = now() where id = r.id;
  return jsonb_build_object('success', true, 'variation_id', v_vo.id, 'value', v_vo.value);
end;
$$;

-- ---------------------------------------------------------------- public RPCs
create or replace function public._sig_client_ip()
returns text language plpgsql stable set search_path = public as $$
declare h json;
begin
  begin
    h := nullif(current_setting('request.headers', true), '')::json;
  exception when others then return null;
  end;
  if h is null then return null; end if;
  return left(nullif(btrim(coalesce(h->>'cf-connecting-ip', h->>'x-real-ip',
                                   split_part(coalesce(h->>'x-forwarded-for', ''), ',', 1))), ''), 64);
end;
$$;

create or replace function public._sig_client_ua()
returns text language plpgsql stable set search_path = public as $$
declare h json;
begin
  begin
    h := nullif(current_setting('request.headers', true), '')::json;
  exception when others then return null;
  end;
  return left(nullif(btrim(coalesce(h->>'user-agent', '')), ''), 400);
end;
$$;

-- Why a token cannot sign right now (null = it can).
create or replace function public._sig_block_reason(r public.signature_requests)
returns text language sql stable security definer set search_path = public as $$
  select case
    when r.status = 'Signed' then 'signed'
    when r.status = 'Declined' then 'declined'
    when r.status = 'Revoked' or r.revoked_at is not null then 'revoked'
    when r.status = 'Expired' or (r.expires_at is not null and r.expires_at <= now()) then 'expired'
    when r.document_snapshot is not null and r.document_id is not null and
         public._sig_hash(public._sig_snapshot(r.user_id, r.document_type, r.document_id, r.document_refs))
           is distinct from r.document_hash then 'changed'
    else null end
$$;

create or replace function public.get_signing_document(p_token text)
returns jsonb language plpgsql security definer set search_path = public as $$
declare
  r public.signature_requests%rowtype;
  v_block text;
  v_company jsonb;
begin
  if p_token is null or length(p_token) < 32 or length(p_token) > 128 or p_token !~ '^[A-Za-z0-9-]+$' then
    return jsonb_build_object('error', 'not_found');
  end if;
  select * into r from public.signature_requests where access_token = p_token;
  if not found then return jsonb_build_object('error', 'not_found'); end if;

  v_block := public._sig_block_reason(r);
  if v_block in ('revoked') then
    return jsonb_build_object('error', 'revoked');
  end if;

  if v_block is null then
    perform set_config('app.sig_ctx', 'on', true);
    update public.signature_requests
       set status = case when status in ('Pending', 'Sent') then 'Viewed' else status end,
           first_viewed_at = coalesce(first_viewed_at, now()),
           last_viewed_at = now(), view_count = view_count + 1, updated_at = now()
     where id = r.id;
  end if;

  select jsonb_build_object(
           'name', coalesce(nullif(btrim(cp.company_name), ''), 'Your electrician'),
           'logo_url', coalesce(cp.logo_url, case when cp.logo_data_url like 'data:image/%' then cp.logo_data_url end),
           'phone', cp.company_phone,
           'email', cp.company_email,
           'address', cp.company_address)
    into v_company
    from public.company_profiles cp where cp.user_id = r.user_id limit 1;

  return jsonb_build_object(
    'id', r.id,
    'document_type', r.document_type,
    'document_title', r.document_title,
    'document', r.document_snapshot,
    'document_hash', r.document_hash,
    'statement', r.statement_text,
    'signer_name', r.signer_name,
    'message', r.message,
    'expires_at', r.expires_at,
    'created_at', r.created_at,
    'status', case when v_block = 'expired' then 'Expired' else r.status end,
    'block_reason', v_block,
    'can_sign', v_block is null,
    'upload_key', case when v_block is null then r.upload_key end,
    'signed_at', r.signed_at,
    'signed_name', case when r.status = 'Signed' then r.signer_name end,
    'signed_document_hash', r.signed_document_hash,
    'signature_method', r.signature_method,
    'declined_at', r.declined_at,
    'company', coalesce(v_company, jsonb_build_object('name', 'Your electrician')),
    'legacy', r.document_snapshot is null);
end;
$$;

create or replace function public.sign_signing_document(
  p_token text,
  p_signer_name text,
  p_signature_path text,
  p_method text,
  p_statement_accepted boolean
) returns jsonb language plpgsql security definer set search_path = public as $$
declare
  r public.signature_requests%rowtype;
  v_block text;
  v_name text := nullif(btrim(coalesce(p_signer_name, '')), '');
begin
  if p_token is null or length(p_token) < 32 or length(p_token) > 128 then
    return jsonb_build_object('error', 'not_found');
  end if;
  select * into r from public.signature_requests where access_token = p_token for update;
  if not found then return jsonb_build_object('error', 'not_found'); end if;
  v_block := public._sig_block_reason(r);
  if v_block is not null then return jsonb_build_object('error', v_block); end if;
  if r.document_snapshot is null then return jsonb_build_object('error', 'no_document'); end if;
  if coalesce(p_statement_accepted, false) is not true then
    return jsonb_build_object('error', 'statement_required');
  end if;
  if v_name is null or length(v_name) < 2 or length(v_name) > 120 then
    return jsonb_build_object('error', 'name_required');
  end if;
  if p_method is null or p_method not in ('drawn', 'typed') then
    return jsonb_build_object('error', 'signature_required');
  end if;
  if p_signature_path is null
     or p_signature_path !~ ('^' || r.upload_key || '/[0-9a-f-]{36}\.png$')
     or not exists (select 1 from storage.objects o
                     where o.bucket_id = 'signature-captures' and o.name = p_signature_path) then
    return jsonb_build_object('error', 'signature_required');
  end if;

  perform set_config('app.sig_ctx', 'on', true);
  update public.signature_requests
     set status = 'Signed', signed_at = now(), signer_name = v_name,
         signature_path = p_signature_path, signature_method = p_method,
         signature_url = null,
         signed_document_hash = r.document_hash,
         ip_address = public._sig_client_ip(), signer_user_agent = public._sig_client_ua(),
         updated_at = now()
   where id = r.id;

  perform public.notify_employer_bell(
    r.user_id, 'signature_signed',
    v_name || ' signed ' || r.document_title,
    case when r.document_type = 'Variation'
         then 'Signed on their phone. Open it to add the variation to the job value.'
         else 'Signed on their phone. The signed copy is ready to download.' end,
    jsonb_build_object('route', '/employer?section=signatures&request=' || r.id,
                       'signature_request_id', r.id, 'job_id', r.job_id));

  return jsonb_build_object('success', true, 'id', r.id, 'signed_at', now(),
                            'signed_document_hash', r.document_hash);
end;
$$;

create or replace function public.decline_signing_document(p_token text, p_reason text default null)
returns jsonb language plpgsql security definer set search_path = public as $$
declare r public.signature_requests%rowtype; v_block text;
begin
  if p_token is null or length(p_token) < 32 or length(p_token) > 128 then
    return jsonb_build_object('error', 'not_found');
  end if;
  select * into r from public.signature_requests where access_token = p_token for update;
  if not found then return jsonb_build_object('error', 'not_found'); end if;
  v_block := public._sig_block_reason(r);
  if v_block is not null and v_block <> 'changed' then return jsonb_build_object('error', v_block); end if;

  perform set_config('app.sig_ctx', 'on', true);
  update public.signature_requests
     set status = 'Declined', declined_at = now(),
         decline_reason = nullif(left(btrim(coalesce(p_reason, '')), 1000), ''),
         ip_address = public._sig_client_ip(), signer_user_agent = public._sig_client_ua(),
         updated_at = now()
   where id = r.id;

  perform public.notify_employer_bell(
    r.user_id, 'signature_declined',
    r.signer_name || ' declined ' || r.document_title,
    coalesce('Reason: ' || nullif(left(btrim(coalesce(p_reason, '')), 200), ''), 'No reason given.'),
    jsonb_build_object('route', '/employer?section=signatures&request=' || r.id,
                       'signature_request_id', r.id, 'job_id', r.job_id));
  return jsonb_build_object('success', true, 'id', r.id);
end;
$$;

-- ---------------------------------------------------------------- legacy RPCs
-- The old page signed with a data URL and no document. Keep them working for
-- requests made before this change only (no snapshot), and never for a
-- revoked or finished one. Drop after the new page has shipped.
create or replace function public.sign_signature_request(p_token text, p_signature_url text, p_ip text default null, p_notes text default null, p_signer_name text default null)
returns jsonb language plpgsql security definer set search_path = public as $$
declare v_id uuid; v_owner uuid; v_title text; v_name text;
begin
  if p_token is null or length(p_token) < 32 then return jsonb_build_object('error', 'invalid_or_already_signed'); end if;
  if p_signature_url is null or p_signature_url !~ '^data:image/(png|jpeg);base64,' or length(p_signature_url) > 600000 then
    return jsonb_build_object('error', 'invalid_or_already_signed');
  end if;
  perform set_config('app.sig_ctx', 'on', true);
  update signature_requests
     set status = 'Signed', signature_url = p_signature_url, signed_at = now(), updated_at = now(),
         ip_address = public._sig_client_ip(), signer_user_agent = public._sig_client_ua(),
         signer_name = coalesce(nullif(btrim(left(p_signer_name, 120)), ''), signer_name),
         message = coalesce(nullif(left(p_notes, 1000), ''), message)
   where access_token = p_token
     and document_snapshot is null
     and status in ('Pending', 'Sent', 'Viewed') and revoked_at is null
     and (expires_at is null or expires_at > now())
  returning id, user_id, document_title, signer_name into v_id, v_owner, v_title, v_name;
  if v_id is null then return jsonb_build_object('error', 'invalid_or_already_signed'); end if;
  perform public.notify_employer_bell(v_owner, 'signature_signed', v_name || ' signed ' || v_title,
    'Signed on their phone.', jsonb_build_object('route', '/employer?section=signatures&request=' || v_id, 'signature_request_id', v_id));
  return jsonb_build_object('success', true, 'id', v_id);
end;
$$;

create or replace function public.decline_signature_request(p_token text, p_ip text default null, p_notes text default null)
returns jsonb language plpgsql security definer set search_path = public as $$
declare v_id uuid;
begin
  if p_token is null or length(p_token) < 32 then return jsonb_build_object('error', 'invalid_or_already_finalised'); end if;
  perform set_config('app.sig_ctx', 'on', true);
  update signature_requests
     set status = 'Declined', declined_at = now(), updated_at = now(),
         ip_address = public._sig_client_ip(), signer_user_agent = public._sig_client_ua(),
         decline_reason = nullif(left(btrim(coalesce(p_notes, '')), 1000), '')
   where access_token = p_token
     and document_snapshot is null
     and status in ('Pending', 'Sent', 'Viewed') and revoked_at is null
     and (expires_at is null or expires_at > now())
  returning id into v_id;
  if v_id is null then return jsonb_build_object('error', 'invalid_or_already_finalised'); end if;
  return jsonb_build_object('success', true, 'id', v_id);
end;
$$;

-- ---------------------------------------------------------------- storage
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('signature-captures', 'signature-captures', false, 524288, array['image/png'])
on conflict (id) do update
  set public = false, file_size_limit = 524288, allowed_mime_types = array['image/png'];

-- Anyone holding a live signing link can add a PNG to that request's folder
-- (the folder name is only returned to the token holder). No reads, no
-- overwrites, at most 5 files per request.
create or replace function public._sig_upload_allowed(p_name text)
returns boolean language plpgsql stable security definer set search_path = public as $$
declare v_key text; r public.signature_requests%rowtype;
begin
  if p_name is null or p_name !~ '^[0-9a-f]{32}/[0-9a-f-]{36}\.png$' then return false; end if;
  v_key := split_part(p_name, '/', 1);
  select * into r from public.signature_requests where upload_key = v_key;
  if not found then return false; end if;
  if r.status not in ('Pending', 'Sent', 'Viewed') or r.revoked_at is not null
     or (r.expires_at is not null and r.expires_at <= now()) then
    return false;
  end if;
  return (select count(*) from storage.objects o
           where o.bucket_id = 'signature-captures' and o.name like v_key || '/%') < 5;
end;
$$;

create or replace function public._sig_capture_readable(p_name text)
returns boolean language sql stable security definer set search_path = public as $$
  select auth.uid() is not null and exists (
    select 1 from public.signature_requests r
     where r.upload_key = split_part(p_name, '/', 1)
       and r.user_id in (select public.my_employer_scope()))
$$;

drop policy if exists "Signing link holders upload signature" on storage.objects;
create policy "Signing link holders upload signature" on storage.objects
  for insert to anon, authenticated
  with check (bucket_id = 'signature-captures' and public._sig_upload_allowed(name));

drop policy if exists "Firm reads its signature captures" on storage.objects;
create policy "Firm reads its signature captures" on storage.objects
  for select to authenticated
  using (bucket_id = 'signature-captures' and public._sig_capture_readable(name));

-- ---------------------------------------------------------------- grants
revoke all on function public._sig_is_member(uuid, uuid) from public, anon, authenticated;
revoke all on function public._sig_hash(jsonb) from public, anon, authenticated;
revoke all on function public._sig_cert_label(text) from public, anon, authenticated;
revoke all on function public._sig_statement(text, jsonb) from public, anon, authenticated;
revoke all on function public._sig_snapshot(uuid, text, uuid, jsonb) from public, anon, authenticated;
revoke all on function public._sig_guard() from public, anon, authenticated;
revoke all on function public._sig_client_ip() from public, anon, authenticated;
revoke all on function public._sig_client_ua() from public, anon, authenticated;
revoke all on function public._sig_block_reason(public.signature_requests) from public, anon, authenticated;
-- storage policies evaluate these as the calling role
revoke all on function public._sig_upload_allowed(text) from public;
grant execute on function public._sig_upload_allowed(text) to anon, authenticated;
revoke all on function public._sig_capture_readable(text) from public, anon;
grant execute on function public._sig_capture_readable(text) to authenticated;

revoke all on function public.create_signature_request(text, uuid, text, text, text, text, integer, jsonb) from public, anon;
grant execute on function public.create_signature_request(text, uuid, text, text, text, text, integer, jsonb) to authenticated;
revoke all on function public.revoke_signature_request(uuid) from public, anon;
grant execute on function public.revoke_signature_request(uuid) to authenticated;
revoke all on function public.record_signature_send(uuid, text) from public, anon;
grant execute on function public.record_signature_send(uuid, text) to authenticated;
revoke all on function public.apply_signed_variation(uuid) from public, anon;
grant execute on function public.apply_signed_variation(uuid) to authenticated;

-- Deliberately public: token-keyed, validated, return only that request.
revoke all on function public.get_signing_document(text) from public;
grant execute on function public.get_signing_document(text) to anon, authenticated;
revoke all on function public.sign_signing_document(text, text, text, text, boolean) from public;
grant execute on function public.sign_signing_document(text, text, text, text, boolean) to anon, authenticated;
revoke all on function public.decline_signing_document(text, text) from public;
grant execute on function public.decline_signing_document(text, text) to anon, authenticated;
revoke all on function public.sign_signature_request(text, text, text, text, text) from public;
grant execute on function public.sign_signature_request(text, text, text, text, text) to anon, authenticated;
revoke all on function public.decline_signature_request(text, text, text) from public;
grant execute on function public.decline_signature_request(text, text, text) to anon, authenticated;

-- The old page's reader: now a thin wrapper over get_signing_document so it
-- refuses revoked links, goes through the guard, and never returns the
-- upload folder. Drop after the new page has shipped.
create or replace function public.get_signature_request_by_token(p_token text)
returns jsonb language plpgsql security definer set search_path = public as $$
declare v jsonb;
begin
  v := public.get_signing_document(p_token);
  if v ? 'error' then return v; end if;
  return (v - 'upload_key' - 'company')
    || jsonb_build_object('company_name', v->'company'->>'name', 'logo_url', v->'company'->>'logo_url');
end;
$$;
revoke all on function public.get_signature_request_by_token(text) from public;
grant execute on function public.get_signature_request_by_token(text) to anon, authenticated;
