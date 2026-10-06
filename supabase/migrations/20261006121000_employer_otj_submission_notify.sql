-- ELE-1955 / ELE-1988: the employer was never told when an apprentice logged
-- off-the-job hours. college_otj_entries only had notify_tutor_otj, so the
-- Employer Hub attestation inbox (built 6 Oct) filled silently.
--
-- Fires for apprentice-submitted entries that are pending, on insert and when
-- a sent-back entry is resubmitted (rejected → pending). Notifies the firm(s)
-- whose ACTIVE roster holds this apprentice (employer_employees.user_id =
-- college_otj_entries.student_id, the only employer↔college bridge).
-- Additive: does not touch the tutor trigger or any college behaviour, and
-- only the title, hours and date leave the college table — no notes,
-- rationale or pastoral data.

create or replace function public.notify_employer_otj_submission()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  r record;
  v_name text;
  v_hours text;
begin
  if coalesce(NEW.source_kind, '') <> 'apprentice_submitted'
     or coalesce(NEW.verification_status, '') <> 'pending' then
    return NEW;
  end if;

  if TG_OP = 'UPDATE' and coalesce(OLD.verification_status, '') = 'pending' then
    return NEW; -- already pending; nothing new to tell the employer
  end if;

  v_hours := trim(to_char(coalesce(NEW.duration_minutes, 0) / 60.0, 'FM990.0'));

  for r in
    select distinct e.employer_id, e.name
      from public.employer_employees e
     where e.user_id = NEW.student_id
       and e.employer_id is not null
       and e.status = 'Active'
  loop
    v_name := split_part(coalesce(r.name, 'Your apprentice'), ' ', 1);
    perform public.notify_employer_bell(
      r.employer_id,
      'apprentice_hours_submitted',
      case when TG_OP = 'UPDATE'
           then v_name || ' resubmitted training hours'
           else v_name || ' logged ' || v_hours || ' training hours' end,
      coalesce(NEW.title, 'Off-the-job training') || ' · ' ||
        to_char(NEW.activity_date, 'DD Mon') || ' · tap to attest',
      jsonb_build_object(
        'route', '/employer?section=apprentices&entry=' || NEW.id,
        'entry_id', NEW.id
      )
    );
  end loop;

  return NEW;
exception when others then
  raise warning '[notify_employer_otj_submission] %: %', NEW.id, sqlerrm;
  return NEW;
end;
$$;

drop trigger if exists trg_notify_employer_otj_submission on public.college_otj_entries;
create trigger trg_notify_employer_otj_submission
  after insert or update of verification_status on public.college_otj_entries
  for each row execute function public.notify_employer_otj_submission();

-- Registered so notify_employer_bell also sends the central bell + push.
insert into public.notification_types (type, category, push, importance)
values ('apprentice_hours_submitted', 'tasks_projects', true, 1)
on conflict (type) do nothing;
