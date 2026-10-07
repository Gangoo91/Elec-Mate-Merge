import PptxGenJS from 'pptxgenjs';
import type { SlideDeck, CollegeBrand } from '@/hooks/useSlideDeck';
import {
  KIND_LABEL,
  isReference,
  normaliseSlide,
  parseOptions,
  photoAlt,
  sourceLine,
  splitQuestionTag,
  wantsPhoto,
  type DeckSlide,
} from '@/components/college/slides/slideContent';
import { diagramSvg } from '@/components/college/slides/slideDiagrams';

/* ==========================================================================
   exportSlideDeckToPptx — the deck as a PowerPoint file (16:9).

   Mirrors SlideCanvas: same content rules (cleaned text, paraphrased and
   sourced regulation slides), same layouts, same type scale. On the
   13.33 x 7.5 in page: heading 38pt, body 24pt, never below 16pt for slide
   text. Each text box picks the largest size that fits its box, so nothing
   runs off the slide. Speaker notes go in the notes pane.

   Photos and the logo are fetched first; one that fails to load is left
   out rather than failing the whole file. Diagrams are drawn to PNG.

   ELE-942 / [F1.3].
   ========================================================================== */

interface ExportOptions {
  deck: SlideDeck;
  lessonTitle: string;
  brand: CollegeBrand | null;
  theme?: 'dark' | 'light';
}

interface Pal {
  bg: string;
  fg: string;
  accent: string;
  accentFill: string;
  onAccent: string;
  rule: string;
  panel: string;
}

const DARK: Pal = {
  bg: '0D0D0E',
  fg: 'FFFFFF',
  accent: 'FACC15',
  accentFill: 'FACC15',
  onAccent: '0D0D0E',
  rule: '4A4A4C',
  panel: '18181A',
};

const LIGHT: Pal = {
  bg: 'FFFFFF',
  fg: '141414',
  accent: '92400E',
  accentFill: 'FACC15',
  onAccent: '141414',
  rule: 'CFCFCF',
  panel: 'F6F6F6',
};

const FONT = 'Calibri';
const W = 13.333;
const H = 7.5;
const MX = 0.67;
const BODY_Y = 2.3;
const BODY_BOTTOM = 6.55;
const FOOT_Y = 6.78;

type Media = Map<string, string>;

export async function exportSlideDeckToPptx(opts: ExportOptions): Promise<void> {
  const { deck, lessonTitle, brand, theme = 'dark' } = opts;
  const P = theme === 'light' ? LIGHT : DARK;

  const slides = deck.slides.map((s) => normaliseSlide(s));
  const media: Media = new Map();
  await Promise.all([
    ...slides
      .filter((s) => wantsPhoto(s) && s.image_url)
      .map(async (s) => {
        const data = await fetchAsDataUrl(s.image_url!);
        if (data) media.set(s.image_url!, data);
      }),
    (async () => {
      if (brand?.logo_url) {
        const data = await fetchAsDataUrl(brand.logo_url);
        if (data) media.set(brand.logo_url, data);
      }
    })(),
    ...slides
      .filter((s) => s.kind === 'diagram_caption' && s.diagram_kind)
      .map(async (s) => {
        const key = `diagram:${s.diagram_kind}`;
        if (media.has(key)) return;
        const svg = diagramSvg(s.diagram_kind, {
          fg: `#${P.fg}`,
          accent: `#${P.accent}`,
          line: `#${P.fg}`,
        });
        const png = svg ? await svgToPng(svg, 1200, 600) : null;
        if (png) media.set(key, png);
      }),
  ]);

  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE';
  pptx.title = lessonTitle;
  pptx.author = brand?.name ?? 'Elec-Mate';
  pptx.company = brand?.name ?? 'Elec-Mate';

  slides.forEach((slide, i) => {
    const ps = pptx.addSlide();
    ps.background = { color: P.bg };
    renderSlide(ps, slide, i, slides.length, P, lessonTitle, brand, media);
    if (slide.speaker_notes) ps.addNotes(slide.speaker_notes);
  });

  await pptx.writeFile({ fileName: `${slugify(lessonTitle)}.pptx` });
}

