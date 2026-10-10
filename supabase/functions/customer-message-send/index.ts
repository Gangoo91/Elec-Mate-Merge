/**
 * customer-message-send (ELE-2070): hand ONE queued customer message to its provider.
 *
 *   POST { messageId }      Authorization: the office user's JWT
 *
 * queue_customer_message (database) has already decided the message may go:
 * caller scope, the client's consent and STOP, the monthly allowance and the
 * WhatsApp 24-hour window. It writes status 'sandbox' (nothing to do here) or
 * 'queued'. This function claims a queued row (queued → sending, so a double
 * tap cannot send twice), sends it through the firm's provider adapter and
 * records the provider id, or the error.
 *
 * Nothing is sent while the firm's provider is 'sandbox', which is every firm
 * until Elec-Mate switches one on. NOT DEPLOYED: see docs/customer-inbox-setup.md.
 */
import { createClient } from '../_shared/deps.ts';
import { corsHeaders } from '../_shared/cors.ts';
import { deny, identifyCaller } from '../_shared/caller.ts';
import { adapterFor } from '../_shared/messaging/adapters.ts';
import { clientFacingSender, sendEmail } from '../_shared/mailer.ts';
import { isSuppressed } from '../_shared/suppressions.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  if (req.method !== 'POST') return json(405, { error: 'Use POST' });

  const caller = await identifyCaller(req);
  if (!caller || caller.kind !== 'user') return deny(corsHeaders);

  let messageId: string | undefined;
  try {
    ({ messageId } = await req.json());
  } catch {
    return json(400, { error: 'Send JSON: { messageId }' });
  }
  if (!messageId || !UUID.test(messageId)) return json(400, { error: 'messageId must be a UUID' });

  const db = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });
  const { data: msg, error } = await db
    .from('firm_customer_messages')
    .select(
      'id, firm_id, customer_id, channel, direction, body, template_key, to_address, from_address, status, provider'
    )
    .eq('id', messageId)
    .maybeSingle();
  if (error) return json(500, { error: 'Could not read the message' });
  if (!msg || msg.direction !== 'out') return json(404, { error: 'Message not found' });

  // The caller must act for this firm, by the database's own rule.
  const asUser = createClient(SUPABASE_URL, Deno.env.get('SUPABASE_ANON_KEY')!, {
    global: { headers: { Authorization: req.headers.get('Authorization')! } },
    auth: { persistSession: false },
  });
  const { error: scopeErr } = await asUser.rpc('get_firm_messaging', { p_firm: msg.firm_id });
  if (scopeErr) return deny(corsHeaders, 403, 'You do not have access to this firm');

  if (msg.status === 'sandbox') return json(200, { status: 'sandbox', sent: false });
  if (msg.status !== 'queued')
    return json(200, { status: msg.status, sent: msg.status !== 'failed' });

  // Claim it: only one caller moves queued → sending.
  const { data: claimed } = await db
    .from('firm_customer_messages')
    .update({ status: 'sending', updated_at: new Date().toISOString() })
    .eq('id', msg.id)
    .eq('status', 'queued')
    .select('id')
    .maybeSingle();
  if (!claimed) return json(200, { status: 'sending', sent: false, note: 'Already being sent' });

  const finish = async (
    status: 'sent' | 'failed',
    providerMessageId: string | null,
    err?: string
  ) => {
    await db
      .from('firm_customer_messages')
      .update({
        status,
        provider_message_id: providerMessageId,
        error: err ? err.slice(0, 300) : null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', msg.id);
    return json(status === 'sent' ? 200 : 502, { status, sent: status === 'sent', error: err });
  };

  try {
    if (msg.channel === 'email') {
      if (await isSuppressed(db, msg.to_address))
        return finish('failed', null, 'This address is on the do-not-send list');
      const { data: company } = await db
        .from('company_profiles')
        .select('company_name, company_email')
        .eq('user_id', msg.firm_id)
        .maybeSingle();
      const sender = clientFacingSender({
        companyName: company?.company_name,
        companyEmail: company?.company_email,
      });
      const res = await sendEmail({
        from: sender.from,
        replyTo: sender.replyTo,
        to: msg.to_address,
        subject: `A message from ${company?.company_name || 'your electrician'}`,
        text: msg.body,
        html: `<html><body><p style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5;white-space:pre-wrap">${escapeHtml(msg.body)}</p></body></html>`,
        log: { template: 'customer_message', entityId: msg.id, userId: msg.firm_id },
      });
      if (res.error) return finish('failed', null, res.error.message);
      return finish('sent', res.data?.id ?? null);
    }

    const { data: settings } = await db
      .from('firm_messaging_settings')
      .select('provider, whatsapp_phone_number_id')
      .eq('firm_id', msg.firm_id)
      .maybeSingle();
    const provider = settings?.provider ?? 'sandbox';
    const adapter = adapterFor(provider, msg.channel, settings?.whatsapp_phone_number_id ?? null);
    if (!adapter) return finish('failed', null, `${provider} cannot send ${msg.channel} yet`);
    const result = await adapter.send({
      id: msg.id,
      channel: msg.channel,
      to: msg.to_address,
      from: msg.from_address,
      body: msg.body,
      templateKey: msg.template_key,
    });
    if (result.status === 'sandbox') {
      await db.from('firm_customer_messages').update({ status: 'sandbox' }).eq('id', msg.id);
      return json(200, { status: 'sandbox', sent: false });
    }
    return result.ok
      ? finish('sent', result.providerMessageId)
      : finish('failed', null, result.error);
  } catch (e) {
    console.error('customer-message-send failed', msg.id, (e as Error).message);
    return finish('failed', null, 'The provider did not answer. Try again.');
  }
});
