-- assess fix agent (ELE-2076 / ELE-2069 review), 10 Oct 2026. Additive:
-- grants on three new uncommitted tables, and a new body for the
-- uncommitted create_pack_share (same signature; HEAD never calls it).
--
-- 1. Anon had the default table grant on the 20261010210000 tables (RLS
--    returned 0 rows). Revoke it, as 20261010201000 / 202000 do. Pack shares
--    are written only by the RPCs, so authenticated keeps SELECT only.
revoke all on public.employer_complaints from anon;
revoke all on public.employer_cdm_plans from anon;
revoke all on public.employer_pack_shares from anon;
revoke insert, update, delete, truncate, references, trigger
  on public.employer_pack_shares from authenticated;

-- 2. create_pack_share checks every item. A document item names its
--    compliance_documents row (document_id, which must belong to the firm);
--    the file is signed for 10 minutes at view time by the firm-pack-files
--    edge function, so stopping a share recalls the files. A stored url is
--    accepted only as https:// (the legacy path, used until that function is
--    deployed).
create or replace function public.create_pack_share(
  p_firm uuid,
  p_questionnaire text,
  p_recipient text,
  p_items jsonb,
  p_summary jsonb,
  p_days integer
)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_row public.employer_pack_shares%rowtype;
  v_item jsonb;
  v_doc text;
begin
  if auth.uid() is null or not public.can_see_firm_money(p_firm) then
    raise exception 'NOT_AUTHORISED';
  end if;
  if p_days is null or p_days < 1 or p_days > 30 then
    raise exception 'BAD_EXPIRY';
  end if;
  if jsonb_typeof(coalesce(p_items, 'null'::jsonb)) <> 'array' or jsonb_array_length(p_items) = 0
     or jsonb_array_length(p_items) > 80 then
    raise exception 'BAD_ITEMS';
  end if;
  if octet_length(p_items::text) > 400000 then
    raise exception 'PACK_TOO_LARGE';
  end if;
  for v_item in select value from jsonb_array_elements(p_items) loop
    if jsonb_typeof(v_item) <> 'object' or coalesce(v_item->>'type', '') not in ('document', 'policy') then
      raise exception 'BAD_ITEMS';
    end if;
    if v_item->>'type' = 'document' then
      if v_item ? 'url' and jsonb_typeof(v_item->'url') <> 'null'
         and coalesce(v_item->>'url', '') !~* '^https://' then
        raise exception 'BAD_ITEM_URL';
      end if;
      v_doc := nullif(v_item->>'document_id', '');
      if v_doc is not null and (
           v_doc !~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
           or not exists (select 1 from public.compliance_documents d
                           where d.id = v_doc::uuid and d.user_id = p_firm)) then
        raise exception 'BAD_ITEM_DOCUMENT';
      end if;
    end if;
  end loop;
  insert into public.employer_pack_shares
    (employer_id, token, questionnaire, recipient, items, summary, expires_at)
  values
    (p_firm, public._share_random_token(32),
     case when p_questionnaire in ('chas', 'ssip', 'constructionline') then p_questionnaire else 'custom' end,
     nullif(left(btrim(coalesce(p_recipient, '')), 160), ''),
     p_items, coalesce(p_summary, '{}'::jsonb), now() + make_interval(days => p_days))
  returning * into v_row;
  return jsonb_build_object('id', v_row.id, 'token', v_row.token, 'expires_at', v_row.expires_at);
end;
$$;
revoke all on function public.create_pack_share(uuid, text, text, jsonb, jsonb, integer) from public, anon;
grant execute on function public.create_pack_share(uuid, text, text, jsonb, jsonb, integer) to authenticated;
