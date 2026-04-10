/**
 * Phone Agent — manage ElevenLabs phone call handling
 *
 * Provides tools for:
 * - Enabling/disabling phone answering
 * - Logging call summaries
 * - Reading call history
 */

import type { UserContext } from '../auth.js';

// ─── Toggle Phone Agent ───────────────────────────────────────────────────

/**
 * Enable or disable the phone agent for this user.
 * When enabled, ElevenLabs answers calls on their Twilio number.
 * When disabled, calls go to voicemail or ring out normally.
 */
export async function togglePhoneAgent(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  const enabled = args.enabled as boolean;

  if (typeof enabled !== 'boolean') return { error: 'enabled (true/false) is required' };

  const { error } = await supabase
    .from('profiles')
    .update({
      phone_agent_enabled: enabled,
      phone_agent_updated_at: new Date().toISOString(),
    })
    .eq('id', user.userId);

  if (error) throw new Error(`Failed to update phone agent setting: ${error.message}`);

  return {
    success: true,
    phone_agent: enabled ? 'on' : 'off',
    message: enabled
      ? 'Phone agent is now ON. Mate will answer your calls, take details, check your calendar, and book jobs. You will get a WhatsApp summary after each call.'
      : 'Phone agent is now OFF. Calls will ring through to you normally.',
  };
}

// ─── Log Call Summary ─────────────────────────────────────────────────────

/**
 * Log a completed phone call summary.
 * Called by the ElevenLabs post-call webhook after each conversation.
 */
export async function logCallSummary(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;

  const { error } = await supabase.from('phone_call_logs').insert({
    user_id: user.userId,
    caller_name: (args.caller_name as string) || null,
    caller_phone: (args.caller_phone as string) || null,
    duration_seconds: typeof args.duration_seconds === 'number' ? args.duration_seconds : 0,
    summary: (args.summary as string) || '',
    actions_taken: args.actions_taken || [],
    job_created_id: (args.job_created_id as string) || null,
    booking_created: args.booking_created === true,
    call_type: (args.call_type as string) || 'enquiry',
    transcript: (args.transcript as string) || null,
    created_at: new Date().toISOString(),
  });

  if (error) throw new Error(`Failed to log call: ${error.message}`);

  return {
    success: true,
    note: 'Call logged. Send a WhatsApp summary to the electrician.',
  };
}

// ─── Read Call History ────────────────────────────────────────────────────

/**
 * Get recent phone call history.
 */
export async function getCallHistory(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  const limit = typeof args.limit === 'number' ? Math.min(args.limit, 50) : 10;

  const { data, error } = await supabase
    .from('phone_call_logs')
    .select(
      'caller_name, caller_phone, duration_seconds, summary, actions_taken, booking_created, call_type, created_at'
    )
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw new Error(`Failed to read call history: ${error.message}`);

  const calls = (data || []).map((c) => ({
    caller: (c.caller_name as string) || (c.caller_phone as string) || 'Unknown',
    duration: `${Math.round(((c.duration_seconds as number) || 0) / 60)}min`,
    summary: c.summary,
    type: c.call_type,
    booked: c.booking_created,
    when: c.created_at,
  }));

  return {
    success: true,
    calls,
    total: calls.length,
  };
}

// ─── Get Phone Agent Status ──────────────────────────────────────────────

export async function getPhoneAgentStatus(_args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;

  const { data: profile } = await supabase
    .from('profiles')
    .select('phone_agent_enabled, phone_agent_updated_at, agent_whatsapp_number')
    .eq('id', user.userId)
    .single();

  // Count calls today
  const today = new Date().toISOString().slice(0, 10);
  const { count: todayCalls } = await supabase
    .from('phone_call_logs')
    .select('id', { count: 'exact', head: true })
    .gte('created_at', `${today}T00:00:00Z`);

  // Count total calls
  const { count: totalCalls } = await supabase
    .from('phone_call_logs')
    .select('id', { count: 'exact', head: true });

  return {
    success: true,
    enabled: profile?.phone_agent_enabled || false,
    last_changed: profile?.phone_agent_updated_at || null,
    calls_today: todayCalls || 0,
    total_calls: totalCalls || 0,
  };
}
