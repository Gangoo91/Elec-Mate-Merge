-- ELE-1975 — QS reviews: return-reason patterns, stats, and a working path for
-- a QS who is not the firm owner.
--
-- 1. report_qs_reviews.return_reasons: the coded reasons a QS ticks when they
--    send a certificate back (free text stays in review_comments). Codes are
--    checked against qs_return_reason_label(), the one list of reasons.
-- 2. return_qs_review gains p_reasons (default '{}'): a return needs at least
--    one reason or a comment; with no comment the reasons become the comment.
-- 3. get_qs_review_queue / get_my_qs_reviews also return return_reasons and
--    the job the certificate is on (ELE-1973 link), so both sides can show why.
-- 4. get_qs_review_report: the electrician who submitted can read their own
--    review (the worker-side "My certificates" detail was NOT_AUTHORISED for
--    everyone who was not also a QS).
-- 5. get_qs_review_stats: waiting, returned this month, approved this month,
--    average hours to sign-off, the common reasons over the last 20 decisions,
--    and whether the caller can sign (office managers cannot).

alter table public.report_qs_reviews
  add column if not exists return_reasons text[] not null default '{}';

create or replace function public.qs_return_reason_label(p_code text)
returns text
language sql
immutable
set search_path = public
as $$
  select case p_code
    when 'missing_readings' then 'Missing test readings'
    when 'zs_over_limit' then 'Zs over the limit'
    when 'ir_low' then 'Insulation resistance too low'
    when 'rcd_untested' then 'RCD not tested'
    when 'observation_codes' then 'Observation codes wrong'
    when 'observations_unclear' then 'Observations missing or unclear'
    when 'supply_earthing' then 'Supply or earthing details missing'
    when 'inspection_schedule' then 'Schedule of inspections incomplete'
    when 'outcome_mismatch' then 'Overall outcome does not match the findings'
    when 'client_details' then 'Client or address details wrong'
    when 'signatures' then 'Signatures or declarations missing'
    when 'limitations' then 'Limitations not recorded'
    when 'other' then 'Other'
    else null
  end;
$$;
revoke all on function public.qs_return_reason_label(text) from public, anon;
grant execute on function public.qs_return_reason_label(text) to authenticated;

-- The firm whose queue the caller works (same rule get_qs_review_queue used).
create or replace function public._qs_queue_employer()
returns uuid
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_employer_id uuid;
begin
  if exists (select 1 from public.employer_employees
             where employer_id in (select public.my_employer_scope())) then
    v_employer_id := public.my_default_employer_id();
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
  return v_employer_id;
end;
$$;
revoke all on function public._qs_queue_employer() from public, anon, authenticated;

