import isEqual from 'lodash/isEqual';

/**
 * Phantom-conflict detection for certificate optimistic locking.
 *
 * WHY THIS EXISTS
 * ───────────────
 * A save raises a conflict purely on `serverVersion > expectedVersion`. On a
 * flaky connection — a van, a plant room — a write can LAND on the server while
 * its acknowledgement is lost, so the next save sees a version it didn't
 * witness and alarms against the user's OWN data. Craig Soper spent 100 minutes
 * stuck in exactly that state on a live EICR, his board schedule trapped in the
 * browser.
 *
 * A version bump is not, by itself, a conflict. The only question that matters
 * is: **would keeping my copy lose anything that is committed on the server?**
 * If not, the "conflict" is a phantom — my own lost-ack write, or an older
 * subset — and the save should just proceed. If it would, a human genuinely
 * edited elsewhere and the user must decide.
 *
 * THE SAFETY INVARIANT
 * ────────────────────
 * `isServerContainedInLocal(server, local)` returns true only when every
 * meaningful value on the server is already present, identically, in local.
 * When that holds, overwriting the server row with `local` cannot destroy a
 * single committed value — local is a superset. That is the exact and only
 * condition under which auto-resolving by keeping local is provably safe.
 *
 * `false` is always the safe answer, so every ambiguity resolves to `false`
 * (show the dialog). This can never turn a real concurrent edit into silent
 * data loss; at worst it shows the dialog when it strictly need not have, which
 * is precisely today's behaviour — no regression, only fewer false alarms.
 *
 * Concretely:
 *   · a QS changes a field         → server holds a value local lacks → false → dialog
 *   · a QS adds an observation row  → server array element not in local → false → dialog
 *   · the user appends test rows    → local is a superset of server     → true  → heal
 *   · the identical data echoes back→ server deep-equals local           → true  → heal
 */

/** Empty-ish — treated as "the server holds nothing meaningful here". */
function isEmptyValue(v: unknown): boolean {
  if (v === null || v === undefined) return true;
  if (typeof v === 'string') return v.trim() === '';
  if (Array.isArray(v)) return v.length === 0;
  if (typeof v === 'object') return Object.keys(v as object).length === 0;
  return false;
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

/**
 * Is everything meaningful in `server` already present, identically, in `local`?
 *
 *  - empty-ish server value        → nothing to lose, skip (contained)
 *  - empty-ish local, non-empty server → server holds data local lacks → NOT contained
 *  - array  → every non-empty server element must deep-equal some local element
 *             (a superset local is contained; a server-only element is not)
 *  - object → recurse: server ⊆ local key by key
 *  - scalar → must deep-equal
 *
 * Deliberately conservative: any shape mismatch or missing value returns false.
 */
export function isServerContainedInLocal(server: unknown, local: unknown): boolean {
  // Judged before anything else: if the server holds nothing meaningful here,
  // there is nothing to lose regardless of what local is. This must come first,
  // so an object whose values are all empty-ish (via the per-key recursion
  // below) is contained even when local is absent.
  if (isEmptyValue(server)) return true;

  if (Array.isArray(server)) {
    // Server has real elements; local must be an array holding each of them.
    if (!Array.isArray(local)) return false;
    return server.every((se) => isEmptyValue(se) || local.some((le) => isEqual(se, le)));
  }

  if (isPlainObject(server)) {
    // Recurse per key. A non-object local is treated as {} so that empty-ish
    // server values still pass and any meaningful one fails at its leaf.
    const localObj = isPlainObject(local) ? local : {};
    return Object.keys(server).every((k) =>
      isServerContainedInLocal(server[k], localObj[k])
    );
  }

  // Server is a non-empty scalar. isEqual against an absent/blank local is
  // false, which is the safe answer.
  return isEqual(server, local);
}
