-- Add has_account to get_team_invite so the public team-invite accept page can
-- open in the correct mode: sign-in for people who already have an Elec-Mate
-- account, create-account for new people. SECURITY DEFINER lets it read
-- auth.users. Backward compatible — only adds a field to the returned jsonb.
CREATE OR REPLACE FUNCTION public.get_team_invite(p_token text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v record;
  v_has_account boolean := false;
begin
  select ti.status, ti.email, ti.expires_at,
         e.name as employee_name,
         coalesce(cp.company_name, 'Your employer') as company_name
    into v
  from employer_team_invites ti
  join employer_employees e on e.id = ti.employee_id
  left join company_profiles cp on cp.user_id = ti.employer_id
  where ti.token = p_token
  limit 1;

  if v is null then
    return jsonb_build_object('error', 'not_found');
  end if;
  if v.status <> 'pending' then
    return jsonb_build_object('error', v.status);  -- accepted|revoked|expired
  end if;
  if v.expires_at < now() then
    return jsonb_build_object('error', 'expired');
  end if;

  select exists(select 1 from auth.users where lower(email) = lower(v.email))
    into v_has_account;

  return jsonb_build_object(
    'company_name', v.company_name,
    'employee_name', v.employee_name,
    'email', v.email,
    'has_account', v_has_account
  );
end;
$function$;
