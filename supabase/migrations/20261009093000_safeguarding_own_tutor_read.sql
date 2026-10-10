-- ELE-1911: a learner's own tutor can read that learner's safeguarding notes.
--
-- Andrew decided (8 Oct 2026): "yes tutor should be able too". Until now a
-- note with visibility = 'safeguarding' was readable only by the college's
-- safeguarding leads (_safeguarding_reader). This adds ONE read policy for
-- the learner's own tutor: the tutor of their cohort, or the tutor named on
-- their assignment. Deliberately NOT learners.view_mine, which also covers
-- assessors and IQAs assigned to the learner. Writing and closing concerns
-- stay with the DSL route; nothing else changes.
--
-- Applied 10 Oct 2026 with Andrew's explicit permission ("do it all, i give you permission").

drop policy if exists "pastoral: own tutor reads safeguarding" on public.pastoral_notes;
create policy "pastoral: own tutor reads safeguarding"
  on public.pastoral_notes for select to authenticated
  using (
    visibility = 'safeguarding'
    and exists (
      select 1
        from public.college_students s
        join public.college_staff me
          on me.user_id = auth.uid() and me.archived_at is null and me.college_id = s.college_id
       where s.id = pastoral_notes.student_id
         and (
           exists (select 1 from public.college_cohorts c where c.id = s.cohort_id and c.tutor_id = me.id)
           or exists (select 1 from public.college_student_assignments a
                       where a.student_id = s.user_id and a.tutor_id = me.id)
         )
    )
  );
