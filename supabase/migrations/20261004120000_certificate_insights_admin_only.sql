-- Certificate insights are for Elec-Mate's own use (Andrew, 4 Oct 2026), not a
-- user-facing feature: the hub card and the Ze field hint were removed and the
-- data now lives on Admin → Certificate insights. Both RPCs assert admin.
-- `get_certificate_insights()` stays as the SEO-ready read with no grants.

revoke execute on function public.get_certificate_insights() from anon, authenticated;

create or replace function public.admin_get_certificate_insights()
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $$
begin
  perform public._assert_is_admin();
  return public.get_certificate_insights();
end;
$$;

create or replace function public.admin_refresh_certificate_insights()
returns bigint
language plpgsql
security definer
set search_path to 'public'
as $$
begin
  perform public._assert_is_admin();
  return public.refresh_certificate_insights();
end;
$$;

revoke all on function public.admin_get_certificate_insights() from public, anon;
revoke all on function public.admin_refresh_certificate_insights() from public, anon;
grant execute on function public.admin_get_certificate_insights() to authenticated;
grant execute on function public.admin_refresh_certificate_insights() to authenticated;
