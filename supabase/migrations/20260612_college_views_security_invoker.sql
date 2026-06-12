-- ============================================================================
-- P0 — close the cross-college / anonymous leak on college reporting views.
--
-- These 10 views are SECURITY DEFINER (run as owner → bypass the caller's RLS)
-- and were granted to anon/authenticated with NO caller scoping. The worst,
-- v_single_central_record, exposed every college's staff DBS / safeguarding-lead
-- records to anonymous users.
--
-- Fix: flip each to security_invoker so it respects the CALLER's RLS (the base
-- tables all have per-college SELECT policies → auto-scopes to the caller's
-- college), and revoke anon outright (zero legitimate anonymous use). This can
-- only ever RESTRICT to what the caller could already see via the base tables —
-- it cannot break legitimate same-college staff access.
--
-- Scoped to college PII views only. Deliberately EXCLUDES other definer views
-- such as national_benchmark_medians (an intentional anonymised cross-college
-- aggregate).
--
-- Rollback at the bottom.
-- ============================================================================

do $$
declare
  v text;
  views text[] := array[
    'college_fs_gateway_status',
    'college_iqa_otj_assessor_rollup',
    'college_iqa_otj_audit_queue',
    'college_student_spag_rollup',
    'college_tutor_obs_rollup',
    'college_voice_rollup',
    'v_cohort_qual_summary',
    'v_single_central_record',
    'v_sow_ac_coverage',
    'v_staff_cpd_progress'
  ];
begin
  foreach v in array views loop
    execute format('alter view public.%I set (security_invoker = on)', v);
    execute format('revoke select on public.%I from anon', v);
  end loop;
end $$;

-- ============================================================================
-- ROLLBACK (do NOT — re-opens the leak):
--   do $$ declare v text; views text[] := array[...same 10...];
--   begin foreach v in array views loop
--     execute format('alter view public.%I set (security_invoker = off)', v);
--     execute format('grant select on public.%I to anon', v);
--   end loop; end $$;
-- ============================================================================
