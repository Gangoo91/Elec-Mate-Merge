/**
 * Vercel Edge Middleware — AI-crawler hit counting (ELE-1589).
 *
 * AI crawlers (GPTBot, ClaudeBot, PerplexityBot…) fetch static HTML and never
 * execute JS, so client-side analytics is blind to them. This middleware runs
 * at the edge before the static file is served, matches the user agent against
 * a fixed bot list, and fire-and-forgets a counter increment to Supabase —
 * giving us a first-party, daily (bot × page) view of what AI assistants
 * actually ingest, instead of a monthly screenshot of two Beta dashboards.
 *
 * Design constraints:
 * - Human requests: one regex loop, no network call, fall through untouched.
 * - The matcher excludes assets/files so the bulk of requests never invoke it.
 * - `waitUntil` keeps the increment off the response path (zero added latency
 *   for the bot, response is never blocked on Supabase).
 * - URL + anon key are the same public values shipped in every client bundle
 *   (see src/integrations/supabase/client.ts) — hardcoded here to keep the
 *   edge bundle free of the app graph. The RPC is SECURITY DEFINER with hard
 *   input validation and the table is RLS-locked with no policies, so the
 *   anon key can increment counters and nothing else.
 * - Order matters in BOT list: specific agents (Claude-SearchBot) before
 *   generic ones (ClaudeBot); classic search crawlers (googlebot/bingbot)
 *   last, kept as the baseline to compare AI ingestion against.
 */

const SUPABASE_URL = 'https://jtwygbeceundfgnkirof.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3lnYmVjZXVuZGZnbmtpcm9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMTc2OTUsImV4cCI6MjA2MTc5MzY5NX0.NgMOzzNkreOiJ2_t_f90NJxIJTcpUninWPYnM7RkrY8';

const BOTS: Array<[RegExp, string]> = [
  [/OAI-SearchBot/i, 'oai-searchbot'],
  [/ChatGPT-User/i, 'chatgpt-user'],
  [/GPTBot/i, 'gptbot'],
  [/Claude-SearchBot/i, 'claude-searchbot'],
  [/Claude-User/i, 'claude-user'],
  [/ClaudeBot/i, 'claudebot'],
  [/anthropic-ai/i, 'anthropic-ai'],
  [/Perplexity-User/i, 'perplexity-user'],
  [/PerplexityBot/i, 'perplexitybot'],
  [/Google-Extended/i, 'google-extended'],
  [/DuckAssistBot/i, 'duckassistbot'],
  [/YouBot/i, 'youbot'],
  [/MistralAI-User/i, 'mistralai-user'],
  [/kagibot/i, 'kagibot'],
  [/Amazonbot/i, 'amazonbot'],
  [/Bytespider/i, 'bytespider'],
  [/meta-externalagent/i, 'meta-externalagent'],
  [/cohere-ai/i, 'cohere-ai'],
  [/bingbot/i, 'bingbot'],
  [/Googlebot/i, 'googlebot'],
];

export const config = {
  // Page routes only: skip anything with a file extension and the asset dirs —
  // EXCEPT the LLM-facing files, matched explicitly: an AI crawler fetching
  // llms.txt is the single most interesting signal this counter exists for.
  matcher: [
    '/((?!assets/|images/|symbols/|api/|.*\\..*).*)',
    '/llms.txt',
    '/llms-full.txt',
    '/.well-known/llm-facts.json',
  ],
};

export default function middleware(
  request: Request,
  context: { waitUntil: (promise: Promise<unknown>) => void }
) {
  // A throwing middleware makes Vercel serve a 500 for every matched route —
  // an analytics counter must never be able to take a page down, so the whole
  // body is guarded and every exit falls through to the origin untouched.
  try {
    const ua = request.headers.get('user-agent') || '';
    for (const [re, name] of BOTS) {
      if (re.test(ua)) {
        const path = new URL(request.url).pathname.slice(0, 200);
        context.waitUntil(
          fetch(`${SUPABASE_URL}/rest/v1/rpc/increment_ai_crawler_hit`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              apikey: SUPABASE_ANON_KEY,
              authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify({ p_agent: name, p_path: path }),
          }).catch(() => {
            // Counter loss is acceptable; never affect the response.
          })
        );
        break;
      }
    }
  } catch {
    // Fall through — the response must be served no matter what.
  }
  // Returning nothing lets the request continue to the origin untouched.
}
