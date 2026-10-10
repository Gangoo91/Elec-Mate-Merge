-- ELE-2081 part 1 (from ELE-1989): an owner or firm manager can preview the
-- quote page while it is switched off. Additive only.
--
-- get_lead_page_preview(p_slug) returns exactly what get_lead_page returns,
-- plus 'preview': true and 'enabled', but only to a signed-in caller whose
-- firm owns the slug (owner or an active employer_admins row, via
-- my_employer_scope()). Everyone else gets {found:false}, as the public page
-- does for a switched-off page. get_lead_page is not changed: anon and HEAD
-- still see "not available" for a page that is off.
--
-- The body is built from the live get_lead_page text so the payload cannot
-- drift; it fails loudly if the expected text has changed.

do $c$
declare
  v_def text;
  v_old text;
begin
  select pg_get_functiondef('public.get_lead_page(text)'::regprocedure) into v_def;

  v_old := 'CREATE OR REPLACE FUNCTION public.get_lead_page(p_slug text)';
  if position(v_old in v_def) = 0 then
    raise exception 'get_lead_page: header not found';
  end if;
  v_def := replace(v_def, v_old, 'CREATE OR REPLACE FUNCTION public.get_lead_page_preview(p_slug text)');

  v_old := E'  if v is null or not coalesce(v.lead_page_enabled, false) then\n    return jsonb_build_object(''found'', false);\n  end if;';
  if (length(v_def) - length(replace(v_def, v_old, ''))) / length(v_old) <> 1 then
    raise exception 'get_lead_page: enabled check not found exactly once';
  end if;
  v_def := replace(v_def, v_old,
    E'  -- Preview: the firm itself, whether or not the page is switched on.\n'
    || E'  if v is null or auth.uid() is null\n'
    || E'     or v.user_id not in (select public.my_employer_scope()) then\n'
    || E'    return jsonb_build_object(''found'', false);\n  end if;');

  v_old := E'  return jsonb_build_object(\n    ''found'', true,';
  if (length(v_def) - length(replace(v_def, v_old, ''))) / length(v_old) <> 1 then
    raise exception 'get_lead_page: return header not found exactly once';
  end if;
  v_def := replace(v_def, v_old,
    E'  return jsonb_build_object(\n    ''found'', true,\n    ''preview'', true,\n    ''enabled'', coalesce(v.lead_page_enabled, false),');

  execute v_def;
end
$c$;

revoke all on function public.get_lead_page_preview(text) from public, anon;
grant execute on function public.get_lead_page_preview(text) to authenticated;
