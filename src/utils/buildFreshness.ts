/**
 * buildFreshness
 *
 * Answers one question: is the build this page is running provably older than
 * the one the server is serving right now?
 *
 * Why it exists
 * -------------
 * A client left on a stale build fails in two different wordings depending on
 * the engine. Chrome/Edge and Safari say the import itself is bad —
 * "does not provide an export named 'x'", "Importing binding name 'x' is not
 * found" — and those strings are distinctive enough to match on. But when the
 * mismatched binding is only *read* at module-evaluation time, the engine
 * instead throws a plain `ReferenceError: Gauge is not defined`, which is
 * indistinguishable from a genuine bug. Sentry has both families side by side:
 * `Clock`, `GraduationCap`, `Zap`, `Gauge` and `Home` on the SEO guide pages,
 * every one of them correctly imported in source.
 *
 * Matching on "is not defined" would "fix" those by reloading — and would also
 * have swallowed two real bugs found the same week (`chipBase` missing from an
 * import list, and a stray `setSameAsClientAddress` call), turning a reported
 * crash into a silent reload. So the message is the wrong thing to key on.
 *
 * The build identity is the right thing. The document records which entry chunk
 * it loaded; the server will hand out the current one. If they differ, this
 * client is running code the server no longer serves and a reload is provably
 * the right move. If they match, the error is real and must be reported.
 *
 * Failure is biased towards "not stale" throughout: a false negative reports a
 * genuine error (correct), while a false positive would hide a real crash
 * behind a reload the user cannot escape.
 *
 * The service worker does not interfere. Its `NavigationRoute` matches only
 * `request.mode === 'navigate'`, and its other route is `/\.js$/` — a
 * programmatic `fetch('/')` matches neither and falls through to the network,
 * so this compares against the server rather than against the same precached
 * HTML that caused the problem.
 */

const FRESHNESS_TIMEOUT_MS = 3000;

/** The entry chunk this document actually loaded. */
function runningEntryPath(): string | null {
  try {
    const el = document.querySelector<HTMLScriptElement>('script[type="module"][src]');
    if (!el?.src) return null;
    return new URL(el.src, window.location.origin).pathname;
  } catch {
    return null;
  }
}

/** The entry chunk a freshly served index.html points at. */
function entryPathFromHtml(html: string): string | null {
  const match = html.match(/<script[^>]*\btype=["']module["'][^>]*\bsrc=["']([^"']+)["']/i);
  if (!match?.[1]) return null;
  try {
    return new URL(match[1], window.location.origin).pathname;
  } catch {
    return null;
  }
}

// One check per page load. Several chunks can fail in the same tick — the
// /auth/signup report was four errors in six seconds — and they must not become
// four requests, nor race to different answers.
let inFlight: Promise<boolean> | null = null;

/**
 * True only when the running entry chunk differs from the one being served.
 * Never throws; resolves false whenever the answer cannot be established.
 */
export function isStaleBuild(): Promise<boolean> {
  if (inFlight) return inFlight;

  inFlight = (async () => {
    const running = runningEntryPath();
    if (!running) return false;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FRESHNESS_TIMEOUT_MS);
    try {
      const res = await fetch(window.location.origin + '/', {
        cache: 'no-store',
        credentials: 'same-origin',
        headers: { accept: 'text/html' },
        signal: controller.signal,
      });
      if (!res.ok) return false;

      const live = entryPathFromHtml(await res.text());
      if (!live) return false;

      return live !== running;
    } catch {
      // Offline, aborted, blocked — cannot prove staleness, so do not claim it.
      return false;
    } finally {
      clearTimeout(timer);
    }
  })();

  return inFlight;
}

/**
 * A bare `ReferenceError: X is not defined` / `Can't find variable: X`.
 *
 * On its own this means nothing — it is equally the signature of a stale build
 * and of a genuinely missing import. It only narrows which errors are worth
 * spending a network round-trip on; `isStaleBuild()` decides.
 */
export function isUndefinedBindingError(error: unknown): boolean {
  if (!error) return false;
  const name = (error as Error)?.name || '';
  const message = (error as Error)?.message || '';
  if (name !== 'ReferenceError' && !/referenceerror/i.test(String(error))) return false;
  return /is not defined|can't find variable|cannot find variable/i.test(message);
}
