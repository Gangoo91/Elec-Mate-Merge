import PptxGenJS from 'pptxgenjs';
import type { Slide, SlideDeck, CollegeBrand } from '@/hooks/useSlideDeck';

/* ==========================================================================
   exportSlideDeckToPptx — converts our slide deck JSON into a downloadable
   .pptx file. Per slide kind we use a different layout. Photos pulled from
   the public Supabase URL on each slide; the .pptx embeds them inline.

   16:9 widescreen. Dark theme by default; light theme available.

   ELE-942 / [F1.3].
   ========================================================================== */

interface ExportOptions {
  deck: SlideDeck;
  lessonTitle: string;
  brand: CollegeBrand | null;
  theme?: 'dark' | 'light';
}

const DARK = {
  bg: '0E0E0F',
  fg: 'FFFFFF',
  fgMuted: 'A6A6A6',
  accent: 'FACC15',
  amber: 'F59E0B',
  cyan: '22D3EE',
  emerald: '34D399',
  rose: 'F87171',
  blue: '60A5FA',
  purple: 'C084FC',
  surface: '1A1A1B',
  border: '2A2A2B',
};

const LIGHT = {
  bg: 'FFFFFF',
  fg: '111111',
  fgMuted: '666666',
  accent: 'F59E0B',
  amber: 'B45309',
  cyan: '0891B2',
  emerald: '047857',
  rose: 'BE123C',
  blue: '1D4ED8',
  purple: '7C3AED',
  surface: 'F5F5F5',
  border: 'E5E5E5',
};

const FONT = 'Calibri';
const FONT_HEADING = 'Calibri';

export async function exportSlideDeckToPptx(opts: ExportOptions): Promise<void> {
  const { deck, lessonTitle, brand, theme = 'dark' } = opts;
  const C = theme === 'dark' ? DARK : LIGHT;

  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE'; // 13.333 × 7.5 inches, 16:9
  pptx.title = lessonTitle;
  pptx.author = brand?.name ?? 'Elec-Mate';

  // Master slide — sets default background + footer.
  pptx.defineSlideMaster({
    title: 'MASTER',
    background: { color: C.bg },
    objects: [
      {
        rect: {
          x: 0,
          y: 7.3,
          w: 13.333,
          h: 0.2,
          fill: { color: C.surface },
        },
      },
      {
        text: {
          text: lessonTitle,
          options: {
            x: 0.4,
            y: 7.3,
            w: 8,
            h: 0.2,
            fontFace: FONT,
            fontSize: 8,
            color: C.fgMuted,
            valign: 'middle',
          },
        },
      },
    ],
    slideNumber: {
      x: 12.5,
      y: 7.3,
      w: 0.5,
      h: 0.2,
      fontFace: FONT,
      fontSize: 8,
      color: C.fgMuted,
      align: 'right',
    },
  });

  for (let i = 0; i < deck.slides.length; i++) {
    const slide = deck.slides[i];
    const ps = pptx.addSlide({ masterName: 'MASTER' });
    renderSlide(ps, slide, C, brand);
    if (slide.speaker_notes) {
      ps.addNotes(slide.speaker_notes);
    }
  }

  await pptx.writeFile({
    fileName: `${slugify(lessonTitle)}.pptx`,
  });
}

type Pal = typeof DARK;

