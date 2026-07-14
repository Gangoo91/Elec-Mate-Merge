-- Quote pages are an Employer-Hub-only feature. Restrict auto-provisioning to
-- employer-tier and clear the dormant slugs created for non-employer profiles.

create or replace function public.autofill_lead_slug()
 returns trigger language plpgsql security definer set search_path to 'public'
as $function$
declare v_tier text;
begin
  if NEW.lead_page_slug is null
     and NEW.company_name is not null and length(trim(NEW.company_name)) > 0 then
    select lower(coalesce(subscription_tier, '')) into v_tier from profiles where id = NEW.user_id;
    if v_tier = 'employer' then
      NEW.lead_page_slug := public.gen_lead_slug(NEW.company_name);
      if NEW.lead_page_enabled is not true then
        NEW.lead_page_enabled := true;
      end if;
    end if;
  end if;
  return NEW;
end;
$function$;

update public.company_profiles cp
  set lead_page_slug = null, lead_page_enabled = false
  where cp.lead_page_slug is not null
    and lower(coalesce((select subscription_tier from public.profiles p where p.id = cp.user_id), '')) <> 'employer';
