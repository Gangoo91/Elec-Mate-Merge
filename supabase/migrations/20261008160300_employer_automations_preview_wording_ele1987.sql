-- ELE-1987 follow-up: plainer "nothing to do" line for the draft-invoice preview.
do $$
declare v_def text;
begin
  v_def := pg_get_functiondef('public.get_employer_automations()'::regprocedure);
  v_def := replace(v_def, 'Every job completed in the last 30 days has an invoice.',
                          'No completed jobs waiting for an invoice right now.');
  execute v_def;
end $$;
