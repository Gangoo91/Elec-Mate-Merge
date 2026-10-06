-- ELE-2022 junk guard: spot an inbox that is being sent everything (e.g. a whole
-- Gmail forwarded instead of a filter), warn once, and auto-block noisy senders.

alter table public.enquiry_inboxes
  add column if not exists junk_warning_at timestamptz,
  add column if not exists junk_warning_dismissed_at timestamptz,
  add column if not exists blocked_senders text[] not null default '{}';

comment on column public.enquiry_inboxes.junk_warning_at is 'Set by inbound-enquiry-email when 5+ junk emails arrive in 24h. Drives the "forwarding everything" banner.';
comment on column public.enquiry_inboxes.blocked_senders is 'Sender domains (or full addresses) whose mail is dropped before it is read. Auto-added after 3 junk with no real enquiry; user can add/remove.';

create or replace function public.dismiss_enquiry_junk_warning()
returns public.enquiry_inboxes
language plpgsql security definer set search_path = public as $$
declare
  v_uid uuid := public.enquiry_inbox_owner();
  v_row public.enquiry_inboxes;
begin
  if v_uid is null then raise exception 'not signed in' using errcode = '42501'; end if;
  update public.enquiry_inboxes set junk_warning_dismissed_at = now()
   where user_id = v_uid returning * into v_row;
  return v_row;
end $$;

-- p_sender: a domain (linkedin.com) or a full address (news@shop.co.uk)
create or replace function public.set_enquiry_sender_blocked(p_sender text, p_blocked boolean)
returns public.enquiry_inboxes
language plpgsql security definer set search_path = public as $$
declare
  v_uid uuid := public.enquiry_inbox_owner();
  v_sender text := lower(trim(p_sender));
  v_row public.enquiry_inboxes;
begin
  if v_uid is null then raise exception 'not signed in' using errcode = '42501'; end if;
  if v_sender = '' or length(v_sender) > 200 or v_sender !~ '^[a-z0-9._%+@-]+\.[a-z]{2,}$' then
    raise exception 'not a valid sender';
  end if;
  perform public.get_my_enquiry_inbox();
  update public.enquiry_inboxes
     set blocked_senders = case
           when p_blocked then (select array_agg(distinct x) from unnest(blocked_senders || v_sender) x)
           else array_remove(blocked_senders, v_sender)
         end
   where user_id = v_uid
  returning * into v_row;
  return v_row;
end $$;

revoke all on function public.dismiss_enquiry_junk_warning() from public, anon;
revoke all on function public.set_enquiry_sender_blocked(text, boolean) from public, anon;
grant execute on function public.dismiss_enquiry_junk_warning() to authenticated;
grant execute on function public.set_enquiry_sender_blocked(text, boolean) to authenticated;
