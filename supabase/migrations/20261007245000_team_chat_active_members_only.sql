-- ELE-1959 follow-up: team chat (channels + DMs) never checked that a person is
-- still on the firm, so a removed worker kept reading and posting. Access now
-- needs the firm's owner, an active manager, or an ACTIVE roster row.
create or replace function public.can_use_firm_chat(p_firm uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select auth.uid() is not null and p_firm is not null and (
    p_firm = auth.uid()
    or p_firm in (select public.my_employer_scope())
    or exists (select 1 from public.employer_employees e
                where e.employer_id = p_firm and e.user_id = auth.uid()
                  and lower(coalesce(e.status, '')) = 'active')
  )
$$;
revoke all on function public.can_use_firm_chat(uuid) from public, anon;
grant execute on function public.can_use_firm_chat(uuid) to authenticated;

create or replace function public.can_use_channel(p_channel uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.team_channel_members m
      join public.team_channels c on c.id = m.channel_id
     where m.channel_id = p_channel and m.user_id = auth.uid()
       and public.can_use_firm_chat(c.employer_id))
$$;
revoke all on function public.can_use_channel(uuid) from public, anon;
grant execute on function public.can_use_channel(uuid) to authenticated;

alter policy "Members can view channels they belong to" on public.team_channels
  using (public.can_use_channel(id));
alter policy "Members can view channel membership" on public.team_channel_members
  using (public.can_use_channel(channel_id));
alter policy "Members can view messages in their channels" on public.team_channel_messages
  using (public.can_use_channel(channel_id));
alter policy "Members can send messages to their channels" on public.team_channel_messages
  with check (sender_id = (select auth.uid()) and public.can_use_channel(channel_id));

alter policy "Users can view their DMs" on public.team_direct_messages
  using (((user_1_id = (select auth.uid())) or (user_2_id = (select auth.uid())))
         and (employer_id is null or public.can_use_firm_chat(employer_id)));
alter policy "Participants can view their DM conversations" on public.team_direct_messages
  using (((participant_1_id = (select auth.uid())) or (participant_2_id = (select auth.uid())))
         and (employer_id is null or public.can_use_firm_chat(employer_id)));
alter policy "Participants can update their DM conversations" on public.team_direct_messages
  using (((participant_1_id = (select auth.uid())) or (participant_2_id = (select auth.uid())))
         and (employer_id is null or public.can_use_firm_chat(employer_id)));
alter policy "Users can send DMs" on public.team_direct_messages
  with check (((user_1_id = (select auth.uid())) or (user_2_id = (select auth.uid())))
              and (employer_id is null or public.can_use_firm_chat(employer_id)));
alter policy "Users can create DM conversations" on public.team_direct_messages
  with check (((participant_1_id = (select auth.uid())) or (participant_2_id = (select auth.uid())))
              and (employer_id is null or public.can_use_firm_chat(employer_id)));
-- team_dm_messages reads/sends go through team_direct_messages (RLS applies in
-- the subquery), so a leaver's DM threads close with the conversation rows.
