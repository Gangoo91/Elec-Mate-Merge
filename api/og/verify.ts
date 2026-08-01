/**
 * OG preview for Elec-ID links — /verify/:number and /share/:token.
 *
 * WhatsApp is where these links actually travel, and an SPA shows crawlers
 * nothing. vercel.json rewrites bot user-agents here; we fetch the public
 * verification data via the same anon RPCs the page uses and return a
 * minimal HTML shell whose only job is rich meta tags. Humans who somehow
 * land here get redirected to the real page.
 */
import { SUPABASE_URL, SUPABASE_ANON } from '../_lib/supabase';

export const config = { runtime: 'edge' };

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function rpc(fn: string, args: Record<string, string>): Promise<Record<string, unknown> | null> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON,
        Authorization: `Bearer ${SUPABASE_ANON}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args),
    });
    if (!res.ok) return null;
    return (await res.json()) as Record<string, unknown> | null;
  } catch {
    return null;
  }
}

export default async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const kind = url.searchParams.get('kind');
  const id = url.searchParams.get('id') ?? '';
  const canonicalPath = kind === 'share' ? `/share/${id}` : `/verify/${id}`;
  const canonicalUrl = `https://www.elec-mate.com${canonicalPath}`;

  let title = 'Elec-ID — Verified Electrician Credentials';
  let description =
    'Check an electrician’s verified qualifications, ECS card status and identity — live from the record.';
  let image = 'https://www.elec-mate.com/og-image.png';

  const data =
    kind === 'share'
      ? await rpc('get_elec_id_by_share_token', { p_token: id })
      : await rpc('get_elec_id_by_number', { p_number: id });

  if (data && (data as { status?: string }).status === 'ok') {
    const employee = (data as { employee?: { name?: string; photo_url?: string } }).employee;
    const profile = (data as {
      profile?: { is_verified?: boolean; job_title?: string; elec_id_number?: string };
    }).profile;
    const name = employee?.name || 'Electrical professional';
    const verified = profile?.is_verified ? 'Verified' : 'Registered';
    title = `${name} — ${verified} Elec-ID`;
    description = `${profile?.job_title ? profile.job_title + ' · ' : ''}View verified qualifications, ECS card status and credentials${profile?.elec_id_number ? ` · ${profile.elec_id_number}` : ''}. Powered by Elec-Mate.`;
    if (employee?.photo_url && /^https?:\/\//.test(employee.photo_url)) {
      image = employee.photo_url;
    }
  }

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta property="og:type" content="profile">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${esc(image)}">
<meta property="og:url" content="${esc(canonicalUrl)}">
<meta property="og:site_name" content="Elec-ID by Elec-Mate">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${esc(image)}">
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0;url=${esc(canonicalUrl)}">
</head>
<body>
<p>Redirecting to <a href="${esc(canonicalUrl)}">${esc(canonicalUrl)}</a>…</p>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
    },
  });
}
