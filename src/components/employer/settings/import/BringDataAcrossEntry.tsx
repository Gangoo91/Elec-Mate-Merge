/**
 * ELE-2067 — the Overview's way in for a new firm: "Coming from another
 * system? Bring your data across." One row, one action, can be hidden.
 */
import { useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { panelShellClass, rowBtnPrimary } from '@/components/employer/pageParts/PageParts';

const KEY = 'em.employer.bring-data-across.hidden';

const read = () => {
  try {
    return localStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
};

export function BringDataAcrossEntry({ onOpen }: { onOpen: () => void }) {
  const [hidden, setHidden] = useState(read);
  if (hidden) return null;
  const hide = () => {
    try {
      localStorage.setItem(KEY, '1');
    } catch {
      /* private mode: hide for this visit only */
    }
    setHidden(true);
  };
  return (
    <div className={panelShellClass} data-testid="bring-data-across-entry">
      <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:gap-4 sm:px-5">
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-semibold leading-snug text-white">
            Moving from Tradify, Fergus or another system?
          </p>
          <p className="mt-0.5 text-[13px] leading-snug text-white">
            Bring your customers, jobs, quotes and invoices across from their export files, or we
            will move you for free.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            className={cn(rowBtnPrimary, 'flex-1 sm:flex-none')}
            onClick={onOpen}
          >
            Bring it across
          </button>
          <button
            type="button"
            aria-label="Hide this"
            onClick={hide}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white hover:bg-white/[0.06] touch-manipulation"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
