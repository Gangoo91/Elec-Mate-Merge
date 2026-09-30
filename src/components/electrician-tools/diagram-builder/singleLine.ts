/**
 * The board's single-line diagram as SVG (rebuilt 30 Sep 2026).
 *
 * Drawn the way a single-line diagram is drawn: the supply (DNO cut-out,
 * meter, main switch, earthing) down to the busbar, then one outgoing way per
 * protective device, each with its IEC 60617 circuit-breaker symbol (an RCD
 * toroid where the device is an RCBO) and numbered by its way on the board —
 * 1, 2, 3… or 1L1, 1L2… on a three-phase board.
 *
 *  • On screen: a vertical busbar with the ways listed down it (reads on a
 *    phone without scrolling sideways).
 *  • In the PDF: the drawing-office form — a horizontal busbar with the ways
 *    dropping from it and a schedule strip under them (way, device, rating,
 *    RCD, cable, points, run, circuit), paged at up to 18 ways a sheet.
 */
import { circuitColour, type DesignedCircuit, type Earthing } from './circuitDesign';
import { circuitTitle, isSpare, notation, type Supply, type Way } from './boardWays';

export interface SingleLineOptions {
  /** "CU", or the sub-board's name. */
  board: string;
  /** Set on a sub-board: the board its submain comes from. */
  fedFrom?: string;
  wayOf: Map<string, Way>;
  supply: Supply;
  earthing: Earthing;
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const INK = '#111111';
const SOFT = '#4b5563';
const t = (x: number, y: number, s: string, attrs = '') =>
  `<text x="${x}" y="${y}" ${attrs}>${esc(s)}</text>`;
/** A line; `extra` may set its own stroke colour (one stroke attribute only —
 *  a repeated attribute is invalid XML and the whole diagram fails to draw). */
const line = (x1: number, y1: number, x2: number, y2: number, w = 1.6, extra = '') =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" ${/stroke="/.test(extra) ? '' : `stroke="${INK}" `}stroke-width="${w}" ${extra}/>`;

/** A circuit colour dark enough to read on white paper. */
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

/** Split at a word boundary into two lines of up to `max` characters. */
function wrap(s: string, max: number): [string, string?] {
  if (s.length <= max) return [s];
  const cut = s.lastIndexOf(' ', max);
  const at = cut > max * 0.5 ? cut : max;
  const rest = s.slice(at).trim();
  return [s.slice(0, at).trim(), rest.length > max ? `${rest.slice(0, max - 1)}…` : rest];
}

const hasRcd = (c: DesignedCircuit) => c.rcd && c.kind !== 'submain';

// ── Symbols ──────────────────────────────────────────────────────────────────

/**
 * IEC 60617 circuit-breaker on a horizontal conductor from (x, y), 54 wide:
 * the moving contact lifted off the fixed contact, which carries the cross.
 * An RCBO adds the core-balance toroid, linked to the mechanism.
 */
function breakerH(x: number, y: number, rcd: boolean): string {
  const parts = [
    line(x, y, x + 6, y),
    line(x + 6, y, x + 22, y - 9),
    line(x + 23, y - 3, x + 29, y + 3, 1.4),
    line(x + 23, y + 3, x + 29, y - 3, 1.4),
    line(x + 26, y, x + 34, y),
  ];
  if (rcd) {
    parts.push(
      `<ellipse cx="${x + 44}" cy="${y}" rx="3.5" ry="7" fill="none" stroke="${INK}" stroke-width="1.3"/>`,
      line(x + 44, y - 7, x + 44, y - 13, 1, 'stroke-dasharray="2 2"'),
      line(x + 14, y - 13, x + 44, y - 13, 1, 'stroke-dasharray="2 2"')
    );
  }
  parts.push(line(x + 34, y, x + 54, y));
  return parts.join('');
}

/** The same breaker on a vertical conductor falling from (x, y), 56 tall. */
function breakerV(x: number, y: number, rcd: boolean): string {
  const parts = [
    line(x, y, x, y + 8),
    line(x, y + 8, x + 9, y + 24),
    line(x - 3, y + 25, x + 3, y + 31, 1.4),
    line(x + 3, y + 25, x - 3, y + 31, 1.4),
    line(x, y + 28, x, y + 36),
  ];
  if (rcd) {
    parts.push(
      `<ellipse cx="${x}" cy="${y + 45}" rx="7" ry="3.5" fill="none" stroke="${INK}" stroke-width="1.3"/>`,
      line(x + 7, y + 45, x + 13, y + 45, 1, 'stroke-dasharray="2 2"'),
      line(x + 13, y + 17, x + 13, y + 45, 1, 'stroke-dasharray="2 2"')
    );
  }
  parts.push(line(x, y + 36, x, y + 56));
  return parts.join('');
}

/** Protective earth (IEC 60617): three bars narrowing. */
const earthSym = (x: number, y: number) =>
  [
    line(x, y, x, y + 8, 1.4),
    line(x - 8, y + 8, x + 8, y + 8, 1.6),
    line(x - 5, y + 12, x + 5, y + 12, 1.4),
    line(x - 2, y + 16, x + 2, y + 16, 1.2),
  ].join('');

const supplyText = (s: Supply) => (s === 'three' ? '400/230 V 3~ + N · 50 Hz' : '230 V 1~ · 50 Hz');
const earthingText = (e: Earthing) => (e === 'TN-C-S' ? 'TN-C-S (PME)' : e);

/**
 * The supply down a vertical line at x, from y: cut-out, meter, main switch
 * and earthing — or a sub-board's submain. Returns the markup and the y where
 * the busbar starts.
 */
function supplyDown(x: number, y: number, o: SingleLineOptions): { svg: string; end: number } {
  const p: string[] = [];
  let ms: number;
  if (o.fedFrom) {
    const w = o.wayOf.get(o.board);
    p.push(
      t(
        x - 24,
        y,
        `Submain from ${o.fedFrom}${w ? `, way ${w.label}` : ''}`,
        `font-size="12" font-weight="700" fill="${INK}"`
      )
    );
    p.push(
      t(
        x - 24,
        y + 15,
        o.supply === 'three' ? 'TP&N' : 'Single-phase',
        `font-size="10.5" fill="${SOFT}"`
      )
    );
    p.push(line(x, y + 24, x, y + 50));
    ms = y + 50;
  } else {
    p.push(t(x - 24, y, 'DNO supply', `font-size="12" font-weight="700" fill="${INK}"`));
    p.push(t(x - 24, y + 15, supplyText(o.supply), `font-size="10.5" fill="${SOFT}"`));
    p.push(line(x, y + 24, x, y + 36));
    // cut-out fuse: the conductor through a rectangle
    p.push(
      `<rect x="${x - 6}" y="${y + 36}" width="12" height="24" fill="#fff" stroke="${INK}" stroke-width="1.6"/>`
    );
    p.push(line(x, y + 36, x, y + 60, 1.2));
    p.push(t(x + 14, y + 52, 'Cut-out (DNO)', `font-size="10.5" fill="${SOFT}"`));
    p.push(line(x, y + 60, x, y + 72));
    // meter
    p.push(
      `<circle cx="${x}" cy="${y + 86}" r="14" fill="#fff" stroke="${INK}" stroke-width="1.6"/>`
    );
    p.push(
      t(x, y + 90, 'kWh', `text-anchor="middle" font-size="9.5" font-weight="700" fill="${INK}"`)
    );
    p.push(t(x + 22, y + 90, 'Meter and tails', `font-size="10.5" fill="${SOFT}"`));
    p.push(line(x, y + 100, x, y + 118));
    ms = y + 118;
  }
  // main switch (switch-disconnector): blade with the isolating bar
  p.push(line(x, ms, x + 10, ms + 20));
  p.push(line(x - 4, ms + 24, x + 4, ms + 24, 1.6));
  p.push(line(x, ms + 24, x, ms + 40));
  p.push(
    t(
      x + 16,
      ms + 14,
      `Main switch ${o.supply === 'three' ? 'TP&N' : 'DP'}`,
      `font-size="11" font-weight="700" fill="${INK}"`
    )
  );
  p.push(t(x + 16, ms + 28, 'Rating to suit — confirm', `font-size="10" fill="${SOFT}"`));
  if (!o.fedFrom) {
    // main earthing terminal, to the side of the intake
    p.push(
      t(
        x - 44,
        ms - 30,
        'MET',
        `text-anchor="middle" font-size="9.5" font-weight="700" fill="${INK}"`
      )
    );
    p.push(earthSym(x - 44, ms - 24));
    p.push(
      t(
        x - 44,
        ms + 8,
        earthingText(o.earthing),
        `text-anchor="middle" font-size="9" fill="${SOFT}"`
      )
    );
  }
  return { svg: p.join(''), end: ms + 40 };
}

const zoneLine = (zones: DesignedCircuit[], o: SingleLineOptions) =>
  zones
    .map((z) =>
      `${o.wayOf.get(z.ref)?.label ?? z.ref} ${z.description.replace(/^Fire detection zone( — )?/, '')}`.trim()
    )
    .join(' · ');

// ── On screen: vertical ──────────────────────────────────────────────────────

const ROW = 70;
const WIDTH = 520;

export function singleLineSvg(
  ways: DesignedCircuit[],
  zones: DesignedCircuit[],
  o: SingleLineOptions
): { svg: string; width: number; height: number } {
  const BUS = 80;
  const head = supplyDown(BUS, 22, o);
  const TOP = head.end + 24;
  const height = TOP + Math.max(1, ways.length) * ROW + (zones.length ? 60 : 20);
  const p: string[] = [head.svg];
  p.push(line(BUS, head.end, BUS, TOP - 10));
  if (ways.length) {
    p.push(line(BUS, TOP - 10, BUS, TOP + (ways.length - 1) * ROW + 10, 6));
    p.push(
      t(
        BUS - 8,
        TOP + 4,
        o.supply === 'three' ? 'L1 L2 L3 N' : 'Busbar',
        `text-anchor="end" font-size="9.5" fill="${SOFT}"`
      )
    );
  }
  ways.forEach((c, i) => {
    const y = TOP + i * ROW;
    const w = o.wayOf.get(c.ref);
    const n = notation(c);
    const colour = onPaper(circuitColour(c.ref));
    p.push(line(BUS, y, BUS + 14, y));
    p.push(
      `<rect x="${BUS + 14}" y="${y - 11}" width="40" height="22" rx="3" fill="#fff" stroke="${INK}" stroke-width="1.4"/>`
    );
    p.push(
      t(
        BUS + 34,
        y + 4.5,
        w?.label ?? '—',
        `text-anchor="middle" font-size="12" font-weight="800" fill="${INK}"`
      )
    );
    const x = BUS + 132;
    if (isSpare(c)) {
      p.push(line(BUS + 54, y, BUS + 66, y));
      p.push(t(x, y + 4, 'Spare', `font-size="12" font-style="italic" fill="${SOFT}"`));
      return;
    }
    p.push(breakerH(BUS + 54, y, hasRcd(c)));
    p.push(line(BUS + 108, y, BUS + 124, y, 3, `stroke="${colour}"`));
    const desc = circuitTitle(c, 46);
    p.push(t(x, y - 10, desc, `font-size="12.5" font-weight="700" fill="${INK}"`));
    p.push(
      t(
        x,
        y + 6,
        `${n.device} · ${n.rating} · ${n.rcd === '—' ? 'no RCD' : `RCD ${n.rcd}`}`,
        `font-size="11" fill="${INK}"`
      )
    );
    const detail = [
      n.cable === 'TBC' ? 'cable TBC' : `${n.cable} mm²`,
      c.points ? `${c.points} pt${c.points === 1 ? '' : 's'}` : '',
      c.length
        ? `run ≈ ${c.length.lengthM} m${c.length.maxM ? ` (max ${c.length.maxM})` : ''}`
        : '',
    ]
      .filter(Boolean)
      .join(' · ');
    p.push(
      t(x, y + 21, detail, `font-size="10.5" fill="${c.length?.ok === false ? '#b45309' : SOFT}"`)
    );
  });
  if (zones.length) {
    const zl = zoneLine(zones, o);
    p.push(
      t(24, height - 30, 'Fire alarm panel zones', `font-size="11" font-weight="700" fill="${INK}"`)
    );
    p.push(
      t(
        24,
        height - 14,
        zl.length > 80 ? `${zl.slice(0, 79)}…` : zl,
        `font-size="10.5" fill="${SOFT}"`
      )
    );
  }
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${height}" width="${WIDTH}" height="${height}" ` +
    `font-family="Helvetica, Arial, sans-serif"><rect width="100%" height="100%" fill="#ffffff"/>${p.join('')}</svg>`;
  return { svg, width: WIDTH, height };
}

