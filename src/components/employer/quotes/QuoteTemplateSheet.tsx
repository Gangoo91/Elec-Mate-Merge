import { useMemo, useState } from 'react';
import FormSheet from '@/components/forms/FormSheet';
import { Input } from '@/components/ui/input';
import { Field, inputClass, PrimaryButton, SecondaryButton } from '@/components/employer/editorial';
import {
  panel,
  PanelTitle,
  Rows,
  Row,
  PlainEmpty,
} from '@/components/employer/pageParts/PageParts';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useFirmPriceBook } from '@/hooks/useFirmPriceBook';
import {
  useDeleteQuoteTemplate,
  useQuoteTemplateSources,
  useSaveQuoteTemplate,
  type QuoteTemplate,
  type TemplateLabour,
  type TemplateLine,
} from '@/hooks/useQuotesThatWin';
import {
  buildStarterTemplates,
  templateTotal,
} from '@/components/employer/quotes/starterTemplates';
import { autoCompleteOff } from '@/lib/textEntry';

const money = (n: number) =>
  new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(n || 0);

/** ELE-2073: pick a job template (yours, or a starter priced from your price book). */
export function QuoteTemplateSheet({
  open,
  onOpenChange,
  onPick,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onPick: (t: QuoteTemplate) => void;
}) {
  const { data: sources, isLoading, error } = useQuoteTemplateSources(open);
  const { data: priceBook = [] } = useFirmPriceBook();
  const del = useDeleteQuoteTemplate();
  const [preview, setPreview] = useState<QuoteTemplate | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const starters = useMemo(() => buildStarterTemplates(priceBook, sources), [priceBook, sources]);
  const own = sources?.own ?? [];

  const detail = (t: QuoteTemplate) => {
    const unpriced = t.lines.filter((l) => l.unpriced).length;
    return [
      `${t.lines.length} material${t.lines.length === 1 ? '' : 's'}`,
      `${t.labour.reduce((s, l) => s + l.hours, 0)} h labour`,
      unpriced ? `${unpriced} to price` : null,
    ]
      .filter(Boolean)
      .join(' · ');
  };

  const shown = preview;

  return (
    <FormSheet
      open={open}
      onOpenChange={(o) => {
        if (!o) setPreview(null);
        onOpenChange(o);
      }}
      width="wide"
      eyebrow="New quote"
      title={shown ? shown.name : 'Start from a template'}
      description={
        shown
          ? shown.description || undefined
          : 'Your own templates, and starters priced from your price book. Everything stays editable on the quote.'
      }
      footer={
        shown ? (
          <div className="flex gap-2">
            <SecondaryButton fullWidth onClick={() => setPreview(null)}>
              Back
            </SecondaryButton>
            <PrimaryButton
              fullWidth
              onClick={() => {
                onPick(shown);
                setPreview(null);
                onOpenChange(false);
              }}
            >
              Use this template
            </PrimaryButton>
          </div>
        ) : undefined
      }
    >
      {error ? (
        <p className="text-[14px] text-white">{(error as Error).message}</p>
      ) : isLoading ? (
        <p className="text-[14px] text-white">Loading templates.</p>
      ) : shown ? (
        <div className="space-y-6 lg:grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start lg:gap-8 lg:space-y-0">
          <section>
            <PanelTitle title="Materials" meta={`${shown.lines.length}`} />
            <div className={cn(panel, 'overflow-hidden')}>
              <Rows>
                {shown.lines.map((l, i) => (
                  <Row
                    key={i}
                    title={l.description}
                    detail={`${l.quantity} ${l.unit}${l.unpriced ? ' · not in your price book, price it on the quote' : ''}`}
                    amount={money(l.quantity * l.unitPrice)}
                  />
                ))}
              </Rows>
            </div>
          </section>
          <section>
            <PanelTitle title="Labour" />
            <div className={cn(panel, 'overflow-hidden')}>
              <Rows>
                {shown.labour.map((l, i) => (
                  <Row
                    key={i}
                    title={`${l.hours} h at ${money(l.hourlyRate)}/h`}
                    detail={l.basis || l.description}
                    wrapDetail
                    amount={money(l.hours * l.hourlyRate)}
                  />
                ))}
              </Rows>
            </div>
            <p className="mt-3 text-[13px] text-white">
              Before VAT: {money(templateTotal(shown))}.
              {shown.labour.some((l) => !l.hourlyRate)
                ? ' Set your hourly rate in Settings to price the labour.'
                : ''}
            </p>
          </section>
        </div>
      ) : (
        <div className="space-y-6 lg:grid lg:grid-cols-2 lg:items-start lg:gap-8 lg:space-y-0">
          <section>
            <PanelTitle title="Your templates" meta={own.length ? `${own.length}` : undefined} />
            <div className={cn(panel, 'overflow-hidden')}>
              {own.length === 0 ? (
                <PlainEmpty
                  bare
                  text="None yet. On any quote, use Save as a template on the last step."
                />
              ) : (
                <Rows>
                  {own.map((t) => (
                    <Row
                      key={t.id}
                      title={t.name}
                      detail={detail(t)}
                      amount={money(templateTotal(t))}
                      onClick={() => setPreview(t)}
                      action={
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirmDelete === t.id) {
                              del.mutate(t.id);
                              setConfirmDelete(null);
                            } else setConfirmDelete(t.id);
                          }}
                          className={cn(
                            'h-11 rounded-full px-3 text-[13px] font-semibold touch-manipulation hover:bg-white/[0.06]',
                            confirmDelete === t.id ? 'text-red-300' : 'text-white'
                          )}
                        >
                          {confirmDelete === t.id ? 'Tap to delete' : 'Delete'}
                        </button>
                      }
                    />
                  ))}
                </Rows>
              )}
            </div>
          </section>
          <section>
            <PanelTitle title="Starters" meta="Priced from your price book" />
            <div className={cn(panel, 'overflow-hidden')}>
              <Rows>
                {starters.map((t) => (
                  <Row
                    key={t.id}
                    title={t.name}
                    detail={detail(t)}
                    amount={money(templateTotal(t))}
                    onClick={() => setPreview(t)}
                  />
                ))}
              </Rows>
            </div>
          </section>
        </div>
      )}
    </FormSheet>
  );
}

