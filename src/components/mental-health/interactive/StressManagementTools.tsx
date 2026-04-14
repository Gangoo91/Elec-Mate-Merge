import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const StressManagementTools = () => {
  const [active, setActive] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale');
  const [timeLeft, setTimeLeft] = useState(4);
  const [cycles, setCycles] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const exercises = [
    { id: 'box', title: 'Box Breathing', sub: '4-4-4-4 pattern for instant calm', dur: '4 min', phases: { inhale: 4, hold: 4, exhale: 4, pause: 4 }, totalCycles: 15 },
    { id: 'quick', title: 'Quick Calm', sub: 'Longer exhale for rapid relief', dur: '2 min', phases: { inhale: 3, hold: 0, exhale: 6, pause: 0 }, totalCycles: 13 },
    { id: 'relax', title: 'Deep Relax', sub: 'Slow breathing to unwind', dur: '3 min', phases: { inhale: 5, hold: 3, exhale: 7, pause: 0 }, totalCycles: 12 },
  ];

  const activeEx = exercises.find((e) => e.id === active);

  useEffect(() => {
    if (!isRunning || !activeEx) return;
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          const phaseOrder: Array<'inhale' | 'hold' | 'exhale' | 'pause'> = ['inhale', 'hold', 'exhale', 'pause'];
          const nextIdx = (phaseOrder.indexOf(phase) + 1) % 4;
          let nextPhase = phaseOrder[nextIdx];
          // Skip phases with 0 duration
          while (activeEx.phases[nextPhase] === 0) {
            const skipIdx = (phaseOrder.indexOf(nextPhase) + 1) % 4;
            nextPhase = phaseOrder[skipIdx];
          }
          if (nextPhase === 'inhale') {
            setCycles((c) => {
              if (c + 1 >= activeEx.totalCycles) { setIsRunning(false); return 0; }
              return c + 1;
            });
          }
          setPhase(nextPhase);
          return activeEx.phases[nextPhase];
        }
        return t - 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRunning, phase, activeEx]);

  const start = (id: string) => {
    const ex = exercises.find((e) => e.id === id)!;
    setActive(id);
    setPhase('inhale');
    setTimeLeft(ex.phases.inhale);
    setCycles(0);
    setIsRunning(true);
  };

  const stop = () => { setIsRunning(false); setActive(null); };

  const phaseLabels = { inhale: 'Breathe in', hold: 'Hold', exhale: 'Breathe out', pause: 'Pause' };
  const phaseColors = { inhale: 'text-blue-400', hold: 'text-amber-400', exhale: 'text-emerald-400', pause: 'text-white/80' };

  if (active && isRunning) {
    return (
      <div className="flex flex-col items-center py-8 space-y-6">
        <p className="text-[10px] font-bold text-white/70 uppercase tracking-wider">{activeEx?.title}</p>
        <div className={cn(
          'w-36 h-36 rounded-full border-2 flex items-center justify-center transition-all duration-1000 ease-in-out',
          phase === 'inhale' ? 'border-blue-400/50 bg-blue-500/10 scale-110' :
          phase === 'hold' ? 'border-amber-400/50 bg-amber-500/10 scale-105' :
          phase === 'exhale' ? 'border-emerald-400/50 bg-emerald-500/10 scale-90' :
          'border-white/20 bg-white/[0.03] scale-95'
        )}>
          <div className="text-center">
            <p className={cn('text-base font-semibold', phaseColors[phase])}>{phaseLabels[phase]}</p>
            <p className="text-3xl font-bold text-white mt-1">{timeLeft}</p>
          </div>
        </div>
        <p className="text-xs text-white/70">Cycle {cycles + 1}</p>
        <button onClick={stop} className="h-11 px-8 rounded-2xl bg-white/[0.06] border border-white/[0.1] text-white text-sm font-medium touch-manipulation active:scale-[0.98]">
          Stop
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3 pt-3">
      <p className="text-xs text-white/60 mb-1">Choose a breathing exercise:</p>
      {exercises.map((ex) => (
        <button
          key={ex.id}
          onClick={() => start(ex.id)}
          className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] touch-manipulation active:scale-[0.98] transition-all text-left"
        >
          <div className="w-9 h-9 rounded-lg bg-blue-500/15 flex items-center justify-center flex-shrink-0">
            <span className="text-blue-400 text-xs font-bold">{ex.dur}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-white">{ex.title}</h4>
            <p className="text-[11px] text-white/80">{ex.sub}</p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default StressManagementTools;
