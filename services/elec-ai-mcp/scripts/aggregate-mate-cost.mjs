#!/usr/bin/env node
/**
 * Mate cost aggregator — runs hourly on the VPS via cron.
 *
 * Walks /home/openclaw/.openclaw/agents/<user_id>/sessions/*.trajectory.jsonl,
 * parses model.completed events, sums tokens per (user_id, day, model),
 * applies Anthropic pricing, and upserts into public.mate_cost_daily.
 *
 * Idempotent — re-running on the same data produces the same totals because
 * we sum *all* model.completed events in a day's worth of files and overwrite
 * the (user_id, day, model) row each time. The trajectory files for older
 * days don't change, so the totals are stable.
 *
 * Env vars required:
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *
 * Optional:
 *   AGENTS_DIR   — defaults to /home/openclaw/.openclaw/agents
 *   LOOKBACK_DAYS — only aggregate days within the last N days (default 35)
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import readline from 'node:readline';
import { createReadStream } from 'node:fs';
import { createClient } from '@supabase/supabase-js';

const AGENTS_DIR = process.env.AGENTS_DIR || '/home/openclaw/.openclaw/agents';
const LOOKBACK_DAYS = parseInt(process.env.LOOKBACK_DAYS || '35', 10);

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Anthropic pricing in USD per 1M tokens (as of 2026-04).
// Add new models here as they roll out.
const PRICING = {
  'claude-sonnet-4-5': { input: 3.0, output: 15.0, cacheRead: 0.3, cacheWrite: 3.75 },
  'claude-haiku-4-5': { input: 1.0, output: 5.0, cacheRead: 0.1, cacheWrite: 1.25 },
  'claude-opus-4-7': { input: 15.0, output: 75.0, cacheRead: 1.5, cacheWrite: 18.75 },
};
const FALLBACK_PRICING = PRICING['claude-sonnet-4-5'];

function priceForModel(model) {
  if (!model) return FALLBACK_PRICING;
  // Strip provider prefix like "anthropic/" if present
  const m = model.includes('/') ? model.split('/').pop() : model;
  return PRICING[m] ?? FALLBACK_PRICING;
}

function computeCost(usage, pricing) {
  const input = (usage.input ?? 0) * pricing.input;
  const output = (usage.output ?? 0) * pricing.output;
  const cacheRead = (usage.cacheRead ?? 0) * pricing.cacheRead;
  const cacheWrite = (usage.cacheWrite ?? 0) * pricing.cacheWrite;
  return (input + output + cacheRead + cacheWrite) / 1_000_000;
}

async function main() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set');
    process.exit(1);
  }
  const supabase = createClient(url, key, { auth: { persistSession: false } });

  const cutoffMs = Date.now() - LOOKBACK_DAYS * 24 * 60 * 60 * 1000;
  const cutoffDay = new Date(cutoffMs).toISOString().slice(0, 10);

  // Aggregate: { user_id: { day: { model: { input, output, cacheRead, cacheWrite } } } }
  const agg = new Map();

  let agentDirs;
  try {
    agentDirs = await fs.readdir(AGENTS_DIR);
  } catch (e) {
    console.error(`Cannot read AGENTS_DIR ${AGENTS_DIR}:`, e.message);
    process.exit(1);
  }

  let filesProcessed = 0;
  let eventsFound = 0;

  for (const agentDir of agentDirs) {
    if (!UUID_RE.test(agentDir)) continue; // skip 'main', stale stuff
    const userId = agentDir;
    const sessionsDir = path.join(AGENTS_DIR, agentDir, 'sessions');
    let files;
    try {
      files = await fs.readdir(sessionsDir);
    } catch {
      continue;
    }

    for (const f of files) {
      if (!f.endsWith('.trajectory.jsonl')) continue;
      const fp = path.join(sessionsDir, f);
      let stat;
      try {
        stat = await fs.stat(fp);
      } catch {
        continue;
      }
      // Skip files older than the lookback window
      if (stat.mtimeMs < cutoffMs) continue;

      filesProcessed += 1;

      const rl = readline.createInterface({
        input: createReadStream(fp),
        crlfDelay: Infinity,
      });

      for await (const line of rl) {
        if (!line.includes('"model.completed"')) continue;
        let evt;
        try {
          evt = JSON.parse(line);
        } catch {
          continue;
        }
        if (evt.type !== 'model.completed') continue;
        const usage = evt?.data?.usage;
        if (!usage) continue;
        const ts = evt.ts;
        if (!ts) continue;
        const day = ts.slice(0, 10);
        if (day < cutoffDay) continue;
        const model = evt.modelId || 'unknown';

        eventsFound += 1;
        const userMap = agg.get(userId) ?? new Map();
        const dayMap = userMap.get(day) ?? new Map();
        const cur = dayMap.get(model) ?? {
          input: 0,
          output: 0,
          cacheRead: 0,
          cacheWrite: 0,
        };
        cur.input += usage.input ?? 0;
        cur.output += usage.output ?? 0;
        cur.cacheRead += usage.cacheRead ?? 0;
        cur.cacheWrite += usage.cacheWrite ?? 0;
        dayMap.set(model, cur);
        userMap.set(day, dayMap);
        agg.set(userId, userMap);
      }
    }
  }

  // Flatten + upsert
  const rows = [];
  for (const [userId, days] of agg) {
    for (const [day, models] of days) {
      for (const [model, u] of models) {
        const cost = computeCost(u, priceForModel(model));
        rows.push({
          user_id: userId,
          day,
          model,
          input_tokens: u.input,
          output_tokens: u.output,
          cache_read_tokens: u.cacheRead,
          cache_write_tokens: u.cacheWrite,
          cost_usd: Number(cost.toFixed(6)),
          updated_at: new Date().toISOString(),
        });
      }
    }
  }

  if (rows.length === 0) {
    console.log(
      `No model.completed events in last ${LOOKBACK_DAYS}d (${filesProcessed} files scanned)`
    );
    return;
  }

  // Upsert in batches of 500
  const BATCH = 500;
  let written = 0;
  for (let i = 0; i < rows.length; i += BATCH) {
    const batch = rows.slice(i, i + BATCH);
    const { error } = await supabase
      .from('mate_cost_daily')
      .upsert(batch, { onConflict: 'user_id,day,model' });
    if (error) {
      console.error(`Upsert batch ${i / BATCH} failed:`, error.message);
      process.exit(2);
    }
    written += batch.length;
  }

  const totalCost = rows.reduce((a, r) => a + r.cost_usd, 0);
  console.log(
    `Aggregated ${eventsFound} model.completed events from ${filesProcessed} trajectory files → ${written} rows · $${totalCost.toFixed(2)} fleet cost (${LOOKBACK_DAYS}d)`
  );
}

main().catch((e) => {
  console.error('Aggregator failed:', e);
  process.exit(1);
});
