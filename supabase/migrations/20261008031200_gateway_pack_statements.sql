-- ELE-1883 — the declaration wording for the gateway pack PDF, for the
-- portfolio-export-pack edge function (service role). An unsigned declaration
-- prints the wording the signer will be asked to sign, so the pack shows it.
create or replace function public.get_gateway_statements_for_pack(p_learner uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare snap jsonb;
begin
  if coalesce(auth.role(), '') <> 'service_role' then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  snap := public._gateway_snapshot(p_learner);
  return jsonb_build_object(
    'learner', public._gateway_statement('learner', snap),
    'provider', public._gateway_statement('provider', snap),
    'employer', public._gateway_statement('employer', snap));
end;
$$;

revoke all on function public.get_gateway_statements_for_pack(uuid) from public, anon, authenticated;
grant execute on function public.get_gateway_statements_for_pack(uuid) to service_role;
