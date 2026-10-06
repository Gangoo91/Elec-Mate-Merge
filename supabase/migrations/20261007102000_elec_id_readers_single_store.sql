-- ELE-1950 — every reader of credentials reads the ONE store.
--
-- The public Elec-ID pages (get_public_elec_id_by_number,
-- get_elec_id_by_share_token) and the Employer Hub overview
-- (get_employer_overview) still read the retired stores
-- (employer_elec_id_training, employer_certifications — both 0 rows, now
-- [LEGACY — DO NOT USE]). Re-pointed at employer_elec_id_qualifications, and
-- the public payloads now carry each item's verification level, and the ECS
-- card's, so the public page can say how each thing was checked instead of
-- "Verified professional — supporting documents checked".
-- Everything else in each function is unchanged from the live definition.

create or replace function public.get_public_elec_id_by_number(p_elec_id_number text)
 returns jsonb
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare
  v_token_style jsonb;
  v_profile employer_elec_id_profiles%rowtype;
  v_emp_name text; v_emp_role text; v_emp_photo text; v_emp_status text; v_emp_user uuid;
begin
  select * into v_profile
  from employer_elec_id_profiles
  where elec_id_number = p_elec_id_number
    and coalesce(opt_out, false) = false
    and profile_visibility = 'public';

  if not found then
    return jsonb_build_object('status', 'not_found');
  end if;

  select e.name, e.role, e.photo_url, e.status, e.user_id
    into v_emp_name, v_emp_role, v_emp_photo, v_emp_status, v_emp_user
  from employer_employees e
  where e.id = v_profile.employee_id;

  if lower(coalesce(v_emp_status, '')) = 'archived' then
    return jsonb_build_object('status', 'not_found');
  end if;

  if v_emp_user is not null then
    select coalesce(p.full_name, v_emp_name), coalesce(p.avatar_url, v_emp_photo)
      into v_emp_name, v_emp_photo
    from profiles p where p.id = v_emp_user;
  end if;

  update employer_elec_id_profiles
     set profile_views = coalesce(profile_views, 0) + 1
   where id = v_profile.id;

  v_token_style := jsonb_build_object(
    'status', 'ok',
    'sections', to_jsonb(array['basics','qualifications','experience','skills','training']),
    'expires_at', null,
    'profile', jsonb_build_object(
      'id', v_profile.id,
      'elec_id_number', v_profile.elec_id_number,
      'is_verified', coalesce(v_profile.is_verified, false),
      'verified_at', v_profile.verified_at,
      'verification_method', v_profile.verification_method,
      'job_title', v_profile.job_title,
      'bio', v_profile.bio,
      'specialisations', to_jsonb(v_profile.specialisations),
      'ecs_card_type', v_profile.ecs_card_type,
      'ecs_card_number', v_profile.ecs_card_number,
      'ecs_expiry_date', v_profile.ecs_expiry_date,
      'ecs_verification_level', v_profile.ecs_verification_level,
      'ecs_verified_at', v_profile.ecs_verified_at,
      'ecs_verifier_firm', public._elec_id_verifier_firm(v_profile.ecs_verified_by, v_profile.ecs_verifier_employer_id)
    ),
    'employee', jsonb_build_object(
      'name', v_emp_name,
      'role', v_emp_role,
      'job_title', v_profile.job_title,
      'photo_url', v_emp_photo,
      'email', null,
      'phone', null
    ),
    'skills', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', s.id, 'profile_id', s.profile_id,
        'skill_name', s.skill_name, 'skill_level', s.skill_level,
        'years_experience', coalesce(s.years_experience, 0),
        'is_verified', coalesce(s.is_verified, false),
        'created_at', s.created_at) order by s.created_at)
      from employer_elec_id_skills s where s.profile_id = v_profile.id), '[]'::jsonb),
    'work_history', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', w.id, 'profile_id', w.profile_id,
        'employer_name', w.employer_name, 'job_title', w.job_title,
        'location', w.location, 'start_date', w.start_date, 'end_date', w.end_date,
        'is_current', coalesce(w.is_current, false), 'description', w.description,
        'projects', to_jsonb(w.projects),
        'is_verified', coalesce(w.is_verified, false),
        'verified_by_employer', coalesce(w.verified_by_employer, false),
        'created_at', w.created_at) order by w.start_date desc nulls last)
      from employer_elec_id_work_history w where w.profile_id = v_profile.id), '[]'::jsonb),
    -- Training = the 'training' rows of the one store (ELE-1950)
    'training', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', t.id, 'profile_id', t.profile_id,
        'training_name', t.qualification_name, 'provider', t.awarding_body,
        'completed_date', t.date_achieved, 'expiry_date', t.expiry_date,
        'certificate_id', t.certificate_number, 'funded_by', t.funded_by,
        'status', case when t.expiry_date < current_date then 'expired'
                       when t.training_status is null or t.training_status = 'Completed' then 'valid'
                       else 'pending' end,
        'verification_level', t.verification_level,
        'created_at', t.created_at)
        order by t.date_achieved desc nulls last)
      from employer_elec_id_qualifications t
      where t.profile_id = v_profile.id and t.category = 'training'), '[]'::jsonb),
    'certifications', '[]'::jsonb,
    'qualifications', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', q.id, 'profile_id', q.profile_id,
        'qualification_name', q.qualification_name,
        'qualification_type', q.qualification_type, 'category', q.category,
        'awarding_body', q.awarding_body, 'grade', q.grade,
        'date_achieved', q.date_achieved, 'expiry_date', q.expiry_date,
        'certificate_number', q.certificate_number,
        'is_verified', coalesce(q.is_verified, false),
        'verification_level', q.verification_level,
        'verified_at', q.verified_at,
        'verification_method', q.verification_method,
        'verifier_firm', public._elec_id_verifier_firm(q.verified_by, q.verifier_employer_id),
        'created_at', q.created_at) order by q.date_achieved desc nulls last)
      from employer_elec_id_qualifications q
      where q.profile_id = v_profile.id and q.category is distinct from 'training'), '[]'::jsonb),
    'documents', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', d.id, 'profile_id', d.profile_id,
        'document_type', d.document_type, 'document_name', d.document_name,
        'file_url', d.file_url, 'verification_status', d.verification_status,
        'document_number', d.document_number, 'issue_date', d.issue_date,
        'expiry_date', d.expiry_date, 'issuing_body', d.issuing_body))
      from elec_id_documents d
      where d.profile_id = v_profile.id
        and d.verification_status = 'verified'
        and d.document_type in ('qualification', 'ecs_card', 'training', 'certificate')), '[]'::jsonb)
  );

  return v_token_style;
