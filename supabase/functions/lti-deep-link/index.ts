/**
 * LTI 1.3 Deep Linking — content selection, and the signed response back.
 * ────────────────────────────────────────────────────────────────────────
 * 🔴 THIS FILE WAS DEPLOYED FOR EIGHT MONTHS WITHOUT EXISTING IN THE REPO.
 *
 * Live at v92 since 6 January 2026, present only on Supabase's servers. No
 * lint, no typecheck, no CI, no code review, no git history — and a redeploy
 * from a clean checkout would have silently erased it. It was recovered with
 * `supabase functions download` on 20 Sep 2026 and committed here so that the
 * next person to pick LTI up inherits something they can read and change.
 *
 * ⚠️ Nothing has ever run through it: `lti_platforms` and `lti_tool_keys` are
 * both EMPTY, and `lti-launch` returns 501 for deep linking before reaching
 * here. It is kept because LTI will be used when a college signs (ELE-1712),
 * not because it works today.
 *
 * WHAT WAS WRONG, AND IS NOW FIXED
 *
 * The response JWT was signed with `platform.private_key`, falling back to an
 * UNSIGNED `{"alg":"none"}` token when that failed. Two things about that:
 *
 *   1. `lti_platforms` HAS NO `private_key` COLUMN. So the signing branch
 *      could never be taken and the unsigned path was not a fallback — it was
 *      the only behaviour. Every response this function ever produced would
 *      have been unsigned.
 *   2. It is the wrong key regardless. In LTI 1.3 the TOOL signs its own
 *      DeepLinkingResponse with the TOOL's private key, and the platform
 *      verifies it against our JWKS endpoint (`lti-jwks`). We should never
 *      hold a platform's private key, and signing with one would make the
 *      response unverifiable by the platform that sent it.
 *
 * Now: signed with OUR active key, and a missing key is a hard failure rather
 * than an unsigned token. No real LMS accepts `alg: none` — the old path could
 * only ever have produced a rejected launch or, worse, been accepted by
 * something misconfigured.
 *
 * 🔴 STILL OPEN, AND MADE SHARPER BY THE ABOVE: THERE IS NO AUTHENTICATION.
 *
 * This function runs on the service-role key and never establishes who is
 * calling. While every response was unsigned that was merely useless. Now that
 * it signs properly, an unauthenticated POST can obtain a validly-signed
 * DeepLinkingResponse from us containing content items of the caller's
 * choosing.
 *
 * Two things hold that shut today and NEITHER is a control:
 *   - `lti_platforms` is empty, so `platform_id` never resolves and it 404s.
 *   - `lti-launch` returns 501 for deep linking before anything reaches here.
 *
 * Both stop being true the moment a college is onboarded. Before this endpoint
 * is exposed to a real platform it needs the proper flow: the platform sends a
 * signed LtiDeepLinkingRequest, we verify it with `_shared/lti-verify.ts` the
 * way `lti-launch` already does, and the response is issued only against a
 * verified request — echoing its `data` claim, which is what the parameter
 * below is for.
 *
 * Not built here deliberately. It cannot be tested without a real platform,
 * and guessing at a security flow that has never been exercised is how the
 * `alg: none` path got written in the first place.
 */
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import * as jose from 'https://deno.land/x/jose@v5.2.0/index.ts';

/**
 * RS256 throughout. Named once so the env path, the table filter and the JWT
 * header cannot disagree — a token signed with one algorithm and labelled
 * another is rejected by every platform, and the error it produces says
 * nothing useful about why.
 */
const SIGNING_ALG = 'RS256';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContentItem {
  type: 'ltiResourceLink';
  title: string;
  text?: string;
  url: string;
  icon?: { url: string; width?: number; height?: number };
  thumbnail?: { url: string; width?: number; height?: number };
  custom?: Record<string, string>;
  lineItem?: {
    scoreMaximum: number;
    label: string;
    tag?: string;
    resourceId?: string;
  };
}

