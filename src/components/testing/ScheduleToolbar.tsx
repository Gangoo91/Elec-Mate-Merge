/**
 * The desktop schedule toolbar.
 *
 * Every tool this board can do, on one full-width row above the table.
 *
 * ## Why full width
 *
 * It used to be `ml-auto` — six buttons huddled against the right edge with the
 * rest of the row empty. That reads as an overflow area, somewhere the leftovers
 * were pushed, and it gave the eye no way to tell a capture tool from an edit
 * tool from a check. Spread across the full width and grouped, the bar becomes a
 * statement of what the board can do, and the groups do the sorting.
 *
 * ## Grouping, and why the buttons are all the same colour
 *
 * Order follows the job: capture the board, correct it, check it, add to it.
 * Groups are separated by a hairline and nothing else. An earlier pass tinted
 * each group's border — sky for capture, violet for edit — and the toolbar
 * became a rainbow that drew attention to the categories rather than the work.
 * Colour is spent only where it means something: the primary action, an active
 * mode, an outstanding count, a selected setting.
 *
 * ## Actions and settings are different things
 *
 * Validate, Find & replace and Reverse *do* something. Zs basis and Checks
 * *are* something. Rendering them as identical buttons would invite an
 * electrician to tap a setting expecting an action, so settings are visually
 * distinct: a segmented control and a state chip, both quieter than the buttons.
 */
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ZsBasis } from '@/utils/regulationChecker/zsValidator';

export interface ScheduleToolbarProps {
  circuitCount: number;
  onAddCircuit: () => void;

  /* Capture */
  onScanBoard?: () => void;
  /** ELE-1607 — read handwritten readings into the measured columns. */
  onScanResults?: () => void;
  onVoiceToggle?: () => void;
  voiceActive?: boolean;
  voiceConnecting?: boolean;

  /* Edit */
  onQuickRcdPresets?: () => void;
  onFindReplace?: () => void;
  /** Flip the circuit order — see the note on the button below. */
  onReverseOrder?: () => void;

  /* Check */
  onValidate?: () => void;
  validateIssueCount?: number;
  /**
   * Which maximum the measured Zs is judged against.
   *
   * Not a display preference — it changes the verdict. See `ZsBasis`.
   */
  zsBasis?: ZsBasis;
  onZsBasisChange?: (basis: ZsBasis) => void;
  /**
   * Whether the grid marks non-compliant cells and rows at all.
   *
   * Turning the checks off is a legitimate thing to want: on a board with a
   * known, already-recorded defect, every row is tinted and the tinting stops
   * carrying information. It hides the marking, never the finding — Validate
   * still reports everything.
   */
  showChecks?: boolean;
  onShowChecksChange?: (show: boolean) => void;
}

/** Neutral button. Colour is reserved — see the note at the top of the file. */
const toolBtn =
  'h-11 px-3 rounded-xl border border-white/[0.12] bg-white/[0.06] text-white ' +
  'text-[13px] font-semibold hover:bg-white/[0.1] transition-colors touch-manipulation';

const Divider = () => (
  <span aria-hidden className="mx-1 h-6 w-px shrink-0 bg-white/[0.22]" />
);

