-- ELE-1830 follow-up: amounts come back as pence (2 dp), and the subbie's bell
-- says "5 days", not "5.0 days".
create or replace function public.cis_statement_amounts(
  p_rate_basis text, p_rate numeric, p_days numeric, p_hours numeric,
  p_other numeric, p_materials numeric, p_cis_status text)
returns jsonb
language sql
immutable
set search_path = public
as $fn$
  with a as (
    select round(case when p_rate_basis = 'hour' then coalesce(p_rate, 0) * coalesce(p_hours, 0)
                      else coalesce(p_rate, 0) * coalesce(p_days, 0) end, 2) as labour,
           round(coalesce(p_other, 0), 2) as other,
           round(coalesce(p_materials, 0), 2) as materials,
           public.cis_rate_for(p_cis_status) as rate
  ), b as (
    select a.*, (floor((a.labour + a.other) * a.rate * 100) / 100)::numeric(12,2) as deduction from a
  )
  select jsonb_build_object(
    'labour', b.labour, 'other_costs', b.other, 'materials', b.materials,
    'gross', (b.labour + b.other + b.materials)::numeric(12,2),
    'cis_rate', b.rate, 'cis_deduction', b.deduction,
    'net_payable', (b.labour + b.other + b.materials - b.deduction)::numeric(12,2))
  from b;
$fn$;

do $do$
declare
  v_def text := pg_get_functiondef('public.issue_subcontractor_statement(uuid, uuid, date, date, uuid[], uuid[])'::regprocedure);
  v_old text := $o$trim(to_char(v_days, 'FM9990.0'))$o$;
  v_new text := $o$regexp_replace(trim(to_char(v_days, 'FM9990.0')), '\.0$', '')$o$;
begin
  if position(v_new in v_def) > 0 then
    return;
  end if;
  if position(v_old in v_def) = 0 then
    raise exception 'issue_subcontractor_statement: day-count anchor not found';
  end if;
  execute replace(v_def, v_old, v_new);
end
$do$;
