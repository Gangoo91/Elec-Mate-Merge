/**
 * Named PostHog events — centralised so funnel analysis has a stable schema.
 *
 * Consent-gated at the source by PostHogProvider — `track*()` calls are safe
 * no-ops when the user hasn't opted in.
 *
 * Naming convention: snake_case, domain_first (e.g. `cert_generated` not
 * `generated_cert`). Group related props so dashboards can filter cleanly.
 */

import { posthog } from '@/components/analytics/PostHogProvider';
import { track as vercelTrack } from '@vercel/analytics';

function send(name: string, props?: Record<string, unknown>): void {
  try {
    posthog.capture(name, props);
  } catch {
    /* PostHog not initialised / consent not given — silent no-op */
  }
}

/**
 * Vercel Web Analytics custom events — cookieless, so unlike PostHog these
 * fire for EVERY visitor, not just the ones who accept the cookie banner.
 * Used for the landing → signup funnel where consent-gated tools are blind.
 * Props must be flat primitives (Vercel rejects nested objects).
 */
function sendVercel(name: string, props?: Record<string, string | number | boolean | null>): void {
  try {
    vercelTrack(name, props);
  } catch {
    /* Analytics script not loaded (dev / adblock) — silent no-op */
  }
}

// ─── Certificates ──────────────────────────────────────────────────
export function trackCertGenerated(props: {
  cert_type: string; // 'eic' | 'eicr' | 'minor_works' | 'pat' | 'fire_alarm' | 'solar_pv' | 'ev_charging' | ...
  report_id?: string;
  source?: 'web' | 'native';
}): void {
  send('cert_generated', props);
}

export function trackCertDownloaded(props: {
  cert_type: string;
  report_id?: string;
  format?: 'pdf' | 'html';
}): void {
  send('cert_downloaded', props);
}

// ─── Quotes & Invoices ─────────────────────────────────────────────
export function trackQuoteCreated(props: {
  quote_id?: string;
  amount_pence?: number;
  source?: 'voice' | 'manual' | 'ai';
}): void {
  send('quote_created', props);
}

export function trackQuoteSent(props: {
  quote_id?: string;
  amount_pence?: number;
  channel?: 'email' | 'whatsapp' | 'link';
}): void {
  send('quote_sent', props);
}

export function trackInvoiceRaised(props: { invoice_id?: string; amount_pence?: number }): void {
  send('invoice_raised', props);
}

export function trackInvoicePaid(props: { invoice_id?: string; amount_pence?: number }): void {
  send('invoice_paid', props);
}

// ─── Subscription lifecycle ────────────────────────────────────────
export function trackSubscriptionStarted(props: {
  tier: string;
  source: 'stripe' | 'revenuecat';
  is_trial?: boolean;
}): void {
  send('subscription_started', props);
}

export function trackSubscriptionCancelled(props: { tier?: string; reason?: string }): void {
  send('subscription_cancelled', props);
}

// ─── Growth / virality ─────────────────────────────────────────────
export function trackReferralShared(props: {
  channel: 'whatsapp' | 'sms' | 'email' | 'copy_link' | 'native_share' | 'qr';
  code?: string;
}): void {
  send('referral_shared', props);
}

export function trackReferralClicked(props: { code: string; source?: string }): void {
  send('referral_clicked', props);
}

export function trackLeadMagnetDownloaded(props: { magnet: string; email_domain?: string }): void {
  send('lead_magnet_downloaded', props);
}

export function trackEmailCaptured(props: {
  source: 'landing_form' | 'exit_intent' | 'lead_magnet_cheatsheet' | 'footer' | 'other';
}): void {
  send('email_captured', props);
}

export function trackLandingCtaClicked(props: {
  section:
    | 'nav'
    | 'nav_mobile'
    | 'hero'
    | 'workflow'
    | 'audience'
    | 'pricing'
    | 'final_cta'
    | 'sticky_mobile';
  label?: string;
}): void {
  send('landing_cta_clicked', props);
  sendVercel('landing_cta_clicked', { section: props.section, label: props.label ?? null });
}

/** Fired once per page load when a landing section first scrolls into view. */
export function trackLandingSectionViewed(props: { section: string }): void {
  send('landing_section_viewed', props);
  sendVercel('landing_section_viewed', { section: props.section });
}

// ─── Signup funnel ─────────────────────────────────────────────────
export function trackSignupCompleted(props?: { method?: string }): void {
  send('signup_completed', props);
  sendVercel('signup_completed', { method: props?.method ?? null });
}

export function trackCheckoutStarted(props?: { tier?: string; billing?: string }): void {
  send('checkout_started', props);
  sendVercel('checkout_started', {
    tier: props?.tier ?? null,
    billing: props?.billing ?? null,
  });
}

// ─── AI usage ──────────────────────────────────────────────────────
export function trackAiChatOpened(props: { agent: string; entrypoint?: string }): void {
  send('ai_chat_opened', props);
}

export function trackAiChatMessage(props: {
  agent: string;
  message_length?: number;
  had_attachment?: boolean;
}): void {
  send('ai_chat_message', props);
}

// ─── Learning ──────────────────────────────────────────────────────
export function trackCourseCompleted(props: { course_id: string; module?: string }): void {
  send('course_completed', props);
}

export function trackQuizCompleted(props: {
  quiz_id: string;
  score_percent: number;
  passed: boolean;
}): void {
  send('quiz_completed', props);
}
