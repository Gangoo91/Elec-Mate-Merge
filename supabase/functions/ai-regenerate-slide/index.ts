// F1.3 / ELE-942 — regenerate a SINGLE slide in an existing deck.
// Tutor types a tweak prompt ("more practical, less academic" / "swap the
// reg cite for 411.3.2.1" / "make this image close-up of the consumer
// unit") and the AI produces a replacement slide of the same kind, slotted
// in at the original index. Keeps the rest of the deck untouched.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';
import { captureException } from '../_shared/sentry.ts';
import {
  ACCURACY_RULES,
  BREVITY_RULES,
  SLIDE_ITEM_SCHEMA,
  finaliseSlide,
  formatSources,
  loadSlideSources,
  topUpSlideSourcesFromRag,
} from '../_shared/slide-deck-rules.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, x-request-id, x-supabase-api-version, x-supabase-timeout, apikey, content-type',
};

const CHAT_MODEL = 'gpt-5.4-mini-2026-03-17';
const MAX_TOKENS = 8_000;

interface Body {
  lesson_plan_id: string;
  slide_index: number;
  tweak_prompt: string;
}

interface DeckJson {
  generated_at: string;
  slides: Array<Record<string, unknown>>;
}

const SYSTEM_PROMPT = `You are an experienced UK further-education electrical lecturer. British English only.

You are redoing ONE slide in an existing deck at the tutor's request. Keep the slide's kind unless the tutor asks for a different layout. Apply the request with judgement: a small request means a small change.

${BREVITY_RULES}

${ACCURACY_RULES}

If the tutor names a regulation that is not in SOURCES, do not cite it. Keep the slide's existing citation if it is in SOURCES, and say in speaker_notes that the named regulation is not linked to this lesson.

If the request needs a new photo, write a new image_prompt (60 to 100 words): a real UK installation scene, the specific kit, lighting, composition, hands only, no faces, and no text of any kind in the image.

Call submit_slide once with the FULL replacement slide (every field it needs, not just the changes).`;

