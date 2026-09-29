/**
 * The board's single-line diagram as SVG markup (29 Sep 2026) — one builder
 * for the sheet on screen and the pages of the exported PDF.
 *
 * Laid out in columns of up to eleven ways, three columns to a page, so it
 * prints landscape at a readable size: a single tall column squeezed into a
 * landscape sheet printed a 20-way care-home board at about 3 pt.
 */
import { circuitColour, type DesignedCircuit } from './circuitDesign';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const ROW = 64;
const COL_W = 460;
const PER_COLUMN = 11;
const COLUMNS_PER_PAGE = 3;
const INK = '#111111';
const SOFT = '#404040';

const text = (x: number, y: number, s: string, attrs: string) =>
  `<text x="${x}" y="${y}" ${attrs}>${esc(s)}</text>`;

/** A circuit colour dark enough to read on white paper (the pale ones weren't). */
function onPaper(hex: string): string {
  const m = /^#([0-9a-f]{6})$/i.exec(hex);
  if (!m) return hex;
  const n = parseInt(m[1], 16);
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  const lum = (0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2]) / 255;
  if (lum < 0.45) return hex;
  const k = 0.45 / lum;
  return `#${ch
    .map((v) =>
      Math.round(v * k)
        .toString(16)
        .padStart(2, '0')
    )
    .join('')}`;
}

function way(c: DesignedCircuit, x0: number, y: number, bus: number): string {
  const colour = onPaper(circuitColour(c.ref));
  const desc = c.description.length > 36 ? `${c.description.slice(0, 35)}…` : c.description;
  const cable = c.cable.replace(/ \(.*\)$/, '').replace(/ — .*$/, '');
  const detail = [
    cable,
    c.points ? `${c.points} point${c.points === 1 ? '' : 's'}` : '',
    c.length ? `run ≈ ${c.length.lengthM} m${c.length.maxM ? ` (max ${c.length.maxM})` : ''}` : '',
  ]
    .filter(Boolean)
    .join(' · ');
  const b = x0 + bus;
  return [
    `<line x1="${b}" y1="${y}" x2="${b + 36}" y2="${y}" stroke="${INK}" stroke-width="2"/>`,
    `<rect x="${b + 36}" y="${y - 10}" width="34" height="20" rx="3" fill="#ffffff" stroke="${INK}" stroke-width="2"/>`,
    text(
      b + 53,
      y + 4,
      c.afdd ? 'AFDD' : c.rcd ? 'RCBO' : 'MCB',
      `text-anchor="middle" font-size="10" font-weight="700" fill="${INK}"`
    ),
    `<line x1="${b + 70}" y1="${y}" x2="${b + 88}" y2="${y}" stroke="${colour}" stroke-width="3"/>`,
    text(b + 94, y - 8, c.ref, `font-size="13" font-weight="700" fill="${colour}"`),
    text(
      b + 94 + Math.max(34, c.ref.length * 8.5),
      y - 8,
      desc,
      `font-size="12" font-weight="600" fill="${INK}"`
    ),
    text(b + 94, y + 8, c.device, `font-size="10.5" fill="${SOFT}"`),
    text(
      b + 94,
      y + 22,
      detail,
      `font-size="10.5" fill="${c.length?.ok === false ? '#b45309' : SOFT}"`
    ),
  ].join('');
}

/**
 * Supply, meter and main switch down to the top of the busbar — or, on a
 * sub-board, its submain from the main board (no meter).
 */
