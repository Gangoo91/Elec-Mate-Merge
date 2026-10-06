-- Review finding #5 (6 Oct). A firm quote raised from an Employer Hub job
-- (quotes.employer_job_id) already has its job. Approving it fired
-- handle_quote_acceptance() and created a second, Electrical Hub project.
create or replace function public.handle_quote_acceptance()
returns trigger
language plpgsql
security definer
set search_path to ''
as $function$
begin
  if new.acceptance_status in ('accepted', 'accepted_pending_deposit')
     and (old.acceptance_status is null
          or old.acceptance_status not in ('accepted', 'accepted_pending_deposit'))
     and new.project_id is null
     and new.employer_job_id is null
     and coalesce(new.invoice_raised, false) = false then
    begin
      new.project_id := public.create_project_from_quote(new);
      update public.invoices set project_id = new.project_id
        where quote_id = new.id and project_id is null;
      update public.site_visits set project_id = new.project_id
        where quote_id = new.id and project_id is null;
      update public.quotes set project_id = new.project_id
        where parent_quote_id = new.id and project_id is null;
    exception when others then
      raise warning 'quote acceptance job auto-create failed for quote %: %', new.id, sqlerrm;
      new.project_id := null;
    end;
  end if;
  return new;
end $function$;
