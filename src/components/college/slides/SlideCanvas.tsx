import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import type { Slide, DeckTheme } from '@/hooks/useSlideDeck';
import { cn } from '@/lib/utils';
import {
  KIND_LABEL,
  normaliseSlide,
  parseOptions,
  photoAlt,
  sourceLine,
  splitQuestionTag,
  isReference,
  wantsPhoto,
  type DeckSlide,
} from './slideContent';
import { diagramDataUri } from './slideDiagrams';

/* ==========================================================================
   SlideCanvas — one slide, drawn the same everywhere: the overview grid, the
   editor preview, and the projector.

   The slide is laid out on a fixed 1600 x 900 stage and scaled to fit its
   box, so a thumbnail is an exact miniature of what the class will see.
   Type scale on the stage (900 tall, so 40px is about 24pt on a 16:9
   slide): heading 64, body 40, secondary 32, labels 24. Nothing on-slide
   is smaller than 22. Safe margins are 80px left and right.

   Auto-fit: when the text is longer than the space, the body steps down in
   size (to 75% at most). If it still does not fit, `onOverflow(true)` tells
   the editor, which offers "Make it shorter" rather than shrinking further
   into something nobody at the back can read.
   ========================================================================== */

export const STAGE_W = 1600;
export const STAGE_H = 900;
const FIT_STEPS = [1, 0.92, 0.85, 0.8, 0.75];

interface Palette {
  bg: string;
  fg: string;
  /** Accent for text. */
  accent: string;
  /** Accent for solid fills (with `onAccent` text). */
  accentFill: string;
  onAccent: string;
  rule: string;
  panel: string;
}

const DARK: Palette = {
  bg: '#0d0d0e',
  fg: '#ffffff',
  accent: '#FACC15',
  accentFill: '#FACC15',
  onAccent: '#0d0d0e',
  rule: 'rgba(255,255,255,0.22)',
  panel: 'rgba(255,255,255,0.05)',
};

const LIGHT: Palette = {
  bg: '#ffffff',
  fg: '#141414',
  // Yellow text on white fails contrast; a deep amber reads from the back.
  accent: '#92400E',
  accentFill: '#FACC15',
  onAccent: '#141414',
  rule: 'rgba(0,0,0,0.18)',
  panel: 'rgba(0,0,0,0.035)',
};

export function slidePalette(theme: DeckTheme | undefined): Palette {
  return theme === 'light' ? LIGHT : DARK;
}

export type ImageState = 'generating' | 'ready' | 'failed' | null;

export interface SlideCanvasProps {
  slide: Slide;
  index: number;
  total: number;
  lessonTitle?: string;
  collegeName?: string | null;
  theme?: DeckTheme;
  imageStatus?: ImageState;
  /** Editor surfaces show where a photo is coming; the projector never does. */
  showPlaceholders?: boolean;
  /** Seconds left on the activity timer, when it has been started. */
  timerSeconds?: number | null;
  timerRunning?: boolean;
  onOverflow?: (overflowing: boolean) => void;
  className?: string;
  /** Fit inside the box (letterbox) rather than fill its width. */
  contain?: boolean;
}

