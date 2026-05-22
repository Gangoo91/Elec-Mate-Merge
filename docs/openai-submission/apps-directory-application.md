# OpenAI Apps / Connectors Directory submission

**Path:** Apps Directory — the official Connector that appears inside ChatGPT's Connectors picker for ALL paid users
**Live in:** 4-8 weeks (OpenAI review process)
**Apply at:** https://chatgpt.com/apps/developer (or https://platform.openai.com/apps for newer flows)
**Different from:** Custom GPT (which is the GPT Store; this is the deeper Connector listing)

---

## What OpenAI will ask for

### 1. App identity

| Field                   | Value                                                     |
| ----------------------- | --------------------------------------------------------- |
| **App name**            | Elec-Mate                                                 |
| **Tagline** (60 chars)  | Verified BS 7671 answers for UK electricians              |
| **Category**            | Productivity → Trades & Construction                      |
| **Sub-category**        | Education / Reference                                     |
| **Languages supported** | English (UK) — en-GB                                      |
| **Audience**            | UK electricians, apprentices, contractors, college tutors |

### 2. Description (long form, ~500 chars)

```
Elec-Mate is the UK's all-in-one electrical platform — and now the official MCP connector for ChatGPT users in the UK electrical trade.

Connect Elec-Mate and ChatGPT can call 20 verified tools to answer UK electrical questions with citations to BS 7671:2018+A4:2026: cable sizing, max Zs lookups, EICR coding (C1/C2/C3/FI), real UK labour times (199k record dataset), regional pricing, Part P decisions, and certificate guidance.

Every response cites the BS 7671 regulation, table, or IET source. No training-data guesses.
```

### 3. Technical details

| Field              | Value                                                  |
| ------------------ | ------------------------------------------------------ |
| **MCP server URL** | `https://www.elec-mate.com/api/public/v1/mcp`          |
| **Protocol**       | Model Context Protocol (MCP) 2025-03-26                |
| **Transport**      | Streamable HTTP (POST JSON-RPC 2.0)                    |
| **Authentication** | None (read-only public surface)                        |
| **Tool count**     | 20                                                     |
| **OpenAPI spec**   | `https://www.elec-mate.com/openapi.json`               |
| **Manifest**       | `https://www.elec-mate.com/.well-known/ai-plugin.json` |
| **Facts JSON**     | `https://www.elec-mate.com/.well-known/llm-facts.json` |
| **llms.txt**       | `https://www.elec-mate.com/llms.txt`                   |

### 4. Capabilities to declare

- ✅ Tool calling (20 read-only tools)
- ❌ No file uploads
- ❌ No write actions
- ❌ No user data access
- ❌ No personal identifiable information (PII) handling
- ✅ Citation provided on every response
- ✅ Stateless (each request independent)
- ✅ Cached at edge (Vercel CDN)

### 5. Policies

| Field                | URL                                                              |
| -------------------- | ---------------------------------------------------------------- |
| **Privacy policy**   | https://www.elec-mate.com/privacy                                |
| **Terms of service** | https://www.elec-mate.com/terms                                  |
| **API terms**        | https://www.elec-mate.com/api-terms _(stub — may need creating)_ |
| **Contact email**    | info@elec-mate.com                                               |
| **Support email**    | info@elec-mate.com                                               |

### 6. Brand assets

| Asset                              | Spec                                             | URL / Status                       |
| ---------------------------------- | ------------------------------------------------ | ---------------------------------- |
| **Square logo (1024×1024)**        | PNG, transparent or branded background           | NEEDS CREATING from /logo.jpg      |
| **Square logo (512×512)**          | PNG                                              | NEEDS CREATING                     |
| **Square logo (192×192)**          | PNG                                              | NEEDS CREATING                     |
| **Hero / banner image (1500×500)** | PNG                                              | NEEDS CREATING                     |
| **Screenshot 1** (1280×800)        | PNG showing ChatGPT chat using an Elec-Mate tool | NEEDS RECORDING                    |
| **Screenshot 2**                   | PNG showing tool list in ChatGPT                 | NEEDS RECORDING                    |
| **Screenshot 3**                   | PNG showing tool response with citation          | NEEDS RECORDING                    |
| **Demo video (60-90s)**            | MP4 < 50MB                                       | NEEDS RECORDING — see script below |

