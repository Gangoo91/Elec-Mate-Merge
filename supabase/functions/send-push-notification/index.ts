// Send Push Notification Edge Function
// Uses native Web Crypto API for Deno compatibility
import { serve } from '../_shared/deps.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

interface PushPayload {
  userId: string;
  title: string;
  body: string;
  type: 'peer' | 'job' | 'team' | 'college' | 'quote' | 'invoice' | 'application' | 'vacancy' | 'certificate';
  data?: Record<string, unknown>;
}

// ===== Base64 URL Helpers =====
function base64UrlEncode(data: Uint8Array): string {
  const base64 = btoa(String.fromCharCode(...data));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function base64UrlDecode(str: string): Uint8Array {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) base64 += '=';
  const binary = atob(base64);
  return Uint8Array.from(binary, c => c.charCodeAt(0));
}

// ===== VAPID JWT Creation =====
async function createVapidJwt(
  audience: string,
  subject: string,
  privateKeyBase64: string
): Promise<string> {
  const header = { typ: 'JWT', alg: 'ES256' };
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    aud: audience,
    exp: now + 12 * 60 * 60, // 12 hours
    sub: subject,
  };

  const headerB64 = base64UrlEncode(new TextEncoder().encode(JSON.stringify(header)));
  const payloadB64 = base64UrlEncode(new TextEncoder().encode(JSON.stringify(payload)));
  const unsignedToken = `${headerB64}.${payloadB64}`;

  // Import private key
  const privateKeyBytes = base64UrlDecode(privateKeyBase64);

  // Convert raw private key to JWK format for import
  const jwk = {
    kty: 'EC',
    crv: 'P-256',
    d: base64UrlEncode(privateKeyBytes),
    x: '', // Will be derived
    y: '', // Will be derived
  };

  // We need the public key coordinates - derive from private key
  // For ES256, we need to import as PKCS8 or use a pre-computed public key
  // Since we have the VAPID public key, let's use it
  const vapidPublicKey = Deno.env.get('VAPID_PUBLIC_KEY') || '';
  const publicKeyBytes = base64UrlDecode(vapidPublicKey);

  // Public key is 65 bytes: 0x04 || x (32 bytes) || y (32 bytes)
  const x = publicKeyBytes.slice(1, 33);
  const y = publicKeyBytes.slice(33, 65);

  jwk.x = base64UrlEncode(x);
  jwk.y = base64UrlEncode(y);

  const cryptoKey = await crypto.subtle.importKey(
    'jwk',
    jwk,
    { name: 'ECDSA', namedCurve: 'P-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign(
    { name: 'ECDSA', hash: 'SHA-256' },
    cryptoKey,
    new TextEncoder().encode(unsignedToken)
  );

  // Convert signature from DER to raw format (r || s)
  const signatureBytes = new Uint8Array(signature);
  const signatureB64 = base64UrlEncode(signatureBytes);

  return `${unsignedToken}.${signatureB64}`;
}

