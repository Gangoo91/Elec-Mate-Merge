-- Portfolio 2.0 backbone, step 1 (ELE-1860): learners can no longer award
-- themselves verification, grades or sign-offs. Approved by Andrew 6 Oct
-- ("do what you need to do ... work fully end to end in production").
--
-- Each table's RLS let the owner UPDATE every column:
--   portfolio_items          grade, is_supervisor_verified, status 'reviewed'
--   supervisor_verifications signature_data, supervisor_name, verified_at (forged supervisor sign-off)
--   user_ksb_progress        status 'verified', verified_by / verified_at
--   epa_gateway_checklist    gateway_passed, provider/employer declarations, hours verified
-- Rule: a learner's DIRECT client write (current_user authenticated) may not set
-- or change those fields. Staff, service role (supervisor page, edge functions)
-- and SECURITY DEFINER code are unaffected. Platform admins bypass.

-- Is the caller staff (any active role) at the learner's college, or assigned to them?
create or replace function public._is_staff_for(p_learner uuid)
returns boolean language sql stable security definer set search_path to 'public' as $$
  select public.is_staff_for_learner_user(p_learner)
      or exists (select 1 from public.college_student_assignments a
                  where a.student_id = p_learner
                    and auth.uid() in (a.tutor_id, a.assessor_id, a.iqa_id));
$$;

create or replace function public._learner_direct_write(p_owner uuid)
returns boolean language sql stable security definer set search_path to 'public' as $$
  select current_setting('role', true) is distinct from 'service_role'
     and p_owner = auth.uid()
     and not public._is_platform_admin()
     and not public._is_staff_for(p_owner);
$$;

-- portfolio_items ------------------------------------------------------------
create or replace function public._portfolio_items_owner_guard()
returns trigger language plpgsql security invoker set search_path to 'public' as $$
begin
  if current_user not in ('authenticated', 'anon') or not public._learner_direct_write(new.user_id) then
    return new;
  end if;
  if tg_op = 'INSERT' then
    if new.grade is not null or coalesce(new.is_supervisor_verified, false)
       or coalesce(new.status, 'draft') in ('reviewed', 'assessed', 'signed_off', 'verified') then
      raise exception 'new evidence starts unassessed' using errcode = '42501';
    end if;
    return new;
  end if;
  if new.grade is distinct from old.grade
  or new.is_supervisor_verified is distinct from old.is_supervisor_verified
  or (new.status is distinct from old.status
      and new.status in ('reviewed', 'assessed', 'signed_off', 'verified')) then
    raise exception 'only an assessor or the supervisor can set that' using errcode = '42501';
  end if;
  return new;
end; $$;
drop trigger if exists trg_portfolio_items_owner_guard on public.portfolio_items;
create trigger trg_portfolio_items_owner_guard
  before insert or update on public.portfolio_items
  for each row execute function public._portfolio_items_owner_guard();

-- supervisor_verifications ---------------------------------------------------
create or replace function public._supervisor_verifications_owner_guard()
returns trigger language plpgsql security invoker set search_path to 'public' as $$
begin
  if current_user not in ('authenticated', 'anon') or not public._learner_direct_write(new.requested_by) then
    return new;
  end if;
  if tg_op = 'INSERT' then
    if new.signature_data is not null or new.verified_at is not null
       or new.verification_hash is not null or coalesce(new.confirmation_checked, false)
       or new.supervisor_name is not null or new.supervisor_company is not null
       or new.feedback_text is not null or new.voice_note_url is not null then
      raise exception 'only the supervisor can complete a verification' using errcode = '42501';
    end if;
    return new;
  end if;
  if new.signature_data is distinct from old.signature_data
  or new.verified_at is distinct from old.verified_at
  or new.verification_hash is distinct from old.verification_hash
  or new.confirmation_checked is distinct from old.confirmation_checked
  or new.supervisor_name is distinct from old.supervisor_name
  or new.supervisor_company is distinct from old.supervisor_company
  or new.feedback_text is distinct from old.feedback_text
  or new.voice_note_url is distinct from old.voice_note_url
  or new.evidence_hash is distinct from old.evidence_hash
  or new.evidence_snapshot is distinct from old.evidence_snapshot
  or new.geo_latitude is distinct from old.geo_latitude
  or new.geo_longitude is distinct from old.geo_longitude
  or new.client_ip is distinct from old.client_ip
  or (new.is_active and not coalesce(old.is_active, false)) then
    raise exception 'you can only cancel a verification request' using errcode = '42501';
  end if;
  return new;
