// Internal test endpoint — fires a v11 winback to a given recipient.
// Auth: X-VPS-API-Key header (service-to-service, not user JWT).
// Use only for staff test sends. NOT a customer-facing endpoint.

import { captureException } from '../_shared/sentry.ts';
import { Resend } from '../_shared/mailer.ts';
import {
  generateV11HTML,
  generateV11PlainText,
  v11Subject,
  buildUnsubscribeUrl,
  buildUnsubscribeHeaders,
  FROM_V11,
  REPLY_TO,
} from '../_shared/winback-v11.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-vps-api-key',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const vpsKey = req.headers.get('X-VPS-API-Key');
  const expected = Deno.env.get('VPS_API_KEY');
  if (!vpsKey || !expected || vpsKey !== expected) {
    return new Response(JSON.stringify({ error: 'Unauthorised' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const body = (await req.json().catch(() => ({}))) as {
    to?: string;
    first_name?: string;
    variant?: 'winback' | 'early_access';
  };
  const to = (body.to || '').trim().toLowerCase();
  const firstName = body.first_name || 'Andrew';
  const variant = body.variant || 'winback';
  if (!to || !/.+@.+\..+/.test(to)) {
    return new Response(JSON.stringify({ error: 'Valid `to` email required' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
    const unsubscribeUrl = await buildUnsubscribeUrl(to);
    const html = generateV11HTML(variant, firstName, unsubscribeUrl);
    const text = generateV11PlainText(variant, firstName, unsubscribeUrl);
    const subject = `[TEST] ${v11Subject(variant, firstName)}`;

    const { data, error } = await resend.emails.send({
      from: FROM_V11,
      replyTo: REPLY_TO,
      to: [to],
      subject,
      html,
      text,
      headers: buildUnsubscribeHeaders(unsubscribeUrl),
      tags: [
        { name: 'campaign', value: 'winback' },
        { name: 'version', value: 'v11' },
        { name: 'type', value: 'test' },
      ],
    });

    if (error) {
      return new Response(JSON.stringify({ ok: false, error: error.message ?? String(error) }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ ok: true, to, subject, resend_id: data?.id ?? null }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    await captureException(err, { functionName: 'mate-test-winback', requestUrl: req.url, requestMethod: req.method });
    const msg = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ ok: false, error: msg }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