function supplyHead(HEAD: number, TOP: number, fedFrom?: string): string {
  const BUS = 44;
  if (fedFrom) {
    return [
      text(
        BUS - 20,
        18 + HEAD,
        `Submain from ${fedFrom}`,
        `font-size="12" font-weight="700" fill="${INK}"`
      ),
      `<line x1="${BUS}" y1="${26 + HEAD}" x2="${BUS}" y2="${104 + HEAD}" stroke="${INK}" stroke-width="2"/>`,
      `<line x1="${BUS}" y1="${104 + HEAD}" x2="${BUS + 12}" y2="${122 + HEAD}" stroke="${INK}" stroke-width="2"/>`,
      `<line x1="${BUS}" y1="${124 + HEAD}" x2="${BUS}" y2="${TOP - 10}" stroke="${INK}" stroke-width="2"/>`,
      text(BUS + 22, 118 + HEAD, 'Main switch', `font-size="11" fill="${INK}"`),
    ].join('');
  }
  return [
    text(BUS - 20, 18 + HEAD, 'Incoming supply', `font-size="12" font-weight="700" fill="${INK}"`),
    `<line x1="${BUS}" y1="${26 + HEAD}" x2="${BUS}" y2="${56 + HEAD}" stroke="${INK}" stroke-width="2"/>`,
    `<rect x="${BUS - 20}" y="${56 + HEAD}" width="40" height="28" fill="none" stroke="${INK}" stroke-width="2"/>`,
    text(
      BUS,
      74 + HEAD,
      'kWh',
      `text-anchor="middle" font-size="11" font-weight="700" fill="${INK}"`
    ),
    `<line x1="${BUS}" y1="${84 + HEAD}" x2="${BUS}" y2="${104 + HEAD}" stroke="${INK}" stroke-width="2"/>`,
    `<line x1="${BUS}" y1="${104 + HEAD}" x2="${BUS + 12}" y2="${122 + HEAD}" stroke="${INK}" stroke-width="2"/>`,
    `<line x1="${BUS}" y1="${124 + HEAD}" x2="${BUS}" y2="${TOP - 10}" stroke="${INK}" stroke-width="2"/>`,
    text(BUS + 22, 118 + HEAD, 'Main switch', `font-size="11" fill="${INK}"`),
  ].join('');
}

/**
 * One SVG per page. `startWay` numbers the columns' continuation labels, and
 * the supply, meter and main switch are drawn only on the first page.
 */
function page(
  ways: DesignedCircuit[],
  zones: DesignedCircuit[],
  opts: {
    title?: string;
    first: boolean;
    last: boolean;
    pageNo: number;
    pages: number;
    fedFrom?: string;
  }
): { svg: string; width: number; height: number } {
  const HEAD = opts.title ? 30 : 0;
  const TOP = 150 + HEAD;
  const BUS = 44;
  const columns: DesignedCircuit[][] = [];
  // Even columns: 17 ways as 9 + 8, not 11 + 6.
  const perColumn = Math.ceil(ways.length / Math.max(1, Math.ceil(ways.length / PER_COLUMN)));
  for (let i = 0; i < ways.length; i += perColumn) columns.push(ways.slice(i, i + perColumn));
  if (!columns.length) columns.push([]);
  const rows = Math.max(1, ...columns.map((c) => c.length));
  const width = COL_W * columns.length;
  const height = TOP + rows * ROW + (opts.last && zones.length ? 56 : 30);
  const parts: string[] = [];
  const title = opts.title
    ? `${opts.title}${opts.pages > 1 ? ` (${opts.pageNo} of ${opts.pages})` : ''}`
    : '';
  if (title)
    parts.push(text(BUS - 20, 20, title, `font-size="15" font-weight="700" fill="${INK}"`));

  if (opts.first) parts.push(supplyHead(HEAD, TOP, opts.fedFrom));

  columns.forEach((col, ci) => {
    const x0 = ci * COL_W;
    if (!col.length) return;
    if (ci > 0 || !opts.first) {
      // The same busbar, continued.
      parts.push(
        text(x0 + BUS - 20, TOP - 22, 'Busbar continued', `font-size="11" fill="${SOFT}"`)
      );
    }
    parts.push(
      `<line x1="${x0 + BUS}" y1="${TOP - 10}" x2="${x0 + BUS}" y2="${TOP + (col.length - 1) * ROW + 8}" stroke="${INK}" stroke-width="5"/>`
    );
    col.forEach((c, i) => parts.push(way(c, x0, TOP + i * ROW, BUS)));
  });

  if (opts.last && zones.length) {
    const line = zones
      // "FZ2 Ground floor"; just "FZ1" where the floor has no name.
      .map((z) => `${z.ref} ${z.description.replace(/^Fire detection zone( — )?/, '')}`.trim())
      .join(' · ');
    parts.push(
      text(
        BUS - 20,
        height - 22,
        `FA1 feeds the fire alarm panel: ${line.length > 110 ? `${line.slice(0, 109)}…` : line}`,
        `font-size="11" fill="${INK}"`
      )
    );
  }

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" ` +
    `font-family="Helvetica, Arial, sans-serif"><rect width="100%" height="100%" fill="#ffffff"/>${parts.join('')}</svg>`;
  return { svg, width, height };
}