end; $$;
drop trigger if exists trg_supervisor_verifications_owner_guard on public.supervisor_verifications;
create trigger trg_supervisor_verifications_owner_guard
  before insert or update on public.supervisor_verifications
  for each row execute function public._supervisor_verifications_owner_guard();

-- user_ksb_progress ----------------------------------------------------------
create or replace function public._ksb_progress_owner_guard()
returns trigger language plpgsql security invoker set search_path to 'public' as $$
begin
  if current_user not in ('authenticated', 'anon') or not public._learner_direct_write(new.user_id) then
    return new;
  end if;
  if (tg_op = 'INSERT' and (new.status = 'verified' or new.verified_by is not null or new.verified_at is not null))
  or (tg_op = 'UPDATE' and (
        (new.status is distinct from old.status and new.status = 'verified')
     or new.verified_by is distinct from old.verified_by
     or new.verified_at is distinct from old.verified_at)) then
    raise exception 'only your assessor can verify a KSB' using errcode = '42501';
  end if;
  return new;
end; $$;
drop trigger if exists trg_ksb_progress_owner_guard on public.user_ksb_progress;
create trigger trg_ksb_progress_owner_guard
  before insert or update on public.user_ksb_progress
  for each row execute function public._ksb_progress_owner_guard();

-- epa_gateway_checklist ------------------------------------------------------
create or replace function public._gateway_owner_guard()
returns trigger language plpgsql security invoker set search_path to 'public' as $$
declare
  v_locked text[] := array[
    'portfolio_signed_off','portfolio_signed_off_at','portfolio_signed_off_by',
    'ojt_hours_required','ojt_hours_verified','ojt_hours_verified_at','ojt_hours_verified_by',
    'english_level2_achieved','maths_level2_achieved',
    'employer_satisfied','employer_declaration_at','employer_id','employer_comments',
    'provider_satisfied','provider_declaration_at','provider_id','provider_name','provider_comments',
    'gateway_meeting_held','gateway_meeting_date','gateway_meeting_attendees','gateway_meeting_notes',
    'gateway_meeting_outcome','gateway_passed','gateway_passed_at','gateway_passed_by',
    'epa_eligible','epa_booked','epa_booking_date','epa_provider','epa_reference'];
  v_new jsonb;
  v_old jsonb;
  k text;
begin
  if current_user not in ('authenticated', 'anon') or not public._learner_direct_write(new.user_id) then
    return new;
  end if;
  v_new := to_jsonb(new);
  v_old := case when tg_op = 'UPDATE' then to_jsonb(old) else '{}'::jsonb end;
  foreach k in array v_locked loop
    if tg_op = 'INSERT' then
      if k <> 'ojt_hours_required' and v_new->k is not null and v_new->>k is not null and v_new->>k not in ('false', '0') then
        raise exception 'gateway sign-offs are made by your provider and employer (%)', k using errcode = '42501';
      end if;
    elsif (v_new->k) is distinct from (v_old->k) then
      raise exception 'gateway sign-offs are made by your provider and employer (%)', k using errcode = '42501';
    end if;
  end loop;
  return new;
end; $$;
drop trigger if exists trg_gateway_owner_guard on public.epa_gateway_checklist;
create trigger trg_gateway_owner_guard
  before insert or update on public.epa_gateway_checklist
  for each row execute function public._gateway_owner_guard();
