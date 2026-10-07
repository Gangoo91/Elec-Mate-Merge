-- ELE-2022: atomic claim, so only one booking can win (double tap, web + phone, two co-admins).
create or replace function public.claim_enquiry_visit(p_id uuid)
returns boolean
language sql security definer set search_path = public as $$
  with c as (
    update public.enquiries
       set visit_status = 'booked', visit_action_hash = null
     where id = p_id and visit_status is distinct from 'booked'
    returning 1
  )
  select exists(select 1 from c)
$$;
revoke all on function public.claim_enquiry_visit(uuid) from public, anon, authenticated;
grant execute on function public.claim_enquiry_visit(uuid) to service_role;
