-- get_shared_portfolio_comments returned EVERY comment on the learner's
-- portfolio (tutor notes on other evidence included), even for a share link
-- that covers one item. Scope it to the share, the same way the structured
-- share data is scoped (entry_ids / portfolio_item_id; whole portfolio only
-- when the share names no items).
create or replace function public.get_shared_portfolio_comments(p_share_token text)
returns jsonb language plpgsql stable security definer set search_path to 'public' as $$
declare
  s public.portfolio_shares%rowtype;
  v_scope uuid[];
begin
  select * into s from portfolio_shares
   where token = p_share_token and is_active and (expires_at is null or expires_at > now());
  if s.id is null then
    return jsonb_build_object('error', 'Invalid or expired share link');
  end if;
  v_scope := public._share_scope(s.entry_ids, s.portfolio_item_id);
  return coalesce((
    select jsonb_agg(jsonb_build_object(
             'id', pc.id, 'context_type', coalesce(pc.context_type, 'evidence'),
             'context_id', pc.evidence_id, 'parent_id', pc.parent_id,
             'author_name', pc.author_name, 'author_role', pc.author_role,
             'author_initials', coalesce(pc.author_initials, upper(left(pc.author_name, 2))),
             'content', pc.content, 'requires_action', coalesce(pc.requires_action, false),
             'is_resolved', coalesce(pc.is_resolved, false), 'created_at', pc.created_at)
           order by pc.created_at asc)
      from portfolio_comments pc
     where pc.user_id = s.user_id
       and (v_scope is null or pc.evidence_id = any(v_scope))), '[]'::jsonb);
end; $$;
grant execute on function public.get_shared_portfolio_comments(text) to anon, authenticated;
