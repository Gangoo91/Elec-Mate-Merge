import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
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
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import { PageHelpButton, type PageHelpContent } from '@/components/hub/PageHelp';
import {
  COLLEGE_BTN,
  COLLEGE_BTN_PRIMARY,
  CollegeHeading,
  CollegePageHeader,
  chipCn,
} from '@/components/college/ui/CollegeUi';
import { FormSheet } from '@/components/forms/FormSheet';
import { inputCn, labelCn, textareaCn } from '@/components/forms/fieldStyles';
import { useSlideDeck, type Slide, type DeckPreflight, type DeckTheme } from '@/hooks/useSlideDeck';
import { SlideEditorSheet } from '@/components/college/sheets/SlideEditorSheet';
import { SlideDeckPreflightDialog } from '@/components/college/dialogs/SlideDeckPreflightDialog';
import { SlideCanvas, type ImageState } from '@/components/college/slides/SlideCanvas';
import {
  KIND_LABEL,
  WORDS_COMFORTABLE,
  cleanSlideText,
  missingReference,
  normaliseSlide,
  slideWordCount,
  wantsPhoto,
} from '@/components/college/slides/slideContent';
import { exportSlideDeckToPptx } from '@/lib/exportSlideDeckToPptx';
import { cn } from '@/lib/utils';

/* ==========================================================================
   LessonSlideDeckPage — /college/lessons/:id/slides

   The slide deck that goes with a lesson plan: build it, check and edit it,
   present it, download it.

   - Every slide is drawn by SlideCanvas, the same 16:9 stage in the overview
     grid, the editor and on the projector, so what the tutor checks is what
     the class sees. Type is sized for the back of a workshop and long text
     steps down to fit, then gets flagged.
   - Overview: a grid of slides. Tap one to edit it (?slide=N, so the back
     button and a shared link both work).
   - Editor: the slide large, the heading and speaker notes editable in
     place, every other field in the full editor sheet, and "Regenerate with
     a note" for an AI redo of just that slide.
   - Present: full screen, keyboard and swipe, a countdown for activities,
     and a presenter view (N) with notes, the next slide and the clocks.
   - Download: a PowerPoint file built from the same content rules.

   ELE-942 / [F1.2].
   ========================================================================== */

const HELP: PageHelpContent = {
  id: 'college-slide-deck',
  title: 'Slides for a lesson',
  what: 'A slide deck built from the lesson plan, ready to present here or download as PowerPoint.',
  steps: [
    {
      title: 'Build it',
      body: 'Build the deck and choose how many slides, the tone and the depth. Photos are added after the text.',
    },
    {
      title: 'Check and edit it',
      body: 'Tap a slide to open it. Change the heading and notes in place, open the full editor for the rest, or ask for that one slide to be redone with a note.',
    },
    {
      title: 'Present it',
      body: 'Present opens full screen. Arrow keys or a swipe move between slides. Press N for your notes, the next slide and a clock. Press T to start an activity timer.',
    },
    {
      title: 'Take it with you',
      body: 'Download PowerPoint gives you a file with your speaker notes in it.',
    },
  ],
  notes: [
    {
      title: 'How it is made',
      body: 'Slide text and photos are drafted by AI from the lesson plan and the regulation extracts linked to it. Regulation slides paraphrase their source and name it. Check every slide before you teach from it.',
    },
  ],
};

type Quality = 'low' | 'medium' | 'high';

const QUALITY_OPTIONS: Array<{ value: Quality; label: string; help: string }> = [
  { value: 'low', label: 'Standard', help: 'About £0.40 a photo' },
  { value: 'medium', label: 'Better', help: 'About £2 a photo' },
  { value: 'high', label: 'Best', help: 'About £8 a photo' },
];

const QUICK_NOTES = [
  'Shorter. Six bullets at most, twelve words each.',
  'More practical, with an on-site example.',
  'Simpler language for learners new to this.',
  'Add a question to check understanding.',
  'A different photo idea.',
];

const SHORTER_NOTE =
  'Too much text for a projector. Keep the same points but cut it to six short bullets or two short sentences, twelve words each at most.';

/** The volt button, disabled as a neutral grey: a faded volt reads as brown. */
const PRIMARY = cn(
  COLLEGE_BTN_PRIMARY,
  'disabled:bg-white/[0.08] disabled:text-white disabled:opacity-100'
);

function plural(n: number, one: string, many = `${one}s`): string {
  return `${n} ${n === 1 ? one : many}`;
}

