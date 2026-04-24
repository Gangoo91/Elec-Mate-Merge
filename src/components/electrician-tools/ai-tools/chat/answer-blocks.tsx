import React, { useState } from 'react';

/**
 * Answer-structure blocks — verdict callout and procedure step row.
 *
 * Used by InspectorMessage to give AI answers a compliance-tool feel:
 * a one-line verdict at the top, and numbered procedure steps that the
 * sparky can tap-complete as they work.
 */

// ─── Verdict callout ─────────────────────────────────────────────────────

export function VerdictCallout({ children }: { children: React.ReactNode }) {
  // Minimal editorial treatment: a thin yellow left-rule, small eyebrow,
  // then the one-line answer in slightly heavier type. No card, no glow,
  // no border — the prose itself is the object.
  return (
    <div
      className="relative mb-5 pl-4 min-w-0"
      style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}
    >
      <span className="absolute left-0 top-1 bottom-1 w-[2px] rounded-full bg-elec-yellow" />
      <div className="text-[9.5px] uppercase tracking-[0.22em] font-semibold text-elec-yellow mb-1">
        Verdict
      </div>
      <div className="text-[15.5px] sm:text-[17px] leading-relaxed text-white font-medium">
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
        'flex gap-3 items-start py-1.5 min-w-0 ' +
        (checked ? 'opacity-55' : '')
      }
    >
      <button
        type="button"
        onClick={() => setChecked((v) => !v)}
        aria-pressed={checked}
        className={
          'mt-[3px] shrink-0 w-5 h-5 rounded-full ' +
          'flex items-center justify-center font-mono text-[11px] font-semibold ' +
          'transition-colors touch-manipulation cursor-pointer ' +
          (checked
            ? 'bg-elec-yellow text-black'
            : 'bg-transparent text-elec-yellow/90 border border-elec-yellow/50 hover:border-elec-yellow')
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