function renderSlide(ps: PptxGenJS.Slide, slide: Slide, C: Pal, brand: CollegeBrand | null): void {
  const eyebrow = eyebrowFor(slide);
  const eyebrowColor = colorFor(slide.kind, C);

  // Add full-bleed image background for image-led kinds with a URL.
  const isPhotoLed =
    !!slide.image_url && (slide.kind === 'image_concept' || slide.kind === 'starter');
  if (isPhotoLed && slide.image_url) {
    ps.addImage({
      path: slide.image_url,
      x: 0,
      y: 0,
      w: 13.333,
      h: 7.5,
      sizing: { type: 'cover', w: 13.333, h: 7.5 },
    });
    // Dark gradient overlay for text legibility.
    ps.addShape('rect', {
      x: 0,
      y: 3.5,
      w: 13.333,
      h: 4,
      fill: { color: '000000', transparency: 30 },
      line: { type: 'none' },
    });
  }

  // Eyebrow label top-left.
  if (eyebrow) {
    ps.addText(eyebrow.toUpperCase(), {
      x: 0.6,
      y: 0.5,
      w: 6,
      h: 0.3,
      fontFace: FONT,
      fontSize: 11,
      color: eyebrowColor,
      bold: true,
      charSpacing: 4,
    });
  }

  // Branding — logo top-right on title + summary slides if available.
  if (brand?.logo_url && (slide.kind === 'title' || slide.kind === 'summary')) {
    try {
      ps.addImage({
        path: brand.logo_url,
        x: 11.5,
        y: 0.4,
        w: 1.4,
        h: 0.6,
        sizing: { type: 'contain', w: 1.4, h: 0.6 },
      });
    } catch {
      // Logo URL may be CORS-protected; ignore.
    }
  }

  // Per-kind body.
  switch (slide.kind) {
    case 'title':
      addTextHeading(ps, slide.heading ?? '', C, { y: 2.2, fontSize: 54 });
      if (slide.subtitle) addBody(ps, slide.subtitle, C, { y: 4.5, fontSize: 22 });
      if (slide.duration_label)
        addBody(ps, slide.duration_label, C, { y: 5.6, fontSize: 16, color: C.fgMuted });
      addAccentLine(ps, C, { y: 6.2 });
      break;

    case 'pull_quote':
    case 'reg_cite':
      if (slide.reg_number) {
        ps.addText(slide.reg_number, {
          x: 0.6,
          y: 1.4,
          w: 12,
          h: 1.5,
          fontFace: FONT_HEADING,
          fontSize: 80,
          color: C.amber,
          bold: true,
        });
      }
      if (slide.clause || slide.quote) {
        ps.addText(`“${slide.clause ?? slide.quote ?? ''}”`, {
          x: 0.6,
          y: 3.0,
          w: 12,
          h: 2.5,
          fontFace: FONT,
          fontSize: 30,
          color: C.fg,
          italic: true,
        });
      }
      if (slide.attribution) {
        ps.addText(`— ${slide.attribution}`, {
          x: 0.6,
          y: 5.6,
          w: 12,
          h: 0.4,
          fontFace: FONT,
          fontSize: 14,
          color: C.fgMuted,
          charSpacing: 4,
        });
      }
      if (slide.why_it_matters) {
        ps.addText(`Why this matters: ${slide.why_it_matters}`, {
          x: 0.6,
          y: 6.2,
          w: 12,
          h: 1,
          fontFace: FONT,
          fontSize: 14,
          color: C.fg,
        });
      }
      break;

    case 'big_stat':
      if (slide.stat_value) {
        ps.addText(slide.stat_value, {
          x: 0.6,
          y: 1.4,
          w: 12,
          h: 3,
          fontFace: FONT_HEADING,
          fontSize: 180,
          color: C.cyan,
          bold: true,
        });
      }
      if (slide.stat_caption) {
        ps.addText(slide.stat_caption, {
          x: 0.6,
          y: 4.6,
          w: 12,
          h: 1.5,
          fontFace: FONT,
          fontSize: 28,
          color: C.fg,
        });
      }
      if (slide.stat_source) {
        ps.addText(`SOURCE · ${slide.stat_source}`, {
          x: 0.6,
          y: 6.4,
          w: 12,
          h: 0.4,
          fontFace: FONT,
          fontSize: 11,
          color: C.fgMuted,
          charSpacing: 4,
        });
      }
      break;

    case 'two_column':
      addTextHeading(ps, slide.heading ?? '', C);
      addColumn(ps, 'left', slide, C);
      addColumn(ps, 'right', slide, C);
      break;

    case 'objectives':
    case 'summary':
      addTextHeading(ps, slide.heading ?? '', C);
      addBullets(ps, slide.bullets ?? [], C, { y: 2.2 });
      break;

    case 'starter':
      addTextHeading(ps, slide.heading ?? '', C, { color: isPhotoLed ? C.fg : C.fg });
      if (slide.body) addBody(ps, slide.body, C, { y: 2.4, fontSize: 18 });
      if (slide.questions && slide.questions.length > 0) {
        addBullets(ps, slide.questions, C, { y: 4.4, numbered: true });
      }
      break;

    case 'concept':
    case 'image_concept':
      // If photo-led, image is full-bleed with overlay; otherwise put the
      // image in a 50/50 split to the right.
      if (slide.image_url && !isPhotoLed) {
        ps.addImage({
          path: slide.image_url,
          x: 7.0,
          y: 1.4,
          w: 5.8,
          h: 5.4,
          sizing: { type: 'cover', w: 5.8, h: 5.4 },
        });
        addTextHeading(ps, slide.heading ?? '', C, { w: 6 });
        if (slide.body) addBody(ps, slide.body, C, { y: 2.6, w: 6, fontSize: 16 });
      } else {
        addTextHeading(ps, slide.heading ?? '', C);
        if (slide.body) addBody(ps, slide.body, C, { y: 2.4, fontSize: 18 });
      }
      break;

    case 'activity': {
      addTextHeading(ps, slide.heading ?? '', C);
      if (slide.instruction) addBody(ps, slide.instruction, C, { y: 2.2, fontSize: 16 });
      if (slide.success_criteria) {
        ps.addShape('roundRect', {
          x: 0.6,
          y: 5.8,
          w: 12,
          h: 1,
          fill: { color: hexFromAlpha(C.emerald, 18, C.bg) },
          line: { color: C.emerald, width: 1 },
          rectRadius: 0.1,
        });
        ps.addText('SUCCESS LOOKS LIKE', {
          x: 0.8,
          y: 5.9,
          w: 11,
          h: 0.3,
          fontFace: FONT,
          fontSize: 10,
          bold: true,
          color: C.emerald,
          charSpacing: 4,
        });
        ps.addText(slide.success_criteria, {
          x: 0.8,
          y: 6.2,
          w: 11,
          h: 0.5,
          fontFace: FONT,
          fontSize: 14,
          color: C.fg,
        });
      }
      const meta: string[] = [];
      if (slide.time_minutes != null) meta.push(`${slide.time_minutes} min`);
      if (slide.group_size) meta.push(slide.group_size.replace(/_/g, ' '));
      if (meta.length) {
        ps.addText(meta.join(' · '), {
          x: 0.6,
          y: 6.95,
          w: 12,
          h: 0.3,
          fontFace: FONT,
          fontSize: 11,
          color: C.fgMuted,
          charSpacing: 2,
        });
      }
      break;
    }

    case 'worked_example':
      addTextHeading(ps, slide.heading ?? '', C);
      if (slide.problem) {
        ps.addText(`PROBLEM\n${slide.problem}`, {
          x: 0.6,
          y: 2.2,
          w: 12,
          h: 1.5,
          fontFace: FONT,
          fontSize: 14,
          color: C.fg,
        });
      }
      if (slide.solution_steps && slide.solution_steps.length > 0) {
        addBullets(ps, slide.solution_steps, C, { y: 4, numbered: true, fontSize: 14 });
      }
      break;

    case 'check_understanding':
      addTextHeading(ps, slide.heading ?? '', C);
      addBullets(ps, slide.questions ?? [], C, { y: 2.2, numbered: true, fontSize: 18 });
      break;

    case 'misconception':
      addTextHeading(ps, slide.heading ?? '', C);
      if (slide.belief) {
        addPanel(ps, 'COMMON BELIEF', slide.belief, C, C.rose, { x: 0.6, y: 2.4, w: 6 });
      }
      if (slide.correction) {
        addPanel(ps, 'ACTUALLY', slide.correction, C, C.emerald, { x: 6.8, y: 2.4, w: 6 });
      }
      break;

    case 'plenary':
      addTextHeading(ps, slide.heading ?? '', C);
      if (slide.body) addBody(ps, slide.body, C, { y: 2.4, fontSize: 18 });
      if (slide.exit_ticket) {
        addPanel(ps, 'EXIT TICKET', slide.exit_ticket, C, C.accent, { x: 0.6, y: 5.6, w: 12 });
      }
      break;

    case 'diagram_caption':
      addTextHeading(ps, slide.heading ?? '', C);
      addBody(
        ps,
        `[Diagram: ${slide.diagram_kind ?? 'custom'}]\n\n${slide.diagram_caption ?? ''}`,
        C,
        { y: 2.4, fontSize: 16 }
      );
      break;

    default:
      addTextHeading(ps, slide.heading ?? '', C);
      if (slide.body) addBody(ps, slide.body, C, { y: 2.4 });
  }

  // AC chip bottom-left if mapped.
  if (slide.slide_acs && slide.slide_acs.length > 0) {
    ps.addText(`Maps to · ${slide.slide_acs.join(' · ')}`, {
      x: 0.6,
      y: 6.95,
      w: 12,
      h: 0.3,
      fontFace: FONT,
      fontSize: 10,
      color: C.fgMuted,
      charSpacing: 2,
    });
  }
}

