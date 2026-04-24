// Suggest AC links for a college resource using AI.
//
// Input: { resource_id: string }
// Output:
//   {
//     suggestions: [
//       { qualification_code, unit_code, ac_code, ac_text, confidence, rationale }
//     ]
//   }
//
// Auth: caller must be staff at the resource's college.
// Strategy (pragmatic first slice):
//   - Gather context from the resource metadata (title, description, tags,
//     filename, mime, link URL).
//   - Find qualifications that the college actually teaches (via courses).
//   - Pull assessment criteria for those qualifications.
//   - Ask gpt-5-mini to pick 3-8 most relevant ACs with confidence + rationale.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, content-type, apikey',
};

const CHAT_MODEL = 'gpt-5-mini-2025-08-07';
const MAX_TOKENS = 4_000;
const MAX_ACS_PER_CONTEXT = 600;
const REQUEST_TIMEOUT_MS = 90_000;

interface ReqBody {
  resource_id: string;
}

interface AcRow {
  qualification_code: string;
  unit_code: string;
  unit_title: string | null;
  ac_code: string;
  ac_text: string;
  lo_text: string | null;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS')
    return new Response(null, { status: 204, headers: corsHeaders });
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'method_not_allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
  const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY');
  const OPENAI_KEY = Deno.env.get('OPENAI_API_KEY');
  if (!SUPABASE_URL || !SERVICE_KEY || !ANON_KEY || !OPENAI_KEY) {
    return new Response(JSON.stringify({ error: 'server_misconfigured' }), {
      status: 500,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const sb = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // Auth
  const authHeader = req.headers.get('authorization');
  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  const userClient = createClient(SUPABASE_URL, ANON_KEY, {
    global: { headers: { Authorization: authHeader } },
    auth: { persistSession: false },
  });
  const { data: userRes } = await userClient.auth.getUser();
  if (!userRes?.user) {
    return new Response(JSON.stringify({ error: 'unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  let body: ReqBody;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'invalid_json' }), {
      status: 400,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  if (!body.resource_id) {
    return new Response(JSON.stringify({ error: 'missing_resource_id' }), {
      status: 400,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  try {
    // Resource + ownership check
    const { data: resource } = await sb
      .from('college_resources')
      .select(
        'id, college_id, title, description, kind, file_path, external_url, mime_type, tags'
      )
      .eq('id', body.resource_id)
      .maybeSingle();
    if (!resource) {
      return new Response(JSON.stringify({ error: 'not_found' }), {
        status: 404,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }
    const { data: staff } = await sb
      .from('college_staff')
      .select('id')
      .eq('user_id', userRes.user.id)
      .eq('college_id', resource.college_id)
      .maybeSingle();
    if (!staff) {
      return new Response(JSON.stringify({ error: 'not_at_college' }), {
        status: 403,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }

    // Gather the college's qualifications via its courses
    const { data: courses } = await sb
      .from('college_courses')
      .select('code')
      .eq('college_id', resource.college_id);
    const qualCodes = Array.from(
      new Set(
        (courses ?? [])
          .map((c) => c.code as string | null)
          .filter((c): c is string => Boolean(c))
      )
    );

    if (qualCodes.length === 0) {
      return new Response(
        JSON.stringify({ suggestions: [], reason: 'no_college_qualifications' }),
        { headers: { ...corsHeaders, 'content-type': 'application/json' } }
      );
    }

    // Pull ACs
    const { data: acs } = await sb
      .from('qualification_requirements')
      .select('qualification_code, unit_code, unit_title, ac_code, ac_text, lo_text')
      .in('qualification_code', qualCodes)
      .limit(MAX_ACS_PER_CONTEXT);

    if (!acs || acs.length === 0) {
      return new Response(
        JSON.stringify({ suggestions: [], reason: 'no_acs_for_qualifications' }),
        { headers: { ...corsHeaders, 'content-type': 'application/json' } }
      );
    }

    // Build context: describe resource, list ACs compactly.
    const filename = resource.file_path
      ? (resource.file_path as string).split('/').pop() ?? ''
      : '';
    const resourceBlock = [
      `TITLE: ${resource.title}`,
      resource.description ? `DESCRIPTION: ${resource.description}` : null,
      resource.kind ? `KIND: ${resource.kind}` : null,
      resource.mime_type ? `MIME: ${resource.mime_type}` : null,
      filename ? `FILENAME: ${filename}` : null,
      resource.external_url ? `URL: ${resource.external_url}` : null,
      resource.tags && (resource.tags as string[]).length
        ? `TAGS: ${(resource.tags as string[]).join(', ')}`
        : null,
    ]
      .filter(Boolean)
      .join('\n');

    const acBlock = (acs as AcRow[])
      .map(
        (r, i) =>
          `[${i + 1}] ${r.qualification_code}|${r.unit_code}|${r.ac_code} — ${r.ac_text.slice(0, 220)}`
      )
      .join('\n');

    const SYSTEM = `You are a UK Further Education electrical curriculum expert. Given a teaching resource, identify which of the provided assessment criteria (ACs) this resource best supports.

Rules:
- Only choose ACs from the provided list — never invent codes.
- Return 3–8 of the strongest matches, ordered by confidence (most confident first).
- Confidence is 0.0–1.0: 0.9+ for clear direct coverage, 0.7–0.9 for strong support, 0.5–0.7 for partial / related, below 0.5 — skip.
- Rationale: one concise sentence on why this resource supports the AC.
- British English.`;

    const USER = `RESOURCE:
${resourceBlock}

CANDIDATE ACs (pick from this list only):
${acBlock}

Call submit_ac_suggestions with your picks.`;

    const tool = {
      type: 'function',
      function: {
        name: 'submit_ac_suggestions',
        description: 'Submit a ranked list of AC suggestions for this resource.',
        parameters: {
          type: 'object',
          additionalProperties: false,
          required: ['suggestions'],
          properties: {
            suggestions: {
              type: 'array',
              minItems: 0,
              maxItems: 8,
              items: {
                type: 'object',
                additionalProperties: false,
                required: [
                  'qualification_code',
                  'unit_code',
                  'ac_code',
                  'confidence',
                  'rationale',
                ],
                properties: {
                  qualification_code: { type: 'string' },
                  unit_code: { type: 'string' },
                  ac_code: { type: 'string' },
                  confidence: { type: 'number' },
                  rationale: { type: 'string' },
                },
              },
            },
          },
        },
      },
    };

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), REQUEST_TIMEOUT_MS);

    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENAI_KEY}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: CHAT_MODEL,
        messages: [
          { role: 'system', content: SYSTEM },
          { role: 'user', content: USER },
        ],
        tools: [tool],
        tool_choice: { type: 'function', function: { name: 'submit_ac_suggestions' } },
        max_completion_tokens: MAX_TOKENS,
      }),
      signal: ctrl.signal,
    });
    clearTimeout(timer);
    if (!resp.ok) {
      const t = await resp.text();
      throw new Error(`OpenAI ${resp.status}: ${t.slice(0, 400)}`);
    }
    const payload = await resp.json();
    const call = payload?.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
    if (!call) {
      return new Response(
        JSON.stringify({ suggestions: [], reason: 'no_tool_call' }),
        { headers: { ...corsHeaders, 'content-type': 'application/json' } }
      );
    }

    let parsed: {
      suggestions: {
        qualification_code: string;
        unit_code: string;
        ac_code: string;
        confidence: number;
        rationale: string;
      }[];
    };
    try {
      parsed = JSON.parse(call);
    } catch {
      return new Response(
        JSON.stringify({ suggestions: [], reason: 'invalid_tool_call' }),
        { headers: { ...corsHeaders, 'content-type': 'application/json' } }
      );
    }

    // Join back to AC text for the client and filter to valid rows only
    const byKey = new Map<string, AcRow>();
    for (const r of acs as AcRow[]) {
      byKey.set(
        `${r.qualification_code}|${r.unit_code}|${r.ac_code}`,
        r as AcRow
      );
    }

    const enriched = (parsed.suggestions ?? [])
      .map((s) => {
        const row = byKey.get(
          `${s.qualification_code}|${s.unit_code}|${s.ac_code}`
        );
        if (!row) return null;
        const conf = Math.max(0, Math.min(1, Number(s.confidence) || 0));
        return {
          qualification_code: row.qualification_code,
          unit_code: row.unit_code,
          unit_title: row.unit_title,
          ac_code: row.ac_code,
          ac_text: row.ac_text,
          confidence: conf,
          rationale: s.rationale,
        };
      })
      .filter(Boolean)
      .sort((a, b) => (b!.confidence - a!.confidence));

    return new Response(
      JSON.stringify({ suggestions: enriched, ac_count: acs.length }),
      { headers: { ...corsHeaders, 'content-type': 'application/json' } }
    );
  } catch (e) {
    console.error('[ai-tag-resource] error', e);
    return new Response(
      JSON.stringify({ error: (e as Error).message ?? 'unknown' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      }
    );
  }
});
