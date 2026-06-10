-- ============================================================================
-- QS review — "QS approval required before issue" gate (per-company setting)
--
-- Rollback: drop trigger trg_enforce_qs_issue_gate on reports;
--           drop function enforce_qs_issue_gate();
--           (column can stay — inert at default false)
-- ============================================================================

alter table public.company_profiles
  add column if not exists qs_approval_required boolean not null default false;

-- Surface the real gate setting to electricians (was hardcoded false)
create or replace function public.get_my_qs_team_context()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_member record;
  v_company_name text;
  v_gate boolean;
  v_is_qs boolean;
begin
  select employer_id into v_member
  from public.employer_employees
  where user_id = auth.uid()
    and employer_id is not null
    and status ilike 'active'
  order by updated_at desc
  limit 1;

  if v_member.employer_id is null then
    return jsonb_build_object('is_team_member', false);
  end if;

  select company_name, qs_approval_required into v_company_name, v_gate
  from public.company_profiles
  where user_id = v_member.employer_id
  limit 1;

  select exists (
    select 1 from public.employer_employees
    where user_id = auth.uid()
      and employer_id = v_member.employer_id
      and team_role ilike 'qs'
      and status ilike 'active'
  ) into v_is_qs;

  return jsonb_build_object(
    'is_team_member', true,
    'employer_id', v_member.employer_id,
    'company_name', v_company_name,
    'am_i_qs', v_is_qs,
    'qs_approval_required', coalesce(v_gate, false)
  );
end;
$$;

-- Server-side backstop: when the owner's employer requires QS approval, a
-- PDF cannot be issued (pdf_url / pdf_generated_at / locked_at written)
-- unless the LATEST review for the report is approved. Cheap fast-path:
-- ordinary autosave updates never touch these columns.
create or replace function public.enforce_qs_issue_gate()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_employer_id uuid;
  v_gate boolean;
  v_latest_status text;
begin
  if new.pdf_url is not distinct from old.pdf_url
     and new.pdf_generated_at is not distinct from old.pdf_generated_at
     and new.locked_at is not distinct from old.locked_at then
    return new;
  end if;

  if new.report_type not in ('eicr', 'eic', 'minor-works') then
    return new;
  end if;

  select employer_id into v_employer_id
  from public.employer_employees
  where user_id = new.user_id
    and employer_id is not null
    and status ilike 'active'
  order by updated_at desc
  limit 1;

  if v_employer_id is null then
    return new;
  end if;

  select qs_approval_required into v_gate
  from public.company_profiles
  where user_id = v_employer_id
  limit 1;

  if not coalesce(v_gate, false) then
    return new;
  end if;

  select status into v_latest_status
  from public.report_qs_reviews
  where report_uuid = new.id
  order by created_at desc
  limit 1;

  if v_latest_status is distinct from 'approved' then
    raise exception 'QS_APPROVAL_REQUIRED';
  end if;

  return new;
end;
$$;

drop trigger if exists trg_enforce_qs_issue_gate on public.reports;
create trigger trg_enforce_qs_issue_gate
  before update on public.reports
  for each row
  execute function public.enforce_qs_issue_gate();

-- Live updates for QS review status (electrician panel + employer queue).
-- New tables are not added to the realtime publication automatically.
alter publication supabase_realtime add table public.report_qs_reviews;
