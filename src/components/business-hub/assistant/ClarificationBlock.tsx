import { cn } from '@/lib/utils';
import { HelpCircle } from 'lucide-react';
import type { Clarification } from './types';

interface ClarificationBlockProps {
  clarification: Clarification;
  onAnswer: (value: string, label: string) => void;
}

export function ClarificationBlock({ clarification, onAnswer }: ClarificationBlockProps) {
  const answered = clarification.answeredWith != null;
  return (
    <div
      className={cn(
        'rounded-2xl border px-3.5 py-3',
        answered
          ? 'border-white/10 bg-white/[0.03]'
          : 'border-amber-400/30 bg-amber-500/[0.06]'
      )}
    >
      <div className="flex items-start gap-2 mb-2.5">
        <HelpCircle
          className={cn(
            'h-4 w-4 shrink-0 mt-0.5',
            answered ? 'text-white/40' : 'text-amber-300'
          )}
        />
        <div className="flex-1 min-w-0">
          <p
            className={cn(
              'text-[10px] font-bold uppercase tracking-[0.16em] mb-0.5',
              answered ? 'text-white/40' : 'text-amber-300'
            )}
          >
            {answered ? 'Answered' : 'Quick check'}
          </p>
          <p className="text-[14px] font-semibold text-white leading-snug">
            {clarification.question}
          </p>
          {clarification.context && (
            <p className="text-[12px] text-white/55 mt-0.5 leading-snug">
              {clarification.context}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {clarification.options.map((opt) => {
          const isPicked = clarification.answeredWith === opt.label;
          return (
            <button
              key={opt.label}
              type="button"
              disabled={answered}
              onClick={() => onAnswer(opt.value, opt.label)}
              className={cn(
                'text-[12px] font-medium px-3 py-1.5 rounded-full transition-colors touch-manipulation active:scale-[0.97]',
                answered
                  ? isPicked
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                    : 'bg-white/[0.02] text-white/30 border border-white/[0.05] cursor-not-allowed'
                  : 'bg-white/[0.06] text-white border border-white/[0.1] hover:bg-white/[0.1] hover:border-white/[0.2]'
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
