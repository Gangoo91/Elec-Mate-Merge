/**
 * OG preview for referral invites — /r/:code (4 Oct 2026).
 *
 * Invites travel by WhatsApp, and the SPA gave every /r/ link the homepage
 * card ("7 days free") under a message promising a free first month. A
 * referral really is a free first month (create-checkout applies a one-time
 * 100% coupon), so bots get this shell with the invite card instead. Humans
 * never hit it: vercel.json only rewrites crawler user-agents here.
 *
 * Deliberately not personalised with the referrer's name — that would need a
 * public lookup by code, and codes are guessable.
 */
export const config = { runtime: 'edge' };

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export default async function handler(req: Request): Promise<Response> {
  const code = (new URL(req.url).searchParams.get('code') ?? '').replace(/[^A-Za-z0-9_-]/g, '');
  const url = `https://www.elec-mate.com/r/${code}`;
  const title = 'You’ve been invited to Elec-Mate — your first month’s free';
  const description =
    'Certificates, quotes, invoices and an AI that knows the regs — the whole job in one app, built by a UK electrician. Sign up with this link and your first month is free.';
  const image = 'https://www.elec-mate.com/images/og-referral.jpg?v=1';

  const html = `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${image}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Elec-Mate invite — your first month's free">
<meta property="og:url" content="${esc(url)}">
<meta property="og:site_name" content="Elec-Mate">
<meta property="og:locale" content="en_GB">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${image}">
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0;url=${esc(url)}">
</head>
<body>
<p>Redirecting to <a href="${esc(url)}">${esc(url)}</a>…</p>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