/* ──────────── helpers ──────────── */

function addTextHeading(
  ps: PptxGenJS.Slide,
  text: string,
  C: Pal,
  opts: { y?: number; w?: number; fontSize?: number; color?: string } = {}
) {
  ps.addText(text, {
    x: 0.6,
    y: opts.y ?? 1.0,
    w: opts.w ?? 12,
    h: 1.4,
    fontFace: FONT_HEADING,
    fontSize: opts.fontSize ?? 40,
    color: opts.color ?? C.fg,
    bold: true,
  });
}

function addBody(
  ps: PptxGenJS.Slide,
  text: string,
  C: Pal,
  opts: { y?: number; w?: number; fontSize?: number; color?: string } = {}
) {
  ps.addText(text, {
    x: 0.6,
    y: opts.y ?? 2.2,
    w: opts.w ?? 12,
    h: 4,
    fontFace: FONT,
    fontSize: opts.fontSize ?? 16,
    color: opts.color ?? C.fg,
  });
}

function addBullets(
  ps: PptxGenJS.Slide,
  items: string[],
  C: Pal,
  opts: { y?: number; w?: number; numbered?: boolean; fontSize?: number } = {}
) {
  if (items.length === 0) return;
  ps.addText(
    items.map((t) => ({ text: t, options: { bullet: opts.numbered ? { type: 'number' } : true } })),
    {
      x: 0.6,
      y: opts.y ?? 2.2,
      w: opts.w ?? 12,
      h: 4.5,
      fontFace: FONT,
      fontSize: opts.fontSize ?? 18,
      color: C.fg,
      paraSpaceAfter: 6,
    }
  );
}

