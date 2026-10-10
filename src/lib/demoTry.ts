/**
 * "Try it on your phone" (ELE-1854).
 *
 * The presenter in the demo college opens /college/try-on-phone, which mints a
 * single-use token (create_demo_try_token) and shows it as a QR. A visitor
 * scans it, lands on /try/:token, and the college-demo-try edge function makes
 * a throwaway demo learner in the demo college and hands back a session. The
 * account is always made by the server function, never in the browser.
 *
 * Session: 2 hours, then the account is shut. Account: deleted after 48 hours.
 * Limits: 10 visitors a day per demo college, 3 per network an hour.
 */
import { supabase } from '@/integrations/supabase/client';

/** Every visitor account looks like this (the server enforces it). */
export const DEMO_VISITOR_EMAIL = /^founder\+collegedemo-try-[a-f0-9]+@elec-mate\.com$/i;

export function isDemoVisitorEmail(email: string | null | undefined): boolean {
  return !!email && DEMO_VISITOR_EMAIL.test(email);
}

export interface DemoTryToken {
  token: string;
  token_id: string;
  expires_at: string;
  visitors_today: number;
  daily_limit: number;
  college_name: string;
}

export interface DemoTryStatus {
  used: boolean;
  used_at: string | null;
  expired: boolean;
  visitor_name: string | null;
  visitors_today: number;
  live_now: number;
  daily_limit: number;
}

export async function createDemoTryToken(): Promise<DemoTryToken> {
  const { data, error } = await supabase.rpc('create_demo_try_token' as never);
  if (error) throw new Error(error.message);
  return data as unknown as DemoTryToken;
}

export async function getDemoTryStatus(tokenId: string | null): Promise<DemoTryStatus | null> {
  const { data, error } = await supabase.rpc(
    'get_demo_try_status' as never,
    { p_token_id: tokenId } as never
  );
  if (error) throw new Error(error.message);
  return (data ?? null) as DemoTryStatus | null;
}

/** The link inside the QR. */
export function demoTryUrl(token: string, origin = window.location.origin): string {
  return `${origin}/try/${token}`;
}

export type DemoTryError =
  | 'invalid'
  | 'used'
  | 'expired'
  | 'daily_limit'
  | 'network_limit'
  | 'busy'
  | 'unavailable'
  | 'failed';

export const DEMO_TRY_MESSAGES: Record<DemoTryError, { title: string; body: string }> = {
  invalid: {
    title: 'That code does not work',
    body: 'The QR code was not recognised. Ask the presenter to show a fresh one.',
  },
  used: {
    title: 'Someone got there first',
    body: 'Each QR code lets one person in. Ask the presenter for the next one, it appears straight away.',
  },
  expired: {
    title: 'That code has run out',
    body: 'QR codes last 15 minutes. Ask the presenter to show a fresh one.',
  },
  daily_limit: {
    title: 'That is everyone for today',
    body: 'The demo college has had its ten visitors for today. You can still see how it works at elec-mate.com/for-colleges.',
  },
  network_limit: {
    title: 'A few too many from here',
    body: 'Three people on this network have already tried it in the last hour. Try again on mobile data, or a little later.',
  },
  busy: {
    title: 'The demo is busy',
    body: 'Lots of people are trying it right now. Give it a few minutes and scan again.',
  },
  unavailable: {
    title: 'The demo is not open',
    body: 'The demo college is not taking visitors at the moment.',
  },
  failed: {
    title: 'Something went wrong',
    body: 'We could not set up your demo account. Scan a fresh code to try again.',
  },
};

export interface DemoTryResult {
  ok: boolean;
  error?: DemoTryError;
  display_name?: string;
  session_ends_at?: string;
  session?: { access_token: string; refresh_token: string };
}

/** Swap the token for a session. The server makes the account. */
export async function redeemDemoTry(token: string): Promise<DemoTryResult> {
  const { data, error } = await supabase.functions.invoke('college-demo-try', {
    body: { token },
  });
  if (error) {
    // A non-2xx response still carries the JSON error code in the body.
    try {
      const ctx = (error as { context?: Response }).context;
      if (ctx && typeof ctx.json === 'function') {
        const body = (await ctx.json()) as DemoTryResult;
        if (body?.error) return { ok: false, error: body.error };
      }
    } catch {
      /* fall through */
    }
    return { ok: false, error: 'failed' };
  }
  const out = (data ?? {}) as DemoTryResult;
  if (!out.ok) return { ok: false, error: out.error ?? 'failed' };
  return out;
}

export interface MyDemoVisit {
  display_name: string;
  session_ends_at: string;
  ended: boolean;
  college_name: string;
}

export async function getMyDemoVisit(): Promise<MyDemoVisit | null> {
  const { data, error } = await supabase.rpc('get_my_demo_visit' as never);
  if (error) return null;
  return (data ?? null) as MyDemoVisit | null;
}

/** End the visit now and sign out on this phone. */
export async function endMyDemoVisit(): Promise<void> {
  await supabase.rpc('end_my_demo_visit' as never).then(
    () => undefined,
    () => undefined
  );
  await supabase.auth.signOut().catch(() => undefined);
}