// ── In the PDF: horizontal busbar and a schedule strip ───────────────────────

const PAGE_W = 1400;
const PAGE_H = 900;
const PER_PAGE = 18;
const LEFT = 260; // the supply column and the strip's row headings
const BUS_Y = 270;

export function singleLinePages(
  ways: DesignedCircuit[],
  zones: DesignedCircuit[],
  o: SingleLineOptions & { title?: string }
): { svg: string; width: number; height: number }[] {
  const pages = Math.max(1, Math.ceil(ways.length / PER_PAGE));
  const per = Math.ceil(ways.length / pages) || 1;
  return Array.from({ length: pages }, (_, pi) => {
    const slice = ways.slice(pi * per, (pi + 1) * per);
    const p: string[] = [];
    const colW = Math.min(62, (PAGE_W - LEFT - 40) / Math.max(slice.length, 1));
    const x0 = LEFT + colW / 2 + 10;
    if (o.title)
      p.push(
        t(
          30,
          36,
          `${o.title}${pages > 1 ? ` (${pi + 1} of ${pages})` : ''}`,
          `font-size="17" font-weight="800" fill="${INK}"`
        )
      );

    // The supply on the first sheet; a continuation after.
    if (pi === 0) {
      const head = supplyDown(120, 74, o);
      p.push(head.svg);
      p.push(line(120, head.end, 120, BUS_Y));
      p.push(line(120, BUS_Y, x0, BUS_Y, 6));
    } else {
      p.push(
        t(30, BUS_Y - 14, `Busbar continued from sheet ${pi}`, `font-size="12" fill="${SOFT}"`)
      );
      p.push(line(40, BUS_Y, x0, BUS_Y, 6, 'stroke-dasharray="10 6"'));
    }
    const busEnd = x0 + (slice.length - 1) * colW + 8;
    p.push(line(x0 - 3, BUS_Y, busEnd, BUS_Y, 6));
    p.push(
      t(
        busEnd,
        BUS_Y - 14,
        o.supply === 'three' ? 'Busbar L1 L2 L3 N' : 'Busbar',
        `text-anchor="end" font-size="11" fill="${SOFT}"`
      )
    );

    // The schedule strip.
    const rows = ['Way', 'Device', 'Rating', 'RCD mA', 'Cable mm²', 'Points', 'Run m'];
    const RH = 21;
    const STRIP = BUS_Y + 96;
    const rowY = rows.map((_, i) => STRIP + i * RH);
    const DESC_Y = STRIP + rows.length * RH;
    const BOTTOM = PAGE_H - 58;
    const gridL = x0 - colW / 2;
    const gridR = gridL + slice.length * colW;
    p.push(
      `<rect x="${gridL}" y="${STRIP}" width="${gridR - gridL}" height="${RH}" fill="#eef2f7"/>`
    );
    rows.forEach((name, i) =>
      p.push(
        t(
          gridL - 10,
          rowY[i] + 15,
          name,
          `text-anchor="end" font-size="11" font-weight="700" fill="${INK}"`
        )
      )
    );
    p.push(
      t(
        gridL - 10,
        DESC_Y + 17,
        'Circuit',
        `text-anchor="end" font-size="11" font-weight="700" fill="${INK}"`
      )
    );
    [...rowY.slice(1), DESC_Y].forEach((yy) => p.push(line(gridL, yy, gridR, yy, 0.8)));

    slice.forEach((c, i) => {
      const x = x0 + i * colW;
      const w = o.wayOf.get(c.ref);
      const n = notation(c);
      const colour = onPaper(circuitColour(c.ref));
      if (i) p.push(line(x - colW / 2, STRIP, x - colW / 2, BOTTOM, 0.8));
      if (isSpare(c)) {
        p.push(line(x, BUS_Y, x, BUS_Y + 14));
        p.push(
          t(
            x,
            rowY[0] + 15,
            w?.label ?? '',
            `text-anchor="middle" font-size="10.5" font-weight="800" fill="${INK}"`
          )
        );
        p.push(
          `<text transform="translate(${x + 4} ${BOTTOM - 8}) rotate(-90)" font-size="11" font-style="italic" fill="${SOFT}">Spare</text>`
        );
        return;
      }
      p.push(breakerV(x, BUS_Y, hasRcd(c)));
      p.push(line(x, BUS_Y + 56, x, STRIP - 3, 3, `stroke="${colour}"`));
      if (c.afdd)
        p.push(
          t(
            x - 12,
            BUS_Y + 70,
            'AFDD',
            `text-anchor="end" font-size="8.5" font-weight="700" fill="${INK}"`
          )
        );
      const cell = (row: number, s: string, attrs: string) =>
        p.push(
          t(
            x,
            rowY[row] + 15,
            s,
            `text-anchor="middle" font-size="${s.length > 6 ? 9 : 10.5}" ${attrs}`
          )
        );
      cell(0, w?.label ?? '—', `font-weight="800" fill="${INK}"`);
      cell(
        1,
        n.device === 'AFDD/RCBO' ? 'AFDD+' : n.device,
        `fill="${n.device === 'TBC' ? '#b45309' : INK}"`
      );
      cell(2, n.rating, `font-weight="700" fill="${n.rating === 'TBC' ? '#b45309' : INK}"`);
      cell(3, n.rcd === '—' ? '—' : n.rcd.replace(' mA', ''), `fill="${INK}"`);
      cell(4, n.cable, `fill="${n.cable === 'TBC' ? '#b45309' : INK}"`);
      cell(5, c.points ? `${c.points}` : '—', `fill="${INK}"`);
      cell(
        6,
        c.length ? `${Math.round(c.length.lengthM)}` : '—',
        `fill="${c.length?.ok === false ? '#b45309' : INK}"${c.length?.ok === false ? ' font-weight="800"' : ''}`
      );
      // the circuit, read upwards
      // Two lines up the column where the rooms need them.
      const maxChars = Math.floor((BOTTOM - DESC_Y - 12) / 6.2);
      const [l1, l2] = wrap(circuitTitle(c, maxChars * 2), maxChars);
      const lines = l2 ? [l1, l2] : [l1];
      lines.forEach((ln, k) =>
        p.push(
          `<text transform="translate(${x + (lines.length === 2 ? (k ? 12 : -2) : 4)} ${BOTTOM - 8}) rotate(-90)" font-size="11" ${k ? `fill="${SOFT}"` : `fill="${INK}"`}>${esc(ln)}</text>`
        )
      );
    });
    p.push(
      `<rect x="${gridL}" y="${STRIP}" width="${gridR - gridL}" height="${BOTTOM - STRIP}" fill="none" stroke="${INK}" stroke-width="1.4"/>`
    );

    // Key, and the fire-alarm zones on the last sheet.
    const foot = [
      'Rating: curve and amps (B32 = Type B, 32 A) · RCD: 30 = 30 mA · Cable: live/cpc, mm² · FR = fire-resisting · AFDD+ = AFDD with RCBO · TBC = to be confirmed by design',
    ];
    if (pi === pages - 1 && zones.length)
      foot.push(`Fire alarm panel zones: ${zoneLine(zones, o)}`);
    foot.forEach((f, i) =>
      p.push(
        t(
          30,
          PAGE_H - 30 + i * 15,
          f.length > 200 ? `${f.slice(0, 199)}…` : f,
          `font-size="10" fill="${SOFT}"`
        )
      )
    );

    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${PAGE_W} ${PAGE_H}" width="${PAGE_W}" height="${PAGE_H}" ` +
      `font-family="Helvetica, Arial, sans-serif"><rect width="100%" height="100%" fill="#ffffff"/>${p.join('')}</svg>`;
    return { svg, width: PAGE_W, height: PAGE_H };
  });
}

/** iOS will not draw a canvas above ~16.7 million pixels — it returns "data:," instead. */
const MAX_CANVAS_PIXELS = 16_000_000;
/** Enough for print (≈ 2× the 1400×900 sheet) without a 4 MB payload per page. */
const TARGET_PIXELS = 6_000_000;

async function toPng(svg: string, width: number, height: number): Promise<string> {
  const img = new Image();
  const loaded = new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error('The diagram image could not be drawn'));
  });
  img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  // onload, not decode(): decode() on an SVG data URL rejects in some WebKit builds.
  await loaded;
  const scale = Math.min(
    2,
    Math.sqrt(Math.min(MAX_CANVAS_PIXELS, TARGET_PIXELS) / (width * height))
  );
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
  o: SingleLineOptions & { title: string }
): Promise<string[]> {
  const out: string[] = [];
  for (const p of singleLinePages(ways, zones, o)) out.push(await toPng(p.svg, p.width, p.height));
  return out;
}
