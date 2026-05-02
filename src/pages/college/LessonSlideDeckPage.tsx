import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PageFrame } from '@/components/college/primitives';
import {
  useSlideDeck,
  type Slide,
  type SlideKind,
  type DiagramKind,
  type DeckPreflight,
  type DeckTheme,
} from '@/hooks/useSlideDeck';
import { SlideEditorSheet } from '@/components/college/sheets/SlideEditorSheet';
import { SlideDeckPreflightDialog } from '@/components/college/dialogs/SlideDeckPreflightDialog';
import { exportSlideDeckToPptx } from '@/lib/exportSlideDeckToPptx';
import { cn } from '@/lib/utils';

/* ==========================================================================
   LessonSlideDeckPage — /college/lessons/:id/slides

   Tutor-ready slide deck companion to a lesson plan. AI-generated, edited
   inline, deliverable in presenter mode. The Smartscreen killer.

   v2 — visual overhaul + gpt-image-1 photographs:
     - Bigger, more confident typography
     - Per-kind gradient backgrounds + accent rules
     - Rich layouts: pull-quote, big-stat, two-column, image-concept,
       diagram-caption (SVG), starter, plenary
     - Async per-slide gpt-image-1 photo generation streams in over
       ~60-120s while the deck text appears immediately

   ELE-942 / [F1.2].
   ========================================================================== */

type Mode = 'viewer' | 'single' | 'presenter';

const KIND_EYEBROW: Record<SlideKind, string> = {
  title: 'Title',
  starter: 'Starter',
  objectives: 'Objectives',
  concept: 'Concept',
  reg_cite: 'Regulation',
  pull_quote: 'Pull quote',
  big_stat: 'Stat',
  two_column: 'Compare',
  image_concept: 'Concept',
  diagram_caption: 'Diagram',
  activity: 'Activity',
  worked_example: 'Worked example',
  check_understanding: 'Check for understanding',
  misconception: 'Misconception',
  summary: 'Summary',
  plenary: 'Plenary',
};

const KIND_PILL: Record<SlideKind, string> = {
  title: 'border-elec-yellow/30 bg-elec-yellow/[0.08] text-elec-yellow',
  starter: 'border-blue-500/30 bg-blue-500/[0.08] text-blue-300',
  objectives: 'border-purple-500/30 bg-purple-500/[0.08] text-purple-300',
  concept: 'border-white/[0.16] bg-white/[0.04] text-white',
  reg_cite: 'border-amber-500/30 bg-amber-500/[0.08] text-amber-300',
  pull_quote: 'border-amber-500/30 bg-amber-500/[0.08] text-amber-300',
  big_stat: 'border-cyan-500/30 bg-cyan-500/[0.08] text-cyan-300',
  two_column: 'border-purple-500/30 bg-purple-500/[0.08] text-purple-300',
  image_concept: 'border-emerald-500/30 bg-emerald-500/[0.08] text-emerald-300',
  diagram_caption: 'border-blue-500/30 bg-blue-500/[0.08] text-blue-300',
  activity: 'border-emerald-500/30 bg-emerald-500/[0.08] text-emerald-300',
  worked_example: 'border-blue-500/30 bg-blue-500/[0.08] text-blue-300',
  check_understanding: 'border-purple-500/30 bg-purple-500/[0.08] text-purple-300',
  misconception: 'border-rose-500/30 bg-rose-500/[0.08] text-rose-300',
  summary: 'border-elec-yellow/30 bg-elec-yellow/[0.08] text-elec-yellow',
  plenary: 'border-blue-500/30 bg-blue-500/[0.08] text-blue-300',
};

/** Subtle gradient backdrop per kind — keeps the cards feeling tailored
    rather than identical. Applied as a layered radial-gradient overlay. */
const KIND_BACKDROP: Record<SlideKind, string> = {
  title: 'bg-[radial-gradient(ellipse_at_top_left,rgba(250,204,21,0.08),transparent_60%)]',
  starter: 'bg-[radial-gradient(ellipse_at_top_right,rgba(96,165,250,0.10),transparent_60%)]',
  objectives: 'bg-[radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.10),transparent_55%)]',
  concept: '',
  reg_cite: 'bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.08),transparent_55%)]',
  pull_quote: 'bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.10),transparent_60%)]',
  big_stat: 'bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.10),transparent_55%)]',
  two_column: 'bg-[radial-gradient(ellipse_at_bottom,rgba(168,85,247,0.08),transparent_55%)]',
  image_concept: '',
  diagram_caption: '',
  activity: 'bg-[radial-gradient(ellipse_at_top_right,rgba(52,211,153,0.10),transparent_60%)]',
  worked_example: 'bg-[radial-gradient(ellipse_at_top_left,rgba(96,165,250,0.10),transparent_55%)]',
  check_understanding:
    'bg-[radial-gradient(ellipse_at_bottom_left,rgba(168,85,247,0.08),transparent_55%)]',
  misconception: 'bg-[radial-gradient(ellipse_at_top,rgba(244,63,94,0.08),transparent_55%)]',
  summary: 'bg-[radial-gradient(ellipse_at_bottom_right,rgba(250,204,21,0.10),transparent_55%)]',
  plenary: 'bg-[radial-gradient(ellipse_at_top,rgba(96,165,250,0.10),transparent_55%)]',
};

