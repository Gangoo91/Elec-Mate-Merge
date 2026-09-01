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
import { getStoredAttribution } from '@/lib/attribution';

/**
 * The campaign this visitor arrived on, for slicing funnel steps by source.
 *
 * `attribution.ts` has stored first-touch UTMs on landing since long before
 * this, but no funnel event ever read them — so every step was a single
 * undifferentiated number and a campaign's drop-off could not be isolated.
 * That is why a 554-recipient send in August 2026 could not be told apart
 * from organic traffic anywhere below the click.
 *
 * Returns null rather than 'none' so Vercel doesn't burn a dimension value on
 * the common case. Wrapped because storage access throws in some privacy modes.
 */
function campaignOf(): string | null {
  try {
    // Live URL first. `captureAttribution()` runs from an App-level effect, and
    // React fires CHILD effects before parent ones — so on a link that goes
    // straight to /auth/signup (which is what marketing emails do), a page-view
    // event reads storage before anything has been written to it. Reading the
    // query string directly is immune to that ordering.
    if (typeof window !== 'undefined' && window.location?.search) {
      const p = new URLSearchParams(window.location.search);
      const live = p.get('utm_campaign') || p.get('utm_source');
      if (live) return live;
    }
    const a = getStoredAttribution();
    return a?.utm_campaign || a?.utm_source || null;
  } catch {
    return null;
  }
}

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
/**
 * Activation events dual-send like the signup funnel does. Only low-cardinality
 * props go to Vercel — `report_id`/`quote_id`/`amount_pence` are unbounded and
 * would shred the custom-event dimensions, so they stay in PostHog.
 */
export function trackCertGenerated(props: {
  cert_type: string; // 'eic' | 'eicr' | 'minor_works' | 'pat' | 'fire_alarm' | 'solar_pv' | 'ev_charging' | ...
  report_id?: string;
  source?: 'web' | 'native';
}): void {
  send('cert_generated', props);
  sendVercel('cert_generated', { cert_type: props.cert_type, source: props.source ?? null });
}

/**
 * ⚠️ Still unwired, deliberately. Unlike generation — which funnels through
 * `saveCertificatePdf` — downloading has no single choke point: each cert screen
 * opens the stored URL itself. Wiring a subset would under-count while looking
 * complete, so this waits for a shared download helper to hook once.
 */
export function trackCertDownloaded(props: {
  cert_type: string;
  report_id?: string;
  format?: 'pdf' | 'html';
}): void {
  send('cert_downloaded', props);
  sendVercel('cert_downloaded', { cert_type: props.cert_type, format: props.format ?? null });
}

// ─── Quotes & Invoices ─────────────────────────────────────────────
export function trackQuoteCreated(props: {
  quote_id?: string;
  amount_pence?: number;
  source?: 'voice' | 'manual' | 'ai';
}): void {
  send('quote_created', props);
  sendVercel('quote_created', { source: props.source ?? null });
}

export function trackQuoteSent(props: {
  quote_id?: string;
  amount_pence?: number;
  channel?: 'email' | 'whatsapp' | 'link';
}): void {
  send('quote_sent', props);
  sendVercel('quote_sent', { channel: props.channel ?? null });
}

export function trackInvoiceRaised(props: { invoice_id?: string; amount_pence?: number }): void {
  send('invoice_raised', props);
  sendVercel('invoice_raised');
}

export function trackInvoicePaid(props: { invoice_id?: string; amount_pence?: number }): void {
  send('invoice_paid', props);
  sendVercel('invoice_paid');
}

// ─── Subscription lifecycle ────────────────────────────────────────
/**
 * 🔴 DO NOT CALL FROM THE CLIENT.
 *
 * `subscription_started` is already emitted server-side, from the payment
 * processor's own truth rather than the browser:
 *   - `supabase/functions/stripe-subscription-webhook/index.ts` (~line 1475)
 *   - `supabase/functions/revenuecat-webhook/index.ts` (~line 441)
 * Both send richer properties than this signature and fire even when the user
 * never returns to the app. Calling this as well would double-count every
 * subscription. Kept only so the schema is documented in one place.
 */
export function trackSubscriptionStarted(props: {
  tier: string;
  source: 'stripe' | 'revenuecat';
  is_trial?: boolean;
}): void {
  send('subscription_started', props);
}

/**
 * 🔴 Currently emitted by NOBODY — client or server.
 *
 * `cancel_confirmed` only covers in-app cancellations via CancelFlow; it misses
 * store-initiated and Stripe-portal cancellations entirely. The correct home is
 * server-side alongside `subscription_started` (Stripe
 * `customer.subscription.deleted`, RevenueCat `CANCELLATION`). Wiring it here
 * would under-count and disagree with the started event's source of truth.
 */
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
  // Dual-sent like the rest of the acquisition funnel: this fires on the landing
  // page and on SEO pages, where consent-gated PostHog misses most visitors.
  // `email_domain` stays out of Vercel — unbounded cardinality.
  sendVercel('lead_magnet_downloaded', { magnet: props.magnet });
}