/** The diagram as page-sized SVGs (one for most boards). */
export function singleLinePages(
  ways: DesignedCircuit[],
  zones: DesignedCircuit[],
  options: { title?: string; fedFrom?: string } = {}
): { svg: string; width: number; height: number }[] {
  // Pages share the ways evenly: 34 ways as 17 + 17, not 33 and a lone
  // fire-alarm way on a page of its own.
  const pages = Math.max(1, Math.ceil(ways.length / (PER_COLUMN * COLUMNS_PER_PAGE)));
  const perPage = Math.ceil(ways.length / pages) || 1;
  return Array.from({ length: pages }, (_, p) =>
    page(ways.slice(p * perPage, (p + 1) * perPage), zones, {
      title: options.title,
      first: p === 0,
      last: p === pages - 1,
      pageNo: p + 1,
      pages,
      fedFrom: options.fedFrom,
    })
  );
}

/** On screen: one continuous column, which scrolls — the phone-friendly form. */
export function singleLineSvg(
  ways: DesignedCircuit[],
  zones: DesignedCircuit[],
  options: { fedFrom?: string } = {}
): { svg: string; width: number; height: number } {
  const TOP = 150;
  const height = TOP + ways.length * ROW + (zones.length ? 56 : 30);
  const bus = ways.length
    ? `<line x1="44" y1="${TOP - 10}" x2="44" y2="${TOP + (ways.length - 1) * ROW + 8}" stroke="${INK}" stroke-width="5"/>`
    : '';
  const body = ways.map((c, i) => way(c, 0, TOP + i * ROW, 44)).join('');
  const zonesLine = zones.length
    ? text(
        24,
        height - 22,
        `FA1 feeds the fire alarm panel: ${zones.map((z) => z.ref).join(', ')}`,
        `font-size="11" fill="${INK}"`
      )
    : '';
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${COL_W} ${height}" width="${COL_W}" height="${height}" ` +
    `font-family="Helvetica, Arial, sans-serif"><rect width="100%" height="100%" fill="#ffffff"/>` +
    `${supplyHead(0, TOP, options.fedFrom)}${bus}${body}${zonesLine}</svg>`;
  return { svg, width: COL_W, height };
}

/** iOS will not draw a canvas above ~16.7 million pixels — it returns "data:," instead. */
const MAX_CANVAS_PIXELS = 16_000_000;

async function toPng(svg: string, width: number, height: number): Promise<string> {
  const img = new Image();
  const loaded = new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error('The diagram image could not be drawn'));
  });
  img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  // onload, not decode(): decode() on an SVG data URL rejects in some WebKit builds.
  await loaded;
  const scale = Math.min(3, Math.sqrt(MAX_CANVAS_PIXELS / (width * height)));
  const canvas = document.createElement('canvas');
  canvas.width = Math.floor(width * scale);
  canvas.height = Math.floor(height * scale);
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not draw the single-line diagram');
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  const url = canvas.toDataURL('image/png');
  if (url.length < 100) throw new Error('The single-line diagram was too large to draw');
  return url;
}

/** The diagram as PNG page images for the PDF. Browser only. */
export async function singleLinePngs(
  ways: DesignedCircuit[],
  zones: DesignedCircuit[],
  title: string,
  fedFrom?: string
): Promise<string[]> {
  const out: string[] = [];
  for (const p of singleLinePages(ways, zones, { title, fedFrom }))
    out.push(await toPng(p.svg, p.width, p.height));
  return out;
}
