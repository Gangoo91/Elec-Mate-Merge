/**
 * Twilio inbound (ELE-2022 calls and texts) — webhook for the account's Elec-Mate number.
 *
 *   ?kind=voice      a call the electrician didn't answer (their mobile forwards it here):
 *                    card created instantly ("Missed call from 07…"), caller texted a link,
 *                    greeting + voicemail recorded. Calling again joins the same card.
 *   ?kind=voicemail  the recording: AI writes it out, then it joins the card and the whole
 *                    card is re-read by the normal pipeline (fit, distance, visit times, alert)
 *   ?kind=sms        a text: joins that number's open card, or becomes a new enquiry
 *
 * Auth: Twilio's X-Twilio-Signature once TWILIO_AUTH_TOKEN is set. In TEST MODE
 * (no Twilio keys) only internal callers with the service key get through, and
 * texts are logged instead of sent.
 */

import { createClient, type SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { captureException } from '../_shared/sentry.ts';
import { withAiLog } from '../_shared/ai-log.ts';
import {
  fetchRecording,
  isUkMobile,
  sendSms,
  twilioLive,
  twiml,
  ukDisplay,
  validTwilioSignature,
  xmlEscape,
} from '../_shared/twilio.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
// Twilio signs the public address, not whatever host the function sees internally
const PUBLIC_FN_URL = `${SUPABASE_URL}/functions/v1/twilio-inbound`;
const PUBLIC_PAGE = 'https://www.elec-mate.com/enquire/';
// Calls/texts that make a card or a text-back, per account per hour (each costs an AI read / an SMS)
const MAX_PER_HOUR = 30;
// A repeat caller within this window joins their open card instead of starting a new one
const SAME_CALLER_MS = 24 * 3600_000;
const SAY = (text: string) => `<Say voice="Polly.Amy" language="en-GB">${xmlEscape(text)}</Say>`;
const digits = (v: string | null | undefined) => (v ?? '').replace(/\D/g, '');
const ukTime = () =>
  new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date());

type Line = {
  user_id: string;
  twilio_number: string;
  auto_text: boolean;
  auto_text_message: string | null;
  voicemail: boolean;
  greeting: string | null;
};

const background = (p: Promise<unknown>) => {
  const rt = (globalThis as { EdgeRuntime?: { waitUntil: (p: Promise<unknown>) => void } })
    .EdgeRuntime;
  const safe = p.catch(async (err) => {
    console.error('[twilio-inbound] background failed', err);
    await captureException(err, { functionName: 'twilio-inbound', extra: { step: 'background' } });
  });
  if (rt?.waitUntil) rt.waitUntil(safe);
  return safe;
};

/** Through the normal pipeline (AI read, fit, visit times, alerts). */
async function pipeline(formToken: string, body: Record<string, unknown>) {
  const res = await fetch(`${SUPABASE_URL}/functions/v1/inbound-enquiry-email?token=${formToken}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${SERVICE_KEY}` },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`pipeline ${res.status}: ${(await res.text()).slice(0, 200)}`);
}

async function transcribe(audio: { mime: string; data: string }): Promise<string | null> {
  const key = Deno.env.get('GEMINI_API_KEY');
  if (!key) return null;
  return withAiLog('gemini', 'gemini-3.5-flash', async () => {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${key}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(20000),
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text:
                    'Transcribe this UK voicemail left for an electrician, word for word, in UK English. ' +
                    'Write postcodes in capitals with the space (SK4 2AB) and phone numbers as digits. ' +
                    'Return only the transcript. If nothing was said, return an empty string.',
                },
                { inline_data: { mime_type: audio.mime, data: audio.data } },
              ],
            },
          ],
          generationConfig: { temperature: 0, maxOutputTokens: 4000 },
        }),
      }
    );
    if (!res.ok) throw new Error(`Gemini ${res.status}`);
    const d = await res.json();
    return ((d?.candidates?.[0]?.content?.parts ?? []) as { text?: string }[])
      .map((p) => p.text ?? '')
      .join('')
      .trim();
  }).catch((err) => {
    console.error('[twilio-inbound] transcription failed', err);
    return null;
  });
}

