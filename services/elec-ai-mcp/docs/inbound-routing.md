# WhatsApp Mate — Inbound Routing Architecture

> **Author:** Andrew Moore (with Claude). **Last updated:** 2026-04-28.
> **Status:** investigation complete, implementation in progress (Option B chosen).

This document records what we learned about OpenClaw's inbound-routing model on 2026-04-28 and the routing strategy we picked for Mate. It exists so that nobody — me included — has to re-derive this from OpenClaw source again.

## TL;DR

- OpenClaw's official `bindings` schema only supports `{ channel, accountId, agentId }`. **There is no native `peer.id` matcher.** The `{ "peer": { "kind": "direct", "id": "+44..." } }` entries we (and the existing provisioning code) have been writing into `openclaw.json` since March are **silently ignored** by the binding registry — `bindings-C4DZxyB0.js:20` resolves bindings purely by `channel + accountId + agentId`.
- That means today's `phone_number_routing`-style per-user agent routing **never actually worked at the OpenClaw binding layer**. The only reason individual users have been getting their own per-user agent is because the **conversation-binding service** (`session-binding-service-BQV_OJiA.js`) persists `(channel, accountId, conversationId) → targetSessionKey` after the *first* reply — i.e. the *default* agent (whichever happens to be `main` or first in `agents.list`) handled the inbound, and the session binding then pinned that conversation to whichever session key got generated. Routing has been emergent, not declarative.
- This explains why my catch-all binding addition broke everything: there is effectively only ONE binding scheme — channel-level — and adding the catch-all changed the default-agent resolution for any conversation without a pre-existing session binding.
- The right fix isn't a smarter binding. It's an **inbound interception webhook** (Option B from the plan) that sits in front of OpenClaw's dispatcher and decides routing in MCP code, where we have a real database of `phone_number_routing` to consult. OpenClaw exposes `dispatchInboundMessageWithDispatcher` and a `replyResolver` parameter (`dispatch-gfPCX7Ws.js:1195`) — that's our extension point, but only for a custom plugin format we'd have to author.

## What I checked

| Question | Answer | Source |
|---|---|---|
| Are there CLI hooks for inbound routing? | No — `openclaw hooks list` returns 4 bundled hooks: `boot-md`, `bootstrap-extra-files`, `command-logger`, `session-memory`. None are pre-route. | `openclaw hooks list` |
| Are there plugins for inbound webhooks? | No marketplace plugin matches `whatsapp|webhook|inbound|router`. The 47 enabled plugins are all model providers + the WhatsApp channel itself. | `openclaw plugins list \| grep -iE …` |
| Does the `bindings` array support `peer.id` matchers? | **No.** `bindings-C4DZxyB0.js`'s `resolveNormalizedRouteBindingMatch` only normalises `channel` + `accountId`. `peer` is dead JSON. | `/usr/lib/node_modules/openclaw/dist/bindings-C4DZxyB0.js` |
| Does `agents bind` CLI support per-peer? | No. `--bind <channel[:accountId]>` only. | `openclaw agents bind --help` |
| Is there an inbound-message dispatcher we can wrap? | Yes: `dispatchInboundMessageWithDispatcher(params)` in `dispatch-gfPCX7Ws.js:1195`, takes a `replyResolver` parameter. But it's an internal dispatcher, not a public webhook. | `dispatch-gfPCX7Ws.js` |
| Does session-binding pin conversations to sessions? | Yes, after a reply lands. `session-binding-service-BQV_OJiA.js` keys by `channel:accountId:conversationId → targetSessionKey`, persisted to disk. | `session-binding-service-BQV_OJiA.js` |
| Does the WhatsApp plugin emit a webhook for inbound? | No public outbound webhook. The plugin invokes `dispatchInboundMessageWithDispatcher` directly. | `extensions/whatsapp/*` |

## Why the catch-all-binding approach failed

When I added `{ "agentId": "default-onboarding", "match": { "channel": "whatsapp" } }` to `openclaw.json`, my mental model was "specific peer bindings beat catch-all bindings". That model is wrong because **the per-peer bindings never existed** in OpenClaw's view of the world — only the catch-all was visible. So every conversation that hadn't already been pinned by `session-binding-service` got handed to the catch-all agent.

