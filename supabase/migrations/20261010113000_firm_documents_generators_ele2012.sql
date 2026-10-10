-- ELE-2012: every generator's output shows on its job in Smart Docs.
--
-- get_firm_documents gains two kinds, nothing else changes (same signature,
-- same rules, same rows for the kinds it already returned):
--   * ai_rams: an AI RAMS + method statement generated for the job and not yet
--     issued (once issued it is a rams_documents row and shows as 'rams');
--   * design:  an AI circuit design filed on the job (ELE-1943).
-- Not called by the live app (web HEAD or iOS build 49): it ships with the
-- Smart Docs client still waiting to be pushed.

create or replace function public.get_firm_documents(p_job uuid default null::uuid, p_limit integer default 40)
 returns jsonb
 language plpgsql
 stable security definer
 set search_path to 'public'
as $function$
declare
  v_owners uuid[] := array(select public.my_employer_scope());
  v_limit int := greatest(1, least(coalesce(p_limit, 40), 200));
begin
  if p_job is not null and not exists (
    select 1 from public.employer_jobs j where j.id = p_job and j.user_id = any (v_owners)
  ) then
    raise exception 'Job not found';
  end if;

  return (
    with jobs as (
      select j.id, j.title, j.user_id, public.can_see_firm_money(j.user_id) as money
        from public.employer_jobs j
       where j.user_id = any (v_owners)
         and (p_job is null or j.id = p_job)
    ), crew as (
      select a.job_id, count(distinct a.employee_id) as n
        from public.employer_job_assignments a
       where a.job_id in (select id from jobs)
         and lower(coalesce(a.status, 'assigned')) not in ('removed', 'cancelled', 'ended')
       group by a.job_id
    ), docs as (
      select 'rams'::text as kind, r.id, coalesce(nullif(r.project_name, ''), 'RAMS') as title,
             r.status, coalesce(r.updated_at, r.created_at) as at, jb.id as job_id, jb.title as job_title,
             null::int as signed, null::int as to_sign, null::text[] as signers,
             case when r.version is not null then 'Version ' || r.version end as detail,
             'rams'::text as section, jsonb_build_object('rams', r.id) as params, null::numeric as total
        from public.rams_documents r join jobs jb on jb.id = r.employer_job_id
      union all
      select 'job_pack', p.id, coalesce(nullif(p.title, ''), 'Job pack'), p.status,
             coalesce(p.updated_at, p.created_at), jb.id, jb.title,
             (select count(*)::int from public.employer_job_pack_acknowledgements k where k.job_pack_id = p.id),
             (select c.n::int from crew c where c.job_id = jb.id),
             (select array_agg(e.name order by k.acknowledged_at)
                from public.employer_job_pack_acknowledgements k
                join public.employer_employees e on e.id = k.employee_id
               where k.job_pack_id = p.id),
             nullif(concat_ws(', ',
               case when p.rams_generated then 'RAMS' end,
               case when p.method_statement_generated then 'method statement' end,
               case when p.briefing_pack_generated then 'briefing' end), ''),
             'jobpacks', jsonb_build_object('job', jb.id), null
        from public.employer_job_packs p join jobs jb on jb.id = p.job_id
      union all
      select 'briefing', b.id, coalesce(nullif(b.title, ''), 'Briefing'), b.status,
             coalesce(b.updated_at, b.created_at), jb.id, jb.title,
             (select count(*)::int from public.briefing_attendees t where t.briefing_id = b.id and t.acknowledged),
             (select count(*)::int from public.briefing_attendees t where t.briefing_id = b.id),
             (select array_agg(coalesce(e.name, t.guest_name) order by t.acknowledged_at)
                from public.briefing_attendees t
                left join public.employer_employees e on e.id = t.employee_id
               where t.briefing_id = b.id and t.acknowledged),
             case when b.ai_generated then 'AI drafted' end,
             'briefings', jsonb_build_object('briefing', b.id), null
        from public.briefings b join jobs jb on jb.id = b.job_id
      union all
      select case when q.invoice_raised then 'invoice' else 'quote' end, q.id,
             case when q.invoice_raised then coalesce('Invoice ' || nullif(q.invoice_number, ''), 'Invoice')
                  else coalesce('Quote ' || nullif(q.quote_number, ''), 'Quote') end,
             case when q.invoice_raised then coalesce(q.invoice_status, q.status)
                  else coalesce(nullif(q.acceptance_status, ''), q.status) end,
             coalesce(q.updated_at, q.created_at), jb.id, jb.title,
             null, null, null,
             case when q.accepted_at is not null and not coalesce(q.invoice_raised, false)
                  then 'Accepted ' || to_char(q.accepted_at at time zone 'Europe/London', 'DD Mon') end,
             'quotes', jsonb_build_object('quote', q.id),
             case when jb.money then q.total end
        from public.quotes q join jobs jb on jb.id = q.employer_job_id
       where q.deleted_at is null
      union all
      select 'certificate', r.id,
             concat_ws(' ', upper(coalesce(r.report_type, 'Certificate')), nullif(r.certificate_number, '')),
             r.status, coalesce(r.updated_at, r.created_at), jb.id, jb.title,
             null, null, null,
             nullif(concat_ws(', ', nullif(r.client_name, ''), nullif(r.installation_address, '')), ''),
             'testing', jsonb_build_object('cert', r.id), null
        from public.employer_job_certificates l
        join public.reports r on r.id = l.report_uuid and r.deleted_at is null
        join jobs jb on jb.id = l.job_id
      union all
      select 'signature', s.id, coalesce(nullif(s.document_title, ''), 'Signature request'), s.status,
             coalesce(s.signed_at, s.updated_at, s.created_at), jb.id, jb.title,
             case when s.signed_at is not null then 1 else 0 end, 1,
             case when s.signed_at is not null then array[s.signer_name] end,
             nullif(s.signer_name, ''),
             'signatures', jsonb_build_object('request', s.id), null
        from public.signature_requests s join jobs jb on jb.id = s.job_id
       where s.revoked_at is null
      union all
      select 'compliance', c.id, coalesce(nullif(c.title, ''), 'Document'), c.status,
             coalesce(c.updated_at, c.created_at), jb.id, jb.title,
             c.signatures_collected, nullif(c.signatures_required, 0), null,
             nullif(c.document_type, ''),
             'compliance', jsonb_build_object('job', jb.id), null
        from public.compliance_documents c join jobs jb on jb.id = c.job_id
      union all
      -- ELE-1941: generated for the job, not yet issued.
      select 'ai_rams', g.id,
             coalesce(nullif(g.rams_data ->> 'projectName', ''), nullif(left(g.job_description, 60), ''), 'RAMS'),
             case when g.status in ('complete', 'partial') then 'Not issued' else g.status end,
             coalesce(g.updated_at, g.created_at), jb.id, jb.title,
             null, null, null,
             'RAMS and method statement',
             'site-safety', jsonb_build_object('tool', 'rams-result', 'id', g.id), null
        from public.rams_generation_jobs g join jobs jb on jb.id = g.employer_job_id
       where g.employer_id = jb.user_id
         and g.status in ('complete', 'partial', 'pending', 'processing')
         and not exists (
           select 1 from public.rams_documents r
            where r.ai_generation_metadata ->> 'generation_job_id' = g.id::text)
      union all
      -- ELE-1943: AI circuit designs filed on the job.
      select 'design', d.id,
             coalesce(nullif(d.job_inputs -> 'projectInfo' ->> 'projectName', ''), 'Design'),
             d.status, coalesce(d.completed_at, d.updated_at, d.created_at), jb.id, jb.title,
             null, null, null,
             case when jsonb_typeof(d.design_data -> 'circuits') = 'array'
                  then jsonb_array_length(d.design_data -> 'circuits') || ' circuits' end,
             'aidesignspec', jsonb_build_object('design', d.id), null
        from public.circuit_design_jobs d join jobs jb on jb.id = d.employer_job_id
       where d.employer_id = jb.user_id
    )
    select jsonb_build_object(
      'job', (select jsonb_build_object('id', j.id, 'title', j.title) from jobs j where j.id = p_job),
      'total', (select count(*) from docs),
      'by_kind', coalesce((select jsonb_object_agg(kind, n) from (select kind, count(*) n from docs group by kind) k), '{}'::jsonb),
      'items', coalesce((
        select jsonb_agg(to_jsonb(d) order by d.at desc nulls last)
          from (select * from docs order by at desc nulls last limit v_limit) d
      ), '[]'::jsonb)
    )
  );
end;
$function$;
