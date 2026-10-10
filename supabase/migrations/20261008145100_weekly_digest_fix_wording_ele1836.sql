-- ELE-1836 review: the Sunday email calls the coming week "this week", so the
-- all-days-empty fix line says "this week's jobs" (was "next week's").
-- Already folded into 20261008145000 for a fresh replay; this patches a
-- database that ran 145000 before the wording was changed. No-op otherwise.
do $$
declare d text := pg_get_functiondef('public._employer_weekly_digest(uuid, date)'::regprocedure);
begin
  if position('next week''''s jobs yet' in d) > 0 then
    execute replace(d, 'next week''''s jobs yet', 'this week''''s jobs yet');
  end if;
end $$;
revoke all on function public._employer_weekly_digest(uuid, date) from public, anon, authenticated;
