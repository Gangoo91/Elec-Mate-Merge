-- ELE-1831 — owner/admin RPCs for the columns that release-held
-- 20261007169000_role_column_privacy.sql hides at the database level.
-- ADDITIVE ONLY: no grant is revoked and no policy changes here, so this is
-- safe to apply before the client release. The client merges these values
-- into rows it now reads with explicit (non-protected) column lists.
--
-- Rules (mirrors what the screens already show):
--   job value ............ can_see_firm_money(firm)  (owner + admin, never office/workers)
--   job client contact ... firm scope (owner/admin/office), or a NON-apprentice
--                          worker assigned to the job when share_client_contact_with_crew
--   roster pay ........... can_see_firm_money(firm), or the person themselves
--   tool purchase_price .. can_see_firm_money(firm)
--   Elec-ID profile ...... the person, their own firm's scope, or a platform admin
--   Elec-ID documents .... the person, or a platform admin

-- ── Jobs ────────────────────────────────────────────────────────────────────
create or replace function public.get_job_private_fields(p_job_ids uuid[])
returns table(job_id uuid, value numeric, client_phone text, client_email text)
language sql
stable
security definer
set search_path = public
as $$
  select j.id,
         case when public.can_see_firm_money(j.user_id) then j.value end,
         case when j.user_id in (select public.my_employer_scope())
                or (public.is_assigned_to_job(j.id)
                    and coalesce(j.share_client_contact_with_crew, true)
                    and public.my_employer_role(j.user_id) is distinct from 'apprentice')
              then j.client_phone end,
         case when j.user_id in (select public.my_employer_scope())
                or (public.is_assigned_to_job(j.id)
                    and coalesce(j.share_client_contact_with_crew, true)
                    and public.my_employer_role(j.user_id) is distinct from 'apprentice')
              then j.client_email end
    from public.employer_jobs j
   where auth.uid() is not null
     and j.id = any(p_job_ids)
     and (j.user_id in (select public.my_employer_scope()) or public.is_assigned_to_job(j.id));
$$;

create or replace function public.get_job_client_contact(p_job uuid)
returns table(client_phone text, client_email text)
language sql
stable
security definer
set search_path = public
as $$
  select f.client_phone, f.client_email
    from public.get_job_private_fields(array[p_job]) f
   where f.client_phone is not null or f.client_email is not null;
$$;

create or replace function public.get_job_values(p_firm uuid)
returns table(job_id uuid, value numeric)
language sql
stable
security definer
set search_path = public
as $$
  select j.id, j.value
    from public.employer_jobs j
   where public.can_see_firm_money(p_firm)
     and j.user_id = p_firm;
$$;

-- ── Roster pay ──────────────────────────────────────────────────────────────
-- p_firm null = the caller's own rows (any firm, or their stub row).
create or replace function public.get_firm_roster_pay(p_firm uuid)
returns table(employee_id uuid, hourly_rate numeric, annual_salary numeric, overtime_multiplier numeric)
language sql
stable
security definer
set search_path = public
as $$
  select e.id, e.hourly_rate, e.annual_salary, e.overtime_multiplier
    from public.employer_employees e
   where auth.uid() is not null
     and (
       (p_firm is null and e.user_id = auth.uid())
       or (p_firm is not null and e.employer_id = p_firm
           and (public.can_see_firm_money(p_firm) or e.user_id = auth.uid()))
     );
$$;

-- ── Company tools ───────────────────────────────────────────────────────────
create or replace function public.get_firm_tool_costs(p_firm uuid)
returns table(tool_id uuid, purchase_price numeric)
language sql
stable
security definer
set search_path = public
as $$
  select t.id, t.purchase_price
    from public.employer_company_tools t
   where public.can_see_firm_money(p_firm)
     and t.user_id = p_firm;
$$;

-- ── Elec-ID ─────────────────────────────────────────────────────────────────
-- p_ids null = the caller's own profiles.
create or replace function public.get_elec_id_profiles_private(p_ids uuid[])
returns table(profile_id uuid, ecs_card_number text, verification_notes text, shareable_link text)
language sql
stable
security definer
set search_path = public
as $$
  select p.id, p.ecs_card_number, p.verification_notes, p.shareable_link
    from public.employer_elec_id_profiles p
    join public.employer_employees e on e.id = p.employee_id
   where auth.uid() is not null
     and (p_ids is null and e.user_id = auth.uid()
          or p_ids is not null and p.id = any(p_ids)
             and (e.user_id = auth.uid()
                  or e.employer_id in (select public.my_employer_scope())
                  or exists (select 1 from public.profiles pr
                              where pr.id = auth.uid() and pr.admin_role is not null)));
$$;

create or replace function public.get_my_elec_id_private()
returns table(profile_id uuid, ecs_card_number text, verification_notes text, shareable_link text)
language sql
stable
security definer
set search_path = public
as $$
  select * from public.get_elec_id_profiles_private(null);
$$;

create or replace function public.get_elec_id_documents_private(p_ids uuid[])
returns table(document_id uuid, document_number text, extracted_data jsonb, raw_ocr_text text)
language sql
stable
security definer
set search_path = public
as $$
  select d.id, d.document_number, d.extracted_data, d.raw_ocr_text
    from public.elec_id_documents d
    join public.employer_elec_id_profiles p on p.id = d.profile_id
    join public.employer_employees e on e.id = p.employee_id
   where auth.uid() is not null
     and d.id = any(p_ids)
     and (e.user_id = auth.uid()
          or exists (select 1 from public.profiles pr
                      where pr.id = auth.uid() and pr.admin_role is not null));
$$;

do $$
declare f text;
begin
  foreach f in array array[
    'get_job_private_fields(uuid[])', 'get_job_client_contact(uuid)', 'get_job_values(uuid)',
    'get_firm_roster_pay(uuid)', 'get_firm_tool_costs(uuid)',
    'get_elec_id_profiles_private(uuid[])', 'get_my_elec_id_private()',
    'get_elec_id_documents_private(uuid[])'
  ] loop
    execute format('revoke all on function public.%s from public, anon', f);
    execute format('grant execute on function public.%s to authenticated', f);
  end loop;
end $$;
