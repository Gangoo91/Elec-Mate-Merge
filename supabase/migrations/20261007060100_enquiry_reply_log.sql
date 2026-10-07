-- ELE-2022: record a reply on the card in one step (two at once both survive).
-- Callable by the server, and by the account's own people for WhatsApp/Text/Copy.
create or replace function public.log_enquiry_reply(p_id uuid, p_via text, p_text text default null, p_to text default null)
returns void
language plpgsql security definer set search_path = public as $$
begin
  if p_via not in ('email', 'whatsapp', 'text', 'copy') then
    raise exception 'bad channel';
  end if;
  if auth.role() <> 'service_role'
     and not exists (select 1 from public.enquiries e
                     where e.id = p_id and e.user_id in (select public.my_employer_scope())) then
    raise exception 'not allowed';
  end if;
  update public.enquiries
     set replies = (
           select coalesce(jsonb_agg(x order by o), '[]'::jsonb)
           from (select x, o from jsonb_array_elements(
                   coalesce(replies, '[]'::jsonb) || jsonb_build_array(jsonb_build_object(
                     'at', now(), 'via', p_via, 'by', coalesce(auth.uid()::text, ''),
                     'to', coalesce(p_to, ''), 'text', left(coalesce(p_text, ''), 1500)))
                 ) with ordinality as t(x, o)
                 order by o desc limit 20) last20
         ),
         first_actioned_at = coalesce(first_actioned_at, now())
   where id = p_id;
end $$;
revoke all on function public.log_enquiry_reply(uuid, text, text, text) from public, anon;
grant execute on function public.log_enquiry_reply(uuid, text, text, text) to authenticated, service_role;
