/**
 * Gap #9 — the links inside a review request (public, no sign-in).
 *
 *   GET  ?t=<token>&p=google     count the click, 302 to the firm's Google page
 *   GET  ?t=<token>              one link: straight there; several: pick a site
 *   GET  ?t=<token>&a=stop       "Do not ask me again" page with a button
 *   POST ?t=<token>&a=stop       opt out (the button, and RFC 8058 one-click)
 *
 * The token is a random uuid on one sent request, so it is the only key. The
 * redirect target always comes from the firm's saved settings, never from the
 * URL, so this can never be used to send someone somewhere else. L4: and only
 * to a host of the platform it is saved under (Google, Checkatrade,
 * TrustATrader, Facebook; _review_url_allowed). A HEAD request or a link
 * scanner (mail security gateways, previewers, crawlers) gets the same
 * redirect but is not counted as a click.
 * Needs verify_jwt = false (supabase/config.toml): links in an email carry no
 * Authorization header.
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const PLATFORMS = new Set(['google', 'checkatrade', 'trustatrader', 'facebook']);
// Link checkers that open every link in a message before a person does.
const SCANNER =
  /(bot\b|bot\/|crawler|spider|slurp|preview|scanner|safelinks|proofpoint|mimecast|barracuda|urldefense|messagelabs|symantec|forcepoint|sophos|trendmicro|fireeye|cisco|ironport|zscaler|checkpoint|facebookexternalhit|whatsapp|skypeuripreview|slackbot|discordbot|googleimageproxy|ggpht|curl\/|wget\/|python-requests|python-urllib|go-http-client|okhttp|java\/|libwww|httpclient|headlesschrome|phantomjs)/i;

const htmlHeaders = {
  'Content-Type': 'text/html; charset=utf-8',
  'Cache-Control': 'no-store',
  // Gmail's iOS webview offers an un-sniffed page as a .txt download.
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'no-referrer',
};

const esc = (s: string) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

function page(title: string, inner: string, status = 200): Response {
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${esc(title)}</title>
<style>body{margin:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#0f172a}
main{max-width:440px;margin:48px auto;padding:0 16px}.card{background:#fff;border-radius:16px;padding:28px 24px}
h1{font-size:20px;margin:0 0 10px}p{font-size:15px;line-height:1.6;color:#334155;margin:0 0 18px}
a.btn,button{display:block;width:100%;box-sizing:border-box;margin:0 0 10px;padding:14px 16px;border-radius:10px;font-size:15px;font-weight:600;text-align:center;text-decoration:none;border:1px solid #cbd5e1;background:#fff;color:#0f172a;cursor:pointer}
a.btn.first,button.first{background:#0f172a;color:#fff;border-color:#0f172a}</style></head>
<body><main><div class="card">${inner}</div></main></body></html>`;
  return new Response(html, { status, headers: htmlHeaders });
}

const gone = () =>
  page(
    'Link no longer works',
    '<h1>This link no longer works</h1><p>It may have expired. You can close this page.</p>',
    404
  );

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const token = url.searchParams.get('t') ?? '';
  const platform = url.searchParams.get('p');
  const action = url.searchParams.get('a');
  if (!UUID.test(token)) return gone();

  const admin = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    {
      auth: { persistSession: false },
    }
  );

  try {
    if (action === 'stop') {
      if (req.method === 'POST') {
        const { data: firm } = await admin.rpc('review_request_opt_out', { p_token: token });
        if (!firm) return gone();
        return page(
          'You will not be asked again',
          `<h1>Done</h1><p>${esc(String(firm))} will not ask you for a review again.</p>`
        );
      }
      // GET shows a button, so a mail scanner opening the link changes nothing.
      const { data: t } = await admin.rpc('review_link_target', { p_token: token });
      if (!t) return gone();
      const firm = esc((t as { firm_name: string }).firm_name);
      return page(
        'Stop review requests',
        `<h1>Stop review requests from ${firm}?</h1><p>You will not be asked for a review by ${firm} again.</p>
<form method="post" action="?t=${esc(token)}&amp;a=stop"><button class="first" type="submit">Do not ask me again</button></form>`
      );
    }

    if (req.method !== 'GET' && req.method !== 'HEAD') return new Response(null, { status: 405 });
    // L4: a HEAD request or a link scanner is sent on, but not counted.
    const counted = req.method === 'GET' && !SCANNER.test(req.headers.get('user-agent') ?? '');
    const resolve = (p: string) =>
      counted
        ? admin.rpc('record_review_click', { p_token: token, p_platform: p })
        : admin.rpc('review_click_target', { p_token: token, p_platform: p });

    if (platform !== null) {
      if (!PLATFORMS.has(platform)) return gone();
      const { data: target } = await resolve(platform);
      if (!target || typeof target !== 'string' || !/^https:\/\//i.test(target)) return gone();
      return new Response(null, {
        status: 302,
        headers: { Location: target, 'Cache-Control': 'no-store' },
      });
    }

    const { data: t } = await admin.rpc('review_link_target', { p_token: token });
    if (!t) return gone();
    const info = t as {
      firm_name: string;
      links: Array<{ key: string; label: string; url: string }>;
    };
    const links = (info.links ?? []).filter((l) => /^https:\/\//i.test(l.url));
    if (!links.length) return gone();
    if (links.length === 1) {
      const { data: target } = await resolve(links[0].key);
      if (!target || typeof target !== 'string' || !/^https:\/\//i.test(target)) return gone();
      return new Response(null, {
        status: 302,
        headers: { Location: target, 'Cache-Control': 'no-store' },
      });
    }
    const firm = esc(info.firm_name);
    const buttons = links
      .map(
        (l, i) =>
          `<a class="btn${i === 0 ? ' first' : ''}" href="?t=${esc(token)}&amp;p=${esc(l.key)}">${esc(l.label)}</a>`
      )
      .join('');
    return page(
      `Review ${info.firm_name}`,
      `<h1>Leave a review for ${firm}</h1><p>Pick where you would like to leave it. An honest review helps other people choose.</p>${buttons}`
    );
  } catch (e) {
    console.error('[review-link]', (e as Error).message);
    return gone();
  }
});
