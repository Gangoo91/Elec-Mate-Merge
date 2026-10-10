-- assess agent, 10 Oct 2026. New functions only (no HEAD function changes).
--  * ELE-2084 Part P on the firm's job: get_firm_part_p, set_cert_part_p
--  * ELE-2069 scheme assessment pack data: get_assessment_pack
--  * ELE-2076 "Send our pack": create_pack_share, revoke_pack_share,
--    get_pack_share_by_token (intentionally anon: token-keyed, expiring)

-- The day the work finished, from the certificate (mirrors
-- src/utils/notificationHelper.ts completionDateOf). Bad dates are skipped.
create or replace function public._cert_completion_date(p_data jsonb, p_fallback date)
returns date
language plpgsql
stable
set search_path to 'public'
as $$
declare
  k text;
  v text;
begin
  foreach k in array array['completionDate', 'dateOfCompletion', 'workDate', 'installationDate',
                           'commissioningDate', 'inspectionDate', 'dateOfInspection'] loop
    v := nullif(btrim(coalesce(p_data->>k, '')), '');
    if v is not null then
      begin
        return left(v, 10)::date;
      exception when others then
        null;
      end;
    end if;
  end loop;
  return p_fallback;
end;
$$;
revoke all on function public._cert_completion_date(jsonb, date) from public, anon;

-- ELE-2084: Part P status of every certificate on the firm's jobs (or one job).
create or replace function public.get_firm_part_p(p_job_id uuid default null)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $$
declare
  v_owners uuid[] := array(select public.my_employer_scope());
begin
  if auth.uid() is null then
    raise exception 'NOT_AUTHORISED';
  end if;
  return coalesce((
    select jsonb_agg(x order by x.deadline nulls last)
      from (
        select
          r.id as report_uuid,
          r.report_id,
          r.report_type,
          r.certificate_number,
          r.status as cert_status,
          r.client_name,
          r.installation_address,
          l.job_id,
          j.title as job_title,
          coalesce(nullif(trim(op.full_name), ''), 'Team member') as owner_name,
          (r.user_id = auth.uid()) as mine,
          v.verdict,
          v.completed_on,
          coalesce(n.submission_deadline, v.completed_on + 30) as deadline,
          case
            when n.notification_status = 'submitted' then 'submitted'
            when n.notification_status in ('not_required', 'cancelled') then 'not_required'
            when r.status <> 'completed' then 'not_yet'
            when v.verdict = 'no' and n.id is null then 'not_required'
            when v.verdict = 'unknown' and n.id is null then 'unknown'
            when coalesce(n.submission_deadline, v.completed_on + 30) < current_date then 'overdue'
            else 'needed'
          end as state,
          case when n.id is null then null else jsonb_build_object(
            'id', n.id,
            'status', n.notification_status,
            'submitted_at', n.submitted_at,
            'reference', n.scheme_certificate_ref,
            'certificate_url', n.scheme_certificate_url,
            'certificate_name', n.scheme_certificate_name,
            'certificate_uploaded_at', n.scheme_certificate_uploaded_at,
            'authority', n.building_control_authority) end as notification
        from public.employer_job_certificates l
        join public.employer_jobs j on j.id = l.job_id
        join public.reports r on r.id = l.report_uuid and r.deleted_at is null
        left join public.profiles op on op.id = r.user_id
        cross join lateral (
          select public.part_p_certificate_verdict(r.report_type, r.data) as verdict,
                 public._cert_completion_date(r.data, coalesce(r.inspection_date, r.updated_at::date)) as completed_on
        ) v
        left join lateral (
          select * from public.part_p_notifications pn
           where pn.report_id = r.report_id and pn.user_id = r.user_id
           order by (pn.notification_status = 'cancelled'), pn.created_at desc
           limit 1
        ) n on true
        where l.employer_id = any (v_owners)
          and (p_job_id is null or l.job_id = p_job_id)
          and r.report_type in ('eic', 'minor-works', 'ev-charging', 'solar-pv', 'bess', 'eicr')
        limit 500
      ) x
     where x.verdict <> 'no' or x.notification is not null
  ), '[]'::jsonb);
