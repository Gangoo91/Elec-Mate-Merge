/**
 * Automatic audit logging — SECURITY.md §9
 *
 * Every tool call is logged to `agent_activity_log` automatically.
 * The agent does NOT need to call `log_activity` explicitly — it happens
 * as middleware around every tool invocation.
 *
 * Logs: tool_name, args (sanitised), user_id, result status, duration, timestamp.
 */

import type { UserContext } from '../auth.js';

/** Fields that should never appear in audit logs */
const REDACTED_FIELDS = new Set([
  'password',
  'token',
  'secret',
  'access_token',
  'refresh_token',
  'api_key',
  'pin',
  'card_number',
  'cvv',
  'ssn',
]);

/**
 * Redact sensitive fields from args before logging.
 */
function sanitiseArgs(args: Record<string, unknown>): Record<string, unknown> {
  const sanitised: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(args)) {
    if (REDACTED_FIELDS.has(key.toLowerCase())) {
      sanitised[key] = '[REDACTED]';
    } else if (typeof value === 'string' && value.length > 500) {
      sanitised[key] = value.slice(0, 500) + '...[truncated]';
    } else {
      sanitised[key] = value;
    }
  }
  return sanitised;
}

/**
 * Log a tool call to the audit trail.
 * Non-blocking — errors in logging don't affect tool execution.
 *
 * agent_action_log columns: id, user_id, action_type, description, customer_name,
 * detail (jsonb), outcome, undoable, undo_payload, created_at.
 * Tool-specific fields (tool_name, args, success, error, duration_ms, client_id)
 * live inside `detail` rather than as top-level columns.
 */
export async function logToolCall(
  user: UserContext,
  toolName: string,
  args: Record<string, unknown>,
  result: { success: boolean; error?: string; durationMs: number }
): Promise<void> {
  try {
    const supabase = user.supabase;

    const { error } = await supabase.from('agent_action_log').insert({
      user_id: user.userId,
      action_type: 'tool_call',
      description: `${toolName}${result.success ? '' : ' (failed)'}`,
      outcome: result.success ? 'success' : 'failure',
      detail: {
        tool_name: toolName,
        args: sanitiseArgs(args),
        success: result.success,
        error: result.error || null,
        duration_ms: result.durationMs,
        client_id: (args.client_id as string) || null,
      },
    });

    if (error) {
      console.error(`[audit] insert failed: ${toolName} for user ${user.userId}: ${error.message}`);
    }
  } catch (e) {
    // Audit logging failure must never break tool execution.
    console.error(
      `[audit] Failed to log tool call: ${toolName} for user ${user.userId}: ${e instanceof Error ? e.message : String(e)}`
    );
  }
}

/**
 * Log a security-relevant event (injection attempt, rate limit hit, etc.)
 */
export async function logSecurityEvent(
  user: UserContext,
  eventType: string,
  detail: Record<string, unknown>
): Promise<void> {
  try {
    const supabase = user.supabase;

    const { error } = await supabase.from('agent_action_log').insert({
      user_id: user.userId,
      action_type: 'security_flag',
      description: `security: ${eventType}`,
      outcome: 'flagged',
      detail: { event_type: eventType, ...detail },
    });
    if (error) {
      console.error(`[audit] security insert failed: ${eventType} for user ${user.userId}: ${error.message}`);
    }
  } catch (e) {
    console.error(
      `[audit] Failed to log security event: ${eventType} for user ${user.userId}: ${e instanceof Error ? e.message : String(e)}`
    );
  }
}
