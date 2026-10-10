-- ELE-2071 follow-up: two captures made in the same transaction (same
-- created_at) flagged EACH OTHER as the duplicate. The earlier one now wins on
-- a tie by id. Already in 20261010202000 for a fresh database.
do $$
declare d text;
begin
  d := pg_get_functiondef('public.receipt_flag_duplicates(uuid)'::regprocedure);
  d := replace(d, 'x.created_at <= c.created_at', '(x.created_at < c.created_at or (x.created_at = c.created_at and x.id < c.id))');
  execute d;
end $$;