export default function LessonSlideDeckPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
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

  const [quality, setQuality] = useState<Quality>('medium');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [preflightOpen, setPreflightOpen] = useState(false);
  const [rebuildOpen, setRebuildOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [regenIndex, setRegenIndex] = useState<number | null>(null);
  const [presentFrom, setPresentFrom] = useState<number | null>(null);
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const [overflow, setOverflow] = useState<Record<number, boolean>>({});

  const theme: DeckTheme = deck?.theme ?? 'dark';
  const planPath = `/college/lessons/${id}`;
  const slides = useMemo(() => deck?.slides ?? [], [deck]);
  const lessonTitle = plan?.title ? cleanSlideText(plan.title) : 'Lesson';

  // ?slide=N (1-based) opens the editor on that slide.
  const slideParam = Number(params.get('slide'));
  const selected =
    Number.isFinite(slideParam) && slideParam >= 1 && slideParam <= slides.length
      ? slideParam - 1
      : null;
  const openSlide = useCallback(
    (i: number | null, replace = false) => {
      setParams(
        (p) => {
          const next = new URLSearchParams(p);
          if (i == null) next.delete('slide');
          else next.set('slide', String(i + 1));
          return next;
        },
        { replace }
      );
    },
    [setParams]
  );

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
  const failedImages = useMemo(
    () =>
      Object.entries(imageStatus).filter(
        ([i, v]) => v === 'failed' && !slides[Number(i)]?.image_url
      ).length,
    [imageStatus, slides]
  );
  const longSlides = useMemo(
    () => slides.map((_, i) => i).filter((i) => overflow[i]).length,
    [slides, overflow]
  );

  // Auto-fire photo generation for prompts we have not fired for yet. Keyed
  // by the prompt string, so a regenerated slide with a new prompt re-fires.
  const firedPromptsRef = useRef<Map<number, string>>(new Map());
  useEffect(() => {
    if (!slides.length) return;
    let any = false;
    slides.forEach((s, i) => {
      if (!s.image_prompt || s.image_url) return;
      if (firedPromptsRef.current.get(i) === s.image_prompt) return;
      firedPromptsRef.current.set(i, s.image_prompt);
      any = true;
    });
    if (any) void generateMissingImages(quality);
  }, [slides, generateMissingImages, quality]);

  useEffect(() => {
    if (generating) firedPromptsRef.current = new Map();
  }, [generating]);

  // Overflow flags are per index; reset them when the deck changes shape.
  useEffect(() => {
    setOverflow({});
  }, [slides.length, deck?.generated_at]);

  const reportOverflow = useCallback((i: number, over: boolean) => {
    setOverflow((o) => (!!o[i] === over ? o : { ...o, [i]: over }));
  }, []);

  const handleGenerateConfirmed = useCallback(
    async (preflight: DeckPreflight) => {
      firedPromptsRef.current = new Map();
      openSlide(null, true);
      await generate(preflight);
    },
    [generate, openSlide]
  );

  const handleExport = useCallback(async () => {
    if (!deck || !plan) return;
    setExporting(true);
    setExportError(null);
    try {
      await exportSlideDeckToPptx({ deck, lessonTitle, brand, theme });
    } catch (e) {
      console.error('PowerPoint export failed', e);
      setExportError('The PowerPoint file could not be made. Try again.');
    } finally {
      setExporting(false);
    }
  }, [deck, plan, lessonTitle, brand, theme]);

  const handleNewPhoto = useCallback(
    (i: number) => {
      const s = slides[i];
      if (!s?.image_prompt) return;
      firedPromptsRef.current.set(i, s.image_prompt);
      void generateSlideImage(i, s.image_prompt, quality);
    },
    [slides, generateSlideImage, quality]
  );

  const goBack = useCallback(() => {
    if (window.history.length > 1) navigate(-1);
    else navigate(planPath);
  }, [navigate, planPath]);

  if (presentFrom != null && slides.length > 0) {
    return (
      <PresentMode
        slides={slides}
        startAt={presentFrom}
        lessonTitle={lessonTitle}
        collegeName={brand?.name ?? null}
        theme={theme}
        imageStatus={imageStatus}
        onExit={(at) => {
          setPresentFrom(null);
          if (selected != null) openSlide(at, true);
        }}
      />
    );
  }

  const summaryParts: string[] = [];
  if (plan?.duration_minutes) summaryParts.push(`${plan.duration_minutes} min lesson`);
  summaryParts.push(plural(slides.length, 'slide'));
  if (totalActivityMins > 0) summaryParts.push(`${totalActivityMins} min of activity`);
  if (generatedAt) summaryParts.push(`built ${formatGenAt(generatedAt)}`);

  return (
    <HubPage ground="landing">
      <HubMasthead
        section="College"
        title={`Slides · ${lessonTitle}`}
        backTo={planPath}
        onBack={goBack}
        trailing={<PageHelpButton help={HELP} compact />}
      />
      <HubBody pushContext="Get notified about marking, off-the-job hours and learners who need you">
        <CollegePageHeader
          eyebrow="Slides"
          title={plan ? lessonTitle : 'Lesson slides'}
          description={
            slides.length > 0
              ? summaryParts.join(' · ')
              : 'Build a slide deck from this lesson plan, then present it or download it.'
          }
          actions={
            slides.length > 0 && !generating ? (
              <>
                <button
                  type="button"
                  onClick={() => setPresentFrom(selected ?? 0)}
                  className={cn(COLLEGE_BTN_PRIMARY, 'px-6')}
                >
                  {selected != null ? `Present from slide ${selected + 1}` : 'Present'}
                </button>
                <button
                  type="button"
                  onClick={() => void handleExport()}
                  disabled={exporting}
                  className={COLLEGE_BTN}
                >
                  {exporting ? 'Making the file…' : 'Download PowerPoint'}
                </button>
                <button type="button" onClick={() => setRebuildOpen(true)} className={COLLEGE_BTN}>
                  Rebuild
                </button>
                <button type="button" onClick={() => setSettingsOpen(true)} className={COLLEGE_BTN}>
                  Settings
                </button>
              </>
            ) : undefined
          }
        />

        {error && <ErrorLine text={error} />}
        {exportError && <ErrorLine text={exportError} />}

        {loading && !deck && <LoadingSkeleton />}

        {!loading && slides.length === 0 && !generating && (
          <EmptyDeckCard onBuild={() => setPreflightOpen(true)} />
        )}

        {generating && <GenerationProgress replacing={slides.length > 0} />}

        {slides.length > 0 && !generating && (
          <StatusLine
            generating={generatingImagesNow}
            pending={pendingImages}
            failed={failedImages}
            longSlides={longSlides}
            onRetryPhotos={() => void generateMissingImages(quality)}
          />
        )}

        {slides.length > 0 && selected == null && (
          <DeckOverview
            slides={slides}
            lessonTitle={lessonTitle}
            collegeName={brand?.name ?? null}
            theme={theme}
            imageStatus={imageStatus}
            overflow={overflow}
            onOverflow={reportOverflow}
            onOpen={(i) => openSlide(i)}
            onReorder={(from, to) => void reorderSlides(from, to)}
          />
        )}

        {slides.length > 0 && selected != null && slides[selected] && (
          <SlideEditorView
            key={selected}
            slide={slides[selected]}
            index={selected}
            total={slides.length}
            lessonTitle={lessonTitle}
            collegeName={brand?.name ?? null}
            theme={theme}
            imageStatus={imageStatus[selected] ?? null}
            regenerating={regeneratingIndex === selected}
            overflowing={!!overflow[selected]}
            onOverflow={(o) => reportOverflow(selected, o)}
            onGo={(i) => openSlide(i, true)}
            onAll={() => openSlide(null)}
            onSave={(patch) => updateSlide(selected, patch)}
            onEditAll={() => setEditorOpen(true)}
            onRegenerate={() => setRegenIndex(selected)}
            onShorter={() => void regenerateSlide(selected, SHORTER_NOTE)}
            onNewPhoto={slides[selected].image_prompt ? () => handleNewPhoto(selected) : undefined}
            onMove={(to) => {
              void reorderSlides(selected, to);
              openSlide(to, true);
            }}
            onDuplicate={() => {
              void duplicateSlide(selected);
              openSlide(selected + 1, true);
            }}
            onDelete={() => {
              void deleteSlide(selected);
              if (slides.length <= 1) openSlide(null, true);
              else openSlide(Math.min(selected, slides.length - 2), true);
            }}
            onPresent={() => setPresentFrom(selected)}
          />
        )}
      </HubBody>

      <DeckSettingsSheet
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        theme={theme}
        onTheme={(t) => void setTheme(t)}
        quality={quality}
        onQuality={setQuality}
      />

      <RebuildSheet
        open={rebuildOpen}
        onOpenChange={setRebuildOpen}
        count={slides.length}
        onContinue={() => {
          setRebuildOpen(false);
          setPreflightOpen(true);
        }}
      />

      <SlideDeckPreflightDialog
        open={preflightOpen}
        onOpenChange={setPreflightOpen}
        onConfirm={handleGenerateConfirmed}
      />

      <RegenerateSlideSheet
        open={regenIndex != null}
        onOpenChange={(o) => {
          if (!o) setRegenIndex(null);
        }}
        slide={regenIndex != null ? (slides[regenIndex] ?? null) : null}
        index={regenIndex}
        total={slides.length}
        lessonTitle={lessonTitle}
        theme={theme}
        busy={regenIndex != null && regeneratingIndex === regenIndex}
        onRegenerate={async (note) => {
          if (regenIndex == null) return false;
          return await regenerateSlide(regenIndex, note);
        }}
      />

      <SlideEditorSheet
        open={editorOpen && selected != null}
        onOpenChange={setEditorOpen}
        slide={selected != null ? (slides[selected] ?? null) : null}
        slideIndex={selected}
        totalSlides={slides.length}
        onSave={async (patch) => {
          if (selected != null) await updateSlide(selected, patch);
        }}
        onDuplicate={async () => {
          if (selected != null) {
            await duplicateSlide(selected);
            setEditorOpen(false);
            openSlide(selected + 1, true);
          }
        }}
        onDelete={async () => {
          if (selected != null) {
            await deleteSlide(selected);
            setEditorOpen(false);
            openSlide(slides.length <= 1 ? null : Math.min(selected, slides.length - 2), true);
          }
        }}
      />
    </HubPage>
  );
}