/* ───────────────── fitting ───────────────── */

/** Largest point size (from `max` down to `min`) at which the paragraphs fit the box. */
function fitPt(paras: string[], w: number, h: number, max: number, min = 16, gap = 0.45): number {
  for (let pt = max; pt >= min; pt -= 1) {
    const cw = (pt / 72) * 0.53; // average character width, Calibri, with headroom
    const lh = (pt / 72) * 1.28;
    let total = 0;
    for (const p of paras) {
      const lines = p
        .split('\n')
        .reduce(
          (n, line) => n + Math.max(1, Math.ceil((line.length * cw) / Math.max(0.5, w - 0.3))),
          0
        );
      total += lines * lh + (pt / 72) * gap;
    }
    if (total <= h) return pt;
  }
  return min;
}

/* ───────────────── text helpers ───────────────── */

function addLabel(
  ps: PptxGenJS.Slide,
  text: string,
  x: number,
  y: number,
  w: number,
  color: string
) {
  ps.addText(text.toUpperCase(), {
    x,
    y,
    w,
    h: 0.32,
    fontFace: FONT,
    fontSize: 14,
    bold: true,
    color,
    charSpacing: 2,
    margin: 0,
  });
}

function addPara(
  ps: PptxGenJS.Slide,
  text: string | undefined,
  box: { x: number; y: number; w: number; h: number },
  P: Pal,
  o: { max?: number; min?: number; bold?: boolean; color?: string } = {}
): number {
  if (!text) return 0;
  const pt = fitPt([text], box.w, box.h, o.max ?? 24, o.min ?? 16);
  ps.addText(text, {
    ...box,
    fontFace: FONT,
    fontSize: pt,
    bold: o.bold,
    color: o.color ?? P.fg,
    valign: 'top',
    margin: 0,
    lineSpacingMultiple: 1.12,
    fit: 'shrink',
  });
  return pt;
}

function addList(
  ps: PptxGenJS.Slide,
  items: string[],
  box: { x: number; y: number; w: number; h: number },
  P: Pal,
  o: { max?: number; min?: number; numbered?: boolean; tags?: boolean } = {}
) {
  if (!items.length) return;
  const pt = fitPt(items, box.w - 0.5, box.h, o.max ?? 24, o.min ?? 16, 0.6);
  ps.addText(
    items
      .map((raw) => {
        const { tag, text } = o.tags ? splitQuestionTag(raw) : { tag: null, text: raw };
        const runs: PptxGenJS.TextProps[] = [];
        if (tag) runs.push({ text: `${tag}  `, options: { bold: true, color: P.accent } });
        runs.push({ text });
        return runs;
      })
      .flatMap((runs) =>
        runs.map((r, j) => ({
          text: r.text,
          options: {
            ...(r.options ?? {}),
            ...(j === 0
              ? {
                  bullet: o.numbered ? { type: 'number' as const } : { code: '25A0', indent: 22 },
                  paraSpaceBefore: 0,
                  paraSpaceAfter: Math.round(pt * 0.55),
                }
              : {}),
            breakLine: j === runs.length - 1,
          },
        }))
      ),
    {
      ...box,
      fontFace: FONT,
      fontSize: pt,
      color: P.fg,
      valign: 'top',
      margin: 0,
      fit: 'shrink',
    }
  );
}

function addPanel(
  ps: PptxGenJS.Slide,
  P: Pal,
  box: { x: number; y: number; w: number; h: number },
  label: string,
  body: string | undefined,
  o: { labelColor?: string; max?: number } = {}
) {
  ps.addShape('roundRect', {
    ...box,
    rectRadius: 0.12,
    fill: { color: P.panel },
    line: { color: P.rule, width: 1.25 },
  });
  addLabel(ps, label, box.x + 0.3, box.y + 0.22, box.w - 0.6, o.labelColor ?? P.accent);
  addPara(ps, body, { x: box.x + 0.3, y: box.y + 0.62, w: box.w - 0.6, h: box.h - 0.8 }, P, {
    max: o.max ?? 20,
  });
}

