import { useEffect, useMemo, useState } from 'react';
import { Check, Loader2, Plus, X } from 'lucide-react';
import { FormSheet } from '@/components/forms/FormSheet';
import { Input } from '@/components/ui/input';
import {
  LoadingBlocks,
  PrimaryButton,
  SecondaryButton,
  inputClass,
} from '@/components/employer/editorial';
import { cn } from '@/lib/utils';
import { panel, PanelTitle } from '@/components/employer/pageParts/PageParts';
import { toast } from '@/hooks/use-toast';
import { DEFAULT_TERMS_MAP, buildTermsList } from '@/utils/quoteTerms';
import { useFirmCustomerTerms, useSetFirmCustomerTerms } from '@/hooks/usePersonContracts';

/* ==========================================================================
   CustomerTermsCard — ELE-1982. The firm's terms with its customers.

   One set of terms, the same one the quote PDF and the customer's accept
   page already print (company_profiles.quote_terms, ELE-1149). Shown on
   Contracts so the firm's agreements live in one place; editable here by
   the owner or an admin, not only the account owner in Settings.
   ========================================================================== */

const GROUPS: Array<{ title: string; ids: string[] }> = [
  {
    title: 'Payment',
    ids: [
      'payment_30',
      'payment_14',
      'payment_on_completion',
      'deposit_required',
      'additional_charges',
      'late_payment',
      'payment_methods',
    ],
  },
  {
    title: 'Warranty',
    ids: ['warranty_workmanship', 'warranty_materials', 'warranty_callback', 'warranty_exclusions'],
  },
  {
    title: 'Compliance',
    ids: [
      'bs7671_compliance',
      'part_p_notification',
      'testing_cert',
      'competent_person',
      'insurance',
    ],
  },
  {
    title: 'Site and access',
    ids: [
      'access_required',
      'power_isolation',
      'site_safety',
      'asbestos_disclaimer',
      'parking',
      'working_hours',
    ],
  },
  {
    title: 'General',
    ids: [
      'price_validity',
      'cancellation',
      'unforeseen_works',
      'price_subject',
      'materials_ownership',
      'variations',
    ],
  },
];

interface Custom {
  id: string;
  label: string;
}

function parse(json: string | null): { selected: string[]; custom: Custom[] } {
  if (!json)
    return {
      selected: [
        'payment_30',
        'deposit_required',
        'warranty_workmanship',
        'bs7671_compliance',
        'testing_cert',
        'price_validity',
      ],
      custom: [],
    };
  try {
    const p = JSON.parse(json);
    if (Array.isArray(p.selected))
      return { selected: p.selected, custom: Array.isArray(p.custom) ? p.custom : [] };
  } catch {
    // Legacy plain text: each line becomes a custom term
    const custom = json
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
      .map((label, i) => ({ id: `custom_legacy_${i}`, label }));
    return { selected: custom.map((c) => c.id), custom };
  }
  return { selected: ['payment_30', 'warranty_workmanship', 'bs7671_compliance'], custom: [] };
}

