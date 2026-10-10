/**
 * AddHoursToPortfolio — turn a logged-hours entry into portfolio evidence.
 *
 * ELE-1916: this used to be two more create paths (a "Quick add" that filed a
 * 'completed' item with guessed skills, and a "Custom" dialog with its own
 * category picker). Both now open the one capture flow, UnifiedCaptureSheet,
 * on its diary-entry preset, pre-filled from the entry, so the evidence gets
 * the same status, criteria format and source as everything else.
 */
import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { TimeEntry } from '@/types/time-tracking';
import {
  UnifiedCaptureSheet,
  type CaptureSeed,
} from '@/components/apprentice-hub/UnifiedCaptureSheet';

interface Props {
  entry: TimeEntry;
  variant?: 'button' | 'icon';
}

export function AddHoursToPortfolio({ entry, variant = 'button' }: Props) {
  const [open, setOpen] = useState(false);
  const seed = useMemo<CaptureSeed>(() => {
    const h = Math.floor(entry.duration / 60);
    const m = entry.duration % 60;
    const length = `${h > 0 ? `${h}h ` : ''}${m}m`;
    return {
      preset: 'diary_entry',
      title: entry.activity,
      description: [entry.notes?.trim(), `Logged ${length} on ${entry.date}.`]
        .filter(Boolean)
        .join('\n\n'),
      workDate: entry.date ? String(entry.date).slice(0, 10) : undefined,
      briefSource: 'from your logged hours',
    };
  }, [entry]);

  return (
    <>
      {variant === 'icon' ? (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setOpen(true)}
          className="h-11 w-11 text-white hover:bg-white/[0.05] hover:text-white touch-manipulation"
          title="Add to portfolio"
          aria-label={`Add ${entry.activity} to your portfolio`}
        >
          <Plus className="h-4 w-4" />
        </Button>
      ) : (
        <Button
          size="sm"
          variant="outline"
          onClick={() => setOpen(true)}
          className="h-11 flex-1 gap-1 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
        >
          <Plus className="h-3.5 w-3.5" />
          Add to portfolio
        </Button>
      )}
      {open && (
        <UnifiedCaptureSheet
          open={open}
          onOpenChange={setOpen}
          seed={seed}
          onComplete={() => setOpen(false)}
        />
      )}
    </>
  );
}

export default AddHoursToPortfolio;
