-- Give every company a quote page automatically. Slug from company name (unique);
-- live by default for employer-tier, ready-but-off for everyone else.

create or replace function public.gen_lead_slug(p_name text)
 returns text language plpgsql stable set search_path to 'public'
as $function$
declare base text; candidate text; n int := 1;
begin
  base := trim(both '-' from regexp_replace(lower(coalesce(p_name, '')), '[^a-z0-9]+', '-', 'g'));
  base := left(base, 40);
  base := trim(both '-' from base);
  if base = '' then base := 'electrician'; end if;
  candidate := base;
  while exists (select 1 from company_profiles where lower(lead_page_slug) = candidate) loop
    n := n + 1;
    candidate := base || '-' || n;
  end loop;
  return candidate;
end;
$function$;

do $$
declare r record; s text;
begin
  for r in
    select cp.id, cp.company_name, p.subscription_tier
    from company_profiles cp
    left join profiles p on p.id = cp.user_id
    where cp.company_name is not null and length(trim(cp.company_name)) > 0
      and cp.lead_page_slug is null
  loop
    s := public.gen_lead_slug(r.company_name);
    update company_profiles
      set lead_page_slug = s,
          lead_page_enabled = (lower(coalesce(r.subscription_tier, '')) = 'employer')
      where id = r.id;
  end loop;
end $$;

create or replace function public.autofill_lead_slug()
 returns trigger language plpgsql security definer set search_path to 'public'
as $function$
begin
  if NEW.lead_page_slug is null
     and NEW.company_name is not null and length(trim(NEW.company_name)) > 0 then
    NEW.lead_page_slug := public.gen_lead_slug(NEW.company_name);
    if NEW.lead_page_enabled is not true then
      NEW.lead_page_enabled :=
        (lower(coalesce((select subscription_tier from profiles where id = NEW.user_id), '')) = 'employer');
    end if;
  end if;
  return NEW;
end;
$function$;

drop trigger if exists trg_autofill_lead_slug on public.company_profiles;
create trigger trg_autofill_lead_slug
  before insert or update of company_name on public.company_profiles
  for each row execute function public.autofill_lead_slug();
