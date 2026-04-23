// Shared response + observability helpers for LTI edge functions.
//
// Used by: lti-oidc-init, lti-launch, lti-deep-link (16.7).
//
// Provides:
//   - `cid()`               → correlation ID for threading through log events
//   - `logLtiEvent(...)`    → structured JSON log line (picked up by Supabase Log Explorer + Sentry pipeline)
//   - `htmlErrorPage(...)`  → branded HTML error page for browsers / iframes
//   - `jsonError(...)`      → JSON error for machine callers (curl, tests)
//   - `htmlBreakoutPage(...)` → breaks out of LMS iframe then redirects to magic link (Canvas/Moodle cookie fix)

export const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'content-type',
};

/** Generate a short correlation ID for tracing one launch through all logs. */
export function cid(): string {
  const b = new Uint8Array(9);
  crypto.getRandomValues(b);
  return 'lti_' + btoa(String.fromCharCode(...b)).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '');
}

/** Structured log line. One JSON object per line — easy to grep + pipe to Sentry. */
export function logLtiEvent(
  level: 'info' | 'warn' | 'error',
  event: string,
  meta: Record<string, unknown>
) {
  const line = JSON.stringify({
    ts: new Date().toISOString(),
    level,
    service: 'lti',
    event,
    ...meta,
  });
  // Route to the appropriate console method so Supabase colourises correctly.
  if (level === 'error') console.error(line);
  else if (level === 'warn') console.warn(line);
  else console.log(line);
}

/** Decide if the caller wants HTML (a browser/iframe) or JSON (curl/test). */
export function wantsHtml(req: Request): boolean {
  const accept = req.headers.get('accept') ?? '';
  return accept.includes('text/html') || !accept.includes('application/json');
}

/** Branded JSON error. */
export function jsonError(status: number, code: string, detail?: string, extras?: Record<string, unknown>) {
  const body: Record<string, unknown> = { error: code, detail, ...extras };
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, 'content-type': 'application/json' },
  });
}

