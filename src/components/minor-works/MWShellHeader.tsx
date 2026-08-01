/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';
import type { MWTabValue } from '@/hooks/useMinorWorksTabs';

interface MWShellHeaderProps {
  onBack: () => void;
  formData?: any;
  isSaving?: boolean;
  onManualSave?: () => void;
  syncState?: {
    status: 'synced' | 'syncing' | 'queued' | 'error';
    lastSyncTime?: number;
    errorMessage?: string;
  };
  isOnline?: boolean;
  /** ELE-1037 lock — a locked/QS-approved cert must not re-serialise on manual save */
  saveDisabled?: boolean;
  progressPercent: number;
  /** Tap the progress ring to see what's still missing (bottom sheet in the form). */
  onProgressTap?: () => void;
  currentTab: MWTabValue;
  onTabChange: (tab: MWTabValue) => void;
  completedTabs: Record<string, boolean>;
}

export const MW_STEPS: { id: MWTabValue; label: string }[] = [
  { id: 'details', label: 'Details' },
  { id: 'circuit', label: 'Circuit' },
  { id: 'testing', label: 'Testing' },
  { id: 'declaration', label: 'Sign off' },
];

/** Save state as a word — no icons (design rule: typography carries state).
 * 'queued' covers unsaved/pending/conflict via useCloudSync's mapping, so it
 * must read as the neutral action 'Save' — only 'synced' may claim 'Saved'. */
const saveWord = (
  isSaving: boolean,
  status: 'synced' | 'syncing' | 'queued' | 'error' | undefined,
  isOnline: boolean
): { word: string; tone: string } => {
  if (!isOnline) return { word: 'Offline', tone: 'text-orange-300' };
  if (isSaving || status === 'syncing') return { word: 'Saving', tone: 'text-white/90' };
  if (status === 'error') return { word: 'Retry save', tone: 'text-red-400' };
  if (status === 'synced') return { word: 'Saved', tone: 'text-green-400' };
  return { word: 'Save', tone: 'text-white/90' };
};

const RING_R = 14.5;
const RING_C = 2 * Math.PI * RING_R;

const MWShellHeader: React.FC<MWShellHeaderProps> = ({
  onBack,
  formData,
  isSaving = false,
  onManualSave,
  syncState,
  saveDisabled = false,
  isOnline = true,
  progressPercent,
  onProgressTap,
  currentTab,
  onTabChange,
  completedTabs,
}) => {
  const haptic = useHaptic();
  const certNumber = formData?.certificateNumber as string | undefined;
  const save = saveWord(isSaving, syncState?.status, isOnline);

  return (
    <>
      {/* Fixed under the app header, aligned to the content column via the
          layout's live --sidebar-width var (tracks desktop collapse).
          position:sticky is dead inside <main> — its overflow-x-hidden makes it
          a scroll container that never scrolls, so sticky pins to nothing. */}
      <div
        className="fixed right-0 z-40 bg-background/95 backdrop-blur-md border-b border-white/[0.08]"
        style={{
          top: 'var(--header-height, 56px)',
          left: 'var(--sidebar-width, 0px)',
        }}
      >
        <div className="flex items-center gap-3 px-4 pt-3 lg:px-8">
          <button
            onClick={onBack}
            className="h-11 px-3 -ml-3 text-[13px] font-semibold text-white/60 touch-manipulation active:scale-[0.97]"
          >
            Back
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="truncate text-base font-bold text-white leading-tight tracking-tight">
              Minor Works
            </h1>
            {certNumber && (
              <p className="truncate text-[10.5px] text-white/60 tabular-nums tracking-wide">
                {certNumber} · BS 7671
              </p>
            )}
          </div>
          <button
            onClick={onManualSave}
            disabled={saveDisabled || isSaving || syncState?.status === 'syncing'}
            aria-label={`Save now — currently ${save.word.toLowerCase()}`}
            className={cn(
              'h-11 px-3 text-[11.5px] font-semibold touch-manipulation active:scale-[0.97] disabled:opacity-60',
              save.tone
            )}
          >
            {save.word}
          </button>
          <button
            type="button"
            onClick={() => {
              haptic.light();
              onProgressTap?.();
            }}
            disabled={!onProgressTap}
            aria-label={`Certificate ${progressPercent}% complete — tap to see what's missing`}
            className="relative -m-1 grid h-11 w-11 shrink-0 place-items-center touch-manipulation active:scale-[0.95] transition-transform"
          >
            <svg width="36" height="36" className="-rotate-90" aria-hidden="true">
              <circle cx="18" cy="18" r={RING_R} fill="none" strokeWidth="3.4" className="stroke-white/[0.14]" />
              <circle
                cx="18"
                cy="18"
                r={RING_R}
                fill="none"
                strokeWidth="3.4"
                strokeLinecap="round"
                strokeDasharray={RING_C}
                strokeDashoffset={RING_C * (1 - progressPercent / 100)}
                className="stroke-elec-yellow transition-[stroke-dashoffset] duration-500"
              />
            </svg>
            <span
              aria-hidden="true"
              className="absolute inset-0 grid place-items-center text-[9px] font-bold text-white tabular-nums"
            >
              {progressPercent}%
            </span>
          </button>
        </div>

        {/* Full-width step tabs — four equal columns, volt underline on current,
            volt label only when the step is genuinely complete. No badges, no icons. */}
        <nav aria-label="Certificate steps" className="flex mt-1 lg:max-w-[720px]">
          {MW_STEPS.map((step) => {
            const isActive = step.id === currentTab;
            const isDone = !isActive && !!completedTabs[step.id];
            return (
              <button
                key={step.id}
                onClick={() => {
                  if (!isActive) {
                    haptic.light();
                    onTabChange(step.id);
                  }
                }}
                aria-current={isActive ? 'step' : undefined}
                className={cn(
                  'relative flex-1 h-11 text-[13px] lg:text-sm font-semibold touch-manipulation transition-colors',
                  isActive ? 'text-white' : isDone ? 'text-elec-yellow/90' : 'text-white/60'
                )}
              >
                {step.label}
                <span
                  className={cn(
                    'absolute left-[14%] right-[14%] bottom-0 h-[2px] rounded-full transition-colors',
                    isActive ? 'bg-elec-yellow' : 'bg-transparent'
                  )}
                />
              </button>
            );
          })}
        </nav>
      </div>
      {/* Spacer — reserves the shell's height in the document flow */}
      <div className="h-[105px]" aria-hidden="true" />
    </>
  );
};

export default MWShellHeader;
