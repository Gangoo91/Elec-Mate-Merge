-- QS sign-off makes a certificate a final record.
--
-- Industry / competent-person-scheme practice: once a Qualifying Supervisor
-- countersigns a cert, it is the definitive record of safety compliance and
-- cannot be amended except via a fresh version (evidenced error). Until now QS
-- approval and issue/lock were orthogonal — a cert could be approved yet still
-- freely edited, which drifts the approval content-hash and silently blocks PDF
-- generation (ELE-1183).
--
-- This makes approval auto-issue & lock the report (if not already locked). The
-- lock is read-only; PDF generation still works, and "Amend" creates a new
-- version — exactly the regulator-correct flow.
--
-- Rollback: re-create approve_qs_review without the final `update public.reports
-- set locked_at ...` block (restore the prior definition).

create or replace function public.approve_qs_review(p_review_id uuid, p_signature text, p_reviewer_name text, p_comments text default null::text)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_review public.report_qs_reviews;
  v_report record;
  v_rows integer;
  v_is_self boolean;
begin
  select * into v_review from public.report_qs_reviews where id = p_review_id;
  if v_review.id is null then raise exception 'REVIEW_NOT_FOUND'; end if;
  if v_review.status <> 'pending' then raise exception 'REVIEW_NOT_PENDING'; end if;
  if not public.is_qs_reviewer_for(v_review.employer_id) then raise exception 'NOT_AUTHORISED'; end if;

  v_is_self := (v_review.electrician_id = auth.uid());
  if v_is_self and not public.is_principal_qs_for(v_review.employer_id) then
    raise exception 'SELF_APPROVAL_FORBIDDEN';
  end if;
  if coalesce(trim(p_signature), '') = '' or coalesce(trim(p_reviewer_name), '') = '' then
    raise exception 'SIGNATURE_REQUIRED';
  end if;

  select updated_at, md5(data::text) as data_hash into v_report
  from public.reports where id = v_review.report_uuid and deleted_at is null;
  if v_report.updated_at is null then raise exception 'REPORT_NOT_FOUND'; end if;

  update public.report_qs_reviews
     set status = 'approved', reviewed_by = auth.uid(),
         reviewer_employee_id = (select id from public.employer_employees
           where employer_id = v_review.employer_id and user_id = auth.uid()
           order by created_at asc limit 1),
         reviewer_name = trim(p_reviewer_name), qs_signature = p_signature,
         review_comments = nullif(trim(p_comments), ''), self_certified = v_is_self,
         reviewed_at = now(), report_updated_at_snapshot = v_report.updated_at,
         report_data_hash = v_report.data_hash, updated_at = now()
   where id = p_review_id and status = 'pending';
  get diagnostics v_rows = row_count;
  if v_rows = 0 then raise exception 'REVIEW_NOT_PENDING'; end if;

  -- Auto-issue & lock: QS countersignature = final record. Runs AFTER the review
  -- is marked approved (with the matching data hash just stamped), so the
  -- enforce_qs_issue_gate trigger on locked_at passes. Never overwrites an
  -- existing lock timestamp.
  update public.reports
     set locked_at = now()
   where id = v_review.report_uuid
     and deleted_at is null
     and locked_at is null;

  if not v_is_self then
    perform public.qs_review_push(
      v_review.electrician_id, 'Certificate approved by QS',
      trim(p_reviewer_name) || ' approved ' || upper(v_review.report_type) || ' ' || v_review.report_id,
      jsonb_build_object('review_id', p_review_id, 'report_id', v_review.report_id));
    -- in-app bell (does not depend on a push token)
    insert into public.employer_notifications (user_id, type, title, message, metadata)
    values (v_review.electrician_id, 'qs_review_approved', 'Certificate approved by QS',
      trim(p_reviewer_name) || ' approved ' || upper(v_review.report_type) || ' ' || v_review.report_id,
      jsonb_build_object('review_id', p_review_id, 'report_id', v_review.report_id, 'route', '/employer?section=qsreviews'));
  end if;

  return jsonb_build_object('review_id', p_review_id, 'status', 'approved', 'self_certified', v_is_self, 'locked', true);
end;
$function$;