end;
$function$;

create or replace function public.get_elec_id_by_share_token(p_token text)
 returns jsonb
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare
  v_link       employer_elec_id_share_links%rowtype;
  v_profile    employer_elec_id_profiles%rowtype;
  v_emp_name   text; v_emp_role text; v_emp_photo text;
  v_emp_email  text; v_emp_phone text; v_emp_status text; v_emp_user uuid;
  v_sections   text[];
  v_basics     boolean;
  v_doc_types  text[] := array[]::text[];
  v_result     jsonb;
begin
  if p_token is null or length(trim(p_token)) = 0 then
    return jsonb_build_object('status', 'not_found');
  end if;

  select * into v_link
  from employer_elec_id_share_links
  where share_token = p_token and is_active = true
  limit 1;

  if not found then
    return jsonb_build_object('status', 'not_found');
  end if;

  if v_link.expires_at is not null and v_link.expires_at < now() then
    return jsonb_build_object('status', 'expired');
  end if;

  select * into v_profile
  from employer_elec_id_profiles
  where id = v_link.profile_id and opt_out = false;

  if not found then
    return jsonb_build_object('status', 'not_found');
  end if;

  select e.name, e.role, e.photo_url, e.email, e.phone, e.status, e.user_id
    into v_emp_name, v_emp_role, v_emp_photo, v_emp_email, v_emp_phone, v_emp_status, v_emp_user
  from employer_employees e
  where e.id = v_profile.employee_id;

  if lower(coalesce(v_emp_status, '')) = 'archived' then
    return jsonb_build_object('status', 'not_found');
  end if;

  if v_emp_user is not null then
    select coalesce(p.full_name, v_emp_name), coalesce(p.avatar_url, v_emp_photo)
      into v_emp_name, v_emp_photo
    from profiles p
    where p.id = v_emp_user;
  end if;

  update employer_elec_id_share_links
     set view_count = coalesce(view_count, 0) + 1, updated_at = now()
   where id = v_link.id;

  v_sections := coalesce(v_link.sections, array['basics']);
  v_basics   := 'basics' = any (v_sections);

  v_result := jsonb_build_object(
    'status', 'ok',
    'sections', to_jsonb(v_sections),
    'expires_at', v_link.expires_at,
    'profile', jsonb_build_object(
      'id', v_profile.id,
      'elec_id_number', v_profile.elec_id_number,
      'is_verified', coalesce(v_profile.is_verified, false),
      'verified_at', v_profile.verified_at,
      'verification_method', v_profile.verification_method,
      'job_title', v_profile.job_title,
      'bio',             case when v_basics then v_profile.bio end,
      'specialisations', case when v_basics then to_jsonb(v_profile.specialisations) end,
      'ecs_card_type',   case when v_basics then v_profile.ecs_card_type end,
      'ecs_card_number', case when v_basics then v_profile.ecs_card_number end,
      'ecs_expiry_date', case when v_basics then v_profile.ecs_expiry_date end,
      'ecs_verification_level', case when v_basics then v_profile.ecs_verification_level end,
      'ecs_verified_at', case when v_basics then v_profile.ecs_verified_at end,
      'ecs_verifier_firm', case when v_basics then public._elec_id_verifier_firm(v_profile.ecs_verified_by, v_profile.ecs_verifier_employer_id) end
    ),
    'employee', jsonb_build_object(
      'name', v_emp_name,
      'role', v_emp_role,
      'job_title', v_profile.job_title,
      'photo_url', v_emp_photo,
      'email', case when v_basics then v_emp_email end,
      'phone', case when v_basics then v_emp_phone end
    )
  );

  if 'skills' = any (v_sections) then
    v_result := v_result || jsonb_build_object('skills', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', s.id, 'profile_id', s.profile_id,
        'skill_name', s.skill_name, 'skill_level', s.skill_level,
        'years_experience', coalesce(s.years_experience, 0),
        'is_verified', coalesce(s.is_verified, false),
        'created_at', s.created_at) order by s.created_at)
      from employer_elec_id_skills s
      where s.profile_id = v_profile.id), '[]'::jsonb));
  end if;

  if 'experience' = any (v_sections) then
    v_result := v_result || jsonb_build_object('work_history', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', w.id, 'profile_id', w.profile_id,
        'employer_name', w.employer_name, 'job_title', w.job_title,
        'location', w.location, 'start_date', w.start_date, 'end_date', w.end_date,
        'is_current', coalesce(w.is_current, false), 'description', w.description,
        'projects', to_jsonb(w.projects),
        'is_verified', coalesce(w.is_verified, false),
        'verified_by_employer', coalesce(w.verified_by_employer, false),
        'created_at', w.created_at) order by w.start_date desc nulls last)
      from employer_elec_id_work_history w
      where w.profile_id = v_profile.id), '[]'::jsonb));
  end if;

  if 'training' = any (v_sections) then
    v_result := v_result || jsonb_build_object(
      -- Training = the 'training' rows of the one store (ELE-1950)
      'training', coalesce((
        select jsonb_agg(jsonb_build_object(
          'id', t.id, 'profile_id', t.profile_id,
          'training_name', t.qualification_name, 'provider', t.awarding_body,
          'completed_date', t.date_achieved, 'expiry_date', t.expiry_date,
          'certificate_id', t.certificate_number, 'funded_by', t.funded_by,
          'status', case when t.expiry_date < current_date then 'expired'
                         when t.training_status is null or t.training_status = 'Completed' then 'valid'
                         else 'pending' end,
          'verification_level', t.verification_level,
          'created_at', t.created_at)
          order by t.date_achieved desc nulls last)
        from employer_elec_id_qualifications t
        where t.profile_id = v_profile.id and t.category = 'training'), '[]'::jsonb),
      'certifications', '[]'::jsonb);
  end if;

  if 'qualifications' = any (v_sections) then
    v_result := v_result || jsonb_build_object('qualifications', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', q.id, 'profile_id', q.profile_id,
        'qualification_name', q.qualification_name,
        'qualification_type', q.qualification_type, 'category', q.category,
        'awarding_body', q.awarding_body, 'grade', q.grade,
        'date_achieved', q.date_achieved, 'expiry_date', q.expiry_date,
        'certificate_number', q.certificate_number,
        'is_verified', coalesce(q.is_verified, false),
        'verification_level', q.verification_level,
        'verified_at', q.verified_at,
        'verification_method', q.verification_method,
        'verifier_firm', public._elec_id_verifier_firm(q.verified_by, q.verifier_employer_id),
        'created_at', q.created_at) order by q.date_achieved desc nulls last)
      from employer_elec_id_qualifications q
      where q.profile_id = v_profile.id and q.category is distinct from 'training'), '[]'::jsonb));
  end if;

  if v_basics then v_doc_types := v_doc_types || 'ecs_card'; end if;
  if 'qualifications' = any (v_sections) then v_doc_types := v_doc_types || 'qualification'; end if;
  if 'training' = any (v_sections) then v_doc_types := v_doc_types || array['training','certificate']; end if;

  if array_length(v_doc_types, 1) > 0 then
    v_result := v_result || jsonb_build_object('documents', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', d.id, 'profile_id', d.profile_id,
        'document_type', d.document_type, 'document_name', d.document_name,
        'file_url', d.file_url, 'verification_status', d.verification_status,
        'document_number', d.document_number, 'issue_date', d.issue_date,
        'expiry_date', d.expiry_date, 'issuing_body', d.issuing_body))
      from elec_id_documents d
      where d.profile_id = v_profile.id
        and d.verification_status = 'verified'
        and d.document_type = any (v_doc_types)), '[]'::jsonb));
  end if;

  return v_result;
