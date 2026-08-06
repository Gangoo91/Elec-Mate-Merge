import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

/** Whitelisted supplier domains — prevents open-proxy abuse */
const ALLOWED_HOSTS = new Set([
  'media.toolstation.com',
  'cdn.toolstation.com',
  'cdn.aws.toolstation.com',
  'media.screwfix.com',
  'www.screwfix.com',
  'www.machinemart.co.uk',
  'ffx.co.uk',
  'uk.rs-online.com',
  'media.rs-online.com',
  'media.diy.com',
  'www.tlc-direct.co.uk',
  'www.cef.co.uk',
  'www.edmundson-electrical.co.uk',
  'www.wickes.co.uk',
  'cdn11.bigcommerce.com',
  'dccf75d8gej24.cloudfront.net',
  'i.shgcdn.com',
  'images.hotukdeals.com',
  'res.cloudinary.com',
  // Present in the catalogue but missing from this list, so 107 products were
  // being refused with 403 and rendering blank.
  'www.fastlec.co.uk',
  'www.bes.co.uk',
]);

const MAX_SIZE = 2 * 1024 * 1024; // 2 MB

/*
 * Upstream failures return a real error status, NOT a 200.
 *
 * This used to answer every failure with a 1x1 transparent PNG and status 200.
 * The browser then treats it as a perfectly good image, so `onError` never
 * fires and the client cannot tell a missing photo from a real one — which is
 * why every product tile rendered as a plain white box instead of the
 * designed fallback. A 502 lets `ProductImage` show the product's name.
 *
 * Kept for OPTIONS/no-op paths where a valid image is genuinely wanted.
 */
/** 1x1 transparent PNG (68 bytes) */
const TRANSPARENT_PNG = new Uint8Array([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52,
  0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x08, 0x06, 0x00, 0x00, 0x00, 0x1f, 0x15, 0xc4,
  0x89, 0x00, 0x00, 0x00, 0x0a, 0x49, 0x44, 0x41, 0x54, 0x78, 0x9c, 0x62, 0x00, 0x00, 0x00, 0x02,
  0x00, 0x01, 0xe5, 0x27, 0xde, 0xfc, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae, 0x42,
  0x60, 0x82,
]);

function transparentResponse() {
  return new Response(TRANSPARENT_PNG, {
    headers: {
      ...corsHeaders,
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=300',
    },
  });
}

/** Upstream could not supply the image — say so, so the client can fall back. */
function upstreamFailed(reason: string) {
  return new Response(JSON.stringify({ error: reason }), {
    status: 502,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
      // Briefly cached so a dead image is not re-fetched on every scroll.
      'Cache-Control': 'public, max-age=600',
    },
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const imageUrl = url.searchParams.get('url');

    if (!imageUrl) {
      return new Response(JSON.stringify({ error: 'Missing ?url= parameter' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate URL
    let parsed: URL;
    try {
      parsed = new URL(imageUrl);
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid URL' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Domain whitelist check
    if (!ALLOWED_HOSTS.has(parsed.hostname)) {
      return new Response(JSON.stringify({ error: 'Domain not allowed' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('[proxy-image] Fetching:', imageUrl.substring(0, 100));

    const response = await fetch(imageUrl, {
      headers: {
        Accept: 'image/*',
        'User-Agent': 'Mozilla/5.0 (compatible; ElecMate/1.0)',
      },
    });

    if (!response.ok) {
      console.error('[proxy-image] Upstream error:', response.status);
      return upstreamFailed(`Upstream returned ${response.status}`);
    }

    // Check content length before reading body
    const contentLength = parseInt(response.headers.get('content-length') || '0', 10);
    if (contentLength > MAX_SIZE) {
      console.error('[proxy-image] Image too large:', contentLength);
      return upstreamFailed('Image too large');
    }

    const buffer = await response.arrayBuffer();

    if (buffer.byteLength > MAX_SIZE) {
      console.error('[proxy-image] Image body too large:', buffer.byteLength);
      return upstreamFailed('Image too large');
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg';

    return new Response(buffer, {
      headers: {
        ...corsHeaders,
        'Content-Type': contentType,
        'Content-Length': buffer.byteLength.toString(),
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    await captureException(error, { functionName: 'proxy-image', requestUrl: req.url, requestMethod: req.method });
    console.error('[proxy-image] Error:', error);
    return upstreamFailed('Proxy error');
  }
});
