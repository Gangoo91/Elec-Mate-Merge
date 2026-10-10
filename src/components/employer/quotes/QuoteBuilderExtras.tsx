import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { FormCard, Field, inputClass } from '@/components/employer/editorial';
import { cn } from '@/lib/utils';
import { autoCompleteOff } from '@/lib/textEntry';

/* ELE-2073 / ELE-2065 additions to the Employer Hub quote builder
   (CreateQuoteDialog): option tabs, the options card, payment stages and the
   template card. State lives in the dialog; these only draw it. */

export interface QuoteOptionMeta {
  id: string;
  label: string;
  description: string;
}

export interface QuoteStage {
  id: string;
  label: string;
  percent: number;
}

export const DEFAULT_STAGES: QuoteStage[] = [
  { id: 'first-fix', label: 'First fix', percent: 40 },
  { id: 'second-fix', label: 'Second fix', percent: 40 },
  { id: 'completion', label: 'Completion', percent: 20 },
];

export const OPTION_IDS = ['A', 'B', 'C'] as const;

const tabOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const tabOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium';

/** Above the labour, materials and review steps once a quote has options. */
export function OptionTabs({
  options,
  active,
  totals,
  onSelect,
  onAdd,
}: {
  options: QuoteOptionMeta[];
  active: number;
  totals: number[];
  onSelect: (i: number) => void;
  onAdd?: () => void;
}) {
  if (options.length < 2) return null;
  return (
    <div className="mb-4 space-y-2">
      <p className="text-[13px] text-white">
        You are editing {options[active]?.label || `option ${active + 1}`}. The customer picks one
        option when they accept.
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((o, i) => (
          <button
            key={o.id}
            type="button"
            onClick={() => onSelect(i)}
            className={cn(
              'h-11 rounded-full border px-4 text-[13px] touch-manipulation',
              i === active ? tabOn : tabOff
            )}
          >
            {o.label || `Option ${i + 1}`} · £{(totals[i] ?? 0).toFixed(0)}
          </button>
        ))}
        {onAdd && options.length < 3 && (
          <button
            type="button"
            onClick={onAdd}
            className="h-11 rounded-full border border-white/[0.14] px-4 text-[13px] font-semibold text-white touch-manipulation hover:bg-white/[0.06]"
          >
            Add an option
          </button>
        )}
      </div>
    </div>
  );
}

