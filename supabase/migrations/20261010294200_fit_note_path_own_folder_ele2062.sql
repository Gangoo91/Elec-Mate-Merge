-- Review fix L11 (ELE-2062), 10 Oct 2026.
--
-- "Owner and admins manage sickness records" has no rule on fit_note_path, and
-- "Fit notes: read own or firm" lets the firm read whatever file a record
-- points at. So an admin could save any path in the fit-notes bucket on a
-- record (another firm's worker's fit note) and then read that file.
--
-- Rule: a fit_note_path saved on a sickness record must be in the folder of
-- the worker it is about (their user id; attach_my_fit_note), or of the firm
-- or someone on its team (the owner, an admin or the office uploads to their
-- own folder; sickness_office_save already requires auth.uid()). Checked only
-- when the path, the worker or the firm is set or changed.
--
-- Additive: one new BEFORE trigger (the table is new today and not in HEAD
-- or build 49). Reuses _firm_folder_ok (20261010294100). Proved with
-- rolled-back writes as owner, admin, the worker, an outsider, anon and the
-- service role before applying.

create or replace function public.tg_sickness_fit_note_path_guard()
returns trigger
language plpgsql
security definer
set search_path = public
as $fn$
declare
  v_p text := nullif(btrim(coalesce(new.fit_note_path, '')), '');
  v_worker uuid;
begin
  if v_p is null then
    return new;
  end if;
  if tg_op = 'UPDATE' and new.fit_note_path is not distinct from old.fit_note_path
     and new.employee_id is not distinct from old.employee_id
     and new.employer_id is not distinct from old.employer_id then
    return new;
  end if;
  select e.user_id into v_worker
    from public.employer_employees e
   where e.id = new.employee_id and e.employer_id = new.employer_id;
  if position('..' in v_p) = 0 and left(v_p, 1) <> '/' and split_part(v_p, '/', 2) <> ''
     and ((v_worker is not null and lower(split_part(v_p, '/', 1)) = v_worker::text)
          or public._firm_folder_ok(new.employer_id, v_p)) then
    return new;
  end if;
  raise exception 'file_outside_folder' using errcode = '42501',
    hint = 'The fit note must be one the worker or the firm uploaded.';
end;
$fn$;
revoke all on function public.tg_sickness_fit_note_path_guard() from public, anon, authenticated;

drop trigger if exists sickness_fit_note_path_guard on public.employer_sickness_records;
create trigger sickness_fit_note_path_guard
  before insert or update of fit_note_path, employee_id, employer_id on public.employer_sickness_records
  for each row execute function public.tg_sickness_fit_note_path_guard();
