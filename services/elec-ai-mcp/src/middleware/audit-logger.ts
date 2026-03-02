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
 */
export async function logToolCall(
  user: UserContext,
  toolName: string,
  args: Record<string, unknown>,
  result: { success: boolean; error?: string; durationMs: number }
): Promise<void> {
  try {
    const supabase = user.supabase;

    await supabase.from('agent_action_log').insert({
      user_id: user.userId,
      action_type: 'tool_call',
      detail: {
        args: sanitiseArgs(args),
        success: result.success,
        error: result.error || null,
        duration_ms: result.durationMs,
      },
      tool_name: toolName,
      client_id: (args.client_id as string) || null,
      approved: null, // Set by agent layer, not MCP server
    });
  } catch {
    // Audit logging failure must never break tool execution.
    // In production, send to error monitoring (Sentry, etc.)
    console.error(`[audit] Failed to log tool call: ${toolName} for user ${user.userId}`);
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

    await supabase.from('agent_action_log').insert({
      user_id: user.userId,
      action_type: 'security_flag',
      detail: { event_type: eventType, ...detail },
      tool_name: null,
      client_id: null,
      approved: null,
    });
  } catch {
    console.error(`[audit] Failed to log security event: ${eventType} for user ${user.userId}`);
  }
}