drop function if exists public.return_qs_review(uuid, text);
create or replace function public.return_qs_review(
  p_review_id uuid,
  p_comments text,
  p_reasons text[] default '{}'
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_review public.report_qs_reviews;
  v_rows integer;
  v_reviewer_name text;
  v_reasons text[] := coalesce(array(select distinct x from unnest(coalesce(p_reasons, '{}')) x
                                      where nullif(trim(x), '') is not null), '{}');
  v_comments text := nullif(trim(coalesce(p_comments, '')), '');
  v_body text;
begin
  select * into v_review from public.report_qs_reviews where id = p_review_id;
  if v_review.id is null then raise exception 'REVIEW_NOT_FOUND'; end if;
  if v_review.status <> 'pending' then raise exception 'REVIEW_NOT_PENDING'; end if;
  if not public.is_qs_signer_for(v_review.employer_id) then raise exception 'NOT_AUTHORISED'; end if;
  if exists (select 1 from unnest(v_reasons) x where public.qs_return_reason_label(x) is null) then
    raise exception 'UNKNOWN_REASON';
  end if;
  if v_comments is null and cardinality(v_reasons) = 0 then
    raise exception 'COMMENTS_REQUIRED';
  end if;
  if v_comments is null then
    select string_agg(public.qs_return_reason_label(x), '. ') || '.' into v_comments
      from unnest(v_reasons) x;
  end if;

  select coalesce(nullif(trim(pr.full_name), ''), ee.name) into v_reviewer_name
  from public.profiles pr
  left join public.employer_employees ee
    on ee.employer_id = v_review.employer_id and ee.user_id = auth.uid()
  where pr.id = auth.uid()
  limit 1;

  update public.report_qs_reviews
     set status = 'returned', reviewed_by = auth.uid(),
         reviewer_name = v_reviewer_name,
         review_comments = v_comments, return_reasons = v_reasons,
         reviewed_at = now(), updated_at = now()
   where id = p_review_id and status = 'pending';
  get diagnostics v_rows = row_count;
  if v_rows = 0 then raise exception 'REVIEW_NOT_PENDING'; end if;

  v_body := public.notif_cert_label(v_review.report_type) || ' ' || v_review.report_id
            || ' needs changes. '
            || case when cardinality(v_reasons) > 0
                    then (select string_agg(public.qs_return_reason_label(x), ', ') from unnest(v_reasons) x) || '.'
                    else 'See the QS comments.' end;

  perform public.qs_review_push(
    v_review.electrician_id, 'Certificate returned by QS', v_body,
    jsonb_build_object('review_id', p_review_id, 'report_id', v_review.report_id, 'route', '/electrician/worker-tools/qs-reviews?review=' || p_review_id, 'deep_link', '/electrician/worker-tools/qs-reviews?review=' || p_review_id));
  insert into public.employer_notifications (user_id, type, title, message, action_url, metadata)
  values (v_review.electrician_id, 'qs_review_returned', 'Certificate returned by QS', v_body,
    '/electrician/worker-tools/qs-reviews?review=' || p_review_id,
    jsonb_build_object('review_id', p_review_id, 'report_id', v_review.report_id, 'route', '/electrician/worker-tools/qs-reviews?review=' || p_review_id, 'deep_link', '/electrician/worker-tools/qs-reviews?review=' || p_review_id));

  return jsonb_build_object('review_id', p_review_id, 'status', 'returned', 'return_reasons', to_jsonb(v_reasons));
end;
$$;
revoke all on function public.return_qs_review(uuid, text, text[]) from public, anon;
grant execute on function public.return_qs_review(uuid, text, text[]) to authenticated;

drop function if exists public.get_qs_review_queue(text);
create or replace function public.get_qs_review_queue(p_status text default null)
returns table(
  review_id uuid, status text, submitted_at timestamptz, submitted_note text,
  reviewed_at timestamptz, reviewer_name text, review_comments text,
  report_uuid uuid, report_id text, report_type text, certificate_number text,
  client_name text, installation_address text, inspection_date text,
  inspector_name text, report_updated_at timestamptz, electrician_id uuid,
  electrician_name text, return_reasons text[], job_id uuid, job_title text
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_employer_id uuid := public._qs_queue_employer();
begin
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
    q.electrician_id, coalesce(p.full_name, e.name, 'Team member')::text,
    q.return_reasons, jl.job_id, jj.title::text
  from public.report_qs_reviews q
  join public.reports r on r.id = q.report_uuid and r.deleted_at is null
  left join public.profiles p on p.id = q.electrician_id
  left join lateral (
    select ee.name
    from public.employer_employees ee
    where ee.employer_id = q.employer_id and ee.user_id = q.electrician_id
    order by ee.created_at asc
    limit 1
  ) e on true
  left join public.employer_job_certificates jl
    on jl.report_uuid = r.id and jl.employer_id = q.employer_id
  left join public.employer_jobs jj on jj.id = jl.job_id
  where q.employer_id = v_employer_id
    and (p_status is null or q.status = p_status)
  order by q.submitted_at desc;
end;
$$;
revoke all on function public.get_qs_review_queue(text) from public, anon;
grant execute on function public.get_qs_review_queue(text) to authenticated;

drop function if exists public.get_my_qs_reviews();
create or replace function public.get_my_qs_reviews()
returns table(
  review_id uuid, status text, submitted_at timestamptz, submitted_note text,
  reviewed_at timestamptz, reviewer_name text, review_comments text,
  report_uuid uuid, report_id text, report_type text, certificate_number text,
  client_name text, installation_address text, inspection_date text,
  inspector_name text, report_updated_at timestamptz, electrician_id uuid,
  electrician_name text, return_reasons text[], job_id uuid, job_title text
)
language sql
security definer
set search_path = public
as $$
  select
    q.id, q.status, q.submitted_at, q.submitted_note,
    q.reviewed_at, q.reviewer_name, q.review_comments,
    r.id, r.report_id, r.report_type,
    r.certificate_number::text, r.client_name::text,
    r.installation_address::text, r.inspection_date::text,
    r.inspector_name::text, r.updated_at,
    q.electrician_id, coalesce(p.full_name, 'You')::text,
    q.return_reasons, jl.job_id, jj.title::text
  from public.report_qs_reviews q
  join public.reports r on r.id = q.report_uuid and r.deleted_at is null
  left join public.profiles p on p.id = q.electrician_id
  left join public.employer_job_certificates jl
    on jl.report_uuid = r.id and jl.employer_id = q.employer_id
  left join public.employer_jobs jj on jj.id = jl.job_id
  where q.electrician_id = auth.uid()
  order by
    case q.status
      when 'returned' then 0 when 'pending' then 1 when 'approved' then 2 else 3
    end,
    coalesce(q.reviewed_at, q.submitted_at) desc;
$$;
revoke all on function public.get_my_qs_reviews() from public, anon;
grant execute on function public.get_my_qs_reviews() to authenticated;

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

  if not (public.is_qs_reviewer_for(v_review.employer_id)
          or v_review.electrician_id = auth.uid()) then
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

create or replace function public.get_qs_review_stats()
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_employer_id uuid := public._qs_queue_employer();
  v_month_start timestamptz := date_trunc('month', now() at time zone 'Europe/London') at time zone 'Europe/London';
  v_decided integer;
begin
  if v_employer_id is null then
    return jsonb_build_object('has_queue', false);
  end if;

  select count(*) into v_decided from (
    select 1 from public.report_qs_reviews q
     where q.employer_id = v_employer_id and q.status in ('approved', 'returned')
     order by q.reviewed_at desc nulls last limit 20) d;

  return jsonb_build_object(
    'has_queue', true,
    'can_sign', public.is_qs_signer_for(v_employer_id),
    'waiting', (select count(*) from public.report_qs_reviews q
                  join public.reports r on r.id = q.report_uuid and r.deleted_at is null
                 where q.employer_id = v_employer_id and q.status = 'pending'),
    'oldest_waiting_at', (select min(q.submitted_at) from public.report_qs_reviews q
                  join public.reports r on r.id = q.report_uuid and r.deleted_at is null
                 where q.employer_id = v_employer_id and q.status = 'pending'),
    'returned_month', (select count(*) from public.report_qs_reviews q
                 where q.employer_id = v_employer_id and q.status = 'returned'
                   and q.reviewed_at >= v_month_start),
    'approved_month', (select count(*) from public.report_qs_reviews q
                 where q.employer_id = v_employer_id and q.status = 'approved'
                   and q.reviewed_at >= v_month_start),
    'avg_hours_to_signoff', (select round((avg(extract(epoch from (q.reviewed_at - q.submitted_at))) / 3600.0)::numeric, 1)
                 from public.report_qs_reviews q
                where q.employer_id = v_employer_id and q.status = 'approved'
                  and q.reviewed_at >= now() - interval '90 days'
                  and q.reviewed_at >= q.submitted_at),
    'decided_recent', v_decided,
    'returned_recent', (select count(*) from (
                 select q.status from public.report_qs_reviews q
                  where q.employer_id = v_employer_id and q.status in ('approved', 'returned')
                  order by q.reviewed_at desc nulls last limit 20) d where d.status = 'returned'),
    'common_reasons', coalesce((
      select jsonb_agg(jsonb_build_object('code', c.code, 'label', public.qs_return_reason_label(c.code), 'count', c.n)
                       order by c.n desc, c.code)
        from (
          select x as code, count(*) as n
            from (select q.return_reasons from public.report_qs_reviews q
                   where q.employer_id = v_employer_id and q.status in ('approved', 'returned')
                   order by q.reviewed_at desc nulls last limit 20) d,
                 unnest(d.return_reasons) x
           group by x
        ) c
    ), '[]'::jsonb)
  );
end;
$$;
revoke all on function public.get_qs_review_stats() from public, anon;
grant execute on function public.get_qs_review_stats() to authenticated;
