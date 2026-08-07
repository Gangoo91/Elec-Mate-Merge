/**
 * The flag on a cell that a BS 7671 finding names.
 *
 * The schedule's cells are built on three different controls — a text input, a
 * combobox and a raw Radix Select — and threading the same two props through
 * each one produced three slightly different implementations of the same idea.
 * This is the one implementation: it positions itself inside whichever cell
 * renders it and knows nothing about the control underneath.
 *
 * ## Why it renders nothing without a handler
 *
 * A flag the electrician can tap is an accelerator into the finding. A flag
 * they cannot tap is a claim that something is wrong with no way to find out
 * what — worse than staying quiet. The EIC schedule shares this grid but has no
 * Validate surface yet, so it passes no handler and shows no flags, rather than
 * advertising problems it cannot explain.
 */
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CellWarning } from '@/utils/cellWarnings';
import { describeCellWarning } from '@/utils/cellWarnings';

interface CellWarningMarkerProps {
  warning?: CellWarning;
  /** Opens the finding. Without it nothing renders — see the note above. */
  onOpen?: () => void;
  className?: string;
}

export const CellWarningMarker: React.FC<CellWarningMarkerProps> = ({
  warning,
  onOpen,
  className,
}) => {
  if (!warning || !onOpen) return null;

  const label = describeCellWarning(warning);
  const critical = warning.severity === 'critical';

  return (
    <button
      type="button"
      onClick={(e) => {
        // The cell underneath opens a dropdown or focuses an input. Tapping the
        // flag must do neither.
        e.stopPropagation();
        e.preventDefault();
        onOpen();
      }}
      onPointerDown={(e) => e.stopPropagation()}
      title={label}
      aria-label={label}
      className={cn(
        'absolute right-0.5 top-1/2 z-10 -translate-y-1/2 inline-flex h-5 w-5 items-center justify-center rounded',
        'transition-colors touch-manipulation',
        critical ? 'text-red-300 hover:bg-red-500/20' : 'text-amber-300 hover:bg-amber-400/20',
        className
      )}
    >
      <AlertTriangle className="h-3.5 w-3.5" />
    </button>
  );
};

export default CellWarningMarker;
