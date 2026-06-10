-- ============================================================================
-- QS review — security audit hardening
--
-- Fixes from the full feature audit (2026-06-10):
--  C1  employer_employees own-row policies let users set employer_id/team_role
--      → privilege escalation to "QS of any company". Self-service rows are
--      now stub-only (employer_id must stay NULL); linkage happens exclusively
--      through claim_employee_records.
--  H2  Gate trigger now fires on INSERT as well as UPDATE.
--  H3  Edit-after-approval: approvals stamp a content hash; the gate trigger
--      and the PDF countersignature path verify it.
--  H4  qs_signature column revoked from direct client reads; the PDF gets the
--      countersignature via an owner-only definer RPC with the hash check.
--  M5  Self-approval forbidden.
--  M6  claim_employee_records requires a confirmed email.
--  M7  Approve/return/cancel race guards (status precondition in UPDATE).
--  #2  Deleted certs: filtered from the queue, unapprovable, and pending
--      reviews auto-cancel on soft delete.
--  #6  Multi-employer: gate + submit prefer the company on the report's
--      existing review; roster fallback ordered by stable created_at.
--  L12 report_type normalised in the gate check.
--
-- Rollback: re-run 20260610120000 + 20260610130000 function bodies; recreate
-- the two original own-row policies; drop column report_data_hash; re-grant
-- select on qs_signature; drop trigger trg_cancel_qs_reviews_on_delete and
-- functions get_qs_countersignature_for_pdf, is_qs_issue_blocked,
-- cancel_qs_reviews_on_report_delete.
-- ============================================================================

-- ─── C1: self-service roster rows can never carry employer trust ────────────
drop policy if exists "Users can create own employee record" on public.employer_employees;
create policy "Users can create own employee record"
  on public.employer_employees
  for insert to authenticated
  with check (
    user_id = (select auth.uid())
    and employer_id is null
  );

drop policy if exists "Users can update own employee record" on public.employer_employees;
create policy "Users can update own employee record"
  on public.employer_employees
  for update to authenticated
  using (user_id = (select auth.uid()))
  with check (
    user_id = (select auth.uid())
    and employer_id is null
  );

-- ─── H3/H4: content hash + signature lockdown ───────────────────────────────
alter table public.report_qs_reviews
  add column if not exists report_data_hash text;

-- The raw signature image must not be readable by ordinary table selects
-- (it reaches PDFs only via get_qs_countersignature_for_pdf, and reviewers
-- via the definer get_qs_review_report). NB: a column-level REVOKE does not
-- carve out of a table-level grant (privileges are additive) — so revoke the
-- table grant and re-grant every column except qs_signature.
revoke select on public.report_qs_reviews from authenticated;
grant select (
  id, report_uuid, report_id, report_type, employer_id, electrician_id,
  status, submitted_note, submitted_at, reviewed_by, reviewer_employee_id,
  reviewer_name, qs_position, review_comments, reviewed_at,
  report_updated_at_snapshot, report_data_hash, created_at, updated_at
) on public.report_qs_reviews to authenticated;

-- ─── M6: claim requires a confirmed email ───────────────────────────────────
create or replace function public.claim_employee_records()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_email text;
  v_count integer;
begin
  select lower(email) into v_email
  from auth.users
  where id = auth.uid()
    and email_confirmed_at is not null;

  if v_email is null then
    return 0;
  end if;

  update public.employer_employees
     set user_id = auth.uid(),
         updated_at = now()
   where employer_id is not null
     and user_id is null
     and lower(email) = v_email;

  get diagnostics v_count = row_count;
  return v_count;
end;
$$;

