-- ELE-1872: the minimum time on programme depends on the START date, not the
-- standard. Apprenticeship funding rules 2025 to 2026: the minimum duration
-- fell from 12 months to 8 months for starts from 1 August 2025. A learner who
-- started before then still needs 12 months. No standard (ST0152 included)
-- sets its own minimum: ST0152's "typical duration to gateway" is 48 months,
-- which is guidance, not a gate. Checked 8 Oct 2026 against gov.uk
-- (Apprenticeship funding rules 2025 to 2026) and Skills England (ST0152).
--
-- Rewrites get_gateway_readiness from its live definition, changing only the
-- minimum-duration lookup.
do $mig$
declare v_def text; v_old text; v_new text;
begin
  v_def := pg_get_functiondef('public.get_gateway_readiness'::regproc);
  v_old := 'order by (r.standard_code = ''*'') limit 1;';
  if position(v_old in v_def) = 0 then
    raise exception 'get_gateway_readiness has changed; minimum-duration block not found';
  end if;
  v_new := v_old || '
    -- Funding rules: 12 months for starts before 1 August 2025, 8 from then.
    if v_start is not null and v_start < date ''2025-08-01'' and coalesce(v_min, 0) < 12 then
      v_min := 12;
      v_min_src := ''Apprenticeship funding rules: 12-month minimum for starts before 1 August 2025'';
    end if;';
  execute replace(v_def, v_old, v_new);
end $mig$;

update public.apprenticeship_standard_rules
   set source = 'Apprenticeship funding rules 2025 to 2026: minimum duration 8 months for starts from 1 August 2025 (12 months before; applied by get_gateway_readiness from the start date)',
       updated_at = now()
 where standard_code = '*';
