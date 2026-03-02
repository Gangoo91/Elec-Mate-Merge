/**
 * Email tools — connect_email, read_inbox, categorise_enquiry, draft_email_reply, send_email_reply
 * Maps to: Supabase edge functions for email OAuth + inbox management
 *
 * Integration-gated: only loaded when Gmail/Outlook connected.
 */

import type { UserContext } from '../auth.js';
import { callEdgeFunction } from '../lib/edge-function.js';

export async function connectEmail(args: Record<string, unknown>, user: UserContext) {
  if (args.provider !== 'gmail' && args.provider !== 'outlook') {
    throw new Error('provider must be "gmail" or "outlook"');
  }

  const result = await callEdgeFunction('oauth-email-init', user.jwt, {
    provider: args.provider,
  });

  if (result.error) throw new Error(result.error);
  return result.data;
}

export async function readInbox(args: Record<string, unknown>, user: UserContext) {
  const result = await callEdgeFunction('read-email-inbox', user.jwt, {
    unread_only: args.unread_only === true,
    category: typeof args.category === 'string' ? args.category : 'all',
    limit: typeof args.limit === 'number' && args.limit > 0 ? Math.min(args.limit, 50) : 20,
  });

  if (result.error) throw new Error(result.error);
  return result.data;
}

export async function categoriseEnquiry(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.email_id !== 'string') {
    throw new Error('email_id is required');
  }

  const result = await callEdgeFunction('categorise-email-enquiry', user.jwt, {
    email_id: args.email_id,
  });

  if (result.error) throw new Error(result.error);
  return result.data;
}

export async function draftEmailReply(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.email_id !== 'string') {
    throw new Error('email_id is required');
  }
  if (typeof args.intent !== 'string') {
    throw new Error('intent is required');
  }

  const result = await callEdgeFunction('draft-email-reply', user.jwt, {
    email_id: args.email_id,
    intent: args.intent,
    custom_message: typeof args.custom_message === 'string' ? args.custom_message : undefined,
  });

  if (result.error) throw new Error(result.error);
  return result.data;
}

export async function sendEmailReply(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.draft_id !== 'string') {
    throw new Error('draft_id is required');
  }

  const result = await callEdgeFunction('send-email-reply', user.jwt, {
    draft_id: args.draft_id,
  });

  if (result.error) throw new Error(result.error);
  return result.data;
}
