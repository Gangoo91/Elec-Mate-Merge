/**
 * Why a customer delete failed, in words the electrician can act on.
 * ────────────────────────────────────────────────────────────────────────
 * ELE-1736. Karthic Nandagopal could not delete a customer and got
 * "Failed to delete customer." — a fixed string, because both delete handlers
 * caught the error and never read it. With no code and no message there was
 * nothing to diagnose from, in the UI or in Sentry.
 *
 * The cause was a foreign key: `quotes.customer_id` was left at the default
 * ON DELETE NO ACTION, so any customer carrying a quote could never be removed.
 * 737 customers across 126 users were in that state, all seeing this same
 * dead-end toast. The constraints are now ON DELETE SET NULL, which is what
 * `reports` and `spark_projects` already did.
 *
 * This still exists because the class of fault will recur — a new child table
 * lands with the default referential action, or an RLS policy bites — and the
 * next person should be told which it was rather than guessing. A generic
 * message is the expensive part, not the failure.
 */

/** The bits of a PostgrestError worth showing or logging. */
interface DbErrorShape {
  code?: string;
  message?: string;
  details?: string;
}

function asDbError(error: unknown): DbErrorShape {
  if (!error || typeof error !== 'object') return {};
  const e = error as DbErrorShape;
  return { code: e.code, message: e.message, details: e.details };
}

/**
 * A description for the failure toast. Names the blocking table where Postgres
 * gave us one, because "this customer still has quotes attached" is actionable
 * and "Failed to delete customer" is not.
 */
export function describeCustomerDeleteError(error: unknown): string {
  const { code, message, details } = asDbError(error);

  // 23503 — foreign key violation. The detail line carries the child table, as
  // e.g. `Key (id)=(…) is still referenced from table "quotes".`
  if (code === '23503') {
    const table = /still referenced from table "([^"]+)"/.exec(details ?? message ?? '')?.[1];
    return table
      ? `This customer still has records in ${table.replace(/_/g, ' ')}. Remove or reassign those first.`
      : 'This customer still has linked records that must be removed or reassigned first.';
  }

  // 42501 — RLS or a missing grant. Not the user's to fix.
  if (code === '42501') {
    return 'You do not have permission to delete this customer. Please contact support.';
  }

  // Anything else: show what the database actually said rather than swallow it.
  return message
    ? `Could not delete this customer: ${message}`
    : 'Could not delete this customer. Please try again, or contact support if it persists.';
}

/** Structured context for `logger.error`, so Sentry carries the code. */
export function customerDeleteErrorContext(error: unknown, customerId: string) {
  const { code, message, details } = asDbError(error);
  return { customerId, code, message, details };
}
