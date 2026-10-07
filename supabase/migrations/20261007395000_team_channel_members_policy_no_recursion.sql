-- Employer Hub > Communications > Team chat returned 500 for everyone:
-- "infinite recursion detected in policy for relation team_channel_members".
-- The ALL policy "Employers and admins can manage members" read
-- team_channel_members inside its own USING clause. Move that lookup into a
-- SECURITY DEFINER helper and let the firm's active managers (co-admins) manage
-- members too, matching "Firm managers manage team_channels".
create or replace function public.is_team_channel_admin(p_channel uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select auth.uid() is not null and exists (
    select 1 from public.team_channel_members m
     where m.channel_id = p_channel
       and m.user_id = auth.uid()
       and m.role = 'admin')
$$;
revoke all on function public.is_team_channel_admin(uuid) from public, anon;
grant execute on function public.is_team_channel_admin(uuid) to authenticated;

create or replace function public.can_manage_team_channel(p_channel uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select auth.uid() is not null and (
    exists (select 1 from public.team_channels c
             where c.id = p_channel
               and c.employer_id in (select public.my_employer_scope()))
    or public.is_team_channel_admin(p_channel))
$$;
revoke all on function public.can_manage_team_channel(uuid) from public, anon;
grant execute on function public.can_manage_team_channel(uuid) to authenticated;

alter policy "Employers and admins can manage members" on public.team_channel_members
  using (public.can_manage_team_channel(channel_id))
  with check (public.can_manage_team_channel(channel_id));
