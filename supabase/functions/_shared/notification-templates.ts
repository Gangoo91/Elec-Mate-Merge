/**
 * Centralised notification templates. One source of truth for every push
 * the app sends — copy, deep link, and payload metadata live here so we
 * never ship a broken push and every surface uses the same wording.
 *
 * House style (best-in-class, like Apple / Monzo / Stripe):
 *   - No emojis. The app icon + "Elec-Mate" already brand every push.
 *   - Title = the fact; body = the detail + one clear action ("Tap to …").
 *   - Specific over decorative: real names, amounts and addresses.
 *   - Sentence case, plain professional English, no slang.
 *
 * Template naming convention: <tier>__<event>
 *   tier      = transactional | digest | reengagement | promo
 *   event     = a stable, dot-separated identifier for the event
 *
 * Every template returns the exact shape expected by send-push-notification:
 *   { title, body, type, data, skipQuietHours? }
 */

export interface PushTemplate {
  title: string;
  body: string;
  type:
    | 'peer'
    | 'job'
    | 'team'
    | 'college'
    | 'quote'
    | 'invoice'
    | 'application'
    | 'vacancy'
    | 'certificate'
    | 'task'
    | 'study'
    | 'mental_health'
    | 'assessment'
    | 'briefing'
    | 'default';
  data?: Record<string, unknown>;
  skipQuietHours?: boolean;
}

// ============================================================================
// Tier 4 — Refer a friend
// ============================================================================
// Each trigger gets its own tailored copy so the CTA feels fresh, not generic.
// All of them deep link to /settings?tab=referrals where the share sheet lives.

const referralBase = (deepLink = '/settings?tab=referrals') => ({
  type: 'default' as const,
  data: {
    category: 'referral_push',
    action: 'open_referral',
    deep_link: deepLink,
  },
});

export const referralTemplates = {
  /** Fired within 30 min of a RAMS being generated (AI Site Safety). */
  rams_completed: (): PushTemplate => ({
    title: 'RAMS completed',
    body: 'Know a colleague still writing these by hand? Refer them and you both get a month free.',
    ...referralBase(),
  }),

  /** Fired after any certificate report is marked complete. */
  cert_completed: (certType?: string): PushTemplate => ({
    title: certType ? `${certType} signed off` : 'Certificate signed off',
    body: 'Refer a colleague to Elec-Mate and you both get a month free.',
    ...referralBase(),
  }),

  /** Fired the first time a quote is sent (not on later edits). */
  quote_sent: (clientName?: string): PushTemplate => ({
    title: clientName ? `Quote sent to ${clientName}` : 'Quote sent',
    body: 'Know an electrician who would value AI-built quotes? Refer them — you both get a free month.',
    ...referralBase(),
  }),

  /** Fired the first time an invoice is raised. */
  invoice_sent: (clientName?: string): PushTemplate => ({
    title: clientName ? `Invoice sent to ${clientName}` : 'Invoice raised',
    body: 'Refer an electrician to Elec-Mate and you both get a free month.',
    ...referralBase(),
  }),

  /** Fired after an apprentice completes their 3rd mock exam. */
  three_mock_exams: (): PushTemplate => ({
    title: 'Three mock exams complete',
    body: 'Know an apprentice preparing for AM2? Refer them — you both get a free month.',
    ...referralBase(),
  }),

  /** Fired after an AI specialist job completes (design / install / commission / cost). */
  ai_design_completed: (specialistName?: string): PushTemplate => ({
    title: specialistName ? `${specialistName} has finished` : 'Your AI design is ready',
    body: 'Refer a colleague who still designs circuits by hand — you both get a free month.',
    ...referralBase(),
  }),

  /** Weekly cadence fallback — sent to active users who had no value moment. */
  cadence_weekly: (): PushTemplate => ({
    title: 'Refer a colleague to Elec-Mate',
    body: 'You both get a free month. It takes about ten seconds.',
    ...referralBase(),
  }),
};

// ============================================================================
// Tier 1 — Transactional (real events, fire instantly, unlimited)
// ============================================================================

export const transactionalTemplates = {
  quote_signed: (clientName: string, amountGbp: string, quoteId: string): PushTemplate => ({
    title: `${clientName} accepted your quote`,
    body: `${amountGbp}. Tap to raise the invoice.`,
    type: 'quote',
    data: {
      quoteId,
      action: 'send_invoice',
      category: 'quote_signed',
    },
  }),

  invoice_paid: (clientName: string, amountGbp: string, invoiceId: string): PushTemplate => ({
    title: `${clientName} has paid`,
    body: `${amountGbp} cleared. Tap to view.`,
    type: 'invoice',
    data: {
      invoiceId,
      category: 'invoice_paid',
    },
  }),

  peer_message: (senderName: string, preview: string, conversationId: string): PushTemplate => ({
    title: senderName,
    body: preview,
    type: 'peer',
    data: {
      conversationId,
      category: 'peer_message',
    },
  }),
};

// ============================================================================
// Tier 3 — Re-engagement (smart, capped with Tier 4 to ≤2/day)
// ============================================================================

export const reengagementTemplates = {
  draft_cert_reminder: (
    certType: string,
    propertyAddress: string,
    reportId: string
  ): PushTemplate => ({
    title: `Finish your ${certType}`,
    body: `${propertyAddress} — about two minutes to complete.`,
    type: 'certificate',
    data: {
      reportId,
      category: 'draft_cert_reminder',
      action: 'resume_draft',
    },
  }),

  cert_expiring: (certType: string, daysLeft: number, propertyAddress: string): PushTemplate => ({
    title: `${certType} expires in ${daysLeft} days`,
    body: `${propertyAddress} — book the renewal.`,
    type: 'certificate',
    data: {
      category: 'cert_expiring',
      days_left: daysLeft,
    },
  }),

  apprentice_pick_up: (sectionTitle: string, sectionPath: string): PushTemplate => ({
    title: 'Continue your training',
    body: `${sectionTitle} — about two minutes to finish.`,
    type: 'study',
    data: {
      category: 'apprentice_pick_up',
      deep_link: sectionPath,
    },
  }),
};

// ============================================================================
// Tier 2 — Morning brief (built dynamically by the morning digest function)
// ============================================================================

export interface DigestSection {
  priority: number; // lower = higher priority, used for ordering
  line: string;
}

/**
 * Build a single morning-brief push from a list of sections. Returns null if
 * the digest would be empty (we never send filler — a quiet morning sends
 * nothing, so when it fires it always means something). Capped at ~3 lines
 * because the iOS lock screen truncates after that.
 */
export function buildMorningDigest(
  firstName: string,
  sections: DigestSection[]
): PushTemplate | null {
  const relevant = sections
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 3)
    .map((s) => s.line);

  if (relevant.length === 0) return null;

  const greeting = firstName ? `Good morning, ${firstName}` : 'Good morning';
  // One section reads as a sentence; multiple become a tidy bulleted brief.
  const body = relevant.length === 1 ? relevant[0] : relevant.map((l) => `• ${l}`).join('\n');

  return {
    title: greeting,
    body,
    type: 'briefing',
    data: {
      category: 'morning_digest',
      section_count: relevant.length,
    },
  };
}
