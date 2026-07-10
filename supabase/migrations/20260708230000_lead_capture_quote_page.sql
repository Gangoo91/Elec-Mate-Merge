-- "Get Quotes" lead-capture page: a public, branded page per electrician whose
-- enquiries drop straight into their Leads pipeline. Config lives on the
-- company profile; two public RPCs render the page + accept submissions.
ALTER TABLE public.company_profiles
  ADD COLUMN IF NOT EXISTS lead_page_slug text,
  ADD COLUMN IF NOT EXISTS lead_page_enabled boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS lead_page_headline text;

CREATE UNIQUE INDEX IF NOT EXISTS company_profiles_lead_slug_idx
  ON public.company_profiles (lower(lead_page_slug)) WHERE lead_page_slug IS NOT NULL;

-- Public: render the page (only if enabled).
CREATE OR REPLACE FUNCTION public.get_lead_page(p_slug text)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v record;
begin
  select company_name, logo_url, logo_data_url, company_phone,
         lead_page_headline, lead_page_enabled
    into v
  from company_profiles
  where lower(lead_page_slug) = lower(p_slug)
  limit 1;

  if v is null or not coalesce(v.lead_page_enabled, false) then
    return jsonb_build_object('found', false);
  end if;

  return jsonb_build_object(
    'found', true,
    'company_name', coalesce(v.company_name, 'Your local electrician'),
    'logo', coalesce(nullif(v.logo_url, ''), v.logo_data_url),
    'phone', v.company_phone,
    'headline', v.lead_page_headline
  );
end;
$function$;

-- Public: accept an enquiry → new lead in the owner's pipeline.
CREATE OR REPLACE FUNCTION public.submit_lead_enquiry(
  p_slug text, p_name text, p_email text, p_phone text, p_summary text
)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v_user uuid;
begin
  if coalesce(trim(p_name), '') = '' then
    return false;
  end if;
  select user_id into v_user
  from company_profiles
  where lower(lead_page_slug) = lower(p_slug) and lead_page_enabled = true
  limit 1;
  if v_user is null then
    return false;
  end if;

  insert into public.employer_leads (user_id, name, email, phone, source, stage, notes)
  values (
    v_user,
    left(p_name, 200),
    nullif(lower(p_email), ''),
    nullif(p_phone, ''),
    'Quote page',
    'New',
    left(p_summary, 4000)
  );
  return true;
end;
$function$;
