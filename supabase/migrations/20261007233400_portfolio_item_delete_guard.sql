-- ELE-1893 / ELE-1865: evidence that is part of the assessment record cannot
-- be deleted by the learner. Once an item has been sent for assessment, cited
-- in a decision, or signed for by a witness, deleting it would cascade away
-- the submission link and leave a decision pointing at nothing. The learner
-- adds to it or captures new evidence instead. Platform admins and the
-- service role (data erasure) are not blocked.
create or replace function public._portfolio_items_delete_guard()
returns trigger language plpgsql security definer set search_path to 'public' as $$
begin
  if auth.uid() is null or auth.role() = 'service_role' or public._is_platform_admin() then
    return old;
  end if;
  if exists (select 1 from public.portfolio_submission_items where portfolio_item_id = old.id)
     or exists (select 1 from public.portfolio_assessment_decisions
                 where learner_id = old.user_id and old.id = any (evidence_item_ids))
     or exists (select 1 from public.portfolio_witness_statements
                 where portfolio_item_id = old.id and status = 'signed') then
    raise exception 'this evidence is part of your assessment record and cannot be deleted'
      using errcode = '42501';
  end if;
  return old;
end; $$;
drop trigger if exists trg_portfolio_items_delete_guard on public.portfolio_items;
create trigger trg_portfolio_items_delete_guard before delete on public.portfolio_items
  for each row execute function public._portfolio_items_delete_guard();
