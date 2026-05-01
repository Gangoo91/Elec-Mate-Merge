import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageFrame } from '@/components/college/primitives';
import { useSlideDeck, type Slide, type SlideKind } from '@/hooks/useSlideDeck';
import { cn } from '@/lib/utils';

/* ==========================================================================
   LessonSlideDeckPage — /college/lessons/:id/slides

   Tutor-ready slide deck companion to a lesson plan. AI-generated, edited
   inline, deliverable in presenter mode. The Smartscreen killer.

   Three modes:
     - "viewer"     editorial preview, all slides stacked, click to focus
     - "single"     focus one slide (full bleed, arrow-key navigation)
     - "presenter"  black background, large type, speaker notes side-pane

   ELE-942 / [F1].
   ========================================================================== */

type Mode = 'viewer' | 'single' | 'presenter';

const KIND_EYEBROW: Record<SlideKind, string> = {
  title: 'Title',
  starter: 'Starter',
  objectives: 'Objectives',
  concept: 'Concept',
  reg_cite: 'Regulation',
  activity: 'Activity',
  worked_example: 'Worked example',
  check_understanding: 'Check for understanding',
  misconception: 'Misconception',
  summary: 'Summary',
  plenary: 'Plenary',
};

const KIND_TONE: Record<SlideKind, string> = {
  title: 'border-elec-yellow/30 bg-elec-yellow/[0.04] text-elec-yellow',
  starter: 'border-blue-500/30 bg-blue-500/[0.05] text-blue-300',
  objectives: 'border-purple-500/30 bg-purple-500/[0.05] text-purple-300',
  concept: 'border-white/[0.10] bg-white/[0.03] text-white',
  reg_cite: 'border-amber-500/30 bg-amber-500/[0.06] text-amber-300',
  activity: 'border-emerald-500/30 bg-emerald-500/[0.06] text-emerald-300',
  worked_example: 'border-blue-500/30 bg-blue-500/[0.05] text-blue-300',
  check_understanding: 'border-purple-500/30 bg-purple-500/[0.05] text-purple-300',
  misconception: 'border-rose-500/30 bg-rose-500/[0.06] text-rose-300',
  summary: 'border-elec-yellow/30 bg-elec-yellow/[0.06] text-elec-yellow',
  plenary: 'border-blue-500/30 bg-blue-500/[0.06] text-blue-300',
};

export default function LessonSlideDeckPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { plan, deck, loading, generating, error, generate, generatedAt, updateSlide } =
    useSlideDeck(id ?? null);
  const [mode, setMode] = useState<Mode>('viewer');
  const [focusedIndex, setFocusedIndex] = useState(0);

  // Arrow-key navigation in single + presenter modes.
  useEffect(() => {
    if (mode === 'viewer') return;
    const onKey = (e: KeyboardEvent) => {
      if (!deck?.slides?.length) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        setFocusedIndex((i) => Math.min(deck.slides.length - 1, i + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        setFocusedIndex((i) => Math.max(0, i - 1));
      } else if (e.key === 'Escape') {
        setMode('viewer');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mode, deck]);

  const handleGenerate = useCallback(async () => {
    await generate();
  }, [generate]);

  const slides = useMemo(() => deck?.slides ?? [], [deck]);
  const focused = slides[focusedIndex];

  const totalActivityMins = useMemo(
    () =>
      slides
        .filter((s) => s.kind === 'activity')
        .reduce((sum, s) => sum + (s.time_minutes ?? 0), 0),
    [slides]
  );

  if (mode === 'presenter' && focused) {
    return (
      <PresenterMode
        slide={focused}
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
        {/* Header */}
        <button
          type="button"
          onClick={() => navigate(`/college/lessons/${id}`)}
          className="text-[11px] font-medium text-white hover:text-elec-yellow transition-colors touch-manipulation"
        >
          ← Back to lesson plan
        </button>
        <div className="mt-3 flex items-end justify-between gap-4 flex-wrap">
          <div className="min-w-0">
            <div className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-elec-yellow">
              Slide deck
            </div>
            <h1 className="mt-1 text-[26px] sm:text-[30px] font-semibold tracking-tight text-white leading-tight">
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
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {slides.length > 0 && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setFocusedIndex(0);
                    setMode('single');
                  }}
                  className="h-10 px-4 rounded-lg bg-transparent border border-white/[0.10] hover:border-white/25 text-white text-[12px] font-medium transition-colors touch-manipulation"
                >
                  Focus mode
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFocusedIndex(0);
                    setMode('presenter');
                  }}
                  className="h-10 px-4 rounded-lg bg-elec-yellow text-black text-[12px] font-semibold hover:bg-elec-yellow/90 transition-colors touch-manipulation"
                >
                  Present →
                </button>
              </>
            )}
            <button
              type="button"
              onClick={handleGenerate}
              disabled={generating}
              className={cn(
                'h-10 px-4 rounded-lg text-[12px] font-semibold transition-colors touch-manipulation',
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
                className="h-[140px] rounded-2xl bg-[hsl(0_0%_10%)] border border-white/[0.06] animate-pulse"
              />
            ))}
          </div>
        )}

        {!loading && slides.length === 0 && !generating && (
          <EmptyState onGenerate={handleGenerate} />
        )}

        {generating && slides.length === 0 && (
          <div className="mt-8 rounded-2xl border border-elec-yellow/25 bg-elec-yellow/[0.04] px-5 py-8 text-center">
            <div className="text-[14px] font-semibold text-white">Generating your deck…</div>
            <p className="mt-1.5 text-[12px] text-white max-w-sm mx-auto">
              The AI is shaping a 12–18 slide deck from this lesson plan. This usually takes about
              30–60 seconds.
            </p>
          </div>
        )}

        {/* Stacked viewer */}
        {mode === 'viewer' && slides.length > 0 && (
          <ol className="mt-6 space-y-3">
            {slides.map((slide, i) => (
              <li key={i}>
                <SlideCard
                  slide={slide}
                  index={i}
                  total={slides.length}
                  onFocus={() => {
                    setFocusedIndex(i);
                    setMode('single');
                  }}
                  onEdit={(patch) => void updateSlide(i, patch)}
                />
              </li>
            ))}
          </ol>
        )}

        {/* Single-focus mode — embedded (presenter is the full-screen variant) */}
        {mode === 'single' && focused && (
          <div className="mt-6">
            <SlideCard
              slide={focused}
              index={focusedIndex}
              total={slides.length}
              focused
              onEdit={(patch) => void updateSlide(focusedIndex, patch)}
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
    </PageFrame>
  );
}

