-- Review fix #1: nothing wrote portfolio_submission_items, so the "submitted"
-- state (and "With assessor") could never appear. A learner submits a unit
-- (portfolio_submissions.category_id); when a submission is created or
-- (re)submitted, record every piece of that learner's evidence filed under the
-- unit. Covers every submit path, including staff tooling.
create or replace function public._submission_items_from_category()
returns trigger language plpgsql security definer set search_path to 'public' as $$
begin
  if new.category_id is null
     or coalesce(new.status, 'submitted') not in ('submitted', 'resubmitted') then
    return new;
  end if;
  if tg_op = 'UPDATE' and new.status is not distinct from old.status
     and new.submitted_at is not distinct from old.submitted_at then
    return new;
  end if;
  insert into public.portfolio_submission_items (submission_id, portfolio_item_id)
  select new.id, pi.id
    from public.portfolio_items pi
   where pi.user_id = new.user_id
     and pi.qualification_category_id = new.category_id
  on conflict do nothing;
  return new;
end; $$;

drop trigger if exists trg_submission_items_from_category on public.portfolio_submissions;
create trigger trg_submission_items_from_category
  after insert or update of status, submitted_at on public.portfolio_submissions
  for each row execute function public._submission_items_from_category();

-- Backfill open submissions.
insert into public.portfolio_submission_items (submission_id, portfolio_item_id)
select ps.id, pi.id
  from public.portfolio_submissions ps
  join public.portfolio_items pi
    on pi.user_id = ps.user_id and pi.qualification_category_id = ps.category_id
 where coalesce(ps.status, 'submitted') in ('submitted', 'resubmitted', 'under_review')
on conflict do nothing;