/**
 * The tool's own active signing key.
 *
 * Two sources, in order, because the deployment has historically used the env
 * var and the schema anticipates rotation:
 *
 *   1. `LTI_JWKS_JSON` — what `lti-jwks` already publishes. Read from the same
 *      place so the `kid` in the token and the `kid` in the published JWKS
 *      cannot drift apart. A platform that cannot match them rejects the
 *      launch, and that is a miserable thing to debug.
 *   2. `lti_tool_keys` where `is_active` — the table built for rotation, with
 *      `expires_at` honoured so a retired key cannot be picked up again.
 *
 * Returns null rather than throwing. The caller turns that into a 503 with a
 * message naming the fix, which is more use than a stack trace.
 */
async function loadToolSigningKey(
  // deno-lint-ignore no-explicit-any
  supabase: any
): Promise<{ kid: string; key: jose.KeyLike } | null> {
  const raw = Deno.env.get('LTI_JWKS_JSON');
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      const keys: Record<string, unknown>[] = Array.isArray(parsed?.keys) ? parsed.keys : [];
      // `d` is the RSA private exponent. A key without it is public-only and
      // cannot sign — which is the normal shape for a PUBLISHED jwks, so this
      // filter is what lets the same env var serve both purposes.
      const jwk = keys.find((k) => k?.d && k?.kid);
      if (jwk) {
        const imported = await jose.importJWK(jwk as jose.JWK, SIGNING_ALG);
        // importJWK returns KeyLike | Uint8Array; the Uint8Array case is for
        // symmetric secrets. Asserting instead of checking would hide a
        // misconfigured key behind a confusing signing error later.
        if (imported instanceof Uint8Array) {
          console.error(
            '[lti-deep-link] LTI_JWKS_JSON holds a symmetric key — RS256 needs an RSA key'
          );
        } else {
          return { kid: String(jwk.kid), key: imported };
        }
      }
    } catch (e) {
      console.error('[lti-deep-link] LTI_JWKS_JSON is present but unusable:', e);
      // Fall through to the table rather than failing outright — a malformed
      // env var should not take out a correctly configured database key.
    }
  }

  try {
    const { data } = await supabase
      .from('lti_tool_keys')
      .select('kid, private_key, expires_at')
      .eq('is_active', true)
      .eq('algorithm', SIGNING_ALG)
      .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (data?.kid && data?.private_key) {
      return { kid: data.kid, key: await jose.importPKCS8(data.private_key, SIGNING_ALG) };
    }
  } catch (e) {
    console.error('[lti-deep-link] could not read lti_tool_keys:', e);
  }

  return null;
}

/**
 * Escape a value being interpolated into an HTML attribute.
 *
 * `return_url` arrives from the request and was written straight into the
 * form's `action`. A crafted value closes the attribute and injects markup
 * into a page we then auto-submit — and this endpoint is reachable without
 * authentication.
 */
