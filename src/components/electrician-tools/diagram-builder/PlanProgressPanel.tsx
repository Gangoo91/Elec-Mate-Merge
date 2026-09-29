/**
 * Live progress while a plan is read or drawn (28 Sep 2026).
 *
 * Every step is driven by a real event from the function — nothing is a timer
 * pretending. The first step has no event until the rooms are found, so it
 * shows elapsed time rather than a fake bar.
 *
 * Laid out like the preview it replaces: the plan on the left under a moving
 * scan line, the steps on the right ticking off. Describe has no plan, so it
 * is the steps alone.
 */
import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PlanProgressState } from './generatePlan';

interface Props {
  progress: PlanProgressState;
  elapsed: number;
  /** 'plan' when reading a drawing, 'describe' when drawing from words. */
  source: 'plan' | 'describe';
  /** The plan being read. */
  previewUrl?: string | null;
  /** Shown as the heading on the right. */
  fileName?: string;
}

type StepState = 'done' | 'active' | 'waiting';

export function PlanProgressPanel({ progress, elapsed, source, previewUrl, fileName }: Props) {
  const reduceMotion = useReducedMotion();
  const roomsFound = !!progress.found;
  const electrics = progress.electrics;
  const electricsDone = !!electrics && electrics.total > 0 && electrics.done >= electrics.total;
  const floors = progress.found?.floors ?? [];
  const roomCount = progress.found?.rooms ?? 0;
  const pct =
    electrics && electrics.total > 0 ? Math.round((electrics.done / electrics.total) * 100) : 0;

  const steps: { title: string; detail?: string; state: StepState }[] = [
    {
      title: roomsFound
        ? `${roomCount} room${roomCount === 1 ? '' : 's'} found`
        : source === 'plan'
          ? 'Reading the drawing'
          : 'Understanding your description',
      detail: roomsFound
        ? floors.length > 1
          ? floors.join(' · ')
          : 'Named and sized as drawn'
        : source === 'plan'
          ? 'Finding every room, floor by floor'
          : 'Working out the rooms and how they join',
      state: roomsFound ? 'done' : 'active',
    },
    {
      title: 'Laying out the walls',
      detail: roomsFound ? 'Rooms placed and lined up' : 'Rooms sized and placed as drawn',
      state: roomsFound ? 'done' : 'waiting',
    },
    {
      title: 'Designing the electrics',
      detail: electrics
        ? `${Math.min(electrics.done, electrics.total)} of ${electrics.total} rooms`
        : 'Sockets, lighting, switching and detection',
      state: electricsDone ? 'done' : roomsFound ? 'active' : 'waiting',
    },
    {
      title: 'Drawing the plan',
      detail: 'On the canvas, ready to edit',
      state: electricsDone ? 'active' : 'waiting',
    },
  ];

  const stepList = (
    <ol className="border-t border-white/[0.12]" aria-live="polite">
      {steps.map((step, i) => (
        <li key={step.title} className="border-b border-white/[0.12] py-3">
          <div className="flex gap-3">
            <span
              className={cn(
                'flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold tabular-nums transition-colors',
                step.state === 'done' && 'bg-elec-yellow text-black',
                step.state === 'active' && 'border border-elec-yellow text-elec-yellow',
                step.state === 'waiting' && 'border border-white/[0.2] text-white'
              )}
            >
              {step.state === 'done' ? (
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              ) : (
                String(i + 1).padStart(2, '0')
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p
                className={cn(
                  'text-[14px] leading-tight',
                  step.state === 'waiting' ? 'font-medium text-white' : 'font-semibold',
                  step.state === 'active' ? 'text-elec-yellow' : 'text-white'
                )}
              >
                {step.title}
                {step.state === 'active' && !reduceMotion && (
                  <motion.span
                    aria-hidden
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                  >
                    …
                  </motion.span>
                )}
              </p>
              {step.detail && <p className="mt-0.5 text-[12px] text-white">{step.detail}</p>}
              {i === 2 && electrics && !electricsDone && (
                <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-elec-yellow transition-[width] duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );

  const footer = (
    <p className="text-[12px] tabular-nums text-white">
      {elapsed < 25
        ? source === 'plan'
          ? `${elapsed}s · a whole building takes 40 seconds to a minute`
          : `${elapsed}s · a whole house takes about 40 seconds`
        : `${elapsed}s · still working — bigger plans take a little longer`}
    </p>
  );

  if (!previewUrl) {
    return (
      <div className="space-y-5">
        <div>
          <p className="text-[20px] font-bold leading-tight tracking-tight text-white">
            Drawing your plan
          </p>
          <p className="mt-1 text-[13px] text-white">Keep this open — it takes under a minute.</p>
        </div>
        {stepList}
        {footer}
      </div>
    );
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,1fr)] lg:gap-7">
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.14] bg-white">
        <img
          src={previewUrl}
          alt=""
          className={cn(
            'h-64 w-full object-contain transition-opacity duration-700 sm:h-80 lg:h-[26rem]',
            electricsDone ? 'opacity-100' : 'opacity-70'
          )}
        />
        {!reduceMotion && !electricsDone && (
          <motion.div
            aria-hidden
            className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-elec-yellow/35 to-transparent"
            initial={{ top: '-20%' }}
            animate={{ top: ['-20%', '105%'] }}
            transition={{ duration: roomsFound ? 1.6 : 2.6, repeat: Infinity, ease: 'linear' }}
          />
        )}
        {roomsFound && (
          <div className="absolute bottom-3 left-3 rounded-lg bg-black/85 px-2.5 py-1.5 text-[12px] font-semibold text-elec-yellow">
            {roomCount} rooms{floors.length > 1 ? ` · ${floors.length} floors` : ''}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <p className="truncate text-[17px] font-bold tracking-tight text-white" title={fileName}>
            {fileName || 'Your plan'}
          </p>
          <p className="mt-0.5 text-[13px] text-white">Keep this open — it takes under a minute.</p>
        </div>
        {stepList}
        {footer}
      </div>
    </div>
  );
}