/** On the review step: offer options, name them, or remove them. */
export function OptionsCard({
  options,
  totals,
  onStart,
  onChange,
  onRemove,
  onClear,
}: {
  options: QuoteOptionMeta[];
  totals: number[];
  onStart: () => void;
  onChange: (i: number, patch: Partial<QuoteOptionMeta>) => void;
  onRemove: (i: number) => void;
  onClear: () => void;
}) {
  if (options.length < 2) {
    return (
      <FormCard eyebrow="Options for the customer">
        <p className="text-[13px] text-white">
          Offer up to three versions of the job, for example a standard board and one with surge
          protection and a smart isolator. The customer picks one on the accept page and pays the
          deposit for that one.
        </p>
        <button
          type="button"
          onClick={onStart}
          className="h-11 rounded-full border border-white/[0.14] px-4 text-[13px] font-semibold text-white touch-manipulation hover:bg-white/[0.06]"
        >
          Offer options
        </button>
      </FormCard>
    );
  }
  return (
    <FormCard eyebrow="Options for the customer">
      <p className="text-[13px] text-white">
        The quote and its PDF show {options[0]?.label || 'the first option'} until the customer
        picks one.
      </p>
      <div className="space-y-4">
        {options.map((o, i) => (
          <div
            key={o.id}
            className="space-y-3 border-t border-white/[0.1] pt-3 first:border-t-0 first:pt-0"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-[14px] font-semibold text-white">
                Option {i + 1} · £{(totals[i] ?? 0).toFixed(2)}
              </span>
              <button
                type="button"
                onClick={() => onRemove(i)}
                className="h-11 rounded-full px-3 text-[13px] font-semibold text-white touch-manipulation hover:bg-white/[0.06]"
              >
                Remove
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-[12rem_minmax(0,1fr)]">
              <Field label="Name">
                <Input
                  value={o.label}
                  onChange={(e) => onChange(i, { label: e.target.value })}
                  placeholder={['Standard', 'Recommended', 'Premium'][i]}
                  className={inputClass}
                  autoComplete={autoCompleteOff}
                />
              </Field>
              <Field label="What is different">
                <Input
                  value={o.description}
                  onChange={(e) => onChange(i, { description: e.target.value })}
                  placeholder="Adds surge protection and a 10-year warranty"
                  className={inputClass}
                  autoComplete={autoCompleteOff}
                />
              </Field>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={onClear}
        className="h-11 rounded-full px-3 text-[13px] font-semibold text-white touch-manipulation hover:bg-white/[0.06]"
      >
        Keep only the option I am editing
      </button>
    </FormCard>
  );
}

/** On the review step: split the price into stage invoices raised from the job. */
export function StagesCard({
  stages,
  total,
  onChange,
}: {
  stages: QuoteStage[] | null;
  total: number;
  onChange: (s: QuoteStage[] | null) => void;
}) {
  const sum = (stages ?? []).reduce((s, x) => s + (Number(x.percent) || 0), 0);
  return (
    <FormCard eyebrow="Staged payments">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[13px] text-white">
          Invoice the job in stages. Each stage raises its own invoice when you mark it done on the
          job.
        </p>
        <Switch
          checked={!!stages}
          onCheckedChange={(v) => onChange(v ? DEFAULT_STAGES.map((s) => ({ ...s })) : null)}
          aria-label="Staged payments"
        />
      </div>
      {stages && (
        <div className="space-y-3">
          {stages.map((s, i) => (
            <div key={s.id} className="grid grid-cols-[minmax(0,1fr)_5.5rem_auto] items-end gap-3">
              <Field label={`Stage ${i + 1}`}>
                <Input
                  value={s.label}
                  onChange={(e) =>
                    onChange(stages.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))
                  }
                  className={inputClass}
                  autoComplete={autoCompleteOff}
                />
              </Field>
              <Field label="%">
                <Input
                  type="number"
                  inputMode="decimal"
                  min={0}
                  max={100}
                  value={String(s.percent)}
                  onChange={(e) =>
                    onChange(
                      stages.map((x, j) =>
                        j === i ? { ...x, percent: Number(e.target.value) || 0 } : x
                      )
                    )
                  }
                  className={inputClass}
                />
              </Field>
              <span className="pb-3 text-[13px] tabular-nums text-white">
                £{((total * (Number(s.percent) || 0)) / 100).toFixed(2)}
              </span>
            </div>
          ))}
          <div className="flex flex-wrap items-center gap-2">
            {stages.length < 6 && (
              <button
                type="button"
                onClick={() =>
                  onChange([
                    ...stages,
                    {
                      id: `stage-${Date.now().toString(36)}`,
                      label: `Stage ${stages.length + 1}`,
                      percent: 0,
                    },
                  ])
                }
                className="h-11 rounded-full border border-white/[0.14] px-4 text-[13px] font-semibold text-white touch-manipulation hover:bg-white/[0.06]"
              >
                Add a stage
              </button>
            )}
            {stages.length > 1 && (
              <button
                type="button"
                onClick={() => onChange(stages.slice(0, -1))}
                className="h-11 rounded-full px-3 text-[13px] font-semibold text-white touch-manipulation hover:bg-white/[0.06]"
              >
                Remove the last stage
              </button>
            )}
          </div>
          <p className={cn('text-[13px]', Math.round(sum) === 100 ? 'text-white' : 'text-red-300')}>
            {Math.round(sum) === 100
              ? 'The stages add up to 100% of the quote. A deposit paid on acceptance comes off the last stage.'
              : `The stages add up to ${sum}%. They need to make 100%.`}
          </p>
        </div>
      )}
    </FormCard>
  );
}

export const stagesValid = (s: QuoteStage[] | null) =>
  !s ||
  (s.length > 0 &&
    Math.round(s.reduce((a, x) => a + (Number(x.percent) || 0), 0)) === 100 &&
    s.every((x) => x.label.trim()));