function escapeHtmlAttribute(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const appUrl = Deno.env.get('APP_URL') || 'https://elec-mate.uk';
    const url = new URL(req.url);

    // Handle content selection request from LMS
    if (req.method === 'GET') {
      const platformId = url.searchParams.get('platform_id');
      const returnUrl = url.searchParams.get('return_url');

      // Return an HTML page with content selection UI
      const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Select Elec-Mate Content</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif; background: #0f172a; color: #e2e8f0; padding: 20px; }
    .container { max-width: 800px; margin: 0 auto; }
    h1 { color: #fbbf24; margin-bottom: 20px; }
    .content-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px; }
    .content-card { background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 20px; cursor: pointer; transition: all 0.2s; }
    .content-card:hover { border-color: #fbbf24; transform: translateY(-2px); }
    .content-card.selected { border-color: #fbbf24; background: #1e293b; box-shadow: 0 0 0 2px #fbbf24; }
    .card-icon { font-size: 32px; margin-bottom: 12px; }
    .card-title { font-size: 18px; font-weight: 600; margin-bottom: 8px; }
    .card-desc { font-size: 14px; color: #94a3b8; }
    .btn { background: #fbbf24; color: #0f172a; border: none; padding: 12px 24px; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; margin-top: 20px; }
    .btn:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn:hover:not(:disabled) { background: #f59e0b; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Select Content to Add</h1>
    <p style="color: #94a3b8; margin-bottom: 24px;">Choose what you'd like to embed in your course</p>
    
    <div class="content-grid" id="contentGrid">
      <div class="content-card" data-type="portfolio" data-title="Student Portfolio" data-url="${appUrl}/college/portfolio">
        <div class="card-icon">📁</div>
        <div class="card-title">Student Portfolio</div>
        <div class="card-desc">Access the full portfolio management hub with submission tracking</div>
      </div>
      
      <div class="content-card" data-type="submit" data-title="Submit Portfolio" data-url="${appUrl}/apprentice/ojt?tab=submit">
        <div class="card-icon">📤</div>
        <div class="card-title">Portfolio Submission</div>
        <div class="card-desc">Direct link for students to submit their portfolio work</div>
      </div>
      
      <div class="content-card" data-type="review" data-title="Review Queue" data-url="${appUrl}/college/portfolio?tab=review">
        <div class="card-icon">✅</div>
        <div class="card-title">Review Queue</div>
        <div class="card-desc">Assessor view for reviewing pending submissions</div>
      </div>
      
      <div class="content-card" data-type="iqa" data-title="IQA Sampling" data-url="${appUrl}/college/portfolio?tab=iqa">
        <div class="card-icon">🔍</div>
        <div class="card-title">IQA Sampling</div>
        <div class="card-desc">Internal Quality Assurance sampling dashboard</div>
      </div>
      
      <div class="content-card" data-type="epa" data-title="EPA Gateway" data-url="${appUrl}/college/portfolio?view=gateway">
        <div class="card-icon">🎓</div>
        <div class="card-title">EPA Gateway</div>
        <div class="card-desc">End Point Assessment gateway checklist</div>
      </div>
      
      <div class="content-card" data-type="ojt" data-title="OJT Tracking" data-url="${appUrl}/apprentice/ojt">
        <div class="card-icon">⏱️</div>
        <div class="card-title">OJT Time Tracking</div>
        <div class="card-desc">Off-the-job training hour tracker</div>
      </div>
    </div>
    
    <button class="btn" id="submitBtn" disabled onclick="submitSelection()">Add Selected Content</button>
  </div>
  
  <script>
    let selectedCard = null;
    /* Both values come from the query string and are injected into JS here.
       JSON.stringify, not quote-wrapping: a value containing an apostrophe
       closed the literal and ran as code, on an endpoint that needs no auth.
       HTML-attribute escaping does not help in a script context — this is the
       right tool for it. */
    const returnUrl = ${JSON.stringify(returnUrl || '')};
    const platformId = ${JSON.stringify(platformId || '')};
    
    document.querySelectorAll('.content-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.content-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedCard = card;
        document.getElementById('submitBtn').disabled = false;
      });
    });
    
    async function submitSelection() {
      if (!selectedCard) return;
      
      const contentItem = {
        type: selectedCard.dataset.type,
        title: selectedCard.dataset.title,
        url: selectedCard.dataset.url,
        platform_id: platformId
      };
      
      // Post back to our endpoint to create the deep link response
      const response = await fetch(window.location.href, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: contentItem,
          return_url: returnUrl,
          platform_id: platformId
        })
      });
      
      const result = await response.json();
      
      if (result.form_html) {
        // Create a form and submit it
        document.body.innerHTML = result.form_html;
        document.forms[0].submit();
      } else if (result.error) {
        alert('Error: ' + result.error);
      }
    }
  </script>
</body>
</html>
      `;

      return new Response(html, {
        headers: { 'Content-Type': 'text/html', ...corsHeaders },
      });
    }

    // Handle POST with selected content
    if (req.method === 'POST') {
      const {
        content,
        return_url,
        platform_id,
        // The `data` claim from the platform's LtiDeepLinkingRequest, passed
        // through by whoever initiated the selection. See the response payload.
        deep_link_data,
      } = await req.json();

      if (!platform_id || !return_url) {
        return new Response(JSON.stringify({ error: 'Missing platform_id or return_url' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      // Get platform
      const { data: platform, error: platformError } = await supabase
        .from('lti_platforms')
        .select('*')
        .eq('id', platform_id)
        .single();

      if (platformError || !platform) {
        return new Response(JSON.stringify({ error: 'Platform not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      // Build deep linking response JWT
      const contentItems: ContentItem[] = [
        {
          type: 'ltiResourceLink',
          title: content.title,
          text: `Elec-Mate ${content.title}`,
          url: content.url,
          icon: {
            url: `${appUrl}/logo-icon.png`,
            width: 64,
            height: 64,
          },
          lineItem:
            content.type === 'submit'
              ? {
                  scoreMaximum: 100,
                  label: 'Portfolio Submission',
                  tag: 'portfolio',
                }
              : undefined,
        },
      ];

      const now = Math.floor(Date.now() / 1000);
      const responsePayload = {
        iss: platform.client_id,
        aud: platform.issuer,
        iat: now,
        exp: now + 300,
        nonce: crypto.randomUUID(),
        'https://purl.imsglobal.org/spec/lti/claim/message_type': 'LtiDeepLinkingResponse',
        'https://purl.imsglobal.org/spec/lti/claim/version': '1.3.0',
        'https://purl.imsglobal.org/spec/lti/claim/deployment_id': platform.deployment_id,
        'https://purl.imsglobal.org/spec/lti-dl/claim/content_items': contentItems,
        /*
         * ECHOED, never invented.
         *
         * The spec says the response MUST return the `data` value from the
         * platform's LtiDeepLinkingRequest, unchanged, when one was sent. It
         * is the platform's own opaque handle for the request — how it ties
         * this response back to the launch that asked for it.
         *
         * A fresh `crypto.randomUUID()` was being generated here instead. That
         * is not merely non-compliant: it discards the only binding between
         * response and request, so the platform cannot tell a genuine reply
         * from a replayed or forged one. Omitted entirely when the caller
         * supplies none, which is what the spec requires.
         */
        ...(typeof deep_link_data === 'string' && deep_link_data
          ? { 'https://purl.imsglobal.org/spec/lti-dl/claim/data': deep_link_data }
          : {}),
      };

      /*
       * Sign with OUR key. Never the platform's, and never `alg: none`.
       *
       * What was here signed with `platform.private_key` and fell back to an
       * unsigned token. `lti_platforms` has no `private_key` column, so the
       * signing branch was dead and every response was unsigned — see the
       * file header.
       *
       * The tool signs its own DeepLinkingResponse and the platform verifies
       * it against the JWKS we publish at `lti-jwks`, which reads the same
       * `LTI_JWKS_JSON`. Both ends must therefore agree on `kid`, which is why
       * it is taken from the key rather than invented here.
       */
      const toolKey = await loadToolSigningKey(supabase);
      if (!toolKey) {
        /*
         * A hard failure, deliberately. The alternative — the old behaviour —
         * is handing the LMS a token anyone could forge. A launch that fails
         * with a clear reason is recoverable; one that succeeds against a
         * misconfigured platform is a security hole nobody notices.
         */
        console.error('[lti-deep-link] no active tool signing key — refusing to respond unsigned');
        return new Response(
          JSON.stringify({
            error: 'signing_key_not_configured',
            detail:
              'No active LTI tool signing key. Configure LTI_JWKS_JSON or add an active row to lti_tool_keys before using Deep Linking.',
          }),
          { status: 503, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        );
      }

      let jwt: string;
      try {
        jwt = await new jose.SignJWT(responsePayload)
          .setProtectedHeader({ alg: SIGNING_ALG, typ: 'JWT', kid: toolKey.kid })
          .sign(toolKey.key);
      } catch (e) {
        console.error('[lti-deep-link] signing failed:', e);
        return new Response(JSON.stringify({ error: 'signing_failed' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      // Return auto-submitting form
      const formHtml = `
        <html>
        <body>
          <form method="POST" action="${escapeHtmlAttribute(String(return_url))}">
            <input type="hidden" name="JWT" value="${jwt}" />
          </form>
          <script>document.forms[0].submit();</script>
        </body>
        </html>
      `;

      return new Response(JSON.stringify({ form_html: formHtml }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (error) {
    console.error('Deep link error:', error);
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        message: (error as Error).message,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
});