For users who'd been chatting recently (so their conversation-binding cache was warm), their session was still pinned to the right agent. For users sending a fresh message after a gateway restart (or after the cache expired), the catch-all won. That's exactly what Andrew saw in the screenshot: he was a "warm" user yesterday but a "cold" one this morning, and the catch-all swept him.

## The architecture decision: Option B (webhook intercept)

Option A (in-process OpenClaw hook plugin) would be the right call if we owned OpenClaw. We don't, and the version-bump in 2026.4.26 just demonstrated how brittle binding-layer assumptions are. Option C (polling) is too slow.

Option B: write our own inbound dispatcher as an OpenClaw plugin. The plugin replaces the default `replyResolver` for the `whatsapp` channel; on every inbound message the plugin POSTs `{ sender_phone, message_text, conversation_id }` to MCP `/api/wa-inbound`. MCP responds with `{ route_to: 'user-session' | 'onboarding-handler', user_id?: string, immediate_reply?: string }`. The plugin then either:
- Forwards the message to the appropriate per-user agent session, OR
- Sends `immediate_reply` directly back via the WhatsApp outbound API (for the "START XXXXXX" success / failure cases).

The advantages over what we have now:
- **No catch-all binding** — we delete it. Routing is centralised in our code, not OpenClaw config.
- **Bound peers never bleed into the onboarding agent.** `phone_number_routing` is the only source of truth, and we own that.
- **Activation completes in one round-trip.** The plugin POSTs `{ code, sender_phone }` to `/api/wa-onboarding`, which already exists, and the MCP response carries the welcome message back.
- **Survives OpenClaw upgrades.** We're a plugin author, not a config user; the binding-resolution rewrite that bit us on 2026.4.26 wouldn't affect a plugin that uses the public `replyResolver` extension point.

## Implementation plan (Phase 2 — to be executed)

1. **Local: build the plugin.** A minimal OpenClaw plugin in `services/openclaw-mate-router/`:
   - Targets the WhatsApp channel only.
   - Implements `replyResolver` per `dispatch-gfPCX7Ws.js:706`.
   - On each inbound: extract sender JID → E.164, POST to MCP `/api/wa-inbound` with HMAC-signed body, await response, dispatch accordingly.
   - Handles MCP unavailability gracefully (timeout 3s → fail to a friendly "we're having trouble routing your message" reply, *never* silently drops).
2. **Local: build `/api/wa-inbound` endpoint** in `services/elec-ai-mcp/src/api/wa-inbound.ts`.
   - Accepts `{ sender_phone, message_text, conversation_id }` + HMAC + VPS API key headers.
   - If `phone_number_routing` has a row for `sender_phone` → return `{ route_to: 'user-session', user_id, agent_id }` (the plugin resolves the agent's session and forwards).
   - Else if `message_text` matches `/^\s*START\s+\d{6}\s*$/i` → call the existing `/api/wa-onboarding` flow inline → return `{ route_to: 'immediate_reply', immediate_reply: result.reply }`.
   - Else → return `{ route_to: 'immediate_reply', immediate_reply: <friendly redirect to elec-mate.com/electrician/business-ai> }`.
3. **VPS: install the plugin.** `openclaw plugins install <path>`. Add to `openclaw.json` under `plugins.entries` (same shape as the WhatsApp plugin entry).
4. **VPS: revert the catch-all binding.** Remove the entry I added to `openclaw.json` on 2026-04-28. Keep `default-onboarding` workspace files on disk in case we need them later, but the agent itself is now redundant.
5. **VPS: restart gateway.** Verify all 9 existing users can send a message and reach their per-user agent (the `phone_number_routing` lookup will resolve them). Verify a fresh number triggers the onboarding flow.

## Out of scope for this doc

- The actual plugin code (lives in `services/openclaw-mate-router/` once written).
- The redesigned onboarding page (Phase 1, separate file).
- Multi-number pool architecture (deferred — single number is fine until ~200 users).
