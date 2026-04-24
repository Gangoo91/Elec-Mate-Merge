import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useLessonPlan, type GeneratedActivity } from '@/hooks/useCurriculum';

/* ==========================================================================
   LessonDeliverPage — presenter / "deliver" mode.
   - Fullscreen dark canvas
   - One activity at a time, big type
   - Countdown timer per activity, auto-advances at zero
   - Keyboard: space = pause/play, ←/→ = nav, r = reset timer,
     f = fullscreen, Esc = exit
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
        if (!document.fullscreenElement) navigate(`/college/lessons/${id}`);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goPrev, goNext, resetTimer, toggleFullscreen, navigate, id]);

  // Elapsed time across the whole session
  const elapsedSeconds = useMemo(() => {
    if (!current) return 0;
    const mins = activities.slice(0, index).reduce((s, a) => s + a.time_mins, 0);
    return mins * 60 + (current.time_mins * 60 - remaining);
  }, [activities, index, current, remaining]);

  const totalSeconds = totalMins * 60;

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="h-8 w-8 rounded-full border-2 border-white/15 border-t-elec-yellow animate-spin" />
      </div>
    );
  }

  if (error || !plan) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="max-w-md text-center space-y-4">
          <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-red-300">
            Couldn't load plan
          </div>
          <p className="text-white/80 text-sm leading-relaxed">
            {error ?? 'Lesson plan not found.'}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="h-10 px-5 rounded-full border border-white/[0.15] text-white text-[13px] hover:bg-white/[0.06]"
          >
            ← Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Top chrome */}
      <header className="border-b border-white/[0.06] px-5 sm:px-8 py-4 flex items-center justify-between gap-4">
        <div className="min-w-0 flex items-center gap-4">
          <button
            onClick={() => navigate(`/college/lessons/${id}`)}
            className="text-[12px] text-white/65 hover:text-white transition-colors shrink-0"
          >
            ← Exit
          </button>
          <div className="min-w-0">
            <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-elec-yellow/80">
              Deliver mode
            </div>
            <h1 className="text-[14px] sm:text-[15px] font-semibold text-white truncate max-w-[60ch]">
              {plan.title}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={toggleFullscreen}
            className="h-9 px-3.5 rounded-full border border-white/[0.1] text-[12px] text-white/85 hover:bg-white/[0.06] transition-colors"
          >
            Fullscreen
          </button>
        </div>
      </header>

      {/* Session progress bar */}
      <div className="px-5 sm:px-8 pt-4">
        <div className="flex items-baseline justify-between gap-3 mb-2">
          <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/55">
            Session progress
          </div>
          <div className="text-[11px] font-mono tabular-nums text-white/70">
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

      {/* Main stage */}
      <main className="flex-1 flex items-stretch justify-center px-5 sm:px-8 py-8">
        <div className="w-full max-w-5xl grid grid-rows-[auto_1fr_auto] gap-8">
          {/* Activity header */}
          {current && (
            <div>
              <div className="flex items-center gap-3 mb-3 text-[10px] font-medium uppercase tracking-[0.22em] text-white/55">
                <span className="text-elec-yellow tabular-nums">
                  {String(index + 1).padStart(2, '0')} / {String(activities.length).padStart(2, '0')}
                </span>
                <span className="text-white/25">·</span>
                <span>{current.phase}</span>
              </div>
              <h2 className="text-[28px] sm:text-[44px] lg:text-[56px] font-semibold tracking-tight leading-[1.05] text-white">
                {current.title}
              </h2>
            </div>
          )}

          {/* Activity body */}
          {current && (
            <div className="overflow-y-auto pr-1">
              <p className="text-[16px] sm:text-[18px] leading-relaxed text-white/85 max-w-[62ch]">
                {current.description}
              </p>

              {current.teacher_moves && current.teacher_moves.length > 0 && (
                <div className="mt-8">
                  <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/55 mb-3">
                    Teacher moves
                  </div>
                  <ul className="space-y-3 max-w-[62ch]">
                    {current.teacher_moves.map((m, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          className="mt-[12px] h-1.5 w-1.5 rounded-full bg-elec-yellow shrink-0"
                          aria-hidden
                        />
                        <span className="text-[15px] sm:text-[16px] text-white/90 leading-relaxed">
                          {m}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {current.check_for_understanding && (
                <div className="mt-8 rounded-xl border border-elec-yellow/30 bg-elec-yellow/[0.05] px-5 py-4 max-w-[62ch]">
                  <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-elec-yellow mb-2">
                    Check for understanding
                  </div>
                  <div className="text-[15px] sm:text-[16px] text-white leading-relaxed">
                    {current.check_for_understanding}
                  </div>
                </div>
              )}

              {current.resources_needed && current.resources_needed.length > 0 && (
                <div className="mt-8 text-[12.5px] text-white/65 leading-relaxed">
                  <span className="text-white/85 font-medium">Resources · </span>
                  {current.resources_needed.join(' · ')}
                </div>
              )}
            </div>
          )}

          {/* Transport controls */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2">
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
      <footer className="border-t border-white/[0.06] px-5 sm:px-8 py-2.5 flex items-center justify-center gap-5 text-[10.5px] text-white/45 font-mono tracking-wide flex-wrap">
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

const PHASE_TONE: Record<GeneratedActivity['phase'], string> = {
  starter: 'bg-elec-yellow/75',
  input: 'bg-blue-400/75',
  modelling: 'bg-cyan-400/75',
  practice: 'bg-emerald-400/75',
  practical: 'bg-emerald-500/75',
  afl: 'bg-purple-400/75',
  plenary: 'bg-amber-400/75',
};

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
    <div className="flex rounded-lg overflow-hidden h-6 bg-white/[0.04] border border-white/[0.06]">
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
            onClick={() => onJump(i)}
            style={{ width: `${pct}%` }}
            className={cn(
              'relative group border-r border-black/30 last:border-r-0 transition-opacity',
              isActive ? 'opacity-100' : 'opacity-55 hover:opacity-85'
            )}
            title={`${a.title} · ${a.time_mins} min`}
          >
            <div className={cn('absolute inset-0', PHASE_TONE[a.phase])} />
            <div
              className={cn(
                'absolute top-0 bottom-0 left-0 bg-black/55',
                !isDone && 'transition-[width] duration-500'
              )}
              style={{ width: `${(1 - innerFill) * 100}%` }}
            />
          </button>
        );
      })}
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

  const low = remaining <= 30 && remaining > 0;
  const colour = low ? 'stroke-red-400' : running ? 'stroke-elec-yellow' : 'stroke-white/70';

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          className="stroke-white/[0.08] fill-none"
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
            'text-[18px] font-mono tabular-nums font-semibold',
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
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'h-11 px-5 rounded-full text-[13px] font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed touch-manipulation',
        primary
          ? 'bg-elec-yellow text-black hover:bg-elec-yellow/90'
          : subtle
            ? 'text-white/70 hover:text-white hover:bg-white/[0.06]'
            : 'border border-white/[0.12] text-white hover:bg-white/[0.06]'
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