/* ───────────────── slide card ───────────────── */

function SlideCard({
  slide,
  index,
  total,
  focused = false,
  onFocus,
  onEdit,
}: {
  slide: Slide;
  index: number;
  total: number;
  focused?: boolean;
  onFocus?: () => void;
  onEdit?: (patch: Partial<Slide>) => void;
}) {
  const [editingHeading, setEditingHeading] = useState(false);
  const [headingDraft, setHeadingDraft] = useState(slide.heading ?? '');

  useEffect(() => {
    setHeadingDraft(slide.heading ?? '');
  }, [slide.heading]);

  const tone = KIND_TONE[slide.kind] ?? 'border-white/[0.10] bg-white/[0.03] text-white';

  return (
    <div
      className={cn(
        'rounded-2xl border bg-[hsl(0_0%_10%)] px-5 sm:px-6 py-5 sm:py-6 transition-colors',
        focused
          ? 'border-elec-yellow/40 shadow-[0_0_0_1px_rgba(250,204,21,0.10)]'
          : 'border-white/[0.06]'
      )}
    >
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={cn(
                'inline-flex items-center h-5 px-2 rounded-md border text-[10px] font-semibold uppercase tracking-[0.06em]',
                tone
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

          {editingHeading ? (
            <input
              autoFocus
              value={headingDraft}
              onChange={(e) => setHeadingDraft(e.target.value)}
              onBlur={() => {
                setEditingHeading(false);
                if (headingDraft !== (slide.heading ?? '')) {
                  onEdit?.({ heading: headingDraft });
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === 'Escape') {
                  (e.target as HTMLInputElement).blur();
                }
              }}
              className="mt-2 w-full bg-transparent border-b border-white/30 text-[20px] sm:text-[24px] font-semibold text-white tracking-tight leading-tight outline-none focus:border-elec-yellow"
            />
          ) : (
            <button
              type="button"
              onClick={() => setEditingHeading(true)}
              className="mt-2 block text-left text-[20px] sm:text-[24px] font-semibold text-white tracking-tight leading-tight hover:text-elec-yellow transition-colors touch-manipulation"
            >
              {slide.heading ?? '(untitled slide)'}
            </button>
          )}

          {slide.subtitle && <div className="mt-1 text-[14px] text-white">{slide.subtitle}</div>}
        </div>

        {onFocus && !focused && (
          <button
            type="button"
            onClick={onFocus}
            className="shrink-0 h-9 px-3.5 rounded-lg bg-transparent border border-white/[0.10] hover:border-white/25 text-white text-[11.5px] font-medium transition-colors touch-manipulation"
          >
            Focus
          </button>
        )}
      </div>

      <div className="mt-4">
        <SlideBody slide={slide} />
      </div>

      {slide.speaker_notes && (
        <div className="mt-4 rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3">
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
            Speaker notes
          </div>
          <p className="mt-1 text-[12.5px] text-white leading-relaxed whitespace-pre-line">
            {slide.speaker_notes}
          </p>
        </div>
      )}
    </div>
  );
}

/* ───────────────── slide body ───────────────── */

function SlideBody({ slide }: { slide: Slide }) {
  switch (slide.kind) {
    case 'title':
      return (
        <div className="space-y-2">
          {slide.duration_label && (
            <div className="text-[12px] text-white">{slide.duration_label}</div>
          )}
          {slide.body && <p className="text-[14px] text-white">{slide.body}</p>}
        </div>
      );
    case 'objectives':
    case 'summary':
      return (
        <ul className="space-y-1.5 list-disc list-outside ml-5">
          {(slide.bullets ?? []).map((b, i) => (
            <li key={i} className="text-[13.5px] text-white leading-relaxed">
              {b}
            </li>
          ))}
        </ul>
      );
    case 'starter':
      return (
        <div className="space-y-3">
          {slide.body && (
            <p className="text-[14px] text-white leading-relaxed whitespace-pre-line">
              {slide.body}
            </p>
          )}
          {slide.questions && slide.questions.length > 0 && (
            <ul className="space-y-1.5 list-decimal list-outside ml-5">
              {slide.questions.map((q, i) => (
                <li key={i} className="text-[13px] text-white leading-relaxed">
                  {q}
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    case 'concept':
      return (
        <div className="space-y-3">
          {slide.body && (
            <p className="text-[14px] text-white leading-relaxed whitespace-pre-line">
              {slide.body}
            </p>
          )}
          {slide.key_terms && slide.key_terms.length > 0 && (
            <div className="space-y-1.5">
              {slide.key_terms.map((t, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2"
                >
                  <div className="text-[12.5px] font-semibold text-white">{t.term}</div>
                  <div className="mt-0.5 text-[12px] text-white">{t.definition}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    case 'reg_cite':
      return (
        <div className="space-y-2">
          {slide.reg_number && (
            <div className="text-[18px] font-semibold text-amber-300 tabular-nums">
              {slide.reg_number}
            </div>
          )}
          {slide.clause && (
            <p className="text-[13.5px] text-white leading-relaxed italic">"{slide.clause}"</p>
          )}
          {slide.why_it_matters && (
            <p className="text-[13px] text-white leading-relaxed">
              <span className="font-semibold text-white">Why this matters: </span>
              {slide.why_it_matters}
            </p>
          )}
        </div>
      );
    case 'activity':
      return (
        <div className="space-y-3">
          {slide.instruction && (
            <p className="text-[14px] text-white leading-relaxed whitespace-pre-line">
              {slide.instruction}
            </p>
          )}
          {slide.success_criteria && (
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/[0.06] px-3 py-2">
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-emerald-300">
                Success looks like
              </div>
              <div className="mt-0.5 text-[12.5px] text-white">{slide.success_criteria}</div>
            </div>
          )}
        </div>
      );
    case 'worked_example':
      return (
        <div className="space-y-3">
          {slide.problem && (
            <div className="rounded-lg border border-blue-500/30 bg-blue-500/[0.06] px-3 py-2">
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-blue-300">
                Problem
              </div>
              <div className="mt-0.5 text-[13px] text-white whitespace-pre-line">
                {slide.problem}
              </div>
            </div>
          )}
          {slide.solution_steps && slide.solution_steps.length > 0 && (
            <ol className="space-y-1.5 list-decimal list-outside ml-5">
              {slide.solution_steps.map((s, i) => (
                <li key={i} className="text-[13px] text-white leading-relaxed">
                  {s}
                </li>
              ))}
            </ol>
          )}
        </div>
      );
    case 'check_understanding':
      return (
        <ol className="space-y-2 list-decimal list-outside ml-5">
          {(slide.questions ?? []).map((q, i) => (
            <li key={i} className="text-[13.5px] text-white leading-relaxed">
              {q}
            </li>
          ))}
        </ol>
      );
    case 'misconception':
      return (
        <div className="space-y-2">
          {slide.belief && (
            <div className="rounded-lg border border-rose-500/30 bg-rose-500/[0.06] px-3 py-2">
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-rose-300">
                Common belief
              </div>
              <div className="mt-0.5 text-[13px] text-white">{slide.belief}</div>
            </div>
          )}
          {slide.correction && (
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/[0.06] px-3 py-2">
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-emerald-300">
                Actually
              </div>
              <div className="mt-0.5 text-[13px] text-white">{slide.correction}</div>
            </div>
          )}
        </div>
      );
    case 'plenary':
      return (
        <div className="space-y-3">
          {slide.body && (
            <p className="text-[14px] text-white leading-relaxed whitespace-pre-line">
              {slide.body}
            </p>
          )}
          {slide.exit_ticket && (
            <div className="rounded-lg border border-elec-yellow/30 bg-elec-yellow/[0.06] px-3 py-2">
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
                Exit ticket
              </div>
              <div className="mt-0.5 text-[13px] text-white">{slide.exit_ticket}</div>
            </div>
          )}
        </div>
      );
    default:
      return slide.body ? (
        <p className="text-[14px] text-white leading-relaxed whitespace-pre-line">{slide.body}</p>
      ) : null;
  }
}

/* ───────────────── presenter mode ───────────────── */

function PresenterMode({
  slide,
  index,
  total,
  onExit,
  onPrev,
  onNext,
}: {
  slide: Slide;
  index: number;
  total: number;
  onExit: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[100] bg-black text-white flex flex-col">
      <div className="absolute top-3 right-3 flex items-center gap-2">
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
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-24 py-12 max-w-[1400px] w-full mx-auto">
        <div className="text-[12px] font-medium uppercase tracking-[0.22em] text-white/55">
          {KIND_EYEBROW[slide.kind]}
        </div>
        <h1 className="mt-3 text-[36px] sm:text-[48px] lg:text-[60px] font-semibold tracking-tight leading-[1.05]">
          {slide.heading ?? ''}
        </h1>
        {slide.subtitle && (
          <div className="mt-3 text-[18px] sm:text-[22px] text-white/75">{slide.subtitle}</div>
        )}
        <div className="mt-8 max-w-[900px] text-[18px] sm:text-[22px] leading-[1.5]">
          <PresenterBody slide={slide} />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-3 sm:p-4">
        <button
          type="button"
          onClick={onPrev}
          disabled={index === 0}
          className="h-12 px-5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] disabled:opacity-30 text-[14px] font-medium touch-manipulation"
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
        <ul className="space-y-3 list-disc list-outside ml-6">
          {(slide.bullets ?? []).map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      );
    case 'starter':
    case 'concept':
    case 'plenary':
    case 'title':
      return slide.body ? <div className="whitespace-pre-line">{slide.body}</div> : null;
    case 'reg_cite':
      return (
        <div className="space-y-3">
          {slide.reg_number && (
            <div className="text-[40px] font-semibold text-amber-300 tabular-nums">
              {slide.reg_number}
            </div>
          )}
          {slide.clause && <p className="italic">"{slide.clause}"</p>}
          {slide.why_it_matters && <p>{slide.why_it_matters}</p>}
        </div>
      );
    case 'activity':
      return (
        <div className="space-y-4">
          {slide.instruction && <div className="whitespace-pre-line">{slide.instruction}</div>}
          {slide.success_criteria && (
            <div className="text-[16px] text-emerald-300">Success: {slide.success_criteria}</div>
          )}
          {slide.time_minutes != null && (
            <div className="text-[16px] text-white/75">{slide.time_minutes} minutes</div>
          )}
        </div>
      );
    case 'worked_example':
      return (
        <div className="space-y-4">
          {slide.problem && <div className="whitespace-pre-line">{slide.problem}</div>}
          {slide.solution_steps && (
            <ol className="space-y-2 list-decimal list-outside ml-6">
              {slide.solution_steps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          )}
        </div>
      );
    case 'check_understanding':
      return (
        <ol className="space-y-3 list-decimal list-outside ml-6">
          {(slide.questions ?? []).map((q, i) => (
            <li key={i}>{q}</li>
          ))}
        </ol>
      );
    case 'misconception':
      return (
        <div className="space-y-4">
          {slide.belief && (
            <div className="text-rose-300">
              <span className="text-[14px] uppercase tracking-[0.18em] block mb-1">
                Common belief
              </span>
              {slide.belief}
            </div>
          )}
          {slide.correction && (
            <div className="text-emerald-300">
              <span className="text-[14px] uppercase tracking-[0.18em] block mb-1">Actually</span>
              {slide.correction}
            </div>
          )}
        </div>
      );
    default:
      return null;
  }
}

/* ───────────────── empty state ───────────────── */

function EmptyState({ onGenerate }: { onGenerate: () => void }) {
  return (
    <div className="mt-8 rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] px-6 py-12 text-center">
      <div className="text-[15px] font-semibold text-white">No slide deck yet</div>
      <p className="mt-2 text-[12.5px] text-white max-w-md mx-auto leading-relaxed">
        Generate a tutor-ready deck from this lesson plan — title, objectives, activities,
        regulation cites, summary, plenary. Edit any slide inline. Present in full-screen.
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
