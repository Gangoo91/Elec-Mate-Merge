import { useState } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet';
import { buttonPrimaryCn, chipBase, chipOff, chipOn } from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';
import type { DeckPreflight, DeckTone, DeckDepth, DeckDifferentiation } from '@/hooks/useSlideDeck';

/* ==========================================================================
   SlideDeckPreflightDialog — what the tutor sets before the deck is built.

   A bottom sheet now, not a centred dialog: the tutor picks slide count,
   tone, depth and the differentiation variant, then one solid volt
   "Generate" fires the edge function. Defaults (14, practical, standard,
   standard) suit most lessons so a tutor in a hurry taps once.

   Differentiation is new here. `useSlideDeck.generate` and the edge function
   have accepted it since the SEND/EAL work landed, but this sheet never
   exposed it, so every deck was built at the standard variant.

   ELE-942 / [F1.3].
   ========================================================================== */

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (preflight: DeckPreflight) => void;
  defaults?: DeckPreflight;
}

// The edge function clamps to 8–24; keep the chips inside that range.
const COUNT_OPTIONS = [8, 12, 14, 18, 24];
const TONES: Array<{ value: DeckTone; label: string; help: string }> = [
  { value: 'practical', label: 'Practical', help: 'On-site voice with concrete examples.' },
  { value: 'academic', label: 'Academic', help: 'Formal register, closer to a journal paper.' },
  { value: 'gen_z', label: 'Gen-Z', help: 'Punchy and contemporary, still rigorous.' },
];
const DEPTHS: Array<{ value: DeckDepth; label: string; help: string }> = [
  { value: 'overview', label: 'Overview', help: 'Lighter — an introduction or a revision lesson.' },
  { value: 'standard', label: 'Standard', help: 'The default depth.' },
  { value: 'deep_dive', label: 'Deep dive', help: 'Richer content with stretch tasks.' },
];
const DIFFERENTIATIONS: Array<{ value: DeckDifferentiation; label: string; help: string }> = [
  { value: 'standard', label: 'Mixed', help: 'Mixed levels of challenge across the deck.' },
  {
    value: 'send_eal',
    label: 'SEND / EAL',
    help: 'Plain English, short sentences, every term defined, step-by-step activities.',
  },
  {
    value: 'stretch',
    label: 'Stretch',
    help: 'Deeper regulation detail, higher-order questions, an extension activity.',
  },
];

function ChipRow<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: Array<{ value: T; label: string; help: string }>;
  value: T;
  onChange: (v: T) => void;
}) {
  const current = options.find((o) => o.value === value);
  return (
    <div>
      <div className="text-[12px] font-medium text-white">{label}</div>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={cn(chipBase, 'px-4', value === o.value ? chipOn : chipOff)}
          >
            {o.label}
          </button>
        ))}
      </div>
      {current && <p className="mt-2 text-[12px] leading-snug text-white">{current.help}</p>}
    </div>
  );
}

export function SlideDeckPreflightDialog({ open, onOpenChange, onConfirm, defaults }: Props) {
  const [slideCount, setSlideCount] = useState<number>(defaults?.slide_count ?? 14);
  const [tone, setTone] = useState<DeckTone>(defaults?.tone ?? 'practical');
  const [depth, setDepth] = useState<DeckDepth>(defaults?.depth ?? 'standard');
  const [differentiation, setDifferentiation] = useState<DeckDifferentiation>(
    defaults?.differentiation ?? 'standard'
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        hideCloseButton
        side="bottom"
        className="h-[85vh] overflow-hidden rounded-t-2xl border-white/[0.06] bg-[hsl(0_0%_8%)] p-0"
      >
        <div className="flex h-full flex-col">
          <div className="flex flex-shrink-0 justify-center pb-1 pt-2.5">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          <div className="flex flex-shrink-0 items-start justify-between gap-3 border-b border-white/[0.06] px-5 pb-4">
            <div className="min-w-0">
              <SheetTitle className="text-[20px] font-semibold leading-tight text-white">
                Build the slide deck
              </SheetTitle>
              <SheetDescription className="mt-1.5 text-[12.5px] text-white">
                Set the shape of the deck before the AI runs. The defaults suit most lessons.
              </SheetDescription>
            </div>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="-mr-2 flex h-11 shrink-0 items-center px-2 text-[12.5px] font-medium text-white touch-manipulation"
            >
              Cancel
            </button>
          </div>

          <div className="flex-1 space-y-6 overflow-y-auto overscroll-contain p-5">
            <div>
              <div className="text-[12px] font-medium text-white">Slide count</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {COUNT_OPTIONS.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setSlideCount(n)}
                    className={cn(
                      chipBase,
                      'min-w-[64px] px-3 tabular-nums',
                      slideCount === n ? chipOn : chipOff
                    )}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <ChipRow<DeckTone> label="Tone" options={TONES} value={tone} onChange={setTone} />
            <ChipRow<DeckDepth> label="Depth" options={DEPTHS} value={depth} onChange={setDepth} />
            <ChipRow<DeckDifferentiation>
              label="Differentiation"
              options={DIFFERENTIATIONS}
              value={differentiation}
              onChange={setDifferentiation}
            />
          </div>

          <div
            className="flex-shrink-0 border-t border-white/[0.06] p-4"
            style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
          >
            <button
              type="button"
              onClick={() => {
                onConfirm({ slide_count: slideCount, tone, depth, differentiation });
                onOpenChange(false);
              }}
              className={cn(buttonPrimaryCn, 'w-full sm:w-auto sm:px-6')}
            >
              Generate {slideCount} slides
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
