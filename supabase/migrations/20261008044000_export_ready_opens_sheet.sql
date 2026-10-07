-- Pack-ready alert for staff opens the export sheet on Student 360 (#export / #export-gateway), not the portfolio list.
create or replace function public.tg_notify_export_ready()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_learner_name text;
  v_kind text := case new.kind when 'gateway_pack' then 'gateway pack' else 'evidence pack' end;
begin
  if new.status <> 'ready' or old.status = 'ready' or new.requested_by is null then
    return new;
  end if;
  if new.requested_by = new.learner_id then
    perform public.notify_user(new.requested_by, 'export_ready',
      'Your ' || v_kind || ' is ready',
      'Open it to download the PDF and the files.',
      jsonb_build_object('route', '/apprentice/hub?export=1', 'ref_id', new.id::text, 'export_id', new.id));
  else
    select name into v_learner_name from college_students where id = new.college_student_id;
    perform public.notify_user(new.requested_by, 'export_ready',
      initcap(v_kind) || ' ready' || coalesce(' for ' || v_learner_name, ''),
      'Open the learner''s portfolio to download it.',
      jsonb_build_object('route',
        case when new.college_student_id is not null
             then '/college?section=student360&studentId=' || new.college_student_id || case when new.kind = 'gateway_pack' then '#export-gateway' else '#export' end
             else '/college' end,
        'ref_id', new.id::text, 'export_id', new.id));
  end if;
  return new;
exception when others then
  raise warning '[tg_notify_export_ready] %: %', new.id, sqlerrm;
  return new;
end;
$function$;
