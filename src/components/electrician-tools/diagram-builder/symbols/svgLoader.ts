import { symbolRegistry } from './symbolRegistry';
import { electricalSymbols } from './electricalSymbols';

/** In-memory cache: symbol ID -> SVG XML string */
const svgCache = new Map<string, string>();

/** Replace currentColor with black for Fabric.js compatibility */
const resolveCurrentColor = (svg: string): string =>
  svg.replace(/currentColor/g, '#000000');

/**
 * Load the SVG content for a given symbol ID.
 *
 * Resolution order:
 *  1. In-memory cache (instant)
 *  2. Legacy `electricalSymbols` lookup (inline SVG XML — no network needed)
 *  3. Fetch from `symbolRegistry.svgPath` (e.g. /symbols/lighting/ceiling-light.svg)
 *
 * Falls back to a simple placeholder circle if all paths fail.
 */
export async function loadSymbolSvg(symbolId: string): Promise<string> {
  // 1. Cache hit
  const cached = svgCache.get(symbolId);
  if (cached) return cached;

  // 2. SVG file from registry (our proper SVG files in public/symbols/)
  const regEntry = symbolRegistry.find((s) => s.id === symbolId);
  if (regEntry) {
    try {
      const resp = await fetch(regEntry.svgPath);
      if (resp.ok) {
        const svgText = resolveCurrentColor(await resp.text());
        svgCache.set(symbolId, svgText);
        return svgText;
      }
    } catch {
      // Fall through to legacy
    }
  }

  // 3. Fallback to legacy electricalSymbols (inline TypeScript SVGs)
  const legacy = electricalSymbols.find((s) => s.id === symbolId);
  if (legacy?.svgXml) {
    const resolved = resolveCurrentColor(legacy.svgXml);
    svgCache.set(symbolId, resolved);
    return resolved;
  }

  // 4. Fallback placeholder — simple circle with cross
  const placeholder = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40"><circle cx="20" cy="20" r="12" fill="none" stroke="#000000" stroke-width="1.5"/><line x1="14" y1="14" x2="26" y2="26" stroke="#000000" stroke-width="1"/><line x1="26" y1="14" x2="14" y2="26" stroke="#000000" stroke-width="1"/></svg>`;
  svgCache.set(symbolId, placeholder);
  return placeholder;
}

/**
 * Preload all symbols from the registry into the cache.
 * Call once at page mount for snappy symbol placement.
 * Non-blocking — failures are silently skipped.
 */
export async function preloadAllSymbols(): Promise<void> {
  const promises = symbolRegistry.map(async (entry) => {
    if (svgCache.has(entry.id)) return;

    // Fetch SVG file first (our proper symbols)
    try {
      const resp = await fetch(entry.svgPath);
      if (resp.ok) {
        svgCache.set(entry.id, resolveCurrentColor(await resp.text()));
        return;
      }
    } catch {
      // Fall through to legacy
    }

    // Fallback to legacy inline SVGs
    const legacy = electricalSymbols.find((s) => s.id === entry.id);
    if (legacy?.svgXml) {
      svgCache.set(entry.id, resolveCurrentColor(legacy.svgXml));
    }
  });

  await Promise.allSettled(promises);
}

/**
 * Get cached SVG synchronously (returns undefined if not yet loaded).
 * Useful for rendering previews where you've already called preloadAllSymbols.
 */
export function getSymbolSvgSync(symbolId: string): string | undefined {
  return svgCache.get(symbolId);
}

/** Clear the entire cache (useful for testing). */
export function clearSvgCache(): void {
  svgCache.clear();
}
