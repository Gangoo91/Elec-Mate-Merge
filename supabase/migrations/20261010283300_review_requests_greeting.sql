-- Gap #9: greet "Mrs Ada Test" as "Mrs Test", not "Mrs Ada".
create or replace function public._review_first_name(p_name text)
returns text language plpgsql immutable set search_path to 'public' as $$
declare
  v text := btrim(regexp_replace(regexp_replace(coalesce(p_name, ''), '\(.*?\)', '', 'g'), '\s+', ' ', 'g'));
  parts text[];
begin
  if v = '' then return null; end if;
  parts := string_to_array(v, ' ');
  if v ~* '^(mr|mrs|ms|miss|dr|mx)\.?\s+\S' then
    return parts[1] || ' ' || parts[array_length(parts, 1)];
  end if;
  return parts[1];
end $$;
