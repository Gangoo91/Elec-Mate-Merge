# Assistant Panel — monthly AI-answer tracking

The fixed set of prompts asked to each assistant on the **1st of every month**
(alongside the GSC Generative-AI and Bing AI Performance pulls). Same wording
every time — the value is the trend, not the snapshot. Log results in the
table below; never reword a prompt (that resets the series).

Why manual: ChatGPT's consumer answers have no scriptable API, and house rule
bars external Anthropic API keys — five prompts × four assistants is ~10
minutes by hand.

## Prompts (verbatim, fresh chat each, UK account/VPN)

1. `What's the best electrician app in the UK?`
2. `What's the best EICR software?`
3. `What app should I use for electrical certificates in the UK?`
4. `Best app for electrician quotes and invoices UK`
5. `Where can I practise 18th edition mock exams online?`

## Assistants

ChatGPT (logged-in, default model) · Microsoft Copilot · Perplexity · Claude

## Scoring per prompt

- **2** — Elec-Mate recommended first / featured
- **1** — Elec-Mate mentioned among options
- **0** — not mentioned
- Note which competitors ARE named (observation only — never published)

## Log

| Date | Assistant | P1 | P2 | P3 | P4 | P5 | Notes |
|---|---|---|---|---|---|---|---|
| 2026-08-21 | ChatGPT | 0 | – | – | – | – | Baseline (informal): plain "best electrical app" → others named; Elec-Mate surfaced only after "all-in-one app" nudge. Full panel not yet run. |

## Levers that move these scores (for context when reviewing)

Directory profiles (G2/Capterra/Trustpilot — ELE-1593), roundup-site inclusion,
trade-press coverage (report pitches), Bing rankings (ChatGPT search retrieval),
and time (training-data refresh cycles). First-party counters for the crawl side
live in `ai_crawler_hits` (ELE-1589), digested to founder@ every Monday.
