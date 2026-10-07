-- ELE-1831 — HELD FOR RELEASE. Do NOT apply until the client release that
-- stops reading whole rows (select('*') / employer_jobs(*)) has shipped AND
-- has been live long enough for stale tabs/native builds to refresh:
--   src/lib/columnPrivacy.ts (the column lists + merge helpers) and every
--   reader that now uses them — jobService, useJobFinancials, locationService,
--   employeeService, useCompanyTools, useElecIdProfile, useDocumentVerification,
--   DocumentUploader, elecIdService, usePublicElecId, vacancyService,
--   profileDataService, useWorkerSelfService, elecIdLinkage, AdminElecIds,
--   AdminDocumentReview, JobTemplatesSheet, ArchivedJobsSheet,
--   employerClientService, useBusinessMetrics, useEmployerDashboardStats.
-- Applying it before then breaks the live app for owners (42501 on select *).
--
-- Prerequisite (already LIVE, additive): 20261007290000_role_column_privacy_rpcs.sql
--   get_job_private_fields / get_job_client_contact / get_job_values,
--   get_firm_roster_pay, get_firm_tool_costs,
--   get_elec_id_profiles_private / get_my_elec_id_private / get_elec_id_documents_private.
--
-- How column privacy works in Postgres: a column-level REVOKE does nothing
-- while the role still holds table-level SELECT. So each step revokes
-- table-level SELECT and re-grants SELECT on every column EXCEPT the
-- protected ones. The grant list is computed from information_schema at run
-- time, so the script is correct for the schema as it stands when applied.
-- ⚠ After this ships, a NEW column on these five tables is unreadable by
--   anon/authenticated until it is granted explicitly (and added to
--   src/lib/columnPrivacy.ts).
--
-- Unaffected: SECURITY DEFINER functions (get_my_jobs, get_my_job_detail,
-- the talent-pool/credentials RPCs), edge functions on the service role,
-- INSERT/UPDATE/DELETE grants (writing a protected column still works),
-- Realtime (postgres_changes only ships columns the role may select).
-- Checked 7 Oct: no view, no SECURITY INVOKER function and no RLS policy
-- reads a protected column.

begin;

-- 0. Pre-flight — the owner/admin RPCs must exist or owners lose the values.
do $$
declare f text;
begin
  foreach f in array array[
    'public.get_job_private_fields(uuid[])', 'public.get_job_client_contact(uuid)',
    'public.get_job_values(uuid)', 'public.get_firm_roster_pay(uuid)',
    'public.get_firm_tool_costs(uuid)', 'public.get_elec_id_profiles_private(uuid[])',
    'public.get_my_elec_id_private()', 'public.get_elec_id_documents_private(uuid[])'
  ] loop
    if to_regprocedure(f) is null then
      raise exception 'ELE-1831 pre-flight: % is missing — apply 20261007290000 first', f;
    end if;
  end loop;
end $$;

-- Helper (dropped at the end): revoke table SELECT, re-grant all columns but p_hidden.
create or replace function pg_temp.ele1831_hide(p_table text, p_hidden text[], p_roles text)
returns void language plpgsql as $$
declare v_cols text; v_missing text;
begin
  select string_agg(h, ', ') into v_missing
    from unnest(p_hidden) h
   where not exists (select 1 from information_schema.columns c
                      where c.table_schema = 'public' and c.table_name = p_table and c.column_name = h);
  if v_missing is not null then
    raise exception 'ELE-1831: %.% not found', p_table, v_missing;
  end if;
  select string_agg(quote_ident(column_name), ', ' order by ordinal_position) into v_cols
    from information_schema.columns
   where table_schema = 'public' and table_name = p_table and column_name <> all (p_hidden);
  execute format('revoke select on public.%I from %s', p_table, p_roles);
  execute format('grant select (%s) on public.%I to %s', v_cols, p_table, p_roles);
end $$;

-- 1. Jobs: client_phone / client_email (apprentices) and value (anyone without
--    can_see_firm_money — office managers and every worker). Owners, admins and
--    office read them through get_job_private_fields / get_job_values /
--    get_job_client_contact; crew get their contact via get_my_job_detail.
--    The "Worker reads assigned jobs" policy (is_assigned_to_job) STAYS: worker
--    embeds such as job:employer_jobs(id, title) depend on it, and with the
--    three columns revoked it can no longer hand over contact or value.
select pg_temp.ele1831_hide('employer_jobs', array['value', 'client_phone', 'client_email'],
                            'anon, authenticated');

-- 2. Pay: hourly_rate / annual_salary / overtime_multiplier. Served by
--    get_firm_roster_pay(firm) — owner/admin for the whole roster, everyone
--    else only their own row (My Pay).
select pg_temp.ele1831_hide('employer_employees',
                            array['hourly_rate', 'annual_salary', 'overtime_multiplier'],
                            'anon, authenticated');

