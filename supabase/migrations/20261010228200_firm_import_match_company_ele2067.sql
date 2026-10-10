-- ELE-2067 — a document that names the customer by company ("Freeman Holiday
-- Lets") links to the contact imported as "Luke Freeman" at that company.
-- Name-only matching (no email, phone or postcode on the row) now checks the
-- company name as well as the person's name. Same signature, same callers.

create or replace function public._imp_match_customer(
  p_firm uuid, p_name text, p_email text, p_phone text, p_postcode text)
returns table (customer_id uuid, reason text)
language plpgsql stable security definer set search_path = public as $$
declare
  v_email text := nullif(lower(btrim(coalesce(p_email, ''))), '');
  v_phone text := public._imp_phone(p_phone);
  v_pc text := public._imp_pc(p_postcode);
  v_name text := public._imp_name(p_name);
  v_id uuid;
begin
  if v_email is not null then
    select c.id into v_id from public.customers c
     where c.user_id = p_firm and lower(btrim(c.email)) = v_email
     order by c.created_at limit 1;
    if v_id is not null then customer_id := v_id; reason := 'email'; return next; return; end if;
  end if;
  if v_phone is not null then
    select c.id into v_id from public.customers c
     where c.user_id = p_firm and public._imp_phone(c.phone) = v_phone
     order by c.created_at limit 1;
    if v_id is not null then customer_id := v_id; reason := 'phone'; return next; return; end if;
  end if;
  if v_name is not null and v_pc is not null then
    select c.id into v_id from public.customers c
     where c.user_id = p_firm
       and (public._imp_name(c.name) = v_name or public._imp_name(c.company_name) = v_name)
       and coalesce(public._imp_pc(c.postcode), public._imp_pc(substring(c.address from '([A-Za-z]{1,2}[0-9][0-9A-Za-z]?\s*[0-9][A-Za-z]{2})\s*$'))) = v_pc
     order by c.created_at limit 1;
    if v_id is not null then customer_id := v_id; reason := 'name and postcode'; return next; return; end if;
  end if;
  if v_name is not null and v_email is null and v_phone is null and v_pc is null then
    select c.id into v_id from public.customers c
     where c.user_id = p_firm
       and (public._imp_name(c.name) = v_name or public._imp_name(c.company_name) = v_name)
     order by (public._imp_name(c.name) = v_name) desc, c.created_at limit 1;
    if v_id is not null then customer_id := v_id; reason := 'name'; return next; return; end if;
  end if;
  return;
end $$;

revoke all on function public._imp_match_customer(uuid, text, text, text, text) from public, anon, authenticated;
