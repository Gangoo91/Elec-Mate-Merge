-- ELE-2067 — the source system's proper name in imported records' notes
-- ("Imported from simPRO", "from a spreadsheet"), not initcap ("Simpro",
-- "Servicem8", "Generic").
--
-- Only ELE-2067's own functions change (nothing in HEAD or build 49 calls
-- them). The two functions are patched in place from their live
-- definition so the rest of their bodies stays exactly as applied.

create or replace function public._imp_source_label(p_source text)
returns text language sql immutable set search_path = public as $$
  select case p_source
    when 'tradify' then 'Tradify'
    when 'fergus' then 'Fergus'
    when 'powered_now' then 'Powered Now'
    when 'simpro' then 'simPRO'
    when 'servicem8' then 'ServiceM8'
    when 'jobber' then 'Jobber'
    when 'commusoft' then 'Commusoft'
    when 'joblogic' then 'Joblogic'
    when 'generic' then 'a spreadsheet'
    else coalesce(p_source, 'another system')
  end
$$;

revoke all on function public._imp_source_label(text) from public, anon;

do $$
declare
  d text;
begin
  d := pg_get_functiondef('public.import_firm_rows(uuid,text,uuid,text,jsonb,boolean)'::regprocedure);
  if position('initcap(replace(coalesce(p_source, ''''), ''_'', '' ''))' in d) > 0 then
    d := replace(d, 'initcap(replace(coalesce(p_source, ''''), ''_'', '' ''))', 'public._imp_source_label(p_source)');
    execute d;
  end if;

  d := pg_get_functiondef('public._imp_customer_for(uuid,uuid,text,jsonb,boolean)'::regprocedure);
  if position('initcap(replace(p_source, ''_'', '' ''))' in d) > 0 then
    d := replace(d, 'initcap(replace(p_source, ''_'', '' ''))', 'public._imp_source_label(p_source)');
    execute d;
  end if;
end $$;
