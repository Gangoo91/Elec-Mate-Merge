-- ELE-2068 follow-up: the job feed line ended "…: All done Signed off by …"
-- (no full stop after the worker's note). Same function, one expression.
-- Already in 20261010201000 for a fresh database; this patches the live one.
do $$
declare d text;
begin
  d := pg_get_functiondef('public.complete_job_on_site(uuid, uuid, jsonb)'::regprocedure);
  if position($x$coalesce(': ' || v_note, '.')$x$ in d) > 0 then
    d := replace(d, $x$coalesce(': ' || v_note, '.')$x$, $x$coalesce(': ' || rtrim(v_note, '. ') || '.', '.')$x$);
    execute d;
  end if;
end $$;