### 7. Sample queries & expected responses

OpenAI will want to see how the connector behaves. Provide these as the demonstration:

| User asks                                         | Tool called             | What ChatGPT responds with                                                         |
| ------------------------------------------------- | ----------------------- | ---------------------------------------------------------------------------------- |
| "Max Zs for a B32 MCB?"                           | `calculate_zs_max`      | "1.366Ω per BS 7671 Reg 411.4.4 (Cmin=0.95). Source: Elec-Mate."                   |
| "EICR cost in London?"                            | `pricing_job`           | "Avg £344 (£188-£500). Sample 21 records. Source: Elec-Mate Regional Job Pricing." |
| "RCBO keeps tripping — diagnose"                  | `pwi_troubleshooting`   | Top 15 fault-diagnosis steps from 199k UK records.                                 |
| "What is Section 722?"                            | `bs7671_lookup_section` | All Section 722 regulations (EV charging) with snippets.                           |
| "Is consumer unit replacement Part P notifiable?" | `notifiable_work_check` | "YES — Part P 1.27(b) — replacement of a consumer unit is always notifiable."      |

### 8. Why approve us — the pitch

```
Elec-Mate is the only UK platform combining electrical certification, apprentice training, on-site calculators, AI specialist agents, and business management in one mobile-first app — launched 2025 by an electrician-turned-founder.

Our public MCP server is the first verified BS 7671 connector for any AI assistant. It exposes 20 read-only tools backed by:
- 1,770 BS 7671:2018+A4:2026 regulations
- 46,745 facets across BS 7671 + IET Guidance Note 3 + IET On-Site Guide
- 410 BS 7671 tables
- 199,726-row Practical Work Intelligence dataset (real UK labour times, defects, materials)
- 7,474-row Regional Job Pricing dataset

UK has ~250,000 working electricians + ~30,000 apprentices. Most of them use ChatGPT for quick questions but get unverified answers. Elec-Mate fixes that — every reply cites BS 7671:2018+A4:2026.

The connector is read-only, no auth, no user data accessed, fully GDPR-safe.
```

---

## Demo video script (60-90 seconds)

**0:00-0:08** — Screen: open ChatGPT, type "max Zs for a B32 MCB"
**0:08-0:20** — Show ChatGPT calling `calculate_zs_max` → response with "1.366Ω, BS 7671 Reg 411.4.4, source: Elec-Mate"
**0:20-0:30** — Type "How much for an EICR in London?" → show `pricing_job` tool call → response with avg/min/max £
**0:30-0:45** — Type "RCBO trips on kitchen — walk me through diagnosis" → show `pwi_troubleshooting` → step-by-step fault diagnosis
**0:45-0:60** — Title card: "Elec-Mate — verified UK electrical answers in ChatGPT. https://www.elec-mate.com/connect-ai"

Record in OBS Studio or Loom, export 1080p MP4 < 50 MB.

---

## After OpenAI approval

- Listed in **Connectors picker** inside ChatGPT
- Searchable by name: users typing "elec-mate" in Connectors search will find us
- Auto-included in ChatGPT's "Recommended Connectors" for users in trades / construction categories
- Promoted in OpenAI's developer showcase (potentially)

---

## Backup paths if rejected

1. **Custom GPT in GPT Store** (already submitted — see `custom-gpt-config.md`)
2. **Direct-install URL** at `https://www.elec-mate.com/connect-ai`
3. **Anthropic Claude Connector Directory** (see `anthropic-connector-application.md` — coming next session)
