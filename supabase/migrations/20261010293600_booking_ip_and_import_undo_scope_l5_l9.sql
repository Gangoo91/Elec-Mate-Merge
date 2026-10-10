-- L5 + L9 (review findings).
--
-- L5: _booking_ip_hash took the first x-forwarded-for entry before
-- cf-connecting-ip. The first XFF entry is whatever the caller sent (proxies
-- append, they do not replace), so a script could pick a new "IP" per request
-- and slip past the per-IP booking rate limit. cf-connecting-ip is set by
-- Cloudflare in front of the Supabase API and cannot be set by the caller; it
-- now comes first, then x-real-ip, then XFF as a last resort.
--
-- L9: undo_firm_import deleted the import's quotes and their usage events by
-- id alone. Both deletes (and the job usage-event delete) now also require
-- the batch's firm: quotes.user_id = b.employer_id, employer_usage_events
-- .employer_id = b.employer_id.
--
-- Signatures unchanged. undo_firm_import is patched by exact text
-- replacement (checked); neither function is called by HEAD or build 49.

create or replace function public._booking_ip_hash()
returns text
language plpgsql
stable security definer
set search_path to 'public'
as $function$
declare
  h json;
  ip text;
begin
  begin
    h := current_setting('request.headers', true)::json;
  exception when others then
    h := null;
  end;
  ip := coalesce(
    nullif(btrim(h->>'cf-connecting-ip'), ''),
    nullif(btrim(h->>'x-real-ip'), ''),
    nullif(trim(split_part(h->>'x-forwarded-for', ',', 1)), ''),
    'unknown');
  return public._booking_hash('ip:' || ip);
end;
$function$;
revoke all on function public._booking_ip_hash() from public, anon, authenticated;

do $mig$
declare d text; n text;
begin
  d := pg_get_functiondef('public.undo_firm_import(uuid,integer)'::regprocedure);
  if position('delete from public.quotes where id = r.row_id and user_id = b.employer_id' in d) > 0 then return; end if;
  n := replace(d,
$a$          delete from public.employer_usage_events where ref_id = r.row_id;
          delete from public.quotes where id = r.row_id;
$a$,
$a$          delete from public.employer_usage_events where ref_id = r.row_id and employer_id = b.employer_id;
          delete from public.quotes where id = r.row_id and user_id = b.employer_id;
$a$);
  n := replace(n,
$a$          delete from public.employer_usage_events where ref_id = r.row_id;
          delete from public.employer_jobs where id = r.row_id and user_id = b.employer_id;
$a$,
$a$          delete from public.employer_usage_events where ref_id = r.row_id and employer_id = b.employer_id;
          delete from public.employer_jobs where id = r.row_id and user_id = b.employer_id;
$a$);
  if position('delete from public.quotes where id = r.row_id and user_id = b.employer_id' in n) = 0
     or position('where ref_id = r.row_id;' in n) > 0 then
    raise exception 'undo_firm_import patch did not apply';
  end if;
  execute n;
end
$mig$;