/* ───────────────── status line ───────────────── */

function StatusLine({
  generating,
  pending,
  failed,
  longSlides,
  onRetryPhotos,
}: {
  generating: number;
  pending: number;
  failed: number;
  longSlides: number;
  onRetryPhotos: () => void;
}) {
  const parts: string[] = [];
  if (generating > 0) parts.push(`Making ${plural(generating, 'photo')}`);
  else if (pending > 0 && failed === 0) parts.push(`${plural(pending, 'photo')} to come`);
  if (failed > 0) parts.push(`${plural(failed, 'photo')} could not be made`);
  if (longSlides > 0)
    parts.push(`${plural(longSlides, 'slide')} with too much text for a projector`);
  if (!parts.length) return null;
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-white">
      {generating > 0 && <PulsingDot />}
      <span>{parts.join(' · ')}</span>
      {failed > 0 && generating === 0 && (
        <button
          type="button"
          onClick={onRetryPhotos}
          className="flex h-11 items-center px-1 font-semibold text-elec-yellow touch-manipulation"
        >
          Try the photos again
        </button>
      )}
    </div>
  );
}

/* ───────────────── overview grid ───────────────── */

function DeckOverview({
  slides,
  lessonTitle,
  collegeName,
  theme,
  imageStatus,
  overflow,
  onOverflow,
  onOpen,
  onReorder,
}: {
  slides: Slide[];
  lessonTitle: string;
  collegeName: string | null;
  theme: DeckTheme;
  imageStatus: Record<number, 'generating' | 'ready' | 'failed'>;
  overflow: Record<number, boolean>;
  onOverflow: (i: number, over: boolean) => void;
  onOpen: (i: number) => void;
  onReorder: (from: number, to: number) => void;
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
  const ids = useMemo(() => slides.map((_, i) => `slide-${i}`), [slides]);
  const onDragEnd = (e: DragEndEvent) => {
    if (!e.over || e.active.id === e.over.id) return;
    const from = ids.indexOf(String(e.active.id));
    const to = ids.indexOf(String(e.over.id));
    if (from !== -1 && to !== -1) onReorder(from, to);
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      <div className="flex items-end justify-between gap-4">
        <CollegeHeading>All slides</CollegeHeading>
        <span className="hidden text-[12.5px] text-white sm:inline">
          Tap a slide to edit it. Drag the handle to reorder.
        </span>
      </div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={ids} strategy={rectSortingStrategy}>
          <ol className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {slides.map((s, i) => (
              <SortableThumb
                key={ids[i]}
                id={ids[i]}
                slide={s}
                index={i}
                total={slides.length}
                lessonTitle={lessonTitle}
                collegeName={collegeName}
                theme={theme}
                imageStatus={imageStatus[i] ?? null}
                overflowing={!!overflow[i]}
                onOverflow={(o) => onOverflow(i, o)}
                onOpen={() => onOpen(i)}
              />
            ))}
          </ol>
        </SortableContext>
      </DndContext>
    </motion.section>
  );
}

function SortableThumb({
  id,
  slide,
  index,
  total,
  lessonTitle,
  collegeName,
  theme,
  imageStatus,
  overflowing,
  onOverflow,
  onOpen,
}: {
  id: string;
  slide: Slide;
  index: number;
  total: number;
  lessonTitle: string;
  collegeName: string | null;
  theme: DeckTheme;
  imageStatus: ImageState;
  overflowing: boolean;
  onOverflow: (o: boolean) => void;
  onOpen: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });
  const heading = cleanSlideText(slide.heading) || 'Untitled slide';
  const flags: string[] = [];
  if (overflowing) flags.push('Too much text');
  if (imageStatus === 'failed' && !slide.image_url) flags.push('Photo failed');
  if (missingReference(slide)) flags.push('No section given');
  if (!slide.speaker_notes) flags.push('No notes');
  return (
    <li
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 20 : undefined,
      }}
      className={cn('min-w-0', isDragging && 'opacity-70')}
    >
      <button
        type="button"
        data-testid="slide-thumb"
        aria-label={`Slide ${index + 1}, ${KIND_LABEL[slide.kind]}: ${heading}`}
        onClick={onOpen}
        className="card-surface-interactive block w-full overflow-hidden p-0 text-left touch-manipulation focus-visible:outline focus-visible:outline-2 focus-visible:outline-elec-yellow"
      >
        <div className="pointer-events-none">
          <SlideCanvas
            slide={slide}
            index={index}
            total={total}
            lessonTitle={lessonTitle}
            collegeName={collegeName}
            theme={theme}
            imageStatus={imageStatus}
            showPlaceholders
            onOverflow={onOverflow}
          />
        </div>
      </button>
      <div className="mt-1.5 flex items-start gap-2">
        <div className="min-w-0 flex-1 pt-1.5">
          <div className="flex flex-wrap items-baseline gap-x-2 text-[12.5px] text-white">
            <span className="font-semibold tabular-nums">{index + 1}</span>
            <span className="font-semibold text-elec-yellow">{KIND_LABEL[slide.kind]}</span>
            {flags.map((f) => (
              <span key={f} className="font-semibold text-orange-300">
                {f}
              </span>
            ))}
          </div>
          <div className="mt-0.5 truncate text-[14px] font-medium text-white">{heading}</div>
        </div>
        <button
          type="button"
          {...attributes}
          {...listeners}
          aria-label={`Drag slide ${index + 1} to reorder`}
          className="hidden h-11 w-11 shrink-0 cursor-grab items-center justify-center rounded-xl text-[18px] text-white touch-manipulation hover:text-elec-yellow active:cursor-grabbing sm:flex"
        >
          ⠿
        </button>
      </div>
    </li>
  );
}