end;
$$;
revoke all on function public.get_firm_part_p(uuid) from public, anon;
grant execute on function public.get_firm_part_p(uuid) to authenticated;

-- ELE-2084: the office (any firm manager on a certificate linked to one of
-- its jobs) or the electrician who made it marks Part P submitted, reopens
-- it, says it is not notifiable, and sets the scheme reference / attaches
-- the scheme's notification certificate (a scheme-certificates public URL).
create or replace function public.set_cert_part_p(
  p_report_uuid uuid,
  p_action text default null,
  p_reference text default null,
  p_certificate_url text default null,
  p_certificate_name text default null,
  p_clear_certificate boolean default false
)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_r public.reports%rowtype;
  v_n public.part_p_notifications%rowtype;
  v_completed date;
begin
  if auth.uid() is null then
    raise exception 'NOT_AUTHORISED';
  end if;
  if p_action is not null and p_action not in ('submitted', 'reopen', 'not_required') then
    raise exception 'BAD_ACTION';
  end if;
  select * into v_r from public.reports where id = p_report_uuid and deleted_at is null;
  if not found then
    raise exception 'NOT_FOUND';
  end if;
  if v_r.user_id <> auth.uid() and not exists (
    select 1 from public.employer_job_certificates l
     where l.report_uuid = v_r.id and l.employer_id in (select public.my_employer_scope())
  ) then
    raise exception 'NOT_AUTHORISED';
  end if;
  if p_certificate_url is not null
     and p_certificate_url not like '%/storage/v1/object/public/scheme-certificates/%' then
    raise exception 'BAD_CERTIFICATE_URL';
  end if;

  select * into v_n from public.part_p_notifications
   where report_id = v_r.report_id and user_id = v_r.user_id
   order by (notification_status = 'cancelled'), created_at desc
   limit 1;

  if not found then
    v_completed := public._cert_completion_date(v_r.data, coalesce(v_r.inspection_date, v_r.updated_at::date));
    insert into public.part_p_notifications
      (user_id, report_id, work_type, notification_status, submission_deadline,
       napit_submitted, niceic_submitted, local_authority_submitted)
    values
      (v_r.user_id, v_r.report_id,
       coalesce(nullif(btrim(coalesce(v_r.data->>'workDescription', v_r.data->>'descriptionOfWork', v_r.data->>'extentOfInstallation', '')), ''),
                case v_r.report_type when 'eic' then 'New installation or alteration'
                                     when 'minor-works' then 'Minor works'
                                     when 'ev-charging' then 'EV charge point installation'
                                     when 'solar-pv' then 'Solar PV installation'
                                     else 'Electrical work' end),
       'pending', v_completed + 30, false, false, false)
    returning * into v_n;
  end if;

  update public.part_p_notifications
     set notification_status = case p_action
                                 when 'submitted' then 'submitted'
                                 when 'reopen' then 'pending'
                                 when 'not_required' then 'not_required'
                                 else notification_status end,
         submitted_at = case p_action
                          when 'submitted' then coalesce(submitted_at, now())
                          when 'reopen' then null
                          else submitted_at end,
         scheme_certificate_ref = case when p_reference is null then scheme_certificate_ref
                                       else nullif(btrim(p_reference), '') end,
         scheme_certificate_url = case when p_clear_certificate then null
                                       when p_certificate_url is not null then p_certificate_url
                                       else scheme_certificate_url end,
         scheme_certificate_name = case when p_clear_certificate then null
                                        when p_certificate_url is not null then left(coalesce(p_certificate_name, 'Scheme certificate'), 200)
                                        else scheme_certificate_name end,
         scheme_certificate_uploaded_at = case when p_clear_certificate then null
                                               when p_certificate_url is not null then now()
                                               else scheme_certificate_uploaded_at end,
         updated_at = now()
   where id = v_n.id
   returning * into v_n;

  return jsonb_build_object('id', v_n.id, 'status', v_n.notification_status,
                            'reference', v_n.scheme_certificate_ref,
                            'certificate_url', v_n.scheme_certificate_url);
end;
$$;
revoke all on function public.set_cert_part_p(uuid, text, text, text, text, boolean) from public, anon;
grant execute on function public.set_cert_part_p(uuid, text, text, text, text, boolean) to authenticated;

