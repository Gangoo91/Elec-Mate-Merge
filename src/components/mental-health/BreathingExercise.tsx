import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, Pause, RotateCcw, Volume2, VolumeX, Check } from 'lucide-react';
import {
  Eyebrow,
  PrimaryButton,
  SecondaryButton,
  IconButton,
} from '@/components/college/primitives';

interface BreathingExerciseProps {
  onClose: () => void;
}

const BreathingExercise = ({ onClose }: BreathingExerciseProps) => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'ready' | 'inhale' | 'hold' | 'exhale' | 'complete'>('ready');
  const [timeLeft, setTimeLeft] = useState(4);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  const [totalCycles] = useState(4);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Respect the OS-level reduce-motion setting. When on, we replace the
  // expanding/shrinking circle with a still pulse-free dot so users with
  // vestibular sensitivity can still follow the timer.
  const [reduceMotion, setReduceMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  const phaseConfig = {
    inhale: { duration: 4, instruction: 'Breathe In', color: 'from-blue-400 to-cyan-400' },
    hold: { duration: 4, instruction: 'Hold', color: 'from-purple-400 to-pink-400' },
    exhale: { duration: 4, instruction: 'Breathe Out', color: 'from-green-400 to-emerald-400' },
  };

  useEffect(() => {
    if (isActive && phase !== 'ready' && phase !== 'complete') {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Move to next phase
            if (phase === 'inhale') {
              setPhase('hold');
              return phaseConfig.hold.duration;
            } else if (phase === 'hold') {
              setPhase('exhale');
              return phaseConfig.exhale.duration;
            } else if (phase === 'exhale') {
              const newCycles = cyclesCompleted + 1;
              setCyclesCompleted(newCycles);
              if (newCycles >= totalCycles) {
                setPhase('complete');
                setIsActive(false);
                return 0;
              }
              setPhase('inhale');
              return phaseConfig.inhale.duration;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, phase, cyclesCompleted, totalCycles]);

  const startExercise = () => {
    setPhase('inhale');
    setTimeLeft(phaseConfig.inhale.duration);
    setCyclesCompleted(0);
    setIsActive(true);
  };

  const togglePause = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setIsActive(false);
    setPhase('ready');
    setTimeLeft(4);
    setCyclesCompleted(0);
  };

  const getCircleScale = () => {
    if (phase === 'ready' || phase === 'complete') return 1;
    const config = phaseConfig[phase as keyof typeof phaseConfig];
    const progress = (config.duration - timeLeft) / config.duration;

    if (phase === 'inhale') return 1 + progress * 0.5;
    if (phase === 'hold') return 1.5;
    if (phase === 'exhale') return 1.5 - progress * 0.5;
    return 1;
  };

  const getCurrentColor = () => {
    if (phase === 'ready') return 'from-blue-400/50 to-cyan-400/50';
    if (phase === 'complete') return 'from-green-400 to-emerald-400';
    return phaseConfig[phase as keyof typeof phaseConfig]?.color || 'from-blue-400 to-cyan-400';
  };

  return (
    <div className="min-h-[80vh] flex flex-col">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-[hsl(0_0%_8%)]/95 backdrop-blur-xl border-b border-white/[0.06] px-4 py-3 -mx-4 mb-4">
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full text-[13px] font-medium text-white hover:bg-white/[0.06] transition-colors touch-manipulation"
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </button>
          <IconButton
            onClick={() => setSoundEnabled(!soundEnabled)}
            aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
          >
            {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
          </IconButton>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {phase === 'complete' ? (
          /* Completion Screen */
          <div className="text-center space-y-6 animate-fade-in max-w-sm">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center">
              <Check className="h-12 w-12 text-black" />
            </div>
            <div>
              <Eyebrow>Mental health</Eyebrow>
              <h2 className="mt-1.5 text-[22px] sm:text-[28px] font-semibold text-white tracking-tight leading-tight">
                Well done
              </h2>
              <p className="mt-3 text-[13px] text-white">
                You completed {totalCycles} breathing cycles.
              </p>
              <p className="mt-1 text-[12.5px] text-white">
                Take a moment to notice how you feel.
              </p>
            </div>
            <div className="flex gap-3 justify-center">
              <SecondaryButton onClick={reset} size="lg">
                <RotateCcw className="h-5 w-5 mr-2" />
                Again
              </SecondaryButton>
              <PrimaryButton onClick={onClose} size="lg">
                Done
              </PrimaryButton>
            </div>
          </div>
        ) : (
          /* Exercise Screen */
          <>
            <div className="text-center mb-8">
              <Eyebrow>Mental health</Eyebrow>
              <h2 className="mt-1.5 text-xl sm:text-2xl font-semibold text-white tracking-tight">
                Box breathing
              </h2>
              <p className="mt-2 text-[13px] text-white">
                {phase === 'ready'
                  ? 'Find a comfortable position and relax'
                  : `Cycle ${cyclesCompleted + 1} of ${totalCycles}`}
              </p>
            </div>

            {/* Breathing Circle - Responsive for mobile */}
            <div className="relative w-[min(16rem,80vw)] h-[min(16rem,80vw)] mb-8">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-4 border-white/[0.08]" />

              {/* Progress ring */}
              {phase !== 'ready' && (
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 256 256">
                  <circle
                    cx="128"
                    cy="128"
                    r="124"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeDasharray={780}
                    strokeDashoffset={780 - 780 * (cyclesCompleted / totalCycles)}
                    className="text-elec-yellow/40 transition-all duration-500"
                  />
                </svg>
              )}

              {/* Animated breathing circle — animation disabled when the
                  user has prefers-reduced-motion set */}
              <div
                className={`absolute inset-4 rounded-full bg-gradient-to-br ${getCurrentColor()}
                  flex items-center justify-center shadow-lg shadow-blue-500/20 ${
                    reduceMotion ? '' : 'transition-transform duration-1000 ease-in-out'
                  }`}
                style={{ transform: `scale(${reduceMotion ? 1.25 : getCircleScale()})` }}
              >
                <div className="text-center text-white">
                  {phase === 'ready' ? (
                    <div className="text-lg font-medium">Ready?</div>
                  ) : (
                    <>
                      <div className="text-4xl sm:text-5xl font-bold mb-1">{timeLeft}</div>
                      <div className="text-sm font-medium opacity-90">
                        {phaseConfig[phase as keyof typeof phaseConfig]?.instruction}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Phase Indicators */}
            {phase !== 'ready' && (
              <div className="flex gap-2 mb-8">
                {['inhale', 'hold', 'exhale'].map((p) => (
                  <div
                    key={p}
                    className={`text-[12.5px] px-4 py-1.5 rounded-full transition-all ${
                      phase === p
                        ? 'bg-elec-yellow text-black font-semibold'
                        : 'bg-white/[0.06] text-white border border-white/[0.08]'
                    }`}
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </div>
                ))}
              </div>
            )}

            {/* Controls */}
            <div className="flex gap-3">
              {phase === 'ready' ? (
                <PrimaryButton onClick={startExercise} size="lg">
                  <Play className="h-5 w-5 mr-2" />
                  Start
                </PrimaryButton>
              ) : (
                <>
                  <SecondaryButton onClick={togglePause} size="lg">
                    {isActive ? (
                      <>
                        <Pause className="h-5 w-5 mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="h-5 w-5 mr-2" />
                        Resume
                      </>
                    )}
                  </SecondaryButton>
                  <IconButton onClick={reset} aria-label="Reset">
                    <RotateCcw className="h-5 w-5" />
                  </IconButton>
                </>
              )}
            </div>
          </>
        )}
      </div>

      {/* Tips */}
      <div className="mt-auto bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-4">
        <p className="text-[12.5px] text-white text-center leading-relaxed">
          {phase === 'ready'
            ? 'Box breathing helps activate your parasympathetic nervous system, reducing stress and anxiety.'
            : phase === 'complete'
              ? 'Regular practice can help manage stress, improve focus, and promote better sleep.'
              : 'Focus on the rhythm. Let your thoughts pass without judgment.'}
        </p>
      </div>
    </div>
  );
};

export default BreathingExercise;
