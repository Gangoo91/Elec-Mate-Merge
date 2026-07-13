-- Committed material cost per job: total of POs ordered but not yet booked as
-- actual (Sent/Confirmed/Part-received/Received). Powers the job's forecast
-- margin (CVR) — spend shows the moment it's committed, not when invoiced.
create or replace function public.employer_committed_materials()
 returns table(job_id uuid, committed numeric)
 language sql
 stable
 security definer
 set search_path to 'public'
as $function$
  select job_id, coalesce(sum(total), 0)::numeric as committed
  from public.employer_material_orders
  where employer_id = auth.uid()
    and job_id is not null
    and status in ('Sent', 'Confirmed', 'Part-received', 'Received')
  group by job_id;
$function$;

revoke execute on function public.employer_committed_materials() from public, anon;
grant execute on function public.employer_committed_materials() to authenticated;
