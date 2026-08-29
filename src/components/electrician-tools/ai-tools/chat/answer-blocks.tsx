import React, { useState } from 'react';

/**
 * Answer-structure blocks — verdict callout and procedure step row.
 *
 * Used by InspectorMessage to give AI answers a compliance-tool feel:
 * a one-line verdict at the top, and numbered procedure steps that the
 * electrician can tap-complete as they work.
 */

// ─── Verdict callout ─────────────────────────────────────────────────────

export function VerdictCallout({ children }: { children: React.ReactNode }) {
  // The verdict is the answer — the single most valuable line on the screen.
  // A solid volt rule (fills stay solid; only washes go muddy on this ground),
  // a volt eyebrow, then the line itself in display weight. Still no card —
  // the answer document it sits in carries the surface.
  return (
    <div
      className="relative mb-6 pl-4 min-w-0"
      style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}
    >
      <span className="absolute left-0 top-0.5 bottom-0.5 w-[3px] rounded-full bg-elec-yellow" />
      <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-elec-yellow mb-1.5">
        Verdict
      </div>
      <div className="text-[16.5px] sm:text-[19px] leading-snug text-white font-semibold tracking-tight">
        {children}
      </div>
    </div>
  );
}

// ─── Procedure step row ──────────────────────────────────────────────────

export function ProcedureStep({
  number,
  children,
}: {
  number: number;
  children: React.ReactNode;
}) {
  const [checked, setChecked] = useState(false);
  return (
    <li
      className={
        'flex gap-3 items-start py-1.5 min-w-0 transition-opacity duration-150 ' +
        (checked ? 'opacity-55' : '')
      }
    >
      <button
        type="button"
        onClick={() => setChecked((v) => !v)}
        aria-pressed={checked}
        className={
          'mt-[2px] shrink-0 w-6 h-6 rounded-full ' +
          'flex items-center justify-center font-mono text-[11px] font-semibold ' +
          'transition-colors touch-manipulation cursor-pointer active:scale-95 ' +
          '[-webkit-tap-highlight-color:transparent] ' +
          (checked
            ? 'bg-elec-yellow text-black'
            : 'bg-transparent text-white border border-elec-yellow/40 hover:border-elec-yellow/70')
        }
      >
        {checked ? (
          <svg viewBox="0 0 16 16" className="w-3 h-3 fill-none stroke-current">
            <path d="M3.5 8.5l3 3 6-7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          number
        )}
      </button>
      <div
        className={
          'flex-1 min-w-0 text-[14.5px] leading-relaxed text-white ' +
          (checked ? 'line-through decoration-white/30' : '')
        }
        style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}
      >
        {children}
      </div>
    </li>
  );
}

export function ProcedureList({ children }: { children: React.ReactNode }) {
  // Minimal: just a plain ordered list with custom numeric markers —
  // no card, no dividers, no borders. Lets the prose breathe.
  return <ol className="my-3 space-y-1 min-w-0">{children}</ol>;
}
