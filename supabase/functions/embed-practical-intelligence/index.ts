// Resumable bulk-embed driver for practical_work_intelligence.
//
// POST { batch_size?: number, max_batches?: number } — defaults 200 / 5
// Returns: { processed, failed, batches, last_remaining_estimate, elapsed_ms }
//
// Each invocation:
//   1. Pulls up to batch_size rows where embedding IS NULL
//   2. Builds embedding-ready text per row
//   3. Calls OpenAI text-embedding-3-large (3072 dim) in a single batched request
//   4. Calls pwi_apply_embedding_batch(ids[], embeddings_as_text[]) — ONE SQL
//      statement that writes both embedding + tsv per row, atomically
//   5. Loop until max_batches or no more pending rows

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const EMBED_MODEL = 'text-embedding-3-large';
const EMBED_DIM = 3072;
const DEFAULT_BATCH_SIZE = 200;
const DEFAULT_MAX_BATCHES = 5;
const MAX_INPUT_CHARS = 6000;

interface PwiRow {
  id: string;
  primary_topic: string | null;
  equipment_category: string | null;
  equipment_subcategory: string | null;
  facet_type: string | null;
  installation_method: string | null;
  keywords: string[] | null;
  bs7671_zones: string[] | null;
  common_defects: string[] | null;
  activity_types: string[] | null;
  test_procedures: any[] | null;
  inspection_checklist: string[] | null;
}

function buildEmbeddingText(row: PwiRow): string {
  const parts: string[] = [];
  if (row.primary_topic) parts.push(row.primary_topic);

  if (row.equipment_category || row.equipment_subcategory) {
    const eq = [row.equipment_category, row.equipment_subcategory].filter(Boolean).join(' / ');
    parts.push(`Equipment: ${eq}`);
  }
  if (row.facet_type) parts.push(`Type: ${row.facet_type}`);
  if (row.installation_method) parts.push(`Method: ${row.installation_method}`);
  if (row.keywords && row.keywords.length) {
    parts.push(`Keywords: ${row.keywords.slice(0, 12).join(', ')}`);
  }
  if (row.bs7671_zones && row.bs7671_zones.length) {
    parts.push(`Zones: ${row.bs7671_zones.join(', ')}`);
  }
  if (row.activity_types && row.activity_types.length) {
    parts.push(`Activities: ${row.activity_types.slice(0, 8).join(', ')}`);
  }
  if (row.test_procedures && Array.isArray(row.test_procedures) && row.test_procedures.length) {
    const tasks = row.test_procedures
      .slice(0, 5)
      .map((p: any) => (typeof p === 'string' ? p : p?.task || ''))
      .filter(Boolean)
      .join(' | ');
    if (tasks) parts.push(`Tests: ${tasks}`);
  }
  if (row.inspection_checklist && row.inspection_checklist.length) {
    parts.push(`Inspection: ${row.inspection_checklist.slice(0, 6).join(', ')}`);
  }
  if (row.common_defects && row.common_defects.length) {
    parts.push(`Defects: ${row.common_defects.slice(0, 8).join(', ')}`);
  }

  let text = parts.join('\n').replace(/\s+/g, ' ').trim();
  if (text.length > MAX_INPUT_CHARS) text = text.slice(0, MAX_INPUT_CHARS);
  return text || 'practical_work_intelligence row';
}

async function embedBatch(apiKey: string, inputs: string[]): Promise<number[][]> {
  const res = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: EMBED_MODEL,
      input: inputs,
      dimensions: EMBED_DIM,
    }),
  });
  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`OpenAI embeddings failed ${res.status}: ${errText.slice(0, 400)}`);
  }
  const json = (await res.json()) as { data: Array<{ embedding: number[] }> };
  return json.data.map((d) => d.embedding);
}

function vectorToText(v: number[]): string {
  // Postgres vector/halfvec text format: [0.123,0.456,...]
  return '[' + v.join(',') + ']';
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: CORS });
  }

  const tStart = Date.now();
  let processed = 0;
  let failed = 0;
  let batchesRun = 0;
  let lastError: string | null = null;

  try {
    const apiKey = Deno.env.get('OPENAI_API_KEY');
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'OPENAI_API_KEY not configured' }), {
        status: 503,
        headers: { ...CORS, 'content-type': 'application/json' },
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const body = (await req.json().catch(() => ({}))) as {
      batch_size?: number;
      max_batches?: number;
    };
    const batchSize = Math.min(Math.max(Number(body?.batch_size) || DEFAULT_BATCH_SIZE, 10), 500);
    const maxBatches = Math.min(Math.max(Number(body?.max_batches) || DEFAULT_MAX_BATCHES, 1), 50);

    for (let b = 0; b < maxBatches; b++) {
      // 1. Pull next pending batch
      const { data: rows, error: pullErr } = await supabase
        .from('practical_work_intelligence')
        .select(
          'id, primary_topic, equipment_category, equipment_subcategory, facet_type, installation_method, keywords, bs7671_zones, common_defects, activity_types, test_procedures, inspection_checklist'
        )
        .is('embedding', null)
        .order('id', { ascending: true })
        .limit(batchSize);

      if (pullErr) {
        lastError = `pull: ${pullErr.message}`;
        break;
      }
      if (!rows || rows.length === 0) break;

      const inputs = (rows as PwiRow[]).map(buildEmbeddingText);

      // 2. Embed
      let embeddings: number[][];
      try {
        embeddings = await embedBatch(apiKey, inputs);
      } catch (err) {
        const ids = (rows as PwiRow[]).map((r) => r.id);
        await supabase
          .from('practical_work_intelligence')
          .update({
            embedding_status: 'failed',
            embedding_attempted_at: new Date().toISOString(),
            embedding_error: err instanceof Error ? err.message.slice(0, 400) : String(err).slice(0, 400),
          })
          .in('id', ids);
        failed += rows.length;
        batchesRun++;
        lastError = `embed: ${err instanceof Error ? err.message : String(err)}`;
        continue;
      }

      // 3. Single bulk UPDATE — embedding + tsv together via the PL/pgSQL helper.
      const ids = (rows as PwiRow[]).map((r) => r.id);
      const vecTexts = embeddings.map(vectorToText);
      const { data: updated, error: applyErr } = await supabase.rpc(
        'pwi_apply_embedding_batch',
        { p_ids: ids, p_embeddings: vecTexts }
      );

      if (applyErr) {
        lastError = `apply: ${applyErr.message}`;
        failed += rows.length;
        batchesRun++;
        continue;
      }

      processed += typeof updated === 'number' ? updated : rows.length;
      batchesRun++;
    }

    return new Response(
      JSON.stringify({
        processed,
        failed,
        batches: batchesRun,
        elapsed_ms: Date.now() - tStart,
        rate_rows_per_sec:
          Date.now() - tStart > 0
            ? Math.round((processed / (Date.now() - tStart)) * 1000)
            : 0,
        last_error: lastError,
      }),
      { status: 200, headers: { ...CORS, 'content-type': 'application/json' } }
    );
  } catch (err) {
    console.error('[embed-practical-intelligence] handler error', err);
    return new Response(
      JSON.stringify({
        error: 'embed failed',
        detail: err instanceof Error ? err.message.slice(0, 400) : String(err).slice(0, 400),
        processed,
        failed,
        batches: batchesRun,
        elapsed_ms: Date.now() - tStart,
        last_error: lastError,
      }),
      { status: 500, headers: { ...CORS, 'content-type': 'application/json' } }
    );
  }
});
