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
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import { HubBody, HubMasthead, HubPage, HubSectionHeading } from '@/components/hub/HubPrimitives';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  chipBase,
  chipOff,
  chipOn,
  textareaCn,
} from '@/components/forms/fieldStyles';
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
   in place, delivered in presenter mode.

   Rebuilt on the shared hub shell (HubPage → HubMasthead → HubBody), the
   same frame the Marking queue and the College dashboard use. What went:

   - The editorial header (volt eyebrow, 34px title, meta paragraph). The
     masthead names the lesson; one line under the "Deck" heading carries
     the figures.
   - Per-kind coloured pills and radial gradient washes on every card
     (blue, purple, cyan, emerald, rose). A slide's kind is now a volt word
     on the card; the kind-specific TEMPLATE for each slide body is kept.
   - Three solid volt buttons on one screen (Present, Generate/Regenerate,
     and the editor's own Regenerate). Present is the one primary; the rest
     are neutral 44px controls or in-row text actions.
   - The right-hand editor drawer and the centred preflight dialog — both
     are bottom sheets now.

   Per-slide actions are all wired to the existing hook: edit
   (updateSlide), regenerate with a tweak (regenerateSlide), new photo
   (generateSlideImage), reorder (reorderSlides — drag on desktop, arrows
   on a phone), duplicate and delete.

   The `theme` on the deck only ever affected the PowerPoint export —
   presenter mode is always full-bleed black — so its control is labelled
   as the export theme rather than pretending to restyle the page.

   ELE-942 / [F1.2].
   ========================================================================== */

type Mode = 'viewer' | 'single' | 'presenter';
type Quality = 'low' | 'medium' | 'high';
type ImageStatus = 'generating' | 'ready' | 'failed' | null;

const KIND_LABEL: Record<SlideKind, string> = {
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

const QUALITY_OPTIONS: Array<{ value: Quality; label: string; help: string }> = [
  { value: 'low', label: 'Standard', help: 'About £0.40 a photo' },
  { value: 'medium', label: 'Better', help: 'About £2 a photo' },
  { value: 'high', label: 'Best', help: 'About £8 a photo' },
];

/** Neutral 44px control — the cert footer's secondary button at hub height. */
const CONTROL = cn(buttonSecondaryCn, 'h-11 px-4 text-[12.5px]');
/** In-row text action on a slide card. */
const TEXT_ACTION =
  'flex h-11 items-center px-2.5 text-[12.5px] font-semibold text-white transition-colors touch-manipulation hover:text-elec-yellow disabled:text-white disabled:opacity-40';
/** Page-width card: edge-to-edge on a phone, inset and rounded from sm: up. */
const PAGE_CARD = cn(
  '-mx-4 overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x',
  CARD_SURFACE
);

function plural(n: number, one: string, many = `${one}s`): string {
  return `${n} ${n === 1 ? one : many}`;
}

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
    generateSlideImage,
    generateMissingImages,
    imageStatus,
  } = useSlideDeck(id ?? null);
  const [mode, setMode] = useState<Mode>('viewer');
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [quality, setQuality] = useState<Quality>('medium');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [preflightOpen, setPreflightOpen] = useState(false);
  const [editorIndex, setEditorIndex] = useState<number | null>(null);
  const [regenIndex, setRegenIndex] = useState<number | null>(null);
  const [exportingPptx, setExportingPptx] = useState(false);

  const theme: DeckTheme = deck?.theme ?? 'dark';
  const planPath = `/college/lessons/${id}`;

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

  // A deleted last slide can leave the focus index past the end.
  useEffect(() => {
    if (slides.length && focusedIndex > slides.length - 1) setFocusedIndex(slides.length - 1);
  }, [slides.length, focusedIndex]);

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

  const handleNewPhoto = useCallback(
    (i: number) => {
      const s = slides[i];
      if (!s?.image_prompt) return;
      firedPromptsRef.current.set(i, s.image_prompt);
      void generateSlideImage(i, s.image_prompt, quality);
    },
    [slides, generateSlideImage, quality]
  );

  const handleDelete = useCallback(
    (i: number) => {
      if (!confirm('Delete this slide?')) return;
      void deleteSlide(i);
    },
    [deleteSlide]
  );

  // Browser back rather than a pushed route, so plan ↔ slides does not
  // build an endless history chain. Deep links with no history fall back
  // to the plan page.
  const goBack = useCallback(() => {
    if (window.history.length > 1) navigate(-1);
    else navigate(planPath);
  }, [navigate, planPath]);

  const openPresenter = () => {
    setFocusedIndex(0);
    setMode('presenter');
  };

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

  const summaryParts: string[] = [];
  if (plan?.duration_minutes) summaryParts.push(`${plan.duration_minutes} min lesson`);
  summaryParts.push(plural(slides.length, 'slide'));
  if (totalActivityMins > 0) summaryParts.push(`${totalActivityMins} min of activity`);
  if (generatedAt) summaryParts.push(`generated ${formatGenAt(generatedAt)}`);

  return (
    <HubPage>
      <HubMasthead
        section="College"
        title={`Slides · ${plan?.title ?? 'Lesson'}`}
        backTo={planPath}
        onBack={goBack}
      />
      <HubBody pushContext="Get notified about marking, off-the-job hours and learners who need you">
        {error && <ErrorLine text={error} />}

        {loading && !deck && <LoadingSkeleton />}

        {!loading && slides.length === 0 && !generating && (
          <EmptyDeckCard onBuild={() => setPreflightOpen(true)} />
        )}

        {generating && <GenerationProgress replacing={slides.length > 0} />}

        {slides.length > 0 && (
          <>
            {/* Deck — the figures and the controls */}
            <motion.section
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              <motion.div variants={itemVariants} className="flex items-end justify-between gap-4">
                <HubSectionHeading>Deck</HubSectionHeading>
                <span className="text-right text-[11px] font-semibold tabular-nums text-white">
                  {summaryParts.join(' · ')}
                </span>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={openPresenter}
                  className={cn(buttonPrimaryCn, 'h-11 w-full text-[13px] sm:w-auto sm:px-6')}
                >
                  Present
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFocusedIndex(0);
                    setMode('single');
                  }}
                  className={CONTROL}
                >
                  Focus
                </button>
                <button
                  type="button"
                  onClick={() => void handleExportPptx()}
                  disabled={exportingPptx}
                  className={CONTROL}
                >
                  {exportingPptx ? 'Building…' : 'Download PowerPoint'}
                </button>
                {pendingImages > 0 && (
                  <button
                    type="button"
                    onClick={() => void generateMissingImages(quality)}
                    disabled={generatingImagesNow > 0}
                    className={CONTROL}
                  >
                    {generatingImagesNow > 0
                      ? 'Generating photos…'
                      : `Generate ${plural(pendingImages, 'photo')}`}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setPreflightOpen(true)}
                  disabled={generating}
                  className={CONTROL}
                >
                  {generating ? 'Rebuilding…' : 'Rebuild deck'}
                </button>
                <button type="button" onClick={() => setSettingsOpen(true)} className={CONTROL}>
                  Settings
                </button>
              </motion.div>

              {(generatingImagesNow > 0 || pendingImages > 0) && (
                <motion.div
                  variants={itemVariants}
                  className="flex items-center gap-2 text-[12px] text-white"
                >
                  <PulsingDot />
                  <span>
                    {generatingImagesNow > 0
                      ? `Generating ${plural(generatingImagesNow, 'photo')} — ${pendingImages} still to come`
                      : `${plural(pendingImages, 'photo')} queued`}
                  </span>
                </motion.div>
              )}
            </motion.section>

            {/* Slides */}
            <motion.section
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              <motion.div variants={itemVariants} className="flex items-end justify-between gap-4">
                <HubSectionHeading>{mode === 'single' ? 'Focus' : 'Slides'}</HubSectionHeading>
                <span className="text-[11px] font-semibold tabular-nums text-white">
                  {mode === 'single'
                    ? `${focusedIndex + 1} of ${slides.length}`
                    : plural(slides.length, 'slide')}
                </span>
              </motion.div>

              {mode === 'viewer' && (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext items={slideIds} strategy={verticalListSortingStrategy}>
                    <ol className="space-y-4">
                      {slides.map((slide, i) => (
                        <SortableSlideRow
                          key={slideIds[i]}
                          sortableId={slideIds[i]}
                          slide={slide}
                          index={i}
                          total={slides.length}
                          imageStatus={imageStatus[i] ?? null}
                          regenerating={regeneratingIndex === i}
                          onFocus={() => {
                            setFocusedIndex(i);
                            setMode('single');
                          }}
                          onEditOpen={() => setEditorIndex(i)}
                          onRegenerate={() => setRegenIndex(i)}
                          onNewPhoto={slide.image_prompt ? () => handleNewPhoto(i) : undefined}
                          onDelete={() => handleDelete(i)}
                          onMoveUp={i > 0 ? () => void reorderSlides(i, i - 1) : undefined}
                          onMoveDown={
                            i < slides.length - 1 ? () => void reorderSlides(i, i + 1) : undefined
                          }
                        />
                      ))}
                    </ol>
                  </SortableContext>
                </DndContext>
              )}

              {mode === 'single' && focused && (
                <motion.div variants={itemVariants} className="space-y-3">
                  <SlideCard
                    slide={focused}
                    index={focusedIndex}
                    total={slides.length}
                    imageStatus={imageStatus[focusedIndex] ?? null}
                    regenerating={regeneratingIndex === focusedIndex}
                    focused
                    onEditOpen={() => setEditorIndex(focusedIndex)}
                    onRegenerate={() => setRegenIndex(focusedIndex)}
                    onNewPhoto={
                      focused.image_prompt ? () => handleNewPhoto(focusedIndex) : undefined
                    }
                    onDelete={() => handleDelete(focusedIndex)}
                  />
                  <div className="flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setMode('viewer')}
                      className="-ml-2 flex h-11 items-center px-2 text-[12.5px] font-semibold text-white transition-colors touch-manipulation hover:text-elec-yellow"
                    >
                      ← All slides
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setFocusedIndex((i) => Math.max(0, i - 1))}
                        disabled={focusedIndex === 0}
                        className={CONTROL}
                      >
                        Previous
                      </button>
                      <button
                        type="button"
                        onClick={() => setFocusedIndex((i) => Math.min(slides.length - 1, i + 1))}
                        disabled={focusedIndex === slides.length - 1}
                        className={CONTROL}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.section>
          </>
        )}
      </HubBody>

      {/* Deck settings — export theme and photo quality */}
      <DeckSettingsSheet
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        theme={theme}
        onTheme={(t) => void setTheme(t)}
        quality={quality}
        onQuality={setQuality}
      />

      {/* Pre-flight — runs before every build so the tutor can tune
          slide count, tone, depth and differentiation. */}
      <SlideDeckPreflightDialog
        open={preflightOpen}
        onOpenChange={setPreflightOpen}
        onConfirm={handleGenerateConfirmed}
      />

      {/* Per-slide regenerate with a tweak — the edge function needs a
          prompt, so this is a sheet rather than a one-tap action. */}
      <RegenerateSlideSheet
        open={regenIndex != null}
        onOpenChange={(o) => {
          if (!o) setRegenIndex(null);
        }}
        slide={regenIndex != null ? slides[regenIndex] : null}
        index={regenIndex}
        total={slides.length}
        busy={regenIndex != null && regeneratingIndex === regenIndex}
        onRegenerate={async (tweak) => {
          if (regenIndex == null) return false;
          return await regenerateSlide(regenIndex, tweak);
        }}
      />

      {/* Per-slide editor with kind-aware fields. */}
      <SlideEditorSheet
        open={editorIndex != null}
        onOpenChange={(o) => {
          if (!o) setEditorIndex(null);
        }}
        slide={editorIndex != null ? slides[editorIndex] : null}
        slideIndex={editorIndex}
        totalSlides={slides.length}
        onSave={async (patch) => {
          if (editorIndex != null) await updateSlide(editorIndex, patch);
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
    </HubPage>
  );
}

/* ───────────────── deck settings sheet ───────────────── */

function DeckSettingsSheet({
  open,
  onOpenChange,
  theme,
  onTheme,
  quality,
  onQuality,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  theme: DeckTheme;
  onTheme: (t: DeckTheme) => void;
  quality: Quality;
  onQuality: (q: Quality) => void;
}) {
  const q = QUALITY_OPTIONS.find((o) => o.value === quality);
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        hideCloseButton
        side="bottom"
        className="h-auto max-h-[85vh] overflow-hidden rounded-t-2xl border-white/[0.06] bg-[hsl(0_0%_8%)] p-0"
      >
        <div className="flex max-h-[85vh] flex-col">
          <div className="flex flex-shrink-0 justify-center pb-1 pt-2.5">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>
          <div className="flex flex-shrink-0 items-start justify-between gap-3 border-b border-white/[0.06] px-5 pb-4">
            <div className="min-w-0">
              <SheetTitle className="text-[20px] font-semibold leading-tight text-white">
                Deck settings
              </SheetTitle>
              <SheetDescription className="mt-1 text-[12.5px] text-white">
                Saved with the deck. Neither changes the slides themselves.
              </SheetDescription>
            </div>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="-mr-2 flex h-11 shrink-0 items-center px-2 text-[12.5px] font-medium text-white touch-manipulation"
            >
              Done
            </button>
          </div>
          <div
            className="space-y-6 overflow-y-auto overscroll-contain p-5"
            style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}
          >
            <div>
              <div className="text-[12px] font-medium text-white">PowerPoint theme</div>
              <div className="mt-2 flex gap-2">
                {(['dark', 'light'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => onTheme(t)}
                    className={cn(chipBase, 'px-5', theme === t ? chipOn : chipOff)}
                  >
                    {t === 'dark' ? 'Dark' : 'Light'}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-[12px] leading-snug text-white">
                Applies to the downloaded file. Presenter mode is always dark.
              </p>
            </div>
            <div>
              <div className="text-[12px] font-medium text-white">Photo quality</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {QUALITY_OPTIONS.map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => onQuality(o.value)}
                    className={cn(chipBase, 'px-5', quality === o.value ? chipOn : chipOff)}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
              {q && (
                <p className="mt-2 text-[12px] leading-snug text-white">
                  {q.help}. Applies to photos generated from now on.
                </p>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

/* ───────────────── regenerate-slide sheet ───────────────── */

function RegenerateSlideSheet({
  open,
  onOpenChange,
  slide,
  index,
  total,
  busy,
  onRegenerate,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  slide: Slide | null;
  index: number | null;
  total: number;
  busy: boolean;
  onRegenerate: (tweak: string) => Promise<boolean>;
}) {
  const [tweak, setTweak] = useState('');
  useEffect(() => {
    if (!open) setTweak('');
  }, [open]);

  const submit = async () => {
    if (!tweak.trim() || busy) return;
    const ok = await onRegenerate(tweak.trim());
    if (ok) onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        hideCloseButton
        side="bottom"
        className="h-auto max-h-[85vh] overflow-hidden rounded-t-2xl border-white/[0.06] bg-[hsl(0_0%_8%)] p-0"
      >
        <div className="flex max-h-[85vh] flex-col">
          <div className="flex flex-shrink-0 justify-center pb-1 pt-2.5">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>
          <div className="flex flex-shrink-0 items-start justify-between gap-3 border-b border-white/[0.06] px-5 pb-4">
            <div className="min-w-0">
              <SheetTitle className="text-[20px] font-semibold leading-tight text-white">
                Regenerate slide
              </SheetTitle>
              <SheetDescription className="mt-1 truncate text-[12.5px] text-white">
                {slide && index != null
                  ? `${KIND_LABEL[slide.kind]} · slide ${index + 1} of ${total}${
                      slide.heading ? ` · ${slide.heading}` : ''
                    }`
                  : 'Slide'}
              </SheetDescription>
            </div>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="-mr-2 flex h-11 shrink-0 items-center px-2 text-[12.5px] font-medium text-white touch-manipulation"
            >
              Cancel
            </button>
          </div>
          <div className="space-y-3 overflow-y-auto overscroll-contain p-5">
            <label className="block">
              <span className="mb-1 block text-[12px] font-medium text-white">
                What should change?
              </span>
              <textarea
                value={tweak}
                onChange={(e) => setTweak(e.target.value)}
                onKeyDown={(e) => {
                  if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                    e.preventDefault();
                    void submit();
                  }
                }}
                rows={4}
                placeholder="e.g. more practical with a real on-site example, or swap the regulation cite for 411.3.2.1"
                className={cn(textareaCn, 'w-full resize-none')}
              />
            </label>
            <p className="text-[12px] leading-snug text-white">
              The rest of the deck is untouched. If the photo prompt changes, a new photo is
              generated.
            </p>
          </div>
          <div
            className="flex-shrink-0 border-t border-white/[0.06] p-4"
            style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
          >
            <button
              type="button"
              onClick={() => void submit()}
              disabled={!tweak.trim() || busy}
              className={cn(buttonPrimaryCn, 'w-full sm:w-auto sm:px-6')}
            >
              {busy ? 'Regenerating…' : 'Regenerate slide'}
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

/* ───────────────── sortable wrapper ───────────────── */

interface SlideCardProps {
  slide: Slide;
  index: number;
  total: number;
  imageStatus: ImageStatus;
  regenerating: boolean;
  focused?: boolean;
  onFocus?: () => void;
  onEditOpen: () => void;
  onRegenerate: () => void;
  onNewPhoto?: () => void;
  onDelete: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  dragHandleProps?: Record<string, unknown>;
}

function SortableSlideRow({
  sortableId,
  ...rest
}: SlideCardProps & {
  sortableId: string;
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

const ICON_CONTROL =
  'flex h-11 w-11 items-center justify-center text-[15px] leading-none text-white transition-colors touch-manipulation hover:text-elec-yellow disabled:opacity-30';

function SlideCard({
  slide,
  index,
  total,
  imageStatus,
  regenerating,
  focused = false,
  onFocus,
  onEditOpen,
  onRegenerate,
  onNewPhoto,
  onDelete,
  onMoveUp,
  onMoveDown,
  dragHandleProps,
}: SlideCardProps) {
  const isImageKind =
    slide.kind === 'image_concept' ||
    slide.kind === 'starter' ||
    (!!slide.image_prompt && (slide.kind === 'plenary' || slide.kind === 'concept'));

  return (
    <div className={cn('relative', PAGE_CARD, focused && 'border-elec-yellow/70')}>
      {regenerating && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-[12.5px] font-semibold text-white">
            <PulsingDot />
            Regenerating slide…
          </div>
        </div>
      )}

      {/* Image-led layout: photo full-bleed at the top of the card */}
      {isImageKind && (
        <SlideImage
          imageUrl={slide.image_url}
          imagePrompt={slide.image_prompt}
          status={imageStatus}
          caption={slide.image_caption}
        />
      )}

      <div className="px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px]">
          <span className="font-semibold text-elec-yellow">{KIND_LABEL[slide.kind]}</span>
          <span className="tabular-nums text-white">
            {index + 1} / {total}
          </span>
          {slide.kind === 'activity' && slide.time_minutes != null && (
            <span className="text-white">· {slide.time_minutes} min</span>
          )}
          {slide.kind === 'activity' && slide.group_size && (
            <span className="capitalize text-white">· {slide.group_size.replace(/_/g, ' ')}</span>
          )}
        </div>

        <button
          type="button"
          onClick={onEditOpen}
          className="mt-2 block text-left text-[22px] font-semibold leading-[1.1] tracking-tight text-white transition-colors touch-manipulation hover:text-elec-yellow sm:text-[28px]"
          title="Edit slide"
        >
          {slide.heading ?? '(untitled slide)'}
        </button>

        {slide.subtitle && (
          <div className="mt-2 text-[15px] leading-snug text-white sm:text-[16px]">
            {slide.subtitle}
          </div>
        )}

        <div className="mt-4">
          <SlideBody slide={slide} />
        </div>

        {slide.slide_acs && slide.slide_acs.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-1.5">
            <span className="mr-0.5 text-[11px] font-medium text-white">Maps to</span>
            {slide.slide_acs.map((ac) => (
              <span
                key={ac}
                className="inline-flex h-6 items-center rounded-md border border-white/[0.15] px-2 text-[11px] font-semibold tabular-nums text-white"
              >
                {ac}
              </span>
            ))}
          </div>
        )}

        {slide.speaker_notes && (
          <div className="mt-4 border-t border-white/[0.10] pt-3">
            <div className="text-[11px] font-semibold text-elec-yellow">Speaker notes</div>
            <p className="mt-1 whitespace-pre-line text-[13px] leading-relaxed text-white">
              {slide.speaker_notes}
            </p>
          </div>
        )}
      </div>

      {/* Actions — reorder on the left, everything else as text on the right */}
      <div className="flex flex-wrap items-center justify-between gap-x-2 border-t border-white/[0.10] px-1 py-0.5 sm:px-3">
        <div className="flex items-center">
          {(onMoveUp || onMoveDown) && (
            <>
              <button
                type="button"
                onClick={onMoveUp}
                disabled={!onMoveUp}
                aria-label="Move slide up"
                title="Move up"
                className={ICON_CONTROL}
              >
                ↑
              </button>
              <button
                type="button"
                onClick={onMoveDown}
                disabled={!onMoveDown}
                aria-label="Move slide down"
                title="Move down"
                className={ICON_CONTROL}
              >
                ↓
              </button>
            </>
          )}
          {dragHandleProps && (
            <button
              type="button"
              {...dragHandleProps}
              className={cn(ICON_CONTROL, 'hidden cursor-grab active:cursor-grabbing sm:flex')}
              aria-label="Drag to reorder"
              title="Drag to reorder"
            >
              ⠿
            </button>
          )}
        </div>
        <div className="flex flex-wrap items-center">
          <button type="button" onClick={onEditOpen} className={TEXT_ACTION}>
            Edit
          </button>
          <button
            type="button"
            onClick={onRegenerate}
            disabled={regenerating}
            className={TEXT_ACTION}
          >
            Regenerate
          </button>
          {onNewPhoto && (
            <button
              type="button"
              onClick={onNewPhoto}
              disabled={imageStatus === 'generating'}
              className={TEXT_ACTION}
            >
              {imageStatus === 'failed'
                ? 'Retry photo'
                : slide.image_url
                  ? 'New photo'
                  : 'Generate photo'}
            </button>
          )}
          {onFocus && !focused && (
            <button type="button" onClick={onFocus} className={TEXT_ACTION}>
              Focus
            </button>
          )}
          <button type="button" onClick={onDelete} className={TEXT_ACTION}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

/* ───────────────── slide image ───────────────── */

function SlideImage({
  imageUrl,
  imagePrompt,
  status,
  caption,
}: {
  imageUrl?: string;
  imagePrompt?: string;
  status: ImageStatus;
  caption?: string;
}) {
  if (imageUrl) {
    return (
      <div className="relative">
        <div className="aspect-[3/2] w-full overflow-hidden bg-black">
          <img
            src={imageUrl}
            alt={caption ?? 'Slide illustration'}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        {caption && (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-5 py-2 text-[11px] text-white">
            {caption}
          </div>
        )}
      </div>
    );
  }

  if (!imagePrompt) return null;

  // Placeholder — before generation, while generating, or after a failure.
  return (
    <div className="relative aspect-[3/2] w-full overflow-hidden border-b border-white/[0.10]">
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
        {status === 'failed' ? (
          <>
            <span className="h-8 w-[3px] rounded-full bg-red-400" aria-hidden />
            <span className="text-[12px] font-semibold text-white">
              Photo could not be generated
            </span>
          </>
        ) : (
          <>
            <PulsingDot />
            <span className="text-[12px] font-semibold text-white">
              {status === 'generating' ? 'Generating photo…' : 'Photo queued'}
            </span>
          </>
        )}
        <span className="line-clamp-3 max-w-md text-[11px] italic leading-snug text-white">
          {imagePrompt}
        </span>
      </div>
    </div>
  );
}

/* ───────────────── slide body (kind-specific) ───────────────── */

/**
 * Per-kind template for a slide on the page. Kept per kind — a regulation
 * cite still leads with its number, a stat with its figure, a comparison
 * with two columns — but every accent is volt TEXT and every inner panel is
 * a hairline, not a coloured wash.
 */
function SlideBody({ slide }: { slide: Slide }) {
  const T = 'text-white';
  const Tmuted = 'text-white';
  const KeyTermBg = 'border-white/[0.12]';
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
            <div className="text-[28px] sm:text-[36px] font-semibold text-elec-yellow tabular-nums tracking-tight leading-none">
              {slide.reg_number}
            </div>
          )}
          {(slide.clause || slide.quote) && (
            <blockquote
              className={cn('text-[18px] sm:text-[22px] leading-[1.4] italic font-light', T)}
            >
              <span className="text-elec-yellow mr-1">“</span>
              {slide.clause ?? slide.quote}
              <span className="text-elec-yellow ml-1">”</span>
            </blockquote>
          )}
          {slide.attribution && (
            <div className={cn('text-[12px] uppercase tracking-[0.18em]', Tmuted)}>
              — {slide.attribution}
            </div>
          )}
          {slide.why_it_matters && (
            <p
              className={cn('text-[14px] leading-relaxed pt-2 border-t', T, 'border-white/[0.10]')}
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
          <div className="text-[60px] sm:text-[88px] font-semibold text-elec-yellow tabular-nums tracking-tight leading-none">
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
            const accent = 'text-elec-yellow';
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
            <div className="rounded-lg border border-white/[0.12] px-4 py-3">
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
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
            <div className="rounded-lg border border-white/[0.12] px-4 py-3">
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
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
            <div className="rounded-lg border border-white/[0.12] px-4 py-3">
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-white">
                Common belief
              </div>
              <div className={cn('mt-0.5 text-[14px]', T)}>{slide.belief}</div>
            </div>
          )}
          {slide.correction && (
            <div className="rounded-lg border border-white/[0.12] px-4 py-3">
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
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
            <div className="rounded-lg border border-white/[0.12] px-4 py-3">
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
  const cls = 'w-full max-w-[640px] mx-auto rounded-lg border border-white/[0.10]';
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
        <div className="w-full aspect-video rounded-lg border border-white/[0.10] flex items-center justify-center">
          <span className="text-[12px] text-white italic">
            Diagram template "{kind}" coming soon
          </span>
        </div>
      );
  }
}

/* ───────────────── presenter mode ───────────────── */

/**
 * The thing projected in a classroom. Full-bleed black, its own type scale —
 * deliberately NOT shrunk into hub cards. Only the chrome changed: the
 * counter and eyebrow are white or volt rather than white/55, the exit
 * button is 44px, and Next is the one solid volt control.
 */
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
  slideStatus: ImageStatus;
  index: number;
  total: number;
  onExit: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const hasFullBleedImage =
    !!slide.image_url && (slide.kind === 'image_concept' || slide.kind === 'starter');

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-black text-white">
      <div className="absolute right-3 top-3 z-10 flex items-center gap-3">
        <span className="text-[12px] font-semibold tabular-nums text-white">
          {index + 1} / {total}
        </span>
        <button
          type="button"
          onClick={onExit}
          className="h-11 rounded-xl border border-white/[0.15] bg-black/50 px-4 text-[12.5px] font-medium text-white transition-colors touch-manipulation hover:bg-black/70"
        >
          Exit (Esc)
        </button>
      </div>

      {hasFullBleedImage && slide.image_url && (
        <img
          src={slide.image_url}
          alt={slide.image_caption ?? ''}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {hasFullBleedImage && (
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />
      )}

      <div className="relative z-[1] mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-5 pb-24 pt-14 sm:px-12 sm:py-12 lg:px-24">
        <div className="text-[12px] font-semibold uppercase tracking-[0.22em] text-elec-yellow">
          {KIND_LABEL[slide.kind]}
        </div>
        <h1 className="mt-3 text-[40px] font-semibold leading-[1.02] tracking-tight sm:text-[56px] lg:text-[72px]">
          {slide.heading ?? ''}
        </h1>
        {slide.subtitle && (
          <div className="mt-3 text-[20px] text-white sm:text-[26px]">{slide.subtitle}</div>
        )}
        <div className="mt-8 max-w-[1000px] text-[20px] leading-[1.5] sm:text-[26px]">
          <PresenterBody slide={slide} />
        </div>

        {!slide.image_url && slide.image_prompt && (
          <div className="mt-6 inline-flex items-center gap-2 text-[12px] text-white">
            <PulsingDot />
            <span>{slideStatus === 'generating' ? 'Photo generating…' : 'Photo queued'}</span>
          </div>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between p-3 sm:p-4">
        <button
          type="button"
          onClick={onPrev}
          disabled={index === 0}
          className="h-12 rounded-xl border border-white/[0.15] bg-black/50 px-5 text-[14px] font-medium text-white transition-colors touch-manipulation hover:bg-black/70 disabled:opacity-30"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={index === total - 1}
          className={cn(buttonPrimaryCn, 'px-6')}
        >
          Next
        </button>
      </div>
    </div>
  );
}

/**
 * Per-kind template at presentation scale. Accents are volt text; the
 * cyan / amber / purple / emerald / rose of the first version went.
 */
function PresenterBody({ slide }: { slide: Slide }) {
  switch (slide.kind) {
    case 'objectives':
    case 'summary':
      return (
        <ul className="ml-6 list-outside list-disc space-y-4">
          {(slide.bullets ?? []).map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      );
    case 'big_stat':
      return (
        <div className="space-y-3">
          {slide.stat_value && (
            <div className="text-[120px] font-semibold leading-none tabular-nums text-elec-yellow sm:text-[180px]">
              {slide.stat_value}
            </div>
          )}
          {slide.stat_caption && <p className="text-[24px] sm:text-[32px]">{slide.stat_caption}</p>}
          {slide.stat_source && (
            <div className="text-[14px] uppercase tracking-[0.18em] text-white">
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
            <div className="text-[60px] font-semibold leading-none tabular-nums text-elec-yellow sm:text-[80px]">
              {slide.reg_number}
            </div>
          )}
          {(slide.clause || slide.quote) && (
            <p className="text-[28px] font-light italic leading-[1.35] sm:text-[36px]">
              <span className="mr-1 text-elec-yellow">“</span>
              {slide.clause ?? slide.quote}
              <span className="ml-1 text-elec-yellow">”</span>
            </p>
          )}
          {slide.attribution && (
            <div className="text-[16px] uppercase tracking-[0.18em] text-white">
              — {slide.attribution}
            </div>
          )}
          {slide.why_it_matters && <p className="pt-4 text-[18px]">{slide.why_it_matters}</p>}
        </div>
      );
    case 'two_column':
      return (
        <div className="grid grid-cols-2 gap-8">
          {(['left', 'right'] as const).map((side) => {
            const heading = side === 'left' ? slide.left_heading : slide.right_heading;
            const body = side === 'left' ? slide.left_body : slide.right_body;
            const bullets = side === 'left' ? slide.left_bullets : slide.right_bullets;
            return (
              <div key={side}>
                {heading && (
                  <div className="text-[14px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
                    {heading}
                  </div>
                )}
                {body && <p className="mt-2 whitespace-pre-line">{body}</p>}
                {bullets && (
                  <ul className="ml-6 mt-2 list-outside list-disc space-y-1.5 text-[18px]">
                    {bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
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
            <div className="text-[18px] text-elec-yellow">Success: {slide.success_criteria}</div>
          )}
          {slide.time_minutes != null && (
            <div className="text-[18px] text-white">{slide.time_minutes} minutes</div>
          )}
        </div>
      );
    case 'worked_example':
      return (
        <div className="space-y-4">
          {slide.problem && <div className="whitespace-pre-line">{slide.problem}</div>}
          {slide.solution_steps && (
            <ol className="ml-6 list-outside list-decimal space-y-3">
              {slide.solution_steps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          )}
        </div>
      );
    case 'check_understanding':
      return (
        <ol className="ml-6 list-outside list-decimal space-y-4">
          {(slide.questions ?? []).map((q, i) => (
            <li key={i}>{q}</li>
          ))}
        </ol>
      );
    case 'misconception':
      return (
        <div className="space-y-6">
          {slide.belief && (
            <div>
              <span className="mb-2 block text-[14px] font-semibold uppercase tracking-[0.18em] text-white">
                Common belief
              </span>
              {slide.belief}
            </div>
          )}
          {slide.correction && (
            <div>
              <span className="mb-2 block text-[14px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
                Actually
              </span>
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
  { label: 'Reading the lesson plan…', minSec: 0 },
  { label: 'Mapping objectives to BS 7671…', minSec: 6 },
  { label: 'Drafting the slides…', minSec: 14 },
  { label: 'Selecting regulation citations…', minSec: 24 },
  { label: 'Composing photo prompts…', minSec: 34 },
  { label: 'Tidying the wording…', minSec: 46 },
  { label: 'Almost there…', minSec: 56 },
];

const ESTIMATED_DECK_SEC = 60;

function GenerationProgress({ replacing }: { replacing: boolean }) {
  const [elapsed, setElapsed] = useState(0);
  const startedAt = useRef(Date.now());

  useEffect(() => {
    const id = setInterval(() => {
      setElapsed(Math.round((Date.now() - startedAt.current) / 1000));
    }, 250);
    return () => clearInterval(id);
  }, []);

  // Pseudo-progress: smooth ramp to 95% over the estimated duration, then
  // holds there until the deck actually returns. This avoids a janky
  // "stuck at 100% for 20s" feel.
  const progress = Math.min(95, (elapsed / ESTIMATED_DECK_SEC) * 95);

  const currentStage =
    [...GENERATION_STAGES].reverse().find((s) => elapsed >= s.minSec) ?? GENERATION_STAGES[0];

  const remainingSec = Math.max(0, ESTIMATED_DECK_SEC - elapsed);

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      <HubSectionHeading>
        {replacing ? 'Rebuilding the deck' : 'Building the deck'}
      </HubSectionHeading>
      <motion.div variants={itemVariants} className={cn(PAGE_CARD, 'px-4 py-5 sm:px-6')}>
        <div className="flex items-center gap-2">
          <PulsingDot />
          <span className="text-[17px] font-semibold leading-tight tracking-tight text-white">
            {currentStage.label}
          </span>
        </div>
        <div className="mt-2 text-[12px] tabular-nums text-white">
          {elapsed}s elapsed · about {remainingSec}s left · then a few seconds a photo
        </div>
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.10]">
          <motion.div
            className="h-full rounded-full bg-elec-yellow"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
        {replacing && (
          <p className="mt-3 text-[12px] leading-snug text-white">
            The current slides stay below until the new deck replaces them.
          </p>
        )}
      </motion.div>
      {!replacing && (
        <motion.div variants={itemVariants} className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonSlide key={i} index={i} />
          ))}
        </motion.div>
      )}
    </motion.section>
  );
}

function PulsingDot() {
  return (
    <span className="relative inline-flex h-2.5 w-2.5 shrink-0">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-elec-yellow opacity-70" />
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-elec-yellow" />
    </span>
  );
}

function SkeletonSlide({ index }: { index: number }) {
  const hasImage = index === 0 || index === 2;
  const headingWidth = ['w-2/3', 'w-1/2', 'w-3/4'][index % 3];
  return (
    <div className={cn(PAGE_CARD, 'animate-pulse')} aria-hidden>
      {hasImage && <div className="aspect-[3/2] w-full border-b border-white/[0.10]" />}
      <div className="space-y-3 px-4 py-5 sm:px-6">
        <div className="flex items-center gap-2">
          <div className="h-3 w-16 rounded bg-white/[0.12]" />
          <div className="h-3 w-8 rounded bg-white/[0.08]" />
        </div>
        <div className={cn('h-7 rounded bg-white/[0.12]', headingWidth)} />
        <div className="space-y-1.5">
          <div className="h-3 w-full rounded bg-white/[0.08]" />
          <div className="h-3 w-5/6 rounded bg-white/[0.08]" />
        </div>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4" aria-busy>
      {Array.from({ length: 3 }).map((_, i) => (
        <SkeletonSlide key={i} index={i} />
      ))}
    </div>
  );
}

/* ───────────────── empty state ───────────────── */

function EmptyDeckCard({ onBuild }: { onBuild: () => void }) {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      <HubSectionHeading>Slide deck</HubSectionHeading>
      <motion.div variants={itemVariants} className={cn(PAGE_CARD, 'px-4 py-5 sm:px-6 sm:py-6')}>
        <div className="text-[17px] font-semibold leading-tight tracking-tight text-white">
          No slide deck yet
        </div>
        <p className="mt-2 max-w-prose text-[13px] leading-relaxed text-white">
          A deck is built from this lesson plan: a title, the objectives, a starter, the concepts
          and regulation cites, the activities, a check for understanding, a summary and a plenary.
          Every slide has speaker notes and maps to its assessment criteria. Photos are generated
          for the slides that call for one. You can edit any slide, regenerate one with a note, and
          present the deck full-screen.
        </p>
        <button
          type="button"
          onClick={onBuild}
          className={cn(buttonPrimaryCn, 'mt-5 w-full sm:w-auto sm:px-6')}
        >
          Build the slide deck
        </button>
      </motion.div>
    </motion.section>
  );
}

/* ───────────────── error line ───────────────── */

/** Red is reserved for a genuine problem — a failed build is one. */
function ErrorLine({ text }: { text: string }) {
  return (
    <div
      role="alert"
      className={cn(PAGE_CARD, 'flex items-center gap-3 border-red-400/50 px-4 py-3 sm:px-5')}
    >
      <span aria-hidden className="h-8 w-[3px] shrink-0 rounded-full bg-red-400" />
      <span className="text-[13px] font-medium leading-snug text-white">{text}</span>
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
