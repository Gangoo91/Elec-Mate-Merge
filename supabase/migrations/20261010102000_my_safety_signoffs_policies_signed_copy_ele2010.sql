-- Worker Tools → Sign-offs: one list of everything to sign (ELE-2010, ELE-1946,
-- ELE-1817).
--
-- get_my_safety_signoffs() (ELE-2031) returned the firm's toolbox talks and
-- RAMS for the signed-in worker. It now also returns:
--  - the firm's published policies, with the worker's acknowledgement of the
--    current version;
--  - the worker's own signature and recorded location for each signed item, so
--    the phone can make a signed copy (PDF) for their own records.
--
-- Same signature and return type; the JSON only gains keys. Nothing in the
-- committed app calls this function yet.

create or replace function public.get_my_safety_signoffs()
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'briefings', coalesce((
      select jsonb_agg(row_to_json(b) order by b.briefing_date desc nulls last)
        from (
          select tb.id, tb.briefing_name, tb.briefing_type, tb.briefing_date, tb.briefing_time,
                 tb.location, tb.risk_level, tb.briefing_description, tb.work_scope,
                 tb.safety_warning, tb.key_points, tb.safety_points, tb.identified_hazards,
                 tb.conductor_name, tb.status, tb.employer_job_id,
                 (select j.title from public.employer_jobs j where j.id = tb.employer_job_id) as job_title,
                 (select nullif(trim(cp.company_name), '') from public.company_profiles cp
                   where cp.user_id = tb.employer_id limit 1) as company_name,
                 mine.sig->>'signed_at' as signed_at,
                 mine.sig->>'signature' as my_signature,
                 mine.sig->'location' as my_location,
                 mine.sig->>'name' as my_name
            from public.team_briefings tb
            left join lateral (
              select s as sig
                from jsonb_array_elements(
                  case when jsonb_typeof(tb.attendee_signatures) = 'array'
                       then tb.attendee_signatures else '[]'::jsonb end) s
               where s->>'user_id' = auth.uid()::text
               limit 1
            ) mine on true
           where tb.employer_id is not null
             and coalesce(tb.status, '') <> 'cancelled'
             and tb.briefing_date >= current_date - 60
             and public.safety_briefing_for_me(tb.employer_id, tb.attendees, tb.employer_job_id)
           order by tb.briefing_date desc nulls last
           limit 50
        ) b
    ), '[]'::jsonb),
    'rams', coalesce((
      select jsonb_agg(row_to_json(r) order by r.updated_at desc)
        from (
          select d.id, d.project_name, d.location, d.version, d.status, d.updated_at,
                 d.pdf_url, d.employer_job_id,
                 (select j.title from public.employer_jobs j where j.id = d.employer_job_id) as job_title,
                 (select nullif(trim(cp.company_name), '') from public.company_profiles cp
                   where cp.user_id = d.employer_id limit 1) as company_name,
                 a.signed_at,
                 a.signature as my_signature,
                 a.location as my_location,
                 a.signer_name as my_name
            from public.rams_documents d
            left join public.safety_acknowledgements a
              on a.record_type = 'rams' and a.record_id = d.id and a.user_id = auth.uid()
           where d.employer_id is not null
             and d.employer_job_id is not null
             and public.safety_is_firm_creator(d.employer_id, d.user_id)
             and public.is_assigned_to_job(d.employer_job_id)
           order by d.updated_at desc
           limit 50
        ) r
    ), '[]'::jsonb),
    'policies', coalesce((
      select jsonb_agg(row_to_json(p) order by (p.signed_at is not null), p.published_at desc)
        from (
          select ep.id, ep.name, ep.content, ep.published_version as version, ep.published_at,
                 ep.review_date,
                 coalesce(nullif(trim(ep.company_name), ''),
                          (select nullif(trim(cp.company_name), '') from public.company_profiles cp
                            where cp.user_id = ep.user_id limit 1)) as company_name,
                 a.signed_at,
                 a.signature as my_signature,
                 a.location as my_location,
                 a.signer_name as my_name
            from public.employer_policies ep
            left join public.employer_policy_acknowledgements a
              on a.policy_id = ep.id and a.policy_version = ep.published_version and a.user_id = auth.uid()
           where ep.published_version is not null
             and coalesce(ep.status, '') <> 'Archived'
             and exists (
               select 1 from public.employer_employees e
                where e.employer_id = ep.user_id
                  and e.user_id = auth.uid()
                  and e.status ilike 'active'
             )
           order by ep.published_at desc
           limit 50
        ) p
    ), '[]'::jsonb)
  );
$$;

revoke all on function public.get_my_safety_signoffs() from public, anon;
grant execute on function public.get_my_safety_signoffs() to authenticated;
