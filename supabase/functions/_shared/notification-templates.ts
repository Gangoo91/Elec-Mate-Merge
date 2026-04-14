/**
 * Centralised notification templates. One source of truth for every push
 * the app sends — copy, deep link, and payload metadata live here so we
 * never ship a broken push and every surface uses the same wording.
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
    title: '🦺 RAMS sorted in 2 minutes flat',
    body: 'Know another sparky still writing these by hand? Refer them — you both get a month free.',
    ...referralBase(),
  }),

  /** Fired after any certificate report is marked complete. */
  cert_completed: (certType?: string): PushTemplate => ({
    title: certType ? `${certType} signed off ✅` : 'Cert signed off ✅',
    body: 'Share Elec-Mate with a mate — you both get a month free on us.',
    ...referralBase(),
  }),

  /** Fired the first time a quote is sent (not on later edits). */
  quote_sent: (clientName?: string): PushTemplate => ({
    title: clientName ? `Quote away to ${clientName} 📨` : 'Quote sent 📨',
    body: 'Know another electrician who could do with AI-built quotes? Refer them and both get a free month.',
    ...referralBase(),
  }),

  /** Fired the first time an invoice is raised. */
  invoice_sent: (clientName?: string): PushTemplate => ({
    title: clientName ? `Invoice out to ${clientName} 🧾` : 'Invoice raised 🧾',
    body: 'Your mates still chasing payment on WhatsApp? Refer them — both get a free month.',
    ...referralBase(),
  }),

  /** Fired after an apprentice completes their 3rd mock exam. */
  three_mock_exams: (): PushTemplate => ({
    title: '3 mock exams crushed 💪',
    body: 'Know another apprentice prepping for AM2? Refer them — both get a free month.',
    ...referralBase(),
  }),

  /** Fired after an AI specialist job completes (design / install / commission / cost). */
  ai_design_completed: (specialistName?: string): PushTemplate => ({
    title: specialistName ? `${specialistName} has finished ⚡` : 'AI design ready ⚡',
    body: 'Refer a mate who still designs circuits by hand — both get a free month of Elec-Mate.',
    ...referralBase(),
  }),

  /** Weekly cadence fallback — sent to active users who had no value moment. */
  cadence_weekly: (): PushTemplate => ({
    title: 'Know a sparky who needs Elec-Mate?',
    body: 'Refer a mate — both of you get a free month. Takes 10 seconds.',
    ...referralBase(),
  }),
};

// ============================================================================
// Tier 1 — Transactional (real events, fire instantly, unlimited)
// ============================================================================

export const transactionalTemplates = {
  quote_signed: (clientName: string, amountGbp: string, quoteId: string): PushTemplate => ({
    title: `${clientName} signed your quote 🎉`,
    body: `${amountGbp} — tap to send the invoice.`,
    type: 'quote',
    data: {
      quoteId,
      action: 'send_invoice',
      category: 'quote_signed',
    },
  }),

  invoice_paid: (clientName: string, amountGbp: string, invoiceId: string): PushTemplate => ({
    title: `💰 ${clientName} paid you`,
    body: `${amountGbp} cleared — top job.`,
    type: 'invoice',
    data: {
      invoiceId,
      category: 'invoice_paid',
    },
  }),

  cert_c1_detected: (propertyAddress: string, reportId: string): PushTemplate => ({
    title: '⚠️ C1 hazard detected',
    body: `Immediate action needed at ${propertyAddress}. Tap to review.`,
    type: 'certificate',
    data: {
      reportId,
      category: 'cert_c1_detected',
      severity: 'critical',
    },
    skipQuietHours: true,
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
    title: `Your ${certType} draft is waiting`,
    body: `${propertyAddress} — 2 minutes to finish.`,
    type: 'certificate',
    data: {
      reportId,
      category: 'draft_cert_reminder',
      action: 'resume_draft',
    },
  }),

  cert_expiring: (certType: string, daysLeft: number, propertyAddress: string): PushTemplate => ({
    title: `${certType} expiring in ${daysLeft} days`,
    body: `${propertyAddress} — renewal opportunity.`,
    type: 'certificate',
    data: {
      category: 'cert_expiring',
      days_left: daysLeft,
    },
  }),

  apprentice_pick_up: (sectionTitle: string, sectionPath: string): PushTemplate => ({
    title: 'Pick up where you left off 📚',
    body: `${sectionTitle} — 2 minutes to finish.`,
    type: 'study',
    data: {
      category: 'apprentice_pick_up',
      deep_link: sectionPath,
    },
  }),
};

// ============================================================================
// Tier 2 — Morning digest (built dynamically by morning-digest function)
// ============================================================================

export interface DigestSection {
  priority: number; // lower = higher priority, used for ordering
  line: string;
}

/**
 * Build a single morning-brief push from a list of sections. Returns null if
 * the digest would be empty (we never send fluff). The push is capped at ~3
 * lines because iOS lock screen truncates after that.
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

  const greeting = firstName ? `Good morning ${firstName}` : 'Good morning';
  const body = relevant.length === 1 ? relevant[0] : relevant.map((l) => `• ${l}`).join('\n');

  return {
    title: `${greeting} —`,
    body,
    type: 'briefing',
    data: {
      category: 'morning_digest',
      section_count: relevant.length,
    },
  };
}
