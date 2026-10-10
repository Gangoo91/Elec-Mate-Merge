-- Gap #4: putting a pay run back also takes back the holiday record lines it
-- wrote. Additive: undo_payroll_export() is unchanged (HEAD and build 49 call
-- it); undo_pay_run() wraps it in the same transaction, so if the undo is
-- refused (48 hours, payday, permission) nothing is removed.
--
-- Only rows this run wrote go (source 'pay_run', source_id = the run). Rows
-- from leave approval and earlier runs are never touched.

create or replace function public.undo_pay_run(p_export uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_firm uuid;
  v_removed int := 0;
  v_res jsonb;
begin
  if auth.uid() is null then
    raise exception 'not_signed_in' using errcode = '42501';
  end if;
  select employer_id into v_firm from employer_payroll_exports where id = p_export;
  if v_firm is null or v_firm not in (select public.my_employer_scope()) then
    raise exception 'not_allowed' using errcode = '42501';
  end if;

  delete from employer_holiday_records h
   where h.employer_id = v_firm and h.source = 'pay_run' and h.source_id = p_export;
  get diagnostics v_removed = row_count;

  -- Checks 48 hours, payday and permission; raising here undoes the delete too.
  v_res := public.undo_payroll_export(p_export);
  return v_res || jsonb_build_object('holiday_removed', v_removed);
end $$;

revoke all on function public.undo_pay_run(uuid) from public, anon;
grant execute on function public.undo_pay_run(uuid) to authenticated;

comment on function public.undo_pay_run(uuid) is
  'Gap #4: undo_payroll_export plus removal of the holiday record lines that run wrote.';
