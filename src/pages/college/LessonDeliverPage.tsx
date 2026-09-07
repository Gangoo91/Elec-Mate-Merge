import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { HubMasthead } from '@/components/hub/HubPrimitives';
import { useLessonPlan, type GeneratedActivity } from '@/hooks/useCurriculum';

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
  const { plan, loading, error } = useLessonPlan(id ?? null);

  const activities = plan?.activities ?? [];
  const totalMins = plan?.duration_mins ?? 0;

  const [index, setIndex] = useState(0);
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
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)
        return;
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
  }, [goPrev, goNext, resetTimer, toggleFullscreen, exitToPlan]);

  // Elapsed time across the whole session
  const elapsedSeconds = useMemo(() => {
    if (!current) return 0;
    const mins = activities.slice(0, index).reduce((s, a) => s + a.time_mins, 0);
    return mins * 60 + (current.time_mins * 60 - remaining);
  }, [activities, index, current, remaining]);

  const totalSeconds = totalMins * 60;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-elec-dark text-white">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-elec-yellow border-t-transparent" />
      </div>
    );
  }

  if (error || !plan) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-elec-dark px-6 text-white">
        <div className="max-w-md space-y-4 text-center">
          <h1 className="text-[15px] font-semibold text-red-300">Couldn't load plan</h1>
          <p className="text-sm leading-relaxed text-white">{error ?? 'Lesson plan not found.'}</p>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="h-11 rounded-full border border-white/[0.12] bg-white/[0.06] px-5 text-[13px] font-medium text-white transition-colors touch-manipulation hover:bg-white/[0.09]"
          >
            ← Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-elec-dark text-white">
      <HubMasthead
        section="Deliver"
        title={plan.title}
        onBack={exitToPlan}
        trailing={
          <button
            type="button"
            onClick={toggleFullscreen}
            className="flex h-11 items-center px-2 text-[12.5px] font-medium text-white transition-colors touch-manipulation hover:text-elec-yellow"
          >
            Fullscreen
          </button>
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
                  {String(index + 1).padStart(2, '0')} / {String(activities.length).padStart(2, '0')}
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
                <div
                  className={cn(
                    'mt-8 max-w-[62ch] rounded-2xl border border-elec-yellow/35 px-5 py-4',
                    CARD_SURFACE
                  )}
                >
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
                  {current.resources_needed.join(' · ')}
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
      <footer className="flex flex-wrap items-center justify-center gap-5 border-t border-white/[0.06] px-5 py-2.5 font-mono text-[10.5px] tracking-wide text-white sm:px-8">
        <span>space play/pause</span>
        <span>← → nav</span>
        <span>r reset</span>
        <span>f fullscreen</span>
        <span>esc exit</span>
      </footer>
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
