import React from 'react';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';
import type { SyncStatus } from '@/hooks/useReportSync';

export interface CertShellStep {
  id: string;
  label: string;
}

interface CertShellHeaderProps {
  onBack: () => void;
  /** Big title, e.g. "PAT Testing" */
  title: string;
  /** Small line under the title, e.g. "PAT-2026-0012 · IET 5th Ed" */
  subtitle?: string | null;
  isSaving?: boolean;
  onManualSave?: () => void;
  syncStatus?: SyncStatus;
  progressPercent: number;
  steps: CertShellStep[];
  currentTab: string;
  onTabChange: (tab: string) => void;
  completedTabs: Record<string, boolean>;
}

/** Save state as a word — no icons (design rule: typography carries state). */
const saveWord = (
  isSaving: boolean,
  cloud: SyncStatus['cloud'] | undefined
): { word: string; tone: string } => {
  if (cloud === 'offline') return { word: 'Offline', tone: 'text-orange-300' };
  if (isSaving || cloud === 'syncing') return { word: 'Saving', tone: 'text-white/90' };
  if (cloud === 'error' || cloud === 'conflict') return { word: 'Retry save', tone: 'text-red-400' };
  if (cloud === 'synced') return { word: 'Saved', tone: 'text-green-400' };
  return { word: 'Save', tone: 'text-white/90' };
};

const RING_R = 14.5;
const RING_C = 2 * Math.PI * RING_R;

/**
 * Shared certificate shell header — fixed bar with Back, title, save word,
 * progress ring and full-width step tabs. Proven on Minor Works and EV
 * Charging; every specialist cert wires this instead of cloning it.
 *
 * position:sticky is dead inside the app's <main> (overflow-x-hidden makes it
 * a scroll container that never scrolls), hence fixed + the layout's live
 * --header-height / --sidebar-width vars.
 */
const CertShellHeader: React.FC<CertShellHeaderProps> = ({
  onBack,
  title,
  subtitle,
  isSaving = false,
  onManualSave,
  syncStatus,
  progressPercent,
  steps,
  currentTab,
  onTabChange,
  completedTabs,
}) => {
  const haptic = useHaptic();
  const save = saveWord(isSaving, syncStatus?.cloud);

  return (
    <>
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
            className="h-11 px-1 -ml-1 text-[13px] font-semibold text-white/85 touch-manipulation active:scale-[0.97]"
          >
            Back
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="truncate text-base font-bold text-white leading-tight tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="truncate text-[10.5px] text-white/85 tabular-nums tracking-wide">
                {subtitle}
              </p>
            )}
          </div>
          <button
            onClick={onManualSave}
            disabled={isSaving || syncStatus?.cloud === 'syncing'}
            aria-label={`Save now — currently ${save.word.toLowerCase()}`}
            className={cn(
              'h-11 px-1 text-[11.5px] font-semibold touch-manipulation active:scale-[0.97] disabled:opacity-60',
              save.tone
            )}
          >
            {save.word}
          </button>
          <div
            role="img"
            aria-label={`Certificate ${progressPercent}% complete`}
            className="relative h-9 w-9 shrink-0"
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
          </div>
        </div>

        {/* Full-width step tabs — equal columns, volt underline on current,
            volt label only when the step is genuinely complete. */}
        <nav aria-label="Certificate steps" className="flex mt-1 lg:max-w-[720px]">
          {steps.map((step) => {
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
                  isActive ? 'text-white' : isDone ? 'text-elec-yellow/90' : 'text-white/85'
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

export default CertShellHeader;
