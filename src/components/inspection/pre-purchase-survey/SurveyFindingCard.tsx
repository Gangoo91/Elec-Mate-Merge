import { useState } from 'react';
import { Check, Loader2, RotateCw, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  SEVERITY_LABEL,
  SEVERITY_SHORT,
  SEVERITY_ORDER,
  type SurveyFinding,
  type SurveySeverity,
} from '@/types/pre-purchase-survey';

/**
 * One photograph and what the electrician says about it (ELE-1634).
 *
 * ── 🔴 THE ACCEPT BUTTON IS THE WHOLE DESIGN ──────────────────────────────
 * The AI writes a draft. Nothing reaches the PDF until someone taps Accept.
 * That is why the draft is shown as an editable field rather than as finished
 * text with a tick beside it: the shape of the card should make it obvious
 * that this is yours to change, not a verdict handed down to be approved.
 *
 * An unaccepted card carries a standing amber rule down its left edge, because
 * the failure worth designing against is a busy electrician generating the PDF
 * without noticing that eight of their twenty photographs still hold a
 * machine's guess. The state is legible at a glance while scrolling.
 */

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] ' +
  'bg-transparent px-1 text-base font-medium text-white placeholder:text-white/25 ' +
  'caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow ' +
  'focus-visible:ring-0 focus:ring-0 focus:outline-none [color-scheme:dark] touch-manipulation';

const textareaCn =
  'input-underline w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent ' +
  'px-1 py-2 text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow ' +
  'transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 ' +
  'focus:ring-0 focus:outline-none resize-none touch-manipulation';

/* Severity is the one place colour carries meaning rather than decoration. */
const SEVERITY_ON: Record<SurveySeverity, string> = {
  urgent: 'bg-red-500 border-red-500 text-white',
  attention: 'bg-orange-500 border-orange-500 text-black',
  ageing: 'bg-elec-yellow border-elec-yellow text-black',
  acceptable: 'bg-emerald-500 border-emerald-500 text-black',
  unclear: 'bg-white/[0.28] border-white/[0.34] text-white',
};

interface Props {
  finding: SurveyFinding;
  index: number;
  onChange: (patch: Partial<SurveyFinding>) => void;
  onRemove: () => void;
  /** Ask the model again — the photo is already stored, so this is cheap. */
  onRetry: () => void;
}

