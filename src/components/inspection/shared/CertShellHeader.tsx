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
  /** Tap the progress ring to see what's still missing (cert renders its own sheet). */
  onProgressTap?: () => void;
  steps: CertShellStep[];
  currentTab: string;
  onTabChange: (tab: string) => void;
  completedTabs: Record<string, boolean>;
}

/**
 * Save state as a word — no icons (design rule: typography carries state).
 *
 * `queued` gets its own word deliberately. Work that failed to reach the cloud
 * is enqueued for retry (useReportSync ~line 906) and is safe in localStorage,
 * but it previously fell through to the same "Save" as a brand-new draft — so
 * an electrician on bad signal had no way to tell there was outstanding work
 * not yet on the server. Their phone going in a puddle would take it with them.
 * "Pending" states that plainly, and the count shows how much is outstanding.
 */
const saveWord = (
  isSaving: boolean,
  cloud: SyncStatus['cloud'] | undefined,
  queuedChanges = 0
): { word: string; tone: string } => {
  if (cloud === 'offline') return { word: 'Offline', tone: 'text-orange-300' };
  if (isSaving || cloud === 'syncing') return { word: 'Saving', tone: 'text-white/90' };
  if (cloud === 'error' || cloud === 'conflict') return { word: 'Retry save', tone: 'text-red-400' };
  if (cloud === 'queued') {
    return {
      word: queuedChanges > 1 ? `Pending ${queuedChanges}` : 'Pending',
      tone: 'text-amber-300',
    };
  }
  if (cloud === 'synced') return { word: 'Saved', tone: 'text-green-400' };
  if (cloud === 'unsaved') return { word: 'Not saved', tone: 'text-white/90' };
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
  onProgressTap,
  steps,
  currentTab,
  onTabChange,
  completedTabs,
}) => {
  const haptic = useHaptic();
  const save = saveWord(isSaving, syncStatus?.cloud, syncStatus?.queuedChanges);

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
            className="h-11 px-3 -ml-3 text-[13px] font-semibold text-white/85 touch-manipulation active:scale-[0.97] outline-none focus:outline-none focus-visible:outline-none"
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
              'h-11 px-3 text-[11.5px] font-semibold touch-manipulation active:scale-[0.97] disabled:opacity-60 outline-none focus:outline-none focus-visible:outline-none',
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
            aria-label={`Certificate ${progressPercent}% complete${onProgressTap ? " — tap to see what's missing" : ''}`}
            className="relative -m-1 grid h-11 w-11 shrink-0 place-items-center touch-manipulation active:scale-[0.95] transition-transform outline-none focus:outline-none focus-visible:outline-none"
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

        {/* Step tabs across the full width.
            They used to stop at `lg:max-w-[720px]` while the row above spanned
            the whole bar, so on a desktop they huddled in the left third with
            an empty expanse beside them — the tabs read as leftovers rather
            than as the certificate's spine. Equal columns edge to edge now line
            up with the header above them. */}
        <nav aria-label="Certificate steps" className="flex mt-1">
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
                  // No focus ring/outline — the browser's blue ring fought the
                  // volt underline (Andrew). The underline + aria-current carry
                  // the active state; keyboard users still get the underline.
                  'relative flex-1 h-11 text-[13px] lg:text-sm font-semibold touch-manipulation transition-colors outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0',
                  isActive ? 'text-white' : isDone ? 'text-elec-yellow/90' : 'text-white/85'
                )}
              >
                {/* The underline hugs the word, not the column. At 14%–86% of a
                    full-width column it became a rule several times the width of
                    the label it was meant to mark. */}
                <span className="relative inline-block px-1 pb-2.5">
                  {step.label}
                  <span
                    className={cn(
                      'absolute inset-x-0 -bottom-px h-[2px] rounded-full transition-colors',
                      isActive ? 'bg-elec-yellow' : 'bg-transparent'
                    )}
                  />
                </span>
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
