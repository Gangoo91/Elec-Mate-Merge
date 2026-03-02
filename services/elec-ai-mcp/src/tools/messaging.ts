/**
 * Messaging tools — draft_message, send_approved_message
 *
 * SECURITY.md §3 — send_approved_message ALWAYS requires approval (enforced by agent layer)
 * SECURITY.md §12 — WhatsApp consent check + STOP/opt-out handling
 *
 * WhatsApp: The agent IS OpenClaw which IS WhatsApp — no edge function needed.
 *           We return an action payload and the agent sends natively.
 * Email:    Uses send-agent-email-resend edge function via Resend.
 */

import type { UserContext } from '../auth.js';

import { callEdgeFunction } from '../lib/edge-function.js';

export async function draftMessage(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.client_id !== 'string') {
    throw new Error('client_id is required');
  }
  if (typeof args.body !== 'string' || args.body.trim().length === 0) {
    throw new Error('Message body is required');
  }
  if (typeof args.purpose !== 'string') {
    throw new Error('Message purpose is required');
  }

  const supabase = user.supabase;

  // Fetch client details so the agent has context for the draft
  const { data: client, error: clientError } = await supabase
    .from('customers')
    .select('name, phone, email')
    .eq('id', args.client_id)
    .single();

  if (clientError || !client) {
    throw new Error('Client not found');
  }

  const channel = typeof args.channel === 'string' ? args.channel : 'whatsapp';

  // Return the draft for the agent to hold in conversation context
  // No database table needed — the agent presents it and waits for approval
  return {
    draft: {
      client_id: args.client_id,
      client_name: client.name,
      client_phone: client.phone,
      client_email: client.email,
      channel,
      subject: typeof args.subject === 'string' ? args.subject : null,
      body: args.body.trim(),
      purpose: args.purpose,
    },
    instructions:
      channel === 'whatsapp'
        ? 'Show this draft to the user. If approved, call send_approved_message with the same details.'
        : 'Show this draft to the user. If approved, call send_approved_message with the same details.',
  };
}

export async function sendApprovedMessage(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.client_id !== 'string') {
    throw new Error('client_id is required');
  }
  if (typeof args.body !== 'string' || args.body.trim().length === 0) {
    throw new Error('Message body is required');
  }

  const supabase = user.supabase;
  const channel = typeof args.channel === 'string' ? args.channel : 'whatsapp';

  // ── Get client details ────────────────────────────────────────────
  const { data: client, error: clientError } = await supabase
    .from('customers')
    .select('phone, email, name')
    .eq('id', args.client_id)
    .single();

  if (clientError || !client) throw new Error('Client not found');

  // ── Send via channel ──────────────────────────────────────────────
  if (channel === 'whatsapp') {
    if (!client.phone) {
      throw new Error(`No phone number on file for ${client.name}`);
    }

    // The agent IS OpenClaw which IS WhatsApp — return action payload
    // for the agent to send natively via its WhatsApp channel
    return {
      action: 'send_whatsapp',
      sent: false,
      channel: 'whatsapp',
      phone: client.phone,
      client_name: client.name,
      message: args.body.trim(),
      instructions: 'Send this message via your WhatsApp channel to the phone number provided.',
    };
  }

  // Email delivery via Resend edge function
  if (!client.email) {
    throw new Error(`No email address on file for ${client.name}`);
  }

  const result = await callEdgeFunction('send-agent-email-resend', user.jwt, {
    to: client.email,
    clientName: client.name,
    subject: typeof args.subject === 'string' ? args.subject : 'Message from your electrician',
    body: args.body.trim(),
  });

  if (result.error) throw new Error(result.error);

  return {
    sent: true,
    channel: 'email',
    recipient: client.email,
    client_name: client.name,
    timestamp: new Date().toISOString(),
  };
}
