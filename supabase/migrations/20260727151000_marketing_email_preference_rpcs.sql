-- Settings → Notifications: marketing email opt-out, backed by the same
-- email_suppressions table every sender already checks.

create or replace function public.get_marketing_email_optout()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.email_suppressions s
    where s.user_id = auth.uid()
       or lower(s.email) = lower(coalesce(auth.jwt()->>'email', ''))
  );
$$;

create or replace function public.set_marketing_email_optout(p_optout boolean)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_email text := lower(coalesce(auth.jwt()->>'email', ''));
begin
  if auth.uid() is null or v_email = '' then
    raise exception 'not authenticated';
  end if;

  if p_optout then
    insert into public.email_suppressions (email, user_id, reason, source)
    select v_email, auth.uid(), 'user_preference', 'settings'
    where not exists (
      select 1 from public.email_suppressions where lower(email) = v_email
    );
  else
    -- Re-opting in is fresh consent — clear every suppression for this address
    delete from public.email_suppressions
    where lower(email) = v_email or user_id = auth.uid();
  end if;
end;
$$;

revoke execute on function public.get_marketing_email_optout() from public, anon;
revoke execute on function public.set_marketing_email_optout(boolean) from public, anon;
grant execute on function public.get_marketing_email_optout() to authenticated;
grant execute on function public.set_marketing_email_optout(boolean) to authenticated;
