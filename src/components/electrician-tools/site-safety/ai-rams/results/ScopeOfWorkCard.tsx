import React from 'react';
import { MethodStatementData } from '@/types/method-statement';

interface ScopeOfWorkCardProps {
  methodData: MethodStatementData;
}

/**
 * Scope of work — editorial. No icons, no purple chrome. Description,
 * deliverables list, exclusions all in flat editorial rhythm.
 */
export function ScopeOfWorkCard({ methodData }: ScopeOfWorkCardProps) {
  const scopeOfWork = methodData.scopeOfWork;
  const hasDescription =
    scopeOfWork?.description && scopeOfWork.description !== 'Work scope to be defined';
  const hasDeliverables = scopeOfWork?.keyDeliverables && scopeOfWork.keyDeliverables.length > 0;
  const hasExclusions = scopeOfWork?.exclusions;

  if (!hasDescription && !hasDeliverables && !hasExclusions) return null;

  return (
    <section className="space-y-5">
      <div className="space-y-1">
        <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
          Scope of work
        </div>
        <h3 className="text-[20px] sm:text-[24px] font-semibold tracking-tight leading-tight text-white">
          What's in scope.
        </h3>
      </div>

      <p className="text-[13.5px] text-white/85 leading-relaxed max-w-3xl">
        {scopeOfWork?.description || methodData.description || 'Work scope to be defined'}
      </p>

      {scopeOfWork?.keyDeliverables && scopeOfWork.keyDeliverables.length > 0 && (
        <div className="space-y-3">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
            Key deliverables
          </div>
          <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
            {scopeOfWork.keyDeliverables.map((deliverable, idx) => (
              <li key={idx} className="py-3 flex items-baseline gap-3">
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] tabular-nums text-emerald-400 w-8 shrink-0">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="text-[13.5px] text-white/85 leading-relaxed flex-1">
                  {deliverable}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {scopeOfWork?.exclusions && (
        <div className="space-y-2">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-red-400">
            Out of scope
          </div>
          <p className="text-[13.5px] text-white/85 leading-relaxed max-w-3xl">
            {scopeOfWork.exclusions}
          </p>
        </div>
      )}
    </section>
  );
}