/** ELE-2073: save the quote's current lines as the firm's own template. */
export function SaveQuoteTemplateSheet({
  open,
  onOpenChange,
  defaultName,
  jobType,
  labour,
  lines,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  defaultName: string;
  jobType?: string | null;
  labour: TemplateLabour[];
  lines: TemplateLine[];
}) {
  const save = useSaveQuoteTemplate();
  const [name, setName] = useState(defaultName);
  const [type, setType] = useState(jobType ?? '');
  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="lg"
      eyebrow="Quote templates"
      title="Save as a template"
      description="Saves the labour and materials on this quote, not the customer. Anyone who quotes for the firm can use it."
      footer={
        <PrimaryButton
          fullWidth
          disabled={!name.trim() || save.isPending}
          onClick={async () => {
            await save.mutateAsync({
              name: name.trim(),
              job_type: type.trim() || null,
              labour,
              lines,
            });
            toast.success(`Template "${name.trim()}" saved`);
            onOpenChange(false);
          }}
        >
          {save.isPending ? 'Saving' : 'Save template'}
        </PrimaryButton>
      }
    >
      <Field label="Template name" required>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
          autoComplete={autoCompleteOff}
        />
      </Field>
      <Field label="Job type" hint="Win rate groups quotes by this.">
        <Input
          value={type}
          onChange={(e) => setType(e.target.value)}
          placeholder="Consumer unit change"
          className={inputClass}
          autoComplete={autoCompleteOff}
        />
      </Field>
      <p className="text-[13px] text-white">
        {labour.length} labour line{labour.length === 1 ? '' : 's'} and {lines.length} material
        {lines.length === 1 ? '' : 's'}.
      </p>
    </FormSheet>
  );
}
