import { useState } from 'react';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  chipBase,
  chipOff,
  chipOn,
} from '@/components/forms/fieldStyles';
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
      <div className="text-[12px] font-medium text-white" id={`preflight-${label}`}>
        {label}
      </div>
      <div
        className="mt-2 flex flex-wrap gap-2"
        role="radiogroup"
        aria-labelledby={`preflight-${label}`}
      >
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={value === o.value}
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

  const label = (list: Array<{ value: string; label: string }>, v: string) =>
    list.find((o) => o.value === v)?.label ?? v;

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Slide deck"
      title="Build the slide deck"
      description="Set the shape of the deck before the AI runs. The defaults suit most lessons."
      bodyClassName="grid grid-cols-1 items-start gap-x-10 gap-y-6 lg:grid-cols-[minmax(0,1fr)_320px]"
      footer={
        <div className="grid grid-cols-2 gap-2.5">
          <button type="button" onClick={() => onOpenChange(false)} className={buttonSecondaryCn}>
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm({ slide_count: slideCount, tone, depth, differentiation });
              onOpenChange(false);
            }}
            className={buttonPrimaryCn}
          >
            Generate {slideCount} slides
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        <div>
          <div className="text-[12px] font-medium text-white" id="preflight-count">
            Slide count
          </div>
          <div
            className="mt-2 flex flex-wrap gap-2"
            role="radiogroup"
            aria-labelledby="preflight-count"
          >
            {COUNT_OPTIONS.map((n) => (
              <button
                key={n}
                type="button"
                role="radio"
                aria-checked={slideCount === n}
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

      {/* Desktop summary of what will be built */}
      <aside className="hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] p-5 lg:block">
        <h3 className="text-[13px] font-semibold text-white">This deck</h3>
        <dl className="mt-3 divide-y divide-white/[0.06] text-[13px] text-white">
          {[
            ['Slides', String(slideCount)],
            ['Tone', label(TONES, tone)],
            ['Depth', label(DEPTHS, depth)],
            ['Differentiation', label(DIFFERENTIATIONS, differentiation)],
          ].map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-4 py-2.5">
              <dt>{k}</dt>
              <dd className="font-medium tabular-nums">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-[12.5px] leading-snug text-white">
          You can edit, reorder or regenerate any slide once the deck is built.
        </p>
      </aside>
    </FormSheet>
  );
}