function addAccentLine(ps: PptxGenJS.Slide, C: Pal, opts: { y: number }) {
  ps.addShape('rect', {
    x: 0.6,
    y: opts.y,
    w: 1.2,
    h: 0.05,
    fill: { color: C.accent },
    line: { type: 'none' },
  });
}

function addPanel(
  ps: PptxGenJS.Slide,
  label: string,
  body: string,
  C: Pal,
  accent: string,
  pos: { x: number; y: number; w: number; h?: number }
) {
  const h = pos.h ?? 1.5;
  ps.addShape('roundRect', {
    x: pos.x,
    y: pos.y,
    w: pos.w,
    h,
    fill: { color: hexFromAlpha(accent, 14, C.bg) },
    line: { color: accent, width: 1 },
    rectRadius: 0.1,
  });
  ps.addText(label, {
    x: pos.x + 0.2,
    y: pos.y + 0.15,
    w: pos.w - 0.4,
    h: 0.3,
    fontFace: FONT,
    fontSize: 10,
    bold: true,
    color: accent,
    charSpacing: 4,
  });
  ps.addText(body, {
    x: pos.x + 0.2,
    y: pos.y + 0.45,
    w: pos.w - 0.4,
    h: h - 0.55,
    fontFace: FONT,
    fontSize: 14,
    color: C.fg,
  });
}

