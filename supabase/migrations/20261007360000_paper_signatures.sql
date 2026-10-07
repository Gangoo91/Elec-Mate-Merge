-- ELE-1993 follow-up: record a paper signature, honestly.
--
-- "Mark signed" was removed because it let the office invent evidence. This
-- is the proper paper path: the office (owner, admin or office manager, i.e.
-- an active employer_admins row or the owner) uploads a photo or PDF of the
-- signed paper, says who signed and on what date, and ticks a declaration.
-- record_paper_signature() then writes method 'paper', who recorded it and
-- when, the scan's path and SHA-256, and the fingerprint of the document at
-- that moment, and marks the request Signed. From then on the evidence is
-- frozen by signature_requests_guard exactly like a digital signature.
--
-- The register and the signed copy say "Signed on paper, recorded by X on
-- <date>" and attach the scan; nothing pretends it was signed digitally.
--
-- Scans live in a new PRIVATE bucket `signature-paper`, one folder per firm
-- (<firm id>/<uuid>.<ext>). Only that firm's office can upload or read; a
-- scan can be deleted only while no request points at it (a cancelled
-- upload), never once it is evidence.

-- ---------------------------------------------------------------- columns
alter table public.signature_requests
  add column if not exists paper_path text,
  add column if not exists paper_sha256 text,
  add column if not exists paper_mime text,
  add column if not exists paper_size bigint,
  add column if not exists paper_signed_on date,
  add column if not exists paper_declaration text,
  add column if not exists recorded_by uuid,
  add column if not exists recorded_by_name text,
  add column if not exists recorded_at timestamptz;

alter table public.signature_requests drop constraint if exists signature_requests_signature_method_check;
alter table public.signature_requests add constraint signature_requests_signature_method_check
  check (signature_method is null or signature_method in ('drawn', 'typed', 'paper'));

create unique index if not exists signature_requests_paper_path_key
  on public.signature_requests (paper_path) where paper_path is not null;

comment on column public.signature_requests.paper_path is
  'Paper signature (method paper): object path of the scan in the private signature-paper bucket (<firm>/<uuid>.<ext>). Written only by record_paper_signature().';
comment on column public.signature_requests.paper_sha256 is
  'SHA-256 of the scan bytes exactly as uploaded, so the file can be checked later.';
comment on column public.signature_requests.paper_signed_on is
  'The date the client signed the paper, as entered by the office (never in the future).';
comment on column public.signature_requests.paper_declaration is
  'The declaration the recorder ticked, word for word.';
comment on column public.signature_requests.recorded_by is
  'auth.uid() of the office user who recorded the paper signature.';
comment on column public.signature_requests.recorded_at is
  'When the paper signature was recorded in the app (not when it was signed).';

comment on table public.signature_requests is
  '[EMPLOYER HUB] Requests for a client to sign a real document by link or on paper (quote, variation, handover, certificate, contract, invoice). Scope: user_id = the firm (owner profiles.id); office (owner + active employer_admins) reach it via my_employer_scope(); job_id optional. Used by: Employer Hub Signatures register, quote/invoice/variation/job/contract sheets, public /sign/:token, client portal (ELE-1996). Rule: every request carries a frozen document_snapshot + hash (ELE-1993); evidence columns are written only by the signing RPCs (sign_signing_document for the client, record_paper_signature for a scanned paper signature) and frozen by trigger signature_requests_guard; create via create_signature_request().';

-- ---------------------------------------------------------------- guard: inserts carry no paper evidence
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
    new.access_token := encode(extensions.gen_random_bytes(32), 'hex');
    new.upload_key := encode(extensions.gen_random_bytes(16), 'hex');
    new.status := 'Pending';
    new.signature_url := null; new.signed_at := null; new.ip_address := null;
    new.signature_path := null; new.signature_method := null; new.signer_user_agent := null;
    new.signed_document_hash := null; new.declined_at := null; new.decline_reason := null;
    new.revoked_at := null; new.revoked_by := null; new.applied_at := null; new.applied_by := null;
    new.view_count := 0; new.send_count := 0; new.last_sent_at := null;
    new.first_viewed_at := null; new.last_viewed_at := null;
    new.paper_path := null; new.paper_sha256 := null; new.paper_mime := null; new.paper_size := null;
    new.paper_signed_on := null; new.paper_declaration := null;
    new.recorded_by := null; new.recorded_by_name := null; new.recorded_at := null;
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

-- ---------------------------------------------------------------- storage
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('signature-paper', 'signature-paper', false, 15728640,
        array['image/jpeg', 'image/png', 'image/heic', 'image/heif', 'image/webp', 'application/pdf'])
