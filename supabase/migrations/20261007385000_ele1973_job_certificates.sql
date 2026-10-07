-- ELE-1973 — Testing shows the job's REAL certificates, not a hand-typed log.
--
-- A certificate (public.reports) is linked to an employer job through its own
-- link table rather than a column on reports: every UPDATE on reports fires
-- the revision, edit-version, audit and QS-snapshot triggers, so tagging a
-- cert from the office must not count as an edit of the certificate.
-- One job per certificate (unique report_uuid); moving it re-points the row.
--
-- Reads and writes go through SECURITY DEFINER RPCs only:
--   get_job_certificates(job)        linked certs + test data + QS state + kit match
--   get_linkable_certificates(job)   the team's unlinked certs, best match first
--   link_certificate_to_job / unlink_certificate_from_job

create table if not exists public.employer_job_certificates (
  id uuid primary key default gen_random_uuid(),
  employer_id uuid not null,
  job_id uuid not null references public.employer_jobs(id) on delete cascade,
  report_uuid uuid not null references public.reports(id) on delete cascade,
  linked_by uuid,
  linked_at timestamptz not null default now(),
  constraint employer_job_certificates_report_unique unique (report_uuid)
);

create index if not exists employer_job_certificates_job_idx
  on public.employer_job_certificates (job_id);
create index if not exists employer_job_certificates_employer_idx
  on public.employer_job_certificates (employer_id);

alter table public.employer_job_certificates enable row level security;

drop policy if exists "Firm can read job certificate links" on public.employer_job_certificates;
create policy "Firm can read job certificate links"
  on public.employer_job_certificates for select to authenticated
  using (employer_id in (select public.my_employer_scope()));

revoke all on public.employer_job_certificates from anon;
revoke insert, update, delete on public.employer_job_certificates from authenticated;
grant select on public.employer_job_certificates to authenticated;

comment on table public.employer_job_certificates is
  '[EMPLOYER HUB] Which employer job a certificate (reports row) was raised for. Scope: employer_id = the firm owner''s profiles.id; job_id → employer_jobs; report_uuid → reports (one job per cert). Used by: Employer Hub Testing, job sheet Testing tile, hub counts. Rule: write only via link_certificate_to_job / unlink_certificate_from_job; never add a job column to reports (its update triggers treat it as a cert edit) (ELE-1973).';

