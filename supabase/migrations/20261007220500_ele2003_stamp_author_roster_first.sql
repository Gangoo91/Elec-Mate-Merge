-- ELE-2003 follow-up: a person can be BOTH a co-admin of the firm and on its
-- roster (supervisors, owner-operatives). Stamp author_employee_id whenever the
-- author has an active roster row at the job's firm, office or not, and apply
-- the "only your own uploads" photo rule to every signed-in author.

create or replace function public.stamp_job_comment_author()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_firm uuid;
  v_office boolean;
  v_emp record;
begin
  select j.user_id into v_firm from public.employer_jobs j where j.id = coalesce(new.job_id, old.job_id);
  v_office := v_uid is not null and v_firm in (select public.my_employer_scope());

  if coalesce(array_length(new.photos, 1), 0) > 12 then
    raise exception 'Up to 12 photos per note' using errcode = '22023';
  end if;

  if tg_op = 'INSERT' then
    new.edited_at := null;
    -- Server-side writers (cron, service role) keep what they were given.
    if v_uid is null then
      return new;
    end if;
    new.author_user_id := v_uid;
    select e.id, e.name into v_emp
      from public.employer_employees e
     where e.employer_id = v_firm
       and e.user_id = v_uid
       and lower(coalesce(e.status, '')) = 'active'
     order by e.created_at desc
     limit 1;
    new.author_employee_id := v_emp.id;
    if not v_office and v_emp.id is not null and nullif(trim(v_emp.name), '') is not null then
      new.author_name := v_emp.name;
    end if;
    if exists (select 1 from unnest(coalesce(new.photos, '{}')) p
                where p not like v_uid::text || '/%') then
      raise exception 'You can only attach photos you uploaded' using errcode = '42501';
    end if;
    return new;
  end if;

  -- UPDATE: authorship and timestamps never change.
  new.id := old.id;
  new.created_at := old.created_at;
  new.author_user_id := old.author_user_id;
  new.author_employee_id := old.author_employee_id;

  if v_uid is not null then
    if not v_office then
      -- A worker may change the words and the photos, nothing else.
      new.job_id := old.job_id;
      new.task_id := old.task_id;
      new.comment_type := old.comment_type;
      new.author_name := old.author_name;
    end if;
    if exists (select 1 from unnest(coalesce(new.photos, '{}')) p
                where p not like v_uid::text || '/%'
                  and not (p = any (coalesce(old.photos, '{}')))) then
      raise exception 'You can only attach photos you uploaded' using errcode = '42501';
    end if;
  end if;

  if new.content is distinct from old.content or new.photos is distinct from old.photos then
    new.edited_at := now();
  else
    new.edited_at := old.edited_at;
  end if;
  return new;
end;
$$;

revoke all on function public.stamp_job_comment_author() from public, anon, authenticated;