export default function LessonSlideDeckPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    plan,
    brand,
    deck,
    loading,
    generating,
    regeneratingIndex,
    error,
    generate,
    generatedAt,
    updateSlide,
    regenerateSlide,
    reorderSlides,
    duplicateSlide,
    deleteSlide,
    setTheme,
    generateMissingImages,
    imageStatus,
  } = useSlideDeck(id ?? null);
  const [mode, setMode] = useState<Mode>('viewer');
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [quality, setQuality] = useState<'low' | 'medium' | 'high'>('medium');
  const [preflightOpen, setPreflightOpen] = useState(false);
  const [editorIndex, setEditorIndex] = useState<number | null>(null);
  const [exportingPptx, setExportingPptx] = useState(false);

  const theme: DeckTheme = deck?.theme ?? 'dark';

  const slides = useMemo(() => deck?.slides ?? [], [deck]);
  const focused = slides[focusedIndex];

  const totalActivityMins = useMemo(
    () =>
      slides
        .filter((s) => s.kind === 'activity')
        .reduce((sum, s) => sum + (s.time_minutes ?? 0), 0),
    [slides]
  );

  const pendingImages = useMemo(
    () => slides.filter((s) => !!s.image_prompt && !s.image_url).length,
    [slides]
  );
  const generatingImagesNow = useMemo(
    () => Object.values(imageStatus).filter((v) => v === 'generating').length,
    [imageStatus]
  );

  // Auto-fire image generation when prompts appear that we haven't seen.
  // Tracks the prompt string we've already fired for at each index — if the
  // tutor regenerates a slide and the prompt changes, we re-fire.
  const firedPromptsRef = useRef<Map<number, string>>(new Map());
  useEffect(() => {
    if (!slides.length) return;
    let any = false;
    slides.forEach((s, i) => {
      if (!s.image_prompt) return;
      if (s.image_url) return;
      if (firedPromptsRef.current.get(i) === s.image_prompt) return;
      firedPromptsRef.current.set(i, s.image_prompt);
      any = true;
    });
    if (any) {
      void generateMissingImages(quality);
    }
  }, [slides, generateMissingImages, quality]);

  // When a fresh deck is generated, clear the fired-prompts tracker.
  useEffect(() => {
    if (generating) {
      firedPromptsRef.current = new Map();
    }
  }, [generating]);

  // Arrow-key navigation in single + presenter modes.
  useEffect(() => {
    if (mode === 'viewer') return;
    const onKey = (e: KeyboardEvent) => {
      if (!slides.length) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        setFocusedIndex((i) => Math.min(slides.length - 1, i + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        setFocusedIndex((i) => Math.max(0, i - 1));
      } else if (e.key === 'Escape') {
        setMode('viewer');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mode, slides.length]);

  const handleGenerateConfirmed = useCallback(
    async (preflight: DeckPreflight) => {
      // Reset the per-prompt fired tracker so the new deck's image
      // prompts get processed even if a slide at index N already had a
      // photo from a prior deck.
      firedPromptsRef.current = new Map();
      await generate(preflight);
    },
    [generate]
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const slideIds = useMemo(() => slides.map((_, i) => `slide-${i}`), [slides]);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;
      const from = slideIds.indexOf(String(active.id));
      const to = slideIds.indexOf(String(over.id));
      if (from === -1 || to === -1) return;
      void reorderSlides(from, to);
    },
    [slideIds, reorderSlides]
  );

  const handleExportPptx = useCallback(async () => {
    if (!deck || !plan) return;
    setExportingPptx(true);
    try {
      await exportSlideDeckToPptx({
        deck,
        lessonTitle: plan.title,
        brand,
        theme,
      });
    } finally {
      setExportingPptx(false);
    }
  }, [deck, plan, brand, theme]);

  if (mode === 'presenter' && focused) {
    return (
      <PresenterMode
        slide={focused}
        slideStatus={imageStatus[focusedIndex] ?? null}
        index={focusedIndex}
        total={slides.length}
        onExit={() => setMode('viewer')}
        onPrev={() => setFocusedIndex((i) => Math.max(0, i - 1))}
        onNext={() => setFocusedIndex((i) => Math.min(slides.length - 1, i + 1))}
      />
    );
  }

  return (
    <PageFrame>
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-5 sm:py-7">
        <button
          type="button"
          onClick={() => {
            // Use browser back so we don't push another history entry —
            // otherwise plan ↔ slides causes an infinite back-button loop.
            // If the user landed directly via deep-link (no prior history),
            // fall back to the lesson plan URL.
            if (window.history.length > 1) navigate(-1);
            else navigate(`/college/lessons/${id}`);
          }}
          className="text-[11px] font-medium text-white hover:text-elec-yellow transition-colors touch-manipulation"
        >
          ← Back to lesson plan
        </button>
        <div className="mt-3 flex items-end justify-between gap-4 flex-wrap">
          <div className="min-w-0">
            <div className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-elec-yellow">
              Slide deck
            </div>
            <h1 className="mt-1 text-[26px] sm:text-[34px] font-semibold tracking-tight text-white leading-[1.05]">
              {plan?.title ?? 'Lesson'}
            </h1>
            {plan && (
              <p className="mt-1 text-[12.5px] text-white">
                {plan.duration_minutes ?? 90} min lesson · {slides.length} slide
                {slides.length === 1 ? '' : 's'}
                {totalActivityMins > 0 && ` · ${totalActivityMins} min of activity`}
                {generatedAt && ` · generated ${formatGenAt(generatedAt)}`}
              </p>
            )}
            {(generatingImagesNow > 0 || pendingImages > 0) && (
              <div className="mt-2 inline-flex items-center gap-2 text-[11px] text-white">
                <span className="relative inline-flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-elec-yellow opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-elec-yellow" />
                </span>
                <span>
                  {generatingImagesNow > 0
                    ? `Generating photo ${slides.length - pendingImages + 1}/${slides.length}…`
                    : `${pendingImages} photos queued`}
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            {slides.length > 0 && (
              <>
                {/* Theme toggle — visible from sm+, hidden on tiny phones to save row space */}
                <div className="hidden sm:inline-flex h-10 rounded-lg border border-white/[0.10] overflow-hidden">
                  <button
                    type="button"
                    onClick={() => void setTheme('dark')}
                    className={cn(
                      'px-3 text-[11.5px] font-medium touch-manipulation transition-colors',
                      theme === 'dark'
                        ? 'bg-white/[0.10] text-white'
                        : 'bg-transparent text-white/55 hover:text-white'
                    )}
                  >
                    Dark
                  </button>
                  <button
                    type="button"
                    onClick={() => void setTheme('light')}
                    className={cn(
                      'px-3 text-[11.5px] font-medium touch-manipulation transition-colors',
                      theme === 'light'
                        ? 'bg-white text-black'
                        : 'bg-transparent text-white/55 hover:text-white'
                    )}
                  >
                    Light
                  </button>
                </div>
                {/* Quality select — short label on phone, full label sm+ */}
                <select
                  value={quality}
                  onChange={(e) => setQuality(e.target.value as 'low' | 'medium' | 'high')}
                  className="h-10 px-2.5 sm:px-3 rounded-lg bg-[hsl(0_0%_10%)] border border-white/[0.10] text-white text-[11.5px] sm:text-[12px] font-medium touch-manipulation max-w-[160px] sm:max-w-none"
                  title="Image quality"
                >
                  <option value="low">£0.40 photos</option>
                  <option value="medium">£2 photos</option>
                  <option value="high">£8 photos</option>
                </select>
                {pendingImages > 0 && (
                  <button
                    type="button"
                    onClick={() => void generateMissingImages(quality)}
                    className="hidden sm:inline-flex h-10 px-4 rounded-lg bg-transparent border border-white/[0.10] hover:border-white/25 text-white text-[12px] font-medium transition-colors touch-manipulation"
                  >
                    Generate {pendingImages} photo{pendingImages === 1 ? '' : 's'}
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleExportPptx}
                  disabled={exportingPptx}
                  className="h-10 px-3 sm:px-4 rounded-lg bg-transparent border border-white/[0.10] hover:border-white/25 text-white text-[12px] font-medium transition-colors touch-manipulation"
                  title="Download PowerPoint"
                >
                  {exportingPptx ? 'Building…' : '↓ PPTX'}
                </button>
                {/* Focus mode — desktop only; phone can focus by tapping a slide */}
                <button
                  type="button"
                  onClick={() => {
                    setFocusedIndex(0);
                    setMode('single');
                  }}
                  className="hidden md:inline-flex h-10 px-4 rounded-lg bg-transparent border border-white/[0.10] hover:border-white/25 text-white text-[12px] font-medium transition-colors touch-manipulation"
                >
                  Focus
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFocusedIndex(0);
                    setMode('presenter');
                  }}
                  className="h-10 px-3 sm:px-4 rounded-lg bg-elec-yellow text-black text-[12px] font-semibold hover:bg-elec-yellow/90 transition-colors touch-manipulation"
                >
                  Present →
                </button>
              </>
            )}
            <button
              type="button"
              onClick={() => setPreflightOpen(true)}
              disabled={generating}
              className={cn(
                'h-10 px-3 sm:px-4 rounded-lg text-[12px] font-semibold transition-colors touch-manipulation',
                slides.length === 0
                  ? 'bg-elec-yellow text-black hover:bg-elec-yellow/90'
                  : 'bg-transparent border border-white/[0.10] hover:border-white/25 text-white',
                generating && 'opacity-60 cursor-wait'
              )}
            >
              {generating ? 'Generating…' : slides.length === 0 ? 'Generate slides' : 'Regenerate'}
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-4 rounded-xl border border-rose-300/30 bg-rose-500/[0.06] px-4 py-3 text-[13px] text-rose-200">
            {error}
          </div>
        )}

        {loading && !deck && (
          <div className="mt-8 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-[180px] rounded-2xl bg-[hsl(0_0%_10%)] border border-white/[0.06] animate-pulse"
              />
            ))}
          </div>
        )}

        {!loading && slides.length === 0 && !generating && (
          <EmptyState onGenerate={() => setPreflightOpen(true)} />
        )}

        {generating && slides.length === 0 && <GenerationProgress />}

        {/* Stacked viewer with drag-reorder */}
        {mode === 'viewer' && slides.length > 0 && (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={slideIds} strategy={verticalListSortingStrategy}>
              <ol className="mt-6 space-y-4">
                {slides.map((slide, i) => (
                  <SortableSlideRow
                    key={slideIds[i]}
                    sortableId={slideIds[i]}
                    slide={slide}
                    index={i}
                    total={slides.length}
                    theme={theme}
                    imageStatus={imageStatus[i] ?? null}
                    regenerating={regeneratingIndex === i}
                    onFocus={() => {
                      setFocusedIndex(i);
                      setMode('single');
                    }}
                    onEditOpen={() => setEditorIndex(i)}
                  />
                ))}
              </ol>
            </SortableContext>
          </DndContext>
        )}

        {/* Single-focus mode */}
        {mode === 'single' && focused && (
          <div className="mt-6">
            <SlideCard
              slide={focused}
              index={focusedIndex}
              total={slides.length}
              theme={theme}
              imageStatus={imageStatus[focusedIndex] ?? null}
              regenerating={regeneratingIndex === focusedIndex}
              focused
              onEditOpen={() => setEditorIndex(focusedIndex)}
            />
            <div className="mt-4 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setMode('viewer')}
                className="text-[11.5px] font-medium text-white hover:text-elec-yellow transition-colors touch-manipulation"
              >
                ← Back to all slides
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setFocusedIndex((i) => Math.max(0, i - 1))}
                  disabled={focusedIndex === 0}
                  className="h-10 px-4 rounded-lg bg-transparent border border-white/[0.10] hover:border-white/25 disabled:opacity-30 text-white text-[12px] font-medium transition-colors touch-manipulation"
                >
                  ← Prev
                </button>
                <span className="text-[12px] text-white tabular-nums">
                  {focusedIndex + 1} / {slides.length}
                </span>
                <button
                  type="button"
                  onClick={() => setFocusedIndex((i) => Math.min(slides.length - 1, i + 1))}
                  disabled={focusedIndex === slides.length - 1}
                  className="h-10 px-4 rounded-lg bg-transparent border border-white/[0.10] hover:border-white/25 disabled:opacity-30 text-white text-[12px] font-medium transition-colors touch-manipulation"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pre-flight dialog — runs before every generate so the tutor can
          tune slide count / tone / depth. */}
      <SlideDeckPreflightDialog
        open={preflightOpen}
        onOpenChange={setPreflightOpen}
        onConfirm={handleGenerateConfirmed}
      />

      {/* Per-slide editor — opens to the right with kind-aware fields. */}
      <SlideEditorSheet
        open={editorIndex != null}
        onOpenChange={(o) => {
          if (!o) setEditorIndex(null);
        }}
        slide={editorIndex != null ? slides[editorIndex] : null}
        slideIndex={editorIndex}
        totalSlides={slides.length}
        regenerating={regeneratingIndex === editorIndex}
        onSave={async (patch) => {
          if (editorIndex != null) await updateSlide(editorIndex, patch);
        }}
        onRegenerate={async (tweak) => {
          if (editorIndex == null) return false;
          return await regenerateSlide(editorIndex, tweak);
        }}
        onDuplicate={async () => {
          if (editorIndex != null) {
            await duplicateSlide(editorIndex);
            setEditorIndex(null);
          }
        }}
        onDelete={async () => {
          if (editorIndex != null) {
            await deleteSlide(editorIndex);
            setEditorIndex(null);
          }
        }}
      />
    </PageFrame>
  );
}

