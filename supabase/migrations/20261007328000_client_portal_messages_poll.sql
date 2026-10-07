-- ELE-1996 — the open portal page refreshes its message thread without
-- counting each refresh as a "view" (client_portal_get bumps views_count,
-- which the office reads as "Opened N times").
create or replace function public.client_portal_messages(p_token text)
returns jsonb language plpgsql volatile security definer set search_path = public as $$
declare
  v_ip text := public._client_portal_ip();
  l public.client_portal_links;
begin
  if not public._client_portal_rate_ok('ip:' || v_ip, 300, interval '10 minutes') then
    return jsonb_build_object('error', 'rate_limited');
  end if;
  l := public._client_portal_link(p_token);
  if l.id is null or l.revoked_at is not null or not coalesce(l.is_active, true)
     or (l.expires_at is not null and l.expires_at <= now()) then
    perform public._client_portal_rate_ok('bad:' || v_ip, 1000000, interval '10 minutes');
    return jsonb_build_object('error', 'not_found');
  end if;
  return jsonb_build_object('messages', coalesce((
    select jsonb_agg(jsonb_build_object(
             'id', m.id, 'message', m.message,
             'from', case when m.sender_type = 'client' then 'you' else 'firm' end,
             'created_at', m.created_at) order by m.created_at)
      from (select * from public.employer_client_messages
             where customer_id = l.customer_id and firm_id = l.user_id
             order by created_at desc limit 200) m), '[]'::jsonb));
end $$;
revoke all on function public.client_portal_messages(text) from public;
grant execute on function public.client_portal_messages(text) to anon, authenticated;
