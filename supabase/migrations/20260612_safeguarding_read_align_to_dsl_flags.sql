-- ============================================================================
-- Fix: safeguarding pastoral notes were readable by NOBODY.
--
-- The "pastoral: safeguarding leads read" policy gated on
--   role IN ('safeguarding_lead','principal','senior_leader')
-- but college_staff.role's CHECK constraint only allows
--   tutor/head_of_department/support/admin/assessor/iqa/eqa
-- so those roles can never exist. Meanwhile DSLs are designated by the
-- is_dsl / is_deputy_dsl flags (the canonical model used by the notification
-- triggers, the Single Central Record view, useComplianceLeads and the staff
-- compliance drawer). So a safeguarding concern routed an alert to a DSL who
-- then couldn't READ it.
--
-- Align the read policy to the is_dsl/is_deputy_dsl flags. The dead role-based
-- branch is kept as harmless forward-compat. Still strictly DSL-only and
-- same-college (the st/s college join prevents any cross-college read) — this
-- only GRANTS read to designated leads, never widens beyond.
--
-- Rollback: restore the original qual (is_dsl/is_deputy_dsl branch removed).
-- ============================================================================

drop policy if exists "pastoral: safeguarding leads read" on public.pastoral_notes;

create policy "pastoral: safeguarding leads read"
  on public.pastoral_notes
  for select
  using (
    visibility = 'safeguarding'
    and exists (
      select 1
      from college_staff st
      join college_students s on s.college_id = st.college_id
      where s.id = pastoral_notes.student_id
        and st.user_id = auth.uid()
        and (
          st.is_dsl
          or st.is_deputy_dsl
          or st.role = any (array['safeguarding_lead','principal','senior_leader'])
        )
    )
  );