export default function SurveyFindingCard({
  finding,
  index,
  onChange,
  onRemove,
  onRetry,
}: Props) {
  const [confirmRemove, setConfirmRemove] = useState(false);
  const ai = finding.aiAnalysis;
  const analysing = finding.status === 'analysing';
  const written = !!finding.identifiedAs.trim() || !!finding.note.trim();

  /*
   * `edited` is provenance, and it is derived rather than trusted: comparing to
   * the draft on every keystroke is cheaper than keeping a flag in sync, and a
   * flag that drifted would print a claim about the surveyor's own work.
   */
  const setField = (patch: Partial<SurveyFinding>) => {
    const next = { ...finding, ...patch };
    const edited = !!ai && (next.identifiedAs !== ai.identifiedAs || next.note !== ai.advice);
    onChange({ ...patch, edited });
  };

  return (
    <article
      className={cn(
        'relative overflow-hidden -mx-4 border-y bg-gradient-to-b from-white/[0.08] to-white/[0.04]',
        'sm:mx-0 sm:rounded-2xl sm:border-x',
        finding.accepted ? 'border-white/[0.14]' : 'border-elec-yellow/25'
      )}
    >
      {/* Standing state rule — readable while scrolling a long survey. */}
      <span
        aria-hidden="true"
        className={cn(
          'absolute inset-y-0 left-0 w-[3px]',
          finding.accepted ? 'bg-emerald-400/70' : 'bg-elec-yellow'
        )}
      />

      <div className="p-4 pl-5 sm:p-5 sm:pl-6">
        {/*
         * ⚠️ The delete button is NOT in this row — it lives beside Confirm at
         * the foot of the card.
         *
         * A photograph, a 44px hit area and a label left roughly 60px for the
         * location on a narrow viewport, which clipped it to "Hallwa". Moving
         * the one control that does not belong at the top both frees the width
         * and puts the destructive action with the other actions.
         */}
        <div className="flex items-start gap-3 sm:gap-4">
          <img
            src={finding.photoUrl}
            alt={`Survey photograph ${index + 1}`}
            className="h-16 w-16 shrink-0 rounded-xl border border-white/[0.14] object-cover sm:h-28 sm:w-28"
          />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-white">
                Photograph {index + 1}
              </p>
              <span
                className={cn(
                  'shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold',
                  finding.accepted
                    ? 'bg-emerald-500/15 text-emerald-300'
                    : 'bg-elec-yellow/15 text-elec-yellow'
                )}
              >
                {finding.accepted ? 'Confirmed' : 'To review'}
              </span>
            </div>
            <input
              value={finding.location}
              onChange={(e) => setField({ location: e.target.value })}
              placeholder="Where in the property"
              aria-label={`Location of photograph ${index + 1}`}
              className={cn(inputCn, 'mt-1')}
            />
          </div>
        </div>

        {analysing && (
          <p className="mt-4 flex items-center gap-2 text-[13px] font-medium text-white">
            <Loader2 className="h-4 w-4 animate-spin text-elec-yellow" />
            Reading the photograph
          </p>
        )}

        {/*
         * 🔴 Keyed on "there is no draft", not on `status === 'failed'`.
         *
         * A finding can reach here with nothing against it by more than one
         * route — the request failed, or it was interrupted by a reload while
         * still analysing. Checking the status alone left the second case
         * showing a completely blank card with no explanation and no way to ask
         * again, which is how it was found.
         */}
        {!analysing && !ai && (
          <div className="mt-4 flex flex-wrap items-center gap-3 border-l border-white/[0.16] pl-3">
            <p className="text-[13px] leading-snug text-white">
              This photograph has not been read.
            </p>
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/[0.16] bg-white/[0.06] px-3 text-[13px] font-semibold text-white transition-colors hover:bg-white/[0.1] touch-manipulation active:scale-[0.97]"
            >
              <RotateCw className="h-3.5 w-3.5" />
              Try again
            </button>
          </div>
        )}

        {/* ── The draft, presented as somebody else's words ──────────────── */}
        {ai && (
          <div className="mt-4 border-l border-white/[0.18] pl-3 sm:pl-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white">
              Suggested — check before you confirm
            </p>
            {!ai.isElectrical && (
              <p className="mt-2 text-[13px] leading-snug text-orange-300">
                This does not look like electrical work.
              </p>
            )}
            {ai.condition && (
              <p className="mt-2 text-[13px] leading-relaxed text-white">{ai.condition}</p>
            )}
            {ai.era && (
              <p className="mt-1.5 text-[13px] leading-relaxed text-white">Age: {ai.era}</p>
            )}
            {/*
             * Surfaced prominently and never folded into the note. It is the
             * model saying what a photograph cannot settle — the most useful
             * thing it produces on site, and useless if it is only read back
             * at the office.
             */}
            {ai.needsCloserLook && (
              <p className="mt-2.5 rounded-lg bg-orange-500/10 px-3 py-2 text-[13px] leading-snug text-orange-300">
                Check on site: {ai.needsCloserLook}
              </p>
            )}
            {/*
             * A weak identification is stated plainly rather than hidden.
             * "Probably a rewireable board" and "a rewireable board" are
             * different claims, and only one is safe to hand a buyer.
             */}
            {ai.confidence < 0.6 && (
              <p className="mt-2 text-[13px] leading-snug text-white">
                Not confident about this one — worth a closer look.
              </p>
            )}
          </div>
        )}

        {/* ── What actually gets printed ─────────────────────────────────── */}
        <div className="mt-5 space-y-4">
          <div>
            <label
              htmlFor={`identified-${finding.id}`}
              className="mb-1 block text-[12px] font-medium text-white"
            >
              What it is
            </label>
            <input
              id={`identified-${finding.id}`}
              value={finding.identifiedAs}
              onChange={(e) => setField({ identifiedAs: e.target.value })}
              placeholder="e.g. Rewireable fuse board"
              className={inputCn}
            />
          </div>

          <div>
            <label
              htmlFor={`note-${finding.id}`}
              className="mb-1 block text-[12px] font-medium text-white"
            >
              What it means for the buyer
            </label>
            <textarea
              id={`note-${finding.id}`}
              value={finding.note}
              onChange={(e) => setField({ note: e.target.value })}
              rows={4}
              placeholder="Written for someone who is not an electrician"
              className={textareaCn}
            />
          </div>

          {/*
           * A segmented control, not five wrapping chips. Three columns on a
           * phone and five from `sm:` keeps every target on one line and above
           * 44px; the sentence beneath carries the meaning the short word drops.
           */}
          <div>
            <p className="mb-2 text-[12px] font-medium text-white">How serious</p>
            <div
              role="radiogroup"
              aria-label="How serious"
              className="grid grid-cols-3 gap-1.5 sm:grid-cols-5"
            >
              {SEVERITY_ORDER.map((s) => (
                <button
                  key={s}
                  type="button"
                  role="radio"
                  aria-checked={finding.severity === s}
                  onClick={() => onChange({ severity: s })}
                  className={cn(
                    'h-11 rounded-xl border text-[13px] font-semibold transition-colors touch-manipulation active:scale-[0.97]',
                    finding.severity === s
                      ? SEVERITY_ON[s]
                      : 'border-white/[0.12] bg-white/[0.06] text-white hover:bg-white/[0.1]'
                  )}
                >
                  {SEVERITY_SHORT[s]}
                </button>
              ))}
            </div>
            <p className="mt-2 text-[12px] leading-snug text-white">
              {SEVERITY_LABEL[finding.severity]}
            </p>
          </div>
        </div>

        {/* ── The gate ───────────────────────────────────────────────────── */}
        <div className="mt-5 flex items-center gap-2">
          <button
            type="button"
            onClick={() => onChange({ accepted: !finding.accepted })}
            disabled={analysing || !written}
            className={cn(
              'flex h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-xl text-[14px] font-semibold transition-colors touch-manipulation active:scale-[0.98] disabled:opacity-40',
              finding.accepted
                ? 'border border-white/[0.16] bg-white/[0.06] text-white hover:bg-white/[0.1]'
                : 'bg-elec-yellow text-black hover:bg-elec-yellow/90'
            )}
          >
            {finding.accepted ? (
              'Reopen for review'
            ) : (
              <>
                <Check className="h-4 w-4" />
                Confirm and include
              </>
            )}
          </button>

          {/* Two taps to destroy a photograph and the evidence with it. */}
          <button
            type="button"
            onClick={() => (confirmRemove ? onRemove() : setConfirmRemove(true))}
            onBlur={() => setConfirmRemove(false)}
            aria-label={confirmRemove ? 'Confirm remove photograph' : 'Remove photograph'}
            className={cn(
              'flex h-11 shrink-0 items-center justify-center rounded-xl border transition-colors touch-manipulation active:scale-[0.97]',
              confirmRemove
                ? 'w-auto border-red-500/40 bg-red-500/15 px-3 text-[13px] font-bold text-red-300'
                : 'w-11 border-white/[0.16] bg-white/[0.06] text-white hover:bg-white/[0.1]'
            )}
          >
            {confirmRemove ? 'Delete?' : <Trash2 className="h-4 w-4" />}
          </button>
        </div>
        {finding.accepted && finding.edited && (
          <p className="mt-2 text-[12px] text-white">You edited this before confirming it.</p>
        )}
        {!finding.accepted && !written && !analysing && (
          <p className="mt-2 text-[12px] text-white">
            Add what it is, or a note, before you can confirm it.
          </p>
        )}
      </div>
    </article>
  );
}