-- ELE-2069: everything a scheme assessor asks for, for one period.
create or replace function public.get_assessment_pack(p_firm uuid, p_from date, p_to date)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $$
declare
  v_team uuid[];
begin
  if auth.uid() is null or p_firm is null or p_firm not in (select public.my_employer_scope()) then
    raise exception 'NOT_AUTHORISED';
  end if;
  if p_from is null or p_to is null or p_to < p_from or p_to - p_from > 800 then
    raise exception 'BAD_PERIOD';
  end if;

  v_team := array(
    select p_firm
    union
    select e.user_id from public.employer_employees e
     where e.employer_id = p_firm and e.user_id is not null
       and lower(coalesce(e.status, '')) <> 'archived');

  return jsonb_build_object(
    'period', jsonb_build_object('from', p_from, 'to', p_to),
    'firm', (
      select jsonb_build_object(
        'company_name', c.company_name, 'address', c.company_address, 'postcode', c.company_postcode,
        'registration_scheme', c.registration_scheme, 'registration_number', c.registration_number,
        'registration_expiry', c.registration_expiry, 'owner_is_qs', c.owner_is_qs,
        'qs_approval_required', c.qs_approval_required,
        'inspector_name', c.inspector_name, 'inspector_qualifications', to_jsonb(c.inspector_qualifications),
        'insurance_provider', c.insurance_provider, 'insurance_policy_number', c.insurance_policy_number,
        'insurance_coverage', c.insurance_coverage, 'insurance_expiry', c.insurance_expiry,
        'testing_instruments', c.testing_instruments)
        from public.company_profiles c where c.user_id = p_firm limit 1),
    'owner_name', (select nullif(trim(p.full_name), '') from public.profiles p where p.id = p_firm),
    'team', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', e.id, 'name', e.name, 'role', e.role, 'team_role', e.team_role,
        'is_principal_qs', e.is_principal_qs, 'linked', e.user_id is not null,
        'is_owner', e.user_id = p_firm,
        'ecs_card', (select jsonb_build_object('type', ep.ecs_card_type, 'expiry', ep.ecs_expiry_date,
                                               'level', ep.ecs_verification_level)
                       from public.employer_elec_id_profiles ep
                      where ep.id = public._elec_id_profile_for_roster(e.id)),
        'qualifications', coalesce((
          select jsonb_agg(jsonb_build_object(
            'code', q.qualification_name, 'label', public.qualification_label(q.qualification_name),
            'category', coalesce(q.category, q.qualification_type), 'awarding_body', q.awarding_body,
            'achieved', q.date_achieved, 'expiry', q.expiry_date, 'number', q.certificate_number,
            'verification', q.verification_level, 'training_status', q.training_status,
            'has_document', q.document_url is not null) order by q.date_achieved desc nulls last)
            from public.employer_elec_id_qualifications q
           where q.profile_id = public._elec_id_profile_for_roster(e.id)), '[]'::jsonb)
      ) order by e.is_principal_qs desc, e.name)
        from public.employer_employees e
       where e.employer_id = p_firm and lower(coalesce(e.status, '')) <> 'archived'), '[]'::jsonb),
    'certificates', coalesce((
      select jsonb_agg(x order by x.issued_on desc)
        from (
          select r.id, r.report_id, r.report_type, r.certificate_number, r.client_name,
                 r.installation_address,
                 coalesce(r.inspection_date, r.updated_at::date) as issued_on,
                 r.user_id,
                 coalesce(nullif(trim(op.full_name), ''), 'Team member') as owner_name,
                 (r.storage_path is not null or r.pdf_url is not null) as has_pdf,
                 r.pdf_url,
                 (select lj.job_id from public.employer_job_certificates lj where lj.report_uuid = r.id limit 1) as job_id,
                 (select q.status from public.report_qs_reviews q
                   where q.report_uuid = r.id and q.status <> 'cancelled'
                   order by q.created_at desc limit 1) as qs_status,
                 public.part_p_certificate_verdict(r.report_type, r.data) as part_p_verdict,
                 (select jsonb_build_object('status', pn.notification_status, 'deadline', pn.submission_deadline,
                                            'submitted_at', pn.submitted_at, 'reference', pn.scheme_certificate_ref,
                                            'certificate_url', pn.scheme_certificate_url)
                    from public.part_p_notifications pn
                   where pn.report_id = r.report_id and pn.user_id = r.user_id
                   order by (pn.notification_status = 'cancelled'), pn.created_at desc limit 1) as part_p,
                 (select count(*) from jsonb_array_elements(
                     case when jsonb_typeof(r.data->'defectObservations') = 'array'
                          then r.data->'defectObservations' else '[]'::jsonb end) o
                   where upper(coalesce(o->>'defectCode', '')) in ('C1', 'C2')) as c1c2
            from public.reports r
            left join public.profiles op on op.id = r.user_id
           where r.user_id = any (v_team)
             and r.deleted_at is null
             and r.status = 'completed'
             and coalesce(r.inspection_date, r.updated_at::date) between p_from and p_to
           order by coalesce(r.inspection_date, r.updated_at::date) desc
           limit 2000
        ) x), '[]'::jsonb),
    'qs_reviews', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', q.id, 'report_id', q.report_id, 'report_type', q.report_type, 'status', q.status,
        'submitted_at', q.submitted_at, 'reviewed_at', q.reviewed_at, 'reviewer_name', q.reviewer_name,
        'self_certified', q.self_certified,
        'electrician', coalesce(nullif(trim(p.full_name), ''), 'Team member'),
        'reasons', coalesce((select jsonb_agg(public.qs_return_reason_label(rc)) from unnest(q.return_reasons) rc), '[]'::jsonb),
        'comments', q.review_comments) order by q.submitted_at desc)
        from public.report_qs_reviews q
        left join public.profiles p on p.id = q.electrician_id
       where q.employer_id = p_firm and q.status <> 'cancelled'
         and q.submitted_at::date between p_from and p_to), '[]'::jsonb),
    'instruments', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', t.id, 'name', t.name, 'category', t.category, 'serial', t.serial_number,
        'status', t.status, 'last_calibration', t.last_calibration, 'next_calibration', t.next_calibration,
        'holder', public._kit_holder_label(t.assigned_to_employee_id, t.assigned_vehicle_id),
        'checks', coalesce((
          select jsonb_agg(jsonb_build_object('checked_on', c.checked_on, 'result', c.result,
                                              'next_due', c.next_due, 'certificate_ref', c.certificate_ref,
                                              'by', c.recorded_by_name) order by c.checked_on desc)
            from public.employer_tool_checks c
           where c.tool_id = t.id and c.check_type ilike '%calib%'), '[]'::jsonb))
        order by t.next_calibration nulls first, t.name)
        from public.employer_company_tools t
       where t.user_id = p_firm
         and coalesce(t.status, '') not in ('Lost', 'Written Off')
         and (t.last_calibration is not null or t.next_calibration is not null
              or t.category ilike '%test%' or t.category ilike '%instrument%' or t.category ilike '%meter%')), '[]'::jsonb),
    'complaints', coalesce((
      select jsonb_agg(to_jsonb(c) - 'created_by' order by c.received_on desc)
        from public.employer_complaints c
       where c.employer_id = p_firm
         and (c.received_on between p_from and p_to or c.closed_on is null)), '[]'::jsonb),
    'documents', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', d.id, 'title', d.title, 'category', d.category, 'document_type', d.document_type,
        'expiry_date', d.expiry_date, 'file_url', d.file_url, 'insurance_kind', d.insurance_kind,
        'insurer', d.insurer, 'policy_number', d.policy_number, 'cover_amount', d.cover_amount,
        'status', d.status) order by d.category, d.title)
        from public.compliance_documents d where d.user_id = p_firm), '[]'::jsonb),
    'policies', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', p.id, 'name', p.name, 'status', p.status, 'version', p.version,
        'published_version', p.published_version, 'published_at', p.published_at,
        'review_date', p.review_date, 'category', p.category,
        'acknowledged', (select count(distinct a.employee_id) from public.employer_policy_acknowledgements a
                          where a.policy_id = p.id)) order by p.name)
        from public.employer_policies p where p.user_id = p_firm
         and coalesce(p.status, '') <> 'Archived'), '[]'::jsonb)
  );
