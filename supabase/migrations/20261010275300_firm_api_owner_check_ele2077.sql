-- ELE-2077 security fix: _firm_owner_only() (20261010241000) only checked that
-- someone was signed in, so ANY account could mint a firm API key or add a
-- webhook (scoped to its own uid). The Developers screen was the only gate.
--
-- Now the caller must be an employer account (is_employer_account, the same
-- rule invite_co_admin uses, mirroring the client's isEmployerUser). The firm
-- is still the caller's own account, so co-admins and office managers still
-- can't create credentials that read the whole firm. Same signature, so
-- mint / revoke / webhook save / rotate / delete / send-test keep working for
-- real firm owners. 0 keys and 0 webhooks exist live (10 Oct), so nobody loses
-- one.

create or replace function public._firm_owner_only()
returns uuid language plpgsql stable security definer set search_path to 'public' as $$
begin
  if auth.uid() is null then raise exception 'Sign in first' using errcode = '42501'; end if;
  if not public.is_employer_account(auth.uid()) then
    raise exception 'API keys and webhooks come with the Employer plan, for the firm owner' using errcode = '42501';
  end if;
  return auth.uid();
end $$;
revoke all on function public._firm_owner_only() from public, anon, authenticated;
