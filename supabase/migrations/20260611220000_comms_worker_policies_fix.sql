-- ============================================================================
-- Slice-5 audit fix — team messages actually reach workers
--
-- The worker-side policies compared auth.uid() to employer_employees.id
-- (the id-mapping trap): workers could never see communications targeted at
-- them, never read their recipient rows, and had NO update path for
-- read/acknowledge stamps. Rekeyed via my_employee_ids().
-- ============================================================================

drop policy "Users can view relevant communications" on public.employer_communications;
create policy "Users can view relevant communications"
  on public.employer_communications
  for select to authenticated
  using (
    sender_id = (select auth.uid())
    or exists (
      select 1 from public.my_employee_ids() m
      where m = any (target_employee_ids)
    )
    or (
      target_audience = 'all'
      and exists (
        select 1 from employer_employees ee
        where ee.employer_id = employer_communications.sender_id
          and ee.user_id = (select auth.uid())
      )
    )
  );

drop policy "Users can view relevant recipient records" on public.employer_communication_recipients;
create policy "Users can view relevant recipient records"
  on public.employer_communication_recipients
  for select to authenticated
  using (
    employee_id in (select public.my_employee_ids())
    or exists (
      select 1 from employer_communications ec
      where ec.id = employer_communication_recipients.communication_id
        and ec.sender_id = (select auth.uid())
    )
  );

create policy "Worker updates own recipient row"
  on public.employer_communication_recipients
  for update to authenticated
  using (employee_id in (select public.my_employee_ids()))
  with check (employee_id in (select public.my_employee_ids()));