export const ScheduleToolbar: React.FC<ScheduleToolbarProps> = ({
  circuitCount,
  onAddCircuit,
  onScanBoard,
  onScanResults,
  onVoiceToggle,
  voiceActive,
  voiceConnecting,
  onQuickRcdPresets,
  onFindReplace,
  onReverseOrder,
  onValidate,
  validateIssueCount,
  zsBasis = 100,
  onZsBasisChange,
  showChecks = true,
  onShowChecksChange,
}) => {
  return (
    <div className="w-full border-t border-white/[0.1] pt-4">
      <div className="flex w-full flex-wrap items-center gap-2">
        {/* Identity — what this bar acts on, so the tools have a subject. */}
        <div className="flex items-center gap-2 pr-1">
          <h3 className="text-sm font-semibold text-white">Circuits</h3>
          <span className="text-[12px] font-semibold tabular-nums text-white">
            {circuitCount}
          </span>
        </div>

        <Divider />

        {/* Capture — getting a board into the table */}
        {onScanBoard && (
          <Button onClick={onScanBoard} className={toolBtn}>
            AI scan
          </Button>
        )}
        {/*
          ELE-1607 — beside AI scan because they are two halves of one job:
          that one reads the board, this one reads the readings.
        */}
        {onScanResults && (
          <Button onClick={onScanResults} className={toolBtn}>
            Scan results
          </Button>
        )}
        {onVoiceToggle && (
          <Button
            onClick={onVoiceToggle}
            disabled={voiceConnecting}
            className={cn(
              'h-11 px-3 rounded-xl text-[13px] font-semibold transition-colors touch-manipulation',
              // Voice is a mode, not an action: while it is listening the button
              // has to look unmistakably different from every other control.
              voiceActive
                ? 'bg-green-500 text-black hover:bg-green-500/90'
                : 'border border-white/[0.12] bg-white/[0.06] text-white hover:bg-white/[0.1]'
            )}
          >
            {voiceActive ? 'Stop' : voiceConnecting ? 'Connecting' : 'Voice'}
          </Button>
        )}

        {(onQuickRcdPresets || onFindReplace || onReverseOrder) && <Divider />}

        {/* Edit — changing what is already there */}
        {onQuickRcdPresets && (
          <Button onClick={onQuickRcdPresets} className={toolBtn}>
            RCD presets
          </Button>
        )}
        {onFindReplace && (
          <Button onClick={onFindReplace} className={toolBtn}>
            Find &amp; replace
          </Button>
        )}
        {onReverseOrder && (
          <Button
            onClick={onReverseOrder}
            /* Boards get written down in whichever direction the electrician
               read them. Renumbering 23 ways by hand to match the physical
               board is half an hour; this is one tap and it is reversible by
               tapping again. */
            title="Reverse the order of every circuit on this board"
            className={toolBtn}
          >
            Reverse order
          </Button>
        )}

        <Divider />

        {/* Check */}
        {onValidate && (
          <Button onClick={onValidate} className={toolBtn}>
            Validate
            {/* Solid pill rather than a wash over the whole button — amber at
                low opacity over near-black turns olive-brown. */}
            {validateIssueCount ? (
              <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-400 px-1.5 text-[11px] font-bold tabular-nums text-black">
                {validateIssueCount}
              </span>
            ) : null}
          </Button>
        )}

        {onZsBasisChange && (
          <div
            className="flex h-11 items-center gap-1 rounded-xl border border-white/[0.12] bg-white/[0.04] px-1"
            /* Two limits, both correct, for different questions — the label
               says which one is in force rather than making it a guess. */
            title="Which maximum the measured Zs is judged against"
          >
            <span className="px-1.5 text-[12px] font-medium text-white">Zs</span>
            {([100, 80] as const).map((basis) => (
              <button
                key={basis}
                type="button"
                onClick={() => onZsBasisChange(basis)}
                aria-pressed={zsBasis === basis}
                className={cn(
                  'h-8 rounded-lg px-2.5 text-[12px] font-semibold tabular-nums transition-colors touch-manipulation',
                  zsBasis === basis
                    ? 'bg-elec-yellow text-black'
                    : 'text-white hover:bg-white/[0.08]'
                )}
              >
                {basis}%
              </button>
            ))}
          </div>
        )}

        {onShowChecksChange && (
          <button
            type="button"
            onClick={() => onShowChecksChange(!showChecks)}
            aria-pressed={showChecks}
            title={
              showChecks
                ? 'Hide the compliance marking on the grid — Validate still reports everything'
                : 'Mark non-compliant cells and rows on the grid'
            }
            className={cn(
              'h-11 rounded-xl border px-3 text-[13px] font-semibold transition-colors touch-manipulation',
              showChecks
                ? 'border-white/[0.12] bg-white/[0.06] text-white hover:bg-white/[0.1]'
                : 'border-white/[0.12] bg-transparent text-white hover:bg-white/[0.06]'
            )}
          >
            <span className="inline-flex items-center gap-2">
              {/* A dot, not a tick — the state is on/off, and a tick reads as
                  "done" on a bar where everything else is an action. */}
              <span
                aria-hidden
                className={cn(
                  'h-2 w-2 rounded-full',
                  showChecks ? 'bg-elec-yellow' : 'bg-white/25'
                )}
              />
              {showChecks ? 'Checks' : 'Checks off'}
            </span>
          </button>
        )}

        {/* The one thing you do most, held apart from the tools and the only
            filled control on the bar. */}
        <Button
          onClick={onAddCircuit}
          className="ml-auto h-11 rounded-xl bg-elec-yellow px-3 text-[13px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 touch-manipulation"
        >
          Add circuit
        </Button>
      </div>
    </div>
  );
};

export default ScheduleToolbar;