/* ───────────────── slide editor view ───────────────── */

function SlideEditorView({
  slide,
  index,
  total,
  lessonTitle,
  collegeName,
  theme,
  imageStatus,
  regenerating,
  overflowing,
  onOverflow,
  onGo,
  onAll,
  onSave,
  onEditAll,
  onRegenerate,
  onShorter,
  onNewPhoto,
  onMove,
  onDuplicate,
  onDelete,
  onPresent,
}: {
  slide: Slide;
  index: number;
  total: number;
  lessonTitle: string;
  collegeName: string | null;
  theme: DeckTheme;
  imageStatus: ImageState;
  regenerating: boolean;
  overflowing: boolean;
  onOverflow: (o: boolean) => void;
  onGo: (i: number) => void;
  onAll: () => void;
  onSave: (patch: Partial<Slide>) => Promise<void> | void;
  onEditAll: () => void;
  onRegenerate: () => void;
  onShorter: () => void;
  onNewPhoto?: () => void;
  onMove: (to: number) => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onPresent: () => void;
}) {
  const [heading, setHeading] = useState(slide.heading ?? '');
  const [notes, setNotes] = useState(slide.speaker_notes ?? '');
  const [saved, setSaved] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Follow the slide when it changes underneath (regenerate, full editor).
  useEffect(() => setHeading(slide.heading ?? ''), [slide.heading]);
  useEffect(() => setNotes(slide.speaker_notes ?? ''), [slide.speaker_notes]);
  useEffect(() => {
    if (!confirmDelete) return;
    const t = setTimeout(() => setConfirmDelete(false), 4000);
    return () => clearTimeout(t);
  }, [confirmDelete]);

  const save = async (patch: Partial<Slide>) => {
    setSaved('saving');
    await onSave(patch);
    setSaved('saved');
  };

  const clean = normaliseSlide(slide);
  const words = slideWordCount(clean);
  const photoState = slide.image_url
    ? 'New photo'
    : imageStatus === 'generating'
      ? 'Making photo…'
      : imageStatus === 'failed'
        ? 'Try the photo again'
        : 'Make the photo';

  return (
    <motion.section
      data-testid="slide-editor"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <button
          type="button"
          onClick={onAll}
          className="-ml-1 flex h-11 items-center px-1 text-[13.5px] font-semibold text-white touch-manipulation hover:text-elec-yellow"
        >
          ← All slides
        </button>
        <div className="flex items-center gap-2">
          <span className="mr-1 text-[13px] font-semibold tabular-nums text-white">
            Slide {index + 1} of {total}
          </span>
          <button
            type="button"
            onClick={() => onGo(index - 1)}
            disabled={index === 0}
            className={COLLEGE_BTN}
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => onGo(index + 1)}
            disabled={index === total - 1}
            className={COLLEGE_BTN}
          >
            Next
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="min-w-0 space-y-3">
          <div className="relative -mx-4 overflow-hidden border-y border-white/[0.08] sm:mx-0 sm:rounded-2xl sm:border-x">
            <SlideCanvas
              slide={slide}
              index={index}
              total={total}
              lessonTitle={lessonTitle}
              collegeName={collegeName}
              theme={theme}
              imageStatus={imageStatus}
              showPlaceholders
              onOverflow={onOverflow}
            />
            {/* On a phone the preview is small: tap it to see it full size. */}
            <button
              type="button"
              onClick={onPresent}
              aria-label="Show this slide full screen"
              className="absolute inset-0 touch-manipulation sm:hidden"
            />
            {regenerating && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                <div className="flex items-center gap-2 text-[14px] font-semibold text-white">
                  <PulsingDot />
                  Redoing this slide…
                </div>
              </div>
            )}
          </div>

          {overflowing && (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border border-orange-400/60 px-4 py-2 text-[13px] text-white">
              <span className="min-w-0 flex-1">
                Too much text to read from the back of the room ({words} words). Cut it, or let the
                AI make it shorter.
              </span>
              <button
                type="button"
                onClick={onShorter}
                disabled={regenerating}
                className="flex h-11 items-center px-1 font-semibold text-elec-yellow touch-manipulation disabled:opacity-40"
              >
                Make it shorter
              </button>
            </div>
          )}
          {missingReference(slide) && (
            <div className="rounded-xl border border-orange-400/60 px-4 py-3 text-[13px] text-white">
              This regulation slide does not name a section. Check the wording against the
              regulations before you teach it, or regenerate it with a note naming the regulation.
            </div>
          )}
          {!overflowing && words > WORDS_COMFORTABLE && (
            <p className="text-[12.5px] text-white">
              {words} words on this slide. It fits, but fewer words read better on a projector.
            </p>
          )}

          <JumpRow total={total} current={index} onGo={onGo} />
        </div>

        <aside className="card-surface -mx-4 space-y-5 rounded-none p-5 sm:mx-0 sm:rounded-2xl">
          <div className="flex items-baseline justify-between gap-3">
            <div className="text-[12px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
              {KIND_LABEL[slide.kind]}
            </div>
            <span className="text-[12px] text-white" aria-live="polite">
              {saved === 'saving' ? 'Saving…' : saved === 'saved' ? 'Saved' : ''}
            </span>
          </div>

          <label className="block">
            <span className={labelCn}>Heading</span>
            <input
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              onBlur={() => {
                if (heading.trim() !== (slide.heading ?? '').trim())
                  void save({ heading: heading.trim() });
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
              }}
              className={inputCn}
            />
          </label>

          <label className="block">
            <span className={labelCn}>Speaker notes (only you see these)</span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onBlur={() => {
                if (notes.trim() !== (slide.speaker_notes ?? '').trim())
                  void save({ speaker_notes: notes.trim() });
              }}
              rows={6}
              placeholder="What you will say, the question you will ask, and how you will check they have it."
              className={cn(textareaCn, 'min-h-[150px]')}
            />
          </label>

          {(clean.slide_acs ?? []).length > 0 && (
            <div>
              <div className={labelCn}>Assessment criteria</div>
              <div className="flex flex-wrap gap-1.5">
                {(clean.slide_acs ?? []).map((ac) => (
                  <span
                    key={ac}
                    className="inline-flex h-8 items-center rounded-lg border border-white/[0.15] px-2.5 text-[12.5px] font-semibold tabular-nums text-white"
                  >
                    {ac}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={onEditAll} className={cn(COLLEGE_BTN, 'col-span-2')}>
              Edit all the slide text
            </button>
            <button
              type="button"
              onClick={onRegenerate}
              disabled={regenerating}
              className={cn(COLLEGE_BTN, 'col-span-2')}
            >
              Regenerate with a note
            </button>
            {onNewPhoto && wantsPhoto(slide) && (
              <button
                type="button"
                onClick={onNewPhoto}
                disabled={imageStatus === 'generating'}
                className={cn(COLLEGE_BTN, 'col-span-2')}
              >
                {photoState}
              </button>
            )}
            <button
              type="button"
              onClick={() => onMove(index - 1)}
              disabled={index === 0}
              className={COLLEGE_BTN}
            >
              Move earlier
            </button>
            <button
              type="button"
              onClick={() => onMove(index + 1)}
              disabled={index === total - 1}
              className={COLLEGE_BTN}
            >
              Move later
            </button>
            <button type="button" onClick={onDuplicate} className={COLLEGE_BTN}>
              Duplicate
            </button>
            <button
              type="button"
              onClick={() => (confirmDelete ? onDelete() : setConfirmDelete(true))}
              className={cn(COLLEGE_BTN, confirmDelete && 'border-red-400 text-white')}
            >
              {confirmDelete ? 'Tap to delete' : 'Delete'}
            </button>
          </div>

          <button type="button" onClick={onPresent} className={cn(COLLEGE_BTN_PRIMARY, 'w-full')}>
            Present from this slide
          </button>
        </aside>
      </div>
    </motion.section>
  );
}

function JumpRow({
  total,
  current,
  onGo,
}: {
  total: number;
  current: number;
  onGo: (i: number) => void;
}) {
  return (
    <nav aria-label="Go to slide" className="flex flex-wrap gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          type="button"
          data-testid="slide-jump"
          onClick={() => onGo(i)}
          aria-current={i === current ? 'true' : undefined}
          aria-label={`Go to slide ${i + 1}`}
          className={cn(
            'h-11 min-w-[44px] rounded-xl border px-2 text-[13px] font-semibold tabular-nums transition-colors touch-manipulation',
            i === current
              ? 'border-elec-yellow bg-elec-yellow text-black'
              : 'border-white/[0.14] text-white hover:border-white/[0.3]'
          )}
        >
          {i + 1}
        </button>
      ))}
    </nav>
  );
}

