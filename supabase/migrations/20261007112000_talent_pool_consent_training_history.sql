-- ELE-1958 follow-up (review of 110000). Two "Employers view hireable …" read
-- rules were missed: Elec-ID training and elec_id_work_history still let any
-- employer-role account read everyone who hadn't opted OUT. Same consent rule
-- as the other five: only people who opted in, applied to the firm, or are in
-- a conversation with it (employer_can_view_elec_id).
drop policy if exists "Employers view hireable profile training" on public.employer_elec_id_training;
create policy "Employers view hireable profile training" on public.employer_elec_id_training
  for select to authenticated using (public.employer_can_view_elec_id(profile_id));

drop policy if exists "Employers view hireable profile entries" on public.elec_id_work_history;
create policy "Employers view hireable profile entries" on public.elec_id_work_history
  for select to authenticated using (public.employer_can_view_elec_id(profile_id));
