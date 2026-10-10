/**
 * UsesAi — the one small "uses AI" marker (ELE-1929).
 *
 * Features are named by what they do ("Draft my statement", "Recheck risk"),
 * never "AI …". Where a button or result really is written by a model, put
 * this marker beside it so people know a draft needs checking. One component
 * keeps the wording and look the same everywhere.
 *
 *   <button>Draft my statement <UsesAi /></button>
 *   <UsesAi variant="note" />   // a line of text under a drafted result
 */
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UsesAiProps {
  /** pill: a small tag beside a label. note: a full sentence under a result. */
  variant?: 'pill' | 'note';
  className?: string;
}

export function UsesAi({ variant = 'pill', className }: UsesAiProps) {
  if (variant === 'note') {
    return (
      <p className={cn('flex items-center gap-1.5 text-[12px] text-white', className)}>
        <Sparkles className="h-3.5 w-3.5 shrink-0 text-elec-yellow" aria-hidden="true" />
        Drafted with AI. Check it before you use it.
      </p>
    );
  }
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-1 rounded-full border border-white/[0.14] px-2 py-0.5 align-middle text-[12px] font-medium leading-none text-white',
        className
      )}
      title="This uses AI. Check the result before you rely on it."
    >
      <Sparkles className="h-3 w-3 text-elec-yellow" aria-hidden="true" />
      uses AI
    </span>
  );
}

export default UsesAi;
