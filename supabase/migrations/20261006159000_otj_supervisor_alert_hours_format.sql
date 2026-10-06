-- "1.0 training hour" → "1 training hour"; "1.5 training hours" unchanged.
do $$
declare v_def text;
begin
  v_def := pg_get_functiondef('public.notify_otj_supervisors()'::regprocedure);
  if position('FM990.0' in v_def) = 0 then return; end if;
  v_def := replace(v_def,
    $o$v_hours := trim(to_char(coalesce(NEW.duration_minutes, 0) / 60.0, 'FM990.0'));$o$,
    $n$v_hours := regexp_replace(trim(to_char(coalesce(NEW.duration_minutes, 0) / 60.0, 'FM990.0')), '\.0$', '');$n$);
  v_def := replace(v_def, $o$case when v_hours = '1.0' then '' else 's' end$o$, $n$case when v_hours = '1' then '' else 's' end$n$);
  if position('FM990.0'')), ''\.0$''' in v_def) = 0 and position('regexp_replace(trim(to_char' in v_def) = 0 then
    raise exception 'notify_otj_supervisors: hours line not found';
  end if;
  execute v_def;
end $$;