-- 3. Price book: employer_price_book is RETIRED (20261006158000). The firm price
--    book lives in materials_lists behind get_firm_price_book, which already
--    nulls buy price / markup for office. Nothing to revoke.

-- 4. Elec-ID. Profiles: ecs_card_number, verification_notes, shareable_link —
--    served by get_elec_id_profiles_private (the person, their own firm's scope,
--    a platform admin). Documents: document_number, extracted_data,
--    raw_ocr_text — served by get_elec_id_documents_private (the person or a
--    platform admin). anon on documents keeps its 7 Oct narrow list minus
--    document_number (20261007172500).
select pg_temp.ele1831_hide('employer_elec_id_profiles',
                            array['ecs_card_number', 'verification_notes', 'shareable_link'],
                            'anon, authenticated');
select pg_temp.ele1831_hide('elec_id_documents',
                            array['document_number', 'extracted_data', 'raw_ocr_text'],
                            'authenticated');
revoke select on public.elec_id_documents from anon;
grant select (id, profile_id, document_type, document_name, file_url, verification_status,
              issue_date, expiry_date, issuing_body)
  on public.elec_id_documents to anon;

-- 5. Kit: company tool purchase_price (office managers and workers). Served by
--    get_firm_tool_costs(firm) — owner/admin only.
select pg_temp.ele1831_hide('employer_company_tools', array['purchase_price'],
                            'anon, authenticated');

drop function pg_temp.ele1831_hide(text, text[], text);

commit;

-- ─────────────────────────────────────────────────────────────────────────
-- VERIFICATION — run after applying (each query should return what it says).
-- ─────────────────────────────────────────────────────────────────────────
-- (a) No protected column is selectable by anon/authenticated (expect 0 rows):
-- select table_name, column_name, grantee
--   from information_schema.column_privileges
--  where table_schema = 'public' and privilege_type = 'SELECT'
--    and grantee in ('anon', 'authenticated')
--    and (table_name, column_name) in (
--      ('employer_jobs','value'), ('employer_jobs','client_phone'), ('employer_jobs','client_email'),
--      ('employer_employees','hourly_rate'), ('employer_employees','annual_salary'),
--      ('employer_employees','overtime_multiplier'),
--      ('employer_elec_id_profiles','ecs_card_number'), ('employer_elec_id_profiles','verification_notes'),
--      ('employer_elec_id_profiles','shareable_link'),
--      ('elec_id_documents','document_number'), ('elec_id_documents','extracted_data'),
--      ('elec_id_documents','raw_ocr_text'),
--      ('employer_company_tools','purchase_price'));
--
-- (b) No table-level SELECT left for authenticated on the five tables (expect 0 rows):
-- select table_name from information_schema.role_table_grants
--  where table_schema = 'public' and grantee in ('anon', 'authenticated') and privilege_type = 'SELECT'
--    and table_name in ('employer_jobs','employer_employees','employer_elec_id_profiles',
--                       'elec_id_documents','employer_company_tools');
--
-- (c) Every other column is still selectable by authenticated (expect 0 rows):
-- select c.table_name, c.column_name from information_schema.columns c
--  where c.table_schema = 'public'
--    and c.table_name in ('employer_jobs','employer_employees','employer_elec_id_profiles',
--                         'elec_id_documents','employer_company_tools')
--    and c.column_name not in ('value','client_phone','client_email','hourly_rate','annual_salary',
--        'overtime_multiplier','ecs_card_number','verification_notes','shareable_link',
--        'document_number','extracted_data','raw_ocr_text','purchase_price')
--    and not has_column_privilege('authenticated', format('public.%I', c.table_name), c.column_name, 'SELECT');
--
-- (d) Role smoke (owner keeps the values through the RPCs; office/worker get NULLs):
-- begin;
--   set local role authenticated;
--   select set_config('request.jwt.claims', json_build_object('sub', '<owner uuid>', 'role', 'authenticated')::text, true);
--   select count(*) from public.employer_jobs;                               -- works
--   select value from public.employer_jobs limit 1;                          -- 42501
--   select count(*) filter (where value is not null)
--     from public.get_job_values('<owner uuid>');                            -- owner: > 0
--   select count(*) from public.get_firm_roster_pay('<owner uuid>');         -- owner: roster size
-- rollback;
--
-- ROLLBACK (if a screen breaks): restore table-level SELECT —
-- grant select on public.employer_jobs, public.employer_employees, public.employer_elec_id_profiles,
--   public.employer_company_tools to anon, authenticated;
-- grant select on public.elec_id_documents to authenticated;
