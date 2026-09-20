/**
 * ELE-1748 — the cost arithmetic behind `mate_cost_daily.cost_usd`.
 *
 * The four token counts are recorded verbatim from Anthropic and are ground
 * truth. This is the derived half, and it is the half that can be silently
 * wrong — a misplaced multiplier produces a plausible number that nobody
 * questions until it is used to make a decision about a £1,224 bill.
 */
import { assertAlmostEquals, assertEquals } from 'https://deno.land/std@0.208.0/assert/mod.ts';
import { estimateCostUsd } from './ai-cost.ts';

const HAIKU = 'claude-haiku-4-5-20251001';
const SONNET = 'claude-sonnet-4-6';
const none = { inputTokens: 0, outputTokens: 0, cacheReadTokens: 0, cacheWriteTokens: 0 };

Deno.test('a million Haiku input tokens costs the input rate', () => {
  assertAlmostEquals(estimateCostUsd(HAIKU, { ...none, inputTokens: 1_000_000 }), 1, 1e-9);
});

Deno.test('a million Haiku output tokens costs the output rate', () => {
  assertAlmostEquals(estimateCostUsd(HAIKU, { ...none, outputTokens: 1_000_000 }), 5, 1e-9);
});

Deno.test('Sonnet is three times Haiku on input and output alike', () => {
  const u = { ...none, inputTokens: 1_000_000, outputTokens: 1_000_000 };
  assertAlmostEquals(estimateCostUsd(SONNET, u), estimateCostUsd(HAIKU, u) * 3, 1e-9);
});

Deno.test('a cache READ is a tenth of a fresh input token', () => {
  // The whole economic case for the ephemeral system block. If this ratio is
  // wrong, caching looks like it is saving nothing and someone removes it.
  const fresh = estimateCostUsd(HAIKU, { ...none, inputTokens: 1_000_000 });
  const cached = estimateCostUsd(HAIKU, { ...none, cacheReadTokens: 1_000_000 });
  assertAlmostEquals(cached, fresh * 0.1, 1e-9);
});

Deno.test('a cache WRITE costs a quarter more than a fresh input token', () => {
  const fresh = estimateCostUsd(HAIKU, { ...none, inputTokens: 1_000_000 });
  const written = estimateCostUsd(HAIKU, { ...none, cacheWriteTokens: 1_000_000 });
  assertAlmostEquals(written, fresh * 1.25, 1e-9);
});

Deno.test('caching only pays off when the block is re-read', () => {
  // One write then four reads, versus sending the same block fresh five times.
  const fresh5 = estimateCostUsd(HAIKU, { ...none, inputTokens: 5_000_000 });
  const cached = estimateCostUsd(HAIKU, {
    ...none,
    cacheWriteTokens: 1_000_000,
    cacheReadTokens: 4_000_000,
  });
  assertEquals(cached < fresh5, true, 'cache should be cheaper across five uses');
  assertAlmostEquals(cached, 1.25 + 0.4, 1e-9);
  assertAlmostEquals(fresh5, 5, 1e-9);
});

Deno.test('a single cache write with no read is MORE expensive', () => {
  // Worth asserting: caching a prompt that is never re-read is a 25% penalty,
  // not a saving. It is why the dynamic half of the prompt is not cached.
  const fresh = estimateCostUsd(HAIKU, { ...none, inputTokens: 1_000_000 });
  const written = estimateCostUsd(HAIKU, { ...none, cacheWriteTokens: 1_000_000 });
  assertEquals(written > fresh, true);
});

Deno.test('an unknown model costs 0, not a guess', () => {
  // A wrong number in a cost table is worse than an obvious gap — the gap
  // gets investigated, the plausible number gets believed.
  assertEquals(estimateCostUsd('claude-something-new', { ...none, inputTokens: 5_000_000 }), 0);
});

Deno.test('a real-shaped call lands where hand arithmetic says', () => {
  const cost = estimateCostUsd(HAIKU, {
    inputTokens: 1_000,
    outputTokens: 500,
    cacheReadTokens: 10_000,
    cacheWriteTokens: 2_000,
  });
  // 0.001 + 0.0025(out) + 0.001(read) + 0.0025(write)
  assertAlmostEquals(cost, 0.007, 1e-9);
});
