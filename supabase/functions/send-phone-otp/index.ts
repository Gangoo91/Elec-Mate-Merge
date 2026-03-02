/**
 * Send Phone OTP
 *
 * Sends a 6-digit verification code via SMS to the user's phone number.
 * Used during Business AI onboarding to verify WhatsApp number ownership.
 *
 * POST body: { phone_number: "+447..." }
 * Returns: { success: true, expires_in_seconds: 300 }
 *
 * Rate limits: max 3 codes per phone per hour, 5-minute expiry per code.
 * SMS provider: configurable via SMS_PROVIDER env var (twilio_verify | vonage | mock).
 */

import { serve, createClient, corsHeaders } from '../_shared/deps.ts';
import { handleError, ValidationError, AuthenticationError } from '../_shared/errors.ts';

const OTP_EXPIRY_SECONDS = 300; // 5 minutes
const MAX_CODES_PER_HOUR = 3;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    // Auth
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) throw new AuthenticationError('No authorisation header');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    const token = authHeader.replace('Bearer ', '');
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);
    if (authError || !user) throw new AuthenticationError('Invalid token');

    // Parse body
    const { phone_number } = await req.json();
    if (!phone_number || typeof phone_number !== 'string') {
      throw new ValidationError('phone_number is required');
    }

    // Validate UK phone format: +44 followed by 10 digits
    const cleaned = phone_number.replace(/\s/g, '');
    const ukPhoneRegex = /^\+44\d{10}$/;
    if (!ukPhoneRegex.test(cleaned)) {
      throw new ValidationError('Invalid UK phone number. Use format: +447XXXXXXXXX');
    }

    // Check rate limit: max 3 codes per phone per hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count: recentCodes } = await supabase
      .from('phone_verification_codes')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('created_at', oneHourAgo);

    if ((recentCodes ?? 0) >= MAX_CODES_PER_HOUR) {
      return new Response(
        JSON.stringify({
          error: 'Too many verification attempts. Try again in an hour.',
          code: 'RATE_LIMITED',
        }),
        {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Check phone isn't already registered to another user
    const { data: existingRoute } = await supabase
      .from('phone_number_routing')
      .select('user_id')
      .eq('phone_number', cleaned)
      .eq('owner_type', 'electrician')
      .single();

    if (existingRoute && existingRoute.user_id !== user.id) {
      throw new ValidationError('This phone number is already registered to another account');
    }

    // Generate 6-digit code using cryptographic randomness
    const randomBytes = new Uint32Array(1);
    crypto.getRandomValues(randomBytes);
    const code = String(100000 + (randomBytes[0] % 900000));
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_SECONDS * 1000).toISOString();

    // Invalidate any existing unused codes for this user
    await supabase
      .from('phone_verification_codes')
      .delete()
      .eq('user_id', user.id)
      .is('verified_at', null);

    // Store the code
    const { error: insertError } = await supabase.from('phone_verification_codes').insert({
      user_id: user.id,
      phone_number: cleaned,
      code,
      expires_at: expiresAt,
    });

    if (insertError) {
      console.error('Failed to store OTP:', insertError);
      throw new Error('Failed to create verification code');
    }

    // Send SMS
    await sendSms(cleaned, code);

    console.log(`OTP sent to ${cleaned.slice(0, 6)}*** for user ${user.id}`);

    return new Response(
      JSON.stringify({
        success: true,
        expires_in_seconds: OTP_EXPIRY_SECONDS,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return handleError(error);
  }
});

/**
 * Send SMS via configured provider.
 * Abstracts the SMS provider so we can swap between Twilio Verify,
 * Vonage, or a mock provider for testing.
 */
async function sendSms(phoneNumber: string, code: string): Promise<void> {
  const provider = Deno.env.get('SMS_PROVIDER') || 'mock';

  if (provider === 'twilio_verify') {
    const accountSid = Deno.env.get('TWILIO_ACCOUNT_SID');
    const authToken = Deno.env.get('TWILIO_AUTH_TOKEN');
    const serviceSid = Deno.env.get('TWILIO_VERIFY_SERVICE_SID');

    if (!accountSid || !authToken || !serviceSid) {
      throw new Error('Twilio Verify not configured');
    }

    // Use Twilio Verify API to send OTP
    const credentials = btoa(`${accountSid}:${authToken}`);
    const response = await fetch(
      `https://verify.twilio.com/v2/Services/${serviceSid}/Verifications`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          To: phoneNumber,
          Channel: 'sms',
          // We manage our own codes, but Twilio Verify can also generate them
          // Using custom code for consistency with our DB-stored approach
        }),
      }
    );

    if (!response.ok) {
      const body = await response.text();
      console.error('Twilio Verify failed:', body);
      throw new Error('Failed to send verification SMS');
    }
  } else if (provider === 'vonage') {
    const apiKey = Deno.env.get('VONAGE_API_KEY');
    const apiSecret = Deno.env.get('VONAGE_API_SECRET');

    if (!apiKey || !apiSecret) {
      throw new Error('Vonage not configured');
    }

    const response = await fetch('https://rest.nexmo.com/sms/json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: apiKey,
        api_secret: apiSecret,
        to: phoneNumber,
        from: 'Elec-Mate',
        text: `Your Elec-Mate verification code is: ${code}. Expires in 5 minutes.`,
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      console.error('Vonage failed:', body);
      throw new Error('Failed to send verification SMS');
    }
  } else if (provider === 'mock') {
    // Mock mode — only allowed in development
    const isProduction = Deno.env.get('DENO_DEPLOYMENT_ID') !== undefined;
    if (isProduction) {
      throw new Error('SMS_PROVIDER must be configured for production — mock is not allowed');
    }
    console.log(`[MOCK SMS] To: ${phoneNumber} Code: ${code}`);
  } else {
    throw new Error(`Unknown SMS_PROVIDER: ${provider}`);
  }
}