/* ───────────────── sortable wrapper ───────────────── */

function SortableSlideRow({
  sortableId,
  ...rest
}: {
  sortableId: string;
  slide: Slide;
  index: number;
  total: number;
  theme: DeckTheme;
  imageStatus: 'generating' | 'ready' | 'failed' | null;
  regenerating: boolean;
  onFocus: () => void;
  onEditOpen: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: sortableId,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };
  return (
    <li ref={setNodeRef} style={style}>
      <SlideCard {...rest} dragHandleProps={{ ...attributes, ...listeners }} />
    </li>
  );
}

/* ───────────────── slide card ───────────────── */

function SlideCard({
  slide,
  index,
  total,
  theme,
  imageStatus,
  regenerating,
  focused = false,
  onFocus,
  onEditOpen,
  dragHandleProps,
}: {
  slide: Slide;
  index: number;
  total: number;
  theme: DeckTheme;
  imageStatus: 'generating' | 'ready' | 'failed' | null;
  regenerating: boolean;
  focused?: boolean;
  onFocus?: () => void;
  onEditOpen: () => void;
  dragHandleProps?: Record<string, unknown>;
}) {
  const isImageKind =
    slide.kind === 'image_concept' ||
    slide.kind === 'starter' ||
    (!!slide.image_prompt && (slide.kind === 'plenary' || slide.kind === 'concept'));

  const pill = KIND_PILL[slide.kind] ?? 'border-white/[0.16] bg-white/[0.04] text-white';
  const backdrop = theme === 'dark' ? (KIND_BACKDROP[slide.kind] ?? '') : '';
  const cardBg = theme === 'dark' ? 'bg-[hsl(0_0%_10%)]' : 'bg-white';
  const cardBorder = theme === 'dark' ? 'border-white/[0.06]' : 'border-black/[0.10]';

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border transition-colors',
        cardBg,
        focused ? 'border-elec-yellow/40 shadow-[0_0_0_1px_rgba(250,204,21,0.10)]' : cardBorder,
        backdrop,
        regenerating && 'opacity-60'
      )}
    >
      {regenerating && (
        <div className="absolute inset-0 z-10 bg-black/40 flex items-center justify-center backdrop-blur-sm">
          <div className="text-[12px] font-medium text-white tracking-wide uppercase">
            Regenerating slide…
          </div>
        </div>
      )}
      {/* Image-led layout: image full-bleed at top of card */}
      {isImageKind && (
        <SlideImage
          imageUrl={slide.image_url}
          imagePrompt={slide.image_prompt}
          status={imageStatus}
          aspect="3/2"
          caption={slide.image_caption}
        />
      )}

      <div className="px-4 sm:px-7 py-4 sm:py-7">
        <div className="flex items-start justify-between gap-2 sm:gap-3 flex-wrap">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={cn(
                  'inline-flex items-center h-5 px-2 rounded-md border text-[10px] font-semibold uppercase tracking-[0.06em]',
                  pill
                )}
              >
                {KIND_EYEBROW[slide.kind]}
              </span>
              <span className="text-[10.5px] tabular-nums text-white">
                {index + 1} / {total}
              </span>
              {slide.kind === 'activity' && slide.time_minutes != null && (
                <span className="text-[10.5px] text-white">{slide.time_minutes} min</span>
              )}
              {slide.kind === 'activity' && slide.group_size && (
                <span className="text-[10.5px] text-white capitalize">
                  {slide.group_size.replace(/_/g, ' ')}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={onEditOpen}
              className={cn(
                'mt-3 block text-left text-[24px] sm:text-[32px] font-semibold tracking-tight leading-[1.1] hover:text-elec-yellow transition-colors touch-manipulation',
                theme === 'light' ? 'text-black' : 'text-white'
              )}
              title="Edit slide"
            >
              {slide.heading ?? '(untitled slide)'}
            </button>

            {slide.subtitle && (
              <div
                className={cn(
                  'mt-2 text-[15px] sm:text-[16px]',
                  theme === 'light' ? 'text-black/70' : 'text-white'
                )}
              >
                {slide.subtitle}
              </div>
            )}
          </div>

          <div className="shrink-0 flex items-center gap-1.5">
            {dragHandleProps && (
              <button
                type="button"
                {...dragHandleProps}
                className={cn(
                  'h-9 w-9 rounded-lg border flex items-center justify-center cursor-grab active:cursor-grabbing transition-colors touch-manipulation',
                  theme === 'light'
                    ? 'border-black/[0.12] text-black/55 hover:border-black/30'
                    : 'border-white/[0.10] text-white/55 hover:border-white/25'
                )}
                aria-label="Drag to reorder"
                title="Drag to reorder"
              >
                <span className="text-[14px] leading-none">⠿</span>
              </button>
            )}
            <button
              type="button"
              onClick={onEditOpen}
              className={cn(
                'h-9 px-3 rounded-lg border text-[11.5px] font-medium transition-colors touch-manipulation',
                theme === 'light'
                  ? 'border-black/[0.12] text-black hover:border-black/30'
                  : 'border-white/[0.10] text-white hover:border-white/25'
              )}
            >
              Edit
            </button>
            {onFocus && !focused && (
              <button
                type="button"
                onClick={onFocus}
                className={cn(
                  'h-9 px-3 rounded-lg border text-[11.5px] font-medium transition-colors touch-manipulation',
                  theme === 'light'
                    ? 'border-black/[0.12] text-black hover:border-black/30'
                    : 'border-white/[0.10] text-white hover:border-white/25'
                )}
              >
                Focus
              </button>
            )}
          </div>
        </div>

        <div className="mt-5">
          <SlideBody slide={slide} theme={theme} />
        </div>

        {/* AC chip + speaker notes row */}
        <div className="mt-5 flex flex-wrap items-start gap-3">
          {slide.slide_acs && slide.slide_acs.length > 0 && (
            <div className="inline-flex items-center gap-1.5 flex-wrap">
              <span
                className={cn(
                  'text-[10px] font-medium uppercase tracking-[0.18em]',
                  theme === 'light' ? 'text-black/55' : 'text-white/55'
                )}
              >
                Maps to
              </span>
              {slide.slide_acs.map((ac) => (
                <span
                  key={ac}
                  className={cn(
                    'inline-flex items-center h-5 px-2 rounded-md border text-[10.5px] font-semibold tabular-nums',
                    theme === 'light'
                      ? 'border-black/[0.16] bg-black/[0.04] text-black'
                      : 'border-elec-yellow/25 bg-elec-yellow/[0.06] text-elec-yellow'
                  )}
                >
                  {ac}
                </span>
              ))}
            </div>
          )}
        </div>

        {slide.speaker_notes && (
          <div
            className={cn(
              'mt-4 rounded-lg border px-4 py-3',
              theme === 'light'
                ? 'border-black/[0.10] bg-black/[0.03]'
                : 'border-white/[0.06] bg-white/[0.02]'
            )}
          >
            <div
              className={cn(
                'text-[10px] font-medium uppercase tracking-[0.18em]',
                theme === 'light' ? 'text-black/55' : 'text-white'
              )}
            >
              Speaker notes
            </div>
            <p
              className={cn(
                'mt-1 text-[13px] leading-relaxed whitespace-pre-line',
                theme === 'light' ? 'text-black/85' : 'text-white'
              )}
            >
              {slide.speaker_notes}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ───────────────── slide image ───────────────── */

function SlideImage({
  imageUrl,
  imagePrompt,
  status,
  aspect,
  caption,
}: {
  imageUrl?: string;
  imagePrompt?: string;
  status: 'generating' | 'ready' | 'failed' | null;
  aspect: '3/2' | '16/9' | 'square';
  caption?: string;
}) {
  const aspectClass =
    aspect === '3/2' ? 'aspect-[3/2]' : aspect === '16/9' ? 'aspect-video' : 'aspect-square';

  if (imageUrl) {
    return (
      <div className="relative">
        <div className={cn('w-full overflow-hidden bg-black', aspectClass)}>
          <img
            src={imageUrl}
            alt={caption ?? 'Slide illustration'}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        {caption && (
          <div className="absolute bottom-0 left-0 right-0 px-5 py-2 bg-gradient-to-t from-black/70 to-transparent text-[11px] text-white">
            {caption}
          </div>
        )}
      </div>
    );
  }

  if (!imagePrompt) return null;

  // Skeleton — shown while generating, before generation, or on failure.
  return (
    <div className={cn('w-full bg-[hsl(0_0%_8%)] relative overflow-hidden', aspectClass)}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(250,204,21,0.06),transparent_60%)]" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        {status === 'failed' ? (
          <>
            <span className="text-[24px]">⚠</span>
            <span className="text-[11px] text-white">Photo generation failed</span>
          </>
        ) : (
          <>
            <span className="relative inline-flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-elec-yellow opacity-60" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-elec-yellow" />
            </span>
            <span className="text-[11px] text-white tracking-wide uppercase">
              {status === 'generating' ? 'Photographing…' : 'Photo queued'}
            </span>
            <span className="text-[10px] text-white/55 px-6 text-center max-w-md italic">
              {imagePrompt}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

/* ───────────────── slide body (kind-specific) ───────────────── */

function SlideBody({ slide, theme = 'dark' }: { slide: Slide; theme?: DeckTheme }) {
  // Light theme: neutral body/bullet text needs to be near-black instead
  // of white. Accent slide kinds (pull_quote/reg_cite/big_stat) keep their
  // coloured accents on both themes — only neutral text flips.
  const T = theme === 'light' ? 'text-black' : 'text-white';
  const Tmuted = theme === 'light' ? 'text-black/60' : 'text-white';
  const KeyTermBg =
    theme === 'light'
      ? 'border-black/[0.10] bg-black/[0.02]'
      : 'border-white/[0.10] bg-white/[0.02]';
  switch (slide.kind) {
    case 'title':
      return (
        <div className="space-y-2">
          {slide.duration_label && (
            <div className={cn('text-[13px]', T)}>{slide.duration_label}</div>
          )}
          {slide.body && <p className={cn('text-[15px]', T)}>{slide.body}</p>}
        </div>
      );
    case 'objectives':
    case 'summary':
      return (
        <ul className="space-y-2 list-disc list-outside ml-5">
          {(slide.bullets ?? []).map((b, i) => (
            <li key={i} className={cn('text-[14.5px] leading-relaxed', T)}>
              {b}
            </li>
          ))}
        </ul>
      );
    case 'starter':
      return (
        <div className="space-y-3">
          {slide.body && (
            <p className={cn('text-[15px] leading-relaxed whitespace-pre-line', T)}>{slide.body}</p>
          )}
          {slide.questions && slide.questions.length > 0 && (
            <ul className="space-y-1.5 list-decimal list-outside ml-5">
              {slide.questions.map((q, i) => (
                <li key={i} className={cn('text-[14px] leading-relaxed', T)}>
                  {q}
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    case 'concept':
    case 'image_concept':
      return (
        <div className="space-y-3">
          {slide.body && (
            <p className={cn('text-[15px] leading-relaxed whitespace-pre-line', T)}>{slide.body}</p>
          )}
          {slide.key_terms && slide.key_terms.length > 0 && (
            <div className="space-y-1.5">
              {slide.key_terms.map((t, i) => (
                <div key={i} className={cn('rounded-lg border px-4 py-2.5', KeyTermBg)}>
                  <div className={cn('text-[13px] font-semibold', T)}>{t.term}</div>
                  <div className={cn('mt-0.5 text-[12.5px]', T)}>{t.definition}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    case 'reg_cite':
    case 'pull_quote':
      return (
        <div className="space-y-3 max-w-3xl">
          {slide.reg_number && (
            <div className="text-[28px] sm:text-[36px] font-semibold text-amber-500 tabular-nums tracking-tight leading-none">
              {slide.reg_number}
            </div>
          )}
          {(slide.clause || slide.quote) && (
            <blockquote
              className={cn('text-[18px] sm:text-[22px] leading-[1.4] italic font-light', T)}
            >
              <span className="text-amber-500/70 mr-1">“</span>
              {slide.clause ?? slide.quote}
              <span className="text-amber-500/70 ml-1">”</span>
            </blockquote>
          )}
          {slide.attribution && (
            <div className={cn('text-[12px] uppercase tracking-[0.18em]', Tmuted)}>
              — {slide.attribution}
            </div>
          )}
          {slide.why_it_matters && (
            <p
              className={cn(
                'text-[14px] leading-relaxed pt-2 border-t',
                T,
                theme === 'light' ? 'border-black/[0.10]' : 'border-white/[0.06]'
              )}
            >
              <span className={cn('font-semibold', T)}>Why this matters: </span>
              {slide.why_it_matters}
            </p>
          )}
        </div>
      );
    case 'big_stat':
      return (
        <div className="space-y-2 max-w-2xl">
          <div className="text-[60px] sm:text-[88px] font-semibold text-cyan-500 tabular-nums tracking-tight leading-none">
            {slide.stat_value}
          </div>
          {slide.stat_caption && (
            <p className={cn('text-[18px] sm:text-[22px] leading-snug font-light', T)}>
              {slide.stat_caption}
            </p>
          )}
          {slide.stat_source && (
            <div className={cn('pt-2 text-[11px] uppercase tracking-[0.18em]', Tmuted)}>
              Source · {slide.stat_source}
            </div>
          )}
          {slide.body && (
            <p className={cn('mt-3 text-[14px] leading-relaxed whitespace-pre-line', T)}>
              {slide.body}
            </p>
          )}
        </div>
      );
    case 'two_column':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {(['left', 'right'] as const).map((side) => {
            const heading = side === 'left' ? slide.left_heading : slide.right_heading;
            const body = side === 'left' ? slide.left_body : slide.right_body;
            const bullets = side === 'left' ? slide.left_bullets : slide.right_bullets;
            const accent = side === 'left' ? 'text-purple-400' : 'text-emerald-400';
            return (
              <div key={side} className={cn('rounded-xl border px-4 py-4', KeyTermBg)}>
                {heading && (
                  <div
                    className={cn(
                      'text-[10.5px] font-semibold uppercase tracking-[0.16em]',
                      accent
                    )}
                  >
                    {heading}
                  </div>
                )}
                {body && (
                  <p className={cn('mt-2 text-[14px] leading-relaxed whitespace-pre-line', T)}>
                    {body}
                  </p>
                )}
                {bullets && bullets.length > 0 && (
                  <ul className="mt-2 space-y-1 list-disc list-outside ml-5">
                    {bullets.map((b, i) => (
                      <li key={i} className={cn('text-[13px] leading-relaxed', T)}>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      );
    case 'diagram_caption':
      return (
        <div className="space-y-3">
          <DiagramSvg kind={slide.diagram_kind ?? null} />
          {slide.diagram_caption && (
            <p className={cn('text-[13px] leading-relaxed', T)}>{slide.diagram_caption}</p>
          )}
          {slide.body && (
            <p className={cn('text-[14px] leading-relaxed whitespace-pre-line', T)}>{slide.body}</p>
          )}
        </div>
      );
    case 'activity':
      return (
        <div className="space-y-3">
          {slide.instruction && (
            <p className={cn('text-[15px] leading-relaxed whitespace-pre-line', T)}>
              {slide.instruction}
            </p>
          )}
          {slide.success_criteria && (
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/[0.06] px-4 py-3">
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-emerald-400">
                Success looks like
              </div>
              <div className={cn('mt-0.5 text-[13.5px]', T)}>{slide.success_criteria}</div>
            </div>
          )}
        </div>
      );
    case 'worked_example':
      return (
        <div className="space-y-3">
          {slide.problem && (
            <div className="rounded-lg border border-blue-500/30 bg-blue-500/[0.06] px-4 py-3">
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-blue-400">
                Problem
              </div>
              <div className={cn('mt-0.5 text-[14px] whitespace-pre-line', T)}>{slide.problem}</div>
            </div>
          )}
          {slide.solution_steps && slide.solution_steps.length > 0 && (
            <ol className="space-y-2 list-decimal list-outside ml-5">
              {slide.solution_steps.map((s, i) => (
                <li key={i} className={cn('text-[14px] leading-relaxed', T)}>
                  {s}
                </li>
              ))}
            </ol>
          )}
        </div>
      );
    case 'check_understanding':
      return (
        <ol className="space-y-3 list-decimal list-outside ml-5">
          {(slide.questions ?? []).map((q, i) => (
            <li key={i} className={cn('text-[15px] leading-relaxed', T)}>
              {q}
            </li>
          ))}
        </ol>
      );
    case 'misconception':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {slide.belief && (
            <div className="rounded-lg border border-rose-500/30 bg-rose-500/[0.06] px-4 py-3">
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-rose-400">
                Common belief
              </div>
              <div className={cn('mt-0.5 text-[14px]', T)}>{slide.belief}</div>
            </div>
          )}
          {slide.correction && (
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/[0.06] px-4 py-3">
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-emerald-400">
                Actually
              </div>
              <div className={cn('mt-0.5 text-[14px]', T)}>{slide.correction}</div>
            </div>
          )}
        </div>
      );
    case 'plenary':
      return (
        <div className="space-y-3">
          {slide.body && (
            <p className={cn('text-[15px] leading-relaxed whitespace-pre-line', T)}>{slide.body}</p>
          )}
          {slide.exit_ticket && (
            <div className="rounded-lg border border-elec-yellow/30 bg-elec-yellow/[0.06] px-4 py-3">
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
                Exit ticket
              </div>
              <div className={cn('mt-0.5 text-[14px]', T)}>{slide.exit_ticket}</div>
            </div>
          )}
        </div>
      );
    default:
      return slide.body ? (
        <p className={cn('text-[15px] leading-relaxed whitespace-pre-line', T)}>{slide.body}</p>
      ) : null;
  }
}

/* ───────────────── diagram SVGs ───────────────── */

function DiagramSvg({ kind }: { kind: DiagramKind | null }) {
  if (!kind) return null;
  // Lightweight illustrative diagrams — not technically rigorous wiring
  // schematics, but better than a "diagram coming soon" placeholder. Each
  // kind gets its own minimalist SVG.
  const cls = 'w-full max-w-[640px] mx-auto rounded-lg border border-white/[0.10] bg-white/[0.02]';
  switch (kind) {
    case 'ring_final':
      return (
        <svg viewBox="0 0 600 240" className={cls}>
          <rect x="20" y="80" width="80" height="80" fill="none" stroke="#FACC15" strokeWidth="2" />
          <text x="60" y="125" fill="#FACC15" fontSize="11" textAnchor="middle">
            CU
          </text>
          <ellipse
            cx="320"
            cy="120"
            rx="240"
            ry="80"
            fill="none"
            stroke="#60A5FA"
            strokeWidth="2"
          />
          {[160, 240, 320, 400, 480].map((cx) => (
            <g key={cx}>
              <rect
                x={cx - 14}
                y={cx % 80 === 0 ? 36 : 188}
                width="28"
                height="16"
                fill="#60A5FA"
                opacity="0.3"
                stroke="#60A5FA"
              />
              <text
                x={cx}
                y={cx % 80 === 0 ? 30 : 215}
                fill="#fff"
                fontSize="9"
                textAnchor="middle"
              >
                socket
              </text>
            </g>
          ))}
          <text x="300" y="232" fill="#fff" fontSize="10" textAnchor="middle" opacity="0.6">
            Ring final circuit — both legs return to CU
          </text>
        </svg>
      );
    case 'radial':
      return (
        <svg viewBox="0 0 600 200" className={cls}>
          <rect x="20" y="60" width="80" height="80" fill="none" stroke="#FACC15" strokeWidth="2" />
          <text x="60" y="105" fill="#FACC15" fontSize="11" textAnchor="middle">
            CU
          </text>
          <line x1="100" y1="100" x2="560" y2="100" stroke="#60A5FA" strokeWidth="2" />
          {[180, 280, 380, 480].map((cx) => (
            <g key={cx}>
              <line x1={cx} y1="100" x2={cx} y2="135" stroke="#60A5FA" strokeWidth="2" />
              <rect
                x={cx - 14}
                y={135}
                width="28"
                height="16"
                fill="#60A5FA"
                opacity="0.3"
                stroke="#60A5FA"
              />
              <text x={cx} y={170} fill="#fff" fontSize="9" textAnchor="middle">
                socket
              </text>
            </g>
          ))}
          <text x="300" y="195" fill="#fff" fontSize="10" textAnchor="middle" opacity="0.6">
            Radial — single feed, terminates at last point
          </text>
        </svg>
      );
    case 'distribution_board':
      return (
        <svg viewBox="0 0 600 240" className={cls}>
          <rect
            x="40"
            y="30"
            width="520"
            height="180"
            fill="none"
            stroke="#FACC15"
            strokeWidth="2"
          />
          <line x1="40" y1="60" x2="560" y2="60" stroke="#FACC15" strokeWidth="1" />
          <text x="300" y="50" fill="#FACC15" fontSize="11" textAnchor="middle">
            Distribution board
          </text>
          <rect
            x="60"
            y="80"
            width="50"
            height="40"
            fill="#22D3EE"
            opacity="0.2"
            stroke="#22D3EE"
          />
          <text x="85" y="105" fill="#fff" fontSize="9" textAnchor="middle">
            Main
          </text>
          {[140, 200, 260, 320, 380, 440, 500].map((x) => (
            <g key={x}>
              <rect x={x} y={80} width="40" height="40" fill="none" stroke="#60A5FA" />
              <text x={x + 20} y={105} fill="#fff" fontSize="9" textAnchor="middle">
                RCBO
              </text>
            </g>
          ))}
          {[140, 200, 260, 320, 380, 440, 500].map((x) => (
            <line
              key={`l${x}`}
              x1={x + 20}
              y1="120"
              x2={x + 20}
              y2="180"
              stroke="#60A5FA"
              strokeWidth="1.5"
            />
          ))}
        </svg>
      );
    case 'voltage_drop_curve':
      return (
        <svg viewBox="0 0 600 240" className={cls}>
          <line x1="60" y1="200" x2="560" y2="200" stroke="#fff" strokeWidth="1" opacity="0.5" />
          <line x1="60" y1="200" x2="60" y2="30" stroke="#fff" strokeWidth="1" opacity="0.5" />
          <text x="60" y="225" fill="#fff" fontSize="10" textAnchor="middle">
            0m
          </text>
          <text x="560" y="225" fill="#fff" fontSize="10" textAnchor="middle">
            100m
          </text>
          <text x="50" y="200" fill="#fff" fontSize="10" textAnchor="end">
            230V
          </text>
          <text x="50" y="35" fill="#fff" fontSize="10" textAnchor="end">
            220V
          </text>
          <line x1="60" y1="200" x2="560" y2="80" stroke="#FACC15" strokeWidth="2" />
          <line
            x1="60"
            y1="60"
            x2="560"
            y2="60"
            stroke="#F87171"
            strokeWidth="1"
            strokeDasharray="6 4"
          />
          <text x="565" y="64" fill="#F87171" fontSize="10">
            Vd limit (3%)
          </text>
          <text x="300" y="235" fill="#fff" fontSize="10" textAnchor="middle" opacity="0.6">
            Voltage drop along run length
          </text>
        </svg>
      );
    case 'three_phase':
      return (
        <svg viewBox="0 0 600 240" className={cls}>
          <circle
            cx="300"
            cy="130"
            r="80"
            fill="none"
            stroke="#fff"
            strokeWidth="1"
            opacity="0.3"
          />
          <line x1="300" y1="130" x2="300" y2="50" stroke="#A855F7" strokeWidth="3" />
          <text x="300" y="40" fill="#A855F7" fontSize="12" textAnchor="middle">
            L1
          </text>
          <line x1="300" y1="130" x2="370" y2="170" stroke="#FACC15" strokeWidth="3" />
          <text x="395" y="180" fill="#FACC15" fontSize="12">
            L2
          </text>
          <line x1="300" y1="130" x2="230" y2="170" stroke="#22D3EE" strokeWidth="3" />
          <text x="200" y="180" fill="#22D3EE" fontSize="12">
            L3
          </text>
          <text x="300" y="232" fill="#fff" fontSize="10" textAnchor="middle" opacity="0.6">
            3-phase 120° apart
          </text>
        </svg>
      );
    default:
      return (
        <div className="w-full aspect-video rounded-lg border border-white/[0.10] bg-white/[0.02] flex items-center justify-center">
          <span className="text-[12px] text-white/55 italic">
            Diagram template "{kind}" coming soon
          </span>
        </div>
      );
  }
}

/* ───────────────── presenter mode ───────────────── */

function PresenterMode({
  slide,
  slideStatus,
  index,
  total,
  onExit,
  onPrev,
  onNext,
}: {
  slide: Slide;
  slideStatus: 'generating' | 'ready' | 'failed' | null;
  index: number;
  total: number;
  onExit: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const hasFullBleedImage =
    !!slide.image_url && (slide.kind === 'image_concept' || slide.kind === 'starter');

  return (
    <div className="fixed inset-0 z-[100] bg-black text-white flex flex-col">
      <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
        <span className="text-[11px] tabular-nums text-white/55">
          {index + 1} / {total}
        </span>
        <button
          type="button"
          onClick={onExit}
          className="h-9 px-3 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-[11.5px] font-medium touch-manipulation"
        >
          Exit (Esc)
        </button>
      </div>

      {hasFullBleedImage && slide.image_url && (
        <img
          src={slide.image_url}
          alt={slide.image_caption ?? ''}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {hasFullBleedImage && (
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />
      )}

      <div className="relative z-[1] flex-1 flex flex-col justify-center px-5 sm:px-12 lg:px-24 pt-14 pb-24 sm:py-12 max-w-[1400px] w-full mx-auto">
        <div className="text-[12px] font-medium uppercase tracking-[0.22em] text-white/55">
          {KIND_EYEBROW[slide.kind]}
        </div>
        <h1 className="mt-3 text-[40px] sm:text-[56px] lg:text-[72px] font-semibold tracking-tight leading-[1.02]">
          {slide.heading ?? ''}
        </h1>
        {slide.subtitle && (
          <div className="mt-3 text-[20px] sm:text-[26px] text-white/80">{slide.subtitle}</div>
        )}
        <div className="mt-8 max-w-[1000px] text-[20px] sm:text-[26px] leading-[1.5]">
          <PresenterBody slide={slide} />
        </div>

        {!slide.image_url && slide.image_prompt && (
          <div className="mt-6 inline-flex items-center gap-2 text-[12px] text-white/55">
            <span className="relative inline-flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-elec-yellow opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-elec-yellow" />
            </span>
            <span>{slideStatus === 'generating' ? 'Photo generating…' : 'Photo queued'}</span>
          </div>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between p-3 sm:p-4">
        <button
          type="button"
          onClick={onPrev}
          disabled={index === 0}
          className="h-12 px-5 rounded-lg bg-white/[0.10] hover:bg-white/[0.16] disabled:opacity-30 text-[14px] font-medium touch-manipulation"
        >
          ← Prev
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={index === total - 1}
          className="h-12 px-5 rounded-lg bg-elec-yellow text-black hover:bg-elec-yellow/90 disabled:opacity-30 text-[14px] font-semibold touch-manipulation"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

function PresenterBody({ slide }: { slide: Slide }) {
  switch (slide.kind) {
    case 'objectives':
    case 'summary':
      return (
        <ul className="space-y-4 list-disc list-outside ml-6">
          {(slide.bullets ?? []).map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      );
    case 'big_stat':
      return (
        <div className="space-y-3">
          {slide.stat_value && (
            <div className="text-[120px] sm:text-[180px] font-semibold text-cyan-300 tabular-nums leading-none">
              {slide.stat_value}
            </div>
          )}
          {slide.stat_caption && <p className="text-[24px] sm:text-[32px]">{slide.stat_caption}</p>}
          {slide.stat_source && (
            <div className="text-[14px] text-white/55 uppercase tracking-[0.18em]">
              Source · {slide.stat_source}
            </div>
          )}
        </div>
      );
    case 'reg_cite':
    case 'pull_quote':
      return (
        <div className="space-y-4">
          {slide.reg_number && (
            <div className="text-[60px] sm:text-[80px] font-semibold text-amber-300 tabular-nums leading-none">
              {slide.reg_number}
            </div>
          )}
          {(slide.clause || slide.quote) && (
            <p className="italic font-light text-[28px] sm:text-[36px] leading-[1.35]">
              <span className="text-amber-300/70 mr-1">“</span>
              {slide.clause ?? slide.quote}
              <span className="text-amber-300/70 ml-1">”</span>
            </p>
          )}
          {slide.attribution && (
            <div className="text-[16px] text-white/55 uppercase tracking-[0.18em]">
              — {slide.attribution}
            </div>
          )}
          {slide.why_it_matters && <p className="pt-4 text-[18px]">{slide.why_it_matters}</p>}
        </div>
      );
    case 'two_column':
      return (
        <div className="grid grid-cols-2 gap-8">
          <div>
            {slide.left_heading && (
              <div className="text-[14px] uppercase tracking-[0.18em] text-purple-300">
                {slide.left_heading}
              </div>
            )}
            {slide.left_body && <p className="mt-2 whitespace-pre-line">{slide.left_body}</p>}
            {slide.left_bullets && (
              <ul className="mt-2 space-y-1.5 list-disc list-outside ml-6 text-[18px]">
                {slide.left_bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            )}
          </div>
          <div>
            {slide.right_heading && (
              <div className="text-[14px] uppercase tracking-[0.18em] text-emerald-300">
                {slide.right_heading}
              </div>
            )}
            {slide.right_body && <p className="mt-2 whitespace-pre-line">{slide.right_body}</p>}
            {slide.right_bullets && (
              <ul className="mt-2 space-y-1.5 list-disc list-outside ml-6 text-[18px]">
                {slide.right_bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      );
    case 'starter':
    case 'concept':
    case 'image_concept':
    case 'plenary':
    case 'title':
      return slide.body ? <div className="whitespace-pre-line">{slide.body}</div> : null;
    case 'activity':
      return (
        <div className="space-y-4">
          {slide.instruction && <div className="whitespace-pre-line">{slide.instruction}</div>}
          {slide.success_criteria && (
            <div className="text-emerald-300 text-[18px]">Success: {slide.success_criteria}</div>
          )}
          {slide.time_minutes != null && (
            <div className="text-[18px] text-white/75">{slide.time_minutes} minutes</div>
          )}
        </div>
      );
    case 'worked_example':
      return (
        <div className="space-y-4">
          {slide.problem && <div className="whitespace-pre-line">{slide.problem}</div>}
          {slide.solution_steps && (
            <ol className="space-y-3 list-decimal list-outside ml-6">
              {slide.solution_steps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          )}
        </div>
      );
    case 'check_understanding':
      return (
        <ol className="space-y-4 list-decimal list-outside ml-6">
          {(slide.questions ?? []).map((q, i) => (
            <li key={i}>{q}</li>
          ))}
        </ol>
      );
    case 'misconception':
      return (
        <div className="space-y-6">
          {slide.belief && (
            <div className="text-rose-300">
              <span className="text-[14px] uppercase tracking-[0.18em] block mb-2">
                Common belief
              </span>
              {slide.belief}
            </div>
          )}
          {slide.correction && (
            <div className="text-emerald-300">
              <span className="text-[14px] uppercase tracking-[0.18em] block mb-2">Actually</span>
              {slide.correction}
            </div>
          )}
        </div>
      );
    default:
      return null;
  }
}

/* ───────────────── generation progress ───────────────── */

const GENERATION_STAGES: Array<{ label: string; minSec: number }> = [
  { label: 'Reading your lesson plan…', minSec: 0 },
  { label: 'Mapping objectives to BS 7671…', minSec: 6 },
  { label: 'Drafting 12–18 slides…', minSec: 14 },
  { label: 'Selecting regulation citations…', minSec: 24 },
  { label: 'Composing photo prompts…', minSec: 34 },
  { label: 'Polishing typography…', minSec: 46 },
  { label: 'Almost there…', minSec: 56 },
];

const ESTIMATED_DECK_SEC = 60;

function GenerationProgress() {
  const [elapsed, setElapsed] = useState(0);
  const startedAt = useRef(Date.now());

  useEffect(() => {
    const id = setInterval(() => {
      setElapsed(Math.round((Date.now() - startedAt.current) / 1000));
    }, 250);
    return () => clearInterval(id);
  }, []);

  // Pseudo-progress: smooth ramp to 95% over the estimated duration, then
  // pauses at 95% until the deck actually returns. This avoids a janky
  // "stuck at 100% for 20s" feel.
  const progress = Math.min(95, (elapsed / ESTIMATED_DECK_SEC) * 95);

  const currentStage =
    [...GENERATION_STAGES].reverse().find((s) => elapsed >= s.minSec) ?? GENERATION_STAGES[0];

  const remainingSec = Math.max(0, ESTIMATED_DECK_SEC - elapsed);

  return (
    <div className="mt-8 space-y-5">
      <div className="rounded-2xl border border-elec-yellow/25 overflow-hidden bg-[hsl(0_0%_10%)]">
        {/* Hero header with shimmer heading */}
        <div className="relative px-6 py-7 bg-[radial-gradient(ellipse_at_top_left,rgba(250,204,21,0.10),transparent_60%),radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.08),transparent_60%)]">
          <div className="flex items-center gap-3">
            <PulsingDot />
            <span className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-elec-yellow">
              Live · AI working
            </span>
          </div>
          <ShimmerHeading className="mt-3 text-[24px] sm:text-[32px] font-semibold tracking-tight leading-[1.1]">
            {currentStage.label}
          </ShimmerHeading>
          <div className="mt-2 flex items-center gap-3 text-[12px] text-white">
            <span className="tabular-nums">{elapsed}s elapsed</span>
            <span className="text-white/30">·</span>
            <span className="tabular-nums">~{remainingSec}s left</span>
            <span className="text-white/30">·</span>
            <span>Then ~5s per photo</span>
          </div>

          {/* Progress bar */}
          <div className="mt-5 h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-elec-yellow via-amber-300 to-elec-yellow rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              style={{
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s linear infinite',
              }}
            />
          </div>

          {/* Stage timeline */}
          <div className="mt-5 grid grid-cols-7 gap-1">
            {GENERATION_STAGES.map((s, i) => {
              const reached = elapsed >= s.minSec;
              const current = currentStage === s;
              return (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div
                    className={cn(
                      'h-1 w-full rounded-full transition-colors duration-500',
                      current ? 'bg-elec-yellow' : reached ? 'bg-elec-yellow/40' : 'bg-white/[0.06]'
                    )}
                  />
                  <div
                    className={cn(
                      'h-1.5 w-1.5 rounded-full transition-colors duration-500',
                      current
                        ? 'bg-elec-yellow shadow-[0_0_8px_rgba(250,204,21,0.6)]'
                        : reached
                          ? 'bg-elec-yellow/40'
                          : 'bg-white/[0.10]'
                    )}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Skeleton slide cards — shows the user the shape of what's coming */}
      <div>
        <div className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-white mb-2">
          Slides will appear here
        </div>
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonSlide key={i} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes textShimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes skeletonPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}

function PulsingDot() {
  return (
    <span className="relative inline-flex h-2.5 w-2.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-elec-yellow opacity-70" />
      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-elec-yellow" />
    </span>
  );
}

function ShimmerHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(className, 'inline-block bg-clip-text text-transparent')}
      style={{
        backgroundImage:
          'linear-gradient(90deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,1) 25%, rgba(250,204,21,1) 50%, rgba(255,255,255,1) 75%, rgba(255,255,255,0.7) 100%)',
        backgroundSize: '200% 100%',
        animation: 'textShimmer 3s linear infinite',
      }}
    >
      {children}
    </h2>
  );
}

function SkeletonSlide({ index }: { index: number }) {
  // Vary the skeleton shape slightly per index so the column doesn't look
  // monotonous. Some have an "image" block, some don't.
  const hasImage = index === 0 || index === 2 || index === 4;
  const variantHeading = ['w-2/3', 'w-1/2', 'w-3/4', 'w-3/5', 'w-2/3', 'w-1/2'][index % 6];
  return (
    <div
      className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden"
      style={{ animation: `skeletonPulse 2s ease-in-out infinite ${index * 0.15}s` }}
    >
      {hasImage && (
        <div className="aspect-[3/2] w-full bg-gradient-to-br from-white/[0.06] to-white/[0.02] relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.04) 50%, transparent 70%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 2.5s linear infinite',
            }}
          />
        </div>
      )}
      <div className="px-5 sm:px-7 py-5 space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-4 w-16 rounded bg-white/[0.06]" />
          <div className="h-3 w-8 rounded bg-white/[0.04]" />
        </div>
        <div className={cn('h-7 rounded bg-white/[0.08]', variantHeading)} />
        <div className="space-y-1.5">
          <div className="h-3 rounded bg-white/[0.04] w-full" />
          <div className="h-3 rounded bg-white/[0.04] w-5/6" />
          {!hasImage && <div className="h-3 rounded bg-white/[0.04] w-2/3" />}
        </div>
      </div>
    </div>
  );
}

/* ───────────────── empty state ───────────────── */

function EmptyState({ onGenerate }: { onGenerate: () => void }) {
  return (
    <div className="mt-8 rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] px-6 py-12 text-center">
      <div className="text-[16px] font-semibold text-white">No slide deck yet</div>
      <p className="mt-2 text-[13px] text-white max-w-md mx-auto leading-relaxed">
        Generate a tutor-ready deck from this lesson plan — title, objectives, activities,
        regulation cites, summary, plenary. Photos auto-generate per slide. Edit any heading inline.
        Present in full-screen.
      </p>
      <button
        type="button"
        onClick={onGenerate}
        className="mt-5 h-11 px-5 rounded-lg bg-elec-yellow text-black text-[13px] font-semibold hover:bg-elec-yellow/90 transition-colors touch-manipulation"
      >
        Generate slides →
      </button>
    </div>
  );
}

/* ───────────────── helpers ───────────────── */

function formatGenAt(iso: string): string {
  const d = new Date(iso);
  const diff = Date.now() - d.getTime();
  const min = Math.round(diff / 60000);
  if (min < 1) return 'just now';
  if (min < 60) return `${min}m ago`;
  const h = Math.round(min / 60);
  if (h < 24) return `${h}h ago`;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}
