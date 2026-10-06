-- EPA gateway: record that Level 2 English and maths are not required.
-- Applied 6 Oct 2026 with Andrew's approval (EPA readiness rebuild).
--
-- Since 11 Feb 2025 (GOV.UK; funding rules 2025–26) the employer decides
-- whether an apprentice who was 19 or over when they started needs a level 2
-- English and maths qualification. There was nowhere to record "not required",
-- so those learners could never complete their gateway checklist (and their
-- readiness topped out below 100).
--
-- The learner-side guard on this table (trg_gateway_owner_guard, College Hub,
-- 20261006175000) locks a fixed column list; rather than edit it, this adds
-- a second guard for the new columns using the same helper, so a learner's
-- own client can't waive their English and maths.

alter table public.epa_gateway_checklist
  add column if not exists english_maths_not_required boolean not null default false,
  add column if not exists english_maths_not_required_at timestamptz,
  add column if not exists english_maths_not_required_by uuid;

comment on column public.epa_gateway_checklist.english_maths_not_required is
  'Employer has decided Level 2 English and maths are not required (apprentice 19+ at start; employer decision since 11 Feb 2025). Set by staff only.';

create or replace function public._gateway_em_waiver_guard()
returns trigger language plpgsql security invoker set search_path to 'public' as $$
begin
  if current_user not in ('authenticated', 'anon') or not public._learner_direct_write(new.user_id) then
    return new;
  end if;
  if tg_op = 'INSERT' then
    if coalesce(new.english_maths_not_required, false) then
      raise exception 'gateway sign-offs are made by your provider and employer (english_maths_not_required)'
        using errcode = '42501';
    end if;
  elsif new.english_maths_not_required is distinct from old.english_maths_not_required
     or new.english_maths_not_required_at is distinct from old.english_maths_not_required_at
     or new.english_maths_not_required_by is distinct from old.english_maths_not_required_by then
    raise exception 'gateway sign-offs are made by your provider and employer (english_maths_not_required)'
      using errcode = '42501';
  end if;
  return new;
end; $$;

drop trigger if exists trg_gateway_em_waiver_guard on public.epa_gateway_checklist;
create trigger trg_gateway_em_waiver_guard
  before insert or update on public.epa_gateway_checklist
  for each row execute function public._gateway_em_waiver_guard();
