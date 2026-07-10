-- Atomic, idempotent lead → client conversion. Creating the client and stamping
-- the lead in one transaction avoids the orphan/duplicate-client risk of doing
-- it as two client calls (if the second failed, a retry made a second client).
CREATE OR REPLACE FUNCTION public.convert_lead(p_lead_id uuid)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_lead public.employer_leads;
  v_client_id uuid;
begin
  select * into v_lead from public.employer_leads
   where id = p_lead_id and user_id = auth.uid();
  if v_lead is null then
    raise exception 'Lead not found';
  end if;
  if v_lead.converted_client_id is not null then
    return v_lead.converted_client_id;
  end if;

  insert into public.employer_clients
    (employer_id, name, contact_name, email, phone, notes, last_activity_at)
  values
    (auth.uid(), v_lead.name, v_lead.contact_name,
     nullif(lower(v_lead.email), ''), v_lead.phone, v_lead.notes, now())
  returning id into v_client_id;

  update public.employer_leads
     set stage = 'Won', converted_client_id = v_client_id,
         converted_at = now(), updated_at = now()
   where id = p_lead_id;

  return v_client_id;
end;
$function$;
