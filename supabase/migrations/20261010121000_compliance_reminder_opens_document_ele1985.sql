-- ELE-1985: a compliance-document renewal reminder (bell, push and the office
-- summary email, all built from employer_expiry_items) opens the exact
-- document, not just the register. Body-only change to one route string; the
-- signature and every other line are left as they are live, so this cannot
-- clobber anyone else's edits to the function.
do $$
declare
  d text;
  n int;
begin
  d := pg_get_functiondef('public.employer_expiry_items()'::regprocedure);
  select count(*) into n from regexp_matches(d, '''/employer\?section=compliance''', 'g');
  if n = 0 then
    raise notice 'employer_expiry_items: compliance route already specific';
    return;
  end if;
  if n <> 1 then
    raise exception 'employer_expiry_items: expected one compliance route, found %', n;
  end if;
  d := replace(d, '''/employer?section=compliance''',
               '''/employer?section=compliance&doc='' || d.id');
  execute d;
end $$;
