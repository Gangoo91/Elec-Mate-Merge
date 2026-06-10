-- ============================================================================
-- QS (Qualifying Supervisor) certificate review workflow — foundation
--
-- 1. Per-company RLS hardening on the two tables this feature touches
--    (employer_employees, employer_notifications)
-- 2. Roster claim-by-email linkage (employer adds team member with email,
--    the electrician's account links automatically on sign-in)
-- 3. report_qs_reviews table — review state lives here, NEVER in reports.data
--    (offline-first sync rewrites the whole data blob) and NEVER widens
--    reports RLS (all cross-user access via SECURITY DEFINER RPCs below)
--
-- Rollback:
--   drop function get_my_qs_team_context, submit_report_for_qs_review,
--     get_qs_review_queue, get_qs_review_report, approve_qs_review,
--     return_qs_review, cancel_qs_review, claim_employee_records, qs_review_push;
--   drop table report_qs_reviews;
--   recreate the two dropped "Employer access only" policies verbatim.
-- ============================================================================

-- ─── 1a. employer_employees: drop the blanket any-employer-role policy ─────
-- The properly scoped "Employers can manage employees" (employer_id = auth.uid())
-- and the own-row user policies remain and cover all legitimate access.
drop policy if exists "Employer access only" on public.employer_employees;

-- ─── 1b. employer_notifications: align schema with the reader hook + scope ─
-- Live table has employee_id but the bell hook (useEmployerNotifications)
-- queries user_id + metadata, which don't exist — the bell is silently dead.
-- Add the columns the reader expects; keep employee_id for the job-assignment
-- writer (notificationService.createNotification).
alter table public.employer_notifications
  add column if not exists user_id uuid,
  add column if not exists metadata jsonb;

create index if not exists idx_employer_notifications_user_unread
  on public.employer_notifications (user_id)
  where read_at is null;

drop policy if exists "Employer access only" on public.employer_notifications;

-- Read your own notifications: rows keyed to your auth uid directly, or via
-- a roster row linked to your account.
create policy "Users read own notifications"
  on public.employer_notifications
  for select to authenticated
  using (
    user_id = (select auth.uid())
    or exists (
      select 1 from public.employer_employees e
      where e.id = employer_notifications.employee_id
        and e.user_id = (select auth.uid())
    )
  );

create policy "Users mark own notifications read"
  on public.employer_notifications
  for update to authenticated
  using (
    user_id = (select auth.uid())
    or exists (
      select 1 from public.employer_employees e
      where e.id = employer_notifications.employee_id
        and e.user_id = (select auth.uid())
    )
  )
  with check (
    user_id = (select auth.uid())
    or exists (
      select 1 from public.employer_employees e
      where e.id = employer_notifications.employee_id
        and e.user_id = (select auth.uid())
    )
  );

-- Employers can insert notifications for members of their own roster
-- (keeps the job-assignment writer working, now company-scoped).
create policy "Employers can notify own roster"
  on public.employer_notifications
  for insert to authenticated
  with check (
    exists (
      select 1 from public.employer_employees e
      where e.id = employer_notifications.employee_id
        and e.employer_id = (select auth.uid())
    )
  );

-- ─── 2. Roster claim-by-email ───────────────────────────────────────────────
-- Links employer-created roster rows (employer_id NOT NULL — never the
-- self-created Elec-ID stubs) to the signed-in user by auth email match.
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
  select lower(email) into v_email from auth.users where id = auth.uid();
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

revoke all on function public.claim_employee_records() from public, anon;
grant execute on function public.claim_employee_records() to authenticated;

-- ─── 3. Review state table ──────────────────────────────────────────────────
create table public.report_qs_reviews (
  id uuid primary key default gen_random_uuid(),
  report_uuid uuid not null references public.reports(id) on delete cascade,
  report_id text not null,
  report_type text not null check (report_type in ('eicr', 'eic', 'minor-works')),
  employer_id uuid not null,
  electrician_id uuid not null,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'returned', 'cancelled')),
  submitted_note text,
  submitted_at timestamptz not null default now(),
  reviewed_by uuid,
  reviewer_employee_id uuid references public.employer_employees(id) on delete set null,
  reviewer_name text,
  qs_signature text,
  qs_position text not null default 'Qualifying Supervisor',
  review_comments text,
  reviewed_at timestamptz,
  report_updated_at_snapshot timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- One open review per report
create unique index uniq_qs_review_pending
  on public.report_qs_reviews (report_uuid)
  where status = 'pending';

create index idx_qs_reviews_employer_status
  on public.report_qs_reviews (employer_id, status);

create index idx_qs_reviews_electrician
  on public.report_qs_reviews (electrician_id);

