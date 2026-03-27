/**
 * generate-google-wallet-pass
 * Generates a Google Wallet Generic Pass save URL for an Elec-ID profile.
 * Signs a JWT with RS256 using the Google service account private key.
 *
 * Required Supabase secrets:
 *   GOOGLE_WALLET_ISSUER_ID          e.g. 3388000000022801234
 *   GOOGLE_WALLET_CLASS_ID           e.g. 3388000000022801234.elecmate-elecid
 *   GOOGLE_SERVICE_ACCOUNT_KEY_JSON  Full JSON key file content (stringified)
 *
 * Admin steps:
 *   1. Apply for issuer account: https://pay.google.com/business/console
 *   2. Google Cloud → service account → Wallet API scope
 *   3. Download JSON key
 *   4. Create Generic Class in Google Wallet console
 *   5. Add above secrets to Supabase dashboard
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? '';
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const ISSUER_ID = Deno.env.get('GOOGLE_WALLET_ISSUER_ID') ?? '';
const CLASS_ID = Deno.env.get('GOOGLE_WALLET_CLASS_ID') ?? '';
const SERVICE_ACCOUNT_JSON = Deno.env.get('GOOGLE_SERVICE_ACCOUNT_KEY_JSON') ?? '';

// ─── JWT helpers ─────────────────────────────────────────────────────────────
function base64UrlEncode(data: Uint8Array | string): string {
  const bytes = typeof data === 'string' ? new TextEncoder().encode(data) : data;
  let str = '';
  for (const b of bytes) str += String.fromCharCode(b);
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

async function signRS256(payload: object, privateKeyPem: string): Promise<string> {
  const header = { alg: 'RS256', typ: 'JWT' };
  const headerEncoded = base64UrlEncode(JSON.stringify(header));
  const payloadEncoded = base64UrlEncode(JSON.stringify(payload));
  const signingInput = `${headerEncoded}.${payloadEncoded}`;

  // Import private key (PKCS#8 PEM → CryptoKey)
  const pemContents = privateKeyPem
    .replace(/-----BEGIN PRIVATE KEY-----/, '')
    .replace(/-----END PRIVATE KEY-----/, '')
    .replace(/\s/g, '');
  const keyBytes = Uint8Array.from(atob(pemContents), (c) => c.charCodeAt(0));

  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8',
    keyBytes.buffer,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign'],
  );

  const signatureBytes = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    cryptoKey,
    new TextEncoder().encode(signingInput),
  );

  const signatureEncoded = base64UrlEncode(new Uint8Array(signatureBytes));
  return `${signingInput}.${signatureEncoded}`;
}

// ─── Tier helpers ─────────────────────────────────────────────────────────────
function formatTier(tier: string): string {
  const labels: Record<string, string> = {
    premium: '★ Premium Electrician',
    verified: '✓ Verified Electrician',
    basic: 'Electrician',
  };
  return labels[tier] || 'Electrician';
}

function formatExpiry(isoDate: string | null): string {
  if (!isoDate) return 'Not set';
  const d = new Date(isoDate);
  return d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
}

// ─── Main handler ─────────────────────────────────────────────────────────────
serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const jsonResponse = (body: object, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  try {
    // Auth
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return jsonResponse({ error: 'No authorisation header' }, 401);

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
    const { data: userData, error: userError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', ''),
    );
    if (userError || !userData.user) return jsonResponse({ error: 'Unauthorised' }, 401);
    const userId = userData.user.id;

    // Check Google Wallet is configured
    if (!ISSUER_ID || !CLASS_ID || !SERVICE_ACCOUNT_JSON) {
      return jsonResponse({
        error: 'Google Wallet not configured',
        message: 'Add GOOGLE_WALLET_ISSUER_ID, GOOGLE_WALLET_CLASS_ID, GOOGLE_SERVICE_ACCOUNT_KEY_JSON to Supabase secrets',
      }, 503);
    }

    // Parse service account
    let serviceAccount: { client_email: string; private_key: string };
    try {
      serviceAccount = JSON.parse(SERVICE_ACCOUNT_JSON);
    } catch {
      return jsonResponse({ error: 'Invalid GOOGLE_SERVICE_ACCOUNT_KEY_JSON' }, 500);
    }

    // Fetch Elec-ID profile
    const { data: elecId, error: elecIdError } = await supabase
      .from('employer_elec_id_profiles')
      .select('*, profiles(full_name, avatar_url)')
      .eq('user_id', userId)
      .single();

    if (elecIdError || !elecId) return jsonResponse({ error: 'Elec-ID profile not found' }, 404);

    // Fetch qualifications + skills
    const [{ data: quals }, { data: skillRows }] = await Promise.all([
      supabase.from('employer_elec_id_qualifications')
        .select('qualification_name')
        .eq('profile_id', elecId.id)
        .limit(6),
      supabase.from('employer_elec_id_skills')
        .select('skill_name')
        .eq('profile_id', elecId.id)
        .limit(8),
    ]);

    const profile = (elecId as any).profiles;
    const name = profile?.full_name || 'Electrician';
    const elecIdNumber = elecId.elec_id_number || `EM-${userId.slice(0, 6).toUpperCase()}`;
    const verifyUrl = `https://elec-mate.com/verify/${elecIdNumber}`;
    const tier = elecId.verification_tier || 'basic';
    const avatarUrl = profile?.avatar_url;

    const qualList = (quals || []).map((q: any) => q.qualification_name).join(' • ') || 'None listed';
    const skillList = (skillRows || []).map((s: any) => s.skill_name).join(' • ') || 'None listed';

    // Google Wallet logos hosted on Supabase storage (public URLs)
    // These are static branded images for the pass hero/logo
    const logoUri = 'https://jtwygbeceundfgnkirof.supabase.co/storage/v1/object/public/wallet-assets/elecmate-logo-660.png';
    const heroUri = 'https://jtwygbeceundfgnkirof.supabase.co/storage/v1/object/public/wallet-assets/elecmate-hero-1125.png';

    // Build Generic Pass object
    const objectId = `${ISSUER_ID}.elecid-${userId.replace(/-/g, '')}`;

    const passObject = {
      id: objectId,
      classId: CLASS_ID,
      state: 'ACTIVE',
      hexBackgroundColor: '#0a0a0a',
      cardTitle: {
        defaultValue: { language: 'en-GB', value: 'Elec-ID' },
      },
      subheader: {
        defaultValue: { language: 'en-GB', value: 'ELECTRICIAN' },
      },
      header: {
        defaultValue: { language: 'en-GB', value: name },
      },
      logo: {
        sourceUri: { uri: logoUri },
        contentDescription: { defaultValue: { language: 'en-GB', value: 'Elec-Mate logo' } },
      },
      heroImage: {
        sourceUri: { uri: heroUri },
        contentDescription: { defaultValue: { language: 'en-GB', value: 'Elec-Mate Elec-ID' } },
      },
      ...(avatarUrl ? {
        imageModulesData: [{
          mainImage: {
            sourceUri: { uri: avatarUrl },
            contentDescription: { defaultValue: { language: 'en-GB', value: `${name} photo` } },
          },
          id: 'profile_photo',
        }],
      } : {}),
      textModulesData: [
        { id: 'verification', header: 'VERIFICATION', body: formatTier(tier) },
        { id: 'ecs_card', header: 'ECS CARD', body: elecId.ecs_card_type || 'Not set' },
        { id: 'elecid', header: 'ELEC-ID', body: elecIdNumber },
        { id: 'ecs_expiry', header: 'ECS EXPIRES', body: formatExpiry(elecId.ecs_expiry_date || null) },
        { id: 'qualifications', header: 'QUALIFICATIONS', body: qualList },
        { id: 'skills', header: 'SKILLS', body: skillList },
      ],
      barcode: {
        type: 'QR_CODE',
        value: verifyUrl,
        alternateText: elecIdNumber,
      },
      linksModuleData: {
        uris: [{
          uri: verifyUrl,
          description: 'Verify this credential',
          id: 'verify',
        }],
      },
    };

    // Build JWT payload
    const now = Math.floor(Date.now() / 1000);
    const jwtPayload = {
      iss: serviceAccount.client_email,
      aud: 'google',
      typ: 'savetowallet',
      iat: now,
      payload: {
        genericObjects: [passObject],
      },
    };

    const signedJwt = await signRS256(jwtPayload, serviceAccount.private_key);
    const saveUrl = `https://pay.google.com/gp/v/save/${signedJwt}`;

    return jsonResponse({ saveUrl, objectId });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[generate-google-wallet-pass] Error:', msg);
    return jsonResponse({ error: msg }, 500);
  }
});
