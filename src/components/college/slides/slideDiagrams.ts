import type { DiagramKind } from '@/hooks/useSlideDeck';

/* ==========================================================================
   Simple teaching diagrams for "diagram" slides, as SVG strings so the
   on-screen slide and the PowerPoint export draw the same picture.

   Deliberately schematic and labelled in words, with no figures: a diagram
   that carried a value would need a source. Kinds without a drawing here
   (earthing_arrangement covers three different systems) return null and the
   slide shows its caption on its own rather than a placeholder.

   Canvas is 1200 x 600. Labels are 28px+ so they read on a projector.
   ========================================================================== */

export interface DiagramPalette {
  fg: string;
  accent: string;
  line: string;
}

const FONT = `font-family="Inter, 'Segoe UI', Arial, sans-serif"`;

function text(
  x: number,
  y: number,
  s: string,
  p: DiagramPalette,
  o: { size?: number; anchor?: string; color?: string; weight?: number } = {}
) {
  return `<text x="${x}" y="${y}" ${FONT} font-size="${o.size ?? 28}" font-weight="${o.weight ?? 500}" fill="${o.color ?? p.fg}" text-anchor="${o.anchor ?? 'middle'}">${s}</text>`;
}

function box(x: number, y: number, w: number, h: number, p: DiagramPalette, accent = false) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="none" stroke="${accent ? p.accent : p.fg}" stroke-width="4"/>`;
}

function socket(cx: number, cy: number, p: DiagramPalette) {
  return `<rect x="${cx - 34}" y="${cy - 24}" width="68" height="48" rx="8" fill="none" stroke="${p.fg}" stroke-width="4"/><circle cx="${cx - 12}" cy="${cy}" r="4" fill="${p.fg}"/><circle cx="${cx + 12}" cy="${cy}" r="4" fill="${p.fg}"/>`;
}

function wrap(inner: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600" width="1200" height="600">${inner}</svg>`;
}

