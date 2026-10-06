-- ELE-1997: converting a lead created an employer_clients row (legacy; never
-- linked to quotes), and only the owner could convert (user_id = auth.uid()).
-- Now: the lead becomes (or matches) a `customers` row for the firm, any
-- manager in the firm (my_employer_scope) can convert, and the link is kept in
-- employer_leads.converted_customer_id. Idempotent.
alter table public.employer_leads
  add column if not exists converted_customer_id uuid references public.customers(id) on delete set null;

create or replace function public.convert_lead(p_lead_id uuid)
returns uuid
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_lead public.employer_leads;
  v_customer uuid;
  v_email text;
begin
  select * into v_lead from public.employer_leads
   where id = p_lead_id and user_id in (select public.my_employer_scope());
  if v_lead is null then
    raise exception 'Lead not found';
  end if;
  if v_lead.converted_customer_id is not null then
    return v_lead.converted_customer_id;
  end if;

  v_email := nullif(lower(trim(coalesce(v_lead.email, ''))), '');

  -- Reuse an existing customer of this firm with the same email, else same name.
  if v_email is not null then
    select id into v_customer from public.customers
     where user_id = v_lead.user_id and lower(trim(email)) = v_email
     order by created_at limit 1;
  end if;
  if v_customer is null then
    select id into v_customer from public.customers
     where user_id = v_lead.user_id and lower(trim(name)) = lower(trim(v_lead.name))
     order by created_at limit 1;
  end if;

  if v_customer is null then
    insert into public.customers (user_id, name, company_name, email, phone, notes, last_activity_at)
    values (v_lead.user_id, v_lead.name, v_lead.contact_name, v_email, v_lead.phone,
            nullif(trim(coalesce(v_lead.notes, '')), ''), now())
    returning id into v_customer;
  else
    update public.customers set last_activity_at = now() where id = v_customer;
  end if;

  update public.employer_leads
     set stage = 'Won', converted_customer_id = v_customer,
         converted_at = now(), updated_at = now()
   where id = p_lead_id;

  return v_customer;
end;
$function$;