async function notifyOwner(
  supabase: SupabaseClient,
  ownerId: string,
  enquiryId: string,
  title: string,
  body: string
) {
  const { data: admins } = await supabase
    .from('employer_admins')
    .select('user_id')
    .eq('employer_id', ownerId)
    .eq('status', 'active');
  const link = `/electrician/enquiries?open=${enquiryId}`;
  for (const userId of [
    ownerId,
    ...((admins ?? []) as { user_id: string }[]).map((a) => a.user_id),
  ]) {
    await supabase.from('user_notifications').insert({
      user_id: userId,
      type: 'enquiry',
      title,
      message: body,
      link,
      metadata: { enquiry_id: enquiryId },
      is_read: false,
    });
    await fetch(`${SUPABASE_URL}/functions/v1/send-push-notification`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${SERVICE_KEY}` },
      body: JSON.stringify({
        userId,
        title,
        body,
        type: 'default',
        data: {
          deep_link: link,
          category: 'enquiry',
          enquiry_id: enquiryId,
          tag: `enquiry-${enquiryId}`,
        },
      }),
    }).catch(() => {});
  }
}

/** This number's open phone/text card from the last day, if any. */
async function openCardFor(supabase: SupabaseClient, ownerId: string, phone: string) {
  const tail = digits(phone).slice(-10);
  const { data } = await supabase
    .from('enquiries')
    .select('id, phone, name, raw_text')
    .eq('user_id', ownerId)
    .eq('status', 'new')
    .in('source', ['phone', 'sms'])
    .gte('received_at', new Date(Date.now() - SAME_CALLER_MS).toISOString())
    .order('received_at', { ascending: false })
    .limit(30);
  return (
    (
      (data ?? []) as {
        id: string;
        phone: string | null;
        name: string | null;
        raw_text: string | null;
      }[]
    ).find((e) => digits(e.phone).slice(-10) === tail) ?? null
  );
}

async function knownCustomer(supabase: SupabaseClient, ownerId: string, phone: string) {
  const tail = digits(phone).slice(-10);
  const { data } = await supabase
    .from('customers')
    .select('id, name, phone')
    .eq('user_id', ownerId)
    .ilike('phone', '%' + tail.slice(-6).split('').join('%'))
    .limit(50);
  return (
    ((data ?? []) as { id: string; name: string; phone: string | null }[]).find(
      (c) => digits(c.phone).slice(-10) === tail
    ) ?? null
  );
}

async function busy(supabase: SupabaseClient, ownerId: string) {
  const { count } = await supabase
    .from('enquiries')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', ownerId)
    .in('source', ['phone', 'sms'])
    .gte('received_at', new Date(Date.now() - 3600_000).toISOString());
  return (count ?? 0) >= MAX_PER_HOUR;
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') return new Response('POST only', { status: 405 });
  const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

  try {
    const url = new URL(req.url);
    const kind = url.searchParams.get('kind') ?? 'voice';
    const ctype = req.headers.get('content-type') ?? '';
    const params: Record<string, string> = ctype.includes('application/json')
      ? await req.json()
      : Object.fromEntries([...(await req.formData()).entries()].map(([k, v]) => [k, String(v)]));

    // ── Who's calling this webhook? ──────────────────────────────────
    const internal = req.headers.get('authorization') === `Bearer ${SERVICE_KEY}`;
    if (!internal) {
      if (!twilioLive()) return new Response('Twilio is not switched on yet', { status: 503 });
      if (!(await validTwilioSignature(req, params, PUBLIC_FN_URL + url.search))) {
        return new Response('forbidden', { status: 403 });
      }
    }

    const from = params.From ?? '';
    const to = params.To ?? '';
    // Withheld numbers arrive as "anonymous", "+266696687" etc.
    // Any real number counts (an Irish or other caller can still be rung back);
    // only UK mobiles get the text-back
    const callerKnown = /^\+\d{7,15}$/.test(from);
    const callerShown = callerKnown ? (from.startsWith('+44') ? ukDisplay(from) : from) : null;

    const { data: line } = await supabase
      .from('phone_lines')
      .select('user_id, twilio_number, auto_text, auto_text_message, voicemail, greeting')
      .eq('twilio_number', to)
      .eq('enabled', true)
      .maybeSingle();
    if (!line) {
      return kind === 'sms'
        ? twiml('')
        : twiml(SAY('Sorry, this number is not in use.') + '<Hangup/>');
    }
    const l = line as Line;

    // The account's inbox (created on first use, same as the app does)
    await supabase
      .from('enquiry_inboxes')
      .upsert(
        { user_id: l.user_id, token: crypto.randomUUID().replace(/-/g, '').slice(0, 10) },
        { onConflict: 'user_id', ignoreDuplicates: true }
      );
    const [{ data: inbox }, { data: cp }] = await Promise.all([
      supabase
        .from('enquiry_inboxes')
        .select('form_token')
        .eq('user_id', l.user_id)
        .eq('enabled', true)
        .maybeSingle(),
      supabase
        .from('company_profiles')
        .select('company_name')
        .eq('user_id', l.user_id)
        .maybeSingle(),
    ]);
    const business = (cp?.company_name as string | null)?.trim() || null;
    // Inbox paused: still answer politely, store nothing
    if (!inbox?.form_token) {
      return kind === 'sms'
        ? twiml('')
        : twiml(
            SAY(
              `Sorry, ${business ?? 'we'} can't take your call right now. Please try again later.`
            ) + '<Hangup/>'
          );
    }

    // ── Missed call ──────────────────────────────────────────────────
    if (kind === 'voice') {
      const callSid = (params.CallSid ?? crypto.randomUUID()).slice(0, 64);
      const willText = l.auto_text && callerKnown && isUkMobile(from);
      let texted = false;

      if (!(await busy(supabase, l.user_id))) {
        const open = callerKnown ? await openCardFor(supabase, l.user_id, from) : null;
        if (open) {
          // Rang again: same card, now pointing at this call so its voicemail lands here
          await supabase.rpc('append_enquiry_text', {
            p_id: open.id,
            p_text: `Called again at ${ukTime()}.`,
            p_message_id: `call:${callSid}`,
          });
          await supabase.from('enquiries').update({ call_sid: callSid }).eq('id', open.id);
          background(
            notifyOwner(
              supabase,
              l.user_id,
              open.id,
              `Missed call again: ${open.name ?? callerShown}`,
              'Tap to call back'
            )
          );
        } else {
          // Straight into the inbox: nothing to read yet, so no AI and no wait
          const customer = callerKnown ? await knownCustomer(supabase, l.user_id, from) : null;
          const who = customer?.name ?? callerShown ?? 'a withheld number';
          const { data: card, error } = await supabase
            .from('enquiries')
            .insert({
              user_id: l.user_id,
              source: 'phone',
              status: 'new',
              name: customer?.name ?? null,
              phone: callerShown,
              matched_customer_id: customer?.id ?? null,
              summary: `Missed call from ${who}`,
              raw_text: `Missed call from ${who} at ${ukTime()}.`,
              call_sid: callSid,
              message_id: `call:${callSid}`,
            })
            .select('id')
            .single();
          if (error && error.code !== '23505') throw error;
          if (card) {
            await supabase
              .from('enquiry_inboxes')
              .update({ last_received_at: new Date().toISOString() })
              .eq('user_id', l.user_id);
            background(
              notifyOwner(
                supabase,
                l.user_id,
                card.id,
                `Missed call: ${who}`,
                customer ? 'Existing customer · tap to call back' : 'Tap to call back'
              )
            );
            // One text per new card: ringing three times doesn't send three texts
            if (willText) {
              texted = true;
              const msg =
                l.auto_text_message?.trim() ||
                `Sorry I missed your call${business ? `, it's ${business}` : ''}. Tell me what you need here and I'll get back to you today: ${PUBLIC_PAGE}${inbox.form_token}`;
              background(sendSms(l.twilio_number, from, msg));
            }
          }
        }
      }

      const name = business ?? 'we';
      const greeting =
        l.greeting?.trim() ||
        (l.voicemail
          ? `Sorry, ${name} can't take your call right now. Please leave your name, your postcode and what you need after the tone, and we'll get back to you today.`
          : texted
            ? `Sorry, ${name} can't take your call right now. We'll send you a text with a link to tell us what you need.`
            : `Sorry, ${name} can't take your call right now. Please try again later.`);
      return l.voicemail
        ? twiml(
            SAY(greeting) +
              `<Record maxLength="120" timeout="5" playBeep="true" action="${xmlEscape(
                `${PUBLIC_FN_URL}?kind=voicemail`
              )}" method="POST"/>`
          )
        : twiml(SAY(greeting) + '<Hangup/>');
    }

    // ── Voicemail: written out, then the whole card is re-read ───────
    if (kind === 'voicemail') {
      const callSid = params.CallSid ?? '';
      const seconds = Math.round(Number(params.RecordingDuration ?? 0));
      background(
        (async () => {
          if (seconds < 2) return;
          // The call's card is made as the call starts; allow a moment in case it's still saving
          let card: { id: string } | null = null;
          for (let i = 0; i < 4 && !card; i++) {
            if (i) await new Promise((r) => setTimeout(r, 1500));
            const { data } = await supabase
              .from('enquiries')
              .select('id')
              .eq('user_id', l.user_id)
              .eq('call_sid', callSid)
              .maybeSingle();
            card = data as { id: string } | null;
          }
          // No card (the call was over the hourly cap): don't start one, and don't pay to transcribe
          if (!card && (await busy(supabase, l.user_id))) return;
          const audio = params.RecordingUrl ? await fetchRecording(params.RecordingUrl) : null;
          // Test mode passes the words directly
          const transcript = (
            (audio ? await transcribe(audio) : null) ??
            (internal ? params.TranscriptionText : '') ??
            ''
          ).trim();
          const words =
            transcript || `(${seconds}s voicemail that couldn't be written out. Call them back.)`;
          await pipeline(inbox.form_token, {
            phone: callerShown,
            message: `Voicemail (${seconds}s) at ${ukTime()}:\n${words}`,
            channel: 'phone',
            call_sid: callSid,
            message_id: `vm:${callSid}`,
            voicemail_seconds: seconds,
            ...(card ? { append_to: card.id, append_kind: 'voicemail' } : {}),
          });
        })()
      );
      return twiml(SAY('Thank you. We will be in touch soon.') + '<Hangup/>');
    }

    // ── Text message ─────────────────────────────────────────────────
    if (kind === 'sms') {
      const body = (params.Body ?? '').trim().slice(0, 2000);
      // Opt-out / keyword texts are handled by Twilio, never enquiries
      if (
        !body ||
        !callerKnown ||
        /^(stop|stopall|unsubscribe|cancel|end|quit|start|unstop|help|info)\W*$/i.test(body)
      ) {
        return twiml('');
      }
      const open = await openCardFor(supabase, l.user_id, from);
      if (!open && (await busy(supabase, l.user_id))) return twiml('');
      background(
        pipeline(inbox.form_token, {
          phone: callerShown,
          message: `Text at ${ukTime()}: ${body}`,
          channel: 'sms',
          message_id: `sms:${params.MessageSid ?? crypto.randomUUID()}`,
          ...(open ? { append_to: open.id, append_kind: 'sms' } : {}),
        })
      );
      return twiml('');
    }

    return new Response('unknown kind', { status: 400 });
  } catch (err) {
    console.error('[twilio-inbound] failed', err);
    await captureException(err, {
      functionName: 'twilio-inbound',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    // Never leave a caller in silence
    return twiml(SAY('Sorry, something went wrong. Please try again later.') + '<Hangup/>');
  }
});
