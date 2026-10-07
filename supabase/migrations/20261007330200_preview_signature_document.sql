-- ELE-1993: show the office exactly what the client will see before sending.
-- Same builder as create_signature_request (_sig_snapshot), same firm check,
-- nothing is written. A new variation (no variation order yet) is previewed
-- from the job and the price change typed in. Money totals are left out for
-- users who cannot see the firm's money (ELE-1831 office role).
create or replace function public.preview_signature_document(
  p_document_type text,
  p_document_id uuid default null,
  p_options jsonb default '{}'::jsonb
) returns jsonb language plpgsql stable security definer set search_path = public as $$
declare
  v_uid uuid := auth.uid();
  v_firm uuid;
  v_opts jsonb := coalesce(p_options, '{}'::jsonb);
  v_refs jsonb := '{}'::jsonb;
  v_snap jsonb;
  v_job public.employer_jobs%rowtype;
  v_approved numeric;
  v_value numeric;
  v_money boolean;
begin
  if v_uid is null then raise exception 'Sign in first' using errcode = '42501'; end if;
  v_firm := public.my_default_employer_id();
  if v_firm <> v_uid and not exists (
       select 1 from public.employer_admins a
        where a.employer_id = v_firm and a.user_id = v_uid and a.status = 'active') then
    raise exception 'Not allowed' using errcode = '42501';
  end if;
  v_money := public.can_see_firm_money(v_firm);

  if p_document_type = 'Variation' and p_document_id is null then
    select * into v_job from public.employer_jobs
     where id = nullif(v_opts->>'job_id', '')::uuid and user_id = v_firm;
    if not found then return null; end if;
    select coalesce(sum(value), 0) into v_approved
      from public.variation_orders where job_id = v_job.id and status = 'Approved';
    v_value := coalesce(nullif(v_opts->>'value', '')::numeric, 0);
    v_snap := jsonb_build_object(
      'kind', 'variation',
      'job_title', v_job.title,
      'client', v_job.client,
      'address', v_job.location,
      'description', nullif(btrim(coalesce(v_opts->>'description', '')), ''),
      'agreed_before', coalesce(v_job.value, 0) + v_approved,
      'change', v_value,
      'new_total', coalesce(v_job.value, 0) + v_approved + v_value);
  else
    if p_document_type = 'Handover' then
      v_refs := jsonb_build_object('report_ids', coalesce(v_opts->'report_ids', '[]'::jsonb));
    end if;
    v_snap := public._sig_snapshot(v_firm, p_document_type, p_document_id, v_refs);
  end if;

  if v_snap is null then return null; end if;
  if not v_money and v_snap->>'kind' = 'variation' then
    v_snap := v_snap - 'agreed_before' - 'new_total';
  end if;
  return jsonb_build_object('document', v_snap,
                            'statement', public._sig_statement(p_document_type, v_snap));
end;
$$;

revoke all on function public.preview_signature_document(text, uuid, jsonb) from public, anon;
grant execute on function public.preview_signature_document(text, uuid, jsonb) to authenticated;
