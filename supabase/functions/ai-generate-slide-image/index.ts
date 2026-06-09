// F1.2 / ELE-942 — per-slide image generator using gpt-image-1.
//
// Takes a lesson plan id + slide index + a prompt, generates an image
// styled as UK trade-publication editorial photography, stores it in the
// slide-deck-images bucket, and writes the resulting public URL onto the
// matching slide in slide_deck_json.
//
// Called once per slide that has an image_prompt but no image_url yet —
// the front-end fans out per-slide so the deck shows up first and photos
// stream in over the next minute or two.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, x-request-id, x-supabase-api-version, apikey, content-type',
};

const IMAGE_MODEL = 'gpt-image-1';
const DEFAULT_QUALITY: 'low' | 'medium' | 'high' = 'medium';
const SIZE = '1536x1024'; // 3:2 — slightly cinematic, good for slides

const STYLE_PREAMBLE = `Editorial photojournalism for a UK electrical-trade publication (IET Wiring Matters, Electrical Times, Professional Electrician). Shot on a full-frame 35mm camera at f/4–5.6, natural daylight (window light or overcast), ISO 200–800. CANDID, NOT STAGED — caught mid-action, a working professional doing real work. Tight close-up framing. Subject occupies one third of the frame; generous, deliberate negative space. Real-world authenticity above all: real tools (Megger MFT, Fluke 1664, Knipex pliers, Wago lever connectors), real UK consumer-unit brands (Hager, BG, MK, Schneider, Crabtree), real modern UK installations (white-painted DB enclosures, T+E flat twin-and-earth cable, single-phase domestic standard).

NEGATIVE PROMPTS — the image MUST NOT contain: faces or facial features, posed lineups, symmetrical compositions, glossy stock-photo HDR, AI sheen, oversaturated colours, lens flare, fake bokeh, glowing edges, extra fingers, warped tools, plastic-looking skin, orange hard hats, hi-vis abuse, neon-bright backgrounds, brand logos legible, signage with readable text, watermarks, CGI rendering tells.

POSITIVE PROMPTS — the image SHOULD contain: hands and detail-only when humans are present, matte realistic textures, tactile material rendering (worn copper, scuffed plastic, dusty PVC), neutral colour grading, authentic worksite or workshop background slightly out of focus, magazine-quality composition, depth and layering, a moment that feels stolen rather than staged.

Reference: high-end editorial print journalism circa 2024 — IET Wiring Matters cover photography, RIBA Journal technical features, the editorial spreads in WIRED Magazine's hardware coverage.`;

interface Body {
  lesson_plan_id: string;
  slide_index: number;
  prompt: string;
  quality?: 'low' | 'medium' | 'high';
}

interface SlideJson {
  kind: string;
  image_url?: string;
  image_prompt?: string;
  [k: string]: unknown;
}

interface DeckJson {
  generated_at: string;
  slides: SlideJson[];
}

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
    if (!body.lesson_plan_id || typeof body.slide_index !== 'number' || !body.prompt) {
      return new Response(JSON.stringify({ error: 'invalid_body' }), {
        status: 400,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Auth + ownership check
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
      .select('id, college_id, slide_deck_json')
      .eq('id', body.lesson_plan_id)
      .maybeSingle();
    if (!plan) {
      return new Response(JSON.stringify({ error: 'plan_not_found' }), {
        status: 404,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }
    const planRow = plan as { id: string; college_id: string; slide_deck_json: DeckJson | null };
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

    // Compose final prompt — model sees both the style preamble and the
    // tutor-side prompt the deck author put together.
    const fullPrompt = `${STYLE_PREAMBLE}\n\nSubject: ${body.prompt}`;

    const oaResp = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: IMAGE_MODEL,
        prompt: fullPrompt,
        size: SIZE,
        quality: body.quality ?? DEFAULT_QUALITY,
        n: 1,
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
    const b64 = oaJson?.data?.[0]?.b64_json as string | undefined;
    if (!b64) {
      return new Response(JSON.stringify({ error: 'no_image_returned' }), {
        status: 502,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }

    // Decode base64 → Uint8Array
    const bin = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));

    // Upload to storage. Path: <plan_id>/<slide_index>-<timestamp>.png
    const path = `${planRow.id}/${body.slide_index}-${Date.now()}.png`;
    const { error: upErr } = await supabase.storage.from('slide-deck-images').upload(path, bin, {
      contentType: 'image/png',
      upsert: true,
    });
    if (upErr) {
      return new Response(JSON.stringify({ error: 'upload_failed', detail: upErr.message }), {
        status: 500,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }

    const { data: pub } = supabase.storage.from('slide-deck-images').getPublicUrl(path);
    const publicUrl = pub.publicUrl;

    // Patch the deck row — re-read in case other slides have updated since
    // we loaded so we don't clobber concurrent writes.
    const { data: fresh } = await supabase
      .from('college_lesson_plans')
      .select('slide_deck_json')
      .eq('id', planRow.id)
      .maybeSingle();
    const freshDeck = ((fresh as { slide_deck_json: DeckJson | null } | null)?.slide_deck_json ??
      deck) as DeckJson;
    const slidesNext = freshDeck.slides.map((s, i) =>
      i === body.slide_index ? { ...s, image_url: publicUrl } : s
    );
    const nextDeck: DeckJson = { ...freshDeck, slides: slidesNext };

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

    return new Response(JSON.stringify({ image_url: publicUrl, slide_index: body.slide_index }), {
      status: 200,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  } catch (e) {
    await captureException(e, { functionName: 'ai-generate-slide-image', requestUrl: req.url, requestMethod: req.method });
    return new Response(JSON.stringify({ error: 'unhandled', detail: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
});
