-- agent_tool_error_summary view
--
-- Surfaces failed tool calls from agent_action_log so we can spot
-- regressions like "create_quote keeps failing with empty items array"
-- the day it starts happening, not weeks later.
--
-- Reads from agent_action_log (populated by audit-logger.ts on every tool
-- call, including failures since the server.ts catch-block + audit-logger
-- column-fix landed). Tool-specific fields live inside detail jsonb:
--   detail->>'tool_name', detail->>'error', detail->>'duration_ms', etc.
--
-- Usage:
--   SELECT * FROM agent_tool_error_summary;             -- last 24h, top errors
--   SELECT * FROM agent_tool_error_summary_7d;          -- last 7 days

CREATE OR REPLACE VIEW agent_tool_error_summary AS
SELECT
  detail->>'tool_name' AS tool_name,
  detail->>'error' AS error_message,
  COUNT(*) AS error_count,
  COUNT(DISTINCT user_id) AS users_affected,
  MIN(created_at) AS first_seen,
  MAX(created_at) AS last_seen
FROM agent_action_log
WHERE action_type = 'tool_call'
  AND outcome = 'failure'
  AND created_at > now() - interval '24 hours'
GROUP BY detail->>'tool_name', detail->>'error'
ORDER BY error_count DESC, last_seen DESC;

CREATE OR REPLACE VIEW agent_tool_error_summary_7d AS
SELECT
  detail->>'tool_name' AS tool_name,
  detail->>'error' AS error_message,
  COUNT(*) AS error_count,
  COUNT(DISTINCT user_id) AS users_affected,
  MIN(created_at) AS first_seen,
  MAX(created_at) AS last_seen
FROM agent_action_log
WHERE action_type = 'tool_call'
  AND outcome = 'failure'
  AND created_at > now() - interval '7 days'
GROUP BY detail->>'tool_name', detail->>'error'
ORDER BY error_count DESC, last_seen DESC;

COMMENT ON VIEW agent_tool_error_summary IS
  'Top MCP tool failures in the last 24h. Used for production reliability triage.';
COMMENT ON VIEW agent_tool_error_summary_7d IS
  '7-day MCP tool failure rollup for week-over-week regression tracking.';
