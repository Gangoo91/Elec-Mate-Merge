-- College staff whose status was saved as lower-case 'active' (4 of 9 rows,
-- created by SQL rather than the app, which writes 'Active') could not read
-- IQA findings, standardisation meetings or the EQA checklist: those three
-- policies compared status = 'Active' exactly. Normalise the rows, and make
-- the three policies case-insensitive so it cannot recur.

update public.college_staff set status = 'Active' where status = 'active';

drop policy if exists "College staff read standardisation meetings" on public.college_standardisation_meetings;
create policy "College staff read standardisation meetings" on public.college_standardisation_meetings
  for select to authenticated
  using (college_id in (select cs.college_id from public.college_staff cs
                         where cs.user_id = auth.uid() and lower(cs.status) = 'active'));

drop policy if exists "College staff read IQA findings" on public.college_iqa_findings;
create policy "College staff read IQA findings" on public.college_iqa_findings
  for select to authenticated
  using (college_id in (select cs.college_id from public.college_staff cs
                         where cs.user_id = auth.uid() and lower(cs.status) = 'active'));

drop policy if exists "College staff read EQA checklist" on public.college_iqa_eqa_checklist_items;
create policy "College staff read EQA checklist" on public.college_iqa_eqa_checklist_items
  for select to authenticated
  using (college_id in (select cs.college_id from public.college_staff cs
                         where cs.user_id = auth.uid() and lower(cs.status) = 'active'));
