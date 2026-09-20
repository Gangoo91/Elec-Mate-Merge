/**
 * What an Anthropic call cost — ELE-1748.
 * ────────────────────────────────────────────────────────────────────────
 * Anthropic bills ~£1,224 a month, 65% of the business's entire running cost,
 * and until now not one token of it was recorded anywhere. `ai_usage_log` held
 * 4 rows, `ai_usage_stats` was empty, and `mate_cost_daily` stopped on 13 July
 * — so there was no way to see spend by feature or by user, or to separate
 * customer usage from internal development usage. Every attempt to reduce the
 * bill was guesswork.
 *
 * Shared rather than living in one function, because there is more than one
 * Anthropic caller (`conversational-search` and `_shared/ai-wrapper.ts`) and a
 * second copy of a pricing table is a second thing to forget to update.
 */

/**
 * Token counts for one call, summed across every streamed iteration.
 *
 * The four counts are kept separate deliberately — they do NOT cost the same.
 * A cache READ is a fraction of a fresh input token and a cache WRITE is a
 * premium on one, so collapsing them into "input" would hide whether the
 * caller's prompt caching is earning its keep.
 */
export interface AnthropicUsage {
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens: number;
  cacheWriteTokens: number;
}

/**
 * Per-million-token rates, USD. ELE-1748.
 *
 * 🔴 THE TOKEN COUNTS ARE EXACT; THE COST IS DERIVED.
 *
 * Anthropic reports the four token counts and we store them verbatim — those
 * are the ground truth and they never go stale. `cost_usd` is computed from
 * the table below, so it is only as current as this table. Check it against
 * Anthropic's pricing page before quoting the number to anyone, and treat a
 * disagreement as this table being out of date rather than the tokens being
 * wrong.
 *
 * Cache multipliers rather than absolute figures, because they are ratios of
 * the model's own input rate: a read is a tenth of a fresh input token, a
 * write is a quarter more than one. That ratio is the whole economic case for
 * the caller's `cache_control: ephemeral` block, and storing the counts
 * separately is what lets anyone check whether it is actually paying off.
 */
const MODEL_RATES_USD_PER_MTOK: Record<string, { input: number; output: number }> = {
  'claude-haiku-4-5-20251001': { input: 1, output: 5 },
  'claude-sonnet-4-6': { input: 3, output: 15 },
};
const CACHE_READ_MULTIPLIER = 0.1;
const CACHE_WRITE_MULTIPLIER = 1.25;

export function estimateCostUsd(model: string, u: AnthropicUsage): number {
  const rate = MODEL_RATES_USD_PER_MTOK[model];
  /*
   * An unknown model costs 0 rather than a guess: a wrong number in a cost
   * table is worse than an obvious gap, because the gap gets investigated and
   * the plausible number gets believed.
   *
   * But a silent 0 is its own trap, and it is the likeliest way this table
   * rots. The day the router is pointed at a new model — or the day Anthropic
   * appends a different date suffix — the tokens keep recording and the cost
   * column quietly reads zero, which looks exactly like "nobody used it". So
   * it says so, loudly, rather than only returning 0.
   */
  if (!rate) {
    console.warn(
      `[ELE-1748] no rate for model "${model}" — tokens recorded, cost recorded as 0. ` +
        `Add it to MODEL_RATES_USD_PER_MTOK in _shared/ai-cost.ts.`
    );
    return 0;
  }
  const perToken = rate.input / 1_000_000;
  return (
    u.inputTokens * perToken +
    u.cacheReadTokens * perToken * CACHE_READ_MULTIPLIER +
    u.cacheWriteTokens * perToken * CACHE_WRITE_MULTIPLIER +
    (u.outputTokens * rate.output) / 1_000_000
  );
}

/**
 * Record one call's usage against the user, the day and the FUNCTION.
 *
 * 🔴 Writes `ai_app_cost_daily`, NOT `mate_cost_daily`.
 *
 * `mate_cost_daily` looks like the obvious home and is the wrong one. It is
 * populated by an hourly cron ON THE VPS that walks OpenClaw trajectory jsonl
 * files — it measures INTERNAL DEVELOPMENT usage, and it stopped on 13 July
 * 2026 when that script stopped. Writing the app's spend into the same rows
 * would add customer usage to development usage under one primary key and make
 * both unreadable, which is the exact opposite of what ELE-1748 needs. The two
 * tables share a shape deliberately so they can be read side by side.
 *
 * Never throws and never blocks the answer. This is accounting, and accounting
 * must not be able to break the product it is measuring — a failure here costs
 * one row of visibility, not a reply the customer was waiting for.
 */
export async function recordAnthropicUsage(
  // deno-lint-ignore no-explicit-any
  supabase: any,
  userId: string,
  model: string,
  fnName: string,
  u: AnthropicUsage
): Promise<void> {
  if (!userId) return;
  const total = u.inputTokens + u.outputTokens + u.cacheReadTokens + u.cacheWriteTokens;
  if (total === 0) return;

  try {
    const day = new Date().toISOString().slice(0, 10);
    // Read-then-write rather than a bare upsert: the table has no atomic
    // counter, and two calls from the same user on the same day through the
    // same function and model must ADD UP rather than overwrite each other.
    const { data: existing } = await supabase
      .from('ai_app_cost_daily')
      .select(
        'input_tokens, output_tokens, cache_read_tokens, cache_write_tokens, call_count, cost_usd'
      )
      .eq('user_id', userId)
      .eq('day', day)
      .eq('model', model)
      .eq('fn_name', fnName)
      .maybeSingle();

    const row = {
      user_id: userId,
      day,
      model,
      fn_name: fnName,
      input_tokens: (existing?.input_tokens ?? 0) + u.inputTokens,
      output_tokens: (existing?.output_tokens ?? 0) + u.outputTokens,
      cache_read_tokens: (existing?.cache_read_tokens ?? 0) + u.cacheReadTokens,
      cache_write_tokens: (existing?.cache_write_tokens ?? 0) + u.cacheWriteTokens,
      call_count: (existing?.call_count ?? 0) + 1,
      cost_usd: Number(existing?.cost_usd ?? 0) + estimateCostUsd(model, u),
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('ai_app_cost_daily')
      .upsert(row, { onConflict: 'user_id,day,model,fn_name' });
    if (error) console.error('[ELE-1748] could not record AI usage:', error);
  } catch (err) {
    console.error('[ELE-1748] could not record AI usage:', err);
  }
}
