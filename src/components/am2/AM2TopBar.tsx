/**
 * AM2TopBar — the one back control for every AM2 page.
 *
 * Replaces the hub masthead's small "← Back" plus the per-screen links that
 * had grown on top of it ("← AM2", "← Leave", "Leave"). One bar, same place
 * on every screen: back button hard left, the page name beside it, and an
 * optional slot on the right (the mock day puts its progress there).
 */
import type { ReactNode } from 'react';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AM2TopBarProps {
  /** What Back returns to — "AM2" from a section, "Apprentice hub" from home. */
  backLabel: string;
  onBack: () => void;
  /** The current page, e.g. "Section C · Safe isolation". */
  current?: string;
  /** Right-hand slot. */
  right?: ReactNode;
  className?: string;
}

export function AM2TopBar({ backLabel, onBack, current, right, className }: AM2TopBarProps) {
  return (
    <div
      className={cn(
        'flex h-16 w-full items-center gap-3 border-b border-white/[0.08] bg-[hsl(0_0%_13%)] px-3 sm:px-4 lg:px-5',
        className
      )}
    >
      <button
        type="button"
        onClick={onBack}
        className="inline-flex h-11 shrink-0 items-center gap-1 rounded-xl border border-white/[0.18] bg-gradient-to-br from-white/[0.11] via-white/[0.065] to-white/[0.04] pl-2 pr-4 text-[14px] font-semibold text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.13)] transition-colors hover:border-elec-yellow/60 active:scale-[0.97] touch-manipulation"
      >
        <ChevronLeft className="h-5 w-5" />
        {backLabel}
      </button>
      <span className="h-6 w-px shrink-0 bg-white/[0.14]" aria-hidden />
      <p className="min-w-0 truncate text-[15px] font-semibold text-white">
        {current ?? 'AM2 practice'}
      </p>
      {right && <div className="ml-auto flex shrink-0 items-center">{right}</div>}
    </div>
  );
}

export default AM2TopBar;
