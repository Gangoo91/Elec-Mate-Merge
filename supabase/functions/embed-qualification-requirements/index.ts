// Embeds every qualification_requirements row with text-embedding-3-small so
// loadQualificationKit + lookupQualificationAcs can do semantic search instead
// of inlining the entire 2000-row catalogue into prompts.
//
// Idempotent — only embeds rows where embedding IS NULL. Run once to backfill,
// then on demand whenever ACs are added/edited (the trigger clears `embedding`).
//
// POST {} — embeds in batches of 100, returns { embedded, skipped, errors }.
//
// Auth: requires X-Admin-Key header matching ADMIN_BACKFILL_KEY OR a service-role
// JWT. Not called from the app — invoked manually by us / a scheduled cron.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-admin-key, content-type',
};

const EMBED_MODEL = 'text-embedding-3-small'; // 1536 dims, matches the column
const BATCH_SIZE = 100; // OpenAI accepts up to 2048 inputs per request, but we
                       // keep batches small to avoid 60s edge-fn limits.
const MAX_BATCHES_PER_INVOCATION = 5; // 500 rows per call; for 2000-row backfill
                                      // that's 4 invocations.

interface RawRow {
  id: string;
  unit_code: string;
  unit_title: string | null;
  lo_text: string | null;
  ac_code: string;
  ac_text: string | null;
}

function buildEmbedText(r: RawRow): string {
  // Compact, semantically dense input. We include the structural codes so an
  // LO/AC search like "411.3.2.1" hits the right row even without semantic
  // similarity, and we include the full prose so semantic queries like
  // "earthing for TT systems" hit too.
  const parts: string[] = [];
  parts.push(`${r.unit_code}`);
  if (r.unit_title) parts.push(`(${r.unit_title})`);
  parts.push(`AC ${r.ac_code}`);
  if (r.lo_text) parts.push(`LO: ${r.lo_text}`);
  if (r.ac_text) parts.push(r.ac_text);
  return parts.join(' — ').slice(0, 4000);
}

async function embedBatch(
  inputs: string[],
  apiKey: string
): Promise<number[][] | null> {
  const res = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: EMBED_MODEL,
      input: inputs,
    }),
  });
  if (!res.ok) {
    const detail = await res.text();
    console.error('embeddings_failed', res.status, detail.slice(0, 240));
    return null;
  }
  const json = (await res.json()) as { data: Array<{ embedding: number[] }> };
  return json.data.map((d) => d.embedding);
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST')
    return new Response(JSON.stringify({ error: 'method_not_allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });

  const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
  const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const OPENAI_KEY = Deno.env.get('OPENAI_API_KEY');
  const ADMIN_KEY = Deno.env.get('ADMIN_BACKFILL_KEY');
  if (!SUPABASE_URL || !SERVICE_KEY || !OPENAI_KEY) {
    return new Response(JSON.stringify({ error: 'server_misconfigured' }), {
      status: 500,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  // Auth — admin key OR service-role JWT.
  const adminHeader = req.headers.get('x-admin-key');
  const authHeader = req.headers.get('authorization') ?? '';
  const isServiceRole = authHeader === `Bearer ${SERVICE_KEY}`;
  if ((!ADMIN_KEY || adminHeader !== ADMIN_KEY) && !isServiceRole) {
    return new Response(JSON.stringify({ error: 'unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const sb = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  let embedded = 0;
  let skipped = 0;
  let errors = 0;
  const startedAt = Date.now();

  for (let batchIdx = 0; batchIdx < MAX_BATCHES_PER_INVOCATION; batchIdx += 1) {
    const { data: rows, error: pickErr } = await sb
      .from('qualification_requirements')
      .select('id, unit_code, unit_title, lo_text, ac_code, ac_text')
      .is('embedding', null)
      .limit(BATCH_SIZE);
    if (pickErr) {
      console.error('pick_failed', pickErr.message);
      errors += 1;
      break;
    }
    const batch = (rows ?? []) as RawRow[];
    if (batch.length === 0) break;

    const inputs = batch.map(buildEmbedText);
    const embeddings = await embedBatch(inputs, OPENAI_KEY);
    if (!embeddings || embeddings.length !== batch.length) {
      errors += 1;
      // Skip this whole batch — don't mark anything as embedded.
      skipped += batch.length;
      break;
    }

    // Write back. Run updates in parallel — each row gets its own embedding.
    const writes = await Promise.all(
      batch.map((row, i) =>
        sb
          .from('qualification_requirements')
          .update({
            embedding: embeddings[i] as unknown as string,
            embedded_at: new Date().toISOString(),
          })
          .eq('id', row.id)
      )
    );
    for (const w of writes) {
      if (w.error) {
        console.error('update_failed', w.error.message);
        errors += 1;
      } else {
        embedded += 1;
      }
    }

    // Gentle rate-limiting — text-embedding-3-small is generous but no need
    // to hammer it.
    await new Promise((r) => setTimeout(r, 200));
  }

  const { count: remaining } = await sb
    .from('qualification_requirements')
    .select('id', { count: 'exact', head: true })
    .is('embedding', null);

  const ms = Date.now() - startedAt;
  return new Response(
    JSON.stringify({
      embedded,
      skipped,
      errors,
      remaining: remaining ?? 0,
      ms,
      done: (remaining ?? 0) === 0,
    }),
    { headers: { ...corsHeaders, 'content-type': 'application/json' } }
  );
});