// ===== Web Push Encryption (RFC 8291) =====
async function encryptPayload(
  payload: string,
  subscriptionPublicKey: string,
  authSecret: string
): Promise<{ ciphertext: Uint8Array; salt: Uint8Array; localPublicKey: Uint8Array }> {
  const payloadBytes = new TextEncoder().encode(payload);

  // Generate ephemeral key pair
  const localKeyPair = await crypto.subtle.generateKey(
    { name: 'ECDH', namedCurve: 'P-256' },
    true,
    ['deriveBits']
  );

  // Export local public key
  const localPublicKeyRaw = await crypto.subtle.exportKey('raw', localKeyPair.publicKey);
  const localPublicKey = new Uint8Array(localPublicKeyRaw);

  // Import subscription public key
  const subPubKeyBytes = base64UrlDecode(subscriptionPublicKey);
  const subscriptionKey = await crypto.subtle.importKey(
    'raw',
    subPubKeyBytes,
    { name: 'ECDH', namedCurve: 'P-256' },
    false,
    []
  );

  // Derive shared secret using ECDH
  const sharedSecretBits = await crypto.subtle.deriveBits(
    { name: 'ECDH', public: subscriptionKey },
    localKeyPair.privateKey,
    256
  );
  const sharedSecret = new Uint8Array(sharedSecretBits);

  // Auth secret
  const authSecretBytes = base64UrlDecode(authSecret);

  // Generate random salt
  const salt = crypto.getRandomValues(new Uint8Array(16));

  // Derive IKM (Input Keying Material)
  const authInfo = new TextEncoder().encode('WebPush: info\0');
  const authInfoFull = new Uint8Array(authInfo.length + subPubKeyBytes.length + localPublicKey.length);
  authInfoFull.set(authInfo);
  authInfoFull.set(subPubKeyBytes, authInfo.length);
  authInfoFull.set(localPublicKey, authInfo.length + subPubKeyBytes.length);

  // HKDF for IKM
  const authSecretKey = await crypto.subtle.importKey(
    'raw',
    authSecretBytes,
    { name: 'HKDF' },
    false,
    ['deriveBits']
  );

  // First derive PRK from shared secret
  const prkKey = await crypto.subtle.importKey(
    'raw',
    sharedSecret,
    { name: 'HKDF' },
    false,
    ['deriveBits']
  );

  // Derive IKM
  const ikmBits = await crypto.subtle.deriveBits(
    {
      name: 'HKDF',
      hash: 'SHA-256',
      salt: authSecretBytes,
      info: authInfoFull,
    },
    prkKey,
    256
  );
  const ikm = new Uint8Array(ikmBits);

  // Derive content encryption key (CEK)
  const cekInfo = new TextEncoder().encode('Content-Encoding: aes128gcm\0');
  const cekKey = await crypto.subtle.importKey(
    'raw',
    ikm,
    { name: 'HKDF' },
    false,
    ['deriveBits']
  );
  const cekBits = await crypto.subtle.deriveBits(
    {
      name: 'HKDF',
      hash: 'SHA-256',
      salt: salt,
      info: cekInfo,
    },
    cekKey,
    128
  );
  const cek = new Uint8Array(cekBits);

  // Derive nonce
  const nonceInfo = new TextEncoder().encode('Content-Encoding: nonce\0');
  const nonceKey = await crypto.subtle.importKey(
    'raw',
    ikm,
    { name: 'HKDF' },
    false,
    ['deriveBits']
  );
  const nonceBits = await crypto.subtle.deriveBits(
    {
      name: 'HKDF',
      hash: 'SHA-256',
      salt: salt,
      info: nonceInfo,
    },
    nonceKey,
    96
  );
  const nonce = new Uint8Array(nonceBits);

  // Pad the payload (add padding delimiter)
  const paddedPayload = new Uint8Array(payloadBytes.length + 1);
  paddedPayload.set(payloadBytes);
  paddedPayload[payloadBytes.length] = 2; // Padding delimiter

  // Encrypt with AES-GCM
  const encryptKey = await crypto.subtle.importKey(
    'raw',
    cek,
    { name: 'AES-GCM' },
    false,
    ['encrypt']
  );

  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: nonce },
    encryptKey,
    paddedPayload
  );

  // Build aes128gcm content
  // Header: salt (16) || rs (4) || idlen (1) || keyid (65 for P-256 public key)
  const rs = 4096;
  const header = new Uint8Array(16 + 4 + 1 + localPublicKey.length);
  header.set(salt);
  header[16] = (rs >> 24) & 0xff;
  header[17] = (rs >> 16) & 0xff;
  header[18] = (rs >> 8) & 0xff;
  header[19] = rs & 0xff;
  header[20] = localPublicKey.length;
  header.set(localPublicKey, 21);

  const ciphertext = new Uint8Array(header.length + encrypted.byteLength);
  ciphertext.set(header);
  ciphertext.set(new Uint8Array(encrypted), header.length);

  return { ciphertext, salt, localPublicKey };
}

