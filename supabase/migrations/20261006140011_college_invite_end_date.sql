-- A learner who joins by code had no expected_end_date, so the off-the-job
-- forecast and the apprentice compliance card said "programme dates aren't set".
-- Take start/end from the cohort when the roll row has none.
create or replace function public._college_fill_dates_from_cohort()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $$
declare v_start date; v_end date;
begin
  if new.cohort_id is not null and (new.start_date is null or new.expected_end_date is null) then
    select start_date, end_date into v_start, v_end from college_cohorts where id = new.cohort_id;
    if new.start_date is null then new.start_date := coalesce(v_start, current_date); end if;
    if new.expected_end_date is null then new.expected_end_date := v_end; end if;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_college_fill_dates_from_cohort on public.college_students;
create trigger trg_college_fill_dates_from_cohort
  before insert or update of cohort_id on public.college_students
  for each row execute function public._college_fill_dates_from_cohort();