alter table public.report_qs_reviews enable row level security;

-- SELECT only; all writes go through the SECURITY DEFINER RPCs below.
create policy "Review participants can view"
  on public.report_qs_reviews
  for select to authenticated
  using (
    electrician_id = (select auth.uid())
    or employer_id = (select auth.uid())
    or exists (
      select 1 from public.employer_employees e
      where e.employer_id = report_qs_reviews.employer_id
        and e.user_id = (select auth.uid())
        and e.team_role ilike 'qs'
        and e.status ilike 'active'
    )
  );

-- ─── 4. Push helper (fire-and-forget, vault pattern) ───────────────────────
-- Mirrors call_referral_push_trigger (20260414120000_smart_notifications_engine.sql)
-- but targets the generic send-push-notification function. Not callable by
-- clients — only invoked from the definer RPCs below.
create or replace function public.qs_review_push(
  p_user_id uuid,
  p_title text,
  p_body text,
  p_data jsonb default '{}'::jsonb
)
returns void
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  service_key text;
begin
  select decrypted_secret into service_key
  from vault.decrypted_secrets
  where name = 'service_role_key'
  limit 1;

  if service_key is null then
    raise warning '[qs_review_push] service_role_key not found in vault';
    return;
  end if;

  perform net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/send-push-notification',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || service_key
    ),
    body := jsonb_build_object(
      'userId', p_user_id,
      'title', p_title,
      'body', p_body,
      'type', 'certificate',
      'data', p_data
    )
  );
exception when others then
  raise warning '[qs_review_push] failed: %', sqlerrm;
end;
$$;

revoke all on function public.qs_review_push(uuid, text, text, jsonb) from public, anon, authenticated;

-- ─── 5. Team context for the electrician side ──────────────────────────────
-- Electricians can't read the employer's company_profiles row (owner-only RLS),
-- so this is how the cert form learns "am I on a team / is the gate on".
-- qs_approval_required is hardcoded false until the gate slice adds the column.
create or replace function public.get_my_qs_team_context()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_member record;
  v_company_name text;
  v_is_qs boolean;
begin
  select employer_id into v_member
  from public.employer_employees
  where user_id = auth.uid()
    and employer_id is not null
    and status ilike 'active'
  order by updated_at desc
  limit 1;

  if v_member.employer_id is null then
    return jsonb_build_object('is_team_member', false);
  end if;

  select company_name into v_company_name
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
    'qs_approval_required', false
  );
end;
$$;

revoke all on function public.get_my_qs_team_context() from public, anon;
grant execute on function public.get_my_qs_team_context() to authenticated;

-- ─── 6. Submit a cert for QS review ─────────────────────────────────────────
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

  select employer_id into v_employer_id
  from public.employer_employees
  where user_id = auth.uid()
    and employer_id is not null
    and status ilike 'active'
  order by updated_at desc
  limit 1;

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
    -- A pending review already existed — idempotent no-op, no duplicate notifications
    v_already := true;
    select * into v_review
    from public.report_qs_reviews
    where report_uuid = v_report.id and status = 'pending';
  end if;

  if not v_already then
    select full_name into v_electrician_name
    from public.profiles where id = auth.uid();
    v_electrician_name := coalesce(nullif(trim(v_electrician_name), ''), 'A team member');

    -- Bell notification for the employer account
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

    -- Push to every active QS on the team
    for v_qs in
      select user_id from public.employer_employees
      where employer_id = v_employer_id
        and user_id is not null
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

revoke all on function public.submit_report_for_qs_review(uuid, text) from public, anon;
grant execute on function public.submit_report_for_qs_review(uuid, text) to authenticated;

