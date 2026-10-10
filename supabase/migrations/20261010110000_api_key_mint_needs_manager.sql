-- ELE-1884 hardening (10 Oct 2026): minting a data API key needs an admin or
-- head of department. college_can('settings.manage') is true for any active
-- staff while a college has no manager yet (set-up bootstrap); a key exports
-- every learner's data, so it must never ride on that. Revoking still uses
-- settings.manage (safe). Body otherwise the live definition.

CREATE OR REPLACE FUNCTION public.college_api_key_mint(p_college uuid, p_label text, p_scopes text[], p_rate integer DEFAULT 60)
 RETURNS json
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  -- A key reads the whole college's data, so it needs a real admin or head of
  -- department (or Elec-Mate platform admin). Not the "no manager yet"
  -- bootstrap in college_can, which lets any tutor run the basics.
  if auth.uid() is null or not (
       exists (select 1 from public.college_staff m
                where m.college_id = p_college and m.user_id = auth.uid() and m.archived_at is null
                  and m.role in ('admin', 'head_of_department'))
       or public._is_platform_admin()
     ) then
    raise exception 'only a college admin or head of department can create API keys' using errcode = '42501';
  end if;
  if (select count(*) from public.college_api_keys where college_id = p_college and revoked_at is null) >= 10 then
    raise exception 'a college can hold 10 live keys; revoke one first' using errcode = 'P0001';
  end if;
  return public._college_api_key_create(p_college, p_label, p_scopes, p_rate, auth.uid());
end;
$function$;