end;
$$;
revoke all on function public.get_assessment_pack(uuid, date, date) from public, anon;
grant execute on function public.get_assessment_pack(uuid, date, date) to authenticated;

-- ELE-2076: "Send our pack". Owner/admin only (can_see_firm_money).
create or replace function public.create_pack_share(
  p_firm uuid,
  p_questionnaire text,
  p_recipient text,
  p_items jsonb,
  p_summary jsonb,
  p_days integer
)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_row public.employer_pack_shares%rowtype;
begin
  if auth.uid() is null or not public.can_see_firm_money(p_firm) then
    raise exception 'NOT_AUTHORISED';
  end if;
  if p_days is null or p_days < 1 or p_days > 30 then
    raise exception 'BAD_EXPIRY';
  end if;
  if jsonb_typeof(coalesce(p_items, 'null'::jsonb)) <> 'array' or jsonb_array_length(p_items) = 0
     or jsonb_array_length(p_items) > 80 then
    raise exception 'BAD_ITEMS';
  end if;
  if octet_length(p_items::text) > 400000 then
    raise exception 'PACK_TOO_LARGE';
  end if;
  insert into public.employer_pack_shares
    (employer_id, token, questionnaire, recipient, items, summary, expires_at)
  values
    (p_firm, public._share_random_token(32),
     case when p_questionnaire in ('chas', 'ssip', 'constructionline') then p_questionnaire else 'custom' end,
     nullif(left(btrim(coalesce(p_recipient, '')), 160), ''),
     p_items, coalesce(p_summary, '{}'::jsonb), now() + make_interval(days => p_days))
  returning * into v_row;
  return jsonb_build_object('id', v_row.id, 'token', v_row.token, 'expires_at', v_row.expires_at);