end;
$function$;

-- Employer Hub overview: "cert_expiry" items now come from each team member's
-- Elec-ID store (resolved roster → person), not employer_certifications.
create or replace function public.get_employer_overview()
 returns jsonb
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare
  v_uid uuid := public.my_default_employer_id();
  v_month_start date := date_trunc('month', current_date)::date;
  v_cash jsonb;
  v_items jsonb;
  v_total int;
  v_counts jsonb;
begin
  if v_uid is null then
    return jsonb_build_object('cash', '{}'::jsonb, 'items', '[]'::jsonb, 'counts', '{}'::jsonb);
  end if;

  select jsonb_build_object(
    'invoiced_this_month', coalesce(sum(i.amount) filter (where i.created_at >= v_month_start and i.status not in ('Draft','Cancelled','Void')), 0),
    'paid_this_month', coalesce(sum(i.amount) filter (where i.status = 'Paid' and i.paid_date >= v_month_start), 0),
    'overdue_total', coalesce(sum(i.amount - coalesce(i.cis_amount,0)) filter (where i.status not in ('Paid','Draft','Cancelled','Void') and i.due_date < current_date), 0),
    'overdue_count', count(*) filter (where i.status not in ('Paid','Draft','Cancelled','Void') and i.due_date < current_date)
  )
  into v_cash
  from public.employer_invoices_unified() i
  where i.employer_id = v_uid;

  with items as (
    select
      'cert_expiry' as kind,
      c.id::text as id,
      coalesce(e.name, 'Team member') || ' — ' || c.qualification_name as title,
      case when c.expiry_date < current_date
        then 'Expired ' || (current_date - c.expiry_date) || ' days ago'
        else 'Expires in ' || (c.expiry_date - current_date) || ' days' end as subtitle,
      (c.expiry_date - current_date) as days,
      case when c.expiry_date < current_date then 'red'
           when c.expiry_date - current_date <= 14 then 'orange'
           else 'amber' end as severity,
      'safetyhub' as section,
      null::numeric as amount
    from employer_employees e
    join employer_elec_id_qualifications c
      on c.profile_id = public._elec_id_profile_for_roster(e.id)
    where e.employer_id = v_uid
      and coalesce(e.status, 'Active') <> 'Archived'
      and (c.training_status is null or c.training_status in ('Completed', 'Expired'))
      and c.expiry_date is not null
      and c.expiry_date <= current_date + 60

    union all
    select
      'overdue_invoice', i.id::text,
      coalesce(i.invoice_number, 'Invoice') || ' — ' || coalesce(i.client, 'Client'),
      '£' || to_char(i.amount - coalesce(i.cis_amount,0), 'FM999,999,990.00') || ' · ' ||
        (current_date - i.due_date) || ' days overdue',
      (i.due_date - current_date),
      'red',
      'financehub',
      i.amount - coalesce(i.cis_amount,0)
    from public.employer_invoices_unified() i
    where i.employer_id = v_uid and i.status not in ('Paid','Draft','Cancelled','Void') and i.due_date < current_date

    union all
    select
      'draft_invoice', i.id::text,
      coalesce(i.invoice_number, 'Invoice') || ' — ' || coalesce(i.client, 'Client'),
      'Draft · never sent · £' || to_char(i.amount, 'FM999,999,990.00'),
      (current_date - i.created_at::date),
      'amber',
      'financehub',
      i.amount
    from public.employer_invoices_unified() i
    where i.employer_id = v_uid and i.status = 'Draft' and i.created_at < now() - interval '3 days'

    union all
    select
      'job_overdue', j.id::text,
      coalesce(j.title, 'Job') || ' — ' || coalesce(j.client, 'Client'),
      'Past end date by ' || (current_date - j.end_date) || ' days',
      (j.end_date - current_date),
      case when current_date - j.end_date > 7 then 'red' else 'orange' end,
      'jobshub',
      null
    from employer_jobs j
    where j.user_id = v_uid and lower(j.status) = 'active'
      and j.end_date is not null and j.end_date < current_date

    union all
    select
      'unsigned_pack', p.id::text,
      coalesce(p.title, 'Job pack') || ' — ' || coalesce(p.client, 'Client'),
      (select count(*) from employer_job_pack_acknowledgements a
         where a.job_pack_id = p.id and a.acknowledged_at is null) || ' awaiting signature',
      0,
      'amber',
      'jobshub',
      null
    from employer_job_packs p
    where p.employer_id = v_uid
      and p.sent_to_workers_at is not null
      and exists (
        select 1 from employer_job_pack_acknowledgements a
        where a.job_pack_id = p.id and a.acknowledged_at is null)

    union all
    select
      'vehicle_expiry', v.id::text || '-' || x.kind,
      coalesce(v.registration, 'Vehicle') || ' — ' || x.label,
      case when x.expiry < current_date
        then x.label || ' expired ' || (current_date - x.expiry) || ' days ago'
        else x.label || ' due in ' || (x.expiry - current_date) || ' days' end,
      (x.expiry - current_date),
      case when x.expiry < current_date then 'red'
           when x.expiry - current_date <= 14 then 'orange' else 'amber' end,
      'fleet',
      null
    from vehicles v
    cross join lateral (values
      ('mot','MOT', v.mot_expiry),
      ('tax','Road tax', v.tax_expiry),
      ('insurance','Insurance', v.insurance_expiry)
    ) as x(kind, label, expiry)
    where v.user_id = v_uid and x.expiry is not null and x.expiry <= current_date + 30
  ),
  ranked as (
    select i.*, row_number() over (
      order by case i.severity when 'red' then 0 when 'orange' then 1 else 2 end, i.days
    ) as rn,
    count(*) over () as total
    from items i
  )
  select
    coalesce(jsonb_agg(to_jsonb(r) - 'rn' - 'total' order by r.rn) filter (where r.rn <= 12), '[]'::jsonb),
    coalesce(max(r.total), 0)
  into v_items, v_total
  from ranked r;

  select jsonb_build_object(
    'pending_timesheets', (
      select count(*) from employer_timesheets ts
      join employer_employees e on e.id = ts.employee_id
      where e.employer_id = v_uid and lower(ts.status) in ('pending','submitted')),
    'total_attention', v_total
  ) into v_counts;

  return jsonb_build_object('cash', coalesce(v_cash, '{}'::jsonb), 'items', v_items, 'counts', v_counts);
end;
$function$;

comment on table public.employer_elec_id_profiles is
  '[ELEC-ID — OWNED BY THE ELECTRICIAN] A person''s Elec-ID: number, ECS card (with how it was checked: ecs_verification_level/by/method/at), talent-pool visibility. The firm reads it; the person owns it. Scope: employee_id → employer_employees (usually their own stub row; firms reach it via get_team_credentials). Used by: Elec-ID settings, Employer Hub Elec-ID/Talent pool/competence matrix, Admin Elec IDs, public Elec-ID page. Rule: available_for_hire is OPT-IN (default false since 6 Oct; opt-ins stamped). is_verified = approved by an Elec-Mate admin (verified_by/verified_at, verification_method) — a profile review, never shown as "Verified"; only the admin function or set_ecs_card_verification change verification columns (trigger-guarded) (ELE-1950).';