/**
 * Keep this union in step with the `Source` type in `EmailCaptureForm.tsx` and
 * the one in `supabase/functions/newsletter-subscribe/index.ts`.
 *
 * ⚠️ All three have drifted from each other (found 31 Aug 2026 while adding
 * `lead_magnet_plug_in_solar`): the landing form's union omits
 * `calculator_result`, which is sent by `components/seo/CalculatorResultEmail.tsx`;
 * the edge function's omits `lead_magnet_symbols_chart` and
 * `lead_magnet_zs_ze_reference` even though its OTHER_MAGNETS registry serves
 * both — it works only because the handler matches on the registry key rather
 * than the type. Adding a magnet means touching all three, and the compiler will
 * only catch two of them.
 */
export function trackEmailCaptured(props: {
  source:
    | 'landing_form'
    | 'exit_intent'
    | 'lead_magnet_cheatsheet'
    | 'lead_magnet_symbols_chart'
    | 'lead_magnet_zs_ze_reference'
    | 'lead_magnet_plug_in_solar'
    | 'mock_exam_result'
    | 'calculator_result'
    | 'footer'
    | 'other';
}): void {
  send('email_captured', props);
  sendVercel('email_captured', { source: props.source });
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

/**
 * Fired when the signup page renders — the rung the funnel was missing.
 *
 * `signup_started` only fires on first field focus, so anyone who landed and
 * left without touching the form was invisible. That is precisely the gap that
 * made an email campaign unreadable: 80 reported clicks, and no way to tell
 * whether they were people who bounced off the page or scanners that never
 * rendered it at all.
 */
export function trackSignupPageViewed(props?: { referrer?: string }): void {
  const campaign = campaignOf();
  send('signup_page_viewed', { ...props, campaign });
  sendVercel('signup_page_viewed', { campaign });
}

export function trackSignupCompleted(props?: { method?: string }): void {
  const campaign = campaignOf();
  send('signup_completed', { ...props, campaign });
  sendVercel('signup_completed', { method: props?.method ?? null, campaign });
}

export function trackCheckoutStarted(props?: { tier?: string; billing?: string }): void {
  const campaign = campaignOf();
  send('checkout_started', { ...props, campaign });
  sendVercel('checkout_started', {
    tier: props?.tier ?? null,
    billing: props?.billing ?? null,
    campaign,
  });
}

/** Fired when the post-signup trial page renders — closes the signup →
    checkout gap in the funnel (did they even see the offer, or bail before?). */
export function trackPostSignupStepViewed(props: { step: string; tier?: string }): void {
  send('post_signup_step_viewed', props);
  sendVercel('post_signup_step_viewed', { step: props.step, tier: props.tier ?? null });
}

/** Fired on the payment-success page — the client-side end of the funnel. */
export function trackCheckoutCompleted(props: { plan?: string; trial?: boolean }): void {
  const campaign = campaignOf();
  send('checkout_completed', { ...props, campaign });
  sendVercel('checkout_completed', {
    plan: props.plan ?? null,
    trial: props.trial ?? null,
    campaign,
  });
}

/** Fired when a plan card CTA is tapped on the subscriptions page. */
export function trackPlanSelected(props: { tier: string }): void {
  send('plan_selected', props);
  sendVercel('plan_selected', { tier: props.tier });
}

/** Fired when a public SEO page's in-content app CTA is clicked — measures
    whether SEO traffic converts, which Search Console can't see. */
export function trackSeoCtaClicked(props: { page: string; cta?: string }): void {
  send('seo_cta_clicked', props);
  sendVercel('seo_cta_clicked', { page: props.page, cta: props.cta ?? null });
}

/** Fired once when someone starts typing in the signup form — separates
    "form scared them off" from "never engaged with the form at all". */
export function trackSignupStarted(props?: { method?: string }): void {
  const campaign = campaignOf();
  send('signup_started', { ...props, campaign });
  sendVercel('signup_started', { method: props?.method ?? null, campaign });
}

/** Fired when an App Store / Play Store badge is clicked — the invisible half
    of the funnel where visitors choose native install over web signup. */
export function trackStoreBadgeClicked(props: {
  store: 'app_store' | 'play_store';
  page: string;
}): void {
  send('store_badge_clicked', props);
  sendVercel('store_badge_clicked', { store: props.store, page: props.page });
}

/** Fired once per visit when a public SEO tool is actually used (not just
    viewed) — ties content traffic to real engagement. */
export function trackSeoToolUsed(props: { tool: string; page?: string }): void {
  send('seo_tool_used', props);
  sendVercel('seo_tool_used', { tool: props.tool, page: props.page ?? null });
}

// ─── Cancel flow (pairs with cancel_survey_responses rows) ─────────
export function trackCancelFlowOpened(props?: { tier?: string }): void {
  send('cancel_flow_opened', props);
  sendVercel('cancel_flow_opened', { tier: props?.tier ?? null });
}

export function trackRetentionOfferShown(props: { offer: string }): void {
  send('retention_offer_shown', props);
  sendVercel('retention_offer_shown', { offer: props.offer });
}

export function trackRetentionOfferAccepted(props: { offer: string }): void {
  send('retention_offer_accepted', props);
  sendVercel('retention_offer_accepted', { offer: props.offer });
}

export function trackCancelConfirmed(props?: { reason?: string }): void {
  send('cancel_confirmed', props);
  sendVercel('cancel_confirmed', { reason: props?.reason ?? null });
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