/* ───────────────── present mode ───────────────── */

interface TimerState {
  remaining: number;
  running: boolean;
}

function PresentMode({
  slides,
  startAt,
  lessonTitle,
  collegeName,
  theme,
  imageStatus,
  onExit,
}: {
  slides: Slide[];
  startAt: number;
  lessonTitle: string;
  collegeName: string | null;
  theme: DeckTheme;
  imageStatus: Record<number, 'generating' | 'ready' | 'failed'>;
  onExit: (at: number) => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(Math.min(startAt, slides.length - 1));
  const [notesView, setNotesView] = useState(false);
  const [blank, setBlank] = useState(false);
  const [timers, setTimers] = useState<Record<number, TimerState>>({});
  const [startedAt] = useState(() => Date.now());
  const [now, setNow] = useState(() => Date.now());
  const [chrome, setChrome] = useState(true);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const indexRef = useRef(index);
  indexRef.current = index;

  const total = slides.length;
  const slide = slides[index];
  const next = slides[index + 1];
  const timer = timers[index];
  const canTime = slide.kind === 'activity' && (slide.time_minutes ?? 0) > 0;

  const go = useCallback(
    (d: number) => setIndex((i) => Math.max(0, Math.min(total - 1, i + d))),
    [total]
  );

  const toggleTimer = useCallback(() => {
    const i = indexRef.current;
    const s = slides[i];
    if (s.kind !== 'activity' || !s.time_minutes) return;
    setTimers((t) => {
      const cur = t[i];
      if (!cur) return { ...t, [i]: { remaining: s.time_minutes! * 60, running: true } };
      if (cur.remaining <= 0)
        return { ...t, [i]: { remaining: s.time_minutes! * 60, running: true } };
      return { ...t, [i]: { ...cur, running: !cur.running } };
    });
  }, [slides]);

  const resetTimer = useCallback(() => {
    const i = indexRef.current;
    setTimers((t) => {
      const n = { ...t };
      delete n[i];
      return n;
    });
  }, []);

  const exit = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen().catch(() => undefined);
    onExit(indexRef.current);
  }, [onExit]);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen().catch(() => undefined);
    else void rootRef.current?.requestFullscreen?.().catch(() => undefined);
  }, []);

  // Full screen on a pointer device; a phone keeps its browser chrome.
  useEffect(() => {
    if (window.matchMedia('(pointer: fine)').matches) {
      void rootRef.current?.requestFullscreen?.().catch(() => undefined);
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // One clock for the lesson and every running activity timer.
  useEffect(() => {
    const t = setInterval(() => {
      setNow(Date.now());
      setTimers((all) => {
        let changed = false;
        const out: Record<number, TimerState> = {};
        for (const [k, v] of Object.entries(all)) {
          if (v.running && v.remaining > 0) {
            changed = true;
            const remaining = v.remaining - 1;
            out[Number(k)] = { remaining, running: remaining > 0 };
          } else out[Number(k)] = v;
        }
        return changed ? out : all;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const wake = useCallback(() => {
    setChrome(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setChrome(false), 2500);
  }, []);
  useEffect(() => {
    wake();
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [wake]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key;
      // Space and Enter on a focused control (Exit, Notes, a field) belong to
      // that control, not to "next slide": otherwise a keyboard user can
      // never press Exit.
      const t = e.target as HTMLElement | null;
      const onControl = !!t?.closest('button, a, input, textarea, select, [contenteditable="true"]');
      if (onControl && (k === ' ' || k === 'Enter')) return;
      if (['ArrowRight', 'ArrowDown', 'PageDown', ' ', 'Enter'].includes(k)) {
        e.preventDefault();
        setBlank(false);
        go(1);
      } else if (['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace'].includes(k)) {
        e.preventDefault();
        setBlank(false);
        go(-1);
      } else if (k === 'Home') {
        e.preventDefault();
        setIndex(0);
      } else if (k === 'End') {
        e.preventDefault();
        setIndex(total - 1);
      } else if (k === 'n' || k === 'N') {
        setNotesView((v) => !v);
      } else if (k === 't' || k === 'T') {
        toggleTimer();
      } else if (k === 'r' || k === 'R') {
        resetTimer();
      } else if (k === 'b' || k === 'B' || k === '.') {
        setBlank((b) => !b);
      } else if (k === 'f' || k === 'F') {
        toggleFullscreen();
      } else if (k === 'Escape') {
        exit();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, total, toggleTimer, resetTimer, toggleFullscreen, exit]);

  // Swipe, or tap the left or right of the slide.
  const down = useRef<{ x: number; y: number } | null>(null);
  const onPointerDown = (e: ReactPointerEvent) => {
    down.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = down.current;
    down.current = null;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      go(dx < 0 ? 1 : -1);
      return;
    }
    if (Math.abs(dx) < 8 && Math.abs(dy) < 8) {
      const r = e.currentTarget.getBoundingClientRect();
      const at = (e.clientX - r.left) / r.width;
      if (at > 0.6) go(1);
      else if (at < 0.3) go(-1);
      else wake();
    }
  };

  const elapsed = Math.floor((now - startedAt) / 1000);
  const notes = cleanSlideText(slide.speaker_notes);

  const stage = (
    <div
      className="relative h-full w-full touch-pan-y select-none"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      {blank ? (
        <div className="h-full w-full bg-black" aria-label="Screen blanked" />
      ) : (
        <SlideCanvas
          contain
          slide={slide}
          index={index}
          total={total}
          lessonTitle={lessonTitle}
          collegeName={collegeName}
          theme={theme}
          imageStatus={imageStatus[index] ?? null}
          timerSeconds={timer ? timer.remaining : null}
          timerRunning={timer?.running ?? false}
        />
      )}
    </div>
  );

  const ctrl =
    'inline-flex h-11 items-center justify-center rounded-xl border border-white/[0.18] bg-black/70 px-3.5 text-[13px] font-semibold text-white transition-colors touch-manipulation hover:border-white/[0.4] disabled:opacity-40';

  const controls = (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <button type="button" onClick={() => go(-1)} disabled={index === 0} className={ctrl}>
          Previous
        </button>
        <span className="min-w-[64px] text-center text-[13px] font-semibold tabular-nums text-white">
          {index + 1} / {total}
        </span>
        <button
          type="button"
          onClick={() => go(1)}
          disabled={index === total - 1}
          className={cn(PRIMARY, 'px-5')}
        >
          Next
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {canTime && (
          <button type="button" onClick={toggleTimer} className={ctrl}>
            {!timer
              ? `Start ${slide.time_minutes} min timer`
              : timer.running
                ? 'Pause timer'
                : 'Resume timer'}
          </button>
        )}
        <button
          type="button"
          onClick={() => setNotesView((v) => !v)}
          className={ctrl}
          aria-pressed={notesView}
        >
          {notesView ? 'Hide notes' : 'Notes'}
        </button>
        <button
          type="button"
          onClick={toggleFullscreen}
          className={cn(ctrl, 'hidden sm:inline-flex')}
        >
          Full screen
        </button>
        <button type="button" onClick={exit} className={ctrl}>
          Exit
        </button>
      </div>
    </div>
  );

  return (
    <div
      ref={rootRef}
      data-testid="present-stage"
      className="fixed inset-0 z-[100] flex flex-col bg-black text-white"
      onMouseMove={wake}
    >
      {notesView ? (
        <div className="flex h-full min-h-0 flex-col gap-3 overflow-y-auto p-3 sm:p-4 lg:grid lg:grid-cols-[minmax(0,1fr)_400px] lg:grid-rows-[minmax(0,1fr)_auto] lg:overflow-hidden">
          <div className="aspect-video w-full shrink-0 lg:aspect-auto lg:h-full lg:min-h-0">
            {stage}
          </div>
          <aside
            data-testid="presenter-notes"
            className="order-3 flex flex-col gap-3 lg:order-none lg:row-span-2 lg:min-h-0"
          >
            <div className="grid grid-cols-2 gap-2">
              <Clock label="Lesson time" value={formatClock(elapsed)} />
              <Clock
                label={canTime ? (timer?.running ? 'Activity, left' : 'Activity') : 'Activity'}
                value={
                  canTime
                    ? formatClock(timer ? timer.remaining : (slide.time_minutes ?? 0) * 60)
                    : 'Not timed'
                }
              />
            </div>
            <div className="rounded-2xl border border-white/[0.14] p-4 lg:min-h-0 lg:flex-1 lg:overflow-y-auto">
              <div className="text-[12px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
                Notes
              </div>
              <p className="mt-2 whitespace-pre-line text-[20px] leading-relaxed text-white">
                {notes || 'No speaker notes on this slide.'}
              </p>
            </div>
            <div className="rounded-2xl border border-white/[0.14] p-3">
              <div className="mb-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-white">
                {next ? 'Next slide' : 'End of the deck'}
              </div>
              {next ? (
                <div className="overflow-hidden rounded-lg">
                  <SlideCanvas
                    slide={next}
                    index={index + 1}
                    total={total}
                    lessonTitle={lessonTitle}
                    collegeName={collegeName}
                    theme={theme}
                  />
                </div>
              ) : (
                <p className="text-[14px] text-white">This is the last slide.</p>
              )}
            </div>
            <p className="hidden text-[12.5px] leading-snug text-white lg:block">
              Keys: arrows or space to move, N notes, T timer, R reset timer, B blank screen, F full
              screen, Esc exit.
            </p>
          </aside>
          <div className="order-2 shrink-0 lg:order-none lg:col-start-1">{controls}</div>
        </div>
      ) : (
        <>
          <div className="min-h-0 flex-1">{stage}</div>
          <p className="pointer-events-none absolute inset-x-0 top-4 hidden text-center text-[13px] font-medium text-white [@media(orientation:portrait)_and_(pointer:coarse)]:block">
            Turn your phone sideways for a bigger slide
          </p>
          <div
            className={cn(
              'absolute inset-x-0 bottom-0 p-3 transition-opacity duration-300 sm:p-4',
              chrome ? 'opacity-100' : 'pointer-events-none opacity-0',
              '[@media(pointer:coarse)]:pointer-events-auto [@media(pointer:coarse)]:opacity-100'
            )}
          >
            {controls}
          </div>
        </>
      )}
    </div>
  );
}

function Clock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/[0.14] px-4 py-3">
      <div className="text-[12px] font-semibold text-white">{label}</div>
      <div className="mt-0.5 text-[28px] font-semibold tabular-nums leading-tight text-white">
        {value}
      </div>
    </div>
  );
}

function formatClock(sec: number): string {
  const s = Math.max(0, Math.round(sec));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = String(s % 60).padStart(2, '0');
  return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${ss}` : `${m}:${ss}`;
}

/* ───────────────── sheets ───────────────── */

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
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="lg"
      eyebrow="Slides"
      title="Deck settings"
      description="Saved with the deck."
      footer={
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className={cn(COLLEGE_BTN_PRIMARY, 'w-full')}
        >
          Done
        </button>
      }
    >
      <div className="space-y-7">
        <div>
          <div className={labelCn}>Slide colours</div>
          <div className="mt-1 flex gap-2">
            {(['dark', 'light'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => onTheme(t)}
                className={cn(chipCn(theme === t), 'px-5')}
              >
                {t === 'dark' ? 'Dark' : 'Light'}
              </button>
            ))}
          </div>
          <p className="mt-2 text-[13px] leading-snug text-white">
            Used on screen, when presenting and in the PowerPoint file. Light suits a bright room or
            a weak projector.
          </p>
        </div>
        <div>
          <div className={labelCn}>Photo quality</div>
          <div className="mt-1 flex flex-wrap gap-2">
            {QUALITY_OPTIONS.map((o) => (
              <button
                key={o.value}
                type="button"
                onClick={() => onQuality(o.value)}
                className={cn(chipCn(quality === o.value), 'px-5')}
              >
                {o.label}
              </button>
            ))}
          </div>
          {q && (
            <p className="mt-2 text-[13px] leading-snug text-white">
              {q.help}. Applies to photos made from now on.
            </p>
          )}
        </div>
      </div>
    </FormSheet>
  );
}

function RebuildSheet({
  open,
  onOpenChange,
  count,
  onContinue,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  count: number;
  onContinue: () => void;
}) {
  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="md"
      eyebrow="Slides"
      title="Rebuild the whole deck?"
      description={`A rebuild replaces all ${plural(count, 'slide')}, including your edits and photos. To change one slide, open it and use Regenerate with a note.`}
      footer={
        <div className="grid grid-cols-2 gap-2.5">
          <button type="button" onClick={() => onOpenChange(false)} className={COLLEGE_BTN}>
            Keep this deck
          </button>
          <button type="button" onClick={onContinue} className={COLLEGE_BTN_PRIMARY}>
            Choose and rebuild
          </button>
        </div>
      }
    >
      <p className="text-[14px] leading-relaxed text-white">
        Next you choose the number of slides, the tone, the depth and the support for learners. The
        new deck takes about a minute, then the photos follow.
      </p>
    </FormSheet>
  );
}

function RegenerateSlideSheet({
  open,
  onOpenChange,
  slide,
  index,
  total,
  lessonTitle,
  theme,
  busy,
  onRegenerate,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  slide: Slide | null;
  index: number | null;
  total: number;
  lessonTitle: string;
  theme: DeckTheme;
  busy: boolean;
  onRegenerate: (note: string) => Promise<boolean>;
}) {
  const [note, setNote] = useState('');
  useEffect(() => {
    if (!open) setNote('');
  }, [open]);

  const submit = async () => {
    if (!note.trim() || busy) return;
    const ok = await onRegenerate(note.trim());
    if (ok) onOpenChange(false);
  };

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow={
        slide && index != null
          ? `Slide ${index + 1} of ${total} · ${KIND_LABEL[slide.kind]}`
          : 'Slide'
      }
      title="Regenerate with a note"
      description="Only this slide is redone. The rest of the deck stays as it is."
      bodyClassName="grid grid-cols-1 items-start gap-x-10 gap-y-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
      footer={
        <div className="grid grid-cols-2 gap-2.5">
          <button type="button" onClick={() => onOpenChange(false)} className={COLLEGE_BTN}>
            Cancel
          </button>
          <button
            type="button"
            onClick={() => void submit()}
            disabled={!note.trim() || busy}
            className={PRIMARY}
          >
            {busy ? 'Redoing the slide…' : 'Regenerate slide'}
          </button>
        </div>
      }
    >
      <div className="space-y-4">
        <label className="block">
          <span className={labelCn}>What should change?</span>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                e.preventDefault();
                void submit();
              }
            }}
            rows={4}
            placeholder="For example: use a domestic consumer unit example, or make the questions harder."
            className={textareaCn}
          />
        </label>
        <div>
          <div className={labelCn}>Or start from one of these</div>
          <div className="mt-1 flex flex-wrap gap-2">
            {QUICK_NOTES.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => setNote(q)}
                className={chipCn(note === q)}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
        <p className="text-[13px] leading-snug text-white">
          Regulation slides only cite the regulation extracts linked to this lesson. If the photo
          idea changes, a new photo is made.
        </p>
      </div>
      {slide && index != null && (
        <div className="space-y-2">
          <div className={labelCn}>The slide now</div>
          <div className="overflow-hidden rounded-2xl border border-white/[0.1]">
            <SlideCanvas
              slide={slide}
              index={index}
              total={total}
              lessonTitle={lessonTitle}
              theme={theme}
            />
          </div>
        </div>
      )}
    </FormSheet>
  );
}

/* ───────────────── generation progress ───────────────── */

const GENERATION_STAGES: Array<{ label: string; minSec: number }> = [
  { label: 'Reading the lesson plan…', minSec: 0 },
  { label: 'Matching objectives to the regulation extracts…', minSec: 6 },
  { label: 'Drafting the slides…', minSec: 14 },
  { label: 'Writing the speaker notes…', minSec: 28 },
  { label: 'Choosing the photos…', minSec: 40 },
  { label: 'Tidying the wording…', minSec: 50 },
  { label: 'Almost there…', minSec: 60 },
];

const ESTIMATED_DECK_SEC = 70;

function GenerationProgress({ replacing }: { replacing: boolean }) {
  const [elapsed, setElapsed] = useState(0);
  const startedAt = useRef(Date.now());
  useEffect(() => {
    const t = setInterval(
      () => setElapsed(Math.round((Date.now() - startedAt.current) / 1000)),
      250
    );
    return () => clearInterval(t);
  }, []);
  const progress = Math.min(95, (elapsed / ESTIMATED_DECK_SEC) * 95);
  const stage =
    [...GENERATION_STAGES].reverse().find((s) => elapsed >= s.minSec) ?? GENERATION_STAGES[0];
  const remaining = Math.max(0, ESTIMATED_DECK_SEC - elapsed);
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      <CollegeHeading>{replacing ? 'Rebuilding the deck' : 'Building the deck'}</CollegeHeading>
      <motion.div
        variants={itemVariants}
        className="card-surface -mx-4 rounded-none px-5 py-5 sm:mx-0 sm:rounded-2xl"
      >
        <div className="flex items-center gap-2">
          <PulsingDot />
          <span className="text-[17px] font-semibold leading-tight text-white">{stage.label}</span>
        </div>
        <div className="mt-2 text-[13px] tabular-nums text-white">
          {elapsed}s so far · {remaining > 0 ? `about ${remaining}s to go` : 'nearly done'} · photos
          follow
        </div>
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.10]">
          <motion.div
            className="h-full rounded-full bg-elec-yellow"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
        <p className="mt-3 text-[13px] leading-snug text-white">
          You can leave this page. The deck is saved when it is ready.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonSlide key={i} />
        ))}
      </div>
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

function SkeletonSlide() {
  return (
    <div className="card-surface aspect-video w-full animate-pulse p-[6%]" aria-hidden>
      <div className="h-[6%] w-1/5 rounded bg-white/[0.12]" />
      <div className="mt-[4%] h-[10%] w-2/3 rounded bg-white/[0.12]" />
      <div className="mt-[6%] space-y-[3%]">
        <div className="h-[5%] min-h-2 w-full rounded bg-white/[0.08]" />
        <div className="h-[5%] min-h-2 w-5/6 rounded bg-white/[0.08]" />
        <div className="h-[5%] min-h-2 w-3/4 rounded bg-white/[0.08]" />
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-busy>
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonSlide key={i} />
      ))}
    </div>
  );
}

/* ───────────────── empty and error ───────────────── */

function EmptyDeckCard({ onBuild }: { onBuild: () => void }) {
  return (
    <motion.section variants={containerVariants} initial="hidden" animate="visible">
      <motion.div
        variants={itemVariants}
        className="card-surface -mx-4 rounded-none p-5 sm:mx-0 sm:rounded-2xl sm:p-6"
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
          <div>
            <h2 className="text-[19px] font-semibold leading-tight text-white">
              No slide deck yet
            </h2>
            <p className="mt-2 max-w-prose text-[14px] leading-relaxed text-white">
              The deck is built from this lesson plan: a title, the objectives, a starter, the main
              ideas, the regulations that apply, the activities with timers, a check for
              understanding, a summary and a plenary. Every slide has speaker notes and shows the
              assessment criteria it covers.
            </p>
            <p className="mt-2 max-w-prose text-[14px] leading-relaxed text-white">
              It takes about a minute. You can then edit any slide, redo one with a note, present it
              here or download it as PowerPoint.
            </p>
            <button
              type="button"
              onClick={onBuild}
              className={cn(COLLEGE_BTN_PRIMARY, 'mt-5 w-full sm:w-auto sm:px-6')}
            >
              Build the slide deck
            </button>
          </div>
          <ul className="hidden space-y-2 text-[14px] text-white lg:block">
            {[
              'Large type that reads from the back of a workshop',
              'Regulation slides name the document and section, paraphrased from the extracts linked to this lesson',
              'Presenter view with your notes, the next slide and an activity timer',
              'PowerPoint download with the notes included',
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-elec-yellow"
                />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.section>
  );
}

function ErrorLine({ text }: { text: string }) {
  return (
    <div
      role="alert"
      className="rounded-xl border border-red-400/50 px-4 py-3 text-[13.5px] font-medium text-white"
    >
      {text}
    </div>
  );
}

function formatGenAt(iso: string): string {
  const d = new Date(iso);
  const min = Math.round((Date.now() - d.getTime()) / 60000);
  if (min < 1) return 'just now';
  if (min < 60) return `${min} min ago`;
  const h = Math.round(min / 60);
  if (h < 24) return `${h}h ago`;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}
