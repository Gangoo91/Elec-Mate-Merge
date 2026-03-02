/**
 * Edge function access guard — SECURITY.md §14
 *
 * Blocks agent access to admin-* and other platform-level edge functions.
 * Only functions on the allowlist can be called by agent tool handlers.
 */

/** Functions the agent is explicitly allowed to call */
const ALLOWED_FUNCTIONS = new Set([
  // Calendar
  'agent-read-calendar',
  'agent-create-calendar-event',
  'agent-get-availability',
  // Quoting
  'ai-quote-generator',
  'generate-pdf-monkey',
  'send-quote-resend',
  'quote-automated-followup',
  'quote-email-tracking',
  // Certificates
  'generate-eic-pdf',
  'generate-eicr-pdf',
  'generate-minor-works-pdf',
  'generate-ev-charging-pdf',
  'generate-fire-alarm-pdf',
  'generate-emergency-lighting-pdf',
  'generate-pat-testing-pdf',
  'generate-solar-pv-pdf',
  'send-certificate-resend',
  'send-expiry-reminders',
  // Invoicing
  'send-invoice-resend',
  // RAMS & Compliance — agent uses create_rams MCP tool (not direct edge calls)
  'create-rams-job',
  'health-safety-v3',
  'generate-rams-pdf',
  'generate-combined-rams-pdf',
  'generate-method-statement-pdf',
  'submit-part-p-notification',
  // Expenses & Accounting
  'accounting-sync-expense',
  // Email
  'oauth-email-init',
  'read-email-inbox',
  'categorise-email-enquiry',
  'draft-email-reply',
  'send-agent-email-resend',
  // Knowledge / RAG
  'bs7671-rag-search',
  'multi-source-rag-search',
  'search-pricing-rag',
  // Elec-ID
  'share-elec-id',
  // Documents
  'generate-temporary-pdf-link',
  'generate-client-portal-link',
  // Apprentice
  'generate-practice-questions',
  'analyze-diary-entry',
  'review-portfolio-submission',
  'validate-evidence-quality',
  'epa-knowledge-quiz',
  'epa-professional-discussion',
  'am2-simulator',
  'find-training-providers',
  // Agent memory
  'sync-agent-memory',
]);

/** Patterns that are always blocked */
const BLOCKED_PREFIXES = ['admin-'];

export class EdgeFunctionBlockedError extends Error {
  constructor(functionName: string) {
    super(`Edge function '${functionName}' is not allowed for agent access`);
    this.name = 'EdgeFunctionBlockedError';
  }
}

/**
 * Check if an edge function is allowed to be called by agent tools.
 * Throws EdgeFunctionBlockedError if blocked.
 */
export function validateEdgeFunctionAccess(functionName: string): void {
  // Block admin functions
  for (const prefix of BLOCKED_PREFIXES) {
    if (functionName.startsWith(prefix)) {
      throw new EdgeFunctionBlockedError(functionName);
    }
  }

  // Must be on allowlist
  if (!ALLOWED_FUNCTIONS.has(functionName)) {
    throw new EdgeFunctionBlockedError(functionName);
  }
}
