#!/usr/bin/env node
/**
 * check-ai-bot-sync — keeps middleware.ts's AI-bot counter list in step with
 * robots.txt's AI-crawler sections (ELE-1589 drift guard).
 *
 * Contract: every AI user agent named in robots.txt sections 3a/3b must be
 * either matched by a middleware BOTS pattern or explicitly listed in IGNORED
 * below (with a reason). A bot added to robots.txt without a decision here
 * fails the check — so the counter list can never silently rot.
 *
 * Run: node scripts/check-ai-bot-sync.mjs   (exit 1 on drift)
 */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

// Deliberately not counted, with reasons — additions to robots.txt must be
// classified here or added to middleware.ts.
const IGNORED = {
  'ia_archiver': 'Internet Archive — preservation, not AI answers',
  'CCBot': 'Common Crawl — feeds many models but no per-assistant signal',
  'Diffbot': 'commercial scraper, not an assistant',
  'Omgilibot': 'commercial scraper, not an assistant',
  'Timpibot': 'minor index, negligible volume',
  'AwarioBot': 'social listening, not an assistant',
  'Bravebot': 'Brave search — negligible UK volume',
  'Applebot-Extended': 'training-control token; crawling arrives as Applebot',
  'Applebot': 'classic search crawler — baseline covered by googlebot/bingbot',
  // (Googlebot-Image is COUNTED — the /Googlebot/i pattern matches it, and the
  // matcher already excludes image files, so page fetches are what register.)
  'YandexBot': 'classic search crawler',
  'SeznamBot': 'classic search crawler',
  'DuckDuckBot': 'classic search crawler',
  'Twitterbot': 'social link preview, not an assistant',
  'facebookexternalhit': 'social link preview, not an assistant',
  'LinkedInBot': 'social link preview, not an assistant',
  'TelegramBot': 'social link preview, not an assistant',
  'WhatsApp': 'social link preview, not an assistant',
  'Slackbot': 'social link preview, not an assistant',
  'Discordbot': 'social link preview, not an assistant',
  'Pinterestbot': 'social link preview, not an assistant',
};

const robots = readFileSync(join(ROOT, 'public/robots.txt'), 'utf8');
const middleware = readFileSync(join(ROOT, 'middleware.ts'), 'utf8');

// Every UA named in robots.txt (all groups) — the AI ones are what we audit,
// but pulling all and filtering via IGNORED keeps the logic dumb and total.
const robotAgents = [...robots.matchAll(/^User-agent:\s*(\S+)/gm)]
  .map((m) => m[1])
  .filter((a) => a !== '*');

const botPatterns = [...middleware.matchAll(/\[\/(.+?)\/i,\s*'([a-z0-9-]+)'\]/g)].map((m) => ({
  re: new RegExp(m[1], 'i'),
  name: m[2],
}));

const drift = [];
for (const agent of new Set(robotAgents)) {
  const counted = botPatterns.some((b) => b.re.test(agent));
  const ignored = agent in IGNORED;
  if (!counted && !ignored) drift.push(agent);
  if (counted && ignored) drift.push(`${agent} (both counted AND ignored — remove one)`);
}

if (drift.length) {
  console.error('❌ AI-bot list drift — classify these in middleware.ts BOTS or IGNORED here:');
  for (const d of drift) console.error('   ', d);
  process.exit(1);
}
console.log(
  `✅ ai-bot lists in sync — ${botPatterns.length} counted, ${Object.keys(IGNORED).length} explicitly ignored, ${new Set(robotAgents).size} robots.txt agents classified`
);
