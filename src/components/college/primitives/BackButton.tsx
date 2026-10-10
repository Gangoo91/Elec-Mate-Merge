import { ChevronLeft } from 'lucide-react';
import { useSmartBack } from '@/lib/navHistory';
import { cn } from '@/lib/utils';

/* ==========================================================================
   BackButton — one consistent back affordance for the College Hub.

   Replaces the three competing conventions (text-only "← Back", bespoke
   ArrowLeft chevrons, bare navigate(-1)). Always an h-11 hit area with
   touch-manipulation so it's thumb-hittable, and an explicit label so the
   destination is never a surprise.
   ========================================================================== */

interface BackButtonProps {
  /** Defaults to where the page was opened from. Provide for an explicit destination. */
  onBack?: () => void;
  /** Where Back goes when the page was opened cold (a link or a refresh). */
  fallback?: string;
  /** Visible label — default "Back". Use e.g. "Exit College" for mode-switches. */
  label?: string;
  className?: string;
}

export function BackButton({ onBack, fallback = '/college', label = 'Back', className }: BackButtonProps) {
  const smartBack = useSmartBack();
  return (
    <button
      type="button"
      onClick={() => (onBack ? onBack() : smartBack(fallback))}
      className={cn(
        'inline-flex h-11 items-center gap-1 -ml-1 pr-2 pl-1 rounded-lg',
        'text-[13px] font-medium text-white',
        'transition-colors touch-manipulation',
        className
      )}
    >
      <ChevronLeft className="h-5 w-5 shrink-0" />
      {label}
    </button>
  );
}
