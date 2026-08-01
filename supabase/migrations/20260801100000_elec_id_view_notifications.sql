-- "Someone checked your Elec-ID" — the owner learns their credentials were
-- verified. Called fire-and-forget from the public page; deduped to one
-- notification per day so link-spam is harmless.
create or replace function public.notify_elec_id_view(p_profile_id uuid, p_via text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_owner uuid;
begin
  select e.user_id into v_owner
  from employer_elec_id_profiles pr
  join employer_employees e on e.id = pr.employee_id
  where pr.id = p_profile_id and pr.opt_out = false;

  if v_owner is null then
    return;
  end if;

  if exists (
    select 1 from public.user_notifications n
    where n.user_id = v_owner and n.type = 'elec_id_viewed'
      and n.created_at > now() - interval '1 day'
  ) then
    return;
  end if;

  perform public.notify_user(
    v_owner, 'elec_id_viewed',
    'Someone checked your Elec-ID',
    case when p_via = 'number'
      then 'Your credentials were just verified by Elec-ID number — your profile is doing its job.'
      else 'Someone opened your share link and viewed your verified credentials.'
    end,
    jsonb_build_object('route', '/settings?tab=elec-id')
  );
exception when others then
  -- A failed notification must never break the public view
  return;
end;
$$;

grant execute on function public.notify_elec_id_view(uuid, text) to anon, authenticated;
