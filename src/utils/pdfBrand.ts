/**
 * pdfBrand — shared helpers for the app-side (client) jsPDF generators.
 *
 * Two systemic problems across our jsPDF documents (audit, June 2026):
 *   1. Brand colour was hardcoded (and inconsistent) in every generator —
 *      the user's saved company colour was ignored.
 *   2. Page-breaks used brittle `y > 250` thresholds with no overflow guard,
 *      so content clipped, overlapped, or orphaned headers.
 *
 * These helpers fix both. They are unit-agnostic: positions/sizes are read
 * from the live jsPDF document (`pageSize.getHeight()` etc.) so they work
 * whether the doc was created in 'mm', 'pt' or 'px'. Colours are unit-free.
 */
import type jsPDF from 'jspdf';

export type RGB = [number, number, number];

// Brand navy — matches the welcome/dunning emails and the app's dark brand.
export const DEFAULT_BRAND: RGB = [12, 27, 42]; // #0C1B2A

/** Parse a #rrggbb hex string to RGB. Returns null if not a valid 6-digit hex. */
export function hexToRgb(hex?: string | null): RGB | null {
  const clean = (hex || '').replace('#', '').trim();
  if (clean.length !== 6) return null;
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  if (![r, g, b].every((n) => Number.isFinite(n))) return null;
  return [r, g, b];
}

type ProfileLike = { accent_color?: string | null; primary_color?: string | null } | null | undefined;

/**
 * Resolve the brand colour for a PDF accent. Accepts a hex string or a
 * company-profile-like object (uses accent_color, then primary_color).
 *
 * Mirrors the PDFMonkey fix (ELE-1168): pure #000000 is the broken legacy
 * default, not a real choice, so it's treated as unset and falls back.
 */
export function getBrandColour(source?: string | ProfileLike, fallback: RGB = DEFAULT_BRAND): RGB {
  const hex = typeof source === 'string' ? source : source?.accent_color || source?.primary_color;
  const rgb = hexToRgb(hex);
  if (!rgb) return fallback;
  if (rgb[0] === 0 && rgb[1] === 0 && rgb[2] === 0) return fallback; // all-black legacy default
  return rgb;
}

/** Relative luminance — used to pick readable text over a brand fill. */
export function isLightColour([r, g, b]: RGB): boolean {
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6;
}

/** Black or white text that reads on top of the given fill colour. */
export function readableTextOn(fill: RGB): RGB {
  return isLightColour(fill) ? [17, 24, 39] : [255, 255, 255];
}

/**
 * Page-break guard. If `y + needed` would cross the bottom margin, add a page
 * and return the new top y; otherwise return `y` unchanged. Keeps blocks from
 * clipping or orphaning. All values are in the document's own unit.
 */
export function ensureSpace(
  doc: jsPDF,
  y: number,
  needed: number,
  opts: { bottomMargin?: number; topAfterBreak?: number; onNewPage?: (doc: jsPDF) => void } = {}
): number {
  const pageH = doc.internal.pageSize.getHeight();
  const bottomMargin = opts.bottomMargin ?? 40;
  if (y + needed > pageH - bottomMargin) {
    doc.addPage();
    opts.onNewPage?.(doc);
    return opts.topAfterBreak ?? opts.bottomMargin ?? 40;
  }
  return y;
}

/** Thin brand accent strip across the top of the page (in doc units). */
export function addAccentBar(doc: jsPDF, brand: RGB, height = 6): void {
  const pageW = doc.internal.pageSize.getWidth();
  doc.setFillColor(brand[0], brand[1], brand[2]);
  doc.rect(0, 0, pageW, height, 'F');
}

/**
 * Fit a (w×h) image into a (boxW×boxH) box preserving aspect ratio, centred —
 * fixes the squashed-photo bug in the certificate/photo exports. Returns the
 * draw rect to pass to doc.addImage.
 */
export function fitContain(
  srcW: number,
  srcH: number,
  boxX: number,
  boxY: number,
  boxW: number,
  boxH: number
): { x: number; y: number; w: number; h: number } {
  const ratio = srcW / Math.max(1, srcH);
  let w = boxW;
  let h = w / ratio;
  if (h > boxH) {
    h = boxH;
    w = h * ratio;
  }
  return { x: boxX + (boxW - w) / 2, y: boxY + (boxH - h) / 2, w, h };
}
