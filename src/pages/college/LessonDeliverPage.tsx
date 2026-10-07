import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { cleanLessonDeep, cleanLessonText } from '@/lib/lessons/cleanLessonText';
import { useNavigate, useParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { HubMasthead } from '@/components/hub/HubPrimitives';
import { PageHelpButton, type PageHelpContent } from '@/components/hub/PageHelp';
import { useLessonPlan, type GeneratedActivity } from '@/hooks/useCurriculum';
import { supabase } from '@/integrations/supabase/client';
import { QuickRegisterSheet } from '@/components/college/teaching/QuickRegisterSheet';

const HELP: PageHelpContent = {
  id: 'college-lesson-deliver',
  title: 'Delivering a lesson',
  what: 'The presenter view for the class: one activity at a time in big type, with a countdown for each that moves on by itself when it reaches zero.',
  steps: [
    {
      title: 'Start',
      body: 'Press Play (or the space bar). The ring counts down the activity; the bar at the top shows the whole session.',
    },
    {
      title: 'Move through it',
      body: 'Next and Prev (or the arrow keys) change activity. Tap a segment of the bar to jump straight to it.',
    },
    {
      title: 'Take the register',
      body: 'Register in the top bar opens the class register with the cohort and date filled in.',
    },
  ],
  notes: [
    {
      title: 'Keys',
      body: 'Space play or pause, arrows move, R resets the timer, F full screen, Esc goes back to the plan.',
    },
  ],
};

/* ==========================================================================
   LessonDeliverPage — presenter / "deliver" mode.
   - Fullscreen dark canvas, one activity at a time, big type (projector use —
     the teaching surface stays full-bleed on purpose)
   - Countdown timer per activity, auto-advances at zero
   - Keyboard: space = pause/play, ←/→ = nav, r = reset timer,
     f = fullscreen, Esc = exit

   Chrome is the shared hub masthead (Back = exit to the plan, Fullscreen on
   the right). Play is the one solid volt control; the timeline fills solid
   volt as the session runs. The seven-hue phase palette on the timeline went
   — blue/cyan/emerald/purple encoded nothing a tutor could read off it.
   ========================================================================== */

export default function LessonDeliverPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { plan: rawPlan, loading, error } = useLessonPlan(id ?? null);
  // Older plans can carry the generator's internal ids ("(facet 2,14)") in
  // any field; every string is cleaned before it is shown.
  const plan = useMemo(() => (rawPlan ? cleanLessonDeep(rawPlan) : rawPlan), [rawPlan]);

  const activities = plan?.activities ?? [];
  const totalMins = plan?.duration_mins ?? 0;

  const [index, setIndex] = useState(0);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [cohortId, setCohortId] = useState<string | null>(null);
  const [lessonTitle, setLessonTitle] = useState<string | null>(null);
  // The plan JSON has no cohort; the row does. Lesson → register (ELE-1890).
  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    void supabase
      .from('college_lesson_plans')
      .select('cohort_id, title')
      .eq('id', id)
      .maybeSingle()
      .then(({ data }) => {
        if (cancelled) return;
        const row = data as { cohort_id?: string | null; title?: string | null } | null;
        setCohortId(row?.cohort_id ?? null);
        setLessonTitle(row?.title ?? null);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);
  const current = activities[index];

  // Remaining seconds for the current activity
  const [remaining, setRemaining] = useState<number>(0);
  const [running, setRunning] = useState(false);
  const tickRef = useRef<number | null>(null);

  // Reset timer when activity changes
  useEffect(() => {
    if (!current) return;
    setRemaining(current.time_mins * 60);
    setRunning(false);
  }, [current]);

  // Tick loop
  useEffect(() => {
    if (!running) return;
    tickRef.current = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          // Auto-advance if there's another activity
          setIndex((i) => Math.min(i + 1, activities.length - 1));
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => {
      if (tickRef.current) window.clearInterval(tickRef.current);
    };
  }, [running, activities.length]);

  const goPrev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const goNext = useCallback(
    () => setIndex((i) => Math.min(activities.length - 1, i + 1)),
    [activities.length]
  );
  const resetTimer = useCallback(() => {
    if (current) setRemaining(current.time_mins * 60);
    setRunning(false);
  }, [current]);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch {
      /* ignore */
    }
  }, []);

  const exitToPlan = useCallback(() => navigate(`/college/lessons/${id}`), [navigate, id]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      // The register sheet owns the keyboard while it is open.
      if (registerOpen) return;
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        setRunning((r) => !r);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'r' || e.key === 'R') {
        resetTimer();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'Escape') {
        if (!document.fullscreenElement) exitToPlan();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goPrev, goNext, resetTimer, toggleFullscreen, exitToPlan, registerOpen]);

  // Elapsed time across the whole session
  const elapsedSeconds = useMemo(() => {
    if (!current) return 0;
    const mins = activities.slice(0, index).reduce((s, a) => s + a.time_mins, 0);
    return mins * 60 + (current.time_mins * 60 - remaining);
  }, [activities, index, current, remaining]);

  const totalSeconds = totalMins * 60;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-white">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-elec-yellow border-t-transparent" />
      </div>
    );
  }

  /*
   * A lesson made by hand (a title, a cohort and a time, no generated plan)
   * has nothing to present. It used to land here as "Lesson plan not found"
   * although the lesson exists: useLessonPlan returns no plan and no error
   * for a row with no content. Say what is true and offer what still works:
   * the register, and the plan page where the plan can be generated.
   */
  const noActivities = !error && (!plan || (plan.activities ?? []).length === 0);
  if (error || !plan || noActivities) {
    return (
      <div className="flex min-h-screen flex-col bg-background text-white">
        <HubMasthead
          section="Deliver"
          title={plan?.title ?? lessonTitle ?? 'Lesson'}
          onBack={exitToPlan}
        />
        <div className="flex flex-1 items-center justify-center px-6">
          <div className="max-w-md space-y-4 text-center">
            <h1 className="text-[17px] font-semibold text-white">
              {noActivities ? 'Nothing to present yet' : "Couldn't load the plan"}
            </h1>
            <p className="text-sm leading-relaxed text-white">
              {!noActivities
                ? error
                : plan
                  ? 'This plan has no timed activities to present. Read it on the lesson page, or take the register now.'
                  : 'This lesson has no activities to present, because it was set up by hand. Generate a plan for it from the lesson page, or take the register now.'}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {noActivities && cohortId && (
                <button
                  type="button"
                  onClick={() => setRegisterOpen(true)}
                  className="h-11 rounded-full bg-elec-yellow px-5 text-[13px] font-semibold text-black touch-manipulation"
                >
                  Take the register
                </button>
              )}
              <button
                type="button"
                onClick={exitToPlan}
                className="h-11 rounded-full border border-white/[0.12] bg-white/[0.06] px-5 text-[13px] font-medium text-white transition-colors touch-manipulation hover:bg-white/[0.09]"
              >
                Back to the lesson
              </button>
            </div>
          </div>
        </div>
        {cohortId && (
          <QuickRegisterSheet
            open={registerOpen}
            onOpenChange={setRegisterOpen}
            cohortId={cohortId}
            lessonTitle={lessonTitle}
            lessonPlanId={id}
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-white">
      <HubMasthead
        section="Deliver"
        title={plan.title}
        onBack={exitToPlan}
        trailing={
          <>
            {cohortId && (
              <button
                type="button"
                onClick={() => {
                  setRunning(false);
                  setRegisterOpen(true);
                }}
                className="flex h-11 items-center px-2 text-[12.5px] font-semibold text-elec-yellow transition-colors touch-manipulation"
              >
                Register
              </button>
            )}
            <button
              type="button"
              onClick={toggleFullscreen}
              className="hidden h-11 items-center px-2 text-[12.5px] font-medium text-white transition-colors touch-manipulation hover:text-elec-yellow sm:flex"
            >
              Full screen
            </button>
            <PageHelpButton help={HELP} compact />
          </>
        }
      />

      {/* Session progress bar */}
      <div className="px-5 pt-4 sm:px-8">
        <div className="mb-2 flex items-baseline justify-between gap-3">
          <div className="text-[12px] font-semibold text-white">Session progress</div>
          <div className="font-mono text-[11px] tabular-nums text-white">
            {formatClock(elapsedSeconds)} / {formatClock(totalSeconds)}
          </div>
        </div>
        <SegmentedTimeline
          activities={activities}
          total={totalMins}
          activeIndex={index}
          currentElapsed={current ? current.time_mins * 60 - remaining : 0}
          onJump={setIndex}
        />
      </div>

      {/* Main stage — full-bleed teaching surface, unchanged on purpose */}
      <main className="flex flex-1 items-stretch justify-center px-5 py-8 sm:px-8">
        <div className="grid w-full max-w-5xl grid-rows-[auto_1fr_auto] gap-8">
          {/* Activity header */}
          {current && (
            <div>
              <div className="mb-3 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.22em] text-white">
                <span className="tabular-nums text-elec-yellow">
                  {String(index + 1).padStart(2, '0')} /{' '}
                  {String(activities.length).padStart(2, '0')}
                </span>
                <span aria-hidden>·</span>
                <span>{current.phase}</span>
              </div>
              <h2 className="text-[28px] font-semibold leading-[1.05] tracking-tight text-white sm:text-[44px] lg:text-[56px]">
                {current.title}
              </h2>
            </div>
          )}

          {/* Activity body */}
          {current && (
            <div className="overflow-y-auto pr-1">
              <p className="max-w-[62ch] text-[16px] leading-relaxed text-white sm:text-[18px]">
                {current.description}
              </p>

              {current.teacher_moves && current.teacher_moves.length > 0 && (
                <div className="mt-8">
                  <div className="mb-3 text-[10px] font-medium uppercase tracking-[0.22em] text-white">
                    Teacher moves
                  </div>
                  <ul className="max-w-[62ch] space-y-3">
                    {current.teacher_moves.map((m, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          className="mt-[12px] h-1.5 w-1.5 shrink-0 rounded-full bg-elec-yellow"
                          aria-hidden
                        />
                        <span className="text-[15px] leading-relaxed text-white sm:text-[16px]">
                          {m}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {current.check_for_understanding && (
                <div className="mt-8 max-w-[62ch] rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] px-5 py-4">
                  <div className="mb-2 text-[10px] font-medium uppercase tracking-[0.22em] text-elec-yellow">
                    Check for understanding
                  </div>
                  <div className="text-[15px] leading-relaxed text-white sm:text-[16px]">
                    {current.check_for_understanding}
                  </div>
                </div>
              )}

              {current.resources_needed && current.resources_needed.length > 0 && (
                <div className="mt-8 text-[12.5px] leading-relaxed text-white">
                  <span className="font-semibold">Resources · </span>
                  {current.resources_needed.map(cleanLessonText).join(' · ')}
                </div>
              )}
            </div>
          )}

          {/* Transport controls */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <TransportBtn label="← Prev" onClick={goPrev} disabled={index === 0} />
              <TransportBtn
                label={running ? 'Pause ❙❙' : 'Play ►'}
                onClick={() => setRunning((r) => !r)}
                primary
              />
              <TransportBtn
                label="Next →"
                onClick={goNext}
                disabled={index === activities.length - 1}
              />
              <TransportBtn label="Reset" onClick={resetTimer} subtle />
            </div>

            <CountdownRing
              remaining={remaining}
              total={current ? current.time_mins * 60 : 0}
              running={running}
            />
          </div>
        </div>
      </main>

      {/* Bottom hint strip */}
      <footer className="hidden flex-wrap items-center justify-center gap-5 border-t border-white/[0.06] px-5 py-2.5 font-mono text-[10.5px] tracking-wide text-white sm:flex sm:px-8">
        <span>space play/pause</span>
        <span>← → nav</span>
        <span>r reset</span>
        <span>f fullscreen</span>
        <span>esc exit</span>
      </footer>

      {cohortId && (
        <QuickRegisterSheet
          open={registerOpen}
          onOpenChange={setRegisterOpen}
          cohortId={cohortId}
          lessonTitle={plan.title}
          lessonPlanId={id}
        />
      )}
    </div>
  );
}

/* ---- Segmented timeline ---------------------------------------------- */

/**
 * One segment per activity, width proportional to its minutes. Done and
 * elapsed time fill SOLID volt from the left; what is still to come stays a
 * quiet neutral. Volt here is a control fill, not a wash — the segments are
 * buttons.
 */
function SegmentedTimeline({
  activities,
  total,
  activeIndex,
  currentElapsed,
  onJump,
}: {
  activities: GeneratedActivity[];
  total: number;
  activeIndex: number;
  currentElapsed: number;
  onJump: (idx: number) => void;
}) {
  return (
    <div className="flex h-11 items-center">
      <div className="flex h-6 w-full overflow-hidden rounded-lg border border-white/[0.10] bg-white/[0.06]">
        {activities.map((a, i) => {
          const pct = Math.max(2, (a.time_mins / total) * 100);
          const isActive = i === activeIndex;
          const isDone = i < activeIndex;
          const innerFill = isActive
            ? Math.min(1, currentElapsed / (a.time_mins * 60))
            : isDone
              ? 1
              : 0;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onJump(i)}
              style={{ width: `${pct}%` }}
              className={cn(
                'relative border-r border-elec-dark last:border-r-0 transition-colors touch-manipulation',
                isActive ? 'bg-white/[0.14]' : 'bg-transparent hover:bg-white/[0.10]'
              )}
              title={`${a.title} · ${a.time_mins} min`}
              aria-label={`Jump to ${a.title}`}
              aria-current={isActive ? 'step' : undefined}
            >
              <div
                className={cn(
                  'absolute inset-y-0 left-0 bg-elec-yellow',
                  !isDone && 'transition-[width] duration-500'
                )}
                style={{ width: `${innerFill * 100}%` }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---- Countdown ring -------------------------------------------------- */

function CountdownRing({
  remaining,
  total,
  running,
}: {
  remaining: number;
  total: number;
  running: boolean;
}) {
  const pct = total > 0 ? Math.max(0, Math.min(1, remaining / total)) : 0;
  const size = 96;
  const r = 40;
  const c = 2 * Math.PI * r;
  const off = c * (1 - pct);

  // Red only when the clock is genuinely about to run out.
  const low = remaining <= 30 && remaining > 0;
  const colour = low ? 'stroke-red-400' : running ? 'stroke-elec-yellow' : 'stroke-white';

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          className="fill-none stroke-white/[0.10]"
          strokeWidth="6"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          className={cn('fill-none transition-all', colour, low && 'animate-pulse')}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={off}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={cn(
            'font-mono text-[18px] font-semibold tabular-nums',
            low ? 'text-red-300' : 'text-white'
          )}
        >
          {formatClock(remaining)}
        </div>
      </div>
    </div>
  );
}

/* ---- Bits ----------------------------------------------------------- */

function TransportBtn({
  label,
  onClick,
  disabled,
  primary,
  subtle,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  primary?: boolean;
  subtle?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'h-11 rounded-full px-5 text-[13px] font-medium transition-colors touch-manipulation disabled:cursor-not-allowed disabled:opacity-40',
        primary
          ? 'bg-elec-yellow font-semibold text-black hover:bg-elec-yellow/90'
          : subtle
            ? 'text-white hover:bg-white/[0.06]'
            : 'border border-white/[0.12] bg-white/[0.06] text-white hover:bg-white/[0.09]'
      )}
    >
      {label}
    </button>
  );
}

function formatClock(seconds: number): string {
  const s = Math.max(0, Math.round(seconds));
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}