export function diagramSvg(kind: DiagramKind | null | undefined, p: DiagramPalette): string | null {
  switch (kind) {
    case 'ring_final': {
      const xs = [380, 600, 820, 1040];
      return wrap(
        box(40, 230, 170, 140, p, true) +
          text(125, 310, 'CU', p, { color: p.accent, weight: 700, size: 34 }) +
          `<path d="M210 270 H1100 V470 H210" fill="none" stroke="${p.line}" stroke-width="5"/>` +
          xs.map((x) => socket(x, 270, p)).join('') +
          xs
            .slice(0, 3)
            .map((x) => socket(x + 110, 470, p))
            .join('') +
          text(600, 120, 'Ring final circuit', p, { size: 40, weight: 700 }) +
          text(600, 170, 'Both ends of the ring return to the same protective device', p) +
          text(600, 560, 'Socket-outlets are connected around the loop', p)
      );
    }
    case 'radial': {
      const xs = [420, 640, 860, 1080];
      return wrap(
        box(40, 230, 170, 140, p, true) +
          text(125, 310, 'CU', p, { color: p.accent, weight: 700, size: 34 }) +
          `<path d="M210 300 H1080" fill="none" stroke="${p.line}" stroke-width="5"/>` +
          xs
            .map(
              (x) =>
                `<path d="M${x} 300 V400" stroke="${p.line}" stroke-width="5"/>` + socket(x, 424, p)
            )
            .join('') +
          text(600, 120, 'Radial final circuit', p, { size: 40, weight: 700 }) +
          text(600, 170, 'One feed from the protective device, ending at the last point', p) +
          text(1080, 510, 'Last point', p)
      );
    }
    case 'lighting_final': {
      const xs = [440, 700, 960];
      return wrap(
        box(40, 170, 170, 140, p, true) +
          text(125, 250, 'CU', p, { color: p.accent, weight: 700, size: 34 }) +
          `<path d="M210 240 H1080" fill="none" stroke="${p.line}" stroke-width="5"/>` +
          xs
            .map(
              (x) =>
                `<circle cx="${x}" cy="240" r="30" fill="none" stroke="${p.fg}" stroke-width="4"/><path d="M${x - 21} 219 L${x + 21} 261 M${x + 21} 219 L${x - 21} 261" stroke="${p.fg}" stroke-width="4"/>` +
                `<path d="M${x} 270 V430" stroke="${p.line}" stroke-width="4" stroke-dasharray="10 8"/>` +
                `<rect x="${x - 26}" y="430" width="52" height="64" rx="6" fill="none" stroke="${p.fg}" stroke-width="4"/><path d="M${x} 448 V476" stroke="${p.fg}" stroke-width="5"/>`
            )
            .join('') +
          text(600, 90, 'Lighting final circuit', p, { size: 40, weight: 700 }) +
          text(600, 140, 'Supply runs to each lighting point', p) +
          text(700, 550, 'A switch drop runs down to the switch for each point', p)
      );
    }
    case 'distribution_board': {
      const ways = [0, 1, 2, 3, 4, 5];
      return wrap(
        box(80, 150, 1040, 300, p, true) +
          text(600, 120, 'Distribution board', p, { size: 40, weight: 700 }) +
          box(120, 220, 150, 160, p) +
          text(195, 310, 'Main', p) +
          text(195, 345, 'switch', p) +
          `<path d="M270 300 H320 V190 H${360 + 5 * 125 + 47}" fill="none" stroke="${p.line}" stroke-width="5"/>` +
          ways
            .map((i) => {
              const x = 360 + i * 125;
              return (
                `<path d="M${x + 47} 190 V220" stroke="${p.line}" stroke-width="5"/>` +
                box(x, 220, 95, 160, p) +
                text(x + 47, 310, `Way ${i + 1}`, p, { size: 24 }) +
                `<path d="M${x + 47} 380 V520" stroke="${p.line}" stroke-width="4"/>`
              );
            })
            .join('') +
          text(700, 570, 'Each way protects one outgoing circuit', p)
      );
    }
    case 'voltage_drop_curve':
      return wrap(
        `<path d="M160 80 V500 H1120" fill="none" stroke="${p.fg}" stroke-width="4"/>` +
          `<path d="M160 150 L1100 330" fill="none" stroke="${p.accent}" stroke-width="6"/>` +
          `<path d="M160 400 H1100" stroke="${p.fg}" stroke-width="3" stroke-dasharray="14 10"/>` +
          text(170, 140, 'Supply voltage', p, { anchor: 'start' }) +
          text(1100, 385, 'Design limit', p, { anchor: 'end' }) +
          text(640, 560, 'Distance along the circuit', p) +
          `<text x="80" y="290" ${FONT} font-size="28" font-weight="500" fill="${p.fg}" text-anchor="middle" transform="rotate(-90 80 290)">Voltage at the load</text>`
      );
    case 'three_phase': {
      const cx = 600;
      const cy = 330;
      const r = 200;
      const pt = (deg: number) => [
        cx + r * Math.cos((deg * Math.PI) / 180),
        cy - r * Math.sin((deg * Math.PI) / 180),
      ];
      const [x1, y1] = pt(90);
      const [x2, y2] = pt(-30);
      const [x3, y3] = pt(210);
      return wrap(
        `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${p.fg}" stroke-width="2" stroke-dasharray="6 8"/>` +
          `<path d="M${cx} ${cy} L${x1} ${y1} M${cx} ${cy} L${x2} ${y2} M${cx} ${cy} L${x3} ${y3}" stroke="${p.accent}" stroke-width="6"/>` +
          text(x1, y1 - 18, 'L1', p, { size: 34, weight: 700 }) +
          text(x2 + 40, y2 + 20, 'L2', p, { size: 34, weight: 700 }) +
          text(x3 - 40, y3 + 20, 'L3', p, { size: 34, weight: 700 }) +
          text(cx, 580, 'Three phases, 120 degrees apart', p)
      );
    }
    case 'equipotential_bonding':
      return wrap(
        box(470, 250, 260, 110, p, true) +
          text(600, 318, 'MET', p, { color: p.accent, weight: 700, size: 36 }) +
          text(600, 80, 'Main protective bonding', p, { size: 40, weight: 700 }) +
          `<path d="M470 305 H250 V200" stroke="${p.line}" stroke-width="5"/>` +
          box(110, 120, 280, 80, p) +
          text(250, 172, 'Gas pipe', p) +
          `<path d="M730 305 H950 V200" stroke="${p.line}" stroke-width="5"/>` +
          box(810, 120, 280, 80, p) +
          text(950, 172, 'Water pipe', p) +
          `<path d="M600 360 V450" stroke="${p.line}" stroke-width="5"/>` +
          box(420, 450, 360, 80, p) +
          text(600, 502, 'Means of earthing', p) +
          text(600, 585, 'Bonding conductors connect each service to the MET', p, { size: 26 })
      );
    case 'RCD_discrimination':
      return wrap(
        text(600, 80, 'RCD selectivity', p, { size: 40, weight: 700 }) +
          box(400, 120, 400, 110, p, true) +
          text(600, 168, 'Upstream RCD', p, { weight: 700 }) +
          text(600, 205, 'time-delayed (S type)', p, { size: 26 }) +
          `<path d="M600 230 V300 M600 300 H300 V340 M600 300 H900 V340" fill="none" stroke="${p.line}" stroke-width="5"/>` +
          box(150, 340, 300, 110, p) +
          text(300, 388, 'Downstream RCD', p, { size: 26, weight: 700 }) +
          text(300, 425, 'general type', p, { size: 26 }) +
          box(750, 340, 300, 110, p) +
          text(900, 388, 'Downstream RCD', p, { size: 26, weight: 700 }) +
          text(900, 425, 'general type', p, { size: 26 }) +
          text(600, 530, 'The device nearest the fault should trip first', p)
      );
    default:
      return null;
  }
}

/** The SVG as a data URI, for an <img> or a PowerPoint image. */
export function diagramDataUri(
  kind: DiagramKind | null | undefined,
  p: DiagramPalette
): string | null {
  const svg = diagramSvg(kind, p);
  if (!svg) return null;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