on conflict (id) do update
  set public = false, file_size_limit = 15728640,
      allowed_mime_types = array['image/jpeg', 'image/png', 'image/heic', 'image/heif', 'image/webp', 'application/pdf'];

-- The firm folder is the first path segment; the caller must be that firm's
-- owner or an active co-admin (any access role: owner, admin, office manager).
create or replace function public._sig_paper_office(p_name text)
returns boolean language sql stable security definer set search_path = public as $$
  select auth.uid() is not null
     and p_name ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/[0-9a-f-]{36}\.(jpg|jpeg|png|heic|heif|webp|pdf)$'
     and public._sig_is_member(split_part(p_name, '/', 1)::uuid, auth.uid())
$$;

-- A scan nobody has recorded yet (an abandoned or failed upload) can be removed.
create or replace function public._sig_paper_unreferenced(p_name text)
returns boolean language sql stable security definer set search_path = public as $$
  select not exists (select 1 from public.signature_requests r where r.paper_path = p_name)
$$;

drop policy if exists "Office uploads paper signature scans" on storage.objects;
create policy "Office uploads paper signature scans" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'signature-paper' and public._sig_paper_office(name));

drop policy if exists "Office reads paper signature scans" on storage.objects;
create policy "Office reads paper signature scans" on storage.objects
  for select to authenticated
  using (bucket_id = 'signature-paper' and public._sig_paper_office(name));

drop policy if exists "Office removes unrecorded paper scans" on storage.objects;
create policy "Office removes unrecorded paper scans" on storage.objects
  for delete to authenticated
  using (bucket_id = 'signature-paper' and public._sig_paper_office(name)
         and public._sig_paper_unreferenced(name));

-- ---------------------------------------------------------------- record_paper_signature
-- Every refusal RAISES 'paper:<reason>' so nothing is half done (a request
-- created from a document is rolled back with it).
-- Either p_request_id (an open request: Link ready, Sent or Opened), or a
-- document (p_document_type + p_document_id, plus p_options as for
-- create_signature_request) which first creates the request the same way a
-- link would, so the frozen copy is built by the same code.
create or replace function public.record_paper_signature(
  p_request_id uuid,
  p_document_type text,
  p_document_id uuid,
  p_options jsonb,
  p_signer_name text,
  p_signed_on date,
  p_file_path text,
  p_file_sha256 text,
  p_declaration boolean
) returns jsonb language plpgsql security definer set search_path = public as $$
declare
  v_uid uuid := auth.uid();
  v_id uuid := p_request_id;
  r public.signature_requests%rowtype;
  v_name text := nullif(btrim(coalesce(p_signer_name, '')), '');
  v_today date := (now() at time zone 'Europe/London')::date;
  v_live_hash text;
  v_obj record;
  v_recorder text;
  v_created jsonb;
  v_signed_at timestamptz;
  v_declaration constant text := 'I confirm this is the client''s signature on this document.';