/* ───────────────── slide ───────────────── */

function renderSlide(
  ps: PptxGenJS.Slide,
  slide: DeckSlide,
  index: number,
  total: number,
  base: Pal,
  lessonTitle: string,
  brand: CollegeBrand | null,
  media: Media
) {
  const photo = wantsPhoto(slide) && slide.image_url ? media.get(slide.image_url) : undefined;
  const fullBleed = slide.kind === 'title' && !!photo;
  const split = !!photo && !fullBleed;
  const P = fullBleed ? DARK : base;

  if (fullBleed && photo) {
    ps.addImage({
      data: photo,
      x: 0,
      y: 0,
      w: W,
      h: H,
      sizing: { type: 'cover', w: W, h: H },
      altText: photoAlt(slide),
    });
    ps.addShape('rect', {
      x: 0,
      y: 0,
      w: W,
      h: H,
      fill: { color: '000000', transparency: 28 },
      line: { type: 'none' },
    });
  }
  if (split && photo) {
    const ix = W * 0.56;
    ps.addImage({
      data: photo,
      x: ix,
      y: 0,
      w: W - ix,
      h: H,
      sizing: { type: 'cover', w: W - ix, h: H },
      altText: photoAlt(slide),
    });
  }

  const cw = (split ? W * 0.56 : W) - MX * 2;

  // Eyebrow and heading.
  const label = slide.kind === 'title' ? brand?.name || KIND_LABEL.title : KIND_LABEL[slide.kind];
  addLabel(ps, label, MX, 0.5, cw, P.accent);
  const headPt = fitPt(
    [slide.heading || 'Untitled slide'],
    cw,
    slide.kind === 'title' ? 2.2 : 1.35,
    slide.kind === 'title' ? 50 : 38,
    28,
    0
  );
  ps.addText(slide.heading || 'Untitled slide', {
    x: MX,
    y: 0.88,
    w: cw,
    h: slide.kind === 'title' ? 2.2 : 1.35,
    fontFace: FONT,
    fontSize: headPt,
    bold: true,
    color: P.fg,
    valign: 'top',
    margin: 0,
    fit: 'shrink',
  });

  if (slide.kind === 'title' && brand?.logo_url && media.get(brand.logo_url)) {
    ps.addImage({
      data: media.get(brand.logo_url)!,
      x: W - MX - 1.6,
      y: 0.45,
      w: 1.6,
      h: 0.7,
      sizing: { type: 'contain', w: 1.6, h: 0.7 },
      altText: `${brand.name} logo`,
    });
  }

  const box = { x: MX, y: BODY_Y, w: cw, h: BODY_BOTTOM - BODY_Y };
  renderBody(ps, slide, P, box, media);

  // Footer.
  ps.addShape('line', {
    x: MX,
    y: FOOT_Y - 0.08,
    w: (split ? W * 0.56 : W) - MX * 2,
    h: 0,
    line: { color: P.rule, width: 0.75 },
  });
  const acs = (slide.slide_acs ?? []).join(', ');
  ps.addText(
    [
      { text: lessonTitle, options: {} },
      ...(acs ? [{ text: `   ·   Maps to ${acs}`, options: {} }] : []),
    ],
    {
      x: MX,
      y: FOOT_Y,
      w: cw - 1,
      h: 0.4,
      fontFace: FONT,
      fontSize: 13,
      color: P.fg,
      margin: 0,
      valign: 'middle',
      fit: 'shrink',
    }
  );
  ps.addText(`${index + 1} / ${total}`, {
    x: MX + cw - 1,
    y: FOOT_Y,
    w: 1,
    h: 0.4,
    fontFace: FONT,
    fontSize: 13,
    bold: true,
    color: P.fg,
    align: 'right',
    margin: 0,
    valign: 'middle',
  });
}

