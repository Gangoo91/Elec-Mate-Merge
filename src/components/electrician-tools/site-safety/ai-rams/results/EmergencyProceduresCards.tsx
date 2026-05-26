import React from 'react';

interface EmergencyProceduresCardsProps {
  procedures?: string[];
}

/**
 * Emergency procedures — editorial list. No icon, no red-bubble numbers,
 * no card chrome. Numbered editorial rows with monospace ordinal.
 */
export const EmergencyProceduresCards: React.FC<EmergencyProceduresCardsProps> = ({
  procedures,
}) => {
  return (
    <section className="space-y-5">
      <div className="space-y-1">
        <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-red-400">
          Emergency procedures
        </div>
        <h3 className="text-[20px] sm:text-[24px] font-semibold tracking-tight leading-tight text-white">
          If something goes wrong.
        </h3>
      </div>

      {!procedures || procedures.length === 0 ? (
        <p className="text-[13px] text-white/55 leading-relaxed">
          No emergency procedures specified.
        </p>
      ) : (
        <ol className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {procedures.map((procedure, idx) => (
            <li key={idx} className="py-3 flex items-baseline gap-3">
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] tabular-nums text-red-400 w-8 shrink-0">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span className="text-[13.5px] text-white/85 leading-relaxed flex-1">
                {procedure}
              </span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
};