begin
  if v_uid is null then
    raise exception 'Sign in first' using errcode = '42501';
  end if;
  if coalesce(p_declaration, false) is not true then
    raise exception 'paper:declaration_required' using errcode = 'P0001';
  end if;
  if v_name is null or length(v_name) < 2 or length(v_name) > 120 then
    raise exception 'paper:name_required' using errcode = 'P0001';
  end if;
  if p_signed_on is null then
    raise exception 'paper:date_required' using errcode = 'P0001';
  end if;
  if p_signed_on > v_today then
    raise exception 'paper:date_in_future' using errcode = 'P0001';
  end if;
  if p_signed_on < v_today - 730 then
    raise exception 'paper:date_too_old' using errcode = 'P0001';
  end if;
  if p_file_sha256 is null or p_file_sha256 !~ '^[0-9a-f]{64}$' then
    raise exception 'paper:file_required' using errcode = 'P0001';
  end if;

  -- From a document: create the request first (office check, snapshot,
  -- earlier open links for the same document cancelled), then record on it.
  if v_id is null then
    if p_document_type is null then
      raise exception 'paper:document_required' using errcode = 'P0001';
    end if;
    v_created := public.create_signature_request(
      p_document_type, p_document_id, v_name, null, null, null, 14, coalesce(p_options, '{}'::jsonb));
    v_id := (v_created->>'id')::uuid;
  end if;

  select * into r from public.signature_requests where id = v_id for update;
  if not found or r.user_id not in (select public.my_employer_scope())
     or not public._sig_is_member(r.user_id, v_uid) then
    raise exception 'Not allowed' using errcode = '42501';
  end if;

  if r.status = 'Signed' then raise exception 'paper:signed' using errcode = 'P0001'; end if;
  if r.status = 'Declined' then raise exception 'paper:declined' using errcode = 'P0001'; end if;
  if r.status = 'Revoked' or r.revoked_at is not null then raise exception 'paper:revoked' using errcode = 'P0001'; end if;
  if r.status = 'Expired' or (r.expires_at is not null and r.expires_at <= now()) then
    raise exception 'paper:expired' using errcode = 'P0001';
  end if;
  if r.status not in ('Pending', 'Sent', 'Viewed') then
    raise exception 'paper:not_open' using errcode = 'P0001';
  end if;
  if r.document_snapshot is null then
    raise exception 'paper:no_document' using errcode = 'P0001';
  end if;

  -- The fingerprint of the document as it stands now. If it no longer
  -- matches the copy on this request, the paper could be of either version:
  -- the office records it from the document instead (a fresh copy).
  v_live_hash := public._sig_hash(public._sig_snapshot(r.user_id, r.document_type, r.document_id, r.document_refs));
  if v_live_hash is distinct from r.document_hash then
    raise exception 'paper:changed' using errcode = 'P0001';
  end if;

  -- The scan: in this firm's folder, uploaded, and not used by another request.
  if p_file_path is null
     or p_file_path !~ ('^' || r.user_id::text || '/[0-9a-f-]{36}\.(jpg|jpeg|png|heic|heif|webp|pdf)$') then
    raise exception 'paper:file_required' using errcode = 'P0001';
  end if;
  select o.name, o.metadata into v_obj
    from storage.objects o
   where o.bucket_id = 'signature-paper' and o.name = p_file_path;
  if not found then
    raise exception 'paper:file_required' using errcode = 'P0001';
  end if;
  if exists (select 1 from public.signature_requests x where x.paper_path = p_file_path and x.id <> r.id) then
    raise exception 'paper:file_used' using errcode = 'P0001';
  end if;

  select coalesce(nullif(btrim(a.full_name), ''), nullif(btrim(p.full_name), ''), 'Someone at the office')
    into v_recorder
    from public.profiles p
    left join public.employer_admins a on a.user_id = v_uid and a.employer_id = r.user_id and a.status = 'active'
   where p.id = v_uid;
  v_recorder := coalesce(v_recorder, 'Someone at the office');

  -- signed_at drives sorting and "signed in the last 30 days"; the paper
  -- only has a date, so midday UK time on that date (never later than now).
  v_signed_at := least(((p_signed_on + time '12:00') at time zone 'Europe/London'), now());

  perform set_config('app.sig_ctx', 'on', true);
  update public.signature_requests
     set status = 'Signed',
         signed_at = v_signed_at,
         signer_name = v_name,
         signature_method = 'paper',
         signature_path = null,
         signature_url = null,
         signed_document_hash = v_live_hash,
         ip_address = null,
         signer_user_agent = null,
         paper_path = p_file_path,
         paper_sha256 = p_file_sha256,
         paper_mime = left(coalesce(v_obj.metadata->>'mimetype', ''), 100),
         paper_size = nullif(v_obj.metadata->>'size', '')::bigint,
         paper_signed_on = p_signed_on,
         paper_declaration = v_declaration,
         recorded_by = v_uid,
         recorded_by_name = left(v_recorder, 120),
         recorded_at = now(),
         updated_at = now()
   where id = r.id;
  perform set_config('app.sig_ctx', 'off', true);

  perform public.notify_employer_bell(
    r.user_id, 'signature_signed',
    v_name || ' signed ' || r.document_title || ' on paper',
    'Recorded by ' || v_recorder || '. The scan is attached to the signed copy.'
      || case when r.document_type = 'Variation' then ' Open it to add the variation to the job value.' else '' end,
    jsonb_build_object('route', '/employer?section=signatures&request=' || r.id,
                       'signature_request_id', r.id, 'job_id', r.job_id, 'method', 'paper'));

  return jsonb_build_object('success', true, 'id', r.id, 'signed_on', p_signed_on,
                            'signed_document_hash', v_live_hash, 'document_title', r.document_title);
end;
$$;

-- ---------------------------------------------------------------- grants
revoke all on function public._sig_guard() from public, anon, authenticated;
revoke all on function public._sig_paper_office(text) from public, anon;
grant execute on function public._sig_paper_office(text) to authenticated;
revoke all on function public._sig_paper_unreferenced(text) from public, anon;
grant execute on function public._sig_paper_unreferenced(text) to authenticated;
revoke all on function public.record_paper_signature(uuid, text, uuid, jsonb, text, date, text, text, boolean) from public, anon;
grant execute on function public.record_paper_signature(uuid, text, uuid, jsonb, text, date, text, text, boolean) to authenticated;