-- Is p_user on firm p_firm's team (owner, active roster member, or active manager)?
create or replace function public._firm_team_has_user(p_firm uuid, p_user uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select p_user is not null and (
    p_user = p_firm
    or exists (select 1 from public.employer_employees e
                where e.employer_id = p_firm and e.user_id = p_user
                  and e.status ilike 'active')
    or exists (select 1 from public.employer_admins a
                where a.employer_id = p_firm and a.user_id = p_user
                  and a.status = 'active')
  );
$$;
revoke all on function public._firm_team_has_user(uuid, uuid) from public, anon, authenticated;

-- The bits of a certificate's data the Testing view reads: the schedule of
-- tests, the Minor Works single-circuit fields, earthing and the instrument.
-- Signatures, photos and the rest of the form stay on the server.
create or replace function public._cert_test_data(p_data jsonb)
returns jsonb
language sql
immutable
set search_path = public
as $$
  select coalesce(jsonb_object_agg(d.key, d.value), '{}'::jsonb)
    from jsonb_each(coalesce(p_data, '{}'::jsonb)) d
   where d.key = any (array[
     'scheduleOfTests', 'earthingArrangement',
     'testInstrumentMake', 'testInstrumentSerial',
     'testEquipmentModel', 'testEquipmentSerial', 'testEquipmentCalDate',
     'continuityTesterSerial', 'insulationTesterSerial', 'loopTesterSerial',
     'supplyPhases', 'circuitDesignation', 'circuitDescription',
     'protectiveDeviceType', 'protectiveDeviceRating', 'protectiveDeviceKaRating',
     'overcurrentDeviceBsEn', 'maxPermittedZs', 'continuityR1R2', 'r2Continuity',
     'ringR1', 'ringRn', 'ringR2', 'insulationTestVoltage', 'insulationLiveNeutral',
     'insulationLiveEarth', 'polarity', 'earthFaultLoopImpedance', 'rcdBsEn',
     'rcdType', 'rcdIdn', 'rcdRating', 'rcdOneX', 'rcdFiveX', 'rcdHalfX',
     'rcdTestButton', 'afddTestButton', 'functionalTesting',
     'prospectiveFaultCurrent', 'referenceMethod', 'cableType',
     'liveConductorSize', 'cpcSize'
   ]);
$$;
revoke all on function public._cert_test_data(jsonb) from public, anon, authenticated;

-- Linked certificates for one job (p_job_id) or for every job in the firm (null).
create or replace function public.get_job_certificates(p_job_id uuid default null)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_owners uuid[] := array(select public.my_employer_scope());
begin
  if auth.uid() is null then
    raise exception 'NOT_AUTHORISED';
  end if;
  if p_job_id is not null and not exists (
    select 1 from public.employer_jobs j where j.id = p_job_id and j.user_id = any (v_owners)
  ) then
    return jsonb_build_object('error', 'not_found');
  end if;

  return jsonb_build_object('certificates', coalesce((
    select jsonb_agg(x order by x.sort_at desc)
      from (
        select
          coalesce(r.inspection_date::timestamptz, r.updated_at) as sort_at,
          l.id as link_id,
          l.job_id,
          j.title as job_title,
          j.client as job_client,
          l.linked_at,
          coalesce(nullif(trim(lp.full_name), ''), 'Office') as linked_by_name,
          r.id as report_uuid,
          r.report_id,
          r.report_type,
          r.certificate_number,
          r.status,
          r.client_name,
          r.installation_address,
          r.inspection_date,
          r.inspector_name,
          r.updated_at,
          coalesce(nullif(trim(op.full_name), ''), oe.name, 'Team member') as owner_name,
          public._cert_test_data(r.data) as data,
          (select jsonb_build_object(
                    'review_id', q.id, 'status', q.status,
                    'submitted_at', q.submitted_at, 'reviewed_at', q.reviewed_at,
                    'reviewer_name', q.reviewer_name,
                    'return_reasons', to_jsonb(q.return_reasons))
             from public.report_qs_reviews q
            where q.report_uuid = r.id and q.status <> 'cancelled'
            order by q.created_at desc limit 1) as qs,
          (select jsonb_build_object(
                    'id', t.id, 'name', t.name, 'serial', t.serial_number,
                    'next_calibration', t.next_calibration,
                    'last_calibration', t.last_calibration)
             from public.employer_company_tools t
            where t.user_id = l.employer_id
              and nullif(trim(t.serial_number), '') is not null
              and upper(regexp_replace(t.serial_number, '\s', '', 'g')) in (
                upper(regexp_replace(coalesce(r.data->>'testInstrumentSerial', ''), '\s', '', 'g')),
                upper(regexp_replace(coalesce(r.data->>'testEquipmentSerial', ''), '\s', '', 'g')),
                upper(regexp_replace(coalesce(r.data->>'loopTesterSerial', ''), '\s', '', 'g')))
            limit 1) as kit
        from public.employer_job_certificates l
        join public.employer_jobs j on j.id = l.job_id
        join public.reports r on r.id = l.report_uuid and r.deleted_at is null
        left join public.profiles op on op.id = r.user_id
        left join lateral (
          select e.name from public.employer_employees e
           where e.employer_id = l.employer_id and e.user_id = r.user_id
           order by e.created_at asc limit 1
        ) oe on true
        left join public.profiles lp on lp.id = l.linked_by
        where l.employer_id = any (v_owners)
          and (p_job_id is null or l.job_id = p_job_id)
        order by coalesce(r.inspection_date::timestamptz, r.updated_at) desc
        limit 300
      ) x
  ), '[]'::jsonb));
end;
$$;
revoke all on function public.get_job_certificates(uuid) from public, anon;
grant execute on function public.get_job_certificates(uuid) to authenticated;

-- The firm team's certificates not yet on a job, best match to this job first.
create or replace function public.get_linkable_certificates(p_job_id uuid, p_search text default null)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_job public.employer_jobs;
  v_postcode text;
  v_client text;
  v_q text := nullif(trim(coalesce(p_search, '')), '');
begin
  select * into v_job from public.employer_jobs
   where id = p_job_id and user_id in (select public.my_employer_scope());
  if v_job.id is null then
    return jsonb_build_object('error', 'not_found');
  end if;

  v_postcode := upper(replace(substring(upper(coalesce(v_job.location, ''))
                  from '[A-Z]{1,2}[0-9][0-9A-Z]? ?[0-9][A-Z]{2}'), ' ', ''));
  v_client := nullif(lower(trim(coalesce(v_job.client, ''))), '');

  return jsonb_build_object('certificates', coalesce((
    select jsonb_agg(x order by x.score desc, x.updated_at desc)
      from (
        select
          r.id as report_uuid, r.report_id, r.report_type, r.certificate_number,
          r.status, r.client_name, r.installation_address, r.inspection_date,
          r.updated_at,
          coalesce(nullif(trim(op.full_name), ''), 'Team member') as owner_name,
          (case when v_postcode is not null and v_postcode <> ''
                 and position(v_postcode in upper(replace(coalesce(r.installation_address, ''), ' ', ''))) > 0
                then 2 else 0 end
           + case when v_client is not null
                   and lower(coalesce(r.client_name, '')) like '%' || v_client || '%'
                  then 1 else 0 end) as score
        from public.reports r
        left join public.profiles op on op.id = r.user_id
        where r.deleted_at is null
          and r.superseded_by is null
          and r.report_type in ('eicr', 'eic', 'minor-works')
          and public._firm_team_has_user(v_job.user_id, r.user_id)
          and not exists (select 1 from public.employer_job_certificates l where l.report_uuid = r.id)
          and r.updated_at > now() - interval '18 months'
          and (v_q is null
               or r.client_name ilike '%' || v_q || '%'
               or r.installation_address ilike '%' || v_q || '%'
               or r.certificate_number ilike '%' || v_q || '%'
               or r.report_id ilike '%' || v_q || '%')
        order by 11 desc, r.updated_at desc
        limit 40
      ) x
  ), '[]'::jsonb));
end;
$$;
revoke all on function public.get_linkable_certificates(uuid, text) from public, anon;
grant execute on function public.get_linkable_certificates(uuid, text) to authenticated;

create or replace function public.link_certificate_to_job(p_report_uuid uuid, p_job_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_job public.employer_jobs;
  v_owner uuid;
begin
  select * into v_job from public.employer_jobs
   where id = p_job_id and user_id in (select public.my_employer_scope());
  if v_job.id is null then
    raise exception 'NOT_AUTHORISED';
  end if;

  select r.user_id into v_owner from public.reports r
   where r.id = p_report_uuid and r.deleted_at is null;
  if v_owner is null then
    raise exception 'REPORT_NOT_FOUND';
  end if;
  if not public._firm_team_has_user(v_job.user_id, v_owner) then
    raise exception 'NOT_YOUR_TEAMS_CERTIFICATE';
  end if;

  insert into public.employer_job_certificates (employer_id, job_id, report_uuid, linked_by)
  values (v_job.user_id, p_job_id, p_report_uuid, auth.uid())
  on conflict (report_uuid) do update
     set job_id = excluded.job_id, employer_id = excluded.employer_id,
         linked_by = excluded.linked_by, linked_at = now()
   where public.employer_job_certificates.employer_id in (select public.my_employer_scope());

  if not exists (select 1 from public.employer_job_certificates
                  where report_uuid = p_report_uuid and job_id = p_job_id) then
    raise exception 'LINKED_TO_ANOTHER_FIRM';
  end if;

  return jsonb_build_object('report_uuid', p_report_uuid, 'job_id', p_job_id);
end;
$$;
revoke all on function public.link_certificate_to_job(uuid, uuid) from public, anon;
grant execute on function public.link_certificate_to_job(uuid, uuid) to authenticated;

create or replace function public.unlink_certificate_from_job(p_report_uuid uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_rows integer;
begin
  delete from public.employer_job_certificates
   where report_uuid = p_report_uuid
     and employer_id in (select public.my_employer_scope());
  get diagnostics v_rows = row_count;
  if v_rows = 0 then
    raise exception 'NOT_FOUND';
  end if;
  return jsonb_build_object('report_uuid', p_report_uuid, 'unlinked', true);
end;
$$;
revoke all on function public.unlink_certificate_from_job(uuid) from public, anon;
grant execute on function public.unlink_certificate_from_job(uuid) to authenticated;
