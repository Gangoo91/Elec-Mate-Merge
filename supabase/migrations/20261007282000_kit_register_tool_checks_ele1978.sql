-- ELE-1978 — tools and calibration move out of buying into the kit register.
--
-- PAT / calibration history used to be a dated line appended to
-- employer_company_tools.notes. It becomes a real record per check, and the
-- tool's own "last / next due" columns follow the newest check (trigger), so
-- every existing reader (Worker Tools → My equipment, ELE-2008; expiry
-- feeds) keeps working unchanged.
--
-- employer_company_tools scopes the firm in `user_id` (not employer_id).

create table if not exists public.employer_tool_checks (
  id uuid primary key default gen_random_uuid(),
  employer_id uuid not null default public.my_default_employer_id()
    references public.profiles(id) on delete cascade,
  tool_id uuid not null references public.employer_company_tools(id) on delete cascade,
  check_type text not null check (check_type in ('pat', 'calibration')),
  checked_on date not null default ((now() at time zone 'Europe/London')::date),
  result text not null default 'pass' check (result in ('pass', 'fail')),
  next_due date,
  certificate_ref text check (certificate_ref is null or length(certificate_ref) <= 120),
  notes text check (notes is null or length(notes) <= 2000),
  recorded_by uuid default auth.uid() references public.profiles(id) on delete set null,
  recorded_by_name text,
  created_at timestamptz not null default now()
);

create index if not exists employer_tool_checks_tool_idx
  on public.employer_tool_checks (tool_id, checked_on desc);
create index if not exists employer_tool_checks_employer_idx
  on public.employer_tool_checks (employer_id);

alter table public.employer_tool_checks enable row level security;
revoke all on public.employer_tool_checks from anon;

create policy "Firm managers keep tool checks"
  on public.employer_tool_checks
  for all to authenticated
  using (employer_id in (select public.my_employer_scope()))
  with check (
    employer_id in (select public.my_employer_scope())
    and exists (
      select 1 from public.employer_company_tools t
       where t.id = tool_id and t.user_id = employer_id
    )
  );

-- The newest check drives the tool's due dates; a fail takes it out of use.
create or replace function public.trg_tool_check_apply()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if new.recorded_by_name is null then
    select nullif(btrim(full_name), '') into new.recorded_by_name
      from public.profiles where id = auth.uid();
  end if;
  return new;
end;
$$;

create or replace function public.trg_tool_check_after()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  -- Only when this is now the newest check of its kind.
  if exists (
    select 1 from public.employer_tool_checks c
     where c.tool_id = new.tool_id and c.check_type = new.check_type
       and c.id <> new.id and c.checked_on > new.checked_on
  ) then
    return new;
  end if;

  if new.check_type = 'pat' then
    update public.employer_company_tools
       set pat_date = new.checked_on,
           pat_due = case when new.result = 'pass' then new.next_due else pat_due end,
           status = case when new.result = 'fail' then 'Under Repair' else status end,
           updated_at = now()
     where id = new.tool_id;
  else
    update public.employer_company_tools
       set last_calibration = new.checked_on,
           next_calibration = case when new.result = 'pass' then new.next_due else next_calibration end,
           status = case when new.result = 'fail' then 'Under Repair' else status end,
           updated_at = now()
     where id = new.tool_id;
  end if;
  return new;
end;
$$;

drop trigger if exists tool_check_before on public.employer_tool_checks;
create trigger tool_check_before
  before insert on public.employer_tool_checks
  for each row execute function public.trg_tool_check_apply();

drop trigger if exists tool_check_after on public.employer_tool_checks;
create trigger tool_check_after
  after insert on public.employer_tool_checks
  for each row execute function public.trg_tool_check_after();

revoke all on function public.trg_tool_check_apply() from public, anon;
revoke all on function public.trg_tool_check_after() from public, anon;

comment on table public.employer_tool_checks is
  '[EMPLOYER HUB] Kit register: one row per PAT test or calibration of a company tool/instrument (result, next due, certificate ref). Scope: employer_id = the firm (= employer_company_tools.user_id); managers via my_employer_scope(). Used by: Kit register. Rule: the newest check updates the tool''s pat_* / *_calibration columns (trigger) — read due dates from the tool, history from here.';

comment on table public.employer_company_tools is
  '[EMPLOYER HUB → WORKER TOOLS] Kit register: company tools and test instruments with PAT/calibration due dates. Scope: user_id = the firm (owner profiles.id); managers via my_employer_scope(); assigned_to_employee_id → roster. Used by: Employer Hub Kit register (moved out of Procurement, ELE-1978), Worker Tools My equipment. History: employer_tool_checks. Rule: Assignment by employee id not wired yet (ELE-2008).';
