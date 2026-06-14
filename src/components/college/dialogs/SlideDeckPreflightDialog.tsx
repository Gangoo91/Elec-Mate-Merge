import { useState } from 'react';
import { ResponsiveDialog, ResponsiveDialogContent, ResponsiveDialogTitle, ResponsiveDialogDescription } from '@/components/ui/responsive-dialog';
import { cn } from '@/lib/utils';
import type { DeckPreflight, DeckTone, DeckDepth } from '@/hooks/useSlideDeck';

/* ==========================================================================
   SlideDeckPreflightDialog — pre-generation controls for the slide deck.
   Tutor picks slide count, tone (academic/practical/gen-z) and depth
   (overview/standard/deep dive) before the AI fires. Defaults are sensible
   (14 slides, practical, standard) so a tutor in a hurry just clicks Go.

   ELE-942 / [F1.3].
   ========================================================================== */

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (preflight: DeckPreflight) => void;
  defaults?: DeckPreflight;
}

const COUNT_OPTIONS = [8, 12, 14, 18, 24];
const TONES: Array<{ value: DeckTone; label: string; help: string }> = [
  { value: 'practical', label: 'Practical', help: 'Sarah-on-site voice, concrete examples' },
  { value: 'academic', label: 'Academic', help: 'IET-paper register, formal' },
  { value: 'gen_z', label: 'Gen-Z', help: 'Punchy, contemporary, still rigorous' },
];
const DEPTHS: Array<{ value: DeckDepth; label: string; help: string }> = [
  { value: 'overview', label: 'Overview', help: 'Lighter — intro or revision lesson' },
  { value: 'standard', label: 'Standard', help: 'Default depth' },
  { value: 'deep_dive', label: 'Deep dive', help: 'Rich content, stretch tasks' },
];

export function SlideDeckPreflightDialog({ open, onOpenChange, onConfirm, defaults }: Props) {
  const [slideCount, setSlideCount] = useState<number>(defaults?.slide_count ?? 14);
  const [tone, setTone] = useState<DeckTone>(defaults?.tone ?? 'practical');
  const [depth, setDepth] = useState<DeckDepth>(defaults?.depth ?? 'standard');

  return (
    <ResponsiveDialog open={open} onOpenChange={onOpenChange}>
      <ResponsiveDialogContent hideCloseButton className="sm:max-w-[520px] bg-[hsl(0_0%_10%)] border-white/[0.08] text-white p-0 overflow-hidden">
        <div className="px-5 pt-5 pb-4 border-b border-white/[0.06]">
          <ResponsiveDialogTitle className="text-[15px] font-semibold tracking-tight text-white">
            Generate slide deck
          </ResponsiveDialogTitle>
          <ResponsiveDialogDescription className="mt-1 text-[12px] text-white">
            Pick the shape of the deck before the AI runs. Defaults work for most lessons.
          </ResponsiveDialogDescription>
        </div>

        <div className="px-5 py-5 space-y-5">
          {/* Slide count */}
          <div>
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white">
              Slide count
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {COUNT_OPTIONS.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setSlideCount(n)}
                  className={cn(
                    'h-10 min-w-[64px] px-3 rounded-lg text-[13px] font-semibold border transition-colors touch-manipulation tabular-nums',
                    slideCount === n
                      ? 'bg-elec-yellow text-black border-elec-yellow'
                      : 'bg-transparent text-white border-white/[0.10] hover:border-white/25'
                  )}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Tone */}
          <div>
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white">
              Tone
            </div>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
              {TONES.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setTone(t.value)}
                  className={cn(
                    'text-left p-3 rounded-lg border transition-colors touch-manipulation',
                    tone === t.value
                      ? 'bg-elec-yellow/[0.08] border-elec-yellow text-white'
                      : 'bg-transparent border-white/[0.10] hover:border-white/25 text-white'
                  )}
                >
                  <div className="text-[13px] font-semibold">{t.label}</div>
                  <div className="mt-0.5 text-[11.5px] text-white">{t.help}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Depth */}
          <div>
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white">
              Depth
            </div>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
              {DEPTHS.map((d) => (
                <button
                  key={d.value}
                  type="button"
                  onClick={() => setDepth(d.value)}
                  className={cn(
                    'text-left p-3 rounded-lg border transition-colors touch-manipulation',
                    depth === d.value
                      ? 'bg-elec-yellow/[0.08] border-elec-yellow text-white'
                      : 'bg-transparent border-white/[0.10] hover:border-white/25 text-white'
                  )}
                >
                  <div className="text-[13px] font-semibold">{d.label}</div>
                  <div className="mt-0.5 text-[11.5px] text-white">{d.help}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-white/[0.06] bg-[hsl(0_0%_8%)] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="h-10 px-4 rounded-lg bg-transparent border border-white/[0.10] hover:border-white/25 text-white text-[12px] font-medium touch-manipulation"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm({ slide_count: slideCount, tone, depth });
              onOpenChange(false);
            }}
            className="h-10 px-5 rounded-lg bg-elec-yellow text-black text-[12.5px] font-semibold hover:bg-elec-yellow/90 touch-manipulation"
          >
            Generate {slideCount} slides →
          </button>
        </div>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}