-- ─── 7. Reviewer-side reads ─────────────────────────────────────────────────
-- Shared auth check: caller is the employer or an active QS of that company.
create or replace function public.is_qs_reviewer_for(p_employer_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select p_employer_id = auth.uid()
    or exists (
      select 1 from public.employer_employees
      where employer_id = p_employer_id
        and user_id = auth.uid()
        and team_role ilike 'qs'
        and status ilike 'active'
    );
$$;

revoke all on function public.is_qs_reviewer_for(uuid) from public, anon;
grant execute on function public.is_qs_reviewer_for(uuid) to authenticated;

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
  -- Resolve which company's queue the caller may see: an employer with a
  -- roster sees their own company; otherwise an active QS teammate sees
  -- the company they review for. (Deliberately NOT keyed on company_profiles —
  -- sole-trader electricians have one of those for their own settings.)
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
    order by e.updated_at desc
    limit 1;
  end if;

  if v_employer_id is null then
    return; -- not an employer, not a QS — empty queue
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
  join public.reports r on r.id = q.report_uuid
  left join public.profiles p on p.id = q.electrician_id
  left join public.employer_employees e
    on e.employer_id = q.employer_id and e.user_id = q.electrician_id
  where q.employer_id = v_employer_id
    and (p_status is null or q.status = p_status)
  order by q.submitted_at desc;
end;
$$;

revoke all on function public.get_qs_review_queue(text) from public, anon;
grant execute on function public.get_qs_review_queue(text) to authenticated;

create or replace function public.get_qs_review_report(p_review_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_review public.report_qs_reviews;
  v_report record;
begin
  select * into v_review from public.report_qs_reviews where id = p_review_id;
  if v_review.id is null then
    raise exception 'REVIEW_NOT_FOUND';
  end if;

  if not public.is_qs_reviewer_for(v_review.employer_id) then
    raise exception 'NOT_AUTHORISED';
  end if;

  select id, report_id, report_type, certificate_number, client_name,
         installation_address, inspection_date, inspector_name,
         data, updated_at, pdf_url
    into v_report
  from public.reports
  where id = v_review.report_uuid and deleted_at is null;

  if v_report.id is null then
    raise exception 'REPORT_NOT_FOUND';
  end if;

  return jsonb_build_object(
    'review', to_jsonb(v_review),
    'report', jsonb_build_object(
      'id', v_report.id,
      'report_id', v_report.report_id,
      'report_type', v_report.report_type,
      'certificate_number', v_report.certificate_number,
      'client_name', v_report.client_name,
      'installation_address', v_report.installation_address,
      'inspection_date', v_report.inspection_date,
      'inspector_name', v_report.inspector_name,
      'updated_at', v_report.updated_at,
      'pdf_url', v_report.pdf_url,
      'data', v_report.data
    )
  );
end;
$$;

revoke all on function public.get_qs_review_report(uuid) from public, anon;
grant execute on function public.get_qs_review_report(uuid) to authenticated;

-- ─── 8. Review decisions ────────────────────────────────────────────────────
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
  v_report_updated_at timestamptz;
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
  if coalesce(trim(p_signature), '') = '' or coalesce(trim(p_reviewer_name), '') = '' then
    raise exception 'SIGNATURE_REQUIRED';
  end if;

  select updated_at into v_report_updated_at
  from public.reports where id = v_review.report_uuid;

  update public.report_qs_reviews
     set status = 'approved',
         reviewed_by = auth.uid(),
         reviewer_employee_id = (
           select id from public.employer_employees
           where employer_id = v_review.employer_id and user_id = auth.uid()
           order by updated_at desc limit 1
         ),
         reviewer_name = trim(p_reviewer_name),
         qs_signature = p_signature,
         review_comments = nullif(trim(p_comments), ''),
         reviewed_at = now(),
         report_updated_at_snapshot = v_report_updated_at,
         updated_at = now()
   where id = p_review_id;

  perform public.qs_review_push(
    v_review.electrician_id,
    'Certificate approved by QS',
    trim(p_reviewer_name) || ' approved ' || upper(v_review.report_type) || ' ' || v_review.report_id,
    jsonb_build_object('review_id', p_review_id, 'report_id', v_review.report_id)
  );

  return jsonb_build_object('review_id', p_review_id, 'status', 'approved');
end;
$$;

revoke all on function public.approve_qs_review(uuid, text, text, text) from public, anon;
grant execute on function public.approve_qs_review(uuid, text, text, text) to authenticated;

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
   where id = p_review_id;

  perform public.qs_review_push(
    v_review.electrician_id,
    'Certificate returned by QS',
    upper(v_review.report_type) || ' ' || v_review.report_id || ' needs changes — see QS comments',
    jsonb_build_object('review_id', p_review_id, 'report_id', v_review.report_id)
  );

  return jsonb_build_object('review_id', p_review_id, 'status', 'returned');
end;
$$;

revoke all on function public.return_qs_review(uuid, text) from public, anon;
grant execute on function public.return_qs_review(uuid, text) to authenticated;

create or replace function public.cancel_qs_review(p_review_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_review public.report_qs_reviews;
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
   where id = p_review_id;

  return jsonb_build_object('review_id', p_review_id, 'status', 'cancelled');
end;
$$;

revoke all on function public.cancel_qs_review(uuid) from public, anon;
grant execute on function public.cancel_qs_review(uuid) to authenticated;

-- ─── 9. employer_notifications rows may be keyed by user_id alone ───────────
-- (e.g. notifying the employer account itself, which has no roster row)
alter table public.employer_notifications
  alter column employee_id drop not null;

alter table public.employer_notifications
  add constraint employer_notifications_target_check
  check (employee_id is not null or user_id is not null);
