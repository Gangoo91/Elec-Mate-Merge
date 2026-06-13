import { useForm } from 'react-hook-form';
import { DecimalInput } from '@/components/ui/decimal-input';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { QuoteSettings, QuoteItem } from '@/types/quote';
import { computeQuoteTotals } from '@/utils/quote-calculations';
import { useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';

const settingsSchema = z.object({
  vatRate: z.number().min(0).max(100, 'VAT rate must be between 0-100%'),
  vatRegistered: z.boolean(),
  showMaterialsBreakdown: z.boolean().optional(),
  discountEnabled: z.boolean().optional(),
  discountType: z.enum(['percentage', 'fixed']).optional(),
  discountValue: z.number().min(0).optional(),
  discountLabel: z.string().optional(),
  // ELE-891 — per-category adjustments (signed %; -20 = 20% off labour)
  categoryAdjustments: z
    .object({
      labour: z.number().optional(),
      materials: z.number().optional(),
      equipment: z.number().optional(),
    })
    .optional(),
  // ELE-975 — customer signature box on PDF (opt-in)
  showSignatureBox: z.boolean().optional(),
  // Bake category markup into displayed item totals on the customer-facing
  // quote + PDF, hide the explicit markup line.
  hideMarkupFromCustomer: z.boolean().optional(),
  // Construction invoicing — CIS deduction (labour only, ex-VAT) + VAT
  // domestic reverse charge. All opt-in; default off.
  cisEnabled: z.boolean().optional(),
  cisRate: z.number().optional(),
  reverseCharge: z.boolean().optional(),
  isEstimate: z.boolean().optional(),
});

interface QuoteSettingsStepProps {
  settings?: QuoteSettings;
  items?: QuoteItem[];
  onUpdate: (settings: QuoteSettings) => void;
}

const inputClass =
  'h-11 px-3 rounded-xl text-base text-white bg-white/[0.06] border border-white/[0.08] focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow/20 outline-none touch-manipulation placeholder:text-white/40';

/** Group eyebrow — matches the quotes pages */
const GroupHeader = ({ n, title, sub }: { n: string; title: string; sub?: string }) => (
  <div className="mb-1">
    <div className="flex items-baseline gap-2">
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80 tabular-nums">{n}</span>
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/80">· {title}</span>
    </div>
    {sub && <p className="text-[11px] text-white/50 mt-1">{sub}</p>}
  </div>
);

/** Toggle row — label + description + switch */
const ToggleRow = ({
  label,
  description,
  children,
  last,
}: {
  label: string;
  description: string;
  children: React.ReactNode;
  last?: boolean;
}) => (
  <div className={cn('flex items-center justify-between py-3.5', !last && 'border-b border-white/[0.08]')}>
    <div className="pr-3">
      <p className="text-[14px] font-medium text-white">{label}</p>
      <p className="text-[12px] text-white/60 mt-0.5">{description}</p>
    </div>
    {children}
  </div>
);

export const QuoteSettingsStep = ({ settings, items, onUpdate }: QuoteSettingsStepProps) => {
  const form = useForm<QuoteSettings>({
    resolver: zodResolver(settingsSchema),
    defaultValues: settings || {
      vatRate: 20,
      vatRegistered: false,
      showMaterialsBreakdown: true,
      discountEnabled: false,
      discountType: 'percentage',
      discountValue: 0,
      discountLabel: '',
    },
  });

  useEffect(() => {
    // Initialise settings synchronously on mount so calculateTotals always has settings
    onUpdate(form.getValues() as QuoteSettings);
    const subscription = form.watch((value) => {
      onUpdate(value as QuoteSettings);
    });
    return () => subscription.unsubscribe();
  }, [form, onUpdate]);

  // The wizard header now owns the Quote/Estimate toggle. Keep this form's
  // isEstimate in lockstep with the parent so form.watch can't push a stale
  // value back and silently flip the document type.
  useEffect(() => {
    if (!!settings?.isEstimate !== !!form.getValues('isEstimate')) {
      form.setValue('isEstimate', !!settings?.isEstimate);
    }
  }, [settings?.isEstimate, form]);

  const isVatRegistered = form.watch('vatRegistered');
  const isDiscountEnabled = form.watch('discountEnabled');
  const discountType = form.watch('discountType');
  const isReverseCharge = form.watch('reverseCharge');
  const isCisEnabled = form.watch('cisEnabled');
  const watchedCisRate = form.watch('cisRate');

  // Live CIS preview — quotes don't apply O&P (see useQuoteBuilder), so match that.
  const cisPreview = useMemo(
    () =>
      computeQuoteTotals(
        (items || []) as QuoteItem[],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        { ...(settings as any), cisEnabled: isCisEnabled, cisRate: watchedCisRate },
        { applyOverheadAndProfit: false }
      ),
    [items, settings, isCisEnabled, watchedCisRate]
  );

  const switchField = (name: keyof QuoteSettings, opts?: { onChange?: (checked: boolean) => void; defaultOn?: boolean }) => (
    <FormField
      control={form.control}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      name={name as any}
      render={({ field }) => (
        <FormItem className="p-0 m-0 space-y-0">
          <FormControl>
            <Switch
              checked={opts?.defaultOn ? field.value !== false : field.value === true}
              onCheckedChange={(checked) => {
                field.onChange(checked);
                opts?.onChange?.(checked);
              }}
              className="data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow"
            />
          </FormControl>
        </FormItem>
      )}
    />
  );

  return (
    <Form {...form}>
      <div className="space-y-8 text-left">
        {/* Document type (Quote / Estimate) now lives in the wizard header so
            it stays visible on every step. */}

        {/* ============ 01 · TAX ============ */}
        <div>
          <GroupHeader n="01" title="Tax" sub="VAT, reverse charge and CIS" />

          <ToggleRow label="VAT registered" description="Add VAT to this quote">
            {switchField('vatRegistered', {
              onChange: (checked) => {
                if (!checked) form.setValue('reverseCharge', false);
              },
            })}
          </ToggleRow>

          {isVatRegistered && (
            <div className="py-3 border-b border-white/[0.08]">
              <FormField
                control={form.control}
                name="vatRate"
                render={({ field }) => (
                  <FormItem>
                    <label className="text-xs font-medium text-white mb-1.5 block">VAT rate (%)</label>
                    <FormControl>
                      <Input
                        type="number"
                        inputMode="decimal"
                        step="0.1"
                        placeholder="20"
                        className={cn(inputClass, 'max-w-[120px]')}
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value === '' ? '' : parseFloat(e.target.value) || '')}
                      />
                    </FormControl>
                    <FormMessage className="text-[12px] text-red-400" />
                  </FormItem>
                )}
              />
            </div>
          )}

          <ToggleRow
            label="VAT reverse charge"
            description="CIS supplies — charge £0 VAT; customer accounts to HMRC"
          >
            {switchField('reverseCharge')}
          </ToggleRow>
          {isReverseCharge && (
            <p className="text-[11px] text-white/60 py-2 leading-relaxed border-b border-white/[0.08]">
              Invoice shows £0 VAT with the statement{' '}
              <span className="text-white/80">&ldquo;Reverse charge: customer to account to HMRC for the VAT&rdquo;</span>{' '}
              — the notional VAT is shown for their records.
            </p>
          )}

          <ToggleRow label="CIS deduction" description="Deducted from labour only (ex-VAT)" last={!isCisEnabled}>
            <FormField
              control={form.control}
              name="cisEnabled"
              render={({ field }) => (
                <FormItem className="p-0 m-0 space-y-0">
                  <FormControl>
                    <Switch
                      checked={field.value || false}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                        if (checked && !form.getValues('cisRate')) form.setValue('cisRate', 20);
                      }}
                      className="data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </ToggleRow>
          {isCisEnabled && (
            <div className="pt-3">
              <label className="text-xs font-medium text-white mb-1.5 block">CIS rate</label>
              <div className="grid grid-cols-2 gap-2">
                {[20, 30].map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => form.setValue('cisRate', rate)}
                    className={cn(
                      'h-11 rounded-lg text-[13px] font-semibold border transition-colors touch-manipulation',
                      (form.watch('cisRate') ?? 20) === rate
                        ? 'bg-elec-yellow text-black border-elec-yellow'
                        : 'bg-white/[0.06] text-white border-white/[0.12]'
                    )}
                  >
                    {rate}% · {rate === 20 ? 'registered' : 'unverified'}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-white/55 mt-2">
                Calculated on the Labour element only — categorise chargeable labour as Labour.
              </p>

              {/* Live preview + guard — makes a silent £0 deduction impossible. */}
              {cisPreview.labourNet > 0 ? (
                <div className="mt-3 rounded-lg border border-white/[0.12] bg-white/[0.04] p-3 space-y-1.5">
                  <div className="flex justify-between text-[12px]">
                    <span className="text-white/70">Labour (ex-VAT)</span>
                    <span className="text-white tabular-nums">£{cisPreview.labourNet.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[12px]">
                    <span className="text-white/70">Less CIS ({cisPreview.cisRate}%)</span>
                    <span className="text-red-300 tabular-nums">−£{cisPreview.cisAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[13px] font-semibold pt-1 border-t border-white/[0.08]">
                    <span className="text-white">Net payable</span>
                    <span className="text-elec-yellow tabular-nums">£{cisPreview.netPayable.toFixed(2)}</span>
                  </div>
                </div>
              ) : (
                <div className="mt-3 rounded-lg border border-amber-400/40 bg-amber-400/10 p-3">
                  <p className="text-[12px] text-amber-200 leading-relaxed">
                    ⚠️ CIS is on but no <span className="font-semibold">Labour</span> lines were found, so nothing will be deducted. Add your chargeable labour under the <span className="font-semibold">Labour</span> category on the Items step.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ============ 02 · PRICING ============ */}
        <div>
          <GroupHeader n="02" title="Pricing" sub="Adjustments and discounts" />

          <div className="py-3.5 border-b border-white/[0.08]">
            <p className="text-[14px] font-medium text-white">Per-category adjustment</p>
            <p className="text-[12px] text-white/60 mt-0.5">
              Signed %. Negative = discount, positive = markup. Applied before global discount.
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {(['labour', 'materials', 'equipment'] as const).map((cat) => (
                <FormField
                  key={cat}
                  control={form.control}
                  name={`categoryAdjustments.${cat}` as const}
                  render={({ field }) => (
                    <FormItem>
                      <label className="text-xs font-medium text-white mb-1.5 block capitalize">{cat}</label>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="number"
                            step="0.1"
                            placeholder="0"
                            className={cn(inputClass, 'pr-8')}
                            value={field.value ?? ''}
                            onChange={(e) => {
                              const v = e.target.value;
                              field.onChange(v === '' ? undefined : parseFloat(v));
                            }}
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 text-sm pointer-events-none">
                            %
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </div>

          <ToggleRow label="Apply discount" description="Goodwill, retention, early-payment, etc." last={!isDiscountEnabled}>
            {switchField('discountEnabled')}
          </ToggleRow>

          {isDiscountEnabled && (
            <div className="space-y-4 pt-3">
              {/* Type */}
              <div className="flex gap-1.5">
                {(['percentage', 'fixed'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => form.setValue('discountType', type)}
                    className={cn(
                      'flex-1 h-11 rounded-xl text-[13px] font-medium transition-all touch-manipulation active:scale-[0.98]',
                      discountType === type
                        ? 'bg-elec-yellow text-black font-semibold'
                        : 'bg-white/[0.04] text-white border border-white/[0.08]'
                    )}
                  >
                    {type === 'percentage' ? 'Percentage' : 'Fixed Amount'}
                  </button>
                ))}
              </div>

              {/* Value + Label */}
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="discountValue"
                  render={({ field }) => (
                    <FormItem>
                      <label className="text-xs font-medium text-white mb-1.5 block">
                        {discountType === 'percentage' ? 'Percentage (%)' : 'Amount (£)'}
                      </label>
                      <FormControl>
                        <DecimalInput
                          placeholder={discountType === 'percentage' ? '20' : '50.00'}
                          className={inputClass}
                          value={(field.value as number) || 0}
                          onChange={(val) => field.onChange(val)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discountLabel"
                  render={({ field }) => (
                    <FormItem>
                      <label className="text-xs font-medium text-white mb-1.5 block">Label (optional)</label>
                      <FormControl>
                        <Input placeholder="e.g. Retention" className={inputClass} {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}
        </div>

        {/* ============ 03 · PRESENTATION ============ */}
        <div>
          <GroupHeader n="03" title="Presentation" sub="What the client sees on the quote and PDF" />

          <ToggleRow label="Materials breakdown" description="Show each material as a line item on the PDF">
            {switchField('showMaterialsBreakdown', { defaultOn: true })}
          </ToggleRow>

          <ToggleRow label="Customer signature box" description="Signed-by / date area at the bottom of the PDF">
            {switchField('showSignatureBox')}
          </ToggleRow>

          <ToggleRow
            label="Hide markup from customer"
            description="Bake category markup into line prices — one price per line, no markup row. You still see the breakdown."
            last
          >
            {switchField('hideMarkupFromCustomer')}
          </ToggleRow>
        </div>
      </div>
    </Form>
  );
};