function addColumn(ps: PptxGenJS.Slide, side: 'left' | 'right', slide: Slide, C: Pal) {
  const x = side === 'left' ? 0.6 : 6.8;
  const heading = side === 'left' ? slide.left_heading : slide.right_heading;
  const accent = side === 'left' ? C.purple : C.emerald;
  const body = side === 'left' ? slide.left_body : slide.right_body;
  const bullets = side === 'left' ? slide.left_bullets : slide.right_bullets;
  ps.addShape('roundRect', {
    x,
    y: 2.4,
    w: 6,
    h: 4.4,
    fill: { color: hexFromAlpha(accent, 8, C.bg) },
    line: { color: C.border, width: 1 },
    rectRadius: 0.1,
  });
  if (heading) {
    ps.addText(heading.toUpperCase(), {
      x: x + 0.2,
      y: 2.55,
      w: 5.6,
      h: 0.3,
      fontFace: FONT,
      fontSize: 11,
      bold: true,
      color: accent,
      charSpacing: 4,
    });
  }
  if (body) {
    ps.addText(body, {
      x: x + 0.2,
      y: 2.95,
      w: 5.6,
      h: 1.5,
      fontFace: FONT,
      fontSize: 14,
      color: C.fg,
    });
  }
  if (bullets && bullets.length > 0) {
    ps.addText(
      bullets.map((t) => ({ text: t, options: { bullet: true } })),
      {
        x: x + 0.2,
        y: body ? 4.5 : 2.95,
        w: 5.6,
        h: body ? 2.2 : 3.5,
        fontFace: FONT,
        fontSize: 13,
        color: C.fg,
        paraSpaceAfter: 4,
      }
    );
  }
}

function eyebrowFor(slide: Slide): string {
  switch (slide.kind) {
    case 'title':
      return 'Title';
    case 'starter':
      return 'Starter';
    case 'objectives':
      return 'Objectives';
    case 'concept':
      return 'Concept';
    case 'reg_cite':
      return 'Regulation';
    case 'pull_quote':
      return 'Pull quote';
    case 'big_stat':
      return 'Stat';
    case 'two_column':
      return 'Compare';
    case 'image_concept':
      return 'Concept';
    case 'diagram_caption':
      return 'Diagram';
    case 'activity':
      return 'Activity';
    case 'worked_example':
      return 'Worked example';
    case 'check_understanding':
      return 'Check for understanding';
    case 'misconception':
      return 'Misconception';
    case 'summary':
      return 'Summary';
    case 'plenary':
      return 'Plenary';
    default:
      return '';
  }
}

function colorFor(kind: Slide['kind'], C: Pal): string {
  switch (kind) {
    case 'reg_cite':
    case 'pull_quote':
    case 'plenary':
    case 'title':
    case 'summary':
      return C.accent;
    case 'big_stat':
      return C.cyan;
    case 'activity':
    case 'image_concept':
      return C.emerald;
    case 'misconception':
      return C.rose;
    case 'starter':
    case 'worked_example':
    case 'diagram_caption':
      return C.blue;
    case 'objectives':
    case 'check_understanding':
    case 'two_column':
      return C.purple;
    default:
      return C.fgMuted;
  }
}

/** Approximate alpha-on-bg blend by interpolating each channel. PowerPoint
    fills don't honour transparency on dark BGs the way the web does, so we
    pre-mix the colour. alphaPct is 0–100. */
function hexFromAlpha(fg: string, alphaPct: number, bg: string): string {
  const a = Math.max(0, Math.min(100, alphaPct)) / 100;
  const fr = parseInt(fg.slice(0, 2), 16);
  const fG = parseInt(fg.slice(2, 4), 16);
  const fb = parseInt(fg.slice(4, 6), 16);
  const br = parseInt(bg.slice(0, 2), 16);
  const bG = parseInt(bg.slice(2, 4), 16);
  const bb = parseInt(bg.slice(4, 6), 16);
  const r = Math.round(fr * a + br * (1 - a));
  const g = Math.round(fG * a + bG * (1 - a));
  const b = Math.round(fb * a + bb * (1 - a));
  return `${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`.toUpperCase();
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
