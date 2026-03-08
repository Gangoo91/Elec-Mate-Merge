/**
 * Usage tracking — ELE-140 / ELE-207
 *
 * Persists per-user daily usage counters to Supabase `agent_usage` table.
 * Fire-and-forget: never blocks the tool call response.
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://jtwygbeceundfgnkirof.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Use service role client for usage tracking (bypasses RLS)
const serviceClient = SUPABASE_SERVICE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)
  : null;

/** Which tools count as RAG queries */
const RAG_TOOLS = new Set([
  'search_regulations',
  'search_practical_knowledge',
  'search_pricing_data',
  'query_knowledge_base',
  'search_design_knowledge',
  'search_study_content',
]);

/** Which tools count as outbound messages */
const MESSAGE_TOOLS = new Set([
  'send_approved_message',
  'send_email_reply',
  'send_quote',
  'send_certificate',
  'send_invoice',
  'send_client_expiry_reminders',
]);

/**
 * Record a tool call in the agent_usage table.
 * Fire-and-forget — errors are logged but never thrown.
 */
export function recordToolUsage(userId: string, toolName: string): void {
  if (!serviceClient) return;

  const isRag = RAG_TOOLS.has(toolName) ? 1 : 0;
  const isMessage = MESSAGE_TOOLS.has(toolName) ? 1 : 0;

  // Fire-and-forget — don't await, don't block
  void Promise.resolve(
    serviceClient.rpc('increment_agent_usage', {
      p_user_id: userId,
      p_tool_calls: 1,
      p_messages_sent: isMessage,
      p_rag_queries: isRag,
    })
  )
    .then(({ error }) => {
      if (error) {
        console.error(`[usage-tracker] Failed to record usage for ${userId}: ${error.message}`);
      }
    })
    .catch((err: unknown) => {
      console.error(`[usage-tracker] Unexpected error: ${err}`);
    });
}

/**
 * Record a rate limit hit.
 */
export function recordRateLimitHit(userId: string): void {
  if (!serviceClient) return;

  void Promise.resolve(
    serviceClient.rpc('increment_agent_usage', {
      p_user_id: userId,
      p_rate_limit_hits: 1,
    })
  )
    .then(({ error }) => {
      if (error) {
        console.error(`[usage-tracker] Failed to record rate limit hit: ${error.message}`);
      }
    })
    .catch(() => {});
}