end;
$$;
revoke all on function public.create_pack_share(uuid, text, text, jsonb, jsonb, integer) from public, anon;
grant execute on function public.create_pack_share(uuid, text, text, jsonb, jsonb, integer) to authenticated;

create or replace function public.revoke_pack_share(p_id uuid)
returns void
language plpgsql
security definer
set search_path to 'public'
as $$
begin
  update public.employer_pack_shares s
     set revoked_at = coalesce(s.revoked_at, now())
   where s.id = p_id and public.can_see_firm_money(s.employer_id);
  if not found then
    raise exception 'NOT_FOUND';
  end if;
end;
$$;
revoke all on function public.revoke_pack_share(uuid) from public, anon;
grant execute on function public.revoke_pack_share(uuid) to authenticated;

-- Intentionally public (token-keyed, expiring): the main contractor opens it
-- signed out. Returns only the firm's name and what the firm chose to share.
create or replace function public.get_pack_share_by_token(p_token text)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_row public.employer_pack_shares%rowtype;
  v_name text;
begin
  if p_token is null or length(p_token) < 24 then
    return jsonb_build_object('status', 'not_found');
  end if;
  select * into v_row from public.employer_pack_shares where token = p_token limit 1;
  if not found then
    return jsonb_build_object('status', 'not_found');
  end if;
  select c.company_name into v_name from public.company_profiles c where c.user_id = v_row.employer_id limit 1;
  if v_row.revoked_at is not null then
    return jsonb_build_object('status', 'revoked', 'company_name', v_name);
  end if;
  if v_row.expires_at <= now() then
    return jsonb_build_object('status', 'expired', 'company_name', v_name, 'expires_at', v_row.expires_at);
  end if;
  update public.employer_pack_shares
     set view_count = view_count + 1, last_viewed_at = now()
   where id = v_row.id;
  return jsonb_build_object(
    'status', 'active',
    'company_name', v_name,
    'questionnaire', v_row.questionnaire,
    'recipient', v_row.recipient,
    'items', v_row.items,
    'summary', v_row.summary,
    'created_at', v_row.created_at,
    'expires_at', v_row.expires_at);
end;
$$;
revoke all on function public.get_pack_share_by_token(text) from public;
grant execute on function public.get_pack_share_by_token(text) to anon, authenticated;