export function CustomerTermsCard({ canEdit }: { canEdit: boolean }) {
  const { data, isLoading, error } = useFirmCustomerTerms();
  const save = useSetFirmCustomerTerms();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [custom, setCustom] = useState<Custom[]>([]);
  const [draft, setDraft] = useState('');

  const terms = useMemo(() => buildTermsList(data?.quoteTerms ?? null), [data?.quoteTerms]);

  useEffect(() => {
    if (!open) return;
    const p = parse(data?.quoteTerms ?? null);
    setSelected(new Set(p.selected));
    setCustom(p.custom);
    setDraft('');
  }, [open, data?.quoteTerms]);

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const addCustom = () => {
    const label = draft.trim();
    if (!label) return;
    const id = `custom_${Date.now().toString(36)}`;
    setCustom((c) => [...c, { id, label }]);
    setSelected((s) => new Set(s).add(id));
    setDraft('');
  };

  const handleSave = async () => {
    try {
      const keep = custom.filter((c) => selected.has(c.id));
      const ordered = [
        ...GROUPS.flatMap((g) => g.ids).filter((id) => selected.has(id)),
        ...keep.map((c) => c.id),
      ];
      await save.mutateAsync(JSON.stringify({ selected: ordered, custom: keep }));
      toast({
        title: 'Customer terms saved',
        description: 'They print on every quote and show on the accept page.',
      });
      setOpen(false);
    } catch (e) {
      toast({
        title: 'Not saved',
        description: e instanceof Error ? e.message : 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      <section>
        <PanelTitle
          title="Customer terms"
          meta={terms.length > 0 ? `${terms.length} terms` : undefined}
          action={canEdit ? 'Edit terms' : undefined}
          onAction={canEdit ? () => setOpen(true) : undefined}
        />
        <div className={cn(panel, 'space-y-3 px-4 py-4 sm:px-5')}>
          <p className="text-[14px] leading-relaxed text-white">
            Your terms and conditions with customers. They print on every quote you send and the
            customer agrees to them on the accept page before you start.
          </p>
          {isLoading ? (
            <LoadingBlocks />
          ) : error ? (
            <p className="text-[14px] text-white">
              Could not load your terms. Refresh to try again.
            </p>
          ) : (
            <ol className="grid gap-x-8 gap-y-2 md:grid-cols-2">
              {terms.map((t, i) => (
                <li key={i} className="flex gap-2.5 text-[14px] leading-snug text-white">
                  <span className="w-5 shrink-0 text-right font-semibold tabular-nums">
                    {i + 1}.
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ol>
          )}
          {!isLoading && data && !data.hasProfile && (
            <p className="text-[13px] text-white">
              These are the standard terms. Add your company details in Settings to make them your
              own.
            </p>
          )}
        </div>
      </section>

      <FormSheet
        open={open}
        onOpenChange={setOpen}
        width="wide"
        title="Your terms with customers"
        description="Tick the terms that apply to your work. Add your own at the bottom. They print on every quote."
        footer={
          <div className="flex gap-2">
            <SecondaryButton
              className="h-12 flex-1 rounded-xl sm:min-w-[120px] sm:flex-none"
              onClick={() => setOpen(false)}
            >
              Cancel
            </SecondaryButton>
            <PrimaryButton
              className="h-12 flex-1 rounded-xl text-[15px] sm:min-w-[180px] sm:flex-none"
              disabled={save.isPending || selected.size === 0}
              onClick={handleSave}
            >
              {save.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save {selected.size} terms
            </PrimaryButton>
          </div>
        }
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {GROUPS.map((g) => (
            <div key={g.title} className="space-y-2">
              <p className="text-[15px] font-semibold text-white">{g.title}</p>
              {g.ids.map((id) => (
                <TermToggle
                  key={id}
                  on={selected.has(id)}
                  label={DEFAULT_TERMS_MAP[id]}
                  onClick={() => toggle(id)}
                />
              ))}
            </div>
          ))}
          <div className="space-y-2">
            <p className="text-[15px] font-semibold text-white">Your own</p>
            {custom.map((c) => (
              <div key={c.id} className="flex items-stretch gap-2">
                <TermToggle
                  on={selected.has(c.id)}
                  label={c.label}
                  onClick={() => toggle(c.id)}
                  className="flex-1"
                />
                <button
                  type="button"
                  aria-label="Remove term"
                  onClick={() => setCustom((list) => list.filter((x) => x.id !== c.id))}
                  className="flex w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] text-white touch-manipulation"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
            <div className="flex items-end gap-2">
              <Input
                value={draft}
                onChange={(e) => setDraft(e.target.value.slice(0, 300))}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustom())}
                placeholder="Add a term of your own"
                className={inputClass}
              />
              <button
                type="button"
                onClick={addCustom}
                disabled={!draft.trim()}
                aria-label="Add term"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-elec-yellow text-black touch-manipulation disabled:bg-white/[0.08] disabled:text-white"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </FormSheet>
    </>
  );
}

function TermToggle({
  on,
  label,
  onClick,
  className,
}: {
  on: boolean;
  label: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={cn(
        'flex min-h-[48px] w-full items-start gap-3 rounded-xl border p-3 text-left text-[13px] leading-snug text-white touch-manipulation',
        on
          ? 'border-elec-yellow bg-white/[0.06]'
          : 'border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.07]',
        className
      )}
    >
      <span
        aria-hidden
        className={cn(
          'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2',
          on ? 'border-elec-yellow bg-elec-yellow' : 'border-white/30'
        )}
      >
        {on && <Check className="h-3 w-3 text-black" />}
      </span>
      <span>{label}</span>
    </button>
  );
}
