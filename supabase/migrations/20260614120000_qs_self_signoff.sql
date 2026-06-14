-- ============================================================================
-- QS self sign-off (Inspection & Testing — Slice 2)   ** REVIEW BEFORE APPLYING **
-- ----------------------------------------------------------------------------
-- Lets the registration-holding Qualifying Supervisor countersign their OWN
-- certificates. Decision (Andrew, "b"): self sign-off is allowed for the
--   (1) company OWNER, when they declare themselves their own QS, and
--   (2) any teammate the owner explicitly DESIGNATES as a "principal QS".
-- Ordinary workers and ordinary `team_role='qs'` teammates STILL cannot approve
-- their own certs — SELF_APPROVAL_FORBIDDEN remains for them (the oversight rule).
--
-- Flow = Option B: even the owner-QS performs a deliberate "Review & sign off"
-- on their own certs, so every certificate passes one QS checkpoint and carries
-- a countersignature. Self approvals are flagged `self_certified` for the audit.
--
-- Everything stays RPC-first / SECURITY DEFINER — no `reports` RLS is widened.
-- ============================================================================

-- ── 1. Designation columns ──────────────────────────────────────────────────

-- Owner declares themselves their own Qualifying Supervisor (sole trader /
-- registration holder). Default false: nothing changes until explicitly set.
alter table public.company_profiles
  add column if not exists owner_is_qs boolean not null default false;

-- Owner designates a specific QS teammate as a "principal QS" (may self-sign-off).
alter table public.employer_employees
  add column if not exists is_principal_qs boolean not null default false;

-- Audit: record when an approval was a self sign-off (approver == electrician).
alter table public.report_qs_reviews
  add column if not exists self_certified boolean not null default false;


-- ── 2. Who is allowed to self-sign-off ──────────────────────────────────────
create or replace function public.is_principal_qs_for(p_employer_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  -- (a) the owner of this company, when they have declared themselves QS …
  select (
    p_employer_id = auth.uid()
    and exists (
      select 1 from public.company_profiles
      where user_id = auth.uid() and owner_is_qs = true
    )
  )
  -- … or (b) a teammate the owner designated as a principal QS.
  or exists (
    select 1 from public.employer_employees
    where employer_id = p_employer_id
      and user_id = auth.uid()
      and is_principal_qs = true
      and team_role ilike 'qs'
      and status ilike 'active'
  );
$$;
revoke all on function public.is_principal_qs_for(uuid) from public, anon;
grant execute on function public.is_principal_qs_for(uuid) to authenticated;


-- ── 3. Resolve employer: let a declared owner-QS resolve to THEIR OWN company ─
-- Adds a final fallback (c) so an owner who is their own QS can submit their own
-- certificate (previously returned NULL → NOT_A_TEAM_MEMBER). Worker paths (a/b)
-- are unchanged and take precedence.
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
      limit 1),
    -- NEW (c): the user owns a company and has declared themselves QS.
    (select cp.user_id
       from public.company_profiles cp
      where cp.user_id = p_user_id
        and cp.owner_is_qs = true
      limit 1)
  );
$$;
revoke all on function public.resolve_qs_employer(uuid, uuid) from public, anon, authenticated;


-- ── 4. Approve: relax self-approval ONLY for owner / principal QS ────────────
-- Faithful copy of the current approve_qs_review (migration 20260610140000) with
-- exactly two changes: the SELF_APPROVAL_FORBIDDEN guard now exempts a principal
-- QS, and the row records `self_certified`.
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
  v_is_self boolean;
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

  v_is_self := (v_review.electrician_id = auth.uid());

  -- Self-approval stays forbidden for ordinary workers / QS teammates. It is
  -- permitted ONLY for the registration-holding QS (declared owner-QS or a
  -- designated principal QS) and is recorded as a self-certification.
  if v_is_self and not public.is_principal_qs_for(v_review.employer_id) then
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
         self_certified = v_is_self,
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

  -- Notify the electrician (skipped when it's the same person self-certifying).
  if not v_is_self then
    perform public.qs_review_push(
      v_review.electrician_id,
      'Certificate approved by QS',
      trim(p_reviewer_name) || ' approved ' || upper(v_review.report_type) || ' ' || v_review.report_id,
      jsonb_build_object('review_id', p_review_id, 'report_id', v_review.report_id)
    );
  end if;

  return jsonb_build_object('review_id', p_review_id, 'status', 'approved', 'self_certified', v_is_self);
end;
$$;
revoke all on function public.approve_qs_review(uuid, text, text, text) from public, anon;
grant execute on function public.approve_qs_review(uuid, text, text, text) to authenticated;


-- ── 5. Team context: recognise the owner-QS so they see the QS surface ───────
-- Faithful copy of get_my_qs_team_context (migration 20260610130000) plus: the
-- declared owner-QS of their own company is now reported as a QS (am_i_qs), and a
-- new `am_i_principal_qs` flag tells the client who may use the self-sign-off path.
create or replace function public.get_my_qs_team_context()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_member record;
  v_company_name text;
  v_gate boolean;
  v_is_qs boolean;
  v_owner_is_qs boolean;
begin
  select coalesce(owner_is_qs, false) into v_owner_is_qs
  from public.company_profiles
  where user_id = auth.uid()
  limit 1;

  select employer_id into v_member
  from public.employer_employees
  where user_id = auth.uid()
    and employer_id is not null
    and status ilike 'active'
  order by updated_at desc
  limit 1;

  -- Not on anyone's roster, but a declared owner-QS of their own company.
  if v_member.employer_id is null then
    if v_owner_is_qs then
      select company_name, qs_approval_required into v_company_name, v_gate
      from public.company_profiles where user_id = auth.uid() limit 1;
      return jsonb_build_object(
        'is_team_member', true,
        'employer_id', auth.uid(),
        'company_name', v_company_name,
        'am_i_qs', true,
        'am_i_principal_qs', true,
        'qs_approval_required', coalesce(v_gate, false)
      );
    end if;
    return jsonb_build_object('is_team_member', false);
  end if;

  -- Roster member (worker / QS teammate) path.
  select company_name, qs_approval_required into v_company_name, v_gate
  from public.company_profiles
  where user_id = v_member.employer_id
  limit 1;

  select exists (
    select 1 from public.employer_employees
    where user_id = auth.uid()
      and employer_id = v_member.employer_id
      and team_role ilike 'qs'
      and status ilike 'active'
  ) into v_is_qs;

  return jsonb_build_object(
    'is_team_member', true,
    'employer_id', v_member.employer_id,
    'company_name', v_company_name,
    'am_i_qs', v_is_qs,
    'am_i_principal_qs', public.is_principal_qs_for(v_member.employer_id),
    'qs_approval_required', coalesce(v_gate, false)
  );
end;
$$;
revoke all on function public.get_my_qs_team_context() from public, anon;
grant execute on function public.get_my_qs_team_context() to authenticated;