export function SlideCanvas(props: SlideCanvasProps) {
  const { className, contain } = props;
  const boxRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<{ w: number; h: number }>({ w: 0, h: 0 });

  useLayoutEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const measure = () => setBox({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scale = contain ? Math.min(box.w / STAGE_W, box.h / STAGE_H) || 0 : box.w / STAGE_W || 0;
  const w = STAGE_W * scale;
  const h = STAGE_H * scale;

  return (
    <div
      ref={boxRef}
      className={cn(
        'relative overflow-hidden',
        contain ? 'h-full w-full' : 'aspect-video w-full',
        className
      )}
    >
      {scale > 0 && (
        <div
          className="absolute"
          style={{
            width: w,
            height: h,
            left: contain ? (box.w - w) / 2 : 0,
            top: contain ? (box.h - h) / 2 : 0,
          }}
        >
          <div
            style={{
              width: STAGE_W,
              height: STAGE_H,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
          >
            <Stage {...props} />
          </div>
        </div>
      )}
    </div>
  );
}

/* ───────────────── the 1600 x 900 stage ───────────────── */

function Stage({
  slide: raw,
  index,
  total,
  lessonTitle,
  collegeName,
  theme,
  imageStatus = null,
  showPlaceholders = false,
  timerSeconds = null,
  timerRunning = false,
  onOverflow,
}: SlideCanvasProps) {
  const slide = useMemo(() => normaliseSlide(raw), [raw]);
  const P = slidePalette(theme);
  const [fitIdx, setFitIdx] = useState(0);
  const bodyRef = useRef<HTMLDivElement>(null);
  const fit = FIT_STEPS[fitIdx];
  const contentKey = JSON.stringify(raw) + (timerSeconds == null ? '' : 't');

  const lastKey = useRef(contentKey);
  const reported = useRef<boolean | null>(null);
  const onOverflowRef = useRef(onOverflow);
  onOverflowRef.current = onOverflow;

  const [imgFailed, setImgFailed] = useState(false);
  useEffect(() => setImgFailed(false), [raw.image_url]);

  useLayoutEffect(() => {
    // Start from full size whenever the content changes.
    if (lastKey.current !== contentKey) {
      lastKey.current = contentKey;
      if (fitIdx !== 0) {
        setFitIdx(0);
        return;
      }
    }
    const el = bodyRef.current;
    if (!el) return;
    const over = el.scrollHeight > el.clientHeight + 2 || el.scrollWidth > el.clientWidth + 2;
    if (over && fitIdx < FIT_STEPS.length - 1) {
      setFitIdx((i) => i + 1);
      return;
    }
    // Report only a change: the parent re-renders every slide on a report.
    if (reported.current !== over) {
      reported.current = over;
      onOverflowRef.current?.(over);
    }
  }, [contentKey, fitIdx]);

  const photoUrl = !imgFailed ? slide.image_url : undefined;
  const photoWanted = wantsPhoto(slide);
  const showPhoto = photoWanted && (!!photoUrl || showPlaceholders);
  const fullBleed = slide.kind === 'title' && !!photoUrl;
  const split = showPhoto && !fullBleed && slide.kind !== 'title';

  // A full-bleed photo is always under a dark scrim, so its text is white.
  const C: Palette = fullBleed ? DARK : P;
  const px = (n: number) => `${Math.round(n * fit)}px`;

  const label = slide.kind === 'title' ? collegeName || KIND_LABEL.title : KIND_LABEL[slide.kind];
  const acs = slide.slide_acs ?? [];

  return (
    <div
      className="relative flex h-full w-full overflow-hidden"
      style={{ background: C.bg, color: C.fg, fontFamily: 'Inter, "Segoe UI", Arial, sans-serif' }}
    >
      {fullBleed && photoUrl && (
        <>
          <img
            src={photoUrl}
            alt={photoAlt(slide)}
            onError={() => setImgFailed(true)}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.7) 55%, rgba(0,0,0,0.35) 100%)',
            }}
          />
        </>
      )}

      <div
        className="relative flex min-w-0 flex-col"
        style={{ width: split ? '56%' : '100%', padding: '64px 80px 0 80px' }}
      >
        <div
          style={{
            color: C.accent,
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}
        >
          {label}
        </div>
        <h2
          style={{
            marginTop: 14,
            fontSize: slide.kind === 'title' ? 84 : 64,
            fontWeight: 700,
            lineHeight: 1.06,
            letterSpacing: '-0.015em',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {slide.heading || 'Untitled slide'}
        </h2>

        <div
          ref={bodyRef}
          className="relative min-h-0 flex-1 overflow-hidden"
          style={{ marginTop: 36 }}
        >
          <Body
            slide={slide}
            C={C}
            px={px}
            timerSeconds={timerSeconds}
            timerRunning={timerRunning}
          />
        </div>

        <Footer C={C} lessonTitle={lessonTitle} acs={acs} index={index} total={total} />
      </div>

      {split && (
        <div className="relative h-full" style={{ width: '44%' }}>
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={photoAlt(slide)}
              onError={() => setImgFailed(true)}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-16 text-center"
              style={{ background: C.panel, borderLeft: `2px solid ${C.rule}` }}
            >
              <div style={{ fontSize: 30, fontWeight: 600 }}>
                {imageStatus === 'failed' || imgFailed
                  ? 'The photo could not be made'
                  : imageStatus === 'generating'
                    ? 'Making the photo'
                    : 'Photo to come'}
              </div>
              <div style={{ fontSize: 22, lineHeight: 1.4 }}>
                {imageStatus === 'failed' || imgFailed
                  ? 'Try again from the slide editor. When presenting, this slide shows without a photo.'
                  : 'When presenting, the slide shows without a photo until it is ready.'}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Footer({
  C,
  lessonTitle,
  acs,
  index,
  total,
}: {
  C: Palette;
  lessonTitle?: string;
  acs: string[];
  index: number;
  total: number;
}) {
  return (
    <div
      className="flex shrink-0 items-center gap-6"
      style={{ height: 72, borderTop: `1px solid ${C.rule}`, marginTop: 24, fontSize: 22 }}
    >
      <span className="min-w-0 flex-1 truncate">{lessonTitle ?? ''}</span>
      {acs.length > 0 && (
        <span className="shrink-0 truncate" style={{ maxWidth: 520 }}>
          Maps to {acs.join(', ')}
        </span>
      )}
      <span className="shrink-0 tabular-nums" style={{ fontWeight: 600 }}>
        {index + 1} / {total}
      </span>
    </div>
  );
}

/* ───────────────── kind templates ───────────────── */

interface BodyProps {
  slide: DeckSlide;
  C: Palette;
  px: (n: number) => string;
  timerSeconds: number | null;
  timerRunning: boolean;
}

function Label({
  C,
  children,
  accent = true,
}: {
  C: Palette;
  children: ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      style={{
        color: accent ? C.accent : C.fg,
        fontSize: 24,
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
      }}
    >
      {children}
    </div>
  );
}

function Panel({ C, children, style }: { C: Palette; children: ReactNode; style?: CSSProperties }) {
  return (
    <div
      style={{
        border: `2px solid ${C.rule}`,
        background: C.panel,
        borderRadius: 20,
        padding: '24px 30px',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function NumberBadge({ C, n, px }: { C: Palette; n: string | number; px: (n: number) => string }) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center tabular-nums"
      style={{
        width: px(52),
        height: px(52),
        borderRadius: 999,
        background: C.accentFill,
        color: C.onAccent,
        fontSize: px(26),
        fontWeight: 700,
        marginTop: px(2),
      }}
    >
      {n}
    </span>
  );
}

function List({
  items,
  C,
  px,
  size = 40,
  numbered = false,
  tags = false,
}: {
  items: string[];
  C: Palette;
  px: (n: number) => string;
  size?: number;
  numbered?: boolean;
  tags?: boolean;
}) {
  return (
    <ol style={{ display: 'flex', flexDirection: 'column', gap: px(size * 0.55) }}>
      {items.map((raw, i) => {
        const { tag, text } = tags ? splitQuestionTag(raw) : { tag: null, text: raw };
        return (
          <li key={i} className="flex items-start" style={{ gap: px(24) }}>
            {numbered ? (
              <NumberBadge C={C} n={i + 1} px={px} />
            ) : (
              <span
                aria-hidden
                className="shrink-0"
                style={{
                  width: px(14),
                  height: px(14),
                  borderRadius: 4,
                  background: C.accentFill,
                  marginTop: px(size * 0.5),
                }}
              />
            )}
            <span style={{ fontSize: px(size), lineHeight: 1.3 }}>
              {tag && (
                <span style={{ color: C.accent, fontWeight: 700, marginRight: px(12) }}>{tag}</span>
              )}
              {text}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function Para({
  text,
  px,
  size = 40,
  style,
}: {
  text?: string;
  px: (n: number) => string;
  size?: number;
  style?: CSSProperties;
}) {
  if (!text) return null;
  return (
    <p className="whitespace-pre-line" style={{ fontSize: px(size), lineHeight: 1.35, ...style }}>
      {text}
    </p>
  );
}

function formatClock(sec: number): string {
  const s = Math.max(0, Math.round(sec));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

const GROUP_LABEL: Record<string, string> = {
  individual: 'On your own',
  pairs: 'In pairs',
  small_group: 'Small groups',
  whole_class: 'Whole class',
};

function Body({ slide, C, px, timerSeconds, timerRunning }: BodyProps) {
  switch (slide.kind) {
    case 'title':
      return (
        <div className="flex h-full flex-col" style={{ gap: px(28) }}>
          <Para text={slide.subtitle} px={px} size={42} style={{ maxWidth: 1200 }} />
          <Para text={slide.body} px={px} size={32} style={{ maxWidth: 1200 }} />
          {slide.duration_label && (
            <div style={{ marginTop: 'auto', fontSize: px(30), fontWeight: 600, color: C.accent }}>
              {slide.duration_label}
            </div>
          )}
        </div>
      );

    case 'objectives':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: px(24) }}>
          <Para text={slide.body} px={px} size={32} />
          <List items={slide.bullets ?? []} C={C} px={px} numbered />
        </div>
      );

    case 'summary':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: px(24) }}>
          <Para text={slide.body} px={px} size={32} />
          <List items={slide.bullets ?? []} C={C} px={px} />
        </div>
      );

    case 'starter':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: px(30) }}>
          <Para text={slide.body} px={px} size={38} />
          {(slide.questions ?? []).length > 0 && (
            <List items={slide.questions ?? []} C={C} px={px} size={34} numbered tags />
          )}
        </div>
      );

    case 'concept':
    case 'image_concept':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: px(30) }}>
          <Para text={slide.body} px={px} size={38} />
          {(slide.bullets ?? []).length > 0 && (
            <List items={slide.bullets ?? []} C={C} px={px} size={36} />
          )}
          {(slide.key_terms ?? []).length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: px(16) }}>
              {(slide.key_terms ?? []).map((t, i) => (
                <div key={i} style={{ fontSize: px(30), lineHeight: 1.35 }}>
                  <span style={{ color: C.accent, fontWeight: 700 }}>{t.term}</span>
                  {t.definition ? <span>{`: ${t.definition}`}</span> : null}
                </div>
              ))}
            </div>
          )}
        </div>
      );

    case 'reg_cite':
    case 'pull_quote': {
      const src = sourceLine(slide);
      const ref = isReference(slide.reg_number) ? slide.reg_number : null;
      const text = slide.clause || slide.quote || slide.body;
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: px(28) }}>
          {ref && (
            <div
              className="tabular-nums"
              style={{
                color: C.accent,
                fontSize: px(84),
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: '-0.01em',
              }}
            >
              {ref}
            </div>
          )}
          <Para text={text} px={px} size={42} style={{ fontWeight: 500, maxWidth: 1350 }} />
          {src && <div style={{ fontSize: px(26), fontWeight: 600 }}>Paraphrased from {src}</div>}
          {slide.why_it_matters && (
            <div style={{ borderTop: `2px solid ${C.rule}`, paddingTop: px(22) }}>
              <Label C={C}>Why it matters on site</Label>
              <Para text={slide.why_it_matters} px={px} size={32} style={{ marginTop: px(10) }} />
            </div>
          )}
        </div>
      );
    }

    case 'big_stat':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: px(22) }}>
          <div
            className="tabular-nums"
            style={{
              color: C.accent,
              fontSize: px(180),
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
            }}
          >
            {slide.stat_value}
          </div>
          <Para text={slide.stat_caption} px={px} size={44} style={{ maxWidth: 1300 }} />
          <Para text={slide.body} px={px} size={32} style={{ maxWidth: 1300 }} />
          {slide.stat_source && (
            <div style={{ fontSize: px(24), fontWeight: 600 }}>Source: {slide.stat_source}</div>
          )}
        </div>
      );

    case 'two_column':
      return (
        <div className="grid h-full grid-cols-2 items-start" style={{ gap: px(32) }}>
          {(['left', 'right'] as const).map((side) => {
            const heading = side === 'left' ? slide.left_heading : slide.right_heading;
            const body = side === 'left' ? slide.left_body : slide.right_body;
            const bullets = (side === 'left' ? slide.left_bullets : slide.right_bullets) ?? [];
            return (
              <Panel key={side} C={C}>
                {heading && <Label C={C}>{heading}</Label>}
                {bullets.length > 0 ? (
                  <div style={{ marginTop: px(18) }}>
                    <List items={bullets} C={C} px={px} size={32} />
                  </div>
                ) : (
                  <Para text={body} px={px} size={32} style={{ marginTop: px(14) }} />
                )}
              </Panel>
            );
          })}
        </div>
      );

    case 'diagram_caption': {
      const uri = diagramDataUri(slide.diagram_kind ?? null, {
        fg: C.fg,
        accent: C.accent,
        line: C.fg,
      });
      if (!uri) {
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: px(24) }}>
            <Para text={slide.diagram_caption} px={px} size={40} />
            <Para text={slide.body} px={px} size={34} />
          </div>
        );
      }
      return (
        <div
          className="grid h-full items-start"
          style={{ gridTemplateColumns: '1.45fr 1fr', gap: px(40) }}
        >
          <img
            src={uri}
            alt={slide.diagram_caption || 'Diagram'}
            style={{ width: '100%', height: 'auto', aspectRatio: '2 / 1' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: px(20) }}>
            <Para text={slide.diagram_caption} px={px} size={32} />
            <Para text={slide.body} px={px} size={30} />
          </div>
        </div>
      );
    }

    case 'activity': {
      const mins = slide.time_minutes ?? null;
      const showTimer = timerSeconds != null;
      return (
        <div
          className="grid h-full items-start"
          style={{ gridTemplateColumns: '1fr 360px', gap: px(44) }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: px(26) }}>
            <Para text={slide.instruction || slide.body} px={px} size={36} />
            {slide.success_criteria && (
              <Panel C={C}>
                <Label C={C}>Success looks like</Label>
                <Para
                  text={slide.success_criteria}
                  px={px}
                  size={30}
                  style={{ marginTop: px(10) }}
                />
              </Panel>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {slide.group_size && (
              <Panel C={C} style={{ padding: '20px 26px' }}>
                <Label C={C}>Work</Label>
                <div style={{ marginTop: 8, fontSize: 34, fontWeight: 600 }}>
                  {GROUP_LABEL[slide.group_size] ?? slide.group_size.replace(/_/g, ' ')}
                </div>
              </Panel>
            )}
            {(mins != null || showTimer) && (
              <Panel C={C} style={{ padding: '20px 26px' }}>
                <Label C={C}>{showTimer ? (timerRunning ? 'Time left' : 'Paused') : 'Time'}</Label>
                <div
                  className="tabular-nums"
                  style={{
                    marginTop: 4,
                    fontSize: showTimer ? 96 : 64,
                    fontWeight: 700,
                    lineHeight: 1.05,
                    color: showTimer && (timerSeconds ?? 0) <= 60 ? C.accent : C.fg,
                  }}
                >
                  {showTimer ? formatClock(timerSeconds ?? 0) : `${mins} min`}
                </div>
              </Panel>
            )}
          </div>
        </div>
      );
    }

    case 'worked_example':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: px(24) }}>
          {slide.problem && (
            <Panel C={C}>
              <Label C={C}>Problem</Label>
              <Para text={slide.problem} px={px} size={32} style={{ marginTop: px(10) }} />
            </Panel>
          )}
          <List items={slide.solution_steps ?? []} C={C} px={px} size={32} numbered />
        </div>
      );

    case 'check_understanding':
      return <List items={slide.questions ?? []} C={C} px={px} size={38} numbered tags />;

    case 'misconception':
      return (
        <div className="grid h-full grid-cols-2 items-start" style={{ gap: px(32) }}>
          <Panel C={C}>
            <Label C={C} accent={false}>
              Common belief
            </Label>
            <Para text={slide.belief} px={px} size={36} style={{ marginTop: px(14) }} />
          </Panel>
          <Panel C={C}>
            <Label C={C}>Actually</Label>
            <Para text={slide.correction} px={px} size={32} style={{ marginTop: px(14) }} />
          </Panel>
        </div>
      );

    case 'plenary': {
      const parsed = slide.body ? parseOptions(slide.body) : null;
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: px(26) }}>
          {parsed ? (
            <>
              <Para text={parsed.stem} px={px} size={38} />
              <div className="grid grid-cols-2" style={{ gap: px(18) }}>
                {parsed.options.map((o, i) => (
                  <div key={i} className="flex items-start" style={{ gap: px(18) }}>
                    <NumberBadge C={C} n={String.fromCharCode(65 + i)} px={px} />
                    <span style={{ fontSize: px(32), lineHeight: 1.3 }}>{o}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <Para text={slide.body} px={px} size={38} />
          )}
          {slide.exit_ticket && (
            <Panel C={C}>
              <Label C={C}>Exit ticket</Label>
              <Para text={slide.exit_ticket} px={px} size={32} style={{ marginTop: px(10) }} />
            </Panel>
          )}
        </div>
      );
    }

    default:
      return <Para text={slide.body} px={px} size={38} />;
  }
}
