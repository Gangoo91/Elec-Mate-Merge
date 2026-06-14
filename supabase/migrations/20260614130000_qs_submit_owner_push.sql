-- QS submit → push the OWNER/employer, not just the in-app bell.
--
-- Before: submit_report_for_qs_review rang the in-app bell (employer_notifications)
-- for the employer and PUSHED only the QS reviewers — so the firm owner never got
-- a phone push when a cert was submitted for review. Snags / expenses / leave
-- already follow the "employer ← bell + push" pattern (team_notifications_audit);
-- this brings QS submit in line.
--
-- Changes (additive, reversible — applied live as qs_submit_owner_push):
--   * push v_employer_id (the owner) with who submitted + a deep-link route to
--     the QS reviews bench
--   * carry a 'route' in the bell metadata so the in-app notification deep-links too
--   * exclude the owner from the QS-reviewer push loop (no double push if the
--     owner is also a QS member)
-- Rollback: restore the prior body (no owner push, no route in metadata).

CREATE OR REPLACE FUNCTION public.submit_report_for_qs_review(p_report_uuid uuid, p_note text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_report record;
  v_employer_id uuid;
  v_review public.report_qs_reviews;
  v_already boolean := false;
  v_electrician_name text;
  v_qs record;
  v_body text;
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

    v_body := v_electrician_name || ' submitted ' || upper(v_report.report_type) || ' ' ||
        coalesce(v_report.certificate_number, v_report.report_id) ||
        coalesce(' for ' || v_report.client_name, '') || ' for review';

    insert into public.employer_notifications (user_id, type, title, message, metadata)
    values (
      v_employer_id,
      'qs_review_submitted',
      'Certificate awaiting QS review',
      v_body,
      jsonb_build_object(
        'review_id', v_review.id,
        'report_id', v_report.report_id,
        'report_type', v_report.report_type,
        'route', '/employer?section=qsreviews'
      )
    );

    -- Owner/employer push (oversight) — same bell+push pattern as snags.
    perform public.qs_review_push(
      v_employer_id,
      'Certificate awaiting QS review',
      v_body,
      jsonb_build_object('review_id', v_review.id, 'report_id', v_report.report_id, 'route', '/employer?section=qsreviews')
    );

    -- Every QS reviewer (not the submitter, not the owner who was just pushed).
    for v_qs in
      select user_id from public.employer_employees
      where employer_id = v_employer_id
        and user_id is not null
        and user_id <> auth.uid()
        and user_id <> v_employer_id
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
$function$;
