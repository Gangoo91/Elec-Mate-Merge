create or replace function public.get_lifetime_offer_recipients(p_audience text default 'electrician')
returns table(email text, first_name text)
language sql
security definer
set search_path = public
as $$
  with buyers(email) as (values
    ('info@rdelectrical.net'),('william@jbweir.co.uk'),('info@theelectricalproject.co.uk'),
    ('adam@johnearlservices.co.uk'),('danpenn20@icloud.com'),('jason@aeeyorkshire.co.uk'),
    ('matt@myfes.co.uk'),('info@cookstarlingelectrical.co.uk'))
  select distinct on (lower(u.email))
    u.email,
    nullif(split_part(coalesce(p.full_name,''),' ',1),'') as first_name
  from profiles p
  join auth.users u on u.id = p.id
  where u.email is not null and u.deleted_at is null
    and p.is_trial is not true
    and (
      (p_audience = 'electrician' and lower(coalesce(p.subscription_tier,'')) in
         ('electrician','electrician_yearly','founder','business_ai'))
      or
      (p_audience = 'all_paid' and lower(coalesce(p.subscription_tier,'')) in
         ('electrician','electrician_yearly','founder','business_ai','employer','apprentice','apprentice_yearly'))
    )
    and lower(u.email) not in (select lower(email) from buyers)
    and not exists (select 1 from email_suppressions s where lower(s.email) = lower(u.email))
  order by lower(u.email);
$$;

revoke all on function public.get_lifetime_offer_recipients(text) from anon, authenticated;
