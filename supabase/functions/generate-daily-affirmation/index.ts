/**
 * Daily personalised affirmation for the mental health hub.
 *
 * Replaces the hardcoded array of generic quotes. The affirmation is grounded
 * in the user's recent mood + journal tone so it lands as something believable
 * — never generic-Instagram, always trade-realistic.
 *
 * Output cached server-side per user per day so repeated calls return the same
 * line until tomorrow.
 */

import { serve, corsHeaders, createClient } from '../_shared/deps.ts';
import { handleError, ValidationError } from '../_shared/errors.ts';
import { callOpenAI } from '../_shared/ai-providers.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

const FALLBACK = [
  'Every job you sign off safely is a small act of care for someone you may never meet.',
  "Long days end. Bills get paid. The work is real, even on the days it doesn't feel like it.",
  'Asking for a hand is a skill, not a weakness. The good ones do it more, not less.',
  'You can rest tonight. The board will still be there in the morning, and you will be sharper.',
  "You've solved harder things than what's in front of you today. Keep going.",
];

function pickFallback(seed: string) {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) | 0;
  return FALLBACK[Math.abs(h) % FALLBACK.length];
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) throw new ValidationError('Authentication required');

    const userClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      global: { headers: { Authorization: authHeader } },
    });
    const {
      data: { user },
      error: userErr,
    } = await userClient.auth.getUser();
    if (userErr || !user) throw new ValidationError('Authentication required');

    const today = new Date().toISOString().split('T')[0];
    const cacheKey = `${user.id}:${today}`;

    // Service-role client to read mood/journal + write cache (bypasses RLS)
    const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // ── Cache hit ────────────────────────────────────────────────
    const { data: cached } = await sb
      .from('mental_health_journal_entries')
      .select('content')
      .eq('user_id', user.id)
      .eq('date', today)
      .contains('tags', ['affirmation'])
      .limit(1)
      .maybeSingle();

    if (cached?.content) {
      return new Response(JSON.stringify({ affirmation: cached.content, cached: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // ── Pull recent mood + journal tone ──────────────────────────
    const sinceIso = new Date(Date.now() - 7 * 86_400_000).toISOString().split('T')[0];

    const [moodsRes, journalsRes] = await Promise.all([
      sb
        .from('mental_health_mood_entries')
        .select('mood, date, notes')
        .eq('user_id', user.id)
        .gte('date', sinceIso)
        .order('date', { ascending: false })
        .limit(7),
      sb
        .from('mental_health_journal_entries')
        .select('content, mood_label, date')
        .eq('user_id', user.id)
        .gte('date', sinceIso)
        .order('date', { ascending: false })
        .limit(5),
    ]);

    const moods = moodsRes.data ?? [];
    const journals = journalsRes.data ?? [];
    const moodAvg =
      moods.length > 0 ? moods.reduce((s, m) => s + (m.mood ?? 0), 0) / moods.length : 0;

    // ── Generate via OpenAI; fall back if no key or API fails ────
    let affirmation = pickFallback(cacheKey);

    if (OPENAI_API_KEY) {
      try {
        const moodSummary =
          moods.length > 0
            ? `Mood last 7 days: ${moodAvg.toFixed(1)}/5 (${moods.length} check-ins).`
            : 'No mood logs in the last 7 days.';
        const journalSummary =
          journals.length > 0
            ? journals
                .slice(0, 3)
                .map((j) => `- ${j.date}: "${(j.content ?? '').slice(0, 200)}"`)
                .join('\n')
            : '(no journal entries)';

        const messages = [
          {
            role: 'system' as const,
            content:
              'You write one daily affirmation for a UK electrician. RULES: ' +
              '(1) One sentence, max 22 words. ' +
              '(2) Trade-realistic — reference specific aspects of electrical work, long days, ' +
              'callouts, paperwork, customers, the weather, the van, the apprentice. ' +
              "(3) Never generic Instagram-style — no 'shine bright', 'you got this', 'queen', etc. " +
              "(4) Tone-adapt: if the user has had a low week, lean validating ('you got through it'). " +
              "If neutral, lean grounding. If high, lean acknowledging the win without being saccharine. " +
              '(5) UK English. ' +
              '(6) Output ONLY the sentence, no quotes, no preamble.',
          },
          {
            role: 'user' as const,
            content: `Today is ${today}. ${moodSummary}\n\nRecent journal entries:\n${journalSummary}`,
          },
        ];

        const result = await callOpenAI(
          { messages, model: 'gpt-5-mini-2025-08-07', max_tokens: 120 },
          OPENAI_API_KEY,
          15_000
        );
        const text = (result?.content ?? '').trim().replace(/^["']|["']$/g, '');
        if (text.length > 0 && text.length <= 240) affirmation = text;
      } catch (err) {
        console.warn('OpenAI generation failed, using fallback:', err);
      }
    }

    // ── Cache for the rest of today ──────────────────────────────
    await sb.from('mental_health_journal_entries').insert({
      user_id: user.id,
      date: today,
      time: new Date().toTimeString().slice(0, 5),
      mood: 0,
      mood_label: 'affirmation',
      content: affirmation,
      tags: ['affirmation'],
    });

    return new Response(JSON.stringify({ affirmation, cached: false }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return handleError(err);
  }
});
