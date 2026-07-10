-- Quote-page lead flywheel hardening:
--  A. Notify the owner's bell when a quote-page enquiry lands (was silent).
--  B. Trim public input server-side in submit_lead_enquiry (defence-in-depth).
--  C. convert_lead is never public — remove the default PUBLIC EXECUTE grant.

-- A. New-lead notification -> employer_notifications (read by the owner's bell via user_id).
create or replace function public.notify_owner_new_lead()
 returns trigger
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
begin
  if NEW.source = 'Quote page' then
    insert into public.employer_notifications (user_id, type, title, message, action_url, metadata)
    values (
      NEW.user_id,
      'new_lead',
      'New quote request',
      coalesce(nullif(trim(NEW.name), ''), 'Someone') || ' asked for a quote'
        || case when NEW.notes is not null and length(trim(NEW.notes)) > 0
                then ': ' || left(trim(NEW.notes), 120) else '' end,
      '/employer?section=leads',
      jsonb_build_object('lead_id', NEW.id, 'source', NEW.source)
    );
  end if;
  return NEW;
end;
$function$;

drop trigger if exists trg_notify_owner_new_lead on public.employer_leads;
create trigger trg_notify_owner_new_lead
  after insert on public.employer_leads
  for each row execute function public.notify_owner_new_lead();

-- B. Trim public input server-side.
create or replace function public.submit_lead_enquiry(
  p_slug text, p_name text, p_email text, p_phone text, p_summary text
)
 returns boolean
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare v_user uuid;
begin
  if coalesce(trim(p_name), '') = '' then
    return false;
  end if;
  select user_id into v_user
  from company_profiles
  where lower(lead_page_slug) = lower(p_slug) and lead_page_enabled = true
  limit 1;
  if v_user is null then
    return false;
  end if;

  insert into public.employer_leads (user_id, name, email, phone, source, stage, notes)
  values (
    v_user,
    left(trim(p_name), 200),
    nullif(lower(trim(p_email)), ''),
    nullif(trim(p_phone), ''),
    'Quote page',
    'New',
    nullif(left(trim(p_summary), 4000), '')
  );
  return true;
end;
$function$;

-- C. convert_lead: the default EXECUTE grant is to PUBLIC (which anon inherits);
--    revoking from anon alone is a no-op. Remove PUBLIC, grant authenticated only.
revoke execute on function public.convert_lead(uuid) from public;
revoke execute on function public.convert_lead(uuid) from anon;
grant execute on function public.convert_lead(uuid) to authenticated;
