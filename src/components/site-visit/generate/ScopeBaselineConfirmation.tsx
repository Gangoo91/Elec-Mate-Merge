import React from 'react';
import { Lock, Check } from 'lucide-react';
import type { ScopeBaseline } from '@/types/siteVisit';

interface ScopeBaselineConfirmationProps {
  baseline: ScopeBaseline;
}

export const ScopeBaselineConfirmation = ({ baseline }: ScopeBaselineConfirmationProps) => {
  const lockedDate = new Date(baseline.lockedAt);

  return (
    <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
      <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center flex-shrink-0">
        <Lock className="h-5 w-5 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[15px] font-medium text-emerald-400">Scope Baseline Locked</p>
        <p className="text-[13px] text-white">
          {lockedDate.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}{' '}
          at{' '}
          {lockedDate.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
      <Check className="h-5 w-5 text-emerald-400 flex-shrink-0" />
    </div>
  );
};