function renderBody(
  ps: PptxGenJS.Slide,
  s: DeckSlide,
  P: Pal,
  box: { x: number; y: number; w: number; h: number },
  media: Media
) {
  const { x, y, w, h } = box;
  switch (s.kind) {
    case 'title': {
      const ty = y + 0.5;
      addPara(ps, s.subtitle, { x, y: ty, w, h: 1.4 }, P, { max: 26 });
      addPara(ps, s.body, { x, y: ty + 1.5, w, h: 1.2 }, P, { max: 20 });
      if (s.duration_label)
        addPara(ps, s.duration_label, { x, y: y + h - 0.5, w, h: 0.5 }, P, {
          max: 18,
          color: P.accent,
          bold: true,
        });
      return;
    }
    case 'objectives':
    case 'summary': {
      let top = y;
      if (s.body) {
        addPara(ps, s.body, { x, y, w, h: 0.8 }, P, { max: 20 });
        top += 0.9;
      }
      addList(ps, s.bullets ?? [], { x, y: top, w, h: h - (top - y) }, P, {
        numbered: s.kind === 'objectives',
      });
      return;
    }
    case 'starter': {
      const qs = s.questions ?? [];
      const bh = qs.length ? h * 0.4 : h;
      addPara(ps, s.body, { x, y, w, h: bh }, P, { max: 23 });
      if (qs.length)
        addList(ps, qs, { x, y: y + bh + 0.15, w, h: h - bh - 0.15 }, P, {
          numbered: true,
          tags: true,
          max: 20,
        });
      return;
    }
    case 'concept':
    case 'image_concept': {
      const terms = (s.key_terms ?? []).map((t) => `${t.term}: ${t.definition}`);
      const bullets = s.bullets ?? [];
      const bh = terms.length || bullets.length ? h * 0.45 : h;
      addPara(ps, s.body, { x, y, w, h: bh }, P, { max: 23 });
      if (bullets.length)
        addList(ps, bullets, { x, y: y + bh + 0.1, w, h: h - bh - 0.1 }, P, { max: 21 });
      else if (terms.length) {
        const ty = y + bh + 0.1;
        const pt = fitPt(terms, w, h - bh - 0.1, 18, 14, 0.4);
        ps.addText(
          (s.key_terms ?? []).flatMap((t) => [
            { text: t.term, options: { bold: true, color: P.accent } },
            {
              text: t.definition ? `: ${t.definition}` : '',
              options: { breakLine: true, paraSpaceAfter: 6 },
            },
          ]),
          {
            x,
            y: ty,
            w,
            h: h - bh - 0.1,
            fontFace: FONT,
            fontSize: pt,
            color: P.fg,
            valign: 'top',
            margin: 0,
            fit: 'shrink',
          }
        );
      }
      return;
    }
    case 'reg_cite':
    case 'pull_quote': {
      let top = y;
      const ref = isReference(s.reg_number) ? s.reg_number! : null;
      if (ref) {
        ps.addText(ref, {
          x,
          y: top,
          w,
          h: 0.85,
          fontFace: FONT,
          fontSize: 50,
          bold: true,
          color: P.accent,
          margin: 0,
          valign: 'top',
        });
        top += 0.95;
      }
      const why = s.why_it_matters;
      const textH = why ? (y + h - top) * 0.5 : y + h - top - 0.5;
      addPara(ps, s.clause || s.quote || s.body, { x, y: top, w, h: textH }, P, { max: 25 });
      top += textH + 0.05;
      const src = sourceLine(s);
      if (src) {
        ps.addText(`Paraphrased from ${src}`, {
          x,
          y: top,
          w,
          h: 0.4,
          fontFace: FONT,
          fontSize: 15,
          bold: true,
          color: P.fg,
          margin: 0,
        });
        top += 0.5;
      }
      if (why) {
        ps.addShape('line', { x, y: top, w, h: 0, line: { color: P.rule, width: 1 } });
        addLabel(ps, 'Why it matters on site', x, top + 0.15, w, P.accent);
        addPara(ps, why, { x, y: top + 0.55, w, h: y + h - top - 0.55 }, P, { max: 19 });
      }
      return;
    }
    case 'big_stat': {
      ps.addText(s.stat_value ?? '', {
        x,
        y,
        w,
        h: 1.7,
        fontFace: FONT,
        fontSize: fitPt([s.stat_value ?? ''], w, 1.7, 100, 48, 0),
        bold: true,
        color: P.accent,
        margin: 0,
        valign: 'top',
      });
      addPara(ps, s.stat_caption, { x, y: y + 1.8, w, h: 1.2 }, P, { max: 26 });
      addPara(ps, s.body, { x, y: y + 3.05, w, h: 0.75 }, P, { max: 19 });
      if (s.stat_source)
        addPara(ps, `Source: ${s.stat_source}`, { x, y: y + h - 0.4, w, h: 0.4 }, P, {
          max: 14,
          min: 12,
          bold: true,
        });
      return;
    }
    case 'two_column': {
      const cw = (w - 0.4) / 2;
      (['left', 'right'] as const).forEach((side, i) => {
        const px = x + i * (cw + 0.4);
        const heading = side === 'left' ? s.left_heading : s.right_heading;
        const body = side === 'left' ? s.left_body : s.right_body;
        const bullets = (side === 'left' ? s.left_bullets : s.right_bullets) ?? [];
        ps.addShape('roundRect', {
          x: px,
          y,
          w: cw,
          h,
          rectRadius: 0.12,
          fill: { color: P.panel },
          line: { color: P.rule, width: 1.25 },
        });
        if (heading) addLabel(ps, heading, px + 0.3, y + 0.25, cw - 0.6, P.accent);
        const inner = { x: px + 0.3, y: y + 0.7, w: cw - 0.6, h: h - 0.9 };
        if (bullets.length) addList(ps, bullets, inner, P, { max: 19 });
        else addPara(ps, body, inner, P, { max: 19 });
      });
      return;
    }
    case 'diagram_caption': {
      const png = s.diagram_kind ? media.get(`diagram:${s.diagram_kind}`) : undefined;
      if (!png) {
        addPara(ps, s.diagram_caption, { x, y, w, h: h * 0.5 }, P, { max: 24 });
        addPara(ps, s.body, { x, y: y + h * 0.5, w, h: h * 0.5 }, P, { max: 20 });
        return;
      }
      const dw = w * 0.58;
      ps.addImage({ data: png, x, y, w: dw, h: dw / 2, altText: s.diagram_caption || 'Diagram' });
      addPara(ps, s.diagram_caption, { x: x + dw + 0.4, y, w: w - dw - 0.4, h: h * 0.55 }, P, {
        max: 19,
      });
      addPara(ps, s.body, { x: x + dw + 0.4, y: y + h * 0.58, w: w - dw - 0.4, h: h * 0.42 }, P, {
        max: 18,
      });
      return;
    }
    case 'activity': {
      const side = 2.6;
      const lw = w - side - 0.4;
      const sh = s.success_criteria ? 1.45 : 0;
      addPara(ps, s.instruction || s.body, { x, y, w: lw, h: h - sh - (sh ? 0.2 : 0) }, P, {
        max: 22,
      });
      if (s.success_criteria)
        addPanel(
          ps,
          P,
          { x, y: y + h - sh, w: lw, h: sh },
          'Success looks like',
          s.success_criteria,
          { max: 18 }
        );
      const sx = x + lw + 0.4;
      let sy = y;
      if (s.group_size) {
        addPanel(ps, P, { x: sx, y: sy, w: side, h: 1.15 }, 'Work', groupLabel(s.group_size), {
          max: 20,
        });
        sy += 1.35;
      }
      if (s.time_minutes)
        addPanel(ps, P, { x: sx, y: sy, w: side, h: 1.3 }, 'Time', `${s.time_minutes} min`, {
          max: 32,
        });
      return;
    }
    case 'worked_example': {
      const ph = s.problem ? 1.6 : 0;
      if (s.problem) addPanel(ps, P, { x, y, w, h: ph }, 'Problem', s.problem, { max: 19 });
      addList(
        ps,
        s.solution_steps ?? [],
        { x, y: y + ph + (ph ? 0.2 : 0), w, h: h - ph - (ph ? 0.2 : 0) },
        P,
        { numbered: true, max: 19 }
      );
      return;
    }
    case 'check_understanding':
      addList(ps, s.questions ?? [], box, P, { numbered: true, tags: true, max: 23 });
      return;
    case 'misconception': {
      const cw = (w - 0.4) / 2;
      addPanel(ps, P, { x, y, w: cw, h }, 'Common belief', s.belief, { labelColor: P.fg, max: 22 });
      addPanel(ps, P, { x: x + cw + 0.4, y, w: cw, h }, 'Actually', s.correction, { max: 20 });
      return;
    }
    case 'plenary': {
      const parsed = s.body ? parseOptions(s.body) : null;
      const eh = s.exit_ticket ? 1.3 : 0;
      const avail = h - eh - (eh ? 0.2 : 0);
      if (parsed) {
        addPara(ps, parsed.stem, { x, y, w, h: avail * 0.4 }, P, { max: 23 });
        const ow = (w - 0.3) / 2;
        const oh = (avail * 0.6 - 0.15) / 2;
        parsed.options.slice(0, 4).forEach((o, i) => {
          const ox = x + (i % 2) * (ow + 0.3);
          const oy = y + avail * 0.4 + Math.floor(i / 2) * (oh + 0.15);
          ps.addText(String.fromCharCode(65 + i), {
            x: ox,
            y: oy,
            w: 0.45,
            h: 0.45,
            shape: 'ellipse',
            fill: { color: P.accentFill },
            color: P.onAccent,
            fontFace: FONT,
            fontSize: 16,
            bold: true,
            align: 'center',
            valign: 'middle',
            margin: 0,
          });
          addPara(ps, o, { x: ox + 0.6, y: oy, w: ow - 0.6, h: oh }, P, { max: 19 });
        });
      } else {
        addPara(ps, s.body, { x, y, w, h: avail }, P, { max: 23 });
      }
      if (s.exit_ticket)
        addPanel(ps, P, { x, y: y + h - eh, w, h: eh }, 'Exit ticket', s.exit_ticket, { max: 18 });
      return;
    }
    default:
      addPara(ps, s.body, box, P, { max: 23 });
  }
}

function groupLabel(g: string): string {
  return (
    (
      {
        individual: 'On your own',
        pairs: 'In pairs',
        small_group: 'Small groups',
        whole_class: 'Whole class',
      } as Record<string, string>
    )[g] ?? g.replace(/_/g, ' ')
  );
}

/* ───────────────── media ───────────────── */

async function fetchAsDataUrl(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, { mode: 'cors' });
    if (!res.ok) return null;
    const blob = await res.blob();
    return await new Promise<string | null>((resolve) => {
      const r = new FileReader();
      r.onload = () =>
        resolve(typeof r.result === 'string' ? r.result.replace(/^data:/, '') : null);
      r.onerror = () => resolve(null);
      r.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

async function svgToPng(svg: string, w: number, h: number): Promise<string | null> {
  try {
    const img = new Image();
    const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('svg'));
      img.src = url;
    });
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.drawImage(img, 0, 0, w, h);
    return canvas.toDataURL('image/png').replace(/^data:/, '');
  } catch {
    return null;
  }
}

function slugify(s: string): string {
  return (
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60) || 'slide-deck'
  );
}