const SLIDE_SCHEMA = SLIDE_ITEM_SCHEMA;

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'method_not_allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  try {
    const apiKey = Deno.env.get('OPENAI_API_KEY');
    if (!apiKey) throw new Error('OPENAI_API_KEY missing');

    const body = (await req.json()) as Body;
    if (!body.lesson_plan_id || typeof body.slide_index !== 'number' || !body.tweak_prompt) {
      return new Response(JSON.stringify({ error: 'invalid_body' }), {
        status: 400,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }
    const userClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } }, auth: { persistSession: false } }
    );
    const { data: userRes } = await userClient.auth.getUser();
    if (!userRes?.user) {
      return new Response(JSON.stringify({ error: 'unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }
    const { data: profile } = await supabase
      .from('profiles')
      .select('id, college_id')
      .eq('id', userRes.user.id)
      .maybeSingle();
    if (!profile?.college_id) {
      return new Response(JSON.stringify({ error: 'no_college' }), {
        status: 403,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }

    const { data: plan } = await supabase
      .from('college_lesson_plans')
      .select('id, college_id, title, duration_minutes, slide_deck_json')
      .eq('id', body.lesson_plan_id)
      .maybeSingle();
    if (!plan) {
      return new Response(JSON.stringify({ error: 'plan_not_found' }), {
        status: 404,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }
    const planRow = plan as {
      id: string;
      college_id: string;
      title: string;
      duration_minutes: number | null;
      slide_deck_json: DeckJson | null;
    };
    if (planRow.college_id !== profile.college_id) {
      return new Response(JSON.stringify({ error: 'forbidden' }), {
        status: 403,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }
    const deck = planRow.slide_deck_json;
    if (!deck?.slides?.[body.slide_index]) {
      return new Response(JSON.stringify({ error: 'slide_not_found' }), {
        status: 404,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }
    const original = deck.slides[body.slide_index];
    const sources = await topUpSlideSourcesFromRag(
      supabase,
      await loadSlideSources(supabase, planRow.id),
      `${planRow.title}. ${String(original?.heading ?? '')}. ${String(body.tweak_prompt ?? '')}`,
      apiKey
    );
    const neighbours = [deck.slides[body.slide_index - 1], deck.slides[body.slide_index + 1]]
      .filter(Boolean)
      .map((n) => `- ${String(n.kind)}: ${String(n.heading ?? '')}`)
      .join('\n');

    const userPrompt = `LESSON: "${planRow.title}" (${planRow.duration_minutes ?? 90} min)

ORIGINAL SLIDE (slide ${body.slide_index + 1} of ${deck.slides.length}):
${JSON.stringify(original, null, 2)}

SLIDES EITHER SIDE (for flow; do not repeat them):
${neighbours || '(none)'}

SOURCES (the only regulation material you may cite; never mention these labels on a slide):
${formatSources(sources)}

TUTOR'S REQUEST:
${body.tweak_prompt.slice(0, 1200)}

Return the FULL replacement slide via submit_slide.`;

    const oaResp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        model: CHAT_MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userPrompt },
        ],
        max_completion_tokens: MAX_TOKENS,
        tools: [
          {
            type: 'function',
            function: {
              name: 'submit_slide',
              description: 'Persist the regenerated slide.',
              parameters: SLIDE_SCHEMA,
              strict: false,
            },
          },
        ],
        tool_choice: { type: 'function', function: { name: 'submit_slide' } },
      }),
    });

    if (!oaResp.ok) {
      const t = await oaResp.text();
      return new Response(JSON.stringify({ error: 'openai_error', detail: t.slice(0, 600) }), {
        status: 502,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }

    const oaJson = await oaResp.json();
    const toolCall = oaJson.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall?.function?.arguments) {
      return new Response(JSON.stringify({ error: 'no_tool_call' }), {
        status: 502,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }

    let regenerated: Record<string, unknown>;
    try {
      regenerated = finaliseSlide(JSON.parse(toolCall.function.arguments), sources);
    } catch {
      return new Response(JSON.stringify({ error: 'invalid_json' }), {
        status: 502,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }

    // If the AI changed the image_prompt, drop the old image_url so the
    // front-end re-generates the photo. If it kept the same prompt and
    // already had an image, preserve the existing URL.
    const oldPrompt = (original.image_prompt as string | undefined) ?? null;
    const newPrompt = (regenerated.image_prompt as string | undefined) ?? null;
    if (newPrompt && newPrompt !== oldPrompt) {
      delete regenerated.image_url;
    } else if (oldPrompt && newPrompt === oldPrompt && original.image_url) {
      regenerated.image_url = original.image_url;
    }

    // Re-read the deck now, after the model call, and replace ONLY this slide:
    // edits, other regenerations or photos saved in the meantime are kept.
    // If the slide moved (reordered or deleted) while we were writing, refuse
    // rather than overwrite a different slide.
    const { data: fresh } = await supabase
      .from('college_lesson_plans')
      .select('slide_deck_json')
      .eq('id', planRow.id)
      .maybeSingle();
    const current = ((fresh as { slide_deck_json: DeckJson | null } | null)?.slide_deck_json ?? deck) as DeckJson;
    const here = current.slides?.[body.slide_index] as Record<string, unknown> | undefined;
    if (!here || String(here.kind ?? '') !== String(original.kind ?? '')) {
      return new Response(JSON.stringify({ error: 'slide_moved' }), {
        status: 409,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }
    const slidesNext = current.slides.map((s, i) => (i === body.slide_index ? regenerated : s));
    const nextDeck: DeckJson = { ...current, slides: slidesNext };

    const { error: saveErr } = await supabase
      .from('college_lesson_plans')
      .update({ slide_deck_json: nextDeck })
      .eq('id', planRow.id);
    if (saveErr) {
      return new Response(JSON.stringify({ error: 'save_failed', detail: saveErr.message }), {
        status: 500,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ slide: regenerated, slide_index: body.slide_index }), {
      status: 200,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  } catch (e) {
    await captureException(e, {
      functionName: 'ai-regenerate-slide',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return new Response(JSON.stringify({ error: 'unhandled', detail: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
});
