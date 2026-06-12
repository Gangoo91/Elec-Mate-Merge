-- Surface attendance live to the learner (MyAttendanceCard subscribes to it).
-- Low-write table; replica identity full so UPDATE/DELETE events carry the
-- student_id needed for the per-learner filter.
alter table public.college_attendance replica identity full;

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and tablename = 'college_attendance'
  ) then
    alter publication supabase_realtime add table public.college_attendance;
  end if;
end $$;

-- Rollback:
--   alter publication supabase_realtime drop table public.college_attendance;
--   alter table public.college_attendance replica identity default;
