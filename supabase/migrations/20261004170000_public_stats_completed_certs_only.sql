-- "certs issued" on the homepage counted drafts and auto-drafts (2,387 vs
-- 1,088 completed on 4 Oct 2026). Count completed certificates only.
create or replace function public.get_public_stats()
 returns table(profiles_count bigint, reports_count bigint, quotes_total numeric)
 language sql
 stable security definer
 set search_path to 'public'
as $function$
  select
    (select count(*)::bigint from public.profiles),
    (select count(*)::bigint from public.reports where status = 'completed' and deleted_at is null),
    (select coalesce(sum(total), 0)::numeric from public.quotes);
$function$;