-- ─── #6: stable employer resolution helper ──────────────────────────────────
-- Prefers the company already reviewing this report; falls back to the
-- user's roster membership (oldest link wins — stable, unlike updated_at).
create or replace function public.resolve_qs_employer(p_report_uuid uuid, p_user_id uuid)
returns uuid
language sql
security definer
set search_path = public
stable
as $$
  select coalesce(
    (select q.employer_id
       from public.report_qs_reviews q
       join public.employer_employees e
         on e.employer_id = q.employer_id
        and e.user_id = p_user_id
        and e.status ilike 'active'
      where q.report_uuid = p_report_uuid
      order by q.created_at desc
      limit 1),
    (select e.employer_id
       from public.employer_employees e
      where e.user_id = p_user_id
        and e.employer_id is not null
        and e.status ilike 'active'
      order by e.created_at asc
      limit 1)
  );
$$;

revoke all on function public.resolve_qs_employer(uuid, uuid) from public, anon, authenticated;

-- ─── Submit: employer preference + stable ordering ──────────────────────────
create or replace function public.submit_report_for_qs_review(
  p_report_uuid uuid,
  p_note text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_report record;
  v_employer_id uuid;
  v_review public.report_qs_reviews;
  v_already boolean := false;
  v_electrician_name text;
  v_qs record;
begin
  select id, report_id, report_type, user_id, certificate_number, client_name
    into v_report
  from public.reports
  where id = p_report_uuid and deleted_at is null;

  if v_report.id is null or v_report.user_id <> auth.uid() then
    raise exception 'NOT_REPORT_OWNER';
  end if;

  if v_report.report_type not in ('eicr', 'eic', 'minor-works') then
    raise exception 'REPORT_TYPE_NOT_SUPPORTED';
  end if;

  v_employer_id := public.resolve_qs_employer(p_report_uuid, auth.uid());

  if v_employer_id is null then
    raise exception 'NOT_A_TEAM_MEMBER';
  end if;

  insert into public.report_qs_reviews
    (report_uuid, report_id, report_type, employer_id, electrician_id, submitted_note)
  values
    (v_report.id, v_report.report_id, v_report.report_type, v_employer_id, auth.uid(), p_note)
  on conflict (report_uuid) where (status = 'pending') do nothing
  returning * into v_review;

  if v_review.id is null then
    v_already := true;
    select * into v_review
    from public.report_qs_reviews
    where report_uuid = v_report.id and status = 'pending';
  end if;

  if not v_already then
    select full_name into v_electrician_name
    from public.profiles where id = auth.uid();
    v_electrician_name := coalesce(nullif(trim(v_electrician_name), ''), 'A team member');

    insert into public.employer_notifications (user_id, type, title, message, metadata)
    values (
      v_employer_id,
      'qs_review_submitted',
      'Certificate awaiting QS review',
      v_electrician_name || ' submitted ' || upper(v_report.report_type) || ' ' ||
        coalesce(v_report.certificate_number, v_report.report_id) ||
        coalesce(' for ' || v_report.client_name, '') || ' for review',
      jsonb_build_object(
        'review_id', v_review.id,
        'report_id', v_report.report_id,
        'report_type', v_report.report_type
      )
    );

    for v_qs in
      select user_id from public.employer_employees
      where employer_id = v_employer_id
        and user_id is not null
        and user_id <> auth.uid()
        and team_role ilike 'qs'
        and status ilike 'active'
    loop
      perform public.qs_review_push(
        v_qs.user_id,
        'Certificate awaiting QS review',
        v_electrician_name || ' submitted a ' || upper(v_report.report_type) || ' for your review',
        jsonb_build_object('review_id', v_review.id, 'route', '/employer?section=qsreviews')
      );
    end loop;
  end if;

  return jsonb_build_object(
    'review_id', v_review.id,
    'status', v_review.status,
    'already_pending', v_already
  );
end;
$$;

-- ─── Queue: never show certs that were deleted ──────────────────────────────
create or replace function public.get_qs_review_queue(p_status text default null)
returns table (
  review_id uuid,
  status text,
  submitted_at timestamptz,
  submitted_note text,
  reviewed_at timestamptz,
  reviewer_name text,
  review_comments text,
  report_uuid uuid,
  report_id text,
  report_type text,
  certificate_number text,
  client_name text,
  installation_address text,
  inspection_date text,
  inspector_name text,
  report_updated_at timestamptz,
  electrician_id uuid,
  electrician_name text
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_employer_id uuid;
begin
  if exists (select 1 from public.employer_employees
             where employer_id = auth.uid()) then
    v_employer_id := auth.uid();
  else
    select e.employer_id into v_employer_id
    from public.employer_employees e
    where e.user_id = auth.uid()
      and e.team_role ilike 'qs'
      and e.status ilike 'active'
      and e.employer_id is not null
    order by e.created_at asc
    limit 1;
  end if;

  if v_employer_id is null then
    return;
  end if;

  return query
  select
    q.id, q.status, q.submitted_at, q.submitted_note,
    q.reviewed_at, q.reviewer_name, q.review_comments,
    r.id, r.report_id, r.report_type,
    r.certificate_number::text, r.client_name::text,
    r.installation_address::text, r.inspection_date::text,
    r.inspector_name::text, r.updated_at,
    q.electrician_id, coalesce(p.full_name, e.name, 'Team member')::text
  from public.report_qs_reviews q
  join public.reports r on r.id = q.report_uuid and r.deleted_at is null
  left join public.profiles p on p.id = q.electrician_id
  left join public.employer_employees e
    on e.employer_id = q.employer_id and e.user_id = q.electrician_id
  where q.employer_id = v_employer_id
    and (p_status is null or q.status = p_status)
  order by q.submitted_at desc;
end;
$$;

-- ─── Approve: self-approval block, race guard, deleted check, content hash ──
create or replace function public.approve_qs_review(
  p_review_id uuid,
  p_signature text,
  p_reviewer_name text,
  p_comments text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_review public.report_qs_reviews;
  v_report record;
  v_rows integer;
begin
  select * into v_review from public.report_qs_reviews where id = p_review_id;
  if v_review.id is null then
    raise exception 'REVIEW_NOT_FOUND';
  end if;
  if v_review.status <> 'pending' then
    raise exception 'REVIEW_NOT_PENDING';
  end if;
  if not public.is_qs_reviewer_for(v_review.employer_id) then
    raise exception 'NOT_AUTHORISED';
  end if;
  if v_review.electrician_id = auth.uid() then
    raise exception 'SELF_APPROVAL_FORBIDDEN';
  end if;
  if coalesce(trim(p_signature), '') = '' or coalesce(trim(p_reviewer_name), '') = '' then
    raise exception 'SIGNATURE_REQUIRED';
  end if;

  select updated_at, md5(data::text) as data_hash
    into v_report
  from public.reports
  where id = v_review.report_uuid and deleted_at is null;

  if v_report.updated_at is null then
    raise exception 'REPORT_NOT_FOUND';
  end if;

  update public.report_qs_reviews
     set status = 'approved',
         reviewed_by = auth.uid(),
         reviewer_employee_id = (
           select id from public.employer_employees
           where employer_id = v_review.employer_id and user_id = auth.uid()
           order by created_at asc limit 1
         ),
         reviewer_name = trim(p_reviewer_name),
         qs_signature = p_signature,
         review_comments = nullif(trim(p_comments), ''),
         reviewed_at = now(),
         report_updated_at_snapshot = v_report.updated_at,
         report_data_hash = v_report.data_hash,
         updated_at = now()
   where id = p_review_id
     and status = 'pending';

  get diagnostics v_rows = row_count;
  if v_rows = 0 then
    raise exception 'REVIEW_NOT_PENDING';
  end if;

  perform public.qs_review_push(
    v_review.electrician_id,
    'Certificate approved by QS',
    trim(p_reviewer_name) || ' approved ' || upper(v_review.report_type) || ' ' || v_review.report_id,
    jsonb_build_object('review_id', p_review_id, 'report_id', v_review.report_id)
  );

  return jsonb_build_object('review_id', p_review_id, 'status', 'approved');
end;
$$;

-- ─── Return / cancel: race guards + deleted check ───────────────────────────
create or replace function public.return_qs_review(
  p_review_id uuid,
  p_comments text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_review public.report_qs_reviews;
  v_rows integer;
begin
  select * into v_review from public.report_qs_reviews where id = p_review_id;
  if v_review.id is null then
    raise exception 'REVIEW_NOT_FOUND';
  end if;
  if v_review.status <> 'pending' then
    raise exception 'REVIEW_NOT_PENDING';
  end if;
  if not public.is_qs_reviewer_for(v_review.employer_id) then
    raise exception 'NOT_AUTHORISED';
  end if;
  if coalesce(trim(p_comments), '') = '' then
    raise exception 'COMMENTS_REQUIRED';
  end if;

  update public.report_qs_reviews
     set status = 'returned',
         reviewed_by = auth.uid(),
         review_comments = trim(p_comments),
         reviewed_at = now(),
         updated_at = now()
   where id = p_review_id
     and status = 'pending';

  get diagnostics v_rows = row_count;
  if v_rows = 0 then
    raise exception 'REVIEW_NOT_PENDING';
  end if;

  perform public.qs_review_push(
    v_review.electrician_id,
    'Certificate returned by QS',
    upper(v_review.report_type) || ' ' || v_review.report_id || ' needs changes — see QS comments',
    jsonb_build_object('review_id', p_review_id, 'report_id', v_review.report_id)
  );

  return jsonb_build_object('review_id', p_review_id, 'status', 'returned');
end;
$$;

create or replace function public.cancel_qs_review(p_review_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_review public.report_qs_reviews;
  v_rows integer;
begin
  select * into v_review from public.report_qs_reviews where id = p_review_id;
  if v_review.id is null then
    raise exception 'REVIEW_NOT_FOUND';
  end if;
  if v_review.electrician_id <> auth.uid() then
    raise exception 'NOT_AUTHORISED';
  end if;
  if v_review.status <> 'pending' then
    raise exception 'REVIEW_NOT_PENDING';
  end if;

  update public.report_qs_reviews
     set status = 'cancelled', updated_at = now()
   where id = p_review_id
     and status = 'pending';

  get diagnostics v_rows = row_count;
  if v_rows = 0 then
    raise exception 'REVIEW_NOT_PENDING';
  end if;

  return jsonb_build_object('review_id', p_review_id, 'status', 'cancelled');
end;
$$;

-- ─── #2: soft-deleting a cert cancels its pending review ────────────────────
create or replace function public.cancel_qs_reviews_on_report_delete()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.deleted_at is not null and old.deleted_at is null then
    update public.report_qs_reviews
       set status = 'cancelled', updated_at = now()
     where report_uuid = new.id
       and status = 'pending';
  end if;
  return new;
end;
$$;

drop trigger if exists trg_cancel_qs_reviews_on_delete on public.reports;
create trigger trg_cancel_qs_reviews_on_delete
  after update of deleted_at on public.reports
  for each row
  execute function public.cancel_qs_reviews_on_report_delete();

-- ─── H2/H3/L12/#6: hardened issue gate (INSERT + UPDATE, hash, type-norm) ───
create or replace function public.enforce_qs_issue_gate()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_employer_id uuid;
  v_gate boolean;
  v_latest record;
begin
  if tg_op = 'UPDATE' then
    if new.pdf_url is not distinct from old.pdf_url
       and new.pdf_generated_at is not distinct from old.pdf_generated_at
       and new.locked_at is not distinct from old.locked_at then
      return new;
    end if;
  else -- INSERT: only gate rows born with issue artefacts
    if new.pdf_url is null and new.pdf_generated_at is null and new.locked_at is null then
      return new;
    end if;
  end if;

  if lower(trim(coalesce(new.report_type, ''))) not in ('eicr', 'eic', 'minor-works') then
    return new;
  end if;

  v_employer_id := public.resolve_qs_employer(new.id, new.user_id);

  if v_employer_id is null then
    return new;
  end if;

  select qs_approval_required into v_gate
  from public.company_profiles
  where user_id = v_employer_id
  limit 1;

  if not coalesce(v_gate, false) then
    return new;
  end if;

  select status, report_data_hash into v_latest
  from public.report_qs_reviews
  where report_uuid = new.id
  order by created_at desc
  limit 1;

  if v_latest.status is distinct from 'approved' then
    raise exception 'QS_APPROVAL_REQUIRED';
  end if;

  -- Content edited since approval → re-approval needed (hash stamped at
  -- approval time; autosaves of identical content keep the same hash).
  if v_latest.report_data_hash is not null
     and v_latest.report_data_hash is distinct from md5(new.data::text) then
    raise exception 'QS_APPROVAL_REQUIRED';
  end if;

  return new;
end;
$$;

drop trigger if exists trg_enforce_qs_issue_gate on public.reports;
create trigger trg_enforce_qs_issue_gate
  before insert or update on public.reports
  for each row
  execute function public.enforce_qs_issue_gate();

-- ─── H4: PDF countersignature via owner-only RPC with hash verification ─────
create or replace function public.get_qs_countersignature_for_pdf(p_report_id text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_report record;
  v_review record;
begin
  select id, user_id, md5(data::text) as data_hash
    into v_report
  from public.reports
  where report_id = p_report_id and deleted_at is null;

  if v_report.id is null or v_report.user_id <> auth.uid() then
    return null;
  end if;

  select status, reviewer_name, qs_signature, qs_position, reviewed_at, report_data_hash
    into v_review
  from public.report_qs_reviews
  where report_uuid = v_report.id
  order by created_at desc
  limit 1;

  if v_review.status is distinct from 'approved'
     or coalesce(trim(v_review.qs_signature), '') = ''
     or coalesce(trim(v_review.reviewer_name), '') = '' then
    return null;
  end if;

  -- Stale approval (content edited since) → no countersignature on the PDF
  if v_review.report_data_hash is not null
     and v_review.report_data_hash is distinct from v_report.data_hash then
    return null;
  end if;

  return jsonb_build_object(
    'reviewer_name', v_review.reviewer_name,
    'qs_signature', v_review.qs_signature,
    'qs_position', coalesce(v_review.qs_position, 'Qualifying Supervisor'),
    'reviewed_at', v_review.reviewed_at
  );
end;
$$;

revoke all on function public.get_qs_countersignature_for_pdf(text) from public, anon;
grant execute on function public.get_qs_countersignature_for_pdf(text) to authenticated;

-- ─── Server-side gate check for edge functions / clients ────────────────────
create or replace function public.is_qs_issue_blocked(p_report_uuid uuid)
returns boolean
language plpgsql
security definer
set search_path = public
stable
as $$
declare
  v_report record;
  v_employer_id uuid;
  v_gate boolean;
  v_latest record;
begin
  select id, user_id, report_type, md5(data::text) as data_hash
    into v_report
  from public.reports
  where id = p_report_uuid;

  if v_report.id is null then
    return false;
  end if;

  if lower(trim(coalesce(v_report.report_type, ''))) not in ('eicr', 'eic', 'minor-works') then
    return false;
  end if;

  v_employer_id := public.resolve_qs_employer(v_report.id, v_report.user_id);
  if v_employer_id is null then
    return false;
  end if;

  select qs_approval_required into v_gate
  from public.company_profiles
  where user_id = v_employer_id
  limit 1;

  if not coalesce(v_gate, false) then
    return false;
  end if;

  select status, report_data_hash into v_latest
  from public.report_qs_reviews
  where report_uuid = v_report.id
  order by created_at desc
  limit 1;

  if v_latest.status is distinct from 'approved' then
    return true;
  end if;

  if v_latest.report_data_hash is not null
     and v_latest.report_data_hash is distinct from v_report.data_hash then
    return true;
  end if;

  return false;
end;
$$;

revoke all on function public.is_qs_issue_blocked(uuid) from public, anon;
grant execute on function public.is_qs_issue_blocked(uuid) to authenticated;

-- Edge functions (service key) need the gate + countersignature checks too
grant execute on function public.is_qs_issue_blocked(uuid) to service_role;
grant execute on function public.get_qs_countersignature_for_pdf(text) to service_role;
