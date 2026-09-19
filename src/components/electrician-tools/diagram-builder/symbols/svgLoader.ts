import { symbolRegistry } from './symbolRegistry';
import { SYMBOL_SVGS } from './symbolSvgs.generated';
import { resolveSymbolId } from './symbolAliases';

/**
 * Symbol artwork for the Room Planner.
 *
 * ⚠️ NOTHING HERE TOUCHES THE NETWORK, and that is the point.
 *
 * This used to `fetch()` each symbol from `/symbols/<cat>/<file>.svg` when it
 * was drawn. One network call per symbol, in a tool electricians use on site,
 * where signal is frequently absent. When a fetch failed it fell back to a
 * hand-maintained inline copy of 50 symbols — which had drifted, its "single
 * 13A socket" being a plain circle rather than the semicircle on a baseline
 * that the real symbol (and the public chart) draws — and for the other 85 it
 * drew a generic placeholder circle.
 *
 * So the same plan rendered differently, and wrongly, offline: 40 symbols stale,
 * 85 as placeholders. On a drawing an electrician hands to a client.
 *
 * All 114 SVGs together are ~48 KB, so they are inlined at build time instead
 * (`symbolSvgs.generated.ts`, produced by `npm run symbols:generate`). The
 * planner and the public symbol chart now draw the same bytes, and
 * `npm run check:symbol-svgs` fails the build if the two ever drift apart.
 */

/** In-memory cache: symbol ID -> SVG XML string */
const svgCache = new Map<string, string>();

/** Fabric.js does not resolve `currentColor`, so bind it to black at load. */
const resolveCurrentColor = (svg: string): string => svg.replace(/currentColor/g, '#000000');

/**
 * The artwork for a symbol id, or undefined if the id is unknown.
 *
 * Synchronous by design — there is no I/O left to wait for.
 */
export function getSymbolSvg(symbolId: string): string | undefined {
  const id = resolveSymbolId(symbolId);

  const cached = svgCache.get(id);
  if (cached) return cached;

  const entry = symbolRegistry.find((s) => s.id === id);
  if (!entry) return undefined;

  const raw = SYMBOL_SVGS[entry.svgPath];
  if (!raw) return undefined;

  const resolved = resolveCurrentColor(raw);
  svgCache.set(id, resolved);
  return resolved;
}

/**
 * Async wrapper kept for the existing call sites.
 *
 * Resolves immediately — the artwork is already in the bundle. A symbol that
 * cannot be resolved returns a placeholder rather than throwing, so one bad id
 * can never take out a drawing the user is part-way through.
 */
export async function loadSymbolSvg(symbolId: string): Promise<string> {
  return getSymbolSvg(symbolId) ?? PLACEHOLDER_SVG;
}

/**
 * Shown only for an id that is in no registry — which should be impossible, as
 * `check:symbol-svgs` keeps the map and the registry in step. Deliberately
 * distinct from every real symbol so it reads as "missing", not as a component.
 */
const PLACEHOLDER_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">' +
  '<circle cx="20" cy="20" r="12" fill="none" stroke="#000000" stroke-width="1.5" stroke-dasharray="3 2"/>' +
  '<text x="20" y="25" text-anchor="middle" font-size="14" fill="#000000">?</text></svg>';

/**
 * Warm the cache for every registry symbol.
 *
 * Retained so existing callers keep working, but it is now a cheap loop over
 * an in-memory object rather than 114 batched HTTP requests on page mount.
 */
export async function preloadAllSymbols(): Promise<void> {
  for (const entry of symbolRegistry) getSymbolSvg(entry.id);
}

/** Cached artwork for a symbol, without going through the async wrapper. */
export function getSymbolSvgSync(symbolId: string): string | undefined {
  return getSymbolSvg(symbolId);
}

/** Clear the cache (useful for testing). */
export function clearSvgCache(): void {
  svgCache.clear();
}