// ===== Send Push Notification =====
async function sendWebPush(
  endpoint: string,
  subscriptionPublicKey: string,
  authSecret: string,
  payload: string,
  vapidPublicKey: string,
  vapidPrivateKey: string
): Promise<void> {
  // Encrypt payload
  const { ciphertext } = await encryptPayload(payload, subscriptionPublicKey, authSecret);

  // Create VAPID JWT
  const url = new URL(endpoint);
  const audience = `${url.protocol}//${url.host}`;
  const jwt = await createVapidJwt(audience, 'mailto:support@elec-mate.com', vapidPrivateKey);

  // Prepare VAPID public key for Authorization header
  const vapidPubKeyBytes = base64UrlDecode(vapidPublicKey);
  const vapidPubKeyB64 = base64UrlEncode(vapidPubKeyBytes);

  // Send request
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Encoding': 'aes128gcm',
      'TTL': '86400',
      'Authorization': `vapid t=${jwt}, k=${vapidPubKeyB64}`,
    },
    body: ciphertext,
  });

  if (!response.ok) {
    const text = await response.text();
    const error: any = new Error(`Push failed: ${response.status} ${text}`);
    error.statusCode = response.status;
    throw error;
  }
}

// ===== Main Handler =====
serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const payload: PushPayload = await req.json();
    const { userId, title, body, type, data } = payload;

    console.log('[Push v23] Received request for userId:', userId);

    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'userId is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get subscriptions
    const { data: subscriptions, error: subError } = await supabase
      .from('push_subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true);

    console.log('[Push v23] Found subscriptions:', subscriptions?.length || 0);

    if (subError) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch subscriptions', details: subError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!subscriptions || subscriptions.length === 0) {
      const { data: allSubs } = await supabase
        .from('push_subscriptions')
        .select('id, is_active')
        .eq('user_id', userId);

      return new Response(
        JSON.stringify({
          message: 'No active subscriptions found',
          sent: 0,
          foundSubscriptions: false,
          debug: { total: allSubs?.length || 0 }
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const vapidPublicKey = Deno.env.get('VAPID_PUBLIC_KEY');
    const vapidPrivateKey = Deno.env.get('VAPID_PRIVATE_KEY');

    if (!vapidPublicKey || !vapidPrivateKey) {
      return new Response(
        JSON.stringify({ error: 'VAPID keys not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('[Push v23] VAPID public key starts with:', vapidPublicKey.substring(0, 10));

    const notificationPayload = JSON.stringify({
      title,
      body,
      icon: '/pwa-192x192.png',
      badge: '/pwa-192x192.png',
      tag: `${type}-${Date.now()}`,
      type,
      data: { type, ...data },
    });

    let sentCount = 0;
    const errors: { subscriptionId: string; error: string; statusCode?: number }[] = [];

    for (const subscription of subscriptions) {
      try {
        console.log('[Push v23] Sending to:', subscription.id);

        await sendWebPush(
          subscription.endpoint,
          subscription.keys.p256dh,
          subscription.keys.auth,
          notificationPayload,
          vapidPublicKey,
          vapidPrivateKey
        );

        sentCount++;
        console.log('[Push v23] Success:', subscription.id);
      } catch (err: any) {
        console.error('[Push v23] Error:', subscription.id, err.message);
        errors.push({
          subscriptionId: subscription.id,
          error: err.message,
          statusCode: err.statusCode,
        });

        if (err.statusCode === 410 || err.statusCode === 404) {
          await supabase
            .from('push_subscriptions')
            .update({ is_active: false })
            .eq('id', subscription.id);
        }
      }
    }

    console.log('[Push v23] Complete. Sent:', sentCount, 'Errors:', errors.length);

    return new Response(
      JSON.stringify({
        success: sentCount > 0,
        sent: sentCount,
        total: subscriptions.length,
        foundSubscriptions: true,
        errors: errors.length > 0 ? errors : undefined,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('[Push v23] Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
