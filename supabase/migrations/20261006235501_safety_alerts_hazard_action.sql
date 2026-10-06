-- Safety Alerts: the two lines a reader needs, from the notice itself.
-- Every OPSS notice opens with "Hazard:" and "Corrective action:" lines;
-- sync-safety-alerts copies them verbatim (plain text) from the GOV.UK content
-- API. NULL = not yet fetched or not present. Never paraphrased.
alter table public.safety_alerts
  add column if not exists hazard text,
  add column if not exists corrective_action text;
