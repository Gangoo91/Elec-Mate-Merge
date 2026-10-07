-- ELE-1993: the office picks a certificate to send for signature, or to list
-- on a handover. `reports` RLS shows a user only their own rows, so an office
-- manager could never see the owner's certificates. This lists the firm's
-- (owner + active co-admins) finished certificates, newest first, with only
-- the fields the picker needs.
create or replace function public.list_signable_certificates(
  p_search text default null,
  p_limit integer default 60
) returns table (
  id uuid,
  label text,
  certificate_number text,
  client_name text,
  installation_address text,
  inspection_date date,
  has_pdf boolean
) language plpgsql stable security definer set search_path = public as $$
declare
  v_firm uuid;
  v_q text := nullif(btrim(coalesce(p_search, '')), '');
begin
  if auth.uid() is null then
    raise exception 'Sign in first' using errcode = '42501';
  end if;
  v_firm := public.my_default_employer_id();
  if v_firm <> auth.uid() and not exists (
       select 1 from public.employer_admins a
        where a.employer_id = v_firm and a.user_id = auth.uid() and a.status = 'active') then
    return;
  end if;
  return query
    select r.id, public._sig_cert_label(r.report_type), r.certificate_number, r.client_name,
           r.installation_address, r.inspection_date, r.pdf_url is not null
      from public.reports r
     where r.deleted_at is null
       and r.status = 'completed'
       and r.certificate_number is not null
       and public._sig_is_member(v_firm, r.user_id)
       and (v_q is null
            or r.certificate_number ilike '%' || v_q || '%'
            or r.client_name ilike '%' || v_q || '%'
            or r.installation_address ilike '%' || v_q || '%')
     order by coalesce(r.inspection_date, r.created_at::date) desc, r.created_at desc
     limit least(greatest(coalesce(p_limit, 60), 1), 200);
end;
$$;

revoke all on function public.list_signable_certificates(text, integer) from public, anon;
grant execute on function public.list_signable_certificates(text, integer) to authenticated;
