/**
 * OpenClaw plugin: Mate Router.
 *
 * Intercepts every inbound WhatsApp message via the `inbound_claim` hook. Calls
 * the Elec-AI MCP server (`/api/wa-inbound`) to decide whether the sender is
 * already a paying user (route to their per-user agent — return `handled: false`
 * so OpenClaw's normal binding-resolution proceeds), or an unbound sender (we
 * `handle` the message ourselves with an immediate reply and prevent the
 * default agent from seeing it).
 *
 * This is the answer to the broken-binding problem documented in
 * services/elec-ai-mcp/docs/inbound-routing.md. The catch-all binding approach
 * was wrong because OpenClaw's binding registry doesn't support `peer.id`
 * matchers — the only sane place to make routing decisions is in our own code,
 * called via this hook.
 */

import { definePluginEntry } from 'openclaw/plugin-sdk/plugin-entry';
import { resolveLivePluginConfigObject } from 'openclaw/plugin-sdk/plugin-config-runtime';
import crypto from 'node:crypto';

const PLUGIN_ID = 'mate-router';

/** Convert a WhatsApp JID like `447701234567@s.whatsapp.net` to E.164 (`+447701234567`). */
function jidToE164(jid) {
  if (typeof jid !== 'string' || jid.length === 0) return null;
  const before = jid.includes('@') ? jid.slice(0, jid.indexOf('@')) : jid;
  // Strip any device suffix (e.g. `447...:42`) and non-digit characters.
  const digits = before.split(':')[0].replace(/\D/g, '');
  if (digits.length < 10) return null;
  return `+${digits}`;
}

/** HMAC-sign a canonical payload identical to the verifier in services/elec-ai-mcp/src/lib/request-signer.ts. */
function signRequest(canonical, timestamp, nonce, secret) {
  return crypto
    .createHmac('sha256', secret)
    .update(`${canonical}:${timestamp}:${nonce}`)
    .digest('hex');
}

/**
 * Ask MCP what to do with this inbound message.
 *
 * Returns `null` on transport failure (caller should surface a friendly fallback
 * reply rather than letting the user's message disappear silently).
 */
async function askMcp(cfg, body) {
  const timestamp = Date.now();
  const nonce = crypto.randomBytes(16).toString('hex');
  // Canonical signed payload: "<sender_phone>|<conversation_id>"
  const canonical = `${body.sender_phone}|${body.conversation_id ?? ''}`;
  const signature = signRequest(canonical, timestamp, nonce, cfg.hmacSecret);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), cfg.timeoutMs ?? 4_000);

  try {
    const res = await fetch(`${cfg.mcpUrl.replace(/\/$/, '')}/api/wa-inbound`, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': cfg.apiKey,
        'X-Request-Signature': signature,
        'X-Request-Timestamp': String(timestamp),
        'X-Request-Nonce': nonce,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      // eslint-disable-next-line no-console
      console.error(
        `[${PLUGIN_ID}] /api/wa-inbound returned ${res.status} for ${body.sender_phone}`
      );
      return null;
    }
    return await res.json();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(
      `[${PLUGIN_ID}] /api/wa-inbound failed for ${body.sender_phone}:`,
      err instanceof Error ? err.message : String(err)
    );
    return null;
  } finally {
    clearTimeout(timer);
  }
}

const FRIENDLY_FALLBACK = {
  text:
    "Mate's having a wobble — try again in a minute. If this keeps happening, drop a note to support@elec-mate.com.",
};

const FRIENDLY_REDIRECT = {
  text:
    "Hey 👋 — looks like you're trying to set up Mate. Tap the activation link from the Elec-Mate app, or visit elec-mate.com/electrician/business-ai to get one.",
};

function readConfig(api) {
  return (
    resolveLivePluginConfigObject(
      api.runtime?.config?.current ? () => api.runtime.config.current() : undefined,
      PLUGIN_ID,
      api.pluginConfig
    ) ?? api.pluginConfig
  );
}

const mateRouter = definePluginEntry({
  id: PLUGIN_ID,
  name: 'Mate Router',
  description:
    'Routes WhatsApp inbound to per-user agent or onboarding handler via the Elec-AI MCP server.',
  register(api) {
    api.on('inbound_claim', async (event, ctx) => {
      // Only act on WhatsApp.
      if (ctx.channelId !== 'whatsapp' && event.channel !== 'whatsapp') return;
      // Group messages aren't part of the onboarding flow. Let OpenClaw handle them normally.
      if (event.isGroup) return;

      const cfg = readConfig(api);
      if (!cfg?.mcpUrl || !cfg?.apiKey || !cfg?.hmacSecret) {
        // eslint-disable-next-line no-console
        console.error(`[${PLUGIN_ID}] missing config (mcpUrl/apiKey/hmacSecret) — passing through`);
        return; // fall back to default routing
      }

      const senderPhone = jidToE164(event.senderId ?? ctx.senderId ?? '');
      if (!senderPhone) {
        // eslint-disable-next-line no-console
        console.warn(
          `[${PLUGIN_ID}] could not parse sender JID, passing through:`,
          event.senderId ?? ctx.senderId
        );
        return;
      }

      const decision = await askMcp(cfg, {
        sender_phone: senderPhone,
        message_text: event.body ?? event.content ?? '',
        conversation_id: event.conversationId ?? ctx.conversationId ?? null,
        message_id: event.messageId ?? ctx.messageId ?? null,
      });

      if (!decision) {
        // MCP unreachable — claim the message so OpenClaw doesn't hand it to the default agent
        // (which might be the wrong user's agent), and tell the sender we're having trouble.
        return { handled: true, reply: FRIENDLY_FALLBACK };
      }

      // route_to: 'user-session' — the sender is bound. We let OpenClaw's normal session-binding
      // flow take it from here (return undefined / no `handled` key so the default dispatcher runs).
      if (decision.route_to === 'user-session') {
        return; // fall through to normal routing
      }

      // route_to: 'immediate_reply' — we handle it. Send the reply MCP gave us back to the user
      // and prevent the default agent from picking up the message.
      if (decision.route_to === 'immediate_reply') {
        const text =
          typeof decision.immediate_reply === 'string' && decision.immediate_reply.length > 0
            ? decision.immediate_reply
            : FRIENDLY_REDIRECT.text;
        return { handled: true, reply: { text } };
      }

      // Unknown decision shape — log and fall through (safer than silently dropping).
      // eslint-disable-next-line no-console
      console.warn(`[${PLUGIN_ID}] unexpected decision shape, passing through:`, decision);
      return;
    });
  },
});

export default mateRouter;
