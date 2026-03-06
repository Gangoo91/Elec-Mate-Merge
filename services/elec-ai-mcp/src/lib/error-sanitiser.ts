/**
 * Error message sanitiser.
 * Strips internal infrastructure details from error messages before they
 * reach the agent or end user. Preserves the essential meaning of the error
 * while removing table names, URLs, stack traces, and provider references.
 *
 * SECURITY.md §2 / ELE-249
 */

// ── Patterns to strip ──────────────────────────────────────────────────

const INTERNAL_PATTERNS: Array<{ pattern: RegExp; replacement: string }> = [
  // Supabase/PostgreSQL table and column names
  { pattern: /\b(from|into|table|relation)\s+["']?\w+["']?/gi, replacement: 'the database' },
  { pattern: /column\s+["']\w+["']/gi, replacement: 'a field' },
  { pattern: /violates\s+\w+_constraint\s+["']\w+["']/gi, replacement: 'a data constraint' },
  { pattern: /foreign key constraint ["']\w+["']/gi, replacement: 'a data relationship' },

  // Supabase URLs
  { pattern: /https?:\/\/[a-z0-9]+\.supabase\.co\S*/gi, replacement: '[internal-url]' },
  { pattern: /https?:\/\/127\.0\.0\.1:\d+\S*/gi, replacement: '[internal-url]' },
  { pattern: /https?:\/\/localhost:\d+\S*/gi, replacement: '[internal-url]' },

  // Edge function names
  { pattern: /edge function\s*['"]?\w[\w-]*['"]?/gi, replacement: 'an internal service' },
  { pattern: /functions\/v1\/[\w-]+/gi, replacement: 'an internal service' },

  // Stack traces and file paths
  { pattern: /at\s+\S+\s+\([^)]+\)/g, replacement: '' },
  { pattern: /\/[\w./\\-]+\.(ts|js|mjs):\d+:\d+/g, replacement: '[internal]' },
  { pattern: /\/home\/\S+/g, replacement: '[internal]' },
  { pattern: /\/opt\/\S+/g, replacement: '[internal]' },

  // Provider/infrastructure names
  { pattern: /\bOpenClaw\b/gi, replacement: 'the messaging system' },
  { pattern: /\bSupabase\b/gi, replacement: 'the database' },
  { pattern: /\bHetzner\b/gi, replacement: 'the server' },
  { pattern: /\bAnthropic\b/gi, replacement: 'the AI provider' },
  { pattern: /\bOpenAI\b/gi, replacement: 'the AI provider' },
  { pattern: /\bClaude\b/gi, replacement: 'the AI provider' },

  // PostgreSQL error codes
  { pattern: /PGRST\d+/g, replacement: 'DB_ERROR' },
  { pattern: /\b\d{5}\b(?=.*error)/gi, replacement: '' },

  // UUID leak prevention (keep only first 8 chars if in error context)
  // Don't strip UUIDs entirely as they may be user-facing IDs
];

// ── Known error → friendly message mappings ────────────────────────────

const FRIENDLY_MESSAGES: Array<{ test: RegExp; message: string }> = [
  { test: /row-level security/i, message: 'You do not have permission to access this data' },
  { test: /JWT expired/i, message: 'Your session has expired — please try again' },
  { test: /duplicate key/i, message: 'This record already exists' },
  { test: /not found/i, message: 'The requested item was not found' },
  { test: /violates not-null/i, message: 'A required field is missing' },
  { test: /violates unique/i, message: 'This record already exists' },
  { test: /violates check/i, message: 'The provided value is not valid' },
  { test: /timeout|timed out/i, message: 'The request timed out — please try again' },
  {
    test: /ECONNREFUSED|ENOTFOUND/i,
    message: 'A service is temporarily unavailable — please try again',
  },
  { test: /rate limit/i, message: 'Too many requests — please slow down' },
  { test: /permission denied/i, message: 'You do not have permission to perform this action' },
];

/**
 * Sanitise an error message for external consumption.
 * Returns a clean message with no internal infrastructure details.
 */
export function sanitiseError(rawMessage: string): string {
  if (!rawMessage) return 'An unexpected error occurred';

  // Check for known friendly message mappings first
  for (const { test, message } of FRIENDLY_MESSAGES) {
    if (test.test(rawMessage)) {
      return message;
    }
  }

  // Apply pattern-based sanitisation
  let sanitised = rawMessage;
  for (const { pattern, replacement } of INTERNAL_PATTERNS) {
    sanitised = sanitised.replace(pattern, replacement);
  }

  // Clean up whitespace from removals
  sanitised = sanitised.replace(/\s{2,}/g, ' ').trim();

  // If the message is now mostly empty or just punctuation, return generic
  if (sanitised.length < 5 || /^[\s.,;:!?-]+$/.test(sanitised)) {
    return 'An unexpected error occurred';
  }

  return sanitised;
}

/**
 * Extract the raw error message from an Error or unknown value.
 * Used internally — the raw message should NOT be returned to users.
 */
export function extractErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === 'string') return err;
  return String(err);
}