/** Human-readable HTML error page. */
export function htmlErrorPage(args: {
  status: number;
  title: string;
  detail: string;
  errorCode: string;
  correlationId?: string;
  launchId?: string | null;
}): Response {
  const { status, title, detail, errorCode, correlationId, launchId } = args;

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(title)} · Elec-Mate</title>
<style>
  :root { color-scheme: dark; }
  *,*::before,*::after{box-sizing:border-box}
  body{margin:0;min-height:100vh;background:#0a0a0a;color:#fff;font:15px/1.55 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
       display:flex;align-items:center;justify-content:center;padding:24px}
  .card{max-width:520px;width:100%;background:hsl(0 0% 12%);border:1px solid rgba(255,255,255,0.06);border-radius:16px;padding:32px}
  .eyebrow{text-transform:uppercase;letter-spacing:0.18em;font-size:11px;font-weight:500;color:rgba(255,255,255,0.4);margin-bottom:8px}
  h1{margin:0 0 12px;font-size:22px;font-weight:600;letter-spacing:-0.01em}
  p{margin:0 0 16px;color:rgba(255,255,255,0.7)}
  .err{display:inline-block;font-family:ui-monospace,Menlo,monospace;font-size:12px;background:rgba(239,68,68,0.1);color:#f87171;
       border:1px solid rgba(239,68,68,0.2);border-radius:999px;padding:4px 10px;margin-bottom:20px}
  .meta{margin-top:24px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.06);font-family:ui-monospace,Menlo,monospace;font-size:11px;color:rgba(255,255,255,0.35);word-break:break-all}
  .meta div{margin-bottom:4px}
  .meta b{color:rgba(255,255,255,0.55);font-weight:500}
  .cta{display:inline-block;margin-top:12px;padding:10px 18px;background:#facc15;color:#0a0a0a;font-weight:500;
       border-radius:999px;text-decoration:none;font-size:14px}
  .cta:hover{background:#eab308}
</style>
</head>
<body>
<div class="card" role="alert" aria-live="polite">
  <div class="eyebrow">LTI Launch</div>
  <h1>${escapeHtml(title)}</h1>
  <div class="err">${escapeHtml(errorCode)}</div>
  <p>${escapeHtml(detail)}</p>
  <p style="color:rgba(255,255,255,0.55);font-size:13px">
    Please contact your college IT administrator and share the reference code below.
  </p>
  <div class="meta">
    ${correlationId ? `<div><b>Correlation:</b> ${escapeHtml(correlationId)}</div>` : ''}
    ${launchId ? `<div><b>Launch ID:</b> ${escapeHtml(launchId)}</div>` : ''}
    <div><b>Status:</b> ${status}</div>
    <div><b>Time:</b> ${new Date().toISOString()}</div>
  </div>
</div>
</body>
</html>`;

  // NOTE: Supabase edge runtime enforces `content-security-policy: default-src 'none'; sandbox`
  // and overrides content-type to text/plain. That means this HTML renders as
  // plain text in browsers — still far more useful than raw JSON, but not
  // styled. For proper styled error pages we'd need an app-hosted route.
  return new Response(html, {
    status,
    headers: {
      ...CORS_HEADERS,
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}

/**
 * Serves an intermediate HTML page that forces the LTI launch OUT of an
 * iframe before hitting the Supabase magic-link verify URL. Without this,
 * third-party cookie policies in Safari + strict Chrome block the session
 * cookie from being set when Canvas/Moodle embeds us in an iframe.
 *
 * The page:
 *   1. If we're in an iframe, sets window.top.location.href to the magic link.
 *   2. If we're top-level already, does a plain window.location replace.
 *   3. Offers a manual "Continue" button as fallback if JS is blocked.
 */
export function htmlBreakoutPage(magicLinkUrl: string): Response {
  const safeUrl = escapeHtml(magicLinkUrl);
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Opening Elec-Mate…</title>
<style>
  :root { color-scheme: dark; }
  body{margin:0;min-height:100vh;background:#0a0a0a;color:#fff;font:15px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
       display:flex;align-items:center;justify-content:center;padding:24px}
  .card{max-width:440px;width:100%;background:hsl(0 0% 12%);border:1px solid rgba(255,255,255,0.06);border-radius:16px;padding:32px;text-align:center}
  .spinner{width:36px;height:36px;margin:0 auto 20px;border:3px solid rgba(255,255,255,0.1);border-top-color:#facc15;border-radius:50%;animation:spin 0.8s linear infinite}
  @keyframes spin{to{transform:rotate(360deg)}}
  h1{margin:0 0 8px;font-size:18px;font-weight:600}
  p{margin:0 0 20px;color:rgba(255,255,255,0.6);font-size:13px}
  .cta{display:inline-block;padding:10px 20px;background:#facc15;color:#0a0a0a;font-weight:500;border-radius:999px;text-decoration:none;font-size:14px}
  .cta:hover{background:#eab308}
  noscript p{color:#f87171;margin-top:16px}
</style>
</head>
<body>
<div class="card">
  <div class="spinner" aria-hidden="true"></div>
  <h1>Opening Elec-Mate…</h1>
  <p>Finalising your secure sign-in from the LMS.</p>
  <a id="cta" class="cta" href="${safeUrl}" target="_top" rel="noopener">Continue →</a>
  <noscript>
    <p>JavaScript is disabled. Click <strong>Continue</strong> above to finish signing in.</p>
  </noscript>
</div>
<script>
  (function () {
    var target = ${JSON.stringify(magicLinkUrl)};
    try {
      // If embedded in an iframe, break out to the top window so Supabase
      // auth cookies are set first-party for our target domain.
      if (window.top && window.top !== window.self) {
        window.top.location.href = target;
      } else {
        window.location.replace(target);
      }
    } catch (e) {
      // Cross-origin access to window.top fails: fall back to _top anchor click.
      document.getElementById('cta').click();
    }
  })();
</script>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      ...CORS_HEADERS,
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store',
      // Allow-scripts so our iframe-breakout JS can run. Without this, Supabase
      // edge runtime applies a maximally-restrictive sandbox CSP that prevents
      // scripts entirely.
      'content-security-policy':
        "default-src 'self'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; connect-src https:",
    },
  });
}

function escapeHtml(s: string): string {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
